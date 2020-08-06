## Arduino con Johnny Five
- Cada proyecto de arduino crea un servidor independiente (archivo main.js)
- El servidor es ejecutado por default(el puerto puede variar) con la siguiente configuración:
```
var clienteServer = require('socket.io-client')('http://localhost:8080');
```
- El puerto de arduino en este caso es el COM3 o COM4 pero esto depende de su configuración local

### PingFirmata

Para usar el sensor de proximidad con johnny-five es necesario grabar PingFirmata(este firmware se encuentra en proximidad/pingFirmata) en el Arduino, en los proyectos distintos a este usar StandardFirmata

##Diagramas
###Sensor de humedad DTH11
<img src="capturas/ddth11.jpg">

###Sensor de humedad YL-69
<img src="capturas/dhumedad.jpg">

###Sensor de luz
<img src="capturas/dluz.png">

###Motor DC
<img src="capturas/dmotor.png">

###Led RGB
<img src="capturas/drgb.png">

###Sensor de velocidad RPM LM393
<img src="capturas/drpm.png">
