package com.demo.demo.Model;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class Category {
    private Integer id;
    @NotEmpty
    private String categoryName;
    private String createUser;
    @NotEmpty
    private String categoryAlias;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}
