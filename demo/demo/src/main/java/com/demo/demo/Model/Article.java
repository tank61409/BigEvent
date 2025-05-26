package com.demo.demo.Model;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class Article {
    private Integer id;
    private String articleName;
    private Integer articleUser;
    private Integer categoryId;
    private Integer createUser;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}
