(function(){
    const fileForm = document.forms.upload;

    fileForm.addEventListener('submit',(e)=>{
        if(!fileForm.checkValidity()){
            e.preventDefault();
            e.stopPropagation();
        }

        fileForm.classList.add('was-validated');
    })
})();