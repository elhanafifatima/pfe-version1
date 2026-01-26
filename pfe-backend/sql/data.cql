-- Insertion d'utilisateurs de test
INSERT INTO Users (id, email, mot_de_passe, statut, nom, prenom)
VALUES (toString(uuid()), 'test@example.com', '$2a$10$XptfskLsT1SL/bOzZLzJLeORoVj7tBBAipEM5fOLKFJcdRWN6FhQa', 'client', 'John', 'Doe') IF NOT EXISTS;

INSERT INTO Users (id, email, mot_de_passe, statut, nom, prenom)
VALUES (toString(uuid()), 'fatima@example.com', 'password123', 'client', 'Elhanafi', 'Fatima');

INSERT INTO Users (id, email, mot_de_passe, statut, nom, prenom)
VALUES (toString(uuid()), 'ahmed@example.com', 'secret321', 'client', 'Benali', 'Ahmed');

INSERT INTO Admin (id, niveauAcces)
VALUES (toString(uuid()), 'superadmin');

INSERT INTO ProfileSante (id, poids, taille, maladies, objectifsSante, age, sexe, allergies, niveauActivite)
VALUES (toString(uuid()), 70, 1.60, {'diabetes'}, 'Perte de poids', 18, 'F', 'aucune', 'moyen');

INSERT INTO ProfileSante (id, poids, taille, maladies, objectifsSante, age, sexe, allergies, niveauActivite)
VALUES (toString(uuid()), 80, 1.75, {}, 'Gain de muscle', 25, 'M', 'arachides', 'élevé');

INSERT INTO Panier (idPanier, dateCreation, statut)
VALUES (toString(uuid()), toTimestamp(now()), 'en cours');

INSERT INTO Panier (idPanier, dateCreation, statut)
VALUES (toString(uuid()), toTimestamp(now()), 'terminé');

INSERT INTO Client (id, email, dateInscription, profile, panier)
VALUES (
    toString(uuid()), 
    'fatima@example.com', 
    toTimestamp(now()), 
    {poids:70, taille:1.60, maladies:{'diabetes'}, objectifsSante:'Perte de poids', age:18, sexe:'F', allergies:'aucune', niveauActivite:'moyen'}, 
    {idPanier:toString(uuid()), dateCreation:toTimestamp(now()), statut:'en cours'}
);

INSERT INTO Client (id, email, dateInscription, profile, panier)
VALUES (
    toString(uuid()), 
    'ahmed@example.com', 
    toTimestamp(now()), 
    {poids:80, taille:1.75, maladies:{}, objectifsSante:'Gain de muscle', age:25, sexe:'M', allergies:'arachides', niveauActivite:'élevé'}, 
    {idPanier:toString(uuid()), dateCreation:toTimestamp(now()), statut:'terminé'}
);

INSERT INTO Produit (id, nom, prix, description, categories, informationsNutritionnelles)
VALUES (
    toString(uuid()), 'Jus d’orange', 3.5, 'Jus frais pressé', 1, {calories:45, proteines:1, lipides:0, glucides:10}
);

INSERT INTO Produit (id, nom, prix, description, categories, informationsNutritionnelles)
VALUES (
    toString(uuid()), 'Barre protéinée', 2.0, 'Barre énergétique', 2, {calories:250, proteines:20, lipides:8, glucides:15}
);

INSERT INTO Recette (id, titre, instructions, tempPreparation, ingredients)
VALUES (
    toString(uuid()), 'Smoothie Banane-Fraise', 'Mixer tous les ingrédients', 5, 'Banane, Fraises, Lait'
);

INSERT INTO Recette (id, titre, instructions, tempPreparation, ingredients)
VALUES (
    toString(uuid()), 'Salade César', 'Mélanger la salade avec la sauce et le poulet', 10, 'Salade, Poulet, Sauce César, Croûtons'
);

INSERT INTO CategoriesSante (id, nom, description)
VALUES (toString(uuid()), 'Diabète', 'Produits adaptés pour les diabétiques');

INSERT INTO CategoriesSante (id, nom, description)
VALUES (toString(uuid()), 'Perte de poids', 'Produits et recettes pour perdre du poids');

INSERT INTO Conversation (id, contenu, dateTime, utilisateur)
VALUES (
    toString(uuid()), 
    'Bonjour, j’ai une question sur mon panier.', 
    toTimestamp(now()), 
    {id:toString(uuid()), nom:'Elhanafi', prenom:'Fatima', email:'fatima@example.com'}
);
