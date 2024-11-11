# Función para redondear a dos decimales sin usar int()
def redondear_dos_decimales(valor):
    return (valor * 100 + 0.5) // 1 / 100  # Redondeo manual sin usar int()

# Funciones de conversión con redondeo manual
def celsius_a_fahrenheit(celsius):
    return redondear_dos_decimales((celsius * 9/5) + 32)

def fahrenheit_a_celsius(fahrenheit):
    return redondear_dos_decimales((fahrenheit - 32) * 5/9)

# Variables para temperaturas
temperatura = 0  # La temperatura ingresada, sea en Celsius o Fahrenheit
resultado_conversion = 0  # Resultado de la conversión

# Variable para controlar el modo de conversión
modo_celsius_a_fahrenheit = True  # Comienza en modo Celsius a Fahrenheit

# Establecer un fondo bonito para el juego
scene.set_background_image(assets.image("""moon"""))  # Fondo personalizado

# Crear imágenes pequeñas para los sprites de texto
imagen_entrada = image.create(1, 1)
imagen_resultado = image.create(1, 1)

# Crear sprites de texto con imágenes válidas
texto_entrada = sprites.create(imagen_entrada, SpriteKind.player)
texto_resultado = sprites.create(imagen_resultado, SpriteKind.player)

# Configurar posiciones de los sprites de texto para centrar el texto
centro_x = 80  # Ancho de la pantalla / 2
texto_entrada.set_position(centro_x, 30)
texto_resultado.set_position(centro_x, 50)

# Función para actualizar la conversión
def actualizar_conversion():
    
    global resultado_conversion
    if modo_celsius_a_fahrenheit:
        resultado_conversion = celsius_a_fahrenheit(temperatura)
        texto_entrada.say("Celsius: " + str(temperatura))
        texto_resultado.say("Fahrenheit: " + str(resultado_conversion))
    else:
        resultado_conversion = fahrenheit_a_celsius(temperatura)
        texto_entrada.say("Fahrenheit: " + str(temperatura))
        texto_resultado.say("Celsius: " + str(resultado_conversion))

# Función para pedir al usuario que introduzca la temperatura manualmente
def introducir_temperatura():
    global temperatura
    valor_ingresado = game.ask_for_number("Introduce la temperatura:", 3)
    temperatura = valor_ingresado
    if temperatura != temperatura:  # Una forma de verificar NaN
                temperatura = 0
    actualizar_conversion()

# Función para incrementar la temperatura
def incrementar_temperatura():
    global temperatura
    temperatura += 1
    actualizar_conversion()

# Función para decrementar la temperatura
def decrementar_temperatura():
    global temperatura
    temperatura -= 1
    actualizar_conversion()

# Función para cambiar el modo de conversión
def cambiar_modo():
    global modo_celsius_a_fahrenheit, temperatura, resultado_conversion
    modo_celsius_a_fahrenheit = not modo_celsius_a_fahrenheit  # Cambia el modo
    # Reinicia la temperatura para evitar confusión en el usuario
    temperatura = 0
    resultado_conversion = 0
    actualizar_conversion()
    if modo_celsius_a_fahrenheit:
        game.splash("Modo: Celsius a Fahrenheit")
    else:
        game.splash("Modo: Fahrenheit a Celsius")

# Asignar eventos a los botones para introducir la temperatura, cambiarla con UP/DOWN y cambiar el modo
controller.A.on_event(ControllerButtonEvent.PRESSED, introducir_temperatura)  # Ingreso manual
controller.up.on_event(ControllerButtonEvent.PRESSED, incrementar_temperatura)  # Incremento
controller.down.on_event(ControllerButtonEvent.PRESSED, decrementar_temperatura)  # Decremento
controller.B.on_event(ControllerButtonEvent.PRESSED, cambiar_modo)  # Cambio de modo

# Mostrar instrucciones iniciales
game.splash("Presiona A para introducir temperatura")
game.splash("Usa UP/DOWN para ajustar la temperatura")
game.splash("Presiona B para cambiar de modo")
actualizar_conversion()  # Actualiza la conversión al iniciar
