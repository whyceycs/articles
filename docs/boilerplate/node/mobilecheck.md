# Express判断html文件及一级访问路径

```javascript

const rootUrlRegex = /^\/(\w+)\/?$/;


function isMobile(req) {
    const deviceAgent = req.headers["user-agent"].toLowerCase();
    const agentID = deviceAgent.match(/(iphone|ipod|android)/);
    if (agentID) {
        return true;
    } else {
        return false;
    }
}

 const staticUnless = function (des, middleware) {
        return function (req, res, next) {
            const isHTML = req.path.endsWith('.html');
            const isBasePath = isHTML ? false : rootUrlRegex.test(req.path);
            //直接访问html页面或者访问一级路径
            if (isHTML || isBasePath) {
                const mobile = isMobile(req);
                //path以_mobile.html结尾的文件，但是不是移动端。把_mobile.html改为.html
                if (isHTML && (!mobile) && req.path.endsWith('_mobile.html')) {req.url = req.url.replace('_mobile.html', '.html');}
                //移动端不以_mobile.html结尾的html文件，把.html改为_mobile.html
                if (isHTML && mobile && (!req.path.endsWith('_mobile.html'))) {req.url = req.url.replace('.html', '_mobile.html');}
                //移动端一级路径，不以_mobile结尾的，添加_mobile
                if (!isHTML && mobile && (!req.path.endsWith('_mobile'))) {req.url = req.url.replace(req.path, (req.path+'_mobile'));}
                //非移动端一级路径，以_mobile结尾的，删除_mobile
                if (!isHTML && (!mobile) && (req.path.endsWith('_mobile'))) {req.url = req.url.replace('_mobile', '');}
                middleware(req, res, next);
                return;
            }
            next();
        };
    }
    app.use(staticUnless('检测到根目录访问', express.static('public/public', {extensions: ['html']})));
    app.use(express.static('public/public'));

```

