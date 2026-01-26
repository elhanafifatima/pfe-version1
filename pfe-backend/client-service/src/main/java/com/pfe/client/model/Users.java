package com.pfe.client.model;

import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;
import org.springframework.data.cassandra.core.mapping.Column;

@Table("Users")
public class Users {

    @PrimaryKey
    private String id;

    @Column("email")
    private String email;

    @Column("mot_de_passe")
    private String motDePasse;

    @Column("statut")
    private String statut;

    @Column("nom")
    private String nom;

    @Column("prenom")
    private String prenom;

    // 🔹 Constructors
    public Users() {
    }

    public Users(String id, String email, String motDePasse, String statut, String nom, String prenom) {
        this.id = id;
        this.email = email;
        this.motDePasse = motDePasse;
        this.statut = statut;
        this.nom = nom;
        this.prenom = prenom;
    }

    // 🔹 Getters & Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMotDePasse() {
        return motDePasse;
    }

    public void setMotDePasse(String motDePasse) {
        this.motDePasse = motDePasse;
    }

    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }
}
