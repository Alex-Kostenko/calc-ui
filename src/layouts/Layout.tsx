import Footer from "@/components/Footer";
import Header from "@components/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-120px)]">
        <div className="w-12 bg-white"></div>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
