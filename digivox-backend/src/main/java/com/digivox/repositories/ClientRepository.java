package com.digivox.repositories;

import com.digivox.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClientRepository extends JpaRepository<Client, Long> {
    Client findByCpf(String cpf);
}
