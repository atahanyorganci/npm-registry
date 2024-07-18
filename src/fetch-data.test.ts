import { expect, test, vi } from "vitest";
import { z } from "zod";
import { fetchData } from "./fetch-data";

vi.mock("ofetch", async importOriginal => {
	return {
		...(await importOriginal<typeof import("ofetch")>()),
		// this will only affect "foo" outside of the original module
		ofetch: () => ({ foo: "bar" }),
	};
});

test("fetchData", async () => {
	expect(await fetchData(z.object({ foo: z.string() }), "https://example.com"))
		.toMatchInlineSnapshot(`
		{
		  "foo": "bar",
		}
	`);
});
