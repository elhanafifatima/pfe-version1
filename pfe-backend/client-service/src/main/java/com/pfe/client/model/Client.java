package com.pfe.client.model;

import java.time.Instant;
import java.util.Map;

import org.springframework.data.cassandra.core.mapping.Table;
import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;


@Table("Client")
public class Client {

    @PrimaryKey
    private String clientId;

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

    @Column("dateinscription")
    private Instant dateInscription;

    @Column("profile")
    private ProfileSante profile;

    @Column("panier")
    private Map<String, Integer> panier;

    // 🔹 Constructors
    public Client() {
    }


    // 🔹 Getters & Setters
    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
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

    public Instant getDateInscription() {
        return dateInscription;
    }

    public void setDateInscription(Instant dateInscription) {
        this.dateInscription = dateInscription;
    }

    public ProfileSante getProfile() {
        return profile;
    }

    public void setProfile(ProfileSante profile) {
        this.profile = profile;
    }

    public Map<String, Integer> getPanier() {
        return panier;
    }

    public void setPanier(Map<String, Integer> panier) {
        this.panier = panier;
    }
}
