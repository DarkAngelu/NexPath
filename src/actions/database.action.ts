"use server";
import client from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
export async function insert(interests: string, id: number) {
	console.log(interests + " " + id);
	try {
		const user = await currentUser();
		// const presence = await client.user.findUnique({
		//     where: {
		//         mail:String(user?.primaryEmailAddress?.emailAddress),
		//     },
		//   })
		// if(presence)
		//     return {msg:"already there"}
		if (user) {
			console.log(user.username?.toString());
			console.log(user.username?.toString());
			console.log(user.username?.toString());
			console.log(user.username?.toString());

			const res = await client.user.create({
				data: {
					username: user.username?.toString(),
					mail: user.emailAddresses[0].emailAddress,
					imageUrl: user.imageUrl,
					collegeId: id,
					interests: interests,
				},
			});
			return { msg: "Inserted" };
		} else return { msg: "User not there" };
	} catch (error: any) {
		return { msg: error.message };
	}
}
export async function isPresent(mail: String) {
	console.log(mail + "dnfknsdkjfnkldsklfj");
	try {
		const user = await client.user.findUnique({
			where: {
				mail: String(mail),
			},
		});
		return user;
	} catch (error: any) {
		return new Error(error.message);
	}
}
export async function isAlumnicheck(mail: String) {
	try {
		const user = await client.user.findUnique({
			where: {
				mail: String(mail),
			},
		});
		return user?.isAlumni ? "true" : "false";
	} catch (error: any) {
		return new Error(error.message);
	}
}
