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
    <div className="min-h-[calc(100vh-64px-40px)] flex justify-center items-center px-4">
      <Glassmorphism className="p-8 w-full max-w-md rounded-2xl shadow-lg">
        <Form
          form={form}
          layout="vertical"
          size="large"
          requiredMark={false}
          onFinish={onFormSubmit}
        >
          <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
            Reset Password
          </h2>
          <p className="mt-6 mb-8 text-center text-gray-600">
            An email containing the link to reset your password will be sent to
            the following email address
          </p>
          <Form.Item
            name="email"
            label={<span className="font-medium text-gray-700">Email Address</span>}
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
              prefix={<MailOutlined className="text-gray-400" />}
              className="rounded-xl border-gray-200 transition-colors hover:border-blue-400 focus:border-blue-500"
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            className="h-12 mt-6 text-base font-medium rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md"
          >
            Reset Password
          </Button>
          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="text-blue-600 transition-colors hover:text-blue-800"
            >
              Back to Login
            </Link>
          </div>
        </Form>
      </Glassmorphism>
    </div>
  );
};

export default ResetPasswordPage;
