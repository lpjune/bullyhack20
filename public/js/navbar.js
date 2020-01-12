/* jshint esversion: 6 */
document.getElementById('logoutButton').addEventListener('click', ()=>{
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('isLoggedIn');
    // window.location
    window.location = '/login';
});


