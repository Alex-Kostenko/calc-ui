import { Button } from "antd";

interface Props {
  buttonName: string;
  onClick: () => void;
  href: string;
}

const Header = ({ buttonName, href, onClick }: Props) => {
  return (
    <header className="absolute z-50 bg-white top-12 left-1/2 -translate-x-1/2 container flex items-center px-4 md:px-6 lg:px-8 shadow-md">
      <nav className="ml-auto py-4">
        <Button onClick={onClick}>
          <a href={href}>{buttonName}</a>
        </Button>
      </nav>
    </header>
  );
};

export default Header;
