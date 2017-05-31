# release
fis3 release -d ./output

echo 'move start'
cp ./output/index.js ./index.js

cp ./output/index.css ./index.css
echo 'move end'

rm -rf ./output

echo 'hhhh'
