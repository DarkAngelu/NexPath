import React from "react";
import Image from "next/image";
const Loader = () => {
	return (
		<div className="h-screen w-full bg-gray-950 flex-center">
			<Image
				src="/icons/loading-circle.svg"
				height={64}
				width={64}
				alt="Loading Image"
			/>
		</div>
	);
};

export default Loader;
