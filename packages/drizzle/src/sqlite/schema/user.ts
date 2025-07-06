import {
	integer,
	sqliteTable,
	text,
	uniqueIndex,
	type AnySQLiteColumn
} from 'drizzle-orm/sqlite-core'
import { type InferSelectModel, type InferInsertModel, SQL, sql } from 'drizzle-orm'

export const user = sqliteTable(
	'user',
	{
		id: text('id').primaryKey(),
		name: text('name'),
		identifier: text('identifier').notNull().unique(),
		lastSeenAt: integer('last_seen_at', { mode: 'timestamp' }).notNull(),
		createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
	},
	(table) => [uniqueIndex('emailUniqueIndex').on(lower(table.identifier))]
)

export function lower(identifier: AnySQLiteColumn): SQL {
	return sql`lower(${identifier})`
}

export type User = InferSelectModel<typeof user>
export type NewUser = InferInsertModel<typeof user>
