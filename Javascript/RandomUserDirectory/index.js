const URL = "https://randomuser.me/api/?results=9";
const searchBar = document.getElementById("search");
const userGrid = document.getElementById("user-grid");

const loading = document.createElement("p");
loading.textContent = "Loading Data....";
loading.classList.add("loading");
userGrid.append(loading);

const noResults = document.createElement("p");
noResults.textContent = "No Matching Results!";
noResults.classList.add("noResults");

async function getUserData() {
  try {
    //fetch response obj
    const resObj = await fetch(URL); //fetch returns promise
    // console.log(resObj);

    //data body
    const data = await resObj.json(); //json parsing returns promise
    renderUserData(data);

    userGrid.removeChild(loading);
  } catch (error) {
    console.error(Error);
  }
}

function renderUserData(data) {
  let users = data.results;

  for (const user of users) {
    createUserCard(user);
  }

  searchBar.addEventListener("input", (e) => {
    let searchQuery = e.target.value.toLowerCase();
    console.log(searchQuery);

    let searchFilteredUsers = users.filter((currUser) => {
      let username = `${currUser.name.first.toLowerCase()}${currUser.name.last.toLowerCase()}`;
      if (username.includes(searchQuery)) {
        return currUser;
      }
    });
    console.log(searchFilteredUsers);
    userGrid.innerHTML = "";
    for (const user of searchFilteredUsers) {
      createUserCard(user);
    }
    if (searchFilteredUsers.length === 0) {
      userGrid.append(noResults);
    }
  });
}

function createUserCard(user) {
  const card = document.createElement("div");
  card.classList.add("card");

  const profilePic = document.createElement("img");
  profilePic.src = `${user.picture.medium}`;

  const name = document.createElement("h3");
  name.textContent = `${user.name.title}. ${user.name.first} ${user.name.last}`;

  const age = document.createElement("p");
  age.textContent = `${user.dob.age}`;

  const gender = document.createElement("p");
  gender.textContent = `${user.gender}`;

  card.append(profilePic);
  card.append(name);
  card.append(age);
  card.append(gender);

  userGrid.append(card);
}

getUserData();
