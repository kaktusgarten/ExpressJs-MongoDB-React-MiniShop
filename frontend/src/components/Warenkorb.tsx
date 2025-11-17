import { use } from "react";
import { GesamtseitenContext } from "../context/GesamtseitenContext";
import { NavLink } from "react-router";

export default function Warenkorb() {
  const { userData, einkaufswagen, setEinkaufswagen } = use<any | null>(
    GesamtseitenContext
  );

  // JETZT KAUFEN - BUTTON ACTION
  function orderArticles() {
    const orderData = {
      userId: userData._id,
      products: einkaufswagen,
    };

    (async () => {
      try {
        const res = await fetch("http://localhost:3000/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        });
        const data = await res.json();
        console.log(data);
        alert("Vielen Dank für Ihren Kauf.");
        setEinkaufswagen(null);
      } catch (error) {
        console.log(error);
      }
    })(); // <--- sofort aufrufen!
  }

  return (
    <>
      <div className="text-2xl mb-5">ÜBERSICHT</div>
      <div>
        <h2 className="text-xl mb-5">Benutzerkonto Daten:</h2>
        <div>
          {userData?.firstName} {userData?.lastName}
        </div>
        <div>{userData?.email}</div>
      </div>

      {einkaufswagen ? (
        <div>
          <div className="text-xl my-5">ARTIKEL:</div>

          {einkaufswagen?.map((order, index) => (
            <div key={index} className="mb-6 border p-5">
              <div>Artikel {index + 1}</div>
              <div className="text-2xl text-[orange]">{order.productName}</div>
              <div>Stückzahl: {order.quantity}</div>
              <div>Produkt-ID: {order.productId} </div>
            </div>
          ))}
          <div>
            <button
              onClick={orderArticles}
              className="btn btn-accent w-[100%] my-6"
            >
              Jetzt kaufen
            </button>
          </div>
        </div>
      ) : (
        <div className="text-2xl my-5">
          Zur Zeits nichts neues im Einkaufswagen! - Getätigte Einkäufe findest
          du unter "<NavLink to="/kontodaten" className="underline">Meine Kontodaten</NavLink>"!
        </div>
      )}
    </>
  );
}
