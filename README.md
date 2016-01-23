# GH-JQ
A jQuery plugin that pulls information from a Github repository and inserts it into a page using AJAX

Build Instructions
-------------------

First, use [Node/NPM](https://nodejs.org/) to install dependencies

```
npm install
```

Next, use [Grunt](http://gruntjs.com/) to build project

```
grunt prod
```
**-- or --**
```
grunt dev
```
> Production is compressed and uglified. Development is uncompressed with sourcemaps.

> *Default `grunt` command will build development version and launch `grunt watch` to jump straight into coding*