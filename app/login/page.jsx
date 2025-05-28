"use client";

import Glassmorphism from "@/components/common/glassmorphism";
import { Button, Form, Input, message as showMessage } from "antd";
import React from "react";
import { useForm } from "antd/es/form/Form";
import { Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import UserService from "@/services/user";

const LoginPage = () => {
  const [form] = useForm();
  const router = useRouter();

  const onFormSubmit = (fields) => {
    const { email, password } = fields;

    UserService.login(email, password)
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
                  <h2 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                    Welcome Back
                  </h2>
                  <p className="mt-2 text-sm text-gray-600">
                    Sign in to your ACM Committee account
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <Form.Item
                  name="email"
                  label={
                    <span className="font-medium text-gray-700">
                      Email Address
                    </span>
                  }
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input
                    placeholder="College Email address (@mhssce.ac.in)"
                    prefix={<Mail className="w-5 h-5 text-gray-400" />}
                    className="h-11 rounded-xl border-gray-200 shadow-sm transition-all focus:ring-2 focus:ring-blue-500 hover:border-blue-400"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  label={
                    <span className="font-medium text-gray-700">Password</span>
                  }
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password
                    placeholder="Enter your password"
                    prefix={<Lock className="w-5 h-5 text-gray-400" />}
                    className="h-11 rounded-xl border-gray-200 shadow-sm transition-all focus:ring-2 focus:ring-blue-500 hover:border-blue-400"
                  />
                </Form.Item>
              </div>

              <div className="flex justify-end mt-2 mb-6">
                <Link
                  href="/resetPassword"
                  className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-500"
                >
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="primary"
                htmlType="submit"
                block
                className="h-11 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl border-0 transition-all hover:from-blue-700 hover:to-blue-900 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in
              </Button>

              <p className="mt-6 text-sm text-center text-gray-600">
                New to ACM Committee?{" "}
                <Link
                  href="/register"
                  className="font-medium text-blue-600 transition-colors hover:text-blue-500"
                >
                  Register Now
                </Link>
              </p>
            </Form>
          </Glassmorphism>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
