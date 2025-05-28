"use client";

import Glassmorphism from "@/components/common/glassmorphism";
import { Button, Form, Input, message as showMessage } from "antd";
import React from "react";
import { useForm } from "antd/es/form/Form";
import UserService from "@/services/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LockOutlined } from "@ant-design/icons";
import Image from "next/image";

const RegistrationFinishPage = ({ params: { token } }) => {
  const router = useRouter();
  const [form] = useForm();

  const onFormSubmit = (fields) => {
    const { password } = fields;
    UserService.registerUser(password, token)
      .then((message) => {
        showMessage.success(message);
        router.replace("/myaccount");
      })
      .catch((message) => showMessage.error(message));
  };

  return (
    <div className="min-h-screen">
      <div className="flex relative justify-center items-center px-4 py-12 min-h-screen">
        <div className="w-full max-w-md">
          <Glassmorphism className="p-10 rounded-2xl shadow-xl backdrop-blur-sm transition-all duration-300 bg-white/95 border-white/20 hover:shadow-2xl">
            <Form
              form={form}
              layout="vertical"
              size="large"
              requiredMark={false}
              onFinish={onFormSubmit}
            >
              <div className="mb-10 space-y-4 text-center">
                <div className="relative mx-auto w-20 h-20 transition-transform duration-300 transform hover:scale-110">
                  <Image
                    src="/logo.png"
                    alt="ACM Logo"
                    fill
                    className="object-contain drop-shadow-lg"
                    priority
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-blue-600">
                    Set Your Password
                  </h2>
                  <p className="mt-2 text-sm text-gray-600">
                    Create a secure password for your account
                  </p>
                </div>
              </div>

              <Form.Item
                name="password"
                label={
                  <span className="font-medium text-gray-700">Password</span>
                }
                rules={[
                  { required: true, message: "Please input your password!" },
                  { min: 6, message: "Password must be at least 6 characters" },
                ]}
              >
                <Input.Password
                  placeholder="Enter your password"
                  prefix={<LockOutlined className="text-gray-400" />}
                  className="h-11 rounded-xl border-gray-200 shadow-sm transition-all focus:ring-2 focus:ring-blue-500 hover:border-blue-400"
                />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label={
                  <span className="font-medium text-gray-700">
                    Confirm Password
                  </span>
                }
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Please confirm your password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject("The passwords do not match!");
                    },
                  }),
                ]}
              >
                <Input.Password
                  placeholder="Confirm your password"
                  prefix={<LockOutlined className="text-gray-400" />}
                  className="h-11 rounded-xl border-gray-200 shadow-sm transition-all focus:ring-2 focus:ring-blue-500 hover:border-blue-400"
                />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                block
                className="mt-8 h-11 text-base font-semibold text-white bg-blue-600 rounded-xl border-0 transition-all hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Complete Registration
              </Button>

              <p className="mt-6 text-sm text-center text-gray-600">
                <Link
                  href="/register"
                  className="font-medium text-blue-600 transition-colors hover:text-blue-500"
                >
                  Back to registration
                </Link>
              </p>
            </Form>
          </Glassmorphism>
        </div>
      </div>
    </div>
  );
};

export default RegistrationFinishPage;
