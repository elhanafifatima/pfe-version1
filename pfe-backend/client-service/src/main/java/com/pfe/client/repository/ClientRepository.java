package com.pfe.client.repository;

import com.pfe.client.model.Client;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.data.cassandra.repository.AllowFiltering;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ClientRepository extends CassandraRepository<Client, String> {
    @AllowFiltering
    Optional<Client> findByEmail(String email);
    Optional<Client> findByClientId(String clientId);
    void deleteByClientId(String clientId);
}
