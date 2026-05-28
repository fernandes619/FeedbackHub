import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { I18nProvider } from "@/lib/i18n";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-light tracking-tight text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-medium text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Go home
        </a>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Mural — Feedback para restaurantes" },
      {
        name: "description",
        content:
          "Capture avaliações no salão, encaminhe as positivas para o Google e receba críticas privadas para melhorar.",
      },
      { name: "author", content: "Mural" },
      { property: "og:title", content: "Mural — Feedback para restaurantes" },
      { property: "og:description", content: "Feedback hub for restaurants by Fernandes619" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Mural — Feedback para restaurantes" },
      { name: "description", content: "Feedback hub for restaurants by Fernandes619" },
      { name: "twitter:description", content: "Feedback hub for restaurants by Fernandes619" },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/na6WqpOu3VN40FnZWMQX2C9TVDG2/social-images/social-1777034633328-ChatGPT_Image_24_de_abr._de_2026__14_42_45-removebg-preview.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/na6WqpOu3VN40FnZWMQX2C9TVDG2/social-images/social-1777034633328-ChatGPT_Image_24_de_abr._de_2026__14_42_45-removebg-preview.webp" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <I18nProvider>
      <Outlet />
    </I18nProvider>
  );
}
