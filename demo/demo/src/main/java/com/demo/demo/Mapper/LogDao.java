package com.demo.demo.Mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

import com.demo.demo.Model.Log;

@Mapper
public interface LogDao {
    @Insert("insert into ActivityLog(user_id,action_type,target_type,description,action_time)"+
    "value(#{userId}),#{actionType},#{targetType},#{desceiption},#{actionTime}")
    public void insertLog(Log log);
}
