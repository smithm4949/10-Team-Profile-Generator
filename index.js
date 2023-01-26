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

//async function, should return the employee
//does not need to recurse
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
      console.log('-- Please add information about the manager --');
      answers = await inquirer.prompt([...genericQuestions, ...specificQuestions]);
      employee = new Manager(answers);
      break;

    case 'Engineer':
      specificQuestions = [{
        type: "input",
        name: "github",
        message: "What is their github username?"
        }];
      console.log('-- Please add information about the engineer --');
      answers = await inquirer.prompt([...genericQuestions, ...specificQuestions]);
      employee = new Engineer(answers);
      break;

    case 'Intern':
      specificQuestions = [{
        type: "input",
        name: "school",
        message: "What is their school?"
        }];
      console.log('-- Please add information about the intern --');
      answers = await inquirer.prompt([...genericQuestions, ...specificQuestions]);
      employee = new Intern(answers);
      break;

    default:
      break;
  }
 
  return employee;
}

// async function, should return the choice
//does not need to recurse
async function askForNextStep() {
  let answer = await inquirer.prompt({
    type: "list",
    name: "doNext",
    message: "What would you like to do?",
    choices: [
      {name: 'Add an engineer to the team', value: 'Engineer'},
      {name: 'Add an intern to the team', value: 'Intern'},
      {name: `Exit program; I'm finished building the team`, value: 'Exit'}
    ]
  })
    return answer.doNext;
  }

//needs while loop with bool finishedBuildingTeam
//store next employee to be created outside of loop, start with manager
//update based on below
//bool is updated based on askForNextStep
async function init() {
  console.log(`Welcome to the Team Profile Generator CLI!`)
  let nextEmpForCreation = 'Manager';
  let finishedBuildingTeam = false;

  while (!finishedBuildingTeam) {
    let emp = await createEmployee(nextEmpForCreation);
    employees.push(emp);

    let nextStep = await askForNextStep();
    if (nextStep === 'Exit') {
      finishedBuildingTeam = true;
    } else {
      nextEmpForCreation = nextStep;
    }
  }

  writeToFile(generateHTML(employees));
}

init();