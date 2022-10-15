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

	// mockup UI data for screenshots
	window.mockup = function () {
		history = [
			{ id: '6321', lastVisitTime: 1665857823386.354, title: 'History Viewer Settings', typedCount: 3, url: 'chrome-extension://nfpokahblifhkfceaanoegmmhmkgjgcc/options.html', visitCount: 9 },
			{ id: '6304', lastVisitTime: 1665857788303.885, title: 'GitHub: Where the world builds software · GitHub', typedCount: 0, url: 'https://github.com/', visitCount: 75 },
			{ id: '8142', lastVisitTime: 1665857639237.5159, title: 'API Reference - Chrome Developers', typedCount: 0, url: 'https://developer.chrome.com/docs/extensions/reference/', visitCount: 1 },
			{ id: '2134', lastVisitTime: 1665857569582.574, title: 'Stack Overflow - Where Developers Learn, Share, &amp; Build Careers', typedCount: 0, url: 'https://stackoverflow.com/', visitCount: 27 },
			{ id: '8141', lastVisitTime: 1665857561294.737, title: 'how to make chrome extensions - Google Search', typedCount: 0, url: 'https://www.google.com/search?q=how+to+make+chrome+extensions&amp;rlz=1C1ONGR_en-GBGB968GB968&amp;oq=how+to+make+chrome+extensions&amp;aqs=chrome..69i57j0i512l3j0i22i30l6.5520j0j9&amp;sourceid=chrome&amp;ie=UTF-8', visitCount: 2 },
			{ id: '8140', lastVisitTime: 1665857538534.3772, title: 'chrome extensions for dummies - Google Search', typedCount: 0, url: 'https://www.google.com/search?q=chrome+extensions+for+dummies&amp;rlz=1C1ONGR_en-GBGB968GB968&amp;oq=chrome+extensions+for+dummies&amp;aqs=chrome..69i57j33i22i29i30l2.5840j0j7&amp;sourceid=chrome&amp;ie=UTF-8', visitCount: 2 },
		]
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

<main class="theme-{$theme}">
	<SearchHeader bind:query />

	<div class="scrollable">
		{#each history as item (item.id)}
			<HistoryItem {item} />
		{/each}
	</div>

	<BottomButton icon={mdiHistory} action={openHistoryTab}>View full history</BottomButton>
</main>
