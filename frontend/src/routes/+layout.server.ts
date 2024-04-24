import { supabase } from '$lib/supabase';

interface UserObject {
    [key: string]: any
}

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals }) {
	
	// fetch additional user data always
	const { data: supabaseUser } = await supabase.auth.getUser();
	var user_object: UserObject = supabaseUser;

	if(supabaseUser.user != null) {
		let { data, error } = await supabase.from('users').select('username').eq('uuid', supabaseUser.user.id);
		if(data != null) {
			user_object.username = data[0].username;
			return {
				user: user_object
			};
		} 

	}

	// Otherwise if the user is already set on the server, return it
	if (locals.user) {
	  return {
		user: locals.user
	  };
	}

  }