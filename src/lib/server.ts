"use server";

import { revalidatePath } from "next/cache";
import prisma from "./db";

export async function getAuthorByMail(mail: string) {
	try {
		const m = await prisma.user.findFirst({
			where: {
				mail: mail,
			},
		});
		return m;
	} catch {
		return null;
	}
}

export async function createInterviewLink(email: string) {
	try {
		const u = await getAuthorByMail(email);
		console.log(u?.isAlumni);
		if (!u?.isAlumni) {
			return "error";
		}

		const m = await prisma.webinar.create({
			data: {
				public: false,
				date: new Date(),
				authorId: u?.id as number,
				title: "interview",
				description: "interview",
				collegeId: u.collegeId,
			},
		});

		return m.id;
	} catch {
		return "error";
	}
}

export async function getAllPosts(userEmail: string) {
	try {
		const u = await getAuthorByMail(userEmail);
		const m = await prisma.post.findMany({
			where: {
				collegeId: u?.collegeId,
			},
		});
		return m;
	} catch {
		return "error";
	}
}

export async function getAllBlogs() {
	try {
		const blogs = await prisma.blog.findMany();
		return blogs;
	} catch {
		return "error";
	}
}

export async function addBlog(
	markdown: string,
	authorEmail: string,
	title: string
) {
	try {
		const id = await getAuthorByMail(authorEmail);
		const m = await prisma.blog.create({
			data: {
				content: markdown,
				authorId: id?.id as number,
				title: title,
				collegeId: id?.collegeId as number,
			},
		});
	} catch {
		return "error";
	}
}

export async function getBlogById(id: number) {
	try {
		const blog = await prisma.blog.findUnique({
			where: {
				id: id,
			},
		});
		return blog;
	} catch {
		return "error";
	}
}

export async function createDiscussion(
	title: string,
	img: string,
	description: string,
	AuthorEmail: string
) {
	try {
		const id = await getAuthorByMail(AuthorEmail);
		const m = await prisma.post.create({
			data: {
				title: title,
				image: img,
				description: description,
				authorId: id?.id as number,
				collegeId: id?.collegeId as number,
			},
		});
		revalidatePath("/discussion");
	} catch {
		return "error";
	}
}

export async function getWebinarById(id: number) {
	try {
		const c = await prisma.webinar.findUnique({
			where: {
				id: id,
			},
		});
		return c;
	} catch {
		return "error";
	}
}

export async function getWebinar(email: string) {
	try {
		const u = await getAuthorByMail(email);
		const c = await prisma.webinar.findMany({
			where: {
				public: true,
				collegeId: u?.collegeId,
			},
		});
		return c;
	} catch {
		return "error";
	}
}

export async function addWebinar(
	date: Date,
	title: string,
	description: string,
	mail: string
) {
	try {
		const author = await getAuthorByMail(mail);
		const authorId = author ? author.id : null;
		const admin = author ? author.isAlumni : null;
		if (admin !== null) {
			if (!admin) {
				return "error";
			}
		}
		await prisma.webinar.create({
			data: {
				date: date,
				description: description,
				title: title,
				authorId: authorId as number,
				collegeId: author?.collegeId as number,
			},
		});
		return "added !!";
	} catch {
		return "error";
	}
}

export async function getGeneralMessages(collegeId: number) {
	try {
		const m = await prisma.message.findMany({
			where: {
				general: true,
				collegeId: collegeId,
			},
		});
		return m;
	} catch {
		return [];
	}
}

export async function getAuthorById(id: number) {
	try {
		const m = await prisma.user.findFirst({
			where: {
				id: id,
			},
		});
		return m;
	} catch {
		return null;
	}
}

export async function getReccomendation(
	userEmail: string,
	text: string,
	same: boolean
) {
	try {
		if (same) {
			const u = await getAuthorByMail(userEmail);
			const m = await prisma.user.findMany({
				where: {
					collegeId: u?.collegeId as number,
				},
			});

			const k = [];

			const f = [];
			for (let i = 0; i < m.length; i++) {
				if (m[i].interests.includes(text) && m[i].id != u?.id) {
					f.push(m[i]);
					k.push(m[i].id);
				}
			}
			for (let i = 0; i < m.length; i++) {
				if (!k.includes(m[i].id)) {
					f.push(m[i]);
				}
			}
			return f;
		} else {
			const u = await getAuthorByMail(userEmail);
			const m = await prisma.user.findMany();

			const k = [];

			const f = [];
			for (let i = 0; i < m.length; i++) {
				if (m[i].interests.includes(text) && m[i].id != u?.id) {
					f.push(m[i]);
					k.push(m[i].id);
				}
			}
			for (let i = 0; i < m.length; i++) {
				if (!k.includes(m[i].id)) {
					f.push(m[i]);
				}
			}
			return f;
		}
	} catch {
		return "error";
	}
}
