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

  return `<!DOCTYPE html>\n
<html lang="en">\n
<head>\n
<meta charset="UTF-8" />\n
<meta http-equiv="X-UA-Compatible" content="IE=edge" />\n
<meta name="viewport" content="width=device-width, initial-scale=1.0" />\n
<title>Team Profile</title>\n
<link\n
href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"\n
rel="stylesheet"\n
integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"\n
crossorigin="anonymous" />\n
<script\n
defer\n
src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"\n
integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN"\n
crossorigin="anonymous"></script>\n
</head>\n
<body>\n
<header></header>\n
<main class="container">\n
<section class="row">${cards}</section>\n
</main>\n
</body>\n
  </html>`
}

export default generateHTML;