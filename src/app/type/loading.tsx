import React from "react";
import Image from "next/image";
import { BackgroundBeams } from "@/components/ui/background-beams";
const Loading = () => {
	return (
		<div className="flex-center h-screen w-full bg-black">
			<BackgroundBeams />
			<Image
				src="/icons/loading-circle.svg"
				height={64}
				width={64}
				alt="Loading Image"
			/>
		</div>
	);
};

export default Loading;
