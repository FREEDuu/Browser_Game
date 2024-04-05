<script lang="ts">
    import { Input } from "$lib/components/ui/input";
    import { Button } from "$lib/components/ui/button/index.js";
    import Reload from "svelte-radix/Reload.svelte";
    import { enhance, applyAction } from '$app/forms';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';

    let email = '';
    let password = '';
    let supabaseError: string;
    let isLoading: boolean = false;
    
  </script>
  
  
  <div id="bg" class="flex h-screen justify-center items-center">

    <form 
      class="w-full max-w-md space-y-4"
      method="POST"
      action="/login?/login"
      use:enhance={({ formElement, formData, action, cancel, submitter }) => {
        /* https://kit.svelte.dev/docs/form-actions#loading-data */

        isLoading = true;
  
        formData.append('email', email);
        formData.append('password', password);

        return async ({ result, update }) => {
          if (result.type === 'success') {
            goto('/');
          } else if (result.type === 'failure') {
            supabaseError = '' + (result.data?.message ?? 'An unexpected error occurred.');
          }

          await applyAction(result) // Aggiorna lo store $page.form con i valori di ritorno della action
          isLoading = false;
        };

      }}>

      <div class="flex flex-col gap-2 px-10 pt-10 pb-2 z-50 rounded drop-shadow-xl text-xl bg-gradient-to-b from-white to-red-300">

        <h1 class="text-2xl font-bold">Login into your account</h1>

          <div class="flex flex-col">
              <label for="email">Email</label>
              <Input type="text" id="email" bind:value={email} required />
          </div>
        
            <div class="flex flex-col">
              <label for="password">Password</label>
              <Input type="password" id="password" bind:value={password} required />
            </div>
        
            <Button type="submit" class="flex self center text-xl py-2 mt-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md" disabled="{isLoading}">
              {#if isLoading }
              <Reload class="mr-2 h-4 w-4 animate-spin" />
              {:else}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
              {/if}

              
              Login
            </Button>

            {#if supabaseError}
              <div class="flex gap-2 items-center mt-2 drop-shadow-md bg-red-200 p-1 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-red-600">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
                <p class="text-red-600">- {supabaseError}</p>
              </div>
            {/if}

            <div class="self-end text-md">don't have an account? <a href="/signup" class="text-red-600 hover:text-red-500 hover:underline">Sign up here</a></div>

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