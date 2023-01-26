// Parent class for shared fields/methods.
//Employee is the super for engineer, manager, and intern

class Employee {
  constructor({ name, id, email }) {
    this.name = name;
    this.id = id;
    this.email = email;
  }

  getName() {
    return this.name;
  }

  getId() {
    return this.id;
  }

  getEmail() {
    return this.email;
  }

  getRole() {
    return 'Employee'
  }

}

module.exports = Employee;