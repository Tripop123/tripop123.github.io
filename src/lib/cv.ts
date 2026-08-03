export type Role = {
	company: string;
	position: string;
	start: string;
	end: string;
	location: string;
	summary?: string;
	highlights: string[];
};

export type Project = {
	name: string;
	url: string;
	meta: string;
	details: string;
};

export const stripScheme = (url: string) => url.replace(/^https?:\/\//, '');

export const profile = {
	name: 'Ramil Amparo',
	headline: 'Senior Software Engineer · Go, TypeScript, Svelte/React',
	location: 'Dubai, UAE',
	email: 'ramilamparo@gmail.com',
	github: 'ramilamparo',
	githubUrl: 'https://github.com/ramilamparo',
	linkedin: 'ramilamparo',
	linkedinUrl: 'https://linkedin.com/in/ramilamparo',
	cv: '/Ramil_Amparo_CV.pdf'
} as const;

export const intro = [
	'Software engineer in Dubai, eight years in. Go, PostgreSQL, Svelte, React.',
	'Three years on QA Sphere, a multi-tenant SaaS test management platform: billing, authentication, AI features, the public API, and the performance work that comes with big accounts. Before that, event platforms at scale and fleet telematics.'
];

export const roles: Role[] = [
	{
		company: 'Hypersequent',
		position: 'Senior Software Engineer',
		start: '2023.08',
		end: '2026.08',
		location: 'Dubai, UAE',
		summary:
			'QA Sphere, a multi-tenant SaaS test management platform. Go, Svelte 5, TypeScript, PostgreSQL.',
		highlights: [
			'Shipped features across the whole product, from PostgreSQL queries to Svelte components: test planning, CSV import and export, Jira and Linear integrations, and most of the public REST API. Also carried the frontend through a design-system migration and the Svelte 5 upgrade.',
			'Reviewed 1,699 pull requests for a 7-engineer team, 2.6x my own output, and became the default reviewer on the product monorepo. Authored 648 PRs, 91% merged.',
			'Chased performance across the app: pre-created tenant schemas in a pool so sign-ups stopped throwing 502s under load, virtualized the heaviest list views, and pushed pagination and sorting into SQL instead of slicing results in memory.',
			'Built the security controls behind customer workspaces: two-factor auth and later its org-wide enforcement, Google SSO with domain restrictions, RBAC across every resource type, and per-key API permissions.',
			'Owned the team’s own testing infrastructure: rewrote the Playwright E2E suite, built an API benchmarking harness wired into CI, and replaced handwritten test doubles with gomock. Usually the one root-causing flaky tests, mostly hydration races and shared fixtures.',
			'Moved OpenAI calls off the client into the Go backend behind per-tenant quotas, then built a feature that drafts test cases in bulk and streams them back as they generate.',
			'Owned billing and subscriptions for 2.5 years: the FastSpring integration, trials, plan changes, seat limits, and the panel support staff run it from. Fixed a run of consistency bugs where payments raced an eventually-consistent third-party API, including a lost-update hazard resolved with row-level locking.'
		]
	},
	{
		company: 'WebNTech',
		position: 'Senior Frontend Engineer',
		start: '2022.06',
		end: '2023.07',
		location: 'Dubai, UAE',
		highlights: [
			'Led frontend for an event management system that carried 30,000+ active users through the F1 Abu Dhabi Grand Prix. Also built the frontends for Misk Global Forum and the World Government Summit.',
			'Reviewed the team’s code, paired with them on hard problems, and coached the junior developers.'
		]
	},
	{
		company: 'WebNTech',
		position: 'Software Engineer',
		start: '2021.07',
		end: '2022.06',
		location: 'Dubai, UAE',
		highlights: [
			'Built React PWAs that worked offline and delivered VAPID web push notifications. Shipped a Point of Sale and Kitchen Display System for ordering food from terminals inside event venues.',
			'Cut time-to-interactive on a Next.js site from 10s+ to 3–5s.'
		]
	},
	{
		company: 'Advance Telematics Solutions',
		position: 'Web Developer',
		start: '2018.03',
		end: '2021.07',
		location: 'Dubai, UAE',
		highlights: [
			'Built the company’s car rental management application and owned every stage of it, from requirements through deployment.',
			'Wrote a GPS geofencing algorithm that alerts when a rental vehicle strays off route, the main safeguard against cars being driven off and never returned.'
		]
	}
];

export const projects: Project[] = [
	{
		name: 'zen',
		url: 'https://github.com/Hypersequent/zen',
		meta: 'Go · 29 stars',
		details:
			'Generates Zod schemas from Go structs with go-validator tags. I led the Zod 4 migration and kept Zod 3 working as an opt-in.'
	},
	{
		name: 'qasphere-mcp',
		url: 'https://github.com/Hypersequent/qasphere-mcp',
		meta: 'TypeScript · 23 stars',
		details:
			'MCP server that lets AI agents drive a test management platform. Built the tools agents use to create and organize test content, and led a structural refactor.'
	},
	{
		name: 'qas-cli',
		url: 'https://github.com/Hypersequent/qas-cli',
		meta: 'TypeScript',
		details:
			'CLI that uploads automated test results from CI. Built JUnit XML and attachment upload, the full public-API command surface, and interactive login.'
	}
];

export const skills = [
	{
		label: 'Languages',
		items: ['Go', 'TypeScript', 'JavaScript', 'SQL (PostgreSQL, MySQL)', 'Bash', 'HTML/CSS']
	},
	{
		label: 'Frameworks',
		items: [
			'Svelte / SvelteKit',
			'React / React Native',
			'Node.js',
			'NestJS',
			'Next.js',
			'GraphQL',
			'Tailwind'
		]
	},
	{
		label: 'Tools',
		items: [
			'Docker',
			'Redis',
			'Nginx',
			'Playwright',
			'Jest (TDD)',
			'gomock',
			'CI/CD (GitHub Actions, Azure DevOps)',
			'Git',
			'Linux',
			'Sentry'
		]
	}
];

export const education = {
	institution: 'Colegio de San Lorenzo',
	degree: 'BS Computer Science',
	date: '2013 – 2017',
	location: 'Quezon City, Philippines'
};
