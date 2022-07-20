<script>
	export let icon
	export let action
</script>

<style>
	.bottom-button {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		height: 3rem;
		padding: 1rem;
		color: inherit;
		text-align: left;
		background-color: transparent;
		border: none;
		border-top: 1px solid var(--hover-color);
		outline: none;
	}

	.bottom-button svg {
		margin-right: 1rem;
	}
</style>

<button class="bottom-button" on:click={action}>
	<svg width="16" height="16" viewBox="0 0 24 24">
		<path d={icon} fill="currentColor" />
	</svg>
	<slot />
</button>
