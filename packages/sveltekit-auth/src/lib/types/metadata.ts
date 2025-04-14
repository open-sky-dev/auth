export type Metadata = {
	/** Canonical URL for the page */
	canonical?: string // og:url link:rel:canonical

	icon?: string | IconOpinionated

	/** Used for Safari Pinned Tabs */
	maskIcon?: {
		/** Should provide an svg file */
		url: string
		/** Should provide a color in a hex value */
		color?: string
	}

	/**
	 * Theme color for the browser UI elements
	 * You can provide a single string (hex, rgb, etc.)
	 * or an object with { light, dark } variants.
	 */
	theme?:
		| string
		| {
				light: string
				dark: string
		  }

	/** Color scheme preference for the page */
	colorScheme?: string // meta:color-scheme

	// Basic Data
	sitename?: string // og:sitename

	/** @maxLength 70 chars for Twitter */
	title?: string // og:title meta:title

	/**
	 * Template for constructing children page titles
	 * Example: "Reviews - {page}"
	 */
	titleTemplate?: string // used to infer og:title meta:title twitter:title

	/** @maxLength 200 chars for Twitter */
	description?: string // og:description twitter:description meta:description

	/** Content Author(s) */
	author?: string | Array<string> // meta:author og:author

	/** The X Account for the publishing site */
	twitterSite?: string // twitter:site

	/** The X Account for the author/creator of this page */
	twitterCreator?: string // twitter:creator

	/**
	 * Publication Date
	 * @format ISO 8601 */
	date?: string // og meta

	/** Last Modified Date */
	modified?: string // og:modified-time meta:modified meta:last-modified

	/**
	 * Content type configuration
	 * Used to determine appropriate meta tags and social card formats
	 */
	type?: ContentType
} & ImageConfig &
	VideoConfig

type IconOpinionated = {
	svg?: string
	small?: {
		url: string
		size: number
		type?: string
	}
	large?: {
		url: string
		size: number
		type?: string
	}
}

type ContentType = 'basic' | 'article' | 'largeImage' | 'player' | ContentTypeAdvanced
type ContentTypeAdvanced = {
	twitter: 'summary' | 'largeImage' | 'player'
	og: 'website' | 'article'
}

/**
 * Media object configuration
 */
type Media = {
	/** Primary URL for the media resource */
	url: string
	/** HTTPS URL for the media resource */
	secureUrl?: string
	/** MIME type of the media */
	type?: string
	/** Width in pixels */
	width?: number
	/** Height in pixels */
	height?: number
	/** Alt text description */
	alt?: string
}
// Make image/images mutually exclusive
type ImageConfig =
	| { image: string | Media; images?: never }
	| { image?: never; images: Array<Media> }
	| { image?: never; images?: never }
// Make video/videos mutually exclusive
type VideoConfig = {
	video?: string | Media
}

export type ParentMetadata = Metadata & {
	/** Used internally to distinguish inheritance of title template */
	parentTitleTemplate?: string
}
