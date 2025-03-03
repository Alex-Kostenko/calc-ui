import { Select } from "antd";
import Container from "../Container";
import { EFuelType } from "@interfaces/index";
import { useAppDispatch } from "@/hooks";
import { setAll } from "@/store/slices/total.slice";

const FuelType = () => {
  const dispatch = useAppDispatch();
  const handleSelect = (type: EFuelType) => {
    dispatch(setAll({ fuelType: type }));
  };
  return (
    <Container>
      <h3>Тип пального:</h3>
      <Select
        onSelect={handleSelect}
        options={Object.keys(EFuelType).map((f) => ({ title: f, value: f }))}
      />
    </Container>
  );
};

export default FuelType;
