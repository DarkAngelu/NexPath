"use client";

import { createContext, useContext, useState } from "react";

const HeadingContext = createContext<any>(null);

export function HeadingProvider({ children }: any) {
	const [heading, $heading] = useState<string>();

	function updateHeading(content: string): void {
		$heading(content);
	}

	return (
		<HeadingContext.Provider value={{ heading, updateHeading }}>
			{children}
		</HeadingContext.Provider>
	);
}

export function useHeading() {
	return useContext(HeadingContext);
}
