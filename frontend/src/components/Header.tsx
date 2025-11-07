import { NavLink } from "react-router";
import { useEffect, useState, use } from "react";
import { GesamtseitenContext } from "../context/GesamtseitenContext";
import LoginModal from "./LoginModal";

export default function Header() {
  const { userData, setUserData } = use(GesamtseitenContext);

  // Logout
  const logout = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setUserData(null);
      alert("Du wurdest abgemeldet");
    } catch (error) {
      console.log(error);
    }
  };

  interface Category {
    _id: string;
    name: string;
  }
  const [categories, setCategories] = useState<Category[] | null>(null);

  useEffect(() => {
    // FETCH CATEGORIES (immer)
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/categories`);
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();

    // Menu schließt alle Submenüs bei Klick:
    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest("a")) {
        document
          .querySelectorAll("details[open]")
          .forEach((d) => d.removeAttribute("open"));
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <header className="p-4 pt-10 overflow-auto">
        <div
          className="p-10 mb-5"
          style={{
            backgroundImage: 'url("./img/header-image.png")',
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundColor: "black",
          }}
        >
          <h1
            className="text-3xl mb-2 font-black"
            style={{ textShadow: "1px 1px 2px black" }}
          >
            Sample Shop
          </h1>
          <p
            className="mb-6 text-2xl"
            style={{ textShadow: "1px 1px 2px black" }}
          >
            Übungsprojekt mit Express.js, MongoDB und React
          </p>
        </div>
        <div className="grid md:grid-cols-3">
          <div className="min-h-[52px]">
            <nav>
              <ul className="menu menu-horizontal bg-black rounded-box lg:mb-64 absolute">
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <details>
                    <summary>Kategorien</summary>
                    <ul className="bg-black">
                      <li>
                        <NavLink to="/">Alle zeigen</NavLink>
                      </li>
                      {categories?.map((cat) => (
                        <li key={cat._id}>
                          <NavLink to={`/${cat._id}`}>{cat.name}</NavLink>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
                <li>
                  <details>
                    <summary>About</summary>
                    <ul className="bg-black">
                      <li>
                        <NavLink to="/about">About</NavLink>
                      </li>
                      <li>
                        <NavLink to="/about">Impressum</NavLink>
                      </li>
                      <li>
                        <details>
                          <summary>Weiteres</summary>
                          <ul>
                            <li>
                              <a>Kontakt</a>
                            </li>
                            <li>
                              <a>Zusammenarbeiten</a>
                            </li>
                          </ul>
                        </details>
                      </li>
                    </ul>
                  </details>
                </li>
              </ul>
            </nav>
          </div>
          <div className="min-h-[52px]">
            <nav>
              <ul className="menu menu-horizontal bg-black rounded-box lg:mb-64  absolute">
                {userData ? (
                  <li>
                    <a onClick={logout}>Logout</a>
                  </li>
                ) : (
                  <li>
                    <LoginModal />
                  </li>
                )}
                {userData?.roles?.[0] === "admin" && (
                  <li>
                    <NavLink to="/admin-bereich" className="text-[orange]">
                      Admin Bereich
                    </NavLink>
                  </li>
                )}
              </ul>
            </nav>
          </div>

          <div className="min-h-[52px]">
            <nav>
              <ul className="menu menu-horizontal bg-black rounded-box lg:mb-64  absolute">
                <li>
                  <NavLink to="/kontodaten">Meine Kontodaten</NavLink>
                </li>
                <li>
                  <NavLink to="/warenkorb">Mein Warenkorb</NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
