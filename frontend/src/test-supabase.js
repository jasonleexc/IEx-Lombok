// Simple test to verify Supabase connection
import { supabase } from './supabase.ts'

async function testConnection() {
  console.log('Testing Supabase connection...')
  console.log('URL:', import.meta.env.VITE_SUPABASE_URL)
  console.log('Key exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY)
  
  try {
    // Test a simple query
    const { data, error } = await supabase
      .from('species')
      .select('name')
      .limit(1)
    
    if (error) {
      console.error('Supabase Error:', error)
    } else {
      console.log('Success! Sample data:', data)
    }
  } catch (err) {
    console.error('Connection Error:', err)
  }
}

testConnection()
