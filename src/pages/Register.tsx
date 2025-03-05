import { useEffect } from "react";

const Register = () => {
  useEffect(() => {
    document.querySelector("body")?.classList.add("overflow-hidden");
    return () => {
      document.querySelector("body")?.classList.remove("overflow-hidden");
    };
  }, []);
  return (
    <div className="flex flex-1 container justify-center items-center text-4xl h-full mx-auto">
      <p>
        Для реєстрації зверніться в{" "}
        <a
          href="https://t.me/Fxci_t"
          className="underline hover:text-blue-500 transition-colors"
        >
          Telegram
        </a>
      </p>
    </div>
  );
};

export default Register;
