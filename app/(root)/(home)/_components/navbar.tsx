import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

import MobileNav from "./mobile-navbar";

const Navbar = () => {
    return (
        <nav className="fixed flex-between w-full z-50 bg-dark-1 px-6 py-5 lg:px-10">
            <Link
              href="/"
            >
                <Image
                  src="/presence-transparent-logo.svg"
                  alt="Logo"
                  width={128}
                  height={128}
                  className="hidden md:block"
                />
                <Image
                  src="/presence-icon.svg"
                  alt="Logo"
                  width={30}
                  height={30}
                  className="block md:hidden"
                />
            </Link>

            <div className="flex-between gap-5">
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <MobileNav />
            </div>
        </nav>
    );
}
 
export default Navbar;