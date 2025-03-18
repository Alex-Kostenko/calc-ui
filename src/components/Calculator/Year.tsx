import Container from "../Container";
import { useAppDispatch } from "@/hooks";
import { setAll } from "@/store/slices/total.slice";
import Select from "react-select";
import { ISelectOnChangeValue, ISelectOption } from "@/interfaces";

const Year = () => {
  const startYear = 1990;
  const selectLength = new Date().getFullYear() - startYear + 1;
  const options: ISelectOption<number>[] = Array.from({ length: selectLength })
    .map((_, i) => ({
      label: String(startYear + i),
      value: startYear + i,
    }))
    .reverse();

  const dispatch = useAppDispatch();

  const handleSelect = (value: ISelectOnChangeValue<number>) => {
    dispatch(setAll({ carYear: value?.value! }));
  };

  return (
    <Container>
      <h3>Рік:</h3>
      <Select
        isSearchable
        isClearable
        placeholder="Рік"
        onChange={handleSelect}
        options={options}
      />
    </Container>
  );
};

export default Year;
