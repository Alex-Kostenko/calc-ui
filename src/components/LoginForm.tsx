import { useGetAllUsersQuery } from "@/store/api";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

// const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
//   console.log("Failed:", errorInfo);
// };

const LoginForm: React.FC = () => {
  const { data } = useGetAllUsersQuery();

  const navigate = useNavigate();

  type FieldType = {
    email?: string;
    password?: string;
    remember?: string;
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    //     if (values.remember) {
    //       Object.entries(values).forEach(([key, value]) => {
    //         localStorage.setItem(key, JSON.stringify(value));
    //       });
    //     }
    //
    //     Object.entries(values).forEach(([key, value]) => {
    //       sessionStorage.setItem(key, JSON.stringify(value));
    //     });

    if (
      data?.data.some(
        (user) =>
          user.email === values.email && user.password === values.password
      )
    )
      navigate("/");
  };

  return (
    <div className="border rounded p-4 flex flex-col gap-5">
      <h2 className="text-center text-2xl">Login</h2>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          label={null}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
