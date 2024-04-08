import { supabase } from '$lib/supabase';
import { fail, json } from '@sveltejs/kit';

  export const actions = {

    /** @type {import('./$types').Actions} */
    login: async ({ request }: { request: Request }) => {
      const formData = await request.formData();
      const email: string = formData.get('email') as string;
      const password: string = formData.get('password') as string;
        

      if (!email || !password) {
        return fail(400, { message: 'All fields are required' });
      }
    
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return fail(400, { message: 'Invalid email format' });
      }
    
      // Login user
      const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
    
      if (loginError) 
        return fail(400, { message: loginError.message });
      else
  		  return { success: true, loginData: loginData };
    }
  

  }