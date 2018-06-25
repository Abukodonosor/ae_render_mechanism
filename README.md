# Rendering Mechanisam  ($.$)(After Effects cli)

(widnows server)

This peace of softwere is created for automation rendering processes.
This peace of code is direct glue for After Effect 2017 CC (+) - and above.

Our main goal is to make rendering mechanisam which can render scenes (compostitions) separatly.
After all scenes of one clip are rendered, we take them all, and merge it to get one final clip, which user request.

We create this system because we have alot of dinamic tempaltes, for our needs. Cuz (AE) can render 1 scene (clip) at the time, and it requires gui. This softwere can render multiplre scenes (compositions) at the same time, number of procceses who can execute in parallel depends upon your hardvere configuration.

All you have to config is in mainConfig.js file.

Main params are:
```
let config = {  
  server:{
        ip: 'http://YOUR_IP',  /* YOUR_IP => replace your ip with YOUR_IP */
        port: ':3000',
    },
     renderingProcesses:{
        aebinary: 'C:\\Program Files\\Adobe\\Adobe After Effects CC 2018\\Support Files\\aerender.exe',/* path to your AE -aerender.exe file */
        count: 15, /* Number of proceses/scenes(compositions) which can be rendered parallel */
        renderLoopRepeat: 7, /* coldown of renderProcess */
    }
};

```
To run this peace of code, you need to run:

0. Make folder at ( C:\inetpub\wwwroot\videos) /* this folder will have final videos of  user/OrderId/ => folder structure */
1. ``` npm install ``` ( to install all dependencies)
2. ``` npm install pm2 -g ``` => 1st we need to install this package globaly ( to manage proccesses and take cotnrol over clusters)
3. We need to have folder where we will keep our templates like storage (C:\prj\Dynamic\ ... ) At this location you need to set your tempaltes. Tempaltes can be find on this location ( googleDrive url:   )
4. Location of JSON which you need to send to serverApi ( googleDrive url: ) 
5. Set config file and run ``` node main.js migrate ``` /* Code to create DB table which you need for this project */

Final:

``` node main.js start ``` => will start pm2 clustered procceses (also available arguments are [start,stop,delete]

