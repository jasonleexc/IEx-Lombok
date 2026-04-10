import { supabase } from '@/supabase'
import { cacheService } from './cache'
import type { Database } from '@/supabase'

// Types for the frontend that match the original hardcoded data structure
export type SpeciesInfo = {
  id: string
  name: string
  scientific: string
  status: 'Endangered' | 'Critically Endangered' | 'Vulnerable'
  image: string
  size: string
  habitat: string
  diet: string
  identifying: string
  funFact: string
}

export type RegionSite = {
  id: string
  name: string
  type: string
  description: string
}

export type RegionInfo = {
  id: string
  slug: string
  name: string
  country: string
  description: string
  featured: boolean
  sightings: number
  species: string[]
  sites: RegionSite[]
  image: string
  highlights: string[]
}

export type SightingMock = {
  id: string
  author: string
  avatar: string
  image: string
  species: string
  location: string
  date: string
  description: string
  likes: number
  comments: number
  size?: string
  behavior?: string
}

export type ConservationTipItem = {
  id: string
  icon: string
  title: string
  description: string
}

export type EmergencyContact = {
  id: string
  region: string
  contact: string
}

export type StatItem = {
  value: string
  label: string
}

// Data service with caching
class DataService {
  private readonly CACHE_KEYS = {
    SPECIES: 'species',
    REGIONS: 'regions',
    SIGHTINGS: 'sightings',
    CONSERVATION_TIPS: 'conservation_tips',
    EMERGENCY_CONTACTS: 'emergency_contacts',
    STATS: 'stats'
  }

  private readonly CACHE_TTL = {
    SPECIES: 10 * 60 * 1000, // 10 minutes
    REGIONS: 10 * 60 * 1000, // 10 minutes
    SIGHTINGS: 2 * 60 * 1000, // 2 minutes
    CONSERVATION_TIPS: 30 * 60 * 1000, // 30 minutes
    EMERGENCY_CONTACTS: 60 * 60 * 1000, // 1 hour
    STATS: 5 * 60 * 1000 // 5 minutes
  }

  // Species methods
  async getSpecies(): Promise<SpeciesInfo[]> {
    const cached = cacheService.get<SpeciesInfo[]>(this.CACHE_KEYS.SPECIES)
    if (cached) return cached

    const { data, error } = await supabase
      .from('species')
      .select('*')
      .order('name')

    if (error) throw error

    const species: SpeciesInfo[] = data.map(s => ({
      id: s.id,
      name: s.name,
      scientific: s.scientific_name,
      status: s.status,
      image: s.image_url || '',
      size: s.size || '',
      habitat: s.habitat || '',
      diet: s.diet || '',
      identifying: s.identifying_features || '',
      funFact: s.fun_fact || ''
    }))

    cacheService.set(this.CACHE_KEYS.SPECIES, species, this.CACHE_TTL.SPECIES)
    return species
  }

  async updateSpecies(id: string, updates: Partial<SpeciesInfo>): Promise<void> {
    const { error } = await supabase
      .from('species')
      .update({
        name: updates.name,
        scientific_name: updates.scientific,
        status: updates.status,
        image_url: updates.image,
        size: updates.size,
        habitat: updates.habitat,
        diet: updates.diet,
        identifying_features: updates.identifying,
        fun_fact: updates.funFact
      })
      .eq('id', id)

    if (error) throw error

    // Invalidate cache
    cacheService.invalidate(this.CACHE_KEYS.SPECIES)
  }

  // Regions methods
  async getRegions(): Promise<RegionInfo[]> {
    const cached = cacheService.get<RegionInfo[]>(this.CACHE_KEYS.REGIONS)
    if (cached) return cached

    const { data, error } = await supabase
      .from('regions')
      .select(`
        *,
        region_sites (
          id,
          name,
          type,
          description
        ),
        region_species (
          species (
            name
          )
        )
      `)
      .order('featured', { ascending: false })
      .order('name')

    if (error) throw error

    const regions: RegionInfo[] = data.map(r => ({
      id: r.id,
      slug: r.slug,
      name: r.name,
      country: r.country,
      description: r.description || '',
      featured: r.featured,
      sightings: r.sightings_count,
      species: r.region_species.map(rs => rs.species.name),
      sites: r.region_sites.map(rs => ({
        id: rs.id,
        name: rs.name,
        type: rs.type,
        description: rs.description || ''
      })),
      image: r.image_url || '',
      highlights: r.highlights || []
    }))

    cacheService.set(this.CACHE_KEYS.REGIONS, regions, this.CACHE_TTL.REGIONS)
    return regions
  }

  async updateRegion(id: string, updates: Partial<RegionInfo>): Promise<void> {
    const { error } = await supabase
      .from('regions')
      .update({
        name: updates.name,
        country: updates.country,
        description: updates.description,
        featured: updates.featured,
        sightings_count: updates.sightings,
        image_url: updates.image,
        highlights: updates.highlights
      })
      .eq('id', id)

    if (error) throw error

    // Invalidate cache
    cacheService.invalidate(this.CACHE_KEYS.REGIONS)
  }

  // Sightings methods
  async getSightings(): Promise<SightingMock[]> {
    const cached = cacheService.get<SightingMock[]>(this.CACHE_KEYS.SIGHTINGS)
    if (cached) return cached

    const { data, error } = await supabase
      .from('sightings')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    const sightings: SightingMock[] = data.map(s => ({
      id: s.id,
      author: s.author_name,
      avatar: s.avatar || '',
      image: s.image_url || '',
      species: s.species_name,
      location: s.location,
      date: s.date,
      description: s.description || '',
      likes: s.likes,
      comments: s.comments,
      size: s.size,
      behavior: s.behavior
    }))

    cacheService.set(this.CACHE_KEYS.SIGHTINGS, sightings, this.CACHE_TTL.SIGHTINGS)
    return sightings
  }

  async createSighting(sighting: Omit<SightingMock, 'id' | 'likes' | 'comments'>): Promise<void> {
    const { error } = await supabase
      .from('sightings')
      .insert({
        author_name: sighting.author,
        avatar: sighting.avatar,
        image_url: sighting.image,
        species_name: sighting.species,
        location: sighting.location,
        date: sighting.date,
        description: sighting.description,
        size: sighting.size,
        behavior: sighting.behavior
      })

    if (error) throw error

    // Invalidate cache
    cacheService.invalidate(this.CACHE_KEYS.SIGHTINGS)
  }

  // Conservation tips methods
  async getConservationTips(): Promise<{ interaction_guidelines: ConservationTipItem[], conservation_actions: ConservationTipItem[] }> {
    const cached = cacheService.get<{ interaction_guidelines: ConservationTipItem[], conservation_actions: ConservationTipItem[] }>(this.CACHE_KEYS.CONSERVATION_TIPS)
    if (cached) return cached

    const { data, error } = await supabase
      .from('conservation_tips')
      .select('*')
      .order('display_order')

    if (error) throw error

    const tips = data.reduce((acc, tip) => {
      const item: ConservationTipItem = {
        id: tip.id,
        icon: tip.icon_name,
        title: tip.title,
        description: tip.description
      }
      
      if (tip.category === 'interaction_guidelines') {
        acc.interaction_guidelines.push(item)
      } else if (tip.category === 'conservation_actions') {
        acc.conservation_actions.push(item)
      }
      
      return acc
    }, { interaction_guidelines: [] as ConservationTipItem[], conservation_actions: [] as ConservationTipItem[] })

    cacheService.set(this.CACHE_KEYS.CONSERVATION_TIPS, tips, this.CACHE_TTL.CONSERVATION_TIPS)
    return tips
  }

  async updateConservationTip(id: string, updates: Partial<ConservationTipItem>): Promise<void> {
    const { error } = await supabase
      .from('conservation_tips')
      .update({
        icon_name: updates.icon,
        title: updates.title,
        description: updates.description
      })
      .eq('id', id)

    if (error) throw error

    // Invalidate cache
    cacheService.invalidate(this.CACHE_KEYS.CONSERVATION_TIPS)
  }

  // Emergency contacts methods
  async getEmergencyContacts(): Promise<EmergencyContact[]> {
    const cached = cacheService.get<EmergencyContact[]>(this.CACHE_KEYS.EMERGENCY_CONTACTS)
    if (cached) return cached

    const { data, error } = await supabase
      .from('emergency_contacts')
      .select('*')
      .order('display_order')

    if (error) throw error

    const contacts: EmergencyContact[] = data.map(c => ({
      id: c.id,
      region: c.region,
      contact: c.contact
    }))

    cacheService.set(this.CACHE_KEYS.EMERGENCY_CONTACTS, contacts, this.CACHE_TTL.EMERGENCY_CONTACTS)
    return contacts
  }

  async updateEmergencyContact(id: string, updates: Partial<EmergencyContact>): Promise<void> {
    const { error } = await supabase
      .from('emergency_contacts')
      .update({
        region: updates.region,
        contact: updates.contact
      })
      .eq('id', id)

    if (error) throw error

    // Invalidate cache
    cacheService.invalidate(this.CACHE_KEYS.EMERGENCY_CONTACTS)
  }

  // Stats methods
  async getStats(): Promise<StatItem[]> {
    const cached = cacheService.get<StatItem[]>(this.CACHE_KEYS.STATS)
    if (cached) return cached

    // Get total sightings count
    const { count: totalSightings, error: sightingsError } = await supabase
      .from('sightings')
      .select('*', { count: 'exact', head: true })

    // Get unique authors count
    const { data: authors, error: authorsError } = await supabase
      .from('sightings')
      .select('author_name')

    // Get featured region
    const { data: featuredRegion, error: regionError } = await supabase
      .from('regions')
      .select('name')
      .eq('featured', true)
      .single()

    if (sightingsError || authorsError || regionError) {
      throw new Error('Error fetching stats')
    }

    const stats: StatItem[] = [
      { value: totalSightings?.toLocaleString() || '0', label: 'Total Sightings' },
      { value: new Set(authors?.map(a => a.author_name)).size.toLocaleString(), label: 'Contributors' },
      { value: featuredRegion?.name || 'Unknown', label: 'Featured Region' }
    ]

    cacheService.set(this.CACHE_KEYS.STATS, stats, this.CACHE_TTL.STATS)
    return stats
  }

  // Cache management
  invalidateCache(pattern?: string): void {
    if (pattern) {
      cacheService.invalidatePattern(pattern)
    } else {
      // Clear all data caches
      Object.values(this.CACHE_KEYS).forEach(key => {
        cacheService.invalidate(key)
      })
    }
  }
}

export const dataService = new DataService()
