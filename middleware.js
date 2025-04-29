import { NextResponse } from "next/server";
import UserService from "./services/user";
import { ROLES } from "./constants/roles";
import jwt from "jsonwebtoken";

export async function middleware(req) {
  // if (1 == 1) return NextResponse.next();

  let isLoggedIn = false;
  const token = req.cookies.get("token")?.value;
  const { _id: userId } = token ? jwt.decode(token) : { _id: null };
  isLoggedIn = userId ? true : false;

  const { origin, pathname } = req.nextUrl;

  if (pathname === "/not-found") return NextResponse.next();

  if (isLoggedIn) {
    if (
      pathname === "/login" ||
      pathname.includes("/register") ||
      pathname.includes("/resetPassword")
    ) {
      return NextResponse.redirect(new URL("/myaccount", origin));
    }

    if (pathname === "/myaccount") {
      return NextResponse.redirect(
        new URL("/myaccount/update-profile", origin)
      );
    }

    if (pathname.includes("/admin")) {
      let userRole;
      try {
        const { role } = await UserService.getUserRole(userId);
        userRole = role;
      } catch (error) {
        return NextResponse.redirect(new URL("/not-found", origin));
      }

      switch (pathname) {
        case "/admin": {
          if (
            [
              ROLES.SUPER_ADMIN,
              ROLES.ADMIN,
              ROLES.MANAGE_USERS,
              ROLES.USER_PROFILE,
            ].includes(userRole)
          ) {
            return NextResponse.redirect(new URL("/admin/users", origin));
          }
          if ([ROLES.MANAGE_EVENTS].includes(userRole)) {
            return NextResponse.redirect(new URL("/admin/events", origin));
          }
          if ([ROLES.MANAGE_TEAMS].includes(userRole)) {
            return NextResponse.redirect(new URL("/admin/teams", origin));
          }
          return NextResponse.redirect(new URL("/not-found", origin));
        }

        case "/admin/events": {
          if (
            ![ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGE_EVENTS].includes(
              userRole
            )
          )
            return NextResponse.redirect(new URL("/not-found", origin));
          break;
        }

        case "/admin/teams": {
          if (
            ![ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGE_TEAMS].includes(
              userRole
            )
          )
            return NextResponse.redirect(new URL("/not-found", origin));
          break;
        }

        case "/admin/users": {
          if (
            ![
              ROLES.SUPER_ADMIN,
              ROLES.ADMIN,
              ROLES.MANAGE_USERS,
              ROLES.USER_PROFILE,
            ].includes(userRole)
          )
            return NextResponse.redirect(new URL("/not-found", origin));
          break;
        }

        default:
          break;
      }
    }
  } else {
    if (pathname.includes("/myaccount") || pathname.includes("/admin")) {
      return NextResponse.redirect(new URL("/login", origin));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
