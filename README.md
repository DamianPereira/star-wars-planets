# Star Wars planet browser

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). \
This project is not ejected, so all create react app documentation still applies.
The data comes from SWAPI, there are many instances deployed on GitHub, https://swapi.dev/ was down while developing, so https://swapi.py4e.com/api was used instead. \
You can chenge the swapi endpoint in the file PlanetService.js

## Mock and endpoint configuration

When running in development environment, this project will use [Mock Service Worker](https://mswjs.io/) \
to intercept and mock SWAPI requests, if you want to run against the real world, please comment out the relevant lines in index.js

## Used libraries

The main data fetching and handling is done using [mobx-state-tree](https://mobx-state-tree.js.org/intro/welcome), with the store in RootStore. \
Styling is done with [tailwind](https://tailwindcss.com/). Storybook was used to aid in visual component development.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000/star-wars-planets](http://localhost:3000/star-wars-planets) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run storybook`

Starts a development server in [https://localhost:6006](https://localhost:6006), where you can play around with React components used through the app.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
