module.exports = {
  apps : [
    {
      name: "cloud_native",
      script: "./src/app.js",
      instances: 4,
      exec_mode: "cluster",
      watch: true,
      increment_var: 'PORT',
      env:{
          "PORT": 3000,
          "NODE_ENV": "development"
      }
    }
  ]
}
