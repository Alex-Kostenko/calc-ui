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
  Sublot,
} from "@/components/Calculator/index";
import { useAppDispatch } from "@/hooks";
import {
  useGetConstsQuery,
  useGetCurrencyRateQuery,
  useGetFuelCostQuery,
  useGetMeQuery,
  useGetRegistrationPercentQuery,
} from "@/store/api";
import { setAll } from "@/store/slices/total.slice";
import { useEffect } from "react";

const Calculator = () => {
  const dispatch = useAppDispatch();
  const { data: user } = useGetMeQuery();
  const { data: currency } = useGetCurrencyRateQuery();
  const { data: consts } = useGetConstsQuery();
  const { data: registrationPercents } = useGetRegistrationPercentQuery();
  const { data: fuelCost } = useGetFuelCostQuery();

  useEffect(() => {
    if (consts && fuelCost && registrationPercents && currency) {
      dispatch(
        setAll({
          consts: consts?.data,
          registrationPercents: registrationPercents?.data.values,
          fuelCost: fuelCost?.data,
          exchange: currency,
        })
      );
    }
  }, [consts, registrationPercents, fuelCost, dispatch, currency]);

  if (!user) {
    return <>Loading...</>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 container mx-auto my-10 z-10">
      <div className="flex flex-col gap-5">
        <CarPrice />
        <AuctionCards />
        <CarType />
        <Locations />
        <Sublot />
        <Port />
        <FuelType />
        <EngineVolume />
        <Year />
      </div>
      <div className="flex flex-col gap-5">
        <Map />
        <CarContainer />
      </div>
      <Result user={user} />
    </div>
  );
};

export default Calculator;
