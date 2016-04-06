define(["jQuery"],function(e){function n(n){function s(){I(this),Events.trigger(z,"ended")}function u(){if("video"==n.type){var e=1e3*this.currentTime;e+=(d.startTimeTicksOffset||0)/1e4,M(e)}Events.trigger(z,"timeupdate")}function l(){Events.trigger(z,"volumechange")}function v(n){var t=n.target;t.removeEventListener("playing",v),e(".mediaPlayerAudioContainer").hide()}function c(){Events.trigger(z,"playing")}function f(){Events.trigger(z,"play")}function m(){Events.trigger(z,"pause")}function p(){Events.trigger(z,"click")}function g(){Events.trigger(z,"dblclick")}function E(e){I(this);{var n=e.target;n.error?n.error.code:""}Events.trigger(z,"error")}function y(e){var n=e.target;n.removeEventListener("loadedmetadata",y),r||n.play()}function L(e){require(["hlsjs"],function(n){window.Hls=n,e()})}function w(e){var n=e,t=n.split("#");return t.length>1&&(t=t[t.length-1].split("="),2==t.length)?parseFloat(t[1]):0}function T(n){var t=n.target;t.removeEventListener("playing",T),z.setCurrentTrackElement(a);var r=!z.enableCustomVideoControls();if(r&&e(t).attr("controls","controls"),i){var o=(z.currentSrc()||"").toLowerCase(),d=w(o);if(d&&-1!=o.indexOf(".m3u8")){var s=browserInfo.safari?2500:0;s?setTimeout(function(){t.currentTime=d},s):t.currentTime=d}}}function b(){var n=e(".mediaPlayerAudio");if(!n.length){var t="",r=!MediaPlayer.canAutoPlayAudio();t+=r?'<div class="mediaPlayerAudioContainer" style="position: fixed;top: 40%;text-align: center;left: 0;right: 0;z-index:999999;"><div class="mediaPlayerAudioContainerInner">':'<div class="mediaPlayerAudioContainer" style="display:none;padding: 1em;background: #222;"><div class="mediaPlayerAudioContainerInner">',t+='<audio class="mediaPlayerAudio" controls>',t+="</audio></div></div>",e(document.body).append(t),n=e(".mediaPlayerAudio")}return n=n[0],n.addEventListener("playing",v),n.addEventListener("timeupdate",u),n.addEventListener("ended",s),n.addEventListener("volumechange",l),n.addEventListener("error",E),n.addEventListener("pause",m),n.addEventListener("play",f),n.addEventListener("playing",c),n}function h(e){return e&&-1==e.indexOf(".m3u8")?!1:MediaPlayer.canPlayHls()&&!MediaPlayer.canPlayNativeHls()}function k(){return"anonymous"}function x(){var t="",r=!z.enableCustomVideoControls(),i=!browserInfo.safari&&n.poster?' poster="'+n.poster+'"':"";t+=r&&AppInfo.isNativeApp&&browserInfo.android?'<video class="itemVideo" id="itemVideo" preload="metadata" autoplay="autoplay"'+i+" webkit-playsinline>":r?'<video class="itemVideo" id="itemVideo" preload="metadata" autoplay="autoplay"'+i+' controls="controls" webkit-playsinline>':'<video class="itemVideo" id="itemVideo" preload="metadata" autoplay="autoplay"'+i+" webkit-playsinline>",t+="</video>";var a=e("#videoElement","#videoPlayer").prepend(t),o=e(".itemVideo",a)[0];return o.addEventListener("loadedmetadata",y),o.addEventListener("timeupdate",u),o.addEventListener("ended",s),o.addEventListener("volumechange",l),o.addEventListener("play",f),o.addEventListener("pause",m),o.addEventListener("playing",c),o.addEventListener("click",p),o.addEventListener("dblclick",g),o.addEventListener("error",E),o}function C(e,n){var t=n.map(function(e){var n=e.isDefault?" default":"",t=e.language||"und";return'<track id="textTrack'+e.index+'" label="'+t+'" kind="subtitles" src="'+e.url+'" srclang="'+e.language+'"'+n+"></track>"}).join("");e.innerHTML=t}function A(e){if(browserInfo.safari&&browserInfo.mobile)return!1;if(browserInfo.edge||browserInfo.msie)return!1;if(browserInfo.firefox&&-1!=(R||"").toLowerCase().indexOf(".m3u8"))return!1;if(e){var n=(e.format||"").toLowerCase();if("ssa"==n||"ass"==n)return!1}return!0}function I(e,n){window.removeEventListener("resize",V),window.removeEventListener("orientationchange",V);var t=document.querySelector(".videoSubtitles");if(t&&t.parentNode.removeChild(t),n)for(var r=e.textTracks,i=0;i<r.length;i++){var a=r[i];-1!=a.label.indexOf("manualTrack")&&(a.mode="disabled")}F=-1,q=null,D=null,U=null;var o=W;o&&o.setEnabled(!1),W=null}function P(e){return ApiClient.ajax({url:e.url.replace(".vtt",".js"),type:"GET",dataType:"json"})}function S(e,n){return n?void(F!=n.index&&(I(e,!0),F=n.index,H(e,n),Q=0)):void I(e,!0)}function N(e,n){var t={};require(["libjass"],function(r){r.ASS.fromUrl(n.url).then(function(n){var i=U=new r.renderers.ManualClock,a=new r.renderers.WebRenderer(n,i,e.parentNode.parentNode,t);W=a,a.addEventListener("ready",function(){try{a.resize(e.offsetWidth,e.offsetHeight,0,0),window.removeEventListener("resize",V),window.addEventListener("resize",V),window.removeEventListener("orientationchange",V),window.addEventListener("orientationchange",V)}catch(n){}})})})}function V(){var e=W;if(e){var n=O,t=n.offsetWidth,r=n.offsetHeight;e.resize(t,r,0,0)}}function H(e,n){var t=(n.format||"").toLowerCase();if("ssa"==t||"ass"==t)return void N(e,n);if(browserInfo.edge||browserInfo.msie)return void P(n).then(function(e){D=e.TrackEvents});for(var r=null,i="manualTrack"+n.index,a=e.textTracks,o=0;o<a.length;o++){var d=a[o];if(d.label==i){r=d;break}d.mode="disabled"}r?r.mode="showing":(r=e.addTextTrack("subtitles","manualTrack"+n.index,n.language||"und"),r.label="manualTrack"+n.index,P(n).then(function(e){e.TrackEvents.forEach(function(e){r.addCue(new(window.VTTCue||window.TextTrackCue)(e.StartPositionTicks/1e7,e.EndPositionTicks/1e7,e.Text.replace(/\\N/gi,"\n")))}),r.mode="showing"}))}function M(e){var n=U;n&&n.seek(e/1e3);var t=D;if(t){if(!q){var r=document.querySelector(".videoSubtitles");r||(r=document.createElement("div"),r.classList.add("videoSubtitles"),r.innerHTML='<div class="videoSubtitlesInner"></div>',document.body.appendChild(r)),q=r.querySelector(".videoSubtitlesInner")}if(!(Q>0&&Math.abs(Q-e)<500)){Q=(new Date).getTime();for(var i=1e4*e,a=0,o=t.length;o>a;a++){var d=t[a];if(i>=d.StartPositionTicks&&i<=d.EndPositionTicks)return q.innerHTML=d.Text,void q.classList.remove("hide")}q.innerHTML="",q.classList.add("hide")}}}var O,j,z=this;z.currentTime=function(e){return O?null!=e?void(O.currentTime=e/1e3):j?1e3*j:1e3*(O.currentTime||0):void 0},z.duration=function(){return O?O.duration:null},z.stop=function(){if(I(O),O&&(O.pause(),r)){j=O.currentTime;try{r.destroy()}catch(e){}r=null}},z.pause=function(){O&&O.pause()},z.unpause=function(){O&&O.play()},z.volume=function(e){return O?null!=e?void(O.volume=e):O.volume:void 0};var R;z.setCurrentSrc=function(e,n,t,s){var u=O;if(!u)return R=null,void(d=null);if(d=e,!e)return R=null,u.src=null,u.src="",void(browserInfo.safari&&(u.src="files/dummy.mp4",u.play()));u.crossOrigin=k(t);var l=e.url;AppInfo.isNativeApp&&browserInfo.safari&&(l=l.replace("file://","")),i=!1;var v=w(l),c=!1;if("audio"==u.tagName.toLowerCase())u.src=l,c=!0;else{u.removeEventListener("playing",T),u.addEventListener("playing",T),r&&(r.destroy(),r=null),v&&(i=!0),s=s||[],o=s;for(var f=-1,m=0,p=s.length;p>m;m++)if(s[m].isDefault){f=s[m].index;break}if(a=f,h(l)){C(u,s);var g=new Hls;g.loadSource(l),g.attachMedia(u),g.on(Hls.Events.MANIFEST_PARSED,function(){u.play()}),r=g}else u.src=l,u.autoplay=!0,C(u,s),u.addEventListener("loadedmetadata",y),c=!0;R=l,z.setCurrentTrackElement(f)}R=l,c&&u.play()},z.currentSrc=function(){return O?R:void 0},z.paused=function(){return O?O.paused:!1},z.cleanup=function(){z.setCurrentSrc(null),j=null;var n=O;n&&("AUDIO"==n.tagName?(n.removeEventListener("timeupdate",u),n.removeEventListener("ended",s),n.removeEventListener("volumechange",l),n.removeEventListener("playing",v),n.removeEventListener("play",f),n.removeEventListener("pause",m),n.removeEventListener("playing",c),n.removeEventListener("error",E)):(n.removeEventListener("loadedmetadata",y),n.removeEventListener("playing",T),n.removeEventListener("timeupdate",u),n.removeEventListener("ended",s),n.removeEventListener("volumechange",l),n.removeEventListener("play",f),n.removeEventListener("pause",m),n.removeEventListener("playing",c),n.removeEventListener("click",p),n.removeEventListener("dblclick",g),n.removeEventListener("error",E)),"audio"!=n.tagName.toLowerCase()&&e(n).remove())},z.supportsTextTracks=function(){return null==t&&(t=null!=document.createElement("video").textTracks),t};var q,D,U,W,F=-1,Q=0;z.setCurrentTrackElement=function(e){var n=-1==e?null:o.filter(function(n){return n.index==e})[0];A(n)?S(O,null):(S(O,n),e=-1,n=null);for(var t="textTrack"+e,r=-1!=e&&n?o.indexOf(n):-1,i=["disabled","showing","hidden"],a=O.textTracks,d=0;d<a.length;d++){var s,u=a[d];if(browserInfo.msie||browserInfo.edge)s=r==d?1:0;else{if(-1!=u.label.indexOf("manualTrack"))continue;s=u.id==t?1:0}var l=!1;!isNaN(u.mode),u.mode=l?s:i[s]}},z.updateTextStreamUrls=function(n){if(z.supportsTextTracks()){for(var t=O.textTracks,r=0;r<t.length;r++){var i=t[r];try{for(;i.cues.length;)i.removeCue(i.cues[0])}catch(a){}}e("track",O).each(function(){this.src=replaceQueryString(this.src,"startPositionTicks",n)})}},z.enableCustomVideoControls=function(){return AppInfo.isNativeApp&&browserInfo.safari?-1!=navigator.userAgent.toLowerCase().indexOf("ipad")?!1:!0:z.canAutoPlayVideo()},z.canAutoPlayVideo=function(){return AppInfo.isNativeApp?!0:browserInfo.mobile?!1:!0},z.init=function(){return new Promise(function(e){"video"==n.type&&h()?L(e):e()})},O="audio"==n.type?b():x()}var t,r,i,a,o,d;window.AudioRenderer||(window.AudioRenderer=function(e){return e=e||{},e.type="audio",new n(e)}),window.VideoRenderer||(window.VideoRenderer=function(e){return e=e||{},e.type="video",new n(e)})});