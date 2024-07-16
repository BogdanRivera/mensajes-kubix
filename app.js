let counter = 0;

function copyText(elementId, button) {

    var textElement = document.getElementById(elementId);

    // Crear un área de texto temporal
    var textArea = document.createElement("textarea");
    textArea.value = textElement.innerText;
    document.body.appendChild(textArea);

    // Seleccionar el contenido del área de texto temporal
    textArea.select();
    textArea.setSelectionRange(0, 99999); // Para dispositivos móviles

    // Copiar el contenido seleccionado al portapapeles
    document.execCommand("copy");

    document.body.removeChild(textArea);


    var originalText = button.innerText;
    button.innerText = "¡Texto copiado!";
    

    setTimeout(function() {
        button.innerText = originalText;
    }, 1000);
}

        function addElement(containerId,anotherContainerId) {
            const saltoLinea = document.createElement('br');

            counter++;

            const container = document.getElementById(containerId);
            const textos = document.getElementById(anotherContainerId); 

            const row = document.createElement('div');
            row.className = 'row d-flex';
            row.id = `row-${counter}`;

            const colDate = document.createElement('div');
            colDate.className = 'col-3 d-flex justify-content-center';
            const inputDate = document.createElement('input');
            inputDate.type = 'date';
            inputDate.value = getYesterdayDate(); // Fecha del día anterior
            inputDate.id = `date-${counter}`;
            colDate.appendChild(inputDate);

            const colTextarea = document.createElement('div');
            colTextarea.className = 'col-3 d-flex justify-content-center';
            const formFloating = document.createElement('div');
            formFloating.className = 'form-floating flex-fill';
            const textarea = document.createElement('textarea');
            textarea.className = 'form-control';
            textarea.placeholder = 'Ingresa los horarios';
            textarea.id = `textarea-${counter}`;
            const label = document.createElement('label');
            label.htmlFor = textarea.id;
            label.innerText = 'Horarios';
            formFloating.appendChild(textarea);
            formFloating.appendChild(label);
            colTextarea.appendChild(formFloating);

            const colAddButton = document.createElement('div');
            colAddButton.className = 'col-3 d-flex justify-content-center';
            const addButton = document.createElement('button');
            addButton.type = 'button';
            addButton.className = 'btn btn-success';
            addButton.innerText = 'Agregar';
            addButton.onclick = function() {
// Dentro de tu código principal
                const horarios = textarea.value.split('\n').map(h => h.trim()).filter(h => h !== '');
                const convertedHorarios = horarios.map(convertTo12HourFormat);
                let uniqueHorarios = [...new Set(convertedHorarios)];
                // Ordenar los horarios únicos
                let sortedHorarios = sortTimes(uniqueHorarios);

                textarea.value = ''; 
                let dateObtained = getFormattedDate(inputDate.value);

                const day = getDayFromDateString(inputDate.value);

               const newText = document.createElement('p'); 
               newText.innerHTML = `*${dateObtained[0]} ${day+1} de ${dateObtained[1]} de ${dateObtained[2]}: ${sortedHorarios}* <br>`
               textos.appendChild(newText);
               
            };
            colAddButton.appendChild(addButton);

            const colRemoveButton = document.createElement('div');
            colRemoveButton.className = 'col-3 d-flex justify-content-center';
            const removeButton = document.createElement('button');
            removeButton.type = 'button';
            removeButton.className = 'btn btn-danger';
            removeButton.innerText = 'Eliminar';
            removeButton.onclick = function() { 
                removeElement(row.id); 
                container.removeChild(saltoLinea);
            };
            colRemoveButton.appendChild(removeButton);

            container.appendChild(saltoLinea); 

            row.appendChild(colDate);
            row.appendChild(colTextarea);
            row.appendChild(colAddButton);
            row.appendChild(colRemoveButton);

            container.appendChild(row);
        }

        function removeElement(rowId) {
            const row = document.getElementById(rowId);
            if (row) {
                row.remove();
            }
        }

        function getYesterdayDate() {
            const today = new Date();
            today.setDate(today.getDate() - 1); // Restar un día
            return today.toISOString().split('T')[0];
        }

        function convertTo24HourFormat(time) {
            time = time.trim();
            const pmRegex = /^(1[0-2]|0?[1-9]):([0-5][0-9])\s?(?:PM|pm)$/;
            const amRegex = /^(1[0-2]|0?[1-9]):([0-5][0-9])\s?(?:AM|am)$/;
        
            if (pmRegex.test(time)) {
                let [hours, minutes] = time.match(pmRegex).slice(1);
                hours = parseInt(hours);
                if (hours !== 12) hours += 12;
                return `${hours}:${minutes}`;
            } else if (amRegex.test(time)) {
                let [hours, minutes] = time.match(amRegex).slice(1);
                hours = parseInt(hours);
                if (hours === 12) hours = 0;
                return `${hours.toString().padStart(2, '0')}:${minutes}`;
            } else {
                return time; // Asumimos que ya está en formato de 24 horas
            }
        }

        // Función para convertir de 24 horas a 12 horas
function convertTo12HourFormat(time) {
    time = time.trim();
    const hhmmRegex = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/;

    if (hhmmRegex.test(time)) {
        let [hours, minutes] = time.split(':');
        hours = parseInt(hours);
        let period = 'am';

        if (hours >= 12) {
            period = 'pm';
            if (hours > 12) {
                hours -= 12;
            }
        } else if (hours === 0) {
            hours = 12;
        }

        return `${hours}:${minutes} ${period}`;
    }

    return time; // Si ya está en formato de 12 horas, devolver tal cual
}

// Función para ordenar los horarios
function sortTimes(times) {
    const timesIn24HourFormat = times.map(convertTo24HourFormat);
    timesIn24HourFormat.sort();
    return timesIn24HourFormat.map(convertTo12HourFormat);
}

        function getFormattedDate(dateString) {
            const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado','Domingo'];
            const monthsOfYear = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

            const date = new Date(dateString);
            const dayOfWeek = daysOfWeek[date.getDay()];
            const month = monthsOfYear[date.getMonth()];
            const year = date.getFullYear();

            return [dayOfWeek, month, year];
        }

        // Función para obtener solo el día de inputDate.value
    function getDayFromDateString(dateString) {
    const date = new Date(dateString);
    return date.getDate();
    }

    function copyAllText(mensaje1,contenedorId,mensaje2, button) {
        const parrafos = obtenerParrafos(contenedorId);
        const mensaje1Element = document.getElementById(mensaje1);
        const mensaje2Element = document.getElementById(mensaje2);
        let textoACopiar = '';

        if (mensaje1Element) {
            textoACopiar += mensaje1Element.textContent + "\n";
          }
        
          for (const parrafo of parrafos) {
            textoACopiar += parrafo.innerText + '\n';
          }
        
          if (mensaje2Element) {
            textoACopiar += mensaje2Element.textContent;
          }
            // Crear un área de texto temporal
        var textArea = document.createElement("textarea");
        textArea.value = textoACopiar;
        document.body.appendChild(textArea);

        // Seleccionar el contenido del área de texto temporal
        textArea.select();
        textArea.setSelectionRange(0, 99999); // Para dispositivos móviles

        // Copiar el contenido seleccionado al portapapeles
        document.execCommand("copy");

        document.body.removeChild(textArea);

            var originalText = button.innerText;
    button.innerText = "¡Texto copiado!";
    

    setTimeout(function() {
        button.innerText = originalText;
    }, 1000);
    
    }
    

    function obtenerParrafos(contenedorId) {
        const contenedor = document.getElementById(contenedorId);
        return contenedor.querySelectorAll('p');
      }

      function cleanElements(containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = ''; // Limpia todo el contenido del elemento
    }

    function generarHorario(mensajeId,fechaId,horaId){
        let parrafo = document.getElementById(mensajeId); 
        const fecha = document.getElementById(fechaId).value;
        const tiempo24Hours = document.getElementById(horaId).value;
        let tiempo = convertTo12HourFormat(tiempo24Hours);
        let dateObtained = getFormattedDate(fecha);
        let day = getDayFromDateString(fecha);

        
            // Condición para ajustar el texto si la hora es "01:00 PM"
        let horaTexto = `a las *${tiempo}*`;
        if (tiempo.startsWith("01")) {
        horaTexto = `a la *${tiempo}*`;
        }
        
        let addText  = `
        🗓 *Fecha y Hora:* <br>
        Su clase está programada para el día *${dateObtained[0]} ${day+1} de ${dateObtained[1]}* ${horaTexto}, hora de la Cd. de México. ¡Esperamos que sea un momento lleno de aprendizaje!<br><br>
    
        La clase se llevará a cabo por medio de la *aplicación Zoom*. Le enviaremos el link el día de su clase.<br><br>
    
        Es importante que *un adulto acompañe al alumno* para brindarle las ofertas que tenemos disponibles.<br><br>
    
        ⏰ *Confirmación Importante*:<br>
        La clase está diseñada exclusivamente para ustedes, por lo que pedimos su amable confirmación *el día de su clase* antes de las 12:00 pm. En caso contrario, la clase se cancelará para liberar ese espacio para otras oportunidades educativas.<br>
    
        Recomendamos entrar 2 minutos antes para poder brindar apoyo técnico en caso de ser necesario y comenzar puntualmente su clase, ya que la tolerancia es de 20 minutos.<br><br>
    
        Le enviamos un video informativo.
        `;
    
        parrafo.innerHTML = addText;

    }

    function generarLlamada(inputId,horaId,mensajeId){
        const diaLlamada = document.getElementById(inputId).value;
        const tiempo24Hours = document.getElementById(horaId).value;
        let mensaje = document.getElementById(mensajeId); 
        let tiempo = convertTo12HourFormat(tiempo24Hours);
        let addText = `
        Perfecto, su llamada queda agendada para el día de *${diaLlamada}* a las *${tiempo}*, hora de la Ciudad de México. ¿Con quién tengo el gusto?
        `
        mensaje.innerText = addText; 
    }

    async function copyImage(idImagen) {
        try {
            const imgElement = document.getElementById(idImagen);
            const imgSrc = imgElement.src;
    
            // Wait for image to load
            const img = new Image();
            img.crossOrigin = 'anonymous'; // If the image is from another domain
            img.src = imgSrc;
    
            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
            });
    
            // Draw the image on the canvas
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
    
            // Convert canvas to blob
            canvas.toBlob(async (blob) => {
                const item = new ClipboardItem({ 'image/png': blob });
                await navigator.clipboard.write([item]);
                console.log('La imagen ha sido copiada al portapapeles.');
            }, 'image/png');
        } catch (err) {
            console.error('Error al copiar la imagen al portapapeles:', err);
            console.log('Hubo un error al copiar la imagen.');
        }
    }

    function generarMensajeHorario(horaId,mensajeId){
        let hora24hours = document.getElementById(horaId).value;
        let mensajeParrafo = document.getElementById(mensajeId);

        let tiempo = convertTo12HourFormat(hora24hours);

        let addText = `
        Las sesiones se realizan por medio de la plataforma “Zoom”. Se le enviará la liga correspondiente el día programado para sus sesiones. 

        🔷 Día: *lunes a viernes* 
        🔺 Hora: *${tiempo}* hora de la Cd. de México.
        `
        mensajeParrafo.innerText = addText;
    }

    function generarMensaje() {
        const promo = document.getElementById('promo').value;
        const nopromo = document.getElementById('nopromo').value;
        const ajuste = document.getElementById('ajuste').value;
        
        const today = new Date();
        const diaHoy = today.getDate();
        const mesActual = today.toLocaleString('default', { month: 'long' });
        const siguienteMes = new Date(today.getFullYear(), today.getMonth() + 1, 1).toLocaleString('default', { month: 'long' });
    
        const ultimoDiaMes = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
        const diaLimite = diaHoy < 15 ? 15 : ultimoDiaMes;
    
        const mensaje = `
    Costos generales (clases + plataforma):
    
    Le comparto el detalle de su pago para realizarlo el día de hoy ${diaHoy} de ${mesActual}:
    
    Diferencia de ${mesActual}: $${ajuste}
    Siguiente pago el 1 de ${siguienteMes}: $${promo}
    
    A partir de mañana hasta el ${diaLimite} de ${mesActual} su pago sería por: $${nopromo}
        `;
    
        document.getElementById('mensaje-1-inf').innerText = mensaje;
    }

    function generaDiasAcordados(diasId, horaId, mensajeId) {
        const diasAcordados = document.getElementById(diasId).value; 
        const hora24hours = document.getElementById(horaId).value;
        const mensajeParrafo = document.getElementById(mensajeId);
    
        const tiempo = convertTo12HourFormat(hora24hours);
    
        const addText = `
    El grupo acordado con disponibilidad es: *${diasAcordados} a las ${tiempo}* 
        `;
        mensajeParrafo.innerText = addText;
    }

    function getCurrentMonth() {
        const today = new Date();
        return today.toLocaleString('default', { month: 'long' }).toUpperCase();
    }

    function generarMensajeLigas() {
        const dias = document.getElementById('diasLigas').value;
        const hora24hours = document.getElementById('horaLigas').value;
        const profesor = document.getElementById('profesor').value;
        const id = document.getElementById('id').value;
        const link = document.getElementById('link').value;
    
        const mesActual = getCurrentMonth();
        const hora = convertTo12HourFormat(hora24hours);
    
        const mensaje = `
    *🔹 CLASES DE ${mesActual}🔹*
    
    *DÍAS:* ${dias}
    *HORA:* ${hora} 
    *PROFESOR(A):* ${profesor}
    *ID:* ${id}
    
    ${link}
    
    🔺🔹🔺🔹🔺🔹🔺🔹🔺🔹
        `;
    
        document.getElementById('mensaje-7-inf').innerText = mensaje.trim();
    }

    function generarMensajePlataforma(){
        const estudiante = document.getElementById('estudiante').value;
        const nivel = document.getElementById('nivel').value;
        const usuario = document.getElementById('usuario').value;
        const contrasena = document.getElementById('contrasena').value;
    
        const mensaje = `
    Le enviamos de igual manera su acceso a la plataforma: 
    🧩 *PLATAFORMA DIGITAL* 🧩
    Le compartimos los datos para ingresar a su plataforma digital
    https://matemagica.app/moodle/ 
    *ESTUDIANTE*: ${estudiante}
    *NIVEL*: ${nivel}
    *USUARIO*: ${usuario}
    *CONTRASEÑA*: ${contrasena}
    🧩 🧩 🧩 🧩 🧩
        `;
    
        document.getElementById('mensaje-8-inf').innerText = mensaje.trim();
    }
    
    
    
    

 
      

   