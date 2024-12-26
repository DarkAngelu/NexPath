import { MessagesAll } from "@/components/ChatComponent";
import Loader from "@/components/Loader";
import MessageField from "@/components/MessageField";
import { getAuthorByMail, getGeneralMessages } from "@/lib/server";
import { currentUser } from "@clerk/nextjs/server";
import { Suspense } from "react";

export default async function General() {
	const user = await currentUser();
	const now = await getAuthorByMail(
		user?.emailAddresses[0].emailAddress as string
	);
	let messages = await getGeneralMessages(now?.collegeId as number);
	messages.sort((a, b) => {
		return a.id - b.id;
	});
	const currentUserId = now?.id;

	return (
		<div className="max-h-screen overflow-y-auto">
			<Suspense fallback={<Loader />}>
				<MessagesAll
					messages={messages}
					currentUserId={currentUserId as number}
					roomId={"1111" + now?.collegeId}
				/>
				<MessageField
					emailAddress={
						user?.primaryEmailAddress?.emailAddress as string
					}
					authorId={currentUserId as number}
					roomId={"1111" + now?.collegeId}
					recieverId={-1}
				/>
			</Suspense>
		</div>
	);
}
