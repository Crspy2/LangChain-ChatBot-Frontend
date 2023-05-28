import { getServerSession } from "@supabase/auth-helpers-sveltekit"
import { loadFlashMessage } from "sveltekit-flash-message/server"
import type { LayoutServerLoad } from "./$types"


export const load = loadFlashMessage(async (event) => {
	return {
		session: await getServerSession(event),
	}
})