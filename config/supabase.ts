import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createClient} from '@supabase/supabase-js';

const SUPABASE_URL = 'https://blmbozditytjjudyydie.supabase.co';

const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsbWJvemRpdHl0amp1ZHl5ZGllIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc5MjkyODksImV4cCI6MjAxMzUwNTI4OX0.Y4WGUBlBi8YAo7cBg1nRMrBvr9VL2EnZ8nuYWEE0J74';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export default supabase;
