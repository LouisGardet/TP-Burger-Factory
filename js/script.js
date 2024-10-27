/*
function afficherDiaporama() {
    var diaporama = document.getElementById("diaporama");
    var images = diaporama.querySelectorAll("img");
    var index = 0;

    setInterval(function() {
        index = (index + 1) % images.length;
        images[index].style.display = "block";
        images[index - 1].style.display = "none";
    }, 10000);
}

window.onload = afficherDiaporama;
*/

//Page Accueil
let count = 0;
setInterval(function () {
    let images = ["img/Diabetik.jpg", "img/Le brioché.jpg", "img/Le frais.jpg"];

    // Reset le compteur
    if (count > images.length) {
        count = 0
    }


    $("#burgerImage").attr("src", images[count]);

    let burgerName = images[count];
    burgerName = burgerName.replace("img/", "").replace(".jpg", "");
    $("#burgerImage").attr("alt", burgerName);
    // Changer le texte
    $("#nameBurger").text(burgerName);
    $("#nameBurger").addClass("displayNone");
    count++
}, 5000);

function showBurgerName() {
    $("#nameBurger").removeClass("displayNone")
}

$("#burgerImage").on("click", showBurgerName)

// -----------------------------

// Création ingrédient
$("#ajouter").on("click", function () {
    // Récupérer les éléments indiqués dans le formulaire nom et quantité
    let name = $("#nom").val();
    let quantity = $("#quantite").val();

    // Vérification des champs si null ou vide
    if (name === "" || quantity == null || quantity <= 0) {
        $(".error-message").text("Veuillez remplir correctement les champs.").show();
        return;
    }

    // Recupère le localstorage pour savoir s'il y a déjà des ingrédients
    let ingredients = JSON.parse(localStorage.getItem("ingredients")) || [];
    let existingIngredient = undefined;

    for (const ingredient of ingredients) {
        if (ingredient.name === name) {
            existingIngredient = ingredient;
            break;
        }
    }

    if (existingIngredient !== undefined) {
        // Si oui, on ajoute la quantité à l'ingrédient existant
        existingIngredient.quantity += Number(quantity);
    } else {
        // Si non, on crée et ajoute l'ingrédient à la liste
        let ingredient = {name: name, quantity: Number(quantity)};
        ingredients.push(ingredient);
    }

    // On enregistre la liste dans le localstorage
    localStorage.setItem("ingredients", JSON.stringify(ingredients));

    showIngredients();
});

showIngredients();

// Afficher la liste des ingrédients dans la page html
function showIngredients() {
    let ingredients = JSON.parse(localStorage.getItem("ingredients")) || [];

    // On vide la liste
    $("#listeIngredients").empty();

    // On ajoute les ingrédients récupérés à la liste
    for (const ingredient of ingredients) {
        const newOption = $("<option>").text(`- ${ingredient.name} (${ingredient.quantity})`);
        $("#listeIngredients").append(newOption);
    }
}

// -----------------------------

// Création burger
