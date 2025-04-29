export default (conditions = {}, status = {}) => {
  const { isLoggedIn, role: currRole } = status;

  let hasAccess = true;
  Object.keys(conditions).forEach((condition) => {
    switch (condition) {
      case "requireLoggedIn":
        hasAccess = isLoggedIn;
        break;
      case "requireLoggedOut":
        hasAccess = !isLoggedIn;
        break;
      case "requiredRole":
        hasAccess = conditions["requiredRole"].includes(currRole);
        break;
      default:
        break;
    }
  });

  return hasAccess;
};
