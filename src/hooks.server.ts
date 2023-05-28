import "$lib/supabase"
import { getSupabase } from "@supabase/auth-helpers-sveltekit"
import type { Handle } from "@sveltejs/kit"
import { redirect } from "sveltekit-flash-message/server"

export const handle: Handle = async ({ event, resolve }) => {
	const { session, supabaseClient } = await getSupabase(event)

	event.locals.sb = supabaseClient
	event.locals.session = session

	if (event.url.pathname.startsWith("/register") && event.locals.session?.user !== undefined) {
		throw redirect(303, "/", {type: "error", message: "Already Authorized"}, event)
	}

	if (event.url.pathname.startsWith("/login") && event.locals.session?.user !== undefined) {
		throw redirect(303, "/", {type: "error", message: "Already Authorized"}, event)
	}
	return resolve(event)
}