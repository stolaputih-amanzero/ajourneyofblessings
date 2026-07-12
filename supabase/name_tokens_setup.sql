-- =========================================================
-- NAME-BASED UNIQUE TOKENS FOR KEEP SHINING
-- Jalankan perintah ini di SQL Editor Supabase Dashboard Anda
-- =========================================================

-- 1. Buat fungsi helper untuk mengubah nama menjadi slug (e.g., 'Bpk. Yusuf Sitorus' -> 'bpk-yusuf-sitorus')
CREATE OR REPLACE FUNCTION slugify(val TEXT)
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
    v_slug TEXT;
BEGIN
    v_slug := lower(val);
    v_slug := regexp_replace(v_slug, '[^a-z0-9\s-]', '', 'g');
    v_slug := regexp_replace(trim(v_slug), '[\s-]+', '-', 'g');
    RETURN v_slug;
END;
$$;

-- 2. Hapus fungsi lama tanpa parameter untuk mencegah konflik overloading di Postgres
DROP FUNCTION IF EXISTS generate_unique_guest_token();

CREATE OR REPLACE FUNCTION generate_unique_guest_token(p_name TEXT DEFAULT NULL)
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
    base_slug TEXT;
    new_token TEXT;
    counter INT;
    done BOOL;
BEGIN
    IF p_name IS NULL OR p_name = '' THEN
        -- Fallback ke random 8 karakter jika nama kosong
        done := false;
        WHILE NOT done LOOP
            new_token := substring(md5(random()::text) from 1 for 8);
            IF NOT EXISTS (SELECT 1 FROM guests WHERE unique_token = new_token) THEN
                done := true;
            END IF;
        END LOOP;
        RETURN new_token;
    END IF;

    -- Generate slug dasar dari nama
    base_slug := slugify(p_name);
    IF base_slug = '' OR base_slug IS NULL THEN
        base_slug := 'undangan';
    END IF;
    
    new_token := base_slug;
    counter := 1;
    done := false;
    
    WHILE NOT done LOOP
        IF NOT EXISTS (SELECT 1 FROM guests WHERE unique_token = new_token) THEN
            done := true;
        ELSE
            new_token := base_slug || '-' || counter;
            counter := counter + 1;
        END IF;
    END LOOP;
    
    RETURN new_token;
END;
$$;

-- 3. PERBAIKAN: Perbarui data tamu lama yang saat ini menggunakan token acak 8 karakter
-- (Agar tamu lama Anda juga otomatis mendapat link berbasis nama yang rapi!)
UPDATE guests 
SET unique_token = generate_unique_guest_token(full_name)
WHERE unique_token ~ '^[a-f0-9]{8}$';
