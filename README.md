[![Code Climate](https://codeclimate.com/github/swashcap/portland-cafes/badges/gpa.svg)](https://codeclimate.com/github/swashcap/portland-cafes)

# [Portland Cafes](http://portlandcafes.com/)

_Index of Portland’s many cafés and coffee shops._

## Ruby app install

You need to have Ruby 2.2.0 installed. Hopefully you have RVM installed so you can just run `rvm install 2.2.0`. Once you've done this, you're going to need to install the application's dependencies by running `bundle install`.

Now you should be close to running. You'll need access the [Google Developer Console]([https://console.developers.google.com) in order to turn on access to the Places API. Create your key and place it in a file at the root of the project named .env. You should also make sure to populate it with whatever environment you're currently working in. It should look like this:

```
API_KEY='your api key here'
CURRENT_ENVIRONMENT='development'
```

You also need to start up a list of places you want to ignore in the results. You'll inevitably have _some_. This is achieved by adding to your .env file:

`UNDESIRABLE_LOCATIONS=McDonalds,Starbucks`

All you have to do is set up the database and it's ready to go. Just run `rake db:create` and `rake db:schema`. Your database is set and you can run `rake radar`. This will generate the results.json file in the base of the Angular application. Go wild.

_Rake everywhere_

## Front-end Application

### Project Setup

Building and working on the project requires getting this software set up on your machine:

1.   **[Sass](http://sass-lang.com/):** You’ll need the Ruby gem variant of Sass to build the project’s stylesheets. If you have Ruby on your machine you can run:

    ```shell
    $ gem install sass
    ```

    Refer to the [installation guide](http://sass-lang.com/install) for more details.
2.    **[Node.js](http://nodejs.org/) (or equivalent):** The project uses [gulp](http://gulpjs.com/) to run tasks, which operates on Node.js. Visit the site to download it, or, if you have [Homebrew](http://brew.sh/) you can run:

    ```shell
    $ brew install node
    ```
3.   **[Bower](http://bower.io/):** Front-end assets are managed using this package manager, which _requires Node.js_ and _npm_ (comes automatically with Node.js). It also _requires git_, which it’s safe to assume is already installed. Run the following command to install Bower:

    ```shell
    npm install -g bower
    ```

4.    **[Karma](http://karma-runner.github.io/) _(semi-optional)_:** the project’s tests are run through Karma, which _requires Node.js_. If you want to run tests, which is optional but suggested, it’s assumed you have the Karma CLI installed. Run the following to do so:

    ```shell
    $ npm install -g karma-cli
    ```

### Installing Dependencies

1.    **Node packages:** Install the JavaScript modules for tasks with the following:

    ```shell
    $ npm install
    ```
2.    **Front end components:** Install the scripts and styles required to run and display the app:

    ```shell
    $ bower install
    ```

### Building and Serving the Project

The application is based on [Yeoman’s _gulp-webapp_ generator](https://github.com/yeoman/generator-gulp-webapp), so tasks mostly follow the [originals](https://github.com/yeoman/generator-gulp-webapp/blob/master/docs/README.md):

> To start developing, run:
>
> ```shell
> $ gulp serve
> ```
>
> This will fire up a local web server, open http://localhost:9000 in your default browser and watch files for changes, reloading the browser automatically via [LiveReload](https://github.com/intesso/connect-livereload).
>
> To make a production-ready build of the app, run:
>
> ```shell
> $ gulp
> ```

### Running Tests

If you followed [setup step](#project-setup) regarding Karma, simply run:

```shell
karma start
```

…from the project root. Karma will spin up Chrome, automatically run the unit tests, and watch files for changes. (Use the `--single-run` flag to run tests once and not watch files.)
