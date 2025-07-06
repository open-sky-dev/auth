import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { type InferSelectModel, type InferInsertModel } from 'drizzle-orm'

import { user } from './user'

export const key = sqliteTable('user_key', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	type: text('type').notNull(),
	name: text('name'),
	credential: text('credential'),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})

export type Key = InferSelectModel<typeof key>
export type NewKey = InferInsertModel<typeof key>
