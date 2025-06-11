package com.demo.demo.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.demo.Mapper.CategoryDao;
import com.demo.demo.Model.Category;
import com.demo.demo.Model.Ids;
import com.demo.demo.Model.Result;
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

    public Result<Category> getDetail(int id) {
        return Result.success(categoryDao.findById(id));
    }

    public void updateCategory(Category category) {
        category.setUpdateTime(LocalDateTime.now());
        categoryDao.updateCategory(category);
    }

    public void deletCategory(Ids ids) {
        Map<String,Object> cache = ThreadHelper.get();
        ids.setUserId(cache.get("id").toString());
        for (String id : ids.getIds()) {
            categoryDao.deletCategory(id,ids.getUserId());
        }
        
        
    }

    

}
