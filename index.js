const generateHTML = require('./src/generateHTML');
const inquirer = require('inquirer');
const fs = require('fs');
const Engineer = require('./lib/Engineer');
const Manager = require('./lib/Manager');
const Intern = require('./lib/Intern');

const genericQuestions = [
  {
  type: "input",
  name: "name",
  message: "What is this employees name?"
  },
  {
  type: "input",
  name: "id",
  message: "What is their employee id?"
  },
  {
  type: "input",
  name: "email",
  message: "What is their email address?"
  }
];

const employees = [];

function writeToFile(data) {
  fs.writeFile('./dist/employees.html', data, (error) => {
    error ? console.log(error) : console.log(`Successfully generated HTML file in dist/`);
  })
}

function createEmployee(employeeType) {

  let employee;
  let specificQuestions;
  switch (employeeType) {

    case 'Manager':
      specificQuestions = [{
        type: "input",
        name: "officeNumber",
        message: "What is their office number?"
        }];
      inquirer.prompt([...genericQuestions, ...specificQuestions])
      .then(answers => {
        employee = new Manager(answers)  
      });
      break;

    case 'Engineer':
      specificQuestions = [{
        type: "input",
        name: "github",
        message: "What is their github username?"
        }];
      inquirer.prompt([...genericQuestions, ...specificQuestions])
      .then(answers => {
        employee = new Engineer(answers)  
      });
      break;

    case 'Intern':
      specificQuestions = [{
        type: "input",
        name: "school",
        message: "What is their school?"
        }];
      inquirer.prompt([...genericQuestions, ...specificQuestions])
      .then(answers => {
        employee = new Intern(answers)  
      });
      break;

    default:
      break;
  }
  return employee
}

function init() {
  employees.push(createEmployee('Manager'));

  let finishedBuildingTeam = false;
  while (!finishedBuildingTeam) {
    inquirer.prompt({
      type: "list",
      name: "doNext",
      message: "What would you like to do?",
      choices: [
        {name: 'Add an engineer to the team', value: 'Engineer'},
        {name: 'Add an intern to the team', value: 'Intern'},
        {name: 'Exit; finished building team', value: 'Exit'}
      ]
    })
    .then(answers => {
      if (answers.doNext === 'Exit') {
        finishedBuildingTeam = true;
      } else {
        employees.push(createEmployee(answers.doNext));
      }
    })
  }
  writeToFile(generateHTML(employees));
}

init();