"use client";
import axios from "axios";
import { useState } from "react";

export default function MessageField({
	emailAddress,
	authorId,
	roomId,
	recieverId,
}: {
	emailAddress: string;
	authorId: number;
	roomId: string;
	recieverId: number;
}) {
	const [pending, setPending] = useState<boolean>(false);
	const [input, setInput] = useState<string>("");
	const sendMessage = async (text: string) => {
		setPending(true);
		await axios.post("/api/message", {
			text,
			roomId,
			authorId,
			recieverId,
		});
		setPending(false);
	};

	return (
		<div className="p-2 border-t border-gray-700">
			<input
				type="text"
				className="w-full p-1 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
				placeholder="Type your message..."
				name="msg"
				defaultValue={""}
				onChange={(e) => {
					setInput(e.target.value);
				}}
			/>
			<input
				type="string"
				name="mail"
				value={emailAddress}
				onChange={(e) => {
					return;
				}}
				className="hidden"
			></input>
			<button
				type="submit"
				onClick={() => sendMessage(input)}
				className="mt-1 w-full p-1 bg-blue-600 rounded-md text-white font-semibold hover:bg-blue-700"
			>
				Send{pending ? "..." : ""}
			</button>
		</div>
	);
}
