import { Select } from "antd";
import Container from "../Container";
import { EFuelType } from "@interfaces/index";

const FuelType = () => {
  return (
    <Container>
      <h3>Fuel type:</h3>
      <Select
        options={Object.keys(EFuelType).map((f) => ({ title: f, value: f }))}
      />
    </Container>
  );
};

export default FuelType;
