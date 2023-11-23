<script lang="ts">
	import '../app.postcss';
	import { AppShell } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
</script>

<!-- App Shell -->

<AppShell>
	<svelte:fragment slot="header">
		<nav class="flex justify-evenly pt-2 sm:px-72">
			<a href="/" class="{$page.url.pathname === '/' ? 'border-b-2 border-primary-500' : ''} btn h4"
				>Conversor</a
			>
			<a
				href="/heatmap"
				class="{$page.url.pathname === '/heatmap' ? 'border-b-2 border-primary-500' : ''} btn h4"
				>Heat Map</a
			>
		</nav>
	</svelte:fragment>
	<div class="flex flex-col justify-center items-center h-full">
		<slot><!-- optional fallback --></slot>
	</div>
</AppShell>
