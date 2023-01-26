const Manager = require('../lib/Manager');

describe('Manager Class', () => {
  const demoEmpObj = {name: "Myles", id: "1", email: "test@me.com", officeNumber: "1020"};

  test('Should create Manager from object', () => {
    expect(new Manager(demoEmpObj)).toBeDefined();
  });

  const newEmp = new Manager(demoEmpObj)

  test('getName returns Managers name', () => {
    expect(newEmp.getName()).toBe(demoEmpObj.name);
  });

  test('getId returns Managers id', () => {
    expect(newEmp.getId()).toBe(demoEmpObj.id);
  });

  test('getEmail returns Managers email', () => {
    expect(newEmp.getEmail()).toBe(demoEmpObj.email);
  });

  test('Manager has office number', () => {
    expect(newEmp).toHaveProperty('officeNumber', '1020');
  });

  test('getRole returns "Manager"', () => {
    expect(newEmp.getRole()).toBe('Manager');
  });
});