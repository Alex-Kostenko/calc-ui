import { Select } from "antd";
import Container from "../Container";
import { useAppDispatch } from "@/hooks";
import { setAll } from "@/store/slices/total.slice";

const Year = () => {
  const startYear = 1990;
  const selectLength = new Date().getFullYear() - startYear;

  const dispatch = useAppDispatch();

  const handleSelect = (value: number) => {
    dispatch(setAll({ carYear: value }));
  };

  return (
    <Container>
      <h3>Рік:</h3>
      <Select
        showSearch
        placeholder="Рік"
        optionFilterProp="label"
        onSelect={handleSelect}
        options={Array.from({ length: selectLength })
          .map((_, i) => ({
            label: String(startYear + i),
            value: startYear + i,
          }))
          .reverse()}
      />
    </Container>
  );
};

export default Year;
