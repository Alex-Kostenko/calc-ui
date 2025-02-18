import { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"section">;

const Container = ({ className, children, ...rest }: Props) => {
  return (
    <section
      className={"container mx-auto flex flex-col gap-5 " + className}
      {...rest}
    >
      {children}
    </section>
  );
};

export default Container;
