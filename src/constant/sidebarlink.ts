export const links = [
	{
		label: "Home",
		route: "/home",
		imgUrl: "/icons/house.svg",
	},
	{
		label: "Webinar",
		route: "/webinars",
		imgUrl: "/icons/video.svg",
	},
	{
		label: "Job Listing",
		route: "/job_listing",
		imgUrl: "/icons/list-check.svg",
	},
	{
		parent: "Messaging",
		child: [
			{
				label: "General Chat",
				route: "/generalchat",
				imgUrl: "/icons/send.svg",
			},
			{
				label: "Discussion",
				route: "/discussion",
				imgUrl: "/icons/speech.svg",
			},
			{
				label: "Blogs",
				route: "/blogs",
				imgUrl: "/icons/scroll-text.svg",
			},
		],
	},
	{
		parent: "Alumni",
		child: [
			{
				label: "Job Opening",
				route: "/job_open",
				imgUrl: "/icons/job_open.svg",
			},
			{
				label: "Host Webinar",
				route: "/host_webinar",
				imgUrl: "/icons/host_webinar.svg",
			},
		],
	},
];
