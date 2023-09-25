<script>
  import Editor from '@tinymce/tinymce-svelte';
  import { page } from '$app/stores';
  import { Button, Input ,Label} from 'flowbite-svelte';
  let blogContent = 'Write your blog';

</script>
<div class="flex justify-center">
  <form method="POST" name="BlogForm" id="BlogForm">
    <div class="mb-5">
   
     <Label for="title" class="block mb-2">Title:</Label>
        <Input type="text" name="title" id="title" maxlength="50" required />
        <Label for="description" class="block mb-2">Description:</Label>
        <Input type="text" name="description" id="description" maxlength="150" required />
    </div>
  


  <!-- Include session data as a hidden input field -->
  <input type="hidden" name="authorName" value={$page.data.session?.user?.name}>
  <input type="hidden" name="authorName" value={$page.data.session?.user?.email}>
  <input type="hidden" name="authorEmail" value={$page.data.session?.user?.image}>
  <input type="hidden" name="blogContent" value={blogContent}>
<Editor

  bind:value={blogContent}
    apiKey="lvqda5tucy7i6n0b7ng5gzf3upmfqygchv45fpyfiusqtc59"
  />
  <Button type="submit" class="mt-2" name="BlogForm" id="BlogForm">Submit</Button>
</form>
</div>

 


