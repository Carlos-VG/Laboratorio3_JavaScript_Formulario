window.onload = function() {
    const form = document.querySelector('form'); // Selecciona el primer formulario en el documento
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const comments = document.getElementById('coments');

    name.focus();

    form.onsubmit = async function(event) {
        event.preventDefault(); // Prevenir el envío tradicional del formulario

        // Validación básica
        if (!name.value.trim() || !email.value.trim() || !subject.value.trim()) {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Por favor, complete los campos obligatorios antes de enviar.'
            });
            return; // Detiene la función si la validación falla
        }

        const confirmation = await Swal.fire({
            title: '¿Está seguro que desea enviar el formulario?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, enviar!',
            cancelButtonText: 'No, cancelar'
        });

        if (confirmation.isConfirmed) {
            const formData = new FormData(form);
            fetch(form.action, {
                method: 'POST',
                body: formData
                // No establecer cabeceras 'Accept' a menos que estés seguro de la respuesta
            })
            .then(response => {
                if (response.ok) {
                    // Envío exitoso
                    Swal.fire({
                        icon: 'success',
                        title: '¡Enviado!',
                        text: 'Mensaje enviado correctamente, revise su correo, estaremos en contacto.'
                    });
                    form.reset(); // Limpia el formulario
                } else {
                    // La respuesta no fue exitosa
                    throw new Error('El servidor respondió con un error.');
                }
            })
            .catch(error => {
                // Manejo de cualquier error con la solicitud
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error al enviar el formulario. Por favor, intente nuevamente.'
                });
            });
        }
    };
};
