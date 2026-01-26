package com.pfe.client.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.pfe.client.model.ProfileSante;
import com.pfe.client.repository.ProfileSanteRepository;

@Service
public class ProfileSanteService {

    private final ProfileSanteRepository profileSanteRepository;

    @Autowired
    public ProfileSanteService(ProfileSanteRepository profileSanteRepository) {
        this.profileSanteRepository = profileSanteRepository;
    }

    public ProfileSante createOrUpdateProfileSante(ProfileSante profileSante) {
        ProfileSante existingProfile = profileSanteRepository.findByClientId(profileSante.getClientId());
        if (existingProfile != null) {
            existingProfile.setName(profileSante.getName());
            existingProfile.setPoids(profileSante.getPoids());
            existingProfile.setTaille(profileSante.getTaille());
            existingProfile.setAge(profileSante.getAge());
            existingProfile.setSexe(profileSante.getSexe());
            existingProfile.setAllergies(profileSante.getAllergies());
            existingProfile.setObjectifsSante(profileSante.getObjectifsSante());
            existingProfile.setNiveauActivite(profileSante.getNiveauActivite());
            existingProfile.setMaladies(profileSante.getMaladies());
            return profileSanteRepository.save(existingProfile);
        }
        return profileSanteRepository.save(profileSante);
    }

    public ProfileSante getProfileSante(String clientId) {
        ProfileSante profile = profileSanteRepository.findByClientId(clientId);
        if (profile == null) throw new RuntimeException("Aucun profil de santé trouvé pour ce client");
        return profile;
    }

    public boolean hasProfileSante(String clientId) {
        return profileSanteRepository.existsByClientId(clientId);
    }

    public void deleteProfileSante(String clientId) {
        if (!profileSanteRepository.existsByClientId(clientId)) 
            throw new RuntimeException("Aucun profil de santé trouvé pour ce client");
        profileSanteRepository.deleteByClientId(clientId);
    }
}
