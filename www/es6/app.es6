var ssb;
$(function () {
    ssb = new ScreenShotBrowser();

    $('#selectPhoto').on('click', e => {
        navigator.camera.getPicture(base64img => {
            ssb.selectScreenShotFromAlbum(base64img);
        }, msg => {
        }, {
            quality: 80,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM
        });
    });
});