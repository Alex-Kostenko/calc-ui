import {
  Port,
  AuctionCards,
  CarPrice,
  Locations,
  FuelType,
  EngineVolume,
  Year,
  Map,
  Result,
  CarType,
} from "@/components/Calculator/index";

const Calculator = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-5 container mx-auto my-10">
      <div className="flex flex-col gap-5">
        <CarPrice />
        <AuctionCards />
        <CarType />
        <Locations />
        <Port />
        <FuelType />
        <EngineVolume />
        <Year />
      </div>
      <Map />
      <Result />
    </div>
  );
};

export default Calculator;
