import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          avatar: string | null
          role: 'user' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          avatar?: string | null
          role?: 'user' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          avatar?: string | null
          role?: 'user' | 'admin'
          created_at?: string
          updated_at?: string
        }
      }
      species: {
        Row: {
          id: string
          name: string
          scientific_name: string
          status: 'Endangered' | 'Critically Endangered' | 'Vulnerable'
          image_url: string | null
          size: string | null
          habitat: string | null
          diet: string | null
          identifying_features: string | null
          fun_fact: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          scientific_name: string
          status: 'Endangered' | 'Critically Endangered' | 'Vulnerable'
          image_url?: string | null
          size?: string | null
          habitat?: string | null
          diet?: string | null
          identifying_features?: string | null
          fun_fact?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          scientific_name?: string
          status?: 'Endangered' | 'Critically Endangered' | 'Vulnerable'
          image_url?: string | null
          size?: string | null
          habitat?: string | null
          diet?: string | null
          identifying_features?: string | null
          fun_fact?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      regions: {
        Row: {
          id: string
          slug: string
          name: string
          country: string
          description: string | null
          featured: boolean
          sightings_count: number
          image_url: string | null
          highlights: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          country: string
          description?: string | null
          featured?: boolean
          sightings_count?: number
          image_url?: string | null
          highlights?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          country?: string
          description?: string | null
          featured?: boolean
          sightings_count?: number
          image_url?: string | null
          highlights?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      region_sites: {
        Row: {
          id: string
          region_id: string
          name: string
          type: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          region_id: string
          name: string
          type: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          region_id?: string
          name?: string
          type?: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      region_species: {
        Row: {
          id: string
          region_id: string
          species_id: string
        }
        Insert: {
          id?: string
          region_id: string
          species_id: string
        }
        Update: {
          id?: string
          region_id?: string
          species_id?: string
        }
      }
      sightings: {
        Row: {
          id: string
          author_id: string | null
          author_name: string
          avatar: string | null
          image_url: string | null
          species_id: string | null
          species_name: string
          location: string
          date: string
          description: string | null
          likes: number
          comments: number
          size: string | null
          behavior: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          author_id?: string | null
          author_name: string
          avatar?: string | null
          image_url?: string | null
          species_id?: string | null
          species_name: string
          location: string
          date: string
          description?: string | null
          likes?: number
          comments?: number
          size?: string | null
          behavior?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          author_id?: string | null
          author_name?: string
          avatar?: string | null
          image_url?: string | null
          species_id?: string | null
          species_name?: string
          location?: string
          date?: string
          description?: string | null
          likes?: number
          comments?: number
          size?: string | null
          behavior?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      conservation_tips: {
        Row: {
          id: string
          category: 'interaction_guidelines' | 'conservation_actions'
          icon_name: string
          title: string
          description: string
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          category: 'interaction_guidelines' | 'conservation_actions'
          icon_name: string
          title: string
          description: string
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          category?: 'interaction_guidelines' | 'conservation_actions'
          icon_name?: string
          title?: string
          description?: string
          display_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      emergency_contacts: {
        Row: {
          id: string
          region: string
          contact: string
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          region: string
          contact: string
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          region?: string
          contact?: string
          display_order?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
