<?php

namespace App\Http\Controllers\API;


use App\Http\Controllers\AppBaseController;
use App\Repositories\UbicacionPropiedadRepository;
use Illuminate\Http\Request;

class UbicacionPropiedadAPIController extends AppBaseController
{
    /**
     * @var UbicacionPropiedadRepository
     */
    protected $ubicacionPropiedadRepository;

    /**
     * UbicacionPropiedadController constructor.
     * @param UbicacionPropiedadRepository $ubicacionPropiedadRepository
     */
    public function __construct(UbicacionPropiedadRepository $ubicacionPropiedadRepository)
    {
        $this->ubicacionPropiedadRepository = $ubicacionPropiedadRepository;
    }

    /**
     * Get full results for properties
     *
     * @param Request $request
     * @return mixed
     */
    public function getUbicacionPropiedad(Request $request)
    {
        $q = $request->q;

        return $this->ubicacionPropiedadRepository->getParentWithChildsQuery($q);
    }
}