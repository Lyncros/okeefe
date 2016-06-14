<?php

namespace App\Transformers;


use App\Repositories\PropiedadRepository;

class SearchTransformer
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
     * @param $request
     * @return static
     */
    public function searchUbicacionPropiedad($ubications, $request)
    {
        $searchValues = $this->setDefaultsValues($request);

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
        $properties = $this->propiedadRepository->byPropertiesSpec($element, $searchValues);

        return $properties;
    }

    /**
     * Get from configurations default values
     *
     * @param $request
     * @return array
     */
    private function setDefaultsValues($request)
    {
        $searchValues = [];

        $searchValues['operacion'] = !$request->operacion ? config('apiDefaults.OPERATION') : $request->operacion;

        $searchValues['tipo'] = !$request->tipo ? config('apiDefaults.TYPE_PROPERTY') : $request->tipo;

        $searchValues['valMin'] = !$request->valMin ? config('apiDefaults.PROPERTY_VALUE_INIT') : $request->valMin;

        $searchValues['valMax'] = !$request->valMax ? config('apiDefaults.PROPERTY_VALUE_FINISH') : $request->valMax;

        $searchValues['amb'] = !$request->amb ? config('apiDefaults.QUANTY_AMB') : $request->amb;

        $searchValues['supMin'] = !$request->supMin ? config('apiDefaults.SURFACE_INIT') : $request->supMin;

        $searchValues['supMax'] = !$request->supMax ? config('apiDefaults.SURFACE_FINISH') : $request->supMax;

        $searchValues['banos'] = !$request->banos ? config('apiDefaults.BATHROOM') : $request->banos;

        $searchValues['moneda'] = !$request->moneda ? config('apiDefaults.MONEY_TYPE') : $request->moneda;

        return $searchValues;
    }
}