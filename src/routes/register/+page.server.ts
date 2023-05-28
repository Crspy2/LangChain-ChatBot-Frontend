import { AuthApiError } from "@supabase/supabase-js"
import { redirect, fail } from "@sveltejs/kit"
import { setFlash } from "sveltekit-flash-message/server"

import type { Actions } from "./$types"

export const actions: Actions = {
	register: async (event) => {
		const body = Object.fromEntries(await event.request.formData())

		const { error: err} = await event.locals.sb.auth.signUp({
			email: body.email as string,
			password: body.password as string,
		})

		

		if (err) {
			console.log(`Error is ${err}`)
			if (err instanceof AuthApiError) {
				if (err.status === 400) {
					setFlash({ type: 'error', message: 'Email or Password Incorrect' }, event)
					throw redirect(303,"/register")
				}
				setFlash({ type: 'error', message: 'Please enter text.' }, event)
				throw redirect(303,"/register")
			}
			setFlash({ type: 'error', message: 'Server error. Please try again later.' }, event)
			throw redirect(303,"/register")
		}

		throw redirect(303, "/");
	}
}