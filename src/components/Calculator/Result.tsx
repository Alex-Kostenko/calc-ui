import { useAppDispatch, useAppSelector } from "@/hooks";
import { Container } from "@/components";
import { useFormula } from "@/hooks/useFormula";
import { setAll } from "@/store/slices/total.slice";
import { useEffect } from "react";

const Result = () => {
  const { carPrice, location, carType, auctionName, consts, fuelType } =
    useAppSelector((state) => state.total);

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

  useEffect(() => {
    dispatch(setAll({ auctionFee: calculateFee() }));
  }, [calculateFee]);

  const auctionFee = calculateFee();

  return (
    <Container className="grid grid-cols-2 gap-5 col-span-2 bg-main-gray text-secondary-gray pt-4 rounded">
      <div className="flex flex-col gap-4 px-2">
        <p>car price: {carPrice}</p>
        <p>auction tax: {auctionFee}</p>
        <p>insurance: not available</p>
        <p>port delivery price: {location?.price}</p>
        <p>
          sea transportation price:{" "}
          {carType?.name &&
            location?.port &&
            location?.port.car_types.find((type) => type.name === carType.name)!
              .price}
        </p>
        <p>
          excise: {fuelType === "electric" ? getExciseElectric() : getExcise()}
        </p>
        <p>duty: {fuelType === "electric" ? getDutyElectric() : getDuty()}</p>
      </div>

      <div className="flex flex-col gap-4 px-2">
        <p>vat: {getVat()}</p>
        <p>broker: {consts?.broker}</p>
        <p>expedition: {consts?.expedition}</p>
        <p>city delivery price: {consts?.cityDelivery}</p>
        <p>certification: {consts?.certification}</p>
        <p>registration: by final sum</p>
        <p>company service: {consts?.companyService}</p>
      </div>

      <div className="col-span-2 px-24 py-1 text-white bg-blue-600">total</div>
    </Container>
  );
};

export default Result;
