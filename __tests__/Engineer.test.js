const Engineer = require('../lib/Engineer');

describe('Engineer Class', () => {
  const demoEmpObj = {name: "Myles", id: "1", email: "test@me.com", github: "smithm4949"};

  test('Should create Engineer from object', () => {
    expect(new Engineer(demoEmpObj)).toBeDefined();
  });

  const newEmp = new Engineer(demoEmpObj)

  test('getName returns engineers name', () => {
    expect(newEmp.getName()).toBe(demoEmpObj.name);
  });

  test('getId returns engineers id', () => {
    expect(newEmp.getId()).toBe(demoEmpObj.id);
  });

  test('getEmail returns engineers email', () => {
    expect(newEmp.getEmail()).toBe(demoEmpObj.email);
  });

  test('getGithub returns engineers github', () => {
    expect(newEmp.getGithub()).toBe(demoEmpObj.github);
  });

  test('getRole returns "engineer"', () => {
    expect(newEmp.getRole()).toBe('Engineer');
  });
});