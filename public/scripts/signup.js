async function storeDetails() {
  let form = document.getElementById("formContainer");
  let UserName = form.UserName.value;
  let Number = form.Number.value;
  let Email = form.Email.value;
  let Password = form.Password.value;

  if (UserName.length == 0 || Number.length == 0 || Email.length == 0 || Password.length == 0) {
    let div = document.createElement("div");
    div.innerHTML = "please fill all the details";
    let alert = document.getElementById("alert");
    alert.innerHTML = null;
    alert.append(div);
    return;
  }
  let user = {
    UserName,
    Number,
    Email,
    Password,
  };
console.log(user)
  try {
    let response = await fetch('/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    if (response.ok) {
      let result = await response.json();
      console.log(result);
      window.location.href = "/login";
    } else {
      console.log('Signup failed');
    }
  } catch (error) {
    console.error('Error:', error);
  }

  form.username.value = null;
  form.mobileno.value = null;
  form.email.value = null;
  form.password.value = null;
}

function loginpage() {
  window.location.href = "/login";
}
