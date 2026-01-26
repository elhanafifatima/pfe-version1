CREATE KEYSPACE IF NOT EXISTS vitalis_keyspace
WITH replication = {
    'class': 'SimpleStrategy',
    'replication_factor': '1'
};

USE vitalis_keyspace;

CREATE TYPE IF NOT EXISTS NUTRITION (
    calories float,
    proteines float,
    lipides float,
    glucides float
);

CREATE TYPE IF NOT EXISTS PROFILE_SANTE (
    poids float,
    taille float,
    maladies set<text>,
    objectifsSante text,
    age int,
    sexe text,
    allergies text,
    niveauActivite text
);

CREATE TYPE IF NOT EXISTS PANIER (
    idPanier TEXT,
    dateCreation timestamp,
    statut text
);

CREATE TABLE IF NOT EXISTS Users (
    id TEXT PRIMARY KEY,
    email TEXT,
    mot_de_passe TEXT,
    statut TEXT,
    nom TEXT,
    prenom TEXT
);

CREATE TABLE IF NOT EXISTS Admin (
    id TEXT PRIMARY KEY,
    niveauAcces TEXT
);

CREATE TABLE IF NOT EXISTS Client (
    clientId TEXT PRIMARY KEY,
    email TEXT,
    dateInscription timestamp,
    profile frozen<PROFILE_SANTE>,
    panier frozen<PANIER>
);

CREATE INDEX IF NOT EXISTS ON Client (email);

CREATE TABLE IF NOT EXISTS Produit (
    id TEXT PRIMARY KEY,
    nom TEXT,
    prix float,
    description TEXT,
    categories float,
    informationsNutritionnelles frozen<NUTRITION>
);

CREATE TABLE IF NOT EXISTS Recette (
    id TEXT PRIMARY KEY,
    titre TEXT,
    instructions TEXT,
    tempPreparation INT,
    ingredients TEXT
);

CREATE TABLE IF NOT EXISTS CategoriesSante (
    id TEXT PRIMARY KEY,
    nom TEXT,
    description TEXT
);

CREATE TABLE IF NOT EXISTS ProfileSante (
    id TEXT PRIMARY KEY,
    name TEXT,
    poids float,
    taille float,
    maladies set<TEXT>,
    objectifsSante TEXT,
    age INT,
    sexe TEXT,
    allergies TEXT,
    niveauActivite TEXT,
    clientId TEXT
);

CREATE TABLE IF NOT EXISTS Panier (
    idPanier TEXT PRIMARY KEY,
    dateCreation timestamp,
    statut TEXT
);

CREATE TABLE IF NOT EXISTS Conversation (
    id TEXT PRIMARY KEY,
    contenu TEXT,
    dateTime timestamp,
    utilisateur frozen<UTILISATEUR>
);
