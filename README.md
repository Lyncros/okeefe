# Okeefe API Buscador

## Pasos para deploy

###Clonar el repo

`$ git clone https://github.com/Lyncros/okeefe.git`

`$ cd okeefe`

`$ git checkout develop`

`$ composer install`

Configurar .env con los datos locales

## Base de datos

La base de datos original fue indexada en varias tablas para mejorar el rendimiento de la busqueda,
por favor descargar consultas y ejecutar: (Ejecutar en orden)

http://pastebin.com/F1mvzaq2

**Script PHP Para cocheras default 0 en todas las propiedades**
http://pastebin.com/GLQ19bva

**Script PHP Para antiguedad default 0 en todas las propiedades**
http://pastebin.com/2t5maHyt


# Api Docs

## Busqueda de inmuebles segun tipo, operacion, ubicacion

- Los valores por defectos son Departamento en venta

***Busqueda de todos los departamentos en venta.***

`/api/v1/ubicacionpropiedad?operacion=Venta&tipo=12`

***Busqueda de departamentos en venta en Wilde***

`/api/v1/ubicacionpropiedad?q=Wilde&operacion=Venta&tipo=12`

## Busqueda de recidencial

* Tipos de busquedas recidenciales (IDs)

- Casas -> 9
- Departamentos y PH -> 1
- Lotes -> 7
- Quintas -> 17

***Rango de valor del inmueble***

`/api/v1/ubicacionpropiedad?valMin=0&valMax=100000`

***Rango Superficie (m2)***

`/api/v1/ubicacionpropiedad?supMin=0&supMax=100`

***Cantidad de ambientes***

`/api/v1/ubicacionpropiedad?amb==5`

***Cantidad de cocheras***

`/api/v1/ubicacionpropiedad?coch==5`

***Antiguedad***

`/api/v1/ubicacionpropiedad?ant==5`

***Tipo de moneda (Default U$D y $)***

*Busqueda disponible para pesos argentinos y dolares americanos*

`/api/v1/ubicacionpropiedad?moneda=$`

***Cantidad de baños***

`/api/v1/ubicacionpropiedad?banos=2`

## Busqueda de comercial/industrial

* Tipos de busquedas comerciales/industriales (IDs)

- Lotes -> 7
- Industrial -> 19
- Locales -> 2
- Oficinas -> 11
- Galpones -> 15
- Cocheras -> 18

`/api/v1/ubicacionpropiedad?tipo=11`

***Cantidad de baños***

`/api/v1/ubicacionpropiedad?tipo=11&banos=2`

***Cantidad de ambientes***

`/api/v1/ubicacionpropiedad?tipo=11&amb==1`

***Cantidad de cocheras***

`/api/v1/ubicacionpropiedad?tipo=11&coch==1`

***Antiguedad***

`/api/v1/ubicacionpropiedad?tipo=11&ant==1`

***Rango Superficie (m2)***

`/api/v1/ubicacionpropiedad?tipo=11&supMin=0&supMax=100`




