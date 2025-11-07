import RegistrationFormChangeUserData from "../components/RegistryFormChangeUserData";

const AccountPage = () => {
  return (
    <>
      <main className="p-4">
        <h2 className="mb-2 text-3xl">Meine Kontodaten</h2>
        <div className="md:mx-[20vw]">
          <RegistrationFormChangeUserData />
        </div>
      </main>
    </>
  );
};

export default AccountPage;
