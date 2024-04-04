<script lang="ts">
  import { Input } from "$lib/components/ui/input";
  import { Button } from "$lib/components/ui/button/index.js";
  import Reload from "svelte-radix/Reload.svelte";

  let email = '';
  let username = '';
  let password = '';
  let isLoading = false;
  let supabaseError: string;
  let successMessage: string;

  async function signup(event: any) {
    event.preventDefault();

    isLoading = true;

    const formData = new FormData();
    formData.append('email', email);
    formData.append('username', username);
    formData.append('password', password);

    const response = await fetch('/signup?/signup ', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    console.log("data",data)

    if (data.status == 200) {
      email = '';
      username = '';
      password = '';
      supabaseError = '';
      successMessage = data.message;
      data.userData = data.user;
    } else {
      // Handle error
      supabaseError = data.message;
      successMessage = '';
    }

    isLoading = false;
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