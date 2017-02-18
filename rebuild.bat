@echo off
echo Clean...
call hexo clean
echo.
echo Generate...
if [%1] NEQ [serve] (
  call hexo generate %*
) else (
  call hexo generate %*
  echo.
  echo Serve...
  call hexo serve
)
