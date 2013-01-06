goog.provide('actjs.main');
goog.require('cljs.core');
actjs.main.Response = {};
actjs.main.listen = (function listen(this$,msg){
if((function (){var and__3822__auto____10172 = this$;
if(and__3822__auto____10172)
{return this$.actjs$main$Response$listen$arity$2;
} else
{return and__3822__auto____10172;
}
})())
{return this$.actjs$main$Response$listen$arity$2(this$,msg);
} else
{var x__2369__auto____10173 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____10174 = (actjs.main.listen[goog.typeOf(x__2369__auto____10173)]);
if(or__3824__auto____10174)
{return or__3824__auto____10174;
} else
{var or__3824__auto____10175 = (actjs.main.listen["_"]);
if(or__3824__auto____10175)
{return or__3824__auto____10175;
} else
{throw cljs.core.missing_protocol.call(null,"Response.listen",this$);
}
}
})().call(null,this$,msg);
}
});
actjs.main.spawn = (function spawn(actor){
return cljs.core.atom.call(null,cljs.core.ObjMap.fromObject(["\uFDD0'mail","\uFDD0'not-matched","\uFDD0'actor"],{"\uFDD0'mail":cljs.core.List.EMPTY,"\uFDD0'not-matched":cljs.core.List.EMPTY,"\uFDD0'actor":actor}));
});
actjs.main.extract_next_exec = (function extract_next_exec(p__10176){
var map__10185__10186 = p__10176;
var map__10185__10187 = ((cljs.core.seq_QMARK_.call(null,map__10185__10186))?cljs.core.apply.call(null,cljs.core.hash_map,map__10185__10186):map__10185__10186);
var actor_data__10188 = map__10185__10187;
var next_mail__10189 = cljs.core._lookup.call(null,map__10185__10187,"\uFDD0'next-mail",null);
var mail__10190 = cljs.core._lookup.call(null,map__10185__10187,"\uFDD0'mail",null);
if(cljs.core.truth_(next_mail__10189))
{return cljs.core.dissoc.call(null,actor_data__10188,"\uFDD0'dispatch");
} else
{var current_mail__10191 = cljs.core.butlast.call(null,mail__10190);
var current_mail__10192 = (cljs.core.truth_(current_mail__10191)?current_mail__10191:cljs.core.List.EMPTY);
return cljs.core.assoc.call(null,actor_data__10188,"\uFDD0'dispatch",true,"\uFDD0'mail",current_mail__10192,"\uFDD0'next-mail",cljs.core.last.call(null,mail__10190));
}
});
actjs.main.consume_next_execution = (function consume_next_execution(actor_data){
return cljs.core.dissoc.call(null,actor_data,"\uFDD0'next-mail");
});
actjs.main.become = (function become(p__10193,new_actor){
var map__10200__10201 = p__10193;
var map__10200__10202 = ((cljs.core.seq_QMARK_.call(null,map__10200__10201))?cljs.core.apply.call(null,cljs.core.hash_map,map__10200__10201):map__10200__10201);
var actor_data__10203 = map__10200__10202;
var mail__10204 = cljs.core._lookup.call(null,map__10200__10202,"\uFDD0'mail",null);
var not_matched__10205 = cljs.core._lookup.call(null,map__10200__10202,"\uFDD0'not-matched",null);
return cljs.core.assoc.call(null,actor_data__10203,"\uFDD0'actor",new_actor,"\uFDD0'not-matched",cljs.core.List.EMPTY,"\uFDD0'mail",cljs.core.concat.call(null,cljs.core.PersistentVector.EMPTY,not_matched__10205,mail__10204));
});
actjs.main.become_BANG_ = (function become_BANG_(actor_atom,new_actor){
return cljs.core.swap_BANG_.call(null,actor_atom,actjs.main.become,new_actor);
});
actjs.main.push_not_matched = (function push_not_matched(p__10206,msg){
var map__10212__10213 = p__10206;
var map__10212__10214 = ((cljs.core.seq_QMARK_.call(null,map__10212__10213))?cljs.core.apply.call(null,cljs.core.hash_map,map__10212__10213):map__10212__10213);
var actor_data__10215 = map__10212__10214;
var keys__10216 = cljs.core._lookup.call(null,map__10212__10214,cljs.core.PersistentVector.fromArray([actjs.main.not_matched], true),null);
return cljs.core.assoc.call(null,actor_data__10215,"\uFDD0'not-matched",cljs.core.conj.call(null,actjs.main.not_matched,msg));
});
actjs.main.push_not_matched_BANG_ = (function push_not_matched_BANG_(actor_atom,msg){
return cljs.core.swap_BANG_.call(null,actor_atom,actjs.main.push_not_matched,msg);
});
actjs.main.run_actor = (function run_actor(msg,actor_atom){
return (function (){
var map__10225__10226 = cljs.core.swap_BANG_.call(null,actor_atom,actjs.main.consume_next_execution);
var map__10225__10227 = ((cljs.core.seq_QMARK_.call(null,map__10225__10226))?cljs.core.apply.call(null,cljs.core.hash_map,map__10225__10226):map__10225__10226);
var actor__10228 = cljs.core._lookup.call(null,map__10225__10227,"\uFDD0'actor",null);
var result__10229 = actjs.main.listen.call(null,actor__10228,msg);
if((result__10229 == null))
{actjs.main.become_BANG_.call(null,actor_atom,null);
} else
{if((function (){var G__10230__10231 = result__10229;
if(G__10230__10231)
{if(cljs.core.truth_((function (){var or__3824__auto____10232 = null;
if(cljs.core.truth_(or__3824__auto____10232))
{return or__3824__auto____10232;
} else
{return G__10230__10231.actjs$main$Response$;
}
})()))
{return true;
} else
{if((!G__10230__10231.cljs$lang$protocol_mask$partition$))
{return cljs.core.type_satisfies_.call(null,actjs.main.Response,G__10230__10231);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,actjs.main.Response,G__10230__10231);
}
})())
{actjs.main.become_BANG_.call(null,actor_atom,result__10229);
} else
{if(cljs.core._EQ_.call(null,"\uFDD0'not-matched",result__10229))
{actjs.main.push_not_matched_BANG_.call(null,actor_atom,msg);
} else
{}
}
}
if(cljs.core.truth_(result__10229))
{return actjs.main.dispatch_execution.call(null,actor_atom);
} else
{return null;
}
});
});
actjs.main.dispatch_execution = (function dispatch_execution(actor_atom){
var map__10240__10241 = cljs.core.swap_BANG_.call(null,actor_atom,actjs.main.extract_next_exec);
var map__10240__10242 = ((cljs.core.seq_QMARK_.call(null,map__10240__10241))?cljs.core.apply.call(null,cljs.core.hash_map,map__10240__10241):map__10240__10241);
var actor_data__10243 = map__10240__10242;
var dispatch__10244 = cljs.core._lookup.call(null,map__10240__10242,"\uFDD0'dispatch",null);
var next_mail__10245 = cljs.core._lookup.call(null,map__10240__10242,"\uFDD0'next-mail",null);
if(cljs.core.truth_((function (){var and__3822__auto____10246 = next_mail__10245;
if(cljs.core.truth_(and__3822__auto____10246))
{return dispatch__10244;
} else
{return and__3822__auto____10246;
}
})()))
{return setTimeout(actjs.main.run_actor.call(null,next_mail__10245,actor_atom),1);
} else
{return null;
}
});
actjs.main.push_mail = (function push_mail(p__10247,msg){
var map__10253__10254 = p__10247;
var map__10253__10255 = ((cljs.core.seq_QMARK_.call(null,map__10253__10254))?cljs.core.apply.call(null,cljs.core.hash_map,map__10253__10254):map__10253__10254);
var actor_data__10256 = map__10253__10255;
var mail__10257 = cljs.core._lookup.call(null,map__10253__10255,"\uFDD0'mail",null);
return cljs.core.assoc.call(null,actor_data__10256,"\uFDD0'mail",cljs.core.conj.call(null,mail__10257,msg));
});
actjs.main.send_BANG_ = (function send_BANG_(msg,actor_atom){
cljs.core.swap_BANG_.call(null,actor_atom,actjs.main.push_mail,msg);
actjs.main.dispatch_execution.call(null,actor_atom);
return cljs.core.deref.call(null,actor_atom);
});
