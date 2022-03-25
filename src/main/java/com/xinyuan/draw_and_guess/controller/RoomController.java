package com.xinyuan.draw_and_guess.controller;

import com.xinyuan.draw_and_guess.config.RoomInfo;
import com.xinyuan.draw_and_guess.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;

@Controller
public class RoomController {



    @RequestMapping("/select")
    public String choose(){
        return "select";
    }

    @GetMapping("/testDraw")
    @ResponseBody
    public String testDraw(){
        return RoomInfo.ifDraw ? 1+"" : -1+"";
    }


    @RequestMapping("/room")
    public String room(@RequestParam("draw") Boolean ifDraw ,HttpSession session){
        User user = (User) session.getAttribute("user");
        if (user == null){
            return "error";
        }else{
            if (ifDraw){
                RoomInfo.ifDraw = true;
                RoomInfo.DrawUser = user;
            }else{
                RoomInfo.GuessUsers.add(user);
            }
            return "room";
        }

    }

    @GetMapping("/getIfDraw")
    @ResponseBody
    public Boolean getIfDraw(HttpSession session){
        User user = (User) session.getAttribute("user");
        User drawUser =RoomInfo.DrawUser;
        return user.equals(drawUser);
    }

}
