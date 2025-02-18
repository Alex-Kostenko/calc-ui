import { Container } from "@/components";
import {
  Port,
  AuctionCards,
  CarPrice,
  Locations,
  FuelType,
  EngineVolume,
  Year,
} from "@/components/Calculator/index";
import { useAppSelector } from "@/hooks";

const Calculator = () => {
  const { carPrice, location } = useAppSelector((state) => state.total);

  return (
    <div className="flex flex-col gap-5">
      <CarPrice />
      <AuctionCards />
      <Locations />
      <Port />
      <FuelType />
      <EngineVolume />
      <Year />

      <Container>
        <p>car price: {carPrice}</p>
        <p>location price: {location?.price}</p>
        <p>state price: {location?.state.price}</p>
      </Container>
    </div>
  );
};

export default Calculator;
