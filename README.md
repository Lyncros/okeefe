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

Script PHP Para cocheras default 0 en todas las propiedades

http://pastebin.com/GLQ19bva

# Api Docs

## Busqueda de inmuebles segun tipo, operacion, ubicacion

- Los valores por defectos son Departamento en venta

*Busqueda de todos los departamentos en venta.*

`/api/v1/ubicacionpropiedad?operacion=Venta&tipo=1`

*Busqueda de departamentos en venta en Wilde*

`/api/v1/ubicacionpropiedad?q=Wilde&operacion=Venta&tipo=1`

## Busqueda de recidencial

*Rango de valor del inmueble*

`/api/v1/ubicacionpropiedad?valMin=0&valMax=100000`

*Rango Superficie (m2)*

`/api/v1/ubicacionpropiedad?supMin=0&supMax=100`

*Cantidad de ambientes (Entre 1 y 5)*

`/api/v1/ubicacionpropiedad?amb=5`

*Tipo de moneda (Default U$D)*

- Busqueda disponible para pesos argentinos y dolares americanos

`/api/v1/ubicacionpropiedad?moneda=$`

*Cantidad de baños (Entre 1 y 5)*

`/api/v1/ubicacionpropiedad?banos=2`





