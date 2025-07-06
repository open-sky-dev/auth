import type { BaseSQLiteDatabase } from 'drizzle-orm/sqlite-core'
import { eq } from 'drizzle-orm'
import * as table from '../schema'

export function adapter(db: BaseSQLiteDatabase<any, any, any, any>) {
	return {
		test: 'Hello World',
		getUser(identifier: string) {
			const foundUser = db
				.select({ createdAt: table.user.createdAt })
				.from(table.user)
				.where(eq(table.user.identifier, identifier))
				.limit(1)
		},
	}
}
