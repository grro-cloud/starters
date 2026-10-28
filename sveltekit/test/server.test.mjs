// Starts the production build (run "npm run build" first) and calls it over HTTP.
import { after, before, test } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createServer } from 'node:net';

let child;
let base;

function freePort() {
	return new Promise((resolve) => {
		const s = createServer().listen(0, '127.0.0.1', () => {
			const { port } = s.address();
			s.close(() => resolve(port));
		});
	});
}

before(async () => {
	const port = await freePort();
	base = `http://127.0.0.1:${port}`;
	child = spawn(process.execPath, ['build'], {
		env: { ...process.env, PORT: String(port), HOST: '127.0.0.1' },
		stdio: 'inherit'
	});
	for (let i = 0; i < 50; i++) {
		try {
			if ((await fetch(`${base}/healthz`)).ok) return;
		} catch {}
		await new Promise((r) => setTimeout(r, 100));
	}
	throw new Error('server did not start');
});

after(() => child.kill());

test('GET /healthz returns 200', async () => {
	const res = await fetch(`${base}/healthz`);
	assert.equal(res.status, 200);
	assert.deepEqual(await res.json(), { status: 'ok' });
});

test('GET / is rendered on the server', async () => {
	const res = await fetch(`${base}/`);
	assert.equal(res.status, 200);
	const html = await res.text();
	assert.match(html, /running on Grro/);
	assert.match(html, /rendered on the server at <code>\d{4}-/);
});

test('GET /api/hello greets', async () => {
	const res = await fetch(`${base}/api/hello?name=Ada`);
	assert.match((await res.json()).message, /Ada/);
});
