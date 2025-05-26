package com.demo.demo.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.demo.Mapper.CategoryDao;
import com.demo.demo.Model.Category;
import com.demo.demo.helper.ThreadHelper;

@Service
public class CategoryService {
    @Autowired
    private CategoryDao categoryDao;

    public void add(Category category){
        category.setCreateTime(LocalDateTime.now());
        category.setUpdateTime(LocalDateTime.now());

        Map<String,Object> cache = ThreadHelper.get();
        category.setCreateUser(cache.get("id").toString());
        categoryDao.add(category);
    }

    public ArrayList<Category> queryList() {
        Map<String,Object> cache = ThreadHelper.get();
        return categoryDao.queryList(cache.get("id").toString());
    }
}
