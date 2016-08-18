class ScreenShotBrowser {
    constructor() {
        this.APP_NAME = private_keys.APP_NAME;
        this.PROJECT_URL = private_keys.PROJECT_URL;
        this.API_CLOUD_VISION = `${ this.PROJECT_URL }/proxy/goog-cloud-vision-text-detection`;
        this.progress = false;
    }

    /**
     * フォトアルバムからスクリーンショット画像を選択されたとき
     */
    selectScreenShotFromAlbum(base64img = "") {
        var $ul = $('#ul-tag');
        $ul[0].innerHTML = '';
        var $photoArea = $('#screenshot');
        if (base64img.length === 0) return;
        $photoArea.css({
            width: window.innerWidth - 16
        });
        $photoArea.attr('data-base64img', base64img);
        $photoArea.attr('src', "data:image/jpeg;base64," + base64img);
    }

    /**
     * スクリーンショット画像を送信してウェブページを検索
     */
    sendSearchRequest(base64img) {
        if (!this.progress) {
            alert('しばらくこのままでお待ち下さい。完了したらお知らせします。');
            this.progress = true;
            this.callCloudVisionAPI(base64img);
        } else {
            alert('現在処理中です。お待ち下さい。');
        }
    }

    showKeywordsPanel(keywords = []) {
        var $ul = $('#ul-tag');
        for (var i = 0; i < keywords.length; i++) {
            var k = keywords[i].substring(0, 64);
            if (k.length > 2) {
                var $li = $(`<div class="se"><input type="checkbox" value="${ k }" class="ch"> ${ k }</div>`);
                $ul.append($li);
            }
        }
        this.progress = false;
    }

    callCloudVisionAPI(base64img) {
        var self = this;
        $.ajax({
            url: self.API_CLOUD_VISION,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                base64img: base64img,
                app_name: self.APP_NAME,
                pass_code: private_keys.PASSCODE_CLOUD_VISION
            })
        }).success(data => {
            var textAnnotation = data.responses[0].textAnnotations[0];
            // descriptionsの最初の要素に，解析された全文が格納されている
            var description = textAnnotation.description;
            var keywords = description.split('\n');
            alert('読み取りが完了しました。キーワードを選択して検索できます。');
            self.showKeywordsPanel(keywords);
        }).fail(msg => {
            alert("???" + JSON.stringify(msg));
        });
    }
}
