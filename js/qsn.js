$(document).ready(function () {

        $.ajax({
        url: 'https://opendata.agencebio.org/api/gouv/operateurs?siret=79317749400028',
        type: "GET",
        success: function (data) {
            // Traitement des données en cas de succès
            let message = "Notre restaurant travaille avec des produits locaux provenant de la ferme bio numéro " + data.items[0].numeroBio +
                " de Monsieur " + data.items[0].gerant + " située à l’adresse " + data.items[0].adressesOperateurs[0].lieu + " " + data.items[0].adressesOperateurs[0].codePostal + " " + data.items[0].adressesOperateurs[0].ville + ". Cette ferme intervient dans les commerces :";

            // Add each production to the message
            data.items[0].productions.forEach(function(production) {
                message += "<br>- " + production.nom;
            });

            // Affiche le message sur le paragraphe avec l'ID "message"
            $('#message').html(message);
        },
        error: function (xhr, status, error) {
            // Gestion des erreurs
            console.error("Erreur lors de la requête :", status, error);
        }
    });

});
