# Getting Started

> **Note**: Make sure you update the firebase config in server repo [Rocket Server](https://github.com/zahir535/express-rocket) with a valid firebase client secrets (App for Web). Then start the server on port 8080.

## Step 1: Setup the Firebase Client Configuration

Make sure you update the firebase config in server repo [Rocket Server](https://github.com/zahir535/express-rocket) with a valid firebase client secrets (App for Web) in firebase.ts file. Then start the server on port 8080.

```bash
const firebaseConfig = {
 apiKey: "apiKey",
 authDomain: "authDomain",
 projectId: "projectId",
 storageBucket: "storageBucket",
 messagingSenderId: "messagingSenderId",
 appId: "appId",
 measurementId: "measurementId",
};
```

## Step 2: Start the Server

First, you will need run this command to run node_modules & the pods. This will initialize node modules & pods directory to open IOS simulator.

```bash
yarn && yarn start

```

## Step 3: Server initialize & ready to use

Supposedly, the metro will started & server is initialized. You need to make sure the server is running on localhost port 8080 as the React Native App is using endpoint http://localhost:8080/
