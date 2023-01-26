const Intern = require('../lib/Intern');

describe('Intern Class', () => {
  const demoEmpObj = {name: "Myles", id: "1", email: "test@me.com", school: "GWU"};

  test('Should create Intern from object', () => {
    expect(new Intern(demoEmpObj)).toBeDefined();
  });

  const newEmp = new Intern(demoEmpObj)

  test('getName returns Interns name', () => {
    expect(newEmp.getName()).toBe(demoEmpObj.name);
  });

  test('getId returns Interns id', () => {
    expect(newEmp.getId()).toBe(demoEmpObj.id);
  });

  test('getEmail returns Interns email', () => {
    expect(newEmp.getEmail()).toBe(demoEmpObj.email);
  });

  test('getGithub returns Interns school', () => {
    expect(newEmp.getSchool()).toBe(demoEmpObj.school);
  });

  test('getRole returns "Intern"', () => {
    expect(newEmp.getRole()).toBe('Intern');
  });
});