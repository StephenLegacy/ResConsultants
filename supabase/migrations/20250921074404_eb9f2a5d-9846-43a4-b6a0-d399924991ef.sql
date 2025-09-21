-- Create custom types
CREATE TYPE public.inquiry_status AS ENUM ('new', 'in_progress', 'responded', 'closed');
CREATE TYPE public.user_role AS ENUM ('admin', 'editor');
CREATE TYPE public.service_type AS ENUM ('concept_development', 'menu_engineering', 'operational_efficiency', 'staff_training', 'marketing_cost_control', 'recruiting');

-- Create profiles table for admin users
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'editor',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create inquiries table for contact form submissions
CREATE TABLE public.inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  service_interest service_type,
  message TEXT NOT NULL,
  preferred_contact_time TEXT,
  status inquiry_status NOT NULL DEFAULT 'new',
  assigned_to UUID REFERENCES public.profiles(id),
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create services table
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  short_description TEXT NOT NULL,
  long_description TEXT,
  icon_name TEXT NOT NULL,
  service_type service_type NOT NULL,
  features TEXT[] DEFAULT '{}',
  display_order INTEGER NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create clients table
CREATE TABLE public.clients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  industry TEXT,
  testimonial TEXT,
  website_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create case_studies table
CREATE TABLE public.case_studies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  client_id UUID REFERENCES public.clients(id),
  challenge TEXT NOT NULL,
  approach TEXT NOT NULL,
  results JSONB DEFAULT '{}',
  hero_image_url TEXT,
  gallery_images TEXT[] DEFAULT '{}',
  metrics JSONB DEFAULT '{}',
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  author_id UUID NOT NULL REFERENCES public.profiles(id),
  excerpt TEXT,
  content TEXT NOT NULL,
  thumbnail_url TEXT,
  video_url TEXT,
  video_duration INTEGER,
  tags TEXT[] DEFAULT '{}',
  topic TEXT,
  reading_time INTEGER,
  published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Profiles are viewable by authenticated users" ON public.profiles
FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can update their own profile" ON public.profiles
FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for inquiries (admin only)
CREATE POLICY "Inquiries viewable by admins" ON public.inquiries
FOR SELECT TO authenticated USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

CREATE POLICY "Inquiries manageable by admins" ON public.inquiries
FOR ALL TO authenticated USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- Public read access for published content
CREATE POLICY "Published services are publicly readable" ON public.services
FOR SELECT USING (published = true);

CREATE POLICY "Services manageable by authenticated users" ON public.services
FOR ALL TO authenticated USING (true);

CREATE POLICY "Published clients are publicly readable" ON public.clients
FOR SELECT USING (published = true);

CREATE POLICY "Clients manageable by authenticated users" ON public.clients
FOR ALL TO authenticated USING (true);

CREATE POLICY "Published case studies are publicly readable" ON public.case_studies
FOR SELECT USING (published = true);

CREATE POLICY "Case studies manageable by authenticated users" ON public.case_studies
FOR ALL TO authenticated USING (true);

CREATE POLICY "Published blog posts are publicly readable" ON public.blog_posts
FOR SELECT USING (published = true);

CREATE POLICY "Blog posts manageable by authenticated users" ON public.blog_posts
FOR ALL TO authenticated USING (true);

-- Create functions for automatic timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamps
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_inquiries_updated_at BEFORE UPDATE ON public.inquiries
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON public.clients
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_case_studies_updated_at BEFORE UPDATE ON public.case_studies
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default services
INSERT INTO public.services (title, slug, short_description, long_description, icon_name, service_type, features, display_order) VALUES
('Concept Development', 'concept-development', 'Transform your restaurant vision into a profitable reality with strategic concept development.', 'Our concept development service helps you create a unique restaurant identity that resonates with your target market while ensuring operational viability and profitability.', 'lightbulb', 'concept_development', ARRAY['Market Research', 'Brand Identity', 'Menu Positioning', 'Interior Design Guidance', 'Target Audience Analysis'], 1),
('Menu Engineering', 'menu-engineering', 'Optimize your menu for maximum profitability through strategic pricing and item placement.', 'Data-driven menu optimization that increases average order value and profit margins through strategic item placement, pricing psychology, and cost analysis.', 'clipboard-document-list', 'menu_engineering', ARRAY['Cost Analysis', 'Pricing Strategy', 'Item Positioning', 'Profitability Mapping', 'Seasonal Updates'], 2),
('Operational Efficiency', 'operational-efficiency', 'Streamline operations to reduce costs and improve service quality.', 'Comprehensive operational analysis and optimization to reduce waste, improve service times, and maximize efficiency across all restaurant functions.', 'cog-6-tooth', 'operational_efficiency', ARRAY['Process Optimization', 'Cost Reduction', 'Service Flow', 'Inventory Management', 'Quality Control'], 3),
('Staff Training', 'staff-training', 'Develop high-performing teams through comprehensive training programs.', 'Custom training programs that improve service quality, reduce turnover, and create a positive work culture that drives customer satisfaction.', 'academic-cap', 'staff_training', ARRAY['Service Excellence', 'Leadership Development', 'Communication Skills', 'Safety Protocols', 'Performance Management'], 4),
('Marketing & Cost Control', 'marketing-cost-control', 'Drive revenue growth while maintaining optimal cost structures.', 'Integrated marketing strategies and cost control systems that maximize ROI and ensure sustainable profitability.', 'chart-bar', 'marketing_cost_control', ARRAY['Digital Marketing', 'Cost Analysis', 'Revenue Optimization', 'Customer Retention', 'Financial Planning'], 5),
('Recruiting', 'recruiting', 'Find and retain top talent for your restaurant operations.', 'Strategic recruitment and retention solutions to build strong teams that deliver exceptional customer experiences.', 'users', 'recruiting', ARRAY['Talent Acquisition', 'Interview Process', 'Onboarding Systems', 'Retention Strategies', 'Performance Reviews'], 6);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    'editor'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();