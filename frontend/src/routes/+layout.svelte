<script>
import "../app.pcss";
import { page } from '$app/stores';
import { supabase } from '$lib/supabase';
import { invalidate } from '$app/navigation';
import { onMount } from 'svelte';

$: user = $page.data.user;
$: console.log("USER: ",user)

// event listener in +layout.svelte will update the user store whenever the authentication state changes
onMount(() => {
    const { data: { subscription }  } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.expires_at !== session?.expires_at) {
        invalidate('supabase:auth'); // re-trigger load function server side
      }

      if(event == 'SIGNED_OUT') {
        invalidate('supabase:auth');
        console.log("$page.data.user",$page.data.user)
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