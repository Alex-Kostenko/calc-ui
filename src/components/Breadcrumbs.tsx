import headerBg from "/AIv2.webp";

const Breadcrumbs = () => {
  return (
    <>
      <div className="absolute top-0 left-0 right-0">
        <div className="relative flex items-center w-full ">
          <div className="absolute inset-0 -z-10  text-white/60 bg-gradient-to-b from-transparent from-40% via-white/90 via-60% to-white"></div>
          <img src={headerBg} className="w-full object-cover -z-20" alt="" />
        </div>
      </div>
      <div className=" 2xl:h-[750px] xl:h-[600px] lg:h-[450px] md:h-[350px] h-[200px]"></div>
    </>
  );
};

export default Breadcrumbs;
