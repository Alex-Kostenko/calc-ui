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
import {
  useGetConstsQuery,
  useGetFuelCostQuery,
  useGetMeQuery,
  useGetRegistrationPercentQuery,
} from "@/store/api";
import { setAll } from "@/store/slices/total.slice";
import { useEffect } from "react";

const Calculator = () => {
  const dispatch = useAppDispatch();
  const { data } = useGetMeQuery();

  const { data: consts } = useGetConstsQuery();
  const { data: registrationPercents } = useGetRegistrationPercentQuery();
  const { data: fuelCost } = useGetFuelCostQuery();
  useEffect(() => {
    if (data && consts && fuelCost && registrationPercents) {
      dispatch(
        setAll({
          user: data,
          consts: consts?.data,
          registrationPercents: registrationPercents?.data.values,
          fuelCost: fuelCost?.data,
        })
      );
    }
  }, [data, consts, registrationPercents, fuelCost, dispatch]);

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
      {data && <Result />}
    </div>
  );
};

export default Calculator;
