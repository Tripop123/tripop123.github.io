<script lang="ts">
	import { page } from '$app/state';

	let { variant }: { variant: 'sidebar' | 'bar' } = $props();

	const links = [
		{ href: '/', label: 'INDEX' },
		{ href: '/experience', label: 'EXPERIENCE' },
		{ href: '/open-source', label: 'OPEN SOURCE' },
		{ href: '/stack', label: 'STACK' },
		{ href: '/contact', label: 'CONTACT' }
	];

	const isActive = (href: string) =>
		href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(href);
</script>

{#if variant === 'sidebar'}
	<nav aria-label="Primary" class="border-line rounded-box glow-box overflow-hidden border">
		{#each links as link (link.href)}
			{@const active = isActive(link.href)}
			<a
				href={link.href}
				aria-current={active ? 'page' : undefined}
				class="border-line font-pixel block border-b px-3 py-1.5 text-xs tracking-[0.2em] transition-colors last:border-b-0
					{active ? 'bg-fg text-bg' : 'text-dim hover:text-fg hover:bg-panel'}"
			>
				{link.label}
			</a>
		{/each}
	</nav>
{:else}
	<nav aria-label="Primary" class="flex gap-1 overflow-x-auto">
		{#each links as link (link.href)}
			{@const active = isActive(link.href)}
			<a
				href={link.href}
				aria-current={active ? 'page' : undefined}
				class="border-line rounded-box glow-box font-pixel border px-2 py-1 text-[11px] tracking-[0.15em] whitespace-nowrap transition-colors
					{active ? 'bg-fg text-bg' : 'text-dim hover:text-fg'}"
			>
				{link.label}
			</a>
		{/each}
	</nav>
{/if}
