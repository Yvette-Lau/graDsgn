$(function () {
    $('#login-form-link').click(function (e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });

    $('#register-form-link').click(function (e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
});

$(document).ready(function () {

    $("#register-form").validate({
        errorContainer: "div.error",
        errorLabelContainer: $("#register-form div.error"),
        wrapper: "li",
        rules: {
            username: {
                required: true,
                minlength: 6,
                maxlength: 20
            },
            passwordReg: {
                required: true,
                minlength: 6,
                maxlength: 25,
            },
            confirm_password: {
                required: true,
                equalTo: "#passwordReg"
            },
            email: {
                required: true,
                email: true
            },
        },
        messages: {
            username: {
                required: "请输入用户名",
                minlength: "用户名必须6到20字符之间",
                maxlength: "用户名必须6到20字符之间"
            },
            passwordReg: {
                required: "请输入密码",
                minlength: "密码必须6到25字符之间",
                maxlength: "密码必须6到25字符之间"
            },
            confirm_password: {
                required: "请输入密码",
                equalTo: "两次密码输入不一致"
            },
            email: "请输入一个正确的邮箱",
        },
        submitHandler: function (form) {
            alert("注册成功！");
            form.submit();
        }
    });


    var app = new Vue({
        el: '#tec-login',
        data: {
            userName: '',
            password: ''
        },
        methods: {
            login: function () {
                var passwordMD5 = hex_md5(this.password);
                var b = new Base64();
                var basicCode = "Basic " + b.encode(this.userName + ':' + passwordMD5);
                alert(basicCode);

                axios.get('http://localhost:7081/token/v1/create/teacher', {
                    headers: {
                        'Authorization': basicCode,
                        'Access-Control-Allow-Origin': '*'
                    },
                }).then(function (response) {
                    document.cookie = 'jtoken-teacher=' + response.data.content + ';path=/'
                    window.location.href = 'http://localhost:8080'
                }).catch(function (error) {
                    if (error.response){
                        if (error.response.data.code == 4005 || error.response.data.code == 4007) {
                            alert("用户名密码不合法。 请确认后重试")
                        }
                    } else {
                        alert("请求失败。稍后重试……")
                    }
                    console.error(error)
                })

            }
        }

    });
})