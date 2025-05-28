"use client";
import Glassmorphism from "@/components/common/glassmorphism";
import { Button, Form, Input, message as showMessage } from "antd";
import React, { useState } from "react";
import { useForm } from "antd/es/form/Form";
import UserService from "@/services/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LockOutlined } from "@ant-design/icons";

const RegistrationFinishPage = ({ params: { token } }) => {
  const router = useRouter();
  const [form] = useForm();

  const onFormSubmit = (fields) => {
    const { password } = fields;
    UserService.resetPassword(password, token)
      .then((message) => {
        showMessage.success(message);
        router.replace("/login");
      })
      .catch((message) => showMessage.error(message));
  };

  return (
    <div className="min-h-[calc(100vh-64px-40px)] flex justify-center items-center p-4 bg-gradient-to-br from-transparent to-transparent via-opacity-5">
      <Glassmorphism className="px-8 py-12 w-full max-w-md rounded-2xl shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-xl">
        <Form
          form={form}
          layout="vertical"
          size="large"
          requiredMark={false}
          onFinish={onFormSubmit}
          className="space-y-6"
        >
          <h2 className="mb-8 text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Set New Password
          </h2>
          <Form.Item 
            name="password" 
            label={<span className="text-lg font-medium">Password:</span>}
            rules={[{ required: true, message: 'Please enter your new password' }]}
          >
            <Input.Password
              placeholder="Enter Password"
              prefix={<LockOutlined className="text-gray-400" />}
              size="large"
              className="rounded-lg"
            />
          </Form.Item>

          <Button 
            type="primary" 
            htmlType="submit" 
            block
            size="large"
            className="mt-6 h-12 text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
          >
            Save Password
          </Button>
          <div className="mt-6 text-center">
            <Link 
              href="/login" 
              className="text-lg font-medium text-blue-600 transition-colors duration-300 hover:text-blue-800"
            >
              Back to Login
            </Link>
          </div>
        </Form>
      </Glassmorphism>
    </div>
  );
};

export default RegistrationFinishPage;
