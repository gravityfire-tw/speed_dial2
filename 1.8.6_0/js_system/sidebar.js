var panels=0;$(function(){if(getValue("options.sidebar.showBookmarks")==1){$("#bookmarks").show();panels++}else{$("#bookmarks").remove()}if(getValue("options.sidebar.showHistory")==1){$("#history").show();panels++}else{$("#history").remove()}if(getValue("options.sidebar.showApps")=="1"){$("#apps").show();panels++;loadApps("sidebar")}else{$("#apps").remove()}var b=panels*281;$("#sidebars").css({width:b,right:(-1*b)+3});$("#bookmarks,#history").css("height",$(window).height());$("#d_bookmarks").css("height",$(window).height());function c(){if(parseInt($("#sidebars").css("right"))<0){if(getValue("options.sidebar.showBookmarks")==1){if($("#bookmarks ul li").length<1){bookmarksLoad("1")}}$("#sidebars").animate({right:0},100)}$("#bookmarks,#history").css("height",$(window).height());$("#d_bookmarks").css("height",$(window).height());if(getValue("options.sidebar.showHistory")==1){renderHistoryItems()}}function a(){if(parseInt($("#sidebars").css("right"))==0){if(panels==1&&$("#sidebars > div").length==2){$("#sidebars").css("width",281)}$("#sidebars").animate({right:-b+3},175)}}$("#sidebar-toggle").hover(function(){if(SORTINGGROUPS===false&&SORTING===false){c()}});$("#sidebars").mouseenter(function(){c()});$("#container").mouseenter(function(){a()})});