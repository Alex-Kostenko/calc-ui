import { useAppSelector } from "@/hooks";
import { Select } from "antd";
import Container from "../Container";

const Port = () => {
  const locationPort = useAppSelector((state) => state.total.locationPort);
  return (
    <Container>
      <h3>Port:</h3>
      <Select
        className="w-full"
        options={
          locationPort
            ? [{ title: locationPort.name, value: locationPort.name }]
            : []
        }
      ></Select>
    </Container>
  );
};

export default Port;
