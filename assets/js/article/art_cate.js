$(function () {

    const layer = layui.layer;
    const form = layui.form;
    initArtCateList()

    // 获取文章分类的列表
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                const htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    let indexAdd = null;
    $("#btnAddCate").on("click", function () {
        indexAdd = layer.open({
            type: 1,
            area: ['400px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });
    })

    // 通过代理的方式，为form-add表单绑定 submit 事件
    $("body").on('submit', '#form-add', function (e) {
        e.preventDefault();

        $.ajax({
            method: "POST",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("添加失败");
                }
                initArtCateList();
                layer.msg("添加类别成功");

                layer.close(indexAdd);
            }
        })
    })


    let indexEdit = null
    $('tbody').on('click', '.btn-edit', function () {
        // 弹出一个修改文章分类信息的层
        indexEdit = layer.open({
            type: 1,
            area: ['400px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })

        const id = $(this).attr('data-id');
        // 发起请求获取对应分类的数据
        $.ajax({
            method: 'GET',
            url: `/my/article/cates/${id}`,
            success: function (res) {
                form.val('form-edit', res.data)
            }
        })
    })

    // 通过代理的形式，为修改分类的表单绑定 submit 事件
    $('body').on('submit', '#form-edit',function (e) {
        e.preventDefault();
        
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("更新数据失败!");
                }
                layer.msg("更新数据成功");
                layer.close(indexEdit);
                initArtCateList();
            }
        })
    })


    // 通过代理的形式，为删除按钮绑定事件
    $("tbody").on('click', '.btn-delete', function (e) {
        const id = $(this).attr('data-id');
        // 提示用户删除数据
        layer.confirm("确认删除?", {icon: 3, title: '提示'}, function (index) {
            $.ajax({
                method: 'GET', 
                url: `/my/article/deletecate/${id}`,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message);
                    }

                    layer.msg("删除数据成功");
                    layer.close(index);
                    initArtCateList()
                }
            })
        })
    })

})