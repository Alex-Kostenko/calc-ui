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

  useEffect(() => {
    dispatch(setAll({ auctionFee: calculateFee() }));
  }, [calculateFee]);

  const auctionFee = calculateFee();

  return (
    <Container className="grid grid-cols-2 gap-5 col-span-2 bg-main-gray text-secondary-gray pt-4 rounded">
      <div className="flex flex-col gap-4 px-4">
        <p>Ціна авто: {carPrice}</p>
        <p>Аукціонний збір: {auctionFee}</p>
        <p>Страхування: not available</p>
        <p>Доставка до порту: {location?.price}</p>
        <p>
          Ціна морської переправи:{" "}
          {carType?.name &&
            location?.port &&
            location?.port.car_types.find((type) => type.name === carType.name)!
              .price}
        </p>
        <p>
          Акциз: {fuelType === "electric" ? getExciseElectric() : getExcise()}
        </p>
        <p>Мито: {fuelType === "electric" ? getDutyElectric() : getDuty()}</p>
      </div>

      <div className="flex flex-col gap-4 px-4">
        <p>ПДВ: {getVat()}</p>
        <p>Брокер: {carPrice && consts?.broker}</p>
        <p>Експедиція: {carPrice && consts?.expedition}</p>
        <p>Доставка до міста Львів: {carPrice && consts?.cityDelivery}</p>
        <p>Сертифікація: {carPrice && consts?.certification}</p>
        <p>Постановка на облік: {calculateRegistration()}</p>
        <p>Послуги компанії: {carPrice && consts?.companyService}</p>
      </div>

      <div className="col-span-2 px-4 py-3 text-white bg-blue-600 rounded-b">
        Ціна за авто зі США під ключ
      </div>
    </Container>
  );
};

export default Result;
