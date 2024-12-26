import {
	GlowingStarsBackgroundCard,
	GlowingStarsDescription,
	GlowingStarsTitle,
} from "@/components/ui/glowing-stars";
import Image from "next/image";
const home = () => {
	const dateobj = new Date();
	const time = dateobj.toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
	});
	const date = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
		dateobj
	);

	return (
		<section className="rounded-lg flex flex-col gap-6 size-full">
			<div className="h-[265px] bg-hero bg-cover p-5 rounded-md flex flex-col justify-center">
				<div className="flex flex-col gap-1">
					<h2 className="text-white text-6xl font-extrabold">
						{time}
					</h2>
					<p className="text-base text-gray-300">{date}</p>
				</div>
			</div>
			<div className="flex gap-3 max-md:flex-col max-md:flex-center">
				<GlowingStarsBackgroundCard className="h-[400px] bg-gray-800">
					<div className="size-full flex-center flex-col">
						<Image
							src="/icons/handshake.svg"
							height={48}
							width={48}
							alt="Image"
						/>
						<h1 className="text-center font-semibold text-2xl text-gray-400">
							Connect and Grow
						</h1>
						<p className="text-center text-gray-600">
							A Vibrant Ecosystem for Alumni and Users to Engage
						</p>
					</div>
				</GlowingStarsBackgroundCard>
				<GlowingStarsBackgroundCard className=" bg-gray-800 ">
					<div className="size-full flex-center flex-col">
						<Image
							src="/icons/network.svg"
							height={48}
							width={48}
							alt="Image"
						/>
						<h1 className="text-nowrap  font-semibold text-2xl text-gray-400">
							All-in-One Networking Hub
						</h1>
						<p className="text-center text-gray-600">
							Connect through Webinars, Chats, and Job
							Opportunities
						</p>
					</div>
				</GlowingStarsBackgroundCard>
				<GlowingStarsBackgroundCard className=" bg-gray-800">
					<div className="size-full flex-center flex-col">
						<Image
							src="/icons/hammer.svg"
							height={48}
							width={48}
							alt="Image"
						/>
						<h1 className="text-center font-semibold text-2xl text-gray-400">
							Build Your Future
						</h1>
						<p className="text-center text-gray-600">
							Engage in Live Webinars, Conversations, and Find
							Career Opportunities
						</p>
					</div>
				</GlowingStarsBackgroundCard>
			</div>
		</section>
	);
};

export default home;
