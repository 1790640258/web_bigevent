// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image');
// 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}
const layer = layui.layer;
// 1.3 创建裁剪区域
$image.cropper(options)

$("#btnChooseImg").on('click', function () {
    // 触发input的点s击事件
    $("#file").click();
})

$("#file").on("change", function (e) {
    const [file] = e.target.files;

    if (!file) return layer.msg("请选择文件!");

    // 1. 拿到用户选择的文件
    // var file = e.target.files[0]
    // 2. 将文件，转化为路径
    const imgURL = URL.createObjectURL(file)
    // 3. 重新初始化裁剪区域
    $image
        .cropper('destroy') // 销毁旧的裁剪区域
        .attr('src', imgURL) // 重新设置图片路径
        .cropper(options) // 重新初始化裁剪区域
})

// 为确定按钮添加点击事件
$("#btnUpload").on('click', function () {
    // 获取裁剪之后的图片
    const dataURL = $image
        .cropper('getCroppedCanvas', {
            // 创建一个 Canvas 画布
            width: 100,
            height: 100
        })
        .toDataURL('image/png')

    // 向服务器提交修改后的图片
    $.ajax({
        method: "POST",
        url: "/my/update/avatar",
        data: {
            avatar: dataURL
        }, 
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg("更换图片失败!");
            }
            layer.msg("更换图片成功");
            window.parent.getUserInfo();
        }
    })
})