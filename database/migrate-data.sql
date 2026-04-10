-- Data migration script for Marine Conservation App
-- This script populates the database with existing hardcoded data

-- Insert species data
INSERT INTO species (name, scientific_name, status, image_url, size, habitat, diet, identifying_features, fun_fact) VALUES
('Green Sea Turtle', 'Chelonia mydas', 'Endangered', '/src/assets/turtle-3.jpg', 'Up to 150cm, 130–160kg', 'Tropical and subtropical shallow waters, seagrass beds, coral reefs', 'Herbivorous — primarily seagrasses and algae (adults)', 'Oval carapace with olive-green to dark brown coloring. Single pair of prefrontal scales. Serrated lower jaw.', 'The only herbivorous sea turtle as adults. Their name comes from the green color of their body fat, not their shell.'),
('Hawksbill Turtle', 'Eretmochelys imbricata', 'Critically Endangered', '/src/assets/turtle-1.jpg', 'Up to 90cm, 45–75kg', 'Coral reefs, rocky areas, lagoons, and mangrove bays', 'Sponges, anemones, squid, and shrimp', 'Narrow, pointed beak (like a hawk). Beautiful overlapping scutes with amber and brown patterns. Serrated shell edge.', 'They play a critical role in coral reef health by controlling sponge populations that would otherwise outcompete reef-building corals.'),
('Loggerhead Turtle', 'Caretta caretta', 'Vulnerable', '/src/assets/turtle-4.jpg', 'Up to 120cm, 80–200kg', 'Open ocean, coastal bays, estuaries, and shallow continental shelves', 'Carnivorous — crabs, mollusks, jellyfish, fish', 'Distinctively large head with powerful jaws. Reddish-brown carapace, heart-shaped. Five or more costal scutes.', 'Named for their disproportionately large heads. They can crush heavy-shelled prey like conchs and horseshoe crabs with their powerful jaws.'),
('Leatherback Turtle', 'Dermochelys coriacea', 'Vulnerable', '/src/assets/turtle-2.jpg', 'Up to 180cm, 250–700kg', 'Open ocean, deep water; widest distribution of all sea turtles', 'Primarily jellyfish', 'No hard shell — leathery skin with 7 distinct ridges. Largest sea turtle species. Dark with white or pink spots.', 'The largest living turtle and the fourth-heaviest reptile. They can dive to depths of over 1,200 meters and regulate body temperature, allowing them to swim in near-arctic waters.');

-- Insert regions data
INSERT INTO regions (slug, name, country, description, featured, sightings_count, image_url, highlights) VALUES
('lombok', 'Lombok', 'Indonesia', 'Lombok and the surrounding Gili Islands are one of Southeast Asia''s most important sea turtle habitats. The crystal-clear waters around Gili Trawangan, Gili Meno, and Gili Air are famous for year-round turtle encounters, while the southern beaches of Lombok host vital nesting sites for green and hawksbill turtles.', true, 4821, '/src/assets/about-hero.jpg', ARRAY['Year-round turtle sightings in the Gili Islands', 'Community-run hatcheries releasing thousands of hatchlings annually', 'Nesting season: May – October on southern beaches', '3 species commonly sighted in the region', 'Growing eco-tourism supporting local conservation efforts']),
('coral-triangle', 'Coral Triangle', 'Southeast Asia', 'The Coral Triangle spans Indonesia, Malaysia, Philippines, Papua New Guinea, Solomon Islands, and Timor-Leste. It''s the global epicenter of marine biodiversity and home to 6 of the world''s 7 sea turtle species.', false, 3412, '/src/assets/turtle-3.jpg', ARRAY['Home to 6 of 7 sea turtle species', 'The most biodiverse marine region on Earth', 'Numerous marine protected areas']),
('caribbean', 'Caribbean', 'Multiple Nations', 'The Caribbean Sea is critical habitat for green, hawksbill, leatherback, and loggerhead turtles. Major nesting beaches are found from Costa Rica to Barbados.', false, 2134, '/src/assets/turtle-1.jpg', ARRAY['Critical nesting habitat for multiple species', 'Strong regional conservation networks (WIDECAST)']),
('great-barrier-reef', 'Great Barrier Reef', 'Australia', 'The Great Barrier Reef supports 6 sea turtle species and contains some of the largest green turtle nesting sites in the world, particularly on Raine Island.', false, 1876, '/src/assets/turtle-4.jpg', ARRAY['World''s largest green turtle rookery at Raine Island', '6 species present in the reef system']);

-- Get region IDs for reference
DO $$
DECLARE
    lombok_uuid UUID;
    coral_triangle_uuid UUID;
    caribbean_uuid UUID;
    gbr_uuid UUID;
BEGIN
    SELECT id INTO lombok_uuid FROM regions WHERE slug = 'lombok';
    SELECT id INTO coral_triangle_uuid FROM regions WHERE slug = 'coral-triangle';
    SELECT id INTO caribbean_uuid FROM regions WHERE slug = 'caribbean';
    SELECT id INTO gbr_uuid FROM regions WHERE slug = 'great-barrier-reef';

    -- Insert region sites for Lombok
    INSERT INTO region_sites (region_id, name, type, description) VALUES
    (lombok_uuid, 'Gili Trawangan — Turtle Point', 'Diving / Snorkeling', 'The most popular turtle viewing spot. Green and hawksbill turtles rest on coral ledges at 8–15m depth. Almost guaranteed sightings year-round.'),
    (lombok_uuid, 'Gili Meno — Turtle Sanctuary', 'Snorkeling / Conservation', 'Shallow seagrass beds where juvenile green turtles feed. The island also hosts a small turtle hatchery and conservation center.'),
    (lombok_uuid, 'Gili Air — Hans Reef', 'Diving', 'A lesser-known dive site with frequent turtle sightings. Hawksbills are often seen feeding on sponges along the wall.'),
    (lombok_uuid, 'Kuta Beach, South Lombok', 'Nesting Beach', 'Pristine beaches where olive ridley and green turtles come ashore to nest between May and October. Local volunteers monitor nests nightly.'),
    (lombok_uuid, 'Belongas Bay', 'Diving / Hatchery', 'Remote bay in south Lombok with a community-run turtle hatchery. Hatchling releases happen regularly during nesting season.'),
    (lombok_uuid, 'Sekotong Peninsula', 'Snorkeling', 'Quiet southwest coast with healthy reefs and regular green turtle encounters. Less crowded than the Gili Islands.');

    -- Insert region sites for Coral Triangle
    INSERT INTO region_sites (region_id, name, type, description) VALUES
    (coral_triangle_uuid, 'Raja Ampat, Indonesia', 'Diving', 'Pristine reefs with regular hawksbill and green turtle sightings.'),
    (coral_triangle_uuid, 'Sipadan, Malaysia', 'Diving', 'World-famous dive site with large green turtle populations.'),
    (coral_triangle_uuid, 'Apo Island, Philippines', 'Snorkeling / Diving', 'Marine sanctuary with healthy turtle populations.');

    -- Insert region sites for Caribbean
    INSERT INTO region_sites (region_id, name, type, description) VALUES
    (caribbean_uuid, 'Tortuguero, Costa Rica', 'Nesting Beach', 'One of the most important green turtle nesting sites in the Western Hemisphere.'),
    (caribbean_uuid, 'Bonaire', 'Diving / Snorkeling', 'Protected waters with thriving hawksbill and green turtle populations.');

    -- Insert region sites for Great Barrier Reef
    INSERT INTO region_sites (region_id, name, type, description) VALUES
    (gbr_uuid, 'Raine Island', 'Nesting Beach', 'The world''s largest green turtle nesting site — up to 60,000 females nest here each season.'),
    (gbr_uuid, 'Lady Elliot Island', 'Diving / Snorkeling', 'Year-round turtle encounters in gin-clear waters.');
END $$;

-- Link species to regions
DO $$
DECLARE
    lombok_uuid UUID;
    coral_triangle_uuid UUID;
    caribbean_uuid UUID;
    gbr_uuid UUID;
    green_uuid UUID;
    hawksbill_uuid UUID;
    loggerhead_uuid UUID;
    leatherback_uuid UUID;
    olive_ridley_uuid UUID;
    flatback_uuid UUID;
BEGIN
    -- Get region IDs
    SELECT id INTO lombok_uuid FROM regions WHERE slug = 'lombok';
    SELECT id INTO coral_triangle_uuid FROM regions WHERE slug = 'coral-triangle';
    SELECT id INTO caribbean_uuid FROM regions WHERE slug = 'caribbean';
    SELECT id INTO gbr_uuid FROM regions WHERE slug = 'great-barrier-reef';

    -- Get species IDs
    SELECT id INTO green_uuid FROM species WHERE name = 'Green Sea Turtle';
    SELECT id INTO hawksbill_uuid FROM species WHERE name = 'Hawksbill Turtle';
    SELECT id INTO loggerhead_uuid FROM species WHERE name = 'Loggerhead Turtle';
    SELECT id INTO leatherback_uuid FROM species WHERE name = 'Leatherback Turtle';

    -- Link species to regions
    -- Lombok: Green Sea Turtle, Hawksbill Turtle, Olive Ridley
    INSERT INTO region_species (region_id, species_id) VALUES
    (lombok_uuid, green_uuid),
    (lombok_uuid, hawksbill_uuid);

    -- Coral Triangle: All 6 species
    INSERT INTO region_species (region_id, species_id) VALUES
    (coral_triangle_uuid, green_uuid),
    (coral_triangle_uuid, hawksbill_uuid),
    (coral_triangle_uuid, leatherback_uuid),
    (coral_triangle_uuid, loggerhead_uuid);

    -- Caribbean: Green Sea Turtle, Hawksbill Turtle, Leatherback Turtle, Loggerhead Turtle
    INSERT INTO region_species (region_id, species_id) VALUES
    (caribbean_uuid, green_uuid),
    (caribbean_uuid, hawksbill_uuid),
    (caribbean_uuid, leatherback_uuid),
    (caribbean_uuid, loggerhead_uuid);

    -- Great Barrier Reef: All 6 species
    INSERT INTO region_species (region_id, species_id) VALUES
    (gbr_uuid, green_uuid),
    (gbr_uuid, hawksbill_uuid),
    (gbr_uuid, loggerhead_uuid),
    (gbr_uuid, leatherback_uuid);
END $$;

-- Insert conservation tips
INSERT INTO conservation_tips (category, icon_name, title, description, display_order) VALUES
('interaction_guidelines', 'Eye', 'Observe from a Distance', 'Stay at least 3 meters (10 feet) away from sea turtles in the water. On land, maintain at least 6 meters (20 feet). Use binoculars or a zoom lens for a closer look.', 1),
('interaction_guidelines', 'HandHeart', 'Never Touch or Ride', 'Touching turtles can stress them, damage their shells, and transfer harmful bacteria in both directions. Never attempt to ride, grab, or restrict their movement.', 2),
('interaction_guidelines', 'Camera', 'Photography Tips', 'Turn off flash — it can disorient turtles, especially hatchlings. Approach slowly and let the turtle come to you. Never chase a swimming turtle for a photo.', 3),
('interaction_guidelines', 'Waves', 'Nesting Beach Behavior', 'Keep beaches dark at night during nesting season — no flashlights or phone screens. Don''t walk on marked nests. If you see a nesting female, stay behind her and remain silent.', 4),
('conservation_actions', 'Trash2', 'Reduce Plastic Pollution', 'Sea turtles mistake plastic bags for jellyfish. Use reusable bags, avoid single-use plastics, and participate in beach cleanups.', 1),
('conservation_actions', 'Lightbulb', 'Support Light Management', 'Artificial lights near nesting beaches disorient hatchlings. Advocate for turtle-safe lighting in coastal communities.', 2),
('conservation_actions', 'TreePalm', 'Protect Coastal Habitats', 'Support mangrove restoration, seagrass conservation, and coral reef protection — these are critical sea turtle habitats.', 3),
('conservation_actions', 'ShieldAlert', 'Report Injured Turtles', 'If you find an injured, entangled, or stranded sea turtle, do not attempt to move it. Contact local wildlife authorities or marine rescue immediately.', 4);

-- Insert emergency contacts
INSERT INTO emergency_contacts (region, contact, display_order) VALUES
('United States', 'FWC: 1-888-404-FWCC (3922)', 1),
('Australia', '1300 ANIMAL (264625)', 2),
('Caribbean', 'WIDECAST Network — widecast.org', 3),
('Mediterranean', 'MEDASSET — medasset.org', 4);

-- Insert sample sightings
INSERT INTO sightings (author_name, avatar, image_url, species_name, location, date, description, likes, comments, size, behavior) VALUES
('Wayan Surya', 'WS', '/src/assets/turtle-1.jpg', 'Hawksbill Turtle', 'Gili Trawangan, Lombok', 'April 5, 2026', 'Spotted this beautiful hawksbill feeding on sponges near the famous turtle point dive site! She was very calm and let us observe from about 4 meters. The reef here is thriving.', 142, 23, '~70cm carapace', 'Feeding on sponges'),
('Ayu Lestari', 'AL', '/src/assets/turtle-3.jpg', 'Green Sea Turtle', 'Gili Meno, Lombok', 'April 3, 2026', 'Green turtle grazing on seagrass in the shallow waters of Gili Meno. This area is such an important feeding ground — we counted 4 turtles in just one snorkel session!', 189, 31, '~90cm carapace', 'Grazing on seagrass'),
('James Okafor', 'JO', '/src/assets/turtle-2.jpg', 'Olive Ridley', 'Kuta Beach, South Lombok', 'March 30, 2026', 'Witnessed an arriving female at sunset during the nesting season on the pristine beaches of South Lombok. The local conservation team was monitoring the area. Truly humbling.', 231, 47, '~65cm carapace', 'Nesting'),
('Sophie Chen', 'SC', '/src/assets/turtle-4.jpg', 'Green Turtle Hatchlings', 'Belongas Bay, Lombok', 'March 27, 2026', 'Magical hatchling release organized by the local turtle conservation center! Over 50 baby green turtles made their way to the ocean at dawn. The community effort here is incredible.', 412, 89, '~5cm each', 'Hatching & ocean entry');
