"use client";
import { useEffect, useState } from "react";
import ChatComponent from "./SingleChat";
import { pusherClient } from "@/lib/pusher";

type message = {
	id: number;
	content: string;
	general: boolean;
	authorUsername: string;
	authorImageUrl: string;
	authorId: number;
	recieverId: number;
};

export function MessagesAll({
	messages,
	currentUserId,
	roomId,
}: {
	messages: message[];
	currentUserId: number;
	roomId: string;
}) {
	const [incomingMessages, setIncomingMessages] = useState<message[]>([]);

	useEffect(() => {
		console.log(roomId + " rrr");
		pusherClient.subscribe(roomId);
		pusherClient.bind("incoming-message", (text: message) => {
			setIncomingMessages((prev: message[]) => [...prev, text]);
		});
		return () => {
			pusherClient.unsubscribe(roomId);
		};
	}, []);

	return (
		<div className="flex-1 overflow-y-auto p-2">
			{messages.map((a) => (
				<ChatComponent
					key={a.id}
					message={a}
					currentUserId={currentUserId as number}
				/>
			))}
			{incomingMessages.map((a, ind) => {
				if (ind % 2 == 0) {
					return (
						<ChatComponent
							key={a.id}
							message={a}
							currentUserId={currentUserId as number}
						/>
					);
				}
			})}
		</div>
	);
}
