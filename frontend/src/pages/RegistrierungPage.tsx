import RegistrationForm from "../components/RegistryForm";
export default function RegistrierungPage() {
  return (
    <>
      <main className="p-4">
        <h2 className="mb-2 text-3xl">Registrierung</h2>
        <div className="md:mx-[20vw]">
          <RegistrationForm />
        </div>
      </main>
    </>
  );
}
