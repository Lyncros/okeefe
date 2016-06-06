<?php
/**
 * Created by PhpStorm.
 * User: lucas
 * Date: 5/6/16
 * Time: 9:05 AM
 */

namespace App\Services;


use App\Repositories\PropiedadRepository;

class SearchService
{
    /**
     * @var PropiedadRepository
     */
    protected $propiedadRepository;

    public function __construct(PropiedadRepository $propiedadRepository)
    {
        $this->propiedadRepository = $propiedadRepository;
    }

    /**
     * Search property and ubications
     *
     * @param $ubications
     * @param string $operation
     * @param int $type
     * @return static
     */
    public function searchUbicacionPropiedad($ubications, $operation, $type)
    {
        $ubicationsProperties = $ubications->map(function ($element) use ($operation, $type) {

            $element->zona = trim($element->zona);
            $element->localidad = trim($element->localidad);
            $element->subzona = trim($element->subzona);

            $properties = $this->getPropertiesData($element, $type, $operation);

            return [
                'valor' => $element->valor,
                'zona_padre' => $element->zona,
                'localidad' => $element->localidad,
                'subzona' => $element->subzona,
                'id_zona' => $element->idZona,
                'cantidad' => count($properties),
                'propiedades' => $properties
            ];
        });

        return $ubicationsProperties;
    }

    /**
     * Get properties based given params
     *
     * @param $element
     * @param $type
     * @param $operation
     * @return mixed
     */
    private function getPropertiesData($element, $type, $operation)
    {
        $properties = $this->propiedadRepository->findWhere([
            'id_ubica' => $element->idZona,
            'operacion' => $operation,
            'id_tipo_prop' => $type
        ]);

        return $properties;
    }
}