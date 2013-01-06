(ns actjs.main)

(defprotocol Response
  "This protocol implements the behaviour of an actor"
  (listen
   [this msg]
   "Implement this function to match received messages.
   return another Response if the actor will remain alive listening to messages.
   return nil to terminate actor execution.
   return :not-matched for an unexepected message for the current state of the actor
   				but can be matched in further executions."))

(defn spawn [actor] 
  "Creates a new actor. The parameter actor must be of type Response.
  The created actor will listen to messages expected by the implementation of
  the parameter actor"
  (atom {:mail '() :not-matched '() :actor actor}))


(defn extract-next-exec [{:keys [mail next-mail] :as actor-data}]
  (if next-mail 
    (dissoc actor-data :dispatch)
    (let [current-mail (butlast mail)
          current-mail (if current-mail current-mail '())]
    	(assoc actor-data 
      	:dispatch true
      	:mail current-mail
      	:next-mail (last mail)))))

(defn consume-next-execution [actor-data]
  (dissoc actor-data :next-mail))

(defn become [{:keys [not-matched mail] :as actor-data} new-actor]
  (assoc actor-data 
    :actor new-actor
    :not-matched '()
    :mail (concat [] not-matched mail)))

(defn become! [actor-atom new-actor]
  (swap! actor-atom become new-actor))

(defn push-not-matched [{keys [not-matched] :as actor-data} msg]
  (assoc actor-data
    :not-matched (conj not-matched msg)))

(defn push-not-matched! [actor-atom msg]
  (swap! actor-atom push-not-matched msg))

(declare dispatch-execution)

(defn run-actor [msg actor-atom]
  (fn []
  	(let[
    	   {:keys [actor]} (swap! actor-atom consume-next-execution) 
         result (listen actor msg)]
   	 (cond
   	  (nil? result) (become! actor-atom nil)
    	 (satisfies? Response result) (become! actor-atom result)
   	  (= :not-matched result) (push-not-matched! actor-atom msg))
    	(if result (dispatch-execution actor-atom)))))
   
(defn dispatch-execution [actor-atom]
  (let [{:keys [next-mail dispatch] :as actor-data} 
        (swap! actor-atom extract-next-exec)] 
    (when (and next-mail dispatch)
      (js/setTimeout (run-actor next-mail actor-atom) 1))))

(defn push-mail [{:keys [mail] :as actor-data} msg]
  (assoc actor-data
    :mail (conj mail msg)))

(defn send!
  [msg actor-atom]
  "Sends an asinchronous message to the given actor-atom"
  (do
    (swap! actor-atom push-mail msg)
    (dispatch-execution actor-atom)
    @actor-atom
    ))

