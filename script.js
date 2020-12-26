let data = [
  {
    reason: '  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus beatae dolores soluta porro distinctio placeat, cupiditate voluptate earum omnis culpa deserunt sit atque veniam expedita, ea neque corporis exercitationem nesciunt maiores sed adipisci! Provident inventore voluptas ad quasi optio tempora.'
  },
  {
    reason: '  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus beatae dolores soluta porro distinctio placeat, cupiditate voluptate earum omnis culpa deserunt sit atque veniam expedita, ea neque corporis exercitationem nesciunt maiores sed adipisci! Provident inventore voluptas ad quasi optio tempora.'
  },
  {
    reason: '  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus beatae dolores soluta porro distinctio placeat, cupiditate voluptate earum omnis culpa deserunt sit atque veniam expedita, ea neque corporis exercitationem nesciunt maiores sed adipisci! Provident inventore voluptas ad quasi optio tempora.'
  },
  {
    reason: '  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus beatae dolores soluta porro distinctio placeat, cupiditate voluptate earum omnis culpa deserunt sit atque veniam expedita, ea neque corporis exercitationem nesciunt maiores sed adipisci! Provident inventore voluptas ad quasi optio tempora.'
  },
  {
    reason: '  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus beatae dolores soluta porro distinctio placeat, cupiditate voluptate earum omnis culpa deserunt sit atque veniam expedita, ea neque corporis exercitationem nesciunt maiores sed adipisci! Provident inventore voluptas ad quasi optio tempora.'
  },
  {
    reason: '  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus beatae dolores soluta porro distinctio placeat, cupiditate voluptate earum omnis culpa deserunt sit atque veniam expedita, ea neque corporis exercitationem nesciunt maiores sed adipisci! Provident inventore voluptas ad quasi optio tempora.'
  }
]

let detail_button = document.querySelector('.show-details');
let close_details = document.querySelector('.close-cover');

const showDetains = () => {
  console.log('show details');
  detail_button.parentElement.parentElement.lastElementChild.style.display = 'block';
}

const hideDetails = () => {
  console.log('hidde details')
  close_details.parentElement.parentElement.parentElement.style.display = 'none';
}
// detail_button.addEventListener('click', showDetains);