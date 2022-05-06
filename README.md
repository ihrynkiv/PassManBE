# PassMan - Password Manager, Server
## Setup

- You should have Docker (docker-compose), please install if you dont have.
- Please switch work directory to **PassManBE**
- Install dependencies: `npm install`
- Setup database (postgres):
    - Start database image in docker: `docker-compose up -d postgres`
    - Provide SQL migrations: `npm run migrate up`
- Run node.js server: `npm run dev`
