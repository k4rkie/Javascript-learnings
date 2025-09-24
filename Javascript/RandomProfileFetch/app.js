const URL = "https://randomuser.me/api/";
const profilePic = document.querySelector(".profile-pic");
const username = document.getElementById("username");
const email = document.getElementById("email");
const address = document.getElementById("address");
const newUser = document.querySelector("#new");

async function getUserData() {
  try {
    let response = await fetch(URL);
    // console.log(response);

    let data = await response.json();
    // console.log(data.results);

    renderUserData(data);
  } catch (error) {
    console.error(error);
  }
}

function renderUserData(data) {
  profilePic.src = `${data.results[0].picture.large}`;

  username.textContent = `${data.results[0].name.title}. ${data.results[0].name.first} ${data.results[0].name.last}`;

  email.textContent = `${data.results[0].email}`;

  address.textContent = `${data.results[0].location.street.number} ${data.results[0].location.street.name}, ${data.results[0].location.city}, ${data.results[0].location.state}, ${data.results[0].location.country}, ${data.results[0].location.postcode}`;
}

getUserData();
newUser.addEventListener("click", getUserData);
