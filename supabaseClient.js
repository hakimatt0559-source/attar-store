import { createClient } from "@supabase/supabase-js";

// هذه القيم هتيجي من ملف .env (شرح إزاي تحطها في ملف README)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

// لو القيم فاضية (يعني لسه ما ربطناش Supabase)، هنستخدم بيانات وهمية بدل ما الموقع يتعطل
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
