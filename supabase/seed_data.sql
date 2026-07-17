-- =========================================================
-- SEED DATA FOR YVONNE WAKKARY RUMAMBI THANKSGIVING INVITATION
-- Paste this script into your Supabase Dashboard SQL Editor
-- to populate default data and make all sections visible.
-- =========================================================

-- 1. Insert Event Configuration
INSERT INTO event_config (key, value)
VALUES 
('event_info', '{
  "date": "Monday, August 3rd, 2026",
  "time": "18:00 WIB",
  "location": "Restaurant Beautika, 3rd Floor",
  "address": "Jalan Panglima Polim - Jakarta Selatan",
  "map_link": "https://maps.app.goo.gl/wRypd7zL2XfQd6t47"
}'),
('video_tribute', '{
  "youtube_id": "dQw4w9WgXcQ",
  "title": "70 Years of Grace & Blessing Video Tribute"
}'),
('hologram_config', '{
  "video_url": "https://www.youtube.com/embed/dQw4w9WgXcQ"
}'),
('music_config', '{
  "music_url": "/audio/theme.mp3"
}')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- 2. Insert Timeline Milestones
INSERT INTO timeline_milestones (year, title, description, image_url, order_index)
VALUES
(1956, 'A Blessed Beginning', 'Born on August 3rd, 1956, starting a beautiful life journey filled with warmth and promise.', 'https://images.unsplash.com/photo-1516624683217-bf02fc6b6b7c?auto=format&fit=crop&q=80&w=600', 0),
(1980, 'Family & Love', 'Entering a new chapter of marriage, building a home anchored in faith, love, and grace.', 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=600', 1),
(2026, 'The Golden Milestone', 'Celebrating 70 years of life, honoring a beautifully blessed journey with children, grandchildren, and family.', 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600', 2);

-- 3. Insert Gallery Photos
INSERT INTO gallery_photos (image_url, caption, order_index)
VALUES
('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600', 'Cherished moments with family and loved ones', 0),
('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=600', 'A life guided by faith and boundless gratitude', 1),
('https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=600', 'Beautiful milestones beautifully blessed', 2);

-- 4. Create a Test Guest for previewing the invitation
-- You can access this guest invitation via: yoursite.com/invite/test-guest
INSERT INTO guests (full_name, title, category, unique_token, rsvp_status, attendance_count, notes)
VALUES
('John Doe', 'Mr.', 'VVIP', 'test-guest', NULL, 1, '')
ON CONFLICT (unique_token) DO NOTHING;
