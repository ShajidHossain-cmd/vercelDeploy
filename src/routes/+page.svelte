<script>
  import { Section, News, HeroHeader, HeroBody } from 'flowbite-svelte-blocks';
  import { Button } from 'flowbite-svelte';
  import { ArrowRightSolid } from 'flowbite-svelte-icons';
import { page } from '$app/stores';
  /** @type {import('./$types').PageData} */
  export let data;

</script>

<Section name="heroDefault">
  
  <HeroHeader>
    <svelte:fragment slot="h1">Plant Enthusiast’s Blog</svelte:fragment>
    <svelte:fragment slot="paragraph">Join our gardening community! Sign up, create your blog, and share gardening wisdom. Explore expert tips, ask questions, and connect with fellow garden enthusiasts. Let's grow together!</svelte:fragment>
  </HeroHeader>

  <div class="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
 {#if !$page.data.session}

  <a href="/login">
      <Button size="lg" color="red">
       Sign Up <ArrowRightSolid size="md" class="ml-2 -mr-1" />
      </Button>
    </a>
 {/if}
    
    <a href="/blog">
      <Button size="lg" color="light">
       
      All Blogs
      </Button>
    </a>
  </div>
  
</Section>
<HeroHeader>
   <svelte:fragment slot="h1">Explore the Beauty of Gardening</svelte:fragment>
    <svelte:fragment slot="paragraph">Experience the beauty of gardening through these captivating images. Explore vibrant colors, lush landscapes, and inspiring moments that showcase the art of gardening. Let nature's allure inspire your own gardening journey.</svelte:fragment>
</HeroHeader>


  <div class="max-w-5xl mx-auto">
  
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each data.BlogList.slice(0, 6) as BlogList}
        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
          <img src={BlogList.image} alt={BlogList.title} class="w-full h-40 object-cover object-center" />

          <div class="p-4">
             <a href="/blog/{BlogList._id}" class="mt-4 inline-block text-green-600 hover:underline">  <h2 class="text-xl font-semibold text-green-800">{BlogList.title}</h2></a>
          
            <p class="text-gray-600 mt-2">{BlogList.description}</p>
            <a href="/blog/{BlogList._id}" class="mt-4 inline-block text-green-600 hover:underline">Read More</a>
          </div>
        </div>
       {/each}
    </section>
  </div>



<style>
img {
  height: 200px;
  width: 400px;
}
</style>


  