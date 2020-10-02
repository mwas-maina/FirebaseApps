document.addEventListener("DOMContentLoaded", function () {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});

//query
const guideList = document.querySelector(".guides");

const guidesDisplay = (data) => {
  if (data.length) {
    let html = "";
    data.forEach((docs) => {
      const guides = docs.data();

      let li = `<li>
    <div class="collapsible-header grey lighten-4">${guides.title}</div>
    <div class="collapsible-body white"><span>${guides.content}</span></div>
    </li>`;
      html = html + li;
    });
    guideList.innerHTML = html;
  } else {
    guideList.innerHTML = '<h2 class="center">Login to view contents</h2>';
  }
};

//toggle ui
const loggedIn = document.querySelectorAll(".logged-in");
const loggedOut = document.querySelectorAll(".logged-out");
const userDetails = document.querySelector(".account-details");
const setupUI = (user) => {
  //if user exists

  if (user) {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        const html = `</div>logged in as ${user.email}</div> 
      <div>${doc.data().bio}</div>
      `;
        userDetails.innerHTML = html;
      });

    loggedIn.forEach((item) => (item.style.display = "block"));
    loggedOut.forEach((item) => (item.style.display = "none"));
  } else {
    loggedOut.forEach((item) => (item.style.display = "block"));
    loggedIn.forEach((item) => (item.style.display = "none"));
  }
};

//create a guide
const guideForm = document.querySelector("#create-form");

const addGuide = (event) => {
  event.preventDefault();
  db.collection("guides")
    .add({
      title: guideForm["title"].value,
      content: guideForm["content"].value,
    })

    .catch((error) => {
      alert(error);
    });
  const guideCreate = document.getElementById("modal-create");
  M.Modal.getInstance(guideCreate).close();
  guideForm.reset();
};
guideForm.addEventListener("submit", addGuide);
