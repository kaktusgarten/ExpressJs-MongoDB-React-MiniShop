import UserOverview from "../components/admin/UserOverview";
import { NewProduct } from "../components/admin/NewProduct";
// import { use } from "react";
// import { GesamtseitenContext } from "../context/GesamtseitenContext";


export default function AdminBereichPage() {

  // const { userData } = use(GesamtseitenContext);

  return (
    <main className="p-4">
      <h2 className="mb-2 text-3xl">Admin-Bereich</h2>

      <div className="py-5">
        Dieser Bereich ist nur über ein Login zugänglich. Es muss ein Token
        gesetzt sein. Siehe ProtectedLayout.tsx und GesamtseitenContext.tsx.
      </div>

      <UserOverview />
      <NewProduct />
    </main>
  );
}
