package com.demo.demo.Mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface AdminDao {
    @Select("select count(id) from `${tableName}`")
    public String getTableCount(String tableName);
    
}
