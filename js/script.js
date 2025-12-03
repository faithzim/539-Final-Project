// Attempt #1: Listener

// document.getElementsByTagName("button").addEventListener("click", function () {
//     console.log("Pressed")
//     document.getElementById("#List") = document.getElementById("#List").value + "hello"
// })

// Reason for deprication: Couldn't pass the name of the item to add easily

//--------------------------------------------------------------------------------------------------------------

// Attempt #2: Individual Function 

// function AddToList(itemToAdd) {
//     window.open(url, '_blank').focus();
//     let list = document.getElementById("List");
//     let item = document.createElement("li");
//     item.textContent = itemToAdd;
//     list.appendChild(item);
// }

// Improvement over attempt #1: Can pass the name of the media item to add
// Reason for deprication: Couldn't find the List element on the List page, kept looking for it on the same page as the button
// I researched and learned that I needed another piece to help the different pages communicate with each other

//--------------------------------------------------------------------------------------------------------------

// Attempt #3: JSON local storage

// I asked ChatGPT how I could get the pages to communciate with each other, and it told me about local and session storage.
// and gave me some general steps. (You can see the full prompt, output, and citation in aiStatement.js). 

// I looked up how to add things to session storage, and this stack overflow thread was very helpful.
// https://stackoverflow.com/questions/51303211/how-to-add-item-to-local-storage 

// function AddToList(itemToAdd) {
//     let list = JSON.parse(sessionStorage.getItem('myList'));
// if (list === null) {
//     list = [];
// }
//     list.push(itemToAdd);
//     sessionStorage.setItem('myList', JSON.stringify(list));
// }

// That works but it doesn't do much at all. Let's expand it.
//--------------------------------------------------------------------------------------------------------------

function EditListAndLabel(buttonID, listItem) {
    let caller = document.getElementById(buttonID)

    // If it's not already on the list
    if (caller.innerText === "Add To My List") {
        // Set Button Value
        caller.innerText = "Remove From My List"
        // Set Aria Label
        caller.ariaLabel = "Remove " + listItem.split("(")[0] + " From My List"

        // Add Item Name to list
        let list = JSON.parse(sessionStorage.getItem('myList'));
        if (list === null) { list = []; }
        list.push(listItem);
        sessionStorage.setItem('myList', JSON.stringify(list));

        // Add Button ID to seperate list (a mystery mousekatool that will help us later)
        let IDlist = JSON.parse(sessionStorage.getItem('IDList'));
        if (IDlist === null) { IDlist = []; }
        IDlist.push(buttonID);
        sessionStorage.setItem('IDList', JSON.stringify(IDlist));
    }

    // If it is already on the list
    else {
        // Set Button Value
        caller.innerText = "Add To My List"
        // Set Aria Label
        caller.ariaLabel = "Add " + listItem.split("(")[0] + " To My List"

        // Remove Item Name from list
        let list = JSON.parse(sessionStorage.getItem('myList'));
        if (list === null) { list = []; }
        for (let i = 0; i <= list.length; i++) {
            if (list[i] === listItem) { list.splice(i, 1) }
        }
        sessionStorage.setItem('myList', JSON.stringify(list));

        // Remove Button ID from seperate list (a mystery mousekatool that will help us later)
        let IDlist = JSON.parse(sessionStorage.getItem('IDList'));
        if (IDlist === null) { IDlist = []; }
        for (let i = 0; i <= IDlist.length; i++) {
            if (IDlist[i] === buttonID) { IDlist.splice(i, 1) }
        }
        sessionStorage.setItem('IDList', JSON.stringify(IDlist));
    }
}

//--------------------------------------------------------------------------------------------------------------

// Now to populate the list on the list page

// window.addEventListener("load", function () {
//     let list = JSON.parse(sessionStorage.getItem('myList'));

//     let listElement = document.getElementById('List');

//     for (let i = 0; i < list.length; i++) {
//         let li = document.createElement('li');
//         li.textContent = item;
//         listElement.appendChild(li);
//     });
// });

// window.addEventListener("load", function () {
//     document.getElementById("year").innerHTML = new Date().getFullYear();

// if (window.location.href === "file:///Users/FaithZimmerman/Desktop/School/College/AMDP%20Fall%202025/SI%20539/539_FinalProject/list.html") {

//     let list = JSON.parse(sessionStorage.getItem('myList'));
//     if (list === null) { list = []; }
//     let IDlist = JSON.parse(sessionStorage.getItem('IDList'));
//     if (IDlist === null) { IDlist = []; }

//     let listElement = document.getElementById('List');

//     for (let i = 0; i < list.length; i++) {
//         let li = document.createElement('li');
//         let a = this.document.createElement('a');
//         a.textContent = list[i];
//         if (IDlist[i].substring(0, 3) === "sum") {
//             a.href = "file:///Users/FaithZimmerman/Desktop/School/College/AMDP%20Fall%202025/SI%20539/539_FinalProject/summer.html"
//         } else if (IDlist[i].substring(0, 3) === "spr") {
//             a.href = "file:///Users/FaithZimmerman/Desktop/School/College/AMDP%20Fall%202025/SI%20539/539_FinalProject/spring.html"
//         } else if (IDlist[i].substring(0, 3) === "fal") {
//             a.href = "file:///Users/FaithZimmerman/Desktop/School/College/AMDP%20Fall%202025/SI%20539/539_FinalProject/fall.html"
//         } else if (IDlist[i].substring(0, 3) === "win") {
//             a.href = "file:///Users/FaithZimmerman/Desktop/School/College/AMDP%20Fall%202025/SI%20539/539_FinalProject/winter.html"
//         } else {
//             console.log("Oh, something went wrong with link generation. Look at js line 131.")
//         }
//         a.href = a.href + "#" + IDlist[i];
//         li.appendChild(a);
//         listElement.appendChild(li);
//     }

//     // Remove the placeholder message if there are list items
//     if (list.length > 0) {
//         document.getElementById("placeholder").remove();
//         document.getElementById("clear").disabled = false;
//     }
//     else {
//         document.getElementById("clear").disabled = true;
//     }
// }

// This addresses the buttons' values setting correctly on refresh
// else {
//     let IDlist = JSON.parse(sessionStorage.getItem('IDList'));
//     if (IDlist === null) { IDlist = []; }
//     for (let i = 0; i < IDlist.length; i++) {
//         if (document.getElementById(IDlist[i]) !== null) {
//             document.getElementById(IDlist[i]).innerText = "Remove From My List"
//         }
//     }
//   }
// });

// Okay that was actually a lot easier than expected

// This is the same as the commented code directly above I pulled out the part that only applied to the list page. 
// That code now lives in list.js so that I wouldn't have to manually check the url in the listener. 
// This is the code that remains for all the other pages. 

window.addEventListener("load", function () {

    // Set the year in the footer
    document.getElementById("year").innerHTML = new Date().getFullYear();

    // This addresses the buttons' values setting correctly on refresh
    let IDlist = JSON.parse(sessionStorage.getItem('IDList'));
    if (IDlist === null) { IDlist = []; }
    for (let i = 0; i < IDlist.length; i++) {
        if (document.getElementById(IDlist[i]) !== null) {
            document.getElementById(IDlist[i]).innerText = "Remove From My List"
        }
    }
});

//--------------------------------------------------------------------------------------------------------------

// Adding a print button to print the list without any of the other page content
// document.getElementById("print").addEventListener("click", function () {
//     window.document.body.innerHTML = document.getElementById("toPrint").innerHTML;
//     window.print();
//     window.location.reload();
// })
// This code is good, but it throws a console error on every page that's not the list page. 
// To handle that, I'm just gonna pull the function and put it right in the list html. 
// Actually, I put it in it's own js file, list.js

//--------------------------------------------------------------------------------------------------------------

// Okay so that's all great but I want more. I kinda want users to be able to drag and drop to reorder the list
// and remove list items from the list page itself. Let's see about that.

// Alright I thought about adding a remove button on the list page for each item, but I didn't love that. 
// What I did instead is just liking to the orignal page location from the list page. That way, people can 
// click to the original remove button and look back at the details and decide if they want to remove it or not.
// Those changes are reflected in lines 122-129 or 40-50 in list.js

//--------------------------------------------------------------------------------------------------------------

// I also want to add a clear list button, but that'll throw the same issue as the print button. 
// So again, I'm gonna drop it directly in the list.html.
// Actually, I put it in it's own js file, list.js
//  Here's the code for it though.

// document.getElementById("clear").addEventListener("click", function () {
//     let list = JSON.parse(sessionStorage.getItem('myList'));
//     if (list === null) { list = []; }
//     let IDlist = JSON.parse(sessionStorage.getItem('IDList'));
//     if (IDlist === null) { IDlist = []; }

//     sessionStorage.setItem('myList', JSON.stringify([]));
//     sessionStorage.setItem('IDList', JSON.stringify([]));

//     document.getElementById("clear").disabled = true;

//     window.location.reload();
// })

//--------------------------------------------------------------------------------------------------------------
