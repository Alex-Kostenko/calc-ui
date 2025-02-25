import { useAppDispatch } from "@/hooks";
import { useGetAllAuctionsQuery } from "@/store/api";
import { setAuction } from "@/store/slices/total.slice";
import { useState } from "react";
import { Container } from "@components/index";
import { getImageUrl } from "@/utils";

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
      <h3>Аукціон:</h3>
      <div className=" flex gap-5">
        {!isLoading &&
          data &&
          data?.data.map((auction, index) => (
            <div
              data-active={active === auction.name ? true : undefined}
              key={index}
              className="data-[active]:!border-b-blue-600 data-[active]:shadow-md px-7 py-2 bg-main-gray !rounded-none cursor-pointer border-b-4 border-transparent flex flex-col items-center gap-4"
              onClick={handleSelectAuction}
            >
              <img
                src={getImageUrl(auction.image)}
                alt=""
                className="!h-[55px]"
              />
              {auction.name}
            </div>
          ))}
      </div>
    </Container>
  );
};

export default AuctionCards;
