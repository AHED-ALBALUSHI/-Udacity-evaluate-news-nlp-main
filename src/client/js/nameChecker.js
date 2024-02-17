function checkForName(inputText) {
    console.log("::: Running checkForName :::", inputText);
    const captains = ["Ahed", "Abdullah", "Ahmed", "Salim", "Emaad"];
    const isCaptain = captains.some(captain => captain === inputText.trim());

    if (isCaptain) {
        alert("Welcome, Captain!");
    } else {
        console.log("Not a recognized captain.");
    }
}

export { checkForName };