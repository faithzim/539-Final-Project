// I talked to ChatGPT during this project. Here is the full prompt, output, and citation for that use. 

//---------------------------------------------------------------------------------------------------------------------------

// Prompt: I have a website with five pages, one for each season and one called List. On each of the season pages, 
//         there is a button to add something to the list page. How can I do that with javascript? Don't write any code, 
//         just explain how I can do it.

// Output: 
// Here’s the general idea of how you can do it, without writing any code:

// 1. Decide where the “list” will live (the data store)

// Since each season page and the List page are separate, they don’t automatically share data.
// You need a way for all pages to access the same saved items.
// Common options:

// * LocalStorage** – simplest, built into the browser, works across pages on the same domain.
// * SessionStorage** – similar to localStorage but clears when the tab closes.
// * A backend/server** – if you want the list to persist across devices or users.

// Most small sites just use localStorage.

// ---

// 2. When the user clicks “Add to list” on a season page

// On the season page, your JavaScript would:

// 1. Detect that the button was clicked.
// 2. Create an “item” representing whatever is being saved (like a name, description, image URL, etc.).
// 3. Retrieve the current list from localStorage.
// 4. Add the new item to that list.
// 5. Save the updated list back into localStorage.

// So each button press updates the stored list.

// ---

// 3. On the List page, read the stored list and display it

// When someone opens the List page:

// 1. Your JavaScript loads whatever is saved in localStorage.
// 2. It loops through the items.
// 3. It dynamically creates HTML elements (like list items, divs, or cards) and inserts them into the page.

// The List page basically rebuilds itself from the stored data every time the user visits.

// ---

// 4. Optionally allow removing or editing items

// If you want delete/edit features:

// * Each displayed item on the List page can have a remove button.
// * When a user clicks it, update localStorage again (remove that entry).
// * Refresh the displayed list.

// ---

// 5. Optional: Handle edge cases

// Examples:

// * No items saved → show a “Your list is empty” message.
// * If someone adds the same item twice → decide whether to allow duplicates.
// * If the data structure changes → handle old saved data gracefully.

// ---

// Summary

// All season pages write items into a shared storage (like localStorage).
// The List page reads from that storage and displays the items.

// If you want, I can also explain **exactly what the data structure should look like**, or walk you through how each page should be organized.

//---------------------------------------------------------------------------------------------------------------------------

// Referance: OpenAI. (2025). ChatGPT (Nov 25 version) [Large language model]. https://chat.openai.com/chat