import { useAppDispatch, useAppSelector } from "@/hooks";
import { Container } from "@/components";
import { useFormula } from "@/hooks/useFormula";
import { setAll } from "@/store/slices/total.slice";
import { ICoef } from "@/interfaces/coefficient";
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
    auctionFee,
    user,
  } = useAppSelector((state) => state.total);

  const dispatch = useAppDispatch();

  const [getExcise] = useFormula("excise");
  const [getDuty] = useFormula("duty");
  const [getExciseElectric] = useFormula("excise_electric");
  const [getDutyElectric] = useFormula("duty_electric");
  const [getVat] = useFormula("vat");
  const [getVatElectric] = useFormula("vat_electric");
  const [getInsurance] = useFormula("insurance");

  const sum = (args: Array<number | undefined | null | "">) => {
    if (args.every((a) => typeof a === "number"))
      return "$" + args.reduce((a, c) => a + c, 0);
    return null;
  };

  function getCoef(coefName: ICoef["field"]): number {
    return user?.coefficient.coef.find((c) => c.field === coefName)?.value || 1;
  }

  function calculate(
    value: CallableFunction | number | undefined,
    coefName: ICoef["field"]
  ) {
    const res: number | undefined =
      typeof value === "function" ? value() : value;
    const coef = user?.coefficient.coef.find((c) => c.field === coefName);
    return res
      ? coef?.isPercent
        ? res * (coef?.value || 1)
        : res + (coef?.value || 1)
      : "";
  }

  const calculateFee = () => {
    if (carPrice && location?.auctions) {
      const taxes = location?.auctions.find((a) => a.name === auctionName)
        ?.auction_tax.tax;

      if (!taxes) {
        return undefined;
      }

      const index = taxes.findIndex((tax) => tax.threshold >= carPrice);

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
    dispatch(
      setAll({
        auctionFee: calculate(calculateFee(), "auctionFee") || undefined,
      })
    );
  }, [carPrice, location?.auctions]);

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

  return (
    <Container className="grid grid-cols-2 gap-5 lg:col-span-2 bg-main-gray text-secondary-gray pt-4 rounded">
      <div className="flex flex-col space-y-4 justify-between px-4 [&>p]:flex [&>p]:justify-between">
        <p>
          Ціна авто: <span>{"$" + (carPrice || "")}</span>
        </p>
        <p>
          Аукціонний збір: <span>{"$" + (auctionFee || "")}</span>
        </p>
        <p>
          Страхування:{" "}
          <span>{"$" + calculate(getInsurance(), "insurance")}</span>
        </p>
        <p>
          Доставка до порту:{" "}
          <span>{"$" + calculate(location?.price, "portDelivery")}</span>
        </p>
        <p>
          Ціна морської переправи:{" "}
          <span>
            {"$" + calculate(calculateSeaDelivery, "seaTransportation")}
          </span>
        </p>
        <p>
          Акциз:{" "}
          <span>
            {"$" +
              calculate(
                fuelType === "electric" ? getExciseElectric() : getExcise(),
                "excise"
              )}
          </span>
        </p>
        <p>
          Мито:{" "}
          <span>
            {"$" +
              calculate(
                fuelType === "electric" ? getDutyElectric() : getDuty(),
                "duty"
              )}
          </span>
        </p>
      </div>

      <div className="flex flex-col space-y-4 justify-between px-4 [&>p]:flex [&>p]:justify-between">
        <p>
          ПДВ:{" "}
          <span>
            {"$" +
              calculate(
                fuelType === "electric" ? getVatElectric() : getVat(),
                "vat"
              )}
          </span>
        </p>
        <p>
          Брокер:{" "}
          <span>{!!carPrice && "$" + calculate(consts?.broker, "broker")}</span>
        </p>
        {(fuelType === "electric" || fuelType === "hybrid") && (
          <p>
            Небезпечний вантаж: <span>{"$" + consts?.dangerousGoods}</span>
          </p>
        )}
        <p>
          Експедиція:{" "}
          <span>
            {!!carPrice && "$" + calculate(consts?.expedition, "expedition")}
          </span>
        </p>
        <p>
          Доставка до міста Львів:{" "}
          <span>
            {!!carPrice &&
              "$" + calculate(consts?.cityDelivery, "cityDelivery")}
          </span>
        </p>
        <p>
          Сертифікація:{" "}
          <span>
            {!!carPrice &&
              "$" + calculate(consts?.certification, "certification")}
          </span>
        </p>
        <p>
          Постановка на облік:{" "}
          <span>{"$" + calculate(calculateRegistration, "registration")}</span>
        </p>
        <p>
          Послуги компанії:{" "}
          <span>
            {!!carPrice &&
              "$" + calculate(consts?.companyService, "companyServices")}
          </span>
        </p>
      </div>

      <div className="col-span-2 px-4 py-3 text-white bg-blue-600 rounded-b">
        Ціна за авто зі США під ключ:{" "}
        {sum([
          calculate(consts?.broker, "broker"),
          calculate(consts?.certification, "certification"),
          calculate(consts?.cityDelivery, "cityDelivery"),
          calculate(consts?.companyService, "companyServices"),
          calculate(consts?.expedition, "expedition"),
          carPrice,
          calculate(auctionFee, "auctionFee"),
          calculate(getInsurance(), "insurance"),
          calculate(location?.price, "portDelivery"),
          calculate(
            fuelType === "electric" ? getExciseElectric() : getExcise(),
            "excise"
          ),
          calculate(
            fuelType === "electric" ? getDutyElectric() : getDuty(),
            "duty"
          ),
          calculate(
            fuelType === "electric" ? getVatElectric() : getVat(),
            "vat"
          ),
          calculate(calculateRegistration(), "registration"),
          calculate(calculateSeaDelivery(), "seaTransportation"),
        ])}
      </div>
    </Container>
  );
};

export default Result;
