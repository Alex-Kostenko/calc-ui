const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-main-blue text-white p-12 text-center">
      &copy; {year}. calculator.online
    </footer>
  );
};

export default Footer;
