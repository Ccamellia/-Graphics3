//实验2程序(59LYH_2DRecursive.js)

var NumTimesToSubdivide = 5;	//递归次数

var s1 = 0;
var s2 = 0;

var points = [];		//存放顶点坐标的数组，初始为空
var colors = [];//指定颜色

//页面加载完成后调用此函数，函数名任意（不一定为main）
window.onload = function main()
	{
		//获取页面中id为webgl的canvas元素
		var canvas = document.getElementById("webgl");
		if(!canvas)//获取失败？
		{
			alert("获取canvas元素失败！");
			return;
		}
		
		//利用辅助程序文件中的功能获取WebGL上下文
		//成功则后面可通过gl来调用WebGL的函数
		var gl = WebGLUtils.setupWebGL(canvas);
		if(!gl)//失败则弹出信息
		{
			alert("获取WebGL上下文失败！");
			return;
		}

		
		

		for(var t = 1.3;t >1;t-=0.001)
		{
			points.push(draw(t));	
			
		}
		
		
		for(var t = 1.1;t >0.8;t-=0.006)
		{
			points.push(draw(t));	
						
		}
		for(var t = 0.7;t >0.4;t-=0.005)
		{
			points.push(draw(t));	
						
		}
		for(var t = 0.4;t >0;t-=0.01)
		{
			points.push(draw(t));	
					
		}
	
	
		//设置WebGL相关属性
		//设置视口（此处视口占满整个canvas）
		gl.viewport(0,//视口左边界距离canvas左边界距离
					0,//视口下边界距离canvas上边界距离
					canvas.width,//视口宽度
					canvas.height);//视口高度
		gl.clearColor(0.0,0.0,0.0,1.0);//设置背景色为白色
		
		//加载shader程序并为shader中attribute变量提供数据
		//加载id分别为"vertex-shader"和"fragment-shader"的shader程序
		//并进行编译和链接，返回shader程序对象program
		var program = initShaders(gl,"vertex-shader","fragment-shader")	;
		gl.useProgram(program);	//启用该shader程序对象
		
		//将顶点属性数据传输到GPU
		var verticesBufferId = gl.createBuffer();//创建buffer
		//将id为verticesBufferId的buffer绑定为当前Array Buffer
		gl.bindBuffer(gl.ARRAY_BUFFER,verticesBufferId);
		//为当前Array Buffer提供数据，传输到GPU
		gl.bufferData(gl.ARRAY_BUFFER,	//Buffer类型
				flatten(points),		//Buffer数据来源，flatten将points转换为GPU可接受的格式
				gl.STATIC_DRAW);		//表明将如何使用Buffer（STATIC_DRAW表明是一次提供数据，多遍绘制）
		
		//为shader属性变量与buffer数据建立关联
		//获取名称为"a_Position"的shader attribute变量的位置
		var a_Position = gl.getAttribLocation(program,"a_Position");
		if(a_Position < 0)//getAttribLocation获取失败则返回-1
		{
			alert("获取attribute变量a_Position失败！");
			return;
		}
		
		//指定利用当前Array Buffer为a_Position提供数据具体方式
		gl.vertexAttribPointer(a_Position,//shader attribute变量位置
			2,			//每个顶点属性有2个分量
			gl.FLOAT,	//数组数据类型（浮点型）
			false,		//不进行归一化处理
			0,			//相邻顶点属性地址相差0个字节
			0);			//第一个顶点属性在Buffer中偏移量为0字节
		gl.enableVertexAttribArray(a_Position);//启用顶点属性数组	
		
		//将顶点颜色属性数据传输到GPU
		var colorsBufferId = gl.createBuffer();//创建buffer
		//将id为colorsBufferIdd的buffer绑定为当前Array Buffer
		gl.bindBuffer(gl.ARRAY_BUFFER,colorsBufferId);
		//为当前Array Buffer提供数据，传输到GPU
		gl.bufferData(gl.ARRAY_BUFFER,//Buffer类型
			flatten(colors),	//Buffer数据来源，flatten将colors转换为GPU可接受的格式
			gl.STATIC_DRAW);//表明将如何使用Buffer（STATIC_DRAW表明是一次提供数据，多遍绘制）
		
		//为shader属性变量与buffer数据建立关联
		//获取名称为"a_Color"的shader attribute变量的位置
		var a_Color = gl.getAttribLocation(program,"a_Color");
		if(a_Color < 0)//getAttribLocation获取失败则返回-1
		{
			alert("获取attribute变量a_Color失败！");
			return;
		}
		//指定利用当前Array Buffer为a_Position提供数据具体方式
		gl.vertexAttribPointer(a_Color,//shader attribute变量位置
			3,			//每个顶点属性有2个分量
			gl.FLOAT,	//数组数据类型（浮点型）
			false,		//不进行归一化处理
			0,			//相邻顶点属性地址相差0个字节
			0);			//第一个顶点属性在Buffer中偏移量为0字节
		gl.enableVertexAttribArray(a_Color);//启用顶点属性数组	
		
		
		//实现动画效果
		var iCount = 0;
		var tick = function()
		{
			if(iCount < points.length) 
			{
				iCount++;
			}
			render(gl,iCount);
			requestAnimationFrame(tick, canvas);
		};
		tick();
	};
	
	
function draw(t)
{
	var a = 1;
	if(a==1)
	{
		colors.push(vec3(1.0,0.75,0.85));
		a=0;
	}
	if(a==0)
	{
		colors.push(vec3(0.91,0.23,0.46));
		a=1;
	}
	var r = 1.1 * (t);
	var y = r * Math.cos(t * 360);
	var x = r * Math.sin(t * 360);
	return vec2(x,y);
	
}

	
//绘制函数，参数为WebGL上下文
function render(gl,iCount)
{
	gl.clear(gl.COLOR_BUFFER_BIT);//用背景色擦除窗口内容
	//使用顶点数组进行绘制
	gl.drawArrays(
			//gl.TRIANGLE_FAN,
			gl.LINE_STRIP,//绘制图元类型为三角形
			0,	//从第0个顶点属性数据开始绘制
			iCount);	//使用顶点个数

	
}
	



	
	
	
	
	
	
	
	
	
	
	
	
	
	
	