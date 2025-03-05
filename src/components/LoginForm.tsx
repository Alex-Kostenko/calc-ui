import { useLoginMutation } from "@/store/api";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, Space } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [login, { data, isLoading, isSuccess, isError }] = useLoginMutation();

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
        } else {
          sessionStorage.setItem("token", jwt);
        }
        navigate("/");
      }
    }
  }, [isSuccess, data, rememberMe, navigate, isLoading]);

  useEffect(() => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
  }, []);

  return (
    <div className="shadow-form sm:mx-0 mx-4 p-[30px] pb-6 rounded-[30px] flex flex-col gap-5 bg-white xl:-translate-y-2/5 md:translate-y-0 ">
      <h2 className="text-center text-2xl">Вхід</h2>
      <Form
        name="basic"
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="on"
      >
        <Form.Item<FieldType>
          label="Пошта"
          name="email"
          rules={[{ required: true, message: "Введіть пошту!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Пароль"
          name="password"
          rules={[{ required: true, message: "Введіть пароль!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          label={null}
          className="w-fit text-nowrap"
        >
          <Checkbox>Запам'ятати мене</Checkbox>
        </Form.Item>

        <Form.Item
          label={null}
          wrapperCol={{ offset: 0, span: 16 }}
          className="flex justify-center"
        >
          <Space className="flex justify-between w-full">
            <Button
              type="link"
              htmlType="button"
              size="large"
              onClick={() => navigate("/register")}
            >
              Реєстрація
            </Button>
            <Button type="primary" htmlType="submit" size="large">
              Вхід
            </Button>
          </Space>
        </Form.Item>
        {isError && (
          <p className="text-red-500 text-center">
            Не правильна пошта та/або пароль
          </p>
        )}
      </Form>
    </div>
  );
};

export default LoginForm;
