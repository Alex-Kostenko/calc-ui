import { useAppDispatch, useAppSelector } from "@/hooks";
import { useGetAllLocationsQuery } from "@/store/api";
import { setAll } from "@/store/slices/total.slice";
import { Select } from "antd";
import Container from "../Container";
import { useEffect, useState } from "react";

const Locations = () => {
  const [value, setValue] = useState<string | null>(null);

  const { data, isLoading } = useGetAllLocationsQuery();

  const auctionName = useAppSelector((state) => state.total.auctionName);

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
  }, [auctionName]);

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
          value={value}
          options={
            data?.data
              .filter((l) => l.auctions.some((a) => a.name === auctionName))
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
