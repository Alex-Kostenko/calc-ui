import { useAppDispatch, useAppSelector } from "@/hooks";
import { useGetAllLocationsQuery } from "@/store/api";
import { setAll } from "@/store/slices/total.slice";
import { Select } from "antd";
import Container from "../Container";
import { useEffect, useState } from "react";

const Locations = () => {
  const [value, setValue] = useState<string | null>(null);

  const { data, isLoading } = useGetAllLocationsQuery();

  const auction = useAppSelector((state) => state.total.auction);

  const dispatch = useAppDispatch();

  const handleSetPorts = (locationName: string) => {
    dispatch(
      setAll({
        location: data?.data.find((location) => location.name === locationName),
      })
    );

    setValue(locationName);
  };

  const clear = () => {
    setValue(null);
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

  return (
    <Container>
      <h3>Локація:</h3>
      {!isLoading && location && (
        <Select
          showSearch
          placeholder="Локації"
          optionFilterProp="label"
          onSelect={handleSetPorts}
          className="w-full"
          allowClear
          onClear={clear}
          value={value}
          options={
            data?.data
              .filter((l) => l.auctions.some((a) => a.name === auction?.name))
              .map((l) => ({
                label: l.state.name + " - " + l.name,
                value: l.name,
              })) || [{ label: "", value: "" }]
          }
        ></Select>
      )}
    </Container>
  );
};

export default Locations;
