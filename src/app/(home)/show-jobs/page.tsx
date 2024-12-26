import JobCard from "@/components/JobCard";
import client from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

type Job = {
	id: number;
	title: string;
	content: string;
	authorId: number;
	collegeId: number;
};

async function getJob() {
	const user = await currentUser();
	try {
		const res = await client.user.findUnique({
			where: {
				mail: user?.emailAddresses[0].emailAddress,
			},
			select: {
				username: true,
				jobsCreated: true,
				imageUrl: true,
			},
		});
		if (res) return res.jobsCreated;
	} catch (error: any) {
		console.log(error);
		return new Error(error.message);
	}
}

export default async function ShowJobs() {
	// (This is for Admin)
	// Fetch User's Job Table
	// Update the userId with theri
	// "UserId" provided by Clerk

	const jobs = await getJob();
	console.log(jobs);

	return (
		<div className="min-h-screen text-white px-4 md:p-8 mx-auto">
			<div className="max-w-4xl mx-auto">
				<h1 className=" font-bold mx-auto mt-[10%] mb-[4%] text-base sm:text-lg md:text-xl lg:text-2xl xl:text-4xl">
					Your Posted Jobs
				</h1>
				<div>
					{Array.isArray(jobs) ? (
						jobs.map((job: Job) => (
							<JobCard key={job.id} job={job} />
						))
					) : (
						<div>Error loading jobs</div>
					)}
				</div>
			</div>
		</div>
	);
}
