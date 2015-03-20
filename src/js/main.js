$(document).foundation();

function show(clickId) {
			var showdiv = document.getElementById(clickId);	
			var tabUl = document.querySelector('.tabs');
			var tabs = tabUl.querySelectorAll('.tab-title');			
			var tabcontentdivs = document.querySelector('.tabs-content');
			var tabcontentpanels = tabcontentdivs.querySelectorAll('.content');
			
			for (var j=0;j<tabcontentpanels.length;j++) {
				var tabClass = tabcontentpanels[j].className;
				if (tabcontentpanels[j].id == clickId) {
					if (tabClass.search("active")!=-1){
						tabClass=tabClass + ' active';
						tabs[j].className=tabs[j].className + ' active';
					}
				} else {
					tabClass=tabClass.replace('active',"");
					tabs[j].className=tabs[j].className.replace('active','');
				}
			}
		}