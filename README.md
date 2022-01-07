# Xeon-cli
### A Command Line Interface For [Xeon Js](https://github.com/chatcord/XeonJS).
Xeon cli is a very powerfull tool to create xeon project. 
### *__Features :__* 
* Create Xeon Project very easily at any directory with a single line code.
* Great User Interface in cli to guide biginers.
* Get tons of template inside.
* Publish Your own template to us.
* Use your own template as well (NOTE: Only available from https).
# Documentation
### *__Instalation :__*
* You can install "xeon-cli" at your local mechine. (Not Recomanded)
```cli
// Install xeon-cli
// You must use '-g' flag. xeon-cli needs to be installed globaly.
$ npm install xeon-cli -g 

// Then goto your desire directory
// Then create xeon-app
$ xeon-cli create-app <app_name> --template=<template_name/template_address> --git --updateNpm
// also another easier way. Shown bellow.
```
* Use [npx](https://docs.npmjs.com/cli/v7/commands/npx) instade. (Recomanded)
```cli
$ npx xeon-cli create-app <app_name> --template=<template_name/template_address> --git --updateNpm
// also another easier way. Shown bellow.
```
### *__Another Easier Way to Create Xeon App:
Just Run Command : ```npx xeon-cli create-app```

xeon-cli will inquire you for all settings. like this 👇👇👇

![Xeon-cli](/doc/xeon-cli.gif)

#### *__Flags :__*
* --git / -g = initialize git (Actualy Executes 'git init') [Read More](https://git-scm.com/docs/git-init).
* --updateNpm / -u = update all npm packages to safe version [Read More](https://docs.npmjs.com/cli/v6/commands/npm-update).
* --yes / -y = skip all prompts.
* --default / --def = Go with all default settings.
