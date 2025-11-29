
// I didn't like having javascript embedded in the html, so I just pulled it out to here.
// This way, I can only link this script to the list page and it won't throw the errors on the other pages.

document.getElementById("print").addEventListener("click", function () {
    window.document.body.innerHTML = document.getElementById("toPrint").innerHTML;
    document.getElementById("list").style.backgroundImage = 'none';
    window.print();
    window.location.reload();
})

document.getElementById("clear").addEventListener("click", function () {
    let list = JSON.parse(sessionStorage.getItem('myList'));
    if (list === null) { list = []; }
    let IDlist = JSON.parse(sessionStorage.getItem('IDList'));
    if (IDlist === null) { IDlist = []; }

    sessionStorage.setItem('myList', JSON.stringify([]));
    sessionStorage.setItem('IDList', JSON.stringify([]));

    document.getElementById("clear").disabled = true;

    window.location.reload();
})

// This is the load listener that is commented out in script.js to avoid manually checking the url.
window.addEventListener("load", function () {
    let list = JSON.parse(sessionStorage.getItem('myList'));
    if (list === null) { list = []; }

    let IDlist = JSON.parse(sessionStorage.getItem('IDList'));
    if (IDlist === null) { IDlist = []; }

    let listElement = document.getElementById('List');

    for (let i = 0; i < list.length; i++) {
        let li = document.createElement('li');
        let a = this.document.createElement('a');
        a.textContent = list[i];
        if (IDlist[i].substring(0, 3) === "sum") {
            a.href = "file:///Users/FaithZimmerman/Desktop/School/College/AMDP%20Fall%202025/SI%20539/539_FinalProject/summer.html"
        } else if (IDlist[i].substring(0, 3) === "spr") {
            a.href = "file:///Users/FaithZimmerman/Desktop/School/College/AMDP%20Fall%202025/SI%20539/539_FinalProject/spring.html"
        } else if (IDlist[i].substring(0, 3) === "fal") {
            a.href = "file:///Users/FaithZimmerman/Desktop/School/College/AMDP%20Fall%202025/SI%20539/539_FinalProject/fall.html"
        } else if (IDlist[i].substring(0, 3) === "win") {
            a.href = "file:///Users/FaithZimmerman/Desktop/School/College/AMDP%20Fall%202025/SI%20539/539_FinalProject/winter.html"
        } else {
            console.log("Oh, something went wrong with link generation. Look at list.js line 49.")
        }
        a.href = a.href + "#" + IDlist[i];
        li.appendChild(a);
        listElement.appendChild(li);
    }

    // Remove the placeholder message and enable list clearing if there are list items
    if (list.length > 0) {
        document.getElementById("placeholder").remove();
        document.getElementById("clear").disabled = false;
    }
    // Disable clear button if there are no list items
    else {
        document.getElementById("clear").disabled = true;
    }
})