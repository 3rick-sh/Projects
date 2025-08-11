let show = document.querySelector('.show');

let increment = 0;

document.addEventListener('click', e => {
    //Aumentar y decrementar valor 

    if (e.target.matches('.increase')) {
        increment++;
        show.innerHTML = increment;
    } else if (e.target.matches('.decrease')) {
        increment--;
        show.innerHTML = increment;
    } else if (e.target.matches('.reset')) {
        increment = 0;
        show.innerHTML = increment; 
    }
})