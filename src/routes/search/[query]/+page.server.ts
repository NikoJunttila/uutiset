import type { PageServerLoad, RequestEvent } from './$types';
import { SECRET_API } from '$env/static/private';
import { NewsResponse } from '$lib';
import { error } from '@sveltejs/kit';

export const load = (async (event: RequestEvent) => {
	const { url, params } = event;

	const result = {
		query: params.query,
		from: url.searchParams.get('from') || '',
		to: url.searchParams.get('to') || '',
		sortBy: url.searchParams.get('sortBy') || '',
		page: url.searchParams.get('page') || '1'
	};
	if (result.query === '') {
		result.query = 'golang is best';
	}

	let search = `https://newsapi.org/v2/everything?q=${result.query}&apiKey=${SECRET_API}`;

	if (result.from) {
		search += `&from=${result.from}`;
	}
	if (result.to) {
		search += `&to=${result.to}`;
	}
	if (result.sortBy) {
		search += `&sortBy=${result.sortBy}`;
	}
	if (result.page) {
		search += `&page=${result.page}`;
	}

	try {
		const res = await fetch(search);
		if (!res.ok) {
			if (res.status === 426) {
				throw {
					status: 'error',
					code: 'maximumResultsReached',
					message:
						'You have requested too many results. Developer accounts are limited to a max of 100 results. Please upgrade to a paid plan if you need more results.'
				};
			} else if (res.status === 429) {
				throw {
					status: 'error',
					code: 'rateLimited',
					message:
						'You have made too many requests recently. Developer accounts are limited to 100 requests over a 24 hour period (50 requests available every 12 hours). Please upgrade to a paid plan if you need more requests.'
				};
			} else {
				throw new Error(`error: ${res.status}`);
			}
		}
		const rawNews: NewsResponse = await res.json();
		if (rawNews.status !== 'ok') {
			error(404, {
				message: 'Error fetching data'
			});
		}
		const queriedNews = rawNews.articles.filter(
			(article) => article.content !== null && article.title !== null
		);
		return {
			queriedNews,
			params: result,
			results: rawNews.totalResults
		};
	} catch (e) {
		if (typeof e === 'object' && e !== null && 'status' in e && 'code' in e && 'message' in e) {
			error(426, {
				message: e.message
			});
		} else if (e instanceof Error) {
			throw e;
		} else {
			error(404, {
				message: 'Error fetching data'
			});
		}
	}
}) satisfies PageServerLoad;
