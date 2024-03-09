// asynchronous fetch function to retrieve API data
const fetchGet = async () => {
    try {
        let response = await fetch('https://65e8adc04bb72f0a9c501d0d.mockapi.io/api/week12/house'); // Fetches the data
        let data = await response.json(); // Converts the data to be readable

        // Get the container element from index.html
        let housesContainer = document.getElementById('houses-container mt-0');

        // Clear the existing content in the container
        housesContainer.innerHTML = '';

        // Loop through the data in reverse order to add the new house to the top
        for (let i = data.length - 1; i >= 0; i--) {
            let house = data[i];

            // Create a new div element for each house w/ margins
            let houseDiv = document.createElement('div');
            houseDiv.style.marginBottom = '50px';
            houseDiv.style.marginTop = '50px';
            houseDiv.style.marginLeft= '50px';

            // Create an h1 element for the house name with underline styling
            let houseNameHeading = document.createElement('h1');
            // house.house will be the name of this house
            houseNameHeading.textContent = house.house || 'N/A';
            // add underline for style
            houseNameHeading.style.textDecoration = 'underline';

            // Extract the bedrooms value from the property name
            let bedroomsValue = house.bedrooms || 'N/A';

            // Create an h3 element for the number of bedrooms with italic styling
            let bedroomsHeading = document.createElement('h3');
            // replace method, because data from API is shown as 'bedrooms #', but we just want the '#'
            bedroomsHeading.innerHTML = `Bedrooms: ${bedroomsValue.replace(/^bedrooms\s+/i, '')}<br>`;

            // Create button for adding bedrooms, references incrementBedrooms function
            let incrementButton = document.createElement('button');
            incrementButton.textContent = '+';
            incrementButton.style.marginRight = '5px';
            incrementButton.addEventListener('click', () => incrementBedrooms(house, bedroomsHeading));

            // 'Add room' text so you know what the button does
            let incrementText = document.createElement('span');
            incrementText.innerHTML = 'Add Room';

            // Create button for subtracting bedrooms, references decrementBedrooms function
            let decrementButton = document.createElement('button');
            decrementButton.textContent = '-';
            decrementButton.style.marginLeft = '30px';
            decrementButton.style.marginRight = '5px';
            decrementButton.addEventListener('click', () => decrementBedrooms(house, bedroomsHeading));

            // 'Subtract bedroom' text so you know what the button does
            let decrementText = document.createElement('span');
            decrementText.innerHTML = '&nbsp;&nbsp;Subtract Room';

            // Create a button for deleting the house, reference deleteHouse function
            let deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.style.marginLeft = '30px';
            deleteButton.addEventListener('click', () => deleteHouse(house));

            // Appends the elements to the house div
            houseDiv.appendChild(houseNameHeading);
            houseDiv.appendChild(bedroomsHeading);
            houseDiv.appendChild(incrementButton);
            houseDiv.appendChild(incrementText);
            houseDiv.appendChild(decrementButton);
            houseDiv.appendChild(decrementText);
            houseDiv.appendChild(deleteButton);

            // Appends the house div to the container
            housesContainer.appendChild(houseDiv);
        }
    } catch (error) {
        console.error('Error: ', error);
    }
};

// incrementBedrooms function takes a house its bedrooms (bedroomsHeading) as parameters
const incrementBedrooms = (house, bedroomsHeading) => {
    // Increment the bedrooms value by 1
    house.bedrooms = (parseInt(house.bedrooms) || 0) + 1;
    // Update the text content of the bedrooms heading
    bedroomsHeading.innerHTML = `Bedrooms: ${house.bedrooms}<br>`;
};

// decrementBedrooms taks house & its bedrooms (bedroomsHeading) as paramters
const decrementBedrooms = (house, bedroomsHeading) => {
    // Decrement the bedrooms value, but ensure it doesn't go below 0
    house.bedrooms = Math.max((parseInt(house.bedrooms) || 0) - 1, 0);
    // Update the text content of the bedrooms heading
    bedroomsHeading.innerHTML = `Bedrooms: ${house.bedrooms}<br>`;
};

// deleteHouse function for deleting house from the API
const deleteHouse = async (house) => {
    try {
        // Send a DELETE request to remove the house
        let response = await fetch(`https://65e8adc04bb72f0a9c501d0d.mockapi.io/api/week12/house/${house.id}`, {
            method: 'DELETE',
        });

        // Check if the request was successful
        if (response.ok) {
            // Fetch and display the updated list of houses
            fetchGet();
        } else {
            console.error('Failed to delete the house');
        }
    } catch (error) {
        console.error('Error: ', error);
    }
};

// addHouse retrieves the value entered in the 'new-house-name' input field.
// Sends a POST request to add a new house to the mock API with the specified name and default bedrooms set to 0.
// If successful, it fetches and displays the updated list of houses using the fetchGet function.
const addNewHouse = async () => {
    try {
        let newHouseName = document.getElementById('new-house-name').value;

        if (newHouseName) {
            // Send a POST request to add a new house
            let response = await fetch('https://65e8adc04bb72f0a9c501d0d.mockapi.io/api/week12/house', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ house: newHouseName, bedrooms: '0' }),
            });

            // Check if the request was successful
            if (response.ok) {
                // Fetch and display the updated list of houses
                fetchGet();
            } else {
                console.error('Failed to add a new house');
            }
        } else {
            console.error('Please enter a valid house name');
        }
    } catch (error) {
        console.error('Error: ', error);
    }
};

// Attaches a click event listener to the "Add House" button, triggering the addNewHouse function when clicked.
document.getElementById('add-house-btn').addEventListener('click', addNewHouse);

// Initial fetch and display of houses
fetchGet();