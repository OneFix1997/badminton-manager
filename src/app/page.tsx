"use client";

import { usePlayers } from "@/hooks/usePlayers";
import { useTournaments } from "@/hooks/useTournaments";
import { useMatches } from "@/hooks/useMatches";
import { useCourts } from "@/hooks/useCourts";
import AppLayout from "./components/layout/AppLayout";

export default function DashboardPage() {
  const { data: players } = usePlayers();
  const { data: tournaments } = useTournaments();
  const { data: matches } = useMatches();
  const { data: courts } = useCourts();

  return (
    <AppLayout>
      <h1 className="text-2xl text-white font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <StatCard
          title="Players"
          value={players?.length ?? "…"}
        />

        <StatCard
          title="Tournaments"
          value={tournaments?.length ?? "…"}
        />

        <StatCard
          title="Matches"
          value={matches?.length ?? "…"}
        />

        <StatCard
          title="Courts"
          value={courts?.length ?? "…"}
        />

      </div>
    </AppLayout>
  );
}

function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
      <h2 className="text-gray-500 dark:text-gray-300 text-sm">{title}</h2>
      <p className="text-white text-4xl font-semibold mt-1">{value}</p>
    </div>
  );
}
