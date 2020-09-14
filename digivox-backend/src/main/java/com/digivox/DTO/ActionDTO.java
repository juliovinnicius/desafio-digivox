package com.digivox.DTO;

import com.digivox.model.Book;

public class ActionDTO {

    private String cpf;

    public  ActionDTO (Book book, String cpf) {
        this.cpf = cpf;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }
}
