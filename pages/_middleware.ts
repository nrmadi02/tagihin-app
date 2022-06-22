import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { pathname, origin } = req.nextUrl
  const dataUser = parseJwt(req.cookies.token)
  if(pathname.includes("/dashboard")){
    if (dataUser == null){
      console.log("return auth")
      return NextResponse.rewrite(`${origin}/auth`)
    }
    if (Date.now() >= dataUser.ExpiresAt * 1000) {
      console.log("expired token")
      return NextResponse.rewrite(`${origin}/auth`)
    } else {
      console.log("token active")
      return NextResponse.next();
    }
  }
  
  return NextResponse.next();
}

