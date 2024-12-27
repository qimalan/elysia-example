import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { Elysia, NotFoundError, error, t } from "elysia";
import { db } from "./db";
import { responseMiddleware } from "./middleware/response.middleware";
import { isJsonString } from "./utils/isJson";

const app = new Elysia()
	.use(cors())
	.use(swagger())
	.onError(({ code, error, set }) => {
		//旨在捕获和解决意外错误
		return {
			code,
			message: isJsonString(error.message)
				? JSON.parse(error.message)
				: error.message,
			status: set.status ?? 500,
		};
	})
	.use(responseMiddleware)
	.get(
		"/",
		async () => {
			// return await db.post.paginate({
			// 	limit: 10,
			// 	page: 1,
			// });
			return await db.post.findUnique({ where: { id: 1 } });
			// return error("Forbidden", {
			// 	code: "Forbidden",
			// 	message: "Please provide a name query parameter",
			// });
		},
		{
			query: t.Object({
				name: t.String(),
			}),
		},
	)
	.listen(3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
