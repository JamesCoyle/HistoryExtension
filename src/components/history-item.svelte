<script>
	export let item

	$: iconUrl = getFaviconUrl(item.url)

	function getFaviconUrl(url) {
		let faviconUrl = new URL(`chrome-extension://${chrome.runtime.id}/_favicon/`)
		faviconUrl.searchParams.append('pageUrl', url)
		faviconUrl.searchParams.append('size', '16')
		return faviconUrl.href
	}

	function openInNewTab() {
		chrome.tabs.create({ url: item.url })
	}
</script>

<style>
	.item {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		width: 100%;
		min-height: 3rem;
		padding: 0 1rem;
		overflow: hidden;
	}

	.title,
	.url {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.url {
		font-size: 80%;
		opacity: 0.5;
	}

	.icon {
		flex: 0 0 1rem;
		height: 1rem;
		margin-right: 1rem;
	}

	.info {
		display: flex;
		flex-flow: column nowrap;
		flex: 1;
		min-width: 0;
	}
</style>

<button class="item" title={item.title} on:click={openInNewTab}>
	<img class="icon" src={iconUrl} alt="" />
	<div class="info">
		<span class="title">{item.title}</span>
		<span class="url">{item.url}</span>
	</div>
</button>
