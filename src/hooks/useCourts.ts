import { useQuery } from "@tanstack/react-query";

export function useCourts() {
  return useQuery({
    queryKey: ["courts"],
    queryFn: async () => {
      const res = await fetch("/api/courts");
      if (!res.ok) throw new Error("Failed to load courts");
      return res.json();
    },
  });
}
