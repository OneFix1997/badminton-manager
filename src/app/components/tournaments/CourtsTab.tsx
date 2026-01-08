/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";

export function CourtsTab({ tournamentId }: { tournamentId: string }) {
  const [courts, setCourts] = useState<any[]>([]);
  const [name, setName] = useState("");

  function getTournamentById(id: string) {
    fetch(`/api/courts?tournamentId=${id}`)
      .then((res) => res.json())
      .then(setCourts);
  }

  useEffect(() => {
    getTournamentById(tournamentId);
  }, [tournamentId]);

  async function addCourt() {
    try {
      await fetch("/api/courts", {
        method: "POST",
        body: JSON.stringify({ tournament_id: tournamentId, name }),
      });
    } catch (err) {
      console.error(err);
      alert(err);
    } finally {
      setName("");
      getTournamentById(tournamentId);
    }
  }

  return (
    <div>
      <h3 className="text-white font-bold mb-2">Courts</h3>

      <div className="flex gap-2 mb-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Court name"
          className="text-white border px-3 py-2 rounded"
        />
        <button
          onClick={addCourt}
          className="bg-green-600 rounded p-2 text-white"
        >
          Add
        </button>
      </div>

      {courts.map((c) => (
        <div key={c.id} className="p-2 bg-white rounded mb-2">
          {c.name}
        </div>
      ))}
    </div>
  );
}
