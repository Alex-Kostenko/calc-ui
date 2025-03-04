import { Select } from "antd";
import Container from "../Container";
import { TFuelType } from "@interfaces/index";
import { useAppDispatch } from "@/hooks";
import { setAll } from "@/store/slices/total.slice";

interface FuelSelect {
  label: string;
  value: TFuelType;
}

const FuelType = () => {
  const dispatch = useAppDispatch();

  const types: FuelSelect[] = [
    { label: "Бензин", value: "gasoline" },
    { label: "Дизель", value: "diesel" },
    { label: "Електро", value: "electric" },
    { label: "Гібрид", value: "hybrid" },
  ];

  const handleSelect = (type: TFuelType) => {
    dispatch(setAll({ fuelType: type }));
  };
  return (
    <Container>
      <h3>Тип пального:</h3>
      <Select onSelect={handleSelect} options={types} />
    </Container>
  );
};

export default FuelType;
