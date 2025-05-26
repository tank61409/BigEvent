package com.demo.demo.Model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class User {
    @NotNull
    private Integer id;
    private String username;
    private String password;
    @NotEmpty
    @Email
    private String email;
    @NotEmpty
    private String nickname;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}
