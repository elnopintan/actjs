(ns actjs.test
  (:require [actjs.main :as act]))


(str (defrecord Echoer [counter]
  act/Response
  (listen [this _]
         (do
           (js/alert (str "echo " (:counter this)))
           (Echoer. (inc (:counter this)))))))
           
(def myActor (act/spawn (Echoer. 1)))

(act/send! "hello" myActor)

(take 10 (repeatedly #(act/send! "adios" myActor)))

(act/extract-next-exec {:mail ["adios"] })
        
(js/alert @myActor)


(str (defrecord Server []
       act/Response
       (listen [this from]
               (do
                 (act/send! "pong" from)
                 this))))

(str (defrecord Client []
       act/Response
       (listen [this msg]
               (js/alert (str "Received: " msg)))))


(def server (act/spawn (Server.)))


(str (act/send! (act/spawn (Client.)) server))