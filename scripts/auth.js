//DOM QUERIES
const docStrings = {
  signUp: document.querySelector("#signup-form"),
  logout: document.querySelector("#logout"),
  signIn: document.querySelector("#login-form"),
  loginModal: document.querySelector("#modal-login"),
  signUpModal: document.querySelector("#modal-signup"),
};

//setup auth changes listener
//keeping track of user authentication status
auth.onAuthStateChanged((user) => {
  if (user) {
    //data from the firebase firestore collection
    db.collection("guides").onSnapshot(
      (snapshot) => {
        guidesDisplay(snapshot.docs);
        setupUI(user);
      },
      (error) => {
        console.log(error.message);
      }
    );
  } else {
    guidesDisplay([]);
    setupUI();
  }
});

//sign-up section

const addUser = (e) => {
  e.preventDefault();
  const email = docStrings.signUp["signup-email"].value;
  const password = docStrings.signUp["signup-password"].value;
  auth.createUserWithEmailAndPassword(email, password).then((cred) => {
    /////do something after signing the user in
    return db
      .collection("users")
      .doc(cred.user.uid)
      .set({
        bio: docStrings.signUp["signup-bio"].value,
      })
      .then(() => {
        M.Modal.getInstance(docStrings.signUpModal).close();
        docStrings.signUp.reset();
      });
  });
};

docStrings.signUp.addEventListener("submit", addUser);

//logging the user in login section
const loginUser = (e) => {
  e.preventDefault();
  const email = docStrings.signIn["login-email"].value;
  const password = docStrings.signIn["login-password"].value;
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    console.log(cred.user.email);
    M.Modal.getInstance(docStrings.loginModal).close();
    docStrings.signIn.reset();
  });
};
docStrings.signIn.addEventListener("submit", loginUser);

//logging the user out
const logUserOut = (e) => {
  e.preventDefault();
  auth.signOut();
};

docStrings.logout.addEventListener("click", logUserOut);
