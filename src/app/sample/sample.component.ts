import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})
export class SampleComponent implements OnInit {
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
          $(document).ready(function() {
              var pointId = localStorage.getItem("pointId");
              $.ajax({
                  type: 'GET',
                  url: '/api/points/'+pointId,
                  contentType: "application/json;charset=UTF-8",
                  dataType: 'json',
                  success: function(res) {
                      $('#projectName').append('<span>'+res.task.project.name+'</span>')
                      $('#taskCode').append('<span>'+res.task.code+'</span>')
                      $('#point').append(res.code+'&nbsp;&nbsp;&nbsp;&nbsp;'+res.name)
                  }
              })
              $.ajax({
                  type: 'GET',
                  url: '/api/samples',
                  contentType: "application/json;charset=UTF-8",
                  dataType: 'json',
                  success: function(res) {
                      if(res && res.length) {
                          res = res.filter(item => item.point.task.project.user.login == localStorage.getItem("login") && item.point.id == pointId)
                          for(var i = 0 ; i < res.length; i++) {
                              let item = res[i];
                              var status = "";
                              var className = "";
                              switch(item.status) {
                                  case 'PLAN':
                                      status = '未开始';
                                      className = "text-muted";
                                      break;
                                  case 'PROCESS':
                                      status = "进行中";
                                      className = "text-warning";
                                      break;
                                  default:
                                      status = "已完成"
                                      className = "text-success";
                                      break;                                
                              }
                              let domStr = 
                                  '<div class="col">'+
                                      '<div class="card">'+
                                          '<div class="card-header flex_wrap a-c">'+
                                              '<div class="bkui-form-hd col-auto">'+
                                                  '<input type="radio" class="bkui-check" name="radio'+item.id+'" id="x0">'+
                                                  '<span class="bkui-choice-icon">'+item.code+'</span>'+
                                              '</div>'+
                                              '<a class="bkui-list-item card-link flex_1 p0" id="'+item.id+'">'+
                                                  '<span class="bkui-list-fl text-center '+className+'">'+
                                                      status+
                                                  '</span>'+
                                                  '<i class="fa fa-angle-right bkui-list-fr bkui-list-fricon" style="padding-left:0;"></i>'+
                                              '</a>'+
                                          '</div>'+
                                          '<div class="card-body p15">'+
                                              '<ul class="list-unstyled">'+
                                                  '<li class="list-item">'+
                                                      '样品名称： '+item.name+
                                                  '</li>'+
                                                  '<li class="list-item">'+
                                                      '监测项目： '+item.type+
                                                  '</li>'+
                                                  '<li class="list-item">'+
                                                      item.point.address+
                                                  '</li>'+
                                              '</ul>'+
                                          '</div>'+
                                      '</div>'+
                                  '</div>'
                                  
                              $('#insert').append(domStr);
                          }
                          setTimeout(function() {
                              $('.bkui-list-item').on('click', function() {
                                  var id = $(this).attr('id');
                                  if(id) {
                                      localStorage.setItem("sampleId", id)
                                      location.href="/input"
                                  }
                              })
                              $('#checkall').on('click', function() {
                                  if($(this).prop("checked")) {
                                      $('input:radio').prop('checked', true)
                                  } else {
                                      $('input:radio').prop('checked', false)
                                  }
                              })
                              $('input:radio').parent('div').on('click', function() {
                                  var radio = $(this).find('input').prop("checked")
                                  $(this).find('input').prop("checked", !radio)
                              })
                          },100)
                      }
                  }
              })             
          })
        </script>
        `)
      })
    }
}
