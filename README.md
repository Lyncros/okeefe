# Okeefe API Buscador

## Pasos para deploy

###Clonar el repo

`$ git clone https://github.com/Lyncros/okeefe.git`

`$ cd okeefe`

`$ git checkout develop`

`$ composer install`

Configurar .env con los datos locales

### Base de datos

La base de datos original fue indexada en varias tablas para mejorar el rendimiento de la busqueda,
por favor descargar para test.

``

# Api Docs

### Busqueda de inmuebles segun tipo, operacion, ubicacion

- Los valores por defectos son Departamento en venta
- Busqueda de todos los departamentos en venta.

`api/v1/ubicacionpropiedad?operacion=Venta&amp;tipo=1`

- Busqueda de departamentos en venta en Wilde

`/api/v1/ubicacionpropiedad?q=Wilde&amp;operacion=Venta&amp;tipo=1`

