//Declare Global Variables
const studentList = document.querySelectorAll('.student-item');
const numberOfItems = 10; 

//Create Show Page Function

function showPage(list, page) {
   const startIndex = (page * numberOfItems) - numberOfItems; 
   const endIndex = page * numberOfItems; 

   for(let i = 0; i < list.length; i++) {
      if(i >= startIndex && i < endIndex) {
         list[i].style.display = 'block';
      } else {
         list[i].style.display = 'none';
      }
   }
}

// Create Append Page Links Function

function appendPageLinks(list) {
   const page = document.querySelector('.page');
   const pagination = document.createElement('div'); 
   const ul = document.createElement('ul');
   pagination.classList.add('pagination');
   page.appendChild(pagination);
   pagination.appendChild(ul);

   for(let i = 0; i <= (list.length / numberOfItems); i++) {
      ul.innerHTML += `<li><a href="#">${i}</a></li>`; 
   }

   ul.firstElementChild.firstElementChild.className = 'active';
   
   const anchor = document.querySelectorAll('.pagination a'); 
   pagination.addEventListener('click', (e) => {
      for(let i = 0; i < anchor.length; i++) {
         if(e.target === anchor[i]) {
            anchor[i].classList.add('active');
            showPage(studentList, i);
         } else {
            anchor[i].classList.remove('active');
         }
      }
      e.preventDefault();
   });
}

showPage(studentList, 1);
appendPageLinks(studentList);