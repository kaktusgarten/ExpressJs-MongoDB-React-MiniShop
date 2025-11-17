import { useEffect, useState, useContext } from "react";
import { GesamtseitenContext } from "../context/GesamtseitenContext";

interface Product {
  _id: string;
  quantity: number;
  productId?: {
    name: string;
    price: number;
  };
}

interface Order {
  _id: string;
  products: Product[];
  total: number;
}

export default function UserOrders() {
  const { userData } = useContext<any | null>(GesamtseitenContext);
  const [userOrdersData, setUserOrdersData] = useState<Order[]>([]);

  useEffect(() => {
    if (!userData?._id) return; // Sicherheitscheck

    const fetchUserOrders = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/orders/user/${userData._id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!res.ok) {
          console.warn(
            "Keine Bestellungen gefunden oder Fehler im Backend",
            res.status
          );
          setUserOrdersData([]); // immer Array setzen
          return;
        }

        const data = await res.json();

        // Sicherstellen, dass data ein Array ist
        setUserOrdersData(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Fehler beim Laden der Bestellungen:", error);
        setUserOrdersData([]);
      }
    };

    fetchUserOrders();
  }, [userData?._id]);

  return (
    <>
      <h3 className="mb-5">Aktuelle Bestellungen:</h3>
      {userOrdersData.length === 0 ? (
        <p className="text-gray-500">Keine aktuellen Bestellungen.</p>
      ) : (
        <ul>
          {userOrdersData.map((order, index) => (
            <li key={order._id || index} className="border mb-5 p-5">
              <div className="mb-3 font-bold text-xl">
                Bestellung {index + 1}:
              </div>
              <div>
                <ul>
                  {order.products && order.products.length > 0 ? (
                    order.products.map((p) => (
                      <li key={p._id} className="mb-5">
                        <div className="text-orange-500">
                          {p.productId?.name || "Unbekannt"}
                        </div>
                        <div className="italic">
                          Stück und Preis: {p.quantity} x (
                          {p.productId?.price ?? 0} €)
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500">Keine Produkte</li>
                  )}
                </ul>
              </div>
              <div>Gesamt: {order.total ?? 0} €</div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
