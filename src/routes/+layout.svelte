<script lang="ts">
	import '../app.postcss';
	import { AppShell } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
</script>

<!-- App Shell -->

<AppShell>
	<svelte:fragment slot="header">
		<nav class="flex justify-center gap-5 md:gap-10 pt-2">
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
	<slot />
</AppShell>
