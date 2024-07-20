"use client";

import Link from "next/link";
import {Fragment, useEffect, useState} from "react";
import {usePathname } from "next/navigation";
import { Title, Collapse } from "rizzui";
import { cn } from "@/utils/class-names";
import { PiCaretDownBold } from "react-icons/pi";
import SimpleBar from "@/components/ui/simplebar";
import Image from "next/image";
import Logo from "../../../public/imgLogotwo.png"
import { signOut } from "next-auth/react";
import {
  PiBriefcaseDuotone,
  PiFolderUserDuotone,
  PiSignOutBold
} from 'react-icons/pi';
import axios from "axios";
import { apiService } from "@/api.axios/api";

interface MenuItem {
  name: string;
  href?: string;
  icon?: JSX.Element;
  dropdownItems?: MenuItem[];
  onClick?: () => void;
}

interface SurvayPropm{
  survay_id: number,
  name: string
}

export default function Sidebar(
    {
      className,
      locale
    }: {
      className?: string;
      locale:string
    })
{
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [survayData, setSurvayData] = useState<SurvayPropm[]>([])

  useEffect(() => {
    const fetchAuthenticationStatus = async () => {
      try {
        const response = await fetch(`${apiService.defaults.baseURL}api`);
        const data = await response.json();
        setAuthenticated(data.authenticated);
      } catch (error) {
        console.error('Error fetching authentication status:', error);
        setAuthenticated(false);
      }
    };
    fetchAuthenticationStatus();
  }, []);

  useEffect(() => {
    const data = async () => {
      try {
        const res = await axios.get(`${apiService?.defaults?.baseURL}api/survey/all`)
        setSurvayData(res.data)
      }catch (e) {
        console.log(e)
      }
    }
    data()
  }, []);

  const menuItems = (): MenuItem[] => {
    if (authenticated === null || authenticated === false) {
      return [
        {
          name: 'Overview',
        },
        {
          name: 'Sign In',
          href: `/${locale}/auth/sign-in`,
          icon: <PiBriefcaseDuotone />,
        },
        {
          name: 'Sign Up',
          href: `/${locale}/auth/sign-up`,
          icon: <PiBriefcaseDuotone />,
        }

      ];
    } else {
      return [
        {
          name: 'Overview',
        },
        ...survayData.map(el => ({
          name: `${el.survay_id}/Survey`,
          href: `/${locale}/${el.survay_id}/survey/`,
          icon: <PiFolderUserDuotone/>,
        })),
        ...survayData.map(el => ({
          name: `${el.survay_id}/SurveyAdmin`,
          href: `/${locale}/admin/${el.survay_id}/`,
          icon: <PiFolderUserDuotone/>,
        })),

      ];
    }
  };
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed bottom-0 start-0 z-50 h-full w-[270px] border-e-2 border-gray-100 bg-gray 2xl:w-72 dark:bg-gray-100/50",
        className
      )}
    >
      <div className="sticky top-0 z-40 bg-gray-0/10 px-6 pb-5 pt-5 2xl:px-8 2xl:pt-6 dark:bg-gray-100/5">
        <Link
          href={"/"}
          aria-label="Site Logo"
          className="text-gray-800 hover:text-gray-900"
        >
          <Image alt="logo-img" src={Logo} width={130}/>
        </Link>
      </div>

      <SimpleBar className="h-[calc(100%-80px)]">
        <div className="mt-4 pb-3 3xl:mt-6">
          {menuItems().map((item, index) => {
            const isActive = pathname === (item?.href as string);
            const pathnameExistInDropdowns: any = item?.dropdownItems?.filter(
              (dropdownItem) => dropdownItem.href === pathname
            );
            const isDropdownOpen = Boolean(pathnameExistInDropdowns?.length);

            return (
              <Fragment key={item.name + "-" + index}>
                {item?.href ? (
                  <>
                    {item?.dropdownItems ? (
                      <Collapse
                        defaultOpen={isDropdownOpen}
                        header={({ open, toggle }) => (
                          <div
                            onClick={toggle}
                            className={cn(
                              "group relative mx-3 flex cursor-pointer items-center justify-between rounded-md px-3 py-2 font-medium lg:my-1 2xl:mx-5 2xl:my-2",
                              isDropdownOpen
                                ? "before:top-2/5 text-primary before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-primary 2xl:before:-start-5"
                                : "text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-700/90 dark:hover:text-gray-700"
                            )}
                          >
                            <span className="flex items-center">
                              {item?.icon && (
                                <span
                                  className={cn(
                                    "me-2 inline-flex h-5 w-5 items-center justify-center rounded-md [&>svg]:h-[20px] [&>svg]:w-[20px]",
                                    isDropdownOpen
                                      ? "text-primary"
                                      : "text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700"
                                  )}
                                >
                                  {item?.icon}
                                </span>
                              )}
                              {item.name}
                            </span>

                            <PiCaretDownBold
                              strokeWidth={3}
                              className={cn(
                                "h-3.5 w-3.5 -rotate-90 text-gray-500 transition-transform duration-200 rtl:rotate-90",
                                open && "rotate-0 rtl:rotate-0"
                              )}
                            />
                          </div>
                        )}
                      >
                        {item?.dropdownItems?.map((dropdownItem, index) => {
                          const isChildActive =
                            pathname === (dropdownItem?.href as string);

                          return (
                            <Link
                              href={dropdownItem?.href || '#'}
                              key={dropdownItem?.name + index}
                              className={cn(
                                "mx-3.5 mb-0.5 flex items-center justify-between rounded-md px-3.5 py-2 font-medium capitalize last-of-type:mb-1 lg:last-of-type:mb-2 2xl:mx-5",
                                isChildActive
                                  ? "text-primary"
                                  : "text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900"
                              )}
                            >
                              <div className="flex items-center truncate">
                                <span
                                  className={cn(
                                    "me-[18px] ms-1 inline-flex h-1 w-1 rounded-full bg-current transition-all duration-200",
                                    isChildActive
                                      ? "bg-primary ring-[1px] ring-primary"
                                      : "opacity-40"
                                  )}
                                />{" "}
                                <span className="truncate">
                                  {dropdownItem?.name}
                                </span>
                              </div>
                            </Link>
                          );
                        })}
                      </Collapse>
                    ) : (
                      <Link
                        href={item?.href}
                        locale="fr"
                        className={cn(
                          "group relative mx-3 my-0.5 flex items-center justify-between rounded-md px-3 py-2 font-medium capitalize lg:my-1 2xl:mx-5 2xl:my-2",
                          isActive
                            ? "before:top-2/5 text-primary before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-primary 2xl:before:-start-5"
                            : "text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-700/90"
                        )}
                      >
                        <div className="flex items-center truncate">
                          {item?.icon && (
                            <span
                              className={cn(
                                "me-2 inline-flex h-5 w-5 items-center justify-center rounded-md [&>svg]:h-[20px] [&>svg]:w-[20px]",
                                isActive
                                  ? "text-primary"
                                  : "text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700"
                              )}
                            >
                              {item?.icon}
                            </span>
                          )}
                          <span className="truncate">{item.name}</span>
                        </div>
                      </Link>
                    )}
                  </>
                ) : item?.onClick ? (
                    <button
                        onClick={item.onClick}
                        className={cn(
                            "group relative mx-3 my-0.5 flex items-center justify-between rounded-md px-3 py-2 font-medium capitalize lg:my-1 2xl:mx-5 2xl:my-2",
                            isActive
                                ? "before:top-2/5 text-primary before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-primary 2xl:before:-start-5"
                                : "text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-700/90"
                        )}
                    >
                      <div className="flex items-center truncate">
                        {item?.icon && (
                            <span
                                className={cn(
                                    "me-2 inline-flex h-5 w-5 items-center justify-center rounded-md [&>svg]:h-[20px] [&>svg]:w-[20px]",
                                    isActive
                                        ? "text-primary"
                                        : "text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700"
                                )}
                            >
                              {item?.icon}
                            </span>
                        )}
                        <span className="truncate">{item.name}</span>
                      </div>
                    </button>
                ) : (
                  <Title
                    as="h6"
                    className={cn(
                      "mb-2 truncate px-6 text-xs font-normal uppercase tracking-widest text-gray-500 2xl:px-8",
                      index !== 0 && "mt-6 3xl:mt-7"
                    )}
                  >
                    {item.name}
                  </Title>
                )}
              </Fragment>
            );
          })}
        </div>
      </SimpleBar>
    </aside>
  );
}
