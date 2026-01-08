type Props = {
  title: string;
  location?: string;
  date?: string;
  status?: string;
};

export default function TournamentHeader({
  title,
  location,
  date,
  status,
}: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          <p className="text-sm text-gray-500 mt-1">
            {location} {date ? `• ${date}` : ""}
          </p>
        </div>
        {status && (
          <span className="px-3 py-1 rounded text-xs bg-green-100 text-green-700">
            {status}
          </span>
        )}
      </div>
    </div>
  );
}
