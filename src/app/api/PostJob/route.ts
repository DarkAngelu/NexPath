import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

// "PostTabs.tsx" uses it
export async function POST(req: NextRequest) {
	// Update the authorId with the
	// "UserId" provided by Clerk

	const { heading, markdown } = await req.json();

	try {
		const user = await currentUser();
		if (user) {
			const res = await client.user.findUnique({
				where: {
					mail: user.emailAddresses[0].emailAddress,
				},
			});
			const collegeId = res?.collegeId;
			const authorId = res?.id;
			const jobCreated = await client.job.create({
				data: {
					title: heading,
					content: markdown,
					author: {
						connect: {
							id: authorId,
						},
					},
					college: {
						connect: {
							id: collegeId,
						},
					},
				},
			});
			console.log(jobCreated);

			return NextResponse.json({
				message: "Job Created",
				jobCreated,
			});
		}
	} catch (e) {
		console.error("Error creating job: " + e);

		return NextResponse.json({
			error: "Error creating job",
		});
	}
}
