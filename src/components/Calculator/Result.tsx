import { useAppDispatch, useAppSelector } from "@/hooks";
import { Container } from "@/components";
import { useFormula } from "@/hooks/useFormula";
import { setAll } from "@/store/slices/total.slice";
import { useEffect } from "react";

const Result = () => {
  const {
    carPrice,
    location,
    carType,
    auctionName,
    consts,
    fuelType,
    registrationPercents,
  } = useAppSelector((state) => state.total);

  const dispatch = useAppDispatch();

  const [getExcise] = useFormula("excise");
  const [getDuty] = useFormula("duty");
  const [getExciseElectric] = useFormula("excise_electric");
  const [getDutyElectric] = useFormula("duty_electric");
  const [getVat] = useFormula("vat");
  const [getVatElectric] = useFormula("vat_electric");
  const [getInsurance] = useFormula("insurance");

  const sum = (args: Array<number | undefined>) => {
    if (args.every((a) => typeof a === "number"))
      return "$" + args.reduce((a, c) => a + c, 0);
    return null;
  };

  const calculateFee = () => {
    if (carPrice && location?.auctions) {
      const taxes = location?.auctions.find((a) => a.name === auctionName)
        ?.auction_tax.tax;

      if (!taxes) {
        return undefined;
      }

      const index = taxes.findIndex(
        (tax, index, all_taxes) =>
          tax.threshold >= carPrice && all_taxes[index - 1].tax
      );

      if (index && index > 0) {
        const tax = taxes[index - 1];
        return Math.floor(tax.tax * (tax.is_percent ? carPrice / 100 : 1));
      } else if (index && index === 0) {
        const tax = taxes[index];
        return Math.floor(tax.tax * (tax.is_percent ? carPrice / 100 : 1));
      }

      const tax = taxes[taxes?.length - 1];
      return Math.floor(tax.tax * (tax.is_percent ? carPrice / 100 : 1));
    }
  };

  const calculateRegistration = () => {
    if (carPrice && registrationPercents) {
      const percentCopy = [...registrationPercents];
      const value = percentCopy
        .sort((a, b) => b.threshold - a.threshold)
        .find((value) => carPrice >= value.threshold);

      return value ? Math.round((value.percent / 100) * carPrice) : 0;
    }
  };

  const calculateSeaDelivery = () => {
    return (
      carType?.name &&
      location?.port &&
      location?.port.car_types.find((type) => type.name === carType.name)!.price
    );
  };

  useEffect(() => {
    dispatch(setAll({ auctionFee: calculateFee() }));
  }, [calculateFee]);

  const auctionFee = calculateFee();

  return (
    <Container className="grid grid-cols-2 gap-5 col-span-2 bg-main-gray text-secondary-gray pt-4 rounded">
      <div className="flex flex-col gap-4 px-4 [&>p]:flex [&>p]:justify-between">
        <p>
          Ціна авто: <span>{carPrice}</span>
        </p>
        <p>
          Аукціонний збір: <span>{auctionFee}</span>
        </p>
        <p>
          Страхування: <span>{getInsurance()}</span>
        </p>
        <p>
          Доставка до порту: <span>{location?.price}</span>
        </p>
        <p>
          Ціна морської переправи: <span>{calculateSeaDelivery()}</span>
        </p>
        <p>
          Акциз:{" "}
          <span>
            {fuelType === "electric" ? getExciseElectric() : getExcise()}
          </span>
        </p>
        <p>
          Мито:{" "}
          <span>{fuelType === "electric" ? getDutyElectric() : getDuty()}</span>
        </p>
      </div>

      <div className="flex flex-col gap-4 px-4 [&>p]:flex [&>p]:justify-between">
        <p>
          ПДВ:{" "}
          <span>{fuelType === "electric" ? getVatElectric() : getVat()}</span>
        </p>
        <p>
          Брокер: <span>{!!carPrice && consts?.broker}</span>
        </p>
        <p>
          Експедиція: <span>{!!carPrice && consts?.expedition}</span>
        </p>
        <p>
          Доставка до міста Львів:{" "}
          <span>{!!carPrice && consts?.cityDelivery}</span>
        </p>
        <p>
          Сертифікація: <span>{!!carPrice && consts?.certification}</span>
        </p>
        <p>
          Постановка на облік: <span>{calculateRegistration()}</span>
        </p>
        <p>
          Послуги компанії: <span>{!!carPrice && consts?.companyService}</span>
        </p>
      </div>

      <div className="col-span-2 px-4 py-3 text-white bg-blue-600 rounded-b">
        Ціна за авто зі США під ключ:{" "}
        {sum([
          consts?.broker,
          consts?.certification,
          consts?.cityDelivery,
          consts?.companyService,
          consts?.expedition,
          carPrice,
          auctionFee,
          getInsurance(),
          location?.price,
          fuelType === "electric" ? getExciseElectric() : getExcise(),
          fuelType === "electric" ? getDutyElectric() : getDuty(),
          fuelType === "electric" ? getVatElectric() : getVat(),
          calculateRegistration(),
          calculateSeaDelivery(),
        ])}
      </div>
    </Container>
  );
};

export default Result;
