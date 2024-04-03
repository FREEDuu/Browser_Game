<script lang="ts">
    import { supabase } from '$lib/supabase';
    import { Input } from "$lib/components/ui/input";
    import { Button } from "$lib/components/ui/button/index.js";

    export let email: string;
    export let password: string;
    export let supabaseError: string;

    async function Login(event: any) {
      event.preventDefault();
  
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
  
      if (error) {
        supabaseError = error.message;
      } else {
        // Successful login, redirect to home
        window.location.href = '/';
      }
    }
  </script>
  
  
  <div class="flex h-screen justify-center items-center">
    <form on:submit={Login} class="w-full max-w-md space-y-4">


    <div class="flex flex-col gap-2 p-8 rounded bg-orange-200">

        <div class="flex flex-col">
            <label for="email">Email</label>
            <Input type="email" bind:value={email} id="email" required />
        </div>
      
          <div class="flex flex-col">
            <label for="password">Password</label>
            <Input type="password" bind:value={password} id="password" required />
          </div>
      
          <Button type="submit" class="self center  py-2 mt-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-md">
            Login
          </Button>
    </div>

      {#if supabaseError}
        <p style="color: red">{supabaseError}</p>
      {/if}
    </form>
  </div>
