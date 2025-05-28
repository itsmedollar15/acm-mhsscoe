import jwt from "jsonwebtoken";

export const checkAuth = async (cookies) => {
  try {
    if (cookies.cookies) cookies = cookies.cookies;
    const token = cookies.get("token")?.value;
    if (!token) return null;

    let { _id } = jwt.verify(token, process.env.JWT_SECRET);
    return _id;
  } catch (error) {
    return null;
  }
};

export const getFilteredLinksByRole = (links, role) => {
  if (!links || !role) return [];

  return links
    .filter((link) => {
      // If no roles specified, show to all
      if (!link.roles) return true;
      // If roles specified, check if user role is included
      return link.roles.includes(role);
    })
    .map((link) => ({
      key: link.path,
      label: link.label,
      icon: link.icon,
      onClick: link.onClick,
      children: link.children
        ? getFilteredLinksByRole(link.children, role)
        : undefined,
    }));
};
