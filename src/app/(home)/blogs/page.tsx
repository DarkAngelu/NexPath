import { getAllBlogs } from "@/lib/server";
import Link from "next/link";
import { getAuthorById } from "@/lib/server";
import Image from "next/image";

type blog = {
	id: number;
	content: string;
	title: string;
	authorId: number;
};

export default async function () {
	const blogs = await getAllBlogs();
	// console.log(blogs)
	if (blogs === "error") {
		return "error in retreving data !";
	}

	return (
		<div className="flex flex-col items-center pt-4 text-white">
			<Link
				href={"/createBlog"}
				className="p-3 bg-white rounded-md text-black mb-3 font-semibold"
			>
				Create Blog
			</Link>
			<div className="grid grid-cols-1">
				{blogs.map((blog: blog, ind: number) => (
					<Blog blog={blog} key={ind} />
				))}
			</div>
		</div>
	);
}

async function Blog({ blog }: { blog: blog }) {
	const userId = blog.authorId;
	const user = await getAuthorById(userId);

	return (
		<div className="p-4 m-2 mx-auto w-4/5 min-w-[400px] max-w-[400px] bg-gray-800 text-white rounded-lg shadow-md border border-gray-600">
			<h2 className="text-xl font-bold mb-2">{blog.title}</h2>
			<div className="flex justify-between items-center">
				<Link href={"/profile/" + blog.authorId}>
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
				<Link
					href={"/blogs/" + blog.id}
					className="p-2 bg-white rounded-md text-black font-semibold"
				>
					Read
				</Link>
			</div>
		</div>
	);
}
