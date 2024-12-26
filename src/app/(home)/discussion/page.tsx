import { getAllPosts } from "@/lib/server";
import { getAuthorById } from "@/lib/server";
import Link from "next/link";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";

type post = {
	id: number;
	title: string;
	image: string;
	description: string;
	authorId: number;
};

export default async function () {
	const user = await currentUser();
	let post = await getAllPosts(
		user?.emailAddresses[0].emailAddress as string
	);

	if (post === "error") {
		return "error in loading the posts";
	} else if (Array.isArray(post)) {
		post = post.reverse();
	}

	return (
		<div>
			<div className="flex flex-col items-center pt-4 text-white">
				<Link
					href={"/addPost"}
					className="p-3 bg-white text-black font-semibold rounded-md border border-black"
				>
					Make a Post
				</Link>
				<div className="grid grid-cols-1">
					{Array.isArray(post) &&
						post.map((post: post, ind: number) => (
							<PostCard post={post} key={ind} />
						))}
				</div>
			</div>
		</div>
	);
}

async function PostCard({ post }: { post: post }) {
	const userId = post.authorId;
	const user = await getAuthorById(userId);

	return (
		<div className="p-4 m-2 mx-auto w-4/5 min-w-[500px] max-w-[500px] bg-gray-800 text-white rounded-lg shadow-md border border-gray-600">
			<h2 className="text-xl font-bold mb-2">{post.title}</h2>
			<img
				src={post.image}
				className="max-h-[300px] max-w-[300px] mx-auto p-3"
			></img>
			<p className="text-gray-300 mb-2 line-clamp-4">
				{post.description}
			</p>
			<div className="flex justify-between items-center">
				<Link href={"/profile/" + post.authorId}>
					<div className="flex gap-2 items-center">
						<Image
							src={user?.imageUrl as string}
							width={20}
							height={20}
							alt="profile"
							className="mr-1 rounded-full"
						/>
						{user?.username}
					</div>
				</Link>
			</div>
		</div>
	);
}
