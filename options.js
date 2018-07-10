let table = document.getElementById('rulesTable');
function constructOptions() {
    chrome.storage.sync.get('rules', function(data) {
        if (!data.rules) {
            data.rules = [];
        }
        let template = 
            '<tr>' +
            '<td><input type="checkbox" checked="checked" name="enabled" /></td>' +
            '<td><input type="text" name="pattern" value="$PATTERN"/></td>' +
            '<td><input type="text" name="sender" value="$SENDER"/></td>' +
            '<td><button>X</button></td>' +
            '</tr>';

        let innerHtml = ""

        for(let rule of data.rules) {
            let html = template;
            if (!rule.enabled) {
                html = html.replace('checked="checked"', '');
            }
            html = html.replace('$PATTERN', rule.pattern);
            html = html.replace('$SENDER', rule.sender);

            innerHtml += html;
            // let fragment = document.createRange().createContextualFragment(html);
            // console.log("Appending HTML fragment");
            // console.log(html);
            // console.log(fragment);
            // table.appendChild(fragment)
        }
        let html = template.replace('$PATTERN', '').replace('$SENDER', '');
        innerHtml += html;

        // let fragment = document.createRange().createContextualFragment(html);
        // console.log("Appending HTML fragment");
        // console.log(html);
        // console.log(fragment);
        // //table.appendChild(fragment);
        table.innerHTML = innerHtml;
    });
    save = document.getElementById('save');
    save.addEventListener('click', function() {
        let rules = Array.from(table.children).map(tr => ({
            enabled: tr.querySelector('[name=enabled]').checked,
            pattern: tr.querySelector('[name=pattern]').value,
            sender: tr.querySelector('[name=sender]').value,
        })).filter(rule => rule.pattern != "" || rule.sender != "");
        console.log("Saving rules");
        console.log(rules);
        chrome.storage.sync.set({'rules': rules});
    });
}
console.log("Setting up options");
constructOptions();