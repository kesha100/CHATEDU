import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { inter, lexendDeca } from "@/app/[locale]/fonts";
import HydrogenLayout from "@/layouts/hydrogen/layout";
import GlobalDrawer from "@/app/[locale]/shared/admin/drawer-views/container";
import GlobalModal from "@/app/[locale]/shared/modal-views/container";
import { cn } from "@/utils/class-names";
import "@/app/[locale]/globals.css";
import SessionWrapper from "@/app/[locale]/SessionWrapper";
import StoreProvider from "../lib/store/ReduxProvider";

export const metadata: Metadata = {
  title: "Chat Edu",
  description: "Write your app description",
};

export default function RootLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  console.log(locale + 'ad')
  return (
    <html
      // 💡 Prevent next-themes hydration warning
      suppressHydrationWarning

    >
      <body
        // 💡 Prevent hydration warnings caused by third-party extensions, such as Grammarly.
        suppressHydrationWarning
        className={cn(inter.variable, lexendDeca.variable, "font-inter")}
      >
      <SessionWrapper>
        <StoreProvider>
          <ThemeProvider>
            <HydrogenLayout locale={locale}>
                {children}
            </HydrogenLayout>
            <GlobalDrawer />
            <GlobalModal />
          </ThemeProvider>
        </StoreProvider>
      </SessionWrapper>
      </body>
    </html>
  );
}
