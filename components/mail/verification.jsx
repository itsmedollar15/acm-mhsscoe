import {
  Body,
  Column,
  Head,
  Html,
  Link,
  Row,
  Section,
  Text,
  Img,
} from "@react-email/components";
import { render } from "@react-email/render";

export const MailVerification = ({ name, otp, validity }) => {
  return render(
    <Html>
      <Head />
      <Body style={styles.main}>
        <Section style={styles.header}>
          <Link href={process.env.CLIENT_URL}>
            <Column style={styles.column}>
              <Img
                style={styles.brandingImage}
                src={process.env.CLIENT_URL + "/logo.png"}
                alt="ACM"
                width="60"
                height="60"
              />
              <Text style={styles.brandingText}>MHSSCOE - ACM</Text>
            </Column>
          </Link>
        </Section>
        <Section style={styles.content}>
          <Row>
            <Text style={styles.greeting}>Welcome, {name}! 👋</Text>
            <Text style={styles.paragraph}>
              We&apos;re excited to have you join the MHSSCOE-ACM community! To
              get started with your journey, please verify your email address
              using the following verification code:
            </Text>
            <Text style={styles.otpContainer}>
              <span style={styles.otpLabel}>Your Verification Code</span>
              <span style={styles.otp}>{otp}</span>
            </Text>
            <Text style={styles.validityInfo}>
              ⏰ This code expires in {validity} minutes (at{" "}
              {new Date(Date.now() + validity * 60 * 1000).toLocaleTimeString()}
              )
            </Text>
            <Text style={styles.securityNote}>
              🔒 For your security: Never share this code with anyone. Our team
              will never ask for it.
            </Text>
            <Text style={styles.footer}>
              Best regards,
              <br />
              <span style={styles.teamSignature}>Team MHSSCOE-ACM</span>
            </Text>
          </Row>
        </Section>
      </Body>
    </Html>
  );
};

export default MailVerification;

const styles = {
  main: {
    backgroundColor: "#f8fafc",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
    padding: "20px 0",
  },
  header: {
    width: "100%",
    borderBottom: "5px solid #1A8FC8",
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "10px 10px 0 0",
    textAlign: "center",
  },
  column: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "15px",
  },
  brandingImage: {
    borderRadius: "10px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  brandingText: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#1A8FC8",
    margin: "0",
  },
  content: {
    padding: "30px 40px",
    backgroundColor: "#ffffff",
    borderRadius: "0 0 10px 10px",
  },
  greeting: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: "20px",
  },
  paragraph: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#4b5563",
    marginBottom: "25px",
  },
  otpContainer: {
    textAlign: "center",
    backgroundColor: "#f3f4f6",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "25px",
  },
  otpLabel: {
    display: "block",
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "10px",
  },
  otp: {
    display: "block",
    fontSize: "32px",
    fontWeight: "700",
    color: "#1A8FC8",
    letterSpacing: "8px",
  },
  validityInfo: {
    fontSize: "14px",
    color: "#ef4444",
    marginBottom: "20px",
  },
  securityNote: {
    fontSize: "14px",
    color: "#6b7280",
    backgroundColor: "#fff9db",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "30px",
  },
  footer: {
    fontSize: "16px",
    color: "#4b5563",
    borderTop: "1px solid #e5e7eb",
    paddingTop: "20px",
  },
  teamSignature: {
    color: "#1A8FC8",
    fontWeight: "600",
  },
};
