# React/Typescript test app

Screens:

1. Page with list of Services and promocodes

Should be done in React, Redux, Sagas, Typescript. Added Webpack, Docker

## Scripts to get started

To start without Docker:

1. To start development server, please run:

```
cd test_task_react_typescript/
npm install
npm run dev
```

2. To compiled the app, please run:

```
cd test_task_react_typescript/
npm install
npm start
```

Runs the app in the development mode.
Open [http://localhost:9001](http://localhost:9001) to view it in the browser.

Or you can start with Docker:

## Build docker image

```
docker-compose build
```

## Run docker container

1. For this you will need to download [Docker](https://www.docker.com/).
   Then starting is made with this command:

```
docker-compose up
```

2. Open [http://localhost:3002](http://localhost:3002) to view it in the browser.


## Running unit tests

Run `npm test` to execute the unit tests via Jest.


##Localization (i18n added to the project)

To run eng language `http://localhost:9001/?lng=en`

To run ru language `http://localhost:9001/?lng=ru`

