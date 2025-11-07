import { Outlet, useNavigate } from "react-router";
import { useEffect, use } from "react";
import { GesamtseitenContext } from "../context/GesamtseitenContext";

export default function ProtectedLayout() {
  const navigate = useNavigate();
  const { userData } = use(GesamtseitenContext)!;

  // Wenn userData vorhanden → hole Rolle
  const role = userData?.roles?.[0];

  useEffect(() => {
    // WARTEN bis fetchMe fertig ist → daher nur prüfen, wenn userData nicht null
    if (userData && !role) {
      console.log("Kein Zugriff → Weiterleitung");
      navigate("/login");
    }
  }, [userData, role, navigate]);

  // Wenn Daten noch nicht geladen → Ladeanzeige (oder null)
  if (!userData) return <p className="p-4">⏳ Lade Benutzer...</p>;

  // Wenn Benutzer existiert aber keine Role hat, dann tschüss:
  if (!role) return null;

  return <Outlet />;
}
