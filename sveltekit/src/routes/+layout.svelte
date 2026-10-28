<script lang="ts">
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href="/favicon.svg" />
</svelte:head>

<main>
	{@render children()}
</main>

<style>
	:global(:root) {
		color-scheme: light dark;
		font-family: system-ui, sans-serif;
		line-height: 1.5;
	}
	:global(body) {
		margin: 0;
	}
	main {
		max-width: 40rem;
		margin: 4rem auto;
		padding: 0 1rem;
	}
</style>
