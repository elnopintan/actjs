(defproject dragdropexample "0.1.0-SNAPSHOT"
description "FIXME: write description"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.4.0"]
                 [org.clojure/clojurescript "0.0-1450"]
                 [compojure "1.1.1"]
                 [ring/ring-jetty-adapter "1.1.6"]
                 [hiccup "1.0.1"]
                 [actjs "0.1.0-SNAPSHOT"]	
                 [org.clojure/core.match "0.2.0-alpha11"]
                 ]
  :main dragdropexample.core
  :cljsbuild {
    :builds
      [
       {:source-path "src/dragdropexample/cljs"
        :compiler {:output-to "resources/public/main.js"
                   :optimizations :whitespace
                   :externs ["resources/public/externs.js"]
                   :pretty-print true
                   }}]}

  )