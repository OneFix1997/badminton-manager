/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import AddPlayerModal from "./AddPlayerModal";
import AssignPlayerModal from "./AssignPlayerModal";

export function PlayersTab({ tournamentId }: { tournamentId: string }) {
  const [players, setPlayers] = useState<any[]>([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openAssign, setOpenAssign] = useState(false);

  useEffect(() => {
    fetch(`/api/tournament-players?tournamentId=${tournamentId}`)
      .then((res) => res.json())
      .then(setPlayers);
  }, [tournamentId]);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl">
      <div className="flex justify-between mb-4">
        <h2 className="font-semibold text-white">Players</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setOpenAssign(true)}
            className="bg-amber-600 rounded p-2 text-white"
          >
            Assign Player
          </button>
          <button
            onClick={() => setOpenAdd(true)}
            className="bg-green-600 rounded p-2 text-white"
          >
            + New Player
          </button>
        </div>
      </div>

      <ul className="divide-y">
        {players?.map((p, i) => (
          <li key={p.id} className="text-white py-2">
            {`${i + 1}. ${p.players.full_name}`}
          </li>
        ))}
      </ul>

      {openAdd && <AddPlayerModal onCloseAction={() => setOpenAdd(false)} />}
      {openAssign && (
        <AssignPlayerModal
          tournamentId={tournamentId}
          onCloseAction={() => setOpenAssign(false)}
        />
      )}
    </div>
  );
}
