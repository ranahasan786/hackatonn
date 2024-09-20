
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBBbVHoQhfpkdg1-a51l1tOe-_IMn0vM2A",
  authDomain: "project-c4f00.firebaseapp.com",
  projectId: "project-c4f00",
  storageBucket: "project-c4f00.appspot.com",
  messagingSenderId: "1062829757358",
  appId: "1:1062829757358:web:72a96639dab77f5f70ee3f",
  measurementId: "G-HN2MFE6N4K"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const portalCollection = collection(db, "StudentData");

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const cnic = document.getElementById("cnic");
const student_list = document.getElementById("student_list");
const submitBtn = document.getElementById("submitBtn");

getDataFromDB();

submitBtn.addEventListener("click", addDataToDb);

async function addDataToDb() {
  if (!firstName.value || !lastName.value || !email.value || !password.value || !cnic.value) {
    alert("All fields must be filled!");
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (password.value.length < 6) {
    alert("Password must be at least 6 characters long.");
    return;
  }

  try {
    const StudentData = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      cnic: cnic.value,
    };

    await addDoc(portalCollection, StudentData);
    getDataFromDB();
    firstName.value = "";
    lastName.value = "";
    email.value = "";
    password.value = "";
    cnic.value = "";
    alert("Data added successfully!");
  } catch (e) {
    console.log(e);
  }
}

async function getDataFromDB() {
  try {
    const querySnapshot = await getDocs(portalCollection);
    student_list.innerHTML = "";
    querySnapshot.forEach((doc) => {
      const { firstName, lastName, email, cnic } = doc.data();
      const row = `<tr><td>${firstName} ${lastName}</td><td>${email}</td><td>${cnic}</td></tr>`;
      student_list.innerHTML += row;
    });
  } catch (e) {
    console.log(e);
  }
}

