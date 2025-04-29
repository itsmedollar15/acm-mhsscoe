export const getDetailsFromEmail = (email) => {
  const user = email.split("@")[0].split(".");
  if (user.length < 3) throw new Error("Invalid Student Email address");
  const name = user[0][0].toUpperCase() + user[0].slice(1);
  const rollno = user[1];
  const branch = user[2];
  return { name, rollno, branch };
};
