# Server Side

## User Endpoints

Post new User
http://localhost:8000/api/user
Pass user_name, password, and user_email into the request body as JSON.

Login to existing user account
http://localhost:8000/api/auth/login
Pass user_name, and password into the request body as JSON. This will return an auth token and the users id that you will need for making requests to data endpoints.

## Data Endpoints

Get all tables
http://localhost:8000/api/data
Pass user_id into get request header to return a list of all persisted tables.

Post new table
http://localhost:8000/api/data
Pass user_id, table_name, and Authorization into post request headers and pass the table data as JSON in the request body.

You can also pass table_type as an optional header.

Get specific table
http://localhost:8000/api/data/:table_id
Make a get request with the table_id passed as a param inorder to return a specific table.


Delete table
http://localhost:8000/api/data/:table_id
Make a delete request with Authorization header and the table_id passed as a param in order to delete a table.

Update table
http://localhost:8000/api/data/:table_id
Make a patch request with the Authorization header and the table_id passed as a param and the new table_name or table_type passed in the body.

Authorizing protected endpoints.
POST, PATCH and DELETE are protected endpoints. In order to access them you must pass Authorization as a header with the value of 'bearer ' + (THE TOKEN RECIEVED ON LOGIN)

EXAMPLE!

PATCH http://localhost:8000/api/data/27
body
  {
    "table_name": "new table name",
	  "table_type": "new type"
  }

## Setting Up

- Install dependencies: `npm install`
- Create development and test databases: `createdb PLACEHOLDER_DB`, `createdb PLACEHOLDER_DB_TEST`
- Create database user: `createuser USER_PLACEHOLDER`
- Grant privileges to new user in `psql`:
  - `GRANT ALL PRIVILEGES ON DATABASE "PLACEHOLDER_DB" TO "USER_PLACEHOLDER";`
  - `GRANT ALL PRIVILEGES ON DATABASE "PLACEHOLDER_test" TO "PLACEHOLDER_TEST";`
- Prepare environment file: `cp example.env .env`
- Replace values in `.env` with your custom values.
- Bootstrap development database: `npm run migrate`
- Bootstrap test database: `npm run migrate:test`

### Configuring Postgres

For tests involving time to run properly, your Postgres database must be configured to run in the UTC timezone.

1. Locate the `postgresql.conf` file for your Postgres installation.
    - OS X, Homebrew: `/usr/local/var/postgres/postgresql.conf`
2. Uncomment the `timezone` line and set it to `UTC` as follows:

```
# - Locale and Formatting -

datestyle = 'iso, mdy'
#intervalstyle = 'postgres'
timezone = 'UTC'
#timezone_abbreviations = 'Default'     # Select the set of available time zone
```

## Sample Data

- To seed the database for development: `psql -U USER_PLACEHOLDER -d PLACEHOLDER_DB -a -f seeds/seed.PLACEHOLDER_TABLES.sql`
- To clear seed data: `psql -U USER_PLACEHOLDER -d PLACEHOLDER_DB -a -f seeds/trunc.PLACEHOLDER_TABLES.sql`
- To seed Heroku with data (replace postgres URL with your Heroku URI): `psql -U USER_PLACEHOLDER -d postgres://ncfuvjkvpxjvsj:4d58e0f44dfdddf5a82636b4155c7adfe6c25b12a8b517bcf712b64b70be3e7a@ec2-174-129-255-37.compute-1.amazonaws.com:5432/d5vd5fdg9njarh -a -f seeds/seed.PLACEHOLDER_TABLES.sql`
- To setup/update Heroku migration schema (replace postgres URL with your Heroku URI): `psql -U USER_PLACEHOLDER -d postgres://jdcsnuysxfirpr:e1d9285a61a3ccc5c9d54265e2320626506d9b7300f386550e13d732c1e582f4@ec2-107-22-216-151.compute-1.amazonaws.com:5432/dagfofq1ciq57u -a -f migrations/002.do.create_tables.sql`

## Scripts

- Start application for development: `npm run dev`
- Run tests: `npm test`

## Features In-Progress


## Known Bugs
