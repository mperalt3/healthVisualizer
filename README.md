# Health Visualizer

The Health Visualizer consists of two separate applications in backend and frontend. The first is an API REST built in node.js, and the frontend is a Single Page Application built in React.

The HealthVisualizer API is open, does not use any type of authetication, therefore, its routes can be accessed by any application. It is designed to expose the data collected from the CDC page on health indicators by county. The original excel and more information can be found here:  [CDC web.](https://www.cdc.gov/diabetes/data/countydata/countydataindicators.html)

The HealthVisualizer frontend is designed to feed on that API in order to explore the data graphically. Built on React with the Redux library to maintain its state.

## Prerequisite

- **MongoDb**: The API use mongodb as a database to upload the excel information. **Excel** are **currently incorporated** into the API project in the dist/data_sources folder, so **it's not necessary to include them** manually. Make sure you have installed mongo before you start.
- **npm**: You can use another package manager, but for the purposes of this guide, npm will be used.

## Installation

First, make sure you have mongoDb installed on your pc. After that clone the repo

You need to navigate from differents terminals to each app.  
### 1. On /health-visualizer-api
- Make sure mongoDb is up
```
sudo service mongod start
```

- Install dependencies
```
npm install
```


- Run the seed. This will load all the data from the excels. Don't worry, it'll make take a few minutes
```
npm run seed
```

- No you can run the app. By default it will run on port 3000
```
npm start
```

### 2. On /health-visualizer-frontend
- Install dependencies
```
npm install
```
- Run the app. By default it will run on port 8080
```
npm start
```

## Go to your browser!
Now you can go to [http://localhost:8080](http://localhost:8080) and navigate the information offered by the CDC about the factors and consequences of metabolic syndrome. More information in the readme.md files of each application.
