title: 通过travis ci 自动部署项目

```
language: node_js
node_js:
- 5.9
os:
- osx
cache:
  apt: true
  directories:
  - node_modules
before_install:
- chmod ugo+x ./script/publish.sh
- git config --global user.name "tomyail-ci"
- git config --global user.email "tomyail1989@gmail.com"
- git remote rm origin
- git remote add origin https://$GH_TOKEN@github.com/Tomyail/tomyail.github.com.git

script:
- git clone https://$GH_TOKEN@github.com/Tomyail/blog_cache.git blog_cache
- git clone https://$GH_TOKEN@github.com/Tomyail/tomyail.github.com.git blog_output
- rsync -rv ./blog_cache/db.json ./db.json
- npm run g
- git log -1 --pretty=format:'%h:%s' >> commit_msg
- rsync -rv ./public/ ./blog_output/
- rsync -rv ./db.json ./blog_cache/db.json
- cd ./blog_output/
- git add .
- git commit -F ../commit_msg
- git push origin master
- cd ..
- cd ./blog_cache/
- git add .
- git commit -F ../commit_msg
- git push origin master
```

https://github.com/Tomyail/tomyail.github.com/blob/draft/.travis.yml
