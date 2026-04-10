-- Marine Conservation App Database Schema
-- Created for migrating hardcoded data to Supabase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table for authentication and role management
CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    avatar TEXT,
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Species table
CREATE TABLE species (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    scientific_name TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('Endangered', 'Critically Endangered', 'Vulnerable')),
    image_url TEXT,
    size TEXT,
    habitat TEXT,
    diet TEXT,
    identifying_features TEXT,
    fun_fact TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Regions table
CREATE TABLE regions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    country TEXT NOT NULL,
    description TEXT,
    featured BOOLEAN DEFAULT false,
    sightings_count INTEGER DEFAULT 0,
    image_url TEXT,
    highlights TEXT[], -- Array of highlights
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Region sites table (junction table for sites within regions)
CREATE TABLE region_sites (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    region_id UUID REFERENCES regions(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Species-Region junction table (many-to-many relationship)
CREATE TABLE region_species (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    region_id UUID REFERENCES regions(id) ON DELETE CASCADE,
    species_id UUID REFERENCES species(id) ON DELETE CASCADE,
    UNIQUE(region_id, species_id)
);

-- Sightings table
CREATE TABLE sightings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    author_id UUID REFERENCES users(id),
    author_name TEXT NOT NULL,
    avatar TEXT,
    image_url TEXT,
    species_id UUID REFERENCES species(id),
    species_name TEXT NOT NULL, -- Denormalized for performance
    location TEXT NOT NULL,
    date TEXT NOT NULL,
    description TEXT,
    likes INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0,
    size TEXT,
    behavior TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Conservation tips table
CREATE TABLE conservation_tips (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    category TEXT NOT NULL CHECK (category IN ('interaction_guidelines', 'conservation_actions')),
    icon_name TEXT NOT NULL, -- Lucide icon name
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Emergency contacts table
CREATE TABLE emergency_contacts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    region TEXT NOT NULL,
    contact TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_regions_featured ON regions(featured);
CREATE INDEX idx_regions_slug ON regions(slug);
CREATE INDEX idx_sightings_species ON sightings(species_id);
CREATE INDEX idx_sightings_date ON sightings(created_at);
CREATE INDEX idx_region_sites_region ON region_sites(region_id);
CREATE INDEX idx_conservation_tips_category ON conservation_tips(category);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_species_updated_at BEFORE UPDATE ON species FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_regions_updated_at BEFORE UPDATE ON regions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_region_sites_updated_at BEFORE UPDATE ON region_sites FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sightings_updated_at BEFORE UPDATE ON sightings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_conservation_tips_updated_at BEFORE UPDATE ON conservation_tips FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_emergency_contacts_updated_at BEFORE UPDATE ON emergency_contacts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE sightings ENABLE ROW LEVEL SECURITY;
ALTER TABLE species ENABLE ROW LEVEL SECURITY;
ALTER TABLE regions ENABLE ROW LEVEL SECURITY;
ALTER TABLE region_sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE conservation_tips ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE region_species ENABLE ROW LEVEL SECURITY;

-- Public read access for content tables
CREATE POLICY "Public can read species" ON species FOR SELECT USING (true);
CREATE POLICY "Public can read regions" ON regions FOR SELECT USING (true);
CREATE POLICY "Public can read region sites" ON region_sites FOR SELECT USING (true);
CREATE POLICY "Public can read conservation tips" ON conservation_tips FOR SELECT USING (true);
CREATE POLICY "Public can read emergency contacts" ON emergency_contacts FOR SELECT USING (true);
CREATE POLICY "Public can read region species" ON region_species FOR SELECT USING (true);
CREATE POLICY "Public can read sightings" ON sightings FOR SELECT USING (true);

-- Users can read their own profile
CREATE POLICY "Users can read own profile" ON users FOR SELECT USING (auth.uid() = id);

-- Admin policies for full access
CREATE POLICY "Admins have full access to users" ON users FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admins have full access to species" ON species FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admins have full access to regions" ON regions FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admins have full access to region sites" ON region_sites FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admins have full access to conservation tips" ON conservation_tips FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admins have full access to emergency contacts" ON emergency_contacts FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admins have full access to sightings" ON sightings FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admins have full access to region species" ON region_species FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Users can create sightings
CREATE POLICY "Users can create sightings" ON sightings FOR INSERT WITH CHECK (auth.uid() = author_id);
