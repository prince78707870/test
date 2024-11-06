// this if is for security reason
if(sessionStorage.getItem("user")==null){
    window.location.replace("index.html");
}
else{
    // setting profile div
    var a=sessionStorage.user;
    var b=localStorage.getItem(a+"image");
    var profile_photo=document.getElementById("profile_photo");
    profile_photo.style.background=`url(${b})`;
    profile_photo.style.backgroundSize="cover";
    profile_photo.style.backgroundPosition="center";
    // click addcontact_icon to open add_contactDiv
    var addContact_icon=document.getElementById("addContact_icon");
    addContact_icon.onclick=function(){
        var add_contactDiv=document.getElementById("add_contactDiv");
        add_contactDiv.style.display="block";
        add_contactDiv.style.transition="0.5s"
    }

    // Save button coding and all data into local storage
    var save_btn=document.getElementById("save");
    save_btn.onclick=function(){
        var name=document.getElementById("add_name");
        var phone=document.getElementById("add_number");
        if(name.value != "" && phone.value != ""){
            var contact={name:name.value,phone:phone.value};
            var json_data=JSON.stringify(contact);
            localStorage.setItem(a+"_contact"+name.value,json_data);
            setTimeout(function(){
                save_btn.innerHTML="Saved";
                name.value="";
                phone.value="";
                save_btn.style.background="green";
            },500);
            setTimeout(function(){
                window.location.reload();
            },1000);
        }
        else if(name.value=="" && phone.value==""){
            name.style.borderColor="red"; 
            name.onclick=function(){
                name.style.borderColor="rgb(104, 22, 112)";
            }
            phone.style.borderColor="red";
            phone.onclick=function(){
                phone.style.borderColor="rgb(104, 22, 112)";
            }
            window.alert("Please Enter Name And Phone Number")
        }
        else if(name.value!="" && phone.value==""){
            phone.style.borderColor="red";
            phone.onclick=function(){
                phone.style.borderColor="rgb(104, 22, 112)";
            }
            alert("Please Enter Phone Number")
        }
        else{
            name.style.borderColor="red"; 
            name.onclick=function(){
                name.style.borderColor="rgb(104, 22, 112)";
            }
            alert("Please Enter Name")
        }
    }

    // click close button to hide add_contactDiv
    var close_btn=document.getElementById("close");
    close_btn.onclick=function(){
        var add_contactDiv=document.getElementById("add_contactDiv");
        add_contactDiv.style.display="none";
        var name=document.getElementById("add_name");
        var phone=document.getElementById("add_number");
        window.location.reload();
    }
    // adding number from local storage to contact list
    function addContactList(){
        var i;
        var c_name=document.getElementById("c_name");
        for(i=0;i<localStorage.length;i++){
            var key=localStorage.key(i);
            if(key.match(sessionStorage.getItem("user")+"_contact")){
                var json_text=localStorage.getItem(key);
                var obj=JSON.parse(json_text);

                // creating elements to store saved contacts
                var saved_contacts=document.createElement("DIV");
                saved_contacts.setAttribute("id","saved_contacts");
                var c_name=document.createElement("P");
                c_name.setAttribute("class","contact_name c_names");
                c_name.setAttribute("id","c_name");
                var c_number=document.createElement("P");
                c_number.setAttribute("class","contact_name");
                c_number.setAttribute("id","c_number");
                var hr_tag=document.createElement("HR");
                hr_tag.setAttribute("id","hr_tag");

                var save_edit_div=document.createElement("DIV");
                save_edit_div.setAttribute("id","save_edit_div");
                var edit_icon=document.createElement("I");
                edit_icon.setAttribute("class","fa-solid fa-pen-to-square edit");
                var delete_icon=document.createElement("I");
                delete_icon.setAttribute("class","fa-solid fa-trash delete_contact");

                //desiding which element is into which element
                c_name.innerHTML += obj.name;
                c_number.innerHTML += obj.phone;

                save_edit_div.appendChild(edit_icon);
                save_edit_div.appendChild(delete_icon);

                saved_contacts.appendChild(c_name);
                saved_contacts.appendChild(hr_tag);
                saved_contacts.appendChild(c_number);
                saved_contacts.appendChild(save_edit_div);

                var contact_div=document.getElementById("contact_div");
                contact_div.appendChild(saved_contacts);
            }
        }
    }
    addContactList();

    // function to search on input button
    var search_box=document.getElementById("search_box");
    search_box.oninput=function(){
        var all_contact_name=document.getElementsByClassName("c_names");
        var i;
        for(i=0;i<all_contact_name.length;i++){
            if(all_contact_name[i].innerHTML.toUpperCase().match(search_box.value.toUpperCase())){
                all_contact_name[i].parentElement.style.display="block";
            }
            else{
                all_contact_name[i].parentElement.style.display="none";
            }
        }
    }

    // Function to delete contact
    var del=document.getElementsByClassName("delete_contact");
    var i;
    for(i=0;i<del.length;i++){
        del[i].onclick=function(){
            var parent=this.parentElement.parentElement;
            var p_ele=parent.getElementsByClassName("contact_name")[0];
            var user_name=p_ele.innerHTML;
            localStorage.removeItem(a+"_contact"+user_name);
            parent.style.background="red";
            setTimeout(function(){
                parent.remove();
            },1000);
        }
    }

    // function to edit contact
    var edit_i=document.getElementsByClassName("edit");
    var add_name=document.getElementById("add_name");
    var add_number=document.getElementById("add_number");
    var add_contactDiv=document.getElementById("add_contactDiv");
    var add_contact_heading=document.getElementById("add_contact_heading");
    var save=document.getElementById("save");
    var i;
    for(i=0;i<edit_i.length;i++){
        edit_i[i].onclick=function(){
            var parent=this.parentElement.parentElement;
            var p_ele1=parent.getElementsByClassName("contact_name")[0];
            var user_name=p_ele1.innerHTML;
            var p_ele2=parent.getElementsByClassName("contact_name")[1];
            var user_phone=p_ele2.innerHTML;
            add_name.value=user_name;
            add_number.value=user_phone;
            add_contactDiv.style.display="block";
            add_contact_heading.innerHTML="Edit Contact";

            save.onclick=function(){
                var updated_name=add_name.value;
                var updated_number=add_number.value;

                // removing old data
                localStorage.removeItem(a+"_contact"+user_name);

                p_ele1.innerHTML=updated_name;
                p_ele2.innerHTML=updated_number;

                // updating saved data
                var updated_contact={name:updated_name, phone:updated_number};
                var json_data2=JSON.stringify(updated_contact);
                localStorage.setItem(a+"_contact"+updated_name,json_data2);
                
                setTimeout(function(){
                    save.innerHTML="Saved";
                    save.style.background="green";
                },500);
                setTimeout(function(){
                    add_contactDiv.style.display="none";

                },1000);
            }
        }
    }

}