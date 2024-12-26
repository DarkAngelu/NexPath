"use server";
import { pusherServer } from "@/lib/pusher";
import prisma from "@/lib/db";
import { getAuthorById } from "@/lib/server";

export async function POST(req: Request) {
	const { text, roomId, authorId, recieverId } = await req.json();

	let user = await getAuthorById(authorId);
	// let CurrentUsercollegeId = roomId.split("1111")[1];
	const m = await prisma.message.create({
		data: {
			content: text,
			general: true,
			authorId: authorId as number,
			authorUsername: user?.username as string,
			authorImageUrl: user?.imageUrl as string,
			collegeId: user?.collegeId as number,
			recieverId: -1,
		},
	});
	pusherServer.trigger(roomId, "incoming-message", m);

	return new Response(JSON.stringify({ success: true }));
}
