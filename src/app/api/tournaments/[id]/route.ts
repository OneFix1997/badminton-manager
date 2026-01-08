import { supabase } from "@/lib/supabase";

// Function สำหรับดึงข้อมูล
export const getTournamentById = async (id: string) => {
  const { data, error } = await supabase
    .from("tournaments")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
};
