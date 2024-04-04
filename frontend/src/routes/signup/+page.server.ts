import { supabase } from '$lib/supabase';
import { fail, json } from '@sveltejs/kit';

  export const actions = {

    /** @type {import('./$types').Actions} */
    signup: async ({ request }: { request: Request }) => {
      const formData = await request.formData();
      const email: string = formData.get('email') as string;
      const username: string = formData.get('username') as string;
      const password: string = formData.get('password') as string;
        
      if (!email || !username || !password) {
        return fail(400, { message: 'All fields are required' });
      }
    
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return fail(400, { message: 'Invalid email format' });
      }
    
      // Validate username length
      if (username.length < 3 || username.length > 20) {
        return fail(400, { message: 'Username must be between 3 and 20 characters' });
      }
    
      // Check if username is available
      const { data, error } = await supabase.from('utenti').select('username').eq('username', username).limit(1);
      if (error) {
        return fail(500, { message: 'Error checking username availability' });
      }
    
      if (data.length > 0) {
        return fail(400, { message: 'Username already taken' });
      }
    
      // Sign up user
      const { data: signupData, error: signupError } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          emailRedirectTo: "http://localhost:5173/",
          data: { username: username },
        },
      });
    
      if (signupError) {
        return fail(400, { message: signupError.message });
      } else {
        // Add referencing data to utenti table
        const { data: profileData, error: profileError } = await supabase.from('utenti').insert({
          uuid: signupData?.user?.id,
          username: username,
        });
  
        if (profileError) {
          return fail(500, { message: profileError.message });
        }
      
        return json({
          status: 200,
          body: {
            message: 'Check your inbox for confirmation',
            user: signupData.user,
          },
        }) ;
        
      }
  
    }
  

  }