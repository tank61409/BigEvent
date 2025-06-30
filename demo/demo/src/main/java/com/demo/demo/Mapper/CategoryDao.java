package com.demo.demo.Mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.demo.demo.Model.Category;

@Mapper
public interface CategoryDao {

    @Insert("insert into category(category_name,category_alias,create_user,create_time,update_time)" +
            "value(#{categoryName},#{categoryAlias},#{createUser},#{createTime},#{updateTime})")
    void add(Category category);

    @Select("select * from category where create_user = #{id}")
    ArrayList<Category> queryList(String id);

    @Select("select * from category where id =#{id}")
    Category findById(int id);

    @Update("update category set category_name=#{categoryName},category_Alias=#{categoryAlias},update_time=#{updateTime} where id = #{id}")
    void updateCategory(Category category);

    @Delete("Delete from category where id=#{id} and create_user=#{userId}")
    void deletCategory(String id,String userId);

}
