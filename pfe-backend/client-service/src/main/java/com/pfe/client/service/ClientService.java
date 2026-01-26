package com.pfe.client.service;

import com.pfe.client.model.Client;
import com.pfe.client.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.logging.Logger;

@Service
public class ClientService {
    private static final Logger logger = Logger.getLogger(ClientService.class.getName());

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public List<Client> getAllClients() {
        logger.info("[DB] Fetching all clients");
        return clientRepository.findAll();
    }

    public Optional<Client> getClientById(String id) {
        logger.info("[DB] Fetching client by ID: " + id);
        return clientRepository.findByClientId(id);
    }

    public Client register(Client client) {
        logger.info("[DB] Attempting to register email: " + client.getEmail());
        Optional<Client> existing = clientRepository.findByEmail(client.getEmail().toLowerCase());
        if (existing.isPresent()) {
            logger.warning("[DB] Email already exists: " + client.getEmail());
            throw new RuntimeException("Email already exists");
        }

        // Generate UUID for Cassandra TEXT column
        client.setClientId(UUID.randomUUID().toString());
        client.setEmail(client.getEmail().toLowerCase());
        String rawPassword = client.getMotDePasse();
        if (rawPassword == null || rawPassword.isEmpty()) {
            throw new RuntimeException("Password cannot be empty");
        }

        client.setMotDePasse(passwordEncoder.encode(rawPassword));
        Client saved = clientRepository.save(client);
        logger.info("[DB] Successfully saved client with ID: " + saved.getClientId());
        return saved;
    }

    public Optional<Client> login(String email, String password) {
        logger.info("[DB] Login attempt for: " + email);
        String targetEmail = (email != null) ? email.toLowerCase().trim() : "";

        Optional<Client> clientOpt = clientRepository.findByEmail(targetEmail);

        if (clientOpt.isEmpty()) {
            logger.warning("[DB] No client found with email: " + targetEmail);
            return Optional.empty();
        }

        Client client = clientOpt.get();
        boolean matches = passwordEncoder.matches(password, client.getMotDePasse());

        if (matches) {
            logger.info("[DB] Password MATCH for: " + targetEmail);
            return Optional.of(client);
        } else {
            logger.warning("[DB] Password MISMATCH for: " + targetEmail);
            return Optional.empty();
        }
    }

    public void deleteClient(String id) {
        logger.info("[DB] Deleting client with ID: " + id);
        clientRepository.deleteByClientId(id);
        logger.info("[DB] Client deleted: " + id);
    }
}
