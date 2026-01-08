/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";

export default function AssignPlayerModal({
  tournamentId,
  onCloseAction,
}: {
  tournamentId: string;
  onCloseAction: () => void;
}) {
  const [players, setPlayers] = useState<any[]>([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    fetch("/api/players")
      .then((res) => res.json())
      .then(setPlayers);
  }, []);

  async function assign() {
    await fetch("/api/tournament-players", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tournament_id: tournamentId,
        player_id: selected,
      }),
    });

    onCloseAction();
    // location.reload();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-md">
        <h3 className="font-bold mb-3 text-white">Assign Player</h3>

        <select
          className="input text-white"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          <option value="">Select player</option>
          {players.map((p) => (
            <option key={p.id} value={p.id}>
              {p.full_name}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-2 mt-4">
          <button
            className="bg-red-600 rounded py-1 px-2 text-white"
            onClick={onCloseAction}
          >
            Cancel
          </button>
          <button
            className="bg-green-600 rounded py-1 px-2 text-white"
            disabled={!selected}
            onClick={assign}
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
}
