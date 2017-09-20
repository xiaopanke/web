var K = (function(){
	var canvas, ctx;
	
	/**
	 * 设定参数默认值
	 */
	var setDftValue = function(ops, dftOps){
		ops = ops || {};
		dftOps = dftOps || {};
		
		/* 参数不存在时，从默认参数中读取并赋值 */
		for(var p in dftOps)
		if(!(p in ops))
			ops[p] = dftOps[p];

		return ops;
	};
	
	/**
	 * 设置画布
	 * @param ops 参数
	 * @param ops.canvas 画布
	 */
	var setCanvas = function(ops){
		ops = setDftValue(ops, {canvas: null});
		
		canvas = ops.canvas;
		ctx = canvas.getContext("2d");
	};
	
	/**
	 * 返回当前使用的画布
	 */
	var getCanvas = function(){
		return canvas;
	};
		
	/**
	 * 清空绘图区域
	 * @param ops.x 矩形坐标
	 */
	var clear = function(ops){
		ops = setDftValue(ops, {x: 0, y: 0, width: canvas.width, height: canvas.height});
		
		ctx.clearRect(ops.x, ops.y, ops.width, ops.height);
	};
	
	/**
	 * 设定线条样式
	 * @param ops 控制选项
	 * @param ops.lineCap 线帽
	 * @param ops.lineJoin 线条交汇处的样式
	 * @param ops.miterLimit 线条交汇处样式设定为miter时的最大宽度
	 * @param ops.lineWidth 线条宽度
	 * @param ops.strokeStyle 线条绘制样式
	 * @param ops.lineDash 虚线配置
	 * @param ops.lineDashOffset 虚线偏移
	 */
	var setLineStyle = function(ops){
		ops = setDftValue(ops, {lineCap: "butt", lineJoin: "miter", miterLimit: null, lineWidth: 1, strokeStyle: "#00FF00", lineDash: null, lineDashOffset: 0});
		
		if(null != ops.lineCap)
			ctx.lineCap = ops.lineCap;
		if(null != ops.lineJoin)
			ctx.lineJoin = ops.lineJoin;
		if(null != ops.miterLimit)
			ctx.miterLimit = ops.miterLimit;
		if(null != ops.lineWidth)
			ctx.lineWidth = ops.lineWidth;
		if(null != ops.strokeStyle)
			ctx.strokeStyle = ops.strokeStyle;
		if(null != ops.lineDash)
			ctx.setLineDash(ops.lineDash);
		if(null != ops.linlineDashOffseteCap)
			ctx.lineDashOffset = ops.lineDashOffset;
	};
	
	/**
	 * 获取线条样式
	 */
	var getLineStyle = function(){
		return {
			lineCap: ctx.lineCap,
			lineJoin: ctx.lineJoin,
			miterLimit: ctx.miterLimit,
			lineWidth: ctx.lineWidth,
			strokeStyle: ctx.strokeStyle,
			lineDash: ctx.getLineDash(),
			lineDashOffset: ctx.lineDashOffset
		};
	};
	
	var getOffsetLeftPage = function(ele){//获取距离页面左边的距离，即实际横坐标，以像素为单位
	       var lt = ele.offsetLeft;
	       while(ele = ele.offsetParent)
	              lt += ele.offsetLeft;
	      
	       return lt;
	};
	var getOffsetTopPage = function(ele){//获取距离页面顶端的距离，即实际纵坐标，以像素为单位
	       var tp = ele.offsetTop;
	       while(ele = ele.offsetParent)
	                     tp += ele.offsetTop;
	      
	       return tp;
	};
	var getScrolledLeft = function(ele){
	       var sl = ele.scrollLeft;
	       while(ele = ele.parentNode)
	              sl += ele.scrollLeft == undefined? 0: ele.scrollLeft;
	       return sl;
	};
	var getScrolledTop = function(ele){
	       var st = ele.scrollTop;
	       while(ele = ele.parentNode)
	              st += ele.scrollTop == undefined? 0: ele.scrollTop;
	       return st;
	};
	
	/**
	 * 绘制字体
	 * @param ops 控制选项
	 * @param ops.x 横坐标
	 * @param ops.y 纵坐标
	 * @param ops.font 字体
	 * @param ops.textAlign 对齐方式
	 * @param ops.textBaseline 基线
	 * @param ops.text 内容
	 * @param ops.type 如何绘制字体（fill或type）
	 * @param ops.fillStyle 填充样式
	 * @param ops.strokeStyle stroke样式
	 * @param ops.maxWidth 最大宽度
	 */
	var drawText = function(ops){
		ops = setDftValue(ops, {x: 0, y: 0, font: null, textAlign: null, textBaseline: "top", text: "", type: "fill", fillStyle: null, strokeStyle: null, maxWidth: null});
		
		ctx.save();
		
		if(null != ops.font)
			ctx.font = ops.font;
		if(null != ops.textAlign)
			ctx.textAlign = ops.textAlign;
		if(null != ops.textBaseline)
			ctx.textBaseline = ops.textBaseline;
		if(null != ops.fillStyle)
			ctx.fillStyle = ops.fillStyle;
		if(null != ops.strokeStyle)
			ctx.strokeStyle = ops.strokeStyle;
		
		if(null != ops.maxWidth)
			ctx[ops.type + "Text"](ops.text, ops.x, ops.y, ops.maxWidth);
		else
			ctx[ops.type + "Text"](ops.text, ops.x, ops.y);
		
		ctx.restore();
	};
	
	/**
	 * 绘制被填充的柱状图
	 * @param ops 控制选项
	 * @param ops.x 横坐标
	 * @param ops.y 纵坐标
	 * @param ops.width 宽度
	 * @param ops.height 高度
	 * @param ops.fillStyle 填充样式
	 */
	var drawFilledRect = function(ops){
		ops = setDftValue(ops, {x: 0, y: 0, width: 50, height: 100, fillStyle: "#00FF00"});
		
		ctx.save();
		
		if(null != ops.fillStyle)
			ctx.fillStyle = ops.fillStyle;
		ctx.fillRect(ops.x, ops.y, ops.width, ops.height);
		
		ctx.restore();
	};
	
	/**
	 * 绘制线条柱状图
	 * @param ops 控制选项
	 * @param ops.x 横坐标
	 * @param ops.y 纵坐标
	 * @param ops.width 宽度
	 * @param ops.height 高度
	 * @param ops.strokeStyle 线条样式
	 * @param ops.lineWidth 线条宽度
	 * @param ops.lineJoin 线条交汇处样式（miter, bevel, round）
	 * @param ops.miterLimit 线条交汇处样式设置为miter时的最大宽度
	 */
	var drawStrokedRect = function(ops){
		ops = setDftValue(ops, {x: 0, y: 0, width: 50, height: 100, strokeStyle: "#00FF00", lineWidth: 1, lineJoin: "miter", miterLimit: null});
		
		ctx.save();
		
		setLineStyle({strokeStyle: ops.strokeStyle, lineWidth: ops.lineWidth, lineJoin: ops.lineJoin, miterLimit: ops.miterLimit});
		ctx.strokeRect(ops.x, ops.y, ops.width, ops.height);
		
		ctx.restore();
	};
	
	/**
	 * 绘制具备边框线条同时也被填充了的柱状图
	 * @param ops 控制选项
	 * @param ops.x 横坐标
	 * @param ops.y 纵坐标
	 * @param ops.width 宽度
	 * @param ops.height 高度
	 * @param ops.strokeStyle 线条样式
	 * @param ops.fillStyle 填充样式
	 * @param ops.lineWidth 线条宽度
	 * @param ops.lineJoin 线条交汇处样式（miter, bevel, round）
	 * @param ops.miterLimit 线条交汇处样式设置为miter时的最大宽度
	 */
	var drawStrokedFilledRect = function(ops){
		ops = setDftValue(ops, {x: 0, y: 0, width: 50, height: 100, fillStyle: "#00FF00", strokeStyle: "#000000", lineWidth: 1, lineJoin: "miter", miterLimit: null});
		
		ctx.save();
		
		setLineStyle({strokeStyle: ops.strokeStyle, lineWidth: ops.lineWidth, lineJoin: ops.lineJoin, miterLimit: ops.miterLimit});
		if(null != ops.fillStyle)
			ctx.fillStyle = ops.fillStyle;
		
		ctx.rect(ops.x, ops.y, ops.width, ops.height);
		ctx.fill();
		ctx.stroke();
		
		ctx.restore();
	};
	
	/**
	 * 绘制圆点
	 * @param ops 控制选项
	 * @param ops.x 圆心横坐标
	 * @param ops.y 圆心纵坐标
	 * @param ops.radius 圆点半径长度
	 * @param fillStyle 填充样式
	 */
	var drawDot = function(ops){
		ops = setDftValue(ops, {x: 0, y: 0, radius: 20, fillStyle: "#000000"});
		
		ctx.save();
		
		ctx.fillStyle = ops.fillStyle;
		ctx.arc(ops.x, ops.y, ops.radius, 0, 2 * Math.PI);
		ctx.fill();
		
		ctx.restore();
	};
	
	/**
	 * 绘制实线
	 * @param ops 控制选项
	 * @param ops.startX 起点横坐标
	 * @param ops.startY 起点纵坐标
	 * @param ops.endX 终点横坐标
	 * @param ops.endY 终点纵坐标
	 * @param ops.lineCap 线帽
	 * @param ops.lineJoin 线条交汇处的样式
	 * @param ops.miterLimit 线条交汇处样式设定为miter时的最大宽度
	 * @param ops.lineWidth 线条宽度
	 * @param ops.strokeStyle 线条绘制样式
	 */
	var drawSolidLine = function(ops){
		ops = setDftValue(ops, {startX: 0, startY: 0, endX: canvas.width, endY: canvas.height, lineCap: "butt", lineJoin: "miter", miterLimit: null, lineWidth: 1, strokeStyle: "#000000"});
		
		ctx.save();
		
		setLineStyle({lineCap: ops.lineCap, lineJoin: ops.lineJoin, miterLimit: ops.miterLimit, lineWidth: ops.lineWidth, strokeStyle: ops.strokeStyle});
		
		ctx.beginPath();
		ctx.moveTo(ops.startX, ops.startY);
		ctx.lineTo(ops.endX, ops.endY);
		ctx.stroke();
		
		ctx.restore();
	};
	
	/**
	 * 绘制虚线
	 * @param ops 控制选项
	 * @param ops.startX 起点横坐标
	 * @param ops.startY 起点纵坐标
	 * @param ops.endX 终点横坐标
	 * @param ops.endY 终点纵坐标
	 * @param ops.lineCap 线帽
	 * @param ops.lineJoin 线条交汇处的样式
	 * @param ops.miterLimit 线条交汇处样式设定为miter时的最大宽度
	 * @param ops.lineWidth 线条宽度
	 * @param ops.strokeStyle 线条绘制样式
	 * @param ops.lineDash 虚线配置
	 * @param ops.lineDashOffset 虚线偏移
	 */
	var drawDashedLine = function(ops){
		ops = setDftValue(ops, {startX: 0, startY: 0, endX: canvas.width, endY: canvas.height, lineCap: "butt", lineJoin: "miter", miterLimit: null, lineWidth: 1, strokeStyle: "#000000", lineDash: [5, 2, 1], lineDashOffset: 0});
		
		ctx.save();
		
		setLineStyle({lineCap: ops.lineCap, lineJoin: ops.lineJoin, miterLimit: ops.miterLimit, lineWidth: ops.lineWidth, strokeStyle: ops.strokeStyle, lineDash: ops.lineDash, lineDashOffset: ops.lineDashOffset});
		
		ctx.beginPath();
		ctx.moveTo(ops.startX, ops.startY);
		ctx.lineTo(ops.endX, ops.endY);
		ctx.stroke();
		
		ctx.restore();
	};
	
	/**
	 * 构造类
	 * @param canvasObj 用于绘制K线等的画布DOM对象
	 */
	var K = function(canvasObj){
		setCanvas({canvas: canvasObj});
		clear({x: 0, y: 0, width: canvasObj.width, height: canvasObj.height});
		
		var ctx = canvasObj.getContext("2d");
		
		/** 绘制图形用到的数据集合 */
		var datas = [];
		
		/** 存放数据分析结果 */
		var analysis = null;
		
		/** 存放图形绘制所使用的相关数据 */
		var renderMetadata = {};
		
		/**
		 * 设定要渲染的数据列表
		 * 
		 * @param _datas 要渲染的数据
		 * @param _datas[index].time 产生数据的时间（直接呈现在X轴上）
		 * @param _datas[index].openingPrice 开盘价
		 * @param _datas[index].closingPrice 收盘价
		 * @param _datas[index].topPrice 最高价
		 * @param _datas[index].bottomPrice 最低价
		 * @param _datas[index].volume 成交量
		 * 
		 * @returns this
		 */
		this.setDatas = function(_datas){
			datas = _datas;
			analysis = null;
			renderMetadata = {};
			
			return this;
		};
		
		/**
		 * 获取要渲染的数据列表
		 * 
		 * @returns this
		 */
		this.getDatas = function(){
			return datas;
		};
		
		/**
		 * 清除画布内容
		 * 
		 * @returns this
		 */
		this.clear = function(){
			setCanvas({canvas: canvasObj});
			clear({x: 0, y: 0, width: canvasObj.width, height: canvasObj.height});
			
			return this;
		};
		
		/**
		 * 分析数据
		 * 
		 * @returns this
		 */
		this.analyse = function(){
			/** 确定Y轴最大值、最小值 */
			var maxPrice = 0, minPrice = Infinity, maxVolume = 0, minVolume = Infinity;
			datas.forEach(function(itm){
				if(itm.openingPrice > maxPrice) maxPrice = itm.openingPrice;
				if(itm.openingPrice < minPrice) minPrice = itm.openingPrice;
				if(itm.closingPrice > maxPrice) maxPrice = itm.closingPrice;
				if(itm.closingPrice < minPrice) minPrice = itm.closingPrice;
				if(itm.topPrice > maxPrice) maxPrice = itm.topPrice;
				if(itm.topPrice < minPrice) minPrice = itm.topPrice;
				if(itm.bottomPrice > maxPrice) maxPrice = itm.bottomPrice;
				if(itm.bottomPrice < minPrice) minPrice = itm.bottomPrice;
				
				if(itm.volume > maxVolume) maxVolume = itm.volume;
				if(itm.volume < minVolume) minVolume = itm.volume;
			});
			
			var getTopLimit = function(v){
				var s = String(v);
				var dotIndex = s.indexOf(".");
				var integerStr = -1 == dotIndex? s: s.substring(0, dotIndex);
				
				var zeroes = Math.pow(10, integerStr.length - 1);
				var n = Math.floor(v / zeroes) + 1;
				
				return n * zeroes;
			};
			var getBottomLimit = function(v){
				var s = String(v);
				var dotIndex = s.indexOf(".");
				var integerStr = -1 == dotIndex? s: s.substring(0, dotIndex);
				
				var zeroes = Math.pow(10, integerStr.length - 1);
				var n = Math.floor(v / zeroes) - 1;
				
				return n <= 0? 0: n * zeroes;
			};
			
			
			analysis = {};
			analysis.priceTopLimit = getTopLimit(maxPrice);
			analysis.priceBottomLimit = getBottomLimit(minPrice);
			analysis.volumeTopLimit = getTopLimit(maxVolume);
			analysis.volumeBottomLimit = getBottomLimit(minVolume);
			
			analysis.maxPrice = maxPrice;
			analysis.minPrice = minPrice;
			analysis.maxVolume = maxVolume;
			analysis.minVolume = minVolume;
			
			return this;
		};
		
		/**
		 * 获取数据分析结果
		 * 
		 * @returns 数据分析结果：
		 *   priceTopLimit K线Y轴最大值
		 *   priceBottomLimit K线Y轴最小值
		 *   maxPrice 数据中最大的K线Y轴取值
		 *   minPrice 数据中最小的K线Y轴取值
		 * 
		 *   volumeTopLimit 成交量Y轴最大值
		 *   volumeBottomLimit 成交量Y轴最小值
		 *   maxVolume 数据中最大的成交量Y轴取值
		 *   minVolume 数据中最小的成交量Y轴取值
		 */
		this.getAnalysedResult = function(){
			return analysis;
		};
		
		/**
		 * 获取图形渲染所使用的相关数据
		 * 
		 * @returns 图形绘制中计算的中间数据
		 * 
		 *   k_offsetLeft K线图形区域距离指定宽度左侧的距离
		 *   k_offsetRight K线图形区域距离指定宽度右侧的距离
		 *   k_offsetTop K线图形区域距离指定高度顶部的距离
		 *   k_offsetBottom K线图形区域距离指定高度底部的距离
		 *   k_heightPriceRatio K线图形中物理像素位移与价格的比值
		 *   k_barWidth K线图形中绘制的柱子宽度
		 *   k_barGap K线图形中绘制的相邻两个柱子之间的间隔
		 *   k_width 绘制K线所使用的画布宽度
		 *   k_height 绘制K线所使用的画布高度
		 * 
		 *   v_offsetLeft 成交量图形区域距离指定宽度左侧的距离
		 *   v_offsetRight 成交量图形区域距离指定宽度右侧的距离
		 *   v_offsetTop 成交量图形区域距离指定高度顶部的距离
		 *   v_offsetBottom 成交量图形区域距离指定高度底部的距离
		 *   v_heightPriceRatio 成交量图形中物理像素位移与价格的比值
		 *   v_barWidth 成交量图形中绘制的柱子宽度
		 *   v_barGap 成交量图形中绘制的相邻两个柱子之间的间隔
		 *   v_width 绘制成交量所使用的画布宽度
		 *   v_height 绘制成交量所使用的画布高度
		 */
		this.getRenderMetadata = function(){
			return renderMetadata;
		};
		
		/**
		 * 绘制K线
		 * 
		 * @param ops 渲染控制
		 * @param ops.x 绘制区域左上角横坐标。默认：0
	 	 * @param ops.x 绘制区域左上角横坐标。默认：0
		 * @param ops.y 绘制区域左上角纵坐标。默认：0
		 * @param ops.width 绘制区域宽度
		 * @param ops.height 绘制区域高度
		 * @param ops.offsetLeft 数据区域距离左边的位移。默认：30
		 * @param ops.offsetRight 数据区域距离右边的位移。默认：30
		 * @param ops.offsetTop 数据区域距离顶部的位移。默认：30
		 * @param ops.offsetBottom 数据区域距离底部的位移。默认：30
		 * @param ops.barWidth 烛台宽度。默认：5
		 * @param ops.barGap 烛台之间的距离。默认：3
		 * 
		 * @param ops.renderTypeNote 是否渲染图形类型（K线）标注
		 * @param ops.renderAverageLine 是否渲染平均值
		 * @param ops.plotHorizontalLineNumber 数据区域中横向标线个数
		 * @param ops.plotVerticalLineSpan 数据区域中相邻两个纵向标线之间所间隔的数据个数
		 * @param ops.labelRenderSpan 横坐标渲染跨度，即相邻的两个横坐标取值之间所间隔的数据个数。取值-1代表不绘制横坐标取值。默认：-1
		 * 
		 * @returns this
		 */
		this.renderK = function(ops){
			ops = setDftValue(ops, {
				x: 0, y: 0,
				width: canvas.width, height: canvas.height,
				offsetLeft: 10, offsetRight: 10, offsetTop: 10, offsetBottom: 10,
				barWidth: 5, barGap: 3,
				renderTypeNote: true,
				renderAverageLine: true,
				plotHorizontalLineNumber: 3,
				plotVerticalLineSpan: 20,
				labelRenderSpan: -1});
			
			if(null == analysis)
				this.analyse();
			
			/** 确定可绘制区域 */
			var offsetLeft = ops.offsetLeft, offsetRight = ops.offsetRight, offsetTop = ops.offsetTop, offsetBottom = ops.offsetBottom;
			var offsetWidth = ops.width - offsetLeft - offsetRight, offsetHeight = ops.height - offsetTop - offsetBottom;
			
			/** 确定高度与价格之间的比例 */
			var heightPriceRatio = offsetHeight / Math.abs(analysis.priceTopLimit - analysis.priceBottomLimit);
			
			/** 记录数据，使得调用者可以获取这些信息 */
			renderMetadata.k_offsetLeft = offsetLeft;
			renderMetadata.k_offsetRight = offsetRight;
			renderMetadata.k_offsetTop = offsetTop;
			renderMetadata.k_offsetBottom = offsetBottom;
			renderMetadata.k_offsetWidth = offsetWidth;
			renderMetadata.k_offsetHeight = offsetHeight;
			renderMetadata.k_heightPriceRatio = heightPriceRatio;
			renderMetadata.k_barWidth = ops.barWidth;
			renderMetadata.k_barGap = ops.barGap;
			renderMetadata.k_width = ops.width;
			renderMetadata.k_height = ops.height;
			
			/**
			 * 根据给定的指标确定Y轴位置
			 * @param price 指标取值
			 */
			var getMappedY = function(price){
				return offsetTop + (analysis.priceTopLimit - price) * heightPriceRatio;
			};
			
			console.log("offsetLeft: " + offsetLeft + ", offset right: " + offsetRight + ", offsetTop: " + offsetTop + ", offsetBottom: " + offsetBottom + ", offsetWidth: " + offsetWidth + ", offsetHeight: " + offsetHeight);
			//console.log("height price ratio: " + heightPriceRatio);
			
			/** 定位原点 */
			ctx.save();
			ctx.translate(ops.x, ops.y);
			
			/** 绘制图形类型文本 */
			ops.renderTypeNote && drawText({x: offsetLeft + 10, y: offsetTop + 20, font: "normal 12px", textAlign: "left", textBaseline: "middle", text: "K线", type: "fill", fillStyle: "#717171"});
			
			/** 绘制网格 */
			/** 绘制最外层方框 */
			drawStrokedRect({x: offsetLeft + 0.5, y: offsetTop + 0.5, width: offsetWidth, height: offsetHeight, strokeStyle: "#717171"});
			/** 绘制最大指标取值 */
			drawText({x: offsetLeft - 5, y: offsetTop, font: "normal 12px", textAlign: "right", textBaseline: "middle", text: analysis.priceTopLimit.toFixed(2), type: "fill", fillStyle: "#717171"});
			/** 绘制最小指标取值 */
			drawText({x: offsetLeft - 5, y: ops.height - offsetBottom, font: "normal 12px", textAlign: "right", textBaseline: "middle", text: analysis.priceBottomLimit.toFixed(2), type: "fill", fillStyle: "#717171"});
			/** 绘制平均值指标取值 */
			if(ops.renderAverageLine) (function(){
				var avgPrice = (analysis.maxPrice + analysis.minPrice) / 2;
				var avgY = Math.round(getMappedY(avgPrice)) + 0.5;
				drawDashedLine({startX: offsetLeft + 0.5, startY: avgY, endX: ops.width - offsetRight + 0.5, endY: avgY, strokeStyle: "#717171", lineDash: [10, 5, 1]});
				drawText({x: offsetLeft - 5, y: avgY, font: "normal 12px", textAlign: "right", textBaseline: "middle", text: avgPrice.toFixed(2), type: "fill", fillStyle: "#717171"});
			})();
			/** 绘制中间指标取值 */
			var plotHorizontalLineGapHeight = offsetHeight / (ops.plotHorizontalLineNumber + 1);
			for(var i = 1; i <= ops.plotHorizontalLineNumber; i++){
				var avgY = offsetTop + parseInt(plotHorizontalLineGapHeight.toFixed(0)) * i + 0.5;
				
				/** 绘制线条 */
				drawDashedLine({
					startX: offsetLeft + 0.5, startY: avgY,
					endX: ops.width - offsetRight + 0.5, endY: avgY,
					strokeStyle: "#717171"
				});
				/** 绘制取值 */
				drawText({x: offsetLeft - 5, y: avgY, font: "normal 12px", textAlign: "right", textBaseline: "middle", text: (analysis.priceTopLimit - plotHorizontalLineGapHeight / heightPriceRatio * i).toFixed(2), type: "fill", fillStyle: "#717171"});
			}
			
			/** 绘制烛台 */
			for(var i = 0; i < datas.length; i++){
				var itm = datas[i];
				
				/** 绘制网格中的竖线 */
				if(i > 0 && i % ops.plotVerticalLineSpan == 0){
					var x = offsetLeft + i * (ops.barWidth + ops.barGap) + Math.floor(ops.barWidth / 2) + 0.5;
					/** 绘制纵向竖线 */
					drawDashedLine({
						startX: x, startY: offsetTop,
						endX: x, endY: ops.height - offsetBottom,
						strokeStyle: "#717171"
					});
				}
				
				/** 绘制横坐标取值 */
				if(-1 != ops.labelRenderSpan)
					if(i % ops.labelRenderSpan == 0){
						var x = offsetLeft + i * (ops.barWidth + ops.barGap) + Math.floor(ops.barWidth / 2) + 0.5;
						/** 绘制X轴取值 */
						drawText({x: x, y: offsetTop + offsetHeight + 10, font: "normal 12px", textAlign: "center", textBaseline: "middle", text: itm.time, type: "fill", fillStyle: "#717171"});
					}
				
				/** 涨红跌绿等白 */
				var style = itm.openingPrice > itm.closingPrice? "#00FF00": (itm.openingPrice == itm.closingPrice? "#FFFFFF": "#FF0000");
				
				/* 计算柱子高度 */
				var barHeight = Math.abs(itm.openingPrice - itm.closingPrice) * heightPriceRatio;
				/* 计算柱子开始位置 */
				var barX = offsetLeft + i * (ops.barWidth + ops.barGap), barY = getMappedY(Math.max(itm.openingPrice, itm.closingPrice));
				
				/* 计算线条高度 */
				var lineHeight = Math.abs(itm.topPrice - itm.bottomPrice)  * heightPriceRatio;
				/* 计算线条的开始位置 */
				var lineX = barX + Math.floor(ops.barWidth / 2) + 0.5, lineY = (analysis.priceTopLimit - itm.topPrice) * heightPriceRatio + offsetTop;
				
				/* 判断绘制位置是否超过了可视化区域 */
				if(barX + ops.barWidth > ops.width - offsetRight){
					console.warn("truncated data at index: " + i);
					break;
				}
				
				/** 绘制柱子 */
				drawFilledRect({x: barX, y: barY, width: ops.barWidth, height: barHeight, fillStyle: style});
				/** 绘制线条 */
				drawSolidLine({startX: lineX, startY: lineY, endX: lineX, endY: lineY + lineHeight, strokeStyle: style});
			}
			
			ctx.restore();
			
			return this;
		};
		
		/**
	 	 * 绘制成交量
		 * @param ops 控制选项
		 * @param ops.x 绘制区域左上角横坐标。默认：0
		 * @param ops.y 绘制区域左上角纵坐标。默认：0
		 * @param ops.width 绘制区域宽度
		 * @param ops.height 绘制区域高度
		 * @param ops.offsetLeft 数据区域距离左边的位移。默认：30
		 * @param ops.offsetRight 数据区域距离右边的位移。默认：30
		 * @param ops.offsetTop 数据区域距离顶部的位移。默认：30
		 * @param ops.offsetBottom 数据区域距离底部的位移。默认：30
		 * @param ops.barWidth 烛台宽度。默认：5
		 * @param ops.barGap 烛台之间的距离。默认：3
		 * 
		 * @param ops.renderTypeNote 是否呈现图形类型（成交量）标注
		 * @param ops.renderAverageLine 是否渲染平均值
		 * @param ops.plotHorizontalLineNumber 数据区域中横向标线个数
		 * @param ops.plotVerticalLineSpan 数据区域中相邻两个纵向标线之间所间隔的数据个数
		 * @param ops.labelRenderSpan 横坐标渲染跨度，即相邻的两个横坐标取值之间所间隔的数据个数。取值-1代表不绘制横坐标取值。默认：-1
		 * 
		 * @returns this
		 */
		this.renderV = function(ops){
			ops = setDftValue(ops, {
				x: 0, y: 0,
				width: canvas.width, height: canvas.height,
				offsetLeft: 10, offsetRight: 10, offsetTop: 10, offsetBottom: 10,
				barWidth: 5, barGap: 3,
				renderTypeNote: true,
				renderAverageLine: true,
				plotHorizontalLineNumber: 3,
				plotVerticalLineSpan: 20,
				labelRenderSpan: -1});
			
			if(null == analysis)
				this.analyse();
			
			/** 确定可绘制区域 */
			var offsetLeft = ops.offsetLeft, offsetRight = ops.offsetRight, offsetTop = ops.offsetTop, offsetBottom = ops.offsetBottom;
			var offsetWidth = ops.width - offsetLeft - offsetRight, offsetHeight = ops.height - offsetTop - offsetBottom;
			
			/** 确定高度与价格之间的比例 */
			var heightPriceRatio = offsetHeight / Math.abs(analysis.volumeTopLimit - analysis.volumeBottomLimit);
			
			/** 记录数据，使得调用者可以获取这些信息 */
			renderMetadata.v_offsetLeft = offsetLeft;
			renderMetadata.v_offsetRight = offsetRight;
			renderMetadata.v_offsetTop = offsetTop;
			renderMetadata.v_offsetBottom = offsetBottom;
			renderMetadata.v_offsetWidth = offsetWidth;
			renderMetadata.v_offsetHeight = offsetHeight;
			renderMetadata.v_heightPriceRatio = heightPriceRatio;
			renderMetadata.v_barWidth = ops.barWidth;
			renderMetadata.v_barGap = ops.barGap;
			renderMetadata.v_width = ops.width;
			renderMetadata.v_height = ops.height;
			
			/**
			 * 根据给定的指标确定Y轴位置
			 * @param price 指标取值
			 */
			var getMappedY = function(price){
				return offsetTop + (analysis.volumeTopLimit - price) * heightPriceRatio;
			};
			
			console.log("offsetLeft: " + offsetLeft + ", offset right: " + offsetRight + ", offsetTop: " + offsetTop + ", offsetBottom: " + offsetBottom + ", offsetWidth: " + offsetWidth + ", offsetHeight: " + offsetHeight);
			//console.log("height price ratio: " + heightPriceRatio);
			
			/** 定位原点 */
			ctx.save();
			ctx.translate(ops.x, ops.y);
			
			/** 绘制图形类型文本 */
			ops.renderTypeNote && drawText({x: offsetLeft + 10, y: offsetTop + 20, font: "normal 12px", textAlign: "left", textBaseline: "middle", text: "成交量", type: "fill", fillStyle: "#717171"});
			
			/** 绘制网格 */
			/** 绘制最外层方框 */
			drawStrokedRect({x: offsetLeft + 0.5, y: offsetTop + 0.5, width: offsetWidth, height: offsetHeight, strokeStyle: "#717171"});
			/** 绘制最大指标取值 */
			drawText({x: offsetLeft - 5, y: offsetTop, font: "normal 12px", textAlign: "right", textBaseline: "middle", text: analysis.volumeTopLimit.toFixed(0), type: "fill", fillStyle: "#717171"});
			/** 绘制最小指标取值 */
			drawText({x: offsetLeft - 5, y: ops.height - offsetBottom, font: "normal 12px", textAlign: "right", textBaseline: "middle", text: analysis.volumeBottomLimit.toFixed(0), type: "fill", fillStyle: "#717171"});
			/** 绘制平均值指标取值 */
			if(ops.renderAverageLine) (function(){
			var avgVolume = (analysis.maxVolume + analysis.minVolume) / 2;
				var y = Math.round(getMappedY(avgVolume)) + 0.5;
				
				drawDashedLine({startX: offsetLeft + 0.5, startY: y, endX: ops.width - offsetRight + 0.5, endY: y, strokeStyle: "#717171", lineDash: [10, 5, 1]});
				drawText({x: offsetLeft - 5, y: y, font: "normal 12px", textAlign: "right", textBaseline: "middle", text: avgVolume.toFixed(0), type: "fill", fillStyle: "#717171"});
			})();
			/** 绘制中间指标取值 */
			var plotHorizontalLineGapHeight = offsetHeight / (ops.plotHorizontalLineNumber + 1);
			for(var i = 1; i <= ops.plotHorizontalLineNumber; i++){
				var y = offsetTop + parseInt(plotHorizontalLineGapHeight.toFixed(0)) * i + 0.5;
				/** 绘制线条 */
				drawDashedLine({
					startX: offsetLeft + 0.5, startY: y,
					endX: ops.width - offsetRight + 0.5, endY: y,
					strokeStyle: "#717171"
				});
				/** 绘制取值 */
				drawText({x: offsetLeft - 5, y: y, font: "normal 12px", textAlign: "right", textBaseline: "middle", text: (analysis.volumeTopLimit - plotHorizontalLineGapHeight / heightPriceRatio * i).toFixed(0), type: "fill", fillStyle: "#717171"});
			}
			
			/** 绘制成交量 */
			for(var i = 0; i < datas.length; i++){
				var itm = datas[i];
				
				/** 绘制网格中的竖线 */
				if(i > 0 && i % ops.plotVerticalLineSpan == 0){
					var x = offsetLeft + i * (ops.barWidth + ops.barGap) + Math.floor(ops.barWidth / 2) + 0.5;
					/** 绘制纵向竖线 */
					drawDashedLine({
						startX: x, startY: offsetTop,
						endX: x, endY: ops.height - offsetBottom,
						strokeStyle: "#717171"
					});
				}
				
				/** 绘制横坐标取值 */
				if(-1 != ops.labelRenderSpan)
					if(i % ops.labelRenderSpan == 0){
						var x = offsetLeft + i * (ops.barWidth + ops.barGap) + Math.floor(ops.barWidth / 2) + 0.5;
						/** 绘制X轴取值 */
						drawText({x: x, y: offsetTop + offsetHeight + 10, font: "normal 12px", textAlign: "center", textBaseline: "middle", text: itm.time, type: "fill", fillStyle: "#717171"});
					}
				
				/** 涨红跌绿等白 */
				var style = itm.openingPrice > itm.closingPrice? "#00FF00": (itm.openingPrice == itm.closingPrice? "#FFFFFF": "#FF0000");
				
				/* 计算柱子高度 */
				var barHeight = itm.volume * heightPriceRatio;
				/* 计算柱子开始位置 */
				var barX = offsetLeft + i * (ops.barWidth + ops.barGap), barY = getMappedY(itm.volume);
				
				/* 判断绘制位置是否超过了可视化区域 */
				if(barX + ops.barWidth > ops.width - offsetRight){
					console.warn("truncated data at index: " + i);
					break;
				}
				
				/** 绘制柱子 */
				drawFilledRect({x: barX, y: barY, width: ops.barWidth, height: barHeight, fillStyle: style});
			}
			
			ctx.restore();
			
			return this;
		};
		
		/**
		 * 绘制K线
		 * @param ops 控制选项
		 * @param ops.x 绘制区域左上角横坐标。默认：0
		 * @param ops.y 绘制区域左上角纵坐标。默认：0
		 * @param ops.width 绘制区域宽度
		 * @param ops.height 绘制区域高度
		 * @param ops.offsetLeft 数据区域距离左边的位移。默认：30
		 * @param ops.offsetRight 数据区域距离右边的位移。默认：30
		 * @param ops.offsetTop 数据区域距离顶部的位移。默认：30
		 * @param ops.offsetBottom 数据区域距离底部的位移。默认：30
		 * @param ops.barWidth 烛台宽度。默认：5
		 * @param ops.barGap 烛台之间的距离。默认：3
		 * 
		 * @param ops.renderTypeNote 是否呈现图形类型（成交量）标注
		 * @param ops.renderAverageLine 是否渲染平均值
		 * @param ops.kPlotHorizontalLineNumber K线数据区域中横向标线个数
		 * @param ops.kPlotVerticalLineSpan K线数据区域中相邻两个纵向标线之间所间隔的数据个数
		 * @param ops.vPlotHorizontalLineNumber 成交量数据区域中横向标线个数
		 * @param ops.vPlotVerticalLineSpan 成交量数据区域中相邻两个纵向标线之间所间隔的数据个数
		 * @param ops.labelRenderSpan 横坐标渲染跨度，即相邻的两个横坐标取值之间所间隔的数据个数。取值-1代表不绘制横坐标取值。默认：-1
		 * 
		 * @param ops.detailViewingCallback 查看K线行情时调用的回调方法
		 * 
		 * @returns this
		 */
		this.render = function(ops){
			ops = setDftValue(ops, {
				x: 0, y: 0,
				width: canvas.width, height: canvas.height,
				offsetLeft: 30, offsetRight: 30, offsetTop: 30, offsetBottom: 30,
				barWidth: 5, barGap: 3,
				renderTypeNote: true,
				kRenderAverageLine: true,
				kPlotHorizontalLineNumber: 3,
				kPlotVerticalLineSpan: 20,
				vRenderAverageLine: true,
				vPlotHorizontalLineNumber: 0,
				vPlotVerticalLineSpan: 20,
				labelRenderSpan: -1,
				detailViewingCallback: null
			});
			
			ctx.save();
			
			/** 绘制K线 */
			this.renderK({
				x: ops.x, y: ops.y,
				width: ops.width, height: ops.height * 0.7,
				offsetLeft: ops.offsetLeft, offsetRight: ops.offsetRight, offsetTop: ops.offsetTop, offsetBottom: 0,
				barWidth: ops.barWidth, barGap: ops.barGap,
				renderTypeNote: ops.renderTypeNote,
				renderAverageLine: ops.kRenderAverageLine,
				plotHorizontalLineNumber: ops.kPlotHorizontalLineNumber,
				plotVerticalLineSpan: ops.kPlotVerticalLineSpan,
				labelRenderSpan: -1
			});
			/** 绘制成交量 */
			this.renderV({
				x: ops.x, y: ops.y + ops.height * 0.72,
				width: ops.width, height: ops.height * 0.28,
				offsetLeft: ops.offsetLeft, offsetRight: ops.offsetRight, offsetTop: 0, offsetBottom: ops.offsetBottom,
				barWidth: ops.barWidth, barGap: ops.barGap,
				renderTypeNote: ops.renderTypeNote,
				renderAverageLine: ops.vRenderAverageLine,
				plotHorizontalLineNumber: ops.vPlotHorizontalLineNumber,
				plotVerticalLineSpan: ops.vPlotVerticalLineSpan,
				labelRenderSpan: ops.labelRenderSpan
			});
			
			ctx.restore();
			
			return this;
		};
	};
	
	/** 工具方法暴露 */
	K.setCanvas = setCanvas;
	K.getCanvas = getCanvas;
	K.setLineStyle = setLineStyle;
	K.getLineStyle = getLineStyle;
	
	K.clear = clear;
	K.drawText = drawText;
	K.drawFilledRect = drawFilledRect;
	K.drawStrokedRect = drawStrokedRect;
	K.drawStrokedFilledRect = drawStrokedFilledRect;
	K.drawDot = drawDot;
	K.drawSolidLine = drawSolidLine;
	K.drawDashedLine = drawDashedLine;
	
	return K;
})();