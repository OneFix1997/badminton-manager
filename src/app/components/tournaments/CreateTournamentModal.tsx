"use client";

import { useState } from "react";

export default function CreateTournamentModal({
  onCloseAction,
}: {
  onCloseAction: () => void;
}) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");

  async function handleSubmit() {
    await fetch("/api/tournaments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        location,
        status: "upcoming",
      }),
    });

    onCloseAction();
    // window.location.reload();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-md">
        <h2 className="text-white text-lg font-semibold mb-4">Create Tournament</h2>

        <input
          className="w-full mb-3 p-2 rounded bg-gray-100 dark:bg-gray-700"
          placeholder="Tournament title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="w-full mb-4 p-2 rounded bg-gray-100 dark:bg-gray-700"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 text-white rounded cursor-pointer" onClick={onCloseAction}>Cancel</button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
            onClick={handleSubmit}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
