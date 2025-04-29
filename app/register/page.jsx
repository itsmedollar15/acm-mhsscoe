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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '30px 30px'
      }}></div>

      <div className="relative flex items-center justify-center min-h-screen px-4 py-12">
        <div className="w-full max-w-md">
          <Glassmorphism className="p-8 border shadow-lg rounded-2xl backdrop-blur-xl bg-white/90 border-white/20">
            <Form
              form={form}
              layout="vertical"
              size="large"
              requiredMark={false}
              onFinish={onFormSubmit}
            >
              {/* Logo and Header */}
              <div className="mb-8 text-center">
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <Image
                    src="/logo.png"
                    alt="ACM Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <h2 className="mb-2 text-2xl font-bold text-gray-900">
                  Registration
                </h2>
                <p className="text-sm text-gray-600">
                  A verification email will be sent on your email address to complete your registration
                </p>
              </div>

              {/* Email Input */}
              <Form.Item
                name="email"
                label="Email Address"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Please enter a valid email!" }
                ]}
              >
                <Input
                  placeholder="College Email address (@mhssce.ac.in)"
                  prefix={<Mail className="w-5 h-5 text-gray-400" />}
                  size="large"
                  className="transition-all border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 hover:border-blue-400"
                />
              </Form.Item>

              {/* Submit Button */}
              <Button
                type="primary"
                htmlType="submit"
                block
                className="h-12 mt-6 text-base font-medium text-white transition-all bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
              >
                Get Verification Email
              </Button>

              {/* Login Link */}
              <p className="mt-6 text-sm text-center text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-blue-600 hover:text-blue-500"
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
