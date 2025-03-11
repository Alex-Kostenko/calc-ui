import { Button } from "antd";

interface Props {
  buttonName: string | "none";
  onClick: () => void;
  href: string;
}

const Header = ({ buttonName, href, onClick }: Props) => {
  if (buttonName === "none") return <></>;
  return (
    <header>
      <nav className="h-0 container mx-auto">
        <Button
          onClick={onClick}
          size="large"
          className="absolute z-50 bg-white top-8 -translate-x-[116%] left-full flex items-center w-fit px-4 md:px-6 lg:px-8 shadow-md"
        >
          <a href={href}>{buttonName}</a>
        </Button>
      </nav>
    </header>
  );
};

export default Header;
