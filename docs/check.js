const fs = require("fs");
const path1 = require("path");

const location = __dirname + '';

const existingFiles = [];

readDirSync(path1.join(location), existingFiles);

checkPathsExist((location + "/_sidebar.md"), existingFiles);

function readDirSync(path, result) {
    let pa = fs.readdirSync(path);
    pa.forEach(function (ele) {
        // 非隐藏文件 / 非导航文件
        if (!((ele.indexOf('.') === 0) || (ele.indexOf('_') === 0))) {
            const dirPath = path + "/" + ele;
            const info = fs.statSync(path + "/" + ele);
            //文件夹递归
            if (info.isDirectory()) {
                readDirSync(dirPath, result);
            } else {
                //.md文件
                if (ele.indexOf('.md') === (ele.length - 3)) {
                    //路径为文件夹路径
                    if (ele === 'README.md') {
                        if (path === location) {
                            result.push('/');
                        } else {
                            result.push((path + '/').replace((location + '/'), ''));
                        }
                    } else {
                        result.push(dirPath.replace((location + '/'), ''));
                    }
                }
            }
        }
    })
}


function checkPathsExist(file, paths) {
    fs.readFile(file, function (err, data) {
        const text = data + "";
        let notExist = 0;
        paths.forEach(function (ele) {
            if (text.indexOf("(" + ele + ")") === -1) {
                console.log("* ["+ele+"]("+ele+")");
                notExist += 1;
            }
        });
        if (notExist > 0) {
            console.log("上述页面不在导航中");
        } else {
            console.log("done");
        }
    });
}
