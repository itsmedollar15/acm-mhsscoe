import {
  Home,
  Trophy,
  Users,
  BookOpen,
  User,
  QrCode,
  UserCog,
} from "lucide-react";
import { ROLES } from "./roles";
import Link from "next/link";

export const NAVBAR_LINKS = [
  {
    key: "/",
    icon: <Home size={20} />, // Adjust icon size for consistency
    label: <Link href="/">Home</Link>,
  },
  {
    key: "/events",
    icon: <Trophy size={20} />,
    label: <Link href="/events">Events</Link>,
  },
  {
    key: "/teams",
    icon: <Users size={20} />,
    label: <Link href="/teams">Our Team</Link>,
  },
  {
    key: "/magazines",
    icon: <BookOpen size={20} />,
    label: <Link href="/magazines">Magazines</Link>,
  },
];
export const NAVBAR_AUTH_LINKS = [
  {
    key: "/myaccount",
    label: "My Account",
    type: "group",
    children: [
      {
        key: "/myaccount/update-profile",
        icon: <UserCog size={20} />,
        label: <Link href="/myaccount/update-profile">Update Profile</Link>,
      },
      {
        key: "/myaccount/qr-code",
        icon: <QrCode size={20} />,
        label: <Link href="/myaccount/qr-code">QR Code</Link>,
      },
    ],
  },
  {
    key: "/admin",
    label: "Admin",
    type: "group",
    children: [
      {
        key: "/admin/events",
        icon: <Trophy size={20} />,
        label: <Link href="/admin/events">Manage Events</Link>,
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGE_EVENTS],
      },
      {
        key: "/admin/teams",
        icon: <Users size={20} />,
        label: <Link href="/admin/teams">Manage Teams</Link>,
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGE_TEAMS],
      },
      {
        key: "/admin/users",
        icon: <User size={20} />,
        label: <Link href="/admin/users">Manage Users</Link>,
        roles: [
          ROLES.SUPER_ADMIN,
          ROLES.ADMIN,
          ROLES.MANAGE_USERS,
          ROLES.USER_PROFILE,
        ],
      },
    ],
  },
];
