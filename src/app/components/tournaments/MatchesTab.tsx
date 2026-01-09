/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import ScoreInput from "../ScoreInput";
import AssignCourtButton from "../AssignCourtButton";

export function MatchesTab({ tournamentId }: { tournamentId: string }) {
  const [matches, setMatches] = useState<any[]>([]);

  async function fetchMatches(id: string) {
    await fetch(`/api/matches?tournamentId=${id}`)
      .then((res) => res.json())
      .then(setMatches);
  }

  useEffect(() => {
    fetchMatches(tournamentId);
  }, [tournamentId]);

  const startMatch = async (matchId: string) => {
    await fetch(`/api/matches/${matchId}/start`, {
      method: "PATCH",
    });

    fetchMatches(tournamentId);
  };

  return (
    <div>
      <h3 className="text-white font-bold mb-4">Matches</h3>

      {matches.map((m) => (
        <div key={m.id} className="bg-white p-3 rounded mb-3 shadow">
          <div className="font-medium">
            {m.playerA?.full_name || "TBD"} vs {m.playerB?.full_name || "TBD"}
          </div>

          <div className="text-sm text-gray-500">
            Round: {m.round} | Status:{" "}
            <span
              className={`px-2 py-1 rounded text-sm ${
                m.status === "pending"
                  ? "bg-gray-200"
                  : m.status === "playing"
                  ? "bg-yellow-200 text-yellow-800"
                  : "bg-green-200 text-green-800"
              }`}
            >
              {m.status}
            </span>
          </div>
          <div className="text-sm text-gray-500 mb-2">
            Court: {m.court.name ?? "-"}
          </div>
          {m.status === "pending" && (
            <AssignCourtButton
              matchId={m.id}
              action={() => fetchMatches(tournamentId)}
            />
          )}

          {m.status === "ready" && (
            <button
              className="bg-green-600 text-white px-3 py-1 rounded"
              onClick={() => startMatch(m.id)}
            >
              Start Match
            </button>
          )}

          {m.status === "playing" && (
            <ScoreInput
              matchId={m.id}
              onAction={() => fetchMatches(tournamentId)}
            />
          )}

          {m.status === "finished" && (
            <div className="text-green-600 font-medium">
              Winner:{" "}
              {m.winner === m.player_a ? m.playerA?.full_name : m.playerB?.full_name}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
