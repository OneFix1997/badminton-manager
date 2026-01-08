import { getTournamentById } from "@/app/api/tournaments/[id]/route";
import { useQuery } from "@tanstack/react-query";

export function useTournaments() {
  return useQuery({
    queryKey: ["tournaments"],
    queryFn: async () => {
      const res = await fetch("/api/tournaments");
      if (!res.ok) throw new Error("Failed to load tournaments");
      return res.json();
    },
  });
}

export function useTournamentById(id: string) {
  return useQuery({
    queryKey: ["tournament", id],
    queryFn: () => getTournamentById(id),
    enabled: !!id, // รัน query เมื่อมี id เท่านั้น
  });
}
