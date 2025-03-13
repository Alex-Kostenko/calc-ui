import headerBg from "/hero.webp";

const Breadcrumbs = () => {
  return (
    <>
      <div className="absolute top-0 left-0 right-0">
        <div className="relative flex items-center w-full ">
          <div className="absolute inset-0 -z-10  text-white/60 bg-gradient-to-b from-transparent from-40% via-white/90 via-60% to-white"></div>
          <img src={headerBg} className="w-full object-cover -z-20" alt="" />
        </div>
      </div>
      <div className="h-[10vh] sm:h-[20vh] md:h-[25vh] xl:h-[50vh]"></div>
    </>
  );
};

export default Breadcrumbs;
