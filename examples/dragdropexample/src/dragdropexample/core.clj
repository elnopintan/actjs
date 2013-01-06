(ns dragdropexample.core
  (:use compojure.core
        ring.adapter.jetty
        hiccup.core
        hiccup.page )
  (:require [compojure.handler :as handler]
            [compojure.route :as route]))

(defroutes app-routes
  (GET "/" [] (html5
               (include-css "/main.css")
               [:div
               (include-js "/main.js")
               [:script { :src "http://localhost:8833/socket.io/socket.io.js"}]
							 [:script { :src "http://localhost:8833/socket.io/lighttable/ws.js" 
                          :type "text/javascript"}]]
               [:div#rectangle {:class "rectangle circle"}
                [:div {:class "square draggable"}]]
               ))
  
  (route/resources "/")
  (route/not-found "Not Found"))

(def app
  (handler/site app-routes))

(defn -main []
   (run-jetty #'app {:port 3000}))




(-main)
