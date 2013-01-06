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
_SLASH_;
return cljs.core.atom.call(null,cljs.core.ObjMap.fromObject(["\uFDD0'mail","\uFDD0'not-matched","\uFDD0'actor"],{"\uFDD0'mail":cljs.core.List.EMPTY,"\uFDD0'not-matched":cljs.core.List.EMPTY,"\uFDD0'actor":actor}));
});
actjs.main.extract_next_exec = (function extract_next_exec(p__6115){
var map__6124__6125 = p__6115;
var map__6124__6126 = ((cljs.core.seq_QMARK_.call(null,map__6124__6125))?cljs.core.apply.call(null,cljs.core.hash_map,map__6124__6125):map__6124__6125);
var actor_data__6127 = map__6124__6126;
var next_mail__6128 = cljs.core._lookup.call(null,map__6124__6126,"\uFDD0'next-mail",null);
var mail__6129 = cljs.core._lookup.call(null,map__6124__6126,"\uFDD0'mail",null);
if(cljs.core.truth_(next_mail__6128))
{return cljs.core.dissoc.call(null,actor_data__6127,"\uFDD0'dispatch");
} else
{var current_mail__6130 = cljs.core.butlast.call(null,mail__6129);
var current_mail__6131 = (cljs.core.truth_(current_mail__6130)?current_mail__6130:cljs.core.List.EMPTY);
return cljs.core.assoc.call(null,actor_data__6127,"\uFDD0'dispatch",true,"\uFDD0'mail",current_mail__6131,"\uFDD0'next-mail",cljs.core.last.call(null,mail__6129));
}
});
actjs.main.consume_next_execution = (function consume_next_execution(actor_data){
return cljs.core.dissoc.call(null,actor_data,"\uFDD0'next-mail");
});
actjs.main.become = (function become(p__6132,new_actor){
var map__6139__6140 = p__6132;
var map__6139__6141 = ((cljs.core.seq_QMARK_.call(null,map__6139__6140))?cljs.core.apply.call(null,cljs.core.hash_map,map__6139__6140):map__6139__6140);
var actor_data__6142 = map__6139__6141;
var mail__6143 = cljs.core._lookup.call(null,map__6139__6141,"\uFDD0'mail",null);
var not_matched__6144 = cljs.core._lookup.call(null,map__6139__6141,"\uFDD0'not-matched",null);
return cljs.core.assoc.call(null,actor_data__6142,"\uFDD0'actor",new_actor,"\uFDD0'not-matched",cljs.core.List.EMPTY,"\uFDD0'mail",cljs.core.concat.call(null,cljs.core.PersistentVector.EMPTY,not_matched__6144,mail__6143));
});
actjs.main.become_BANG_ = (function become_BANG_(actor_atom,new_actor){
return cljs.core.swap_BANG_.call(null,actor_atom,actjs.main.become,new_actor);
});
actjs.main.push_not_matched = (function push_not_matched(p__6145,msg){
var map__6151__6152 = p__6145;
var map__6151__6153 = ((cljs.core.seq_QMARK_.call(null,map__6151__6152))?cljs.core.apply.call(null,cljs.core.hash_map,map__6151__6152):map__6151__6152);
var actor_data__6154 = map__6151__6153;
var keys__6155 = cljs.core._lookup.call(null,map__6151__6153,cljs.core.PersistentVector.fromArray([actjs.main.not_matched], true),null);
return cljs.core.assoc.call(null,actor_data__6154,"\uFDD0'not-matched",cljs.core.conj.call(null,actjs.main.not_matched,msg));
});
actjs.main.push_not_matched_BANG_ = (function push_not_matched_BANG_(actor_atom,msg){
return cljs.core.swap_BANG_.call(null,actor_atom,actjs.main.push_not_matched,msg);
});
actjs.main.run_actor = (function run_actor(msg,actor_atom){
return (function (){
var map__6164__6165 = cljs.core.swap_BANG_.call(null,actor_atom,actjs.main.consume_next_execution);
var map__6164__6166 = ((cljs.core.seq_QMARK_.call(null,map__6164__6165))?cljs.core.apply.call(null,cljs.core.hash_map,map__6164__6165):map__6164__6165);
var actor__6167 = cljs.core._lookup.call(null,map__6164__6166,"\uFDD0'actor",null);
var result__6168 = actjs.main.listen.call(null,actor__6167,msg);
if((result__6168 == null))
{actjs.main.become_BANG_.call(null,actor_atom,null);
} else
{if((function (){var G__6169__6170 = result__6168;
if(G__6169__6170)
{if(cljs.core.truth_((function (){var or__3824__auto____6171 = null;
if(cljs.core.truth_(or__3824__auto____6171))
{return or__3824__auto____6171;
} else
{return G__6169__6170.actjs$main$Response$;
}
})()))
{return true;
} else
{if((!G__6169__6170.cljs$lang$protocol_mask$partition$))
{return cljs.core.type_satisfies_.call(null,actjs.main.Response,G__6169__6170);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,actjs.main.Response,G__6169__6170);
}
})())
{actjs.main.become_BANG_.call(null,actor_atom,result__6168);
} else
{if(cljs.core._EQ_.call(null,"\uFDD0'not-matched",result__6168))
{actjs.main.push_not_matched_BANG_.call(null,actor_atom,msg);
} else
{}
}
}
if(cljs.core.truth_(result__6168))
{return actjs.main.dispatch_execution.call(null,actor_atom);
} else
{return null;
}
});
});
actjs.main.dispatch_execution = (function dispatch_execution(actor_atom){
var map__6179__6180 = cljs.core.swap_BANG_.call(null,actor_atom,actjs.main.extract_next_exec);
var map__6179__6181 = ((cljs.core.seq_QMARK_.call(null,map__6179__6180))?cljs.core.apply.call(null,cljs.core.hash_map,map__6179__6180):map__6179__6180);
var actor_data__6182 = map__6179__6181;
var dispatch__6183 = cljs.core._lookup.call(null,map__6179__6181,"\uFDD0'dispatch",null);
var next_mail__6184 = cljs.core._lookup.call(null,map__6179__6181,"\uFDD0'next-mail",null);
if(cljs.core.truth_((function (){var and__3822__auto____6185 = next_mail__6184;
if(cljs.core.truth_(and__3822__auto____6185))
{return dispatch__6183;
} else
{return and__3822__auto____6185;
}
})()))
{return setTimeout(actjs.main.run_actor.call(null,next_mail__6184,actor_atom),1);
} else
{return null;
}
});
actjs.main.push_mail = (function push_mail(p__6186,msg){
var map__6192__6193 = p__6186;
var map__6192__6194 = ((cljs.core.seq_QMARK_.call(null,map__6192__6193))?cljs.core.apply.call(null,cljs.core.hash_map,map__6192__6193):map__6192__6193);
var actor_data__6195 = map__6192__6194;
var mail__6196 = cljs.core._lookup.call(null,map__6192__6194,"\uFDD0'mail",null);
return cljs.core.assoc.call(null,actor_data__6195,"\uFDD0'mail",cljs.core.conj.call(null,mail__6196,msg));
});
actjs.main.send_BANG_ = (function send_BANG_(msg,actor_atom){
cljs.core.swap_BANG_.call(null,actor_atom,actjs.main.push_mail,msg);
actjs.main.dispatch_execution.call(null,actor_atom);
return cljs.core.deref.call(null,actor_atom);
});
