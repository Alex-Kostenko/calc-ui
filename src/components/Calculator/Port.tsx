import { useAppSelector } from "@/hooks";
import Container from "../Container";

const Port = () => {
  const location = useAppSelector((state) => state.total.location);

  if (!location?.port.name) {
    return <></>;
  }
  return (
    <Container className="flex flex-col gap-5">
      <h3>Порт: </h3>
      <h3>{location?.port.name}</h3>
    </Container>
  );
};

export default Port;
