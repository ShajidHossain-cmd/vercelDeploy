<script>
  import { onMount } from 'svelte';
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, TableSearch, Button, Dropdown, DropdownItem, Checkbox, ButtonGroup } from 'flowbite-svelte';
  import { Section } from 'flowbite-svelte-blocks';
  import {DotsHorizontalOutline, PlusSolid, ChevronDownSolid, FilterSolid, ChevronRightOutline, ChevronLeftOutline } from 'flowbite-svelte-icons';
    
  /** @type {import('./$types').PageData} */
  export let data;
  let paginationData  = data.matchingBlogs
 

  let divClass='bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden';
  let innerDivClass='flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4';
  let searchClass='w-full md:w-1/2 relative';
  let svgDivClass='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none';
  let classInput="text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2  pl-10";



  $: filteredItems = paginationData
</script>

<Section classSection='bg-gray-50 dark:bg-gray-900 p-3 sm:p-5'>
    <!-- <TableSearch placeholder="Search" hoverable={true} bind:inputValue={searchTerm} {divClass} {innerDivClass} {searchClass} {classInput} > -->
    <TableSearch placeholder="Search" hoverable={true}  {divClass} {innerDivClass} {searchClass} {classInput} >

    <div slot="header" class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
      <Button href="/blog/create">
        <PlusSolid class="h-3.5 w-3.5 mr-2" />Write New Blog
      </Button>
      
      
    </div>
      <TableHead>
        <TableHeadCell padding="px-4 py-3" scope="col">Name</TableHeadCell>
        <TableHeadCell padding="px-4 py-3" scope="col">Title</TableHeadCell>
        <TableHeadCell padding="px-4 py-3" scope="col">Date</TableHeadCell>
       
      </TableHead>
      <TableBody class="divide-y">

          {#each filteredItems as item (item._id)}
            <TableBodyRow>
              <TableBodyCell tdClass="px-4 py-3">{item.author.name}</TableBodyCell>
          
      
              <TableBodyCell tdClass="px-4 py-3">{item.title}</TableBodyCell>
              <TableBodyCell tdClass="px-4 py-3">{item.date}</TableBodyCell>
              <TableBodyCell tdClass="px-4 py-3">
                <form name="deleteForm" id="deleteForm" method="POST">
                   <input type="hidden" name="DeleteID" value="{item._id}">
                  
<!-- <Button name="deleteForm" id="deleteForm" type="submit">Delete</Button> -->
<Button name="deleteForm" id="deleteForm" type="submit"><svg class="w-[14px] h-[14px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
    <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z"/>
  </svg></Button>
  <Button href="/blog/{item._id}"><svg class="w-[14px] h-[14px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M1.933 10.909A4.357 4.357 0 0 1 1 9c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 19 9c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M2 17 18 1m-5 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
  </svg></Button>
  <Button href="/profile/yourblogs/{item._id}"><svg class="w-[14px] h-[14px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="m13.835 7.578-.005.007-7.137 7.137 2.139 2.138 7.143-7.142-2.14-2.14Zm-10.696 3.59 2.139 2.14 7.138-7.137.007-.005-2.141-2.141-7.143 7.143Zm1.433 4.261L2 12.852.051 18.684a1 1 0 0 0 1.265 1.264L7.147 18l-2.575-2.571Zm14.249-14.25a4.03 4.03 0 0 0-5.693 0L11.7 2.611 17.389 8.3l1.432-1.432a4.029 4.029 0 0 0 0-5.689Z"/>
  </svg></Button>
                </form>
              
              </TableBodyCell>
             
            </TableBodyRow>
          {/each}
      
      </TableBody>
     
    </TableSearch>
</Section>