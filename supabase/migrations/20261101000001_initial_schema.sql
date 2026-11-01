-- Pawon Tentrem Initial Migration
-- Generated 2026-11-01 for PostgreSQL / Supabase

-- 1. Enums
DO $$ BEGIN
  CREATE TYPE public.menu_revision_state AS ENUM ('draft', 'published', 'archived');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE public.menu_availability AS ENUM ('available', 'sold_out');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE public.media_status AS ENUM ('pending', 'processing', 'ready', 'failed');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 2. Admin Profiles
CREATE TABLE IF NOT EXISTS public.admin_profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('owner', 'editor')),
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Site Settings (Singleton)
CREATE TABLE IF NOT EXISTS public.site_settings (
  id TEXT PRIMARY KEY DEFAULT 'singleton' CHECK (id = 'singleton'),
  brand_name TEXT NOT NULL DEFAULT 'Pawon Tentrem',
  tagline TEXT NOT NULL DEFAULT 'Rasa rumahan, suasana yang menentramkan.',
  address TEXT,
  whatsapp TEXT,
  maps_url TEXT,
  timezone TEXT NOT NULL DEFAULT 'Asia/Jakarta',
  seo JSONB NOT NULL DEFAULT '{"meta_title":"Pawon Tentrem - Rumah Makan Prasmanan Jawa","meta_description":"Pilih lauk dan sayur sesuai selera. Sajian rumahan yang hangat dan menentramkan."}'::jsonb,
  version INT NOT NULL DEFAULT 1 CHECK (version > 0),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Opening Hours
CREATE TABLE IF NOT EXISTS public.opening_hours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  weekday INT NOT NULL CHECK (weekday BETWEEN 0 AND 6),
  open_time TIME NOT NULL DEFAULT '08:00:00',
  close_time TIME NOT NULL DEFAULT '20:00:00',
  closed BOOLEAN NOT NULL DEFAULT false,
  UNIQUE(weekday)
);

-- 5. Opening Exceptions
CREATE TABLE IF NOT EXISTS public.opening_exceptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  local_date DATE NOT NULL UNIQUE,
  closed BOOLEAN NOT NULL DEFAULT true,
  open_time TIME,
  close_time TIME,
  note TEXT
);

-- 6. Media Assets & Variants
CREATE TABLE IF NOT EXISTS public.media_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  original_path TEXT NOT NULL,
  status public.media_status NOT NULL DEFAULT 'pending',
  width INT,
  height INT,
  checksum TEXT,
  rights TEXT DEFAULT 'Pawon Tentrem',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.media_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  media_id UUID NOT NULL REFERENCES public.media_assets(id) ON DELETE CASCADE,
  kind TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  width INT NOT NULL,
  height INT NOT NULL,
  format TEXT NOT NULL DEFAULT 'webp',
  bytes INT NOT NULL DEFAULT 0,
  UNIQUE(media_id, kind)
);

-- 7. Menu Days
CREATE TABLE IF NOT EXISTS public.menu_days (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_date DATE NOT NULL UNIQUE,
  published_revision_id UUID,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 8. Menu Revisions
CREATE TABLE IF NOT EXISTS public.menu_revisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_day_id UUID NOT NULL REFERENCES public.menu_days(id) ON DELETE CASCADE,
  state public.menu_revision_state NOT NULL DEFAULT 'draft',
  version INT NOT NULL DEFAULT 1 CHECK (version > 0),
  published_at TIMESTAMPTZ,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (id, menu_day_id)
);

-- Foreign key back to revisions
ALTER TABLE public.menu_days
  DROP CONSTRAINT IF EXISTS published_revision_same_day;
ALTER TABLE public.menu_days
  ADD CONSTRAINT published_revision_same_day
  FOREIGN KEY (published_revision_id, id)
  REFERENCES public.menu_revisions(id, menu_day_id) ON DELETE SET NULL;

CREATE UNIQUE INDEX IF NOT EXISTS one_active_draft_per_day
  ON public.menu_revisions(menu_day_id) WHERE state = 'draft';

-- 9. Menu Entries
CREATE TABLE IF NOT EXISTS public.menu_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  revision_id UUID NOT NULL REFERENCES public.menu_revisions(id) ON DELETE CASCADE,
  name TEXT NOT NULL CHECK (char_length(trim(name)) BETWEEN 2 AND 80),
  category TEXT NOT NULL DEFAULT 'lauk'
    CHECK (category IN ('lauk', 'sayur', 'pelengkap', 'sambal', 'minuman')),
  price_rupiah INT CHECK (price_rupiah IS NULL OR price_rupiah > 0),
  price_mode TEXT NOT NULL DEFAULT 'fixed' CHECK (price_mode IN ('fixed', 'from')),
  price_unit TEXT,
  availability public.menu_availability NOT NULL DEFAULT 'available',
  sort_order INT NOT NULL DEFAULT 0 CHECK (sort_order >= 0),
  hidden BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 10. Menu Entry Media
CREATE TABLE IF NOT EXISTS public.menu_entry_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entry_id UUID NOT NULL REFERENCES public.menu_entries(id) ON DELETE CASCADE,
  media_id UUID NOT NULL REFERENCES public.media_assets(id) ON DELETE CASCADE,
  sort_order INT NOT NULL DEFAULT 0 CHECK (sort_order >= 0),
  focal_x FLOAT NOT NULL DEFAULT 0.5 CHECK (focal_x BETWEEN 0 AND 1),
  focal_y FLOAT NOT NULL DEFAULT 0.5 CHECK (focal_y BETWEEN 0 AND 1),
  alt TEXT
);

-- 11. Content Sections
CREATE TABLE IF NOT EXISTS public.content_sections (
  key TEXT PRIMARY KEY,
  typed_payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  published_payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  version INT NOT NULL DEFAULT 1 CHECK (version > 0),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 12. Gallery Items
CREATE TABLE IF NOT EXISTS public.gallery_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  media_id UUID NOT NULL REFERENCES public.media_assets(id) ON DELETE CASCADE,
  category TEXT NOT NULL DEFAULT 'makanan' CHECK (category IN ('makanan', 'suasana', 'kegiatan')),
  caption TEXT,
  alt TEXT,
  published BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0 CHECK (sort_order >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 13. Audit Logs
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  result TEXT NOT NULL,
  payload JSONB DEFAULT '{}'::jsonb,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 14. Mutation Keys (Idempotency)
CREATE TABLE IF NOT EXISTS public.mutation_keys (
  actor_id UUID NOT NULL,
  operation TEXT NOT NULL,
  key TEXT NOT NULL,
  response_ref JSONB,
  expires_at TIMESTAMPTZ NOT NULL,
  PRIMARY KEY (actor_id, operation, key)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_menu_days_date ON public.menu_days(service_date);
CREATE INDEX IF NOT EXISTS idx_menu_revisions_day ON public.menu_revisions(menu_day_id);
CREATE INDEX IF NOT EXISTS idx_menu_entries_rev ON public.menu_entries(revision_id);
CREATE INDEX IF NOT EXISTS idx_menu_entry_media_entry ON public.menu_entry_media(entry_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_timestamp ON public.audit_logs(timestamp DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opening_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opening_exceptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_revisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_entry_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mutation_keys ENABLE ROW LEVEL SECURITY;

-- Helper check function for admin
CREATE OR REPLACE FUNCTION public.is_active_admin()
RETURNS BOOLEAN LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE user_id = auth.uid() AND active = true
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.is_owner()
RETURNS BOOLEAN LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE user_id = auth.uid() AND active = true AND role = 'owner'
  );
END;
$$;

-- RLS Policies
-- Public can read published menu and site settings
DROP POLICY IF EXISTS "Public can view site settings" ON public.site_settings;
CREATE POLICY "Public can view site settings" ON public.site_settings
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public can view opening hours" ON public.opening_hours;
CREATE POLICY "Public can view opening hours" ON public.opening_hours
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public can view opening exceptions" ON public.opening_exceptions;
CREATE POLICY "Public can view opening exceptions" ON public.opening_exceptions
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public can view published content" ON public.content_sections;
CREATE POLICY "Public can view published content" ON public.content_sections
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public can view published gallery items" ON public.gallery_items;
CREATE POLICY "Public can view published gallery items" ON public.gallery_items
  FOR SELECT TO anon, authenticated USING (published = true);

-- Admins full access to tables
DROP POLICY IF EXISTS "Admin full access admin_profiles" ON public.admin_profiles;
CREATE POLICY "Admin full access admin_profiles" ON public.admin_profiles
  FOR ALL TO authenticated USING (public.is_active_admin());

DROP POLICY IF EXISTS "Admin full access site_settings" ON public.site_settings;
CREATE POLICY "Admin full access site_settings" ON public.site_settings
  FOR ALL TO authenticated USING (public.is_active_admin());

DROP POLICY IF EXISTS "Admin full access opening_hours" ON public.opening_hours;
CREATE POLICY "Admin full access opening_hours" ON public.opening_hours
  FOR ALL TO authenticated USING (public.is_active_admin());

DROP POLICY IF EXISTS "Admin full access opening_exceptions" ON public.opening_exceptions;
CREATE POLICY "Admin full access opening_exceptions" ON public.opening_exceptions
  FOR ALL TO authenticated USING (public.is_active_admin());

DROP POLICY IF EXISTS "Admin full access media_assets" ON public.media_assets;
CREATE POLICY "Admin full access media_assets" ON public.media_assets
  FOR ALL TO authenticated USING (public.is_active_admin());

DROP POLICY IF EXISTS "Admin full access media_variants" ON public.media_variants;
CREATE POLICY "Admin full access media_variants" ON public.media_variants
  FOR ALL TO authenticated USING (public.is_active_admin());

DROP POLICY IF EXISTS "Admin full access menu_days" ON public.menu_days;
CREATE POLICY "Admin full access menu_days" ON public.menu_days
  FOR ALL TO authenticated USING (public.is_active_admin());

DROP POLICY IF EXISTS "Admin full access menu_revisions" ON public.menu_revisions;
CREATE POLICY "Admin full access menu_revisions" ON public.menu_revisions
  FOR ALL TO authenticated USING (public.is_active_admin());

DROP POLICY IF EXISTS "Admin full access menu_entries" ON public.menu_entries;
CREATE POLICY "Admin full access menu_entries" ON public.menu_entries
  FOR ALL TO authenticated USING (public.is_active_admin());

DROP POLICY IF EXISTS "Admin full access menu_entry_media" ON public.menu_entry_media;
CREATE POLICY "Admin full access menu_entry_media" ON public.menu_entry_media
  FOR ALL TO authenticated USING (public.is_active_admin());

DROP POLICY IF EXISTS "Admin full access content_sections" ON public.content_sections;
CREATE POLICY "Admin full access content_sections" ON public.content_sections
  FOR ALL TO authenticated USING (public.is_active_admin());

DROP POLICY IF EXISTS "Admin full access gallery_items" ON public.gallery_items;
CREATE POLICY "Admin full access gallery_items" ON public.gallery_items
  FOR ALL TO authenticated USING (public.is_active_admin());

DROP POLICY IF EXISTS "Admin full access audit_logs" ON public.audit_logs;
CREATE POLICY "Admin full access audit_logs" ON public.audit_logs
  FOR ALL TO authenticated USING (public.is_active_admin());

-- RPC: Publish Menu Revision (atomic transaction)
CREATE OR REPLACE FUNCTION public.publish_menu_revision(
  p_day_id UUID,
  p_revision_id UUID,
  p_expected_version INT,
  p_idempotency_key TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_actor_id UUID;
  v_day_record RECORD;
  v_rev_record RECORD;
  v_prev_pub_id UUID;
  v_items_count INT;
  v_cached_response JSONB;
BEGIN
  v_actor_id := auth.uid();
  IF v_actor_id IS NULL OR NOT public.is_active_admin() THEN
    RAISE EXCEPTION 'UNAUTHENTICATED_OR_FORBIDDEN';
  END IF;

  -- Check idempotency
  SELECT response_ref INTO v_cached_response
  FROM public.mutation_keys
  WHERE actor_id = v_actor_id AND operation = 'publish_menu' AND key = p_idempotency_key AND expires_at > now();

  IF v_cached_response IS NOT NULL THEN
    RETURN v_cached_response;
  END IF;

  -- Lock day record
  SELECT * INTO v_day_record
  FROM public.menu_days
  WHERE id = p_day_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'DAY_NOT_FOUND';
  END IF;

  -- Validate revision
  SELECT * INTO v_rev_record
  FROM public.menu_revisions
  WHERE id = p_revision_id AND menu_day_id = p_day_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'REVISION_NOT_FOUND';
  END IF;

  IF v_rev_record.state <> 'draft' THEN
    RAISE EXCEPTION 'REVISION_NOT_DRAFT';
  END IF;

  IF v_rev_record.version <> p_expected_version THEN
    RAISE EXCEPTION 'VERSION_CONFLICT';
  END IF;

  -- Check at least 1 non-hidden item
  SELECT count(*) INTO v_items_count
  FROM public.menu_entries
  WHERE revision_id = p_revision_id AND hidden = false;

  IF v_items_count < 1 THEN
    RAISE EXCEPTION 'NO_ITEMS_TO_PUBLISH';
  END IF;

  v_prev_pub_id := v_day_record.published_revision_id;

  -- Archive previous published revision
  IF v_prev_pub_id IS NOT NULL AND v_prev_pub_id <> p_revision_id THEN
    UPDATE public.menu_revisions
    SET state = 'archived'
    WHERE id = v_prev_pub_id;
  END IF;

  -- Mark current revision published
  UPDATE public.menu_revisions
  SET state = 'published',
      published_at = now()
  WHERE id = p_revision_id;

  -- Update day published pointer
  UPDATE public.menu_days
  SET published_revision_id = p_revision_id,
      updated_at = now()
  WHERE id = p_day_id;

  -- Record audit
  INSERT INTO public.audit_logs (actor_id, action, entity_type, entity_id, result, payload)
  VALUES (
    v_actor_id,
    'PUBLISH_MENU_REVISION',
    'menu_day',
    p_day_id,
    'SUCCESS',
    jsonb_build_object('revision_id', p_revision_id, 'version', p_expected_version, 'items_count', v_items_count)
  );

  v_cached_response := jsonb_build_object(
    'publicationId', p_revision_id,
    'dayId', p_day_id,
    'publishedAt', now(),
    'status', 'published'
  );

  -- Store idempotency key (valid for 24 hours)
  INSERT INTO public.mutation_keys (actor_id, operation, key, response_ref, expires_at)
  VALUES (v_actor_id, 'publish_menu', p_idempotency_key, v_cached_response, now() + interval '24 hours')
  ON CONFLICT (actor_id, operation, key) DO UPDATE
  SET response_ref = EXCLUDED.response_ref, expires_at = EXCLUDED.expires_at;

  RETURN v_cached_response;
END;
$$;

-- Function: Get Today Published Menu for Asia/Jakarta timezone
CREATE OR REPLACE FUNCTION public.get_today_published_menu()
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_today DATE;
  v_day_record RECORD;
  v_rev_record RECORD;
  v_items JSONB;
BEGIN
  v_today := (now() AT TIME ZONE 'Asia/Jakarta')::date;

  SELECT * INTO v_day_record
  FROM public.menu_days
  WHERE service_date = v_today;

  IF NOT FOUND OR v_day_record.published_revision_id IS NULL THEN
    RETURN jsonb_build_object(
      'serverNow', now(),
      'serviceDate', v_today,
      'status', 'not_published',
      'items', '[]'::jsonb
    );
  END IF;

  SELECT * INTO v_rev_record
  FROM public.menu_revisions
  WHERE id = v_day_record.published_revision_id;

  SELECT coalesce(jsonb_agg(
    jsonb_build_object(
      'id', e.id,
      'name', e.name,
      'category', e.category,
      'priceRupiah', e.price_rupiah,
      'priceMode', e.price_mode,
      'priceUnit', e.price_unit,
      'availability', e.availability,
      'sortOrder', e.sort_order,
      'media', coalesce((
        SELECT jsonb_agg(
          jsonb_build_object(
            'id', m.media_id,
            'focalX', m.focal_x,
            'focalY', m.focal_y,
            'alt', m.alt
          ) ORDER BY m.sort_order ASC
        )
        FROM public.menu_entry_media m
        WHERE m.entry_id = e.id
      ), '[]'::jsonb)
    ) ORDER BY e.sort_order ASC, e.name ASC
  ), '[]'::jsonb) INTO v_items
  FROM public.menu_entries e
  WHERE e.revision_id = v_rev_record.id AND e.hidden = false;

  RETURN jsonb_build_object(
    'serverNow', now(),
    'serviceDate', v_today,
    'status', 'published',
    'publicationId', v_rev_record.id,
    'publishedAt', v_rev_record.published_at,
    'items', v_items
  );
END;
$$;

