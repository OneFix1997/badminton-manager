"use client";

import { useEffect, useState } from "react";

type Court = {
  id: string;
  name: string;
};

type Props = {
  matchId: string;
  action: () => void; // callback เพื่อรีเฟรช matches
};

export default function AssignCourtButton({ matchId, action }: Props) {
  const [courts, setCourts] = useState<Court[]>([]);
  const [selectedCourt, setSelectedCourt] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // โหลดสนามทั้งหมด
  useEffect(() => {
    const fetchCourts = async () => {
      const res = await fetch("/api/courts");
      const data = await res.json();
      setCourts(data);
    };

    fetchCourts();
  }, []);

  // กด Assign
  const assignCourt = async () => {
    if (!selectedCourt) return alert("Please select a court");

    setLoading(true);

    await fetch(`/api/matches/${matchId}/assign-court`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        court_id: selectedCourt,
      }),
    });

    setLoading(false);
    setSelectedCourt("");
    action();
  };

  return (
    <div className="flex items-center gap-2 mt-2">
      <select
        className="border px-2 py-1 rounded"
        value={selectedCourt}
        onChange={(e) => setSelectedCourt(e.target.value)}
      >
        <option value="">Select court</option>
        {courts.map((court) => (
          <option key={court.id} value={court.id}>
            {court.name}
          </option>
        ))}
      </select>

      <button
        disabled={loading}
        onClick={assignCourt}
        className="bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50"
      >
        {loading ? "Assigning..." : "Assign"}
      </button>
    </div>
  );
}
