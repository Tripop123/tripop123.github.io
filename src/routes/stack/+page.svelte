<script lang="ts">
	import Panel from '$lib/components/Panel.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { profile, skills } from '$lib/cv';
</script>

<svelte:head>
	<title>Stack — {profile.name}</title>
	<meta name="description" content="Languages, frameworks, and tools {profile.name} works with." />
</svelte:head>

<PageHeader command="env | sort" title="Stack" />

{#each skills as group (group.label)}
	<Panel title={group.label} aside="{group.items.length} entries">
		<ul class="flex flex-wrap gap-1.5">
			{#each group.items as item}
				<li class="border-line rounded-box bg-panel border px-2 py-0.5 text-xs">{item}</li>
			{/each}
		</ul>
	</Panel>
{/each}
