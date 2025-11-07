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
      <ul className="grid xl:grid-cols-2">
        {users?.map((user: any) => (
          <li key={user._id} className="my-3 mr-3">
            <div className="grid sm:grid-cols-[70%_1fr] gap-3  p-2 bg-[#191e24] border border-[#1a1a1a] rounded-xl">
              <div className="grid sm:grid-cols-[50%_1fr] gap-3 p-2">
                <div className="">Vorname:</div>
                <div className="">{user.firstName}</div>
                <div className="">Nachname:</div>
                <div className="">{user.lastName}</div>
                <div className="">Straße:</div>
                <div className="">{user.street}</div>
                <div className="">Stadt:</div>
                <div className="overflow-auto">{user.city}</div>
                <div className="">E-Mail:</div>
                <div className="overflow-auto">{user.email}</div>
                <div className="">Kontoberechtigung:</div>
                <div className="overflow-auto">{user.roles?.[0]}</div>
              </div>
              <div className="text-right">
                <button className="btn btn-primary w-1/2">Bearbeiten</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
