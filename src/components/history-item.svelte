<script>
	export let item

	// todo : replace this with chrome.favicon api once available - https://bugs.chromium.org/p/chromium/issues/detail?id=104102
	let iconUrl = new URL('https://www.google.com/s2/favicons')
	iconUrl.searchParams.append('domain', item.url)
	iconUrl.searchParams.append('sz', 16)

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
	<img class="icon" src={iconUrl.href} alt="" />
	<div class="info">
		<span class="title">{item.title}</span>
		<span class="url">{item.url}</span>
	</div>
</button>
