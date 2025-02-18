import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";
import headerBg from "/usa-header-bg.jpg";
import Container from "./Container";

const Breadcrumbs = () => {
  const path = useLocation().pathname;
  const lastItem = path.substring(1, path.length)
    ? {
        title: path.substring(1, path.length),
        href: path,
      }
    : {};

  return (
    <div className="relative flex items-center w-full h-[310px] overflow-hidden">
      <img
        src={headerBg}
        className="absolute bottom-0 w-full opacity-30 -z-10"
        alt=""
      />
      <Container>
        <Breadcrumb items={[{ title: "Home", href: "/" }, lastItem]} />
      </Container>
    </div>
  );
};

export default Breadcrumbs;
