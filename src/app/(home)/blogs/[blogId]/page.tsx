"use client";
import { getBlogById } from "@/lib/server";
import { marked } from "marked";
import { Markup } from "interweave";
import { useEffect, useState } from "react";

export default function ({ params }: { params: { blogId: string } }) {
	const [text, setText] = useState("");

	useEffect(() => {
		const getBlog = async () => {
			const blog = await getBlogById(parseInt(params.blogId));
			if (blog === null || blog === "error") {
				return "error in retreiving data;";
			}
			console.log(blog.content);
			setText(blog.content);
		};

		getBlog();
	}, []);

	return (
		<div>
			<Mark text={text as string} />
		</div>
	);
}

function Mark({ text }: { text: string }) {
	return (
		<article className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl dark:prose-invert mx-auto overflow-y-auto">
			<Markup
				className="text-slate-50"
				content={marked(text) as string}
			/>
		</article>
	);
}
