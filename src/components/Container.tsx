import { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"section">;

const Container = ({ className, children, ...rest }: Props) => {
  return (
    <section
      className={
        "container px-4 sm:px-0 mx-auto flex flex-col gap-5 " + className
      }
      {...rest}
    >
      {children}
    </section>
  );
};

export default Container;
