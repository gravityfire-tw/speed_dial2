if (localStorage.getItem('options.prereleases') == "true") {
	top.location.href=chrome.extension.getURL('beta.html');	
}