import type { LoadEvent } from '@sveltejs/kit'
import type { ParentMetadata } from './metadata'

/**
 * Context object passed to the LoadFunctionCallback.
 */
export type AdvancedLoadContext = {
	// The original SvelteKit LoadEvent (provides params, data, fetch, url, etc.)
	event: LoadEvent // Use LoadEvent, works for page/layout .ts files
	// Extracted meta tags from the parent data, or null if none
	parentTags: ParentMetadata | null
}

/**
 * The type for the callback function provided by the user to advancedMetaLoad.
 * It receives context including the LoadEvent and pre-fetched parentTags.
 * It's responsible for returning page-specific props (including metaTags generated
 * via parseMeta) or a Response object.
 */
export type LoadFunctionCallback = (context: AdvancedLoadContext) =>
	| Promise<Record<string, any> | Response> // Added Response here
	| Record<string, any>
	| Response // And here
