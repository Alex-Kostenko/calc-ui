import { useAppDispatch, useAppSelector } from "@/hooks";
import { useGetAllLocationsQuery } from "@/store/api";
import { setAll, setPorts } from "@/store/slices/total.slice";
import { Select } from "antd";

const Locations = () => {
  const { data, isLoading } = useGetAllLocationsQuery();
  const auctionName = useAppSelector((state) => state.total.auctionName);
  const dispatch = useAppDispatch();
  const handleSetPorts = (locationName: string) => {
    dispatch(
      setPorts(
        data?.data.find((location) => location.name === locationName)?.port
      )
    );
    dispatch(
      setAll({
        location: data?.data.find((location) => location.name === locationName),
      })
    );
  };
  return (
    <div className="container mx-auto flex flex-col gap-5">
      <h3>Location:</h3>
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
    </div>
  );
};

export default Locations;
