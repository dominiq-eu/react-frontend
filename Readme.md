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

## What's missing

The web app is not complete and some problems need to be addressed.

-   ./Data/Design.ts is incomplete
-   ./Data/Design.ts is not adopted by all components
-   Architecture is incomplete
-   State management is a little hacky (typecasting)
-   Input fields lose content on window resize (switch between phone, tablet, desktop layout)
-   The generalization to components is not finished (eg. Page/Registration -> Components/RegistrationForm)
