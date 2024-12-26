import { pusherServer } from "@/lib/pusher";

export async function POST(req: Request) {
	const { data, id } = await req.json();
	const [socketId, channelName] = data
		.split("&")
		.map((str: any) => str.split("=")[1]);

	const presenceData = {
		user_id: id,
		user_data: { user_id: id },
	};

	const auth = pusherServer.authorizeChannel(
		socketId,
		channelName,
		presenceData
	);

	return new Response(JSON.stringify(auth));
}
