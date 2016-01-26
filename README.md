# GH-Info
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

## Roadmap
### Next
- Display the following:
  - Repo Name
  - Repo Link
  - Repo Description
  - User/Organization Name
  - User/Organization Link
  - Latest Release Version
  - Latest Release Link
  - Total Commits
  - Total Contributors
  - Total Stars
  - Total Watched
  - Total Forks
  - Languages Used
- "Use Bootstrap" option

### Next + 1
- Pre & Post Hooks
- Use Custom Classes
- Preconfigured Outputs ("Full", "Minimal", etc.)

### Future
