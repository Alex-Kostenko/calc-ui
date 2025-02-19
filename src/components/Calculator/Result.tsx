import { useAppSelector } from "@/hooks";
import { Container } from "@/components";

const Result = () => {
  const { carPrice, location, carType } = useAppSelector(
    (state) => state.total
  );

  console.log(carType);
  console.log(location);

  return (
    <Container className="grid grid-cols-2 gap-5">
      <p>car price: {carPrice}</p>
      <p>vat: by formula</p>
      <p>auction tax: not available</p>
      <p>broker: not available</p>
      <p>insurance: not available</p>
      <p>expedition: not available</p>
      <p>port delivery price: {location?.price}</p>
      <p>city delivery price: not available</p>
      <p>
        sea transportation price:{" "}
        {carType?.name &&
          location?.port &&
          location?.port.car_types.find((type) => type.name === carType.name)!
            .price}
      </p>
      <p>certification: by final sum</p>
      <p>excise: by formula</p>
      <p>registration: by final sum</p>
      <p>duty: by formula</p>
      <p>company service: not available</p>
    </Container>
  );
};

export default Result;
