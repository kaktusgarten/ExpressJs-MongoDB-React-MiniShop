import { useEffect, useState, use } from "react";
import { useParams } from "react-router";
import { GesamtseitenContext } from "../context/GesamtseitenContext";

export default function Products() {
  const { slug } = useParams<{ slug?: string }>();
  const [products, setProducts] = useState<any[] | null>(null);
  const { setEinkaufswagen } = use(GesamtseitenContext);

  // FORM - Artikel zum Warenkorb hinzufügen
  const articleToCard = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const productId = formData.get("productId") as string;
    const quantity = Number(formData.get("quantity"));
    const productName = formData.get("productName") as string;

    setEinkaufswagen((prev) => {
      // Falls vorher noch nichts im Warenkorb war
      if (!prev) return [{ productId, quantity, productName }];

      // Prüfen ob Produkt schon vorhanden
      const existing = prev.find((item) => item.productId === productId);

      if (existing) {
        // Menge erhöhen
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity, productName }
            : item
        );
      }
      // Produkt neu hinzufügen
      return [...prev, { productId, quantity, productName }];
    });

    alert("Artikel dem Einkaufswagen hinzugefügt");
  };

  useEffect(() => {
    const getProducts = async () => {
      const baseUrl = import.meta.env.VITE_API_URL;
      const url = slug
        ? `${baseUrl}/products/category/${slug}`
        : `${baseUrl}/products`;

      try {
        const res = await fetch(url);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log("Fehler ist aufgetreten: " + error);
      }
    };

    getProducts();
  }, [slug]);

  if (!products) return <div>Lade Produkte...</div>; // <--- Hier!

  return (
    <section className="pt-0">
      <h2 className="mb-2 text-3xl">
        {slug
          ? `Kategorie: ${products[0]?.categoryId?.name ?? ""}`
          : "Produkte:"}
      </h2>

      <div className="grid md:grid-cols-4 gap-5 pt-3">
        {products.map((product) => (
          <article
            key={product._id}
            className="border p-6 grid content-between"
          >
            <div className="pb-6">
              <h3 className="text-xl font-bold">{product.name}</h3>
              <p>{product.description}</p>
              <p className="font-semibold">Preis: {product.price} €</p>
              <p className="text-sm text-gray-500">
                Kategorie: {product.categoryId?.name || "–"}
              </p>
            </div>
            <form onSubmit={articleToCard}>
              <input type="hidden" name="productId" value={product._id} />
              <input type="hidden" name="productName" value={product.name} />
              <div className="flex gap-2">
                <input
                  name="quantity"
                  min={1}
                  max={10}
                  defaultValue={1}
                  type="number"
                  placeholder="Stückzahl"
                  className="input max-w-5/12"
                />
                <button className="btn min-w-7/12" type="submit">
                  kaufen
                </button>
              </div>
            </form>
          </article>
        ))}
      </div>
    </section>
  );
}
