package com.demo.demo.Mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.demo.demo.Model.Category;

@Mapper
public interface CategoryDao {

    @Insert("insert into category(category_name,category_alias,create_user,create_time,update_time)"+
    "value(#{categoryName},#{categoryAlias},#{createUser},#{createTime},#{updateTime})")
    void add(Category category);

    @Select("select * from category where create_user = #{id}")
    ArrayList<Category> queryList(String id);


}
