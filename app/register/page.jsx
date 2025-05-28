"use client";

import Glassmorphism from "@/components/common/glassmorphism";
import { Button, Form, Input, message as showMessage } from "antd";
import React from "react";
import { useForm } from "antd/es/form/Form";
import Link from "next/link";
import { MailOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import UserService from "@/services/user";
import Image from "next/image";

const RegistrationPage = () => {
  const [form] = useForm();
  const router = useRouter();

  const onFormSubmit = (fields) => {
    const { email } = fields;

    UserService.getVerificationMail(email)
      .then((message) => {
        showMessage.success(message);
        router.replace("/login");
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
                    Join ACM Committee
                  </h2>
                  <p className="mt-2 text-sm text-gray-600">
                    A verification email will be sent to complete your
                    registration
                  </p>
                </div>
              </div>

              <Form.Item
                name="email"
                label={
                  <span className="font-medium text-gray-700">
                    Email Address
                  </span>
                }
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
                  className="h-11 rounded-xl border-gray-200 shadow-sm transition-all focus:ring-2 focus:ring-blue-500 hover:border-blue-400"
                />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                block
                className="mt-8 h-11 text-base font-semibold text-white bg-blue-600 rounded-xl border-0 transition-all hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Get Verification Email
              </Button>

              <p className="mt-6 text-sm text-center text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-blue-600 transition-colors hover:text-blue-500"
                >
                  Sign In
                </Link>
              </p>
            </Form>
          </Glassmorphism>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
