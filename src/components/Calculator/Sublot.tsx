import { useAppDispatch } from "@/hooks";
import { setAll } from "@/store/slices/total.slice";
import { Checkbox, CheckboxProps } from "antd";

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
    <div>
      <Checkbox onChange={handleChange}>Sublot</Checkbox>
    </div>
  );
};

export default Sublot;
