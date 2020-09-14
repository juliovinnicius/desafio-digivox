package com.digivox.DTO;

import com.digivox.model.Book;
import com.digivox.model.enums.BookStatus;

import java.time.LocalDate;
import java.time.Period;
import java.util.*;

public class DashboardDTO {

    List<Book> weekRentedBooks;

    List<Book> weekReturnBooks;

    List<Book> weekReserveBooks;

    public DashboardDTO(List<Book> books){
        List<Book> rentedBooks = getRentedBooks(books);
        List<Book> reserveBooks = getReserveBook(books);
        this.weekRentedBooks = getWeekRentedBooks(rentedBooks);
        this.weekReturnBooks = getWeekReturnBooks(rentedBooks);
        this.weekReserveBooks = getWeekReservedBooks(reserveBooks);
    }

    private List<Book> getRentedBooks(List<Book> books) {
        List<Book> rentedBooks = new ArrayList<>();
        for (Book book: books){
            if(book.getStatus().equals(BookStatus.RENTED)){
                rentedBooks.add(book);
            }
        }
        return rentedBooks;
    }

    private List<Book> getReserveBook(List<Book> books){
        List<Book> reserveBooks = new ArrayList<>();
        for (Book book: books){
            if(book.getStatus().equals(BookStatus.RESERVED)){
                reserveBooks.add(book);
            }
        }
        return reserveBooks;
    }

    private List<Book> getWeekRentedBooks (List<Book> rentedBooks){
        List<Book> weekRentedBooks = new ArrayList<>();
        LocalDate today = LocalDate.now();
        Period period;
        for (Book book: rentedBooks) {
            period = Period.between(book.getRentalDate(), today);
            if (period.getDays() < 7){
                weekRentedBooks.add(book);
            }
        }

        Collections.sort(weekRentedBooks, Comparator.comparing(Book::getRentalDate));

        return weekRentedBooks;
    }

    private List<Book> getWeekReturnBooks (List<Book> returnBooks){
        List<Book> weekReturnBooks = new ArrayList<>();
        LocalDate today = LocalDate.now();
        Period period;
        for (Book book: returnBooks) {
            period = Period.between(today, book.getReturnDate());
            if (period.getDays() < 7){
                weekReturnBooks.add(book);
            }
        }

        Collections.sort(weekReturnBooks, Comparator.comparing(Book::getReturnDate));

        return weekReturnBooks;
    }

    private List<Book> getWeekReservedBooks (List<Book> reservedBoks){
        List<Book> weekReservedBooks = new ArrayList<>();
        LocalDate today = LocalDate.now();
        Period period;
        for (Book book: reservedBoks) {
            period = Period.between(book.getReservetionDate(), today);
            if (period.getDays() < 7){
                weekReservedBooks.add(book);
            }
        }

        Collections.sort(weekReservedBooks, Comparator.comparing(Book::getReservetionDate));

        return weekReservedBooks;
    }

    public List<Book> getWeekRentedBooks() {
        return weekRentedBooks;
    }

    public void setWeekRentedBooks(List<Book> weekRentedBooks) {
        this.weekRentedBooks = weekRentedBooks;
    }

    public List<Book> getWeekReturnBooks() {
        return weekReturnBooks;
    }

    public void setWeekReturnBooks(List<Book> weekReturnBooks) {
        this.weekReturnBooks = weekReturnBooks;
    }

    public List<Book> getWeekReserveBooks() {
        return weekReserveBooks;
    }

    public void setWeekReserveBooks(List<Book> weekReserveBooks) {
        this.weekReserveBooks = weekReserveBooks;
    }
}
