goog.provide('clojure.browser.net');
goog.require('cljs.core');
goog.require('goog.json');
goog.require('goog.net.xpc.CrossPageChannel');
goog.require('goog.net.xpc.CfgFields');
goog.require('goog.net.EventType');
goog.require('goog.net.XhrIo');
goog.require('clojure.browser.event');
clojure.browser.net._STAR_timeout_STAR_ = 10000;
clojure.browser.net.event_types = cljs.core.into.call(null,cljs.core.ObjMap.EMPTY,cljs.core.map.call(null,(function (p__10925){
var vec__10926__10927 = p__10925;
var k__10928 = cljs.core.nth.call(null,vec__10926__10927,0,null);
var v__10929 = cljs.core.nth.call(null,vec__10926__10927,1,null);
return cljs.core.PersistentVector.fromArray([cljs.core.keyword.call(null,k__10928.toLowerCase()),v__10929], true);
}),cljs.core.merge.call(null,cljs.core.js__GT_clj.call(null,goog.net.EventType))));
clojure.browser.net.IConnection = {};
clojure.browser.net.connect = (function() {
var connect = null;
var connect__1 = (function (this$){
if((function (){var and__3822__auto____10946 = this$;
if(and__3822__auto____10946)
{return this$.clojure$browser$net$IConnection$connect$arity$1;
} else
{return and__3822__auto____10946;
}
})())
{return this$.clojure$browser$net$IConnection$connect$arity$1(this$);
} else
{var x__3056__auto____10947 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____10948 = (clojure.browser.net.connect[goog.typeOf(x__3056__auto____10947)]);
if(or__3824__auto____10948)
{return or__3824__auto____10948;
} else
{var or__3824__auto____10949 = (clojure.browser.net.connect["_"]);
if(or__3824__auto____10949)
{return or__3824__auto____10949;
} else
{throw cljs.core.missing_protocol.call(null,"IConnection.connect",this$);
}
}
})().call(null,this$);
}
});
var connect__2 = (function (this$,opt1){
if((function (){var and__3822__auto____10950 = this$;
if(and__3822__auto____10950)
{return this$.clojure$browser$net$IConnection$connect$arity$2;
} else
{return and__3822__auto____10950;
}
})())
{return this$.clojure$browser$net$IConnection$connect$arity$2(this$,opt1);
} else
{var x__3056__auto____10951 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____10952 = (clojure.browser.net.connect[goog.typeOf(x__3056__auto____10951)]);
if(or__3824__auto____10952)
{return or__3824__auto____10952;
} else
{var or__3824__auto____10953 = (clojure.browser.net.connect["_"]);
if(or__3824__auto____10953)
{return or__3824__auto____10953;
} else
{throw cljs.core.missing_protocol.call(null,"IConnection.connect",this$);
}
}
})().call(null,this$,opt1);
}
});
var connect__3 = (function (this$,opt1,opt2){
if((function (){var and__3822__auto____10954 = this$;
if(and__3822__auto____10954)
{return this$.clojure$browser$net$IConnection$connect$arity$3;
} else
{return and__3822__auto____10954;
}
})())
{return this$.clojure$browser$net$IConnection$connect$arity$3(this$,opt1,opt2);
} else
{var x__3056__auto____10955 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____10956 = (clojure.browser.net.connect[goog.typeOf(x__3056__auto____10955)]);
if(or__3824__auto____10956)
{return or__3824__auto____10956;
} else
{var or__3824__auto____10957 = (clojure.browser.net.connect["_"]);
if(or__3824__auto____10957)
{return or__3824__auto____10957;
} else
{throw cljs.core.missing_protocol.call(null,"IConnection.connect",this$);
}
}
})().call(null,this$,opt1,opt2);
}
});
var connect__4 = (function (this$,opt1,opt2,opt3){
if((function (){var and__3822__auto____10958 = this$;
if(and__3822__auto____10958)
{return this$.clojure$browser$net$IConnection$connect$arity$4;
} else
{return and__3822__auto____10958;
}
})())
{return this$.clojure$browser$net$IConnection$connect$arity$4(this$,opt1,opt2,opt3);
} else
{var x__3056__auto____10959 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____10960 = (clojure.browser.net.connect[goog.typeOf(x__3056__auto____10959)]);
if(or__3824__auto____10960)
{return or__3824__auto____10960;
} else
{var or__3824__auto____10961 = (clojure.browser.net.connect["_"]);
if(or__3824__auto____10961)
{return or__3824__auto____10961;
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
if((function (){var and__3822__auto____10982 = this$;
if(and__3822__auto____10982)
{return this$.clojure$browser$net$IConnection$transmit$arity$2;
} else
{return and__3822__auto____10982;
}
})())
{return this$.clojure$browser$net$IConnection$transmit$arity$2(this$,opt);
} else
{var x__3056__auto____10983 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____10984 = (clojure.browser.net.transmit[goog.typeOf(x__3056__auto____10983)]);
if(or__3824__auto____10984)
{return or__3824__auto____10984;
} else
{var or__3824__auto____10985 = (clojure.browser.net.transmit["_"]);
if(or__3824__auto____10985)
{return or__3824__auto____10985;
} else
{throw cljs.core.missing_protocol.call(null,"IConnection.transmit",this$);
}
}
})().call(null,this$,opt);
}
});
var transmit__3 = (function (this$,opt,opt2){
if((function (){var and__3822__auto____10986 = this$;
if(and__3822__auto____10986)
{return this$.clojure$browser$net$IConnection$transmit$arity$3;
} else
{return and__3822__auto____10986;
}
})())
{return this$.clojure$browser$net$IConnection$transmit$arity$3(this$,opt,opt2);
} else
{var x__3056__auto____10987 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____10988 = (clojure.browser.net.transmit[goog.typeOf(x__3056__auto____10987)]);
if(or__3824__auto____10988)
{return or__3824__auto____10988;
} else
{var or__3824__auto____10989 = (clojure.browser.net.transmit["_"]);
if(or__3824__auto____10989)
{return or__3824__auto____10989;
} else
{throw cljs.core.missing_protocol.call(null,"IConnection.transmit",this$);
}
}
})().call(null,this$,opt,opt2);
}
});
var transmit__4 = (function (this$,opt,opt2,opt3){
if((function (){var and__3822__auto____10990 = this$;
if(and__3822__auto____10990)
{return this$.clojure$browser$net$IConnection$transmit$arity$4;
} else
{return and__3822__auto____10990;
}
})())
{return this$.clojure$browser$net$IConnection$transmit$arity$4(this$,opt,opt2,opt3);
} else
{var x__3056__auto____10991 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____10992 = (clojure.browser.net.transmit[goog.typeOf(x__3056__auto____10991)]);
if(or__3824__auto____10992)
{return or__3824__auto____10992;
} else
{var or__3824__auto____10993 = (clojure.browser.net.transmit["_"]);
if(or__3824__auto____10993)
{return or__3824__auto____10993;
} else
{throw cljs.core.missing_protocol.call(null,"IConnection.transmit",this$);
}
}
})().call(null,this$,opt,opt2,opt3);
}
});
var transmit__5 = (function (this$,opt,opt2,opt3,opt4){
if((function (){var and__3822__auto____10994 = this$;
if(and__3822__auto____10994)
{return this$.clojure$browser$net$IConnection$transmit$arity$5;
} else
{return and__3822__auto____10994;
}
})())
{return this$.clojure$browser$net$IConnection$transmit$arity$5(this$,opt,opt2,opt3,opt4);
} else
{var x__3056__auto____10995 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____10996 = (clojure.browser.net.transmit[goog.typeOf(x__3056__auto____10995)]);
if(or__3824__auto____10996)
{return or__3824__auto____10996;
} else
{var or__3824__auto____10997 = (clojure.browser.net.transmit["_"]);
if(or__3824__auto____10997)
{return or__3824__auto____10997;
} else
{throw cljs.core.missing_protocol.call(null,"IConnection.transmit",this$);
}
}
})().call(null,this$,opt,opt2,opt3,opt4);
}
});
var transmit__6 = (function (this$,opt,opt2,opt3,opt4,opt5){
if((function (){var and__3822__auto____10998 = this$;
if(and__3822__auto____10998)
{return this$.clojure$browser$net$IConnection$transmit$arity$6;
} else
{return and__3822__auto____10998;
}
})())
{return this$.clojure$browser$net$IConnection$transmit$arity$6(this$,opt,opt2,opt3,opt4,opt5);
} else
{var x__3056__auto____10999 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____11000 = (clojure.browser.net.transmit[goog.typeOf(x__3056__auto____10999)]);
if(or__3824__auto____11000)
{return or__3824__auto____11000;
} else
{var or__3824__auto____11001 = (clojure.browser.net.transmit["_"]);
if(or__3824__auto____11001)
{return or__3824__auto____11001;
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
if((function (){var and__3822__auto____11006 = this$;
if(and__3822__auto____11006)
{return this$.clojure$browser$net$IConnection$close$arity$1;
} else
{return and__3822__auto____11006;
}
})())
{return this$.clojure$browser$net$IConnection$close$arity$1(this$);
} else
{var x__3056__auto____11007 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____11008 = (clojure.browser.net.close[goog.typeOf(x__3056__auto____11007)]);
if(or__3824__auto____11008)
{return or__3824__auto____11008;
} else
{var or__3824__auto____11009 = (clojure.browser.net.close["_"]);
if(or__3824__auto____11009)
{return or__3824__auto____11009;
} else
{throw cljs.core.missing_protocol.call(null,"IConnection.close",this$);
}
}
})().call(null,this$);
}
});
goog.net.XhrIo.prototype.clojure$browser$event$EventType$ = true;
goog.net.XhrIo.prototype.clojure$browser$event$EventType$event_types$arity$1 = (function (this$){
return cljs.core.into.call(null,cljs.core.ObjMap.EMPTY,cljs.core.map.call(null,(function (p__11010){
var vec__11011__11012 = p__11010;
var k__11013 = cljs.core.nth.call(null,vec__11011__11012,0,null);
var v__11014 = cljs.core.nth.call(null,vec__11011__11012,1,null);
return cljs.core.PersistentVector.fromArray([cljs.core.keyword.call(null,k__11013.toLowerCase()),v__11014], true);
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
clojure.browser.net.xpc_config_fields = cljs.core.into.call(null,cljs.core.ObjMap.EMPTY,cljs.core.map.call(null,(function (p__11015){
var vec__11016__11017 = p__11015;
var k__11018 = cljs.core.nth.call(null,vec__11016__11017,0,null);
var v__11019 = cljs.core.nth.call(null,vec__11016__11017,1,null);
return cljs.core.PersistentVector.fromArray([cljs.core.keyword.call(null,k__11018.toLowerCase()),v__11019], true);
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
if((function (){var and__3822__auto____11028 = this$;
if(and__3822__auto____11028)
{return this$.clojure$browser$net$ICrossPageChannel$register_service$arity$3;
} else
{return and__3822__auto____11028;
}
})())
{return this$.clojure$browser$net$ICrossPageChannel$register_service$arity$3(this$,service_name,fn);
} else
{var x__3056__auto____11029 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____11030 = (clojure.browser.net.register_service[goog.typeOf(x__3056__auto____11029)]);
if(or__3824__auto____11030)
{return or__3824__auto____11030;
} else
{var or__3824__auto____11031 = (clojure.browser.net.register_service["_"]);
if(or__3824__auto____11031)
{return or__3824__auto____11031;
} else
{throw cljs.core.missing_protocol.call(null,"ICrossPageChannel.register-service",this$);
}
}
})().call(null,this$,service_name,fn);
}
});
var register_service__4 = (function (this$,service_name,fn,encode_json_QMARK_){
if((function (){var and__3822__auto____11032 = this$;
if(and__3822__auto____11032)
{return this$.clojure$browser$net$ICrossPageChannel$register_service$arity$4;
} else
{return and__3822__auto____11032;
}
})())
{return this$.clojure$browser$net$ICrossPageChannel$register_service$arity$4(this$,service_name,fn,encode_json_QMARK_);
} else
{var x__3056__auto____11033 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____11034 = (clojure.browser.net.register_service[goog.typeOf(x__3056__auto____11033)]);
if(or__3824__auto____11034)
{return or__3824__auto____11034;
} else
{var or__3824__auto____11035 = (clojure.browser.net.register_service["_"]);
if(or__3824__auto____11035)
{return or__3824__auto____11035;
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
var temp__3974__auto____11047 = (new goog.Uri(window.location.href)).getParameterValue("xpc");
if(cljs.core.truth_(temp__3974__auto____11047))
{var config__11048 = temp__3974__auto____11047;
return (new goog.net.xpc.CrossPageChannel(goog.json.parse(config__11048)));
} else
{return null;
}
});
var xpc_connection__1 = (function (config){
return (new goog.net.xpc.CrossPageChannel(cljs.core.reduce.call(null,(function (sum,p__11049){
var vec__11050__11051 = p__11049;
var k__11052 = cljs.core.nth.call(null,vec__11050__11051,0,null);
var v__11053 = cljs.core.nth.call(null,vec__11050__11051,1,null);
var temp__3971__auto____11054 = cljs.core._lookup.call(null,clojure.browser.net.xpc_config_fields,k__11052,null);
if(cljs.core.truth_(temp__3971__auto____11054))
{var field__11055 = temp__3971__auto____11054;
var G__11056__11057 = sum;
(G__11056__11057[field__11055] = v__11053);
return G__11056__11057;
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
