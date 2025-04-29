"use client";
import Glassmorphism from "@/components/common/glassmorphism";
import { Button, Form, Input, message as showMessage } from "antd";
import React from "react";
import { useForm } from "antd/es/form/Form";
import UserService from "@/services/user";
import Link from "next/link";
import { MailOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const ResetPasswordPage = () => {
  const [form] = useForm();
  const router = useRouter();

  const onFormSubmit = (fields) => {
    const { email } = fields;

    UserService.getPasswordResetMail(email)
      .then((message) => {
        showMessage.success(message);
        router.replace("/login");
      })
      .catch((message) => showMessage.error(message));
  };

  return (
    <div className="h-[calc(100vh-64px-40px)] flex justify-center items-center">
      <Glassmorphism className="px-8 py-8 w-full max-w-md">
        <Form
          form={form}
          layout="vertical"
          size="large"
          requiredMark={false}
          onFinish={onFormSubmit}
        >
          <h2 className="text-center font-bold text-4xl mb-6">
            Reset Password
          </h2>
          <p className="text-center my-5">
            An email containing the link to reset your password will be sent on
            following email address
          </p>
          <Form.Item
            name="email"
            label="Email Address:"
            rules={[
              {
                validator: (_, value) => {
                  if (!value) return Promise.reject("Email required");
                  if (!value.endsWith("@mhssce.ac.in"))
                    return Promise.reject(
                      "Please enter a valid college domain email"
                    );
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input
              placeholder="College Email address (@mhssce.ac.in)"
              prefix={<MailOutlined />}
              size="large"
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Reset Password
          </Button>
          <p className="text-center my-3">
            <Link href="/login">Back to Login</Link>
          </p>
        </Form>
      </Glassmorphism>
    </div>
  );
};

export default ResetPasswordPage;
