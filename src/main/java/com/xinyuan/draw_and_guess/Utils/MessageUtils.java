package com.xinyuan.draw_and_guess.Utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.xinyuan.draw_and_guess.pojo.ResultMessage;


public class MessageUtils {

    /**
     * 封装响应的消息，注意:<b>系统消息的发送fromName为null</b>;封装好的响应如下，例如
     *     1.系统消息： {“systemMsgFlag”: true, "fromName": null, "message": ["Name1", "Name2"]}.
     *     2. 非系统消息 {“systemMsgFlag”: false, "fromName": "YYJ", "message": “你在哪里呀？”}.
     * @param MsgType 是否是系统消息
     * @param fromName 发送方名称
     * @param message 发送的消息内容
     * @return java.lang.String
     */
    public static String getMessage(int MsgType, String fromName, Object message) {
        ResultMessage resultMessage = new ResultMessage();
        resultMessage.setMsgType(MsgType);
        resultMessage.setMessage(message);
        resultMessage.setFromName(fromName);

        ObjectMapper objectMapper = new ObjectMapper();
        String repStr = null;
        try {
            repStr = objectMapper.writeValueAsString(resultMessage);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return repStr;
    }




}
