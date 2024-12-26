"use client";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { createDiscussion } from "@/lib/server";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";

export default function () {
	const [title, setTitle] = useState("");
	const [image, setImage] = useState("");
	const [description, setDescription] = useState("");
	const { isLoaded, user } = useUser();
	const router = useRouter();
	if (!isLoaded) {
		return "loading";
	}

	return (
		<div className="text-white">
			<form
				className="w-3/4 mx-auto"
				action={async () => {
					if (description.length > 80) {
						alert(
							"You have exceeded the word limit of 80 words !!"
						);
						return;
					}
					await createDiscussion(
						title,
						image,
						description,
						user?.primaryEmailAddress?.emailAddress as string
					);
					router.push("/discussion");
				}}
			>
				<button
					type="submit"
					disabled
					className="hidden"
					aria-hidden="true"
				></button>
				<div className="mb-4">
					<label
						className="block text-sm font-bold mb-2"
						htmlFor="title"
					>
						Title
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="title"
						type="text"
						placeholder="Enter title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-sm font-bold mb-2"
						htmlFor="image"
					>
						Image URL
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="image"
						type="text"
						placeholder="Enter image URL"
						value={image}
						onChange={(e) => setImage(e.target.value)}
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-sm font-bold mb-2"
						htmlFor="description"
					>
						Description
					</label>
					<textarea
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="description"
						placeholder="Enter description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
				<div className="flex items-center justify-between">
					<PostButton />
				</div>
			</form>
		</div>
	);
}

function PostButton() {
	const { pending } = useFormStatus();
	return (
		<button
			className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
			type="submit"
		>
			Add Post{pending ? "..." : ""}
		</button>
	);
}
