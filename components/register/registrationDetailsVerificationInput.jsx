const { LockOutlined } = require("@ant-design/icons");
const { Button, Form, Input } = require("antd");

const RegistrationDetailsVerificationInput = ({
  email,
  resendVerificationTimer,
  onChangeEmail,
  onResendOTP,
}) => {
  return (
    <>
      <p className="my-5 text-center">
        A 6-digit verification code was sent on <br /> {email}
        <br />
        Incorrect Email ?
        <Button type="link" size="small" onClick={onChangeEmail}>
          Change
        </Button>
      </p>

      <Form.Item name="otp" label="OTP Verification:" className="!mb-2">
        <Input
          placeholder="Enter 6-digit verification code"
          prefix={<LockOutlined />}
          size="large"
        />
      </Form.Item>
      <div className="my-5 mt-0 text-center">
        {resendVerificationTimer ? (
          <p>Resend OTP in {resendVerificationTimer}s</p>
        ) : (
          <Button type="link" size="small" onClick={() => onResendOTP(email)}>
            Resend OTP
          </Button>
        )}
      </div>
    </>
  );
};

export default RegistrationDetailsVerificationInput;
