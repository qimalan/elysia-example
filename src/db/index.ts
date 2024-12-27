import { Prisma, PrismaClient } from "@prisma/client";
import { extension } from "prisma-paginate";

export const db = new PrismaClient().$extends(extension).$extends({
	name: "truncate",
	model: {
		$allModels: {
			async $truncate<Model>(this: Model) {
				const ctx = Prisma.getExtensionContext(this);
				const model = Prisma.dmmf.datamodel.models.find(
					(m) => m.name === ctx.$name,
				);
				const tableName = model?.dbName ?? ctx.$name;

				const sql = `TRUNCATE TABLE ${tableName};`;
				await db.$transaction([
					db.$executeRawUnsafe("SET FOREIGN_KEY_CHECKS=0;"),
					db.$executeRawUnsafe(sql),
					db.$executeRawUnsafe("SET FOREIGN_KEY_CHECKS=1;"),
				]);
			},
		},
	},
});
