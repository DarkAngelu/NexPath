"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMarkdown } from "./context/MarkdownContext";
import ShimmerButton from "./ShimmerButton";
import axios from "axios";
import { useHeading } from "./context/HeadingContext";

type Tab = {
	title: string;
	value: string;
	content?: string | React.ReactNode | any;
};

export const Tabs = ({
	tabs: propTabs,
	containerClassName,
	activeTabClassName,
	tabClassName,
	contentClassName,
}: {
	tabs: Tab[];
	containerClassName?: string;
	activeTabClassName?: string;
	tabClassName?: string;
	contentClassName?: string;
}) => {
	const [activeTab, setActiveTab] = useState<Tab>(propTabs[0]);
	const { markdown } = useMarkdown();
	const { heading } = useHeading();

	const moveSelectedTabToTop = (idx: number) => {
		const newTabs = [...propTabs];
		const selectedTab = newTabs.splice(idx, 1);
		newTabs.unshift(selectedTab[0]);
		setActiveTab(newTabs[0]);
	};

	// Ensure tabs are updated when propTabs changes
	useEffect(() => {
		setActiveTab(propTabs[0]);
	}, [propTabs]);

	return (
		<>
			<div className="overflow-hidden flex items-center justify-between w-full">
				<div
					className={cn(
						"bg-slate-500 flex flex-row items-center justify-start [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-auto rounded-full   mx-4 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-12",
						containerClassName
					)}
				>
					{propTabs.map((tab, idx) => (
						<button
							key={tab.title}
							onClick={() => moveSelectedTabToTop(idx)}
							className={cn(
								"relative px-[16px] py-[12px] sm:px-[20px] sm:py-[15px] md:px-[24px] md:py-[18px] lg:px-[28px] lg:py-[21px] xl:px-[32px] xl:py-[24px]    rounded-full text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl ",
								tabClassName
							)}
							style={{
								transformStyle: "preserve-3d",
							}}
						>
							{activeTab.value === tab.value && (
								<motion.div
									layoutId="clickedbutton"
									transition={{
										type: "spring",
										bounce: 0.3,
										duration: 0.6,
									}}
									className={cn(
										"absolute inset-0 bg-gray-200 dark:bg-zinc-800 rounded-full ",
										activeTabClassName
									)}
								/>
							)}

							<span className="relative block text-black dark:text-white">
								{tab.title}
							</span>
						</button>
					))}
				</div>

				<ShimmerButton
					className="mr-[9%] text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl  px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5 lg:px-7 lg:py-6 xl:px-8 xl:py-7 "
					text="POST"
					onClick={async () => {
						// POST THE MARKDOWN IN THE USER's
						// JOB ARRAY IN THE DATABASE
						try {
							const response = await axios.post("api/PostJob", {
								markdown: markdown,
								heading: heading,
							});

							window.location.href = "/job_open";
						} catch (e) {
							console.error("Error creating job: " + e);
						}
					}}
				/>
			</div>

			<FadeInDiv
				tabs={propTabs}
				active={activeTab}
				key={activeTab.value}
				className={cn("", contentClassName)}
			/>
		</>
	);
};

export const FadeInDiv = ({
	className,
	tabs,
	active,
}: {
	className?: string;
	key?: string;
	tabs: Tab[];
	active: Tab;
}) => {
	const isActive = (tab: Tab) => tab.value === active.value;

	return (
		<div className="relative w-full h-full">
			{tabs.map((tab, idx) => (
				<motion.div
					key={tab.value}
					layoutId={tab.value}
					style={{
						scale: 1 - idx * 0.1,
						// top: hovering ? idx * -50 : 0,
						zIndex: isActive(tab) ? 5000 : -idx,
						display: isActive(tab) ? "block" : "none",
						opacity: idx < 3 ? 1 - idx * 0.1 : 0,
					}}
					animate={{
						y: isActive(tab) ? [0, 40, 0] : 0,
					}}
					className={cn(
						"overflow-x-hidden overflow-y-scroll no-scrollbar w-[90%] h-[90%] absolute top-0 left-0 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl p-5 sm:p-8 lg:p-10    mx-4 my-2 sm:mx-6 sm:my-3 md:mx-8 md:my-4 lg:mx-10 lg:my-5 xl:mx-12 xl:my-6",
						className
					)}
				>
					{isActive(tab) && tab.content}
				</motion.div>
			))}
		</div>
	);
};
