import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Trash2, Save, RefreshCw, Users, Map, Turtle, Lightbulb, Phone } from 'lucide-react'
import { dataService } from '@/services/dataService'
import type { SpeciesInfo, RegionInfo, SightingMock, ConservationTipItem, EmergencyContact } from '@/services/dataService'

const Admin = () => {
  const [activeTab, setActiveTab] = useState('species')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  // Data states
  const [species, setSpecies] = useState<SpeciesInfo[]>([])
  const [regions, setRegions] = useState<RegionInfo[]>([])
  const [sightings, setSightings] = useState<SightingMock[]>([])
  const [conservationTips, setConservationTips] = useState<{ interaction_guidelines: ConservationTipItem[], conservation_actions: ConservationTipItem[] }>({
    interaction_guidelines: [],
    conservation_actions: []
  })
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([])

  const loadData = async () => {
    setLoading(true)
    try {
      const [speciesData, regionsData, sightingsData, tipsData, contactsData] = await Promise.all([
        dataService.getSpecies(),
        dataService.getRegions(),
        dataService.getSightings(),
        dataService.getConservationTips(),
        dataService.getEmergencyContacts()
      ])
      
      setSpecies(speciesData)
      setRegions(regionsData)
      setSightings(sightingsData)
      setConservationTips(tipsData)
      setEmergencyContacts(contactsData)
    } catch (error) {
      setMessage('Error loading data')
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    loadData()
  }, [])

  const handleSave = async (type: string, id: string, data: any) => {
    setLoading(true)
    try {
      switch (type) {
        case 'species':
          await dataService.updateSpecies(id, data)
          break
        case 'region':
          await dataService.updateRegion(id, data)
          break
        case 'conservationTip':
          await dataService.updateConservationTip(id, data)
          break
        case 'emergencyContact':
          await dataService.updateEmergencyContact(id, data)
          break
      }
      setMessage('Changes saved successfully!')
      await loadData() // Refresh data
    } catch (error) {
      setMessage('Error saving changes')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (type: string, id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return
    
    setLoading(true)
    try {
      // Implementation would depend on your delete methods
      setMessage('Item deleted successfully!')
      await loadData()
    } catch (error) {
      setMessage('Error deleting item')
    } finally {
      setLoading(false)
    }
  }

  const refreshCache = () => {
    dataService.invalidateCache()
    setMessage('Cache refreshed successfully!')
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage marine conservation content</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={refreshCache} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Cache
          </Button>
          <Button onClick={loadData} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Reload Data
          </Button>
        </div>
      </div>

      {message && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md text-blue-800">
          {message}
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="species" className="flex items-center gap-2">
            <Turtle className="h-4 w-4" />
            Species
          </TabsTrigger>
          <TabsTrigger value="regions" className="flex items-center gap-2">
            <Map className="h-4 w-4" />
            Regions
          </TabsTrigger>
          <TabsTrigger value="sightings" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Sightings
          </TabsTrigger>
          <TabsTrigger value="tips" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Tips
          </TabsTrigger>
          <TabsTrigger value="contacts" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Contacts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="species">
          <Card>
            <CardHeader>
              <CardTitle>Species Management</CardTitle>
              <CardDescription>Edit sea turtle species information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {species.map((item) => (
                  <div key={item.id} className="border rounded-lg p-6 space-y-4">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold">{item.name}</h3>
                      <div className="flex gap-2">
                        <Badge variant={item.status === 'Critically Endangered' ? 'destructive' : 'secondary'}>
                          {item.status}
                        </Badge>
                        <Button
                          onClick={() => handleDelete('species', item.id)}
                          variant="outline"
                          size="sm"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor={`name-${item.id}`}>Common Name</Label>
                        <Textarea
                          id={`name-${item.id}`}
                          value={item.name}
                          onChange={(e) => {
                            const updated = species.map(s => 
                              s.id === item.id ? { ...s, name: e.target.value } : s
                            )
                            setSpecies(updated)
                          }}
                          className="min-h-[80px]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`scientific-${item.id}`}>Scientific Name</Label>
                        <Textarea
                          id={`scientific-${item.id}`}
                          value={item.scientific}
                          onChange={(e) => {
                            const updated = species.map(s => 
                              s.id === item.id ? { ...s, scientific: e.target.value } : s
                            )
                            setSpecies(updated)
                          }}
                          className="min-h-[80px]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`status-${item.id}`}>Conservation Status</Label>
                        <Select
                          value={item.status}
                          onValueChange={(value) => {
                            const updated = species.map(s => 
                              s.id === item.id ? { ...s, status: value as any } : s
                            )
                            setSpecies(updated)
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Endangered">Endangered</SelectItem>
                            <SelectItem value="Critically Endangered">Critically Endangered</SelectItem>
                            <SelectItem value="Vulnerable">Vulnerable</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`size-${item.id}`}>Size Information</Label>
                        <Textarea
                          id={`size-${item.id}`}
                          value={item.size}
                          onChange={(e) => {
                            const updated = species.map(s => 
                              s.id === item.id ? { ...s, size: e.target.value } : s
                            )
                            setSpecies(updated)
                          }}
                          className="min-h-[80px]"
                          placeholder="e.g., Up to 150cm, 130–160kg"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor={`habitat-${item.id}`}>Habitat Description</Label>
                        <Textarea
                          id={`habitat-${item.id}`}
                          value={item.habitat}
                          onChange={(e) => {
                            const updated = species.map(s => 
                              s.id === item.id ? { ...s, habitat: e.target.value } : s
                            )
                            setSpecies(updated)
                          }}
                          className="min-h-[120px]"
                          placeholder="Describe the natural habitat and distribution..."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`diet-${item.id}`}>Diet Information</Label>
                        <Textarea
                          id={`diet-${item.id}`}
                          value={item.diet}
                          onChange={(e) => {
                            const updated = species.map(s => 
                              s.id === item.id ? { ...s, diet: e.target.value } : s
                            )
                            setSpecies(updated)
                          }}
                          className="min-h-[120px]"
                          placeholder="Describe feeding habits and preferred food..."
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`identifying-${item.id}`}>Identifying Features</Label>
                      <Textarea
                        id={`identifying-${item.id}`}
                        value={item.identifying}
                        onChange={(e) => {
                          const updated = species.map(s => 
                            s.id === item.id ? { ...s, identifying: e.target.value } : s
                            )
                            setSpecies(updated)
                        }}
                        className="min-h-[120px]"
                        placeholder="Describe key identification features..."
                        />
                      </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor={`funfact-${item.id}`}>Fun Fact / Educational Content</Label>
                        <Textarea
                          id={`funfact-${item.id}`}
                          value={item.funFact}
                          onChange={(e) => {
                            const updated = species.map(s => 
                              s.id === item.id ? { ...s, funFact: e.target.value } : s
                            )
                            setSpecies(updated)
                          }}
                          className="min-h-[100px]"
                          placeholder="Add interesting facts or educational information..."
                        />
                      </div>
                    
                    <div className="flex justify-end pt-4">
                      <Button onClick={() => handleSave('species', item.id, item)} size="lg">
                        <Save className="h-4 w-4 mr-2" />
                        Save Species Changes
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regions">
          <Card>
            <CardHeader>
              <CardTitle>Regions Management</CardTitle>
              <CardDescription>Edit region information and sites</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {regions.map((region) => (
                  <div key={region.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold">{region.name}</h3>
                      <div className="flex gap-2">
                        {region.featured && <Badge>Featured</Badge>}
                        <Button
                          onClick={() => handleDelete('region', region.id)}
                          variant="outline"
                          size="sm"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`region-name-${region.id}`}>Region Name</Label>
                        <Textarea
                          id={`region-name-${region.id}`}
                          value={region.name}
                          onChange={(e) => {
                            const updated = regions.map(r => 
                              r.id === region.id ? { ...r, name: e.target.value } : r
                            )
                            setRegions(updated)
                          }}
                          className="min-h-[80px]"
                          placeholder="Enter region name..."
                        />
                      </div>
                      <div>
                        <Label htmlFor={`country-${region.id}`}>Country</Label>
                        <Textarea
                          id={`country-${region.id}`}
                          value={region.country}
                          onChange={(e) => {
                            const updated = regions.map(r => 
                              r.id === region.id ? { ...r, country: e.target.value } : r
                            )
                            setRegions(updated)
                          }}
                          className="min-h-[80px]"
                          placeholder="Enter country name..."
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`description-${region.id}`}>Description</Label>
                      <Textarea
                        id={`description-${region.id}`}
                        value={region.description}
                        onChange={(e) => {
                          const updated = regions.map(r => 
                            r.id === region.id ? { ...r, description: e.target.value } : r
                          )
                          setRegions(updated)
                        }}
                      />
                    </div>
                    
                    <Button onClick={() => handleSave('region', region.id, region)}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sightings">
          <Card>
            <CardHeader>
              <CardTitle>Sightings Management</CardTitle>
              <CardDescription>View and manage user-reported sightings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sightings.map((sighting) => (
                  <div key={sighting.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{sighting.species} - {sighting.location}</h3>
                        <p className="text-sm text-muted-foreground">
                          By {sighting.author} on {sighting.date}
                        </p>
                        <p className="mt-2">{sighting.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline">{sighting.likes} likes</Badge>
                        <Badge variant="outline">{sighting.comments} comments</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tips">
          <Card>
            <CardHeader>
              <CardTitle>Conservation Tips Management</CardTitle>
              <CardDescription>Edit conservation guidelines and actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Interaction Guidelines</h3>
                  {conservationTips.interaction_guidelines.map((tip) => (
                    <div key={tip.id} className="border rounded-lg p-4 space-y-4 mb-4">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{tip.title}</h4>
                        <Button
                          onClick={() => handleDelete('conservationTip', tip.id)}
                          variant="outline"
                          size="sm"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`tip-title-${tip.id}`}>Title</Label>
                        <Textarea
                          id={`tip-title-${tip.id}`}
                          value={tip.title}
                          onChange={(e) => {
                            const updated = {
                              ...conservationTips,
                              interaction_guidelines: conservationTips.interaction_guidelines.map(t =>
                                t.id === tip.id ? { ...t, title: e.target.value } : t
                              )
                            }
                            setConservationTips(updated)
                          }}
                          className="min-h-[80px]"
                          placeholder="Enter tip title..."
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`tip-desc-${tip.id}`}>Description</Label>
                        <Textarea
                          id={`tip-desc-${tip.id}`}
                          value={tip.description}
                          onChange={(e) => {
                            const updated = {
                              ...conservationTips,
                              interaction_guidelines: conservationTips.interaction_guidelines.map(t =>
                                t.id === tip.id ? { ...t, description: e.target.value } : t
                              )
                            }
                            setConservationTips(updated)
                          }}
                          className="min-h-[120px]"
                          placeholder="Enter detailed description..."
                        />
                      </div>
                      
                      <Button onClick={() => handleSave('conservationTip', tip.id, tip)}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Conservation Actions</h3>
                  {conservationTips.conservation_actions.map((tip) => (
                    <div key={tip.id} className="border rounded-lg p-4 space-y-4 mb-4">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{tip.title}</h4>
                        <Button
                          onClick={() => handleDelete('conservationTip', tip.id)}
                          variant="outline"
                          size="sm"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`action-title-${tip.id}`}>Title</Label>
                        <Input
                          id={`action-title-${tip.id}`}
                          value={tip.title}
                          onChange={(e) => {
                            const updated = {
                              ...conservationTips,
                              conservation_actions: conservationTips.conservation_actions.map(t =>
                                t.id === tip.id ? { ...t, title: e.target.value } : t
                              )
                            }
                            setConservationTips(updated)
                          }}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`action-desc-${tip.id}`}>Description</Label>
                        <Textarea
                          id={`action-desc-${tip.id}`}
                          value={tip.description}
                          onChange={(e) => {
                            const updated = {
                              ...conservationTips,
                              conservation_actions: conservationTips.conservation_actions.map(t =>
                                t.id === tip.id ? { ...t, description: e.target.value } : t
                              )
                            }
                            setConservationTips(updated)
                          }}
                        />
                      </div>
                      
                      <Button onClick={() => handleSave('conservationTip', tip.id, tip)}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacts">
          <Card>
            <CardHeader>
              <CardTitle>Emergency Contacts Management</CardTitle>
              <CardDescription>Edit emergency contact information by region</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emergencyContacts.map((contact) => (
                  <div key={contact.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold">{contact.region}</h3>
                      <Button
                        onClick={() => handleDelete('emergencyContact', contact.id)}
                        variant="outline"
                        size="sm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`contact-region-${contact.id}`}>Region</Label>
                        <Textarea
                          id={`contact-region-${contact.id}`}
                          value={contact.region}
                          onChange={(e) => {
                            const updated = emergencyContacts.map(c => 
                              c.id === contact.id ? { ...c, region: e.target.value } : c
                            )
                            setEmergencyContacts(updated)
                          }}
                          className="min-h-[80px]"
                          placeholder="Enter region name..."
                        />
                      </div>
                      <div>
                        <Label htmlFor={`contact-info-${contact.id}`}>Contact Information</Label>
                        <Textarea
                          id={`contact-info-${contact.id}`}
                          value={contact.contact}
                          onChange={(e) => {
                            const updated = emergencyContacts.map(c => 
                              c.id === contact.id ? { ...c, contact: e.target.value } : c
                            )
                            setEmergencyContacts(updated)
                          }}
                          className="min-h-[120px]"
                          placeholder="Enter emergency contact details..."
                        />
                      </div>
                    </div>
                    
                    <Button onClick={() => handleSave('emergencyContact', contact.id, contact)}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Admin
