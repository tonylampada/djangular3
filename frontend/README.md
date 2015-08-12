# fsstatic2

This will be the new frontend of FreedomSponsors - a mobile first, MaterialDesign-based, SPA.

For a quick dive in learning how this project is organized and learning a few AngularJS related good practices, start with this blog post: [An awseome setup for your AngularJS project](https://dicasdolampada.wordpress.com/2015/06/25/a-awesome-setup-for-your-angularjs-project-13/)

The main goal of rebuilding the FreedomSponsors website like this is to have a reeeeally friendly development environment that more people can work on, while also serving as an example of a high quality architecture for a web app.

So, even if you don't want to help FS, if you are interested in web development, take a look at how this project is structured. It may give you a few good ideas to improve your own webapp project.

Below are some nice "architectural features" that you will find here:

* fsdev.sh: A list of commands easy at hand so we don't need to memorize anything
* DOCS (docs.html): A "playground" page that should be used both for 1) developing/testing new components, and 2) documenting how to use them
* The app (index.html): A true single page application that you can run locally
* api_mock.js: With this we can mock all of the the backend JSON api. Focus on front-end development first; worry about the real backend api later.
* Fast save/refresh cicle: Using devbuild/runserver, you end up with a development environment where you can save files and hit refresh, with no build steps in between (except for scss files, at least for now)
* Javascript tests: This project will have javascript tests, with coverage report.
* JsHint: Because we love our javascript style checked

# The development environment.

You should be able to get a dev env up and running really fast:

```bash
# Install gulp globally if you don't have it already
# You should need to do this only once
sudo npm install -g gulp

# Download npm dependencies
# You need to do this again in the future if 
# something changes in the packages.json file
npm install

# Activate the FS dev env
# This will import a few functions in your bash, 
. fsdev.sh
# and print a little help text about them (nice huh)
# If you want to see the help again type 'fshelp'

# If you want, you can add an alias to your ~/.bashrc 
# file to make a quick jump into the development environment
# Running the command below will tell you how to do so:
produce_alias
# I use that all the time

# Build the project
# This will create/update some stuff in the 'dist' folder
devbuild

# Check js style and run tests
runjshint
runtests

# Run the dev server
# This just starts a http server on port 9001
# When it's running you can go to 
# localhost:9001/dist/docs.html or /dist/index.html
runserver
```

When you use `devbuild`, the pages generated in the `dist` folder look for javascript files in the src folder, so you should be able to have a fast save/refresh cicle when dealing with javascript and AngularJS.
