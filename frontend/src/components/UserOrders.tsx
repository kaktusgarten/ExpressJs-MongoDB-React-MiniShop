import { useEffect, useState, use } from "react";
import { GesamtseitenContext } from "../context/GesamtseitenContext";

export default function UserOrders() {
  const { userData } = use<any | null>(GesamtseitenContext);
  const [userOrdersData, setUserOrdersData] = useState<Object | null>(null);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/orders/user/${userData._id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await res.json();
        setUserOrdersData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserOrders();
  }, []);

  return (
    <>
      <h3 className="mb-5">Aktuelle Bestellungen:</h3>
      <ul>
        {userOrdersData?.map((order, index) => (
          <li key={index} className="border mb-5 p-5">
            <div className="mb-3 font-xl font-bold text-xl">
              Bestellung {index + 1}:
            </div>
            <div>
              <ul>
                {order.products.map((p:any) => (
                  <li key={p._id} className="mb-5">
                    <div className="text-[orange]">{p.productId.name}</div>
                    <div className="italic">
                      Stück und Preis: {p.quantity} x ({p.productId.price} €)
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="">Gesamt: {order.total} €</div>
          </li>
        ))}
      </ul>
    </>
  );
}
