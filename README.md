# MyFlix-Angular-Client

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.16. Angular was used to create a single-page, responsive movie app with routing and several interface views. The client-side developed in this Achievement will support the existing server-side architecture, REST API and database, by facilitating user requests and rendering the response from the server-side via a number of different interface views. The app will be accompanied by relevant documentation and handoff deliverables, including a kanban board containing user stories and story points.

## Table of Contents

1.  [Project Overview](#project-overview)
2.  [Features](#features)
3.  [Project Dependencies](#project-dependencies)
4.  [Setup and Installation](#setup-and-installation)
5.  [Code Scaffolding](#code-scaffolding)
6.  [Running Unit Tests](#run-unit-tests)
7.  [Running End-to-End Tests](#running-end-to-end-tests)
8.  [Further Help](#further-help)
9.  [Additional Resources](#additional-resources)
10. [Author](#author)

## Project Overview

This is the front-end application, built using Angular, for a movie API I previously built. It allows users to browse a collection of movies, view detailed information about each movie, director, genre, and starring actors. Users can create and manage an account including adding a list of their favorite movies.

## Features

Feature 1: Display a welcome view where users can either login or register a new account

Feature 2: Authenticated users will be able to view all movies in the database

Feature 3: Upon clicking on a particular movie, users will be taken to a single movie view, where the following additional features and movie details will be displayed:  
○ A button that when clicked takes a user to the description view, containing a description, the director, the genre, and the actors of that particular movie.
○ A button that when clicked takes a user to the director view, where details about the director of that particular movie will be displayed. 
○ A button that when clicked takes a user to the genre view, where details about that particular genre of the movie will be displayed. 
○ A button that when clicked adds that particular movie to the user's list of favorites.

## Project Dependencies

_ Angular
_ Angular-Material
_ Angular - Router
_ Angular/cli
_ jasmine
_ typedoc
\_ Angular-cli-ghpages

## Setup and Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Malave615/myFlix-Angular-client
   ```

2. **Navigate to the Project Folder**:

   ```bash
   cd myFlix-Angular-client
   ```

3. **Install Dependencies**:

   ```bash
   npm install
   ```

4. **Build the project**:

   ```bash
   npm run build
   ```

   The build artifacts will be stored in the `dist/` directory.

5. **Start the Development Server**:
   ```bash
   ng serve
   ```
   Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.
   To access the remote application hosted on ghpages, navigate to https://Malave615.github.io/myFlix-Angular-client/

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.0.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Author

Tracy Malavé
[Github Profile]
(https://github.com/Malave615)
