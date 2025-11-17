import FormChangeUserData from "../components/FormChangeUserData";
import UserOrders from "../components/UserOrders";

const AccountPage = () => {
  return (
    <>
      <main className="p-4">
        <h2 className="mb-2 text-3xl">Meine Daten und Bestellungen</h2>
        <div className="grid sm:grid-cols-2 gap-8">
          <div className="">
            <h3 className="mb-2 text-xl my-6">Meine Kontodaten:</h3>
            <FormChangeUserData />
          </div>
          <div className="">
            <h3 className="mb-2 text-xl mt-6 mb-5">Meine Bestellungen:</h3>
            <UserOrders />
          </div>
        </div>
      </main>
    </>
  );
};

export default AccountPage;
