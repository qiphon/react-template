#!/bin/bash
# 上传 Dev/prod
st=dev
if ([[ $1 = 'prod' ]] || [[ $1 = 'dev' ]]) ; then
    st=$1
fi
echo 开始构建 $st
svn up
echo '文件拉取成功'
svn del build
svn ci -m 'del build'
yarn $st
svn add build
svn ci -m "$st"
echo "$st 上传完成！"