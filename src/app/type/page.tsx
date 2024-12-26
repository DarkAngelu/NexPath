"use client";
import React, { useEffect, useState } from "react";
import { insert, isPresent } from "@/actions/database.action";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Loading from "./loading";
import { useFormStatus } from "react-dom";

const type = () => {
	const { user } = useUser();
	const router = useRouter();

	useEffect(() => {
		async function check() {
			// console.log(user)
			const res = await isPresent(
				String(user?.primaryEmailAddress?.emailAddress)
			);
			// console.log(res)
			if (res) {
				router.push("/home");
			} else return <Loading />;
		}
		check();
	}, []);

	const [formdata, setFormdata] = useState({
		collegename: "SOA",
		interests: "",
	});
	function handlechange(e: any) {
		setFormdata({ ...formdata, [e.target.name]: e.target.value });
	}
	async function handleSubmit() {
		console.log(formdata);
		let id;
		try {
			if (formdata.collegename === "SOA") id = 2;
			else if (formdata.collegename === "KIIT") id = 3;
			else id = 4;
			const res = await insert(formdata.interests, id);
			router.push("/home");
		} catch (error: any) {
			console.log(error.message);
		}
	}
	return (
		<div className="flex-center h-screen w-full bg-gradient-to-b from-gray-800 to-black">
			<form
				action={async (e) => {
					await handleSubmit();
				}}
				className="mt-10 w-3/4 md:w-1/2 flex flex-col gap-10 bg-gradient-to-b from-gray-800 to-black p-5 rounded-2xl"
			>
				<label className="flex flex-col gap-3 ">
					<p className="text-white font-black">College Name</p>

					<select
						id="countries"
						name="collegename"
						onChange={handlechange}
						className="bg-slate-700 h-12 border-none outline-none text-sm rounded-lg  block w-full p-3 text-slate-200   font-extrabold "
						required
					>
						<option value="SOA">SOA</option>
						<option value="KIIT">KIIT</option>
						<option value="SIT">SIT</option>
					</select>
				</label>
				<label className="flex flex-col gap-3 ">
					<p className="text-white font-black">Interests</p>
					<textarea
						name="interests"
						rows={3}
						value={formdata.interests}
						onChange={handlechange}
						className="bg-slate-700 text-slate-200 rounded-lg border-none outline-none p-5"
						placeholder="What's your interests ?"
					/>
				</label>
				<SubmitButton />
			</form>
		</div>
	);
};

function SubmitButton() {
	const { pending } = useFormStatus();

	return (
		<button
			type="submit"
			className="bg-gray-800 h-10 shadow-xl rounded-lg  text-white"
		>
			Submit{pending ? "..." : ""}
		</button>
	);
}

export default type;
