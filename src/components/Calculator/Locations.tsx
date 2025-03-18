import { useAppDispatch, useAppSelector } from "@/hooks";
import { useGetAllLocationsQuery } from "@/store/api";
import { setAll } from "@/store/slices/total.slice";
import Select from "react-select";
import Container from "../Container";
import { useEffect } from "react";
import { ISelectOnChangeValue, ISelectOption } from "@/interfaces";

function sortLocations(a: ISelectOption, b: ISelectOption) {
  if (a.label < b.label) {
    return -1;
  } else if (a.label > b.label) {
    return 1;
  } else {
    return 0;
  }
}

const Locations = () => {
  const { data, isLoading } = useGetAllLocationsQuery();

  const auction = useAppSelector((state) => state.total.auction);

  const dispatch = useAppDispatch();

  const handleSetPorts = (option: ISelectOnChangeValue) => {
    dispatch(
      setAll({
        location: data?.data.find(
          (location) => location.name === option?.value
        ),
      })
    );
  };

  const clear = () => {
    dispatch(
      setAll({
        location: null,
      })
    );
  };

  useEffect(() => {
    clear();
  }, [auction?.name]);

  if (!data?.data.length) {
    return <p>Локації не знайдено. Заповніть таблицю</p>;
  }

  const options: ISelectOption[] = data?.data
    .filter((l) => l.auctions.some((a) => a.name === auction?.name))
    .map((l) => ({
      label: l.state.name + " - " + l.name,
      value: l.name,
    }))
    .sort(sortLocations) || [{ label: "", value: "" }];

  return (
    <Container>
      <h3>Локація:</h3>
      {!isLoading && location && (
        <Select
          isClearable
          isSearchable
          placeholder="Локації"
          onChange={handleSetPorts}
          options={options}
        ></Select>
      )}
    </Container>
  );
};

export default Locations;
