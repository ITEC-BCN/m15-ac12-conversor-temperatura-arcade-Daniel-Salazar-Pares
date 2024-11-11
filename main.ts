//  Función para redondear a dos decimales sin usar int()
function redondear_dos_decimales(valor: number): number {
    return Math.idiv(valor * 100 + 0.5, 1) / 100
}

//  Redondeo manual sin usar int()
//  Funciones de conversión con redondeo manual
function celsius_a_fahrenheit(celsius: number): number {
    return redondear_dos_decimales(celsius * 9 / 5 + 32)
}

function fahrenheit_a_celsius(fahrenheit: number): number {
    return redondear_dos_decimales((fahrenheit - 32) * 5 / 9)
}

//  Variables para temperaturas
let temperatura = 0
//  La temperatura ingresada, sea en Celsius o Fahrenheit
let resultado_conversion = 0
//  Resultado de la conversión
//  Variable para controlar el modo de conversión
let modo_celsius_a_fahrenheit = true
//  Comienza en modo Celsius a Fahrenheit
//  Establecer un fondo bonito para el juego
scene.setBackgroundImage(assets.image`moon`)
//  Fondo personalizado
//  Crear imágenes pequeñas para los sprites de texto
let imagen_entrada = image.create(1, 1)
let imagen_resultado = image.create(1, 1)
//  Crear sprites de texto con imágenes válidas
let texto_entrada = sprites.create(imagen_entrada, SpriteKind.Player)
let texto_resultado = sprites.create(imagen_resultado, SpriteKind.Player)
//  Configurar posiciones de los sprites de texto para centrar el texto
let centro_x = 80
//  Ancho de la pantalla / 2
texto_entrada.setPosition(centro_x, 30)
texto_resultado.setPosition(centro_x, 50)
//  Función para actualizar la conversión
function actualizar_conversion() {
    
    if (modo_celsius_a_fahrenheit) {
        resultado_conversion = celsius_a_fahrenheit(temperatura)
        texto_entrada.say("Celsius: " + ("" + temperatura))
        texto_resultado.say("Fahrenheit: " + ("" + resultado_conversion))
    } else {
        resultado_conversion = fahrenheit_a_celsius(temperatura)
        texto_entrada.say("Fahrenheit: " + ("" + temperatura))
        texto_resultado.say("Celsius: " + ("" + resultado_conversion))
    }
    
}

//  Función para pedir al usuario que introduzca la temperatura manualmente
//  Función para incrementar la temperatura
//  Función para decrementar la temperatura
//  Función para cambiar el modo de conversión
//  Asignar eventos a los botones para introducir la temperatura, cambiarla con UP/DOWN y cambiar el modo
controller.A.onEvent(ControllerButtonEvent.Pressed, function introducir_temperatura() {
    
    let valor_ingresado = game.askForNumber("Introduce la temperatura:", 3)
    temperatura = valor_ingresado
    if (temperatura != temperatura) {
        //  Una forma de verificar NaN
        temperatura = 0
    }
    
    actualizar_conversion()
})
//  Ingreso manual
controller.up.onEvent(ControllerButtonEvent.Pressed, function incrementar_temperatura() {
    
    temperatura += 1
    actualizar_conversion()
})
//  Incremento
controller.down.onEvent(ControllerButtonEvent.Pressed, function decrementar_temperatura() {
    
    temperatura -= 1
    actualizar_conversion()
})
//  Decremento
controller.B.onEvent(ControllerButtonEvent.Pressed, function cambiar_modo() {
    
    modo_celsius_a_fahrenheit = !modo_celsius_a_fahrenheit
    //  Cambia el modo
    //  Reinicia la temperatura para evitar confusión en el usuario
    temperatura = 0
    resultado_conversion = 0
    actualizar_conversion()
    if (modo_celsius_a_fahrenheit) {
        game.splash("Modo: Celsius a Fahrenheit")
    } else {
        game.splash("Modo: Fahrenheit a Celsius")
    }
    
})
//  Cambio de modo
//  Mostrar instrucciones iniciales
game.splash("Presiona A para introducir temperatura")
game.splash("Usa UP/DOWN para ajustar la temperatura")
game.splash("Presiona B para cambiar de modo")
actualizar_conversion()
