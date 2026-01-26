package com.pfe.client.repository;

import com.pfe.client.model.ProfileSante;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileSanteRepository extends CassandraRepository<ProfileSante, String> {
    ProfileSante findByClientId(String clientId);
    boolean existsByClientId(String clientId);
    void deleteByClientId(String clientId);
}
