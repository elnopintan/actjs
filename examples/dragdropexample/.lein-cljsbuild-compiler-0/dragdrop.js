goog.provide('dragdropexample.dragdrop');
goog.require('cljs.core');
goog.require('actjs.main');
dragdropexample.dragdrop.extract_classes = (function extract_classes(text){
return cljs.core.set.call(null,cljs.core.map.call(null,(function (p1__116279_SHARP_){
return cljs.core.apply.call(null,cljs.core.str,p1__116279_SHARP_);
}),cljs.core.filter.call(null,(function (p1__116280_SHARP_){
return cljs.core.not_EQ_.call(null,cljs.core.first.call(null,p1__116280_SHARP_)," ");
}),cljs.core.partition_by.call(null,(function (p1__116281_SHARP_){
return cljs.core._EQ_.call(null,p1__116281_SHARP_," ");
}),text))));
});
MouseEvent.prototype.cljs$core$ILookup$ = true;
MouseEvent.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this$,k){
return cljs.core._lookup.call(null,this$,k,null);
});
MouseEvent.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this$,k,not_found){
var G__116372__116373 = k;
if(cljs.core._EQ_.call(null,"\uFDD0'node",G__116372__116373))
{return this$.target;
} else
{if(cljs.core._EQ_.call(null,"\uFDD0'left",G__116372__116373))
{return this$.target.offsetLeft;
} else
{if(cljs.core._EQ_.call(null,"\uFDD0'top",G__116372__116373))
{return this$.target.offsetTop;
} else
{if(cljs.core._EQ_.call(null,"\uFDD0'posY",G__116372__116373))
{return this$.clientY;
} else
{if(cljs.core._EQ_.call(null,"\uFDD0'posX",G__116372__116373))
{return this$.clientX;
} else
{if(cljs.core._EQ_.call(null,"\uFDD0'classes",G__116372__116373))
{return dragdropexample.dragdrop.extract_classes.call(null,this$.target.className);
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
}
}
});
dragdropexample.dragdrop.change_pos_BANG_ = (function change_pos_BANG_(node,posX,posY){
node.style.left = [cljs.core.str(posX),cljs.core.str("px")].join('');
return node.style.top = [cljs.core.str(posY),cljs.core.str("px")].join('');
});

/**
* @constructor
* @param {*} __meta
* @param {*} __extmap
* @param {*=} __meta 
* @param {*=} __extmap
*/
dragdropexample.dragdrop.Empty = (function (__meta,__extmap){
this.__meta = __meta;
this.__extmap = __extmap;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 619054858;
if(arguments.length>0){
this.__meta = __meta;
this.__extmap = __extmap;
} else {
this.__meta=null;
this.__extmap=null;
}
})
dragdropexample.dragdrop.Empty.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__2324__auto__){
var this__116377 = this;
var h__2198__auto____116378 = this__116377.__hash;
if(!((h__2198__auto____116378 == null)))
{return h__2198__auto____116378;
} else
{var h__2198__auto____116379 = cljs.core.hash_imap.call(null,this__2324__auto__);
this__116377.__hash = h__2198__auto____116379;
return h__2198__auto____116379;
}
});
dragdropexample.dragdrop.Empty.prototype.actjs$main$Response$ = true;
dragdropexample.dragdrop.Empty.prototype.actjs$main$Response$listen$arity$2 = (function (this$,p__116380){
var this__116381 = this;
var vec__116382__116384 = p__116380;
var drag__116385 = cljs.core.nth.call(null,vec__116382__116384,0,null);
var map__116383__116386 = cljs.core.nth.call(null,vec__116382__116384,1,null);
var map__116383__116387 = ((cljs.core.seq_QMARK_.call(null,map__116383__116386))?cljs.core.apply.call(null,cljs.core.hash_map,map__116383__116386):map__116383__116386);
var posY__116388 = cljs.core._lookup.call(null,map__116383__116387,"\uFDD0'posY",null);
var posX__116389 = cljs.core._lookup.call(null,map__116383__116387,"\uFDD0'posX",null);
var left__116390 = cljs.core._lookup.call(null,map__116383__116387,"\uFDD0'left",null);
var top__116391 = cljs.core._lookup.call(null,map__116383__116387,"\uFDD0'top",null);
var node__116392 = cljs.core._lookup.call(null,map__116383__116387,"\uFDD0'node",null);
var classes__116393 = cljs.core._lookup.call(null,map__116383__116387,"\uFDD0'classes",null);
if(cljs.core.truth_((function (){var and__3822__auto____116394 = cljs.core._EQ_.call(null,"\uFDD0'drag",drag__116385);
if(and__3822__auto____116394)
{return classes__116393.call(null,"draggable");
} else
{return and__3822__auto____116394;
}
})()))
{return (new dragdropexample.dragdrop.Dragged(node__116392,(posX__116389 - left__116390),(posY__116388 - top__116391)));
} else
{if("\uFDD0'else")
{return this$;
} else
{return null;
}
}
});
dragdropexample.dragdrop.Empty.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__2329__auto__,k__2330__auto__){
var this__116395 = this;
return this__2329__auto__.cljs$core$ILookup$_lookup$arity$3(this__2329__auto__,k__2330__auto__,null);
});
dragdropexample.dragdrop.Empty.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__2331__auto__,k116375,else__2332__auto__){
var this__116396 = this;
if("\uFDD0'else")
{return cljs.core._lookup.call(null,this__116396.__extmap,k116375,else__2332__auto__);
} else
{return null;
}
});
dragdropexample.dragdrop.Empty.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__2336__auto__,k__2337__auto__,G__116374){
var this__116397 = this;
var pred__116398__116401 = cljs.core.identical_QMARK_;
var expr__116399__116402 = k__2337__auto__;
return (new dragdropexample.dragdrop.Empty(this__116397.__meta,cljs.core.assoc.call(null,this__116397.__extmap,k__2337__auto__,G__116374),null));
});
dragdropexample.dragdrop.Empty.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__2334__auto__,entry__2335__auto__){
var this__116403 = this;
if(cljs.core.vector_QMARK_.call(null,entry__2335__auto__))
{return this__2334__auto__.cljs$core$IAssociative$_assoc$arity$3(this__2334__auto__,cljs.core._nth.call(null,entry__2335__auto__,0),cljs.core._nth.call(null,entry__2335__auto__,1));
} else
{return cljs.core.reduce.call(null,cljs.core._conj,this__2334__auto__,entry__2335__auto__);
}
});
dragdropexample.dragdrop.Empty.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__2341__auto__){
var this__116404 = this;
return cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core.PersistentVector.EMPTY,this__116404.__extmap));
});
dragdropexample.dragdrop.Empty.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (this__2343__auto__,opts__2344__auto__){
var this__116405 = this;
var pr_pair__2345__auto____116406 = (function (keyval__2346__auto__){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,""," ","",opts__2344__auto__,keyval__2346__auto__);
});
return cljs.core.pr_sequential.call(null,pr_pair__2345__auto____116406,[cljs.core.str("#"),cljs.core.str("Empty"),cljs.core.str("{")].join(''),", ","}",opts__2344__auto__,cljs.core.concat.call(null,cljs.core.PersistentVector.EMPTY,this__116405.__extmap));
});
dragdropexample.dragdrop.Empty.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__2333__auto__){
var this__116407 = this;
return (0 + cljs.core.count.call(null,this__116407.__extmap));
});
dragdropexample.dragdrop.Empty.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__2325__auto__,other__2326__auto__){
var this__116408 = this;
if(cljs.core.truth_((function (){var and__3822__auto____116409 = other__2326__auto__;
if(cljs.core.truth_(and__3822__auto____116409))
{var and__3822__auto____116410 = (this__2325__auto__.constructor === other__2326__auto__.constructor);
if(and__3822__auto____116410)
{return cljs.core.equiv_map.call(null,this__2325__auto__,other__2326__auto__);
} else
{return and__3822__auto____116410;
}
} else
{return and__3822__auto____116409;
}
})()))
{return true;
} else
{return false;
}
});
dragdropexample.dragdrop.Empty.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__2328__auto__,G__116374){
var this__116411 = this;
return (new dragdropexample.dragdrop.Empty(G__116374,this__116411.__extmap,this__116411.__hash));
});
dragdropexample.dragdrop.Empty.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__2327__auto__){
var this__116412 = this;
return this__116412.__meta;
});
dragdropexample.dragdrop.Empty.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__2338__auto__,k__2339__auto__){
var this__116413 = this;
if(cljs.core.contains_QMARK_.call(null,cljs.core.PersistentHashSet.EMPTY,k__2339__auto__))
{return cljs.core.dissoc.call(null,cljs.core.with_meta.call(null,cljs.core.into.call(null,cljs.core.ObjMap.EMPTY,this__2338__auto__),this__116413.__meta),k__2339__auto__);
} else
{return (new dragdropexample.dragdrop.Empty(this__116413.__meta,cljs.core.not_empty.call(null,cljs.core.dissoc.call(null,this__116413.__extmap,k__2339__auto__)),null));
}
});
dragdropexample.dragdrop.Empty.cljs$lang$type = true;
dragdropexample.dragdrop.Empty.cljs$lang$ctorPrSeq = (function (this__2363__auto__){
return cljs.core.list.call(null,"dragdropexample.dragdrop/Empty");
});
dragdropexample.dragdrop.__GT_Empty = (function __GT_Empty(){
return (new dragdropexample.dragdrop.Empty());
});
dragdropexample.dragdrop.map__GT_Empty = (function map__GT_Empty(G__116376){
return (new dragdropexample.dragdrop.Empty(null,cljs.core.dissoc.call(null,G__116376)));
});
dragdropexample.dragdrop.Empty;

/**
* @constructor
* @param {*} dragged_node
* @param {*} deltaX
* @param {*} deltaY
* @param {*} __meta
* @param {*} __extmap
* @param {*=} __meta 
* @param {*=} __extmap
*/
dragdropexample.dragdrop.Dragged = (function (dragged_node,deltaX,deltaY,__meta,__extmap){
this.dragged_node = dragged_node;
this.deltaX = deltaX;
this.deltaY = deltaY;
this.__meta = __meta;
this.__extmap = __extmap;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 619054858;
if(arguments.length>3){
this.__meta = __meta;
this.__extmap = __extmap;
} else {
this.__meta=null;
this.__extmap=null;
}
})
dragdropexample.dragdrop.Dragged.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__2324__auto__){
var this__116417 = this;
var h__2198__auto____116418 = this__116417.__hash;
if(!((h__2198__auto____116418 == null)))
{return h__2198__auto____116418;
} else
{var h__2198__auto____116419 = cljs.core.hash_imap.call(null,this__2324__auto__);
this__116417.__hash = h__2198__auto____116419;
return h__2198__auto____116419;
}
});
dragdropexample.dragdrop.Dragged.prototype.actjs$main$Response$ = true;
dragdropexample.dragdrop.Dragged.prototype.actjs$main$Response$listen$arity$2 = (function (this$,p__116420){
var this__116421 = this;
var vec__116422__116424 = p__116420;
var command__116425 = cljs.core.nth.call(null,vec__116422__116424,0,null);
var map__116423__116426 = cljs.core.nth.call(null,vec__116422__116424,1,null);
var map__116423__116427 = ((cljs.core.seq_QMARK_.call(null,map__116423__116426))?cljs.core.apply.call(null,cljs.core.hash_map,map__116423__116426):map__116423__116426);
var posY__116428 = cljs.core._lookup.call(null,map__116423__116427,"\uFDD0'posY",null);
var posX__116429 = cljs.core._lookup.call(null,map__116423__116427,"\uFDD0'posX",null);
dragdropexample.dragdrop.change_pos_BANG_.call(null,this__116421.dragged_node,(posX__116429 - this__116421.deltaX),(posY__116428 - this__116421.deltaY));
if(cljs.core._EQ_.call(null,"\uFDD0'move",command__116425))
{return this$;
} else
{if(cljs.core._EQ_.call(null,"\uFDD0'drop",command__116425))
{return (new dragdropexample.dragdrop.Empty());
} else
{return null;
}
}
});
dragdropexample.dragdrop.Dragged.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__2329__auto__,k__2330__auto__){
var this__116430 = this;
return this__2329__auto__.cljs$core$ILookup$_lookup$arity$3(this__2329__auto__,k__2330__auto__,null);
});
dragdropexample.dragdrop.Dragged.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__2331__auto__,k116415,else__2332__auto__){
var this__116431 = this;
if((k116415 === "\uFDD0'dragged-node"))
{return this__116431.dragged_node;
} else
{if((k116415 === "\uFDD0'deltaX"))
{return this__116431.deltaX;
} else
{if((k116415 === "\uFDD0'deltaY"))
{return this__116431.deltaY;
} else
{if("\uFDD0'else")
{return cljs.core._lookup.call(null,this__116431.__extmap,k116415,else__2332__auto__);
} else
{return null;
}
}
}
}
});
dragdropexample.dragdrop.Dragged.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__2336__auto__,k__2337__auto__,G__116414){
var this__116432 = this;
var pred__116433__116436 = cljs.core.identical_QMARK_;
var expr__116434__116437 = k__2337__auto__;
if(pred__116433__116436.call(null,"\uFDD0'dragged-node",expr__116434__116437))
{return (new dragdropexample.dragdrop.Dragged(G__116414,this__116432.deltaX,this__116432.deltaY,this__116432.__meta,this__116432.__extmap,null));
} else
{if(pred__116433__116436.call(null,"\uFDD0'deltaX",expr__116434__116437))
{return (new dragdropexample.dragdrop.Dragged(this__116432.dragged_node,G__116414,this__116432.deltaY,this__116432.__meta,this__116432.__extmap,null));
} else
{if(pred__116433__116436.call(null,"\uFDD0'deltaY",expr__116434__116437))
{return (new dragdropexample.dragdrop.Dragged(this__116432.dragged_node,this__116432.deltaX,G__116414,this__116432.__meta,this__116432.__extmap,null));
} else
{return (new dragdropexample.dragdrop.Dragged(this__116432.dragged_node,this__116432.deltaX,this__116432.deltaY,this__116432.__meta,cljs.core.assoc.call(null,this__116432.__extmap,k__2337__auto__,G__116414),null));
}
}
}
});
dragdropexample.dragdrop.Dragged.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__2334__auto__,entry__2335__auto__){
var this__116438 = this;
if(cljs.core.vector_QMARK_.call(null,entry__2335__auto__))
{return this__2334__auto__.cljs$core$IAssociative$_assoc$arity$3(this__2334__auto__,cljs.core._nth.call(null,entry__2335__auto__,0),cljs.core._nth.call(null,entry__2335__auto__,1));
} else
{return cljs.core.reduce.call(null,cljs.core._conj,this__2334__auto__,entry__2335__auto__);
}
});
dragdropexample.dragdrop.Dragged.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__2341__auto__){
var this__116439 = this;
return cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray([cljs.core.vector.call(null,"\uFDD0'dragged-node",this__116439.dragged_node),cljs.core.vector.call(null,"\uFDD0'deltaX",this__116439.deltaX),cljs.core.vector.call(null,"\uFDD0'deltaY",this__116439.deltaY)], true),this__116439.__extmap));
});
dragdropexample.dragdrop.Dragged.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (this__2343__auto__,opts__2344__auto__){
var this__116440 = this;
var pr_pair__2345__auto____116441 = (function (keyval__2346__auto__){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,""," ","",opts__2344__auto__,keyval__2346__auto__);
});
return cljs.core.pr_sequential.call(null,pr_pair__2345__auto____116441,[cljs.core.str("#"),cljs.core.str("Dragged"),cljs.core.str("{")].join(''),", ","}",opts__2344__auto__,cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray([cljs.core.vector.call(null,"\uFDD0'dragged-node",this__116440.dragged_node),cljs.core.vector.call(null,"\uFDD0'deltaX",this__116440.deltaX),cljs.core.vector.call(null,"\uFDD0'deltaY",this__116440.deltaY)], true),this__116440.__extmap));
});
dragdropexample.dragdrop.Dragged.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__2333__auto__){
var this__116442 = this;
return (3 + cljs.core.count.call(null,this__116442.__extmap));
});
dragdropexample.dragdrop.Dragged.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__2325__auto__,other__2326__auto__){
var this__116443 = this;
if(cljs.core.truth_((function (){var and__3822__auto____116444 = other__2326__auto__;
if(cljs.core.truth_(and__3822__auto____116444))
{var and__3822__auto____116445 = (this__2325__auto__.constructor === other__2326__auto__.constructor);
if(and__3822__auto____116445)
{return cljs.core.equiv_map.call(null,this__2325__auto__,other__2326__auto__);
} else
{return and__3822__auto____116445;
}
} else
{return and__3822__auto____116444;
}
})()))
{return true;
} else
{return false;
}
});
dragdropexample.dragdrop.Dragged.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__2328__auto__,G__116414){
var this__116446 = this;
return (new dragdropexample.dragdrop.Dragged(this__116446.dragged_node,this__116446.deltaX,this__116446.deltaY,G__116414,this__116446.__extmap,this__116446.__hash));
});
dragdropexample.dragdrop.Dragged.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__2327__auto__){
var this__116447 = this;
return this__116447.__meta;
});
dragdropexample.dragdrop.Dragged.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__2338__auto__,k__2339__auto__){
var this__116448 = this;
if(cljs.core.contains_QMARK_.call(null,cljs.core.PersistentHashSet.fromArray(["\uFDD0'dragged-node","\uFDD0'deltaY","\uFDD0'deltaX"]),k__2339__auto__))
{return cljs.core.dissoc.call(null,cljs.core.with_meta.call(null,cljs.core.into.call(null,cljs.core.ObjMap.EMPTY,this__2338__auto__),this__116448.__meta),k__2339__auto__);
} else
{return (new dragdropexample.dragdrop.Dragged(this__116448.dragged_node,this__116448.deltaX,this__116448.deltaY,this__116448.__meta,cljs.core.not_empty.call(null,cljs.core.dissoc.call(null,this__116448.__extmap,k__2339__auto__)),null));
}
});
dragdropexample.dragdrop.Dragged.cljs$lang$type = true;
dragdropexample.dragdrop.Dragged.cljs$lang$ctorPrSeq = (function (this__2363__auto__){
return cljs.core.list.call(null,"dragdropexample.dragdrop/Dragged");
});
dragdropexample.dragdrop.__GT_Dragged = (function __GT_Dragged(dragged_node,deltaX,deltaY){
return (new dragdropexample.dragdrop.Dragged(dragged_node,deltaX,deltaY));
});
dragdropexample.dragdrop.map__GT_Dragged = (function map__GT_Dragged(G__116416){
return (new dragdropexample.dragdrop.Dragged((new cljs.core.Keyword("\uFDD0'dragged-node")).call(null,G__116416),(new cljs.core.Keyword("\uFDD0'deltaX")).call(null,G__116416),(new cljs.core.Keyword("\uFDD0'deltaY")).call(null,G__116416),null,cljs.core.dissoc.call(null,G__116416,"\uFDD0'dragged-node","\uFDD0'deltaX","\uFDD0'deltaY")));
});
dragdropexample.dragdrop.Dragged;
dragdropexample.dragdrop.surface = actjs.main.spawn.call(null,(new dragdropexample.dragdrop.Empty()));
window.onload = (function (){
document.getElementById("rectangle").onmousedown = (function (event){
console.log("dragging...");
actjs.main.send_BANG_.call(null,cljs.core.PersistentVector.fromArray(["\uFDD0'drag",event], true),dragdropexample.dragdrop.surface);
return false;
});
document.getElementById("rectangle").onmousemove = (function (event){
return actjs.main.send_BANG_.call(null,cljs.core.PersistentVector.fromArray(["\uFDD0'move",event], true),dragdropexample.dragdrop.surface);
});
return document.getElementById("rectangle").onmouseup = (function (event){
console.log("dropping...");
actjs.main.send_BANG_.call(null,cljs.core.PersistentVector.fromArray(["\uFDD0'drop",event], true),dragdropexample.dragdrop.surface);
return true;
});
});
