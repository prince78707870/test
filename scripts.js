// hiding and showing login and sign up page
var login_page=document.getElementById("loginDiv");
var signup_page=document.getElementById("signupDiv");
var signup_link=document.getElementById("sign_span");
var login_link=document.getElementById("login_span");

signup_link.onclick=function(){
    signup_page.style.display="block";
    login_page.style.display="none";
}

login_link.onclick=function(){
    login_page.style.display="block";
    signup_page.style.display="none";
}
// end of hiding and showing login and sign up page


// login and sign up data store
var signup_frm=document.getElementById("signup_frm");
signup_frm.onsubmit=function(){
    var user=btoa(document.getElementById("name").value);
    var mail=btoa(document.getElementById("smail").value);
    var phone=btoa(document.getElementById("phone").value);
    var pass=btoa(document.getElementById("spass").value);

    var user_object_data={username:user,email:mail,phone:phone,password:pass}
    var user_text_data=JSON.stringify(user_object_data);
    if(user!="" && mail!="" && phone!="" && pass!=""){
        localStorage.setItem(mail,user_text_data);
        var signbtn=document.getElementById("signbtn");
        signbtn.style.background="green";
        signbtn.innerHTML="<i class='fa-solid fa-circle-check'></i>Sign up Sucessfull !";
        setTimeout(function(){
            signbtn.style.background="linear-gradient(to right, #E100FF, #7F00FF";
            signbtn.innerHTML="Sign up";
            signup_frm.reset();
        },3000);
        return false;
    }
}
// end login and sign up data store


// function to check is email already registered
var email_input=document.getElementById("smail");
email_input.onchange=function(){
    var email=btoa(document.getElementById("smail").value);
    var war=document.getElementById("warning");
    var signbtn=document.getElementById("signbtn");
    if(localStorage.getItem(email)!=null){
        war.style.display="block";
        signbtn.disabled=true;
        signbtn.style.background="#ccc";

        // to remove email used warning
        email_input.onclick=function(){
            email_input.value="";
            war.style.display="none";
            signbtn.disabled=false;
            signbtn.style.background="linear-gradient(to right, #E100FF, #7F00FF";
        }
    }
} 
// end of check is email already registered


// start login code
var input_frm=document.getElementById("input_frm");
input_frm.onsubmit=function(){
    var user_mail=btoa(document.getElementById("mail").value);
    var user_pass=btoa(document.getElementById("pass").value);
    var del_mail=document.getElementById("mail");
    var del_pass=document.getElementById("pass");
    var alert_wrong_email=document.getElementById("wrong_email");
    if(localStorage.getItem(user_mail) == null){
        alert_wrong_email.style.display="block";
        del_mail.onclick=function(){
            alert_wrong_email.style.display="none";
            del_mail.value="";
            del_pass.value="";
        }
    }
    else{
        var text_data=localStorage.getItem(user_mail);
        var obj_data=JSON.parse(text_data);
        var original_email=obj_data.email;
        var original_password=obj_data.password;
        var alert_wrong_pass=document.getElementById("wrong_pass");
        if(original_email==user_mail){
            if(original_password==user_pass){
                sessionStorage.setItem("user",user_mail);
                window.location.replace("setProfile.html");
            }
            else{
                alert_wrong_pass.style.display="block";
                del_pass.value="";
                del_pass.onclick=function(){
                    alert_wrong_pass.style.display="none";
                }
            }
        }
    }
    return false;
}
// end login code

