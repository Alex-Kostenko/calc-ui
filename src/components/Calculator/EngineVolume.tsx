import { Input } from "antd";
import Container from "../Container";
import { useAppDispatch } from "@/hooks";
import { setAll } from "@/store/slices/total.slice";

const EngineVolume = () => {
  const dispatch = useAppDispatch();

  const handleSelect = (value: number) => {
    dispatch(setAll({ engineVolume: value }));
  };
  return (
    <Container>
      <h3>Engine Volume:</h3>
      <Input
        type="number"
        onChange={(e) => handleSelect(+e.target.value)}
        min={10}
      />
    </Container>
  );
};

export default EngineVolume;
