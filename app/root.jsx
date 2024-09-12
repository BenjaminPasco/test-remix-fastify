import { Meta, Links, Outlet, Scripts } from "@remix-run/react";

export default function App() {
  return (
    <html>
      <head>
        <link rel="icon" href="data:image/x-icon;based64,AA" />
        <Meta />
        <Links />
      </head>
      <body>
        <h1>Hello world updated</h1>
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
