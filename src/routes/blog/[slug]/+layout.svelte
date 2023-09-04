<script>
// @ts-nocheck

  /** @type {import('./$types').LayoutData} */
  export let data;
// console.log(data)
</script>

<main>
  <!-- +page.svelte is rendered in this <slot> -->
  <slot />
</main>

<aside>
  <h2>More posts</h2>
  <ul>
    {#each data.BlogList as BlogList}
      <li>
        <a href="/blog/{BlogList._id}">
          {BlogList.title}
        </a>
      </li>
    {/each}
  </ul>
</aside>