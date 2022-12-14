commands to deploy:

graph codegen

graph create --node http://194.226.49.156:8020 Bidtree

graph deploy --product hosted-service --version-label v0.0.1 --node http://194.226.49.156:8020 --ipfs http://194.226.49.156:5001 Bidtree
