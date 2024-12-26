"use client";
import { useFormStatus } from "react-dom";

export default function BlogButton() {
	const { pending } = useFormStatus();

	return (
		<button
			type="submit"
			className="p-3 bg-white text-black rounded-md border border-black"
		>
			Submit {pending ? "...." : ""}
		</button>
	);
}
