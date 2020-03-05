# Autorent / Carbbit #
A React app that tries to be AirBNB for cars. Based on [React Native](https://reactnative.dev) with [Expo](https://expo.io/) and [Express.js](https://expressjs.com/).

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

The project is separated into two parts: *frontend* and *backend*.

For more information, visit the [project's wiki](https://bitbucket.org/drauguburys/autorent/wiki/Home).

### Prerequisites

You need ```Node.js``` installed on your computer from your system repository, or https://nodejs.org.

For the backlog and sprints go to [Jira](https://lukasa.atlassian.net/secure/RapidBoard.jspa?projectKey=AR&rapidView=1&view=planning.nodetail&atlOrigin=eyJpIjoiZmYxMjVmOTcwY2QyNDRjZjgzNDkxNmFjNDhlYWE1ZDQiLCJwIjoiaiJ9).

Using [Discord](https://discord.gg/7b9Jzqm) for technical and structured communication and Facebook Mesenger for a quicker information transmission.


### Installing

```
$ git clone https://lukasan@bitbucket.org/drauguburys/autorent.git
```

After cloning the project, go to folders ```backend``` and ```frontend``` and install the required packages. You need to download and install packages two times.

``` 
$ cd backend
$ npm install
$ cd ../frontend
$ npm install
```

## Running the app

To run a React Native Expo app, you need to start the back-end server and open the front-end. To start the back-end, simply start the Express.js server:
```
$ cd backend
$ node start
```
To open the front-end on a web browser, you simply start the Expo server:
```
$ cd frontend
$ expo start
```
Now you should reach the server with on localhost port 3000. http://localhost:3000.
### Running on Android and iOS
In order to run the app on an Android or iOS device, you need the Expo app from the Google Play store and Apple App store respectively.

Once you have the Expo app, simply open the developer menu or the terminal, where the QR code is and scan it with the Expo app.

If you can't find the QR code, try:
* opening the Expo developer debugger (press ```d``` in the console running Expo server)
* restarting Expo
* clearing Expo cache (```shift + d``` while Expo is running)
* crying for help

## Running the tests

There are no automated tests currently.

## Known bugs
* The Expo debugger can sometimes show a blank dark-gray screen. Restarting usually helps. If not, clearing cache should help. If not still, taking a break and trying again usually helps.