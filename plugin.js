{
    "moduleId" : "grabowCommuter/Speedometer",
    "title" : "Speedometer",
    "subtitle" : "A digital Speedometer",
    
    "backButton" : false,
    "enableGPS" : true,
    "zoomControl" : false,
    "screenLockRot" : true,
    "reload" : false,
    
    "loadDataWithBaseUrl1" : "http://www.google.com/",
    "loadDataWithBaseUrl2" : 
     "
<!DOCTYPE html>
<html xmlns='http://www.w3.org/1999/xhtml'>

    <head>
        <title>title</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <script src='https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
        <link rel='stylesheet' href='https://ajax.googleapis.com/ajax/libs/jquerymobile/1.4.5/jquery.mobile.min.css' />
        <script src='https://ajax.googleapis.com/ajax/libs/jquerymobile/1.4.5/jquery.mobile.min.js'></script>

        <style>
            #page1 {
                text-align: center;
                color: grey;
                font-family: Arial, Helvetica, sans-serif;
                font-size: 75%;                 
            }
        </style>

        <!-- here comes the update part ------------------------------------------------------->
        <script>
            
            function geosuccess(event) {
                                
                // $('#debugoutput').text('geosuccess: ' + count++ + ' : ' + event.coords.heading + ':' + event.coords.speed);

                var curSpeed = event.coords.speed;
                // maybe curSpeed is null!
                updateValues(curSpeed);

            }

            var count = 0;
            
            function geofailure(error) {

                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        x = 'User denied the request for Geolocation.'
                        break;
                    case error.POSITION_UNAVAILABLE:
                        x = 'Location information is unavailable.'
                        break;
                    case error.TIMEOUT:
                        x = 'The request to get user location timed out.'
                        break;
                    case error.UNKNOWN_ERROR:
                        x = 'An unknown error occurred.'
                        break;
                }
                alert(x);
            }
            
            function initGeo() {
                
                navigator.geolocation.watchPosition(
                        geosuccess,
                        geofailure,
                        {                           
                            enableHighAccuracy: true,
                            maximumAge: 5000,
                            timeout: 20000
                        }
                );
            }
        </script>

        <script>
            function initValues() {
                startTime = (new Date).getTime(); // in milliseconds
                curTime = startTime; // in milliseconds                
                distance = 0; // in meter
                speed = 0; // in m/s
                avgSpeed = 0; // in m/s
                vMax = 0; // in m/s
                factor = 3.6; // m/s -> km/h
                timeDiffStart = 0; // in s
                unit1 = localStorage.unit1;
                unit2 = localStorage.unit2;
                if (unit1 == null) {
                    unit1 = 'km/h';
                    unit2 = 'km';
                    alert('Do not rely on these values!\nThe presented values may be wrong.\nThis is for experimental usage only.');
                	
                }
                showValues();
            }
            
         </script>
        <script>
            function showValues() {
                var outSpeed = Math.round(speed*factor);
                var outAvgSpeed = Math.round(avgSpeed*factor*10)/10;
                var outMaxSpeed = Math.round(vMax*factor*10)/10;
                var elapsedTimeH = Math.round(timeDiffStart/60/60);
                var elapsedTimeM = Math.round(timeDiffStart/60);
                var elapsedTimeS = Math.round(timeDiffStart);
                var outDistance = Math.round(distance / 100 * factor/3.6)/10;
                
                $('#Speed').text(outSpeed);
                $('#AvgSpeed').text(outAvgSpeed);
                $('#VMax').text(outMaxSpeed);
                $('#Unit').text(unit1);
                $('#UnitText').text(unit1);
                
                $('#elapsedTime').text('Time: ' + elapsedTimeH + ':' + elapsedTimeM + ':' + elapsedTimeS);
                $('#distance').text(outDistance + ' ' + unit2);
            }
        </script>
        
        <script>
            function updateValues(curSpeed) {
  
                var oldTime = curTime; // in millisec
                curTime = (new Date).getTime(); // in millisec
                var timeDiff = (curTime - oldTime)/1000; // in s
                timeDiffStart = (curTime - startTime)/1000; // in s
                distance = distance + (speed * timeDiff);  // in m
                avgSpeed = distance / timeDiffStart; // in m/s 
                vMax = Math.max(vMax, curSpeed);    // in m/s
                if (curSpeed != null) speed = curSpeed;
                showValues();
            }
        </script>
        
        <script>
           function changeUnit() {
               if (unit1==='km/h') { unit1 = 'mph'; factor = 2.237; unit2 = 'miles';}
               else { unit1 = 'km/h'; factor = 3.6; unit2 = 'km'};              
               localStorage.unit1 = unit1;
               localStorage.unit2 = unit2;
               showValues();
           }
        </script>
        
        <script>
            $(document).ready(function() {
                
                styleBig = {'height': '200%', 'font-size': '300%', 'width': '50%', 'margin': '0 auto'};
                styleSmall = {'height': '100%', 'font-size': '150%', 'width': '50%', 'margin': '0 auto'};
                styleVerySmall = {'height': '100%', 'font-size': '75%', 'width': '50%', 'margin': '0 auto'};
                $('.ui-btn').css(styleSmall);
                $('#Speed').css(styleBig);
                $('#Unit').css(styleVerySmall);
                
                $(document).on('click', '#Reset', initValues);    
                $(document).on('click', '#Unit',  changeUnit);    
                
                initValues();
                showValues();
                
                initGeo();
            });
      </script>

    </head>


  
    <body>
            <div data-role='page' id='page1'>
            <div data-role='header'>
                <h1>Speedometer</h1>
            </div>
            <div data-role='content'>
                <div class='ui-grid-b'>
                    <div class='ui-block-a'>
                        <div class='div-widget' id='elapsedTime'>
                            <span id='date'>Text</span>
                        </div>
                    </div>
                    <div class='ui-block-b'>
                        <a data-role='button' id='Unit' data-mini='true'>Button</a>
                    </div>
                    <div class='ui-block-c'>
                        <div class='div-widget' id='distance'>
                            <span id='timeElapsed'>Text</span>
                        </div>
                    </div>
                </div>
                <div class='div-widget'>
                    <p> </p>
                </div>
                <div class='div-widget'>
                    <a data-role='button' id='Speed'>Button</a>
                    <span id='UnitText'>km/h</span>
                </div>
                <div class='div-widget'>
                    <p> </p>
                </div>
                <div class='div-widget'>
                    <a data-role='button' id='AvgSpeed' data-mini='true'>Button</a>
                    <span>Avg. Speed</span>
                    <p> </p>
                </div>
                <div class='div-widget'>
                    <a data-role='button' id='VMax' data-mini='true'>Button</a>
                    <span>VMax</span>
                    <p> </p>
                </div>
                <div class='div-widget'>
                    <a data-role='button' id='Reset' data-mini='true'>Reset</a>
                </div>
            </div>
        </div>
    </body>


</html>
     "
					
}
