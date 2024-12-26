"use client";

import BorderMagicButton from "@/components/BorderMagicButton";
import { useRouter } from "next/navigation";
import ShimmerButton from "@/components/ShimmerButton";
import { Card } from "@/components/ui/card";

export default function Home() {
	const router = useRouter();
	return (
		<>
			<div className="flex flex-col items-center sm:justify-evenly min-h-screen p-4 space-y-4 text-white">
				<div className="flex flex-col flex-center gap-[0.5rem] text-center ">
					<ShimmerButton
						text="Post Job"
						onClick={() => router.push("/post-job")}
						className="w-[50%] text-xs sm:text-sm lg:text-base xl:text-xl"
					/>
					<p className=" flex items-center text-xs sm:text-sm lg:text-base xl:text-xl text-muted-foreground">
						Click above to post a new job opportunity
					</p>
				</div>

				<main className="overflow-auto max-w-[800px]">
					<Card className="p-6 bg-slate-950 text-slate-50 ">
						<h2 className="text-xs sm:text-sm lg:text-base xl:text-xl font-semibold mb-4">
							How to Use Markdown
						</h2>
						<div className="space-y-2 text-xs sm:text-sm lg:text-base xl:text-xl">
							<p>
								Markdown is a lightweight markup language for
								formatting text. Here are some basic syntax
								examples:
							</p>
							<ul className="list-disc list-inside">
								<li>
									<code># Heading 1</code> - Creates a large
									heading
								</li>
								<li>
									<code>## Heading 2</code> - Creates a
									smaller heading
								</li>
								<li>
									<code>- Item</code> or <code>* Item</code> -
									Creates a bullet point
								</li>
								<li>
									<code>1. Item</code> - Creates a numbered
									list
								</li>
								<li>
									<code>**Bold**</code> - Makes text bold
								</li>
								<li>
									<code>*Italic*</code> - Makes text italic
								</li>
								<li>
									<code>[Link](http://example.com)</code> -
									Creates a hyperlink
								</li>
							</ul>
							<p>
								Use Markdown to format your job postings and
								make them more readable and organized.
							</p>
						</div>
					</Card>
				</main>

				<div className="flex gap-[3rem] text-center">
					<ShimmerButton
						text="Show Jobs"
						onClick={() => router.push("/show-jobs")}
						className=" text-xs sm:text-sm lg:text-base xl:text-xl"
					/>
					<p className=" flex items-center text-xs sm:text-sm lg:text-base xl:text-xl text-muted-foreground">
						View all posted job opportunities
					</p>
				</div>
			</div>
		</>
	);
}
