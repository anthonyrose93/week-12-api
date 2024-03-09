const incrementBedrooms = (house, bedroomsHeading) => {
    house.bedrooms = (parseInt(house.bedrooms) || 0) + 1;
    bedroomsHeading.innerHTML = `Bedrooms: ${house.bedrooms}<br>`;
};

// Decrement Bedrooms Function (decrementBedrooms):
// Similar to the increment function, but it decrements the number of bedrooms, ensuring it doesn't go below 0.
const decrementBedrooms = (house, bedroomsHeading) => {
    house.bedrooms = Math.max((parseInt(house.bedrooms) || 0) - 1, 0);
    bedroomsHeading.innerHTML = `Bedrooms: ${house.bedrooms}<br>`;
};

// Delete House Function (deleteHouse):
// This asynchronous function sends a DELETE request to the mock API to delete a specific house.
// If the deletion is successful (response.ok), it updates the HTML content directly for the deleted house.
const deleteHouse = async (house) => {
    try {
        // Send a DELETE request to remove the house
        let response = await fetch(`https://65e8adc04bb72f0a9c501d0d.mockapi.io/api/week12/house/${house.id}`, {
            method: 'DELETE',
        });

        // Check if the request was successful
        if (response.ok) {
            // Update the HTML content directly for the deleted house
            let deletedHouseDiv = document.getElementById(`house-${house.id}`);
            if (deletedHouseDiv) {
                deletedHouseDiv.remove();
            }
        } else {
            console.error('Failed to delete the house');
        }
    } catch (error) {
        console.error('Error: ', error);
    }
};

// Fetch and display houses
const fetchGet = async () => {
    try {
        let response = await fetch('https://65e8adc04bb72f0a9c501d0d.mockapi.io/api/week12/house');
        let data = await response.json();

        // Sort the data based on the 'id' property in ascending order
        data.sort((a, b) => a.id - b.id);

        // Get the container element
        let housesContainer = document.getElementById('houses-container mt-0');

        // Clear the existing content in the container
        housesContainer.innerHTML = '';

        // Loop through the sorted data to add the houses in the correct order
        for (let i = 0; i < data.length; i++) {
            let house = data[i];

            // Create a new div element for each house
            let houseDiv = document.createElement('div');
            houseDiv.id = `house-${house.id}`;
            houseDiv.style.marginBottom = '50px';
            houseDiv.style.marginTop = '50px';
            houseDiv.style.marginLeft = '50px';

            // Create an h1 element for the house name with underline styling
            let houseNameHeading = document.createElement('h1');
            houseNameHeading.textContent = house.house || 'N/A';
            houseNameHeading.style.textDecoration = 'underline';

            // Create an h3 element for the number of bedrooms with italic styling
            let bedroomsHeading = document.createElement('h3');
            bedroomsHeading.innerHTML = `Bedrooms: ${getBedroomsValue(house)}<br>`;

            // Create buttons for incrementing and decrementing bedrooms
            let incrementButton = document.createElement('button');
            incrementButton.textContent = '+';
            incrementButton.style.marginRight = '5px';
            incrementButton.addEventListener('click', () => incrementBedrooms(house, bedroomsHeading));

            let incrementText = document.createElement('span');
            incrementText.innerHTML = 'Add Room';

            let decrementButton = document.createElement('button');
            decrementButton.textContent = '-';
            decrementButton.style.marginLeft = '30px';
            decrementButton.style.marginRight = '5px';
            decrementButton.addEventListener('click', () => decrementBedrooms(house, bedroomsHeading));

            let decrementText = document.createElement('span');
            decrementText.innerHTML = '&nbsp;&nbsp;Subtract Room';

            // Create a button for deleting the house
            let deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.style.marginLeft = '30px';
            deleteButton.addEventListener('click', () => deleteHouse(house));

            // Append the elements to the house div
            houseDiv.appendChild(houseNameHeading);
            houseDiv.appendChild(bedroomsHeading);
            houseDiv.appendChild(incrementButton);
            houseDiv.appendChild(incrementText);
            houseDiv.appendChild(decrementButton);
            houseDiv.appendChild(decrementText);
            houseDiv.appendChild(deleteButton);

            // Append the house div to the container
            housesContainer.appendChild(houseDiv);
        }
    } catch (error) {
        console.error('Error: ', error);
    }
};

// Helper function to get bedrooms value
const getBedroomsValue = (house) => {
    return (house.bedrooms || 'N/A').replace(/^bedrooms\s+/i, '');
};

// (Rest of your code remains unchanged)

// Initial fetch and display of houses
fetchGet();