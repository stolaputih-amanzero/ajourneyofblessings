-- =========================================================
-- STORAGE BUCKET SETUP & POLICIES FOR KEEP SHINING
-- Jalankan perintah ini di SQL Editor Supabase Dashboard Anda
-- =========================================================

-- 1. Buat bucket 'gallery' dengan pengaturan yang sesuai
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Hapus policy lama jika ada untuk menghindari duplikasi
DROP POLICY IF EXISTS "Allow public read on gallery" ON storage.objects;
DROP POLICY IF EXISTS "Allow public insert on gallery" ON storage.objects;
DROP POLICY IF EXISTS "Allow public update on gallery" ON storage.objects;
DROP POLICY IF EXISTS "Allow public delete on gallery" ON storage.objects;

-- Policy A: Izinkan semua orang (anon & authenticated) untuk melihat/membaca gambar
CREATE POLICY "Allow public read on gallery"
ON storage.objects FOR SELECT
USING (bucket_id = 'gallery');

-- Policy B: Izinkan semua orang (anon & authenticated) untuk mengunggah (INSERT) gambar baru
CREATE POLICY "Allow public insert on gallery"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'gallery');

-- Policy C: Izinkan semua orang untuk memperbarui (UPDATE) data gambar di gallery
CREATE POLICY "Allow public update on gallery"
ON storage.objects FOR UPDATE
USING (bucket_id = 'gallery')
WITH CHECK (bucket_id = 'gallery');

-- Policy D: Izinkan semua orang untuk menghapus (DELETE) gambar di gallery
CREATE POLICY "Allow public delete on gallery"
ON storage.objects FOR DELETE
USING (bucket_id = 'gallery');
