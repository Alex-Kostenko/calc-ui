import Select from "react-select";
import Container from "../Container";
import {
  ISelectOnChangeValue,
  ISelectOption,
  TFuelType,
} from "@interfaces/index";
import { useAppDispatch } from "@/hooks";
import { setAll } from "@/store/slices/total.slice";

const FuelType = () => {
  const dispatch = useAppDispatch();

  const types: ISelectOption<TFuelType>[] = [
    { label: "Бензин", value: "gasoline" },
    { label: "Дизель", value: "diesel" },
    { label: "Електро", value: "electric" },
    { label: "Гібрид", value: "hybrid" },
  ];

  const handleSelect = (type: ISelectOnChangeValue<TFuelType>) => {
    dispatch(setAll({ fuelType: type?.value }));
  };
  return (
    <Container>
      <h3>Тип пального:</h3>
      <Select
        isClearable
        onChange={(v) => handleSelect(v)}
        isSearchable
        placeholder="Тип пального"
        options={types}
      />
    </Container>
  );
};

export default FuelType;
