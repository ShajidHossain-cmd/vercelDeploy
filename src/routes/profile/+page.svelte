
<script>
import { page } from '$app/stores';
import { Section, SidebarBottomNav, SidebarBottomNavItem } from 'flowbite-svelte-blocks';
import {Input, Button, Sidebar, SidebarGroup, SidebarItem, SidebarWrapper, SidebarDropdownItem, SidebarDropdownWrapper, Dropdown, DropdownItem,Avatar,Label } from 'flowbite-svelte';


     /** @type {import('./$types').PageData} */
  export let data;
  let userName = data.session?.user?.name;
  let userImage = data.session?.user?.image;
  let userEmail = data.session?.user?.email;
  let editing = false;
console.log(userEmail);
</script>


<div class="flex items-center space-x-4  ml-7 mb-80">
    <Avatar src={userImage} rounded />
    <div class="space-y-1 font-medium dark:text-white">
    <div class="flex justify-center">
      <p>{userName}</p>
     {#if editing}
    <form method="POST" name="EditUserNameForm" id="EditUserNameForm">
    <Input id="small-input" name="EditUserNameContent" size="sm" value={userName} />
    <input type="hidden" name="userEmail" value={userEmail}>
    <button type="submit" form="EditUserNameForm" class="ml-2 w-[12px] h-[12px] text-gray-800 dark:text-white">
     <svg  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M1 5.917 5.724 10.5 15 1.5"/>
     </svg>
    </button>
     <button type="button" on:click={()=> editing = false} class="ml-2 w-[12px] h-[12px] text-gray-800 dark:text-white">
     <svg  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
    <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z"/>
    </svg>
    </button>
    </form>
    {:else}
   <button type="button" on:click={()=> editing = true} class="ml-2 w-[12px] h-[12px] text-gray-800 dark:text-white">
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="m13.835 7.578-.005.007-7.137 7.137 2.139 2.138 7.143-7.142-2.14-2.14Zm-10.696 3.59 2.139 2.14 7.138-7.137.007-.005-2.141-2.141-7.143 7.143Zm1.433 4.261L2 12.852.051 18.684a1 1 0 0 0 1.265 1.264L7.147 18l-2.575-2.571Zm14.249-14.25a4.03 4.03 0 0 0-5.693 0L11.7 2.611 17.389 8.3l1.432-1.432a4.029 4.029 0 0 0 0-5.689Z"/>
      </svg>
    </button>
   {/if}

      
      
  
    </div>
    <div class="text-sm text-gray-500 dark:text-gray-400">Joined in August 2014</div>
     </div>
    </div>