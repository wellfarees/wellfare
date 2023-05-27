[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

<h1>Wellfare</h1>
<h2>Contributions branch</h2>
<p>Due to security implications caused by third party services that are used in this project, this special contributions exclusive branch has been created that mocks or disables parts that require other services to be setup with sensitive keys such as <i>Google</i> and <i>Algolia</i>.</p>
<p>Certain limitations in the apps functionality in the contribution version are present and are listed further down in this file.</p>

<h2>Prerequisites</h2>
<p>To follow along the setup process more smoothly you may need to have the following installed on your machine</p>

- Node version 16.0.4
- NPM or YARN
- PostgreSQL

<h2>Setting up</h2>
<p>First thing to do is to fork this repository. Make sure you are working specifically in this `contributions` branch.

<h3>Installation</h3>
<p>
To install all necessary packages and avoid any issues you must use node version `16.0.4`. If you are using linux, use nvm to switch versions. After that you can install all the packages from the root using npm or yarn</p>

```
npm install
```

or

```
yarn
```

<h3>Database initialization</h3>
<p> While docker container for this branch is still in development, you need to setup and run a database yourself. Luckily it does not involve much effort.</p>

<p>After having postgreSQL installed on your machine login as a superuser. On linux based operating systems you can do via command</p>

```
sudo -u postgres psql
```

<p>If you are on Windows, try</p>

```
psql -U userName
```

<p>Set your password to be able to connect to the database like following</p>

```
\password postgres <password>
```

<p>Then create a database to serve this application</p>

```
CREATE DATABASE wellfare;
```

<p>Finally, run the database. In this case it has been been created under name `wellfare`.</p>

```
\c wellfare
```

<h3>Server setup</h3>
<p>What concerns backend in this project, the only thing required to do is creating prisma migration files and applying them to the previously created database</p>
<p>Before doing that, you must specify the database connection string. Navigate to `apps/server` folder and in the `.env` file change the following variable</p>

```
DATABASE_URL=postgresql://postgres:<password>@127.0.0.1:5432/wellfare?schema=user
```

<p>Depending on your connectivity information you may or may not need to adjust certain parts in the string like username or port. In order to check database connectivity related information, you can run </p>

```
\conninfo
```

Remember to change `<password>` to password you set earlier.
The following <a href="https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/connect-your-database-node-mysql"> source </a> can be helpful to understand what each part in the string means.

<p>Now create the migration files running one of the following commands in the same directory</p>

```
npx prisma migrate dev
```

or

```
yarn prisma migrate dev
```

<h3>Environmental variables</h3>
<p>Since code in this branch was intended to stay as similar as in the `development` branch, parts that use environmental variables have not been touched. This is why it is important to keep the modified `.env` file to maintain structure of the codebase. Essentially the only variable a contributer may need to change is the database URL.</p>

<h2>Limitations</h2>
<p>Whilst working with this app you may encounter the following limitations: </p>

- Google OAuth will not work
- Changing a profile picture will not work
- Emails will not be sent
- Searching for records will not yield any hits

<h2>License</h2>
Wellfare is licensed under GNU General Public License v3.0 <br>
<a href="https://github.com/wellfarees/wellfare/blob/main/LICENSE">GNU GPL V3</a>
