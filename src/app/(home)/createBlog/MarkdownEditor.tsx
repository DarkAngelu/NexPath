"use client";
import { useState } from "react";
import { marked } from "marked";
import styles from "./MarkdownEditor.module.css";
import { useUser } from "@clerk/nextjs";
import { addBlog } from "@/lib/server";
import BlogButton from "./BlogButton";
import { Markup } from "interweave";

const MarkdownEditor = () => {
	const [markdown, setMarkdown] = useState<string>("");
	const [isVisible, setIsVisible] = useState<boolean>(true);
	const [title, setTitle] = useState<string>("");
	const { user, isLoaded } = useUser();
	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setMarkdown(event.target.value);
	};

	const renderMarkdown = (markdownText: string) => {
		return { __html: marked.parse(markdownText) };
	};

	if (!isLoaded) {
		return "loading";
	}

	return (
		<>
			<form
				action={async () =>
					await addBlog(
						markdown,
						user?.primaryEmailAddress?.emailAddress as string,
						title
					)
				}
			>
				<button
					type="submit"
					disabled
					className="hidden"
					aria-hidden="true"
				></button>
				<div className="flex flex-col items-center space-y-2">
					<div className="flex flex-row gap-2 items-center">
						<button
							onClick={() => setIsVisible(true)}
							className="p-3 bg-white text-black rounded-md border border-black"
						>
							Show Editor
						</button>
						<BlogButton />
						<button
							onClick={() => setIsVisible(false)}
							className="p-3 bg-white text-black rounded-md border border-black"
						>
							Show Preview
						</button>
					</div>
					<div>
						<input
							className="p-2"
							placeholder="Enter Title"
							onChange={(e) => {
								setTitle(e.target.value);
							}}
						></input>
					</div>
				</div>
				<div className={styles.container}>
					{isVisible && (
						<div className={styles.editorContainer}>
							<textarea
								className={styles.textarea}
								value={markdown}
								onChange={handleChange}
								placeholder="Type your markdown here..."
							/>
						</div>
					)}
					{!isVisible && (
						<article className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl dark:prose-invert mx-auto overflow-y-auto">
							<Markup
								className="text-slate-50"
								content={marked(markdown) as string}
							/>
						</article>
					)}
				</div>
			</form>
		</>
	);
};

export default MarkdownEditor;
