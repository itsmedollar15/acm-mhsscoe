"use client";

const { MailOutlined, LockOutlined } = require("@ant-design/icons");
const { Form, Input } = require("antd");

const RegistrationDetailsInput = () => {
  return (
    <>
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
          placeholder="Email address (@mhssce.ac.in)"
          prefix={<MailOutlined />}
          size="large"
        />
      </Form.Item>
      <Form.Item name="password" label="Password:">
        <Input.Password
          placeholder="Enter Password"
          prefix={<LockOutlined />}
          size="large"
        />
      </Form.Item>
    </>
  );
};

export default RegistrationDetailsInput;
