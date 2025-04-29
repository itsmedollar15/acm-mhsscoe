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
                width="50"
                height="50"
              />
              <Text style={styles.brandingText}>MHSSCOE - ACM</Text>
            </Column>
          </Link>
        </Section>
        <Section style={styles.content}>
          <Row>
            <Text style={styles.subtitle}>Hey {name},</Text>
            <Text style={styles.paragraph}>
              Thank you for choosing MHSSCOE-ACM. You&apos;re almost there, ready to
              embark on an incredible journey with us. To ensure the security of
              your email address, we kindly request you to verify it using the
              following one-time password (OTP):
            </Text>
            <Text style={styles.otp}>OTP: {otp}</Text>
            <Text style={styles.paragraph}>
              Please note that this OTP is valid for the next {validity} minutes
              till{" "}
              {new Date(Date.now() + validity * 60 * 1000).toLocaleTimeString()}
              .
            </Text>
            <Text style={styles.paragraph}>
              If you didn&apos;t sign up for our service, no worries! You can safely
              ignore this email.
            </Text>
            <Text style={styles.paragraph}>
              Best regards,
              <br />
              Team MHSSCOE-ACM
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
    backgroundColor: "#ffffff",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  },
  header: {
    width: "100%",
    borderBottom: "5px dashed #1A8FC8",
    textAlign: "center",
    fontWeight: "bold",
  },
  column: {
    display: "flex",
  },
  brandingImage: {
    marginLeft: "auto",
    marginRight: "15px"
  },
  brandingText: {
    fontSize: "28px",
    color: "#1A8FC8",
    marginLeft: "15px",
    marginRight: "auto"
  },
  content: {
    padding: "20px 40px",
    backgroundColor: "#ffffff",
  },
  title: {
    textAlign: "center",
    fontSize: "26px",
    fontWeight: "700",
    lineHeight: "1.3",
    color: "#1677ff",
  },
  subtitle: {
    fontSize: "20px",
    fontWeight: "bold",
    lineHeight: "1.4",
    color: "#484848 !important",
    textDecoration: "none",
  },
  paragraph: {
    fontSize: "16px",
    lineHeight: "1.4",
    color: "#484848",
  },
  otp: {
    fontSize: "20px",
    fontWeight: "700",
    lineHeight: "1.3",
    color: "#484848",
  },
  // button: {
  //   boxShadow: "0 2px 0 rgba(172, 5, 255, 0.06)",
  //   backgroundColor: "#8a2be2",
  //   borderRadius: "6px",
  //   color: "#ffffff",
  //   fontSize: "18px",
  //   textDecoration: "none",
  //   display: "block",
  // },
};
