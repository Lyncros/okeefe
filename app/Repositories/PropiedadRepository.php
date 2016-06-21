<?php

namespace App\Repositories;

use App\Models\Propiedad;
use App\Services\CotizationService;
use InfyOm\Generator\Common\BaseRepository;
use Illuminate\Container\Container as Application;

class PropiedadRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [

    ];

    /**
     * @var CotizationService
     */
    protected $cotizationService;

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Propiedad::class;
    }

    public function __construct(Application $app, CotizationService $cotizationService)
    {
        parent::__construct($app);

        $this->cotizationService = $cotizationService;
    }

    /**
     * Find properties by spect
     *
     * @param $element
     * @param $searchValues
     * @return mixed
     */
    public function byPropertiesSpec($element, $searchValues)
    {

        $moneyType = $this->getMoneyType($searchValues);

        $todayCotization = $this->cotizationService->toDollar();

        $query = '
          SELECT p.id_prop, p.id_ubica, p.calle, p.nro, p.id_tipo_prop, p.subtipo_prop, p.intermediacion, p.id_inmo,
          p.tipo_oper_id, p.piso, p.dpto, p.id_cliente, p.activa, p.id_sucursal,p.id_emp, p.compartir, p.goglat, p.goglong,
          z.nombre_ubicacion, t.tipo_prop,st.sup_total, sca.cantidad_ambientes, mon.moneda, val.valor, sba.cantidad_banos, 
          cco.cantidad_cocheras, IF(mon.moneda = "U$S", val.valor * 14, val.valor) as valor_pesos, caa.cantidad_antiguedad
          FROM propiedad as p
          INNER JOIN ubicacionpropiedad as z ON p.id_ubica = z.id_ubica 
          INNER JOIN tipoprop as t ON p.id_tipo_prop = t.id_tipo_prop  
          LEFT JOIN 
              (SELECT id_prop, contenido as sup_total FROM propiedad_caracteristicas WHERE id_carac = 198) as st 
                ON p.id_prop=st.id_prop 
          LEFT JOIN 
            (SELECT id_prop, contenido as cantidad_ambientes FROM propiedad_caracteristicas WHERE id_carac = 208) as sca 
                ON p.id_prop=sca.id_prop
          LEFT JOIN 
            (SELECT id_prop, contenido as cantidad_banos FROM propiedad_caracteristicas WHERE id_carac = 71) as sba 
                ON p.id_prop=sba.id_prop
          LEFT JOIN 
            (SELECT id_prop, contenido as cantidad_cocheras FROM propiedad_caracteristicas WHERE id_carac = 373) as cco 
                ON p.id_prop=cco.id_prop
          LEFT JOIN 
            (SELECT id_prop, contenido as cantidad_antiguedad FROM propiedad_caracteristicas WHERE id_carac = 374) as caa 
                ON p.id_prop=caa.id_prop 
          ' . $moneyType . '
          WHERE p.id_ubica = ' . $element->idZona . ' 
          AND p.tipo_oper_id = "' . $searchValues['operacion'] . '"
          AND p.id_tipo_prop = ' . $searchValues['tipo'] .'
          AND sca.cantidad_ambientes '. $searchValues['amb'] .'
          AND cco.cantidad_cocheras '. $searchValues['cocheras'] .'
          AND caa.cantidad_antiguedad '. $searchValues['ambientes'] .'
          AND st.sup_total BETWEEN '. $searchValues['supMin'] .' AND '. $searchValues['supMax'] .' 
          AND mon.moneda IN ("'. $searchValues['moneda'][0] .'", "'. $searchValues['moneda'][1] .'")
          AND sba.cantidad_banos  LIKE "%' . $searchValues['banos'] .'%"  
          HAVING valor_pesos BETWEEN '. $searchValues['valMin'] . ' AND '. $searchValues['valMax'];

        $result = $this->model->hydrateRaw($query);

        return $result;
    }


    /**
     * Pick the value of money from type of operation
     *
     * @param $values
     * @return string
     */
    private function getMoneyType($values) {

        $moneyType = " ";

        if ($values['operacion'] == 12) {
            $moneyType = "
                  LEFT JOIN
				    (SELECT id_prop, contenido as moneda FROM propiedad_caracteristicas WHERE id_carac=165) as mon 
				        ON p.id_prop=mon.id_prop
				  LEFT JOIN
				    (SELECT id_prop, contenido as valor FROM propiedad_caracteristicas WHERE id_carac=161) as val 
				        ON p.id_prop=val.id_prop";
        } else if ($values['operacion'] == 2) {
            $moneyType = "
                 LEFT JOIN
				    (SELECT id_prop, contenido as moneda FROM propiedad_caracteristicas WHERE id_carac=166) as mon 
				        ON p.id_prop=mon.id_prop
				  LEFT JOIN
				    (SELECT id_prop, contenido as valor FROM propiedad_caracteristicas WHERE id_carac=164) as val 
				        ON p.id_prop=val.id_prop";
        }

        return $moneyType;
    }

}
