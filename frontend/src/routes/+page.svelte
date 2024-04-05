<script>
    import { goto } from "$app/navigation";
    import { Button } from "$lib/components/ui/button/index";
    import Navbar from "@/components/Navbar.svelte";

</script>

  <svelte:head>
    <title>Our Browser Game</title>
  </svelte:head>
  
  <main class="max-w-4xl mx-auto px-20 py-8 bg-gradient-to-b from-white to-red-200 border-x border-black">
    <Navbar />
    
    <h1 class="text-4xl font-bold text-center mb-8">Welcome to Our Browser Game!</h1>
  
    <section class="mb-8">
      <h2 class="text-2xl font-bold mb-4">About the Game</h2>
      <p class="text-gray-700">
        Our game is a 2D pixel art dungeon-based adventure where players control a hero on a journey through Hell,
        Purgatory, and then Paradise. Along the way, the hero encounters various enemies and challenges, which they must
        overcome using their skills and abilities.
      </p>
    </section>
  
    <section class="mb-8">
      <h2 class="text-2xl font-bold mb-4">Gameplay Features</h2>
      <ul class="list-disc pl-4 text-gray-700">
        <li>Pixel art graphics for a retro aesthetic</li>
        <li>Multiple levels representing different realms</li>
        <li>Unique enemies and bosses to battle</li>
        <li>Upgradeable skills and equipment</li>
        <li>Interactive environment with hidden secrets</li>
      </ul>
    </section>
  
    <section class="mb-8">
      <h2 class="text-2xl font-bold mb-4">Screenshots</h2>
      <div class="flex flex-wrap justify-center">
        <img alt="Screenshot 1"  src="/assets/star.png" class="mx-2 mb-4" />
        <img alt="Screenshot 2"  src="/assets/star.png" class="mx-2 mb-4" />
      </div>
    </section>
  
    <section>
      <h2 class="text-2xl font-bold mb-4">Get Started</h2>
      <p class="text-gray-700 mb-4">Ready to embark on your epic adventure? Sign up now and start playing!</p>
      <Button type="button" on:click={()=>goto('/signup')} class="flex self center text-xl py-2 mt-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md">Sign up</Button>
    </section>
  </main>