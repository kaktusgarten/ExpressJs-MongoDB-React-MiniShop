import { useEffect, useState } from "react";

export default function UserOverview() {
  const [users, setUsers] = useState([]);
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

  if (!users?.length) return <p>Keine Nutzer gefunden.</p>;
  return (
    <section>
      {loading && <p>Lade Nutzer...</p>}
      {error && <p className="text-red-600">Fehler: {error}</p>}

      <h2 className="mb-3 text-xl">Benutzerübersicht:</h2>
      <ul>
        {users?.map((user: any) => (
          <li key={user._id} className=" m-3">
            <div className="grid sm:grid-cols-5 gap-3 border p-2">
              <div className="">{user.firstName}</div>
              <div className="">{user.lastName}</div>
              <div className="">{user.street}</div>
              <div className="overflow-auto">{user.city}</div>
              <div className="text-right">
                <button className="btn btn-primary">Bearbeiten</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
