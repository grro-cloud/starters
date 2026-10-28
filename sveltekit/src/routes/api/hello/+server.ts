import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ url }) => {
	const name = (url.searchParams.get('name') ?? 'there').slice(0, 100);
	return json({ message: `Hello ${name}, from SvelteKit on Grro.` });
};
