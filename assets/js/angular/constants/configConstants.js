(function () {
    angular.module('okeefeSite.constants', [])
        .constant('API_CLIENT_AUTH', 'http://auth.okeefe.com.ar/api/')
        //.constant('API_CLIENT_AUTH', 'http://localhost:8080/api/')
        .constant('API_SEARCH', 'http://search.okeefe.com.ar/api/v1/')
        //.constant('API_SEARCH', 'http://localhost:3000/api/v1/')
        .constant('SITE_URL', 'http://sitio.okeefe.com.ar/#/')
        //.constant('SITE_URL', 'http://localhost:8080/Lyncros/Okeefe/okeefe/#/')
        .constant('API_OKEEFE', 'http://crm.okeefe.com.ar/api/v1/external-source/contacts');
})();