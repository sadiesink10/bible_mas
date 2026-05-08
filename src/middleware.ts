import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Simple middleware that just adds headers, no auth logic
  // Auth is handled at the page/layout level via getServerSession
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|kjv.json).*)"],
};
