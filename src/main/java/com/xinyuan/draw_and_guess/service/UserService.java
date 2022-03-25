package com.xinyuan.draw_and_guess.service;

import com.xinyuan.draw_and_guess.mapper.UserMapper;
import com.xinyuan.draw_and_guess.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class UserService {

    @Autowired
    private UserMapper userMapper;

    public User getUserById(int id){
        User user = userMapper.queryUserById(id);
        return user;
    }

    public List<User> getAllUsers() {
       return userMapper.queryUserList();
    }

    public int addUser(User user){
        return userMapper.addUser(user);
    }


    public Integer CheckUser(String name, String pwd){
        Map<String,Object> map = new HashMap<>();
        map.put("name",name);
        map.put("pwd", pwd);
        Integer i = userMapper.checkUserID(map);
        return i;
    }

    public Integer CheckUserName(String name){
        Map<String,Object> map = new HashMap<>();
        map.put("name",name);
        Integer i = userMapper.checkUserName(map);
        return i;
    }
}
