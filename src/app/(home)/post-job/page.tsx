"use client";

import { Markup } from "interweave";
import { Tabs } from "@/components/PostTabs";
import { marked } from "marked";
import { useMarkdown } from "@/components/context/MarkdownContext";
import { useHeading } from "@/components/context/HeadingContext";

export default function postjob() {
	// Using ContextAPI, that's why the red lines
	const { markdown, updateMarkdown }: any = useMarkdown();
	const { heading, updateHeading }: any = useHeading();

	const tabs = [
		{
			title: "Post Job",
			value: "post jobs",
			content: (
				<div className="w-full max-w-4xl h-full flex flex-col justify-center items-center gap-[5%] relative sm:p-4 md:p-6 lg:p-8 xl:p-10 text-xs sm:text-sm lg:text-base xl:text-xl font-bold text-white">
					<input
						value={heading}
						onChange={(e) => {
							updateHeading(e.target.value);
						}}
						placeholder="Title"
						type="text"
						id="default-input"
						className="w-full text-xs sm:text-sm lg:text-base xl:text-xl p-1 sm:p-1.5 md:p-2 lg:p-2.5 xl:p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900  focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					/>
					<textarea
						className="bg-slate-600 w-full h-full rounded-lg p-6 resize-none"
						value={markdown}
						onChange={(e) => {
							updateMarkdown(e.target.value);
							// Below two are there to check,
							// delete after production
						}}
						placeholder="Write your markdown here..."
						rows={10}
						cols={50}
					/>
				</div>
			),
		},
		{
			title: "Preview",
			value: "preview markdown",
			content: (
				<article className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl dark:prose-invert mx-auto">
					<Markup
						className="text-slate-50"
						content={marked(markdown) as string}
					/>
				</article>
			),
		},
	];

	return (
		<div className="h-[20rem] sm:h-[30rem] md:h-[40rem] max-w-5xl  w-full [perspective:1000px] relative b flex flex-col items-start justify-start mx-auto mt-[4%]">
			<Tabs tabs={tabs} />
		</div>
	);
}
