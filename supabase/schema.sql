-- =========================================================
-- REVISED SECURE SCHEMA FOR KEEP SHINING INVITATION
-- Architect: Senior Dev Controller
-- =========================================================

-- 1. guests table
CREATE TABLE guests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    title TEXT,
    category TEXT,
    unique_token TEXT UNIQUE NOT NULL,
    rsvp_status BOOLEAN DEFAULT NULL,
    attendance_count INT DEFAULT 1,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. event_config table
CREATE TABLE event_config (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. timeline_milestones table
CREATE TABLE timeline_milestones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    year INT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    order_index INT DEFAULT 0
);

-- 4. prayers_guestbook table
CREATE TABLE prayers_guestbook (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    guest_id UUID REFERENCES guests(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_guests_unique_token ON guests(unique_token);
CREATE INDEX idx_prayers_guestbook_guest_id ON prayers_guestbook(guest_id);
CREATE INDEX idx_timeline_order ON timeline_milestones(year, order_index);

-- =========================================================
-- ROW LEVEL SECURITY (RLS) & LOCKDOWN
-- =========================================================
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE prayers_guestbook ENABLE ROW LEVEL SECURITY;

-- 1. LOCKDOWN 'guests' table completely from anon/public access
-- No direct SELECT, UPDATE, or INSERT allowed from the frontend.
-- (We will use RPC functions below instead).

-- 2. Public read for Event Config & Timeline (These are public info)
CREATE POLICY "Allow public read of event config" ON event_config FOR SELECT TO anon USING (true);
CREATE POLICY "Allow public read of timeline" ON timeline_milestones FOR SELECT TO anon USING (true);

-- 3. Public read for Prayers, but NO direct insert (Use RPC)
CREATE POLICY "Allow public read of prayers" ON prayers_guestbook FOR SELECT TO anon USING (true);


-- =========================================================
-- SECURE RPC FUNCTIONS (The "Safe Doors")
-- =========================================================

-- FUNCTION 1: Fetch guest details securely using the token
CREATE OR REPLACE FUNCTION get_guest_by_token(p_token TEXT)
RETURNS SETOF guests 
LANGUAGE sql 
SECURITY DEFINER -- Runs with the privileges of the creator (bypasses RLS internally)
STABLE
AS $$
    SELECT * FROM guests WHERE unique_token = p_token LIMIT 1;
$$;

-- FUNCTION 2: Update RSVP securely
CREATE OR REPLACE FUNCTION update_rsvp_by_token(
    p_token TEXT, 
    p_status BOOLEAN, 
    p_count INT, 
    p_notes TEXT
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE guests 
    SET rsvp_status = p_status, 
        attendance_count = p_count, 
        notes = p_notes
    WHERE unique_token = p_token;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Invalid token';
    END IF;
END;
$$;

-- FUNCTION 3: Insert Prayer securely (Verifies token first)
CREATE OR REPLACE FUNCTION insert_prayer_by_token(p_token TEXT, p_message TEXT)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_guest_id UUID;
    v_prayer_id UUID;
BEGIN
    -- 1. Verify the token and get guest_id
    SELECT id INTO v_guest_id FROM guests WHERE unique_token = p_token;
    
    IF v_guest_id IS NULL THEN
        RAISE EXCEPTION 'Invalid token';
    END IF;

    -- 2. Insert the prayer
    INSERT INTO prayers_guestbook (guest_id, message)
    VALUES (v_guest_id, p_message)
    RETURNING id INTO v_prayer_id;

    RETURN v_prayer_id;
END;
$$;

-- Grant execute permissions to the 'anon' role so Next.js can call them
GRANT EXECUTE ON FUNCTION get_guest_by_token(TEXT) TO anon;
GRANT EXECUTE ON FUNCTION update_rsvp_by_token(TEXT, BOOLEAN, INT, TEXT) TO anon;
GRANT EXECUTE ON FUNCTION insert_prayer_by_token(TEXT, TEXT) TO anon;