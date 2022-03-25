package com.xinyuan.draw_and_guess.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User extends Object{
    private int id;
    private String name;
    private String pwd;

    @Override
    public boolean equals(Object obj) {
        if (obj == null) return false;
        User o1 = (User) obj;
        return this.id == o1.id;
    }
}
