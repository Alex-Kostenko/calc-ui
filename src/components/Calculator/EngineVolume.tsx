import { Input } from "antd";
import Container from "../Container";
import { useAppDispatch } from "@/hooks";
import { setAll } from "@/store/slices/total.slice";

const EngineVolume = () => {
  const dispatch = useAppDispatch();

  const handleSelect = (value: number) => {
    dispatch(setAll({ volume: value }));
  };
  return (
    <Container>
      <h3>
        Об'єм двигуна (см<sup>3</sup> - кВт):
      </h3>
      <Input
        type="number"
        onChange={(e) => handleSelect(+e.target.value)}
        min={1}
      />
    </Container>
  );
};

export default EngineVolume;
