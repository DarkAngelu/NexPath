"use client";
import React from "react";
import { SparklesCore } from "../components/ui/sparkles";
import { ArrowRight } from "lucide-react";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const World = dynamic(
	() => import("@/components/ui/globe").then((m) => m.World),
	{
		ssr: false,
	}
);
const root = () => {
	const globeConfig = {
		pointSize: 4,
		globeColor: "#062056",
		showAtmosphere: true,
		atmosphereColor: "#FFFFFF",
		atmosphereAltitude: 0.1,
		emissive: "#062056",
		emissiveIntensity: 0.1,
		shininess: 0.9,
		polygonColor: "rgba(255,255,255,0.7)",
		ambientLight: "#38bdf8",
		directionalLeftLight: "#ffffff",
		directionalTopLight: "#ffffff",
		pointLight: "#ffffff",
		arcTime: 1000,
		arcLength: 0.9,
		rings: 1,
		maxRings: 3,
		initialPosition: { lat: 22.3193, lng: 114.1694 },
		autoRotate: true,
		autoRotateSpeed: 0.5,
	};
	const colors = ["#06b6d4", "#3b82f6", "#6366f1"];
	const sampleArcs = [
		{
			order: 1,
			startLat: -19.885592,
			startLng: -43.951191,
			endLat: -22.9068,
			endLng: -43.1729,
			arcAlt: 0.1,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 1,
			startLat: 28.6139,
			startLng: 77.209,
			endLat: 3.139,
			endLng: 101.6869,
			arcAlt: 0.2,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 1,
			startLat: -19.885592,
			startLng: -43.951191,
			endLat: -1.303396,
			endLng: 36.852443,
			arcAlt: 0.5,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 2,
			startLat: 1.3521,
			startLng: 103.8198,
			endLat: 35.6762,
			endLng: 139.6503,
			arcAlt: 0.2,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 2,
			startLat: 51.5072,
			startLng: -0.1276,
			endLat: 3.139,
			endLng: 101.6869,
			arcAlt: 0.3,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 2,
			startLat: -15.785493,
			startLng: -47.909029,
			endLat: 36.162809,
			endLng: -115.119411,
			arcAlt: 0.3,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 3,
			startLat: -33.8688,
			startLng: 151.2093,
			endLat: 22.3193,
			endLng: 114.1694,
			arcAlt: 0.3,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 3,
			startLat: 21.3099,
			startLng: -157.8581,
			endLat: 40.7128,
			endLng: -74.006,
			arcAlt: 0.3,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 3,
			startLat: -6.2088,
			startLng: 106.8456,
			endLat: 51.5072,
			endLng: -0.1276,
			arcAlt: 0.3,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 4,
			startLat: 11.986597,
			startLng: 8.571831,
			endLat: -15.595412,
			endLng: -56.05918,
			arcAlt: 0.5,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 4,
			startLat: -34.6037,
			startLng: -58.3816,
			endLat: 22.3193,
			endLng: 114.1694,
			arcAlt: 0.7,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 4,
			startLat: 51.5072,
			startLng: -0.1276,
			endLat: 48.8566,
			endLng: -2.3522,
			arcAlt: 0.1,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 5,
			startLat: 14.5995,
			startLng: 120.9842,
			endLat: 51.5072,
			endLng: -0.1276,
			arcAlt: 0.3,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 5,
			startLat: 1.3521,
			startLng: 103.8198,
			endLat: -33.8688,
			endLng: 151.2093,
			arcAlt: 0.2,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 5,
			startLat: 34.0522,
			startLng: -118.2437,
			endLat: 48.8566,
			endLng: -2.3522,
			arcAlt: 0.2,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 6,
			startLat: -15.432563,
			startLng: 28.315853,
			endLat: 1.094136,
			endLng: -63.34546,
			arcAlt: 0.7,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 6,
			startLat: 37.5665,
			startLng: 126.978,
			endLat: 35.6762,
			endLng: 139.6503,
			arcAlt: 0.1,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 6,
			startLat: 22.3193,
			startLng: 114.1694,
			endLat: 51.5072,
			endLng: -0.1276,
			arcAlt: 0.3,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 7,
			startLat: -19.885592,
			startLng: -43.951191,
			endLat: -15.595412,
			endLng: -56.05918,
			arcAlt: 0.1,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 7,
			startLat: 48.8566,
			startLng: -2.3522,
			endLat: 52.52,
			endLng: 13.405,
			arcAlt: 0.1,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 7,
			startLat: 52.52,
			startLng: 13.405,
			endLat: 34.0522,
			endLng: -118.2437,
			arcAlt: 0.2,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 8,
			startLat: -8.833221,
			startLng: 13.264837,
			endLat: -33.936138,
			endLng: 18.436529,
			arcAlt: 0.2,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 8,
			startLat: 49.2827,
			startLng: -123.1207,
			endLat: 52.3676,
			endLng: 4.9041,
			arcAlt: 0.2,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 8,
			startLat: 1.3521,
			startLng: 103.8198,
			endLat: 40.7128,
			endLng: -74.006,
			arcAlt: 0.5,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 9,
			startLat: 51.5072,
			startLng: -0.1276,
			endLat: 34.0522,
			endLng: -118.2437,
			arcAlt: 0.2,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 9,
			startLat: 22.3193,
			startLng: 114.1694,
			endLat: -22.9068,
			endLng: -43.1729,
			arcAlt: 0.7,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 9,
			startLat: 1.3521,
			startLng: 103.8198,
			endLat: -34.6037,
			endLng: -58.3816,
			arcAlt: 0.5,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 10,
			startLat: -22.9068,
			startLng: -43.1729,
			endLat: 28.6139,
			endLng: 77.209,
			arcAlt: 0.7,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 10,
			startLat: 34.0522,
			startLng: -118.2437,
			endLat: 31.2304,
			endLng: 121.4737,
			arcAlt: 0.3,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 10,
			startLat: -6.2088,
			startLng: 106.8456,
			endLat: 52.3676,
			endLng: 4.9041,
			arcAlt: 0.3,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 11,
			startLat: 41.9028,
			startLng: 12.4964,
			endLat: 34.0522,
			endLng: -118.2437,
			arcAlt: 0.2,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 11,
			startLat: -6.2088,
			startLng: 106.8456,
			endLat: 31.2304,
			endLng: 121.4737,
			arcAlt: 0.2,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 11,
			startLat: 22.3193,
			startLng: 114.1694,
			endLat: 1.3521,
			endLng: 103.8198,
			arcAlt: 0.2,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 12,
			startLat: 34.0522,
			startLng: -118.2437,
			endLat: 37.7749,
			endLng: -122.4194,
			arcAlt: 0.1,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 12,
			startLat: 35.6762,
			startLng: 139.6503,
			endLat: 22.3193,
			endLng: 114.1694,
			arcAlt: 0.2,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 12,
			startLat: 22.3193,
			startLng: 114.1694,
			endLat: 34.0522,
			endLng: -118.2437,
			arcAlt: 0.3,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 13,
			startLat: 52.52,
			startLng: 13.405,
			endLat: 22.3193,
			endLng: 114.1694,
			arcAlt: 0.3,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 13,
			startLat: 11.986597,
			startLng: 8.571831,
			endLat: 35.6762,
			endLng: 139.6503,
			arcAlt: 0.3,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 13,
			startLat: -22.9068,
			startLng: -43.1729,
			endLat: -34.6037,
			endLng: -58.3816,
			arcAlt: 0.1,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 14,
			startLat: -33.936138,
			startLng: 18.436529,
			endLat: 21.395643,
			endLng: 39.883798,
			arcAlt: 0.3,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
	];

	const words = [
		{
			text: "Welcome",
			className: " text-white font-extrabold",
		},
		{
			text: "to",
			className: " text-white font-extrabold",
		},
		{
			text: "our",
			className: " text-white font-extrabold",
		},
		{
			text: "App",
			className: " text-blue-500 font-extrabold",
		},
	];
	const router = useRouter();
	return (
		<div
			className="h-[100vh]  relative w-full bg-black  bg-cover flex  items-center justify-center overflow-hidden "
			style={{
				backgroundImage: `
     radial-gradient(at 30% 30%, rgba(0, 0, 20, 0.9), transparent 40%),
          radial-gradient(at 70% 70%, rgba(0, 0, 50, 0.6), transparent 40%),
          linear-gradient(to right, rgba(0, 10, 30, 0.95), rgba(0, 0, 0, 0.9))
    `,
			}}
		>
			<div className="w-full absolute inset-0 h-screen">
				<SparklesCore
					id="tsparticlesfullpage"
					background="transparent"
					minSize={0.6}
					maxSize={1.4}
					particleDensity={100}
					className="w-full h-full"
					particleColor="#FFFFFF"
				/>
			</div>

			<div className=" mx-auto w-full relative overflow-hidden h-[100vh] flex-center max-md:flex-col">
				<div className=" w-1/2  h-64 md:h-full z-10 max-md:w-full max-md:h-1/2 gap-10">
					<World data={sampleArcs} globeConfig={globeConfig} />
				</div>
				<div className="flex-center flex-col gap-5  w-1/2 max-md:w-full max-md:h-1/2">
					<TypewriterEffectSmooth words={words} />

					<button
						onClick={() => {
							router.push("/type");
						}}
						className="relative  inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
					>
						<span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
						<span className="inline-flex gap-5  tracking-wider h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
							N.e.x.t
							<ArrowRight />
						</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default root;
