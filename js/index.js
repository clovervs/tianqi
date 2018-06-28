$(function(){
	$.ajax({
		url:'https://www.toutiao.com/stream/widget/local_weather/data/?city=太原',
		dataType:'jsonp',
		success:function(obj){
			console.log(obj.data.weather);
			let val=obj.data.weather;

			// 渲染城市
			$(".location>span").text(val.city_name);

			// 渲染当下温度
			$(".now_temperature>span").text(val.current_temperature);

			// 渲染当下天气
			$(".now_weather").text(val.current_condition);

			// 渲染当下吹风情况
			$(".now_wind").html(val.wind_direction+"&nbsp;&nbsp;"+val.wind_level+"级");

			// 提示语切换
			let tip=0;
			$(".tips").click(function(){
				if(tip==0){
					$(this).text("你若安好，便是晴天");
					tip=1;
				}
				else{
					$(this).text('光芒透过云缝，洒向大地');
					tip=0;
				}
			})

			// 当天API及程度
			$(".til").text(val.quality_level);
			$(".value").text(val.aqi);
			

			// 今天最高温和最低温
			$("#today_temperature").text(val.dat_high_temperature+"/"+val.dat_low_temperature+"°");

			// 今天天气
			$("#today_weather").text(val.dat_condition);

			// 今天天气icon
			$("#today_weather+img").attr('src', 'img/'+val.dat_weather_icon_id+'.png');

			// 明天的
			$("#tomorrow_temperature").text(val.tomorrow_high_temperature+"/"+val.tomorrow_low_temperature+"°");
			$("#tomorrow_weather").text(val.tomorrow_condition);
			$("#tomorrow_weather+img").attr('src', 'img/'+val.tomorrow_weather_icon_id+'.png');


			// 今天各个时段的天气
			let st=obj.data.weather.hourly_forecast;
			$(st).each(function(index, ele) {
				let str=`<li>
					<p class="hours_time">${ele.hour}:00</p>
					<img src="img/${ele.weather_icon_id}.png" alt="">
					<p class="hours_temperature">${ele.temperature}</p>
				</li>`
				$(".hoursbox").append(str);
			});
			
			// 未来几天的天气情况
			let br=obj.data.weather.forecast_list;
			
			$(br).each(function(index,ele){
				let dates=ele.date.slice(5);
				let str=`<li>
				<p class="days_day">昨天</p>
				<p class="days_date">${dates}</p>
				<div class="daytime">
					<p class="days_weather">${ele.condition}</p>
					<img src="img/${ele.weather_icon_id}.png" alt="">
				</div>
				<div class="night">
					<img src="img/${ele.weather_icon_id}.png" alt="">
					<p class="days_weather">${ele.condition}</p>
				</div>
				<p class="days_wind">${ele.wind_direction}</p>
				<p class="days_windstrong">${ele.wind_level}级</p>
			</li>`
				$(".daysbox").append(str);
			})
		}
	})

	// 初始化提示语
	$(".tips").text("光芒透过云缝，洒向大地");

})