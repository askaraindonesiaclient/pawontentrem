-- Pawon Tentrem Default Seed Data

-- 1. Site Settings
INSERT INTO public.site_settings (id, brand_name, tagline, address, whatsapp, maps_url, timezone, seo, version)
VALUES (
  'singleton',
  'Pawon Tentrem',
  'Rasa rumahan, suasana yang menentramkan.',
  'Perumahan Puncak Dieng Eksklusif Blok NN No. 21 (Dekat Kampus 2 UB), Kunci, Kalisongo, Kec. Dau, Kabupaten Malang, Jawa Timur 65151',
  '081234567890',
  'https://share.google/4QzXuDet1O7uiGwKI',
  'Asia/Jakarta',
  '{"meta_title":"Pawon Tentrem - Rumah Makan Prasmanan Jawa","meta_description":"Pilih lauk dan sayur sesuai selera. Sajian rumahan yang hangat dan menentramkan."}'::jsonb,
  1
)
ON CONFLICT (id) DO NOTHING;

-- 2. Opening Hours (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
INSERT INTO public.opening_hours (weekday, open_time, close_time, closed) VALUES
  (0, '08:00:00', '20:00:00', false),
  (1, '08:00:00', '20:00:00', false),
  (2, '08:00:00', '20:00:00', false),
  (3, '08:00:00', '20:00:00', false),
  (4, '08:00:00', '20:00:00', false),
  (5, '08:00:00', '20:00:00', false),
  (6, '08:00:00', '20:00:00', false)
ON CONFLICT (weekday) DO NOTHING;

-- 3. Content Sections
INSERT INTO public.content_sections (key, typed_payload, published_payload, version) VALUES
  ('hero', '{"eyebrow":"Rumah makan prasmanan","h1":"Rasa rumahan, suasana yang menentramkan.","body":"Pilih lauk dan sayur sesuai selera. Lihat sajian hari ini sebelum mampir.","cta_primary":"Lihat Menu Hari Ini","cta_secondary":"Lihat Lokasi"}'::jsonb, '{"eyebrow":"Rumah makan prasmanan","h1":"Rasa rumahan, suasana yang menentramkan.","body":"Pilih lauk dan sayur sesuai selera. Lihat sajian hari ini sebelum mampir.","cta_primary":"Lihat Menu Hari Ini","cta_secondary":"Lihat Lokasi"}'::jsonb, 1),
  ('steps', '{"step1_title":"Ambil piring","step1_desc":"Piring dan sendok bersih tersedia di awal meja saji.","step2_title":"Pilih sajian","step2_desc":"Pilih lauk, sayur hangat, dan pelengkap sesuai selera porsi Anda.","step3_title":"Ke kasir","step3_desc":"Tunjukkan pilihan Anda ke kasir untuk perhitungan bersahaja."}'::jsonb, '{"step1_title":"Ambil piring","step1_desc":"Piring dan sendok bersih tersedia di awal meja saji.","step2_title":"Pilih sajian","step2_desc":"Pilih lauk, sayur hangat, dan pelengkap sesuai selera porsi Anda.","step3_title":"Ke kasir","step3_desc":"Tunjukkan pilihan Anda ke kasir untuk perhitungan bersahaja."}'::jsonb, 1),
  ('story', '{"title":"Sederhana sajiannya, hangat suasananya.","p1":"Pawon Tentrem berawal dari keinginan menghadirkan kembali kenikmatan bersantap di dapur rumah nenek, di mana kehangatan aroma bumbu tradisional dan kebersamaan selalu menyambut siapa saja yang pulang.","p2":"Setiap pagi, kami memilih bahan segar dan meracik bumbu rempah pilihan tanpa kompromi rasa. Dari sayur lodeh gurih, tempe bacem legit, hingga sambal ulek segar, kami menyajikannya secara prasmanan agar Anda leluasa menikmati hidangan yang pas di hati."}'::jsonb, '{"title":"Sederhana sajiannya, hangat suasananya.","p1":"Pawon Tentrem berawal dari keinginan menghadirkan kembali kenikmatan bersantap di dapur rumah nenek, di mana kehangatan aroma bumbu tradisional dan kebersamaan selalu menyambut siapa saja yang pulang.","p2":"Setiap pagi, kami memilih bahan segar dan meracik bumbu rempah pilihan tanpa kompromi rasa. Dari sayur lodeh gurih, tempe bacem legit, hingga sambal ulek segar, kami menyajikannya secara prasmanan agar Anda leluasa menikmati hidangan yang pas di hati."}'::jsonb, 1)
ON CONFLICT (key) DO NOTHING;

