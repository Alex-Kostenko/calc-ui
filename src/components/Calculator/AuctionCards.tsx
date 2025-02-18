import { useAppDispatch } from "@/hooks";
import { useGetAllAuctionsQuery } from "@/store/api";
import { setAuction } from "@/store/slices/total.slice";
import { useState } from "react";
import { Container } from "@components/index";

const AuctionCards = () => {
  const [active, setActive] = useState<string | null>(null);
  const { data, isLoading } = useGetAllAuctionsQuery();
  const dispatch = useAppDispatch();

  const handleSelectAuction = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const target = event.target as HTMLElement;
    dispatch(setAuction(target.textContent));
    setActive(target.textContent);
  };

  return (
    <Container>
      <h3>Auction:</h3>
      <div className=" flex gap-5">
        {!isLoading &&
          data &&
          data?.data.map((auction, index) => (
            <div
              data-active={active === auction.name ? true : undefined}
              key={index}
              className="data-[active]:!border-b-blue-600 data-[active]:shadow-md p-7 bg-main-gray !rounded-none cursor-pointer border-b-4 border-transparent"
              onClick={handleSelectAuction}
            >
              {auction.name}
            </div>
          ))}
      </div>
    </Container>
  );
};

export default AuctionCards;
