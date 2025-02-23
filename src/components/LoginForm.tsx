import { useLoginMutation } from "@/store/api";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [login, { data, isLoading, isSuccess }] = useLoginMutation();

  const navigate = useNavigate();

  type FieldType = {
    email?: string;
    password?: string;
    remember?: string;
  };

  const [rememberMe, setRememberMe] = useState(false);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    setRememberMe(!!values.remember);
    login({ identifier: values.email!, password: values.password! });
  };

  useEffect(() => {
    if (!isLoading && isSuccess && data) {
      const { user, jwt } = data;
      if (user) {
        if (rememberMe) {
          localStorage.setItem("token", jwt);
        }
        sessionStorage.setItem("token", jwt);
        navigate("/");
      }
    }
  }, [isSuccess, data, rememberMe, navigate, isLoading]);

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
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
