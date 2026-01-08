import Sidebar from "./Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-gray-100 dark:bg-gray-950">
      <Sidebar />

      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
