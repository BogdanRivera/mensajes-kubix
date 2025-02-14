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

function generaHorariosCM(horariosObtenidosId, fechaInputId, horasAreaId) {
    const textos = document.getElementById(horariosObtenidosId);
    const inputDate = document.getElementById(fechaInputId); 
    const textarea = document.getElementById(horasAreaId);

    const horarios = textarea.value.split('\n').map(h => h.trim()).filter(h => h !== '');
    const convertedHorarios = horarios.map(convertTo12HourFormat);
    let uniqueHorarios = [...new Set(convertedHorarios)];
    let sortedHorarios = sortTimes(uniqueHorarios);

    textarea.value = ''; 

    const dateValue = inputDate.value;
    const date = new Date(dateValue + 'T00:00:00');
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    let formattedDate = date.toLocaleDateString('es-ES', options);

    // Capitaliza cada palabra en la fecha formateada
    formattedDate = formattedDate.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    const newText = document.createElement('p'); 
    newText.innerHTML = `*<span style="font-weight: bold;">${formattedDate}</span>*: ${sortedHorarios.join(', ')} <br>`;
    textos.appendChild(newText);
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

    function generarHorario(mensajeId, fechaId, horaId) {
        let parrafo = document.getElementById(mensajeId); 
        const fecha = document.getElementById(fechaId).value;
        const tiempo24Hours = document.getElementById(horaId).value;
        let tiempo = convertTo12HourFormat(tiempo24Hours);
        
        const date = new Date(fecha + 'T00:00:00');
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        let formattedDate = date.toLocaleDateString('es-ES', options);
        formattedDate = capitalizeEachWord(formattedDate);

        // Condición para ajustar el texto si la hora es "1:xx PM"
        let horaTexto = `a las *${tiempo}*`;
        if (tiempo.startsWith("1:")) {
            horaTexto = `a la *${tiempo}*`;
        }
        
        let addText  = `
        🗓 *Fecha y Hora:* <br>
        Su clase está programada para el día *${formattedDate}* ${horaTexto}, hora de la Cd. de México. ¡Esperamos que sea un momento lleno de aprendizaje!<br><br>
    
        La clase se llevará a cabo por medio de la *aplicación Zoom*. Le enviaremos el link el día de su clase.<br><br>
    
        Es importante que *un adulto acompañe al alumno* para brindarle las ofertas que tenemos disponibles.<br><br>
    
        ⏰ *Confirmación Importante*:<br>
        La clase está diseñada exclusivamente para ustedes, por lo que pedimos su amable confirmación *el día de su clase* antes de las 12:00 pm. En caso contrario, la clase se cancelará para liberar ese espacio para otras oportunidades educativas.<br><br>
    
        Recomendamos entrar 2 minutos antes para poder brindar apoyo técnico en caso de ser necesario y comenzar puntualmente su clase, ya que la tolerancia es de 20 minutos.<br><br>
    
        Le enviamos un video informativo.
        `;
    
        parrafo.innerHTML = addText;
        //Se agregó esta linea de código
        //Se volvió a agregar una nueva línea
    }

    function generarHorarioWA(mensajeId, fechaId, horaId) {
        let parrafo = document.getElementById(mensajeId); 
        const fecha = document.getElementById(fechaId).value;
        const tiempo24Hours = document.getElementById(horaId).value;
        let tiempo = convertTo12HourFormat(tiempo24Hours);
        
        const date = new Date(fecha + 'T00:00:00');
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        let formattedDate = date.toLocaleDateString('es-ES', options);
        formattedDate = capitalizeEachWord(formattedDate);

        // Condición para ajustar el texto si la hora es "1:xx PM"
        let horaTexto = `a las *${tiempo}*`;
        if (tiempo.startsWith("1:")) {
            horaTexto = `a la *${tiempo}*`;
        }
        
        let addText  = `
        🗓 *Fecha y Hora:* <br>
        Su clase está programada para el día *${formattedDate}* ${horaTexto} (hora de la Cd. de México) a través de Zoom. Le enviaremos el enlace el día de la clase.<br><br>
    
        👨‍🏫 _Importante:_ <br>
        *Un adulto debe acompañar al alumno*, ya que al final de la clase hablaremos con usted.<br><br>

    
        ⏰ _Confirmación:_<br>
        Por favor, confirme *antes de las 12:00 pm del día de la clase.* Si no recibimos su confirmación, la clase se cancelará. La tolerancia es de *20 minutos,* así que agradecemos mucho su puntualidad.
        <br><br>
        Le enviamos un video informativo.

        `;
    
        parrafo.innerHTML = addText;
        //Se agregó esta linea de código
        //Se volvió a agregar una nueva línea
    }

    function generarHorarioFB(mensajeId, fechaId, horaId) {
        let parrafo = document.getElementById(mensajeId); 
        const fecha = document.getElementById(fechaId).value;
        const tiempo24Hours = document.getElementById(horaId).value;
        let tiempo = convertTo12HourFormat(tiempo24Hours);
        
        const date = new Date(fecha + 'T00:00:00');
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        let formattedDate = date.toLocaleDateString('es-ES', options);
        formattedDate = capitalizeEachWord(formattedDate);

        // Condición para ajustar el texto si la hora es "1:xx PM"
        let horaTexto = `a las *<span style="font-weight: bold;">${tiempo}* </span>`;
        if (tiempo.startsWith("1:")) {
            horaTexto = `a la *<span style="font-weight: bold;">${tiempo}* </span>`;
        }
        
        let addText  = `
        🗓 𝐹𝑒𝑐ℎ𝑎 𝑦 𝐻𝑜𝑟𝑎 : <br>
        Su clase está programada para el día *<span style="font-weight: bold;">${formattedDate}</span>* ${horaTexto} (hora de la Cd. de México) a través de 𝐙𝐨𝐨𝐦. Le enviaremos el enlace el día de la clase.<br><br>
    
        👨‍🏫 𝐼𝑚𝑝𝑜𝑟𝑡𝑎𝑛𝑡𝑒: <br>
        𝐔𝐧 𝐚𝐝𝐮𝐥𝐭𝐨 𝐝𝐞𝐛𝐞 𝐚𝐜𝐨𝐦𝐩𝐚𝐧̃𝐚𝐫 𝐚𝐥 𝐚𝐥𝐮𝐦𝐧𝐨, ya que al final de la clase hablaremos con usted.<br><br>

    
        ⏰ 𝐶𝑜𝑛𝑓𝑖𝑟𝑚𝑎𝑐𝑖𝑜́𝑛:<br>
        Por favor, confirme 𝐚𝐧𝐭𝐞𝐬 𝐝𝐞 𝐥𝐚𝐬 𝟏𝟐:𝟎𝟎 𝐩𝐦 𝐝𝐞𝐥 𝐝𝐢́𝐚 𝐝𝐞 𝐥𝐚 𝐜𝐥𝐚𝐬𝐞. Si no recibimos su confirmación, la clase se cancelará. La tolerancia es de 𝟐𝟎 𝐦𝐢𝐧𝐮𝐭𝐨𝐬, así que agradecemos mucho su puntualidad.
        <br><br>
        Le enviamos un video informativo.

        `;
    
        parrafo.innerHTML = addText;
        //Se agregó esta linea de código
        //Se volvió a agregar una nueva línea
    }

    function capitalizeEachWord(str) {
        return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }


    function generarLlamada(inputId,horaId,mensajeId){
        const diaLlamada = document.getElementById(inputId).value.trim();
        const tiempo24Hours = document.getElementById(horaId).value;
        let mensaje = document.getElementById(mensajeId); 
        let tiempo = convertTo12HourFormat(tiempo24Hours);

            // Condición para ajustar el texto si la hora es "1:xx PM"
        let horaTexto = `a las *${tiempo}*`;
        if (tiempo.startsWith("1:")) {
            horaTexto = `a la *${tiempo}*`;
        }

        let addText = `
        Perfecto, su llamada queda agendada para el día de *${diaLlamada}* ${horaTexto}, hora de la Ciudad de México. ¿Con quién tengo el gusto?
        `
        mensaje.innerText = addText; 
    }

    async function copyImage(idImagen) {
        try {
            const imgElement = document.getElementById(idImagen);
            const imgSrc = imgElement.src;
    
            // Crear una nueva imagen para cargar la fuente
            const img = new Image();
            img.crossOrigin = 'anonymous'; // Si la imagen es de otro dominio
            img.src = imgSrc;
    
            // Esperar a que la imagen se cargue completamente
            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
            });
    
            // Dibujar la imagen en el canvas
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
    
            // Convertir el canvas a un blob y copiarlo al portapapeles
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
        const promo = parseFloat(document.getElementById('promo').value); // Convertir a flotante
        // const nopromo = document.getElementById('nopromo').value;
        const selectedDates = document.getElementById('datePicker').value

        
        const today = new Date();
        const diaHoy = today.getDate();
        const mesActual = today.toLocaleString('default', { month: 'long' });
        const siguienteMes = new Date(today.getFullYear(), today.getMonth() + 1, 1).toLocaleString('default', { month: 'long' });
    
        const ultimoDiaMes = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

        let mensajeFechaLimite = '';
    
        // Determinar el día límite y el mensaje basado en la condición del día actual
        if (diaHoy <= 15) {
            mensajeFechaLimite = `A partir del día 16 de ${mesActual} su pago sería por: $3850.00`;
        } else {
            mensajeFechaLimite = `A partir del día 1 de ${siguienteMes} su pago sería por: $3850.00`;
        }
    
        const mensaje = `
    Costos generales (clases + plataforma):
    
    Le comparto el detalle de su pago para realizarlo el día de hoy ${diaHoy} de ${mesActual}:
    
    Diferencia de ${mesActual}: $${((promo/8)*selectedDates).toFixed(2)}
    Siguiente pago el 1 de ${siguienteMes}: $${promo.toFixed(2)}
    
    ${mensajeFechaLimite}
        `;
    
        document.getElementById('mensaje-1-inf').innerText = mensaje;
    }

    function generarMensajeWA4(){
        const fecha = new Date();
    const dia = fecha.getDate();
    const mes = fecha.toLocaleString('es-MX', { month: 'long' });
    const anio = fecha.getFullYear();
    let rangoPromocion;

    if (dia <= 15) {
        rangoPromocion = `<span style="font-weight: bold;">Del *1 al 15 de ${mes}*,</span>`;
      } else {
        const ultimoDia = new Date(anio, fecha.getMonth() + 1, 0).getDate();
        rangoPromocion = `<span style="font-weight: bold;">Del *16 al ${ultimoDia} de ${mes}*,</span>`;
      }    

    const mensaje = `
      💰 Costos regulares de nuestras clases: <br>
      • Mensualidad: *$1,500* <br>
      • Inscripción: *$800* <br>
      • Plataforma: *$1,500* <br>
      • Material imprimible: *$50* <br><br>
      
      📢 *¡PROMOCIÓN ESPECIAL!* 📢 <br><br>
      
      ${rangoPromocion} aprovecha nuestras clases por solo *$1,200 al mes* y *ahorra más de $3,000* obteniendo un *descuento del 100%* en inscripción, plataforma y material. 🚀
    `;

    document.getElementById('mensaje-4-wa').innerHTML = mensaje;

    }

    function generarMensajeFB4() {
        const fecha = new Date();
        const dia = fecha.getDate();
        const mes = fecha.toLocaleString('es-MX', { month: 'long' });
        const anio = fecha.getFullYear();
        let rangoPromocion;
      
        if (dia <= 15) {
          rangoPromocion = `Del <span style="font-weight: bold;"> *1 al 15 de ${mes}*,</span>`;
        } else {
          const ultimoDia = new Date(anio, fecha.getMonth() + 1, 0).getDate();
          rangoPromocion = `Del <span style="font-weight: bold;"> *16 al ${ultimoDia} de ${mes}*,</span>`;
        }
      
        const mensaje = `
          💰 Costos regulares de nuestras clases: <br>
          • Mensualidad: $1,500 <br>
          • Inscripción: $800 <br>
          • Plataforma: $1,500 <br>
          • Material imprimible: $50</span> <br><br>
          
          📢 <span style="font-weight: bold;">📢 ¡𝐏𝐑𝐎𝐌𝐎𝐂𝐈𝐎́𝐍 𝐄𝐒𝐏𝐄𝐂𝐈𝐀𝐋! </span> 📢 <br><br>
          
          ${rangoPromocion} aprovecha nuestras clases por solo $𝟏,𝟐𝟎𝟎 𝐚𝐥 𝐦𝐞𝐬 y <span style="font-weight: bold;">𝐚𝐡𝐨𝐫𝐫𝐚 𝐦𝐚́𝐬 𝐝𝐞 $𝟑,𝟎𝟎𝟎</span> obteniendo un <span style="font-weight: bold;">𝐝𝐞𝐬𝐜𝐮𝐞𝐧𝐭𝐨 𝐝𝐞𝐥 𝟏𝟎𝟎%</span> en inscripción, plataforma y material. 🚀
        `;
      
        document.getElementById('mensaje-4-fb').innerHTML = mensaje;
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
        const link = document.getElementById('link').value;
        
    
        const mesActual = getCurrentMonth();
        const hora = convertTo12HourFormat(hora24hours);

        const id = link.split('/').pop().replace('j/', '').slice(-11);
        const formattedId = `${id.slice(0, 3)} ${id.slice(3, 7)} ${id.slice(7)}`;
    
        const mensaje = `
    *🔹 CLASES DE ${mesActual}🔹*
    
    *DÍAS:* ${dias}
    *HORA:* ${hora} 
    *PROFESOR(A):* ${profesor}
    *ID:* ${formattedId}
    
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
    
function generaTarea(opcionesProfesoresId,tareasAreaId,contenedorId){
    const profesores = ['Bogdan','Ulises']; 
    const opcionProfesor = document.getElementById(opcionesProfesoresId).value; 
    const tareasArea = document.getElementById(tareasAreaId).value; 
    const contenedor = document.getElementById(contenedorId); 
    let texto = ""; 
    let frase = ""; 
    if(profesores.includes(opcionProfesor)){
        frase = `El profesor ${opcionProfesor} les envía la tarea del día de hoy:\n\n`; 
    }else{
        frase = `La profesora ${opcionProfesor} les envía la tarea del día de hoy:\n\n`;
    }

    texto += frase; 
    texto += tareasArea; 
    texto += "\n\n¡Excelente día!";
    contenedor.innerText = texto; 
    
}

function generaPromocion() {
    const costoConPromocion = document.getElementById('costoConPromocion').value;
    const costoSinPromocion = document.getElementById('costoSinPromocion').value;
    const fechaActual = new Date();
    const diaActual = fechaActual.getDate();
    const mesActual = fechaActual.toLocaleString('default', { month: 'long' });
    const anioActual = fechaActual.getFullYear();
    const ultimoDiaMes = new Date(anioActual, fechaActual.getMonth() + 1, 0).getDate();
    let dia1, diaFinal, diaPromo, mesPromo;
    
    if (diaActual < 15) {
        dia1 = 1;
        diaFinal = 15;
        diaPromo = 16;
        mesPromo = mesActual;
    } else {
        dia1 = 15;
        diaFinal = ultimoDiaMes;
        diaPromo = 1;
        mesPromo = fechaActual.getMonth() === 11 ? new Date(anioActual + 1, 0).toLocaleString('default', { month: 'long' }) : new Date(anioActual, fechaActual.getMonth() + 1).toLocaleString('default', { month: 'long' });
    }
    
    const mensajePromocion = `
    *CLASES GRUPALES DE MATEMÁTICAS EN LÍNEA*
    
    🔺 Clases grupales 2 veces por semana.
    🔺 Grupos pequeños, máximo 8 estudiantes  
    🔺 Plataforma digital incluida
    🔺 Material para imprimir incluido
    
    *PROMOCIÓN DEL ${dia1} AL ${diaFinal} DE ${mesActual.toUpperCase()}*
    
    *✨ TODO INCLUIDO por sólo $${costoConPromocion} al mes ✨*
    
    A partir del ${diaPromo} de ${mesPromo} la mensualidad sería de $${costoSinPromocion}
    `;

    document.getElementById('mensaje-c4').innerText = mensajePromocion;
}

function generaLigaCM() {
    const fecha = document.getElementById('fecha-agendacm').value;
    const hora = convertTo12HourFormat(document.getElementById('tiempo-agendacm').value);
    const profesor = document.getElementById('profesorCM').value;
    const liga = document.getElementById('clasecmliga').value;

    // Descomponer la fecha en año, mes y día
    const [anio, mes, dia] = fecha.split('-').map(Number);

    // Crear el objeto Date con los componentes de la fecha
    const fechaObj = new Date(anio, mes - 1, dia);

    const mesNombre = fechaObj.toLocaleString('default', { month: 'long' });
    const id = liga.split('/').pop().replace('j/', '').slice(-11);
    const formattedId = `${id.slice(0, 3)} ${id.slice(3, 7)} ${id.slice(7)}`;

    const mensaje = `
*KUBIX MATEMÁTICAS*

*HORA:* ${hora}, hora de la ciudad de México.
*FECHA:* ${dia} de ${mesNombre} de ${anio}
*PROFESORA:* ${profesor}
*ID:* ${formattedId}

${liga}

🔺🔹🔺🔹🔺🔹🔺🔹🔺🔹
    `;

    document.getElementById('ligacm').innerText = mensaje;
}

/***** Modificado 27 septiembre 2024 */

function generarHorariopf(mensajeId, fechaId, horaId) {
    let parrafo = document.getElementById(mensajeId); 
    const fecha = document.getElementById(fechaId).value;
    const tiempo24Hours = document.getElementById(horaId).value;
    let tiempo = convertTo12HourFormat(tiempo24Hours);
    
    const date = new Date(fecha + 'T00:00:00');
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    let formattedDate = date.toLocaleDateString('es-ES', options);
    formattedDate = capitalizeEachWord(formattedDate);

    // Condición para ajustar el texto si la hora es "1:xx PM"
    let horaTexto = `a las *${tiempo}*`;
    if (tiempo.startsWith("1:")) {
        horaTexto = `a la *${tiempo}*`;
    }
    
    let addText  = `
    *🐾 🔊 PLATAFORMA 🐾*<br />
    La utilización de la plataforma se presenta como un recurso complementario fundamental para enriquecer y consolidar las actividades académicas, lo que le da el valor significativo 
    a esta herramienta para promover un aprendizaje continuo y efectivo. <br />
    Por consiguiente, se le agradece de antemano su colaboración para facilitar esta dinámica en casa. <br /> 
    Se proporcionará su respectivo nombre de usuario y contraseña para acceder a la plataforma. <br />
    Con el propósito de darle las bases e instruirle sobre el ingreso y la navegación en su plataforma, estamos programando una clase especial para 
    el día *${formattedDate}* ${horaTexto}, hora centro. <br/><br/>
    
    🐾 Quedamos en espera de su confirmación.🐾
    `;

    parrafo.innerHTML = addText;
}
    
    
    

 
      

   
