package com.pfe.client.model;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.cassandra.core.mapping.Table;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;

@Table("profilesante")
public class ProfileSante {

    @PrimaryKey
    private String id;

    private String name;

    private float poids;

    private float taille;

    private Set<String> maladies;

    private String objectifsSante;

    private int age;

    private String sexe;

    private Set<String> allergies;

    private String niveauActivite;

    private String clientId;

    // 🔹 Default constructor (required by Jackson)
    public ProfileSante() {}

    // 🔹 All-args constructor
    public ProfileSante(String id, String name, float poids, float taille, Set<String> maladies,
                        String objectifsSante, int age, String sexe, Set<String> allergies,
                        String niveauActivite, String clientId) {
        this.id = id;
        this.name = name;
        this.poids = poids;
        this.taille = taille;
        this.maladies = maladies;
        this.objectifsSante = objectifsSante;
        this.age = age;
        this.sexe = sexe;
        this.allergies = allergies;
        this.niveauActivite = niveauActivite;
        this.clientId = clientId;
    }

    // 🔹 Getters & Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public float getPoids() { return poids; }
    public void setPoids(float poids) { this.poids = poids; }

    public float getTaille() { return taille; }
    public void setTaille(float taille) { this.taille = taille; }

    public Set<String> getMaladies() { return maladies; }
    public void setMaladies(Set<String> maladies) { this.maladies = maladies; }

    public String getObjectifsSante() { return objectifsSante; }
    public void setObjectifsSante(String objectifsSante) { this.objectifsSante = objectifsSante; }

    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }

    public String getSexe() { return sexe; }
    public void setSexe(String sexe) { this.sexe = sexe; }

    public Set<String> getAllergies() { return allergies; }
    public void setAllergies(Set<String> allergies) { this.allergies = allergies; }

    public String getNiveauActivite() { return niveauActivite; }
    public void setNiveauActivite(String niveauActivite) { this.niveauActivite = niveauActivite; }

    public String getClientId() { return clientId; }
    public void setClientId(String clientId) { this.clientId = clientId; }
}
