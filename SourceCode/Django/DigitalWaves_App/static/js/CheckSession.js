async function CheckSession() {
    try {
        const response = await fetch('/SessionCheck/', { credentials: 'same-origin' });
        if (response.status === 401) {
            window.location.href = '/login/';
        }
    }
    catch (error) {
        window.location.href = '/login/';


    }

}
CheckSession();
