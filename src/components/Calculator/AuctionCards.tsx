import { useAppDispatch } from "@/hooks";
import { useGetAllAuctionsQuery } from "@/store/api";
import { setAll } from "@/store/slices/total.slice";
import { useState } from "react";
import { Container } from "@components/index";
import { getImageUrl } from "@/utils";

const AuctionCards = () => {
  const [active, setActive] = useState<string | null>(null);
  const { data, isLoading } = useGetAllAuctionsQuery();

  const dispatch = useAppDispatch();

  const handleSelectAuction = (auctionName: string) => {
    const auction = data?.data.find((auction) => auction.name === auctionName);
    if (auction) {
      dispatch(
        setAll({
          auctionBids: auction.bids,
          additionalFee: auction.additionalFee,
          auction,
        })
      );
      setActive(auctionName);
    }
  };

  if (!data?.data.length) {
    return <p>Аукціони не знайдено. Заповніть таблицю</p>;
  }

  return (
    <Container>
      <h3>Аукціон:</h3>
      <div className="grid grid-cols-3 gap-2 md:gap-5">
        {!isLoading &&
          data &&
          data?.data.map((auction, index) => (
            <div
              data-active={active === auction.name ? true : undefined}
              key={index}
              className="data-[active]:!border-b-blue-600 px-1.5 md:px-7 py-2 bg-white rounded-2xl shadow-form cursor-pointer border-b-4 border-transparent flex flex-col items-center gap-1 md:gap-4 pt-4"
              onClick={() => handleSelectAuction(auction.name)}
            >
              <img
                src={getImageUrl(auction.image)}
                alt=""
                className="!h-[35px] md:!h-[55px]"
              />
              {auction.name}
            </div>
          ))}
      </div>
    </Container>
  );
};

export default AuctionCards;
