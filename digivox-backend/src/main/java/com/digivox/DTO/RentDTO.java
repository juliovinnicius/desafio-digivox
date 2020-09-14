package com.digivox.DTO;

import java.time.LocalDate;

public class RentDTO {

    private String cpf;

    private String rentDate;

    private String endDate;

    public RentDTO(){

    }

    public String getCpf() {
        return cpf;
    }

    public String getRentDate() {
        return rentDate;
    }

    public void setRentDate(String rentDate) {
        this.rentDate = rentDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }
}
