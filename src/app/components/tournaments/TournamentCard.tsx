import Link from "next/link";

type Tournament = {
  id: string;
  title: string;
  location: string;
  start_date: string;
  end_date: string;
  status: "upcoming" | "ongoing" | "finished";
};

export default function TournamentCard({
  tournament,
}: {
  tournament: Tournament;
}) {
  return (
    <Link
      href={`/tournaments/${tournament.id}`}
      className="block bg-white dark:bg-gray-800 p-5 rounded-xl shadow hover:shadow-lg transition"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-white text-lg font-semibold">{tournament.title}</h3>
        <StatusBadge status={tournament.status} />
      </div>

      <p className="text-sm text-gray-500">{tournament.location}</p>

      <p className="text-sm mt-2">
        {tournament.start_date} → {tournament.end_date}
      </p>
    </Link>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    upcoming: "bg-blue-100 text-blue-700",
    ongoing: "bg-green-100 text-green-700",
    finished: "bg-gray-200 text-gray-700",
  };

  return (
    <span className={`px-2 py-1 text-xs rounded ${map[status]}`}>{status}</span>
  );
}
