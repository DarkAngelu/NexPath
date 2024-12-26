"use client";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { ControlBar, GridLayout, LiveKitRoom, ParticipantTile, RoomAudioRenderer, useTracks } from "@livekit/components-react";
import "@livekit/components-styles";
import { Track } from "livekit-client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

export default function Page({ params }: { params: { roomId: string } }) {
	const room = params.roomId;
	const { isLoaded, user } = useUser();

	if (!isLoaded) {
		return (
			<div>
				<Loader />
			</div>
		);
	}
	const router = useRouter();
	const name: string = user?.firstName as string;
	const [token, setToken] = useState("");

	useEffect(() => {
		(async () => {
			try {
				const resp = await fetch(
					`/api/get-participant-token?room=${room}&username=${name}`
				);
				const data = await resp.json();
				setToken(data.token);
			} catch (e) {
				console.error(e);
			}
		})();
	}, []);

	if (token === "") {
		return (
			<div>
				<Loader />
			</div>
		);
	}

	if (name === "") {
		return (
			<div>
				<Loader />
			</div>
		);
	}

	return (
		<div>
			<SignedOut>pls signin</SignedOut>

			<SignedIn>
				<LiveKitRoom
					video={false}
					audio={false}
					token={token}
					serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
					connect={true}
					// Use the default LiveKit theme for nice styles.
					data-lk-theme="default"
					style={{ height: "100dvh" }}
					onDisconnected={() => {
						router.push("/webinars");
					}}
				>
					{/* Your custom component with basic video conferencing functionality. */}
					<MyVideoConference />
					{/* The RoomAudioRenderer takes care of room-wide audio for you. */}
					<RoomAudioRenderer />
					{/* Controls for the user to start/stop audio, video, and screen
      share tracks and to leave the room. */}
					<ControlBar />
				</LiveKitRoom>
			</SignedIn>
		</div>
	);
}

function MyVideoConference() {
	// `useTracks` returns all camera and screen share tracks. If a user
	// joins without a published camera track, a placeholder track is returned.
	const tracks = useTracks(
		[
			{ source: Track.Source.Camera, withPlaceholder: true },
			{ source: Track.Source.ScreenShare, withPlaceholder: false },
		],
		{ onlySubscribed: false }
	);
	// let dis = tracks.map((track) => {if(track.participant.identity === name){
	//   return track;
	// }});
	// dis.push(tracks[0]);

	return (
		<GridLayout
			tracks={tracks}
			style={{ height: "calc(100vh - var(--lk-control-bar-height))" }}
		>
			{/* The GridLayout accepts zero or one child. The child is used
      as a template to render all passed in tracks. */}
			<ParticipantTile />
		</GridLayout>
	);
}
