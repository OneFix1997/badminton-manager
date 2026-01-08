import { useQuery } from "@tanstack/react-query";

export function usePlayers() {
  return useQuery({
    queryKey: ["players"],
    queryFn: async () => {
      const res = await fetch("/api/players");
      if (!res.ok) throw new Error("Failed to load players");
      return res.json();
    },
  });
}
