package com.demo.demo.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.demo.Mapper.UserDao;
import com.demo.demo.Model.User;
import com.demo.demo.Model.Result;
import com.demo.demo.helper.JWTHelper;
import com.demo.demo.helper.ThreadHelper;

@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    public Result register(String username, String password) {

        if (!username.matches("^[A-Za-z0-9]{5,16}$")) {
            throw new IllegalArgumentException("只能輸入英文字母");
        }

        if (!password.matches("^[A-Za-z0-9]{5,16}$")) {
            throw new IllegalArgumentException("只能輸入數字");
        }

        if (userDao.findByName(username) == null) {
            userDao.add(username, password);
            return Result.success();
        } else {
            return Result.error("帳戶名已存在");
        }
    }

    public Result<String> login(User user) {
        if (!user.getUsername().matches("^[A-Za-z0-9]{5,16}$")) {
            throw new IllegalArgumentException("只能輸入英文字母");
        }

        if (!user.getPassword().matches("^[A-Za-z0-9]{5,16}$")) {
            throw new IllegalArgumentException("只能輸入數字");
        }

        User daoUser = userDao.findByName(user.getUsername());
        if (daoUser == null) {
            return Result.error("帳號不存在");
        }

        if (!daoUser.getPassword().equals(user.getPassword())) {
            return Result.error("密碼錯誤");
        }

        Map<String, Object> claim = new HashMap<>();
        claim.put("id", daoUser.getId());
        claim.put("username", daoUser.getUsername());

        return Result.success(JWTHelper.genToken(claim));
    }

    public void update(User user) {

        user.setUpdateTime(LocalDateTime.now());
        userDao.update(user);
    }

    public User findByName(String username) {
        return userDao.findByName(username);
    }

    public Result updatePwd(Map<String, String> params) {
        boolean hasBlank = params.entrySet().stream().anyMatch(entry -> isBlank(entry.getValue()));
        if (hasBlank) {
            return Result.error("缺少必要參數");
        }

        Map<String, Object> cache = ThreadHelper.get();
        User user = userDao.findByName((String) cache.get("username"));
        if (!user.getPassword().equals(params.get("oldPwd"))) {
            return Result.error("原密碼輸入錯誤");
        }

        if(!params.get("newPwd").equals(params.get("rePwd"))){
            return Result.error("兩次填寫的新密碼不一致");
        }

        userDao.updatePwd(params.get("newPwd"),(Integer)cache.get("id"));
        return Result.success();
    }

    private boolean isBlank(String str) {
        return str == null || str.trim().isEmpty();
    }

    public Result getAllUserInfo() {
       return Result.success(userDao.getAllUserInfo());
    }

}
