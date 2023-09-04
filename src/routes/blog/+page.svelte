<script>
// @ts-nocheck

	import { page } from '$app/stores';

  /** @type {import('./$types').PageData} */
  export let data;

	
</script>
 <h1><a href="blog/create">Create</a></h1>
 <ul>
    {#each data.BlogList as BlogList}
      <li>
        <a href="/blog/{BlogList._id}">
          {BlogList.title}
        </a>
      </li>
    {/each}
  </ul>
