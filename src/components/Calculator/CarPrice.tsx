import { Input } from "antd";
import Container from "../Container";
import { useAppDispatch } from "@/hooks";
import { setAll } from "@/store/slices/total.slice";
import { useGetConstsQuery } from "@/store/api";

const CarPrice = () => {
  const dispatch = useAppDispatch();

  const { data } = useGetConstsQuery();
  const handleSetCarPrise = (value: number) => {
    dispatch(setAll({ carPrice: value, consts: data!.data }));
  };

  return (
    <Container>
      <h3>Car Price:</h3>
      <Input
        type="number"
        onChange={(e) => handleSetCarPrise(+e.target.value)}
      />
    </Container>
  );
};

export default CarPrice;
