"use client";
import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { addWebinar } from "@/lib/server";
import { useUser } from "@clerk/nextjs";
import { useFormStatus } from "react-dom";

export default function DatePickerDemo() {
	const { isLoaded, user } = useUser();
	if (!isLoaded) {
		return <div>Loading user...</div>;
	}
	const userEmail = user?.primaryEmailAddress?.toString();
	const [date, setDate] = useState<Date>();
	const [title, setTitle] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [time, setTime] = useState<string>("");
	// const [loading , setLoading] = useState<boolean>(false);

	return (
		<div className="flex flex-col items-center text-white">
			<p className="font-bold mb-1 text-xl">Webinar Details</p>
			<form
				className="w-2/4"
				action={async () => {
					// setLoading(true);
					const [hr, min] = time.split(":").map(Number);
					date?.setHours(hr);
					date?.setMinutes(min);
					const res = await addWebinar(
						date as Date,
						title,
						description,
						userEmail as string
					);
					// setLoading(false);
					if (res == "error") {
						alert("You are not an alumni !!");
					}
				}}
			>
				<div className="mb-4">
					<label className="block text-sm font-medium text-white">
						Title
					</label>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-800 text-white"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-white">
						Description
					</label>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="mt-1 h-28 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-800 text-white"
					/>
				</div>
				<div className="mb-4 flex gap-2">
					<div className="w-1/2">
						<input
							type="time"
							value={time}
							onChange={(e) => setTime(e.target.value)}
							className="p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-800 text-white"
						/>
					</div>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant={"outline"}
								className={cn(
									"w-full justify-start text-left font-normal bg-gray-800 text-white",
									!date && "text-muted-foreground"
								)}
							>
								<CalendarIcon className="mr-2 h-4 w-4" />
								{date ? (
									format(date, "PPP")
								) : (
									<span>Pick a date</span>
								)}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0 bg-gray-800 text-white">
							<Calendar
								mode="single"
								selected={date}
								onSelect={setDate}
								initialFocus
							/>
						</PopoverContent>
					</Popover>
				</div>
				<WebinarButton />
			</form>
		</div>
	);
}
function WebinarButton() {
	const { pending } = useFormStatus();
	return (
		<button
			type="submit"
			className="p-2 bg-gray-700 rounded-md w-full hover:bg-gray-500"
		>
			Create{pending ? "..." : ""}
		</button>
	);
}
