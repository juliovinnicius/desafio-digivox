package com.digivox.controller;

import com.digivox.DTO.ActionDTO;
import com.digivox.DTO.DashboardDTO;
import com.digivox.DTO.RentDTO;
import com.digivox.DTO.ReservationDTO;
import com.digivox.model.Book;
import com.digivox.model.Client;
import com.digivox.repositories.BookRepository;
import com.digivox.repositories.ClientRepository;
import com.digivox.util.CustomErrorType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class BooksController {
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private ClientRepository clientRepository;


    @RequestMapping(value = "/dashboard", method = RequestMethod.GET)
    public ResponseEntity<?> listDashboard() {
        List<Book> books = new ArrayList<>();
        books = bookRepository.findAll();

        DashboardDTO dashboardDTO = new DashboardDTO(books);

        return new ResponseEntity<DashboardDTO>(dashboardDTO , HttpStatus.OK);
    }

    @RequestMapping(value = "/books", method = RequestMethod.GET)
    public ResponseEntity<?> listBooks() {
        List<Book> books = new ArrayList<>();
        books = bookRepository.findAll();

        return new ResponseEntity<List<Book>>(books , HttpStatus.OK);
    }

    @RequestMapping(value = "/book/", method = RequestMethod.POST)
    public ResponseEntity<?> createBook(@RequestBody Book book, UriComponentsBuilder ucBuilder) {

        book.changeStatus();

        bookRepository.save(book);

        return new ResponseEntity<Book>(book, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/book/{id}", method = RequestMethod.PUT)
    public ResponseEntity<?> updateBook(@PathVariable("id") long id, @RequestBody Book book) {

        Optional<Book> optionalBook = bookRepository.findById(id);


        if (!optionalBook.isPresent()) {
            return new ResponseEntity<CustomErrorType>(new CustomErrorType("Livro não encontrado"),
                    HttpStatus.NOT_FOUND);
        }

        Book currentBook = optionalBook.get();

        currentBook.setTitle(book.getTitle());
        currentBook.setAuthor(book.getAuthor());
        currentBook.setEdition(book.getEdition());
        currentBook.setPrice(book.getPrice());
        currentBook.changeStatus();

        bookRepository.save(currentBook);

        return new ResponseEntity<Book>(currentBook, HttpStatus.OK);
    }

    @RequestMapping(value = "/book/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteBook(@PathVariable("id") long id) {

        Optional<Book> optionalBook = bookRepository.findById(id);

        if (!optionalBook.isPresent()) {
            return new ResponseEntity<CustomErrorType>(new CustomErrorType("O livro com o id: " + id + " não encontrado"),
                    HttpStatus.NOT_FOUND);
        }

        bookRepository.delete(optionalBook.get());

        return new ResponseEntity<Book>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value = "/book/{id}/rent", method = RequestMethod.PUT)
    public ResponseEntity<?> bookRent(@PathVariable("id") long id, @RequestBody RentDTO rentDTO) {

        String cpf = rentDTO.getCpf();
        Optional<Book> optionalBook = bookRepository.findById(id);
        Client currentClient = clientRepository.findByCpf(cpf);

        if (!optionalBook.isPresent()) {
            return new ResponseEntity<CustomErrorType>(new CustomErrorType("O livro com o id: " + id + " não encontrado"),
                    HttpStatus.NOT_FOUND);
        }
        if (currentClient == null){
            return new ResponseEntity<CustomErrorType>(new CustomErrorType("O client com o cpf: " + cpf + " não encontrado"),
                    HttpStatus.NOT_FOUND);
        }

        Book currentBook = optionalBook.get();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("d/MM/yyyy");
        LocalDate rentDate = LocalDate.parse(rentDTO.getRentDate(), formatter);
        LocalDate endDate = LocalDate.parse(rentDTO.getEndDate(), formatter);

        if(currentBook.getReturnDate() != null){
            return new ResponseEntity<CustomErrorType>(new CustomErrorType("O livro com o id: " + id + " ainda está alugado"),
                    HttpStatus.NOT_FOUND);
        }
        if(currentBook.getRentalDate() != null){
            return new ResponseEntity<CustomErrorType>(new CustomErrorType("O livro com o id: " + id + " ainda está alugado"),
                    HttpStatus.NOT_FOUND);
        }
        else if(rentDate == null ){
            return new ResponseEntity<CustomErrorType>(new CustomErrorType("Não foi encontrada a data do aluguel"),
                    HttpStatus.NOT_FOUND);
        }
        else if(endDate == null ){
            return new ResponseEntity<CustomErrorType>(new CustomErrorType("Não foi encontrada a data do retorno"),
                    HttpStatus.NOT_FOUND);
        }
        else if(rentDate.compareTo(endDate) > 0 ){
            return new ResponseEntity<CustomErrorType>(new CustomErrorType("A data de aluguel, precisa ser anterior a data do retorno"),
                    HttpStatus.NOT_FOUND);
        }
        else if(currentBook.getReservetionDate() != null) {
            if (endDate.compareTo(currentBook.getReservetionDate()) > 0 && rentDate.compareTo(currentBook.getReservetionDate()) < 0) {
                return new ResponseEntity<CustomErrorType>(new CustomErrorType("O livro está reservado para data" + currentBook.getReservetionDate()),
                        HttpStatus.CONFLICT);
            }
        }

        currentBook.setRentalDate(rentDate);
        currentBook.setReturnDate(endDate);
        currentBook.changeStatus();
        currentClient.addBook(currentBook);
        bookRepository.save(currentBook);
        clientRepository.save(currentClient);

        return new ResponseEntity<Book>(currentBook, HttpStatus.OK);
    }

    @RequestMapping(value = "/book/{id}/devolution", method = RequestMethod.PUT)
    public ResponseEntity<?> bookDevolution(@PathVariable("id") long id, @RequestBody ActionDTO actionDTO) {

        String cpf = actionDTO.getCpf();

        Optional<Book> optionalBook = bookRepository.findById(id);
        Client currentClient = clientRepository.findByCpf(cpf);

        if (!optionalBook.isPresent()) {
            return new ResponseEntity<CustomErrorType>(new CustomErrorType("O livro com o id: " + id + " não encontrado"),
                    HttpStatus.NOT_FOUND);
        }
        if (currentClient == null){
            return new ResponseEntity<CustomErrorType>(new CustomErrorType("O client com o cpf: " + cpf + " não encontrado"),
                    HttpStatus.NOT_FOUND);
        }

        Book currentBook = optionalBook.get();

        if(currentBook.getReturnDate() == null){
            return new ResponseEntity<CustomErrorType>(new CustomErrorType("O livro com o id: " + id + " ainda está alugado"),
                    HttpStatus.NOT_FOUND);
        }
        if(currentBook.getRentalDate() == null){
            return new ResponseEntity<CustomErrorType>(new CustomErrorType("O livro com o id: " + id + " ainda está alugado"),
                    HttpStatus.NOT_FOUND);
        }

        currentBook.setRentalDate(null);
        currentBook.setReturnDate(null);
        currentBook.changeStatus();
        currentClient.removeBook(currentBook);
        bookRepository.save(currentBook);
        clientRepository.save(currentClient);

        return new ResponseEntity<Book>(currentBook, HttpStatus.OK);
    }

    @RequestMapping(value = "/book/{id}/reservation", method = RequestMethod.PUT)
    public ResponseEntity<?> bookReservation(@PathVariable("id") long id, @RequestBody ReservationDTO reservationDTO) {

        Optional<Book> optionalBook = bookRepository.findById(id);

        if (!optionalBook.isPresent()) {
            return new ResponseEntity<CustomErrorType>(new CustomErrorType("O livro com o id: " + id + " não encontrado"),
                    HttpStatus.NOT_FOUND);
        }

        Book currentBook = optionalBook.get();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("d/MM/yyyy");
        LocalDate reservationDate = LocalDate.parse(reservationDTO.getReservationDate(), formatter);

        if (reservationDate == null) {
            return new ResponseEntity<CustomErrorType>(new CustomErrorType("Não foi encontrada a data do aluguel"),
                    HttpStatus.NOT_FOUND);
        }
        else if (currentBook.getRentalDate() != null && currentBook.getReturnDate() != null){
            if (currentBook.getReturnDate().compareTo(reservationDate) > 0 && currentBook.getRentalDate().compareTo(reservationDate) < 0) {
                return new ResponseEntity<CustomErrorType>(new CustomErrorType("O livro estará alugado até a data" + currentBook.getReturnDate()),
                        HttpStatus.CONFLICT);
            }
        }

        currentBook.setReservetionDate(reservationDate);
        currentBook.changeStatus();

        bookRepository.save(currentBook);

        return new ResponseEntity<Book>(currentBook, HttpStatus.OK);
    }

    @RequestMapping(value = "/book/{id}/cancel-reservation", method = RequestMethod.PUT)
    public ResponseEntity<?> cancelBookReservation(@PathVariable("id") long id, @RequestBody Book book) {

        Optional<Book> optionalBook = bookRepository.findById(id);

        if (!optionalBook.isPresent()) {
            return new ResponseEntity<CustomErrorType>(new CustomErrorType("O livro com o id: " + id + " não encontrado"),
                    HttpStatus.NOT_FOUND);
        }

        Book currentBook = optionalBook.get();


        if (currentBook.getReservetionDate() == null) {
            return new ResponseEntity<CustomErrorType>(new CustomErrorType("Não foi encontrada a data da reserva"),
                    HttpStatus.NOT_FOUND);
        }

        currentBook.setReservetionDate(null);
        currentBook.changeStatus();

        bookRepository.save(currentBook);

        return new ResponseEntity<Book>(currentBook, HttpStatus.OK);
    }
}
