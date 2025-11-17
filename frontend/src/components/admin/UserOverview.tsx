import { useEffect, useState } from "react";
import FormChangeUserDataAdmin from "../FormChangeUserDataAdmin";

export default function UserOverview() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openForms, setOpenForms] = useState<Record<string, boolean>>({}); // Toggle pro User

  useEffect(() => {
    const controller = new AbortController();

    async function fetchAllUsers() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setUsers(data);

        // alle Forms initial auf geschlossen setzen
        const initialOpenForms: Record<string, boolean> = {};
        data.forEach((u: any) => (initialOpenForms[u._id] = false));
        setOpenForms(initialOpenForms);
      } catch (err: any) {
        if (err.name !== "AbortError")
          setError(err.message ?? "Unbekannter Fehler");
      } finally {
        setLoading(false);
      }
    }

    fetchAllUsers();
    return () => controller.abort();
  }, []);

  const toggleForm = (id: string) => {
    setOpenForms((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section>
      <h2 className="mb-3 text-xl">Benutzerübersicht:</h2>
      {loading && <p>Lade Nutzer...</p>}
      {error && <p className="text-red-600">Fehler: {error}</p>}
      {!loading && !users.length && <p>Keine Nutzer gefunden.</p>}

      <ul className="grid xl:grid-cols-2">
        {users.map((user) => (
          <li key={user._id} className="my-3 mr-3">
            <div className="p-2 bg-[#191e24] border border-[#1a1a1a] rounded-xl">
              <div className="grid sm:grid-cols-[70%_1fr] gap-3 p-2 bg-[#191e24] border border-[#1a1a1a] rounded-xl">
                <div className="grid sm:grid-cols-[50%_1fr] gap-3 p-2">
                  <div>Vorname:</div>
                  <div>{user.firstName}</div>
                  <div>Nachname:</div>
                  <div>{user.lastName}</div>
                  <div>Straße:</div>
                  <div>{user.street}</div>
                  <div>Stadt:</div>
                  <div className="overflow-auto">{user.city}</div>
                  <div>E-Mail:</div>
                  <div className="overflow-auto">{user.email}</div>
                  <div>Kontoberechtigung:</div>
                  <div className="overflow-auto">{user.roles?.join(", ")}</div>
                </div>
                <div className="text-right">
                  <button
                    className="btn btn-primary w-1/2"
                    onClick={() => toggleForm(user._id)}
                  >
                    Bearbeiten
                  </button>
                </div>
              </div>

              {/* Form nur anzeigen, wenn openForms[user._id] true */}
              {openForms[user._id] && (
                <div className="mt-2">
                  <FormChangeUserDataAdmin
                    user={user}
                    updateLocalUser={(updatedUser) => {
                      setUsers((prev) =>
                        prev.map((u) =>
                          u._id === updatedUser._id ? updatedUser : u
                        )
                      );
                    }}
                    closeForm={() =>
                      setOpenForms((prev) => ({ ...prev, [user._id]: false }))
                    }
                  />
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
