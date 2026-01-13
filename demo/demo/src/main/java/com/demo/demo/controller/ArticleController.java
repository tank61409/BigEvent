package com.demo.demo.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.demo.demo.Model.Result;
import com.demo.demo.Service.ArticleService;

@RestController
@RequestMapping("/article")
public class ArticleController {

    @Autowired
    private ArticleService articleService;

    @PostMapping("/list")
    public Result list(@RequestBody(required = false) Map<String, Object> params) {
        return articleService.list();
    }

    @PostMapping("/create")
    public Result create(@RequestParam(required = false) String text,
            @RequestParam(required = false) MultipartFile image) {
        return articleService.create(text, image);
    }
}
