<script lang="ts">
//  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Avatar, Dropdown, DropdownItem, DropdownHeader, DropdownDivider } from 'flowbite-svelte';
  import "../app.postcss";
  import { page } from '$app/stores';


import logo from "$lib/assets/PlantCircle.svg";
  
  import { Footer, FooterBrand, FooterLinkGroup, FooterLink ,Navbar, NavBrand, NavLi, NavUl, NavHamburger, Avatar, Dropdown, DropdownItem, DropdownHeader, DropdownDivider } from 'flowbite-svelte';

import { signIn, signOut } from '@auth/sveltekit/client';
 const handleSignOut = () => {
     signOut();
 }

import { goto, afterNavigate } from '$app/navigation';
import { base } from '$app/paths'

let previousPage : string = base ;

afterNavigate(({from}) => {
   previousPage = from?.url.pathname || previousPage
}) 


const goSomeWhere = () :void => {
    goto(previousPage)
}
</script>

<Navbar let:hidden let:toggle>
  <button on:click={goSomeWhere}><svg class="w-[14px] h-[14px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M13 5H1m0 0 4 4M1 5l4-4"/>
  </svg></button>
 <NavBrand href="/">
  <img src={logo} class="mr-3 h-6 sm:h-9" alt="UrbanG Logo" />
  <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">UrbanG</span>
</NavBrand>

  
   {#if $page.data.session}
<div class="flex items-center md:order-2"> 
    <Avatar  loading="lazy" id="avatar-menu" src="{$page.data.session?.user?.image}" />  
    <!-- lazy load this later -->
    <NavHamburger on:click={toggle} class1="w-full md:flex md:w-auto md:order-1" />
  </div>
  <Dropdown placement="bottom" triggeredBy="#avatar-menu">
    <DropdownHeader>
      <span class="block text-sm">{$page.data.session?.user?.name}</span>
      <span class="block truncate text-sm font-medium">{$page.data.session?.user?.email}</span>
    </DropdownHeader>
    <DropdownItem href="/profile">Dashboard</DropdownItem>
    <DropdownItem>Settings</DropdownItem>
    <DropdownItem>Earnings</DropdownItem>
    <DropdownDivider />
    <DropdownItem> <button on:click={handleSignOut}>Sign out</button></DropdownItem>
  </Dropdown>
 {/if}
  
  <NavUl {hidden}>
    <NavLi href="/" active={true}>Home</NavLi>
    <NavLi href="/blog">Blogs</NavLi>
    <NavLi href="/blog/create">Create</NavLi>
    
  </NavUl>
</Navbar>
<main>
<slot />
</main>



<Footer footerType="socialmedia">
  <div class="mx-auto max-w-screen-xl text-center">
    <FooterBrand href="#" src={logo} alt="Garden Logo" name="UrbanG" aClass="flex justify-center items-center text-2xl font-semibold text-green-800" />
    <p class="my-6 text-gray-500 dark:text-gray-400">Discover the world of gardening with our blog. Get tips, advice, and inspiration for your garden.</p>
    <FooterLinkGroup ulClass="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
      <FooterLink liClass="" aClass="mr-4 hover:underline md:mr-6" href="/">About</FooterLink>
      <FooterLink liClass="" aClass="mr-4 hover:underline md:mr-6" href="/blog">Blog</FooterLink>
      <FooterLink liClass="" aClass="mr-4 hover:underline md:mr-6" href="/">Resources</FooterLink>
      <FooterLink liClass="" aClass="mr-4 hover:underline md:mr-6" href="/">Contact</FooterLink>
    </FooterLinkGroup>
    <div>Icons made from <a href="https://www.onlinewebfonts.com/icon">svg icons</a>is licensed by CC BY 4.0</div>
    <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 Garden Blog. All Rights Reserved.</span>

  </div>
</Footer>
