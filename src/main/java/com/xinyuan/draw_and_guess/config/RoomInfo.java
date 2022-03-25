package com.xinyuan.draw_and_guess.config;

import com.xinyuan.draw_and_guess.pojo.User;

import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


public class RoomInfo {
    public static Boolean ifDraw = false;
    public static User DrawUser = null;
    public static List<User> GuessUsers = new ArrayList<>();
}
