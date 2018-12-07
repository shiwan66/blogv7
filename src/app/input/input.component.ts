import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  ngOnInit() {
    const that = this;
    const inter = setInterval(function () {
      if ($) {
        that.runScript();
        clearInterval(inter);
      }
    }, 10)
  }

  runScript() {
    $('body').ready(function () {
      $('body').append(`     
        <!-- 引入蓝鲸提供的公用js -->
        <script src="https://magicbox.bk.tencent.com/static_api/v3/bk_mobile/js/bkui.js"></script>
        <script src="https://magicbox.bk.tencent.com/static_api/v3/bk_mobile/assets/bkdialog-1.0/js/bkdialog.min.js"></script>
        <script src="https://magicbox.bk.tencent.com/static_api/v3/bk_mobile/assets/echart-3.3.1/echarts.min.js"></script>
        <script src="/assets/js/bootstrap.min.js"></script>
        <script src="/assets/js/albedo.jquery.replenish.js"></script>

        <script>
            $(document).ready(function() {
                var id = localStorage.getItem("sampleId");        
                var pointId = localStorage.getItem("pointId");        
                $.ajax({
                    type: 'GET',
                    url: '/api/samples',
                    contentType: "application/json;charset=UTF-8",
                    dataType: 'json',
                    success: function(res) {
                        var domStr2 = "";
                        res = res.filter(item => item.point.task.project.user.login == localStorage.getItem("login") && item.point.id == pointId)
                        if(res && res.length)  {
                            for(var i= 0 ; i<  res.length; i++) {
                                domStr2 += '<option value="'+res[i].id+'">'+res[i].code+'</option>'
                            }
                        }
                        $('#sampleCode').append(domStr2);
                    }
                })   
                $.ajax({
                    type: 'GET',
                    url: '/api/samples/'+id,
                    contentType: "application/json;charset=UTF-8",
                    dataType: 'json',
                    success: function(res) {
                        window.currentSample = res;
                        $('#projectName').append('<span>'+res.point.task.project.name+'</span>')
                        $('#taskCode').append('<span>'+res.point.task.code+'</span>')
                        $('#point').append(res.point.code+'&nbsp;&nbsp;&nbsp;&nbsp;'+res.point.name)
                        $('#sampleDate').val(res.sampleDate)                
        
                        $('#dqy').val(res.dqy)
                        $('#fx').val(res.fx)
                        $('#fs').val(res.fs)
                        $('#wd').val(res.wd)
                        $('#xdsd').val(res.xdsd)     
                        
                        var inter = setInterval(function() {
                            if($('#sampleCode').find('option')[0] && $('#user1').find('option')[0] && $('#user2').find('option')[0]) {
                                $('#sampleCode').val(res.id).on('change', function() {
                                    localStorage.setItem("sampleId", $(this).val());
                                    location.reload()
                                }) 
                                $('#user1').val(res.user1.id)
                                $('#user2').val(res.user2.id)
                                clearInterval(inter)
                            }
                        }, 100)
                    }
                })
                $.ajax({
                    type: 'GET',
                    url:'/api/sample-users',
                    contentType: "application/json;charset=UTF-8",
                    dataType: 'json',
                    success: function(res) {
                        var domStr1 = "";
                        if(res && res.length)  {
                            window.users = res;
                            for(var i= 0 ; i<  res.length; i++) {
                                domStr1 += '<option value="'+res[i].id+'">'+res[i].name+'</option>'
                            }
                        }
                        $('#user1,#user2').append(domStr1)
                    }
                })         
                $.ajax({
                    type: 'GET',
                    url: '/api/params',
                    contentType: "application/json;charset=UTF-8",
                    dataType: 'json',
                    success: function(res) {
                        window.params = res.filter(item => item.sample.id == id)
                        if(params && params.length) {
                            var list = JSON.parse(params[0].json);
                            var domStr3 = "";
                            for(var i = 0; i< list.length; i++) {
                                let val = list[i].value != null?list[i]: '';
                                domStr3+=
                                    '<label class="bkui-group-cell">'+
                                        '<span class="w-100">'+
                                            '<small>'+
                                                '<strong class="name">'+list[i].name+'</strong>'+
                                            '</small>'+
                                        '</span>'+
                                        '<input class="bkui-input" type="number" id="'+list[i].key+'" name="'+list[i].key+'" value="'+ val + ' placeholder="请输入请输入测量值" />'+
                                        '<span class="unit">'+list[i].unit+'</span>'+
                                    '</label>'                        
                            }
                            $("#paramsInsert").after(domStr3)
                        }
                    }
                })
            
            })
        
            
            function save(change) {
                var list1 = [];
                $("#params-form").find("label").each(function() {
                    let name = $(this).find('.name').text();
                    let key = $(this).find('input').attr('id');
                    let value = $(this).find('input').val();
                    let unit = $(this).find('.unit').text();
                    let obj = {
                        name: name,
                        key: key,
                        value: value,
                        unit: unit
                    }
                    list1.push(obj);
                })
                var listStr = JSON.stringify(list1);
                var postObj = window.params[0];
                postObj.json = listStr;
                $.ajax({
                    type: 'PUT',
                    url: "/api/params",
                    contentType: "application/json;charset=UTF-8",
                    dataType: 'json',
                    data: JSON.stringify(postObj),
                    success: function(res) {
                        history.back();
                    }
                })
            }
        
            function submit(paramSave) {
                let sampleDate = $('#sampleDate').val();
                let user1 = window.users.filter(item => item.id == $('#user1').val())[0];
                let user2 = window.users.filter(item => item.id == $('#user2').val())[0];
                let dqy = $('#dqy').val();
                let fx = $('#fx').val();
                let fs = $('#fs').val();
                let wd = $('#wd').val();
                let xdsd = $('#xdsd').val();
                if(sampleDate && user1 &&user2 && dqy && fx && fs && wd && xdsd) {
                    window.currentSample.sampleDate = sampleDate;
                    window.currentSample.user1 = user1;
                    window.currentSample.user2 = user2;
                    window.currentSample.dqy = dqy;
                    window.currentSample.fx = fx;
                    window.currentSample.fs = fs;
                    window.currentSample.wd = wd;
                    window.currentSample.xdsd = xdsd;
                    if(paramSave) {
                        window.currentSample.status = "PROCESS";
                    } else{
                        window.currentSample.status = "COMPLATE";
                    }
                    save();
                    $.ajax({
                        type: 'PUT',
                        url: '/api/samples',
                        contentType: "application/json;charset=UTF-8",
                        dataType: 'json',
                        data: JSON.stringify(window.currentSample),
                        success: function() {
        
                        }
                    })
                } else {
                    var d = BKDialog({
                        'title': '警告',
                        'content': '<strong> 请将基础数据录入完整 </strong>',
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
                }
            }
        </script>        
        `)
    })
  }
}
