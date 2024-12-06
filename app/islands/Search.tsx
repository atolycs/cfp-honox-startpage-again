import type { Context, FC } from "hono/jsx";

export const SearchBar: FC<{ placeholder: string }> = ({ placeholder }) => {
  return (
    <div className="search_bar">
      <form method="post">
        <label for="search_box" autofocus>
          &gt; find /&nbsp;
        </label>
        <input
          type="text"
          name="search_box"
          id="search_box"
          autocomplete="off"
          placeholder={placeholder}
          autofocus
        />
      </form>
    </div>
  );
};
