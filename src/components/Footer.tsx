const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-main-blue text-white p-12 text-center">
      &copy; {year}. Made by{" "}
      <a href="https://unicode.software">Unicode.Software</a>
    </footer>
  );
};

export default Footer;
