import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-switch-menu',
  templateUrl: './switch-menu.component.html',
  styleUrls: ['./switch-menu.component.scss']
})
export class SwitchMenuComponent implements OnInit {
  menus: any[] = [{
    url: '/app/home',
    title: "主页"
  }, {
    url: '/app/situation',
    title: "仪器整体态势"
  }, 
  {
    href: 'http://47.92.28.186:8080/hnty/a/monitor/device/view',
    title: "测量过程监控"
  }, 
  {
    url: '/app/history',
    title: "测量历史溯源"
  }, {
    url: '/app/step',
    title: "工步历史"
  }, {
    url: '/app/warning',
    title: "测量通知报警"
  }, {
    url: '/app/report',
    title: "仪器测量报表"
  }, {
    url: '/app/customer',
    title: "销售及服务网点"
  }, {
    url: '/app/state',
    title: "系统运行状态"
  }, {
    url: '/app/device',
    title: "仪器列表"
  }]
  constructor() { }

  ngOnInit() {

    $("#hoverWrap").hover(function () {
      $(this).find("ul").fadeIn("slow");
    }, function () {
      $(this).find("ul").fadeOut("normal");
    })
    $("#hoverWrap").find("a").hover(function () {
      $(this).animate({
        opacity: .5
      }, "fast")
    }, function () {
      $(this).animate({
        opacity: 1
      }, "fast")
    })
  }

}
