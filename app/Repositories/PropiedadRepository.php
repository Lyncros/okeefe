<?php

namespace App\Repositories;

use App\Models\Propiedad;
use InfyOm\Generator\Common\BaseRepository;

class PropiedadRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [

    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Propiedad::class;
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

        $query = '
          SELECT p.id_prop,p.id_ubica,p.calle,p.nro,p.id_tipo_prop,p.subtipo_prop,p.intermediacion,p.id_inmo,
          p.operacion,p.piso,p.dpto,p.id_cliente,p.activa,p.id_sucursal,p.id_emp, p.compartir,p.goglat,p.goglong,
          z.nombre_ubicacion,t.tipo_prop,st.sup_total,sca.cantidad_ambientes, mon.moneda, val.valor, sba.cantidad_banos
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
          ' . $moneyType . '
          WHERE p.id_ubica = ' . $element->idZona . ' 
          AND p.operacion = "' . $searchValues['operacion'] . '"
          AND p.id_tipo_prop = ' . $searchValues['tipo'] .'
          AND val.valor BETWEEN '. $searchValues['valMin'] .' AND '. $searchValues['valMax'] .'
          AND sca.cantidad_ambientes IN ('. $searchValues['amb'] .')
          AND st.sup_total BETWEEN '. $searchValues['supMin'] .' AND '. $searchValues['supMax'] .' 
          HAVING mon.moneda = "'. $searchValues['moneda'] .'" 
          AND sba.cantidad_banos  LIKE "%' . $searchValues['banos'] .'%"';
        
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

        if ($values['operacion'] == 'Venta') {
            $moneyType = "
                  LEFT JOIN
				    (SELECT id_prop, contenido as moneda FROM propiedad_caracteristicas WHERE id_carac=165) as mon 
				        ON p.id_prop=mon.id_prop
				  LEFT JOIN
				    (SELECT id_prop, contenido as valor FROM propiedad_caracteristicas WHERE id_carac=161) as val 
				        ON p.id_prop=val.id_prop";
        } else if ($values['operacion'] == 'Alquiler') {
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
