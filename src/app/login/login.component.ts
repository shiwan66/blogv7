import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ngOnInit() {
    const that = this;
    const inter = setInterval(function() {
      if($) {
        that.runScript();
        clearInterval(inter);
      }
    }, 10)
  }

  runScript() {
    $('body').ready(function() {
      $('body').append(`     
        <!-- 引入蓝鲸提供的公用js -->
        <script src="https://magicbox.bk.tencent.com/static_api/v3/bk_mobile/js/bkui.js"></script>
        <script src="https://magicbox.bk.tencent.com/static_api/v3/bk_mobile/assets/bkdialog-1.0/js/bkdialog.min.js"></script>
        <script src="https://magicbox.bk.tencent.com/static_api/v3/bk_mobile/assets/echart-3.3.1/echarts.min.js"></script>
        <script src="/assets/js/albedo.jquery.replenish.js"></script>
        
        <script>
            $(document).ready(function() {
                $('form').on('submit', function() {
                    return false;
                })
                $('#login').on('click', function() {
                    
                    var username = $('#username').val();
                    var password = $('#password').val();
        
                    $.ajax({
                        type: 'POST',
                        url: '/api/authenticate',
                        contentType: "application/json;charset=UTF-8",
                        data: JSON.stringify({
                            username: username,
                            password: password,
                            rememberMe: true
                        }),
                        dataType: 'json',
                        success: function(res) {
                            localStorage.setItem("jhi-authenticationtoken", res.id_token);
                            localStorage.setItem('login', username);
                            location.href="/task"
                        }
                    })
                })
            })
        </script>
      `)
    })
  }
}
