# Readme

This is a frontend example application as a showcase.

## Dependencies

-   Terminal with a Unix shell and environment (eg. Linux, MacOS Terminal, Git Bash on Windows)
-   make
-   Docker

## How it's done

The code is managed in a git repository. The language used is TypeScript and the frontend framework React.js. The dev environment is in a container, this way you don't need to install anything in your local environment, except Docker. But that should be already on a development box anyway.

## How to get it running

Go to the directory containing the repository and type `make dev`. This way you start the development environment with a webserver bind to port 1234. Access the website on http://localhost:1234.

For more options type:

```
make help
```
