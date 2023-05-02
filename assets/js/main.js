/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle', 'nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active')
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
    //     reset: true
});

sr.reveal('.home__data, .about__img, .resume__subtitle, .resume__text', {});
sr.reveal('.home__img, .about__subtitle, .about__text, .resume__img', { delay: 400 });
sr.reveal('.home__social-icon', { interval: 200 });
sr.reveal('.resume__company,.resume__workcontent, .courses__info, .contact__input', { interval: 200 });

/*==================== SEARCH BAR FUNCTION FOR COURSE ====================*/

const searchBar = document.getElementById("searchBar");
const courseNames = document.querySelectorAll(".course__name");

searchBar.addEventListener("keyup", function (event) {
    const searchValue = event.target.value.toLowerCase();

    courseNames.forEach(function (name) {
        const text = name.textContent.toLowerCase();

        if (text.includes(searchValue)) {
            name.parentElement.style.display = "table-row";
        } else {
            name.parentElement.style.display = "none";
        }
    });
});

/*==================== FILTER FUNCTION FOR COURSE LEVEL ====================*/

const allCourses = document.querySelectorAll('.courses__info tr'); // Select all table rows

// Select filter buttons
const allBtn = document.querySelector('#all');
const lv1Btn = document.querySelector('#lv1');
const lv2Btn = document.querySelector('#lv2');

// Add click event listeners to buttons
allBtn.addEventListener('click', () => filterCourses('all'));
lv1Btn.addEventListener('click', () => filterCourses('1'));
lv2Btn.addEventListener('click', () => filterCourses('2'));

// Function that filters courses by level
function filterCourses(level) {
    for (let i = 1; i < allCourses.length; i++) {
        // Select course level cell of current row
        const courseLevel = allCourses[i].querySelectorAll('td')[1].textContent;

        if (level === 'all') {
            // Show all courses if 'All' button is clicked
            allCourses[i].style.display = '';
        } else if (courseLevel.includes(level)) {
            // Show only courses with selected level
            allCourses[i].style.display = '';
        } else {
            // Hide courses that don't have selected level
            allCourses[i].style.display = 'none';
        }
    }
}

/*==================== SORT FUNCTION FOR COURSE LEVEL ====================*/
const lvBtn = document.querySelector('#lv');
lvBtn.addEventListener('click', () => sortTable(1));

function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("courses__info");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc";
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /*check if the two rows should switch place,
            based on the direction, asc or desc:*/
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            //Each time a switch is done, increase this count by 1:
            switchcount++;
        } else {
            /*If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again.*/
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}