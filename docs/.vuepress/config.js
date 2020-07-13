module.exports = {
    title: 'Compass文档',
    description: 'Hello, my friend!',
    head: [
        ['link', {
            rel: 'icon',
            href: `/book.png`
        }]
    ],
    dest: './dist',
    ga: '',
    evergreen: true,
    sidebarDepth: 2,
   
    themeConfig: {
        sidebar: {
            '/guide/': [
                {
                    title: '指南',
                    collapsable: false,
                    children: [
                        { title: '简介', path:'/guide/basic/brief/'},
                        { title: '简单的CI', path: '/guide/basic/ci/' },
                        { title: '简单的CD', path: '/guide/basic/cd/' },
                        
                    ]
                },
                {
                    title: '进阶',
                    collapsable: false,
                    children: [
                        { title: '网络', path: '/guide/advanced/network/' },
                        { title: '工作负载', path: '/guide/advanced/workload/' },
                    ]
                }
        
        
        
            ],
        },
        nav: [
          { text: '首页', link: '/' },
          { text: 'GitHub', link: 'https://github.com/yametech/compass' },
        ]
    }
  }

