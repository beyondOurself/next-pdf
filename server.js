// server.js
const express = require('express')
const next = require('next')
const { createProxyMiddleware } = require('http-proxy-middleware')

// https://ebus.csot.tcl.com/csotfastfile-web-test/file/group1/M00/00/93/CmwHlmJdKGWAD8y6AAIcBbd5Rmw580.pdf

const devProxy = {
    '/api': {
        target: 'https://ebus.csot.tcl.com', // 端口自己配置合适的
        pathRewrite: {
            '/*.pdf': '/csotfastfile-web-test/file/group1/M00/00/93/CmwHlmJdKGWAD8y6AAIcBbd5Rmw580.pdf'
        },
        router: {
            // 如果请求主机 == 'dev.localhost:3000',
            // 重写目标服务器 'http://www.example.org' 为 'http://localhost:8000'
            'dev.localhost:3000' : 'http://localhost:8000'
        },
        changeOrigin: false
    }
}

 const proxy =  createProxyMiddleware( {
     target: 'https://ebus.csot.tcl.com',
     changeOrigin:true,
            onProxyReq(proxyReq, req, res) {
                console.log('proxyReq>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
                console.log('host',proxyReq.host)
                console.log('path',proxyReq.path)
                console.log('proxyReq>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
                console.log('req>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
                console.log('host',req.host)
                console.log('path',req.path)
                console.log('req>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
                console.log('res>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
                console.log('host',res.host)
                console.log('path',res.path)
                console.log('res>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
  // add custom header to request
  proxyReq.setHeader('x-added', 'foobar');
  // or log the req
}
 })


const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({
    dev
})
const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
        const server = express()

        // if (dev && devProxy) {
        //     Object.keys(devProxy).forEach(function(context) {
        //         server.use(createProxyMiddleware(context, devProxy[context]))
        //     })
        // }


        server.use('/*.pdf',proxy)


        server.all('*', (req, res) => {
            handle(req, res)
        })

        server.listen(port, err => {
            if (err) {
                throw err
            }
            console.log(`> Ready on http://localhost:${port}`)
        })
    })
    .catch(err => {
        console.log('An error occurred, unable to start the server')
        console.log(err)
    })