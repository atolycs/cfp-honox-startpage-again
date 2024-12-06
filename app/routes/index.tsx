import { css } from "hono/css";
import { createRoute } from "honox/factory";
import Counter from "@/islands/counter";
import { SearchBar } from "@/islands/Search";

export const POST = createRoute(async (c) => {
  console.log();
  const search_url = "https://duckduckgo.com/";
  const form_param: string | number | boolean | undefined = (
    await c.req.formData()
  )
    ?.get("search_box")
    ?.toString();

  const is_url =
    /^(((http)|(https)):\/\/)?(www\.)?[a-zA-Z0-9]+\.[a-zA-Z]+\/?([a-zA-Z0-9/?=&%-_]+)?$/;
  const is_ip =
    /^(((http)|(https)):\/\/)?([0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}|localhost)(:[0-9]{1,5})?(\/[a-zA-Z0-9/?=&%-_]+)?$/;

  // @ts-ignore
  const url_match: RegExpMatchArray | null = form_param?.match(is_url);
  // @ts-ignore
  const ip_match: RegExpMatchArray | null = form_param?.match(is_ip);
  // biome-ignore format:
  if (url_match != null) {
    return c.redirect(
      url_match[0].substring(0, 4) === "http"
        ? url_match[0]
        : `https://${url_match[0]}`,
    );
  }
  if (ip_match != null) {
    return c.redirect(
      ip_match[0].substring(0, 4) === "http"
        ? ip_match[0]
        : `http://${ip_match[0]}`,
    );
  }
  // @ts-ignore
  return c.redirect(search_url + encodeURIComponent(form_param));
  /*   return c.render(
    <h1> welcome back!</h1>
  ) */
});

export default createRoute((c) => {
  const name = c.req.query("name") ?? "Hono";
  return c.render(
    <div>
      <h1>Hello, {name}!</h1>
      <SearchBar placeholder="Type here" />
      <Counter />
    </div>,
    { title: name },
  );
});
