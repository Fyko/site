import { NextkitError } from 'nextkit';

export async function fetcher<ReturnType>(url: string, init?: RequestInit): Promise<ReturnType> {
	const request = await fetch(url, init);
	const json = (await request.json()) as unknown;

	if (request.status >= 400) {
		let message: string | undefined;

		if (json && typeof json === 'object' && 'message' in json) {
			// Safe to assert because of the ??= underneath this
			message = (json as { message?: string }).message!;
		}

		message ??= 'Something went wrong';

		throw new NextkitError(request.status, message);
	}

	return json as ReturnType;
}
