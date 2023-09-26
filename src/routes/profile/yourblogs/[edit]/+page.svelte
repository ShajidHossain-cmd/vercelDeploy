<script>



  import Editor from '@tinymce/tinymce-svelte';
  import { page } from '$app/stores';
  import { Button, Input ,Label} from 'flowbite-svelte';
   /** @type {import('./$types').PageData} */
  export let data;
  let blogContent = data.blog.content;
  let blogTitle = data.blog.title;
  let blogDescription = data.blog.description;
  let blogimage = data.blog.image;
  // let blogID = data.blog._id;
  let authorName = data.session?.user?.name;
  let authorImage = data.session?.user?.image;
  let authorEmail = data.session?.user?.email;

</script>

<div class="flex justify-center">
  <form  method="POST" name="EditForm" id="EditForm">
    <div class="mb-5">
   
     <Label for="title" class="block mb-2">Title:</Label>
        <Input value={blogTitle} type="text" name="title" id="title" maxlength="50" required />
         <Label for="description" class="block mb-2">Description:</Label>
        <Input value={blogDescription} type="text" name="description" id="description" maxlength="150" required />
        <Label for="description" class="block mb-2">Thumbnail:</Label>
        <Input type="text" name="ImageLink" id="ImageLink" value={blogimage} required />
    </div>
  


  <!-- Include session data as a hidden input field -->
  <input type="hidden" name="authorName" value={authorName}>
  <input type="hidden" name="authorImage" value={authorImage}>
  <input type="hidden" name="authorEmail" value={authorEmail}>
  <input type="hidden" name="blogContent" value={blogContent}>
<Editor 

  bind:value={blogContent}
    apiKey="lvqda5tucy7i6n0b7ng5gzf3upmfqygchv45fpyfiusqtc59"
  />
  <Button  type="submit" class="mt-2" name="EditForm" id="EditForm">Submit</Button>
</form>
</div>