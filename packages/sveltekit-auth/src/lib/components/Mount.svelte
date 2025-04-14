<script lang="ts">
	import { page } from '$app/state'
	import { afterNavigate } from '$app/navigation'

	let metaTags = $state(page.data.metaTags)

	afterNavigate(() => {
		metaTags = page.data.metaTags
	})

	let combinedTitle = $derived.by(() => {
		if (metaTags.parentTitleTemplate && metaTags.title) {
			return metaTags.parentTitleTemplate.replace('{page}', metaTags.title)
		} else {
			return metaTags.title
		}
	})
</script>

<svelte:head>
	<!-- SEO: Cannonical URL -->
	{#if metaTags?.canonical}
		<meta property="og:url" content={metaTags?.canonical} />
	{/if}

	<!-- APPEARENCE: Icon -->
	{#if metaTags?.icon}
		{#if typeof metaTags?.icon === 'string'}
			<link rel="icon" href={metaTags?.icon} />
			<link rel="apple-touch-icon" href={metaTags?.icon} />
		{:else}
			{#if metaTags?.icon.svg}
				<link rel="icon" type="image/svg+xml" href={metaTags?.icon.svg} />
			{/if}
			{#if metaTags?.icon.small}
				<link
					rel="icon"
					type={metaTags?.icon.small.type || 'image/png'}
					href={metaTags?.icon.small.url}
				/>
			{/if}
			{#if metaTags?.icon.large}
				<link
					rel="icon"
					type={metaTags?.icon.small.type || 'image/png'}
					href={metaTags?.icon.small.url}
				/>
				<link
					rel="apple-touch-icon"
					type={metaTags?.icon.small.type || 'image/png'}
					href={metaTags?.icon.small.url}
				/>
			{/if}
		{/if}
	{/if}

	<!-- APPEARENCE: Safari Pinned Tab Icon -->
	{#if metaTags?.maskIcon}
		<link rel="mask-icon" href={metaTags?.maskIcon.url} color={metaTags?.maskIcon.color} />
	{/if}

	<!-- APPEARENCE: Theme Color -->
	{#if metaTags?.theme}
		{#if typeof metaTags?.theme === 'object'}
			<meta
				name="theme-color"
				content={metaTags?.theme.light}
				media="(prefers-color-scheme: light)"
			/>
			<meta
				name="theme-color"
				content={metaTags?.theme.dark}
				media="(prefers-color-scheme: dark)"
			/>
		{:else}
			<meta name="theme-color" content={metaTags?.theme} />
		{/if}
	{/if}

	<!-- APPEARENCE: Color Scheme -->
	{#if metaTags?.colorScheme}
		<meta name="color-scheme" content={metaTags?.colorScheme} />
	{/if}

	<!-- SHARING: Site Name -->
	{#if metaTags?.sitename}
		<meta property="og:site_name" content={metaTags?.sitename} />
	{/if}

	<!-- SHARING: Title -->
	{#if metaTags?.title}
		<title>{combinedTitle}</title>
		<meta property="og:title" content={combinedTitle} />
		<meta name="twitter:title" content={combinedTitle} />
	{/if}

	<!-- SHARING: Description -->
	{#if metaTags?.description}
		<meta name="description" content={metaTags?.description} />
		<meta property="og:description" content={metaTags?.description} />
		<meta name="twitter:description" content={metaTags?.description} />
	{/if}

	<!-- SHARING: Content Type -->
	{#if metaTags?.type}
		{#if typeof metaTags?.type === 'object'}
			<meta property="og:type" content={metaTags?.type.og} />
			<meta name="twitter:card" content={metaTags?.type.twitter} />
		{:else if metaTags?.type === 'article'}
			<meta property="og:type" content="article" />
			<meta name="twitter:card" content="summary" />
		{:else if metaTags?.type === 'largeImage'}
			<meta property="og:type" content="website" />
			<meta name="twitter:card" content="summary_large_image" />
		{:else if metaTags?.type === 'player'}
			<meta property="og:type" content="website" />
			<meta name="twitter:card" content="player" />
		{:else}
			<meta property="og:type" content="website" />
			<meta name="twitter:card" content="summary" />
		{/if}
	{/if}

	<!-- SHARING: Author -->
	{#if metaTags?.author}
		{#if Array.isArray(metaTags?.author)}
			<meta name="author" content={metaTags?.author.join(', ')} />
			{#each metaTags?.author as author}
				<meta property="article:author" content={author} />
			{/each}
		{:else}
			<meta name="author" content={metaTags?.author} />
			<meta property="article:author" content={metaTags?.author} />
		{/if}
	{/if}

	<!-- SHARING: Images -->
	{#if metaTags?.image}
		{#if typeof metaTags?.image === 'string'}
			<meta property="og:image" content={metaTags?.image} />
			<meta name="twitter:image" content={metaTags?.image} />
		{:else}
			<meta property="og:image" content={metaTags?.image.url} />
			{#if metaTags?.image.secureUrl}<meta
					property="og:image:secure_url"
					content={metaTags?.image.secureUrl}
				/>{/if}
			<meta name="twitter:image" content={metaTags?.image.url} />
			{#if metaTags?.image.width}<meta
					property="og:image:width"
					content={metaTags?.image.width}
				/>{/if}
			{#if metaTags?.image.height}<meta
					property="og:image:height"
					content={metaTags?.image.height}
				/>{/if}
			{#if metaTags?.image.type}<meta
					property="og:image:type"
					content={metaTags?.image.type}
				/>{/if}
			{#if metaTags?.image.alt}
				<meta property="og:image:alt" content={metaTags?.image.alt} />
				<meta name="twitter:image:alt" content={metaTags?.image.alt} />
			{/if}
		{/if}
	{/if}
	{#if metaTags?.images}
		{#each metaTags?.images as image, i}
			<!-- Set twitter:image only for the first image -->
			{#if i === 0}
				<meta name="twitter:image" content={image.url} />
				{#if image.alt}
					<meta name="twitter:image:alt" content={image.alt} />
				{/if}
			{/if}
			<meta property="og:image" content={image.url} />
			{#if metaTags?.image.secureUrl}<meta
					property="og:image:secure_url"
					content={metaTags?.image.secureUrl}
				/>{/if}
			{#if image.width}<meta property="og:image:width" content={image.width} />{/if}
			{#if image.height}<meta property="og:image:height" content={image.height} />{/if}
			{#if image.type}<meta property="og:image:type" content={image.type} />{/if}
			{#if image.alt}
				<meta property="og:image:alt" content={image.alt} />
			{/if}
		{/each}
	{/if}

	<!-- SHARING: Video -->
	{#if metaTags?.video}
		{#if typeof metaTags?.video === 'string'}
			<meta property="og:video" content={metaTags?.video} />
			<meta name="twitter:player" content={metaTags?.video} />
		{:else}
			<meta property="og:video" content={metaTags?.video.url} />
			<meta name="twitter:player" content={metaTags?.video.url} />
			{#if metaTags?.video.width}
				<meta property="og:video:width" content={metaTags?.video.width} />
				<meta name="twitter:player:width" content={metaTags?.video.width} />
			{/if}
			{#if metaTags?.video.height}
				<meta property="og:video:height" content={metaTags?.video.height} />
				<meta name="twitter:player:height" content={metaTags?.video.height} />
			{/if}
			{#if metaTags?.video.type}<meta
					property="og:video:type"
					content={metaTags?.video.type}
				/>{/if}
		{/if}
	{/if}
	<!-- [END] SHARING: Media (images or video) -->

	<!-- SEO: Date Published -->
	{#if metaTags?.date}
		<meta property="article:published_time" content={metaTags?.date} />
		<meta name="date" content={metaTags?.date} />
	{/if}

	<!-- SEO: Date Modified -->
	{#if metaTags?.modified}
		<meta property="article:modified_time" content={metaTags?.modified} />
		<meta name="last-modified" content={metaTags?.modified} />
	{/if}

	<!-- TWITTER: Site/Publisher Account -->
	{#if metaTags?.twitterSite}
		<meta name="twitter:site" content={metaTags?.twitterSite} />
	{/if}

	<!-- TWITTER: Creator Account -->
	{#if metaTags?.twitterCreator}
		<meta name="twitter:creator" content={metaTags?.twitterCreator} />
	{/if}

	<!-- Arbitrary meta, link, script tags -->
	{#each metaTags?.additionalTags as tag}
		{@const { tagType, ...attributes } = tag}
		{#if tagType === 'meta'}
			<meta {...attributes} />
		{:else if tagType === 'link'}
			<link {...attributes} />
		{:else if tagType === 'script'}
			<script {...attributes}></script>
		{/if}
	{/each}
</svelte:head>
