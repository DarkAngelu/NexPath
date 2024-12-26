"use client";
import { Suspense, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { getReccomendation } from "@/lib/server";
import { useFormStatus } from "react-dom";
import Link from "next/link";

type User = {
	id: number;
	mail: string;
	username: string;
	imageUrl: string;
	isAlumni: boolean;
	interests: string;
	collegeId: number;
};

export default function () {
	const [text, setText] = useState("");
	const [same, setSame] = useState(true);
	const [users, setUsers] = useState<User[]>([]);
	const { isLoaded, user } = useUser();

	if (!isLoaded) {
		return <div className="text-white">User Loading ....</div>;
	}

	async function handle() {
		const a = await getReccomendation(
			user?.primaryEmailAddress?.emailAddress as string,
			text,
			same
		);
		if (a === "error") {
			return;
		}
		setUsers(a);
	}

	return (
		<div
			className={`flex flex-col ${
				users.length === 0 ? "justify-center" : "justify-start"
			} mt-3 min-h-screen bg-gray-900 m-3 w-3/5 mx-auto`}
		>
			<form
				action={async () => await handle()}
				className="bg-gray-800 p-4 rounded-full shadow-lg flex space-x-2"
			>
				<input
					type="text"
					name="inputField"
					placeholder="Search..."
					onChange={(e) => {
						setText(e.target.value);
					}}
					className="w-full px-4 py-2 text-gray-900 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
				<select
					name="selectValue"
					onChange={(e) => {
						setSame(e.target.value === "1");
					}}
					className="px-4 py-2 text-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					<option value="1">Same College</option>
					<option value="2">Different College</option>
				</select>
				<SubmitButton />
			</form>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
				<Suspense fallback={"loading....."}>
					{users.map((user) => (
						<div
							key={user.id}
							className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center"
						>
							<Link href={"/profile/" + user.id}>
								<img
									src={user.imageUrl}
									alt={user.username}
									className="w-24 h-24 rounded-full mb-4"
								/>
								<h2 className="text-white text-lg font-semibold">
									{user.username}
								</h2>
							</Link>
							<p className="text-gray-400">{user.mail}</p>
							<p className="text-gray-400">
								{user.isAlumni ? "Alumni" : "Student"}
							</p>
							<p className="text-gray-400">
								Interests: {user.interests}
							</p>
						</div>
					))}
				</Suspense>
			</div>
		</div>
	);
}
function SubmitButton() {
	const { pending } = useFormStatus();
	return (
		<button
			type="submit"
			className="px-4 py-2 bg-blue-600 text-white rounded-r-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
		>
			Search{pending ? "..." : ""}
		</button>
	);
}
