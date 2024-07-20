import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from 'next-intl/middleware';

// CORS Options
// const corsOptions: {
//   allowedMethods: string[];
//   allowedOrigins: string[];
//   allowedHeaders: string[];
//   exposedHeaders: string[];
//   maxAge?: number;
//   credentials: boolean;
// } = {
//   allowedMethods: (process.env?.ALLOWED_METHODS || "").split(","),
//   allowedOrigins: (process.env?.ALLOWED_ORIGIN || "").split(","),
//   allowedHeaders: (process.env?.ALLOWED_HEADERS || "").split(","),
//   exposedHeaders: (process.env?.EXPOSED_HEADERS || "").split(","),
//   maxAge: process.env?.MAX_AGE && parseInt(process.env?.MAX_AGE) || undefined,
//   credentials: process.env?.CREDENTIALS == "true",
// };
//
// // CORS Middleware
// export async function corsMiddleware(request: NextRequest) {
//   const response = NextResponse.next();
//
//   const origin = request.headers.get('origin') ?? '';
//   if (corsOptions.allowedOrigins.includes('*') || corsOptions.allowedOrigins.includes(origin)) {
//     response.headers.set('Access-Control-Allow-Origin', origin);
//   }
//
//   response.headers.set("Access-Control-Allow-Credentials", corsOptions.credentials.toString());
//   response.headers.set("Access-Control-Allow-Methods", corsOptions.allowedMethods.join(","));
//   response.headers.set("Access-Control-Allow-Headers", corsOptions.allowedHeaders.join(","));
//   response.headers.set("Access-Control-Expose-Headers", corsOptions.exposedHeaders.join(","));
//   response.headers.set("Access-Control-Max-Age", corsOptions.maxAge?.toString() ?? "");
//
//   return response;
// }

// Internationalization Middleware
const intlMiddleware = createMiddleware({
  locales: ['en', 'cn'],
  defaultLocale: 'en'
});
export default intlMiddleware

// Combining Middleware
// export async function middleware(request: NextRequest) {
//   const corsResponse = await corsMiddleware(request);
//   const intlResponse = await intlMiddleware(request);
//
//   // Return the response from the CORS middleware, as it will contain the necessary headers for CORS.
//   return corsResponse;
// }

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(cn|en)/:path*']
};
