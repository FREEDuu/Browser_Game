<script>
import "../app.pcss";
import { supabase } from '$lib/supabase';
import { invalidate } from '$app/navigation';
import { onMount } from 'svelte';
import { userStore } from "@/stores";

export let data;
userStore.set(data.user)

// event listener in +layout.svelte will update the user store whenever the authentication state changes
onMount(() => {
    const { data: { subscription }  } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.expires_at !== session?.expires_at) {
        invalidate('supabase:auth'); // re-trigger load function server side
      }

      if(event == 'SIGNED_OUT') {
        invalidate('supabase:auth');
      }
    });

    return () => subscription.unsubscribe();
  });
  
</script>

<svelte:head>
    <title>Phaser Svelte Template</title>
</svelte:head>

<slot></slot>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        color: rgba(0, 0, 0, 0.87);
        /*background-color: #ffeab8;*/
        font-family: monogram, Arial, Helvetica, sans-serif;
        font-size: 1.5rem;
    }

</style>