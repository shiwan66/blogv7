import { Component, OnInit } from '@angular/core';
declare var $: any;
declare var load: any;

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

	ngAfterViewInit() {		
		$('body').append(
      `
      <div id="main">
        <div id="header">
          <div style="position:relative;top:+20px;left:0px;">
            <g:plusone size="medium"></g:plusone>
          </div>
          <p id="mp1">
            QR Code scanner
          </p>
        </div>
        <div id="mainbody">
          <table class="tsel" border="0" width="100%">
            <tr>
              <td valign="top" align="center" width="50%">
                <table class="tsel" border="0">
                  <tr>
                    <td>
                      <img class="selector" id="webcamimg" src="/assets/icons/vid.png" onclick="setwebcam()" align="left" />
                    </td>
                    <td>
                      <img class="selector" id="qrimg" src="/assets/icons/cam.png" onclick="setimg()" align="right" />
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2" align="center">
                      <div id="outdiv">
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td colspan="3" align="center">
                <img src="/assets/icons/down.png" />
              </td>
            </tr>
            <tr>
              <td colspan="3" align="center">
                <div id="result"></div>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <canvas id="qr-canvas" width="800" height="600"></canvas>
			<script src="/assets/js/llqrcode.js"></script>
      <script src="/assets/js/webqr.js"></script>
      <script type="text/javascript">load();</script>
			`
    )

    var player = document.getElementById('player');
    
      var handleSuccess = function(stream) {
        (<any>player).srcObject = stream;
      };
    
      navigator.mediaDevices.getUserMedia({video: true})
          .then(handleSuccess);
	 }

}
