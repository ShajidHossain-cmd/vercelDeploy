

<script>
    import Googlelogo from "$lib/assets/google.png";
    import UrbanGlogo from "$lib/assets/PlantCircle.svg";
    import { Section, Register } from 'flowbite-svelte-blocks';
import { Button, Checkbox, Label, Input } from 'flowbite-svelte';
 import { signIn, signOut } from '@auth/sveltekit/client';
 import { page } from '$app/stores';

 let email = '';

 const handleEmailSignIn = () => {
     signIn('email', { email, callbackUrl: '/blog/create' });
 };

 const handleGoogleSignIn = () => {
     signIn('google', { callbackUrl: '/blog/create' });
 };

 const handleSignOut = () => {
     signOut();
 }
</script>

<!-- <div>

 {#if !$page.data.session}

  <form on:submit={handleEmailSignIn}>
   <input label="Email" type="email" bind:value={email} />
   <button>Continue</button>
  </form>

  <button on:click={handleGoogleSignIn}>
   Continue with Google
  </button>
 {/if}

 {#if $page.data.session}

  <div>
   <button on:click={handleSignOut}>Sign out</button>
  </div>

 {/if}

</div> -->


<Section name="login">
  <Register href="/">
    <!-- <svelte:fragment slot="top">
      <img class="w-8 h-8 mr-2" src={UrbanGlogo} alt="UrbanGlogo" />
      UrbanG
    </svelte:fragment> -->
    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        {#if !$page.data.session}
      <form on:submit={handleEmailSignIn} class="flex flex-col space-y-6" >
        <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Sign Up</h3>
        <Label class="space-y-2">
          <span>Your email</span>
          <Input bind:value={email} type="email" name="email" placeholder="name@company.com" required />
        </Label>
        <!-- <Label class="space-y-2">
          <span>Your password</span>
          <Input type="password" name="password" placeholder="•••••" required />
        </Label> -->
        <div class="flex items-start">
          <Checkbox>Remember me</Checkbox>
          <a href="/" class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Forgot password?</a>
        </div>
        <Button type="submit" class="w-full1" >Sign up</Button>
         </form>
         <h2>Continue with Google:</h2>
         <button on:click={handleGoogleSignIn}>
   <img class="w-8 h-8 mr-2" src={Googlelogo} alt="Googlelogo" />
  </button>
          
        {/if}
         {#if $page.data.session}
         <Button on:click={handleSignOut} class="w-full1" >Sign out</Button>
          {/if}
        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
           Have an account yet? <a href="/" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</a>
        </p>
     
    </div>
  </Register>
</Section>