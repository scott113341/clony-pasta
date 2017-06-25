# clony-pasta

[![npm-version][npm-version-badge]][npm-version-href]
![](https://img.shields.io/badge/no-bugs-brightgreen.svg)
[![dependencies][dependencies-badge]][dependencies-href]
[![dev-dependencies][dev-dependencies-badge]][dev-dependencies-href]


Foolishly simple scaffolding tool using the [ez template language](https://github.com/scott113341/eztl).


## Installation
```bash
npm install clony-pasta -g
```

## Usage
```bash
clony-pasta [git repository] [destination folder]
```

### Example Usage

Set up a git repository with a scaffold.  For example, your `package.json` might look something like this:

```
{
  "name": "{% scoped? %}@{% scope %}/{% end %}{% name %}",
  "version": "0.0.0",
  "description": "{% description %}",
  "author": "{% author %}",
  "license": "MIT",
  ...
}
```

Conditional files and directories are also supported.  For example, if you only sometimes want to generate tests, you could name your test directory `{% makeTests? %}tests{% end %}` and it will only include the directory (and sub-directories) if you respond "yes" to the `makeTests?` prompt.

Then, when you want to generate a new project based on the scaffold, invoke the command:

```bash
clony-pasta git@github.com:scott113341/scaffold-npm-module.git my-new-project
```


[npm-version-badge]: https://img.shields.io/npm/v/clony-pasta.svg?style=flat-square
[npm-version-href]: https://www.npmjs.com/package/clony-pasta

[dependencies-badge]: https://img.shields.io/david/scott113341/clony-pasta.svg?style=flat-square
[dependencies-href]: https://david-dm.org/scott113341/clony-pasta#info=dependencies

[dev-dependencies-badge]: https://img.shields.io/david/dev/scott113341/clony-pasta.svg?style=flat-square
[dev-dependencies-href]: https://david-dm.org/scott113341/clony-pasta#info=devDependencies
