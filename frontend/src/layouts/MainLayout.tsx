import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
export default function MainLayout() {
  return (
    <>
      <div className="page flex flex-col min-h-screen">
        <div className="bg-black sticky top-[-220px] z-10 -translate-y-2 shadow-[0_0_30px_#3b82f6aa] border-cyan-600">
        {/* <div className="bg-black z-10 mt-[-210px]"> */}
          <div className="container m-auto">
            <Header></Header>
          </div>
        </div>

        <div className="container m-auto flex-1 my-4">
          <Outlet></Outlet>
        </div>

        <div className="bg-black py-4">
          <div className="container m-auto ">
            <Footer></Footer>
          </div>
        </div>
      </div>
    </>
  );
}
