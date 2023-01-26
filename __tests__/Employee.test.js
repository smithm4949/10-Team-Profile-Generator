const Employee = require('../lib/Employee');

describe('Employee Class', () => {
  const demoEmpObj = {name: "Myles", id: "1", email: "test@me.com"};

  test('Should create employee from object', () => {
    expect(new Employee(demoEmpObj)).toBeDefined();
  });

  const newEmp = new Employee(demoEmpObj)

  test('getName returns employees name', () => {
    expect(newEmp.getName()).toBe(demoEmpObj.name);
  });

  test('getId returns employees id', () => {
    expect(newEmp.getId()).toBe(demoEmpObj.id);
  });

  test('getEmail returns employees email', () => {
    expect(newEmp.getEmail()).toBe(demoEmpObj.email);
  });

  test('getRole returns generic "employee"', () => {
    expect(newEmp.getRole()).toBe('Employee');
  });
});