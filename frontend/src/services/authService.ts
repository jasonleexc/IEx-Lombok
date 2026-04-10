import { supabase } from '@/supabase'

export interface User {
  id: string
  email: string
  name?: string
  avatar?: string
  role: 'user' | 'admin'
}

class AuthService {
  private currentUser: User | null = null

  async signIn(email: string, password: string): Promise<User> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw error

    // Get user profile with role
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single()

    if (profileError && profileError.code !== 'PGRST116') {
      throw profileError
    }

    // Create profile if it doesn't exist
    if (!profile) {
      const { data: newProfile, error: insertError } = await supabase
        .from('users')
        .insert({
          id: data.user.id,
          email: data.user.email!,
          name: data.user.user_metadata?.name || email.split('@')[0],
          role: 'user'
        })
        .select()
        .single()

      if (insertError) throw insertError
      this.currentUser = newProfile
    } else {
      this.currentUser = profile
    }

    return this.currentUser
  }

  async signUp(email: string, password: string, name?: string): Promise<User> {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name || email.split('@')[0]
        }
      }
    })

    if (error) throw error

    if (!data.user) {
      throw new Error('User creation failed')
    }

    // Create user profile
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .insert({
        id: data.user.id,
        email: data.user.email!,
        name: name || email.split('@')[0],
        role: 'user'
      })
      .select()
      .single()

    if (profileError) throw profileError

    this.currentUser = profile
    return profile
  }

  async signOut(): Promise<void> {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    this.currentUser = null
  }

  async getCurrentUser(): Promise<User | null> {
    if (this.currentUser) return this.currentUser

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    // Get user profile
    const { data: profile, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error || !profile) return null

    this.currentUser = profile
    return profile
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'admin'
  }

  // For demo purposes - in production, this should be handled by proper auth
  async setAdminRole(userId: string): Promise<void> {
    const { error } = await supabase
      .from('users')
      .update({ role: 'admin' })
      .eq('id', userId)

    if (error) throw error

    if (this.currentUser?.id === userId) {
      this.currentUser.role = 'admin'
    }
  }

  // Listen to auth changes
  onAuthChange(callback: (user: User | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const user = await this.getCurrentUser()
        callback(user)
      } else {
        this.currentUser = null
        callback(null)
      }
    })
  }
}

export const authService = new AuthService()
