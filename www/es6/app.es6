$(function () {
    var ssb = new ScreenShotBrowser();

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

    $('#ul-tag').on('change', 'input.ch', e => {
        var ks = '';
        var $a = $('#a-tag');
        var v = 0;
        $('input.ch').each(function () {
            var $ch = $(this);
            if ($ch[0].checked && v < 5) {
                ks += $ch.val();
                v += 1;
            }
        });
        var g = 'https://www.google.co.jp/#q=';
        $a.attr('href', g + ks);
    });
});