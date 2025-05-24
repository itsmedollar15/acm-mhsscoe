"use client";

import Glassmorphism from "@/components/common/glassmorphism";
import { Button, Form, Input, message as showMessage } from "antd";
import React from "react";
import { useForm } from "antd/es/form/Form";
import { Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import UserService from "@/services/user";

const RegisterPage = () => {
  const [form] = useForm();
  const router = useRouter();

  const onFormSubmit = (fields) => {
    const { email } = fields;

    UserService.register(email)
      .then((message) => {
        showMessage.success(message);
        router.replace("/login");
      })
      .catch((message) => showMessage.error(message));
  };

  return (
    <div className="min-h-screen">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-[0.02]" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230ea5e9' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="flex relative justify-center items-center px-4 py-12 min-h-screen">
        <div className="space-y-8 w-full max-w-md">
          <Glassmorphism className="p-10 rounded-3xl shadow-2xl backdrop-blur-sm bg-white/90 border-white/20">
            <Form
              form={form}
              layout="vertical"
              size="large"
              requiredMark={false}
              onFinish={onFormSubmit}
            >
              {/* Enhanced Logo and Header */}
              <div className="mb-10 space-y-4 text-center">
                <div className="relative mx-auto w-24 h-24 transition-transform duration-300 transform hover:scale-105">
                  <Image
                    src="/logo.png"
                    alt="ACM Logo"
                    fill
                    className="object-contain drop-shadow-md"
                    priority
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                    Registration
                  </h2>
                  <p className="mx-auto mt-2 max-w-sm text-sm text-gray-600">
                    A verification email will be sent to complete your registration
                  </p>
                </div>
              </div>

              {/* Enhanced Form Fields */}
              <div className="space-y-6">
                <Form.Item
                  name="email"
                  label={<span className="font-medium text-gray-700">Email Address</span>}
                  rules={[
                    { required: true, message: "Please input your email!" },
                    { type: "email", message: "Please enter a valid email!" }
                  ]}
                >
                  <Input
                    placeholder="College Email address (@mhssce.ac.in)"
                    prefix={<Mail className="w-5 h-5 text-gray-400" />}
                    className="h-12 rounded-xl border-gray-200 shadow-sm transition-all focus:ring-2 focus:ring-blue-500 hover:border-blue-400"
                  />
                </Form.Item>
              </div>

              {/* Enhanced Button */}
              <Button
                type="primary"
                htmlType="submit"
                block
                className="mt-8 h-12 text-base font-semibold text-white bg-blue-600 rounded-xl transition-all hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Get Verification Email
              </Button>

              <p className="mt-8 text-sm text-center text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-blue-600 transition-colors hover:text-blue-500"
                >
                  Login
                </Link>
              </p>
            </Form>
          </Glassmorphism>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
