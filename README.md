# actjs

Clojurescript library that implements the actor model for use in browsers.

## Usage

The actor behaviour is implemented using Response protocol and its listen method

 (ns hello.core 
   (:require [actjs.main :as act]))
   
 (defrecord HelloWorld []
   act/Response
  (listen [this msg]
		 (js/console (str "Hello " msg))
     this))
     
If listen returns another Response (like this in the example) the given actor will loop
and listen new events using that Response object as its new behaviour.
If listen returns :not-matched, the event will be delayed to be received by a future behaviour of the actor.
If listen returns any other data, the actor will end its execution.

To create a new actor, use spawn function:
 (def hello (act/spawn (HelloWorld.)))

To send a message to an actor user send! function
 (send! "Nacho" hello)
 

## License

Distributed under the Eclipse Public License, the same as Clojure.
