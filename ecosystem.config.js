module.exports = {
  apps: [{
    name: 'connect_backend',
    script: './backend/index.js',
    cwd: '/home/ubuntu/connect_hub',
    env: {
      NODE_ENV: 'production',
      PORT: 8081,
      MONGO_URI: 'mongodb+srv://manishkumar000802_db_user:fTkSRntTL4X5oX3T@instagram-clone.tncychp.mongodb.net/connecthub?retryWrites=true&w=majority',
      SECRET_KEY: 'SDJVIFSDJVOIJKKVKA',
      API_KEY: '725479154796424',
      API_SECRET: 'mNunqF3rX3e8y_KNsR-ILej57hA',
      CLOUD_NAME: 'dftveg232',
      FRONTEND_URL: 'http://localhost:3000',
      BACKEND_URL: 'http://localhost:8081'
    },
    instances: 1,
    exec_mode: 'fork',
    watch: false,
    max_memory_restart: '1G',
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};