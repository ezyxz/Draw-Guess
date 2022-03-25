var ajaxObj = new XMLHttpRequest();
ajaxObj.open('get', "/testDraw");
ajaxObj.send();
ajaxObj.onreadystatechange = function () {
    if (ajaxObj.readyState == 4 && ajaxObj.status == 200) {
        var res = ajaxObj.responseText;
        if (res == 1){
            var draw_button = document.getElementById("draw_button")
            draw_button.setAttribute("disabled", true);//设置不可点击
            draw_button.style.backgroundColor  = '#555555';//设置背景色
        }else {
            var draw_button = document.getElementById("draw_button")
            draw_button.style.backgroundColor  = '#7FFFD4';//设置背景色
        }


    }
}

function draw_button_onclick(){
    window.location.href="/room?draw=true"
}
function guess_button_onclick(){
    window.location.href="/room?draw=false"
}
