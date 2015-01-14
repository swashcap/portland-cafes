# Portland Cafes

_Index of Portland’s many cafés and coffee shops._

## Ruby app install

You need to have Ruby 2.2.0 installed. Hopefully you have RVM installed so you can just run `rvm install 2.2.0`. Once you've done this, you're going to need to install the application's dependencies by running `bundle install`.

Now you should be close to running. You'll need access the (Google Developer Console)[https://console.developers.google.com] in order to turn on access to the Places API. Create your key and place it in a file at the root of the project named .env. It should look like this:

`API_KEY='your api key here'`

All you have to do is set up the database and it's ready to go. Just run `rake db:create` and `rake db:schema`. Your database is set and you can run `rake radar`.

_Rake everywhere_