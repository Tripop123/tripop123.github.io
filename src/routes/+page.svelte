<script lang="ts">
	import Panel from '$lib/components/Panel.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import BulletList from '$lib/components/BulletList.svelte';
	import { intro, profile, projects, roles } from '$lib/cv';

	const current = roles[0];
</script>

<svelte:head>
	<title>{profile.name} — Senior Software Engineer</title>
	<meta
		name="description"
		content="{profile.name} — senior software engineer in {profile.location}. Go, TypeScript, Svelte. Multi-tenant SaaS: billing, authentication, AI features, and performance at scale."
	/>
</svelte:head>

<div class="flex items-start gap-4 sm:gap-6">
	<Logo />
	<div class="min-w-0">
		<p class="text-dim font-pixel mb-2 text-xs tracking-[0.2em]">
			<span class="text-accent">$</span> whoami
		</p>
		<h1 class="text-2xl leading-tight tracking-tight sm:text-3xl">
			{profile.name}
		</h1>
		<p class="text-dim mt-1.5 text-sm">{profile.headline}</p>
	</div>
</div>

<div class="max-w-2xl space-y-3 text-sm leading-relaxed">
	{#each intro as paragraph}
		<p>{paragraph}</p>
	{/each}
</div>

<Panel title="Currently" aside="{current.start} — {current.end}">
	<h3 class="text-sm">
		{current.position} <span class="text-dim">@</span>
		{current.company}
	</h3>
	<p class="text-dim mt-1 text-xs">{current.summary}</p>
	<BulletList items={current.highlights.slice(0, 3)} gap="space-y-1.5" />
	<a
		href="/experience"
		class="text-dim hover:text-fg mt-3 inline-block text-xs underline decoration-dotted"
	>
		full history →
	</a>
</Panel>

<Panel title="Open source" aside="{projects.length} repos">
	<ul class="space-y-2.5">
		{#each projects as project (project.name)}
			<li>
				<a
					href={project.url}
					rel="noreferrer noopener"
					target="_blank"
					class="text-accent text-sm hover:underline">{project.name}</a
				>
				<span class="text-dim ml-2 text-[11px]">{project.meta}</span>
				<p class="text-dim mt-0.5 text-xs">{project.details}</p>
			</li>
		{/each}
	</ul>
</Panel>

<div class="flex flex-wrap gap-2 text-xs">
	<a href={profile.githubUrl} rel="noreferrer noopener" target="_blank" class="btn">GitHub ↗</a>
	<a href={profile.cv} class="btn">CV.pdf ↓</a>
	<a href="mailto:{profile.email}" class="btn">Email →</a>
</div>
