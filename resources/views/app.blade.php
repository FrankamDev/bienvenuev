<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
<meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />

  <!-- Titre et description (SEO + partage) -->
  <title>Clémence & Elias — Mariage 11.04.2026</title>
  <meta name="description" content="Rejoignez-nous pour célébrer notre union le 11 avril 2026 à Bafoussam. Découvrez le programme, les détails et confirmez votre présence." />

  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://welcome.getomiie.com/" />
  <meta property="og:title" content="Clémence & Elias — 11.04.2026" />
  <meta property="og:description" content="Une journée d’amour et de partage à Bafoussam. Programme, lieu, tenue et RSVP en ligne." />
  <meta property="og:image" content="https://welcome.getomiie.com/cool.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Clémence et Elias – Mariage 11 avril 2026" />

  <!-- Twitter / X Cards -->
  <!-- <meta name="twitter:card" content="summary_large_image" /> -->
  <meta name="twitter:title" content="Clémence & Elias — Mariage 11.04.2026" />
  <meta name="twitter:description" content="Rejoignez-nous pour notre grand jour à Bafoussam. RSVP simple et rapide." />
  <meta name="twitter:image" content="https://welcome.getomiie.com/cool.jpg" />

  <!-- Icônes et manifest (pour l'ajout à l'écran d'accueil) -->
  <link rel="icon" type="image/png" sizes="32x32" href="./cool.jpg" />
  <link rel="icon" type="image/png" sizes="16x16" href="./cool.jpg" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />


  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:wght@400;500;600;700&family=Lora:ital,wght@0,400;0,500;1,400&family=Cormorant+Garamond:wght@300;400;500;600&display=swap" rel="stylesheet" />

  <!-- Style inline minimal (évite le FOUC) -->
  <style>
    :root {
      --bg-color: #fdfaf7;
      --text-color: #2d1e12;
      --accent: #c9a96e;
    }
    html, body {
      margin: 0;
      padding: 0;
      background: var(--bg-color);
      color: var(--text-color);
      font-family: 'Lora', serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      .font-serif-premium { font-family: 'Cormorant Garamond', serif; }
.font-script { font-family: 'Great Vibes', cursive; }
    }
  </style>
        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
