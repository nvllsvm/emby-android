define(["events","libraryBrowser","imageLoader","alphaPicker"],function(e,t,r,a){return function(e,n,i){function o(e){var r=s(e),a=v[r];return a||(a=v[r]={query:{SortBy:"SortName",SortOrder:"Ascending",IncludeItemTypes:"BoxSet",Recursive:!0,Fields:"PrimaryImageAspectRatio,SortName,SyncInfo",ImageTypeLimit:1,EnableImageTypes:"Primary,Backdrop,Banner,Thumb",StartIndex:0,Limit:y},view:t.getSavedView(r)||t.getDefaultItemsView("Poster","Poster")},t.loadSavedQueryValues(r,a.query)),a}function l(e){return o(e).query}function s(e){return e.savedQueryKey||(e.savedQueryKey=t.getSavedQueryKey("movies")),e.savedQueryKey}function u(e){Dashboard.showLoadingMsg();var a=l(e);ApiClient.getItems(Dashboard.getCurrentUserId(),a).then(function(n){function o(){a.StartIndex+=a.Limit,u(i)}function l(){a.StartIndex-=a.Limit,u(i)}window.scrollTo(0,0),c(e);var d,y=LibraryBrowser.getQueryPagingHtml({startIndex:a.StartIndex,limit:a.Limit,totalRecordCount:n.TotalRecordCount,showLimit:!1,updatePageSizeSetting:!1,addLayoutButton:!1,sortButton:!1,filterButton:!1}),v=m.getCurrentViewStyle();d="Thumb"==v?t.getPosterViewHtml({items:n.Items,shape:"backdrop",preferThumb:!0,context:"movies",lazy:!0,overlayPlayButton:!0}):"ThumbCard"==v?t.getPosterViewHtml({items:n.Items,shape:"backdrop",preferThumb:!0,context:"movies",lazy:!0,cardLayout:!0,showTitle:!0,showItemCounts:!0}):"Banner"==v?t.getPosterViewHtml({items:n.Items,shape:"banner",preferBanner:!0,context:"movies",lazy:!0}):"List"==v?t.getListViewHtml({items:n.Items,context:"movies",sortBy:a.SortBy}):t.getPosterViewHtml("PosterCard"==v?{items:n.Items,shape:"portrait",context:"movies",showTitle:!0,showYear:!0,lazy:!0,cardLayout:!0,showItemCounts:!0}:{items:n.Items,shape:"portrait",context:"movies",centerText:!0,lazy:!0,overlayPlayButton:!0});var g,S,h=i.querySelectorAll(".paging");for(g=0,S=h.length;S>g;g++)h[g].innerHTML=y;for(h=i.querySelectorAll(".btnNextPage"),g=0,S=h.length;S>g;g++)h[g].addEventListener("click",o);for(h=i.querySelectorAll(".btnPreviousPage"),g=0,S=h.length;S>g;g++)h[g].addEventListener("click",l);n.Items.length||(d='<p style="text-align:center;">'+Globalize.translate("MessageNoCollectionsAvailable")+"</p>");var f=i.querySelector(".itemsContainer");f.innerHTML=d,r.lazyChildren(f),t.saveQueryValues(s(e),a),Dashboard.hideLoadingMsg()})}function c(e){var t=l(e);m.alphaPicker.value(t.NameStartsWithOrGreater)}function d(e){var r=e.querySelector(".alphaPicker");r.addEventListener("alphavaluechanged",function(t){var r=t.detail.value,a=l(e);a.NameStartsWithOrGreater=r,a.StartIndex=0,u(e)}),m.alphaPicker=new a({element:r,valueChangeEvent:"click"}),e.querySelector(".btnSort").addEventListener("click",function(r){t.showSortMenu({items:[{name:Globalize.translate("OptionNameSort"),id:"SortName"},{name:Globalize.translate("OptionImdbRating"),id:"CommunityRating,SortName"},{name:Globalize.translate("OptionDateAdded"),id:"DateCreated,SortName"},{name:Globalize.translate("OptionParentalRating"),id:"OfficialRating,SortName"},{name:Globalize.translate("OptionReleaseDate"),id:"PremiereDate,SortName"}],callback:function(){l(e).StartIndex=0,u(e)},query:l(e),button:r.target})});var n=e.querySelector(".btnSelectView");n.addEventListener("click",function(e){t.showLayoutMenu(e.target,m.getCurrentViewStyle(),"List,Poster,PosterCard,Thumb,ThumbCard".split(","))}),n.addEventListener("layoutchange",function(r){var a=r.detail.viewStyle;o(e).view=a,t.saveViewSetting(s(e),a),l(e).StartIndex=0,u(e)}),e.querySelector(".btnNewCollection").addEventListener("click",function(){require(["collectionEditor"],function(e){var t=ApiClient.serverInfo().Id;(new e).show({items:[],serverId:t})})})}var m=this,y=t.getDefaultPageSize(),v={};m.getCurrentViewStyle=function(){return o(i).view},d(i),m.renderTab=function(){u(i),c(i)},m.destroy=function(){}}});