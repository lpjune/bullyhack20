/* jshint esversion: 6 */
document.getElementById('logoutButton').addEventListener('click', ()=>{
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('isLoggedIn');
    // window.location
    window.location = '/login';
});


