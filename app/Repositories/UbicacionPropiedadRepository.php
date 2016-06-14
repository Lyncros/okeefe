<?php

namespace App\Repositories;

use App\Models\UbicacionPropiedad;
use App\Transformers\SearchTransformer;

class UbicacionPropiedadRepository
{
    /**
     * @var UbicacionPropiedad
     */
    protected $ubicacionPropiedad;

    /**
     * @var SearchTransformer
     */
    protected $searchTranformer;

    /**
     * UbicacionPropiedadRepository constructor.
     * @param UbicacionPropiedad $ubicacionPropiedad
     * @param SearchTransformer $searchTranformer
     */
    public function __construct(UbicacionPropiedad $ubicacionPropiedad, SearchTransformer $searchTranformer)
    {
        $this->ubicacionPropiedad = $ubicacionPropiedad;
        $this->searchService = $searchTranformer;
    }

    /**
     * Return properties with parent/children
     *
     * ubications
     * @param $request
     * @return mixed
     */
    public function getParentWithChildsQuery($request)
    {



        $ubications = $this->ubicacionPropiedad->hydrateRaw("
                SELECT t1.nombre_ubicacion AS zona, t2.nombre_ubicacion as localidad, t3.nombre_ubicacion as subzona,
                IF(t3.nombre_ubicacion is null, t2.id_ubica, t3.id_ubica) as idZona,
                CONCAT(t1.nombre_ubicacion, ',',t2.nombre_ubicacion, ',', t3.nombre_ubicacion) AS valor
                FROM ubicacionpropiedad AS t1
                LEFT JOIN ubicacionpropiedad AS t2 ON t2.id_padre = t1.id_ubica
                LEFT JOIN ubicacionpropiedad AS t3 ON t3.id_padre = t2.id_ubica 
                WHERE (t2.nombre_ubicacion != '' OR t3.nombre_ubicacion != '')
                HAVING valor LIKE '%$request->q%'
            ");

        $ubications = $this->searchService->searchUbicacionPropiedad($ubications, $request);

        return $ubications;
    }
}