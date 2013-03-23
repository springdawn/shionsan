(function(){
    var extId = "lhliaiinafigkhnfohlpmngmoifpamme";
    var extId2 = "";
    var sounds = [
        "./sounds/kawaiine.mp3",
        "./sounds/altu.mp3",
        "./sounds/kimiha.mp3",
        "./sounds/iiyo.mp3"
    ];
    var key_list = [
        "J", "K", "L", "T"
    ];
    var key_map = {};
    for (var i=0; i<key_list.length; ++i) {
        key_map[key_list[i]] = sounds[i];
    }
    for(var i=0;i<sounds.length;++i) {
        jQuery("<audio>").addClass("shionsan "+key_list[i]).prop("src", sounds[i]).appendTo("body");
    }
    chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
        try {
            if(sender.id === extId || sender.id === extId2) {
                if(request.key_map) {
                    sendResponse(key_map);
                } else if(key_map[request.key]) {
                    var audioEl = jQuery("."+request.key)[0];
                    if(!audioEl.ended) {
                        audioEl.pause();
                        audioEl.currentTime = 0;
                    }
                    audioEl.play();
                    sendResponse({response:"OK"});
                } else {
                    sendResponse({response:"NOT"});
                }
            } else {
                sendResponse({response:"BAD"});
            }
        } catch(e) {
            console.log(e.message);
        }
    });
})();
