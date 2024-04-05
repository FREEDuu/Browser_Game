/**
 * This function runs every time the SvelteKit server receives a request — whether that happens while the app is running, or during prerendering — 
 * and determines the response. It receives an event object representing the request and a function called resolve, which renders the route and generates a Response. 
 * This allows you to modify response headers or bodies, or bypass SvelteKit entirely (for implementing routes programmatically, for example).
 * 
 * For every request we check if it is coming from an authenticated source, if not, redirect login page, Otherwise we retrieve the user data
 * from supabase and return it in the header. Then you can access this data in any page using the $page.locals.user syntax
 */

import { supabase } from '$lib/supabase';
import { redirect } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {

    if (event.url.pathname.startsWith('/login') || event.url.pathname.startsWith('/signup')) {
        return resolve(event); // Do nothing
    }

    const { data, error } = await supabase.auth.getUser();
    if (data) {
        if(data.user == null) {
            console.log("redirect to login")
            throw redirect(302, '/login');
        } else {
            event.locals.user = data.user;
        }
    }
    return resolve(event);
}