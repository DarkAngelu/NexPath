import JobCardTemplate from "./JobCardTemplate";
import client from "@/lib/db";
type Job = {
	id: number;
	title: string;
	content: string;
	authorId: number;
	collegeId: number;
};
async function postjobs(userId: number) {
	try {
		const user = await client.user.findUnique({
			where: {
				id: userId,
			},
			select: {
				username: true,
				jobsCreated: true,
				imageUrl: true,
			},
		});
		if (user) return user;
	} catch (error: any) {
		return new Error(error.message);
	}
}

export default async function JobCard({ job }: { job: Job }) {
	const userId = job.authorId;

	const user: any = await postjobs(userId);

	return (
		<JobCardTemplate
			authorId={job.authorId}
			title={job.title}
			content={job.content}
			username={user.username}
			imageUrl={user.imageUrl}
		/>
	);
}
