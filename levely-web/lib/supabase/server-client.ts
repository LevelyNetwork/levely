import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn("Supabase env vars are missing. Server actions depending on Supabase will fail.")
}

export const serverSupabase = createClient(supabaseUrl ?? "", supabaseServiceKey ?? "", {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

export default serverSupabase
