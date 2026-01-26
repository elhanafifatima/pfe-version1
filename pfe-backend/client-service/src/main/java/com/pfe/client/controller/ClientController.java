package com.pfe.client.controller;

import com.pfe.client.model.Client;
import com.pfe.client.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/clients")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ClientController {
    
    private static final Logger logger = Logger.getLogger(ClientController.class.getName());

    @Autowired
    private ClientService clientService;
    
    @GetMapping("/health")
    public String health() {
        return "Client Service is UP";
    }

    @GetMapping
    public List<Client> getAll() {
        return clientService.getAllClients();
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Client client) {
        logger.info("Registering user: " + client.getEmail());
        try {
            Client saved = clientService.register(client);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } catch (Exception e) {
            logger.warning("Registration failed for " + client.getEmail() + ": " + e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        logger.info("Login attempt for email: " + email);
        
        Optional<Client> client = clientService.login(email, credentials.get("password"));
        if (client.isPresent()) {
            logger.info("Login SUCCESS for: " + email);
            return ResponseEntity.ok(client.get());
        }
        logger.warning("Login FAILED for: " + email);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid email or password"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Client> getProfile(@PathVariable String id) {
        return clientService.getClientById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
}

