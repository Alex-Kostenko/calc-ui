import LoginForm from "@/components/LoginForm";
import { useEffect } from "react";

const Login = () => {
  useEffect(() => {
    document.querySelector("body")?.classList.add("overflow-hidden");
    return () => {
      document.querySelector("body")?.classList.remove("overflow-hidden");
    };
  }, []);
  return (
    <div className="flex items-center justify-center flex-1">
      <LoginForm />
    </div>
  );
};

export default Login;
