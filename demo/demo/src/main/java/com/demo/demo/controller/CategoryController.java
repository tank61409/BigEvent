package com.demo.demo.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.demo.demo.Model.Category;
import com.demo.demo.Model.Ids;
import com.demo.demo.Model.Result;
import com.demo.demo.Service.CategoryService;

@RestController
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping("/addcategory")
    public Result add(@RequestBody @Validated Category category) {
        categoryService.add(category);
        return Result.success();
    }

    @GetMapping
    public Result<ArrayList<Category>> list() {

        return Result.success(categoryService.queryList());
    }

    @GetMapping("/detail")
    public Result<Category> getDetail(@RequestParam Integer id) {
        return categoryService.getDetail(id);
    }

    @PutMapping("/updatecategory")
    public Result updateCategory(@RequestBody @Validated Category category) {
        categoryService.updateCategory(category);
        return Result.success();
    }

    @DeleteMapping("/deletcategory")
    public Result deletCategory(@RequestBody Ids ids) {
        categoryService.deletCategory(ids);
        return Result.success();
    }
}
