export default function AboutPage() {
  return (
    <>
      <main className="p-4">
        <h2 className="mb-2 text-3xl">Ich bin die ABOUT PAGE</h2>

        <div className="p-5">
          <p className="text-xl">
            1. Auf dieser Base React Site werden folgende Frameworks & Methoden
            erprobt:
          </p>
          <ul className="p-5 text-xl">
            <li>Vite</li>
            <li>Typescript</li>
            <li>React</li>
            <li>TailwindCss</li>
            <li>DailyUi: -- Login Modal -- Theme Colors</li>
            <li>React-Router</li>
            <li>Prodected-Layout (React-Router)</li>
            <li>createContext() - React Context API</li>
            <li>useFormAction() - Form Validierung</li>
            <li>useRef() - Für Open-Login-Modal</li>
            <li>API-Anbindung an Node/Express.js Projekt</li>
            <li>MongoDB</li>
          </ul>
          <p className="text-xl">2. Impressum</p>
          <ul className="p-5 text-xl">
            <li>Marco Rehberg</li>
            <li>Schleiermacherstr. 18</li>
            <li>28201 Bremen</li>
            <li>Tel.: 01575 88 0 77 90</li>
          </ul>
        </div>
      </main>
    </>
  );
}
