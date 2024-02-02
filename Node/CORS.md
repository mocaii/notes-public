# CORS

## 相关配置

### 请求校验（预检）

- `Origin`: 预检请求或实际请求的源站
- `Access-Control-Request-Method`: 预检请求的请求方法
- `Access-Control-Request-Headers`: 预检请求的请求头字段

### 响应配置

- `Access-Control-Allow-Origin`: 允许访问的源站
- `Access-Control-Allow-Methods`: 允许访问的请求方法
- `Access-Control-Allow-Headers`: 允许访问的请求头字段
- `Access-Control-Expose-Headers`: 允许访问自定义请求头字段
- `Access-Control-Allow-Credentials`: 允许携带 cookie
- `Access-Control-Max-Age`: 预检请求的有效时间，指定 perflight 请求结果能够被缓存多久
