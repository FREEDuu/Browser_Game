import { supabase } from '$lib/supabase';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals }) {
	
	// If the user is already set on the server, return it
	if (locals.user) {
	  return {
		user: locals.user
	  };
	}
  
	// If the user is not set on the server (e.g., client-side navigation), fetch it from the client-side
	const { data } = await supabase.auth.getUser();
	return {
	  user: data.user
	};
  }