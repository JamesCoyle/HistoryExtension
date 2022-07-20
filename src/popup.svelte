<script>
	import { theme } from './stores/settings'

	import SearchHeader from './components/search-header.svelte'
	import HistoryItem from './components/history-item.svelte'
	import BottomButton from './components/bottom-button.svelte'

	import { mdiHistory } from '@mdi/js'

	let history = []
	let query = ''

	$: chrome.history.search({ text: query }, (items) => {
		history = items
	})

	function openHistoryTab() {
		chrome.tabs.create({ url: 'chrome://history' })
	}
</script>

<style>
	/* set size of popup window */
	:global(body) {
		width: 20rem;
		height: 32rem;
	}

	main {
		display: flex;
		flex-flow: column nowrap;
		height: 100%;
	}
</style>

<main class={$theme}>
	<SearchHeader bind:query />

	<div class="scrollable">
		{#each history as item (item.id)}
			<HistoryItem {item} />
		{/each}
	</div>

	<BottomButton icon={mdiHistory} action={openHistoryTab}>View full history</BottomButton>
</main>
