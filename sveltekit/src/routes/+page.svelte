<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let count = $state(0);
</script>

<svelte:head>
	<title>SvelteKit on Grro</title>
</svelte:head>

<h1>SvelteKit is running on Grro</h1>
<p>
	This page was rendered on the server at <code>{data.renderedAt}</code> in region
	<code>{data.region}</code>. Edit <code>src/routes/+page.svelte</code> to change it, or try
	<a href="/api/hello?name=Ada">/api/hello</a>.
</p>
<button type="button" onclick={() => count++}>
	Clicked {count}
	{count === 1 ? 'time' : 'times'}
</button>

<style>
	button {
		font: inherit;
		padding: 0.5rem 1rem;
		border-radius: 6px;
		border: 1px solid currentColor;
		background: transparent;
		color: inherit;
		cursor: pointer;
	}
</style>
