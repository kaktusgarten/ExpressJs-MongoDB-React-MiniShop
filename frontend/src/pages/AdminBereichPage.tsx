import { useEffect, useState } from "react";
import UserOverview from "../components/admin/UserOverview";

type User = {
  _id: string;
  name: string;
  email: string;
  // ...weitere Felder
};

export default function AdminBereichPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchAllUsers() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
          signal: controller.signal,
          // Falls Token nötig:
          // headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();
        setUsers(data);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError(err.message ?? "Unbekannter Fehler");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchAllUsers();
    return () => controller.abort();
  }, []); // bei dynamischer URL: [import.meta.env.VITE_API_URL]

  return (
    <main className="p-4">
      <h2 className="mb-2 text-3xl">Admin-Bereich</h2>

      <div className="py-5">
        Dieser Bereich ist nur über ein Login zugänglich. Es muss ein Token
        gesetzt sein. Siehe ProtectedLayout.tsx und GesamtseitenContext.tsx.
      </div>

      {loading && <p>Lade Nutzer...</p>}
      {error && <p className="text-red-600">Fehler: {error}</p>}
      {!loading && !error && <UserOverview users={users} />}
    </main>
  );
}
