<script>
	import IconButton from './icon-button.svelte'

	import { mdiCog, mdiMagnify } from '@mdi/js'

	export let placeholder = "Search"
	export let query = ''

	function openOptionsPage() {
		chrome.runtime.openOptionsPage()
	}
</script>

<style>
	header {
		display: flex;
		flex-flow: row nowrap;
		border-bottom: 1px solid var(--hover-color);
	}

	svg {
		width: 1.5rem;
		height: 1.5rem;
		margin: 0.75rem;
		fill: #8ab4f8;
	}

	input {
		flex: auto;
		background-color: transparent;
		outline: none;
		border: none;
		margin: 0;
		padding: 0;
	}
</style>

<header>
	<svg width="24" height="24" viewBox="0 0 24 24">
		<path d={mdiMagnify} />
	</svg>
	<!-- svelte-ignore a11y-autofocus -->
	<input type="search" {placeholder} autofocus bind:value={query} />
	<IconButton description="Open options page" icon={mdiCog} action={openOptionsPage} />
</header>
