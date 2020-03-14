//Declare Global Variables
const studentList = document.querySelectorAll('.student-item');
const numberOfItems = 10; 

//Create Show Page Function
const showPage = (list, page) => {
   const startIndex = (page * numberOfItems) - numberOfItems; 
   const endIndex = page * numberOfItems; 

   for(let i = 0; i < list.length; i++) {
      if(i >= startIndex && i < endIndex) {
         list[i].style.display = '';
      } else {
         list[i].style.display = 'none';
      }
   }
}

// Create Append Page Links Function
const appendPageLinks = list => {
   const page = document.querySelector('.page');
   const pagination = document.createElement('div'); 
   const ul = document.createElement('ul');
   pagination.classList.add('pagination');
   page.appendChild(pagination);
   pagination.appendChild(ul);

   for(let i = 1; i < (list.length / numberOfItems + 1); i++) {
      ul.innerHTML += `<li><a href="#">${i}</a></li>`; 
   }

   ul.firstElementChild.firstElementChild.className = 'active';
   
   const anchor = document.querySelectorAll('.pagination a'); 
   pagination.addEventListener('click', (e) => {

      for(let i = 0; i < anchor.length; i++) {
         if(e.target !== anchor[i]) {
            anchor[i].classList.remove('active');
         }      
      }

      e.target.classList.add('active');

      showPage(studentList, e.target.textContent);

      e.preventDefault();
   });
}

// Dynamically Insert Search Menu 
const pageHeader = document.querySelector('.page-header'); 
const studentSearchDiv = document.createElement('div'); 
studentSearchDiv.className = 'student-search'; 
studentSearchDiv.innerHTML = `<input placeholder="Search for students..."><button>Search</button>`; 
pageHeader.appendChild(studentSearchDiv);

// Add Search Functionality to Search Bar
const searchInput = document.querySelector('.student-search input'); 
const searchButton = document.querySelector('.student-search button'); 
const names = document.querySelectorAll('.student-details h3');

let paginationResults = []; 

const search = (searchInput, names) => {

   paginationResults = [];

   for(let i = 0; i < names.length; i++) {
      let name = names[i].parentElement.parentElement;
      name.style.display = 'none';
      name.classList.remove('watch'); 

      if(searchInput.value !== 0 && names[i].textContent.toLowerCase().includes(searchInput.value.toLowerCase())) {
         name.style.display = 'block';
         name.classList.add('watch'); 

         paginationResults.push(name);

      }

      if(searchInput.value === '') {
         name.style.display = 'block';
         name.classList.add('watch'); 
      } 

   }

console.log(paginationResults);

}

searchInput.addEventListener('keyup', () => {
   search(searchInput, names);
});

searchButton.addEventListener('click', (e) => {
   search(searchInput, names);
   e.preventDefault();
});

showPage(studentList, 1);
appendPageLinks(studentList);



