package com.pfe.product.model;

import org.springframework.data.cassandra.core.mapping.CassandraType;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

@Table("Produit")
public class Product {

    @PrimaryKey
    private String id;
    
    private String nom;
    private float prix;
    private String description;
    private float categories;

    @CassandraType(type = CassandraType.Name.UDT, userTypeName = "nutrition")
    private Nutrition informationsNutritionnelles;

    public Product() {}

    public Product(String id, String nom, float prix, String description, float categories, Nutrition informationsNutritionnelles) {
        this.id = id;
        this.nom = nom;
        this.prix = prix;
        this.description = description;
        this.categories = categories;
        this.informationsNutritionnelles = informationsNutritionnelles;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }
    public float getPrix() { return prix; }
    public void setPrix(float prix) { this.prix = prix; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public float getCategories() { return categories; }
    public void setCategories(float categories) { this.categories = categories; }
    public Nutrition getInformationsNutritionnelles() { return informationsNutritionnelles; }
    public void setInformationsNutritionnelles(Nutrition informationsNutritionnelles) { this.informationsNutritionnelles = informationsNutritionnelles; }
}
