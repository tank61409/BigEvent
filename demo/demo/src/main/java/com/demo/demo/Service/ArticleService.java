package com.demo.demo.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.demo.demo.Model.Result;

@Service
public class ArticleService {

    public Result<ArrayList<Map<String, Object>>> list() {
        // 範例回傳空列表，實際應從 DB 取得
        return Result.success(new ArrayList<>());
    }

    public Result<Map<String, Object>> create(String text, MultipartFile image) {
        // 範例：不實際存檔，只模擬回傳一個 article 物件
        Map<String, Object> article = new HashMap<>();
        article.put("id", (int) (System.currentTimeMillis() / 1000));
        article.put("text", text);
        if (image != null && !image.isEmpty()) {
            article.put("imageUrl", "/uploads/" + image.getOriginalFilename());
        }
        article.put("comments", new ArrayList<>());
        article.put("createTime", LocalDateTime.now().toString());
        return Result.success(article);
    }
}
