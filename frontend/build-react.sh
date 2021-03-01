rm -rf ../prod/*
yarn build
mv ./build/* ../prod/
rm -rf ./build/
echo "*****(👍≖‿‿≖)👍 👌(≖‿‿≖👌)*****"
echo "Build React to NGINX complete"