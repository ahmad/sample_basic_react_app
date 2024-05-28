export const BrowserAPI = function(){
	var isCaptureBrowser = false;
	if(navigator.userAgent.indexOf('GDCv') > 0){
		isCaptureBrowser = true;
	}
	
	var log = function(data){
		console.log(data);
	}

	return {
		browser: function(command, data, serialise = true){
			let params;
			if (serialise === true) {
				params = (data) ? "?" + this.serialise(data) : ""
			} else {
				params = (data) ? "?" + data : ""
			}
			
			if(isCaptureBrowser === true){
				var url = "gdc://" + command + params;
				return window.location.href = url
			}
			
			log("Only able to complete this action on the Capture browser");
			return false;
		},

		print: function(data){
			log(data);
			if (data !== null){
				this.browser("print", btoa(JSON.stringify(data)), false);
			} else {
				this.alert({
					title: "Invalid Action",
					message: "Data is required."
				})
			}
		},

		alert: function(data){
			this.browser("alert", data)
		},
	
		send: function(data){
			if(data !== null){
				this.browser("send", {
					data: encodeURIComponent(JSON.stringify(data))
				});
			}
		},
		
		showSetting: function(data){
			this.browser('setting', {
				data: encodeURIComponent(JSON.stringify(data))
			});
		},
	
		captureCallbackFn: null,
		capturePhotoCallback: function(image_data){
			if(this.captureCallbackFn !== undefined && this.captureCallbackFn.photo !== undefined){
				this.captureCallbackFn.photo(image_data);
			}
		},
		capturePhotoStarted: function(){
			if(this.captureCallbackFn !== undefined && this.captureCallbackFn.started !== undefined){
				this.captureCallbackFn.started();
			}
		},

		capturePhotoCanceled: function(){
			if(this.captureCallbackFn !== undefined && this.captureCallbackFn.cancelled !== undefined){
				this.captureCallbackFn.cancelled();
			}
		},

		capturePhotoEnded: function(){
			if(this.captureCallbackFn !== undefined && this.captureCallbackFn.ended !== undefined){
				this.captureCallbackFn.ended();
			}
		},

		
		capturePhoto: function(cb){
			this.captureCallbackFn = cb;
			this.browser('capturephoto');
		},
		
		
		saveCallbackFn: null,
		save: function(data, callback){
			this.saveCallbackFn = callback;
			var d = {
				"data": data
			};
			this.browser('save', d);
		},


		scanCodeCallbackFn: null,
		scanCodeSuccess: function(result){
			if(this.scanCodeCallbackFn !== null && this.scanCodeCallbackFn.success !== null){
				this.scanCodeCallbackFn.success(atob(result));
				//this.scanCodeCallbackFn.success(result);
			}
		},
		// scanCodeCancelled: function(){
		// 	if(this.scanCodeCallbackFn !== null && this.scanCodeCallbackFn.cancelled !== null){
		// 		this.scanCodeCallbackFn.cancelled();
		// 	}
		// },

		scanCode: function(cb){
			this.scanCodeCallbackFn = cb;
			this.browser('scan');
		},
		
		

		scanAndSearchCallbackFn: null,
		scanAndSearchSuccess: function(result){
			if(this.scanAndSearchCallbackFn !== null && this.scanAndSearchCallbackFn.success !== null){
				this.scanAndSearchCallbackFn.success(atob(result));
			}
		},
		// scanCodeCancelled: function(){
		// 	if(this.scanAndSearchCallbackFn !== null && this.scanAndSearchCallbackFn.cancelled !== null){
		// 		this.scanAndSearchCallbackFn.cancelled();
		// 	}
		// },

		scanAndSearch: function(cb){
			this.scanAndSearchCallbackFn = cb;
			this.browser('search');
		},
		
		
		serialise: function(obj) {
			var pairs = [];
			for (var prop in obj) {
				if (!obj.hasOwnProperty(prop)) {
					continue;
				}
				if (Object.prototype.toString.call(obj[prop]) === '[object Object]') {
					pairs.push(BrowserAPI.serialise(obj[prop]));
					continue;
				}
				pairs.push(prop + '=' + obj[prop]);
			}
			return pairs.join('&');
		}
	}
}();