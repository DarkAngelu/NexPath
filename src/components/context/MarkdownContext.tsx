"use client";
import { createContext, useContext, useState } from "react";

const MarkdownContext = createContext<any>(null);

export function MarkdownProvider({ children }: any) {
	const [markdown, $markdown] = useState<string>(`# [Job Title]

## Job Description

[Provide a detailed description of the job role, responsibilities, and expectations. Include information about the company, team, and any other relevant details.]

## Required Skills

- [Skill 1]
- [Skill 2]
- [Skill 3]
- [Skill 4]
- [Skill 5]

## Important Links

- Company Website: [URL]
- Company LinkedIn: [URL]
- Department Page: [URL]
- Job Posting: [URL]

## Application

To apply for this position, please submit your application through the following link:

[Application Form URL]

If you have any questions about the application process, please contact [contact email or phone number].`);

	function updateMarkdown(content: string): void {
		$markdown(content);
	}

	return (
		<MarkdownContext.Provider value={{ markdown, updateMarkdown }}>
			{children}
		</MarkdownContext.Provider>
	);
}

export function useMarkdown() {
	return useContext(MarkdownContext);
}
