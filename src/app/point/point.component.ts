import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.css']
})
export class PointComponent implements OnInit {
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
        <script src="/assets/js/bootstrap.min.js"></script>
        <script src="/assets/js/albedo.jquery.replenish.js"></script>

        <script>
            $(document).ready(function () {
                var taskId = localStorage.getItem("taskId");
                $.ajax({
                    type: 'GET',
                    url: '/api/tasks/' + taskId,
                    contentType: "application/json;charset=UTF-8",
                    dataType: 'json',
                    success: function (res) {
                      $('#projectName').append('<span>'+res.project.name+'</span>')
                      $('#taskCode').append('<span>'+res.code+'</span>')
                    }
                })
                $.ajax({
                    type: 'GET',
                    url: '/api/points',
                    contentType: "application/json;charset=UTF-8",
                    dataType: 'json',
                    success: function (res) {
                        if (res && res.length) {
                            res = res.filter(item => item.task.project.user.login == localStorage.getItem("login") && item.task.id == taskId)
                            for (var i = 0; i < res.length; i++) {
                                let item = res[i];
                                let domStr =
                                    '<a class="bkui-list-item" href="javascript:void(0);" id="'+item.id+'">' +
                                        '<span class="bkui-list-fl">' + item.name +
                                            '<div>' +
                                                '<small>编号: '+item.code+'&nbsp;&nbsp;&nbsp;名称: '+item.name+'</small>'+
                                            '</div>'+
                                        '</span>'+
                                        '<i class="fa fa-angle-right bkui-list-fr bkui-list-fricon"></i>'+
                                    '</a>'
        
                                $('#insert').append(domStr);
                            }
                            setTimeout(function () {
                                $('i.fa-angle-right').on('click', function () {
                                    var id = $(this).parent('a').attr('id');
                                    if (id) {
                                        localStorage.setItem("pointId", id)
                                        location.href = "/sample"
                                    }
                                })
                            }, 100)
                        }
                    }
                })
            })
        </script>
        `)
      })
    }
}
