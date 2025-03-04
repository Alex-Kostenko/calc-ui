import { useAppDispatch, useAppSelector } from "@/hooks";
import { useGetAllLocationsQuery } from "@/store/api";
import { setAll } from "@/store/slices/total.slice";
import { Select } from "antd";
import Container from "../Container";

const Locations = () => {
  const { data, isLoading } = useGetAllLocationsQuery();
  const auctionName = useAppSelector((state) => state.total.auctionName);
  const dispatch = useAppDispatch();
  const handleSetPorts = (locationName: string) => {
    dispatch(
      setAll({
        location: data?.data.find((location) => location.name === locationName),
      })
    );
  };
  return (
    <Container>
      <h3>Локація:</h3>
      {!isLoading && location && (
        <Select
          onSelect={handleSetPorts}
          className="w-full"
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
