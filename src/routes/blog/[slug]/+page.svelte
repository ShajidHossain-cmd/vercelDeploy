
    
   

<script>
// @ts-nocheck


 import { page } from '$app/stores';
  
  /** @type {import('./$types').PageData} */
  export let data;
  import { Section, BlogTemplate, Comment, CommentItem } from 'flowbite-svelte-blocks';
  import { Button, Textarea, Label, Dropdown, DropdownItem } from 'flowbite-svelte';
  import { DotsHorizontalOutline } from 'flowbite-svelte-icons';
  import { twMerge } from 'tailwind-merge';

import { MessageDotsOutline } from 'flowbite-svelte-icons';

export let replyButton = true;

const articleClsCOMMENT = twMerge('p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900', $$props.articleClass);
const footerClsCOMMENT = twMerge('flex justify-between items-center mb-2', $$props.footerClass);
const pClsCOMMENT = twMerge('text-sm text-gray-600 dark:text-gray-400', $$props.classP);
// blog temp  css
const articleCls = twMerge('mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert', $$props.classArticle);
const headerCls = twMerge('mb-4 lg:mb-6 not-format', $$props.classHeader);
const addressCls = twMerge('flex items-center mb-6 not-italic', $$props.classAddress);
const divCls = twMerge('inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white', $$props.classDiv);
const h1Cls = twMerge('pl-3 mb-4 text-2xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white', $$props.classH1);
const authorCls = twMerge(' text-xl font-bold text-gray-900 dark:text-white', $$props.classAuthor);
const imgCls = twMerge('mr-2 w-6 h-6 rounded-full', $$props.classImg);
const pCls = twMerge('text-base font-light text-gray-500 dark:text-gray-400', $$props.classP);
// blog temp  css

const comments = data.blog.comments
  const totalComments = comments.length;
const blog  = data.blog;
let Discussion;
if (comments) {
  const totalReplies = comments.reduce((count, comment) => count + comment.replies.length, 0);
  Discussion = totalComments + totalReplies
  
}

// console.log(data);
let isReplying = {};
let isEditing = {};
// let replyText = {};
let isReplyingIn = {};
// let replyTextIn = {};
  
function openEdit(commentId) {
  isEditing[commentId] = true;
}
function closeEdit(commentId) {
  isEditing[commentId] = false;
  
}
function openReply(commentId) {
  isReplying[commentId] = true;
}

function closeReply(commentId) {
  isReplying[commentId] = false;
  // replyText[commentId] = '';
}
function openReplyIn(ReplyId) {
  isReplyingIn[ReplyId] = true;
}

function closeReplyIn(ReplyId) {
  isReplyingIn[ReplyId] = false;
  // replyTextIn[ReplyId] = '';
}

</script>





<!-- blog temp -->


<article class={articleCls}>
  <header class={headerCls}>
    <address class={addressCls}>
      <div class={divCls}>
        <img class={imgCls}
        src={blog.author.profilePicture}
        alt={blog.author.name}>
          <div>
            {#if blog.author.href}
              <a href={blog.author.href} rel="author" class="{authorCls}">
                {blog.author.name}
              </a>
            {/if}
            <p class={pCls}>
              <!-- {blog.author.title} -->
              {blog.author.name}
            </p>
            {#if blog.date}
            <p class="{pCls}">
              <time datetime="{blog.isoDate}" title="{blog.date}">
                {blog.date}
              </time>
            </p>
            {/if}
          </div>
      </div>
    </address>
    <h1 class="{h1Cls}">{blog.title}</h1>
  </header>
 <div class="pl-3">
  {@html blog.content}
 </div>
  
  <slot />
</article>



<!-- blog temp -->
<Section name='comment' classSection='bg-white dark:bg-gray-900'>
  <Comment title="Discussion ({Discussion})">
     <form method="POST" class="mb-6" name="commentForm" id="commentForm">
      <input type="hidden" name="sessionName" value={$page.data.session?.user?.name}>
      <input type="hidden" name="sessionImage" value={$page.data.session?.user?.image}>
      <input type="hidden" name="sessionEmail" value={$page.data.session?.user?.email}>
      <Label for="comment" class="sr-only">Your comment</Label>
      <Textarea name="content" id="comment" rows="6" class="mb-4"
          placeholder="Write a comment..." required>
      </Textarea> {#if $page.data.session}
         <Button form="commentForm"  name="commentForm" id="commentForm" type="submit" class="px-4 text-xs font-medium" >
        Post comment
      </Button>
      {:else}
     <Button href="/auth/signin" type="button" class="px-4 text-xs font-medium" >
        Post comment
      </Button>
      {/if}
    </form>
    
     {#each comments as comment,  i} 
     <!-- if i is not zero -->
     {#if i < 0 }
    <h1>no comments </h1>
     {/if}
     <!--  .Page...-->

<article class="{articleClsCOMMENT}" id={comment._id}>
  <footer class="{footerClsCOMMENT}">
    <div class="flex items-center">
      <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
        <img class="mr-2 w-6 h-6 rounded-full"
        src="{comment.commenter.profilePicture}"
        alt="{comment.commenter.name}">
        {comment.commenter.name}
      </p>
      {#if comment.date}
      <p class="{pClsCOMMENT}">
        <time datetime="{comment.isoDate}" title="{comment.date}">
          {comment.date}
        </time>
      </p>
      {/if}
    </div>

<!-- {#if Discussion > 0} -->
  {#if data.session?.user?.email === comment.commenter
.email }
          <div class="flex space-x-2">
           
{#if isEditing[comment._id]}
<form form method="POST" name={`replyEditForm${comment._id}`} id={`replyEditForm${comment._id}`}>
  <input type="hidden" name="CommentEditID" value={comment._id}>
  <textarea name="CommentEditContent" rows="3" bind:value={comment.content} required></textarea>
  <button class="text-sm text-gray-500 hover:underline dark:text-gray-400" type="submit" form={`replyEditForm${comment._id}`}>Save</button>
  <button class="text-sm text-gray-500 hover:underline dark:text-gray-400" type="button" on:click={() => closeEdit(comment._id)}>Cancel</button>
</form>
{:else}
<button class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400" type="button" on:click={() => openEdit(comment._id)}>Edit</button>
{/if}
           
      
    
        {#if !isEditing[comment._id]}
<form form method="POST" name={`replyRemoveForm${comment._id}`} id={`replyRemoveForm${comment._id}`}>
  <input type="hidden" name="CommentDeleteID" value={comment._id}>
  <button class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400" name={`replyRemoveForm${comment._id}`} id={`replyRemoveForm${comment._id}`} type="submit" form={`replyRemoveForm${comment._id}`}>Delete</button>
</form>
{/if}
         </div>
         {/if}
         
<!-- {/if} -->
         
           
 
      
  </footer>
  <p class="text-gray-500 dark:text-gray-400">
    {comment.content}
  </p> <div>
{#if replyButton}
    <slot name="reply">
    <div class="flex items-center mt-4 space-x-4">
    
         {#if isReplying[comment._id]}
          <div class="flex items-center space-x-4">
            
       <form method="POST" name={`replyForm${comment._id}`} id={`replyForm${comment._id}`}>
         <input type="hidden" name="sessionName" value={$page.data.session?.user?.name}>
      <input type="hidden" name="sessionImage" value={$page.data.session?.user?.image}>
      <input type="hidden" name="sessionEmail" value={$page.data.session?.user?.email}>
      <input type="hidden" name="CommentID" value="{comment._id}">
            <textarea name="commentReply"  rows="3" placeholder="Write your reply..." required></textarea>
          <button
          name={`replyForm${comment._id}`} id={`replyForm${comment._id}`}
          type="submit"
          form={`replyForm${comment._id}`}
           
  
   class="text-sm text-gray-500 hover:underline dark:text-gray-400"
   >Reply</button>
        
            
            <button type="button" on:click={() => closeReply(comment._id)} class="text-sm text-red-500 hover:underline dark:text-red-400">Cancel</button>
           </form>
           
          </div>
         
        {:else}
          <button type="button" on:click={() => openReply(comment._id)} class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
            <!-- <MessageDotsOutline class="mr-1 w-4 h-4" /> -->
            
            Reply
          </button>
        {/if}
    </div>
    </slot>
  {/if}
  </div>
  
  
</article>

{#if comment.replies}
{#each comment.replies as reply}

   <article Class="ml-6 lg:ml-12">
    <article class="{articleClsCOMMENT}" id={reply._id}>
  <footer class="{footerClsCOMMENT}">
    <div class="flex items-center">
      <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
        <img class="mr-2 w-6 h-6 rounded-full"
        src="{reply.commenter.profilePicture}"
        alt="{reply.commenter.name}">
        {reply.commenter.name}
      </p>
      {#if reply.date}
      <p class="{pClsCOMMENT}">
        <time datetime="{reply.isoDate}" title="{reply.date}">
          {reply.date}
        </time>
      </p>
      {/if}
    </div>
    <!-- <slot name='dropdownMenu'/> -->
   <!-- reply -->
    {#if data.session?.user?.email === reply.commenter
.email }
   <div class="flex space-x-2">
           
{#if isEditing[reply._id]}
<form form method="POST" name={`replyEditForm${reply._id}`} id={`replyEditForm${reply._id}`}>
  <input type="hidden" name="replyEditID" value={reply._id}>
   <input type="hidden" name="CommentReplyEditID" value={comment._id}>
  <textarea name="replyEditContent" rows="3" bind:value={reply.content} required></textarea>
  <button class="text-sm text-gray-500 hover:underline dark:text-gray-400" type="submit" form={`replyEditForm${reply._id}`}>Save</button>
  <button class="text-sm text-gray-500 hover:underline dark:text-gray-400" type="button" on:click={() => closeEdit(reply._id)}>Cancel</button>
</form>
{:else}
<button class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400" type="button" on:click={() => openEdit(reply._id)}>Edit</button>
{/if}
           
      
    
        {#if !isEditing[reply._id]}
<form form method="POST" name={`replyRemoveForm${reply._id}`} id={`replyRemoveForm${reply._id}`}>
  <input type="hidden" name="replyDeleteID" value={reply._id}>
  <input type="hidden" name="CommentReplyDeleteID" value={comment._id}>
  <button class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400" name={`replyRemoveForm${reply._id}`} id={`replyRemoveForm${reply._id}`} type="submit" form={`replyRemoveForm${reply._id}`}>Delete</button>
</form>
{/if}
         </div>
         {/if}
   <!-- reply -->
    
  </footer>
  <p class="text-gray-500 dark:text-gray-400">
    {reply.content}
  </p>
  {#if replyButton}
    <slot name="reply">
    <div class="flex items-center mt-4 space-x-4">
     
    
         {#if isReplyingIn[reply._id]}
          <div class="flex items-center space-x-4">
            <!-- <textarea bind:value={replyTextIn[reply.id]} rows="3" placeholder="Write your reply..."></textarea> -->
            <form method="POST" name={`replyForm${reply._id}`} id={`replyForm${reply._id}`}>
               <input type="hidden" name="sessionName" value="{$page.data.session?.user?.name}">
                 <input type="hidden" name="sessionEmail" value={$page.data.session?.user?.email}>
      <input type="hidden" name="sessionImage" value="{$page.data.session?.user?.image}">
             <input type="hidden" name="ReplyID" value="{reply._id}">
     <input type="hidden" name="CommentID" value="{comment._id}">
            <textarea name="repliesReply" rows="3" placeholder="Write your reply..." required></textarea>
          
           <button
          name={`replyForm${reply._id}`} id={`replyForm${reply._id}`}
          type="submit"
          form={`replyForm${reply._id}`}
           
  
  class="text-sm text-gray-500 hover:underline dark:text-gray-400"
  
>Reply</button>
            <button type="button" on:click={() => closeReplyIn(reply._id)} class="text-sm text-red-500 hover:underline dark:text-red-400">Cancel</button>
        </form>
          </div>
        {:else}
          <button type="button" on:click={() => openReplyIn(reply._id)} class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
            <!-- <MessageDotsOutline class="mr-1 w-4 h-4" /> -->
            Reply
          </button>
        {/if}
    </div>
    </slot>
  {/if}
</article>
   </article>
{/each}
{/if}
 {/each}

  <!-- asdfsa -->
  </Comment>
</Section>

