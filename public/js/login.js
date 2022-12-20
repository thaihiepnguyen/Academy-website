const pass_field = document.querySelector('.pass-key');
const showBtn = document.querySelector('.show');
showBtn.addEventListener('click', function(){
    if(pass_field.type === "password"){
        pass_field.type = "text";
        showBtn.innerHTML = "<i class=\"fa fa-eye-slash is-large\" aria-hidden=\"true\"></i>";
        showBtn.style.color = "#3498db";
    }else{
        pass_field.type = "password";
        showBtn.innerHTML = "<i class=\"fa fa-eye is-large\" aria-hidden=\"true\"></i>";
        showBtn.style.color = "#222";
    }
});