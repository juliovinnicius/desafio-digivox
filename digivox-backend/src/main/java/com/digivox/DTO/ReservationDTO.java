package com.digivox.DTO;

public class ReservationDTO {

    private String cpf;

    private String reservationDate;

    public ReservationDTO(){
    }

    public String getCpf() {
        return cpf;
    }

    public String getReservationDate() {
        return reservationDate;
    }

    public void setReservationDate(String reservationDate) {
        this.reservationDate = reservationDate;
    }
}
