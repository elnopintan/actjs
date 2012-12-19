(defproject actjs "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.4.0"]
                 [org.clojure/clojurescript "0.0-1450"]]

    :cljsbuild {
    :builds
      [
       {:source-path "src/actjs/"
        :compiler {:output-to "resources/public/main.js"
                   :optimizations :whitespace
                   :externs ["resources/public/externs.js"]
                   :pretty-print true
                   }}]}
  )
