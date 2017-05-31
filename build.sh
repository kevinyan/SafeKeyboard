# release
fis3 release -d ./output

echo 'move start'
cp ./output/safekeyboard.js ./safekeyboard.js

cp ./output/safekeyboard.css ./safekeyboard.css
echo 'move end'

rm -rf ./output

echo 'hhhh'
