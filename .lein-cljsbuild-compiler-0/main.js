goog.provide('actjs.main');
goog.require('cljs.core');
actjs.main.Response = {};
actjs.main.listen = (function listen(this$,msg){
if((function (){var and__3822__auto____6111 = this$;
if(and__3822__auto____6111)
{return this$.actjs$main$Response$listen$arity$2;
} else
{return and__3822__auto____6111;
}
})())
{return this$.actjs$main$Response$listen$arity$2(this$,msg);
} else
{var x__2369__auto____6112 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____6113 = (actjs.main.listen[goog.typeOf(x__2369__auto____6112)]);
if(or__3824__auto____6113)
{return or__3824__auto____6113;
} else
{var or__3824__auto____6114 = (actjs.main.listen["_"]);
if(or__3824__auto____6114)
{return or__3824__auto____6114;
} else
{throw cljs.core.missing_protocol.call(null,"Response.listen",this$);
}
}
})().call(null,this$,msg);
}
});
actjs.main.spawn = (function spawn(actor){
return cljs.core.atom.call(null,cljs.core.ObjMap.fromObject(["\uFDD0'mail","\uFDD0'not_matched","\uFDD0'actor"],{"\uFDD0'mail":cljs.core.List.EMPTY,"\uFDD0'not_matched":cljs.core.List.EMPTY,"\uFDD0'actor":actor}));
});
actjs.main.extract_next_exec = (function extract_next_exec(p__6115){
var map__6121__6122 = p__6115;
var map__6121__6123 = ((cljs.core.seq_QMARK_.call(null,map__6121__6122))?cljs.core.apply.call(null,cljs.core.hash_map,map__6121__6122):map__6121__6122);
var actor_data__6124 = map__6121__6123;
var keys__6125 = cljs.core._lookup.call(null,map__6121__6123,cljs.core.PersistentVector.fromArray([actjs.main.mail,actjs.main.next_mail], true),null);
if(cljs.core.next)
{return cljs.core.dissoc.call(null,actor_data__6124,"\uFDD0'dispatch");
} else
{return cljs.core.assoc.call(null,actor_data__6124,"\uFDD0'dispatch",true,"\uFDD0'mail",cljs.core.butlast.call(null,actjs.main.mail),"\uFDD0'next-mail",cljs.core.last.call(null,actjs.main.mail));
}
});
actjs.main.consume_next_execution = (function consume_next_execution(actor_data){
return cljs.core.dissoc.call(null,actor_data,"\uFDD0'next-mail");
});
actjs.main.become = (function become(actor_data,new_actor,not_mathed,mail){
return cljs.core.assoc.call(null,actor_data,"\uFDD0'actor",new_actor,"\uFDD0'not-matched",cljs.core.List.EMPTY,"\uFDD0'mail",cljs.core.concat.call(null,actjs.main.not_matched,mail));
});
actjs.main.become_BANG_ = (function become_BANG_(actor_atom,new_actor){
return cljs.core.swap_BANG_.call(null,actor_atom,actjs.main.become,new_actor);
});
actjs.main.push_not_matched = (function push_not_matched(p__6126,msg){
var map__6132__6133 = p__6126;
var map__6132__6134 = ((cljs.core.seq_QMARK_.call(null,map__6132__6133))?cljs.core.apply.call(null,cljs.core.hash_map,map__6132__6133):map__6132__6133);
var actor_data__6135 = map__6132__6134;
var keys__6136 = cljs.core._lookup.call(null,map__6132__6134,cljs.core.PersistentVector.fromArray([actjs.main.not_matched], true),null);
return cljs.core.assoc.call(null,actor_data__6135,"\uFDD0'not-matched",cljs.core.conj.call(null,actjs.main.not_matched,msg));
});
actjs.main.push_not_matched_BANG_ = (function push_not_matched_BANG_(actor_atom,msg){
return cljs.core.swap_BANG_.call(null,actjs.main.push_not_matched,actor_atom,msg);
});
actjs.main.run_actor = (function run_actor(msg,actor_atom){
return (function (){
var result__6146 = actjs.main.listen.call(null,actjs.main.actor,msg);
var map__6145__6147 = actjs.main.consume_next_execution.call(null);
var map__6145__6148 = ((cljs.core.seq_QMARK_.call(null,map__6145__6147))?cljs.core.apply.call(null,cljs.core.hash_map,map__6145__6147):map__6145__6147);
var keys__6149 = cljs.core._lookup.call(null,map__6145__6148,cljs.core.PersistentVector.fromArray([actjs.main.actor], true),null);
if((result__6146 == null))
{actjs.main.become_BANG_.call(null,actor_atom,null);
} else
{if((function (){var G__6150__6151 = result__6146;
if(G__6150__6151)
{if(cljs.core.truth_((function (){var or__3824__auto____6152 = null;
if(cljs.core.truth_(or__3824__auto____6152))
{return or__3824__auto____6152;
} else
{return G__6150__6151.actjs$main$Response$;
}
})()))
{return true;
} else
{if((!G__6150__6151.cljs$lang$protocol_mask$partition$))
{return cljs.core.type_satisfies_.call(null,actjs.main.Response,G__6150__6151);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,actjs.main.Response,G__6150__6151);
}
})())
{actjs.main.become_BANG_.call(null,actor_atom,result__6146);
} else
{if(cljs.core._EQ_.call(null,"\uFDD0'not-matched",result__6146))
{actjs.main.push_not_matched_BANG_.call(null,actor_atom,msg);
} else
{}
}
}
if(cljs.core.truth_(result__6146))
{return actjs.main.dispatch_execution.call(null,actor_atom);
} else
{return null;
}
});
});
actjs.main.dispatch_execution = (function dispatch_execution(actor_atom){
var map__6158__6159 = cljs.core.swap_BANG_.call(null,actjs.main.extract_next_exec,actor_atom);
var map__6158__6160 = ((cljs.core.seq_QMARK_.call(null,map__6158__6159))?cljs.core.apply.call(null,cljs.core.hash_map,map__6158__6159):map__6158__6159);
var keys__6161 = cljs.core._lookup.call(null,map__6158__6160,cljs.core.PersistentVector.fromArray([actjs.main.next_mail,actjs.main.dispatch], true),null);
if(cljs.core.truth_((function (){var and__3822__auto____6162 = cljs.core.next;
if(and__3822__auto____6162)
{return actjs.main.dispatch;
} else
{return and__3822__auto____6162;
}
})()))
{return setTimeout(actjs.main.run_actor.call(null,actjs.main.next_mail,actor_atom),1);
} else
{return null;
}
});
actjs.main.push_mail = (function push_mail(p__6163,msg){
var map__6169__6170 = p__6163;
var map__6169__6171 = ((cljs.core.seq_QMARK_.call(null,map__6169__6170))?cljs.core.apply.call(null,cljs.core.hash_map,map__6169__6170):map__6169__6170);
var actor_data__6172 = map__6169__6171;
var keys__6173 = cljs.core._lookup.call(null,map__6169__6171,cljs.core.PersistentVector.fromArray([actjs.main.mail], true),null);
return cljs.core.assoc.call(null,actor_data__6172,"\uFDD0'mail",cljs.core.conj.call(null,actjs.main.mail,msg));
});
actjs.main.send_BANG_ = (function send_BANG_(msg,actor_atom){
cljs.core.swap_BANG_.call(null,actor_atom,actjs.main.push_mail,msg);
return actjs.main.dispatch_execution.call(null,actor_atom);
});

/**
* @constructor
*/
actjs.main.Echoer = (function (counter){
this.counter = counter;
})
actjs.main.Echoer.cljs$lang$type = true;
actjs.main.Echoer.cljs$lang$ctorPrSeq = (function (this__2316__auto__){
return cljs.core.list.call(null,"actjs.main/Echoer");
});
actjs.main.Echoer;
[cljs.core.str((new actjs.main.Echoer(1)))].join('');
