var ssb;
$(function () {
    ssb = new ScreenShotBrowser();

    // スクリーンショット写真を選択する
    $('#selectPhoto').on('click', e => {
        navigator.camera.getPicture(base64img => {
            ssb.selectScreenShotFromAlbum(base64img);
        }, msg => {
        }, {
            quality: 100,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM
        });
    });

    // スクリーンショット写真を送信してウェブページを探す
    $('#getSuggestUrls').on('click', e => {
        $photoArea = $('#screenshot');
        var base64img = $photoArea.attr('data-base64img');
        if (base64img.length > 0) {
            ssb.sendSearchRequest(base64img);
        }
    });
});