package com.digivox.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import javax.persistence.*;
import java.io.Serializable;
import java.util.*;

/*
 * Atributos
 * id-
 * name-
 * cpf-
 * book - map(id livro)
 * */
@Entity
@JsonDeserialize
public class Client implements Serializable {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String cpf;

    @OneToMany
    private List<Book> books;

    public Client(){
        this.books = new ArrayList<>();
    }

    public Client(Long id, String name, String cpf) {
        this.id = id;
        this.name = name;
        this.cpf = cpf;
        this.books = new ArrayList<>();
    }

    public Client(Long id, String name, String cpf, List<Book> books) {
        this.id = id;
        this.name = name;
        this.cpf = cpf;
        this.books = books;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public List<Book> getBooks() {
        return books;
    }

    public void setBooks(List<Book> books) {
        this.books = books;
    }

    public void addBook(Book book){
        this.books.add(book);
    }

    public void removeBook(Book book){
        this.books.remove(book);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Client client = (Client) o;
        return id.equals(client.id) &&
                name.equals(client.name) &&
                cpf.equals(client.cpf) &&
                Objects.equals(books, client.books);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, cpf, books);
    }
}
