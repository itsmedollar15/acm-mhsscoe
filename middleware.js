import { NextResponse } from "next/server";
import UserService from "./services/user";
import { ROLES } from "./constants/roles";
import jwt from "jsonwebtoken";

export async function middleware(req) {
  let isLoggedIn = false;
  const token = req.cookies.get("token")?.value;
  
  // Add better token validation
  if (!token) {
    if (pathname.includes("/myaccount") || pathname.includes("/admin")) {
      return NextResponse.redirect(new URL("/login", origin));
    }
    return NextResponse.next();
  }

  try {
    // Verify token first
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { _id: userId } = decoded;
    isLoggedIn = true;

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
        try {
          const { role } = await UserService.getUserRole(userId);
          
          // Add role validation
          if (!role) {
            console.error('No role found for user:', userId);
            return NextResponse.redirect(new URL("/login", origin));
          }

          switch (pathname) {
            case "/admin": {
              if (
                [
                  ROLES.SUPER_ADMIN,
                  ROLES.ADMIN,
                  ROLES.MANAGE_USERS,
                  ROLES.USER_PROFILE,
                ].includes(role)
              ) {
                return NextResponse.redirect(new URL("/admin/users", origin));
              }
              if ([ROLES.MANAGE_EVENTS].includes(role)) {
                return NextResponse.redirect(new URL("/admin/events", origin));
              }
              if ([ROLES.MANAGE_TEAMS].includes(role)) {
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
        } catch (error) {
          console.error('Role verification error:', error);
          return NextResponse.redirect(new URL("/login", origin));
        }
      }
    }
  } catch (error) {
    console.error('Token verification error:', error);
    if (pathname.includes("/myaccount") || pathname.includes("/admin")) {
      return NextResponse.redirect(new URL("/login", origin));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
