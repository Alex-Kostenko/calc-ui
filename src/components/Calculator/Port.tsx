import { useAppSelector } from "@/hooks";
import Container from "../Container";

const Port = () => {
  const locationPort = useAppSelector((state) => state.total.locationPort);
  return (
    <Container>
      <h3>Port:</h3>
      <div className="bg-white min-h-[30px] border border-[#d9d9d9] m-0 px-[11px] py-[4px] text-[rgba(0,0,0,0.88)] text-[14px] leading-[1.5] list-none relative inline-block w-full min-w-0 rounded-md transition-all duration-200">
        {locationPort?.name}
      </div>
    </Container>
  );
};

export default Port;
