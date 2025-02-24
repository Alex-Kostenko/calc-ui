import { useAppSelector } from "@/hooks";
import Container from "../Container";

const Port = () => {
  const location = useAppSelector((state) => state.total.location);
  return (
    <Container>
      <h3>Port: {location?.port.name}</h3>
    </Container>
  );
};

export default Port;
