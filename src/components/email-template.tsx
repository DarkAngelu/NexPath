import * as React from "react";
interface EmailTemplateProps {
	Details: string;
	email: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
	Details,
	email,
}) => (
	<div className="flex justify-center">
		<div className="bg-slate-300 p-8 rounded-lg">
			<h1>UserEmail</h1>
			<hr></hr>
			<p>{email}</p>
			<hr></hr>
			<p>{Details}</p>
		</div>
	</div>
);
