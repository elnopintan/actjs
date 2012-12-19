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
var x__6966 = (((x == null))?null:x);
if((p[goog.typeOf(x__6966)]))
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
var G__6967__delegate = function (array,i,idxs){
return cljs.core.apply.call(null,aget,aget.call(null,array,i),idxs);
};
var G__6967 = function (array,i,var_args){
var idxs = null;
if (goog.isDef(var_args)) {
  idxs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__6967__delegate.call(this, array, i, idxs);
};
G__6967.cljs$lang$maxFixedArity = 2;
G__6967.cljs$lang$applyTo = (function (arglist__6968){
var array = cljs.core.first(arglist__6968);
var i = cljs.core.first(cljs.core.next(arglist__6968));
var idxs = cljs.core.rest(cljs.core.next(arglist__6968));
return G__6967__delegate(array, i, idxs);
});
G__6967.cljs$lang$arity$variadic = G__6967__delegate;
return G__6967;
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
if((function (){var and__3822__auto____7053 = this$;
if(and__3822__auto____7053)
{return this$.cljs$core$IFn$_invoke$arity$1;
} else
{return and__3822__auto____7053;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$1(this$);
} else
{var x__3056__auto____7054 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____7055 = (cljs.core._invoke[goog.typeOf(x__3056__auto____7054)]);
if(or__3824__auto____7055)
{return or__3824__auto____7055;
} else
{var or__3824__auto____7056 = (cljs.core._invoke["_"]);
if(or__3824__auto____7056)
{return or__3824__auto____7056;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$);
}
});
var _invoke__2 = (function (this$,a){
if((function (){var and__3822__auto____7057 = this$;
if(and__3822__auto____7057)
{return this$.cljs$core$IFn$_invoke$arity$2;
} else
{return and__3822__auto____7057;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$2(this$,a);
} else
{var x__3056__auto____7058 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____7059 = (cljs.core._invoke[goog.typeOf(x__3056__auto____7058)]);
if(or__3824__auto____7059)
{return or__3824__auto____7059;
} else
{var or__3824__auto____7060 = (cljs.core._invoke["_"]);
if(or__3824__auto____7060)
{return or__3824__auto____7060;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a);
}
});
var _invoke__3 = (function (this$,a,b){
if((function (){var and__3822__auto____7061 = this$;
if(and__3822__auto____7061)
{return this$.cljs$core$IFn$_invoke$arity$3;
} else
{return and__3822__auto____7061;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$3(this$,a,b);
} else
{var x__3056__auto____7062 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____7063 = (cljs.core._invoke[goog.typeOf(x__3056__auto____7062)]);
if(or__3824__auto____7063)
{return or__3824__auto____7063;
} else
{var or__3824__auto____7064 = (cljs.core._invoke["_"]);
if(or__3824__auto____7064)
{return or__3824__auto____7064;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b);
}
});
var _invoke__4 = (function (this$,a,b,c){
if((function (){var and__3822__auto____7065 = this$;
if(and__3822__auto____7065)
{return this$.cljs$core$IFn$_invoke$arity$4;
} else
{return and__3822__auto____7065;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$4(this$,a,b,c);
} else
{var x__3056__auto____7066 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____7067 = (cljs.core._invoke[goog.typeOf(x__3056__auto____7066)]);
if(or__3824__auto____7067)
{return or__3824__auto____7067;
} else
{var or__3824__auto____7068 = (cljs.core._invoke["_"]);
if(or__3824__auto____7068)
{return or__3824__auto____7068;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c);
}
});
var _invoke__5 = (function (this$,a,b,c,d){
if((function (){var and__3822__auto____7069 = this$;
if(and__3822__auto____7069)
{return this$.cljs$core$IFn$_invoke$arity$5;
} else
{return and__3822__auto____7069;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$5(this$,a,b,c,d);
} else
{var x__3056__auto____7070 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____7071 = (cljs.core._invoke[goog.typeOf(x__3056__auto____7070)]);
if(or__3824__auto____7071)
{return or__3824__auto____7071;
} else
{var or__3824__auto____7072 = (cljs.core._invoke["_"]);
if(or__3824__auto____7072)
{return or__3824__auto____7072;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d);
}
});
var _invoke__6 = (function (this$,a,b,c,d,e){
if((function (){var and__3822__auto____7073 = this$;
if(and__3822__auto____7073)
{return this$.cljs$core$IFn$_invoke$arity$6;
} else
{return and__3822__auto____7073;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$6(this$,a,b,c,d,e);
} else
{var x__3056__auto____7074 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____7075 = (cljs.core._invoke[goog.typeOf(x__3056__auto____7074)]);
if(or__3824__auto____7075)
{return or__3824__auto____7075;
} else
{var or__3824__auto____7076 = (cljs.core._invoke["_"]);
if(or__3824__auto____7076)
{return or__3824__auto____7076;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e);
}
});
var _invoke__7 = (function (this$,a,b,c,d,e,f){
if((function (){var and__3822__auto____7077 = this$;
if(and__3822__auto____7077)
{return this$.cljs$core$IFn$_invoke$arity$7;
} else
{return and__3822__auto____7077;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$7(this$,a,b,c,d,e,f);
} else
{var x__3056__auto____7078 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____7079 = (cljs.core._invoke[goog.typeOf(x__3056__auto____7078)]);
if(or__3824__auto____7079)
{return or__3824__auto____7079;
} else
{var or__3824__auto____7080 = (cljs.core._invoke["_"]);
if(or__3824__auto____7080)
{return or__3824__auto____7080;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f);
}
});
var _invoke__8 = (function (this$,a,b,c,d,e,f,g){
if((function (){var and__3822__auto____7081 = this$;
if(and__3822__auto____7081)
{return this$.cljs$core$IFn$_invoke$arity$8;
} else
{return and__3822__auto____7081;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$8(this$,a,b,c,d,e,f,g);
} else
{var x__3056__auto____7082 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____7083 = (cljs.core._invoke[goog.typeOf(x__3056__auto____7082)]);
if(or__3824__auto____7083)
{return or__3824__auto____7083;
} else
{var or__3824__auto____7084 = (cljs.core._invoke["_"]);
if(or__3824__auto____7084)
{return or__3824__auto____7084;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g);
}
});
var _invoke__9 = (function (this$,a,b,c,d,e,f,g,h){
if((function (){var and__3822__auto____7085 = this$;
if(and__3822__auto____7085)
{return this$.cljs$core$IFn$_invoke$arity$9;
} else
{return and__3822__auto____7085;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$9(this$,a,b,c,d,e,f,g,h);
} else
{var x__3056__auto____7086 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____7087 = (cljs.core._invoke[goog.typeOf(x__3056__auto____7086)]);
if(or__3824__auto____7087)
{return or__3824__auto____7087;
} else
{var or__3824__auto____7088 = (cljs.core._invoke["_"]);
if(or__3824__auto____7088)
{return or__3824__auto____7088;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h);
}
});
var _invoke__10 = (function (this$,a,b,c,d,e,f,g,h,i){
if((function (){var and__3822__auto____7089 = this$;
if(and__3822__auto____7089)
{return this$.cljs$core$IFn$_invoke$arity$10;
} else
{return and__3822__auto____7089;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$10(this$,a,b,c,d,e,f,g,h,i);
} else
{var x__3056__auto____7090 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____7091 = (cljs.core._invoke[goog.typeOf(x__3056__auto____7090)]);
if(or__3824__auto____7091)
{return or__3824__auto____7091;
} else
{var or__3824__auto____7092 = (cljs.core._invoke["_"]);
if(or__3824__auto____7092)
{return or__3824__auto____7092;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i);
}
});
var _invoke__11 = (function (this$,a,b,c,d,e,f,g,h,i,j){
if((function (){var and__3822__auto____7093 = this$;
if(and__3822__auto____7093)
{return this$.cljs$core$IFn$_invoke$arity$11;
} else
{return and__3822__auto____7093;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$11(this$,a,b,c,d,e,f,g,h,i,j);
} else
{var x__3056__auto____7094 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____7095 = (cljs.core._invoke[goog.typeOf(x__3056__auto____7094)]);
if(or__3824__auto____7095)
{return or__3824__auto____7095;
} else
{var or__3824__auto____7096 = (cljs.core._invoke["_"]);
if(or__3824__auto____7096)
{return or__3824__auto____7096;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j);
}
});
var _invoke__12 = (function (this$,a,b,c,d,e,f,g,h,i,j,k){
if((function (){var and__3822__auto____7097 = this$;
if(and__3822__auto____7097)
{return this$.cljs$core$IFn$_invoke$arity$12;
} else
{return and__3822__auto____7097;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$12(this$,a,b,c,d,e,f,g,h,i,j,k);
} else
{var x__3056__auto____7098 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____7099 = (cljs.core._invoke[goog.typeOf(x__3056__auto____7098)]);
if(or__3824__auto____7099)
{return or__3824__auto____7099;
} else
{var or__3824__auto____7100 = (cljs.core._invoke["_"]);
if(or__3824__auto____7100)
{return or__3824__auto____7100;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k);
}
});
var _invoke__13 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l){
if((function (){var and__3822__auto____7101 = this$;
if(and__3822__auto____7101)
{return this$.cljs$core$IFn$_invoke$arity$13;
} else
{return and__3822__auto____7101;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$13(this$,a,b,c,d,e,f,g,h,i,j,k,l);
} else
{var x__3056__auto____7102 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____7103 = (cljs.core._invoke[goog.typeOf(x__3056__auto____7102)]);
if(or__3824__auto____7103)
{return or__3824__auto____7103;
} else
{var or__3824__auto____7104 = (cljs.core._invoke["_"]);
if(or__3824__auto____7104)
{return or__3824__auto____7104;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l);
}
});
var _invoke__14 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l,m){
if((function (){var and__3822__auto____7105 = this$;
if(and__3822__auto____7105)
{return this$.cljs$core$IFn$_invoke$arity$14;
} else
{return and__3822__auto____7105;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$14(this$,a,b,c,d,e,f,g,h,i,j,k,l,m);
} else
{var x__3056__auto____7106 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____7107 = (cljs.core._invoke[goog.typeOf(x__3056__auto____7106)]);
if(or__3824__auto____7107)
{return or__3824__auto____7107;
} else
{var or__3824__auto____7108 = (cljs.core._invoke["_"]);
if(or__3824__auto____7108)
{return or__3824__auto____7108;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l,m);
}
});
var _invoke__15 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n){
if((function (){var and__3822__auto____7109 = this$;
if(and__3822__auto____7109)
{return this$.cljs$core$IFn$_invoke$arity$15;
} else
{return and__3822__auto____7109;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$15(this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n);
} else
{var x__3056__auto____7110 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____7111 = (cljs.core._invoke[goog.typeOf(x__3056__auto____7110)]);
if(or__3824__auto____7111)
{return or__3824__auto____7111;
} else
{var or__3824__auto____7112 = (cljs.core._invoke["_"]);
if(or__3824__auto____7112)
{return or__3824__auto____7112;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n);
}
});
var _invoke__16 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){
if((function (){var and__3822__auto____7113 = this$;
if(and__3822__auto____7113)
{return this$.cljs$core$IFn$_invoke$arity$16;
} else
{return and__3822__auto____7113;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$16(this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o);
} else
{var x__3056__auto____7114 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____7115 = (cljs.core._invoke[goog.typeOf(x__3056__auto____7114)]);
if(or__3824__auto____7115)
{return or__3824__auto____7115;
} else
{var or__3824__auto____7116 = (cljs.core._invoke["_"]);
if(or__3824__auto____7116)
{return or__3824__auto____7116;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o);
}
});
var _invoke__17 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){
if((function (){var and__3822__auto____7117 = this$;
if(and__3822__auto____7117)
{return this$.cljs$core$IFn$_invoke$arity$17;
} else
{return and__3822__auto____7117;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$17(this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p);
} else
{var x__3056__auto____7118 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____7119 = (cljs.core._invoke[goog.typeOf(x__3056__auto____7118)]);
if(or__3824__auto____7119)
{return or__3824__auto____7119;
} else
{var or__3824__auto____7120 = (cljs.core._invoke["_"]);
if(or__3824__auto____7120)
{return or__3824__auto____7120;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p);
}
});
var _invoke__18 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){
if((function (){var and__3822__auto____7121 = this$;
if(and__3822__auto____7121)
{return this$.cljs$core$IFn$_invoke$arity$18;
} else
{return and__3822__auto____7121;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$18(this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q);
} else
{var x__3056__auto____7122 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____7123 = (cljs.core._invoke[goog.typeOf(x__3056__auto____7122)]);
if(or__3824__auto____7123)
{return or__3824__auto____7123;
} else
{var or__3824__auto____7124 = (cljs.core._invoke["_"]);
if(or__3824__auto____7124)
{return or__3824__auto____7124;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q);
}
});
var _invoke__19 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s){
if((function (){var and__3822__auto____7125 = this$;
if(and__3822__auto____7125)
{return this$.cljs$core$IFn$_invoke$arity$19;
} else
{return and__3822__auto____7125;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$19(this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s);
} else
{var x__3056__auto____7126 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____7127 = (cljs.core._invoke[goog.typeOf(x__3056__auto____7126)]);
if(or__3824__auto____7127)
{return or__3824__auto____7127;
} else
{var or__3824__auto____7128 = (cljs.core._invoke["_"]);
if(or__3824__auto____7128)
{return or__3824__auto____7128;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s);
}
});
var _invoke__20 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t){
if((function (){var and__3822__auto____7129 = this$;
if(and__3822__auto____7129)
{return this$.cljs$core$IFn$_invoke$arity$20;
} else
{return and__3822__auto____7129;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$20(this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t);
} else
{var x__3056__auto____7130 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____7131 = (cljs.core._invoke[goog.typeOf(x__3056__auto____7130)]);
if(or__3824__auto____7131)
{return or__3824__auto____7131;
} else
{var or__3824__auto____7132 = (cljs.core._invoke["_"]);
if(or__3824__auto____7132)
{return or__3824__auto____7132;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t);
}
});
var _invoke__21 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t,rest){
if((function (){var and__3822__auto____7133 = this$;
if(and__3822__auto____7133)
{return this$.cljs$core$IFn$_invoke$arity$21;
} else
{return and__3822__auto____7133;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$21(this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t,rest);
} else
{var x__3056__auto____7134 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____7135 = (cljs.core._invoke[goog.typeOf(x__3056__auto____7134)]);
if(or__3824__auto____7135)
{return or__3824__auto____7135;
} else
{var or__3824__auto____7136 = (cljs.core._invoke["_"]);
if(or__3824__auto____7136)
{return or__3824__auto____7136;
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
if((function (){var and__3822__auto____7141 = coll;
if(and__3822__auto____7141)
{return coll.cljs$core$ICounted$_count$arity$1;
} else
{return and__3822__auto____7141;
}
})())
{return coll.cljs$core$ICounted$_count$arity$1(coll);
} else
{var x__3056__auto____7142 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7143 = (cljs.core._count[goog.typeOf(x__3056__auto____7142)]);
if(or__3824__auto____7143)
{return or__3824__auto____7143;
} else
{var or__3824__auto____7144 = (cljs.core._count["_"]);
if(or__3824__auto____7144)
{return or__3824__auto____7144;
} else
{throw cljs.core.missing_protocol.call(null,"ICounted.-count",coll);
}
}
})().call(null,coll);
}
});
cljs.core.IEmptyableCollection = {};
cljs.core._empty = (function _empty(coll){
if((function (){var and__3822__auto____7149 = coll;
if(and__3822__auto____7149)
{return coll.cljs$core$IEmptyableCollection$_empty$arity$1;
} else
{return and__3822__auto____7149;
}
})())
{return coll.cljs$core$IEmptyableCollection$_empty$arity$1(coll);
} else
{var x__3056__auto____7150 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7151 = (cljs.core._empty[goog.typeOf(x__3056__auto____7150)]);
if(or__3824__auto____7151)
{return or__3824__auto____7151;
} else
{var or__3824__auto____7152 = (cljs.core._empty["_"]);
if(or__3824__auto____7152)
{return or__3824__auto____7152;
} else
{throw cljs.core.missing_protocol.call(null,"IEmptyableCollection.-empty",coll);
}
}
})().call(null,coll);
}
});
cljs.core.ICollection = {};
cljs.core._conj = (function _conj(coll,o){
if((function (){var and__3822__auto____7157 = coll;
if(and__3822__auto____7157)
{return coll.cljs$core$ICollection$_conj$arity$2;
} else
{return and__3822__auto____7157;
}
})())
{return coll.cljs$core$ICollection$_conj$arity$2(coll,o);
} else
{var x__3056__auto____7158 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7159 = (cljs.core._conj[goog.typeOf(x__3056__auto____7158)]);
if(or__3824__auto____7159)
{return or__3824__auto____7159;
} else
{var or__3824__auto____7160 = (cljs.core._conj["_"]);
if(or__3824__auto____7160)
{return or__3824__auto____7160;
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
if((function (){var and__3822__auto____7169 = coll;
if(and__3822__auto____7169)
{return coll.cljs$core$IIndexed$_nth$arity$2;
} else
{return and__3822__auto____7169;
}
})())
{return coll.cljs$core$IIndexed$_nth$arity$2(coll,n);
} else
{var x__3056__auto____7170 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7171 = (cljs.core._nth[goog.typeOf(x__3056__auto____7170)]);
if(or__3824__auto____7171)
{return or__3824__auto____7171;
} else
{var or__3824__auto____7172 = (cljs.core._nth["_"]);
if(or__3824__auto____7172)
{return or__3824__auto____7172;
} else
{throw cljs.core.missing_protocol.call(null,"IIndexed.-nth",coll);
}
}
})().call(null,coll,n);
}
});
var _nth__3 = (function (coll,n,not_found){
if((function (){var and__3822__auto____7173 = coll;
if(and__3822__auto____7173)
{return coll.cljs$core$IIndexed$_nth$arity$3;
} else
{return and__3822__auto____7173;
}
})())
{return coll.cljs$core$IIndexed$_nth$arity$3(coll,n,not_found);
} else
{var x__3056__auto____7174 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7175 = (cljs.core._nth[goog.typeOf(x__3056__auto____7174)]);
if(or__3824__auto____7175)
{return or__3824__auto____7175;
} else
{var or__3824__auto____7176 = (cljs.core._nth["_"]);
if(or__3824__auto____7176)
{return or__3824__auto____7176;
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
if((function (){var and__3822__auto____7181 = coll;
if(and__3822__auto____7181)
{return coll.cljs$core$ISeq$_first$arity$1;
} else
{return and__3822__auto____7181;
}
})())
{return coll.cljs$core$ISeq$_first$arity$1(coll);
} else
{var x__3056__auto____7182 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7183 = (cljs.core._first[goog.typeOf(x__3056__auto____7182)]);
if(or__3824__auto____7183)
{return or__3824__auto____7183;
} else
{var or__3824__auto____7184 = (cljs.core._first["_"]);
if(or__3824__auto____7184)
{return or__3824__auto____7184;
} else
{throw cljs.core.missing_protocol.call(null,"ISeq.-first",coll);
}
}
})().call(null,coll);
}
});
cljs.core._rest = (function _rest(coll){
if((function (){var and__3822__auto____7189 = coll;
if(and__3822__auto____7189)
{return coll.cljs$core$ISeq$_rest$arity$1;
} else
{return and__3822__auto____7189;
}
})())
{return coll.cljs$core$ISeq$_rest$arity$1(coll);
} else
{var x__3056__auto____7190 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7191 = (cljs.core._rest[goog.typeOf(x__3056__auto____7190)]);
if(or__3824__auto____7191)
{return or__3824__auto____7191;
} else
{var or__3824__auto____7192 = (cljs.core._rest["_"]);
if(or__3824__auto____7192)
{return or__3824__auto____7192;
} else
{throw cljs.core.missing_protocol.call(null,"ISeq.-rest",coll);
}
}
})().call(null,coll);
}
});
cljs.core.INext = {};
cljs.core._next = (function _next(coll){
if((function (){var and__3822__auto____7197 = coll;
if(and__3822__auto____7197)
{return coll.cljs$core$INext$_next$arity$1;
} else
{return and__3822__auto____7197;
}
})())
{return coll.cljs$core$INext$_next$arity$1(coll);
} else
{var x__3056__auto____7198 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7199 = (cljs.core._next[goog.typeOf(x__3056__auto____7198)]);
if(or__3824__auto____7199)
{return or__3824__auto____7199;
} else
{var or__3824__auto____7200 = (cljs.core._next["_"]);
if(or__3824__auto____7200)
{return or__3824__auto____7200;
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
if((function (){var and__3822__auto____7209 = o;
if(and__3822__auto____7209)
{return o.cljs$core$ILookup$_lookup$arity$2;
} else
{return and__3822__auto____7209;
}
})())
{return o.cljs$core$ILookup$_lookup$arity$2(o,k);
} else
{var x__3056__auto____7210 = (((o == null))?null:o);
return (function (){var or__3824__auto____7211 = (cljs.core._lookup[goog.typeOf(x__3056__auto____7210)]);
if(or__3824__auto____7211)
{return or__3824__auto____7211;
} else
{var or__3824__auto____7212 = (cljs.core._lookup["_"]);
if(or__3824__auto____7212)
{return or__3824__auto____7212;
} else
{throw cljs.core.missing_protocol.call(null,"ILookup.-lookup",o);
}
}
})().call(null,o,k);
}
});
var _lookup__3 = (function (o,k,not_found){
if((function (){var and__3822__auto____7213 = o;
if(and__3822__auto____7213)
{return o.cljs$core$ILookup$_lookup$arity$3;
} else
{return and__3822__auto____7213;
}
})())
{return o.cljs$core$ILookup$_lookup$arity$3(o,k,not_found);
} else
{var x__3056__auto____7214 = (((o == null))?null:o);
return (function (){var or__3824__auto____7215 = (cljs.core._lookup[goog.typeOf(x__3056__auto____7214)]);
if(or__3824__auto____7215)
{return or__3824__auto____7215;
} else
{var or__3824__auto____7216 = (cljs.core._lookup["_"]);
if(or__3824__auto____7216)
{return or__3824__auto____7216;
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
if((function (){var and__3822__auto____7221 = coll;
if(and__3822__auto____7221)
{return coll.cljs$core$IAssociative$_contains_key_QMARK_$arity$2;
} else
{return and__3822__auto____7221;
}
})())
{return coll.cljs$core$IAssociative$_contains_key_QMARK_$arity$2(coll,k);
} else
{var x__3056__auto____7222 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7223 = (cljs.core._contains_key_QMARK_[goog.typeOf(x__3056__auto____7222)]);
if(or__3824__auto____7223)
{return or__3824__auto____7223;
} else
{var or__3824__auto____7224 = (cljs.core._contains_key_QMARK_["_"]);
if(or__3824__auto____7224)
{return or__3824__auto____7224;
} else
{throw cljs.core.missing_protocol.call(null,"IAssociative.-contains-key?",coll);
}
}
})().call(null,coll,k);
}
});
cljs.core._assoc = (function _assoc(coll,k,v){
if((function (){var and__3822__auto____7229 = coll;
if(and__3822__auto____7229)
{return coll.cljs$core$IAssociative$_assoc$arity$3;
} else
{return and__3822__auto____7229;
}
})())
{return coll.cljs$core$IAssociative$_assoc$arity$3(coll,k,v);
} else
{var x__3056__auto____7230 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7231 = (cljs.core._assoc[goog.typeOf(x__3056__auto____7230)]);
if(or__3824__auto____7231)
{return or__3824__auto____7231;
} else
{var or__3824__auto____7232 = (cljs.core._assoc["_"]);
if(or__3824__auto____7232)
{return or__3824__auto____7232;
} else
{throw cljs.core.missing_protocol.call(null,"IAssociative.-assoc",coll);
}
}
})().call(null,coll,k,v);
}
});
cljs.core.IMap = {};
cljs.core._dissoc = (function _dissoc(coll,k){
if((function (){var and__3822__auto____7237 = coll;
if(and__3822__auto____7237)
{return coll.cljs$core$IMap$_dissoc$arity$2;
} else
{return and__3822__auto____7237;
}
})())
{return coll.cljs$core$IMap$_dissoc$arity$2(coll,k);
} else
{var x__3056__auto____7238 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7239 = (cljs.core._dissoc[goog.typeOf(x__3056__auto____7238)]);
if(or__3824__auto____7239)
{return or__3824__auto____7239;
} else
{var or__3824__auto____7240 = (cljs.core._dissoc["_"]);
if(or__3824__auto____7240)
{return or__3824__auto____7240;
} else
{throw cljs.core.missing_protocol.call(null,"IMap.-dissoc",coll);
}
}
})().call(null,coll,k);
}
});
cljs.core.IMapEntry = {};
cljs.core._key = (function _key(coll){
if((function (){var and__3822__auto____7245 = coll;
if(and__3822__auto____7245)
{return coll.cljs$core$IMapEntry$_key$arity$1;
} else
{return and__3822__auto____7245;
}
})())
{return coll.cljs$core$IMapEntry$_key$arity$1(coll);
} else
{var x__3056__auto____7246 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7247 = (cljs.core._key[goog.typeOf(x__3056__auto____7246)]);
if(or__3824__auto____7247)
{return or__3824__auto____7247;
} else
{var or__3824__auto____7248 = (cljs.core._key["_"]);
if(or__3824__auto____7248)
{return or__3824__auto____7248;
} else
{throw cljs.core.missing_protocol.call(null,"IMapEntry.-key",coll);
}
}
})().call(null,coll);
}
});
cljs.core._val = (function _val(coll){
if((function (){var and__3822__auto____7253 = coll;
if(and__3822__auto____7253)
{return coll.cljs$core$IMapEntry$_val$arity$1;
} else
{return and__3822__auto____7253;
}
})())
{return coll.cljs$core$IMapEntry$_val$arity$1(coll);
} else
{var x__3056__auto____7254 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7255 = (cljs.core._val[goog.typeOf(x__3056__auto____7254)]);
if(or__3824__auto____7255)
{return or__3824__auto____7255;
} else
{var or__3824__auto____7256 = (cljs.core._val["_"]);
if(or__3824__auto____7256)
{return or__3824__auto____7256;
} else
{throw cljs.core.missing_protocol.call(null,"IMapEntry.-val",coll);
}
}
})().call(null,coll);
}
});
cljs.core.ISet = {};
cljs.core._disjoin = (function _disjoin(coll,v){
if((function (){var and__3822__auto____7261 = coll;
if(and__3822__auto____7261)
{return coll.cljs$core$ISet$_disjoin$arity$2;
} else
{return and__3822__auto____7261;
}
})())
{return coll.cljs$core$ISet$_disjoin$arity$2(coll,v);
} else
{var x__3056__auto____7262 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7263 = (cljs.core._disjoin[goog.typeOf(x__3056__auto____7262)]);
if(or__3824__auto____7263)
{return or__3824__auto____7263;
} else
{var or__3824__auto____7264 = (cljs.core._disjoin["_"]);
if(or__3824__auto____7264)
{return or__3824__auto____7264;
} else
{throw cljs.core.missing_protocol.call(null,"ISet.-disjoin",coll);
}
}
})().call(null,coll,v);
}
});
cljs.core.IStack = {};
cljs.core._peek = (function _peek(coll){
if((function (){var and__3822__auto____7269 = coll;
if(and__3822__auto____7269)
{return coll.cljs$core$IStack$_peek$arity$1;
} else
{return and__3822__auto____7269;
}
})())
{return coll.cljs$core$IStack$_peek$arity$1(coll);
} else
{var x__3056__auto____7270 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7271 = (cljs.core._peek[goog.typeOf(x__3056__auto____7270)]);
if(or__3824__auto____7271)
{return or__3824__auto____7271;
} else
{var or__3824__auto____7272 = (cljs.core._peek["_"]);
if(or__3824__auto____7272)
{return or__3824__auto____7272;
} else
{throw cljs.core.missing_protocol.call(null,"IStack.-peek",coll);
}
}
})().call(null,coll);
}
});
cljs.core._pop = (function _pop(coll){
if((function (){var and__3822__auto____7277 = coll;
if(and__3822__auto____7277)
{return coll.cljs$core$IStack$_pop$arity$1;
} else
{return and__3822__auto____7277;
}
})())
{return coll.cljs$core$IStack$_pop$arity$1(coll);
} else
{var x__3056__auto____7278 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7279 = (cljs.core._pop[goog.typeOf(x__3056__auto____7278)]);
if(or__3824__auto____7279)
{return or__3824__auto____7279;
} else
{var or__3824__auto____7280 = (cljs.core._pop["_"]);
if(or__3824__auto____7280)
{return or__3824__auto____7280;
} else
{throw cljs.core.missing_protocol.call(null,"IStack.-pop",coll);
}
}
})().call(null,coll);
}
});
cljs.core.IVector = {};
cljs.core._assoc_n = (function _assoc_n(coll,n,val){
if((function (){var and__3822__auto____7285 = coll;
if(and__3822__auto____7285)
{return coll.cljs$core$IVector$_assoc_n$arity$3;
} else
{return and__3822__auto____7285;
}
})())
{return coll.cljs$core$IVector$_assoc_n$arity$3(coll,n,val);
} else
{var x__3056__auto____7286 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7287 = (cljs.core._assoc_n[goog.typeOf(x__3056__auto____7286)]);
if(or__3824__auto____7287)
{return or__3824__auto____7287;
} else
{var or__3824__auto____7288 = (cljs.core._assoc_n["_"]);
if(or__3824__auto____7288)
{return or__3824__auto____7288;
} else
{throw cljs.core.missing_protocol.call(null,"IVector.-assoc-n",coll);
}
}
})().call(null,coll,n,val);
}
});
cljs.core.IDeref = {};
cljs.core._deref = (function _deref(o){
if((function (){var and__3822__auto____7293 = o;
if(and__3822__auto____7293)
{return o.cljs$core$IDeref$_deref$arity$1;
} else
{return and__3822__auto____7293;
}
})())
{return o.cljs$core$IDeref$_deref$arity$1(o);
} else
{var x__3056__auto____7294 = (((o == null))?null:o);
return (function (){var or__3824__auto____7295 = (cljs.core._deref[goog.typeOf(x__3056__auto____7294)]);
if(or__3824__auto____7295)
{return or__3824__auto____7295;
} else
{var or__3824__auto____7296 = (cljs.core._deref["_"]);
if(or__3824__auto____7296)
{return or__3824__auto____7296;
} else
{throw cljs.core.missing_protocol.call(null,"IDeref.-deref",o);
}
}
})().call(null,o);
}
});
cljs.core.IDerefWithTimeout = {};
cljs.core._deref_with_timeout = (function _deref_with_timeout(o,msec,timeout_val){
if((function (){var and__3822__auto____7301 = o;
if(and__3822__auto____7301)
{return o.cljs$core$IDerefWithTimeout$_deref_with_timeout$arity$3;
} else
{return and__3822__auto____7301;
}
})())
{return o.cljs$core$IDerefWithTimeout$_deref_with_timeout$arity$3(o,msec,timeout_val);
} else
{var x__3056__auto____7302 = (((o == null))?null:o);
return (function (){var or__3824__auto____7303 = (cljs.core._deref_with_timeout[goog.typeOf(x__3056__auto____7302)]);
if(or__3824__auto____7303)
{return or__3824__auto____7303;
} else
{var or__3824__auto____7304 = (cljs.core._deref_with_timeout["_"]);
if(or__3824__auto____7304)
{return or__3824__auto____7304;
} else
{throw cljs.core.missing_protocol.call(null,"IDerefWithTimeout.-deref-with-timeout",o);
}
}
})().call(null,o,msec,timeout_val);
}
});
cljs.core.IMeta = {};
cljs.core._meta = (function _meta(o){
if((function (){var and__3822__auto____7309 = o;
if(and__3822__auto____7309)
{return o.cljs$core$IMeta$_meta$arity$1;
} else
{return and__3822__auto____7309;
}
})())
{return o.cljs$core$IMeta$_meta$arity$1(o);
} else
{var x__3056__auto____7310 = (((o == null))?null:o);
return (function (){var or__3824__auto____7311 = (cljs.core._meta[goog.typeOf(x__3056__auto____7310)]);
if(or__3824__auto____7311)
{return or__3824__auto____7311;
} else
{var or__3824__auto____7312 = (cljs.core._meta["_"]);
if(or__3824__auto____7312)
{return or__3824__auto____7312;
} else
{throw cljs.core.missing_protocol.call(null,"IMeta.-meta",o);
}
}
})().call(null,o);
}
});
cljs.core.IWithMeta = {};
cljs.core._with_meta = (function _with_meta(o,meta){
if((function (){var and__3822__auto____7317 = o;
if(and__3822__auto____7317)
{return o.cljs$core$IWithMeta$_with_meta$arity$2;
} else
{return and__3822__auto____7317;
}
})())
{return o.cljs$core$IWithMeta$_with_meta$arity$2(o,meta);
} else
{var x__3056__auto____7318 = (((o == null))?null:o);
return (function (){var or__3824__auto____7319 = (cljs.core._with_meta[goog.typeOf(x__3056__auto____7318)]);
if(or__3824__auto____7319)
{return or__3824__auto____7319;
} else
{var or__3824__auto____7320 = (cljs.core._with_meta["_"]);
if(or__3824__auto____7320)
{return or__3824__auto____7320;
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
if((function (){var and__3822__auto____7329 = coll;
if(and__3822__auto____7329)
{return coll.cljs$core$IReduce$_reduce$arity$2;
} else
{return and__3822__auto____7329;
}
})())
{return coll.cljs$core$IReduce$_reduce$arity$2(coll,f);
} else
{var x__3056__auto____7330 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7331 = (cljs.core._reduce[goog.typeOf(x__3056__auto____7330)]);
if(or__3824__auto____7331)
{return or__3824__auto____7331;
} else
{var or__3824__auto____7332 = (cljs.core._reduce["_"]);
if(or__3824__auto____7332)
{return or__3824__auto____7332;
} else
{throw cljs.core.missing_protocol.call(null,"IReduce.-reduce",coll);
}
}
})().call(null,coll,f);
}
});
var _reduce__3 = (function (coll,f,start){
if((function (){var and__3822__auto____7333 = coll;
if(and__3822__auto____7333)
{return coll.cljs$core$IReduce$_reduce$arity$3;
} else
{return and__3822__auto____7333;
}
})())
{return coll.cljs$core$IReduce$_reduce$arity$3(coll,f,start);
} else
{var x__3056__auto____7334 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7335 = (cljs.core._reduce[goog.typeOf(x__3056__auto____7334)]);
if(or__3824__auto____7335)
{return or__3824__auto____7335;
} else
{var or__3824__auto____7336 = (cljs.core._reduce["_"]);
if(or__3824__auto____7336)
{return or__3824__auto____7336;
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
if((function (){var and__3822__auto____7341 = coll;
if(and__3822__auto____7341)
{return coll.cljs$core$IKVReduce$_kv_reduce$arity$3;
} else
{return and__3822__auto____7341;
}
})())
{return coll.cljs$core$IKVReduce$_kv_reduce$arity$3(coll,f,init);
} else
{var x__3056__auto____7342 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7343 = (cljs.core._kv_reduce[goog.typeOf(x__3056__auto____7342)]);
if(or__3824__auto____7343)
{return or__3824__auto____7343;
} else
{var or__3824__auto____7344 = (cljs.core._kv_reduce["_"]);
if(or__3824__auto____7344)
{return or__3824__auto____7344;
} else
{throw cljs.core.missing_protocol.call(null,"IKVReduce.-kv-reduce",coll);
}
}
})().call(null,coll,f,init);
}
});
cljs.core.IEquiv = {};
cljs.core._equiv = (function _equiv(o,other){
if((function (){var and__3822__auto____7349 = o;
if(and__3822__auto____7349)
{return o.cljs$core$IEquiv$_equiv$arity$2;
} else
{return and__3822__auto____7349;
}
})())
{return o.cljs$core$IEquiv$_equiv$arity$2(o,other);
} else
{var x__3056__auto____7350 = (((o == null))?null:o);
return (function (){var or__3824__auto____7351 = (cljs.core._equiv[goog.typeOf(x__3056__auto____7350)]);
if(or__3824__auto____7351)
{return or__3824__auto____7351;
} else
{var or__3824__auto____7352 = (cljs.core._equiv["_"]);
if(or__3824__auto____7352)
{return or__3824__auto____7352;
} else
{throw cljs.core.missing_protocol.call(null,"IEquiv.-equiv",o);
}
}
})().call(null,o,other);
}
});
cljs.core.IHash = {};
cljs.core._hash = (function _hash(o){
if((function (){var and__3822__auto____7357 = o;
if(and__3822__auto____7357)
{return o.cljs$core$IHash$_hash$arity$1;
} else
{return and__3822__auto____7357;
}
})())
{return o.cljs$core$IHash$_hash$arity$1(o);
} else
{var x__3056__auto____7358 = (((o == null))?null:o);
return (function (){var or__3824__auto____7359 = (cljs.core._hash[goog.typeOf(x__3056__auto____7358)]);
if(or__3824__auto____7359)
{return or__3824__auto____7359;
} else
{var or__3824__auto____7360 = (cljs.core._hash["_"]);
if(or__3824__auto____7360)
{return or__3824__auto____7360;
} else
{throw cljs.core.missing_protocol.call(null,"IHash.-hash",o);
}
}
})().call(null,o);
}
});
cljs.core.ISeqable = {};
cljs.core._seq = (function _seq(o){
if((function (){var and__3822__auto____7365 = o;
if(and__3822__auto____7365)
{return o.cljs$core$ISeqable$_seq$arity$1;
} else
{return and__3822__auto____7365;
}
})())
{return o.cljs$core$ISeqable$_seq$arity$1(o);
} else
{var x__3056__auto____7366 = (((o == null))?null:o);
return (function (){var or__3824__auto____7367 = (cljs.core._seq[goog.typeOf(x__3056__auto____7366)]);
if(or__3824__auto____7367)
{return or__3824__auto____7367;
} else
{var or__3824__auto____7368 = (cljs.core._seq["_"]);
if(or__3824__auto____7368)
{return or__3824__auto____7368;
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
if((function (){var and__3822__auto____7373 = coll;
if(and__3822__auto____7373)
{return coll.cljs$core$IReversible$_rseq$arity$1;
} else
{return and__3822__auto____7373;
}
})())
{return coll.cljs$core$IReversible$_rseq$arity$1(coll);
} else
{var x__3056__auto____7374 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7375 = (cljs.core._rseq[goog.typeOf(x__3056__auto____7374)]);
if(or__3824__auto____7375)
{return or__3824__auto____7375;
} else
{var or__3824__auto____7376 = (cljs.core._rseq["_"]);
if(or__3824__auto____7376)
{return or__3824__auto____7376;
} else
{throw cljs.core.missing_protocol.call(null,"IReversible.-rseq",coll);
}
}
})().call(null,coll);
}
});
cljs.core.ISorted = {};
cljs.core._sorted_seq = (function _sorted_seq(coll,ascending_QMARK_){
if((function (){var and__3822__auto____7381 = coll;
if(and__3822__auto____7381)
{return coll.cljs$core$ISorted$_sorted_seq$arity$2;
} else
{return and__3822__auto____7381;
}
})())
{return coll.cljs$core$ISorted$_sorted_seq$arity$2(coll,ascending_QMARK_);
} else
{var x__3056__auto____7382 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7383 = (cljs.core._sorted_seq[goog.typeOf(x__3056__auto____7382)]);
if(or__3824__auto____7383)
{return or__3824__auto____7383;
} else
{var or__3824__auto____7384 = (cljs.core._sorted_seq["_"]);
if(or__3824__auto____7384)
{return or__3824__auto____7384;
} else
{throw cljs.core.missing_protocol.call(null,"ISorted.-sorted-seq",coll);
}
}
})().call(null,coll,ascending_QMARK_);
}
});
cljs.core._sorted_seq_from = (function _sorted_seq_from(coll,k,ascending_QMARK_){
if((function (){var and__3822__auto____7389 = coll;
if(and__3822__auto____7389)
{return coll.cljs$core$ISorted$_sorted_seq_from$arity$3;
} else
{return and__3822__auto____7389;
}
})())
{return coll.cljs$core$ISorted$_sorted_seq_from$arity$3(coll,k,ascending_QMARK_);
} else
{var x__3056__auto____7390 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7391 = (cljs.core._sorted_seq_from[goog.typeOf(x__3056__auto____7390)]);
if(or__3824__auto____7391)
{return or__3824__auto____7391;
} else
{var or__3824__auto____7392 = (cljs.core._sorted_seq_from["_"]);
if(or__3824__auto____7392)
{return or__3824__auto____7392;
} else
{throw cljs.core.missing_protocol.call(null,"ISorted.-sorted-seq-from",coll);
}
}
})().call(null,coll,k,ascending_QMARK_);
}
});
cljs.core._entry_key = (function _entry_key(coll,entry){
if((function (){var and__3822__auto____7397 = coll;
if(and__3822__auto____7397)
{return coll.cljs$core$ISorted$_entry_key$arity$2;
} else
{return and__3822__auto____7397;
}
})())
{return coll.cljs$core$ISorted$_entry_key$arity$2(coll,entry);
} else
{var x__3056__auto____7398 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7399 = (cljs.core._entry_key[goog.typeOf(x__3056__auto____7398)]);
if(or__3824__auto____7399)
{return or__3824__auto____7399;
} else
{var or__3824__auto____7400 = (cljs.core._entry_key["_"]);
if(or__3824__auto____7400)
{return or__3824__auto____7400;
} else
{throw cljs.core.missing_protocol.call(null,"ISorted.-entry-key",coll);
}
}
})().call(null,coll,entry);
}
});
cljs.core._comparator = (function _comparator(coll){
if((function (){var and__3822__auto____7405 = coll;
if(and__3822__auto____7405)
{return coll.cljs$core$ISorted$_comparator$arity$1;
} else
{return and__3822__auto____7405;
}
})())
{return coll.cljs$core$ISorted$_comparator$arity$1(coll);
} else
{var x__3056__auto____7406 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7407 = (cljs.core._comparator[goog.typeOf(x__3056__auto____7406)]);
if(or__3824__auto____7407)
{return or__3824__auto____7407;
} else
{var or__3824__auto____7408 = (cljs.core._comparator["_"]);
if(or__3824__auto____7408)
{return or__3824__auto____7408;
} else
{throw cljs.core.missing_protocol.call(null,"ISorted.-comparator",coll);
}
}
})().call(null,coll);
}
});
cljs.core.IPrintable = {};
cljs.core._pr_seq = (function _pr_seq(o,opts){
if((function (){var and__3822__auto____7413 = o;
if(and__3822__auto____7413)
{return o.cljs$core$IPrintable$_pr_seq$arity$2;
} else
{return and__3822__auto____7413;
}
})())
{return o.cljs$core$IPrintable$_pr_seq$arity$2(o,opts);
} else
{var x__3056__auto____7414 = (((o == null))?null:o);
return (function (){var or__3824__auto____7415 = (cljs.core._pr_seq[goog.typeOf(x__3056__auto____7414)]);
if(or__3824__auto____7415)
{return or__3824__auto____7415;
} else
{var or__3824__auto____7416 = (cljs.core._pr_seq["_"]);
if(or__3824__auto____7416)
{return or__3824__auto____7416;
} else
{throw cljs.core.missing_protocol.call(null,"IPrintable.-pr-seq",o);
}
}
})().call(null,o,opts);
}
});
cljs.core.IPending = {};
cljs.core._realized_QMARK_ = (function _realized_QMARK_(d){
if((function (){var and__3822__auto____7421 = d;
if(and__3822__auto____7421)
{return d.cljs$core$IPending$_realized_QMARK_$arity$1;
} else
{return and__3822__auto____7421;
}
})())
{return d.cljs$core$IPending$_realized_QMARK_$arity$1(d);
} else
{var x__3056__auto____7422 = (((d == null))?null:d);
return (function (){var or__3824__auto____7423 = (cljs.core._realized_QMARK_[goog.typeOf(x__3056__auto____7422)]);
if(or__3824__auto____7423)
{return or__3824__auto____7423;
} else
{var or__3824__auto____7424 = (cljs.core._realized_QMARK_["_"]);
if(or__3824__auto____7424)
{return or__3824__auto____7424;
} else
{throw cljs.core.missing_protocol.call(null,"IPending.-realized?",d);
}
}
})().call(null,d);
}
});
cljs.core.IWatchable = {};
cljs.core._notify_watches = (function _notify_watches(this$,oldval,newval){
if((function (){var and__3822__auto____7429 = this$;
if(and__3822__auto____7429)
{return this$.cljs$core$IWatchable$_notify_watches$arity$3;
} else
{return and__3822__auto____7429;
}
})())
{return this$.cljs$core$IWatchable$_notify_watches$arity$3(this$,oldval,newval);
} else
{var x__3056__auto____7430 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____7431 = (cljs.core._notify_watches[goog.typeOf(x__3056__auto____7430)]);
if(or__3824__auto____7431)
{return or__3824__auto____7431;
} else
{var or__3824__auto____7432 = (cljs.core._notify_watches["_"]);
if(or__3824__auto____7432)
{return or__3824__auto____7432;
} else
{throw cljs.core.missing_protocol.call(null,"IWatchable.-notify-watches",this$);
}
}
})().call(null,this$,oldval,newval);
}
});
cljs.core._add_watch = (function _add_watch(this$,key,f){
if((function (){var and__3822__auto____7437 = this$;
if(and__3822__auto____7437)
{return this$.cljs$core$IWatchable$_add_watch$arity$3;
} else
{return and__3822__auto____7437;
}
})())
{return this$.cljs$core$IWatchable$_add_watch$arity$3(this$,key,f);
} else
{var x__3056__auto____7438 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____7439 = (cljs.core._add_watch[goog.typeOf(x__3056__auto____7438)]);
if(or__3824__auto____7439)
{return or__3824__auto____7439;
} else
{var or__3824__auto____7440 = (cljs.core._add_watch["_"]);
if(or__3824__auto____7440)
{return or__3824__auto____7440;
} else
{throw cljs.core.missing_protocol.call(null,"IWatchable.-add-watch",this$);
}
}
})().call(null,this$,key,f);
}
});
cljs.core._remove_watch = (function _remove_watch(this$,key){
if((function (){var and__3822__auto____7445 = this$;
if(and__3822__auto____7445)
{return this$.cljs$core$IWatchable$_remove_watch$arity$2;
} else
{return and__3822__auto____7445;
}
})())
{return this$.cljs$core$IWatchable$_remove_watch$arity$2(this$,key);
} else
{var x__3056__auto____7446 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____7447 = (cljs.core._remove_watch[goog.typeOf(x__3056__auto____7446)]);
if(or__3824__auto____7447)
{return or__3824__auto____7447;
} else
{var or__3824__auto____7448 = (cljs.core._remove_watch["_"]);
if(or__3824__auto____7448)
{return or__3824__auto____7448;
} else
{throw cljs.core.missing_protocol.call(null,"IWatchable.-remove-watch",this$);
}
}
})().call(null,this$,key);
}
});
cljs.core.IEditableCollection = {};
cljs.core._as_transient = (function _as_transient(coll){
if((function (){var and__3822__auto____7453 = coll;
if(and__3822__auto____7453)
{return coll.cljs$core$IEditableCollection$_as_transient$arity$1;
} else
{return and__3822__auto____7453;
}
})())
{return coll.cljs$core$IEditableCollection$_as_transient$arity$1(coll);
} else
{var x__3056__auto____7454 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7455 = (cljs.core._as_transient[goog.typeOf(x__3056__auto____7454)]);
if(or__3824__auto____7455)
{return or__3824__auto____7455;
} else
{var or__3824__auto____7456 = (cljs.core._as_transient["_"]);
if(or__3824__auto____7456)
{return or__3824__auto____7456;
} else
{throw cljs.core.missing_protocol.call(null,"IEditableCollection.-as-transient",coll);
}
}
})().call(null,coll);
}
});
cljs.core.ITransientCollection = {};
cljs.core._conj_BANG_ = (function _conj_BANG_(tcoll,val){
if((function (){var and__3822__auto____7461 = tcoll;
if(and__3822__auto____7461)
{return tcoll.cljs$core$ITransientCollection$_conj_BANG_$arity$2;
} else
{return and__3822__auto____7461;
}
})())
{return tcoll.cljs$core$ITransientCollection$_conj_BANG_$arity$2(tcoll,val);
} else
{var x__3056__auto____7462 = (((tcoll == null))?null:tcoll);
return (function (){var or__3824__auto____7463 = (cljs.core._conj_BANG_[goog.typeOf(x__3056__auto____7462)]);
if(or__3824__auto____7463)
{return or__3824__auto____7463;
} else
{var or__3824__auto____7464 = (cljs.core._conj_BANG_["_"]);
if(or__3824__auto____7464)
{return or__3824__auto____7464;
} else
{throw cljs.core.missing_protocol.call(null,"ITransientCollection.-conj!",tcoll);
}
}
})().call(null,tcoll,val);
}
});
cljs.core._persistent_BANG_ = (function _persistent_BANG_(tcoll){
if((function (){var and__3822__auto____7469 = tcoll;
if(and__3822__auto____7469)
{return tcoll.cljs$core$ITransientCollection$_persistent_BANG_$arity$1;
} else
{return and__3822__auto____7469;
}
})())
{return tcoll.cljs$core$ITransientCollection$_persistent_BANG_$arity$1(tcoll);
} else
{var x__3056__auto____7470 = (((tcoll == null))?null:tcoll);
return (function (){var or__3824__auto____7471 = (cljs.core._persistent_BANG_[goog.typeOf(x__3056__auto____7470)]);
if(or__3824__auto____7471)
{return or__3824__auto____7471;
} else
{var or__3824__auto____7472 = (cljs.core._persistent_BANG_["_"]);
if(or__3824__auto____7472)
{return or__3824__auto____7472;
} else
{throw cljs.core.missing_protocol.call(null,"ITransientCollection.-persistent!",tcoll);
}
}
})().call(null,tcoll);
}
});
cljs.core.ITransientAssociative = {};
cljs.core._assoc_BANG_ = (function _assoc_BANG_(tcoll,key,val){
if((function (){var and__3822__auto____7477 = tcoll;
if(and__3822__auto____7477)
{return tcoll.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3;
} else
{return and__3822__auto____7477;
}
})())
{return tcoll.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3(tcoll,key,val);
} else
{var x__3056__auto____7478 = (((tcoll == null))?null:tcoll);
return (function (){var or__3824__auto____7479 = (cljs.core._assoc_BANG_[goog.typeOf(x__3056__auto____7478)]);
if(or__3824__auto____7479)
{return or__3824__auto____7479;
} else
{var or__3824__auto____7480 = (cljs.core._assoc_BANG_["_"]);
if(or__3824__auto____7480)
{return or__3824__auto____7480;
} else
{throw cljs.core.missing_protocol.call(null,"ITransientAssociative.-assoc!",tcoll);
}
}
})().call(null,tcoll,key,val);
}
});
cljs.core.ITransientMap = {};
cljs.core._dissoc_BANG_ = (function _dissoc_BANG_(tcoll,key){
if((function (){var and__3822__auto____7485 = tcoll;
if(and__3822__auto____7485)
{return tcoll.cljs$core$ITransientMap$_dissoc_BANG_$arity$2;
} else
{return and__3822__auto____7485;
}
})())
{return tcoll.cljs$core$ITransientMap$_dissoc_BANG_$arity$2(tcoll,key);
} else
{var x__3056__auto____7486 = (((tcoll == null))?null:tcoll);
return (function (){var or__3824__auto____7487 = (cljs.core._dissoc_BANG_[goog.typeOf(x__3056__auto____7486)]);
if(or__3824__auto____7487)
{return or__3824__auto____7487;
} else
{var or__3824__auto____7488 = (cljs.core._dissoc_BANG_["_"]);
if(or__3824__auto____7488)
{return or__3824__auto____7488;
} else
{throw cljs.core.missing_protocol.call(null,"ITransientMap.-dissoc!",tcoll);
}
}
})().call(null,tcoll,key);
}
});
cljs.core.ITransientVector = {};
cljs.core._assoc_n_BANG_ = (function _assoc_n_BANG_(tcoll,n,val){
if((function (){var and__3822__auto____7493 = tcoll;
if(and__3822__auto____7493)
{return tcoll.cljs$core$ITransientVector$_assoc_n_BANG_$arity$3;
} else
{return and__3822__auto____7493;
}
})())
{return tcoll.cljs$core$ITransientVector$_assoc_n_BANG_$arity$3(tcoll,n,val);
} else
{var x__3056__auto____7494 = (((tcoll == null))?null:tcoll);
return (function (){var or__3824__auto____7495 = (cljs.core._assoc_n_BANG_[goog.typeOf(x__3056__auto____7494)]);
if(or__3824__auto____7495)
{return or__3824__auto____7495;
} else
{var or__3824__auto____7496 = (cljs.core._assoc_n_BANG_["_"]);
if(or__3824__auto____7496)
{return or__3824__auto____7496;
} else
{throw cljs.core.missing_protocol.call(null,"ITransientVector.-assoc-n!",tcoll);
}
}
})().call(null,tcoll,n,val);
}
});
cljs.core._pop_BANG_ = (function _pop_BANG_(tcoll){
if((function (){var and__3822__auto____7501 = tcoll;
if(and__3822__auto____7501)
{return tcoll.cljs$core$ITransientVector$_pop_BANG_$arity$1;
} else
{return and__3822__auto____7501;
}
})())
{return tcoll.cljs$core$ITransientVector$_pop_BANG_$arity$1(tcoll);
} else
{var x__3056__auto____7502 = (((tcoll == null))?null:tcoll);
return (function (){var or__3824__auto____7503 = (cljs.core._pop_BANG_[goog.typeOf(x__3056__auto____7502)]);
if(or__3824__auto____7503)
{return or__3824__auto____7503;
} else
{var or__3824__auto____7504 = (cljs.core._pop_BANG_["_"]);
if(or__3824__auto____7504)
{return or__3824__auto____7504;
} else
{throw cljs.core.missing_protocol.call(null,"ITransientVector.-pop!",tcoll);
}
}
})().call(null,tcoll);
}
});
cljs.core.ITransientSet = {};
cljs.core._disjoin_BANG_ = (function _disjoin_BANG_(tcoll,v){
if((function (){var and__3822__auto____7509 = tcoll;
if(and__3822__auto____7509)
{return tcoll.cljs$core$ITransientSet$_disjoin_BANG_$arity$2;
} else
{return and__3822__auto____7509;
}
})())
{return tcoll.cljs$core$ITransientSet$_disjoin_BANG_$arity$2(tcoll,v);
} else
{var x__3056__auto____7510 = (((tcoll == null))?null:tcoll);
return (function (){var or__3824__auto____7511 = (cljs.core._disjoin_BANG_[goog.typeOf(x__3056__auto____7510)]);
if(or__3824__auto____7511)
{return or__3824__auto____7511;
} else
{var or__3824__auto____7512 = (cljs.core._disjoin_BANG_["_"]);
if(or__3824__auto____7512)
{return or__3824__auto____7512;
} else
{throw cljs.core.missing_protocol.call(null,"ITransientSet.-disjoin!",tcoll);
}
}
})().call(null,tcoll,v);
}
});
cljs.core.IComparable = {};
cljs.core._compare = (function _compare(x,y){
if((function (){var and__3822__auto____7517 = x;
if(and__3822__auto____7517)
{return x.cljs$core$IComparable$_compare$arity$2;
} else
{return and__3822__auto____7517;
}
})())
{return x.cljs$core$IComparable$_compare$arity$2(x,y);
} else
{var x__3056__auto____7518 = (((x == null))?null:x);
return (function (){var or__3824__auto____7519 = (cljs.core._compare[goog.typeOf(x__3056__auto____7518)]);
if(or__3824__auto____7519)
{return or__3824__auto____7519;
} else
{var or__3824__auto____7520 = (cljs.core._compare["_"]);
if(or__3824__auto____7520)
{return or__3824__auto____7520;
} else
{throw cljs.core.missing_protocol.call(null,"IComparable.-compare",x);
}
}
})().call(null,x,y);
}
});
cljs.core.IChunk = {};
cljs.core._drop_first = (function _drop_first(coll){
if((function (){var and__3822__auto____7525 = coll;
if(and__3822__auto____7525)
{return coll.cljs$core$IChunk$_drop_first$arity$1;
} else
{return and__3822__auto____7525;
}
})())
{return coll.cljs$core$IChunk$_drop_first$arity$1(coll);
} else
{var x__3056__auto____7526 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7527 = (cljs.core._drop_first[goog.typeOf(x__3056__auto____7526)]);
if(or__3824__auto____7527)
{return or__3824__auto____7527;
} else
{var or__3824__auto____7528 = (cljs.core._drop_first["_"]);
if(or__3824__auto____7528)
{return or__3824__auto____7528;
} else
{throw cljs.core.missing_protocol.call(null,"IChunk.-drop-first",coll);
}
}
})().call(null,coll);
}
});
cljs.core.IChunkedSeq = {};
cljs.core._chunked_first = (function _chunked_first(coll){
if((function (){var and__3822__auto____7533 = coll;
if(and__3822__auto____7533)
{return coll.cljs$core$IChunkedSeq$_chunked_first$arity$1;
} else
{return and__3822__auto____7533;
}
})())
{return coll.cljs$core$IChunkedSeq$_chunked_first$arity$1(coll);
} else
{var x__3056__auto____7534 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7535 = (cljs.core._chunked_first[goog.typeOf(x__3056__auto____7534)]);
if(or__3824__auto____7535)
{return or__3824__auto____7535;
} else
{var or__3824__auto____7536 = (cljs.core._chunked_first["_"]);
if(or__3824__auto____7536)
{return or__3824__auto____7536;
} else
{throw cljs.core.missing_protocol.call(null,"IChunkedSeq.-chunked-first",coll);
}
}
})().call(null,coll);
}
});
cljs.core._chunked_rest = (function _chunked_rest(coll){
if((function (){var and__3822__auto____7541 = coll;
if(and__3822__auto____7541)
{return coll.cljs$core$IChunkedSeq$_chunked_rest$arity$1;
} else
{return and__3822__auto____7541;
}
})())
{return coll.cljs$core$IChunkedSeq$_chunked_rest$arity$1(coll);
} else
{var x__3056__auto____7542 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7543 = (cljs.core._chunked_rest[goog.typeOf(x__3056__auto____7542)]);
if(or__3824__auto____7543)
{return or__3824__auto____7543;
} else
{var or__3824__auto____7544 = (cljs.core._chunked_rest["_"]);
if(or__3824__auto____7544)
{return or__3824__auto____7544;
} else
{throw cljs.core.missing_protocol.call(null,"IChunkedSeq.-chunked-rest",coll);
}
}
})().call(null,coll);
}
});
cljs.core.IChunkedNext = {};
cljs.core._chunked_next = (function _chunked_next(coll){
if((function (){var and__3822__auto____7549 = coll;
if(and__3822__auto____7549)
{return coll.cljs$core$IChunkedNext$_chunked_next$arity$1;
} else
{return and__3822__auto____7549;
}
})())
{return coll.cljs$core$IChunkedNext$_chunked_next$arity$1(coll);
} else
{var x__3056__auto____7550 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7551 = (cljs.core._chunked_next[goog.typeOf(x__3056__auto____7550)]);
if(or__3824__auto____7551)
{return or__3824__auto____7551;
} else
{var or__3824__auto____7552 = (cljs.core._chunked_next["_"]);
if(or__3824__auto____7552)
{return or__3824__auto____7552;
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
var or__3824__auto____7554 = (x === y);
if(or__3824__auto____7554)
{return or__3824__auto____7554;
} else
{return cljs.core._equiv.call(null,x,y);
}
});
var _EQ___3 = (function() { 
var G__7555__delegate = function (x,y,more){
while(true){
if(cljs.core.truth_(_EQ_.call(null,x,y)))
{if(cljs.core.next.call(null,more))
{{
var G__7556 = y;
var G__7557 = cljs.core.first.call(null,more);
var G__7558 = cljs.core.next.call(null,more);
x = G__7556;
y = G__7557;
more = G__7558;
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
var G__7555 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7555__delegate.call(this, x, y, more);
};
G__7555.cljs$lang$maxFixedArity = 2;
G__7555.cljs$lang$applyTo = (function (arglist__7559){
var x = cljs.core.first(arglist__7559);
var y = cljs.core.first(cljs.core.next(arglist__7559));
var more = cljs.core.rest(cljs.core.next(arglist__7559));
return G__7555__delegate(x, y, more);
});
G__7555.cljs$lang$arity$variadic = G__7555__delegate;
return G__7555;
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
var G__7560 = null;
var G__7560__2 = (function (o,k){
return null;
});
var G__7560__3 = (function (o,k,not_found){
return not_found;
});
G__7560 = function(o,k,not_found){
switch(arguments.length){
case 2:
return G__7560__2.call(this,o,k);
case 3:
return G__7560__3.call(this,o,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__7560;
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
var G__7561 = null;
var G__7561__2 = (function (_,f){
return f.call(null);
});
var G__7561__3 = (function (_,f,start){
return start;
});
G__7561 = function(_,f,start){
switch(arguments.length){
case 2:
return G__7561__2.call(this,_,f);
case 3:
return G__7561__3.call(this,_,f,start);
}
throw('Invalid arity: ' + arguments.length);
};
return G__7561;
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
var G__7562 = null;
var G__7562__2 = (function (_,n){
return null;
});
var G__7562__3 = (function (_,n,not_found){
return not_found;
});
G__7562 = function(_,n,not_found){
switch(arguments.length){
case 2:
return G__7562__2.call(this,_,n);
case 3:
return G__7562__3.call(this,_,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__7562;
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
var and__3822__auto____7563 = cljs.core.instance_QMARK_.call(null,Date,other);
if(and__3822__auto____7563)
{return (o.toString() === other.toString());
} else
{return and__3822__auto____7563;
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
var cnt__7576 = cljs.core._count.call(null,cicoll);
if((cnt__7576 === 0))
{return f.call(null);
} else
{var val__7577 = cljs.core._nth.call(null,cicoll,0);
var n__7578 = 1;
while(true){
if((n__7578 < cnt__7576))
{var nval__7579 = f.call(null,val__7577,cljs.core._nth.call(null,cicoll,n__7578));
if(cljs.core.reduced_QMARK_.call(null,nval__7579))
{return cljs.core.deref.call(null,nval__7579);
} else
{{
var G__7588 = nval__7579;
var G__7589 = (n__7578 + 1);
val__7577 = G__7588;
n__7578 = G__7589;
continue;
}
}
} else
{return val__7577;
}
break;
}
}
});
var ci_reduce__3 = (function (cicoll,f,val){
var cnt__7580 = cljs.core._count.call(null,cicoll);
var val__7581 = val;
var n__7582 = 0;
while(true){
if((n__7582 < cnt__7580))
{var nval__7583 = f.call(null,val__7581,cljs.core._nth.call(null,cicoll,n__7582));
if(cljs.core.reduced_QMARK_.call(null,nval__7583))
{return cljs.core.deref.call(null,nval__7583);
} else
{{
var G__7590 = nval__7583;
var G__7591 = (n__7582 + 1);
val__7581 = G__7590;
n__7582 = G__7591;
continue;
}
}
} else
{return val__7581;
}
break;
}
});
var ci_reduce__4 = (function (cicoll,f,val,idx){
var cnt__7584 = cljs.core._count.call(null,cicoll);
var val__7585 = val;
var n__7586 = idx;
while(true){
if((n__7586 < cnt__7584))
{var nval__7587 = f.call(null,val__7585,cljs.core._nth.call(null,cicoll,n__7586));
if(cljs.core.reduced_QMARK_.call(null,nval__7587))
{return cljs.core.deref.call(null,nval__7587);
} else
{{
var G__7592 = nval__7587;
var G__7593 = (n__7586 + 1);
val__7585 = G__7592;
n__7586 = G__7593;
continue;
}
}
} else
{return val__7585;
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
var cnt__7606 = arr.length;
if((arr.length === 0))
{return f.call(null);
} else
{var val__7607 = (arr[0]);
var n__7608 = 1;
while(true){
if((n__7608 < cnt__7606))
{var nval__7609 = f.call(null,val__7607,(arr[n__7608]));
if(cljs.core.reduced_QMARK_.call(null,nval__7609))
{return cljs.core.deref.call(null,nval__7609);
} else
{{
var G__7618 = nval__7609;
var G__7619 = (n__7608 + 1);
val__7607 = G__7618;
n__7608 = G__7619;
continue;
}
}
} else
{return val__7607;
}
break;
}
}
});
var array_reduce__3 = (function (arr,f,val){
var cnt__7610 = arr.length;
var val__7611 = val;
var n__7612 = 0;
while(true){
if((n__7612 < cnt__7610))
{var nval__7613 = f.call(null,val__7611,(arr[n__7612]));
if(cljs.core.reduced_QMARK_.call(null,nval__7613))
{return cljs.core.deref.call(null,nval__7613);
} else
{{
var G__7620 = nval__7613;
var G__7621 = (n__7612 + 1);
val__7611 = G__7620;
n__7612 = G__7621;
continue;
}
}
} else
{return val__7611;
}
break;
}
});
var array_reduce__4 = (function (arr,f,val,idx){
var cnt__7614 = arr.length;
var val__7615 = val;
var n__7616 = idx;
while(true){
if((n__7616 < cnt__7614))
{var nval__7617 = f.call(null,val__7615,(arr[n__7616]));
if(cljs.core.reduced_QMARK_.call(null,nval__7617))
{return cljs.core.deref.call(null,nval__7617);
} else
{{
var G__7622 = nval__7617;
var G__7623 = (n__7616 + 1);
val__7615 = G__7622;
n__7616 = G__7623;
continue;
}
}
} else
{return val__7615;
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
cljs.core.IndexedSeq.cljs$lang$ctorPrSeq = (function (this__3002__auto__){
return cljs.core.list.call(null,"cljs.core/IndexedSeq");
});
cljs.core.IndexedSeq.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__7624 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.IndexedSeq.prototype.cljs$core$INext$_next$arity$1 = (function (_){
var this__7625 = this;
if(((this__7625.i + 1) < this__7625.a.length))
{return (new cljs.core.IndexedSeq(this__7625.a,(this__7625.i + 1)));
} else
{return null;
}
});
cljs.core.IndexedSeq.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__7626 = this;
return cljs.core.cons.call(null,o,coll);
});
cljs.core.IndexedSeq.prototype.cljs$core$IReversible$_rseq$arity$1 = (function (coll){
var this__7627 = this;
var c__7628 = coll.cljs$core$ICounted$_count$arity$1(coll);
if((c__7628 > 0))
{return (new cljs.core.RSeq(coll,(c__7628 - 1),null));
} else
{return cljs.core.List.EMPTY;
}
});
cljs.core.IndexedSeq.prototype.toString = (function (){
var this__7629 = this;
var this__7630 = this;
return cljs.core.pr_str.call(null,this__7630);
});
cljs.core.IndexedSeq.prototype.cljs$core$IReduce$_reduce$arity$2 = (function (coll,f){
var this__7631 = this;
if(cljs.core.counted_QMARK_.call(null,this__7631.a))
{return cljs.core.ci_reduce.call(null,this__7631.a,f,(this__7631.a[this__7631.i]),(this__7631.i + 1));
} else
{return cljs.core.ci_reduce.call(null,coll,f,(this__7631.a[this__7631.i]),0);
}
});
cljs.core.IndexedSeq.prototype.cljs$core$IReduce$_reduce$arity$3 = (function (coll,f,start){
var this__7632 = this;
if(cljs.core.counted_QMARK_.call(null,this__7632.a))
{return cljs.core.ci_reduce.call(null,this__7632.a,f,start,this__7632.i);
} else
{return cljs.core.ci_reduce.call(null,coll,f,start,0);
}
});
cljs.core.IndexedSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this$){
var this__7633 = this;
return this$;
});
cljs.core.IndexedSeq.prototype.cljs$core$ICounted$_count$arity$1 = (function (_){
var this__7634 = this;
return (this__7634.a.length - this__7634.i);
});
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$_first$arity$1 = (function (_){
var this__7635 = this;
return (this__7635.a[this__7635.i]);
});
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$_rest$arity$1 = (function (_){
var this__7636 = this;
if(((this__7636.i + 1) < this__7636.a.length))
{return (new cljs.core.IndexedSeq(this__7636.a,(this__7636.i + 1)));
} else
{return cljs.core.list.call(null);
}
});
cljs.core.IndexedSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__7637 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.IndexedSeq.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (coll,n){
var this__7638 = this;
var i__7639 = (n + this__7638.i);
if((i__7639 < this__7638.a.length))
{return (this__7638.a[i__7639]);
} else
{return null;
}
});
cljs.core.IndexedSeq.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (coll,n,not_found){
var this__7640 = this;
var i__7641 = (n + this__7640.i);
if((i__7641 < this__7640.a.length))
{return (this__7640.a[i__7641]);
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
var G__7642 = null;
var G__7642__2 = (function (array,f){
return cljs.core.ci_reduce.call(null,array,f);
});
var G__7642__3 = (function (array,f,start){
return cljs.core.ci_reduce.call(null,array,f,start);
});
G__7642 = function(array,f,start){
switch(arguments.length){
case 2:
return G__7642__2.call(this,array,f);
case 3:
return G__7642__3.call(this,array,f,start);
}
throw('Invalid arity: ' + arguments.length);
};
return G__7642;
})()
);
(cljs.core.ILookup["array"] = true);
(cljs.core._lookup["array"] = (function() {
var G__7643 = null;
var G__7643__2 = (function (array,k){
return (array[k]);
});
var G__7643__3 = (function (array,k,not_found){
return cljs.core._nth.call(null,array,k,not_found);
});
G__7643 = function(array,k,not_found){
switch(arguments.length){
case 2:
return G__7643__2.call(this,array,k);
case 3:
return G__7643__3.call(this,array,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__7643;
})()
);
(cljs.core.IIndexed["array"] = true);
(cljs.core._nth["array"] = (function() {
var G__7644 = null;
var G__7644__2 = (function (array,n){
if((n < array.length))
{return (array[n]);
} else
{return null;
}
});
var G__7644__3 = (function (array,n,not_found){
if((n < array.length))
{return (array[n]);
} else
{return not_found;
}
});
G__7644 = function(array,n,not_found){
switch(arguments.length){
case 2:
return G__7644__2.call(this,array,n);
case 3:
return G__7644__3.call(this,array,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__7644;
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
cljs.core.RSeq.cljs$lang$ctorPrSeq = (function (this__3002__auto__){
return cljs.core.list.call(null,"cljs.core/RSeq");
});
cljs.core.RSeq.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__7645 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.RSeq.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__7646 = this;
return cljs.core.cons.call(null,o,coll);
});
cljs.core.RSeq.prototype.toString = (function (){
var this__7647 = this;
var this__7648 = this;
return cljs.core.pr_str.call(null,this__7648);
});
cljs.core.RSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__7649 = this;
return coll;
});
cljs.core.RSeq.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__7650 = this;
return (this__7650.i + 1);
});
cljs.core.RSeq.prototype.cljs$core$ISeq$_first$arity$1 = (function (coll){
var this__7651 = this;
return cljs.core._nth.call(null,this__7651.ci,this__7651.i);
});
cljs.core.RSeq.prototype.cljs$core$ISeq$_rest$arity$1 = (function (coll){
var this__7652 = this;
if((this__7652.i > 0))
{return (new cljs.core.RSeq(this__7652.ci,(this__7652.i - 1),null));
} else
{return cljs.core.List.EMPTY;
}
});
cljs.core.RSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__7653 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.RSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,new_meta){
var this__7654 = this;
return (new cljs.core.RSeq(this__7654.ci,this__7654.i,new_meta));
});
cljs.core.RSeq.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__7655 = this;
return this__7655.meta;
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
{if((function (){var G__7659__7660 = coll;
if(G__7659__7660)
{if((function (){var or__3824__auto____7661 = (G__7659__7660.cljs$lang$protocol_mask$partition0$ & 32);
if(or__3824__auto____7661)
{return or__3824__auto____7661;
} else
{return G__7659__7660.cljs$core$ASeq$;
}
})())
{return true;
} else
{if((!G__7659__7660.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ASeq,G__7659__7660);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ASeq,G__7659__7660);
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
{if((function (){var G__7666__7667 = coll;
if(G__7666__7667)
{if((function (){var or__3824__auto____7668 = (G__7666__7667.cljs$lang$protocol_mask$partition0$ & 64);
if(or__3824__auto____7668)
{return or__3824__auto____7668;
} else
{return G__7666__7667.cljs$core$ISeq$;
}
})())
{return true;
} else
{if((!G__7666__7667.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeq,G__7666__7667);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeq,G__7666__7667);
}
})())
{return cljs.core._first.call(null,coll);
} else
{var s__7669 = cljs.core.seq.call(null,coll);
if((s__7669 == null))
{return null;
} else
{return cljs.core._first.call(null,s__7669);
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
{if((function (){var G__7674__7675 = coll;
if(G__7674__7675)
{if((function (){var or__3824__auto____7676 = (G__7674__7675.cljs$lang$protocol_mask$partition0$ & 64);
if(or__3824__auto____7676)
{return or__3824__auto____7676;
} else
{return G__7674__7675.cljs$core$ISeq$;
}
})())
{return true;
} else
{if((!G__7674__7675.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeq,G__7674__7675);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeq,G__7674__7675);
}
})())
{return cljs.core._rest.call(null,coll);
} else
{var s__7677 = cljs.core.seq.call(null,coll);
if(!((s__7677 == null)))
{return cljs.core._rest.call(null,s__7677);
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
{if((function (){var G__7681__7682 = coll;
if(G__7681__7682)
{if((function (){var or__3824__auto____7683 = (G__7681__7682.cljs$lang$protocol_mask$partition0$ & 128);
if(or__3824__auto____7683)
{return or__3824__auto____7683;
} else
{return G__7681__7682.cljs$core$INext$;
}
})())
{return true;
} else
{if((!G__7681__7682.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.INext,G__7681__7682);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.INext,G__7681__7682);
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
var sn__7685 = cljs.core.next.call(null,s);
if(!((sn__7685 == null)))
{{
var G__7686 = sn__7685;
s = G__7686;
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
var G__7687__delegate = function (coll,x,xs){
while(true){
if(cljs.core.truth_(xs))
{{
var G__7688 = conj.call(null,coll,x);
var G__7689 = cljs.core.first.call(null,xs);
var G__7690 = cljs.core.next.call(null,xs);
coll = G__7688;
x = G__7689;
xs = G__7690;
continue;
}
} else
{return conj.call(null,coll,x);
}
break;
}
};
var G__7687 = function (coll,x,var_args){
var xs = null;
if (goog.isDef(var_args)) {
  xs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7687__delegate.call(this, coll, x, xs);
};
G__7687.cljs$lang$maxFixedArity = 2;
G__7687.cljs$lang$applyTo = (function (arglist__7691){
var coll = cljs.core.first(arglist__7691);
var x = cljs.core.first(cljs.core.next(arglist__7691));
var xs = cljs.core.rest(cljs.core.next(arglist__7691));
return G__7687__delegate(coll, x, xs);
});
G__7687.cljs$lang$arity$variadic = G__7687__delegate;
return G__7687;
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
var s__7694 = cljs.core.seq.call(null,coll);
var acc__7695 = 0;
while(true){
if(cljs.core.counted_QMARK_.call(null,s__7694))
{return (acc__7695 + cljs.core._count.call(null,s__7694));
} else
{{
var G__7696 = cljs.core.next.call(null,s__7694);
var G__7697 = (acc__7695 + 1);
s__7694 = G__7696;
acc__7695 = G__7697;
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
{if((function (){var G__7704__7705 = coll;
if(G__7704__7705)
{if((function (){var or__3824__auto____7706 = (G__7704__7705.cljs$lang$protocol_mask$partition0$ & 16);
if(or__3824__auto____7706)
{return or__3824__auto____7706;
} else
{return G__7704__7705.cljs$core$IIndexed$;
}
})())
{return true;
} else
{if((!G__7704__7705.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IIndexed,G__7704__7705);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IIndexed,G__7704__7705);
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
{if((function (){var G__7707__7708 = coll;
if(G__7707__7708)
{if((function (){var or__3824__auto____7709 = (G__7707__7708.cljs$lang$protocol_mask$partition0$ & 16);
if(or__3824__auto____7709)
{return or__3824__auto____7709;
} else
{return G__7707__7708.cljs$core$IIndexed$;
}
})())
{return true;
} else
{if((!G__7707__7708.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IIndexed,G__7707__7708);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IIndexed,G__7707__7708);
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
var G__7712__delegate = function (coll,k,v,kvs){
while(true){
var ret__7711 = assoc.call(null,coll,k,v);
if(cljs.core.truth_(kvs))
{{
var G__7713 = ret__7711;
var G__7714 = cljs.core.first.call(null,kvs);
var G__7715 = cljs.core.second.call(null,kvs);
var G__7716 = cljs.core.nnext.call(null,kvs);
coll = G__7713;
k = G__7714;
v = G__7715;
kvs = G__7716;
continue;
}
} else
{return ret__7711;
}
break;
}
};
var G__7712 = function (coll,k,v,var_args){
var kvs = null;
if (goog.isDef(var_args)) {
  kvs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__7712__delegate.call(this, coll, k, v, kvs);
};
G__7712.cljs$lang$maxFixedArity = 3;
G__7712.cljs$lang$applyTo = (function (arglist__7717){
var coll = cljs.core.first(arglist__7717);
var k = cljs.core.first(cljs.core.next(arglist__7717));
var v = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7717)));
var kvs = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7717)));
return G__7712__delegate(coll, k, v, kvs);
});
G__7712.cljs$lang$arity$variadic = G__7712__delegate;
return G__7712;
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
var G__7720__delegate = function (coll,k,ks){
while(true){
var ret__7719 = dissoc.call(null,coll,k);
if(cljs.core.truth_(ks))
{{
var G__7721 = ret__7719;
var G__7722 = cljs.core.first.call(null,ks);
var G__7723 = cljs.core.next.call(null,ks);
coll = G__7721;
k = G__7722;
ks = G__7723;
continue;
}
} else
{return ret__7719;
}
break;
}
};
var G__7720 = function (coll,k,var_args){
var ks = null;
if (goog.isDef(var_args)) {
  ks = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7720__delegate.call(this, coll, k, ks);
};
G__7720.cljs$lang$maxFixedArity = 2;
G__7720.cljs$lang$applyTo = (function (arglist__7724){
var coll = cljs.core.first(arglist__7724);
var k = cljs.core.first(cljs.core.next(arglist__7724));
var ks = cljs.core.rest(cljs.core.next(arglist__7724));
return G__7720__delegate(coll, k, ks);
});
G__7720.cljs$lang$arity$variadic = G__7720__delegate;
return G__7720;
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
if((function (){var G__7728__7729 = o;
if(G__7728__7729)
{if((function (){var or__3824__auto____7730 = (G__7728__7729.cljs$lang$protocol_mask$partition0$ & 131072);
if(or__3824__auto____7730)
{return or__3824__auto____7730;
} else
{return G__7728__7729.cljs$core$IMeta$;
}
})())
{return true;
} else
{if((!G__7728__7729.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IMeta,G__7728__7729);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IMeta,G__7728__7729);
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
var G__7733__delegate = function (coll,k,ks){
while(true){
var ret__7732 = disj.call(null,coll,k);
if(cljs.core.truth_(ks))
{{
var G__7734 = ret__7732;
var G__7735 = cljs.core.first.call(null,ks);
var G__7736 = cljs.core.next.call(null,ks);
coll = G__7734;
k = G__7735;
ks = G__7736;
continue;
}
} else
{return ret__7732;
}
break;
}
};
var G__7733 = function (coll,k,var_args){
var ks = null;
if (goog.isDef(var_args)) {
  ks = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7733__delegate.call(this, coll, k, ks);
};
G__7733.cljs$lang$maxFixedArity = 2;
G__7733.cljs$lang$applyTo = (function (arglist__7737){
var coll = cljs.core.first(arglist__7737);
var k = cljs.core.first(cljs.core.next(arglist__7737));
var ks = cljs.core.rest(cljs.core.next(arglist__7737));
return G__7733__delegate(coll, k, ks);
});
G__7733.cljs$lang$arity$variadic = G__7733__delegate;
return G__7733;
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
var h__7739 = goog.string.hashCode(k);
(cljs.core.string_hash_cache[k] = h__7739);
cljs.core.string_hash_cache_count = (cljs.core.string_hash_cache_count + 1);
return h__7739;
});
cljs.core.check_string_hash_cache = (function check_string_hash_cache(k){
if((cljs.core.string_hash_cache_count > 255))
{cljs.core.string_hash_cache = {};
cljs.core.string_hash_cache_count = 0;
} else
{}
var h__7741 = (cljs.core.string_hash_cache[k]);
if(!((h__7741 == null)))
{return h__7741;
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
if((function (){var and__3822__auto____7743 = goog.isString(o);
if(and__3822__auto____7743)
{return check_cache;
} else
{return and__3822__auto____7743;
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
{var G__7747__7748 = x;
if(G__7747__7748)
{if((function (){var or__3824__auto____7749 = (G__7747__7748.cljs$lang$protocol_mask$partition0$ & 8);
if(or__3824__auto____7749)
{return or__3824__auto____7749;
} else
{return G__7747__7748.cljs$core$ICollection$;
}
})())
{return true;
} else
{if((!G__7747__7748.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ICollection,G__7747__7748);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ICollection,G__7747__7748);
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
{var G__7753__7754 = x;
if(G__7753__7754)
{if((function (){var or__3824__auto____7755 = (G__7753__7754.cljs$lang$protocol_mask$partition0$ & 4096);
if(or__3824__auto____7755)
{return or__3824__auto____7755;
} else
{return G__7753__7754.cljs$core$ISet$;
}
})())
{return true;
} else
{if((!G__7753__7754.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISet,G__7753__7754);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISet,G__7753__7754);
}
}
});
/**
* Returns true if coll implements Associative
*/
cljs.core.associative_QMARK_ = (function associative_QMARK_(x){
var G__7759__7760 = x;
if(G__7759__7760)
{if((function (){var or__3824__auto____7761 = (G__7759__7760.cljs$lang$protocol_mask$partition0$ & 512);
if(or__3824__auto____7761)
{return or__3824__auto____7761;
} else
{return G__7759__7760.cljs$core$IAssociative$;
}
})())
{return true;
} else
{if((!G__7759__7760.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IAssociative,G__7759__7760);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IAssociative,G__7759__7760);
}
});
/**
* Returns true if coll satisfies ISequential
*/
cljs.core.sequential_QMARK_ = (function sequential_QMARK_(x){
var G__7765__7766 = x;
if(G__7765__7766)
{if((function (){var or__3824__auto____7767 = (G__7765__7766.cljs$lang$protocol_mask$partition0$ & 16777216);
if(or__3824__auto____7767)
{return or__3824__auto____7767;
} else
{return G__7765__7766.cljs$core$ISequential$;
}
})())
{return true;
} else
{if((!G__7765__7766.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISequential,G__7765__7766);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISequential,G__7765__7766);
}
});
/**
* Returns true if coll implements count in constant time
*/
cljs.core.counted_QMARK_ = (function counted_QMARK_(x){
var G__7771__7772 = x;
if(G__7771__7772)
{if((function (){var or__3824__auto____7773 = (G__7771__7772.cljs$lang$protocol_mask$partition0$ & 2);
if(or__3824__auto____7773)
{return or__3824__auto____7773;
} else
{return G__7771__7772.cljs$core$ICounted$;
}
})())
{return true;
} else
{if((!G__7771__7772.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ICounted,G__7771__7772);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ICounted,G__7771__7772);
}
});
/**
* Returns true if coll implements nth in constant time
*/
cljs.core.indexed_QMARK_ = (function indexed_QMARK_(x){
var G__7777__7778 = x;
if(G__7777__7778)
{if((function (){var or__3824__auto____7779 = (G__7777__7778.cljs$lang$protocol_mask$partition0$ & 16);
if(or__3824__auto____7779)
{return or__3824__auto____7779;
} else
{return G__7777__7778.cljs$core$IIndexed$;
}
})())
{return true;
} else
{if((!G__7777__7778.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IIndexed,G__7777__7778);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IIndexed,G__7777__7778);
}
});
/**
* Returns true if coll satisfies IReduce
*/
cljs.core.reduceable_QMARK_ = (function reduceable_QMARK_(x){
var G__7783__7784 = x;
if(G__7783__7784)
{if((function (){var or__3824__auto____7785 = (G__7783__7784.cljs$lang$protocol_mask$partition0$ & 524288);
if(or__3824__auto____7785)
{return or__3824__auto____7785;
} else
{return G__7783__7784.cljs$core$IReduce$;
}
})())
{return true;
} else
{if((!G__7783__7784.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IReduce,G__7783__7784);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IReduce,G__7783__7784);
}
});
/**
* Return true if x satisfies IMap
*/
cljs.core.map_QMARK_ = (function map_QMARK_(x){
if((x == null))
{return false;
} else
{var G__7789__7790 = x;
if(G__7789__7790)
{if((function (){var or__3824__auto____7791 = (G__7789__7790.cljs$lang$protocol_mask$partition0$ & 1024);
if(or__3824__auto____7791)
{return or__3824__auto____7791;
} else
{return G__7789__7790.cljs$core$IMap$;
}
})())
{return true;
} else
{if((!G__7789__7790.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IMap,G__7789__7790);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IMap,G__7789__7790);
}
}
});
/**
* Return true if x satisfies IVector
*/
cljs.core.vector_QMARK_ = (function vector_QMARK_(x){
var G__7795__7796 = x;
if(G__7795__7796)
{if((function (){var or__3824__auto____7797 = (G__7795__7796.cljs$lang$protocol_mask$partition0$ & 16384);
if(or__3824__auto____7797)
{return or__3824__auto____7797;
} else
{return G__7795__7796.cljs$core$IVector$;
}
})())
{return true;
} else
{if((!G__7795__7796.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IVector,G__7795__7796);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IVector,G__7795__7796);
}
});
cljs.core.chunked_seq_QMARK_ = (function chunked_seq_QMARK_(x){
var G__7801__7802 = x;
if(G__7801__7802)
{if(cljs.core.truth_((function (){var or__3824__auto____7803 = null;
if(cljs.core.truth_(or__3824__auto____7803))
{return or__3824__auto____7803;
} else
{return G__7801__7802.cljs$core$IChunkedSeq$;
}
})()))
{return true;
} else
{if((!G__7801__7802.cljs$lang$protocol_mask$partition$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IChunkedSeq,G__7801__7802);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IChunkedSeq,G__7801__7802);
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
var G__7804__delegate = function (keyvals){
return cljs.core.apply.call(null,goog.object.create,keyvals);
};
var G__7804 = function (var_args){
var keyvals = null;
if (goog.isDef(var_args)) {
  keyvals = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__7804__delegate.call(this, keyvals);
};
G__7804.cljs$lang$maxFixedArity = 0;
G__7804.cljs$lang$applyTo = (function (arglist__7805){
var keyvals = cljs.core.seq(arglist__7805);;
return G__7804__delegate(keyvals);
});
G__7804.cljs$lang$arity$variadic = G__7804__delegate;
return G__7804;
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
var keys__7807 = [];
goog.object.forEach(obj,(function (val,key,obj){
return keys__7807.push(key);
}));
return keys__7807;
});
cljs.core.js_delete = (function js_delete(obj,key){
return delete obj[key];
});
cljs.core.array_copy = (function array_copy(from,i,to,j,len){
var i__7811 = i;
var j__7812 = j;
var len__7813 = len;
while(true){
if((len__7813 === 0))
{return to;
} else
{(to[j__7812] = (from[i__7811]));
{
var G__7814 = (i__7811 + 1);
var G__7815 = (j__7812 + 1);
var G__7816 = (len__7813 - 1);
i__7811 = G__7814;
j__7812 = G__7815;
len__7813 = G__7816;
continue;
}
}
break;
}
});
cljs.core.array_copy_downward = (function array_copy_downward(from,i,to,j,len){
var i__7820 = (i + (len - 1));
var j__7821 = (j + (len - 1));
var len__7822 = len;
while(true){
if((len__7822 === 0))
{return to;
} else
{(to[j__7821] = (from[i__7820]));
{
var G__7823 = (i__7820 - 1);
var G__7824 = (j__7821 - 1);
var G__7825 = (len__7822 - 1);
i__7820 = G__7823;
j__7821 = G__7824;
len__7822 = G__7825;
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
{var G__7829__7830 = s;
if(G__7829__7830)
{if((function (){var or__3824__auto____7831 = (G__7829__7830.cljs$lang$protocol_mask$partition0$ & 64);
if(or__3824__auto____7831)
{return or__3824__auto____7831;
} else
{return G__7829__7830.cljs$core$ISeq$;
}
})())
{return true;
} else
{if((!G__7829__7830.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeq,G__7829__7830);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeq,G__7829__7830);
}
}
});
/**
* Return true if s satisfies ISeqable
*/
cljs.core.seqable_QMARK_ = (function seqable_QMARK_(s){
var G__7835__7836 = s;
if(G__7835__7836)
{if((function (){var or__3824__auto____7837 = (G__7835__7836.cljs$lang$protocol_mask$partition0$ & 8388608);
if(or__3824__auto____7837)
{return or__3824__auto____7837;
} else
{return G__7835__7836.cljs$core$ISeqable$;
}
})())
{return true;
} else
{if((!G__7835__7836.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeqable,G__7835__7836);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeqable,G__7835__7836);
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
var and__3822__auto____7840 = goog.isString(x);
if(and__3822__auto____7840)
{return !((function (){var or__3824__auto____7841 = (x.charAt(0) === "\uFDD0");
if(or__3824__auto____7841)
{return or__3824__auto____7841;
} else
{return (x.charAt(0) === "\uFDD1");
}
})());
} else
{return and__3822__auto____7840;
}
});
cljs.core.keyword_QMARK_ = (function keyword_QMARK_(x){
var and__3822__auto____7843 = goog.isString(x);
if(and__3822__auto____7843)
{return (x.charAt(0) === "\uFDD0");
} else
{return and__3822__auto____7843;
}
});
cljs.core.symbol_QMARK_ = (function symbol_QMARK_(x){
var and__3822__auto____7845 = goog.isString(x);
if(and__3822__auto____7845)
{return (x.charAt(0) === "\uFDD1");
} else
{return and__3822__auto____7845;
}
});
cljs.core.number_QMARK_ = (function number_QMARK_(n){
return goog.isNumber(n);
});
cljs.core.fn_QMARK_ = (function fn_QMARK_(f){
return goog.isFunction(f);
});
cljs.core.ifn_QMARK_ = (function ifn_QMARK_(f){
var or__3824__auto____7850 = cljs.core.fn_QMARK_.call(null,f);
if(or__3824__auto____7850)
{return or__3824__auto____7850;
} else
{var G__7851__7852 = f;
if(G__7851__7852)
{if((function (){var or__3824__auto____7853 = (G__7851__7852.cljs$lang$protocol_mask$partition0$ & 1);
if(or__3824__auto____7853)
{return or__3824__auto____7853;
} else
{return G__7851__7852.cljs$core$IFn$;
}
})())
{return true;
} else
{if((!G__7851__7852.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IFn,G__7851__7852);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IFn,G__7851__7852);
}
}
});
/**
* Returns true if n is an integer.  Warning: returns true on underflow condition.
*/
cljs.core.integer_QMARK_ = (function integer_QMARK_(n){
var and__3822__auto____7855 = cljs.core.number_QMARK_.call(null,n);
if(and__3822__auto____7855)
{return (n == n.toFixed());
} else
{return and__3822__auto____7855;
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
if(cljs.core.truth_((function (){var and__3822__auto____7858 = coll;
if(cljs.core.truth_(and__3822__auto____7858))
{var and__3822__auto____7859 = cljs.core.associative_QMARK_.call(null,coll);
if(and__3822__auto____7859)
{return cljs.core.contains_QMARK_.call(null,coll,k);
} else
{return and__3822__auto____7859;
}
} else
{return and__3822__auto____7858;
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
var G__7868__delegate = function (x,y,more){
if(!(cljs.core._EQ_.call(null,x,y)))
{var s__7864 = cljs.core.PersistentHashSet.fromArray([y,x]);
var xs__7865 = more;
while(true){
var x__7866 = cljs.core.first.call(null,xs__7865);
var etc__7867 = cljs.core.next.call(null,xs__7865);
if(cljs.core.truth_(xs__7865))
{if(cljs.core.contains_QMARK_.call(null,s__7864,x__7866))
{return false;
} else
{{
var G__7869 = cljs.core.conj.call(null,s__7864,x__7866);
var G__7870 = etc__7867;
s__7864 = G__7869;
xs__7865 = G__7870;
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
var G__7868 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7868__delegate.call(this, x, y, more);
};
G__7868.cljs$lang$maxFixedArity = 2;
G__7868.cljs$lang$applyTo = (function (arglist__7871){
var x = cljs.core.first(arglist__7871);
var y = cljs.core.first(cljs.core.next(arglist__7871));
var more = cljs.core.rest(cljs.core.next(arglist__7871));
return G__7868__delegate(x, y, more);
});
G__7868.cljs$lang$arity$variadic = G__7868__delegate;
return G__7868;
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
{if((function (){var G__7875__7876 = x;
if(G__7875__7876)
{if(cljs.core.truth_((function (){var or__3824__auto____7877 = null;
if(cljs.core.truth_(or__3824__auto____7877))
{return or__3824__auto____7877;
} else
{return G__7875__7876.cljs$core$IComparable$;
}
})()))
{return true;
} else
{if((!G__7875__7876.cljs$lang$protocol_mask$partition$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IComparable,G__7875__7876);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IComparable,G__7875__7876);
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
var xl__7882 = cljs.core.count.call(null,xs);
var yl__7883 = cljs.core.count.call(null,ys);
if((xl__7882 < yl__7883))
{return -1;
} else
{if((xl__7882 > yl__7883))
{return 1;
} else
{if("\uFDD0'else")
{return compare_indexed.call(null,xs,ys,xl__7882,0);
} else
{return null;
}
}
}
});
var compare_indexed__4 = (function (xs,ys,len,n){
while(true){
var d__7884 = cljs.core.compare.call(null,cljs.core.nth.call(null,xs,n),cljs.core.nth.call(null,ys,n));
if((function (){var and__3822__auto____7885 = (d__7884 === 0);
if(and__3822__auto____7885)
{return ((n + 1) < len);
} else
{return and__3822__auto____7885;
}
})())
{{
var G__7886 = xs;
var G__7887 = ys;
var G__7888 = len;
var G__7889 = (n + 1);
xs = G__7886;
ys = G__7887;
len = G__7888;
n = G__7889;
continue;
}
} else
{return d__7884;
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
var r__7891 = f.call(null,x,y);
if(cljs.core.number_QMARK_.call(null,r__7891))
{return r__7891;
} else
{if(cljs.core.truth_(r__7891))
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
{var a__7893 = cljs.core.to_array.call(null,coll);
goog.array.stableSort(a__7893,cljs.core.fn__GT_comparator.call(null,comp));
return cljs.core.seq.call(null,a__7893);
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
var temp__3971__auto____7899 = cljs.core.seq.call(null,coll);
if(temp__3971__auto____7899)
{var s__7900 = temp__3971__auto____7899;
return cljs.core.reduce.call(null,f,cljs.core.first.call(null,s__7900),cljs.core.next.call(null,s__7900));
} else
{return f.call(null);
}
});
var seq_reduce__3 = (function (f,val,coll){
var val__7901 = val;
var coll__7902 = cljs.core.seq.call(null,coll);
while(true){
if(coll__7902)
{var nval__7903 = f.call(null,val__7901,cljs.core.first.call(null,coll__7902));
if(cljs.core.reduced_QMARK_.call(null,nval__7903))
{return cljs.core.deref.call(null,nval__7903);
} else
{{
var G__7904 = nval__7903;
var G__7905 = cljs.core.next.call(null,coll__7902);
val__7901 = G__7904;
coll__7902 = G__7905;
continue;
}
}
} else
{return val__7901;
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
var a__7907 = cljs.core.to_array.call(null,coll);
goog.array.shuffle(a__7907);
return cljs.core.vec.call(null,a__7907);
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
if((function (){var G__7914__7915 = coll;
if(G__7914__7915)
{if((function (){var or__3824__auto____7916 = (G__7914__7915.cljs$lang$protocol_mask$partition0$ & 524288);
if(or__3824__auto____7916)
{return or__3824__auto____7916;
} else
{return G__7914__7915.cljs$core$IReduce$;
}
})())
{return true;
} else
{if((!G__7914__7915.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IReduce,G__7914__7915);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IReduce,G__7914__7915);
}
})())
{return cljs.core._reduce.call(null,coll,f);
} else
{return cljs.core.seq_reduce.call(null,f,coll);
}
});
var reduce__3 = (function (f,val,coll){
if((function (){var G__7917__7918 = coll;
if(G__7917__7918)
{if((function (){var or__3824__auto____7919 = (G__7917__7918.cljs$lang$protocol_mask$partition0$ & 524288);
if(or__3824__auto____7919)
{return or__3824__auto____7919;
} else
{return G__7917__7918.cljs$core$IReduce$;
}
})())
{return true;
} else
{if((!G__7917__7918.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IReduce,G__7917__7918);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IReduce,G__7917__7918);
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
cljs.core.Reduced.cljs$lang$ctorPrSeq = (function (this__3002__auto__){
return cljs.core.list.call(null,"cljs.core/Reduced");
});
cljs.core.Reduced.prototype.cljs$core$IDeref$_deref$arity$1 = (function (o){
var this__7920 = this;
return this__7920.val;
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
var G__7921__delegate = function (x,y,more){
return cljs.core.reduce.call(null,_PLUS_,(x + y),more);
};
var G__7921 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7921__delegate.call(this, x, y, more);
};
G__7921.cljs$lang$maxFixedArity = 2;
G__7921.cljs$lang$applyTo = (function (arglist__7922){
var x = cljs.core.first(arglist__7922);
var y = cljs.core.first(cljs.core.next(arglist__7922));
var more = cljs.core.rest(cljs.core.next(arglist__7922));
return G__7921__delegate(x, y, more);
});
G__7921.cljs$lang$arity$variadic = G__7921__delegate;
return G__7921;
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
var G__7923__delegate = function (x,y,more){
return cljs.core.reduce.call(null,_,(x - y),more);
};
var G__7923 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7923__delegate.call(this, x, y, more);
};
G__7923.cljs$lang$maxFixedArity = 2;
G__7923.cljs$lang$applyTo = (function (arglist__7924){
var x = cljs.core.first(arglist__7924);
var y = cljs.core.first(cljs.core.next(arglist__7924));
var more = cljs.core.rest(cljs.core.next(arglist__7924));
return G__7923__delegate(x, y, more);
});
G__7923.cljs$lang$arity$variadic = G__7923__delegate;
return G__7923;
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
var G__7925__delegate = function (x,y,more){
return cljs.core.reduce.call(null,_STAR_,(x * y),more);
};
var G__7925 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7925__delegate.call(this, x, y, more);
};
G__7925.cljs$lang$maxFixedArity = 2;
G__7925.cljs$lang$applyTo = (function (arglist__7926){
var x = cljs.core.first(arglist__7926);
var y = cljs.core.first(cljs.core.next(arglist__7926));
var more = cljs.core.rest(cljs.core.next(arglist__7926));
return G__7925__delegate(x, y, more);
});
G__7925.cljs$lang$arity$variadic = G__7925__delegate;
return G__7925;
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
var G__7927__delegate = function (x,y,more){
return cljs.core.reduce.call(null,_SLASH_,_SLASH_.call(null,x,y),more);
};
var G__7927 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7927__delegate.call(this, x, y, more);
};
G__7927.cljs$lang$maxFixedArity = 2;
G__7927.cljs$lang$applyTo = (function (arglist__7928){
var x = cljs.core.first(arglist__7928);
var y = cljs.core.first(cljs.core.next(arglist__7928));
var more = cljs.core.rest(cljs.core.next(arglist__7928));
return G__7927__delegate(x, y, more);
});
G__7927.cljs$lang$arity$variadic = G__7927__delegate;
return G__7927;
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
var G__7929__delegate = function (x,y,more){
while(true){
if((x < y))
{if(cljs.core.next.call(null,more))
{{
var G__7930 = y;
var G__7931 = cljs.core.first.call(null,more);
var G__7932 = cljs.core.next.call(null,more);
x = G__7930;
y = G__7931;
more = G__7932;
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
var G__7929 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7929__delegate.call(this, x, y, more);
};
G__7929.cljs$lang$maxFixedArity = 2;
G__7929.cljs$lang$applyTo = (function (arglist__7933){
var x = cljs.core.first(arglist__7933);
var y = cljs.core.first(cljs.core.next(arglist__7933));
var more = cljs.core.rest(cljs.core.next(arglist__7933));
return G__7929__delegate(x, y, more);
});
G__7929.cljs$lang$arity$variadic = G__7929__delegate;
return G__7929;
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
var G__7934__delegate = function (x,y,more){
while(true){
if((x <= y))
{if(cljs.core.next.call(null,more))
{{
var G__7935 = y;
var G__7936 = cljs.core.first.call(null,more);
var G__7937 = cljs.core.next.call(null,more);
x = G__7935;
y = G__7936;
more = G__7937;
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
var G__7934 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7934__delegate.call(this, x, y, more);
};
G__7934.cljs$lang$maxFixedArity = 2;
G__7934.cljs$lang$applyTo = (function (arglist__7938){
var x = cljs.core.first(arglist__7938);
var y = cljs.core.first(cljs.core.next(arglist__7938));
var more = cljs.core.rest(cljs.core.next(arglist__7938));
return G__7934__delegate(x, y, more);
});
G__7934.cljs$lang$arity$variadic = G__7934__delegate;
return G__7934;
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
var G__7939__delegate = function (x,y,more){
while(true){
if((x > y))
{if(cljs.core.next.call(null,more))
{{
var G__7940 = y;
var G__7941 = cljs.core.first.call(null,more);
var G__7942 = cljs.core.next.call(null,more);
x = G__7940;
y = G__7941;
more = G__7942;
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
var G__7939 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7939__delegate.call(this, x, y, more);
};
G__7939.cljs$lang$maxFixedArity = 2;
G__7939.cljs$lang$applyTo = (function (arglist__7943){
var x = cljs.core.first(arglist__7943);
var y = cljs.core.first(cljs.core.next(arglist__7943));
var more = cljs.core.rest(cljs.core.next(arglist__7943));
return G__7939__delegate(x, y, more);
});
G__7939.cljs$lang$arity$variadic = G__7939__delegate;
return G__7939;
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
var G__7944__delegate = function (x,y,more){
while(true){
if((x >= y))
{if(cljs.core.next.call(null,more))
{{
var G__7945 = y;
var G__7946 = cljs.core.first.call(null,more);
var G__7947 = cljs.core.next.call(null,more);
x = G__7945;
y = G__7946;
more = G__7947;
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
var G__7944 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7944__delegate.call(this, x, y, more);
};
G__7944.cljs$lang$maxFixedArity = 2;
G__7944.cljs$lang$applyTo = (function (arglist__7948){
var x = cljs.core.first(arglist__7948);
var y = cljs.core.first(cljs.core.next(arglist__7948));
var more = cljs.core.rest(cljs.core.next(arglist__7948));
return G__7944__delegate(x, y, more);
});
G__7944.cljs$lang$arity$variadic = G__7944__delegate;
return G__7944;
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
var G__7949__delegate = function (x,y,more){
return cljs.core.reduce.call(null,max,((x > y) ? x : y),more);
};
var G__7949 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7949__delegate.call(this, x, y, more);
};
G__7949.cljs$lang$maxFixedArity = 2;
G__7949.cljs$lang$applyTo = (function (arglist__7950){
var x = cljs.core.first(arglist__7950);
var y = cljs.core.first(cljs.core.next(arglist__7950));
var more = cljs.core.rest(cljs.core.next(arglist__7950));
return G__7949__delegate(x, y, more);
});
G__7949.cljs$lang$arity$variadic = G__7949__delegate;
return G__7949;
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
var G__7951__delegate = function (x,y,more){
return cljs.core.reduce.call(null,min,((x < y) ? x : y),more);
};
var G__7951 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7951__delegate.call(this, x, y, more);
};
G__7951.cljs$lang$maxFixedArity = 2;
G__7951.cljs$lang$applyTo = (function (arglist__7952){
var x = cljs.core.first(arglist__7952);
var y = cljs.core.first(cljs.core.next(arglist__7952));
var more = cljs.core.rest(cljs.core.next(arglist__7952));
return G__7951__delegate(x, y, more);
});
G__7951.cljs$lang$arity$variadic = G__7951__delegate;
return G__7951;
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
var rem__7954 = (n % d);
return cljs.core.fix.call(null,((n - rem__7954) / d));
});
/**
* remainder of dividing numerator by denominator.
*/
cljs.core.rem = (function rem(n,d){
var q__7956 = cljs.core.quot.call(null,n,d);
return (n - (d * q__7956));
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
var v__7959 = (v - ((v >> 1) & 1431655765));
var v__7960 = ((v__7959 & 858993459) + ((v__7959 >> 2) & 858993459));
return ((((v__7960 + (v__7960 >> 4)) & 252645135) * 16843009) >> 24);
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
var G__7961__delegate = function (x,y,more){
while(true){
if(cljs.core.truth_(_EQ__EQ_.call(null,x,y)))
{if(cljs.core.next.call(null,more))
{{
var G__7962 = y;
var G__7963 = cljs.core.first.call(null,more);
var G__7964 = cljs.core.next.call(null,more);
x = G__7962;
y = G__7963;
more = G__7964;
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
var G__7961 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7961__delegate.call(this, x, y, more);
};
G__7961.cljs$lang$maxFixedArity = 2;
G__7961.cljs$lang$applyTo = (function (arglist__7965){
var x = cljs.core.first(arglist__7965);
var y = cljs.core.first(cljs.core.next(arglist__7965));
var more = cljs.core.rest(cljs.core.next(arglist__7965));
return G__7961__delegate(x, y, more);
});
G__7961.cljs$lang$arity$variadic = G__7961__delegate;
return G__7961;
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
var n__7969 = n;
var xs__7970 = cljs.core.seq.call(null,coll);
while(true){
if(cljs.core.truth_((function (){var and__3822__auto____7971 = xs__7970;
if(and__3822__auto____7971)
{return (n__7969 > 0);
} else
{return and__3822__auto____7971;
}
})()))
{{
var G__7972 = (n__7969 - 1);
var G__7973 = cljs.core.next.call(null,xs__7970);
n__7969 = G__7972;
xs__7970 = G__7973;
continue;
}
} else
{return xs__7970;
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
var G__7974__delegate = function (x,ys){
return (function (sb,more){
while(true){
if(cljs.core.truth_(more))
{{
var G__7975 = sb.append(str_STAR_.call(null,cljs.core.first.call(null,more)));
var G__7976 = cljs.core.next.call(null,more);
sb = G__7975;
more = G__7976;
continue;
}
} else
{return str_STAR_.call(null,sb);
}
break;
}
}).call(null,(new goog.string.StringBuffer(str_STAR_.call(null,x))),ys);
};
var G__7974 = function (x,var_args){
var ys = null;
if (goog.isDef(var_args)) {
  ys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return G__7974__delegate.call(this, x, ys);
};
G__7974.cljs$lang$maxFixedArity = 1;
G__7974.cljs$lang$applyTo = (function (arglist__7977){
var x = cljs.core.first(arglist__7977);
var ys = cljs.core.rest(arglist__7977);
return G__7974__delegate(x, ys);
});
G__7974.cljs$lang$arity$variadic = G__7974__delegate;
return G__7974;
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
var G__7978__delegate = function (x,ys){
return (function (sb,more){
while(true){
if(cljs.core.truth_(more))
{{
var G__7979 = sb.append(str.call(null,cljs.core.first.call(null,more)));
var G__7980 = cljs.core.next.call(null,more);
sb = G__7979;
more = G__7980;
continue;
}
} else
{return cljs.core.str_STAR_.call(null,sb);
}
break;
}
}).call(null,(new goog.string.StringBuffer(str.call(null,x))),ys);
};
var G__7978 = function (x,var_args){
var ys = null;
if (goog.isDef(var_args)) {
  ys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return G__7978__delegate.call(this, x, ys);
};
G__7978.cljs$lang$maxFixedArity = 1;
G__7978.cljs$lang$applyTo = (function (arglist__7981){
var x = cljs.core.first(arglist__7981);
var ys = cljs.core.rest(arglist__7981);
return G__7978__delegate(x, ys);
});
G__7978.cljs$lang$arity$variadic = G__7978__delegate;
return G__7978;
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
format.cljs$lang$applyTo = (function (arglist__7982){
var fmt = cljs.core.first(arglist__7982);
var args = cljs.core.rest(arglist__7982);
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
return cljs.core.boolean$.call(null,((cljs.core.sequential_QMARK_.call(null,y))?(function (){var xs__7985 = cljs.core.seq.call(null,x);
var ys__7986 = cljs.core.seq.call(null,y);
while(true){
if((xs__7985 == null))
{return (ys__7986 == null);
} else
{if((ys__7986 == null))
{return false;
} else
{if(cljs.core._EQ_.call(null,cljs.core.first.call(null,xs__7985),cljs.core.first.call(null,ys__7986)))
{{
var G__7987 = cljs.core.next.call(null,xs__7985);
var G__7988 = cljs.core.next.call(null,ys__7986);
xs__7985 = G__7987;
ys__7986 = G__7988;
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
return cljs.core.reduce.call(null,(function (p1__7989_SHARP_,p2__7990_SHARP_){
return cljs.core.hash_combine.call(null,p1__7989_SHARP_,cljs.core.hash.call(null,p2__7990_SHARP_,false));
}),cljs.core.hash.call(null,cljs.core.first.call(null,coll),false),cljs.core.next.call(null,coll));
});
cljs.core.hash_imap = (function hash_imap(m){
var h__7994 = 0;
var s__7995 = cljs.core.seq.call(null,m);
while(true){
if(s__7995)
{var e__7996 = cljs.core.first.call(null,s__7995);
{
var G__7997 = ((h__7994 + (cljs.core.hash.call(null,cljs.core.key.call(null,e__7996)) ^ cljs.core.hash.call(null,cljs.core.val.call(null,e__7996)))) % 4503599627370496);
var G__7998 = cljs.core.next.call(null,s__7995);
h__7994 = G__7997;
s__7995 = G__7998;
continue;
}
} else
{return h__7994;
}
break;
}
});
cljs.core.hash_iset = (function hash_iset(s){
var h__8002 = 0;
var s__8003 = cljs.core.seq.call(null,s);
while(true){
if(s__8003)
{var e__8004 = cljs.core.first.call(null,s__8003);
{
var G__8005 = ((h__8002 + cljs.core.hash.call(null,e__8004)) % 4503599627370496);
var G__8006 = cljs.core.next.call(null,s__8003);
h__8002 = G__8005;
s__8003 = G__8006;
continue;
}
} else
{return h__8002;
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
var G__8027__8028 = cljs.core.seq.call(null,fn_map);
if(G__8027__8028)
{var G__8030__8032 = cljs.core.first.call(null,G__8027__8028);
var vec__8031__8033 = G__8030__8032;
var key_name__8034 = cljs.core.nth.call(null,vec__8031__8033,0,null);
var f__8035 = cljs.core.nth.call(null,vec__8031__8033,1,null);
var G__8027__8036 = G__8027__8028;
var G__8030__8037 = G__8030__8032;
var G__8027__8038 = G__8027__8036;
while(true){
var vec__8039__8040 = G__8030__8037;
var key_name__8041 = cljs.core.nth.call(null,vec__8039__8040,0,null);
var f__8042 = cljs.core.nth.call(null,vec__8039__8040,1,null);
var G__8027__8043 = G__8027__8038;
var str_name__8044 = cljs.core.name.call(null,key_name__8041);
(obj[str_name__8044] = f__8042);
var temp__3974__auto____8045 = cljs.core.next.call(null,G__8027__8043);
if(temp__3974__auto____8045)
{var G__8027__8046 = temp__3974__auto____8045;
{
var G__8047 = cljs.core.first.call(null,G__8027__8046);
var G__8048 = G__8027__8046;
G__8030__8037 = G__8047;
G__8027__8038 = G__8048;
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
cljs.core.List.cljs$lang$ctorPrSeq = (function (this__3002__auto__){
return cljs.core.list.call(null,"cljs.core/List");
});
cljs.core.List.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__8049 = this;
var h__2885__auto____8050 = this__8049.__hash;
if(!((h__2885__auto____8050 == null)))
{return h__2885__auto____8050;
} else
{var h__2885__auto____8051 = cljs.core.hash_coll.call(null,coll);
this__8049.__hash = h__2885__auto____8051;
return h__2885__auto____8051;
}
});
cljs.core.List.prototype.cljs$core$INext$_next$arity$1 = (function (coll){
var this__8052 = this;
if((this__8052.count === 1))
{return null;
} else
{return this__8052.rest;
}
});
cljs.core.List.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__8053 = this;
return (new cljs.core.List(this__8053.meta,o,coll,(this__8053.count + 1),null));
});
cljs.core.List.prototype.toString = (function (){
var this__8054 = this;
var this__8055 = this;
return cljs.core.pr_str.call(null,this__8055);
});
cljs.core.List.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__8056 = this;
return coll;
});
cljs.core.List.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__8057 = this;
return this__8057.count;
});
cljs.core.List.prototype.cljs$core$IStack$_peek$arity$1 = (function (coll){
var this__8058 = this;
return this__8058.first;
});
cljs.core.List.prototype.cljs$core$IStack$_pop$arity$1 = (function (coll){
var this__8059 = this;
return coll.cljs$core$ISeq$_rest$arity$1(coll);
});
cljs.core.List.prototype.cljs$core$ISeq$_first$arity$1 = (function (coll){
var this__8060 = this;
return this__8060.first;
});
cljs.core.List.prototype.cljs$core$ISeq$_rest$arity$1 = (function (coll){
var this__8061 = this;
if((this__8061.count === 1))
{return cljs.core.List.EMPTY;
} else
{return this__8061.rest;
}
});
cljs.core.List.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__8062 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.List.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__8063 = this;
return (new cljs.core.List(meta,this__8063.first,this__8063.rest,this__8063.count,this__8063.__hash));
});
cljs.core.List.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__8064 = this;
return this__8064.meta;
});
cljs.core.List.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__8065 = this;
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
cljs.core.EmptyList.cljs$lang$ctorPrSeq = (function (this__3002__auto__){
return cljs.core.list.call(null,"cljs.core/EmptyList");
});
cljs.core.EmptyList.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__8066 = this;
return 0;
});
cljs.core.EmptyList.prototype.cljs$core$INext$_next$arity$1 = (function (coll){
var this__8067 = this;
return null;
});
cljs.core.EmptyList.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__8068 = this;
return (new cljs.core.List(this__8068.meta,o,null,1,null));
});
cljs.core.EmptyList.prototype.toString = (function (){
var this__8069 = this;
var this__8070 = this;
return cljs.core.pr_str.call(null,this__8070);
});
cljs.core.EmptyList.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__8071 = this;
return null;
});
cljs.core.EmptyList.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__8072 = this;
return 0;
});
cljs.core.EmptyList.prototype.cljs$core$IStack$_peek$arity$1 = (function (coll){
var this__8073 = this;
return null;
});
cljs.core.EmptyList.prototype.cljs$core$IStack$_pop$arity$1 = (function (coll){
var this__8074 = this;
throw (new Error("Can't pop empty list"));
});
cljs.core.EmptyList.prototype.cljs$core$ISeq$_first$arity$1 = (function (coll){
var this__8075 = this;
return null;
});
cljs.core.EmptyList.prototype.cljs$core$ISeq$_rest$arity$1 = (function (coll){
var this__8076 = this;
return cljs.core.List.EMPTY;
});
cljs.core.EmptyList.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__8077 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.EmptyList.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__8078 = this;
return (new cljs.core.EmptyList(meta));
});
cljs.core.EmptyList.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__8079 = this;
return this__8079.meta;
});
cljs.core.EmptyList.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__8080 = this;
return coll;
});
cljs.core.EmptyList;
cljs.core.List.EMPTY = (new cljs.core.EmptyList(null));
cljs.core.reversible_QMARK_ = (function reversible_QMARK_(coll){
var G__8084__8085 = coll;
if(G__8084__8085)
{if((function (){var or__3824__auto____8086 = (G__8084__8085.cljs$lang$protocol_mask$partition0$ & 134217728);
if(or__3824__auto____8086)
{return or__3824__auto____8086;
} else
{return G__8084__8085.cljs$core$IReversible$;
}
})())
{return true;
} else
{if((!G__8084__8085.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IReversible,G__8084__8085);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IReversible,G__8084__8085);
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
var G__8087__delegate = function (x,y,z,items){
return cljs.core.conj.call(null,cljs.core.conj.call(null,cljs.core.conj.call(null,cljs.core.reduce.call(null,cljs.core.conj,cljs.core.List.EMPTY,cljs.core.reverse.call(null,items)),z),y),x);
};
var G__8087 = function (x,y,z,var_args){
var items = null;
if (goog.isDef(var_args)) {
  items = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__8087__delegate.call(this, x, y, z, items);
};
G__8087.cljs$lang$maxFixedArity = 3;
G__8087.cljs$lang$applyTo = (function (arglist__8088){
var x = cljs.core.first(arglist__8088);
var y = cljs.core.first(cljs.core.next(arglist__8088));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8088)));
var items = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8088)));
return G__8087__delegate(x, y, z, items);
});
G__8087.cljs$lang$arity$variadic = G__8087__delegate;
return G__8087;
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
cljs.core.Cons.cljs$lang$ctorPrSeq = (function (this__3002__auto__){
return cljs.core.list.call(null,"cljs.core/Cons");
});
cljs.core.Cons.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__8089 = this;
var h__2885__auto____8090 = this__8089.__hash;
if(!((h__2885__auto____8090 == null)))
{return h__2885__auto____8090;
} else
{var h__2885__auto____8091 = cljs.core.hash_coll.call(null,coll);
this__8089.__hash = h__2885__auto____8091;
return h__2885__auto____8091;
}
});
cljs.core.Cons.prototype.cljs$core$INext$_next$arity$1 = (function (coll){
var this__8092 = this;
if((this__8092.rest == null))
{return null;
} else
{return cljs.core._seq.call(null,this__8092.rest);
}
});
cljs.core.Cons.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__8093 = this;
return (new cljs.core.Cons(null,o,coll,this__8093.__hash));
});
cljs.core.Cons.prototype.toString = (function (){
var this__8094 = this;
var this__8095 = this;
return cljs.core.pr_str.call(null,this__8095);
});
cljs.core.Cons.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__8096 = this;
return coll;
});
cljs.core.Cons.prototype.cljs$core$ISeq$_first$arity$1 = (function (coll){
var this__8097 = this;
return this__8097.first;
});
cljs.core.Cons.prototype.cljs$core$ISeq$_rest$arity$1 = (function (coll){
var this__8098 = this;
if((this__8098.rest == null))
{return cljs.core.List.EMPTY;
} else
{return this__8098.rest;
}
});
cljs.core.Cons.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__8099 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.Cons.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__8100 = this;
return (new cljs.core.Cons(meta,this__8100.first,this__8100.rest,this__8100.__hash));
});
cljs.core.Cons.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__8101 = this;
return this__8101.meta;
});
cljs.core.Cons.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__8102 = this;
return cljs.core.with_meta.call(null,cljs.core.List.EMPTY,this__8102.meta);
});
cljs.core.Cons;
/**
* Returns a new seq where x is the first element and seq is the rest.
*/
cljs.core.cons = (function cons(x,coll){
if((function (){var or__3824__auto____8107 = (coll == null);
if(or__3824__auto____8107)
{return or__3824__auto____8107;
} else
{var G__8108__8109 = coll;
if(G__8108__8109)
{if((function (){var or__3824__auto____8110 = (G__8108__8109.cljs$lang$protocol_mask$partition0$ & 64);
if(or__3824__auto____8110)
{return or__3824__auto____8110;
} else
{return G__8108__8109.cljs$core$ISeq$;
}
})())
{return true;
} else
{if((!G__8108__8109.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeq,G__8108__8109);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeq,G__8108__8109);
}
}
})())
{return (new cljs.core.Cons(null,x,coll,null));
} else
{return (new cljs.core.Cons(null,x,cljs.core.seq.call(null,coll),null));
}
});
cljs.core.list_QMARK_ = (function list_QMARK_(x){
var G__8114__8115 = x;
if(G__8114__8115)
{if((function (){var or__3824__auto____8116 = (G__8114__8115.cljs$lang$protocol_mask$partition0$ & 33554432);
if(or__3824__auto____8116)
{return or__3824__auto____8116;
} else
{return G__8114__8115.cljs$core$IList$;
}
})())
{return true;
} else
{if((!G__8114__8115.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IList,G__8114__8115);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IList,G__8114__8115);
}
});
(cljs.core.IReduce["string"] = true);
(cljs.core._reduce["string"] = (function() {
var G__8117 = null;
var G__8117__2 = (function (string,f){
return cljs.core.ci_reduce.call(null,string,f);
});
var G__8117__3 = (function (string,f,start){
return cljs.core.ci_reduce.call(null,string,f,start);
});
G__8117 = function(string,f,start){
switch(arguments.length){
case 2:
return G__8117__2.call(this,string,f);
case 3:
return G__8117__3.call(this,string,f,start);
}
throw('Invalid arity: ' + arguments.length);
};
return G__8117;
})()
);
(cljs.core.ILookup["string"] = true);
(cljs.core._lookup["string"] = (function() {
var G__8118 = null;
var G__8118__2 = (function (string,k){
return cljs.core._nth.call(null,string,k);
});
var G__8118__3 = (function (string,k,not_found){
return cljs.core._nth.call(null,string,k,not_found);
});
G__8118 = function(string,k,not_found){
switch(arguments.length){
case 2:
return G__8118__2.call(this,string,k);
case 3:
return G__8118__3.call(this,string,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__8118;
})()
);
(cljs.core.IIndexed["string"] = true);
(cljs.core._nth["string"] = (function() {
var G__8119 = null;
var G__8119__2 = (function (string,n){
if((n < cljs.core._count.call(null,string)))
{return string.charAt(n);
} else
{return null;
}
});
var G__8119__3 = (function (string,n,not_found){
if((n < cljs.core._count.call(null,string)))
{return string.charAt(n);
} else
{return not_found;
}
});
G__8119 = function(string,n,not_found){
switch(arguments.length){
case 2:
return G__8119__2.call(this,string,n);
case 3:
return G__8119__3.call(this,string,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__8119;
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
cljs.core.Keyword.cljs$lang$ctorPrSeq = (function (this__3002__auto__){
return cljs.core.list.call(null,"cljs.core/Keyword");
});
cljs.core.Keyword.prototype.call = (function() {
var G__8131 = null;
var G__8131__2 = (function (this_sym8122,coll){
var this__8124 = this;
var this_sym8122__8125 = this;
var ___8126 = this_sym8122__8125;
if((coll == null))
{return null;
} else
{var strobj__8127 = coll.strobj;
if((strobj__8127 == null))
{return cljs.core._lookup.call(null,coll,this__8124.k,null);
} else
{return (strobj__8127[this__8124.k]);
}
}
});
var G__8131__3 = (function (this_sym8123,coll,not_found){
var this__8124 = this;
var this_sym8123__8128 = this;
var ___8129 = this_sym8123__8128;
if((coll == null))
{return not_found;
} else
{return cljs.core._lookup.call(null,coll,this__8124.k,not_found);
}
});
G__8131 = function(this_sym8123,coll,not_found){
switch(arguments.length){
case 2:
return G__8131__2.call(this,this_sym8123,coll);
case 3:
return G__8131__3.call(this,this_sym8123,coll,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__8131;
})()
;
cljs.core.Keyword.prototype.apply = (function (this_sym8120,args8121){
var this__8130 = this;
return this_sym8120.call.apply(this_sym8120,[this_sym8120].concat(args8121.slice()));
});
cljs.core.Keyword;
String.prototype.cljs$core$IFn$ = true;
String.prototype.call = (function() {
var G__8140 = null;
var G__8140__2 = (function (this_sym8134,coll){
var this_sym8134__8136 = this;
var this__8137 = this_sym8134__8136;
return cljs.core._lookup.call(null,coll,this__8137.toString(),null);
});
var G__8140__3 = (function (this_sym8135,coll,not_found){
var this_sym8135__8138 = this;
var this__8139 = this_sym8135__8138;
return cljs.core._lookup.call(null,coll,this__8139.toString(),not_found);
});
G__8140 = function(this_sym8135,coll,not_found){
switch(arguments.length){
case 2:
return G__8140__2.call(this,this_sym8135,coll);
case 3:
return G__8140__3.call(this,this_sym8135,coll,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__8140;
})()
;
String.prototype.apply = (function (this_sym8132,args8133){
return this_sym8132.call.apply(this_sym8132,[this_sym8132].concat(args8133.slice()));
});
String.prototype.apply = (function (s,args){
if((cljs.core.count.call(null,args) < 2))
{return cljs.core._lookup.call(null,(args[0]),s,null);
} else
{return cljs.core._lookup.call(null,(args[0]),s,(args[1]));
}
});
cljs.core.lazy_seq_value = (function lazy_seq_value(lazy_seq){
var x__8142 = lazy_seq.x;
if(lazy_seq.realized)
{return x__8142;
} else
{lazy_seq.x = x__8142.call(null);
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
cljs.core.LazySeq.cljs$lang$ctorPrSeq = (function (this__3002__auto__){
return cljs.core.list.call(null,"cljs.core/LazySeq");
});
cljs.core.LazySeq.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__8143 = this;
var h__2885__auto____8144 = this__8143.__hash;
if(!((h__2885__auto____8144 == null)))
{return h__2885__auto____8144;
} else
{var h__2885__auto____8145 = cljs.core.hash_coll.call(null,coll);
this__8143.__hash = h__2885__auto____8145;
return h__2885__auto____8145;
}
});
cljs.core.LazySeq.prototype.cljs$core$INext$_next$arity$1 = (function (coll){
var this__8146 = this;
return cljs.core._seq.call(null,coll.cljs$core$ISeq$_rest$arity$1(coll));
});
cljs.core.LazySeq.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__8147 = this;
return cljs.core.cons.call(null,o,coll);
});
cljs.core.LazySeq.prototype.toString = (function (){
var this__8148 = this;
var this__8149 = this;
return cljs.core.pr_str.call(null,this__8149);
});
cljs.core.LazySeq.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__8150 = this;
return cljs.core.seq.call(null,cljs.core.lazy_seq_value.call(null,coll));
});
cljs.core.LazySeq.prototype.cljs$core$ISeq$_first$arity$1 = (function (coll){
var this__8151 = this;
return cljs.core.first.call(null,cljs.core.lazy_seq_value.call(null,coll));
});
cljs.core.LazySeq.prototype.cljs$core$ISeq$_rest$arity$1 = (function (coll){
var this__8152 = this;
return cljs.core.rest.call(null,cljs.core.lazy_seq_value.call(null,coll));
});
cljs.core.LazySeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__8153 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.LazySeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__8154 = this;
return (new cljs.core.LazySeq(meta,this__8154.realized,this__8154.x,this__8154.__hash));
});
cljs.core.LazySeq.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__8155 = this;
return this__8155.meta;
});
cljs.core.LazySeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__8156 = this;
return cljs.core.with_meta.call(null,cljs.core.List.EMPTY,this__8156.meta);
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
cljs.core.ChunkBuffer.cljs$lang$ctorPrSeq = (function (this__3002__auto__){
return cljs.core.list.call(null,"cljs.core/ChunkBuffer");
});
cljs.core.ChunkBuffer.prototype.cljs$core$ICounted$_count$arity$1 = (function (_){
var this__8157 = this;
return this__8157.end;
});
cljs.core.ChunkBuffer.prototype.add = (function (o){
var this__8158 = this;
var ___8159 = this;
(this__8158.buf[this__8158.end] = o);
return this__8158.end = (this__8158.end + 1);
});
cljs.core.ChunkBuffer.prototype.chunk = (function (o){
var this__8160 = this;
var ___8161 = this;
var ret__8162 = (new cljs.core.ArrayChunk(this__8160.buf,0,this__8160.end));
this__8160.buf = null;
return ret__8162;
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
cljs.core.ArrayChunk.cljs$lang$ctorPrSeq = (function (this__3002__auto__){
return cljs.core.list.call(null,"cljs.core/ArrayChunk");
});
cljs.core.ArrayChunk.prototype.cljs$core$IReduce$_reduce$arity$2 = (function (coll,f){
var this__8163 = this;
return cljs.core.ci_reduce.call(null,coll,f,(this__8163.arr[this__8163.off]),(this__8163.off + 1));
});
cljs.core.ArrayChunk.prototype.cljs$core$IReduce$_reduce$arity$3 = (function (coll,f,start){
var this__8164 = this;
return cljs.core.ci_reduce.call(null,coll,f,start,this__8164.off);
});
cljs.core.ArrayChunk.prototype.cljs$core$IChunk$ = true;
cljs.core.ArrayChunk.prototype.cljs$core$IChunk$_drop_first$arity$1 = (function (coll){
var this__8165 = this;
if((this__8165.off === this__8165.end))
{throw (new Error("-drop-first of empty chunk"));
} else
{return (new cljs.core.ArrayChunk(this__8165.arr,(this__8165.off + 1),this__8165.end));
}
});
cljs.core.ArrayChunk.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (coll,i){
var this__8166 = this;
return (this__8166.arr[(this__8166.off + i)]);
});
cljs.core.ArrayChunk.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (coll,i,not_found){
var this__8167 = this;
if((function (){var and__3822__auto____8168 = (i >= 0);
if(and__3822__auto____8168)
{return (i < (this__8167.end - this__8167.off));
} else
{return and__3822__auto____8168;
}
})())
{return (this__8167.arr[(this__8167.off + i)]);
} else
{return not_found;
}
});
cljs.core.ArrayChunk.prototype.cljs$core$ICounted$_count$arity$1 = (function (_){
var this__8169 = this;
return (this__8169.end - this__8169.off);
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
cljs.core.ChunkedCons.cljs$lang$ctorPrSeq = (function (this__3002__auto__){
return cljs.core.list.call(null,"cljs.core/ChunkedCons");
});
cljs.core.ChunkedCons.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this$,o){
var this__8170 = this;
return cljs.core.cons.call(null,o,this$);
});
cljs.core.ChunkedCons.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__8171 = this;
return coll;
});
cljs.core.ChunkedCons.prototype.cljs$core$ISeq$_first$arity$1 = (function (coll){
var this__8172 = this;
return cljs.core._nth.call(null,this__8172.chunk,0);
});
cljs.core.ChunkedCons.prototype.cljs$core$ISeq$_rest$arity$1 = (function (coll){
var this__8173 = this;
if((cljs.core._count.call(null,this__8173.chunk) > 1))
{return (new cljs.core.ChunkedCons(cljs.core._drop_first.call(null,this__8173.chunk),this__8173.more,this__8173.meta));
} else
{if((this__8173.more == null))
{return cljs.core.List.EMPTY;
} else
{return this__8173.more;
}
}
});
cljs.core.ChunkedCons.prototype.cljs$core$IChunkedNext$ = true;
cljs.core.ChunkedCons.prototype.cljs$core$IChunkedNext$_chunked_next$arity$1 = (function (coll){
var this__8174 = this;
if((this__8174.more == null))
{return null;
} else
{return this__8174.more;
}
});
cljs.core.ChunkedCons.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__8175 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.ChunkedCons.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,m){
var this__8176 = this;
return (new cljs.core.ChunkedCons(this__8176.chunk,this__8176.more,m));
});
cljs.core.ChunkedCons.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__8177 = this;
return this__8177.meta;
});
cljs.core.ChunkedCons.prototype.cljs$core$IChunkedSeq$ = true;
cljs.core.ChunkedCons.prototype.cljs$core$IChunkedSeq$_chunked_first$arity$1 = (function (coll){
var this__8178 = this;
return this__8178.chunk;
});
cljs.core.ChunkedCons.prototype.cljs$core$IChunkedSeq$_chunked_rest$arity$1 = (function (coll){
var this__8179 = this;
if((this__8179.more == null))
{return cljs.core.List.EMPTY;
} else
{return this__8179.more;
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
if((function (){var G__8183__8184 = s;
if(G__8183__8184)
{if(cljs.core.truth_((function (){var or__3824__auto____8185 = null;
if(cljs.core.truth_(or__3824__auto____8185))
{return or__3824__auto____8185;
} else
{return G__8183__8184.cljs$core$IChunkedNext$;
}
})()))
{return true;
} else
{if((!G__8183__8184.cljs$lang$protocol_mask$partition$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IChunkedNext,G__8183__8184);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IChunkedNext,G__8183__8184);
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
var ary__8188 = [];
var s__8189 = s;
while(true){
if(cljs.core.seq.call(null,s__8189))
{ary__8188.push(cljs.core.first.call(null,s__8189));
{
var G__8190 = cljs.core.next.call(null,s__8189);
s__8189 = G__8190;
continue;
}
} else
{return ary__8188;
}
break;
}
});
/**
* Returns a (potentially-ragged) 2-dimensional array
* containing the contents of coll.
*/
cljs.core.to_array_2d = (function to_array_2d(coll){
var ret__8194 = cljs.core.make_array.call(null,cljs.core.count.call(null,coll));
var i__8195 = 0;
var xs__8196 = cljs.core.seq.call(null,coll);
while(true){
if(xs__8196)
{(ret__8194[i__8195] = cljs.core.to_array.call(null,cljs.core.first.call(null,xs__8196)));
{
var G__8197 = (i__8195 + 1);
var G__8198 = cljs.core.next.call(null,xs__8196);
i__8195 = G__8197;
xs__8196 = G__8198;
continue;
}
} else
{}
break;
}
return ret__8194;
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
var a__8206 = cljs.core.make_array.call(null,size);
if(cljs.core.seq_QMARK_.call(null,init_val_or_seq))
{var s__8207 = cljs.core.seq.call(null,init_val_or_seq);
var i__8208 = 0;
var s__8209 = s__8207;
while(true){
if(cljs.core.truth_((function (){var and__3822__auto____8210 = s__8209;
if(and__3822__auto____8210)
{return (i__8208 < size);
} else
{return and__3822__auto____8210;
}
})()))
{(a__8206[i__8208] = cljs.core.first.call(null,s__8209));
{
var G__8213 = (i__8208 + 1);
var G__8214 = cljs.core.next.call(null,s__8209);
i__8208 = G__8213;
s__8209 = G__8214;
continue;
}
} else
{return a__8206;
}
break;
}
} else
{var n__3220__auto____8211 = size;
var i__8212 = 0;
while(true){
if((i__8212 < n__3220__auto____8211))
{(a__8206[i__8212] = init_val_or_seq);
{
var G__8215 = (i__8212 + 1);
i__8212 = G__8215;
continue;
}
} else
{}
break;
}
return a__8206;
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
var a__8223 = cljs.core.make_array.call(null,size);
if(cljs.core.seq_QMARK_.call(null,init_val_or_seq))
{var s__8224 = cljs.core.seq.call(null,init_val_or_seq);
var i__8225 = 0;
var s__8226 = s__8224;
while(true){
if(cljs.core.truth_((function (){var and__3822__auto____8227 = s__8226;
if(and__3822__auto____8227)
{return (i__8225 < size);
} else
{return and__3822__auto____8227;
}
})()))
{(a__8223[i__8225] = cljs.core.first.call(null,s__8226));
{
var G__8230 = (i__8225 + 1);
var G__8231 = cljs.core.next.call(null,s__8226);
i__8225 = G__8230;
s__8226 = G__8231;
continue;
}
} else
{return a__8223;
}
break;
}
} else
{var n__3220__auto____8228 = size;
var i__8229 = 0;
while(true){
if((i__8229 < n__3220__auto____8228))
{(a__8223[i__8229] = init_val_or_seq);
{
var G__8232 = (i__8229 + 1);
i__8229 = G__8232;
continue;
}
} else
{}
break;
}
return a__8223;
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
var a__8240 = cljs.core.make_array.call(null,size);
if(cljs.core.seq_QMARK_.call(null,init_val_or_seq))
{var s__8241 = cljs.core.seq.call(null,init_val_or_seq);
var i__8242 = 0;
var s__8243 = s__8241;
while(true){
if(cljs.core.truth_((function (){var and__3822__auto____8244 = s__8243;
if(and__3822__auto____8244)
{return (i__8242 < size);
} else
{return and__3822__auto____8244;
}
})()))
{(a__8240[i__8242] = cljs.core.first.call(null,s__8243));
{
var G__8247 = (i__8242 + 1);
var G__8248 = cljs.core.next.call(null,s__8243);
i__8242 = G__8247;
s__8243 = G__8248;
continue;
}
} else
{return a__8240;
}
break;
}
} else
{var n__3220__auto____8245 = size;
var i__8246 = 0;
while(true){
if((i__8246 < n__3220__auto____8245))
{(a__8240[i__8246] = init_val_or_seq);
{
var G__8249 = (i__8246 + 1);
i__8246 = G__8249;
continue;
}
} else
{}
break;
}
return a__8240;
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
{var s__8254 = s;
var i__8255 = n;
var sum__8256 = 0;
while(true){
if(cljs.core.truth_((function (){var and__3822__auto____8257 = (i__8255 > 0);
if(and__3822__auto____8257)
{return cljs.core.seq.call(null,s__8254);
} else
{return and__3822__auto____8257;
}
})()))
{{
var G__8258 = cljs.core.next.call(null,s__8254);
var G__8259 = (i__8255 - 1);
var G__8260 = (sum__8256 + 1);
s__8254 = G__8258;
i__8255 = G__8259;
sum__8256 = G__8260;
continue;
}
} else
{return sum__8256;
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
var s__8265 = cljs.core.seq.call(null,x);
if(s__8265)
{if(cljs.core.chunked_seq_QMARK_.call(null,s__8265))
{return cljs.core.chunk_cons.call(null,cljs.core.chunk_first.call(null,s__8265),concat.call(null,cljs.core.chunk_rest.call(null,s__8265),y));
} else
{return cljs.core.cons.call(null,cljs.core.first.call(null,s__8265),concat.call(null,cljs.core.rest.call(null,s__8265),y));
}
} else
{return y;
}
}),null));
});
var concat__3 = (function() { 
var G__8269__delegate = function (x,y,zs){
var cat__8268 = (function cat(xys,zs){
return (new cljs.core.LazySeq(null,false,(function (){
var xys__8267 = cljs.core.seq.call(null,xys);
if(xys__8267)
{if(cljs.core.chunked_seq_QMARK_.call(null,xys__8267))
{return cljs.core.chunk_cons.call(null,cljs.core.chunk_first.call(null,xys__8267),cat.call(null,cljs.core.chunk_rest.call(null,xys__8267),zs));
} else
{return cljs.core.cons.call(null,cljs.core.first.call(null,xys__8267),cat.call(null,cljs.core.rest.call(null,xys__8267),zs));
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
return cat__8268.call(null,concat.call(null,x,y),zs);
};
var G__8269 = function (x,y,var_args){
var zs = null;
if (goog.isDef(var_args)) {
  zs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__8269__delegate.call(this, x, y, zs);
};
G__8269.cljs$lang$maxFixedArity = 2;
G__8269.cljs$lang$applyTo = (function (arglist__8270){
var x = cljs.core.first(arglist__8270);
var y = cljs.core.first(cljs.core.next(arglist__8270));
var zs = cljs.core.rest(cljs.core.next(arglist__8270));
return G__8269__delegate(x, y, zs);
});
G__8269.cljs$lang$arity$variadic = G__8269__delegate;
return G__8269;
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
var G__8271__delegate = function (a,b,c,d,more){
return cljs.core.cons.call(null,a,cljs.core.cons.call(null,b,cljs.core.cons.call(null,c,cljs.core.cons.call(null,d,cljs.core.spread.call(null,more)))));
};
var G__8271 = function (a,b,c,d,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4),0);
} 
return G__8271__delegate.call(this, a, b, c, d, more);
};
G__8271.cljs$lang$maxFixedArity = 4;
G__8271.cljs$lang$applyTo = (function (arglist__8272){
var a = cljs.core.first(arglist__8272);
var b = cljs.core.first(cljs.core.next(arglist__8272));
var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8272)));
var d = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__8272))));
var more = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__8272))));
return G__8271__delegate(a, b, c, d, more);
});
G__8271.cljs$lang$arity$variadic = G__8271__delegate;
return G__8271;
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
var args__8314 = cljs.core.seq.call(null,args);
if((argc === 0))
{return f.call(null);
} else
{var a__8315 = cljs.core._first.call(null,args__8314);
var args__8316 = cljs.core._rest.call(null,args__8314);
if((argc === 1))
{if(f.cljs$lang$arity$1)
{return f.cljs$lang$arity$1(a__8315);
} else
{return f.call(null,a__8315);
}
} else
{var b__8317 = cljs.core._first.call(null,args__8316);
var args__8318 = cljs.core._rest.call(null,args__8316);
if((argc === 2))
{if(f.cljs$lang$arity$2)
{return f.cljs$lang$arity$2(a__8315,b__8317);
} else
{return f.call(null,a__8315,b__8317);
}
} else
{var c__8319 = cljs.core._first.call(null,args__8318);
var args__8320 = cljs.core._rest.call(null,args__8318);
if((argc === 3))
{if(f.cljs$lang$arity$3)
{return f.cljs$lang$arity$3(a__8315,b__8317,c__8319);
} else
{return f.call(null,a__8315,b__8317,c__8319);
}
} else
{var d__8321 = cljs.core._first.call(null,args__8320);
var args__8322 = cljs.core._rest.call(null,args__8320);
if((argc === 4))
{if(f.cljs$lang$arity$4)
{return f.cljs$lang$arity$4(a__8315,b__8317,c__8319,d__8321);
} else
{return f.call(null,a__8315,b__8317,c__8319,d__8321);
}
} else
{var e__8323 = cljs.core._first.call(null,args__8322);
var args__8324 = cljs.core._rest.call(null,args__8322);
if((argc === 5))
{if(f.cljs$lang$arity$5)
{return f.cljs$lang$arity$5(a__8315,b__8317,c__8319,d__8321,e__8323);
} else
{return f.call(null,a__8315,b__8317,c__8319,d__8321,e__8323);
}
} else
{var f__8325 = cljs.core._first.call(null,args__8324);
var args__8326 = cljs.core._rest.call(null,args__8324);
if((argc === 6))
{if(f__8325.cljs$lang$arity$6)
{return f__8325.cljs$lang$arity$6(a__8315,b__8317,c__8319,d__8321,e__8323,f__8325);
} else
{return f__8325.call(null,a__8315,b__8317,c__8319,d__8321,e__8323,f__8325);
}
} else
{var g__8327 = cljs.core._first.call(null,args__8326);
var args__8328 = cljs.core._rest.call(null,args__8326);
if((argc === 7))
{if(f__8325.cljs$lang$arity$7)
{return f__8325.cljs$lang$arity$7(a__8315,b__8317,c__8319,d__8321,e__8323,f__8325,g__8327);
} else
{return f__8325.call(null,a__8315,b__8317,c__8319,d__8321,e__8323,f__8325,g__8327);
}
} else
{var h__8329 = cljs.core._first.call(null,args__8328);
var args__8330 = cljs.core._rest.call(null,args__8328);
if((argc === 8))
{if(f__8325.cljs$lang$arity$8)
{return f__8325.cljs$lang$arity$8(a__8315,b__8317,c__8319,d__8321,e__8323,f__8325,g__8327,h__8329);
} else
{return f__8325.call(null,a__8315,b__8317,c__8319,d__8321,e__8323,f__8325,g__8327,h__8329);
}
} else
{var i__8331 = cljs.core._first.call(null,args__8330);
var args__8332 = cljs.core._rest.call(null,args__8330);
if((argc === 9))
{if(f__8325.cljs$lang$arity$9)
{return f__8325.cljs$lang$arity$9(a__8315,b__8317,c__8319,d__8321,e__8323,f__8325,g__8327,h__8329,i__8331);
} else
{return f__8325.call(null,a__8315,b__8317,c__8319,d__8321,e__8323,f__8325,g__8327,h__8329,i__8331);
}
} else
{var j__8333 = cljs.core._first.call(null,args__8332);
var args__8334 = cljs.core._rest.call(null,args__8332);
if((argc === 10))
{if(f__8325.cljs$lang$arity$10)
{return f__8325.cljs$lang$arity$10(a__8315,b__8317,c__8319,d__8321,e__8323,f__8325,g__8327,h__8329,i__8331,j__8333);
} else
{return f__8325.call(null,a__8315,b__8317,c__8319,d__8321,e__8323,f__8325,g__8327,h__8329,i__8331,j__8333);
}
} else
{var k__8335 = cljs.core._first.call(null,args__8334);
var args__8336 = cljs.core._rest.call(null,args__8334);
if((argc === 11))
{if(f__8325.cljs$lang$arity$11)
{return f__8325.cljs$lang$arity$11(a__8315,b__8317,c__8319,d__8321,e__8323,f__8325,g__8327,h__8329,i__8331,j__8333,k__8335);
} else
{return f__8325.call(null,a__8315,b__8317,c__8319,d__8321,e__8323,f__8325,g__8327,h__8329,i__8331,j__8333,k__8335);
}
} else
{var l__8337 = cljs.core._first.call(null,args__8336);
var args__8338 = cljs.core._rest.call(null,args__8336);
if((argc === 12))
{if(f__8325.cljs$lang$arity$12)
{return f__8325.cljs$lang$arity$12(a__8315,b__8317,c__8319,d__8321,e__8323,f__8325,g__8327,h__8329,i__8331,j__8333,k__8335,l__8337);
} else
{return f__8325.call(null,a__8315,b__8317,c__8319,d__8321,e__8323,f__8325,g__8327,h__8329,i__8331,j__8333,k__8335,l__8337);
}
} else
{var m__8339 = cljs.core._first.call(null,args__8338);
var args__8340 = cljs.core._rest.call(null,args__8338);
if((argc === 13))
{if(f__8325.cljs$lang$arity$13)
{return f__8325.cljs$lang$arity$13(a__8315,b__8317,c__8319,d__8321,e__8323,f__8325,g__8327,h__8329,i__8331,j__8333,k__8335,l__8337,m__8339);
} else
{return f__8325.call(null,a__8315,b__8317,c__8319,d__8321,e__8323,f__8325,g__8327,h__8329,i__8331,j__8333,k__8335,l__8337,m__8339);
}
} else
{var n__8341 = cljs.core._first.call(null,args__8340);
var args__8342 = cljs.core._rest.call(null,args__8340);
if((argc === 14))
{if(f__8325.cljs$lang$arity$14)
{return f__8325.cljs$lang$arity$14(a__8315,b__8317,c__8319,d__8321,e__8323,f__8325,g__8327,h__8329,i__8331,j__8333,k__8335,l__8337,m__8339,n__8341);
} else
{return f__8325.call(null,a__8315,b__8317,c__8319,d__8321,e__8323,f__8325,g__8327,h__8329,i__8331,j__8333,k__8335,l__8337,m__8339,n__8341);
}
} else
{var o__8343 = cljs.core._first.call(null,args__8342);
var args__8344 = cljs.core._rest.call(null,args__8342);
if((argc === 15))
{if(f__8325.cljs$lang$arity$15)
{return f__8325.cljs$lang$arity$15(a__8315,b__8317,c__8319,d__8321,e__8323,f__8325,g__8327,h__8329,i__8331,j__8333,k__8335,l__8337,m__8339,n__8341,o__8343);
} else
{return f__8325.call(null,a__8315,b__8317,c__8319,d__8321,e__8323,f__8325,g__8327,h__8329,i__8331,j__8333,k__8335,l__8337,m__8339,n__8341,o__8343);
}
} else
{var p__8345 = cljs.core._first.call(null,args__8344);
var args__8346 = cljs.core._rest.call(null,args__8344);
if((argc === 16))
{if(f__8325.cljs$lang$arity$16)
{return f__8325.cljs$lang$arity$16(a__8315,b__8317,c__8319,d__8321,e__8323,f__8325,g__8327,h__8329,i__8331,j__8333,k__8335,l__8337,m__8339,n__8341,o__8343,p__8345);
} else
{return f__8325.call(null,a__8315,b__8317,c__8319,d__8321,e__8323,f__8325,g__8327,h__8329,i__8331,j__8333,k__8335,l__8337,m__8339,n__8341,o__8343,p__8345);
}
} else
{var q__8347 = cljs.core._first.call(null,args__8346);
var args__8348 = cljs.core._rest.call(null,args__8346);
if((argc === 17))
{if(f__8325.cljs$lang$arity$17)
{return f__8325.cljs$lang$arity$17(a__8315,b__8317,c__8319,d__8321,e__8323,f__8325,g__8327,h__8329,i__8331,j__8333,k__8335,l__8337,m__8339,n__8341,o__8343,p__8345,q__8347);
} else
{return f__8325.call(null,a__8315,b__8317,c__8319,d__8321,e__8323,f__8325,g__8327,h__8329,i__8331,j__8333,k__8335,l__8337,m__8339,n__8341,o__8343,p__8345,q__8347);
}
} else
{var r__8349 = cljs.core._first.call(null,args__8348);
var args__8350 = cljs.core._rest.call(null,args__8348);
if((argc === 18))
{if(f__8325.cljs$lang$arity$18)
{return f__8325.cljs$lang$arity$18(a__8315,b__8317,c__8319,d__8321,e__8323,f__8325,g__8327,h__8329,i__8331,j__8333,k__8335,l__8337,m__8339,n__8341,o__8343,p__8345,q__8347,r__8349);
} else
{return f__8325.call(null,a__8315,b__8317,c__8319,d__8321,e__8323,f__8325,g__8327,h__8329,i__8331,j__8333,k__8335,l__8337,m__8339,n__8341,o__8343,p__8345,q__8347,r__8349);
}
} else
{var s__8351 = cljs.core._first.call(null,args__8350);
var args__8352 = cljs.core._rest.call(null,args__8350);
if((argc === 19))
{if(f__8325.cljs$lang$arity$19)
{return f__8325.cljs$lang$arity$19(a__8315,b__8317,c__8319,d__8321,e__8323,f__8325,g__8327,h__8329,i__8331,j__8333,k__8335,l__8337,m__8339,n__8341,o__8343,p__8345,q__8347,r__8349,s__8351);
} else
{return f__8325.call(null,a__8315,b__8317,c__8319,d__8321,e__8323,f__8325,g__8327,h__8329,i__8331,j__8333,k__8335,l__8337,m__8339,n__8341,o__8343,p__8345,q__8347,r__8349,s__8351);
}
} else
{var t__8353 = cljs.core._first.call(null,args__8352);
var args__8354 = cljs.core._rest.call(null,args__8352);
if((argc === 20))
{if(f__8325.cljs$lang$arity$20)
{return f__8325.cljs$lang$arity$20(a__8315,b__8317,c__8319,d__8321,e__8323,f__8325,g__8327,h__8329,i__8331,j__8333,k__8335,l__8337,m__8339,n__8341,o__8343,p__8345,q__8347,r__8349,s__8351,t__8353);
} else
{return f__8325.call(null,a__8315,b__8317,c__8319,d__8321,e__8323,f__8325,g__8327,h__8329,i__8331,j__8333,k__8335,l__8337,m__8339,n__8341,o__8343,p__8345,q__8347,r__8349,s__8351,t__8353);
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
var fixed_arity__8369 = f.cljs$lang$maxFixedArity;
if(cljs.core.truth_(f.cljs$lang$applyTo))
{var bc__8370 = cljs.core.bounded_count.call(null,args,(fixed_arity__8369 + 1));
if((bc__8370 <= fixed_arity__8369))
{return cljs.core.apply_to.call(null,f,bc__8370,args);
} else
{return f.cljs$lang$applyTo(args);
}
} else
{return f.apply(f,cljs.core.to_array.call(null,args));
}
});
var apply__3 = (function (f,x,args){
var arglist__8371 = cljs.core.list_STAR_.call(null,x,args);
var fixed_arity__8372 = f.cljs$lang$maxFixedArity;
if(cljs.core.truth_(f.cljs$lang$applyTo))
{var bc__8373 = cljs.core.bounded_count.call(null,arglist__8371,(fixed_arity__8372 + 1));
if((bc__8373 <= fixed_arity__8372))
{return cljs.core.apply_to.call(null,f,bc__8373,arglist__8371);
} else
{return f.cljs$lang$applyTo(arglist__8371);
}
} else
{return f.apply(f,cljs.core.to_array.call(null,arglist__8371));
}
});
var apply__4 = (function (f,x,y,args){
var arglist__8374 = cljs.core.list_STAR_.call(null,x,y,args);
var fixed_arity__8375 = f.cljs$lang$maxFixedArity;
if(cljs.core.truth_(f.cljs$lang$applyTo))
{var bc__8376 = cljs.core.bounded_count.call(null,arglist__8374,(fixed_arity__8375 + 1));
if((bc__8376 <= fixed_arity__8375))
{return cljs.core.apply_to.call(null,f,bc__8376,arglist__8374);
} else
{return f.cljs$lang$applyTo(arglist__8374);
}
} else
{return f.apply(f,cljs.core.to_array.call(null,arglist__8374));
}
});
var apply__5 = (function (f,x,y,z,args){
var arglist__8377 = cljs.core.list_STAR_.call(null,x,y,z,args);
var fixed_arity__8378 = f.cljs$lang$maxFixedArity;
if(cljs.core.truth_(f.cljs$lang$applyTo))
{var bc__8379 = cljs.core.bounded_count.call(null,arglist__8377,(fixed_arity__8378 + 1));
if((bc__8379 <= fixed_arity__8378))
{return cljs.core.apply_to.call(null,f,bc__8379,arglist__8377);
} else
{return f.cljs$lang$applyTo(arglist__8377);
}
} else
{return f.apply(f,cljs.core.to_array.call(null,arglist__8377));
}
});
var apply__6 = (function() { 
var G__8383__delegate = function (f,a,b,c,d,args){
var arglist__8380 = cljs.core.cons.call(null,a,cljs.core.cons.call(null,b,cljs.core.cons.call(null,c,cljs.core.cons.call(null,d,cljs.core.spread.call(null,args)))));
var fixed_arity__8381 = f.cljs$lang$maxFixedArity;
if(cljs.core.truth_(f.cljs$lang$applyTo))
{var bc__8382 = cljs.core.bounded_count.call(null,arglist__8380,(fixed_arity__8381 + 1));
if((bc__8382 <= fixed_arity__8381))
{return cljs.core.apply_to.call(null,f,bc__8382,arglist__8380);
} else
{return f.cljs$lang$applyTo(arglist__8380);
}
} else
{return f.apply(f,cljs.core.to_array.call(null,arglist__8380));
}
};
var G__8383 = function (f,a,b,c,d,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 5),0);
} 
return G__8383__delegate.call(this, f, a, b, c, d, args);
};
G__8383.cljs$lang$maxFixedArity = 5;
G__8383.cljs$lang$applyTo = (function (arglist__8384){
var f = cljs.core.first(arglist__8384);
var a = cljs.core.first(cljs.core.next(arglist__8384));
var b = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8384)));
var c = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__8384))));
var d = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__8384)))));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__8384)))));
return G__8383__delegate(f, a, b, c, d, args);
});
G__8383.cljs$lang$arity$variadic = G__8383__delegate;
return G__8383;
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
vary_meta.cljs$lang$applyTo = (function (arglist__8385){
var obj = cljs.core.first(arglist__8385);
var f = cljs.core.first(cljs.core.next(arglist__8385));
var args = cljs.core.rest(cljs.core.next(arglist__8385));
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
var G__8386__delegate = function (x,y,more){
return cljs.core.not.call(null,cljs.core.apply.call(null,cljs.core._EQ_,x,y,more));
};
var G__8386 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__8386__delegate.call(this, x, y, more);
};
G__8386.cljs$lang$maxFixedArity = 2;
G__8386.cljs$lang$applyTo = (function (arglist__8387){
var x = cljs.core.first(arglist__8387);
var y = cljs.core.first(cljs.core.next(arglist__8387));
var more = cljs.core.rest(cljs.core.next(arglist__8387));
return G__8386__delegate(x, y, more);
});
G__8386.cljs$lang$arity$variadic = G__8386__delegate;
return G__8386;
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
var G__8388 = pred;
var G__8389 = cljs.core.next.call(null,coll);
pred = G__8388;
coll = G__8389;
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
{var or__3824__auto____8391 = pred.call(null,cljs.core.first.call(null,coll));
if(cljs.core.truth_(or__3824__auto____8391))
{return or__3824__auto____8391;
} else
{{
var G__8392 = pred;
var G__8393 = cljs.core.next.call(null,coll);
pred = G__8392;
coll = G__8393;
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
var G__8394 = null;
var G__8394__0 = (function (){
return cljs.core.not.call(null,f.call(null));
});
var G__8394__1 = (function (x){
return cljs.core.not.call(null,f.call(null,x));
});
var G__8394__2 = (function (x,y){
return cljs.core.not.call(null,f.call(null,x,y));
});
var G__8394__3 = (function() { 
var G__8395__delegate = function (x,y,zs){
return cljs.core.not.call(null,cljs.core.apply.call(null,f,x,y,zs));
};
var G__8395 = function (x,y,var_args){
var zs = null;
if (goog.isDef(var_args)) {
  zs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__8395__delegate.call(this, x, y, zs);
};
G__8395.cljs$lang$maxFixedArity = 2;
G__8395.cljs$lang$applyTo = (function (arglist__8396){
var x = cljs.core.first(arglist__8396);
var y = cljs.core.first(cljs.core.next(arglist__8396));
var zs = cljs.core.rest(cljs.core.next(arglist__8396));
return G__8395__delegate(x, y, zs);
});
G__8395.cljs$lang$arity$variadic = G__8395__delegate;
return G__8395;
})()
;
G__8394 = function(x,y,var_args){
var zs = var_args;
switch(arguments.length){
case 0:
return G__8394__0.call(this);
case 1:
return G__8394__1.call(this,x);
case 2:
return G__8394__2.call(this,x,y);
default:
return G__8394__3.cljs$lang$arity$variadic(x,y, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
G__8394.cljs$lang$maxFixedArity = 2;
G__8394.cljs$lang$applyTo = G__8394__3.cljs$lang$applyTo;
return G__8394;
})()
});
/**
* Returns a function that takes any number of arguments and returns x.
*/
cljs.core.constantly = (function constantly(x){
return (function() { 
var G__8397__delegate = function (args){
return x;
};
var G__8397 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__8397__delegate.call(this, args);
};
G__8397.cljs$lang$maxFixedArity = 0;
G__8397.cljs$lang$applyTo = (function (arglist__8398){
var args = cljs.core.seq(arglist__8398);;
return G__8397__delegate(args);
});
G__8397.cljs$lang$arity$variadic = G__8397__delegate;
return G__8397;
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
var G__8405 = null;
var G__8405__0 = (function (){
return f.call(null,g.call(null));
});
var G__8405__1 = (function (x){
return f.call(null,g.call(null,x));
});
var G__8405__2 = (function (x,y){
return f.call(null,g.call(null,x,y));
});
var G__8405__3 = (function (x,y,z){
return f.call(null,g.call(null,x,y,z));
});
var G__8405__4 = (function() { 
var G__8406__delegate = function (x,y,z,args){
return f.call(null,cljs.core.apply.call(null,g,x,y,z,args));
};
var G__8406 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__8406__delegate.call(this, x, y, z, args);
};
G__8406.cljs$lang$maxFixedArity = 3;
G__8406.cljs$lang$applyTo = (function (arglist__8407){
var x = cljs.core.first(arglist__8407);
var y = cljs.core.first(cljs.core.next(arglist__8407));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8407)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8407)));
return G__8406__delegate(x, y, z, args);
});
G__8406.cljs$lang$arity$variadic = G__8406__delegate;
return G__8406;
})()
;
G__8405 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case 0:
return G__8405__0.call(this);
case 1:
return G__8405__1.call(this,x);
case 2:
return G__8405__2.call(this,x,y);
case 3:
return G__8405__3.call(this,x,y,z);
default:
return G__8405__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
G__8405.cljs$lang$maxFixedArity = 3;
G__8405.cljs$lang$applyTo = G__8405__4.cljs$lang$applyTo;
return G__8405;
})()
});
var comp__3 = (function (f,g,h){
return (function() {
var G__8408 = null;
var G__8408__0 = (function (){
return f.call(null,g.call(null,h.call(null)));
});
var G__8408__1 = (function (x){
return f.call(null,g.call(null,h.call(null,x)));
});
var G__8408__2 = (function (x,y){
return f.call(null,g.call(null,h.call(null,x,y)));
});
var G__8408__3 = (function (x,y,z){
return f.call(null,g.call(null,h.call(null,x,y,z)));
});
var G__8408__4 = (function() { 
var G__8409__delegate = function (x,y,z,args){
return f.call(null,g.call(null,cljs.core.apply.call(null,h,x,y,z,args)));
};
var G__8409 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__8409__delegate.call(this, x, y, z, args);
};
G__8409.cljs$lang$maxFixedArity = 3;
G__8409.cljs$lang$applyTo = (function (arglist__8410){
var x = cljs.core.first(arglist__8410);
var y = cljs.core.first(cljs.core.next(arglist__8410));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8410)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8410)));
return G__8409__delegate(x, y, z, args);
});
G__8409.cljs$lang$arity$variadic = G__8409__delegate;
return G__8409;
})()
;
G__8408 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case 0:
return G__8408__0.call(this);
case 1:
return G__8408__1.call(this,x);
case 2:
return G__8408__2.call(this,x,y);
case 3:
return G__8408__3.call(this,x,y,z);
default:
return G__8408__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
G__8408.cljs$lang$maxFixedArity = 3;
G__8408.cljs$lang$applyTo = G__8408__4.cljs$lang$applyTo;
return G__8408;
})()
});
var comp__4 = (function() { 
var G__8411__delegate = function (f1,f2,f3,fs){
var fs__8402 = cljs.core.reverse.call(null,cljs.core.list_STAR_.call(null,f1,f2,f3,fs));
return (function() { 
var G__8412__delegate = function (args){
var ret__8403 = cljs.core.apply.call(null,cljs.core.first.call(null,fs__8402),args);
var fs__8404 = cljs.core.next.call(null,fs__8402);
while(true){
if(fs__8404)
{{
var G__8413 = cljs.core.first.call(null,fs__8404).call(null,ret__8403);
var G__8414 = cljs.core.next.call(null,fs__8404);
ret__8403 = G__8413;
fs__8404 = G__8414;
continue;
}
} else
{return ret__8403;
}
break;
}
};
var G__8412 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__8412__delegate.call(this, args);
};
G__8412.cljs$lang$maxFixedArity = 0;
G__8412.cljs$lang$applyTo = (function (arglist__8415){
var args = cljs.core.seq(arglist__8415);;
return G__8412__delegate(args);
});
G__8412.cljs$lang$arity$variadic = G__8412__delegate;
return G__8412;
})()
;
};
var G__8411 = function (f1,f2,f3,var_args){
var fs = null;
if (goog.isDef(var_args)) {
  fs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__8411__delegate.call(this, f1, f2, f3, fs);
};
G__8411.cljs$lang$maxFixedArity = 3;
G__8411.cljs$lang$applyTo = (function (arglist__8416){
var f1 = cljs.core.first(arglist__8416);
var f2 = cljs.core.first(cljs.core.next(arglist__8416));
var f3 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8416)));
var fs = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8416)));
return G__8411__delegate(f1, f2, f3, fs);
});
G__8411.cljs$lang$arity$variadic = G__8411__delegate;
return G__8411;
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
var G__8417__delegate = function (args){
return cljs.core.apply.call(null,f,arg1,args);
};
var G__8417 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__8417__delegate.call(this, args);
};
G__8417.cljs$lang$maxFixedArity = 0;
G__8417.cljs$lang$applyTo = (function (arglist__8418){
var args = cljs.core.seq(arglist__8418);;
return G__8417__delegate(args);
});
G__8417.cljs$lang$arity$variadic = G__8417__delegate;
return G__8417;
})()
;
});
var partial__3 = (function (f,arg1,arg2){
return (function() { 
var G__8419__delegate = function (args){
return cljs.core.apply.call(null,f,arg1,arg2,args);
};
var G__8419 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__8419__delegate.call(this, args);
};
G__8419.cljs$lang$maxFixedArity = 0;
G__8419.cljs$lang$applyTo = (function (arglist__8420){
var args = cljs.core.seq(arglist__8420);;
return G__8419__delegate(args);
});
G__8419.cljs$lang$arity$variadic = G__8419__delegate;
return G__8419;
})()
;
});
var partial__4 = (function (f,arg1,arg2,arg3){
return (function() { 
var G__8421__delegate = function (args){
return cljs.core.apply.call(null,f,arg1,arg2,arg3,args);
};
var G__8421 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__8421__delegate.call(this, args);
};
G__8421.cljs$lang$maxFixedArity = 0;
G__8421.cljs$lang$applyTo = (function (arglist__8422){
var args = cljs.core.seq(arglist__8422);;
return G__8421__delegate(args);
});
G__8421.cljs$lang$arity$variadic = G__8421__delegate;
return G__8421;
})()
;
});
var partial__5 = (function() { 
var G__8423__delegate = function (f,arg1,arg2,arg3,more){
return (function() { 
var G__8424__delegate = function (args){
return cljs.core.apply.call(null,f,arg1,arg2,arg3,cljs.core.concat.call(null,more,args));
};
var G__8424 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__8424__delegate.call(this, args);
};
G__8424.cljs$lang$maxFixedArity = 0;
G__8424.cljs$lang$applyTo = (function (arglist__8425){
var args = cljs.core.seq(arglist__8425);;
return G__8424__delegate(args);
});
G__8424.cljs$lang$arity$variadic = G__8424__delegate;
return G__8424;
})()
;
};
var G__8423 = function (f,arg1,arg2,arg3,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4),0);
} 
return G__8423__delegate.call(this, f, arg1, arg2, arg3, more);
};
G__8423.cljs$lang$maxFixedArity = 4;
G__8423.cljs$lang$applyTo = (function (arglist__8426){
var f = cljs.core.first(arglist__8426);
var arg1 = cljs.core.first(cljs.core.next(arglist__8426));
var arg2 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8426)));
var arg3 = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__8426))));
var more = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__8426))));
return G__8423__delegate(f, arg1, arg2, arg3, more);
});
G__8423.cljs$lang$arity$variadic = G__8423__delegate;
return G__8423;
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
var G__8427 = null;
var G__8427__1 = (function (a){
return f.call(null,(((a == null))?x:a));
});
var G__8427__2 = (function (a,b){
return f.call(null,(((a == null))?x:a),b);
});
var G__8427__3 = (function (a,b,c){
return f.call(null,(((a == null))?x:a),b,c);
});
var G__8427__4 = (function() { 
var G__8428__delegate = function (a,b,c,ds){
return cljs.core.apply.call(null,f,(((a == null))?x:a),b,c,ds);
};
var G__8428 = function (a,b,c,var_args){
var ds = null;
if (goog.isDef(var_args)) {
  ds = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__8428__delegate.call(this, a, b, c, ds);
};
G__8428.cljs$lang$maxFixedArity = 3;
G__8428.cljs$lang$applyTo = (function (arglist__8429){
var a = cljs.core.first(arglist__8429);
var b = cljs.core.first(cljs.core.next(arglist__8429));
var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8429)));
var ds = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8429)));
return G__8428__delegate(a, b, c, ds);
});
G__8428.cljs$lang$arity$variadic = G__8428__delegate;
return G__8428;
})()
;
G__8427 = function(a,b,c,var_args){
var ds = var_args;
switch(arguments.length){
case 1:
return G__8427__1.call(this,a);
case 2:
return G__8427__2.call(this,a,b);
case 3:
return G__8427__3.call(this,a,b,c);
default:
return G__8427__4.cljs$lang$arity$variadic(a,b,c, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
G__8427.cljs$lang$maxFixedArity = 3;
G__8427.cljs$lang$applyTo = G__8427__4.cljs$lang$applyTo;
return G__8427;
})()
});
var fnil__3 = (function (f,x,y){
return (function() {
var G__8430 = null;
var G__8430__2 = (function (a,b){
return f.call(null,(((a == null))?x:a),(((b == null))?y:b));
});
var G__8430__3 = (function (a,b,c){
return f.call(null,(((a == null))?x:a),(((b == null))?y:b),c);
});
var G__8430__4 = (function() { 
var G__8431__delegate = function (a,b,c,ds){
return cljs.core.apply.call(null,f,(((a == null))?x:a),(((b == null))?y:b),c,ds);
};
var G__8431 = function (a,b,c,var_args){
var ds = null;
if (goog.isDef(var_args)) {
  ds = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__8431__delegate.call(this, a, b, c, ds);
};
G__8431.cljs$lang$maxFixedArity = 3;
G__8431.cljs$lang$applyTo = (function (arglist__8432){
var a = cljs.core.first(arglist__8432);
var b = cljs.core.first(cljs.core.next(arglist__8432));
var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8432)));
var ds = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8432)));
return G__8431__delegate(a, b, c, ds);
});
G__8431.cljs$lang$arity$variadic = G__8431__delegate;
return G__8431;
})()
;
G__8430 = function(a,b,c,var_args){
var ds = var_args;
switch(arguments.length){
case 2:
return G__8430__2.call(this,a,b);
case 3:
return G__8430__3.call(this,a,b,c);
default:
return G__8430__4.cljs$lang$arity$variadic(a,b,c, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
G__8430.cljs$lang$maxFixedArity = 3;
G__8430.cljs$lang$applyTo = G__8430__4.cljs$lang$applyTo;
return G__8430;
})()
});
var fnil__4 = (function (f,x,y,z){
return (function() {
var G__8433 = null;
var G__8433__2 = (function (a,b){
return f.call(null,(((a == null))?x:a),(((b == null))?y:b));
});
var G__8433__3 = (function (a,b,c){
return f.call(null,(((a == null))?x:a),(((b == null))?y:b),(((c == null))?z:c));
});
var G__8433__4 = (function() { 
var G__8434__delegate = function (a,b,c,ds){
return cljs.core.apply.call(null,f,(((a == null))?x:a),(((b == null))?y:b),(((c == null))?z:c),ds);
};
var G__8434 = function (a,b,c,var_args){
var ds = null;
if (goog.isDef(var_args)) {
  ds = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__8434__delegate.call(this, a, b, c, ds);
};
G__8434.cljs$lang$maxFixedArity = 3;
G__8434.cljs$lang$applyTo = (function (arglist__8435){
var a = cljs.core.first(arglist__8435);
var b = cljs.core.first(cljs.core.next(arglist__8435));
var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8435)));
var ds = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8435)));
return G__8434__delegate(a, b, c, ds);
});
G__8434.cljs$lang$arity$variadic = G__8434__delegate;
return G__8434;
})()
;
G__8433 = function(a,b,c,var_args){
var ds = var_args;
switch(arguments.length){
case 2:
return G__8433__2.call(this,a,b);
case 3:
return G__8433__3.call(this,a,b,c);
default:
return G__8433__4.cljs$lang$arity$variadic(a,b,c, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
G__8433.cljs$lang$maxFixedArity = 3;
G__8433.cljs$lang$applyTo = G__8433__4.cljs$lang$applyTo;
return G__8433;
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
var mapi__8451 = (function mapi(idx,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3974__auto____8459 = cljs.core.seq.call(null,coll);
if(temp__3974__auto____8459)
{var s__8460 = temp__3974__auto____8459;
if(cljs.core.chunked_seq_QMARK_.call(null,s__8460))
{var c__8461 = cljs.core.chunk_first.call(null,s__8460);
var size__8462 = cljs.core.count.call(null,c__8461);
var b__8463 = cljs.core.chunk_buffer.call(null,size__8462);
var n__3220__auto____8464 = size__8462;
var i__8465 = 0;
while(true){
if((i__8465 < n__3220__auto____8464))
{cljs.core.chunk_append.call(null,b__8463,f.call(null,(idx + i__8465),cljs.core._nth.call(null,c__8461,i__8465)));
{
var G__8466 = (i__8465 + 1);
i__8465 = G__8466;
continue;
}
} else
{}
break;
}
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8463),mapi.call(null,(idx + size__8462),cljs.core.chunk_rest.call(null,s__8460)));
} else
{return cljs.core.cons.call(null,f.call(null,idx,cljs.core.first.call(null,s__8460)),mapi.call(null,(idx + 1),cljs.core.rest.call(null,s__8460)));
}
} else
{return null;
}
}),null));
});
return mapi__8451.call(null,0,coll);
});
/**
* Returns a lazy sequence of the non-nil results of (f item). Note,
* this means false return values will be included.  f must be free of
* side-effects.
*/
cljs.core.keep = (function keep(f,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3974__auto____8476 = cljs.core.seq.call(null,coll);
if(temp__3974__auto____8476)
{var s__8477 = temp__3974__auto____8476;
if(cljs.core.chunked_seq_QMARK_.call(null,s__8477))
{var c__8478 = cljs.core.chunk_first.call(null,s__8477);
var size__8479 = cljs.core.count.call(null,c__8478);
var b__8480 = cljs.core.chunk_buffer.call(null,size__8479);
var n__3220__auto____8481 = size__8479;
var i__8482 = 0;
while(true){
if((i__8482 < n__3220__auto____8481))
{var x__8483 = f.call(null,cljs.core._nth.call(null,c__8478,i__8482));
if((x__8483 == null))
{} else
{cljs.core.chunk_append.call(null,b__8480,x__8483);
}
{
var G__8485 = (i__8482 + 1);
i__8482 = G__8485;
continue;
}
} else
{}
break;
}
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8480),keep.call(null,f,cljs.core.chunk_rest.call(null,s__8477)));
} else
{var x__8484 = f.call(null,cljs.core.first.call(null,s__8477));
if((x__8484 == null))
{return keep.call(null,f,cljs.core.rest.call(null,s__8477));
} else
{return cljs.core.cons.call(null,x__8484,keep.call(null,f,cljs.core.rest.call(null,s__8477)));
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
var keepi__8511 = (function keepi(idx,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3974__auto____8521 = cljs.core.seq.call(null,coll);
if(temp__3974__auto____8521)
{var s__8522 = temp__3974__auto____8521;
if(cljs.core.chunked_seq_QMARK_.call(null,s__8522))
{var c__8523 = cljs.core.chunk_first.call(null,s__8522);
var size__8524 = cljs.core.count.call(null,c__8523);
var b__8525 = cljs.core.chunk_buffer.call(null,size__8524);
var n__3220__auto____8526 = size__8524;
var i__8527 = 0;
while(true){
if((i__8527 < n__3220__auto____8526))
{var x__8528 = f.call(null,(idx + i__8527),cljs.core._nth.call(null,c__8523,i__8527));
if((x__8528 == null))
{} else
{cljs.core.chunk_append.call(null,b__8525,x__8528);
}
{
var G__8530 = (i__8527 + 1);
i__8527 = G__8530;
continue;
}
} else
{}
break;
}
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8525),keepi.call(null,(idx + size__8524),cljs.core.chunk_rest.call(null,s__8522)));
} else
{var x__8529 = f.call(null,idx,cljs.core.first.call(null,s__8522));
if((x__8529 == null))
{return keepi.call(null,(idx + 1),cljs.core.rest.call(null,s__8522));
} else
{return cljs.core.cons.call(null,x__8529,keepi.call(null,(idx + 1),cljs.core.rest.call(null,s__8522)));
}
}
} else
{return null;
}
}),null));
});
return keepi__8511.call(null,0,coll);
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
return cljs.core.boolean$.call(null,(function (){var and__3822__auto____8616 = p.call(null,x);
if(cljs.core.truth_(and__3822__auto____8616))
{return p.call(null,y);
} else
{return and__3822__auto____8616;
}
})());
});
var ep1__3 = (function (x,y,z){
return cljs.core.boolean$.call(null,(function (){var and__3822__auto____8617 = p.call(null,x);
if(cljs.core.truth_(and__3822__auto____8617))
{var and__3822__auto____8618 = p.call(null,y);
if(cljs.core.truth_(and__3822__auto____8618))
{return p.call(null,z);
} else
{return and__3822__auto____8618;
}
} else
{return and__3822__auto____8617;
}
})());
});
var ep1__4 = (function() { 
var G__8687__delegate = function (x,y,z,args){
return cljs.core.boolean$.call(null,(function (){var and__3822__auto____8619 = ep1.call(null,x,y,z);
if(cljs.core.truth_(and__3822__auto____8619))
{return cljs.core.every_QMARK_.call(null,p,args);
} else
{return and__3822__auto____8619;
}
})());
};
var G__8687 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__8687__delegate.call(this, x, y, z, args);
};
G__8687.cljs$lang$maxFixedArity = 3;
G__8687.cljs$lang$applyTo = (function (arglist__8688){
var x = cljs.core.first(arglist__8688);
var y = cljs.core.first(cljs.core.next(arglist__8688));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8688)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8688)));
return G__8687__delegate(x, y, z, args);
});
G__8687.cljs$lang$arity$variadic = G__8687__delegate;
return G__8687;
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
return cljs.core.boolean$.call(null,(function (){var and__3822__auto____8631 = p1.call(null,x);
if(cljs.core.truth_(and__3822__auto____8631))
{return p2.call(null,x);
} else
{return and__3822__auto____8631;
}
})());
});
var ep2__2 = (function (x,y){
return cljs.core.boolean$.call(null,(function (){var and__3822__auto____8632 = p1.call(null,x);
if(cljs.core.truth_(and__3822__auto____8632))
{var and__3822__auto____8633 = p1.call(null,y);
if(cljs.core.truth_(and__3822__auto____8633))
{var and__3822__auto____8634 = p2.call(null,x);
if(cljs.core.truth_(and__3822__auto____8634))
{return p2.call(null,y);
} else
{return and__3822__auto____8634;
}
} else
{return and__3822__auto____8633;
}
} else
{return and__3822__auto____8632;
}
})());
});
var ep2__3 = (function (x,y,z){
return cljs.core.boolean$.call(null,(function (){var and__3822__auto____8635 = p1.call(null,x);
if(cljs.core.truth_(and__3822__auto____8635))
{var and__3822__auto____8636 = p1.call(null,y);
if(cljs.core.truth_(and__3822__auto____8636))
{var and__3822__auto____8637 = p1.call(null,z);
if(cljs.core.truth_(and__3822__auto____8637))
{var and__3822__auto____8638 = p2.call(null,x);
if(cljs.core.truth_(and__3822__auto____8638))
{var and__3822__auto____8639 = p2.call(null,y);
if(cljs.core.truth_(and__3822__auto____8639))
{return p2.call(null,z);
} else
{return and__3822__auto____8639;
}
} else
{return and__3822__auto____8638;
}
} else
{return and__3822__auto____8637;
}
} else
{return and__3822__auto____8636;
}
} else
{return and__3822__auto____8635;
}
})());
});
var ep2__4 = (function() { 
var G__8689__delegate = function (x,y,z,args){
return cljs.core.boolean$.call(null,(function (){var and__3822__auto____8640 = ep2.call(null,x,y,z);
if(cljs.core.truth_(and__3822__auto____8640))
{return cljs.core.every_QMARK_.call(null,(function (p1__8486_SHARP_){
var and__3822__auto____8641 = p1.call(null,p1__8486_SHARP_);
if(cljs.core.truth_(and__3822__auto____8641))
{return p2.call(null,p1__8486_SHARP_);
} else
{return and__3822__auto____8641;
}
}),args);
} else
{return and__3822__auto____8640;
}
})());
};
var G__8689 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__8689__delegate.call(this, x, y, z, args);
};
G__8689.cljs$lang$maxFixedArity = 3;
G__8689.cljs$lang$applyTo = (function (arglist__8690){
var x = cljs.core.first(arglist__8690);
var y = cljs.core.first(cljs.core.next(arglist__8690));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8690)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8690)));
return G__8689__delegate(x, y, z, args);
});
G__8689.cljs$lang$arity$variadic = G__8689__delegate;
return G__8689;
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
return cljs.core.boolean$.call(null,(function (){var and__3822__auto____8660 = p1.call(null,x);
if(cljs.core.truth_(and__3822__auto____8660))
{var and__3822__auto____8661 = p2.call(null,x);
if(cljs.core.truth_(and__3822__auto____8661))
{return p3.call(null,x);
} else
{return and__3822__auto____8661;
}
} else
{return and__3822__auto____8660;
}
})());
});
var ep3__2 = (function (x,y){
return cljs.core.boolean$.call(null,(function (){var and__3822__auto____8662 = p1.call(null,x);
if(cljs.core.truth_(and__3822__auto____8662))
{var and__3822__auto____8663 = p2.call(null,x);
if(cljs.core.truth_(and__3822__auto____8663))
{var and__3822__auto____8664 = p3.call(null,x);
if(cljs.core.truth_(and__3822__auto____8664))
{var and__3822__auto____8665 = p1.call(null,y);
if(cljs.core.truth_(and__3822__auto____8665))
{var and__3822__auto____8666 = p2.call(null,y);
if(cljs.core.truth_(and__3822__auto____8666))
{return p3.call(null,y);
} else
{return and__3822__auto____8666;
}
} else
{return and__3822__auto____8665;
}
} else
{return and__3822__auto____8664;
}
} else
{return and__3822__auto____8663;
}
} else
{return and__3822__auto____8662;
}
})());
});
var ep3__3 = (function (x,y,z){
return cljs.core.boolean$.call(null,(function (){var and__3822__auto____8667 = p1.call(null,x);
if(cljs.core.truth_(and__3822__auto____8667))
{var and__3822__auto____8668 = p2.call(null,x);
if(cljs.core.truth_(and__3822__auto____8668))
{var and__3822__auto____8669 = p3.call(null,x);
if(cljs.core.truth_(and__3822__auto____8669))
{var and__3822__auto____8670 = p1.call(null,y);
if(cljs.core.truth_(and__3822__auto____8670))
{var and__3822__auto____8671 = p2.call(null,y);
if(cljs.core.truth_(and__3822__auto____8671))
{var and__3822__auto____8672 = p3.call(null,y);
if(cljs.core.truth_(and__3822__auto____8672))
{var and__3822__auto____8673 = p1.call(null,z);
if(cljs.core.truth_(and__3822__auto____8673))
{var and__3822__auto____8674 = p2.call(null,z);
if(cljs.core.truth_(and__3822__auto____8674))
{return p3.call(null,z);
} else
{return and__3822__auto____8674;
}
} else
{return and__3822__auto____8673;
}
} else
{return and__3822__auto____8672;
}
} else
{return and__3822__auto____8671;
}
} else
{return and__3822__auto____8670;
}
} else
{return and__3822__auto____8669;
}
} else
{return and__3822__auto____8668;
}
} else
{return and__3822__auto____8667;
}
})());
});
var ep3__4 = (function() { 
var G__8691__delegate = function (x,y,z,args){
return cljs.core.boolean$.call(null,(function (){var and__3822__auto____8675 = ep3.call(null,x,y,z);
if(cljs.core.truth_(and__3822__auto____8675))
{return cljs.core.every_QMARK_.call(null,(function (p1__8487_SHARP_){
var and__3822__auto____8676 = p1.call(null,p1__8487_SHARP_);
if(cljs.core.truth_(and__3822__auto____8676))
{var and__3822__auto____8677 = p2.call(null,p1__8487_SHARP_);
if(cljs.core.truth_(and__3822__auto____8677))
{return p3.call(null,p1__8487_SHARP_);
} else
{return and__3822__auto____8677;
}
} else
{return and__3822__auto____8676;
}
}),args);
} else
{return and__3822__auto____8675;
}
})());
};
var G__8691 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__8691__delegate.call(this, x, y, z, args);
};
G__8691.cljs$lang$maxFixedArity = 3;
G__8691.cljs$lang$applyTo = (function (arglist__8692){
var x = cljs.core.first(arglist__8692);
var y = cljs.core.first(cljs.core.next(arglist__8692));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8692)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8692)));
return G__8691__delegate(x, y, z, args);
});
G__8691.cljs$lang$arity$variadic = G__8691__delegate;
return G__8691;
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
var G__8693__delegate = function (p1,p2,p3,ps){
var ps__8678 = cljs.core.list_STAR_.call(null,p1,p2,p3,ps);
return (function() {
var epn = null;
var epn__0 = (function (){
return true;
});
var epn__1 = (function (x){
return cljs.core.every_QMARK_.call(null,(function (p1__8488_SHARP_){
return p1__8488_SHARP_.call(null,x);
}),ps__8678);
});
var epn__2 = (function (x,y){
return cljs.core.every_QMARK_.call(null,(function (p1__8489_SHARP_){
var and__3822__auto____8683 = p1__8489_SHARP_.call(null,x);
if(cljs.core.truth_(and__3822__auto____8683))
{return p1__8489_SHARP_.call(null,y);
} else
{return and__3822__auto____8683;
}
}),ps__8678);
});
var epn__3 = (function (x,y,z){
return cljs.core.every_QMARK_.call(null,(function (p1__8490_SHARP_){
var and__3822__auto____8684 = p1__8490_SHARP_.call(null,x);
if(cljs.core.truth_(and__3822__auto____8684))
{var and__3822__auto____8685 = p1__8490_SHARP_.call(null,y);
if(cljs.core.truth_(and__3822__auto____8685))
{return p1__8490_SHARP_.call(null,z);
} else
{return and__3822__auto____8685;
}
} else
{return and__3822__auto____8684;
}
}),ps__8678);
});
var epn__4 = (function() { 
var G__8694__delegate = function (x,y,z,args){
return cljs.core.boolean$.call(null,(function (){var and__3822__auto____8686 = epn.call(null,x,y,z);
if(cljs.core.truth_(and__3822__auto____8686))
{return cljs.core.every_QMARK_.call(null,(function (p1__8491_SHARP_){
return cljs.core.every_QMARK_.call(null,p1__8491_SHARP_,args);
}),ps__8678);
} else
{return and__3822__auto____8686;
}
})());
};
var G__8694 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__8694__delegate.call(this, x, y, z, args);
};
G__8694.cljs$lang$maxFixedArity = 3;
G__8694.cljs$lang$applyTo = (function (arglist__8695){
var x = cljs.core.first(arglist__8695);
var y = cljs.core.first(cljs.core.next(arglist__8695));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8695)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8695)));
return G__8694__delegate(x, y, z, args);
});
G__8694.cljs$lang$arity$variadic = G__8694__delegate;
return G__8694;
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
var G__8693 = function (p1,p2,p3,var_args){
var ps = null;
if (goog.isDef(var_args)) {
  ps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__8693__delegate.call(this, p1, p2, p3, ps);
};
G__8693.cljs$lang$maxFixedArity = 3;
G__8693.cljs$lang$applyTo = (function (arglist__8696){
var p1 = cljs.core.first(arglist__8696);
var p2 = cljs.core.first(cljs.core.next(arglist__8696));
var p3 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8696)));
var ps = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8696)));
return G__8693__delegate(p1, p2, p3, ps);
});
G__8693.cljs$lang$arity$variadic = G__8693__delegate;
return G__8693;
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
var or__3824__auto____8777 = p.call(null,x);
if(cljs.core.truth_(or__3824__auto____8777))
{return or__3824__auto____8777;
} else
{return p.call(null,y);
}
});
var sp1__3 = (function (x,y,z){
var or__3824__auto____8778 = p.call(null,x);
if(cljs.core.truth_(or__3824__auto____8778))
{return or__3824__auto____8778;
} else
{var or__3824__auto____8779 = p.call(null,y);
if(cljs.core.truth_(or__3824__auto____8779))
{return or__3824__auto____8779;
} else
{return p.call(null,z);
}
}
});
var sp1__4 = (function() { 
var G__8848__delegate = function (x,y,z,args){
var or__3824__auto____8780 = sp1.call(null,x,y,z);
if(cljs.core.truth_(or__3824__auto____8780))
{return or__3824__auto____8780;
} else
{return cljs.core.some.call(null,p,args);
}
};
var G__8848 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__8848__delegate.call(this, x, y, z, args);
};
G__8848.cljs$lang$maxFixedArity = 3;
G__8848.cljs$lang$applyTo = (function (arglist__8849){
var x = cljs.core.first(arglist__8849);
var y = cljs.core.first(cljs.core.next(arglist__8849));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8849)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8849)));
return G__8848__delegate(x, y, z, args);
});
G__8848.cljs$lang$arity$variadic = G__8848__delegate;
return G__8848;
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
var or__3824__auto____8792 = p1.call(null,x);
if(cljs.core.truth_(or__3824__auto____8792))
{return or__3824__auto____8792;
} else
{return p2.call(null,x);
}
});
var sp2__2 = (function (x,y){
var or__3824__auto____8793 = p1.call(null,x);
if(cljs.core.truth_(or__3824__auto____8793))
{return or__3824__auto____8793;
} else
{var or__3824__auto____8794 = p1.call(null,y);
if(cljs.core.truth_(or__3824__auto____8794))
{return or__3824__auto____8794;
} else
{var or__3824__auto____8795 = p2.call(null,x);
if(cljs.core.truth_(or__3824__auto____8795))
{return or__3824__auto____8795;
} else
{return p2.call(null,y);
}
}
}
});
var sp2__3 = (function (x,y,z){
var or__3824__auto____8796 = p1.call(null,x);
if(cljs.core.truth_(or__3824__auto____8796))
{return or__3824__auto____8796;
} else
{var or__3824__auto____8797 = p1.call(null,y);
if(cljs.core.truth_(or__3824__auto____8797))
{return or__3824__auto____8797;
} else
{var or__3824__auto____8798 = p1.call(null,z);
if(cljs.core.truth_(or__3824__auto____8798))
{return or__3824__auto____8798;
} else
{var or__3824__auto____8799 = p2.call(null,x);
if(cljs.core.truth_(or__3824__auto____8799))
{return or__3824__auto____8799;
} else
{var or__3824__auto____8800 = p2.call(null,y);
if(cljs.core.truth_(or__3824__auto____8800))
{return or__3824__auto____8800;
} else
{return p2.call(null,z);
}
}
}
}
}
});
var sp2__4 = (function() { 
var G__8850__delegate = function (x,y,z,args){
var or__3824__auto____8801 = sp2.call(null,x,y,z);
if(cljs.core.truth_(or__3824__auto____8801))
{return or__3824__auto____8801;
} else
{return cljs.core.some.call(null,(function (p1__8531_SHARP_){
var or__3824__auto____8802 = p1.call(null,p1__8531_SHARP_);
if(cljs.core.truth_(or__3824__auto____8802))
{return or__3824__auto____8802;
} else
{return p2.call(null,p1__8531_SHARP_);
}
}),args);
}
};
var G__8850 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__8850__delegate.call(this, x, y, z, args);
};
G__8850.cljs$lang$maxFixedArity = 3;
G__8850.cljs$lang$applyTo = (function (arglist__8851){
var x = cljs.core.first(arglist__8851);
var y = cljs.core.first(cljs.core.next(arglist__8851));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8851)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8851)));
return G__8850__delegate(x, y, z, args);
});
G__8850.cljs$lang$arity$variadic = G__8850__delegate;
return G__8850;
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
var or__3824__auto____8821 = p1.call(null,x);
if(cljs.core.truth_(or__3824__auto____8821))
{return or__3824__auto____8821;
} else
{var or__3824__auto____8822 = p2.call(null,x);
if(cljs.core.truth_(or__3824__auto____8822))
{return or__3824__auto____8822;
} else
{return p3.call(null,x);
}
}
});
var sp3__2 = (function (x,y){
var or__3824__auto____8823 = p1.call(null,x);
if(cljs.core.truth_(or__3824__auto____8823))
{return or__3824__auto____8823;
} else
{var or__3824__auto____8824 = p2.call(null,x);
if(cljs.core.truth_(or__3824__auto____8824))
{return or__3824__auto____8824;
} else
{var or__3824__auto____8825 = p3.call(null,x);
if(cljs.core.truth_(or__3824__auto____8825))
{return or__3824__auto____8825;
} else
{var or__3824__auto____8826 = p1.call(null,y);
if(cljs.core.truth_(or__3824__auto____8826))
{return or__3824__auto____8826;
} else
{var or__3824__auto____8827 = p2.call(null,y);
if(cljs.core.truth_(or__3824__auto____8827))
{return or__3824__auto____8827;
} else
{return p3.call(null,y);
}
}
}
}
}
});
var sp3__3 = (function (x,y,z){
var or__3824__auto____8828 = p1.call(null,x);
if(cljs.core.truth_(or__3824__auto____8828))
{return or__3824__auto____8828;
} else
{var or__3824__auto____8829 = p2.call(null,x);
if(cljs.core.truth_(or__3824__auto____8829))
{return or__3824__auto____8829;
} else
{var or__3824__auto____8830 = p3.call(null,x);
if(cljs.core.truth_(or__3824__auto____8830))
{return or__3824__auto____8830;
} else
{var or__3824__auto____8831 = p1.call(null,y);
if(cljs.core.truth_(or__3824__auto____8831))
{return or__3824__auto____8831;
} else
{var or__3824__auto____8832 = p2.call(null,y);
if(cljs.core.truth_(or__3824__auto____8832))
{return or__3824__auto____8832;
} else
{var or__3824__auto____8833 = p3.call(null,y);
if(cljs.core.truth_(or__3824__auto____8833))
{return or__3824__auto____8833;
} else
{var or__3824__auto____8834 = p1.call(null,z);
if(cljs.core.truth_(or__3824__auto____8834))
{return or__3824__auto____8834;
} else
{var or__3824__auto____8835 = p2.call(null,z);
if(cljs.core.truth_(or__3824__auto____8835))
{return or__3824__auto____8835;
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
var G__8852__delegate = function (x,y,z,args){
var or__3824__auto____8836 = sp3.call(null,x,y,z);
if(cljs.core.truth_(or__3824__auto____8836))
{return or__3824__auto____8836;
} else
{return cljs.core.some.call(null,(function (p1__8532_SHARP_){
var or__3824__auto____8837 = p1.call(null,p1__8532_SHARP_);
if(cljs.core.truth_(or__3824__auto____8837))
{return or__3824__auto____8837;
} else
{var or__3824__auto____8838 = p2.call(null,p1__8532_SHARP_);
if(cljs.core.truth_(or__3824__auto____8838))
{return or__3824__auto____8838;
} else
{return p3.call(null,p1__8532_SHARP_);
}
}
}),args);
}
};
var G__8852 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__8852__delegate.call(this, x, y, z, args);
};
G__8852.cljs$lang$maxFixedArity = 3;
G__8852.cljs$lang$applyTo = (function (arglist__8853){
var x = cljs.core.first(arglist__8853);
var y = cljs.core.first(cljs.core.next(arglist__8853));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8853)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8853)));
return G__8852__delegate(x, y, z, args);
});
G__8852.cljs$lang$arity$variadic = G__8852__delegate;
return G__8852;
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
var G__8854__delegate = function (p1,p2,p3,ps){
var ps__8839 = cljs.core.list_STAR_.call(null,p1,p2,p3,ps);
return (function() {
var spn = null;
var spn__0 = (function (){
return null;
});
var spn__1 = (function (x){
return cljs.core.some.call(null,(function (p1__8533_SHARP_){
return p1__8533_SHARP_.call(null,x);
}),ps__8839);
});
var spn__2 = (function (x,y){
return cljs.core.some.call(null,(function (p1__8534_SHARP_){
var or__3824__auto____8844 = p1__8534_SHARP_.call(null,x);
if(cljs.core.truth_(or__3824__auto____8844))
{return or__3824__auto____8844;
} else
{return p1__8534_SHARP_.call(null,y);
}
}),ps__8839);
});
var spn__3 = (function (x,y,z){
return cljs.core.some.call(null,(function (p1__8535_SHARP_){
var or__3824__auto____8845 = p1__8535_SHARP_.call(null,x);
if(cljs.core.truth_(or__3824__auto____8845))
{return or__3824__auto____8845;
} else
{var or__3824__auto____8846 = p1__8535_SHARP_.call(null,y);
if(cljs.core.truth_(or__3824__auto____8846))
{return or__3824__auto____8846;
} else
{return p1__8535_SHARP_.call(null,z);
}
}
}),ps__8839);
});
var spn__4 = (function() { 
var G__8855__delegate = function (x,y,z,args){
var or__3824__auto____8847 = spn.call(null,x,y,z);
if(cljs.core.truth_(or__3824__auto____8847))
{return or__3824__auto____8847;
} else
{return cljs.core.some.call(null,(function (p1__8536_SHARP_){
return cljs.core.some.call(null,p1__8536_SHARP_,args);
}),ps__8839);
}
};
var G__8855 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__8855__delegate.call(this, x, y, z, args);
};
G__8855.cljs$lang$maxFixedArity = 3;
G__8855.cljs$lang$applyTo = (function (arglist__8856){
var x = cljs.core.first(arglist__8856);
var y = cljs.core.first(cljs.core.next(arglist__8856));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8856)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8856)));
return G__8855__delegate(x, y, z, args);
});
G__8855.cljs$lang$arity$variadic = G__8855__delegate;
return G__8855;
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
var G__8854 = function (p1,p2,p3,var_args){
var ps = null;
if (goog.isDef(var_args)) {
  ps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__8854__delegate.call(this, p1, p2, p3, ps);
};
G__8854.cljs$lang$maxFixedArity = 3;
G__8854.cljs$lang$applyTo = (function (arglist__8857){
var p1 = cljs.core.first(arglist__8857);
var p2 = cljs.core.first(cljs.core.next(arglist__8857));
var p3 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8857)));
var ps = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8857)));
return G__8854__delegate(p1, p2, p3, ps);
});
G__8854.cljs$lang$arity$variadic = G__8854__delegate;
return G__8854;
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
var temp__3974__auto____8876 = cljs.core.seq.call(null,coll);
if(temp__3974__auto____8876)
{var s__8877 = temp__3974__auto____8876;
if(cljs.core.chunked_seq_QMARK_.call(null,s__8877))
{var c__8878 = cljs.core.chunk_first.call(null,s__8877);
var size__8879 = cljs.core.count.call(null,c__8878);
var b__8880 = cljs.core.chunk_buffer.call(null,size__8879);
var n__3220__auto____8881 = size__8879;
var i__8882 = 0;
while(true){
if((i__8882 < n__3220__auto____8881))
{cljs.core.chunk_append.call(null,b__8880,f.call(null,cljs.core._nth.call(null,c__8878,i__8882)));
{
var G__8894 = (i__8882 + 1);
i__8882 = G__8894;
continue;
}
} else
{}
break;
}
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8880),map.call(null,f,cljs.core.chunk_rest.call(null,s__8877)));
} else
{return cljs.core.cons.call(null,f.call(null,cljs.core.first.call(null,s__8877)),map.call(null,f,cljs.core.rest.call(null,s__8877)));
}
} else
{return null;
}
}),null));
});
var map__3 = (function (f,c1,c2){
return (new cljs.core.LazySeq(null,false,(function (){
var s1__8883 = cljs.core.seq.call(null,c1);
var s2__8884 = cljs.core.seq.call(null,c2);
if((function (){var and__3822__auto____8885 = s1__8883;
if(and__3822__auto____8885)
{return s2__8884;
} else
{return and__3822__auto____8885;
}
})())
{return cljs.core.cons.call(null,f.call(null,cljs.core.first.call(null,s1__8883),cljs.core.first.call(null,s2__8884)),map.call(null,f,cljs.core.rest.call(null,s1__8883),cljs.core.rest.call(null,s2__8884)));
} else
{return null;
}
}),null));
});
var map__4 = (function (f,c1,c2,c3){
return (new cljs.core.LazySeq(null,false,(function (){
var s1__8886 = cljs.core.seq.call(null,c1);
var s2__8887 = cljs.core.seq.call(null,c2);
var s3__8888 = cljs.core.seq.call(null,c3);
if((function (){var and__3822__auto____8889 = s1__8886;
if(and__3822__auto____8889)
{var and__3822__auto____8890 = s2__8887;
if(and__3822__auto____8890)
{return s3__8888;
} else
{return and__3822__auto____8890;
}
} else
{return and__3822__auto____8889;
}
})())
{return cljs.core.cons.call(null,f.call(null,cljs.core.first.call(null,s1__8886),cljs.core.first.call(null,s2__8887),cljs.core.first.call(null,s3__8888)),map.call(null,f,cljs.core.rest.call(null,s1__8886),cljs.core.rest.call(null,s2__8887),cljs.core.rest.call(null,s3__8888)));
} else
{return null;
}
}),null));
});
var map__5 = (function() { 
var G__8895__delegate = function (f,c1,c2,c3,colls){
var step__8893 = (function step(cs){
return (new cljs.core.LazySeq(null,false,(function (){
var ss__8892 = map.call(null,cljs.core.seq,cs);
if(cljs.core.every_QMARK_.call(null,cljs.core.identity,ss__8892))
{return cljs.core.cons.call(null,map.call(null,cljs.core.first,ss__8892),step.call(null,map.call(null,cljs.core.rest,ss__8892)));
} else
{return null;
}
}),null));
});
return map.call(null,(function (p1__8697_SHARP_){
return cljs.core.apply.call(null,f,p1__8697_SHARP_);
}),step__8893.call(null,cljs.core.conj.call(null,colls,c3,c2,c1)));
};
var G__8895 = function (f,c1,c2,c3,var_args){
var colls = null;
if (goog.isDef(var_args)) {
  colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4),0);
} 
return G__8895__delegate.call(this, f, c1, c2, c3, colls);
};
G__8895.cljs$lang$maxFixedArity = 4;
G__8895.cljs$lang$applyTo = (function (arglist__8896){
var f = cljs.core.first(arglist__8896);
var c1 = cljs.core.first(cljs.core.next(arglist__8896));
var c2 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8896)));
var c3 = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__8896))));
var colls = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__8896))));
return G__8895__delegate(f, c1, c2, c3, colls);
});
G__8895.cljs$lang$arity$variadic = G__8895__delegate;
return G__8895;
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
{var temp__3974__auto____8899 = cljs.core.seq.call(null,coll);
if(temp__3974__auto____8899)
{var s__8900 = temp__3974__auto____8899;
return cljs.core.cons.call(null,cljs.core.first.call(null,s__8900),take.call(null,(n - 1),cljs.core.rest.call(null,s__8900)));
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
var step__8906 = (function (n,coll){
while(true){
var s__8904 = cljs.core.seq.call(null,coll);
if(cljs.core.truth_((function (){var and__3822__auto____8905 = (n > 0);
if(and__3822__auto____8905)
{return s__8904;
} else
{return and__3822__auto____8905;
}
})()))
{{
var G__8907 = (n - 1);
var G__8908 = cljs.core.rest.call(null,s__8904);
n = G__8907;
coll = G__8908;
continue;
}
} else
{return s__8904;
}
break;
}
});
return (new cljs.core.LazySeq(null,false,(function (){
return step__8906.call(null,n,coll);
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
var s__8911 = cljs.core.seq.call(null,coll);
var lead__8912 = cljs.core.seq.call(null,cljs.core.drop.call(null,n,coll));
while(true){
if(lead__8912)
{{
var G__8913 = cljs.core.next.call(null,s__8911);
var G__8914 = cljs.core.next.call(null,lead__8912);
s__8911 = G__8913;
lead__8912 = G__8914;
continue;
}
} else
{return s__8911;
}
break;
}
});
/**
* Returns a lazy sequence of the items in coll starting from the first
* item for which (pred item) returns nil.
*/
cljs.core.drop_while = (function drop_while(pred,coll){
var step__8920 = (function (pred,coll){
while(true){
var s__8918 = cljs.core.seq.call(null,coll);
if(cljs.core.truth_((function (){var and__3822__auto____8919 = s__8918;
if(and__3822__auto____8919)
{return pred.call(null,cljs.core.first.call(null,s__8918));
} else
{return and__3822__auto____8919;
}
})()))
{{
var G__8921 = pred;
var G__8922 = cljs.core.rest.call(null,s__8918);
pred = G__8921;
coll = G__8922;
continue;
}
} else
{return s__8918;
}
break;
}
});
return (new cljs.core.LazySeq(null,false,(function (){
return step__8920.call(null,pred,coll);
}),null));
});
/**
* Returns a lazy (infinite!) sequence of repetitions of the items in coll.
*/
cljs.core.cycle = (function cycle(coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3974__auto____8925 = cljs.core.seq.call(null,coll);
if(temp__3974__auto____8925)
{var s__8926 = temp__3974__auto____8925;
return cljs.core.concat.call(null,s__8926,cycle.call(null,s__8926));
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
var s1__8931 = cljs.core.seq.call(null,c1);
var s2__8932 = cljs.core.seq.call(null,c2);
if((function (){var and__3822__auto____8933 = s1__8931;
if(and__3822__auto____8933)
{return s2__8932;
} else
{return and__3822__auto____8933;
}
})())
{return cljs.core.cons.call(null,cljs.core.first.call(null,s1__8931),cljs.core.cons.call(null,cljs.core.first.call(null,s2__8932),interleave.call(null,cljs.core.rest.call(null,s1__8931),cljs.core.rest.call(null,s2__8932))));
} else
{return null;
}
}),null));
});
var interleave__3 = (function() { 
var G__8935__delegate = function (c1,c2,colls){
return (new cljs.core.LazySeq(null,false,(function (){
var ss__8934 = cljs.core.map.call(null,cljs.core.seq,cljs.core.conj.call(null,colls,c2,c1));
if(cljs.core.every_QMARK_.call(null,cljs.core.identity,ss__8934))
{return cljs.core.concat.call(null,cljs.core.map.call(null,cljs.core.first,ss__8934),cljs.core.apply.call(null,interleave,cljs.core.map.call(null,cljs.core.rest,ss__8934)));
} else
{return null;
}
}),null));
};
var G__8935 = function (c1,c2,var_args){
var colls = null;
if (goog.isDef(var_args)) {
  colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__8935__delegate.call(this, c1, c2, colls);
};
G__8935.cljs$lang$maxFixedArity = 2;
G__8935.cljs$lang$applyTo = (function (arglist__8936){
var c1 = cljs.core.first(arglist__8936);
var c2 = cljs.core.first(cljs.core.next(arglist__8936));
var colls = cljs.core.rest(cljs.core.next(arglist__8936));
return G__8935__delegate(c1, c2, colls);
});
G__8935.cljs$lang$arity$variadic = G__8935__delegate;
return G__8935;
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
var cat__8946 = (function cat(coll,colls){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3971__auto____8944 = cljs.core.seq.call(null,coll);
if(temp__3971__auto____8944)
{var coll__8945 = temp__3971__auto____8944;
return cljs.core.cons.call(null,cljs.core.first.call(null,coll__8945),cat.call(null,cljs.core.rest.call(null,coll__8945),colls));
} else
{if(cljs.core.seq.call(null,colls))
{return cat.call(null,cljs.core.first.call(null,colls),cljs.core.rest.call(null,colls));
} else
{return null;
}
}
}),null));
});
return cat__8946.call(null,null,colls);
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
var G__8947__delegate = function (f,coll,colls){
return cljs.core.flatten1.call(null,cljs.core.apply.call(null,cljs.core.map,f,coll,colls));
};
var G__8947 = function (f,coll,var_args){
var colls = null;
if (goog.isDef(var_args)) {
  colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__8947__delegate.call(this, f, coll, colls);
};
G__8947.cljs$lang$maxFixedArity = 2;
G__8947.cljs$lang$applyTo = (function (arglist__8948){
var f = cljs.core.first(arglist__8948);
var coll = cljs.core.first(cljs.core.next(arglist__8948));
var colls = cljs.core.rest(cljs.core.next(arglist__8948));
return G__8947__delegate(f, coll, colls);
});
G__8947.cljs$lang$arity$variadic = G__8947__delegate;
return G__8947;
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
var temp__3974__auto____8958 = cljs.core.seq.call(null,coll);
if(temp__3974__auto____8958)
{var s__8959 = temp__3974__auto____8958;
if(cljs.core.chunked_seq_QMARK_.call(null,s__8959))
{var c__8960 = cljs.core.chunk_first.call(null,s__8959);
var size__8961 = cljs.core.count.call(null,c__8960);
var b__8962 = cljs.core.chunk_buffer.call(null,size__8961);
var n__3220__auto____8963 = size__8961;
var i__8964 = 0;
while(true){
if((i__8964 < n__3220__auto____8963))
{if(cljs.core.truth_(pred.call(null,cljs.core._nth.call(null,c__8960,i__8964))))
{cljs.core.chunk_append.call(null,b__8962,cljs.core._nth.call(null,c__8960,i__8964));
} else
{}
{
var G__8967 = (i__8964 + 1);
i__8964 = G__8967;
continue;
}
} else
{}
break;
}
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8962),filter.call(null,pred,cljs.core.chunk_rest.call(null,s__8959)));
} else
{var f__8965 = cljs.core.first.call(null,s__8959);
var r__8966 = cljs.core.rest.call(null,s__8959);
if(cljs.core.truth_(pred.call(null,f__8965)))
{return cljs.core.cons.call(null,f__8965,filter.call(null,pred,r__8966));
} else
{return filter.call(null,pred,r__8966);
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
var walk__8970 = (function walk(node){
return (new cljs.core.LazySeq(null,false,(function (){
return cljs.core.cons.call(null,node,(cljs.core.truth_(branch_QMARK_.call(null,node))?cljs.core.mapcat.call(null,walk,children.call(null,node)):null));
}),null));
});
return walk__8970.call(null,root);
});
/**
* Takes any nested combination of sequential things (lists, vectors,
* etc.) and returns their contents as a single, flat sequence.
* (flatten nil) returns nil.
*/
cljs.core.flatten = (function flatten(x){
return cljs.core.filter.call(null,(function (p1__8968_SHARP_){
return !(cljs.core.sequential_QMARK_.call(null,p1__8968_SHARP_));
}),cljs.core.rest.call(null,cljs.core.tree_seq.call(null,cljs.core.sequential_QMARK_,cljs.core.seq,x)));
});
/**
* Returns a new coll consisting of to-coll with all of the items of
* from-coll conjoined.
*/
cljs.core.into = (function into(to,from){
if((function (){var G__8974__8975 = to;
if(G__8974__8975)
{if((function (){var or__3824__auto____8976 = (G__8974__8975.cljs$lang$protocol_mask$partition1$ & 1);
if(or__3824__auto____8976)
{return or__3824__auto____8976;
} else
{return G__8974__8975.cljs$core$IEditableCollection$;
}
})())
{return true;
} else
{if((!G__8974__8975.cljs$lang$protocol_mask$partition1$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IEditableCollection,G__8974__8975);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IEditableCollection,G__8974__8975);
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
var G__8977__delegate = function (f,c1,c2,c3,colls){
return cljs.core.into.call(null,cljs.core.PersistentVector.EMPTY,cljs.core.apply.call(null,cljs.core.map,f,c1,c2,c3,colls));
};
var G__8977 = function (f,c1,c2,c3,var_args){
var colls = null;
if (goog.isDef(var_args)) {
  colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4),0);
} 
return G__8977__delegate.call(this, f, c1, c2, c3, colls);
};
G__8977.cljs$lang$maxFixedArity = 4;
G__8977.cljs$lang$applyTo = (function (arglist__8978){
var f = cljs.core.first(arglist__8978);
var c1 = cljs.core.first(cljs.core.next(arglist__8978));
var c2 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8978)));
var c3 = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__8978))));
var colls = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__8978))));
return G__8977__delegate(f, c1, c2, c3, colls);
});
G__8977.cljs$lang$arity$variadic = G__8977__delegate;
return G__8977;
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
var temp__3974__auto____8985 = cljs.core.seq.call(null,coll);
if(temp__3974__auto____8985)
{var s__8986 = temp__3974__auto____8985;
var p__8987 = cljs.core.take.call(null,n,s__8986);
if((n === cljs.core.count.call(null,p__8987)))
{return cljs.core.cons.call(null,p__8987,partition.call(null,n,step,cljs.core.drop.call(null,step,s__8986)));
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
var temp__3974__auto____8988 = cljs.core.seq.call(null,coll);
if(temp__3974__auto____8988)
{var s__8989 = temp__3974__auto____8988;
var p__8990 = cljs.core.take.call(null,n,s__8989);
if((n === cljs.core.count.call(null,p__8990)))
{return cljs.core.cons.call(null,p__8990,partition.call(null,n,step,pad,cljs.core.drop.call(null,step,s__8989)));
} else
{return cljs.core.list.call(null,cljs.core.take.call(null,n,cljs.core.concat.call(null,p__8990,pad)));
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
var sentinel__8995 = cljs.core.lookup_sentinel;
var m__8996 = m;
var ks__8997 = cljs.core.seq.call(null,ks);
while(true){
if(ks__8997)
{var m__8998 = cljs.core._lookup.call(null,m__8996,cljs.core.first.call(null,ks__8997),sentinel__8995);
if((sentinel__8995 === m__8998))
{return not_found;
} else
{{
var G__8999 = sentinel__8995;
var G__9000 = m__8998;
var G__9001 = cljs.core.next.call(null,ks__8997);
sentinel__8995 = G__8999;
m__8996 = G__9000;
ks__8997 = G__9001;
continue;
}
}
} else
{return m__8996;
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
cljs.core.assoc_in = (function assoc_in(m,p__9002,v){
var vec__9007__9008 = p__9002;
var k__9009 = cljs.core.nth.call(null,vec__9007__9008,0,null);
var ks__9010 = cljs.core.nthnext.call(null,vec__9007__9008,1);
if(cljs.core.truth_(ks__9010))
{return cljs.core.assoc.call(null,m,k__9009,assoc_in.call(null,cljs.core._lookup.call(null,m,k__9009,null),ks__9010,v));
} else
{return cljs.core.assoc.call(null,m,k__9009,v);
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
var update_in__delegate = function (m,p__9011,f,args){
var vec__9016__9017 = p__9011;
var k__9018 = cljs.core.nth.call(null,vec__9016__9017,0,null);
var ks__9019 = cljs.core.nthnext.call(null,vec__9016__9017,1);
if(cljs.core.truth_(ks__9019))
{return cljs.core.assoc.call(null,m,k__9018,cljs.core.apply.call(null,update_in,cljs.core._lookup.call(null,m,k__9018,null),ks__9019,f,args));
} else
{return cljs.core.assoc.call(null,m,k__9018,cljs.core.apply.call(null,f,cljs.core._lookup.call(null,m,k__9018,null),args));
}
};
var update_in = function (m,p__9011,f,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return update_in__delegate.call(this, m, p__9011, f, args);
};
update_in.cljs$lang$maxFixedArity = 3;
update_in.cljs$lang$applyTo = (function (arglist__9020){
var m = cljs.core.first(arglist__9020);
var p__9011 = cljs.core.first(cljs.core.next(arglist__9020));
var f = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9020)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9020)));
return update_in__delegate(m, p__9011, f, args);
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
cljs.core.Vector.cljs$lang$ctorPrSeq = (function (this__3002__auto__){
return cljs.core.list.call(null,"cljs.core/Vector");
});
cljs.core.Vector.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__9023 = this;
var h__2885__auto____9024 = this__9023.__hash;
if(!((h__2885__auto____9024 == null)))
{return h__2885__auto____9024;
} else
{var h__2885__auto____9025 = cljs.core.hash_coll.call(null,coll);
this__9023.__hash = h__2885__auto____9025;
return h__2885__auto____9025;
}
});
cljs.core.Vector.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (coll,k){
var this__9026 = this;
return coll.cljs$core$IIndexed$_nth$arity$3(coll,k,null);
});
cljs.core.Vector.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (coll,k,not_found){
var this__9027 = this;
return coll.cljs$core$IIndexed$_nth$arity$3(coll,k,not_found);
});
cljs.core.Vector.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (coll,k,v){
var this__9028 = this;
var new_array__9029 = this__9028.array.slice();
(new_array__9029[k] = v);
return (new cljs.core.Vector(this__9028.meta,new_array__9029,null));
});
cljs.core.Vector.prototype.call = (function() {
var G__9060 = null;
var G__9060__2 = (function (this_sym9030,k){
var this__9032 = this;
var this_sym9030__9033 = this;
var coll__9034 = this_sym9030__9033;
return coll__9034.cljs$core$ILookup$_lookup$arity$2(coll__9034,k);
});
var G__9060__3 = (function (this_sym9031,k,not_found){
var this__9032 = this;
var this_sym9031__9035 = this;
var coll__9036 = this_sym9031__9035;
return coll__9036.cljs$core$ILookup$_lookup$arity$3(coll__9036,k,not_found);
});
G__9060 = function(this_sym9031,k,not_found){
switch(arguments.length){
case 2:
return G__9060__2.call(this,this_sym9031,k);
case 3:
return G__9060__3.call(this,this_sym9031,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__9060;
})()
;
cljs.core.Vector.prototype.apply = (function (this_sym9021,args9022){
var this__9037 = this;
return this_sym9021.call.apply(this_sym9021,[this_sym9021].concat(args9022.slice()));
});
cljs.core.Vector.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__9038 = this;
var new_array__9039 = this__9038.array.slice();
new_array__9039.push(o);
return (new cljs.core.Vector(this__9038.meta,new_array__9039,null));
});
cljs.core.Vector.prototype.toString = (function (){
var this__9040 = this;
var this__9041 = this;
return cljs.core.pr_str.call(null,this__9041);
});
cljs.core.Vector.prototype.cljs$core$IReduce$_reduce$arity$2 = (function (v,f){
var this__9042 = this;
return cljs.core.ci_reduce.call(null,this__9042.array,f);
});
cljs.core.Vector.prototype.cljs$core$IReduce$_reduce$arity$3 = (function (v,f,start){
var this__9043 = this;
return cljs.core.ci_reduce.call(null,this__9043.array,f,start);
});
cljs.core.Vector.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__9044 = this;
if((this__9044.array.length > 0))
{var vector_seq__9045 = (function vector_seq(i){
return (new cljs.core.LazySeq(null,false,(function (){
if((i < this__9044.array.length))
{return cljs.core.cons.call(null,(this__9044.array[i]),vector_seq.call(null,(i + 1)));
} else
{return null;
}
}),null));
});
return vector_seq__9045.call(null,0);
} else
{return null;
}
});
cljs.core.Vector.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__9046 = this;
return this__9046.array.length;
});
cljs.core.Vector.prototype.cljs$core$IStack$_peek$arity$1 = (function (coll){
var this__9047 = this;
var count__9048 = this__9047.array.length;
if((count__9048 > 0))
{return (this__9047.array[(count__9048 - 1)]);
} else
{return null;
}
});
cljs.core.Vector.prototype.cljs$core$IStack$_pop$arity$1 = (function (coll){
var this__9049 = this;
if((this__9049.array.length > 0))
{var new_array__9050 = this__9049.array.slice();
new_array__9050.pop();
return (new cljs.core.Vector(this__9049.meta,new_array__9050,null));
} else
{throw (new Error("Can't pop empty vector"));
}
});
cljs.core.Vector.prototype.cljs$core$IVector$_assoc_n$arity$3 = (function (coll,n,val){
var this__9051 = this;
return coll.cljs$core$IAssociative$_assoc$arity$3(coll,n,val);
});
cljs.core.Vector.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__9052 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.Vector.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__9053 = this;
return (new cljs.core.Vector(meta,this__9053.array,this__9053.__hash));
});
cljs.core.Vector.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__9054 = this;
return this__9054.meta;
});
cljs.core.Vector.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (coll,n){
var this__9055 = this;
if((function (){var and__3822__auto____9056 = (0 <= n);
if(and__3822__auto____9056)
{return (n < this__9055.array.length);
} else
{return and__3822__auto____9056;
}
})())
{return (this__9055.array[n]);
} else
{return null;
}
});
cljs.core.Vector.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (coll,n,not_found){
var this__9057 = this;
if((function (){var and__3822__auto____9058 = (0 <= n);
if(and__3822__auto____9058)
{return (n < this__9057.array.length);
} else
{return and__3822__auto____9058;
}
})())
{return (this__9057.array[n]);
} else
{return not_found;
}
});
cljs.core.Vector.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__9059 = this;
return cljs.core.with_meta.call(null,cljs.core.Vector.EMPTY,this__9059.meta);
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
cljs.core.VectorNode.cljs$lang$ctorPrSeq = (function (this__3003__auto__){
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
var cnt__9062 = pv.cnt;
if((cnt__9062 < 32))
{return 0;
} else
{return (((cnt__9062 - 1) >>> 5) << 5);
}
});
cljs.core.new_path = (function new_path(edit,level,node){
var ll__9068 = level;
var ret__9069 = node;
while(true){
if((ll__9068 === 0))
{return ret__9069;
} else
{var embed__9070 = ret__9069;
var r__9071 = cljs.core.pv_fresh_node.call(null,edit);
var ___9072 = cljs.core.pv_aset.call(null,r__9071,0,embed__9070);
{
var G__9073 = (ll__9068 - 5);
var G__9074 = r__9071;
ll__9068 = G__9073;
ret__9069 = G__9074;
continue;
}
}
break;
}
});
cljs.core.push_tail = (function push_tail(pv,level,parent,tailnode){
var ret__9080 = cljs.core.pv_clone_node.call(null,parent);
var subidx__9081 = (((pv.cnt - 1) >>> level) & 31);
if((5 === level))
{cljs.core.pv_aset.call(null,ret__9080,subidx__9081,tailnode);
return ret__9080;
} else
{var child__9082 = cljs.core.pv_aget.call(null,parent,subidx__9081);
if(!((child__9082 == null)))
{var node_to_insert__9083 = push_tail.call(null,pv,(level - 5),child__9082,tailnode);
cljs.core.pv_aset.call(null,ret__9080,subidx__9081,node_to_insert__9083);
return ret__9080;
} else
{var node_to_insert__9084 = cljs.core.new_path.call(null,null,(level - 5),tailnode);
cljs.core.pv_aset.call(null,ret__9080,subidx__9081,node_to_insert__9084);
return ret__9080;
}
}
});
cljs.core.array_for = (function array_for(pv,i){
if((function (){var and__3822__auto____9088 = (0 <= i);
if(and__3822__auto____9088)
{return (i < pv.cnt);
} else
{return and__3822__auto____9088;
}
})())
{if((i >= cljs.core.tail_off.call(null,pv)))
{return pv.tail;
} else
{var node__9089 = pv.root;
var level__9090 = pv.shift;
while(true){
if((level__9090 > 0))
{{
var G__9091 = cljs.core.pv_aget.call(null,node__9089,((i >>> level__9090) & 31));
var G__9092 = (level__9090 - 5);
node__9089 = G__9091;
level__9090 = G__9092;
continue;
}
} else
{return node__9089.arr;
}
break;
}
}
} else
{throw (new Error([cljs.core.str("No item "),cljs.core.str(i),cljs.core.str(" in vector of length "),cljs.core.str(pv.cnt)].join('')));
}
});
cljs.core.do_assoc = (function do_assoc(pv,level,node,i,val){
var ret__9095 = cljs.core.pv_clone_node.call(null,node);
if((level === 0))
{cljs.core.pv_aset.call(null,ret__9095,(i & 31),val);
return ret__9095;
} else
{var subidx__9096 = ((i >>> level) & 31);
cljs.core.pv_aset.call(null,ret__9095,subidx__9096,do_assoc.call(null,pv,(level - 5),cljs.core.pv_aget.call(null,node,subidx__9096),i,val));
return ret__9095;
}
});
cljs.core.pop_tail = (function pop_tail(pv,level,node){
var subidx__9102 = (((pv.cnt - 2) >>> level) & 31);
if((level > 5))
{var new_child__9103 = pop_tail.call(null,pv,(level - 5),cljs.core.pv_aget.call(null,node,subidx__9102));
if((function (){var and__3822__auto____9104 = (new_child__9103 == null);
if(and__3822__auto____9104)
{return (subidx__9102 === 0);
} else
{return and__3822__auto____9104;
}
})())
{return null;
} else
{var ret__9105 = cljs.core.pv_clone_node.call(null,node);
cljs.core.pv_aset.call(null,ret__9105,subidx__9102,new_child__9103);
return ret__9105;
}
} else
{if((subidx__9102 === 0))
{return null;
} else
{if("\uFDD0'else")
{var ret__9106 = cljs.core.pv_clone_node.call(null,node);
cljs.core.pv_aset.call(null,ret__9106,subidx__9102,null);
return ret__9106;
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
cljs.core.PersistentVector.cljs$lang$ctorPrSeq = (function (this__3002__auto__){
return cljs.core.list.call(null,"cljs.core/PersistentVector");
});
cljs.core.PersistentVector.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = (function (coll){
var this__9109 = this;
return (new cljs.core.TransientVector(this__9109.cnt,this__9109.shift,cljs.core.tv_editable_root.call(null,this__9109.root),cljs.core.tv_editable_tail.call(null,this__9109.tail)));
});
cljs.core.PersistentVector.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__9110 = this;
var h__2885__auto____9111 = this__9110.__hash;
if(!((h__2885__auto____9111 == null)))
{return h__2885__auto____9111;
} else
{var h__2885__auto____9112 = cljs.core.hash_coll.call(null,coll);
this__9110.__hash = h__2885__auto____9112;
return h__2885__auto____9112;
}
});
cljs.core.PersistentVector.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (coll,k){
var this__9113 = this;
return coll.cljs$core$IIndexed$_nth$arity$3(coll,k,null);
});
cljs.core.PersistentVector.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (coll,k,not_found){
var this__9114 = this;
return coll.cljs$core$IIndexed$_nth$arity$3(coll,k,not_found);
});
cljs.core.PersistentVector.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (coll,k,v){
var this__9115 = this;
if((function (){var and__3822__auto____9116 = (0 <= k);
if(and__3822__auto____9116)
{return (k < this__9115.cnt);
} else
{return and__3822__auto____9116;
}
})())
{if((cljs.core.tail_off.call(null,coll) <= k))
{var new_tail__9117 = this__9115.tail.slice();
(new_tail__9117[(k & 31)] = v);
return (new cljs.core.PersistentVector(this__9115.meta,this__9115.cnt,this__9115.shift,this__9115.root,new_tail__9117,null));
} else
{return (new cljs.core.PersistentVector(this__9115.meta,this__9115.cnt,this__9115.shift,cljs.core.do_assoc.call(null,coll,this__9115.shift,this__9115.root,k,v),this__9115.tail,null));
}
} else
{if((k === this__9115.cnt))
{return coll.cljs$core$ICollection$_conj$arity$2(coll,v);
} else
{if("\uFDD0'else")
{throw (new Error([cljs.core.str("Index "),cljs.core.str(k),cljs.core.str(" out of bounds  [0,"),cljs.core.str(this__9115.cnt),cljs.core.str("]")].join('')));
} else
{return null;
}
}
}
});
cljs.core.PersistentVector.prototype.call = (function() {
var G__9165 = null;
var G__9165__2 = (function (this_sym9118,k){
var this__9120 = this;
var this_sym9118__9121 = this;
var coll__9122 = this_sym9118__9121;
return coll__9122.cljs$core$ILookup$_lookup$arity$2(coll__9122,k);
});
var G__9165__3 = (function (this_sym9119,k,not_found){
var this__9120 = this;
var this_sym9119__9123 = this;
var coll__9124 = this_sym9119__9123;
return coll__9124.cljs$core$ILookup$_lookup$arity$3(coll__9124,k,not_found);
});
G__9165 = function(this_sym9119,k,not_found){
switch(arguments.length){
case 2:
return G__9165__2.call(this,this_sym9119,k);
case 3:
return G__9165__3.call(this,this_sym9119,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__9165;
})()
;
cljs.core.PersistentVector.prototype.apply = (function (this_sym9107,args9108){
var this__9125 = this;
return this_sym9107.call.apply(this_sym9107,[this_sym9107].concat(args9108.slice()));
});
cljs.core.PersistentVector.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (v,f,init){
var this__9126 = this;
var step_init__9127 = [0,init];
var i__9128 = 0;
while(true){
if((i__9128 < this__9126.cnt))
{var arr__9129 = cljs.core.array_for.call(null,v,i__9128);
var len__9130 = arr__9129.length;
var init__9134 = (function (){var j__9131 = 0;
var init__9132 = (step_init__9127[1]);
while(true){
if((j__9131 < len__9130))
{var init__9133 = f.call(null,init__9132,(j__9131 + i__9128),(arr__9129[j__9131]));
if(cljs.core.reduced_QMARK_.call(null,init__9133))
{return init__9133;
} else
{{
var G__9166 = (j__9131 + 1);
var G__9167 = init__9133;
j__9131 = G__9166;
init__9132 = G__9167;
continue;
}
}
} else
{(step_init__9127[0] = len__9130);
(step_init__9127[1] = init__9132);
return init__9132;
}
break;
}
})();
if(cljs.core.reduced_QMARK_.call(null,init__9134))
{return cljs.core.deref.call(null,init__9134);
} else
{{
var G__9168 = (i__9128 + (step_init__9127[0]));
i__9128 = G__9168;
continue;
}
}
} else
{return (step_init__9127[1]);
}
break;
}
});
cljs.core.PersistentVector.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__9135 = this;
if(((this__9135.cnt - cljs.core.tail_off.call(null,coll)) < 32))
{var new_tail__9136 = this__9135.tail.slice();
new_tail__9136.push(o);
return (new cljs.core.PersistentVector(this__9135.meta,(this__9135.cnt + 1),this__9135.shift,this__9135.root,new_tail__9136,null));
} else
{var root_overflow_QMARK___9137 = ((this__9135.cnt >>> 5) > (1 << this__9135.shift));
var new_shift__9138 = ((root_overflow_QMARK___9137)?(this__9135.shift + 5):this__9135.shift);
var new_root__9140 = ((root_overflow_QMARK___9137)?(function (){var n_r__9139 = cljs.core.pv_fresh_node.call(null,null);
cljs.core.pv_aset.call(null,n_r__9139,0,this__9135.root);
cljs.core.pv_aset.call(null,n_r__9139,1,cljs.core.new_path.call(null,null,this__9135.shift,(new cljs.core.VectorNode(null,this__9135.tail))));
return n_r__9139;
})():cljs.core.push_tail.call(null,coll,this__9135.shift,this__9135.root,(new cljs.core.VectorNode(null,this__9135.tail))));
return (new cljs.core.PersistentVector(this__9135.meta,(this__9135.cnt + 1),new_shift__9138,new_root__9140,[o],null));
}
});
cljs.core.PersistentVector.prototype.cljs$core$IReversible$_rseq$arity$1 = (function (coll){
var this__9141 = this;
if((this__9141.cnt > 0))
{return (new cljs.core.RSeq(coll,(this__9141.cnt - 1),null));
} else
{return cljs.core.List.EMPTY;
}
});
cljs.core.PersistentVector.prototype.cljs$core$IMapEntry$_key$arity$1 = (function (coll){
var this__9142 = this;
return coll.cljs$core$IIndexed$_nth$arity$2(coll,0);
});
cljs.core.PersistentVector.prototype.cljs$core$IMapEntry$_val$arity$1 = (function (coll){
var this__9143 = this;
return coll.cljs$core$IIndexed$_nth$arity$2(coll,1);
});
cljs.core.PersistentVector.prototype.toString = (function (){
var this__9144 = this;
var this__9145 = this;
return cljs.core.pr_str.call(null,this__9145);
});
cljs.core.PersistentVector.prototype.cljs$core$IReduce$_reduce$arity$2 = (function (v,f){
var this__9146 = this;
return cljs.core.ci_reduce.call(null,v,f);
});
cljs.core.PersistentVector.prototype.cljs$core$IReduce$_reduce$arity$3 = (function (v,f,start){
var this__9147 = this;
return cljs.core.ci_reduce.call(null,v,f,start);
});
cljs.core.PersistentVector.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__9148 = this;
if((this__9148.cnt === 0))
{return null;
} else
{return cljs.core.chunked_seq.call(null,coll,0,0);
}
});
cljs.core.PersistentVector.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__9149 = this;
return this__9149.cnt;
});
cljs.core.PersistentVector.prototype.cljs$core$IStack$_peek$arity$1 = (function (coll){
var this__9150 = this;
if((this__9150.cnt > 0))
{return coll.cljs$core$IIndexed$_nth$arity$2(coll,(this__9150.cnt - 1));
} else
{return null;
}
});
cljs.core.PersistentVector.prototype.cljs$core$IStack$_pop$arity$1 = (function (coll){
var this__9151 = this;
if((this__9151.cnt === 0))
{throw (new Error("Can't pop empty vector"));
} else
{if((1 === this__9151.cnt))
{return cljs.core._with_meta.call(null,cljs.core.PersistentVector.EMPTY,this__9151.meta);
} else
{if((1 < (this__9151.cnt - cljs.core.tail_off.call(null,coll))))
{return (new cljs.core.PersistentVector(this__9151.meta,(this__9151.cnt - 1),this__9151.shift,this__9151.root,this__9151.tail.slice(0,-1),null));
} else
{if("\uFDD0'else")
{var new_tail__9152 = cljs.core.array_for.call(null,coll,(this__9151.cnt - 2));
var nr__9153 = cljs.core.pop_tail.call(null,coll,this__9151.shift,this__9151.root);
var new_root__9154 = (((nr__9153 == null))?cljs.core.PersistentVector.EMPTY_NODE:nr__9153);
var cnt_1__9155 = (this__9151.cnt - 1);
if((function (){var and__3822__auto____9156 = (5 < this__9151.shift);
if(and__3822__auto____9156)
{return (cljs.core.pv_aget.call(null,new_root__9154,1) == null);
} else
{return and__3822__auto____9156;
}
})())
{return (new cljs.core.PersistentVector(this__9151.meta,cnt_1__9155,(this__9151.shift - 5),cljs.core.pv_aget.call(null,new_root__9154,0),new_tail__9152,null));
} else
{return (new cljs.core.PersistentVector(this__9151.meta,cnt_1__9155,this__9151.shift,new_root__9154,new_tail__9152,null));
}
} else
{return null;
}
}
}
}
});
cljs.core.PersistentVector.prototype.cljs$core$IVector$_assoc_n$arity$3 = (function (coll,n,val){
var this__9157 = this;
return coll.cljs$core$IAssociative$_assoc$arity$3(coll,n,val);
});
cljs.core.PersistentVector.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__9158 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.PersistentVector.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__9159 = this;
return (new cljs.core.PersistentVector(meta,this__9159.cnt,this__9159.shift,this__9159.root,this__9159.tail,this__9159.__hash));
});
cljs.core.PersistentVector.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__9160 = this;
return this__9160.meta;
});
cljs.core.PersistentVector.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (coll,n){
var this__9161 = this;
return (cljs.core.array_for.call(null,coll,n)[(n & 31)]);
});
cljs.core.PersistentVector.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (coll,n,not_found){
var this__9162 = this;
if((function (){var and__3822__auto____9163 = (0 <= n);
if(and__3822__auto____9163)
{return (n < this__9162.cnt);
} else
{return and__3822__auto____9163;
}
})())
{return coll.cljs$core$IIndexed$_nth$arity$2(coll,n);
} else
{return not_found;
}
});
cljs.core.PersistentVector.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__9164 = this;
return cljs.core.with_meta.call(null,cljs.core.PersistentVector.EMPTY,this__9164.meta);
});
cljs.core.PersistentVector;
cljs.core.PersistentVector.EMPTY_NODE = cljs.core.pv_fresh_node.call(null,null);
cljs.core.PersistentVector.EMPTY = (new cljs.core.PersistentVector(null,0,5,cljs.core.PersistentVector.EMPTY_NODE,[],0));
cljs.core.PersistentVector.fromArray = (function (xs,no_clone){
var l__9169 = xs.length;
var xs__9170 = (((no_clone === true))?xs:xs.slice());
if((l__9169 < 32))
{return (new cljs.core.PersistentVector(null,l__9169,5,cljs.core.PersistentVector.EMPTY_NODE,xs__9170,null));
} else
{var node__9171 = xs__9170.slice(0,32);
var v__9172 = (new cljs.core.PersistentVector(null,32,5,cljs.core.PersistentVector.EMPTY_NODE,node__9171,null));
var i__9173 = 32;
var out__9174 = cljs.core._as_transient.call(null,v__9172);
while(true){
if((i__9173 < l__9169))
{{
var G__9175 = (i__9173 + 1);
var G__9176 = cljs.core.conj_BANG_.call(null,out__9174,(xs__9170[i__9173]));
i__9173 = G__9175;
out__9174 = G__9176;
continue;
}
} else
{return cljs.core.persistent_BANG_.call(null,out__9174);
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
vector.cljs$lang$applyTo = (function (arglist__9177){
var args = cljs.core.seq(arglist__9177);;
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
cljs.core.ChunkedSeq.cljs$lang$ctorPrSeq = (function (this__3002__auto__){
return cljs.core.list.call(null,"cljs.core/ChunkedSeq");
});
cljs.core.ChunkedSeq.prototype.cljs$core$INext$_next$arity$1 = (function (coll){
var this__9178 = this;
if(((this__9178.off + 1) < this__9178.node.length))
{var s__9179 = cljs.core.chunked_seq.call(null,this__9178.vec,this__9178.node,this__9178.i,(this__9178.off + 1));
if((s__9179 == null))
{return null;
} else
{return s__9179;
}
} else
{return coll.cljs$core$IChunkedNext$_chunked_next$arity$1(coll);
}
});
cljs.core.ChunkedSeq.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__9180 = this;
return cljs.core.cons.call(null,o,coll);
});
cljs.core.ChunkedSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__9181 = this;
return coll;
});
cljs.core.ChunkedSeq.prototype.cljs$core$ISeq$_first$arity$1 = (function (coll){
var this__9182 = this;
return (this__9182.node[this__9182.off]);
});
cljs.core.ChunkedSeq.prototype.cljs$core$ISeq$_rest$arity$1 = (function (coll){
var this__9183 = this;
if(((this__9183.off + 1) < this__9183.node.length))
{var s__9184 = cljs.core.chunked_seq.call(null,this__9183.vec,this__9183.node,this__9183.i,(this__9183.off + 1));
if((s__9184 == null))
{return cljs.core.List.EMPTY;
} else
{return s__9184;
}
} else
{return coll.cljs$core$IChunkedSeq$_chunked_rest$arity$1(coll);
}
});
cljs.core.ChunkedSeq.prototype.cljs$core$IChunkedNext$ = true;
cljs.core.ChunkedSeq.prototype.cljs$core$IChunkedNext$_chunked_next$arity$1 = (function (coll){
var this__9185 = this;
var l__9186 = this__9185.node.length;
var s__9187 = ((((this__9185.i + l__9186) < cljs.core._count.call(null,this__9185.vec)))?cljs.core.chunked_seq.call(null,this__9185.vec,(this__9185.i + l__9186),0):null);
if((s__9187 == null))
{return null;
} else
{return s__9187;
}
});
cljs.core.ChunkedSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__9188 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.ChunkedSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,m){
var this__9189 = this;
return cljs.core.chunked_seq.call(null,this__9189.vec,this__9189.node,this__9189.i,this__9189.off,m);
});
cljs.core.ChunkedSeq.prototype.cljs$core$IWithMeta$_meta$arity$1 = (function (coll){
var this__9190 = this;
return this__9190.meta;
});
cljs.core.ChunkedSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__9191 = this;
return cljs.core.with_meta.call(null,cljs.core.PersistentVector.EMPTY,this__9191.meta);
});
cljs.core.ChunkedSeq.prototype.cljs$core$IChunkedSeq$ = true;
cljs.core.ChunkedSeq.prototype.cljs$core$IChunkedSeq$_chunked_first$arity$1 = (function (coll){
var this__9192 = this;
return cljs.core.array_chunk.call(null,this__9192.node,this__9192.off);
});
cljs.core.ChunkedSeq.prototype.cljs$core$IChunkedSeq$_chunked_rest$arity$1 = (function (coll){
var this__9193 = this;
var l__9194 = this__9193.node.length;
var s__9195 = ((((this__9193.i + l__9194) < cljs.core._count.call(null,this__9193.vec)))?cljs.core.chunked_seq.call(null,this__9193.vec,(this__9193.i + l__9194),0):null);
if((s__9195 == null))
{return cljs.core.List.EMPTY;
} else
{return s__9195;
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
cljs.core.Subvec.cljs$lang$ctorPrSeq = (function (this__3002__auto__){
return cljs.core.list.call(null,"cljs.core/Subvec");
});
cljs.core.Subvec.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__9198 = this;
var h__2885__auto____9199 = this__9198.__hash;
if(!((h__2885__auto____9199 == null)))
{return h__2885__auto____9199;
} else
{var h__2885__auto____9200 = cljs.core.hash_coll.call(null,coll);
this__9198.__hash = h__2885__auto____9200;
return h__2885__auto____9200;
}
});
cljs.core.Subvec.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (coll,k){
var this__9201 = this;
return coll.cljs$core$IIndexed$_nth$arity$3(coll,k,null);
});
cljs.core.Subvec.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (coll,k,not_found){
var this__9202 = this;
return coll.cljs$core$IIndexed$_nth$arity$3(coll,k,not_found);
});
cljs.core.Subvec.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (coll,key,val){
var this__9203 = this;
var v_pos__9204 = (this__9203.start + key);
return (new cljs.core.Subvec(this__9203.meta,cljs.core._assoc.call(null,this__9203.v,v_pos__9204,val),this__9203.start,((this__9203.end > (v_pos__9204 + 1)) ? this__9203.end : (v_pos__9204 + 1)),null));
});
cljs.core.Subvec.prototype.call = (function() {
var G__9230 = null;
var G__9230__2 = (function (this_sym9205,k){
var this__9207 = this;
var this_sym9205__9208 = this;
var coll__9209 = this_sym9205__9208;
return coll__9209.cljs$core$ILookup$_lookup$arity$2(coll__9209,k);
});
var G__9230__3 = (function (this_sym9206,k,not_found){
var this__9207 = this;
var this_sym9206__9210 = this;
var coll__9211 = this_sym9206__9210;
return coll__9211.cljs$core$ILookup$_lookup$arity$3(coll__9211,k,not_found);
});
G__9230 = function(this_sym9206,k,not_found){
switch(arguments.length){
case 2:
return G__9230__2.call(this,this_sym9206,k);
case 3:
return G__9230__3.call(this,this_sym9206,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__9230;
})()
;
cljs.core.Subvec.prototype.apply = (function (this_sym9196,args9197){
var this__9212 = this;
return this_sym9196.call.apply(this_sym9196,[this_sym9196].concat(args9197.slice()));
});
cljs.core.Subvec.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__9213 = this;
return (new cljs.core.Subvec(this__9213.meta,cljs.core._assoc_n.call(null,this__9213.v,this__9213.end,o),this__9213.start,(this__9213.end + 1),null));
});
cljs.core.Subvec.prototype.toString = (function (){
var this__9214 = this;
var this__9215 = this;
return cljs.core.pr_str.call(null,this__9215);
});
cljs.core.Subvec.prototype.cljs$core$IReduce$_reduce$arity$2 = (function (coll,f){
var this__9216 = this;
return cljs.core.ci_reduce.call(null,coll,f);
});
cljs.core.Subvec.prototype.cljs$core$IReduce$_reduce$arity$3 = (function (coll,f,start){
var this__9217 = this;
return cljs.core.ci_reduce.call(null,coll,f,start);
});
cljs.core.Subvec.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__9218 = this;
var subvec_seq__9219 = (function subvec_seq(i){
if((i === this__9218.end))
{return null;
} else
{return cljs.core.cons.call(null,cljs.core._nth.call(null,this__9218.v,i),(new cljs.core.LazySeq(null,false,(function (){
return subvec_seq.call(null,(i + 1));
}),null)));
}
});
return subvec_seq__9219.call(null,this__9218.start);
});
cljs.core.Subvec.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__9220 = this;
return (this__9220.end - this__9220.start);
});
cljs.core.Subvec.prototype.cljs$core$IStack$_peek$arity$1 = (function (coll){
var this__9221 = this;
return cljs.core._nth.call(null,this__9221.v,(this__9221.end - 1));
});
cljs.core.Subvec.prototype.cljs$core$IStack$_pop$arity$1 = (function (coll){
var this__9222 = this;
if((this__9222.start === this__9222.end))
{throw (new Error("Can't pop empty vector"));
} else
{return (new cljs.core.Subvec(this__9222.meta,this__9222.v,this__9222.start,(this__9222.end - 1),null));
}
});
cljs.core.Subvec.prototype.cljs$core$IVector$_assoc_n$arity$3 = (function (coll,n,val){
var this__9223 = this;
return coll.cljs$core$IAssociative$_assoc$arity$3(coll,n,val);
});
cljs.core.Subvec.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__9224 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.Subvec.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__9225 = this;
return (new cljs.core.Subvec(meta,this__9225.v,this__9225.start,this__9225.end,this__9225.__hash));
});
cljs.core.Subvec.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__9226 = this;
return this__9226.meta;
});
cljs.core.Subvec.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (coll,n){
var this__9227 = this;
return cljs.core._nth.call(null,this__9227.v,(this__9227.start + n));
});
cljs.core.Subvec.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (coll,n,not_found){
var this__9228 = this;
return cljs.core._nth.call(null,this__9228.v,(this__9228.start + n),not_found);
});
cljs.core.Subvec.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__9229 = this;
return cljs.core.with_meta.call(null,cljs.core.Vector.EMPTY,this__9229.meta);
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
var ret__9232 = cljs.core.make_array.call(null,32);
cljs.core.array_copy.call(null,tl,0,ret__9232,0,tl.length);
return ret__9232;
});
cljs.core.tv_push_tail = (function tv_push_tail(tv,level,parent,tail_node){
var ret__9236 = cljs.core.tv_ensure_editable.call(null,tv.root.edit,parent);
var subidx__9237 = (((tv.cnt - 1) >>> level) & 31);
cljs.core.pv_aset.call(null,ret__9236,subidx__9237,(((level === 5))?tail_node:(function (){var child__9238 = cljs.core.pv_aget.call(null,ret__9236,subidx__9237);
if(!((child__9238 == null)))
{return tv_push_tail.call(null,tv,(level - 5),child__9238,tail_node);
} else
{return cljs.core.new_path.call(null,tv.root.edit,(level - 5),tail_node);
}
})()));
return ret__9236;
});
cljs.core.tv_pop_tail = (function tv_pop_tail(tv,level,node){
var node__9243 = cljs.core.tv_ensure_editable.call(null,tv.root.edit,node);
var subidx__9244 = (((tv.cnt - 2) >>> level) & 31);
if((level > 5))
{var new_child__9245 = tv_pop_tail.call(null,tv,(level - 5),cljs.core.pv_aget.call(null,node__9243,subidx__9244));
if((function (){var and__3822__auto____9246 = (new_child__9245 == null);
if(and__3822__auto____9246)
{return (subidx__9244 === 0);
} else
{return and__3822__auto____9246;
}
})())
{return null;
} else
{cljs.core.pv_aset.call(null,node__9243,subidx__9244,new_child__9245);
return node__9243;
}
} else
{if((subidx__9244 === 0))
{return null;
} else
{if("\uFDD0'else")
{cljs.core.pv_aset.call(null,node__9243,subidx__9244,null);
return node__9243;
} else
{return null;
}
}
}
});
cljs.core.editable_array_for = (function editable_array_for(tv,i){
if((function (){var and__3822__auto____9251 = (0 <= i);
if(and__3822__auto____9251)
{return (i < tv.cnt);
} else
{return and__3822__auto____9251;
}
})())
{if((i >= cljs.core.tail_off.call(null,tv)))
{return tv.tail;
} else
{var root__9252 = tv.root;
var node__9253 = root__9252;
var level__9254 = tv.shift;
while(true){
if((level__9254 > 0))
{{
var G__9255 = cljs.core.tv_ensure_editable.call(null,root__9252.edit,cljs.core.pv_aget.call(null,node__9253,((i >>> level__9254) & 31)));
var G__9256 = (level__9254 - 5);
node__9253 = G__9255;
level__9254 = G__9256;
continue;
}
} else
{return node__9253.arr;
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
cljs.core.TransientVector.cljs$lang$ctorPrSeq = (function (this__3002__auto__){
return cljs.core.list.call(null,"cljs.core/TransientVector");
});
cljs.core.TransientVector.prototype.call = (function() {
var G__9296 = null;
var G__9296__2 = (function (this_sym9259,k){
var this__9261 = this;
var this_sym9259__9262 = this;
var coll__9263 = this_sym9259__9262;
return coll__9263.cljs$core$ILookup$_lookup$arity$2(coll__9263,k);
});
var G__9296__3 = (function (this_sym9260,k,not_found){
var this__9261 = this;
var this_sym9260__9264 = this;
var coll__9265 = this_sym9260__9264;
return coll__9265.cljs$core$ILookup$_lookup$arity$3(coll__9265,k,not_found);
});
G__9296 = function(this_sym9260,k,not_found){
switch(arguments.length){
case 2:
return G__9296__2.call(this,this_sym9260,k);
case 3:
return G__9296__3.call(this,this_sym9260,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__9296;
})()
;
cljs.core.TransientVector.prototype.apply = (function (this_sym9257,args9258){
var this__9266 = this;
return this_sym9257.call.apply(this_sym9257,[this_sym9257].concat(args9258.slice()));
});
cljs.core.TransientVector.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (coll,k){
var this__9267 = this;
return coll.cljs$core$IIndexed$_nth$arity$3(coll,k,null);
});
cljs.core.TransientVector.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (coll,k,not_found){
var this__9268 = this;
return coll.cljs$core$IIndexed$_nth$arity$3(coll,k,not_found);
});
cljs.core.TransientVector.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (coll,n){
var this__9269 = this;
if(this__9269.root.edit)
{return (cljs.core.array_for.call(null,coll,n)[(n & 31)]);
} else
{throw (new Error("nth after persistent!"));
}
});
cljs.core.TransientVector.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (coll,n,not_found){
var this__9270 = this;
if((function (){var and__3822__auto____9271 = (0 <= n);
if(and__3822__auto____9271)
{return (n < this__9270.cnt);
} else
{return and__3822__auto____9271;
}
})())
{return coll.cljs$core$IIndexed$_nth$arity$2(coll,n);
} else
{return not_found;
}
});
cljs.core.TransientVector.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__9272 = this;
if(this__9272.root.edit)
{return this__9272.cnt;
} else
{throw (new Error("count after persistent!"));
}
});
cljs.core.TransientVector.prototype.cljs$core$ITransientVector$_assoc_n_BANG_$arity$3 = (function (tcoll,n,val){
var this__9273 = this;
if(this__9273.root.edit)
{if((function (){var and__3822__auto____9274 = (0 <= n);
if(and__3822__auto____9274)
{return (n < this__9273.cnt);
} else
{return and__3822__auto____9274;
}
})())
{if((cljs.core.tail_off.call(null,tcoll) <= n))
{(this__9273.tail[(n & 31)] = val);
return tcoll;
} else
{var new_root__9279 = (function go(level,node){
var node__9277 = cljs.core.tv_ensure_editable.call(null,this__9273.root.edit,node);
if((level === 0))
{cljs.core.pv_aset.call(null,node__9277,(n & 31),val);
return node__9277;
} else
{var subidx__9278 = ((n >>> level) & 31);
cljs.core.pv_aset.call(null,node__9277,subidx__9278,go.call(null,(level - 5),cljs.core.pv_aget.call(null,node__9277,subidx__9278)));
return node__9277;
}
}).call(null,this__9273.shift,this__9273.root);
this__9273.root = new_root__9279;
return tcoll;
}
} else
{if((n === this__9273.cnt))
{return tcoll.cljs$core$ITransientCollection$_conj_BANG_$arity$2(tcoll,val);
} else
{if("\uFDD0'else")
{throw (new Error([cljs.core.str("Index "),cljs.core.str(n),cljs.core.str(" out of bounds for TransientVector of length"),cljs.core.str(this__9273.cnt)].join('')));
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
var this__9280 = this;
if(this__9280.root.edit)
{if((this__9280.cnt === 0))
{throw (new Error("Can't pop empty vector"));
} else
{if((1 === this__9280.cnt))
{this__9280.cnt = 0;
return tcoll;
} else
{if((((this__9280.cnt - 1) & 31) > 0))
{this__9280.cnt = (this__9280.cnt - 1);
return tcoll;
} else
{if("\uFDD0'else")
{var new_tail__9281 = cljs.core.editable_array_for.call(null,tcoll,(this__9280.cnt - 2));
var new_root__9283 = (function (){var nr__9282 = cljs.core.tv_pop_tail.call(null,tcoll,this__9280.shift,this__9280.root);
if(!((nr__9282 == null)))
{return nr__9282;
} else
{return (new cljs.core.VectorNode(this__9280.root.edit,cljs.core.make_array.call(null,32)));
}
})();
if((function (){var and__3822__auto____9284 = (5 < this__9280.shift);
if(and__3822__auto____9284)
{return (cljs.core.pv_aget.call(null,new_root__9283,1) == null);
} else
{return and__3822__auto____9284;
}
})())
{var new_root__9285 = cljs.core.tv_ensure_editable.call(null,this__9280.root.edit,cljs.core.pv_aget.call(null,new_root__9283,0));
this__9280.root = new_root__9285;
this__9280.shift = (this__9280.shift - 5);
this__9280.cnt = (this__9280.cnt - 1);
this__9280.tail = new_tail__9281;
return tcoll;
} else
{this__9280.root = new_root__9283;
this__9280.cnt = (this__9280.cnt - 1);
this__9280.tail = new_tail__9281;
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
var this__9286 = this;
return tcoll.cljs$core$ITransientVector$_assoc_n_BANG_$arity$3(tcoll,key,val);
});
cljs.core.TransientVector.prototype.cljs$core$ITransientCollection$_conj_BANG_$arity$2 = (function (tcoll,o){
var this__9287 = this;
if(this__9287.root.edit)
{if(((this__9287.cnt - cljs.core.tail_off.call(null,tcoll)) < 32))
{(this__9287.tail[(this__9287.cnt & 31)] = o);
this__9287.cnt = (this__9287.cnt + 1);
return tcoll;
} else
{var tail_node__9288 = (new cljs.core.VectorNode(this__9287.root.edit,this__9287.tail));
var new_tail__9289 = cljs.core.make_array.call(null,32);
(new_tail__9289[0] = o);
this__9287.tail = new_tail__9289;
if(((this__9287.cnt >>> 5) > (1 << this__9287.shift)))
{var new_root_array__9290 = cljs.core.make_array.call(null,32);
var new_shift__9291 = (this__9287.shift + 5);
(new_root_array__9290[0] = this__9287.root);
(new_root_array__9290[1] = cljs.core.new_path.call(null,this__9287.root.edit,this__9287.shift,tail_node__9288));
this__9287.root = (new cljs.core.VectorNode(this__9287.root.edit,new_root_array__9290));
this__9287.shift = new_shift__9291;
this__9287.cnt = (this__9287.cnt + 1);
return tcoll;
} else
{var new_root__9292 = cljs.core.tv_push_tail.call(null,tcoll,this__9287.shift,this__9287.root,tail_node__9288);
this__9287.root = new_root__9292;
this__9287.cnt = (this__9287.cnt + 1);
return tcoll;
}
}
} else
{throw (new Error("conj! after persistent!"));
}
});
cljs.core.TransientVector.prototype.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 = (function (tcoll){
var this__9293 = this;
if(this__9293.root.edit)
{this__9293.root.edit = null;
var len__9294 = (this__9293.cnt - cljs.core.tail_off.call(null,tcoll));
var trimmed_tail__9295 = cljs.core.make_array.call(null,len__9294);
cljs.core.array_copy.call(null,this__9293.tail,0,trimmed_tail__9295,0,len__9294);
return (new cljs.core.PersistentVector(null,this__9293.cnt,this__9293.shift,this__9293.root,trimmed_tail__9295,null));
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
cljs.core.PersistentQueueSeq.cljs$lang$ctorPrSeq = (function (this__3002__auto__){
return cljs.core.list.call(null,"cljs.core/PersistentQueueSeq");
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__9297 = this;
var h__2885__auto____9298 = this__9297.__hash;
if(!((h__2885__auto____9298 == null)))
{return h__2885__auto____9298;
} else
{var h__2885__auto____9299 = cljs.core.hash_coll.call(null,coll);
this__9297.__hash = h__2885__auto____9299;
return h__2885__auto____9299;
}
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__9300 = this;
return cljs.core.cons.call(null,o,coll);
});
cljs.core.PersistentQueueSeq.prototype.toString = (function (){
var this__9301 = this;
var this__9302 = this;
return cljs.core.pr_str.call(null,this__9302);
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__9303 = this;
return coll;
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeq$_first$arity$1 = (function (coll){
var this__9304 = this;
return cljs.core._first.call(null,this__9304.front);
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeq$_rest$arity$1 = (function (coll){
var this__9305 = this;
var temp__3971__auto____9306 = cljs.core.next.call(null,this__9305.front);
if(temp__3971__auto____9306)
{var f1__9307 = temp__3971__auto____9306;
return (new cljs.core.PersistentQueueSeq(this__9305.meta,f1__9307,this__9305.rear,null));
} else
{if((this__9305.rear == null))
{return coll.cljs$core$IEmptyableCollection$_empty$arity$1(coll);
} else
{return (new cljs.core.PersistentQueueSeq(this__9305.meta,this__9305.rear,null,null));
}
}
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__9308 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__9309 = this;
return (new cljs.core.PersistentQueueSeq(meta,this__9309.front,this__9309.rear,this__9309.__hash));
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__9310 = this;
return this__9310.meta;
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__9311 = this;
return cljs.core.with_meta.call(null,cljs.core.List.EMPTY,this__9311.meta);
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
cljs.core.PersistentQueue.cljs$lang$ctorPrSeq = (function (this__3002__auto__){
return cljs.core.list.call(null,"cljs.core/PersistentQueue");
});
cljs.core.PersistentQueue.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__9312 = this;
var h__2885__auto____9313 = this__9312.__hash;
if(!((h__2885__auto____9313 == null)))
{return h__2885__auto____9313;
} else
{var h__2885__auto____9314 = cljs.core.hash_coll.call(null,coll);
this__9312.__hash = h__2885__auto____9314;
return h__2885__auto____9314;
}
});
cljs.core.PersistentQueue.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__9315 = this;
if(cljs.core.truth_(this__9315.front))
{return (new cljs.core.PersistentQueue(this__9315.meta,(this__9315.count + 1),this__9315.front,cljs.core.conj.call(null,(function (){var or__3824__auto____9316 = this__9315.rear;
if(cljs.core.truth_(or__3824__auto____9316))
{return or__3824__auto____9316;
} else
{return cljs.core.PersistentVector.EMPTY;
}
})(),o),null));
} else
{return (new cljs.core.PersistentQueue(this__9315.meta,(this__9315.count + 1),cljs.core.conj.call(null,this__9315.front,o),cljs.core.PersistentVector.EMPTY,null));
}
});
cljs.core.PersistentQueue.prototype.toString = (function (){
var this__9317 = this;
var this__9318 = this;
return cljs.core.pr_str.call(null,this__9318);
});
cljs.core.PersistentQueue.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__9319 = this;
var rear__9320 = cljs.core.seq.call(null,this__9319.rear);
if(cljs.core.truth_((function (){var or__3824__auto____9321 = this__9319.front;
if(cljs.core.truth_(or__3824__auto____9321))
{return or__3824__auto____9321;
} else
{return rear__9320;
}
})()))
{return (new cljs.core.PersistentQueueSeq(null,this__9319.front,cljs.core.seq.call(null,rear__9320),null));
} else
{return null;
}
});
cljs.core.PersistentQueue.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__9322 = this;
return this__9322.count;
});
cljs.core.PersistentQueue.prototype.cljs$core$IStack$_peek$arity$1 = (function (coll){
var this__9323 = this;
return cljs.core._first.call(null,this__9323.front);
});
cljs.core.PersistentQueue.prototype.cljs$core$IStack$_pop$arity$1 = (function (coll){
var this__9324 = this;
if(cljs.core.truth_(this__9324.front))
{var temp__3971__auto____9325 = cljs.core.next.call(null,this__9324.front);
if(temp__3971__auto____9325)
{var f1__9326 = temp__3971__auto____9325;
return (new cljs.core.PersistentQueue(this__9324.meta,(this__9324.count - 1),f1__9326,this__9324.rear,null));
} else
{return (new cljs.core.PersistentQueue(this__9324.meta,(this__9324.count - 1),cljs.core.seq.call(null,this__9324.rear),cljs.core.PersistentVector.EMPTY,null));
}
} else
{return coll;
}
});
cljs.core.PersistentQueue.prototype.cljs$core$ISeq$_first$arity$1 = (function (coll){
var this__9327 = this;
return cljs.core.first.call(null,this__9327.front);
});
cljs.core.PersistentQueue.prototype.cljs$core$ISeq$_rest$arity$1 = (function (coll){
var this__9328 = this;
return cljs.core.rest.call(null,cljs.core.seq.call(null,coll));
});
cljs.core.PersistentQueue.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__9329 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.PersistentQueue.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__9330 = this;
return (new cljs.core.PersistentQueue(meta,this__9330.count,this__9330.front,this__9330.rear,this__9330.__hash));
});
cljs.core.PersistentQueue.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__9331 = this;
return this__9331.meta;
});
cljs.core.PersistentQueue.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__9332 = this;
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
cljs.core.NeverEquiv.cljs$lang$ctorPrSeq = (function (this__3002__auto__){
return cljs.core.list.call(null,"cljs.core/NeverEquiv");
});
cljs.core.NeverEquiv.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (o,other){
var this__9333 = this;
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
var len__9336 = array.length;
var i__9337 = 0;
while(true){
if((i__9337 < len__9336))
{if((k === (array[i__9337])))
{return i__9337;
} else
{{
var G__9338 = (i__9337 + incr);
i__9337 = G__9338;
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
var a__9341 = cljs.core.hash.call(null,a);
var b__9342 = cljs.core.hash.call(null,b);
if((a__9341 < b__9342))
{return -1;
} else
{if((a__9341 > b__9342))
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
var ks__9350 = m.keys;
var len__9351 = ks__9350.length;
var so__9352 = m.strobj;
var out__9353 = cljs.core.with_meta.call(null,cljs.core.PersistentHashMap.EMPTY,cljs.core.meta.call(null,m));
var i__9354 = 0;
var out__9355 = cljs.core.transient$.call(null,out__9353);
while(true){
if((i__9354 < len__9351))
{var k__9356 = (ks__9350[i__9354]);
{
var G__9357 = (i__9354 + 1);
var G__9358 = cljs.core.assoc_BANG_.call(null,out__9355,k__9356,(so__9352[k__9356]));
i__9354 = G__9357;
out__9355 = G__9358;
continue;
}
} else
{return cljs.core.persistent_BANG_.call(null,cljs.core.assoc_BANG_.call(null,out__9355,k,v));
}
break;
}
});
cljs.core.obj_clone = (function obj_clone(obj,ks){
var new_obj__9364 = {};
var l__9365 = ks.length;
var i__9366 = 0;
while(true){
if((i__9366 < l__9365))
{var k__9367 = (ks[i__9366]);
(new_obj__9364[k__9367] = (obj[k__9367]));
{
var G__9368 = (i__9366 + 1);
i__9366 = G__9368;
continue;
}
} else
{}
break;
}
return new_obj__9364;
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
cljs.core.ObjMap.cljs$lang$ctorPrSeq = (function (this__3002__auto__){
return cljs.core.list.call(null,"cljs.core/ObjMap");
});
cljs.core.ObjMap.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = (function (coll){
var this__9371 = this;
return cljs.core.transient$.call(null,cljs.core.into.call(null,cljs.core.hash_map.call(null),coll));
});
cljs.core.ObjMap.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__9372 = this;
var h__2885__auto____9373 = this__9372.__hash;
if(!((h__2885__auto____9373 == null)))
{return h__2885__auto____9373;
} else
{var h__2885__auto____9374 = cljs.core.hash_imap.call(null,coll);
this__9372.__hash = h__2885__auto____9374;
return h__2885__auto____9374;
}
});
cljs.core.ObjMap.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (coll,k){
var this__9375 = this;
return coll.cljs$core$ILookup$_lookup$arity$3(coll,k,null);
});
cljs.core.ObjMap.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (coll,k,not_found){
var this__9376 = this;
if((function (){var and__3822__auto____9377 = goog.isString(k);
if(and__3822__auto____9377)
{return !((cljs.core.scan_array.call(null,1,k,this__9376.keys) == null));
} else
{return and__3822__auto____9377;
}
})())
{return (this__9376.strobj[k]);
} else
{return not_found;
}
});
cljs.core.ObjMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (coll,k,v){
var this__9378 = this;
if(goog.isString(k))
{if((function (){var or__3824__auto____9379 = (this__9378.update_count > cljs.core.ObjMap.HASHMAP_THRESHOLD);
if(or__3824__auto____9379)
{return or__3824__auto____9379;
} else
{return (this__9378.keys.length >= cljs.core.ObjMap.HASHMAP_THRESHOLD);
}
})())
{return cljs.core.obj_map__GT_hash_map.call(null,coll,k,v);
} else
{if(!((cljs.core.scan_array.call(null,1,k,this__9378.keys) == null)))
{var new_strobj__9380 = cljs.core.obj_clone.call(null,this__9378.strobj,this__9378.keys);
(new_strobj__9380[k] = v);
return (new cljs.core.ObjMap(this__9378.meta,this__9378.keys,new_strobj__9380,(this__9378.update_count + 1),null));
} else
{var new_strobj__9381 = cljs.core.obj_clone.call(null,this__9378.strobj,this__9378.keys);
var new_keys__9382 = this__9378.keys.slice();
(new_strobj__9381[k] = v);
new_keys__9382.push(k);
return (new cljs.core.ObjMap(this__9378.meta,new_keys__9382,new_strobj__9381,(this__9378.update_count + 1),null));
}
}
} else
{return cljs.core.obj_map__GT_hash_map.call(null,coll,k,v);
}
});
cljs.core.ObjMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (coll,k){
var this__9383 = this;
if((function (){var and__3822__auto____9384 = goog.isString(k);
if(and__3822__auto____9384)
{return !((cljs.core.scan_array.call(null,1,k,this__9383.keys) == null));
} else
{return and__3822__auto____9384;
}
})())
{return true;
} else
{return false;
}
});
cljs.core.ObjMap.prototype.call = (function() {
var G__9406 = null;
var G__9406__2 = (function (this_sym9385,k){
var this__9387 = this;
var this_sym9385__9388 = this;
var coll__9389 = this_sym9385__9388;
return coll__9389.cljs$core$ILookup$_lookup$arity$2(coll__9389,k);
});
var G__9406__3 = (function (this_sym9386,k,not_found){
var this__9387 = this;
var this_sym9386__9390 = this;
var coll__9391 = this_sym9386__9390;
return coll__9391.cljs$core$ILookup$_lookup$arity$3(coll__9391,k,not_found);
});
G__9406 = function(this_sym9386,k,not_found){
switch(arguments.length){
case 2:
return G__9406__2.call(this,this_sym9386,k);
case 3:
return G__9406__3.call(this,this_sym9386,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__9406;
})()
;
cljs.core.ObjMap.prototype.apply = (function (this_sym9369,args9370){
var this__9392 = this;
return this_sym9369.call.apply(this_sym9369,[this_sym9369].concat(args9370.slice()));
});
cljs.core.ObjMap.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,entry){
var this__9393 = this;
if(cljs.core.vector_QMARK_.call(null,entry))
{return coll.cljs$core$IAssociative$_assoc$arity$3(coll,cljs.core._nth.call(null,entry,0),cljs.core._nth.call(null,entry,1));
} else
{return cljs.core.reduce.call(null,cljs.core._conj,coll,entry);
}
});
cljs.core.ObjMap.prototype.toString = (function (){
var this__9394 = this;
var this__9395 = this;
return cljs.core.pr_str.call(null,this__9395);
});
cljs.core.ObjMap.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__9396 = this;
if((this__9396.keys.length > 0))
{return cljs.core.map.call(null,(function (p1__9359_SHARP_){
return cljs.core.vector.call(null,p1__9359_SHARP_,(this__9396.strobj[p1__9359_SHARP_]));
}),this__9396.keys.sort(cljs.core.obj_map_compare_keys));
} else
{return null;
}
});
cljs.core.ObjMap.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__9397 = this;
return this__9397.keys.length;
});
cljs.core.ObjMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__9398 = this;
return cljs.core.equiv_map.call(null,coll,other);
});
cljs.core.ObjMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__9399 = this;
return (new cljs.core.ObjMap(meta,this__9399.keys,this__9399.strobj,this__9399.update_count,this__9399.__hash));
});
cljs.core.ObjMap.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__9400 = this;
return this__9400.meta;
});
cljs.core.ObjMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__9401 = this;
return cljs.core.with_meta.call(null,cljs.core.ObjMap.EMPTY,this__9401.meta);
});
cljs.core.ObjMap.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (coll,k){
var this__9402 = this;
if((function (){var and__3822__auto____9403 = goog.isString(k);
if(and__3822__auto____9403)
{return !((cljs.core.scan_array.call(null,1,k,this__9402.keys) == null));
} else
{return and__3822__auto____9403;
}
})())
{var new_keys__9404 = this__9402.keys.slice();
var new_strobj__9405 = cljs.core.obj_clone.call(null,this__9402.strobj,this__9402.keys);
new_keys__9404.splice(cljs.core.scan_array.call(null,1,k,new_keys__9404),1);
cljs.core.js_delete.call(null,new_strobj__9405,k);
return (new cljs.core.ObjMap(this__9402.meta,new_keys__9404,new_strobj__9405,(this__9402.update_count + 1),null));
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
cljs.core.HashMap.cljs$lang$ctorPrSeq = (function (this__3002__auto__){
return cljs.core.list.call(null,"cljs.core/HashMap");
});
cljs.core.HashMap.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__9410 = this;
var h__2885__auto____9411 = this__9410.__hash;
if(!((h__2885__auto____9411 == null)))
{return h__2885__auto____9411;
} else
{var h__2885__auto____9412 = cljs.core.hash_imap.call(null,coll);
this__9410.__hash = h__2885__auto____9412;
return h__2885__auto____9412;
}
});
cljs.core.HashMap.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (coll,k){
var this__9413 = this;
return coll.cljs$core$ILookup$_lookup$arity$3(coll,k,null);
});
cljs.core.HashMap.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (coll,k,not_found){
var this__9414 = this;
var bucket__9415 = (this__9414.hashobj[cljs.core.hash.call(null,k)]);
var i__9416 = (cljs.core.truth_(bucket__9415)?cljs.core.scan_array.call(null,2,k,bucket__9415):null);
if(cljs.core.truth_(i__9416))
{return (bucket__9415[(i__9416 + 1)]);
} else
{return not_found;
}
});
cljs.core.HashMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (coll,k,v){
var this__9417 = this;
var h__9418 = cljs.core.hash.call(null,k);
var bucket__9419 = (this__9417.hashobj[h__9418]);
if(cljs.core.truth_(bucket__9419))
{var new_bucket__9420 = bucket__9419.slice();
var new_hashobj__9421 = goog.object.clone(this__9417.hashobj);
(new_hashobj__9421[h__9418] = new_bucket__9420);
var temp__3971__auto____9422 = cljs.core.scan_array.call(null,2,k,new_bucket__9420);
if(cljs.core.truth_(temp__3971__auto____9422))
{var i__9423 = temp__3971__auto____9422;
(new_bucket__9420[(i__9423 + 1)] = v);
return (new cljs.core.HashMap(this__9417.meta,this__9417.count,new_hashobj__9421,null));
} else
{new_bucket__9420.push(k,v);
return (new cljs.core.HashMap(this__9417.meta,(this__9417.count + 1),new_hashobj__9421,null));
}
} else
{var new_hashobj__9424 = goog.object.clone(this__9417.hashobj);
(new_hashobj__9424[h__9418] = [k,v]);
return (new cljs.core.HashMap(this__9417.meta,(this__9417.count + 1),new_hashobj__9424,null));
}
});
cljs.core.HashMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (coll,k){
var this__9425 = this;
var bucket__9426 = (this__9425.hashobj[cljs.core.hash.call(null,k)]);
var i__9427 = (cljs.core.truth_(bucket__9426)?cljs.core.scan_array.call(null,2,k,bucket__9426):null);
if(cljs.core.truth_(i__9427))
{return true;
} else
{return false;
}
});
cljs.core.HashMap.prototype.call = (function() {
var G__9452 = null;
var G__9452__2 = (function (this_sym9428,k){
var this__9430 = this;
var this_sym9428__9431 = this;
var coll__9432 = this_sym9428__9431;
return coll__9432.cljs$core$ILookup$_lookup$arity$2(coll__9432,k);
});
var G__9452__3 = (function (this_sym9429,k,not_found){
var this__9430 = this;
var this_sym9429__9433 = this;
var coll__9434 = this_sym9429__9433;
return coll__9434.cljs$core$ILookup$_lookup$arity$3(coll__9434,k,not_found);
});
G__9452 = function(this_sym9429,k,not_found){
switch(arguments.length){
case 2:
return G__9452__2.call(this,this_sym9429,k);
case 3:
return G__9452__3.call(this,this_sym9429,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__9452;
})()
;
cljs.core.HashMap.prototype.apply = (function (this_sym9408,args9409){
var this__9435 = this;
return this_sym9408.call.apply(this_sym9408,[this_sym9408].concat(args9409.slice()));
});
cljs.core.HashMap.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,entry){
var this__9436 = this;
if(cljs.core.vector_QMARK_.call(null,entry))
{return coll.cljs$core$IAssociative$_assoc$arity$3(coll,cljs.core._nth.call(null,entry,0),cljs.core._nth.call(null,entry,1));
} else
{return cljs.core.reduce.call(null,cljs.core._conj,coll,entry);
}
});
cljs.core.HashMap.prototype.toString = (function (){
var this__9437 = this;
var this__9438 = this;
return cljs.core.pr_str.call(null,this__9438);
});
cljs.core.HashMap.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__9439 = this;
if((this__9439.count > 0))
{var hashes__9440 = cljs.core.js_keys.call(null,this__9439.hashobj).sort();
return cljs.core.mapcat.call(null,(function (p1__9407_SHARP_){
return cljs.core.map.call(null,cljs.core.vec,cljs.core.partition.call(null,2,(this__9439.hashobj[p1__9407_SHARP_])));
}),hashes__9440);
} else
{return null;
}
});
cljs.core.HashMap.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__9441 = this;
return this__9441.count;
});
cljs.core.HashMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__9442 = this;
return cljs.core.equiv_map.call(null,coll,other);
});
cljs.core.HashMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__9443 = this;
return (new cljs.core.HashMap(meta,this__9443.count,this__9443.hashobj,this__9443.__hash));
});
cljs.core.HashMap.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__9444 = this;
return this__9444.meta;
});
cljs.core.HashMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__9445 = this;
return cljs.core.with_meta.call(null,cljs.core.HashMap.EMPTY,this__9445.meta);
});
cljs.core.HashMap.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (coll,k){
var this__9446 = this;
var h__9447 = cljs.core.hash.call(null,k);
var bucket__9448 = (this__9446.hashobj[h__9447]);
var i__9449 = (cljs.core.truth_(bucket__9448)?cljs.core.scan_array.call(null,2,k,bucket__9448):null);
if(cljs.core.not.call(null,i__9449))
{return coll;
} else
{var new_hashobj__9450 = goog.object.clone(this__9446.hashobj);
if((3 > bucket__9448.length))
{cljs.core.js_delete.call(null,new_hashobj__9450,h__9447);
} else
{var new_bucket__9451 = bucket__9448.slice();
new_bucket__9451.splice(i__9449,2);
(new_hashobj__9450[h__9447] = new_bucket__9451);
}
return (new cljs.core.HashMap(this__9446.meta,(this__9446.count - 1),new_hashobj__9450,null));
}
});
cljs.core.HashMap;
cljs.core.HashMap.EMPTY = (new cljs.core.HashMap(null,0,{},0));
cljs.core.HashMap.fromArrays = (function (ks,vs){
var len__9453 = ks.length;
var i__9454 = 0;
var out__9455 = cljs.core.HashMap.EMPTY;
while(true){
if((i__9454 < len__9453))
{{
var G__9456 = (i__9454 + 1);
var G__9457 = cljs.core.assoc.call(null,out__9455,(ks[i__9454]),(vs[i__9454]));
i__9454 = G__9456;
out__9455 = G__9457;
continue;
}
} else
{return out__9455;
}
break;
}
});
cljs.core.array_map_index_of = (function array_map_index_of(m,k){
var arr__9461 = m.arr;
var len__9462 = arr__9461.length;
var i__9463 = 0;
while(true){
if((len__9462 <= i__9463))
{return -1;
} else
{if(cljs.core._EQ_.call(null,(arr__9461[i__9463]),k))
{return i__9463;
} else
{if("\uFDD0'else")
{{
var G__9464 = (i__9463 + 2);
i__9463 = G__9464;
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
cljs.core.PersistentArrayMap.cljs$lang$ctorPrSeq = (function (this__3002__auto__){
return cljs.core.list.call(null,"cljs.core/PersistentArrayMap");
});
cljs.core.PersistentArrayMap.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = (function (coll){
var this__9467 = this;
return (new cljs.core.TransientArrayMap({},this__9467.arr.length,this__9467.arr.slice()));
});
cljs.core.PersistentArrayMap.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__9468 = this;
var h__2885__auto____9469 = this__9468.__hash;
if(!((h__2885__auto____9469 == null)))
{return h__2885__auto____9469;
} else
{var h__2885__auto____9470 = cljs.core.hash_imap.call(null,coll);
this__9468.__hash = h__2885__auto____9470;
return h__2885__auto____9470;
}
});
cljs.core.PersistentArrayMap.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (coll,k){
var this__9471 = this;
return coll.cljs$core$ILookup$_lookup$arity$3(coll,k,null);
});
cljs.core.PersistentArrayMap.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (coll,k,not_found){
var this__9472 = this;
var idx__9473 = cljs.core.array_map_index_of.call(null,coll,k);
if((idx__9473 === -1))
{return not_found;
} else
{return (this__9472.arr[(idx__9473 + 1)]);
}
});
cljs.core.PersistentArrayMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (coll,k,v){
var this__9474 = this;
var idx__9475 = cljs.core.array_map_index_of.call(null,coll,k);
if((idx__9475 === -1))
{if((this__9474.cnt < cljs.core.PersistentArrayMap.HASHMAP_THRESHOLD))
{return (new cljs.core.PersistentArrayMap(this__9474.meta,(this__9474.cnt + 1),(function (){var G__9476__9477 = this__9474.arr.slice();
G__9476__9477.push(k);
G__9476__9477.push(v);
return G__9476__9477;
})(),null));
} else
{return cljs.core.persistent_BANG_.call(null,cljs.core.assoc_BANG_.call(null,cljs.core.transient$.call(null,cljs.core.into.call(null,cljs.core.PersistentHashMap.EMPTY,coll)),k,v));
}
} else
{if((v === (this__9474.arr[(idx__9475 + 1)])))
{return coll;
} else
{if("\uFDD0'else")
{return (new cljs.core.PersistentArrayMap(this__9474.meta,this__9474.cnt,(function (){var G__9478__9479 = this__9474.arr.slice();
(G__9478__9479[(idx__9475 + 1)] = v);
return G__9478__9479;
})(),null));
} else
{return null;
}
}
}
});
cljs.core.PersistentArrayMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (coll,k){
var this__9480 = this;
return !((cljs.core.array_map_index_of.call(null,coll,k) === -1));
});
cljs.core.PersistentArrayMap.prototype.call = (function() {
var G__9512 = null;
var G__9512__2 = (function (this_sym9481,k){
var this__9483 = this;
var this_sym9481__9484 = this;
var coll__9485 = this_sym9481__9484;
return coll__9485.cljs$core$ILookup$_lookup$arity$2(coll__9485,k);
});
var G__9512__3 = (function (this_sym9482,k,not_found){
var this__9483 = this;
var this_sym9482__9486 = this;
var coll__9487 = this_sym9482__9486;
return coll__9487.cljs$core$ILookup$_lookup$arity$3(coll__9487,k,not_found);
});
G__9512 = function(this_sym9482,k,not_found){
switch(arguments.length){
case 2:
return G__9512__2.call(this,this_sym9482,k);
case 3:
return G__9512__3.call(this,this_sym9482,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__9512;
})()
;
cljs.core.PersistentArrayMap.prototype.apply = (function (this_sym9465,args9466){
var this__9488 = this;
return this_sym9465.call.apply(this_sym9465,[this_sym9465].concat(args9466.slice()));
});
cljs.core.PersistentArrayMap.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (coll,f,init){
var this__9489 = this;
var len__9490 = this__9489.arr.length;
var i__9491 = 0;
var init__9492 = init;
while(true){
if((i__9491 < len__9490))
{var init__9493 = f.call(null,init__9492,(this__9489.arr[i__9491]),(this__9489.arr[(i__9491 + 1)]));
if(cljs.core.reduced_QMARK_.call(null,init__9493))
{return cljs.core.deref.call(null,init__9493);
} else
{{
var G__9513 = (i__9491 + 2);
var G__9514 = init__9493;
i__9491 = G__9513;
init__9492 = G__9514;
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
var this__9494 = this;
if(cljs.core.vector_QMARK_.call(null,entry))
{return coll.cljs$core$IAssociative$_assoc$arity$3(coll,cljs.core._nth.call(null,entry,0),cljs.core._nth.call(null,entry,1));
} else
{return cljs.core.reduce.call(null,cljs.core._conj,coll,entry);
}
});
cljs.core.PersistentArrayMap.prototype.toString = (function (){
var this__9495 = this;
var this__9496 = this;
return cljs.core.pr_str.call(null,this__9496);
});
cljs.core.PersistentArrayMap.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__9497 = this;
if((this__9497.cnt > 0))
{var len__9498 = this__9497.arr.length;
var array_map_seq__9499 = (function array_map_seq(i){
return (new cljs.core.LazySeq(null,false,(function (){
if((i < len__9498))
{return cljs.core.cons.call(null,cljs.core.PersistentVector.fromArray([(this__9497.arr[i]),(this__9497.arr[(i + 1)])], true),array_map_seq.call(null,(i + 2)));
} else
{return null;
}
}),null));
});
return array_map_seq__9499.call(null,0);
} else
{return null;
}
});
cljs.core.PersistentArrayMap.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__9500 = this;
return this__9500.cnt;
});
cljs.core.PersistentArrayMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__9501 = this;
return cljs.core.equiv_map.call(null,coll,other);
});
cljs.core.PersistentArrayMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__9502 = this;
return (new cljs.core.PersistentArrayMap(meta,this__9502.cnt,this__9502.arr,this__9502.__hash));
});
cljs.core.PersistentArrayMap.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__9503 = this;
return this__9503.meta;
});
cljs.core.PersistentArrayMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__9504 = this;
return cljs.core._with_meta.call(null,cljs.core.PersistentArrayMap.EMPTY,this__9504.meta);
});
cljs.core.PersistentArrayMap.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (coll,k){
var this__9505 = this;
var idx__9506 = cljs.core.array_map_index_of.call(null,coll,k);
if((idx__9506 >= 0))
{var len__9507 = this__9505.arr.length;
var new_len__9508 = (len__9507 - 2);
if((new_len__9508 === 0))
{return coll.cljs$core$IEmptyableCollection$_empty$arity$1(coll);
} else
{var new_arr__9509 = cljs.core.make_array.call(null,new_len__9508);
var s__9510 = 0;
var d__9511 = 0;
while(true){
if((s__9510 >= len__9507))
{return (new cljs.core.PersistentArrayMap(this__9505.meta,(this__9505.cnt - 1),new_arr__9509,null));
} else
{if(cljs.core._EQ_.call(null,k,(this__9505.arr[s__9510])))
{{
var G__9515 = (s__9510 + 2);
var G__9516 = d__9511;
s__9510 = G__9515;
d__9511 = G__9516;
continue;
}
} else
{if("\uFDD0'else")
{(new_arr__9509[d__9511] = (this__9505.arr[s__9510]));
(new_arr__9509[(d__9511 + 1)] = (this__9505.arr[(s__9510 + 1)]));
{
var G__9517 = (s__9510 + 2);
var G__9518 = (d__9511 + 2);
s__9510 = G__9517;
d__9511 = G__9518;
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
var len__9519 = cljs.core.count.call(null,ks);
var i__9520 = 0;
var out__9521 = cljs.core.transient$.call(null,cljs.core.PersistentArrayMap.EMPTY);
while(true){
if((i__9520 < len__9519))
{{
var G__9522 = (i__9520 + 1);
var G__9523 = cljs.core.assoc_BANG_.call(null,out__9521,(ks[i__9520]),(vs[i__9520]));
i__9520 = G__9522;
out__9521 = G__9523;
continue;
}
} else
{return cljs.core.persistent_BANG_.call(null,out__9521);
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
cljs.core.TransientArrayMap.cljs$lang$ctorPrSeq = (function (this__3002__auto__){
return cljs.core.list.call(null,"cljs.core/TransientArrayMap");
});
cljs.core.TransientArrayMap.prototype.cljs$core$ITransientMap$_dissoc_BANG_$arity$2 = (function (tcoll,key){
var this__9524 = this;
if(cljs.core.truth_(this__9524.editable_QMARK_))
{var idx__9525 = cljs.core.array_map_index_of.call(null,tcoll,key);
if((idx__9525 >= 0))
{(this__9524.arr[idx__9525] = (this__9524.arr[(this__9524.len - 2)]));
(this__9524.arr[(idx__9525 + 1)] = (this__9524.arr[(this__9524.len - 1)]));
var G__9526__9527 = this__9524.arr;
G__9526__9527.pop();
G__9526__9527.pop();
G__9526__9527;
this__9524.len = (this__9524.len - 2);
} else
{}
return tcoll;
} else
{throw (new Error("dissoc! after persistent!"));
}
});
cljs.core.TransientArrayMap.prototype.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3 = (function (tcoll,key,val){
var this__9528 = this;
if(cljs.core.truth_(this__9528.editable_QMARK_))
{var idx__9529 = cljs.core.array_map_index_of.call(null,tcoll,key);
if((idx__9529 === -1))
{if(((this__9528.len + 2) <= (2 * cljs.core.PersistentArrayMap.HASHMAP_THRESHOLD)))
{this__9528.len = (this__9528.len + 2);
this__9528.arr.push(key);
this__9528.arr.push(val);
return tcoll;
} else
{return cljs.core.assoc_BANG_.call(null,cljs.core.array__GT_transient_hash_map.call(null,this__9528.len,this__9528.arr),key,val);
}
} else
{if((val === (this__9528.arr[(idx__9529 + 1)])))
{return tcoll;
} else
{(this__9528.arr[(idx__9529 + 1)] = val);
return tcoll;
}
}
} else
{throw (new Error("assoc! after persistent!"));
}
});
cljs.core.TransientArrayMap.prototype.cljs$core$ITransientCollection$_conj_BANG_$arity$2 = (function (tcoll,o){
var this__9530 = this;
if(cljs.core.truth_(this__9530.editable_QMARK_))
{if((function (){var G__9531__9532 = o;
if(G__9531__9532)
{if((function (){var or__3824__auto____9533 = (G__9531__9532.cljs$lang$protocol_mask$partition0$ & 2048);
if(or__3824__auto____9533)
{return or__3824__auto____9533;
} else
{return G__9531__9532.cljs$core$IMapEntry$;
}
})())
{return true;
} else
{if((!G__9531__9532.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IMapEntry,G__9531__9532);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IMapEntry,G__9531__9532);
}
})())
{return tcoll.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3(tcoll,cljs.core.key.call(null,o),cljs.core.val.call(null,o));
} else
{var es__9534 = cljs.core.seq.call(null,o);
var tcoll__9535 = tcoll;
while(true){
var temp__3971__auto____9536 = cljs.core.first.call(null,es__9534);
if(cljs.core.truth_(temp__3971__auto____9536))
{var e__9537 = temp__3971__auto____9536;
{
var G__9543 = cljs.core.next.call(null,es__9534);
var G__9544 = tcoll__9535.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3(tcoll__9535,cljs.core.key.call(null,e__9537),cljs.core.val.call(null,e__9537));
es__9534 = G__9543;
tcoll__9535 = G__9544;
continue;
}
} else
{return tcoll__9535;
}
break;
}
}
} else
{throw (new Error("conj! after persistent!"));
}
});
cljs.core.TransientArrayMap.prototype.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 = (function (tcoll){
var this__9538 = this;
if(cljs.core.truth_(this__9538.editable_QMARK_))
{this__9538.editable_QMARK_ = false;
return (new cljs.core.PersistentArrayMap(null,cljs.core.quot.call(null,this__9538.len,2),this__9538.arr,null));
} else
{throw (new Error("persistent! called twice"));
}
});
cljs.core.TransientArrayMap.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (tcoll,k){
var this__9539 = this;
return tcoll.cljs$core$ILookup$_lookup$arity$3(tcoll,k,null);
});
cljs.core.TransientArrayMap.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (tcoll,k,not_found){
var this__9540 = this;
if(cljs.core.truth_(this__9540.editable_QMARK_))
{var idx__9541 = cljs.core.array_map_index_of.call(null,tcoll,k);
if((idx__9541 === -1))
{return not_found;
} else
{return (this__9540.arr[(idx__9541 + 1)]);
}
} else
{throw (new Error("lookup after persistent!"));
}
});
cljs.core.TransientArrayMap.prototype.cljs$core$ICounted$_count$arity$1 = (function (tcoll){
var this__9542 = this;
if(cljs.core.truth_(this__9542.editable_QMARK_))
{return cljs.core.quot.call(null,this__9542.len,2);
} else
{throw (new Error("count after persistent!"));
}
});
cljs.core.TransientArrayMap;
cljs.core.array__GT_transient_hash_map = (function array__GT_transient_hash_map(len,arr){
var out__9547 = cljs.core.transient$.call(null,cljs.core.ObjMap.EMPTY);
var i__9548 = 0;
while(true){
if((i__9548 < len))
{{
var G__9549 = cljs.core.assoc_BANG_.call(null,out__9547,(arr[i__9548]),(arr[(i__9548 + 1)]));
var G__9550 = (i__9548 + 2);
out__9547 = G__9549;
i__9548 = G__9550;
continue;
}
} else
{return out__9547;
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
cljs.core.Box.cljs$lang$ctorPrSeq = (function (this__3003__auto__){
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
var G__9555__9556 = arr.slice();
(G__9555__9556[i] = a);
return G__9555__9556;
});
var clone_and_set__5 = (function (arr,i,a,j,b){
var G__9557__9558 = arr.slice();
(G__9557__9558[i] = a);
(G__9557__9558[j] = b);
return G__9557__9558;
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
var new_arr__9560 = cljs.core.make_array.call(null,(arr.length - 2));
cljs.core.array_copy.call(null,arr,0,new_arr__9560,0,(2 * i));
cljs.core.array_copy.call(null,arr,(2 * (i + 1)),new_arr__9560,(2 * i),(new_arr__9560.length - (2 * i)));
return new_arr__9560;
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
var editable__9563 = inode.ensure_editable(edit);
(editable__9563.arr[i] = a);
return editable__9563;
});
var edit_and_set__6 = (function (inode,edit,i,a,j,b){
var editable__9564 = inode.ensure_editable(edit);
(editable__9564.arr[i] = a);
(editable__9564.arr[j] = b);
return editable__9564;
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
var len__9571 = arr.length;
var i__9572 = 0;
var init__9573 = init;
while(true){
if((i__9572 < len__9571))
{var init__9576 = (function (){var k__9574 = (arr[i__9572]);
if(!((k__9574 == null)))
{return f.call(null,init__9573,k__9574,(arr[(i__9572 + 1)]));
} else
{var node__9575 = (arr[(i__9572 + 1)]);
if(!((node__9575 == null)))
{return node__9575.kv_reduce(f,init__9573);
} else
{return init__9573;
}
}
})();
if(cljs.core.reduced_QMARK_.call(null,init__9576))
{return cljs.core.deref.call(null,init__9576);
} else
{{
var G__9577 = (i__9572 + 2);
var G__9578 = init__9576;
i__9572 = G__9577;
init__9573 = G__9578;
continue;
}
}
} else
{return init__9573;
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
cljs.core.BitmapIndexedNode.cljs$lang$ctorPrSeq = (function (this__3002__auto__){
return cljs.core.list.call(null,"cljs.core/BitmapIndexedNode");
});
cljs.core.BitmapIndexedNode.prototype.edit_and_remove_pair = (function (e,bit,i){
var this__9579 = this;
var inode__9580 = this;
if((this__9579.bitmap === bit))
{return null;
} else
{var editable__9581 = inode__9580.ensure_editable(e);
var earr__9582 = editable__9581.arr;
var len__9583 = earr__9582.length;
editable__9581.bitmap = (bit ^ editable__9581.bitmap);
cljs.core.array_copy.call(null,earr__9582,(2 * (i + 1)),earr__9582,(2 * i),(len__9583 - (2 * (i + 1))));
(earr__9582[(len__9583 - 2)] = null);
(earr__9582[(len__9583 - 1)] = null);
return editable__9581;
}
});
cljs.core.BitmapIndexedNode.prototype.inode_assoc_BANG_ = (function (edit,shift,hash,key,val,added_leaf_QMARK_){
var this__9584 = this;
var inode__9585 = this;
var bit__9586 = (1 << ((hash >>> shift) & 0x01f));
var idx__9587 = cljs.core.bitmap_indexed_node_index.call(null,this__9584.bitmap,bit__9586);
if(((this__9584.bitmap & bit__9586) === 0))
{var n__9588 = cljs.core.bit_count.call(null,this__9584.bitmap);
if(((2 * n__9588) < this__9584.arr.length))
{var editable__9589 = inode__9585.ensure_editable(edit);
var earr__9590 = editable__9589.arr;
added_leaf_QMARK_.val = true;
cljs.core.array_copy_downward.call(null,earr__9590,(2 * idx__9587),earr__9590,(2 * (idx__9587 + 1)),(2 * (n__9588 - idx__9587)));
(earr__9590[(2 * idx__9587)] = key);
(earr__9590[((2 * idx__9587) + 1)] = val);
editable__9589.bitmap = (editable__9589.bitmap | bit__9586);
return editable__9589;
} else
{if((n__9588 >= 16))
{var nodes__9591 = cljs.core.make_array.call(null,32);
var jdx__9592 = ((hash >>> shift) & 0x01f);
(nodes__9591[jdx__9592] = cljs.core.BitmapIndexedNode.EMPTY.inode_assoc_BANG_(edit,(shift + 5),hash,key,val,added_leaf_QMARK_));
var i__9593 = 0;
var j__9594 = 0;
while(true){
if((i__9593 < 32))
{if((((this__9584.bitmap >>> i__9593) & 1) === 0))
{{
var G__9647 = (i__9593 + 1);
var G__9648 = j__9594;
i__9593 = G__9647;
j__9594 = G__9648;
continue;
}
} else
{(nodes__9591[i__9593] = ((!(((this__9584.arr[j__9594]) == null)))?cljs.core.BitmapIndexedNode.EMPTY.inode_assoc_BANG_(edit,(shift + 5),cljs.core.hash.call(null,(this__9584.arr[j__9594])),(this__9584.arr[j__9594]),(this__9584.arr[(j__9594 + 1)]),added_leaf_QMARK_):(this__9584.arr[(j__9594 + 1)])));
{
var G__9649 = (i__9593 + 1);
var G__9650 = (j__9594 + 2);
i__9593 = G__9649;
j__9594 = G__9650;
continue;
}
}
} else
{}
break;
}
return (new cljs.core.ArrayNode(edit,(n__9588 + 1),nodes__9591));
} else
{if("\uFDD0'else")
{var new_arr__9595 = cljs.core.make_array.call(null,(2 * (n__9588 + 4)));
cljs.core.array_copy.call(null,this__9584.arr,0,new_arr__9595,0,(2 * idx__9587));
(new_arr__9595[(2 * idx__9587)] = key);
(new_arr__9595[((2 * idx__9587) + 1)] = val);
cljs.core.array_copy.call(null,this__9584.arr,(2 * idx__9587),new_arr__9595,(2 * (idx__9587 + 1)),(2 * (n__9588 - idx__9587)));
added_leaf_QMARK_.val = true;
var editable__9596 = inode__9585.ensure_editable(edit);
editable__9596.arr = new_arr__9595;
editable__9596.bitmap = (editable__9596.bitmap | bit__9586);
return editable__9596;
} else
{return null;
}
}
}
} else
{var key_or_nil__9597 = (this__9584.arr[(2 * idx__9587)]);
var val_or_node__9598 = (this__9584.arr[((2 * idx__9587) + 1)]);
if((key_or_nil__9597 == null))
{var n__9599 = val_or_node__9598.inode_assoc_BANG_(edit,(shift + 5),hash,key,val,added_leaf_QMARK_);
if((n__9599 === val_or_node__9598))
{return inode__9585;
} else
{return cljs.core.edit_and_set.call(null,inode__9585,edit,((2 * idx__9587) + 1),n__9599);
}
} else
{if(cljs.core.key_test.call(null,key,key_or_nil__9597))
{if((val === val_or_node__9598))
{return inode__9585;
} else
{return cljs.core.edit_and_set.call(null,inode__9585,edit,((2 * idx__9587) + 1),val);
}
} else
{if("\uFDD0'else")
{added_leaf_QMARK_.val = true;
return cljs.core.edit_and_set.call(null,inode__9585,edit,(2 * idx__9587),null,((2 * idx__9587) + 1),cljs.core.create_node.call(null,edit,(shift + 5),key_or_nil__9597,val_or_node__9598,hash,key,val));
} else
{return null;
}
}
}
}
});
cljs.core.BitmapIndexedNode.prototype.inode_seq = (function (){
var this__9600 = this;
var inode__9601 = this;
return cljs.core.create_inode_seq.call(null,this__9600.arr);
});
cljs.core.BitmapIndexedNode.prototype.inode_without_BANG_ = (function (edit,shift,hash,key,removed_leaf_QMARK_){
var this__9602 = this;
var inode__9603 = this;
var bit__9604 = (1 << ((hash >>> shift) & 0x01f));
if(((this__9602.bitmap & bit__9604) === 0))
{return inode__9603;
} else
{var idx__9605 = cljs.core.bitmap_indexed_node_index.call(null,this__9602.bitmap,bit__9604);
var key_or_nil__9606 = (this__9602.arr[(2 * idx__9605)]);
var val_or_node__9607 = (this__9602.arr[((2 * idx__9605) + 1)]);
if((key_or_nil__9606 == null))
{var n__9608 = val_or_node__9607.inode_without_BANG_(edit,(shift + 5),hash,key,removed_leaf_QMARK_);
if((n__9608 === val_or_node__9607))
{return inode__9603;
} else
{if(!((n__9608 == null)))
{return cljs.core.edit_and_set.call(null,inode__9603,edit,((2 * idx__9605) + 1),n__9608);
} else
{if((this__9602.bitmap === bit__9604))
{return null;
} else
{if("\uFDD0'else")
{return inode__9603.edit_and_remove_pair(edit,bit__9604,idx__9605);
} else
{return null;
}
}
}
}
} else
{if(cljs.core.key_test.call(null,key,key_or_nil__9606))
{(removed_leaf_QMARK_[0] = true);
return inode__9603.edit_and_remove_pair(edit,bit__9604,idx__9605);
} else
{if("\uFDD0'else")
{return inode__9603;
} else
{return null;
}
}
}
}
});
cljs.core.BitmapIndexedNode.prototype.ensure_editable = (function (e){
var this__9609 = this;
var inode__9610 = this;
if((e === this__9609.edit))
{return inode__9610;
} else
{var n__9611 = cljs.core.bit_count.call(null,this__9609.bitmap);
var new_arr__9612 = cljs.core.make_array.call(null,(((n__9611 < 0))?4:(2 * (n__9611 + 1))));
cljs.core.array_copy.call(null,this__9609.arr,0,new_arr__9612,0,(2 * n__9611));
return (new cljs.core.BitmapIndexedNode(e,this__9609.bitmap,new_arr__9612));
}
});
cljs.core.BitmapIndexedNode.prototype.kv_reduce = (function (f,init){
var this__9613 = this;
var inode__9614 = this;
return cljs.core.inode_kv_reduce.call(null,this__9613.arr,f,init);
});
cljs.core.BitmapIndexedNode.prototype.inode_find = (function (shift,hash,key,not_found){
var this__9615 = this;
var inode__9616 = this;
var bit__9617 = (1 << ((hash >>> shift) & 0x01f));
if(((this__9615.bitmap & bit__9617) === 0))
{return not_found;
} else
{var idx__9618 = cljs.core.bitmap_indexed_node_index.call(null,this__9615.bitmap,bit__9617);
var key_or_nil__9619 = (this__9615.arr[(2 * idx__9618)]);
var val_or_node__9620 = (this__9615.arr[((2 * idx__9618) + 1)]);
if((key_or_nil__9619 == null))
{return val_or_node__9620.inode_find((shift + 5),hash,key,not_found);
} else
{if(cljs.core.key_test.call(null,key,key_or_nil__9619))
{return cljs.core.PersistentVector.fromArray([key_or_nil__9619,val_or_node__9620], true);
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
var this__9621 = this;
var inode__9622 = this;
var bit__9623 = (1 << ((hash >>> shift) & 0x01f));
if(((this__9621.bitmap & bit__9623) === 0))
{return inode__9622;
} else
{var idx__9624 = cljs.core.bitmap_indexed_node_index.call(null,this__9621.bitmap,bit__9623);
var key_or_nil__9625 = (this__9621.arr[(2 * idx__9624)]);
var val_or_node__9626 = (this__9621.arr[((2 * idx__9624) + 1)]);
if((key_or_nil__9625 == null))
{var n__9627 = val_or_node__9626.inode_without((shift + 5),hash,key);
if((n__9627 === val_or_node__9626))
{return inode__9622;
} else
{if(!((n__9627 == null)))
{return (new cljs.core.BitmapIndexedNode(null,this__9621.bitmap,cljs.core.clone_and_set.call(null,this__9621.arr,((2 * idx__9624) + 1),n__9627)));
} else
{if((this__9621.bitmap === bit__9623))
{return null;
} else
{if("\uFDD0'else")
{return (new cljs.core.BitmapIndexedNode(null,(this__9621.bitmap ^ bit__9623),cljs.core.remove_pair.call(null,this__9621.arr,idx__9624)));
} else
{return null;
}
}
}
}
} else
{if(cljs.core.key_test.call(null,key,key_or_nil__9625))
{return (new cljs.core.BitmapIndexedNode(null,(this__9621.bitmap ^ bit__9623),cljs.core.remove_pair.call(null,this__9621.arr,idx__9624)));
} else
{if("\uFDD0'else")
{return inode__9622;
} else
{return null;
}
}
}
}
});
cljs.core.BitmapIndexedNode.prototype.inode_assoc = (function (shift,hash,key,val,added_leaf_QMARK_){
var this__9628 = this;
var inode__9629 = this;
var bit__9630 = (1 << ((hash >>> shift) & 0x01f));
var idx__9631 = cljs.core.bitmap_indexed_node_index.call(null,this__9628.bitmap,bit__9630);
if(((this__9628.bitmap & bit__9630) === 0))
{var n__9632 = cljs.core.bit_count.call(null,this__9628.bitmap);
if((n__9632 >= 16))
{var nodes__9633 = cljs.core.make_array.call(null,32);
var jdx__9634 = ((hash >>> shift) & 0x01f);
(nodes__9633[jdx__9634] = cljs.core.BitmapIndexedNode.EMPTY.inode_assoc((shift + 5),hash,key,val,added_leaf_QMARK_));
var i__9635 = 0;
var j__9636 = 0;
while(true){
if((i__9635 < 32))
{if((((this__9628.bitmap >>> i__9635) & 1) === 0))
{{
var G__9651 = (i__9635 + 1);
var G__9652 = j__9636;
i__9635 = G__9651;
j__9636 = G__9652;
continue;
}
} else
{(nodes__9633[i__9635] = ((!(((this__9628.arr[j__9636]) == null)))?cljs.core.BitmapIndexedNode.EMPTY.inode_assoc((shift + 5),cljs.core.hash.call(null,(this__9628.arr[j__9636])),(this__9628.arr[j__9636]),(this__9628.arr[(j__9636 + 1)]),added_leaf_QMARK_):(this__9628.arr[(j__9636 + 1)])));
{
var G__9653 = (i__9635 + 1);
var G__9654 = (j__9636 + 2);
i__9635 = G__9653;
j__9636 = G__9654;
continue;
}
}
} else
{}
break;
}
return (new cljs.core.ArrayNode(null,(n__9632 + 1),nodes__9633));
} else
{var new_arr__9637 = cljs.core.make_array.call(null,(2 * (n__9632 + 1)));
cljs.core.array_copy.call(null,this__9628.arr,0,new_arr__9637,0,(2 * idx__9631));
(new_arr__9637[(2 * idx__9631)] = key);
(new_arr__9637[((2 * idx__9631) + 1)] = val);
cljs.core.array_copy.call(null,this__9628.arr,(2 * idx__9631),new_arr__9637,(2 * (idx__9631 + 1)),(2 * (n__9632 - idx__9631)));
added_leaf_QMARK_.val = true;
return (new cljs.core.BitmapIndexedNode(null,(this__9628.bitmap | bit__9630),new_arr__9637));
}
} else
{var key_or_nil__9638 = (this__9628.arr[(2 * idx__9631)]);
var val_or_node__9639 = (this__9628.arr[((2 * idx__9631) + 1)]);
if((key_or_nil__9638 == null))
{var n__9640 = val_or_node__9639.inode_assoc((shift + 5),hash,key,val,added_leaf_QMARK_);
if((n__9640 === val_or_node__9639))
{return inode__9629;
} else
{return (new cljs.core.BitmapIndexedNode(null,this__9628.bitmap,cljs.core.clone_and_set.call(null,this__9628.arr,((2 * idx__9631) + 1),n__9640)));
}
} else
{if(cljs.core.key_test.call(null,key,key_or_nil__9638))
{if((val === val_or_node__9639))
{return inode__9629;
} else
{return (new cljs.core.BitmapIndexedNode(null,this__9628.bitmap,cljs.core.clone_and_set.call(null,this__9628.arr,((2 * idx__9631) + 1),val)));
}
} else
{if("\uFDD0'else")
{added_leaf_QMARK_.val = true;
return (new cljs.core.BitmapIndexedNode(null,this__9628.bitmap,cljs.core.clone_and_set.call(null,this__9628.arr,(2 * idx__9631),null,((2 * idx__9631) + 1),cljs.core.create_node.call(null,(shift + 5),key_or_nil__9638,val_or_node__9639,hash,key,val))));
} else
{return null;
}
}
}
}
});
cljs.core.BitmapIndexedNode.prototype.inode_lookup = (function (shift,hash,key,not_found){
var this__9641 = this;
var inode__9642 = this;
var bit__9643 = (1 << ((hash >>> shift) & 0x01f));
if(((this__9641.bitmap & bit__9643) === 0))
{return not_found;
} else
{var idx__9644 = cljs.core.bitmap_indexed_node_index.call(null,this__9641.bitmap,bit__9643);
var key_or_nil__9645 = (this__9641.arr[(2 * idx__9644)]);
var val_or_node__9646 = (this__9641.arr[((2 * idx__9644) + 1)]);
if((key_or_nil__9645 == null))
{return val_or_node__9646.inode_lookup((shift + 5),hash,key,not_found);
} else
{if(cljs.core.key_test.call(null,key,key_or_nil__9645))
{return val_or_node__9646;
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
var arr__9662 = array_node.arr;
var len__9663 = (2 * (array_node.cnt - 1));
var new_arr__9664 = cljs.core.make_array.call(null,len__9663);
var i__9665 = 0;
var j__9666 = 1;
var bitmap__9667 = 0;
while(true){
if((i__9665 < len__9663))
{if((function (){var and__3822__auto____9668 = !((i__9665 === idx));
if(and__3822__auto____9668)
{return !(((arr__9662[i__9665]) == null));
} else
{return and__3822__auto____9668;
}
})())
{(new_arr__9664[j__9666] = (arr__9662[i__9665]));
{
var G__9669 = (i__9665 + 1);
var G__9670 = (j__9666 + 2);
var G__9671 = (bitmap__9667 | (1 << i__9665));
i__9665 = G__9669;
j__9666 = G__9670;
bitmap__9667 = G__9671;
continue;
}
} else
{{
var G__9672 = (i__9665 + 1);
var G__9673 = j__9666;
var G__9674 = bitmap__9667;
i__9665 = G__9672;
j__9666 = G__9673;
bitmap__9667 = G__9674;
continue;
}
}
} else
{return (new cljs.core.BitmapIndexedNode(edit,bitmap__9667,new_arr__9664));
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
cljs.core.ArrayNode.cljs$lang$ctorPrSeq = (function (this__3002__auto__){
return cljs.core.list.call(null,"cljs.core/ArrayNode");
});
cljs.core.ArrayNode.prototype.inode_assoc_BANG_ = (function (edit,shift,hash,key,val,added_leaf_QMARK_){
var this__9675 = this;
var inode__9676 = this;
var idx__9677 = ((hash >>> shift) & 0x01f);
var node__9678 = (this__9675.arr[idx__9677]);
if((node__9678 == null))
{var editable__9679 = cljs.core.edit_and_set.call(null,inode__9676,edit,idx__9677,cljs.core.BitmapIndexedNode.EMPTY.inode_assoc_BANG_(edit,(shift + 5),hash,key,val,added_leaf_QMARK_));
editable__9679.cnt = (editable__9679.cnt + 1);
return editable__9679;
} else
{var n__9680 = node__9678.inode_assoc_BANG_(edit,(shift + 5),hash,key,val,added_leaf_QMARK_);
if((n__9680 === node__9678))
{return inode__9676;
} else
{return cljs.core.edit_and_set.call(null,inode__9676,edit,idx__9677,n__9680);
}
}
});
cljs.core.ArrayNode.prototype.inode_seq = (function (){
var this__9681 = this;
var inode__9682 = this;
return cljs.core.create_array_node_seq.call(null,this__9681.arr);
});
cljs.core.ArrayNode.prototype.inode_without_BANG_ = (function (edit,shift,hash,key,removed_leaf_QMARK_){
var this__9683 = this;
var inode__9684 = this;
var idx__9685 = ((hash >>> shift) & 0x01f);
var node__9686 = (this__9683.arr[idx__9685]);
if((node__9686 == null))
{return inode__9684;
} else
{var n__9687 = node__9686.inode_without_BANG_(edit,(shift + 5),hash,key,removed_leaf_QMARK_);
if((n__9687 === node__9686))
{return inode__9684;
} else
{if((n__9687 == null))
{if((this__9683.cnt <= 8))
{return cljs.core.pack_array_node.call(null,inode__9684,edit,idx__9685);
} else
{var editable__9688 = cljs.core.edit_and_set.call(null,inode__9684,edit,idx__9685,n__9687);
editable__9688.cnt = (editable__9688.cnt - 1);
return editable__9688;
}
} else
{if("\uFDD0'else")
{return cljs.core.edit_and_set.call(null,inode__9684,edit,idx__9685,n__9687);
} else
{return null;
}
}
}
}
});
cljs.core.ArrayNode.prototype.ensure_editable = (function (e){
var this__9689 = this;
var inode__9690 = this;
if((e === this__9689.edit))
{return inode__9690;
} else
{return (new cljs.core.ArrayNode(e,this__9689.cnt,this__9689.arr.slice()));
}
});
cljs.core.ArrayNode.prototype.kv_reduce = (function (f,init){
var this__9691 = this;
var inode__9692 = this;
var len__9693 = this__9691.arr.length;
var i__9694 = 0;
var init__9695 = init;
while(true){
if((i__9694 < len__9693))
{var node__9696 = (this__9691.arr[i__9694]);
if(!((node__9696 == null)))
{var init__9697 = node__9696.kv_reduce(f,init__9695);
if(cljs.core.reduced_QMARK_.call(null,init__9697))
{return cljs.core.deref.call(null,init__9697);
} else
{{
var G__9716 = (i__9694 + 1);
var G__9717 = init__9697;
i__9694 = G__9716;
init__9695 = G__9717;
continue;
}
}
} else
{return null;
}
} else
{return init__9695;
}
break;
}
});
cljs.core.ArrayNode.prototype.inode_find = (function (shift,hash,key,not_found){
var this__9698 = this;
var inode__9699 = this;
var idx__9700 = ((hash >>> shift) & 0x01f);
var node__9701 = (this__9698.arr[idx__9700]);
if(!((node__9701 == null)))
{return node__9701.inode_find((shift + 5),hash,key,not_found);
} else
{return not_found;
}
});
cljs.core.ArrayNode.prototype.inode_without = (function (shift,hash,key){
var this__9702 = this;
var inode__9703 = this;
var idx__9704 = ((hash >>> shift) & 0x01f);
var node__9705 = (this__9702.arr[idx__9704]);
if(!((node__9705 == null)))
{var n__9706 = node__9705.inode_without((shift + 5),hash,key);
if((n__9706 === node__9705))
{return inode__9703;
} else
{if((n__9706 == null))
{if((this__9702.cnt <= 8))
{return cljs.core.pack_array_node.call(null,inode__9703,null,idx__9704);
} else
{return (new cljs.core.ArrayNode(null,(this__9702.cnt - 1),cljs.core.clone_and_set.call(null,this__9702.arr,idx__9704,n__9706)));
}
} else
{if("\uFDD0'else")
{return (new cljs.core.ArrayNode(null,this__9702.cnt,cljs.core.clone_and_set.call(null,this__9702.arr,idx__9704,n__9706)));
} else
{return null;
}
}
}
} else
{return inode__9703;
}
});
cljs.core.ArrayNode.prototype.inode_assoc = (function (shift,hash,key,val,added_leaf_QMARK_){
var this__9707 = this;
var inode__9708 = this;
var idx__9709 = ((hash >>> shift) & 0x01f);
var node__9710 = (this__9707.arr[idx__9709]);
if((node__9710 == null))
{return (new cljs.core.ArrayNode(null,(this__9707.cnt + 1),cljs.core.clone_and_set.call(null,this__9707.arr,idx__9709,cljs.core.BitmapIndexedNode.EMPTY.inode_assoc((shift + 5),hash,key,val,added_leaf_QMARK_))));
} else
{var n__9711 = node__9710.inode_assoc((shift + 5),hash,key,val,added_leaf_QMARK_);
if((n__9711 === node__9710))
{return inode__9708;
} else
{return (new cljs.core.ArrayNode(null,this__9707.cnt,cljs.core.clone_and_set.call(null,this__9707.arr,idx__9709,n__9711)));
}
}
});
cljs.core.ArrayNode.prototype.inode_lookup = (function (shift,hash,key,not_found){
var this__9712 = this;
var inode__9713 = this;
var idx__9714 = ((hash >>> shift) & 0x01f);
var node__9715 = (this__9712.arr[idx__9714]);
if(!((node__9715 == null)))
{return node__9715.inode_lookup((shift + 5),hash,key,not_found);
} else
{return not_found;
}
});
cljs.core.ArrayNode;
cljs.core.hash_collision_node_find_index = (function hash_collision_node_find_index(arr,cnt,key){
var lim__9720 = (2 * cnt);
var i__9721 = 0;
while(true){
if((i__9721 < lim__9720))
{if(cljs.core.key_test.call(null,key,(arr[i__9721])))
{return i__9721;
} else
{{
var G__9722 = (i__9721 + 2);
i__9721 = G__9722;
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
cljs.core.HashCollisionNode.cljs$lang$ctorPrSeq = (function (this__3002__auto__){
return cljs.core.list.call(null,"cljs.core/HashCollisionNode");
});
cljs.core.HashCollisionNode.prototype.inode_assoc_BANG_ = (function (edit,shift,hash,key,val,added_leaf_QMARK_){
var this__9723 = this;
var inode__9724 = this;
if((hash === this__9723.collision_hash))
{var idx__9725 = cljs.core.hash_collision_node_find_index.call(null,this__9723.arr,this__9723.cnt,key);
if((idx__9725 === -1))
{if((this__9723.arr.length > (2 * this__9723.cnt)))
{var editable__9726 = cljs.core.edit_and_set.call(null,inode__9724,edit,(2 * this__9723.cnt),key,((2 * this__9723.cnt) + 1),val);
added_leaf_QMARK_.val = true;
editable__9726.cnt = (editable__9726.cnt + 1);
return editable__9726;
} else
{var len__9727 = this__9723.arr.length;
var new_arr__9728 = cljs.core.make_array.call(null,(len__9727 + 2));
cljs.core.array_copy.call(null,this__9723.arr,0,new_arr__9728,0,len__9727);
(new_arr__9728[len__9727] = key);
(new_arr__9728[(len__9727 + 1)] = val);
added_leaf_QMARK_.val = true;
return inode__9724.ensure_editable_array(edit,(this__9723.cnt + 1),new_arr__9728);
}
} else
{if(((this__9723.arr[(idx__9725 + 1)]) === val))
{return inode__9724;
} else
{return cljs.core.edit_and_set.call(null,inode__9724,edit,(idx__9725 + 1),val);
}
}
} else
{return (new cljs.core.BitmapIndexedNode(edit,(1 << ((this__9723.collision_hash >>> shift) & 0x01f)),[null,inode__9724,null,null])).inode_assoc_BANG_(edit,shift,hash,key,val,added_leaf_QMARK_);
}
});
cljs.core.HashCollisionNode.prototype.inode_seq = (function (){
var this__9729 = this;
var inode__9730 = this;
return cljs.core.create_inode_seq.call(null,this__9729.arr);
});
cljs.core.HashCollisionNode.prototype.inode_without_BANG_ = (function (edit,shift,hash,key,removed_leaf_QMARK_){
var this__9731 = this;
var inode__9732 = this;
var idx__9733 = cljs.core.hash_collision_node_find_index.call(null,this__9731.arr,this__9731.cnt,key);
if((idx__9733 === -1))
{return inode__9732;
} else
{(removed_leaf_QMARK_[0] = true);
if((this__9731.cnt === 1))
{return null;
} else
{var editable__9734 = inode__9732.ensure_editable(edit);
var earr__9735 = editable__9734.arr;
(earr__9735[idx__9733] = (earr__9735[((2 * this__9731.cnt) - 2)]));
(earr__9735[(idx__9733 + 1)] = (earr__9735[((2 * this__9731.cnt) - 1)]));
(earr__9735[((2 * this__9731.cnt) - 1)] = null);
(earr__9735[((2 * this__9731.cnt) - 2)] = null);
editable__9734.cnt = (editable__9734.cnt - 1);
return editable__9734;
}
}
});
cljs.core.HashCollisionNode.prototype.ensure_editable = (function (e){
var this__9736 = this;
var inode__9737 = this;
if((e === this__9736.edit))
{return inode__9737;
} else
{var new_arr__9738 = cljs.core.make_array.call(null,(2 * (this__9736.cnt + 1)));
cljs.core.array_copy.call(null,this__9736.arr,0,new_arr__9738,0,(2 * this__9736.cnt));
return (new cljs.core.HashCollisionNode(e,this__9736.collision_hash,this__9736.cnt,new_arr__9738));
}
});
cljs.core.HashCollisionNode.prototype.kv_reduce = (function (f,init){
var this__9739 = this;
var inode__9740 = this;
return cljs.core.inode_kv_reduce.call(null,this__9739.arr,f,init);
});
cljs.core.HashCollisionNode.prototype.inode_find = (function (shift,hash,key,not_found){
var this__9741 = this;
var inode__9742 = this;
var idx__9743 = cljs.core.hash_collision_node_find_index.call(null,this__9741.arr,this__9741.cnt,key);
if((idx__9743 < 0))
{return not_found;
} else
{if(cljs.core.key_test.call(null,key,(this__9741.arr[idx__9743])))
{return cljs.core.PersistentVector.fromArray([(this__9741.arr[idx__9743]),(this__9741.arr[(idx__9743 + 1)])], true);
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
var this__9744 = this;
var inode__9745 = this;
var idx__9746 = cljs.core.hash_collision_node_find_index.call(null,this__9744.arr,this__9744.cnt,key);
if((idx__9746 === -1))
{return inode__9745;
} else
{if((this__9744.cnt === 1))
{return null;
} else
{if("\uFDD0'else")
{return (new cljs.core.HashCollisionNode(null,this__9744.collision_hash,(this__9744.cnt - 1),cljs.core.remove_pair.call(null,this__9744.arr,cljs.core.quot.call(null,idx__9746,2))));
} else
{return null;
}
}
}
});
cljs.core.HashCollisionNode.prototype.inode_assoc = (function (shift,hash,key,val,added_leaf_QMARK_){
var this__9747 = this;
var inode__9748 = this;
if((hash === this__9747.collision_hash))
{var idx__9749 = cljs.core.hash_collision_node_find_index.call(null,this__9747.arr,this__9747.cnt,key);
if((idx__9749 === -1))
{var len__9750 = this__9747.arr.length;
var new_arr__9751 = cljs.core.make_array.call(null,(len__9750 + 2));
cljs.core.array_copy.call(null,this__9747.arr,0,new_arr__9751,0,len__9750);
(new_arr__9751[len__9750] = key);
(new_arr__9751[(len__9750 + 1)] = val);
added_leaf_QMARK_.val = true;
return (new cljs.core.HashCollisionNode(null,this__9747.collision_hash,(this__9747.cnt + 1),new_arr__9751));
} else
{if(cljs.core._EQ_.call(null,(this__9747.arr[idx__9749]),val))
{return inode__9748;
} else
{return (new cljs.core.HashCollisionNode(null,this__9747.collision_hash,this__9747.cnt,cljs.core.clone_and_set.call(null,this__9747.arr,(idx__9749 + 1),val)));
}
}
} else
{return (new cljs.core.BitmapIndexedNode(null,(1 << ((this__9747.collision_hash >>> shift) & 0x01f)),[null,inode__9748])).inode_assoc(shift,hash,key,val,added_leaf_QMARK_);
}
});
cljs.core.HashCollisionNode.prototype.inode_lookup = (function (shift,hash,key,not_found){
var this__9752 = this;
var inode__9753 = this;
var idx__9754 = cljs.core.hash_collision_node_find_index.call(null,this__9752.arr,this__9752.cnt,key);
if((idx__9754 < 0))
{return not_found;
} else
{if(cljs.core.key_test.call(null,key,(this__9752.arr[idx__9754])))
{return (this__9752.arr[(idx__9754 + 1)]);
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
var this__9755 = this;
var inode__9756 = this;
if((e === this__9755.edit))
{this__9755.arr = array;
this__9755.cnt = count;
return inode__9756;
} else
{return (new cljs.core.HashCollisionNode(this__9755.edit,this__9755.collision_hash,count,array));
}
});
cljs.core.HashCollisionNode;
cljs.core.create_node = (function() {
var create_node = null;
var create_node__6 = (function (shift,key1,val1,key2hash,key2,val2){
var key1hash__9761 = cljs.core.hash.call(null,key1);
if((key1hash__9761 === key2hash))
{return (new cljs.core.HashCollisionNode(null,key1hash__9761,2,[key1,val1,key2,val2]));
} else
{var added_leaf_QMARK___9762 = (new cljs.core.Box(false));
return cljs.core.BitmapIndexedNode.EMPTY.inode_assoc(shift,key1hash__9761,key1,val1,added_leaf_QMARK___9762).inode_assoc(shift,key2hash,key2,val2,added_leaf_QMARK___9762);
}
});
var create_node__7 = (function (edit,shift,key1,val1,key2hash,key2,val2){
var key1hash__9763 = cljs.core.hash.call(null,key1);
if((key1hash__9763 === key2hash))
{return (new cljs.core.HashCollisionNode(null,key1hash__9763,2,[key1,val1,key2,val2]));
} else
{var added_leaf_QMARK___9764 = (new cljs.core.Box(false));
return cljs.core.BitmapIndexedNode.EMPTY.inode_assoc_BANG_(edit,shift,key1hash__9763,key1,val1,added_leaf_QMARK___9764).inode_assoc_BANG_(edit,shift,key2hash,key2,val2,added_leaf_QMARK___9764);
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
cljs.core.NodeSeq.cljs$lang$ctorPrSeq = (function (this__3002__auto__){
return cljs.core.list.call(null,"cljs.core/NodeSeq");
});
cljs.core.NodeSeq.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__9765 = this;
var h__2885__auto____9766 = this__9765.__hash;
if(!((h__2885__auto____9766 == null)))
{return h__2885__auto____9766;
} else
{var h__2885__auto____9767 = cljs.core.hash_coll.call(null,coll);
this__9765.__hash = h__2885__auto____9767;
return h__2885__auto____9767;
}
});
cljs.core.NodeSeq.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__9768 = this;
return cljs.core.cons.call(null,o,coll);
});
cljs.core.NodeSeq.prototype.toString = (function (){
var this__9769 = this;
var this__9770 = this;
return cljs.core.pr_str.call(null,this__9770);
});
cljs.core.NodeSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this$){
var this__9771 = this;
return this$;
});
cljs.core.NodeSeq.prototype.cljs$core$ISeq$_first$arity$1 = (function (coll){
var this__9772 = this;
if((this__9772.s == null))
{return cljs.core.PersistentVector.fromArray([(this__9772.nodes[this__9772.i]),(this__9772.nodes[(this__9772.i + 1)])], true);
} else
{return cljs.core.first.call(null,this__9772.s);
}
});
cljs.core.NodeSeq.prototype.cljs$core$ISeq$_rest$arity$1 = (function (coll){
var this__9773 = this;
if((this__9773.s == null))
{return cljs.core.create_inode_seq.call(null,this__9773.nodes,(this__9773.i + 2),null);
} else
{return cljs.core.create_inode_seq.call(null,this__9773.nodes,this__9773.i,cljs.core.next.call(null,this__9773.s));
}
});
cljs.core.NodeSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__9774 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.NodeSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__9775 = this;
return (new cljs.core.NodeSeq(meta,this__9775.nodes,this__9775.i,this__9775.s,this__9775.__hash));
});
cljs.core.NodeSeq.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__9776 = this;
return this__9776.meta;
});
cljs.core.NodeSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__9777 = this;
return cljs.core.with_meta.call(null,cljs.core.List.EMPTY,this__9777.meta);
});
cljs.core.NodeSeq;
cljs.core.create_inode_seq = (function() {
var create_inode_seq = null;
var create_inode_seq__1 = (function (nodes){
return create_inode_seq.call(null,nodes,0,null);
});
var create_inode_seq__3 = (function (nodes,i,s){
if((s == null))
{var len__9784 = nodes.length;
var j__9785 = i;
while(true){
if((j__9785 < len__9784))
{if(!(((nodes[j__9785]) == null)))
{return (new cljs.core.NodeSeq(null,nodes,j__9785,null,null));
} else
{var temp__3971__auto____9786 = (nodes[(j__9785 + 1)]);
if(cljs.core.truth_(temp__3971__auto____9786))
{var node__9787 = temp__3971__auto____9786;
var temp__3971__auto____9788 = node__9787.inode_seq();
if(cljs.core.truth_(temp__3971__auto____9788))
{var node_seq__9789 = temp__3971__auto____9788;
return (new cljs.core.NodeSeq(null,nodes,(j__9785 + 2),node_seq__9789,null));
} else
{{
var G__9790 = (j__9785 + 2);
j__9785 = G__9790;
continue;
}
}
} else
{{
var G__9791 = (j__9785 + 2);
j__9785 = G__9791;
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
cljs.core.ArrayNodeSeq.cljs$lang$ctorPrSeq = (function (this__3002__auto__){
return cljs.core.list.call(null,"cljs.core/ArrayNodeSeq");
});
cljs.core.ArrayNodeSeq.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__9792 = this;
var h__2885__auto____9793 = this__9792.__hash;
if(!((h__2885__auto____9793 == null)))
{return h__2885__auto____9793;
} else
{var h__2885__auto____9794 = cljs.core.hash_coll.call(null,coll);
this__9792.__hash = h__2885__auto____9794;
return h__2885__auto____9794;
}
});
cljs.core.ArrayNodeSeq.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__9795 = this;
return cljs.core.cons.call(null,o,coll);
});
cljs.core.ArrayNodeSeq.prototype.toString = (function (){
var this__9796 = this;
var this__9797 = this;
return cljs.core.pr_str.call(null,this__9797);
});
cljs.core.ArrayNodeSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this$){
var this__9798 = this;
return this$;
});
cljs.core.ArrayNodeSeq.prototype.cljs$core$ISeq$_first$arity$1 = (function (coll){
var this__9799 = this;
return cljs.core.first.call(null,this__9799.s);
});
cljs.core.ArrayNodeSeq.prototype.cljs$core$ISeq$_rest$arity$1 = (function (coll){
var this__9800 = this;
return cljs.core.create_array_node_seq.call(null,null,this__9800.nodes,this__9800.i,cljs.core.next.call(null,this__9800.s));
});
cljs.core.ArrayNodeSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__9801 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.ArrayNodeSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__9802 = this;
return (new cljs.core.ArrayNodeSeq(meta,this__9802.nodes,this__9802.i,this__9802.s,this__9802.__hash));
});
cljs.core.ArrayNodeSeq.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__9803 = this;
return this__9803.meta;
});
cljs.core.ArrayNodeSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__9804 = this;
return cljs.core.with_meta.call(null,cljs.core.List.EMPTY,this__9804.meta);
});
cljs.core.ArrayNodeSeq;
cljs.core.create_array_node_seq = (function() {
var create_array_node_seq = null;
var create_array_node_seq__1 = (function (nodes){
return create_array_node_seq.call(null,null,nodes,0,null);
});
var create_array_node_seq__4 = (function (meta,nodes,i,s){
if((s == null))
{var len__9811 = nodes.length;
var j__9812 = i;
while(true){
if((j__9812 < len__9811))
{var temp__3971__auto____9813 = (nodes[j__9812]);
if(cljs.core.truth_(temp__3971__auto____9813))
{var nj__9814 = temp__3971__auto____9813;
var temp__3971__auto____9815 = nj__9814.inode_seq();
if(cljs.core.truth_(temp__3971__auto____9815))
{var ns__9816 = temp__3971__auto____9815;
return (new cljs.core.ArrayNodeSeq(meta,nodes,(j__9812 + 1),ns__9816,null));
} else
{{
var G__9817 = (j__9812 + 1);
j__9812 = G__9817;
continue;
}
}
} else
{{
var G__9818 = (j__9812 + 1);
j__9812 = G__9818;
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
cljs.core.PersistentHashMap.cljs$lang$ctorPrSeq = (function (this__3002__auto__){
return cljs.core.list.call(null,"cljs.core/PersistentHashMap");
});
cljs.core.PersistentHashMap.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = (function (coll){
var this__9821 = this;
return (new cljs.core.TransientHashMap({},this__9821.root,this__9821.cnt,this__9821.has_nil_QMARK_,this__9821.nil_val));
});
cljs.core.PersistentHashMap.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__9822 = this;
var h__2885__auto____9823 = this__9822.__hash;
if(!((h__2885__auto____9823 == null)))
{return h__2885__auto____9823;
} else
{var h__2885__auto____9824 = cljs.core.hash_imap.call(null,coll);
this__9822.__hash = h__2885__auto____9824;
return h__2885__auto____9824;
}
});
cljs.core.PersistentHashMap.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (coll,k){
var this__9825 = this;
return coll.cljs$core$ILookup$_lookup$arity$3(coll,k,null);
});
cljs.core.PersistentHashMap.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (coll,k,not_found){
var this__9826 = this;
if((k == null))
{if(this__9826.has_nil_QMARK_)
{return this__9826.nil_val;
} else
{return not_found;
}
} else
{if((this__9826.root == null))
{return not_found;
} else
{if("\uFDD0'else")
{return this__9826.root.inode_lookup(0,cljs.core.hash.call(null,k),k,not_found);
} else
{return null;
}
}
}
});
cljs.core.PersistentHashMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (coll,k,v){
var this__9827 = this;
if((k == null))
{if((function (){var and__3822__auto____9828 = this__9827.has_nil_QMARK_;
if(and__3822__auto____9828)
{return (v === this__9827.nil_val);
} else
{return and__3822__auto____9828;
}
})())
{return coll;
} else
{return (new cljs.core.PersistentHashMap(this__9827.meta,((this__9827.has_nil_QMARK_)?this__9827.cnt:(this__9827.cnt + 1)),this__9827.root,true,v,null));
}
} else
{var added_leaf_QMARK___9829 = (new cljs.core.Box(false));
var new_root__9830 = (((this__9827.root == null))?cljs.core.BitmapIndexedNode.EMPTY:this__9827.root).inode_assoc(0,cljs.core.hash.call(null,k),k,v,added_leaf_QMARK___9829);
if((new_root__9830 === this__9827.root))
{return coll;
} else
{return (new cljs.core.PersistentHashMap(this__9827.meta,((added_leaf_QMARK___9829.val)?(this__9827.cnt + 1):this__9827.cnt),new_root__9830,this__9827.has_nil_QMARK_,this__9827.nil_val,null));
}
}
});
cljs.core.PersistentHashMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (coll,k){
var this__9831 = this;
if((k == null))
{return this__9831.has_nil_QMARK_;
} else
{if((this__9831.root == null))
{return false;
} else
{if("\uFDD0'else")
{return !((this__9831.root.inode_lookup(0,cljs.core.hash.call(null,k),k,cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel));
} else
{return null;
}
}
}
});
cljs.core.PersistentHashMap.prototype.call = (function() {
var G__9854 = null;
var G__9854__2 = (function (this_sym9832,k){
var this__9834 = this;
var this_sym9832__9835 = this;
var coll__9836 = this_sym9832__9835;
return coll__9836.cljs$core$ILookup$_lookup$arity$2(coll__9836,k);
});
var G__9854__3 = (function (this_sym9833,k,not_found){
var this__9834 = this;
var this_sym9833__9837 = this;
var coll__9838 = this_sym9833__9837;
return coll__9838.cljs$core$ILookup$_lookup$arity$3(coll__9838,k,not_found);
});
G__9854 = function(this_sym9833,k,not_found){
switch(arguments.length){
case 2:
return G__9854__2.call(this,this_sym9833,k);
case 3:
return G__9854__3.call(this,this_sym9833,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__9854;
})()
;
cljs.core.PersistentHashMap.prototype.apply = (function (this_sym9819,args9820){
var this__9839 = this;
return this_sym9819.call.apply(this_sym9819,[this_sym9819].concat(args9820.slice()));
});
cljs.core.PersistentHashMap.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (coll,f,init){
var this__9840 = this;
var init__9841 = ((this__9840.has_nil_QMARK_)?f.call(null,init,null,this__9840.nil_val):init);
if(cljs.core.reduced_QMARK_.call(null,init__9841))
{return cljs.core.deref.call(null,init__9841);
} else
{if(!((this__9840.root == null)))
{return this__9840.root.kv_reduce(f,init__9841);
} else
{if("\uFDD0'else")
{return init__9841;
} else
{return null;
}
}
}
});
cljs.core.PersistentHashMap.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,entry){
var this__9842 = this;
if(cljs.core.vector_QMARK_.call(null,entry))
{return coll.cljs$core$IAssociative$_assoc$arity$3(coll,cljs.core._nth.call(null,entry,0),cljs.core._nth.call(null,entry,1));
} else
{return cljs.core.reduce.call(null,cljs.core._conj,coll,entry);
}
});
cljs.core.PersistentHashMap.prototype.toString = (function (){
var this__9843 = this;
var this__9844 = this;
return cljs.core.pr_str.call(null,this__9844);
});
cljs.core.PersistentHashMap.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__9845 = this;
if((this__9845.cnt > 0))
{var s__9846 = ((!((this__9845.root == null)))?this__9845.root.inode_seq():null);
if(this__9845.has_nil_QMARK_)
{return cljs.core.cons.call(null,cljs.core.PersistentVector.fromArray([null,this__9845.nil_val], true),s__9846);
} else
{return s__9846;
}
} else
{return null;
}
});
cljs.core.PersistentHashMap.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__9847 = this;
return this__9847.cnt;
});
cljs.core.PersistentHashMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__9848 = this;
return cljs.core.equiv_map.call(null,coll,other);
});
cljs.core.PersistentHashMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__9849 = this;
return (new cljs.core.PersistentHashMap(meta,this__9849.cnt,this__9849.root,this__9849.has_nil_QMARK_,this__9849.nil_val,this__9849.__hash));
});
cljs.core.PersistentHashMap.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__9850 = this;
return this__9850.meta;
});
cljs.core.PersistentHashMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__9851 = this;
return cljs.core._with_meta.call(null,cljs.core.PersistentHashMap.EMPTY,this__9851.meta);
});
cljs.core.PersistentHashMap.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (coll,k){
var this__9852 = this;
if((k == null))
{if(this__9852.has_nil_QMARK_)
{return (new cljs.core.PersistentHashMap(this__9852.meta,(this__9852.cnt - 1),this__9852.root,false,null,null));
} else
{return coll;
}
} else
{if((this__9852.root == null))
{return coll;
} else
{if("\uFDD0'else")
{var new_root__9853 = this__9852.root.inode_without(0,cljs.core.hash.call(null,k),k);
if((new_root__9853 === this__9852.root))
{return coll;
} else
{return (new cljs.core.PersistentHashMap(this__9852.meta,(this__9852.cnt - 1),new_root__9853,this__9852.has_nil_QMARK_,this__9852.nil_val,null));
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
var len__9855 = ks.length;
var i__9856 = 0;
var out__9857 = cljs.core.transient$.call(null,cljs.core.PersistentHashMap.EMPTY);
while(true){
if((i__9856 < len__9855))
{{
var G__9858 = (i__9856 + 1);
var G__9859 = cljs.core.assoc_BANG_.call(null,out__9857,(ks[i__9856]),(vs[i__9856]));
i__9856 = G__9858;
out__9857 = G__9859;
continue;
}
} else
{return cljs.core.persistent_BANG_.call(null,out__9857);
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
cljs.core.TransientHashMap.cljs$lang$ctorPrSeq = (function (this__3002__auto__){
return cljs.core.list.call(null,"cljs.core/TransientHashMap");
});
cljs.core.TransientHashMap.prototype.cljs$core$ITransientMap$_dissoc_BANG_$arity$2 = (function (tcoll,key){
var this__9860 = this;
return tcoll.without_BANG_(key);
});
cljs.core.TransientHashMap.prototype.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3 = (function (tcoll,key,val){
var this__9861 = this;
return tcoll.assoc_BANG_(key,val);
});
cljs.core.TransientHashMap.prototype.cljs$core$ITransientCollection$_conj_BANG_$arity$2 = (function (tcoll,val){
var this__9862 = this;
return tcoll.conj_BANG_(val);
});
cljs.core.TransientHashMap.prototype.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 = (function (tcoll){
var this__9863 = this;
return tcoll.persistent_BANG_();
});
cljs.core.TransientHashMap.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (tcoll,k){
var this__9864 = this;
if((k == null))
{if(this__9864.has_nil_QMARK_)
{return this__9864.nil_val;
} else
{return null;
}
} else
{if((this__9864.root == null))
{return null;
} else
{return this__9864.root.inode_lookup(0,cljs.core.hash.call(null,k),k);
}
}
});
cljs.core.TransientHashMap.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (tcoll,k,not_found){
var this__9865 = this;
if((k == null))
{if(this__9865.has_nil_QMARK_)
{return this__9865.nil_val;
} else
{return not_found;
}
} else
{if((this__9865.root == null))
{return not_found;
} else
{return this__9865.root.inode_lookup(0,cljs.core.hash.call(null,k),k,not_found);
}
}
});
cljs.core.TransientHashMap.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__9866 = this;
if(this__9866.edit)
{return this__9866.count;
} else
{throw (new Error("count after persistent!"));
}
});
cljs.core.TransientHashMap.prototype.conj_BANG_ = (function (o){
var this__9867 = this;
var tcoll__9868 = this;
if(this__9867.edit)
{if((function (){var G__9869__9870 = o;
if(G__9869__9870)
{if((function (){var or__3824__auto____9871 = (G__9869__9870.cljs$lang$protocol_mask$partition0$ & 2048);
if(or__3824__auto____9871)
{return or__3824__auto____9871;
} else
{return G__9869__9870.cljs$core$IMapEntry$;
}
})())
{return true;
} else
{if((!G__9869__9870.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IMapEntry,G__9869__9870);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IMapEntry,G__9869__9870);
}
})())
{return tcoll__9868.assoc_BANG_(cljs.core.key.call(null,o),cljs.core.val.call(null,o));
} else
{var es__9872 = cljs.core.seq.call(null,o);
var tcoll__9873 = tcoll__9868;
while(true){
var temp__3971__auto____9874 = cljs.core.first.call(null,es__9872);
if(cljs.core.truth_(temp__3971__auto____9874))
{var e__9875 = temp__3971__auto____9874;
{
var G__9886 = cljs.core.next.call(null,es__9872);
var G__9887 = tcoll__9873.assoc_BANG_(cljs.core.key.call(null,e__9875),cljs.core.val.call(null,e__9875));
es__9872 = G__9886;
tcoll__9873 = G__9887;
continue;
}
} else
{return tcoll__9873;
}
break;
}
}
} else
{throw (new Error("conj! after persistent"));
}
});
cljs.core.TransientHashMap.prototype.assoc_BANG_ = (function (k,v){
var this__9876 = this;
var tcoll__9877 = this;
if(this__9876.edit)
{if((k == null))
{if((this__9876.nil_val === v))
{} else
{this__9876.nil_val = v;
}
if(this__9876.has_nil_QMARK_)
{} else
{this__9876.count = (this__9876.count + 1);
this__9876.has_nil_QMARK_ = true;
}
return tcoll__9877;
} else
{var added_leaf_QMARK___9878 = (new cljs.core.Box(false));
var node__9879 = (((this__9876.root == null))?cljs.core.BitmapIndexedNode.EMPTY:this__9876.root).inode_assoc_BANG_(this__9876.edit,0,cljs.core.hash.call(null,k),k,v,added_leaf_QMARK___9878);
if((node__9879 === this__9876.root))
{} else
{this__9876.root = node__9879;
}
if(added_leaf_QMARK___9878.val)
{this__9876.count = (this__9876.count + 1);
} else
{}
return tcoll__9877;
}
} else
{throw (new Error("assoc! after persistent!"));
}
});
cljs.core.TransientHashMap.prototype.without_BANG_ = (function (k){
var this__9880 = this;
var tcoll__9881 = this;
if(this__9880.edit)
{if((k == null))
{if(this__9880.has_nil_QMARK_)
{this__9880.has_nil_QMARK_ = false;
this__9880.nil_val = null;
this__9880.count = (this__9880.count - 1);
return tcoll__9881;
} else
{return tcoll__9881;
}
} else
{if((this__9880.root == null))
{return tcoll__9881;
} else
{var removed_leaf_QMARK___9882 = (new cljs.core.Box(false));
var node__9883 = this__9880.root.inode_without_BANG_(this__9880.edit,0,cljs.core.hash.call(null,k),k,removed_leaf_QMARK___9882);
if((node__9883 === this__9880.root))
{} else
{this__9880.root = node__9883;
}
if(cljs.core.truth_((removed_leaf_QMARK___9882[0])))
{this__9880.count = (this__9880.count - 1);
} else
{}
return tcoll__9881;
}
}
} else
{throw (new Error("dissoc! after persistent!"));
}
});
cljs.core.TransientHashMap.prototype.persistent_BANG_ = (function (){
var this__9884 = this;
var tcoll__9885 = this;
if(this__9884.edit)
{this__9884.edit = null;
return (new cljs.core.PersistentHashMap(null,this__9884.count,this__9884.root,this__9884.has_nil_QMARK_,this__9884.nil_val,null));
} else
{throw (new Error("persistent! called twice"));
}
});
cljs.core.TransientHashMap;
cljs.core.tree_map_seq_push = (function tree_map_seq_push(node,stack,ascending_QMARK_){
var t__9890 = node;
var stack__9891 = stack;
while(true){
if(!((t__9890 == null)))
{{
var G__9892 = ((ascending_QMARK_)?t__9890.left:t__9890.right);
var G__9893 = cljs.core.conj.call(null,stack__9891,t__9890);
t__9890 = G__9892;
stack__9891 = G__9893;
continue;
}
} else
{return stack__9891;
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
cljs.core.PersistentTreeMapSeq.cljs$lang$ctorPrSeq = (function (this__3002__auto__){
return cljs.core.list.call(null,"cljs.core/PersistentTreeMapSeq");
});
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__9894 = this;
var h__2885__auto____9895 = this__9894.__hash;
if(!((h__2885__auto____9895 == null)))
{return h__2885__auto____9895;
} else
{var h__2885__auto____9896 = cljs.core.hash_coll.call(null,coll);
this__9894.__hash = h__2885__auto____9896;
return h__2885__auto____9896;
}
});
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__9897 = this;
return cljs.core.cons.call(null,o,coll);
});
cljs.core.PersistentTreeMapSeq.prototype.toString = (function (){
var this__9898 = this;
var this__9899 = this;
return cljs.core.pr_str.call(null,this__9899);
});
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this$){
var this__9900 = this;
return this$;
});
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__9901 = this;
if((this__9901.cnt < 0))
{return (cljs.core.count.call(null,cljs.core.next.call(null,coll)) + 1);
} else
{return this__9901.cnt;
}
});
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ISeq$_first$arity$1 = (function (this$){
var this__9902 = this;
return cljs.core.peek.call(null,this__9902.stack);
});
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ISeq$_rest$arity$1 = (function (this$){
var this__9903 = this;
var t__9904 = cljs.core.first.call(null,this__9903.stack);
var next_stack__9905 = cljs.core.tree_map_seq_push.call(null,((this__9903.ascending_QMARK_)?t__9904.right:t__9904.left),cljs.core.next.call(null,this__9903.stack),this__9903.ascending_QMARK_);
if(!((next_stack__9905 == null)))
{return (new cljs.core.PersistentTreeMapSeq(null,next_stack__9905,this__9903.ascending_QMARK_,(this__9903.cnt - 1),null));
} else
{return cljs.core.List.EMPTY;
}
});
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__9906 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__9907 = this;
return (new cljs.core.PersistentTreeMapSeq(meta,this__9907.stack,this__9907.ascending_QMARK_,this__9907.cnt,this__9907.__hash));
});
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__9908 = this;
return this__9908.meta;
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
{if((function (){var and__3822__auto____9910 = cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,right);
if(and__3822__auto____9910)
{return cljs.core.instance_QMARK_.call(null,cljs.core.BlackNode,right.left);
} else
{return and__3822__auto____9910;
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
{if((function (){var and__3822__auto____9912 = cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,left);
if(and__3822__auto____9912)
{return cljs.core.instance_QMARK_.call(null,cljs.core.BlackNode,left.right);
} else
{return and__3822__auto____9912;
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
var init__9916 = f.call(null,init,node.key,node.val);
if(cljs.core.reduced_QMARK_.call(null,init__9916))
{return cljs.core.deref.call(null,init__9916);
} else
{var init__9917 = ((!((node.left == null)))?tree_map_kv_reduce.call(null,node.left,f,init__9916):init__9916);
if(cljs.core.reduced_QMARK_.call(null,init__9917))
{return cljs.core.deref.call(null,init__9917);
} else
{var init__9918 = ((!((node.right == null)))?tree_map_kv_reduce.call(null,node.right,f,init__9917):init__9917);
if(cljs.core.reduced_QMARK_.call(null,init__9918))
{return cljs.core.deref.call(null,init__9918);
} else
{return init__9918;
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
cljs.core.BlackNode.cljs$lang$ctorPrSeq = (function (this__3002__auto__){
return cljs.core.list.call(null,"cljs.core/BlackNode");
});
cljs.core.BlackNode.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__9921 = this;
var h__2885__auto____9922 = this__9921.__hash;
if(!((h__2885__auto____9922 == null)))
{return h__2885__auto____9922;
} else
{var h__2885__auto____9923 = cljs.core.hash_coll.call(null,coll);
this__9921.__hash = h__2885__auto____9923;
return h__2885__auto____9923;
}
});
cljs.core.BlackNode.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (node,k){
var this__9924 = this;
return node.cljs$core$IIndexed$_nth$arity$3(node,k,null);
});
cljs.core.BlackNode.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (node,k,not_found){
var this__9925 = this;
return node.cljs$core$IIndexed$_nth$arity$3(node,k,not_found);
});
cljs.core.BlackNode.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (node,k,v){
var this__9926 = this;
return cljs.core.assoc.call(null,cljs.core.PersistentVector.fromArray([this__9926.key,this__9926.val], true),k,v);
});
cljs.core.BlackNode.prototype.call = (function() {
var G__9974 = null;
var G__9974__2 = (function (this_sym9927,k){
var this__9929 = this;
var this_sym9927__9930 = this;
var node__9931 = this_sym9927__9930;
return node__9931.cljs$core$ILookup$_lookup$arity$2(node__9931,k);
});
var G__9974__3 = (function (this_sym9928,k,not_found){
var this__9929 = this;
var this_sym9928__9932 = this;
var node__9933 = this_sym9928__9932;
return node__9933.cljs$core$ILookup$_lookup$arity$3(node__9933,k,not_found);
});
G__9974 = function(this_sym9928,k,not_found){
switch(arguments.length){
case 2:
return G__9974__2.call(this,this_sym9928,k);
case 3:
return G__9974__3.call(this,this_sym9928,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__9974;
})()
;
cljs.core.BlackNode.prototype.apply = (function (this_sym9919,args9920){
var this__9934 = this;
return this_sym9919.call.apply(this_sym9919,[this_sym9919].concat(args9920.slice()));
});
cljs.core.BlackNode.prototype.cljs$core$ICollection$_conj$arity$2 = (function (node,o){
var this__9935 = this;
return cljs.core.PersistentVector.fromArray([this__9935.key,this__9935.val,o], true);
});
cljs.core.BlackNode.prototype.cljs$core$IMapEntry$_key$arity$1 = (function (node){
var this__9936 = this;
return this__9936.key;
});
cljs.core.BlackNode.prototype.cljs$core$IMapEntry$_val$arity$1 = (function (node){
var this__9937 = this;
return this__9937.val;
});
cljs.core.BlackNode.prototype.add_right = (function (ins){
var this__9938 = this;
var node__9939 = this;
return ins.balance_right(node__9939);
});
cljs.core.BlackNode.prototype.redden = (function (){
var this__9940 = this;
var node__9941 = this;
return (new cljs.core.RedNode(this__9940.key,this__9940.val,this__9940.left,this__9940.right,null));
});
cljs.core.BlackNode.prototype.remove_right = (function (del){
var this__9942 = this;
var node__9943 = this;
return cljs.core.balance_right_del.call(null,this__9942.key,this__9942.val,this__9942.left,del);
});
cljs.core.BlackNode.prototype.replace = (function (key,val,left,right){
var this__9944 = this;
var node__9945 = this;
return (new cljs.core.BlackNode(key,val,left,right,null));
});
cljs.core.BlackNode.prototype.kv_reduce = (function (f,init){
var this__9946 = this;
var node__9947 = this;
return cljs.core.tree_map_kv_reduce.call(null,node__9947,f,init);
});
cljs.core.BlackNode.prototype.remove_left = (function (del){
var this__9948 = this;
var node__9949 = this;
return cljs.core.balance_left_del.call(null,this__9948.key,this__9948.val,del,this__9948.right);
});
cljs.core.BlackNode.prototype.add_left = (function (ins){
var this__9950 = this;
var node__9951 = this;
return ins.balance_left(node__9951);
});
cljs.core.BlackNode.prototype.balance_left = (function (parent){
var this__9952 = this;
var node__9953 = this;
return (new cljs.core.BlackNode(parent.key,parent.val,node__9953,parent.right,null));
});
cljs.core.BlackNode.prototype.toString = (function() {
var G__9975 = null;
var G__9975__0 = (function (){
var this__9954 = this;
var this__9956 = this;
return cljs.core.pr_str.call(null,this__9956);
});
G__9975 = function(){
switch(arguments.length){
case 0:
return G__9975__0.call(this);
}
throw('Invalid arity: ' + arguments.length);
};
return G__9975;
})()
;
cljs.core.BlackNode.prototype.balance_right = (function (parent){
var this__9957 = this;
var node__9958 = this;
return (new cljs.core.BlackNode(parent.key,parent.val,parent.left,node__9958,null));
});
cljs.core.BlackNode.prototype.blacken = (function (){
var this__9959 = this;
var node__9960 = this;
return node__9960;
});
cljs.core.BlackNode.prototype.cljs$core$IReduce$_reduce$arity$2 = (function (node,f){
var this__9961 = this;
return cljs.core.ci_reduce.call(null,node,f);
});
cljs.core.BlackNode.prototype.cljs$core$IReduce$_reduce$arity$3 = (function (node,f,start){
var this__9962 = this;
return cljs.core.ci_reduce.call(null,node,f,start);
});
cljs.core.BlackNode.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (node){
var this__9963 = this;
return cljs.core.list.call(null,this__9963.key,this__9963.val);
});
cljs.core.BlackNode.prototype.cljs$core$ICounted$_count$arity$1 = (function (node){
var this__9964 = this;
return 2;
});
cljs.core.BlackNode.prototype.cljs$core$IStack$_peek$arity$1 = (function (node){
var this__9965 = this;
return this__9965.val;
});
cljs.core.BlackNode.prototype.cljs$core$IStack$_pop$arity$1 = (function (node){
var this__9966 = this;
return cljs.core.PersistentVector.fromArray([this__9966.key], true);
});
cljs.core.BlackNode.prototype.cljs$core$IVector$_assoc_n$arity$3 = (function (node,n,v){
var this__9967 = this;
return cljs.core._assoc_n.call(null,cljs.core.PersistentVector.fromArray([this__9967.key,this__9967.val], true),n,v);
});
cljs.core.BlackNode.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__9968 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.BlackNode.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (node,meta){
var this__9969 = this;
return cljs.core.with_meta.call(null,cljs.core.PersistentVector.fromArray([this__9969.key,this__9969.val], true),meta);
});
cljs.core.BlackNode.prototype.cljs$core$IMeta$_meta$arity$1 = (function (node){
var this__9970 = this;
return null;
});
cljs.core.BlackNode.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (node,n){
var this__9971 = this;
if((n === 0))
{return this__9971.key;
} else
{if((n === 1))
{return this__9971.val;
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
var this__9972 = this;
if((n === 0))
{return this__9972.key;
} else
{if((n === 1))
{return this__9972.val;
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
var this__9973 = this;
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
cljs.core.RedNode.cljs$lang$ctorPrSeq = (function (this__3002__auto__){
return cljs.core.list.call(null,"cljs.core/RedNode");
});
cljs.core.RedNode.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__9978 = this;
var h__2885__auto____9979 = this__9978.__hash;
if(!((h__2885__auto____9979 == null)))
{return h__2885__auto____9979;
} else
{var h__2885__auto____9980 = cljs.core.hash_coll.call(null,coll);
this__9978.__hash = h__2885__auto____9980;
return h__2885__auto____9980;
}
});
cljs.core.RedNode.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (node,k){
var this__9981 = this;
return node.cljs$core$IIndexed$_nth$arity$3(node,k,null);
});
cljs.core.RedNode.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (node,k,not_found){
var this__9982 = this;
return node.cljs$core$IIndexed$_nth$arity$3(node,k,not_found);
});
cljs.core.RedNode.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (node,k,v){
var this__9983 = this;
return cljs.core.assoc.call(null,cljs.core.PersistentVector.fromArray([this__9983.key,this__9983.val], true),k,v);
});
cljs.core.RedNode.prototype.call = (function() {
var G__10031 = null;
var G__10031__2 = (function (this_sym9984,k){
var this__9986 = this;
var this_sym9984__9987 = this;
var node__9988 = this_sym9984__9987;
return node__9988.cljs$core$ILookup$_lookup$arity$2(node__9988,k);
});
var G__10031__3 = (function (this_sym9985,k,not_found){
var this__9986 = this;
var this_sym9985__9989 = this;
var node__9990 = this_sym9985__9989;
return node__9990.cljs$core$ILookup$_lookup$arity$3(node__9990,k,not_found);
});
G__10031 = function(this_sym9985,k,not_found){
switch(arguments.length){
case 2:
return G__10031__2.call(this,this_sym9985,k);
case 3:
return G__10031__3.call(this,this_sym9985,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__10031;
})()
;
cljs.core.RedNode.prototype.apply = (function (this_sym9976,args9977){
var this__9991 = this;
return this_sym9976.call.apply(this_sym9976,[this_sym9976].concat(args9977.slice()));
});
cljs.core.RedNode.prototype.cljs$core$ICollection$_conj$arity$2 = (function (node,o){
var this__9992 = this;
return cljs.core.PersistentVector.fromArray([this__9992.key,this__9992.val,o], true);
});
cljs.core.RedNode.prototype.cljs$core$IMapEntry$_key$arity$1 = (function (node){
var this__9993 = this;
return this__9993.key;
});
cljs.core.RedNode.prototype.cljs$core$IMapEntry$_val$arity$1 = (function (node){
var this__9994 = this;
return this__9994.val;
});
cljs.core.RedNode.prototype.add_right = (function (ins){
var this__9995 = this;
var node__9996 = this;
return (new cljs.core.RedNode(this__9995.key,this__9995.val,this__9995.left,ins,null));
});
cljs.core.RedNode.prototype.redden = (function (){
var this__9997 = this;
var node__9998 = this;
throw (new Error("red-black tree invariant violation"));
});
cljs.core.RedNode.prototype.remove_right = (function (del){
var this__9999 = this;
var node__10000 = this;
return (new cljs.core.RedNode(this__9999.key,this__9999.val,this__9999.left,del,null));
});
cljs.core.RedNode.prototype.replace = (function (key,val,left,right){
var this__10001 = this;
var node__10002 = this;
return (new cljs.core.RedNode(key,val,left,right,null));
});
cljs.core.RedNode.prototype.kv_reduce = (function (f,init){
var this__10003 = this;
var node__10004 = this;
return cljs.core.tree_map_kv_reduce.call(null,node__10004,f,init);
});
cljs.core.RedNode.prototype.remove_left = (function (del){
var this__10005 = this;
var node__10006 = this;
return (new cljs.core.RedNode(this__10005.key,this__10005.val,del,this__10005.right,null));
});
cljs.core.RedNode.prototype.add_left = (function (ins){
var this__10007 = this;
var node__10008 = this;
return (new cljs.core.RedNode(this__10007.key,this__10007.val,ins,this__10007.right,null));
});
cljs.core.RedNode.prototype.balance_left = (function (parent){
var this__10009 = this;
var node__10010 = this;
if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,this__10009.left))
{return (new cljs.core.RedNode(this__10009.key,this__10009.val,this__10009.left.blacken(),(new cljs.core.BlackNode(parent.key,parent.val,this__10009.right,parent.right,null)),null));
} else
{if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,this__10009.right))
{return (new cljs.core.RedNode(this__10009.right.key,this__10009.right.val,(new cljs.core.BlackNode(this__10009.key,this__10009.val,this__10009.left,this__10009.right.left,null)),(new cljs.core.BlackNode(parent.key,parent.val,this__10009.right.right,parent.right,null)),null));
} else
{if("\uFDD0'else")
{return (new cljs.core.BlackNode(parent.key,parent.val,node__10010,parent.right,null));
} else
{return null;
}
}
}
});
cljs.core.RedNode.prototype.toString = (function() {
var G__10032 = null;
var G__10032__0 = (function (){
var this__10011 = this;
var this__10013 = this;
return cljs.core.pr_str.call(null,this__10013);
});
G__10032 = function(){
switch(arguments.length){
case 0:
return G__10032__0.call(this);
}
throw('Invalid arity: ' + arguments.length);
};
return G__10032;
})()
;
cljs.core.RedNode.prototype.balance_right = (function (parent){
var this__10014 = this;
var node__10015 = this;
if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,this__10014.right))
{return (new cljs.core.RedNode(this__10014.key,this__10014.val,(new cljs.core.BlackNode(parent.key,parent.val,parent.left,this__10014.left,null)),this__10014.right.blacken(),null));
} else
{if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,this__10014.left))
{return (new cljs.core.RedNode(this__10014.left.key,this__10014.left.val,(new cljs.core.BlackNode(parent.key,parent.val,parent.left,this__10014.left.left,null)),(new cljs.core.BlackNode(this__10014.key,this__10014.val,this__10014.left.right,this__10014.right,null)),null));
} else
{if("\uFDD0'else")
{return (new cljs.core.BlackNode(parent.key,parent.val,parent.left,node__10015,null));
} else
{return null;
}
}
}
});
cljs.core.RedNode.prototype.blacken = (function (){
var this__10016 = this;
var node__10017 = this;
return (new cljs.core.BlackNode(this__10016.key,this__10016.val,this__10016.left,this__10016.right,null));
});
cljs.core.RedNode.prototype.cljs$core$IReduce$_reduce$arity$2 = (function (node,f){
var this__10018 = this;
return cljs.core.ci_reduce.call(null,node,f);
});
cljs.core.RedNode.prototype.cljs$core$IReduce$_reduce$arity$3 = (function (node,f,start){
var this__10019 = this;
return cljs.core.ci_reduce.call(null,node,f,start);
});
cljs.core.RedNode.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (node){
var this__10020 = this;
return cljs.core.list.call(null,this__10020.key,this__10020.val);
});
cljs.core.RedNode.prototype.cljs$core$ICounted$_count$arity$1 = (function (node){
var this__10021 = this;
return 2;
});
cljs.core.RedNode.prototype.cljs$core$IStack$_peek$arity$1 = (function (node){
var this__10022 = this;
return this__10022.val;
});
cljs.core.RedNode.prototype.cljs$core$IStack$_pop$arity$1 = (function (node){
var this__10023 = this;
return cljs.core.PersistentVector.fromArray([this__10023.key], true);
});
cljs.core.RedNode.prototype.cljs$core$IVector$_assoc_n$arity$3 = (function (node,n,v){
var this__10024 = this;
return cljs.core._assoc_n.call(null,cljs.core.PersistentVector.fromArray([this__10024.key,this__10024.val], true),n,v);
});
cljs.core.RedNode.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__10025 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.RedNode.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (node,meta){
var this__10026 = this;
return cljs.core.with_meta.call(null,cljs.core.PersistentVector.fromArray([this__10026.key,this__10026.val], true),meta);
});
cljs.core.RedNode.prototype.cljs$core$IMeta$_meta$arity$1 = (function (node){
var this__10027 = this;
return null;
});
cljs.core.RedNode.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (node,n){
var this__10028 = this;
if((n === 0))
{return this__10028.key;
} else
{if((n === 1))
{return this__10028.val;
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
var this__10029 = this;
if((n === 0))
{return this__10029.key;
} else
{if((n === 1))
{return this__10029.val;
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
var this__10030 = this;
return cljs.core.PersistentVector.EMPTY;
});
cljs.core.RedNode;
cljs.core.tree_map_add = (function tree_map_add(comp,tree,k,v,found){
if((tree == null))
{return (new cljs.core.RedNode(k,v,null,null,null));
} else
{var c__10036 = comp.call(null,k,tree.key);
if((c__10036 === 0))
{(found[0] = tree);
return null;
} else
{if((c__10036 < 0))
{var ins__10037 = tree_map_add.call(null,comp,tree.left,k,v,found);
if(!((ins__10037 == null)))
{return tree.add_left(ins__10037);
} else
{return null;
}
} else
{if("\uFDD0'else")
{var ins__10038 = tree_map_add.call(null,comp,tree.right,k,v,found);
if(!((ins__10038 == null)))
{return tree.add_right(ins__10038);
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
{var app__10041 = tree_map_append.call(null,left.right,right.left);
if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,app__10041))
{return (new cljs.core.RedNode(app__10041.key,app__10041.val,(new cljs.core.RedNode(left.key,left.val,left.left,app__10041.left,null)),(new cljs.core.RedNode(right.key,right.val,app__10041.right,right.right,null)),null));
} else
{return (new cljs.core.RedNode(left.key,left.val,left.left,(new cljs.core.RedNode(right.key,right.val,app__10041,right.right,null)),null));
}
} else
{return (new cljs.core.RedNode(left.key,left.val,left.left,tree_map_append.call(null,left.right,right),null));
}
} else
{if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,right))
{return (new cljs.core.RedNode(right.key,right.val,tree_map_append.call(null,left,right.left),right.right,null));
} else
{if("\uFDD0'else")
{var app__10042 = tree_map_append.call(null,left.right,right.left);
if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,app__10042))
{return (new cljs.core.RedNode(app__10042.key,app__10042.val,(new cljs.core.BlackNode(left.key,left.val,left.left,app__10042.left,null)),(new cljs.core.BlackNode(right.key,right.val,app__10042.right,right.right,null)),null));
} else
{return cljs.core.balance_left_del.call(null,left.key,left.val,left.left,(new cljs.core.BlackNode(right.key,right.val,app__10042,right.right,null)));
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
{var c__10048 = comp.call(null,k,tree.key);
if((c__10048 === 0))
{(found[0] = tree);
return cljs.core.tree_map_append.call(null,tree.left,tree.right);
} else
{if((c__10048 < 0))
{var del__10049 = tree_map_remove.call(null,comp,tree.left,k,found);
if((function (){var or__3824__auto____10050 = !((del__10049 == null));
if(or__3824__auto____10050)
{return or__3824__auto____10050;
} else
{return !(((found[0]) == null));
}
})())
{if(cljs.core.instance_QMARK_.call(null,cljs.core.BlackNode,tree.left))
{return cljs.core.balance_left_del.call(null,tree.key,tree.val,del__10049,tree.right);
} else
{return (new cljs.core.RedNode(tree.key,tree.val,del__10049,tree.right,null));
}
} else
{return null;
}
} else
{if("\uFDD0'else")
{var del__10051 = tree_map_remove.call(null,comp,tree.right,k,found);
if((function (){var or__3824__auto____10052 = !((del__10051 == null));
if(or__3824__auto____10052)
{return or__3824__auto____10052;
} else
{return !(((found[0]) == null));
}
})())
{if(cljs.core.instance_QMARK_.call(null,cljs.core.BlackNode,tree.right))
{return cljs.core.balance_right_del.call(null,tree.key,tree.val,tree.left,del__10051);
} else
{return (new cljs.core.RedNode(tree.key,tree.val,tree.left,del__10051,null));
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
var tk__10055 = tree.key;
var c__10056 = comp.call(null,k,tk__10055);
if((c__10056 === 0))
{return tree.replace(tk__10055,v,tree.left,tree.right);
} else
{if((c__10056 < 0))
{return tree.replace(tk__10055,tree.val,tree_map_replace.call(null,comp,tree.left,k,v),tree.right);
} else
{if("\uFDD0'else")
{return tree.replace(tk__10055,tree.val,tree.left,tree_map_replace.call(null,comp,tree.right,k,v));
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
cljs.core.PersistentTreeMap.cljs$lang$ctorPrSeq = (function (this__3002__auto__){
return cljs.core.list.call(null,"cljs.core/PersistentTreeMap");
});
cljs.core.PersistentTreeMap.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__10059 = this;
var h__2885__auto____10060 = this__10059.__hash;
if(!((h__2885__auto____10060 == null)))
{return h__2885__auto____10060;
} else
{var h__2885__auto____10061 = cljs.core.hash_imap.call(null,coll);
this__10059.__hash = h__2885__auto____10061;
return h__2885__auto____10061;
}
});
cljs.core.PersistentTreeMap.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (coll,k){
var this__10062 = this;
return coll.cljs$core$ILookup$_lookup$arity$3(coll,k,null);
});
cljs.core.PersistentTreeMap.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (coll,k,not_found){
var this__10063 = this;
var n__10064 = coll.entry_at(k);
if(!((n__10064 == null)))
{return n__10064.val;
} else
{return not_found;
}
});
cljs.core.PersistentTreeMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (coll,k,v){
var this__10065 = this;
var found__10066 = [null];
var t__10067 = cljs.core.tree_map_add.call(null,this__10065.comp,this__10065.tree,k,v,found__10066);
if((t__10067 == null))
{var found_node__10068 = cljs.core.nth.call(null,found__10066,0);
if(cljs.core._EQ_.call(null,v,found_node__10068.val))
{return coll;
} else
{return (new cljs.core.PersistentTreeMap(this__10065.comp,cljs.core.tree_map_replace.call(null,this__10065.comp,this__10065.tree,k,v),this__10065.cnt,this__10065.meta,null));
}
} else
{return (new cljs.core.PersistentTreeMap(this__10065.comp,t__10067.blacken(),(this__10065.cnt + 1),this__10065.meta,null));
}
});
cljs.core.PersistentTreeMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (coll,k){
var this__10069 = this;
return !((coll.entry_at(k) == null));
});
cljs.core.PersistentTreeMap.prototype.call = (function() {
var G__10103 = null;
var G__10103__2 = (function (this_sym10070,k){
var this__10072 = this;
var this_sym10070__10073 = this;
var coll__10074 = this_sym10070__10073;
return coll__10074.cljs$core$ILookup$_lookup$arity$2(coll__10074,k);
});
var G__10103__3 = (function (this_sym10071,k,not_found){
var this__10072 = this;
var this_sym10071__10075 = this;
var coll__10076 = this_sym10071__10075;
return coll__10076.cljs$core$ILookup$_lookup$arity$3(coll__10076,k,not_found);
});
G__10103 = function(this_sym10071,k,not_found){
switch(arguments.length){
case 2:
return G__10103__2.call(this,this_sym10071,k);
case 3:
return G__10103__3.call(this,this_sym10071,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__10103;
})()
;
cljs.core.PersistentTreeMap.prototype.apply = (function (this_sym10057,args10058){
var this__10077 = this;
return this_sym10057.call.apply(this_sym10057,[this_sym10057].concat(args10058.slice()));
});
cljs.core.PersistentTreeMap.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (coll,f,init){
var this__10078 = this;
if(!((this__10078.tree == null)))
{return cljs.core.tree_map_kv_reduce.call(null,this__10078.tree,f,init);
} else
{return init;
}
});
cljs.core.PersistentTreeMap.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,entry){
var this__10079 = this;
if(cljs.core.vector_QMARK_.call(null,entry))
{return coll.cljs$core$IAssociative$_assoc$arity$3(coll,cljs.core._nth.call(null,entry,0),cljs.core._nth.call(null,entry,1));
} else
{return cljs.core.reduce.call(null,cljs.core._conj,coll,entry);
}
});
cljs.core.PersistentTreeMap.prototype.cljs$core$IReversible$_rseq$arity$1 = (function (coll){
var this__10080 = this;
if((this__10080.cnt > 0))
{return cljs.core.create_tree_map_seq.call(null,this__10080.tree,false,this__10080.cnt);
} else
{return null;
}
});
cljs.core.PersistentTreeMap.prototype.toString = (function (){
var this__10081 = this;
var this__10082 = this;
return cljs.core.pr_str.call(null,this__10082);
});
cljs.core.PersistentTreeMap.prototype.entry_at = (function (k){
var this__10083 = this;
var coll__10084 = this;
var t__10085 = this__10083.tree;
while(true){
if(!((t__10085 == null)))
{var c__10086 = this__10083.comp.call(null,k,t__10085.key);
if((c__10086 === 0))
{return t__10085;
} else
{if((c__10086 < 0))
{{
var G__10104 = t__10085.left;
t__10085 = G__10104;
continue;
}
} else
{if("\uFDD0'else")
{{
var G__10105 = t__10085.right;
t__10085 = G__10105;
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
var this__10087 = this;
if((this__10087.cnt > 0))
{return cljs.core.create_tree_map_seq.call(null,this__10087.tree,ascending_QMARK_,this__10087.cnt);
} else
{return null;
}
});
cljs.core.PersistentTreeMap.prototype.cljs$core$ISorted$_sorted_seq_from$arity$3 = (function (coll,k,ascending_QMARK_){
var this__10088 = this;
if((this__10088.cnt > 0))
{var stack__10089 = null;
var t__10090 = this__10088.tree;
while(true){
if(!((t__10090 == null)))
{var c__10091 = this__10088.comp.call(null,k,t__10090.key);
if((c__10091 === 0))
{return (new cljs.core.PersistentTreeMapSeq(null,cljs.core.conj.call(null,stack__10089,t__10090),ascending_QMARK_,-1,null));
} else
{if(cljs.core.truth_(ascending_QMARK_))
{if((c__10091 < 0))
{{
var G__10106 = cljs.core.conj.call(null,stack__10089,t__10090);
var G__10107 = t__10090.left;
stack__10089 = G__10106;
t__10090 = G__10107;
continue;
}
} else
{{
var G__10108 = stack__10089;
var G__10109 = t__10090.right;
stack__10089 = G__10108;
t__10090 = G__10109;
continue;
}
}
} else
{if("\uFDD0'else")
{if((c__10091 > 0))
{{
var G__10110 = cljs.core.conj.call(null,stack__10089,t__10090);
var G__10111 = t__10090.right;
stack__10089 = G__10110;
t__10090 = G__10111;
continue;
}
} else
{{
var G__10112 = stack__10089;
var G__10113 = t__10090.left;
stack__10089 = G__10112;
t__10090 = G__10113;
continue;
}
}
} else
{return null;
}
}
}
} else
{if((stack__10089 == null))
{return (new cljs.core.PersistentTreeMapSeq(null,stack__10089,ascending_QMARK_,-1,null));
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
var this__10092 = this;
return cljs.core.key.call(null,entry);
});
cljs.core.PersistentTreeMap.prototype.cljs$core$ISorted$_comparator$arity$1 = (function (coll){
var this__10093 = this;
return this__10093.comp;
});
cljs.core.PersistentTreeMap.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__10094 = this;
if((this__10094.cnt > 0))
{return cljs.core.create_tree_map_seq.call(null,this__10094.tree,true,this__10094.cnt);
} else
{return null;
}
});
cljs.core.PersistentTreeMap.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__10095 = this;
return this__10095.cnt;
});
cljs.core.PersistentTreeMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__10096 = this;
return cljs.core.equiv_map.call(null,coll,other);
});
cljs.core.PersistentTreeMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__10097 = this;
return (new cljs.core.PersistentTreeMap(this__10097.comp,this__10097.tree,this__10097.cnt,meta,this__10097.__hash));
});
cljs.core.PersistentTreeMap.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__10098 = this;
return this__10098.meta;
});
cljs.core.PersistentTreeMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__10099 = this;
return cljs.core.with_meta.call(null,cljs.core.PersistentTreeMap.EMPTY,this__10099.meta);
});
cljs.core.PersistentTreeMap.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (coll,k){
var this__10100 = this;
var found__10101 = [null];
var t__10102 = cljs.core.tree_map_remove.call(null,this__10100.comp,this__10100.tree,k,found__10101);
if((t__10102 == null))
{if((cljs.core.nth.call(null,found__10101,0) == null))
{return coll;
} else
{return (new cljs.core.PersistentTreeMap(this__10100.comp,null,0,this__10100.meta,null));
}
} else
{return (new cljs.core.PersistentTreeMap(this__10100.comp,t__10102.blacken(),(this__10100.cnt - 1),this__10100.meta,null));
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
var in__10116 = cljs.core.seq.call(null,keyvals);
var out__10117 = cljs.core.transient$.call(null,cljs.core.PersistentHashMap.EMPTY);
while(true){
if(in__10116)
{{
var G__10118 = cljs.core.nnext.call(null,in__10116);
var G__10119 = cljs.core.assoc_BANG_.call(null,out__10117,cljs.core.first.call(null,in__10116),cljs.core.second.call(null,in__10116));
in__10116 = G__10118;
out__10117 = G__10119;
continue;
}
} else
{return cljs.core.persistent_BANG_.call(null,out__10117);
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
hash_map.cljs$lang$applyTo = (function (arglist__10120){
var keyvals = cljs.core.seq(arglist__10120);;
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
array_map.cljs$lang$applyTo = (function (arglist__10121){
var keyvals = cljs.core.seq(arglist__10121);;
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
var ks__10125 = [];
var obj__10126 = {};
var kvs__10127 = cljs.core.seq.call(null,keyvals);
while(true){
if(kvs__10127)
{ks__10125.push(cljs.core.first.call(null,kvs__10127));
(obj__10126[cljs.core.first.call(null,kvs__10127)] = cljs.core.second.call(null,kvs__10127));
{
var G__10128 = cljs.core.nnext.call(null,kvs__10127);
kvs__10127 = G__10128;
continue;
}
} else
{return cljs.core.ObjMap.fromObject.call(null,ks__10125,obj__10126);
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
obj_map.cljs$lang$applyTo = (function (arglist__10129){
var keyvals = cljs.core.seq(arglist__10129);;
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
var in__10132 = cljs.core.seq.call(null,keyvals);
var out__10133 = cljs.core.PersistentTreeMap.EMPTY;
while(true){
if(in__10132)
{{
var G__10134 = cljs.core.nnext.call(null,in__10132);
var G__10135 = cljs.core.assoc.call(null,out__10133,cljs.core.first.call(null,in__10132),cljs.core.second.call(null,in__10132));
in__10132 = G__10134;
out__10133 = G__10135;
continue;
}
} else
{return out__10133;
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
sorted_map.cljs$lang$applyTo = (function (arglist__10136){
var keyvals = cljs.core.seq(arglist__10136);;
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
var in__10139 = cljs.core.seq.call(null,keyvals);
var out__10140 = (new cljs.core.PersistentTreeMap(comparator,null,0,null,0));
while(true){
if(in__10139)
{{
var G__10141 = cljs.core.nnext.call(null,in__10139);
var G__10142 = cljs.core.assoc.call(null,out__10140,cljs.core.first.call(null,in__10139),cljs.core.second.call(null,in__10139));
in__10139 = G__10141;
out__10140 = G__10142;
continue;
}
} else
{return out__10140;
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
sorted_map_by.cljs$lang$applyTo = (function (arglist__10143){
var comparator = cljs.core.first(arglist__10143);
var keyvals = cljs.core.rest(arglist__10143);
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
{return cljs.core.reduce.call(null,(function (p1__10144_SHARP_,p2__10145_SHARP_){
return cljs.core.conj.call(null,(function (){var or__3824__auto____10147 = p1__10144_SHARP_;
if(cljs.core.truth_(or__3824__auto____10147))
{return or__3824__auto____10147;
} else
{return cljs.core.ObjMap.EMPTY;
}
})(),p2__10145_SHARP_);
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
merge.cljs$lang$applyTo = (function (arglist__10148){
var maps = cljs.core.seq(arglist__10148);;
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
{var merge_entry__10156 = (function (m,e){
var k__10154 = cljs.core.first.call(null,e);
var v__10155 = cljs.core.second.call(null,e);
if(cljs.core.contains_QMARK_.call(null,m,k__10154))
{return cljs.core.assoc.call(null,m,k__10154,f.call(null,cljs.core._lookup.call(null,m,k__10154,null),v__10155));
} else
{return cljs.core.assoc.call(null,m,k__10154,v__10155);
}
});
var merge2__10158 = (function (m1,m2){
return cljs.core.reduce.call(null,merge_entry__10156,(function (){var or__3824__auto____10157 = m1;
if(cljs.core.truth_(or__3824__auto____10157))
{return or__3824__auto____10157;
} else
{return cljs.core.ObjMap.EMPTY;
}
})(),cljs.core.seq.call(null,m2));
});
return cljs.core.reduce.call(null,merge2__10158,maps);
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
merge_with.cljs$lang$applyTo = (function (arglist__10159){
var f = cljs.core.first(arglist__10159);
var maps = cljs.core.rest(arglist__10159);
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
var ret__10164 = cljs.core.ObjMap.EMPTY;
var keys__10165 = cljs.core.seq.call(null,keyseq);
while(true){
if(keys__10165)
{var key__10166 = cljs.core.first.call(null,keys__10165);
var entry__10167 = cljs.core._lookup.call(null,map,key__10166,"\uFDD0'cljs.core/not-found");
{
var G__10168 = ((cljs.core.not_EQ_.call(null,entry__10167,"\uFDD0'cljs.core/not-found"))?cljs.core.assoc.call(null,ret__10164,key__10166,entry__10167):ret__10164);
var G__10169 = cljs.core.next.call(null,keys__10165);
ret__10164 = G__10168;
keys__10165 = G__10169;
continue;
}
} else
{return ret__10164;
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
cljs.core.PersistentHashSet.cljs$lang$ctorPrSeq = (function (this__3002__auto__){
return cljs.core.list.call(null,"cljs.core/PersistentHashSet");
});
cljs.core.PersistentHashSet.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = (function (coll){
var this__10173 = this;
return (new cljs.core.TransientHashSet(cljs.core.transient$.call(null,this__10173.hash_map)));
});
cljs.core.PersistentHashSet.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__10174 = this;
var h__2885__auto____10175 = this__10174.__hash;
if(!((h__2885__auto____10175 == null)))
{return h__2885__auto____10175;
} else
{var h__2885__auto____10176 = cljs.core.hash_iset.call(null,coll);
this__10174.__hash = h__2885__auto____10176;
return h__2885__auto____10176;
}
});
cljs.core.PersistentHashSet.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (coll,v){
var this__10177 = this;
return coll.cljs$core$ILookup$_lookup$arity$3(coll,v,null);
});
cljs.core.PersistentHashSet.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (coll,v,not_found){
var this__10178 = this;
if(cljs.core.truth_(cljs.core._contains_key_QMARK_.call(null,this__10178.hash_map,v)))
{return v;
} else
{return not_found;
}
});
cljs.core.PersistentHashSet.prototype.call = (function() {
var G__10199 = null;
var G__10199__2 = (function (this_sym10179,k){
var this__10181 = this;
var this_sym10179__10182 = this;
var coll__10183 = this_sym10179__10182;
return coll__10183.cljs$core$ILookup$_lookup$arity$2(coll__10183,k);
});
var G__10199__3 = (function (this_sym10180,k,not_found){
var this__10181 = this;
var this_sym10180__10184 = this;
var coll__10185 = this_sym10180__10184;
return coll__10185.cljs$core$ILookup$_lookup$arity$3(coll__10185,k,not_found);
});
G__10199 = function(this_sym10180,k,not_found){
switch(arguments.length){
case 2:
return G__10199__2.call(this,this_sym10180,k);
case 3:
return G__10199__3.call(this,this_sym10180,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__10199;
})()
;
cljs.core.PersistentHashSet.prototype.apply = (function (this_sym10171,args10172){
var this__10186 = this;
return this_sym10171.call.apply(this_sym10171,[this_sym10171].concat(args10172.slice()));
});
cljs.core.PersistentHashSet.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__10187 = this;
return (new cljs.core.PersistentHashSet(this__10187.meta,cljs.core.assoc.call(null,this__10187.hash_map,o,null),null));
});
cljs.core.PersistentHashSet.prototype.toString = (function (){
var this__10188 = this;
var this__10189 = this;
return cljs.core.pr_str.call(null,this__10189);
});
cljs.core.PersistentHashSet.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__10190 = this;
return cljs.core.keys.call(null,this__10190.hash_map);
});
cljs.core.PersistentHashSet.prototype.cljs$core$ISet$_disjoin$arity$2 = (function (coll,v){
var this__10191 = this;
return (new cljs.core.PersistentHashSet(this__10191.meta,cljs.core.dissoc.call(null,this__10191.hash_map,v),null));
});
cljs.core.PersistentHashSet.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__10192 = this;
return cljs.core.count.call(null,cljs.core.seq.call(null,coll));
});
cljs.core.PersistentHashSet.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__10193 = this;
var and__3822__auto____10194 = cljs.core.set_QMARK_.call(null,other);
if(and__3822__auto____10194)
{var and__3822__auto____10195 = (cljs.core.count.call(null,coll) === cljs.core.count.call(null,other));
if(and__3822__auto____10195)
{return cljs.core.every_QMARK_.call(null,(function (p1__10170_SHARP_){
return cljs.core.contains_QMARK_.call(null,coll,p1__10170_SHARP_);
}),other);
} else
{return and__3822__auto____10195;
}
} else
{return and__3822__auto____10194;
}
});
cljs.core.PersistentHashSet.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__10196 = this;
return (new cljs.core.PersistentHashSet(meta,this__10196.hash_map,this__10196.__hash));
});
cljs.core.PersistentHashSet.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__10197 = this;
return this__10197.meta;
});
cljs.core.PersistentHashSet.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__10198 = this;
return cljs.core.with_meta.call(null,cljs.core.PersistentHashSet.EMPTY,this__10198.meta);
});
cljs.core.PersistentHashSet;
cljs.core.PersistentHashSet.EMPTY = (new cljs.core.PersistentHashSet(null,cljs.core.hash_map.call(null),0));
cljs.core.PersistentHashSet.fromArray = (function (items){
var len__10200 = cljs.core.count.call(null,items);
var i__10201 = 0;
var out__10202 = cljs.core.transient$.call(null,cljs.core.PersistentHashSet.EMPTY);
while(true){
if((i__10201 < len__10200))
{{
var G__10203 = (i__10201 + 1);
var G__10204 = cljs.core.conj_BANG_.call(null,out__10202,(items[i__10201]));
i__10201 = G__10203;
out__10202 = G__10204;
continue;
}
} else
{return cljs.core.persistent_BANG_.call(null,out__10202);
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
cljs.core.TransientHashSet.cljs$lang$ctorPrSeq = (function (this__3002__auto__){
return cljs.core.list.call(null,"cljs.core/TransientHashSet");
});
cljs.core.TransientHashSet.prototype.call = (function() {
var G__10222 = null;
var G__10222__2 = (function (this_sym10208,k){
var this__10210 = this;
var this_sym10208__10211 = this;
var tcoll__10212 = this_sym10208__10211;
if((cljs.core._lookup.call(null,this__10210.transient_map,k,cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel))
{return null;
} else
{return k;
}
});
var G__10222__3 = (function (this_sym10209,k,not_found){
var this__10210 = this;
var this_sym10209__10213 = this;
var tcoll__10214 = this_sym10209__10213;
if((cljs.core._lookup.call(null,this__10210.transient_map,k,cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel))
{return not_found;
} else
{return k;
}
});
G__10222 = function(this_sym10209,k,not_found){
switch(arguments.length){
case 2:
return G__10222__2.call(this,this_sym10209,k);
case 3:
return G__10222__3.call(this,this_sym10209,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__10222;
})()
;
cljs.core.TransientHashSet.prototype.apply = (function (this_sym10206,args10207){
var this__10215 = this;
return this_sym10206.call.apply(this_sym10206,[this_sym10206].concat(args10207.slice()));
});
cljs.core.TransientHashSet.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (tcoll,v){
var this__10216 = this;
return tcoll.cljs$core$ILookup$_lookup$arity$3(tcoll,v,null);
});
cljs.core.TransientHashSet.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (tcoll,v,not_found){
var this__10217 = this;
if((cljs.core._lookup.call(null,this__10217.transient_map,v,cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel))
{return not_found;
} else
{return v;
}
});
cljs.core.TransientHashSet.prototype.cljs$core$ICounted$_count$arity$1 = (function (tcoll){
var this__10218 = this;
return cljs.core.count.call(null,this__10218.transient_map);
});
cljs.core.TransientHashSet.prototype.cljs$core$ITransientSet$_disjoin_BANG_$arity$2 = (function (tcoll,v){
var this__10219 = this;
this__10219.transient_map = cljs.core.dissoc_BANG_.call(null,this__10219.transient_map,v);
return tcoll;
});
cljs.core.TransientHashSet.prototype.cljs$core$ITransientCollection$_conj_BANG_$arity$2 = (function (tcoll,o){
var this__10220 = this;
this__10220.transient_map = cljs.core.assoc_BANG_.call(null,this__10220.transient_map,o,null);
return tcoll;
});
cljs.core.TransientHashSet.prototype.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 = (function (tcoll){
var this__10221 = this;
return (new cljs.core.PersistentHashSet(null,cljs.core.persistent_BANG_.call(null,this__10221.transient_map),null));
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
cljs.core.PersistentTreeSet.cljs$lang$ctorPrSeq = (function (this__3002__auto__){
return cljs.core.list.call(null,"cljs.core/PersistentTreeSet");
});
cljs.core.PersistentTreeSet.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__10225 = this;
var h__2885__auto____10226 = this__10225.__hash;
if(!((h__2885__auto____10226 == null)))
{return h__2885__auto____10226;
} else
{var h__2885__auto____10227 = cljs.core.hash_iset.call(null,coll);
this__10225.__hash = h__2885__auto____10227;
return h__2885__auto____10227;
}
});
cljs.core.PersistentTreeSet.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (coll,v){
var this__10228 = this;
return coll.cljs$core$ILookup$_lookup$arity$3(coll,v,null);
});
cljs.core.PersistentTreeSet.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (coll,v,not_found){
var this__10229 = this;
if(cljs.core.truth_(cljs.core._contains_key_QMARK_.call(null,this__10229.tree_map,v)))
{return v;
} else
{return not_found;
}
});
cljs.core.PersistentTreeSet.prototype.call = (function() {
var G__10255 = null;
var G__10255__2 = (function (this_sym10230,k){
var this__10232 = this;
var this_sym10230__10233 = this;
var coll__10234 = this_sym10230__10233;
return coll__10234.cljs$core$ILookup$_lookup$arity$2(coll__10234,k);
});
var G__10255__3 = (function (this_sym10231,k,not_found){
var this__10232 = this;
var this_sym10231__10235 = this;
var coll__10236 = this_sym10231__10235;
return coll__10236.cljs$core$ILookup$_lookup$arity$3(coll__10236,k,not_found);
});
G__10255 = function(this_sym10231,k,not_found){
switch(arguments.length){
case 2:
return G__10255__2.call(this,this_sym10231,k);
case 3:
return G__10255__3.call(this,this_sym10231,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__10255;
})()
;
cljs.core.PersistentTreeSet.prototype.apply = (function (this_sym10223,args10224){
var this__10237 = this;
return this_sym10223.call.apply(this_sym10223,[this_sym10223].concat(args10224.slice()));
});
cljs.core.PersistentTreeSet.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__10238 = this;
return (new cljs.core.PersistentTreeSet(this__10238.meta,cljs.core.assoc.call(null,this__10238.tree_map,o,null),null));
});
cljs.core.PersistentTreeSet.prototype.cljs$core$IReversible$_rseq$arity$1 = (function (coll){
var this__10239 = this;
return cljs.core.map.call(null,cljs.core.key,cljs.core.rseq.call(null,this__10239.tree_map));
});
cljs.core.PersistentTreeSet.prototype.toString = (function (){
var this__10240 = this;
var this__10241 = this;
return cljs.core.pr_str.call(null,this__10241);
});
cljs.core.PersistentTreeSet.prototype.cljs$core$ISorted$_sorted_seq$arity$2 = (function (coll,ascending_QMARK_){
var this__10242 = this;
return cljs.core.map.call(null,cljs.core.key,cljs.core._sorted_seq.call(null,this__10242.tree_map,ascending_QMARK_));
});
cljs.core.PersistentTreeSet.prototype.cljs$core$ISorted$_sorted_seq_from$arity$3 = (function (coll,k,ascending_QMARK_){
var this__10243 = this;
return cljs.core.map.call(null,cljs.core.key,cljs.core._sorted_seq_from.call(null,this__10243.tree_map,k,ascending_QMARK_));
});
cljs.core.PersistentTreeSet.prototype.cljs$core$ISorted$_entry_key$arity$2 = (function (coll,entry){
var this__10244 = this;
return entry;
});
cljs.core.PersistentTreeSet.prototype.cljs$core$ISorted$_comparator$arity$1 = (function (coll){
var this__10245 = this;
return cljs.core._comparator.call(null,this__10245.tree_map);
});
cljs.core.PersistentTreeSet.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__10246 = this;
return cljs.core.keys.call(null,this__10246.tree_map);
});
cljs.core.PersistentTreeSet.prototype.cljs$core$ISet$_disjoin$arity$2 = (function (coll,v){
var this__10247 = this;
return (new cljs.core.PersistentTreeSet(this__10247.meta,cljs.core.dissoc.call(null,this__10247.tree_map,v),null));
});
cljs.core.PersistentTreeSet.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__10248 = this;
return cljs.core.count.call(null,this__10248.tree_map);
});
cljs.core.PersistentTreeSet.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__10249 = this;
var and__3822__auto____10250 = cljs.core.set_QMARK_.call(null,other);
if(and__3822__auto____10250)
{var and__3822__auto____10251 = (cljs.core.count.call(null,coll) === cljs.core.count.call(null,other));
if(and__3822__auto____10251)
{return cljs.core.every_QMARK_.call(null,(function (p1__10205_SHARP_){
return cljs.core.contains_QMARK_.call(null,coll,p1__10205_SHARP_);
}),other);
} else
{return and__3822__auto____10251;
}
} else
{return and__3822__auto____10250;
}
});
cljs.core.PersistentTreeSet.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__10252 = this;
return (new cljs.core.PersistentTreeSet(meta,this__10252.tree_map,this__10252.__hash));
});
cljs.core.PersistentTreeSet.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__10253 = this;
return this__10253.meta;
});
cljs.core.PersistentTreeSet.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__10254 = this;
return cljs.core.with_meta.call(null,cljs.core.PersistentTreeSet.EMPTY,this__10254.meta);
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
var G__10260__delegate = function (keys){
var in__10258 = cljs.core.seq.call(null,keys);
var out__10259 = cljs.core.transient$.call(null,cljs.core.PersistentHashSet.EMPTY);
while(true){
if(cljs.core.seq.call(null,in__10258))
{{
var G__10261 = cljs.core.next.call(null,in__10258);
var G__10262 = cljs.core.conj_BANG_.call(null,out__10259,cljs.core.first.call(null,in__10258));
in__10258 = G__10261;
out__10259 = G__10262;
continue;
}
} else
{return cljs.core.persistent_BANG_.call(null,out__10259);
}
break;
}
};
var G__10260 = function (var_args){
var keys = null;
if (goog.isDef(var_args)) {
  keys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__10260__delegate.call(this, keys);
};
G__10260.cljs$lang$maxFixedArity = 0;
G__10260.cljs$lang$applyTo = (function (arglist__10263){
var keys = cljs.core.seq(arglist__10263);;
return G__10260__delegate(keys);
});
G__10260.cljs$lang$arity$variadic = G__10260__delegate;
return G__10260;
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
sorted_set.cljs$lang$applyTo = (function (arglist__10264){
var keys = cljs.core.seq(arglist__10264);;
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
sorted_set_by.cljs$lang$applyTo = (function (arglist__10266){
var comparator = cljs.core.first(arglist__10266);
var keys = cljs.core.rest(arglist__10266);
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
{var n__10272 = cljs.core.count.call(null,coll);
return cljs.core.reduce.call(null,(function (v,i){
var temp__3971__auto____10273 = cljs.core.find.call(null,smap,cljs.core.nth.call(null,v,i));
if(cljs.core.truth_(temp__3971__auto____10273))
{var e__10274 = temp__3971__auto____10273;
return cljs.core.assoc.call(null,v,i,cljs.core.second.call(null,e__10274));
} else
{return v;
}
}),coll,cljs.core.take.call(null,n__10272,cljs.core.iterate.call(null,cljs.core.inc,0)));
} else
{return cljs.core.map.call(null,(function (p1__10265_SHARP_){
var temp__3971__auto____10275 = cljs.core.find.call(null,smap,p1__10265_SHARP_);
if(cljs.core.truth_(temp__3971__auto____10275))
{var e__10276 = temp__3971__auto____10275;
return cljs.core.second.call(null,e__10276);
} else
{return p1__10265_SHARP_;
}
}),coll);
}
});
/**
* Returns a lazy sequence of the elements of coll with duplicates removed
*/
cljs.core.distinct = (function distinct(coll){
var step__10306 = (function step(xs,seen){
return (new cljs.core.LazySeq(null,false,(function (){
return (function (p__10299,seen){
while(true){
var vec__10300__10301 = p__10299;
var f__10302 = cljs.core.nth.call(null,vec__10300__10301,0,null);
var xs__10303 = vec__10300__10301;
var temp__3974__auto____10304 = cljs.core.seq.call(null,xs__10303);
if(temp__3974__auto____10304)
{var s__10305 = temp__3974__auto____10304;
if(cljs.core.contains_QMARK_.call(null,seen,f__10302))
{{
var G__10307 = cljs.core.rest.call(null,s__10305);
var G__10308 = seen;
p__10299 = G__10307;
seen = G__10308;
continue;
}
} else
{return cljs.core.cons.call(null,f__10302,step.call(null,cljs.core.rest.call(null,s__10305),cljs.core.conj.call(null,seen,f__10302)));
}
} else
{return null;
}
break;
}
}).call(null,xs,seen);
}),null));
});
return step__10306.call(null,coll,cljs.core.PersistentHashSet.EMPTY);
});
cljs.core.butlast = (function butlast(s){
var ret__10311 = cljs.core.PersistentVector.EMPTY;
var s__10312 = s;
while(true){
if(cljs.core.next.call(null,s__10312))
{{
var G__10313 = cljs.core.conj.call(null,ret__10311,cljs.core.first.call(null,s__10312));
var G__10314 = cljs.core.next.call(null,s__10312);
ret__10311 = G__10313;
s__10312 = G__10314;
continue;
}
} else
{return cljs.core.seq.call(null,ret__10311);
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
{if((function (){var or__3824__auto____10317 = cljs.core.keyword_QMARK_.call(null,x);
if(or__3824__auto____10317)
{return or__3824__auto____10317;
} else
{return cljs.core.symbol_QMARK_.call(null,x);
}
})())
{var i__10318 = x.lastIndexOf("/");
if((i__10318 < 0))
{return cljs.core.subs.call(null,x,2);
} else
{return cljs.core.subs.call(null,x,(i__10318 + 1));
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
if((function (){var or__3824__auto____10321 = cljs.core.keyword_QMARK_.call(null,x);
if(or__3824__auto____10321)
{return or__3824__auto____10321;
} else
{return cljs.core.symbol_QMARK_.call(null,x);
}
})())
{var i__10322 = x.lastIndexOf("/");
if((i__10322 > -1))
{return cljs.core.subs.call(null,x,2,i__10322);
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
var map__10329 = cljs.core.ObjMap.EMPTY;
var ks__10330 = cljs.core.seq.call(null,keys);
var vs__10331 = cljs.core.seq.call(null,vals);
while(true){
if((function (){var and__3822__auto____10332 = ks__10330;
if(and__3822__auto____10332)
{return vs__10331;
} else
{return and__3822__auto____10332;
}
})())
{{
var G__10333 = cljs.core.assoc.call(null,map__10329,cljs.core.first.call(null,ks__10330),cljs.core.first.call(null,vs__10331));
var G__10334 = cljs.core.next.call(null,ks__10330);
var G__10335 = cljs.core.next.call(null,vs__10331);
map__10329 = G__10333;
ks__10330 = G__10334;
vs__10331 = G__10335;
continue;
}
} else
{return map__10329;
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
var G__10338__delegate = function (k,x,y,more){
return cljs.core.reduce.call(null,(function (p1__10323_SHARP_,p2__10324_SHARP_){
return max_key.call(null,k,p1__10323_SHARP_,p2__10324_SHARP_);
}),max_key.call(null,k,x,y),more);
};
var G__10338 = function (k,x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__10338__delegate.call(this, k, x, y, more);
};
G__10338.cljs$lang$maxFixedArity = 3;
G__10338.cljs$lang$applyTo = (function (arglist__10339){
var k = cljs.core.first(arglist__10339);
var x = cljs.core.first(cljs.core.next(arglist__10339));
var y = cljs.core.first(cljs.core.next(cljs.core.next(arglist__10339)));
var more = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__10339)));
return G__10338__delegate(k, x, y, more);
});
G__10338.cljs$lang$arity$variadic = G__10338__delegate;
return G__10338;
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
var G__10340__delegate = function (k,x,y,more){
return cljs.core.reduce.call(null,(function (p1__10336_SHARP_,p2__10337_SHARP_){
return min_key.call(null,k,p1__10336_SHARP_,p2__10337_SHARP_);
}),min_key.call(null,k,x,y),more);
};
var G__10340 = function (k,x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__10340__delegate.call(this, k, x, y, more);
};
G__10340.cljs$lang$maxFixedArity = 3;
G__10340.cljs$lang$applyTo = (function (arglist__10341){
var k = cljs.core.first(arglist__10341);
var x = cljs.core.first(cljs.core.next(arglist__10341));
var y = cljs.core.first(cljs.core.next(cljs.core.next(arglist__10341)));
var more = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__10341)));
return G__10340__delegate(k, x, y, more);
});
G__10340.cljs$lang$arity$variadic = G__10340__delegate;
return G__10340;
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
var temp__3974__auto____10344 = cljs.core.seq.call(null,coll);
if(temp__3974__auto____10344)
{var s__10345 = temp__3974__auto____10344;
return cljs.core.cons.call(null,cljs.core.take.call(null,n,s__10345),partition_all.call(null,n,step,cljs.core.drop.call(null,step,s__10345)));
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
var temp__3974__auto____10348 = cljs.core.seq.call(null,coll);
if(temp__3974__auto____10348)
{var s__10349 = temp__3974__auto____10348;
if(cljs.core.truth_(pred.call(null,cljs.core.first.call(null,s__10349))))
{return cljs.core.cons.call(null,cljs.core.first.call(null,s__10349),take_while.call(null,pred,cljs.core.rest.call(null,s__10349)));
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
var comp__10351 = cljs.core._comparator.call(null,sc);
return test.call(null,comp__10351.call(null,cljs.core._entry_key.call(null,sc,e),key),0);
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
var include__10363 = cljs.core.mk_bound_fn.call(null,sc,test,key);
if(cljs.core.truth_(cljs.core.PersistentHashSet.fromArray([cljs.core._GT_,cljs.core._GT__EQ_]).call(null,test)))
{var temp__3974__auto____10364 = cljs.core._sorted_seq_from.call(null,sc,key,true);
if(cljs.core.truth_(temp__3974__auto____10364))
{var vec__10365__10366 = temp__3974__auto____10364;
var e__10367 = cljs.core.nth.call(null,vec__10365__10366,0,null);
var s__10368 = vec__10365__10366;
if(cljs.core.truth_(include__10363.call(null,e__10367)))
{return s__10368;
} else
{return cljs.core.next.call(null,s__10368);
}
} else
{return null;
}
} else
{return cljs.core.take_while.call(null,include__10363,cljs.core._sorted_seq.call(null,sc,true));
}
});
var subseq__5 = (function (sc,start_test,start_key,end_test,end_key){
var temp__3974__auto____10369 = cljs.core._sorted_seq_from.call(null,sc,start_key,true);
if(cljs.core.truth_(temp__3974__auto____10369))
{var vec__10370__10371 = temp__3974__auto____10369;
var e__10372 = cljs.core.nth.call(null,vec__10370__10371,0,null);
var s__10373 = vec__10370__10371;
return cljs.core.take_while.call(null,cljs.core.mk_bound_fn.call(null,sc,end_test,end_key),(cljs.core.truth_(cljs.core.mk_bound_fn.call(null,sc,start_test,start_key).call(null,e__10372))?s__10373:cljs.core.next.call(null,s__10373)));
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
var include__10385 = cljs.core.mk_bound_fn.call(null,sc,test,key);
if(cljs.core.truth_(cljs.core.PersistentHashSet.fromArray([cljs.core._LT_,cljs.core._LT__EQ_]).call(null,test)))
{var temp__3974__auto____10386 = cljs.core._sorted_seq_from.call(null,sc,key,false);
if(cljs.core.truth_(temp__3974__auto____10386))
{var vec__10387__10388 = temp__3974__auto____10386;
var e__10389 = cljs.core.nth.call(null,vec__10387__10388,0,null);
var s__10390 = vec__10387__10388;
if(cljs.core.truth_(include__10385.call(null,e__10389)))
{return s__10390;
} else
{return cljs.core.next.call(null,s__10390);
}
} else
{return null;
}
} else
{return cljs.core.take_while.call(null,include__10385,cljs.core._sorted_seq.call(null,sc,false));
}
});
var rsubseq__5 = (function (sc,start_test,start_key,end_test,end_key){
var temp__3974__auto____10391 = cljs.core._sorted_seq_from.call(null,sc,end_key,false);
if(cljs.core.truth_(temp__3974__auto____10391))
{var vec__10392__10393 = temp__3974__auto____10391;
var e__10394 = cljs.core.nth.call(null,vec__10392__10393,0,null);
var s__10395 = vec__10392__10393;
return cljs.core.take_while.call(null,cljs.core.mk_bound_fn.call(null,sc,start_test,start_key),(cljs.core.truth_(cljs.core.mk_bound_fn.call(null,sc,end_test,end_key).call(null,e__10394))?s__10395:cljs.core.next.call(null,s__10395)));
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
cljs.core.Range.cljs$lang$ctorPrSeq = (function (this__3002__auto__){
return cljs.core.list.call(null,"cljs.core/Range");
});
cljs.core.Range.prototype.cljs$core$IHash$_hash$arity$1 = (function (rng){
var this__10396 = this;
var h__2885__auto____10397 = this__10396.__hash;
if(!((h__2885__auto____10397 == null)))
{return h__2885__auto____10397;
} else
{var h__2885__auto____10398 = cljs.core.hash_coll.call(null,rng);
this__10396.__hash = h__2885__auto____10398;
return h__2885__auto____10398;
}
});
cljs.core.Range.prototype.cljs$core$INext$_next$arity$1 = (function (rng){
var this__10399 = this;
if((this__10399.step > 0))
{if(((this__10399.start + this__10399.step) < this__10399.end))
{return (new cljs.core.Range(this__10399.meta,(this__10399.start + this__10399.step),this__10399.end,this__10399.step,null));
} else
{return null;
}
} else
{if(((this__10399.start + this__10399.step) > this__10399.end))
{return (new cljs.core.Range(this__10399.meta,(this__10399.start + this__10399.step),this__10399.end,this__10399.step,null));
} else
{return null;
}
}
});
cljs.core.Range.prototype.cljs$core$ICollection$_conj$arity$2 = (function (rng,o){
var this__10400 = this;
return cljs.core.cons.call(null,o,rng);
});
cljs.core.Range.prototype.toString = (function (){
var this__10401 = this;
var this__10402 = this;
return cljs.core.pr_str.call(null,this__10402);
});
cljs.core.Range.prototype.cljs$core$IReduce$_reduce$arity$2 = (function (rng,f){
var this__10403 = this;
return cljs.core.ci_reduce.call(null,rng,f);
});
cljs.core.Range.prototype.cljs$core$IReduce$_reduce$arity$3 = (function (rng,f,s){
var this__10404 = this;
return cljs.core.ci_reduce.call(null,rng,f,s);
});
cljs.core.Range.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (rng){
var this__10405 = this;
if((this__10405.step > 0))
{if((this__10405.start < this__10405.end))
{return rng;
} else
{return null;
}
} else
{if((this__10405.start > this__10405.end))
{return rng;
} else
{return null;
}
}
});
cljs.core.Range.prototype.cljs$core$ICounted$_count$arity$1 = (function (rng){
var this__10406 = this;
if(cljs.core.not.call(null,rng.cljs$core$ISeqable$_seq$arity$1(rng)))
{return 0;
} else
{return Math.ceil(((this__10406.end - this__10406.start) / this__10406.step));
}
});
cljs.core.Range.prototype.cljs$core$ISeq$_first$arity$1 = (function (rng){
var this__10407 = this;
return this__10407.start;
});
cljs.core.Range.prototype.cljs$core$ISeq$_rest$arity$1 = (function (rng){
var this__10408 = this;
if(!((rng.cljs$core$ISeqable$_seq$arity$1(rng) == null)))
{return (new cljs.core.Range(this__10408.meta,(this__10408.start + this__10408.step),this__10408.end,this__10408.step,null));
} else
{return cljs.core.List.EMPTY;
}
});
cljs.core.Range.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (rng,other){
var this__10409 = this;
return cljs.core.equiv_sequential.call(null,rng,other);
});
cljs.core.Range.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (rng,meta){
var this__10410 = this;
return (new cljs.core.Range(meta,this__10410.start,this__10410.end,this__10410.step,this__10410.__hash));
});
cljs.core.Range.prototype.cljs$core$IMeta$_meta$arity$1 = (function (rng){
var this__10411 = this;
return this__10411.meta;
});
cljs.core.Range.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (rng,n){
var this__10412 = this;
if((n < rng.cljs$core$ICounted$_count$arity$1(rng)))
{return (this__10412.start + (n * this__10412.step));
} else
{if((function (){var and__3822__auto____10413 = (this__10412.start > this__10412.end);
if(and__3822__auto____10413)
{return (this__10412.step === 0);
} else
{return and__3822__auto____10413;
}
})())
{return this__10412.start;
} else
{throw (new Error("Index out of bounds"));
}
}
});
cljs.core.Range.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (rng,n,not_found){
var this__10414 = this;
if((n < rng.cljs$core$ICounted$_count$arity$1(rng)))
{return (this__10414.start + (n * this__10414.step));
} else
{if((function (){var and__3822__auto____10415 = (this__10414.start > this__10414.end);
if(and__3822__auto____10415)
{return (this__10414.step === 0);
} else
{return and__3822__auto____10415;
}
})())
{return this__10414.start;
} else
{return not_found;
}
}
});
cljs.core.Range.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (rng){
var this__10416 = this;
return cljs.core.with_meta.call(null,cljs.core.List.EMPTY,this__10416.meta);
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
var temp__3974__auto____10419 = cljs.core.seq.call(null,coll);
if(temp__3974__auto____10419)
{var s__10420 = temp__3974__auto____10419;
return cljs.core.cons.call(null,cljs.core.first.call(null,s__10420),take_nth.call(null,n,cljs.core.drop.call(null,n,s__10420)));
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
var temp__3974__auto____10427 = cljs.core.seq.call(null,coll);
if(temp__3974__auto____10427)
{var s__10428 = temp__3974__auto____10427;
var fst__10429 = cljs.core.first.call(null,s__10428);
var fv__10430 = f.call(null,fst__10429);
var run__10431 = cljs.core.cons.call(null,fst__10429,cljs.core.take_while.call(null,(function (p1__10421_SHARP_){
return cljs.core._EQ_.call(null,fv__10430,f.call(null,p1__10421_SHARP_));
}),cljs.core.next.call(null,s__10428)));
return cljs.core.cons.call(null,run__10431,partition_by.call(null,f,cljs.core.seq.call(null,cljs.core.drop.call(null,cljs.core.count.call(null,run__10431),s__10428))));
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
var temp__3971__auto____10446 = cljs.core.seq.call(null,coll);
if(temp__3971__auto____10446)
{var s__10447 = temp__3971__auto____10446;
return reductions.call(null,f,cljs.core.first.call(null,s__10447),cljs.core.rest.call(null,s__10447));
} else
{return cljs.core.list.call(null,f.call(null));
}
}),null));
});
var reductions__3 = (function (f,init,coll){
return cljs.core.cons.call(null,init,(new cljs.core.LazySeq(null,false,(function (){
var temp__3974__auto____10448 = cljs.core.seq.call(null,coll);
if(temp__3974__auto____10448)
{var s__10449 = temp__3974__auto____10448;
return reductions.call(null,f,f.call(null,init,cljs.core.first.call(null,s__10449)),cljs.core.rest.call(null,s__10449));
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
var G__10452 = null;
var G__10452__0 = (function (){
return cljs.core.vector.call(null,f.call(null));
});
var G__10452__1 = (function (x){
return cljs.core.vector.call(null,f.call(null,x));
});
var G__10452__2 = (function (x,y){
return cljs.core.vector.call(null,f.call(null,x,y));
});
var G__10452__3 = (function (x,y,z){
return cljs.core.vector.call(null,f.call(null,x,y,z));
});
var G__10452__4 = (function() { 
var G__10453__delegate = function (x,y,z,args){
return cljs.core.vector.call(null,cljs.core.apply.call(null,f,x,y,z,args));
};
var G__10453 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__10453__delegate.call(this, x, y, z, args);
};
G__10453.cljs$lang$maxFixedArity = 3;
G__10453.cljs$lang$applyTo = (function (arglist__10454){
var x = cljs.core.first(arglist__10454);
var y = cljs.core.first(cljs.core.next(arglist__10454));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__10454)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__10454)));
return G__10453__delegate(x, y, z, args);
});
G__10453.cljs$lang$arity$variadic = G__10453__delegate;
return G__10453;
})()
;
G__10452 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case 0:
return G__10452__0.call(this);
case 1:
return G__10452__1.call(this,x);
case 2:
return G__10452__2.call(this,x,y);
case 3:
return G__10452__3.call(this,x,y,z);
default:
return G__10452__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
G__10452.cljs$lang$maxFixedArity = 3;
G__10452.cljs$lang$applyTo = G__10452__4.cljs$lang$applyTo;
return G__10452;
})()
});
var juxt__2 = (function (f,g){
return (function() {
var G__10455 = null;
var G__10455__0 = (function (){
return cljs.core.vector.call(null,f.call(null),g.call(null));
});
var G__10455__1 = (function (x){
return cljs.core.vector.call(null,f.call(null,x),g.call(null,x));
});
var G__10455__2 = (function (x,y){
return cljs.core.vector.call(null,f.call(null,x,y),g.call(null,x,y));
});
var G__10455__3 = (function (x,y,z){
return cljs.core.vector.call(null,f.call(null,x,y,z),g.call(null,x,y,z));
});
var G__10455__4 = (function() { 
var G__10456__delegate = function (x,y,z,args){
return cljs.core.vector.call(null,cljs.core.apply.call(null,f,x,y,z,args),cljs.core.apply.call(null,g,x,y,z,args));
};
var G__10456 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__10456__delegate.call(this, x, y, z, args);
};
G__10456.cljs$lang$maxFixedArity = 3;
G__10456.cljs$lang$applyTo = (function (arglist__10457){
var x = cljs.core.first(arglist__10457);
var y = cljs.core.first(cljs.core.next(arglist__10457));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__10457)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__10457)));
return G__10456__delegate(x, y, z, args);
});
G__10456.cljs$lang$arity$variadic = G__10456__delegate;
return G__10456;
})()
;
G__10455 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case 0:
return G__10455__0.call(this);
case 1:
return G__10455__1.call(this,x);
case 2:
return G__10455__2.call(this,x,y);
case 3:
return G__10455__3.call(this,x,y,z);
default:
return G__10455__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
G__10455.cljs$lang$maxFixedArity = 3;
G__10455.cljs$lang$applyTo = G__10455__4.cljs$lang$applyTo;
return G__10455;
})()
});
var juxt__3 = (function (f,g,h){
return (function() {
var G__10458 = null;
var G__10458__0 = (function (){
return cljs.core.vector.call(null,f.call(null),g.call(null),h.call(null));
});
var G__10458__1 = (function (x){
return cljs.core.vector.call(null,f.call(null,x),g.call(null,x),h.call(null,x));
});
var G__10458__2 = (function (x,y){
return cljs.core.vector.call(null,f.call(null,x,y),g.call(null,x,y),h.call(null,x,y));
});
var G__10458__3 = (function (x,y,z){
return cljs.core.vector.call(null,f.call(null,x,y,z),g.call(null,x,y,z),h.call(null,x,y,z));
});
var G__10458__4 = (function() { 
var G__10459__delegate = function (x,y,z,args){
return cljs.core.vector.call(null,cljs.core.apply.call(null,f,x,y,z,args),cljs.core.apply.call(null,g,x,y,z,args),cljs.core.apply.call(null,h,x,y,z,args));
};
var G__10459 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__10459__delegate.call(this, x, y, z, args);
};
G__10459.cljs$lang$maxFixedArity = 3;
G__10459.cljs$lang$applyTo = (function (arglist__10460){
var x = cljs.core.first(arglist__10460);
var y = cljs.core.first(cljs.core.next(arglist__10460));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__10460)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__10460)));
return G__10459__delegate(x, y, z, args);
});
G__10459.cljs$lang$arity$variadic = G__10459__delegate;
return G__10459;
})()
;
G__10458 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case 0:
return G__10458__0.call(this);
case 1:
return G__10458__1.call(this,x);
case 2:
return G__10458__2.call(this,x,y);
case 3:
return G__10458__3.call(this,x,y,z);
default:
return G__10458__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
G__10458.cljs$lang$maxFixedArity = 3;
G__10458.cljs$lang$applyTo = G__10458__4.cljs$lang$applyTo;
return G__10458;
})()
});
var juxt__4 = (function() { 
var G__10461__delegate = function (f,g,h,fs){
var fs__10451 = cljs.core.list_STAR_.call(null,f,g,h,fs);
return (function() {
var G__10462 = null;
var G__10462__0 = (function (){
return cljs.core.reduce.call(null,(function (p1__10432_SHARP_,p2__10433_SHARP_){
return cljs.core.conj.call(null,p1__10432_SHARP_,p2__10433_SHARP_.call(null));
}),cljs.core.PersistentVector.EMPTY,fs__10451);
});
var G__10462__1 = (function (x){
return cljs.core.reduce.call(null,(function (p1__10434_SHARP_,p2__10435_SHARP_){
return cljs.core.conj.call(null,p1__10434_SHARP_,p2__10435_SHARP_.call(null,x));
}),cljs.core.PersistentVector.EMPTY,fs__10451);
});
var G__10462__2 = (function (x,y){
return cljs.core.reduce.call(null,(function (p1__10436_SHARP_,p2__10437_SHARP_){
return cljs.core.conj.call(null,p1__10436_SHARP_,p2__10437_SHARP_.call(null,x,y));
}),cljs.core.PersistentVector.EMPTY,fs__10451);
});
var G__10462__3 = (function (x,y,z){
return cljs.core.reduce.call(null,(function (p1__10438_SHARP_,p2__10439_SHARP_){
return cljs.core.conj.call(null,p1__10438_SHARP_,p2__10439_SHARP_.call(null,x,y,z));
}),cljs.core.PersistentVector.EMPTY,fs__10451);
});
var G__10462__4 = (function() { 
var G__10463__delegate = function (x,y,z,args){
return cljs.core.reduce.call(null,(function (p1__10440_SHARP_,p2__10441_SHARP_){
return cljs.core.conj.call(null,p1__10440_SHARP_,cljs.core.apply.call(null,p2__10441_SHARP_,x,y,z,args));
}),cljs.core.PersistentVector.EMPTY,fs__10451);
};
var G__10463 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__10463__delegate.call(this, x, y, z, args);
};
G__10463.cljs$lang$maxFixedArity = 3;
G__10463.cljs$lang$applyTo = (function (arglist__10464){
var x = cljs.core.first(arglist__10464);
var y = cljs.core.first(cljs.core.next(arglist__10464));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__10464)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__10464)));
return G__10463__delegate(x, y, z, args);
});
G__10463.cljs$lang$arity$variadic = G__10463__delegate;
return G__10463;
})()
;
G__10462 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case 0:
return G__10462__0.call(this);
case 1:
return G__10462__1.call(this,x);
case 2:
return G__10462__2.call(this,x,y);
case 3:
return G__10462__3.call(this,x,y,z);
default:
return G__10462__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
G__10462.cljs$lang$maxFixedArity = 3;
G__10462.cljs$lang$applyTo = G__10462__4.cljs$lang$applyTo;
return G__10462;
})()
};
var G__10461 = function (f,g,h,var_args){
var fs = null;
if (goog.isDef(var_args)) {
  fs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__10461__delegate.call(this, f, g, h, fs);
};
G__10461.cljs$lang$maxFixedArity = 3;
G__10461.cljs$lang$applyTo = (function (arglist__10465){
var f = cljs.core.first(arglist__10465);
var g = cljs.core.first(cljs.core.next(arglist__10465));
var h = cljs.core.first(cljs.core.next(cljs.core.next(arglist__10465)));
var fs = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__10465)));
return G__10461__delegate(f, g, h, fs);
});
G__10461.cljs$lang$arity$variadic = G__10461__delegate;
return G__10461;
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
var G__10468 = cljs.core.next.call(null,coll);
coll = G__10468;
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
if(cljs.core.truth_((function (){var and__3822__auto____10467 = cljs.core.seq.call(null,coll);
if(and__3822__auto____10467)
{return (n > 0);
} else
{return and__3822__auto____10467;
}
})()))
{{
var G__10469 = (n - 1);
var G__10470 = cljs.core.next.call(null,coll);
n = G__10469;
coll = G__10470;
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
var matches__10472 = re.exec(s);
if(cljs.core._EQ_.call(null,cljs.core.first.call(null,matches__10472),s))
{if((cljs.core.count.call(null,matches__10472) === 1))
{return cljs.core.first.call(null,matches__10472);
} else
{return cljs.core.vec.call(null,matches__10472);
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
var matches__10474 = re.exec(s);
if((matches__10474 == null))
{return null;
} else
{if((cljs.core.count.call(null,matches__10474) === 1))
{return cljs.core.first.call(null,matches__10474);
} else
{return cljs.core.vec.call(null,matches__10474);
}
}
});
/**
* Returns a lazy sequence of successive matches of re in s.
*/
cljs.core.re_seq = (function re_seq(re,s){
var match_data__10479 = cljs.core.re_find.call(null,re,s);
var match_idx__10480 = s.search(re);
var match_str__10481 = ((cljs.core.coll_QMARK_.call(null,match_data__10479))?cljs.core.first.call(null,match_data__10479):match_data__10479);
var post_match__10482 = cljs.core.subs.call(null,s,(match_idx__10480 + cljs.core.count.call(null,match_str__10481)));
if(cljs.core.truth_(match_data__10479))
{return (new cljs.core.LazySeq(null,false,(function (){
return cljs.core.cons.call(null,match_data__10479,re_seq.call(null,re,post_match__10482));
}),null));
} else
{return null;
}
});
/**
* Returns an instance of RegExp which has compiled the provided string.
*/
cljs.core.re_pattern = (function re_pattern(s){
var vec__10489__10490 = cljs.core.re_find.call(null,/^(?:\(\?([idmsux]*)\))?(.*)/,s);
var ___10491 = cljs.core.nth.call(null,vec__10489__10490,0,null);
var flags__10492 = cljs.core.nth.call(null,vec__10489__10490,1,null);
var pattern__10493 = cljs.core.nth.call(null,vec__10489__10490,2,null);
return (new RegExp(pattern__10493,flags__10492));
});
cljs.core.pr_sequential = (function pr_sequential(print_one,begin,sep,end,opts,coll){
return cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray([begin], true),cljs.core.flatten1.call(null,cljs.core.interpose.call(null,cljs.core.PersistentVector.fromArray([sep], true),cljs.core.map.call(null,(function (p1__10483_SHARP_){
return print_one.call(null,p1__10483_SHARP_,opts);
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
{return cljs.core.concat.call(null,(cljs.core.truth_((function (){var and__3822__auto____10503 = cljs.core._lookup.call(null,opts,"\uFDD0'meta",null);
if(cljs.core.truth_(and__3822__auto____10503))
{var and__3822__auto____10507 = (function (){var G__10504__10505 = obj;
if(G__10504__10505)
{if((function (){var or__3824__auto____10506 = (G__10504__10505.cljs$lang$protocol_mask$partition0$ & 131072);
if(or__3824__auto____10506)
{return or__3824__auto____10506;
} else
{return G__10504__10505.cljs$core$IMeta$;
}
})())
{return true;
} else
{if((!G__10504__10505.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IMeta,G__10504__10505);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IMeta,G__10504__10505);
}
})();
if(cljs.core.truth_(and__3822__auto____10507))
{return cljs.core.meta.call(null,obj);
} else
{return and__3822__auto____10507;
}
} else
{return and__3822__auto____10503;
}
})())?cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray(["^"], true),pr_seq.call(null,cljs.core.meta.call(null,obj),opts),cljs.core.PersistentVector.fromArray([" "], true)):null),(((function (){var and__3822__auto____10508 = !((obj == null));
if(and__3822__auto____10508)
{return obj.cljs$lang$type;
} else
{return and__3822__auto____10508;
}
})())?obj.cljs$lang$ctorPrSeq(obj):(((function (){var G__10509__10510 = obj;
if(G__10509__10510)
{if((function (){var or__3824__auto____10511 = (G__10509__10510.cljs$lang$protocol_mask$partition0$ & 536870912);
if(or__3824__auto____10511)
{return or__3824__auto____10511;
} else
{return G__10509__10510.cljs$core$IPrintable$;
}
})())
{return true;
} else
{if((!G__10509__10510.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IPrintable,G__10509__10510);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IPrintable,G__10509__10510);
}
})())?cljs.core._pr_seq.call(null,obj,opts):(cljs.core.truth_(cljs.core.regexp_QMARK_.call(null,obj))?cljs.core.list.call(null,"#\"",obj.source,"\""):(("\uFDD0'else")?cljs.core.list.call(null,"#<",[cljs.core.str(obj)].join(''),">"):null)))));
} else
{return null;
}
}
}
});
cljs.core.pr_sb = (function pr_sb(objs,opts){
var sb__10531 = (new goog.string.StringBuffer());
var G__10532__10533 = cljs.core.seq.call(null,cljs.core.pr_seq.call(null,cljs.core.first.call(null,objs),opts));
if(G__10532__10533)
{var string__10534 = cljs.core.first.call(null,G__10532__10533);
var G__10532__10535 = G__10532__10533;
while(true){
sb__10531.append(string__10534);
var temp__3974__auto____10536 = cljs.core.next.call(null,G__10532__10535);
if(temp__3974__auto____10536)
{var G__10532__10537 = temp__3974__auto____10536;
{
var G__10550 = cljs.core.first.call(null,G__10532__10537);
var G__10551 = G__10532__10537;
string__10534 = G__10550;
G__10532__10535 = G__10551;
continue;
}
} else
{}
break;
}
} else
{}
var G__10538__10539 = cljs.core.seq.call(null,cljs.core.next.call(null,objs));
if(G__10538__10539)
{var obj__10540 = cljs.core.first.call(null,G__10538__10539);
var G__10538__10541 = G__10538__10539;
while(true){
sb__10531.append(" ");
var G__10542__10543 = cljs.core.seq.call(null,cljs.core.pr_seq.call(null,obj__10540,opts));
if(G__10542__10543)
{var string__10544 = cljs.core.first.call(null,G__10542__10543);
var G__10542__10545 = G__10542__10543;
while(true){
sb__10531.append(string__10544);
var temp__3974__auto____10546 = cljs.core.next.call(null,G__10542__10545);
if(temp__3974__auto____10546)
{var G__10542__10547 = temp__3974__auto____10546;
{
var G__10552 = cljs.core.first.call(null,G__10542__10547);
var G__10553 = G__10542__10547;
string__10544 = G__10552;
G__10542__10545 = G__10553;
continue;
}
} else
{}
break;
}
} else
{}
var temp__3974__auto____10548 = cljs.core.next.call(null,G__10538__10541);
if(temp__3974__auto____10548)
{var G__10538__10549 = temp__3974__auto____10548;
{
var G__10554 = cljs.core.first.call(null,G__10538__10549);
var G__10555 = G__10538__10549;
obj__10540 = G__10554;
G__10538__10541 = G__10555;
continue;
}
} else
{}
break;
}
} else
{}
return sb__10531;
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
var sb__10557 = cljs.core.pr_sb.call(null,objs,opts);
sb__10557.append("\n");
return [cljs.core.str(sb__10557)].join('');
});
/**
* Prints a sequence of objects using string-print, observing all
* the options given in opts
*/
cljs.core.pr_with_opts = (function pr_with_opts(objs,opts){
var G__10576__10577 = cljs.core.seq.call(null,cljs.core.pr_seq.call(null,cljs.core.first.call(null,objs),opts));
if(G__10576__10577)
{var string__10578 = cljs.core.first.call(null,G__10576__10577);
var G__10576__10579 = G__10576__10577;
while(true){
cljs.core.string_print.call(null,string__10578);
var temp__3974__auto____10580 = cljs.core.next.call(null,G__10576__10579);
if(temp__3974__auto____10580)
{var G__10576__10581 = temp__3974__auto____10580;
{
var G__10594 = cljs.core.first.call(null,G__10576__10581);
var G__10595 = G__10576__10581;
string__10578 = G__10594;
G__10576__10579 = G__10595;
continue;
}
} else
{}
break;
}
} else
{}
var G__10582__10583 = cljs.core.seq.call(null,cljs.core.next.call(null,objs));
if(G__10582__10583)
{var obj__10584 = cljs.core.first.call(null,G__10582__10583);
var G__10582__10585 = G__10582__10583;
while(true){
cljs.core.string_print.call(null," ");
var G__10586__10587 = cljs.core.seq.call(null,cljs.core.pr_seq.call(null,obj__10584,opts));
if(G__10586__10587)
{var string__10588 = cljs.core.first.call(null,G__10586__10587);
var G__10586__10589 = G__10586__10587;
while(true){
cljs.core.string_print.call(null,string__10588);
var temp__3974__auto____10590 = cljs.core.next.call(null,G__10586__10589);
if(temp__3974__auto____10590)
{var G__10586__10591 = temp__3974__auto____10590;
{
var G__10596 = cljs.core.first.call(null,G__10586__10591);
var G__10597 = G__10586__10591;
string__10588 = G__10596;
G__10586__10589 = G__10597;
continue;
}
} else
{}
break;
}
} else
{}
var temp__3974__auto____10592 = cljs.core.next.call(null,G__10582__10585);
if(temp__3974__auto____10592)
{var G__10582__10593 = temp__3974__auto____10592;
{
var G__10598 = cljs.core.first.call(null,G__10582__10593);
var G__10599 = G__10582__10593;
obj__10584 = G__10598;
G__10582__10585 = G__10599;
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
pr_str.cljs$lang$applyTo = (function (arglist__10600){
var objs = cljs.core.seq(arglist__10600);;
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
prn_str.cljs$lang$applyTo = (function (arglist__10601){
var objs = cljs.core.seq(arglist__10601);;
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
pr.cljs$lang$applyTo = (function (arglist__10602){
var objs = cljs.core.seq(arglist__10602);;
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
cljs_core_print.cljs$lang$applyTo = (function (arglist__10603){
var objs = cljs.core.seq(arglist__10603);;
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
print_str.cljs$lang$applyTo = (function (arglist__10604){
var objs = cljs.core.seq(arglist__10604);;
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
println.cljs$lang$applyTo = (function (arglist__10605){
var objs = cljs.core.seq(arglist__10605);;
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
println_str.cljs$lang$applyTo = (function (arglist__10606){
var objs = cljs.core.seq(arglist__10606);;
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
prn.cljs$lang$applyTo = (function (arglist__10607){
var objs = cljs.core.seq(arglist__10607);;
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
printf.cljs$lang$applyTo = (function (arglist__10608){
var fmt = cljs.core.first(arglist__10608);
var args = cljs.core.rest(arglist__10608);
return printf__delegate(fmt, args);
});
printf.cljs$lang$arity$variadic = printf__delegate;
return printf;
})()
;
cljs.core.HashMap.prototype.cljs$core$IPrintable$ = true;
cljs.core.HashMap.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
var pr_pair__10609 = (function (keyval){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,""," ","",opts,keyval);
});
return cljs.core.pr_sequential.call(null,pr_pair__10609,"{",", ","}",opts,coll);
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
var pr_pair__10610 = (function (keyval){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,""," ","",opts,keyval);
});
return cljs.core.pr_sequential.call(null,pr_pair__10610,"{",", ","}",opts,coll);
});
cljs.core.PersistentArrayMap.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentArrayMap.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
var pr_pair__10611 = (function (keyval){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,""," ","",opts,keyval);
});
return cljs.core.pr_sequential.call(null,pr_pair__10611,"{",", ","}",opts,coll);
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
{return cljs.core.list.call(null,[cljs.core.str(":"),cljs.core.str((function (){var temp__3974__auto____10612 = cljs.core.namespace.call(null,obj);
if(cljs.core.truth_(temp__3974__auto____10612))
{var nspc__10613 = temp__3974__auto____10612;
return [cljs.core.str(nspc__10613),cljs.core.str("/")].join('');
} else
{return null;
}
})()),cljs.core.str(cljs.core.name.call(null,obj))].join(''));
} else
{if(cljs.core.symbol_QMARK_.call(null,obj))
{return cljs.core.list.call(null,[cljs.core.str((function (){var temp__3974__auto____10614 = cljs.core.namespace.call(null,obj);
if(cljs.core.truth_(temp__3974__auto____10614))
{var nspc__10615 = temp__3974__auto____10614;
return [cljs.core.str(nspc__10615),cljs.core.str("/")].join('');
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
var pr_pair__10616 = (function (keyval){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,""," ","",opts,keyval);
});
return cljs.core.pr_sequential.call(null,pr_pair__10616,"{",", ","}",opts,coll);
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
var normalize__10618 = (function (n,len){
var ns__10617 = [cljs.core.str(n)].join('');
while(true){
if((cljs.core.count.call(null,ns__10617) < len))
{{
var G__10620 = [cljs.core.str("0"),cljs.core.str(ns__10617)].join('');
ns__10617 = G__10620;
continue;
}
} else
{return ns__10617;
}
break;
}
});
return cljs.core.list.call(null,[cljs.core.str("#inst \""),cljs.core.str(d.getUTCFullYear()),cljs.core.str("-"),cljs.core.str(normalize__10618.call(null,(d.getUTCMonth() + 1),2)),cljs.core.str("-"),cljs.core.str(normalize__10618.call(null,d.getUTCDate(),2)),cljs.core.str("T"),cljs.core.str(normalize__10618.call(null,d.getUTCHours(),2)),cljs.core.str(":"),cljs.core.str(normalize__10618.call(null,d.getUTCMinutes(),2)),cljs.core.str(":"),cljs.core.str(normalize__10618.call(null,d.getUTCSeconds(),2)),cljs.core.str("."),cljs.core.str(normalize__10618.call(null,d.getUTCMilliseconds(),3)),cljs.core.str("-"),cljs.core.str("00:00\"")].join(''));
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
var pr_pair__10619 = (function (keyval){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,""," ","",opts,keyval);
});
return cljs.core.pr_sequential.call(null,pr_pair__10619,"{",", ","}",opts,coll);
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
cljs.core.Atom.cljs$lang$ctorPrSeq = (function (this__3002__auto__){
return cljs.core.list.call(null,"cljs.core/Atom");
});
cljs.core.Atom.prototype.cljs$core$IHash$_hash$arity$1 = (function (this$){
var this__10621 = this;
return goog.getUid(this$);
});
cljs.core.Atom.prototype.cljs$core$IWatchable$_notify_watches$arity$3 = (function (this$,oldval,newval){
var this__10622 = this;
var G__10623__10624 = cljs.core.seq.call(null,this__10622.watches);
if(G__10623__10624)
{var G__10626__10628 = cljs.core.first.call(null,G__10623__10624);
var vec__10627__10629 = G__10626__10628;
var key__10630 = cljs.core.nth.call(null,vec__10627__10629,0,null);
var f__10631 = cljs.core.nth.call(null,vec__10627__10629,1,null);
var G__10623__10632 = G__10623__10624;
var G__10626__10633 = G__10626__10628;
var G__10623__10634 = G__10623__10632;
while(true){
var vec__10635__10636 = G__10626__10633;
var key__10637 = cljs.core.nth.call(null,vec__10635__10636,0,null);
var f__10638 = cljs.core.nth.call(null,vec__10635__10636,1,null);
var G__10623__10639 = G__10623__10634;
f__10638.call(null,key__10637,this$,oldval,newval);
var temp__3974__auto____10640 = cljs.core.next.call(null,G__10623__10639);
if(temp__3974__auto____10640)
{var G__10623__10641 = temp__3974__auto____10640;
{
var G__10648 = cljs.core.first.call(null,G__10623__10641);
var G__10649 = G__10623__10641;
G__10626__10633 = G__10648;
G__10623__10634 = G__10649;
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
var this__10642 = this;
return this$.watches = cljs.core.assoc.call(null,this__10642.watches,key,f);
});
cljs.core.Atom.prototype.cljs$core$IWatchable$_remove_watch$arity$2 = (function (this$,key){
var this__10643 = this;
return this$.watches = cljs.core.dissoc.call(null,this__10643.watches,key);
});
cljs.core.Atom.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (a,opts){
var this__10644 = this;
return cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray(["#<Atom: "], true),cljs.core._pr_seq.call(null,this__10644.state,opts),">");
});
cljs.core.Atom.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_){
var this__10645 = this;
return this__10645.meta;
});
cljs.core.Atom.prototype.cljs$core$IDeref$_deref$arity$1 = (function (_){
var this__10646 = this;
return this__10646.state;
});
cljs.core.Atom.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (o,other){
var this__10647 = this;
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
var G__10661__delegate = function (x,p__10650){
var map__10656__10657 = p__10650;
var map__10656__10658 = ((cljs.core.seq_QMARK_.call(null,map__10656__10657))?cljs.core.apply.call(null,cljs.core.hash_map,map__10656__10657):map__10656__10657);
var validator__10659 = cljs.core._lookup.call(null,map__10656__10658,"\uFDD0'validator",null);
var meta__10660 = cljs.core._lookup.call(null,map__10656__10658,"\uFDD0'meta",null);
return (new cljs.core.Atom(x,meta__10660,validator__10659,null));
};
var G__10661 = function (x,var_args){
var p__10650 = null;
if (goog.isDef(var_args)) {
  p__10650 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return G__10661__delegate.call(this, x, p__10650);
};
G__10661.cljs$lang$maxFixedArity = 1;
G__10661.cljs$lang$applyTo = (function (arglist__10662){
var x = cljs.core.first(arglist__10662);
var p__10650 = cljs.core.rest(arglist__10662);
return G__10661__delegate(x, p__10650);
});
G__10661.cljs$lang$arity$variadic = G__10661__delegate;
return G__10661;
})()
;
atom = function(x,var_args){
var p__10650 = var_args;
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
var temp__3974__auto____10666 = a.validator;
if(cljs.core.truth_(temp__3974__auto____10666))
{var validate__10667 = temp__3974__auto____10666;
if(cljs.core.truth_(validate__10667.call(null,new_value)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("Validator rejected reference state"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'validate","\uFDD1'new-value"),cljs.core.hash_map("\uFDD0'line",6440))))].join('')));
}
} else
{}
var old_value__10668 = a.state;
a.state = new_value;
cljs.core._notify_watches.call(null,a,old_value__10668,new_value);
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
var G__10669__delegate = function (a,f,x,y,z,more){
return cljs.core.reset_BANG_.call(null,a,cljs.core.apply.call(null,f,a.state,x,y,z,more));
};
var G__10669 = function (a,f,x,y,z,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 5),0);
} 
return G__10669__delegate.call(this, a, f, x, y, z, more);
};
G__10669.cljs$lang$maxFixedArity = 5;
G__10669.cljs$lang$applyTo = (function (arglist__10670){
var a = cljs.core.first(arglist__10670);
var f = cljs.core.first(cljs.core.next(arglist__10670));
var x = cljs.core.first(cljs.core.next(cljs.core.next(arglist__10670)));
var y = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__10670))));
var z = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__10670)))));
var more = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__10670)))));
return G__10669__delegate(a, f, x, y, z, more);
});
G__10669.cljs$lang$arity$variadic = G__10669__delegate;
return G__10669;
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
alter_meta_BANG_.cljs$lang$applyTo = (function (arglist__10671){
var iref = cljs.core.first(arglist__10671);
var f = cljs.core.first(cljs.core.next(arglist__10671));
var args = cljs.core.rest(cljs.core.next(arglist__10671));
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
cljs.core.Delay.cljs$lang$ctorPrSeq = (function (this__3002__auto__){
return cljs.core.list.call(null,"cljs.core/Delay");
});
cljs.core.Delay.prototype.cljs$core$IPending$_realized_QMARK_$arity$1 = (function (d){
var this__10672 = this;
return (new cljs.core.Keyword("\uFDD0'done")).call(null,cljs.core.deref.call(null,this__10672.state));
});
cljs.core.Delay.prototype.cljs$core$IDeref$_deref$arity$1 = (function (_){
var this__10673 = this;
return (new cljs.core.Keyword("\uFDD0'value")).call(null,cljs.core.swap_BANG_.call(null,this__10673.state,(function (p__10674){
var map__10675__10676 = p__10674;
var map__10675__10677 = ((cljs.core.seq_QMARK_.call(null,map__10675__10676))?cljs.core.apply.call(null,cljs.core.hash_map,map__10675__10676):map__10675__10676);
var curr_state__10678 = map__10675__10677;
var done__10679 = cljs.core._lookup.call(null,map__10675__10677,"\uFDD0'done",null);
if(cljs.core.truth_(done__10679))
{return curr_state__10678;
} else
{return cljs.core.ObjMap.fromObject(["\uFDD0'done","\uFDD0'value"],{"\uFDD0'done":true,"\uFDD0'value":this__10673.f.call(null)});
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
var map__10700__10701 = options;
var map__10700__10702 = ((cljs.core.seq_QMARK_.call(null,map__10700__10701))?cljs.core.apply.call(null,cljs.core.hash_map,map__10700__10701):map__10700__10701);
var keywordize_keys__10703 = cljs.core._lookup.call(null,map__10700__10702,"\uFDD0'keywordize-keys",null);
var keyfn__10704 = (cljs.core.truth_(keywordize_keys__10703)?cljs.core.keyword:cljs.core.str);
var f__10719 = (function thisfn(x){
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
{return cljs.core.into.call(null,cljs.core.ObjMap.EMPTY,(function (){var iter__3155__auto____10718 = (function iter__10712(s__10713){
return (new cljs.core.LazySeq(null,false,(function (){
var s__10713__10716 = s__10713;
while(true){
if(cljs.core.seq.call(null,s__10713__10716))
{var k__10717 = cljs.core.first.call(null,s__10713__10716);
return cljs.core.cons.call(null,cljs.core.PersistentVector.fromArray([keyfn__10704.call(null,k__10717),thisfn.call(null,(x[k__10717]))], true),iter__10712.call(null,cljs.core.rest.call(null,s__10713__10716)));
} else
{return null;
}
break;
}
}),null));
});
return iter__3155__auto____10718.call(null,cljs.core.js_keys.call(null,x));
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
return f__10719.call(null,x);
};
var js__GT_clj = function (x,var_args){
var options = null;
if (goog.isDef(var_args)) {
  options = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return js__GT_clj__delegate.call(this, x, options);
};
js__GT_clj.cljs$lang$maxFixedArity = 1;
js__GT_clj.cljs$lang$applyTo = (function (arglist__10720){
var x = cljs.core.first(arglist__10720);
var options = cljs.core.rest(arglist__10720);
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
var mem__10725 = cljs.core.atom.call(null,cljs.core.ObjMap.EMPTY);
return (function() { 
var G__10729__delegate = function (args){
var temp__3971__auto____10726 = cljs.core._lookup.call(null,cljs.core.deref.call(null,mem__10725),args,null);
if(cljs.core.truth_(temp__3971__auto____10726))
{var v__10727 = temp__3971__auto____10726;
return v__10727;
} else
{var ret__10728 = cljs.core.apply.call(null,f,args);
cljs.core.swap_BANG_.call(null,mem__10725,cljs.core.assoc,args,ret__10728);
return ret__10728;
}
};
var G__10729 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__10729__delegate.call(this, args);
};
G__10729.cljs$lang$maxFixedArity = 0;
G__10729.cljs$lang$applyTo = (function (arglist__10730){
var args = cljs.core.seq(arglist__10730);;
return G__10729__delegate(args);
});
G__10729.cljs$lang$arity$variadic = G__10729__delegate;
return G__10729;
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
var ret__10732 = f.call(null);
if(cljs.core.fn_QMARK_.call(null,ret__10732))
{{
var G__10733 = ret__10732;
f = G__10733;
continue;
}
} else
{return ret__10732;
}
break;
}
});
var trampoline__2 = (function() { 
var G__10734__delegate = function (f,args){
return trampoline.call(null,(function (){
return cljs.core.apply.call(null,f,args);
}));
};
var G__10734 = function (f,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return G__10734__delegate.call(this, f, args);
};
G__10734.cljs$lang$maxFixedArity = 1;
G__10734.cljs$lang$applyTo = (function (arglist__10735){
var f = cljs.core.first(arglist__10735);
var args = cljs.core.rest(arglist__10735);
return G__10734__delegate(f, args);
});
G__10734.cljs$lang$arity$variadic = G__10734__delegate;
return G__10734;
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
var k__10737 = f.call(null,x);
return cljs.core.assoc.call(null,ret,k__10737,cljs.core.conj.call(null,cljs.core._lookup.call(null,ret,k__10737,cljs.core.PersistentVector.EMPTY),x));
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
var or__3824__auto____10746 = cljs.core._EQ_.call(null,child,parent);
if(or__3824__auto____10746)
{return or__3824__auto____10746;
} else
{var or__3824__auto____10747 = cljs.core.contains_QMARK_.call(null,(new cljs.core.Keyword("\uFDD0'ancestors")).call(null,h).call(null,child),parent);
if(or__3824__auto____10747)
{return or__3824__auto____10747;
} else
{var and__3822__auto____10748 = cljs.core.vector_QMARK_.call(null,parent);
if(and__3822__auto____10748)
{var and__3822__auto____10749 = cljs.core.vector_QMARK_.call(null,child);
if(and__3822__auto____10749)
{var and__3822__auto____10750 = (cljs.core.count.call(null,parent) === cljs.core.count.call(null,child));
if(and__3822__auto____10750)
{var ret__10751 = true;
var i__10752 = 0;
while(true){
if((function (){var or__3824__auto____10753 = cljs.core.not.call(null,ret__10751);
if(or__3824__auto____10753)
{return or__3824__auto____10753;
} else
{return (i__10752 === cljs.core.count.call(null,parent));
}
})())
{return ret__10751;
} else
{{
var G__10754 = isa_QMARK_.call(null,h,child.call(null,i__10752),parent.call(null,i__10752));
var G__10755 = (i__10752 + 1);
ret__10751 = G__10754;
i__10752 = G__10755;
continue;
}
}
break;
}
} else
{return and__3822__auto____10750;
}
} else
{return and__3822__auto____10749;
}
} else
{return and__3822__auto____10748;
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
var tp__10764 = (new cljs.core.Keyword("\uFDD0'parents")).call(null,h);
var td__10765 = (new cljs.core.Keyword("\uFDD0'descendants")).call(null,h);
var ta__10766 = (new cljs.core.Keyword("\uFDD0'ancestors")).call(null,h);
var tf__10767 = (function (m,source,sources,target,targets){
return cljs.core.reduce.call(null,(function (ret,k){
return cljs.core.assoc.call(null,ret,k,cljs.core.reduce.call(null,cljs.core.conj,cljs.core._lookup.call(null,targets,k,cljs.core.PersistentHashSet.EMPTY),cljs.core.cons.call(null,target,targets.call(null,target))));
}),m,cljs.core.cons.call(null,source,sources.call(null,source)));
});
var or__3824__auto____10768 = ((cljs.core.contains_QMARK_.call(null,tp__10764.call(null,tag),parent))?null:(function (){if(cljs.core.contains_QMARK_.call(null,ta__10766.call(null,tag),parent))
{throw (new Error([cljs.core.str(tag),cljs.core.str("already has"),cljs.core.str(parent),cljs.core.str("as ancestor")].join('')));
} else
{}
if(cljs.core.contains_QMARK_.call(null,ta__10766.call(null,parent),tag))
{throw (new Error([cljs.core.str("Cyclic derivation:"),cljs.core.str(parent),cljs.core.str("has"),cljs.core.str(tag),cljs.core.str("as ancestor")].join('')));
} else
{}
return cljs.core.ObjMap.fromObject(["\uFDD0'parents","\uFDD0'ancestors","\uFDD0'descendants"],{"\uFDD0'parents":cljs.core.assoc.call(null,(new cljs.core.Keyword("\uFDD0'parents")).call(null,h),tag,cljs.core.conj.call(null,cljs.core._lookup.call(null,tp__10764,tag,cljs.core.PersistentHashSet.EMPTY),parent)),"\uFDD0'ancestors":tf__10767.call(null,(new cljs.core.Keyword("\uFDD0'ancestors")).call(null,h),tag,td__10765,parent,ta__10766),"\uFDD0'descendants":tf__10767.call(null,(new cljs.core.Keyword("\uFDD0'descendants")).call(null,h),parent,ta__10766,tag,td__10765)});
})());
if(cljs.core.truth_(or__3824__auto____10768))
{return or__3824__auto____10768;
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
var parentMap__10773 = (new cljs.core.Keyword("\uFDD0'parents")).call(null,h);
var childsParents__10774 = (cljs.core.truth_(parentMap__10773.call(null,tag))?cljs.core.disj.call(null,parentMap__10773.call(null,tag),parent):cljs.core.PersistentHashSet.EMPTY);
var newParents__10775 = (cljs.core.truth_(cljs.core.not_empty.call(null,childsParents__10774))?cljs.core.assoc.call(null,parentMap__10773,tag,childsParents__10774):cljs.core.dissoc.call(null,parentMap__10773,tag));
var deriv_seq__10776 = cljs.core.flatten.call(null,cljs.core.map.call(null,(function (p1__10756_SHARP_){
return cljs.core.cons.call(null,cljs.core.first.call(null,p1__10756_SHARP_),cljs.core.interpose.call(null,cljs.core.first.call(null,p1__10756_SHARP_),cljs.core.second.call(null,p1__10756_SHARP_)));
}),cljs.core.seq.call(null,newParents__10775)));
if(cljs.core.contains_QMARK_.call(null,parentMap__10773.call(null,tag),parent))
{return cljs.core.reduce.call(null,(function (p1__10757_SHARP_,p2__10758_SHARP_){
return cljs.core.apply.call(null,cljs.core.derive,p1__10757_SHARP_,p2__10758_SHARP_);
}),cljs.core.make_hierarchy.call(null),cljs.core.partition.call(null,2,deriv_seq__10776));
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
var xprefs__10784 = cljs.core.deref.call(null,prefer_table).call(null,x);
var or__3824__auto____10786 = (cljs.core.truth_((function (){var and__3822__auto____10785 = xprefs__10784;
if(cljs.core.truth_(and__3822__auto____10785))
{return xprefs__10784.call(null,y);
} else
{return and__3822__auto____10785;
}
})())?true:null);
if(cljs.core.truth_(or__3824__auto____10786))
{return or__3824__auto____10786;
} else
{var or__3824__auto____10788 = (function (){var ps__10787 = cljs.core.parents.call(null,y);
while(true){
if((cljs.core.count.call(null,ps__10787) > 0))
{if(cljs.core.truth_(prefers_STAR_.call(null,x,cljs.core.first.call(null,ps__10787),prefer_table)))
{} else
{}
{
var G__10791 = cljs.core.rest.call(null,ps__10787);
ps__10787 = G__10791;
continue;
}
} else
{return null;
}
break;
}
})();
if(cljs.core.truth_(or__3824__auto____10788))
{return or__3824__auto____10788;
} else
{var or__3824__auto____10790 = (function (){var ps__10789 = cljs.core.parents.call(null,x);
while(true){
if((cljs.core.count.call(null,ps__10789) > 0))
{if(cljs.core.truth_(prefers_STAR_.call(null,cljs.core.first.call(null,ps__10789),y,prefer_table)))
{} else
{}
{
var G__10792 = cljs.core.rest.call(null,ps__10789);
ps__10789 = G__10792;
continue;
}
} else
{return null;
}
break;
}
})();
if(cljs.core.truth_(or__3824__auto____10790))
{return or__3824__auto____10790;
} else
{return false;
}
}
}
});
cljs.core.dominates = (function dominates(x,y,prefer_table){
var or__3824__auto____10794 = cljs.core.prefers_STAR_.call(null,x,y,prefer_table);
if(cljs.core.truth_(or__3824__auto____10794))
{return or__3824__auto____10794;
} else
{return cljs.core.isa_QMARK_.call(null,x,y);
}
});
cljs.core.find_and_cache_best_method = (function find_and_cache_best_method(name,dispatch_val,hierarchy,method_table,prefer_table,method_cache,cached_hierarchy){
var best_entry__10812 = cljs.core.reduce.call(null,(function (be,p__10804){
var vec__10805__10806 = p__10804;
var k__10807 = cljs.core.nth.call(null,vec__10805__10806,0,null);
var ___10808 = cljs.core.nth.call(null,vec__10805__10806,1,null);
var e__10809 = vec__10805__10806;
if(cljs.core.isa_QMARK_.call(null,dispatch_val,k__10807))
{var be2__10811 = (cljs.core.truth_((function (){var or__3824__auto____10810 = (be == null);
if(or__3824__auto____10810)
{return or__3824__auto____10810;
} else
{return cljs.core.dominates.call(null,k__10807,cljs.core.first.call(null,be),prefer_table);
}
})())?e__10809:be);
if(cljs.core.truth_(cljs.core.dominates.call(null,cljs.core.first.call(null,be2__10811),k__10807,prefer_table)))
{} else
{throw (new Error([cljs.core.str("Multiple methods in multimethod '"),cljs.core.str(name),cljs.core.str("' match dispatch value: "),cljs.core.str(dispatch_val),cljs.core.str(" -> "),cljs.core.str(k__10807),cljs.core.str(" and "),cljs.core.str(cljs.core.first.call(null,be2__10811)),cljs.core.str(", and neither is preferred")].join('')));
}
return be2__10811;
} else
{return be;
}
}),null,cljs.core.deref.call(null,method_table));
if(cljs.core.truth_(best_entry__10812))
{if(cljs.core._EQ_.call(null,cljs.core.deref.call(null,cached_hierarchy),cljs.core.deref.call(null,hierarchy)))
{cljs.core.swap_BANG_.call(null,method_cache,cljs.core.assoc,dispatch_val,cljs.core.second.call(null,best_entry__10812));
return cljs.core.second.call(null,best_entry__10812);
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
if((function (){var and__3822__auto____10817 = mf;
if(and__3822__auto____10817)
{return mf.cljs$core$IMultiFn$_reset$arity$1;
} else
{return and__3822__auto____10817;
}
})())
{return mf.cljs$core$IMultiFn$_reset$arity$1(mf);
} else
{var x__3056__auto____10818 = (((mf == null))?null:mf);
return (function (){var or__3824__auto____10819 = (cljs.core._reset[goog.typeOf(x__3056__auto____10818)]);
if(or__3824__auto____10819)
{return or__3824__auto____10819;
} else
{var or__3824__auto____10820 = (cljs.core._reset["_"]);
if(or__3824__auto____10820)
{return or__3824__auto____10820;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-reset",mf);
}
}
})().call(null,mf);
}
});
cljs.core._add_method = (function _add_method(mf,dispatch_val,method){
if((function (){var and__3822__auto____10825 = mf;
if(and__3822__auto____10825)
{return mf.cljs$core$IMultiFn$_add_method$arity$3;
} else
{return and__3822__auto____10825;
}
})())
{return mf.cljs$core$IMultiFn$_add_method$arity$3(mf,dispatch_val,method);
} else
{var x__3056__auto____10826 = (((mf == null))?null:mf);
return (function (){var or__3824__auto____10827 = (cljs.core._add_method[goog.typeOf(x__3056__auto____10826)]);
if(or__3824__auto____10827)
{return or__3824__auto____10827;
} else
{var or__3824__auto____10828 = (cljs.core._add_method["_"]);
if(or__3824__auto____10828)
{return or__3824__auto____10828;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-add-method",mf);
}
}
})().call(null,mf,dispatch_val,method);
}
});
cljs.core._remove_method = (function _remove_method(mf,dispatch_val){
if((function (){var and__3822__auto____10833 = mf;
if(and__3822__auto____10833)
{return mf.cljs$core$IMultiFn$_remove_method$arity$2;
} else
{return and__3822__auto____10833;
}
})())
{return mf.cljs$core$IMultiFn$_remove_method$arity$2(mf,dispatch_val);
} else
{var x__3056__auto____10834 = (((mf == null))?null:mf);
return (function (){var or__3824__auto____10835 = (cljs.core._remove_method[goog.typeOf(x__3056__auto____10834)]);
if(or__3824__auto____10835)
{return or__3824__auto____10835;
} else
{var or__3824__auto____10836 = (cljs.core._remove_method["_"]);
if(or__3824__auto____10836)
{return or__3824__auto____10836;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-remove-method",mf);
}
}
})().call(null,mf,dispatch_val);
}
});
cljs.core._prefer_method = (function _prefer_method(mf,dispatch_val,dispatch_val_y){
if((function (){var and__3822__auto____10841 = mf;
if(and__3822__auto____10841)
{return mf.cljs$core$IMultiFn$_prefer_method$arity$3;
} else
{return and__3822__auto____10841;
}
})())
{return mf.cljs$core$IMultiFn$_prefer_method$arity$3(mf,dispatch_val,dispatch_val_y);
} else
{var x__3056__auto____10842 = (((mf == null))?null:mf);
return (function (){var or__3824__auto____10843 = (cljs.core._prefer_method[goog.typeOf(x__3056__auto____10842)]);
if(or__3824__auto____10843)
{return or__3824__auto____10843;
} else
{var or__3824__auto____10844 = (cljs.core._prefer_method["_"]);
if(or__3824__auto____10844)
{return or__3824__auto____10844;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-prefer-method",mf);
}
}
})().call(null,mf,dispatch_val,dispatch_val_y);
}
});
cljs.core._get_method = (function _get_method(mf,dispatch_val){
if((function (){var and__3822__auto____10849 = mf;
if(and__3822__auto____10849)
{return mf.cljs$core$IMultiFn$_get_method$arity$2;
} else
{return and__3822__auto____10849;
}
})())
{return mf.cljs$core$IMultiFn$_get_method$arity$2(mf,dispatch_val);
} else
{var x__3056__auto____10850 = (((mf == null))?null:mf);
return (function (){var or__3824__auto____10851 = (cljs.core._get_method[goog.typeOf(x__3056__auto____10850)]);
if(or__3824__auto____10851)
{return or__3824__auto____10851;
} else
{var or__3824__auto____10852 = (cljs.core._get_method["_"]);
if(or__3824__auto____10852)
{return or__3824__auto____10852;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-get-method",mf);
}
}
})().call(null,mf,dispatch_val);
}
});
cljs.core._methods = (function _methods(mf){
if((function (){var and__3822__auto____10857 = mf;
if(and__3822__auto____10857)
{return mf.cljs$core$IMultiFn$_methods$arity$1;
} else
{return and__3822__auto____10857;
}
})())
{return mf.cljs$core$IMultiFn$_methods$arity$1(mf);
} else
{var x__3056__auto____10858 = (((mf == null))?null:mf);
return (function (){var or__3824__auto____10859 = (cljs.core._methods[goog.typeOf(x__3056__auto____10858)]);
if(or__3824__auto____10859)
{return or__3824__auto____10859;
} else
{var or__3824__auto____10860 = (cljs.core._methods["_"]);
if(or__3824__auto____10860)
{return or__3824__auto____10860;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-methods",mf);
}
}
})().call(null,mf);
}
});
cljs.core._prefers = (function _prefers(mf){
if((function (){var and__3822__auto____10865 = mf;
if(and__3822__auto____10865)
{return mf.cljs$core$IMultiFn$_prefers$arity$1;
} else
{return and__3822__auto____10865;
}
})())
{return mf.cljs$core$IMultiFn$_prefers$arity$1(mf);
} else
{var x__3056__auto____10866 = (((mf == null))?null:mf);
return (function (){var or__3824__auto____10867 = (cljs.core._prefers[goog.typeOf(x__3056__auto____10866)]);
if(or__3824__auto____10867)
{return or__3824__auto____10867;
} else
{var or__3824__auto____10868 = (cljs.core._prefers["_"]);
if(or__3824__auto____10868)
{return or__3824__auto____10868;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-prefers",mf);
}
}
})().call(null,mf);
}
});
cljs.core._dispatch = (function _dispatch(mf,args){
if((function (){var and__3822__auto____10873 = mf;
if(and__3822__auto____10873)
{return mf.cljs$core$IMultiFn$_dispatch$arity$2;
} else
{return and__3822__auto____10873;
}
})())
{return mf.cljs$core$IMultiFn$_dispatch$arity$2(mf,args);
} else
{var x__3056__auto____10874 = (((mf == null))?null:mf);
return (function (){var or__3824__auto____10875 = (cljs.core._dispatch[goog.typeOf(x__3056__auto____10874)]);
if(or__3824__auto____10875)
{return or__3824__auto____10875;
} else
{var or__3824__auto____10876 = (cljs.core._dispatch["_"]);
if(or__3824__auto____10876)
{return or__3824__auto____10876;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-dispatch",mf);
}
}
})().call(null,mf,args);
}
});
cljs.core.do_dispatch = (function do_dispatch(mf,dispatch_fn,args){
var dispatch_val__10879 = cljs.core.apply.call(null,dispatch_fn,args);
var target_fn__10880 = cljs.core._get_method.call(null,mf,dispatch_val__10879);
if(cljs.core.truth_(target_fn__10880))
{} else
{throw (new Error([cljs.core.str("No method in multimethod '"),cljs.core.str(cljs.core.name),cljs.core.str("' for dispatch value: "),cljs.core.str(dispatch_val__10879)].join('')));
}
return cljs.core.apply.call(null,target_fn__10880,args);
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
cljs.core.MultiFn.cljs$lang$ctorPrSeq = (function (this__3002__auto__){
return cljs.core.list.call(null,"cljs.core/MultiFn");
});
cljs.core.MultiFn.prototype.cljs$core$IHash$_hash$arity$1 = (function (this$){
var this__10881 = this;
return goog.getUid(this$);
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_reset$arity$1 = (function (mf){
var this__10882 = this;
cljs.core.swap_BANG_.call(null,this__10882.method_table,(function (mf){
return cljs.core.ObjMap.EMPTY;
}));
cljs.core.swap_BANG_.call(null,this__10882.method_cache,(function (mf){
return cljs.core.ObjMap.EMPTY;
}));
cljs.core.swap_BANG_.call(null,this__10882.prefer_table,(function (mf){
return cljs.core.ObjMap.EMPTY;
}));
cljs.core.swap_BANG_.call(null,this__10882.cached_hierarchy,(function (mf){
return null;
}));
return mf;
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_add_method$arity$3 = (function (mf,dispatch_val,method){
var this__10883 = this;
cljs.core.swap_BANG_.call(null,this__10883.method_table,cljs.core.assoc,dispatch_val,method);
cljs.core.reset_cache.call(null,this__10883.method_cache,this__10883.method_table,this__10883.cached_hierarchy,this__10883.hierarchy);
return mf;
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_remove_method$arity$2 = (function (mf,dispatch_val){
var this__10884 = this;
cljs.core.swap_BANG_.call(null,this__10884.method_table,cljs.core.dissoc,dispatch_val);
cljs.core.reset_cache.call(null,this__10884.method_cache,this__10884.method_table,this__10884.cached_hierarchy,this__10884.hierarchy);
return mf;
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_get_method$arity$2 = (function (mf,dispatch_val){
var this__10885 = this;
if(cljs.core._EQ_.call(null,cljs.core.deref.call(null,this__10885.cached_hierarchy),cljs.core.deref.call(null,this__10885.hierarchy)))
{} else
{cljs.core.reset_cache.call(null,this__10885.method_cache,this__10885.method_table,this__10885.cached_hierarchy,this__10885.hierarchy);
}
var temp__3971__auto____10886 = cljs.core.deref.call(null,this__10885.method_cache).call(null,dispatch_val);
if(cljs.core.truth_(temp__3971__auto____10886))
{var target_fn__10887 = temp__3971__auto____10886;
return target_fn__10887;
} else
{var temp__3971__auto____10888 = cljs.core.find_and_cache_best_method.call(null,this__10885.name,dispatch_val,this__10885.hierarchy,this__10885.method_table,this__10885.prefer_table,this__10885.method_cache,this__10885.cached_hierarchy);
if(cljs.core.truth_(temp__3971__auto____10888))
{var target_fn__10889 = temp__3971__auto____10888;
return target_fn__10889;
} else
{return cljs.core.deref.call(null,this__10885.method_table).call(null,this__10885.default_dispatch_val);
}
}
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_prefer_method$arity$3 = (function (mf,dispatch_val_x,dispatch_val_y){
var this__10890 = this;
if(cljs.core.truth_(cljs.core.prefers_STAR_.call(null,dispatch_val_x,dispatch_val_y,this__10890.prefer_table)))
{throw (new Error([cljs.core.str("Preference conflict in multimethod '"),cljs.core.str(this__10890.name),cljs.core.str("': "),cljs.core.str(dispatch_val_y),cljs.core.str(" is already preferred to "),cljs.core.str(dispatch_val_x)].join('')));
} else
{}
cljs.core.swap_BANG_.call(null,this__10890.prefer_table,(function (old){
return cljs.core.assoc.call(null,old,dispatch_val_x,cljs.core.conj.call(null,cljs.core._lookup.call(null,old,dispatch_val_x,cljs.core.PersistentHashSet.EMPTY),dispatch_val_y));
}));
return cljs.core.reset_cache.call(null,this__10890.method_cache,this__10890.method_table,this__10890.cached_hierarchy,this__10890.hierarchy);
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_methods$arity$1 = (function (mf){
var this__10891 = this;
return cljs.core.deref.call(null,this__10891.method_table);
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_prefers$arity$1 = (function (mf){
var this__10892 = this;
return cljs.core.deref.call(null,this__10892.prefer_table);
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_dispatch$arity$2 = (function (mf,args){
var this__10893 = this;
return cljs.core.do_dispatch.call(null,mf,this__10893.dispatch_fn,args);
});
cljs.core.MultiFn;
cljs.core.MultiFn.prototype.call = (function() { 
var G__10895__delegate = function (_,args){
var self__10894 = this;
return cljs.core._dispatch.call(null,self__10894,args);
};
var G__10895 = function (_,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return G__10895__delegate.call(this, _, args);
};
G__10895.cljs$lang$maxFixedArity = 1;
G__10895.cljs$lang$applyTo = (function (arglist__10896){
var _ = cljs.core.first(arglist__10896);
var args = cljs.core.rest(arglist__10896);
return G__10895__delegate(_, args);
});
G__10895.cljs$lang$arity$variadic = G__10895__delegate;
return G__10895;
})()
;
cljs.core.MultiFn.prototype.apply = (function (_,args){
var self__10897 = this;
return cljs.core._dispatch.call(null,self__10897,args);
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
cljs.core.UUID.cljs$lang$ctorPrSeq = (function (this__3002__auto__){
return cljs.core.list.call(null,"cljs.core/UUID");
});
cljs.core.UUID.prototype.cljs$core$IHash$_hash$arity$1 = (function (this$){
var this__10898 = this;
return goog.string.hashCode(cljs.core.pr_str.call(null,this$));
});
cljs.core.UUID.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (_10900,_){
var this__10899 = this;
return cljs.core.list.call(null,[cljs.core.str("#uuid \""),cljs.core.str(this__10899.uuid),cljs.core.str("\"")].join(''));
});
cljs.core.UUID.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (_,other){
var this__10901 = this;
var and__3822__auto____10902 = cljs.core.instance_QMARK_.call(null,cljs.core.UUID,other);
if(and__3822__auto____10902)
{return (this__10901.uuid === other.uuid);
} else
{return and__3822__auto____10902;
}
});
cljs.core.UUID.prototype.toString = (function (){
var this__10903 = this;
var this__10904 = this;
return cljs.core.pr_str.call(null,this__10904);
});
cljs.core.UUID;
