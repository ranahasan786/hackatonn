const loginBtn = document.getElementById("loginBtn");
const role = document.getElementById("role");
const loginEmail = document.getElementById("login_email");
const loginPasword = document.getElementById("login_password");
const student_name = document.getElementById("student_name");
const student_email = document.getElementById("student_email");

loginBtn.addEventListener("click", login);

function login() {
  if (!loginEmail.value || !loginPasword.value)
    return alert("All fields must be filled!");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(loginEmail.value)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (loginPasword.value.length < 6) {
    alert("Password must be at least 6 characters long.");
    return;
  }

  if (student_name) {
    student_name.innerHTML = loginEmail.value;
  }
//   if (student_email) {
//     student_email.innerHTML = email;
//   }

  if (role.value === "student") {
    window.location.href = "/student.html";
  } else {
    window.location.href = "/admin.html";
  }
}
