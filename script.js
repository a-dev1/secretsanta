let cards = document.querySelector('.cards');

const showDetains = (e) => {
  console.log('show details');
  e.target.parentElement.parentElement.lastElementChild.style.display = 'block';
}

const hideDetails = (e) => {
  console.log('hide details');
  e.target.parentElement.parentElement.parentElement.style.display = 'none';
}

var amt;

const amount=(e)=>{
  amt = e.target.value;
  console.log(amt);
}


const payForm = (event) =>{
  event.preventDefault()
  const username = event.target.parentElement.firstElementChild.innerHTML
  console.log(username);
  console.log(amt);
  fetch(`https://holidayhacks.herokuapp.com/${username}/pay/${amt}`)
  setTimeout(function() { window.location.reload() }, 1500);
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
  <span>${item.giftname.substring(0,13)}</span>
  <span>Needed: $${item.balance}</span>
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
      <h3 >Why ${item.username} need this?</h3>
      <p>${item.description}.</p>
      <span>Need: $${item.balance}</span>
      <label for="giftAmount">Enter the Amount You want to gift!</label>

      <form class="payForm">
      <h3 class="payUser">${item.username}</h3>
      <input type="number" class="giftAmount" placeholder="Enter the amount you wanna gift" onkeyup="amount(event)">
      <input type="submit" value="Gift" onclick="payForm(event)">
    </form>
  </div>
  <button class="close-cover" onclick="hideDetails(event)">X</button>
  </div>
  
  </div>
  </div>
  `;

  cards.appendChild(card_container);
  console.log('adding a new card');
}

// Triggered when web page start's loading
const showCards = () => {
  fetch('https://holidayhacks.herokuapp.com/all')
  .then(response => response.json())
  .then(data => {
    data.forEach(item => createCard(item))
    console.log(data)
  })
  .catch((e) => console.log(e));
}

// const payForm = document.querySelectorAll('.payForm');




// FORM
// const thisForm = document.getElementById('myForm');
// thisForm.addEventListener('submit', async function (e) {
//     e.preventDefault();
//     const formData = new FormData(thisForm).entries()
//     const response = await fetch('https://holidayhacks.herokuapp.com/gift', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(Object.fromEntries(formData))
//     });

//     const result = await response.json();
//     console.log(result)
// });
