import type { PageServerLoad } from './$types';
import { SECRET_API } from '$env/static/private';
import { NewsResponse } from '$lib';
import {error} from "@sveltejs/kit"

export const load: PageServerLoad = async ({ url }) => {
    // Get the country and category from the URL parameters
    let country = url.searchParams.get('country') || ''; // default to 'us' if not provided
    const category = url.searchParams.get('category') || '';
    let search = `https://newsapi.org/v2/top-headlines?apiKey=${SECRET_API}`;
    if(country) {
      search += `&country=${country}`;
    }
    if(category) {
      search += `&category=${category}`;
    }
    if (!category && !country){
        search += `&country=us`;
        country = "us"
    }
    try {
      const res = await fetch(search)
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
      const rawNews : NewsResponse = await res.json()
      if (rawNews.status !== "ok"){
        error(404, {
          message: `error: ${rawNews.status}`,
        });
      }
      //get rid of some null articles //edit. got rid of too many articles. oopsie
      const news = rawNews.articles.filter(article => article.content !== "[Removed]");
    } catch (e){
      if (typeof e === 'object' && e !== null && 'status' in e && 'code' in e && 'message' in e) {
        error(429, {
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
    return {
        props: {
            news,
            country,
            category
        }
    };
};