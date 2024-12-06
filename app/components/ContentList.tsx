import type { Child, FC } from "hono/jsx";

export const ContentList: FC<{ children?: Child; list_name: string }> = ({
  children,
  list_name,
}) => {
  return (
    <ul>
      <p>~/{list_name}</p>
      {children}
    </ul>
  );
};
