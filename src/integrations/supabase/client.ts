// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://cmupbwrjnniizovfxrik.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtdXBid3Jqbm5paXpvdmZ4cmlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3NTUxODUsImV4cCI6MjA2NjMzMTE4NX0.-9CsWsvAARsxg6IoLclBCyMljKI2Zve4YpPE9h9jixI";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);