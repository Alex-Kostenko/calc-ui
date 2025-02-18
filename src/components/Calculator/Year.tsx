import { Select } from "antd";
import Container from "../Container";

const Year = () => {
  const selectLength = new Date().getFullYear() - 1990;

  return (
    <Container>
      <h3>Year:</h3>
      <Select
        options={Array.from({ length: selectLength })
          .map((_, i) => ({
            title: String(1990 + i),
            value: 1990 + i,
          }))
          .reverse()}
      />
    </Container>
  );
};

export default Year;
