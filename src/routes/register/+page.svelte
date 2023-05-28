<script lang="ts">
	import Icon from 'svelte-icons-pack/Icon.svelte'
	import BsDiscord from "svelte-icons-pack/bs/BsDiscord"
	import BsGithub from "svelte-icons-pack/bs/BsGithub"
	import BsGoogle from "svelte-icons-pack/bs/BsGoogle"

	import { page } from "$app/stores"
	import { getFlash } from "sveltekit-flash-message/client"

	let flash = getFlash(page)

	let email = ""
	let emailError: string = ""

	const emailUpdate = () => {
		if (email.length == 0) {
			emailError = ""
		} else if (!email.includes("@")) {
			emailError = "Please enter a valid email"
		} else if (!email.includes(".")) {
			emailError = "Please enter a valid email"
		} else {
			emailError = ""
		}

	}
	
	let password = ""
	let checkPswd = ""
	let passwordError: string = ""
	const passwordUpdate = () => {
		if (password.length == 0) {
			passwordError = ""
		} else if (password.length <= 6) {
			passwordError = "Password must be at least 6 characters!"
		} else if (!password.includes('!') && !password.includes("@") && !password.includes("#") && !password.includes("$") && !password.includes("%") && !password.includes("^") && !password.includes("&") && !password.includes("*") && !password.includes("(") && !password.includes(")") && !password.includes("-") && !password.includes("_") && !password.includes("+") && !password.includes("=")) {
			passwordError = "Passwords must include at least one special character!"
		} else if (password.startsWith('!') && password.startsWith("@") && password.startsWith("#") && password.startsWith("$") && password.startsWith("%") && password.startsWith("^") && password.startsWith("&") && password.startsWith("*") && password.startsWith("(") && password.startsWith(")") && password.startsWith("-") && password.startsWith("_") && password.startsWith("+") && password.startsWith("=")) {
			passwordError = "Passwords cannot start with special characters!"
		} else if (password.endsWith('!') && password.endsWith("@") && password.endsWith("#") && password.endsWith("$") && password.endsWith("%") && password.endsWith("^") && password.endsWith("&") && password.endsWith("*") && password.endsWith("(") && password.endsWith(")") && password.endsWith("-") && password.endsWith("_") && password.endsWith("+") && password.endsWith("=")) {
			passwordError = "Passwords cannot end with special characters!"
		} else {
			passwordError = ""
		}
	}

</script>

<main>
	<h1>Register</h1>
	{#if $flash && $flash.message}
		<div class="alert alert-error shadow-lg">
			<div>
				<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
				<span>{$flash?.message}</span>
			</div>
		</div>
	{/if}
	<form action="?/register" method="POST" class="auth-form">
		<label for=""> Email </label>
		<input bind:value={email} on:change={emailUpdate} type="text" name="email" />
		{#if emailError.length > 2}
			<p class="">{emailError}</p>
		{/if}
		<label for=""> Password </label>
		<input bind:value={password} on:change={passwordUpdate} type="password" name="password" />
		{#if passwordError !== ""}
			<p class="">{passwordError}</p>
		{/if}
		<label for=""> Confirm Password </label>
		<input bind:value={checkPswd} type="password" name="password" />
		{#if checkPswd !== password}
			<p class="">Passwords Need to Match!</p>
		{/if}
		{#if (email == "" || emailError !== "" || password == "" || passwordError !== "")}
			<button type="submit" class="btn btn-primary" disabled>Register</button>
		{:else}
			<button type="submit" class="btn btn-primary">Register</button>
		{/if}
	</form>
</main>
