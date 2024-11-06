window.onload=function(){    
    if(sessionStorage.getItem("user")==null){
        window.location.replace("index.html");
    }
    else{
        // Redirect to video player page
        var video_palyer_page=document.getElementById("videoPlayer_section");
        video_palyer_page.onclick=function(){
            window.location.href="videoPlayer.html";
        }
        var upload_profile_div=document.getElementById("upload_profile_div");
        var input_profile=document.getElementById("input_profile");
        var profile_account_icon=document.getElementById("profile_account_icon");
        var plus_icon=document.getElementById("plus_icon");
        var profile_div_nextbtn=document.getElementById("profile_div_nextbtn");
        profile_div_nextbtn.disabled=true;
        profile_div_nextbtn.style.background="#ccc";
        var mailid=sessionStorage.getItem("user");
        // checking if the user already uploaded a profile picture
        if(localStorage.getItem(mailid+"image")!=null){
            upload_profile_div.style.display="none";
        }

        // loading profile picture
        var image_url=localStorage.getItem(mailid+"image");
        var user_profile=document.getElementById("profile_picture");
        user_profile.style.backgroundImage="url("+image_url+")";
        user_profile.style.backgroundSize="cover";
        user_profile.style.backgroundPosition="center";



        var json_text=localStorage.getItem(mailid);
        var user_name=JSON.parse(json_text);
        var f=document.getElementById("profile_div_username");
        var to_print_data=atob(user_name.username);
        f.innerHTML=to_print_data;
        document.getElementById("main_container_username").innerHTML=to_print_data;
        input_profile.onchange=function(){
            var reader=new FileReader();
            reader.readAsDataURL(input_profile.files[0]);
            reader.onload=function(){
                var filename=reader.result;
                var profile_pic=document.getElementById("profile_div");
                profile_pic.style.backgroundImage="url("+filename+")";
                profile_pic.style.backgroundSize="cover";
                profile_pic.style.backgroundPosition="center";
                profile_account_icon.style.display="none";
                plus_icon.style.display="none";
                profile_div_nextbtn.disabled=false;
                profile_div_nextbtn.style.background="linear-gradient(to right, #E100FF, #7F00FF)";

                profile_div_nextbtn.onclick=function(){
                    localStorage.setItem(mailid+"image", filename);
                    upload_profile_div.style.display="none";
                    window.location.href="setProfile.html";
                }
            }
        }

        // clicking contact section
        var contact_section=document.getElementById("contact_section")
        contact_section.onclick=function(){
            window.location.href="contact.html";
        }

        // log out script starts
        var logout_btn=document.getElementById("logout_section");
        logout_btn.onclick=function(){
            var logout_heading=document.getElementById("logout_heading");
            logout_heading.innerHTML="Please wait...";
            sessionStorage.clear();
            setTimeout(function(){
                window.location.href="index.html";
            },2000);
        }
    }
}