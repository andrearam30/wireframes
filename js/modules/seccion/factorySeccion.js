app.factory("factorySeccion", () => {

    const CADENA_VACIA = new RegExp('^[\\s.\\-_]*$')
    const CARACTERES_ESPECIALES = new RegExp('[^A-Za-z0-9 ]')
    const NOMBRE_SECCION_MAX = 100


    let methods = {
        validarCampo: () => {
            return "Hola";
        },
        validarNombreSeccion: (nombre) => {
            if (CADENA_VACIA.test(nombre)) return "Campo obligatorio."
            if (NOMBRE_SECCION.test(nombre)) return "Ingresa valores válidos"
            if (nombre.length > NOMBRE_SECCION_MAX) return `Has excedido el máximo número de caracteres`
            return null
        },
        validarDescripcion: (descripcion) => {
            if (descripcion == "" || descripcion == undefined) return "Campo obligatorio."
            return null
        },
        validarPregunta: (pregunta) => {
            if (pregunta == undefined || pregunta == null) return "Pregunta inválida"
            if (pregunta.estado != 1) return "No puedes agregar una pregunta inactiva"
            return null
        },
        validarFormulario: (map) => {
            return !(map.size == 0)
        },
        isUndefined: (campo) => {
            if (campo == undefined) return true
            return false
        },
        isSameNombre: (valorAnterior, valorActual) => {
            return valorAnterior == valorActual;
        },
        isSameDescripcion: (valorAnterior, valorActual) => {
            return valorAnterior == valorActual;
        },
        isSamePreguntas: (preguntasAnteriores, preguntasActuales) => {
            if (preguntasAnteriores.length == preguntasActuales.length) {
                const elementosDiferentes = preguntasActuales.filter((item) => {
                    if (!preguntasAnteriores.find((it) => it.id === item.id))
                        return true;
                });
                return !(elementosDiferentes.length > 0); // False = Hay elementos diferentes / True = Los elementos siguen siendo iguales
            } else {
                return false;
            }
        },
        order: (array) =>{
            console.log("Enviado", array);
            let nuevoArray = []
            for (let index = 0; index < array.length; index++) {
                nuevoArray.push({...array[index], order: index})
            }
            console.log("Array", nuevoArray);
            return nuevoArray;
        },
        isSamePosiciones: (preguntasAnteriores, preguntasActuales) =>{
           
            console.log("Id de la segunda ",preguntasActuales[1].id );
            let elementos = 0 ;
            for (let index = 0; index < preguntasActuales.length; index++) {

                if(preguntasAnteriores[index].order != preguntasActuales[index].order){
                    elementos += 1
                    return true;
                }else{
                    elementos += 0
                }
            }
            console.log("size: ", elementos);
            return (elementos > 0); //False = Hay elementos con posiciones diferentes / True = Todos los elementos siguen con la misma posición
        }
    }
    return methods
})   