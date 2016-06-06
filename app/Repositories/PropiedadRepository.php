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
}
