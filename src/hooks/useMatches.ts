import { useQuery } from "@tanstack/react-query";

export function useMatches() {
  return useQuery({
    queryKey: ["matches"],
    queryFn: async () => {
      const res = await fetch("/api/matches");
      if (!res.ok) throw new Error("Failed to load matches");
      return res.json();
    },
  });
}
