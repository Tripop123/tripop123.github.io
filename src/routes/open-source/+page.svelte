<script lang="ts">
	import Panel from '$lib/components/Panel.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { profile, projects, stripScheme } from '$lib/cv';
</script>

<svelte:head>
	<title>Open source — {profile.name}</title>
	<meta name="description" content="Open-source projects and contributions by {profile.name}." />
</svelte:head>

<PageHeader command="ls ~/src" title="Open source" />

{#each projects as project (project.name)}
	<Panel title={project.name} aside={project.meta}>
		<p class="text-sm">{project.details}</p>
		<a
			href={project.url}
			rel="noreferrer noopener"
			target="_blank"
			class="text-accent mt-3 inline-block text-xs hover:underline"
		>
			{stripScheme(project.url)} ↗
		</a>
	</Panel>
{/each}

<p class="text-dim text-xs">
	More at
	<a
		href={profile.githubUrl}
		rel="noreferrer noopener"
		target="_blank"
		class="text-accent hover:underline">{stripScheme(profile.githubUrl)}</a
	>.
</p>
