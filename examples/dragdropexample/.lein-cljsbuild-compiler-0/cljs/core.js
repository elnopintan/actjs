goog.provide('cljs.core');
goog.require('goog.array');
goog.require('goog.object');
goog.require('goog.string.format');
goog.require('goog.string.StringBuffer');
goog.require('goog.string');
cljs.core._STAR_unchecked_if_STAR_ = false;
/**
* Each runtime environment provides a diffenent way to print output.
* Whatever function *print-fn* is bound to will be passed any
* Strings which should be printed.
*/
cljs.core._STAR_print_fn_STAR_ = (function _STAR_print_fn_STAR_(_){
throw (new Error("No *print-fn* fn set for evaluation environment"));
});
/**
* Internal - do not use!
*/
cljs.core.truth_ = (function truth_(x){
return (x != null && x !== false);
});
/**
* Internal - do not use!
*/
cljs.core.type_satisfies_ = (function type_satisfies_(p,x){
var x__6229 = (((x == null))?null:x);
if((p[goog.typeOf(x__6229)]))
{return true;
} else
{if((p["_"]))
{return true;
} else
{if("\uFDD0'else")
{return false;
} else
{return null;
}
}
}
});
cljs.core.is_proto_ = (function is_proto_(x){
return (x.constructor.prototype === x);
});
/**
* When compiled for a command-line target, whatever
* function *main-fn* is set to will be called with the command-line
* argv as arguments
*/
cljs.core._STAR_main_cli_fn_STAR_ = null;
cljs.core.missing_protocol = (function missing_protocol(proto,obj){
return Error(["No protocol method ",proto," defined for type ",goog.typeOf(obj),": ",obj].join(""));
});
/**
* Returns a javascript array, cloned from the passed in array
*/
cljs.core.aclone = (function aclone(array_like){
return array_like.slice();
});
/**
* Creates a new javascript array.
* @param {...*} var_args
*/
cljs.core.array = (function array(var_args){
return Array.prototype.slice.call(arguments);
});
cljs.core.make_array = (function() {
var make_array = null;
var make_array__1 = (function (size){
return (new Array(size));
});
var make_array__2 = (function (type,size){
return make_array.call(null,size);
});
make_array = function(type,size){
switch(arguments.length){
case 1:
return make_array__1.call(this,type);
case 2:
return make_array__2.call(this,type,size);
}
throw('Invalid arity: ' + arguments.length);
};
make_array.cljs$lang$arity$1 = make_array__1;
make_array.cljs$lang$arity$2 = make_array__2;
return make_array;
})()
;
/**
* Returns the value at the index.
* @param {...*} var_args
*/
cljs.core.aget = (function() {
var aget = null;
var aget__2 = (function (array,i){
return (array[i]);
});
var aget__3 = (function() { 
var G__6230__delegate = function (array,i,idxs){
return cljs.core.apply.call(null,aget,aget.call(null,array,i),idxs);
};
var G__6230 = function (array,i,var_args){
var idxs = null;
if (goog.isDef(var_args)) {
  idxs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__6230__delegate.call(this, array, i, idxs);
};
G__6230.cljs$lang$maxFixedArity = 2;
G__6230.cljs$lang$applyTo = (function (arglist__6231){
var array = cljs.core.first(arglist__6231);
var i = cljs.core.first(cljs.core.next(arglist__6231));
var idxs = cljs.core.rest(cljs.core.next(arglist__6231));
return G__6230__delegate(array, i, idxs);
});
G__6230.cljs$lang$arity$variadic = G__6230__delegate;
return G__6230;
})()
;
aget = function(array,i,var_args){
var idxs = var_args;
switch(arguments.length){
case 2:
return aget__2.call(this,array,i);
default:
return aget__3.cljs$lang$arity$variadic(array,i, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
aget.cljs$lang$maxFixedArity = 2;
aget.cljs$lang$applyTo = aget__3.cljs$lang$applyTo;
aget.cljs$lang$arity$2 = aget__2;
aget.cljs$lang$arity$variadic = aget__3.cljs$lang$arity$variadic;
return aget;
})()
;
/**
* Sets the value at the index.
*/
cljs.core.aset = (function aset(array,i,val){
return (array[i] = val);
});
/**
* Returns the length of the array. Works on arrays of all types.
*/
cljs.core.alength = (function alength(array){
return array.length;
});
cljs.core.into_array = (function() {
var into_array = null;
var into_array__1 = (function (aseq){
return into_array.call(null,null,aseq);
});
var into_array__2 = (function (type,aseq){
return cljs.core.reduce.call(null,(function (a,x){
a.push(x);
return a;
}),[],aseq);
});
into_array = function(type,aseq){
switch(arguments.length){
case 1:
return into_array__1.call(this,type);
case 2:
return into_array__2.call(this,type,aseq);
}
throw('Invalid arity: ' + arguments.length);
};
into_array.cljs$lang$arity$1 = into_array__1;
into_array.cljs$lang$arity$2 = into_array__2;
return into_array;
})()
;
cljs.core.IFn = {};
cljs.core._invoke = (function() {
var _invoke = null;
var _invoke__1 = (function (this$){
if((function (){var and__3822__auto____6316 = this$;
if(and__3822__auto____6316)
{return this$.cljs$core$IFn$_invoke$arity$1;
} else
{return and__3822__auto____6316;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$1(this$);
} else
{var x__2369__auto____6317 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____6318 = (cljs.core._invoke[goog.typeOf(x__2369__auto____6317)]);
if(or__3824__auto____6318)
{return or__3824__auto____6318;
} else
{var or__3824__auto____6319 = (cljs.core._invoke["_"]);
if(or__3824__auto____6319)
{return or__3824__auto____6319;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$);
}
});
var _invoke__2 = (function (this$,a){
if((function (){var and__3822__auto____6320 = this$;
if(and__3822__auto____6320)
{return this$.cljs$core$IFn$_invoke$arity$2;
} else
{return and__3822__auto____6320;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$2(this$,a);
} else
{var x__2369__auto____6321 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____6322 = (cljs.core._invoke[goog.typeOf(x__2369__auto____6321)]);
if(or__3824__auto____6322)
{return or__3824__auto____6322;
} else
{var or__3824__auto____6323 = (cljs.core._invoke["_"]);
if(or__3824__auto____6323)
{return or__3824__auto____6323;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a);
}
});
var _invoke__3 = (function (this$,a,b){
if((function (){var and__3822__auto____6324 = this$;
if(and__3822__auto____6324)
{return this$.cljs$core$IFn$_invoke$arity$3;
} else
{return and__3822__auto____6324;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$3(this$,a,b);
} else
{var x__2369__auto____6325 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____6326 = (cljs.core._invoke[goog.typeOf(x__2369__auto____6325)]);
if(or__3824__auto____6326)
{return or__3824__auto____6326;
} else
{var or__3824__auto____6327 = (cljs.core._invoke["_"]);
if(or__3824__auto____6327)
{return or__3824__auto____6327;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b);
}
});
var _invoke__4 = (function (this$,a,b,c){
if((function (){var and__3822__auto____6328 = this$;
if(and__3822__auto____6328)
{return this$.cljs$core$IFn$_invoke$arity$4;
} else
{return and__3822__auto____6328;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$4(this$,a,b,c);
} else
{var x__2369__auto____6329 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____6330 = (cljs.core._invoke[goog.typeOf(x__2369__auto____6329)]);
if(or__3824__auto____6330)
{return or__3824__auto____6330;
} else
{var or__3824__auto____6331 = (cljs.core._invoke["_"]);
if(or__3824__auto____6331)
{return or__3824__auto____6331;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c);
}
});
var _invoke__5 = (function (this$,a,b,c,d){
if((function (){var and__3822__auto____6332 = this$;
if(and__3822__auto____6332)
{return this$.cljs$core$IFn$_invoke$arity$5;
} else
{return and__3822__auto____6332;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$5(this$,a,b,c,d);
} else
{var x__2369__auto____6333 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____6334 = (cljs.core._invoke[goog.typeOf(x__2369__auto____6333)]);
if(or__3824__auto____6334)
{return or__3824__auto____6334;
} else
{var or__3824__auto____6335 = (cljs.core._invoke["_"]);
if(or__3824__auto____6335)
{return or__3824__auto____6335;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d);
}
});
var _invoke__6 = (function (this$,a,b,c,d,e){
if((function (){var and__3822__auto____6336 = this$;
if(and__3822__auto____6336)
{return this$.cljs$core$IFn$_invoke$arity$6;
} else
{return and__3822__auto____6336;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$6(this$,a,b,c,d,e);
} else
{var x__2369__auto____6337 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____6338 = (cljs.core._invoke[goog.typeOf(x__2369__auto____6337)]);
if(or__3824__auto____6338)
{return or__3824__auto____6338;
} else
{var or__3824__auto____6339 = (cljs.core._invoke["_"]);
if(or__3824__auto____6339)
{return or__3824__auto____6339;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e);
}
});
var _invoke__7 = (function (this$,a,b,c,d,e,f){
if((function (){var and__3822__auto____6340 = this$;
if(and__3822__auto____6340)
{return this$.cljs$core$IFn$_invoke$arity$7;
} else
{return and__3822__auto____6340;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$7(this$,a,b,c,d,e,f);
} else
{var x__2369__auto____6341 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____6342 = (cljs.core._invoke[goog.typeOf(x__2369__auto____6341)]);
if(or__3824__auto____6342)
{return or__3824__auto____6342;
} else
{var or__3824__auto____6343 = (cljs.core._invoke["_"]);
if(or__3824__auto____6343)
{return or__3824__auto____6343;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f);
}
});
var _invoke__8 = (function (this$,a,b,c,d,e,f,g){
if((function (){var and__3822__auto____6344 = this$;
if(and__3822__auto____6344)
{return this$.cljs$core$IFn$_invoke$arity$8;
} else
{return and__3822__auto____6344;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$8(this$,a,b,c,d,e,f,g);
} else
{var x__2369__auto____6345 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____6346 = (cljs.core._invoke[goog.typeOf(x__2369__auto____6345)]);
if(or__3824__auto____6346)
{return or__3824__auto____6346;
} else
{var or__3824__auto____6347 = (cljs.core._invoke["_"]);
if(or__3824__auto____6347)
{return or__3824__auto____6347;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g);
}
});
var _invoke__9 = (function (this$,a,b,c,d,e,f,g,h){
if((function (){var and__3822__auto____6348 = this$;
if(and__3822__auto____6348)
{return this$.cljs$core$IFn$_invoke$arity$9;
} else
{return and__3822__auto____6348;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$9(this$,a,b,c,d,e,f,g,h);
} else
{var x__2369__auto____6349 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____6350 = (cljs.core._invoke[goog.typeOf(x__2369__auto____6349)]);
if(or__3824__auto____6350)
{return or__3824__auto____6350;
} else
{var or__3824__auto____6351 = (cljs.core._invoke["_"]);
if(or__3824__auto____6351)
{return or__3824__auto____6351;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h);
}
});
var _invoke__10 = (function (this$,a,b,c,d,e,f,g,h,i){
if((function (){var and__3822__auto____6352 = this$;
if(and__3822__auto____6352)
{return this$.cljs$core$IFn$_invoke$arity$10;
} else
{return and__3822__auto____6352;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$10(this$,a,b,c,d,e,f,g,h,i);
} else
{var x__2369__auto____6353 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____6354 = (cljs.core._invoke[goog.typeOf(x__2369__auto____6353)]);
if(or__3824__auto____6354)
{return or__3824__auto____6354;
} else
{var or__3824__auto____6355 = (cljs.core._invoke["_"]);
if(or__3824__auto____6355)
{return or__3824__auto____6355;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i);
}
});
var _invoke__11 = (function (this$,a,b,c,d,e,f,g,h,i,j){
if((function (){var and__3822__auto____6356 = this$;
if(and__3822__auto____6356)
{return this$.cljs$core$IFn$_invoke$arity$11;
} else
{return and__3822__auto____6356;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$11(this$,a,b,c,d,e,f,g,h,i,j);
} else
{var x__2369__auto____6357 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____6358 = (cljs.core._invoke[goog.typeOf(x__2369__auto____6357)]);
if(or__3824__auto____6358)
{return or__3824__auto____6358;
} else
{var or__3824__auto____6359 = (cljs.core._invoke["_"]);
if(or__3824__auto____6359)
{return or__3824__auto____6359;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j);
}
});
var _invoke__12 = (function (this$,a,b,c,d,e,f,g,h,i,j,k){
if((function (){var and__3822__auto____6360 = this$;
if(and__3822__auto____6360)
{return this$.cljs$core$IFn$_invoke$arity$12;
} else
{return and__3822__auto____6360;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$12(this$,a,b,c,d,e,f,g,h,i,j,k);
} else
{var x__2369__auto____6361 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____6362 = (cljs.core._invoke[goog.typeOf(x__2369__auto____6361)]);
if(or__3824__auto____6362)
{return or__3824__auto____6362;
} else
{var or__3824__auto____6363 = (cljs.core._invoke["_"]);
if(or__3824__auto____6363)
{return or__3824__auto____6363;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k);
}
});
var _invoke__13 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l){
if((function (){var and__3822__auto____6364 = this$;
if(and__3822__auto____6364)
{return this$.cljs$core$IFn$_invoke$arity$13;
} else
{return and__3822__auto____6364;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$13(this$,a,b,c,d,e,f,g,h,i,j,k,l);
} else
{var x__2369__auto____6365 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____6366 = (cljs.core._invoke[goog.typeOf(x__2369__auto____6365)]);
if(or__3824__auto____6366)
{return or__3824__auto____6366;
} else
{var or__3824__auto____6367 = (cljs.core._invoke["_"]);
if(or__3824__auto____6367)
{return or__3824__auto____6367;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l);
}
});
var _invoke__14 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l,m){
if((function (){var and__3822__auto____6368 = this$;
if(and__3822__auto____6368)
{return this$.cljs$core$IFn$_invoke$arity$14;
} else
{return and__3822__auto____6368;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$14(this$,a,b,c,d,e,f,g,h,i,j,k,l,m);
} else
{var x__2369__auto____6369 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____6370 = (cljs.core._invoke[goog.typeOf(x__2369__auto____6369)]);
if(or__3824__auto____6370)
{return or__3824__auto____6370;
} else
{var or__3824__auto____6371 = (cljs.core._invoke["_"]);
if(or__3824__auto____6371)
{return or__3824__auto____6371;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l,m);
}
});
var _invoke__15 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n){
if((function (){var and__3822__auto____6372 = this$;
if(and__3822__auto____6372)
{return this$.cljs$core$IFn$_invoke$arity$15;
} else
{return and__3822__auto____6372;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$15(this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n);
} else
{var x__2369__auto____6373 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____6374 = (cljs.core._invoke[goog.typeOf(x__2369__auto____6373)]);
if(or__3824__auto____6374)
{return or__3824__auto____6374;
} else
{var or__3824__auto____6375 = (cljs.core._invoke["_"]);
if(or__3824__auto____6375)
{return or__3824__auto____6375;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n);
}
});
var _invoke__16 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){
if((function (){var and__3822__auto____6376 = this$;
if(and__3822__auto____6376)
{return this$.cljs$core$IFn$_invoke$arity$16;
} else
{return and__3822__auto____6376;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$16(this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o);
} else
{var x__2369__auto____6377 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____6378 = (cljs.core._invoke[goog.typeOf(x__2369__auto____6377)]);
if(or__3824__auto____6378)
{return or__3824__auto____6378;
} else
{var or__3824__auto____6379 = (cljs.core._invoke["_"]);
if(or__3824__auto____6379)
{return or__3824__auto____6379;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o);
}
});
var _invoke__17 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){
if((function (){var and__3822__auto____6380 = this$;
if(and__3822__auto____6380)
{return this$.cljs$core$IFn$_invoke$arity$17;
} else
{return and__3822__auto____6380;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$17(this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p);
} else
{var x__2369__auto____6381 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____6382 = (cljs.core._invoke[goog.typeOf(x__2369__auto____6381)]);
if(or__3824__auto____6382)
{return or__3824__auto____6382;
} else
{var or__3824__auto____6383 = (cljs.core._invoke["_"]);
if(or__3824__auto____6383)
{return or__3824__auto____6383;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p);
}
});
var _invoke__18 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){
if((function (){var and__3822__auto____6384 = this$;
if(and__3822__auto____6384)
{return this$.cljs$core$IFn$_invoke$arity$18;
} else
{return and__3822__auto____6384;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$18(this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q);
} else
{var x__2369__auto____6385 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____6386 = (cljs.core._invoke[goog.typeOf(x__2369__auto____6385)]);
if(or__3824__auto____6386)
{return or__3824__auto____6386;
} else
{var or__3824__auto____6387 = (cljs.core._invoke["_"]);
if(or__3824__auto____6387)
{return or__3824__auto____6387;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q);
}
});
var _invoke__19 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s){
if((function (){var and__3822__auto____6388 = this$;
if(and__3822__auto____6388)
{return this$.cljs$core$IFn$_invoke$arity$19;
} else
{return and__3822__auto____6388;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$19(this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s);
} else
{var x__2369__auto____6389 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____6390 = (cljs.core._invoke[goog.typeOf(x__2369__auto____6389)]);
if(or__3824__auto____6390)
{return or__3824__auto____6390;
} else
{var or__3824__auto____6391 = (cljs.core._invoke["_"]);
if(or__3824__auto____6391)
{return or__3824__auto____6391;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s);
}
});
var _invoke__20 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t){
if((function (){var and__3822__auto____6392 = this$;
if(and__3822__auto____6392)
{return this$.cljs$core$IFn$_invoke$arity$20;
} else
{return and__3822__auto____6392;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$20(this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t);
} else
{var x__2369__auto____6393 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____6394 = (cljs.core._invoke[goog.typeOf(x__2369__auto____6393)]);
if(or__3824__auto____6394)
{return or__3824__auto____6394;
} else
{var or__3824__auto____6395 = (cljs.core._invoke["_"]);
if(or__3824__auto____6395)
{return or__3824__auto____6395;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t);
}
});
var _invoke__21 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t,rest){
if((function (){var and__3822__auto____6396 = this$;
if(and__3822__auto____6396)
{return this$.cljs$core$IFn$_invoke$arity$21;
} else
{return and__3822__auto____6396;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$21(this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t,rest);
} else
{var x__2369__auto____6397 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____6398 = (cljs.core._invoke[goog.typeOf(x__2369__auto____6397)]);
if(or__3824__auto____6398)
{return or__3824__auto____6398;
} else
{var or__3824__auto____6399 = (cljs.core._invoke["_"]);
if(or__3824__auto____6399)
{return or__3824__auto____6399;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t,rest);
}
});
_invoke = function(this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t,rest){
switch(arguments.length){
case 1:
return _invoke__1.call(this,this$);
case 2:
return _invoke__2.call(this,this$,a);
case 3:
return _invoke__3.call(this,this$,a,b);
case 4:
return _invoke__4.call(this,this$,a,b,c);
case 5:
return _invoke__5.call(this,this$,a,b,c,d);
case 6:
return _invoke__6.call(this,this$,a,b,c,d,e);
case 7:
return _invoke__7.call(this,this$,a,b,c,d,e,f);
case 8:
return _invoke__8.call(this,this$,a,b,c,d,e,f,g);
case 9:
return _invoke__9.call(this,this$,a,b,c,d,e,f,g,h);
case 10:
return _invoke__10.call(this,this$,a,b,c,d,e,f,g,h,i);
case 11:
return _invoke__11.call(this,this$,a,b,c,d,e,f,g,h,i,j);
case 12:
return _invoke__12.call(this,this$,a,b,c,d,e,f,g,h,i,j,k);
case 13:
return _invoke__13.call(this,this$,a,b,c,d,e,f,g,h,i,j,k,l);
case 14:
return _invoke__14.call(this,this$,a,b,c,d,e,f,g,h,i,j,k,l,m);
case 15:
return _invoke__15.call(this,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n);
case 16:
return _invoke__16.call(this,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o);
case 17:
return _invoke__17.call(this,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p);
case 18:
return _invoke__18.call(this,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q);
case 19:
return _invoke__19.call(this,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s);
case 20:
return _invoke__20.call(this,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t);
case 21:
return _invoke__21.call(this,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t,rest);
}
throw('Invalid arity: ' + arguments.length);
};
_invoke.cljs$lang$arity$1 = _invoke__1;
_invoke.cljs$lang$arity$2 = _invoke__2;
_invoke.cljs$lang$arity$3 = _invoke__3;
_invoke.cljs$lang$arity$4 = _invoke__4;
_invoke.cljs$lang$arity$5 = _invoke__5;
_invoke.cljs$lang$arity$6 = _invoke__6;
_invoke.cljs$lang$arity$7 = _invoke__7;
_invoke.cljs$lang$arity$8 = _invoke__8;
_invoke.cljs$lang$arity$9 = _invoke__9;
_invoke.cljs$lang$arity$10 = _invoke__10;
_invoke.cljs$lang$arity$11 = _invoke__11;
_invoke.cljs$lang$arity$12 = _invoke__12;
_invoke.cljs$lang$arity$13 = _invoke__13;
_invoke.cljs$lang$arity$14 = _invoke__14;
_invoke.cljs$lang$arity$15 = _invoke__15;
_invoke.cljs$lang$arity$16 = _invoke__16;
_invoke.cljs$lang$arity$17 = _invoke__17;
_invoke.cljs$lang$arity$18 = _invoke__18;
_invoke.cljs$lang$arity$19 = _invoke__19;
_invoke.cljs$lang$arity$20 = _invoke__20;
_invoke.cljs$lang$arity$21 = _invoke__21;
return _invoke;
})()
;
cljs.core.ICounted = {};
cljs.core._count = (function _count(coll){
if((function (){var and__3822__auto____6404 = coll;
if(and__3822__auto____6404)
{return coll.cljs$core$ICounted$_count$arity$1;
} else
{return and__3822__auto____6404;
}
})())
{return coll.cljs$core$ICounted$_count$arity$1(coll);
} else
{var x__2369__auto____6405 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____6406 = (cljs.core._count[goog.typeOf(x__2369__auto____6405)]);
if(or__3824__auto____6406)
{return or__3824__auto____6406;
} else
{var or__3824__auto____6407 = (cljs.core._count["_"]);
if(or__3824__auto____6407)
{return or__3824__auto____6407;
} else
{throw cljs.core.missing_protocol.call(null,"ICounted.-count",coll);
}
}
})().call(null,coll);
}
});
cljs.core.IEmptyableCollection = {};
cljs.core._empty = (function _empty(coll){
if((function (){var and__3822__auto____6412 = coll;
if(and__3822__auto____6412)
{return coll.cljs$core$IEmptyableCollection$_empty$arity$1;
} else
{return and__3822__auto____6412;
}
})())
{return coll.cljs$core$IEmptyableCollection$_empty$arity$1(coll);
} else
{var x__2369__auto____6413 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____6414 = (cljs.core._empty[goog.typeOf(x__2369__auto____6413)]);
if(or__3824__auto____6414)
{return or__3824__auto____6414;
} else
{var or__3824__auto____6415 = (cljs.core._empty["_"]);
if(or__3824__auto____6415)
{return or__3824__auto____6415;
} else
{throw cljs.core.missing_protocol.call(null,"IEmptyableCollection.-empty",coll);
}
}
})().call(null,coll);
}
});
cljs.core.ICollection = {};
cljs.core._conj = (function _conj(coll,o){
if((function (){var and__3822__auto____6420 = coll;
if(and__3822__auto____6420)
{return coll.cljs$core$ICollection$_conj$arity$2;
} else
{return and__3822__auto____6420;
}
})())
{return coll.cljs$core$ICollection$_conj$arity$2(coll,o);
} else
{var x__2369__auto____6421 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____6422 = (cljs.core._conj[goog.typeOf(x__2369__auto____6421)]);
if(or__3824__auto____6422)
{return or__3824__auto____6422;
} else
{var or__3824__auto____6423 = (cljs.core._conj["_"]);
if(or__3824__auto____6423)
{return or__3824__auto____6423;
} else
{throw cljs.core.missing_protocol.call(null,"ICollection.-conj",coll);
}
}
})().call(null,coll,o);
}
});
cljs.core.IIndexed = {};
cljs.core._nth = (function() {
var _nth = null;
var _nth__2 = (function (coll,n){
if((function (){var and__3822__auto____6432 = coll;
if(and__3822__auto____6432)
{return coll.cljs$core$IIndexed$_nth$arity$2;
} else
{return and__3822__auto____6432;
}
})())
{return coll.cljs$core$IIndexed$_nth$arity$2(coll,n);
} else
{var x__2369__auto____6433 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____6434 = (cljs.core._nth[goog.typeOf(x__2369__auto____6433)]);
if(or__3824__auto____6434)
{return or__3824__auto____6434;
} else
{var or__3824__auto____6435 = (cljs.core._nth["_"]);
if(or__3824__auto____6435)
{return or__3824__auto____6435;
} else
{throw cljs.core.missing_protocol.call(null,"IIndexed.-nth",coll);
}
}
})().call(null,coll,n);
}
});
var _nth__3 = (function (coll,n,not_found){
if((function (){var and__3822__auto____6436 = coll;
if(and__3822__auto____6436)
{return coll.cljs$core$IIndexed$_nth$arity$3;
} else
{return and__3822__auto____6436;
}
})())
{return coll.cljs$core$IIndexed$_nth$arity$3(coll,n,not_found);
} else
{var x__2369__auto____6437 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____6438 = (cljs.core._nth[goog.typeOf(x__2369__auto____6437)]);
if(or__3824__auto____6438)
{return or__3824__auto____6438;
} else
{var or__3824__auto____6439 = (cljs.core._nth["_"]);
if(or__3824__auto____6439)
{return or__3824__auto____6439;
} else
{throw cljs.core.missing_protocol.call(null,"IIndexed.-nth",coll);
}
}
})().call(null,coll,n,not_found);
}
});
_nth = function(coll,n,not_found){
switch(arguments.length){
case 2:
return _nth__2.call(this,coll,n);
case 3:
return _nth__3.call(this,coll,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
_nth.cljs$lang$arity$2 = _nth__2;
_nth.cljs$lang$arity$3 = _nth__3;
return _nth;
})()
;
cljs.core.ASeq = {};
cljs.core.ISeq = {};
cljs.core._first = (function _first(coll){
if((function (){var and__3822__auto____6444 = coll;
if(and__3822__auto____6444)
{return coll.cljs$core$ISeq$_first$arity$1;
} else
{return and__3822__auto____6444;
}
})())
{return coll.cljs$core$ISeq$_first$arity$1(coll);
} else
{var x__2369__auto____6445 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____6446 = (cljs.core._first[goog.typeOf(x__2369__auto____6445)]);
if(or__3824__auto____6446)
{return or__3824__auto____6446;
} else
{var or__3824__auto____6447 = (cljs.core._first["_"]);
if(or__3824__auto____6447)
{return or__3824__auto____6447;
} else
{throw cljs.core.missing_protocol.call(null,"ISeq.-first",coll);
}
}
})().call(null,coll);
}
});
cljs.core._rest = (function _rest(coll){
if((function (){var and__3822__auto____6452 = coll;
if(and__3822__auto____6452)
{return coll.cljs$core$ISeq$_rest$arity$1;
} else
{return and__3822__auto____6452;
}
})())
{return coll.cljs$core$ISeq$_rest$arity$1(coll);
} else
{var x__2369__auto____6453 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____6454 = (cljs.core._rest[goog.typeOf(x__2369__auto____6453)]);
if(or__3824__auto____6454)
{return or__3824__auto____6454;
} else
{var or__3824__auto____6455 = (cljs.core._rest["_"]);
if(or__3824__auto____6455)
{return or__3824__auto____6455;
} else
{throw cljs.core.missing_protocol.call(null,"ISeq.-rest",coll);
}
}
})().call(null,coll);
}
});
cljs.core.INext = {};
cljs.core._next = (function _next(coll){
if((function (){var and__3822__auto____6460 = coll;
if(and__3822__auto____6460)
{return coll.cljs$core$INext$_next$arity$1;
} else
{return and__3822__auto____6460;
}
})())
{return coll.cljs$core$INext$_next$arity$1(coll);
} else
{var x__2369__auto____6461 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____6462 = (cljs.core._next[goog.typeOf(x__2369__auto____6461)]);
if(or__3824__auto____6462)
{return or__3824__auto____6462;
} else
{var or__3824__auto____6463 = (cljs.core._next["_"]);
if(or__3824__auto____6463)
{return or__3824__auto____6463;
} else
{throw cljs.core.missing_protocol.call(null,"INext.-next",coll);
}
}
})().call(null,coll);
}
});
cljs.core.ILookup = {};
cljs.core._lookup = (function() {
var _lookup = null;
var _lookup__2 = (function (o,k){
if((function (){var and__3822__auto____6472 = o;
if(and__3822__auto____6472)
{return o.cljs$core$ILookup$_lookup$arity$2;
} else
{return and__3822__auto____6472;
}
})())
{return o.cljs$core$ILookup$_lookup$arity$2(o,k);
} else
{var x__2369__auto____6473 = (((o == null))?null:o);
return (function (){var or__3824__auto____6474 = (cljs.core._lookup[goog.typeOf(x__2369__auto____6473)]);
if(or__3824__auto____6474)
{return or__3824__auto____6474;
} else
{var or__3824__auto____6475 = (cljs.core._lookup["_"]);
if(or__3824__auto____6475)
{return or__3824__auto____6475;
} else
{throw cljs.core.missing_protocol.call(null,"ILookup.-lookup",o);
}
}
})().call(null,o,k);
}
});
var _lookup__3 = (function (o,k,not_found){
if((function (){var and__3822__auto____6476 = o;
if(and__3822__auto____6476)
{return o.cljs$core$ILookup$_lookup$arity$3;
} else
{return and__3822__auto____6476;
}
})())
{return o.cljs$core$ILookup$_lookup$arity$3(o,k,not_found);
} else
{var x__2369__auto____6477 = (((o == null))?null:o);
return (function (){var or__3824__auto____6478 = (cljs.core._lookup[goog.typeOf(x__2369__auto____6477)]);
if(or__3824__auto____6478)
{return or__3824__auto____6478;
} else
{var or__3824__auto____6479 = (cljs.core._lookup["_"]);
if(or__3824__auto____6479)
{return or__3824__auto____6479;
} else
{throw cljs.core.missing_protocol.call(null,"ILookup.-lookup",o);
}
}
})().call(null,o,k,not_found);
}
});
_lookup = function(o,k,not_found){
switch(arguments.length){
case 2:
return _lookup__2.call(this,o,k);
case 3:
return _lookup__3.call(this,o,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
_lookup.cljs$lang$arity$2 = _lookup__2;
_lookup.cljs$lang$arity$3 = _lookup__3;
return _lookup;
})()
;
cljs.core.IAssociative = {};
cljs.core._contains_key_QMARK_ = (function _contains_key_QMARK_(coll,k){
if((function (){var and__3822__auto____6484 = coll;
if(and__3822__auto____6484)
{return coll.cljs$core$IAssociative$_contains_key_QMARK_$arity$2;
} else
{return and__3822__auto____6484;
}
})())
{return coll.cljs$core$IAssociative$_contains_key_QMARK_$arity$2(coll,k);
} else
{var x__2369__auto____6485 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____6486 = (cljs.core._contains_key_QMARK_[goog.typeOf(x__2369__auto____6485)]);
if(or__3824__auto____6486)
{return or__3824__auto____6486;
} else
{var or__3824__auto____6487 = (cljs.core._contains_key_QMARK_["_"]);
if(or__3824__auto____6487)
{return or__3824__auto____6487;
} else
{throw cljs.core.missing_protocol.call(null,"IAssociative.-contains-key?",coll);
}
}
})().call(null,coll,k);
}
});
cljs.core._assoc = (function _assoc(coll,k,v){
if((function (){var and__3822__auto____6492 = coll;
if(and__3822__auto____6492)
{return coll.cljs$core$IAssociative$_assoc$arity$3;
} else
{return and__3822__auto____6492;
}
})())
{return coll.cljs$core$IAssociative$_assoc$arity$3(coll,k,v);
} else
{var x__2369__auto____6493 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____6494 = (cljs.core._assoc[goog.typeOf(x__2369__auto____6493)]);
if(or__3824__auto____6494)
{return or__3824__auto____6494;
} else
{var or__3824__auto____6495 = (cljs.core._assoc["_"]);
if(or__3824__auto____6495)
{return or__3824__auto____6495;
} else
{throw cljs.core.missing_protocol.call(null,"IAssociative.-assoc",coll);
}
}
})().call(null,coll,k,v);
}
});
cljs.core.IMap = {};
cljs.core._dissoc = (function _dissoc(coll,k){
if((function (){var and__3822__auto____6500 = coll;
if(and__3822__auto____6500)
{return coll.cljs$core$IMap$_dissoc$arity$2;
} else
{return and__3822__auto____6500;
}
})())
{return coll.cljs$core$IMap$_dissoc$arity$2(coll,k);
} else
{var x__2369__auto____6501 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____6502 = (cljs.core._dissoc[goog.typeOf(x__2369__auto____6501)]);
if(or__3824__auto____6502)
{return or__3824__auto____6502;
} else
{var or__3824__auto____6503 = (cljs.core._dissoc["_"]);
if(or__3824__auto____6503)
{return or__3824__auto____6503;
} else
{throw cljs.core.missing_protocol.call(null,"IMap.-dissoc",coll);
}
}
})().call(null,coll,k);
}
});
cljs.core.IMapEntry = {};
cljs.core._key = (function _key(coll){
if((function (){var and__3822__auto____6508 = coll;
if(and__3822__auto____6508)
{return coll.cljs$core$IMapEntry$_key$arity$1;
} else
{return and__3822__auto____6508;
}
})())
{return coll.cljs$core$IMapEntry$_key$arity$1(coll);
} else
{var x__2369__auto____6509 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____6510 = (cljs.core._key[goog.typeOf(x__2369__auto____6509)]);
if(or__3824__auto____6510)
{return or__3824__auto____6510;
} else
{var or__3824__auto____6511 = (cljs.core._key["_"]);
if(or__3824__auto____6511)
{return or__3824__auto____6511;
} else
{throw cljs.core.missing_protocol.call(null,"IMapEntry.-key",coll);
}
}
})().call(null,coll);
}
});
cljs.core._val = (function _val(coll){
if((function (){var and__3822__auto____6516 = coll;
if(and__3822__auto____6516)
{return coll.cljs$core$IMapEntry$_val$arity$1;
} else
{return and__3822__auto____6516;
}
})())
{return coll.cljs$core$IMapEntry$_val$arity$1(coll);
} else
{var x__2369__auto____6517 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____6518 = (cljs.core._val[goog.typeOf(x__2369__auto____6517)]);
if(or__3824__auto____6518)
{return or__3824__auto____6518;
} else
{var or__3824__auto____6519 = (cljs.core._val["_"]);
if(or__3824__auto____6519)
{return or__3824__auto____6519;
} else
{throw cljs.core.missing_protocol.call(null,"IMapEntry.-val",coll);
}
}
})().call(null,coll);
}
});
cljs.core.ISet = {};
cljs.core._disjoin = (function _disjoin(coll,v){
if((function (){var and__3822__auto____6524 = coll;
if(and__3822__auto____6524)
{return coll.cljs$core$ISet$_disjoin$arity$2;
} else
{return and__3822__auto____6524;
}
})())
{return coll.cljs$core$ISet$_disjoin$arity$2(coll,v);
} else
{var x__2369__auto____6525 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____6526 = (cljs.core._disjoin[goog.typeOf(x__2369__auto____6525)]);
if(or__3824__auto____6526)
{return or__3824__auto____6526;
} else
{var or__3824__auto____6527 = (cljs.core._disjoin["_"]);
if(or__3824__auto____6527)
{return or__3824__auto____6527;
} else
{throw cljs.core.missing_protocol.call(null,"ISet.-disjoin",coll);
}
}
})().call(null,coll,v);
}
});
cljs.core.IStack = {};
cljs.core._peek = (function _peek(coll){
if((function (){var and__3822__auto____6532 = coll;
if(and__3822__auto____6532)
{return coll.cljs$core$IStack$_peek$arity$1;
} else
{return and__3822__auto____6532;
}
})())
{return coll.cljs$core$IStack$_peek$arity$1(coll);
} else
{var x__2369__auto____6533 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____6534 = (cljs.core._peek[goog.typeOf(x__2369__auto____6533)]);
if(or__3824__auto____6534)
{return or__3824__auto____6534;
} else
{var or__3824__auto____6535 = (cljs.core._peek["_"]);
if(or__3824__auto____6535)
{return or__3824__auto____6535;
} else
{throw cljs.core.missing_protocol.call(null,"IStack.-peek",coll);
}
}
})().call(null,coll);
}
});
cljs.core._pop = (function _pop(coll){
if((function (){var and__3822__auto____6540 = coll;
if(and__3822__auto____6540)
{return coll.cljs$core$IStack$_pop$arity$1;
} else
{return and__3822__auto____6540;
}
})())
{return coll.cljs$core$IStack$_pop$arity$1(coll);
} else
{var x__2369__auto____6541 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____6542 = (cljs.core._pop[goog.typeOf(x__2369__auto____6541)]);
if(or__3824__auto____6542)
{return or__3824__auto____6542;
} else
{var or__3824__auto____6543 = (cljs.core._pop["_"]);
if(or__3824__auto____6543)
{return or__3824__auto____6543;
} else
{throw cljs.core.missing_protocol.call(null,"IStack.-pop",coll);
}
}
})().call(null,coll);
}
});
cljs.core.IVector = {};
cljs.core._assoc_n = (function _assoc_n(coll,n,val){
if((function (){var and__3822__auto____6548 = coll;
if(and__3822__auto____6548)
{return coll.cljs$core$IVector$_assoc_n$arity$3;
} else
{return and__3822__auto____6548;
}
})())
{return coll.cljs$core$IVector$_assoc_n$arity$3(coll,n,val);
} else
{var x__2369__auto____6549 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____6550 = (cljs.core._assoc_n[goog.typeOf(x__2369__auto____6549)]);
if(or__3824__auto____6550)
{return or__3824__auto____6550;
} else
{var or__3824__auto____6551 = (cljs.core._assoc_n["_"]);
if(or__3824__auto____6551)
{return or__3824__auto____6551;
} else
{throw cljs.core.missing_protocol.call(null,"IVector.-assoc-n",coll);
}
}
})().call(null,coll,n,val);
}
});
cljs.core.IDeref = {};
cljs.core._deref = (function _deref(o){
if((function (){var and__3822__auto____6556 = o;
if(and__3822__auto____6556)
{return o.cljs$core$IDeref$_deref$arity$1;
} else
{return and__3822__auto____6556;
}
})())
{return o.cljs$core$IDeref$_deref$arity$1(o);
} else
{var x__2369__auto____6557 = (((o == null))?null:o);
return (function (){var or__3824__auto____6558 = (cljs.core._deref[goog.typeOf(x__2369__auto____6557)]);
if(or__3824__auto____6558)
{return or__3824__auto____6558;
} else
{var or__3824__auto____6559 = (cljs.core._deref["_"]);
if(or__3824__auto____6559)
{return or__3824__auto____6559;
} else
{throw cljs.core.missing_protocol.call(null,"IDeref.-deref",o);
}
}
})().call(null,o);
}
});
cljs.core.IDerefWithTimeout = {};
cljs.core._deref_with_timeout = (function _deref_with_timeout(o,msec,timeout_val){
if((function (){var and__3822__auto____6564 = o;
if(and__3822__auto____6564)
{return o.cljs$core$IDerefWithTimeout$_deref_with_timeout$arity$3;
} else
{return and__3822__auto____6564;
}
})())
{return o.cljs$core$IDerefWithTimeout$_deref_with_timeout$arity$3(o,msec,timeout_val);
} else
{var x__2369__auto____6565 = (((o == null))?null:o);
return (function (){var or__3824__auto____6566 = (cljs.core._deref_with_timeout[goog.typeOf(x__2369__auto____6565)]);
if(or__3824__auto____6566)
{return or__3824__auto____6566;
} else
{var or__3824__auto____6567 = (cljs.core._deref_with_timeout["_"]);
if(or__3824__auto____6567)
{return or__3824__auto____6567;
} else
{throw cljs.core.missing_protocol.call(null,"IDerefWithTimeout.-deref-with-timeout",o);
}
}
})().call(null,o,msec,timeout_val);
}
});
cljs.core.IMeta = {};
cljs.core._meta = (function _meta(o){
if((function (){var and__3822__auto____6572 = o;
if(and__3822__auto____6572)
{return o.cljs$core$IMeta$_meta$arity$1;
} else
{return and__3822__auto____6572;
}
})())
{return o.cljs$core$IMeta$_meta$arity$1(o);
} else
{var x__2369__auto____6573 = (((o == null))?null:o);
return (function (){var or__3824__auto____6574 = (cljs.core._meta[goog.typeOf(x__2369__auto____6573)]);
if(or__3824__auto____6574)
{return or__3824__auto____6574;
} else
{var or__3824__auto____6575 = (cljs.core._meta["_"]);
if(or__3824__auto____6575)
{return or__3824__auto____6575;
} else
{throw cljs.core.missing_protocol.call(null,"IMeta.-meta",o);
}
}
})().call(null,o);
}
});
cljs.core.IWithMeta = {};
cljs.core._with_meta = (function _with_meta(o,meta){
if((function (){var and__3822__auto____6580 = o;
if(and__3822__auto____6580)
{return o.cljs$core$IWithMeta$_with_meta$arity$2;
} else
{return and__3822__auto____6580;
}
})())
{return o.cljs$core$IWithMeta$_with_meta$arity$2(o,meta);
} else
{var x__2369__auto____6581 = (((o == null))?null:o);
return (function (){var or__3824__auto____6582 = (cljs.core._with_meta[goog.typeOf(x__2369__auto____6581)]);
if(or__3824__auto____6582)
{return or__3824__auto____6582;
} else
{var or__3824__auto____6583 = (cljs.core._with_meta["_"]);
if(or__3824__auto____6583)
{return or__3824__auto____6583;
} else
{throw cljs.core.missing_protocol.call(null,"IWithMeta.-with-meta",o);
}
}
})().call(null,o,meta);
}
});
cljs.core.IReduce = {};
cljs.core._reduce = (function() {
var _reduce = null;
var _reduce__2 = (function (coll,f){
if((function (){var and__3822__auto____6592 = coll;
if(and__3822__auto____6592)
{return coll.cljs$core$IReduce$_reduce$arity$2;
} else
{return and__3822__auto____6592;
}
})())
{return coll.cljs$core$IReduce$_reduce$arity$2(coll,f);
} else
{var x__2369__auto____6593 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____6594 = (cljs.core._reduce[goog.typeOf(x__2369__auto____6593)]);
if(or__3824__auto____6594)
{return or__3824__auto____6594;
} else
{var or__3824__auto____6595 = (cljs.core._reduce["_"]);
if(or__3824__auto____6595)
{return or__3824__auto____6595;
} else
{throw cljs.core.missing_protocol.call(null,"IReduce.-reduce",coll);
}
}
})().call(null,coll,f);
}
});
var _reduce__3 = (function (coll,f,start){
if((function (){var and__3822__auto____6596 = coll;
if(and__3822__auto____6596)
{return coll.cljs$core$IReduce$_reduce$arity$3;
} else
{return and__3822__auto____6596;
}
})())
{return coll.cljs$core$IReduce$_reduce$arity$3(coll,f,start);
} else
{var x__2369__auto____6597 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____6598 = (cljs.core._reduce[goog.typeOf(x__2369__auto____6597)]);
if(or__3824__auto____6598)
{return or__3824__auto____6598;
} else
{var or__3824__auto____6599 = (cljs.core._reduce["_"]);
if(or__3824__auto____6599)
{return or__3824__auto____6599;
} else
{throw cljs.core.missing_protocol.call(null,"IReduce.-reduce",coll);
}
}
})().call(null,coll,f,start);
}
});
_reduce = function(coll,f,start){
switch(arguments.length){
case 2:
return _reduce__2.call(this,coll,f);
case 3:
return _reduce__3.call(this,coll,f,start);
}
throw('Invalid arity: ' + arguments.length);
};
_reduce.cljs$lang$arity$2 = _reduce__2;
_reduce.cljs$lang$arity$3 = _reduce__3;
return _reduce;
})()
;
cljs.core.IKVReduce = {};
cljs.core._kv_reduce = (function _kv_reduce(coll,f,init){
if((function (){var and__3822__auto____6604 = coll;
if(and__3822__auto____6604)
{return coll.cljs$core$IKVReduce$_kv_reduce$arity$3;
} else
{return and__3822__auto____6604;
}
})())
{return coll.cljs$core$IKVReduce$_kv_reduce$arity$3(coll,f,init);
} else
{var x__2369__auto____6605 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____6606 = (cljs.core._kv_reduce[goog.typeOf(x__2369__auto____6605)]);
if(or__3824__auto____6606)
{return or__3824__auto____6606;
} else
{var or__3824__auto____6607 = (cljs.core._kv_reduce["_"]);
if(or__3824__auto____6607)
{return or__3824__auto____6607;
} else
{throw cljs.core.missing_protocol.call(null,"IKVReduce.-kv-reduce",coll);
}
}
})().call(null,coll,f,init);
}
});
cljs.core.IEquiv = {};
cljs.core._equiv = (function _equiv(o,other){
if((function (){var and__3822__auto____6612 = o;
if(and__3822__auto____6612)
{return o.cljs$core$IEquiv$_equiv$arity$2;
} else
{return and__3822__auto____6612;
}
})())
{return o.cljs$core$IEquiv$_equiv$arity$2(o,other);
} else
{var x__2369__auto____6613 = (((o == null))?null:o);
return (function (){var or__3824__auto____6614 = (cljs.core._equiv[goog.typeOf(x__2369__auto____6613)]);
if(or__3824__auto____6614)
{return or__3824__auto____6614;
} else
{var or__3824__auto____6615 = (cljs.core._equiv["_"]);
if(or__3824__auto____6615)
{return or__3824__auto____6615;
} else
{throw cljs.core.missing_protocol.call(null,"IEquiv.-equiv",o);
}
}
})().call(null,o,other);
}
});
cljs.core.IHash = {};
cljs.core._hash = (function _hash(o){
if((function (){var and__3822__auto____6620 = o;
if(and__3822__auto____6620)
{return o.cljs$core$IHash$_hash$arity$1;
} else
{return and__3822__auto____6620;
}
})())
{return o.cljs$core$IHash$_hash$arity$1(o);
} else
{var x__2369__auto____6621 = (((o == null))?null:o);
return (function (){var or__3824__auto____6622 = (cljs.core._hash[goog.typeOf(x__2369__auto____6621)]);
if(or__3824__auto____6622)
{return or__3824__auto____6622;
} else
{var or__3824__auto____6623 = (cljs.core._hash["_"]);
if(or__3824__auto____6623)
{return or__3824__auto____6623;
} else
{throw cljs.core.missing_protocol.call(null,"IHash.-hash",o);
}
}
})().call(null,o);
}
});
cljs.core.ISeqable = {};
cljs.core._seq = (function _seq(o){
if((function (){var and__3822__auto____6628 = o;
if(and__3822__auto____6628)
{return o.cljs$core$ISeqable$_seq$arity$1;
} else
{return and__3822__auto____6628;
}
})())
{return o.cljs$core$ISeqable$_seq$arity$1(o);
} else
{var x__2369__auto____6629 = (((o == null))?null:o);
return (function (){var or__3824__auto____6630 = (cljs.core._seq[goog.typeOf(x__2369__auto____6629)]);
if(or__3824__auto____6630)
{return or__3824__auto____6630;
} else
{var or__3824__auto____6631 = (cljs.core._seq["_"]);
if(or__3824__auto____6631)
{return or__3824__auto____6631;
} else
{throw cljs.core.missing_protocol.call(null,"ISeqable.-seq",o);
}
}
})().call(null,o);
}
});
cljs.core.ISequential = {};
cljs.core.IList = {};
cljs.core.IRecord = {};
cljs.core.IReversible = {};
cljs.core._rseq = (function _rseq(coll){
if((function (){var and__3822__auto____6636 = coll;
if(and__3822__auto____6636)
{return coll.cljs$core$IReversible$_rseq$arity$1;
} else
{return and__3822__auto____6636;
}
})())
{return coll.cljs$core$IReversible$_rseq$arity$1(coll);
} else
{var x__2369__auto____6637 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____6638 = (cljs.core._rseq[goog.typeOf(x__2369__auto____6637)]);
if(or__3824__auto____6638)
{return or__3824__auto____6638;
} else
{var or__3824__auto____6639 = (cljs.core._rseq["_"]);
if(or__3824__auto____6639)
{return or__3824__auto____6639;
} else
{throw cljs.core.missing_protocol.call(null,"IReversible.-rseq",coll);
}
}
})().call(null,coll);
}
});
cljs.core.ISorted = {};
cljs.core._sorted_seq = (function _sorted_seq(coll,ascending_QMARK_){
if((function (){var and__3822__auto____6644 = coll;
if(and__3822__auto____6644)
{return coll.cljs$core$ISorted$_sorted_seq$arity$2;
} else
{return and__3822__auto____6644;
}
})())
{return coll.cljs$core$ISorted$_sorted_seq$arity$2(coll,ascending_QMARK_);
} else
{var x__2369__auto____6645 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____6646 = (cljs.core._sorted_seq[goog.typeOf(x__2369__auto____6645)]);
if(or__3824__auto____6646)
{return or__3824__auto____6646;
} else
{var or__3824__auto____6647 = (cljs.core._sorted_seq["_"]);
if(or__3824__auto____6647)
{return or__3824__auto____6647;
} else
{throw cljs.core.missing_protocol.call(null,"ISorted.-sorted-seq",coll);
}
}
})().call(null,coll,ascending_QMARK_);
}
});
cljs.core._sorted_seq_from = (function _sorted_seq_from(coll,k,ascending_QMARK_){
if((function (){var and__3822__auto____6652 = coll;
if(and__3822__auto____6652)
{return coll.cljs$core$ISorted$_sorted_seq_from$arity$3;
} else
{return and__3822__auto____6652;
}
})())
{return coll.cljs$core$ISorted$_sorted_seq_from$arity$3(coll,k,ascending_QMARK_);
} else
{var x__2369__auto____6653 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____6654 = (cljs.core._sorted_seq_from[goog.typeOf(x__2369__auto____6653)]);
if(or__3824__auto____6654)
{return or__3824__auto____6654;
} else
{var or__3824__auto____6655 = (cljs.core._sorted_seq_from["_"]);
if(or__3824__auto____6655)
{return or__3824__auto____6655;
} else
{throw cljs.core.missing_protocol.call(null,"ISorted.-sorted-seq-from",coll);
}
}
})().call(null,coll,k,ascending_QMARK_);
}
});
cljs.core._entry_key = (function _entry_key(coll,entry){
if((function (){var and__3822__auto____6660 = coll;
if(and__3822__auto____6660)
{return coll.cljs$core$ISorted$_entry_key$arity$2;
} else
{return and__3822__auto____6660;
}
})())
{return coll.cljs$core$ISorted$_entry_key$arity$2(coll,entry);
} else
{var x__2369__auto____6661 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____6662 = (cljs.core._entry_key[goog.typeOf(x__2369__auto____6661)]);
if(or__3824__auto____6662)
{return or__3824__auto____6662;
} else
{var or__3824__auto____6663 = (cljs.core._entry_key["_"]);
if(or__3824__auto____6663)
{return or__3824__auto____6663;
} else
{throw cljs.core.missing_protocol.call(null,"ISorted.-entry-key",coll);
}
}
})().call(null,coll,entry);
}
});
cljs.core._comparator = (function _comparator(coll){
if((function (){var and__3822__auto____6668 = coll;
if(and__3822__auto____6668)
{return coll.cljs$core$ISorted$_comparator$arity$1;
} else
{return and__3822__auto____6668;
}
})())
{return coll.cljs$core$ISorted$_comparator$arity$1(coll);
} else
{var x__2369__auto____6669 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____6670 = (cljs.core._comparator[goog.typeOf(x__2369__auto____6669)]);
if(or__3824__auto____6670)
{return or__3824__auto____6670;
} else
{var or__3824__auto____6671 = (cljs.core._comparator["_"]);
if(or__3824__auto____6671)
{return or__3824__auto____6671;
} else
{throw cljs.core.missing_protocol.call(null,"ISorted.-comparator",coll);
}
}
})().call(null,coll);
}
});
cljs.core.IPrintable = {};
cljs.core._pr_seq = (function _pr_seq(o,opts){
if((function (){var and__3822__auto____6676 = o;
if(and__3822__auto____6676)
{return o.cljs$core$IPrintable$_pr_seq$arity$2;
} else
{return and__3822__auto____6676;
}
})())
{return o.cljs$core$IPrintable$_pr_seq$arity$2(o,opts);
} else
{var x__2369__auto____6677 = (((o == null))?null:o);
return (function (){var or__3824__auto____6678 = (cljs.core._pr_seq[goog.typeOf(x__2369__auto____6677)]);
if(or__3824__auto____6678)
{return or__3824__auto____6678;
} else
{var or__3824__auto____6679 = (cljs.core._pr_seq["_"]);
if(or__3824__auto____6679)
{return or__3824__auto____6679;
} else
{throw cljs.core.missing_protocol.call(null,"IPrintable.-pr-seq",o);
}
}
})().call(null,o,opts);
}
});
cljs.core.IPending = {};
cljs.core._realized_QMARK_ = (function _realized_QMARK_(d){
if((function (){var and__3822__auto____6684 = d;
if(and__3822__auto____6684)
{return d.cljs$core$IPending$_realized_QMARK_$arity$1;
} else
{return and__3822__auto____6684;
}
})())
{return d.cljs$core$IPending$_realized_QMARK_$arity$1(d);
} else
{var x__2369__auto____6685 = (((d == null))?null:d);
return (function (){var or__3824__auto____6686 = (cljs.core._realized_QMARK_[goog.typeOf(x__2369__auto____6685)]);
if(or__3824__auto____6686)
{return or__3824__auto____6686;
} else
{var or__3824__auto____6687 = (cljs.core._realized_QMARK_["_"]);
if(or__3824__auto____6687)
{return or__3824__auto____6687;
} else
{throw cljs.core.missing_protocol.call(null,"IPending.-realized?",d);
}
}
})().call(null,d);
}
});
cljs.core.IWatchable = {};
cljs.core._notify_watches = (function _notify_watches(this$,oldval,newval){
if((function (){var and__3822__auto____6692 = this$;
if(and__3822__auto____6692)
{return this$.cljs$core$IWatchable$_notify_watches$arity$3;
} else
{return and__3822__auto____6692;
}
})())
{return this$.cljs$core$IWatchable$_notify_watches$arity$3(this$,oldval,newval);
} else
{var x__2369__auto____6693 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____6694 = (cljs.core._notify_watches[goog.typeOf(x__2369__auto____6693)]);
if(or__3824__auto____6694)
{return or__3824__auto____6694;
} else
{var or__3824__auto____6695 = (cljs.core._notify_watches["_"]);
if(or__3824__auto____6695)
{return or__3824__auto____6695;
} else
{throw cljs.core.missing_protocol.call(null,"IWatchable.-notify-watches",this$);
}
}
})().call(null,this$,oldval,newval);
}
});
cljs.core._add_watch = (function _add_watch(this$,key,f){
if((function (){var and__3822__auto____6700 = this$;
if(and__3822__auto____6700)
{return this$.cljs$core$IWatchable$_add_watch$arity$3;
} else
{return and__3822__auto____6700;
}
})())
{return this$.cljs$core$IWatchable$_add_watch$arity$3(this$,key,f);
} else
{var x__2369__auto____6701 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____6702 = (cljs.core._add_watch[goog.typeOf(x__2369__auto____6701)]);
if(or__3824__auto____6702)
{return or__3824__auto____6702;
} else
{var or__3824__auto____6703 = (cljs.core._add_watch["_"]);
if(or__3824__auto____6703)
{return or__3824__auto____6703;
} else
{throw cljs.core.missing_protocol.call(null,"IWatchable.-add-watch",this$);
}
}
})().call(null,this$,key,f);
}
});
cljs.core._remove_watch = (function _remove_watch(this$,key){
if((function (){var and__3822__auto____6708 = this$;
if(and__3822__auto____6708)
{return this$.cljs$core$IWatchable$_remove_watch$arity$2;
} else
{return and__3822__auto____6708;
}
})())
{return this$.cljs$core$IWatchable$_remove_watch$arity$2(this$,key);
} else
{var x__2369__auto____6709 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____6710 = (cljs.core._remove_watch[goog.typeOf(x__2369__auto____6709)]);
if(or__3824__auto____6710)
{return or__3824__auto____6710;
} else
{var or__3824__auto____6711 = (cljs.core._remove_watch["_"]);
if(or__3824__auto____6711)
{return or__3824__auto____6711;
} else
{throw cljs.core.missing_protocol.call(null,"IWatchable.-remove-watch",this$);
}
}
})().call(null,this$,key);
}
});
cljs.core.IEditableCollection = {};
cljs.core._as_transient = (function _as_transient(coll){
if((function (){var and__3822__auto____6716 = coll;
if(and__3822__auto____6716)
{return coll.cljs$core$IEditableCollection$_as_transient$arity$1;
} else
{return and__3822__auto____6716;
}
})())
{return coll.cljs$core$IEditableCollection$_as_transient$arity$1(coll);
} else
{var x__2369__auto____6717 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____6718 = (cljs.core._as_transient[goog.typeOf(x__2369__auto____6717)]);
if(or__3824__auto____6718)
{return or__3824__auto____6718;
} else
{var or__3824__auto____6719 = (cljs.core._as_transient["_"]);
if(or__3824__auto____6719)
{return or__3824__auto____6719;
} else
{throw cljs.core.missing_protocol.call(null,"IEditableCollection.-as-transient",coll);
}
}
})().call(null,coll);
}
});
cljs.core.ITransientCollection = {};
cljs.core._conj_BANG_ = (function _conj_BANG_(tcoll,val){
if((function (){var and__3822__auto____6724 = tcoll;
if(and__3822__auto____6724)
{return tcoll.cljs$core$ITransientCollection$_conj_BANG_$arity$2;
} else
{return and__3822__auto____6724;
}
})())
{return tcoll.cljs$core$ITransientCollection$_conj_BANG_$arity$2(tcoll,val);
} else
{var x__2369__auto____6725 = (((tcoll == null))?null:tcoll);
return (function (){var or__3824__auto____6726 = (cljs.core._conj_BANG_[goog.typeOf(x__2369__auto____6725)]);
if(or__3824__auto____6726)
{return or__3824__auto____6726;
} else
{var or__3824__auto____6727 = (cljs.core._conj_BANG_["_"]);
if(or__3824__auto____6727)
{return or__3824__auto____6727;
} else
{throw cljs.core.missing_protocol.call(null,"ITransientCollection.-conj!",tcoll);
}
}
})().call(null,tcoll,val);
}
});
cljs.core._persistent_BANG_ = (function _persistent_BANG_(tcoll){
if((function (){var and__3822__auto____6732 = tcoll;
if(and__3822__auto____6732)
{return tcoll.cljs$core$ITransientCollection$_persistent_BANG_$arity$1;
} else
{return and__3822__auto____6732;
}
})())
{return tcoll.cljs$core$ITransientCollection$_persistent_BANG_$arity$1(tcoll);
} else
{var x__2369__auto____6733 = (((tcoll == null))?null:tcoll);
return (function (){var or__3824__auto____6734 = (cljs.core._persistent_BANG_[goog.typeOf(x__2369__auto____6733)]);
if(or__3824__auto____6734)
{return or__3824__auto____6734;
} else
{var or__3824__auto____6735 = (cljs.core._persistent_BANG_["_"]);
if(or__3824__auto____6735)
{return or__3824__auto____6735;
} else
{throw cljs.core.missing_protocol.call(null,"ITransientCollection.-persistent!",tcoll);
}
}
})().call(null,tcoll);
}
});
cljs.core.ITransientAssociative = {};
cljs.core._assoc_BANG_ = (function _assoc_BANG_(tcoll,key,val){
if((function (){var and__3822__auto____6740 = tcoll;
if(and__3822__auto____6740)
{return tcoll.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3;
} else
{return and__3822__auto____6740;
}
})())
{return tcoll.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3(tcoll,key,val);
} else
{var x__2369__auto____6741 = (((tcoll == null))?null:tcoll);
return (function (){var or__3824__auto____6742 = (cljs.core._assoc_BANG_[goog.typeOf(x__2369__auto____6741)]);
if(or__3824__auto____6742)
{return or__3824__auto____6742;
} else
{var or__3824__auto____6743 = (cljs.core._assoc_BANG_["_"]);
if(or__3824__auto____6743)
{return or__3824__auto____6743;
} else
{throw cljs.core.missing_protocol.call(null,"ITransientAssociative.-assoc!",tcoll);
}
}
})().call(null,tcoll,key,val);
}
});
cljs.core.ITransientMap = {};
cljs.core._dissoc_BANG_ = (function _dissoc_BANG_(tcoll,key){
if((function (){var and__3822__auto____6748 = tcoll;
if(and__3822__auto____6748)
{return tcoll.cljs$core$ITransientMap$_dissoc_BANG_$arity$2;
} else
{return and__3822__auto____6748;
}
})())
{return tcoll.cljs$core$ITransientMap$_dissoc_BANG_$arity$2(tcoll,key);
} else
{var x__2369__auto____6749 = (((tcoll == null))?null:tcoll);
return (function (){var or__3824__auto____6750 = (cljs.core._dissoc_BANG_[goog.typeOf(x__2369__auto____6749)]);
if(or__3824__auto____6750)
{return or__3824__auto____6750;
} else
{var or__3824__auto____6751 = (cljs.core._dissoc_BANG_["_"]);
if(or__3824__auto____6751)
{return or__3824__auto____6751;
} else
{throw cljs.core.missing_protocol.call(null,"ITransientMap.-dissoc!",tcoll);
}
}
})().call(null,tcoll,key);
}
});
cljs.core.ITransientVector = {};
cljs.core._assoc_n_BANG_ = (function _assoc_n_BANG_(tcoll,n,val){
if((function (){var and__3822__auto____6756 = tcoll;
if(and__3822__auto____6756)
{return tcoll.cljs$core$ITransientVector$_assoc_n_BANG_$arity$3;
} else
{return and__3822__auto____6756;
}
})())
{return tcoll.cljs$core$ITransientVector$_assoc_n_BANG_$arity$3(tcoll,n,val);
} else
{var x__2369__auto____6757 = (((tcoll == null))?null:tcoll);
return (function (){var or__3824__auto____6758 = (cljs.core._assoc_n_BANG_[goog.typeOf(x__2369__auto____6757)]);
if(or__3824__auto____6758)
{return or__3824__auto____6758;
} else
{var or__3824__auto____6759 = (cljs.core._assoc_n_BANG_["_"]);
if(or__3824__auto____6759)
{return or__3824__auto____6759;
} else
{throw cljs.core.missing_protocol.call(null,"ITransientVector.-assoc-n!",tcoll);
}
}
})().call(null,tcoll,n,val);
}
});
cljs.core._pop_BANG_ = (function _pop_BANG_(tcoll){
if((function (){var and__3822__auto____6764 = tcoll;
if(and__3822__auto____6764)
{return tcoll.cljs$core$ITransientVector$_pop_BANG_$arity$1;
} else
{return and__3822__auto____6764;
}
})())
{return tcoll.cljs$core$ITransientVector$_pop_BANG_$arity$1(tcoll);
} else
{var x__2369__auto____6765 = (((tcoll == null))?null:tcoll);
return (function (){var or__3824__auto____6766 = (cljs.core._pop_BANG_[goog.typeOf(x__2369__auto____6765)]);
if(or__3824__auto____6766)
{return or__3824__auto____6766;
} else
{var or__3824__auto____6767 = (cljs.core._pop_BANG_["_"]);
if(or__3824__auto____6767)
{return or__3824__auto____6767;
} else
{throw cljs.core.missing_protocol.call(null,"ITransientVector.-pop!",tcoll);
}
}
})().call(null,tcoll);
}
});
cljs.core.ITransientSet = {};
cljs.core._disjoin_BANG_ = (function _disjoin_BANG_(tcoll,v){
if((function (){var and__3822__auto____6772 = tcoll;
if(and__3822__auto____6772)
{return tcoll.cljs$core$ITransientSet$_disjoin_BANG_$arity$2;
} else
{return and__3822__auto____6772;
}
})())
{return tcoll.cljs$core$ITransientSet$_disjoin_BANG_$arity$2(tcoll,v);
} else
{var x__2369__auto____6773 = (((tcoll == null))?null:tcoll);
return (function (){var or__3824__auto____6774 = (cljs.core._disjoin_BANG_[goog.typeOf(x__2369__auto____6773)]);
if(or__3824__auto____6774)
{return or__3824__auto____6774;
} else
{var or__3824__auto____6775 = (cljs.core._disjoin_BANG_["_"]);
if(or__3824__auto____6775)
{return or__3824__auto____6775;
} else
{throw cljs.core.missing_protocol.call(null,"ITransientSet.-disjoin!",tcoll);
}
}
})().call(null,tcoll,v);
}
});
cljs.core.IComparable = {};
cljs.core._compare = (function _compare(x,y){
if((function (){var and__3822__auto____6780 = x;
if(and__3822__auto____6780)
{return x.cljs$core$IComparable$_compare$arity$2;
} else
{return and__3822__auto____6780;
}
})())
{return x.cljs$core$IComparable$_compare$arity$2(x,y);
} else
{var x__2369__auto____6781 = (((x == null))?null:x);
return (function (){var or__3824__auto____6782 = (cljs.core._compare[goog.typeOf(x__2369__auto____6781)]);
if(or__3824__auto____6782)
{return or__3824__auto____6782;
} else
{var or__3824__auto____6783 = (cljs.core._compare["_"]);
if(or__3824__auto____6783)
{return or__3824__auto____6783;
} else
{throw cljs.core.missing_protocol.call(null,"IComparable.-compare",x);
}
}
})().call(null,x,y);
}
});
cljs.core.IChunk = {};
cljs.core._drop_first = (function _drop_first(coll){
if((function (){var and__3822__auto____6788 = coll;
if(and__3822__auto____6788)
{return coll.cljs$core$IChunk$_drop_first$arity$1;
} else
{return and__3822__auto____6788;
}
})())
{return coll.cljs$core$IChunk$_drop_first$arity$1(coll);
} else
{var x__2369__auto____6789 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____6790 = (cljs.core._drop_first[goog.typeOf(x__2369__auto____6789)]);
if(or__3824__auto____6790)
{return or__3824__auto____6790;
} else
{var or__3824__auto____6791 = (cljs.core._drop_first["_"]);
if(or__3824__auto____6791)
{return or__3824__auto____6791;
} else
{throw cljs.core.missing_protocol.call(null,"IChunk.-drop-first",coll);
}
}
})().call(null,coll);
}
});
cljs.core.IChunkedSeq = {};
cljs.core._chunked_first = (function _chunked_first(coll){
if((function (){var and__3822__auto____6796 = coll;
if(and__3822__auto____6796)
{return coll.cljs$core$IChunkedSeq$_chunked_first$arity$1;
} else
{return and__3822__auto____6796;
}
})())
{return coll.cljs$core$IChunkedSeq$_chunked_first$arity$1(coll);
} else
{var x__2369__auto____6797 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____6798 = (cljs.core._chunked_first[goog.typeOf(x__2369__auto____6797)]);
if(or__3824__auto____6798)
{return or__3824__auto____6798;
} else
{var or__3824__auto____6799 = (cljs.core._chunked_first["_"]);
if(or__3824__auto____6799)
{return or__3824__auto____6799;
} else
{throw cljs.core.missing_protocol.call(null,"IChunkedSeq.-chunked-first",coll);
}
}
})().call(null,coll);
}
});
cljs.core._chunked_rest = (function _chunked_rest(coll){
if((function (){var and__3822__auto____6804 = coll;
if(and__3822__auto____6804)
{return coll.cljs$core$IChunkedSeq$_chunked_rest$arity$1;
} else
{return and__3822__auto____6804;
}
})())
{return coll.cljs$core$IChunkedSeq$_chunked_rest$arity$1(coll);
} else
{var x__2369__auto____6805 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____6806 = (cljs.core._chunked_rest[goog.typeOf(x__2369__auto____6805)]);
if(or__3824__auto____6806)
{return or__3824__auto____6806;
} else
{var or__3824__auto____6807 = (cljs.core._chunked_rest["_"]);
if(or__3824__auto____6807)
{return or__3824__auto____6807;
} else
{throw cljs.core.missing_protocol.call(null,"IChunkedSeq.-chunked-rest",coll);
}
}
})().call(null,coll);
}
});
cljs.core.IChunkedNext = {};
cljs.core._chunked_next = (function _chunked_next(coll){
if((function (){var and__3822__auto____6812 = coll;
if(and__3822__auto____6812)
{return coll.cljs$core$IChunkedNext$_chunked_next$arity$1;
} else
{return and__3822__auto____6812;
}
})())
{return coll.cljs$core$IChunkedNext$_chunked_next$arity$1(coll);
} else
{var x__2369__auto____6813 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____6814 = (cljs.core._chunked_next[goog.typeOf(x__2369__auto____6813)]);
if(or__3824__auto____6814)
{return or__3824__auto____6814;
} else
{var or__3824__auto____6815 = (cljs.core._chunked_next["_"]);
if(or__3824__auto____6815)
{return or__3824__auto____6815;
} else
{throw cljs.core.missing_protocol.call(null,"IChunkedNext.-chunked-next",coll);
}
}
})().call(null,coll);
}
});
/**
* Tests if 2 arguments are the same object
*/
cljs.core.identical_QMARK_ = (function identical_QMARK_(x,y){
return (x === y);
});
/**
* Equality. Returns true if x equals y, false if not. Compares
* numbers and collections in a type-independent manner.  Clojure's immutable data
* structures define -equiv (and thus =) as a value, not an identity,
* comparison.
* @param {...*} var_args
*/
cljs.core._EQ_ = (function() {
var _EQ_ = null;
var _EQ___1 = (function (x){
return true;
});
var _EQ___2 = (function (x,y){
var or__3824__auto____6817 = (x === y);
if(or__3824__auto____6817)
{return or__3824__auto____6817;
} else
{return cljs.core._equiv.call(null,x,y);
}
});
var _EQ___3 = (function() { 
var G__6818__delegate = function (x,y,more){
while(true){
if(cljs.core.truth_(_EQ_.call(null,x,y)))
{if(cljs.core.next.call(null,more))
{{
var G__6819 = y;
var G__6820 = cljs.core.first.call(null,more);
var G__6821 = cljs.core.next.call(null,more);
x = G__6819;
y = G__6820;
more = G__6821;
continue;
}
} else
{return _EQ_.call(null,y,cljs.core.first.call(null,more));
}
} else
{return false;
}
break;
}
};
var G__6818 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__6818__delegate.call(this, x, y, more);
};
G__6818.cljs$lang$maxFixedArity = 2;
G__6818.cljs$lang$applyTo = (function (arglist__6822){
var x = cljs.core.first(arglist__6822);
var y = cljs.core.first(cljs.core.next(arglist__6822));
var more = cljs.core.rest(cljs.core.next(arglist__6822));
return G__6818__delegate(x, y, more);
});
G__6818.cljs$lang$arity$variadic = G__6818__delegate;
return G__6818;
})()
;
_EQ_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case 1:
return _EQ___1.call(this,x);
case 2:
return _EQ___2.call(this,x,y);
default:
return _EQ___3.cljs$lang$arity$variadic(x,y, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
_EQ_.cljs$lang$maxFixedArity = 2;
_EQ_.cljs$lang$applyTo = _EQ___3.cljs$lang$applyTo;
_EQ_.cljs$lang$arity$1 = _EQ___1;
_EQ_.cljs$lang$arity$2 = _EQ___2;
_EQ_.cljs$lang$arity$variadic = _EQ___3.cljs$lang$arity$variadic;
return _EQ_;
})()
;
/**
* Returns true if x is nil, false otherwise.
*/
cljs.core.nil_QMARK_ = (function nil_QMARK_(x){
return (x == null);
});
cljs.core.type = (function type(x){
if((x == null))
{return null;
} else
{return x.constructor;
}
});
cljs.core.instance_QMARK_ = (function instance_QMARK_(t,o){
return (o instanceof t);
});
(cljs.core.IHash["null"] = true);
(cljs.core._hash["null"] = (function (o){
return 0;
}));
(cljs.core.ILookup["null"] = true);
(cljs.core._lookup["null"] = (function() {
var G__6823 = null;
var G__6823__2 = (function (o,k){
return null;
});
var G__6823__3 = (function (o,k,not_found){
return not_found;
});
G__6823 = function(o,k,not_found){
switch(arguments.length){
case 2:
return G__6823__2.call(this,o,k);
case 3:
return G__6823__3.call(this,o,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__6823;
})()
);
(cljs.core.IAssociative["null"] = true);
(cljs.core._assoc["null"] = (function (_,k,v){
return cljs.core.hash_map.call(null,k,v);
}));
(cljs.core.INext["null"] = true);
(cljs.core._next["null"] = (function (_){
return null;
}));
(cljs.core.ICollection["null"] = true);
(cljs.core._conj["null"] = (function (_,o){
return cljs.core.list.call(null,o);
}));
(cljs.core.IReduce["null"] = true);
(cljs.core._reduce["null"] = (function() {
var G__6824 = null;
var G__6824__2 = (function (_,f){
return f.call(null);
});
var G__6824__3 = (function (_,f,start){
return start;
});
G__6824 = function(_,f,start){
switch(arguments.length){
case 2:
return G__6824__2.call(this,_,f);
case 3:
return G__6824__3.call(this,_,f,start);
}
throw('Invalid arity: ' + arguments.length);
};
return G__6824;
})()
);
(cljs.core.IPrintable["null"] = true);
(cljs.core._pr_seq["null"] = (function (o){
return cljs.core.list.call(null,"nil");
}));
(cljs.core.ISet["null"] = true);
(cljs.core._disjoin["null"] = (function (_,v){
return null;
}));
(cljs.core.ICounted["null"] = true);
(cljs.core._count["null"] = (function (_){
return 0;
}));
(cljs.core.IStack["null"] = true);
(cljs.core._peek["null"] = (function (_){
return null;
}));
(cljs.core._pop["null"] = (function (_){
return null;
}));
(cljs.core.ISeq["null"] = true);
(cljs.core._first["null"] = (function (_){
return null;
}));
(cljs.core._rest["null"] = (function (_){
return cljs.core.list.call(null);
}));
(cljs.core.IEquiv["null"] = true);
(cljs.core._equiv["null"] = (function (_,o){
return (o == null);
}));
(cljs.core.IWithMeta["null"] = true);
(cljs.core._with_meta["null"] = (function (_,meta){
return null;
}));
(cljs.core.IMeta["null"] = true);
(cljs.core._meta["null"] = (function (_){
return null;
}));
(cljs.core.IIndexed["null"] = true);
(cljs.core._nth["null"] = (function() {
var G__6825 = null;
var G__6825__2 = (function (_,n){
return null;
});
var G__6825__3 = (function (_,n,not_found){
return not_found;
});
G__6825 = function(_,n,not_found){
switch(arguments.length){
case 2:
return G__6825__2.call(this,_,n);
case 3:
return G__6825__3.call(this,_,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__6825;
})()
);
(cljs.core.IEmptyableCollection["null"] = true);
(cljs.core._empty["null"] = (function (_){
return null;
}));
(cljs.core.IMap["null"] = true);
(cljs.core._dissoc["null"] = (function (_,k){
return null;
}));
Date.prototype.cljs$core$IEquiv$ = true;
Date.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (o,other){
var and__3822__auto____6826 = cljs.core.instance_QMARK_.call(null,Date,other);
if(and__3822__auto____6826)
{return (o.toString() === other.toString());
} else
{return and__3822__auto____6826;
}
});
(cljs.core.IHash["number"] = true);
(cljs.core._hash["number"] = (function (o){
return o;
}));
(cljs.core.IEquiv["number"] = true);
(cljs.core._equiv["number"] = (function (x,o){
return (x === o);
}));
(cljs.core.IHash["boolean"] = true);
(cljs.core._hash["boolean"] = (function (o){
if((o === true))
{return 1;
} else
{return 0;
}
}));
(cljs.core.IHash["_"] = true);
(cljs.core._hash["_"] = (function (o){
return goog.getUid(o);
}));
/**
* Returns a number one greater than num.
*/
cljs.core.inc = (function inc(x){
return (x + 1);
});
/**
* Accepts any collection which satisfies the ICount and IIndexed protocols and
* reduces them without incurring seq initialization
*/
cljs.core.ci_reduce = (function() {
var ci_reduce = null;
var ci_reduce__2 = (function (cicoll,f){
var cnt__6839 = cljs.core._count.call(null,cicoll);
if((cnt__6839 === 0))
{return f.call(null);
} else
{var val__6840 = cljs.core._nth.call(null,cicoll,0);
var n__6841 = 1;
while(true){
if((n__6841 < cnt__6839))
{var nval__6842 = f.call(null,val__6840,cljs.core._nth.call(null,cicoll,n__6841));
if(cljs.core.reduced_QMARK_.call(null,nval__6842))
{return cljs.core.deref.call(null,nval__6842);
} else
{{
var G__6851 = nval__6842;
var G__6852 = (n__6841 + 1);
val__6840 = G__6851;
n__6841 = G__6852;
continue;
}
}
} else
{return val__6840;
}
break;
}
}
});
var ci_reduce__3 = (function (cicoll,f,val){
var cnt__6843 = cljs.core._count.call(null,cicoll);
var val__6844 = val;
var n__6845 = 0;
while(true){
if((n__6845 < cnt__6843))
{var nval__6846 = f.call(null,val__6844,cljs.core._nth.call(null,cicoll,n__6845));
if(cljs.core.reduced_QMARK_.call(null,nval__6846))
{return cljs.core.deref.call(null,nval__6846);
} else
{{
var G__6853 = nval__6846;
var G__6854 = (n__6845 + 1);
val__6844 = G__6853;
n__6845 = G__6854;
continue;
}
}
} else
{return val__6844;
}
break;
}
});
var ci_reduce__4 = (function (cicoll,f,val,idx){
var cnt__6847 = cljs.core._count.call(null,cicoll);
var val__6848 = val;
var n__6849 = idx;
while(true){
if((n__6849 < cnt__6847))
{var nval__6850 = f.call(null,val__6848,cljs.core._nth.call(null,cicoll,n__6849));
if(cljs.core.reduced_QMARK_.call(null,nval__6850))
{return cljs.core.deref.call(null,nval__6850);
} else
{{
var G__6855 = nval__6850;
var G__6856 = (n__6849 + 1);
val__6848 = G__6855;
n__6849 = G__6856;
continue;
}
}
} else
{return val__6848;
}
break;
}
});
ci_reduce = function(cicoll,f,val,idx){
switch(arguments.length){
case 2:
return ci_reduce__2.call(this,cicoll,f);
case 3:
return ci_reduce__3.call(this,cicoll,f,val);
case 4:
return ci_reduce__4.call(this,cicoll,f,val,idx);
}
throw('Invalid arity: ' + arguments.length);
};
ci_reduce.cljs$lang$arity$2 = ci_reduce__2;
ci_reduce.cljs$lang$arity$3 = ci_reduce__3;
ci_reduce.cljs$lang$arity$4 = ci_reduce__4;
return ci_reduce;
})()
;
cljs.core.array_reduce = (function() {
var array_reduce = null;
var array_reduce__2 = (function (arr,f){
var cnt__6869 = arr.length;
if((arr.length === 0))
{return f.call(null);
} else
{var val__6870 = (arr[0]);
var n__6871 = 1;
while(true){
if((n__6871 < cnt__6869))
{var nval__6872 = f.call(null,val__6870,(arr[n__6871]));
if(cljs.core.reduced_QMARK_.call(null,nval__6872))
{return cljs.core.deref.call(null,nval__6872);
} else
{{
var G__6881 = nval__6872;
var G__6882 = (n__6871 + 1);
val__6870 = G__6881;
n__6871 = G__6882;
continue;
}
}
} else
{return val__6870;
}
break;
}
}
});
var array_reduce__3 = (function (arr,f,val){
var cnt__6873 = arr.length;
var val__6874 = val;
var n__6875 = 0;
while(true){
if((n__6875 < cnt__6873))
{var nval__6876 = f.call(null,val__6874,(arr[n__6875]));
if(cljs.core.reduced_QMARK_.call(null,nval__6876))
{return cljs.core.deref.call(null,nval__6876);
} else
{{
var G__6883 = nval__6876;
var G__6884 = (n__6875 + 1);
val__6874 = G__6883;
n__6875 = G__6884;
continue;
}
}
} else
{return val__6874;
}
break;
}
});
var array_reduce__4 = (function (arr,f,val,idx){
var cnt__6877 = arr.length;
var val__6878 = val;
var n__6879 = idx;
while(true){
if((n__6879 < cnt__6877))
{var nval__6880 = f.call(null,val__6878,(arr[n__6879]));
if(cljs.core.reduced_QMARK_.call(null,nval__6880))
{return cljs.core.deref.call(null,nval__6880);
} else
{{
var G__6885 = nval__6880;
var G__6886 = (n__6879 + 1);
val__6878 = G__6885;
n__6879 = G__6886;
continue;
}
}
} else
{return val__6878;
}
break;
}
});
array_reduce = function(arr,f,val,idx){
switch(arguments.length){
case 2:
return array_reduce__2.call(this,arr,f);
case 3:
return array_reduce__3.call(this,arr,f,val);
case 4:
return array_reduce__4.call(this,arr,f,val,idx);
}
throw('Invalid arity: ' + arguments.length);
};
array_reduce.cljs$lang$arity$2 = array_reduce__2;
array_reduce.cljs$lang$arity$3 = array_reduce__3;
array_reduce.cljs$lang$arity$4 = array_reduce__4;
return array_reduce;
})()
;

/**
* @constructor
*/
cljs.core.IndexedSeq = (function (a,i){
this.a = a;
this.i = i;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 166199546;
})
cljs.core.IndexedSeq.cljs$lang$type = true;
cljs.core.IndexedSeq.cljs$lang$ctorPrSeq = (function (this__2315__auto__){
return cljs.core.list.call(null,"cljs.core/IndexedSeq");
});
cljs.core.IndexedSeq.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__6887 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.IndexedSeq.prototype.cljs$core$INext$_next$arity$1 = (function (_){
var this__6888 = this;
if(((this__6888.i + 1) < this__6888.a.length))
{return (new cljs.core.IndexedSeq(this__6888.a,(this__6888.i + 1)));
} else
{return null;
}
});
cljs.core.IndexedSeq.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__6889 = this;
return cljs.core.cons.call(null,o,coll);
});
cljs.core.IndexedSeq.prototype.cljs$core$IReversible$_rseq$arity$1 = (function (coll){
var this__6890 = this;
var c__6891 = coll.cljs$core$ICounted$_count$arity$1(coll);
if((c__6891 > 0))
{return (new cljs.core.RSeq(coll,(c__6891 - 1),null));
} else
{return cljs.core.List.EMPTY;
}
});
cljs.core.IndexedSeq.prototype.toString = (function (){
var this__6892 = this;
var this__6893 = this;
return cljs.core.pr_str.call(null,this__6893);
});
cljs.core.IndexedSeq.prototype.cljs$core$IReduce$_reduce$arity$2 = (function (coll,f){
var this__6894 = this;
if(cljs.core.counted_QMARK_.call(null,this__6894.a))
{return cljs.core.ci_reduce.call(null,this__6894.a,f,(this__6894.a[this__6894.i]),(this__6894.i + 1));
} else
{return cljs.core.ci_reduce.call(null,coll,f,(this__6894.a[this__6894.i]),0);
}
});
cljs.core.IndexedSeq.prototype.cljs$core$IReduce$_reduce$arity$3 = (function (coll,f,start){
var this__6895 = this;
if(cljs.core.counted_QMARK_.call(null,this__6895.a))
{return cljs.core.ci_reduce.call(null,this__6895.a,f,start,this__6895.i);
} else
{return cljs.core.ci_reduce.call(null,coll,f,start,0);
}
});
cljs.core.IndexedSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this$){
var this__6896 = this;
return this$;
});
cljs.core.IndexedSeq.prototype.cljs$core$ICounted$_count$arity$1 = (function (_){
var this__6897 = this;
return (this__6897.a.length - this__6897.i);
});
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$_first$arity$1 = (function (_){
var this__6898 = this;
return (this__6898.a[this__6898.i]);
});
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$_rest$arity$1 = (function (_){
var this__6899 = this;
if(((this__6899.i + 1) < this__6899.a.length))
{return (new cljs.core.IndexedSeq(this__6899.a,(this__6899.i + 1)));
} else
{return cljs.core.list.call(null);
}
});
cljs.core.IndexedSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__6900 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.IndexedSeq.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (coll,n){
var this__6901 = this;
var i__6902 = (n + this__6901.i);
if((i__6902 < this__6901.a.length))
{return (this__6901.a[i__6902]);
} else
{return null;
}
});
cljs.core.IndexedSeq.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (coll,n,not_found){
var this__6903 = this;
var i__6904 = (n + this__6903.i);
if((i__6904 < this__6903.a.length))
{return (this__6903.a[i__6904]);
} else
{return not_found;
}
});
cljs.core.IndexedSeq;
cljs.core.prim_seq = (function() {
var prim_seq = null;
var prim_seq__1 = (function (prim){
return prim_seq.call(null,prim,0);
});
var prim_seq__2 = (function (prim,i){
if((prim.length === 0))
{return null;
} else
{return (new cljs.core.IndexedSeq(prim,i));
}
});
prim_seq = function(prim,i){
switch(arguments.length){
case 1:
return prim_seq__1.call(this,prim);
case 2:
return prim_seq__2.call(this,prim,i);
}
throw('Invalid arity: ' + arguments.length);
};
prim_seq.cljs$lang$arity$1 = prim_seq__1;
prim_seq.cljs$lang$arity$2 = prim_seq__2;
return prim_seq;
})()
;
cljs.core.array_seq = (function() {
var array_seq = null;
var array_seq__1 = (function (array){
return cljs.core.prim_seq.call(null,array,0);
});
var array_seq__2 = (function (array,i){
return cljs.core.prim_seq.call(null,array,i);
});
array_seq = function(array,i){
switch(arguments.length){
case 1:
return array_seq__1.call(this,array);
case 2:
return array_seq__2.call(this,array,i);
}
throw('Invalid arity: ' + arguments.length);
};
array_seq.cljs$lang$arity$1 = array_seq__1;
array_seq.cljs$lang$arity$2 = array_seq__2;
return array_seq;
})()
;
(cljs.core.IReduce["array"] = true);
(cljs.core._reduce["array"] = (function() {
var G__6905 = null;
var G__6905__2 = (function (array,f){
return cljs.core.ci_reduce.call(null,array,f);
});
var G__6905__3 = (function (array,f,start){
return cljs.core.ci_reduce.call(null,array,f,start);
});
G__6905 = function(array,f,start){
switch(arguments.length){
case 2:
return G__6905__2.call(this,array,f);
case 3:
return G__6905__3.call(this,array,f,start);
}
throw('Invalid arity: ' + arguments.length);
};
return G__6905;
})()
);
(cljs.core.ILookup["array"] = true);
(cljs.core._lookup["array"] = (function() {
var G__6906 = null;
var G__6906__2 = (function (array,k){
return (array[k]);
});
var G__6906__3 = (function (array,k,not_found){
return cljs.core._nth.call(null,array,k,not_found);
});
G__6906 = function(array,k,not_found){
switch(arguments.length){
case 2:
return G__6906__2.call(this,array,k);
case 3:
return G__6906__3.call(this,array,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__6906;
})()
);
(cljs.core.IIndexed["array"] = true);
(cljs.core._nth["array"] = (function() {
var G__6907 = null;
var G__6907__2 = (function (array,n){
if((n < array.length))
{return (array[n]);
} else
{return null;
}
});
var G__6907__3 = (function (array,n,not_found){
if((n < array.length))
{return (array[n]);
} else
{return not_found;
}
});
G__6907 = function(array,n,not_found){
switch(arguments.length){
case 2:
return G__6907__2.call(this,array,n);
case 3:
return G__6907__3.call(this,array,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__6907;
})()
);
(cljs.core.ICounted["array"] = true);
(cljs.core._count["array"] = (function (a){
return a.length;
}));
(cljs.core.ISeqable["array"] = true);
(cljs.core._seq["array"] = (function (array){
return cljs.core.array_seq.call(null,array,0);
}));

/**
* @constructor
*/
cljs.core.RSeq = (function (ci,i,meta){
this.ci = ci;
this.i = i;
this.meta = meta;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 31850570;
})
cljs.core.RSeq.cljs$lang$type = true;
cljs.core.RSeq.cljs$lang$ctorPrSeq = (function (this__2315__auto__){
return cljs.core.list.call(null,"cljs.core/RSeq");
});
cljs.core.RSeq.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__6908 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.RSeq.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__6909 = this;
return cljs.core.cons.call(null,o,coll);
});
cljs.core.RSeq.prototype.toString = (function (){
var this__6910 = this;
var this__6911 = this;
return cljs.core.pr_str.call(null,this__6911);
});
cljs.core.RSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__6912 = this;
return coll;
});
cljs.core.RSeq.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__6913 = this;
return (this__6913.i + 1);
});
cljs.core.RSeq.prototype.cljs$core$ISeq$_first$arity$1 = (function (coll){
var this__6914 = this;
return cljs.core._nth.call(null,this__6914.ci,this__6914.i);
});
cljs.core.RSeq.prototype.cljs$core$ISeq$_rest$arity$1 = (function (coll){
var this__6915 = this;
if((this__6915.i > 0))
{return (new cljs.core.RSeq(this__6915.ci,(this__6915.i - 1),null));
} else
{return cljs.core.List.EMPTY;
}
});
cljs.core.RSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__6916 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.RSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,new_meta){
var this__6917 = this;
return (new cljs.core.RSeq(this__6917.ci,this__6917.i,new_meta));
});
cljs.core.RSeq.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__6918 = this;
return this__6918.meta;
});
cljs.core.RSeq;
/**
* Returns a seq on the collection. If the collection is
* empty, returns nil.  (seq nil) returns nil. seq also works on
* Strings.
*/
cljs.core.seq = (function seq(coll){
if((coll == null))
{return null;
} else
{if((function (){var G__6922__6923 = coll;
if(G__6922__6923)
{if((function (){var or__3824__auto____6924 = (G__6922__6923.cljs$lang$protocol_mask$partition0$ & 32);
if(or__3824__auto____6924)
{return or__3824__auto____6924;
} else
{return G__6922__6923.cljs$core$ASeq$;
}
})())
{return true;
} else
{if((!G__6922__6923.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ASeq,G__6922__6923);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ASeq,G__6922__6923);
}
})())
{return coll;
} else
{return cljs.core._seq.call(null,coll);
}
}
});
/**
* Returns the first item in the collection. Calls seq on its
* argument. If coll is nil, returns nil.
*/
cljs.core.first = (function first(coll){
if((coll == null))
{return null;
} else
{if((function (){var G__6929__6930 = coll;
if(G__6929__6930)
{if((function (){var or__3824__auto____6931 = (G__6929__6930.cljs$lang$protocol_mask$partition0$ & 64);
if(or__3824__auto____6931)
{return or__3824__auto____6931;
} else
{return G__6929__6930.cljs$core$ISeq$;
}
})())
{return true;
} else
{if((!G__6929__6930.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeq,G__6929__6930);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeq,G__6929__6930);
}
})())
{return cljs.core._first.call(null,coll);
} else
{var s__6932 = cljs.core.seq.call(null,coll);
if((s__6932 == null))
{return null;
} else
{return cljs.core._first.call(null,s__6932);
}
}
}
});
/**
* Returns a possibly empty seq of the items after the first. Calls seq on its
* argument.
*/
cljs.core.rest = (function rest(coll){
if(!((coll == null)))
{if((function (){var G__6937__6938 = coll;
if(G__6937__6938)
{if((function (){var or__3824__auto____6939 = (G__6937__6938.cljs$lang$protocol_mask$partition0$ & 64);
if(or__3824__auto____6939)
{return or__3824__auto____6939;
} else
{return G__6937__6938.cljs$core$ISeq$;
}
})())
{return true;
} else
{if((!G__6937__6938.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeq,G__6937__6938);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeq,G__6937__6938);
}
})())
{return cljs.core._rest.call(null,coll);
} else
{var s__6940 = cljs.core.seq.call(null,coll);
if(!((s__6940 == null)))
{return cljs.core._rest.call(null,s__6940);
} else
{return cljs.core.List.EMPTY;
}
}
} else
{return cljs.core.List.EMPTY;
}
});
/**
* Returns a seq of the items after the first. Calls seq on its
* argument.  If there are no more items, returns nil
*/
cljs.core.next = (function next(coll){
if((coll == null))
{return null;
} else
{if((function (){var G__6944__6945 = coll;
if(G__6944__6945)
{if((function (){var or__3824__auto____6946 = (G__6944__6945.cljs$lang$protocol_mask$partition0$ & 128);
if(or__3824__auto____6946)
{return or__3824__auto____6946;
} else
{return G__6944__6945.cljs$core$INext$;
}
})())
{return true;
} else
{if((!G__6944__6945.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.INext,G__6944__6945);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.INext,G__6944__6945);
}
})())
{return cljs.core._next.call(null,coll);
} else
{return cljs.core.seq.call(null,cljs.core.rest.call(null,coll));
}
}
});
/**
* Same as (first (next x))
*/
cljs.core.second = (function second(coll){
return cljs.core.first.call(null,cljs.core.next.call(null,coll));
});
/**
* Same as (first (first x))
*/
cljs.core.ffirst = (function ffirst(coll){
return cljs.core.first.call(null,cljs.core.first.call(null,coll));
});
/**
* Same as (next (first x))
*/
cljs.core.nfirst = (function nfirst(coll){
return cljs.core.next.call(null,cljs.core.first.call(null,coll));
});
/**
* Same as (first (next x))
*/
cljs.core.fnext = (function fnext(coll){
return cljs.core.first.call(null,cljs.core.next.call(null,coll));
});
/**
* Same as (next (next x))
*/
cljs.core.nnext = (function nnext(coll){
return cljs.core.next.call(null,cljs.core.next.call(null,coll));
});
/**
* Return the last item in coll, in linear time
*/
cljs.core.last = (function last(s){
while(true){
var sn__6948 = cljs.core.next.call(null,s);
if(!((sn__6948 == null)))
{{
var G__6949 = sn__6948;
s = G__6949;
continue;
}
} else
{return cljs.core.first.call(null,s);
}
break;
}
});
(cljs.core.IEquiv["_"] = true);
(cljs.core._equiv["_"] = (function (x,o){
return (x === o);
}));
/**
* Returns true if x is logical false, false otherwise.
*/
cljs.core.not = (function not(x){
if(cljs.core.truth_(x))
{return false;
} else
{return true;
}
});
/**
* conj[oin]. Returns a new collection with the xs
* 'added'. (conj nil item) returns (item).  The 'addition' may
* happen at different 'places' depending on the concrete type.
* @param {...*} var_args
*/
cljs.core.conj = (function() {
var conj = null;
var conj__2 = (function (coll,x){
return cljs.core._conj.call(null,coll,x);
});
var conj__3 = (function() { 
var G__6950__delegate = function (coll,x,xs){
while(true){
if(cljs.core.truth_(xs))
{{
var G__6951 = conj.call(null,coll,x);
var G__6952 = cljs.core.first.call(null,xs);
var G__6953 = cljs.core.next.call(null,xs);
coll = G__6951;
x = G__6952;
xs = G__6953;
continue;
}
} else
{return conj.call(null,coll,x);
}
break;
}
};
var G__6950 = function (coll,x,var_args){
var xs = null;
if (goog.isDef(var_args)) {
  xs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__6950__delegate.call(this, coll, x, xs);
};
G__6950.cljs$lang$maxFixedArity = 2;
G__6950.cljs$lang$applyTo = (function (arglist__6954){
var coll = cljs.core.first(arglist__6954);
var x = cljs.core.first(cljs.core.next(arglist__6954));
var xs = cljs.core.rest(cljs.core.next(arglist__6954));
return G__6950__delegate(coll, x, xs);
});
G__6950.cljs$lang$arity$variadic = G__6950__delegate;
return G__6950;
})()
;
conj = function(coll,x,var_args){
var xs = var_args;
switch(arguments.length){
case 2:
return conj__2.call(this,coll,x);
default:
return conj__3.cljs$lang$arity$variadic(coll,x, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
conj.cljs$lang$maxFixedArity = 2;
conj.cljs$lang$applyTo = conj__3.cljs$lang$applyTo;
conj.cljs$lang$arity$2 = conj__2;
conj.cljs$lang$arity$variadic = conj__3.cljs$lang$arity$variadic;
return conj;
})()
;
/**
* Returns an empty collection of the same category as coll, or nil
*/
cljs.core.empty = (function empty(coll){
return cljs.core._empty.call(null,coll);
});
cljs.core.accumulating_seq_count = (function accumulating_seq_count(coll){
var s__6957 = cljs.core.seq.call(null,coll);
var acc__6958 = 0;
while(true){
if(cljs.core.counted_QMARK_.call(null,s__6957))
{return (acc__6958 + cljs.core._count.call(null,s__6957));
} else
{{
var G__6959 = cljs.core.next.call(null,s__6957);
var G__6960 = (acc__6958 + 1);
s__6957 = G__6959;
acc__6958 = G__6960;
continue;
}
}
break;
}
});
/**
* Returns the number of items in the collection. (count nil) returns
* 0.  Also works on strings, arrays, and Maps
*/
cljs.core.count = (function count(coll){
if(cljs.core.counted_QMARK_.call(null,coll))
{return cljs.core._count.call(null,coll);
} else
{return cljs.core.accumulating_seq_count.call(null,coll);
}
});
cljs.core.linear_traversal_nth = (function() {
var linear_traversal_nth = null;
var linear_traversal_nth__2 = (function (coll,n){
if((coll == null))
{throw (new Error("Index out of bounds"));
} else
{if((n === 0))
{if(cljs.core.seq.call(null,coll))
{return cljs.core.first.call(null,coll);
} else
{throw (new Error("Index out of bounds"));
}
} else
{if(cljs.core.indexed_QMARK_.call(null,coll))
{return cljs.core._nth.call(null,coll,n);
} else
{if(cljs.core.seq.call(null,coll))
{return linear_traversal_nth.call(null,cljs.core.next.call(null,coll),(n - 1));
} else
{if("\uFDD0'else")
{throw (new Error("Index out of bounds"));
} else
{return null;
}
}
}
}
}
});
var linear_traversal_nth__3 = (function (coll,n,not_found){
if((coll == null))
{return not_found;
} else
{if((n === 0))
{if(cljs.core.seq.call(null,coll))
{return cljs.core.first.call(null,coll);
} else
{return not_found;
}
} else
{if(cljs.core.indexed_QMARK_.call(null,coll))
{return cljs.core._nth.call(null,coll,n,not_found);
} else
{if(cljs.core.seq.call(null,coll))
{return linear_traversal_nth.call(null,cljs.core.next.call(null,coll),(n - 1),not_found);
} else
{if("\uFDD0'else")
{return not_found;
} else
{return null;
}
}
}
}
}
});
linear_traversal_nth = function(coll,n,not_found){
switch(arguments.length){
case 2:
return linear_traversal_nth__2.call(this,coll,n);
case 3:
return linear_traversal_nth__3.call(this,coll,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
linear_traversal_nth.cljs$lang$arity$2 = linear_traversal_nth__2;
linear_traversal_nth.cljs$lang$arity$3 = linear_traversal_nth__3;
return linear_traversal_nth;
})()
;
/**
* Returns the value at the index. get returns nil if index out of
* bounds, nth throws an exception unless not-found is supplied.  nth
* also works for strings, arrays, regex Matchers and Lists, and,
* in O(n) time, for sequences.
*/
cljs.core.nth = (function() {
var nth = null;
var nth__2 = (function (coll,n){
if((coll == null))
{return null;
} else
{if((function (){var G__6967__6968 = coll;
if(G__6967__6968)
{if((function (){var or__3824__auto____6969 = (G__6967__6968.cljs$lang$protocol_mask$partition0$ & 16);
if(or__3824__auto____6969)
{return or__3824__auto____6969;
} else
{return G__6967__6968.cljs$core$IIndexed$;
}
})())
{return true;
} else
{if((!G__6967__6968.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IIndexed,G__6967__6968);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IIndexed,G__6967__6968);
}
})())
{return cljs.core._nth.call(null,coll,Math.floor(n));
} else
{return cljs.core.linear_traversal_nth.call(null,coll,Math.floor(n));
}
}
});
var nth__3 = (function (coll,n,not_found){
if(!((coll == null)))
{if((function (){var G__6970__6971 = coll;
if(G__6970__6971)
{if((function (){var or__3824__auto____6972 = (G__6970__6971.cljs$lang$protocol_mask$partition0$ & 16);
if(or__3824__auto____6972)
{return or__3824__auto____6972;
} else
{return G__6970__6971.cljs$core$IIndexed$;
}
})())
{return true;
} else
{if((!G__6970__6971.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IIndexed,G__6970__6971);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IIndexed,G__6970__6971);
}
})())
{return cljs.core._nth.call(null,coll,Math.floor(n),not_found);
} else
{return cljs.core.linear_traversal_nth.call(null,coll,Math.floor(n),not_found);
}
} else
{return not_found;
}
});
nth = function(coll,n,not_found){
switch(arguments.length){
case 2:
return nth__2.call(this,coll,n);
case 3:
return nth__3.call(this,coll,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
nth.cljs$lang$arity$2 = nth__2;
nth.cljs$lang$arity$3 = nth__3;
return nth;
})()
;
/**
* Returns the value mapped to key, not-found or nil if key not present.
*/
cljs.core.get = (function() {
var get = null;
var get__2 = (function (o,k){
return cljs.core._lookup.call(null,o,k);
});
var get__3 = (function (o,k,not_found){
return cljs.core._lookup.call(null,o,k,not_found);
});
get = function(o,k,not_found){
switch(arguments.length){
case 2:
return get__2.call(this,o,k);
case 3:
return get__3.call(this,o,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
get.cljs$lang$arity$2 = get__2;
get.cljs$lang$arity$3 = get__3;
return get;
})()
;
/**
* assoc[iate]. When applied to a map, returns a new map of the
* same (hashed/sorted) type, that contains the mapping of key(s) to
* val(s). When applied to a vector, returns a new vector that
* contains val at index.
* @param {...*} var_args
*/
cljs.core.assoc = (function() {
var assoc = null;
var assoc__3 = (function (coll,k,v){
return cljs.core._assoc.call(null,coll,k,v);
});
var assoc__4 = (function() { 
var G__6975__delegate = function (coll,k,v,kvs){
while(true){
var ret__6974 = assoc.call(null,coll,k,v);
if(cljs.core.truth_(kvs))
{{
var G__6976 = ret__6974;
var G__6977 = cljs.core.first.call(null,kvs);
var G__6978 = cljs.core.second.call(null,kvs);
var G__6979 = cljs.core.nnext.call(null,kvs);
coll = G__6976;
k = G__6977;
v = G__6978;
kvs = G__6979;
continue;
}
} else
{return ret__6974;
}
break;
}
};
var G__6975 = function (coll,k,v,var_args){
var kvs = null;
if (goog.isDef(var_args)) {
  kvs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__6975__delegate.call(this, coll, k, v, kvs);
};
G__6975.cljs$lang$maxFixedArity = 3;
G__6975.cljs$lang$applyTo = (function (arglist__6980){
var coll = cljs.core.first(arglist__6980);
var k = cljs.core.first(cljs.core.next(arglist__6980));
var v = cljs.core.first(cljs.core.next(cljs.core.next(arglist__6980)));
var kvs = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__6980)));
return G__6975__delegate(coll, k, v, kvs);
});
G__6975.cljs$lang$arity$variadic = G__6975__delegate;
return G__6975;
})()
;
assoc = function(coll,k,v,var_args){
var kvs = var_args;
switch(arguments.length){
case 3:
return assoc__3.call(this,coll,k,v);
default:
return assoc__4.cljs$lang$arity$variadic(coll,k,v, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
assoc.cljs$lang$maxFixedArity = 3;
assoc.cljs$lang$applyTo = assoc__4.cljs$lang$applyTo;
assoc.cljs$lang$arity$3 = assoc__3;
assoc.cljs$lang$arity$variadic = assoc__4.cljs$lang$arity$variadic;
return assoc;
})()
;
/**
* dissoc[iate]. Returns a new map of the same (hashed/sorted) type,
* that does not contain a mapping for key(s).
* @param {...*} var_args
*/
cljs.core.dissoc = (function() {
var dissoc = null;
var dissoc__1 = (function (coll){
return coll;
});
var dissoc__2 = (function (coll,k){
return cljs.core._dissoc.call(null,coll,k);
});
var dissoc__3 = (function() { 
var G__6983__delegate = function (coll,k,ks){
while(true){
var ret__6982 = dissoc.call(null,coll,k);
if(cljs.core.truth_(ks))
{{
var G__6984 = ret__6982;
var G__6985 = cljs.core.first.call(null,ks);
var G__6986 = cljs.core.next.call(null,ks);
coll = G__6984;
k = G__6985;
ks = G__6986;
continue;
}
} else
{return ret__6982;
}
break;
}
};
var G__6983 = function (coll,k,var_args){
var ks = null;
if (goog.isDef(var_args)) {
  ks = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__6983__delegate.call(this, coll, k, ks);
};
G__6983.cljs$lang$maxFixedArity = 2;
G__6983.cljs$lang$applyTo = (function (arglist__6987){
var coll = cljs.core.first(arglist__6987);
var k = cljs.core.first(cljs.core.next(arglist__6987));
var ks = cljs.core.rest(cljs.core.next(arglist__6987));
return G__6983__delegate(coll, k, ks);
});
G__6983.cljs$lang$arity$variadic = G__6983__delegate;
return G__6983;
})()
;
dissoc = function(coll,k,var_args){
var ks = var_args;
switch(arguments.length){
case 1:
return dissoc__1.call(this,coll);
case 2:
return dissoc__2.call(this,coll,k);
default:
return dissoc__3.cljs$lang$arity$variadic(coll,k, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
dissoc.cljs$lang$maxFixedArity = 2;
dissoc.cljs$lang$applyTo = dissoc__3.cljs$lang$applyTo;
dissoc.cljs$lang$arity$1 = dissoc__1;
dissoc.cljs$lang$arity$2 = dissoc__2;
dissoc.cljs$lang$arity$variadic = dissoc__3.cljs$lang$arity$variadic;
return dissoc;
})()
;
/**
* Returns an object of the same type and value as obj, with
* map m as its metadata.
*/
cljs.core.with_meta = (function with_meta(o,meta){
return cljs.core._with_meta.call(null,o,meta);
});
/**
* Returns the metadata of obj, returns nil if there is no metadata.
*/
cljs.core.meta = (function meta(o){
if((function (){var G__6991__6992 = o;
if(G__6991__6992)
{if((function (){var or__3824__auto____6993 = (G__6991__6992.cljs$lang$protocol_mask$partition0$ & 131072);
if(or__3824__auto____6993)
{return or__3824__auto____6993;
} else
{return G__6991__6992.cljs$core$IMeta$;
}
})())
{return true;
} else
{if((!G__6991__6992.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IMeta,G__6991__6992);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IMeta,G__6991__6992);
}
})())
{return cljs.core._meta.call(null,o);
} else
{return null;
}
});
/**
* For a list or queue, same as first, for a vector, same as, but much
* more efficient than, last. If the collection is empty, returns nil.
*/
cljs.core.peek = (function peek(coll){
return cljs.core._peek.call(null,coll);
});
/**
* For a list or queue, returns a new list/queue without the first
* item, for a vector, returns a new vector without the last item.
* Note - not the same as next/butlast.
*/
cljs.core.pop = (function pop(coll){
return cljs.core._pop.call(null,coll);
});
/**
* disj[oin]. Returns a new set of the same (hashed/sorted) type, that
* does not contain key(s).
* @param {...*} var_args
*/
cljs.core.disj = (function() {
var disj = null;
var disj__1 = (function (coll){
return coll;
});
var disj__2 = (function (coll,k){
return cljs.core._disjoin.call(null,coll,k);
});
var disj__3 = (function() { 
var G__6996__delegate = function (coll,k,ks){
while(true){
var ret__6995 = disj.call(null,coll,k);
if(cljs.core.truth_(ks))
{{
var G__6997 = ret__6995;
var G__6998 = cljs.core.first.call(null,ks);
var G__6999 = cljs.core.next.call(null,ks);
coll = G__6997;
k = G__6998;
ks = G__6999;
continue;
}
} else
{return ret__6995;
}
break;
}
};
var G__6996 = function (coll,k,var_args){
var ks = null;
if (goog.isDef(var_args)) {
  ks = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__6996__delegate.call(this, coll, k, ks);
};
G__6996.cljs$lang$maxFixedArity = 2;
G__6996.cljs$lang$applyTo = (function (arglist__7000){
var coll = cljs.core.first(arglist__7000);
var k = cljs.core.first(cljs.core.next(arglist__7000));
var ks = cljs.core.rest(cljs.core.next(arglist__7000));
return G__6996__delegate(coll, k, ks);
});
G__6996.cljs$lang$arity$variadic = G__6996__delegate;
return G__6996;
})()
;
disj = function(coll,k,var_args){
var ks = var_args;
switch(arguments.length){
case 1:
return disj__1.call(this,coll);
case 2:
return disj__2.call(this,coll,k);
default:
return disj__3.cljs$lang$arity$variadic(coll,k, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
disj.cljs$lang$maxFixedArity = 2;
disj.cljs$lang$applyTo = disj__3.cljs$lang$applyTo;
disj.cljs$lang$arity$1 = disj__1;
disj.cljs$lang$arity$2 = disj__2;
disj.cljs$lang$arity$variadic = disj__3.cljs$lang$arity$variadic;
return disj;
})()
;
cljs.core.string_hash_cache = {};
cljs.core.string_hash_cache_count = 0;
cljs.core.add_to_string_hash_cache = (function add_to_string_hash_cache(k){
var h__7002 = goog.string.hashCode(k);
(cljs.core.string_hash_cache[k] = h__7002);
cljs.core.string_hash_cache_count = (cljs.core.string_hash_cache_count + 1);
return h__7002;
});
cljs.core.check_string_hash_cache = (function check_string_hash_cache(k){
if((cljs.core.string_hash_cache_count > 255))
{cljs.core.string_hash_cache = {};
cljs.core.string_hash_cache_count = 0;
} else
{}
var h__7004 = (cljs.core.string_hash_cache[k]);
if(!((h__7004 == null)))
{return h__7004;
} else
{return cljs.core.add_to_string_hash_cache.call(null,k);
}
});
cljs.core.hash = (function() {
var hash = null;
var hash__1 = (function (o){
return hash.call(null,o,true);
});
var hash__2 = (function (o,check_cache){
if((function (){var and__3822__auto____7006 = goog.isString(o);
if(and__3822__auto____7006)
{return check_cache;
} else
{return and__3822__auto____7006;
}
})())
{return cljs.core.check_string_hash_cache.call(null,o);
} else
{return cljs.core._hash.call(null,o);
}
});
hash = function(o,check_cache){
switch(arguments.length){
case 1:
return hash__1.call(this,o);
case 2:
return hash__2.call(this,o,check_cache);
}
throw('Invalid arity: ' + arguments.length);
};
hash.cljs$lang$arity$1 = hash__1;
hash.cljs$lang$arity$2 = hash__2;
return hash;
})()
;
/**
* Returns true if coll has no items - same as (not (seq coll)).
* Please use the idiom (seq x) rather than (not (empty? x))
*/
cljs.core.empty_QMARK_ = (function empty_QMARK_(coll){
return cljs.core.not.call(null,cljs.core.seq.call(null,coll));
});
/**
* Returns true if x satisfies ICollection
*/
cljs.core.coll_QMARK_ = (function coll_QMARK_(x){
if((x == null))
{return false;
} else
{var G__7010__7011 = x;
if(G__7010__7011)
{if((function (){var or__3824__auto____7012 = (G__7010__7011.cljs$lang$protocol_mask$partition0$ & 8);
if(or__3824__auto____7012)
{return or__3824__auto____7012;
} else
{return G__7010__7011.cljs$core$ICollection$;
}
})())
{return true;
} else
{if((!G__7010__7011.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ICollection,G__7010__7011);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ICollection,G__7010__7011);
}
}
});
/**
* Returns true if x satisfies ISet
*/
cljs.core.set_QMARK_ = (function set_QMARK_(x){
if((x == null))
{return false;
} else
{var G__7016__7017 = x;
if(G__7016__7017)
{if((function (){var or__3824__auto____7018 = (G__7016__7017.cljs$lang$protocol_mask$partition0$ & 4096);
if(or__3824__auto____7018)
{return or__3824__auto____7018;
} else
{return G__7016__7017.cljs$core$ISet$;
}
})())
{return true;
} else
{if((!G__7016__7017.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISet,G__7016__7017);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISet,G__7016__7017);
}
}
});
/**
* Returns true if coll implements Associative
*/
cljs.core.associative_QMARK_ = (function associative_QMARK_(x){
var G__7022__7023 = x;
if(G__7022__7023)
{if((function (){var or__3824__auto____7024 = (G__7022__7023.cljs$lang$protocol_mask$partition0$ & 512);
if(or__3824__auto____7024)
{return or__3824__auto____7024;
} else
{return G__7022__7023.cljs$core$IAssociative$;
}
})())
{return true;
} else
{if((!G__7022__7023.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IAssociative,G__7022__7023);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IAssociative,G__7022__7023);
}
});
/**
* Returns true if coll satisfies ISequential
*/
cljs.core.sequential_QMARK_ = (function sequential_QMARK_(x){
var G__7028__7029 = x;
if(G__7028__7029)
{if((function (){var or__3824__auto____7030 = (G__7028__7029.cljs$lang$protocol_mask$partition0$ & 16777216);
if(or__3824__auto____7030)
{return or__3824__auto____7030;
} else
{return G__7028__7029.cljs$core$ISequential$;
}
})())
{return true;
} else
{if((!G__7028__7029.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISequential,G__7028__7029);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISequential,G__7028__7029);
}
});
/**
* Returns true if coll implements count in constant time
*/
cljs.core.counted_QMARK_ = (function counted_QMARK_(x){
var G__7034__7035 = x;
if(G__7034__7035)
{if((function (){var or__3824__auto____7036 = (G__7034__7035.cljs$lang$protocol_mask$partition0$ & 2);
if(or__3824__auto____7036)
{return or__3824__auto____7036;
} else
{return G__7034__7035.cljs$core$ICounted$;
}
})())
{return true;
} else
{if((!G__7034__7035.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ICounted,G__7034__7035);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ICounted,G__7034__7035);
}
});
/**
* Returns true if coll implements nth in constant time
*/
cljs.core.indexed_QMARK_ = (function indexed_QMARK_(x){
var G__7040__7041 = x;
if(G__7040__7041)
{if((function (){var or__3824__auto____7042 = (G__7040__7041.cljs$lang$protocol_mask$partition0$ & 16);
if(or__3824__auto____7042)
{return or__3824__auto____7042;
} else
{return G__7040__7041.cljs$core$IIndexed$;
}
})())
{return true;
} else
{if((!G__7040__7041.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IIndexed,G__7040__7041);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IIndexed,G__7040__7041);
}
});
/**
* Returns true if coll satisfies IReduce
*/
cljs.core.reduceable_QMARK_ = (function reduceable_QMARK_(x){
var G__7046__7047 = x;
if(G__7046__7047)
{if((function (){var or__3824__auto____7048 = (G__7046__7047.cljs$lang$protocol_mask$partition0$ & 524288);
if(or__3824__auto____7048)
{return or__3824__auto____7048;
} else
{return G__7046__7047.cljs$core$IReduce$;
}
})())
{return true;
} else
{if((!G__7046__7047.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IReduce,G__7046__7047);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IReduce,G__7046__7047);
}
});
/**
* Return true if x satisfies IMap
*/
cljs.core.map_QMARK_ = (function map_QMARK_(x){
if((x == null))
{return false;
} else
{var G__7052__7053 = x;
if(G__7052__7053)
{if((function (){var or__3824__auto____7054 = (G__7052__7053.cljs$lang$protocol_mask$partition0$ & 1024);
if(or__3824__auto____7054)
{return or__3824__auto____7054;
} else
{return G__7052__7053.cljs$core$IMap$;
}
})())
{return true;
} else
{if((!G__7052__7053.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IMap,G__7052__7053);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IMap,G__7052__7053);
}
}
});
/**
* Return true if x satisfies IVector
*/
cljs.core.vector_QMARK_ = (function vector_QMARK_(x){
var G__7058__7059 = x;
if(G__7058__7059)
{if((function (){var or__3824__auto____7060 = (G__7058__7059.cljs$lang$protocol_mask$partition0$ & 16384);
if(or__3824__auto____7060)
{return or__3824__auto____7060;
} else
{return G__7058__7059.cljs$core$IVector$;
}
})())
{return true;
} else
{if((!G__7058__7059.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IVector,G__7058__7059);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IVector,G__7058__7059);
}
});
cljs.core.chunked_seq_QMARK_ = (function chunked_seq_QMARK_(x){
var G__7064__7065 = x;
if(G__7064__7065)
{if(cljs.core.truth_((function (){var or__3824__auto____7066 = null;
if(cljs.core.truth_(or__3824__auto____7066))
{return or__3824__auto____7066;
} else
{return G__7064__7065.cljs$core$IChunkedSeq$;
}
})()))
{return true;
} else
{if((!G__7064__7065.cljs$lang$protocol_mask$partition$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IChunkedSeq,G__7064__7065);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IChunkedSeq,G__7064__7065);
}
});
/**
* @param {...*} var_args
*/
cljs.core.js_obj = (function() {
var js_obj = null;
var js_obj__0 = (function (){
return {};
});
var js_obj__1 = (function() { 
var G__7067__delegate = function (keyvals){
return cljs.core.apply.call(null,goog.object.create,keyvals);
};
var G__7067 = function (var_args){
var keyvals = null;
if (goog.isDef(var_args)) {
  keyvals = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__7067__delegate.call(this, keyvals);
};
G__7067.cljs$lang$maxFixedArity = 0;
G__7067.cljs$lang$applyTo = (function (arglist__7068){
var keyvals = cljs.core.seq(arglist__7068);;
return G__7067__delegate(keyvals);
});
G__7067.cljs$lang$arity$variadic = G__7067__delegate;
return G__7067;
})()
;
js_obj = function(var_args){
var keyvals = var_args;
switch(arguments.length){
case 0:
return js_obj__0.call(this);
default:
return js_obj__1.cljs$lang$arity$variadic(cljs.core.array_seq(arguments, 0));
}
throw('Invalid arity: ' + arguments.length);
};
js_obj.cljs$lang$maxFixedArity = 0;
js_obj.cljs$lang$applyTo = js_obj__1.cljs$lang$applyTo;
js_obj.cljs$lang$arity$0 = js_obj__0;
js_obj.cljs$lang$arity$variadic = js_obj__1.cljs$lang$arity$variadic;
return js_obj;
})()
;
cljs.core.js_keys = (function js_keys(obj){
var keys__7070 = [];
goog.object.forEach(obj,(function (val,key,obj){
return keys__7070.push(key);
}));
return keys__7070;
});
cljs.core.js_delete = (function js_delete(obj,key){
return delete obj[key];
});
cljs.core.array_copy = (function array_copy(from,i,to,j,len){
var i__7074 = i;
var j__7075 = j;
var len__7076 = len;
while(true){
if((len__7076 === 0))
{return to;
} else
{(to[j__7075] = (from[i__7074]));
{
var G__7077 = (i__7074 + 1);
var G__7078 = (j__7075 + 1);
var G__7079 = (len__7076 - 1);
i__7074 = G__7077;
j__7075 = G__7078;
len__7076 = G__7079;
continue;
}
}
break;
}
});
cljs.core.array_copy_downward = (function array_copy_downward(from,i,to,j,len){
var i__7083 = (i + (len - 1));
var j__7084 = (j + (len - 1));
var len__7085 = len;
while(true){
if((len__7085 === 0))
{return to;
} else
{(to[j__7084] = (from[i__7083]));
{
var G__7086 = (i__7083 - 1);
var G__7087 = (j__7084 - 1);
var G__7088 = (len__7085 - 1);
i__7083 = G__7086;
j__7084 = G__7087;
len__7085 = G__7088;
continue;
}
}
break;
}
});
cljs.core.lookup_sentinel = {};
/**
* Returns true if x is the value false, false otherwise.
*/
cljs.core.false_QMARK_ = (function false_QMARK_(x){
return x === false;
});
/**
* Returns true if x is the value true, false otherwise.
*/
cljs.core.true_QMARK_ = (function true_QMARK_(x){
return x === true;
});
cljs.core.undefined_QMARK_ = (function undefined_QMARK_(x){
return (void 0 === x);
});
/**
* Return true if s satisfies ISeq
*/
cljs.core.seq_QMARK_ = (function seq_QMARK_(s){
if((s == null))
{return false;
} else
{var G__7092__7093 = s;
if(G__7092__7093)
{if((function (){var or__3824__auto____7094 = (G__7092__7093.cljs$lang$protocol_mask$partition0$ & 64);
if(or__3824__auto____7094)
{return or__3824__auto____7094;
} else
{return G__7092__7093.cljs$core$ISeq$;
}
})())
{return true;
} else
{if((!G__7092__7093.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeq,G__7092__7093);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeq,G__7092__7093);
}
}
});
/**
* Return true if s satisfies ISeqable
*/
cljs.core.seqable_QMARK_ = (function seqable_QMARK_(s){
var G__7098__7099 = s;
if(G__7098__7099)
{if((function (){var or__3824__auto____7100 = (G__7098__7099.cljs$lang$protocol_mask$partition0$ & 8388608);
if(or__3824__auto____7100)
{return or__3824__auto____7100;
} else
{return G__7098__7099.cljs$core$ISeqable$;
}
})())
{return true;
} else
{if((!G__7098__7099.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeqable,G__7098__7099);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeqable,G__7098__7099);
}
});
cljs.core.boolean$ = (function boolean$(x){
if(cljs.core.truth_(x))
{return true;
} else
{return false;
}
});
cljs.core.string_QMARK_ = (function string_QMARK_(x){
var and__3822__auto____7103 = goog.isString(x);
if(and__3822__auto____7103)
{return !((function (){var or__3824__auto____7104 = (x.charAt(0) === "\uFDD0");
if(or__3824__auto____7104)
{return or__3824__auto____7104;
} else
{return (x.charAt(0) === "\uFDD1");
}
})());
} else
{return and__3822__auto____7103;
}
});
cljs.core.keyword_QMARK_ = (function keyword_QMARK_(x){
var and__3822__auto____7106 = goog.isString(x);
if(and__3822__auto____7106)
{return (x.charAt(0) === "\uFDD0");
} else
{return and__3822__auto____7106;
}
});
cljs.core.symbol_QMARK_ = (function symbol_QMARK_(x){
var and__3822__auto____7108 = goog.isString(x);
if(and__3822__auto____7108)
{return (x.charAt(0) === "\uFDD1");
} else
{return and__3822__auto____7108;
}
});
cljs.core.number_QMARK_ = (function number_QMARK_(n){
return goog.isNumber(n);
});
cljs.core.fn_QMARK_ = (function fn_QMARK_(f){
return goog.isFunction(f);
});
cljs.core.ifn_QMARK_ = (function ifn_QMARK_(f){
var or__3824__auto____7113 = cljs.core.fn_QMARK_.call(null,f);
if(or__3824__auto____7113)
{return or__3824__auto____7113;
} else
{var G__7114__7115 = f;
if(G__7114__7115)
{if((function (){var or__3824__auto____7116 = (G__7114__7115.cljs$lang$protocol_mask$partition0$ & 1);
if(or__3824__auto____7116)
{return or__3824__auto____7116;
} else
{return G__7114__7115.cljs$core$IFn$;
}
})())
{return true;
} else
{if((!G__7114__7115.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IFn,G__7114__7115);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IFn,G__7114__7115);
}
}
});
/**
* Returns true if n is an integer.  Warning: returns true on underflow condition.
*/
cljs.core.integer_QMARK_ = (function integer_QMARK_(n){
var and__3822__auto____7118 = cljs.core.number_QMARK_.call(null,n);
if(and__3822__auto____7118)
{return (n == n.toFixed());
} else
{return and__3822__auto____7118;
}
});
/**
* Returns true if key is present in the given collection, otherwise
* returns false.  Note that for numerically indexed collections like
* vectors and arrays, this tests if the numeric key is within the
* range of indexes. 'contains?' operates constant or logarithmic time;
* it will not perform a linear search for a value.  See also 'some'.
*/
cljs.core.contains_QMARK_ = (function contains_QMARK_(coll,v){
if((cljs.core._lookup.call(null,coll,v,cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel))
{return false;
} else
{return true;
}
});
/**
* Returns the map entry for key, or nil if key not present.
*/
cljs.core.find = (function find(coll,k){
if(cljs.core.truth_((function (){var and__3822__auto____7121 = coll;
if(cljs.core.truth_(and__3822__auto____7121))
{var and__3822__auto____7122 = cljs.core.associative_QMARK_.call(null,coll);
if(and__3822__auto____7122)
{return cljs.core.contains_QMARK_.call(null,coll,k);
} else
{return and__3822__auto____7122;
}
} else
{return and__3822__auto____7121;
}
})()))
{return cljs.core.PersistentVector.fromArray([k,cljs.core._lookup.call(null,coll,k)], true);
} else
{return null;
}
});
/**
* Returns true if no two of the arguments are =
* @param {...*} var_args
*/
cljs.core.distinct_QMARK_ = (function() {
var distinct_QMARK_ = null;
var distinct_QMARK___1 = (function (x){
return true;
});
var distinct_QMARK___2 = (function (x,y){
return !(cljs.core._EQ_.call(null,x,y));
});
var distinct_QMARK___3 = (function() { 
var G__7131__delegate = function (x,y,more){
if(!(cljs.core._EQ_.call(null,x,y)))
{var s__7127 = cljs.core.PersistentHashSet.fromArray([y,x]);
var xs__7128 = more;
while(true){
var x__7129 = cljs.core.first.call(null,xs__7128);
var etc__7130 = cljs.core.next.call(null,xs__7128);
if(cljs.core.truth_(xs__7128))
{if(cljs.core.contains_QMARK_.call(null,s__7127,x__7129))
{return false;
} else
{{
var G__7132 = cljs.core.conj.call(null,s__7127,x__7129);
var G__7133 = etc__7130;
s__7127 = G__7132;
xs__7128 = G__7133;
continue;
}
}
} else
{return true;
}
break;
}
} else
{return false;
}
};
var G__7131 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7131__delegate.call(this, x, y, more);
};
G__7131.cljs$lang$maxFixedArity = 2;
G__7131.cljs$lang$applyTo = (function (arglist__7134){
var x = cljs.core.first(arglist__7134);
var y = cljs.core.first(cljs.core.next(arglist__7134));
var more = cljs.core.rest(cljs.core.next(arglist__7134));
return G__7131__delegate(x, y, more);
});
G__7131.cljs$lang$arity$variadic = G__7131__delegate;
return G__7131;
})()
;
distinct_QMARK_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case 1:
return distinct_QMARK___1.call(this,x);
case 2:
return distinct_QMARK___2.call(this,x,y);
default:
return distinct_QMARK___3.cljs$lang$arity$variadic(x,y, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
distinct_QMARK_.cljs$lang$maxFixedArity = 2;
distinct_QMARK_.cljs$lang$applyTo = distinct_QMARK___3.cljs$lang$applyTo;
distinct_QMARK_.cljs$lang$arity$1 = distinct_QMARK___1;
distinct_QMARK_.cljs$lang$arity$2 = distinct_QMARK___2;
distinct_QMARK_.cljs$lang$arity$variadic = distinct_QMARK___3.cljs$lang$arity$variadic;
return distinct_QMARK_;
})()
;
/**
* Comparator. Returns a negative number, zero, or a positive number
* when x is logically 'less than', 'equal to', or 'greater than'
* y. Uses IComparable if available and google.array.defaultCompare for objects
* of the same type and special-cases nil to be less than any other object.
*/
cljs.core.compare = (function compare(x,y){
if((x === y))
{return 0;
} else
{if((x == null))
{return -1;
} else
{if((y == null))
{return 1;
} else
{if((cljs.core.type.call(null,x) === cljs.core.type.call(null,y)))
{if((function (){var G__7138__7139 = x;
if(G__7138__7139)
{if(cljs.core.truth_((function (){var or__3824__auto____7140 = null;
if(cljs.core.truth_(or__3824__auto____7140))
{return or__3824__auto____7140;
} else
{return G__7138__7139.cljs$core$IComparable$;
}
})()))
{return true;
} else
{if((!G__7138__7139.cljs$lang$protocol_mask$partition$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IComparable,G__7138__7139);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IComparable,G__7138__7139);
}
})())
{return cljs.core._compare.call(null,x,y);
} else
{return goog.array.defaultCompare(x,y);
}
} else
{if("\uFDD0'else")
{throw (new Error("compare on non-nil objects of different types"));
} else
{return null;
}
}
}
}
}
});
/**
* Compare indexed collection.
*/
cljs.core.compare_indexed = (function() {
var compare_indexed = null;
var compare_indexed__2 = (function (xs,ys){
var xl__7145 = cljs.core.count.call(null,xs);
var yl__7146 = cljs.core.count.call(null,ys);
if((xl__7145 < yl__7146))
{return -1;
} else
{if((xl__7145 > yl__7146))
{return 1;
} else
{if("\uFDD0'else")
{return compare_indexed.call(null,xs,ys,xl__7145,0);
} else
{return null;
}
}
}
});
var compare_indexed__4 = (function (xs,ys,len,n){
while(true){
var d__7147 = cljs.core.compare.call(null,cljs.core.nth.call(null,xs,n),cljs.core.nth.call(null,ys,n));
if((function (){var and__3822__auto____7148 = (d__7147 === 0);
if(and__3822__auto____7148)
{return ((n + 1) < len);
} else
{return and__3822__auto____7148;
}
})())
{{
var G__7149 = xs;
var G__7150 = ys;
var G__7151 = len;
var G__7152 = (n + 1);
xs = G__7149;
ys = G__7150;
len = G__7151;
n = G__7152;
continue;
}
} else
{return d__7147;
}
break;
}
});
compare_indexed = function(xs,ys,len,n){
switch(arguments.length){
case 2:
return compare_indexed__2.call(this,xs,ys);
case 4:
return compare_indexed__4.call(this,xs,ys,len,n);
}
throw('Invalid arity: ' + arguments.length);
};
compare_indexed.cljs$lang$arity$2 = compare_indexed__2;
compare_indexed.cljs$lang$arity$4 = compare_indexed__4;
return compare_indexed;
})()
;
/**
* Given a fn that might be boolean valued or a comparator,
* return a fn that is a comparator.
*/
cljs.core.fn__GT_comparator = (function fn__GT_comparator(f){
if(cljs.core._EQ_.call(null,f,cljs.core.compare))
{return cljs.core.compare;
} else
{return (function (x,y){
var r__7154 = f.call(null,x,y);
if(cljs.core.number_QMARK_.call(null,r__7154))
{return r__7154;
} else
{if(cljs.core.truth_(r__7154))
{return -1;
} else
{if(cljs.core.truth_(f.call(null,y,x)))
{return 1;
} else
{return 0;
}
}
}
});
}
});
/**
* Returns a sorted sequence of the items in coll. Comp can be
* boolean-valued comparison funcion, or a -/0/+ valued comparator.
* Comp defaults to compare.
*/
cljs.core.sort = (function() {
var sort = null;
var sort__1 = (function (coll){
return sort.call(null,cljs.core.compare,coll);
});
var sort__2 = (function (comp,coll){
if(cljs.core.seq.call(null,coll))
{var a__7156 = cljs.core.to_array.call(null,coll);
goog.array.stableSort(a__7156,cljs.core.fn__GT_comparator.call(null,comp));
return cljs.core.seq.call(null,a__7156);
} else
{return cljs.core.List.EMPTY;
}
});
sort = function(comp,coll){
switch(arguments.length){
case 1:
return sort__1.call(this,comp);
case 2:
return sort__2.call(this,comp,coll);
}
throw('Invalid arity: ' + arguments.length);
};
sort.cljs$lang$arity$1 = sort__1;
sort.cljs$lang$arity$2 = sort__2;
return sort;
})()
;
/**
* Returns a sorted sequence of the items in coll, where the sort
* order is determined by comparing (keyfn item).  Comp can be
* boolean-valued comparison funcion, or a -/0/+ valued comparator.
* Comp defaults to compare.
*/
cljs.core.sort_by = (function() {
var sort_by = null;
var sort_by__2 = (function (keyfn,coll){
return sort_by.call(null,keyfn,cljs.core.compare,coll);
});
var sort_by__3 = (function (keyfn,comp,coll){
return cljs.core.sort.call(null,(function (x,y){
return cljs.core.fn__GT_comparator.call(null,comp).call(null,keyfn.call(null,x),keyfn.call(null,y));
}),coll);
});
sort_by = function(keyfn,comp,coll){
switch(arguments.length){
case 2:
return sort_by__2.call(this,keyfn,comp);
case 3:
return sort_by__3.call(this,keyfn,comp,coll);
}
throw('Invalid arity: ' + arguments.length);
};
sort_by.cljs$lang$arity$2 = sort_by__2;
sort_by.cljs$lang$arity$3 = sort_by__3;
return sort_by;
})()
;
cljs.core.seq_reduce = (function() {
var seq_reduce = null;
var seq_reduce__2 = (function (f,coll){
var temp__3971__auto____7162 = cljs.core.seq.call(null,coll);
if(temp__3971__auto____7162)
{var s__7163 = temp__3971__auto____7162;
return cljs.core.reduce.call(null,f,cljs.core.first.call(null,s__7163),cljs.core.next.call(null,s__7163));
} else
{return f.call(null);
}
});
var seq_reduce__3 = (function (f,val,coll){
var val__7164 = val;
var coll__7165 = cljs.core.seq.call(null,coll);
while(true){
if(coll__7165)
{var nval__7166 = f.call(null,val__7164,cljs.core.first.call(null,coll__7165));
if(cljs.core.reduced_QMARK_.call(null,nval__7166))
{return cljs.core.deref.call(null,nval__7166);
} else
{{
var G__7167 = nval__7166;
var G__7168 = cljs.core.next.call(null,coll__7165);
val__7164 = G__7167;
coll__7165 = G__7168;
continue;
}
}
} else
{return val__7164;
}
break;
}
});
seq_reduce = function(f,val,coll){
switch(arguments.length){
case 2:
return seq_reduce__2.call(this,f,val);
case 3:
return seq_reduce__3.call(this,f,val,coll);
}
throw('Invalid arity: ' + arguments.length);
};
seq_reduce.cljs$lang$arity$2 = seq_reduce__2;
seq_reduce.cljs$lang$arity$3 = seq_reduce__3;
return seq_reduce;
})()
;
/**
* Return a random permutation of coll
*/
cljs.core.shuffle = (function shuffle(coll){
var a__7170 = cljs.core.to_array.call(null,coll);
goog.array.shuffle(a__7170);
return cljs.core.vec.call(null,a__7170);
});
/**
* f should be a function of 2 arguments. If val is not supplied,
* returns the result of applying f to the first 2 items in coll, then
* applying f to that result and the 3rd item, etc. If coll contains no
* items, f must accept no arguments as well, and reduce returns the
* result of calling f with no arguments.  If coll has only 1 item, it
* is returned and f is not called.  If val is supplied, returns the
* result of applying f to val and the first item in coll, then
* applying f to that result and the 2nd item, etc. If coll contains no
* items, returns val and f is not called.
*/
cljs.core.reduce = (function() {
var reduce = null;
var reduce__2 = (function (f,coll){
if((function (){var G__7177__7178 = coll;
if(G__7177__7178)
{if((function (){var or__3824__auto____7179 = (G__7177__7178.cljs$lang$protocol_mask$partition0$ & 524288);
if(or__3824__auto____7179)
{return or__3824__auto____7179;
} else
{return G__7177__7178.cljs$core$IReduce$;
}
})())
{return true;
} else
{if((!G__7177__7178.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IReduce,G__7177__7178);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IReduce,G__7177__7178);
}
})())
{return cljs.core._reduce.call(null,coll,f);
} else
{return cljs.core.seq_reduce.call(null,f,coll);
}
});
var reduce__3 = (function (f,val,coll){
if((function (){var G__7180__7181 = coll;
if(G__7180__7181)
{if((function (){var or__3824__auto____7182 = (G__7180__7181.cljs$lang$protocol_mask$partition0$ & 524288);
if(or__3824__auto____7182)
{return or__3824__auto____7182;
} else
{return G__7180__7181.cljs$core$IReduce$;
}
})())
{return true;
} else
{if((!G__7180__7181.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IReduce,G__7180__7181);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IReduce,G__7180__7181);
}
})())
{return cljs.core._reduce.call(null,coll,f,val);
} else
{return cljs.core.seq_reduce.call(null,f,val,coll);
}
});
reduce = function(f,val,coll){
switch(arguments.length){
case 2:
return reduce__2.call(this,f,val);
case 3:
return reduce__3.call(this,f,val,coll);
}
throw('Invalid arity: ' + arguments.length);
};
reduce.cljs$lang$arity$2 = reduce__2;
reduce.cljs$lang$arity$3 = reduce__3;
return reduce;
})()
;
/**
* Reduces an associative collection. f should be a function of 3
* arguments. Returns the result of applying f to init, the first key
* and the first value in coll, then applying f to that result and the
* 2nd key and value, etc. If coll contains no entries, returns init
* and f is not called. Note that reduce-kv is supported on vectors,
* where the keys will be the ordinals.
*/
cljs.core.reduce_kv = (function reduce_kv(f,init,coll){
return cljs.core._kv_reduce.call(null,coll,f,init);
});

/**
* @constructor
*/
cljs.core.Reduced = (function (val){
this.val = val;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 32768;
})
cljs.core.Reduced.cljs$lang$type = true;
cljs.core.Reduced.cljs$lang$ctorPrSeq = (function (this__2315__auto__){
return cljs.core.list.call(null,"cljs.core/Reduced");
});
cljs.core.Reduced.prototype.cljs$core$IDeref$_deref$arity$1 = (function (o){
var this__7183 = this;
return this__7183.val;
});
cljs.core.Reduced;
/**
* Returns true if x is the result of a call to reduced
*/
cljs.core.reduced_QMARK_ = (function reduced_QMARK_(r){
return cljs.core.instance_QMARK_.call(null,cljs.core.Reduced,r);
});
/**
* Wraps x in a way such that a reduce will terminate with the value x
*/
cljs.core.reduced = (function reduced(x){
return (new cljs.core.Reduced(x));
});
/**
* Returns the sum of nums. (+) returns 0.
* @param {...*} var_args
*/
cljs.core._PLUS_ = (function() {
var _PLUS_ = null;
var _PLUS___0 = (function (){
return 0;
});
var _PLUS___1 = (function (x){
return x;
});
var _PLUS___2 = (function (x,y){
return (x + y);
});
var _PLUS___3 = (function() { 
var G__7184__delegate = function (x,y,more){
return cljs.core.reduce.call(null,_PLUS_,(x + y),more);
};
var G__7184 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7184__delegate.call(this, x, y, more);
};
G__7184.cljs$lang$maxFixedArity = 2;
G__7184.cljs$lang$applyTo = (function (arglist__7185){
var x = cljs.core.first(arglist__7185);
var y = cljs.core.first(cljs.core.next(arglist__7185));
var more = cljs.core.rest(cljs.core.next(arglist__7185));
return G__7184__delegate(x, y, more);
});
G__7184.cljs$lang$arity$variadic = G__7184__delegate;
return G__7184;
})()
;
_PLUS_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case 0:
return _PLUS___0.call(this);
case 1:
return _PLUS___1.call(this,x);
case 2:
return _PLUS___2.call(this,x,y);
default:
return _PLUS___3.cljs$lang$arity$variadic(x,y, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
_PLUS_.cljs$lang$maxFixedArity = 2;
_PLUS_.cljs$lang$applyTo = _PLUS___3.cljs$lang$applyTo;
_PLUS_.cljs$lang$arity$0 = _PLUS___0;
_PLUS_.cljs$lang$arity$1 = _PLUS___1;
_PLUS_.cljs$lang$arity$2 = _PLUS___2;
_PLUS_.cljs$lang$arity$variadic = _PLUS___3.cljs$lang$arity$variadic;
return _PLUS_;
})()
;
/**
* If no ys are supplied, returns the negation of x, else subtracts
* the ys from x and returns the result.
* @param {...*} var_args
*/
cljs.core._ = (function() {
var _ = null;
var ___1 = (function (x){
return (- x);
});
var ___2 = (function (x,y){
return (x - y);
});
var ___3 = (function() { 
var G__7186__delegate = function (x,y,more){
return cljs.core.reduce.call(null,_,(x - y),more);
};
var G__7186 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7186__delegate.call(this, x, y, more);
};
G__7186.cljs$lang$maxFixedArity = 2;
G__7186.cljs$lang$applyTo = (function (arglist__7187){
var x = cljs.core.first(arglist__7187);
var y = cljs.core.first(cljs.core.next(arglist__7187));
var more = cljs.core.rest(cljs.core.next(arglist__7187));
return G__7186__delegate(x, y, more);
});
G__7186.cljs$lang$arity$variadic = G__7186__delegate;
return G__7186;
})()
;
_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case 1:
return ___1.call(this,x);
case 2:
return ___2.call(this,x,y);
default:
return ___3.cljs$lang$arity$variadic(x,y, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
_.cljs$lang$maxFixedArity = 2;
_.cljs$lang$applyTo = ___3.cljs$lang$applyTo;
_.cljs$lang$arity$1 = ___1;
_.cljs$lang$arity$2 = ___2;
_.cljs$lang$arity$variadic = ___3.cljs$lang$arity$variadic;
return _;
})()
;
/**
* Returns the product of nums. (*) returns 1.
* @param {...*} var_args
*/
cljs.core._STAR_ = (function() {
var _STAR_ = null;
var _STAR___0 = (function (){
return 1;
});
var _STAR___1 = (function (x){
return x;
});
var _STAR___2 = (function (x,y){
return (x * y);
});
var _STAR___3 = (function() { 
var G__7188__delegate = function (x,y,more){
return cljs.core.reduce.call(null,_STAR_,(x * y),more);
};
var G__7188 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7188__delegate.call(this, x, y, more);
};
G__7188.cljs$lang$maxFixedArity = 2;
G__7188.cljs$lang$applyTo = (function (arglist__7189){
var x = cljs.core.first(arglist__7189);
var y = cljs.core.first(cljs.core.next(arglist__7189));
var more = cljs.core.rest(cljs.core.next(arglist__7189));
return G__7188__delegate(x, y, more);
});
G__7188.cljs$lang$arity$variadic = G__7188__delegate;
return G__7188;
})()
;
_STAR_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case 0:
return _STAR___0.call(this);
case 1:
return _STAR___1.call(this,x);
case 2:
return _STAR___2.call(this,x,y);
default:
return _STAR___3.cljs$lang$arity$variadic(x,y, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
_STAR_.cljs$lang$maxFixedArity = 2;
_STAR_.cljs$lang$applyTo = _STAR___3.cljs$lang$applyTo;
_STAR_.cljs$lang$arity$0 = _STAR___0;
_STAR_.cljs$lang$arity$1 = _STAR___1;
_STAR_.cljs$lang$arity$2 = _STAR___2;
_STAR_.cljs$lang$arity$variadic = _STAR___3.cljs$lang$arity$variadic;
return _STAR_;
})()
;
/**
* If no denominators are supplied, returns 1/numerator,
* else returns numerator divided by all of the denominators.
* @param {...*} var_args
*/
cljs.core._SLASH_ = (function() {
var _SLASH_ = null;
var _SLASH___1 = (function (x){
return _SLASH_.call(null,1,x);
});
var _SLASH___2 = (function (x,y){
return (x / y);
});
var _SLASH___3 = (function() { 
var G__7190__delegate = function (x,y,more){
return cljs.core.reduce.call(null,_SLASH_,_SLASH_.call(null,x,y),more);
};
var G__7190 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7190__delegate.call(this, x, y, more);
};
G__7190.cljs$lang$maxFixedArity = 2;
G__7190.cljs$lang$applyTo = (function (arglist__7191){
var x = cljs.core.first(arglist__7191);
var y = cljs.core.first(cljs.core.next(arglist__7191));
var more = cljs.core.rest(cljs.core.next(arglist__7191));
return G__7190__delegate(x, y, more);
});
G__7190.cljs$lang$arity$variadic = G__7190__delegate;
return G__7190;
})()
;
_SLASH_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case 1:
return _SLASH___1.call(this,x);
case 2:
return _SLASH___2.call(this,x,y);
default:
return _SLASH___3.cljs$lang$arity$variadic(x,y, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
_SLASH_.cljs$lang$maxFixedArity = 2;
_SLASH_.cljs$lang$applyTo = _SLASH___3.cljs$lang$applyTo;
_SLASH_.cljs$lang$arity$1 = _SLASH___1;
_SLASH_.cljs$lang$arity$2 = _SLASH___2;
_SLASH_.cljs$lang$arity$variadic = _SLASH___3.cljs$lang$arity$variadic;
return _SLASH_;
})()
;
/**
* Returns non-nil if nums are in monotonically increasing order,
* otherwise false.
* @param {...*} var_args
*/
cljs.core._LT_ = (function() {
var _LT_ = null;
var _LT___1 = (function (x){
return true;
});
var _LT___2 = (function (x,y){
return (x < y);
});
var _LT___3 = (function() { 
var G__7192__delegate = function (x,y,more){
while(true){
if((x < y))
{if(cljs.core.next.call(null,more))
{{
var G__7193 = y;
var G__7194 = cljs.core.first.call(null,more);
var G__7195 = cljs.core.next.call(null,more);
x = G__7193;
y = G__7194;
more = G__7195;
continue;
}
} else
{return (y < cljs.core.first.call(null,more));
}
} else
{return false;
}
break;
}
};
var G__7192 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7192__delegate.call(this, x, y, more);
};
G__7192.cljs$lang$maxFixedArity = 2;
G__7192.cljs$lang$applyTo = (function (arglist__7196){
var x = cljs.core.first(arglist__7196);
var y = cljs.core.first(cljs.core.next(arglist__7196));
var more = cljs.core.rest(cljs.core.next(arglist__7196));
return G__7192__delegate(x, y, more);
});
G__7192.cljs$lang$arity$variadic = G__7192__delegate;
return G__7192;
})()
;
_LT_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case 1:
return _LT___1.call(this,x);
case 2:
return _LT___2.call(this,x,y);
default:
return _LT___3.cljs$lang$arity$variadic(x,y, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
_LT_.cljs$lang$maxFixedArity = 2;
_LT_.cljs$lang$applyTo = _LT___3.cljs$lang$applyTo;
_LT_.cljs$lang$arity$1 = _LT___1;
_LT_.cljs$lang$arity$2 = _LT___2;
_LT_.cljs$lang$arity$variadic = _LT___3.cljs$lang$arity$variadic;
return _LT_;
})()
;
/**
* Returns non-nil if nums are in monotonically non-decreasing order,
* otherwise false.
* @param {...*} var_args
*/
cljs.core._LT__EQ_ = (function() {
var _LT__EQ_ = null;
var _LT__EQ___1 = (function (x){
return true;
});
var _LT__EQ___2 = (function (x,y){
return (x <= y);
});
var _LT__EQ___3 = (function() { 
var G__7197__delegate = function (x,y,more){
while(true){
if((x <= y))
{if(cljs.core.next.call(null,more))
{{
var G__7198 = y;
var G__7199 = cljs.core.first.call(null,more);
var G__7200 = cljs.core.next.call(null,more);
x = G__7198;
y = G__7199;
more = G__7200;
continue;
}
} else
{return (y <= cljs.core.first.call(null,more));
}
} else
{return false;
}
break;
}
};
var G__7197 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7197__delegate.call(this, x, y, more);
};
G__7197.cljs$lang$maxFixedArity = 2;
G__7197.cljs$lang$applyTo = (function (arglist__7201){
var x = cljs.core.first(arglist__7201);
var y = cljs.core.first(cljs.core.next(arglist__7201));
var more = cljs.core.rest(cljs.core.next(arglist__7201));
return G__7197__delegate(x, y, more);
});
G__7197.cljs$lang$arity$variadic = G__7197__delegate;
return G__7197;
})()
;
_LT__EQ_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case 1:
return _LT__EQ___1.call(this,x);
case 2:
return _LT__EQ___2.call(this,x,y);
default:
return _LT__EQ___3.cljs$lang$arity$variadic(x,y, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
_LT__EQ_.cljs$lang$maxFixedArity = 2;
_LT__EQ_.cljs$lang$applyTo = _LT__EQ___3.cljs$lang$applyTo;
_LT__EQ_.cljs$lang$arity$1 = _LT__EQ___1;
_LT__EQ_.cljs$lang$arity$2 = _LT__EQ___2;
_LT__EQ_.cljs$lang$arity$variadic = _LT__EQ___3.cljs$lang$arity$variadic;
return _LT__EQ_;
})()
;
/**
* Returns non-nil if nums are in monotonically decreasing order,
* otherwise false.
* @param {...*} var_args
*/
cljs.core._GT_ = (function() {
var _GT_ = null;
var _GT___1 = (function (x){
return true;
});
var _GT___2 = (function (x,y){
return (x > y);
});
var _GT___3 = (function() { 
var G__7202__delegate = function (x,y,more){
while(true){
if((x > y))
{if(cljs.core.next.call(null,more))
{{
var G__7203 = y;
var G__7204 = cljs.core.first.call(null,more);
var G__7205 = cljs.core.next.call(null,more);
x = G__7203;
y = G__7204;
more = G__7205;
continue;
}
} else
{return (y > cljs.core.first.call(null,more));
}
} else
{return false;
}
break;
}
};
var G__7202 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7202__delegate.call(this, x, y, more);
};
G__7202.cljs$lang$maxFixedArity = 2;
G__7202.cljs$lang$applyTo = (function (arglist__7206){
var x = cljs.core.first(arglist__7206);
var y = cljs.core.first(cljs.core.next(arglist__7206));
var more = cljs.core.rest(cljs.core.next(arglist__7206));
return G__7202__delegate(x, y, more);
});
G__7202.cljs$lang$arity$variadic = G__7202__delegate;
return G__7202;
})()
;
_GT_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case 1:
return _GT___1.call(this,x);
case 2:
return _GT___2.call(this,x,y);
default:
return _GT___3.cljs$lang$arity$variadic(x,y, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
_GT_.cljs$lang$maxFixedArity = 2;
_GT_.cljs$lang$applyTo = _GT___3.cljs$lang$applyTo;
_GT_.cljs$lang$arity$1 = _GT___1;
_GT_.cljs$lang$arity$2 = _GT___2;
_GT_.cljs$lang$arity$variadic = _GT___3.cljs$lang$arity$variadic;
return _GT_;
})()
;
/**
* Returns non-nil if nums are in monotonically non-increasing order,
* otherwise false.
* @param {...*} var_args
*/
cljs.core._GT__EQ_ = (function() {
var _GT__EQ_ = null;
var _GT__EQ___1 = (function (x){
return true;
});
var _GT__EQ___2 = (function (x,y){
return (x >= y);
});
var _GT__EQ___3 = (function() { 
var G__7207__delegate = function (x,y,more){
while(true){
if((x >= y))
{if(cljs.core.next.call(null,more))
{{
var G__7208 = y;
var G__7209 = cljs.core.first.call(null,more);
var G__7210 = cljs.core.next.call(null,more);
x = G__7208;
y = G__7209;
more = G__7210;
continue;
}
} else
{return (y >= cljs.core.first.call(null,more));
}
} else
{return false;
}
break;
}
};
var G__7207 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7207__delegate.call(this, x, y, more);
};
G__7207.cljs$lang$maxFixedArity = 2;
G__7207.cljs$lang$applyTo = (function (arglist__7211){
var x = cljs.core.first(arglist__7211);
var y = cljs.core.first(cljs.core.next(arglist__7211));
var more = cljs.core.rest(cljs.core.next(arglist__7211));
return G__7207__delegate(x, y, more);
});
G__7207.cljs$lang$arity$variadic = G__7207__delegate;
return G__7207;
})()
;
_GT__EQ_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case 1:
return _GT__EQ___1.call(this,x);
case 2:
return _GT__EQ___2.call(this,x,y);
default:
return _GT__EQ___3.cljs$lang$arity$variadic(x,y, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
_GT__EQ_.cljs$lang$maxFixedArity = 2;
_GT__EQ_.cljs$lang$applyTo = _GT__EQ___3.cljs$lang$applyTo;
_GT__EQ_.cljs$lang$arity$1 = _GT__EQ___1;
_GT__EQ_.cljs$lang$arity$2 = _GT__EQ___2;
_GT__EQ_.cljs$lang$arity$variadic = _GT__EQ___3.cljs$lang$arity$variadic;
return _GT__EQ_;
})()
;
/**
* Returns a number one less than num.
*/
cljs.core.dec = (function dec(x){
return (x - 1);
});
/**
* Returns the greatest of the nums.
* @param {...*} var_args
*/
cljs.core.max = (function() {
var max = null;
var max__1 = (function (x){
return x;
});
var max__2 = (function (x,y){
return ((x > y) ? x : y);
});
var max__3 = (function() { 
var G__7212__delegate = function (x,y,more){
return cljs.core.reduce.call(null,max,((x > y) ? x : y),more);
};
var G__7212 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7212__delegate.call(this, x, y, more);
};
G__7212.cljs$lang$maxFixedArity = 2;
G__7212.cljs$lang$applyTo = (function (arglist__7213){
var x = cljs.core.first(arglist__7213);
var y = cljs.core.first(cljs.core.next(arglist__7213));
var more = cljs.core.rest(cljs.core.next(arglist__7213));
return G__7212__delegate(x, y, more);
});
G__7212.cljs$lang$arity$variadic = G__7212__delegate;
return G__7212;
})()
;
max = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case 1:
return max__1.call(this,x);
case 2:
return max__2.call(this,x,y);
default:
return max__3.cljs$lang$arity$variadic(x,y, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
max.cljs$lang$maxFixedArity = 2;
max.cljs$lang$applyTo = max__3.cljs$lang$applyTo;
max.cljs$lang$arity$1 = max__1;
max.cljs$lang$arity$2 = max__2;
max.cljs$lang$arity$variadic = max__3.cljs$lang$arity$variadic;
return max;
})()
;
/**
* Returns the least of the nums.
* @param {...*} var_args
*/
cljs.core.min = (function() {
var min = null;
var min__1 = (function (x){
return x;
});
var min__2 = (function (x,y){
return ((x < y) ? x : y);
});
var min__3 = (function() { 
var G__7214__delegate = function (x,y,more){
return cljs.core.reduce.call(null,min,((x < y) ? x : y),more);
};
var G__7214 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7214__delegate.call(this, x, y, more);
};
G__7214.cljs$lang$maxFixedArity = 2;
G__7214.cljs$lang$applyTo = (function (arglist__7215){
var x = cljs.core.first(arglist__7215);
var y = cljs.core.first(cljs.core.next(arglist__7215));
var more = cljs.core.rest(cljs.core.next(arglist__7215));
return G__7214__delegate(x, y, more);
});
G__7214.cljs$lang$arity$variadic = G__7214__delegate;
return G__7214;
})()
;
min = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case 1:
return min__1.call(this,x);
case 2:
return min__2.call(this,x,y);
default:
return min__3.cljs$lang$arity$variadic(x,y, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
min.cljs$lang$maxFixedArity = 2;
min.cljs$lang$applyTo = min__3.cljs$lang$applyTo;
min.cljs$lang$arity$1 = min__1;
min.cljs$lang$arity$2 = min__2;
min.cljs$lang$arity$variadic = min__3.cljs$lang$arity$variadic;
return min;
})()
;
cljs.core.fix = (function fix(q){
if((q >= 0))
{return Math.floor.call(null,q);
} else
{return Math.ceil.call(null,q);
}
});
/**
* Coerce to int by stripping decimal places.
*/
cljs.core.int$ = (function int$(x){
return cljs.core.fix.call(null,x);
});
/**
* Coerce to long by stripping decimal places. Identical to `int'.
*/
cljs.core.long$ = (function long$(x){
return cljs.core.fix.call(null,x);
});
/**
* Modulus of num and div. Truncates toward negative infinity.
*/
cljs.core.mod = (function mod(n,d){
return (n % d);
});
/**
* quot[ient] of dividing numerator by denominator.
*/
cljs.core.quot = (function quot(n,d){
var rem__7217 = (n % d);
return cljs.core.fix.call(null,((n - rem__7217) / d));
});
/**
* remainder of dividing numerator by denominator.
*/
cljs.core.rem = (function rem(n,d){
var q__7219 = cljs.core.quot.call(null,n,d);
return (n - (d * q__7219));
});
/**
* Returns a random floating point number between 0 (inclusive) and n (default 1) (exclusive).
*/
cljs.core.rand = (function() {
var rand = null;
var rand__0 = (function (){
return Math.random.call(null);
});
var rand__1 = (function (n){
return (n * rand.call(null));
});
rand = function(n){
switch(arguments.length){
case 0:
return rand__0.call(this);
case 1:
return rand__1.call(this,n);
}
throw('Invalid arity: ' + arguments.length);
};
rand.cljs$lang$arity$0 = rand__0;
rand.cljs$lang$arity$1 = rand__1;
return rand;
})()
;
/**
* Returns a random integer between 0 (inclusive) and n (exclusive).
*/
cljs.core.rand_int = (function rand_int(n){
return cljs.core.fix.call(null,cljs.core.rand.call(null,n));
});
/**
* Bitwise exclusive or
*/
cljs.core.bit_xor = (function bit_xor(x,y){
return (x ^ y);
});
/**
* Bitwise and
*/
cljs.core.bit_and = (function bit_and(x,y){
return (x & y);
});
/**
* Bitwise or
*/
cljs.core.bit_or = (function bit_or(x,y){
return (x | y);
});
/**
* Bitwise and
*/
cljs.core.bit_and_not = (function bit_and_not(x,y){
return (x & ~y);
});
/**
* Clear bit at index n
*/
cljs.core.bit_clear = (function bit_clear(x,n){
return (x & ~(1 << n));
});
/**
* Flip bit at index n
*/
cljs.core.bit_flip = (function bit_flip(x,n){
return (x ^ (1 << n));
});
/**
* Bitwise complement
*/
cljs.core.bit_not = (function bit_not(x){
return (~ x);
});
/**
* Set bit at index n
*/
cljs.core.bit_set = (function bit_set(x,n){
return (x | (1 << n));
});
/**
* Test bit at index n
*/
cljs.core.bit_test = (function bit_test(x,n){
return ((x & (1 << n)) != 0);
});
/**
* Bitwise shift left
*/
cljs.core.bit_shift_left = (function bit_shift_left(x,n){
return (x << n);
});
/**
* Bitwise shift right
*/
cljs.core.bit_shift_right = (function bit_shift_right(x,n){
return (x >> n);
});
/**
* Bitwise shift right with zero fill
*/
cljs.core.bit_shift_right_zero_fill = (function bit_shift_right_zero_fill(x,n){
return (x >>> n);
});
/**
* Counts the number of bits set in n
*/
cljs.core.bit_count = (function bit_count(v){
var v__7222 = (v - ((v >> 1) & 1431655765));
var v__7223 = ((v__7222 & 858993459) + ((v__7222 >> 2) & 858993459));
return ((((v__7223 + (v__7223 >> 4)) & 252645135) * 16843009) >> 24);
});
/**
* Returns non-nil if nums all have the equivalent
* value, otherwise false. Behavior on non nums is
* undefined.
* @param {...*} var_args
*/
cljs.core._EQ__EQ_ = (function() {
var _EQ__EQ_ = null;
var _EQ__EQ___1 = (function (x){
return true;
});
var _EQ__EQ___2 = (function (x,y){
return cljs.core._equiv.call(null,x,y);
});
var _EQ__EQ___3 = (function() { 
var G__7224__delegate = function (x,y,more){
while(true){
if(cljs.core.truth_(_EQ__EQ_.call(null,x,y)))
{if(cljs.core.next.call(null,more))
{{
var G__7225 = y;
var G__7226 = cljs.core.first.call(null,more);
var G__7227 = cljs.core.next.call(null,more);
x = G__7225;
y = G__7226;
more = G__7227;
continue;
}
} else
{return _EQ__EQ_.call(null,y,cljs.core.first.call(null,more));
}
} else
{return false;
}
break;
}
};
var G__7224 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7224__delegate.call(this, x, y, more);
};
G__7224.cljs$lang$maxFixedArity = 2;
G__7224.cljs$lang$applyTo = (function (arglist__7228){
var x = cljs.core.first(arglist__7228);
var y = cljs.core.first(cljs.core.next(arglist__7228));
var more = cljs.core.rest(cljs.core.next(arglist__7228));
return G__7224__delegate(x, y, more);
});
G__7224.cljs$lang$arity$variadic = G__7224__delegate;
return G__7224;
})()
;
_EQ__EQ_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case 1:
return _EQ__EQ___1.call(this,x);
case 2:
return _EQ__EQ___2.call(this,x,y);
default:
return _EQ__EQ___3.cljs$lang$arity$variadic(x,y, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
_EQ__EQ_.cljs$lang$maxFixedArity = 2;
_EQ__EQ_.cljs$lang$applyTo = _EQ__EQ___3.cljs$lang$applyTo;
_EQ__EQ_.cljs$lang$arity$1 = _EQ__EQ___1;
_EQ__EQ_.cljs$lang$arity$2 = _EQ__EQ___2;
_EQ__EQ_.cljs$lang$arity$variadic = _EQ__EQ___3.cljs$lang$arity$variadic;
return _EQ__EQ_;
})()
;
/**
* Returns true if num is greater than zero, else false
*/
cljs.core.pos_QMARK_ = (function pos_QMARK_(n){
return (n > 0);
});
cljs.core.zero_QMARK_ = (function zero_QMARK_(n){
return (n === 0);
});
/**
* Returns true if num is less than zero, else false
*/
cljs.core.neg_QMARK_ = (function neg_QMARK_(x){
return (x < 0);
});
/**
* Returns the nth next of coll, (seq coll) when n is 0.
*/
cljs.core.nthnext = (function nthnext(coll,n){
var n__7232 = n;
var xs__7233 = cljs.core.seq.call(null,coll);
while(true){
if(cljs.core.truth_((function (){var and__3822__auto____7234 = xs__7233;
if(and__3822__auto____7234)
{return (n__7232 > 0);
} else
{return and__3822__auto____7234;
}
})()))
{{
var G__7235 = (n__7232 - 1);
var G__7236 = cljs.core.next.call(null,xs__7233);
n__7232 = G__7235;
xs__7233 = G__7236;
continue;
}
} else
{return xs__7233;
}
break;
}
});
/**
* Internal - do not use!
* @param {...*} var_args
*/
cljs.core.str_STAR_ = (function() {
var str_STAR_ = null;
var str_STAR___0 = (function (){
return "";
});
var str_STAR___1 = (function (x){
if((x == null))
{return "";
} else
{if("\uFDD0'else")
{return x.toString();
} else
{return null;
}
}
});
var str_STAR___2 = (function() { 
var G__7237__delegate = function (x,ys){
return (function (sb,more){
while(true){
if(cljs.core.truth_(more))
{{
var G__7238 = sb.append(str_STAR_.call(null,cljs.core.first.call(null,more)));
var G__7239 = cljs.core.next.call(null,more);
sb = G__7238;
more = G__7239;
continue;
}
} else
{return str_STAR_.call(null,sb);
}
break;
}
}).call(null,(new goog.string.StringBuffer(str_STAR_.call(null,x))),ys);
};
var G__7237 = function (x,var_args){
var ys = null;
if (goog.isDef(var_args)) {
  ys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return G__7237__delegate.call(this, x, ys);
};
G__7237.cljs$lang$maxFixedArity = 1;
G__7237.cljs$lang$applyTo = (function (arglist__7240){
var x = cljs.core.first(arglist__7240);
var ys = cljs.core.rest(arglist__7240);
return G__7237__delegate(x, ys);
});
G__7237.cljs$lang$arity$variadic = G__7237__delegate;
return G__7237;
})()
;
str_STAR_ = function(x,var_args){
var ys = var_args;
switch(arguments.length){
case 0:
return str_STAR___0.call(this);
case 1:
return str_STAR___1.call(this,x);
default:
return str_STAR___2.cljs$lang$arity$variadic(x, cljs.core.array_seq(arguments, 1));
}
throw('Invalid arity: ' + arguments.length);
};
str_STAR_.cljs$lang$maxFixedArity = 1;
str_STAR_.cljs$lang$applyTo = str_STAR___2.cljs$lang$applyTo;
str_STAR_.cljs$lang$arity$0 = str_STAR___0;
str_STAR_.cljs$lang$arity$1 = str_STAR___1;
str_STAR_.cljs$lang$arity$variadic = str_STAR___2.cljs$lang$arity$variadic;
return str_STAR_;
})()
;
/**
* With no args, returns the empty string. With one arg x, returns
* x.toString().  (str nil) returns the empty string. With more than
* one arg, returns the concatenation of the str values of the args.
* @param {...*} var_args
*/
cljs.core.str = (function() {
var str = null;
var str__0 = (function (){
return "";
});
var str__1 = (function (x){
if(cljs.core.symbol_QMARK_.call(null,x))
{return x.substring(2,x.length);
} else
{if(cljs.core.keyword_QMARK_.call(null,x))
{return cljs.core.str_STAR_.call(null,":",x.substring(2,x.length));
} else
{if((x == null))
{return "";
} else
{if("\uFDD0'else")
{return x.toString();
} else
{return null;
}
}
}
}
});
var str__2 = (function() { 
var G__7241__delegate = function (x,ys){
return (function (sb,more){
while(true){
if(cljs.core.truth_(more))
{{
var G__7242 = sb.append(str.call(null,cljs.core.first.call(null,more)));
var G__7243 = cljs.core.next.call(null,more);
sb = G__7242;
more = G__7243;
continue;
}
} else
{return cljs.core.str_STAR_.call(null,sb);
}
break;
}
}).call(null,(new goog.string.StringBuffer(str.call(null,x))),ys);
};
var G__7241 = function (x,var_args){
var ys = null;
if (goog.isDef(var_args)) {
  ys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return G__7241__delegate.call(this, x, ys);
};
G__7241.cljs$lang$maxFixedArity = 1;
G__7241.cljs$lang$applyTo = (function (arglist__7244){
var x = cljs.core.first(arglist__7244);
var ys = cljs.core.rest(arglist__7244);
return G__7241__delegate(x, ys);
});
G__7241.cljs$lang$arity$variadic = G__7241__delegate;
return G__7241;
})()
;
str = function(x,var_args){
var ys = var_args;
switch(arguments.length){
case 0:
return str__0.call(this);
case 1:
return str__1.call(this,x);
default:
return str__2.cljs$lang$arity$variadic(x, cljs.core.array_seq(arguments, 1));
}
throw('Invalid arity: ' + arguments.length);
};
str.cljs$lang$maxFixedArity = 1;
str.cljs$lang$applyTo = str__2.cljs$lang$applyTo;
str.cljs$lang$arity$0 = str__0;
str.cljs$lang$arity$1 = str__1;
str.cljs$lang$arity$variadic = str__2.cljs$lang$arity$variadic;
return str;
})()
;
/**
* Returns the substring of s beginning at start inclusive, and ending
* at end (defaults to length of string), exclusive.
*/
cljs.core.subs = (function() {
var subs = null;
var subs__2 = (function (s,start){
return s.substring(start);
});
var subs__3 = (function (s,start,end){
return s.substring(start,end);
});
subs = function(s,start,end){
switch(arguments.length){
case 2:
return subs__2.call(this,s,start);
case 3:
return subs__3.call(this,s,start,end);
}
throw('Invalid arity: ' + arguments.length);
};
subs.cljs$lang$arity$2 = subs__2;
subs.cljs$lang$arity$3 = subs__3;
return subs;
})()
;
/**
* Formats a string using goog.string.format.
* @param {...*} var_args
*/
cljs.core.format = (function() { 
var format__delegate = function (fmt,args){
return cljs.core.apply.call(null,goog.string.format,fmt,args);
};
var format = function (fmt,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return format__delegate.call(this, fmt, args);
};
format.cljs$lang$maxFixedArity = 1;
format.cljs$lang$applyTo = (function (arglist__7245){
var fmt = cljs.core.first(arglist__7245);
var args = cljs.core.rest(arglist__7245);
return format__delegate(fmt, args);
});
format.cljs$lang$arity$variadic = format__delegate;
return format;
})()
;
/**
* Returns a Symbol with the given namespace and name.
*/
cljs.core.symbol = (function() {
var symbol = null;
var symbol__1 = (function (name){
if(cljs.core.symbol_QMARK_.call(null,name))
{name;
} else
{if(cljs.core.keyword_QMARK_.call(null,name))
{cljs.core.str_STAR_.call(null,"\uFDD1","'",cljs.core.subs.call(null,name,2));
} else
{}
}
return cljs.core.str_STAR_.call(null,"\uFDD1","'",name);
});
var symbol__2 = (function (ns,name){
return symbol.call(null,cljs.core.str_STAR_.call(null,ns,"/",name));
});
symbol = function(ns,name){
switch(arguments.length){
case 1:
return symbol__1.call(this,ns);
case 2:
return symbol__2.call(this,ns,name);
}
throw('Invalid arity: ' + arguments.length);
};
symbol.cljs$lang$arity$1 = symbol__1;
symbol.cljs$lang$arity$2 = symbol__2;
return symbol;
})()
;
/**
* Returns a Keyword with the given namespace and name.  Do not use :
* in the keyword strings, it will be added automatically.
*/
cljs.core.keyword = (function() {
var keyword = null;
var keyword__1 = (function (name){
if(cljs.core.keyword_QMARK_.call(null,name))
{return name;
} else
{if(cljs.core.symbol_QMARK_.call(null,name))
{return cljs.core.str_STAR_.call(null,"\uFDD0","'",cljs.core.subs.call(null,name,2));
} else
{if("\uFDD0'else")
{return cljs.core.str_STAR_.call(null,"\uFDD0","'",name);
} else
{return null;
}
}
}
});
var keyword__2 = (function (ns,name){
return keyword.call(null,cljs.core.str_STAR_.call(null,ns,"/",name));
});
keyword = function(ns,name){
switch(arguments.length){
case 1:
return keyword__1.call(this,ns);
case 2:
return keyword__2.call(this,ns,name);
}
throw('Invalid arity: ' + arguments.length);
};
keyword.cljs$lang$arity$1 = keyword__1;
keyword.cljs$lang$arity$2 = keyword__2;
return keyword;
})()
;
/**
* Assumes x is sequential. Returns true if x equals y, otherwise
* returns false.
*/
cljs.core.equiv_sequential = (function equiv_sequential(x,y){
return cljs.core.boolean$.call(null,((cljs.core.sequential_QMARK_.call(null,y))?(function (){var xs__7248 = cljs.core.seq.call(null,x);
var ys__7249 = cljs.core.seq.call(null,y);
while(true){
if((xs__7248 == null))
{return (ys__7249 == null);
} else
{if((ys__7249 == null))
{return false;
} else
{if(cljs.core._EQ_.call(null,cljs.core.first.call(null,xs__7248),cljs.core.first.call(null,ys__7249)))
{{
var G__7250 = cljs.core.next.call(null,xs__7248);
var G__7251 = cljs.core.next.call(null,ys__7249);
xs__7248 = G__7250;
ys__7249 = G__7251;
continue;
}
} else
{if("\uFDD0'else")
{return false;
} else
{return null;
}
}
}
}
break;
}
})():null));
});
cljs.core.hash_combine = (function hash_combine(seed,hash){
return (seed ^ (((hash + 2654435769) + (seed << 6)) + (seed >> 2)));
});
cljs.core.hash_coll = (function hash_coll(coll){
return cljs.core.reduce.call(null,(function (p1__7252_SHARP_,p2__7253_SHARP_){
return cljs.core.hash_combine.call(null,p1__7252_SHARP_,cljs.core.hash.call(null,p2__7253_SHARP_,false));
}),cljs.core.hash.call(null,cljs.core.first.call(null,coll),false),cljs.core.next.call(null,coll));
});
cljs.core.hash_imap = (function hash_imap(m){
var h__7257 = 0;
var s__7258 = cljs.core.seq.call(null,m);
while(true){
if(s__7258)
{var e__7259 = cljs.core.first.call(null,s__7258);
{
var G__7260 = ((h__7257 + (cljs.core.hash.call(null,cljs.core.key.call(null,e__7259)) ^ cljs.core.hash.call(null,cljs.core.val.call(null,e__7259)))) % 4503599627370496);
var G__7261 = cljs.core.next.call(null,s__7258);
h__7257 = G__7260;
s__7258 = G__7261;
continue;
}
} else
{return h__7257;
}
break;
}
});
cljs.core.hash_iset = (function hash_iset(s){
var h__7265 = 0;
var s__7266 = cljs.core.seq.call(null,s);
while(true){
if(s__7266)
{var e__7267 = cljs.core.first.call(null,s__7266);
{
var G__7268 = ((h__7265 + cljs.core.hash.call(null,e__7267)) % 4503599627370496);
var G__7269 = cljs.core.next.call(null,s__7266);
h__7265 = G__7268;
s__7266 = G__7269;
continue;
}
} else
{return h__7265;
}
break;
}
});
/**
* Takes a JavaScript object and a map of names to functions and
* attaches said functions as methods on the object.  Any references to
* JavaScript's implict this (via the this-as macro) will resolve to the
* object that the function is attached.
*/
cljs.core.extend_object_BANG_ = (function extend_object_BANG_(obj,fn_map){
var G__7290__7291 = cljs.core.seq.call(null,fn_map);
if(G__7290__7291)
{var G__7293__7295 = cljs.core.first.call(null,G__7290__7291);
var vec__7294__7296 = G__7293__7295;
var key_name__7297 = cljs.core.nth.call(null,vec__7294__7296,0,null);
var f__7298 = cljs.core.nth.call(null,vec__7294__7296,1,null);
var G__7290__7299 = G__7290__7291;
var G__7293__7300 = G__7293__7295;
var G__7290__7301 = G__7290__7299;
while(true){
var vec__7302__7303 = G__7293__7300;
var key_name__7304 = cljs.core.nth.call(null,vec__7302__7303,0,null);
var f__7305 = cljs.core.nth.call(null,vec__7302__7303,1,null);
var G__7290__7306 = G__7290__7301;
var str_name__7307 = cljs.core.name.call(null,key_name__7304);
(obj[str_name__7307] = f__7305);
var temp__3974__auto____7308 = cljs.core.next.call(null,G__7290__7306);
if(temp__3974__auto____7308)
{var G__7290__7309 = temp__3974__auto____7308;
{
var G__7310 = cljs.core.first.call(null,G__7290__7309);
var G__7311 = G__7290__7309;
G__7293__7300 = G__7310;
G__7290__7301 = G__7311;
continue;
}
} else
{}
break;
}
} else
{}
return obj;
});

/**
* @constructor
*/
cljs.core.List = (function (meta,first,rest,count,__hash){
this.meta = meta;
this.first = first;
this.rest = rest;
this.count = count;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 65413358;
})
cljs.core.List.cljs$lang$type = true;
cljs.core.List.cljs$lang$ctorPrSeq = (function (this__2315__auto__){
return cljs.core.list.call(null,"cljs.core/List");
});
cljs.core.List.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__7312 = this;
var h__2198__auto____7313 = this__7312.__hash;
if(!((h__2198__auto____7313 == null)))
{return h__2198__auto____7313;
} else
{var h__2198__auto____7314 = cljs.core.hash_coll.call(null,coll);
this__7312.__hash = h__2198__auto____7314;
return h__2198__auto____7314;
}
});
cljs.core.List.prototype.cljs$core$INext$_next$arity$1 = (function (coll){
var this__7315 = this;
if((this__7315.count === 1))
{return null;
} else
{return this__7315.rest;
}
});
cljs.core.List.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__7316 = this;
return (new cljs.core.List(this__7316.meta,o,coll,(this__7316.count + 1),null));
});
cljs.core.List.prototype.toString = (function (){
var this__7317 = this;
var this__7318 = this;
return cljs.core.pr_str.call(null,this__7318);
});
cljs.core.List.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__7319 = this;
return coll;
});
cljs.core.List.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__7320 = this;
return this__7320.count;
});
cljs.core.List.prototype.cljs$core$IStack$_peek$arity$1 = (function (coll){
var this__7321 = this;
return this__7321.first;
});
cljs.core.List.prototype.cljs$core$IStack$_pop$arity$1 = (function (coll){
var this__7322 = this;
return coll.cljs$core$ISeq$_rest$arity$1(coll);
});
cljs.core.List.prototype.cljs$core$ISeq$_first$arity$1 = (function (coll){
var this__7323 = this;
return this__7323.first;
});
cljs.core.List.prototype.cljs$core$ISeq$_rest$arity$1 = (function (coll){
var this__7324 = this;
if((this__7324.count === 1))
{return cljs.core.List.EMPTY;
} else
{return this__7324.rest;
}
});
cljs.core.List.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__7325 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.List.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__7326 = this;
return (new cljs.core.List(meta,this__7326.first,this__7326.rest,this__7326.count,this__7326.__hash));
});
cljs.core.List.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__7327 = this;
return this__7327.meta;
});
cljs.core.List.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__7328 = this;
return cljs.core.List.EMPTY;
});
cljs.core.List;

/**
* @constructor
*/
cljs.core.EmptyList = (function (meta){
this.meta = meta;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 65413326;
})
cljs.core.EmptyList.cljs$lang$type = true;
cljs.core.EmptyList.cljs$lang$ctorPrSeq = (function (this__2315__auto__){
return cljs.core.list.call(null,"cljs.core/EmptyList");
});
cljs.core.EmptyList.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__7329 = this;
return 0;
});
cljs.core.EmptyList.prototype.cljs$core$INext$_next$arity$1 = (function (coll){
var this__7330 = this;
return null;
});
cljs.core.EmptyList.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__7331 = this;
return (new cljs.core.List(this__7331.meta,o,null,1,null));
});
cljs.core.EmptyList.prototype.toString = (function (){
var this__7332 = this;
var this__7333 = this;
return cljs.core.pr_str.call(null,this__7333);
});
cljs.core.EmptyList.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__7334 = this;
return null;
});
cljs.core.EmptyList.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__7335 = this;
return 0;
});
cljs.core.EmptyList.prototype.cljs$core$IStack$_peek$arity$1 = (function (coll){
var this__7336 = this;
return null;
});
cljs.core.EmptyList.prototype.cljs$core$IStack$_pop$arity$1 = (function (coll){
var this__7337 = this;
throw (new Error("Can't pop empty list"));
});
cljs.core.EmptyList.prototype.cljs$core$ISeq$_first$arity$1 = (function (coll){
var this__7338 = this;
return null;
});
cljs.core.EmptyList.prototype.cljs$core$ISeq$_rest$arity$1 = (function (coll){
var this__7339 = this;
return cljs.core.List.EMPTY;
});
cljs.core.EmptyList.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__7340 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.EmptyList.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__7341 = this;
return (new cljs.core.EmptyList(meta));
});
cljs.core.EmptyList.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__7342 = this;
return this__7342.meta;
});
cljs.core.EmptyList.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__7343 = this;
return coll;
});
cljs.core.EmptyList;
cljs.core.List.EMPTY = (new cljs.core.EmptyList(null));
cljs.core.reversible_QMARK_ = (function reversible_QMARK_(coll){
var G__7347__7348 = coll;
if(G__7347__7348)
{if((function (){var or__3824__auto____7349 = (G__7347__7348.cljs$lang$protocol_mask$partition0$ & 134217728);
if(or__3824__auto____7349)
{return or__3824__auto____7349;
} else
{return G__7347__7348.cljs$core$IReversible$;
}
})())
{return true;
} else
{if((!G__7347__7348.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IReversible,G__7347__7348);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IReversible,G__7347__7348);
}
});
cljs.core.rseq = (function rseq(coll){
return cljs.core._rseq.call(null,coll);
});
/**
* Returns a seq of the items in coll in reverse order. Not lazy.
*/
cljs.core.reverse = (function reverse(coll){
if(cljs.core.reversible_QMARK_.call(null,coll))
{return cljs.core.rseq.call(null,coll);
} else
{return cljs.core.reduce.call(null,cljs.core.conj,cljs.core.List.EMPTY,coll);
}
});
/**
* @param {...*} var_args
*/
cljs.core.list = (function() {
var list = null;
var list__0 = (function (){
return cljs.core.List.EMPTY;
});
var list__1 = (function (x){
return cljs.core.conj.call(null,cljs.core.List.EMPTY,x);
});
var list__2 = (function (x,y){
return cljs.core.conj.call(null,list.call(null,y),x);
});
var list__3 = (function (x,y,z){
return cljs.core.conj.call(null,list.call(null,y,z),x);
});
var list__4 = (function() { 
var G__7350__delegate = function (x,y,z,items){
return cljs.core.conj.call(null,cljs.core.conj.call(null,cljs.core.conj.call(null,cljs.core.reduce.call(null,cljs.core.conj,cljs.core.List.EMPTY,cljs.core.reverse.call(null,items)),z),y),x);
};
var G__7350 = function (x,y,z,var_args){
var items = null;
if (goog.isDef(var_args)) {
  items = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__7350__delegate.call(this, x, y, z, items);
};
G__7350.cljs$lang$maxFixedArity = 3;
G__7350.cljs$lang$applyTo = (function (arglist__7351){
var x = cljs.core.first(arglist__7351);
var y = cljs.core.first(cljs.core.next(arglist__7351));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7351)));
var items = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7351)));
return G__7350__delegate(x, y, z, items);
});
G__7350.cljs$lang$arity$variadic = G__7350__delegate;
return G__7350;
})()
;
list = function(x,y,z,var_args){
var items = var_args;
switch(arguments.length){
case 0:
return list__0.call(this);
case 1:
return list__1.call(this,x);
case 2:
return list__2.call(this,x,y);
case 3:
return list__3.call(this,x,y,z);
default:
return list__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
list.cljs$lang$maxFixedArity = 3;
list.cljs$lang$applyTo = list__4.cljs$lang$applyTo;
list.cljs$lang$arity$0 = list__0;
list.cljs$lang$arity$1 = list__1;
list.cljs$lang$arity$2 = list__2;
list.cljs$lang$arity$3 = list__3;
list.cljs$lang$arity$variadic = list__4.cljs$lang$arity$variadic;
return list;
})()
;

/**
* @constructor
*/
cljs.core.Cons = (function (meta,first,rest,__hash){
this.meta = meta;
this.first = first;
this.rest = rest;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 65405164;
})
cljs.core.Cons.cljs$lang$type = true;
cljs.core.Cons.cljs$lang$ctorPrSeq = (function (this__2315__auto__){
return cljs.core.list.call(null,"cljs.core/Cons");
});
cljs.core.Cons.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__7352 = this;
var h__2198__auto____7353 = this__7352.__hash;
if(!((h__2198__auto____7353 == null)))
{return h__2198__auto____7353;
} else
{var h__2198__auto____7354 = cljs.core.hash_coll.call(null,coll);
this__7352.__hash = h__2198__auto____7354;
return h__2198__auto____7354;
}
});
cljs.core.Cons.prototype.cljs$core$INext$_next$arity$1 = (function (coll){
var this__7355 = this;
if((this__7355.rest == null))
{return null;
} else
{return cljs.core._seq.call(null,this__7355.rest);
}
});
cljs.core.Cons.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__7356 = this;
return (new cljs.core.Cons(null,o,coll,this__7356.__hash));
});
cljs.core.Cons.prototype.toString = (function (){
var this__7357 = this;
var this__7358 = this;
return cljs.core.pr_str.call(null,this__7358);
});
cljs.core.Cons.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__7359 = this;
return coll;
});
cljs.core.Cons.prototype.cljs$core$ISeq$_first$arity$1 = (function (coll){
var this__7360 = this;
return this__7360.first;
});
cljs.core.Cons.prototype.cljs$core$ISeq$_rest$arity$1 = (function (coll){
var this__7361 = this;
if((this__7361.rest == null))
{return cljs.core.List.EMPTY;
} else
{return this__7361.rest;
}
});
cljs.core.Cons.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__7362 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.Cons.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__7363 = this;
return (new cljs.core.Cons(meta,this__7363.first,this__7363.rest,this__7363.__hash));
});
cljs.core.Cons.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__7364 = this;
return this__7364.meta;
});
cljs.core.Cons.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__7365 = this;
return cljs.core.with_meta.call(null,cljs.core.List.EMPTY,this__7365.meta);
});
cljs.core.Cons;
/**
* Returns a new seq where x is the first element and seq is the rest.
*/
cljs.core.cons = (function cons(x,coll){
if((function (){var or__3824__auto____7370 = (coll == null);
if(or__3824__auto____7370)
{return or__3824__auto____7370;
} else
{var G__7371__7372 = coll;
if(G__7371__7372)
{if((function (){var or__3824__auto____7373 = (G__7371__7372.cljs$lang$protocol_mask$partition0$ & 64);
if(or__3824__auto____7373)
{return or__3824__auto____7373;
} else
{return G__7371__7372.cljs$core$ISeq$;
}
})())
{return true;
} else
{if((!G__7371__7372.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeq,G__7371__7372);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeq,G__7371__7372);
}
}
})())
{return (new cljs.core.Cons(null,x,coll,null));
} else
{return (new cljs.core.Cons(null,x,cljs.core.seq.call(null,coll),null));
}
});
cljs.core.list_QMARK_ = (function list_QMARK_(x){
var G__7377__7378 = x;
if(G__7377__7378)
{if((function (){var or__3824__auto____7379 = (G__7377__7378.cljs$lang$protocol_mask$partition0$ & 33554432);
if(or__3824__auto____7379)
{return or__3824__auto____7379;
} else
{return G__7377__7378.cljs$core$IList$;
}
})())
{return true;
} else
{if((!G__7377__7378.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IList,G__7377__7378);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IList,G__7377__7378);
}
});
(cljs.core.IReduce["string"] = true);
(cljs.core._reduce["string"] = (function() {
var G__7380 = null;
var G__7380__2 = (function (string,f){
return cljs.core.ci_reduce.call(null,string,f);
});
var G__7380__3 = (function (string,f,start){
return cljs.core.ci_reduce.call(null,string,f,start);
});
G__7380 = function(string,f,start){
switch(arguments.length){
case 2:
return G__7380__2.call(this,string,f);
case 3:
return G__7380__3.call(this,string,f,start);
}
throw('Invalid arity: ' + arguments.length);
};
return G__7380;
})()
);
(cljs.core.ILookup["string"] = true);
(cljs.core._lookup["string"] = (function() {
var G__7381 = null;
var G__7381__2 = (function (string,k){
return cljs.core._nth.call(null,string,k);
});
var G__7381__3 = (function (string,k,not_found){
return cljs.core._nth.call(null,string,k,not_found);
});
G__7381 = function(string,k,not_found){
switch(arguments.length){
case 2:
return G__7381__2.call(this,string,k);
case 3:
return G__7381__3.call(this,string,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__7381;
})()
);
(cljs.core.IIndexed["string"] = true);
(cljs.core._nth["string"] = (function() {
var G__7382 = null;
var G__7382__2 = (function (string,n){
if((n < cljs.core._count.call(null,string)))
{return string.charAt(n);
} else
{return null;
}
});
var G__7382__3 = (function (string,n,not_found){
if((n < cljs.core._count.call(null,string)))
{return string.charAt(n);
} else
{return not_found;
}
});
G__7382 = function(string,n,not_found){
switch(arguments.length){
case 2:
return G__7382__2.call(this,string,n);
case 3:
return G__7382__3.call(this,string,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__7382;
})()
);
(cljs.core.ICounted["string"] = true);
(cljs.core._count["string"] = (function (s){
return s.length;
}));
(cljs.core.ISeqable["string"] = true);
(cljs.core._seq["string"] = (function (string){
return cljs.core.prim_seq.call(null,string,0);
}));
(cljs.core.IHash["string"] = true);
(cljs.core._hash["string"] = (function (o){
return goog.string.hashCode(o);
}));

/**
* @constructor
*/
cljs.core.Keyword = (function (k){
this.k = k;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 1;
})
cljs.core.Keyword.cljs$lang$type = true;
cljs.core.Keyword.cljs$lang$ctorPrSeq = (function (this__2315__auto__){
return cljs.core.list.call(null,"cljs.core/Keyword");
});
cljs.core.Keyword.prototype.call = (function() {
var G__7394 = null;
var G__7394__2 = (function (this_sym7385,coll){
var this__7387 = this;
var this_sym7385__7388 = this;
var ___7389 = this_sym7385__7388;
if((coll == null))
{return null;
} else
{var strobj__7390 = coll.strobj;
if((strobj__7390 == null))
{return cljs.core._lookup.call(null,coll,this__7387.k,null);
} else
{return (strobj__7390[this__7387.k]);
}
}
});
var G__7394__3 = (function (this_sym7386,coll,not_found){
var this__7387 = this;
var this_sym7386__7391 = this;
var ___7392 = this_sym7386__7391;
if((coll == null))
{return not_found;
} else
{return cljs.core._lookup.call(null,coll,this__7387.k,not_found);
}
});
G__7394 = function(this_sym7386,coll,not_found){
switch(arguments.length){
case 2:
return G__7394__2.call(this,this_sym7386,coll);
case 3:
return G__7394__3.call(this,this_sym7386,coll,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__7394;
})()
;
cljs.core.Keyword.prototype.apply = (function (this_sym7383,args7384){
var this__7393 = this;
return this_sym7383.call.apply(this_sym7383,[this_sym7383].concat(args7384.slice()));
});
cljs.core.Keyword;
String.prototype.cljs$core$IFn$ = true;
String.prototype.call = (function() {
var G__7403 = null;
var G__7403__2 = (function (this_sym7397,coll){
var this_sym7397__7399 = this;
var this__7400 = this_sym7397__7399;
return cljs.core._lookup.call(null,coll,this__7400.toString(),null);
});
var G__7403__3 = (function (this_sym7398,coll,not_found){
var this_sym7398__7401 = this;
var this__7402 = this_sym7398__7401;
return cljs.core._lookup.call(null,coll,this__7402.toString(),not_found);
});
G__7403 = function(this_sym7398,coll,not_found){
switch(arguments.length){
case 2:
return G__7403__2.call(this,this_sym7398,coll);
case 3:
return G__7403__3.call(this,this_sym7398,coll,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__7403;
})()
;
String.prototype.apply = (function (this_sym7395,args7396){
return this_sym7395.call.apply(this_sym7395,[this_sym7395].concat(args7396.slice()));
});
String.prototype.apply = (function (s,args){
if((cljs.core.count.call(null,args) < 2))
{return cljs.core._lookup.call(null,(args[0]),s,null);
} else
{return cljs.core._lookup.call(null,(args[0]),s,(args[1]));
}
});
cljs.core.lazy_seq_value = (function lazy_seq_value(lazy_seq){
var x__7405 = lazy_seq.x;
if(lazy_seq.realized)
{return x__7405;
} else
{lazy_seq.x = x__7405.call(null);
lazy_seq.realized = true;
return lazy_seq.x;
}
});

/**
* @constructor
*/
cljs.core.LazySeq = (function (meta,realized,x,__hash){
this.meta = meta;
this.realized = realized;
this.x = x;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 31850700;
})
cljs.core.LazySeq.cljs$lang$type = true;
cljs.core.LazySeq.cljs$lang$ctorPrSeq = (function (this__2315__auto__){
return cljs.core.list.call(null,"cljs.core/LazySeq");
});
cljs.core.LazySeq.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__7406 = this;
var h__2198__auto____7407 = this__7406.__hash;
if(!((h__2198__auto____7407 == null)))
{return h__2198__auto____7407;
} else
{var h__2198__auto____7408 = cljs.core.hash_coll.call(null,coll);
this__7406.__hash = h__2198__auto____7408;
return h__2198__auto____7408;
}
});
cljs.core.LazySeq.prototype.cljs$core$INext$_next$arity$1 = (function (coll){
var this__7409 = this;
return cljs.core._seq.call(null,coll.cljs$core$ISeq$_rest$arity$1(coll));
});
cljs.core.LazySeq.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__7410 = this;
return cljs.core.cons.call(null,o,coll);
});
cljs.core.LazySeq.prototype.toString = (function (){
var this__7411 = this;
var this__7412 = this;
return cljs.core.pr_str.call(null,this__7412);
});
cljs.core.LazySeq.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__7413 = this;
return cljs.core.seq.call(null,cljs.core.lazy_seq_value.call(null,coll));
});
cljs.core.LazySeq.prototype.cljs$core$ISeq$_first$arity$1 = (function (coll){
var this__7414 = this;
return cljs.core.first.call(null,cljs.core.lazy_seq_value.call(null,coll));
});
cljs.core.LazySeq.prototype.cljs$core$ISeq$_rest$arity$1 = (function (coll){
var this__7415 = this;
return cljs.core.rest.call(null,cljs.core.lazy_seq_value.call(null,coll));
});
cljs.core.LazySeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__7416 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.LazySeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__7417 = this;
return (new cljs.core.LazySeq(meta,this__7417.realized,this__7417.x,this__7417.__hash));
});
cljs.core.LazySeq.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__7418 = this;
return this__7418.meta;
});
cljs.core.LazySeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__7419 = this;
return cljs.core.with_meta.call(null,cljs.core.List.EMPTY,this__7419.meta);
});
cljs.core.LazySeq;

/**
* @constructor
*/
cljs.core.ChunkBuffer = (function (buf,end){
this.buf = buf;
this.end = end;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 2;
})
cljs.core.ChunkBuffer.cljs$lang$type = true;
cljs.core.ChunkBuffer.cljs$lang$ctorPrSeq = (function (this__2315__auto__){
return cljs.core.list.call(null,"cljs.core/ChunkBuffer");
});
cljs.core.ChunkBuffer.prototype.cljs$core$ICounted$_count$arity$1 = (function (_){
var this__7420 = this;
return this__7420.end;
});
cljs.core.ChunkBuffer.prototype.add = (function (o){
var this__7421 = this;
var ___7422 = this;
(this__7421.buf[this__7421.end] = o);
return this__7421.end = (this__7421.end + 1);
});
cljs.core.ChunkBuffer.prototype.chunk = (function (o){
var this__7423 = this;
var ___7424 = this;
var ret__7425 = (new cljs.core.ArrayChunk(this__7423.buf,0,this__7423.end));
this__7423.buf = null;
return ret__7425;
});
cljs.core.ChunkBuffer;
cljs.core.chunk_buffer = (function chunk_buffer(capacity){
return (new cljs.core.ChunkBuffer(cljs.core.make_array.call(null,capacity),0));
});

/**
* @constructor
*/
cljs.core.ArrayChunk = (function (arr,off,end){
this.arr = arr;
this.off = off;
this.end = end;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 524306;
})
cljs.core.ArrayChunk.cljs$lang$type = true;
cljs.core.ArrayChunk.cljs$lang$ctorPrSeq = (function (this__2315__auto__){
return cljs.core.list.call(null,"cljs.core/ArrayChunk");
});
cljs.core.ArrayChunk.prototype.cljs$core$IReduce$_reduce$arity$2 = (function (coll,f){
var this__7426 = this;
return cljs.core.ci_reduce.call(null,coll,f,(this__7426.arr[this__7426.off]),(this__7426.off + 1));
});
cljs.core.ArrayChunk.prototype.cljs$core$IReduce$_reduce$arity$3 = (function (coll,f,start){
var this__7427 = this;
return cljs.core.ci_reduce.call(null,coll,f,start,this__7427.off);
});
cljs.core.ArrayChunk.prototype.cljs$core$IChunk$ = true;
cljs.core.ArrayChunk.prototype.cljs$core$IChunk$_drop_first$arity$1 = (function (coll){
var this__7428 = this;
if((this__7428.off === this__7428.end))
{throw (new Error("-drop-first of empty chunk"));
} else
{return (new cljs.core.ArrayChunk(this__7428.arr,(this__7428.off + 1),this__7428.end));
}
});
cljs.core.ArrayChunk.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (coll,i){
var this__7429 = this;
return (this__7429.arr[(this__7429.off + i)]);
});
cljs.core.ArrayChunk.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (coll,i,not_found){
var this__7430 = this;
if((function (){var and__3822__auto____7431 = (i >= 0);
if(and__3822__auto____7431)
{return (i < (this__7430.end - this__7430.off));
} else
{return and__3822__auto____7431;
}
})())
{return (this__7430.arr[(this__7430.off + i)]);
} else
{return not_found;
}
});
cljs.core.ArrayChunk.prototype.cljs$core$ICounted$_count$arity$1 = (function (_){
var this__7432 = this;
return (this__7432.end - this__7432.off);
});
cljs.core.ArrayChunk;
cljs.core.array_chunk = (function() {
var array_chunk = null;
var array_chunk__1 = (function (arr){
return array_chunk.call(null,arr,0,arr.length);
});
var array_chunk__2 = (function (arr,off){
return array_chunk.call(null,arr,off,arr.length);
});
var array_chunk__3 = (function (arr,off,end){
return (new cljs.core.ArrayChunk(arr,off,end));
});
array_chunk = function(arr,off,end){
switch(arguments.length){
case 1:
return array_chunk__1.call(this,arr);
case 2:
return array_chunk__2.call(this,arr,off);
case 3:
return array_chunk__3.call(this,arr,off,end);
}
throw('Invalid arity: ' + arguments.length);
};
array_chunk.cljs$lang$arity$1 = array_chunk__1;
array_chunk.cljs$lang$arity$2 = array_chunk__2;
array_chunk.cljs$lang$arity$3 = array_chunk__3;
return array_chunk;
})()
;

/**
* @constructor
*/
cljs.core.ChunkedCons = (function (chunk,more,meta){
this.chunk = chunk;
this.more = more;
this.meta = meta;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 27656296;
})
cljs.core.ChunkedCons.cljs$lang$type = true;
cljs.core.ChunkedCons.cljs$lang$ctorPrSeq = (function (this__2315__auto__){
return cljs.core.list.call(null,"cljs.core/ChunkedCons");
});
cljs.core.ChunkedCons.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this$,o){
var this__7433 = this;
return cljs.core.cons.call(null,o,this$);
});
cljs.core.ChunkedCons.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__7434 = this;
return coll;
});
cljs.core.ChunkedCons.prototype.cljs$core$ISeq$_first$arity$1 = (function (coll){
var this__7435 = this;
return cljs.core._nth.call(null,this__7435.chunk,0);
});
cljs.core.ChunkedCons.prototype.cljs$core$ISeq$_rest$arity$1 = (function (coll){
var this__7436 = this;
if((cljs.core._count.call(null,this__7436.chunk) > 1))
{return (new cljs.core.ChunkedCons(cljs.core._drop_first.call(null,this__7436.chunk),this__7436.more,this__7436.meta));
} else
{if((this__7436.more == null))
{return cljs.core.List.EMPTY;
} else
{return this__7436.more;
}
}
});
cljs.core.ChunkedCons.prototype.cljs$core$IChunkedNext$ = true;
cljs.core.ChunkedCons.prototype.cljs$core$IChunkedNext$_chunked_next$arity$1 = (function (coll){
var this__7437 = this;
if((this__7437.more == null))
{return null;
} else
{return this__7437.more;
}
});
cljs.core.ChunkedCons.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__7438 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.ChunkedCons.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,m){
var this__7439 = this;
return (new cljs.core.ChunkedCons(this__7439.chunk,this__7439.more,m));
});
cljs.core.ChunkedCons.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__7440 = this;
return this__7440.meta;
});
cljs.core.ChunkedCons.prototype.cljs$core$IChunkedSeq$ = true;
cljs.core.ChunkedCons.prototype.cljs$core$IChunkedSeq$_chunked_first$arity$1 = (function (coll){
var this__7441 = this;
return this__7441.chunk;
});
cljs.core.ChunkedCons.prototype.cljs$core$IChunkedSeq$_chunked_rest$arity$1 = (function (coll){
var this__7442 = this;
if((this__7442.more == null))
{return cljs.core.List.EMPTY;
} else
{return this__7442.more;
}
});
cljs.core.ChunkedCons;
cljs.core.chunk_cons = (function chunk_cons(chunk,rest){
if((cljs.core._count.call(null,chunk) === 0))
{return rest;
} else
{return (new cljs.core.ChunkedCons(chunk,rest,null));
}
});
cljs.core.chunk_append = (function chunk_append(b,x){
return b.add(x);
});
cljs.core.chunk = (function chunk(b){
return b.chunk();
});
cljs.core.chunk_first = (function chunk_first(s){
return cljs.core._chunked_first.call(null,s);
});
cljs.core.chunk_rest = (function chunk_rest(s){
return cljs.core._chunked_rest.call(null,s);
});
cljs.core.chunk_next = (function chunk_next(s){
if((function (){var G__7446__7447 = s;
if(G__7446__7447)
{if(cljs.core.truth_((function (){var or__3824__auto____7448 = null;
if(cljs.core.truth_(or__3824__auto____7448))
{return or__3824__auto____7448;
} else
{return G__7446__7447.cljs$core$IChunkedNext$;
}
})()))
{return true;
} else
{if((!G__7446__7447.cljs$lang$protocol_mask$partition$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IChunkedNext,G__7446__7447);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IChunkedNext,G__7446__7447);
}
})())
{return cljs.core._chunked_next.call(null,s);
} else
{return cljs.core.seq.call(null,cljs.core._chunked_rest.call(null,s));
}
});
/**
* Naive impl of to-array as a start.
*/
cljs.core.to_array = (function to_array(s){
var ary__7451 = [];
var s__7452 = s;
while(true){
if(cljs.core.seq.call(null,s__7452))
{ary__7451.push(cljs.core.first.call(null,s__7452));
{
var G__7453 = cljs.core.next.call(null,s__7452);
s__7452 = G__7453;
continue;
}
} else
{return ary__7451;
}
break;
}
});
/**
* Returns a (potentially-ragged) 2-dimensional array
* containing the contents of coll.
*/
cljs.core.to_array_2d = (function to_array_2d(coll){
var ret__7457 = cljs.core.make_array.call(null,cljs.core.count.call(null,coll));
var i__7458 = 0;
var xs__7459 = cljs.core.seq.call(null,coll);
while(true){
if(xs__7459)
{(ret__7457[i__7458] = cljs.core.to_array.call(null,cljs.core.first.call(null,xs__7459)));
{
var G__7460 = (i__7458 + 1);
var G__7461 = cljs.core.next.call(null,xs__7459);
i__7458 = G__7460;
xs__7459 = G__7461;
continue;
}
} else
{}
break;
}
return ret__7457;
});
cljs.core.long_array = (function() {
var long_array = null;
var long_array__1 = (function (size_or_seq){
if(cljs.core.number_QMARK_.call(null,size_or_seq))
{return long_array.call(null,size_or_seq,null);
} else
{if(cljs.core.seq_QMARK_.call(null,size_or_seq))
{return cljs.core.into_array.call(null,size_or_seq);
} else
{if("\uFDD0'else")
{throw (new Error("long-array called with something other than size or ISeq"));
} else
{return null;
}
}
}
});
var long_array__2 = (function (size,init_val_or_seq){
var a__7469 = cljs.core.make_array.call(null,size);
if(cljs.core.seq_QMARK_.call(null,init_val_or_seq))
{var s__7470 = cljs.core.seq.call(null,init_val_or_seq);
var i__7471 = 0;
var s__7472 = s__7470;
while(true){
if(cljs.core.truth_((function (){var and__3822__auto____7473 = s__7472;
if(and__3822__auto____7473)
{return (i__7471 < size);
} else
{return and__3822__auto____7473;
}
})()))
{(a__7469[i__7471] = cljs.core.first.call(null,s__7472));
{
var G__7476 = (i__7471 + 1);
var G__7477 = cljs.core.next.call(null,s__7472);
i__7471 = G__7476;
s__7472 = G__7477;
continue;
}
} else
{return a__7469;
}
break;
}
} else
{var n__2533__auto____7474 = size;
var i__7475 = 0;
while(true){
if((i__7475 < n__2533__auto____7474))
{(a__7469[i__7475] = init_val_or_seq);
{
var G__7478 = (i__7475 + 1);
i__7475 = G__7478;
continue;
}
} else
{}
break;
}
return a__7469;
}
});
long_array = function(size,init_val_or_seq){
switch(arguments.length){
case 1:
return long_array__1.call(this,size);
case 2:
return long_array__2.call(this,size,init_val_or_seq);
}
throw('Invalid arity: ' + arguments.length);
};
long_array.cljs$lang$arity$1 = long_array__1;
long_array.cljs$lang$arity$2 = long_array__2;
return long_array;
})()
;
cljs.core.double_array = (function() {
var double_array = null;
var double_array__1 = (function (size_or_seq){
if(cljs.core.number_QMARK_.call(null,size_or_seq))
{return double_array.call(null,size_or_seq,null);
} else
{if(cljs.core.seq_QMARK_.call(null,size_or_seq))
{return cljs.core.into_array.call(null,size_or_seq);
} else
{if("\uFDD0'else")
{throw (new Error("double-array called with something other than size or ISeq"));
} else
{return null;
}
}
}
});
var double_array__2 = (function (size,init_val_or_seq){
var a__7486 = cljs.core.make_array.call(null,size);
if(cljs.core.seq_QMARK_.call(null,init_val_or_seq))
{var s__7487 = cljs.core.seq.call(null,init_val_or_seq);
var i__7488 = 0;
var s__7489 = s__7487;
while(true){
if(cljs.core.truth_((function (){var and__3822__auto____7490 = s__7489;
if(and__3822__auto____7490)
{return (i__7488 < size);
} else
{return and__3822__auto____7490;
}
})()))
{(a__7486[i__7488] = cljs.core.first.call(null,s__7489));
{
var G__7493 = (i__7488 + 1);
var G__7494 = cljs.core.next.call(null,s__7489);
i__7488 = G__7493;
s__7489 = G__7494;
continue;
}
} else
{return a__7486;
}
break;
}
} else
{var n__2533__auto____7491 = size;
var i__7492 = 0;
while(true){
if((i__7492 < n__2533__auto____7491))
{(a__7486[i__7492] = init_val_or_seq);
{
var G__7495 = (i__7492 + 1);
i__7492 = G__7495;
continue;
}
} else
{}
break;
}
return a__7486;
}
});
double_array = function(size,init_val_or_seq){
switch(arguments.length){
case 1:
return double_array__1.call(this,size);
case 2:
return double_array__2.call(this,size,init_val_or_seq);
}
throw('Invalid arity: ' + arguments.length);
};
double_array.cljs$lang$arity$1 = double_array__1;
double_array.cljs$lang$arity$2 = double_array__2;
return double_array;
})()
;
cljs.core.object_array = (function() {
var object_array = null;
var object_array__1 = (function (size_or_seq){
if(cljs.core.number_QMARK_.call(null,size_or_seq))
{return object_array.call(null,size_or_seq,null);
} else
{if(cljs.core.seq_QMARK_.call(null,size_or_seq))
{return cljs.core.into_array.call(null,size_or_seq);
} else
{if("\uFDD0'else")
{throw (new Error("object-array called with something other than size or ISeq"));
} else
{return null;
}
}
}
});
var object_array__2 = (function (size,init_val_or_seq){
var a__7503 = cljs.core.make_array.call(null,size);
if(cljs.core.seq_QMARK_.call(null,init_val_or_seq))
{var s__7504 = cljs.core.seq.call(null,init_val_or_seq);
var i__7505 = 0;
var s__7506 = s__7504;
while(true){
if(cljs.core.truth_((function (){var and__3822__auto____7507 = s__7506;
if(and__3822__auto____7507)
{return (i__7505 < size);
} else
{return and__3822__auto____7507;
}
})()))
{(a__7503[i__7505] = cljs.core.first.call(null,s__7506));
{
var G__7510 = (i__7505 + 1);
var G__7511 = cljs.core.next.call(null,s__7506);
i__7505 = G__7510;
s__7506 = G__7511;
continue;
}
} else
{return a__7503;
}
break;
}
} else
{var n__2533__auto____7508 = size;
var i__7509 = 0;
while(true){
if((i__7509 < n__2533__auto____7508))
{(a__7503[i__7509] = init_val_or_seq);
{
var G__7512 = (i__7509 + 1);
i__7509 = G__7512;
continue;
}
} else
{}
break;
}
return a__7503;
}
});
object_array = function(size,init_val_or_seq){
switch(arguments.length){
case 1:
return object_array__1.call(this,size);
case 2:
return object_array__2.call(this,size,init_val_or_seq);
}
throw('Invalid arity: ' + arguments.length);
};
object_array.cljs$lang$arity$1 = object_array__1;
object_array.cljs$lang$arity$2 = object_array__2;
return object_array;
})()
;
cljs.core.bounded_count = (function bounded_count(s,n){
if(cljs.core.counted_QMARK_.call(null,s))
{return cljs.core.count.call(null,s);
} else
{var s__7517 = s;
var i__7518 = n;
var sum__7519 = 0;
while(true){
if(cljs.core.truth_((function (){var and__3822__auto____7520 = (i__7518 > 0);
if(and__3822__auto____7520)
{return cljs.core.seq.call(null,s__7517);
} else
{return and__3822__auto____7520;
}
})()))
{{
var G__7521 = cljs.core.next.call(null,s__7517);
var G__7522 = (i__7518 - 1);
var G__7523 = (sum__7519 + 1);
s__7517 = G__7521;
i__7518 = G__7522;
sum__7519 = G__7523;
continue;
}
} else
{return sum__7519;
}
break;
}
}
});
cljs.core.spread = (function spread(arglist){
if((arglist == null))
{return null;
} else
{if((cljs.core.next.call(null,arglist) == null))
{return cljs.core.seq.call(null,cljs.core.first.call(null,arglist));
} else
{if("\uFDD0'else")
{return cljs.core.cons.call(null,cljs.core.first.call(null,arglist),spread.call(null,cljs.core.next.call(null,arglist)));
} else
{return null;
}
}
}
});
/**
* Returns a lazy seq representing the concatenation of the elements in the supplied colls.
* @param {...*} var_args
*/
cljs.core.concat = (function() {
var concat = null;
var concat__0 = (function (){
return (new cljs.core.LazySeq(null,false,(function (){
return null;
}),null));
});
var concat__1 = (function (x){
return (new cljs.core.LazySeq(null,false,(function (){
return x;
}),null));
});
var concat__2 = (function (x,y){
return (new cljs.core.LazySeq(null,false,(function (){
var s__7528 = cljs.core.seq.call(null,x);
if(s__7528)
{if(cljs.core.chunked_seq_QMARK_.call(null,s__7528))
{return cljs.core.chunk_cons.call(null,cljs.core.chunk_first.call(null,s__7528),concat.call(null,cljs.core.chunk_rest.call(null,s__7528),y));
} else
{return cljs.core.cons.call(null,cljs.core.first.call(null,s__7528),concat.call(null,cljs.core.rest.call(null,s__7528),y));
}
} else
{return y;
}
}),null));
});
var concat__3 = (function() { 
var G__7532__delegate = function (x,y,zs){
var cat__7531 = (function cat(xys,zs){
return (new cljs.core.LazySeq(null,false,(function (){
var xys__7530 = cljs.core.seq.call(null,xys);
if(xys__7530)
{if(cljs.core.chunked_seq_QMARK_.call(null,xys__7530))
{return cljs.core.chunk_cons.call(null,cljs.core.chunk_first.call(null,xys__7530),cat.call(null,cljs.core.chunk_rest.call(null,xys__7530),zs));
} else
{return cljs.core.cons.call(null,cljs.core.first.call(null,xys__7530),cat.call(null,cljs.core.rest.call(null,xys__7530),zs));
}
} else
{if(cljs.core.truth_(zs))
{return cat.call(null,cljs.core.first.call(null,zs),cljs.core.next.call(null,zs));
} else
{return null;
}
}
}),null));
});
return cat__7531.call(null,concat.call(null,x,y),zs);
};
var G__7532 = function (x,y,var_args){
var zs = null;
if (goog.isDef(var_args)) {
  zs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7532__delegate.call(this, x, y, zs);
};
G__7532.cljs$lang$maxFixedArity = 2;
G__7532.cljs$lang$applyTo = (function (arglist__7533){
var x = cljs.core.first(arglist__7533);
var y = cljs.core.first(cljs.core.next(arglist__7533));
var zs = cljs.core.rest(cljs.core.next(arglist__7533));
return G__7532__delegate(x, y, zs);
});
G__7532.cljs$lang$arity$variadic = G__7532__delegate;
return G__7532;
})()
;
concat = function(x,y,var_args){
var zs = var_args;
switch(arguments.length){
case 0:
return concat__0.call(this);
case 1:
return concat__1.call(this,x);
case 2:
return concat__2.call(this,x,y);
default:
return concat__3.cljs$lang$arity$variadic(x,y, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
concat.cljs$lang$maxFixedArity = 2;
concat.cljs$lang$applyTo = concat__3.cljs$lang$applyTo;
concat.cljs$lang$arity$0 = concat__0;
concat.cljs$lang$arity$1 = concat__1;
concat.cljs$lang$arity$2 = concat__2;
concat.cljs$lang$arity$variadic = concat__3.cljs$lang$arity$variadic;
return concat;
})()
;
/**
* Creates a new list containing the items prepended to the rest, the
* last of which will be treated as a sequence.
* @param {...*} var_args
*/
cljs.core.list_STAR_ = (function() {
var list_STAR_ = null;
var list_STAR___1 = (function (args){
return cljs.core.seq.call(null,args);
});
var list_STAR___2 = (function (a,args){
return cljs.core.cons.call(null,a,args);
});
var list_STAR___3 = (function (a,b,args){
return cljs.core.cons.call(null,a,cljs.core.cons.call(null,b,args));
});
var list_STAR___4 = (function (a,b,c,args){
return cljs.core.cons.call(null,a,cljs.core.cons.call(null,b,cljs.core.cons.call(null,c,args)));
});
var list_STAR___5 = (function() { 
var G__7534__delegate = function (a,b,c,d,more){
return cljs.core.cons.call(null,a,cljs.core.cons.call(null,b,cljs.core.cons.call(null,c,cljs.core.cons.call(null,d,cljs.core.spread.call(null,more)))));
};
var G__7534 = function (a,b,c,d,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4),0);
} 
return G__7534__delegate.call(this, a, b, c, d, more);
};
G__7534.cljs$lang$maxFixedArity = 4;
G__7534.cljs$lang$applyTo = (function (arglist__7535){
var a = cljs.core.first(arglist__7535);
var b = cljs.core.first(cljs.core.next(arglist__7535));
var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7535)));
var d = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__7535))));
var more = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__7535))));
return G__7534__delegate(a, b, c, d, more);
});
G__7534.cljs$lang$arity$variadic = G__7534__delegate;
return G__7534;
})()
;
list_STAR_ = function(a,b,c,d,var_args){
var more = var_args;
switch(arguments.length){
case 1:
return list_STAR___1.call(this,a);
case 2:
return list_STAR___2.call(this,a,b);
case 3:
return list_STAR___3.call(this,a,b,c);
case 4:
return list_STAR___4.call(this,a,b,c,d);
default:
return list_STAR___5.cljs$lang$arity$variadic(a,b,c,d, cljs.core.array_seq(arguments, 4));
}
throw('Invalid arity: ' + arguments.length);
};
list_STAR_.cljs$lang$maxFixedArity = 4;
list_STAR_.cljs$lang$applyTo = list_STAR___5.cljs$lang$applyTo;
list_STAR_.cljs$lang$arity$1 = list_STAR___1;
list_STAR_.cljs$lang$arity$2 = list_STAR___2;
list_STAR_.cljs$lang$arity$3 = list_STAR___3;
list_STAR_.cljs$lang$arity$4 = list_STAR___4;
list_STAR_.cljs$lang$arity$variadic = list_STAR___5.cljs$lang$arity$variadic;
return list_STAR_;
})()
;
cljs.core.transient$ = (function transient$(coll){
return cljs.core._as_transient.call(null,coll);
});
cljs.core.persistent_BANG_ = (function persistent_BANG_(tcoll){
return cljs.core._persistent_BANG_.call(null,tcoll);
});
cljs.core.conj_BANG_ = (function conj_BANG_(tcoll,val){
return cljs.core._conj_BANG_.call(null,tcoll,val);
});
cljs.core.assoc_BANG_ = (function assoc_BANG_(tcoll,key,val){
return cljs.core._assoc_BANG_.call(null,tcoll,key,val);
});
cljs.core.dissoc_BANG_ = (function dissoc_BANG_(tcoll,key){
return cljs.core._dissoc_BANG_.call(null,tcoll,key);
});
cljs.core.pop_BANG_ = (function pop_BANG_(tcoll){
return cljs.core._pop_BANG_.call(null,tcoll);
});
cljs.core.disj_BANG_ = (function disj_BANG_(tcoll,val){
return cljs.core._disjoin_BANG_.call(null,tcoll,val);
});
cljs.core.apply_to = (function apply_to(f,argc,args){
var args__7577 = cljs.core.seq.call(null,args);
if((argc === 0))
{return f.call(null);
} else
{var a__7578 = cljs.core._first.call(null,args__7577);
var args__7579 = cljs.core._rest.call(null,args__7577);
if((argc === 1))
{if(f.cljs$lang$arity$1)
{return f.cljs$lang$arity$1(a__7578);
} else
{return f.call(null,a__7578);
}
} else
{var b__7580 = cljs.core._first.call(null,args__7579);
var args__7581 = cljs.core._rest.call(null,args__7579);
if((argc === 2))
{if(f.cljs$lang$arity$2)
{return f.cljs$lang$arity$2(a__7578,b__7580);
} else
{return f.call(null,a__7578,b__7580);
}
} else
{var c__7582 = cljs.core._first.call(null,args__7581);
var args__7583 = cljs.core._rest.call(null,args__7581);
if((argc === 3))
{if(f.cljs$lang$arity$3)
{return f.cljs$lang$arity$3(a__7578,b__7580,c__7582);
} else
{return f.call(null,a__7578,b__7580,c__7582);
}
} else
{var d__7584 = cljs.core._first.call(null,args__7583);
var args__7585 = cljs.core._rest.call(null,args__7583);
if((argc === 4))
{if(f.cljs$lang$arity$4)
{return f.cljs$lang$arity$4(a__7578,b__7580,c__7582,d__7584);
} else
{return f.call(null,a__7578,b__7580,c__7582,d__7584);
}
} else
{var e__7586 = cljs.core._first.call(null,args__7585);
var args__7587 = cljs.core._rest.call(null,args__7585);
if((argc === 5))
{if(f.cljs$lang$arity$5)
{return f.cljs$lang$arity$5(a__7578,b__7580,c__7582,d__7584,e__7586);
} else
{return f.call(null,a__7578,b__7580,c__7582,d__7584,e__7586);
}
} else
{var f__7588 = cljs.core._first.call(null,args__7587);
var args__7589 = cljs.core._rest.call(null,args__7587);
if((argc === 6))
{if(f__7588.cljs$lang$arity$6)
{return f__7588.cljs$lang$arity$6(a__7578,b__7580,c__7582,d__7584,e__7586,f__7588);
} else
{return f__7588.call(null,a__7578,b__7580,c__7582,d__7584,e__7586,f__7588);
}
} else
{var g__7590 = cljs.core._first.call(null,args__7589);
var args__7591 = cljs.core._rest.call(null,args__7589);
if((argc === 7))
{if(f__7588.cljs$lang$arity$7)
{return f__7588.cljs$lang$arity$7(a__7578,b__7580,c__7582,d__7584,e__7586,f__7588,g__7590);
} else
{return f__7588.call(null,a__7578,b__7580,c__7582,d__7584,e__7586,f__7588,g__7590);
}
} else
{var h__7592 = cljs.core._first.call(null,args__7591);
var args__7593 = cljs.core._rest.call(null,args__7591);
if((argc === 8))
{if(f__7588.cljs$lang$arity$8)
{return f__7588.cljs$lang$arity$8(a__7578,b__7580,c__7582,d__7584,e__7586,f__7588,g__7590,h__7592);
} else
{return f__7588.call(null,a__7578,b__7580,c__7582,d__7584,e__7586,f__7588,g__7590,h__7592);
}
} else
{var i__7594 = cljs.core._first.call(null,args__7593);
var args__7595 = cljs.core._rest.call(null,args__7593);
if((argc === 9))
{if(f__7588.cljs$lang$arity$9)
{return f__7588.cljs$lang$arity$9(a__7578,b__7580,c__7582,d__7584,e__7586,f__7588,g__7590,h__7592,i__7594);
} else
{return f__7588.call(null,a__7578,b__7580,c__7582,d__7584,e__7586,f__7588,g__7590,h__7592,i__7594);
}
} else
{var j__7596 = cljs.core._first.call(null,args__7595);
var args__7597 = cljs.core._rest.call(null,args__7595);
if((argc === 10))
{if(f__7588.cljs$lang$arity$10)
{return f__7588.cljs$lang$arity$10(a__7578,b__7580,c__7582,d__7584,e__7586,f__7588,g__7590,h__7592,i__7594,j__7596);
} else
{return f__7588.call(null,a__7578,b__7580,c__7582,d__7584,e__7586,f__7588,g__7590,h__7592,i__7594,j__7596);
}
} else
{var k__7598 = cljs.core._first.call(null,args__7597);
var args__7599 = cljs.core._rest.call(null,args__7597);
if((argc === 11))
{if(f__7588.cljs$lang$arity$11)
{return f__7588.cljs$lang$arity$11(a__7578,b__7580,c__7582,d__7584,e__7586,f__7588,g__7590,h__7592,i__7594,j__7596,k__7598);
} else
{return f__7588.call(null,a__7578,b__7580,c__7582,d__7584,e__7586,f__7588,g__7590,h__7592,i__7594,j__7596,k__7598);
}
} else
{var l__7600 = cljs.core._first.call(null,args__7599);
var args__7601 = cljs.core._rest.call(null,args__7599);
if((argc === 12))
{if(f__7588.cljs$lang$arity$12)
{return f__7588.cljs$lang$arity$12(a__7578,b__7580,c__7582,d__7584,e__7586,f__7588,g__7590,h__7592,i__7594,j__7596,k__7598,l__7600);
} else
{return f__7588.call(null,a__7578,b__7580,c__7582,d__7584,e__7586,f__7588,g__7590,h__7592,i__7594,j__7596,k__7598,l__7600);
}
} else
{var m__7602 = cljs.core._first.call(null,args__7601);
var args__7603 = cljs.core._rest.call(null,args__7601);
if((argc === 13))
{if(f__7588.cljs$lang$arity$13)
{return f__7588.cljs$lang$arity$13(a__7578,b__7580,c__7582,d__7584,e__7586,f__7588,g__7590,h__7592,i__7594,j__7596,k__7598,l__7600,m__7602);
} else
{return f__7588.call(null,a__7578,b__7580,c__7582,d__7584,e__7586,f__7588,g__7590,h__7592,i__7594,j__7596,k__7598,l__7600,m__7602);
}
} else
{var n__7604 = cljs.core._first.call(null,args__7603);
var args__7605 = cljs.core._rest.call(null,args__7603);
if((argc === 14))
{if(f__7588.cljs$lang$arity$14)
{return f__7588.cljs$lang$arity$14(a__7578,b__7580,c__7582,d__7584,e__7586,f__7588,g__7590,h__7592,i__7594,j__7596,k__7598,l__7600,m__7602,n__7604);
} else
{return f__7588.call(null,a__7578,b__7580,c__7582,d__7584,e__7586,f__7588,g__7590,h__7592,i__7594,j__7596,k__7598,l__7600,m__7602,n__7604);
}
} else
{var o__7606 = cljs.core._first.call(null,args__7605);
var args__7607 = cljs.core._rest.call(null,args__7605);
if((argc === 15))
{if(f__7588.cljs$lang$arity$15)
{return f__7588.cljs$lang$arity$15(a__7578,b__7580,c__7582,d__7584,e__7586,f__7588,g__7590,h__7592,i__7594,j__7596,k__7598,l__7600,m__7602,n__7604,o__7606);
} else
{return f__7588.call(null,a__7578,b__7580,c__7582,d__7584,e__7586,f__7588,g__7590,h__7592,i__7594,j__7596,k__7598,l__7600,m__7602,n__7604,o__7606);
}
} else
{var p__7608 = cljs.core._first.call(null,args__7607);
var args__7609 = cljs.core._rest.call(null,args__7607);
if((argc === 16))
{if(f__7588.cljs$lang$arity$16)
{return f__7588.cljs$lang$arity$16(a__7578,b__7580,c__7582,d__7584,e__7586,f__7588,g__7590,h__7592,i__7594,j__7596,k__7598,l__7600,m__7602,n__7604,o__7606,p__7608);
} else
{return f__7588.call(null,a__7578,b__7580,c__7582,d__7584,e__7586,f__7588,g__7590,h__7592,i__7594,j__7596,k__7598,l__7600,m__7602,n__7604,o__7606,p__7608);
}
} else
{var q__7610 = cljs.core._first.call(null,args__7609);
var args__7611 = cljs.core._rest.call(null,args__7609);
if((argc === 17))
{if(f__7588.cljs$lang$arity$17)
{return f__7588.cljs$lang$arity$17(a__7578,b__7580,c__7582,d__7584,e__7586,f__7588,g__7590,h__7592,i__7594,j__7596,k__7598,l__7600,m__7602,n__7604,o__7606,p__7608,q__7610);
} else
{return f__7588.call(null,a__7578,b__7580,c__7582,d__7584,e__7586,f__7588,g__7590,h__7592,i__7594,j__7596,k__7598,l__7600,m__7602,n__7604,o__7606,p__7608,q__7610);
}
} else
{var r__7612 = cljs.core._first.call(null,args__7611);
var args__7613 = cljs.core._rest.call(null,args__7611);
if((argc === 18))
{if(f__7588.cljs$lang$arity$18)
{return f__7588.cljs$lang$arity$18(a__7578,b__7580,c__7582,d__7584,e__7586,f__7588,g__7590,h__7592,i__7594,j__7596,k__7598,l__7600,m__7602,n__7604,o__7606,p__7608,q__7610,r__7612);
} else
{return f__7588.call(null,a__7578,b__7580,c__7582,d__7584,e__7586,f__7588,g__7590,h__7592,i__7594,j__7596,k__7598,l__7600,m__7602,n__7604,o__7606,p__7608,q__7610,r__7612);
}
} else
{var s__7614 = cljs.core._first.call(null,args__7613);
var args__7615 = cljs.core._rest.call(null,args__7613);
if((argc === 19))
{if(f__7588.cljs$lang$arity$19)
{return f__7588.cljs$lang$arity$19(a__7578,b__7580,c__7582,d__7584,e__7586,f__7588,g__7590,h__7592,i__7594,j__7596,k__7598,l__7600,m__7602,n__7604,o__7606,p__7608,q__7610,r__7612,s__7614);
} else
{return f__7588.call(null,a__7578,b__7580,c__7582,d__7584,e__7586,f__7588,g__7590,h__7592,i__7594,j__7596,k__7598,l__7600,m__7602,n__7604,o__7606,p__7608,q__7610,r__7612,s__7614);
}
} else
{var t__7616 = cljs.core._first.call(null,args__7615);
var args__7617 = cljs.core._rest.call(null,args__7615);
if((argc === 20))
{if(f__7588.cljs$lang$arity$20)
{return f__7588.cljs$lang$arity$20(a__7578,b__7580,c__7582,d__7584,e__7586,f__7588,g__7590,h__7592,i__7594,j__7596,k__7598,l__7600,m__7602,n__7604,o__7606,p__7608,q__7610,r__7612,s__7614,t__7616);
} else
{return f__7588.call(null,a__7578,b__7580,c__7582,d__7584,e__7586,f__7588,g__7590,h__7592,i__7594,j__7596,k__7598,l__7600,m__7602,n__7604,o__7606,p__7608,q__7610,r__7612,s__7614,t__7616);
}
} else
{throw (new Error("Only up to 20 arguments supported on functions"));
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
/**
* Applies fn f to the argument list formed by prepending intervening arguments to args.
* First cut.  Not lazy.  Needs to use emitted toApply.
* @param {...*} var_args
*/
cljs.core.apply = (function() {
var apply = null;
var apply__2 = (function (f,args){
var fixed_arity__7632 = f.cljs$lang$maxFixedArity;
if(cljs.core.truth_(f.cljs$lang$applyTo))
{var bc__7633 = cljs.core.bounded_count.call(null,args,(fixed_arity__7632 + 1));
if((bc__7633 <= fixed_arity__7632))
{return cljs.core.apply_to.call(null,f,bc__7633,args);
} else
{return f.cljs$lang$applyTo(args);
}
} else
{return f.apply(f,cljs.core.to_array.call(null,args));
}
});
var apply__3 = (function (f,x,args){
var arglist__7634 = cljs.core.list_STAR_.call(null,x,args);
var fixed_arity__7635 = f.cljs$lang$maxFixedArity;
if(cljs.core.truth_(f.cljs$lang$applyTo))
{var bc__7636 = cljs.core.bounded_count.call(null,arglist__7634,(fixed_arity__7635 + 1));
if((bc__7636 <= fixed_arity__7635))
{return cljs.core.apply_to.call(null,f,bc__7636,arglist__7634);
} else
{return f.cljs$lang$applyTo(arglist__7634);
}
} else
{return f.apply(f,cljs.core.to_array.call(null,arglist__7634));
}
});
var apply__4 = (function (f,x,y,args){
var arglist__7637 = cljs.core.list_STAR_.call(null,x,y,args);
var fixed_arity__7638 = f.cljs$lang$maxFixedArity;
if(cljs.core.truth_(f.cljs$lang$applyTo))
{var bc__7639 = cljs.core.bounded_count.call(null,arglist__7637,(fixed_arity__7638 + 1));
if((bc__7639 <= fixed_arity__7638))
{return cljs.core.apply_to.call(null,f,bc__7639,arglist__7637);
} else
{return f.cljs$lang$applyTo(arglist__7637);
}
} else
{return f.apply(f,cljs.core.to_array.call(null,arglist__7637));
}
});
var apply__5 = (function (f,x,y,z,args){
var arglist__7640 = cljs.core.list_STAR_.call(null,x,y,z,args);
var fixed_arity__7641 = f.cljs$lang$maxFixedArity;
if(cljs.core.truth_(f.cljs$lang$applyTo))
{var bc__7642 = cljs.core.bounded_count.call(null,arglist__7640,(fixed_arity__7641 + 1));
if((bc__7642 <= fixed_arity__7641))
{return cljs.core.apply_to.call(null,f,bc__7642,arglist__7640);
} else
{return f.cljs$lang$applyTo(arglist__7640);
}
} else
{return f.apply(f,cljs.core.to_array.call(null,arglist__7640));
}
});
var apply__6 = (function() { 
var G__7646__delegate = function (f,a,b,c,d,args){
var arglist__7643 = cljs.core.cons.call(null,a,cljs.core.cons.call(null,b,cljs.core.cons.call(null,c,cljs.core.cons.call(null,d,cljs.core.spread.call(null,args)))));
var fixed_arity__7644 = f.cljs$lang$maxFixedArity;
if(cljs.core.truth_(f.cljs$lang$applyTo))
{var bc__7645 = cljs.core.bounded_count.call(null,arglist__7643,(fixed_arity__7644 + 1));
if((bc__7645 <= fixed_arity__7644))
{return cljs.core.apply_to.call(null,f,bc__7645,arglist__7643);
} else
{return f.cljs$lang$applyTo(arglist__7643);
}
} else
{return f.apply(f,cljs.core.to_array.call(null,arglist__7643));
}
};
var G__7646 = function (f,a,b,c,d,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 5),0);
} 
return G__7646__delegate.call(this, f, a, b, c, d, args);
};
G__7646.cljs$lang$maxFixedArity = 5;
G__7646.cljs$lang$applyTo = (function (arglist__7647){
var f = cljs.core.first(arglist__7647);
var a = cljs.core.first(cljs.core.next(arglist__7647));
var b = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7647)));
var c = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__7647))));
var d = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__7647)))));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__7647)))));
return G__7646__delegate(f, a, b, c, d, args);
});
G__7646.cljs$lang$arity$variadic = G__7646__delegate;
return G__7646;
})()
;
apply = function(f,a,b,c,d,var_args){
var args = var_args;
switch(arguments.length){
case 2:
return apply__2.call(this,f,a);
case 3:
return apply__3.call(this,f,a,b);
case 4:
return apply__4.call(this,f,a,b,c);
case 5:
return apply__5.call(this,f,a,b,c,d);
default:
return apply__6.cljs$lang$arity$variadic(f,a,b,c,d, cljs.core.array_seq(arguments, 5));
}
throw('Invalid arity: ' + arguments.length);
};
apply.cljs$lang$maxFixedArity = 5;
apply.cljs$lang$applyTo = apply__6.cljs$lang$applyTo;
apply.cljs$lang$arity$2 = apply__2;
apply.cljs$lang$arity$3 = apply__3;
apply.cljs$lang$arity$4 = apply__4;
apply.cljs$lang$arity$5 = apply__5;
apply.cljs$lang$arity$variadic = apply__6.cljs$lang$arity$variadic;
return apply;
})()
;
/**
* Returns an object of the same type and value as obj, with
* (apply f (meta obj) args) as its metadata.
* @param {...*} var_args
*/
cljs.core.vary_meta = (function() { 
var vary_meta__delegate = function (obj,f,args){
return cljs.core.with_meta.call(null,obj,cljs.core.apply.call(null,f,cljs.core.meta.call(null,obj),args));
};
var vary_meta = function (obj,f,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return vary_meta__delegate.call(this, obj, f, args);
};
vary_meta.cljs$lang$maxFixedArity = 2;
vary_meta.cljs$lang$applyTo = (function (arglist__7648){
var obj = cljs.core.first(arglist__7648);
var f = cljs.core.first(cljs.core.next(arglist__7648));
var args = cljs.core.rest(cljs.core.next(arglist__7648));
return vary_meta__delegate(obj, f, args);
});
vary_meta.cljs$lang$arity$variadic = vary_meta__delegate;
return vary_meta;
})()
;
/**
* Same as (not (= obj1 obj2))
* @param {...*} var_args
*/
cljs.core.not_EQ_ = (function() {
var not_EQ_ = null;
var not_EQ___1 = (function (x){
return false;
});
var not_EQ___2 = (function (x,y){
return !(cljs.core._EQ_.call(null,x,y));
});
var not_EQ___3 = (function() { 
var G__7649__delegate = function (x,y,more){
return cljs.core.not.call(null,cljs.core.apply.call(null,cljs.core._EQ_,x,y,more));
};
var G__7649 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7649__delegate.call(this, x, y, more);
};
G__7649.cljs$lang$maxFixedArity = 2;
G__7649.cljs$lang$applyTo = (function (arglist__7650){
var x = cljs.core.first(arglist__7650);
var y = cljs.core.first(cljs.core.next(arglist__7650));
var more = cljs.core.rest(cljs.core.next(arglist__7650));
return G__7649__delegate(x, y, more);
});
G__7649.cljs$lang$arity$variadic = G__7649__delegate;
return G__7649;
})()
;
not_EQ_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case 1:
return not_EQ___1.call(this,x);
case 2:
return not_EQ___2.call(this,x,y);
default:
return not_EQ___3.cljs$lang$arity$variadic(x,y, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
not_EQ_.cljs$lang$maxFixedArity = 2;
not_EQ_.cljs$lang$applyTo = not_EQ___3.cljs$lang$applyTo;
not_EQ_.cljs$lang$arity$1 = not_EQ___1;
not_EQ_.cljs$lang$arity$2 = not_EQ___2;
not_EQ_.cljs$lang$arity$variadic = not_EQ___3.cljs$lang$arity$variadic;
return not_EQ_;
})()
;
/**
* If coll is empty, returns nil, else coll
*/
cljs.core.not_empty = (function not_empty(coll){
if(cljs.core.seq.call(null,coll))
{return coll;
} else
{return null;
}
});
/**
* Returns true if (pred x) is logical true for every x in coll, else
* false.
*/
cljs.core.every_QMARK_ = (function every_QMARK_(pred,coll){
while(true){
if((cljs.core.seq.call(null,coll) == null))
{return true;
} else
{if(cljs.core.truth_(pred.call(null,cljs.core.first.call(null,coll))))
{{
var G__7651 = pred;
var G__7652 = cljs.core.next.call(null,coll);
pred = G__7651;
coll = G__7652;
continue;
}
} else
{if("\uFDD0'else")
{return false;
} else
{return null;
}
}
}
break;
}
});
/**
* Returns false if (pred x) is logical true for every x in
* coll, else true.
*/
cljs.core.not_every_QMARK_ = (function not_every_QMARK_(pred,coll){
return !(cljs.core.every_QMARK_.call(null,pred,coll));
});
/**
* Returns the first logical true value of (pred x) for any x in coll,
* else nil.  One common idiom is to use a set as pred, for example
* this will return :fred if :fred is in the sequence, otherwise nil:
* (some #{:fred} coll)
*/
cljs.core.some = (function some(pred,coll){
while(true){
if(cljs.core.seq.call(null,coll))
{var or__3824__auto____7654 = pred.call(null,cljs.core.first.call(null,coll));
if(cljs.core.truth_(or__3824__auto____7654))
{return or__3824__auto____7654;
} else
{{
var G__7655 = pred;
var G__7656 = cljs.core.next.call(null,coll);
pred = G__7655;
coll = G__7656;
continue;
}
}
} else
{return null;
}
break;
}
});
/**
* Returns false if (pred x) is logical true for any x in coll,
* else true.
*/
cljs.core.not_any_QMARK_ = (function not_any_QMARK_(pred,coll){
return cljs.core.not.call(null,cljs.core.some.call(null,pred,coll));
});
/**
* Returns true if n is even, throws an exception if n is not an integer
*/
cljs.core.even_QMARK_ = (function even_QMARK_(n){
if(cljs.core.integer_QMARK_.call(null,n))
{return ((n & 1) === 0);
} else
{throw (new Error([cljs.core.str("Argument must be an integer: "),cljs.core.str(n)].join('')));
}
});
/**
* Returns true if n is odd, throws an exception if n is not an integer
*/
cljs.core.odd_QMARK_ = (function odd_QMARK_(n){
return !(cljs.core.even_QMARK_.call(null,n));
});
cljs.core.identity = (function identity(x){
return x;
});
/**
* Takes a fn f and returns a fn that takes the same arguments as f,
* has the same effects, if any, and returns the opposite truth value.
*/
cljs.core.complement = (function complement(f){
return (function() {
var G__7657 = null;
var G__7657__0 = (function (){
return cljs.core.not.call(null,f.call(null));
});
var G__7657__1 = (function (x){
return cljs.core.not.call(null,f.call(null,x));
});
var G__7657__2 = (function (x,y){
return cljs.core.not.call(null,f.call(null,x,y));
});
var G__7657__3 = (function() { 
var G__7658__delegate = function (x,y,zs){
return cljs.core.not.call(null,cljs.core.apply.call(null,f,x,y,zs));
};
var G__7658 = function (x,y,var_args){
var zs = null;
if (goog.isDef(var_args)) {
  zs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7658__delegate.call(this, x, y, zs);
};
G__7658.cljs$lang$maxFixedArity = 2;
G__7658.cljs$lang$applyTo = (function (arglist__7659){
var x = cljs.core.first(arglist__7659);
var y = cljs.core.first(cljs.core.next(arglist__7659));
var zs = cljs.core.rest(cljs.core.next(arglist__7659));
return G__7658__delegate(x, y, zs);
});
G__7658.cljs$lang$arity$variadic = G__7658__delegate;
return G__7658;
})()
;
G__7657 = function(x,y,var_args){
var zs = var_args;
switch(arguments.length){
case 0:
return G__7657__0.call(this);
case 1:
return G__7657__1.call(this,x);
case 2:
return G__7657__2.call(this,x,y);
default:
return G__7657__3.cljs$lang$arity$variadic(x,y, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
G__7657.cljs$lang$maxFixedArity = 2;
G__7657.cljs$lang$applyTo = G__7657__3.cljs$lang$applyTo;
return G__7657;
})()
});
/**
* Returns a function that takes any number of arguments and returns x.
*/
cljs.core.constantly = (function constantly(x){
return (function() { 
var G__7660__delegate = function (args){
return x;
};
var G__7660 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__7660__delegate.call(this, args);
};
G__7660.cljs$lang$maxFixedArity = 0;
G__7660.cljs$lang$applyTo = (function (arglist__7661){
var args = cljs.core.seq(arglist__7661);;
return G__7660__delegate(args);
});
G__7660.cljs$lang$arity$variadic = G__7660__delegate;
return G__7660;
})()
;
});
/**
* Takes a set of functions and returns a fn that is the composition
* of those fns.  The returned fn takes a variable number of args,
* applies the rightmost of fns to the args, the next
* fn (right-to-left) to the result, etc.
* @param {...*} var_args
*/
cljs.core.comp = (function() {
var comp = null;
var comp__0 = (function (){
return cljs.core.identity;
});
var comp__1 = (function (f){
return f;
});
var comp__2 = (function (f,g){
return (function() {
var G__7668 = null;
var G__7668__0 = (function (){
return f.call(null,g.call(null));
});
var G__7668__1 = (function (x){
return f.call(null,g.call(null,x));
});
var G__7668__2 = (function (x,y){
return f.call(null,g.call(null,x,y));
});
var G__7668__3 = (function (x,y,z){
return f.call(null,g.call(null,x,y,z));
});
var G__7668__4 = (function() { 
var G__7669__delegate = function (x,y,z,args){
return f.call(null,cljs.core.apply.call(null,g,x,y,z,args));
};
var G__7669 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__7669__delegate.call(this, x, y, z, args);
};
G__7669.cljs$lang$maxFixedArity = 3;
G__7669.cljs$lang$applyTo = (function (arglist__7670){
var x = cljs.core.first(arglist__7670);
var y = cljs.core.first(cljs.core.next(arglist__7670));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7670)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7670)));
return G__7669__delegate(x, y, z, args);
});
G__7669.cljs$lang$arity$variadic = G__7669__delegate;
return G__7669;
})()
;
G__7668 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case 0:
return G__7668__0.call(this);
case 1:
return G__7668__1.call(this,x);
case 2:
return G__7668__2.call(this,x,y);
case 3:
return G__7668__3.call(this,x,y,z);
default:
return G__7668__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
G__7668.cljs$lang$maxFixedArity = 3;
G__7668.cljs$lang$applyTo = G__7668__4.cljs$lang$applyTo;
return G__7668;
})()
});
var comp__3 = (function (f,g,h){
return (function() {
var G__7671 = null;
var G__7671__0 = (function (){
return f.call(null,g.call(null,h.call(null)));
});
var G__7671__1 = (function (x){
return f.call(null,g.call(null,h.call(null,x)));
});
var G__7671__2 = (function (x,y){
return f.call(null,g.call(null,h.call(null,x,y)));
});
var G__7671__3 = (function (x,y,z){
return f.call(null,g.call(null,h.call(null,x,y,z)));
});
var G__7671__4 = (function() { 
var G__7672__delegate = function (x,y,z,args){
return f.call(null,g.call(null,cljs.core.apply.call(null,h,x,y,z,args)));
};
var G__7672 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__7672__delegate.call(this, x, y, z, args);
};
G__7672.cljs$lang$maxFixedArity = 3;
G__7672.cljs$lang$applyTo = (function (arglist__7673){
var x = cljs.core.first(arglist__7673);
var y = cljs.core.first(cljs.core.next(arglist__7673));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7673)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7673)));
return G__7672__delegate(x, y, z, args);
});
G__7672.cljs$lang$arity$variadic = G__7672__delegate;
return G__7672;
})()
;
G__7671 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case 0:
return G__7671__0.call(this);
case 1:
return G__7671__1.call(this,x);
case 2:
return G__7671__2.call(this,x,y);
case 3:
return G__7671__3.call(this,x,y,z);
default:
return G__7671__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
G__7671.cljs$lang$maxFixedArity = 3;
G__7671.cljs$lang$applyTo = G__7671__4.cljs$lang$applyTo;
return G__7671;
})()
});
var comp__4 = (function() { 
var G__7674__delegate = function (f1,f2,f3,fs){
var fs__7665 = cljs.core.reverse.call(null,cljs.core.list_STAR_.call(null,f1,f2,f3,fs));
return (function() { 
var G__7675__delegate = function (args){
var ret__7666 = cljs.core.apply.call(null,cljs.core.first.call(null,fs__7665),args);
var fs__7667 = cljs.core.next.call(null,fs__7665);
while(true){
if(fs__7667)
{{
var G__7676 = cljs.core.first.call(null,fs__7667).call(null,ret__7666);
var G__7677 = cljs.core.next.call(null,fs__7667);
ret__7666 = G__7676;
fs__7667 = G__7677;
continue;
}
} else
{return ret__7666;
}
break;
}
};
var G__7675 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__7675__delegate.call(this, args);
};
G__7675.cljs$lang$maxFixedArity = 0;
G__7675.cljs$lang$applyTo = (function (arglist__7678){
var args = cljs.core.seq(arglist__7678);;
return G__7675__delegate(args);
});
G__7675.cljs$lang$arity$variadic = G__7675__delegate;
return G__7675;
})()
;
};
var G__7674 = function (f1,f2,f3,var_args){
var fs = null;
if (goog.isDef(var_args)) {
  fs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__7674__delegate.call(this, f1, f2, f3, fs);
};
G__7674.cljs$lang$maxFixedArity = 3;
G__7674.cljs$lang$applyTo = (function (arglist__7679){
var f1 = cljs.core.first(arglist__7679);
var f2 = cljs.core.first(cljs.core.next(arglist__7679));
var f3 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7679)));
var fs = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7679)));
return G__7674__delegate(f1, f2, f3, fs);
});
G__7674.cljs$lang$arity$variadic = G__7674__delegate;
return G__7674;
})()
;
comp = function(f1,f2,f3,var_args){
var fs = var_args;
switch(arguments.length){
case 0:
return comp__0.call(this);
case 1:
return comp__1.call(this,f1);
case 2:
return comp__2.call(this,f1,f2);
case 3:
return comp__3.call(this,f1,f2,f3);
default:
return comp__4.cljs$lang$arity$variadic(f1,f2,f3, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
comp.cljs$lang$maxFixedArity = 3;
comp.cljs$lang$applyTo = comp__4.cljs$lang$applyTo;
comp.cljs$lang$arity$0 = comp__0;
comp.cljs$lang$arity$1 = comp__1;
comp.cljs$lang$arity$2 = comp__2;
comp.cljs$lang$arity$3 = comp__3;
comp.cljs$lang$arity$variadic = comp__4.cljs$lang$arity$variadic;
return comp;
})()
;
/**
* Takes a function f and fewer than the normal arguments to f, and
* returns a fn that takes a variable number of additional args. When
* called, the returned function calls f with args + additional args.
* @param {...*} var_args
*/
cljs.core.partial = (function() {
var partial = null;
var partial__2 = (function (f,arg1){
return (function() { 
var G__7680__delegate = function (args){
return cljs.core.apply.call(null,f,arg1,args);
};
var G__7680 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__7680__delegate.call(this, args);
};
G__7680.cljs$lang$maxFixedArity = 0;
G__7680.cljs$lang$applyTo = (function (arglist__7681){
var args = cljs.core.seq(arglist__7681);;
return G__7680__delegate(args);
});
G__7680.cljs$lang$arity$variadic = G__7680__delegate;
return G__7680;
})()
;
});
var partial__3 = (function (f,arg1,arg2){
return (function() { 
var G__7682__delegate = function (args){
return cljs.core.apply.call(null,f,arg1,arg2,args);
};
var G__7682 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__7682__delegate.call(this, args);
};
G__7682.cljs$lang$maxFixedArity = 0;
G__7682.cljs$lang$applyTo = (function (arglist__7683){
var args = cljs.core.seq(arglist__7683);;
return G__7682__delegate(args);
});
G__7682.cljs$lang$arity$variadic = G__7682__delegate;
return G__7682;
})()
;
});
var partial__4 = (function (f,arg1,arg2,arg3){
return (function() { 
var G__7684__delegate = function (args){
return cljs.core.apply.call(null,f,arg1,arg2,arg3,args);
};
var G__7684 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__7684__delegate.call(this, args);
};
G__7684.cljs$lang$maxFixedArity = 0;
G__7684.cljs$lang$applyTo = (function (arglist__7685){
var args = cljs.core.seq(arglist__7685);;
return G__7684__delegate(args);
});
G__7684.cljs$lang$arity$variadic = G__7684__delegate;
return G__7684;
})()
;
});
var partial__5 = (function() { 
var G__7686__delegate = function (f,arg1,arg2,arg3,more){
return (function() { 
var G__7687__delegate = function (args){
return cljs.core.apply.call(null,f,arg1,arg2,arg3,cljs.core.concat.call(null,more,args));
};
var G__7687 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__7687__delegate.call(this, args);
};
G__7687.cljs$lang$maxFixedArity = 0;
G__7687.cljs$lang$applyTo = (function (arglist__7688){
var args = cljs.core.seq(arglist__7688);;
return G__7687__delegate(args);
});
G__7687.cljs$lang$arity$variadic = G__7687__delegate;
return G__7687;
})()
;
};
var G__7686 = function (f,arg1,arg2,arg3,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4),0);
} 
return G__7686__delegate.call(this, f, arg1, arg2, arg3, more);
};
G__7686.cljs$lang$maxFixedArity = 4;
G__7686.cljs$lang$applyTo = (function (arglist__7689){
var f = cljs.core.first(arglist__7689);
var arg1 = cljs.core.first(cljs.core.next(arglist__7689));
var arg2 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7689)));
var arg3 = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__7689))));
var more = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__7689))));
return G__7686__delegate(f, arg1, arg2, arg3, more);
});
G__7686.cljs$lang$arity$variadic = G__7686__delegate;
return G__7686;
})()
;
partial = function(f,arg1,arg2,arg3,var_args){
var more = var_args;
switch(arguments.length){
case 2:
return partial__2.call(this,f,arg1);
case 3:
return partial__3.call(this,f,arg1,arg2);
case 4:
return partial__4.call(this,f,arg1,arg2,arg3);
default:
return partial__5.cljs$lang$arity$variadic(f,arg1,arg2,arg3, cljs.core.array_seq(arguments, 4));
}
throw('Invalid arity: ' + arguments.length);
};
partial.cljs$lang$maxFixedArity = 4;
partial.cljs$lang$applyTo = partial__5.cljs$lang$applyTo;
partial.cljs$lang$arity$2 = partial__2;
partial.cljs$lang$arity$3 = partial__3;
partial.cljs$lang$arity$4 = partial__4;
partial.cljs$lang$arity$variadic = partial__5.cljs$lang$arity$variadic;
return partial;
})()
;
/**
* Takes a function f, and returns a function that calls f, replacing
* a nil first argument to f with the supplied value x. Higher arity
* versions can replace arguments in the second and third
* positions (y, z). Note that the function f can take any number of
* arguments, not just the one(s) being nil-patched.
*/
cljs.core.fnil = (function() {
var fnil = null;
var fnil__2 = (function (f,x){
return (function() {
var G__7690 = null;
var G__7690__1 = (function (a){
return f.call(null,(((a == null))?x:a));
});
var G__7690__2 = (function (a,b){
return f.call(null,(((a == null))?x:a),b);
});
var G__7690__3 = (function (a,b,c){
return f.call(null,(((a == null))?x:a),b,c);
});
var G__7690__4 = (function() { 
var G__7691__delegate = function (a,b,c,ds){
return cljs.core.apply.call(null,f,(((a == null))?x:a),b,c,ds);
};
var G__7691 = function (a,b,c,var_args){
var ds = null;
if (goog.isDef(var_args)) {
  ds = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__7691__delegate.call(this, a, b, c, ds);
};
G__7691.cljs$lang$maxFixedArity = 3;
G__7691.cljs$lang$applyTo = (function (arglist__7692){
var a = cljs.core.first(arglist__7692);
var b = cljs.core.first(cljs.core.next(arglist__7692));
var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7692)));
var ds = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7692)));
return G__7691__delegate(a, b, c, ds);
});
G__7691.cljs$lang$arity$variadic = G__7691__delegate;
return G__7691;
})()
;
G__7690 = function(a,b,c,var_args){
var ds = var_args;
switch(arguments.length){
case 1:
return G__7690__1.call(this,a);
case 2:
return G__7690__2.call(this,a,b);
case 3:
return G__7690__3.call(this,a,b,c);
default:
return G__7690__4.cljs$lang$arity$variadic(a,b,c, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
G__7690.cljs$lang$maxFixedArity = 3;
G__7690.cljs$lang$applyTo = G__7690__4.cljs$lang$applyTo;
return G__7690;
})()
});
var fnil__3 = (function (f,x,y){
return (function() {
var G__7693 = null;
var G__7693__2 = (function (a,b){
return f.call(null,(((a == null))?x:a),(((b == null))?y:b));
});
var G__7693__3 = (function (a,b,c){
return f.call(null,(((a == null))?x:a),(((b == null))?y:b),c);
});
var G__7693__4 = (function() { 
var G__7694__delegate = function (a,b,c,ds){
return cljs.core.apply.call(null,f,(((a == null))?x:a),(((b == null))?y:b),c,ds);
};
var G__7694 = function (a,b,c,var_args){
var ds = null;
if (goog.isDef(var_args)) {
  ds = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__7694__delegate.call(this, a, b, c, ds);
};
G__7694.cljs$lang$maxFixedArity = 3;
G__7694.cljs$lang$applyTo = (function (arglist__7695){
var a = cljs.core.first(arglist__7695);
var b = cljs.core.first(cljs.core.next(arglist__7695));
var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7695)));
var ds = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7695)));
return G__7694__delegate(a, b, c, ds);
});
G__7694.cljs$lang$arity$variadic = G__7694__delegate;
return G__7694;
})()
;
G__7693 = function(a,b,c,var_args){
var ds = var_args;
switch(arguments.length){
case 2:
return G__7693__2.call(this,a,b);
case 3:
return G__7693__3.call(this,a,b,c);
default:
return G__7693__4.cljs$lang$arity$variadic(a,b,c, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
G__7693.cljs$lang$maxFixedArity = 3;
G__7693.cljs$lang$applyTo = G__7693__4.cljs$lang$applyTo;
return G__7693;
})()
});
var fnil__4 = (function (f,x,y,z){
return (function() {
var G__7696 = null;
var G__7696__2 = (function (a,b){
return f.call(null,(((a == null))?x:a),(((b == null))?y:b));
});
var G__7696__3 = (function (a,b,c){
return f.call(null,(((a == null))?x:a),(((b == null))?y:b),(((c == null))?z:c));
});
var G__7696__4 = (function() { 
var G__7697__delegate = function (a,b,c,ds){
return cljs.core.apply.call(null,f,(((a == null))?x:a),(((b == null))?y:b),(((c == null))?z:c),ds);
};
var G__7697 = function (a,b,c,var_args){
var ds = null;
if (goog.isDef(var_args)) {
  ds = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__7697__delegate.call(this, a, b, c, ds);
};
G__7697.cljs$lang$maxFixedArity = 3;
G__7697.cljs$lang$applyTo = (function (arglist__7698){
var a = cljs.core.first(arglist__7698);
var b = cljs.core.first(cljs.core.next(arglist__7698));
var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7698)));
var ds = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7698)));
return G__7697__delegate(a, b, c, ds);
});
G__7697.cljs$lang$arity$variadic = G__7697__delegate;
return G__7697;
})()
;
G__7696 = function(a,b,c,var_args){
var ds = var_args;
switch(arguments.length){
case 2:
return G__7696__2.call(this,a,b);
case 3:
return G__7696__3.call(this,a,b,c);
default:
return G__7696__4.cljs$lang$arity$variadic(a,b,c, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
G__7696.cljs$lang$maxFixedArity = 3;
G__7696.cljs$lang$applyTo = G__7696__4.cljs$lang$applyTo;
return G__7696;
})()
});
fnil = function(f,x,y,z){
switch(arguments.length){
case 2:
return fnil__2.call(this,f,x);
case 3:
return fnil__3.call(this,f,x,y);
case 4:
return fnil__4.call(this,f,x,y,z);
}
throw('Invalid arity: ' + arguments.length);
};
fnil.cljs$lang$arity$2 = fnil__2;
fnil.cljs$lang$arity$3 = fnil__3;
fnil.cljs$lang$arity$4 = fnil__4;
return fnil;
})()
;
/**
* Returns a lazy sequence consisting of the result of applying f to 0
* and the first item of coll, followed by applying f to 1 and the second
* item in coll, etc, until coll is exhausted. Thus function f should
* accept 2 arguments, index and item.
*/
cljs.core.map_indexed = (function map_indexed(f,coll){
var mapi__7714 = (function mapi(idx,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3974__auto____7722 = cljs.core.seq.call(null,coll);
if(temp__3974__auto____7722)
{var s__7723 = temp__3974__auto____7722;
if(cljs.core.chunked_seq_QMARK_.call(null,s__7723))
{var c__7724 = cljs.core.chunk_first.call(null,s__7723);
var size__7725 = cljs.core.count.call(null,c__7724);
var b__7726 = cljs.core.chunk_buffer.call(null,size__7725);
var n__2533__auto____7727 = size__7725;
var i__7728 = 0;
while(true){
if((i__7728 < n__2533__auto____7727))
{cljs.core.chunk_append.call(null,b__7726,f.call(null,(idx + i__7728),cljs.core._nth.call(null,c__7724,i__7728)));
{
var G__7729 = (i__7728 + 1);
i__7728 = G__7729;
continue;
}
} else
{}
break;
}
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__7726),mapi.call(null,(idx + size__7725),cljs.core.chunk_rest.call(null,s__7723)));
} else
{return cljs.core.cons.call(null,f.call(null,idx,cljs.core.first.call(null,s__7723)),mapi.call(null,(idx + 1),cljs.core.rest.call(null,s__7723)));
}
} else
{return null;
}
}),null));
});
return mapi__7714.call(null,0,coll);
});
/**
* Returns a lazy sequence of the non-nil results of (f item). Note,
* this means false return values will be included.  f must be free of
* side-effects.
*/
cljs.core.keep = (function keep(f,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3974__auto____7739 = cljs.core.seq.call(null,coll);
if(temp__3974__auto____7739)
{var s__7740 = temp__3974__auto____7739;
if(cljs.core.chunked_seq_QMARK_.call(null,s__7740))
{var c__7741 = cljs.core.chunk_first.call(null,s__7740);
var size__7742 = cljs.core.count.call(null,c__7741);
var b__7743 = cljs.core.chunk_buffer.call(null,size__7742);
var n__2533__auto____7744 = size__7742;
var i__7745 = 0;
while(true){
if((i__7745 < n__2533__auto____7744))
{var x__7746 = f.call(null,cljs.core._nth.call(null,c__7741,i__7745));
if((x__7746 == null))
{} else
{cljs.core.chunk_append.call(null,b__7743,x__7746);
}
{
var G__7748 = (i__7745 + 1);
i__7745 = G__7748;
continue;
}
} else
{}
break;
}
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__7743),keep.call(null,f,cljs.core.chunk_rest.call(null,s__7740)));
} else
{var x__7747 = f.call(null,cljs.core.first.call(null,s__7740));
if((x__7747 == null))
{return keep.call(null,f,cljs.core.rest.call(null,s__7740));
} else
{return cljs.core.cons.call(null,x__7747,keep.call(null,f,cljs.core.rest.call(null,s__7740)));
}
}
} else
{return null;
}
}),null));
});
/**
* Returns a lazy sequence of the non-nil results of (f index item). Note,
* this means false return values will be included.  f must be free of
* side-effects.
*/
cljs.core.keep_indexed = (function keep_indexed(f,coll){
var keepi__7774 = (function keepi(idx,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3974__auto____7784 = cljs.core.seq.call(null,coll);
if(temp__3974__auto____7784)
{var s__7785 = temp__3974__auto____7784;
if(cljs.core.chunked_seq_QMARK_.call(null,s__7785))
{var c__7786 = cljs.core.chunk_first.call(null,s__7785);
var size__7787 = cljs.core.count.call(null,c__7786);
var b__7788 = cljs.core.chunk_buffer.call(null,size__7787);
var n__2533__auto____7789 = size__7787;
var i__7790 = 0;
while(true){
if((i__7790 < n__2533__auto____7789))
{var x__7791 = f.call(null,(idx + i__7790),cljs.core._nth.call(null,c__7786,i__7790));
if((x__7791 == null))
{} else
{cljs.core.chunk_append.call(null,b__7788,x__7791);
}
{
var G__7793 = (i__7790 + 1);
i__7790 = G__7793;
continue;
}
} else
{}
break;
}
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__7788),keepi.call(null,(idx + size__7787),cljs.core.chunk_rest.call(null,s__7785)));
} else
{var x__7792 = f.call(null,idx,cljs.core.first.call(null,s__7785));
if((x__7792 == null))
{return keepi.call(null,(idx + 1),cljs.core.rest.call(null,s__7785));
} else
{return cljs.core.cons.call(null,x__7792,keepi.call(null,(idx + 1),cljs.core.rest.call(null,s__7785)));
}
}
} else
{return null;
}
}),null));
});
return keepi__7774.call(null,0,coll);
});
/**
* Takes a set of predicates and returns a function f that returns true if all of its
* composing predicates return a logical true value against all of its arguments, else it returns
* false. Note that f is short-circuiting in that it will stop execution on the first
* argument that triggers a logical false result against the original predicates.
* @param {...*} var_args
*/
cljs.core.every_pred = (function() {
var every_pred = null;
var every_pred__1 = (function (p){
return (function() {
var ep1 = null;
var ep1__0 = (function (){
return true;
});
var ep1__1 = (function (x){
return cljs.core.boolean$.call(null,p.call(null,x));
});
var ep1__2 = (function (x,y){
return cljs.core.boolean$.call(null,(function (){var and__3822__auto____7879 = p.call(null,x);
if(cljs.core.truth_(and__3822__auto____7879))
{return p.call(null,y);
} else
{return and__3822__auto____7879;
}
})());
});
var ep1__3 = (function (x,y,z){
return cljs.core.boolean$.call(null,(function (){var and__3822__auto____7880 = p.call(null,x);
if(cljs.core.truth_(and__3822__auto____7880))
{var and__3822__auto____7881 = p.call(null,y);
if(cljs.core.truth_(and__3822__auto____7881))
{return p.call(null,z);
} else
{return and__3822__auto____7881;
}
} else
{return and__3822__auto____7880;
}
})());
});
var ep1__4 = (function() { 
var G__7950__delegate = function (x,y,z,args){
return cljs.core.boolean$.call(null,(function (){var and__3822__auto____7882 = ep1.call(null,x,y,z);
if(cljs.core.truth_(and__3822__auto____7882))
{return cljs.core.every_QMARK_.call(null,p,args);
} else
{return and__3822__auto____7882;
}
})());
};
var G__7950 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__7950__delegate.call(this, x, y, z, args);
};
G__7950.cljs$lang$maxFixedArity = 3;
G__7950.cljs$lang$applyTo = (function (arglist__7951){
var x = cljs.core.first(arglist__7951);
var y = cljs.core.first(cljs.core.next(arglist__7951));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7951)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7951)));
return G__7950__delegate(x, y, z, args);
});
G__7950.cljs$lang$arity$variadic = G__7950__delegate;
return G__7950;
})()
;
ep1 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case 0:
return ep1__0.call(this);
case 1:
return ep1__1.call(this,x);
case 2:
return ep1__2.call(this,x,y);
case 3:
return ep1__3.call(this,x,y,z);
default:
return ep1__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
ep1.cljs$lang$maxFixedArity = 3;
ep1.cljs$lang$applyTo = ep1__4.cljs$lang$applyTo;
ep1.cljs$lang$arity$0 = ep1__0;
ep1.cljs$lang$arity$1 = ep1__1;
ep1.cljs$lang$arity$2 = ep1__2;
ep1.cljs$lang$arity$3 = ep1__3;
ep1.cljs$lang$arity$variadic = ep1__4.cljs$lang$arity$variadic;
return ep1;
})()
});
var every_pred__2 = (function (p1,p2){
return (function() {
var ep2 = null;
var ep2__0 = (function (){
return true;
});
var ep2__1 = (function (x){
return cljs.core.boolean$.call(null,(function (){var and__3822__auto____7894 = p1.call(null,x);
if(cljs.core.truth_(and__3822__auto____7894))
{return p2.call(null,x);
} else
{return and__3822__auto____7894;
}
})());
});
var ep2__2 = (function (x,y){
return cljs.core.boolean$.call(null,(function (){var and__3822__auto____7895 = p1.call(null,x);
if(cljs.core.truth_(and__3822__auto____7895))
{var and__3822__auto____7896 = p1.call(null,y);
if(cljs.core.truth_(and__3822__auto____7896))
{var and__3822__auto____7897 = p2.call(null,x);
if(cljs.core.truth_(and__3822__auto____7897))
{return p2.call(null,y);
} else
{return and__3822__auto____7897;
}
} else
{return and__3822__auto____7896;
}
} else
{return and__3822__auto____7895;
}
})());
});
var ep2__3 = (function (x,y,z){
return cljs.core.boolean$.call(null,(function (){var and__3822__auto____7898 = p1.call(null,x);
if(cljs.core.truth_(and__3822__auto____7898))
{var and__3822__auto____7899 = p1.call(null,y);
if(cljs.core.truth_(and__3822__auto____7899))
{var and__3822__auto____7900 = p1.call(null,z);
if(cljs.core.truth_(and__3822__auto____7900))
{var and__3822__auto____7901 = p2.call(null,x);
if(cljs.core.truth_(and__3822__auto____7901))
{var and__3822__auto____7902 = p2.call(null,y);
if(cljs.core.truth_(and__3822__auto____7902))
{return p2.call(null,z);
} else
{return and__3822__auto____7902;
}
} else
{return and__3822__auto____7901;
}
} else
{return and__3822__auto____7900;
}
} else
{return and__3822__auto____7899;
}
} else
{return and__3822__auto____7898;
}
})());
});
var ep2__4 = (function() { 
var G__7952__delegate = function (x,y,z,args){
return cljs.core.boolean$.call(null,(function (){var and__3822__auto____7903 = ep2.call(null,x,y,z);
if(cljs.core.truth_(and__3822__auto____7903))
{return cljs.core.every_QMARK_.call(null,(function (p1__7749_SHARP_){
var and__3822__auto____7904 = p1.call(null,p1__7749_SHARP_);
if(cljs.core.truth_(and__3822__auto____7904))
{return p2.call(null,p1__7749_SHARP_);
} else
{return and__3822__auto____7904;
}
}),args);
} else
{return and__3822__auto____7903;
}
})());
};
var G__7952 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__7952__delegate.call(this, x, y, z, args);
};
G__7952.cljs$lang$maxFixedArity = 3;
G__7952.cljs$lang$applyTo = (function (arglist__7953){
var x = cljs.core.first(arglist__7953);
var y = cljs.core.first(cljs.core.next(arglist__7953));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7953)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7953)));
return G__7952__delegate(x, y, z, args);
});
G__7952.cljs$lang$arity$variadic = G__7952__delegate;
return G__7952;
})()
;
ep2 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case 0:
return ep2__0.call(this);
case 1:
return ep2__1.call(this,x);
case 2:
return ep2__2.call(this,x,y);
case 3:
return ep2__3.call(this,x,y,z);
default:
return ep2__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
ep2.cljs$lang$maxFixedArity = 3;
ep2.cljs$lang$applyTo = ep2__4.cljs$lang$applyTo;
ep2.cljs$lang$arity$0 = ep2__0;
ep2.cljs$lang$arity$1 = ep2__1;
ep2.cljs$lang$arity$2 = ep2__2;
ep2.cljs$lang$arity$3 = ep2__3;
ep2.cljs$lang$arity$variadic = ep2__4.cljs$lang$arity$variadic;
return ep2;
})()
});
var every_pred__3 = (function (p1,p2,p3){
return (function() {
var ep3 = null;
var ep3__0 = (function (){
return true;
});
var ep3__1 = (function (x){
return cljs.core.boolean$.call(null,(function (){var and__3822__auto____7923 = p1.call(null,x);
if(cljs.core.truth_(and__3822__auto____7923))
{var and__3822__auto____7924 = p2.call(null,x);
if(cljs.core.truth_(and__3822__auto____7924))
{return p3.call(null,x);
} else
{return and__3822__auto____7924;
}
} else
{return and__3822__auto____7923;
}
})());
});
var ep3__2 = (function (x,y){
return cljs.core.boolean$.call(null,(function (){var and__3822__auto____7925 = p1.call(null,x);
if(cljs.core.truth_(and__3822__auto____7925))
{var and__3822__auto____7926 = p2.call(null,x);
if(cljs.core.truth_(and__3822__auto____7926))
{var and__3822__auto____7927 = p3.call(null,x);
if(cljs.core.truth_(and__3822__auto____7927))
{var and__3822__auto____7928 = p1.call(null,y);
if(cljs.core.truth_(and__3822__auto____7928))
{var and__3822__auto____7929 = p2.call(null,y);
if(cljs.core.truth_(and__3822__auto____7929))
{return p3.call(null,y);
} else
{return and__3822__auto____7929;
}
} else
{return and__3822__auto____7928;
}
} else
{return and__3822__auto____7927;
}
} else
{return and__3822__auto____7926;
}
} else
{return and__3822__auto____7925;
}
})());
});
var ep3__3 = (function (x,y,z){
return cljs.core.boolean$.call(null,(function (){var and__3822__auto____7930 = p1.call(null,x);
if(cljs.core.truth_(and__3822__auto____7930))
{var and__3822__auto____7931 = p2.call(null,x);
if(cljs.core.truth_(and__3822__auto____7931))
{var and__3822__auto____7932 = p3.call(null,x);
if(cljs.core.truth_(and__3822__auto____7932))
{var and__3822__auto____7933 = p1.call(null,y);
if(cljs.core.truth_(and__3822__auto____7933))
{var and__3822__auto____7934 = p2.call(null,y);
if(cljs.core.truth_(and__3822__auto____7934))
{var and__3822__auto____7935 = p3.call(null,y);
if(cljs.core.truth_(and__3822__auto____7935))
{var and__3822__auto____7936 = p1.call(null,z);
if(cljs.core.truth_(and__3822__auto____7936))
{var and__3822__auto____7937 = p2.call(null,z);
if(cljs.core.truth_(and__3822__auto____7937))
{return p3.call(null,z);
} else
{return and__3822__auto____7937;
}
} else
{return and__3822__auto____7936;
}
} else
{return and__3822__auto____7935;
}
} else
{return and__3822__auto____7934;
}
} else
{return and__3822__auto____7933;
}
} else
{return and__3822__auto____7932;
}
} else
{return and__3822__auto____7931;
}
} else
{return and__3822__auto____7930;
}
})());
});
var ep3__4 = (function() { 
var G__7954__delegate = function (x,y,z,args){
return cljs.core.boolean$.call(null,(function (){var and__3822__auto____7938 = ep3.call(null,x,y,z);
if(cljs.core.truth_(and__3822__auto____7938))
{return cljs.core.every_QMARK_.call(null,(function (p1__7750_SHARP_){
var and__3822__auto____7939 = p1.call(null,p1__7750_SHARP_);
if(cljs.core.truth_(and__3822__auto____7939))
{var and__3822__auto____7940 = p2.call(null,p1__7750_SHARP_);
if(cljs.core.truth_(and__3822__auto____7940))
{return p3.call(null,p1__7750_SHARP_);
} else
{return and__3822__auto____7940;
}
} else
{return and__3822__auto____7939;
}
}),args);
} else
{return and__3822__auto____7938;
}
})());
};
var G__7954 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__7954__delegate.call(this, x, y, z, args);
};
G__7954.cljs$lang$maxFixedArity = 3;
G__7954.cljs$lang$applyTo = (function (arglist__7955){
var x = cljs.core.first(arglist__7955);
var y = cljs.core.first(cljs.core.next(arglist__7955));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7955)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7955)));
return G__7954__delegate(x, y, z, args);
});
G__7954.cljs$lang$arity$variadic = G__7954__delegate;
return G__7954;
})()
;
ep3 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case 0:
return ep3__0.call(this);
case 1:
return ep3__1.call(this,x);
case 2:
return ep3__2.call(this,x,y);
case 3:
return ep3__3.call(this,x,y,z);
default:
return ep3__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
ep3.cljs$lang$maxFixedArity = 3;
ep3.cljs$lang$applyTo = ep3__4.cljs$lang$applyTo;
ep3.cljs$lang$arity$0 = ep3__0;
ep3.cljs$lang$arity$1 = ep3__1;
ep3.cljs$lang$arity$2 = ep3__2;
ep3.cljs$lang$arity$3 = ep3__3;
ep3.cljs$lang$arity$variadic = ep3__4.cljs$lang$arity$variadic;
return ep3;
})()
});
var every_pred__4 = (function() { 
var G__7956__delegate = function (p1,p2,p3,ps){
var ps__7941 = cljs.core.list_STAR_.call(null,p1,p2,p3,ps);
return (function() {
var epn = null;
var epn__0 = (function (){
return true;
});
var epn__1 = (function (x){
return cljs.core.every_QMARK_.call(null,(function (p1__7751_SHARP_){
return p1__7751_SHARP_.call(null,x);
}),ps__7941);
});
var epn__2 = (function (x,y){
return cljs.core.every_QMARK_.call(null,(function (p1__7752_SHARP_){
var and__3822__auto____7946 = p1__7752_SHARP_.call(null,x);
if(cljs.core.truth_(and__3822__auto____7946))
{return p1__7752_SHARP_.call(null,y);
} else
{return and__3822__auto____7946;
}
}),ps__7941);
});
var epn__3 = (function (x,y,z){
return cljs.core.every_QMARK_.call(null,(function (p1__7753_SHARP_){
var and__3822__auto____7947 = p1__7753_SHARP_.call(null,x);
if(cljs.core.truth_(and__3822__auto____7947))
{var and__3822__auto____7948 = p1__7753_SHARP_.call(null,y);
if(cljs.core.truth_(and__3822__auto____7948))
{return p1__7753_SHARP_.call(null,z);
} else
{return and__3822__auto____7948;
}
} else
{return and__3822__auto____7947;
}
}),ps__7941);
});
var epn__4 = (function() { 
var G__7957__delegate = function (x,y,z,args){
return cljs.core.boolean$.call(null,(function (){var and__3822__auto____7949 = epn.call(null,x,y,z);
if(cljs.core.truth_(and__3822__auto____7949))
{return cljs.core.every_QMARK_.call(null,(function (p1__7754_SHARP_){
return cljs.core.every_QMARK_.call(null,p1__7754_SHARP_,args);
}),ps__7941);
} else
{return and__3822__auto____7949;
}
})());
};
var G__7957 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__7957__delegate.call(this, x, y, z, args);
};
G__7957.cljs$lang$maxFixedArity = 3;
G__7957.cljs$lang$applyTo = (function (arglist__7958){
var x = cljs.core.first(arglist__7958);
var y = cljs.core.first(cljs.core.next(arglist__7958));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7958)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7958)));
return G__7957__delegate(x, y, z, args);
});
G__7957.cljs$lang$arity$variadic = G__7957__delegate;
return G__7957;
})()
;
epn = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case 0:
return epn__0.call(this);
case 1:
return epn__1.call(this,x);
case 2:
return epn__2.call(this,x,y);
case 3:
return epn__3.call(this,x,y,z);
default:
return epn__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
epn.cljs$lang$maxFixedArity = 3;
epn.cljs$lang$applyTo = epn__4.cljs$lang$applyTo;
epn.cljs$lang$arity$0 = epn__0;
epn.cljs$lang$arity$1 = epn__1;
epn.cljs$lang$arity$2 = epn__2;
epn.cljs$lang$arity$3 = epn__3;
epn.cljs$lang$arity$variadic = epn__4.cljs$lang$arity$variadic;
return epn;
})()
};
var G__7956 = function (p1,p2,p3,var_args){
var ps = null;
if (goog.isDef(var_args)) {
  ps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__7956__delegate.call(this, p1, p2, p3, ps);
};
G__7956.cljs$lang$maxFixedArity = 3;
G__7956.cljs$lang$applyTo = (function (arglist__7959){
var p1 = cljs.core.first(arglist__7959);
var p2 = cljs.core.first(cljs.core.next(arglist__7959));
var p3 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7959)));
var ps = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7959)));
return G__7956__delegate(p1, p2, p3, ps);
});
G__7956.cljs$lang$arity$variadic = G__7956__delegate;
return G__7956;
})()
;
every_pred = function(p1,p2,p3,var_args){
var ps = var_args;
switch(arguments.length){
case 1:
return every_pred__1.call(this,p1);
case 2:
return every_pred__2.call(this,p1,p2);
case 3:
return every_pred__3.call(this,p1,p2,p3);
default:
return every_pred__4.cljs$lang$arity$variadic(p1,p2,p3, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
every_pred.cljs$lang$maxFixedArity = 3;
every_pred.cljs$lang$applyTo = every_pred__4.cljs$lang$applyTo;
every_pred.cljs$lang$arity$1 = every_pred__1;
every_pred.cljs$lang$arity$2 = every_pred__2;
every_pred.cljs$lang$arity$3 = every_pred__3;
every_pred.cljs$lang$arity$variadic = every_pred__4.cljs$lang$arity$variadic;
return every_pred;
})()
;
/**
* Takes a set of predicates and returns a function f that returns the first logical true value
* returned by one of its composing predicates against any of its arguments, else it returns
* logical false. Note that f is short-circuiting in that it will stop execution on the first
* argument that triggers a logical true result against the original predicates.
* @param {...*} var_args
*/
cljs.core.some_fn = (function() {
var some_fn = null;
var some_fn__1 = (function (p){
return (function() {
var sp1 = null;
var sp1__0 = (function (){
return null;
});
var sp1__1 = (function (x){
return p.call(null,x);
});
var sp1__2 = (function (x,y){
var or__3824__auto____8040 = p.call(null,x);
if(cljs.core.truth_(or__3824__auto____8040))
{return or__3824__auto____8040;
} else
{return p.call(null,y);
}
});
var sp1__3 = (function (x,y,z){
var or__3824__auto____8041 = p.call(null,x);
if(cljs.core.truth_(or__3824__auto____8041))
{return or__3824__auto____8041;
} else
{var or__3824__auto____8042 = p.call(null,y);
if(cljs.core.truth_(or__3824__auto____8042))
{return or__3824__auto____8042;
} else
{return p.call(null,z);
}
}
});
var sp1__4 = (function() { 
var G__8111__delegate = function (x,y,z,args){
var or__3824__auto____8043 = sp1.call(null,x,y,z);
if(cljs.core.truth_(or__3824__auto____8043))
{return or__3824__auto____8043;
} else
{return cljs.core.some.call(null,p,args);
}
};
var G__8111 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__8111__delegate.call(this, x, y, z, args);
};
G__8111.cljs$lang$maxFixedArity = 3;
G__8111.cljs$lang$applyTo = (function (arglist__8112){
var x = cljs.core.first(arglist__8112);
var y = cljs.core.first(cljs.core.next(arglist__8112));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8112)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8112)));
return G__8111__delegate(x, y, z, args);
});
G__8111.cljs$lang$arity$variadic = G__8111__delegate;
return G__8111;
})()
;
sp1 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case 0:
return sp1__0.call(this);
case 1:
return sp1__1.call(this,x);
case 2:
return sp1__2.call(this,x,y);
case 3:
return sp1__3.call(this,x,y,z);
default:
return sp1__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
sp1.cljs$lang$maxFixedArity = 3;
sp1.cljs$lang$applyTo = sp1__4.cljs$lang$applyTo;
sp1.cljs$lang$arity$0 = sp1__0;
sp1.cljs$lang$arity$1 = sp1__1;
sp1.cljs$lang$arity$2 = sp1__2;
sp1.cljs$lang$arity$3 = sp1__3;
sp1.cljs$lang$arity$variadic = sp1__4.cljs$lang$arity$variadic;
return sp1;
})()
});
var some_fn__2 = (function (p1,p2){
return (function() {
var sp2 = null;
var sp2__0 = (function (){
return null;
});
var sp2__1 = (function (x){
var or__3824__auto____8055 = p1.call(null,x);
if(cljs.core.truth_(or__3824__auto____8055))
{return or__3824__auto____8055;
} else
{return p2.call(null,x);
}
});
var sp2__2 = (function (x,y){
var or__3824__auto____8056 = p1.call(null,x);
if(cljs.core.truth_(or__3824__auto____8056))
{return or__3824__auto____8056;
} else
{var or__3824__auto____8057 = p1.call(null,y);
if(cljs.core.truth_(or__3824__auto____8057))
{return or__3824__auto____8057;
} else
{var or__3824__auto____8058 = p2.call(null,x);
if(cljs.core.truth_(or__3824__auto____8058))
{return or__3824__auto____8058;
} else
{return p2.call(null,y);
}
}
}
});
var sp2__3 = (function (x,y,z){
var or__3824__auto____8059 = p1.call(null,x);
if(cljs.core.truth_(or__3824__auto____8059))
{return or__3824__auto____8059;
} else
{var or__3824__auto____8060 = p1.call(null,y);
if(cljs.core.truth_(or__3824__auto____8060))
{return or__3824__auto____8060;
} else
{var or__3824__auto____8061 = p1.call(null,z);
if(cljs.core.truth_(or__3824__auto____8061))
{return or__3824__auto____8061;
} else
{var or__3824__auto____8062 = p2.call(null,x);
if(cljs.core.truth_(or__3824__auto____8062))
{return or__3824__auto____8062;
} else
{var or__3824__auto____8063 = p2.call(null,y);
if(cljs.core.truth_(or__3824__auto____8063))
{return or__3824__auto____8063;
} else
{return p2.call(null,z);
}
}
}
}
}
});
var sp2__4 = (function() { 
var G__8113__delegate = function (x,y,z,args){
var or__3824__auto____8064 = sp2.call(null,x,y,z);
if(cljs.core.truth_(or__3824__auto____8064))
{return or__3824__auto____8064;
} else
{return cljs.core.some.call(null,(function (p1__7794_SHARP_){
var or__3824__auto____8065 = p1.call(null,p1__7794_SHARP_);
if(cljs.core.truth_(or__3824__auto____8065))
{return or__3824__auto____8065;
} else
{return p2.call(null,p1__7794_SHARP_);
}
}),args);
}
};
var G__8113 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__8113__delegate.call(this, x, y, z, args);
};
G__8113.cljs$lang$maxFixedArity = 3;
G__8113.cljs$lang$applyTo = (function (arglist__8114){
var x = cljs.core.first(arglist__8114);
var y = cljs.core.first(cljs.core.next(arglist__8114));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8114)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8114)));
return G__8113__delegate(x, y, z, args);
});
G__8113.cljs$lang$arity$variadic = G__8113__delegate;
return G__8113;
})()
;
sp2 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case 0:
return sp2__0.call(this);
case 1:
return sp2__1.call(this,x);
case 2:
return sp2__2.call(this,x,y);
case 3:
return sp2__3.call(this,x,y,z);
default:
return sp2__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
sp2.cljs$lang$maxFixedArity = 3;
sp2.cljs$lang$applyTo = sp2__4.cljs$lang$applyTo;
sp2.cljs$lang$arity$0 = sp2__0;
sp2.cljs$lang$arity$1 = sp2__1;
sp2.cljs$lang$arity$2 = sp2__2;
sp2.cljs$lang$arity$3 = sp2__3;
sp2.cljs$lang$arity$variadic = sp2__4.cljs$lang$arity$variadic;
return sp2;
})()
});
var some_fn__3 = (function (p1,p2,p3){
return (function() {
var sp3 = null;
var sp3__0 = (function (){
return null;
});
var sp3__1 = (function (x){
var or__3824__auto____8084 = p1.call(null,x);
if(cljs.core.truth_(or__3824__auto____8084))
{return or__3824__auto____8084;
} else
{var or__3824__auto____8085 = p2.call(null,x);
if(cljs.core.truth_(or__3824__auto____8085))
{return or__3824__auto____8085;
} else
{return p3.call(null,x);
}
}
});
var sp3__2 = (function (x,y){
var or__3824__auto____8086 = p1.call(null,x);
if(cljs.core.truth_(or__3824__auto____8086))
{return or__3824__auto____8086;
} else
{var or__3824__auto____8087 = p2.call(null,x);
if(cljs.core.truth_(or__3824__auto____8087))
{return or__3824__auto____8087;
} else
{var or__3824__auto____8088 = p3.call(null,x);
if(cljs.core.truth_(or__3824__auto____8088))
{return or__3824__auto____8088;
} else
{var or__3824__auto____8089 = p1.call(null,y);
if(cljs.core.truth_(or__3824__auto____8089))
{return or__3824__auto____8089;
} else
{var or__3824__auto____8090 = p2.call(null,y);
if(cljs.core.truth_(or__3824__auto____8090))
{return or__3824__auto____8090;
} else
{return p3.call(null,y);
}
}
}
}
}
});
var sp3__3 = (function (x,y,z){
var or__3824__auto____8091 = p1.call(null,x);
if(cljs.core.truth_(or__3824__auto____8091))
{return or__3824__auto____8091;
} else
{var or__3824__auto____8092 = p2.call(null,x);
if(cljs.core.truth_(or__3824__auto____8092))
{return or__3824__auto____8092;
} else
{var or__3824__auto____8093 = p3.call(null,x);
if(cljs.core.truth_(or__3824__auto____8093))
{return or__3824__auto____8093;
} else
{var or__3824__auto____8094 = p1.call(null,y);
if(cljs.core.truth_(or__3824__auto____8094))
{return or__3824__auto____8094;
} else
{var or__3824__auto____8095 = p2.call(null,y);
if(cljs.core.truth_(or__3824__auto____8095))
{return or__3824__auto____8095;
} else
{var or__3824__auto____8096 = p3.call(null,y);
if(cljs.core.truth_(or__3824__auto____8096))
{return or__3824__auto____8096;
} else
{var or__3824__auto____8097 = p1.call(null,z);
if(cljs.core.truth_(or__3824__auto____8097))
{return or__3824__auto____8097;
} else
{var or__3824__auto____8098 = p2.call(null,z);
if(cljs.core.truth_(or__3824__auto____8098))
{return or__3824__auto____8098;
} else
{return p3.call(null,z);
}
}
}
}
}
}
}
}
});
var sp3__4 = (function() { 
var G__8115__delegate = function (x,y,z,args){
var or__3824__auto____8099 = sp3.call(null,x,y,z);
if(cljs.core.truth_(or__3824__auto____8099))
{return or__3824__auto____8099;
} else
{return cljs.core.some.call(null,(function (p1__7795_SHARP_){
var or__3824__auto____8100 = p1.call(null,p1__7795_SHARP_);
if(cljs.core.truth_(or__3824__auto____8100))
{return or__3824__auto____8100;
} else
{var or__3824__auto____8101 = p2.call(null,p1__7795_SHARP_);
if(cljs.core.truth_(or__3824__auto____8101))
{return or__3824__auto____8101;
} else
{return p3.call(null,p1__7795_SHARP_);
}
}
}),args);
}
};
var G__8115 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__8115__delegate.call(this, x, y, z, args);
};
G__8115.cljs$lang$maxFixedArity = 3;
G__8115.cljs$lang$applyTo = (function (arglist__8116){
var x = cljs.core.first(arglist__8116);
var y = cljs.core.first(cljs.core.next(arglist__8116));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8116)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8116)));
return G__8115__delegate(x, y, z, args);
});
G__8115.cljs$lang$arity$variadic = G__8115__delegate;
return G__8115;
})()
;
sp3 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case 0:
return sp3__0.call(this);
case 1:
return sp3__1.call(this,x);
case 2:
return sp3__2.call(this,x,y);
case 3:
return sp3__3.call(this,x,y,z);
default:
return sp3__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
sp3.cljs$lang$maxFixedArity = 3;
sp3.cljs$lang$applyTo = sp3__4.cljs$lang$applyTo;
sp3.cljs$lang$arity$0 = sp3__0;
sp3.cljs$lang$arity$1 = sp3__1;
sp3.cljs$lang$arity$2 = sp3__2;
sp3.cljs$lang$arity$3 = sp3__3;
sp3.cljs$lang$arity$variadic = sp3__4.cljs$lang$arity$variadic;
return sp3;
})()
});
var some_fn__4 = (function() { 
var G__8117__delegate = function (p1,p2,p3,ps){
var ps__8102 = cljs.core.list_STAR_.call(null,p1,p2,p3,ps);
return (function() {
var spn = null;
var spn__0 = (function (){
return null;
});
var spn__1 = (function (x){
return cljs.core.some.call(null,(function (p1__7796_SHARP_){
return p1__7796_SHARP_.call(null,x);
}),ps__8102);
});
var spn__2 = (function (x,y){
return cljs.core.some.call(null,(function (p1__7797_SHARP_){
var or__3824__auto____8107 = p1__7797_SHARP_.call(null,x);
if(cljs.core.truth_(or__3824__auto____8107))
{return or__3824__auto____8107;
} else
{return p1__7797_SHARP_.call(null,y);
}
}),ps__8102);
});
var spn__3 = (function (x,y,z){
return cljs.core.some.call(null,(function (p1__7798_SHARP_){
var or__3824__auto____8108 = p1__7798_SHARP_.call(null,x);
if(cljs.core.truth_(or__3824__auto____8108))
{return or__3824__auto____8108;
} else
{var or__3824__auto____8109 = p1__7798_SHARP_.call(null,y);
if(cljs.core.truth_(or__3824__auto____8109))
{return or__3824__auto____8109;
} else
{return p1__7798_SHARP_.call(null,z);
}
}
}),ps__8102);
});
var spn__4 = (function() { 
var G__8118__delegate = function (x,y,z,args){
var or__3824__auto____8110 = spn.call(null,x,y,z);
if(cljs.core.truth_(or__3824__auto____8110))
{return or__3824__auto____8110;
} else
{return cljs.core.some.call(null,(function (p1__7799_SHARP_){
return cljs.core.some.call(null,p1__7799_SHARP_,args);
}),ps__8102);
}
};
var G__8118 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__8118__delegate.call(this, x, y, z, args);
};
G__8118.cljs$lang$maxFixedArity = 3;
G__8118.cljs$lang$applyTo = (function (arglist__8119){
var x = cljs.core.first(arglist__8119);
var y = cljs.core.first(cljs.core.next(arglist__8119));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8119)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8119)));
return G__8118__delegate(x, y, z, args);
});
G__8118.cljs$lang$arity$variadic = G__8118__delegate;
return G__8118;
})()
;
spn = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case 0:
return spn__0.call(this);
case 1:
return spn__1.call(this,x);
case 2:
return spn__2.call(this,x,y);
case 3:
return spn__3.call(this,x,y,z);
default:
return spn__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
spn.cljs$lang$maxFixedArity = 3;
spn.cljs$lang$applyTo = spn__4.cljs$lang$applyTo;
spn.cljs$lang$arity$0 = spn__0;
spn.cljs$lang$arity$1 = spn__1;
spn.cljs$lang$arity$2 = spn__2;
spn.cljs$lang$arity$3 = spn__3;
spn.cljs$lang$arity$variadic = spn__4.cljs$lang$arity$variadic;
return spn;
})()
};
var G__8117 = function (p1,p2,p3,var_args){
var ps = null;
if (goog.isDef(var_args)) {
  ps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__8117__delegate.call(this, p1, p2, p3, ps);
};
G__8117.cljs$lang$maxFixedArity = 3;
G__8117.cljs$lang$applyTo = (function (arglist__8120){
var p1 = cljs.core.first(arglist__8120);
var p2 = cljs.core.first(cljs.core.next(arglist__8120));
var p3 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8120)));
var ps = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8120)));
return G__8117__delegate(p1, p2, p3, ps);
});
G__8117.cljs$lang$arity$variadic = G__8117__delegate;
return G__8117;
})()
;
some_fn = function(p1,p2,p3,var_args){
var ps = var_args;
switch(arguments.length){
case 1:
return some_fn__1.call(this,p1);
case 2:
return some_fn__2.call(this,p1,p2);
case 3:
return some_fn__3.call(this,p1,p2,p3);
default:
return some_fn__4.cljs$lang$arity$variadic(p1,p2,p3, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
some_fn.cljs$lang$maxFixedArity = 3;
some_fn.cljs$lang$applyTo = some_fn__4.cljs$lang$applyTo;
some_fn.cljs$lang$arity$1 = some_fn__1;
some_fn.cljs$lang$arity$2 = some_fn__2;
some_fn.cljs$lang$arity$3 = some_fn__3;
some_fn.cljs$lang$arity$variadic = some_fn__4.cljs$lang$arity$variadic;
return some_fn;
})()
;
/**
* Returns a lazy sequence consisting of the result of applying f to the
* set of first items of each coll, followed by applying f to the set
* of second items in each coll, until any one of the colls is
* exhausted.  Any remaining items in other colls are ignored. Function
* f should accept number-of-colls arguments.
* @param {...*} var_args
*/
cljs.core.map = (function() {
var map = null;
var map__2 = (function (f,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3974__auto____8139 = cljs.core.seq.call(null,coll);
if(temp__3974__auto____8139)
{var s__8140 = temp__3974__auto____8139;
if(cljs.core.chunked_seq_QMARK_.call(null,s__8140))
{var c__8141 = cljs.core.chunk_first.call(null,s__8140);
var size__8142 = cljs.core.count.call(null,c__8141);
var b__8143 = cljs.core.chunk_buffer.call(null,size__8142);
var n__2533__auto____8144 = size__8142;
var i__8145 = 0;
while(true){
if((i__8145 < n__2533__auto____8144))
{cljs.core.chunk_append.call(null,b__8143,f.call(null,cljs.core._nth.call(null,c__8141,i__8145)));
{
var G__8157 = (i__8145 + 1);
i__8145 = G__8157;
continue;
}
} else
{}
break;
}
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8143),map.call(null,f,cljs.core.chunk_rest.call(null,s__8140)));
} else
{return cljs.core.cons.call(null,f.call(null,cljs.core.first.call(null,s__8140)),map.call(null,f,cljs.core.rest.call(null,s__8140)));
}
} else
{return null;
}
}),null));
});
var map__3 = (function (f,c1,c2){
return (new cljs.core.LazySeq(null,false,(function (){
var s1__8146 = cljs.core.seq.call(null,c1);
var s2__8147 = cljs.core.seq.call(null,c2);
if((function (){var and__3822__auto____8148 = s1__8146;
if(and__3822__auto____8148)
{return s2__8147;
} else
{return and__3822__auto____8148;
}
})())
{return cljs.core.cons.call(null,f.call(null,cljs.core.first.call(null,s1__8146),cljs.core.first.call(null,s2__8147)),map.call(null,f,cljs.core.rest.call(null,s1__8146),cljs.core.rest.call(null,s2__8147)));
} else
{return null;
}
}),null));
});
var map__4 = (function (f,c1,c2,c3){
return (new cljs.core.LazySeq(null,false,(function (){
var s1__8149 = cljs.core.seq.call(null,c1);
var s2__8150 = cljs.core.seq.call(null,c2);
var s3__8151 = cljs.core.seq.call(null,c3);
if((function (){var and__3822__auto____8152 = s1__8149;
if(and__3822__auto____8152)
{var and__3822__auto____8153 = s2__8150;
if(and__3822__auto____8153)
{return s3__8151;
} else
{return and__3822__auto____8153;
}
} else
{return and__3822__auto____8152;
}
})())
{return cljs.core.cons.call(null,f.call(null,cljs.core.first.call(null,s1__8149),cljs.core.first.call(null,s2__8150),cljs.core.first.call(null,s3__8151)),map.call(null,f,cljs.core.rest.call(null,s1__8149),cljs.core.rest.call(null,s2__8150),cljs.core.rest.call(null,s3__8151)));
} else
{return null;
}
}),null));
});
var map__5 = (function() { 
var G__8158__delegate = function (f,c1,c2,c3,colls){
var step__8156 = (function step(cs){
return (new cljs.core.LazySeq(null,false,(function (){
var ss__8155 = map.call(null,cljs.core.seq,cs);
if(cljs.core.every_QMARK_.call(null,cljs.core.identity,ss__8155))
{return cljs.core.cons.call(null,map.call(null,cljs.core.first,ss__8155),step.call(null,map.call(null,cljs.core.rest,ss__8155)));
} else
{return null;
}
}),null));
});
return map.call(null,(function (p1__7960_SHARP_){
return cljs.core.apply.call(null,f,p1__7960_SHARP_);
}),step__8156.call(null,cljs.core.conj.call(null,colls,c3,c2,c1)));
};
var G__8158 = function (f,c1,c2,c3,var_args){
var colls = null;
if (goog.isDef(var_args)) {
  colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4),0);
} 
return G__8158__delegate.call(this, f, c1, c2, c3, colls);
};
G__8158.cljs$lang$maxFixedArity = 4;
G__8158.cljs$lang$applyTo = (function (arglist__8159){
var f = cljs.core.first(arglist__8159);
var c1 = cljs.core.first(cljs.core.next(arglist__8159));
var c2 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8159)));
var c3 = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__8159))));
var colls = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__8159))));
return G__8158__delegate(f, c1, c2, c3, colls);
});
G__8158.cljs$lang$arity$variadic = G__8158__delegate;
return G__8158;
})()
;
map = function(f,c1,c2,c3,var_args){
var colls = var_args;
switch(arguments.length){
case 2:
return map__2.call(this,f,c1);
case 3:
return map__3.call(this,f,c1,c2);
case 4:
return map__4.call(this,f,c1,c2,c3);
default:
return map__5.cljs$lang$arity$variadic(f,c1,c2,c3, cljs.core.array_seq(arguments, 4));
}
throw('Invalid arity: ' + arguments.length);
};
map.cljs$lang$maxFixedArity = 4;
map.cljs$lang$applyTo = map__5.cljs$lang$applyTo;
map.cljs$lang$arity$2 = map__2;
map.cljs$lang$arity$3 = map__3;
map.cljs$lang$arity$4 = map__4;
map.cljs$lang$arity$variadic = map__5.cljs$lang$arity$variadic;
return map;
})()
;
/**
* Returns a lazy sequence of the first n items in coll, or all items if
* there are fewer than n.
*/
cljs.core.take = (function take(n,coll){
return (new cljs.core.LazySeq(null,false,(function (){
if((n > 0))
{var temp__3974__auto____8162 = cljs.core.seq.call(null,coll);
if(temp__3974__auto____8162)
{var s__8163 = temp__3974__auto____8162;
return cljs.core.cons.call(null,cljs.core.first.call(null,s__8163),take.call(null,(n - 1),cljs.core.rest.call(null,s__8163)));
} else
{return null;
}
} else
{return null;
}
}),null));
});
/**
* Returns a lazy sequence of all but the first n items in coll.
*/
cljs.core.drop = (function drop(n,coll){
var step__8169 = (function (n,coll){
while(true){
var s__8167 = cljs.core.seq.call(null,coll);
if(cljs.core.truth_((function (){var and__3822__auto____8168 = (n > 0);
if(and__3822__auto____8168)
{return s__8167;
} else
{return and__3822__auto____8168;
}
})()))
{{
var G__8170 = (n - 1);
var G__8171 = cljs.core.rest.call(null,s__8167);
n = G__8170;
coll = G__8171;
continue;
}
} else
{return s__8167;
}
break;
}
});
return (new cljs.core.LazySeq(null,false,(function (){
return step__8169.call(null,n,coll);
}),null));
});
/**
* Return a lazy sequence of all but the last n (default 1) items in coll
*/
cljs.core.drop_last = (function() {
var drop_last = null;
var drop_last__1 = (function (s){
return drop_last.call(null,1,s);
});
var drop_last__2 = (function (n,s){
return cljs.core.map.call(null,(function (x,_){
return x;
}),s,cljs.core.drop.call(null,n,s));
});
drop_last = function(n,s){
switch(arguments.length){
case 1:
return drop_last__1.call(this,n);
case 2:
return drop_last__2.call(this,n,s);
}
throw('Invalid arity: ' + arguments.length);
};
drop_last.cljs$lang$arity$1 = drop_last__1;
drop_last.cljs$lang$arity$2 = drop_last__2;
return drop_last;
})()
;
/**
* Returns a seq of the last n items in coll.  Depending on the type
* of coll may be no better than linear time.  For vectors, see also subvec.
*/
cljs.core.take_last = (function take_last(n,coll){
var s__8174 = cljs.core.seq.call(null,coll);
var lead__8175 = cljs.core.seq.call(null,cljs.core.drop.call(null,n,coll));
while(true){
if(lead__8175)
{{
var G__8176 = cljs.core.next.call(null,s__8174);
var G__8177 = cljs.core.next.call(null,lead__8175);
s__8174 = G__8176;
lead__8175 = G__8177;
continue;
}
} else
{return s__8174;
}
break;
}
});
/**
* Returns a lazy sequence of the items in coll starting from the first
* item for which (pred item) returns nil.
*/
cljs.core.drop_while = (function drop_while(pred,coll){
var step__8183 = (function (pred,coll){
while(true){
var s__8181 = cljs.core.seq.call(null,coll);
if(cljs.core.truth_((function (){var and__3822__auto____8182 = s__8181;
if(and__3822__auto____8182)
{return pred.call(null,cljs.core.first.call(null,s__8181));
} else
{return and__3822__auto____8182;
}
})()))
{{
var G__8184 = pred;
var G__8185 = cljs.core.rest.call(null,s__8181);
pred = G__8184;
coll = G__8185;
continue;
}
} else
{return s__8181;
}
break;
}
});
return (new cljs.core.LazySeq(null,false,(function (){
return step__8183.call(null,pred,coll);
}),null));
});
/**
* Returns a lazy (infinite!) sequence of repetitions of the items in coll.
*/
cljs.core.cycle = (function cycle(coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3974__auto____8188 = cljs.core.seq.call(null,coll);
if(temp__3974__auto____8188)
{var s__8189 = temp__3974__auto____8188;
return cljs.core.concat.call(null,s__8189,cycle.call(null,s__8189));
} else
{return null;
}
}),null));
});
/**
* Returns a vector of [(take n coll) (drop n coll)]
*/
cljs.core.split_at = (function split_at(n,coll){
return cljs.core.PersistentVector.fromArray([cljs.core.take.call(null,n,coll),cljs.core.drop.call(null,n,coll)], true);
});
/**
* Returns a lazy (infinite!, or length n if supplied) sequence of xs.
*/
cljs.core.repeat = (function() {
var repeat = null;
var repeat__1 = (function (x){
return (new cljs.core.LazySeq(null,false,(function (){
return cljs.core.cons.call(null,x,repeat.call(null,x));
}),null));
});
var repeat__2 = (function (n,x){
return cljs.core.take.call(null,n,repeat.call(null,x));
});
repeat = function(n,x){
switch(arguments.length){
case 1:
return repeat__1.call(this,n);
case 2:
return repeat__2.call(this,n,x);
}
throw('Invalid arity: ' + arguments.length);
};
repeat.cljs$lang$arity$1 = repeat__1;
repeat.cljs$lang$arity$2 = repeat__2;
return repeat;
})()
;
/**
* Returns a lazy seq of n xs.
*/
cljs.core.replicate = (function replicate(n,x){
return cljs.core.take.call(null,n,cljs.core.repeat.call(null,x));
});
/**
* Takes a function of no args, presumably with side effects, and
* returns an infinite (or length n if supplied) lazy sequence of calls
* to it
*/
cljs.core.repeatedly = (function() {
var repeatedly = null;
var repeatedly__1 = (function (f){
return (new cljs.core.LazySeq(null,false,(function (){
return cljs.core.cons.call(null,f.call(null),repeatedly.call(null,f));
}),null));
});
var repeatedly__2 = (function (n,f){
return cljs.core.take.call(null,n,repeatedly.call(null,f));
});
repeatedly = function(n,f){
switch(arguments.length){
case 1:
return repeatedly__1.call(this,n);
case 2:
return repeatedly__2.call(this,n,f);
}
throw('Invalid arity: ' + arguments.length);
};
repeatedly.cljs$lang$arity$1 = repeatedly__1;
repeatedly.cljs$lang$arity$2 = repeatedly__2;
return repeatedly;
})()
;
/**
* Returns a lazy sequence of x, (f x), (f (f x)) etc. f must be free of side-effects
*/
cljs.core.iterate = (function iterate(f,x){
return cljs.core.cons.call(null,x,(new cljs.core.LazySeq(null,false,(function (){
return iterate.call(null,f,f.call(null,x));
}),null)));
});
/**
* Returns a lazy seq of the first item in each coll, then the second etc.
* @param {...*} var_args
*/
cljs.core.interleave = (function() {
var interleave = null;
var interleave__2 = (function (c1,c2){
return (new cljs.core.LazySeq(null,false,(function (){
var s1__8194 = cljs.core.seq.call(null,c1);
var s2__8195 = cljs.core.seq.call(null,c2);
if((function (){var and__3822__auto____8196 = s1__8194;
if(and__3822__auto____8196)
{return s2__8195;
} else
{return and__3822__auto____8196;
}
})())
{return cljs.core.cons.call(null,cljs.core.first.call(null,s1__8194),cljs.core.cons.call(null,cljs.core.first.call(null,s2__8195),interleave.call(null,cljs.core.rest.call(null,s1__8194),cljs.core.rest.call(null,s2__8195))));
} else
{return null;
}
}),null));
});
var interleave__3 = (function() { 
var G__8198__delegate = function (c1,c2,colls){
return (new cljs.core.LazySeq(null,false,(function (){
var ss__8197 = cljs.core.map.call(null,cljs.core.seq,cljs.core.conj.call(null,colls,c2,c1));
if(cljs.core.every_QMARK_.call(null,cljs.core.identity,ss__8197))
{return cljs.core.concat.call(null,cljs.core.map.call(null,cljs.core.first,ss__8197),cljs.core.apply.call(null,interleave,cljs.core.map.call(null,cljs.core.rest,ss__8197)));
} else
{return null;
}
}),null));
};
var G__8198 = function (c1,c2,var_args){
var colls = null;
if (goog.isDef(var_args)) {
  colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__8198__delegate.call(this, c1, c2, colls);
};
G__8198.cljs$lang$maxFixedArity = 2;
G__8198.cljs$lang$applyTo = (function (arglist__8199){
var c1 = cljs.core.first(arglist__8199);
var c2 = cljs.core.first(cljs.core.next(arglist__8199));
var colls = cljs.core.rest(cljs.core.next(arglist__8199));
return G__8198__delegate(c1, c2, colls);
});
G__8198.cljs$lang$arity$variadic = G__8198__delegate;
return G__8198;
})()
;
interleave = function(c1,c2,var_args){
var colls = var_args;
switch(arguments.length){
case 2:
return interleave__2.call(this,c1,c2);
default:
return interleave__3.cljs$lang$arity$variadic(c1,c2, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
interleave.cljs$lang$maxFixedArity = 2;
interleave.cljs$lang$applyTo = interleave__3.cljs$lang$applyTo;
interleave.cljs$lang$arity$2 = interleave__2;
interleave.cljs$lang$arity$variadic = interleave__3.cljs$lang$arity$variadic;
return interleave;
})()
;
/**
* Returns a lazy seq of the elements of coll separated by sep
*/
cljs.core.interpose = (function interpose(sep,coll){
return cljs.core.drop.call(null,1,cljs.core.interleave.call(null,cljs.core.repeat.call(null,sep),coll));
});
/**
* Take a collection of collections, and return a lazy seq
* of items from the inner collection
*/
cljs.core.flatten1 = (function flatten1(colls){
var cat__8209 = (function cat(coll,colls){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3971__auto____8207 = cljs.core.seq.call(null,coll);
if(temp__3971__auto____8207)
{var coll__8208 = temp__3971__auto____8207;
return cljs.core.cons.call(null,cljs.core.first.call(null,coll__8208),cat.call(null,cljs.core.rest.call(null,coll__8208),colls));
} else
{if(cljs.core.seq.call(null,colls))
{return cat.call(null,cljs.core.first.call(null,colls),cljs.core.rest.call(null,colls));
} else
{return null;
}
}
}),null));
});
return cat__8209.call(null,null,colls);
});
/**
* Returns the result of applying concat to the result of applying map
* to f and colls.  Thus function f should return a collection.
* @param {...*} var_args
*/
cljs.core.mapcat = (function() {
var mapcat = null;
var mapcat__2 = (function (f,coll){
return cljs.core.flatten1.call(null,cljs.core.map.call(null,f,coll));
});
var mapcat__3 = (function() { 
var G__8210__delegate = function (f,coll,colls){
return cljs.core.flatten1.call(null,cljs.core.apply.call(null,cljs.core.map,f,coll,colls));
};
var G__8210 = function (f,coll,var_args){
var colls = null;
if (goog.isDef(var_args)) {
  colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__8210__delegate.call(this, f, coll, colls);
};
G__8210.cljs$lang$maxFixedArity = 2;
G__8210.cljs$lang$applyTo = (function (arglist__8211){
var f = cljs.core.first(arglist__8211);
var coll = cljs.core.first(cljs.core.next(arglist__8211));
var colls = cljs.core.rest(cljs.core.next(arglist__8211));
return G__8210__delegate(f, coll, colls);
});
G__8210.cljs$lang$arity$variadic = G__8210__delegate;
return G__8210;
})()
;
mapcat = function(f,coll,var_args){
var colls = var_args;
switch(arguments.length){
case 2:
return mapcat__2.call(this,f,coll);
default:
return mapcat__3.cljs$lang$arity$variadic(f,coll, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
mapcat.cljs$lang$maxFixedArity = 2;
mapcat.cljs$lang$applyTo = mapcat__3.cljs$lang$applyTo;
mapcat.cljs$lang$arity$2 = mapcat__2;
mapcat.cljs$lang$arity$variadic = mapcat__3.cljs$lang$arity$variadic;
return mapcat;
})()
;
/**
* Returns a lazy sequence of the items in coll for which
* (pred item) returns true. pred must be free of side-effects.
*/
cljs.core.filter = (function filter(pred,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3974__auto____8221 = cljs.core.seq.call(null,coll);
if(temp__3974__auto____8221)
{var s__8222 = temp__3974__auto____8221;
if(cljs.core.chunked_seq_QMARK_.call(null,s__8222))
{var c__8223 = cljs.core.chunk_first.call(null,s__8222);
var size__8224 = cljs.core.count.call(null,c__8223);
var b__8225 = cljs.core.chunk_buffer.call(null,size__8224);
var n__2533__auto____8226 = size__8224;
var i__8227 = 0;
while(true){
if((i__8227 < n__2533__auto____8226))
{if(cljs.core.truth_(pred.call(null,cljs.core._nth.call(null,c__8223,i__8227))))
{cljs.core.chunk_append.call(null,b__8225,cljs.core._nth.call(null,c__8223,i__8227));
} else
{}
{
var G__8230 = (i__8227 + 1);
i__8227 = G__8230;
continue;
}
} else
{}
break;
}
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8225),filter.call(null,pred,cljs.core.chunk_rest.call(null,s__8222)));
} else
{var f__8228 = cljs.core.first.call(null,s__8222);
var r__8229 = cljs.core.rest.call(null,s__8222);
if(cljs.core.truth_(pred.call(null,f__8228)))
{return cljs.core.cons.call(null,f__8228,filter.call(null,pred,r__8229));
} else
{return filter.call(null,pred,r__8229);
}
}
} else
{return null;
}
}),null));
});
/**
* Returns a lazy sequence of the items in coll for which
* (pred item) returns false. pred must be free of side-effects.
*/
cljs.core.remove = (function remove(pred,coll){
return cljs.core.filter.call(null,cljs.core.complement.call(null,pred),coll);
});
/**
* Returns a lazy sequence of the nodes in a tree, via a depth-first walk.
* branch? must be a fn of one arg that returns true if passed a node
* that can have children (but may not).  children must be a fn of one
* arg that returns a sequence of the children. Will only be called on
* nodes for which branch? returns true. Root is the root node of the
* tree.
*/
cljs.core.tree_seq = (function tree_seq(branch_QMARK_,children,root){
var walk__8233 = (function walk(node){
return (new cljs.core.LazySeq(null,false,(function (){
return cljs.core.cons.call(null,node,(cljs.core.truth_(branch_QMARK_.call(null,node))?cljs.core.mapcat.call(null,walk,children.call(null,node)):null));
}),null));
});
return walk__8233.call(null,root);
});
/**
* Takes any nested combination of sequential things (lists, vectors,
* etc.) and returns their contents as a single, flat sequence.
* (flatten nil) returns nil.
*/
cljs.core.flatten = (function flatten(x){
return cljs.core.filter.call(null,(function (p1__8231_SHARP_){
return !(cljs.core.sequential_QMARK_.call(null,p1__8231_SHARP_));
}),cljs.core.rest.call(null,cljs.core.tree_seq.call(null,cljs.core.sequential_QMARK_,cljs.core.seq,x)));
});
/**
* Returns a new coll consisting of to-coll with all of the items of
* from-coll conjoined.
*/
cljs.core.into = (function into(to,from){
if((function (){var G__8237__8238 = to;
if(G__8237__8238)
{if((function (){var or__3824__auto____8239 = (G__8237__8238.cljs$lang$protocol_mask$partition1$ & 1);
if(or__3824__auto____8239)
{return or__3824__auto____8239;
} else
{return G__8237__8238.cljs$core$IEditableCollection$;
}
})())
{return true;
} else
{if((!G__8237__8238.cljs$lang$protocol_mask$partition1$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IEditableCollection,G__8237__8238);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IEditableCollection,G__8237__8238);
}
})())
{return cljs.core.persistent_BANG_.call(null,cljs.core.reduce.call(null,cljs.core._conj_BANG_,cljs.core.transient$.call(null,to),from));
} else
{return cljs.core.reduce.call(null,cljs.core._conj,to,from);
}
});
/**
* Returns a vector consisting of the result of applying f to the
* set of first items of each coll, followed by applying f to the set
* of second items in each coll, until any one of the colls is
* exhausted.  Any remaining items in other colls are ignored. Function
* f should accept number-of-colls arguments.
* @param {...*} var_args
*/
cljs.core.mapv = (function() {
var mapv = null;
var mapv__2 = (function (f,coll){
return cljs.core.persistent_BANG_.call(null,cljs.core.reduce.call(null,(function (v,o){
return cljs.core.conj_BANG_.call(null,v,f.call(null,o));
}),cljs.core.transient$.call(null,cljs.core.PersistentVector.EMPTY),coll));
});
var mapv__3 = (function (f,c1,c2){
return cljs.core.into.call(null,cljs.core.PersistentVector.EMPTY,cljs.core.map.call(null,f,c1,c2));
});
var mapv__4 = (function (f,c1,c2,c3){
return cljs.core.into.call(null,cljs.core.PersistentVector.EMPTY,cljs.core.map.call(null,f,c1,c2,c3));
});
var mapv__5 = (function() { 
var G__8240__delegate = function (f,c1,c2,c3,colls){
return cljs.core.into.call(null,cljs.core.PersistentVector.EMPTY,cljs.core.apply.call(null,cljs.core.map,f,c1,c2,c3,colls));
};
var G__8240 = function (f,c1,c2,c3,var_args){
var colls = null;
if (goog.isDef(var_args)) {
  colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4),0);
} 
return G__8240__delegate.call(this, f, c1, c2, c3, colls);
};
G__8240.cljs$lang$maxFixedArity = 4;
G__8240.cljs$lang$applyTo = (function (arglist__8241){
var f = cljs.core.first(arglist__8241);
var c1 = cljs.core.first(cljs.core.next(arglist__8241));
var c2 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8241)));
var c3 = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__8241))));
var colls = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__8241))));
return G__8240__delegate(f, c1, c2, c3, colls);
});
G__8240.cljs$lang$arity$variadic = G__8240__delegate;
return G__8240;
})()
;
mapv = function(f,c1,c2,c3,var_args){
var colls = var_args;
switch(arguments.length){
case 2:
return mapv__2.call(this,f,c1);
case 3:
return mapv__3.call(this,f,c1,c2);
case 4:
return mapv__4.call(this,f,c1,c2,c3);
default:
return mapv__5.cljs$lang$arity$variadic(f,c1,c2,c3, cljs.core.array_seq(arguments, 4));
}
throw('Invalid arity: ' + arguments.length);
};
mapv.cljs$lang$maxFixedArity = 4;
mapv.cljs$lang$applyTo = mapv__5.cljs$lang$applyTo;
mapv.cljs$lang$arity$2 = mapv__2;
mapv.cljs$lang$arity$3 = mapv__3;
mapv.cljs$lang$arity$4 = mapv__4;
mapv.cljs$lang$arity$variadic = mapv__5.cljs$lang$arity$variadic;
return mapv;
})()
;
/**
* Returns a vector of the items in coll for which
* (pred item) returns true. pred must be free of side-effects.
*/
cljs.core.filterv = (function filterv(pred,coll){
return cljs.core.persistent_BANG_.call(null,cljs.core.reduce.call(null,(function (v,o){
if(cljs.core.truth_(pred.call(null,o)))
{return cljs.core.conj_BANG_.call(null,v,o);
} else
{return v;
}
}),cljs.core.transient$.call(null,cljs.core.PersistentVector.EMPTY),coll));
});
/**
* Returns a lazy sequence of lists of n items each, at offsets step
* apart. If step is not supplied, defaults to n, i.e. the partitions
* do not overlap. If a pad collection is supplied, use its elements as
* necessary to complete last partition upto n items. In case there are
* not enough padding elements, return a partition with less than n items.
*/
cljs.core.partition = (function() {
var partition = null;
var partition__2 = (function (n,coll){
return partition.call(null,n,n,coll);
});
var partition__3 = (function (n,step,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3974__auto____8248 = cljs.core.seq.call(null,coll);
if(temp__3974__auto____8248)
{var s__8249 = temp__3974__auto____8248;
var p__8250 = cljs.core.take.call(null,n,s__8249);
if((n === cljs.core.count.call(null,p__8250)))
{return cljs.core.cons.call(null,p__8250,partition.call(null,n,step,cljs.core.drop.call(null,step,s__8249)));
} else
{return null;
}
} else
{return null;
}
}),null));
});
var partition__4 = (function (n,step,pad,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3974__auto____8251 = cljs.core.seq.call(null,coll);
if(temp__3974__auto____8251)
{var s__8252 = temp__3974__auto____8251;
var p__8253 = cljs.core.take.call(null,n,s__8252);
if((n === cljs.core.count.call(null,p__8253)))
{return cljs.core.cons.call(null,p__8253,partition.call(null,n,step,pad,cljs.core.drop.call(null,step,s__8252)));
} else
{return cljs.core.list.call(null,cljs.core.take.call(null,n,cljs.core.concat.call(null,p__8253,pad)));
}
} else
{return null;
}
}),null));
});
partition = function(n,step,pad,coll){
switch(arguments.length){
case 2:
return partition__2.call(this,n,step);
case 3:
return partition__3.call(this,n,step,pad);
case 4:
return partition__4.call(this,n,step,pad,coll);
}
throw('Invalid arity: ' + arguments.length);
};
partition.cljs$lang$arity$2 = partition__2;
partition.cljs$lang$arity$3 = partition__3;
partition.cljs$lang$arity$4 = partition__4;
return partition;
})()
;
/**
* Returns the value in a nested associative structure,
* where ks is a sequence of keys. Returns nil if the key is not present,
* or the not-found value if supplied.
*/
cljs.core.get_in = (function() {
var get_in = null;
var get_in__2 = (function (m,ks){
return cljs.core.reduce.call(null,cljs.core.get,m,ks);
});
var get_in__3 = (function (m,ks,not_found){
var sentinel__8258 = cljs.core.lookup_sentinel;
var m__8259 = m;
var ks__8260 = cljs.core.seq.call(null,ks);
while(true){
if(ks__8260)
{var m__8261 = cljs.core._lookup.call(null,m__8259,cljs.core.first.call(null,ks__8260),sentinel__8258);
if((sentinel__8258 === m__8261))
{return not_found;
} else
{{
var G__8262 = sentinel__8258;
var G__8263 = m__8261;
var G__8264 = cljs.core.next.call(null,ks__8260);
sentinel__8258 = G__8262;
m__8259 = G__8263;
ks__8260 = G__8264;
continue;
}
}
} else
{return m__8259;
}
break;
}
});
get_in = function(m,ks,not_found){
switch(arguments.length){
case 2:
return get_in__2.call(this,m,ks);
case 3:
return get_in__3.call(this,m,ks,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
get_in.cljs$lang$arity$2 = get_in__2;
get_in.cljs$lang$arity$3 = get_in__3;
return get_in;
})()
;
/**
* Associates a value in a nested associative structure, where ks is a
* sequence of keys and v is the new value and returns a new nested structure.
* If any levels do not exist, hash-maps will be created.
*/
cljs.core.assoc_in = (function assoc_in(m,p__8265,v){
var vec__8270__8271 = p__8265;
var k__8272 = cljs.core.nth.call(null,vec__8270__8271,0,null);
var ks__8273 = cljs.core.nthnext.call(null,vec__8270__8271,1);
if(cljs.core.truth_(ks__8273))
{return cljs.core.assoc.call(null,m,k__8272,assoc_in.call(null,cljs.core._lookup.call(null,m,k__8272,null),ks__8273,v));
} else
{return cljs.core.assoc.call(null,m,k__8272,v);
}
});
/**
* 'Updates' a value in a nested associative structure, where ks is a
* sequence of keys and f is a function that will take the old value
* and any supplied args and return the new value, and returns a new
* nested structure.  If any levels do not exist, hash-maps will be
* created.
* @param {...*} var_args
*/
cljs.core.update_in = (function() { 
var update_in__delegate = function (m,p__8274,f,args){
var vec__8279__8280 = p__8274;
var k__8281 = cljs.core.nth.call(null,vec__8279__8280,0,null);
var ks__8282 = cljs.core.nthnext.call(null,vec__8279__8280,1);
if(cljs.core.truth_(ks__8282))
{return cljs.core.assoc.call(null,m,k__8281,cljs.core.apply.call(null,update_in,cljs.core._lookup.call(null,m,k__8281,null),ks__8282,f,args));
} else
{return cljs.core.assoc.call(null,m,k__8281,cljs.core.apply.call(null,f,cljs.core._lookup.call(null,m,k__8281,null),args));
}
};
var update_in = function (m,p__8274,f,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return update_in__delegate.call(this, m, p__8274, f, args);
};
update_in.cljs$lang$maxFixedArity = 3;
update_in.cljs$lang$applyTo = (function (arglist__8283){
var m = cljs.core.first(arglist__8283);
var p__8274 = cljs.core.first(cljs.core.next(arglist__8283));
var f = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8283)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8283)));
return update_in__delegate(m, p__8274, f, args);
});
update_in.cljs$lang$arity$variadic = update_in__delegate;
return update_in;
})()
;

/**
* @constructor
*/
cljs.core.Vector = (function (meta,array,__hash){
this.meta = meta;
this.array = array;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 32400159;
})
cljs.core.Vector.cljs$lang$type = true;
cljs.core.Vector.cljs$lang$ctorPrSeq = (function (this__2315__auto__){
return cljs.core.list.call(null,"cljs.core/Vector");
});
cljs.core.Vector.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__8286 = this;
var h__2198__auto____8287 = this__8286.__hash;
if(!((h__2198__auto____8287 == null)))
{return h__2198__auto____8287;
} else
{var h__2198__auto____8288 = cljs.core.hash_coll.call(null,coll);
this__8286.__hash = h__2198__auto____8288;
return h__2198__auto____8288;
}
});
cljs.core.Vector.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (coll,k){
var this__8289 = this;
return coll.cljs$core$IIndexed$_nth$arity$3(coll,k,null);
});
cljs.core.Vector.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (coll,k,not_found){
var this__8290 = this;
return coll.cljs$core$IIndexed$_nth$arity$3(coll,k,not_found);
});
cljs.core.Vector.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (coll,k,v){
var this__8291 = this;
var new_array__8292 = this__8291.array.slice();
(new_array__8292[k] = v);
return (new cljs.core.Vector(this__8291.meta,new_array__8292,null));
});
cljs.core.Vector.prototype.call = (function() {
var G__8323 = null;
var G__8323__2 = (function (this_sym8293,k){
var this__8295 = this;
var this_sym8293__8296 = this;
var coll__8297 = this_sym8293__8296;
return coll__8297.cljs$core$ILookup$_lookup$arity$2(coll__8297,k);
});
var G__8323__3 = (function (this_sym8294,k,not_found){
var this__8295 = this;
var this_sym8294__8298 = this;
var coll__8299 = this_sym8294__8298;
return coll__8299.cljs$core$ILookup$_lookup$arity$3(coll__8299,k,not_found);
});
G__8323 = function(this_sym8294,k,not_found){
switch(arguments.length){
case 2:
return G__8323__2.call(this,this_sym8294,k);
case 3:
return G__8323__3.call(this,this_sym8294,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__8323;
})()
;
cljs.core.Vector.prototype.apply = (function (this_sym8284,args8285){
var this__8300 = this;
return this_sym8284.call.apply(this_sym8284,[this_sym8284].concat(args8285.slice()));
});
cljs.core.Vector.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__8301 = this;
var new_array__8302 = this__8301.array.slice();
new_array__8302.push(o);
return (new cljs.core.Vector(this__8301.meta,new_array__8302,null));
});
cljs.core.Vector.prototype.toString = (function (){
var this__8303 = this;
var this__8304 = this;
return cljs.core.pr_str.call(null,this__8304);
});
cljs.core.Vector.prototype.cljs$core$IReduce$_reduce$arity$2 = (function (v,f){
var this__8305 = this;
return cljs.core.ci_reduce.call(null,this__8305.array,f);
});
cljs.core.Vector.prototype.cljs$core$IReduce$_reduce$arity$3 = (function (v,f,start){
var this__8306 = this;
return cljs.core.ci_reduce.call(null,this__8306.array,f,start);
});
cljs.core.Vector.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__8307 = this;
if((this__8307.array.length > 0))
{var vector_seq__8308 = (function vector_seq(i){
return (new cljs.core.LazySeq(null,false,(function (){
if((i < this__8307.array.length))
{return cljs.core.cons.call(null,(this__8307.array[i]),vector_seq.call(null,(i + 1)));
} else
{return null;
}
}),null));
});
return vector_seq__8308.call(null,0);
} else
{return null;
}
});
cljs.core.Vector.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__8309 = this;
return this__8309.array.length;
});
cljs.core.Vector.prototype.cljs$core$IStack$_peek$arity$1 = (function (coll){
var this__8310 = this;
var count__8311 = this__8310.array.length;
if((count__8311 > 0))
{return (this__8310.array[(count__8311 - 1)]);
} else
{return null;
}
});
cljs.core.Vector.prototype.cljs$core$IStack$_pop$arity$1 = (function (coll){
var this__8312 = this;
if((this__8312.array.length > 0))
{var new_array__8313 = this__8312.array.slice();
new_array__8313.pop();
return (new cljs.core.Vector(this__8312.meta,new_array__8313,null));
} else
{throw (new Error("Can't pop empty vector"));
}
});
cljs.core.Vector.prototype.cljs$core$IVector$_assoc_n$arity$3 = (function (coll,n,val){
var this__8314 = this;
return coll.cljs$core$IAssociative$_assoc$arity$3(coll,n,val);
});
cljs.core.Vector.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__8315 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.Vector.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__8316 = this;
return (new cljs.core.Vector(meta,this__8316.array,this__8316.__hash));
});
cljs.core.Vector.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__8317 = this;
return this__8317.meta;
});
cljs.core.Vector.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (coll,n){
var this__8318 = this;
if((function (){var and__3822__auto____8319 = (0 <= n);
if(and__3822__auto____8319)
{return (n < this__8318.array.length);
} else
{return and__3822__auto____8319;
}
})())
{return (this__8318.array[n]);
} else
{return null;
}
});
cljs.core.Vector.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (coll,n,not_found){
var this__8320 = this;
if((function (){var and__3822__auto____8321 = (0 <= n);
if(and__3822__auto____8321)
{return (n < this__8320.array.length);
} else
{return and__3822__auto____8321;
}
})())
{return (this__8320.array[n]);
} else
{return not_found;
}
});
cljs.core.Vector.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__8322 = this;
return cljs.core.with_meta.call(null,cljs.core.Vector.EMPTY,this__8322.meta);
});
cljs.core.Vector;
cljs.core.Vector.EMPTY = (new cljs.core.Vector(null,[],0));
cljs.core.Vector.fromArray = (function (xs){
return (new cljs.core.Vector(null,xs,null));
});

/**
* @constructor
*/
cljs.core.VectorNode = (function (edit,arr){
this.edit = edit;
this.arr = arr;
})
cljs.core.VectorNode.cljs$lang$type = true;
cljs.core.VectorNode.cljs$lang$ctorPrSeq = (function (this__2316__auto__){
return cljs.core.list.call(null,"cljs.core/VectorNode");
});
cljs.core.VectorNode;
cljs.core.pv_fresh_node = (function pv_fresh_node(edit){
return (new cljs.core.VectorNode(edit,cljs.core.make_array.call(null,32)));
});
cljs.core.pv_aget = (function pv_aget(node,idx){
return (node.arr[idx]);
});
cljs.core.pv_aset = (function pv_aset(node,idx,val){
return (node.arr[idx] = val);
});
cljs.core.pv_clone_node = (function pv_clone_node(node){
return (new cljs.core.VectorNode(node.edit,node.arr.slice()));
});
cljs.core.tail_off = (function tail_off(pv){
var cnt__8325 = pv.cnt;
if((cnt__8325 < 32))
{return 0;
} else
{return (((cnt__8325 - 1) >>> 5) << 5);
}
});
cljs.core.new_path = (function new_path(edit,level,node){
var ll__8331 = level;
var ret__8332 = node;
while(true){
if((ll__8331 === 0))
{return ret__8332;
} else
{var embed__8333 = ret__8332;
var r__8334 = cljs.core.pv_fresh_node.call(null,edit);
var ___8335 = cljs.core.pv_aset.call(null,r__8334,0,embed__8333);
{
var G__8336 = (ll__8331 - 5);
var G__8337 = r__8334;
ll__8331 = G__8336;
ret__8332 = G__8337;
continue;
}
}
break;
}
});
cljs.core.push_tail = (function push_tail(pv,level,parent,tailnode){
var ret__8343 = cljs.core.pv_clone_node.call(null,parent);
var subidx__8344 = (((pv.cnt - 1) >>> level) & 31);
if((5 === level))
{cljs.core.pv_aset.call(null,ret__8343,subidx__8344,tailnode);
return ret__8343;
} else
{var child__8345 = cljs.core.pv_aget.call(null,parent,subidx__8344);
if(!((child__8345 == null)))
{var node_to_insert__8346 = push_tail.call(null,pv,(level - 5),child__8345,tailnode);
cljs.core.pv_aset.call(null,ret__8343,subidx__8344,node_to_insert__8346);
return ret__8343;
} else
{var node_to_insert__8347 = cljs.core.new_path.call(null,null,(level - 5),tailnode);
cljs.core.pv_aset.call(null,ret__8343,subidx__8344,node_to_insert__8347);
return ret__8343;
}
}
});
cljs.core.array_for = (function array_for(pv,i){
if((function (){var and__3822__auto____8351 = (0 <= i);
if(and__3822__auto____8351)
{return (i < pv.cnt);
} else
{return and__3822__auto____8351;
}
})())
{if((i >= cljs.core.tail_off.call(null,pv)))
{return pv.tail;
} else
{var node__8352 = pv.root;
var level__8353 = pv.shift;
while(true){
if((level__8353 > 0))
{{
var G__8354 = cljs.core.pv_aget.call(null,node__8352,((i >>> level__8353) & 31));
var G__8355 = (level__8353 - 5);
node__8352 = G__8354;
level__8353 = G__8355;
continue;
}
} else
{return node__8352.arr;
}
break;
}
}
} else
{throw (new Error([cljs.core.str("No item "),cljs.core.str(i),cljs.core.str(" in vector of length "),cljs.core.str(pv.cnt)].join('')));
}
});
cljs.core.do_assoc = (function do_assoc(pv,level,node,i,val){
var ret__8358 = cljs.core.pv_clone_node.call(null,node);
if((level === 0))
{cljs.core.pv_aset.call(null,ret__8358,(i & 31),val);
return ret__8358;
} else
{var subidx__8359 = ((i >>> level) & 31);
cljs.core.pv_aset.call(null,ret__8358,subidx__8359,do_assoc.call(null,pv,(level - 5),cljs.core.pv_aget.call(null,node,subidx__8359),i,val));
return ret__8358;
}
});
cljs.core.pop_tail = (function pop_tail(pv,level,node){
var subidx__8365 = (((pv.cnt - 2) >>> level) & 31);
if((level > 5))
{var new_child__8366 = pop_tail.call(null,pv,(level - 5),cljs.core.pv_aget.call(null,node,subidx__8365));
if((function (){var and__3822__auto____8367 = (new_child__8366 == null);
if(and__3822__auto____8367)
{return (subidx__8365 === 0);
} else
{return and__3822__auto____8367;
}
})())
{return null;
} else
{var ret__8368 = cljs.core.pv_clone_node.call(null,node);
cljs.core.pv_aset.call(null,ret__8368,subidx__8365,new_child__8366);
return ret__8368;
}
} else
{if((subidx__8365 === 0))
{return null;
} else
{if("\uFDD0'else")
{var ret__8369 = cljs.core.pv_clone_node.call(null,node);
cljs.core.pv_aset.call(null,ret__8369,subidx__8365,null);
return ret__8369;
} else
{return null;
}
}
}
});

/**
* @constructor
*/
cljs.core.PersistentVector = (function (meta,cnt,shift,root,tail,__hash){
this.meta = meta;
this.cnt = cnt;
this.shift = shift;
this.root = root;
this.tail = tail;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 1;
this.cljs$lang$protocol_mask$partition0$ = 167668511;
})
cljs.core.PersistentVector.cljs$lang$type = true;
cljs.core.PersistentVector.cljs$lang$ctorPrSeq = (function (this__2315__auto__){
return cljs.core.list.call(null,"cljs.core/PersistentVector");
});
cljs.core.PersistentVector.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = (function (coll){
var this__8372 = this;
return (new cljs.core.TransientVector(this__8372.cnt,this__8372.shift,cljs.core.tv_editable_root.call(null,this__8372.root),cljs.core.tv_editable_tail.call(null,this__8372.tail)));
});
cljs.core.PersistentVector.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__8373 = this;
var h__2198__auto____8374 = this__8373.__hash;
if(!((h__2198__auto____8374 == null)))
{return h__2198__auto____8374;
} else
{var h__2198__auto____8375 = cljs.core.hash_coll.call(null,coll);
this__8373.__hash = h__2198__auto____8375;
return h__2198__auto____8375;
}
});
cljs.core.PersistentVector.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (coll,k){
var this__8376 = this;
return coll.cljs$core$IIndexed$_nth$arity$3(coll,k,null);
});
cljs.core.PersistentVector.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (coll,k,not_found){
var this__8377 = this;
return coll.cljs$core$IIndexed$_nth$arity$3(coll,k,not_found);
});
cljs.core.PersistentVector.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (coll,k,v){
var this__8378 = this;
if((function (){var and__3822__auto____8379 = (0 <= k);
if(and__3822__auto____8379)
{return (k < this__8378.cnt);
} else
{return and__3822__auto____8379;
}
})())
{if((cljs.core.tail_off.call(null,coll) <= k))
{var new_tail__8380 = this__8378.tail.slice();
(new_tail__8380[(k & 31)] = v);
return (new cljs.core.PersistentVector(this__8378.meta,this__8378.cnt,this__8378.shift,this__8378.root,new_tail__8380,null));
} else
{return (new cljs.core.PersistentVector(this__8378.meta,this__8378.cnt,this__8378.shift,cljs.core.do_assoc.call(null,coll,this__8378.shift,this__8378.root,k,v),this__8378.tail,null));
}
} else
{if((k === this__8378.cnt))
{return coll.cljs$core$ICollection$_conj$arity$2(coll,v);
} else
{if("\uFDD0'else")
{throw (new Error([cljs.core.str("Index "),cljs.core.str(k),cljs.core.str(" out of bounds  [0,"),cljs.core.str(this__8378.cnt),cljs.core.str("]")].join('')));
} else
{return null;
}
}
}
});
cljs.core.PersistentVector.prototype.call = (function() {
var G__8428 = null;
var G__8428__2 = (function (this_sym8381,k){
var this__8383 = this;
var this_sym8381__8384 = this;
var coll__8385 = this_sym8381__8384;
return coll__8385.cljs$core$ILookup$_lookup$arity$2(coll__8385,k);
});
var G__8428__3 = (function (this_sym8382,k,not_found){
var this__8383 = this;
var this_sym8382__8386 = this;
var coll__8387 = this_sym8382__8386;
return coll__8387.cljs$core$ILookup$_lookup$arity$3(coll__8387,k,not_found);
});
G__8428 = function(this_sym8382,k,not_found){
switch(arguments.length){
case 2:
return G__8428__2.call(this,this_sym8382,k);
case 3:
return G__8428__3.call(this,this_sym8382,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__8428;
})()
;
cljs.core.PersistentVector.prototype.apply = (function (this_sym8370,args8371){
var this__8388 = this;
return this_sym8370.call.apply(this_sym8370,[this_sym8370].concat(args8371.slice()));
});
cljs.core.PersistentVector.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (v,f,init){
var this__8389 = this;
var step_init__8390 = [0,init];
var i__8391 = 0;
while(true){
if((i__8391 < this__8389.cnt))
{var arr__8392 = cljs.core.array_for.call(null,v,i__8391);
var len__8393 = arr__8392.length;
var init__8397 = (function (){var j__8394 = 0;
var init__8395 = (step_init__8390[1]);
while(true){
if((j__8394 < len__8393))
{var init__8396 = f.call(null,init__8395,(j__8394 + i__8391),(arr__8392[j__8394]));
if(cljs.core.reduced_QMARK_.call(null,init__8396))
{return init__8396;
} else
{{
var G__8429 = (j__8394 + 1);
var G__8430 = init__8396;
j__8394 = G__8429;
init__8395 = G__8430;
continue;
}
}
} else
{(step_init__8390[0] = len__8393);
(step_init__8390[1] = init__8395);
return init__8395;
}
break;
}
})();
if(cljs.core.reduced_QMARK_.call(null,init__8397))
{return cljs.core.deref.call(null,init__8397);
} else
{{
var G__8431 = (i__8391 + (step_init__8390[0]));
i__8391 = G__8431;
continue;
}
}
} else
{return (step_init__8390[1]);
}
break;
}
});
cljs.core.PersistentVector.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__8398 = this;
if(((this__8398.cnt - cljs.core.tail_off.call(null,coll)) < 32))
{var new_tail__8399 = this__8398.tail.slice();
new_tail__8399.push(o);
return (new cljs.core.PersistentVector(this__8398.meta,(this__8398.cnt + 1),this__8398.shift,this__8398.root,new_tail__8399,null));
} else
{var root_overflow_QMARK___8400 = ((this__8398.cnt >>> 5) > (1 << this__8398.shift));
var new_shift__8401 = ((root_overflow_QMARK___8400)?(this__8398.shift + 5):this__8398.shift);
var new_root__8403 = ((root_overflow_QMARK___8400)?(function (){var n_r__8402 = cljs.core.pv_fresh_node.call(null,null);
cljs.core.pv_aset.call(null,n_r__8402,0,this__8398.root);
cljs.core.pv_aset.call(null,n_r__8402,1,cljs.core.new_path.call(null,null,this__8398.shift,(new cljs.core.VectorNode(null,this__8398.tail))));
return n_r__8402;
})():cljs.core.push_tail.call(null,coll,this__8398.shift,this__8398.root,(new cljs.core.VectorNode(null,this__8398.tail))));
return (new cljs.core.PersistentVector(this__8398.meta,(this__8398.cnt + 1),new_shift__8401,new_root__8403,[o],null));
}
});
cljs.core.PersistentVector.prototype.cljs$core$IReversible$_rseq$arity$1 = (function (coll){
var this__8404 = this;
if((this__8404.cnt > 0))
{return (new cljs.core.RSeq(coll,(this__8404.cnt - 1),null));
} else
{return cljs.core.List.EMPTY;
}
});
cljs.core.PersistentVector.prototype.cljs$core$IMapEntry$_key$arity$1 = (function (coll){
var this__8405 = this;
return coll.cljs$core$IIndexed$_nth$arity$2(coll,0);
});
cljs.core.PersistentVector.prototype.cljs$core$IMapEntry$_val$arity$1 = (function (coll){
var this__8406 = this;
return coll.cljs$core$IIndexed$_nth$arity$2(coll,1);
});
cljs.core.PersistentVector.prototype.toString = (function (){
var this__8407 = this;
var this__8408 = this;
return cljs.core.pr_str.call(null,this__8408);
});
cljs.core.PersistentVector.prototype.cljs$core$IReduce$_reduce$arity$2 = (function (v,f){
var this__8409 = this;
return cljs.core.ci_reduce.call(null,v,f);
});
cljs.core.PersistentVector.prototype.cljs$core$IReduce$_reduce$arity$3 = (function (v,f,start){
var this__8410 = this;
return cljs.core.ci_reduce.call(null,v,f,start);
});
cljs.core.PersistentVector.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__8411 = this;
if((this__8411.cnt === 0))
{return null;
} else
{return cljs.core.chunked_seq.call(null,coll,0,0);
}
});
cljs.core.PersistentVector.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__8412 = this;
return this__8412.cnt;
});
cljs.core.PersistentVector.prototype.cljs$core$IStack$_peek$arity$1 = (function (coll){
var this__8413 = this;
if((this__8413.cnt > 0))
{return coll.cljs$core$IIndexed$_nth$arity$2(coll,(this__8413.cnt - 1));
} else
{return null;
}
});
cljs.core.PersistentVector.prototype.cljs$core$IStack$_pop$arity$1 = (function (coll){
var this__8414 = this;
if((this__8414.cnt === 0))
{throw (new Error("Can't pop empty vector"));
} else
{if((1 === this__8414.cnt))
{return cljs.core._with_meta.call(null,cljs.core.PersistentVector.EMPTY,this__8414.meta);
} else
{if((1 < (this__8414.cnt - cljs.core.tail_off.call(null,coll))))
{return (new cljs.core.PersistentVector(this__8414.meta,(this__8414.cnt - 1),this__8414.shift,this__8414.root,this__8414.tail.slice(0,-1),null));
} else
{if("\uFDD0'else")
{var new_tail__8415 = cljs.core.array_for.call(null,coll,(this__8414.cnt - 2));
var nr__8416 = cljs.core.pop_tail.call(null,coll,this__8414.shift,this__8414.root);
var new_root__8417 = (((nr__8416 == null))?cljs.core.PersistentVector.EMPTY_NODE:nr__8416);
var cnt_1__8418 = (this__8414.cnt - 1);
if((function (){var and__3822__auto____8419 = (5 < this__8414.shift);
if(and__3822__auto____8419)
{return (cljs.core.pv_aget.call(null,new_root__8417,1) == null);
} else
{return and__3822__auto____8419;
}
})())
{return (new cljs.core.PersistentVector(this__8414.meta,cnt_1__8418,(this__8414.shift - 5),cljs.core.pv_aget.call(null,new_root__8417,0),new_tail__8415,null));
} else
{return (new cljs.core.PersistentVector(this__8414.meta,cnt_1__8418,this__8414.shift,new_root__8417,new_tail__8415,null));
}
} else
{return null;
}
}
}
}
});
cljs.core.PersistentVector.prototype.cljs$core$IVector$_assoc_n$arity$3 = (function (coll,n,val){
var this__8420 = this;
return coll.cljs$core$IAssociative$_assoc$arity$3(coll,n,val);
});
cljs.core.PersistentVector.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__8421 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.PersistentVector.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__8422 = this;
return (new cljs.core.PersistentVector(meta,this__8422.cnt,this__8422.shift,this__8422.root,this__8422.tail,this__8422.__hash));
});
cljs.core.PersistentVector.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__8423 = this;
return this__8423.meta;
});
cljs.core.PersistentVector.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (coll,n){
var this__8424 = this;
return (cljs.core.array_for.call(null,coll,n)[(n & 31)]);
});
cljs.core.PersistentVector.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (coll,n,not_found){
var this__8425 = this;
if((function (){var and__3822__auto____8426 = (0 <= n);
if(and__3822__auto____8426)
{return (n < this__8425.cnt);
} else
{return and__3822__auto____8426;
}
})())
{return coll.cljs$core$IIndexed$_nth$arity$2(coll,n);
} else
{return not_found;
}
});
cljs.core.PersistentVector.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__8427 = this;
return cljs.core.with_meta.call(null,cljs.core.PersistentVector.EMPTY,this__8427.meta);
});
cljs.core.PersistentVector;
cljs.core.PersistentVector.EMPTY_NODE = cljs.core.pv_fresh_node.call(null,null);
cljs.core.PersistentVector.EMPTY = (new cljs.core.PersistentVector(null,0,5,cljs.core.PersistentVector.EMPTY_NODE,[],0));
cljs.core.PersistentVector.fromArray = (function (xs,no_clone){
var l__8432 = xs.length;
var xs__8433 = (((no_clone === true))?xs:xs.slice());
if((l__8432 < 32))
{return (new cljs.core.PersistentVector(null,l__8432,5,cljs.core.PersistentVector.EMPTY_NODE,xs__8433,null));
} else
{var node__8434 = xs__8433.slice(0,32);
var v__8435 = (new cljs.core.PersistentVector(null,32,5,cljs.core.PersistentVector.EMPTY_NODE,node__8434,null));
var i__8436 = 32;
var out__8437 = cljs.core._as_transient.call(null,v__8435);
while(true){
if((i__8436 < l__8432))
{{
var G__8438 = (i__8436 + 1);
var G__8439 = cljs.core.conj_BANG_.call(null,out__8437,(xs__8433[i__8436]));
i__8436 = G__8438;
out__8437 = G__8439;
continue;
}
} else
{return cljs.core.persistent_BANG_.call(null,out__8437);
}
break;
}
}
});
cljs.core.vec = (function vec(coll){
return cljs.core._persistent_BANG_.call(null,cljs.core.reduce.call(null,cljs.core._conj_BANG_,cljs.core._as_transient.call(null,cljs.core.PersistentVector.EMPTY),coll));
});
/**
* @param {...*} var_args
*/
cljs.core.vector = (function() { 
var vector__delegate = function (args){
return cljs.core.vec.call(null,args);
};
var vector = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return vector__delegate.call(this, args);
};
vector.cljs$lang$maxFixedArity = 0;
vector.cljs$lang$applyTo = (function (arglist__8440){
var args = cljs.core.seq(arglist__8440);;
return vector__delegate(args);
});
vector.cljs$lang$arity$variadic = vector__delegate;
return vector;
})()
;

/**
* @constructor
*/
cljs.core.ChunkedSeq = (function (vec,node,i,off,meta){
this.vec = vec;
this.node = node;
this.i = i;
this.off = off;
this.meta = meta;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 27525356;
})
cljs.core.ChunkedSeq.cljs$lang$type = true;
cljs.core.ChunkedSeq.cljs$lang$ctorPrSeq = (function (this__2315__auto__){
return cljs.core.list.call(null,"cljs.core/ChunkedSeq");
});
cljs.core.ChunkedSeq.prototype.cljs$core$INext$_next$arity$1 = (function (coll){
var this__8441 = this;
if(((this__8441.off + 1) < this__8441.node.length))
{var s__8442 = cljs.core.chunked_seq.call(null,this__8441.vec,this__8441.node,this__8441.i,(this__8441.off + 1));
if((s__8442 == null))
{return null;
} else
{return s__8442;
}
} else
{return coll.cljs$core$IChunkedNext$_chunked_next$arity$1(coll);
}
});
cljs.core.ChunkedSeq.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__8443 = this;
return cljs.core.cons.call(null,o,coll);
});
cljs.core.ChunkedSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__8444 = this;
return coll;
});
cljs.core.ChunkedSeq.prototype.cljs$core$ISeq$_first$arity$1 = (function (coll){
var this__8445 = this;
return (this__8445.node[this__8445.off]);
});
cljs.core.ChunkedSeq.prototype.cljs$core$ISeq$_rest$arity$1 = (function (coll){
var this__8446 = this;
if(((this__8446.off + 1) < this__8446.node.length))
{var s__8447 = cljs.core.chunked_seq.call(null,this__8446.vec,this__8446.node,this__8446.i,(this__8446.off + 1));
if((s__8447 == null))
{return cljs.core.List.EMPTY;
} else
{return s__8447;
}
} else
{return coll.cljs$core$IChunkedSeq$_chunked_rest$arity$1(coll);
}
});
cljs.core.ChunkedSeq.prototype.cljs$core$IChunkedNext$ = true;
cljs.core.ChunkedSeq.prototype.cljs$core$IChunkedNext$_chunked_next$arity$1 = (function (coll){
var this__8448 = this;
var l__8449 = this__8448.node.length;
var s__8450 = ((((this__8448.i + l__8449) < cljs.core._count.call(null,this__8448.vec)))?cljs.core.chunked_seq.call(null,this__8448.vec,(this__8448.i + l__8449),0):null);
if((s__8450 == null))
{return null;
} else
{return s__8450;
}
});
cljs.core.ChunkedSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__8451 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.ChunkedSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,m){
var this__8452 = this;
return cljs.core.chunked_seq.call(null,this__8452.vec,this__8452.node,this__8452.i,this__8452.off,m);
});
cljs.core.ChunkedSeq.prototype.cljs$core$IWithMeta$_meta$arity$1 = (function (coll){
var this__8453 = this;
return this__8453.meta;
});
cljs.core.ChunkedSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__8454 = this;
return cljs.core.with_meta.call(null,cljs.core.PersistentVector.EMPTY,this__8454.meta);
});
cljs.core.ChunkedSeq.prototype.cljs$core$IChunkedSeq$ = true;
cljs.core.ChunkedSeq.prototype.cljs$core$IChunkedSeq$_chunked_first$arity$1 = (function (coll){
var this__8455 = this;
return cljs.core.array_chunk.call(null,this__8455.node,this__8455.off);
});
cljs.core.ChunkedSeq.prototype.cljs$core$IChunkedSeq$_chunked_rest$arity$1 = (function (coll){
var this__8456 = this;
var l__8457 = this__8456.node.length;
var s__8458 = ((((this__8456.i + l__8457) < cljs.core._count.call(null,this__8456.vec)))?cljs.core.chunked_seq.call(null,this__8456.vec,(this__8456.i + l__8457),0):null);
if((s__8458 == null))
{return cljs.core.List.EMPTY;
} else
{return s__8458;
}
});
cljs.core.ChunkedSeq;
cljs.core.chunked_seq = (function() {
var chunked_seq = null;
var chunked_seq__3 = (function (vec,i,off){
return chunked_seq.call(null,vec,cljs.core.array_for.call(null,vec,i),i,off,null);
});
var chunked_seq__4 = (function (vec,node,i,off){
return chunked_seq.call(null,vec,node,i,off,null);
});
var chunked_seq__5 = (function (vec,node,i,off,meta){
return (new cljs.core.ChunkedSeq(vec,node,i,off,meta));
});
chunked_seq = function(vec,node,i,off,meta){
switch(arguments.length){
case 3:
return chunked_seq__3.call(this,vec,node,i);
case 4:
return chunked_seq__4.call(this,vec,node,i,off);
case 5:
return chunked_seq__5.call(this,vec,node,i,off,meta);
}
throw('Invalid arity: ' + arguments.length);
};
chunked_seq.cljs$lang$arity$3 = chunked_seq__3;
chunked_seq.cljs$lang$arity$4 = chunked_seq__4;
chunked_seq.cljs$lang$arity$5 = chunked_seq__5;
return chunked_seq;
})()
;

/**
* @constructor
*/
cljs.core.Subvec = (function (meta,v,start,end,__hash){
this.meta = meta;
this.v = v;
this.start = start;
this.end = end;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 32400159;
})
cljs.core.Subvec.cljs$lang$type = true;
cljs.core.Subvec.cljs$lang$ctorPrSeq = (function (this__2315__auto__){
return cljs.core.list.call(null,"cljs.core/Subvec");
});
cljs.core.Subvec.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__8461 = this;
var h__2198__auto____8462 = this__8461.__hash;
if(!((h__2198__auto____8462 == null)))
{return h__2198__auto____8462;
} else
{var h__2198__auto____8463 = cljs.core.hash_coll.call(null,coll);
this__8461.__hash = h__2198__auto____8463;
return h__2198__auto____8463;
}
});
cljs.core.Subvec.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (coll,k){
var this__8464 = this;
return coll.cljs$core$IIndexed$_nth$arity$3(coll,k,null);
});
cljs.core.Subvec.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (coll,k,not_found){
var this__8465 = this;
return coll.cljs$core$IIndexed$_nth$arity$3(coll,k,not_found);
});
cljs.core.Subvec.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (coll,key,val){
var this__8466 = this;
var v_pos__8467 = (this__8466.start + key);
return (new cljs.core.Subvec(this__8466.meta,cljs.core._assoc.call(null,this__8466.v,v_pos__8467,val),this__8466.start,((this__8466.end > (v_pos__8467 + 1)) ? this__8466.end : (v_pos__8467 + 1)),null));
});
cljs.core.Subvec.prototype.call = (function() {
var G__8493 = null;
var G__8493__2 = (function (this_sym8468,k){
var this__8470 = this;
var this_sym8468__8471 = this;
var coll__8472 = this_sym8468__8471;
return coll__8472.cljs$core$ILookup$_lookup$arity$2(coll__8472,k);
});
var G__8493__3 = (function (this_sym8469,k,not_found){
var this__8470 = this;
var this_sym8469__8473 = this;
var coll__8474 = this_sym8469__8473;
return coll__8474.cljs$core$ILookup$_lookup$arity$3(coll__8474,k,not_found);
});
G__8493 = function(this_sym8469,k,not_found){
switch(arguments.length){
case 2:
return G__8493__2.call(this,this_sym8469,k);
case 3:
return G__8493__3.call(this,this_sym8469,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__8493;
})()
;
cljs.core.Subvec.prototype.apply = (function (this_sym8459,args8460){
var this__8475 = this;
return this_sym8459.call.apply(this_sym8459,[this_sym8459].concat(args8460.slice()));
});
cljs.core.Subvec.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__8476 = this;
return (new cljs.core.Subvec(this__8476.meta,cljs.core._assoc_n.call(null,this__8476.v,this__8476.end,o),this__8476.start,(this__8476.end + 1),null));
});
cljs.core.Subvec.prototype.toString = (function (){
var this__8477 = this;
var this__8478 = this;
return cljs.core.pr_str.call(null,this__8478);
});
cljs.core.Subvec.prototype.cljs$core$IReduce$_reduce$arity$2 = (function (coll,f){
var this__8479 = this;
return cljs.core.ci_reduce.call(null,coll,f);
});
cljs.core.Subvec.prototype.cljs$core$IReduce$_reduce$arity$3 = (function (coll,f,start){
var this__8480 = this;
return cljs.core.ci_reduce.call(null,coll,f,start);
});
cljs.core.Subvec.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__8481 = this;
var subvec_seq__8482 = (function subvec_seq(i){
if((i === this__8481.end))
{return null;
} else
{return cljs.core.cons.call(null,cljs.core._nth.call(null,this__8481.v,i),(new cljs.core.LazySeq(null,false,(function (){
return subvec_seq.call(null,(i + 1));
}),null)));
}
});
return subvec_seq__8482.call(null,this__8481.start);
});
cljs.core.Subvec.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__8483 = this;
return (this__8483.end - this__8483.start);
});
cljs.core.Subvec.prototype.cljs$core$IStack$_peek$arity$1 = (function (coll){
var this__8484 = this;
return cljs.core._nth.call(null,this__8484.v,(this__8484.end - 1));
});
cljs.core.Subvec.prototype.cljs$core$IStack$_pop$arity$1 = (function (coll){
var this__8485 = this;
if((this__8485.start === this__8485.end))
{throw (new Error("Can't pop empty vector"));
} else
{return (new cljs.core.Subvec(this__8485.meta,this__8485.v,this__8485.start,(this__8485.end - 1),null));
}
});
cljs.core.Subvec.prototype.cljs$core$IVector$_assoc_n$arity$3 = (function (coll,n,val){
var this__8486 = this;
return coll.cljs$core$IAssociative$_assoc$arity$3(coll,n,val);
});
cljs.core.Subvec.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__8487 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.Subvec.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__8488 = this;
return (new cljs.core.Subvec(meta,this__8488.v,this__8488.start,this__8488.end,this__8488.__hash));
});
cljs.core.Subvec.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__8489 = this;
return this__8489.meta;
});
cljs.core.Subvec.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (coll,n){
var this__8490 = this;
return cljs.core._nth.call(null,this__8490.v,(this__8490.start + n));
});
cljs.core.Subvec.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (coll,n,not_found){
var this__8491 = this;
return cljs.core._nth.call(null,this__8491.v,(this__8491.start + n),not_found);
});
cljs.core.Subvec.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__8492 = this;
return cljs.core.with_meta.call(null,cljs.core.Vector.EMPTY,this__8492.meta);
});
cljs.core.Subvec;
/**
* Returns a persistent vector of the items in vector from
* start (inclusive) to end (exclusive).  If end is not supplied,
* defaults to (count vector). This operation is O(1) and very fast, as
* the resulting vector shares structure with the original and no
* trimming is done.
*/
cljs.core.subvec = (function() {
var subvec = null;
var subvec__2 = (function (v,start){
return subvec.call(null,v,start,cljs.core.count.call(null,v));
});
var subvec__3 = (function (v,start,end){
return (new cljs.core.Subvec(null,v,start,end,null));
});
subvec = function(v,start,end){
switch(arguments.length){
case 2:
return subvec__2.call(this,v,start);
case 3:
return subvec__3.call(this,v,start,end);
}
throw('Invalid arity: ' + arguments.length);
};
subvec.cljs$lang$arity$2 = subvec__2;
subvec.cljs$lang$arity$3 = subvec__3;
return subvec;
})()
;
cljs.core.tv_ensure_editable = (function tv_ensure_editable(edit,node){
if((edit === node.edit))
{return node;
} else
{return (new cljs.core.VectorNode(edit,node.arr.slice()));
}
});
cljs.core.tv_editable_root = (function tv_editable_root(node){
return (new cljs.core.VectorNode({},node.arr.slice()));
});
cljs.core.tv_editable_tail = (function tv_editable_tail(tl){
var ret__8495 = cljs.core.make_array.call(null,32);
cljs.core.array_copy.call(null,tl,0,ret__8495,0,tl.length);
return ret__8495;
});
cljs.core.tv_push_tail = (function tv_push_tail(tv,level,parent,tail_node){
var ret__8499 = cljs.core.tv_ensure_editable.call(null,tv.root.edit,parent);
var subidx__8500 = (((tv.cnt - 1) >>> level) & 31);
cljs.core.pv_aset.call(null,ret__8499,subidx__8500,(((level === 5))?tail_node:(function (){var child__8501 = cljs.core.pv_aget.call(null,ret__8499,subidx__8500);
if(!((child__8501 == null)))
{return tv_push_tail.call(null,tv,(level - 5),child__8501,tail_node);
} else
{return cljs.core.new_path.call(null,tv.root.edit,(level - 5),tail_node);
}
})()));
return ret__8499;
});
cljs.core.tv_pop_tail = (function tv_pop_tail(tv,level,node){
var node__8506 = cljs.core.tv_ensure_editable.call(null,tv.root.edit,node);
var subidx__8507 = (((tv.cnt - 2) >>> level) & 31);
if((level > 5))
{var new_child__8508 = tv_pop_tail.call(null,tv,(level - 5),cljs.core.pv_aget.call(null,node__8506,subidx__8507));
if((function (){var and__3822__auto____8509 = (new_child__8508 == null);
if(and__3822__auto____8509)
{return (subidx__8507 === 0);
} else
{return and__3822__auto____8509;
}
})())
{return null;
} else
{cljs.core.pv_aset.call(null,node__8506,subidx__8507,new_child__8508);
return node__8506;
}
} else
{if((subidx__8507 === 0))
{return null;
} else
{if("\uFDD0'else")
{cljs.core.pv_aset.call(null,node__8506,subidx__8507,null);
return node__8506;
} else
{return null;
}
}
}
});
cljs.core.editable_array_for = (function editable_array_for(tv,i){
if((function (){var and__3822__auto____8514 = (0 <= i);
if(and__3822__auto____8514)
{return (i < tv.cnt);
} else
{return and__3822__auto____8514;
}
})())
{if((i >= cljs.core.tail_off.call(null,tv)))
{return tv.tail;
} else
{var root__8515 = tv.root;
var node__8516 = root__8515;
var level__8517 = tv.shift;
while(true){
if((level__8517 > 0))
{{
var G__8518 = cljs.core.tv_ensure_editable.call(null,root__8515.edit,cljs.core.pv_aget.call(null,node__8516,((i >>> level__8517) & 31)));
var G__8519 = (level__8517 - 5);
node__8516 = G__8518;
level__8517 = G__8519;
continue;
}
} else
{return node__8516.arr;
}
break;
}
}
} else
{throw (new Error([cljs.core.str("No item "),cljs.core.str(i),cljs.core.str(" in transient vector of length "),cljs.core.str(tv.cnt)].join('')));
}
});

/**
* @constructor
*/
cljs.core.TransientVector = (function (cnt,shift,root,tail){
this.cnt = cnt;
this.shift = shift;
this.root = root;
this.tail = tail;
this.cljs$lang$protocol_mask$partition0$ = 275;
this.cljs$lang$protocol_mask$partition1$ = 22;
})
cljs.core.TransientVector.cljs$lang$type = true;
cljs.core.TransientVector.cljs$lang$ctorPrSeq = (function (this__2315__auto__){
return cljs.core.list.call(null,"cljs.core/TransientVector");
});
cljs.core.TransientVector.prototype.call = (function() {
var G__8559 = null;
var G__8559__2 = (function (this_sym8522,k){
var this__8524 = this;
var this_sym8522__8525 = this;
var coll__8526 = this_sym8522__8525;
return coll__8526.cljs$core$ILookup$_lookup$arity$2(coll__8526,k);
});
var G__8559__3 = (function (this_sym8523,k,not_found){
var this__8524 = this;
var this_sym8523__8527 = this;
var coll__8528 = this_sym8523__8527;
return coll__8528.cljs$core$ILookup$_lookup$arity$3(coll__8528,k,not_found);
});
G__8559 = function(this_sym8523,k,not_found){
switch(arguments.length){
case 2:
return G__8559__2.call(this,this_sym8523,k);
case 3:
return G__8559__3.call(this,this_sym8523,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__8559;
})()
;
cljs.core.TransientVector.prototype.apply = (function (this_sym8520,args8521){
var this__8529 = this;
return this_sym8520.call.apply(this_sym8520,[this_sym8520].concat(args8521.slice()));
});
cljs.core.TransientVector.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (coll,k){
var this__8530 = this;
return coll.cljs$core$IIndexed$_nth$arity$3(coll,k,null);
});
cljs.core.TransientVector.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (coll,k,not_found){
var this__8531 = this;
return coll.cljs$core$IIndexed$_nth$arity$3(coll,k,not_found);
});
cljs.core.TransientVector.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (coll,n){
var this__8532 = this;
if(this__8532.root.edit)
{return (cljs.core.array_for.call(null,coll,n)[(n & 31)]);
} else
{throw (new Error("nth after persistent!"));
}
});
cljs.core.TransientVector.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (coll,n,not_found){
var this__8533 = this;
if((function (){var and__3822__auto____8534 = (0 <= n);
if(and__3822__auto____8534)
{return (n < this__8533.cnt);
} else
{return and__3822__auto____8534;
}
})())
{return coll.cljs$core$IIndexed$_nth$arity$2(coll,n);
} else
{return not_found;
}
});
cljs.core.TransientVector.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__8535 = this;
if(this__8535.root.edit)
{return this__8535.cnt;
} else
{throw (new Error("count after persistent!"));
}
});
cljs.core.TransientVector.prototype.cljs$core$ITransientVector$_assoc_n_BANG_$arity$3 = (function (tcoll,n,val){
var this__8536 = this;
if(this__8536.root.edit)
{if((function (){var and__3822__auto____8537 = (0 <= n);
if(and__3822__auto____8537)
{return (n < this__8536.cnt);
} else
{return and__3822__auto____8537;
}
})())
{if((cljs.core.tail_off.call(null,tcoll) <= n))
{(this__8536.tail[(n & 31)] = val);
return tcoll;
} else
{var new_root__8542 = (function go(level,node){
var node__8540 = cljs.core.tv_ensure_editable.call(null,this__8536.root.edit,node);
if((level === 0))
{cljs.core.pv_aset.call(null,node__8540,(n & 31),val);
return node__8540;
} else
{var subidx__8541 = ((n >>> level) & 31);
cljs.core.pv_aset.call(null,node__8540,subidx__8541,go.call(null,(level - 5),cljs.core.pv_aget.call(null,node__8540,subidx__8541)));
return node__8540;
}
}).call(null,this__8536.shift,this__8536.root);
this__8536.root = new_root__8542;
return tcoll;
}
} else
{if((n === this__8536.cnt))
{return tcoll.cljs$core$ITransientCollection$_conj_BANG_$arity$2(tcoll,val);
} else
{if("\uFDD0'else")
{throw (new Error([cljs.core.str("Index "),cljs.core.str(n),cljs.core.str(" out of bounds for TransientVector of length"),cljs.core.str(this__8536.cnt)].join('')));
} else
{return null;
}
}
}
} else
{throw (new Error("assoc! after persistent!"));
}
});
cljs.core.TransientVector.prototype.cljs$core$ITransientVector$_pop_BANG_$arity$1 = (function (tcoll){
var this__8543 = this;
if(this__8543.root.edit)
{if((this__8543.cnt === 0))
{throw (new Error("Can't pop empty vector"));
} else
{if((1 === this__8543.cnt))
{this__8543.cnt = 0;
return tcoll;
} else
{if((((this__8543.cnt - 1) & 31) > 0))
{this__8543.cnt = (this__8543.cnt - 1);
return tcoll;
} else
{if("\uFDD0'else")
{var new_tail__8544 = cljs.core.editable_array_for.call(null,tcoll,(this__8543.cnt - 2));
var new_root__8546 = (function (){var nr__8545 = cljs.core.tv_pop_tail.call(null,tcoll,this__8543.shift,this__8543.root);
if(!((nr__8545 == null)))
{return nr__8545;
} else
{return (new cljs.core.VectorNode(this__8543.root.edit,cljs.core.make_array.call(null,32)));
}
})();
if((function (){var and__3822__auto____8547 = (5 < this__8543.shift);
if(and__3822__auto____8547)
{return (cljs.core.pv_aget.call(null,new_root__8546,1) == null);
} else
{return and__3822__auto____8547;
}
})())
{var new_root__8548 = cljs.core.tv_ensure_editable.call(null,this__8543.root.edit,cljs.core.pv_aget.call(null,new_root__8546,0));
this__8543.root = new_root__8548;
this__8543.shift = (this__8543.shift - 5);
this__8543.cnt = (this__8543.cnt - 1);
this__8543.tail = new_tail__8544;
return tcoll;
} else
{this__8543.root = new_root__8546;
this__8543.cnt = (this__8543.cnt - 1);
this__8543.tail = new_tail__8544;
return tcoll;
}
} else
{return null;
}
}
}
}
} else
{throw (new Error("pop! after persistent!"));
}
});
cljs.core.TransientVector.prototype.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3 = (function (tcoll,key,val){
var this__8549 = this;
return tcoll.cljs$core$ITransientVector$_assoc_n_BANG_$arity$3(tcoll,key,val);
});
cljs.core.TransientVector.prototype.cljs$core$ITransientCollection$_conj_BANG_$arity$2 = (function (tcoll,o){
var this__8550 = this;
if(this__8550.root.edit)
{if(((this__8550.cnt - cljs.core.tail_off.call(null,tcoll)) < 32))
{(this__8550.tail[(this__8550.cnt & 31)] = o);
this__8550.cnt = (this__8550.cnt + 1);
return tcoll;
} else
{var tail_node__8551 = (new cljs.core.VectorNode(this__8550.root.edit,this__8550.tail));
var new_tail__8552 = cljs.core.make_array.call(null,32);
(new_tail__8552[0] = o);
this__8550.tail = new_tail__8552;
if(((this__8550.cnt >>> 5) > (1 << this__8550.shift)))
{var new_root_array__8553 = cljs.core.make_array.call(null,32);
var new_shift__8554 = (this__8550.shift + 5);
(new_root_array__8553[0] = this__8550.root);
(new_root_array__8553[1] = cljs.core.new_path.call(null,this__8550.root.edit,this__8550.shift,tail_node__8551));
this__8550.root = (new cljs.core.VectorNode(this__8550.root.edit,new_root_array__8553));
this__8550.shift = new_shift__8554;
this__8550.cnt = (this__8550.cnt + 1);
return tcoll;
} else
{var new_root__8555 = cljs.core.tv_push_tail.call(null,tcoll,this__8550.shift,this__8550.root,tail_node__8551);
this__8550.root = new_root__8555;
this__8550.cnt = (this__8550.cnt + 1);
return tcoll;
}
}
} else
{throw (new Error("conj! after persistent!"));
}
});
cljs.core.TransientVector.prototype.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 = (function (tcoll){
var this__8556 = this;
if(this__8556.root.edit)
{this__8556.root.edit = null;
var len__8557 = (this__8556.cnt - cljs.core.tail_off.call(null,tcoll));
var trimmed_tail__8558 = cljs.core.make_array.call(null,len__8557);
cljs.core.array_copy.call(null,this__8556.tail,0,trimmed_tail__8558,0,len__8557);
return (new cljs.core.PersistentVector(null,this__8556.cnt,this__8556.shift,this__8556.root,trimmed_tail__8558,null));
} else
{throw (new Error("persistent! called twice"));
}
});
cljs.core.TransientVector;

/**
* @constructor
*/
cljs.core.PersistentQueueSeq = (function (meta,front,rear,__hash){
this.meta = meta;
this.front = front;
this.rear = rear;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 31850572;
})
cljs.core.PersistentQueueSeq.cljs$lang$type = true;
cljs.core.PersistentQueueSeq.cljs$lang$ctorPrSeq = (function (this__2315__auto__){
return cljs.core.list.call(null,"cljs.core/PersistentQueueSeq");
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__8560 = this;
var h__2198__auto____8561 = this__8560.__hash;
if(!((h__2198__auto____8561 == null)))
{return h__2198__auto____8561;
} else
{var h__2198__auto____8562 = cljs.core.hash_coll.call(null,coll);
this__8560.__hash = h__2198__auto____8562;
return h__2198__auto____8562;
}
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__8563 = this;
return cljs.core.cons.call(null,o,coll);
});
cljs.core.PersistentQueueSeq.prototype.toString = (function (){
var this__8564 = this;
var this__8565 = this;
return cljs.core.pr_str.call(null,this__8565);
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__8566 = this;
return coll;
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeq$_first$arity$1 = (function (coll){
var this__8567 = this;
return cljs.core._first.call(null,this__8567.front);
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeq$_rest$arity$1 = (function (coll){
var this__8568 = this;
var temp__3971__auto____8569 = cljs.core.next.call(null,this__8568.front);
if(temp__3971__auto____8569)
{var f1__8570 = temp__3971__auto____8569;
return (new cljs.core.PersistentQueueSeq(this__8568.meta,f1__8570,this__8568.rear,null));
} else
{if((this__8568.rear == null))
{return coll.cljs$core$IEmptyableCollection$_empty$arity$1(coll);
} else
{return (new cljs.core.PersistentQueueSeq(this__8568.meta,this__8568.rear,null,null));
}
}
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__8571 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__8572 = this;
return (new cljs.core.PersistentQueueSeq(meta,this__8572.front,this__8572.rear,this__8572.__hash));
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__8573 = this;
return this__8573.meta;
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__8574 = this;
return cljs.core.with_meta.call(null,cljs.core.List.EMPTY,this__8574.meta);
});
cljs.core.PersistentQueueSeq;

/**
* @constructor
*/
cljs.core.PersistentQueue = (function (meta,count,front,rear,__hash){
this.meta = meta;
this.count = count;
this.front = front;
this.rear = rear;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 31858766;
})
cljs.core.PersistentQueue.cljs$lang$type = true;
cljs.core.PersistentQueue.cljs$lang$ctorPrSeq = (function (this__2315__auto__){
return cljs.core.list.call(null,"cljs.core/PersistentQueue");
});
cljs.core.PersistentQueue.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__8575 = this;
var h__2198__auto____8576 = this__8575.__hash;
if(!((h__2198__auto____8576 == null)))
{return h__2198__auto____8576;
} else
{var h__2198__auto____8577 = cljs.core.hash_coll.call(null,coll);
this__8575.__hash = h__2198__auto____8577;
return h__2198__auto____8577;
}
});
cljs.core.PersistentQueue.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__8578 = this;
if(cljs.core.truth_(this__8578.front))
{return (new cljs.core.PersistentQueue(this__8578.meta,(this__8578.count + 1),this__8578.front,cljs.core.conj.call(null,(function (){var or__3824__auto____8579 = this__8578.rear;
if(cljs.core.truth_(or__3824__auto____8579))
{return or__3824__auto____8579;
} else
{return cljs.core.PersistentVector.EMPTY;
}
})(),o),null));
} else
{return (new cljs.core.PersistentQueue(this__8578.meta,(this__8578.count + 1),cljs.core.conj.call(null,this__8578.front,o),cljs.core.PersistentVector.EMPTY,null));
}
});
cljs.core.PersistentQueue.prototype.toString = (function (){
var this__8580 = this;
var this__8581 = this;
return cljs.core.pr_str.call(null,this__8581);
});
cljs.core.PersistentQueue.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__8582 = this;
var rear__8583 = cljs.core.seq.call(null,this__8582.rear);
if(cljs.core.truth_((function (){var or__3824__auto____8584 = this__8582.front;
if(cljs.core.truth_(or__3824__auto____8584))
{return or__3824__auto____8584;
} else
{return rear__8583;
}
})()))
{return (new cljs.core.PersistentQueueSeq(null,this__8582.front,cljs.core.seq.call(null,rear__8583),null));
} else
{return null;
}
});
cljs.core.PersistentQueue.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__8585 = this;
return this__8585.count;
});
cljs.core.PersistentQueue.prototype.cljs$core$IStack$_peek$arity$1 = (function (coll){
var this__8586 = this;
return cljs.core._first.call(null,this__8586.front);
});
cljs.core.PersistentQueue.prototype.cljs$core$IStack$_pop$arity$1 = (function (coll){
var this__8587 = this;
if(cljs.core.truth_(this__8587.front))
{var temp__3971__auto____8588 = cljs.core.next.call(null,this__8587.front);
if(temp__3971__auto____8588)
{var f1__8589 = temp__3971__auto____8588;
return (new cljs.core.PersistentQueue(this__8587.meta,(this__8587.count - 1),f1__8589,this__8587.rear,null));
} else
{return (new cljs.core.PersistentQueue(this__8587.meta,(this__8587.count - 1),cljs.core.seq.call(null,this__8587.rear),cljs.core.PersistentVector.EMPTY,null));
}
} else
{return coll;
}
});
cljs.core.PersistentQueue.prototype.cljs$core$ISeq$_first$arity$1 = (function (coll){
var this__8590 = this;
return cljs.core.first.call(null,this__8590.front);
});
cljs.core.PersistentQueue.prototype.cljs$core$ISeq$_rest$arity$1 = (function (coll){
var this__8591 = this;
return cljs.core.rest.call(null,cljs.core.seq.call(null,coll));
});
cljs.core.PersistentQueue.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__8592 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.PersistentQueue.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__8593 = this;
return (new cljs.core.PersistentQueue(meta,this__8593.count,this__8593.front,this__8593.rear,this__8593.__hash));
});
cljs.core.PersistentQueue.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__8594 = this;
return this__8594.meta;
});
cljs.core.PersistentQueue.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__8595 = this;
return cljs.core.PersistentQueue.EMPTY;
});
cljs.core.PersistentQueue;
cljs.core.PersistentQueue.EMPTY = (new cljs.core.PersistentQueue(null,0,null,cljs.core.PersistentVector.EMPTY,0));

/**
* @constructor
*/
cljs.core.NeverEquiv = (function (){
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 2097152;
})
cljs.core.NeverEquiv.cljs$lang$type = true;
cljs.core.NeverEquiv.cljs$lang$ctorPrSeq = (function (this__2315__auto__){
return cljs.core.list.call(null,"cljs.core/NeverEquiv");
});
cljs.core.NeverEquiv.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (o,other){
var this__8596 = this;
return false;
});
cljs.core.NeverEquiv;
cljs.core.never_equiv = (new cljs.core.NeverEquiv());
/**
* Assumes y is a map. Returns true if x equals y, otherwise returns
* false.
*/
cljs.core.equiv_map = (function equiv_map(x,y){
return cljs.core.boolean$.call(null,((cljs.core.map_QMARK_.call(null,y))?(((cljs.core.count.call(null,x) === cljs.core.count.call(null,y)))?cljs.core.every_QMARK_.call(null,cljs.core.identity,cljs.core.map.call(null,(function (xkv){
return cljs.core._EQ_.call(null,cljs.core._lookup.call(null,y,cljs.core.first.call(null,xkv),cljs.core.never_equiv),cljs.core.second.call(null,xkv));
}),x)):null):null));
});
cljs.core.scan_array = (function scan_array(incr,k,array){
var len__8599 = array.length;
var i__8600 = 0;
while(true){
if((i__8600 < len__8599))
{if((k === (array[i__8600])))
{return i__8600;
} else
{{
var G__8601 = (i__8600 + incr);
i__8600 = G__8601;
continue;
}
}
} else
{return null;
}
break;
}
});
cljs.core.obj_map_compare_keys = (function obj_map_compare_keys(a,b){
var a__8604 = cljs.core.hash.call(null,a);
var b__8605 = cljs.core.hash.call(null,b);
if((a__8604 < b__8605))
{return -1;
} else
{if((a__8604 > b__8605))
{return 1;
} else
{if("\uFDD0'else")
{return 0;
} else
{return null;
}
}
}
});
cljs.core.obj_map__GT_hash_map = (function obj_map__GT_hash_map(m,k,v){
var ks__8613 = m.keys;
var len__8614 = ks__8613.length;
var so__8615 = m.strobj;
var out__8616 = cljs.core.with_meta.call(null,cljs.core.PersistentHashMap.EMPTY,cljs.core.meta.call(null,m));
var i__8617 = 0;
var out__8618 = cljs.core.transient$.call(null,out__8616);
while(true){
if((i__8617 < len__8614))
{var k__8619 = (ks__8613[i__8617]);
{
var G__8620 = (i__8617 + 1);
var G__8621 = cljs.core.assoc_BANG_.call(null,out__8618,k__8619,(so__8615[k__8619]));
i__8617 = G__8620;
out__8618 = G__8621;
continue;
}
} else
{return cljs.core.persistent_BANG_.call(null,cljs.core.assoc_BANG_.call(null,out__8618,k,v));
}
break;
}
});
cljs.core.obj_clone = (function obj_clone(obj,ks){
var new_obj__8627 = {};
var l__8628 = ks.length;
var i__8629 = 0;
while(true){
if((i__8629 < l__8628))
{var k__8630 = (ks[i__8629]);
(new_obj__8627[k__8630] = (obj[k__8630]));
{
var G__8631 = (i__8629 + 1);
i__8629 = G__8631;
continue;
}
} else
{}
break;
}
return new_obj__8627;
});

/**
* @constructor
*/
cljs.core.ObjMap = (function (meta,keys,strobj,update_count,__hash){
this.meta = meta;
this.keys = keys;
this.strobj = strobj;
this.update_count = update_count;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 1;
this.cljs$lang$protocol_mask$partition0$ = 15075087;
})
cljs.core.ObjMap.cljs$lang$type = true;
cljs.core.ObjMap.cljs$lang$ctorPrSeq = (function (this__2315__auto__){
return cljs.core.list.call(null,"cljs.core/ObjMap");
});
cljs.core.ObjMap.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = (function (coll){
var this__8634 = this;
return cljs.core.transient$.call(null,cljs.core.into.call(null,cljs.core.hash_map.call(null),coll));
});
cljs.core.ObjMap.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__8635 = this;
var h__2198__auto____8636 = this__8635.__hash;
if(!((h__2198__auto____8636 == null)))
{return h__2198__auto____8636;
} else
{var h__2198__auto____8637 = cljs.core.hash_imap.call(null,coll);
this__8635.__hash = h__2198__auto____8637;
return h__2198__auto____8637;
}
});
cljs.core.ObjMap.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (coll,k){
var this__8638 = this;
return coll.cljs$core$ILookup$_lookup$arity$3(coll,k,null);
});
cljs.core.ObjMap.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (coll,k,not_found){
var this__8639 = this;
if((function (){var and__3822__auto____8640 = goog.isString(k);
if(and__3822__auto____8640)
{return !((cljs.core.scan_array.call(null,1,k,this__8639.keys) == null));
} else
{return and__3822__auto____8640;
}
})())
{return (this__8639.strobj[k]);
} else
{return not_found;
}
});
cljs.core.ObjMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (coll,k,v){
var this__8641 = this;
if(goog.isString(k))
{if((function (){var or__3824__auto____8642 = (this__8641.update_count > cljs.core.ObjMap.HASHMAP_THRESHOLD);
if(or__3824__auto____8642)
{return or__3824__auto____8642;
} else
{return (this__8641.keys.length >= cljs.core.ObjMap.HASHMAP_THRESHOLD);
}
})())
{return cljs.core.obj_map__GT_hash_map.call(null,coll,k,v);
} else
{if(!((cljs.core.scan_array.call(null,1,k,this__8641.keys) == null)))
{var new_strobj__8643 = cljs.core.obj_clone.call(null,this__8641.strobj,this__8641.keys);
(new_strobj__8643[k] = v);
return (new cljs.core.ObjMap(this__8641.meta,this__8641.keys,new_strobj__8643,(this__8641.update_count + 1),null));
} else
{var new_strobj__8644 = cljs.core.obj_clone.call(null,this__8641.strobj,this__8641.keys);
var new_keys__8645 = this__8641.keys.slice();
(new_strobj__8644[k] = v);
new_keys__8645.push(k);
return (new cljs.core.ObjMap(this__8641.meta,new_keys__8645,new_strobj__8644,(this__8641.update_count + 1),null));
}
}
} else
{return cljs.core.obj_map__GT_hash_map.call(null,coll,k,v);
}
});
cljs.core.ObjMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (coll,k){
var this__8646 = this;
if((function (){var and__3822__auto____8647 = goog.isString(k);
if(and__3822__auto____8647)
{return !((cljs.core.scan_array.call(null,1,k,this__8646.keys) == null));
} else
{return and__3822__auto____8647;
}
})())
{return true;
} else
{return false;
}
});
cljs.core.ObjMap.prototype.call = (function() {
var G__8669 = null;
var G__8669__2 = (function (this_sym8648,k){
var this__8650 = this;
var this_sym8648__8651 = this;
var coll__8652 = this_sym8648__8651;
return coll__8652.cljs$core$ILookup$_lookup$arity$2(coll__8652,k);
});
var G__8669__3 = (function (this_sym8649,k,not_found){
var this__8650 = this;
var this_sym8649__8653 = this;
var coll__8654 = this_sym8649__8653;
return coll__8654.cljs$core$ILookup$_lookup$arity$3(coll__8654,k,not_found);
});
G__8669 = function(this_sym8649,k,not_found){
switch(arguments.length){
case 2:
return G__8669__2.call(this,this_sym8649,k);
case 3:
return G__8669__3.call(this,this_sym8649,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__8669;
})()
;
cljs.core.ObjMap.prototype.apply = (function (this_sym8632,args8633){
var this__8655 = this;
return this_sym8632.call.apply(this_sym8632,[this_sym8632].concat(args8633.slice()));
});
cljs.core.ObjMap.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,entry){
var this__8656 = this;
if(cljs.core.vector_QMARK_.call(null,entry))
{return coll.cljs$core$IAssociative$_assoc$arity$3(coll,cljs.core._nth.call(null,entry,0),cljs.core._nth.call(null,entry,1));
} else
{return cljs.core.reduce.call(null,cljs.core._conj,coll,entry);
}
});
cljs.core.ObjMap.prototype.toString = (function (){
var this__8657 = this;
var this__8658 = this;
return cljs.core.pr_str.call(null,this__8658);
});
cljs.core.ObjMap.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__8659 = this;
if((this__8659.keys.length > 0))
{return cljs.core.map.call(null,(function (p1__8622_SHARP_){
return cljs.core.vector.call(null,p1__8622_SHARP_,(this__8659.strobj[p1__8622_SHARP_]));
}),this__8659.keys.sort(cljs.core.obj_map_compare_keys));
} else
{return null;
}
});
cljs.core.ObjMap.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__8660 = this;
return this__8660.keys.length;
});
cljs.core.ObjMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__8661 = this;
return cljs.core.equiv_map.call(null,coll,other);
});
cljs.core.ObjMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__8662 = this;
return (new cljs.core.ObjMap(meta,this__8662.keys,this__8662.strobj,this__8662.update_count,this__8662.__hash));
});
cljs.core.ObjMap.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__8663 = this;
return this__8663.meta;
});
cljs.core.ObjMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__8664 = this;
return cljs.core.with_meta.call(null,cljs.core.ObjMap.EMPTY,this__8664.meta);
});
cljs.core.ObjMap.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (coll,k){
var this__8665 = this;
if((function (){var and__3822__auto____8666 = goog.isString(k);
if(and__3822__auto____8666)
{return !((cljs.core.scan_array.call(null,1,k,this__8665.keys) == null));
} else
{return and__3822__auto____8666;
}
})())
{var new_keys__8667 = this__8665.keys.slice();
var new_strobj__8668 = cljs.core.obj_clone.call(null,this__8665.strobj,this__8665.keys);
new_keys__8667.splice(cljs.core.scan_array.call(null,1,k,new_keys__8667),1);
cljs.core.js_delete.call(null,new_strobj__8668,k);
return (new cljs.core.ObjMap(this__8665.meta,new_keys__8667,new_strobj__8668,(this__8665.update_count + 1),null));
} else
{return coll;
}
});
cljs.core.ObjMap;
cljs.core.ObjMap.EMPTY = (new cljs.core.ObjMap(null,[],{},0,0));
cljs.core.ObjMap.HASHMAP_THRESHOLD = 32;
cljs.core.ObjMap.fromObject = (function (ks,obj){
return (new cljs.core.ObjMap(null,ks,obj,0,null));
});

/**
* @constructor
*/
cljs.core.HashMap = (function (meta,count,hashobj,__hash){
this.meta = meta;
this.count = count;
this.hashobj = hashobj;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 15075087;
})
cljs.core.HashMap.cljs$lang$type = true;
cljs.core.HashMap.cljs$lang$ctorPrSeq = (function (this__2315__auto__){
return cljs.core.list.call(null,"cljs.core/HashMap");
});
cljs.core.HashMap.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__8673 = this;
var h__2198__auto____8674 = this__8673.__hash;
if(!((h__2198__auto____8674 == null)))
{return h__2198__auto____8674;
} else
{var h__2198__auto____8675 = cljs.core.hash_imap.call(null,coll);
this__8673.__hash = h__2198__auto____8675;
return h__2198__auto____8675;
}
});
cljs.core.HashMap.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (coll,k){
var this__8676 = this;
return coll.cljs$core$ILookup$_lookup$arity$3(coll,k,null);
});
cljs.core.HashMap.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (coll,k,not_found){
var this__8677 = this;
var bucket__8678 = (this__8677.hashobj[cljs.core.hash.call(null,k)]);
var i__8679 = (cljs.core.truth_(bucket__8678)?cljs.core.scan_array.call(null,2,k,bucket__8678):null);
if(cljs.core.truth_(i__8679))
{return (bucket__8678[(i__8679 + 1)]);
} else
{return not_found;
}
});
cljs.core.HashMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (coll,k,v){
var this__8680 = this;
var h__8681 = cljs.core.hash.call(null,k);
var bucket__8682 = (this__8680.hashobj[h__8681]);
if(cljs.core.truth_(bucket__8682))
{var new_bucket__8683 = bucket__8682.slice();
var new_hashobj__8684 = goog.object.clone(this__8680.hashobj);
(new_hashobj__8684[h__8681] = new_bucket__8683);
var temp__3971__auto____8685 = cljs.core.scan_array.call(null,2,k,new_bucket__8683);
if(cljs.core.truth_(temp__3971__auto____8685))
{var i__8686 = temp__3971__auto____8685;
(new_bucket__8683[(i__8686 + 1)] = v);
return (new cljs.core.HashMap(this__8680.meta,this__8680.count,new_hashobj__8684,null));
} else
{new_bucket__8683.push(k,v);
return (new cljs.core.HashMap(this__8680.meta,(this__8680.count + 1),new_hashobj__8684,null));
}
} else
{var new_hashobj__8687 = goog.object.clone(this__8680.hashobj);
(new_hashobj__8687[h__8681] = [k,v]);
return (new cljs.core.HashMap(this__8680.meta,(this__8680.count + 1),new_hashobj__8687,null));
}
});
cljs.core.HashMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (coll,k){
var this__8688 = this;
var bucket__8689 = (this__8688.hashobj[cljs.core.hash.call(null,k)]);
var i__8690 = (cljs.core.truth_(bucket__8689)?cljs.core.scan_array.call(null,2,k,bucket__8689):null);
if(cljs.core.truth_(i__8690))
{return true;
} else
{return false;
}
});
cljs.core.HashMap.prototype.call = (function() {
var G__8715 = null;
var G__8715__2 = (function (this_sym8691,k){
var this__8693 = this;
var this_sym8691__8694 = this;
var coll__8695 = this_sym8691__8694;
return coll__8695.cljs$core$ILookup$_lookup$arity$2(coll__8695,k);
});
var G__8715__3 = (function (this_sym8692,k,not_found){
var this__8693 = this;
var this_sym8692__8696 = this;
var coll__8697 = this_sym8692__8696;
return coll__8697.cljs$core$ILookup$_lookup$arity$3(coll__8697,k,not_found);
});
G__8715 = function(this_sym8692,k,not_found){
switch(arguments.length){
case 2:
return G__8715__2.call(this,this_sym8692,k);
case 3:
return G__8715__3.call(this,this_sym8692,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__8715;
})()
;
cljs.core.HashMap.prototype.apply = (function (this_sym8671,args8672){
var this__8698 = this;
return this_sym8671.call.apply(this_sym8671,[this_sym8671].concat(args8672.slice()));
});
cljs.core.HashMap.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,entry){
var this__8699 = this;
if(cljs.core.vector_QMARK_.call(null,entry))
{return coll.cljs$core$IAssociative$_assoc$arity$3(coll,cljs.core._nth.call(null,entry,0),cljs.core._nth.call(null,entry,1));
} else
{return cljs.core.reduce.call(null,cljs.core._conj,coll,entry);
}
});
cljs.core.HashMap.prototype.toString = (function (){
var this__8700 = this;
var this__8701 = this;
return cljs.core.pr_str.call(null,this__8701);
});
cljs.core.HashMap.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__8702 = this;
if((this__8702.count > 0))
{var hashes__8703 = cljs.core.js_keys.call(null,this__8702.hashobj).sort();
return cljs.core.mapcat.call(null,(function (p1__8670_SHARP_){
return cljs.core.map.call(null,cljs.core.vec,cljs.core.partition.call(null,2,(this__8702.hashobj[p1__8670_SHARP_])));
}),hashes__8703);
} else
{return null;
}
});
cljs.core.HashMap.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__8704 = this;
return this__8704.count;
});
cljs.core.HashMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__8705 = this;
return cljs.core.equiv_map.call(null,coll,other);
});
cljs.core.HashMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__8706 = this;
return (new cljs.core.HashMap(meta,this__8706.count,this__8706.hashobj,this__8706.__hash));
});
cljs.core.HashMap.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__8707 = this;
return this__8707.meta;
});
cljs.core.HashMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__8708 = this;
return cljs.core.with_meta.call(null,cljs.core.HashMap.EMPTY,this__8708.meta);
});
cljs.core.HashMap.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (coll,k){
var this__8709 = this;
var h__8710 = cljs.core.hash.call(null,k);
var bucket__8711 = (this__8709.hashobj[h__8710]);
var i__8712 = (cljs.core.truth_(bucket__8711)?cljs.core.scan_array.call(null,2,k,bucket__8711):null);
if(cljs.core.not.call(null,i__8712))
{return coll;
} else
{var new_hashobj__8713 = goog.object.clone(this__8709.hashobj);
if((3 > bucket__8711.length))
{cljs.core.js_delete.call(null,new_hashobj__8713,h__8710);
} else
{var new_bucket__8714 = bucket__8711.slice();
new_bucket__8714.splice(i__8712,2);
(new_hashobj__8713[h__8710] = new_bucket__8714);
}
return (new cljs.core.HashMap(this__8709.meta,(this__8709.count - 1),new_hashobj__8713,null));
}
});
cljs.core.HashMap;
cljs.core.HashMap.EMPTY = (new cljs.core.HashMap(null,0,{},0));
cljs.core.HashMap.fromArrays = (function (ks,vs){
var len__8716 = ks.length;
var i__8717 = 0;
var out__8718 = cljs.core.HashMap.EMPTY;
while(true){
if((i__8717 < len__8716))
{{
var G__8719 = (i__8717 + 1);
var G__8720 = cljs.core.assoc.call(null,out__8718,(ks[i__8717]),(vs[i__8717]));
i__8717 = G__8719;
out__8718 = G__8720;
continue;
}
} else
{return out__8718;
}
break;
}
});
cljs.core.array_map_index_of = (function array_map_index_of(m,k){
var arr__8724 = m.arr;
var len__8725 = arr__8724.length;
var i__8726 = 0;
while(true){
if((len__8725 <= i__8726))
{return -1;
} else
{if(cljs.core._EQ_.call(null,(arr__8724[i__8726]),k))
{return i__8726;
} else
{if("\uFDD0'else")
{{
var G__8727 = (i__8726 + 2);
i__8726 = G__8727;
continue;
}
} else
{return null;
}
}
}
break;
}
});

/**
* @constructor
*/
cljs.core.PersistentArrayMap = (function (meta,cnt,arr,__hash){
this.meta = meta;
this.cnt = cnt;
this.arr = arr;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 1;
this.cljs$lang$protocol_mask$partition0$ = 16123663;
})
cljs.core.PersistentArrayMap.cljs$lang$type = true;
cljs.core.PersistentArrayMap.cljs$lang$ctorPrSeq = (function (this__2315__auto__){
return cljs.core.list.call(null,"cljs.core/PersistentArrayMap");
});
cljs.core.PersistentArrayMap.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = (function (coll){
var this__8730 = this;
return (new cljs.core.TransientArrayMap({},this__8730.arr.length,this__8730.arr.slice()));
});
cljs.core.PersistentArrayMap.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__8731 = this;
var h__2198__auto____8732 = this__8731.__hash;
if(!((h__2198__auto____8732 == null)))
{return h__2198__auto____8732;
} else
{var h__2198__auto____8733 = cljs.core.hash_imap.call(null,coll);
this__8731.__hash = h__2198__auto____8733;
return h__2198__auto____8733;
}
});
cljs.core.PersistentArrayMap.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (coll,k){
var this__8734 = this;
return coll.cljs$core$ILookup$_lookup$arity$3(coll,k,null);
});
cljs.core.PersistentArrayMap.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (coll,k,not_found){
var this__8735 = this;
var idx__8736 = cljs.core.array_map_index_of.call(null,coll,k);
if((idx__8736 === -1))
{return not_found;
} else
{return (this__8735.arr[(idx__8736 + 1)]);
}
});
cljs.core.PersistentArrayMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (coll,k,v){
var this__8737 = this;
var idx__8738 = cljs.core.array_map_index_of.call(null,coll,k);
if((idx__8738 === -1))
{if((this__8737.cnt < cljs.core.PersistentArrayMap.HASHMAP_THRESHOLD))
{return (new cljs.core.PersistentArrayMap(this__8737.meta,(this__8737.cnt + 1),(function (){var G__8739__8740 = this__8737.arr.slice();
G__8739__8740.push(k);
G__8739__8740.push(v);
return G__8739__8740;
})(),null));
} else
{return cljs.core.persistent_BANG_.call(null,cljs.core.assoc_BANG_.call(null,cljs.core.transient$.call(null,cljs.core.into.call(null,cljs.core.PersistentHashMap.EMPTY,coll)),k,v));
}
} else
{if((v === (this__8737.arr[(idx__8738 + 1)])))
{return coll;
} else
{if("\uFDD0'else")
{return (new cljs.core.PersistentArrayMap(this__8737.meta,this__8737.cnt,(function (){var G__8741__8742 = this__8737.arr.slice();
(G__8741__8742[(idx__8738 + 1)] = v);
return G__8741__8742;
})(),null));
} else
{return null;
}
}
}
});
cljs.core.PersistentArrayMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (coll,k){
var this__8743 = this;
return !((cljs.core.array_map_index_of.call(null,coll,k) === -1));
});
cljs.core.PersistentArrayMap.prototype.call = (function() {
var G__8775 = null;
var G__8775__2 = (function (this_sym8744,k){
var this__8746 = this;
var this_sym8744__8747 = this;
var coll__8748 = this_sym8744__8747;
return coll__8748.cljs$core$ILookup$_lookup$arity$2(coll__8748,k);
});
var G__8775__3 = (function (this_sym8745,k,not_found){
var this__8746 = this;
var this_sym8745__8749 = this;
var coll__8750 = this_sym8745__8749;
return coll__8750.cljs$core$ILookup$_lookup$arity$3(coll__8750,k,not_found);
});
G__8775 = function(this_sym8745,k,not_found){
switch(arguments.length){
case 2:
return G__8775__2.call(this,this_sym8745,k);
case 3:
return G__8775__3.call(this,this_sym8745,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__8775;
})()
;
cljs.core.PersistentArrayMap.prototype.apply = (function (this_sym8728,args8729){
var this__8751 = this;
return this_sym8728.call.apply(this_sym8728,[this_sym8728].concat(args8729.slice()));
});
cljs.core.PersistentArrayMap.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (coll,f,init){
var this__8752 = this;
var len__8753 = this__8752.arr.length;
var i__8754 = 0;
var init__8755 = init;
while(true){
if((i__8754 < len__8753))
{var init__8756 = f.call(null,init__8755,(this__8752.arr[i__8754]),(this__8752.arr[(i__8754 + 1)]));
if(cljs.core.reduced_QMARK_.call(null,init__8756))
{return cljs.core.deref.call(null,init__8756);
} else
{{
var G__8776 = (i__8754 + 2);
var G__8777 = init__8756;
i__8754 = G__8776;
init__8755 = G__8777;
continue;
}
}
} else
{return null;
}
break;
}
});
cljs.core.PersistentArrayMap.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,entry){
var this__8757 = this;
if(cljs.core.vector_QMARK_.call(null,entry))
{return coll.cljs$core$IAssociative$_assoc$arity$3(coll,cljs.core._nth.call(null,entry,0),cljs.core._nth.call(null,entry,1));
} else
{return cljs.core.reduce.call(null,cljs.core._conj,coll,entry);
}
});
cljs.core.PersistentArrayMap.prototype.toString = (function (){
var this__8758 = this;
var this__8759 = this;
return cljs.core.pr_str.call(null,this__8759);
});
cljs.core.PersistentArrayMap.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__8760 = this;
if((this__8760.cnt > 0))
{var len__8761 = this__8760.arr.length;
var array_map_seq__8762 = (function array_map_seq(i){
return (new cljs.core.LazySeq(null,false,(function (){
if((i < len__8761))
{return cljs.core.cons.call(null,cljs.core.PersistentVector.fromArray([(this__8760.arr[i]),(this__8760.arr[(i + 1)])], true),array_map_seq.call(null,(i + 2)));
} else
{return null;
}
}),null));
});
return array_map_seq__8762.call(null,0);
} else
{return null;
}
});
cljs.core.PersistentArrayMap.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__8763 = this;
return this__8763.cnt;
});
cljs.core.PersistentArrayMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__8764 = this;
return cljs.core.equiv_map.call(null,coll,other);
});
cljs.core.PersistentArrayMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__8765 = this;
return (new cljs.core.PersistentArrayMap(meta,this__8765.cnt,this__8765.arr,this__8765.__hash));
});
cljs.core.PersistentArrayMap.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__8766 = this;
return this__8766.meta;
});
cljs.core.PersistentArrayMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__8767 = this;
return cljs.core._with_meta.call(null,cljs.core.PersistentArrayMap.EMPTY,this__8767.meta);
});
cljs.core.PersistentArrayMap.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (coll,k){
var this__8768 = this;
var idx__8769 = cljs.core.array_map_index_of.call(null,coll,k);
if((idx__8769 >= 0))
{var len__8770 = this__8768.arr.length;
var new_len__8771 = (len__8770 - 2);
if((new_len__8771 === 0))
{return coll.cljs$core$IEmptyableCollection$_empty$arity$1(coll);
} else
{var new_arr__8772 = cljs.core.make_array.call(null,new_len__8771);
var s__8773 = 0;
var d__8774 = 0;
while(true){
if((s__8773 >= len__8770))
{return (new cljs.core.PersistentArrayMap(this__8768.meta,(this__8768.cnt - 1),new_arr__8772,null));
} else
{if(cljs.core._EQ_.call(null,k,(this__8768.arr[s__8773])))
{{
var G__8778 = (s__8773 + 2);
var G__8779 = d__8774;
s__8773 = G__8778;
d__8774 = G__8779;
continue;
}
} else
{if("\uFDD0'else")
{(new_arr__8772[d__8774] = (this__8768.arr[s__8773]));
(new_arr__8772[(d__8774 + 1)] = (this__8768.arr[(s__8773 + 1)]));
{
var G__8780 = (s__8773 + 2);
var G__8781 = (d__8774 + 2);
s__8773 = G__8780;
d__8774 = G__8781;
continue;
}
} else
{return null;
}
}
}
break;
}
}
} else
{return coll;
}
});
cljs.core.PersistentArrayMap;
cljs.core.PersistentArrayMap.EMPTY = (new cljs.core.PersistentArrayMap(null,0,[],null));
cljs.core.PersistentArrayMap.HASHMAP_THRESHOLD = 16;
cljs.core.PersistentArrayMap.fromArrays = (function (ks,vs){
var len__8782 = cljs.core.count.call(null,ks);
var i__8783 = 0;
var out__8784 = cljs.core.transient$.call(null,cljs.core.PersistentArrayMap.EMPTY);
while(true){
if((i__8783 < len__8782))
{{
var G__8785 = (i__8783 + 1);
var G__8786 = cljs.core.assoc_BANG_.call(null,out__8784,(ks[i__8783]),(vs[i__8783]));
i__8783 = G__8785;
out__8784 = G__8786;
continue;
}
} else
{return cljs.core.persistent_BANG_.call(null,out__8784);
}
break;
}
});

/**
* @constructor
*/
cljs.core.TransientArrayMap = (function (editable_QMARK_,len,arr){
this.editable_QMARK_ = editable_QMARK_;
this.len = len;
this.arr = arr;
this.cljs$lang$protocol_mask$partition1$ = 14;
this.cljs$lang$protocol_mask$partition0$ = 258;
})
cljs.core.TransientArrayMap.cljs$lang$type = true;
cljs.core.TransientArrayMap.cljs$lang$ctorPrSeq = (function (this__2315__auto__){
return cljs.core.list.call(null,"cljs.core/TransientArrayMap");
});
cljs.core.TransientArrayMap.prototype.cljs$core$ITransientMap$_dissoc_BANG_$arity$2 = (function (tcoll,key){
var this__8787 = this;
if(cljs.core.truth_(this__8787.editable_QMARK_))
{var idx__8788 = cljs.core.array_map_index_of.call(null,tcoll,key);
if((idx__8788 >= 0))
{(this__8787.arr[idx__8788] = (this__8787.arr[(this__8787.len - 2)]));
(this__8787.arr[(idx__8788 + 1)] = (this__8787.arr[(this__8787.len - 1)]));
var G__8789__8790 = this__8787.arr;
G__8789__8790.pop();
G__8789__8790.pop();
G__8789__8790;
this__8787.len = (this__8787.len - 2);
} else
{}
return tcoll;
} else
{throw (new Error("dissoc! after persistent!"));
}
});
cljs.core.TransientArrayMap.prototype.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3 = (function (tcoll,key,val){
var this__8791 = this;
if(cljs.core.truth_(this__8791.editable_QMARK_))
{var idx__8792 = cljs.core.array_map_index_of.call(null,tcoll,key);
if((idx__8792 === -1))
{if(((this__8791.len + 2) <= (2 * cljs.core.PersistentArrayMap.HASHMAP_THRESHOLD)))
{this__8791.len = (this__8791.len + 2);
this__8791.arr.push(key);
this__8791.arr.push(val);
return tcoll;
} else
{return cljs.core.assoc_BANG_.call(null,cljs.core.array__GT_transient_hash_map.call(null,this__8791.len,this__8791.arr),key,val);
}
} else
{if((val === (this__8791.arr[(idx__8792 + 1)])))
{return tcoll;
} else
{(this__8791.arr[(idx__8792 + 1)] = val);
return tcoll;
}
}
} else
{throw (new Error("assoc! after persistent!"));
}
});
cljs.core.TransientArrayMap.prototype.cljs$core$ITransientCollection$_conj_BANG_$arity$2 = (function (tcoll,o){
var this__8793 = this;
if(cljs.core.truth_(this__8793.editable_QMARK_))
{if((function (){var G__8794__8795 = o;
if(G__8794__8795)
{if((function (){var or__3824__auto____8796 = (G__8794__8795.cljs$lang$protocol_mask$partition0$ & 2048);
if(or__3824__auto____8796)
{return or__3824__auto____8796;
} else
{return G__8794__8795.cljs$core$IMapEntry$;
}
})())
{return true;
} else
{if((!G__8794__8795.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IMapEntry,G__8794__8795);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IMapEntry,G__8794__8795);
}
})())
{return tcoll.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3(tcoll,cljs.core.key.call(null,o),cljs.core.val.call(null,o));
} else
{var es__8797 = cljs.core.seq.call(null,o);
var tcoll__8798 = tcoll;
while(true){
var temp__3971__auto____8799 = cljs.core.first.call(null,es__8797);
if(cljs.core.truth_(temp__3971__auto____8799))
{var e__8800 = temp__3971__auto____8799;
{
var G__8806 = cljs.core.next.call(null,es__8797);
var G__8807 = tcoll__8798.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3(tcoll__8798,cljs.core.key.call(null,e__8800),cljs.core.val.call(null,e__8800));
es__8797 = G__8806;
tcoll__8798 = G__8807;
continue;
}
} else
{return tcoll__8798;
}
break;
}
}
} else
{throw (new Error("conj! after persistent!"));
}
});
cljs.core.TransientArrayMap.prototype.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 = (function (tcoll){
var this__8801 = this;
if(cljs.core.truth_(this__8801.editable_QMARK_))
{this__8801.editable_QMARK_ = false;
return (new cljs.core.PersistentArrayMap(null,cljs.core.quot.call(null,this__8801.len,2),this__8801.arr,null));
} else
{throw (new Error("persistent! called twice"));
}
});
cljs.core.TransientArrayMap.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (tcoll,k){
var this__8802 = this;
return tcoll.cljs$core$ILookup$_lookup$arity$3(tcoll,k,null);
});
cljs.core.TransientArrayMap.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (tcoll,k,not_found){
var this__8803 = this;
if(cljs.core.truth_(this__8803.editable_QMARK_))
{var idx__8804 = cljs.core.array_map_index_of.call(null,tcoll,k);
if((idx__8804 === -1))
{return not_found;
} else
{return (this__8803.arr[(idx__8804 + 1)]);
}
} else
{throw (new Error("lookup after persistent!"));
}
});
cljs.core.TransientArrayMap.prototype.cljs$core$ICounted$_count$arity$1 = (function (tcoll){
var this__8805 = this;
if(cljs.core.truth_(this__8805.editable_QMARK_))
{return cljs.core.quot.call(null,this__8805.len,2);
} else
{throw (new Error("count after persistent!"));
}
});
cljs.core.TransientArrayMap;
cljs.core.array__GT_transient_hash_map = (function array__GT_transient_hash_map(len,arr){
var out__8810 = cljs.core.transient$.call(null,cljs.core.ObjMap.EMPTY);
var i__8811 = 0;
while(true){
if((i__8811 < len))
{{
var G__8812 = cljs.core.assoc_BANG_.call(null,out__8810,(arr[i__8811]),(arr[(i__8811 + 1)]));
var G__8813 = (i__8811 + 2);
out__8810 = G__8812;
i__8811 = G__8813;
continue;
}
} else
{return out__8810;
}
break;
}
});

/**
* @constructor
*/
cljs.core.Box = (function (val){
this.val = val;
})
cljs.core.Box.cljs$lang$type = true;
cljs.core.Box.cljs$lang$ctorPrSeq = (function (this__2316__auto__){
return cljs.core.list.call(null,"cljs.core/Box");
});
cljs.core.Box;
cljs.core.key_test = (function key_test(key,other){
if(goog.isString(key))
{return (key === other);
} else
{return cljs.core._EQ_.call(null,key,other);
}
});
cljs.core.mask = (function mask(hash,shift){
return ((hash >>> shift) & 31);
});
cljs.core.clone_and_set = (function() {
var clone_and_set = null;
var clone_and_set__3 = (function (arr,i,a){
var G__8818__8819 = arr.slice();
(G__8818__8819[i] = a);
return G__8818__8819;
});
var clone_and_set__5 = (function (arr,i,a,j,b){
var G__8820__8821 = arr.slice();
(G__8820__8821[i] = a);
(G__8820__8821[j] = b);
return G__8820__8821;
});
clone_and_set = function(arr,i,a,j,b){
switch(arguments.length){
case 3:
return clone_and_set__3.call(this,arr,i,a);
case 5:
return clone_and_set__5.call(this,arr,i,a,j,b);
}
throw('Invalid arity: ' + arguments.length);
};
clone_and_set.cljs$lang$arity$3 = clone_and_set__3;
clone_and_set.cljs$lang$arity$5 = clone_and_set__5;
return clone_and_set;
})()
;
cljs.core.remove_pair = (function remove_pair(arr,i){
var new_arr__8823 = cljs.core.make_array.call(null,(arr.length - 2));
cljs.core.array_copy.call(null,arr,0,new_arr__8823,0,(2 * i));
cljs.core.array_copy.call(null,arr,(2 * (i + 1)),new_arr__8823,(2 * i),(new_arr__8823.length - (2 * i)));
return new_arr__8823;
});
cljs.core.bitmap_indexed_node_index = (function bitmap_indexed_node_index(bitmap,bit){
return cljs.core.bit_count.call(null,(bitmap & (bit - 1)));
});
cljs.core.bitpos = (function bitpos(hash,shift){
return (1 << ((hash >>> shift) & 0x01f));
});
cljs.core.edit_and_set = (function() {
var edit_and_set = null;
var edit_and_set__4 = (function (inode,edit,i,a){
var editable__8826 = inode.ensure_editable(edit);
(editable__8826.arr[i] = a);
return editable__8826;
});
var edit_and_set__6 = (function (inode,edit,i,a,j,b){
var editable__8827 = inode.ensure_editable(edit);
(editable__8827.arr[i] = a);
(editable__8827.arr[j] = b);
return editable__8827;
});
edit_and_set = function(inode,edit,i,a,j,b){
switch(arguments.length){
case 4:
return edit_and_set__4.call(this,inode,edit,i,a);
case 6:
return edit_and_set__6.call(this,inode,edit,i,a,j,b);
}
throw('Invalid arity: ' + arguments.length);
};
edit_and_set.cljs$lang$arity$4 = edit_and_set__4;
edit_and_set.cljs$lang$arity$6 = edit_and_set__6;
return edit_and_set;
})()
;
cljs.core.inode_kv_reduce = (function inode_kv_reduce(arr,f,init){
var len__8834 = arr.length;
var i__8835 = 0;
var init__8836 = init;
while(true){
if((i__8835 < len__8834))
{var init__8839 = (function (){var k__8837 = (arr[i__8835]);
if(!((k__8837 == null)))
{return f.call(null,init__8836,k__8837,(arr[(i__8835 + 1)]));
} else
{var node__8838 = (arr[(i__8835 + 1)]);
if(!((node__8838 == null)))
{return node__8838.kv_reduce(f,init__8836);
} else
{return init__8836;
}
}
})();
if(cljs.core.reduced_QMARK_.call(null,init__8839))
{return cljs.core.deref.call(null,init__8839);
} else
{{
var G__8840 = (i__8835 + 2);
var G__8841 = init__8839;
i__8835 = G__8840;
init__8836 = G__8841;
continue;
}
}
} else
{return init__8836;
}
break;
}
});

/**
* @constructor
*/
cljs.core.BitmapIndexedNode = (function (edit,bitmap,arr){
this.edit = edit;
this.bitmap = bitmap;
this.arr = arr;
})
cljs.core.BitmapIndexedNode.cljs$lang$type = true;
cljs.core.BitmapIndexedNode.cljs$lang$ctorPrSeq = (function (this__2315__auto__){
return cljs.core.list.call(null,"cljs.core/BitmapIndexedNode");
});
cljs.core.BitmapIndexedNode.prototype.edit_and_remove_pair = (function (e,bit,i){
var this__8842 = this;
var inode__8843 = this;
if((this__8842.bitmap === bit))
{return null;
} else
{var editable__8844 = inode__8843.ensure_editable(e);
var earr__8845 = editable__8844.arr;
var len__8846 = earr__8845.length;
editable__8844.bitmap = (bit ^ editable__8844.bitmap);
cljs.core.array_copy.call(null,earr__8845,(2 * (i + 1)),earr__8845,(2 * i),(len__8846 - (2 * (i + 1))));
(earr__8845[(len__8846 - 2)] = null);
(earr__8845[(len__8846 - 1)] = null);
return editable__8844;
}
});
cljs.core.BitmapIndexedNode.prototype.inode_assoc_BANG_ = (function (edit,shift,hash,key,val,added_leaf_QMARK_){
var this__8847 = this;
var inode__8848 = this;
var bit__8849 = (1 << ((hash >>> shift) & 0x01f));
var idx__8850 = cljs.core.bitmap_indexed_node_index.call(null,this__8847.bitmap,bit__8849);
if(((this__8847.bitmap & bit__8849) === 0))
{var n__8851 = cljs.core.bit_count.call(null,this__8847.bitmap);
if(((2 * n__8851) < this__8847.arr.length))
{var editable__8852 = inode__8848.ensure_editable(edit);
var earr__8853 = editable__8852.arr;
added_leaf_QMARK_.val = true;
cljs.core.array_copy_downward.call(null,earr__8853,(2 * idx__8850),earr__8853,(2 * (idx__8850 + 1)),(2 * (n__8851 - idx__8850)));
(earr__8853[(2 * idx__8850)] = key);
(earr__8853[((2 * idx__8850) + 1)] = val);
editable__8852.bitmap = (editable__8852.bitmap | bit__8849);
return editable__8852;
} else
{if((n__8851 >= 16))
{var nodes__8854 = cljs.core.make_array.call(null,32);
var jdx__8855 = ((hash >>> shift) & 0x01f);
(nodes__8854[jdx__8855] = cljs.core.BitmapIndexedNode.EMPTY.inode_assoc_BANG_(edit,(shift + 5),hash,key,val,added_leaf_QMARK_));
var i__8856 = 0;
var j__8857 = 0;
while(true){
if((i__8856 < 32))
{if((((this__8847.bitmap >>> i__8856) & 1) === 0))
{{
var G__8910 = (i__8856 + 1);
var G__8911 = j__8857;
i__8856 = G__8910;
j__8857 = G__8911;
continue;
}
} else
{(nodes__8854[i__8856] = ((!(((this__8847.arr[j__8857]) == null)))?cljs.core.BitmapIndexedNode.EMPTY.inode_assoc_BANG_(edit,(shift + 5),cljs.core.hash.call(null,(this__8847.arr[j__8857])),(this__8847.arr[j__8857]),(this__8847.arr[(j__8857 + 1)]),added_leaf_QMARK_):(this__8847.arr[(j__8857 + 1)])));
{
var G__8912 = (i__8856 + 1);
var G__8913 = (j__8857 + 2);
i__8856 = G__8912;
j__8857 = G__8913;
continue;
}
}
} else
{}
break;
}
return (new cljs.core.ArrayNode(edit,(n__8851 + 1),nodes__8854));
} else
{if("\uFDD0'else")
{var new_arr__8858 = cljs.core.make_array.call(null,(2 * (n__8851 + 4)));
cljs.core.array_copy.call(null,this__8847.arr,0,new_arr__8858,0,(2 * idx__8850));
(new_arr__8858[(2 * idx__8850)] = key);
(new_arr__8858[((2 * idx__8850) + 1)] = val);
cljs.core.array_copy.call(null,this__8847.arr,(2 * idx__8850),new_arr__8858,(2 * (idx__8850 + 1)),(2 * (n__8851 - idx__8850)));
added_leaf_QMARK_.val = true;
var editable__8859 = inode__8848.ensure_editable(edit);
editable__8859.arr = new_arr__8858;
editable__8859.bitmap = (editable__8859.bitmap | bit__8849);
return editable__8859;
} else
{return null;
}
}
}
} else
{var key_or_nil__8860 = (this__8847.arr[(2 * idx__8850)]);
var val_or_node__8861 = (this__8847.arr[((2 * idx__8850) + 1)]);
if((key_or_nil__8860 == null))
{var n__8862 = val_or_node__8861.inode_assoc_BANG_(edit,(shift + 5),hash,key,val,added_leaf_QMARK_);
if((n__8862 === val_or_node__8861))
{return inode__8848;
} else
{return cljs.core.edit_and_set.call(null,inode__8848,edit,((2 * idx__8850) + 1),n__8862);
}
} else
{if(cljs.core.key_test.call(null,key,key_or_nil__8860))
{if((val === val_or_node__8861))
{return inode__8848;
} else
{return cljs.core.edit_and_set.call(null,inode__8848,edit,((2 * idx__8850) + 1),val);
}
} else
{if("\uFDD0'else")
{added_leaf_QMARK_.val = true;
return cljs.core.edit_and_set.call(null,inode__8848,edit,(2 * idx__8850),null,((2 * idx__8850) + 1),cljs.core.create_node.call(null,edit,(shift + 5),key_or_nil__8860,val_or_node__8861,hash,key,val));
} else
{return null;
}
}
}
}
});
cljs.core.BitmapIndexedNode.prototype.inode_seq = (function (){
var this__8863 = this;
var inode__8864 = this;
return cljs.core.create_inode_seq.call(null,this__8863.arr);
});
cljs.core.BitmapIndexedNode.prototype.inode_without_BANG_ = (function (edit,shift,hash,key,removed_leaf_QMARK_){
var this__8865 = this;
var inode__8866 = this;
var bit__8867 = (1 << ((hash >>> shift) & 0x01f));
if(((this__8865.bitmap & bit__8867) === 0))
{return inode__8866;
} else
{var idx__8868 = cljs.core.bitmap_indexed_node_index.call(null,this__8865.bitmap,bit__8867);
var key_or_nil__8869 = (this__8865.arr[(2 * idx__8868)]);
var val_or_node__8870 = (this__8865.arr[((2 * idx__8868) + 1)]);
if((key_or_nil__8869 == null))
{var n__8871 = val_or_node__8870.inode_without_BANG_(edit,(shift + 5),hash,key,removed_leaf_QMARK_);
if((n__8871 === val_or_node__8870))
{return inode__8866;
} else
{if(!((n__8871 == null)))
{return cljs.core.edit_and_set.call(null,inode__8866,edit,((2 * idx__8868) + 1),n__8871);
} else
{if((this__8865.bitmap === bit__8867))
{return null;
} else
{if("\uFDD0'else")
{return inode__8866.edit_and_remove_pair(edit,bit__8867,idx__8868);
} else
{return null;
}
}
}
}
} else
{if(cljs.core.key_test.call(null,key,key_or_nil__8869))
{(removed_leaf_QMARK_[0] = true);
return inode__8866.edit_and_remove_pair(edit,bit__8867,idx__8868);
} else
{if("\uFDD0'else")
{return inode__8866;
} else
{return null;
}
}
}
}
});
cljs.core.BitmapIndexedNode.prototype.ensure_editable = (function (e){
var this__8872 = this;
var inode__8873 = this;
if((e === this__8872.edit))
{return inode__8873;
} else
{var n__8874 = cljs.core.bit_count.call(null,this__8872.bitmap);
var new_arr__8875 = cljs.core.make_array.call(null,(((n__8874 < 0))?4:(2 * (n__8874 + 1))));
cljs.core.array_copy.call(null,this__8872.arr,0,new_arr__8875,0,(2 * n__8874));
return (new cljs.core.BitmapIndexedNode(e,this__8872.bitmap,new_arr__8875));
}
});
cljs.core.BitmapIndexedNode.prototype.kv_reduce = (function (f,init){
var this__8876 = this;
var inode__8877 = this;
return cljs.core.inode_kv_reduce.call(null,this__8876.arr,f,init);
});
cljs.core.BitmapIndexedNode.prototype.inode_find = (function (shift,hash,key,not_found){
var this__8878 = this;
var inode__8879 = this;
var bit__8880 = (1 << ((hash >>> shift) & 0x01f));
if(((this__8878.bitmap & bit__8880) === 0))
{return not_found;
} else
{var idx__8881 = cljs.core.bitmap_indexed_node_index.call(null,this__8878.bitmap,bit__8880);
var key_or_nil__8882 = (this__8878.arr[(2 * idx__8881)]);
var val_or_node__8883 = (this__8878.arr[((2 * idx__8881) + 1)]);
if((key_or_nil__8882 == null))
{return val_or_node__8883.inode_find((shift + 5),hash,key,not_found);
} else
{if(cljs.core.key_test.call(null,key,key_or_nil__8882))
{return cljs.core.PersistentVector.fromArray([key_or_nil__8882,val_or_node__8883], true);
} else
{if("\uFDD0'else")
{return not_found;
} else
{return null;
}
}
}
}
});
cljs.core.BitmapIndexedNode.prototype.inode_without = (function (shift,hash,key){
var this__8884 = this;
var inode__8885 = this;
var bit__8886 = (1 << ((hash >>> shift) & 0x01f));
if(((this__8884.bitmap & bit__8886) === 0))
{return inode__8885;
} else
{var idx__8887 = cljs.core.bitmap_indexed_node_index.call(null,this__8884.bitmap,bit__8886);
var key_or_nil__8888 = (this__8884.arr[(2 * idx__8887)]);
var val_or_node__8889 = (this__8884.arr[((2 * idx__8887) + 1)]);
if((key_or_nil__8888 == null))
{var n__8890 = val_or_node__8889.inode_without((shift + 5),hash,key);
if((n__8890 === val_or_node__8889))
{return inode__8885;
} else
{if(!((n__8890 == null)))
{return (new cljs.core.BitmapIndexedNode(null,this__8884.bitmap,cljs.core.clone_and_set.call(null,this__8884.arr,((2 * idx__8887) + 1),n__8890)));
} else
{if((this__8884.bitmap === bit__8886))
{return null;
} else
{if("\uFDD0'else")
{return (new cljs.core.BitmapIndexedNode(null,(this__8884.bitmap ^ bit__8886),cljs.core.remove_pair.call(null,this__8884.arr,idx__8887)));
} else
{return null;
}
}
}
}
} else
{if(cljs.core.key_test.call(null,key,key_or_nil__8888))
{return (new cljs.core.BitmapIndexedNode(null,(this__8884.bitmap ^ bit__8886),cljs.core.remove_pair.call(null,this__8884.arr,idx__8887)));
} else
{if("\uFDD0'else")
{return inode__8885;
} else
{return null;
}
}
}
}
});
cljs.core.BitmapIndexedNode.prototype.inode_assoc = (function (shift,hash,key,val,added_leaf_QMARK_){
var this__8891 = this;
var inode__8892 = this;
var bit__8893 = (1 << ((hash >>> shift) & 0x01f));
var idx__8894 = cljs.core.bitmap_indexed_node_index.call(null,this__8891.bitmap,bit__8893);
if(((this__8891.bitmap & bit__8893) === 0))
{var n__8895 = cljs.core.bit_count.call(null,this__8891.bitmap);
if((n__8895 >= 16))
{var nodes__8896 = cljs.core.make_array.call(null,32);
var jdx__8897 = ((hash >>> shift) & 0x01f);
(nodes__8896[jdx__8897] = cljs.core.BitmapIndexedNode.EMPTY.inode_assoc((shift + 5),hash,key,val,added_leaf_QMARK_));
var i__8898 = 0;
var j__8899 = 0;
while(true){
if((i__8898 < 32))
{if((((this__8891.bitmap >>> i__8898) & 1) === 0))
{{
var G__8914 = (i__8898 + 1);
var G__8915 = j__8899;
i__8898 = G__8914;
j__8899 = G__8915;
continue;
}
} else
{(nodes__8896[i__8898] = ((!(((this__8891.arr[j__8899]) == null)))?cljs.core.BitmapIndexedNode.EMPTY.inode_assoc((shift + 5),cljs.core.hash.call(null,(this__8891.arr[j__8899])),(this__8891.arr[j__8899]),(this__8891.arr[(j__8899 + 1)]),added_leaf_QMARK_):(this__8891.arr[(j__8899 + 1)])));
{
var G__8916 = (i__8898 + 1);
var G__8917 = (j__8899 + 2);
i__8898 = G__8916;
j__8899 = G__8917;
continue;
}
}
} else
{}
break;
}
return (new cljs.core.ArrayNode(null,(n__8895 + 1),nodes__8896));
} else
{var new_arr__8900 = cljs.core.make_array.call(null,(2 * (n__8895 + 1)));
cljs.core.array_copy.call(null,this__8891.arr,0,new_arr__8900,0,(2 * idx__8894));
(new_arr__8900[(2 * idx__8894)] = key);
(new_arr__8900[((2 * idx__8894) + 1)] = val);
cljs.core.array_copy.call(null,this__8891.arr,(2 * idx__8894),new_arr__8900,(2 * (idx__8894 + 1)),(2 * (n__8895 - idx__8894)));
added_leaf_QMARK_.val = true;
return (new cljs.core.BitmapIndexedNode(null,(this__8891.bitmap | bit__8893),new_arr__8900));
}
} else
{var key_or_nil__8901 = (this__8891.arr[(2 * idx__8894)]);
var val_or_node__8902 = (this__8891.arr[((2 * idx__8894) + 1)]);
if((key_or_nil__8901 == null))
{var n__8903 = val_or_node__8902.inode_assoc((shift + 5),hash,key,val,added_leaf_QMARK_);
if((n__8903 === val_or_node__8902))
{return inode__8892;
} else
{return (new cljs.core.BitmapIndexedNode(null,this__8891.bitmap,cljs.core.clone_and_set.call(null,this__8891.arr,((2 * idx__8894) + 1),n__8903)));
}
} else
{if(cljs.core.key_test.call(null,key,key_or_nil__8901))
{if((val === val_or_node__8902))
{return inode__8892;
} else
{return (new cljs.core.BitmapIndexedNode(null,this__8891.bitmap,cljs.core.clone_and_set.call(null,this__8891.arr,((2 * idx__8894) + 1),val)));
}
} else
{if("\uFDD0'else")
{added_leaf_QMARK_.val = true;
return (new cljs.core.BitmapIndexedNode(null,this__8891.bitmap,cljs.core.clone_and_set.call(null,this__8891.arr,(2 * idx__8894),null,((2 * idx__8894) + 1),cljs.core.create_node.call(null,(shift + 5),key_or_nil__8901,val_or_node__8902,hash,key,val))));
} else
{return null;
}
}
}
}
});
cljs.core.BitmapIndexedNode.prototype.inode_lookup = (function (shift,hash,key,not_found){
var this__8904 = this;
var inode__8905 = this;
var bit__8906 = (1 << ((hash >>> shift) & 0x01f));
if(((this__8904.bitmap & bit__8906) === 0))
{return not_found;
} else
{var idx__8907 = cljs.core.bitmap_indexed_node_index.call(null,this__8904.bitmap,bit__8906);
var key_or_nil__8908 = (this__8904.arr[(2 * idx__8907)]);
var val_or_node__8909 = (this__8904.arr[((2 * idx__8907) + 1)]);
if((key_or_nil__8908 == null))
{return val_or_node__8909.inode_lookup((shift + 5),hash,key,not_found);
} else
{if(cljs.core.key_test.call(null,key,key_or_nil__8908))
{return val_or_node__8909;
} else
{if("\uFDD0'else")
{return not_found;
} else
{return null;
}
}
}
}
});
cljs.core.BitmapIndexedNode;
cljs.core.BitmapIndexedNode.EMPTY = (new cljs.core.BitmapIndexedNode(null,0,cljs.core.make_array.call(null,0)));
cljs.core.pack_array_node = (function pack_array_node(array_node,edit,idx){
var arr__8925 = array_node.arr;
var len__8926 = (2 * (array_node.cnt - 1));
var new_arr__8927 = cljs.core.make_array.call(null,len__8926);
var i__8928 = 0;
var j__8929 = 1;
var bitmap__8930 = 0;
while(true){
if((i__8928 < len__8926))
{if((function (){var and__3822__auto____8931 = !((i__8928 === idx));
if(and__3822__auto____8931)
{return !(((arr__8925[i__8928]) == null));
} else
{return and__3822__auto____8931;
}
})())
{(new_arr__8927[j__8929] = (arr__8925[i__8928]));
{
var G__8932 = (i__8928 + 1);
var G__8933 = (j__8929 + 2);
var G__8934 = (bitmap__8930 | (1 << i__8928));
i__8928 = G__8932;
j__8929 = G__8933;
bitmap__8930 = G__8934;
continue;
}
} else
{{
var G__8935 = (i__8928 + 1);
var G__8936 = j__8929;
var G__8937 = bitmap__8930;
i__8928 = G__8935;
j__8929 = G__8936;
bitmap__8930 = G__8937;
continue;
}
}
} else
{return (new cljs.core.BitmapIndexedNode(edit,bitmap__8930,new_arr__8927));
}
break;
}
});

/**
* @constructor
*/
cljs.core.ArrayNode = (function (edit,cnt,arr){
this.edit = edit;
this.cnt = cnt;
this.arr = arr;
})
cljs.core.ArrayNode.cljs$lang$type = true;
cljs.core.ArrayNode.cljs$lang$ctorPrSeq = (function (this__2315__auto__){
return cljs.core.list.call(null,"cljs.core/ArrayNode");
});
cljs.core.ArrayNode.prototype.inode_assoc_BANG_ = (function (edit,shift,hash,key,val,added_leaf_QMARK_){
var this__8938 = this;
var inode__8939 = this;
var idx__8940 = ((hash >>> shift) & 0x01f);
var node__8941 = (this__8938.arr[idx__8940]);
if((node__8941 == null))
{var editable__8942 = cljs.core.edit_and_set.call(null,inode__8939,edit,idx__8940,cljs.core.BitmapIndexedNode.EMPTY.inode_assoc_BANG_(edit,(shift + 5),hash,key,val,added_leaf_QMARK_));
editable__8942.cnt = (editable__8942.cnt + 1);
return editable__8942;
} else
{var n__8943 = node__8941.inode_assoc_BANG_(edit,(shift + 5),hash,key,val,added_leaf_QMARK_);
if((n__8943 === node__8941))
{return inode__8939;
} else
{return cljs.core.edit_and_set.call(null,inode__8939,edit,idx__8940,n__8943);
}
}
});
cljs.core.ArrayNode.prototype.inode_seq = (function (){
var this__8944 = this;
var inode__8945 = this;
return cljs.core.create_array_node_seq.call(null,this__8944.arr);
});
cljs.core.ArrayNode.prototype.inode_without_BANG_ = (function (edit,shift,hash,key,removed_leaf_QMARK_){
var this__8946 = this;
var inode__8947 = this;
var idx__8948 = ((hash >>> shift) & 0x01f);
var node__8949 = (this__8946.arr[idx__8948]);
if((node__8949 == null))
{return inode__8947;
} else
{var n__8950 = node__8949.inode_without_BANG_(edit,(shift + 5),hash,key,removed_leaf_QMARK_);
if((n__8950 === node__8949))
{return inode__8947;
} else
{if((n__8950 == null))
{if((this__8946.cnt <= 8))
{return cljs.core.pack_array_node.call(null,inode__8947,edit,idx__8948);
} else
{var editable__8951 = cljs.core.edit_and_set.call(null,inode__8947,edit,idx__8948,n__8950);
editable__8951.cnt = (editable__8951.cnt - 1);
return editable__8951;
}
} else
{if("\uFDD0'else")
{return cljs.core.edit_and_set.call(null,inode__8947,edit,idx__8948,n__8950);
} else
{return null;
}
}
}
}
});
cljs.core.ArrayNode.prototype.ensure_editable = (function (e){
var this__8952 = this;
var inode__8953 = this;
if((e === this__8952.edit))
{return inode__8953;
} else
{return (new cljs.core.ArrayNode(e,this__8952.cnt,this__8952.arr.slice()));
}
});
cljs.core.ArrayNode.prototype.kv_reduce = (function (f,init){
var this__8954 = this;
var inode__8955 = this;
var len__8956 = this__8954.arr.length;
var i__8957 = 0;
var init__8958 = init;
while(true){
if((i__8957 < len__8956))
{var node__8959 = (this__8954.arr[i__8957]);
if(!((node__8959 == null)))
{var init__8960 = node__8959.kv_reduce(f,init__8958);
if(cljs.core.reduced_QMARK_.call(null,init__8960))
{return cljs.core.deref.call(null,init__8960);
} else
{{
var G__8979 = (i__8957 + 1);
var G__8980 = init__8960;
i__8957 = G__8979;
init__8958 = G__8980;
continue;
}
}
} else
{return null;
}
} else
{return init__8958;
}
break;
}
});
cljs.core.ArrayNode.prototype.inode_find = (function (shift,hash,key,not_found){
var this__8961 = this;
var inode__8962 = this;
var idx__8963 = ((hash >>> shift) & 0x01f);
var node__8964 = (this__8961.arr[idx__8963]);
if(!((node__8964 == null)))
{return node__8964.inode_find((shift + 5),hash,key,not_found);
} else
{return not_found;
}
});
cljs.core.ArrayNode.prototype.inode_without = (function (shift,hash,key){
var this__8965 = this;
var inode__8966 = this;
var idx__8967 = ((hash >>> shift) & 0x01f);
var node__8968 = (this__8965.arr[idx__8967]);
if(!((node__8968 == null)))
{var n__8969 = node__8968.inode_without((shift + 5),hash,key);
if((n__8969 === node__8968))
{return inode__8966;
} else
{if((n__8969 == null))
{if((this__8965.cnt <= 8))
{return cljs.core.pack_array_node.call(null,inode__8966,null,idx__8967);
} else
{return (new cljs.core.ArrayNode(null,(this__8965.cnt - 1),cljs.core.clone_and_set.call(null,this__8965.arr,idx__8967,n__8969)));
}
} else
{if("\uFDD0'else")
{return (new cljs.core.ArrayNode(null,this__8965.cnt,cljs.core.clone_and_set.call(null,this__8965.arr,idx__8967,n__8969)));
} else
{return null;
}
}
}
} else
{return inode__8966;
}
});
cljs.core.ArrayNode.prototype.inode_assoc = (function (shift,hash,key,val,added_leaf_QMARK_){
var this__8970 = this;
var inode__8971 = this;
var idx__8972 = ((hash >>> shift) & 0x01f);
var node__8973 = (this__8970.arr[idx__8972]);
if((node__8973 == null))
{return (new cljs.core.ArrayNode(null,(this__8970.cnt + 1),cljs.core.clone_and_set.call(null,this__8970.arr,idx__8972,cljs.core.BitmapIndexedNode.EMPTY.inode_assoc((shift + 5),hash,key,val,added_leaf_QMARK_))));
} else
{var n__8974 = node__8973.inode_assoc((shift + 5),hash,key,val,added_leaf_QMARK_);
if((n__8974 === node__8973))
{return inode__8971;
} else
{return (new cljs.core.ArrayNode(null,this__8970.cnt,cljs.core.clone_and_set.call(null,this__8970.arr,idx__8972,n__8974)));
}
}
});
cljs.core.ArrayNode.prototype.inode_lookup = (function (shift,hash,key,not_found){
var this__8975 = this;
var inode__8976 = this;
var idx__8977 = ((hash >>> shift) & 0x01f);
var node__8978 = (this__8975.arr[idx__8977]);
if(!((node__8978 == null)))
{return node__8978.inode_lookup((shift + 5),hash,key,not_found);
} else
{return not_found;
}
});
cljs.core.ArrayNode;
cljs.core.hash_collision_node_find_index = (function hash_collision_node_find_index(arr,cnt,key){
var lim__8983 = (2 * cnt);
var i__8984 = 0;
while(true){
if((i__8984 < lim__8983))
{if(cljs.core.key_test.call(null,key,(arr[i__8984])))
{return i__8984;
} else
{{
var G__8985 = (i__8984 + 2);
i__8984 = G__8985;
continue;
}
}
} else
{return -1;
}
break;
}
});

/**
* @constructor
*/
cljs.core.HashCollisionNode = (function (edit,collision_hash,cnt,arr){
this.edit = edit;
this.collision_hash = collision_hash;
this.cnt = cnt;
this.arr = arr;
})
cljs.core.HashCollisionNode.cljs$lang$type = true;
cljs.core.HashCollisionNode.cljs$lang$ctorPrSeq = (function (this__2315__auto__){
return cljs.core.list.call(null,"cljs.core/HashCollisionNode");
});
cljs.core.HashCollisionNode.prototype.inode_assoc_BANG_ = (function (edit,shift,hash,key,val,added_leaf_QMARK_){
var this__8986 = this;
var inode__8987 = this;
if((hash === this__8986.collision_hash))
{var idx__8988 = cljs.core.hash_collision_node_find_index.call(null,this__8986.arr,this__8986.cnt,key);
if((idx__8988 === -1))
{if((this__8986.arr.length > (2 * this__8986.cnt)))
{var editable__8989 = cljs.core.edit_and_set.call(null,inode__8987,edit,(2 * this__8986.cnt),key,((2 * this__8986.cnt) + 1),val);
added_leaf_QMARK_.val = true;
editable__8989.cnt = (editable__8989.cnt + 1);
return editable__8989;
} else
{var len__8990 = this__8986.arr.length;
var new_arr__8991 = cljs.core.make_array.call(null,(len__8990 + 2));
cljs.core.array_copy.call(null,this__8986.arr,0,new_arr__8991,0,len__8990);
(new_arr__8991[len__8990] = key);
(new_arr__8991[(len__8990 + 1)] = val);
added_leaf_QMARK_.val = true;
return inode__8987.ensure_editable_array(edit,(this__8986.cnt + 1),new_arr__8991);
}
} else
{if(((this__8986.arr[(idx__8988 + 1)]) === val))
{return inode__8987;
} else
{return cljs.core.edit_and_set.call(null,inode__8987,edit,(idx__8988 + 1),val);
}
}
} else
{return (new cljs.core.BitmapIndexedNode(edit,(1 << ((this__8986.collision_hash >>> shift) & 0x01f)),[null,inode__8987,null,null])).inode_assoc_BANG_(edit,shift,hash,key,val,added_leaf_QMARK_);
}
});
cljs.core.HashCollisionNode.prototype.inode_seq = (function (){
var this__8992 = this;
var inode__8993 = this;
return cljs.core.create_inode_seq.call(null,this__8992.arr);
});
cljs.core.HashCollisionNode.prototype.inode_without_BANG_ = (function (edit,shift,hash,key,removed_leaf_QMARK_){
var this__8994 = this;
var inode__8995 = this;
var idx__8996 = cljs.core.hash_collision_node_find_index.call(null,this__8994.arr,this__8994.cnt,key);
if((idx__8996 === -1))
{return inode__8995;
} else
{(removed_leaf_QMARK_[0] = true);
if((this__8994.cnt === 1))
{return null;
} else
{var editable__8997 = inode__8995.ensure_editable(edit);
var earr__8998 = editable__8997.arr;
(earr__8998[idx__8996] = (earr__8998[((2 * this__8994.cnt) - 2)]));
(earr__8998[(idx__8996 + 1)] = (earr__8998[((2 * this__8994.cnt) - 1)]));
(earr__8998[((2 * this__8994.cnt) - 1)] = null);
(earr__8998[((2 * this__8994.cnt) - 2)] = null);
editable__8997.cnt = (editable__8997.cnt - 1);
return editable__8997;
}
}
});
cljs.core.HashCollisionNode.prototype.ensure_editable = (function (e){
var this__8999 = this;
var inode__9000 = this;
if((e === this__8999.edit))
{return inode__9000;
} else
{var new_arr__9001 = cljs.core.make_array.call(null,(2 * (this__8999.cnt + 1)));
cljs.core.array_copy.call(null,this__8999.arr,0,new_arr__9001,0,(2 * this__8999.cnt));
return (new cljs.core.HashCollisionNode(e,this__8999.collision_hash,this__8999.cnt,new_arr__9001));
}
});
cljs.core.HashCollisionNode.prototype.kv_reduce = (function (f,init){
var this__9002 = this;
var inode__9003 = this;
return cljs.core.inode_kv_reduce.call(null,this__9002.arr,f,init);
});
cljs.core.HashCollisionNode.prototype.inode_find = (function (shift,hash,key,not_found){
var this__9004 = this;
var inode__9005 = this;
var idx__9006 = cljs.core.hash_collision_node_find_index.call(null,this__9004.arr,this__9004.cnt,key);
if((idx__9006 < 0))
{return not_found;
} else
{if(cljs.core.key_test.call(null,key,(this__9004.arr[idx__9006])))
{return cljs.core.PersistentVector.fromArray([(this__9004.arr[idx__9006]),(this__9004.arr[(idx__9006 + 1)])], true);
} else
{if("\uFDD0'else")
{return not_found;
} else
{return null;
}
}
}
});
cljs.core.HashCollisionNode.prototype.inode_without = (function (shift,hash,key){
var this__9007 = this;
var inode__9008 = this;
var idx__9009 = cljs.core.hash_collision_node_find_index.call(null,this__9007.arr,this__9007.cnt,key);
if((idx__9009 === -1))
{return inode__9008;
} else
{if((this__9007.cnt === 1))
{return null;
} else
{if("\uFDD0'else")
{return (new cljs.core.HashCollisionNode(null,this__9007.collision_hash,(this__9007.cnt - 1),cljs.core.remove_pair.call(null,this__9007.arr,cljs.core.quot.call(null,idx__9009,2))));
} else
{return null;
}
}
}
});
cljs.core.HashCollisionNode.prototype.inode_assoc = (function (shift,hash,key,val,added_leaf_QMARK_){
var this__9010 = this;
var inode__9011 = this;
if((hash === this__9010.collision_hash))
{var idx__9012 = cljs.core.hash_collision_node_find_index.call(null,this__9010.arr,this__9010.cnt,key);
if((idx__9012 === -1))
{var len__9013 = this__9010.arr.length;
var new_arr__9014 = cljs.core.make_array.call(null,(len__9013 + 2));
cljs.core.array_copy.call(null,this__9010.arr,0,new_arr__9014,0,len__9013);
(new_arr__9014[len__9013] = key);
(new_arr__9014[(len__9013 + 1)] = val);
added_leaf_QMARK_.val = true;
return (new cljs.core.HashCollisionNode(null,this__9010.collision_hash,(this__9010.cnt + 1),new_arr__9014));
} else
{if(cljs.core._EQ_.call(null,(this__9010.arr[idx__9012]),val))
{return inode__9011;
} else
{return (new cljs.core.HashCollisionNode(null,this__9010.collision_hash,this__9010.cnt,cljs.core.clone_and_set.call(null,this__9010.arr,(idx__9012 + 1),val)));
}
}
} else
{return (new cljs.core.BitmapIndexedNode(null,(1 << ((this__9010.collision_hash >>> shift) & 0x01f)),[null,inode__9011])).inode_assoc(shift,hash,key,val,added_leaf_QMARK_);
}
});
cljs.core.HashCollisionNode.prototype.inode_lookup = (function (shift,hash,key,not_found){
var this__9015 = this;
var inode__9016 = this;
var idx__9017 = cljs.core.hash_collision_node_find_index.call(null,this__9015.arr,this__9015.cnt,key);
if((idx__9017 < 0))
{return not_found;
} else
{if(cljs.core.key_test.call(null,key,(this__9015.arr[idx__9017])))
{return (this__9015.arr[(idx__9017 + 1)]);
} else
{if("\uFDD0'else")
{return not_found;
} else
{return null;
}
}
}
});
cljs.core.HashCollisionNode.prototype.ensure_editable_array = (function (e,count,array){
var this__9018 = this;
var inode__9019 = this;
if((e === this__9018.edit))
{this__9018.arr = array;
this__9018.cnt = count;
return inode__9019;
} else
{return (new cljs.core.HashCollisionNode(this__9018.edit,this__9018.collision_hash,count,array));
}
});
cljs.core.HashCollisionNode;
cljs.core.create_node = (function() {
var create_node = null;
var create_node__6 = (function (shift,key1,val1,key2hash,key2,val2){
var key1hash__9024 = cljs.core.hash.call(null,key1);
if((key1hash__9024 === key2hash))
{return (new cljs.core.HashCollisionNode(null,key1hash__9024,2,[key1,val1,key2,val2]));
} else
{var added_leaf_QMARK___9025 = (new cljs.core.Box(false));
return cljs.core.BitmapIndexedNode.EMPTY.inode_assoc(shift,key1hash__9024,key1,val1,added_leaf_QMARK___9025).inode_assoc(shift,key2hash,key2,val2,added_leaf_QMARK___9025);
}
});
var create_node__7 = (function (edit,shift,key1,val1,key2hash,key2,val2){
var key1hash__9026 = cljs.core.hash.call(null,key1);
if((key1hash__9026 === key2hash))
{return (new cljs.core.HashCollisionNode(null,key1hash__9026,2,[key1,val1,key2,val2]));
} else
{var added_leaf_QMARK___9027 = (new cljs.core.Box(false));
return cljs.core.BitmapIndexedNode.EMPTY.inode_assoc_BANG_(edit,shift,key1hash__9026,key1,val1,added_leaf_QMARK___9027).inode_assoc_BANG_(edit,shift,key2hash,key2,val2,added_leaf_QMARK___9027);
}
});
create_node = function(edit,shift,key1,val1,key2hash,key2,val2){
switch(arguments.length){
case 6:
return create_node__6.call(this,edit,shift,key1,val1,key2hash,key2);
case 7:
return create_node__7.call(this,edit,shift,key1,val1,key2hash,key2,val2);
}
throw('Invalid arity: ' + arguments.length);
};
create_node.cljs$lang$arity$6 = create_node__6;
create_node.cljs$lang$arity$7 = create_node__7;
return create_node;
})()
;

/**
* @constructor
*/
cljs.core.NodeSeq = (function (meta,nodes,i,s,__hash){
this.meta = meta;
this.nodes = nodes;
this.i = i;
this.s = s;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 31850572;
})
cljs.core.NodeSeq.cljs$lang$type = true;
cljs.core.NodeSeq.cljs$lang$ctorPrSeq = (function (this__2315__auto__){
return cljs.core.list.call(null,"cljs.core/NodeSeq");
});
cljs.core.NodeSeq.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__9028 = this;
var h__2198__auto____9029 = this__9028.__hash;
if(!((h__2198__auto____9029 == null)))
{return h__2198__auto____9029;
} else
{var h__2198__auto____9030 = cljs.core.hash_coll.call(null,coll);
this__9028.__hash = h__2198__auto____9030;
return h__2198__auto____9030;
}
});
cljs.core.NodeSeq.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__9031 = this;
return cljs.core.cons.call(null,o,coll);
});
cljs.core.NodeSeq.prototype.toString = (function (){
var this__9032 = this;
var this__9033 = this;
return cljs.core.pr_str.call(null,this__9033);
});
cljs.core.NodeSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this$){
var this__9034 = this;
return this$;
});
cljs.core.NodeSeq.prototype.cljs$core$ISeq$_first$arity$1 = (function (coll){
var this__9035 = this;
if((this__9035.s == null))
{return cljs.core.PersistentVector.fromArray([(this__9035.nodes[this__9035.i]),(this__9035.nodes[(this__9035.i + 1)])], true);
} else
{return cljs.core.first.call(null,this__9035.s);
}
});
cljs.core.NodeSeq.prototype.cljs$core$ISeq$_rest$arity$1 = (function (coll){
var this__9036 = this;
if((this__9036.s == null))
{return cljs.core.create_inode_seq.call(null,this__9036.nodes,(this__9036.i + 2),null);
} else
{return cljs.core.create_inode_seq.call(null,this__9036.nodes,this__9036.i,cljs.core.next.call(null,this__9036.s));
}
});
cljs.core.NodeSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__9037 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.NodeSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__9038 = this;
return (new cljs.core.NodeSeq(meta,this__9038.nodes,this__9038.i,this__9038.s,this__9038.__hash));
});
cljs.core.NodeSeq.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__9039 = this;
return this__9039.meta;
});
cljs.core.NodeSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__9040 = this;
return cljs.core.with_meta.call(null,cljs.core.List.EMPTY,this__9040.meta);
});
cljs.core.NodeSeq;
cljs.core.create_inode_seq = (function() {
var create_inode_seq = null;
var create_inode_seq__1 = (function (nodes){
return create_inode_seq.call(null,nodes,0,null);
});
var create_inode_seq__3 = (function (nodes,i,s){
if((s == null))
{var len__9047 = nodes.length;
var j__9048 = i;
while(true){
if((j__9048 < len__9047))
{if(!(((nodes[j__9048]) == null)))
{return (new cljs.core.NodeSeq(null,nodes,j__9048,null,null));
} else
{var temp__3971__auto____9049 = (nodes[(j__9048 + 1)]);
if(cljs.core.truth_(temp__3971__auto____9049))
{var node__9050 = temp__3971__auto____9049;
var temp__3971__auto____9051 = node__9050.inode_seq();
if(cljs.core.truth_(temp__3971__auto____9051))
{var node_seq__9052 = temp__3971__auto____9051;
return (new cljs.core.NodeSeq(null,nodes,(j__9048 + 2),node_seq__9052,null));
} else
{{
var G__9053 = (j__9048 + 2);
j__9048 = G__9053;
continue;
}
}
} else
{{
var G__9054 = (j__9048 + 2);
j__9048 = G__9054;
continue;
}
}
}
} else
{return null;
}
break;
}
} else
{return (new cljs.core.NodeSeq(null,nodes,i,s,null));
}
});
create_inode_seq = function(nodes,i,s){
switch(arguments.length){
case 1:
return create_inode_seq__1.call(this,nodes);
case 3:
return create_inode_seq__3.call(this,nodes,i,s);
}
throw('Invalid arity: ' + arguments.length);
};
create_inode_seq.cljs$lang$arity$1 = create_inode_seq__1;
create_inode_seq.cljs$lang$arity$3 = create_inode_seq__3;
return create_inode_seq;
})()
;

/**
* @constructor
*/
cljs.core.ArrayNodeSeq = (function (meta,nodes,i,s,__hash){
this.meta = meta;
this.nodes = nodes;
this.i = i;
this.s = s;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 31850572;
})
cljs.core.ArrayNodeSeq.cljs$lang$type = true;
cljs.core.ArrayNodeSeq.cljs$lang$ctorPrSeq = (function (this__2315__auto__){
return cljs.core.list.call(null,"cljs.core/ArrayNodeSeq");
});
cljs.core.ArrayNodeSeq.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__9055 = this;
var h__2198__auto____9056 = this__9055.__hash;
if(!((h__2198__auto____9056 == null)))
{return h__2198__auto____9056;
} else
{var h__2198__auto____9057 = cljs.core.hash_coll.call(null,coll);
this__9055.__hash = h__2198__auto____9057;
return h__2198__auto____9057;
}
});
cljs.core.ArrayNodeSeq.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__9058 = this;
return cljs.core.cons.call(null,o,coll);
});
cljs.core.ArrayNodeSeq.prototype.toString = (function (){
var this__9059 = this;
var this__9060 = this;
return cljs.core.pr_str.call(null,this__9060);
});
cljs.core.ArrayNodeSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this$){
var this__9061 = this;
return this$;
});
cljs.core.ArrayNodeSeq.prototype.cljs$core$ISeq$_first$arity$1 = (function (coll){
var this__9062 = this;
return cljs.core.first.call(null,this__9062.s);
});
cljs.core.ArrayNodeSeq.prototype.cljs$core$ISeq$_rest$arity$1 = (function (coll){
var this__9063 = this;
return cljs.core.create_array_node_seq.call(null,null,this__9063.nodes,this__9063.i,cljs.core.next.call(null,this__9063.s));
});
cljs.core.ArrayNodeSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__9064 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.ArrayNodeSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__9065 = this;
return (new cljs.core.ArrayNodeSeq(meta,this__9065.nodes,this__9065.i,this__9065.s,this__9065.__hash));
});
cljs.core.ArrayNodeSeq.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__9066 = this;
return this__9066.meta;
});
cljs.core.ArrayNodeSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__9067 = this;
return cljs.core.with_meta.call(null,cljs.core.List.EMPTY,this__9067.meta);
});
cljs.core.ArrayNodeSeq;
cljs.core.create_array_node_seq = (function() {
var create_array_node_seq = null;
var create_array_node_seq__1 = (function (nodes){
return create_array_node_seq.call(null,null,nodes,0,null);
});
var create_array_node_seq__4 = (function (meta,nodes,i,s){
if((s == null))
{var len__9074 = nodes.length;
var j__9075 = i;
while(true){
if((j__9075 < len__9074))
{var temp__3971__auto____9076 = (nodes[j__9075]);
if(cljs.core.truth_(temp__3971__auto____9076))
{var nj__9077 = temp__3971__auto____9076;
var temp__3971__auto____9078 = nj__9077.inode_seq();
if(cljs.core.truth_(temp__3971__auto____9078))
{var ns__9079 = temp__3971__auto____9078;
return (new cljs.core.ArrayNodeSeq(meta,nodes,(j__9075 + 1),ns__9079,null));
} else
{{
var G__9080 = (j__9075 + 1);
j__9075 = G__9080;
continue;
}
}
} else
{{
var G__9081 = (j__9075 + 1);
j__9075 = G__9081;
continue;
}
}
} else
{return null;
}
break;
}
} else
{return (new cljs.core.ArrayNodeSeq(meta,nodes,i,s,null));
}
});
create_array_node_seq = function(meta,nodes,i,s){
switch(arguments.length){
case 1:
return create_array_node_seq__1.call(this,meta);
case 4:
return create_array_node_seq__4.call(this,meta,nodes,i,s);
}
throw('Invalid arity: ' + arguments.length);
};
create_array_node_seq.cljs$lang$arity$1 = create_array_node_seq__1;
create_array_node_seq.cljs$lang$arity$4 = create_array_node_seq__4;
return create_array_node_seq;
})()
;

/**
* @constructor
*/
cljs.core.PersistentHashMap = (function (meta,cnt,root,has_nil_QMARK_,nil_val,__hash){
this.meta = meta;
this.cnt = cnt;
this.root = root;
this.has_nil_QMARK_ = has_nil_QMARK_;
this.nil_val = nil_val;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 1;
this.cljs$lang$protocol_mask$partition0$ = 16123663;
})
cljs.core.PersistentHashMap.cljs$lang$type = true;
cljs.core.PersistentHashMap.cljs$lang$ctorPrSeq = (function (this__2315__auto__){
return cljs.core.list.call(null,"cljs.core/PersistentHashMap");
});
cljs.core.PersistentHashMap.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = (function (coll){
var this__9084 = this;
return (new cljs.core.TransientHashMap({},this__9084.root,this__9084.cnt,this__9084.has_nil_QMARK_,this__9084.nil_val));
});
cljs.core.PersistentHashMap.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__9085 = this;
var h__2198__auto____9086 = this__9085.__hash;
if(!((h__2198__auto____9086 == null)))
{return h__2198__auto____9086;
} else
{var h__2198__auto____9087 = cljs.core.hash_imap.call(null,coll);
this__9085.__hash = h__2198__auto____9087;
return h__2198__auto____9087;
}
});
cljs.core.PersistentHashMap.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (coll,k){
var this__9088 = this;
return coll.cljs$core$ILookup$_lookup$arity$3(coll,k,null);
});
cljs.core.PersistentHashMap.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (coll,k,not_found){
var this__9089 = this;
if((k == null))
{if(this__9089.has_nil_QMARK_)
{return this__9089.nil_val;
} else
{return not_found;
}
} else
{if((this__9089.root == null))
{return not_found;
} else
{if("\uFDD0'else")
{return this__9089.root.inode_lookup(0,cljs.core.hash.call(null,k),k,not_found);
} else
{return null;
}
}
}
});
cljs.core.PersistentHashMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (coll,k,v){
var this__9090 = this;
if((k == null))
{if((function (){var and__3822__auto____9091 = this__9090.has_nil_QMARK_;
if(and__3822__auto____9091)
{return (v === this__9090.nil_val);
} else
{return and__3822__auto____9091;
}
})())
{return coll;
} else
{return (new cljs.core.PersistentHashMap(this__9090.meta,((this__9090.has_nil_QMARK_)?this__9090.cnt:(this__9090.cnt + 1)),this__9090.root,true,v,null));
}
} else
{var added_leaf_QMARK___9092 = (new cljs.core.Box(false));
var new_root__9093 = (((this__9090.root == null))?cljs.core.BitmapIndexedNode.EMPTY:this__9090.root).inode_assoc(0,cljs.core.hash.call(null,k),k,v,added_leaf_QMARK___9092);
if((new_root__9093 === this__9090.root))
{return coll;
} else
{return (new cljs.core.PersistentHashMap(this__9090.meta,((added_leaf_QMARK___9092.val)?(this__9090.cnt + 1):this__9090.cnt),new_root__9093,this__9090.has_nil_QMARK_,this__9090.nil_val,null));
}
}
});
cljs.core.PersistentHashMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (coll,k){
var this__9094 = this;
if((k == null))
{return this__9094.has_nil_QMARK_;
} else
{if((this__9094.root == null))
{return false;
} else
{if("\uFDD0'else")
{return !((this__9094.root.inode_lookup(0,cljs.core.hash.call(null,k),k,cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel));
} else
{return null;
}
}
}
});
cljs.core.PersistentHashMap.prototype.call = (function() {
var G__9117 = null;
var G__9117__2 = (function (this_sym9095,k){
var this__9097 = this;
var this_sym9095__9098 = this;
var coll__9099 = this_sym9095__9098;
return coll__9099.cljs$core$ILookup$_lookup$arity$2(coll__9099,k);
});
var G__9117__3 = (function (this_sym9096,k,not_found){
var this__9097 = this;
var this_sym9096__9100 = this;
var coll__9101 = this_sym9096__9100;
return coll__9101.cljs$core$ILookup$_lookup$arity$3(coll__9101,k,not_found);
});
G__9117 = function(this_sym9096,k,not_found){
switch(arguments.length){
case 2:
return G__9117__2.call(this,this_sym9096,k);
case 3:
return G__9117__3.call(this,this_sym9096,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__9117;
})()
;
cljs.core.PersistentHashMap.prototype.apply = (function (this_sym9082,args9083){
var this__9102 = this;
return this_sym9082.call.apply(this_sym9082,[this_sym9082].concat(args9083.slice()));
});
cljs.core.PersistentHashMap.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (coll,f,init){
var this__9103 = this;
var init__9104 = ((this__9103.has_nil_QMARK_)?f.call(null,init,null,this__9103.nil_val):init);
if(cljs.core.reduced_QMARK_.call(null,init__9104))
{return cljs.core.deref.call(null,init__9104);
} else
{if(!((this__9103.root == null)))
{return this__9103.root.kv_reduce(f,init__9104);
} else
{if("\uFDD0'else")
{return init__9104;
} else
{return null;
}
}
}
});
cljs.core.PersistentHashMap.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,entry){
var this__9105 = this;
if(cljs.core.vector_QMARK_.call(null,entry))
{return coll.cljs$core$IAssociative$_assoc$arity$3(coll,cljs.core._nth.call(null,entry,0),cljs.core._nth.call(null,entry,1));
} else
{return cljs.core.reduce.call(null,cljs.core._conj,coll,entry);
}
});
cljs.core.PersistentHashMap.prototype.toString = (function (){
var this__9106 = this;
var this__9107 = this;
return cljs.core.pr_str.call(null,this__9107);
});
cljs.core.PersistentHashMap.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__9108 = this;
if((this__9108.cnt > 0))
{var s__9109 = ((!((this__9108.root == null)))?this__9108.root.inode_seq():null);
if(this__9108.has_nil_QMARK_)
{return cljs.core.cons.call(null,cljs.core.PersistentVector.fromArray([null,this__9108.nil_val], true),s__9109);
} else
{return s__9109;
}
} else
{return null;
}
});
cljs.core.PersistentHashMap.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__9110 = this;
return this__9110.cnt;
});
cljs.core.PersistentHashMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__9111 = this;
return cljs.core.equiv_map.call(null,coll,other);
});
cljs.core.PersistentHashMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__9112 = this;
return (new cljs.core.PersistentHashMap(meta,this__9112.cnt,this__9112.root,this__9112.has_nil_QMARK_,this__9112.nil_val,this__9112.__hash));
});
cljs.core.PersistentHashMap.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__9113 = this;
return this__9113.meta;
});
cljs.core.PersistentHashMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__9114 = this;
return cljs.core._with_meta.call(null,cljs.core.PersistentHashMap.EMPTY,this__9114.meta);
});
cljs.core.PersistentHashMap.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (coll,k){
var this__9115 = this;
if((k == null))
{if(this__9115.has_nil_QMARK_)
{return (new cljs.core.PersistentHashMap(this__9115.meta,(this__9115.cnt - 1),this__9115.root,false,null,null));
} else
{return coll;
}
} else
{if((this__9115.root == null))
{return coll;
} else
{if("\uFDD0'else")
{var new_root__9116 = this__9115.root.inode_without(0,cljs.core.hash.call(null,k),k);
if((new_root__9116 === this__9115.root))
{return coll;
} else
{return (new cljs.core.PersistentHashMap(this__9115.meta,(this__9115.cnt - 1),new_root__9116,this__9115.has_nil_QMARK_,this__9115.nil_val,null));
}
} else
{return null;
}
}
}
});
cljs.core.PersistentHashMap;
cljs.core.PersistentHashMap.EMPTY = (new cljs.core.PersistentHashMap(null,0,null,false,null,0));
cljs.core.PersistentHashMap.fromArrays = (function (ks,vs){
var len__9118 = ks.length;
var i__9119 = 0;
var out__9120 = cljs.core.transient$.call(null,cljs.core.PersistentHashMap.EMPTY);
while(true){
if((i__9119 < len__9118))
{{
var G__9121 = (i__9119 + 1);
var G__9122 = cljs.core.assoc_BANG_.call(null,out__9120,(ks[i__9119]),(vs[i__9119]));
i__9119 = G__9121;
out__9120 = G__9122;
continue;
}
} else
{return cljs.core.persistent_BANG_.call(null,out__9120);
}
break;
}
});

/**
* @constructor
*/
cljs.core.TransientHashMap = (function (edit,root,count,has_nil_QMARK_,nil_val){
this.edit = edit;
this.root = root;
this.count = count;
this.has_nil_QMARK_ = has_nil_QMARK_;
this.nil_val = nil_val;
this.cljs$lang$protocol_mask$partition1$ = 14;
this.cljs$lang$protocol_mask$partition0$ = 258;
})
cljs.core.TransientHashMap.cljs$lang$type = true;
cljs.core.TransientHashMap.cljs$lang$ctorPrSeq = (function (this__2315__auto__){
return cljs.core.list.call(null,"cljs.core/TransientHashMap");
});
cljs.core.TransientHashMap.prototype.cljs$core$ITransientMap$_dissoc_BANG_$arity$2 = (function (tcoll,key){
var this__9123 = this;
return tcoll.without_BANG_(key);
});
cljs.core.TransientHashMap.prototype.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3 = (function (tcoll,key,val){
var this__9124 = this;
return tcoll.assoc_BANG_(key,val);
});
cljs.core.TransientHashMap.prototype.cljs$core$ITransientCollection$_conj_BANG_$arity$2 = (function (tcoll,val){
var this__9125 = this;
return tcoll.conj_BANG_(val);
});
cljs.core.TransientHashMap.prototype.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 = (function (tcoll){
var this__9126 = this;
return tcoll.persistent_BANG_();
});
cljs.core.TransientHashMap.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (tcoll,k){
var this__9127 = this;
if((k == null))
{if(this__9127.has_nil_QMARK_)
{return this__9127.nil_val;
} else
{return null;
}
} else
{if((this__9127.root == null))
{return null;
} else
{return this__9127.root.inode_lookup(0,cljs.core.hash.call(null,k),k);
}
}
});
cljs.core.TransientHashMap.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (tcoll,k,not_found){
var this__9128 = this;
if((k == null))
{if(this__9128.has_nil_QMARK_)
{return this__9128.nil_val;
} else
{return not_found;
}
} else
{if((this__9128.root == null))
{return not_found;
} else
{return this__9128.root.inode_lookup(0,cljs.core.hash.call(null,k),k,not_found);
}
}
});
cljs.core.TransientHashMap.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__9129 = this;
if(this__9129.edit)
{return this__9129.count;
} else
{throw (new Error("count after persistent!"));
}
});
cljs.core.TransientHashMap.prototype.conj_BANG_ = (function (o){
var this__9130 = this;
var tcoll__9131 = this;
if(this__9130.edit)
{if((function (){var G__9132__9133 = o;
if(G__9132__9133)
{if((function (){var or__3824__auto____9134 = (G__9132__9133.cljs$lang$protocol_mask$partition0$ & 2048);
if(or__3824__auto____9134)
{return or__3824__auto____9134;
} else
{return G__9132__9133.cljs$core$IMapEntry$;
}
})())
{return true;
} else
{if((!G__9132__9133.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IMapEntry,G__9132__9133);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IMapEntry,G__9132__9133);
}
})())
{return tcoll__9131.assoc_BANG_(cljs.core.key.call(null,o),cljs.core.val.call(null,o));
} else
{var es__9135 = cljs.core.seq.call(null,o);
var tcoll__9136 = tcoll__9131;
while(true){
var temp__3971__auto____9137 = cljs.core.first.call(null,es__9135);
if(cljs.core.truth_(temp__3971__auto____9137))
{var e__9138 = temp__3971__auto____9137;
{
var G__9149 = cljs.core.next.call(null,es__9135);
var G__9150 = tcoll__9136.assoc_BANG_(cljs.core.key.call(null,e__9138),cljs.core.val.call(null,e__9138));
es__9135 = G__9149;
tcoll__9136 = G__9150;
continue;
}
} else
{return tcoll__9136;
}
break;
}
}
} else
{throw (new Error("conj! after persistent"));
}
});
cljs.core.TransientHashMap.prototype.assoc_BANG_ = (function (k,v){
var this__9139 = this;
var tcoll__9140 = this;
if(this__9139.edit)
{if((k == null))
{if((this__9139.nil_val === v))
{} else
{this__9139.nil_val = v;
}
if(this__9139.has_nil_QMARK_)
{} else
{this__9139.count = (this__9139.count + 1);
this__9139.has_nil_QMARK_ = true;
}
return tcoll__9140;
} else
{var added_leaf_QMARK___9141 = (new cljs.core.Box(false));
var node__9142 = (((this__9139.root == null))?cljs.core.BitmapIndexedNode.EMPTY:this__9139.root).inode_assoc_BANG_(this__9139.edit,0,cljs.core.hash.call(null,k),k,v,added_leaf_QMARK___9141);
if((node__9142 === this__9139.root))
{} else
{this__9139.root = node__9142;
}
if(added_leaf_QMARK___9141.val)
{this__9139.count = (this__9139.count + 1);
} else
{}
return tcoll__9140;
}
} else
{throw (new Error("assoc! after persistent!"));
}
});
cljs.core.TransientHashMap.prototype.without_BANG_ = (function (k){
var this__9143 = this;
var tcoll__9144 = this;
if(this__9143.edit)
{if((k == null))
{if(this__9143.has_nil_QMARK_)
{this__9143.has_nil_QMARK_ = false;
this__9143.nil_val = null;
this__9143.count = (this__9143.count - 1);
return tcoll__9144;
} else
{return tcoll__9144;
}
} else
{if((this__9143.root == null))
{return tcoll__9144;
} else
{var removed_leaf_QMARK___9145 = (new cljs.core.Box(false));
var node__9146 = this__9143.root.inode_without_BANG_(this__9143.edit,0,cljs.core.hash.call(null,k),k,removed_leaf_QMARK___9145);
if((node__9146 === this__9143.root))
{} else
{this__9143.root = node__9146;
}
if(cljs.core.truth_((removed_leaf_QMARK___9145[0])))
{this__9143.count = (this__9143.count - 1);
} else
{}
return tcoll__9144;
}
}
} else
{throw (new Error("dissoc! after persistent!"));
}
});
cljs.core.TransientHashMap.prototype.persistent_BANG_ = (function (){
var this__9147 = this;
var tcoll__9148 = this;
if(this__9147.edit)
{this__9147.edit = null;
return (new cljs.core.PersistentHashMap(null,this__9147.count,this__9147.root,this__9147.has_nil_QMARK_,this__9147.nil_val,null));
} else
{throw (new Error("persistent! called twice"));
}
});
cljs.core.TransientHashMap;
cljs.core.tree_map_seq_push = (function tree_map_seq_push(node,stack,ascending_QMARK_){
var t__9153 = node;
var stack__9154 = stack;
while(true){
if(!((t__9153 == null)))
{{
var G__9155 = ((ascending_QMARK_)?t__9153.left:t__9153.right);
var G__9156 = cljs.core.conj.call(null,stack__9154,t__9153);
t__9153 = G__9155;
stack__9154 = G__9156;
continue;
}
} else
{return stack__9154;
}
break;
}
});

/**
* @constructor
*/
cljs.core.PersistentTreeMapSeq = (function (meta,stack,ascending_QMARK_,cnt,__hash){
this.meta = meta;
this.stack = stack;
this.ascending_QMARK_ = ascending_QMARK_;
this.cnt = cnt;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 31850570;
})
cljs.core.PersistentTreeMapSeq.cljs$lang$type = true;
cljs.core.PersistentTreeMapSeq.cljs$lang$ctorPrSeq = (function (this__2315__auto__){
return cljs.core.list.call(null,"cljs.core/PersistentTreeMapSeq");
});
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__9157 = this;
var h__2198__auto____9158 = this__9157.__hash;
if(!((h__2198__auto____9158 == null)))
{return h__2198__auto____9158;
} else
{var h__2198__auto____9159 = cljs.core.hash_coll.call(null,coll);
this__9157.__hash = h__2198__auto____9159;
return h__2198__auto____9159;
}
});
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__9160 = this;
return cljs.core.cons.call(null,o,coll);
});
cljs.core.PersistentTreeMapSeq.prototype.toString = (function (){
var this__9161 = this;
var this__9162 = this;
return cljs.core.pr_str.call(null,this__9162);
});
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this$){
var this__9163 = this;
return this$;
});
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__9164 = this;
if((this__9164.cnt < 0))
{return (cljs.core.count.call(null,cljs.core.next.call(null,coll)) + 1);
} else
{return this__9164.cnt;
}
});
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ISeq$_first$arity$1 = (function (this$){
var this__9165 = this;
return cljs.core.peek.call(null,this__9165.stack);
});
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ISeq$_rest$arity$1 = (function (this$){
var this__9166 = this;
var t__9167 = cljs.core.first.call(null,this__9166.stack);
var next_stack__9168 = cljs.core.tree_map_seq_push.call(null,((this__9166.ascending_QMARK_)?t__9167.right:t__9167.left),cljs.core.next.call(null,this__9166.stack),this__9166.ascending_QMARK_);
if(!((next_stack__9168 == null)))
{return (new cljs.core.PersistentTreeMapSeq(null,next_stack__9168,this__9166.ascending_QMARK_,(this__9166.cnt - 1),null));
} else
{return cljs.core.List.EMPTY;
}
});
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__9169 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__9170 = this;
return (new cljs.core.PersistentTreeMapSeq(meta,this__9170.stack,this__9170.ascending_QMARK_,this__9170.cnt,this__9170.__hash));
});
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__9171 = this;
return this__9171.meta;
});
cljs.core.PersistentTreeMapSeq;
cljs.core.create_tree_map_seq = (function create_tree_map_seq(tree,ascending_QMARK_,cnt){
return (new cljs.core.PersistentTreeMapSeq(null,cljs.core.tree_map_seq_push.call(null,tree,null,ascending_QMARK_),ascending_QMARK_,cnt,null));
});
cljs.core.balance_left = (function balance_left(key,val,ins,right){
if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,ins))
{if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,ins.left))
{return (new cljs.core.RedNode(ins.key,ins.val,ins.left.blacken(),(new cljs.core.BlackNode(key,val,ins.right,right,null)),null));
} else
{if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,ins.right))
{return (new cljs.core.RedNode(ins.right.key,ins.right.val,(new cljs.core.BlackNode(ins.key,ins.val,ins.left,ins.right.left,null)),(new cljs.core.BlackNode(key,val,ins.right.right,right,null)),null));
} else
{if("\uFDD0'else")
{return (new cljs.core.BlackNode(key,val,ins,right,null));
} else
{return null;
}
}
}
} else
{return (new cljs.core.BlackNode(key,val,ins,right,null));
}
});
cljs.core.balance_right = (function balance_right(key,val,left,ins){
if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,ins))
{if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,ins.right))
{return (new cljs.core.RedNode(ins.key,ins.val,(new cljs.core.BlackNode(key,val,left,ins.left,null)),ins.right.blacken(),null));
} else
{if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,ins.left))
{return (new cljs.core.RedNode(ins.left.key,ins.left.val,(new cljs.core.BlackNode(key,val,left,ins.left.left,null)),(new cljs.core.BlackNode(ins.key,ins.val,ins.left.right,ins.right,null)),null));
} else
{if("\uFDD0'else")
{return (new cljs.core.BlackNode(key,val,left,ins,null));
} else
{return null;
}
}
}
} else
{return (new cljs.core.BlackNode(key,val,left,ins,null));
}
});
cljs.core.balance_left_del = (function balance_left_del(key,val,del,right){
if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,del))
{return (new cljs.core.RedNode(key,val,del.blacken(),right,null));
} else
{if(cljs.core.instance_QMARK_.call(null,cljs.core.BlackNode,right))
{return cljs.core.balance_right.call(null,key,val,del,right.redden());
} else
{if((function (){var and__3822__auto____9173 = cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,right);
if(and__3822__auto____9173)
{return cljs.core.instance_QMARK_.call(null,cljs.core.BlackNode,right.left);
} else
{return and__3822__auto____9173;
}
})())
{return (new cljs.core.RedNode(right.left.key,right.left.val,(new cljs.core.BlackNode(key,val,del,right.left.left,null)),cljs.core.balance_right.call(null,right.key,right.val,right.left.right,right.right.redden()),null));
} else
{if("\uFDD0'else")
{throw (new Error("red-black tree invariant violation"));
} else
{return null;
}
}
}
}
});
cljs.core.balance_right_del = (function balance_right_del(key,val,left,del){
if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,del))
{return (new cljs.core.RedNode(key,val,left,del.blacken(),null));
} else
{if(cljs.core.instance_QMARK_.call(null,cljs.core.BlackNode,left))
{return cljs.core.balance_left.call(null,key,val,left.redden(),del);
} else
{if((function (){var and__3822__auto____9175 = cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,left);
if(and__3822__auto____9175)
{return cljs.core.instance_QMARK_.call(null,cljs.core.BlackNode,left.right);
} else
{return and__3822__auto____9175;
}
})())
{return (new cljs.core.RedNode(left.right.key,left.right.val,cljs.core.balance_left.call(null,left.key,left.val,left.left.redden(),left.right.left),(new cljs.core.BlackNode(key,val,left.right.right,del,null)),null));
} else
{if("\uFDD0'else")
{throw (new Error("red-black tree invariant violation"));
} else
{return null;
}
}
}
}
});
cljs.core.tree_map_kv_reduce = (function tree_map_kv_reduce(node,f,init){
var init__9179 = f.call(null,init,node.key,node.val);
if(cljs.core.reduced_QMARK_.call(null,init__9179))
{return cljs.core.deref.call(null,init__9179);
} else
{var init__9180 = ((!((node.left == null)))?tree_map_kv_reduce.call(null,node.left,f,init__9179):init__9179);
if(cljs.core.reduced_QMARK_.call(null,init__9180))
{return cljs.core.deref.call(null,init__9180);
} else
{var init__9181 = ((!((node.right == null)))?tree_map_kv_reduce.call(null,node.right,f,init__9180):init__9180);
if(cljs.core.reduced_QMARK_.call(null,init__9181))
{return cljs.core.deref.call(null,init__9181);
} else
{return init__9181;
}
}
}
});

/**
* @constructor
*/
cljs.core.BlackNode = (function (key,val,left,right,__hash){
this.key = key;
this.val = val;
this.left = left;
this.right = right;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 32402207;
})
cljs.core.BlackNode.cljs$lang$type = true;
cljs.core.BlackNode.cljs$lang$ctorPrSeq = (function (this__2315__auto__){
return cljs.core.list.call(null,"cljs.core/BlackNode");
});
cljs.core.BlackNode.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__9184 = this;
var h__2198__auto____9185 = this__9184.__hash;
if(!((h__2198__auto____9185 == null)))
{return h__2198__auto____9185;
} else
{var h__2198__auto____9186 = cljs.core.hash_coll.call(null,coll);
this__9184.__hash = h__2198__auto____9186;
return h__2198__auto____9186;
}
});
cljs.core.BlackNode.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (node,k){
var this__9187 = this;
return node.cljs$core$IIndexed$_nth$arity$3(node,k,null);
});
cljs.core.BlackNode.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (node,k,not_found){
var this__9188 = this;
return node.cljs$core$IIndexed$_nth$arity$3(node,k,not_found);
});
cljs.core.BlackNode.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (node,k,v){
var this__9189 = this;
return cljs.core.assoc.call(null,cljs.core.PersistentVector.fromArray([this__9189.key,this__9189.val], true),k,v);
});
cljs.core.BlackNode.prototype.call = (function() {
var G__9237 = null;
var G__9237__2 = (function (this_sym9190,k){
var this__9192 = this;
var this_sym9190__9193 = this;
var node__9194 = this_sym9190__9193;
return node__9194.cljs$core$ILookup$_lookup$arity$2(node__9194,k);
});
var G__9237__3 = (function (this_sym9191,k,not_found){
var this__9192 = this;
var this_sym9191__9195 = this;
var node__9196 = this_sym9191__9195;
return node__9196.cljs$core$ILookup$_lookup$arity$3(node__9196,k,not_found);
});
G__9237 = function(this_sym9191,k,not_found){
switch(arguments.length){
case 2:
return G__9237__2.call(this,this_sym9191,k);
case 3:
return G__9237__3.call(this,this_sym9191,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__9237;
})()
;
cljs.core.BlackNode.prototype.apply = (function (this_sym9182,args9183){
var this__9197 = this;
return this_sym9182.call.apply(this_sym9182,[this_sym9182].concat(args9183.slice()));
});
cljs.core.BlackNode.prototype.cljs$core$ICollection$_conj$arity$2 = (function (node,o){
var this__9198 = this;
return cljs.core.PersistentVector.fromArray([this__9198.key,this__9198.val,o], true);
});
cljs.core.BlackNode.prototype.cljs$core$IMapEntry$_key$arity$1 = (function (node){
var this__9199 = this;
return this__9199.key;
});
cljs.core.BlackNode.prototype.cljs$core$IMapEntry$_val$arity$1 = (function (node){
var this__9200 = this;
return this__9200.val;
});
cljs.core.BlackNode.prototype.add_right = (function (ins){
var this__9201 = this;
var node__9202 = this;
return ins.balance_right(node__9202);
});
cljs.core.BlackNode.prototype.redden = (function (){
var this__9203 = this;
var node__9204 = this;
return (new cljs.core.RedNode(this__9203.key,this__9203.val,this__9203.left,this__9203.right,null));
});
cljs.core.BlackNode.prototype.remove_right = (function (del){
var this__9205 = this;
var node__9206 = this;
return cljs.core.balance_right_del.call(null,this__9205.key,this__9205.val,this__9205.left,del);
});
cljs.core.BlackNode.prototype.replace = (function (key,val,left,right){
var this__9207 = this;
var node__9208 = this;
return (new cljs.core.BlackNode(key,val,left,right,null));
});
cljs.core.BlackNode.prototype.kv_reduce = (function (f,init){
var this__9209 = this;
var node__9210 = this;
return cljs.core.tree_map_kv_reduce.call(null,node__9210,f,init);
});
cljs.core.BlackNode.prototype.remove_left = (function (del){
var this__9211 = this;
var node__9212 = this;
return cljs.core.balance_left_del.call(null,this__9211.key,this__9211.val,del,this__9211.right);
});
cljs.core.BlackNode.prototype.add_left = (function (ins){
var this__9213 = this;
var node__9214 = this;
return ins.balance_left(node__9214);
});
cljs.core.BlackNode.prototype.balance_left = (function (parent){
var this__9215 = this;
var node__9216 = this;
return (new cljs.core.BlackNode(parent.key,parent.val,node__9216,parent.right,null));
});
cljs.core.BlackNode.prototype.toString = (function() {
var G__9238 = null;
var G__9238__0 = (function (){
var this__9217 = this;
var this__9219 = this;
return cljs.core.pr_str.call(null,this__9219);
});
G__9238 = function(){
switch(arguments.length){
case 0:
return G__9238__0.call(this);
}
throw('Invalid arity: ' + arguments.length);
};
return G__9238;
})()
;
cljs.core.BlackNode.prototype.balance_right = (function (parent){
var this__9220 = this;
var node__9221 = this;
return (new cljs.core.BlackNode(parent.key,parent.val,parent.left,node__9221,null));
});
cljs.core.BlackNode.prototype.blacken = (function (){
var this__9222 = this;
var node__9223 = this;
return node__9223;
});
cljs.core.BlackNode.prototype.cljs$core$IReduce$_reduce$arity$2 = (function (node,f){
var this__9224 = this;
return cljs.core.ci_reduce.call(null,node,f);
});
cljs.core.BlackNode.prototype.cljs$core$IReduce$_reduce$arity$3 = (function (node,f,start){
var this__9225 = this;
return cljs.core.ci_reduce.call(null,node,f,start);
});
cljs.core.BlackNode.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (node){
var this__9226 = this;
return cljs.core.list.call(null,this__9226.key,this__9226.val);
});
cljs.core.BlackNode.prototype.cljs$core$ICounted$_count$arity$1 = (function (node){
var this__9227 = this;
return 2;
});
cljs.core.BlackNode.prototype.cljs$core$IStack$_peek$arity$1 = (function (node){
var this__9228 = this;
return this__9228.val;
});
cljs.core.BlackNode.prototype.cljs$core$IStack$_pop$arity$1 = (function (node){
var this__9229 = this;
return cljs.core.PersistentVector.fromArray([this__9229.key], true);
});
cljs.core.BlackNode.prototype.cljs$core$IVector$_assoc_n$arity$3 = (function (node,n,v){
var this__9230 = this;
return cljs.core._assoc_n.call(null,cljs.core.PersistentVector.fromArray([this__9230.key,this__9230.val], true),n,v);
});
cljs.core.BlackNode.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__9231 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.BlackNode.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (node,meta){
var this__9232 = this;
return cljs.core.with_meta.call(null,cljs.core.PersistentVector.fromArray([this__9232.key,this__9232.val], true),meta);
});
cljs.core.BlackNode.prototype.cljs$core$IMeta$_meta$arity$1 = (function (node){
var this__9233 = this;
return null;
});
cljs.core.BlackNode.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (node,n){
var this__9234 = this;
if((n === 0))
{return this__9234.key;
} else
{if((n === 1))
{return this__9234.val;
} else
{if("\uFDD0'else")
{return null;
} else
{return null;
}
}
}
});
cljs.core.BlackNode.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (node,n,not_found){
var this__9235 = this;
if((n === 0))
{return this__9235.key;
} else
{if((n === 1))
{return this__9235.val;
} else
{if("\uFDD0'else")
{return not_found;
} else
{return null;
}
}
}
});
cljs.core.BlackNode.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (node){
var this__9236 = this;
return cljs.core.PersistentVector.EMPTY;
});
cljs.core.BlackNode;

/**
* @constructor
*/
cljs.core.RedNode = (function (key,val,left,right,__hash){
this.key = key;
this.val = val;
this.left = left;
this.right = right;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 32402207;
})
cljs.core.RedNode.cljs$lang$type = true;
cljs.core.RedNode.cljs$lang$ctorPrSeq = (function (this__2315__auto__){
return cljs.core.list.call(null,"cljs.core/RedNode");
});
cljs.core.RedNode.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__9241 = this;
var h__2198__auto____9242 = this__9241.__hash;
if(!((h__2198__auto____9242 == null)))
{return h__2198__auto____9242;
} else
{var h__2198__auto____9243 = cljs.core.hash_coll.call(null,coll);
this__9241.__hash = h__2198__auto____9243;
return h__2198__auto____9243;
}
});
cljs.core.RedNode.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (node,k){
var this__9244 = this;
return node.cljs$core$IIndexed$_nth$arity$3(node,k,null);
});
cljs.core.RedNode.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (node,k,not_found){
var this__9245 = this;
return node.cljs$core$IIndexed$_nth$arity$3(node,k,not_found);
});
cljs.core.RedNode.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (node,k,v){
var this__9246 = this;
return cljs.core.assoc.call(null,cljs.core.PersistentVector.fromArray([this__9246.key,this__9246.val], true),k,v);
});
cljs.core.RedNode.prototype.call = (function() {
var G__9294 = null;
var G__9294__2 = (function (this_sym9247,k){
var this__9249 = this;
var this_sym9247__9250 = this;
var node__9251 = this_sym9247__9250;
return node__9251.cljs$core$ILookup$_lookup$arity$2(node__9251,k);
});
var G__9294__3 = (function (this_sym9248,k,not_found){
var this__9249 = this;
var this_sym9248__9252 = this;
var node__9253 = this_sym9248__9252;
return node__9253.cljs$core$ILookup$_lookup$arity$3(node__9253,k,not_found);
});
G__9294 = function(this_sym9248,k,not_found){
switch(arguments.length){
case 2:
return G__9294__2.call(this,this_sym9248,k);
case 3:
return G__9294__3.call(this,this_sym9248,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__9294;
})()
;
cljs.core.RedNode.prototype.apply = (function (this_sym9239,args9240){
var this__9254 = this;
return this_sym9239.call.apply(this_sym9239,[this_sym9239].concat(args9240.slice()));
});
cljs.core.RedNode.prototype.cljs$core$ICollection$_conj$arity$2 = (function (node,o){
var this__9255 = this;
return cljs.core.PersistentVector.fromArray([this__9255.key,this__9255.val,o], true);
});
cljs.core.RedNode.prototype.cljs$core$IMapEntry$_key$arity$1 = (function (node){
var this__9256 = this;
return this__9256.key;
});
cljs.core.RedNode.prototype.cljs$core$IMapEntry$_val$arity$1 = (function (node){
var this__9257 = this;
return this__9257.val;
});
cljs.core.RedNode.prototype.add_right = (function (ins){
var this__9258 = this;
var node__9259 = this;
return (new cljs.core.RedNode(this__9258.key,this__9258.val,this__9258.left,ins,null));
});
cljs.core.RedNode.prototype.redden = (function (){
var this__9260 = this;
var node__9261 = this;
throw (new Error("red-black tree invariant violation"));
});
cljs.core.RedNode.prototype.remove_right = (function (del){
var this__9262 = this;
var node__9263 = this;
return (new cljs.core.RedNode(this__9262.key,this__9262.val,this__9262.left,del,null));
});
cljs.core.RedNode.prototype.replace = (function (key,val,left,right){
var this__9264 = this;
var node__9265 = this;
return (new cljs.core.RedNode(key,val,left,right,null));
});
cljs.core.RedNode.prototype.kv_reduce = (function (f,init){
var this__9266 = this;
var node__9267 = this;
return cljs.core.tree_map_kv_reduce.call(null,node__9267,f,init);
});
cljs.core.RedNode.prototype.remove_left = (function (del){
var this__9268 = this;
var node__9269 = this;
return (new cljs.core.RedNode(this__9268.key,this__9268.val,del,this__9268.right,null));
});
cljs.core.RedNode.prototype.add_left = (function (ins){
var this__9270 = this;
var node__9271 = this;
return (new cljs.core.RedNode(this__9270.key,this__9270.val,ins,this__9270.right,null));
});
cljs.core.RedNode.prototype.balance_left = (function (parent){
var this__9272 = this;
var node__9273 = this;
if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,this__9272.left))
{return (new cljs.core.RedNode(this__9272.key,this__9272.val,this__9272.left.blacken(),(new cljs.core.BlackNode(parent.key,parent.val,this__9272.right,parent.right,null)),null));
} else
{if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,this__9272.right))
{return (new cljs.core.RedNode(this__9272.right.key,this__9272.right.val,(new cljs.core.BlackNode(this__9272.key,this__9272.val,this__9272.left,this__9272.right.left,null)),(new cljs.core.BlackNode(parent.key,parent.val,this__9272.right.right,parent.right,null)),null));
} else
{if("\uFDD0'else")
{return (new cljs.core.BlackNode(parent.key,parent.val,node__9273,parent.right,null));
} else
{return null;
}
}
}
});
cljs.core.RedNode.prototype.toString = (function() {
var G__9295 = null;
var G__9295__0 = (function (){
var this__9274 = this;
var this__9276 = this;
return cljs.core.pr_str.call(null,this__9276);
});
G__9295 = function(){
switch(arguments.length){
case 0:
return G__9295__0.call(this);
}
throw('Invalid arity: ' + arguments.length);
};
return G__9295;
})()
;
cljs.core.RedNode.prototype.balance_right = (function (parent){
var this__9277 = this;
var node__9278 = this;
if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,this__9277.right))
{return (new cljs.core.RedNode(this__9277.key,this__9277.val,(new cljs.core.BlackNode(parent.key,parent.val,parent.left,this__9277.left,null)),this__9277.right.blacken(),null));
} else
{if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,this__9277.left))
{return (new cljs.core.RedNode(this__9277.left.key,this__9277.left.val,(new cljs.core.BlackNode(parent.key,parent.val,parent.left,this__9277.left.left,null)),(new cljs.core.BlackNode(this__9277.key,this__9277.val,this__9277.left.right,this__9277.right,null)),null));
} else
{if("\uFDD0'else")
{return (new cljs.core.BlackNode(parent.key,parent.val,parent.left,node__9278,null));
} else
{return null;
}
}
}
});
cljs.core.RedNode.prototype.blacken = (function (){
var this__9279 = this;
var node__9280 = this;
return (new cljs.core.BlackNode(this__9279.key,this__9279.val,this__9279.left,this__9279.right,null));
});
cljs.core.RedNode.prototype.cljs$core$IReduce$_reduce$arity$2 = (function (node,f){
var this__9281 = this;
return cljs.core.ci_reduce.call(null,node,f);
});
cljs.core.RedNode.prototype.cljs$core$IReduce$_reduce$arity$3 = (function (node,f,start){
var this__9282 = this;
return cljs.core.ci_reduce.call(null,node,f,start);
});
cljs.core.RedNode.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (node){
var this__9283 = this;
return cljs.core.list.call(null,this__9283.key,this__9283.val);
});
cljs.core.RedNode.prototype.cljs$core$ICounted$_count$arity$1 = (function (node){
var this__9284 = this;
return 2;
});
cljs.core.RedNode.prototype.cljs$core$IStack$_peek$arity$1 = (function (node){
var this__9285 = this;
return this__9285.val;
});
cljs.core.RedNode.prototype.cljs$core$IStack$_pop$arity$1 = (function (node){
var this__9286 = this;
return cljs.core.PersistentVector.fromArray([this__9286.key], true);
});
cljs.core.RedNode.prototype.cljs$core$IVector$_assoc_n$arity$3 = (function (node,n,v){
var this__9287 = this;
return cljs.core._assoc_n.call(null,cljs.core.PersistentVector.fromArray([this__9287.key,this__9287.val], true),n,v);
});
cljs.core.RedNode.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__9288 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.RedNode.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (node,meta){
var this__9289 = this;
return cljs.core.with_meta.call(null,cljs.core.PersistentVector.fromArray([this__9289.key,this__9289.val], true),meta);
});
cljs.core.RedNode.prototype.cljs$core$IMeta$_meta$arity$1 = (function (node){
var this__9290 = this;
return null;
});
cljs.core.RedNode.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (node,n){
var this__9291 = this;
if((n === 0))
{return this__9291.key;
} else
{if((n === 1))
{return this__9291.val;
} else
{if("\uFDD0'else")
{return null;
} else
{return null;
}
}
}
});
cljs.core.RedNode.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (node,n,not_found){
var this__9292 = this;
if((n === 0))
{return this__9292.key;
} else
{if((n === 1))
{return this__9292.val;
} else
{if("\uFDD0'else")
{return not_found;
} else
{return null;
}
}
}
});
cljs.core.RedNode.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (node){
var this__9293 = this;
return cljs.core.PersistentVector.EMPTY;
});
cljs.core.RedNode;
cljs.core.tree_map_add = (function tree_map_add(comp,tree,k,v,found){
if((tree == null))
{return (new cljs.core.RedNode(k,v,null,null,null));
} else
{var c__9299 = comp.call(null,k,tree.key);
if((c__9299 === 0))
{(found[0] = tree);
return null;
} else
{if((c__9299 < 0))
{var ins__9300 = tree_map_add.call(null,comp,tree.left,k,v,found);
if(!((ins__9300 == null)))
{return tree.add_left(ins__9300);
} else
{return null;
}
} else
{if("\uFDD0'else")
{var ins__9301 = tree_map_add.call(null,comp,tree.right,k,v,found);
if(!((ins__9301 == null)))
{return tree.add_right(ins__9301);
} else
{return null;
}
} else
{return null;
}
}
}
}
});
cljs.core.tree_map_append = (function tree_map_append(left,right){
if((left == null))
{return right;
} else
{if((right == null))
{return left;
} else
{if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,left))
{if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,right))
{var app__9304 = tree_map_append.call(null,left.right,right.left);
if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,app__9304))
{return (new cljs.core.RedNode(app__9304.key,app__9304.val,(new cljs.core.RedNode(left.key,left.val,left.left,app__9304.left,null)),(new cljs.core.RedNode(right.key,right.val,app__9304.right,right.right,null)),null));
} else
{return (new cljs.core.RedNode(left.key,left.val,left.left,(new cljs.core.RedNode(right.key,right.val,app__9304,right.right,null)),null));
}
} else
{return (new cljs.core.RedNode(left.key,left.val,left.left,tree_map_append.call(null,left.right,right),null));
}
} else
{if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,right))
{return (new cljs.core.RedNode(right.key,right.val,tree_map_append.call(null,left,right.left),right.right,null));
} else
{if("\uFDD0'else")
{var app__9305 = tree_map_append.call(null,left.right,right.left);
if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,app__9305))
{return (new cljs.core.RedNode(app__9305.key,app__9305.val,(new cljs.core.BlackNode(left.key,left.val,left.left,app__9305.left,null)),(new cljs.core.BlackNode(right.key,right.val,app__9305.right,right.right,null)),null));
} else
{return cljs.core.balance_left_del.call(null,left.key,left.val,left.left,(new cljs.core.BlackNode(right.key,right.val,app__9305,right.right,null)));
}
} else
{return null;
}
}
}
}
}
});
cljs.core.tree_map_remove = (function tree_map_remove(comp,tree,k,found){
if(!((tree == null)))
{var c__9311 = comp.call(null,k,tree.key);
if((c__9311 === 0))
{(found[0] = tree);
return cljs.core.tree_map_append.call(null,tree.left,tree.right);
} else
{if((c__9311 < 0))
{var del__9312 = tree_map_remove.call(null,comp,tree.left,k,found);
if((function (){var or__3824__auto____9313 = !((del__9312 == null));
if(or__3824__auto____9313)
{return or__3824__auto____9313;
} else
{return !(((found[0]) == null));
}
})())
{if(cljs.core.instance_QMARK_.call(null,cljs.core.BlackNode,tree.left))
{return cljs.core.balance_left_del.call(null,tree.key,tree.val,del__9312,tree.right);
} else
{return (new cljs.core.RedNode(tree.key,tree.val,del__9312,tree.right,null));
}
} else
{return null;
}
} else
{if("\uFDD0'else")
{var del__9314 = tree_map_remove.call(null,comp,tree.right,k,found);
if((function (){var or__3824__auto____9315 = !((del__9314 == null));
if(or__3824__auto____9315)
{return or__3824__auto____9315;
} else
{return !(((found[0]) == null));
}
})())
{if(cljs.core.instance_QMARK_.call(null,cljs.core.BlackNode,tree.right))
{return cljs.core.balance_right_del.call(null,tree.key,tree.val,tree.left,del__9314);
} else
{return (new cljs.core.RedNode(tree.key,tree.val,tree.left,del__9314,null));
}
} else
{return null;
}
} else
{return null;
}
}
}
} else
{return null;
}
});
cljs.core.tree_map_replace = (function tree_map_replace(comp,tree,k,v){
var tk__9318 = tree.key;
var c__9319 = comp.call(null,k,tk__9318);
if((c__9319 === 0))
{return tree.replace(tk__9318,v,tree.left,tree.right);
} else
{if((c__9319 < 0))
{return tree.replace(tk__9318,tree.val,tree_map_replace.call(null,comp,tree.left,k,v),tree.right);
} else
{if("\uFDD0'else")
{return tree.replace(tk__9318,tree.val,tree.left,tree_map_replace.call(null,comp,tree.right,k,v));
} else
{return null;
}
}
}
});

/**
* @constructor
*/
cljs.core.PersistentTreeMap = (function (comp,tree,cnt,meta,__hash){
this.comp = comp;
this.tree = tree;
this.cnt = cnt;
this.meta = meta;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 418776847;
})
cljs.core.PersistentTreeMap.cljs$lang$type = true;
cljs.core.PersistentTreeMap.cljs$lang$ctorPrSeq = (function (this__2315__auto__){
return cljs.core.list.call(null,"cljs.core/PersistentTreeMap");
});
cljs.core.PersistentTreeMap.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__9322 = this;
var h__2198__auto____9323 = this__9322.__hash;
if(!((h__2198__auto____9323 == null)))
{return h__2198__auto____9323;
} else
{var h__2198__auto____9324 = cljs.core.hash_imap.call(null,coll);
this__9322.__hash = h__2198__auto____9324;
return h__2198__auto____9324;
}
});
cljs.core.PersistentTreeMap.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (coll,k){
var this__9325 = this;
return coll.cljs$core$ILookup$_lookup$arity$3(coll,k,null);
});
cljs.core.PersistentTreeMap.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (coll,k,not_found){
var this__9326 = this;
var n__9327 = coll.entry_at(k);
if(!((n__9327 == null)))
{return n__9327.val;
} else
{return not_found;
}
});
cljs.core.PersistentTreeMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (coll,k,v){
var this__9328 = this;
var found__9329 = [null];
var t__9330 = cljs.core.tree_map_add.call(null,this__9328.comp,this__9328.tree,k,v,found__9329);
if((t__9330 == null))
{var found_node__9331 = cljs.core.nth.call(null,found__9329,0);
if(cljs.core._EQ_.call(null,v,found_node__9331.val))
{return coll;
} else
{return (new cljs.core.PersistentTreeMap(this__9328.comp,cljs.core.tree_map_replace.call(null,this__9328.comp,this__9328.tree,k,v),this__9328.cnt,this__9328.meta,null));
}
} else
{return (new cljs.core.PersistentTreeMap(this__9328.comp,t__9330.blacken(),(this__9328.cnt + 1),this__9328.meta,null));
}
});
cljs.core.PersistentTreeMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (coll,k){
var this__9332 = this;
return !((coll.entry_at(k) == null));
});
cljs.core.PersistentTreeMap.prototype.call = (function() {
var G__9366 = null;
var G__9366__2 = (function (this_sym9333,k){
var this__9335 = this;
var this_sym9333__9336 = this;
var coll__9337 = this_sym9333__9336;
return coll__9337.cljs$core$ILookup$_lookup$arity$2(coll__9337,k);
});
var G__9366__3 = (function (this_sym9334,k,not_found){
var this__9335 = this;
var this_sym9334__9338 = this;
var coll__9339 = this_sym9334__9338;
return coll__9339.cljs$core$ILookup$_lookup$arity$3(coll__9339,k,not_found);
});
G__9366 = function(this_sym9334,k,not_found){
switch(arguments.length){
case 2:
return G__9366__2.call(this,this_sym9334,k);
case 3:
return G__9366__3.call(this,this_sym9334,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__9366;
})()
;
cljs.core.PersistentTreeMap.prototype.apply = (function (this_sym9320,args9321){
var this__9340 = this;
return this_sym9320.call.apply(this_sym9320,[this_sym9320].concat(args9321.slice()));
});
cljs.core.PersistentTreeMap.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (coll,f,init){
var this__9341 = this;
if(!((this__9341.tree == null)))
{return cljs.core.tree_map_kv_reduce.call(null,this__9341.tree,f,init);
} else
{return init;
}
});
cljs.core.PersistentTreeMap.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,entry){
var this__9342 = this;
if(cljs.core.vector_QMARK_.call(null,entry))
{return coll.cljs$core$IAssociative$_assoc$arity$3(coll,cljs.core._nth.call(null,entry,0),cljs.core._nth.call(null,entry,1));
} else
{return cljs.core.reduce.call(null,cljs.core._conj,coll,entry);
}
});
cljs.core.PersistentTreeMap.prototype.cljs$core$IReversible$_rseq$arity$1 = (function (coll){
var this__9343 = this;
if((this__9343.cnt > 0))
{return cljs.core.create_tree_map_seq.call(null,this__9343.tree,false,this__9343.cnt);
} else
{return null;
}
});
cljs.core.PersistentTreeMap.prototype.toString = (function (){
var this__9344 = this;
var this__9345 = this;
return cljs.core.pr_str.call(null,this__9345);
});
cljs.core.PersistentTreeMap.prototype.entry_at = (function (k){
var this__9346 = this;
var coll__9347 = this;
var t__9348 = this__9346.tree;
while(true){
if(!((t__9348 == null)))
{var c__9349 = this__9346.comp.call(null,k,t__9348.key);
if((c__9349 === 0))
{return t__9348;
} else
{if((c__9349 < 0))
{{
var G__9367 = t__9348.left;
t__9348 = G__9367;
continue;
}
} else
{if("\uFDD0'else")
{{
var G__9368 = t__9348.right;
t__9348 = G__9368;
continue;
}
} else
{return null;
}
}
}
} else
{return null;
}
break;
}
});
cljs.core.PersistentTreeMap.prototype.cljs$core$ISorted$_sorted_seq$arity$2 = (function (coll,ascending_QMARK_){
var this__9350 = this;
if((this__9350.cnt > 0))
{return cljs.core.create_tree_map_seq.call(null,this__9350.tree,ascending_QMARK_,this__9350.cnt);
} else
{return null;
}
});
cljs.core.PersistentTreeMap.prototype.cljs$core$ISorted$_sorted_seq_from$arity$3 = (function (coll,k,ascending_QMARK_){
var this__9351 = this;
if((this__9351.cnt > 0))
{var stack__9352 = null;
var t__9353 = this__9351.tree;
while(true){
if(!((t__9353 == null)))
{var c__9354 = this__9351.comp.call(null,k,t__9353.key);
if((c__9354 === 0))
{return (new cljs.core.PersistentTreeMapSeq(null,cljs.core.conj.call(null,stack__9352,t__9353),ascending_QMARK_,-1,null));
} else
{if(cljs.core.truth_(ascending_QMARK_))
{if((c__9354 < 0))
{{
var G__9369 = cljs.core.conj.call(null,stack__9352,t__9353);
var G__9370 = t__9353.left;
stack__9352 = G__9369;
t__9353 = G__9370;
continue;
}
} else
{{
var G__9371 = stack__9352;
var G__9372 = t__9353.right;
stack__9352 = G__9371;
t__9353 = G__9372;
continue;
}
}
} else
{if("\uFDD0'else")
{if((c__9354 > 0))
{{
var G__9373 = cljs.core.conj.call(null,stack__9352,t__9353);
var G__9374 = t__9353.right;
stack__9352 = G__9373;
t__9353 = G__9374;
continue;
}
} else
{{
var G__9375 = stack__9352;
var G__9376 = t__9353.left;
stack__9352 = G__9375;
t__9353 = G__9376;
continue;
}
}
} else
{return null;
}
}
}
} else
{if((stack__9352 == null))
{return (new cljs.core.PersistentTreeMapSeq(null,stack__9352,ascending_QMARK_,-1,null));
} else
{return null;
}
}
break;
}
} else
{return null;
}
});
cljs.core.PersistentTreeMap.prototype.cljs$core$ISorted$_entry_key$arity$2 = (function (coll,entry){
var this__9355 = this;
return cljs.core.key.call(null,entry);
});
cljs.core.PersistentTreeMap.prototype.cljs$core$ISorted$_comparator$arity$1 = (function (coll){
var this__9356 = this;
return this__9356.comp;
});
cljs.core.PersistentTreeMap.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__9357 = this;
if((this__9357.cnt > 0))
{return cljs.core.create_tree_map_seq.call(null,this__9357.tree,true,this__9357.cnt);
} else
{return null;
}
});
cljs.core.PersistentTreeMap.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__9358 = this;
return this__9358.cnt;
});
cljs.core.PersistentTreeMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__9359 = this;
return cljs.core.equiv_map.call(null,coll,other);
});
cljs.core.PersistentTreeMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__9360 = this;
return (new cljs.core.PersistentTreeMap(this__9360.comp,this__9360.tree,this__9360.cnt,meta,this__9360.__hash));
});
cljs.core.PersistentTreeMap.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__9361 = this;
return this__9361.meta;
});
cljs.core.PersistentTreeMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__9362 = this;
return cljs.core.with_meta.call(null,cljs.core.PersistentTreeMap.EMPTY,this__9362.meta);
});
cljs.core.PersistentTreeMap.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (coll,k){
var this__9363 = this;
var found__9364 = [null];
var t__9365 = cljs.core.tree_map_remove.call(null,this__9363.comp,this__9363.tree,k,found__9364);
if((t__9365 == null))
{if((cljs.core.nth.call(null,found__9364,0) == null))
{return coll;
} else
{return (new cljs.core.PersistentTreeMap(this__9363.comp,null,0,this__9363.meta,null));
}
} else
{return (new cljs.core.PersistentTreeMap(this__9363.comp,t__9365.blacken(),(this__9363.cnt - 1),this__9363.meta,null));
}
});
cljs.core.PersistentTreeMap;
cljs.core.PersistentTreeMap.EMPTY = (new cljs.core.PersistentTreeMap(cljs.core.compare,null,0,null,0));
/**
* keyval => key val
* Returns a new hash map with supplied mappings.
* @param {...*} var_args
*/
cljs.core.hash_map = (function() { 
var hash_map__delegate = function (keyvals){
var in__9379 = cljs.core.seq.call(null,keyvals);
var out__9380 = cljs.core.transient$.call(null,cljs.core.PersistentHashMap.EMPTY);
while(true){
if(in__9379)
{{
var G__9381 = cljs.core.nnext.call(null,in__9379);
var G__9382 = cljs.core.assoc_BANG_.call(null,out__9380,cljs.core.first.call(null,in__9379),cljs.core.second.call(null,in__9379));
in__9379 = G__9381;
out__9380 = G__9382;
continue;
}
} else
{return cljs.core.persistent_BANG_.call(null,out__9380);
}
break;
}
};
var hash_map = function (var_args){
var keyvals = null;
if (goog.isDef(var_args)) {
  keyvals = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return hash_map__delegate.call(this, keyvals);
};
hash_map.cljs$lang$maxFixedArity = 0;
hash_map.cljs$lang$applyTo = (function (arglist__9383){
var keyvals = cljs.core.seq(arglist__9383);;
return hash_map__delegate(keyvals);
});
hash_map.cljs$lang$arity$variadic = hash_map__delegate;
return hash_map;
})()
;
/**
* keyval => key val
* Returns a new array map with supplied mappings.
* @param {...*} var_args
*/
cljs.core.array_map = (function() { 
var array_map__delegate = function (keyvals){
return (new cljs.core.PersistentArrayMap(null,cljs.core.quot.call(null,cljs.core.count.call(null,keyvals),2),cljs.core.apply.call(null,cljs.core.array,keyvals),null));
};
var array_map = function (var_args){
var keyvals = null;
if (goog.isDef(var_args)) {
  keyvals = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return array_map__delegate.call(this, keyvals);
};
array_map.cljs$lang$maxFixedArity = 0;
array_map.cljs$lang$applyTo = (function (arglist__9384){
var keyvals = cljs.core.seq(arglist__9384);;
return array_map__delegate(keyvals);
});
array_map.cljs$lang$arity$variadic = array_map__delegate;
return array_map;
})()
;
/**
* keyval => key val
* Returns a new object map with supplied mappings.
* @param {...*} var_args
*/
cljs.core.obj_map = (function() { 
var obj_map__delegate = function (keyvals){
var ks__9388 = [];
var obj__9389 = {};
var kvs__9390 = cljs.core.seq.call(null,keyvals);
while(true){
if(kvs__9390)
{ks__9388.push(cljs.core.first.call(null,kvs__9390));
(obj__9389[cljs.core.first.call(null,kvs__9390)] = cljs.core.second.call(null,kvs__9390));
{
var G__9391 = cljs.core.nnext.call(null,kvs__9390);
kvs__9390 = G__9391;
continue;
}
} else
{return cljs.core.ObjMap.fromObject.call(null,ks__9388,obj__9389);
}
break;
}
};
var obj_map = function (var_args){
var keyvals = null;
if (goog.isDef(var_args)) {
  keyvals = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return obj_map__delegate.call(this, keyvals);
};
obj_map.cljs$lang$maxFixedArity = 0;
obj_map.cljs$lang$applyTo = (function (arglist__9392){
var keyvals = cljs.core.seq(arglist__9392);;
return obj_map__delegate(keyvals);
});
obj_map.cljs$lang$arity$variadic = obj_map__delegate;
return obj_map;
})()
;
/**
* keyval => key val
* Returns a new sorted map with supplied mappings.
* @param {...*} var_args
*/
cljs.core.sorted_map = (function() { 
var sorted_map__delegate = function (keyvals){
var in__9395 = cljs.core.seq.call(null,keyvals);
var out__9396 = cljs.core.PersistentTreeMap.EMPTY;
while(true){
if(in__9395)
{{
var G__9397 = cljs.core.nnext.call(null,in__9395);
var G__9398 = cljs.core.assoc.call(null,out__9396,cljs.core.first.call(null,in__9395),cljs.core.second.call(null,in__9395));
in__9395 = G__9397;
out__9396 = G__9398;
continue;
}
} else
{return out__9396;
}
break;
}
};
var sorted_map = function (var_args){
var keyvals = null;
if (goog.isDef(var_args)) {
  keyvals = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return sorted_map__delegate.call(this, keyvals);
};
sorted_map.cljs$lang$maxFixedArity = 0;
sorted_map.cljs$lang$applyTo = (function (arglist__9399){
var keyvals = cljs.core.seq(arglist__9399);;
return sorted_map__delegate(keyvals);
});
sorted_map.cljs$lang$arity$variadic = sorted_map__delegate;
return sorted_map;
})()
;
/**
* keyval => key val
* Returns a new sorted map with supplied mappings, using the supplied comparator.
* @param {...*} var_args
*/
cljs.core.sorted_map_by = (function() { 
var sorted_map_by__delegate = function (comparator,keyvals){
var in__9402 = cljs.core.seq.call(null,keyvals);
var out__9403 = (new cljs.core.PersistentTreeMap(comparator,null,0,null,0));
while(true){
if(in__9402)
{{
var G__9404 = cljs.core.nnext.call(null,in__9402);
var G__9405 = cljs.core.assoc.call(null,out__9403,cljs.core.first.call(null,in__9402),cljs.core.second.call(null,in__9402));
in__9402 = G__9404;
out__9403 = G__9405;
continue;
}
} else
{return out__9403;
}
break;
}
};
var sorted_map_by = function (comparator,var_args){
var keyvals = null;
if (goog.isDef(var_args)) {
  keyvals = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return sorted_map_by__delegate.call(this, comparator, keyvals);
};
sorted_map_by.cljs$lang$maxFixedArity = 1;
sorted_map_by.cljs$lang$applyTo = (function (arglist__9406){
var comparator = cljs.core.first(arglist__9406);
var keyvals = cljs.core.rest(arglist__9406);
return sorted_map_by__delegate(comparator, keyvals);
});
sorted_map_by.cljs$lang$arity$variadic = sorted_map_by__delegate;
return sorted_map_by;
})()
;
/**
* Returns a sequence of the map's keys.
*/
cljs.core.keys = (function keys(hash_map){
return cljs.core.seq.call(null,cljs.core.map.call(null,cljs.core.first,hash_map));
});
/**
* Returns the key of the map entry.
*/
cljs.core.key = (function key(map_entry){
return cljs.core._key.call(null,map_entry);
});
/**
* Returns a sequence of the map's values.
*/
cljs.core.vals = (function vals(hash_map){
return cljs.core.seq.call(null,cljs.core.map.call(null,cljs.core.second,hash_map));
});
/**
* Returns the value in the map entry.
*/
cljs.core.val = (function val(map_entry){
return cljs.core._val.call(null,map_entry);
});
/**
* Returns a map that consists of the rest of the maps conj-ed onto
* the first.  If a key occurs in more than one map, the mapping from
* the latter (left-to-right) will be the mapping in the result.
* @param {...*} var_args
*/
cljs.core.merge = (function() { 
var merge__delegate = function (maps){
if(cljs.core.truth_(cljs.core.some.call(null,cljs.core.identity,maps)))
{return cljs.core.reduce.call(null,(function (p1__9407_SHARP_,p2__9408_SHARP_){
return cljs.core.conj.call(null,(function (){var or__3824__auto____9410 = p1__9407_SHARP_;
if(cljs.core.truth_(or__3824__auto____9410))
{return or__3824__auto____9410;
} else
{return cljs.core.ObjMap.EMPTY;
}
})(),p2__9408_SHARP_);
}),maps);
} else
{return null;
}
};
var merge = function (var_args){
var maps = null;
if (goog.isDef(var_args)) {
  maps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return merge__delegate.call(this, maps);
};
merge.cljs$lang$maxFixedArity = 0;
merge.cljs$lang$applyTo = (function (arglist__9411){
var maps = cljs.core.seq(arglist__9411);;
return merge__delegate(maps);
});
merge.cljs$lang$arity$variadic = merge__delegate;
return merge;
})()
;
/**
* Returns a map that consists of the rest of the maps conj-ed onto
* the first.  If a key occurs in more than one map, the mapping(s)
* from the latter (left-to-right) will be combined with the mapping in
* the result by calling (f val-in-result val-in-latter).
* @param {...*} var_args
*/
cljs.core.merge_with = (function() { 
var merge_with__delegate = function (f,maps){
if(cljs.core.truth_(cljs.core.some.call(null,cljs.core.identity,maps)))
{var merge_entry__9419 = (function (m,e){
var k__9417 = cljs.core.first.call(null,e);
var v__9418 = cljs.core.second.call(null,e);
if(cljs.core.contains_QMARK_.call(null,m,k__9417))
{return cljs.core.assoc.call(null,m,k__9417,f.call(null,cljs.core._lookup.call(null,m,k__9417,null),v__9418));
} else
{return cljs.core.assoc.call(null,m,k__9417,v__9418);
}
});
var merge2__9421 = (function (m1,m2){
return cljs.core.reduce.call(null,merge_entry__9419,(function (){var or__3824__auto____9420 = m1;
if(cljs.core.truth_(or__3824__auto____9420))
{return or__3824__auto____9420;
} else
{return cljs.core.ObjMap.EMPTY;
}
})(),cljs.core.seq.call(null,m2));
});
return cljs.core.reduce.call(null,merge2__9421,maps);
} else
{return null;
}
};
var merge_with = function (f,var_args){
var maps = null;
if (goog.isDef(var_args)) {
  maps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return merge_with__delegate.call(this, f, maps);
};
merge_with.cljs$lang$maxFixedArity = 1;
merge_with.cljs$lang$applyTo = (function (arglist__9422){
var f = cljs.core.first(arglist__9422);
var maps = cljs.core.rest(arglist__9422);
return merge_with__delegate(f, maps);
});
merge_with.cljs$lang$arity$variadic = merge_with__delegate;
return merge_with;
})()
;
/**
* Returns a map containing only those entries in map whose key is in keys
*/
cljs.core.select_keys = (function select_keys(map,keyseq){
var ret__9427 = cljs.core.ObjMap.EMPTY;
var keys__9428 = cljs.core.seq.call(null,keyseq);
while(true){
if(keys__9428)
{var key__9429 = cljs.core.first.call(null,keys__9428);
var entry__9430 = cljs.core._lookup.call(null,map,key__9429,"\uFDD0'cljs.core/not-found");
{
var G__9431 = ((cljs.core.not_EQ_.call(null,entry__9430,"\uFDD0'cljs.core/not-found"))?cljs.core.assoc.call(null,ret__9427,key__9429,entry__9430):ret__9427);
var G__9432 = cljs.core.next.call(null,keys__9428);
ret__9427 = G__9431;
keys__9428 = G__9432;
continue;
}
} else
{return ret__9427;
}
break;
}
});

/**
* @constructor
*/
cljs.core.PersistentHashSet = (function (meta,hash_map,__hash){
this.meta = meta;
this.hash_map = hash_map;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 1;
this.cljs$lang$protocol_mask$partition0$ = 15077647;
})
cljs.core.PersistentHashSet.cljs$lang$type = true;
cljs.core.PersistentHashSet.cljs$lang$ctorPrSeq = (function (this__2315__auto__){
return cljs.core.list.call(null,"cljs.core/PersistentHashSet");
});
cljs.core.PersistentHashSet.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = (function (coll){
var this__9436 = this;
return (new cljs.core.TransientHashSet(cljs.core.transient$.call(null,this__9436.hash_map)));
});
cljs.core.PersistentHashSet.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__9437 = this;
var h__2198__auto____9438 = this__9437.__hash;
if(!((h__2198__auto____9438 == null)))
{return h__2198__auto____9438;
} else
{var h__2198__auto____9439 = cljs.core.hash_iset.call(null,coll);
this__9437.__hash = h__2198__auto____9439;
return h__2198__auto____9439;
}
});
cljs.core.PersistentHashSet.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (coll,v){
var this__9440 = this;
return coll.cljs$core$ILookup$_lookup$arity$3(coll,v,null);
});
cljs.core.PersistentHashSet.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (coll,v,not_found){
var this__9441 = this;
if(cljs.core.truth_(cljs.core._contains_key_QMARK_.call(null,this__9441.hash_map,v)))
{return v;
} else
{return not_found;
}
});
cljs.core.PersistentHashSet.prototype.call = (function() {
var G__9462 = null;
var G__9462__2 = (function (this_sym9442,k){
var this__9444 = this;
var this_sym9442__9445 = this;
var coll__9446 = this_sym9442__9445;
return coll__9446.cljs$core$ILookup$_lookup$arity$2(coll__9446,k);
});
var G__9462__3 = (function (this_sym9443,k,not_found){
var this__9444 = this;
var this_sym9443__9447 = this;
var coll__9448 = this_sym9443__9447;
return coll__9448.cljs$core$ILookup$_lookup$arity$3(coll__9448,k,not_found);
});
G__9462 = function(this_sym9443,k,not_found){
switch(arguments.length){
case 2:
return G__9462__2.call(this,this_sym9443,k);
case 3:
return G__9462__3.call(this,this_sym9443,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__9462;
})()
;
cljs.core.PersistentHashSet.prototype.apply = (function (this_sym9434,args9435){
var this__9449 = this;
return this_sym9434.call.apply(this_sym9434,[this_sym9434].concat(args9435.slice()));
});
cljs.core.PersistentHashSet.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__9450 = this;
return (new cljs.core.PersistentHashSet(this__9450.meta,cljs.core.assoc.call(null,this__9450.hash_map,o,null),null));
});
cljs.core.PersistentHashSet.prototype.toString = (function (){
var this__9451 = this;
var this__9452 = this;
return cljs.core.pr_str.call(null,this__9452);
});
cljs.core.PersistentHashSet.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__9453 = this;
return cljs.core.keys.call(null,this__9453.hash_map);
});
cljs.core.PersistentHashSet.prototype.cljs$core$ISet$_disjoin$arity$2 = (function (coll,v){
var this__9454 = this;
return (new cljs.core.PersistentHashSet(this__9454.meta,cljs.core.dissoc.call(null,this__9454.hash_map,v),null));
});
cljs.core.PersistentHashSet.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__9455 = this;
return cljs.core.count.call(null,cljs.core.seq.call(null,coll));
});
cljs.core.PersistentHashSet.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__9456 = this;
var and__3822__auto____9457 = cljs.core.set_QMARK_.call(null,other);
if(and__3822__auto____9457)
{var and__3822__auto____9458 = (cljs.core.count.call(null,coll) === cljs.core.count.call(null,other));
if(and__3822__auto____9458)
{return cljs.core.every_QMARK_.call(null,(function (p1__9433_SHARP_){
return cljs.core.contains_QMARK_.call(null,coll,p1__9433_SHARP_);
}),other);
} else
{return and__3822__auto____9458;
}
} else
{return and__3822__auto____9457;
}
});
cljs.core.PersistentHashSet.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__9459 = this;
return (new cljs.core.PersistentHashSet(meta,this__9459.hash_map,this__9459.__hash));
});
cljs.core.PersistentHashSet.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__9460 = this;
return this__9460.meta;
});
cljs.core.PersistentHashSet.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__9461 = this;
return cljs.core.with_meta.call(null,cljs.core.PersistentHashSet.EMPTY,this__9461.meta);
});
cljs.core.PersistentHashSet;
cljs.core.PersistentHashSet.EMPTY = (new cljs.core.PersistentHashSet(null,cljs.core.hash_map.call(null),0));
cljs.core.PersistentHashSet.fromArray = (function (items){
var len__9463 = cljs.core.count.call(null,items);
var i__9464 = 0;
var out__9465 = cljs.core.transient$.call(null,cljs.core.PersistentHashSet.EMPTY);
while(true){
if((i__9464 < len__9463))
{{
var G__9466 = (i__9464 + 1);
var G__9467 = cljs.core.conj_BANG_.call(null,out__9465,(items[i__9464]));
i__9464 = G__9466;
out__9465 = G__9467;
continue;
}
} else
{return cljs.core.persistent_BANG_.call(null,out__9465);
}
break;
}
});

/**
* @constructor
*/
cljs.core.TransientHashSet = (function (transient_map){
this.transient_map = transient_map;
this.cljs$lang$protocol_mask$partition0$ = 259;
this.cljs$lang$protocol_mask$partition1$ = 34;
})
cljs.core.TransientHashSet.cljs$lang$type = true;
cljs.core.TransientHashSet.cljs$lang$ctorPrSeq = (function (this__2315__auto__){
return cljs.core.list.call(null,"cljs.core/TransientHashSet");
});
cljs.core.TransientHashSet.prototype.call = (function() {
var G__9485 = null;
var G__9485__2 = (function (this_sym9471,k){
var this__9473 = this;
var this_sym9471__9474 = this;
var tcoll__9475 = this_sym9471__9474;
if((cljs.core._lookup.call(null,this__9473.transient_map,k,cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel))
{return null;
} else
{return k;
}
});
var G__9485__3 = (function (this_sym9472,k,not_found){
var this__9473 = this;
var this_sym9472__9476 = this;
var tcoll__9477 = this_sym9472__9476;
if((cljs.core._lookup.call(null,this__9473.transient_map,k,cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel))
{return not_found;
} else
{return k;
}
});
G__9485 = function(this_sym9472,k,not_found){
switch(arguments.length){
case 2:
return G__9485__2.call(this,this_sym9472,k);
case 3:
return G__9485__3.call(this,this_sym9472,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__9485;
})()
;
cljs.core.TransientHashSet.prototype.apply = (function (this_sym9469,args9470){
var this__9478 = this;
return this_sym9469.call.apply(this_sym9469,[this_sym9469].concat(args9470.slice()));
});
cljs.core.TransientHashSet.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (tcoll,v){
var this__9479 = this;
return tcoll.cljs$core$ILookup$_lookup$arity$3(tcoll,v,null);
});
cljs.core.TransientHashSet.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (tcoll,v,not_found){
var this__9480 = this;
if((cljs.core._lookup.call(null,this__9480.transient_map,v,cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel))
{return not_found;
} else
{return v;
}
});
cljs.core.TransientHashSet.prototype.cljs$core$ICounted$_count$arity$1 = (function (tcoll){
var this__9481 = this;
return cljs.core.count.call(null,this__9481.transient_map);
});
cljs.core.TransientHashSet.prototype.cljs$core$ITransientSet$_disjoin_BANG_$arity$2 = (function (tcoll,v){
var this__9482 = this;
this__9482.transient_map = cljs.core.dissoc_BANG_.call(null,this__9482.transient_map,v);
return tcoll;
});
cljs.core.TransientHashSet.prototype.cljs$core$ITransientCollection$_conj_BANG_$arity$2 = (function (tcoll,o){
var this__9483 = this;
this__9483.transient_map = cljs.core.assoc_BANG_.call(null,this__9483.transient_map,o,null);
return tcoll;
});
cljs.core.TransientHashSet.prototype.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 = (function (tcoll){
var this__9484 = this;
return (new cljs.core.PersistentHashSet(null,cljs.core.persistent_BANG_.call(null,this__9484.transient_map),null));
});
cljs.core.TransientHashSet;

/**
* @constructor
*/
cljs.core.PersistentTreeSet = (function (meta,tree_map,__hash){
this.meta = meta;
this.tree_map = tree_map;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 417730831;
})
cljs.core.PersistentTreeSet.cljs$lang$type = true;
cljs.core.PersistentTreeSet.cljs$lang$ctorPrSeq = (function (this__2315__auto__){
return cljs.core.list.call(null,"cljs.core/PersistentTreeSet");
});
cljs.core.PersistentTreeSet.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__9488 = this;
var h__2198__auto____9489 = this__9488.__hash;
if(!((h__2198__auto____9489 == null)))
{return h__2198__auto____9489;
} else
{var h__2198__auto____9490 = cljs.core.hash_iset.call(null,coll);
this__9488.__hash = h__2198__auto____9490;
return h__2198__auto____9490;
}
});
cljs.core.PersistentTreeSet.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (coll,v){
var this__9491 = this;
return coll.cljs$core$ILookup$_lookup$arity$3(coll,v,null);
});
cljs.core.PersistentTreeSet.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (coll,v,not_found){
var this__9492 = this;
if(cljs.core.truth_(cljs.core._contains_key_QMARK_.call(null,this__9492.tree_map,v)))
{return v;
} else
{return not_found;
}
});
cljs.core.PersistentTreeSet.prototype.call = (function() {
var G__9518 = null;
var G__9518__2 = (function (this_sym9493,k){
var this__9495 = this;
var this_sym9493__9496 = this;
var coll__9497 = this_sym9493__9496;
return coll__9497.cljs$core$ILookup$_lookup$arity$2(coll__9497,k);
});
var G__9518__3 = (function (this_sym9494,k,not_found){
var this__9495 = this;
var this_sym9494__9498 = this;
var coll__9499 = this_sym9494__9498;
return coll__9499.cljs$core$ILookup$_lookup$arity$3(coll__9499,k,not_found);
});
G__9518 = function(this_sym9494,k,not_found){
switch(arguments.length){
case 2:
return G__9518__2.call(this,this_sym9494,k);
case 3:
return G__9518__3.call(this,this_sym9494,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__9518;
})()
;
cljs.core.PersistentTreeSet.prototype.apply = (function (this_sym9486,args9487){
var this__9500 = this;
return this_sym9486.call.apply(this_sym9486,[this_sym9486].concat(args9487.slice()));
});
cljs.core.PersistentTreeSet.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__9501 = this;
return (new cljs.core.PersistentTreeSet(this__9501.meta,cljs.core.assoc.call(null,this__9501.tree_map,o,null),null));
});
cljs.core.PersistentTreeSet.prototype.cljs$core$IReversible$_rseq$arity$1 = (function (coll){
var this__9502 = this;
return cljs.core.map.call(null,cljs.core.key,cljs.core.rseq.call(null,this__9502.tree_map));
});
cljs.core.PersistentTreeSet.prototype.toString = (function (){
var this__9503 = this;
var this__9504 = this;
return cljs.core.pr_str.call(null,this__9504);
});
cljs.core.PersistentTreeSet.prototype.cljs$core$ISorted$_sorted_seq$arity$2 = (function (coll,ascending_QMARK_){
var this__9505 = this;
return cljs.core.map.call(null,cljs.core.key,cljs.core._sorted_seq.call(null,this__9505.tree_map,ascending_QMARK_));
});
cljs.core.PersistentTreeSet.prototype.cljs$core$ISorted$_sorted_seq_from$arity$3 = (function (coll,k,ascending_QMARK_){
var this__9506 = this;
return cljs.core.map.call(null,cljs.core.key,cljs.core._sorted_seq_from.call(null,this__9506.tree_map,k,ascending_QMARK_));
});
cljs.core.PersistentTreeSet.prototype.cljs$core$ISorted$_entry_key$arity$2 = (function (coll,entry){
var this__9507 = this;
return entry;
});
cljs.core.PersistentTreeSet.prototype.cljs$core$ISorted$_comparator$arity$1 = (function (coll){
var this__9508 = this;
return cljs.core._comparator.call(null,this__9508.tree_map);
});
cljs.core.PersistentTreeSet.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__9509 = this;
return cljs.core.keys.call(null,this__9509.tree_map);
});
cljs.core.PersistentTreeSet.prototype.cljs$core$ISet$_disjoin$arity$2 = (function (coll,v){
var this__9510 = this;
return (new cljs.core.PersistentTreeSet(this__9510.meta,cljs.core.dissoc.call(null,this__9510.tree_map,v),null));
});
cljs.core.PersistentTreeSet.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__9511 = this;
return cljs.core.count.call(null,this__9511.tree_map);
});
cljs.core.PersistentTreeSet.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__9512 = this;
var and__3822__auto____9513 = cljs.core.set_QMARK_.call(null,other);
if(and__3822__auto____9513)
{var and__3822__auto____9514 = (cljs.core.count.call(null,coll) === cljs.core.count.call(null,other));
if(and__3822__auto____9514)
{return cljs.core.every_QMARK_.call(null,(function (p1__9468_SHARP_){
return cljs.core.contains_QMARK_.call(null,coll,p1__9468_SHARP_);
}),other);
} else
{return and__3822__auto____9514;
}
} else
{return and__3822__auto____9513;
}
});
cljs.core.PersistentTreeSet.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__9515 = this;
return (new cljs.core.PersistentTreeSet(meta,this__9515.tree_map,this__9515.__hash));
});
cljs.core.PersistentTreeSet.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__9516 = this;
return this__9516.meta;
});
cljs.core.PersistentTreeSet.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__9517 = this;
return cljs.core.with_meta.call(null,cljs.core.PersistentTreeSet.EMPTY,this__9517.meta);
});
cljs.core.PersistentTreeSet;
cljs.core.PersistentTreeSet.EMPTY = (new cljs.core.PersistentTreeSet(null,cljs.core.sorted_map.call(null),0));
/**
* @param {...*} var_args
*/
cljs.core.hash_set = (function() {
var hash_set = null;
var hash_set__0 = (function (){
return cljs.core.PersistentHashSet.EMPTY;
});
var hash_set__1 = (function() { 
var G__9523__delegate = function (keys){
var in__9521 = cljs.core.seq.call(null,keys);
var out__9522 = cljs.core.transient$.call(null,cljs.core.PersistentHashSet.EMPTY);
while(true){
if(cljs.core.seq.call(null,in__9521))
{{
var G__9524 = cljs.core.next.call(null,in__9521);
var G__9525 = cljs.core.conj_BANG_.call(null,out__9522,cljs.core.first.call(null,in__9521));
in__9521 = G__9524;
out__9522 = G__9525;
continue;
}
} else
{return cljs.core.persistent_BANG_.call(null,out__9522);
}
break;
}
};
var G__9523 = function (var_args){
var keys = null;
if (goog.isDef(var_args)) {
  keys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__9523__delegate.call(this, keys);
};
G__9523.cljs$lang$maxFixedArity = 0;
G__9523.cljs$lang$applyTo = (function (arglist__9526){
var keys = cljs.core.seq(arglist__9526);;
return G__9523__delegate(keys);
});
G__9523.cljs$lang$arity$variadic = G__9523__delegate;
return G__9523;
})()
;
hash_set = function(var_args){
var keys = var_args;
switch(arguments.length){
case 0:
return hash_set__0.call(this);
default:
return hash_set__1.cljs$lang$arity$variadic(cljs.core.array_seq(arguments, 0));
}
throw('Invalid arity: ' + arguments.length);
};
hash_set.cljs$lang$maxFixedArity = 0;
hash_set.cljs$lang$applyTo = hash_set__1.cljs$lang$applyTo;
hash_set.cljs$lang$arity$0 = hash_set__0;
hash_set.cljs$lang$arity$variadic = hash_set__1.cljs$lang$arity$variadic;
return hash_set;
})()
;
/**
* Returns a set of the distinct elements of coll.
*/
cljs.core.set = (function set(coll){
return cljs.core.apply.call(null,cljs.core.hash_set,coll);
});
/**
* Returns a new sorted set with supplied keys.
* @param {...*} var_args
*/
cljs.core.sorted_set = (function() { 
var sorted_set__delegate = function (keys){
return cljs.core.reduce.call(null,cljs.core._conj,cljs.core.PersistentTreeSet.EMPTY,keys);
};
var sorted_set = function (var_args){
var keys = null;
if (goog.isDef(var_args)) {
  keys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return sorted_set__delegate.call(this, keys);
};
sorted_set.cljs$lang$maxFixedArity = 0;
sorted_set.cljs$lang$applyTo = (function (arglist__9527){
var keys = cljs.core.seq(arglist__9527);;
return sorted_set__delegate(keys);
});
sorted_set.cljs$lang$arity$variadic = sorted_set__delegate;
return sorted_set;
})()
;
/**
* Returns a new sorted set with supplied keys, using the supplied comparator.
* @param {...*} var_args
*/
cljs.core.sorted_set_by = (function() { 
var sorted_set_by__delegate = function (comparator,keys){
return cljs.core.reduce.call(null,cljs.core._conj,(new cljs.core.PersistentTreeSet(null,cljs.core.sorted_map_by.call(null,comparator),0)),keys);
};
var sorted_set_by = function (comparator,var_args){
var keys = null;
if (goog.isDef(var_args)) {
  keys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return sorted_set_by__delegate.call(this, comparator, keys);
};
sorted_set_by.cljs$lang$maxFixedArity = 1;
sorted_set_by.cljs$lang$applyTo = (function (arglist__9529){
var comparator = cljs.core.first(arglist__9529);
var keys = cljs.core.rest(arglist__9529);
return sorted_set_by__delegate(comparator, keys);
});
sorted_set_by.cljs$lang$arity$variadic = sorted_set_by__delegate;
return sorted_set_by;
})()
;
/**
* Given a map of replacement pairs and a vector/collection, returns a
* vector/seq with any elements = a key in smap replaced with the
* corresponding val in smap
*/
cljs.core.replace = (function replace(smap,coll){
if(cljs.core.vector_QMARK_.call(null,coll))
{var n__9535 = cljs.core.count.call(null,coll);
return cljs.core.reduce.call(null,(function (v,i){
var temp__3971__auto____9536 = cljs.core.find.call(null,smap,cljs.core.nth.call(null,v,i));
if(cljs.core.truth_(temp__3971__auto____9536))
{var e__9537 = temp__3971__auto____9536;
return cljs.core.assoc.call(null,v,i,cljs.core.second.call(null,e__9537));
} else
{return v;
}
}),coll,cljs.core.take.call(null,n__9535,cljs.core.iterate.call(null,cljs.core.inc,0)));
} else
{return cljs.core.map.call(null,(function (p1__9528_SHARP_){
var temp__3971__auto____9538 = cljs.core.find.call(null,smap,p1__9528_SHARP_);
if(cljs.core.truth_(temp__3971__auto____9538))
{var e__9539 = temp__3971__auto____9538;
return cljs.core.second.call(null,e__9539);
} else
{return p1__9528_SHARP_;
}
}),coll);
}
});
/**
* Returns a lazy sequence of the elements of coll with duplicates removed
*/
cljs.core.distinct = (function distinct(coll){
var step__9569 = (function step(xs,seen){
return (new cljs.core.LazySeq(null,false,(function (){
return (function (p__9562,seen){
while(true){
var vec__9563__9564 = p__9562;
var f__9565 = cljs.core.nth.call(null,vec__9563__9564,0,null);
var xs__9566 = vec__9563__9564;
var temp__3974__auto____9567 = cljs.core.seq.call(null,xs__9566);
if(temp__3974__auto____9567)
{var s__9568 = temp__3974__auto____9567;
if(cljs.core.contains_QMARK_.call(null,seen,f__9565))
{{
var G__9570 = cljs.core.rest.call(null,s__9568);
var G__9571 = seen;
p__9562 = G__9570;
seen = G__9571;
continue;
}
} else
{return cljs.core.cons.call(null,f__9565,step.call(null,cljs.core.rest.call(null,s__9568),cljs.core.conj.call(null,seen,f__9565)));
}
} else
{return null;
}
break;
}
}).call(null,xs,seen);
}),null));
});
return step__9569.call(null,coll,cljs.core.PersistentHashSet.EMPTY);
});
cljs.core.butlast = (function butlast(s){
var ret__9574 = cljs.core.PersistentVector.EMPTY;
var s__9575 = s;
while(true){
if(cljs.core.next.call(null,s__9575))
{{
var G__9576 = cljs.core.conj.call(null,ret__9574,cljs.core.first.call(null,s__9575));
var G__9577 = cljs.core.next.call(null,s__9575);
ret__9574 = G__9576;
s__9575 = G__9577;
continue;
}
} else
{return cljs.core.seq.call(null,ret__9574);
}
break;
}
});
/**
* Returns the name String of a string, symbol or keyword.
*/
cljs.core.name = (function name(x){
if(cljs.core.string_QMARK_.call(null,x))
{return x;
} else
{if((function (){var or__3824__auto____9580 = cljs.core.keyword_QMARK_.call(null,x);
if(or__3824__auto____9580)
{return or__3824__auto____9580;
} else
{return cljs.core.symbol_QMARK_.call(null,x);
}
})())
{var i__9581 = x.lastIndexOf("/");
if((i__9581 < 0))
{return cljs.core.subs.call(null,x,2);
} else
{return cljs.core.subs.call(null,x,(i__9581 + 1));
}
} else
{if("\uFDD0'else")
{throw (new Error([cljs.core.str("Doesn't support name: "),cljs.core.str(x)].join('')));
} else
{return null;
}
}
}
});
/**
* Returns the namespace String of a symbol or keyword, or nil if not present.
*/
cljs.core.namespace = (function namespace(x){
if((function (){var or__3824__auto____9584 = cljs.core.keyword_QMARK_.call(null,x);
if(or__3824__auto____9584)
{return or__3824__auto____9584;
} else
{return cljs.core.symbol_QMARK_.call(null,x);
}
})())
{var i__9585 = x.lastIndexOf("/");
if((i__9585 > -1))
{return cljs.core.subs.call(null,x,2,i__9585);
} else
{return null;
}
} else
{throw (new Error([cljs.core.str("Doesn't support namespace: "),cljs.core.str(x)].join('')));
}
});
/**
* Returns a map with the keys mapped to the corresponding vals.
*/
cljs.core.zipmap = (function zipmap(keys,vals){
var map__9592 = cljs.core.ObjMap.EMPTY;
var ks__9593 = cljs.core.seq.call(null,keys);
var vs__9594 = cljs.core.seq.call(null,vals);
while(true){
if((function (){var and__3822__auto____9595 = ks__9593;
if(and__3822__auto____9595)
{return vs__9594;
} else
{return and__3822__auto____9595;
}
})())
{{
var G__9596 = cljs.core.assoc.call(null,map__9592,cljs.core.first.call(null,ks__9593),cljs.core.first.call(null,vs__9594));
var G__9597 = cljs.core.next.call(null,ks__9593);
var G__9598 = cljs.core.next.call(null,vs__9594);
map__9592 = G__9596;
ks__9593 = G__9597;
vs__9594 = G__9598;
continue;
}
} else
{return map__9592;
}
break;
}
});
/**
* Returns the x for which (k x), a number, is greatest.
* @param {...*} var_args
*/
cljs.core.max_key = (function() {
var max_key = null;
var max_key__2 = (function (k,x){
return x;
});
var max_key__3 = (function (k,x,y){
if((k.call(null,x) > k.call(null,y)))
{return x;
} else
{return y;
}
});
var max_key__4 = (function() { 
var G__9601__delegate = function (k,x,y,more){
return cljs.core.reduce.call(null,(function (p1__9586_SHARP_,p2__9587_SHARP_){
return max_key.call(null,k,p1__9586_SHARP_,p2__9587_SHARP_);
}),max_key.call(null,k,x,y),more);
};
var G__9601 = function (k,x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__9601__delegate.call(this, k, x, y, more);
};
G__9601.cljs$lang$maxFixedArity = 3;
G__9601.cljs$lang$applyTo = (function (arglist__9602){
var k = cljs.core.first(arglist__9602);
var x = cljs.core.first(cljs.core.next(arglist__9602));
var y = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9602)));
var more = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9602)));
return G__9601__delegate(k, x, y, more);
});
G__9601.cljs$lang$arity$variadic = G__9601__delegate;
return G__9601;
})()
;
max_key = function(k,x,y,var_args){
var more = var_args;
switch(arguments.length){
case 2:
return max_key__2.call(this,k,x);
case 3:
return max_key__3.call(this,k,x,y);
default:
return max_key__4.cljs$lang$arity$variadic(k,x,y, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
max_key.cljs$lang$maxFixedArity = 3;
max_key.cljs$lang$applyTo = max_key__4.cljs$lang$applyTo;
max_key.cljs$lang$arity$2 = max_key__2;
max_key.cljs$lang$arity$3 = max_key__3;
max_key.cljs$lang$arity$variadic = max_key__4.cljs$lang$arity$variadic;
return max_key;
})()
;
/**
* Returns the x for which (k x), a number, is least.
* @param {...*} var_args
*/
cljs.core.min_key = (function() {
var min_key = null;
var min_key__2 = (function (k,x){
return x;
});
var min_key__3 = (function (k,x,y){
if((k.call(null,x) < k.call(null,y)))
{return x;
} else
{return y;
}
});
var min_key__4 = (function() { 
var G__9603__delegate = function (k,x,y,more){
return cljs.core.reduce.call(null,(function (p1__9599_SHARP_,p2__9600_SHARP_){
return min_key.call(null,k,p1__9599_SHARP_,p2__9600_SHARP_);
}),min_key.call(null,k,x,y),more);
};
var G__9603 = function (k,x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__9603__delegate.call(this, k, x, y, more);
};
G__9603.cljs$lang$maxFixedArity = 3;
G__9603.cljs$lang$applyTo = (function (arglist__9604){
var k = cljs.core.first(arglist__9604);
var x = cljs.core.first(cljs.core.next(arglist__9604));
var y = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9604)));
var more = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9604)));
return G__9603__delegate(k, x, y, more);
});
G__9603.cljs$lang$arity$variadic = G__9603__delegate;
return G__9603;
})()
;
min_key = function(k,x,y,var_args){
var more = var_args;
switch(arguments.length){
case 2:
return min_key__2.call(this,k,x);
case 3:
return min_key__3.call(this,k,x,y);
default:
return min_key__4.cljs$lang$arity$variadic(k,x,y, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
min_key.cljs$lang$maxFixedArity = 3;
min_key.cljs$lang$applyTo = min_key__4.cljs$lang$applyTo;
min_key.cljs$lang$arity$2 = min_key__2;
min_key.cljs$lang$arity$3 = min_key__3;
min_key.cljs$lang$arity$variadic = min_key__4.cljs$lang$arity$variadic;
return min_key;
})()
;
/**
* Returns a lazy sequence of lists like partition, but may include
* partitions with fewer than n items at the end.
*/
cljs.core.partition_all = (function() {
var partition_all = null;
var partition_all__2 = (function (n,coll){
return partition_all.call(null,n,n,coll);
});
var partition_all__3 = (function (n,step,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3974__auto____9607 = cljs.core.seq.call(null,coll);
if(temp__3974__auto____9607)
{var s__9608 = temp__3974__auto____9607;
return cljs.core.cons.call(null,cljs.core.take.call(null,n,s__9608),partition_all.call(null,n,step,cljs.core.drop.call(null,step,s__9608)));
} else
{return null;
}
}),null));
});
partition_all = function(n,step,coll){
switch(arguments.length){
case 2:
return partition_all__2.call(this,n,step);
case 3:
return partition_all__3.call(this,n,step,coll);
}
throw('Invalid arity: ' + arguments.length);
};
partition_all.cljs$lang$arity$2 = partition_all__2;
partition_all.cljs$lang$arity$3 = partition_all__3;
return partition_all;
})()
;
/**
* Returns a lazy sequence of successive items from coll while
* (pred item) returns true. pred must be free of side-effects.
*/
cljs.core.take_while = (function take_while(pred,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3974__auto____9611 = cljs.core.seq.call(null,coll);
if(temp__3974__auto____9611)
{var s__9612 = temp__3974__auto____9611;
if(cljs.core.truth_(pred.call(null,cljs.core.first.call(null,s__9612))))
{return cljs.core.cons.call(null,cljs.core.first.call(null,s__9612),take_while.call(null,pred,cljs.core.rest.call(null,s__9612)));
} else
{return null;
}
} else
{return null;
}
}),null));
});
cljs.core.mk_bound_fn = (function mk_bound_fn(sc,test,key){
return (function (e){
var comp__9614 = cljs.core._comparator.call(null,sc);
return test.call(null,comp__9614.call(null,cljs.core._entry_key.call(null,sc,e),key),0);
});
});
/**
* sc must be a sorted collection, test(s) one of <, <=, > or
* >=. Returns a seq of those entries with keys ek for
* which (test (.. sc comparator (compare ek key)) 0) is true
*/
cljs.core.subseq = (function() {
var subseq = null;
var subseq__3 = (function (sc,test,key){
var include__9626 = cljs.core.mk_bound_fn.call(null,sc,test,key);
if(cljs.core.truth_(cljs.core.PersistentHashSet.fromArray([cljs.core._GT_,cljs.core._GT__EQ_]).call(null,test)))
{var temp__3974__auto____9627 = cljs.core._sorted_seq_from.call(null,sc,key,true);
if(cljs.core.truth_(temp__3974__auto____9627))
{var vec__9628__9629 = temp__3974__auto____9627;
var e__9630 = cljs.core.nth.call(null,vec__9628__9629,0,null);
var s__9631 = vec__9628__9629;
if(cljs.core.truth_(include__9626.call(null,e__9630)))
{return s__9631;
} else
{return cljs.core.next.call(null,s__9631);
}
} else
{return null;
}
} else
{return cljs.core.take_while.call(null,include__9626,cljs.core._sorted_seq.call(null,sc,true));
}
});
var subseq__5 = (function (sc,start_test,start_key,end_test,end_key){
var temp__3974__auto____9632 = cljs.core._sorted_seq_from.call(null,sc,start_key,true);
if(cljs.core.truth_(temp__3974__auto____9632))
{var vec__9633__9634 = temp__3974__auto____9632;
var e__9635 = cljs.core.nth.call(null,vec__9633__9634,0,null);
var s__9636 = vec__9633__9634;
return cljs.core.take_while.call(null,cljs.core.mk_bound_fn.call(null,sc,end_test,end_key),(cljs.core.truth_(cljs.core.mk_bound_fn.call(null,sc,start_test,start_key).call(null,e__9635))?s__9636:cljs.core.next.call(null,s__9636)));
} else
{return null;
}
});
subseq = function(sc,start_test,start_key,end_test,end_key){
switch(arguments.length){
case 3:
return subseq__3.call(this,sc,start_test,start_key);
case 5:
return subseq__5.call(this,sc,start_test,start_key,end_test,end_key);
}
throw('Invalid arity: ' + arguments.length);
};
subseq.cljs$lang$arity$3 = subseq__3;
subseq.cljs$lang$arity$5 = subseq__5;
return subseq;
})()
;
/**
* sc must be a sorted collection, test(s) one of <, <=, > or
* >=. Returns a reverse seq of those entries with keys ek for
* which (test (.. sc comparator (compare ek key)) 0) is true
*/
cljs.core.rsubseq = (function() {
var rsubseq = null;
var rsubseq__3 = (function (sc,test,key){
var include__9648 = cljs.core.mk_bound_fn.call(null,sc,test,key);
if(cljs.core.truth_(cljs.core.PersistentHashSet.fromArray([cljs.core._LT_,cljs.core._LT__EQ_]).call(null,test)))
{var temp__3974__auto____9649 = cljs.core._sorted_seq_from.call(null,sc,key,false);
if(cljs.core.truth_(temp__3974__auto____9649))
{var vec__9650__9651 = temp__3974__auto____9649;
var e__9652 = cljs.core.nth.call(null,vec__9650__9651,0,null);
var s__9653 = vec__9650__9651;
if(cljs.core.truth_(include__9648.call(null,e__9652)))
{return s__9653;
} else
{return cljs.core.next.call(null,s__9653);
}
} else
{return null;
}
} else
{return cljs.core.take_while.call(null,include__9648,cljs.core._sorted_seq.call(null,sc,false));
}
});
var rsubseq__5 = (function (sc,start_test,start_key,end_test,end_key){
var temp__3974__auto____9654 = cljs.core._sorted_seq_from.call(null,sc,end_key,false);
if(cljs.core.truth_(temp__3974__auto____9654))
{var vec__9655__9656 = temp__3974__auto____9654;
var e__9657 = cljs.core.nth.call(null,vec__9655__9656,0,null);
var s__9658 = vec__9655__9656;
return cljs.core.take_while.call(null,cljs.core.mk_bound_fn.call(null,sc,start_test,start_key),(cljs.core.truth_(cljs.core.mk_bound_fn.call(null,sc,end_test,end_key).call(null,e__9657))?s__9658:cljs.core.next.call(null,s__9658)));
} else
{return null;
}
});
rsubseq = function(sc,start_test,start_key,end_test,end_key){
switch(arguments.length){
case 3:
return rsubseq__3.call(this,sc,start_test,start_key);
case 5:
return rsubseq__5.call(this,sc,start_test,start_key,end_test,end_key);
}
throw('Invalid arity: ' + arguments.length);
};
rsubseq.cljs$lang$arity$3 = rsubseq__3;
rsubseq.cljs$lang$arity$5 = rsubseq__5;
return rsubseq;
})()
;

/**
* @constructor
*/
cljs.core.Range = (function (meta,start,end,step,__hash){
this.meta = meta;
this.start = start;
this.end = end;
this.step = step;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 32375006;
})
cljs.core.Range.cljs$lang$type = true;
cljs.core.Range.cljs$lang$ctorPrSeq = (function (this__2315__auto__){
return cljs.core.list.call(null,"cljs.core/Range");
});
cljs.core.Range.prototype.cljs$core$IHash$_hash$arity$1 = (function (rng){
var this__9659 = this;
var h__2198__auto____9660 = this__9659.__hash;
if(!((h__2198__auto____9660 == null)))
{return h__2198__auto____9660;
} else
{var h__2198__auto____9661 = cljs.core.hash_coll.call(null,rng);
this__9659.__hash = h__2198__auto____9661;
return h__2198__auto____9661;
}
});
cljs.core.Range.prototype.cljs$core$INext$_next$arity$1 = (function (rng){
var this__9662 = this;
if((this__9662.step > 0))
{if(((this__9662.start + this__9662.step) < this__9662.end))
{return (new cljs.core.Range(this__9662.meta,(this__9662.start + this__9662.step),this__9662.end,this__9662.step,null));
} else
{return null;
}
} else
{if(((this__9662.start + this__9662.step) > this__9662.end))
{return (new cljs.core.Range(this__9662.meta,(this__9662.start + this__9662.step),this__9662.end,this__9662.step,null));
} else
{return null;
}
}
});
cljs.core.Range.prototype.cljs$core$ICollection$_conj$arity$2 = (function (rng,o){
var this__9663 = this;
return cljs.core.cons.call(null,o,rng);
});
cljs.core.Range.prototype.toString = (function (){
var this__9664 = this;
var this__9665 = this;
return cljs.core.pr_str.call(null,this__9665);
});
cljs.core.Range.prototype.cljs$core$IReduce$_reduce$arity$2 = (function (rng,f){
var this__9666 = this;
return cljs.core.ci_reduce.call(null,rng,f);
});
cljs.core.Range.prototype.cljs$core$IReduce$_reduce$arity$3 = (function (rng,f,s){
var this__9667 = this;
return cljs.core.ci_reduce.call(null,rng,f,s);
});
cljs.core.Range.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (rng){
var this__9668 = this;
if((this__9668.step > 0))
{if((this__9668.start < this__9668.end))
{return rng;
} else
{return null;
}
} else
{if((this__9668.start > this__9668.end))
{return rng;
} else
{return null;
}
}
});
cljs.core.Range.prototype.cljs$core$ICounted$_count$arity$1 = (function (rng){
var this__9669 = this;
if(cljs.core.not.call(null,rng.cljs$core$ISeqable$_seq$arity$1(rng)))
{return 0;
} else
{return Math.ceil(((this__9669.end - this__9669.start) / this__9669.step));
}
});
cljs.core.Range.prototype.cljs$core$ISeq$_first$arity$1 = (function (rng){
var this__9670 = this;
return this__9670.start;
});
cljs.core.Range.prototype.cljs$core$ISeq$_rest$arity$1 = (function (rng){
var this__9671 = this;
if(!((rng.cljs$core$ISeqable$_seq$arity$1(rng) == null)))
{return (new cljs.core.Range(this__9671.meta,(this__9671.start + this__9671.step),this__9671.end,this__9671.step,null));
} else
{return cljs.core.List.EMPTY;
}
});
cljs.core.Range.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (rng,other){
var this__9672 = this;
return cljs.core.equiv_sequential.call(null,rng,other);
});
cljs.core.Range.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (rng,meta){
var this__9673 = this;
return (new cljs.core.Range(meta,this__9673.start,this__9673.end,this__9673.step,this__9673.__hash));
});
cljs.core.Range.prototype.cljs$core$IMeta$_meta$arity$1 = (function (rng){
var this__9674 = this;
return this__9674.meta;
});
cljs.core.Range.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (rng,n){
var this__9675 = this;
if((n < rng.cljs$core$ICounted$_count$arity$1(rng)))
{return (this__9675.start + (n * this__9675.step));
} else
{if((function (){var and__3822__auto____9676 = (this__9675.start > this__9675.end);
if(and__3822__auto____9676)
{return (this__9675.step === 0);
} else
{return and__3822__auto____9676;
}
})())
{return this__9675.start;
} else
{throw (new Error("Index out of bounds"));
}
}
});
cljs.core.Range.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (rng,n,not_found){
var this__9677 = this;
if((n < rng.cljs$core$ICounted$_count$arity$1(rng)))
{return (this__9677.start + (n * this__9677.step));
} else
{if((function (){var and__3822__auto____9678 = (this__9677.start > this__9677.end);
if(and__3822__auto____9678)
{return (this__9677.step === 0);
} else
{return and__3822__auto____9678;
}
})())
{return this__9677.start;
} else
{return not_found;
}
}
});
cljs.core.Range.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (rng){
var this__9679 = this;
return cljs.core.with_meta.call(null,cljs.core.List.EMPTY,this__9679.meta);
});
cljs.core.Range;
/**
* Returns a lazy seq of nums from start (inclusive) to end
* (exclusive), by step, where start defaults to 0, step to 1,
* and end to infinity.
*/
cljs.core.range = (function() {
var range = null;
var range__0 = (function (){
return range.call(null,0,Number.MAX_VALUE,1);
});
var range__1 = (function (end){
return range.call(null,0,end,1);
});
var range__2 = (function (start,end){
return range.call(null,start,end,1);
});
var range__3 = (function (start,end,step){
return (new cljs.core.Range(null,start,end,step,null));
});
range = function(start,end,step){
switch(arguments.length){
case 0:
return range__0.call(this);
case 1:
return range__1.call(this,start);
case 2:
return range__2.call(this,start,end);
case 3:
return range__3.call(this,start,end,step);
}
throw('Invalid arity: ' + arguments.length);
};
range.cljs$lang$arity$0 = range__0;
range.cljs$lang$arity$1 = range__1;
range.cljs$lang$arity$2 = range__2;
range.cljs$lang$arity$3 = range__3;
return range;
})()
;
/**
* Returns a lazy seq of every nth item in coll.
*/
cljs.core.take_nth = (function take_nth(n,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3974__auto____9682 = cljs.core.seq.call(null,coll);
if(temp__3974__auto____9682)
{var s__9683 = temp__3974__auto____9682;
return cljs.core.cons.call(null,cljs.core.first.call(null,s__9683),take_nth.call(null,n,cljs.core.drop.call(null,n,s__9683)));
} else
{return null;
}
}),null));
});
/**
* Returns a vector of [(take-while pred coll) (drop-while pred coll)]
*/
cljs.core.split_with = (function split_with(pred,coll){
return cljs.core.PersistentVector.fromArray([cljs.core.take_while.call(null,pred,coll),cljs.core.drop_while.call(null,pred,coll)], true);
});
/**
* Applies f to each value in coll, splitting it each time f returns
* a new value.  Returns a lazy seq of partitions.
*/
cljs.core.partition_by = (function partition_by(f,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3974__auto____9690 = cljs.core.seq.call(null,coll);
if(temp__3974__auto____9690)
{var s__9691 = temp__3974__auto____9690;
var fst__9692 = cljs.core.first.call(null,s__9691);
var fv__9693 = f.call(null,fst__9692);
var run__9694 = cljs.core.cons.call(null,fst__9692,cljs.core.take_while.call(null,(function (p1__9684_SHARP_){
return cljs.core._EQ_.call(null,fv__9693,f.call(null,p1__9684_SHARP_));
}),cljs.core.next.call(null,s__9691)));
return cljs.core.cons.call(null,run__9694,partition_by.call(null,f,cljs.core.seq.call(null,cljs.core.drop.call(null,cljs.core.count.call(null,run__9694),s__9691))));
} else
{return null;
}
}),null));
});
/**
* Returns a map from distinct items in coll to the number of times
* they appear.
*/
cljs.core.frequencies = (function frequencies(coll){
return cljs.core.persistent_BANG_.call(null,cljs.core.reduce.call(null,(function (counts,x){
return cljs.core.assoc_BANG_.call(null,counts,x,(cljs.core._lookup.call(null,counts,x,0) + 1));
}),cljs.core.transient$.call(null,cljs.core.ObjMap.EMPTY),coll));
});
/**
* Returns a lazy seq of the intermediate values of the reduction (as
* per reduce) of coll by f, starting with init.
*/
cljs.core.reductions = (function() {
var reductions = null;
var reductions__2 = (function (f,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3971__auto____9709 = cljs.core.seq.call(null,coll);
if(temp__3971__auto____9709)
{var s__9710 = temp__3971__auto____9709;
return reductions.call(null,f,cljs.core.first.call(null,s__9710),cljs.core.rest.call(null,s__9710));
} else
{return cljs.core.list.call(null,f.call(null));
}
}),null));
});
var reductions__3 = (function (f,init,coll){
return cljs.core.cons.call(null,init,(new cljs.core.LazySeq(null,false,(function (){
var temp__3974__auto____9711 = cljs.core.seq.call(null,coll);
if(temp__3974__auto____9711)
{var s__9712 = temp__3974__auto____9711;
return reductions.call(null,f,f.call(null,init,cljs.core.first.call(null,s__9712)),cljs.core.rest.call(null,s__9712));
} else
{return null;
}
}),null)));
});
reductions = function(f,init,coll){
switch(arguments.length){
case 2:
return reductions__2.call(this,f,init);
case 3:
return reductions__3.call(this,f,init,coll);
}
throw('Invalid arity: ' + arguments.length);
};
reductions.cljs$lang$arity$2 = reductions__2;
reductions.cljs$lang$arity$3 = reductions__3;
return reductions;
})()
;
/**
* Takes a set of functions and returns a fn that is the juxtaposition
* of those fns.  The returned fn takes a variable number of args, and
* returns a vector containing the result of applying each fn to the
* args (left-to-right).
* ((juxt a b c) x) => [(a x) (b x) (c x)]
* @param {...*} var_args
*/
cljs.core.juxt = (function() {
var juxt = null;
var juxt__1 = (function (f){
return (function() {
var G__9715 = null;
var G__9715__0 = (function (){
return cljs.core.vector.call(null,f.call(null));
});
var G__9715__1 = (function (x){
return cljs.core.vector.call(null,f.call(null,x));
});
var G__9715__2 = (function (x,y){
return cljs.core.vector.call(null,f.call(null,x,y));
});
var G__9715__3 = (function (x,y,z){
return cljs.core.vector.call(null,f.call(null,x,y,z));
});
var G__9715__4 = (function() { 
var G__9716__delegate = function (x,y,z,args){
return cljs.core.vector.call(null,cljs.core.apply.call(null,f,x,y,z,args));
};
var G__9716 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__9716__delegate.call(this, x, y, z, args);
};
G__9716.cljs$lang$maxFixedArity = 3;
G__9716.cljs$lang$applyTo = (function (arglist__9717){
var x = cljs.core.first(arglist__9717);
var y = cljs.core.first(cljs.core.next(arglist__9717));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9717)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9717)));
return G__9716__delegate(x, y, z, args);
});
G__9716.cljs$lang$arity$variadic = G__9716__delegate;
return G__9716;
})()
;
G__9715 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case 0:
return G__9715__0.call(this);
case 1:
return G__9715__1.call(this,x);
case 2:
return G__9715__2.call(this,x,y);
case 3:
return G__9715__3.call(this,x,y,z);
default:
return G__9715__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
G__9715.cljs$lang$maxFixedArity = 3;
G__9715.cljs$lang$applyTo = G__9715__4.cljs$lang$applyTo;
return G__9715;
})()
});
var juxt__2 = (function (f,g){
return (function() {
var G__9718 = null;
var G__9718__0 = (function (){
return cljs.core.vector.call(null,f.call(null),g.call(null));
});
var G__9718__1 = (function (x){
return cljs.core.vector.call(null,f.call(null,x),g.call(null,x));
});
var G__9718__2 = (function (x,y){
return cljs.core.vector.call(null,f.call(null,x,y),g.call(null,x,y));
});
var G__9718__3 = (function (x,y,z){
return cljs.core.vector.call(null,f.call(null,x,y,z),g.call(null,x,y,z));
});
var G__9718__4 = (function() { 
var G__9719__delegate = function (x,y,z,args){
return cljs.core.vector.call(null,cljs.core.apply.call(null,f,x,y,z,args),cljs.core.apply.call(null,g,x,y,z,args));
};
var G__9719 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__9719__delegate.call(this, x, y, z, args);
};
G__9719.cljs$lang$maxFixedArity = 3;
G__9719.cljs$lang$applyTo = (function (arglist__9720){
var x = cljs.core.first(arglist__9720);
var y = cljs.core.first(cljs.core.next(arglist__9720));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9720)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9720)));
return G__9719__delegate(x, y, z, args);
});
G__9719.cljs$lang$arity$variadic = G__9719__delegate;
return G__9719;
})()
;
G__9718 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case 0:
return G__9718__0.call(this);
case 1:
return G__9718__1.call(this,x);
case 2:
return G__9718__2.call(this,x,y);
case 3:
return G__9718__3.call(this,x,y,z);
default:
return G__9718__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
G__9718.cljs$lang$maxFixedArity = 3;
G__9718.cljs$lang$applyTo = G__9718__4.cljs$lang$applyTo;
return G__9718;
})()
});
var juxt__3 = (function (f,g,h){
return (function() {
var G__9721 = null;
var G__9721__0 = (function (){
return cljs.core.vector.call(null,f.call(null),g.call(null),h.call(null));
});
var G__9721__1 = (function (x){
return cljs.core.vector.call(null,f.call(null,x),g.call(null,x),h.call(null,x));
});
var G__9721__2 = (function (x,y){
return cljs.core.vector.call(null,f.call(null,x,y),g.call(null,x,y),h.call(null,x,y));
});
var G__9721__3 = (function (x,y,z){
return cljs.core.vector.call(null,f.call(null,x,y,z),g.call(null,x,y,z),h.call(null,x,y,z));
});
var G__9721__4 = (function() { 
var G__9722__delegate = function (x,y,z,args){
return cljs.core.vector.call(null,cljs.core.apply.call(null,f,x,y,z,args),cljs.core.apply.call(null,g,x,y,z,args),cljs.core.apply.call(null,h,x,y,z,args));
};
var G__9722 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__9722__delegate.call(this, x, y, z, args);
};
G__9722.cljs$lang$maxFixedArity = 3;
G__9722.cljs$lang$applyTo = (function (arglist__9723){
var x = cljs.core.first(arglist__9723);
var y = cljs.core.first(cljs.core.next(arglist__9723));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9723)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9723)));
return G__9722__delegate(x, y, z, args);
});
G__9722.cljs$lang$arity$variadic = G__9722__delegate;
return G__9722;
})()
;
G__9721 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case 0:
return G__9721__0.call(this);
case 1:
return G__9721__1.call(this,x);
case 2:
return G__9721__2.call(this,x,y);
case 3:
return G__9721__3.call(this,x,y,z);
default:
return G__9721__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
G__9721.cljs$lang$maxFixedArity = 3;
G__9721.cljs$lang$applyTo = G__9721__4.cljs$lang$applyTo;
return G__9721;
})()
});
var juxt__4 = (function() { 
var G__9724__delegate = function (f,g,h,fs){
var fs__9714 = cljs.core.list_STAR_.call(null,f,g,h,fs);
return (function() {
var G__9725 = null;
var G__9725__0 = (function (){
return cljs.core.reduce.call(null,(function (p1__9695_SHARP_,p2__9696_SHARP_){
return cljs.core.conj.call(null,p1__9695_SHARP_,p2__9696_SHARP_.call(null));
}),cljs.core.PersistentVector.EMPTY,fs__9714);
});
var G__9725__1 = (function (x){
return cljs.core.reduce.call(null,(function (p1__9697_SHARP_,p2__9698_SHARP_){
return cljs.core.conj.call(null,p1__9697_SHARP_,p2__9698_SHARP_.call(null,x));
}),cljs.core.PersistentVector.EMPTY,fs__9714);
});
var G__9725__2 = (function (x,y){
return cljs.core.reduce.call(null,(function (p1__9699_SHARP_,p2__9700_SHARP_){
return cljs.core.conj.call(null,p1__9699_SHARP_,p2__9700_SHARP_.call(null,x,y));
}),cljs.core.PersistentVector.EMPTY,fs__9714);
});
var G__9725__3 = (function (x,y,z){
return cljs.core.reduce.call(null,(function (p1__9701_SHARP_,p2__9702_SHARP_){
return cljs.core.conj.call(null,p1__9701_SHARP_,p2__9702_SHARP_.call(null,x,y,z));
}),cljs.core.PersistentVector.EMPTY,fs__9714);
});
var G__9725__4 = (function() { 
var G__9726__delegate = function (x,y,z,args){
return cljs.core.reduce.call(null,(function (p1__9703_SHARP_,p2__9704_SHARP_){
return cljs.core.conj.call(null,p1__9703_SHARP_,cljs.core.apply.call(null,p2__9704_SHARP_,x,y,z,args));
}),cljs.core.PersistentVector.EMPTY,fs__9714);
};
var G__9726 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__9726__delegate.call(this, x, y, z, args);
};
G__9726.cljs$lang$maxFixedArity = 3;
G__9726.cljs$lang$applyTo = (function (arglist__9727){
var x = cljs.core.first(arglist__9727);
var y = cljs.core.first(cljs.core.next(arglist__9727));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9727)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9727)));
return G__9726__delegate(x, y, z, args);
});
G__9726.cljs$lang$arity$variadic = G__9726__delegate;
return G__9726;
})()
;
G__9725 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case 0:
return G__9725__0.call(this);
case 1:
return G__9725__1.call(this,x);
case 2:
return G__9725__2.call(this,x,y);
case 3:
return G__9725__3.call(this,x,y,z);
default:
return G__9725__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
G__9725.cljs$lang$maxFixedArity = 3;
G__9725.cljs$lang$applyTo = G__9725__4.cljs$lang$applyTo;
return G__9725;
})()
};
var G__9724 = function (f,g,h,var_args){
var fs = null;
if (goog.isDef(var_args)) {
  fs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__9724__delegate.call(this, f, g, h, fs);
};
G__9724.cljs$lang$maxFixedArity = 3;
G__9724.cljs$lang$applyTo = (function (arglist__9728){
var f = cljs.core.first(arglist__9728);
var g = cljs.core.first(cljs.core.next(arglist__9728));
var h = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9728)));
var fs = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9728)));
return G__9724__delegate(f, g, h, fs);
});
G__9724.cljs$lang$arity$variadic = G__9724__delegate;
return G__9724;
})()
;
juxt = function(f,g,h,var_args){
var fs = var_args;
switch(arguments.length){
case 1:
return juxt__1.call(this,f);
case 2:
return juxt__2.call(this,f,g);
case 3:
return juxt__3.call(this,f,g,h);
default:
return juxt__4.cljs$lang$arity$variadic(f,g,h, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
juxt.cljs$lang$maxFixedArity = 3;
juxt.cljs$lang$applyTo = juxt__4.cljs$lang$applyTo;
juxt.cljs$lang$arity$1 = juxt__1;
juxt.cljs$lang$arity$2 = juxt__2;
juxt.cljs$lang$arity$3 = juxt__3;
juxt.cljs$lang$arity$variadic = juxt__4.cljs$lang$arity$variadic;
return juxt;
})()
;
/**
* When lazy sequences are produced via functions that have side
* effects, any effects other than those needed to produce the first
* element in the seq do not occur until the seq is consumed. dorun can
* be used to force any effects. Walks through the successive nexts of
* the seq, does not retain the head and returns nil.
*/
cljs.core.dorun = (function() {
var dorun = null;
var dorun__1 = (function (coll){
while(true){
if(cljs.core.seq.call(null,coll))
{{
var G__9731 = cljs.core.next.call(null,coll);
coll = G__9731;
continue;
}
} else
{return null;
}
break;
}
});
var dorun__2 = (function (n,coll){
while(true){
if(cljs.core.truth_((function (){var and__3822__auto____9730 = cljs.core.seq.call(null,coll);
if(and__3822__auto____9730)
{return (n > 0);
} else
{return and__3822__auto____9730;
}
})()))
{{
var G__9732 = (n - 1);
var G__9733 = cljs.core.next.call(null,coll);
n = G__9732;
coll = G__9733;
continue;
}
} else
{return null;
}
break;
}
});
dorun = function(n,coll){
switch(arguments.length){
case 1:
return dorun__1.call(this,n);
case 2:
return dorun__2.call(this,n,coll);
}
throw('Invalid arity: ' + arguments.length);
};
dorun.cljs$lang$arity$1 = dorun__1;
dorun.cljs$lang$arity$2 = dorun__2;
return dorun;
})()
;
/**
* When lazy sequences are produced via functions that have side
* effects, any effects other than those needed to produce the first
* element in the seq do not occur until the seq is consumed. doall can
* be used to force any effects. Walks through the successive nexts of
* the seq, retains the head and returns it, thus causing the entire
* seq to reside in memory at one time.
*/
cljs.core.doall = (function() {
var doall = null;
var doall__1 = (function (coll){
cljs.core.dorun.call(null,coll);
return coll;
});
var doall__2 = (function (n,coll){
cljs.core.dorun.call(null,n,coll);
return coll;
});
doall = function(n,coll){
switch(arguments.length){
case 1:
return doall__1.call(this,n);
case 2:
return doall__2.call(this,n,coll);
}
throw('Invalid arity: ' + arguments.length);
};
doall.cljs$lang$arity$1 = doall__1;
doall.cljs$lang$arity$2 = doall__2;
return doall;
})()
;
cljs.core.regexp_QMARK_ = (function regexp_QMARK_(o){
return o instanceof RegExp;
});
/**
* Returns the result of (re-find re s) if re fully matches s.
*/
cljs.core.re_matches = (function re_matches(re,s){
var matches__9735 = re.exec(s);
if(cljs.core._EQ_.call(null,cljs.core.first.call(null,matches__9735),s))
{if((cljs.core.count.call(null,matches__9735) === 1))
{return cljs.core.first.call(null,matches__9735);
} else
{return cljs.core.vec.call(null,matches__9735);
}
} else
{return null;
}
});
/**
* Returns the first regex match, if any, of s to re, using
* re.exec(s). Returns a vector, containing first the matching
* substring, then any capturing groups if the regular expression contains
* capturing groups.
*/
cljs.core.re_find = (function re_find(re,s){
var matches__9737 = re.exec(s);
if((matches__9737 == null))
{return null;
} else
{if((cljs.core.count.call(null,matches__9737) === 1))
{return cljs.core.first.call(null,matches__9737);
} else
{return cljs.core.vec.call(null,matches__9737);
}
}
});
/**
* Returns a lazy sequence of successive matches of re in s.
*/
cljs.core.re_seq = (function re_seq(re,s){
var match_data__9742 = cljs.core.re_find.call(null,re,s);
var match_idx__9743 = s.search(re);
var match_str__9744 = ((cljs.core.coll_QMARK_.call(null,match_data__9742))?cljs.core.first.call(null,match_data__9742):match_data__9742);
var post_match__9745 = cljs.core.subs.call(null,s,(match_idx__9743 + cljs.core.count.call(null,match_str__9744)));
if(cljs.core.truth_(match_data__9742))
{return (new cljs.core.LazySeq(null,false,(function (){
return cljs.core.cons.call(null,match_data__9742,re_seq.call(null,re,post_match__9745));
}),null));
} else
{return null;
}
});
/**
* Returns an instance of RegExp which has compiled the provided string.
*/
cljs.core.re_pattern = (function re_pattern(s){
var vec__9752__9753 = cljs.core.re_find.call(null,/^(?:\(\?([idmsux]*)\))?(.*)/,s);
var ___9754 = cljs.core.nth.call(null,vec__9752__9753,0,null);
var flags__9755 = cljs.core.nth.call(null,vec__9752__9753,1,null);
var pattern__9756 = cljs.core.nth.call(null,vec__9752__9753,2,null);
return (new RegExp(pattern__9756,flags__9755));
});
cljs.core.pr_sequential = (function pr_sequential(print_one,begin,sep,end,opts,coll){
return cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray([begin], true),cljs.core.flatten1.call(null,cljs.core.interpose.call(null,cljs.core.PersistentVector.fromArray([sep], true),cljs.core.map.call(null,(function (p1__9746_SHARP_){
return print_one.call(null,p1__9746_SHARP_,opts);
}),coll))),cljs.core.PersistentVector.fromArray([end], true));
});
cljs.core.string_print = (function string_print(x){
cljs.core._STAR_print_fn_STAR_.call(null,x);
return null;
});
cljs.core.flush = (function flush(){
return null;
});
cljs.core.pr_seq = (function pr_seq(obj,opts){
if((obj == null))
{return cljs.core.list.call(null,"nil");
} else
{if((void 0 === obj))
{return cljs.core.list.call(null,"#<undefined>");
} else
{if("\uFDD0'else")
{return cljs.core.concat.call(null,(cljs.core.truth_((function (){var and__3822__auto____9766 = cljs.core._lookup.call(null,opts,"\uFDD0'meta",null);
if(cljs.core.truth_(and__3822__auto____9766))
{var and__3822__auto____9770 = (function (){var G__9767__9768 = obj;
if(G__9767__9768)
{if((function (){var or__3824__auto____9769 = (G__9767__9768.cljs$lang$protocol_mask$partition0$ & 131072);
if(or__3824__auto____9769)
{return or__3824__auto____9769;
} else
{return G__9767__9768.cljs$core$IMeta$;
}
})())
{return true;
} else
{if((!G__9767__9768.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IMeta,G__9767__9768);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IMeta,G__9767__9768);
}
})();
if(cljs.core.truth_(and__3822__auto____9770))
{return cljs.core.meta.call(null,obj);
} else
{return and__3822__auto____9770;
}
} else
{return and__3822__auto____9766;
}
})())?cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray(["^"], true),pr_seq.call(null,cljs.core.meta.call(null,obj),opts),cljs.core.PersistentVector.fromArray([" "], true)):null),(((function (){var and__3822__auto____9771 = !((obj == null));
if(and__3822__auto____9771)
{return obj.cljs$lang$type;
} else
{return and__3822__auto____9771;
}
})())?obj.cljs$lang$ctorPrSeq(obj):(((function (){var G__9772__9773 = obj;
if(G__9772__9773)
{if((function (){var or__3824__auto____9774 = (G__9772__9773.cljs$lang$protocol_mask$partition0$ & 536870912);
if(or__3824__auto____9774)
{return or__3824__auto____9774;
} else
{return G__9772__9773.cljs$core$IPrintable$;
}
})())
{return true;
} else
{if((!G__9772__9773.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IPrintable,G__9772__9773);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IPrintable,G__9772__9773);
}
})())?cljs.core._pr_seq.call(null,obj,opts):(cljs.core.truth_(cljs.core.regexp_QMARK_.call(null,obj))?cljs.core.list.call(null,"#\"",obj.source,"\""):(("\uFDD0'else")?cljs.core.list.call(null,"#<",[cljs.core.str(obj)].join(''),">"):null)))));
} else
{return null;
}
}
}
});
cljs.core.pr_sb = (function pr_sb(objs,opts){
var sb__9794 = (new goog.string.StringBuffer());
var G__9795__9796 = cljs.core.seq.call(null,cljs.core.pr_seq.call(null,cljs.core.first.call(null,objs),opts));
if(G__9795__9796)
{var string__9797 = cljs.core.first.call(null,G__9795__9796);
var G__9795__9798 = G__9795__9796;
while(true){
sb__9794.append(string__9797);
var temp__3974__auto____9799 = cljs.core.next.call(null,G__9795__9798);
if(temp__3974__auto____9799)
{var G__9795__9800 = temp__3974__auto____9799;
{
var G__9813 = cljs.core.first.call(null,G__9795__9800);
var G__9814 = G__9795__9800;
string__9797 = G__9813;
G__9795__9798 = G__9814;
continue;
}
} else
{}
break;
}
} else
{}
var G__9801__9802 = cljs.core.seq.call(null,cljs.core.next.call(null,objs));
if(G__9801__9802)
{var obj__9803 = cljs.core.first.call(null,G__9801__9802);
var G__9801__9804 = G__9801__9802;
while(true){
sb__9794.append(" ");
var G__9805__9806 = cljs.core.seq.call(null,cljs.core.pr_seq.call(null,obj__9803,opts));
if(G__9805__9806)
{var string__9807 = cljs.core.first.call(null,G__9805__9806);
var G__9805__9808 = G__9805__9806;
while(true){
sb__9794.append(string__9807);
var temp__3974__auto____9809 = cljs.core.next.call(null,G__9805__9808);
if(temp__3974__auto____9809)
{var G__9805__9810 = temp__3974__auto____9809;
{
var G__9815 = cljs.core.first.call(null,G__9805__9810);
var G__9816 = G__9805__9810;
string__9807 = G__9815;
G__9805__9808 = G__9816;
continue;
}
} else
{}
break;
}
} else
{}
var temp__3974__auto____9811 = cljs.core.next.call(null,G__9801__9804);
if(temp__3974__auto____9811)
{var G__9801__9812 = temp__3974__auto____9811;
{
var G__9817 = cljs.core.first.call(null,G__9801__9812);
var G__9818 = G__9801__9812;
obj__9803 = G__9817;
G__9801__9804 = G__9818;
continue;
}
} else
{}
break;
}
} else
{}
return sb__9794;
});
/**
* Prints a sequence of objects to a string, observing all the
* options given in opts
*/
cljs.core.pr_str_with_opts = (function pr_str_with_opts(objs,opts){
return [cljs.core.str(cljs.core.pr_sb.call(null,objs,opts))].join('');
});
/**
* Same as pr-str-with-opts followed by (newline)
*/
cljs.core.prn_str_with_opts = (function prn_str_with_opts(objs,opts){
var sb__9820 = cljs.core.pr_sb.call(null,objs,opts);
sb__9820.append("\n");
return [cljs.core.str(sb__9820)].join('');
});
/**
* Prints a sequence of objects using string-print, observing all
* the options given in opts
*/
cljs.core.pr_with_opts = (function pr_with_opts(objs,opts){
var G__9839__9840 = cljs.core.seq.call(null,cljs.core.pr_seq.call(null,cljs.core.first.call(null,objs),opts));
if(G__9839__9840)
{var string__9841 = cljs.core.first.call(null,G__9839__9840);
var G__9839__9842 = G__9839__9840;
while(true){
cljs.core.string_print.call(null,string__9841);
var temp__3974__auto____9843 = cljs.core.next.call(null,G__9839__9842);
if(temp__3974__auto____9843)
{var G__9839__9844 = temp__3974__auto____9843;
{
var G__9857 = cljs.core.first.call(null,G__9839__9844);
var G__9858 = G__9839__9844;
string__9841 = G__9857;
G__9839__9842 = G__9858;
continue;
}
} else
{}
break;
}
} else
{}
var G__9845__9846 = cljs.core.seq.call(null,cljs.core.next.call(null,objs));
if(G__9845__9846)
{var obj__9847 = cljs.core.first.call(null,G__9845__9846);
var G__9845__9848 = G__9845__9846;
while(true){
cljs.core.string_print.call(null," ");
var G__9849__9850 = cljs.core.seq.call(null,cljs.core.pr_seq.call(null,obj__9847,opts));
if(G__9849__9850)
{var string__9851 = cljs.core.first.call(null,G__9849__9850);
var G__9849__9852 = G__9849__9850;
while(true){
cljs.core.string_print.call(null,string__9851);
var temp__3974__auto____9853 = cljs.core.next.call(null,G__9849__9852);
if(temp__3974__auto____9853)
{var G__9849__9854 = temp__3974__auto____9853;
{
var G__9859 = cljs.core.first.call(null,G__9849__9854);
var G__9860 = G__9849__9854;
string__9851 = G__9859;
G__9849__9852 = G__9860;
continue;
}
} else
{}
break;
}
} else
{}
var temp__3974__auto____9855 = cljs.core.next.call(null,G__9845__9848);
if(temp__3974__auto____9855)
{var G__9845__9856 = temp__3974__auto____9855;
{
var G__9861 = cljs.core.first.call(null,G__9845__9856);
var G__9862 = G__9845__9856;
obj__9847 = G__9861;
G__9845__9848 = G__9862;
continue;
}
} else
{return null;
}
break;
}
} else
{return null;
}
});
cljs.core.newline = (function newline(opts){
cljs.core.string_print.call(null,"\n");
if(cljs.core.truth_(cljs.core._lookup.call(null,opts,"\uFDD0'flush-on-newline",null)))
{return cljs.core.flush.call(null);
} else
{return null;
}
});
cljs.core._STAR_flush_on_newline_STAR_ = true;
cljs.core._STAR_print_readably_STAR_ = true;
cljs.core._STAR_print_meta_STAR_ = false;
cljs.core._STAR_print_dup_STAR_ = false;
cljs.core.pr_opts = (function pr_opts(){
return cljs.core.ObjMap.fromObject(["\uFDD0'flush-on-newline","\uFDD0'readably","\uFDD0'meta","\uFDD0'dup"],{"\uFDD0'flush-on-newline":cljs.core._STAR_flush_on_newline_STAR_,"\uFDD0'readably":cljs.core._STAR_print_readably_STAR_,"\uFDD0'meta":cljs.core._STAR_print_meta_STAR_,"\uFDD0'dup":cljs.core._STAR_print_dup_STAR_});
});
/**
* pr to a string, returning it. Fundamental entrypoint to IPrintable.
* @param {...*} var_args
*/
cljs.core.pr_str = (function() { 
var pr_str__delegate = function (objs){
return cljs.core.pr_str_with_opts.call(null,objs,cljs.core.pr_opts.call(null));
};
var pr_str = function (var_args){
var objs = null;
if (goog.isDef(var_args)) {
  objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return pr_str__delegate.call(this, objs);
};
pr_str.cljs$lang$maxFixedArity = 0;
pr_str.cljs$lang$applyTo = (function (arglist__9863){
var objs = cljs.core.seq(arglist__9863);;
return pr_str__delegate(objs);
});
pr_str.cljs$lang$arity$variadic = pr_str__delegate;
return pr_str;
})()
;
/**
* Same as pr-str followed by (newline)
* @param {...*} var_args
*/
cljs.core.prn_str = (function() { 
var prn_str__delegate = function (objs){
return cljs.core.prn_str_with_opts.call(null,objs,cljs.core.pr_opts.call(null));
};
var prn_str = function (var_args){
var objs = null;
if (goog.isDef(var_args)) {
  objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return prn_str__delegate.call(this, objs);
};
prn_str.cljs$lang$maxFixedArity = 0;
prn_str.cljs$lang$applyTo = (function (arglist__9864){
var objs = cljs.core.seq(arglist__9864);;
return prn_str__delegate(objs);
});
prn_str.cljs$lang$arity$variadic = prn_str__delegate;
return prn_str;
})()
;
/**
* Prints the object(s) using string-print.  Prints the
* object(s), separated by spaces if there is more than one.
* By default, pr and prn print in a way that objects can be
* read by the reader
* @param {...*} var_args
*/
cljs.core.pr = (function() { 
var pr__delegate = function (objs){
return cljs.core.pr_with_opts.call(null,objs,cljs.core.pr_opts.call(null));
};
var pr = function (var_args){
var objs = null;
if (goog.isDef(var_args)) {
  objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return pr__delegate.call(this, objs);
};
pr.cljs$lang$maxFixedArity = 0;
pr.cljs$lang$applyTo = (function (arglist__9865){
var objs = cljs.core.seq(arglist__9865);;
return pr__delegate(objs);
});
pr.cljs$lang$arity$variadic = pr__delegate;
return pr;
})()
;
/**
* Prints the object(s) using string-print.
* print and println produce output for human consumption.
* @param {...*} var_args
*/
cljs.core.print = (function() { 
var cljs_core_print__delegate = function (objs){
return cljs.core.pr_with_opts.call(null,objs,cljs.core.assoc.call(null,cljs.core.pr_opts.call(null),"\uFDD0'readably",false));
};
var cljs_core_print = function (var_args){
var objs = null;
if (goog.isDef(var_args)) {
  objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return cljs_core_print__delegate.call(this, objs);
};
cljs_core_print.cljs$lang$maxFixedArity = 0;
cljs_core_print.cljs$lang$applyTo = (function (arglist__9866){
var objs = cljs.core.seq(arglist__9866);;
return cljs_core_print__delegate(objs);
});
cljs_core_print.cljs$lang$arity$variadic = cljs_core_print__delegate;
return cljs_core_print;
})()
;
/**
* print to a string, returning it
* @param {...*} var_args
*/
cljs.core.print_str = (function() { 
var print_str__delegate = function (objs){
return cljs.core.pr_str_with_opts.call(null,objs,cljs.core.assoc.call(null,cljs.core.pr_opts.call(null),"\uFDD0'readably",false));
};
var print_str = function (var_args){
var objs = null;
if (goog.isDef(var_args)) {
  objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return print_str__delegate.call(this, objs);
};
print_str.cljs$lang$maxFixedArity = 0;
print_str.cljs$lang$applyTo = (function (arglist__9867){
var objs = cljs.core.seq(arglist__9867);;
return print_str__delegate(objs);
});
print_str.cljs$lang$arity$variadic = print_str__delegate;
return print_str;
})()
;
/**
* Same as print followed by (newline)
* @param {...*} var_args
*/
cljs.core.println = (function() { 
var println__delegate = function (objs){
cljs.core.pr_with_opts.call(null,objs,cljs.core.assoc.call(null,cljs.core.pr_opts.call(null),"\uFDD0'readably",false));
return cljs.core.newline.call(null,cljs.core.pr_opts.call(null));
};
var println = function (var_args){
var objs = null;
if (goog.isDef(var_args)) {
  objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return println__delegate.call(this, objs);
};
println.cljs$lang$maxFixedArity = 0;
println.cljs$lang$applyTo = (function (arglist__9868){
var objs = cljs.core.seq(arglist__9868);;
return println__delegate(objs);
});
println.cljs$lang$arity$variadic = println__delegate;
return println;
})()
;
/**
* println to a string, returning it
* @param {...*} var_args
*/
cljs.core.println_str = (function() { 
var println_str__delegate = function (objs){
return cljs.core.prn_str_with_opts.call(null,objs,cljs.core.assoc.call(null,cljs.core.pr_opts.call(null),"\uFDD0'readably",false));
};
var println_str = function (var_args){
var objs = null;
if (goog.isDef(var_args)) {
  objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return println_str__delegate.call(this, objs);
};
println_str.cljs$lang$maxFixedArity = 0;
println_str.cljs$lang$applyTo = (function (arglist__9869){
var objs = cljs.core.seq(arglist__9869);;
return println_str__delegate(objs);
});
println_str.cljs$lang$arity$variadic = println_str__delegate;
return println_str;
})()
;
/**
* Same as pr followed by (newline).
* @param {...*} var_args
*/
cljs.core.prn = (function() { 
var prn__delegate = function (objs){
cljs.core.pr_with_opts.call(null,objs,cljs.core.pr_opts.call(null));
return cljs.core.newline.call(null,cljs.core.pr_opts.call(null));
};
var prn = function (var_args){
var objs = null;
if (goog.isDef(var_args)) {
  objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return prn__delegate.call(this, objs);
};
prn.cljs$lang$maxFixedArity = 0;
prn.cljs$lang$applyTo = (function (arglist__9870){
var objs = cljs.core.seq(arglist__9870);;
return prn__delegate(objs);
});
prn.cljs$lang$arity$variadic = prn__delegate;
return prn;
})()
;
/**
* Prints formatted output, as per format
* @param {...*} var_args
*/
cljs.core.printf = (function() { 
var printf__delegate = function (fmt,args){
return cljs.core.print.call(null,cljs.core.apply.call(null,cljs.core.format,fmt,args));
};
var printf = function (fmt,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return printf__delegate.call(this, fmt, args);
};
printf.cljs$lang$maxFixedArity = 1;
printf.cljs$lang$applyTo = (function (arglist__9871){
var fmt = cljs.core.first(arglist__9871);
var args = cljs.core.rest(arglist__9871);
return printf__delegate(fmt, args);
});
printf.cljs$lang$arity$variadic = printf__delegate;
return printf;
})()
;
cljs.core.HashMap.prototype.cljs$core$IPrintable$ = true;
cljs.core.HashMap.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
var pr_pair__9872 = (function (keyval){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,""," ","",opts,keyval);
});
return cljs.core.pr_sequential.call(null,pr_pair__9872,"{",", ","}",opts,coll);
});
(cljs.core.IPrintable["number"] = true);
(cljs.core._pr_seq["number"] = (function (n,opts){
return cljs.core.list.call(null,[cljs.core.str(n)].join(''));
}));
cljs.core.IndexedSeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"("," ",")",opts,coll);
});
cljs.core.Subvec.prototype.cljs$core$IPrintable$ = true;
cljs.core.Subvec.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"["," ","]",opts,coll);
});
cljs.core.ChunkedCons.prototype.cljs$core$IPrintable$ = true;
cljs.core.ChunkedCons.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"("," ",")",opts,coll);
});
cljs.core.PersistentTreeMap.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentTreeMap.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
var pr_pair__9873 = (function (keyval){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,""," ","",opts,keyval);
});
return cljs.core.pr_sequential.call(null,pr_pair__9873,"{",", ","}",opts,coll);
});
cljs.core.PersistentArrayMap.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentArrayMap.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
var pr_pair__9874 = (function (keyval){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,""," ","",opts,keyval);
});
return cljs.core.pr_sequential.call(null,pr_pair__9874,"{",", ","}",opts,coll);
});
cljs.core.PersistentQueue.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"#queue ["," ","]",opts,cljs.core.seq.call(null,coll));
});
cljs.core.LazySeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.LazySeq.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"("," ",")",opts,coll);
});
cljs.core.RSeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.RSeq.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"("," ",")",opts,coll);
});
cljs.core.PersistentTreeSet.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentTreeSet.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"#{"," ","}",opts,coll);
});
(cljs.core.IPrintable["boolean"] = true);
(cljs.core._pr_seq["boolean"] = (function (bool,opts){
return cljs.core.list.call(null,[cljs.core.str(bool)].join(''));
}));
(cljs.core.IPrintable["string"] = true);
(cljs.core._pr_seq["string"] = (function (obj,opts){
if(cljs.core.keyword_QMARK_.call(null,obj))
{return cljs.core.list.call(null,[cljs.core.str(":"),cljs.core.str((function (){var temp__3974__auto____9875 = cljs.core.namespace.call(null,obj);
if(cljs.core.truth_(temp__3974__auto____9875))
{var nspc__9876 = temp__3974__auto____9875;
return [cljs.core.str(nspc__9876),cljs.core.str("/")].join('');
} else
{return null;
}
})()),cljs.core.str(cljs.core.name.call(null,obj))].join(''));
} else
{if(cljs.core.symbol_QMARK_.call(null,obj))
{return cljs.core.list.call(null,[cljs.core.str((function (){var temp__3974__auto____9877 = cljs.core.namespace.call(null,obj);
if(cljs.core.truth_(temp__3974__auto____9877))
{var nspc__9878 = temp__3974__auto____9877;
return [cljs.core.str(nspc__9878),cljs.core.str("/")].join('');
} else
{return null;
}
})()),cljs.core.str(cljs.core.name.call(null,obj))].join(''));
} else
{if("\uFDD0'else")
{return cljs.core.list.call(null,(cljs.core.truth_((new cljs.core.Keyword("\uFDD0'readably")).call(null,opts))?goog.string.quote(obj):obj));
} else
{return null;
}
}
}
}));
cljs.core.NodeSeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.NodeSeq.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"("," ",")",opts,coll);
});
cljs.core.RedNode.prototype.cljs$core$IPrintable$ = true;
cljs.core.RedNode.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"["," ","]",opts,coll);
});
cljs.core.ChunkedSeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.ChunkedSeq.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"("," ",")",opts,coll);
});
cljs.core.PersistentHashMap.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentHashMap.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
var pr_pair__9879 = (function (keyval){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,""," ","",opts,keyval);
});
return cljs.core.pr_sequential.call(null,pr_pair__9879,"{",", ","}",opts,coll);
});
cljs.core.Vector.prototype.cljs$core$IPrintable$ = true;
cljs.core.Vector.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"["," ","]",opts,coll);
});
cljs.core.PersistentHashSet.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentHashSet.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"#{"," ","}",opts,coll);
});
cljs.core.PersistentVector.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentVector.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"["," ","]",opts,coll);
});
cljs.core.List.prototype.cljs$core$IPrintable$ = true;
cljs.core.List.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"("," ",")",opts,coll);
});
(cljs.core.IPrintable["array"] = true);
(cljs.core._pr_seq["array"] = (function (a,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"#<Array [",", ","]>",opts,a);
}));
(cljs.core.IPrintable["function"] = true);
(cljs.core._pr_seq["function"] = (function (this$){
return cljs.core.list.call(null,"#<",[cljs.core.str(this$)].join(''),">");
}));
cljs.core.EmptyList.prototype.cljs$core$IPrintable$ = true;
cljs.core.EmptyList.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.list.call(null,"()");
});
cljs.core.BlackNode.prototype.cljs$core$IPrintable$ = true;
cljs.core.BlackNode.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"["," ","]",opts,coll);
});
Date.prototype.cljs$core$IPrintable$ = true;
Date.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (d,_){
var normalize__9881 = (function (n,len){
var ns__9880 = [cljs.core.str(n)].join('');
while(true){
if((cljs.core.count.call(null,ns__9880) < len))
{{
var G__9883 = [cljs.core.str("0"),cljs.core.str(ns__9880)].join('');
ns__9880 = G__9883;
continue;
}
} else
{return ns__9880;
}
break;
}
});
return cljs.core.list.call(null,[cljs.core.str("#inst \""),cljs.core.str(d.getUTCFullYear()),cljs.core.str("-"),cljs.core.str(normalize__9881.call(null,(d.getUTCMonth() + 1),2)),cljs.core.str("-"),cljs.core.str(normalize__9881.call(null,d.getUTCDate(),2)),cljs.core.str("T"),cljs.core.str(normalize__9881.call(null,d.getUTCHours(),2)),cljs.core.str(":"),cljs.core.str(normalize__9881.call(null,d.getUTCMinutes(),2)),cljs.core.str(":"),cljs.core.str(normalize__9881.call(null,d.getUTCSeconds(),2)),cljs.core.str("."),cljs.core.str(normalize__9881.call(null,d.getUTCMilliseconds(),3)),cljs.core.str("-"),cljs.core.str("00:00\"")].join(''));
});
cljs.core.Cons.prototype.cljs$core$IPrintable$ = true;
cljs.core.Cons.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"("," ",")",opts,coll);
});
cljs.core.Range.prototype.cljs$core$IPrintable$ = true;
cljs.core.Range.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"("," ",")",opts,coll);
});
cljs.core.ArrayNodeSeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.ArrayNodeSeq.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"("," ",")",opts,coll);
});
cljs.core.ObjMap.prototype.cljs$core$IPrintable$ = true;
cljs.core.ObjMap.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
var pr_pair__9882 = (function (keyval){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,""," ","",opts,keyval);
});
return cljs.core.pr_sequential.call(null,pr_pair__9882,"{",", ","}",opts,coll);
});
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"("," ",")",opts,coll);
});
cljs.core.PersistentVector.prototype.cljs$core$IComparable$ = true;
cljs.core.PersistentVector.prototype.cljs$core$IComparable$_compare$arity$2 = (function (x,y){
return cljs.core.compare_indexed.call(null,x,y);
});

/**
* @constructor
*/
cljs.core.Atom = (function (state,meta,validator,watches){
this.state = state;
this.meta = meta;
this.validator = validator;
this.watches = watches;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 2690809856;
})
cljs.core.Atom.cljs$lang$type = true;
cljs.core.Atom.cljs$lang$ctorPrSeq = (function (this__2315__auto__){
return cljs.core.list.call(null,"cljs.core/Atom");
});
cljs.core.Atom.prototype.cljs$core$IHash$_hash$arity$1 = (function (this$){
var this__9884 = this;
return goog.getUid(this$);
});
cljs.core.Atom.prototype.cljs$core$IWatchable$_notify_watches$arity$3 = (function (this$,oldval,newval){
var this__9885 = this;
var G__9886__9887 = cljs.core.seq.call(null,this__9885.watches);
if(G__9886__9887)
{var G__9889__9891 = cljs.core.first.call(null,G__9886__9887);
var vec__9890__9892 = G__9889__9891;
var key__9893 = cljs.core.nth.call(null,vec__9890__9892,0,null);
var f__9894 = cljs.core.nth.call(null,vec__9890__9892,1,null);
var G__9886__9895 = G__9886__9887;
var G__9889__9896 = G__9889__9891;
var G__9886__9897 = G__9886__9895;
while(true){
var vec__9898__9899 = G__9889__9896;
var key__9900 = cljs.core.nth.call(null,vec__9898__9899,0,null);
var f__9901 = cljs.core.nth.call(null,vec__9898__9899,1,null);
var G__9886__9902 = G__9886__9897;
f__9901.call(null,key__9900,this$,oldval,newval);
var temp__3974__auto____9903 = cljs.core.next.call(null,G__9886__9902);
if(temp__3974__auto____9903)
{var G__9886__9904 = temp__3974__auto____9903;
{
var G__9911 = cljs.core.first.call(null,G__9886__9904);
var G__9912 = G__9886__9904;
G__9889__9896 = G__9911;
G__9886__9897 = G__9912;
continue;
}
} else
{return null;
}
break;
}
} else
{return null;
}
});
cljs.core.Atom.prototype.cljs$core$IWatchable$_add_watch$arity$3 = (function (this$,key,f){
var this__9905 = this;
return this$.watches = cljs.core.assoc.call(null,this__9905.watches,key,f);
});
cljs.core.Atom.prototype.cljs$core$IWatchable$_remove_watch$arity$2 = (function (this$,key){
var this__9906 = this;
return this$.watches = cljs.core.dissoc.call(null,this__9906.watches,key);
});
cljs.core.Atom.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (a,opts){
var this__9907 = this;
return cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray(["#<Atom: "], true),cljs.core._pr_seq.call(null,this__9907.state,opts),">");
});
cljs.core.Atom.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_){
var this__9908 = this;
return this__9908.meta;
});
cljs.core.Atom.prototype.cljs$core$IDeref$_deref$arity$1 = (function (_){
var this__9909 = this;
return this__9909.state;
});
cljs.core.Atom.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (o,other){
var this__9910 = this;
return (o === other);
});
cljs.core.Atom;
/**
* Creates and returns an Atom with an initial value of x and zero or
* more options (in any order):
* 
* :meta metadata-map
* 
* :validator validate-fn
* 
* If metadata-map is supplied, it will be come the metadata on the
* atom. validate-fn must be nil or a side-effect-free fn of one
* argument, which will be passed the intended new state on any state
* change. If the new state is unacceptable, the validate-fn should
* return false or throw an Error.  If either of these error conditions
* occur, then the value of the atom will not change.
* @param {...*} var_args
*/
cljs.core.atom = (function() {
var atom = null;
var atom__1 = (function (x){
return (new cljs.core.Atom(x,null,null,null));
});
var atom__2 = (function() { 
var G__9924__delegate = function (x,p__9913){
var map__9919__9920 = p__9913;
var map__9919__9921 = ((cljs.core.seq_QMARK_.call(null,map__9919__9920))?cljs.core.apply.call(null,cljs.core.hash_map,map__9919__9920):map__9919__9920);
var validator__9922 = cljs.core._lookup.call(null,map__9919__9921,"\uFDD0'validator",null);
var meta__9923 = cljs.core._lookup.call(null,map__9919__9921,"\uFDD0'meta",null);
return (new cljs.core.Atom(x,meta__9923,validator__9922,null));
};
var G__9924 = function (x,var_args){
var p__9913 = null;
if (goog.isDef(var_args)) {
  p__9913 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return G__9924__delegate.call(this, x, p__9913);
};
G__9924.cljs$lang$maxFixedArity = 1;
G__9924.cljs$lang$applyTo = (function (arglist__9925){
var x = cljs.core.first(arglist__9925);
var p__9913 = cljs.core.rest(arglist__9925);
return G__9924__delegate(x, p__9913);
});
G__9924.cljs$lang$arity$variadic = G__9924__delegate;
return G__9924;
})()
;
atom = function(x,var_args){
var p__9913 = var_args;
switch(arguments.length){
case 1:
return atom__1.call(this,x);
default:
return atom__2.cljs$lang$arity$variadic(x, cljs.core.array_seq(arguments, 1));
}
throw('Invalid arity: ' + arguments.length);
};
atom.cljs$lang$maxFixedArity = 1;
atom.cljs$lang$applyTo = atom__2.cljs$lang$applyTo;
atom.cljs$lang$arity$1 = atom__1;
atom.cljs$lang$arity$variadic = atom__2.cljs$lang$arity$variadic;
return atom;
})()
;
/**
* Sets the value of atom to newval without regard for the
* current value. Returns newval.
*/
cljs.core.reset_BANG_ = (function reset_BANG_(a,new_value){
var temp__3974__auto____9929 = a.validator;
if(cljs.core.truth_(temp__3974__auto____9929))
{var validate__9930 = temp__3974__auto____9929;
if(cljs.core.truth_(validate__9930.call(null,new_value)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("Validator rejected reference state"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'validate","\uFDD1'new-value"),cljs.core.hash_map("\uFDD0'line",6440))))].join('')));
}
} else
{}
var old_value__9931 = a.state;
a.state = new_value;
cljs.core._notify_watches.call(null,a,old_value__9931,new_value);
return new_value;
});
/**
* Atomically swaps the value of atom to be:
* (apply f current-value-of-atom args). Note that f may be called
* multiple times, and thus should be free of side effects.  Returns
* the value that was swapped in.
* @param {...*} var_args
*/
cljs.core.swap_BANG_ = (function() {
var swap_BANG_ = null;
var swap_BANG___2 = (function (a,f){
return cljs.core.reset_BANG_.call(null,a,f.call(null,a.state));
});
var swap_BANG___3 = (function (a,f,x){
return cljs.core.reset_BANG_.call(null,a,f.call(null,a.state,x));
});
var swap_BANG___4 = (function (a,f,x,y){
return cljs.core.reset_BANG_.call(null,a,f.call(null,a.state,x,y));
});
var swap_BANG___5 = (function (a,f,x,y,z){
return cljs.core.reset_BANG_.call(null,a,f.call(null,a.state,x,y,z));
});
var swap_BANG___6 = (function() { 
var G__9932__delegate = function (a,f,x,y,z,more){
return cljs.core.reset_BANG_.call(null,a,cljs.core.apply.call(null,f,a.state,x,y,z,more));
};
var G__9932 = function (a,f,x,y,z,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 5),0);
} 
return G__9932__delegate.call(this, a, f, x, y, z, more);
};
G__9932.cljs$lang$maxFixedArity = 5;
G__9932.cljs$lang$applyTo = (function (arglist__9933){
var a = cljs.core.first(arglist__9933);
var f = cljs.core.first(cljs.core.next(arglist__9933));
var x = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9933)));
var y = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__9933))));
var z = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__9933)))));
var more = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__9933)))));
return G__9932__delegate(a, f, x, y, z, more);
});
G__9932.cljs$lang$arity$variadic = G__9932__delegate;
return G__9932;
})()
;
swap_BANG_ = function(a,f,x,y,z,var_args){
var more = var_args;
switch(arguments.length){
case 2:
return swap_BANG___2.call(this,a,f);
case 3:
return swap_BANG___3.call(this,a,f,x);
case 4:
return swap_BANG___4.call(this,a,f,x,y);
case 5:
return swap_BANG___5.call(this,a,f,x,y,z);
default:
return swap_BANG___6.cljs$lang$arity$variadic(a,f,x,y,z, cljs.core.array_seq(arguments, 5));
}
throw('Invalid arity: ' + arguments.length);
};
swap_BANG_.cljs$lang$maxFixedArity = 5;
swap_BANG_.cljs$lang$applyTo = swap_BANG___6.cljs$lang$applyTo;
swap_BANG_.cljs$lang$arity$2 = swap_BANG___2;
swap_BANG_.cljs$lang$arity$3 = swap_BANG___3;
swap_BANG_.cljs$lang$arity$4 = swap_BANG___4;
swap_BANG_.cljs$lang$arity$5 = swap_BANG___5;
swap_BANG_.cljs$lang$arity$variadic = swap_BANG___6.cljs$lang$arity$variadic;
return swap_BANG_;
})()
;
/**
* Atomically sets the value of atom to newval if and only if the
* current value of the atom is identical to oldval. Returns true if
* set happened, else false.
*/
cljs.core.compare_and_set_BANG_ = (function compare_and_set_BANG_(a,oldval,newval){
if(cljs.core._EQ_.call(null,a.state,oldval))
{cljs.core.reset_BANG_.call(null,a,newval);
return true;
} else
{return false;
}
});
cljs.core.deref = (function deref(o){
return cljs.core._deref.call(null,o);
});
/**
* Sets the validator-fn for an atom. validator-fn must be nil or a
* side-effect-free fn of one argument, which will be passed the intended
* new state on any state change. If the new state is unacceptable, the
* validator-fn should return false or throw an Error. If the current state
* is not acceptable to the new validator, an Error will be thrown and the
* validator will not be changed.
*/
cljs.core.set_validator_BANG_ = (function set_validator_BANG_(iref,val){
return iref.validator = val;
});
/**
* Gets the validator-fn for a var/ref/agent/atom.
*/
cljs.core.get_validator = (function get_validator(iref){
return iref.validator;
});
/**
* Atomically sets the metadata for a namespace/var/ref/agent/atom to be:
* 
* (apply f its-current-meta args)
* 
* f must be free of side-effects
* @param {...*} var_args
*/
cljs.core.alter_meta_BANG_ = (function() { 
var alter_meta_BANG___delegate = function (iref,f,args){
return iref.meta = cljs.core.apply.call(null,f,iref.meta,args);
};
var alter_meta_BANG_ = function (iref,f,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return alter_meta_BANG___delegate.call(this, iref, f, args);
};
alter_meta_BANG_.cljs$lang$maxFixedArity = 2;
alter_meta_BANG_.cljs$lang$applyTo = (function (arglist__9934){
var iref = cljs.core.first(arglist__9934);
var f = cljs.core.first(cljs.core.next(arglist__9934));
var args = cljs.core.rest(cljs.core.next(arglist__9934));
return alter_meta_BANG___delegate(iref, f, args);
});
alter_meta_BANG_.cljs$lang$arity$variadic = alter_meta_BANG___delegate;
return alter_meta_BANG_;
})()
;
/**
* Atomically resets the metadata for an atom
*/
cljs.core.reset_meta_BANG_ = (function reset_meta_BANG_(iref,m){
return iref.meta = m;
});
/**
* Alpha - subject to change.
* 
* Adds a watch function to an atom reference. The watch fn must be a
* fn of 4 args: a key, the reference, its old-state, its
* new-state. Whenever the reference's state might have been changed,
* any registered watches will have their functions called. The watch
* fn will be called synchronously. Note that an atom's state
* may have changed again prior to the fn call, so use old/new-state
* rather than derefing the reference. Keys must be unique per
* reference, and can be used to remove the watch with remove-watch,
* but are otherwise considered opaque by the watch mechanism.  Bear in
* mind that regardless of the result or action of the watch fns the
* atom's value will change.  Example:
* 
* (def a (atom 0))
* (add-watch a :inc (fn [k r o n] (assert (== 0 n))))
* (swap! a inc)
* ;; Assertion Error
* (deref a)
* ;=> 1
*/
cljs.core.add_watch = (function add_watch(iref,key,f){
return cljs.core._add_watch.call(null,iref,key,f);
});
/**
* Alpha - subject to change.
* 
* Removes a watch (set by add-watch) from a reference
*/
cljs.core.remove_watch = (function remove_watch(iref,key){
return cljs.core._remove_watch.call(null,iref,key);
});
cljs.core.gensym_counter = null;
/**
* Returns a new symbol with a unique name. If a prefix string is
* supplied, the name is prefix# where # is some unique number. If
* prefix is not supplied, the prefix is 'G__'.
*/
cljs.core.gensym = (function() {
var gensym = null;
var gensym__0 = (function (){
return gensym.call(null,"G__");
});
var gensym__1 = (function (prefix_string){
if((cljs.core.gensym_counter == null))
{cljs.core.gensym_counter = cljs.core.atom.call(null,0);
} else
{}
return cljs.core.symbol.call(null,[cljs.core.str(prefix_string),cljs.core.str(cljs.core.swap_BANG_.call(null,cljs.core.gensym_counter,cljs.core.inc))].join(''));
});
gensym = function(prefix_string){
switch(arguments.length){
case 0:
return gensym__0.call(this);
case 1:
return gensym__1.call(this,prefix_string);
}
throw('Invalid arity: ' + arguments.length);
};
gensym.cljs$lang$arity$0 = gensym__0;
gensym.cljs$lang$arity$1 = gensym__1;
return gensym;
})()
;
cljs.core.fixture1 = 1;
cljs.core.fixture2 = 2;

/**
* @constructor
*/
cljs.core.Delay = (function (state,f){
this.state = state;
this.f = f;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 1073774592;
})
cljs.core.Delay.cljs$lang$type = true;
cljs.core.Delay.cljs$lang$ctorPrSeq = (function (this__2315__auto__){
return cljs.core.list.call(null,"cljs.core/Delay");
});
cljs.core.Delay.prototype.cljs$core$IPending$_realized_QMARK_$arity$1 = (function (d){
var this__9935 = this;
return (new cljs.core.Keyword("\uFDD0'done")).call(null,cljs.core.deref.call(null,this__9935.state));
});
cljs.core.Delay.prototype.cljs$core$IDeref$_deref$arity$1 = (function (_){
var this__9936 = this;
return (new cljs.core.Keyword("\uFDD0'value")).call(null,cljs.core.swap_BANG_.call(null,this__9936.state,(function (p__9937){
var map__9938__9939 = p__9937;
var map__9938__9940 = ((cljs.core.seq_QMARK_.call(null,map__9938__9939))?cljs.core.apply.call(null,cljs.core.hash_map,map__9938__9939):map__9938__9939);
var curr_state__9941 = map__9938__9940;
var done__9942 = cljs.core._lookup.call(null,map__9938__9940,"\uFDD0'done",null);
if(cljs.core.truth_(done__9942))
{return curr_state__9941;
} else
{return cljs.core.ObjMap.fromObject(["\uFDD0'done","\uFDD0'value"],{"\uFDD0'done":true,"\uFDD0'value":this__9936.f.call(null)});
}
})));
});
cljs.core.Delay;
/**
* returns true if x is a Delay created with delay
*/
cljs.core.delay_QMARK_ = (function delay_QMARK_(x){
return cljs.core.instance_QMARK_.call(null,cljs.core.Delay,x);
});
/**
* If x is a Delay, returns the (possibly cached) value of its expression, else returns x
*/
cljs.core.force = (function force(x){
if(cljs.core.delay_QMARK_.call(null,x))
{return cljs.core.deref.call(null,x);
} else
{return x;
}
});
/**
* Returns true if a value has been produced for a promise, delay, future or lazy sequence.
*/
cljs.core.realized_QMARK_ = (function realized_QMARK_(d){
return cljs.core._realized_QMARK_.call(null,d);
});
/**
* Recursively transforms JavaScript arrays into ClojureScript
* vectors, and JavaScript objects into ClojureScript maps.  With
* option ':keywordize-keys true' will convert object fields from
* strings to keywords.
* @param {...*} var_args
*/
cljs.core.js__GT_clj = (function() { 
var js__GT_clj__delegate = function (x,options){
var map__9963__9964 = options;
var map__9963__9965 = ((cljs.core.seq_QMARK_.call(null,map__9963__9964))?cljs.core.apply.call(null,cljs.core.hash_map,map__9963__9964):map__9963__9964);
var keywordize_keys__9966 = cljs.core._lookup.call(null,map__9963__9965,"\uFDD0'keywordize-keys",null);
var keyfn__9967 = (cljs.core.truth_(keywordize_keys__9966)?cljs.core.keyword:cljs.core.str);
var f__9982 = (function thisfn(x){
if(cljs.core.seq_QMARK_.call(null,x))
{return cljs.core.doall.call(null,cljs.core.map.call(null,thisfn,x));
} else
{if(cljs.core.coll_QMARK_.call(null,x))
{return cljs.core.into.call(null,cljs.core.empty.call(null,x),cljs.core.map.call(null,thisfn,x));
} else
{if(cljs.core.truth_(goog.isArray(x)))
{return cljs.core.vec.call(null,cljs.core.map.call(null,thisfn,x));
} else
{if((cljs.core.type.call(null,x) === Object))
{return cljs.core.into.call(null,cljs.core.ObjMap.EMPTY,(function (){var iter__2468__auto____9981 = (function iter__9975(s__9976){
return (new cljs.core.LazySeq(null,false,(function (){
var s__9976__9979 = s__9976;
while(true){
if(cljs.core.seq.call(null,s__9976__9979))
{var k__9980 = cljs.core.first.call(null,s__9976__9979);
return cljs.core.cons.call(null,cljs.core.PersistentVector.fromArray([keyfn__9967.call(null,k__9980),thisfn.call(null,(x[k__9980]))], true),iter__9975.call(null,cljs.core.rest.call(null,s__9976__9979)));
} else
{return null;
}
break;
}
}),null));
});
return iter__2468__auto____9981.call(null,cljs.core.js_keys.call(null,x));
})());
} else
{if("\uFDD0'else")
{return x;
} else
{return null;
}
}
}
}
}
});
return f__9982.call(null,x);
};
var js__GT_clj = function (x,var_args){
var options = null;
if (goog.isDef(var_args)) {
  options = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return js__GT_clj__delegate.call(this, x, options);
};
js__GT_clj.cljs$lang$maxFixedArity = 1;
js__GT_clj.cljs$lang$applyTo = (function (arglist__9983){
var x = cljs.core.first(arglist__9983);
var options = cljs.core.rest(arglist__9983);
return js__GT_clj__delegate(x, options);
});
js__GT_clj.cljs$lang$arity$variadic = js__GT_clj__delegate;
return js__GT_clj;
})()
;
/**
* Returns a memoized version of a referentially transparent function. The
* memoized version of the function keeps a cache of the mapping from arguments
* to results and, when calls with the same arguments are repeated often, has
* higher performance at the expense of higher memory use.
*/
cljs.core.memoize = (function memoize(f){
var mem__9988 = cljs.core.atom.call(null,cljs.core.ObjMap.EMPTY);
return (function() { 
var G__9992__delegate = function (args){
var temp__3971__auto____9989 = cljs.core._lookup.call(null,cljs.core.deref.call(null,mem__9988),args,null);
if(cljs.core.truth_(temp__3971__auto____9989))
{var v__9990 = temp__3971__auto____9989;
return v__9990;
} else
{var ret__9991 = cljs.core.apply.call(null,f,args);
cljs.core.swap_BANG_.call(null,mem__9988,cljs.core.assoc,args,ret__9991);
return ret__9991;
}
};
var G__9992 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__9992__delegate.call(this, args);
};
G__9992.cljs$lang$maxFixedArity = 0;
G__9992.cljs$lang$applyTo = (function (arglist__9993){
var args = cljs.core.seq(arglist__9993);;
return G__9992__delegate(args);
});
G__9992.cljs$lang$arity$variadic = G__9992__delegate;
return G__9992;
})()
;
});
/**
* trampoline can be used to convert algorithms requiring mutual
* recursion without stack consumption. Calls f with supplied args, if
* any. If f returns a fn, calls that fn with no arguments, and
* continues to repeat, until the return value is not a fn, then
* returns that non-fn value. Note that if you want to return a fn as a
* final value, you must wrap it in some data structure and unpack it
* after trampoline returns.
* @param {...*} var_args
*/
cljs.core.trampoline = (function() {
var trampoline = null;
var trampoline__1 = (function (f){
while(true){
var ret__9995 = f.call(null);
if(cljs.core.fn_QMARK_.call(null,ret__9995))
{{
var G__9996 = ret__9995;
f = G__9996;
continue;
}
} else
{return ret__9995;
}
break;
}
});
var trampoline__2 = (function() { 
var G__9997__delegate = function (f,args){
return trampoline.call(null,(function (){
return cljs.core.apply.call(null,f,args);
}));
};
var G__9997 = function (f,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return G__9997__delegate.call(this, f, args);
};
G__9997.cljs$lang$maxFixedArity = 1;
G__9997.cljs$lang$applyTo = (function (arglist__9998){
var f = cljs.core.first(arglist__9998);
var args = cljs.core.rest(arglist__9998);
return G__9997__delegate(f, args);
});
G__9997.cljs$lang$arity$variadic = G__9997__delegate;
return G__9997;
})()
;
trampoline = function(f,var_args){
var args = var_args;
switch(arguments.length){
case 1:
return trampoline__1.call(this,f);
default:
return trampoline__2.cljs$lang$arity$variadic(f, cljs.core.array_seq(arguments, 1));
}
throw('Invalid arity: ' + arguments.length);
};
trampoline.cljs$lang$maxFixedArity = 1;
trampoline.cljs$lang$applyTo = trampoline__2.cljs$lang$applyTo;
trampoline.cljs$lang$arity$1 = trampoline__1;
trampoline.cljs$lang$arity$variadic = trampoline__2.cljs$lang$arity$variadic;
return trampoline;
})()
;
/**
* Returns a random floating point number between 0 (inclusive) and
* n (default 1) (exclusive).
*/
cljs.core.rand = (function() {
var rand = null;
var rand__0 = (function (){
return rand.call(null,1);
});
var rand__1 = (function (n){
return (Math.random.call(null) * n);
});
rand = function(n){
switch(arguments.length){
case 0:
return rand__0.call(this);
case 1:
return rand__1.call(this,n);
}
throw('Invalid arity: ' + arguments.length);
};
rand.cljs$lang$arity$0 = rand__0;
rand.cljs$lang$arity$1 = rand__1;
return rand;
})()
;
/**
* Returns a random integer between 0 (inclusive) and n (exclusive).
*/
cljs.core.rand_int = (function rand_int(n){
return Math.floor.call(null,(Math.random.call(null) * n));
});
/**
* Return a random element of the (sequential) collection. Will have
* the same performance characteristics as nth for the given
* collection.
*/
cljs.core.rand_nth = (function rand_nth(coll){
return cljs.core.nth.call(null,coll,cljs.core.rand_int.call(null,cljs.core.count.call(null,coll)));
});
/**
* Returns a map of the elements of coll keyed by the result of
* f on each element. The value at each key will be a vector of the
* corresponding elements, in the order they appeared in coll.
*/
cljs.core.group_by = (function group_by(f,coll){
return cljs.core.reduce.call(null,(function (ret,x){
var k__10000 = f.call(null,x);
return cljs.core.assoc.call(null,ret,k__10000,cljs.core.conj.call(null,cljs.core._lookup.call(null,ret,k__10000,cljs.core.PersistentVector.EMPTY),x));
}),cljs.core.ObjMap.EMPTY,coll);
});
/**
* Creates a hierarchy object for use with derive, isa? etc.
*/
cljs.core.make_hierarchy = (function make_hierarchy(){
return cljs.core.ObjMap.fromObject(["\uFDD0'parents","\uFDD0'descendants","\uFDD0'ancestors"],{"\uFDD0'parents":cljs.core.ObjMap.EMPTY,"\uFDD0'descendants":cljs.core.ObjMap.EMPTY,"\uFDD0'ancestors":cljs.core.ObjMap.EMPTY});
});
cljs.core.global_hierarchy = cljs.core.atom.call(null,cljs.core.make_hierarchy.call(null));
/**
* Returns true if (= child parent), or child is directly or indirectly derived from
* parent, either via a JavaScript type inheritance relationship or a
* relationship established via derive. h must be a hierarchy obtained
* from make-hierarchy, if not supplied defaults to the global
* hierarchy
*/
cljs.core.isa_QMARK_ = (function() {
var isa_QMARK_ = null;
var isa_QMARK___2 = (function (child,parent){
return isa_QMARK_.call(null,cljs.core.deref.call(null,cljs.core.global_hierarchy),child,parent);
});
var isa_QMARK___3 = (function (h,child,parent){
var or__3824__auto____10009 = cljs.core._EQ_.call(null,child,parent);
if(or__3824__auto____10009)
{return or__3824__auto____10009;
} else
{var or__3824__auto____10010 = cljs.core.contains_QMARK_.call(null,(new cljs.core.Keyword("\uFDD0'ancestors")).call(null,h).call(null,child),parent);
if(or__3824__auto____10010)
{return or__3824__auto____10010;
} else
{var and__3822__auto____10011 = cljs.core.vector_QMARK_.call(null,parent);
if(and__3822__auto____10011)
{var and__3822__auto____10012 = cljs.core.vector_QMARK_.call(null,child);
if(and__3822__auto____10012)
{var and__3822__auto____10013 = (cljs.core.count.call(null,parent) === cljs.core.count.call(null,child));
if(and__3822__auto____10013)
{var ret__10014 = true;
var i__10015 = 0;
while(true){
if((function (){var or__3824__auto____10016 = cljs.core.not.call(null,ret__10014);
if(or__3824__auto____10016)
{return or__3824__auto____10016;
} else
{return (i__10015 === cljs.core.count.call(null,parent));
}
})())
{return ret__10014;
} else
{{
var G__10017 = isa_QMARK_.call(null,h,child.call(null,i__10015),parent.call(null,i__10015));
var G__10018 = (i__10015 + 1);
ret__10014 = G__10017;
i__10015 = G__10018;
continue;
}
}
break;
}
} else
{return and__3822__auto____10013;
}
} else
{return and__3822__auto____10012;
}
} else
{return and__3822__auto____10011;
}
}
}
});
isa_QMARK_ = function(h,child,parent){
switch(arguments.length){
case 2:
return isa_QMARK___2.call(this,h,child);
case 3:
return isa_QMARK___3.call(this,h,child,parent);
}
throw('Invalid arity: ' + arguments.length);
};
isa_QMARK_.cljs$lang$arity$2 = isa_QMARK___2;
isa_QMARK_.cljs$lang$arity$3 = isa_QMARK___3;
return isa_QMARK_;
})()
;
/**
* Returns the immediate parents of tag, either via a JavaScript type
* inheritance relationship or a relationship established via derive. h
* must be a hierarchy obtained from make-hierarchy, if not supplied
* defaults to the global hierarchy
*/
cljs.core.parents = (function() {
var parents = null;
var parents__1 = (function (tag){
return parents.call(null,cljs.core.deref.call(null,cljs.core.global_hierarchy),tag);
});
var parents__2 = (function (h,tag){
return cljs.core.not_empty.call(null,cljs.core._lookup.call(null,(new cljs.core.Keyword("\uFDD0'parents")).call(null,h),tag,null));
});
parents = function(h,tag){
switch(arguments.length){
case 1:
return parents__1.call(this,h);
case 2:
return parents__2.call(this,h,tag);
}
throw('Invalid arity: ' + arguments.length);
};
parents.cljs$lang$arity$1 = parents__1;
parents.cljs$lang$arity$2 = parents__2;
return parents;
})()
;
/**
* Returns the immediate and indirect parents of tag, either via a JavaScript type
* inheritance relationship or a relationship established via derive. h
* must be a hierarchy obtained from make-hierarchy, if not supplied
* defaults to the global hierarchy
*/
cljs.core.ancestors = (function() {
var ancestors = null;
var ancestors__1 = (function (tag){
return ancestors.call(null,cljs.core.deref.call(null,cljs.core.global_hierarchy),tag);
});
var ancestors__2 = (function (h,tag){
return cljs.core.not_empty.call(null,cljs.core._lookup.call(null,(new cljs.core.Keyword("\uFDD0'ancestors")).call(null,h),tag,null));
});
ancestors = function(h,tag){
switch(arguments.length){
case 1:
return ancestors__1.call(this,h);
case 2:
return ancestors__2.call(this,h,tag);
}
throw('Invalid arity: ' + arguments.length);
};
ancestors.cljs$lang$arity$1 = ancestors__1;
ancestors.cljs$lang$arity$2 = ancestors__2;
return ancestors;
})()
;
/**
* Returns the immediate and indirect children of tag, through a
* relationship established via derive. h must be a hierarchy obtained
* from make-hierarchy, if not supplied defaults to the global
* hierarchy. Note: does not work on JavaScript type inheritance
* relationships.
*/
cljs.core.descendants = (function() {
var descendants = null;
var descendants__1 = (function (tag){
return descendants.call(null,cljs.core.deref.call(null,cljs.core.global_hierarchy),tag);
});
var descendants__2 = (function (h,tag){
return cljs.core.not_empty.call(null,cljs.core._lookup.call(null,(new cljs.core.Keyword("\uFDD0'descendants")).call(null,h),tag,null));
});
descendants = function(h,tag){
switch(arguments.length){
case 1:
return descendants__1.call(this,h);
case 2:
return descendants__2.call(this,h,tag);
}
throw('Invalid arity: ' + arguments.length);
};
descendants.cljs$lang$arity$1 = descendants__1;
descendants.cljs$lang$arity$2 = descendants__2;
return descendants;
})()
;
/**
* Establishes a parent/child relationship between parent and
* tag. Parent must be a namespace-qualified symbol or keyword and
* child can be either a namespace-qualified symbol or keyword or a
* class. h must be a hierarchy obtained from make-hierarchy, if not
* supplied defaults to, and modifies, the global hierarchy.
*/
cljs.core.derive = (function() {
var derive = null;
var derive__2 = (function (tag,parent){
if(cljs.core.truth_(cljs.core.namespace.call(null,parent)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'namespace","\uFDD1'parent"),cljs.core.hash_map("\uFDD0'line",6724))))].join('')));
}
cljs.core.swap_BANG_.call(null,cljs.core.global_hierarchy,derive,tag,parent);
return null;
});
var derive__3 = (function (h,tag,parent){
if(cljs.core.not_EQ_.call(null,tag,parent))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'not=","\uFDD1'tag","\uFDD1'parent"),cljs.core.hash_map("\uFDD0'line",6728))))].join('')));
}
var tp__10027 = (new cljs.core.Keyword("\uFDD0'parents")).call(null,h);
var td__10028 = (new cljs.core.Keyword("\uFDD0'descendants")).call(null,h);
var ta__10029 = (new cljs.core.Keyword("\uFDD0'ancestors")).call(null,h);
var tf__10030 = (function (m,source,sources,target,targets){
return cljs.core.reduce.call(null,(function (ret,k){
return cljs.core.assoc.call(null,ret,k,cljs.core.reduce.call(null,cljs.core.conj,cljs.core._lookup.call(null,targets,k,cljs.core.PersistentHashSet.EMPTY),cljs.core.cons.call(null,target,targets.call(null,target))));
}),m,cljs.core.cons.call(null,source,sources.call(null,source)));
});
var or__3824__auto____10031 = ((cljs.core.contains_QMARK_.call(null,tp__10027.call(null,tag),parent))?null:(function (){if(cljs.core.contains_QMARK_.call(null,ta__10029.call(null,tag),parent))
{throw (new Error([cljs.core.str(tag),cljs.core.str("already has"),cljs.core.str(parent),cljs.core.str("as ancestor")].join('')));
} else
{}
if(cljs.core.contains_QMARK_.call(null,ta__10029.call(null,parent),tag))
{throw (new Error([cljs.core.str("Cyclic derivation:"),cljs.core.str(parent),cljs.core.str("has"),cljs.core.str(tag),cljs.core.str("as ancestor")].join('')));
} else
{}
return cljs.core.ObjMap.fromObject(["\uFDD0'parents","\uFDD0'ancestors","\uFDD0'descendants"],{"\uFDD0'parents":cljs.core.assoc.call(null,(new cljs.core.Keyword("\uFDD0'parents")).call(null,h),tag,cljs.core.conj.call(null,cljs.core._lookup.call(null,tp__10027,tag,cljs.core.PersistentHashSet.EMPTY),parent)),"\uFDD0'ancestors":tf__10030.call(null,(new cljs.core.Keyword("\uFDD0'ancestors")).call(null,h),tag,td__10028,parent,ta__10029),"\uFDD0'descendants":tf__10030.call(null,(new cljs.core.Keyword("\uFDD0'descendants")).call(null,h),parent,ta__10029,tag,td__10028)});
})());
if(cljs.core.truth_(or__3824__auto____10031))
{return or__3824__auto____10031;
} else
{return h;
}
});
derive = function(h,tag,parent){
switch(arguments.length){
case 2:
return derive__2.call(this,h,tag);
case 3:
return derive__3.call(this,h,tag,parent);
}
throw('Invalid arity: ' + arguments.length);
};
derive.cljs$lang$arity$2 = derive__2;
derive.cljs$lang$arity$3 = derive__3;
return derive;
})()
;
/**
* Removes a parent/child relationship between parent and
* tag. h must be a hierarchy obtained from make-hierarchy, if not
* supplied defaults to, and modifies, the global hierarchy.
*/
cljs.core.underive = (function() {
var underive = null;
var underive__2 = (function (tag,parent){
cljs.core.swap_BANG_.call(null,cljs.core.global_hierarchy,underive,tag,parent);
return null;
});
var underive__3 = (function (h,tag,parent){
var parentMap__10036 = (new cljs.core.Keyword("\uFDD0'parents")).call(null,h);
var childsParents__10037 = (cljs.core.truth_(parentMap__10036.call(null,tag))?cljs.core.disj.call(null,parentMap__10036.call(null,tag),parent):cljs.core.PersistentHashSet.EMPTY);
var newParents__10038 = (cljs.core.truth_(cljs.core.not_empty.call(null,childsParents__10037))?cljs.core.assoc.call(null,parentMap__10036,tag,childsParents__10037):cljs.core.dissoc.call(null,parentMap__10036,tag));
var deriv_seq__10039 = cljs.core.flatten.call(null,cljs.core.map.call(null,(function (p1__10019_SHARP_){
return cljs.core.cons.call(null,cljs.core.first.call(null,p1__10019_SHARP_),cljs.core.interpose.call(null,cljs.core.first.call(null,p1__10019_SHARP_),cljs.core.second.call(null,p1__10019_SHARP_)));
}),cljs.core.seq.call(null,newParents__10038)));
if(cljs.core.contains_QMARK_.call(null,parentMap__10036.call(null,tag),parent))
{return cljs.core.reduce.call(null,(function (p1__10020_SHARP_,p2__10021_SHARP_){
return cljs.core.apply.call(null,cljs.core.derive,p1__10020_SHARP_,p2__10021_SHARP_);
}),cljs.core.make_hierarchy.call(null),cljs.core.partition.call(null,2,deriv_seq__10039));
} else
{return h;
}
});
underive = function(h,tag,parent){
switch(arguments.length){
case 2:
return underive__2.call(this,h,tag);
case 3:
return underive__3.call(this,h,tag,parent);
}
throw('Invalid arity: ' + arguments.length);
};
underive.cljs$lang$arity$2 = underive__2;
underive.cljs$lang$arity$3 = underive__3;
return underive;
})()
;
cljs.core.reset_cache = (function reset_cache(method_cache,method_table,cached_hierarchy,hierarchy){
cljs.core.swap_BANG_.call(null,method_cache,(function (_){
return cljs.core.deref.call(null,method_table);
}));
return cljs.core.swap_BANG_.call(null,cached_hierarchy,(function (_){
return cljs.core.deref.call(null,hierarchy);
}));
});
cljs.core.prefers_STAR_ = (function prefers_STAR_(x,y,prefer_table){
var xprefs__10047 = cljs.core.deref.call(null,prefer_table).call(null,x);
var or__3824__auto____10049 = (cljs.core.truth_((function (){var and__3822__auto____10048 = xprefs__10047;
if(cljs.core.truth_(and__3822__auto____10048))
{return xprefs__10047.call(null,y);
} else
{return and__3822__auto____10048;
}
})())?true:null);
if(cljs.core.truth_(or__3824__auto____10049))
{return or__3824__auto____10049;
} else
{var or__3824__auto____10051 = (function (){var ps__10050 = cljs.core.parents.call(null,y);
while(true){
if((cljs.core.count.call(null,ps__10050) > 0))
{if(cljs.core.truth_(prefers_STAR_.call(null,x,cljs.core.first.call(null,ps__10050),prefer_table)))
{} else
{}
{
var G__10054 = cljs.core.rest.call(null,ps__10050);
ps__10050 = G__10054;
continue;
}
} else
{return null;
}
break;
}
})();
if(cljs.core.truth_(or__3824__auto____10051))
{return or__3824__auto____10051;
} else
{var or__3824__auto____10053 = (function (){var ps__10052 = cljs.core.parents.call(null,x);
while(true){
if((cljs.core.count.call(null,ps__10052) > 0))
{if(cljs.core.truth_(prefers_STAR_.call(null,cljs.core.first.call(null,ps__10052),y,prefer_table)))
{} else
{}
{
var G__10055 = cljs.core.rest.call(null,ps__10052);
ps__10052 = G__10055;
continue;
}
} else
{return null;
}
break;
}
})();
if(cljs.core.truth_(or__3824__auto____10053))
{return or__3824__auto____10053;
} else
{return false;
}
}
}
});
cljs.core.dominates = (function dominates(x,y,prefer_table){
var or__3824__auto____10057 = cljs.core.prefers_STAR_.call(null,x,y,prefer_table);
if(cljs.core.truth_(or__3824__auto____10057))
{return or__3824__auto____10057;
} else
{return cljs.core.isa_QMARK_.call(null,x,y);
}
});
cljs.core.find_and_cache_best_method = (function find_and_cache_best_method(name,dispatch_val,hierarchy,method_table,prefer_table,method_cache,cached_hierarchy){
var best_entry__10075 = cljs.core.reduce.call(null,(function (be,p__10067){
var vec__10068__10069 = p__10067;
var k__10070 = cljs.core.nth.call(null,vec__10068__10069,0,null);
var ___10071 = cljs.core.nth.call(null,vec__10068__10069,1,null);
var e__10072 = vec__10068__10069;
if(cljs.core.isa_QMARK_.call(null,dispatch_val,k__10070))
{var be2__10074 = (cljs.core.truth_((function (){var or__3824__auto____10073 = (be == null);
if(or__3824__auto____10073)
{return or__3824__auto____10073;
} else
{return cljs.core.dominates.call(null,k__10070,cljs.core.first.call(null,be),prefer_table);
}
})())?e__10072:be);
if(cljs.core.truth_(cljs.core.dominates.call(null,cljs.core.first.call(null,be2__10074),k__10070,prefer_table)))
{} else
{throw (new Error([cljs.core.str("Multiple methods in multimethod '"),cljs.core.str(name),cljs.core.str("' match dispatch value: "),cljs.core.str(dispatch_val),cljs.core.str(" -> "),cljs.core.str(k__10070),cljs.core.str(" and "),cljs.core.str(cljs.core.first.call(null,be2__10074)),cljs.core.str(", and neither is preferred")].join('')));
}
return be2__10074;
} else
{return be;
}
}),null,cljs.core.deref.call(null,method_table));
if(cljs.core.truth_(best_entry__10075))
{if(cljs.core._EQ_.call(null,cljs.core.deref.call(null,cached_hierarchy),cljs.core.deref.call(null,hierarchy)))
{cljs.core.swap_BANG_.call(null,method_cache,cljs.core.assoc,dispatch_val,cljs.core.second.call(null,best_entry__10075));
return cljs.core.second.call(null,best_entry__10075);
} else
{cljs.core.reset_cache.call(null,method_cache,method_table,cached_hierarchy,hierarchy);
return find_and_cache_best_method.call(null,name,dispatch_val,hierarchy,method_table,prefer_table,method_cache,cached_hierarchy);
}
} else
{return null;
}
});
cljs.core.IMultiFn = {};
cljs.core._reset = (function _reset(mf){
if((function (){var and__3822__auto____10080 = mf;
if(and__3822__auto____10080)
{return mf.cljs$core$IMultiFn$_reset$arity$1;
} else
{return and__3822__auto____10080;
}
})())
{return mf.cljs$core$IMultiFn$_reset$arity$1(mf);
} else
{var x__2369__auto____10081 = (((mf == null))?null:mf);
return (function (){var or__3824__auto____10082 = (cljs.core._reset[goog.typeOf(x__2369__auto____10081)]);
if(or__3824__auto____10082)
{return or__3824__auto____10082;
} else
{var or__3824__auto____10083 = (cljs.core._reset["_"]);
if(or__3824__auto____10083)
{return or__3824__auto____10083;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-reset",mf);
}
}
})().call(null,mf);
}
});
cljs.core._add_method = (function _add_method(mf,dispatch_val,method){
if((function (){var and__3822__auto____10088 = mf;
if(and__3822__auto____10088)
{return mf.cljs$core$IMultiFn$_add_method$arity$3;
} else
{return and__3822__auto____10088;
}
})())
{return mf.cljs$core$IMultiFn$_add_method$arity$3(mf,dispatch_val,method);
} else
{var x__2369__auto____10089 = (((mf == null))?null:mf);
return (function (){var or__3824__auto____10090 = (cljs.core._add_method[goog.typeOf(x__2369__auto____10089)]);
if(or__3824__auto____10090)
{return or__3824__auto____10090;
} else
{var or__3824__auto____10091 = (cljs.core._add_method["_"]);
if(or__3824__auto____10091)
{return or__3824__auto____10091;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-add-method",mf);
}
}
})().call(null,mf,dispatch_val,method);
}
});
cljs.core._remove_method = (function _remove_method(mf,dispatch_val){
if((function (){var and__3822__auto____10096 = mf;
if(and__3822__auto____10096)
{return mf.cljs$core$IMultiFn$_remove_method$arity$2;
} else
{return and__3822__auto____10096;
}
})())
{return mf.cljs$core$IMultiFn$_remove_method$arity$2(mf,dispatch_val);
} else
{var x__2369__auto____10097 = (((mf == null))?null:mf);
return (function (){var or__3824__auto____10098 = (cljs.core._remove_method[goog.typeOf(x__2369__auto____10097)]);
if(or__3824__auto____10098)
{return or__3824__auto____10098;
} else
{var or__3824__auto____10099 = (cljs.core._remove_method["_"]);
if(or__3824__auto____10099)
{return or__3824__auto____10099;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-remove-method",mf);
}
}
})().call(null,mf,dispatch_val);
}
});
cljs.core._prefer_method = (function _prefer_method(mf,dispatch_val,dispatch_val_y){
if((function (){var and__3822__auto____10104 = mf;
if(and__3822__auto____10104)
{return mf.cljs$core$IMultiFn$_prefer_method$arity$3;
} else
{return and__3822__auto____10104;
}
})())
{return mf.cljs$core$IMultiFn$_prefer_method$arity$3(mf,dispatch_val,dispatch_val_y);
} else
{var x__2369__auto____10105 = (((mf == null))?null:mf);
return (function (){var or__3824__auto____10106 = (cljs.core._prefer_method[goog.typeOf(x__2369__auto____10105)]);
if(or__3824__auto____10106)
{return or__3824__auto____10106;
} else
{var or__3824__auto____10107 = (cljs.core._prefer_method["_"]);
if(or__3824__auto____10107)
{return or__3824__auto____10107;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-prefer-method",mf);
}
}
})().call(null,mf,dispatch_val,dispatch_val_y);
}
});
cljs.core._get_method = (function _get_method(mf,dispatch_val){
if((function (){var and__3822__auto____10112 = mf;
if(and__3822__auto____10112)
{return mf.cljs$core$IMultiFn$_get_method$arity$2;
} else
{return and__3822__auto____10112;
}
})())
{return mf.cljs$core$IMultiFn$_get_method$arity$2(mf,dispatch_val);
} else
{var x__2369__auto____10113 = (((mf == null))?null:mf);
return (function (){var or__3824__auto____10114 = (cljs.core._get_method[goog.typeOf(x__2369__auto____10113)]);
if(or__3824__auto____10114)
{return or__3824__auto____10114;
} else
{var or__3824__auto____10115 = (cljs.core._get_method["_"]);
if(or__3824__auto____10115)
{return or__3824__auto____10115;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-get-method",mf);
}
}
})().call(null,mf,dispatch_val);
}
});
cljs.core._methods = (function _methods(mf){
if((function (){var and__3822__auto____10120 = mf;
if(and__3822__auto____10120)
{return mf.cljs$core$IMultiFn$_methods$arity$1;
} else
{return and__3822__auto____10120;
}
})())
{return mf.cljs$core$IMultiFn$_methods$arity$1(mf);
} else
{var x__2369__auto____10121 = (((mf == null))?null:mf);
return (function (){var or__3824__auto____10122 = (cljs.core._methods[goog.typeOf(x__2369__auto____10121)]);
if(or__3824__auto____10122)
{return or__3824__auto____10122;
} else
{var or__3824__auto____10123 = (cljs.core._methods["_"]);
if(or__3824__auto____10123)
{return or__3824__auto____10123;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-methods",mf);
}
}
})().call(null,mf);
}
});
cljs.core._prefers = (function _prefers(mf){
if((function (){var and__3822__auto____10128 = mf;
if(and__3822__auto____10128)
{return mf.cljs$core$IMultiFn$_prefers$arity$1;
} else
{return and__3822__auto____10128;
}
})())
{return mf.cljs$core$IMultiFn$_prefers$arity$1(mf);
} else
{var x__2369__auto____10129 = (((mf == null))?null:mf);
return (function (){var or__3824__auto____10130 = (cljs.core._prefers[goog.typeOf(x__2369__auto____10129)]);
if(or__3824__auto____10130)
{return or__3824__auto____10130;
} else
{var or__3824__auto____10131 = (cljs.core._prefers["_"]);
if(or__3824__auto____10131)
{return or__3824__auto____10131;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-prefers",mf);
}
}
})().call(null,mf);
}
});
cljs.core._dispatch = (function _dispatch(mf,args){
if((function (){var and__3822__auto____10136 = mf;
if(and__3822__auto____10136)
{return mf.cljs$core$IMultiFn$_dispatch$arity$2;
} else
{return and__3822__auto____10136;
}
})())
{return mf.cljs$core$IMultiFn$_dispatch$arity$2(mf,args);
} else
{var x__2369__auto____10137 = (((mf == null))?null:mf);
return (function (){var or__3824__auto____10138 = (cljs.core._dispatch[goog.typeOf(x__2369__auto____10137)]);
if(or__3824__auto____10138)
{return or__3824__auto____10138;
} else
{var or__3824__auto____10139 = (cljs.core._dispatch["_"]);
if(or__3824__auto____10139)
{return or__3824__auto____10139;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-dispatch",mf);
}
}
})().call(null,mf,args);
}
});
cljs.core.do_dispatch = (function do_dispatch(mf,dispatch_fn,args){
var dispatch_val__10142 = cljs.core.apply.call(null,dispatch_fn,args);
var target_fn__10143 = cljs.core._get_method.call(null,mf,dispatch_val__10142);
if(cljs.core.truth_(target_fn__10143))
{} else
{throw (new Error([cljs.core.str("No method in multimethod '"),cljs.core.str(cljs.core.name),cljs.core.str("' for dispatch value: "),cljs.core.str(dispatch_val__10142)].join('')));
}
return cljs.core.apply.call(null,target_fn__10143,args);
});

/**
* @constructor
*/
cljs.core.MultiFn = (function (name,dispatch_fn,default_dispatch_val,hierarchy,method_table,prefer_table,method_cache,cached_hierarchy){
this.name = name;
this.dispatch_fn = dispatch_fn;
this.default_dispatch_val = default_dispatch_val;
this.hierarchy = hierarchy;
this.method_table = method_table;
this.prefer_table = prefer_table;
this.method_cache = method_cache;
this.cached_hierarchy = cached_hierarchy;
this.cljs$lang$protocol_mask$partition0$ = 4194304;
this.cljs$lang$protocol_mask$partition1$ = 64;
})
cljs.core.MultiFn.cljs$lang$type = true;
cljs.core.MultiFn.cljs$lang$ctorPrSeq = (function (this__2315__auto__){
return cljs.core.list.call(null,"cljs.core/MultiFn");
});
cljs.core.MultiFn.prototype.cljs$core$IHash$_hash$arity$1 = (function (this$){
var this__10144 = this;
return goog.getUid(this$);
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_reset$arity$1 = (function (mf){
var this__10145 = this;
cljs.core.swap_BANG_.call(null,this__10145.method_table,(function (mf){
return cljs.core.ObjMap.EMPTY;
}));
cljs.core.swap_BANG_.call(null,this__10145.method_cache,(function (mf){
return cljs.core.ObjMap.EMPTY;
}));
cljs.core.swap_BANG_.call(null,this__10145.prefer_table,(function (mf){
return cljs.core.ObjMap.EMPTY;
}));
cljs.core.swap_BANG_.call(null,this__10145.cached_hierarchy,(function (mf){
return null;
}));
return mf;
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_add_method$arity$3 = (function (mf,dispatch_val,method){
var this__10146 = this;
cljs.core.swap_BANG_.call(null,this__10146.method_table,cljs.core.assoc,dispatch_val,method);
cljs.core.reset_cache.call(null,this__10146.method_cache,this__10146.method_table,this__10146.cached_hierarchy,this__10146.hierarchy);
return mf;
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_remove_method$arity$2 = (function (mf,dispatch_val){
var this__10147 = this;
cljs.core.swap_BANG_.call(null,this__10147.method_table,cljs.core.dissoc,dispatch_val);
cljs.core.reset_cache.call(null,this__10147.method_cache,this__10147.method_table,this__10147.cached_hierarchy,this__10147.hierarchy);
return mf;
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_get_method$arity$2 = (function (mf,dispatch_val){
var this__10148 = this;
if(cljs.core._EQ_.call(null,cljs.core.deref.call(null,this__10148.cached_hierarchy),cljs.core.deref.call(null,this__10148.hierarchy)))
{} else
{cljs.core.reset_cache.call(null,this__10148.method_cache,this__10148.method_table,this__10148.cached_hierarchy,this__10148.hierarchy);
}
var temp__3971__auto____10149 = cljs.core.deref.call(null,this__10148.method_cache).call(null,dispatch_val);
if(cljs.core.truth_(temp__3971__auto____10149))
{var target_fn__10150 = temp__3971__auto____10149;
return target_fn__10150;
} else
{var temp__3971__auto____10151 = cljs.core.find_and_cache_best_method.call(null,this__10148.name,dispatch_val,this__10148.hierarchy,this__10148.method_table,this__10148.prefer_table,this__10148.method_cache,this__10148.cached_hierarchy);
if(cljs.core.truth_(temp__3971__auto____10151))
{var target_fn__10152 = temp__3971__auto____10151;
return target_fn__10152;
} else
{return cljs.core.deref.call(null,this__10148.method_table).call(null,this__10148.default_dispatch_val);
}
}
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_prefer_method$arity$3 = (function (mf,dispatch_val_x,dispatch_val_y){
var this__10153 = this;
if(cljs.core.truth_(cljs.core.prefers_STAR_.call(null,dispatch_val_x,dispatch_val_y,this__10153.prefer_table)))
{throw (new Error([cljs.core.str("Preference conflict in multimethod '"),cljs.core.str(this__10153.name),cljs.core.str("': "),cljs.core.str(dispatch_val_y),cljs.core.str(" is already preferred to "),cljs.core.str(dispatch_val_x)].join('')));
} else
{}
cljs.core.swap_BANG_.call(null,this__10153.prefer_table,(function (old){
return cljs.core.assoc.call(null,old,dispatch_val_x,cljs.core.conj.call(null,cljs.core._lookup.call(null,old,dispatch_val_x,cljs.core.PersistentHashSet.EMPTY),dispatch_val_y));
}));
return cljs.core.reset_cache.call(null,this__10153.method_cache,this__10153.method_table,this__10153.cached_hierarchy,this__10153.hierarchy);
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_methods$arity$1 = (function (mf){
var this__10154 = this;
return cljs.core.deref.call(null,this__10154.method_table);
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_prefers$arity$1 = (function (mf){
var this__10155 = this;
return cljs.core.deref.call(null,this__10155.prefer_table);
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_dispatch$arity$2 = (function (mf,args){
var this__10156 = this;
return cljs.core.do_dispatch.call(null,mf,this__10156.dispatch_fn,args);
});
cljs.core.MultiFn;
cljs.core.MultiFn.prototype.call = (function() { 
var G__10158__delegate = function (_,args){
var self__10157 = this;
return cljs.core._dispatch.call(null,self__10157,args);
};
var G__10158 = function (_,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return G__10158__delegate.call(this, _, args);
};
G__10158.cljs$lang$maxFixedArity = 1;
G__10158.cljs$lang$applyTo = (function (arglist__10159){
var _ = cljs.core.first(arglist__10159);
var args = cljs.core.rest(arglist__10159);
return G__10158__delegate(_, args);
});
G__10158.cljs$lang$arity$variadic = G__10158__delegate;
return G__10158;
})()
;
cljs.core.MultiFn.prototype.apply = (function (_,args){
var self__10160 = this;
return cljs.core._dispatch.call(null,self__10160,args);
});
/**
* Removes all of the methods of multimethod.
*/
cljs.core.remove_all_methods = (function remove_all_methods(multifn){
return cljs.core._reset.call(null,multifn);
});
/**
* Removes the method of multimethod associated with dispatch-value.
*/
cljs.core.remove_method = (function remove_method(multifn,dispatch_val){
return cljs.core._remove_method.call(null,multifn,dispatch_val);
});
/**
* Causes the multimethod to prefer matches of dispatch-val-x over dispatch-val-y
* when there is a conflict
*/
cljs.core.prefer_method = (function prefer_method(multifn,dispatch_val_x,dispatch_val_y){
return cljs.core._prefer_method.call(null,multifn,dispatch_val_x,dispatch_val_y);
});
/**
* Given a multimethod, returns a map of dispatch values -> dispatch fns
*/
cljs.core.methods$ = (function methods$(multifn){
return cljs.core._methods.call(null,multifn);
});
/**
* Given a multimethod and a dispatch value, returns the dispatch fn
* that would apply to that value, or nil if none apply and no default
*/
cljs.core.get_method = (function get_method(multifn,dispatch_val){
return cljs.core._get_method.call(null,multifn,dispatch_val);
});
/**
* Given a multimethod, returns a map of preferred value -> set of other values
*/
cljs.core.prefers = (function prefers(multifn){
return cljs.core._prefers.call(null,multifn);
});

/**
* @constructor
*/
cljs.core.UUID = (function (uuid){
this.uuid = uuid;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 543162368;
})
cljs.core.UUID.cljs$lang$type = true;
cljs.core.UUID.cljs$lang$ctorPrSeq = (function (this__2315__auto__){
return cljs.core.list.call(null,"cljs.core/UUID");
});
cljs.core.UUID.prototype.cljs$core$IHash$_hash$arity$1 = (function (this$){
var this__10161 = this;
return goog.string.hashCode(cljs.core.pr_str.call(null,this$));
});
cljs.core.UUID.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (_10163,_){
var this__10162 = this;
return cljs.core.list.call(null,[cljs.core.str("#uuid \""),cljs.core.str(this__10162.uuid),cljs.core.str("\"")].join(''));
});
cljs.core.UUID.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (_,other){
var this__10164 = this;
var and__3822__auto____10165 = cljs.core.instance_QMARK_.call(null,cljs.core.UUID,other);
if(and__3822__auto____10165)
{return (this__10164.uuid === other.uuid);
} else
{return and__3822__auto____10165;
}
});
cljs.core.UUID.prototype.toString = (function (){
var this__10166 = this;
var this__10167 = this;
return cljs.core.pr_str.call(null,this__10167);
});
cljs.core.UUID;
