```bash
fswatch --event OwnerModified ~ -e ".*" -i "\\.scss$" -i "\\.css$" ./origin | while read file
do
node-sass  ./home.scss ./final.css
done
```

