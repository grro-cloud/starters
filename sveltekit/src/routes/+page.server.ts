import type { PageServerLoad } from './$types';

// Runs on the server for every request, so the page shows server rendering at work.
export const load: PageServerLoad = () => {
	return {
		renderedAt: new Date().toISOString(),
		region: process.env.GRRO_REGION ?? 'local'
	};
};
