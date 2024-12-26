import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BackgroundBeams } from "@/components/ui/background-beams";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, Clock, User } from "lucide-react";
import client from "@/lib/db";
async function getData(id: number) {
	try {
		const response: any = await client.user.findUnique({
			where: {
				id: id,
			},
			include: {
				webinars: true,
				blogs: true,
			},
		});
		return response;
	} catch (error: any) {
		console.log(error);
		return new Error(error.message);
	}
}
export default async function Component({
	params,
}: {
	params: { id: string };
}) {
	const res = await getData(parseInt(params.id));

	const webinars = res.webinars;
	const blogs = res.blogs;
	const isAlumni: boolean = res.isAlumni;
	const url: string = res.imageUrl;

	return (
		<div className="container relative px-4 py-8 flex-center ">
			<BackgroundBeams />
			<div className="flex gap-10 relative max-md:flex-col h-full">
				<div className="max-md:w-full w-1/3">
					<div className="sticky top-8 left-0">
						<Card className="bg-gray-800 lg:h-[91vh] sticky top-0 border-black backdrop-blur-sm">
							<CardHeader className="flex flex-col items-center space-y-4">
								<Avatar className="h-24 w-24">
									<AvatarImage
										alt="User's avatar"
										src={url}
									/>
									<AvatarFallback>
										{res.username.charAt(0).toUpperCase()}
									</AvatarFallback>
								</Avatar>
								<div className="space-y-1 text-center flex flex-col gap-2">
									<h1 className="text-2xl font-bold text-slate-500">
										{res.username}
									</h1>
									<p className="text-muted-foreground">
										{isAlumni ? "Alumni" : "Student"}
									</p>
								</div>
							</CardHeader>
							<CardContent className="space-y-4 flex-center gap-3">
								<div className="flex mt-3 flex-col items-center space-x-2">
									<User className="h-4 w-4 opacity-70 text-white" />
									<span className="text-sm text-muted-foreground">
										Member since 2021
									</span>
								</div>
								{isAlumni && (
									<div className="flex flex-col items-center space-x-2">
										<CalendarDays className="h-4 w-4 opacity-70 text-white" />
										<span className="text-sm text-muted-foreground">
											{webinars.length} Webinars Hosted
										</span>
									</div>
								)}
								<div className="flex flex-col items-center space-x-2">
									<Clock className="h-4 w-4 opacity-70 text-white" />
									<span className="text-sm text-muted-foreground">
										{blogs.length} Blog posts
									</span>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
				<div className="space-y-6 lg:w-[56vw]">
					<Tabs
						defaultValue="webinars"
						className="flex flex-col gap-5 backdrop-blur-sm"
					>
						<TabsList className={"grid grid-cols-2 bg-gray-800 "}>
							{isAlumni && (
								<TabsTrigger
									value="webinars"
									className="data-[state=active]:bg-gray-300 data-[state=active]:text-gray-800 data-[state=active]:font-extrabold data-[state=active]:tracking-widest"
								>
									Webinars
								</TabsTrigger>
							)}
							<TabsTrigger
								value="blogs"
								className="data-[state=active]:bg-gray-300 data-[state=active]:text-gray-800 data-[state=active]:font-extrabold data-[state=active]:tracking-widest"
							>
								Blogs
							</TabsTrigger>
						</TabsList>
						<TabsContent value="webinars" className="space-y-4">
							{webinars.map((item: any) => {
								return (
									<Card
										key={webinars.id}
										className="bg-gray-800 border-black"
									>
										<CardHeader className="flex gap-3">
											<CardTitle className="text-white ">
												{item.title}
											</CardTitle>
											<CardDescription className="">
												{item.description}
											</CardDescription>
										</CardHeader>
										<CardContent>
											<p className="text-sm text-muted-foreground">
												Date:{" "}
												{item.date
													.toString()
													.substring(0, 15)}
											</p>
										</CardContent>
									</Card>
								);
							})}
						</TabsContent>
						<TabsContent value="blogs" className="space-y-4">
							{blogs.map((item: any) => {
								return (
									<Card
										key={item.id}
										className="bg-gray-800 border-black"
									>
										<CardHeader className="flex gap-3">
											<CardTitle className="text-white">
												{blogs.title} title
											</CardTitle>
										</CardHeader>
									</Card>
								);
							})}
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	);
}
