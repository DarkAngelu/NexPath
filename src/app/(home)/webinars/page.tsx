import Loader from "@/components/Loader";
import { getAuthorById, getWebinar } from "@/lib/server";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { currentUser } from "@clerk/nextjs/server";

type webinar = {
	id: number;
	date: Date;
	title: string;
	description: string;
	authorId: number;
};

export default async function Page() {
	const user = await currentUser();
	const webinars = await getWebinar(
		user?.emailAddresses[0].emailAddress as string
	);

	if (webinars.length === 0) {
		return <div className="text-white">No webinars !!</div>;
	}

	return (
		<div className="flex flex-col items-center pt-4 text-white">
			<Suspense fallback={<Loader />}>
				<div className="grid grid-cols-1">
					{Array.isArray(webinars) ? (
						webinars.map((webinar: webinar) => (
							<WebinarCard key={webinar.id} webinar={webinar} />
						))
					) : (
						<div>Error loading webinars</div>
					)}
				</div>
			</Suspense>
		</div>
	);
}

async function WebinarCard({ webinar }: { webinar: webinar }) {
	const userId = webinar.authorId;
	const user = await getAuthorById(userId);

	return (
		<div className="p-4 m-2 mx-auto w-4/5 min-w-[400px] max-w-[400px] bg-gray-800 text-white rounded-lg shadow-md border border-gray-600">
			<h2 className="text-xl font-bold mb-2">{webinar.title}</h2>
			<p className="text-gray-300 mb-2 line-clamp-2">
				{webinar.description}
			</p>
			<div className="text-gray-400 mb-3">
				{new Date(webinar.date).toLocaleString().toUpperCase()}
			</div>
			<div className="flex justify-between items-center">
				<Link href={"/profile/" + webinar.authorId}>
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
					href={"/room/" + webinar.id}
					className="p-2 bg-white rounded-md text-black font-semibold"
				>
					Join
				</Link>
			</div>
		</div>
	);
}
