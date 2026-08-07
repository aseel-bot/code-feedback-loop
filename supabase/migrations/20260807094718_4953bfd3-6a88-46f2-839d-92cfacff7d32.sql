
CREATE TYPE public.app_role AS ENUM ('admin', 'sales', 'content');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.is_staff(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id)
$$;

CREATE POLICY "users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "admins read all roles" ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- ============ CONTENT ============
CREATE TABLE public.cars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  brand text NOT NULL,
  model text NOT NULL,
  year integer NOT NULL,
  category text NOT NULL,
  price numeric,
  monthly numeric,
  fuel_type text,
  gear text,
  seats integer,
  tire text,
  consumption text,
  cover_image text,
  badges text[] NOT NULL DEFAULT '{}',
  intro text,
  views integer NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.car_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  car_id uuid NOT NULL REFERENCES public.cars(id) ON DELETE CASCADE,
  url text NOT NULL,
  alt text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.car_attributes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  car_id uuid NOT NULL REFERENCES public.cars(id) ON DELETE CASCADE,
  section text NOT NULL,
  label text NOT NULL,
  value text,
  is_available boolean,
  sort_order integer NOT NULL DEFAULT 0
);

CREATE TABLE public.offers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  subtitle text,
  body text,
  terms text[] NOT NULL DEFAULT '{}',
  offer_type text NOT NULL DEFAULT 'regular',
  image text,
  expires_at timestamptz,
  car_id uuid REFERENCES public.cars(id) ON DELETE SET NULL,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  description text,
  icon text,
  sort_order integer NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  excerpt text,
  body text,
  cover_image text,
  category text,
  tags text[] NOT NULL DEFAULT '{}',
  published_at timestamptz NOT NULL DEFAULT now(),
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  department text,
  location text,
  description text,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL DEFAULT 'عام',
  question text NOT NULL,
  answer text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.site_content (
  key text PRIMARY KEY,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- ============ LEADS ============
CREATE SEQUENCE public.lead_ref_seq START 1001;

CREATE OR REPLACE FUNCTION public.next_reference(_prefix text)
RETURNS text LANGUAGE sql VOLATILE SET search_path = public AS $$
  SELECT _prefix || '-' || to_char(now(), 'YYMM') || '-' || nextval('public.lead_ref_seq')::text
$$;

CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference text NOT NULL UNIQUE DEFAULT public.next_reference('PR'),
  lead_type text NOT NULL DEFAULT 'customer',
  full_name text NOT NULL,
  phone text NOT NULL,
  email text,
  company_name text,
  cr_number text,
  car_name text,
  car_id uuid REFERENCES public.cars(id) ON DELETE SET NULL,
  offer_id uuid REFERENCES public.offers(id) ON DELETE SET NULL,
  payment_type text NOT NULL DEFAULT 'finance',
  region text,
  monthly_salary numeric,
  employer text,
  down_payment numeric,
  term_months integer,
  estimated_monthly numeric,
  notes text,
  status text NOT NULL DEFAULT 'new',
  assigned_to uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference text NOT NULL UNIQUE DEFAULT public.next_reference('CT'),
  full_name text NOT NULL,
  phone text NOT NULL,
  email text,
  subject text,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  assigned_to uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.service_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference text NOT NULL UNIQUE DEFAULT public.next_reference('SV'),
  service_slug text NOT NULL,
  full_name text NOT NULL,
  phone text NOT NULL,
  car_info text,
  branch text,
  preferred_at text,
  notes text,
  status text NOT NULL DEFAULT 'new',
  assigned_to uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference text NOT NULL UNIQUE DEFAULT public.next_reference('JB'),
  full_name text NOT NULL,
  phone text NOT NULL,
  email text,
  job_slug text,
  cv_path text,
  status text NOT NULL DEFAULT 'new',
  assigned_to uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.lead_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  author_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  body text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ============ GRANTS ============
GRANT SELECT ON public.cars, public.car_images, public.car_attributes, public.offers,
  public.services, public.posts, public.jobs, public.faqs, public.site_content TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.cars, public.car_images, public.car_attributes,
  public.offers, public.services, public.posts, public.jobs, public.faqs, public.site_content TO authenticated;
GRANT ALL ON public.cars, public.car_images, public.car_attributes, public.offers,
  public.services, public.posts, public.jobs, public.faqs, public.site_content TO service_role;

GRANT INSERT ON public.leads, public.contact_messages, public.service_bookings, public.job_applications TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.leads, public.contact_messages, public.service_bookings,
  public.job_applications, public.lead_notes TO authenticated;
GRANT ALL ON public.leads, public.contact_messages, public.service_bookings,
  public.job_applications, public.lead_notes TO service_role;
GRANT USAGE ON SEQUENCE public.lead_ref_seq TO anon, authenticated, service_role;

-- ============ RLS ============
ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.car_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.car_attributes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read published cars" ON public.cars FOR SELECT TO anon, authenticated USING (is_published OR public.is_staff(auth.uid()));
CREATE POLICY "content manage cars" ON public.cars FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'content'))
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'content'));

CREATE POLICY "public read car images" ON public.car_images FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "content manage car images" ON public.car_images FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'content'))
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'content'));

CREATE POLICY "public read car attributes" ON public.car_attributes FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "content manage car attributes" ON public.car_attributes FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'content'))
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'content'));

CREATE POLICY "public read published offers" ON public.offers FOR SELECT TO anon, authenticated USING (is_published OR public.is_staff(auth.uid()));
CREATE POLICY "content manage offers" ON public.offers FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'content'))
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'content'));

CREATE POLICY "public read published services" ON public.services FOR SELECT TO anon, authenticated USING (is_published OR public.is_staff(auth.uid()));
CREATE POLICY "content manage services" ON public.services FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'content'))
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'content'));

CREATE POLICY "public read published posts" ON public.posts FOR SELECT TO anon, authenticated USING (is_published OR public.is_staff(auth.uid()));
CREATE POLICY "content manage posts" ON public.posts FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'content'))
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'content'));

CREATE POLICY "public read published jobs" ON public.jobs FOR SELECT TO anon, authenticated USING (is_published OR public.is_staff(auth.uid()));
CREATE POLICY "content manage jobs" ON public.jobs FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'content'))
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'content'));

CREATE POLICY "public read published faqs" ON public.faqs FOR SELECT TO anon, authenticated USING (is_published OR public.is_staff(auth.uid()));
CREATE POLICY "content manage faqs" ON public.faqs FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'content'))
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'content'));

CREATE POLICY "public read site content" ON public.site_content FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "content manage site content" ON public.site_content FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'content'))
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'content'));

CREATE POLICY "anyone can submit leads" ON public.leads FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "staff read leads" ON public.leads FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "staff update leads" ON public.leads FOR UPDATE TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "admin delete leads" ON public.leads FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

CREATE POLICY "anyone can submit messages" ON public.contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "staff read messages" ON public.contact_messages FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "staff update messages" ON public.contact_messages FOR UPDATE TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "admin delete messages" ON public.contact_messages FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

CREATE POLICY "anyone can book services" ON public.service_bookings FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "staff read bookings" ON public.service_bookings FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "staff update bookings" ON public.service_bookings FOR UPDATE TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "admin delete bookings" ON public.service_bookings FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

CREATE POLICY "anyone can apply" ON public.job_applications FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "staff read applications" ON public.job_applications FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "staff update applications" ON public.job_applications FOR UPDATE TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "admin delete applications" ON public.job_applications FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

CREATE POLICY "staff read lead notes" ON public.lead_notes FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "staff add lead notes" ON public.lead_notes FOR INSERT TO authenticated WITH CHECK (public.is_staff(auth.uid()) AND author_id = auth.uid());

CREATE TRIGGER trg_cars_updated BEFORE UPDATE ON public.cars FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_offers_updated BEFORE UPDATE ON public.offers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_posts_updated BEFORE UPDATE ON public.posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_leads_updated BEFORE UPDATE ON public.leads FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_messages_updated BEFORE UPDATE ON public.contact_messages FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_bookings_updated BEFORE UPDATE ON public.service_bookings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_applications_updated BEFORE UPDATE ON public.job_applications FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_cars_brand ON public.cars(brand);
CREATE INDEX idx_cars_published ON public.cars(is_published);
CREATE INDEX idx_car_images_car ON public.car_images(car_id, sort_order);
CREATE INDEX idx_car_attributes_car ON public.car_attributes(car_id, section, sort_order);
CREATE INDEX idx_leads_status ON public.leads(status, created_at DESC);
