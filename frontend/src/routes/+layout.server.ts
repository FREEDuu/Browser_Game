import { supabase } from '$lib/supabase';
import { AuthApiError } from '@supabase/supabase-js';

interface UserObject {
    [key: string]: any
}

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals }) {
	
	// If the user is already set on the server, return it
	if (locals.user) {
		console.log("USER SETUP ON THE SERVER")
	  return {
		user: locals.user
	  };
	}
  
	// If the user is not set on the server (e.g., client-side navigation), fetch it
	const { data } = await supabase.auth.getUser();

	if(data.user != null) {

		// fetch additional user data from supabase
		let { data: userData, error } = await supabase.from('users').select('username').eq('uuid', data.user.id);

		var user_object: UserObject = data.user;

		if(userData != null) {
			user_object.user_metadata.username = userData[0].username;
		}
		 
		return {
			user: user_object
		};
	}

  }