import { useGetAllCarTypesQuery } from "@/store/api";
import Container from "../Container";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setAll } from "@/store/slices/total.slice";
import { ICarType } from "@/interfaces/car.type";
import { getImageUrl } from "@/utils";

const CarType = () => {
  const { data, isLoading } = useGetAllCarTypesQuery();
  const dispatch = useAppDispatch();
  const currentType = useAppSelector((state) => state.total.carType);
  const handleSelect = (type: ICarType) => {
    dispatch(setAll({ carType: type }));
  };

  if (!data?.data.length) {
    return <p>Типи авто не знайдено. Заповніть таблицю</p>;
  }

  return (
    <Container>
      <h3>Тип авто:</h3>
      {/* flex flex-row flex-wrap */}
      <div className="grid grid-cols-3 grid-rows-2 items-center gap-2 md:gap-5">
        {!isLoading &&
          data &&
          data.data.map((carType) => (
            <div
              data-active={currentType && currentType?.name === carType.name}
              className="flex flex-col items-center justify-center data-[active='true']:!border-b-blue-600 p-2 cursor-pointer border-b-4 border-transparent h-full [&>*]:mt-auto bg-white shadow-form rounded-2xl"
              onClick={() => handleSelect(carType)}
              key={carType.name}
            >
              <img src={getImageUrl(carType.image)} alt={carType.name} />
              <p className="text-center">{carType.label || carType.name}</p>
            </div>
          ))}
      </div>
    </Container>
  );
};

export default CarType;
