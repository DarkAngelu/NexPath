"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import Loader from "@/components/Loader";

export default function Page() {
	const { isLoaded, user } = useUser();
	const [details, setDetails] = useState("");
	const [pending, setPending] = useState<Boolean>(false);
	if (!isLoaded) {
		return <Loader />;
	}

	return (
		<div className="flex flex-col items-center justify-center">
			<p className="text-xl font-semibold py-4 text-white">
				Let Us Know Your Details
			</p>
			<textarea
				className="w-2/4 p-2 mb-4 h-40 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
				placeholder="Enter details like your name,regNo,..."
				value={details}
				onChange={(e) => setDetails(e.target.value)}
			/>
			<Button
				className="p-3 bg-blue-500 hover:bg-blue-600"
				onClick={async () => {
					setPending(true);
					const res = await axios.post("/api/send", {
						Details: details,
						email: user?.primaryEmailAddress?.toString(),
					});
					// console.log(res);
					alert(
						"We will verify from our side and get back to you !!"
					);
					setPending(false);
				}}
			>
				{pending ? "Check me...." : "Check me"}
			</Button>
		</div>
	);
}
