//聊天室主人
var username;
// 消息接收者
var toName = "all";
var space = "说: ";
var service_ip = "192.168.50.90";
var Font_Size = 1;
var if_Draw = false;

//登录后显示用户名和状态
$(function () {
    $.ajax({
        //是否异步,此项目此处必须是false
        async: false,
        //请求方式
        type: 'GET',
        //请求url
        url: "/getUsername",
        success : function (res) {
            username = res;
        }
    });
    $.ajax({
        //是否异步,此项目此处必须是false
        async: false,
        //请求方式
        type: 'GET',
        //请求url
        url: "/getIfDraw",
        success : function (res) {
            if_Draw = res;
        }
    });


    //创建websocket对象
    var ws = new WebSocket("ws://localhost:8888/chat");

    //建立连接后触发
    ws.onopen = function () {
        $('#chatMeu').html('<p>用户：' + username + "<span style='float: right;color: greenyellow; height: 20px'>在线</span></p>")
    };


    //接收到服务端的推送后触发
    ws.onmessage = function (evt) {
        //获取数据
        var dataStr = evt.data;
        var jsonData = JSON.parse(dataStr);
        //判断是否是系统消息
        if (jsonData.msgType == 1) {

            var allNames = jsonData.message;
            var users_str = "";
            for (var name of allNames) {
                users_str += name+"\n";
            }
            document.getElementById('text_users').value = users_str;
            var init_context = document.getElementById('text_session').value;
            init_context += "系统消息： "+jsonData.fromName+"已上线"+"\n";
            document.getElementById('text_session').value = init_context;

        }else if (jsonData.msgType == 3){

            var data = jsonData.message;
            var fromuser = jsonData.fromName;
            var init_context = document.getElementById('text_session').value
            init_context +=  fromuser + space + data+"\n";
            document.getElementById('text_session').value = init_context;

        }else if (jsonData.msgType == 2){

            var allNames = jsonData.message;
            var users_str = "";
            for (var name of allNames) {
                users_str += name+"\n";
            }
            document.getElementById('text_users').value = users_str;
            var init_context = document.getElementById('text_session').value;
            init_context += "系统消息： "+jsonData.fromName+"已下线"+"\n";
            document.getElementById('text_session').value = init_context;

        }else if (jsonData.msgType == 4){
            var data = jsonData.message;
            var draw_data = JSON.parse(data);
            var fromuser = jsonData.fromName;

            var draw_x = draw_data.x
            var draw_y = draw_data.y
            var draw_type = draw_data.type
            var draw_color = draw_data.color

            cxt.moveTo(draw_x,draw_y);

        }else if (jsonData.msgType == 5){
            var data = jsonData.message;
            var draw_data = JSON.parse(data);
            var fromuser = jsonData.fromName;

            var draw_x = draw_data.x
            var draw_y = draw_data.y
            var draw_type = draw_data.type
            var draw_color = draw_data.color

            cxt.lineTo(draw_x,draw_y);
            cxt.stroke();
        }else if (jsonData.msgType == 6){
            cxt.fillStyle="#FFFFFF";
            cxt.beginPath();
            cxt.fillRect(0,0,canvas.width,canvas.height);
            cxt.closePath();
        }
    };
    //关闭连接触发
    ws.onclose = function () {
        $('#chatMeu').html('<p>用户' + username + "<span style='float: right;color: #d50a0a; height: 20px'>离线</span></p>")
    };

    //发送按钮点击
    $("#submit").click(function () {
        //获取发送输入框中的内容
        var data = $("#tex_content").val();
        //点击发送后，清空输入内容框架
        $("#tex_content").val("");
        var sendJson = {"msgType":3, "fromName": toName, "message": data};

        //更新聊天室
        var init_context = document.getElementById('text_session').value
        init_context +=  username + space + data+"\n";
        document.getElementById('text_session').value = init_context;

        //发送数据给服务端
        ws.send(JSON.stringify(sendJson));

    });

    //发送按钮点击
    $("#clear_button").click(function () {
        cxt.fillStyle="#FFFFFF";
        cxt.beginPath();
        cxt.fillRect(0,0,canvas.width,canvas.height);
        cxt.closePath();
        var sendJson = {"msgType":6, "fromName": username, "message": "NULL"};
        ws.send(JSON.stringify(sendJson));
    });


    var canvas = document.getElementById("canvas");
    var cxt = canvas.getContext("2d");

    canvas.onmousedown = function(ev){
        if (if_Draw){

            cxt.moveTo(ev.clientX-canvas.offsetLeft,ev.clientY-canvas.offsetTop);
            var data = {"x": ev.clientX-canvas.offsetLeft, "y": ev.clientY-canvas.offsetTop, "type":"round", "color":1};
            var sendJson = {"msgType":4, "fromName": username, "message": JSON.stringify(data)};
            ws.send(JSON.stringify(sendJson));

            document.onmousemove = function(ev){

                cxt.lineTo(ev.clientX-canvas.offsetLeft,ev.clientY-canvas.offsetTop);
                cxt.stroke();
                var data = {"x": ev.clientX-canvas.offsetLeft, "y": ev.clientY-canvas.offsetTop, "type":"round", "color":1};
                var sendJson = {"msgType":5, "fromName": username, "message": JSON.stringify(data)};
                ws.send(JSON.stringify(sendJson));
            };
        }


    };
    document.onmouseup = function(){
        if (if_Draw){

            document.onmousemove = null;
            document.onload = null;
        }

    };


    var bar = document.getElementById("range1")
    var bar_out = document.getElementById("range_output")
    bar.onchange = function (e){
        bar_out.value = bar.value;
        Font_Size = bar.value;
    }

    window.onbeforeunload = function () {
        ws.close()
    }
});
