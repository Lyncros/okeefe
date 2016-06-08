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
por favor descargar para test.

`https://www.dropbox.com/s/hul53adcvr8jepy/okeefe_desarrollo.sql?dl=0`

o bien ver consultas en: `https://github.com/Lyncros/okeefe/wiki/Registro-de-queries-SQL-en-la-base-de-datos`

# Api Docs

## Busqueda de inmuebles segun tipo, operacion, ubicacion

- Los valores por defectos son Departamento en venta
- Busqueda de todos los departamentos en venta.

`/api/v1/ubicacionpropiedad?operacion=Venta&tipo=1`

- Busqueda de departamentos en venta en Wilde

`/api/v1/ubicacionpropiedad?q=Wilde&operacion=Venta&tipo=1`


