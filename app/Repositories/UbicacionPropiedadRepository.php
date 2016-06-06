<?php

namespace App\Repositories;

use App\Models\UbicacionPropiedad;
use App\Services\SearchService;

class UbicacionPropiedadRepository
{
    /**
     * @var UbicacionPropiedad
     */
    protected $ubicacionPropiedad;

    /**
     * @var SearchService
     */
    protected $searchService;

    /**
     * UbicacionPropiedadRepository constructor.
     * @param UbicacionPropiedad $ubicacionPropiedad
     */
    public function __construct(UbicacionPropiedad $ubicacionPropiedad, SearchService $searchService)
    {
        $this->ubicacionPropiedad = $ubicacionPropiedad;
        $this->searchService = $searchService;
    }

    /**
     * Return properties with parent/children
     *
     * ubications
     * @param $q
     * @param int $page
     * @param int $limit
     * @return mixed
     */
    public function getParentWithChildsQuery($q, $page = 1, $limit = 5, $operation = 'Venta', $type = 1)
    {
        $ubications = $this->ubicacionPropiedad->hydrateRaw("
                SELECT t1.nombre_ubicacion AS zona, t2.nombre_ubicacion as localidad, t3.nombre_ubicacion as subzona,
                IF(t3.nombre_ubicacion is null, t2.id_ubica, t3.id_ubica) as idZona,
                CONCAT(t1.nombre_ubicacion, ',',t2.nombre_ubicacion, ',', t3.nombre_ubicacion) AS valor
                FROM ubicacionpropiedad AS t1
                LEFT JOIN ubicacionpropiedad AS t2 ON t2.id_padre = t1.id_ubica
                LEFT JOIN ubicacionpropiedad AS t3 ON t3.id_padre = t2.id_ubica 
                WHERE (t2.nombre_ubicacion != '' OR t3.nombre_ubicacion != '')
                HAVING valor LIKE '%$q%'
            ");

        $ubications = $this->searchService->searchUbicacionPropiedad($ubications, $operation, $type);

        return $ubications;
    }
}