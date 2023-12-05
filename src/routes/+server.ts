import type { Headers } from "negotiator";
import { redirect } from "@sveltejs/kit";
import Negotiator from "negotiator";
import { supportedLocales } from "$lib/i18n";

const supportedLocalesArray = [...supportedLocales.values()];

export function GET({ cookies, request, url }): void {
	let locale = cookies.get("locale");

	if (!locale) {
		const negotiator = new Negotiator(request as unknown as { headers: Headers }); // TS is stupid
		locale = negotiator.language(supportedLocalesArray) || "en";
	}

	throw redirect(302, "/" + locale + url.search.slice(1) + url.hash);
} 