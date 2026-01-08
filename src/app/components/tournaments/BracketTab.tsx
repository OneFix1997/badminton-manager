/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";

export function BracketTab({ tournamentId }: { tournamentId: string }) {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchMatches() {
    const res = await fetch(`/api/matches?tournamentId=${tournamentId}`);
    const data = await res.json();
    setMatches(data);
  }

  useEffect(() => {
    fetchMatches();
  }, []);

  async function generateBracket() {
    setLoading(true);
    await fetch("/api/bracket/generate", {
      method: "POST",
      body: JSON.stringify({ tournamentId }),
    });
    await fetchMatches();
    setLoading(false);
  }

  const rounds = Array.from(new Set(matches.map((m) => m.round)));

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h3 className="text-white font-bold">Bracket</h3>
        <button
          onClick={generateBracket}
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Generating..." : "Generate Matches"}
        </button>
      </div>

      {matches.length === 0 ? (
        <p className="text-gray-500">{`No matches yet. Click "Generate Matches".`}</p>
      ) : (
        <div className="flex gap-6 overflow-x-auto">
          {rounds.map((round) => (
            <div key={round}>
              <h4 className="text-white font-bold mb-2">{round}</h4>
              {matches
                .filter((m) => m.round === round)
                .map((m) => (
                  <div
                    key={m.id}
                    className="bg-white p-3 mb-3 rounded shadow w-56"
                  >
                    <div>{m.playerA?.full_name || "TBD"}</div>
                    <div className="text-sm text-gray-400">vs</div>
                    <div>{m.playerB?.full_name || "TBD"}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Status: {m.status}
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
