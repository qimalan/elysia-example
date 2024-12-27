import Elysia from "elysia";
import type { PaginationResult } from "prisma-paginate";
import { omit } from "radash";

export const responseMiddleware = new Elysia().onAfterHandle(
	{ as: "scoped" },
	({ response, set }) => {
		const baseResponse = {
			message: "success",
			data: response,
			status: set.status ?? 200,
		};

		// 检查是否为分页响应
		if (!("limit" in response && "page" in response)) {
			return baseResponse;
		}
		const paginatedResponse = response as PaginationResult;
		return {
			...omit(baseResponse, ["data"]),
			data: paginatedResponse.result,
			meta: {
				itemCount: paginatedResponse.result.length,
				totalItems: paginatedResponse.count,
				totalPages: paginatedResponse.totalPages,
				pageSize: paginatedResponse.limit,
				pageNum: paginatedResponse.page,
			},
		};
	},
);
