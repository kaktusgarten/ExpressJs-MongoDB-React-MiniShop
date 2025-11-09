import Warenkorb from "../components/Warenkorb";

const WarenkorbPage = () => {

  return (
    <>
      <main className="p-4">
        <h2 className="mb-2 text-3xl">Warenkorb</h2>
        <div className="md:mx-[20vw]">
          <Warenkorb></Warenkorb>
        </div>
      </main>
    </>
  );
};

export default WarenkorbPage;
