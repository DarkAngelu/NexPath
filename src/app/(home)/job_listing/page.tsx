import JobCard from "@/components/JobCard";
import client from "@/lib/db"
import { currentUser } from "@clerk/nextjs/server";
type Job = {
	id: number,
    title: string,
	content: string,
	authorId: number,
	collegeId:number
};
async function getjobs(){
	try{
		const user = await currentUser()
		if(user){
			const res = await client.user.findUnique({
				where:{
					mail:user.emailAddresses[0].emailAddress
				}
			})
			const collegeId = res?.collegeId
			const jobs = await client.college.findUnique({
				where:{
					id:collegeId
				},
				select: {
					job:true
				}
			});
			console.log(jobs)
			return jobs
		}
		else
		return null
	}
	catch(error:any){
		// console.error(error.message)
		return new Error(error.message)
	}
} 



export default async function DisplayAllJobs() {
	// (This is for user)
	// Fetch The Whole Job Table,
	// and assign it in "jobs"
	// and remove the dummies from here
	// also remember to assign TYPE JOB when fetching
	const jobs:any = await getjobs()
//    console.log(jobs)

	return (
		<div className="min-h-screen text-white px-4 md:p-8 mx-auto">
			<div className="max-w-4xl mx-auto">
				<h1 className=" font-bold mx-auto mb-[4%] text-base sm:text-md md:text-lg lg:text-xl xl:text-2xl">
					All Jobs
				</h1>
				<div>
					{Array.isArray(jobs.job) ? (
						jobs.job.map((job: Job) => (
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


// export default function job_listing() {
//   return (
//     <div>job_listing</div>
//   )
// }