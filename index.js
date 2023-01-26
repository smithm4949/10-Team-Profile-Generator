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

async function createEmployee(employeeType) {

  let employee;
  let specificQuestions;
  let answers;
  switch (employeeType) {

    case 'Manager':
      specificQuestions = [{
        type: "input",
        name: "officeNumber",
        message: "What is their office number?"
        }];
      answers = await inquirer.prompt([...genericQuestions, ...specificQuestions])
      employee = new Manager(answers);
      break;

    case 'Engineer':
      specificQuestions = [{
        type: "input",
        name: "github",
        message: "What is their github username?"
        }];
      answers = await inquirer.prompt([...genericQuestions, ...specificQuestions])
      employee = new Engineer(answers);
      break;

    case 'Intern':
      specificQuestions = [{
        type: "input",
        name: "school",
        message: "What is their school?"
        }];
      answers = await inquirer.prompt([...genericQuestions, ...specificQuestions])
      employee = new Intern(answers);
      break;

    default:
      break;
  }
  return employee
}

async function askForNextStep() {
  let answers = await inquirer.prompt({
    type: "list",
    name: "doNext",
    message: "What would you like to do?",
    choices: [
      {name: 'Add an engineer to the team', value: 'Engineer'},
      {name: 'Add an intern to the team', value: 'Intern'},
      {name: `Exit program; I'm finished building the team`, value: 'Exit'}
    ]
  })
  if (answers.doNext === 'Exit') {
      //finishedBuildingTeam = true;
      return;
    } else {
      let emp = await createEmployee(answers.doNext)
      employees.push(emp);
      askForNextStep();
    }
  }

async function init() {
  console.log(`Welcome to the Team Profile Generator CLI!\n
  Please start by adding information about the manager:`)
  let manager = await createEmployee('Manager');
  employees.push(manager);

  askForNextStep();
  writeToFile(generateHTML(employees));
}

init();