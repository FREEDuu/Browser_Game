import { supabase } from '$lib/supabase';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }: { request: Request }) {
	await supabase.auth.signOut();


	return new Response(JSON.stringify({
	  message: "logged out!"
	}));
  }