<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" type="image/x-icon" href="https://placehold.co/400">

        <title>Task Scheduler</title>

        @viteReactRefresh
        @vite('resources/js/app.jsx')
    </head>
    <body>
        <div id="root"></div>
    </body>
</html>