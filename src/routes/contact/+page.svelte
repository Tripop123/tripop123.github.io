<script lang="ts">
	import Panel from '$lib/components/Panel.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { profile, stripScheme } from '$lib/cv';

	const rows = [
		{ key: 'email', value: profile.email, href: `mailto:${profile.email}` },
		{ key: 'github', value: stripScheme(profile.githubUrl), href: profile.githubUrl },
		{ key: 'linkedin', value: stripScheme(profile.linkedinUrl), href: profile.linkedinUrl },
		{ key: 'location', value: profile.location, href: undefined }
	];
</script>

<svelte:head>
	<title>Contact — {profile.name}</title>
	<meta name="description" content="Get in touch with {profile.name}." />
</svelte:head>

<PageHeader command="cat contact.txt" title="Contact" />

<Panel title="Reach me" flush>
	<dl>
		{#each rows as row (row.key)}
			<div class="border-line flex gap-3 border-b px-3 py-2 last:border-b-0">
				<dt class="text-dim font-pixel w-20 shrink-0 text-xs tracking-[0.15em] uppercase">
					{row.key}
				</dt>
				<dd class="min-w-0 text-sm break-words">
					{#if row.href}
						<a
							href={row.href}
							rel={row.href.startsWith('http') ? 'noreferrer noopener' : undefined}
							class="text-accent hover:underline">{row.value}</a
						>
					{:else}
						{row.value}
					{/if}
				</dd>
			</div>
		{/each}
	</dl>
</Panel>

<p class="text-dim max-w-2xl text-sm">
	Open to senior and staff-level backend or full-stack roles. Email is the fastest way to reach me.<span
		class="cursor-blink"
		aria-hidden="true"
	></span>
</p>
