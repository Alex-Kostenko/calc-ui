import { Button } from "antd";

const Header = () => {
  return (
    <header className="absolute bg-white top-12 left-1/2 -translate-x-1/2 container flex items-center px-4 md:px-6 lg:px-8 shadow-md">
      <nav className="ml-auto py-4">
        <Button>
          <a href="/register">register</a>
        </Button>
      </nav>
    </header>
  );
};

export default Header;
