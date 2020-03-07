# Autorent / Carbbit #
A React app that tries to be AirBNB for cars. Based on [React Native](https://reactnative.dev) with [Expo](https://expo.io/) and [Express.js](https://expressjs.com/).

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

The project is separated into two parts: *frontend* and *backend*.

For more information, visit the [project's wiki](https://bitbucket.org/drauguburys/autorent/wiki/Home).

## Prerequisites
Every command is assumed to be on project's home folder, i.e. ```autorent/```.

You need [Node.js](https://nodejs.org) installed on your computer from your system repository.

You also need [Docker](https://www.docker.com/products/docker-desktop) and [docker-compose](https://docs.docker.com/compose/install/).

For the backlog and sprints go to [Jira](https://lukasa.atlassian.net/secure/RapidBoard.jspa?projectKey=AR&rapidView=1&view=planning.nodetail&atlOrigin=eyJpIjoiZmYxMjVmOTcwY2QyNDRjZjgzNDkxNmFjNDhlYWE1ZDQiLCJwIjoiaiJ9).

Using [Discord](https://discord.gg/7b9Jzqm) for technical and structured communication and Facebook Mesenger for a quicker information transmission.


## Installing

```
$ git clone https://lukasan@bitbucket.org/drauguburys/autorent.git
```

After cloning the project, go to folders ```backend``` and ```frontend``` and install the required packages. This is required for both backend and frontend.

``` 
$ cd backend
$ npm install
$ cd ../frontend
$ npm install
```

# Running the backend server
## Docker
This will start the backend Express.js server on local port **3000** and a MySQL database server on local port **3306**.
``` 
$ docker-compose up -d
```
Make sure everything is running:
```
$ docker ps -a
```
You should see something like this:
```
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                               NAMES
7a7872043821        autorent_express    "docker-entrypoint.s…"   11 seconds ago      Up 4 seconds        0.0.0.0:3000->3000/tcp              autorent_express_1
17af626f8eef        autorent_db         "docker-entrypoint.s…"   14 seconds ago      Up 10 seconds       0.0.0.0:3306->3306/tcp, 33060/tcp   autorent_db_1
```
Beware, that MySQL server takes up to a minute to fully start once the Docker container is running.

These links should be reachable from your machine:

http://localhost:3000 / http://127.0.0.1:3000

http://localhost:3306 / http://127.0.0.1:3306

### Shutting down
To shut down the Docker service, run:
```
$ docker-compose down
```
## Manually
**NOT RECOMMENDED** you will need to configure MySQL to Express connection yourself.

Run the Express server on your machine.
```
$ node ./backend/bin/www
```
Run your own MySQL server and connect it to the backend.

Now you should reach the server with on localhost port 3000. 

http://localhost:3000

# Running the frontend
To open the front-end on a web browser, you simply start the Expo server:
```
$ cd frontend
$ expo start
```
In order to run the app on an Android or iOS device, you need the Expo app from the Google Play store and Apple App store respectively.

Once you have the Expo app, simply scan the QR code provided by the Expo server.

### Shutting down
To shut down the Expo server, simply press ```Ctrl + C``` once on the terminal to stop it.

## Troubleshooting
If you can't find the QR code, try:
* pressing c on the terminal running Expo  server
* opening the Expo developer debugger by pressing ```d``` in the console running Expo server
* restarting Expo
* clearing Expo cache (```shift + r``` while Expo is running)
* crying for help

# Running the tests

There are no automated tests currently.

# Known bugs
* The Expo debugger can sometimes show a blank dark-gray screen. Restarting usually helps. If not, clearing cache should help. If not still, taking a break and trying again usually helps.