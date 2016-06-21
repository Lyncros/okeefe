<?php


/**
 * Valores por defecto de las consultas, si se cambia el
 * nombre del key de cualquier valor se debe cambiar el mismo
 * en la query de \App\Repositories\PropiedadRepository
 */
return [
    'operacion' => 12,

    'tipo' => 9,

    'valMin' => 0,

    'valMax' => 10000000,

    'supMin' => 0,

    'supMax' => 100000000,

    // Valores con opciones
    'moneda' => [
        'options' => ['U$S', '$']
    ],

    'banos' => 1,

    // Los valores que tienen true se reflejan como < 100 en el query y la consulta especifica como,
    // nombre==valor
    'amb' => true,

    'coch' => true,

    'ant' => true
];