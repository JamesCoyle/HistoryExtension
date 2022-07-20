<script>
	import { theme, iconColor, defaultIconColor, showShelf, notify } from './stores/settings'

	import IconButton from './components/icon-button.svelte'

	import { mdiRestore } from '@mdi/js'
	import { icoKofi } from './custom-icons'

	function updateIconColor(e) {
		$iconColor = e.target.value
	}

	function updatePermission() {
		// Request permission if any notification active otherwise remove.
		if (Object.values($notify).some((enabled) => enabled)) {
			chrome.permissions.request({ permissions: ['notifications'] })
		} else {
			chrome.permissions.remove({ permissions: ['notifications'] })
		}
	}
</script>

<style>
	main {
		justify-content: space-evenly;
	}

	.settings {
		width: 24rem;
		flex: 0 0 24rem;
	}

	.setting-group {
		--gap: var(--gap-default);

		display: flex;
		flex-flow: column nowrap;
		gap: var(--gap);
	}

	.setting-item {
		padding: var(--pad, var(--pad-default));
		background-color: var(--hover-color);
		border-radius: 0.25rem;
	}

	.setting-name {
		font-weight: bold;
	}

	.setting-theme {
		position: relative;
		width: 100%;

		display: grid;
		place-content: center;

		padding: 0;
		flex: 1 1 auto;
		aspect-ratio: 16/9;
		border-radius: 0.25rem;

		font-weight: bold;
	}

	.setting-theme span {
		color: white;
		mix-blend-mode: difference;
	}

	input:checked + .setting-theme {
		box-shadow: 0 0 0 0.25rem var(--theme-color);
	}

	.setting-theme.auto {
		position: relative;
		background: linear-gradient(0deg, rgba(217, 217, 217, 1) 0%, rgba(215, 222, 226, 1) 35%, rgba(255, 255, 255, 1) 100%);
	}

	.setting-theme.auto::before {
		content: linear-gradient(0deg, rgba(61, 61, 61, 1) 0%, rgba(9, 9, 9, 1) 35%, rgba(52, 52, 52, 1) 100%);
		position: absolute;
		inset: 0px;
		clip-path: polygon(100% 0, 100% 100%, 0% 100%);
	}

	.setting-theme.light {
		background: linear-gradient(0deg, rgba(217, 217, 217, 1) 0%, rgba(215, 222, 226, 1) 35%, rgba(255, 255, 255, 1) 100%);
	}

	.setting-theme.dark {
		background: linear-gradient(0deg, rgba(61, 61, 61, 1) 0%, rgba(9, 9, 9, 1) 35%, rgba(52, 52, 52, 1) 100%);
	}
</style>

<main class="row">
	<article class="col">
		<h1>History Viewer</h1>
		<p>Easy access to your current browser session's history.</p>
		<p>Developed by <a href="https://james-coyle.dev/">James Coyle</a></p>
	</article>
	<article class="settings col">
		<h1 class="sr-only">Settings</h1>
		<section class="setting-group">
			<h2>Appearance</h2>

			<div class="setting-item col">
				<div class="setting-name">Theme</div>
				<div class="row equal">
					<input class="display-none" type="radio" name="theme" value="auto" id="setting-theme-auto" />
					<label for="setting-theme-auto" class="setting-theme auto">
						<span>Auto</span>
					</label>

					<input class="display-none" type="radio" name="theme" value="light" id="setting-theme-light" />
					<label for="setting-theme-light" class="setting-theme light">
						<span>Light</span>
					</label>

					<input class="display-none" type="radio" name="theme" value="dark" id="setting-theme-dark" />
					<label for="setting-theme-dark" class="setting-theme dark">
						<span>Dark</span>
					</label>
				</div>
			</div>

			<div class="setting-item row">
				<label class="setting-name" for="setting-icon-color">Icon color</label>
				<div class="row" style="--gap: .25rem">
					<IconButton description="Reset color to default" icon={mdiRestore} action={() => iconColor.set('auto')} />
					<input type="color" id="setting-icon-color" value={$iconColor !== 'auto' ? $iconColor : $defaultIconColor} on:change={updateIconColor} />
				</div>
			</div>
		</section>
	</article>
</main>
