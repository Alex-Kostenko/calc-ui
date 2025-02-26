import { Input } from "antd";
import Container from "../Container";
import { useAppDispatch } from "@/hooks";
import { setAll } from "@/store/slices/total.slice";

const CarPrice = () => {
  const dispatch = useAppDispatch();

  const handleSetCarPrise = (value: number) => {
    dispatch(
      setAll({
        carPrice: value,
      })
    );
  };

  return (
    <Container>
      <h3>Ціна авто:</h3>
      <Input
        type="number"
        onChange={(e) => handleSetCarPrise(+e.target.value)}
        min={1}
      />
    </Container>
  );
};

export default CarPrice;
