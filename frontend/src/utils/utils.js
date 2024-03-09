

//Show password function for example in a input form
export function togglePasswordVisibility() {
    var pwd = document.getElementById("showPassword");
    if (pwd.type === "password") {
      pwd.type = "text";
    } else {
      pwd.type = "password";
    }
  }


