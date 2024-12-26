"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { links } from "@/constant/sidebarlink";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
const Sidebar = ({ isAlumni }: { isAlumni: boolean }) => {
	const pathname = usePathname();
	return (
		<section className="sticky top-0 left-0 overflow-hidden p-6 pt-24 text-white flex h-screen flex-col w-fit bg-gray-900 border-r-[1px]  border-x-[rgba(255,255,255,0.3)] justify-between max-md:hidden lg:w-[260px]">
			<div className="flex flex-col gap-3">
				{links.map((link: any) => {
					const isactive = pathname === link.route;

					if (link.parent) {
						if (
							link.parent != "Alumni" ||
							(link.parent === "Alumni" && isAlumni)
						) {
							return (
								<div key={link.parent}>
									<p className="text-slate-500 p-2 flex justify-start items-center max-lg:hidden">
										-- {link.parent} --
									</p>
									{link.child.map((childlink: any) => {
										const ischildactive =
											pathname === childlink.route;
										return (
											<Link
												key={childlink.label}
												className={cn(
													"flex gap-4 p-3 items-center justify-start rounded-lg ",
													{
														"bg-blue-600":
															ischildactive,
													}
												)}
												href={childlink.route}
											>
												<Image
													src={childlink.imgUrl}
													alt={childlink.label}
													height={24}
													width={24}
												/>
												<p className="text-lg font-semibold max-lg:hidden hover:text-blue-300">
													{childlink.label}
													<p
														id="loader"
														className="text-white"
													></p>
												</p>
											</Link>
										);
									})}
								</div>
							);
						}
					} else {
						return (
							<Link
								key={link.label}
								className={cn(
									"flex gap-3 p-3 items-center justify-start rounded-lg ",
									{
										"bg-blue-600": isactive,
									}
								)}
								href={link.route}
							>
								<Image
									src={link.imgUrl}
									alt={link.label}
									height={24}
									width={24}
								/>
								<p className="text-lg font-semibold max-lg:hidden hover:text-blue-300">
									{link.label}
								</p>
							</Link>
						);
					}
				})}

				{!isAlumni
					? AnotherLink.map((childlink: any) => {
							const ischildactive = pathname === childlink.route;
							return (
								<Link
									key={childlink.label}
									className={cn(
										"flex gap-4 p-3 items-center justify-start rounded-lg ",
										{
											"bg-blue-600": ischildactive,
										}
									)}
									href={childlink.route}
								>
									<Image
										src={childlink.imgUrl}
										alt={childlink.label}
										height={24}
										width={24}
									/>
									<p className="text-lg font-semibold max-lg:hidden hover:text-blue-300">
										{childlink.label}
									</p>
								</Link>
							);
					  })
					: null}
			</div>
		</section>
	);
};

const AnotherLink = [
	{
		label: "Be an Alumni",
		route: "/check",
		imgUrl: "/icons/apply_as_alumni.svg",
	},
];

export default Sidebar;
