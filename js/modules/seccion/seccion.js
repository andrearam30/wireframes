app.controller("seccion", [
  "$scope",
  "$http",
  "$window",
  "SweetAlert",
  "factorySeccion",
  function ($scope, $http, $window, SweetAlert, factorySeccion) {
    $scope.listarSecciones = [
      {
        id: 1,
        nombre: "Departamento estadías",
        descripcion: "Sección para evaluar la atención del departamento de estadías",
        preguntas: [
          {
            id: 1,
            nombre: "¿Cómo te evaluó el departamento de estadías?",
            estado: 1,
            order: 0,
          },
          {
            id: 2,
            nombre: "¿Consideras que te brindó la información necesaria?",
            estado: 1,
            order: 1,
          },
          {
            id: 3,
            nombre: "¿Te brindaron la guía de estadías?",
            estado: 0,
            order: 2,
          },
        ],
        Estado: 1,
      },
      {
        id: 2,
        nombre: "Empresa",
        descripcion: "Sección para evaluar a la empresa donde realizaste tus estadías",
        preguntas: [
          {
            id: 1,
            nombre: "¿Te brindó las herramientas necesarias para desarrollar tu proyecto?",
            estado: 1,
            order: 0,
          },
          {
            id: 2,
            nombre: "¿Te brindó algún tipo de apoyo?",
            estado: 0,
            order: 1,
          },
          {
            id: 3,
            nombre: "¿Te hicieron alguna propuesta de trabajo?",
            estado: 1,
            order: 2,
          },
        ],
        Estado: 1,
      },
      {
        id: 3,
        nombre: "Asesor(a) universitario",
        descripcion: "Sección para evaluar el desempeño de tu asesor(a) universitario",
        preguntas: [
          {
            id: 1,
            nombre: "¿Te apoyo lo suficiente?",
            estado: 1,
            order: 0,
          },
          {
            id: 2,
            nombre: "¿Obtuviste un buen trato?",
            estado: 1,
            order: 1,
          },
        ],
        Estado: 1,
      },
      {
        id: 4,
        nombre: "Sección 4",
        descripcion: "Sección 4",
        preguntas: [
          {
            id: 1,
            nombre: "¿Pregunta 1?",
            estado: 1,
            order: 0,
          },
          {
            id: 2,
            nombre: "¿Pregunta 2?",
            estado: 1,
            order: 1,
          },
        ],
        Estado: 0,
      },
      {
        id: 5,
        nombre: "Sección 5",
        descripcion: "Sección 5",
        preguntas: [
          {
            id: 1,
            nombre: "¿Pregunta 1?",
            estado: 1,
            order: 0,
          },
          {
            id: 2,
            nombre: "¿Pregunta 2?",
            estado: 1,
            order: 1,
          },
          {
            id: 3,
            nombre: "¿Pregunta 3?",
            estado: 1,
            order: 1,
          },
        ],
        Estado: 0,
      },
    ];

    $scope.preguntas = [
      {
        id: 1,
        nombre: "¿Cómo te evaluó el departamento de estadías?",
        estado: 1,
        order: 0,
      },
      {
        id: 2,
        nombre: "¿Consideras que te brindó la información necesaria?",
        estado: 1,
        order: 1,
      },
      {
        id: 3,
        nombre: "¿Te brindaron la guía de estadías?",
        estado: 0,
        order: 2,
      },
      {
        id: 4,
        nombre: "¿Te brindó las herramientas necesarias para desarrollar tu proyecto?",
        estado: 0,
        order: 3,
      },
      {
        id: 5,
        nombre: "¿Te brindó algún tipo de apoyo?",
        estado: 1,
        order: 4,
      },
    ];

    $scope.preguntas2 = [
      {
        id: 1,
        nombre: "¿Cómo te evaluó el departamento de estadías?",
        estado: 1,
        order: 0,
      },
      {
        id: 2,
        nombre: "¿Consideras que te brindó la información necesaria?",
        estado: 1,
        order: 1,
      },
      {
        id: 3,
        nombre: "¿Te brindaron la guía de estadías?",
        estado: 0,
        order: 2,
      },
      {
        id: 4,
        nombre: "¿Te brindó las herramientas necesarias para desarrollar tu proyecto?",
        estado: 0,
        order: 3,
      },
      {
        id: 5,
        nombre: "¿Te brindó algún tipo de apoyo?",
        estado: 1,
        order: 4,
      },
    ];

    $scope.asignadas = [];

    $scope.listarModificacion = [];

    $scope.bloqueoTab = true;

    $scope.visible = false;

    $scope.seccion = {};

    $scope.listarRegistro = angular.copy($scope.preguntas);

    $scope.sortingLog = [];

    $scope.mapErrores = new Map();

    $scope.mapErroresModificar = new Map();

    $scope.sortableOptions = {
      beforeStop: function () {
        // console.log("beforeStop");
      },
      change: function () {
        console.log("Se ha realizado un cambio");
      },
      start: function (e, ui) { },
      update: function (e, ui) {
        console.log("Se ha realizado un cambio MODIFICACIÓN");
      },
      stop: function (e, ui) {
        let index = ui.item.index();
        // console.log("stop", index);
        $scope.asignadas[index].order = index;
      },
    };

    $scope.isRegistrar = true

    $scope.isModificar = true

    $scope.save = () => {
      console.log("Asignadas ", $scope.asignadas);
      if (!$scope.isRegistrar) {
        SweetAlert.swal(
          {
            title: "¡Advertencia!",
            text: "¿Estás seguro(a) de realizar los cambios?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
            closeOnConfirm: false,
          },
          function (isConfirm) {
            if (isConfirm) {
              $scope.asignadas = factorySeccion.order($scope.asignadas)
              console.log("Asignadas ", $scope.asignadas);
              const seccion_preguntas = angular.copy({
                ...$scope.seccion,
                preguntas: $scope.asignadas,
                Estado: 1,
              });
              $scope.listarSecciones = [
                seccion_preguntas,
                ...$scope.listarSecciones,
              ];
              setTimeout(function () {
                $("#tabConsulta").click();
              }, 100);
              $scope.seccion = {};
              $scope.asignadas = [];
              $scope.isRegistrar = true;
              $scope.listarRegistro = angular.copy($scope.preguntas);
              SweetAlert.swal(
                "Exitoso",
                "La sección se ha registrado exitosamente",
                "success"
              );
            } else {
              $scope.seccion = {};
              $scope.asignadas = [];
              $scope.isRegistrar = true;
              $scope.listarRegistro = angular.copy($scope.preguntas);
            }
          }
        );
      } else {
        SweetAlert.swal(
          {
            title: "¡Error!",
            text: "Campos sin completar o con errores",
            type: "error",
          });
      }
    };

    $scope.modificar = () => {
      console.log($scope.modificarSeccion);
      if (!$scope.isModificar) {
        SweetAlert.swal(
          {
            title: "¡Advertencia!",
            text: "¿Estás seguro de realizar los cambios?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
            closeOnConfirm: false,
          },
          function (isConfirm) {
            if (isConfirm) {
              $scope.listarSecciones.splice(indexOf($scope.listarSecciones, $scope.modificarSeccion), 1, $scope.modificarSeccion)
              setTimeout(function () {
                $("#tabConsulta").click();
              }, 100);
              $scope.modificarSeccion = {};
              $scope.listarModificacion = angular.copy($scope.preguntas);
              $scope.isModificar = true;
              $scope.bloqueoTab = true;
              $scope.visible = false
              SweetAlert.swal(
                "Exitoso",
                "La sección se ha actualizado exitosamente",
                "success"
              );
            }
          }
        );
      } else {
        SweetAlert.swal(
          {
            title: "¡Error!",
            text: "Campos sin modificar o con errores",
            type: "error",
          });
      }
    }

    $scope.setModificarSeccion = (seccion) => {
      $scope.originalSeccion = angular.copy(seccion);
      console.log($scope.originalSeccion.preguntas);
      $scope.modificarSeccion = angular.copy(seccion);
      console.log($scope.modificarSeccion.preguntas);
      $scope.listarModificacion = $scope.preguntas.filter((item) => {
        if (!$scope.modificarSeccion.preguntas.find((it) => it.id === item.id))
          return true;
      });
      $scope.visible = true;
      $scope.bloqueoTab = false;
      setTimeout(function () {
        $("#tabModificar").click();
      }, 100);
    };

    $scope.agregar = (pregunta) => {
      if (factorySeccion.validarPregunta(pregunta)) {
        $scope.mapErrores.set('pregunta', { error: true, mensaje: factorySeccion.validarPregunta(pregunta)})
      } else {
        $scope.mapErrores.delete('pregunta')
        $scope.asignadas.push(pregunta);
        $scope.listarRegistro.splice($scope.listarRegistro.indexOf(pregunta), 1);
      }
      verificarFormulario()
    };

    $scope.remover = (pregunta) => {
      $scope.listarRegistro.push(pregunta);
      $scope.asignadas.splice($scope.asignadas.indexOf(pregunta), 1);
    };

    $scope.agregarModificar = (pregunta) => {
      $scope.modificarSeccion.preguntas.push(pregunta)
      $scope.listarModificacion.splice($scope.listarModificacion.indexOf(pregunta), 1);
      verificarFormularioModificar()
    };

    $scope.removerModificar = (pregunta) => {
      $scope.listarModificacion.push(pregunta);
      $scope.modificarSeccion.preguntas.splice($scope.modificarSeccion.preguntas.indexOf(pregunta), 1);
      verificarFormularioModificar()
    };

    $scope.habilitarSeccion = (seccion) => {
      seccion = { ...seccion, estado: 1 };
    };

    $scope.deshabilitarSeccion = (seccion) => {
      seccion = { ...seccion, estado: 0 };
    };

    $scope.modalConsultaPreguntas = (preguntas) => {
      $("#modalPreguntas").modal("show");
      $scope.consultaPreguntasAsignadas = preguntas;
    };

    $scope.cancelarModificacion = () => {
      $scope.bloqueoTab = true;
      $scope.visible = false;
      setTimeout(function () {
        $("#tabConsulta").click();
      }, 100);
    };

    $scope.changeDecripcionRegistro = () => {
      if (factorySeccion.validarDescripcion($scope.seccion.descripcion)) {
        $scope.mapErrores.set('descripcion', { error: true, mensaje: factorySeccion.validarDescripcion($scope.seccion.descripcion) })
      } else {
        $scope.mapErrores.delete('descripcion')
      }
      verificarFormulario()
    }

    $scope.changeModificarDescripcion = () => {
      if (factorySeccion.validarDescripcion($scope.modificarSeccion.descripcion)) {
        $scope.mapErroresModificar.set('descripcion', { error: true, mensaje: factorySeccion.validarDescripcion($scope.modificarSeccion.descripcion) })
      } else {
        $scope.mapErroresModificar.delete('descripcion')
      }
      verificarFormularioModificar()
    }

    const verificarFormulario = () => {
      $scope.isRegistrar = factorySeccion.validarFormulario($scope.mapErrores) ||
        factorySeccion.isUndefined($scope.seccion.nombre) ||
        factorySeccion.isUndefined($scope.seccion.descripcion);
    }

    const verificarFormularioModificar = () => {
      $scope.isModificar = factorySeccion.validarFormulario($scope.mapErrores) ||
        (factorySeccion.isSameNombre($scope.originalSeccion.nombre, $scope.modificarSeccion.nombre) &&
          factorySeccion.isSameDescripcion($scope.originalSeccion.descripcion, $scope.modificarSeccion.descripcion) &&
          factorySeccion.isSamePreguntas($scope.originalSeccion.preguntas, $scope.modificarSeccion.preguntas));
    }

    const indexOf = (array, elemento) => {
      for (let index = 0; index < array.length; index++) {
        if (array[index].id == elemento.id) return index
      }
      return -1
    }

    $scope.sortableOptionsModificar = {
      beforeStop: function () {
      },
      change: function () {
      },
      start: function (e, ui) { 

      },
      update: function (e, ui) {
        console.log("UPDATE");
        $scope.copyPreguntas = factorySeccion.order($scope.modificarSeccion.preguntas)
        if (factorySeccion.isSamePreguntas($scope.originalSeccion.preguntas, $scope.modificarSeccion.preguntas)) {
          $scope.isModificar = factorySeccion.isSamePosiciones($scope.originalSeccion.preguntas, $scope.modificarSeccion.preguntas)
        }
      },
      stop: function (e, ui) {
      },
    };
  },
]);
