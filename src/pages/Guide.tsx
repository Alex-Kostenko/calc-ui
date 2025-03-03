import { Container } from "@/components";
import Markdown, { Components } from "react-markdown";

import mkd from "../../README.md?raw";

const components: Components = {
  h1(props) {
    const { node, ...rest } = props;
    return <h1 {...rest} className="text-2xl text-center font-bold"></h1>;
  },
  h2(props) {
    const { node, ...rest } = props;
    return <h2 {...rest} className="text-xl text-center font-bold mb-2"></h2>;
  },
  ol(props) {
    const { node, ...rest } = props;
    return <ol {...rest} className="list-decimal list-inside"></ol>;
  },
  code(props) {
    const { node, ...rest } = props;
    return (
      <code className="bg-gray-600 text-gray-200 px-1 rounded" {...rest}></code>
    );
  },
  pre(props) {
    const { node, ...rest } = props;
    return (
      <pre
        {...rest}
        className="bg-gray-600 text-gray-200 px-1 rounded py-4 my-1"
      ></pre>
    );
  },
};

export default function Guide() {
  return (
    <Container className="my-20">
      <Markdown components={components}>{mkd}</Markdown>
    </Container>
  );
}
