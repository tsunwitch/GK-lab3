var canvas;   // The canvas that is used as the drawing surface
    var graphics; // The 2D graphics context for drawing on the canvas.

    var X_LEFT = -4;    // The xy limits for the coordinate system.
    var X_RIGHT = 4;
    var Y_BOTTOM = -3;
    var Y_TOP = 3;
    
    var BACKGROUND = "white";  // The display is filled with this color before the scene is drawn.
         
    var pixelSize;  // The size of one pixel, in the transformed coordinates.
            
    var frameNumber = 0;  // Current frame number. goes up by one in each frame.

    // TODO:  Define any other necessary state variables.
    
    /**
     *  Responsible for drawing the entire scene.  The display is filled with the background
     *  color before this function is called.
     */
    function drawWorld() {
//Rysowanie obiektow na ekranie
                triangle(0,-2,1);
                triangleRight(-4,2,0.5);
                triangleLeft(4,3,1);
    }
    
    /**
     * This method is called just before each frame is drawn.  It updates the modeling
     * transformations of the objects in the scene that are animated.
     */
    function updateFrame() {
        frameNumber++;
        // TODO: If other updates are needed for the next frame, do them here.
    }
 

    //------------------- Some methods for drawing basic shapes. ----------------
    //Funkcje do rysowania obiektów
    
    function triangle(x,y,scale)
    {
     graphics.scale(-scale,scale);
      poly(2.5+x,1.60+y,14,1);
        poly(-2+x,0.9+y,14,1);
                filledRect(x-0.25,y);
                filledTriangle(x,y);
    }
     function triangleRight(x,y,scale)
    {
     graphics.scale(scale,scale);
      poly(2.5+x,1.60+y,14,1);
        poly(-2+x,0.9+y,14,1);
               filledRect(x+0.5,y+0.5);
                filledTriangle1(x,y);
    }
     function triangleLeft(x,y,scale)
    {
     graphics.scale(scale,scale);
      poly(2.5+x,1.60+y,14,1);
        poly(-2+x,0.9+y,14,1);
                filledRect(x+0.5,y-0.75);
                filledTriangle2(x,y);
    }
   


//Animacja
    
    function poly(x,y,n,size){
      graphics.save(); 
            graphics.translate(x,y);
            graphics.rotate( (frameNumber*1) * Math.PI/180 );
            graphics.beginPath();
            graphics.moveTo (size * Math.cos(0),size *  Math.sin(0));          
     for (var i = 1; i <= n;i += 1) { //rysowanie wielokatu
    graphics.lineTo(size * Math.cos(i * 2 * Math.PI / n),size * Math.sin(i * 2 * Math.PI / n));
}
      graphics.rotate(Math.PI / n); 
      for (var i = 1; i <= n;i += 1) { //linie pomiędzy wielokątami
        graphics.moveTo(0,0);
        graphics.rotate(2 * Math.PI / n);
        graphics.lineTo(0.03-size,0.26);
}
graphics.stroke();
graphics.restore();
}

//Wykorzystane figury z pliku





      function filledRect(x,y) {
      graphics.fillStyle = "red";
      graphics.rotate(2 * Math.PI / 40);
      graphics.fillRect(-2+x,1+y,5,0.45);
      graphics.rotate(-2 * Math.PI / 40);
    }



 	function filledTriangle(x,y) {
		graphics.beginPath();
  graphics.fillStyle = "blue";
		graphics.moveTo(0+x,-1+y);
		graphics.lineTo(1+x,-1+y);
		graphics.lineTo(0.5+x,1.25+y);
		graphics.closePath();
		graphics.fill();
	}
  	function filledTriangle1(x,y) {
		graphics.beginPath();
  graphics.fillStyle = "green";
		graphics.moveTo(0+x,-1+y);
		graphics.lineTo(1+x,-1+y);
		graphics.lineTo(0.5+x,1.25+y);
		graphics.closePath();
		graphics.fill();
	}
  	function filledTriangle2(x,y) {
		graphics.beginPath();
      graphics.fillStyle = "purple";
		graphics.moveTo(0+x,-1+y);
		graphics.lineTo(1+x,-1+y);
		graphics.lineTo(0.5+x,1.25+y);
		graphics.closePath();
		graphics.fill();
	}

 

    
    // ------------------------------- graphics support functions --------------------------
    
    /**
      * Draw one frame of the animation.  Probably doesn't need to be changed,
      * except maybe to change the setting of preserveAspect in applyLimits().
      */
    function draw() {
        graphics.save();  // to make sure changes don't carry over from one call to the next
        graphics.fillStyle = BACKGROUND;  // background color
        graphics.fillRect(0,0,canvas.width,canvas.height);
        graphics.fillStyle = "black";
        applyLimits(graphics,X_LEFT,X_RIGHT,Y_TOP,Y_BOTTOM,false);
        graphics.lineWidth = pixelSize;  // Use 1 pixel as the default line width
        drawWorld();
        graphics.restore();
    }
    
    /**
     * Applies a coordinate transformation to the graphics context, to map
     * xleft,xright,ytop,ybottom to the edges of the canvas.  This is called
     * by draw().  This does not need to be changed.
     */
    function applyLimits(g, xleft, xright, ytop, ybottom, preserveAspect) {
       var width = canvas.width;   // The width of this drawing area, in pixels.
       var height = canvas.height; // The height of this drawing area, in pixels.
       if (preserveAspect) {
             // Adjust the limits to match the aspect ratio of the drawing area.
          var displayAspect = Math.abs(height / width);
          var requestedAspect = Math.abs(( ybottom-ytop ) / ( xright-xleft ));
          var excess;
          if (displayAspect > requestedAspect) {
             excess = (ybottom-ytop) * (displayAspect/requestedAspect - 1);
             ybottom += excess/2;
             ytop -= excess/2;
          }
          else if (displayAspect < requestedAspect) {
             excess = (xright-xleft) * (requestedAspect/displayAspect - 1);
             xright += excess/2;
             xleft -= excess/2;
          }
       }
       var pixelWidth = Math.abs(( xright - xleft ) / width);
       var pixelHeight = Math.abs(( ybottom - ytop ) / height);
       pixelSize = Math.min(pixelWidth,pixelHeight);
       g.scale( width / (xright-xleft), height / (ybottom-ytop) );
       g.translate( -xleft, -ytop );
    }
    
    
    //------------------ Animation framework ------------------------------
    
    var running = false;  // This is set to true when animation is running
    
    function frame() {
        if (running) {
               // Draw one frame of the animation, and schedule the next frame.
            updateFrame();
            draw();
            requestAnimationFrame(frame);
        }
    }
    
    function doAnimationCheckbox() { 
        var shouldRun = document.getElementById("animateCheck").checked;
        if ( shouldRun != running ) {
            running = shouldRun;
            if (running)
                requestAnimationFrame(frame);
        }
    }
    
    //----------------------- initialization -------------------------------

    function init() {
        canvas = document.getElementById("thecanvas");
        if (!canvas.getContext) {
            document.getElementById("message").innerHTML = "ERROR: Canvas not supported";
            return;
        }
        graphics = canvas.getContext("2d");
        document.getElementById("animateCheck").checked = false; 
        document.getElementById("animateCheck").onchange = doAnimationCheckbox; 
        draw();
    }