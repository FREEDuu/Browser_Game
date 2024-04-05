<script>
    import Play from "svelte-radix/Play.svelte";
  </script>
  
  <nav class="py-2 mb-6 border-y border-black border-dashed">
    <div class="flex justify-between items-center">
      <div class="flex items-center">
        <a href="/" class=" font-bold mr-6 text-3xl hover:text-red-500">Home</a>
        <a href="/statistics" class="mr-6 text-2xl hover:text-red-500">Statistics</a>
      </div>

      <a href="/play" class="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-6 flex items-center border border-black border-dashed">
        <Play class="mr-2 h-6 w-6" />
        Play
      </a>
    </div>
  </nav>