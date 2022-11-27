# Falling Letters

This is a simple typing game implemented using [Phaser 3](https://github.com/photonstorm/phaser) and [TypeScript](https://www.typescriptlang.org/). Building is handled by [Rollup](https://rollupjs.org) through [Vite](https://vitejs.dev/).

Built on top of [geocine](https://github.com/geocine)'s amazing [Phaser 3 starter](https://github.com/geocine/phaser3-rollup-typescript).

This project is also hosted on Vercel, if you don't feel like cloning the repo to play: [https://falling-letters.vercel.app/](https://falling-letters.vercel.app/)

## ⚙️ Get it running

After cloning the repository, install the dependencies by running `npm install` in the root folder of this project. If you're using [yarn](https://yarnpkg.com/), use `yarn install`.

You can spin up a development server with live hot-loading by running `npm run dev`. If you're using yarn, use `yarn dev`. After running the command, navigate your browser to [http://localhost:3000/](http://localhost:3000/) where the development instance should be running.

## ⚒️ Building for production

Run `npm run build` or `yarn build` to build the project into a production-ready bundle. The project will be built into a folder called `dist` in the project's root folder. To test out the production build, you can use the `npm run serve` or `yarn serve` command to host the contents of the `dist` folder on a local server. After running the `serve` command, navigate your browser to [http://localhost:5000](http://localhost:5000)