import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { type InferSelectModel, type InferInsertModel } from 'drizzle-orm'

import { user } from './user'

export const session = sqliteTable('user_session', {
	id: text('id').primaryKey(),
	userId: text('user_id').references(() => user.id, { onDelete: 'cascade' }),
	ipAddress: text('ip_address'),
	userAgent: text('user_agent'),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
	lastSeenAt: integer('last_seen_at', { mode: 'timestamp' }).notNull(),
	lastAuthAt: integer('last_auth_at', { mode: 'timestamp' }),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
	invalidatedAt: integer('invalidated_at', { mode: 'timestamp' }),
})

export type Session = InferSelectModel<typeof session>
export type NewSession = InferInsertModel<typeof session>
