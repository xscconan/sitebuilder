var _Utils = {
/*
 * Generate a random uuid.
 *
 * USAGE: uuid(length, radix)
 *   length - the desired number of characters
 *   radix  - the number of allowable values for each character.
 *
 * EXAMPLES:
 *   // No arguments  - returns RFC4122, version 4 ID
 *   >>> util.uuid()
 *   "92329D39-6F5C-4520-ABFC-AAB64544E172"
 *
 *   // One argument - returns ID of the specified length
 *   >>> util.uuid(15)	   // 15 character ID (default base=62)
 *   "VcydxgltxrVZSTV"
 *
 *   // Two arguments - returns ID of the specified length, and radix. (Radix must be <= 62)
 *   >>> util.uuid(8, 2)  // 8 character ID (base=2)
 *   "01001010"
 *   >>> util.uuid(8, 10) // 8 character ID (base=10)
 *   "47473046"
 *   >>> util.uuid(8, 16) // 8 character ID (base=16)
 *   "098F4D35"
 */
	'UUID' : function(len, radix) {
		 var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
		 var chars = CHARS, uuid = [], i;
		    radix = radix || chars.length;
		 
		    if (len) {
		      // Compact form
		      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
		    } else {
		      // rfc4122, version 4 form
		      var r;
		 
		      // rfc4122 requires these characters
		      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
		      uuid[14] = '4';
		 
		      // Fill in random data.  At i==19 set the high bits of clock sequence as
		      // per rfc4122, sec. 4.1.5
		      for (i = 0; i < 36; i++) {
		        if (!uuid[i]) {
		          r = 0 | Math.random()*16;
		          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
		        }
		      }
		    }
		 
		    return uuid.join('');
	},
	obj2jsonStr : function(o){   
		var r = [];   
	    if(typeof o =="string") return o.replace(/([\'\"\\])/g,"\\$1").replace(/(\n)/g,"\\n").replace(/(\r)/g,"\\r").replace(/(\t)/g,"\\t");   
	    if(typeof o =="undefined") return "";   
	    if(typeof o == "object"){   
	        if(o===null) return "null";
	        else if(!o.sort){   
	            for(var i in o)
	                 r.push('"' +i+'":'+ '"' + this.obj2jsonStr(o[i]) + '"');   
	             r="{"+r.join()+"}";  
	         }else{   
	            for(var i =0;i<o.length;i++)   
	                 r.push(this.obj2jsonStr(o[i]));
	             r="["+r.join()+"]";
	         }   
	        return r;   
	     }   
		  return o.toString();   
	},
	 ArrayUtil : {
	 	inArray : function(value, array){
	 		if (value != 'undefined' )
	 			return false;

	 		for (i in array)
	 		{
	 			if (array[i] == value)
	 				return true;
	 		}
	 		return false;
	 	},
	 	mergeWithUniqueVal : function(array1, array2){
	 		for (i in array2)
	 		{
	 			if (!_Utils.ArrayUtil.inArray(array2[i], array1))
	 			{
	 				array1.push(array2[i]);
	 			}
	 				
	 		}
	 		return array1;
	 	},
	 	removeValue : function(value, array){
	 		var tmpArray = [];
	 		for (i in  array)
	 		{
	 			if (value != array[i])
	 				tmpArray.push(value);	
	 		}
	 		return tmpArray;
	 	}
	}

};

if (typeof exports != 'undefined')
	exports.Utils = _Utils;	
else if (typeof define != 'undefined')
{
	define(function(){
		return _Utils;
	})
}

