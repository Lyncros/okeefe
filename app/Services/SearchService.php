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

        $searchValues = $this->setDefaultsValues($operation, $type);

        $ubicationsProperties = $ubications->map(function ($element) use ($searchValues) {

            $element->zona = trim($element->zona);
            $element->localidad = trim($element->localidad);
            $element->subzona = trim($element->subzona);

            $properties = $this->getPropertiesData($element, $searchValues);

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
     * @param $searchValues
     * @return mixed
     * @internal param $type
     * @internal param $operation
     */
    private function getPropertiesData($element, $searchValues)
    {
        $properties = $this->propiedadRepository->findWhere([
            'id_ubica' => $element->idZona,
            'operacion' => $searchValues['operation'],
            'id_tipo_prop' => $searchValues['type']
        ]);

        return $properties;
    }

    /**
     * Get from configurations default values
     *
     * @param $operation
     * @param $type
     * @return array
     */
    private function setDefaultsValues($operation, $type)
    {
        $searchValues = [];

        $searchValues['operation'] = !$operation ? config('apiDefaults.OPERATION') : $operation;

        $searchValues['type'] = !$type ? config('apiDefaults.TYPE_PROPERTY') : $type;
        
        return $searchValues;
    }
}