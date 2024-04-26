import { supabase } from '$lib/supabase';

interface UserObject {
    [key: string]: any; // Ideally, you should define a more specific interface.
}

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals }) {
    // Attempt to fetch user data from Supabase Auth.
    const { data: supabaseUser, error } = await supabase.auth.getUser();

    if (error) {
        console.error('Error fetching user from Supabase:', error.message);
        // Consider how to handle errors, e.g., redirecting to login.
        return {};
    }

    // Initialize user object with any required default properties.
    var user_object: UserObject = {};

    if (supabaseUser.user != null) {
        // Fetch additional user data from your 'users' table.
        let { data, error } = await supabase.from('users').select('username').eq('uuid', supabaseUser.user.id);

        if (error) {
            console.error('Error fetching username from database:', error.message);
            return {};
        }

        if (data != null && data.length > 0) {
            // Set username inside the user object if data is found.
            user_object = {
                ...supabaseUser.user,
                username: data[0].username
            };
        }

        return {
            user: user_object
        };
    }

    // If no user in Supabase and there's a user in locals, return that.
    if (locals.user) {
        return {
            user: locals.user
        };
    }

    // Return an empty object if no user data could be set; this can be a place to handle redirects.
    return {};
}
