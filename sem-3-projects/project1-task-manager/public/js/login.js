(function(){
    const form = document.getElementById('loginForm');
    const messageEL = document.getElementById('message');

    function showMessage(text, type){
        messageEL.textContent = text;
        messageEL.className = type === 'success' ? 'message success' : 'message error';
        messageEL.style.display = 'block';
        setTimeout(() => messageEL.style.display = 'none', 3000);
    }

    form.addEventListener('submit', async function(e){
        e.preventDefault();
        const data = {
            username: form.username.value.trim(),
            password: form.password.value.trim()
        };

        if(!data.username || !data.password){
            showMessage('Please enter both username and password.', 'error');
            return;
        }

        try{
            const res = await fetch(form.action, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(data)
            });

            const body = await res.json();
            if(res.ok && body.success){
                showMessage(body.message || 'Logged in successfully.', 'success');
                setTimeout(() => {
                    if(body.redirect){
                        window.location.href = body.redirect;
                    }
                }, 1200);
            } else {
                showMessage(body.message || 'Login failed.', 'error');
            }
        } catch(err){
            showMessage('Unable to login. Please try again.', 'error');
            console.error(err);
        }
    });
})();
