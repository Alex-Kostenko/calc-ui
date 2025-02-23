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
  CarContainer,
} from "@/components/Calculator/index";
import { useAppDispatch } from "@/hooks";
import { useGetMeQuery } from "@/store/api";
import { setAll } from "@/store/slices/total.slice";

const Calculator = () => {
  const dispatch = useAppDispatch();
  const { data } = useGetMeQuery();
  dispatch(setAll({ user: data }));

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
      <div className="flex flex-col gap-5">
        <Map />
        <CarContainer />
      </div>
      <Result />
    </div>
  );
};

export default Calculator;
