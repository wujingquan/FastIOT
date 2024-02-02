module.exports = {
  apps: [
    {
      name: 'nestjs-template',
      script: 'dist/main.js',
      exec_mode: 'cluster',
      watch: false,
      autorestart: true,
      instances: 'max',
    },
  ],

  deploy: {
    production: {
      user: 'root',
      host: '101.34.204.72',
      ref: 'origin/main',
      repo: 'git@github.com:wujingquan/nestjs-template.git',
      path: '/home/wwwroot/nestjs-template',
      'post-deploy':
        'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      env: {
        PORT: 3225,
        HOST: '0.0.0.0',
      },
    },
  },
};
