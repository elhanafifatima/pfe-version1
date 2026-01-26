package com.pfe.product.model;

import org.springframework.data.cassandra.core.mapping.UserDefinedType;

@UserDefinedType("nutrition")
public class Nutrition {
    private float calories;
    private float proteines;
    private float lipides;
    private float glucides;

    public Nutrition() {}

    public Nutrition(float calories, float proteines, float lipides, float glucides) {
        this.calories = calories;
        this.proteines = proteines;
        this.lipides = lipides;
        this.glucides = glucides;
    }

    public float getCalories() { return calories; }
    public void setCalories(float calories) { this.calories = calories; }
    public float getProteines() { return proteines; }
    public void setProteines(float proteines) { this.proteines = proteines; }
    public float getLipides() { return lipides; }
    public void setLipides(float lipides) { this.lipides = lipides; }
    public float getGlucides() { return glucides; }
    public void setGlucides(float glucides) { this.glucides = glucides; }
}
