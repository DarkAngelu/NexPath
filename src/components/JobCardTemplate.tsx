"use client"

import { useState } from "react";
import BorderMagicButton from "./BorderMagicButton";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Markup } from "interweave";
import { marked } from "marked";
import ShimmerButton from "./ShimmerButton";



export default function JobCardTemplate({authorId, title, content, username, imageUrl}: {authorId: number, title: string, content: string, username: string, imageUrl: string}) {
    const [visible, $visible] = useState(false)
    return (
		<div className="p-3 mx-1 my-2 sm:mx-2 sm:my-4 w-full text-white rounded-lg shadow-md border border-gray-500 bg-gradient-to-br from-gray-700 to-gray-900">
			<div className="flex items-center justify-between p-4 bg-gradient-to-tr from-slate-900 to-slate-700 rounded-lg">
                <div onClick={() => $visible(!visible)} className=" cursor-pointer w-full truncate text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl 2xl:text-2xl py-[5%]">
                    {title || "Title"}
                </div>
				{/* LINK NEEDED TO BE PROVIDED, TO THE USER's PROFILE */}
				<Link
					className=" flex items-center justify-end space-x-2 "
					href={"/profile/"+authorId}
					target="_blank"
				>
					<Avatar className="  h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 xl:h-12 xl:w-12    ">
						<AvatarImage
							src={imageUrl as string}
							width={20}
							height={20}
							alt="profile"
							className="mr-1 rounded-full"
						/>
						<AvatarFallback>DA</AvatarFallback>
					</Avatar>
					{/* <span className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
						{username || "DarkAngelu"}
					</span> */}
                    <ShimmerButton
                        className=" text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl "
                        text={username || "Anirban"}
                        onClick={() => {}}
                    />
				</Link>
			</div>
			{visible && (
				<>
					<article className="py-2 px-4 sm:py-4 sm:px-8 prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl dark:prose-invert mx-auto">
						<Markup
							className="text-slate-50"
							content={marked(content) as string}
						/>
					</article>
				</>
			)}
		</div>
	);
}