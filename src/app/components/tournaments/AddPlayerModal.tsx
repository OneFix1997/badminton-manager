"use client";
import { useState } from "react";

export default function AddPlayerModal({
  onCloseAction,
}: {
  onCloseAction: () => void;
}) {
  const [name, setName] = useState("");

  async function submit() {
    await fetch("/api/players", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ full_name: name }),
    });

    onCloseAction();
    // location.reload();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-md">
        <h3 className="font-bold mb-3 text-white">Add Player</h3>
        <input
          className="input text-white"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="bg-red-600 rounded py-1 px-2 text-white"
            onClick={onCloseAction}
          >
            Cancel
          </button>
          <button
            className="bg-green-600 rounded py-1 px-2 text-white"
            onClick={submit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
