"use client";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { createInterviewLink } from "@/lib/server";

export default function Page() {
	const { isLoaded, user } = useUser();
	const [roomid, setRoomid] = useState<string>("");
	if (!isLoaded) {
		return <div>Loading user...</div>;
	}

	const userEmail = user?.primaryEmailAddress?.toString();

	async function submit() {
		const link = await createInterviewLink(userEmail as string);
		if (link === "error") {
			return alert("Your are not an alumni");
		}
		setRoomid(link + "");
	}

	return (
		<div className="flex flex-col gap-5 items-center justify-center text-white">
			<p className="font-bold mb-1 text-xl">Create Interview Link</p>
			<form action={submit}>
				<ButtonForm />
			</form>
			<div>
				<Text roomid={roomid} />
			</div>
		</div>
	);
}

import { Copy } from "lucide-react";

function Text({ roomid }: { roomid: string }) {
	if (roomid.length >= 1) {
		const link = "http://localhost:3000/room/" + roomid;

		const copyToClipboard = () => {
			navigator.clipboard.writeText(link);
			alert("Link Copied To Clipboard");
		};

		return (
			<div className="flex items-center gap-2 bg-gray-800 p-2 rounded-md">
				<p>{link}</p>
				<button
					onClick={copyToClipboard}
					className="p-1 bg-gray-800 rounded-md"
				>
					<Copy className="w-4 h-4 text-white" />
				</button>
			</div>
		);
	} else {
		return null;
	}
}

function ButtonForm() {
	const { pending } = useFormStatus();
	return (
		<Button type="submit" className="p-3 bg-black hover:bg-gray-800">
			{pending ? "Creating..." : "Create Link"}
		</Button>
	);
}
