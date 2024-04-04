<script lang="ts">
    import { supabase } from '$lib/supabase';
    import { Input } from "$lib/components/ui/input";
    import { Button } from "$lib/components/ui/button/index.js";
    import Reload from "svelte-radix/Reload.svelte";

    let email: string;
    let username: string;
    let password: string;
    let supabaseError: string;
    let successMessage: string;
    let isLoading: boolean = false;

    let userData;

    async function signup(event: any) {
      event.preventDefault();

        isLoading = true;
        if (username.length < 3 || username.length > 20) {
            supabaseError = 'Username must be 3-20 characters long.';
            isLoading = false;
            return;
        }

        const isAvailable = await isUsernameAvailable(username);
        if (!isAvailable) {
            supabaseError = 'Username already taken. Please choose another.';
            isLoading = false;
            return;
        }

      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            emailRedirectTo: "http://localhost:5173/",
            data: { username: username }
        }
      })
      userData = data;
      isLoading = false;
      console.log("userData",userData)

      if (error) {
        supabaseError = error.message;
      } else {
        // Successful signup, add referencing data to utenti table
        if(userData.user != null) {
            const { data: profileError } = await supabase.from('utenti').insert({
                uuid: userData.user.id,
                username: username
            });

            if (profileError) {
                supabaseError = 'Error saving username. Please try again.';
            } else {
                // Username saved successfully
                successMessage = 'Check your inbox for verification link'
            }
        }

      }
    }

    async function isUsernameAvailable(username: string) {
        const { data, error, count } = await supabase
            .from('utenti') 
            .select('username', { count: 'exact' })
            .eq('username', username)
            .limit(1);

        if (error) {
            console.log(error);
            return false;
        }

        return count === 0;
    }

  </script>
  
  
  <div id="bg" class="flex h-screen justify-center items-center">

    <form on:submit={signup} class="w-full max-w-md space-y-4">

      <div class="flex flex-col gap-2 p-10 z-50 rounded drop-shadow-xl text-xl bg-gradient-to-b from-white to-red-300">

        <h1 class="text-2xl font-bold">Create your new account!</h1>

          <div class="flex flex-col">
              <label for="email">Email</label>
              <Input type="email" bind:value={email} id="email" required />
          </div>

          <div class="flex flex-col">
            <label for="username">Username</label>
            <Input type="username" bind:value={username} id="username" required />
          </div>
        
            <div class="flex flex-col">
                <label for="password">Password</label>
                <Input type="password" bind:value={password} id="password" required />
            </div>
        
            <Button type="submit" class="flex self center text-xl py-2 mt-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md" disabled="{isLoading}">
              {#if isLoading }
              <Reload class="mr-2 h-4 w-4 animate-spin" />
              {:else}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
              {/if}

              
              Sign Up
            </Button>

            {#if supabaseError}
              <div class="flex gap-2 items-center mt-2 drop-shadow-md bg-red-200 p-1 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-red-600">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
                <p class="text-red-600">- {supabaseError}</p>
              </div>
            {/if}

            {#if successMessage}
                <div class="flex items-center mt-2 drop-shadow-md bg-green-300 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-green-600">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                      
                    <p class="text-green-700">{successMessage}</p>
                </div>
            {/if}

      </div>

    </form>

  </div>

  <style>
    #bg {
        background-image: url('/assets/opaquebg.jpeg'); 
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        opacity: 0.8; 
        z-index: 1;
    }
  </style>