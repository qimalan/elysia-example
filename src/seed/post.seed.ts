import { db } from "@/db";
import { random, range } from "radash";
import { faker } from "./facker";

export const createPostData = async () => {
	await db.post.$truncate();

	for (const element of range(1, 22)) {
		await db.post.create({
			data: {
				title: faker.lorem.paragraph({ min: 1, max: 3 }),
				content:
					Math.random() < 0.5
						? faker.lorem.paragraphs(random(3, 6), "\n")
						: null,
			},
		});
	}
};
