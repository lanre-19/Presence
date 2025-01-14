"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { sidebarLinks } from "@/constants";
import Image from "next/image";

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between text-white bg-dark-1 p-6 pt-28 max-sm:hidden lg:w-[264px]">
            <div className="flex flex-col gap-6">
                {sidebarLinks.map((link) => {
                    const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`);

                    return (
                        <Link
                          key={link.label}
                          href={link.route}
                          className={cn(
                            "flex gap-4 items-center p-4 rounded-lg justify-start",
                            !isActive && "hover:bg-blue-400 hover:bg-opacity-15",
                            isActive && "bg-[#243CFC]"
                          )}
                        >
                            <Image
                              src={link.imgUrl}
                              alt={link.label}
                              width={22}
                              height={22}
                            />
                            <p className="text-lg font-semibold max-lg:hidden">
                               {link.label}
                            </p>
                        </Link>
                    )
                })}
            </div>
        </section>
    );
}
 
export default Sidebar;