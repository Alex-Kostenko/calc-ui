import { useGetAllCarsListQuery } from "@/store/api";

const CarsList = () => {
  const { data } = useGetAllCarsListQuery();
  console.log(data);

  return <div></div>;
};

export default CarsList;
