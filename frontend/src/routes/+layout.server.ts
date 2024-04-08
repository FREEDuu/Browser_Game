import { supabase } from '$lib/supabase';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals }) {
	
	// If the user is already set on the server, return it
	if (locals.user) {
		console.log("locals.user",locals.user)
	  return {
		user: locals.user
	  };
	}
  
	// If the user is not set on the server (e.g., client-side navigation), fetch it from the client-side
	const { data } = await supabase.auth.getUser();
	console.log("user is not set on the server, fetch it from the client-side",data)
	return {
	  user: data.user
	};
  }