
<script>
// @ts-nocheck

  /** @type {import('./$types').PageData} */
  export let data;
</script>
<h1>{data.blog.title}</h1>
<span>{data.blog.author}</span><span>{data.blog.date}</span>
<p>{data.blog.content}</p>