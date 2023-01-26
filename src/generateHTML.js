//return string of card HTML for one employee
function generateCard({ name, id, email, role, specialField }) {
  //data
  return `<div class="card" style="width: 18rem;">\n
<div class="card-body">\n
<h5 class="card-title">${name}</h5>\n
<p class="card-text">${role}</p>\n
</div>\n
<ul class="list-group list-group-flush">\n
<li class="list-group-item">ID: ${id}</li>\n
<li class="list-group-item">Email: 
<a href="mailto:${email}">${email}</a></li>\n
<li class="list-group-item">${specialField.name} ${specialField.value}</li>\n
</ul>\n
<div class="card-body">\n
<a href="#" class="card-link">Card link</a>\n
<a href="#" class="card-link">Another link</a>\n
</div>\n
</div>`
}

//return string of html file
function generateHTML(employees) {
  let cards = []
  employees.forEach(employee => {
    let empData = {}

    if (employee.getRole() === 'Manager') {
      empData.role = 'Manager';
      empData.specialField = {
        name: 'Office Number',
        value: employee.officeNumber
      };

    } else if (employee.getRole() === 'Engineer') {
      empData.role = 'Engineer';
      let gh = employee.getGithub()
      empData.specialField = {
        name: 'GitHub',
        value: `<a href="https://github.com/${gh}">${gh}</a>`
      };

    } else {
      empData.role = 'Intern';
      empData.specialField = {
        name: 'School',
        value: employee.getSchool()
      };
    }
    empData.id = employee.getId();
    empData.name = employee.getName();
    empData.email = employee.getEmail();
    cards.push(generateCard(empData));
  });
}