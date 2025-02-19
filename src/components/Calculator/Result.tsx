import { useAppSelector } from "@/hooks";
import { Container } from "@/components";

const Result = () => {
  const { carPrice, location, carType } = useAppSelector(
    (state) => state.total
  );

  return (
    <Container className="grid grid-cols-2 gap-5 bg-main-gray text-secondary-gray pt-4 rounded">
      <div className="flex flex-col gap-4 px-2">
        <p>car price: {carPrice}</p>
        <p>auction tax: not available</p>
        <p>insurance: not available</p>
        <p>port delivery price: {location?.price}</p>
        <p>
          sea transportation price:{" "}
          {carType?.name &&
            location?.port &&
            location?.port.car_types.find((type) => type.name === carType.name)!
              .price}
        </p>
        <p>excise: by formula</p>
        <p>duty: by formula</p>
      </div>

      <div className="flex flex-col gap-4 px-2">
        <p>vat: by formula</p>
        <p>broker: not available</p>
        <p>expedition: not available</p>
        <p>city delivery price: not available</p>
        <p>certification: by final sum</p>
        <p>registration: by final sum</p>
        <p>company service: not available</p>
      </div>

      <div className="col-span-2 px-24 py-1 text-white bg-blue-600">total</div>
    </Container>
  );
};

export default Result;
