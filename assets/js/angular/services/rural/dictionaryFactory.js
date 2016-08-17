(function () {
    angular.module('okeefeRuralSite.services')
        .factory("dictionaryFactory", function () {
            var dictionary = [
                //A
                {
                    letter: 'A',
                    content: [
                        {
                            title: 'Alquiler',
                            text: 'Arrendamiento. Normalmente se firma un contrato que fija los términos entre las partes.'
                        },
                        {
                            title: 'Altura máxima de edificación',
                            text: 'Medida vertical del edificio establecida según la zona correspondiente y sobre la cual pueden sobresalir instalaciones complementarias (tanques y chimeneas) cajas de ascensores y escaleras, lavaderos colectivos, bauleras, departamento de portero y salón usos múltiples.'
                        },
                        {
                            title: 'Apoderado',
                            text: 'Persona que ejerce poderes en representación de otra persona que se los ha concedido.'
                        },
                        {
                            title: 'Avalúo',
                            text: 'Tasación. Estimación del valor de un inmueble.'
                        },
                    ]
                },
                //B
                {
                    letter: 'B',
                    content: [
                        {
                            title: 'Basamento',
                            text: 'Parte del edificio construido sobre el nivel del terreno, entre medianeras, cuya altura es fija y sobre la cual pueden sobre elevarse otros volúmenes edificados.'
                        },
                        {
                            title: 'Boleto',
                            text: 'Documento por el cual se determinan las condiciones de compra-venta de una propiedad.'
                        },
                        {
                            title: 'Broker',
                            text: 'Profesional con un amplio conocimiento del mercado en el cual opera y preparado para ofrecer el mejor asesoramiento inmobiliario.'
                        },
                        {
                            title: 'Build to suit',
                            text: 'Propiedades que se construyen a medida de las necesidades específicas de una empresa.'
                        },
                    ]
                },
                //C
                {
                    letter: 'C',
                    content: [
                        {
                            title: 'Campo',
                            text: 'Terreno en zona no urbana, fincas rústicas.'
                        },
                        {
                            title: 'Carta de intención',
                            text: 'Declaración escrita de una de las partes, o ambas partes, expresando el interés y la buena intención de proceder a un  acuerdo final basado en ciertos términos y condiciones.'
                        },
                        {
                            title: 'Chacra',
                            text: 'Finca de escasa extensión destinada al cultivo de hortalizas, cría de aves de corral, etc. También cada vez más utilizadas para el ocio y esparcimiento, utilización ocasional, etc.'
                        },
                        {
                            title: 'Chalet',
                            text: 'Años atrás se denominaba así a una casa o finca de recreo. En la actualidad se refiere a casas que responden a un estilo que  presenta techos con caídas fuertes, normalmente de tejas, en lotes con jardín.'
                        },
                        {
                            title: 'Comisión',
                            text: 'Honorarios que se perciben en concepto de mediación en un negocio, que se calcula como un porcentaje del monto total de una operación de venta o alquiler.'
                        },
                        {
                            title: 'Comisionista',
                            text: 'Persona que se emplea para vender por cuenta de otro cobrando una comisión. '
                        },
                        {
                            title: 'Contrato de Locación',
                            text: 'Documento por el cual se determinan las  condiciones de alquiler de un inmueble. '
                        },
                        {
                            title: 'Contratos',
                            text: 'Esta es la descripción de los contratos'
                        },
                        {
                            title: 'Copropietario',
                            text: 'Que es propietario de bienes en conjunto con otra/s persona/s '
                        },
                        {
                            title: 'Costos adicionales',
                            text: 'Todo costo adicional que se produzca en una transacción,costos de mudanza, etc., que corren  por parte del comprador/locatario, expresado en dólares por m2. '
                        },
                        {
                            title: 'Costos de mejoramiento',
                            text: 'Son los costos de mejoramiento que un comprador/locador le hace a una propiedad para sus necesidades específicas. Usualmente se refieren a la construcción interior, como terminaciones, cielorraso suspendido, piso flotante, iluminación, divisiones, etc. '
                        },
                        {
                            title: 'Costos operativos',
                            text: 'Son los costos día a día de mantener una  propiedad, como limpieza, mantenimiento, seguro, ascensores, etc. '
                        },
                        {
                            title: 'Curtain wall',
                            text: 'Fachada de vidrio de un edificio que se apoya en una estructura de aluminio.'
                        },
                    ]
                },
                //D
                {
                    letter: 'D',
                    content: [
                        {
                            title: 'Densidad poblacional bruta',
                            text: 'Es la relación entre la población de  un área o zona y la superficie total de la misma.'
                        },
                        {
                            title: 'Densidad poblacional neta',
                            text: 'Es la relación entre la población de un área o zona y la superficie de sus espacios edificables, es decir libre de los  espacios circulatorios y verdes públicos. '
                        },
                        {
                            title: 'Densidad poblacional potencial',
                            text: 'Es aquella que podrá efectivizarse cuando se realicen las obras de infraestructura previstas. '
                        },
                        {
                            title: 'Depósito (de garantía)',
                            text: 'En un contrato de locación, es el porcentaje del total de  la transacción, que se entrega como seguro para el locador, y que es devuelto al finalizar el contrato. '
                        },
                        {
                            title: 'Depósito industrial',
                            text: 'Estructura, generalmente de hormigón armado, donde pueden almacenarse bienes. '
                        },
                        {
                            title: 'Devengar',
                            text: 'Adquirir derecho a percibir una  retribución por algún servicio prestado.'
                        },
                    ]
                },
                //E
                {
                    letter: 'E',
                    content: [
                        {
                            title: 'Edificio Clase A',
                            text: 'También son en la mayoría de los casos para renta. Están localizados en lugares con buenos accesos. Los layouts son modernos y poseen buena luz natural y vistas. La calidad de las terminaciones del edificio y el mantenimiento son buenas. Por lo general sus locatarios son empresas multinacionales y/o de alto poder económico.'
                        },
                        {
                            title: 'Edificio Clase AAA',
                            text: 'Edificios generalmente destinados para renta. Ubicados en zonas emblemáticas de la ciudad y con fácil accesos. Brindan una importante imagen  institucional, tienen un alto nivel de diseño, sistemas tecnológicos inteligentes y servicios de última generación. Son modernos y por lo general el precio de alquiler es alto. Los locatarios generalmente son clientes internacionales o multinacionales.'
                        },
                        {
                            title: 'Edificio Clase B',
                            text: 'Edificios ubicados en lugares tradicionales de desarrollo del negocio. Cuentan con un buen nivel constructivo a pesar de que su diseño y estructura funcional son algo obsoletas para los layouts modernos. Son edificios de generaciones pasadas pero con un alto grado de mantenimiento. La capacidad de estacionamiento del edificio es escasa y se encuentran ocupados por Pymes, consultoras y profesionales de buen nivel. '
                        },
                        {
                            title: 'Edificio Clase C',
                            text: 'Son edificios antiguos para reciclar ya que no han sido modernizados ni bien mantenidos. Son obsoletos por la tecnología constructiva y sus reducidas dimensiones, haciéndolos poco aptos para los layouts que pretenden las empresas hoy en día. Por lo general no poseen estacionamiento y son buscados por empresas con poco capital, pequeñas oficinas públicas, profesionales independientes, y pequeñas empresas de servicios. '
                        },
                        {
                            title: 'Edificio entre medianeras',
                            text: 'El que puede extenderse hasta las líneas divisorias laterales de la parcela.'
                        },
                        {
                            title: 'Enajenar',
                            text: 'Transmitir a otro una propiedad.'
                        },
                        {
                            title: 'Escritura traslativa de dominio',
                            text: 'Documento por el cual se determina el traspaso de dominio sobre una propiedad entre un vendedor y un comprador. '
                        },
                        {
                            title: 'Escrituración',
                            text: 'Acto por el cual se firma un documento entre las partes vendedora y compradora determinando el traspaso  de dominio sobre una propiedad.'
                        },
                    ]
                },
                //F
                {
                    letter: 'F',
                    content: [
                        {
                            title: 'F.O.S.',
                            text: 'Factor Ocupacional del Suelo. Es la relación entre la superficie máxima del suelo ocupado por el edificio y la superficie del terreno. Ejemplo: si el FOS es de 0,6 en un lote de 300 m2, significa que se sobre ese lote se pueden ocupar construir 180 m2. (se multiplica 0,6 x 300).'
                        },
                        {
                            title: 'F.O.T.',
                            text: 'Factor Ocupacional Total. Establece la superficie máxima construible en cada terreno, resultante de multiplicar el coeficiente establecido para la zona por la superficie de dicho terreno. La superficie semicubierta, abierta en  dos o más lados de su perímetro se considerará con la mitad (50%) de su superficie (balcones, galerías, etc.) Ejemplo: si el F.O.T. es de 1 en un lote de 300 m2, significa que sobre ese lote se pueden construir 300 m2. (se multiplica 1 x 300).'
                        },
                    ]
                },
                //G
                {
                    letter: 'G',
                    content: [
                        {
                            title: 'Galpón',
                            text: 'Construcción básica utilizada  como depósito.'
                        },
                        {
                            title: 'Garantía',
                            text: 'En los contratos de alquiler o convenios, se refiere a quienes es la persona/s que responderá/n económicamente ante el incumplimiento por parte del locatario.'
                        },
                    ]
                },
                //H
                {
                    letter: 'H',
                    content: [
                        {
                            title: 'Hall',
                            text: 'Estar de recepción.'
                        },
                        {
                            title: 'Hectárea',
                            text: 'Superficie de terreno que  equivale a 10,000 m2.'
                        },
                        {
                            title: 'Hipoteca',
                            text: 'Inmueble con que es garantizado el pago de un crédito. Derecho real sobre bienes inmuebles que permanecen en la posesión de su dueño,  y que garantiza el cumplimiento de una obligación.'
                        },
                        {
                            title: 'Hipotecar',
                            text: 'Gravar bienes con  hipotecas.'
                        },
                    ]
                },
                //I
                {
                    letter: 'I',
                    content: [
                        {
                            title: 'Inmuebles ociosos',
                            text: 'Son aquellos inmuebles que han quedado obsoletos frente a  la demanda actual de las empresas.'
                        },
                        {
                            title: 'Inquilino',
                            text: 'Ver locatario.'
                        },
                    ]
                },
                //J
                {
                    letter: 'J',
                    content: [
                        //
                    ]
                },
                //K
                {
                    letter: 'K',
                    content: [
                        //
                    ]
                },
                //L
                {
                    letter: 'L',
                    content: [
                        {
                            title: 'Layout',
                            text: 'Planificación y distribución de un  espacio determinado.'
                        },
                        {
                            title: 'Leasing',
                            text: 'Operación en la que interviene una persona o razón social (tomador) que necesita disponer de un bien, pero no cuenta con el dinero para comprarlo o no quiere inmovilizar capital, y acude a una entidad financiera (dador). La entidad compra el bien y se lo entrega al tomador, pactando un contrato en donde el tomador se compromete a abonar un canon por el capital invertido, más una suma en concepto de depreciación del bien. Transcurrido el tiempo pactado del contrato, el tomador puede ejercer una opción de compra, pero sin obligación. Si no la ejerce, la entidad tratará de vender el bien por su valor residual. '
                        },
                        {
                            title: 'Llave en mano',
                            text: 'Propiedades que se entregan con todas las especificaciones que requiere un inquilino para empezar a trabajar.'
                        },
                        {
                            title: 'Locación',
                            text: 'Acción por la cual se realiza el alquiler de  un inmueble bajo ciertas condiciones.'
                        },
                        {
                            title: 'Locador',
                            text: 'La parte, generalmente el propietario, que ofrece el derecho de posesión y uso de una propiedad a un locatario, por ciertas condiciones. '
                        },
                        {
                            title: 'Locatario',
                            text: 'La parte, en un contrato de alquiler, que recibe un derecho de posesión y uso de una propiedad, de un locador/propietario por ciertas condiciones'
                        },
                    ]
                },
                //M
                {
                    letter: 'M',
                    content: [
                        {
                            title: 'Martillero',
                            text: 'Intermediario experto en adjudicaciones por subasta y remates. Profesional dedicado a intermediar en operaciones inmobiliarias.'
                        },
                    ]
                },
                //N
                {
                    letter: 'N',
                    content: [
                        //
                    ]
                },
                //O
                {
                    letter: 'O',
                    content: [
                        {
                            title: 'Ocupación del Suelo',
                            text: 'Conjuntos de normas sobre alturas, retiros y factores de ocupación, que delimitan el volumen edificable máximo sobre parcela de terreno y su ubicación en el mismo.'
                        },
                        {
                            title: 'Opción de renovación de contrato',
                            text: 'Derecho otorgado por un locador a un locatario, con la oportunidad de extender los derechos de posesión y uso de una propiedad o espacio, de acuerdo a los términos específicos del contrato.'
                        },
                    ]
                },
                //P
                {
                    letter: 'P',
                    content: [
                        {
                            title: 'Piso técnico flotante',
                            text: 'Es aquel piso que permite la instalación del cableado para la transmisión de voz y datos, a través de un sistema de paneles. '
                        },
                        {
                            title: 'Planta baja libre',
                            text: 'Es la planta libre correspondiente al nivel de acceso principal del edificio que puede ser ocupada como máximo en un 50% de su superficie con elementos  de circulación vertical, conserjería y locales para instalaciones complementarias centrales.'
                        },
                        {
                            title: 'Playroom',
                            text: 'Cuarto de juegos, sala de T.V. o estar. Espacio que se  utiliza para esparcimiento.'
                        },
                        {
                            title: 'Plazo de alquiler',
                            text: 'Período específico de tiempo en un contrato de alquiler donde el locador extiende un derecho de posesión y uso de  un espacio o propiedad, a un locatario.'
                        },
                        {
                            title: 'Porcentaje de ocupación',
                            text: 'Total del espacio físico ocupado en una propiedad (superficie alquilada más superficie vendida) dividido por el inventario total,  expresado en porcentaje. '
                        },
                        {
                            title: 'Porcentaje de vacancia',
                            text: 'Cantidad total del espacio disponible para alquilar, dividido por el total del inventario, expresado en porcentaje. A veces  incluye el espacio disponible para subarrendar.'
                        },
                        {
                            title: 'Portafolio inmobiliario',
                            text: 'Es el patrimonio inmobiliario de una sociedad, de un inversor institucional o de uno privado, que puede estar constituido por inmuebles  destinados a diversos usos (comercial, industrial, etc.).'
                        },
                        {
                            title: 'Propiedad horizontal',
                            text: 'Definición por la cual los copropietarios son condóminos del terreno y de las cosas comunes en el porcentual que indica el reglamento de copropiedad, y dueños exclusivos del piso, paredes y techo de su  departamento, oficina, o casa .'
                        },
                        {
                            title: 'Pulmón de manzana',
                            text: 'Superficie no edificable, a nivel de terreno, comprendida entre frentes internos de edificios, destinada a espacio libre que, en un porcentaje no inferior al 50% de su superficie deberá estar constituida por terreno absorbente forestado y parquizado.'
                        },
                    ]
                },
                //Q
                {
                    letter: 'Q',
                    content: [
                        {
                            title: 'Quinta',
                            text: 'Casa de recreo, normalmente ubicada en las afueras.'
                        },
                    ]
                },
                //R
                {
                    letter: 'R',
                    content: [
                        {
                            title: 'Reglas de convivencia',
                            text: 'Estándares de conducta establecidos en el uso y la ocupación de una propiedad en un edificio, que deben respetar todos los propietarios e inquilinos por igual.'
                        },
                        {
                            title: 'Renegociación de contrato',
                            text: 'Acto por el cual se establecen nuevos términos y condiciones sobre  un contrato de locación que se desea extender, que satisfagan tanto al locador, como al locatario.'
                        },
                        {
                            title: 'Reserva de locación',
                            text: 'Documento escrito que ofrece el locatario al locador  en donde figura una suma de dinero, expresada como cheque, que se ofrece en concepto de oferta de locación.'
                        },
                    ]
                },
                //S
                {
                    letter: 'S',
                    content: [
                        {
                            title: 'Síndico',
                            text: 'Sujeto que en una quiebra es el encargado de liquidar el activo y el pasivo del deudor. Persona elegida por una  corporación para cuidar los intereses de la misma.'
                        },
                        {
                            title: 'Sprinklers',
                            text: 'Dispositivos contra incendio dispuestos en el techo,  que se activan ante el humo o el fuego.'
                        },
                        {
                            title: 'Subalquiler',
                            text: 'Un acuerdo de alquiler en donde un locatario alquila a un tercero la propiedad que previamente alquiló, siempre con el consentimiento del locador original. '
                        },
                        {
                            title: 'Suite',
                            text: 'Dormitorio principal con baño individual.'
                        },
                        {
                            title: 'Superficie de alfombra',
                            text: 'Es la superficie que tiene una oficina sin contar los baños, cocina, ni palier del ascensor.'
                        },
                        {
                            title: 'Superficie libre',
                            text: 'Es el porcentaje de terreno que queda libre de edificaciones y no puede ser ocupado, al aplicar a la parcela el Factor de Ocupación del Suelo (FOS) que le corresponde según la zona. El 50% de esta superficie, como mínimo, debe destinarse a terreno absorbente forestado y parquizado. '
                        },
                        {
                            title: 'Superficie propia',
                            text: 'Es la superficie que tiene una oficina teniendo en cuenta la superficie de baños y cocinas. '
                        },
                        {
                            title: 'Superficie total',
                            text: 'Es la superficie total que tiene una propiedad teniendo en cuenta las  áreas comunes del edificio (palieres, escaleras, ascensores, etc.).'
                        },
                    ]
                },
                //T
                {
                    letter: 'T',
                    content: [
                        {
                            title: 'Tasación',
                            text: 'Avalúo. Estimación del valor de mercado de  una propiedad. '
                        },
                        {
                            title: 'Testación',
                            text: 'Acción y efecto de testar,  embargar. '
                        },
                        {
                            title: 'Testador',
                            text: 'Persona que hace un  testamento.'
                        },
                        {
                            title: 'Testaferro',
                            text: 'Persona que presta su nombre en a un asunto ajeno.'
                        },
                        {
                            title: 'Testamentaria',
                            text: 'Ejecución de lo dispuesto en el testamento. Sucesión y caudal de ella durante el tiempo que transcurre desde la muerte del testador hasta que  termina la liquidación y división. Junta de testamentarios. Juicio para inventariar, conservar, liquidar y partir la herencia del testador. '
                        },
                        {
                            title: 'Testamentario / albacea',
                            text: 'Persona encargada por el testador para cumplir su  última voluntad.'
                        },
                        {
                            title: 'Testamento',
                            text: 'Declaración que hace una persona de su última voluntad, en la que dispone de bienes y asuntos que le atañen, para después de su muerte. Documento donde consta en forma legal la voluntad del testador. '
                        },
                        {
                            title: 'Títulos perfectos',
                            text: 'Aquellos títulos que están libres de gravámenes, embargos,  inhibiciones o medidas cautelares.'
                        },
                        {
                            title: 'Toilette',
                            text: 'Baño extra para  visitas.'
                        },
                    ]
                },
                //U
                {
                    letter: 'U',
                    content: [
                        {
                            title: 'Unidad complementaria',
                            text: 'Otro tipo de unidad que compone el inmueble en  propiedad horizontal. Normalmente son las cocheras o bauleras.'
                        },
                        {
                            title: 'Unidad funcional',
                            text: 'Cada una de las unidades de propiedad que componen un inmueble en propiedad horizontal, a la cual le corresponde un porcentual  de las cosas comunes del edificio.'
                        },
                    ]
                },
                //V
                {
                    letter: 'V',
                    content: [
                        {
                            title: 'Valor del m2 en alquiler',
                            text: 'Valor que se calcula dividiendo el precio de alquiler  mensual por la superficie propia del inmueble.'
                        },
                        {
                            title: 'Valor del m2 en venta',
                            text: 'Valor que se calcula dividiendo el precio de venta por la  superficie propia del inmueble. '
                        },
                        {
                            title: 'Verificación documental y normativa',
                            text: 'Son los controles y verificaciones que deben considerarse al momento del cierre de una operación, como la titularidad de los bienes, la existencia de derechos o hipotecas, la correcta clasificación catastral, etc.'
                        },
                    ]
                },
                //W
                {
                    letter: 'W',
                    content: [
                        //
                    ]
                },
                //X
                {
                    letter: 'X',
                    content: [
                        //
                    ]
                },
                //Y
                {
                    letter: 'Y',
                    content: [
                        //
                    ]
                },
                //Z
                {
                    letter: 'Z',
                    content: [
                        {
                            title: 'Zona Comercial',
                            text: 'La destinada a la localización de comercio minorista como uso predominante, y en algunos casos con el uso complementario de administración y servicios; el uso  de vivienda pasa a ser también complementario aún cuando el número de unidades supere en superficie la ocupación comercial de planta baja. '
                        },
                        {
                            title: 'Zona de esparcimiento',
                            text: 'Corresponde áreas destinas a espacios verdes y parquizados  de uso público: plaza, plazoleta y parques.'
                        },
                        {
                            title: 'Zona Industrial',
                            text: 'La destinada a la localización de actividades industriales y  de almacenaje, como uso predominante y a veces exclusivo. '
                        },
                        {
                            title: 'Zona Residencial',
                            text: 'La destinada a la localización de viviendas como uso  predominante y a veces exclusivo, con el fin de garantizar y preservar las buenas condiciones de habitabilidad. '
                        },
                        {
                            title: 'Zonificación',
                            text: 'Es la división por los usos y destinos posibles de la tierra: Residencial, Industrial, y Comercial, que a su  vez se subdividen en varias categorías. '
                        },
                    ]
                },
            ]
            return {
                dictionary: dictionary,
            }
        })
})();
