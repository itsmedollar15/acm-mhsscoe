import Mailjet from "node-mailjet";

export const sendVerificationMail = async (
  name,
  email,
  confirmation_link,
  task
) => {
  try {
    const mailjet = Mailjet.apiConnect(
      process.env.MJ_API_KEY,
      process.env.MJ_API_SECRET
    );

    await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: { Email: "acm.office@mhssce.ac.in", Name: "ACM OFFICE" },
          To: [{ Email: email, Name: name }],
          TemplateID:
            task === "registration"
              ? Number(process.env.MJ_TEMPLATE_EMAIL_VERIFICATION)
              : Number(process.env.MJ_TEMPLATE_PASSWORD_RESET),
          TemplateLanguage: true,
          Subject:
            task === "registration"
              ? "Verify your email address to create your account"
              : "Resetting Password for your account",
          Variables: {
            name: name,
            confirmation_link: confirmation_link,
          },
        },
      ],
    });
  } catch (error) {
    throw error;
  }
};
