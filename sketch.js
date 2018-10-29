let h;
let w;

let bgImg;
let bgImgScaling = 1;
let bgImgBuffer = [];
let bgImgWidth;
let bgImgHeight;
let offsetYBG = 0;

let roadImg;
let roadImgScaling = 0.25;
let roadImgBuffer = [];
let roadImgWidth;
let roadImgHeight;
let roadImgBlocks;
let offsetYRoad = 100;

let roadX1;
let roadX2;

let redCarImg;
let redCarImgScaling = 1;
let redCarImgWidth;
let redCarImgHeight;

let carColors = 3;

let vehicleImagesUP = [];
let vehicleImagesBufferUP = [];
let vehicleCountUP = 1;


let vehicleImagesDOWN = [];
let vehicleImagesBufferDOWN = [];
let vehicleCountDOWN = 1;




let imagesLoaded = false;

let speed = 10;


let carX;
let carY;

let carSpeed = 10;
let carTollerance = 2;

let canvas;

function setup()
{
	noLoop();
	w = windowWidth;
	h = windowHeight; 
	canvas = createCanvas(w,h);
	canvas.parent(document.getElementById("canvasHolder"));
	frameRate(60);
	bgImg = loadImage("images/bg1.png");
	roadImg = loadImage("images/road2.jpg");
	vehicleImagesUP = [loadImage("images/car_up_red.png"),loadImage("images/car_up_green.png"),
	loadImage("images/car_up_pink.png")];
	vehicleImagesDOWN = [loadImage("images/car_down_red.png"),loadImage("images/car_down_green.png"),
	loadImage("images/car_down_pink.png")];
	redCarImg = loadImage("images/car_up_red.png",imgReady);	
	console.log("Loaded");
}

function gameOver()
{
	noLoop();
	console.log("Game Over");
}

function draw() 
{
	if(imagesLoaded)
	{
		background(0);
		drawScenery();
		drawVehicles();
		drawRedCar();
	}
	if(keyIsDown(UP_ARROW))
	{
		if(carY > carTollerance)
		{
			carY -= 1 * carSpeed;
		}
	}
	else if(keyIsDown(DOWN_ARROW))
	{
		if(carY + redCarImgHeight < h - carTollerance)
		{
			carY += 1 * carSpeed;
		}
	}
	if(keyIsDown(LEFT_ARROW))
	{
		if(carX + redCarImgWidth/2 > roadX1 - carTollerance)
		{
			carX -= 1 * carSpeed;
		}
	}
	else if(keyIsDown(RIGHT_ARROW))
	{
		if(carX + redCarImgWidth/2 < roadX2  + carTollerance)
		{
			carX += 1 * carSpeed;
		}
	}
}


function drawRedCar()
{
	image(redCarImg,carX,carY,redCarImgWidth,redCarImgHeight);
}


function drawVehicles()
{
	for(var i =0;i<vehicleCountUP;i++)
	{
		image(vehicleImagesUP[vehicleImagesBufferUP[i][3]],vehicleImagesBufferUP[i][0],vehicleImagesBufferUP[i][1] += 1  * vehicleImagesBufferUP[i][2],redCarImgWidth,redCarImgHeight);
		if(carX + redCarImgWidth >= vehicleImagesBufferUP[i][0] && carX < vehicleImagesBufferUP[i][0]+redCarImgWidth)
		{
			if(carY >= vehicleImagesBufferUP[i][1] && carY < vehicleImagesBufferUP[i][1]+redCarImgHeight)
			{
				gameOver();
			}
		}
	}

	for(var i =0;i<vehicleCountDOWN;i++)
	{
		image(vehicleImagesDOWN[vehicleImagesBufferDOWN[i][3]],vehicleImagesBufferDOWN[i][0],vehicleImagesBufferDOWN[i][1] += 1  * vehicleImagesBufferDOWN[i][2],redCarImgWidth,redCarImgHeight);
		if(carX + redCarImgWidth >= vehicleImagesBufferDOWN[i][0] && carX < vehicleImagesBufferDOWN[i][0]+redCarImgWidth)
		{
			if(carY >= vehicleImagesBufferDOWN[i][1] && carY < vehicleImagesBufferDOWN[i][1]+redCarImgHeight)
			{
				gameOver();
			}
		}
	}


	for(var i=0;i<vehicleCountUP;i++)
	{
		if(vehicleImagesBufferUP[i][1] >= h)
		{
			vehicleImagesBufferUP[i] = generateDataUP();
		}
	}

	for(var i=0;i<vehicleCountDOWN;i++)
	{
		if(vehicleImagesBufferDOWN[i][1] >= h)
		{
			vehicleImagesBufferDOWN[i] = generateDataDown();
		}
	}
}

function drawScenery()
{
	for(var i =0;i<bgImgBuffer.length;i++)
	{
		image(bgImg,0,bgImgBuffer[i]+offsetYBG,bgImgWidth,bgImgHeight);
	}
	for(var i=0;i<roadImgBuffer.length;i++)
	{
		image(roadImg,w/2 - roadImgWidth/2,roadImgBuffer[i] += 1 * speed,roadImgWidth,roadImgHeight);
	}
	offsetYBG += 1 * speed;
	if(offsetYBG >= bgImgHeight)
	{
		console.log("Resetting BG Buffer");
		bgImgBuffer[0] = -bgImgHeight;
		bgImgBuffer[1] = 0;
		offsetYBG = 0;
	}
	for(var i=0;i<roadImgBlocks;i++)
	{
		if(roadImgBuffer[i] >= h)
		{
			roadImgBuffer[i] = -roadImgHeight;
		}
	}
}
function generateDataUP(i = 1)
{
	return [(w/2 + roadImgWidth/2 - redCarImgWidth - 50)+rNoise(),
		-redCarImgHeight * i,Math.random()*speed*0.8 + speed*0.1,Math.floor(Math.random()*vehicleImagesUP.length)];
}

function generateDataDown(i = 1)
{
	return [(w/2 - roadImgWidth/2 + redCarImgWidth/2)+rNoise(),
		-redCarImgHeight * i,Math.random()*speed*1.8 + speed*1.1,Math.floor(Math.random()*vehicleImagesDOWN.length)];
}

function rNoise()
{
	let r = Math.random()*75;
	return Math.random() > 0.5 ? r : -r ;
}


function imgReady()
{
	bgImgWidth = bgImg.width*bgImgScaling;
	bgImgHeight = bgImg.height*bgImgScaling;
	roadImgWidth = roadImg.width * roadImgScaling;
	roadImgHeight = roadImg.height * roadImgScaling;
	roadImgBlocks = Math.ceil(h / roadImgHeight) + 1;
	redCarImgWidth = redCarImg.width * redCarImgScaling;
	redCarImgHeight = redCarImg.height * redCarImgScaling;
	roadX1 = w/2 - roadImgWidth/2;
	roadX2 = w/2 + roadImgWidth/2;
	carX = w/2;
	carY = h/2;
	for(var i=0;i<vehicleCountUP;i++)
	{
		vehicleImagesBufferUP[i] = generateDataUP(i);
	}
	for(var i=0;i<vehicleCountDOWN;i++)
	{
		vehicleImagesBufferDOWN[i] = generateDataDown(i);
	}
	for(var i=0;i<roadImgBlocks;i++)
	{
		roadImgBuffer[i] = (h - (roadImgHeight * i+1));
	}
	bgImgBuffer[0] = -bgImgHeight;
	bgImgBuffer[1] = 0;
	imagesLoaded = true;
	loop();
}