class ScreenShotBrowser {
    constructor () {
        this.PROJECT_URL = 'https://daiiz-apps.appspot.com';
        // daiiz-appsを介して通信する
        this.API_CLOUD_VISION = `${this.PROJECT_URL}/proxy/goog-cloud-vision`;
        this.API_GOOG_SEARCH  = `${this.PROJECT_URL}/proxy/goog-web-search`;
    }

    // フォトアルバムからスクリーンショット画像を選択されたとき
    selectScreenShotFromAlbum (base64img="") {
        if (base64img.length === 0) return;
        $('#screenshot').attr('src', "data:image/jpeg;base64," + base64img);
    }
}