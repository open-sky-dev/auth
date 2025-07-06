import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { type InferSelectModel, type InferInsertModel } from 'drizzle-orm'

import { session } from './session'

export const authAttempt = sqliteTable('auth_attempt', {
	id: text('id').primaryKey(),
	identifier: text('identifier').notNull(),
	sessionId: text('session_id')
		.references(() => session.id, { onDelete: 'cascade' })
		.notNull(),
	type: text('type').notNull(),
	credential: text('credential'),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
})

export type AuthAttempt = InferSelectModel<typeof authAttempt>
export type NewAuthAttempt = InferInsertModel<typeof authAttempt>
