# Health Visualizer

This project have two separated app, health-visualizer-api and health-visualizer-frontend. The first is a rest api build in node.js. Allows expose all the data about health from .... health-visualizer-frontend, the second app, is a web portal that allows to navigate between the data of all counties. It's is build in react with redux technology.

## Reuirements

- MongoDb

## Instructions to start

Make sure you have mongoDb installed on your pc. After that clone the repo and navigate from differents terminals to each app.  
### 1. Api
- Make sure mongoDb is up
```HTML
sudo service mongod start
```

- Install dependencies
```HTML
npm install
```
- Make sure mongoDb is up
```HTML
sudo service mongod start
```

- Run the seed. This will load all the data, and may take a few minutes.
```HTML
npm run seed
```

- Run the app
```HTML
npm start
```

### 2. Frontend
- Install dependencies
```HTML
npm install
```
- Run the app
```HTML
npm start
```
