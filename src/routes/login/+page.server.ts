import { AuthApiError, type Provider } from "@supabase/supabase-js"
// import { redirect } from "sveltekit-flash-message/server"
import { redirect } from "@sveltejs/kit";
import { setFlash } from 'sveltekit-flash-message/server';
import { error, fail } from "@sveltejs/kit"
import type { Actions } from "./$types"

const OAUTH_PROVIDERS = ["google", "discord", "github"]

export const actions = {
	login: async (event) => {
		const provider = event.url.searchParams.get("provider") as Provider
	
		if (provider) {
			if (!OAUTH_PROVIDERS.includes(provider)) {
				return fail(400, {
					error: "Provider not supported.",
				})
			}
			const { error: err } = await event.locals.sb.auth.signInWithOAuth({
				provider: provider,
			})

			if (err) {
				return fail(400, {
					message: "Something went wrong.",
				})
			}

			throw redirect(303, "/login")
		}

		const body = Object.fromEntries(await event.request.formData())
		
		
		const { data, error: err } = await event.locals.sb.auth.signInWithPassword({
			email: body.email as string,
			password: body.password as string,
		})
		if (err) {
			console.log(err)
			console.log()
			if (err instanceof AuthApiError && err.status === 400) {
				setFlash({ type: 'error', message: 'Email or Password Incorrect' }, event)
				throw redirect(303, "/login")

			}
			
			setFlash({ type: 'error', message: 'Please enter text.' }, event)
		}
		setFlash({ type: 'error', message: 'Please enter text.' }, event)

		throw redirect(303, "/login")
	},
} satisfies Actions