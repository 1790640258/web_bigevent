$(function () {
    // 1.登录注册的按需切换
    // 点击"去注册账号"的链接跳转到注册的盒子
    $("#link_reg").on("click", function () {
        $(".login-box").hide();
        $(".reg-box").show();
    });
    // 点击"去登录"的链接跳转到登录的盒子
    $("#link_login").on("click", function () {
        $(".login-box").show();
        $(".reg-box").hide();
    });

    // 2.自定义校验规则
    // 从layui上面获取form对象
    const form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            // 拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            const pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次输入的密码不一致！'
            }
        }
    });

    // 注册表单的提交事件
    $("#form_reg").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "http://api-breakingnews-web.itheima.net/api/reguser",
            data: {
                username: $("#form_reg [name=username]").val(),
                password: $("#form_reg [name=password]").val(),
            },
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.msg); // layui里的消息提示
                }
                layer.msg("注册成功，请登录！");
                $("#link_login").click();
            }
        })
    });


    // 登录表单的提交事件
    $("#form_login").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("登录失败!");
                }

                layer.msg("登录成功!");

                // 将成功登录后得到的 token属性 字符串 保存到本地localStorage 中
                localStorage.setItem("token", res.token);

                location.href = './index.html';
            }
        })
    })

})