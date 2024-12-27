import { db } from "@/db";
import { createPostData } from "./post.seed";

async function seed() {
	try {
		await Promise.all([createPostData()]);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
	await db.$disconnect();
	process.exit();
}

seed();
