package com.demo.demo.Mapper;




import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.demo.demo.Model.User;

@Mapper
public interface UserDao {
    @Select("select * from user where username = #{username}")
    public User findByName(String username);

    @Insert("insert into user(username,password,create_time,update_time) value(#{username},#{password},now(),now())")
    public void add(String username, String password);

    @Update("update `user` set nickname = #{nickname},email=#{email},update_time=#{updateTime} where id = #{id}")
    public void update(User user);

    @Update("update `user` set password = #{newPwd},update_time=now() where id= #{id}")
    public void updatePwd(String newPwd,Integer id);

    @Select("select count(id) from `user`")
    public String getUserCount();
}
