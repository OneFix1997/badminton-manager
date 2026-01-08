/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";

export function MatchesTab({ tournamentId }: { tournamentId: string }) {
  const [matches, setMatches] = useState<any[]>([]);
  const [courts, setCourts] = useState<any[]>([]);

  async function fetchMatches(id: string) {
    await fetch(`/api/matches?tournamentId=${id}`)
      .then((res) => res.json())
      .then(setMatches);
  }

  async function fetchCourts(id: string) {
    await fetch(`/api/courts?tournamentId=${id}`)
      .then((res) => res.json())
      .then(setCourts);
  }

  useEffect(() => {
    fetchMatches(tournamentId);
    fetchCourts(tournamentId);
  }, [tournamentId]);

  async function assignCourt(matchId: string, courtId: string) {
    if (!matchId) {
      console.error("matchId is undefined");
      return;
    }

    if (!courtId) return;

    await fetch(`/api/matches/${matchId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ court_id: courtId }),
    });

    fetchMatches(tournamentId);
  }

  return (
    <div>
      <h3 className="text-white font-bold mb-4">Matches</h3>

      {matches.map((m) => (
        <div key={m.id} className="bg-white p-3 rounded mb-3 shadow">
          <div className="font-medium">
            {m.playerA?.full_name || "TBD"} vs {m.playerB?.full_name || "TBD"}
          </div>

          <div className="text-sm text-gray-500 mb-2">
            Round: {m.round} | Status: {m.status}
          </div>

          {/* Assign Court */}
          <div className="flex items-center gap-2">
            <span className="text-sm">Court:</span>
            <select
              value={m.court_id || ""}
              onChange={(e) => assignCourt(m.id, e.target.value)}
              className="border px-2 py-1 rounded text-sm"
            >
              <option value="">-- Select Court --</option>
              {courts.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}
