import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
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
            $(function () {
                $('.bkui-tabs').on('click', '.tabs-nav', function () {
                    if ($(this).hasClass('active')) {
                        return false;
                    }
                    var tabIndex = $(this).index();
                    var tabBox = $(this).closest('.bkui-tabs');
                    var tabHeader = tabBox.find('.tabs-nav');
                    var tabContent = tabBox.find('.tabs-content');
                    tabBox.children().children(".active").removeClass('active');
                    $(this).addClass('active');
                    tabContent.eq(tabIndex).addClass('active');
                });
            });
        </script>
        <script type="text/javascript">
            //search1_demo1_js_start
            $(function () {
                var keywordInput = $('#search1_demo1').find(".bkui-search-inputtext");
                var closeBtn = $('#search1_demo1').find('.bkui-close-btn');
                keywordInput.on('keyup', function () {
                    if ($(this).val().trim().length > 0) {
                        closeBtn.show();
                    } else {
                        closeBtn.hide();
                    }
                });
                //搜索输入框清空输入本文
                closeBtn.on('click', function () {
                    keywordInput.val("");
                    $(this).hide();
                });
            });
            //search1_demo1_js_end
        </script>
    
        <script type="text/javascript">
            //bkui-dialog-basic2_js_start
            $('#bkui-dialog-basic2').on('click', function () {
                var d = BKDialog({
                    'title': '任务单数据下载',
                    'content': '<strong>下载所选任务</strong></br><small>共选择了 <strong>2</strong> 个任务</small>',
                    'confirm': function () {
                        console.log('confirm');
                    },
                    'cancel': function () {
                        console.log('cancel');
                    },
                    'onshow': function () {
                        console.log('onshow');
                    },
                    'onclose': function () {
                        console.log('onclose');
                    }
                });
                d.show();
            });
        //bkui-dialog-basic2_js_end
        </script>
        
        <script>
          $(document).ready(function() {
              $.ajax({
                  type: 'GET',
                  url: '/api/tasks',
                  contentType: "application/json;charset=UTF-8",
                  dataType: 'json',
                  success: function(res) {
                      if(res && res.length) {
                          res = res.filter(item => item.project.user.login == localStorage.getItem("login"))
                          for(var i = 0 ; i < res.length; i++) {
                              let item = res[i];
                              let domStr =                
                                  '<div class="card">'+
                                      '<div class="card-header flex_wrap a-c p0">'+
                                          '<a class="bkui-list-item card-link flex_1" data-toggle="collapse" data-parent="#card-994736" href="#card-element-'+i+'">'+
                                              '<span class="bkui-list-fl">'+
                                                  '<strong>任务编号：<span class="customer" id="'+item.id+'">'+item.code+'</span></strong>'+
                                              '</span>'+
                                              '<i class="fa fa-angle-right bkui-list-fr bkui-list-fricon"></i>'+
                                          '</a>'+
                                      '</div>'+
                                      '<div id="card-element-'+i+'" class="collapse hiden">'+
                                          '<div class="card-body p15">'+
                                              '<ul class="list-unstyled">'+
                                                  '<li class="list-item">'+
                                                      '项目编号： '+item.code+
                                                  '</li>'+
                                                  '<li class="list-item">'+
                                                      '项目名称： '+item.name+
                                                  '</li>'+
                                                  '<li class="list-item">'+
                                                      '行政区域： '+item.areaName+
                                                  '</li>'+
                                              '</ul>'+
                                          '</div>'+
                                      '</div>'+
                                  '</div>'
                              $('#card-994736').append(domStr);
                          }
                          setTimeout(function() {
                              $('i.fa-angle-right').on('click', function() {
                                  var id = $(this).parent('a').find('.customer').attr('id');
                                  if(id) {
                                      localStorage.setItem("taskId", id)
                                      location.href="/point"
                                  }
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
