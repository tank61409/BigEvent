package com.demo.demo.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.demo.Model.User;
import com.demo.demo.Model.Result;
import com.demo.demo.helper.JWTHelper;

@RestController
@RequestMapping("/article")
public class ArticleController {

    @PostMapping("/list")
    public Result list(@RequestBody User user, @RequestHeader(name = "Authorization") String token) {
        return Result.success("取得列表");
    }
}
