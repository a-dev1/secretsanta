let cards = document.querySelector('.cards');

const showDetains = (e) => {
  console.log('show details');
  e.target.parentElement.parentElement.lastElementChild.style.display = 'block';
}

const hideDetails = (e) => {
  console.log('hide details');
  e.target.parentElement.parentElement.parentElement.style.display = 'none';
}

let createCard = (item) => {
  let card_container = document.createElement('div')
  card_container.classList.add('card-container')
  
  card_container.innerHTML = `
  <div class="card-header">
  <img src="${item.url}" alt="product">
  <h2 class="name">${item.username}</h2>
  </div>
  <div class="card-footer">
  <span>${item.giftname}</span>
  <span>Need: $${item.balance}</span>
  </div>
  <div class="cover-button">
  <button class="show-details" onclick="showDetains(event)">GIFT</button>
  </div>
  
  <div class="deadly-nested">
  <div class="details-cover">
  
  <div class="details-container">
  <div class="details-img-container">
  <img src="${item.url}" alt="">
  </div>
  <div class="details">
  <h1>${item.giftname}</h1>
  <h3>${item.description}.</p>
  <span>Need: $${item.balance}</span>
  <button type="submit">PAY</button>
  </div>
  <button class="close-cover" onclick="hideDetails(event)">X</button>
  </div>
  
  </div>
  </div>
  `;

  cards.appendChild(card_container);
  console.log('adding a new card');
}


const showCards = () => {
  fetch('https://holidayhacks.herokuapp.com/all')
  .then(response => response.json())
  .then(data => {
    data.forEach(item => createCard(item))
    console.log(data)
  })
  .catch((e) => console.log(e));
}

// document.querySelectorAll('.show-details').forEach(button => {
//   button.addEventListener('click', showDetains);
// })

