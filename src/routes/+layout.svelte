<script lang="ts">
	import '../app.postcss';

	import { page } from "$app/stores"
	import toast, { Toaster } from "svelte-french-toast"
	import { initFlash } from "sveltekit-flash-message/client"
	import { invalidateAll } from '$app/navigation'
	import { supabaseClient } from '$lib/supabase'
	import { onMount } from 'svelte'

	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			console.log('Auth state change detected');
			invalidateAll();
		});

		return () => {
			subscription.unsubscribe();
		};
	});

	const flash = initFlash(page)

	$: if ($flash) {
		switch ($flash.type) {
			case "success":
				toast.success($flash.message)
				break
			case "error":
				toast.error($flash.message)
				break
		}
	}
</script>


<svelte:head>
	<title>ChainBot</title>
</svelte:head>
<Toaster/>
<slot />