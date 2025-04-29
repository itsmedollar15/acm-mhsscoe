import { ROLES } from "@/constants/roles";

export default (currUserRole, targetUserRole) => {
  let roleOptions = [
    { label: "NONE", value: null },
    ...Object.keys(ROLES).map((role) => ({
      label: role.replace("_", " "),
      value: ROLES[role],
    })),
  ];

  roleOptions = roleOptions.map((option) => {
    if (targetUserRole === ROLES.SUPER_ADMIN)
      return {
        ...option,
        disabled: true,
      };

    if (targetUserRole === ROLES.ADMIN && currUserRole !== ROLES.SUPER_ADMIN)
      return {
        ...option,
        disabled: true,
      };

    if (currUserRole === ROLES.SUPER_ADMIN)
      return {
        ...option,
        disabled: [ROLES.SUPER_ADMIN].includes(option.value),
      };

    if (currUserRole === ROLES.ADMIN)
      return {
        ...option,
        disabled: [ROLES.SUPER_ADMIN, ROLES.ADMIN].includes(option.value),
      };

    return { ...option, disabled: true };
  });

  return roleOptions;
};
