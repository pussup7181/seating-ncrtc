const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    //get User Data
    const email = signupForm['email-id'].value;
    const password = signupForm['password'].value;

    
    createUserWithEmailAndPassword(auth, email, password).then(cred=>{
        console.log(cred);
    })


})