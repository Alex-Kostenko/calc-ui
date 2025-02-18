import {
  Port,
  AuctionCards,
  CarPrice,
  Locations,
} from "@/components/Calculator/index";

const Calculator = () => {
  return (
    <div className="flex flex-col gap-5">
      <CarPrice />
      <AuctionCards />
      <Locations />
      <Port />
    </div>
  );
};

export default Calculator;
