# communication with p5 iframes
> Short guide explaining how to send data from iframe p5 sketches to a host
> webpage

👉🏻 [Blog Post](https://preview.guidoschmidt.cc/journal/iframe-p5/)

### Getting Started
This examples uses [vite.js](https://vitejs.dev/). To get started, install
needed dependencies and start vite:

```
npm install
npm run dev
```

### Structure

- `src/` holds the source code that embeds an external iframe and reacts on
  messages sent from the iframes page via `Window.postMessage`
- `public/extern/` holds the external p5 sketch files. This is basically the
  webpage which will be linked via `iframe`. The `public/` folder acts as a
  static files folder for vite.js. We can act as if it was hosted somewhere else
  and referr to it via `/extern` on our local machine to simulate a scenario
  where it's hosted somewhere else.
