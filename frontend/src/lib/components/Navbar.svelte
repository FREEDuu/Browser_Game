<script>
    import Play from "svelte-radix/Play.svelte";
    import Person from "svelte-radix/Person.svelte"
    import BarChart from "svelte-radix/BarChart.svelte"
    import Exit from "svelte-radix/Exit.svelte"
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import { page } from '$app/stores';
    import { supabase } from '$lib/supabase';
    import { onMount } from 'svelte';

    var isLoggedIn = $page.data.user != null;

    async function logout() {
      let { error } = await supabase.auth.signOut();
      fetch('/api/sign-out', {
        method: 'POST'
      });

      if(error != null) {
        console.log("error logout",error)
      }
    }

    onMount(() => {
      const { data: { subscription }  } = supabase.auth.onAuthStateChange((event, session) => {
        if(event == 'SIGNED_OUT') {
          isLoggedIn = false;
        }
      });

      return () => subscription.unsubscribe();
    });
  </script>
  
  <nav class="py-2 mb-6 border-y border-black border-dashed">

    <div class="flex justify-between items-center">

      <!-- LINKS -->
      <div class="flex items-center">
        <a href="/" class=" font-bold mr-6 text-3xl hover:text-red-500">Home</a>
        <a href="/statistics" class="mr-6 text-2xl hover:text-red-500">Statistics</a>
      </div>

      <div class="flex gap-4">
        <!-- USER PROFILE DROPDOWN -->
        {#if isLoggedIn}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <!-- AVATAR ICON -->
            <div class="border border-zinc-600 rounded bg-green-200 hover:bg-green-300">
              <Person class="h-10 w-10" />
            </div>
          </DropdownMenu.Trigger>


          <DropdownMenu.Content>
            <DropdownMenu.Group>
              <DropdownMenu.Label>{$page.data.user.user_metadata.username}</DropdownMenu.Label>
              <DropdownMenu.Separator />
              <DropdownMenu.Item> <Person class="h-5 w-5 mr-2" /> Profile</DropdownMenu.Item>
              <DropdownMenu.Item> <BarChart class="h-5 w-5 mr-2" /> Statistics</DropdownMenu.Item>
              <DropdownMenu.Item on:click={logout}> <Exit class="h-5 w-5 mr-2" /> Logout</DropdownMenu.Item>
            </DropdownMenu.Group>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
        {/if}


        <!-- PLAY BUTTON -->
        <a href="/play" class="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-6 flex items-center border border-black border-dashed">
          <Play class="mr-2 h-6 w-6" />
          Play
        </a>
      </div>


    </div>
  </nav>