$(function () {

    // 调用getUserInfo获取用户基本信息
    getUserInfo();

    const layer = layui.layer;
    // 点击退出事件
    $("#btnLogout").on("click", function () {
        // 提示用户是否退出
        layer.confirm('确定是否退出系统？', {icon: 3, title:'提示'}, function(index){

            // 退出功能
            // 清除本地存储的内容
            localStorage.removeItem("token");

            // 跳转到登录页面
            location.href = "./../../home/login.html"
            
            // 关闭弹出框
            layer.close(index);
          });
    })
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        // headers: {
        //     // Authorization: localStorage.getItem("token") || ""
        //     Authorization: localStorage.token || ""
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg("获取用户信息失败");
            }

            // 调用 renderAvatar 函数 渲染头像
            renderAvatar(res.data);
        }
    /*     // 无论成功还是失败都会调用complete函数
        complete: function (res) {
            // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
            if (({status} = res) === 1 && ({message} = res) === "身份认证失败！"); {
                // 清除本地的token
                localStorage.removeItem("token");
                // 强制跳转到login.html
                location.href = "./../../home/login.html";
            }
        } */
    })
}

function renderAvatar(user) {
    // 获取用户名
    const name = user.nickname || user.username;

    $("#welcome").html(`欢迎${name}`);

    // 处理图片头像和文字头像
    if (user.user_pic) {
        // 图片头像
        $(".layui-nav-img").attr("src", user.user_pic).show();
        $(".text-avatar").hide();
    } else {
        // 文字头像
        $(".layui-nav-img").hide();

        const first = name[0].toUpperCase();
        $(".text-avatar").html(first).show();
    }
}