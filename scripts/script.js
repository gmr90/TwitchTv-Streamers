//run -jquery 
$(document).ready(function(){
	
	$.ajax({
		type:"GET",
		url:"https://api.twitch.tv/kraken/streams/freecodecamp",
		headers:{
			'Client-ID':'wbrt857iw9mxq3677tgzsbtba2uqq5'
		},
		success: function(data){
		//	console.log(data);	

			if(data.stream===null){
				$('#fccStatus').html("FreeCodeCamp is currently offline");
			}
			else{
				$('#fccStatus').html("freecodecamp is currently online");	
			}
		}
	});
	
	var users = [];

	$.ajax({
		type:"GET",
		url:"https://api.twitch.tv/kraken/users/freecodecamp/follows/channels/",
		headers:{
			'Client-ID':'wbrt857iw9mxq3677tgzsbtba2uqq5'
		},
		success: function(data1){
			for(var i = 0;i<data1.follows.length;i++){

				var  display_name = data1.follows[i].channel.display_name;
				var logo = data1.follows[i].channel.logo;
				var status = data1.follows[i].channel.status;
				if(logo == null){
					logo = "http://www.unesa.org.au/wp-content/themes/twentyfourteenchild/img/CSLogos/no-logo.png";
				}
				if(status == null ){
					status = "Offline";
				}
				 $('#usersInfo').prepend("<div class='row'>"+"<div class='col-md-4'>"+
				 	"<a href='http://www.twitch.tv/"+display_name+"' target='blank'><img src='"+logo+"'></a>"+"</div>"+
				 	"<div class='col-md-4'>"+ display_name+"</div>"+ 
				 	"<div class='col-md-4'>" + status + "</div></div>");
			}
		}
	});


	var closed_Stremers = ['brunofin','comster404'];
	for(var i=0; i<closed_Stremers.length;i++){
		$.ajax({
			type : "GET",
			url : "https://api.twitch.tv/kraken/stream/"+closed_Stremers[i],
			headers:{
			'Client-ID':'wbrt857iw9mxq3677tgzsbtba2uqq5'
		},
		error: function(data2){
			var logo="https://cdn4.iconfinder.com/data/icons/basic-interface-overcolor/512/forbidden-128.png";
			var display_name = data2.statusText ; 
			var status = data2.status ; 

			$('#usersInfo').prepend("<div class='row'>"+"<div class='col-md-4'>"+
				 	"<a href='http://www.twitch.tv/"+display_name+"' target='blank'><img src='"+logo+"'></a>"+"</div>"+
				 	"<div class='col-md-4'>"+ display_name+"</div>"+ 
				 	"<div class='col-md-4'>" + status + "</div></div>");

		}

	});

	}
});