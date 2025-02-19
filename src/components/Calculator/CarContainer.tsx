import { useAppSelector } from "@/hooks";
import { getImageUrl } from "@/utils";

const CarContainer = () => {
  const carType = useAppSelector((state) => state.total.carType);
  return (
    <>
      {carType?.packImage && (
        <img
          src={getImageUrl(carType.packImage)}
          alt="car container"
          className="max-w-3/5"
        />
      )}
    </>
  );
};

export default CarContainer;
