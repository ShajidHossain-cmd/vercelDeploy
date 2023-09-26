<script>


  
  /** @type {import('./$types').PageData} */
  export let data;
let  h2Class = ' py-4 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white';
  import { Section, ArticleAuthor, ArticleBody, ArticleHead, ArticleWrapper, BlogHead, BlogBodyWrapper } from 'flowbite-svelte-blocks';
  import {  ArrowRightOutline, NewspaperSolid } from 'flowbite-svelte-icons';
  
</script>



 {#each data.BlogList as BlogList}
      <Section name="blog">
 
  <BlogBodyWrapper>
    <ArticleWrapper>
      <ArticleHead>
        <span class="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
          <NewspaperSolid size="xs" class="mr-1" />
          Blog
        </span>
        <span class="text-sm">Date: {BlogList.date}</span>
      </ArticleHead>
      <ArticleBody    >
        <svelte:fragment slot="h2"><a href="/blog/{BlogList._id}">{BlogList.title}</a></svelte:fragment>
        <svelte:fragment slot="paragraph">
          <p class="mb-5 font-light text-gray-500 dark:text-gray-400">{BlogList.description}</p>
        </svelte:fragment>
      </ArticleBody>
      <ArticleAuthor >
        <svelte:fragment slot="author">
          <img class=" w-7 h-7 rounded-full" src={BlogList.author.
profilePicture
} alt={BlogList.author.name}/>
          <span class="font-medium dark:text-white"> {BlogList.author.name} </span>
        </svelte:fragment>
        <a href="/blog/{BlogList._id}" class="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
          Read more
          <ArrowRightOutline size="sm" class="ml-2" />
        </a>
      </ArticleAuthor>
    </ArticleWrapper>


  </BlogBodyWrapper>
</Section>
    {/each}
