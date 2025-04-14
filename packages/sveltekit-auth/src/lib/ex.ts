import type { Metadata, ParentMetadata } from './types/metadata'
import type { LoadFunctionCallback, AdvancedLoadContext } from './types/advanced-load'
import type { Load, LoadEvent, ServerLoadEvent } from '@sveltejs/kit'

let DEBUG = false

export function enableDebug(enable: boolean = true) {
	DEBUG = enable
}

/**
 * Parse and merge metadata from parent and current tags
 * @param parentTags Metadata from parent layout (optional)
 * @param setTags Metadata to set for current route
 * @returns Object with merged metaTags
 */
export function parseMeta(parentTags: ParentMetadata | null, setTags: Metadata): { metaTags: any } {
	if (DEBUG) console.log('parse start', performance.now())

	if (DEBUG) console.log('Parent', parentTags)
	if (DEBUG) console.log('SET', setTags)

	// Handle character limit on title
	if (setTags.title && setTags.title.length > 70) {
		console.warn('Title exceeds recommended length of 70 characters')
	}

	// Handle character limit on description
	if (setTags.description && setTags.description.length > 200) {
		console.warn('Description exceeds recommended length of 200 characters')
	}

	// Handle mutual exclusivity for image/images
	if ('image' in setTags && 'images' in setTags) {
		console.warn('Both image and images properties specified - using images and ignoring image')
		const { image, ...restData } = setTags
		setTags = restData
	}

	// Handle mutual exclusivity for video/videos
	if ('video' in setTags && 'videos' in setTags) {
		console.warn('Both video and videos properties specified - using videos and ignoring video')
		const { video, ...restData } = setTags
		setTags = restData
	}

	// Handle titles and title templates
	let safeParentTags: Partial<ParentMetadata> = parentTags ? { ...parentTags } : {}
	// if we set a titleTemplate, then pass that through, if we inherit a titleTemplate, make that the parentTitleTemplate
	if (safeParentTags.titleTemplate) {
		safeParentTags.parentTitleTemplate = safeParentTags.titleTemplate
		delete safeParentTags?.titleTemplate
	}

	if (DEBUG) console.log('parse returning', performance.now())

	return {
		metaTags: { ...safeParentTags, ...setTags }
	}
}

/**
 * Helps create a base layout load function that resets metadata cascade
 * @param metaTags Base metadata
 * @returns SvelteKit load function
 */
export function baseMetaLoad(metaTags: Metadata): Load {
	if (DEBUG) console.log('base meta load', performance.now())
	return async ({ parent, data }) => {
		const parentData = await parent()
		const { parentMetaTags, ...parentRest } = parentData

		return {
			...parentRest,
			...data,
			...parseMeta(null, metaTags)
		}
	}
}

/**
 * Helps create a layout load function that merges metadata with parent
 * @param metaTags Metadata for this layout
 * @returns SvelteKit load function
 */
export function layoutMetaLoad(metaTags: Metadata): Load {
	if (DEBUG) console.log('layout meta load', performance.now())
	return async ({ parent, data }) => {
		const parentData = await parent()
		const parentTags = parentData.metaTags as ParentMetadata
		return {
			...parentData,
			...data,
			...parseMeta(parentTags, metaTags)
		}
	}
}

/**
 * Helps create a page load function that sets page metadata
 * @param metaTags Page metadata
 * @returns SvelteKit load function
 */
export function pageMetaLoad(metaTags: Metadata): Load {
	if (DEBUG) console.log('page meta load', performance.now())
	return async ({ parent, data }) => {
		const parentData = await parent()
		const parentTags = parentData.metaTags as ParentMetadata
		return {
			...parentData,
			...data,
			...parseMeta(parentTags, metaTags)
		}
	}
}

/**
	 * Helps to create a SvelteKit Load function that handles merging parent/server
	 * data while you provide the core page logic in a callback.
	 *
	 * The wrapper automatically merges `parentData`, `serverData`, and your callback's
	 * result. (Redirects/errors from server load functions automatically pass through).
	 *
	 * Your callback `loadFunction` receives `{ event, parentTags }` that it can use.
	 * 
	 * @param {LoadFunctionCallback} loadFunction Callback receiving `{ event, parentTags }`, returning page props object or `Response`.
	 * @returns {import('@sveltejs/kit').Load} A SvelteKit `Load` function.
	 * @example
	 * ```typescript
	 * export const load = MetaTags.advancedMetaLoad(async ({ event, parentTags }) => {
	 *     const { slug } = event.params;
	 *     const metaResult = MetaTags.parseMeta(parentTags, { title: `Post: ${slug}` });
	 *     // Return custom props + meta result
	 *     return { postSlug: slug, ...metaResult };
	 * });
	 * ```
	 */
export function advancedMetaLoad(loadFunction: LoadFunctionCallback): Load {
	return async (event: LoadEvent) => {
		const parentData = await event.parent()
		const parentTags = (parentData?.metaTags as ParentMetadata) || null
		const serverData = event.data
		
		const pageCallbackData = await loadFunction({ event, parentTags })
		
		return {
			...parentData, // Include inherited layout data
			...serverData, // Include data returned from server load data if exists
			...pageCallbackData // Include the data returned from the callback function executed
		}
	}
}

export { default as MetaTags } from './components/Mount.svelte'

export * from './types/metadata'

export default {
	parseMeta,
	layoutMetaLoad,
	baseMetaLoad,
	pageMetaLoad,
	advancedMetaLoad
}
