import { useAppDispatch } from "@/hooks";
import { setAll } from "@/store/slices/total.slice";
import { Checkbox, CheckboxProps } from "antd";
import Container from "../Container";

const Sublot = () => {
  const dispatch = useAppDispatch();
  const handleChange: CheckboxProps["onChange"] = (e) => {
    dispatch(
      setAll({
        isSublot: e.target.checked,
      })
    );
  };
  return (
    <Container>
      <Checkbox onChange={handleChange}>
        <p className="text-lg">Sublot</p>
      </Checkbox>
    </Container>
  );
};

export default Sublot;
