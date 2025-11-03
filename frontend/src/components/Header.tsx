import { NavLink } from "react-router";
import { useEffect } from "react";
import LoginModal from "./LoginModal";
export default function Header() {
  useEffect(() => {
    const menu = document.querySelector("nav ul.menu");

    if (!menu) return;

    const handleClick = (e) => {
      // Wenn ein Link oder NavLink geklickt wird:
      if (e.target.tagName === "A") {
        // Schließe alle offenen <details>
        const openDetails = menu.querySelectorAll("details[open]");
        openDetails.forEach((d) => d.removeAttribute("open"));
      }
    };

    menu.addEventListener("click", handleClick);
    return () => menu.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <header className="p-4 py-10 overflow-auto">
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
            Eine Sample-Shop Übung mit Express.js und React
          </p>
        </div>
        <div className="grid grid-cols-2">
          <div className="min-h-[52px]">
            <nav>
              <ul className="menu menu-horizontal bg-black rounded-box lg:mb-64 absolute">
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <details>
                    <summary>Kategorien</summary>
                    <ul>
                      <li>
                        <a>Garagen</a>
                      </li>
                      <li>
                        <a>Gartenhäuser</a>
                      </li>
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
                <li>
                  <LoginModal />
                </li>
                <li>
                  <NavLink to="/registrierung">Registrierung</NavLink>
                </li>
                <li>
                  <NavLink to="/admin-bereich">Admin Bereich</NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
