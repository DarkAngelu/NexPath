"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

import Loader from "@/components/Loader";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { isAlumnicheck } from "@/actions/database.action";
const HomeLayout = ({ children }: { children: React.ReactNode }) => {
	const [isAlumni, setIsAlumni] = useState<boolean>();
	const { user } = useUser();
	useEffect(() => {
		async function check() {
			const res = await isAlumnicheck(
				String(user?.primaryEmailAddress?.emailAddress)
			);

			if (res) {
				setIsAlumni(res === "true");
			}
		}
		check();
	}, [user]);
	if (isAlumni == null) return <Loader />;
	return (
		<main className="relative">
			<Navbar isAlumni={isAlumni} />

			<div className="flex">
				<Sidebar isAlumni={isAlumni} />
				<section className="flex  min-h-screen flex-1 flex-col px-6 pb-6 pt-24 max-md:pb-14 sm:px-14">
					<div className="w-full">{children}</div>
				</section>
			</div>
		</main>
	);
};

export default HomeLayout;
