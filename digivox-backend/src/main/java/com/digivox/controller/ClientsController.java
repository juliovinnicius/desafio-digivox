package com.digivox.controller;

import com.digivox.model.Client;
import com.digivox.repositories.ClientRepository;
import com.digivox.util.CustomErrorType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ClientsController {
    @Autowired
    private ClientRepository clientRepository;

    @RequestMapping(value = "/clients", method = RequestMethod.GET)
    public ResponseEntity<?> listClients() {
        List<Client> clients = new ArrayList<>();
        clients = clientRepository.findAll();

        return new ResponseEntity<List<Client>>(clients, HttpStatus.OK);
    }

    @RequestMapping(value = "/client/", method = RequestMethod.POST)
    public ResponseEntity<?> createClient(@RequestBody Client client, UriComponentsBuilder ucBuilder) {

        //Optional<Client> clients = clientRepository.findById(client.getId());
        Client clients = clientRepository.findByCpf(client.getCpf());

        // Cliente não encontrado
        if (clients != null) {
            return new ResponseEntity<CustomErrorType>(new CustomErrorType("O Cliente " + client.getName() +
                    " ja esta cadastrado!"), HttpStatus.BAD_REQUEST);
        }


        clientRepository.save(client);
        return new ResponseEntity<Client>(client, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/client/{id}", method = RequestMethod.PUT)
    public ResponseEntity<?> updateClient(@PathVariable("id") long id, @RequestBody Client client) {

        Optional<Client> optionalClient = clientRepository.findById(id);


        if (!optionalClient.isPresent()) {
            return new ResponseEntity<CustomErrorType>(new CustomErrorType("Cliente não encontrado"),
                    HttpStatus.NOT_FOUND);
        }

        Client currentClient = optionalClient.get();

        currentClient.setName(client.getName());
        currentClient.setCpf(client.getCpf());

        clientRepository.save(currentClient);

        return new ResponseEntity<Client>(currentClient, HttpStatus.OK);
    }

    @RequestMapping(value = "/client/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteClient(@PathVariable("id") long id) {

        Optional<Client> optionalClient = clientRepository.findById(id);

        if (!optionalClient.isPresent()) {
            return new ResponseEntity<CustomErrorType>(new CustomErrorType("Cliente com o id: " + id + " não encontrado"),
                    HttpStatus.NOT_FOUND);
        }

        clientRepository.delete(optionalClient.get());

        return new ResponseEntity<Client>(HttpStatus.NO_CONTENT);
    }
}
