
const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    dni: /^.{7,8}$/, // 7 a 8 dígitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/ // 7 a 14 números.
};

const campos = {
    nombre: false,
    apellido: false,
    dni: false,
    correo: false,
    telefono: false
};

const validarCampo = (expresion, input, campo) => {
    const grupoCampo = document.getElementById(`grupo__${campo}`);
    const iconoCampo = document.querySelector(`#grupo__${campo} i`);
    const mensajeError = document.querySelector(`#grupo__${campo} .formulario__input-error`);

    if (expresion.test(input.value)) {
        grupoCampo.classList.remove('formulario__grupo-incorrecto');
        grupoCampo.classList.add('formulario__grupo-correcto');
        iconoCampo.classList.remove('fa-times-circle');
        iconoCampo.classList.add('fa-check-circle');
        mensajeError.classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else {
        grupoCampo.classList.add('formulario__grupo-incorrecto');
        grupoCampo.classList.remove('formulario__grupo-correcto');
        iconoCampo.classList.add('fa-times-circle');
        iconoCampo.classList.remove('fa-check-circle');
        mensajeError.classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
};

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
            break;
        case "apellido":
            validarCampo(expresiones.apellido, e.target, 'apellido');
            break;
        case "dni":
            validarCampo(expresiones.dni, e.target, 'dni');
            break;
        case "correo":
            validarCampo(expresiones.correo, e.target, 'correo');
            break;
        case "telefono":
            validarCampo(expresiones.telefono, e.target, 'telefono');
            break;
    }
      
};




const inputs = document.querySelectorAll('#formulario input');
inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

const formulario = document.getElementById('formulario');
formulario.addEventListener('submit', (e) => {
    if (!validarDatos()) {
        e.preventDefault(); // Evita que el formulario se envíe si hay errores de validación
    }

    const mensajeError = document.getElementById('campos');

    if (Object.values(campos).every((campo) => campo)) {
        formulario.reset();
        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
        setTimeout(() => {
            document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
        }, 5000);
    } else {
        mensajeError.textContent = "Por favor complete correctamente todos los campos.";
        mensajeError.style.color = "red";
    }  
    // Si todos los campos son válidos, se puede enviar el formulario
    // return true;
});

