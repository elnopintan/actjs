goog.provide('clojure.browser.net');
goog.require('cljs.core');
goog.require('goog.json');
goog.require('goog.net.xpc.CrossPageChannel');
goog.require('goog.net.xpc.CfgFields');
goog.require('goog.net.EventType');
goog.require('goog.net.XhrIo');
goog.require('clojure.browser.event');
clojure.browser.net._STAR_timeout_STAR_ = 10000;
clojure.browser.net.event_types = cljs.core.into.call(null,cljs.core.ObjMap.EMPTY,cljs.core.map.call(null,(function (p__10238){
var vec__10239__10240 = p__10238;
var k__10241 = cljs.core.nth.call(null,vec__10239__10240,0,null);
var v__10242 = cljs.core.nth.call(null,vec__10239__10240,1,null);
return cljs.core.PersistentVector.fromArray([cljs.core.keyword.call(null,k__10241.toLowerCase()),v__10242], true);
}),cljs.core.merge.call(null,cljs.core.js__GT_clj.call(null,goog.net.EventType))));
clojure.browser.net.IConnection = {};
clojure.browser.net.connect = (function() {
var connect = null;
var connect__1 = (function (this$){
if((function (){var and__3822__auto____10259 = this$;
if(and__3822__auto____10259)
{return this$.clojure$browser$net$IConnection$connect$arity$1;
} else
{return and__3822__auto____10259;
}
})())
{return this$.clojure$browser$net$IConnection$connect$arity$1(this$);
} else
{var x__2369__auto____10260 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____10261 = (clojure.browser.net.connect[goog.typeOf(x__2369__auto____10260)]);
if(or__3824__auto____10261)
{return or__3824__auto____10261;
} else
{var or__3824__auto____10262 = (clojure.browser.net.connect["_"]);
if(or__3824__auto____10262)
{return or__3824__auto____10262;
} else
{throw cljs.core.missing_protocol.call(null,"IConnection.connect",this$);
}
}
})().call(null,this$);
}
});
var connect__2 = (function (this$,opt1){
if((function (){var and__3822__auto____10263 = this$;
if(and__3822__auto____10263)
{return this$.clojure$browser$net$IConnection$connect$arity$2;
} else
{return and__3822__auto____10263;
}
})())
{return this$.clojure$browser$net$IConnection$connect$arity$2(this$,opt1);
} else
{var x__2369__auto____10264 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____10265 = (clojure.browser.net.connect[goog.typeOf(x__2369__auto____10264)]);
if(or__3824__auto____10265)
{return or__3824__auto____10265;
} else
{var or__3824__auto____10266 = (clojure.browser.net.connect["_"]);
if(or__3824__auto____10266)
{return or__3824__auto____10266;
} else
{throw cljs.core.missing_protocol.call(null,"IConnection.connect",this$);
}
}
})().call(null,this$,opt1);
}
});
var connect__3 = (function (this$,opt1,opt2){
if((function (){var and__3822__auto____10267 = this$;
if(and__3822__auto____10267)
{return this$.clojure$browser$net$IConnection$connect$arity$3;
} else
{return and__3822__auto____10267;
}
})())
{return this$.clojure$browser$net$IConnection$connect$arity$3(this$,opt1,opt2);
} else
{var x__2369__auto____10268 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____10269 = (clojure.browser.net.connect[goog.typeOf(x__2369__auto____10268)]);
if(or__3824__auto____10269)
{return or__3824__auto____10269;
} else
{var or__3824__auto____10270 = (clojure.browser.net.connect["_"]);
if(or__3824__auto____10270)
{return or__3824__auto____10270;
} else
{throw cljs.core.missing_protocol.call(null,"IConnection.connect",this$);
}
}
})().call(null,this$,opt1,opt2);
}
});
var connect__4 = (function (this$,opt1,opt2,opt3){
if((function (){var and__3822__auto____10271 = this$;
if(and__3822__auto____10271)
{return this$.clojure$browser$net$IConnection$connect$arity$4;
} else
{return and__3822__auto____10271;
}
})())
{return this$.clojure$browser$net$IConnection$connect$arity$4(this$,opt1,opt2,opt3);
} else
{var x__2369__auto____10272 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____10273 = (clojure.browser.net.connect[goog.typeOf(x__2369__auto____10272)]);
if(or__3824__auto____10273)
{return or__3824__auto____10273;
} else
{var or__3824__auto____10274 = (clojure.browser.net.connect["_"]);
if(or__3824__auto____10274)
{return or__3824__auto____10274;
} else
{throw cljs.core.missing_protocol.call(null,"IConnection.connect",this$);
}
}
})().call(null,this$,opt1,opt2,opt3);
}
});
connect = function(this$,opt1,opt2,opt3){
switch(arguments.length){
case 1:
return connect__1.call(this,this$);
case 2:
return connect__2.call(this,this$,opt1);
case 3:
return connect__3.call(this,this$,opt1,opt2);
case 4:
return connect__4.call(this,this$,opt1,opt2,opt3);
}
throw('Invalid arity: ' + arguments.length);
};
connect.cljs$lang$arity$1 = connect__1;
connect.cljs$lang$arity$2 = connect__2;
connect.cljs$lang$arity$3 = connect__3;
connect.cljs$lang$arity$4 = connect__4;
return connect;
})()
;
clojure.browser.net.transmit = (function() {
var transmit = null;
var transmit__2 = (function (this$,opt){
if((function (){var and__3822__auto____10295 = this$;
if(and__3822__auto____10295)
{return this$.clojure$browser$net$IConnection$transmit$arity$2;
} else
{return and__3822__auto____10295;
}
})())
{return this$.clojure$browser$net$IConnection$transmit$arity$2(this$,opt);
} else
{var x__2369__auto____10296 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____10297 = (clojure.browser.net.transmit[goog.typeOf(x__2369__auto____10296)]);
if(or__3824__auto____10297)
{return or__3824__auto____10297;
} else
{var or__3824__auto____10298 = (clojure.browser.net.transmit["_"]);
if(or__3824__auto____10298)
{return or__3824__auto____10298;
} else
{throw cljs.core.missing_protocol.call(null,"IConnection.transmit",this$);
}
}
})().call(null,this$,opt);
}
});
var transmit__3 = (function (this$,opt,opt2){
if((function (){var and__3822__auto____10299 = this$;
if(and__3822__auto____10299)
{return this$.clojure$browser$net$IConnection$transmit$arity$3;
} else
{return and__3822__auto____10299;
}
})())
{return this$.clojure$browser$net$IConnection$transmit$arity$3(this$,opt,opt2);
} else
{var x__2369__auto____10300 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____10301 = (clojure.browser.net.transmit[goog.typeOf(x__2369__auto____10300)]);
if(or__3824__auto____10301)
{return or__3824__auto____10301;
} else
{var or__3824__auto____10302 = (clojure.browser.net.transmit["_"]);
if(or__3824__auto____10302)
{return or__3824__auto____10302;
} else
{throw cljs.core.missing_protocol.call(null,"IConnection.transmit",this$);
}
}
})().call(null,this$,opt,opt2);
}
});
var transmit__4 = (function (this$,opt,opt2,opt3){
if((function (){var and__3822__auto____10303 = this$;
if(and__3822__auto____10303)
{return this$.clojure$browser$net$IConnection$transmit$arity$4;
} else
{return and__3822__auto____10303;
}
})())
{return this$.clojure$browser$net$IConnection$transmit$arity$4(this$,opt,opt2,opt3);
} else
{var x__2369__auto____10304 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____10305 = (clojure.browser.net.transmit[goog.typeOf(x__2369__auto____10304)]);
if(or__3824__auto____10305)
{return or__3824__auto____10305;
} else
{var or__3824__auto____10306 = (clojure.browser.net.transmit["_"]);
if(or__3824__auto____10306)
{return or__3824__auto____10306;
} else
{throw cljs.core.missing_protocol.call(null,"IConnection.transmit",this$);
}
}
})().call(null,this$,opt,opt2,opt3);
}
});
var transmit__5 = (function (this$,opt,opt2,opt3,opt4){
if((function (){var and__3822__auto____10307 = this$;
if(and__3822__auto____10307)
{return this$.clojure$browser$net$IConnection$transmit$arity$5;
} else
{return and__3822__auto____10307;
}
})())
{return this$.clojure$browser$net$IConnection$transmit$arity$5(this$,opt,opt2,opt3,opt4);
} else
{var x__2369__auto____10308 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____10309 = (clojure.browser.net.transmit[goog.typeOf(x__2369__auto____10308)]);
if(or__3824__auto____10309)
{return or__3824__auto____10309;
} else
{var or__3824__auto____10310 = (clojure.browser.net.transmit["_"]);
if(or__3824__auto____10310)
{return or__3824__auto____10310;
} else
{throw cljs.core.missing_protocol.call(null,"IConnection.transmit",this$);
}
}
})().call(null,this$,opt,opt2,opt3,opt4);
}
});
var transmit__6 = (function (this$,opt,opt2,opt3,opt4,opt5){
if((function (){var and__3822__auto____10311 = this$;
if(and__3822__auto____10311)
{return this$.clojure$browser$net$IConnection$transmit$arity$6;
} else
{return and__3822__auto____10311;
}
})())
{return this$.clojure$browser$net$IConnection$transmit$arity$6(this$,opt,opt2,opt3,opt4,opt5);
} else
{var x__2369__auto____10312 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____10313 = (clojure.browser.net.transmit[goog.typeOf(x__2369__auto____10312)]);
if(or__3824__auto____10313)
{return or__3824__auto____10313;
} else
{var or__3824__auto____10314 = (clojure.browser.net.transmit["_"]);
if(or__3824__auto____10314)
{return or__3824__auto____10314;
} else
{throw cljs.core.missing_protocol.call(null,"IConnection.transmit",this$);
}
}
})().call(null,this$,opt,opt2,opt3,opt4,opt5);
}
});
transmit = function(this$,opt,opt2,opt3,opt4,opt5){
switch(arguments.length){
case 2:
return transmit__2.call(this,this$,opt);
case 3:
return transmit__3.call(this,this$,opt,opt2);
case 4:
return transmit__4.call(this,this$,opt,opt2,opt3);
case 5:
return transmit__5.call(this,this$,opt,opt2,opt3,opt4);
case 6:
return transmit__6.call(this,this$,opt,opt2,opt3,opt4,opt5);
}
throw('Invalid arity: ' + arguments.length);
};
transmit.cljs$lang$arity$2 = transmit__2;
transmit.cljs$lang$arity$3 = transmit__3;
transmit.cljs$lang$arity$4 = transmit__4;
transmit.cljs$lang$arity$5 = transmit__5;
transmit.cljs$lang$arity$6 = transmit__6;
return transmit;
})()
;
clojure.browser.net.close = (function close(this$){
if((function (){var and__3822__auto____10319 = this$;
if(and__3822__auto____10319)
{return this$.clojure$browser$net$IConnection$close$arity$1;
} else
{return and__3822__auto____10319;
}
})())
{return this$.clojure$browser$net$IConnection$close$arity$1(this$);
} else
{var x__2369__auto____10320 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____10321 = (clojure.browser.net.close[goog.typeOf(x__2369__auto____10320)]);
if(or__3824__auto____10321)
{return or__3824__auto____10321;
} else
{var or__3824__auto____10322 = (clojure.browser.net.close["_"]);
if(or__3824__auto____10322)
{return or__3824__auto____10322;
} else
{throw cljs.core.missing_protocol.call(null,"IConnection.close",this$);
}
}
})().call(null,this$);
}
});
goog.net.XhrIo.prototype.clojure$browser$event$EventType$ = true;
goog.net.XhrIo.prototype.clojure$browser$event$EventType$event_types$arity$1 = (function (this$){
return cljs.core.into.call(null,cljs.core.ObjMap.EMPTY,cljs.core.map.call(null,(function (p__10323){
var vec__10324__10325 = p__10323;
var k__10326 = cljs.core.nth.call(null,vec__10324__10325,0,null);
var v__10327 = cljs.core.nth.call(null,vec__10324__10325,1,null);
return cljs.core.PersistentVector.fromArray([cljs.core.keyword.call(null,k__10326.toLowerCase()),v__10327], true);
}),cljs.core.merge.call(null,cljs.core.js__GT_clj.call(null,goog.net.EventType))));
});
goog.net.XhrIo.prototype.clojure$browser$net$IConnection$ = true;
goog.net.XhrIo.prototype.clojure$browser$net$IConnection$transmit$arity$2 = (function (this$,uri){
return clojure.browser.net.transmit.call(null,this$,uri,"GET",null,null,clojure.browser.net._STAR_timeout_STAR_);
});
goog.net.XhrIo.prototype.clojure$browser$net$IConnection$transmit$arity$3 = (function (this$,uri,method){
return clojure.browser.net.transmit.call(null,this$,uri,method,null,null,clojure.browser.net._STAR_timeout_STAR_);
});
goog.net.XhrIo.prototype.clojure$browser$net$IConnection$transmit$arity$4 = (function (this$,uri,method,content){
return clojure.browser.net.transmit.call(null,this$,uri,method,content,null,clojure.browser.net._STAR_timeout_STAR_);
});
goog.net.XhrIo.prototype.clojure$browser$net$IConnection$transmit$arity$5 = (function (this$,uri,method,content,headers){
return clojure.browser.net.transmit.call(null,this$,uri,method,content,headers,clojure.browser.net._STAR_timeout_STAR_);
});
goog.net.XhrIo.prototype.clojure$browser$net$IConnection$transmit$arity$6 = (function (this$,uri,method,content,headers,timeout){
this$.setTimeoutInterval(timeout);
return this$.send(uri,method,content,headers);
});
clojure.browser.net.xpc_config_fields = cljs.core.into.call(null,cljs.core.ObjMap.EMPTY,cljs.core.map.call(null,(function (p__10328){
var vec__10329__10330 = p__10328;
var k__10331 = cljs.core.nth.call(null,vec__10329__10330,0,null);
var v__10332 = cljs.core.nth.call(null,vec__10329__10330,1,null);
return cljs.core.PersistentVector.fromArray([cljs.core.keyword.call(null,k__10331.toLowerCase()),v__10332], true);
}),cljs.core.js__GT_clj.call(null,goog.net.xpc.CfgFields)));
/**
* Returns an XhrIo connection
*/
clojure.browser.net.xhr_connection = (function xhr_connection(){
return (new goog.net.XhrIo());
});
clojure.browser.net.ICrossPageChannel = {};
clojure.browser.net.register_service = (function() {
var register_service = null;
var register_service__3 = (function (this$,service_name,fn){
if((function (){var and__3822__auto____10341 = this$;
if(and__3822__auto____10341)
{return this$.clojure$browser$net$ICrossPageChannel$register_service$arity$3;
} else
{return and__3822__auto____10341;
}
})())
{return this$.clojure$browser$net$ICrossPageChannel$register_service$arity$3(this$,service_name,fn);
} else
{var x__2369__auto____10342 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____10343 = (clojure.browser.net.register_service[goog.typeOf(x__2369__auto____10342)]);
if(or__3824__auto____10343)
{return or__3824__auto____10343;
} else
{var or__3824__auto____10344 = (clojure.browser.net.register_service["_"]);
if(or__3824__auto____10344)
{return or__3824__auto____10344;
} else
{throw cljs.core.missing_protocol.call(null,"ICrossPageChannel.register-service",this$);
}
}
})().call(null,this$,service_name,fn);
}
});
var register_service__4 = (function (this$,service_name,fn,encode_json_QMARK_){
if((function (){var and__3822__auto____10345 = this$;
if(and__3822__auto____10345)
{return this$.clojure$browser$net$ICrossPageChannel$register_service$arity$4;
} else
{return and__3822__auto____10345;
}
})())
{return this$.clojure$browser$net$ICrossPageChannel$register_service$arity$4(this$,service_name,fn,encode_json_QMARK_);
} else
{var x__2369__auto____10346 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____10347 = (clojure.browser.net.register_service[goog.typeOf(x__2369__auto____10346)]);
if(or__3824__auto____10347)
{return or__3824__auto____10347;
} else
{var or__3824__auto____10348 = (clojure.browser.net.register_service["_"]);
if(or__3824__auto____10348)
{return or__3824__auto____10348;
} else
{throw cljs.core.missing_protocol.call(null,"ICrossPageChannel.register-service",this$);
}
}
})().call(null,this$,service_name,fn,encode_json_QMARK_);
}
});
register_service = function(this$,service_name,fn,encode_json_QMARK_){
switch(arguments.length){
case 3:
return register_service__3.call(this,this$,service_name,fn);
case 4:
return register_service__4.call(this,this$,service_name,fn,encode_json_QMARK_);
}
throw('Invalid arity: ' + arguments.length);
};
register_service.cljs$lang$arity$3 = register_service__3;
register_service.cljs$lang$arity$4 = register_service__4;
return register_service;
})()
;
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$IConnection$ = true;
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$IConnection$connect$arity$1 = (function (this$){
return clojure.browser.net.connect.call(null,this$,null);
});
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$IConnection$connect$arity$2 = (function (this$,on_connect_fn){
return this$.connect(on_connect_fn);
});
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$IConnection$connect$arity$3 = (function (this$,on_connect_fn,config_iframe_fn){
return clojure.browser.net.connect.call(null,this$,on_connect_fn,config_iframe_fn,document.body);
});
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$IConnection$connect$arity$4 = (function (this$,on_connect_fn,config_iframe_fn,iframe_parent){
this$.createPeerIframe(iframe_parent,config_iframe_fn);
return this$.connect(on_connect_fn);
});
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$IConnection$transmit$arity$3 = (function (this$,service_name,payload){
return this$.send(cljs.core.name.call(null,service_name),payload);
});
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$IConnection$close$arity$1 = (function (this$){
return this$.close(cljs.core.List.EMPTY);
});
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$ICrossPageChannel$ = true;
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$ICrossPageChannel$register_service$arity$3 = (function (this$,service_name,fn){
return clojure.browser.net.register_service.call(null,this$,service_name,fn,false);
});
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$ICrossPageChannel$register_service$arity$4 = (function (this$,service_name,fn,encode_json_QMARK_){
return this$.registerService(cljs.core.name.call(null,service_name),fn,encode_json_QMARK_);
});
/**
* When passed with a config hash-map, returns a parent
* CrossPageChannel object. Keys in the config hash map are downcased
* versions of the goog.net.xpc.CfgFields enum keys,
* e.g. goog.net.xpc.CfgFields.PEER_URI becomes :peer_uri in the config
* hash.
* 
* When passed with no args, creates a child CrossPageChannel object,
* and the config is automatically taken from the URL param 'xpc', as
* per the CrossPageChannel API.
*/
clojure.browser.net.xpc_connection = (function() {
var xpc_connection = null;
var xpc_connection__0 = (function (){
var temp__3974__auto____10360 = (new goog.Uri(window.location.href)).getParameterValue("xpc");
if(cljs.core.truth_(temp__3974__auto____10360))
{var config__10361 = temp__3974__auto____10360;
return (new goog.net.xpc.CrossPageChannel(goog.json.parse(config__10361)));
} else
{return null;
}
});
var xpc_connection__1 = (function (config){
return (new goog.net.xpc.CrossPageChannel(cljs.core.reduce.call(null,(function (sum,p__10362){
var vec__10363__10364 = p__10362;
var k__10365 = cljs.core.nth.call(null,vec__10363__10364,0,null);
var v__10366 = cljs.core.nth.call(null,vec__10363__10364,1,null);
var temp__3971__auto____10367 = cljs.core._lookup.call(null,clojure.browser.net.xpc_config_fields,k__10365,null);
if(cljs.core.truth_(temp__3971__auto____10367))
{var field__10368 = temp__3971__auto____10367;
var G__10369__10370 = sum;
(G__10369__10370[field__10368] = v__10366);
return G__10369__10370;
} else
{return sum;
}
}),{},config)));
});
xpc_connection = function(config){
switch(arguments.length){
case 0:
return xpc_connection__0.call(this);
case 1:
return xpc_connection__1.call(this,config);
}
throw('Invalid arity: ' + arguments.length);
};
xpc_connection.cljs$lang$arity$0 = xpc_connection__0;
xpc_connection.cljs$lang$arity$1 = xpc_connection__1;
return xpc_connection;
})()
;
