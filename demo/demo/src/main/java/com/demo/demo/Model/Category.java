package com.demo.demo.Model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class Category {
    private Integer id;
    @NotEmpty
    private String categoryName;
    private String createUser;
    @NotEmpty
    private String categoryAlias;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createTime;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updateTime;
}
