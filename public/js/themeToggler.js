function selectTheme(checkState)
{
    if (checkState)
        window.localStorage.setItem("theme", "dark");
    else
        window.localStorage.setItem("theme", "light");

    document.getElementById("dark-theme").disabled = !checkState;
    document.getElementById("light-theme").disabled = checkState;
}