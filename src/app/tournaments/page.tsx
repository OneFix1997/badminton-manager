/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useTournaments } from "@/hooks/useTournaments";
import { useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import CreateTournamentModal from "../components/tournaments/CreateTournamentModal";
import TournamentCard from "../components/tournaments/TournamentCard";

export default function TournamentsPage() {
  const { data, isLoading } = useTournaments();
  const [open, setOpen] = useState(false);

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl text-white font-bold">Tournaments</h1>
        <button
          onClick={() => setOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
        >
          + Create Tournament
        </button>
      </div>

      {isLoading && <p>Loading...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((t: any) => (
          <TournamentCard key={t.id} tournament={t} />
        ))}
      </div>

      {open && <CreateTournamentModal onCloseAction={() => setOpen(false)} />}
    </AppLayout>
  );
}
