```

server {
    listen 8080;

    # 静态资源服务器
    location /dist/ {
        alias /www/static/;
        add_header Cache-Control max-age=3600;
        # autoindex on;
    }

    # 健康检查
    location /health {
        add_header Content-Type text/plain;
        return 200 "ok";
    }

    # 后端系统接口代理
    location ~* ^/api/ {
        rewrite /api/(.*)$ /$1 break;
        add_header Cache-Control no-store;
        proxy_pass http://stbui.com;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }


    # 根路径
    location / {
        # 微前端
        rewrite ^/(mpa|spa|test)/index.html$ /index.html break;

        if ($request_filename ~* .*\.(html|htm)$) {
            add_header Cache-Control no-cache;
        }
        
        root /www/static/;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
        # autoindex on;
    }
}
```

cors
```
location / {
     if ($request_method = 'OPTIONS') {
        add_header 'Access-Control-Allow-Origin' '*';
        #
        # Om nom nom cookies
        #
        add_header 'Access-Control-Allow-Credentials' 'true';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        #
        # Custom headers and headers various browsers *should* be OK with but aren't
        #
        add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type';
        #
        # Tell client that this pre-flight info is valid for 20 days
        #
        add_header 'Access-Control-Max-Age' 1728000;
        add_header 'Content-Type' 'text/plain charset=UTF-8';
        add_header 'Content-Length' 0;
        return 204;
     }
     if ($request_method = 'POST') {
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Credentials' 'true';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type';
     }
     if ($request_method = 'GET') {
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Credentials' 'true';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type';
     }
}
```
