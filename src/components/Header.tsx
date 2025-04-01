import { useGetMeQuery } from "@/store/api";
import { Button } from "antd";

interface Props {
  buttonName: string | "none";
  onClick: () => void;
  href: string;
}

const Header = ({ buttonName, href, onClick }: Props) => {
  const { data: user } = useGetMeQuery();

  if (buttonName === "none") return <></>;
  return (
    <header>
      <nav className="h-0 container mx-auto">
        <div className="gap-5 absolute z-50  top-8 -translate-x-[116%] left-full flex items-center w-fit px-4 md:px-6 lg:px-8">
          <div className="bg-black/50 text-white px-4 py-1.5 shadow-md text-nowrap border border-transparent">
            Привіт, {user && user.username}
          </div>
          <Button onClick={onClick} size="large" className="shadow-md">
            <a href={href}>{buttonName}</a>
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
