import { Breadcrumbs, Footer, Header } from "@components/index";
import { Outlet, useLocation } from "react-router-dom";

interface HeaderOptions {
  buttonName: string;
  href: string;
  onClick: () => void;
}

const Layout = () => {
  const location = useLocation();
  const path = location.pathname;

  const headerOptions: Record<string, HeaderOptions> = {
    "/": {
      buttonName: "Log Out",
      href: "/login",
      onClick: () => {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
      },
    },
    "/login": {
      buttonName: "register",
      href: "/register",
      onClick: () => {},
    },
    "/register": {
      buttonName: "login",
      href: "/login",
      onClick: () => {},
    },
  };

  return (
    <>
      <Header {...headerOptions[path]} />
      <main className="min-h-[calc(100vh-120px)] flex flex-col">
        <div className="w-full h-16 bg-white"></div>
        <Breadcrumbs />
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
