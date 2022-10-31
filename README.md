**¡Hola!** Una horita todas las noches estoy desarrollando ésta API.  :tw-1f60b:

Los usuarios ( en un principio para sesiones y hacer CRUD ) estan en **MONGO**. 

La base de datos SQL la tengo que **PLANET SCALE**.

- - - 
Poder ver las siguientes rutas:
- -https://ecommerce-2xh0.onrender.com/api/v1/productos (GET)
- -https://ecommerce-2xh0.onrender.com/api/v1/productos (POST) ruta protegida

- -https://ecommerce-2xh0.onrender.com/api/v1/usuario (GET)
- -https://ecommerce-2xh0.onrender.com/api/v1/usuario (POST) ruta protegida 
- -https://ecommerce-2xh0.onrender.com/api/v1/usuario/auth (POST)

Para ésta ultima, podemos iniciar sesion con:

> {
    "nombre" : "Emiliano",
    "password": "123456",
    "email": "emiibarraa@hotmail.com"
}

- - - 

Ésta API se desarrolla con middleware HELMET para aplicar seguridad.

# Proyecciones :tw-1f525:

:tw-2714: CORS
:tw-2714: CRUD DE DIFERENTES ENTIDADES QUE FALTAN.
:tw-2714: MERCADO PAGO
:tw-2714: DATOS EN BUFFER CACHÉ POR 1 MINUTO PARA RESPUESTAS MAS RÁPIDAS

Base de datos SQL: https://drive.google.com/file/d/1XOU_BnCIXHaVSk_tjfF7W2sAitVR4hxK/view?usp=sharing
