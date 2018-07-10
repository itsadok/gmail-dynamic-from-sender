InboxSDK.load('1', 'sdk_dynamic-from_276d0502fa').then(function(sdk){
    console.log('Inbox SDK Loaded');
	sdk.Compose.registerComposeViewHandler(function(composeView){
	    composeView.on('recipientsChanged', function(recipients) {
			chrome.storage.sync.get('rules', function(data) {
				if (!data.rules) return;
				
				for(let rule of data.rules) {
					if (!rule.enabled || rule.sender == "") continue;

					if (rule.pattern == "") {
						composeView.setFromEmail(rule.sender);
						break;
					}

					if (RegExp(rule.pattern).test(JSON.stringify(recipients))) {
						composeView.setFromEmail(rule.sender);
						break;
					}
				}
			});
	    });
	});
});
