package com.pfe.client.controller;

import com.pfe.client.model.ProfileSante;
import com.pfe.client.service.ProfileSanteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile-sante")
@CrossOrigin(origins = "*")
public class ProfileSanteController {

    private final ProfileSanteService ProfileSanteService;

    @Autowired
    public ProfileSanteController(ProfileSanteService ProfileSanteService) {
        this.ProfileSanteService = ProfileSanteService;
    }

    @PostMapping
    public ResponseEntity<ProfileSante> createOrUpdate(@RequestBody ProfileSante profile) {
        return ResponseEntity.ok(ProfileSanteService.createOrUpdateProfileSante(profile));
    }

    @GetMapping("/{clientId}")
    public ResponseEntity<ProfileSante> getProfile(@PathVariable String clientId) {
        try {
            System.out.println(">>>>>>>>>>>>>>>>>>>>>>>> clientId : "+ clientId);

            return ResponseEntity.ok(ProfileSanteService.getProfileSante(clientId));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{clientId}/exists")
    public ResponseEntity<Boolean> checkExists(@PathVariable String clientId) {
        return ResponseEntity.ok(ProfileSanteService.hasProfileSante(clientId));
    }
}
