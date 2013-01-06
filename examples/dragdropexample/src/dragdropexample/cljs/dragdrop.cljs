(ns dragdropexample.dragdrop 
  (:require [actjs.main :as act]))

(defn extract-classes [text]
   (set (map #(apply str %) 
        (filter #(not= (first %) " ") 
                (partition-by #(= % " ") text)))))

;Extension for MouseEvent to use it as a hash-map"
(extend-type js/MouseEvent
  ILookup
  (-lookup [this k]
           (-lookup this k nil))
  (-lookup [this k not-found]
    (case k
      :classes    (extract-classes (.-className (.-target this)))
      :posX   (.-clientX this)
      :posY  (.-clientY this)
      :top   (.-offsetTop (.-target this))
      :left  (.-offsetLeft (.-target this))
      :node (.-target this)
      not-found)))

(defn change-pos! [node posX posY]
  (set! (.-left (.-style node)) (str posX  "px"))
  (set! (.-top (.-style node)) (str posY "px")))
  
(declare Dragged)

(defrecord Empty []
  act/Response
  (listen [this [drag {:keys [classes node top left posX posY]}]]
  "This is the default state for the drag and drop surface when no node is dragged.
  When received a :drag event drags an object if it's draggable."   
          (cond          
           (and (= :drag drag) (classes "draggable")) (Dragged. node (- posX left) (- posY top))
           :else this)))

(defrecord Dragged [dragged-node deltaX deltaY]
  act/Response
  (listen [this [command {:keys [posX posY]}]]
  "When an object is dragged this state records which node is dragged and the difference between
  node and mouse positions.
  :move event updates positions
  :drop event returns the surface to Empty state"
           (do 
            (change-pos! dragged-node (- posX deltaX) (- posY deltaY))
          	(cond
           		(= :move command) this
           		(= :drop command) (Empty.)))))
            
; surface actor.
(def surface (act/spawn (Empty. )))

; Javascript events transformed to actor events.
(set! (.-onload js/window) 
      (fn []
	(set! (.-onmousedown (.getElementById js/document "rectangle"))
     	   (fn [event]
      		(.log js/console "dragging...")
        	(act/send! [:drag event] surface) false))
        (set! (.-onmousemove (.getElementById js/document "rectangle"))
      	   (fn [event]
        	(act/send! [:move event] surface)))
        (set! (.-onmouseup (.getElementById js/document "rectangle"))
      	   (fn [event]
        	(.log js/console "dropping...")
        	(act/send! [:drop event] surface) true))))




