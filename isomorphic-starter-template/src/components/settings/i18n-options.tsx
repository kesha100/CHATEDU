"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useTransition } from "react";
import cn from "@/utils/class-names";
import DrawerBlock from "@/components/settings/drawer-block";
import { locales } from "@/i18n";

export default function I18nOptions() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <DrawerBlock title="Language">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {locales.map((locale) => (
          <div
            key={locale}
            className="flex flex-col items-center justify-center gap-1"
          >
            <button
              title={locale}
              onClick={(e) => {
                console.log("locale", locale);
                startTransition(() => {
                  router.replace(`/${locale}`);
                });
                // setColorPresets(preset?.colors);
                // setColorPresetName(preset?.user.toLowerCase());
              }}
              className={cn(
                "grid h-auto w-full place-content-center gap-2 rounded-lg border-2 border-transparent py-1.5 shadow-sm transition duration-300 focus-visible:outline-none",
                "ring-2 ring-primary ring-offset-2 dark:ring-offset-gray-100"
              )}
            >
              <span className={"font-medium"}>{locale}</span>
            </button>
          </div>
        ))}
      </div>
    </DrawerBlock>
  );
}
