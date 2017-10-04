# Quick Start
The quickest way to get started with vape is to fork and/or clone the [repo](https://github.com/skyclutch/vape).
```
$ git clone https://github.com/skyclutch/vape
```
Then make sure you have the latest [node and npm](http://www.hostingadvice.com/how-to/update-node-js-latest-version/). Once you've got those updated, cd into your cloned directory, and run:
```
$ npm install
```
Once your packages are installed, you'll want to make sure you have [postgres 9.5 or higher installed](https://wiki.postgresql.org/wiki/Detailed_installation_guides), and create a db for your project:
```
$ createdb [your_project_name]
```
Then, make sure you know the credentials for your postgres superuser and run:
```
$ npm run vape init
```
This will run the vape init tool which will ask a series of simple questions and setup your project. Once it is done, it will ask you to run:
```
$ npm run vape migrate run
```
This will setup your database with vape's default functionality, including auth and some default pages.
Once your project is initted, just run:
```
$ npm run dev
```
