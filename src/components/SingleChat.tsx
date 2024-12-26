import Image from "next/image";
import Link from "next/link";

type message = {
	id: number;
	content: string;
	general: boolean;
	authorUsername: string;
	authorImageUrl: string;
	authorId: number;
	recieverId: number;
};
export default function ChatComponent({
	message,
	currentUserId,
}: {
	message: message;
	currentUserId: number;
}) {
	return (
		<div
			className={`p-2 mb-2 bg-gray-800 rounded-md shadow-md flex flex-col ${
				message.authorId === currentUserId ? "text-right" : "text-left"
			}`}
		>
			<div className="text-sm mb-1 p-1 text-white">{message.content}</div>
			<div
				className={`${
					message.authorId === currentUserId ? "ml-auto" : "mr-auto"
				}`}
			>
				<Link
					href={"/profile/" + message.authorId}
					className="cursor-pointer flex items-center gap-1"
				>
					<Image
						className="rounded-full text-right"
						src={message.authorImageUrl}
						alt="profile"
						width={16}
						height={16}
					/>
					<div className="text-xs text-gray-400 text-right">
						{message.authorUsername}
					</div>
				</Link>
			</div>
		</div>
	);
}
