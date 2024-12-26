"use client";
import Image from "next/image";
import Link from "next/link";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
	SheetClose,
	SheetFooter,
} from "./ui/sheet";
import { links } from "@/constant/sidebarlink";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";

export const MobileNavigation = ({ isAlumni }: { isAlumni: boolean }) => {
	const pathname = usePathname();
	return (
		<section className=" md:hidden max-w-[264px]">
			<Sheet>
				<SheetTrigger asChild>
					<Image
						src="/icons/menu.svg"
						alt="Hamburger"
						height={32}
						width={32}
						className="cursor-pointer"
					/>
				</SheetTrigger>
				<SheetContent
					side={"left"}
					className="bg-gray-900 border-white text-white"
				>
					<Link
						href={"/home"}
						className="flex justify-start items-center gap-4 "
					>
						<Image
							src="/images/application.png"
							alt="Logo"
							height={32}
							width={32}
						/>
						<p className="font-extrabold text-[24px] text-white hover:text-blue-300">
							Joblify
						</p>
					</Link>
					<section className="flex h-full p-6 pt-16 ">
						<div className="flex flex-col gap-3 w-full ">
							{links.map((link: any) => {
								const isactive = pathname === link.route;

								if (link.parent) {
									if (
										link.parent !== "Alumni" ||
										(link.parent === "Alumni" && isAlumni)
									) {
										return (
											<div key={link.parent}>
												<p className="text-slate-500 p-2 flex justify-start items-center">
													-- {link.parent} --
												</p>
												{link.child.map(
													(childlink: any) => {
														const ischildactive =
															pathname ===
															childlink.route;
														return (
															<SheetClose
																asChild
																key={
																	childlink.label
																}
															>
																<Link
																	className={cn(
																		"flex gap-4 p-3 items-center justify-start rounded-lg",
																		{
																			"bg-blue-600":
																				ischildactive,
																		}
																	)}
																	href={
																		childlink.route
																	}
																>
																	<Image
																		src={
																			childlink.imgUrl
																		}
																		alt={
																			childlink.label
																		}
																		height={
																			24
																		}
																		width={
																			24
																		}
																	/>
																	<p className="text-lg font-semibold hover:text-blue-300">
																		{
																			childlink.label
																		}
																	</p>
																</Link>
															</SheetClose>
														);
													}
												)}
											</div>
										);
									}
								} else {
									return (
										<SheetClose asChild key={link.label}>
											<Link
												className={cn(
													"flex gap-4 p-3 items-center justify-start rounded-lg",
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
												<p
													className="text-lg font-semibold hover:text-blue-300
                        "
												>
													{link.label}
												</p>
											</Link>
										</SheetClose>
									);
								}
							})}
						</div>
					</section>
				</SheetContent>
			</Sheet>
		</section>
	);
};
