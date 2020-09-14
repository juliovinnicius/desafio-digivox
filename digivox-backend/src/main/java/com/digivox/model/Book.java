package com.digivox.model;

import com.digivox.model.enums.BookStatus;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;
import java.util.Objects;

/*
 * Attributes
 * id
 * title
 * author
 * status
 * date*/
@Entity
public class Book implements Serializable {
    @Id
    @GeneratedValue
    private Long id;
    private String title;
    private String author;
    private BookStatus status;
    private LocalDate reservetionDate;
    private LocalDate rentalDate;
    private LocalDate returnDate;
    private String edition;
    private double price;

    public Book(){}

    public Book(Long id, String title, String author,String edition, double price) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.status = BookStatus.AVAILABLE;
        this.edition = edition;
        this.price = price;
    }

    public void changeStatus(){
        if (this.returnDate != null){
            this.setStatus(BookStatus.RENTED);
        }
        else if(this.reservetionDate != null){
            this.setStatus(BookStatus.RESERVED);
        }
        else {
            this.setStatus(BookStatus.AVAILABLE);
        }
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public BookStatus getStatus() {
        return status;
    }

    public void setStatus(BookStatus status) {
        this.status = status;
    }

    public LocalDate getReservetionDate() {
        return reservetionDate;
    }

    public void setReservetionDate(LocalDate reservetionDate) {
        this.reservetionDate = reservetionDate;
    }

    public LocalDate getRentalDate() {
        return rentalDate;
    }

    public void setRentalDate(LocalDate rentalDate) {
        this.rentalDate = rentalDate;
    }

    public LocalDate getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(LocalDate returnDate) {
        this.returnDate = returnDate;
    }

    public String getEdition() {
        return edition;
    }

    public void setEdition(String edition) {
        this.edition = edition;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Book book = (Book) o;
        return Double.compare(book.price, price) == 0 &&
                Objects.equals(id, book.id) &&
                Objects.equals(title, book.title) &&
                Objects.equals(author, book.author) &&
                status == book.status &&
                Objects.equals(reservetionDate, book.reservetionDate) &&
                Objects.equals(rentalDate, book.rentalDate) &&
                Objects.equals(returnDate, book.returnDate) &&
                Objects.equals(edition, book.edition);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, author, status, reservetionDate, rentalDate, returnDate, edition, price);
    }

    @Override
    public String toString() {
        return "Book{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", author='" + author + '\'' +
                ", status=" + status +
                ", reservetionDate=" + reservetionDate +
                ", rentalDate=" + rentalDate +
                ", returnDate=" + returnDate +
                ", edition='" + edition + '\'' +
                ", price=" + price +
                '}';
    }
}
