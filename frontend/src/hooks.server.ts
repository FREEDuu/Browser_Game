/**
 * This function runs every time the SvelteKit server receives a request — whether that happens while the app is running, or during prerendering — 
 * and determines the response. It receives an event object representing the request and a function called resolve, which renders the route and generates a Response. 
 * This allows you to modify response headers or bodies, or bypass SvelteKit entirely (for implementing routes programmatically, for example).
 * 
 * For every request we check if it is coming from an authenticated source, if not, redirect login page, Otherwise we retrieve the user data
 * from supabase and return it in the header. Then you can access this data in any page using the $page.data.user syntax because it is loaded
 * on the main parent +layout.server.ts load function
 */

import { supabase } from '$lib/supabase';
import { redirect } from '@sveltejs/kit';


const protectedRoutes = [
    '/play',
    '/statistics',
    '/settings'
];

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    
    // Check if the requested URL is a protected route
    if (protectedRoutes.some(route => event.url.pathname.startsWith(route))) {
        console.log("protected route requested")

        // Check if the user is authenticated
        const { data, error } = await supabase.auth.getUser();
        if (data && data.user !== null) {
            event.locals.user = data.user;
        } else {
            event.locals.user = null;
            throw redirect(302, '/login');
        }
    }

    return resolve(event);
}