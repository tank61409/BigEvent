package com.demo.demo.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.demo.Model.Result;
import com.demo.demo.Model.User;
import com.demo.demo.Service.UserService;
import com.demo.demo.helper.ThreadHelper;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/register")
    public Result register(@RequestBody User user) {
        return userService.register(user.getUsername(), user.getPassword());
    }

    @PostMapping("/login")
    public Result<String> login(@RequestBody User user) {
        System.out.println("登入controller");
        return userService.login(user);
    }

    @GetMapping("/userInfo")
    public Result<User> userInfo() {
        Map<String, Object> user = ThreadHelper.get();
        return Result.success(userService.findByName((String) user.get("username")));
    }

    @PutMapping("/update")
    public Result update(@RequestBody @Validated User user) {
        userService.update(user);
        return Result.success();
    }

    @PatchMapping("/updatePwd")
    public Result updatePwd(@RequestBody Map<String,String> params){
        
        return userService.updatePwd(params);
    }
    @GetMapping("/alluserinfo")
    public Result getAllUserInfo(){
        return userService.getAllUserInfo();
    }
}
