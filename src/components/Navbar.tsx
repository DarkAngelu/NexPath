import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { MobileNavigation } from "./MobileNavigation";
const Navbar = ({ isAlumni }: { isAlumni: boolean }) => {
	return (
		<nav className="flex justify-between  item-center z-50  fixed w-full bg-gray-900 border-b-[1px] border-y-[rgba(255,255,255,0.3)] px-6 py-4 lg:px-10">
			<Link href="/home" className="  flex  gap-1 item-center ">
				<Image
					src="/images/application.png"
					height={32}
					width={32}
					alt="Room/Zoom"
				/>
				<p className="max-md:hidden text-white font-extrabold text-[26px]">
					NexPath
				</p>
			</Link>
			<div className="flex gap-4">
				<SignedIn>
					<UserButton />
				</SignedIn>
				<MobileNavigation isAlumni={isAlumni} />
			</div>
		</nav>
	);
};

export default Navbar;
