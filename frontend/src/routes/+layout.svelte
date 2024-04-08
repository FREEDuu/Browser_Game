<script>
import "../app.pcss";
import { page } from '$app/stores';
import { supabase } from '$lib/supabase';

$: user = $page.data.user;
$: console.log("USER: ",user)

// event listener in +layout.svelte will update the user store whenever the authentication state changes
supabase.auth.onAuthStateChange((event, session) => {
  if (session?.user) {
    user = session.user;
  } else {
    user = null;
  }
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