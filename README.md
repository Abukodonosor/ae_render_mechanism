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
3. We need to have folder where we will keep our templates like storage (C:\prj\AeTemplate\Dynamic\ ... ) At this location you need to set your tempaltes. Tempaltes can be find at Templates.zip
4. Extract Tempaltes.zip to  ``` C:\prj\AeTemplate\Dynamic\Box_Type\BoxType_HD\ ```
5. Set config file and run ``` node main.js migrate ``` /* Code to create DB table which you need for this project */

Final:

``` node main.js start ``` => will start pm2 clustered procceses (also available arguments are [start,stop,delete]

#### Format of request:
Make post request with this json (suggest: use Postman )
```
{
"OrderId": 178621,
"Content": [
    {
        "aep": "C:\\prj\\AeTemplate\\Dynamic\\Box_Type\\BoxType_HD\\04.aep",
        "target": "Final Comp",
        "id": 189755,
        "render-status": "done",
        "totalcomp": 2,
        "output": "betareevio_17329_189755_1",
        "text4.1": " ",
        "color4.1": "37b5e7",
        "bg_image4.1": "http://195.201.21.189:3008/videos/trim_videos/flxf5e975d43e9f261376e0130ac39a52051527976361486.mp4",
        "duration4.1": "http://195.201.21.189:3008/videos/trim_videos/f5e975d43e9f261376e0130ac39a52051527976361486.mp4",
        "ID": 189755
    },
    {
        "aep": "C:\\prj\\AeTemplate\\Dynamic\\Box Type\\BoxType HD\\01.aep",
        "target": "Final Comp",
        "id": 189755,
        "render-status": "done",
        "totalcomp": 2,
        "output": "betareevio_17329_189755_2",
        "text1.1": "Mobile Disco In Dudley",
        "color1.1": "37b5e7",
        "text1.2": "All Types Of Events",
        "color1.2": "37b5e7",
        "text1.3": "Multi-service Company",
        "color1.3": "37b5e7",
        "ID": 189755
    }
  
],
"status": 1,
"audioUrl": "https://sdn-global-streaming-cache.3qsdn.com/6707/uploads/6707-P5lhalSwcVwAQrrDds21.mp3",
"watermark": "",
"watermarkpos": 0,
"isFadeOut": 0,
"fadeoutMins": 0,
"volume": 1,
"removeAudio": 0,
"isAlphaChannel": 0,
"IsJpeg": 0,
"fileName": "16630_Weeding thinks",
"updateVideoUrl": "http://18.196.40.196:3010" 
}


```