document.addEventListener("DOMContentLoaded", function () {
    fetch('/api/v1/pets')
      .then(response => response.json())
      .then(data => {
          // To display more details about each pet
          displayPets(data);
          
      })
      .catch(error => console.error('There was an error fetching the data!', error));
  });
  
  function displayPets(pets) {
      const petsContainer = document.getElementById('pets-container');
      pets.forEach(pet => {
          const petElement = document.createElement('div');
          petElement.classList.add('pet');
          petElement.innerHTML = `
              <h2>${pet.name}</h2>
              <p>Breed: ${pet.breed}</p>
              <p>Age: ${pet.age}</p>
              <p>Owner: ${pet.owner}</p>
          `;
          petsContainer.appendChild(petElement);
      });
  }
  