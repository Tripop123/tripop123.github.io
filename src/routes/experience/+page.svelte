<script lang="ts">
	import Panel from '$lib/components/Panel.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import BulletList from '$lib/components/BulletList.svelte';
	import { education, profile, roles } from '$lib/cv';
</script>

<svelte:head>
	<title>Experience — {profile.name}</title>
	<meta name="description" content="Roles, scope, and shipped work — {profile.name}." />
</svelte:head>

<PageHeader command="cat experience.log" title="Experience" />

{#each roles as role (role.company + role.start)}
	<Panel title={role.company} aside="{role.start} — {role.end}">
		<div class="flex flex-wrap items-baseline justify-between gap-2">
			<h2 class="text-sm">{role.position}</h2>
			<span class="text-dim text-[11px]">{role.location}</span>
		</div>

		{#if role.summary}
			<p class="text-dim mt-1 text-xs">{role.summary}</p>
		{/if}

		<BulletList items={role.highlights} />
	</Panel>
{/each}

<Panel title="Education" aside={education.date}>
	<div class="flex flex-wrap items-baseline justify-between gap-2">
		<h2 class="text-sm">{education.degree}</h2>
		<span class="text-dim text-[11px]">{education.location}</span>
	</div>
	<p class="text-dim mt-1 text-xs">{education.institution}</p>
</Panel>

<a href={profile.cv} class="btn self-start text-xs">Download CV.pdf ↓</a>
