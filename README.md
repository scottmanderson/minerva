# Minerva
Minerva is a financial data analysis program which fetches and stores time series information on financial assets and allows the user to interactively analyze returns.  Additional features presently in development.
 
The calculations are performed by a python/flask backend API using pandas and postgres SQL.

The user interface fetches and updates this data with a reactjs SPA, using components based on material-ui and redux-driven state management.

Finally, the name is a very weak pun fusing the name of a Greco-Roman goddess of Wisdom with the reflections of a former professional financial markets participant that MINimizing the NERVousness we feel about our investments may be more important than the returns themselves.

## Installation
1. The database path is expected to be provided by environment variable for security reasons.  
   * Use a `.env` file in the project root folder (or pass an environment variable as you see fit).
   * A system of defaulting to localhost is provided in the configuration code, but you will need to override by env to use a multi-server deployment, including docker-compose.
2. The react app needs to be told what server location it should poll for a backend API.
   This should be supplied via .env files in the `minerva-ui` folder, NOT THE ROOT FOLDER.
   * This is a feature of create-react-app.
   * A default for localhost has been provided in the `.env.development.local` file.
   * You can keep this default for dev, but specify a different production env by placing the production URI in a simple `.env` file
   * If you wish to maintain a more complicated setup, please see the following:  https://create-react-app.dev/docs/adding-custom-environment-variables/
3. Run `npm build` from the command line to create a production build of the react app.  This should be done after step 2, but is not in principle necessary for a dev environment.
4. The program includes a sample database in the database folder.  You can install this by running:  `psql -U minerva -d minervaDB -f sampleDatabase.sql`
   * A docker-compose deployment is slightly more complicated, but you can find the necessary commands to ssh into your server, automatically identify the postgres container by commandline, and run the above command there in the `updateSampleDb.sh` file. 

