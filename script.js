let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

function addContact() {
    let nameInput = document.getElementById("name");
    let phoneInput = document.getElementById("phone");
    let msg = document.getElementById("msg");

    let name = nameInput.value.trim();
    let phone = phoneInput.value.trim();

    msg.innerHTML = "";
    msg.style.color = "red";
    msg.style.textAlign="center";
    msg.style.marginTop="5px";
    
    if (!name) {
        msg.innerHTML = "Please enter your name!";
        nameInput.style.border = "2px solid red";
        return;
    } else {
        nameInput.style.border = "1px solid #ccc";
    }

    if (!phone) {
        msg.innerHTML = "Please enter phone number!";
        phoneInput.style.border = "2px solid red";
        return;
    }

    // 🔥 Number-only validation
    if (!/^[0-9]+$/.test(phone)) {
        msg.innerHTML = "Phone number must contain only digits!";
        phoneInput.style.border = "2px solid red";
        return;
    } else {
        phoneInput.style.border = "1px solid #ccc";
    }
if (!name) {
    msg.innerHTML = "Please enter your name!";
    nameInput.style.border = "2px solid red";
    return;
}

// Alphabet-only validation
if (!/^[A-Za-z ]+$/.test(name)) {
    msg.style.color = "red";
    msg.innerHTML = "Name must contain only alphabets!";
    nameInput.style.border = "2px solid red";
    return;
} else {
    nameInput.style.border = "1px solid #ccc";
}

    // Save contact
    contacts.push({ name, phone });
    localStorage.setItem("contacts", JSON.stringify(contacts));

    msg.style.color = "green";
    msg.style.textAlign = "center";
    msg.innerHTML = "Contact added successfully!";

    nameInput.value = "";
    phoneInput.value = "";

    showContacts();
}

function showContacts() {
    let list = document.getElementById("contactList");
    if (!list) return;
    list.innerHTML = "";

    contacts.forEach((c, index) => {
        let item = document.createElement("div");
        item.className = "contact-item";

        item.innerHTML = `
     
         <strong>${c.name}</strong>${c.phone}
            <button  class="delBtn" onclick="deleteContact(${index})">Delete</button>
        `;

        list.appendChild(item);
        
    });
    
}
function deleteContact(index) {
    contacts.splice(index, 1);  // remove from array
    localStorage.setItem("contacts", JSON.stringify(contacts)); // update storage
    showContacts(); // refresh list
}


function searchContact() {
    let term = document.getElementById("searchBox").value.toLowerCase();
    let result = document.getElementById("searchResult");
    if (!result) return;
    result.innerHTML = "";

    let filtered = contacts.filter(c =>
        c.name.toLowerCase().includes(term) || c.phone.includes(term)
    );

    filtered.forEach(c => {
        let r = document.createElement("div");
        r.innerHTML = `<strong>${c.name}</strong> - ${c.phone}`;
        result.appendChild(r);
    });
}
window.onload = function () {
    showContacts();

    let nameInput = document.getElementById("name");
    let phoneInput = document.getElementById("phone");

    // Name → Enter → Go to Phone
    if (nameInput && phoneInput) {
        nameInput.addEventListener("keypress", function(e) {
            if (e.key === "Enter") {
                phoneInput.focus();          // 👈 move cursor to phone
            }
        });
 if (phoneInput) {
        phoneInput.addEventListener("keypress", function (e) {
            if (!/[0-9]/.test(e.key)) {
                e.preventDefault(); // block non-numbers
            }
        });
    }
        // Phone → Enter → Add Contact
        phoneInput.addEventListener("keypress", function(e) {
            if (e.key === "Enter") {
                addContact();
            }
        });
    }
};
