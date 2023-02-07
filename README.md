# communication with p5 iframes
> Short guide explaining how to send data from iframe p5 sketches to a host
> webpage

👉🏻 [Blog Post](https://preview.guidoschmidt.cc/journal/iframe-p5/)
👉🏻 [Live Example](https://guidoschmidt.github.io/example.p5.iframe-communication/)

### Getting Started
This examples doesn't utilize a web bundler, check out branch [complex-vite+pnpm](https://github.com/guidoschmidt/example.p5.iframe-communication/tree/complex-vite+pnpm)
for a variation using [vite.js](https://vitejs.dev/) and [pnpm](https://pnpm.io/).

To try this example, spin up a local webserver, e.g. using [npx](https://docs.npmjs.com/cli/v7/commands/npx)

```
npx http-server -o
```

### Structure

- `index.html` is the main web page which includes a sketch via `iframe`
- `index.js` is the main JavaScript file handling `Window.postMessage` from the
  `iframe` and switching the background color via CSS variables
- `index.css` is the stylesheet of the main pages. Defines the CSS variable
  `--color-background` which is changed when receiving messages from the `iframe`
- `extern/` holds the external p5 sketch files. This is basically the
  webpage which will be linked via `iframe`
