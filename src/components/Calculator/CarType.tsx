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
      <div className="grid 2xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-center gap-5">
        {!isLoading &&
          data &&
          data.data.map((carType) => (
            <div
              data-active={currentType && currentType?.name === carType.name}
              className="flex flex-col gap-5 items-center data-[active='true']:!border-b-blue-600 data-[active]:shadow-md p-2 bg-main-gray !rounded-none cursor-pointer border-b-4 border-transparent"
              onClick={() => handleSelect(carType)}
              key={carType.name}
            >
              <img src={getImageUrl(carType.image)} alt={carType.name} />
              <p>{carType.name}</p>
            </div>
          ))}
      </div>
    </Container>
  );
};

export default CarType;
