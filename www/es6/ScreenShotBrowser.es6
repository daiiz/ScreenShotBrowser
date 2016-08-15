class ScreenShotBrowser {
    constructor () {
        this.APP_NAME = "android-jp.daiiz.screenshotbrowser";
        this.PROJECT_URL = 'https://74ga-dot-daiiz-apps.appspot.com';
        // daiiz-appsを介して通信する
        this.API_CLOUD_VISION = `${this.PROJECT_URL}/proxy/goog-cloud-vision`;
        this.API_GOOG_SEARCH  = `${this.PROJECT_URL}/proxy/goog-web-search`;
    }

    /**
     * フォトアルバムからスクリーンショット画像を選択されたとき
     */
    selectScreenShotFromAlbum (base64img="") {
        var $photoArea = $('#screenshot');
        if (base64img.length === 0) return;
        $photoArea.css({
            width: window.innerWidth
        });
        $photoArea.attr('data-base64img', base64img);
        $photoArea.attr('src', "data:image/jpeg;base64," + base64img);
    }

    /**
     * スクリーンショット画像を送信してウェブページを検索
     */
    sendSearchRequest (base64img) {
        alert(85);
        this.callCloudVisionAPI(base64img, null);
    }

    callCloudVisionAPI (base64img, callback=null) {
        var self = this;
        $.ajax({
            url: self.API_CLOUD_VISION,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                base64img: base64img,
                app_name: self.APP_NAME,
                pass_code: "uji65ikjpolqjdajldsao897"
            })
        }).success(data => {
            var textAnnotation = data.responses[0].textAnnotations[0];
            // descriptionsの最初の要素に，解析された全文が格納されている
            var description = textAnnotation.description;
            description = description.replace('\n', ' ');
            alert(description);
            if (callback !== null) callback();
        }).fail(msg => {
            alert("???" + JSON.stringify(msg));
        });
    }
}