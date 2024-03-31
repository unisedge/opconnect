import { NextResponse } from "next/server";
import { auth } from "./auth";

import {
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT,
  studentRoutes,
  adminRoutes,
  mentorRoutes,
} from "./routes";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.role;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  // const isStudentRoute = studentRoutes.includes(nextUrl.pathname);
  // const isAdminRoute = adminRoutes.includes(nextUrl.pathname);
  // const isMentorRoute = mentorRoutes.includes(nextUrl.pathname);
  const isAdminRoute = nextUrl.pathname.startsWith(adminRoutes);
  const isStudentRoute = nextUrl.pathname.startsWith(studentRoutes);
  const isMentorRoute = nextUrl.pathname.startsWith(mentorRoutes);
  let directTo: string;
  if (isLoggedIn) {
    if (role == "ADMIN") directTo = "/admin";
    else if (role == "MENTOR") directTo = "/mentor";
    else if (role == "STUDENT") directTo = "/student";
  }
  if (isApiAuthRoute) {
    return null;
  }
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(directTo!, nextUrl));
    }
    return null;
  }
  if (isAdminRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    } else if (role !== "ADMIN") {
      return NextResponse.redirect(new URL(directTo!, nextUrl));
    }
    return null;
  }
  if (isMentorRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    } else if (role !== "MENTOR") {
      return NextResponse.redirect(new URL(directTo!, nextUrl));
    }
    return null;
  }
  if (isStudentRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    } else if (role !== "STUDENT") {
      return NextResponse.redirect(new URL(directTo!, nextUrl));
    }
  }
  // if (!isLoggedIn && !isPublicRoute) {

  //   let callBackUrl = nextUrl.pathname;
  //   if (nextUrl.search) {
  //     callBackUrl += nextUrl.search;
  //   }

  //   const encodedCallbackUrl = encodeURIComponent(callBackUrl);
  //   return Response.redirect(
  //     new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
  //   );
  // }
  return null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
