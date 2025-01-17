function responsiveNav() 
{
  var x = document.getElementById("myTopnav");
  
  if(x.className === "topnav")
      x.className += " responsive";
  else 
      x.className = "topnav";
}

window.onload = function(){
    lastVisit();
    document.getElementById("my-form").onsubmit = manageForm;
}

function manageForm()
{
    let name = document.getElementById("name").value;
    let email= document.getElementById("mail").value;
    let message = document.getElementById("msg").value;

    let okResponse = true;

    if(!validateName(name))
    {
        alert("Nume incorect! Incearca din nou!");
        okResponse = false;
    }

    if(!validateEmail(email))
    {
        alert("Email incorect! Incearca din nou!");
        okResponse = false;
    }


    if(okResponse)
        alert("Rasupunsul la formular a fost inregistrat!");

}

function validateEmail(email)
{
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function validateName(name)
{
    const namePattern = /^[a-zA-z]+$/;
    return namePattern.test(name);
}

function lastVisit()
{
    const lastVisit = localStorage.getItem('lastVisit');
    if (lastVisit) {
        document.getElementById("last-visit").innerHTML += `Welcome back! Your last visit was on ${lastVisit}`;
    }
    
    localStorage.setItem('lastVisit', new Date());
}