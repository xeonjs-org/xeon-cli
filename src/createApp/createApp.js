/**
 * Copyright (c) 2021-present, ChatCord, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import arg from 'arg';
import inquirer from 'inquirer';
import chalk from 'chalk';
import clearConsole from '../utils/clearConsole.js';
import { Templatelist } from './template.js';
import initProject from "./main.js";

clearConsole();
console.log(chalk.green.bold("Thanks For Choosing Xeon JS For Your Inovative Projects ... "));
console.log("");

function parseArgumentsIntoOptions(rawArgs) {
      const args = arg(
            {
                  '--git': Boolean,
                  '--yes': Boolean,
                  '--default': Boolean,
                  '--update-npm': Boolean,
                  '--template': String,
                  '-g': '--git',
                  '-y': '--yes',
                  '--def': '--default',
                  '-u': '--updateNpm',
            },
            {
                  argv: rawArgs.slice(2),
            }
      );
      return {
            defaultSettings: args['--default'] || false,
            skipPrompts: args['--yes'] || false,
            name: args._[1],
            template: args['--template'],
            git: args['--git'] || false,
            updatePackages: args['--update-npm'] || false,
      };
}
async function promptForMissingOptions(options) {
      const defaultTemplate = 'default';
      const questions = [];
      if (!options.name) {
            const { name } = await inquirer.prompt([
                  {
                        type: 'input',
                        name: 'name',
                        message: 'Name Of Your App (use Lowercase):',
                  }]);
            options = {
                  ...options,
                  name: name,
            }
      }
      if (options.skipPrompts || options.defaultSettings) {
            return {
                  ...options,
                  template: options.template || defaultTemplate,
                  git: options.git || true,
            };
      }
      if (!options.template) {
            questions.push({
                  type: 'list',
                  name: 'template',
                  message: 'Please choose which project template to use :',
                  choices: Object.keys(Templatelist),
                  default: defaultTemplate,
            });
      }
      if (!options.git) {
            questions.push({
                  type: 'confirm',
                  name: 'git',
                  message: 'Initialize a git repository? (default No)',
                  default: false,
            });
      }
      if (!options.updatePackages) {
            questions.push({
                  type: 'confirm',
                  name: 'updatePackages',
                  message: 'Update all outdated packages? (default No)',
                  default: false,
            });
      }
      const answers = await inquirer.prompt(questions);
      return {
            ...options,
            template: options.template || answers.template,
            git: options.git || answers.git,
            updatePackages: options.updatePackages || answers.updatePackages,
      };
}

export async function cli(args) {
      let options = parseArgumentsIntoOptions(args);
      options = await promptForMissingOptions(options);
      console.log("");
      initProject(options);
}