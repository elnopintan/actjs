var COMPILED = false;
var goog = goog || {};
goog.global = this;
goog.DEBUG = true;
goog.LOCALE = "en";
goog.provide = function(name) {
  if(!COMPILED) {
    if(goog.isProvided_(name)) {
      throw Error('Namespace "' + name + '" already declared.');
    }
    delete goog.implicitNamespaces_[name];
    var namespace = name;
    while(namespace = namespace.substring(0, namespace.lastIndexOf("."))) {
      if(goog.getObjectByName(namespace)) {
        break
      }
      goog.implicitNamespaces_[namespace] = true
    }
  }
  goog.exportPath_(name)
};
goog.setTestOnly = function(opt_message) {
  if(COMPILED && !goog.DEBUG) {
    opt_message = opt_message || "";
    throw Error("Importing test-only code into non-debug environment" + opt_message ? ": " + opt_message : ".");
  }
};
if(!COMPILED) {
  goog.isProvided_ = function(name) {
    return!goog.implicitNamespaces_[name] && !!goog.getObjectByName(name)
  };
  goog.implicitNamespaces_ = {}
}
goog.exportPath_ = function(name, opt_object, opt_objectToExportTo) {
  var parts = name.split(".");
  var cur = opt_objectToExportTo || goog.global;
  if(!(parts[0] in cur) && cur.execScript) {
    cur.execScript("var " + parts[0])
  }
  for(var part;parts.length && (part = parts.shift());) {
    if(!parts.length && goog.isDef(opt_object)) {
      cur[part] = opt_object
    }else {
      if(cur[part]) {
        cur = cur[part]
      }else {
        cur = cur[part] = {}
      }
    }
  }
};
goog.getObjectByName = function(name, opt_obj) {
  var parts = name.split(".");
  var cur = opt_obj || goog.global;
  for(var part;part = parts.shift();) {
    if(goog.isDefAndNotNull(cur[part])) {
      cur = cur[part]
    }else {
      return null
    }
  }
  return cur
};
goog.globalize = function(obj, opt_global) {
  var global = opt_global || goog.global;
  for(var x in obj) {
    global[x] = obj[x]
  }
};
goog.addDependency = function(relPath, provides, requires) {
  if(!COMPILED) {
    var provide, require;
    var path = relPath.replace(/\\/g, "/");
    var deps = goog.dependencies_;
    for(var i = 0;provide = provides[i];i++) {
      deps.nameToPath[provide] = path;
      if(!(path in deps.pathToNames)) {
        deps.pathToNames[path] = {}
      }
      deps.pathToNames[path][provide] = true
    }
    for(var j = 0;require = requires[j];j++) {
      if(!(path in deps.requires)) {
        deps.requires[path] = {}
      }
      deps.requires[path][require] = true
    }
  }
};
goog.ENABLE_DEBUG_LOADER = true;
goog.require = function(name) {
  if(!COMPILED) {
    if(goog.isProvided_(name)) {
      return
    }
    if(goog.ENABLE_DEBUG_LOADER) {
      var path = goog.getPathFromDeps_(name);
      if(path) {
        goog.included_[path] = true;
        goog.writeScripts_();
        return
      }
    }
    var errorMessage = "goog.require could not find: " + name;
    if(goog.global.console) {
      goog.global.console["error"](errorMessage)
    }
    throw Error(errorMessage);
  }
};
goog.basePath = "";
goog.global.CLOSURE_BASE_PATH;
goog.global.CLOSURE_NO_DEPS;
goog.global.CLOSURE_IMPORT_SCRIPT;
goog.nullFunction = function() {
};
goog.identityFunction = function(var_args) {
  return arguments[0]
};
goog.abstractMethod = function() {
  throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function(ctor) {
  ctor.getInstance = function() {
    return ctor.instance_ || (ctor.instance_ = new ctor)
  }
};
if(!COMPILED && goog.ENABLE_DEBUG_LOADER) {
  goog.included_ = {};
  goog.dependencies_ = {pathToNames:{}, nameToPath:{}, requires:{}, visited:{}, written:{}};
  goog.inHtmlDocument_ = function() {
    var doc = goog.global.document;
    return typeof doc != "undefined" && "write" in doc
  };
  goog.findBasePath_ = function() {
    if(goog.global.CLOSURE_BASE_PATH) {
      goog.basePath = goog.global.CLOSURE_BASE_PATH;
      return
    }else {
      if(!goog.inHtmlDocument_()) {
        return
      }
    }
    var doc = goog.global.document;
    var scripts = doc.getElementsByTagName("script");
    for(var i = scripts.length - 1;i >= 0;--i) {
      var src = scripts[i].src;
      var qmark = src.lastIndexOf("?");
      var l = qmark == -1 ? src.length : qmark;
      if(src.substr(l - 7, 7) == "base.js") {
        goog.basePath = src.substr(0, l - 7);
        return
      }
    }
  };
  goog.importScript_ = function(src) {
    var importScript = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_;
    if(!goog.dependencies_.written[src] && importScript(src)) {
      goog.dependencies_.written[src] = true
    }
  };
  goog.writeScriptTag_ = function(src) {
    if(goog.inHtmlDocument_()) {
      var doc = goog.global.document;
      doc.write('<script type="text/javascript" src="' + src + '"></' + "script>");
      return true
    }else {
      return false
    }
  };
  goog.writeScripts_ = function() {
    var scripts = [];
    var seenScript = {};
    var deps = goog.dependencies_;
    function visitNode(path) {
      if(path in deps.written) {
        return
      }
      if(path in deps.visited) {
        if(!(path in seenScript)) {
          seenScript[path] = true;
          scripts.push(path)
        }
        return
      }
      deps.visited[path] = true;
      if(path in deps.requires) {
        for(var requireName in deps.requires[path]) {
          if(!goog.isProvided_(requireName)) {
            if(requireName in deps.nameToPath) {
              visitNode(deps.nameToPath[requireName])
            }else {
              throw Error("Undefined nameToPath for " + requireName);
            }
          }
        }
      }
      if(!(path in seenScript)) {
        seenScript[path] = true;
        scripts.push(path)
      }
    }
    for(var path in goog.included_) {
      if(!deps.written[path]) {
        visitNode(path)
      }
    }
    for(var i = 0;i < scripts.length;i++) {
      if(scripts[i]) {
        goog.importScript_(goog.basePath + scripts[i])
      }else {
        throw Error("Undefined script input");
      }
    }
  };
  goog.getPathFromDeps_ = function(rule) {
    if(rule in goog.dependencies_.nameToPath) {
      return goog.dependencies_.nameToPath[rule]
    }else {
      return null
    }
  };
  goog.findBasePath_();
  if(!goog.global.CLOSURE_NO_DEPS) {
    goog.importScript_(goog.basePath + "deps.js")
  }
}
goog.typeOf = function(value) {
  var s = typeof value;
  if(s == "object") {
    if(value) {
      if(value instanceof Array) {
        return"array"
      }else {
        if(value instanceof Object) {
          return s
        }
      }
      var className = Object.prototype.toString.call(value);
      if(className == "[object Window]") {
        return"object"
      }
      if(className == "[object Array]" || typeof value.length == "number" && typeof value.splice != "undefined" && typeof value.propertyIsEnumerable != "undefined" && !value.propertyIsEnumerable("splice")) {
        return"array"
      }
      if(className == "[object Function]" || typeof value.call != "undefined" && typeof value.propertyIsEnumerable != "undefined" && !value.propertyIsEnumerable("call")) {
        return"function"
      }
    }else {
      return"null"
    }
  }else {
    if(s == "function" && typeof value.call == "undefined") {
      return"object"
    }
  }
  return s
};
goog.propertyIsEnumerableCustom_ = function(object, propName) {
  if(propName in object) {
    for(var key in object) {
      if(key == propName && Object.prototype.hasOwnProperty.call(object, propName)) {
        return true
      }
    }
  }
  return false
};
goog.propertyIsEnumerable_ = function(object, propName) {
  if(object instanceof Object) {
    return Object.prototype.propertyIsEnumerable.call(object, propName)
  }else {
    return goog.propertyIsEnumerableCustom_(object, propName)
  }
};
goog.isDef = function(val) {
  return val !== undefined
};
goog.isNull = function(val) {
  return val === null
};
goog.isDefAndNotNull = function(val) {
  return val != null
};
goog.isArray = function(val) {
  return goog.typeOf(val) == "array"
};
goog.isArrayLike = function(val) {
  var type = goog.typeOf(val);
  return type == "array" || type == "object" && typeof val.length == "number"
};
goog.isDateLike = function(val) {
  return goog.isObject(val) && typeof val.getFullYear == "function"
};
goog.isString = function(val) {
  return typeof val == "string"
};
goog.isBoolean = function(val) {
  return typeof val == "boolean"
};
goog.isNumber = function(val) {
  return typeof val == "number"
};
goog.isFunction = function(val) {
  return goog.typeOf(val) == "function"
};
goog.isObject = function(val) {
  var type = goog.typeOf(val);
  return type == "object" || type == "array" || type == "function"
};
goog.getUid = function(obj) {
  return obj[goog.UID_PROPERTY_] || (obj[goog.UID_PROPERTY_] = ++goog.uidCounter_)
};
goog.removeUid = function(obj) {
  if("removeAttribute" in obj) {
    obj.removeAttribute(goog.UID_PROPERTY_)
  }
  try {
    delete obj[goog.UID_PROPERTY_]
  }catch(ex) {
  }
};
goog.UID_PROPERTY_ = "closure_uid_" + Math.floor(Math.random() * 2147483648).toString(36);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function(obj) {
  var type = goog.typeOf(obj);
  if(type == "object" || type == "array") {
    if(obj.clone) {
      return obj.clone()
    }
    var clone = type == "array" ? [] : {};
    for(var key in obj) {
      clone[key] = goog.cloneObject(obj[key])
    }
    return clone
  }
  return obj
};
Object.prototype.clone;
goog.bindNative_ = function(fn, selfObj, var_args) {
  return fn.call.apply(fn.bind, arguments)
};
goog.bindJs_ = function(fn, selfObj, var_args) {
  if(!fn) {
    throw new Error;
  }
  if(arguments.length > 2) {
    var boundArgs = Array.prototype.slice.call(arguments, 2);
    return function() {
      var newArgs = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(newArgs, boundArgs);
      return fn.apply(selfObj, newArgs)
    }
  }else {
    return function() {
      return fn.apply(selfObj, arguments)
    }
  }
};
goog.bind = function(fn, selfObj, var_args) {
  if(Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1) {
    goog.bind = goog.bindNative_
  }else {
    goog.bind = goog.bindJs_
  }
  return goog.bind.apply(null, arguments)
};
goog.partial = function(fn, var_args) {
  var args = Array.prototype.slice.call(arguments, 1);
  return function() {
    var newArgs = Array.prototype.slice.call(arguments);
    newArgs.unshift.apply(newArgs, args);
    return fn.apply(this, newArgs)
  }
};
goog.mixin = function(target, source) {
  for(var x in source) {
    target[x] = source[x]
  }
};
goog.now = Date.now || function() {
  return+new Date
};
goog.globalEval = function(script) {
  if(goog.global.execScript) {
    goog.global.execScript(script, "JavaScript")
  }else {
    if(goog.global.eval) {
      if(goog.evalWorksForGlobals_ == null) {
        goog.global.eval("var _et_ = 1;");
        if(typeof goog.global["_et_"] != "undefined") {
          delete goog.global["_et_"];
          goog.evalWorksForGlobals_ = true
        }else {
          goog.evalWorksForGlobals_ = false
        }
      }
      if(goog.evalWorksForGlobals_) {
        goog.global.eval(script)
      }else {
        var doc = goog.global.document;
        var scriptElt = doc.createElement("script");
        scriptElt.type = "text/javascript";
        scriptElt.defer = false;
        scriptElt.appendChild(doc.createTextNode(script));
        doc.body.appendChild(scriptElt);
        doc.body.removeChild(scriptElt)
      }
    }else {
      throw Error("goog.globalEval not available");
    }
  }
};
goog.evalWorksForGlobals_ = null;
goog.cssNameMapping_;
goog.cssNameMappingStyle_;
goog.getCssName = function(className, opt_modifier) {
  var getMapping = function(cssName) {
    return goog.cssNameMapping_[cssName] || cssName
  };
  var renameByParts = function(cssName) {
    var parts = cssName.split("-");
    var mapped = [];
    for(var i = 0;i < parts.length;i++) {
      mapped.push(getMapping(parts[i]))
    }
    return mapped.join("-")
  };
  var rename;
  if(goog.cssNameMapping_) {
    rename = goog.cssNameMappingStyle_ == "BY_WHOLE" ? getMapping : renameByParts
  }else {
    rename = function(a) {
      return a
    }
  }
  if(opt_modifier) {
    return className + "-" + rename(opt_modifier)
  }else {
    return rename(className)
  }
};
goog.setCssNameMapping = function(mapping, opt_style) {
  goog.cssNameMapping_ = mapping;
  goog.cssNameMappingStyle_ = opt_style
};
goog.global.CLOSURE_CSS_NAME_MAPPING;
if(!COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING) {
  goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING
}
goog.getMsg = function(str, opt_values) {
  var values = opt_values || {};
  for(var key in values) {
    var value = ("" + values[key]).replace(/\$/g, "$$$$");
    str = str.replace(new RegExp("\\{\\$" + key + "\\}", "gi"), value)
  }
  return str
};
goog.exportSymbol = function(publicPath, object, opt_objectToExportTo) {
  goog.exportPath_(publicPath, object, opt_objectToExportTo)
};
goog.exportProperty = function(object, publicName, symbol) {
  object[publicName] = symbol
};
goog.inherits = function(childCtor, parentCtor) {
  function tempCtor() {
  }
  tempCtor.prototype = parentCtor.prototype;
  childCtor.superClass_ = parentCtor.prototype;
  childCtor.prototype = new tempCtor;
  childCtor.prototype.constructor = childCtor
};
goog.base = function(me, opt_methodName, var_args) {
  var caller = arguments.callee.caller;
  if(caller.superClass_) {
    return caller.superClass_.constructor.apply(me, Array.prototype.slice.call(arguments, 1))
  }
  var args = Array.prototype.slice.call(arguments, 2);
  var foundCaller = false;
  for(var ctor = me.constructor;ctor;ctor = ctor.superClass_ && ctor.superClass_.constructor) {
    if(ctor.prototype[opt_methodName] === caller) {
      foundCaller = true
    }else {
      if(foundCaller) {
        return ctor.prototype[opt_methodName].apply(me, args)
      }
    }
  }
  if(me[opt_methodName] === caller) {
    return me.constructor.prototype[opt_methodName].apply(me, args)
  }else {
    throw Error("goog.base called from a method of one name " + "to a method of a different name");
  }
};
goog.scope = function(fn) {
  fn.call(goog.global)
};
goog.provide("goog.debug.Error");
goog.debug.Error = function(opt_msg) {
  this.stack = (new Error).stack || "";
  if(opt_msg) {
    this.message = String(opt_msg)
  }
};
goog.inherits(goog.debug.Error, Error);
goog.debug.Error.prototype.name = "CustomError";
goog.provide("goog.string");
goog.provide("goog.string.Unicode");
goog.string.Unicode = {NBSP:"\u00a0"};
goog.string.startsWith = function(str, prefix) {
  return str.lastIndexOf(prefix, 0) == 0
};
goog.string.endsWith = function(str, suffix) {
  var l = str.length - suffix.length;
  return l >= 0 && str.indexOf(suffix, l) == l
};
goog.string.caseInsensitiveStartsWith = function(str, prefix) {
  return goog.string.caseInsensitiveCompare(prefix, str.substr(0, prefix.length)) == 0
};
goog.string.caseInsensitiveEndsWith = function(str, suffix) {
  return goog.string.caseInsensitiveCompare(suffix, str.substr(str.length - suffix.length, suffix.length)) == 0
};
goog.string.subs = function(str, var_args) {
  for(var i = 1;i < arguments.length;i++) {
    var replacement = String(arguments[i]).replace(/\$/g, "$$$$");
    str = str.replace(/\%s/, replacement)
  }
  return str
};
goog.string.collapseWhitespace = function(str) {
  return str.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "")
};
goog.string.isEmpty = function(str) {
  return/^[\s\xa0]*$/.test(str)
};
goog.string.isEmptySafe = function(str) {
  return goog.string.isEmpty(goog.string.makeSafe(str))
};
goog.string.isBreakingWhitespace = function(str) {
  return!/[^\t\n\r ]/.test(str)
};
goog.string.isAlpha = function(str) {
  return!/[^a-zA-Z]/.test(str)
};
goog.string.isNumeric = function(str) {
  return!/[^0-9]/.test(str)
};
goog.string.isAlphaNumeric = function(str) {
  return!/[^a-zA-Z0-9]/.test(str)
};
goog.string.isSpace = function(ch) {
  return ch == " "
};
goog.string.isUnicodeChar = function(ch) {
  return ch.length == 1 && ch >= " " && ch <= "~" || ch >= "\u0080" && ch <= "\ufffd"
};
goog.string.stripNewlines = function(str) {
  return str.replace(/(\r\n|\r|\n)+/g, " ")
};
goog.string.canonicalizeNewlines = function(str) {
  return str.replace(/(\r\n|\r|\n)/g, "\n")
};
goog.string.normalizeWhitespace = function(str) {
  return str.replace(/\xa0|\s/g, " ")
};
goog.string.normalizeSpaces = function(str) {
  return str.replace(/\xa0|[ \t]+/g, " ")
};
goog.string.collapseBreakingSpaces = function(str) {
  return str.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "")
};
goog.string.trim = function(str) {
  return str.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
};
goog.string.trimLeft = function(str) {
  return str.replace(/^[\s\xa0]+/, "")
};
goog.string.trimRight = function(str) {
  return str.replace(/[\s\xa0]+$/, "")
};
goog.string.caseInsensitiveCompare = function(str1, str2) {
  var test1 = String(str1).toLowerCase();
  var test2 = String(str2).toLowerCase();
  if(test1 < test2) {
    return-1
  }else {
    if(test1 == test2) {
      return 0
    }else {
      return 1
    }
  }
};
goog.string.numerateCompareRegExp_ = /(\.\d+)|(\d+)|(\D+)/g;
goog.string.numerateCompare = function(str1, str2) {
  if(str1 == str2) {
    return 0
  }
  if(!str1) {
    return-1
  }
  if(!str2) {
    return 1
  }
  var tokens1 = str1.toLowerCase().match(goog.string.numerateCompareRegExp_);
  var tokens2 = str2.toLowerCase().match(goog.string.numerateCompareRegExp_);
  var count = Math.min(tokens1.length, tokens2.length);
  for(var i = 0;i < count;i++) {
    var a = tokens1[i];
    var b = tokens2[i];
    if(a != b) {
      var num1 = parseInt(a, 10);
      if(!isNaN(num1)) {
        var num2 = parseInt(b, 10);
        if(!isNaN(num2) && num1 - num2) {
          return num1 - num2
        }
      }
      return a < b ? -1 : 1
    }
  }
  if(tokens1.length != tokens2.length) {
    return tokens1.length - tokens2.length
  }
  return str1 < str2 ? -1 : 1
};
goog.string.encodeUriRegExp_ = /^[a-zA-Z0-9\-_.!~*'()]*$/;
goog.string.urlEncode = function(str) {
  str = String(str);
  if(!goog.string.encodeUriRegExp_.test(str)) {
    return encodeURIComponent(str)
  }
  return str
};
goog.string.urlDecode = function(str) {
  return decodeURIComponent(str.replace(/\+/g, " "))
};
goog.string.newLineToBr = function(str, opt_xml) {
  return str.replace(/(\r\n|\r|\n)/g, opt_xml ? "<br />" : "<br>")
};
goog.string.htmlEscape = function(str, opt_isLikelyToContainHtmlChars) {
  if(opt_isLikelyToContainHtmlChars) {
    return str.replace(goog.string.amperRe_, "&amp;").replace(goog.string.ltRe_, "&lt;").replace(goog.string.gtRe_, "&gt;").replace(goog.string.quotRe_, "&quot;")
  }else {
    if(!goog.string.allRe_.test(str)) {
      return str
    }
    if(str.indexOf("&") != -1) {
      str = str.replace(goog.string.amperRe_, "&amp;")
    }
    if(str.indexOf("<") != -1) {
      str = str.replace(goog.string.ltRe_, "&lt;")
    }
    if(str.indexOf(">") != -1) {
      str = str.replace(goog.string.gtRe_, "&gt;")
    }
    if(str.indexOf('"') != -1) {
      str = str.replace(goog.string.quotRe_, "&quot;")
    }
    return str
  }
};
goog.string.amperRe_ = /&/g;
goog.string.ltRe_ = /</g;
goog.string.gtRe_ = />/g;
goog.string.quotRe_ = /\"/g;
goog.string.allRe_ = /[&<>\"]/;
goog.string.unescapeEntities = function(str) {
  if(goog.string.contains(str, "&")) {
    if("document" in goog.global) {
      return goog.string.unescapeEntitiesUsingDom_(str)
    }else {
      return goog.string.unescapePureXmlEntities_(str)
    }
  }
  return str
};
goog.string.unescapeEntitiesUsingDom_ = function(str) {
  var seen = {"&amp;":"&", "&lt;":"<", "&gt;":">", "&quot;":'"'};
  var div = document.createElement("div");
  return str.replace(goog.string.HTML_ENTITY_PATTERN_, function(s, entity) {
    var value = seen[s];
    if(value) {
      return value
    }
    if(entity.charAt(0) == "#") {
      var n = Number("0" + entity.substr(1));
      if(!isNaN(n)) {
        value = String.fromCharCode(n)
      }
    }
    if(!value) {
      div.innerHTML = s + " ";
      value = div.firstChild.nodeValue.slice(0, -1)
    }
    return seen[s] = value
  })
};
goog.string.unescapePureXmlEntities_ = function(str) {
  return str.replace(/&([^;]+);/g, function(s, entity) {
    switch(entity) {
      case "amp":
        return"&";
      case "lt":
        return"<";
      case "gt":
        return">";
      case "quot":
        return'"';
      default:
        if(entity.charAt(0) == "#") {
          var n = Number("0" + entity.substr(1));
          if(!isNaN(n)) {
            return String.fromCharCode(n)
          }
        }
        return s
    }
  })
};
goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;
goog.string.whitespaceEscape = function(str, opt_xml) {
  return goog.string.newLineToBr(str.replace(/  /g, " &#160;"), opt_xml)
};
goog.string.stripQuotes = function(str, quoteChars) {
  var length = quoteChars.length;
  for(var i = 0;i < length;i++) {
    var quoteChar = length == 1 ? quoteChars : quoteChars.charAt(i);
    if(str.charAt(0) == quoteChar && str.charAt(str.length - 1) == quoteChar) {
      return str.substring(1, str.length - 1)
    }
  }
  return str
};
goog.string.truncate = function(str, chars, opt_protectEscapedCharacters) {
  if(opt_protectEscapedCharacters) {
    str = goog.string.unescapeEntities(str)
  }
  if(str.length > chars) {
    str = str.substring(0, chars - 3) + "..."
  }
  if(opt_protectEscapedCharacters) {
    str = goog.string.htmlEscape(str)
  }
  return str
};
goog.string.truncateMiddle = function(str, chars, opt_protectEscapedCharacters, opt_trailingChars) {
  if(opt_protectEscapedCharacters) {
    str = goog.string.unescapeEntities(str)
  }
  if(opt_trailingChars && str.length > chars) {
    if(opt_trailingChars > chars) {
      opt_trailingChars = chars
    }
    var endPoint = str.length - opt_trailingChars;
    var startPoint = chars - opt_trailingChars;
    str = str.substring(0, startPoint) + "..." + str.substring(endPoint)
  }else {
    if(str.length > chars) {
      var half = Math.floor(chars / 2);
      var endPos = str.length - half;
      half += chars % 2;
      str = str.substring(0, half) + "..." + str.substring(endPos)
    }
  }
  if(opt_protectEscapedCharacters) {
    str = goog.string.htmlEscape(str)
  }
  return str
};
goog.string.specialEscapeChars_ = {"\x00":"\\0", "\u0008":"\\b", "\u000c":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\x0B", '"':'\\"', "\\":"\\\\"};
goog.string.jsEscapeCache_ = {"'":"\\'"};
goog.string.quote = function(s) {
  s = String(s);
  if(s.quote) {
    return s.quote()
  }else {
    var sb = ['"'];
    for(var i = 0;i < s.length;i++) {
      var ch = s.charAt(i);
      var cc = ch.charCodeAt(0);
      sb[i + 1] = goog.string.specialEscapeChars_[ch] || (cc > 31 && cc < 127 ? ch : goog.string.escapeChar(ch))
    }
    sb.push('"');
    return sb.join("")
  }
};
goog.string.escapeString = function(str) {
  var sb = [];
  for(var i = 0;i < str.length;i++) {
    sb[i] = goog.string.escapeChar(str.charAt(i))
  }
  return sb.join("")
};
goog.string.escapeChar = function(c) {
  if(c in goog.string.jsEscapeCache_) {
    return goog.string.jsEscapeCache_[c]
  }
  if(c in goog.string.specialEscapeChars_) {
    return goog.string.jsEscapeCache_[c] = goog.string.specialEscapeChars_[c]
  }
  var rv = c;
  var cc = c.charCodeAt(0);
  if(cc > 31 && cc < 127) {
    rv = c
  }else {
    if(cc < 256) {
      rv = "\\x";
      if(cc < 16 || cc > 256) {
        rv += "0"
      }
    }else {
      rv = "\\u";
      if(cc < 4096) {
        rv += "0"
      }
    }
    rv += cc.toString(16).toUpperCase()
  }
  return goog.string.jsEscapeCache_[c] = rv
};
goog.string.toMap = function(s) {
  var rv = {};
  for(var i = 0;i < s.length;i++) {
    rv[s.charAt(i)] = true
  }
  return rv
};
goog.string.contains = function(s, ss) {
  return s.indexOf(ss) != -1
};
goog.string.removeAt = function(s, index, stringLength) {
  var resultStr = s;
  if(index >= 0 && index < s.length && stringLength > 0) {
    resultStr = s.substr(0, index) + s.substr(index + stringLength, s.length - index - stringLength)
  }
  return resultStr
};
goog.string.remove = function(s, ss) {
  var re = new RegExp(goog.string.regExpEscape(ss), "");
  return s.replace(re, "")
};
goog.string.removeAll = function(s, ss) {
  var re = new RegExp(goog.string.regExpEscape(ss), "g");
  return s.replace(re, "")
};
goog.string.regExpEscape = function(s) {
  return String(s).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
};
goog.string.repeat = function(string, length) {
  return(new Array(length + 1)).join(string)
};
goog.string.padNumber = function(num, length, opt_precision) {
  var s = goog.isDef(opt_precision) ? num.toFixed(opt_precision) : String(num);
  var index = s.indexOf(".");
  if(index == -1) {
    index = s.length
  }
  return goog.string.repeat("0", Math.max(0, length - index)) + s
};
goog.string.makeSafe = function(obj) {
  return obj == null ? "" : String(obj)
};
goog.string.buildString = function(var_args) {
  return Array.prototype.join.call(arguments, "")
};
goog.string.getRandomString = function() {
  var x = 2147483648;
  return Math.floor(Math.random() * x).toString(36) + Math.abs(Math.floor(Math.random() * x) ^ goog.now()).toString(36)
};
goog.string.compareVersions = function(version1, version2) {
  var order = 0;
  var v1Subs = goog.string.trim(String(version1)).split(".");
  var v2Subs = goog.string.trim(String(version2)).split(".");
  var subCount = Math.max(v1Subs.length, v2Subs.length);
  for(var subIdx = 0;order == 0 && subIdx < subCount;subIdx++) {
    var v1Sub = v1Subs[subIdx] || "";
    var v2Sub = v2Subs[subIdx] || "";
    var v1CompParser = new RegExp("(\\d*)(\\D*)", "g");
    var v2CompParser = new RegExp("(\\d*)(\\D*)", "g");
    do {
      var v1Comp = v1CompParser.exec(v1Sub) || ["", "", ""];
      var v2Comp = v2CompParser.exec(v2Sub) || ["", "", ""];
      if(v1Comp[0].length == 0 && v2Comp[0].length == 0) {
        break
      }
      var v1CompNum = v1Comp[1].length == 0 ? 0 : parseInt(v1Comp[1], 10);
      var v2CompNum = v2Comp[1].length == 0 ? 0 : parseInt(v2Comp[1], 10);
      order = goog.string.compareElements_(v1CompNum, v2CompNum) || goog.string.compareElements_(v1Comp[2].length == 0, v2Comp[2].length == 0) || goog.string.compareElements_(v1Comp[2], v2Comp[2])
    }while(order == 0)
  }
  return order
};
goog.string.compareElements_ = function(left, right) {
  if(left < right) {
    return-1
  }else {
    if(left > right) {
      return 1
    }
  }
  return 0
};
goog.string.HASHCODE_MAX_ = 4294967296;
goog.string.hashCode = function(str) {
  var result = 0;
  for(var i = 0;i < str.length;++i) {
    result = 31 * result + str.charCodeAt(i);
    result %= goog.string.HASHCODE_MAX_
  }
  return result
};
goog.string.uniqueStringCounter_ = Math.random() * 2147483648 | 0;
goog.string.createUniqueString = function() {
  return"goog_" + goog.string.uniqueStringCounter_++
};
goog.string.toNumber = function(str) {
  var num = Number(str);
  if(num == 0 && goog.string.isEmpty(str)) {
    return NaN
  }
  return num
};
goog.string.toCamelCaseCache_ = {};
goog.string.toCamelCase = function(str) {
  return goog.string.toCamelCaseCache_[str] || (goog.string.toCamelCaseCache_[str] = String(str).replace(/\-([a-z])/g, function(all, match) {
    return match.toUpperCase()
  }))
};
goog.string.toSelectorCaseCache_ = {};
goog.string.toSelectorCase = function(str) {
  return goog.string.toSelectorCaseCache_[str] || (goog.string.toSelectorCaseCache_[str] = String(str).replace(/([A-Z])/g, "-$1").toLowerCase())
};
goog.provide("goog.asserts");
goog.provide("goog.asserts.AssertionError");
goog.require("goog.debug.Error");
goog.require("goog.string");
goog.asserts.ENABLE_ASSERTS = goog.DEBUG;
goog.asserts.AssertionError = function(messagePattern, messageArgs) {
  messageArgs.unshift(messagePattern);
  goog.debug.Error.call(this, goog.string.subs.apply(null, messageArgs));
  messageArgs.shift();
  this.messagePattern = messagePattern
};
goog.inherits(goog.asserts.AssertionError, goog.debug.Error);
goog.asserts.AssertionError.prototype.name = "AssertionError";
goog.asserts.doAssertFailure_ = function(defaultMessage, defaultArgs, givenMessage, givenArgs) {
  var message = "Assertion failed";
  if(givenMessage) {
    message += ": " + givenMessage;
    var args = givenArgs
  }else {
    if(defaultMessage) {
      message += ": " + defaultMessage;
      args = defaultArgs
    }
  }
  throw new goog.asserts.AssertionError("" + message, args || []);
};
goog.asserts.assert = function(condition, opt_message, var_args) {
  if(goog.asserts.ENABLE_ASSERTS && !condition) {
    goog.asserts.doAssertFailure_("", null, opt_message, Array.prototype.slice.call(arguments, 2))
  }
  return condition
};
goog.asserts.fail = function(opt_message, var_args) {
  if(goog.asserts.ENABLE_ASSERTS) {
    throw new goog.asserts.AssertionError("Failure" + (opt_message ? ": " + opt_message : ""), Array.prototype.slice.call(arguments, 1));
  }
};
goog.asserts.assertNumber = function(value, opt_message, var_args) {
  if(goog.asserts.ENABLE_ASSERTS && !goog.isNumber(value)) {
    goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2))
  }
  return value
};
goog.asserts.assertString = function(value, opt_message, var_args) {
  if(goog.asserts.ENABLE_ASSERTS && !goog.isString(value)) {
    goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2))
  }
  return value
};
goog.asserts.assertFunction = function(value, opt_message, var_args) {
  if(goog.asserts.ENABLE_ASSERTS && !goog.isFunction(value)) {
    goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2))
  }
  return value
};
goog.asserts.assertObject = function(value, opt_message, var_args) {
  if(goog.asserts.ENABLE_ASSERTS && !goog.isObject(value)) {
    goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2))
  }
  return value
};
goog.asserts.assertArray = function(value, opt_message, var_args) {
  if(goog.asserts.ENABLE_ASSERTS && !goog.isArray(value)) {
    goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2))
  }
  return value
};
goog.asserts.assertBoolean = function(value, opt_message, var_args) {
  if(goog.asserts.ENABLE_ASSERTS && !goog.isBoolean(value)) {
    goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2))
  }
  return value
};
goog.asserts.assertInstanceof = function(value, type, opt_message, var_args) {
  if(goog.asserts.ENABLE_ASSERTS && !(value instanceof type)) {
    goog.asserts.doAssertFailure_("instanceof check failed.", null, opt_message, Array.prototype.slice.call(arguments, 3))
  }
};
goog.provide("goog.array");
goog.provide("goog.array.ArrayLike");
goog.require("goog.asserts");
goog.NATIVE_ARRAY_PROTOTYPES = true;
goog.array.ArrayLike;
goog.array.peek = function(array) {
  return array[array.length - 1]
};
goog.array.ARRAY_PROTOTYPE_ = Array.prototype;
goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.indexOf ? function(arr, obj, opt_fromIndex) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.indexOf.call(arr, obj, opt_fromIndex)
} : function(arr, obj, opt_fromIndex) {
  var fromIndex = opt_fromIndex == null ? 0 : opt_fromIndex < 0 ? Math.max(0, arr.length + opt_fromIndex) : opt_fromIndex;
  if(goog.isString(arr)) {
    if(!goog.isString(obj) || obj.length != 1) {
      return-1
    }
    return arr.indexOf(obj, fromIndex)
  }
  for(var i = fromIndex;i < arr.length;i++) {
    if(i in arr && arr[i] === obj) {
      return i
    }
  }
  return-1
};
goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.lastIndexOf ? function(arr, obj, opt_fromIndex) {
  goog.asserts.assert(arr.length != null);
  var fromIndex = opt_fromIndex == null ? arr.length - 1 : opt_fromIndex;
  return goog.array.ARRAY_PROTOTYPE_.lastIndexOf.call(arr, obj, fromIndex)
} : function(arr, obj, opt_fromIndex) {
  var fromIndex = opt_fromIndex == null ? arr.length - 1 : opt_fromIndex;
  if(fromIndex < 0) {
    fromIndex = Math.max(0, arr.length + fromIndex)
  }
  if(goog.isString(arr)) {
    if(!goog.isString(obj) || obj.length != 1) {
      return-1
    }
    return arr.lastIndexOf(obj, fromIndex)
  }
  for(var i = fromIndex;i >= 0;i--) {
    if(i in arr && arr[i] === obj) {
      return i
    }
  }
  return-1
};
goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.forEach ? function(arr, f, opt_obj) {
  goog.asserts.assert(arr.length != null);
  goog.array.ARRAY_PROTOTYPE_.forEach.call(arr, f, opt_obj)
} : function(arr, f, opt_obj) {
  var l = arr.length;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for(var i = 0;i < l;i++) {
    if(i in arr2) {
      f.call(opt_obj, arr2[i], i, arr)
    }
  }
};
goog.array.forEachRight = function(arr, f, opt_obj) {
  var l = arr.length;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for(var i = l - 1;i >= 0;--i) {
    if(i in arr2) {
      f.call(opt_obj, arr2[i], i, arr)
    }
  }
};
goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.filter ? function(arr, f, opt_obj) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.filter.call(arr, f, opt_obj)
} : function(arr, f, opt_obj) {
  var l = arr.length;
  var res = [];
  var resLength = 0;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for(var i = 0;i < l;i++) {
    if(i in arr2) {
      var val = arr2[i];
      if(f.call(opt_obj, val, i, arr)) {
        res[resLength++] = val
      }
    }
  }
  return res
};
goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.map ? function(arr, f, opt_obj) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.map.call(arr, f, opt_obj)
} : function(arr, f, opt_obj) {
  var l = arr.length;
  var res = new Array(l);
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for(var i = 0;i < l;i++) {
    if(i in arr2) {
      res[i] = f.call(opt_obj, arr2[i], i, arr)
    }
  }
  return res
};
goog.array.reduce = function(arr, f, val, opt_obj) {
  if(arr.reduce) {
    if(opt_obj) {
      return arr.reduce(goog.bind(f, opt_obj), val)
    }else {
      return arr.reduce(f, val)
    }
  }
  var rval = val;
  goog.array.forEach(arr, function(val, index) {
    rval = f.call(opt_obj, rval, val, index, arr)
  });
  return rval
};
goog.array.reduceRight = function(arr, f, val, opt_obj) {
  if(arr.reduceRight) {
    if(opt_obj) {
      return arr.reduceRight(goog.bind(f, opt_obj), val)
    }else {
      return arr.reduceRight(f, val)
    }
  }
  var rval = val;
  goog.array.forEachRight(arr, function(val, index) {
    rval = f.call(opt_obj, rval, val, index, arr)
  });
  return rval
};
goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.some ? function(arr, f, opt_obj) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.some.call(arr, f, opt_obj)
} : function(arr, f, opt_obj) {
  var l = arr.length;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for(var i = 0;i < l;i++) {
    if(i in arr2 && f.call(opt_obj, arr2[i], i, arr)) {
      return true
    }
  }
  return false
};
goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.every ? function(arr, f, opt_obj) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.every.call(arr, f, opt_obj)
} : function(arr, f, opt_obj) {
  var l = arr.length;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for(var i = 0;i < l;i++) {
    if(i in arr2 && !f.call(opt_obj, arr2[i], i, arr)) {
      return false
    }
  }
  return true
};
goog.array.find = function(arr, f, opt_obj) {
  var i = goog.array.findIndex(arr, f, opt_obj);
  return i < 0 ? null : goog.isString(arr) ? arr.charAt(i) : arr[i]
};
goog.array.findIndex = function(arr, f, opt_obj) {
  var l = arr.length;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for(var i = 0;i < l;i++) {
    if(i in arr2 && f.call(opt_obj, arr2[i], i, arr)) {
      return i
    }
  }
  return-1
};
goog.array.findRight = function(arr, f, opt_obj) {
  var i = goog.array.findIndexRight(arr, f, opt_obj);
  return i < 0 ? null : goog.isString(arr) ? arr.charAt(i) : arr[i]
};
goog.array.findIndexRight = function(arr, f, opt_obj) {
  var l = arr.length;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for(var i = l - 1;i >= 0;i--) {
    if(i in arr2 && f.call(opt_obj, arr2[i], i, arr)) {
      return i
    }
  }
  return-1
};
goog.array.contains = function(arr, obj) {
  return goog.array.indexOf(arr, obj) >= 0
};
goog.array.isEmpty = function(arr) {
  return arr.length == 0
};
goog.array.clear = function(arr) {
  if(!goog.isArray(arr)) {
    for(var i = arr.length - 1;i >= 0;i--) {
      delete arr[i]
    }
  }
  arr.length = 0
};
goog.array.insert = function(arr, obj) {
  if(!goog.array.contains(arr, obj)) {
    arr.push(obj)
  }
};
goog.array.insertAt = function(arr, obj, opt_i) {
  goog.array.splice(arr, opt_i, 0, obj)
};
goog.array.insertArrayAt = function(arr, elementsToAdd, opt_i) {
  goog.partial(goog.array.splice, arr, opt_i, 0).apply(null, elementsToAdd)
};
goog.array.insertBefore = function(arr, obj, opt_obj2) {
  var i;
  if(arguments.length == 2 || (i = goog.array.indexOf(arr, opt_obj2)) < 0) {
    arr.push(obj)
  }else {
    goog.array.insertAt(arr, obj, i)
  }
};
goog.array.remove = function(arr, obj) {
  var i = goog.array.indexOf(arr, obj);
  var rv;
  if(rv = i >= 0) {
    goog.array.removeAt(arr, i)
  }
  return rv
};
goog.array.removeAt = function(arr, i) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.splice.call(arr, i, 1).length == 1
};
goog.array.removeIf = function(arr, f, opt_obj) {
  var i = goog.array.findIndex(arr, f, opt_obj);
  if(i >= 0) {
    goog.array.removeAt(arr, i);
    return true
  }
  return false
};
goog.array.concat = function(var_args) {
  return goog.array.ARRAY_PROTOTYPE_.concat.apply(goog.array.ARRAY_PROTOTYPE_, arguments)
};
goog.array.clone = function(arr) {
  if(goog.isArray(arr)) {
    return goog.array.concat(arr)
  }else {
    var rv = [];
    for(var i = 0, len = arr.length;i < len;i++) {
      rv[i] = arr[i]
    }
    return rv
  }
};
goog.array.toArray = function(object) {
  if(goog.isArray(object)) {
    return goog.array.concat(object)
  }
  return goog.array.clone(object)
};
goog.array.extend = function(arr1, var_args) {
  for(var i = 1;i < arguments.length;i++) {
    var arr2 = arguments[i];
    var isArrayLike;
    if(goog.isArray(arr2) || (isArrayLike = goog.isArrayLike(arr2)) && arr2.hasOwnProperty("callee")) {
      arr1.push.apply(arr1, arr2)
    }else {
      if(isArrayLike) {
        var len1 = arr1.length;
        var len2 = arr2.length;
        for(var j = 0;j < len2;j++) {
          arr1[len1 + j] = arr2[j]
        }
      }else {
        arr1.push(arr2)
      }
    }
  }
};
goog.array.splice = function(arr, index, howMany, var_args) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.splice.apply(arr, goog.array.slice(arguments, 1))
};
goog.array.slice = function(arr, start, opt_end) {
  goog.asserts.assert(arr.length != null);
  if(arguments.length <= 2) {
    return goog.array.ARRAY_PROTOTYPE_.slice.call(arr, start)
  }else {
    return goog.array.ARRAY_PROTOTYPE_.slice.call(arr, start, opt_end)
  }
};
goog.array.removeDuplicates = function(arr, opt_rv) {
  var returnArray = opt_rv || arr;
  var seen = {}, cursorInsert = 0, cursorRead = 0;
  while(cursorRead < arr.length) {
    var current = arr[cursorRead++];
    var key = goog.isObject(current) ? "o" + goog.getUid(current) : (typeof current).charAt(0) + current;
    if(!Object.prototype.hasOwnProperty.call(seen, key)) {
      seen[key] = true;
      returnArray[cursorInsert++] = current
    }
  }
  returnArray.length = cursorInsert
};
goog.array.binarySearch = function(arr, target, opt_compareFn) {
  return goog.array.binarySearch_(arr, opt_compareFn || goog.array.defaultCompare, false, target)
};
goog.array.binarySelect = function(arr, evaluator, opt_obj) {
  return goog.array.binarySearch_(arr, evaluator, true, undefined, opt_obj)
};
goog.array.binarySearch_ = function(arr, compareFn, isEvaluator, opt_target, opt_selfObj) {
  var left = 0;
  var right = arr.length;
  var found;
  while(left < right) {
    var middle = left + right >> 1;
    var compareResult;
    if(isEvaluator) {
      compareResult = compareFn.call(opt_selfObj, arr[middle], middle, arr)
    }else {
      compareResult = compareFn(opt_target, arr[middle])
    }
    if(compareResult > 0) {
      left = middle + 1
    }else {
      right = middle;
      found = !compareResult
    }
  }
  return found ? left : ~left
};
goog.array.sort = function(arr, opt_compareFn) {
  goog.asserts.assert(arr.length != null);
  goog.array.ARRAY_PROTOTYPE_.sort.call(arr, opt_compareFn || goog.array.defaultCompare)
};
goog.array.stableSort = function(arr, opt_compareFn) {
  for(var i = 0;i < arr.length;i++) {
    arr[i] = {index:i, value:arr[i]}
  }
  var valueCompareFn = opt_compareFn || goog.array.defaultCompare;
  function stableCompareFn(obj1, obj2) {
    return valueCompareFn(obj1.value, obj2.value) || obj1.index - obj2.index
  }
  goog.array.sort(arr, stableCompareFn);
  for(var i = 0;i < arr.length;i++) {
    arr[i] = arr[i].value
  }
};
goog.array.sortObjectsByKey = function(arr, key, opt_compareFn) {
  var compare = opt_compareFn || goog.array.defaultCompare;
  goog.array.sort(arr, function(a, b) {
    return compare(a[key], b[key])
  })
};
goog.array.isSorted = function(arr, opt_compareFn, opt_strict) {
  var compare = opt_compareFn || goog.array.defaultCompare;
  for(var i = 1;i < arr.length;i++) {
    var compareResult = compare(arr[i - 1], arr[i]);
    if(compareResult > 0 || compareResult == 0 && opt_strict) {
      return false
    }
  }
  return true
};
goog.array.equals = function(arr1, arr2, opt_equalsFn) {
  if(!goog.isArrayLike(arr1) || !goog.isArrayLike(arr2) || arr1.length != arr2.length) {
    return false
  }
  var l = arr1.length;
  var equalsFn = opt_equalsFn || goog.array.defaultCompareEquality;
  for(var i = 0;i < l;i++) {
    if(!equalsFn(arr1[i], arr2[i])) {
      return false
    }
  }
  return true
};
goog.array.compare = function(arr1, arr2, opt_equalsFn) {
  return goog.array.equals(arr1, arr2, opt_equalsFn)
};
goog.array.compare3 = function(arr1, arr2, opt_compareFn) {
  var compare = opt_compareFn || goog.array.defaultCompare;
  var l = Math.min(arr1.length, arr2.length);
  for(var i = 0;i < l;i++) {
    var result = compare(arr1[i], arr2[i]);
    if(result != 0) {
      return result
    }
  }
  return goog.array.defaultCompare(arr1.length, arr2.length)
};
goog.array.defaultCompare = function(a, b) {
  return a > b ? 1 : a < b ? -1 : 0
};
goog.array.defaultCompareEquality = function(a, b) {
  return a === b
};
goog.array.binaryInsert = function(array, value, opt_compareFn) {
  var index = goog.array.binarySearch(array, value, opt_compareFn);
  if(index < 0) {
    goog.array.insertAt(array, value, -(index + 1));
    return true
  }
  return false
};
goog.array.binaryRemove = function(array, value, opt_compareFn) {
  var index = goog.array.binarySearch(array, value, opt_compareFn);
  return index >= 0 ? goog.array.removeAt(array, index) : false
};
goog.array.bucket = function(array, sorter) {
  var buckets = {};
  for(var i = 0;i < array.length;i++) {
    var value = array[i];
    var key = sorter(value, i, array);
    if(goog.isDef(key)) {
      var bucket = buckets[key] || (buckets[key] = []);
      bucket.push(value)
    }
  }
  return buckets
};
goog.array.repeat = function(value, n) {
  var array = [];
  for(var i = 0;i < n;i++) {
    array[i] = value
  }
  return array
};
goog.array.flatten = function(var_args) {
  var result = [];
  for(var i = 0;i < arguments.length;i++) {
    var element = arguments[i];
    if(goog.isArray(element)) {
      result.push.apply(result, goog.array.flatten.apply(null, element))
    }else {
      result.push(element)
    }
  }
  return result
};
goog.array.rotate = function(array, n) {
  goog.asserts.assert(array.length != null);
  if(array.length) {
    n %= array.length;
    if(n > 0) {
      goog.array.ARRAY_PROTOTYPE_.unshift.apply(array, array.splice(-n, n))
    }else {
      if(n < 0) {
        goog.array.ARRAY_PROTOTYPE_.push.apply(array, array.splice(0, -n))
      }
    }
  }
  return array
};
goog.array.zip = function(var_args) {
  if(!arguments.length) {
    return[]
  }
  var result = [];
  for(var i = 0;true;i++) {
    var value = [];
    for(var j = 0;j < arguments.length;j++) {
      var arr = arguments[j];
      if(i >= arr.length) {
        return result
      }
      value.push(arr[i])
    }
    result.push(value)
  }
};
goog.array.shuffle = function(arr, opt_randFn) {
  var randFn = opt_randFn || Math.random;
  for(var i = arr.length - 1;i > 0;i--) {
    var j = Math.floor(randFn() * (i + 1));
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp
  }
};
goog.provide("goog.object");
goog.object.forEach = function(obj, f, opt_obj) {
  for(var key in obj) {
    f.call(opt_obj, obj[key], key, obj)
  }
};
goog.object.filter = function(obj, f, opt_obj) {
  var res = {};
  for(var key in obj) {
    if(f.call(opt_obj, obj[key], key, obj)) {
      res[key] = obj[key]
    }
  }
  return res
};
goog.object.map = function(obj, f, opt_obj) {
  var res = {};
  for(var key in obj) {
    res[key] = f.call(opt_obj, obj[key], key, obj)
  }
  return res
};
goog.object.some = function(obj, f, opt_obj) {
  for(var key in obj) {
    if(f.call(opt_obj, obj[key], key, obj)) {
      return true
    }
  }
  return false
};
goog.object.every = function(obj, f, opt_obj) {
  for(var key in obj) {
    if(!f.call(opt_obj, obj[key], key, obj)) {
      return false
    }
  }
  return true
};
goog.object.getCount = function(obj) {
  var rv = 0;
  for(var key in obj) {
    rv++
  }
  return rv
};
goog.object.getAnyKey = function(obj) {
  for(var key in obj) {
    return key
  }
};
goog.object.getAnyValue = function(obj) {
  for(var key in obj) {
    return obj[key]
  }
};
goog.object.contains = function(obj, val) {
  return goog.object.containsValue(obj, val)
};
goog.object.getValues = function(obj) {
  var res = [];
  var i = 0;
  for(var key in obj) {
    res[i++] = obj[key]
  }
  return res
};
goog.object.getKeys = function(obj) {
  var res = [];
  var i = 0;
  for(var key in obj) {
    res[i++] = key
  }
  return res
};
goog.object.getValueByKeys = function(obj, var_args) {
  var isArrayLike = goog.isArrayLike(var_args);
  var keys = isArrayLike ? var_args : arguments;
  for(var i = isArrayLike ? 0 : 1;i < keys.length;i++) {
    obj = obj[keys[i]];
    if(!goog.isDef(obj)) {
      break
    }
  }
  return obj
};
goog.object.containsKey = function(obj, key) {
  return key in obj
};
goog.object.containsValue = function(obj, val) {
  for(var key in obj) {
    if(obj[key] == val) {
      return true
    }
  }
  return false
};
goog.object.findKey = function(obj, f, opt_this) {
  for(var key in obj) {
    if(f.call(opt_this, obj[key], key, obj)) {
      return key
    }
  }
  return undefined
};
goog.object.findValue = function(obj, f, opt_this) {
  var key = goog.object.findKey(obj, f, opt_this);
  return key && obj[key]
};
goog.object.isEmpty = function(obj) {
  for(var key in obj) {
    return false
  }
  return true
};
goog.object.clear = function(obj) {
  for(var i in obj) {
    delete obj[i]
  }
};
goog.object.remove = function(obj, key) {
  var rv;
  if(rv = key in obj) {
    delete obj[key]
  }
  return rv
};
goog.object.add = function(obj, key, val) {
  if(key in obj) {
    throw Error('The object already contains the key "' + key + '"');
  }
  goog.object.set(obj, key, val)
};
goog.object.get = function(obj, key, opt_val) {
  if(key in obj) {
    return obj[key]
  }
  return opt_val
};
goog.object.set = function(obj, key, value) {
  obj[key] = value
};
goog.object.setIfUndefined = function(obj, key, value) {
  return key in obj ? obj[key] : obj[key] = value
};
goog.object.clone = function(obj) {
  var res = {};
  for(var key in obj) {
    res[key] = obj[key]
  }
  return res
};
goog.object.unsafeClone = function(obj) {
  var type = goog.typeOf(obj);
  if(type == "object" || type == "array") {
    if(obj.clone) {
      return obj.clone()
    }
    var clone = type == "array" ? [] : {};
    for(var key in obj) {
      clone[key] = goog.object.unsafeClone(obj[key])
    }
    return clone
  }
  return obj
};
goog.object.transpose = function(obj) {
  var transposed = {};
  for(var key in obj) {
    transposed[obj[key]] = key
  }
  return transposed
};
goog.object.PROTOTYPE_FIELDS_ = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
goog.object.extend = function(target, var_args) {
  var key, source;
  for(var i = 1;i < arguments.length;i++) {
    source = arguments[i];
    for(key in source) {
      target[key] = source[key]
    }
    for(var j = 0;j < goog.object.PROTOTYPE_FIELDS_.length;j++) {
      key = goog.object.PROTOTYPE_FIELDS_[j];
      if(Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key]
      }
    }
  }
};
goog.object.create = function(var_args) {
  var argLength = arguments.length;
  if(argLength == 1 && goog.isArray(arguments[0])) {
    return goog.object.create.apply(null, arguments[0])
  }
  if(argLength % 2) {
    throw Error("Uneven number of arguments");
  }
  var rv = {};
  for(var i = 0;i < argLength;i += 2) {
    rv[arguments[i]] = arguments[i + 1]
  }
  return rv
};
goog.object.createSet = function(var_args) {
  var argLength = arguments.length;
  if(argLength == 1 && goog.isArray(arguments[0])) {
    return goog.object.createSet.apply(null, arguments[0])
  }
  var rv = {};
  for(var i = 0;i < argLength;i++) {
    rv[arguments[i]] = true
  }
  return rv
};
goog.provide("goog.string.format");
goog.require("goog.string");
goog.string.format = function(formatString, var_args) {
  var args = Array.prototype.slice.call(arguments);
  var template = args.shift();
  if(typeof template == "undefined") {
    throw Error("[goog.string.format] Template required");
  }
  var formatRe = /%([0\-\ \+]*)(\d+)?(\.(\d+))?([%sfdiu])/g;
  function replacerDemuxer(match, flags, width, dotp, precision, type, offset, wholeString) {
    if(type == "%") {
      return"%"
    }
    var value = args.shift();
    if(typeof value == "undefined") {
      throw Error("[goog.string.format] Not enough arguments");
    }
    arguments[0] = value;
    return goog.string.format.demuxes_[type].apply(null, arguments)
  }
  return template.replace(formatRe, replacerDemuxer)
};
goog.string.format.demuxes_ = {};
goog.string.format.demuxes_["s"] = function(value, flags, width, dotp, precision, type, offset, wholeString) {
  var replacement = value;
  if(isNaN(width) || width == "" || replacement.length >= width) {
    return replacement
  }
  if(flags.indexOf("-", 0) > -1) {
    replacement = replacement + goog.string.repeat(" ", width - replacement.length)
  }else {
    replacement = goog.string.repeat(" ", width - replacement.length) + replacement
  }
  return replacement
};
goog.string.format.demuxes_["f"] = function(value, flags, width, dotp, precision, type, offset, wholeString) {
  var replacement = value.toString();
  if(!(isNaN(precision) || precision == "")) {
    replacement = value.toFixed(precision)
  }
  var sign;
  if(value < 0) {
    sign = "-"
  }else {
    if(flags.indexOf("+") >= 0) {
      sign = "+"
    }else {
      if(flags.indexOf(" ") >= 0) {
        sign = " "
      }else {
        sign = ""
      }
    }
  }
  if(value >= 0) {
    replacement = sign + replacement
  }
  if(isNaN(width) || replacement.length >= width) {
    return replacement
  }
  replacement = isNaN(precision) ? Math.abs(value).toString() : Math.abs(value).toFixed(precision);
  var padCount = width - replacement.length - sign.length;
  if(flags.indexOf("-", 0) >= 0) {
    replacement = sign + replacement + goog.string.repeat(" ", padCount)
  }else {
    var paddingChar = flags.indexOf("0", 0) >= 0 ? "0" : " ";
    replacement = sign + goog.string.repeat(paddingChar, padCount) + replacement
  }
  return replacement
};
goog.string.format.demuxes_["d"] = function(value, flags, width, dotp, precision, type, offset, wholeString) {
  return goog.string.format.demuxes_["f"](parseInt(value, 10), flags, width, dotp, 0, type, offset, wholeString)
};
goog.string.format.demuxes_["i"] = goog.string.format.demuxes_["d"];
goog.string.format.demuxes_["u"] = goog.string.format.demuxes_["d"];
goog.provide("goog.userAgent.jscript");
goog.require("goog.string");
goog.userAgent.jscript.ASSUME_NO_JSCRIPT = false;
goog.userAgent.jscript.init_ = function() {
  var hasScriptEngine = "ScriptEngine" in goog.global;
  goog.userAgent.jscript.DETECTED_HAS_JSCRIPT_ = hasScriptEngine && goog.global["ScriptEngine"]() == "JScript";
  goog.userAgent.jscript.DETECTED_VERSION_ = goog.userAgent.jscript.DETECTED_HAS_JSCRIPT_ ? goog.global["ScriptEngineMajorVersion"]() + "." + goog.global["ScriptEngineMinorVersion"]() + "." + goog.global["ScriptEngineBuildVersion"]() : "0"
};
if(!goog.userAgent.jscript.ASSUME_NO_JSCRIPT) {
  goog.userAgent.jscript.init_()
}
goog.userAgent.jscript.HAS_JSCRIPT = goog.userAgent.jscript.ASSUME_NO_JSCRIPT ? false : goog.userAgent.jscript.DETECTED_HAS_JSCRIPT_;
goog.userAgent.jscript.VERSION = goog.userAgent.jscript.ASSUME_NO_JSCRIPT ? "0" : goog.userAgent.jscript.DETECTED_VERSION_;
goog.userAgent.jscript.isVersion = function(version) {
  return goog.string.compareVersions(goog.userAgent.jscript.VERSION, version) >= 0
};
goog.provide("goog.string.StringBuffer");
goog.require("goog.userAgent.jscript");
goog.string.StringBuffer = function(opt_a1, var_args) {
  this.buffer_ = goog.userAgent.jscript.HAS_JSCRIPT ? [] : "";
  if(opt_a1 != null) {
    this.append.apply(this, arguments)
  }
};
goog.string.StringBuffer.prototype.set = function(s) {
  this.clear();
  this.append(s)
};
if(goog.userAgent.jscript.HAS_JSCRIPT) {
  goog.string.StringBuffer.prototype.bufferLength_ = 0;
  goog.string.StringBuffer.prototype.append = function(a1, opt_a2, var_args) {
    if(opt_a2 == null) {
      this.buffer_[this.bufferLength_++] = a1
    }else {
      this.buffer_.push.apply(this.buffer_, arguments);
      this.bufferLength_ = this.buffer_.length
    }
    return this
  }
}else {
  goog.string.StringBuffer.prototype.append = function(a1, opt_a2, var_args) {
    this.buffer_ += a1;
    if(opt_a2 != null) {
      for(var i = 1;i < arguments.length;i++) {
        this.buffer_ += arguments[i]
      }
    }
    return this
  }
}
goog.string.StringBuffer.prototype.clear = function() {
  if(goog.userAgent.jscript.HAS_JSCRIPT) {
    this.buffer_.length = 0;
    this.bufferLength_ = 0
  }else {
    this.buffer_ = ""
  }
};
goog.string.StringBuffer.prototype.getLength = function() {
  return this.toString().length
};
goog.string.StringBuffer.prototype.toString = function() {
  if(goog.userAgent.jscript.HAS_JSCRIPT) {
    var str = this.buffer_.join("");
    this.clear();
    if(str) {
      this.append(str)
    }
    return str
  }else {
    return this.buffer_
  }
};
goog.provide("cljs.core");
goog.require("goog.array");
goog.require("goog.object");
goog.require("goog.string.format");
goog.require("goog.string.StringBuffer");
goog.require("goog.string");
cljs.core._STAR_unchecked_if_STAR_ = false;
cljs.core._STAR_print_fn_STAR_ = function _STAR_print_fn_STAR_(_) {
  throw new Error("No *print-fn* fn set for evaluation environment");
};
cljs.core.truth_ = function truth_(x) {
  return x != null && x !== false
};
cljs.core.type_satisfies_ = function type_satisfies_(p, x) {
  var x__6279 = x == null ? null : x;
  if(p[goog.typeOf(x__6279)]) {
    return true
  }else {
    if(p["_"]) {
      return true
    }else {
      if("\ufdd0'else") {
        return false
      }else {
        return null
      }
    }
  }
};
cljs.core.is_proto_ = function is_proto_(x) {
  return x.constructor.prototype === x
};
cljs.core._STAR_main_cli_fn_STAR_ = null;
cljs.core.missing_protocol = function missing_protocol(proto, obj) {
  return Error(["No protocol method ", proto, " defined for type ", goog.typeOf(obj), ": ", obj].join(""))
};
cljs.core.aclone = function aclone(array_like) {
  return array_like.slice()
};
cljs.core.array = function array(var_args) {
  return Array.prototype.slice.call(arguments)
};
cljs.core.make_array = function() {
  var make_array = null;
  var make_array__1 = function(size) {
    return new Array(size)
  };
  var make_array__2 = function(type, size) {
    return make_array.call(null, size)
  };
  make_array = function(type, size) {
    switch(arguments.length) {
      case 1:
        return make_array__1.call(this, type);
      case 2:
        return make_array__2.call(this, type, size)
    }
    throw"Invalid arity: " + arguments.length;
  };
  make_array.cljs$lang$arity$1 = make_array__1;
  make_array.cljs$lang$arity$2 = make_array__2;
  return make_array
}();
cljs.core.aget = function() {
  var aget = null;
  var aget__2 = function(array, i) {
    return array[i]
  };
  var aget__3 = function() {
    var G__6280__delegate = function(array, i, idxs) {
      return cljs.core.apply.call(null, aget, aget.call(null, array, i), idxs)
    };
    var G__6280 = function(array, i, var_args) {
      var idxs = null;
      if(goog.isDef(var_args)) {
        idxs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__6280__delegate.call(this, array, i, idxs)
    };
    G__6280.cljs$lang$maxFixedArity = 2;
    G__6280.cljs$lang$applyTo = function(arglist__6281) {
      var array = cljs.core.first(arglist__6281);
      var i = cljs.core.first(cljs.core.next(arglist__6281));
      var idxs = cljs.core.rest(cljs.core.next(arglist__6281));
      return G__6280__delegate(array, i, idxs)
    };
    G__6280.cljs$lang$arity$variadic = G__6280__delegate;
    return G__6280
  }();
  aget = function(array, i, var_args) {
    var idxs = var_args;
    switch(arguments.length) {
      case 2:
        return aget__2.call(this, array, i);
      default:
        return aget__3.cljs$lang$arity$variadic(array, i, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  aget.cljs$lang$maxFixedArity = 2;
  aget.cljs$lang$applyTo = aget__3.cljs$lang$applyTo;
  aget.cljs$lang$arity$2 = aget__2;
  aget.cljs$lang$arity$variadic = aget__3.cljs$lang$arity$variadic;
  return aget
}();
cljs.core.aset = function aset(array, i, val) {
  return array[i] = val
};
cljs.core.alength = function alength(array) {
  return array.length
};
cljs.core.into_array = function() {
  var into_array = null;
  var into_array__1 = function(aseq) {
    return into_array.call(null, null, aseq)
  };
  var into_array__2 = function(type, aseq) {
    return cljs.core.reduce.call(null, function(a, x) {
      a.push(x);
      return a
    }, [], aseq)
  };
  into_array = function(type, aseq) {
    switch(arguments.length) {
      case 1:
        return into_array__1.call(this, type);
      case 2:
        return into_array__2.call(this, type, aseq)
    }
    throw"Invalid arity: " + arguments.length;
  };
  into_array.cljs$lang$arity$1 = into_array__1;
  into_array.cljs$lang$arity$2 = into_array__2;
  return into_array
}();
cljs.core.IFn = {};
cljs.core._invoke = function() {
  var _invoke = null;
  var _invoke__1 = function(this$) {
    if(function() {
      var and__3822__auto____6366 = this$;
      if(and__3822__auto____6366) {
        return this$.cljs$core$IFn$_invoke$arity$1
      }else {
        return and__3822__auto____6366
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$1(this$)
    }else {
      var x__2369__auto____6367 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6368 = cljs.core._invoke[goog.typeOf(x__2369__auto____6367)];
        if(or__3824__auto____6368) {
          return or__3824__auto____6368
        }else {
          var or__3824__auto____6369 = cljs.core._invoke["_"];
          if(or__3824__auto____6369) {
            return or__3824__auto____6369
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$)
    }
  };
  var _invoke__2 = function(this$, a) {
    if(function() {
      var and__3822__auto____6370 = this$;
      if(and__3822__auto____6370) {
        return this$.cljs$core$IFn$_invoke$arity$2
      }else {
        return and__3822__auto____6370
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$2(this$, a)
    }else {
      var x__2369__auto____6371 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6372 = cljs.core._invoke[goog.typeOf(x__2369__auto____6371)];
        if(or__3824__auto____6372) {
          return or__3824__auto____6372
        }else {
          var or__3824__auto____6373 = cljs.core._invoke["_"];
          if(or__3824__auto____6373) {
            return or__3824__auto____6373
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a)
    }
  };
  var _invoke__3 = function(this$, a, b) {
    if(function() {
      var and__3822__auto____6374 = this$;
      if(and__3822__auto____6374) {
        return this$.cljs$core$IFn$_invoke$arity$3
      }else {
        return and__3822__auto____6374
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$3(this$, a, b)
    }else {
      var x__2369__auto____6375 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6376 = cljs.core._invoke[goog.typeOf(x__2369__auto____6375)];
        if(or__3824__auto____6376) {
          return or__3824__auto____6376
        }else {
          var or__3824__auto____6377 = cljs.core._invoke["_"];
          if(or__3824__auto____6377) {
            return or__3824__auto____6377
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b)
    }
  };
  var _invoke__4 = function(this$, a, b, c) {
    if(function() {
      var and__3822__auto____6378 = this$;
      if(and__3822__auto____6378) {
        return this$.cljs$core$IFn$_invoke$arity$4
      }else {
        return and__3822__auto____6378
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$4(this$, a, b, c)
    }else {
      var x__2369__auto____6379 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6380 = cljs.core._invoke[goog.typeOf(x__2369__auto____6379)];
        if(or__3824__auto____6380) {
          return or__3824__auto____6380
        }else {
          var or__3824__auto____6381 = cljs.core._invoke["_"];
          if(or__3824__auto____6381) {
            return or__3824__auto____6381
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c)
    }
  };
  var _invoke__5 = function(this$, a, b, c, d) {
    if(function() {
      var and__3822__auto____6382 = this$;
      if(and__3822__auto____6382) {
        return this$.cljs$core$IFn$_invoke$arity$5
      }else {
        return and__3822__auto____6382
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$5(this$, a, b, c, d)
    }else {
      var x__2369__auto____6383 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6384 = cljs.core._invoke[goog.typeOf(x__2369__auto____6383)];
        if(or__3824__auto____6384) {
          return or__3824__auto____6384
        }else {
          var or__3824__auto____6385 = cljs.core._invoke["_"];
          if(or__3824__auto____6385) {
            return or__3824__auto____6385
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d)
    }
  };
  var _invoke__6 = function(this$, a, b, c, d, e) {
    if(function() {
      var and__3822__auto____6386 = this$;
      if(and__3822__auto____6386) {
        return this$.cljs$core$IFn$_invoke$arity$6
      }else {
        return and__3822__auto____6386
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$6(this$, a, b, c, d, e)
    }else {
      var x__2369__auto____6387 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6388 = cljs.core._invoke[goog.typeOf(x__2369__auto____6387)];
        if(or__3824__auto____6388) {
          return or__3824__auto____6388
        }else {
          var or__3824__auto____6389 = cljs.core._invoke["_"];
          if(or__3824__auto____6389) {
            return or__3824__auto____6389
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e)
    }
  };
  var _invoke__7 = function(this$, a, b, c, d, e, f) {
    if(function() {
      var and__3822__auto____6390 = this$;
      if(and__3822__auto____6390) {
        return this$.cljs$core$IFn$_invoke$arity$7
      }else {
        return and__3822__auto____6390
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$7(this$, a, b, c, d, e, f)
    }else {
      var x__2369__auto____6391 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6392 = cljs.core._invoke[goog.typeOf(x__2369__auto____6391)];
        if(or__3824__auto____6392) {
          return or__3824__auto____6392
        }else {
          var or__3824__auto____6393 = cljs.core._invoke["_"];
          if(or__3824__auto____6393) {
            return or__3824__auto____6393
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f)
    }
  };
  var _invoke__8 = function(this$, a, b, c, d, e, f, g) {
    if(function() {
      var and__3822__auto____6394 = this$;
      if(and__3822__auto____6394) {
        return this$.cljs$core$IFn$_invoke$arity$8
      }else {
        return and__3822__auto____6394
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$8(this$, a, b, c, d, e, f, g)
    }else {
      var x__2369__auto____6395 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6396 = cljs.core._invoke[goog.typeOf(x__2369__auto____6395)];
        if(or__3824__auto____6396) {
          return or__3824__auto____6396
        }else {
          var or__3824__auto____6397 = cljs.core._invoke["_"];
          if(or__3824__auto____6397) {
            return or__3824__auto____6397
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g)
    }
  };
  var _invoke__9 = function(this$, a, b, c, d, e, f, g, h) {
    if(function() {
      var and__3822__auto____6398 = this$;
      if(and__3822__auto____6398) {
        return this$.cljs$core$IFn$_invoke$arity$9
      }else {
        return and__3822__auto____6398
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$9(this$, a, b, c, d, e, f, g, h)
    }else {
      var x__2369__auto____6399 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6400 = cljs.core._invoke[goog.typeOf(x__2369__auto____6399)];
        if(or__3824__auto____6400) {
          return or__3824__auto____6400
        }else {
          var or__3824__auto____6401 = cljs.core._invoke["_"];
          if(or__3824__auto____6401) {
            return or__3824__auto____6401
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h)
    }
  };
  var _invoke__10 = function(this$, a, b, c, d, e, f, g, h, i) {
    if(function() {
      var and__3822__auto____6402 = this$;
      if(and__3822__auto____6402) {
        return this$.cljs$core$IFn$_invoke$arity$10
      }else {
        return and__3822__auto____6402
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$10(this$, a, b, c, d, e, f, g, h, i)
    }else {
      var x__2369__auto____6403 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6404 = cljs.core._invoke[goog.typeOf(x__2369__auto____6403)];
        if(or__3824__auto____6404) {
          return or__3824__auto____6404
        }else {
          var or__3824__auto____6405 = cljs.core._invoke["_"];
          if(or__3824__auto____6405) {
            return or__3824__auto____6405
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i)
    }
  };
  var _invoke__11 = function(this$, a, b, c, d, e, f, g, h, i, j) {
    if(function() {
      var and__3822__auto____6406 = this$;
      if(and__3822__auto____6406) {
        return this$.cljs$core$IFn$_invoke$arity$11
      }else {
        return and__3822__auto____6406
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$11(this$, a, b, c, d, e, f, g, h, i, j)
    }else {
      var x__2369__auto____6407 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6408 = cljs.core._invoke[goog.typeOf(x__2369__auto____6407)];
        if(or__3824__auto____6408) {
          return or__3824__auto____6408
        }else {
          var or__3824__auto____6409 = cljs.core._invoke["_"];
          if(or__3824__auto____6409) {
            return or__3824__auto____6409
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j)
    }
  };
  var _invoke__12 = function(this$, a, b, c, d, e, f, g, h, i, j, k) {
    if(function() {
      var and__3822__auto____6410 = this$;
      if(and__3822__auto____6410) {
        return this$.cljs$core$IFn$_invoke$arity$12
      }else {
        return and__3822__auto____6410
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$12(this$, a, b, c, d, e, f, g, h, i, j, k)
    }else {
      var x__2369__auto____6411 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6412 = cljs.core._invoke[goog.typeOf(x__2369__auto____6411)];
        if(or__3824__auto____6412) {
          return or__3824__auto____6412
        }else {
          var or__3824__auto____6413 = cljs.core._invoke["_"];
          if(or__3824__auto____6413) {
            return or__3824__auto____6413
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j, k)
    }
  };
  var _invoke__13 = function(this$, a, b, c, d, e, f, g, h, i, j, k, l) {
    if(function() {
      var and__3822__auto____6414 = this$;
      if(and__3822__auto____6414) {
        return this$.cljs$core$IFn$_invoke$arity$13
      }else {
        return and__3822__auto____6414
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$13(this$, a, b, c, d, e, f, g, h, i, j, k, l)
    }else {
      var x__2369__auto____6415 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6416 = cljs.core._invoke[goog.typeOf(x__2369__auto____6415)];
        if(or__3824__auto____6416) {
          return or__3824__auto____6416
        }else {
          var or__3824__auto____6417 = cljs.core._invoke["_"];
          if(or__3824__auto____6417) {
            return or__3824__auto____6417
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j, k, l)
    }
  };
  var _invoke__14 = function(this$, a, b, c, d, e, f, g, h, i, j, k, l, m) {
    if(function() {
      var and__3822__auto____6418 = this$;
      if(and__3822__auto____6418) {
        return this$.cljs$core$IFn$_invoke$arity$14
      }else {
        return and__3822__auto____6418
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$14(this$, a, b, c, d, e, f, g, h, i, j, k, l, m)
    }else {
      var x__2369__auto____6419 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6420 = cljs.core._invoke[goog.typeOf(x__2369__auto____6419)];
        if(or__3824__auto____6420) {
          return or__3824__auto____6420
        }else {
          var or__3824__auto____6421 = cljs.core._invoke["_"];
          if(or__3824__auto____6421) {
            return or__3824__auto____6421
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j, k, l, m)
    }
  };
  var _invoke__15 = function(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    if(function() {
      var and__3822__auto____6422 = this$;
      if(and__3822__auto____6422) {
        return this$.cljs$core$IFn$_invoke$arity$15
      }else {
        return and__3822__auto____6422
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$15(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n)
    }else {
      var x__2369__auto____6423 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6424 = cljs.core._invoke[goog.typeOf(x__2369__auto____6423)];
        if(or__3824__auto____6424) {
          return or__3824__auto____6424
        }else {
          var or__3824__auto____6425 = cljs.core._invoke["_"];
          if(or__3824__auto____6425) {
            return or__3824__auto____6425
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n)
    }
  };
  var _invoke__16 = function(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
    if(function() {
      var and__3822__auto____6426 = this$;
      if(and__3822__auto____6426) {
        return this$.cljs$core$IFn$_invoke$arity$16
      }else {
        return and__3822__auto____6426
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$16(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o)
    }else {
      var x__2369__auto____6427 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6428 = cljs.core._invoke[goog.typeOf(x__2369__auto____6427)];
        if(or__3824__auto____6428) {
          return or__3824__auto____6428
        }else {
          var or__3824__auto____6429 = cljs.core._invoke["_"];
          if(or__3824__auto____6429) {
            return or__3824__auto____6429
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o)
    }
  };
  var _invoke__17 = function(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
    if(function() {
      var and__3822__auto____6430 = this$;
      if(and__3822__auto____6430) {
        return this$.cljs$core$IFn$_invoke$arity$17
      }else {
        return and__3822__auto____6430
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$17(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p)
    }else {
      var x__2369__auto____6431 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6432 = cljs.core._invoke[goog.typeOf(x__2369__auto____6431)];
        if(or__3824__auto____6432) {
          return or__3824__auto____6432
        }else {
          var or__3824__auto____6433 = cljs.core._invoke["_"];
          if(or__3824__auto____6433) {
            return or__3824__auto____6433
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p)
    }
  };
  var _invoke__18 = function(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
    if(function() {
      var and__3822__auto____6434 = this$;
      if(and__3822__auto____6434) {
        return this$.cljs$core$IFn$_invoke$arity$18
      }else {
        return and__3822__auto____6434
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$18(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q)
    }else {
      var x__2369__auto____6435 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6436 = cljs.core._invoke[goog.typeOf(x__2369__auto____6435)];
        if(or__3824__auto____6436) {
          return or__3824__auto____6436
        }else {
          var or__3824__auto____6437 = cljs.core._invoke["_"];
          if(or__3824__auto____6437) {
            return or__3824__auto____6437
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q)
    }
  };
  var _invoke__19 = function(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s) {
    if(function() {
      var and__3822__auto____6438 = this$;
      if(and__3822__auto____6438) {
        return this$.cljs$core$IFn$_invoke$arity$19
      }else {
        return and__3822__auto____6438
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$19(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s)
    }else {
      var x__2369__auto____6439 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6440 = cljs.core._invoke[goog.typeOf(x__2369__auto____6439)];
        if(or__3824__auto____6440) {
          return or__3824__auto____6440
        }else {
          var or__3824__auto____6441 = cljs.core._invoke["_"];
          if(or__3824__auto____6441) {
            return or__3824__auto____6441
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s)
    }
  };
  var _invoke__20 = function(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s, t) {
    if(function() {
      var and__3822__auto____6442 = this$;
      if(and__3822__auto____6442) {
        return this$.cljs$core$IFn$_invoke$arity$20
      }else {
        return and__3822__auto____6442
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$20(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s, t)
    }else {
      var x__2369__auto____6443 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6444 = cljs.core._invoke[goog.typeOf(x__2369__auto____6443)];
        if(or__3824__auto____6444) {
          return or__3824__auto____6444
        }else {
          var or__3824__auto____6445 = cljs.core._invoke["_"];
          if(or__3824__auto____6445) {
            return or__3824__auto____6445
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s, t)
    }
  };
  var _invoke__21 = function(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s, t, rest) {
    if(function() {
      var and__3822__auto____6446 = this$;
      if(and__3822__auto____6446) {
        return this$.cljs$core$IFn$_invoke$arity$21
      }else {
        return and__3822__auto____6446
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$21(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s, t, rest)
    }else {
      var x__2369__auto____6447 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6448 = cljs.core._invoke[goog.typeOf(x__2369__auto____6447)];
        if(or__3824__auto____6448) {
          return or__3824__auto____6448
        }else {
          var or__3824__auto____6449 = cljs.core._invoke["_"];
          if(or__3824__auto____6449) {
            return or__3824__auto____6449
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s, t, rest)
    }
  };
  _invoke = function(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s, t, rest) {
    switch(arguments.length) {
      case 1:
        return _invoke__1.call(this, this$);
      case 2:
        return _invoke__2.call(this, this$, a);
      case 3:
        return _invoke__3.call(this, this$, a, b);
      case 4:
        return _invoke__4.call(this, this$, a, b, c);
      case 5:
        return _invoke__5.call(this, this$, a, b, c, d);
      case 6:
        return _invoke__6.call(this, this$, a, b, c, d, e);
      case 7:
        return _invoke__7.call(this, this$, a, b, c, d, e, f);
      case 8:
        return _invoke__8.call(this, this$, a, b, c, d, e, f, g);
      case 9:
        return _invoke__9.call(this, this$, a, b, c, d, e, f, g, h);
      case 10:
        return _invoke__10.call(this, this$, a, b, c, d, e, f, g, h, i);
      case 11:
        return _invoke__11.call(this, this$, a, b, c, d, e, f, g, h, i, j);
      case 12:
        return _invoke__12.call(this, this$, a, b, c, d, e, f, g, h, i, j, k);
      case 13:
        return _invoke__13.call(this, this$, a, b, c, d, e, f, g, h, i, j, k, l);
      case 14:
        return _invoke__14.call(this, this$, a, b, c, d, e, f, g, h, i, j, k, l, m);
      case 15:
        return _invoke__15.call(this, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n);
      case 16:
        return _invoke__16.call(this, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o);
      case 17:
        return _invoke__17.call(this, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p);
      case 18:
        return _invoke__18.call(this, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q);
      case 19:
        return _invoke__19.call(this, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s);
      case 20:
        return _invoke__20.call(this, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s, t);
      case 21:
        return _invoke__21.call(this, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s, t, rest)
    }
    throw"Invalid arity: " + arguments.length;
  };
  _invoke.cljs$lang$arity$1 = _invoke__1;
  _invoke.cljs$lang$arity$2 = _invoke__2;
  _invoke.cljs$lang$arity$3 = _invoke__3;
  _invoke.cljs$lang$arity$4 = _invoke__4;
  _invoke.cljs$lang$arity$5 = _invoke__5;
  _invoke.cljs$lang$arity$6 = _invoke__6;
  _invoke.cljs$lang$arity$7 = _invoke__7;
  _invoke.cljs$lang$arity$8 = _invoke__8;
  _invoke.cljs$lang$arity$9 = _invoke__9;
  _invoke.cljs$lang$arity$10 = _invoke__10;
  _invoke.cljs$lang$arity$11 = _invoke__11;
  _invoke.cljs$lang$arity$12 = _invoke__12;
  _invoke.cljs$lang$arity$13 = _invoke__13;
  _invoke.cljs$lang$arity$14 = _invoke__14;
  _invoke.cljs$lang$arity$15 = _invoke__15;
  _invoke.cljs$lang$arity$16 = _invoke__16;
  _invoke.cljs$lang$arity$17 = _invoke__17;
  _invoke.cljs$lang$arity$18 = _invoke__18;
  _invoke.cljs$lang$arity$19 = _invoke__19;
  _invoke.cljs$lang$arity$20 = _invoke__20;
  _invoke.cljs$lang$arity$21 = _invoke__21;
  return _invoke
}();
cljs.core.ICounted = {};
cljs.core._count = function _count(coll) {
  if(function() {
    var and__3822__auto____6454 = coll;
    if(and__3822__auto____6454) {
      return coll.cljs$core$ICounted$_count$arity$1
    }else {
      return and__3822__auto____6454
    }
  }()) {
    return coll.cljs$core$ICounted$_count$arity$1(coll)
  }else {
    var x__2369__auto____6455 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6456 = cljs.core._count[goog.typeOf(x__2369__auto____6455)];
      if(or__3824__auto____6456) {
        return or__3824__auto____6456
      }else {
        var or__3824__auto____6457 = cljs.core._count["_"];
        if(or__3824__auto____6457) {
          return or__3824__auto____6457
        }else {
          throw cljs.core.missing_protocol.call(null, "ICounted.-count", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core.IEmptyableCollection = {};
cljs.core._empty = function _empty(coll) {
  if(function() {
    var and__3822__auto____6462 = coll;
    if(and__3822__auto____6462) {
      return coll.cljs$core$IEmptyableCollection$_empty$arity$1
    }else {
      return and__3822__auto____6462
    }
  }()) {
    return coll.cljs$core$IEmptyableCollection$_empty$arity$1(coll)
  }else {
    var x__2369__auto____6463 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6464 = cljs.core._empty[goog.typeOf(x__2369__auto____6463)];
      if(or__3824__auto____6464) {
        return or__3824__auto____6464
      }else {
        var or__3824__auto____6465 = cljs.core._empty["_"];
        if(or__3824__auto____6465) {
          return or__3824__auto____6465
        }else {
          throw cljs.core.missing_protocol.call(null, "IEmptyableCollection.-empty", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core.ICollection = {};
cljs.core._conj = function _conj(coll, o) {
  if(function() {
    var and__3822__auto____6470 = coll;
    if(and__3822__auto____6470) {
      return coll.cljs$core$ICollection$_conj$arity$2
    }else {
      return and__3822__auto____6470
    }
  }()) {
    return coll.cljs$core$ICollection$_conj$arity$2(coll, o)
  }else {
    var x__2369__auto____6471 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6472 = cljs.core._conj[goog.typeOf(x__2369__auto____6471)];
      if(or__3824__auto____6472) {
        return or__3824__auto____6472
      }else {
        var or__3824__auto____6473 = cljs.core._conj["_"];
        if(or__3824__auto____6473) {
          return or__3824__auto____6473
        }else {
          throw cljs.core.missing_protocol.call(null, "ICollection.-conj", coll);
        }
      }
    }().call(null, coll, o)
  }
};
cljs.core.IIndexed = {};
cljs.core._nth = function() {
  var _nth = null;
  var _nth__2 = function(coll, n) {
    if(function() {
      var and__3822__auto____6482 = coll;
      if(and__3822__auto____6482) {
        return coll.cljs$core$IIndexed$_nth$arity$2
      }else {
        return and__3822__auto____6482
      }
    }()) {
      return coll.cljs$core$IIndexed$_nth$arity$2(coll, n)
    }else {
      var x__2369__auto____6483 = coll == null ? null : coll;
      return function() {
        var or__3824__auto____6484 = cljs.core._nth[goog.typeOf(x__2369__auto____6483)];
        if(or__3824__auto____6484) {
          return or__3824__auto____6484
        }else {
          var or__3824__auto____6485 = cljs.core._nth["_"];
          if(or__3824__auto____6485) {
            return or__3824__auto____6485
          }else {
            throw cljs.core.missing_protocol.call(null, "IIndexed.-nth", coll);
          }
        }
      }().call(null, coll, n)
    }
  };
  var _nth__3 = function(coll, n, not_found) {
    if(function() {
      var and__3822__auto____6486 = coll;
      if(and__3822__auto____6486) {
        return coll.cljs$core$IIndexed$_nth$arity$3
      }else {
        return and__3822__auto____6486
      }
    }()) {
      return coll.cljs$core$IIndexed$_nth$arity$3(coll, n, not_found)
    }else {
      var x__2369__auto____6487 = coll == null ? null : coll;
      return function() {
        var or__3824__auto____6488 = cljs.core._nth[goog.typeOf(x__2369__auto____6487)];
        if(or__3824__auto____6488) {
          return or__3824__auto____6488
        }else {
          var or__3824__auto____6489 = cljs.core._nth["_"];
          if(or__3824__auto____6489) {
            return or__3824__auto____6489
          }else {
            throw cljs.core.missing_protocol.call(null, "IIndexed.-nth", coll);
          }
        }
      }().call(null, coll, n, not_found)
    }
  };
  _nth = function(coll, n, not_found) {
    switch(arguments.length) {
      case 2:
        return _nth__2.call(this, coll, n);
      case 3:
        return _nth__3.call(this, coll, n, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  _nth.cljs$lang$arity$2 = _nth__2;
  _nth.cljs$lang$arity$3 = _nth__3;
  return _nth
}();
cljs.core.ASeq = {};
cljs.core.ISeq = {};
cljs.core._first = function _first(coll) {
  if(function() {
    var and__3822__auto____6494 = coll;
    if(and__3822__auto____6494) {
      return coll.cljs$core$ISeq$_first$arity$1
    }else {
      return and__3822__auto____6494
    }
  }()) {
    return coll.cljs$core$ISeq$_first$arity$1(coll)
  }else {
    var x__2369__auto____6495 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6496 = cljs.core._first[goog.typeOf(x__2369__auto____6495)];
      if(or__3824__auto____6496) {
        return or__3824__auto____6496
      }else {
        var or__3824__auto____6497 = cljs.core._first["_"];
        if(or__3824__auto____6497) {
          return or__3824__auto____6497
        }else {
          throw cljs.core.missing_protocol.call(null, "ISeq.-first", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core._rest = function _rest(coll) {
  if(function() {
    var and__3822__auto____6502 = coll;
    if(and__3822__auto____6502) {
      return coll.cljs$core$ISeq$_rest$arity$1
    }else {
      return and__3822__auto____6502
    }
  }()) {
    return coll.cljs$core$ISeq$_rest$arity$1(coll)
  }else {
    var x__2369__auto____6503 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6504 = cljs.core._rest[goog.typeOf(x__2369__auto____6503)];
      if(or__3824__auto____6504) {
        return or__3824__auto____6504
      }else {
        var or__3824__auto____6505 = cljs.core._rest["_"];
        if(or__3824__auto____6505) {
          return or__3824__auto____6505
        }else {
          throw cljs.core.missing_protocol.call(null, "ISeq.-rest", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core.INext = {};
cljs.core._next = function _next(coll) {
  if(function() {
    var and__3822__auto____6510 = coll;
    if(and__3822__auto____6510) {
      return coll.cljs$core$INext$_next$arity$1
    }else {
      return and__3822__auto____6510
    }
  }()) {
    return coll.cljs$core$INext$_next$arity$1(coll)
  }else {
    var x__2369__auto____6511 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6512 = cljs.core._next[goog.typeOf(x__2369__auto____6511)];
      if(or__3824__auto____6512) {
        return or__3824__auto____6512
      }else {
        var or__3824__auto____6513 = cljs.core._next["_"];
        if(or__3824__auto____6513) {
          return or__3824__auto____6513
        }else {
          throw cljs.core.missing_protocol.call(null, "INext.-next", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core.ILookup = {};
cljs.core._lookup = function() {
  var _lookup = null;
  var _lookup__2 = function(o, k) {
    if(function() {
      var and__3822__auto____6522 = o;
      if(and__3822__auto____6522) {
        return o.cljs$core$ILookup$_lookup$arity$2
      }else {
        return and__3822__auto____6522
      }
    }()) {
      return o.cljs$core$ILookup$_lookup$arity$2(o, k)
    }else {
      var x__2369__auto____6523 = o == null ? null : o;
      return function() {
        var or__3824__auto____6524 = cljs.core._lookup[goog.typeOf(x__2369__auto____6523)];
        if(or__3824__auto____6524) {
          return or__3824__auto____6524
        }else {
          var or__3824__auto____6525 = cljs.core._lookup["_"];
          if(or__3824__auto____6525) {
            return or__3824__auto____6525
          }else {
            throw cljs.core.missing_protocol.call(null, "ILookup.-lookup", o);
          }
        }
      }().call(null, o, k)
    }
  };
  var _lookup__3 = function(o, k, not_found) {
    if(function() {
      var and__3822__auto____6526 = o;
      if(and__3822__auto____6526) {
        return o.cljs$core$ILookup$_lookup$arity$3
      }else {
        return and__3822__auto____6526
      }
    }()) {
      return o.cljs$core$ILookup$_lookup$arity$3(o, k, not_found)
    }else {
      var x__2369__auto____6527 = o == null ? null : o;
      return function() {
        var or__3824__auto____6528 = cljs.core._lookup[goog.typeOf(x__2369__auto____6527)];
        if(or__3824__auto____6528) {
          return or__3824__auto____6528
        }else {
          var or__3824__auto____6529 = cljs.core._lookup["_"];
          if(or__3824__auto____6529) {
            return or__3824__auto____6529
          }else {
            throw cljs.core.missing_protocol.call(null, "ILookup.-lookup", o);
          }
        }
      }().call(null, o, k, not_found)
    }
  };
  _lookup = function(o, k, not_found) {
    switch(arguments.length) {
      case 2:
        return _lookup__2.call(this, o, k);
      case 3:
        return _lookup__3.call(this, o, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  _lookup.cljs$lang$arity$2 = _lookup__2;
  _lookup.cljs$lang$arity$3 = _lookup__3;
  return _lookup
}();
cljs.core.IAssociative = {};
cljs.core._contains_key_QMARK_ = function _contains_key_QMARK_(coll, k) {
  if(function() {
    var and__3822__auto____6534 = coll;
    if(and__3822__auto____6534) {
      return coll.cljs$core$IAssociative$_contains_key_QMARK_$arity$2
    }else {
      return and__3822__auto____6534
    }
  }()) {
    return coll.cljs$core$IAssociative$_contains_key_QMARK_$arity$2(coll, k)
  }else {
    var x__2369__auto____6535 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6536 = cljs.core._contains_key_QMARK_[goog.typeOf(x__2369__auto____6535)];
      if(or__3824__auto____6536) {
        return or__3824__auto____6536
      }else {
        var or__3824__auto____6537 = cljs.core._contains_key_QMARK_["_"];
        if(or__3824__auto____6537) {
          return or__3824__auto____6537
        }else {
          throw cljs.core.missing_protocol.call(null, "IAssociative.-contains-key?", coll);
        }
      }
    }().call(null, coll, k)
  }
};
cljs.core._assoc = function _assoc(coll, k, v) {
  if(function() {
    var and__3822__auto____6542 = coll;
    if(and__3822__auto____6542) {
      return coll.cljs$core$IAssociative$_assoc$arity$3
    }else {
      return and__3822__auto____6542
    }
  }()) {
    return coll.cljs$core$IAssociative$_assoc$arity$3(coll, k, v)
  }else {
    var x__2369__auto____6543 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6544 = cljs.core._assoc[goog.typeOf(x__2369__auto____6543)];
      if(or__3824__auto____6544) {
        return or__3824__auto____6544
      }else {
        var or__3824__auto____6545 = cljs.core._assoc["_"];
        if(or__3824__auto____6545) {
          return or__3824__auto____6545
        }else {
          throw cljs.core.missing_protocol.call(null, "IAssociative.-assoc", coll);
        }
      }
    }().call(null, coll, k, v)
  }
};
cljs.core.IMap = {};
cljs.core._dissoc = function _dissoc(coll, k) {
  if(function() {
    var and__3822__auto____6550 = coll;
    if(and__3822__auto____6550) {
      return coll.cljs$core$IMap$_dissoc$arity$2
    }else {
      return and__3822__auto____6550
    }
  }()) {
    return coll.cljs$core$IMap$_dissoc$arity$2(coll, k)
  }else {
    var x__2369__auto____6551 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6552 = cljs.core._dissoc[goog.typeOf(x__2369__auto____6551)];
      if(or__3824__auto____6552) {
        return or__3824__auto____6552
      }else {
        var or__3824__auto____6553 = cljs.core._dissoc["_"];
        if(or__3824__auto____6553) {
          return or__3824__auto____6553
        }else {
          throw cljs.core.missing_protocol.call(null, "IMap.-dissoc", coll);
        }
      }
    }().call(null, coll, k)
  }
};
cljs.core.IMapEntry = {};
cljs.core._key = function _key(coll) {
  if(function() {
    var and__3822__auto____6558 = coll;
    if(and__3822__auto____6558) {
      return coll.cljs$core$IMapEntry$_key$arity$1
    }else {
      return and__3822__auto____6558
    }
  }()) {
    return coll.cljs$core$IMapEntry$_key$arity$1(coll)
  }else {
    var x__2369__auto____6559 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6560 = cljs.core._key[goog.typeOf(x__2369__auto____6559)];
      if(or__3824__auto____6560) {
        return or__3824__auto____6560
      }else {
        var or__3824__auto____6561 = cljs.core._key["_"];
        if(or__3824__auto____6561) {
          return or__3824__auto____6561
        }else {
          throw cljs.core.missing_protocol.call(null, "IMapEntry.-key", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core._val = function _val(coll) {
  if(function() {
    var and__3822__auto____6566 = coll;
    if(and__3822__auto____6566) {
      return coll.cljs$core$IMapEntry$_val$arity$1
    }else {
      return and__3822__auto____6566
    }
  }()) {
    return coll.cljs$core$IMapEntry$_val$arity$1(coll)
  }else {
    var x__2369__auto____6567 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6568 = cljs.core._val[goog.typeOf(x__2369__auto____6567)];
      if(or__3824__auto____6568) {
        return or__3824__auto____6568
      }else {
        var or__3824__auto____6569 = cljs.core._val["_"];
        if(or__3824__auto____6569) {
          return or__3824__auto____6569
        }else {
          throw cljs.core.missing_protocol.call(null, "IMapEntry.-val", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core.ISet = {};
cljs.core._disjoin = function _disjoin(coll, v) {
  if(function() {
    var and__3822__auto____6574 = coll;
    if(and__3822__auto____6574) {
      return coll.cljs$core$ISet$_disjoin$arity$2
    }else {
      return and__3822__auto____6574
    }
  }()) {
    return coll.cljs$core$ISet$_disjoin$arity$2(coll, v)
  }else {
    var x__2369__auto____6575 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6576 = cljs.core._disjoin[goog.typeOf(x__2369__auto____6575)];
      if(or__3824__auto____6576) {
        return or__3824__auto____6576
      }else {
        var or__3824__auto____6577 = cljs.core._disjoin["_"];
        if(or__3824__auto____6577) {
          return or__3824__auto____6577
        }else {
          throw cljs.core.missing_protocol.call(null, "ISet.-disjoin", coll);
        }
      }
    }().call(null, coll, v)
  }
};
cljs.core.IStack = {};
cljs.core._peek = function _peek(coll) {
  if(function() {
    var and__3822__auto____6582 = coll;
    if(and__3822__auto____6582) {
      return coll.cljs$core$IStack$_peek$arity$1
    }else {
      return and__3822__auto____6582
    }
  }()) {
    return coll.cljs$core$IStack$_peek$arity$1(coll)
  }else {
    var x__2369__auto____6583 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6584 = cljs.core._peek[goog.typeOf(x__2369__auto____6583)];
      if(or__3824__auto____6584) {
        return or__3824__auto____6584
      }else {
        var or__3824__auto____6585 = cljs.core._peek["_"];
        if(or__3824__auto____6585) {
          return or__3824__auto____6585
        }else {
          throw cljs.core.missing_protocol.call(null, "IStack.-peek", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core._pop = function _pop(coll) {
  if(function() {
    var and__3822__auto____6590 = coll;
    if(and__3822__auto____6590) {
      return coll.cljs$core$IStack$_pop$arity$1
    }else {
      return and__3822__auto____6590
    }
  }()) {
    return coll.cljs$core$IStack$_pop$arity$1(coll)
  }else {
    var x__2369__auto____6591 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6592 = cljs.core._pop[goog.typeOf(x__2369__auto____6591)];
      if(or__3824__auto____6592) {
        return or__3824__auto____6592
      }else {
        var or__3824__auto____6593 = cljs.core._pop["_"];
        if(or__3824__auto____6593) {
          return or__3824__auto____6593
        }else {
          throw cljs.core.missing_protocol.call(null, "IStack.-pop", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core.IVector = {};
cljs.core._assoc_n = function _assoc_n(coll, n, val) {
  if(function() {
    var and__3822__auto____6598 = coll;
    if(and__3822__auto____6598) {
      return coll.cljs$core$IVector$_assoc_n$arity$3
    }else {
      return and__3822__auto____6598
    }
  }()) {
    return coll.cljs$core$IVector$_assoc_n$arity$3(coll, n, val)
  }else {
    var x__2369__auto____6599 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6600 = cljs.core._assoc_n[goog.typeOf(x__2369__auto____6599)];
      if(or__3824__auto____6600) {
        return or__3824__auto____6600
      }else {
        var or__3824__auto____6601 = cljs.core._assoc_n["_"];
        if(or__3824__auto____6601) {
          return or__3824__auto____6601
        }else {
          throw cljs.core.missing_protocol.call(null, "IVector.-assoc-n", coll);
        }
      }
    }().call(null, coll, n, val)
  }
};
cljs.core.IDeref = {};
cljs.core._deref = function _deref(o) {
  if(function() {
    var and__3822__auto____6606 = o;
    if(and__3822__auto____6606) {
      return o.cljs$core$IDeref$_deref$arity$1
    }else {
      return and__3822__auto____6606
    }
  }()) {
    return o.cljs$core$IDeref$_deref$arity$1(o)
  }else {
    var x__2369__auto____6607 = o == null ? null : o;
    return function() {
      var or__3824__auto____6608 = cljs.core._deref[goog.typeOf(x__2369__auto____6607)];
      if(or__3824__auto____6608) {
        return or__3824__auto____6608
      }else {
        var or__3824__auto____6609 = cljs.core._deref["_"];
        if(or__3824__auto____6609) {
          return or__3824__auto____6609
        }else {
          throw cljs.core.missing_protocol.call(null, "IDeref.-deref", o);
        }
      }
    }().call(null, o)
  }
};
cljs.core.IDerefWithTimeout = {};
cljs.core._deref_with_timeout = function _deref_with_timeout(o, msec, timeout_val) {
  if(function() {
    var and__3822__auto____6614 = o;
    if(and__3822__auto____6614) {
      return o.cljs$core$IDerefWithTimeout$_deref_with_timeout$arity$3
    }else {
      return and__3822__auto____6614
    }
  }()) {
    return o.cljs$core$IDerefWithTimeout$_deref_with_timeout$arity$3(o, msec, timeout_val)
  }else {
    var x__2369__auto____6615 = o == null ? null : o;
    return function() {
      var or__3824__auto____6616 = cljs.core._deref_with_timeout[goog.typeOf(x__2369__auto____6615)];
      if(or__3824__auto____6616) {
        return or__3824__auto____6616
      }else {
        var or__3824__auto____6617 = cljs.core._deref_with_timeout["_"];
        if(or__3824__auto____6617) {
          return or__3824__auto____6617
        }else {
          throw cljs.core.missing_protocol.call(null, "IDerefWithTimeout.-deref-with-timeout", o);
        }
      }
    }().call(null, o, msec, timeout_val)
  }
};
cljs.core.IMeta = {};
cljs.core._meta = function _meta(o) {
  if(function() {
    var and__3822__auto____6622 = o;
    if(and__3822__auto____6622) {
      return o.cljs$core$IMeta$_meta$arity$1
    }else {
      return and__3822__auto____6622
    }
  }()) {
    return o.cljs$core$IMeta$_meta$arity$1(o)
  }else {
    var x__2369__auto____6623 = o == null ? null : o;
    return function() {
      var or__3824__auto____6624 = cljs.core._meta[goog.typeOf(x__2369__auto____6623)];
      if(or__3824__auto____6624) {
        return or__3824__auto____6624
      }else {
        var or__3824__auto____6625 = cljs.core._meta["_"];
        if(or__3824__auto____6625) {
          return or__3824__auto____6625
        }else {
          throw cljs.core.missing_protocol.call(null, "IMeta.-meta", o);
        }
      }
    }().call(null, o)
  }
};
cljs.core.IWithMeta = {};
cljs.core._with_meta = function _with_meta(o, meta) {
  if(function() {
    var and__3822__auto____6630 = o;
    if(and__3822__auto____6630) {
      return o.cljs$core$IWithMeta$_with_meta$arity$2
    }else {
      return and__3822__auto____6630
    }
  }()) {
    return o.cljs$core$IWithMeta$_with_meta$arity$2(o, meta)
  }else {
    var x__2369__auto____6631 = o == null ? null : o;
    return function() {
      var or__3824__auto____6632 = cljs.core._with_meta[goog.typeOf(x__2369__auto____6631)];
      if(or__3824__auto____6632) {
        return or__3824__auto____6632
      }else {
        var or__3824__auto____6633 = cljs.core._with_meta["_"];
        if(or__3824__auto____6633) {
          return or__3824__auto____6633
        }else {
          throw cljs.core.missing_protocol.call(null, "IWithMeta.-with-meta", o);
        }
      }
    }().call(null, o, meta)
  }
};
cljs.core.IReduce = {};
cljs.core._reduce = function() {
  var _reduce = null;
  var _reduce__2 = function(coll, f) {
    if(function() {
      var and__3822__auto____6642 = coll;
      if(and__3822__auto____6642) {
        return coll.cljs$core$IReduce$_reduce$arity$2
      }else {
        return and__3822__auto____6642
      }
    }()) {
      return coll.cljs$core$IReduce$_reduce$arity$2(coll, f)
    }else {
      var x__2369__auto____6643 = coll == null ? null : coll;
      return function() {
        var or__3824__auto____6644 = cljs.core._reduce[goog.typeOf(x__2369__auto____6643)];
        if(or__3824__auto____6644) {
          return or__3824__auto____6644
        }else {
          var or__3824__auto____6645 = cljs.core._reduce["_"];
          if(or__3824__auto____6645) {
            return or__3824__auto____6645
          }else {
            throw cljs.core.missing_protocol.call(null, "IReduce.-reduce", coll);
          }
        }
      }().call(null, coll, f)
    }
  };
  var _reduce__3 = function(coll, f, start) {
    if(function() {
      var and__3822__auto____6646 = coll;
      if(and__3822__auto____6646) {
        return coll.cljs$core$IReduce$_reduce$arity$3
      }else {
        return and__3822__auto____6646
      }
    }()) {
      return coll.cljs$core$IReduce$_reduce$arity$3(coll, f, start)
    }else {
      var x__2369__auto____6647 = coll == null ? null : coll;
      return function() {
        var or__3824__auto____6648 = cljs.core._reduce[goog.typeOf(x__2369__auto____6647)];
        if(or__3824__auto____6648) {
          return or__3824__auto____6648
        }else {
          var or__3824__auto____6649 = cljs.core._reduce["_"];
          if(or__3824__auto____6649) {
            return or__3824__auto____6649
          }else {
            throw cljs.core.missing_protocol.call(null, "IReduce.-reduce", coll);
          }
        }
      }().call(null, coll, f, start)
    }
  };
  _reduce = function(coll, f, start) {
    switch(arguments.length) {
      case 2:
        return _reduce__2.call(this, coll, f);
      case 3:
        return _reduce__3.call(this, coll, f, start)
    }
    throw"Invalid arity: " + arguments.length;
  };
  _reduce.cljs$lang$arity$2 = _reduce__2;
  _reduce.cljs$lang$arity$3 = _reduce__3;
  return _reduce
}();
cljs.core.IKVReduce = {};
cljs.core._kv_reduce = function _kv_reduce(coll, f, init) {
  if(function() {
    var and__3822__auto____6654 = coll;
    if(and__3822__auto____6654) {
      return coll.cljs$core$IKVReduce$_kv_reduce$arity$3
    }else {
      return and__3822__auto____6654
    }
  }()) {
    return coll.cljs$core$IKVReduce$_kv_reduce$arity$3(coll, f, init)
  }else {
    var x__2369__auto____6655 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6656 = cljs.core._kv_reduce[goog.typeOf(x__2369__auto____6655)];
      if(or__3824__auto____6656) {
        return or__3824__auto____6656
      }else {
        var or__3824__auto____6657 = cljs.core._kv_reduce["_"];
        if(or__3824__auto____6657) {
          return or__3824__auto____6657
        }else {
          throw cljs.core.missing_protocol.call(null, "IKVReduce.-kv-reduce", coll);
        }
      }
    }().call(null, coll, f, init)
  }
};
cljs.core.IEquiv = {};
cljs.core._equiv = function _equiv(o, other) {
  if(function() {
    var and__3822__auto____6662 = o;
    if(and__3822__auto____6662) {
      return o.cljs$core$IEquiv$_equiv$arity$2
    }else {
      return and__3822__auto____6662
    }
  }()) {
    return o.cljs$core$IEquiv$_equiv$arity$2(o, other)
  }else {
    var x__2369__auto____6663 = o == null ? null : o;
    return function() {
      var or__3824__auto____6664 = cljs.core._equiv[goog.typeOf(x__2369__auto____6663)];
      if(or__3824__auto____6664) {
        return or__3824__auto____6664
      }else {
        var or__3824__auto____6665 = cljs.core._equiv["_"];
        if(or__3824__auto____6665) {
          return or__3824__auto____6665
        }else {
          throw cljs.core.missing_protocol.call(null, "IEquiv.-equiv", o);
        }
      }
    }().call(null, o, other)
  }
};
cljs.core.IHash = {};
cljs.core._hash = function _hash(o) {
  if(function() {
    var and__3822__auto____6670 = o;
    if(and__3822__auto____6670) {
      return o.cljs$core$IHash$_hash$arity$1
    }else {
      return and__3822__auto____6670
    }
  }()) {
    return o.cljs$core$IHash$_hash$arity$1(o)
  }else {
    var x__2369__auto____6671 = o == null ? null : o;
    return function() {
      var or__3824__auto____6672 = cljs.core._hash[goog.typeOf(x__2369__auto____6671)];
      if(or__3824__auto____6672) {
        return or__3824__auto____6672
      }else {
        var or__3824__auto____6673 = cljs.core._hash["_"];
        if(or__3824__auto____6673) {
          return or__3824__auto____6673
        }else {
          throw cljs.core.missing_protocol.call(null, "IHash.-hash", o);
        }
      }
    }().call(null, o)
  }
};
cljs.core.ISeqable = {};
cljs.core._seq = function _seq(o) {
  if(function() {
    var and__3822__auto____6678 = o;
    if(and__3822__auto____6678) {
      return o.cljs$core$ISeqable$_seq$arity$1
    }else {
      return and__3822__auto____6678
    }
  }()) {
    return o.cljs$core$ISeqable$_seq$arity$1(o)
  }else {
    var x__2369__auto____6679 = o == null ? null : o;
    return function() {
      var or__3824__auto____6680 = cljs.core._seq[goog.typeOf(x__2369__auto____6679)];
      if(or__3824__auto____6680) {
        return or__3824__auto____6680
      }else {
        var or__3824__auto____6681 = cljs.core._seq["_"];
        if(or__3824__auto____6681) {
          return or__3824__auto____6681
        }else {
          throw cljs.core.missing_protocol.call(null, "ISeqable.-seq", o);
        }
      }
    }().call(null, o)
  }
};
cljs.core.ISequential = {};
cljs.core.IList = {};
cljs.core.IRecord = {};
cljs.core.IReversible = {};
cljs.core._rseq = function _rseq(coll) {
  if(function() {
    var and__3822__auto____6686 = coll;
    if(and__3822__auto____6686) {
      return coll.cljs$core$IReversible$_rseq$arity$1
    }else {
      return and__3822__auto____6686
    }
  }()) {
    return coll.cljs$core$IReversible$_rseq$arity$1(coll)
  }else {
    var x__2369__auto____6687 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6688 = cljs.core._rseq[goog.typeOf(x__2369__auto____6687)];
      if(or__3824__auto____6688) {
        return or__3824__auto____6688
      }else {
        var or__3824__auto____6689 = cljs.core._rseq["_"];
        if(or__3824__auto____6689) {
          return or__3824__auto____6689
        }else {
          throw cljs.core.missing_protocol.call(null, "IReversible.-rseq", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core.ISorted = {};
cljs.core._sorted_seq = function _sorted_seq(coll, ascending_QMARK_) {
  if(function() {
    var and__3822__auto____6694 = coll;
    if(and__3822__auto____6694) {
      return coll.cljs$core$ISorted$_sorted_seq$arity$2
    }else {
      return and__3822__auto____6694
    }
  }()) {
    return coll.cljs$core$ISorted$_sorted_seq$arity$2(coll, ascending_QMARK_)
  }else {
    var x__2369__auto____6695 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6696 = cljs.core._sorted_seq[goog.typeOf(x__2369__auto____6695)];
      if(or__3824__auto____6696) {
        return or__3824__auto____6696
      }else {
        var or__3824__auto____6697 = cljs.core._sorted_seq["_"];
        if(or__3824__auto____6697) {
          return or__3824__auto____6697
        }else {
          throw cljs.core.missing_protocol.call(null, "ISorted.-sorted-seq", coll);
        }
      }
    }().call(null, coll, ascending_QMARK_)
  }
};
cljs.core._sorted_seq_from = function _sorted_seq_from(coll, k, ascending_QMARK_) {
  if(function() {
    var and__3822__auto____6702 = coll;
    if(and__3822__auto____6702) {
      return coll.cljs$core$ISorted$_sorted_seq_from$arity$3
    }else {
      return and__3822__auto____6702
    }
  }()) {
    return coll.cljs$core$ISorted$_sorted_seq_from$arity$3(coll, k, ascending_QMARK_)
  }else {
    var x__2369__auto____6703 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6704 = cljs.core._sorted_seq_from[goog.typeOf(x__2369__auto____6703)];
      if(or__3824__auto____6704) {
        return or__3824__auto____6704
      }else {
        var or__3824__auto____6705 = cljs.core._sorted_seq_from["_"];
        if(or__3824__auto____6705) {
          return or__3824__auto____6705
        }else {
          throw cljs.core.missing_protocol.call(null, "ISorted.-sorted-seq-from", coll);
        }
      }
    }().call(null, coll, k, ascending_QMARK_)
  }
};
cljs.core._entry_key = function _entry_key(coll, entry) {
  if(function() {
    var and__3822__auto____6710 = coll;
    if(and__3822__auto____6710) {
      return coll.cljs$core$ISorted$_entry_key$arity$2
    }else {
      return and__3822__auto____6710
    }
  }()) {
    return coll.cljs$core$ISorted$_entry_key$arity$2(coll, entry)
  }else {
    var x__2369__auto____6711 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6712 = cljs.core._entry_key[goog.typeOf(x__2369__auto____6711)];
      if(or__3824__auto____6712) {
        return or__3824__auto____6712
      }else {
        var or__3824__auto____6713 = cljs.core._entry_key["_"];
        if(or__3824__auto____6713) {
          return or__3824__auto____6713
        }else {
          throw cljs.core.missing_protocol.call(null, "ISorted.-entry-key", coll);
        }
      }
    }().call(null, coll, entry)
  }
};
cljs.core._comparator = function _comparator(coll) {
  if(function() {
    var and__3822__auto____6718 = coll;
    if(and__3822__auto____6718) {
      return coll.cljs$core$ISorted$_comparator$arity$1
    }else {
      return and__3822__auto____6718
    }
  }()) {
    return coll.cljs$core$ISorted$_comparator$arity$1(coll)
  }else {
    var x__2369__auto____6719 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6720 = cljs.core._comparator[goog.typeOf(x__2369__auto____6719)];
      if(or__3824__auto____6720) {
        return or__3824__auto____6720
      }else {
        var or__3824__auto____6721 = cljs.core._comparator["_"];
        if(or__3824__auto____6721) {
          return or__3824__auto____6721
        }else {
          throw cljs.core.missing_protocol.call(null, "ISorted.-comparator", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core.IPrintable = {};
cljs.core._pr_seq = function _pr_seq(o, opts) {
  if(function() {
    var and__3822__auto____6726 = o;
    if(and__3822__auto____6726) {
      return o.cljs$core$IPrintable$_pr_seq$arity$2
    }else {
      return and__3822__auto____6726
    }
  }()) {
    return o.cljs$core$IPrintable$_pr_seq$arity$2(o, opts)
  }else {
    var x__2369__auto____6727 = o == null ? null : o;
    return function() {
      var or__3824__auto____6728 = cljs.core._pr_seq[goog.typeOf(x__2369__auto____6727)];
      if(or__3824__auto____6728) {
        return or__3824__auto____6728
      }else {
        var or__3824__auto____6729 = cljs.core._pr_seq["_"];
        if(or__3824__auto____6729) {
          return or__3824__auto____6729
        }else {
          throw cljs.core.missing_protocol.call(null, "IPrintable.-pr-seq", o);
        }
      }
    }().call(null, o, opts)
  }
};
cljs.core.IPending = {};
cljs.core._realized_QMARK_ = function _realized_QMARK_(d) {
  if(function() {
    var and__3822__auto____6734 = d;
    if(and__3822__auto____6734) {
      return d.cljs$core$IPending$_realized_QMARK_$arity$1
    }else {
      return and__3822__auto____6734
    }
  }()) {
    return d.cljs$core$IPending$_realized_QMARK_$arity$1(d)
  }else {
    var x__2369__auto____6735 = d == null ? null : d;
    return function() {
      var or__3824__auto____6736 = cljs.core._realized_QMARK_[goog.typeOf(x__2369__auto____6735)];
      if(or__3824__auto____6736) {
        return or__3824__auto____6736
      }else {
        var or__3824__auto____6737 = cljs.core._realized_QMARK_["_"];
        if(or__3824__auto____6737) {
          return or__3824__auto____6737
        }else {
          throw cljs.core.missing_protocol.call(null, "IPending.-realized?", d);
        }
      }
    }().call(null, d)
  }
};
cljs.core.IWatchable = {};
cljs.core._notify_watches = function _notify_watches(this$, oldval, newval) {
  if(function() {
    var and__3822__auto____6742 = this$;
    if(and__3822__auto____6742) {
      return this$.cljs$core$IWatchable$_notify_watches$arity$3
    }else {
      return and__3822__auto____6742
    }
  }()) {
    return this$.cljs$core$IWatchable$_notify_watches$arity$3(this$, oldval, newval)
  }else {
    var x__2369__auto____6743 = this$ == null ? null : this$;
    return function() {
      var or__3824__auto____6744 = cljs.core._notify_watches[goog.typeOf(x__2369__auto____6743)];
      if(or__3824__auto____6744) {
        return or__3824__auto____6744
      }else {
        var or__3824__auto____6745 = cljs.core._notify_watches["_"];
        if(or__3824__auto____6745) {
          return or__3824__auto____6745
        }else {
          throw cljs.core.missing_protocol.call(null, "IWatchable.-notify-watches", this$);
        }
      }
    }().call(null, this$, oldval, newval)
  }
};
cljs.core._add_watch = function _add_watch(this$, key, f) {
  if(function() {
    var and__3822__auto____6750 = this$;
    if(and__3822__auto____6750) {
      return this$.cljs$core$IWatchable$_add_watch$arity$3
    }else {
      return and__3822__auto____6750
    }
  }()) {
    return this$.cljs$core$IWatchable$_add_watch$arity$3(this$, key, f)
  }else {
    var x__2369__auto____6751 = this$ == null ? null : this$;
    return function() {
      var or__3824__auto____6752 = cljs.core._add_watch[goog.typeOf(x__2369__auto____6751)];
      if(or__3824__auto____6752) {
        return or__3824__auto____6752
      }else {
        var or__3824__auto____6753 = cljs.core._add_watch["_"];
        if(or__3824__auto____6753) {
          return or__3824__auto____6753
        }else {
          throw cljs.core.missing_protocol.call(null, "IWatchable.-add-watch", this$);
        }
      }
    }().call(null, this$, key, f)
  }
};
cljs.core._remove_watch = function _remove_watch(this$, key) {
  if(function() {
    var and__3822__auto____6758 = this$;
    if(and__3822__auto____6758) {
      return this$.cljs$core$IWatchable$_remove_watch$arity$2
    }else {
      return and__3822__auto____6758
    }
  }()) {
    return this$.cljs$core$IWatchable$_remove_watch$arity$2(this$, key)
  }else {
    var x__2369__auto____6759 = this$ == null ? null : this$;
    return function() {
      var or__3824__auto____6760 = cljs.core._remove_watch[goog.typeOf(x__2369__auto____6759)];
      if(or__3824__auto____6760) {
        return or__3824__auto____6760
      }else {
        var or__3824__auto____6761 = cljs.core._remove_watch["_"];
        if(or__3824__auto____6761) {
          return or__3824__auto____6761
        }else {
          throw cljs.core.missing_protocol.call(null, "IWatchable.-remove-watch", this$);
        }
      }
    }().call(null, this$, key)
  }
};
cljs.core.IEditableCollection = {};
cljs.core._as_transient = function _as_transient(coll) {
  if(function() {
    var and__3822__auto____6766 = coll;
    if(and__3822__auto____6766) {
      return coll.cljs$core$IEditableCollection$_as_transient$arity$1
    }else {
      return and__3822__auto____6766
    }
  }()) {
    return coll.cljs$core$IEditableCollection$_as_transient$arity$1(coll)
  }else {
    var x__2369__auto____6767 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6768 = cljs.core._as_transient[goog.typeOf(x__2369__auto____6767)];
      if(or__3824__auto____6768) {
        return or__3824__auto____6768
      }else {
        var or__3824__auto____6769 = cljs.core._as_transient["_"];
        if(or__3824__auto____6769) {
          return or__3824__auto____6769
        }else {
          throw cljs.core.missing_protocol.call(null, "IEditableCollection.-as-transient", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core.ITransientCollection = {};
cljs.core._conj_BANG_ = function _conj_BANG_(tcoll, val) {
  if(function() {
    var and__3822__auto____6774 = tcoll;
    if(and__3822__auto____6774) {
      return tcoll.cljs$core$ITransientCollection$_conj_BANG_$arity$2
    }else {
      return and__3822__auto____6774
    }
  }()) {
    return tcoll.cljs$core$ITransientCollection$_conj_BANG_$arity$2(tcoll, val)
  }else {
    var x__2369__auto____6775 = tcoll == null ? null : tcoll;
    return function() {
      var or__3824__auto____6776 = cljs.core._conj_BANG_[goog.typeOf(x__2369__auto____6775)];
      if(or__3824__auto____6776) {
        return or__3824__auto____6776
      }else {
        var or__3824__auto____6777 = cljs.core._conj_BANG_["_"];
        if(or__3824__auto____6777) {
          return or__3824__auto____6777
        }else {
          throw cljs.core.missing_protocol.call(null, "ITransientCollection.-conj!", tcoll);
        }
      }
    }().call(null, tcoll, val)
  }
};
cljs.core._persistent_BANG_ = function _persistent_BANG_(tcoll) {
  if(function() {
    var and__3822__auto____6782 = tcoll;
    if(and__3822__auto____6782) {
      return tcoll.cljs$core$ITransientCollection$_persistent_BANG_$arity$1
    }else {
      return and__3822__auto____6782
    }
  }()) {
    return tcoll.cljs$core$ITransientCollection$_persistent_BANG_$arity$1(tcoll)
  }else {
    var x__2369__auto____6783 = tcoll == null ? null : tcoll;
    return function() {
      var or__3824__auto____6784 = cljs.core._persistent_BANG_[goog.typeOf(x__2369__auto____6783)];
      if(or__3824__auto____6784) {
        return or__3824__auto____6784
      }else {
        var or__3824__auto____6785 = cljs.core._persistent_BANG_["_"];
        if(or__3824__auto____6785) {
          return or__3824__auto____6785
        }else {
          throw cljs.core.missing_protocol.call(null, "ITransientCollection.-persistent!", tcoll);
        }
      }
    }().call(null, tcoll)
  }
};
cljs.core.ITransientAssociative = {};
cljs.core._assoc_BANG_ = function _assoc_BANG_(tcoll, key, val) {
  if(function() {
    var and__3822__auto____6790 = tcoll;
    if(and__3822__auto____6790) {
      return tcoll.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3
    }else {
      return and__3822__auto____6790
    }
  }()) {
    return tcoll.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3(tcoll, key, val)
  }else {
    var x__2369__auto____6791 = tcoll == null ? null : tcoll;
    return function() {
      var or__3824__auto____6792 = cljs.core._assoc_BANG_[goog.typeOf(x__2369__auto____6791)];
      if(or__3824__auto____6792) {
        return or__3824__auto____6792
      }else {
        var or__3824__auto____6793 = cljs.core._assoc_BANG_["_"];
        if(or__3824__auto____6793) {
          return or__3824__auto____6793
        }else {
          throw cljs.core.missing_protocol.call(null, "ITransientAssociative.-assoc!", tcoll);
        }
      }
    }().call(null, tcoll, key, val)
  }
};
cljs.core.ITransientMap = {};
cljs.core._dissoc_BANG_ = function _dissoc_BANG_(tcoll, key) {
  if(function() {
    var and__3822__auto____6798 = tcoll;
    if(and__3822__auto____6798) {
      return tcoll.cljs$core$ITransientMap$_dissoc_BANG_$arity$2
    }else {
      return and__3822__auto____6798
    }
  }()) {
    return tcoll.cljs$core$ITransientMap$_dissoc_BANG_$arity$2(tcoll, key)
  }else {
    var x__2369__auto____6799 = tcoll == null ? null : tcoll;
    return function() {
      var or__3824__auto____6800 = cljs.core._dissoc_BANG_[goog.typeOf(x__2369__auto____6799)];
      if(or__3824__auto____6800) {
        return or__3824__auto____6800
      }else {
        var or__3824__auto____6801 = cljs.core._dissoc_BANG_["_"];
        if(or__3824__auto____6801) {
          return or__3824__auto____6801
        }else {
          throw cljs.core.missing_protocol.call(null, "ITransientMap.-dissoc!", tcoll);
        }
      }
    }().call(null, tcoll, key)
  }
};
cljs.core.ITransientVector = {};
cljs.core._assoc_n_BANG_ = function _assoc_n_BANG_(tcoll, n, val) {
  if(function() {
    var and__3822__auto____6806 = tcoll;
    if(and__3822__auto____6806) {
      return tcoll.cljs$core$ITransientVector$_assoc_n_BANG_$arity$3
    }else {
      return and__3822__auto____6806
    }
  }()) {
    return tcoll.cljs$core$ITransientVector$_assoc_n_BANG_$arity$3(tcoll, n, val)
  }else {
    var x__2369__auto____6807 = tcoll == null ? null : tcoll;
    return function() {
      var or__3824__auto____6808 = cljs.core._assoc_n_BANG_[goog.typeOf(x__2369__auto____6807)];
      if(or__3824__auto____6808) {
        return or__3824__auto____6808
      }else {
        var or__3824__auto____6809 = cljs.core._assoc_n_BANG_["_"];
        if(or__3824__auto____6809) {
          return or__3824__auto____6809
        }else {
          throw cljs.core.missing_protocol.call(null, "ITransientVector.-assoc-n!", tcoll);
        }
      }
    }().call(null, tcoll, n, val)
  }
};
cljs.core._pop_BANG_ = function _pop_BANG_(tcoll) {
  if(function() {
    var and__3822__auto____6814 = tcoll;
    if(and__3822__auto____6814) {
      return tcoll.cljs$core$ITransientVector$_pop_BANG_$arity$1
    }else {
      return and__3822__auto____6814
    }
  }()) {
    return tcoll.cljs$core$ITransientVector$_pop_BANG_$arity$1(tcoll)
  }else {
    var x__2369__auto____6815 = tcoll == null ? null : tcoll;
    return function() {
      var or__3824__auto____6816 = cljs.core._pop_BANG_[goog.typeOf(x__2369__auto____6815)];
      if(or__3824__auto____6816) {
        return or__3824__auto____6816
      }else {
        var or__3824__auto____6817 = cljs.core._pop_BANG_["_"];
        if(or__3824__auto____6817) {
          return or__3824__auto____6817
        }else {
          throw cljs.core.missing_protocol.call(null, "ITransientVector.-pop!", tcoll);
        }
      }
    }().call(null, tcoll)
  }
};
cljs.core.ITransientSet = {};
cljs.core._disjoin_BANG_ = function _disjoin_BANG_(tcoll, v) {
  if(function() {
    var and__3822__auto____6822 = tcoll;
    if(and__3822__auto____6822) {
      return tcoll.cljs$core$ITransientSet$_disjoin_BANG_$arity$2
    }else {
      return and__3822__auto____6822
    }
  }()) {
    return tcoll.cljs$core$ITransientSet$_disjoin_BANG_$arity$2(tcoll, v)
  }else {
    var x__2369__auto____6823 = tcoll == null ? null : tcoll;
    return function() {
      var or__3824__auto____6824 = cljs.core._disjoin_BANG_[goog.typeOf(x__2369__auto____6823)];
      if(or__3824__auto____6824) {
        return or__3824__auto____6824
      }else {
        var or__3824__auto____6825 = cljs.core._disjoin_BANG_["_"];
        if(or__3824__auto____6825) {
          return or__3824__auto____6825
        }else {
          throw cljs.core.missing_protocol.call(null, "ITransientSet.-disjoin!", tcoll);
        }
      }
    }().call(null, tcoll, v)
  }
};
cljs.core.IComparable = {};
cljs.core._compare = function _compare(x, y) {
  if(function() {
    var and__3822__auto____6830 = x;
    if(and__3822__auto____6830) {
      return x.cljs$core$IComparable$_compare$arity$2
    }else {
      return and__3822__auto____6830
    }
  }()) {
    return x.cljs$core$IComparable$_compare$arity$2(x, y)
  }else {
    var x__2369__auto____6831 = x == null ? null : x;
    return function() {
      var or__3824__auto____6832 = cljs.core._compare[goog.typeOf(x__2369__auto____6831)];
      if(or__3824__auto____6832) {
        return or__3824__auto____6832
      }else {
        var or__3824__auto____6833 = cljs.core._compare["_"];
        if(or__3824__auto____6833) {
          return or__3824__auto____6833
        }else {
          throw cljs.core.missing_protocol.call(null, "IComparable.-compare", x);
        }
      }
    }().call(null, x, y)
  }
};
cljs.core.IChunk = {};
cljs.core._drop_first = function _drop_first(coll) {
  if(function() {
    var and__3822__auto____6838 = coll;
    if(and__3822__auto____6838) {
      return coll.cljs$core$IChunk$_drop_first$arity$1
    }else {
      return and__3822__auto____6838
    }
  }()) {
    return coll.cljs$core$IChunk$_drop_first$arity$1(coll)
  }else {
    var x__2369__auto____6839 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6840 = cljs.core._drop_first[goog.typeOf(x__2369__auto____6839)];
      if(or__3824__auto____6840) {
        return or__3824__auto____6840
      }else {
        var or__3824__auto____6841 = cljs.core._drop_first["_"];
        if(or__3824__auto____6841) {
          return or__3824__auto____6841
        }else {
          throw cljs.core.missing_protocol.call(null, "IChunk.-drop-first", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core.IChunkedSeq = {};
cljs.core._chunked_first = function _chunked_first(coll) {
  if(function() {
    var and__3822__auto____6846 = coll;
    if(and__3822__auto____6846) {
      return coll.cljs$core$IChunkedSeq$_chunked_first$arity$1
    }else {
      return and__3822__auto____6846
    }
  }()) {
    return coll.cljs$core$IChunkedSeq$_chunked_first$arity$1(coll)
  }else {
    var x__2369__auto____6847 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6848 = cljs.core._chunked_first[goog.typeOf(x__2369__auto____6847)];
      if(or__3824__auto____6848) {
        return or__3824__auto____6848
      }else {
        var or__3824__auto____6849 = cljs.core._chunked_first["_"];
        if(or__3824__auto____6849) {
          return or__3824__auto____6849
        }else {
          throw cljs.core.missing_protocol.call(null, "IChunkedSeq.-chunked-first", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core._chunked_rest = function _chunked_rest(coll) {
  if(function() {
    var and__3822__auto____6854 = coll;
    if(and__3822__auto____6854) {
      return coll.cljs$core$IChunkedSeq$_chunked_rest$arity$1
    }else {
      return and__3822__auto____6854
    }
  }()) {
    return coll.cljs$core$IChunkedSeq$_chunked_rest$arity$1(coll)
  }else {
    var x__2369__auto____6855 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6856 = cljs.core._chunked_rest[goog.typeOf(x__2369__auto____6855)];
      if(or__3824__auto____6856) {
        return or__3824__auto____6856
      }else {
        var or__3824__auto____6857 = cljs.core._chunked_rest["_"];
        if(or__3824__auto____6857) {
          return or__3824__auto____6857
        }else {
          throw cljs.core.missing_protocol.call(null, "IChunkedSeq.-chunked-rest", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core.IChunkedNext = {};
cljs.core._chunked_next = function _chunked_next(coll) {
  if(function() {
    var and__3822__auto____6862 = coll;
    if(and__3822__auto____6862) {
      return coll.cljs$core$IChunkedNext$_chunked_next$arity$1
    }else {
      return and__3822__auto____6862
    }
  }()) {
    return coll.cljs$core$IChunkedNext$_chunked_next$arity$1(coll)
  }else {
    var x__2369__auto____6863 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6864 = cljs.core._chunked_next[goog.typeOf(x__2369__auto____6863)];
      if(or__3824__auto____6864) {
        return or__3824__auto____6864
      }else {
        var or__3824__auto____6865 = cljs.core._chunked_next["_"];
        if(or__3824__auto____6865) {
          return or__3824__auto____6865
        }else {
          throw cljs.core.missing_protocol.call(null, "IChunkedNext.-chunked-next", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core.identical_QMARK_ = function identical_QMARK_(x, y) {
  return x === y
};
cljs.core._EQ_ = function() {
  var _EQ_ = null;
  var _EQ___1 = function(x) {
    return true
  };
  var _EQ___2 = function(x, y) {
    var or__3824__auto____6867 = x === y;
    if(or__3824__auto____6867) {
      return or__3824__auto____6867
    }else {
      return cljs.core._equiv.call(null, x, y)
    }
  };
  var _EQ___3 = function() {
    var G__6868__delegate = function(x, y, more) {
      while(true) {
        if(cljs.core.truth_(_EQ_.call(null, x, y))) {
          if(cljs.core.next.call(null, more)) {
            var G__6869 = y;
            var G__6870 = cljs.core.first.call(null, more);
            var G__6871 = cljs.core.next.call(null, more);
            x = G__6869;
            y = G__6870;
            more = G__6871;
            continue
          }else {
            return _EQ_.call(null, y, cljs.core.first.call(null, more))
          }
        }else {
          return false
        }
        break
      }
    };
    var G__6868 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__6868__delegate.call(this, x, y, more)
    };
    G__6868.cljs$lang$maxFixedArity = 2;
    G__6868.cljs$lang$applyTo = function(arglist__6872) {
      var x = cljs.core.first(arglist__6872);
      var y = cljs.core.first(cljs.core.next(arglist__6872));
      var more = cljs.core.rest(cljs.core.next(arglist__6872));
      return G__6868__delegate(x, y, more)
    };
    G__6868.cljs$lang$arity$variadic = G__6868__delegate;
    return G__6868
  }();
  _EQ_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return _EQ___1.call(this, x);
      case 2:
        return _EQ___2.call(this, x, y);
      default:
        return _EQ___3.cljs$lang$arity$variadic(x, y, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  _EQ_.cljs$lang$maxFixedArity = 2;
  _EQ_.cljs$lang$applyTo = _EQ___3.cljs$lang$applyTo;
  _EQ_.cljs$lang$arity$1 = _EQ___1;
  _EQ_.cljs$lang$arity$2 = _EQ___2;
  _EQ_.cljs$lang$arity$variadic = _EQ___3.cljs$lang$arity$variadic;
  return _EQ_
}();
cljs.core.nil_QMARK_ = function nil_QMARK_(x) {
  return x == null
};
cljs.core.type = function type(x) {
  if(x == null) {
    return null
  }else {
    return x.constructor
  }
};
cljs.core.instance_QMARK_ = function instance_QMARK_(t, o) {
  return o instanceof t
};
cljs.core.IHash["null"] = true;
cljs.core._hash["null"] = function(o) {
  return 0
};
cljs.core.ILookup["null"] = true;
cljs.core._lookup["null"] = function() {
  var G__6873 = null;
  var G__6873__2 = function(o, k) {
    return null
  };
  var G__6873__3 = function(o, k, not_found) {
    return not_found
  };
  G__6873 = function(o, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__6873__2.call(this, o, k);
      case 3:
        return G__6873__3.call(this, o, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__6873
}();
cljs.core.IAssociative["null"] = true;
cljs.core._assoc["null"] = function(_, k, v) {
  return cljs.core.hash_map.call(null, k, v)
};
cljs.core.INext["null"] = true;
cljs.core._next["null"] = function(_) {
  return null
};
cljs.core.ICollection["null"] = true;
cljs.core._conj["null"] = function(_, o) {
  return cljs.core.list.call(null, o)
};
cljs.core.IReduce["null"] = true;
cljs.core._reduce["null"] = function() {
  var G__6874 = null;
  var G__6874__2 = function(_, f) {
    return f.call(null)
  };
  var G__6874__3 = function(_, f, start) {
    return start
  };
  G__6874 = function(_, f, start) {
    switch(arguments.length) {
      case 2:
        return G__6874__2.call(this, _, f);
      case 3:
        return G__6874__3.call(this, _, f, start)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__6874
}();
cljs.core.IPrintable["null"] = true;
cljs.core._pr_seq["null"] = function(o) {
  return cljs.core.list.call(null, "nil")
};
cljs.core.ISet["null"] = true;
cljs.core._disjoin["null"] = function(_, v) {
  return null
};
cljs.core.ICounted["null"] = true;
cljs.core._count["null"] = function(_) {
  return 0
};
cljs.core.IStack["null"] = true;
cljs.core._peek["null"] = function(_) {
  return null
};
cljs.core._pop["null"] = function(_) {
  return null
};
cljs.core.ISeq["null"] = true;
cljs.core._first["null"] = function(_) {
  return null
};
cljs.core._rest["null"] = function(_) {
  return cljs.core.list.call(null)
};
cljs.core.IEquiv["null"] = true;
cljs.core._equiv["null"] = function(_, o) {
  return o == null
};
cljs.core.IWithMeta["null"] = true;
cljs.core._with_meta["null"] = function(_, meta) {
  return null
};
cljs.core.IMeta["null"] = true;
cljs.core._meta["null"] = function(_) {
  return null
};
cljs.core.IIndexed["null"] = true;
cljs.core._nth["null"] = function() {
  var G__6875 = null;
  var G__6875__2 = function(_, n) {
    return null
  };
  var G__6875__3 = function(_, n, not_found) {
    return not_found
  };
  G__6875 = function(_, n, not_found) {
    switch(arguments.length) {
      case 2:
        return G__6875__2.call(this, _, n);
      case 3:
        return G__6875__3.call(this, _, n, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__6875
}();
cljs.core.IEmptyableCollection["null"] = true;
cljs.core._empty["null"] = function(_) {
  return null
};
cljs.core.IMap["null"] = true;
cljs.core._dissoc["null"] = function(_, k) {
  return null
};
Date.prototype.cljs$core$IEquiv$ = true;
Date.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(o, other) {
  var and__3822__auto____6876 = cljs.core.instance_QMARK_.call(null, Date, other);
  if(and__3822__auto____6876) {
    return o.toString() === other.toString()
  }else {
    return and__3822__auto____6876
  }
};
cljs.core.IHash["number"] = true;
cljs.core._hash["number"] = function(o) {
  return o
};
cljs.core.IEquiv["number"] = true;
cljs.core._equiv["number"] = function(x, o) {
  return x === o
};
cljs.core.IHash["boolean"] = true;
cljs.core._hash["boolean"] = function(o) {
  if(o === true) {
    return 1
  }else {
    return 0
  }
};
cljs.core.IHash["_"] = true;
cljs.core._hash["_"] = function(o) {
  return goog.getUid(o)
};
cljs.core.inc = function inc(x) {
  return x + 1
};
cljs.core.ci_reduce = function() {
  var ci_reduce = null;
  var ci_reduce__2 = function(cicoll, f) {
    var cnt__6889 = cljs.core._count.call(null, cicoll);
    if(cnt__6889 === 0) {
      return f.call(null)
    }else {
      var val__6890 = cljs.core._nth.call(null, cicoll, 0);
      var n__6891 = 1;
      while(true) {
        if(n__6891 < cnt__6889) {
          var nval__6892 = f.call(null, val__6890, cljs.core._nth.call(null, cicoll, n__6891));
          if(cljs.core.reduced_QMARK_.call(null, nval__6892)) {
            return cljs.core.deref.call(null, nval__6892)
          }else {
            var G__6901 = nval__6892;
            var G__6902 = n__6891 + 1;
            val__6890 = G__6901;
            n__6891 = G__6902;
            continue
          }
        }else {
          return val__6890
        }
        break
      }
    }
  };
  var ci_reduce__3 = function(cicoll, f, val) {
    var cnt__6893 = cljs.core._count.call(null, cicoll);
    var val__6894 = val;
    var n__6895 = 0;
    while(true) {
      if(n__6895 < cnt__6893) {
        var nval__6896 = f.call(null, val__6894, cljs.core._nth.call(null, cicoll, n__6895));
        if(cljs.core.reduced_QMARK_.call(null, nval__6896)) {
          return cljs.core.deref.call(null, nval__6896)
        }else {
          var G__6903 = nval__6896;
          var G__6904 = n__6895 + 1;
          val__6894 = G__6903;
          n__6895 = G__6904;
          continue
        }
      }else {
        return val__6894
      }
      break
    }
  };
  var ci_reduce__4 = function(cicoll, f, val, idx) {
    var cnt__6897 = cljs.core._count.call(null, cicoll);
    var val__6898 = val;
    var n__6899 = idx;
    while(true) {
      if(n__6899 < cnt__6897) {
        var nval__6900 = f.call(null, val__6898, cljs.core._nth.call(null, cicoll, n__6899));
        if(cljs.core.reduced_QMARK_.call(null, nval__6900)) {
          return cljs.core.deref.call(null, nval__6900)
        }else {
          var G__6905 = nval__6900;
          var G__6906 = n__6899 + 1;
          val__6898 = G__6905;
          n__6899 = G__6906;
          continue
        }
      }else {
        return val__6898
      }
      break
    }
  };
  ci_reduce = function(cicoll, f, val, idx) {
    switch(arguments.length) {
      case 2:
        return ci_reduce__2.call(this, cicoll, f);
      case 3:
        return ci_reduce__3.call(this, cicoll, f, val);
      case 4:
        return ci_reduce__4.call(this, cicoll, f, val, idx)
    }
    throw"Invalid arity: " + arguments.length;
  };
  ci_reduce.cljs$lang$arity$2 = ci_reduce__2;
  ci_reduce.cljs$lang$arity$3 = ci_reduce__3;
  ci_reduce.cljs$lang$arity$4 = ci_reduce__4;
  return ci_reduce
}();
cljs.core.array_reduce = function() {
  var array_reduce = null;
  var array_reduce__2 = function(arr, f) {
    var cnt__6919 = arr.length;
    if(arr.length === 0) {
      return f.call(null)
    }else {
      var val__6920 = arr[0];
      var n__6921 = 1;
      while(true) {
        if(n__6921 < cnt__6919) {
          var nval__6922 = f.call(null, val__6920, arr[n__6921]);
          if(cljs.core.reduced_QMARK_.call(null, nval__6922)) {
            return cljs.core.deref.call(null, nval__6922)
          }else {
            var G__6931 = nval__6922;
            var G__6932 = n__6921 + 1;
            val__6920 = G__6931;
            n__6921 = G__6932;
            continue
          }
        }else {
          return val__6920
        }
        break
      }
    }
  };
  var array_reduce__3 = function(arr, f, val) {
    var cnt__6923 = arr.length;
    var val__6924 = val;
    var n__6925 = 0;
    while(true) {
      if(n__6925 < cnt__6923) {
        var nval__6926 = f.call(null, val__6924, arr[n__6925]);
        if(cljs.core.reduced_QMARK_.call(null, nval__6926)) {
          return cljs.core.deref.call(null, nval__6926)
        }else {
          var G__6933 = nval__6926;
          var G__6934 = n__6925 + 1;
          val__6924 = G__6933;
          n__6925 = G__6934;
          continue
        }
      }else {
        return val__6924
      }
      break
    }
  };
  var array_reduce__4 = function(arr, f, val, idx) {
    var cnt__6927 = arr.length;
    var val__6928 = val;
    var n__6929 = idx;
    while(true) {
      if(n__6929 < cnt__6927) {
        var nval__6930 = f.call(null, val__6928, arr[n__6929]);
        if(cljs.core.reduced_QMARK_.call(null, nval__6930)) {
          return cljs.core.deref.call(null, nval__6930)
        }else {
          var G__6935 = nval__6930;
          var G__6936 = n__6929 + 1;
          val__6928 = G__6935;
          n__6929 = G__6936;
          continue
        }
      }else {
        return val__6928
      }
      break
    }
  };
  array_reduce = function(arr, f, val, idx) {
    switch(arguments.length) {
      case 2:
        return array_reduce__2.call(this, arr, f);
      case 3:
        return array_reduce__3.call(this, arr, f, val);
      case 4:
        return array_reduce__4.call(this, arr, f, val, idx)
    }
    throw"Invalid arity: " + arguments.length;
  };
  array_reduce.cljs$lang$arity$2 = array_reduce__2;
  array_reduce.cljs$lang$arity$3 = array_reduce__3;
  array_reduce.cljs$lang$arity$4 = array_reduce__4;
  return array_reduce
}();
cljs.core.IndexedSeq = function(a, i) {
  this.a = a;
  this.i = i;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 166199546
};
cljs.core.IndexedSeq.cljs$lang$type = true;
cljs.core.IndexedSeq.cljs$lang$ctorPrSeq = function(this__2315__auto__) {
  return cljs.core.list.call(null, "cljs.core/IndexedSeq")
};
cljs.core.IndexedSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__6937 = this;
  return cljs.core.hash_coll.call(null, coll)
};
cljs.core.IndexedSeq.prototype.cljs$core$INext$_next$arity$1 = function(_) {
  var this__6938 = this;
  if(this__6938.i + 1 < this__6938.a.length) {
    return new cljs.core.IndexedSeq(this__6938.a, this__6938.i + 1)
  }else {
    return null
  }
};
cljs.core.IndexedSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__6939 = this;
  return cljs.core.cons.call(null, o, coll)
};
cljs.core.IndexedSeq.prototype.cljs$core$IReversible$_rseq$arity$1 = function(coll) {
  var this__6940 = this;
  var c__6941 = coll.cljs$core$ICounted$_count$arity$1(coll);
  if(c__6941 > 0) {
    return new cljs.core.RSeq(coll, c__6941 - 1, null)
  }else {
    return cljs.core.List.EMPTY
  }
};
cljs.core.IndexedSeq.prototype.toString = function() {
  var this__6942 = this;
  var this__6943 = this;
  return cljs.core.pr_str.call(null, this__6943)
};
cljs.core.IndexedSeq.prototype.cljs$core$IReduce$_reduce$arity$2 = function(coll, f) {
  var this__6944 = this;
  if(cljs.core.counted_QMARK_.call(null, this__6944.a)) {
    return cljs.core.ci_reduce.call(null, this__6944.a, f, this__6944.a[this__6944.i], this__6944.i + 1)
  }else {
    return cljs.core.ci_reduce.call(null, coll, f, this__6944.a[this__6944.i], 0)
  }
};
cljs.core.IndexedSeq.prototype.cljs$core$IReduce$_reduce$arity$3 = function(coll, f, start) {
  var this__6945 = this;
  if(cljs.core.counted_QMARK_.call(null, this__6945.a)) {
    return cljs.core.ci_reduce.call(null, this__6945.a, f, start, this__6945.i)
  }else {
    return cljs.core.ci_reduce.call(null, coll, f, start, 0)
  }
};
cljs.core.IndexedSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(this$) {
  var this__6946 = this;
  return this$
};
cljs.core.IndexedSeq.prototype.cljs$core$ICounted$_count$arity$1 = function(_) {
  var this__6947 = this;
  return this__6947.a.length - this__6947.i
};
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$_first$arity$1 = function(_) {
  var this__6948 = this;
  return this__6948.a[this__6948.i]
};
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(_) {
  var this__6949 = this;
  if(this__6949.i + 1 < this__6949.a.length) {
    return new cljs.core.IndexedSeq(this__6949.a, this__6949.i + 1)
  }else {
    return cljs.core.list.call(null)
  }
};
cljs.core.IndexedSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__6950 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.IndexedSeq.prototype.cljs$core$IIndexed$_nth$arity$2 = function(coll, n) {
  var this__6951 = this;
  var i__6952 = n + this__6951.i;
  if(i__6952 < this__6951.a.length) {
    return this__6951.a[i__6952]
  }else {
    return null
  }
};
cljs.core.IndexedSeq.prototype.cljs$core$IIndexed$_nth$arity$3 = function(coll, n, not_found) {
  var this__6953 = this;
  var i__6954 = n + this__6953.i;
  if(i__6954 < this__6953.a.length) {
    return this__6953.a[i__6954]
  }else {
    return not_found
  }
};
cljs.core.IndexedSeq;
cljs.core.prim_seq = function() {
  var prim_seq = null;
  var prim_seq__1 = function(prim) {
    return prim_seq.call(null, prim, 0)
  };
  var prim_seq__2 = function(prim, i) {
    if(prim.length === 0) {
      return null
    }else {
      return new cljs.core.IndexedSeq(prim, i)
    }
  };
  prim_seq = function(prim, i) {
    switch(arguments.length) {
      case 1:
        return prim_seq__1.call(this, prim);
      case 2:
        return prim_seq__2.call(this, prim, i)
    }
    throw"Invalid arity: " + arguments.length;
  };
  prim_seq.cljs$lang$arity$1 = prim_seq__1;
  prim_seq.cljs$lang$arity$2 = prim_seq__2;
  return prim_seq
}();
cljs.core.array_seq = function() {
  var array_seq = null;
  var array_seq__1 = function(array) {
    return cljs.core.prim_seq.call(null, array, 0)
  };
  var array_seq__2 = function(array, i) {
    return cljs.core.prim_seq.call(null, array, i)
  };
  array_seq = function(array, i) {
    switch(arguments.length) {
      case 1:
        return array_seq__1.call(this, array);
      case 2:
        return array_seq__2.call(this, array, i)
    }
    throw"Invalid arity: " + arguments.length;
  };
  array_seq.cljs$lang$arity$1 = array_seq__1;
  array_seq.cljs$lang$arity$2 = array_seq__2;
  return array_seq
}();
cljs.core.IReduce["array"] = true;
cljs.core._reduce["array"] = function() {
  var G__6955 = null;
  var G__6955__2 = function(array, f) {
    return cljs.core.ci_reduce.call(null, array, f)
  };
  var G__6955__3 = function(array, f, start) {
    return cljs.core.ci_reduce.call(null, array, f, start)
  };
  G__6955 = function(array, f, start) {
    switch(arguments.length) {
      case 2:
        return G__6955__2.call(this, array, f);
      case 3:
        return G__6955__3.call(this, array, f, start)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__6955
}();
cljs.core.ILookup["array"] = true;
cljs.core._lookup["array"] = function() {
  var G__6956 = null;
  var G__6956__2 = function(array, k) {
    return array[k]
  };
  var G__6956__3 = function(array, k, not_found) {
    return cljs.core._nth.call(null, array, k, not_found)
  };
  G__6956 = function(array, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__6956__2.call(this, array, k);
      case 3:
        return G__6956__3.call(this, array, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__6956
}();
cljs.core.IIndexed["array"] = true;
cljs.core._nth["array"] = function() {
  var G__6957 = null;
  var G__6957__2 = function(array, n) {
    if(n < array.length) {
      return array[n]
    }else {
      return null
    }
  };
  var G__6957__3 = function(array, n, not_found) {
    if(n < array.length) {
      return array[n]
    }else {
      return not_found
    }
  };
  G__6957 = function(array, n, not_found) {
    switch(arguments.length) {
      case 2:
        return G__6957__2.call(this, array, n);
      case 3:
        return G__6957__3.call(this, array, n, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__6957
}();
cljs.core.ICounted["array"] = true;
cljs.core._count["array"] = function(a) {
  return a.length
};
cljs.core.ISeqable["array"] = true;
cljs.core._seq["array"] = function(array) {
  return cljs.core.array_seq.call(null, array, 0)
};
cljs.core.RSeq = function(ci, i, meta) {
  this.ci = ci;
  this.i = i;
  this.meta = meta;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 31850570
};
cljs.core.RSeq.cljs$lang$type = true;
cljs.core.RSeq.cljs$lang$ctorPrSeq = function(this__2315__auto__) {
  return cljs.core.list.call(null, "cljs.core/RSeq")
};
cljs.core.RSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__6958 = this;
  return cljs.core.hash_coll.call(null, coll)
};
cljs.core.RSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__6959 = this;
  return cljs.core.cons.call(null, o, coll)
};
cljs.core.RSeq.prototype.toString = function() {
  var this__6960 = this;
  var this__6961 = this;
  return cljs.core.pr_str.call(null, this__6961)
};
cljs.core.RSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__6962 = this;
  return coll
};
cljs.core.RSeq.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__6963 = this;
  return this__6963.i + 1
};
cljs.core.RSeq.prototype.cljs$core$ISeq$_first$arity$1 = function(coll) {
  var this__6964 = this;
  return cljs.core._nth.call(null, this__6964.ci, this__6964.i)
};
cljs.core.RSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(coll) {
  var this__6965 = this;
  if(this__6965.i > 0) {
    return new cljs.core.RSeq(this__6965.ci, this__6965.i - 1, null)
  }else {
    return cljs.core.List.EMPTY
  }
};
cljs.core.RSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__6966 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.RSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, new_meta) {
  var this__6967 = this;
  return new cljs.core.RSeq(this__6967.ci, this__6967.i, new_meta)
};
cljs.core.RSeq.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__6968 = this;
  return this__6968.meta
};
cljs.core.RSeq;
cljs.core.seq = function seq(coll) {
  if(coll == null) {
    return null
  }else {
    if(function() {
      var G__6972__6973 = coll;
      if(G__6972__6973) {
        if(function() {
          var or__3824__auto____6974 = G__6972__6973.cljs$lang$protocol_mask$partition0$ & 32;
          if(or__3824__auto____6974) {
            return or__3824__auto____6974
          }else {
            return G__6972__6973.cljs$core$ASeq$
          }
        }()) {
          return true
        }else {
          if(!G__6972__6973.cljs$lang$protocol_mask$partition0$) {
            return cljs.core.type_satisfies_.call(null, cljs.core.ASeq, G__6972__6973)
          }else {
            return false
          }
        }
      }else {
        return cljs.core.type_satisfies_.call(null, cljs.core.ASeq, G__6972__6973)
      }
    }()) {
      return coll
    }else {
      return cljs.core._seq.call(null, coll)
    }
  }
};
cljs.core.first = function first(coll) {
  if(coll == null) {
    return null
  }else {
    if(function() {
      var G__6979__6980 = coll;
      if(G__6979__6980) {
        if(function() {
          var or__3824__auto____6981 = G__6979__6980.cljs$lang$protocol_mask$partition0$ & 64;
          if(or__3824__auto____6981) {
            return or__3824__auto____6981
          }else {
            return G__6979__6980.cljs$core$ISeq$
          }
        }()) {
          return true
        }else {
          if(!G__6979__6980.cljs$lang$protocol_mask$partition0$) {
            return cljs.core.type_satisfies_.call(null, cljs.core.ISeq, G__6979__6980)
          }else {
            return false
          }
        }
      }else {
        return cljs.core.type_satisfies_.call(null, cljs.core.ISeq, G__6979__6980)
      }
    }()) {
      return cljs.core._first.call(null, coll)
    }else {
      var s__6982 = cljs.core.seq.call(null, coll);
      if(s__6982 == null) {
        return null
      }else {
        return cljs.core._first.call(null, s__6982)
      }
    }
  }
};
cljs.core.rest = function rest(coll) {
  if(!(coll == null)) {
    if(function() {
      var G__6987__6988 = coll;
      if(G__6987__6988) {
        if(function() {
          var or__3824__auto____6989 = G__6987__6988.cljs$lang$protocol_mask$partition0$ & 64;
          if(or__3824__auto____6989) {
            return or__3824__auto____6989
          }else {
            return G__6987__6988.cljs$core$ISeq$
          }
        }()) {
          return true
        }else {
          if(!G__6987__6988.cljs$lang$protocol_mask$partition0$) {
            return cljs.core.type_satisfies_.call(null, cljs.core.ISeq, G__6987__6988)
          }else {
            return false
          }
        }
      }else {
        return cljs.core.type_satisfies_.call(null, cljs.core.ISeq, G__6987__6988)
      }
    }()) {
      return cljs.core._rest.call(null, coll)
    }else {
      var s__6990 = cljs.core.seq.call(null, coll);
      if(!(s__6990 == null)) {
        return cljs.core._rest.call(null, s__6990)
      }else {
        return cljs.core.List.EMPTY
      }
    }
  }else {
    return cljs.core.List.EMPTY
  }
};
cljs.core.next = function next(coll) {
  if(coll == null) {
    return null
  }else {
    if(function() {
      var G__6994__6995 = coll;
      if(G__6994__6995) {
        if(function() {
          var or__3824__auto____6996 = G__6994__6995.cljs$lang$protocol_mask$partition0$ & 128;
          if(or__3824__auto____6996) {
            return or__3824__auto____6996
          }else {
            return G__6994__6995.cljs$core$INext$
          }
        }()) {
          return true
        }else {
          if(!G__6994__6995.cljs$lang$protocol_mask$partition0$) {
            return cljs.core.type_satisfies_.call(null, cljs.core.INext, G__6994__6995)
          }else {
            return false
          }
        }
      }else {
        return cljs.core.type_satisfies_.call(null, cljs.core.INext, G__6994__6995)
      }
    }()) {
      return cljs.core._next.call(null, coll)
    }else {
      return cljs.core.seq.call(null, cljs.core.rest.call(null, coll))
    }
  }
};
cljs.core.second = function second(coll) {
  return cljs.core.first.call(null, cljs.core.next.call(null, coll))
};
cljs.core.ffirst = function ffirst(coll) {
  return cljs.core.first.call(null, cljs.core.first.call(null, coll))
};
cljs.core.nfirst = function nfirst(coll) {
  return cljs.core.next.call(null, cljs.core.first.call(null, coll))
};
cljs.core.fnext = function fnext(coll) {
  return cljs.core.first.call(null, cljs.core.next.call(null, coll))
};
cljs.core.nnext = function nnext(coll) {
  return cljs.core.next.call(null, cljs.core.next.call(null, coll))
};
cljs.core.last = function last(s) {
  while(true) {
    var sn__6998 = cljs.core.next.call(null, s);
    if(!(sn__6998 == null)) {
      var G__6999 = sn__6998;
      s = G__6999;
      continue
    }else {
      return cljs.core.first.call(null, s)
    }
    break
  }
};
cljs.core.IEquiv["_"] = true;
cljs.core._equiv["_"] = function(x, o) {
  return x === o
};
cljs.core.not = function not(x) {
  if(cljs.core.truth_(x)) {
    return false
  }else {
    return true
  }
};
cljs.core.conj = function() {
  var conj = null;
  var conj__2 = function(coll, x) {
    return cljs.core._conj.call(null, coll, x)
  };
  var conj__3 = function() {
    var G__7000__delegate = function(coll, x, xs) {
      while(true) {
        if(cljs.core.truth_(xs)) {
          var G__7001 = conj.call(null, coll, x);
          var G__7002 = cljs.core.first.call(null, xs);
          var G__7003 = cljs.core.next.call(null, xs);
          coll = G__7001;
          x = G__7002;
          xs = G__7003;
          continue
        }else {
          return conj.call(null, coll, x)
        }
        break
      }
    };
    var G__7000 = function(coll, x, var_args) {
      var xs = null;
      if(goog.isDef(var_args)) {
        xs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__7000__delegate.call(this, coll, x, xs)
    };
    G__7000.cljs$lang$maxFixedArity = 2;
    G__7000.cljs$lang$applyTo = function(arglist__7004) {
      var coll = cljs.core.first(arglist__7004);
      var x = cljs.core.first(cljs.core.next(arglist__7004));
      var xs = cljs.core.rest(cljs.core.next(arglist__7004));
      return G__7000__delegate(coll, x, xs)
    };
    G__7000.cljs$lang$arity$variadic = G__7000__delegate;
    return G__7000
  }();
  conj = function(coll, x, var_args) {
    var xs = var_args;
    switch(arguments.length) {
      case 2:
        return conj__2.call(this, coll, x);
      default:
        return conj__3.cljs$lang$arity$variadic(coll, x, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  conj.cljs$lang$maxFixedArity = 2;
  conj.cljs$lang$applyTo = conj__3.cljs$lang$applyTo;
  conj.cljs$lang$arity$2 = conj__2;
  conj.cljs$lang$arity$variadic = conj__3.cljs$lang$arity$variadic;
  return conj
}();
cljs.core.empty = function empty(coll) {
  return cljs.core._empty.call(null, coll)
};
cljs.core.accumulating_seq_count = function accumulating_seq_count(coll) {
  var s__7007 = cljs.core.seq.call(null, coll);
  var acc__7008 = 0;
  while(true) {
    if(cljs.core.counted_QMARK_.call(null, s__7007)) {
      return acc__7008 + cljs.core._count.call(null, s__7007)
    }else {
      var G__7009 = cljs.core.next.call(null, s__7007);
      var G__7010 = acc__7008 + 1;
      s__7007 = G__7009;
      acc__7008 = G__7010;
      continue
    }
    break
  }
};
cljs.core.count = function count(coll) {
  if(cljs.core.counted_QMARK_.call(null, coll)) {
    return cljs.core._count.call(null, coll)
  }else {
    return cljs.core.accumulating_seq_count.call(null, coll)
  }
};
cljs.core.linear_traversal_nth = function() {
  var linear_traversal_nth = null;
  var linear_traversal_nth__2 = function(coll, n) {
    if(coll == null) {
      throw new Error("Index out of bounds");
    }else {
      if(n === 0) {
        if(cljs.core.seq.call(null, coll)) {
          return cljs.core.first.call(null, coll)
        }else {
          throw new Error("Index out of bounds");
        }
      }else {
        if(cljs.core.indexed_QMARK_.call(null, coll)) {
          return cljs.core._nth.call(null, coll, n)
        }else {
          if(cljs.core.seq.call(null, coll)) {
            return linear_traversal_nth.call(null, cljs.core.next.call(null, coll), n - 1)
          }else {
            if("\ufdd0'else") {
              throw new Error("Index out of bounds");
            }else {
              return null
            }
          }
        }
      }
    }
  };
  var linear_traversal_nth__3 = function(coll, n, not_found) {
    if(coll == null) {
      return not_found
    }else {
      if(n === 0) {
        if(cljs.core.seq.call(null, coll)) {
          return cljs.core.first.call(null, coll)
        }else {
          return not_found
        }
      }else {
        if(cljs.core.indexed_QMARK_.call(null, coll)) {
          return cljs.core._nth.call(null, coll, n, not_found)
        }else {
          if(cljs.core.seq.call(null, coll)) {
            return linear_traversal_nth.call(null, cljs.core.next.call(null, coll), n - 1, not_found)
          }else {
            if("\ufdd0'else") {
              return not_found
            }else {
              return null
            }
          }
        }
      }
    }
  };
  linear_traversal_nth = function(coll, n, not_found) {
    switch(arguments.length) {
      case 2:
        return linear_traversal_nth__2.call(this, coll, n);
      case 3:
        return linear_traversal_nth__3.call(this, coll, n, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  linear_traversal_nth.cljs$lang$arity$2 = linear_traversal_nth__2;
  linear_traversal_nth.cljs$lang$arity$3 = linear_traversal_nth__3;
  return linear_traversal_nth
}();
cljs.core.nth = function() {
  var nth = null;
  var nth__2 = function(coll, n) {
    if(coll == null) {
      return null
    }else {
      if(function() {
        var G__7017__7018 = coll;
        if(G__7017__7018) {
          if(function() {
            var or__3824__auto____7019 = G__7017__7018.cljs$lang$protocol_mask$partition0$ & 16;
            if(or__3824__auto____7019) {
              return or__3824__auto____7019
            }else {
              return G__7017__7018.cljs$core$IIndexed$
            }
          }()) {
            return true
          }else {
            if(!G__7017__7018.cljs$lang$protocol_mask$partition0$) {
              return cljs.core.type_satisfies_.call(null, cljs.core.IIndexed, G__7017__7018)
            }else {
              return false
            }
          }
        }else {
          return cljs.core.type_satisfies_.call(null, cljs.core.IIndexed, G__7017__7018)
        }
      }()) {
        return cljs.core._nth.call(null, coll, Math.floor(n))
      }else {
        return cljs.core.linear_traversal_nth.call(null, coll, Math.floor(n))
      }
    }
  };
  var nth__3 = function(coll, n, not_found) {
    if(!(coll == null)) {
      if(function() {
        var G__7020__7021 = coll;
        if(G__7020__7021) {
          if(function() {
            var or__3824__auto____7022 = G__7020__7021.cljs$lang$protocol_mask$partition0$ & 16;
            if(or__3824__auto____7022) {
              return or__3824__auto____7022
            }else {
              return G__7020__7021.cljs$core$IIndexed$
            }
          }()) {
            return true
          }else {
            if(!G__7020__7021.cljs$lang$protocol_mask$partition0$) {
              return cljs.core.type_satisfies_.call(null, cljs.core.IIndexed, G__7020__7021)
            }else {
              return false
            }
          }
        }else {
          return cljs.core.type_satisfies_.call(null, cljs.core.IIndexed, G__7020__7021)
        }
      }()) {
        return cljs.core._nth.call(null, coll, Math.floor(n), not_found)
      }else {
        return cljs.core.linear_traversal_nth.call(null, coll, Math.floor(n), not_found)
      }
    }else {
      return not_found
    }
  };
  nth = function(coll, n, not_found) {
    switch(arguments.length) {
      case 2:
        return nth__2.call(this, coll, n);
      case 3:
        return nth__3.call(this, coll, n, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  nth.cljs$lang$arity$2 = nth__2;
  nth.cljs$lang$arity$3 = nth__3;
  return nth
}();
cljs.core.get = function() {
  var get = null;
  var get__2 = function(o, k) {
    return cljs.core._lookup.call(null, o, k)
  };
  var get__3 = function(o, k, not_found) {
    return cljs.core._lookup.call(null, o, k, not_found)
  };
  get = function(o, k, not_found) {
    switch(arguments.length) {
      case 2:
        return get__2.call(this, o, k);
      case 3:
        return get__3.call(this, o, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  get.cljs$lang$arity$2 = get__2;
  get.cljs$lang$arity$3 = get__3;
  return get
}();
cljs.core.assoc = function() {
  var assoc = null;
  var assoc__3 = function(coll, k, v) {
    return cljs.core._assoc.call(null, coll, k, v)
  };
  var assoc__4 = function() {
    var G__7025__delegate = function(coll, k, v, kvs) {
      while(true) {
        var ret__7024 = assoc.call(null, coll, k, v);
        if(cljs.core.truth_(kvs)) {
          var G__7026 = ret__7024;
          var G__7027 = cljs.core.first.call(null, kvs);
          var G__7028 = cljs.core.second.call(null, kvs);
          var G__7029 = cljs.core.nnext.call(null, kvs);
          coll = G__7026;
          k = G__7027;
          v = G__7028;
          kvs = G__7029;
          continue
        }else {
          return ret__7024
        }
        break
      }
    };
    var G__7025 = function(coll, k, v, var_args) {
      var kvs = null;
      if(goog.isDef(var_args)) {
        kvs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
      }
      return G__7025__delegate.call(this, coll, k, v, kvs)
    };
    G__7025.cljs$lang$maxFixedArity = 3;
    G__7025.cljs$lang$applyTo = function(arglist__7030) {
      var coll = cljs.core.first(arglist__7030);
      var k = cljs.core.first(cljs.core.next(arglist__7030));
      var v = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7030)));
      var kvs = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7030)));
      return G__7025__delegate(coll, k, v, kvs)
    };
    G__7025.cljs$lang$arity$variadic = G__7025__delegate;
    return G__7025
  }();
  assoc = function(coll, k, v, var_args) {
    var kvs = var_args;
    switch(arguments.length) {
      case 3:
        return assoc__3.call(this, coll, k, v);
      default:
        return assoc__4.cljs$lang$arity$variadic(coll, k, v, cljs.core.array_seq(arguments, 3))
    }
    throw"Invalid arity: " + arguments.length;
  };
  assoc.cljs$lang$maxFixedArity = 3;
  assoc.cljs$lang$applyTo = assoc__4.cljs$lang$applyTo;
  assoc.cljs$lang$arity$3 = assoc__3;
  assoc.cljs$lang$arity$variadic = assoc__4.cljs$lang$arity$variadic;
  return assoc
}();
cljs.core.dissoc = function() {
  var dissoc = null;
  var dissoc__1 = function(coll) {
    return coll
  };
  var dissoc__2 = function(coll, k) {
    return cljs.core._dissoc.call(null, coll, k)
  };
  var dissoc__3 = function() {
    var G__7033__delegate = function(coll, k, ks) {
      while(true) {
        var ret__7032 = dissoc.call(null, coll, k);
        if(cljs.core.truth_(ks)) {
          var G__7034 = ret__7032;
          var G__7035 = cljs.core.first.call(null, ks);
          var G__7036 = cljs.core.next.call(null, ks);
          coll = G__7034;
          k = G__7035;
          ks = G__7036;
          continue
        }else {
          return ret__7032
        }
        break
      }
    };
    var G__7033 = function(coll, k, var_args) {
      var ks = null;
      if(goog.isDef(var_args)) {
        ks = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__7033__delegate.call(this, coll, k, ks)
    };
    G__7033.cljs$lang$maxFixedArity = 2;
    G__7033.cljs$lang$applyTo = function(arglist__7037) {
      var coll = cljs.core.first(arglist__7037);
      var k = cljs.core.first(cljs.core.next(arglist__7037));
      var ks = cljs.core.rest(cljs.core.next(arglist__7037));
      return G__7033__delegate(coll, k, ks)
    };
    G__7033.cljs$lang$arity$variadic = G__7033__delegate;
    return G__7033
  }();
  dissoc = function(coll, k, var_args) {
    var ks = var_args;
    switch(arguments.length) {
      case 1:
        return dissoc__1.call(this, coll);
      case 2:
        return dissoc__2.call(this, coll, k);
      default:
        return dissoc__3.cljs$lang$arity$variadic(coll, k, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  dissoc.cljs$lang$maxFixedArity = 2;
  dissoc.cljs$lang$applyTo = dissoc__3.cljs$lang$applyTo;
  dissoc.cljs$lang$arity$1 = dissoc__1;
  dissoc.cljs$lang$arity$2 = dissoc__2;
  dissoc.cljs$lang$arity$variadic = dissoc__3.cljs$lang$arity$variadic;
  return dissoc
}();
cljs.core.with_meta = function with_meta(o, meta) {
  return cljs.core._with_meta.call(null, o, meta)
};
cljs.core.meta = function meta(o) {
  if(function() {
    var G__7041__7042 = o;
    if(G__7041__7042) {
      if(function() {
        var or__3824__auto____7043 = G__7041__7042.cljs$lang$protocol_mask$partition0$ & 131072;
        if(or__3824__auto____7043) {
          return or__3824__auto____7043
        }else {
          return G__7041__7042.cljs$core$IMeta$
        }
      }()) {
        return true
      }else {
        if(!G__7041__7042.cljs$lang$protocol_mask$partition0$) {
          return cljs.core.type_satisfies_.call(null, cljs.core.IMeta, G__7041__7042)
        }else {
          return false
        }
      }
    }else {
      return cljs.core.type_satisfies_.call(null, cljs.core.IMeta, G__7041__7042)
    }
  }()) {
    return cljs.core._meta.call(null, o)
  }else {
    return null
  }
};
cljs.core.peek = function peek(coll) {
  return cljs.core._peek.call(null, coll)
};
cljs.core.pop = function pop(coll) {
  return cljs.core._pop.call(null, coll)
};
cljs.core.disj = function() {
  var disj = null;
  var disj__1 = function(coll) {
    return coll
  };
  var disj__2 = function(coll, k) {
    return cljs.core._disjoin.call(null, coll, k)
  };
  var disj__3 = function() {
    var G__7046__delegate = function(coll, k, ks) {
      while(true) {
        var ret__7045 = disj.call(null, coll, k);
        if(cljs.core.truth_(ks)) {
          var G__7047 = ret__7045;
          var G__7048 = cljs.core.first.call(null, ks);
          var G__7049 = cljs.core.next.call(null, ks);
          coll = G__7047;
          k = G__7048;
          ks = G__7049;
          continue
        }else {
          return ret__7045
        }
        break
      }
    };
    var G__7046 = function(coll, k, var_args) {
      var ks = null;
      if(goog.isDef(var_args)) {
        ks = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__7046__delegate.call(this, coll, k, ks)
    };
    G__7046.cljs$lang$maxFixedArity = 2;
    G__7046.cljs$lang$applyTo = function(arglist__7050) {
      var coll = cljs.core.first(arglist__7050);
      var k = cljs.core.first(cljs.core.next(arglist__7050));
      var ks = cljs.core.rest(cljs.core.next(arglist__7050));
      return G__7046__delegate(coll, k, ks)
    };
    G__7046.cljs$lang$arity$variadic = G__7046__delegate;
    return G__7046
  }();
  disj = function(coll, k, var_args) {
    var ks = var_args;
    switch(arguments.length) {
      case 1:
        return disj__1.call(this, coll);
      case 2:
        return disj__2.call(this, coll, k);
      default:
        return disj__3.cljs$lang$arity$variadic(coll, k, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  disj.cljs$lang$maxFixedArity = 2;
  disj.cljs$lang$applyTo = disj__3.cljs$lang$applyTo;
  disj.cljs$lang$arity$1 = disj__1;
  disj.cljs$lang$arity$2 = disj__2;
  disj.cljs$lang$arity$variadic = disj__3.cljs$lang$arity$variadic;
  return disj
}();
cljs.core.string_hash_cache = {};
cljs.core.string_hash_cache_count = 0;
cljs.core.add_to_string_hash_cache = function add_to_string_hash_cache(k) {
  var h__7052 = goog.string.hashCode(k);
  cljs.core.string_hash_cache[k] = h__7052;
  cljs.core.string_hash_cache_count = cljs.core.string_hash_cache_count + 1;
  return h__7052
};
cljs.core.check_string_hash_cache = function check_string_hash_cache(k) {
  if(cljs.core.string_hash_cache_count > 255) {
    cljs.core.string_hash_cache = {};
    cljs.core.string_hash_cache_count = 0
  }else {
  }
  var h__7054 = cljs.core.string_hash_cache[k];
  if(!(h__7054 == null)) {
    return h__7054
  }else {
    return cljs.core.add_to_string_hash_cache.call(null, k)
  }
};
cljs.core.hash = function() {
  var hash = null;
  var hash__1 = function(o) {
    return hash.call(null, o, true)
  };
  var hash__2 = function(o, check_cache) {
    if(function() {
      var and__3822__auto____7056 = goog.isString(o);
      if(and__3822__auto____7056) {
        return check_cache
      }else {
        return and__3822__auto____7056
      }
    }()) {
      return cljs.core.check_string_hash_cache.call(null, o)
    }else {
      return cljs.core._hash.call(null, o)
    }
  };
  hash = function(o, check_cache) {
    switch(arguments.length) {
      case 1:
        return hash__1.call(this, o);
      case 2:
        return hash__2.call(this, o, check_cache)
    }
    throw"Invalid arity: " + arguments.length;
  };
  hash.cljs$lang$arity$1 = hash__1;
  hash.cljs$lang$arity$2 = hash__2;
  return hash
}();
cljs.core.empty_QMARK_ = function empty_QMARK_(coll) {
  return cljs.core.not.call(null, cljs.core.seq.call(null, coll))
};
cljs.core.coll_QMARK_ = function coll_QMARK_(x) {
  if(x == null) {
    return false
  }else {
    var G__7060__7061 = x;
    if(G__7060__7061) {
      if(function() {
        var or__3824__auto____7062 = G__7060__7061.cljs$lang$protocol_mask$partition0$ & 8;
        if(or__3824__auto____7062) {
          return or__3824__auto____7062
        }else {
          return G__7060__7061.cljs$core$ICollection$
        }
      }()) {
        return true
      }else {
        if(!G__7060__7061.cljs$lang$protocol_mask$partition0$) {
          return cljs.core.type_satisfies_.call(null, cljs.core.ICollection, G__7060__7061)
        }else {
          return false
        }
      }
    }else {
      return cljs.core.type_satisfies_.call(null, cljs.core.ICollection, G__7060__7061)
    }
  }
};
cljs.core.set_QMARK_ = function set_QMARK_(x) {
  if(x == null) {
    return false
  }else {
    var G__7066__7067 = x;
    if(G__7066__7067) {
      if(function() {
        var or__3824__auto____7068 = G__7066__7067.cljs$lang$protocol_mask$partition0$ & 4096;
        if(or__3824__auto____7068) {
          return or__3824__auto____7068
        }else {
          return G__7066__7067.cljs$core$ISet$
        }
      }()) {
        return true
      }else {
        if(!G__7066__7067.cljs$lang$protocol_mask$partition0$) {
          return cljs.core.type_satisfies_.call(null, cljs.core.ISet, G__7066__7067)
        }else {
          return false
        }
      }
    }else {
      return cljs.core.type_satisfies_.call(null, cljs.core.ISet, G__7066__7067)
    }
  }
};
cljs.core.associative_QMARK_ = function associative_QMARK_(x) {
  var G__7072__7073 = x;
  if(G__7072__7073) {
    if(function() {
      var or__3824__auto____7074 = G__7072__7073.cljs$lang$protocol_mask$partition0$ & 512;
      if(or__3824__auto____7074) {
        return or__3824__auto____7074
      }else {
        return G__7072__7073.cljs$core$IAssociative$
      }
    }()) {
      return true
    }else {
      if(!G__7072__7073.cljs$lang$protocol_mask$partition0$) {
        return cljs.core.type_satisfies_.call(null, cljs.core.IAssociative, G__7072__7073)
      }else {
        return false
      }
    }
  }else {
    return cljs.core.type_satisfies_.call(null, cljs.core.IAssociative, G__7072__7073)
  }
};
cljs.core.sequential_QMARK_ = function sequential_QMARK_(x) {
  var G__7078__7079 = x;
  if(G__7078__7079) {
    if(function() {
      var or__3824__auto____7080 = G__7078__7079.cljs$lang$protocol_mask$partition0$ & 16777216;
      if(or__3824__auto____7080) {
        return or__3824__auto____7080
      }else {
        return G__7078__7079.cljs$core$ISequential$
      }
    }()) {
      return true
    }else {
      if(!G__7078__7079.cljs$lang$protocol_mask$partition0$) {
        return cljs.core.type_satisfies_.call(null, cljs.core.ISequential, G__7078__7079)
      }else {
        return false
      }
    }
  }else {
    return cljs.core.type_satisfies_.call(null, cljs.core.ISequential, G__7078__7079)
  }
};
cljs.core.counted_QMARK_ = function counted_QMARK_(x) {
  var G__7084__7085 = x;
  if(G__7084__7085) {
    if(function() {
      var or__3824__auto____7086 = G__7084__7085.cljs$lang$protocol_mask$partition0$ & 2;
      if(or__3824__auto____7086) {
        return or__3824__auto____7086
      }else {
        return G__7084__7085.cljs$core$ICounted$
      }
    }()) {
      return true
    }else {
      if(!G__7084__7085.cljs$lang$protocol_mask$partition0$) {
        return cljs.core.type_satisfies_.call(null, cljs.core.ICounted, G__7084__7085)
      }else {
        return false
      }
    }
  }else {
    return cljs.core.type_satisfies_.call(null, cljs.core.ICounted, G__7084__7085)
  }
};
cljs.core.indexed_QMARK_ = function indexed_QMARK_(x) {
  var G__7090__7091 = x;
  if(G__7090__7091) {
    if(function() {
      var or__3824__auto____7092 = G__7090__7091.cljs$lang$protocol_mask$partition0$ & 16;
      if(or__3824__auto____7092) {
        return or__3824__auto____7092
      }else {
        return G__7090__7091.cljs$core$IIndexed$
      }
    }()) {
      return true
    }else {
      if(!G__7090__7091.cljs$lang$protocol_mask$partition0$) {
        return cljs.core.type_satisfies_.call(null, cljs.core.IIndexed, G__7090__7091)
      }else {
        return false
      }
    }
  }else {
    return cljs.core.type_satisfies_.call(null, cljs.core.IIndexed, G__7090__7091)
  }
};
cljs.core.reduceable_QMARK_ = function reduceable_QMARK_(x) {
  var G__7096__7097 = x;
  if(G__7096__7097) {
    if(function() {
      var or__3824__auto____7098 = G__7096__7097.cljs$lang$protocol_mask$partition0$ & 524288;
      if(or__3824__auto____7098) {
        return or__3824__auto____7098
      }else {
        return G__7096__7097.cljs$core$IReduce$
      }
    }()) {
      return true
    }else {
      if(!G__7096__7097.cljs$lang$protocol_mask$partition0$) {
        return cljs.core.type_satisfies_.call(null, cljs.core.IReduce, G__7096__7097)
      }else {
        return false
      }
    }
  }else {
    return cljs.core.type_satisfies_.call(null, cljs.core.IReduce, G__7096__7097)
  }
};
cljs.core.map_QMARK_ = function map_QMARK_(x) {
  if(x == null) {
    return false
  }else {
    var G__7102__7103 = x;
    if(G__7102__7103) {
      if(function() {
        var or__3824__auto____7104 = G__7102__7103.cljs$lang$protocol_mask$partition0$ & 1024;
        if(or__3824__auto____7104) {
          return or__3824__auto____7104
        }else {
          return G__7102__7103.cljs$core$IMap$
        }
      }()) {
        return true
      }else {
        if(!G__7102__7103.cljs$lang$protocol_mask$partition0$) {
          return cljs.core.type_satisfies_.call(null, cljs.core.IMap, G__7102__7103)
        }else {
          return false
        }
      }
    }else {
      return cljs.core.type_satisfies_.call(null, cljs.core.IMap, G__7102__7103)
    }
  }
};
cljs.core.vector_QMARK_ = function vector_QMARK_(x) {
  var G__7108__7109 = x;
  if(G__7108__7109) {
    if(function() {
      var or__3824__auto____7110 = G__7108__7109.cljs$lang$protocol_mask$partition0$ & 16384;
      if(or__3824__auto____7110) {
        return or__3824__auto____7110
      }else {
        return G__7108__7109.cljs$core$IVector$
      }
    }()) {
      return true
    }else {
      if(!G__7108__7109.cljs$lang$protocol_mask$partition0$) {
        return cljs.core.type_satisfies_.call(null, cljs.core.IVector, G__7108__7109)
      }else {
        return false
      }
    }
  }else {
    return cljs.core.type_satisfies_.call(null, cljs.core.IVector, G__7108__7109)
  }
};
cljs.core.chunked_seq_QMARK_ = function chunked_seq_QMARK_(x) {
  var G__7114__7115 = x;
  if(G__7114__7115) {
    if(cljs.core.truth_(function() {
      var or__3824__auto____7116 = null;
      if(cljs.core.truth_(or__3824__auto____7116)) {
        return or__3824__auto____7116
      }else {
        return G__7114__7115.cljs$core$IChunkedSeq$
      }
    }())) {
      return true
    }else {
      if(!G__7114__7115.cljs$lang$protocol_mask$partition$) {
        return cljs.core.type_satisfies_.call(null, cljs.core.IChunkedSeq, G__7114__7115)
      }else {
        return false
      }
    }
  }else {
    return cljs.core.type_satisfies_.call(null, cljs.core.IChunkedSeq, G__7114__7115)
  }
};
cljs.core.js_obj = function() {
  var js_obj = null;
  var js_obj__0 = function() {
    return{}
  };
  var js_obj__1 = function() {
    var G__7117__delegate = function(keyvals) {
      return cljs.core.apply.call(null, goog.object.create, keyvals)
    };
    var G__7117 = function(var_args) {
      var keyvals = null;
      if(goog.isDef(var_args)) {
        keyvals = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
      }
      return G__7117__delegate.call(this, keyvals)
    };
    G__7117.cljs$lang$maxFixedArity = 0;
    G__7117.cljs$lang$applyTo = function(arglist__7118) {
      var keyvals = cljs.core.seq(arglist__7118);
      return G__7117__delegate(keyvals)
    };
    G__7117.cljs$lang$arity$variadic = G__7117__delegate;
    return G__7117
  }();
  js_obj = function(var_args) {
    var keyvals = var_args;
    switch(arguments.length) {
      case 0:
        return js_obj__0.call(this);
      default:
        return js_obj__1.cljs$lang$arity$variadic(cljs.core.array_seq(arguments, 0))
    }
    throw"Invalid arity: " + arguments.length;
  };
  js_obj.cljs$lang$maxFixedArity = 0;
  js_obj.cljs$lang$applyTo = js_obj__1.cljs$lang$applyTo;
  js_obj.cljs$lang$arity$0 = js_obj__0;
  js_obj.cljs$lang$arity$variadic = js_obj__1.cljs$lang$arity$variadic;
  return js_obj
}();
cljs.core.js_keys = function js_keys(obj) {
  var keys__7120 = [];
  goog.object.forEach(obj, function(val, key, obj) {
    return keys__7120.push(key)
  });
  return keys__7120
};
cljs.core.js_delete = function js_delete(obj, key) {
  return delete obj[key]
};
cljs.core.array_copy = function array_copy(from, i, to, j, len) {
  var i__7124 = i;
  var j__7125 = j;
  var len__7126 = len;
  while(true) {
    if(len__7126 === 0) {
      return to
    }else {
      to[j__7125] = from[i__7124];
      var G__7127 = i__7124 + 1;
      var G__7128 = j__7125 + 1;
      var G__7129 = len__7126 - 1;
      i__7124 = G__7127;
      j__7125 = G__7128;
      len__7126 = G__7129;
      continue
    }
    break
  }
};
cljs.core.array_copy_downward = function array_copy_downward(from, i, to, j, len) {
  var i__7133 = i + (len - 1);
  var j__7134 = j + (len - 1);
  var len__7135 = len;
  while(true) {
    if(len__7135 === 0) {
      return to
    }else {
      to[j__7134] = from[i__7133];
      var G__7136 = i__7133 - 1;
      var G__7137 = j__7134 - 1;
      var G__7138 = len__7135 - 1;
      i__7133 = G__7136;
      j__7134 = G__7137;
      len__7135 = G__7138;
      continue
    }
    break
  }
};
cljs.core.lookup_sentinel = {};
cljs.core.false_QMARK_ = function false_QMARK_(x) {
  return x === false
};
cljs.core.true_QMARK_ = function true_QMARK_(x) {
  return x === true
};
cljs.core.undefined_QMARK_ = function undefined_QMARK_(x) {
  return void 0 === x
};
cljs.core.seq_QMARK_ = function seq_QMARK_(s) {
  if(s == null) {
    return false
  }else {
    var G__7142__7143 = s;
    if(G__7142__7143) {
      if(function() {
        var or__3824__auto____7144 = G__7142__7143.cljs$lang$protocol_mask$partition0$ & 64;
        if(or__3824__auto____7144) {
          return or__3824__auto____7144
        }else {
          return G__7142__7143.cljs$core$ISeq$
        }
      }()) {
        return true
      }else {
        if(!G__7142__7143.cljs$lang$protocol_mask$partition0$) {
          return cljs.core.type_satisfies_.call(null, cljs.core.ISeq, G__7142__7143)
        }else {
          return false
        }
      }
    }else {
      return cljs.core.type_satisfies_.call(null, cljs.core.ISeq, G__7142__7143)
    }
  }
};
cljs.core.seqable_QMARK_ = function seqable_QMARK_(s) {
  var G__7148__7149 = s;
  if(G__7148__7149) {
    if(function() {
      var or__3824__auto____7150 = G__7148__7149.cljs$lang$protocol_mask$partition0$ & 8388608;
      if(or__3824__auto____7150) {
        return or__3824__auto____7150
      }else {
        return G__7148__7149.cljs$core$ISeqable$
      }
    }()) {
      return true
    }else {
      if(!G__7148__7149.cljs$lang$protocol_mask$partition0$) {
        return cljs.core.type_satisfies_.call(null, cljs.core.ISeqable, G__7148__7149)
      }else {
        return false
      }
    }
  }else {
    return cljs.core.type_satisfies_.call(null, cljs.core.ISeqable, G__7148__7149)
  }
};
cljs.core.boolean$ = function boolean$(x) {
  if(cljs.core.truth_(x)) {
    return true
  }else {
    return false
  }
};
cljs.core.string_QMARK_ = function string_QMARK_(x) {
  var and__3822__auto____7153 = goog.isString(x);
  if(and__3822__auto____7153) {
    return!function() {
      var or__3824__auto____7154 = x.charAt(0) === "\ufdd0";
      if(or__3824__auto____7154) {
        return or__3824__auto____7154
      }else {
        return x.charAt(0) === "\ufdd1"
      }
    }()
  }else {
    return and__3822__auto____7153
  }
};
cljs.core.keyword_QMARK_ = function keyword_QMARK_(x) {
  var and__3822__auto____7156 = goog.isString(x);
  if(and__3822__auto____7156) {
    return x.charAt(0) === "\ufdd0"
  }else {
    return and__3822__auto____7156
  }
};
cljs.core.symbol_QMARK_ = function symbol_QMARK_(x) {
  var and__3822__auto____7158 = goog.isString(x);
  if(and__3822__auto____7158) {
    return x.charAt(0) === "\ufdd1"
  }else {
    return and__3822__auto____7158
  }
};
cljs.core.number_QMARK_ = function number_QMARK_(n) {
  return goog.isNumber(n)
};
cljs.core.fn_QMARK_ = function fn_QMARK_(f) {
  return goog.isFunction(f)
};
cljs.core.ifn_QMARK_ = function ifn_QMARK_(f) {
  var or__3824__auto____7163 = cljs.core.fn_QMARK_.call(null, f);
  if(or__3824__auto____7163) {
    return or__3824__auto____7163
  }else {
    var G__7164__7165 = f;
    if(G__7164__7165) {
      if(function() {
        var or__3824__auto____7166 = G__7164__7165.cljs$lang$protocol_mask$partition0$ & 1;
        if(or__3824__auto____7166) {
          return or__3824__auto____7166
        }else {
          return G__7164__7165.cljs$core$IFn$
        }
      }()) {
        return true
      }else {
        if(!G__7164__7165.cljs$lang$protocol_mask$partition0$) {
          return cljs.core.type_satisfies_.call(null, cljs.core.IFn, G__7164__7165)
        }else {
          return false
        }
      }
    }else {
      return cljs.core.type_satisfies_.call(null, cljs.core.IFn, G__7164__7165)
    }
  }
};
cljs.core.integer_QMARK_ = function integer_QMARK_(n) {
  var and__3822__auto____7168 = cljs.core.number_QMARK_.call(null, n);
  if(and__3822__auto____7168) {
    return n == n.toFixed()
  }else {
    return and__3822__auto____7168
  }
};
cljs.core.contains_QMARK_ = function contains_QMARK_(coll, v) {
  if(cljs.core._lookup.call(null, coll, v, cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel) {
    return false
  }else {
    return true
  }
};
cljs.core.find = function find(coll, k) {
  if(cljs.core.truth_(function() {
    var and__3822__auto____7171 = coll;
    if(cljs.core.truth_(and__3822__auto____7171)) {
      var and__3822__auto____7172 = cljs.core.associative_QMARK_.call(null, coll);
      if(and__3822__auto____7172) {
        return cljs.core.contains_QMARK_.call(null, coll, k)
      }else {
        return and__3822__auto____7172
      }
    }else {
      return and__3822__auto____7171
    }
  }())) {
    return cljs.core.PersistentVector.fromArray([k, cljs.core._lookup.call(null, coll, k)], true)
  }else {
    return null
  }
};
cljs.core.distinct_QMARK_ = function() {
  var distinct_QMARK_ = null;
  var distinct_QMARK___1 = function(x) {
    return true
  };
  var distinct_QMARK___2 = function(x, y) {
    return!cljs.core._EQ_.call(null, x, y)
  };
  var distinct_QMARK___3 = function() {
    var G__7181__delegate = function(x, y, more) {
      if(!cljs.core._EQ_.call(null, x, y)) {
        var s__7177 = cljs.core.PersistentHashSet.fromArray([y, x]);
        var xs__7178 = more;
        while(true) {
          var x__7179 = cljs.core.first.call(null, xs__7178);
          var etc__7180 = cljs.core.next.call(null, xs__7178);
          if(cljs.core.truth_(xs__7178)) {
            if(cljs.core.contains_QMARK_.call(null, s__7177, x__7179)) {
              return false
            }else {
              var G__7182 = cljs.core.conj.call(null, s__7177, x__7179);
              var G__7183 = etc__7180;
              s__7177 = G__7182;
              xs__7178 = G__7183;
              continue
            }
          }else {
            return true
          }
          break
        }
      }else {
        return false
      }
    };
    var G__7181 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__7181__delegate.call(this, x, y, more)
    };
    G__7181.cljs$lang$maxFixedArity = 2;
    G__7181.cljs$lang$applyTo = function(arglist__7184) {
      var x = cljs.core.first(arglist__7184);
      var y = cljs.core.first(cljs.core.next(arglist__7184));
      var more = cljs.core.rest(cljs.core.next(arglist__7184));
      return G__7181__delegate(x, y, more)
    };
    G__7181.cljs$lang$arity$variadic = G__7181__delegate;
    return G__7181
  }();
  distinct_QMARK_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return distinct_QMARK___1.call(this, x);
      case 2:
        return distinct_QMARK___2.call(this, x, y);
      default:
        return distinct_QMARK___3.cljs$lang$arity$variadic(x, y, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  distinct_QMARK_.cljs$lang$maxFixedArity = 2;
  distinct_QMARK_.cljs$lang$applyTo = distinct_QMARK___3.cljs$lang$applyTo;
  distinct_QMARK_.cljs$lang$arity$1 = distinct_QMARK___1;
  distinct_QMARK_.cljs$lang$arity$2 = distinct_QMARK___2;
  distinct_QMARK_.cljs$lang$arity$variadic = distinct_QMARK___3.cljs$lang$arity$variadic;
  return distinct_QMARK_
}();
cljs.core.compare = function compare(x, y) {
  if(x === y) {
    return 0
  }else {
    if(x == null) {
      return-1
    }else {
      if(y == null) {
        return 1
      }else {
        if(cljs.core.type.call(null, x) === cljs.core.type.call(null, y)) {
          if(function() {
            var G__7188__7189 = x;
            if(G__7188__7189) {
              if(cljs.core.truth_(function() {
                var or__3824__auto____7190 = null;
                if(cljs.core.truth_(or__3824__auto____7190)) {
                  return or__3824__auto____7190
                }else {
                  return G__7188__7189.cljs$core$IComparable$
                }
              }())) {
                return true
              }else {
                if(!G__7188__7189.cljs$lang$protocol_mask$partition$) {
                  return cljs.core.type_satisfies_.call(null, cljs.core.IComparable, G__7188__7189)
                }else {
                  return false
                }
              }
            }else {
              return cljs.core.type_satisfies_.call(null, cljs.core.IComparable, G__7188__7189)
            }
          }()) {
            return cljs.core._compare.call(null, x, y)
          }else {
            return goog.array.defaultCompare(x, y)
          }
        }else {
          if("\ufdd0'else") {
            throw new Error("compare on non-nil objects of different types");
          }else {
            return null
          }
        }
      }
    }
  }
};
cljs.core.compare_indexed = function() {
  var compare_indexed = null;
  var compare_indexed__2 = function(xs, ys) {
    var xl__7195 = cljs.core.count.call(null, xs);
    var yl__7196 = cljs.core.count.call(null, ys);
    if(xl__7195 < yl__7196) {
      return-1
    }else {
      if(xl__7195 > yl__7196) {
        return 1
      }else {
        if("\ufdd0'else") {
          return compare_indexed.call(null, xs, ys, xl__7195, 0)
        }else {
          return null
        }
      }
    }
  };
  var compare_indexed__4 = function(xs, ys, len, n) {
    while(true) {
      var d__7197 = cljs.core.compare.call(null, cljs.core.nth.call(null, xs, n), cljs.core.nth.call(null, ys, n));
      if(function() {
        var and__3822__auto____7198 = d__7197 === 0;
        if(and__3822__auto____7198) {
          return n + 1 < len
        }else {
          return and__3822__auto____7198
        }
      }()) {
        var G__7199 = xs;
        var G__7200 = ys;
        var G__7201 = len;
        var G__7202 = n + 1;
        xs = G__7199;
        ys = G__7200;
        len = G__7201;
        n = G__7202;
        continue
      }else {
        return d__7197
      }
      break
    }
  };
  compare_indexed = function(xs, ys, len, n) {
    switch(arguments.length) {
      case 2:
        return compare_indexed__2.call(this, xs, ys);
      case 4:
        return compare_indexed__4.call(this, xs, ys, len, n)
    }
    throw"Invalid arity: " + arguments.length;
  };
  compare_indexed.cljs$lang$arity$2 = compare_indexed__2;
  compare_indexed.cljs$lang$arity$4 = compare_indexed__4;
  return compare_indexed
}();
cljs.core.fn__GT_comparator = function fn__GT_comparator(f) {
  if(cljs.core._EQ_.call(null, f, cljs.core.compare)) {
    return cljs.core.compare
  }else {
    return function(x, y) {
      var r__7204 = f.call(null, x, y);
      if(cljs.core.number_QMARK_.call(null, r__7204)) {
        return r__7204
      }else {
        if(cljs.core.truth_(r__7204)) {
          return-1
        }else {
          if(cljs.core.truth_(f.call(null, y, x))) {
            return 1
          }else {
            return 0
          }
        }
      }
    }
  }
};
cljs.core.sort = function() {
  var sort = null;
  var sort__1 = function(coll) {
    return sort.call(null, cljs.core.compare, coll)
  };
  var sort__2 = function(comp, coll) {
    if(cljs.core.seq.call(null, coll)) {
      var a__7206 = cljs.core.to_array.call(null, coll);
      goog.array.stableSort(a__7206, cljs.core.fn__GT_comparator.call(null, comp));
      return cljs.core.seq.call(null, a__7206)
    }else {
      return cljs.core.List.EMPTY
    }
  };
  sort = function(comp, coll) {
    switch(arguments.length) {
      case 1:
        return sort__1.call(this, comp);
      case 2:
        return sort__2.call(this, comp, coll)
    }
    throw"Invalid arity: " + arguments.length;
  };
  sort.cljs$lang$arity$1 = sort__1;
  sort.cljs$lang$arity$2 = sort__2;
  return sort
}();
cljs.core.sort_by = function() {
  var sort_by = null;
  var sort_by__2 = function(keyfn, coll) {
    return sort_by.call(null, keyfn, cljs.core.compare, coll)
  };
  var sort_by__3 = function(keyfn, comp, coll) {
    return cljs.core.sort.call(null, function(x, y) {
      return cljs.core.fn__GT_comparator.call(null, comp).call(null, keyfn.call(null, x), keyfn.call(null, y))
    }, coll)
  };
  sort_by = function(keyfn, comp, coll) {
    switch(arguments.length) {
      case 2:
        return sort_by__2.call(this, keyfn, comp);
      case 3:
        return sort_by__3.call(this, keyfn, comp, coll)
    }
    throw"Invalid arity: " + arguments.length;
  };
  sort_by.cljs$lang$arity$2 = sort_by__2;
  sort_by.cljs$lang$arity$3 = sort_by__3;
  return sort_by
}();
cljs.core.seq_reduce = function() {
  var seq_reduce = null;
  var seq_reduce__2 = function(f, coll) {
    var temp__3971__auto____7212 = cljs.core.seq.call(null, coll);
    if(temp__3971__auto____7212) {
      var s__7213 = temp__3971__auto____7212;
      return cljs.core.reduce.call(null, f, cljs.core.first.call(null, s__7213), cljs.core.next.call(null, s__7213))
    }else {
      return f.call(null)
    }
  };
  var seq_reduce__3 = function(f, val, coll) {
    var val__7214 = val;
    var coll__7215 = cljs.core.seq.call(null, coll);
    while(true) {
      if(coll__7215) {
        var nval__7216 = f.call(null, val__7214, cljs.core.first.call(null, coll__7215));
        if(cljs.core.reduced_QMARK_.call(null, nval__7216)) {
          return cljs.core.deref.call(null, nval__7216)
        }else {
          var G__7217 = nval__7216;
          var G__7218 = cljs.core.next.call(null, coll__7215);
          val__7214 = G__7217;
          coll__7215 = G__7218;
          continue
        }
      }else {
        return val__7214
      }
      break
    }
  };
  seq_reduce = function(f, val, coll) {
    switch(arguments.length) {
      case 2:
        return seq_reduce__2.call(this, f, val);
      case 3:
        return seq_reduce__3.call(this, f, val, coll)
    }
    throw"Invalid arity: " + arguments.length;
  };
  seq_reduce.cljs$lang$arity$2 = seq_reduce__2;
  seq_reduce.cljs$lang$arity$3 = seq_reduce__3;
  return seq_reduce
}();
cljs.core.shuffle = function shuffle(coll) {
  var a__7220 = cljs.core.to_array.call(null, coll);
  goog.array.shuffle(a__7220);
  return cljs.core.vec.call(null, a__7220)
};
cljs.core.reduce = function() {
  var reduce = null;
  var reduce__2 = function(f, coll) {
    if(function() {
      var G__7227__7228 = coll;
      if(G__7227__7228) {
        if(function() {
          var or__3824__auto____7229 = G__7227__7228.cljs$lang$protocol_mask$partition0$ & 524288;
          if(or__3824__auto____7229) {
            return or__3824__auto____7229
          }else {
            return G__7227__7228.cljs$core$IReduce$
          }
        }()) {
          return true
        }else {
          if(!G__7227__7228.cljs$lang$protocol_mask$partition0$) {
            return cljs.core.type_satisfies_.call(null, cljs.core.IReduce, G__7227__7228)
          }else {
            return false
          }
        }
      }else {
        return cljs.core.type_satisfies_.call(null, cljs.core.IReduce, G__7227__7228)
      }
    }()) {
      return cljs.core._reduce.call(null, coll, f)
    }else {
      return cljs.core.seq_reduce.call(null, f, coll)
    }
  };
  var reduce__3 = function(f, val, coll) {
    if(function() {
      var G__7230__7231 = coll;
      if(G__7230__7231) {
        if(function() {
          var or__3824__auto____7232 = G__7230__7231.cljs$lang$protocol_mask$partition0$ & 524288;
          if(or__3824__auto____7232) {
            return or__3824__auto____7232
          }else {
            return G__7230__7231.cljs$core$IReduce$
          }
        }()) {
          return true
        }else {
          if(!G__7230__7231.cljs$lang$protocol_mask$partition0$) {
            return cljs.core.type_satisfies_.call(null, cljs.core.IReduce, G__7230__7231)
          }else {
            return false
          }
        }
      }else {
        return cljs.core.type_satisfies_.call(null, cljs.core.IReduce, G__7230__7231)
      }
    }()) {
      return cljs.core._reduce.call(null, coll, f, val)
    }else {
      return cljs.core.seq_reduce.call(null, f, val, coll)
    }
  };
  reduce = function(f, val, coll) {
    switch(arguments.length) {
      case 2:
        return reduce__2.call(this, f, val);
      case 3:
        return reduce__3.call(this, f, val, coll)
    }
    throw"Invalid arity: " + arguments.length;
  };
  reduce.cljs$lang$arity$2 = reduce__2;
  reduce.cljs$lang$arity$3 = reduce__3;
  return reduce
}();
cljs.core.reduce_kv = function reduce_kv(f, init, coll) {
  return cljs.core._kv_reduce.call(null, coll, f, init)
};
cljs.core.Reduced = function(val) {
  this.val = val;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 32768
};
cljs.core.Reduced.cljs$lang$type = true;
cljs.core.Reduced.cljs$lang$ctorPrSeq = function(this__2315__auto__) {
  return cljs.core.list.call(null, "cljs.core/Reduced")
};
cljs.core.Reduced.prototype.cljs$core$IDeref$_deref$arity$1 = function(o) {
  var this__7233 = this;
  return this__7233.val
};
cljs.core.Reduced;
cljs.core.reduced_QMARK_ = function reduced_QMARK_(r) {
  return cljs.core.instance_QMARK_.call(null, cljs.core.Reduced, r)
};
cljs.core.reduced = function reduced(x) {
  return new cljs.core.Reduced(x)
};
cljs.core._PLUS_ = function() {
  var _PLUS_ = null;
  var _PLUS___0 = function() {
    return 0
  };
  var _PLUS___1 = function(x) {
    return x
  };
  var _PLUS___2 = function(x, y) {
    return x + y
  };
  var _PLUS___3 = function() {
    var G__7234__delegate = function(x, y, more) {
      return cljs.core.reduce.call(null, _PLUS_, x + y, more)
    };
    var G__7234 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__7234__delegate.call(this, x, y, more)
    };
    G__7234.cljs$lang$maxFixedArity = 2;
    G__7234.cljs$lang$applyTo = function(arglist__7235) {
      var x = cljs.core.first(arglist__7235);
      var y = cljs.core.first(cljs.core.next(arglist__7235));
      var more = cljs.core.rest(cljs.core.next(arglist__7235));
      return G__7234__delegate(x, y, more)
    };
    G__7234.cljs$lang$arity$variadic = G__7234__delegate;
    return G__7234
  }();
  _PLUS_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 0:
        return _PLUS___0.call(this);
      case 1:
        return _PLUS___1.call(this, x);
      case 2:
        return _PLUS___2.call(this, x, y);
      default:
        return _PLUS___3.cljs$lang$arity$variadic(x, y, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  _PLUS_.cljs$lang$maxFixedArity = 2;
  _PLUS_.cljs$lang$applyTo = _PLUS___3.cljs$lang$applyTo;
  _PLUS_.cljs$lang$arity$0 = _PLUS___0;
  _PLUS_.cljs$lang$arity$1 = _PLUS___1;
  _PLUS_.cljs$lang$arity$2 = _PLUS___2;
  _PLUS_.cljs$lang$arity$variadic = _PLUS___3.cljs$lang$arity$variadic;
  return _PLUS_
}();
cljs.core._ = function() {
  var _ = null;
  var ___1 = function(x) {
    return-x
  };
  var ___2 = function(x, y) {
    return x - y
  };
  var ___3 = function() {
    var G__7236__delegate = function(x, y, more) {
      return cljs.core.reduce.call(null, _, x - y, more)
    };
    var G__7236 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__7236__delegate.call(this, x, y, more)
    };
    G__7236.cljs$lang$maxFixedArity = 2;
    G__7236.cljs$lang$applyTo = function(arglist__7237) {
      var x = cljs.core.first(arglist__7237);
      var y = cljs.core.first(cljs.core.next(arglist__7237));
      var more = cljs.core.rest(cljs.core.next(arglist__7237));
      return G__7236__delegate(x, y, more)
    };
    G__7236.cljs$lang$arity$variadic = G__7236__delegate;
    return G__7236
  }();
  _ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return ___1.call(this, x);
      case 2:
        return ___2.call(this, x, y);
      default:
        return ___3.cljs$lang$arity$variadic(x, y, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  _.cljs$lang$maxFixedArity = 2;
  _.cljs$lang$applyTo = ___3.cljs$lang$applyTo;
  _.cljs$lang$arity$1 = ___1;
  _.cljs$lang$arity$2 = ___2;
  _.cljs$lang$arity$variadic = ___3.cljs$lang$arity$variadic;
  return _
}();
cljs.core._STAR_ = function() {
  var _STAR_ = null;
  var _STAR___0 = function() {
    return 1
  };
  var _STAR___1 = function(x) {
    return x
  };
  var _STAR___2 = function(x, y) {
    return x * y
  };
  var _STAR___3 = function() {
    var G__7238__delegate = function(x, y, more) {
      return cljs.core.reduce.call(null, _STAR_, x * y, more)
    };
    var G__7238 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__7238__delegate.call(this, x, y, more)
    };
    G__7238.cljs$lang$maxFixedArity = 2;
    G__7238.cljs$lang$applyTo = function(arglist__7239) {
      var x = cljs.core.first(arglist__7239);
      var y = cljs.core.first(cljs.core.next(arglist__7239));
      var more = cljs.core.rest(cljs.core.next(arglist__7239));
      return G__7238__delegate(x, y, more)
    };
    G__7238.cljs$lang$arity$variadic = G__7238__delegate;
    return G__7238
  }();
  _STAR_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 0:
        return _STAR___0.call(this);
      case 1:
        return _STAR___1.call(this, x);
      case 2:
        return _STAR___2.call(this, x, y);
      default:
        return _STAR___3.cljs$lang$arity$variadic(x, y, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  _STAR_.cljs$lang$maxFixedArity = 2;
  _STAR_.cljs$lang$applyTo = _STAR___3.cljs$lang$applyTo;
  _STAR_.cljs$lang$arity$0 = _STAR___0;
  _STAR_.cljs$lang$arity$1 = _STAR___1;
  _STAR_.cljs$lang$arity$2 = _STAR___2;
  _STAR_.cljs$lang$arity$variadic = _STAR___3.cljs$lang$arity$variadic;
  return _STAR_
}();
cljs.core._SLASH_ = function() {
  var _SLASH_ = null;
  var _SLASH___1 = function(x) {
    return _SLASH_.call(null, 1, x)
  };
  var _SLASH___2 = function(x, y) {
    return x / y
  };
  var _SLASH___3 = function() {
    var G__7240__delegate = function(x, y, more) {
      return cljs.core.reduce.call(null, _SLASH_, _SLASH_.call(null, x, y), more)
    };
    var G__7240 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__7240__delegate.call(this, x, y, more)
    };
    G__7240.cljs$lang$maxFixedArity = 2;
    G__7240.cljs$lang$applyTo = function(arglist__7241) {
      var x = cljs.core.first(arglist__7241);
      var y = cljs.core.first(cljs.core.next(arglist__7241));
      var more = cljs.core.rest(cljs.core.next(arglist__7241));
      return G__7240__delegate(x, y, more)
    };
    G__7240.cljs$lang$arity$variadic = G__7240__delegate;
    return G__7240
  }();
  _SLASH_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return _SLASH___1.call(this, x);
      case 2:
        return _SLASH___2.call(this, x, y);
      default:
        return _SLASH___3.cljs$lang$arity$variadic(x, y, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  _SLASH_.cljs$lang$maxFixedArity = 2;
  _SLASH_.cljs$lang$applyTo = _SLASH___3.cljs$lang$applyTo;
  _SLASH_.cljs$lang$arity$1 = _SLASH___1;
  _SLASH_.cljs$lang$arity$2 = _SLASH___2;
  _SLASH_.cljs$lang$arity$variadic = _SLASH___3.cljs$lang$arity$variadic;
  return _SLASH_
}();
cljs.core._LT_ = function() {
  var _LT_ = null;
  var _LT___1 = function(x) {
    return true
  };
  var _LT___2 = function(x, y) {
    return x < y
  };
  var _LT___3 = function() {
    var G__7242__delegate = function(x, y, more) {
      while(true) {
        if(x < y) {
          if(cljs.core.next.call(null, more)) {
            var G__7243 = y;
            var G__7244 = cljs.core.first.call(null, more);
            var G__7245 = cljs.core.next.call(null, more);
            x = G__7243;
            y = G__7244;
            more = G__7245;
            continue
          }else {
            return y < cljs.core.first.call(null, more)
          }
        }else {
          return false
        }
        break
      }
    };
    var G__7242 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__7242__delegate.call(this, x, y, more)
    };
    G__7242.cljs$lang$maxFixedArity = 2;
    G__7242.cljs$lang$applyTo = function(arglist__7246) {
      var x = cljs.core.first(arglist__7246);
      var y = cljs.core.first(cljs.core.next(arglist__7246));
      var more = cljs.core.rest(cljs.core.next(arglist__7246));
      return G__7242__delegate(x, y, more)
    };
    G__7242.cljs$lang$arity$variadic = G__7242__delegate;
    return G__7242
  }();
  _LT_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return _LT___1.call(this, x);
      case 2:
        return _LT___2.call(this, x, y);
      default:
        return _LT___3.cljs$lang$arity$variadic(x, y, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  _LT_.cljs$lang$maxFixedArity = 2;
  _LT_.cljs$lang$applyTo = _LT___3.cljs$lang$applyTo;
  _LT_.cljs$lang$arity$1 = _LT___1;
  _LT_.cljs$lang$arity$2 = _LT___2;
  _LT_.cljs$lang$arity$variadic = _LT___3.cljs$lang$arity$variadic;
  return _LT_
}();
cljs.core._LT__EQ_ = function() {
  var _LT__EQ_ = null;
  var _LT__EQ___1 = function(x) {
    return true
  };
  var _LT__EQ___2 = function(x, y) {
    return x <= y
  };
  var _LT__EQ___3 = function() {
    var G__7247__delegate = function(x, y, more) {
      while(true) {
        if(x <= y) {
          if(cljs.core.next.call(null, more)) {
            var G__7248 = y;
            var G__7249 = cljs.core.first.call(null, more);
            var G__7250 = cljs.core.next.call(null, more);
            x = G__7248;
            y = G__7249;
            more = G__7250;
            continue
          }else {
            return y <= cljs.core.first.call(null, more)
          }
        }else {
          return false
        }
        break
      }
    };
    var G__7247 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__7247__delegate.call(this, x, y, more)
    };
    G__7247.cljs$lang$maxFixedArity = 2;
    G__7247.cljs$lang$applyTo = function(arglist__7251) {
      var x = cljs.core.first(arglist__7251);
      var y = cljs.core.first(cljs.core.next(arglist__7251));
      var more = cljs.core.rest(cljs.core.next(arglist__7251));
      return G__7247__delegate(x, y, more)
    };
    G__7247.cljs$lang$arity$variadic = G__7247__delegate;
    return G__7247
  }();
  _LT__EQ_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return _LT__EQ___1.call(this, x);
      case 2:
        return _LT__EQ___2.call(this, x, y);
      default:
        return _LT__EQ___3.cljs$lang$arity$variadic(x, y, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  _LT__EQ_.cljs$lang$maxFixedArity = 2;
  _LT__EQ_.cljs$lang$applyTo = _LT__EQ___3.cljs$lang$applyTo;
  _LT__EQ_.cljs$lang$arity$1 = _LT__EQ___1;
  _LT__EQ_.cljs$lang$arity$2 = _LT__EQ___2;
  _LT__EQ_.cljs$lang$arity$variadic = _LT__EQ___3.cljs$lang$arity$variadic;
  return _LT__EQ_
}();
cljs.core._GT_ = function() {
  var _GT_ = null;
  var _GT___1 = function(x) {
    return true
  };
  var _GT___2 = function(x, y) {
    return x > y
  };
  var _GT___3 = function() {
    var G__7252__delegate = function(x, y, more) {
      while(true) {
        if(x > y) {
          if(cljs.core.next.call(null, more)) {
            var G__7253 = y;
            var G__7254 = cljs.core.first.call(null, more);
            var G__7255 = cljs.core.next.call(null, more);
            x = G__7253;
            y = G__7254;
            more = G__7255;
            continue
          }else {
            return y > cljs.core.first.call(null, more)
          }
        }else {
          return false
        }
        break
      }
    };
    var G__7252 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__7252__delegate.call(this, x, y, more)
    };
    G__7252.cljs$lang$maxFixedArity = 2;
    G__7252.cljs$lang$applyTo = function(arglist__7256) {
      var x = cljs.core.first(arglist__7256);
      var y = cljs.core.first(cljs.core.next(arglist__7256));
      var more = cljs.core.rest(cljs.core.next(arglist__7256));
      return G__7252__delegate(x, y, more)
    };
    G__7252.cljs$lang$arity$variadic = G__7252__delegate;
    return G__7252
  }();
  _GT_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return _GT___1.call(this, x);
      case 2:
        return _GT___2.call(this, x, y);
      default:
        return _GT___3.cljs$lang$arity$variadic(x, y, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  _GT_.cljs$lang$maxFixedArity = 2;
  _GT_.cljs$lang$applyTo = _GT___3.cljs$lang$applyTo;
  _GT_.cljs$lang$arity$1 = _GT___1;
  _GT_.cljs$lang$arity$2 = _GT___2;
  _GT_.cljs$lang$arity$variadic = _GT___3.cljs$lang$arity$variadic;
  return _GT_
}();
cljs.core._GT__EQ_ = function() {
  var _GT__EQ_ = null;
  var _GT__EQ___1 = function(x) {
    return true
  };
  var _GT__EQ___2 = function(x, y) {
    return x >= y
  };
  var _GT__EQ___3 = function() {
    var G__7257__delegate = function(x, y, more) {
      while(true) {
        if(x >= y) {
          if(cljs.core.next.call(null, more)) {
            var G__7258 = y;
            var G__7259 = cljs.core.first.call(null, more);
            var G__7260 = cljs.core.next.call(null, more);
            x = G__7258;
            y = G__7259;
            more = G__7260;
            continue
          }else {
            return y >= cljs.core.first.call(null, more)
          }
        }else {
          return false
        }
        break
      }
    };
    var G__7257 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__7257__delegate.call(this, x, y, more)
    };
    G__7257.cljs$lang$maxFixedArity = 2;
    G__7257.cljs$lang$applyTo = function(arglist__7261) {
      var x = cljs.core.first(arglist__7261);
      var y = cljs.core.first(cljs.core.next(arglist__7261));
      var more = cljs.core.rest(cljs.core.next(arglist__7261));
      return G__7257__delegate(x, y, more)
    };
    G__7257.cljs$lang$arity$variadic = G__7257__delegate;
    return G__7257
  }();
  _GT__EQ_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return _GT__EQ___1.call(this, x);
      case 2:
        return _GT__EQ___2.call(this, x, y);
      default:
        return _GT__EQ___3.cljs$lang$arity$variadic(x, y, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  _GT__EQ_.cljs$lang$maxFixedArity = 2;
  _GT__EQ_.cljs$lang$applyTo = _GT__EQ___3.cljs$lang$applyTo;
  _GT__EQ_.cljs$lang$arity$1 = _GT__EQ___1;
  _GT__EQ_.cljs$lang$arity$2 = _GT__EQ___2;
  _GT__EQ_.cljs$lang$arity$variadic = _GT__EQ___3.cljs$lang$arity$variadic;
  return _GT__EQ_
}();
cljs.core.dec = function dec(x) {
  return x - 1
};
cljs.core.max = function() {
  var max = null;
  var max__1 = function(x) {
    return x
  };
  var max__2 = function(x, y) {
    return x > y ? x : y
  };
  var max__3 = function() {
    var G__7262__delegate = function(x, y, more) {
      return cljs.core.reduce.call(null, max, x > y ? x : y, more)
    };
    var G__7262 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__7262__delegate.call(this, x, y, more)
    };
    G__7262.cljs$lang$maxFixedArity = 2;
    G__7262.cljs$lang$applyTo = function(arglist__7263) {
      var x = cljs.core.first(arglist__7263);
      var y = cljs.core.first(cljs.core.next(arglist__7263));
      var more = cljs.core.rest(cljs.core.next(arglist__7263));
      return G__7262__delegate(x, y, more)
    };
    G__7262.cljs$lang$arity$variadic = G__7262__delegate;
    return G__7262
  }();
  max = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return max__1.call(this, x);
      case 2:
        return max__2.call(this, x, y);
      default:
        return max__3.cljs$lang$arity$variadic(x, y, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  max.cljs$lang$maxFixedArity = 2;
  max.cljs$lang$applyTo = max__3.cljs$lang$applyTo;
  max.cljs$lang$arity$1 = max__1;
  max.cljs$lang$arity$2 = max__2;
  max.cljs$lang$arity$variadic = max__3.cljs$lang$arity$variadic;
  return max
}();
cljs.core.min = function() {
  var min = null;
  var min__1 = function(x) {
    return x
  };
  var min__2 = function(x, y) {
    return x < y ? x : y
  };
  var min__3 = function() {
    var G__7264__delegate = function(x, y, more) {
      return cljs.core.reduce.call(null, min, x < y ? x : y, more)
    };
    var G__7264 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__7264__delegate.call(this, x, y, more)
    };
    G__7264.cljs$lang$maxFixedArity = 2;
    G__7264.cljs$lang$applyTo = function(arglist__7265) {
      var x = cljs.core.first(arglist__7265);
      var y = cljs.core.first(cljs.core.next(arglist__7265));
      var more = cljs.core.rest(cljs.core.next(arglist__7265));
      return G__7264__delegate(x, y, more)
    };
    G__7264.cljs$lang$arity$variadic = G__7264__delegate;
    return G__7264
  }();
  min = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return min__1.call(this, x);
      case 2:
        return min__2.call(this, x, y);
      default:
        return min__3.cljs$lang$arity$variadic(x, y, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  min.cljs$lang$maxFixedArity = 2;
  min.cljs$lang$applyTo = min__3.cljs$lang$applyTo;
  min.cljs$lang$arity$1 = min__1;
  min.cljs$lang$arity$2 = min__2;
  min.cljs$lang$arity$variadic = min__3.cljs$lang$arity$variadic;
  return min
}();
cljs.core.fix = function fix(q) {
  if(q >= 0) {
    return Math.floor.call(null, q)
  }else {
    return Math.ceil.call(null, q)
  }
};
cljs.core.int$ = function int$(x) {
  return cljs.core.fix.call(null, x)
};
cljs.core.long$ = function long$(x) {
  return cljs.core.fix.call(null, x)
};
cljs.core.mod = function mod(n, d) {
  return n % d
};
cljs.core.quot = function quot(n, d) {
  var rem__7267 = n % d;
  return cljs.core.fix.call(null, (n - rem__7267) / d)
};
cljs.core.rem = function rem(n, d) {
  var q__7269 = cljs.core.quot.call(null, n, d);
  return n - d * q__7269
};
cljs.core.rand = function() {
  var rand = null;
  var rand__0 = function() {
    return Math.random.call(null)
  };
  var rand__1 = function(n) {
    return n * rand.call(null)
  };
  rand = function(n) {
    switch(arguments.length) {
      case 0:
        return rand__0.call(this);
      case 1:
        return rand__1.call(this, n)
    }
    throw"Invalid arity: " + arguments.length;
  };
  rand.cljs$lang$arity$0 = rand__0;
  rand.cljs$lang$arity$1 = rand__1;
  return rand
}();
cljs.core.rand_int = function rand_int(n) {
  return cljs.core.fix.call(null, cljs.core.rand.call(null, n))
};
cljs.core.bit_xor = function bit_xor(x, y) {
  return x ^ y
};
cljs.core.bit_and = function bit_and(x, y) {
  return x & y
};
cljs.core.bit_or = function bit_or(x, y) {
  return x | y
};
cljs.core.bit_and_not = function bit_and_not(x, y) {
  return x & ~y
};
cljs.core.bit_clear = function bit_clear(x, n) {
  return x & ~(1 << n)
};
cljs.core.bit_flip = function bit_flip(x, n) {
  return x ^ 1 << n
};
cljs.core.bit_not = function bit_not(x) {
  return~x
};
cljs.core.bit_set = function bit_set(x, n) {
  return x | 1 << n
};
cljs.core.bit_test = function bit_test(x, n) {
  return(x & 1 << n) != 0
};
cljs.core.bit_shift_left = function bit_shift_left(x, n) {
  return x << n
};
cljs.core.bit_shift_right = function bit_shift_right(x, n) {
  return x >> n
};
cljs.core.bit_shift_right_zero_fill = function bit_shift_right_zero_fill(x, n) {
  return x >>> n
};
cljs.core.bit_count = function bit_count(v) {
  var v__7272 = v - (v >> 1 & 1431655765);
  var v__7273 = (v__7272 & 858993459) + (v__7272 >> 2 & 858993459);
  return(v__7273 + (v__7273 >> 4) & 252645135) * 16843009 >> 24
};
cljs.core._EQ__EQ_ = function() {
  var _EQ__EQ_ = null;
  var _EQ__EQ___1 = function(x) {
    return true
  };
  var _EQ__EQ___2 = function(x, y) {
    return cljs.core._equiv.call(null, x, y)
  };
  var _EQ__EQ___3 = function() {
    var G__7274__delegate = function(x, y, more) {
      while(true) {
        if(cljs.core.truth_(_EQ__EQ_.call(null, x, y))) {
          if(cljs.core.next.call(null, more)) {
            var G__7275 = y;
            var G__7276 = cljs.core.first.call(null, more);
            var G__7277 = cljs.core.next.call(null, more);
            x = G__7275;
            y = G__7276;
            more = G__7277;
            continue
          }else {
            return _EQ__EQ_.call(null, y, cljs.core.first.call(null, more))
          }
        }else {
          return false
        }
        break
      }
    };
    var G__7274 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__7274__delegate.call(this, x, y, more)
    };
    G__7274.cljs$lang$maxFixedArity = 2;
    G__7274.cljs$lang$applyTo = function(arglist__7278) {
      var x = cljs.core.first(arglist__7278);
      var y = cljs.core.first(cljs.core.next(arglist__7278));
      var more = cljs.core.rest(cljs.core.next(arglist__7278));
      return G__7274__delegate(x, y, more)
    };
    G__7274.cljs$lang$arity$variadic = G__7274__delegate;
    return G__7274
  }();
  _EQ__EQ_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return _EQ__EQ___1.call(this, x);
      case 2:
        return _EQ__EQ___2.call(this, x, y);
      default:
        return _EQ__EQ___3.cljs$lang$arity$variadic(x, y, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  _EQ__EQ_.cljs$lang$maxFixedArity = 2;
  _EQ__EQ_.cljs$lang$applyTo = _EQ__EQ___3.cljs$lang$applyTo;
  _EQ__EQ_.cljs$lang$arity$1 = _EQ__EQ___1;
  _EQ__EQ_.cljs$lang$arity$2 = _EQ__EQ___2;
  _EQ__EQ_.cljs$lang$arity$variadic = _EQ__EQ___3.cljs$lang$arity$variadic;
  return _EQ__EQ_
}();
cljs.core.pos_QMARK_ = function pos_QMARK_(n) {
  return n > 0
};
cljs.core.zero_QMARK_ = function zero_QMARK_(n) {
  return n === 0
};
cljs.core.neg_QMARK_ = function neg_QMARK_(x) {
  return x < 0
};
cljs.core.nthnext = function nthnext(coll, n) {
  var n__7282 = n;
  var xs__7283 = cljs.core.seq.call(null, coll);
  while(true) {
    if(cljs.core.truth_(function() {
      var and__3822__auto____7284 = xs__7283;
      if(and__3822__auto____7284) {
        return n__7282 > 0
      }else {
        return and__3822__auto____7284
      }
    }())) {
      var G__7285 = n__7282 - 1;
      var G__7286 = cljs.core.next.call(null, xs__7283);
      n__7282 = G__7285;
      xs__7283 = G__7286;
      continue
    }else {
      return xs__7283
    }
    break
  }
};
cljs.core.str_STAR_ = function() {
  var str_STAR_ = null;
  var str_STAR___0 = function() {
    return""
  };
  var str_STAR___1 = function(x) {
    if(x == null) {
      return""
    }else {
      if("\ufdd0'else") {
        return x.toString()
      }else {
        return null
      }
    }
  };
  var str_STAR___2 = function() {
    var G__7287__delegate = function(x, ys) {
      return function(sb, more) {
        while(true) {
          if(cljs.core.truth_(more)) {
            var G__7288 = sb.append(str_STAR_.call(null, cljs.core.first.call(null, more)));
            var G__7289 = cljs.core.next.call(null, more);
            sb = G__7288;
            more = G__7289;
            continue
          }else {
            return str_STAR_.call(null, sb)
          }
          break
        }
      }.call(null, new goog.string.StringBuffer(str_STAR_.call(null, x)), ys)
    };
    var G__7287 = function(x, var_args) {
      var ys = null;
      if(goog.isDef(var_args)) {
        ys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
      }
      return G__7287__delegate.call(this, x, ys)
    };
    G__7287.cljs$lang$maxFixedArity = 1;
    G__7287.cljs$lang$applyTo = function(arglist__7290) {
      var x = cljs.core.first(arglist__7290);
      var ys = cljs.core.rest(arglist__7290);
      return G__7287__delegate(x, ys)
    };
    G__7287.cljs$lang$arity$variadic = G__7287__delegate;
    return G__7287
  }();
  str_STAR_ = function(x, var_args) {
    var ys = var_args;
    switch(arguments.length) {
      case 0:
        return str_STAR___0.call(this);
      case 1:
        return str_STAR___1.call(this, x);
      default:
        return str_STAR___2.cljs$lang$arity$variadic(x, cljs.core.array_seq(arguments, 1))
    }
    throw"Invalid arity: " + arguments.length;
  };
  str_STAR_.cljs$lang$maxFixedArity = 1;
  str_STAR_.cljs$lang$applyTo = str_STAR___2.cljs$lang$applyTo;
  str_STAR_.cljs$lang$arity$0 = str_STAR___0;
  str_STAR_.cljs$lang$arity$1 = str_STAR___1;
  str_STAR_.cljs$lang$arity$variadic = str_STAR___2.cljs$lang$arity$variadic;
  return str_STAR_
}();
cljs.core.str = function() {
  var str = null;
  var str__0 = function() {
    return""
  };
  var str__1 = function(x) {
    if(cljs.core.symbol_QMARK_.call(null, x)) {
      return x.substring(2, x.length)
    }else {
      if(cljs.core.keyword_QMARK_.call(null, x)) {
        return cljs.core.str_STAR_.call(null, ":", x.substring(2, x.length))
      }else {
        if(x == null) {
          return""
        }else {
          if("\ufdd0'else") {
            return x.toString()
          }else {
            return null
          }
        }
      }
    }
  };
  var str__2 = function() {
    var G__7291__delegate = function(x, ys) {
      return function(sb, more) {
        while(true) {
          if(cljs.core.truth_(more)) {
            var G__7292 = sb.append(str.call(null, cljs.core.first.call(null, more)));
            var G__7293 = cljs.core.next.call(null, more);
            sb = G__7292;
            more = G__7293;
            continue
          }else {
            return cljs.core.str_STAR_.call(null, sb)
          }
          break
        }
      }.call(null, new goog.string.StringBuffer(str.call(null, x)), ys)
    };
    var G__7291 = function(x, var_args) {
      var ys = null;
      if(goog.isDef(var_args)) {
        ys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
      }
      return G__7291__delegate.call(this, x, ys)
    };
    G__7291.cljs$lang$maxFixedArity = 1;
    G__7291.cljs$lang$applyTo = function(arglist__7294) {
      var x = cljs.core.first(arglist__7294);
      var ys = cljs.core.rest(arglist__7294);
      return G__7291__delegate(x, ys)
    };
    G__7291.cljs$lang$arity$variadic = G__7291__delegate;
    return G__7291
  }();
  str = function(x, var_args) {
    var ys = var_args;
    switch(arguments.length) {
      case 0:
        return str__0.call(this);
      case 1:
        return str__1.call(this, x);
      default:
        return str__2.cljs$lang$arity$variadic(x, cljs.core.array_seq(arguments, 1))
    }
    throw"Invalid arity: " + arguments.length;
  };
  str.cljs$lang$maxFixedArity = 1;
  str.cljs$lang$applyTo = str__2.cljs$lang$applyTo;
  str.cljs$lang$arity$0 = str__0;
  str.cljs$lang$arity$1 = str__1;
  str.cljs$lang$arity$variadic = str__2.cljs$lang$arity$variadic;
  return str
}();
cljs.core.subs = function() {
  var subs = null;
  var subs__2 = function(s, start) {
    return s.substring(start)
  };
  var subs__3 = function(s, start, end) {
    return s.substring(start, end)
  };
  subs = function(s, start, end) {
    switch(arguments.length) {
      case 2:
        return subs__2.call(this, s, start);
      case 3:
        return subs__3.call(this, s, start, end)
    }
    throw"Invalid arity: " + arguments.length;
  };
  subs.cljs$lang$arity$2 = subs__2;
  subs.cljs$lang$arity$3 = subs__3;
  return subs
}();
cljs.core.format = function() {
  var format__delegate = function(fmt, args) {
    return cljs.core.apply.call(null, goog.string.format, fmt, args)
  };
  var format = function(fmt, var_args) {
    var args = null;
    if(goog.isDef(var_args)) {
      args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
    }
    return format__delegate.call(this, fmt, args)
  };
  format.cljs$lang$maxFixedArity = 1;
  format.cljs$lang$applyTo = function(arglist__7295) {
    var fmt = cljs.core.first(arglist__7295);
    var args = cljs.core.rest(arglist__7295);
    return format__delegate(fmt, args)
  };
  format.cljs$lang$arity$variadic = format__delegate;
  return format
}();
cljs.core.symbol = function() {
  var symbol = null;
  var symbol__1 = function(name) {
    if(cljs.core.symbol_QMARK_.call(null, name)) {
      name
    }else {
      if(cljs.core.keyword_QMARK_.call(null, name)) {
        cljs.core.str_STAR_.call(null, "\ufdd1", "'", cljs.core.subs.call(null, name, 2))
      }else {
      }
    }
    return cljs.core.str_STAR_.call(null, "\ufdd1", "'", name)
  };
  var symbol__2 = function(ns, name) {
    return symbol.call(null, cljs.core.str_STAR_.call(null, ns, "/", name))
  };
  symbol = function(ns, name) {
    switch(arguments.length) {
      case 1:
        return symbol__1.call(this, ns);
      case 2:
        return symbol__2.call(this, ns, name)
    }
    throw"Invalid arity: " + arguments.length;
  };
  symbol.cljs$lang$arity$1 = symbol__1;
  symbol.cljs$lang$arity$2 = symbol__2;
  return symbol
}();
cljs.core.keyword = function() {
  var keyword = null;
  var keyword__1 = function(name) {
    if(cljs.core.keyword_QMARK_.call(null, name)) {
      return name
    }else {
      if(cljs.core.symbol_QMARK_.call(null, name)) {
        return cljs.core.str_STAR_.call(null, "\ufdd0", "'", cljs.core.subs.call(null, name, 2))
      }else {
        if("\ufdd0'else") {
          return cljs.core.str_STAR_.call(null, "\ufdd0", "'", name)
        }else {
          return null
        }
      }
    }
  };
  var keyword__2 = function(ns, name) {
    return keyword.call(null, cljs.core.str_STAR_.call(null, ns, "/", name))
  };
  keyword = function(ns, name) {
    switch(arguments.length) {
      case 1:
        return keyword__1.call(this, ns);
      case 2:
        return keyword__2.call(this, ns, name)
    }
    throw"Invalid arity: " + arguments.length;
  };
  keyword.cljs$lang$arity$1 = keyword__1;
  keyword.cljs$lang$arity$2 = keyword__2;
  return keyword
}();
cljs.core.equiv_sequential = function equiv_sequential(x, y) {
  return cljs.core.boolean$.call(null, cljs.core.sequential_QMARK_.call(null, y) ? function() {
    var xs__7298 = cljs.core.seq.call(null, x);
    var ys__7299 = cljs.core.seq.call(null, y);
    while(true) {
      if(xs__7298 == null) {
        return ys__7299 == null
      }else {
        if(ys__7299 == null) {
          return false
        }else {
          if(cljs.core._EQ_.call(null, cljs.core.first.call(null, xs__7298), cljs.core.first.call(null, ys__7299))) {
            var G__7300 = cljs.core.next.call(null, xs__7298);
            var G__7301 = cljs.core.next.call(null, ys__7299);
            xs__7298 = G__7300;
            ys__7299 = G__7301;
            continue
          }else {
            if("\ufdd0'else") {
              return false
            }else {
              return null
            }
          }
        }
      }
      break
    }
  }() : null)
};
cljs.core.hash_combine = function hash_combine(seed, hash) {
  return seed ^ hash + 2654435769 + (seed << 6) + (seed >> 2)
};
cljs.core.hash_coll = function hash_coll(coll) {
  return cljs.core.reduce.call(null, function(p1__7302_SHARP_, p2__7303_SHARP_) {
    return cljs.core.hash_combine.call(null, p1__7302_SHARP_, cljs.core.hash.call(null, p2__7303_SHARP_, false))
  }, cljs.core.hash.call(null, cljs.core.first.call(null, coll), false), cljs.core.next.call(null, coll))
};
cljs.core.hash_imap = function hash_imap(m) {
  var h__7307 = 0;
  var s__7308 = cljs.core.seq.call(null, m);
  while(true) {
    if(s__7308) {
      var e__7309 = cljs.core.first.call(null, s__7308);
      var G__7310 = (h__7307 + (cljs.core.hash.call(null, cljs.core.key.call(null, e__7309)) ^ cljs.core.hash.call(null, cljs.core.val.call(null, e__7309)))) % 4503599627370496;
      var G__7311 = cljs.core.next.call(null, s__7308);
      h__7307 = G__7310;
      s__7308 = G__7311;
      continue
    }else {
      return h__7307
    }
    break
  }
};
cljs.core.hash_iset = function hash_iset(s) {
  var h__7315 = 0;
  var s__7316 = cljs.core.seq.call(null, s);
  while(true) {
    if(s__7316) {
      var e__7317 = cljs.core.first.call(null, s__7316);
      var G__7318 = (h__7315 + cljs.core.hash.call(null, e__7317)) % 4503599627370496;
      var G__7319 = cljs.core.next.call(null, s__7316);
      h__7315 = G__7318;
      s__7316 = G__7319;
      continue
    }else {
      return h__7315
    }
    break
  }
};
cljs.core.extend_object_BANG_ = function extend_object_BANG_(obj, fn_map) {
  var G__7340__7341 = cljs.core.seq.call(null, fn_map);
  if(G__7340__7341) {
    var G__7343__7345 = cljs.core.first.call(null, G__7340__7341);
    var vec__7344__7346 = G__7343__7345;
    var key_name__7347 = cljs.core.nth.call(null, vec__7344__7346, 0, null);
    var f__7348 = cljs.core.nth.call(null, vec__7344__7346, 1, null);
    var G__7340__7349 = G__7340__7341;
    var G__7343__7350 = G__7343__7345;
    var G__7340__7351 = G__7340__7349;
    while(true) {
      var vec__7352__7353 = G__7343__7350;
      var key_name__7354 = cljs.core.nth.call(null, vec__7352__7353, 0, null);
      var f__7355 = cljs.core.nth.call(null, vec__7352__7353, 1, null);
      var G__7340__7356 = G__7340__7351;
      var str_name__7357 = cljs.core.name.call(null, key_name__7354);
      obj[str_name__7357] = f__7355;
      var temp__3974__auto____7358 = cljs.core.next.call(null, G__7340__7356);
      if(temp__3974__auto____7358) {
        var G__7340__7359 = temp__3974__auto____7358;
        var G__7360 = cljs.core.first.call(null, G__7340__7359);
        var G__7361 = G__7340__7359;
        G__7343__7350 = G__7360;
        G__7340__7351 = G__7361;
        continue
      }else {
      }
      break
    }
  }else {
  }
  return obj
};
cljs.core.List = function(meta, first, rest, count, __hash) {
  this.meta = meta;
  this.first = first;
  this.rest = rest;
  this.count = count;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 65413358
};
cljs.core.List.cljs$lang$type = true;
cljs.core.List.cljs$lang$ctorPrSeq = function(this__2315__auto__) {
  return cljs.core.list.call(null, "cljs.core/List")
};
cljs.core.List.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__7362 = this;
  var h__2198__auto____7363 = this__7362.__hash;
  if(!(h__2198__auto____7363 == null)) {
    return h__2198__auto____7363
  }else {
    var h__2198__auto____7364 = cljs.core.hash_coll.call(null, coll);
    this__7362.__hash = h__2198__auto____7364;
    return h__2198__auto____7364
  }
};
cljs.core.List.prototype.cljs$core$INext$_next$arity$1 = function(coll) {
  var this__7365 = this;
  if(this__7365.count === 1) {
    return null
  }else {
    return this__7365.rest
  }
};
cljs.core.List.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__7366 = this;
  return new cljs.core.List(this__7366.meta, o, coll, this__7366.count + 1, null)
};
cljs.core.List.prototype.toString = function() {
  var this__7367 = this;
  var this__7368 = this;
  return cljs.core.pr_str.call(null, this__7368)
};
cljs.core.List.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__7369 = this;
  return coll
};
cljs.core.List.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__7370 = this;
  return this__7370.count
};
cljs.core.List.prototype.cljs$core$IStack$_peek$arity$1 = function(coll) {
  var this__7371 = this;
  return this__7371.first
};
cljs.core.List.prototype.cljs$core$IStack$_pop$arity$1 = function(coll) {
  var this__7372 = this;
  return coll.cljs$core$ISeq$_rest$arity$1(coll)
};
cljs.core.List.prototype.cljs$core$ISeq$_first$arity$1 = function(coll) {
  var this__7373 = this;
  return this__7373.first
};
cljs.core.List.prototype.cljs$core$ISeq$_rest$arity$1 = function(coll) {
  var this__7374 = this;
  if(this__7374.count === 1) {
    return cljs.core.List.EMPTY
  }else {
    return this__7374.rest
  }
};
cljs.core.List.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__7375 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.List.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__7376 = this;
  return new cljs.core.List(meta, this__7376.first, this__7376.rest, this__7376.count, this__7376.__hash)
};
cljs.core.List.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__7377 = this;
  return this__7377.meta
};
cljs.core.List.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__7378 = this;
  return cljs.core.List.EMPTY
};
cljs.core.List;
cljs.core.EmptyList = function(meta) {
  this.meta = meta;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 65413326
};
cljs.core.EmptyList.cljs$lang$type = true;
cljs.core.EmptyList.cljs$lang$ctorPrSeq = function(this__2315__auto__) {
  return cljs.core.list.call(null, "cljs.core/EmptyList")
};
cljs.core.EmptyList.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__7379 = this;
  return 0
};
cljs.core.EmptyList.prototype.cljs$core$INext$_next$arity$1 = function(coll) {
  var this__7380 = this;
  return null
};
cljs.core.EmptyList.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__7381 = this;
  return new cljs.core.List(this__7381.meta, o, null, 1, null)
};
cljs.core.EmptyList.prototype.toString = function() {
  var this__7382 = this;
  var this__7383 = this;
  return cljs.core.pr_str.call(null, this__7383)
};
cljs.core.EmptyList.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__7384 = this;
  return null
};
cljs.core.EmptyList.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__7385 = this;
  return 0
};
cljs.core.EmptyList.prototype.cljs$core$IStack$_peek$arity$1 = function(coll) {
  var this__7386 = this;
  return null
};
cljs.core.EmptyList.prototype.cljs$core$IStack$_pop$arity$1 = function(coll) {
  var this__7387 = this;
  throw new Error("Can't pop empty list");
};
cljs.core.EmptyList.prototype.cljs$core$ISeq$_first$arity$1 = function(coll) {
  var this__7388 = this;
  return null
};
cljs.core.EmptyList.prototype.cljs$core$ISeq$_rest$arity$1 = function(coll) {
  var this__7389 = this;
  return cljs.core.List.EMPTY
};
cljs.core.EmptyList.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__7390 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.EmptyList.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__7391 = this;
  return new cljs.core.EmptyList(meta)
};
cljs.core.EmptyList.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__7392 = this;
  return this__7392.meta
};
cljs.core.EmptyList.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__7393 = this;
  return coll
};
cljs.core.EmptyList;
cljs.core.List.EMPTY = new cljs.core.EmptyList(null);
cljs.core.reversible_QMARK_ = function reversible_QMARK_(coll) {
  var G__7397__7398 = coll;
  if(G__7397__7398) {
    if(function() {
      var or__3824__auto____7399 = G__7397__7398.cljs$lang$protocol_mask$partition0$ & 134217728;
      if(or__3824__auto____7399) {
        return or__3824__auto____7399
      }else {
        return G__7397__7398.cljs$core$IReversible$
      }
    }()) {
      return true
    }else {
      if(!G__7397__7398.cljs$lang$protocol_mask$partition0$) {
        return cljs.core.type_satisfies_.call(null, cljs.core.IReversible, G__7397__7398)
      }else {
        return false
      }
    }
  }else {
    return cljs.core.type_satisfies_.call(null, cljs.core.IReversible, G__7397__7398)
  }
};
cljs.core.rseq = function rseq(coll) {
  return cljs.core._rseq.call(null, coll)
};
cljs.core.reverse = function reverse(coll) {
  if(cljs.core.reversible_QMARK_.call(null, coll)) {
    return cljs.core.rseq.call(null, coll)
  }else {
    return cljs.core.reduce.call(null, cljs.core.conj, cljs.core.List.EMPTY, coll)
  }
};
cljs.core.list = function() {
  var list = null;
  var list__0 = function() {
    return cljs.core.List.EMPTY
  };
  var list__1 = function(x) {
    return cljs.core.conj.call(null, cljs.core.List.EMPTY, x)
  };
  var list__2 = function(x, y) {
    return cljs.core.conj.call(null, list.call(null, y), x)
  };
  var list__3 = function(x, y, z) {
    return cljs.core.conj.call(null, list.call(null, y, z), x)
  };
  var list__4 = function() {
    var G__7400__delegate = function(x, y, z, items) {
      return cljs.core.conj.call(null, cljs.core.conj.call(null, cljs.core.conj.call(null, cljs.core.reduce.call(null, cljs.core.conj, cljs.core.List.EMPTY, cljs.core.reverse.call(null, items)), z), y), x)
    };
    var G__7400 = function(x, y, z, var_args) {
      var items = null;
      if(goog.isDef(var_args)) {
        items = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
      }
      return G__7400__delegate.call(this, x, y, z, items)
    };
    G__7400.cljs$lang$maxFixedArity = 3;
    G__7400.cljs$lang$applyTo = function(arglist__7401) {
      var x = cljs.core.first(arglist__7401);
      var y = cljs.core.first(cljs.core.next(arglist__7401));
      var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7401)));
      var items = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7401)));
      return G__7400__delegate(x, y, z, items)
    };
    G__7400.cljs$lang$arity$variadic = G__7400__delegate;
    return G__7400
  }();
  list = function(x, y, z, var_args) {
    var items = var_args;
    switch(arguments.length) {
      case 0:
        return list__0.call(this);
      case 1:
        return list__1.call(this, x);
      case 2:
        return list__2.call(this, x, y);
      case 3:
        return list__3.call(this, x, y, z);
      default:
        return list__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
    }
    throw"Invalid arity: " + arguments.length;
  };
  list.cljs$lang$maxFixedArity = 3;
  list.cljs$lang$applyTo = list__4.cljs$lang$applyTo;
  list.cljs$lang$arity$0 = list__0;
  list.cljs$lang$arity$1 = list__1;
  list.cljs$lang$arity$2 = list__2;
  list.cljs$lang$arity$3 = list__3;
  list.cljs$lang$arity$variadic = list__4.cljs$lang$arity$variadic;
  return list
}();
cljs.core.Cons = function(meta, first, rest, __hash) {
  this.meta = meta;
  this.first = first;
  this.rest = rest;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 65405164
};
cljs.core.Cons.cljs$lang$type = true;
cljs.core.Cons.cljs$lang$ctorPrSeq = function(this__2315__auto__) {
  return cljs.core.list.call(null, "cljs.core/Cons")
};
cljs.core.Cons.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__7402 = this;
  var h__2198__auto____7403 = this__7402.__hash;
  if(!(h__2198__auto____7403 == null)) {
    return h__2198__auto____7403
  }else {
    var h__2198__auto____7404 = cljs.core.hash_coll.call(null, coll);
    this__7402.__hash = h__2198__auto____7404;
    return h__2198__auto____7404
  }
};
cljs.core.Cons.prototype.cljs$core$INext$_next$arity$1 = function(coll) {
  var this__7405 = this;
  if(this__7405.rest == null) {
    return null
  }else {
    return cljs.core._seq.call(null, this__7405.rest)
  }
};
cljs.core.Cons.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__7406 = this;
  return new cljs.core.Cons(null, o, coll, this__7406.__hash)
};
cljs.core.Cons.prototype.toString = function() {
  var this__7407 = this;
  var this__7408 = this;
  return cljs.core.pr_str.call(null, this__7408)
};
cljs.core.Cons.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__7409 = this;
  return coll
};
cljs.core.Cons.prototype.cljs$core$ISeq$_first$arity$1 = function(coll) {
  var this__7410 = this;
  return this__7410.first
};
cljs.core.Cons.prototype.cljs$core$ISeq$_rest$arity$1 = function(coll) {
  var this__7411 = this;
  if(this__7411.rest == null) {
    return cljs.core.List.EMPTY
  }else {
    return this__7411.rest
  }
};
cljs.core.Cons.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__7412 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.Cons.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__7413 = this;
  return new cljs.core.Cons(meta, this__7413.first, this__7413.rest, this__7413.__hash)
};
cljs.core.Cons.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__7414 = this;
  return this__7414.meta
};
cljs.core.Cons.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__7415 = this;
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this__7415.meta)
};
cljs.core.Cons;
cljs.core.cons = function cons(x, coll) {
  if(function() {
    var or__3824__auto____7420 = coll == null;
    if(or__3824__auto____7420) {
      return or__3824__auto____7420
    }else {
      var G__7421__7422 = coll;
      if(G__7421__7422) {
        if(function() {
          var or__3824__auto____7423 = G__7421__7422.cljs$lang$protocol_mask$partition0$ & 64;
          if(or__3824__auto____7423) {
            return or__3824__auto____7423
          }else {
            return G__7421__7422.cljs$core$ISeq$
          }
        }()) {
          return true
        }else {
          if(!G__7421__7422.cljs$lang$protocol_mask$partition0$) {
            return cljs.core.type_satisfies_.call(null, cljs.core.ISeq, G__7421__7422)
          }else {
            return false
          }
        }
      }else {
        return cljs.core.type_satisfies_.call(null, cljs.core.ISeq, G__7421__7422)
      }
    }
  }()) {
    return new cljs.core.Cons(null, x, coll, null)
  }else {
    return new cljs.core.Cons(null, x, cljs.core.seq.call(null, coll), null)
  }
};
cljs.core.list_QMARK_ = function list_QMARK_(x) {
  var G__7427__7428 = x;
  if(G__7427__7428) {
    if(function() {
      var or__3824__auto____7429 = G__7427__7428.cljs$lang$protocol_mask$partition0$ & 33554432;
      if(or__3824__auto____7429) {
        return or__3824__auto____7429
      }else {
        return G__7427__7428.cljs$core$IList$
      }
    }()) {
      return true
    }else {
      if(!G__7427__7428.cljs$lang$protocol_mask$partition0$) {
        return cljs.core.type_satisfies_.call(null, cljs.core.IList, G__7427__7428)
      }else {
        return false
      }
    }
  }else {
    return cljs.core.type_satisfies_.call(null, cljs.core.IList, G__7427__7428)
  }
};
cljs.core.IReduce["string"] = true;
cljs.core._reduce["string"] = function() {
  var G__7430 = null;
  var G__7430__2 = function(string, f) {
    return cljs.core.ci_reduce.call(null, string, f)
  };
  var G__7430__3 = function(string, f, start) {
    return cljs.core.ci_reduce.call(null, string, f, start)
  };
  G__7430 = function(string, f, start) {
    switch(arguments.length) {
      case 2:
        return G__7430__2.call(this, string, f);
      case 3:
        return G__7430__3.call(this, string, f, start)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__7430
}();
cljs.core.ILookup["string"] = true;
cljs.core._lookup["string"] = function() {
  var G__7431 = null;
  var G__7431__2 = function(string, k) {
    return cljs.core._nth.call(null, string, k)
  };
  var G__7431__3 = function(string, k, not_found) {
    return cljs.core._nth.call(null, string, k, not_found)
  };
  G__7431 = function(string, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__7431__2.call(this, string, k);
      case 3:
        return G__7431__3.call(this, string, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__7431
}();
cljs.core.IIndexed["string"] = true;
cljs.core._nth["string"] = function() {
  var G__7432 = null;
  var G__7432__2 = function(string, n) {
    if(n < cljs.core._count.call(null, string)) {
      return string.charAt(n)
    }else {
      return null
    }
  };
  var G__7432__3 = function(string, n, not_found) {
    if(n < cljs.core._count.call(null, string)) {
      return string.charAt(n)
    }else {
      return not_found
    }
  };
  G__7432 = function(string, n, not_found) {
    switch(arguments.length) {
      case 2:
        return G__7432__2.call(this, string, n);
      case 3:
        return G__7432__3.call(this, string, n, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__7432
}();
cljs.core.ICounted["string"] = true;
cljs.core._count["string"] = function(s) {
  return s.length
};
cljs.core.ISeqable["string"] = true;
cljs.core._seq["string"] = function(string) {
  return cljs.core.prim_seq.call(null, string, 0)
};
cljs.core.IHash["string"] = true;
cljs.core._hash["string"] = function(o) {
  return goog.string.hashCode(o)
};
cljs.core.Keyword = function(k) {
  this.k = k;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 1
};
cljs.core.Keyword.cljs$lang$type = true;
cljs.core.Keyword.cljs$lang$ctorPrSeq = function(this__2315__auto__) {
  return cljs.core.list.call(null, "cljs.core/Keyword")
};
cljs.core.Keyword.prototype.call = function() {
  var G__7444 = null;
  var G__7444__2 = function(this_sym7435, coll) {
    var this__7437 = this;
    var this_sym7435__7438 = this;
    var ___7439 = this_sym7435__7438;
    if(coll == null) {
      return null
    }else {
      var strobj__7440 = coll.strobj;
      if(strobj__7440 == null) {
        return cljs.core._lookup.call(null, coll, this__7437.k, null)
      }else {
        return strobj__7440[this__7437.k]
      }
    }
  };
  var G__7444__3 = function(this_sym7436, coll, not_found) {
    var this__7437 = this;
    var this_sym7436__7441 = this;
    var ___7442 = this_sym7436__7441;
    if(coll == null) {
      return not_found
    }else {
      return cljs.core._lookup.call(null, coll, this__7437.k, not_found)
    }
  };
  G__7444 = function(this_sym7436, coll, not_found) {
    switch(arguments.length) {
      case 2:
        return G__7444__2.call(this, this_sym7436, coll);
      case 3:
        return G__7444__3.call(this, this_sym7436, coll, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__7444
}();
cljs.core.Keyword.prototype.apply = function(this_sym7433, args7434) {
  var this__7443 = this;
  return this_sym7433.call.apply(this_sym7433, [this_sym7433].concat(args7434.slice()))
};
cljs.core.Keyword;
String.prototype.cljs$core$IFn$ = true;
String.prototype.call = function() {
  var G__7453 = null;
  var G__7453__2 = function(this_sym7447, coll) {
    var this_sym7447__7449 = this;
    var this__7450 = this_sym7447__7449;
    return cljs.core._lookup.call(null, coll, this__7450.toString(), null)
  };
  var G__7453__3 = function(this_sym7448, coll, not_found) {
    var this_sym7448__7451 = this;
    var this__7452 = this_sym7448__7451;
    return cljs.core._lookup.call(null, coll, this__7452.toString(), not_found)
  };
  G__7453 = function(this_sym7448, coll, not_found) {
    switch(arguments.length) {
      case 2:
        return G__7453__2.call(this, this_sym7448, coll);
      case 3:
        return G__7453__3.call(this, this_sym7448, coll, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__7453
}();
String.prototype.apply = function(this_sym7445, args7446) {
  return this_sym7445.call.apply(this_sym7445, [this_sym7445].concat(args7446.slice()))
};
String.prototype.apply = function(s, args) {
  if(cljs.core.count.call(null, args) < 2) {
    return cljs.core._lookup.call(null, args[0], s, null)
  }else {
    return cljs.core._lookup.call(null, args[0], s, args[1])
  }
};
cljs.core.lazy_seq_value = function lazy_seq_value(lazy_seq) {
  var x__7455 = lazy_seq.x;
  if(lazy_seq.realized) {
    return x__7455
  }else {
    lazy_seq.x = x__7455.call(null);
    lazy_seq.realized = true;
    return lazy_seq.x
  }
};
cljs.core.LazySeq = function(meta, realized, x, __hash) {
  this.meta = meta;
  this.realized = realized;
  this.x = x;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 31850700
};
cljs.core.LazySeq.cljs$lang$type = true;
cljs.core.LazySeq.cljs$lang$ctorPrSeq = function(this__2315__auto__) {
  return cljs.core.list.call(null, "cljs.core/LazySeq")
};
cljs.core.LazySeq.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__7456 = this;
  var h__2198__auto____7457 = this__7456.__hash;
  if(!(h__2198__auto____7457 == null)) {
    return h__2198__auto____7457
  }else {
    var h__2198__auto____7458 = cljs.core.hash_coll.call(null, coll);
    this__7456.__hash = h__2198__auto____7458;
    return h__2198__auto____7458
  }
};
cljs.core.LazySeq.prototype.cljs$core$INext$_next$arity$1 = function(coll) {
  var this__7459 = this;
  return cljs.core._seq.call(null, coll.cljs$core$ISeq$_rest$arity$1(coll))
};
cljs.core.LazySeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__7460 = this;
  return cljs.core.cons.call(null, o, coll)
};
cljs.core.LazySeq.prototype.toString = function() {
  var this__7461 = this;
  var this__7462 = this;
  return cljs.core.pr_str.call(null, this__7462)
};
cljs.core.LazySeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__7463 = this;
  return cljs.core.seq.call(null, cljs.core.lazy_seq_value.call(null, coll))
};
cljs.core.LazySeq.prototype.cljs$core$ISeq$_first$arity$1 = function(coll) {
  var this__7464 = this;
  return cljs.core.first.call(null, cljs.core.lazy_seq_value.call(null, coll))
};
cljs.core.LazySeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(coll) {
  var this__7465 = this;
  return cljs.core.rest.call(null, cljs.core.lazy_seq_value.call(null, coll))
};
cljs.core.LazySeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__7466 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.LazySeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__7467 = this;
  return new cljs.core.LazySeq(meta, this__7467.realized, this__7467.x, this__7467.__hash)
};
cljs.core.LazySeq.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__7468 = this;
  return this__7468.meta
};
cljs.core.LazySeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__7469 = this;
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this__7469.meta)
};
cljs.core.LazySeq;
cljs.core.ChunkBuffer = function(buf, end) {
  this.buf = buf;
  this.end = end;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 2
};
cljs.core.ChunkBuffer.cljs$lang$type = true;
cljs.core.ChunkBuffer.cljs$lang$ctorPrSeq = function(this__2315__auto__) {
  return cljs.core.list.call(null, "cljs.core/ChunkBuffer")
};
cljs.core.ChunkBuffer.prototype.cljs$core$ICounted$_count$arity$1 = function(_) {
  var this__7470 = this;
  return this__7470.end
};
cljs.core.ChunkBuffer.prototype.add = function(o) {
  var this__7471 = this;
  var ___7472 = this;
  this__7471.buf[this__7471.end] = o;
  return this__7471.end = this__7471.end + 1
};
cljs.core.ChunkBuffer.prototype.chunk = function(o) {
  var this__7473 = this;
  var ___7474 = this;
  var ret__7475 = new cljs.core.ArrayChunk(this__7473.buf, 0, this__7473.end);
  this__7473.buf = null;
  return ret__7475
};
cljs.core.ChunkBuffer;
cljs.core.chunk_buffer = function chunk_buffer(capacity) {
  return new cljs.core.ChunkBuffer(cljs.core.make_array.call(null, capacity), 0)
};
cljs.core.ArrayChunk = function(arr, off, end) {
  this.arr = arr;
  this.off = off;
  this.end = end;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 524306
};
cljs.core.ArrayChunk.cljs$lang$type = true;
cljs.core.ArrayChunk.cljs$lang$ctorPrSeq = function(this__2315__auto__) {
  return cljs.core.list.call(null, "cljs.core/ArrayChunk")
};
cljs.core.ArrayChunk.prototype.cljs$core$IReduce$_reduce$arity$2 = function(coll, f) {
  var this__7476 = this;
  return cljs.core.ci_reduce.call(null, coll, f, this__7476.arr[this__7476.off], this__7476.off + 1)
};
cljs.core.ArrayChunk.prototype.cljs$core$IReduce$_reduce$arity$3 = function(coll, f, start) {
  var this__7477 = this;
  return cljs.core.ci_reduce.call(null, coll, f, start, this__7477.off)
};
cljs.core.ArrayChunk.prototype.cljs$core$IChunk$ = true;
cljs.core.ArrayChunk.prototype.cljs$core$IChunk$_drop_first$arity$1 = function(coll) {
  var this__7478 = this;
  if(this__7478.off === this__7478.end) {
    throw new Error("-drop-first of empty chunk");
  }else {
    return new cljs.core.ArrayChunk(this__7478.arr, this__7478.off + 1, this__7478.end)
  }
};
cljs.core.ArrayChunk.prototype.cljs$core$IIndexed$_nth$arity$2 = function(coll, i) {
  var this__7479 = this;
  return this__7479.arr[this__7479.off + i]
};
cljs.core.ArrayChunk.prototype.cljs$core$IIndexed$_nth$arity$3 = function(coll, i, not_found) {
  var this__7480 = this;
  if(function() {
    var and__3822__auto____7481 = i >= 0;
    if(and__3822__auto____7481) {
      return i < this__7480.end - this__7480.off
    }else {
      return and__3822__auto____7481
    }
  }()) {
    return this__7480.arr[this__7480.off + i]
  }else {
    return not_found
  }
};
cljs.core.ArrayChunk.prototype.cljs$core$ICounted$_count$arity$1 = function(_) {
  var this__7482 = this;
  return this__7482.end - this__7482.off
};
cljs.core.ArrayChunk;
cljs.core.array_chunk = function() {
  var array_chunk = null;
  var array_chunk__1 = function(arr) {
    return array_chunk.call(null, arr, 0, arr.length)
  };
  var array_chunk__2 = function(arr, off) {
    return array_chunk.call(null, arr, off, arr.length)
  };
  var array_chunk__3 = function(arr, off, end) {
    return new cljs.core.ArrayChunk(arr, off, end)
  };
  array_chunk = function(arr, off, end) {
    switch(arguments.length) {
      case 1:
        return array_chunk__1.call(this, arr);
      case 2:
        return array_chunk__2.call(this, arr, off);
      case 3:
        return array_chunk__3.call(this, arr, off, end)
    }
    throw"Invalid arity: " + arguments.length;
  };
  array_chunk.cljs$lang$arity$1 = array_chunk__1;
  array_chunk.cljs$lang$arity$2 = array_chunk__2;
  array_chunk.cljs$lang$arity$3 = array_chunk__3;
  return array_chunk
}();
cljs.core.ChunkedCons = function(chunk, more, meta) {
  this.chunk = chunk;
  this.more = more;
  this.meta = meta;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 27656296
};
cljs.core.ChunkedCons.cljs$lang$type = true;
cljs.core.ChunkedCons.cljs$lang$ctorPrSeq = function(this__2315__auto__) {
  return cljs.core.list.call(null, "cljs.core/ChunkedCons")
};
cljs.core.ChunkedCons.prototype.cljs$core$ICollection$_conj$arity$2 = function(this$, o) {
  var this__7483 = this;
  return cljs.core.cons.call(null, o, this$)
};
cljs.core.ChunkedCons.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__7484 = this;
  return coll
};
cljs.core.ChunkedCons.prototype.cljs$core$ISeq$_first$arity$1 = function(coll) {
  var this__7485 = this;
  return cljs.core._nth.call(null, this__7485.chunk, 0)
};
cljs.core.ChunkedCons.prototype.cljs$core$ISeq$_rest$arity$1 = function(coll) {
  var this__7486 = this;
  if(cljs.core._count.call(null, this__7486.chunk) > 1) {
    return new cljs.core.ChunkedCons(cljs.core._drop_first.call(null, this__7486.chunk), this__7486.more, this__7486.meta)
  }else {
    if(this__7486.more == null) {
      return cljs.core.List.EMPTY
    }else {
      return this__7486.more
    }
  }
};
cljs.core.ChunkedCons.prototype.cljs$core$IChunkedNext$ = true;
cljs.core.ChunkedCons.prototype.cljs$core$IChunkedNext$_chunked_next$arity$1 = function(coll) {
  var this__7487 = this;
  if(this__7487.more == null) {
    return null
  }else {
    return this__7487.more
  }
};
cljs.core.ChunkedCons.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__7488 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.ChunkedCons.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, m) {
  var this__7489 = this;
  return new cljs.core.ChunkedCons(this__7489.chunk, this__7489.more, m)
};
cljs.core.ChunkedCons.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__7490 = this;
  return this__7490.meta
};
cljs.core.ChunkedCons.prototype.cljs$core$IChunkedSeq$ = true;
cljs.core.ChunkedCons.prototype.cljs$core$IChunkedSeq$_chunked_first$arity$1 = function(coll) {
  var this__7491 = this;
  return this__7491.chunk
};
cljs.core.ChunkedCons.prototype.cljs$core$IChunkedSeq$_chunked_rest$arity$1 = function(coll) {
  var this__7492 = this;
  if(this__7492.more == null) {
    return cljs.core.List.EMPTY
  }else {
    return this__7492.more
  }
};
cljs.core.ChunkedCons;
cljs.core.chunk_cons = function chunk_cons(chunk, rest) {
  if(cljs.core._count.call(null, chunk) === 0) {
    return rest
  }else {
    return new cljs.core.ChunkedCons(chunk, rest, null)
  }
};
cljs.core.chunk_append = function chunk_append(b, x) {
  return b.add(x)
};
cljs.core.chunk = function chunk(b) {
  return b.chunk()
};
cljs.core.chunk_first = function chunk_first(s) {
  return cljs.core._chunked_first.call(null, s)
};
cljs.core.chunk_rest = function chunk_rest(s) {
  return cljs.core._chunked_rest.call(null, s)
};
cljs.core.chunk_next = function chunk_next(s) {
  if(function() {
    var G__7496__7497 = s;
    if(G__7496__7497) {
      if(cljs.core.truth_(function() {
        var or__3824__auto____7498 = null;
        if(cljs.core.truth_(or__3824__auto____7498)) {
          return or__3824__auto____7498
        }else {
          return G__7496__7497.cljs$core$IChunkedNext$
        }
      }())) {
        return true
      }else {
        if(!G__7496__7497.cljs$lang$protocol_mask$partition$) {
          return cljs.core.type_satisfies_.call(null, cljs.core.IChunkedNext, G__7496__7497)
        }else {
          return false
        }
      }
    }else {
      return cljs.core.type_satisfies_.call(null, cljs.core.IChunkedNext, G__7496__7497)
    }
  }()) {
    return cljs.core._chunked_next.call(null, s)
  }else {
    return cljs.core.seq.call(null, cljs.core._chunked_rest.call(null, s))
  }
};
cljs.core.to_array = function to_array(s) {
  var ary__7501 = [];
  var s__7502 = s;
  while(true) {
    if(cljs.core.seq.call(null, s__7502)) {
      ary__7501.push(cljs.core.first.call(null, s__7502));
      var G__7503 = cljs.core.next.call(null, s__7502);
      s__7502 = G__7503;
      continue
    }else {
      return ary__7501
    }
    break
  }
};
cljs.core.to_array_2d = function to_array_2d(coll) {
  var ret__7507 = cljs.core.make_array.call(null, cljs.core.count.call(null, coll));
  var i__7508 = 0;
  var xs__7509 = cljs.core.seq.call(null, coll);
  while(true) {
    if(xs__7509) {
      ret__7507[i__7508] = cljs.core.to_array.call(null, cljs.core.first.call(null, xs__7509));
      var G__7510 = i__7508 + 1;
      var G__7511 = cljs.core.next.call(null, xs__7509);
      i__7508 = G__7510;
      xs__7509 = G__7511;
      continue
    }else {
    }
    break
  }
  return ret__7507
};
cljs.core.long_array = function() {
  var long_array = null;
  var long_array__1 = function(size_or_seq) {
    if(cljs.core.number_QMARK_.call(null, size_or_seq)) {
      return long_array.call(null, size_or_seq, null)
    }else {
      if(cljs.core.seq_QMARK_.call(null, size_or_seq)) {
        return cljs.core.into_array.call(null, size_or_seq)
      }else {
        if("\ufdd0'else") {
          throw new Error("long-array called with something other than size or ISeq");
        }else {
          return null
        }
      }
    }
  };
  var long_array__2 = function(size, init_val_or_seq) {
    var a__7519 = cljs.core.make_array.call(null, size);
    if(cljs.core.seq_QMARK_.call(null, init_val_or_seq)) {
      var s__7520 = cljs.core.seq.call(null, init_val_or_seq);
      var i__7521 = 0;
      var s__7522 = s__7520;
      while(true) {
        if(cljs.core.truth_(function() {
          var and__3822__auto____7523 = s__7522;
          if(and__3822__auto____7523) {
            return i__7521 < size
          }else {
            return and__3822__auto____7523
          }
        }())) {
          a__7519[i__7521] = cljs.core.first.call(null, s__7522);
          var G__7526 = i__7521 + 1;
          var G__7527 = cljs.core.next.call(null, s__7522);
          i__7521 = G__7526;
          s__7522 = G__7527;
          continue
        }else {
          return a__7519
        }
        break
      }
    }else {
      var n__2533__auto____7524 = size;
      var i__7525 = 0;
      while(true) {
        if(i__7525 < n__2533__auto____7524) {
          a__7519[i__7525] = init_val_or_seq;
          var G__7528 = i__7525 + 1;
          i__7525 = G__7528;
          continue
        }else {
        }
        break
      }
      return a__7519
    }
  };
  long_array = function(size, init_val_or_seq) {
    switch(arguments.length) {
      case 1:
        return long_array__1.call(this, size);
      case 2:
        return long_array__2.call(this, size, init_val_or_seq)
    }
    throw"Invalid arity: " + arguments.length;
  };
  long_array.cljs$lang$arity$1 = long_array__1;
  long_array.cljs$lang$arity$2 = long_array__2;
  return long_array
}();
cljs.core.double_array = function() {
  var double_array = null;
  var double_array__1 = function(size_or_seq) {
    if(cljs.core.number_QMARK_.call(null, size_or_seq)) {
      return double_array.call(null, size_or_seq, null)
    }else {
      if(cljs.core.seq_QMARK_.call(null, size_or_seq)) {
        return cljs.core.into_array.call(null, size_or_seq)
      }else {
        if("\ufdd0'else") {
          throw new Error("double-array called with something other than size or ISeq");
        }else {
          return null
        }
      }
    }
  };
  var double_array__2 = function(size, init_val_or_seq) {
    var a__7536 = cljs.core.make_array.call(null, size);
    if(cljs.core.seq_QMARK_.call(null, init_val_or_seq)) {
      var s__7537 = cljs.core.seq.call(null, init_val_or_seq);
      var i__7538 = 0;
      var s__7539 = s__7537;
      while(true) {
        if(cljs.core.truth_(function() {
          var and__3822__auto____7540 = s__7539;
          if(and__3822__auto____7540) {
            return i__7538 < size
          }else {
            return and__3822__auto____7540
          }
        }())) {
          a__7536[i__7538] = cljs.core.first.call(null, s__7539);
          var G__7543 = i__7538 + 1;
          var G__7544 = cljs.core.next.call(null, s__7539);
          i__7538 = G__7543;
          s__7539 = G__7544;
          continue
        }else {
          return a__7536
        }
        break
      }
    }else {
      var n__2533__auto____7541 = size;
      var i__7542 = 0;
      while(true) {
        if(i__7542 < n__2533__auto____7541) {
          a__7536[i__7542] = init_val_or_seq;
          var G__7545 = i__7542 + 1;
          i__7542 = G__7545;
          continue
        }else {
        }
        break
      }
      return a__7536
    }
  };
  double_array = function(size, init_val_or_seq) {
    switch(arguments.length) {
      case 1:
        return double_array__1.call(this, size);
      case 2:
        return double_array__2.call(this, size, init_val_or_seq)
    }
    throw"Invalid arity: " + arguments.length;
  };
  double_array.cljs$lang$arity$1 = double_array__1;
  double_array.cljs$lang$arity$2 = double_array__2;
  return double_array
}();
cljs.core.object_array = function() {
  var object_array = null;
  var object_array__1 = function(size_or_seq) {
    if(cljs.core.number_QMARK_.call(null, size_or_seq)) {
      return object_array.call(null, size_or_seq, null)
    }else {
      if(cljs.core.seq_QMARK_.call(null, size_or_seq)) {
        return cljs.core.into_array.call(null, size_or_seq)
      }else {
        if("\ufdd0'else") {
          throw new Error("object-array called with something other than size or ISeq");
        }else {
          return null
        }
      }
    }
  };
  var object_array__2 = function(size, init_val_or_seq) {
    var a__7553 = cljs.core.make_array.call(null, size);
    if(cljs.core.seq_QMARK_.call(null, init_val_or_seq)) {
      var s__7554 = cljs.core.seq.call(null, init_val_or_seq);
      var i__7555 = 0;
      var s__7556 = s__7554;
      while(true) {
        if(cljs.core.truth_(function() {
          var and__3822__auto____7557 = s__7556;
          if(and__3822__auto____7557) {
            return i__7555 < size
          }else {
            return and__3822__auto____7557
          }
        }())) {
          a__7553[i__7555] = cljs.core.first.call(null, s__7556);
          var G__7560 = i__7555 + 1;
          var G__7561 = cljs.core.next.call(null, s__7556);
          i__7555 = G__7560;
          s__7556 = G__7561;
          continue
        }else {
          return a__7553
        }
        break
      }
    }else {
      var n__2533__auto____7558 = size;
      var i__7559 = 0;
      while(true) {
        if(i__7559 < n__2533__auto____7558) {
          a__7553[i__7559] = init_val_or_seq;
          var G__7562 = i__7559 + 1;
          i__7559 = G__7562;
          continue
        }else {
        }
        break
      }
      return a__7553
    }
  };
  object_array = function(size, init_val_or_seq) {
    switch(arguments.length) {
      case 1:
        return object_array__1.call(this, size);
      case 2:
        return object_array__2.call(this, size, init_val_or_seq)
    }
    throw"Invalid arity: " + arguments.length;
  };
  object_array.cljs$lang$arity$1 = object_array__1;
  object_array.cljs$lang$arity$2 = object_array__2;
  return object_array
}();
cljs.core.bounded_count = function bounded_count(s, n) {
  if(cljs.core.counted_QMARK_.call(null, s)) {
    return cljs.core.count.call(null, s)
  }else {
    var s__7567 = s;
    var i__7568 = n;
    var sum__7569 = 0;
    while(true) {
      if(cljs.core.truth_(function() {
        var and__3822__auto____7570 = i__7568 > 0;
        if(and__3822__auto____7570) {
          return cljs.core.seq.call(null, s__7567)
        }else {
          return and__3822__auto____7570
        }
      }())) {
        var G__7571 = cljs.core.next.call(null, s__7567);
        var G__7572 = i__7568 - 1;
        var G__7573 = sum__7569 + 1;
        s__7567 = G__7571;
        i__7568 = G__7572;
        sum__7569 = G__7573;
        continue
      }else {
        return sum__7569
      }
      break
    }
  }
};
cljs.core.spread = function spread(arglist) {
  if(arglist == null) {
    return null
  }else {
    if(cljs.core.next.call(null, arglist) == null) {
      return cljs.core.seq.call(null, cljs.core.first.call(null, arglist))
    }else {
      if("\ufdd0'else") {
        return cljs.core.cons.call(null, cljs.core.first.call(null, arglist), spread.call(null, cljs.core.next.call(null, arglist)))
      }else {
        return null
      }
    }
  }
};
cljs.core.concat = function() {
  var concat = null;
  var concat__0 = function() {
    return new cljs.core.LazySeq(null, false, function() {
      return null
    }, null)
  };
  var concat__1 = function(x) {
    return new cljs.core.LazySeq(null, false, function() {
      return x
    }, null)
  };
  var concat__2 = function(x, y) {
    return new cljs.core.LazySeq(null, false, function() {
      var s__7578 = cljs.core.seq.call(null, x);
      if(s__7578) {
        if(cljs.core.chunked_seq_QMARK_.call(null, s__7578)) {
          return cljs.core.chunk_cons.call(null, cljs.core.chunk_first.call(null, s__7578), concat.call(null, cljs.core.chunk_rest.call(null, s__7578), y))
        }else {
          return cljs.core.cons.call(null, cljs.core.first.call(null, s__7578), concat.call(null, cljs.core.rest.call(null, s__7578), y))
        }
      }else {
        return y
      }
    }, null)
  };
  var concat__3 = function() {
    var G__7582__delegate = function(x, y, zs) {
      var cat__7581 = function cat(xys, zs) {
        return new cljs.core.LazySeq(null, false, function() {
          var xys__7580 = cljs.core.seq.call(null, xys);
          if(xys__7580) {
            if(cljs.core.chunked_seq_QMARK_.call(null, xys__7580)) {
              return cljs.core.chunk_cons.call(null, cljs.core.chunk_first.call(null, xys__7580), cat.call(null, cljs.core.chunk_rest.call(null, xys__7580), zs))
            }else {
              return cljs.core.cons.call(null, cljs.core.first.call(null, xys__7580), cat.call(null, cljs.core.rest.call(null, xys__7580), zs))
            }
          }else {
            if(cljs.core.truth_(zs)) {
              return cat.call(null, cljs.core.first.call(null, zs), cljs.core.next.call(null, zs))
            }else {
              return null
            }
          }
        }, null)
      };
      return cat__7581.call(null, concat.call(null, x, y), zs)
    };
    var G__7582 = function(x, y, var_args) {
      var zs = null;
      if(goog.isDef(var_args)) {
        zs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__7582__delegate.call(this, x, y, zs)
    };
    G__7582.cljs$lang$maxFixedArity = 2;
    G__7582.cljs$lang$applyTo = function(arglist__7583) {
      var x = cljs.core.first(arglist__7583);
      var y = cljs.core.first(cljs.core.next(arglist__7583));
      var zs = cljs.core.rest(cljs.core.next(arglist__7583));
      return G__7582__delegate(x, y, zs)
    };
    G__7582.cljs$lang$arity$variadic = G__7582__delegate;
    return G__7582
  }();
  concat = function(x, y, var_args) {
    var zs = var_args;
    switch(arguments.length) {
      case 0:
        return concat__0.call(this);
      case 1:
        return concat__1.call(this, x);
      case 2:
        return concat__2.call(this, x, y);
      default:
        return concat__3.cljs$lang$arity$variadic(x, y, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  concat.cljs$lang$maxFixedArity = 2;
  concat.cljs$lang$applyTo = concat__3.cljs$lang$applyTo;
  concat.cljs$lang$arity$0 = concat__0;
  concat.cljs$lang$arity$1 = concat__1;
  concat.cljs$lang$arity$2 = concat__2;
  concat.cljs$lang$arity$variadic = concat__3.cljs$lang$arity$variadic;
  return concat
}();
cljs.core.list_STAR_ = function() {
  var list_STAR_ = null;
  var list_STAR___1 = function(args) {
    return cljs.core.seq.call(null, args)
  };
  var list_STAR___2 = function(a, args) {
    return cljs.core.cons.call(null, a, args)
  };
  var list_STAR___3 = function(a, b, args) {
    return cljs.core.cons.call(null, a, cljs.core.cons.call(null, b, args))
  };
  var list_STAR___4 = function(a, b, c, args) {
    return cljs.core.cons.call(null, a, cljs.core.cons.call(null, b, cljs.core.cons.call(null, c, args)))
  };
  var list_STAR___5 = function() {
    var G__7584__delegate = function(a, b, c, d, more) {
      return cljs.core.cons.call(null, a, cljs.core.cons.call(null, b, cljs.core.cons.call(null, c, cljs.core.cons.call(null, d, cljs.core.spread.call(null, more)))))
    };
    var G__7584 = function(a, b, c, d, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4), 0)
      }
      return G__7584__delegate.call(this, a, b, c, d, more)
    };
    G__7584.cljs$lang$maxFixedArity = 4;
    G__7584.cljs$lang$applyTo = function(arglist__7585) {
      var a = cljs.core.first(arglist__7585);
      var b = cljs.core.first(cljs.core.next(arglist__7585));
      var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7585)));
      var d = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__7585))));
      var more = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__7585))));
      return G__7584__delegate(a, b, c, d, more)
    };
    G__7584.cljs$lang$arity$variadic = G__7584__delegate;
    return G__7584
  }();
  list_STAR_ = function(a, b, c, d, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return list_STAR___1.call(this, a);
      case 2:
        return list_STAR___2.call(this, a, b);
      case 3:
        return list_STAR___3.call(this, a, b, c);
      case 4:
        return list_STAR___4.call(this, a, b, c, d);
      default:
        return list_STAR___5.cljs$lang$arity$variadic(a, b, c, d, cljs.core.array_seq(arguments, 4))
    }
    throw"Invalid arity: " + arguments.length;
  };
  list_STAR_.cljs$lang$maxFixedArity = 4;
  list_STAR_.cljs$lang$applyTo = list_STAR___5.cljs$lang$applyTo;
  list_STAR_.cljs$lang$arity$1 = list_STAR___1;
  list_STAR_.cljs$lang$arity$2 = list_STAR___2;
  list_STAR_.cljs$lang$arity$3 = list_STAR___3;
  list_STAR_.cljs$lang$arity$4 = list_STAR___4;
  list_STAR_.cljs$lang$arity$variadic = list_STAR___5.cljs$lang$arity$variadic;
  return list_STAR_
}();
cljs.core.transient$ = function transient$(coll) {
  return cljs.core._as_transient.call(null, coll)
};
cljs.core.persistent_BANG_ = function persistent_BANG_(tcoll) {
  return cljs.core._persistent_BANG_.call(null, tcoll)
};
cljs.core.conj_BANG_ = function conj_BANG_(tcoll, val) {
  return cljs.core._conj_BANG_.call(null, tcoll, val)
};
cljs.core.assoc_BANG_ = function assoc_BANG_(tcoll, key, val) {
  return cljs.core._assoc_BANG_.call(null, tcoll, key, val)
};
cljs.core.dissoc_BANG_ = function dissoc_BANG_(tcoll, key) {
  return cljs.core._dissoc_BANG_.call(null, tcoll, key)
};
cljs.core.pop_BANG_ = function pop_BANG_(tcoll) {
  return cljs.core._pop_BANG_.call(null, tcoll)
};
cljs.core.disj_BANG_ = function disj_BANG_(tcoll, val) {
  return cljs.core._disjoin_BANG_.call(null, tcoll, val)
};
cljs.core.apply_to = function apply_to(f, argc, args) {
  var args__7627 = cljs.core.seq.call(null, args);
  if(argc === 0) {
    return f.call(null)
  }else {
    var a__7628 = cljs.core._first.call(null, args__7627);
    var args__7629 = cljs.core._rest.call(null, args__7627);
    if(argc === 1) {
      if(f.cljs$lang$arity$1) {
        return f.cljs$lang$arity$1(a__7628)
      }else {
        return f.call(null, a__7628)
      }
    }else {
      var b__7630 = cljs.core._first.call(null, args__7629);
      var args__7631 = cljs.core._rest.call(null, args__7629);
      if(argc === 2) {
        if(f.cljs$lang$arity$2) {
          return f.cljs$lang$arity$2(a__7628, b__7630)
        }else {
          return f.call(null, a__7628, b__7630)
        }
      }else {
        var c__7632 = cljs.core._first.call(null, args__7631);
        var args__7633 = cljs.core._rest.call(null, args__7631);
        if(argc === 3) {
          if(f.cljs$lang$arity$3) {
            return f.cljs$lang$arity$3(a__7628, b__7630, c__7632)
          }else {
            return f.call(null, a__7628, b__7630, c__7632)
          }
        }else {
          var d__7634 = cljs.core._first.call(null, args__7633);
          var args__7635 = cljs.core._rest.call(null, args__7633);
          if(argc === 4) {
            if(f.cljs$lang$arity$4) {
              return f.cljs$lang$arity$4(a__7628, b__7630, c__7632, d__7634)
            }else {
              return f.call(null, a__7628, b__7630, c__7632, d__7634)
            }
          }else {
            var e__7636 = cljs.core._first.call(null, args__7635);
            var args__7637 = cljs.core._rest.call(null, args__7635);
            if(argc === 5) {
              if(f.cljs$lang$arity$5) {
                return f.cljs$lang$arity$5(a__7628, b__7630, c__7632, d__7634, e__7636)
              }else {
                return f.call(null, a__7628, b__7630, c__7632, d__7634, e__7636)
              }
            }else {
              var f__7638 = cljs.core._first.call(null, args__7637);
              var args__7639 = cljs.core._rest.call(null, args__7637);
              if(argc === 6) {
                if(f__7638.cljs$lang$arity$6) {
                  return f__7638.cljs$lang$arity$6(a__7628, b__7630, c__7632, d__7634, e__7636, f__7638)
                }else {
                  return f__7638.call(null, a__7628, b__7630, c__7632, d__7634, e__7636, f__7638)
                }
              }else {
                var g__7640 = cljs.core._first.call(null, args__7639);
                var args__7641 = cljs.core._rest.call(null, args__7639);
                if(argc === 7) {
                  if(f__7638.cljs$lang$arity$7) {
                    return f__7638.cljs$lang$arity$7(a__7628, b__7630, c__7632, d__7634, e__7636, f__7638, g__7640)
                  }else {
                    return f__7638.call(null, a__7628, b__7630, c__7632, d__7634, e__7636, f__7638, g__7640)
                  }
                }else {
                  var h__7642 = cljs.core._first.call(null, args__7641);
                  var args__7643 = cljs.core._rest.call(null, args__7641);
                  if(argc === 8) {
                    if(f__7638.cljs$lang$arity$8) {
                      return f__7638.cljs$lang$arity$8(a__7628, b__7630, c__7632, d__7634, e__7636, f__7638, g__7640, h__7642)
                    }else {
                      return f__7638.call(null, a__7628, b__7630, c__7632, d__7634, e__7636, f__7638, g__7640, h__7642)
                    }
                  }else {
                    var i__7644 = cljs.core._first.call(null, args__7643);
                    var args__7645 = cljs.core._rest.call(null, args__7643);
                    if(argc === 9) {
                      if(f__7638.cljs$lang$arity$9) {
                        return f__7638.cljs$lang$arity$9(a__7628, b__7630, c__7632, d__7634, e__7636, f__7638, g__7640, h__7642, i__7644)
                      }else {
                        return f__7638.call(null, a__7628, b__7630, c__7632, d__7634, e__7636, f__7638, g__7640, h__7642, i__7644)
                      }
                    }else {
                      var j__7646 = cljs.core._first.call(null, args__7645);
                      var args__7647 = cljs.core._rest.call(null, args__7645);
                      if(argc === 10) {
                        if(f__7638.cljs$lang$arity$10) {
                          return f__7638.cljs$lang$arity$10(a__7628, b__7630, c__7632, d__7634, e__7636, f__7638, g__7640, h__7642, i__7644, j__7646)
                        }else {
                          return f__7638.call(null, a__7628, b__7630, c__7632, d__7634, e__7636, f__7638, g__7640, h__7642, i__7644, j__7646)
                        }
                      }else {
                        var k__7648 = cljs.core._first.call(null, args__7647);
                        var args__7649 = cljs.core._rest.call(null, args__7647);
                        if(argc === 11) {
                          if(f__7638.cljs$lang$arity$11) {
                            return f__7638.cljs$lang$arity$11(a__7628, b__7630, c__7632, d__7634, e__7636, f__7638, g__7640, h__7642, i__7644, j__7646, k__7648)
                          }else {
                            return f__7638.call(null, a__7628, b__7630, c__7632, d__7634, e__7636, f__7638, g__7640, h__7642, i__7644, j__7646, k__7648)
                          }
                        }else {
                          var l__7650 = cljs.core._first.call(null, args__7649);
                          var args__7651 = cljs.core._rest.call(null, args__7649);
                          if(argc === 12) {
                            if(f__7638.cljs$lang$arity$12) {
                              return f__7638.cljs$lang$arity$12(a__7628, b__7630, c__7632, d__7634, e__7636, f__7638, g__7640, h__7642, i__7644, j__7646, k__7648, l__7650)
                            }else {
                              return f__7638.call(null, a__7628, b__7630, c__7632, d__7634, e__7636, f__7638, g__7640, h__7642, i__7644, j__7646, k__7648, l__7650)
                            }
                          }else {
                            var m__7652 = cljs.core._first.call(null, args__7651);
                            var args__7653 = cljs.core._rest.call(null, args__7651);
                            if(argc === 13) {
                              if(f__7638.cljs$lang$arity$13) {
                                return f__7638.cljs$lang$arity$13(a__7628, b__7630, c__7632, d__7634, e__7636, f__7638, g__7640, h__7642, i__7644, j__7646, k__7648, l__7650, m__7652)
                              }else {
                                return f__7638.call(null, a__7628, b__7630, c__7632, d__7634, e__7636, f__7638, g__7640, h__7642, i__7644, j__7646, k__7648, l__7650, m__7652)
                              }
                            }else {
                              var n__7654 = cljs.core._first.call(null, args__7653);
                              var args__7655 = cljs.core._rest.call(null, args__7653);
                              if(argc === 14) {
                                if(f__7638.cljs$lang$arity$14) {
                                  return f__7638.cljs$lang$arity$14(a__7628, b__7630, c__7632, d__7634, e__7636, f__7638, g__7640, h__7642, i__7644, j__7646, k__7648, l__7650, m__7652, n__7654)
                                }else {
                                  return f__7638.call(null, a__7628, b__7630, c__7632, d__7634, e__7636, f__7638, g__7640, h__7642, i__7644, j__7646, k__7648, l__7650, m__7652, n__7654)
                                }
                              }else {
                                var o__7656 = cljs.core._first.call(null, args__7655);
                                var args__7657 = cljs.core._rest.call(null, args__7655);
                                if(argc === 15) {
                                  if(f__7638.cljs$lang$arity$15) {
                                    return f__7638.cljs$lang$arity$15(a__7628, b__7630, c__7632, d__7634, e__7636, f__7638, g__7640, h__7642, i__7644, j__7646, k__7648, l__7650, m__7652, n__7654, o__7656)
                                  }else {
                                    return f__7638.call(null, a__7628, b__7630, c__7632, d__7634, e__7636, f__7638, g__7640, h__7642, i__7644, j__7646, k__7648, l__7650, m__7652, n__7654, o__7656)
                                  }
                                }else {
                                  var p__7658 = cljs.core._first.call(null, args__7657);
                                  var args__7659 = cljs.core._rest.call(null, args__7657);
                                  if(argc === 16) {
                                    if(f__7638.cljs$lang$arity$16) {
                                      return f__7638.cljs$lang$arity$16(a__7628, b__7630, c__7632, d__7634, e__7636, f__7638, g__7640, h__7642, i__7644, j__7646, k__7648, l__7650, m__7652, n__7654, o__7656, p__7658)
                                    }else {
                                      return f__7638.call(null, a__7628, b__7630, c__7632, d__7634, e__7636, f__7638, g__7640, h__7642, i__7644, j__7646, k__7648, l__7650, m__7652, n__7654, o__7656, p__7658)
                                    }
                                  }else {
                                    var q__7660 = cljs.core._first.call(null, args__7659);
                                    var args__7661 = cljs.core._rest.call(null, args__7659);
                                    if(argc === 17) {
                                      if(f__7638.cljs$lang$arity$17) {
                                        return f__7638.cljs$lang$arity$17(a__7628, b__7630, c__7632, d__7634, e__7636, f__7638, g__7640, h__7642, i__7644, j__7646, k__7648, l__7650, m__7652, n__7654, o__7656, p__7658, q__7660)
                                      }else {
                                        return f__7638.call(null, a__7628, b__7630, c__7632, d__7634, e__7636, f__7638, g__7640, h__7642, i__7644, j__7646, k__7648, l__7650, m__7652, n__7654, o__7656, p__7658, q__7660)
                                      }
                                    }else {
                                      var r__7662 = cljs.core._first.call(null, args__7661);
                                      var args__7663 = cljs.core._rest.call(null, args__7661);
                                      if(argc === 18) {
                                        if(f__7638.cljs$lang$arity$18) {
                                          return f__7638.cljs$lang$arity$18(a__7628, b__7630, c__7632, d__7634, e__7636, f__7638, g__7640, h__7642, i__7644, j__7646, k__7648, l__7650, m__7652, n__7654, o__7656, p__7658, q__7660, r__7662)
                                        }else {
                                          return f__7638.call(null, a__7628, b__7630, c__7632, d__7634, e__7636, f__7638, g__7640, h__7642, i__7644, j__7646, k__7648, l__7650, m__7652, n__7654, o__7656, p__7658, q__7660, r__7662)
                                        }
                                      }else {
                                        var s__7664 = cljs.core._first.call(null, args__7663);
                                        var args__7665 = cljs.core._rest.call(null, args__7663);
                                        if(argc === 19) {
                                          if(f__7638.cljs$lang$arity$19) {
                                            return f__7638.cljs$lang$arity$19(a__7628, b__7630, c__7632, d__7634, e__7636, f__7638, g__7640, h__7642, i__7644, j__7646, k__7648, l__7650, m__7652, n__7654, o__7656, p__7658, q__7660, r__7662, s__7664)
                                          }else {
                                            return f__7638.call(null, a__7628, b__7630, c__7632, d__7634, e__7636, f__7638, g__7640, h__7642, i__7644, j__7646, k__7648, l__7650, m__7652, n__7654, o__7656, p__7658, q__7660, r__7662, s__7664)
                                          }
                                        }else {
                                          var t__7666 = cljs.core._first.call(null, args__7665);
                                          var args__7667 = cljs.core._rest.call(null, args__7665);
                                          if(argc === 20) {
                                            if(f__7638.cljs$lang$arity$20) {
                                              return f__7638.cljs$lang$arity$20(a__7628, b__7630, c__7632, d__7634, e__7636, f__7638, g__7640, h__7642, i__7644, j__7646, k__7648, l__7650, m__7652, n__7654, o__7656, p__7658, q__7660, r__7662, s__7664, t__7666)
                                            }else {
                                              return f__7638.call(null, a__7628, b__7630, c__7632, d__7634, e__7636, f__7638, g__7640, h__7642, i__7644, j__7646, k__7648, l__7650, m__7652, n__7654, o__7656, p__7658, q__7660, r__7662, s__7664, t__7666)
                                            }
                                          }else {
                                            throw new Error("Only up to 20 arguments supported on functions");
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};
cljs.core.apply = function() {
  var apply = null;
  var apply__2 = function(f, args) {
    var fixed_arity__7682 = f.cljs$lang$maxFixedArity;
    if(cljs.core.truth_(f.cljs$lang$applyTo)) {
      var bc__7683 = cljs.core.bounded_count.call(null, args, fixed_arity__7682 + 1);
      if(bc__7683 <= fixed_arity__7682) {
        return cljs.core.apply_to.call(null, f, bc__7683, args)
      }else {
        return f.cljs$lang$applyTo(args)
      }
    }else {
      return f.apply(f, cljs.core.to_array.call(null, args))
    }
  };
  var apply__3 = function(f, x, args) {
    var arglist__7684 = cljs.core.list_STAR_.call(null, x, args);
    var fixed_arity__7685 = f.cljs$lang$maxFixedArity;
    if(cljs.core.truth_(f.cljs$lang$applyTo)) {
      var bc__7686 = cljs.core.bounded_count.call(null, arglist__7684, fixed_arity__7685 + 1);
      if(bc__7686 <= fixed_arity__7685) {
        return cljs.core.apply_to.call(null, f, bc__7686, arglist__7684)
      }else {
        return f.cljs$lang$applyTo(arglist__7684)
      }
    }else {
      return f.apply(f, cljs.core.to_array.call(null, arglist__7684))
    }
  };
  var apply__4 = function(f, x, y, args) {
    var arglist__7687 = cljs.core.list_STAR_.call(null, x, y, args);
    var fixed_arity__7688 = f.cljs$lang$maxFixedArity;
    if(cljs.core.truth_(f.cljs$lang$applyTo)) {
      var bc__7689 = cljs.core.bounded_count.call(null, arglist__7687, fixed_arity__7688 + 1);
      if(bc__7689 <= fixed_arity__7688) {
        return cljs.core.apply_to.call(null, f, bc__7689, arglist__7687)
      }else {
        return f.cljs$lang$applyTo(arglist__7687)
      }
    }else {
      return f.apply(f, cljs.core.to_array.call(null, arglist__7687))
    }
  };
  var apply__5 = function(f, x, y, z, args) {
    var arglist__7690 = cljs.core.list_STAR_.call(null, x, y, z, args);
    var fixed_arity__7691 = f.cljs$lang$maxFixedArity;
    if(cljs.core.truth_(f.cljs$lang$applyTo)) {
      var bc__7692 = cljs.core.bounded_count.call(null, arglist__7690, fixed_arity__7691 + 1);
      if(bc__7692 <= fixed_arity__7691) {
        return cljs.core.apply_to.call(null, f, bc__7692, arglist__7690)
      }else {
        return f.cljs$lang$applyTo(arglist__7690)
      }
    }else {
      return f.apply(f, cljs.core.to_array.call(null, arglist__7690))
    }
  };
  var apply__6 = function() {
    var G__7696__delegate = function(f, a, b, c, d, args) {
      var arglist__7693 = cljs.core.cons.call(null, a, cljs.core.cons.call(null, b, cljs.core.cons.call(null, c, cljs.core.cons.call(null, d, cljs.core.spread.call(null, args)))));
      var fixed_arity__7694 = f.cljs$lang$maxFixedArity;
      if(cljs.core.truth_(f.cljs$lang$applyTo)) {
        var bc__7695 = cljs.core.bounded_count.call(null, arglist__7693, fixed_arity__7694 + 1);
        if(bc__7695 <= fixed_arity__7694) {
          return cljs.core.apply_to.call(null, f, bc__7695, arglist__7693)
        }else {
          return f.cljs$lang$applyTo(arglist__7693)
        }
      }else {
        return f.apply(f, cljs.core.to_array.call(null, arglist__7693))
      }
    };
    var G__7696 = function(f, a, b, c, d, var_args) {
      var args = null;
      if(goog.isDef(var_args)) {
        args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 5), 0)
      }
      return G__7696__delegate.call(this, f, a, b, c, d, args)
    };
    G__7696.cljs$lang$maxFixedArity = 5;
    G__7696.cljs$lang$applyTo = function(arglist__7697) {
      var f = cljs.core.first(arglist__7697);
      var a = cljs.core.first(cljs.core.next(arglist__7697));
      var b = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7697)));
      var c = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__7697))));
      var d = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__7697)))));
      var args = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__7697)))));
      return G__7696__delegate(f, a, b, c, d, args)
    };
    G__7696.cljs$lang$arity$variadic = G__7696__delegate;
    return G__7696
  }();
  apply = function(f, a, b, c, d, var_args) {
    var args = var_args;
    switch(arguments.length) {
      case 2:
        return apply__2.call(this, f, a);
      case 3:
        return apply__3.call(this, f, a, b);
      case 4:
        return apply__4.call(this, f, a, b, c);
      case 5:
        return apply__5.call(this, f, a, b, c, d);
      default:
        return apply__6.cljs$lang$arity$variadic(f, a, b, c, d, cljs.core.array_seq(arguments, 5))
    }
    throw"Invalid arity: " + arguments.length;
  };
  apply.cljs$lang$maxFixedArity = 5;
  apply.cljs$lang$applyTo = apply__6.cljs$lang$applyTo;
  apply.cljs$lang$arity$2 = apply__2;
  apply.cljs$lang$arity$3 = apply__3;
  apply.cljs$lang$arity$4 = apply__4;
  apply.cljs$lang$arity$5 = apply__5;
  apply.cljs$lang$arity$variadic = apply__6.cljs$lang$arity$variadic;
  return apply
}();
cljs.core.vary_meta = function() {
  var vary_meta__delegate = function(obj, f, args) {
    return cljs.core.with_meta.call(null, obj, cljs.core.apply.call(null, f, cljs.core.meta.call(null, obj), args))
  };
  var vary_meta = function(obj, f, var_args) {
    var args = null;
    if(goog.isDef(var_args)) {
      args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
    }
    return vary_meta__delegate.call(this, obj, f, args)
  };
  vary_meta.cljs$lang$maxFixedArity = 2;
  vary_meta.cljs$lang$applyTo = function(arglist__7698) {
    var obj = cljs.core.first(arglist__7698);
    var f = cljs.core.first(cljs.core.next(arglist__7698));
    var args = cljs.core.rest(cljs.core.next(arglist__7698));
    return vary_meta__delegate(obj, f, args)
  };
  vary_meta.cljs$lang$arity$variadic = vary_meta__delegate;
  return vary_meta
}();
cljs.core.not_EQ_ = function() {
  var not_EQ_ = null;
  var not_EQ___1 = function(x) {
    return false
  };
  var not_EQ___2 = function(x, y) {
    return!cljs.core._EQ_.call(null, x, y)
  };
  var not_EQ___3 = function() {
    var G__7699__delegate = function(x, y, more) {
      return cljs.core.not.call(null, cljs.core.apply.call(null, cljs.core._EQ_, x, y, more))
    };
    var G__7699 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__7699__delegate.call(this, x, y, more)
    };
    G__7699.cljs$lang$maxFixedArity = 2;
    G__7699.cljs$lang$applyTo = function(arglist__7700) {
      var x = cljs.core.first(arglist__7700);
      var y = cljs.core.first(cljs.core.next(arglist__7700));
      var more = cljs.core.rest(cljs.core.next(arglist__7700));
      return G__7699__delegate(x, y, more)
    };
    G__7699.cljs$lang$arity$variadic = G__7699__delegate;
    return G__7699
  }();
  not_EQ_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return not_EQ___1.call(this, x);
      case 2:
        return not_EQ___2.call(this, x, y);
      default:
        return not_EQ___3.cljs$lang$arity$variadic(x, y, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  not_EQ_.cljs$lang$maxFixedArity = 2;
  not_EQ_.cljs$lang$applyTo = not_EQ___3.cljs$lang$applyTo;
  not_EQ_.cljs$lang$arity$1 = not_EQ___1;
  not_EQ_.cljs$lang$arity$2 = not_EQ___2;
  not_EQ_.cljs$lang$arity$variadic = not_EQ___3.cljs$lang$arity$variadic;
  return not_EQ_
}();
cljs.core.not_empty = function not_empty(coll) {
  if(cljs.core.seq.call(null, coll)) {
    return coll
  }else {
    return null
  }
};
cljs.core.every_QMARK_ = function every_QMARK_(pred, coll) {
  while(true) {
    if(cljs.core.seq.call(null, coll) == null) {
      return true
    }else {
      if(cljs.core.truth_(pred.call(null, cljs.core.first.call(null, coll)))) {
        var G__7701 = pred;
        var G__7702 = cljs.core.next.call(null, coll);
        pred = G__7701;
        coll = G__7702;
        continue
      }else {
        if("\ufdd0'else") {
          return false
        }else {
          return null
        }
      }
    }
    break
  }
};
cljs.core.not_every_QMARK_ = function not_every_QMARK_(pred, coll) {
  return!cljs.core.every_QMARK_.call(null, pred, coll)
};
cljs.core.some = function some(pred, coll) {
  while(true) {
    if(cljs.core.seq.call(null, coll)) {
      var or__3824__auto____7704 = pred.call(null, cljs.core.first.call(null, coll));
      if(cljs.core.truth_(or__3824__auto____7704)) {
        return or__3824__auto____7704
      }else {
        var G__7705 = pred;
        var G__7706 = cljs.core.next.call(null, coll);
        pred = G__7705;
        coll = G__7706;
        continue
      }
    }else {
      return null
    }
    break
  }
};
cljs.core.not_any_QMARK_ = function not_any_QMARK_(pred, coll) {
  return cljs.core.not.call(null, cljs.core.some.call(null, pred, coll))
};
cljs.core.even_QMARK_ = function even_QMARK_(n) {
  if(cljs.core.integer_QMARK_.call(null, n)) {
    return(n & 1) === 0
  }else {
    throw new Error([cljs.core.str("Argument must be an integer: "), cljs.core.str(n)].join(""));
  }
};
cljs.core.odd_QMARK_ = function odd_QMARK_(n) {
  return!cljs.core.even_QMARK_.call(null, n)
};
cljs.core.identity = function identity(x) {
  return x
};
cljs.core.complement = function complement(f) {
  return function() {
    var G__7707 = null;
    var G__7707__0 = function() {
      return cljs.core.not.call(null, f.call(null))
    };
    var G__7707__1 = function(x) {
      return cljs.core.not.call(null, f.call(null, x))
    };
    var G__7707__2 = function(x, y) {
      return cljs.core.not.call(null, f.call(null, x, y))
    };
    var G__7707__3 = function() {
      var G__7708__delegate = function(x, y, zs) {
        return cljs.core.not.call(null, cljs.core.apply.call(null, f, x, y, zs))
      };
      var G__7708 = function(x, y, var_args) {
        var zs = null;
        if(goog.isDef(var_args)) {
          zs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
        }
        return G__7708__delegate.call(this, x, y, zs)
      };
      G__7708.cljs$lang$maxFixedArity = 2;
      G__7708.cljs$lang$applyTo = function(arglist__7709) {
        var x = cljs.core.first(arglist__7709);
        var y = cljs.core.first(cljs.core.next(arglist__7709));
        var zs = cljs.core.rest(cljs.core.next(arglist__7709));
        return G__7708__delegate(x, y, zs)
      };
      G__7708.cljs$lang$arity$variadic = G__7708__delegate;
      return G__7708
    }();
    G__7707 = function(x, y, var_args) {
      var zs = var_args;
      switch(arguments.length) {
        case 0:
          return G__7707__0.call(this);
        case 1:
          return G__7707__1.call(this, x);
        case 2:
          return G__7707__2.call(this, x, y);
        default:
          return G__7707__3.cljs$lang$arity$variadic(x, y, cljs.core.array_seq(arguments, 2))
      }
      throw"Invalid arity: " + arguments.length;
    };
    G__7707.cljs$lang$maxFixedArity = 2;
    G__7707.cljs$lang$applyTo = G__7707__3.cljs$lang$applyTo;
    return G__7707
  }()
};
cljs.core.constantly = function constantly(x) {
  return function() {
    var G__7710__delegate = function(args) {
      return x
    };
    var G__7710 = function(var_args) {
      var args = null;
      if(goog.isDef(var_args)) {
        args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
      }
      return G__7710__delegate.call(this, args)
    };
    G__7710.cljs$lang$maxFixedArity = 0;
    G__7710.cljs$lang$applyTo = function(arglist__7711) {
      var args = cljs.core.seq(arglist__7711);
      return G__7710__delegate(args)
    };
    G__7710.cljs$lang$arity$variadic = G__7710__delegate;
    return G__7710
  }()
};
cljs.core.comp = function() {
  var comp = null;
  var comp__0 = function() {
    return cljs.core.identity
  };
  var comp__1 = function(f) {
    return f
  };
  var comp__2 = function(f, g) {
    return function() {
      var G__7718 = null;
      var G__7718__0 = function() {
        return f.call(null, g.call(null))
      };
      var G__7718__1 = function(x) {
        return f.call(null, g.call(null, x))
      };
      var G__7718__2 = function(x, y) {
        return f.call(null, g.call(null, x, y))
      };
      var G__7718__3 = function(x, y, z) {
        return f.call(null, g.call(null, x, y, z))
      };
      var G__7718__4 = function() {
        var G__7719__delegate = function(x, y, z, args) {
          return f.call(null, cljs.core.apply.call(null, g, x, y, z, args))
        };
        var G__7719 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__7719__delegate.call(this, x, y, z, args)
        };
        G__7719.cljs$lang$maxFixedArity = 3;
        G__7719.cljs$lang$applyTo = function(arglist__7720) {
          var x = cljs.core.first(arglist__7720);
          var y = cljs.core.first(cljs.core.next(arglist__7720));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7720)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7720)));
          return G__7719__delegate(x, y, z, args)
        };
        G__7719.cljs$lang$arity$variadic = G__7719__delegate;
        return G__7719
      }();
      G__7718 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return G__7718__0.call(this);
          case 1:
            return G__7718__1.call(this, x);
          case 2:
            return G__7718__2.call(this, x, y);
          case 3:
            return G__7718__3.call(this, x, y, z);
          default:
            return G__7718__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
        }
        throw"Invalid arity: " + arguments.length;
      };
      G__7718.cljs$lang$maxFixedArity = 3;
      G__7718.cljs$lang$applyTo = G__7718__4.cljs$lang$applyTo;
      return G__7718
    }()
  };
  var comp__3 = function(f, g, h) {
    return function() {
      var G__7721 = null;
      var G__7721__0 = function() {
        return f.call(null, g.call(null, h.call(null)))
      };
      var G__7721__1 = function(x) {
        return f.call(null, g.call(null, h.call(null, x)))
      };
      var G__7721__2 = function(x, y) {
        return f.call(null, g.call(null, h.call(null, x, y)))
      };
      var G__7721__3 = function(x, y, z) {
        return f.call(null, g.call(null, h.call(null, x, y, z)))
      };
      var G__7721__4 = function() {
        var G__7722__delegate = function(x, y, z, args) {
          return f.call(null, g.call(null, cljs.core.apply.call(null, h, x, y, z, args)))
        };
        var G__7722 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__7722__delegate.call(this, x, y, z, args)
        };
        G__7722.cljs$lang$maxFixedArity = 3;
        G__7722.cljs$lang$applyTo = function(arglist__7723) {
          var x = cljs.core.first(arglist__7723);
          var y = cljs.core.first(cljs.core.next(arglist__7723));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7723)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7723)));
          return G__7722__delegate(x, y, z, args)
        };
        G__7722.cljs$lang$arity$variadic = G__7722__delegate;
        return G__7722
      }();
      G__7721 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return G__7721__0.call(this);
          case 1:
            return G__7721__1.call(this, x);
          case 2:
            return G__7721__2.call(this, x, y);
          case 3:
            return G__7721__3.call(this, x, y, z);
          default:
            return G__7721__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
        }
        throw"Invalid arity: " + arguments.length;
      };
      G__7721.cljs$lang$maxFixedArity = 3;
      G__7721.cljs$lang$applyTo = G__7721__4.cljs$lang$applyTo;
      return G__7721
    }()
  };
  var comp__4 = function() {
    var G__7724__delegate = function(f1, f2, f3, fs) {
      var fs__7715 = cljs.core.reverse.call(null, cljs.core.list_STAR_.call(null, f1, f2, f3, fs));
      return function() {
        var G__7725__delegate = function(args) {
          var ret__7716 = cljs.core.apply.call(null, cljs.core.first.call(null, fs__7715), args);
          var fs__7717 = cljs.core.next.call(null, fs__7715);
          while(true) {
            if(fs__7717) {
              var G__7726 = cljs.core.first.call(null, fs__7717).call(null, ret__7716);
              var G__7727 = cljs.core.next.call(null, fs__7717);
              ret__7716 = G__7726;
              fs__7717 = G__7727;
              continue
            }else {
              return ret__7716
            }
            break
          }
        };
        var G__7725 = function(var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
          }
          return G__7725__delegate.call(this, args)
        };
        G__7725.cljs$lang$maxFixedArity = 0;
        G__7725.cljs$lang$applyTo = function(arglist__7728) {
          var args = cljs.core.seq(arglist__7728);
          return G__7725__delegate(args)
        };
        G__7725.cljs$lang$arity$variadic = G__7725__delegate;
        return G__7725
      }()
    };
    var G__7724 = function(f1, f2, f3, var_args) {
      var fs = null;
      if(goog.isDef(var_args)) {
        fs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
      }
      return G__7724__delegate.call(this, f1, f2, f3, fs)
    };
    G__7724.cljs$lang$maxFixedArity = 3;
    G__7724.cljs$lang$applyTo = function(arglist__7729) {
      var f1 = cljs.core.first(arglist__7729);
      var f2 = cljs.core.first(cljs.core.next(arglist__7729));
      var f3 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7729)));
      var fs = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7729)));
      return G__7724__delegate(f1, f2, f3, fs)
    };
    G__7724.cljs$lang$arity$variadic = G__7724__delegate;
    return G__7724
  }();
  comp = function(f1, f2, f3, var_args) {
    var fs = var_args;
    switch(arguments.length) {
      case 0:
        return comp__0.call(this);
      case 1:
        return comp__1.call(this, f1);
      case 2:
        return comp__2.call(this, f1, f2);
      case 3:
        return comp__3.call(this, f1, f2, f3);
      default:
        return comp__4.cljs$lang$arity$variadic(f1, f2, f3, cljs.core.array_seq(arguments, 3))
    }
    throw"Invalid arity: " + arguments.length;
  };
  comp.cljs$lang$maxFixedArity = 3;
  comp.cljs$lang$applyTo = comp__4.cljs$lang$applyTo;
  comp.cljs$lang$arity$0 = comp__0;
  comp.cljs$lang$arity$1 = comp__1;
  comp.cljs$lang$arity$2 = comp__2;
  comp.cljs$lang$arity$3 = comp__3;
  comp.cljs$lang$arity$variadic = comp__4.cljs$lang$arity$variadic;
  return comp
}();
cljs.core.partial = function() {
  var partial = null;
  var partial__2 = function(f, arg1) {
    return function() {
      var G__7730__delegate = function(args) {
        return cljs.core.apply.call(null, f, arg1, args)
      };
      var G__7730 = function(var_args) {
        var args = null;
        if(goog.isDef(var_args)) {
          args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
        }
        return G__7730__delegate.call(this, args)
      };
      G__7730.cljs$lang$maxFixedArity = 0;
      G__7730.cljs$lang$applyTo = function(arglist__7731) {
        var args = cljs.core.seq(arglist__7731);
        return G__7730__delegate(args)
      };
      G__7730.cljs$lang$arity$variadic = G__7730__delegate;
      return G__7730
    }()
  };
  var partial__3 = function(f, arg1, arg2) {
    return function() {
      var G__7732__delegate = function(args) {
        return cljs.core.apply.call(null, f, arg1, arg2, args)
      };
      var G__7732 = function(var_args) {
        var args = null;
        if(goog.isDef(var_args)) {
          args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
        }
        return G__7732__delegate.call(this, args)
      };
      G__7732.cljs$lang$maxFixedArity = 0;
      G__7732.cljs$lang$applyTo = function(arglist__7733) {
        var args = cljs.core.seq(arglist__7733);
        return G__7732__delegate(args)
      };
      G__7732.cljs$lang$arity$variadic = G__7732__delegate;
      return G__7732
    }()
  };
  var partial__4 = function(f, arg1, arg2, arg3) {
    return function() {
      var G__7734__delegate = function(args) {
        return cljs.core.apply.call(null, f, arg1, arg2, arg3, args)
      };
      var G__7734 = function(var_args) {
        var args = null;
        if(goog.isDef(var_args)) {
          args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
        }
        return G__7734__delegate.call(this, args)
      };
      G__7734.cljs$lang$maxFixedArity = 0;
      G__7734.cljs$lang$applyTo = function(arglist__7735) {
        var args = cljs.core.seq(arglist__7735);
        return G__7734__delegate(args)
      };
      G__7734.cljs$lang$arity$variadic = G__7734__delegate;
      return G__7734
    }()
  };
  var partial__5 = function() {
    var G__7736__delegate = function(f, arg1, arg2, arg3, more) {
      return function() {
        var G__7737__delegate = function(args) {
          return cljs.core.apply.call(null, f, arg1, arg2, arg3, cljs.core.concat.call(null, more, args))
        };
        var G__7737 = function(var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
          }
          return G__7737__delegate.call(this, args)
        };
        G__7737.cljs$lang$maxFixedArity = 0;
        G__7737.cljs$lang$applyTo = function(arglist__7738) {
          var args = cljs.core.seq(arglist__7738);
          return G__7737__delegate(args)
        };
        G__7737.cljs$lang$arity$variadic = G__7737__delegate;
        return G__7737
      }()
    };
    var G__7736 = function(f, arg1, arg2, arg3, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4), 0)
      }
      return G__7736__delegate.call(this, f, arg1, arg2, arg3, more)
    };
    G__7736.cljs$lang$maxFixedArity = 4;
    G__7736.cljs$lang$applyTo = function(arglist__7739) {
      var f = cljs.core.first(arglist__7739);
      var arg1 = cljs.core.first(cljs.core.next(arglist__7739));
      var arg2 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7739)));
      var arg3 = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__7739))));
      var more = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__7739))));
      return G__7736__delegate(f, arg1, arg2, arg3, more)
    };
    G__7736.cljs$lang$arity$variadic = G__7736__delegate;
    return G__7736
  }();
  partial = function(f, arg1, arg2, arg3, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 2:
        return partial__2.call(this, f, arg1);
      case 3:
        return partial__3.call(this, f, arg1, arg2);
      case 4:
        return partial__4.call(this, f, arg1, arg2, arg3);
      default:
        return partial__5.cljs$lang$arity$variadic(f, arg1, arg2, arg3, cljs.core.array_seq(arguments, 4))
    }
    throw"Invalid arity: " + arguments.length;
  };
  partial.cljs$lang$maxFixedArity = 4;
  partial.cljs$lang$applyTo = partial__5.cljs$lang$applyTo;
  partial.cljs$lang$arity$2 = partial__2;
  partial.cljs$lang$arity$3 = partial__3;
  partial.cljs$lang$arity$4 = partial__4;
  partial.cljs$lang$arity$variadic = partial__5.cljs$lang$arity$variadic;
  return partial
}();
cljs.core.fnil = function() {
  var fnil = null;
  var fnil__2 = function(f, x) {
    return function() {
      var G__7740 = null;
      var G__7740__1 = function(a) {
        return f.call(null, a == null ? x : a)
      };
      var G__7740__2 = function(a, b) {
        return f.call(null, a == null ? x : a, b)
      };
      var G__7740__3 = function(a, b, c) {
        return f.call(null, a == null ? x : a, b, c)
      };
      var G__7740__4 = function() {
        var G__7741__delegate = function(a, b, c, ds) {
          return cljs.core.apply.call(null, f, a == null ? x : a, b, c, ds)
        };
        var G__7741 = function(a, b, c, var_args) {
          var ds = null;
          if(goog.isDef(var_args)) {
            ds = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__7741__delegate.call(this, a, b, c, ds)
        };
        G__7741.cljs$lang$maxFixedArity = 3;
        G__7741.cljs$lang$applyTo = function(arglist__7742) {
          var a = cljs.core.first(arglist__7742);
          var b = cljs.core.first(cljs.core.next(arglist__7742));
          var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7742)));
          var ds = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7742)));
          return G__7741__delegate(a, b, c, ds)
        };
        G__7741.cljs$lang$arity$variadic = G__7741__delegate;
        return G__7741
      }();
      G__7740 = function(a, b, c, var_args) {
        var ds = var_args;
        switch(arguments.length) {
          case 1:
            return G__7740__1.call(this, a);
          case 2:
            return G__7740__2.call(this, a, b);
          case 3:
            return G__7740__3.call(this, a, b, c);
          default:
            return G__7740__4.cljs$lang$arity$variadic(a, b, c, cljs.core.array_seq(arguments, 3))
        }
        throw"Invalid arity: " + arguments.length;
      };
      G__7740.cljs$lang$maxFixedArity = 3;
      G__7740.cljs$lang$applyTo = G__7740__4.cljs$lang$applyTo;
      return G__7740
    }()
  };
  var fnil__3 = function(f, x, y) {
    return function() {
      var G__7743 = null;
      var G__7743__2 = function(a, b) {
        return f.call(null, a == null ? x : a, b == null ? y : b)
      };
      var G__7743__3 = function(a, b, c) {
        return f.call(null, a == null ? x : a, b == null ? y : b, c)
      };
      var G__7743__4 = function() {
        var G__7744__delegate = function(a, b, c, ds) {
          return cljs.core.apply.call(null, f, a == null ? x : a, b == null ? y : b, c, ds)
        };
        var G__7744 = function(a, b, c, var_args) {
          var ds = null;
          if(goog.isDef(var_args)) {
            ds = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__7744__delegate.call(this, a, b, c, ds)
        };
        G__7744.cljs$lang$maxFixedArity = 3;
        G__7744.cljs$lang$applyTo = function(arglist__7745) {
          var a = cljs.core.first(arglist__7745);
          var b = cljs.core.first(cljs.core.next(arglist__7745));
          var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7745)));
          var ds = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7745)));
          return G__7744__delegate(a, b, c, ds)
        };
        G__7744.cljs$lang$arity$variadic = G__7744__delegate;
        return G__7744
      }();
      G__7743 = function(a, b, c, var_args) {
        var ds = var_args;
        switch(arguments.length) {
          case 2:
            return G__7743__2.call(this, a, b);
          case 3:
            return G__7743__3.call(this, a, b, c);
          default:
            return G__7743__4.cljs$lang$arity$variadic(a, b, c, cljs.core.array_seq(arguments, 3))
        }
        throw"Invalid arity: " + arguments.length;
      };
      G__7743.cljs$lang$maxFixedArity = 3;
      G__7743.cljs$lang$applyTo = G__7743__4.cljs$lang$applyTo;
      return G__7743
    }()
  };
  var fnil__4 = function(f, x, y, z) {
    return function() {
      var G__7746 = null;
      var G__7746__2 = function(a, b) {
        return f.call(null, a == null ? x : a, b == null ? y : b)
      };
      var G__7746__3 = function(a, b, c) {
        return f.call(null, a == null ? x : a, b == null ? y : b, c == null ? z : c)
      };
      var G__7746__4 = function() {
        var G__7747__delegate = function(a, b, c, ds) {
          return cljs.core.apply.call(null, f, a == null ? x : a, b == null ? y : b, c == null ? z : c, ds)
        };
        var G__7747 = function(a, b, c, var_args) {
          var ds = null;
          if(goog.isDef(var_args)) {
            ds = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__7747__delegate.call(this, a, b, c, ds)
        };
        G__7747.cljs$lang$maxFixedArity = 3;
        G__7747.cljs$lang$applyTo = function(arglist__7748) {
          var a = cljs.core.first(arglist__7748);
          var b = cljs.core.first(cljs.core.next(arglist__7748));
          var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7748)));
          var ds = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7748)));
          return G__7747__delegate(a, b, c, ds)
        };
        G__7747.cljs$lang$arity$variadic = G__7747__delegate;
        return G__7747
      }();
      G__7746 = function(a, b, c, var_args) {
        var ds = var_args;
        switch(arguments.length) {
          case 2:
            return G__7746__2.call(this, a, b);
          case 3:
            return G__7746__3.call(this, a, b, c);
          default:
            return G__7746__4.cljs$lang$arity$variadic(a, b, c, cljs.core.array_seq(arguments, 3))
        }
        throw"Invalid arity: " + arguments.length;
      };
      G__7746.cljs$lang$maxFixedArity = 3;
      G__7746.cljs$lang$applyTo = G__7746__4.cljs$lang$applyTo;
      return G__7746
    }()
  };
  fnil = function(f, x, y, z) {
    switch(arguments.length) {
      case 2:
        return fnil__2.call(this, f, x);
      case 3:
        return fnil__3.call(this, f, x, y);
      case 4:
        return fnil__4.call(this, f, x, y, z)
    }
    throw"Invalid arity: " + arguments.length;
  };
  fnil.cljs$lang$arity$2 = fnil__2;
  fnil.cljs$lang$arity$3 = fnil__3;
  fnil.cljs$lang$arity$4 = fnil__4;
  return fnil
}();
cljs.core.map_indexed = function map_indexed(f, coll) {
  var mapi__7764 = function mapi(idx, coll) {
    return new cljs.core.LazySeq(null, false, function() {
      var temp__3974__auto____7772 = cljs.core.seq.call(null, coll);
      if(temp__3974__auto____7772) {
        var s__7773 = temp__3974__auto____7772;
        if(cljs.core.chunked_seq_QMARK_.call(null, s__7773)) {
          var c__7774 = cljs.core.chunk_first.call(null, s__7773);
          var size__7775 = cljs.core.count.call(null, c__7774);
          var b__7776 = cljs.core.chunk_buffer.call(null, size__7775);
          var n__2533__auto____7777 = size__7775;
          var i__7778 = 0;
          while(true) {
            if(i__7778 < n__2533__auto____7777) {
              cljs.core.chunk_append.call(null, b__7776, f.call(null, idx + i__7778, cljs.core._nth.call(null, c__7774, i__7778)));
              var G__7779 = i__7778 + 1;
              i__7778 = G__7779;
              continue
            }else {
            }
            break
          }
          return cljs.core.chunk_cons.call(null, cljs.core.chunk.call(null, b__7776), mapi.call(null, idx + size__7775, cljs.core.chunk_rest.call(null, s__7773)))
        }else {
          return cljs.core.cons.call(null, f.call(null, idx, cljs.core.first.call(null, s__7773)), mapi.call(null, idx + 1, cljs.core.rest.call(null, s__7773)))
        }
      }else {
        return null
      }
    }, null)
  };
  return mapi__7764.call(null, 0, coll)
};
cljs.core.keep = function keep(f, coll) {
  return new cljs.core.LazySeq(null, false, function() {
    var temp__3974__auto____7789 = cljs.core.seq.call(null, coll);
    if(temp__3974__auto____7789) {
      var s__7790 = temp__3974__auto____7789;
      if(cljs.core.chunked_seq_QMARK_.call(null, s__7790)) {
        var c__7791 = cljs.core.chunk_first.call(null, s__7790);
        var size__7792 = cljs.core.count.call(null, c__7791);
        var b__7793 = cljs.core.chunk_buffer.call(null, size__7792);
        var n__2533__auto____7794 = size__7792;
        var i__7795 = 0;
        while(true) {
          if(i__7795 < n__2533__auto____7794) {
            var x__7796 = f.call(null, cljs.core._nth.call(null, c__7791, i__7795));
            if(x__7796 == null) {
            }else {
              cljs.core.chunk_append.call(null, b__7793, x__7796)
            }
            var G__7798 = i__7795 + 1;
            i__7795 = G__7798;
            continue
          }else {
          }
          break
        }
        return cljs.core.chunk_cons.call(null, cljs.core.chunk.call(null, b__7793), keep.call(null, f, cljs.core.chunk_rest.call(null, s__7790)))
      }else {
        var x__7797 = f.call(null, cljs.core.first.call(null, s__7790));
        if(x__7797 == null) {
          return keep.call(null, f, cljs.core.rest.call(null, s__7790))
        }else {
          return cljs.core.cons.call(null, x__7797, keep.call(null, f, cljs.core.rest.call(null, s__7790)))
        }
      }
    }else {
      return null
    }
  }, null)
};
cljs.core.keep_indexed = function keep_indexed(f, coll) {
  var keepi__7824 = function keepi(idx, coll) {
    return new cljs.core.LazySeq(null, false, function() {
      var temp__3974__auto____7834 = cljs.core.seq.call(null, coll);
      if(temp__3974__auto____7834) {
        var s__7835 = temp__3974__auto____7834;
        if(cljs.core.chunked_seq_QMARK_.call(null, s__7835)) {
          var c__7836 = cljs.core.chunk_first.call(null, s__7835);
          var size__7837 = cljs.core.count.call(null, c__7836);
          var b__7838 = cljs.core.chunk_buffer.call(null, size__7837);
          var n__2533__auto____7839 = size__7837;
          var i__7840 = 0;
          while(true) {
            if(i__7840 < n__2533__auto____7839) {
              var x__7841 = f.call(null, idx + i__7840, cljs.core._nth.call(null, c__7836, i__7840));
              if(x__7841 == null) {
              }else {
                cljs.core.chunk_append.call(null, b__7838, x__7841)
              }
              var G__7843 = i__7840 + 1;
              i__7840 = G__7843;
              continue
            }else {
            }
            break
          }
          return cljs.core.chunk_cons.call(null, cljs.core.chunk.call(null, b__7838), keepi.call(null, idx + size__7837, cljs.core.chunk_rest.call(null, s__7835)))
        }else {
          var x__7842 = f.call(null, idx, cljs.core.first.call(null, s__7835));
          if(x__7842 == null) {
            return keepi.call(null, idx + 1, cljs.core.rest.call(null, s__7835))
          }else {
            return cljs.core.cons.call(null, x__7842, keepi.call(null, idx + 1, cljs.core.rest.call(null, s__7835)))
          }
        }
      }else {
        return null
      }
    }, null)
  };
  return keepi__7824.call(null, 0, coll)
};
cljs.core.every_pred = function() {
  var every_pred = null;
  var every_pred__1 = function(p) {
    return function() {
      var ep1 = null;
      var ep1__0 = function() {
        return true
      };
      var ep1__1 = function(x) {
        return cljs.core.boolean$.call(null, p.call(null, x))
      };
      var ep1__2 = function(x, y) {
        return cljs.core.boolean$.call(null, function() {
          var and__3822__auto____7929 = p.call(null, x);
          if(cljs.core.truth_(and__3822__auto____7929)) {
            return p.call(null, y)
          }else {
            return and__3822__auto____7929
          }
        }())
      };
      var ep1__3 = function(x, y, z) {
        return cljs.core.boolean$.call(null, function() {
          var and__3822__auto____7930 = p.call(null, x);
          if(cljs.core.truth_(and__3822__auto____7930)) {
            var and__3822__auto____7931 = p.call(null, y);
            if(cljs.core.truth_(and__3822__auto____7931)) {
              return p.call(null, z)
            }else {
              return and__3822__auto____7931
            }
          }else {
            return and__3822__auto____7930
          }
        }())
      };
      var ep1__4 = function() {
        var G__8000__delegate = function(x, y, z, args) {
          return cljs.core.boolean$.call(null, function() {
            var and__3822__auto____7932 = ep1.call(null, x, y, z);
            if(cljs.core.truth_(and__3822__auto____7932)) {
              return cljs.core.every_QMARK_.call(null, p, args)
            }else {
              return and__3822__auto____7932
            }
          }())
        };
        var G__8000 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__8000__delegate.call(this, x, y, z, args)
        };
        G__8000.cljs$lang$maxFixedArity = 3;
        G__8000.cljs$lang$applyTo = function(arglist__8001) {
          var x = cljs.core.first(arglist__8001);
          var y = cljs.core.first(cljs.core.next(arglist__8001));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8001)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8001)));
          return G__8000__delegate(x, y, z, args)
        };
        G__8000.cljs$lang$arity$variadic = G__8000__delegate;
        return G__8000
      }();
      ep1 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return ep1__0.call(this);
          case 1:
            return ep1__1.call(this, x);
          case 2:
            return ep1__2.call(this, x, y);
          case 3:
            return ep1__3.call(this, x, y, z);
          default:
            return ep1__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
        }
        throw"Invalid arity: " + arguments.length;
      };
      ep1.cljs$lang$maxFixedArity = 3;
      ep1.cljs$lang$applyTo = ep1__4.cljs$lang$applyTo;
      ep1.cljs$lang$arity$0 = ep1__0;
      ep1.cljs$lang$arity$1 = ep1__1;
      ep1.cljs$lang$arity$2 = ep1__2;
      ep1.cljs$lang$arity$3 = ep1__3;
      ep1.cljs$lang$arity$variadic = ep1__4.cljs$lang$arity$variadic;
      return ep1
    }()
  };
  var every_pred__2 = function(p1, p2) {
    return function() {
      var ep2 = null;
      var ep2__0 = function() {
        return true
      };
      var ep2__1 = function(x) {
        return cljs.core.boolean$.call(null, function() {
          var and__3822__auto____7944 = p1.call(null, x);
          if(cljs.core.truth_(and__3822__auto____7944)) {
            return p2.call(null, x)
          }else {
            return and__3822__auto____7944
          }
        }())
      };
      var ep2__2 = function(x, y) {
        return cljs.core.boolean$.call(null, function() {
          var and__3822__auto____7945 = p1.call(null, x);
          if(cljs.core.truth_(and__3822__auto____7945)) {
            var and__3822__auto____7946 = p1.call(null, y);
            if(cljs.core.truth_(and__3822__auto____7946)) {
              var and__3822__auto____7947 = p2.call(null, x);
              if(cljs.core.truth_(and__3822__auto____7947)) {
                return p2.call(null, y)
              }else {
                return and__3822__auto____7947
              }
            }else {
              return and__3822__auto____7946
            }
          }else {
            return and__3822__auto____7945
          }
        }())
      };
      var ep2__3 = function(x, y, z) {
        return cljs.core.boolean$.call(null, function() {
          var and__3822__auto____7948 = p1.call(null, x);
          if(cljs.core.truth_(and__3822__auto____7948)) {
            var and__3822__auto____7949 = p1.call(null, y);
            if(cljs.core.truth_(and__3822__auto____7949)) {
              var and__3822__auto____7950 = p1.call(null, z);
              if(cljs.core.truth_(and__3822__auto____7950)) {
                var and__3822__auto____7951 = p2.call(null, x);
                if(cljs.core.truth_(and__3822__auto____7951)) {
                  var and__3822__auto____7952 = p2.call(null, y);
                  if(cljs.core.truth_(and__3822__auto____7952)) {
                    return p2.call(null, z)
                  }else {
                    return and__3822__auto____7952
                  }
                }else {
                  return and__3822__auto____7951
                }
              }else {
                return and__3822__auto____7950
              }
            }else {
              return and__3822__auto____7949
            }
          }else {
            return and__3822__auto____7948
          }
        }())
      };
      var ep2__4 = function() {
        var G__8002__delegate = function(x, y, z, args) {
          return cljs.core.boolean$.call(null, function() {
            var and__3822__auto____7953 = ep2.call(null, x, y, z);
            if(cljs.core.truth_(and__3822__auto____7953)) {
              return cljs.core.every_QMARK_.call(null, function(p1__7799_SHARP_) {
                var and__3822__auto____7954 = p1.call(null, p1__7799_SHARP_);
                if(cljs.core.truth_(and__3822__auto____7954)) {
                  return p2.call(null, p1__7799_SHARP_)
                }else {
                  return and__3822__auto____7954
                }
              }, args)
            }else {
              return and__3822__auto____7953
            }
          }())
        };
        var G__8002 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__8002__delegate.call(this, x, y, z, args)
        };
        G__8002.cljs$lang$maxFixedArity = 3;
        G__8002.cljs$lang$applyTo = function(arglist__8003) {
          var x = cljs.core.first(arglist__8003);
          var y = cljs.core.first(cljs.core.next(arglist__8003));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8003)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8003)));
          return G__8002__delegate(x, y, z, args)
        };
        G__8002.cljs$lang$arity$variadic = G__8002__delegate;
        return G__8002
      }();
      ep2 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return ep2__0.call(this);
          case 1:
            return ep2__1.call(this, x);
          case 2:
            return ep2__2.call(this, x, y);
          case 3:
            return ep2__3.call(this, x, y, z);
          default:
            return ep2__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
        }
        throw"Invalid arity: " + arguments.length;
      };
      ep2.cljs$lang$maxFixedArity = 3;
      ep2.cljs$lang$applyTo = ep2__4.cljs$lang$applyTo;
      ep2.cljs$lang$arity$0 = ep2__0;
      ep2.cljs$lang$arity$1 = ep2__1;
      ep2.cljs$lang$arity$2 = ep2__2;
      ep2.cljs$lang$arity$3 = ep2__3;
      ep2.cljs$lang$arity$variadic = ep2__4.cljs$lang$arity$variadic;
      return ep2
    }()
  };
  var every_pred__3 = function(p1, p2, p3) {
    return function() {
      var ep3 = null;
      var ep3__0 = function() {
        return true
      };
      var ep3__1 = function(x) {
        return cljs.core.boolean$.call(null, function() {
          var and__3822__auto____7973 = p1.call(null, x);
          if(cljs.core.truth_(and__3822__auto____7973)) {
            var and__3822__auto____7974 = p2.call(null, x);
            if(cljs.core.truth_(and__3822__auto____7974)) {
              return p3.call(null, x)
            }else {
              return and__3822__auto____7974
            }
          }else {
            return and__3822__auto____7973
          }
        }())
      };
      var ep3__2 = function(x, y) {
        return cljs.core.boolean$.call(null, function() {
          var and__3822__auto____7975 = p1.call(null, x);
          if(cljs.core.truth_(and__3822__auto____7975)) {
            var and__3822__auto____7976 = p2.call(null, x);
            if(cljs.core.truth_(and__3822__auto____7976)) {
              var and__3822__auto____7977 = p3.call(null, x);
              if(cljs.core.truth_(and__3822__auto____7977)) {
                var and__3822__auto____7978 = p1.call(null, y);
                if(cljs.core.truth_(and__3822__auto____7978)) {
                  var and__3822__auto____7979 = p2.call(null, y);
                  if(cljs.core.truth_(and__3822__auto____7979)) {
                    return p3.call(null, y)
                  }else {
                    return and__3822__auto____7979
                  }
                }else {
                  return and__3822__auto____7978
                }
              }else {
                return and__3822__auto____7977
              }
            }else {
              return and__3822__auto____7976
            }
          }else {
            return and__3822__auto____7975
          }
        }())
      };
      var ep3__3 = function(x, y, z) {
        return cljs.core.boolean$.call(null, function() {
          var and__3822__auto____7980 = p1.call(null, x);
          if(cljs.core.truth_(and__3822__auto____7980)) {
            var and__3822__auto____7981 = p2.call(null, x);
            if(cljs.core.truth_(and__3822__auto____7981)) {
              var and__3822__auto____7982 = p3.call(null, x);
              if(cljs.core.truth_(and__3822__auto____7982)) {
                var and__3822__auto____7983 = p1.call(null, y);
                if(cljs.core.truth_(and__3822__auto____7983)) {
                  var and__3822__auto____7984 = p2.call(null, y);
                  if(cljs.core.truth_(and__3822__auto____7984)) {
                    var and__3822__auto____7985 = p3.call(null, y);
                    if(cljs.core.truth_(and__3822__auto____7985)) {
                      var and__3822__auto____7986 = p1.call(null, z);
                      if(cljs.core.truth_(and__3822__auto____7986)) {
                        var and__3822__auto____7987 = p2.call(null, z);
                        if(cljs.core.truth_(and__3822__auto____7987)) {
                          return p3.call(null, z)
                        }else {
                          return and__3822__auto____7987
                        }
                      }else {
                        return and__3822__auto____7986
                      }
                    }else {
                      return and__3822__auto____7985
                    }
                  }else {
                    return and__3822__auto____7984
                  }
                }else {
                  return and__3822__auto____7983
                }
              }else {
                return and__3822__auto____7982
              }
            }else {
              return and__3822__auto____7981
            }
          }else {
            return and__3822__auto____7980
          }
        }())
      };
      var ep3__4 = function() {
        var G__8004__delegate = function(x, y, z, args) {
          return cljs.core.boolean$.call(null, function() {
            var and__3822__auto____7988 = ep3.call(null, x, y, z);
            if(cljs.core.truth_(and__3822__auto____7988)) {
              return cljs.core.every_QMARK_.call(null, function(p1__7800_SHARP_) {
                var and__3822__auto____7989 = p1.call(null, p1__7800_SHARP_);
                if(cljs.core.truth_(and__3822__auto____7989)) {
                  var and__3822__auto____7990 = p2.call(null, p1__7800_SHARP_);
                  if(cljs.core.truth_(and__3822__auto____7990)) {
                    return p3.call(null, p1__7800_SHARP_)
                  }else {
                    return and__3822__auto____7990
                  }
                }else {
                  return and__3822__auto____7989
                }
              }, args)
            }else {
              return and__3822__auto____7988
            }
          }())
        };
        var G__8004 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__8004__delegate.call(this, x, y, z, args)
        };
        G__8004.cljs$lang$maxFixedArity = 3;
        G__8004.cljs$lang$applyTo = function(arglist__8005) {
          var x = cljs.core.first(arglist__8005);
          var y = cljs.core.first(cljs.core.next(arglist__8005));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8005)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8005)));
          return G__8004__delegate(x, y, z, args)
        };
        G__8004.cljs$lang$arity$variadic = G__8004__delegate;
        return G__8004
      }();
      ep3 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return ep3__0.call(this);
          case 1:
            return ep3__1.call(this, x);
          case 2:
            return ep3__2.call(this, x, y);
          case 3:
            return ep3__3.call(this, x, y, z);
          default:
            return ep3__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
        }
        throw"Invalid arity: " + arguments.length;
      };
      ep3.cljs$lang$maxFixedArity = 3;
      ep3.cljs$lang$applyTo = ep3__4.cljs$lang$applyTo;
      ep3.cljs$lang$arity$0 = ep3__0;
      ep3.cljs$lang$arity$1 = ep3__1;
      ep3.cljs$lang$arity$2 = ep3__2;
      ep3.cljs$lang$arity$3 = ep3__3;
      ep3.cljs$lang$arity$variadic = ep3__4.cljs$lang$arity$variadic;
      return ep3
    }()
  };
  var every_pred__4 = function() {
    var G__8006__delegate = function(p1, p2, p3, ps) {
      var ps__7991 = cljs.core.list_STAR_.call(null, p1, p2, p3, ps);
      return function() {
        var epn = null;
        var epn__0 = function() {
          return true
        };
        var epn__1 = function(x) {
          return cljs.core.every_QMARK_.call(null, function(p1__7801_SHARP_) {
            return p1__7801_SHARP_.call(null, x)
          }, ps__7991)
        };
        var epn__2 = function(x, y) {
          return cljs.core.every_QMARK_.call(null, function(p1__7802_SHARP_) {
            var and__3822__auto____7996 = p1__7802_SHARP_.call(null, x);
            if(cljs.core.truth_(and__3822__auto____7996)) {
              return p1__7802_SHARP_.call(null, y)
            }else {
              return and__3822__auto____7996
            }
          }, ps__7991)
        };
        var epn__3 = function(x, y, z) {
          return cljs.core.every_QMARK_.call(null, function(p1__7803_SHARP_) {
            var and__3822__auto____7997 = p1__7803_SHARP_.call(null, x);
            if(cljs.core.truth_(and__3822__auto____7997)) {
              var and__3822__auto____7998 = p1__7803_SHARP_.call(null, y);
              if(cljs.core.truth_(and__3822__auto____7998)) {
                return p1__7803_SHARP_.call(null, z)
              }else {
                return and__3822__auto____7998
              }
            }else {
              return and__3822__auto____7997
            }
          }, ps__7991)
        };
        var epn__4 = function() {
          var G__8007__delegate = function(x, y, z, args) {
            return cljs.core.boolean$.call(null, function() {
              var and__3822__auto____7999 = epn.call(null, x, y, z);
              if(cljs.core.truth_(and__3822__auto____7999)) {
                return cljs.core.every_QMARK_.call(null, function(p1__7804_SHARP_) {
                  return cljs.core.every_QMARK_.call(null, p1__7804_SHARP_, args)
                }, ps__7991)
              }else {
                return and__3822__auto____7999
              }
            }())
          };
          var G__8007 = function(x, y, z, var_args) {
            var args = null;
            if(goog.isDef(var_args)) {
              args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
            }
            return G__8007__delegate.call(this, x, y, z, args)
          };
          G__8007.cljs$lang$maxFixedArity = 3;
          G__8007.cljs$lang$applyTo = function(arglist__8008) {
            var x = cljs.core.first(arglist__8008);
            var y = cljs.core.first(cljs.core.next(arglist__8008));
            var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8008)));
            var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8008)));
            return G__8007__delegate(x, y, z, args)
          };
          G__8007.cljs$lang$arity$variadic = G__8007__delegate;
          return G__8007
        }();
        epn = function(x, y, z, var_args) {
          var args = var_args;
          switch(arguments.length) {
            case 0:
              return epn__0.call(this);
            case 1:
              return epn__1.call(this, x);
            case 2:
              return epn__2.call(this, x, y);
            case 3:
              return epn__3.call(this, x, y, z);
            default:
              return epn__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
          }
          throw"Invalid arity: " + arguments.length;
        };
        epn.cljs$lang$maxFixedArity = 3;
        epn.cljs$lang$applyTo = epn__4.cljs$lang$applyTo;
        epn.cljs$lang$arity$0 = epn__0;
        epn.cljs$lang$arity$1 = epn__1;
        epn.cljs$lang$arity$2 = epn__2;
        epn.cljs$lang$arity$3 = epn__3;
        epn.cljs$lang$arity$variadic = epn__4.cljs$lang$arity$variadic;
        return epn
      }()
    };
    var G__8006 = function(p1, p2, p3, var_args) {
      var ps = null;
      if(goog.isDef(var_args)) {
        ps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
      }
      return G__8006__delegate.call(this, p1, p2, p3, ps)
    };
    G__8006.cljs$lang$maxFixedArity = 3;
    G__8006.cljs$lang$applyTo = function(arglist__8009) {
      var p1 = cljs.core.first(arglist__8009);
      var p2 = cljs.core.first(cljs.core.next(arglist__8009));
      var p3 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8009)));
      var ps = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8009)));
      return G__8006__delegate(p1, p2, p3, ps)
    };
    G__8006.cljs$lang$arity$variadic = G__8006__delegate;
    return G__8006
  }();
  every_pred = function(p1, p2, p3, var_args) {
    var ps = var_args;
    switch(arguments.length) {
      case 1:
        return every_pred__1.call(this, p1);
      case 2:
        return every_pred__2.call(this, p1, p2);
      case 3:
        return every_pred__3.call(this, p1, p2, p3);
      default:
        return every_pred__4.cljs$lang$arity$variadic(p1, p2, p3, cljs.core.array_seq(arguments, 3))
    }
    throw"Invalid arity: " + arguments.length;
  };
  every_pred.cljs$lang$maxFixedArity = 3;
  every_pred.cljs$lang$applyTo = every_pred__4.cljs$lang$applyTo;
  every_pred.cljs$lang$arity$1 = every_pred__1;
  every_pred.cljs$lang$arity$2 = every_pred__2;
  every_pred.cljs$lang$arity$3 = every_pred__3;
  every_pred.cljs$lang$arity$variadic = every_pred__4.cljs$lang$arity$variadic;
  return every_pred
}();
cljs.core.some_fn = function() {
  var some_fn = null;
  var some_fn__1 = function(p) {
    return function() {
      var sp1 = null;
      var sp1__0 = function() {
        return null
      };
      var sp1__1 = function(x) {
        return p.call(null, x)
      };
      var sp1__2 = function(x, y) {
        var or__3824__auto____8090 = p.call(null, x);
        if(cljs.core.truth_(or__3824__auto____8090)) {
          return or__3824__auto____8090
        }else {
          return p.call(null, y)
        }
      };
      var sp1__3 = function(x, y, z) {
        var or__3824__auto____8091 = p.call(null, x);
        if(cljs.core.truth_(or__3824__auto____8091)) {
          return or__3824__auto____8091
        }else {
          var or__3824__auto____8092 = p.call(null, y);
          if(cljs.core.truth_(or__3824__auto____8092)) {
            return or__3824__auto____8092
          }else {
            return p.call(null, z)
          }
        }
      };
      var sp1__4 = function() {
        var G__8161__delegate = function(x, y, z, args) {
          var or__3824__auto____8093 = sp1.call(null, x, y, z);
          if(cljs.core.truth_(or__3824__auto____8093)) {
            return or__3824__auto____8093
          }else {
            return cljs.core.some.call(null, p, args)
          }
        };
        var G__8161 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__8161__delegate.call(this, x, y, z, args)
        };
        G__8161.cljs$lang$maxFixedArity = 3;
        G__8161.cljs$lang$applyTo = function(arglist__8162) {
          var x = cljs.core.first(arglist__8162);
          var y = cljs.core.first(cljs.core.next(arglist__8162));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8162)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8162)));
          return G__8161__delegate(x, y, z, args)
        };
        G__8161.cljs$lang$arity$variadic = G__8161__delegate;
        return G__8161
      }();
      sp1 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return sp1__0.call(this);
          case 1:
            return sp1__1.call(this, x);
          case 2:
            return sp1__2.call(this, x, y);
          case 3:
            return sp1__3.call(this, x, y, z);
          default:
            return sp1__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
        }
        throw"Invalid arity: " + arguments.length;
      };
      sp1.cljs$lang$maxFixedArity = 3;
      sp1.cljs$lang$applyTo = sp1__4.cljs$lang$applyTo;
      sp1.cljs$lang$arity$0 = sp1__0;
      sp1.cljs$lang$arity$1 = sp1__1;
      sp1.cljs$lang$arity$2 = sp1__2;
      sp1.cljs$lang$arity$3 = sp1__3;
      sp1.cljs$lang$arity$variadic = sp1__4.cljs$lang$arity$variadic;
      return sp1
    }()
  };
  var some_fn__2 = function(p1, p2) {
    return function() {
      var sp2 = null;
      var sp2__0 = function() {
        return null
      };
      var sp2__1 = function(x) {
        var or__3824__auto____8105 = p1.call(null, x);
        if(cljs.core.truth_(or__3824__auto____8105)) {
          return or__3824__auto____8105
        }else {
          return p2.call(null, x)
        }
      };
      var sp2__2 = function(x, y) {
        var or__3824__auto____8106 = p1.call(null, x);
        if(cljs.core.truth_(or__3824__auto____8106)) {
          return or__3824__auto____8106
        }else {
          var or__3824__auto____8107 = p1.call(null, y);
          if(cljs.core.truth_(or__3824__auto____8107)) {
            return or__3824__auto____8107
          }else {
            var or__3824__auto____8108 = p2.call(null, x);
            if(cljs.core.truth_(or__3824__auto____8108)) {
              return or__3824__auto____8108
            }else {
              return p2.call(null, y)
            }
          }
        }
      };
      var sp2__3 = function(x, y, z) {
        var or__3824__auto____8109 = p1.call(null, x);
        if(cljs.core.truth_(or__3824__auto____8109)) {
          return or__3824__auto____8109
        }else {
          var or__3824__auto____8110 = p1.call(null, y);
          if(cljs.core.truth_(or__3824__auto____8110)) {
            return or__3824__auto____8110
          }else {
            var or__3824__auto____8111 = p1.call(null, z);
            if(cljs.core.truth_(or__3824__auto____8111)) {
              return or__3824__auto____8111
            }else {
              var or__3824__auto____8112 = p2.call(null, x);
              if(cljs.core.truth_(or__3824__auto____8112)) {
                return or__3824__auto____8112
              }else {
                var or__3824__auto____8113 = p2.call(null, y);
                if(cljs.core.truth_(or__3824__auto____8113)) {
                  return or__3824__auto____8113
                }else {
                  return p2.call(null, z)
                }
              }
            }
          }
        }
      };
      var sp2__4 = function() {
        var G__8163__delegate = function(x, y, z, args) {
          var or__3824__auto____8114 = sp2.call(null, x, y, z);
          if(cljs.core.truth_(or__3824__auto____8114)) {
            return or__3824__auto____8114
          }else {
            return cljs.core.some.call(null, function(p1__7844_SHARP_) {
              var or__3824__auto____8115 = p1.call(null, p1__7844_SHARP_);
              if(cljs.core.truth_(or__3824__auto____8115)) {
                return or__3824__auto____8115
              }else {
                return p2.call(null, p1__7844_SHARP_)
              }
            }, args)
          }
        };
        var G__8163 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__8163__delegate.call(this, x, y, z, args)
        };
        G__8163.cljs$lang$maxFixedArity = 3;
        G__8163.cljs$lang$applyTo = function(arglist__8164) {
          var x = cljs.core.first(arglist__8164);
          var y = cljs.core.first(cljs.core.next(arglist__8164));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8164)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8164)));
          return G__8163__delegate(x, y, z, args)
        };
        G__8163.cljs$lang$arity$variadic = G__8163__delegate;
        return G__8163
      }();
      sp2 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return sp2__0.call(this);
          case 1:
            return sp2__1.call(this, x);
          case 2:
            return sp2__2.call(this, x, y);
          case 3:
            return sp2__3.call(this, x, y, z);
          default:
            return sp2__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
        }
        throw"Invalid arity: " + arguments.length;
      };
      sp2.cljs$lang$maxFixedArity = 3;
      sp2.cljs$lang$applyTo = sp2__4.cljs$lang$applyTo;
      sp2.cljs$lang$arity$0 = sp2__0;
      sp2.cljs$lang$arity$1 = sp2__1;
      sp2.cljs$lang$arity$2 = sp2__2;
      sp2.cljs$lang$arity$3 = sp2__3;
      sp2.cljs$lang$arity$variadic = sp2__4.cljs$lang$arity$variadic;
      return sp2
    }()
  };
  var some_fn__3 = function(p1, p2, p3) {
    return function() {
      var sp3 = null;
      var sp3__0 = function() {
        return null
      };
      var sp3__1 = function(x) {
        var or__3824__auto____8134 = p1.call(null, x);
        if(cljs.core.truth_(or__3824__auto____8134)) {
          return or__3824__auto____8134
        }else {
          var or__3824__auto____8135 = p2.call(null, x);
          if(cljs.core.truth_(or__3824__auto____8135)) {
            return or__3824__auto____8135
          }else {
            return p3.call(null, x)
          }
        }
      };
      var sp3__2 = function(x, y) {
        var or__3824__auto____8136 = p1.call(null, x);
        if(cljs.core.truth_(or__3824__auto____8136)) {
          return or__3824__auto____8136
        }else {
          var or__3824__auto____8137 = p2.call(null, x);
          if(cljs.core.truth_(or__3824__auto____8137)) {
            return or__3824__auto____8137
          }else {
            var or__3824__auto____8138 = p3.call(null, x);
            if(cljs.core.truth_(or__3824__auto____8138)) {
              return or__3824__auto____8138
            }else {
              var or__3824__auto____8139 = p1.call(null, y);
              if(cljs.core.truth_(or__3824__auto____8139)) {
                return or__3824__auto____8139
              }else {
                var or__3824__auto____8140 = p2.call(null, y);
                if(cljs.core.truth_(or__3824__auto____8140)) {
                  return or__3824__auto____8140
                }else {
                  return p3.call(null, y)
                }
              }
            }
          }
        }
      };
      var sp3__3 = function(x, y, z) {
        var or__3824__auto____8141 = p1.call(null, x);
        if(cljs.core.truth_(or__3824__auto____8141)) {
          return or__3824__auto____8141
        }else {
          var or__3824__auto____8142 = p2.call(null, x);
          if(cljs.core.truth_(or__3824__auto____8142)) {
            return or__3824__auto____8142
          }else {
            var or__3824__auto____8143 = p3.call(null, x);
            if(cljs.core.truth_(or__3824__auto____8143)) {
              return or__3824__auto____8143
            }else {
              var or__3824__auto____8144 = p1.call(null, y);
              if(cljs.core.truth_(or__3824__auto____8144)) {
                return or__3824__auto____8144
              }else {
                var or__3824__auto____8145 = p2.call(null, y);
                if(cljs.core.truth_(or__3824__auto____8145)) {
                  return or__3824__auto____8145
                }else {
                  var or__3824__auto____8146 = p3.call(null, y);
                  if(cljs.core.truth_(or__3824__auto____8146)) {
                    return or__3824__auto____8146
                  }else {
                    var or__3824__auto____8147 = p1.call(null, z);
                    if(cljs.core.truth_(or__3824__auto____8147)) {
                      return or__3824__auto____8147
                    }else {
                      var or__3824__auto____8148 = p2.call(null, z);
                      if(cljs.core.truth_(or__3824__auto____8148)) {
                        return or__3824__auto____8148
                      }else {
                        return p3.call(null, z)
                      }
                    }
                  }
                }
              }
            }
          }
        }
      };
      var sp3__4 = function() {
        var G__8165__delegate = function(x, y, z, args) {
          var or__3824__auto____8149 = sp3.call(null, x, y, z);
          if(cljs.core.truth_(or__3824__auto____8149)) {
            return or__3824__auto____8149
          }else {
            return cljs.core.some.call(null, function(p1__7845_SHARP_) {
              var or__3824__auto____8150 = p1.call(null, p1__7845_SHARP_);
              if(cljs.core.truth_(or__3824__auto____8150)) {
                return or__3824__auto____8150
              }else {
                var or__3824__auto____8151 = p2.call(null, p1__7845_SHARP_);
                if(cljs.core.truth_(or__3824__auto____8151)) {
                  return or__3824__auto____8151
                }else {
                  return p3.call(null, p1__7845_SHARP_)
                }
              }
            }, args)
          }
        };
        var G__8165 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__8165__delegate.call(this, x, y, z, args)
        };
        G__8165.cljs$lang$maxFixedArity = 3;
        G__8165.cljs$lang$applyTo = function(arglist__8166) {
          var x = cljs.core.first(arglist__8166);
          var y = cljs.core.first(cljs.core.next(arglist__8166));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8166)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8166)));
          return G__8165__delegate(x, y, z, args)
        };
        G__8165.cljs$lang$arity$variadic = G__8165__delegate;
        return G__8165
      }();
      sp3 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return sp3__0.call(this);
          case 1:
            return sp3__1.call(this, x);
          case 2:
            return sp3__2.call(this, x, y);
          case 3:
            return sp3__3.call(this, x, y, z);
          default:
            return sp3__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
        }
        throw"Invalid arity: " + arguments.length;
      };
      sp3.cljs$lang$maxFixedArity = 3;
      sp3.cljs$lang$applyTo = sp3__4.cljs$lang$applyTo;
      sp3.cljs$lang$arity$0 = sp3__0;
      sp3.cljs$lang$arity$1 = sp3__1;
      sp3.cljs$lang$arity$2 = sp3__2;
      sp3.cljs$lang$arity$3 = sp3__3;
      sp3.cljs$lang$arity$variadic = sp3__4.cljs$lang$arity$variadic;
      return sp3
    }()
  };
  var some_fn__4 = function() {
    var G__8167__delegate = function(p1, p2, p3, ps) {
      var ps__8152 = cljs.core.list_STAR_.call(null, p1, p2, p3, ps);
      return function() {
        var spn = null;
        var spn__0 = function() {
          return null
        };
        var spn__1 = function(x) {
          return cljs.core.some.call(null, function(p1__7846_SHARP_) {
            return p1__7846_SHARP_.call(null, x)
          }, ps__8152)
        };
        var spn__2 = function(x, y) {
          return cljs.core.some.call(null, function(p1__7847_SHARP_) {
            var or__3824__auto____8157 = p1__7847_SHARP_.call(null, x);
            if(cljs.core.truth_(or__3824__auto____8157)) {
              return or__3824__auto____8157
            }else {
              return p1__7847_SHARP_.call(null, y)
            }
          }, ps__8152)
        };
        var spn__3 = function(x, y, z) {
          return cljs.core.some.call(null, function(p1__7848_SHARP_) {
            var or__3824__auto____8158 = p1__7848_SHARP_.call(null, x);
            if(cljs.core.truth_(or__3824__auto____8158)) {
              return or__3824__auto____8158
            }else {
              var or__3824__auto____8159 = p1__7848_SHARP_.call(null, y);
              if(cljs.core.truth_(or__3824__auto____8159)) {
                return or__3824__auto____8159
              }else {
                return p1__7848_SHARP_.call(null, z)
              }
            }
          }, ps__8152)
        };
        var spn__4 = function() {
          var G__8168__delegate = function(x, y, z, args) {
            var or__3824__auto____8160 = spn.call(null, x, y, z);
            if(cljs.core.truth_(or__3824__auto____8160)) {
              return or__3824__auto____8160
            }else {
              return cljs.core.some.call(null, function(p1__7849_SHARP_) {
                return cljs.core.some.call(null, p1__7849_SHARP_, args)
              }, ps__8152)
            }
          };
          var G__8168 = function(x, y, z, var_args) {
            var args = null;
            if(goog.isDef(var_args)) {
              args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
            }
            return G__8168__delegate.call(this, x, y, z, args)
          };
          G__8168.cljs$lang$maxFixedArity = 3;
          G__8168.cljs$lang$applyTo = function(arglist__8169) {
            var x = cljs.core.first(arglist__8169);
            var y = cljs.core.first(cljs.core.next(arglist__8169));
            var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8169)));
            var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8169)));
            return G__8168__delegate(x, y, z, args)
          };
          G__8168.cljs$lang$arity$variadic = G__8168__delegate;
          return G__8168
        }();
        spn = function(x, y, z, var_args) {
          var args = var_args;
          switch(arguments.length) {
            case 0:
              return spn__0.call(this);
            case 1:
              return spn__1.call(this, x);
            case 2:
              return spn__2.call(this, x, y);
            case 3:
              return spn__3.call(this, x, y, z);
            default:
              return spn__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
          }
          throw"Invalid arity: " + arguments.length;
        };
        spn.cljs$lang$maxFixedArity = 3;
        spn.cljs$lang$applyTo = spn__4.cljs$lang$applyTo;
        spn.cljs$lang$arity$0 = spn__0;
        spn.cljs$lang$arity$1 = spn__1;
        spn.cljs$lang$arity$2 = spn__2;
        spn.cljs$lang$arity$3 = spn__3;
        spn.cljs$lang$arity$variadic = spn__4.cljs$lang$arity$variadic;
        return spn
      }()
    };
    var G__8167 = function(p1, p2, p3, var_args) {
      var ps = null;
      if(goog.isDef(var_args)) {
        ps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
      }
      return G__8167__delegate.call(this, p1, p2, p3, ps)
    };
    G__8167.cljs$lang$maxFixedArity = 3;
    G__8167.cljs$lang$applyTo = function(arglist__8170) {
      var p1 = cljs.core.first(arglist__8170);
      var p2 = cljs.core.first(cljs.core.next(arglist__8170));
      var p3 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8170)));
      var ps = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8170)));
      return G__8167__delegate(p1, p2, p3, ps)
    };
    G__8167.cljs$lang$arity$variadic = G__8167__delegate;
    return G__8167
  }();
  some_fn = function(p1, p2, p3, var_args) {
    var ps = var_args;
    switch(arguments.length) {
      case 1:
        return some_fn__1.call(this, p1);
      case 2:
        return some_fn__2.call(this, p1, p2);
      case 3:
        return some_fn__3.call(this, p1, p2, p3);
      default:
        return some_fn__4.cljs$lang$arity$variadic(p1, p2, p3, cljs.core.array_seq(arguments, 3))
    }
    throw"Invalid arity: " + arguments.length;
  };
  some_fn.cljs$lang$maxFixedArity = 3;
  some_fn.cljs$lang$applyTo = some_fn__4.cljs$lang$applyTo;
  some_fn.cljs$lang$arity$1 = some_fn__1;
  some_fn.cljs$lang$arity$2 = some_fn__2;
  some_fn.cljs$lang$arity$3 = some_fn__3;
  some_fn.cljs$lang$arity$variadic = some_fn__4.cljs$lang$arity$variadic;
  return some_fn
}();
cljs.core.map = function() {
  var map = null;
  var map__2 = function(f, coll) {
    return new cljs.core.LazySeq(null, false, function() {
      var temp__3974__auto____8189 = cljs.core.seq.call(null, coll);
      if(temp__3974__auto____8189) {
        var s__8190 = temp__3974__auto____8189;
        if(cljs.core.chunked_seq_QMARK_.call(null, s__8190)) {
          var c__8191 = cljs.core.chunk_first.call(null, s__8190);
          var size__8192 = cljs.core.count.call(null, c__8191);
          var b__8193 = cljs.core.chunk_buffer.call(null, size__8192);
          var n__2533__auto____8194 = size__8192;
          var i__8195 = 0;
          while(true) {
            if(i__8195 < n__2533__auto____8194) {
              cljs.core.chunk_append.call(null, b__8193, f.call(null, cljs.core._nth.call(null, c__8191, i__8195)));
              var G__8207 = i__8195 + 1;
              i__8195 = G__8207;
              continue
            }else {
            }
            break
          }
          return cljs.core.chunk_cons.call(null, cljs.core.chunk.call(null, b__8193), map.call(null, f, cljs.core.chunk_rest.call(null, s__8190)))
        }else {
          return cljs.core.cons.call(null, f.call(null, cljs.core.first.call(null, s__8190)), map.call(null, f, cljs.core.rest.call(null, s__8190)))
        }
      }else {
        return null
      }
    }, null)
  };
  var map__3 = function(f, c1, c2) {
    return new cljs.core.LazySeq(null, false, function() {
      var s1__8196 = cljs.core.seq.call(null, c1);
      var s2__8197 = cljs.core.seq.call(null, c2);
      if(function() {
        var and__3822__auto____8198 = s1__8196;
        if(and__3822__auto____8198) {
          return s2__8197
        }else {
          return and__3822__auto____8198
        }
      }()) {
        return cljs.core.cons.call(null, f.call(null, cljs.core.first.call(null, s1__8196), cljs.core.first.call(null, s2__8197)), map.call(null, f, cljs.core.rest.call(null, s1__8196), cljs.core.rest.call(null, s2__8197)))
      }else {
        return null
      }
    }, null)
  };
  var map__4 = function(f, c1, c2, c3) {
    return new cljs.core.LazySeq(null, false, function() {
      var s1__8199 = cljs.core.seq.call(null, c1);
      var s2__8200 = cljs.core.seq.call(null, c2);
      var s3__8201 = cljs.core.seq.call(null, c3);
      if(function() {
        var and__3822__auto____8202 = s1__8199;
        if(and__3822__auto____8202) {
          var and__3822__auto____8203 = s2__8200;
          if(and__3822__auto____8203) {
            return s3__8201
          }else {
            return and__3822__auto____8203
          }
        }else {
          return and__3822__auto____8202
        }
      }()) {
        return cljs.core.cons.call(null, f.call(null, cljs.core.first.call(null, s1__8199), cljs.core.first.call(null, s2__8200), cljs.core.first.call(null, s3__8201)), map.call(null, f, cljs.core.rest.call(null, s1__8199), cljs.core.rest.call(null, s2__8200), cljs.core.rest.call(null, s3__8201)))
      }else {
        return null
      }
    }, null)
  };
  var map__5 = function() {
    var G__8208__delegate = function(f, c1, c2, c3, colls) {
      var step__8206 = function step(cs) {
        return new cljs.core.LazySeq(null, false, function() {
          var ss__8205 = map.call(null, cljs.core.seq, cs);
          if(cljs.core.every_QMARK_.call(null, cljs.core.identity, ss__8205)) {
            return cljs.core.cons.call(null, map.call(null, cljs.core.first, ss__8205), step.call(null, map.call(null, cljs.core.rest, ss__8205)))
          }else {
            return null
          }
        }, null)
      };
      return map.call(null, function(p1__8010_SHARP_) {
        return cljs.core.apply.call(null, f, p1__8010_SHARP_)
      }, step__8206.call(null, cljs.core.conj.call(null, colls, c3, c2, c1)))
    };
    var G__8208 = function(f, c1, c2, c3, var_args) {
      var colls = null;
      if(goog.isDef(var_args)) {
        colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4), 0)
      }
      return G__8208__delegate.call(this, f, c1, c2, c3, colls)
    };
    G__8208.cljs$lang$maxFixedArity = 4;
    G__8208.cljs$lang$applyTo = function(arglist__8209) {
      var f = cljs.core.first(arglist__8209);
      var c1 = cljs.core.first(cljs.core.next(arglist__8209));
      var c2 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8209)));
      var c3 = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__8209))));
      var colls = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__8209))));
      return G__8208__delegate(f, c1, c2, c3, colls)
    };
    G__8208.cljs$lang$arity$variadic = G__8208__delegate;
    return G__8208
  }();
  map = function(f, c1, c2, c3, var_args) {
    var colls = var_args;
    switch(arguments.length) {
      case 2:
        return map__2.call(this, f, c1);
      case 3:
        return map__3.call(this, f, c1, c2);
      case 4:
        return map__4.call(this, f, c1, c2, c3);
      default:
        return map__5.cljs$lang$arity$variadic(f, c1, c2, c3, cljs.core.array_seq(arguments, 4))
    }
    throw"Invalid arity: " + arguments.length;
  };
  map.cljs$lang$maxFixedArity = 4;
  map.cljs$lang$applyTo = map__5.cljs$lang$applyTo;
  map.cljs$lang$arity$2 = map__2;
  map.cljs$lang$arity$3 = map__3;
  map.cljs$lang$arity$4 = map__4;
  map.cljs$lang$arity$variadic = map__5.cljs$lang$arity$variadic;
  return map
}();
cljs.core.take = function take(n, coll) {
  return new cljs.core.LazySeq(null, false, function() {
    if(n > 0) {
      var temp__3974__auto____8212 = cljs.core.seq.call(null, coll);
      if(temp__3974__auto____8212) {
        var s__8213 = temp__3974__auto____8212;
        return cljs.core.cons.call(null, cljs.core.first.call(null, s__8213), take.call(null, n - 1, cljs.core.rest.call(null, s__8213)))
      }else {
        return null
      }
    }else {
      return null
    }
  }, null)
};
cljs.core.drop = function drop(n, coll) {
  var step__8219 = function(n, coll) {
    while(true) {
      var s__8217 = cljs.core.seq.call(null, coll);
      if(cljs.core.truth_(function() {
        var and__3822__auto____8218 = n > 0;
        if(and__3822__auto____8218) {
          return s__8217
        }else {
          return and__3822__auto____8218
        }
      }())) {
        var G__8220 = n - 1;
        var G__8221 = cljs.core.rest.call(null, s__8217);
        n = G__8220;
        coll = G__8221;
        continue
      }else {
        return s__8217
      }
      break
    }
  };
  return new cljs.core.LazySeq(null, false, function() {
    return step__8219.call(null, n, coll)
  }, null)
};
cljs.core.drop_last = function() {
  var drop_last = null;
  var drop_last__1 = function(s) {
    return drop_last.call(null, 1, s)
  };
  var drop_last__2 = function(n, s) {
    return cljs.core.map.call(null, function(x, _) {
      return x
    }, s, cljs.core.drop.call(null, n, s))
  };
  drop_last = function(n, s) {
    switch(arguments.length) {
      case 1:
        return drop_last__1.call(this, n);
      case 2:
        return drop_last__2.call(this, n, s)
    }
    throw"Invalid arity: " + arguments.length;
  };
  drop_last.cljs$lang$arity$1 = drop_last__1;
  drop_last.cljs$lang$arity$2 = drop_last__2;
  return drop_last
}();
cljs.core.take_last = function take_last(n, coll) {
  var s__8224 = cljs.core.seq.call(null, coll);
  var lead__8225 = cljs.core.seq.call(null, cljs.core.drop.call(null, n, coll));
  while(true) {
    if(lead__8225) {
      var G__8226 = cljs.core.next.call(null, s__8224);
      var G__8227 = cljs.core.next.call(null, lead__8225);
      s__8224 = G__8226;
      lead__8225 = G__8227;
      continue
    }else {
      return s__8224
    }
    break
  }
};
cljs.core.drop_while = function drop_while(pred, coll) {
  var step__8233 = function(pred, coll) {
    while(true) {
      var s__8231 = cljs.core.seq.call(null, coll);
      if(cljs.core.truth_(function() {
        var and__3822__auto____8232 = s__8231;
        if(and__3822__auto____8232) {
          return pred.call(null, cljs.core.first.call(null, s__8231))
        }else {
          return and__3822__auto____8232
        }
      }())) {
        var G__8234 = pred;
        var G__8235 = cljs.core.rest.call(null, s__8231);
        pred = G__8234;
        coll = G__8235;
        continue
      }else {
        return s__8231
      }
      break
    }
  };
  return new cljs.core.LazySeq(null, false, function() {
    return step__8233.call(null, pred, coll)
  }, null)
};
cljs.core.cycle = function cycle(coll) {
  return new cljs.core.LazySeq(null, false, function() {
    var temp__3974__auto____8238 = cljs.core.seq.call(null, coll);
    if(temp__3974__auto____8238) {
      var s__8239 = temp__3974__auto____8238;
      return cljs.core.concat.call(null, s__8239, cycle.call(null, s__8239))
    }else {
      return null
    }
  }, null)
};
cljs.core.split_at = function split_at(n, coll) {
  return cljs.core.PersistentVector.fromArray([cljs.core.take.call(null, n, coll), cljs.core.drop.call(null, n, coll)], true)
};
cljs.core.repeat = function() {
  var repeat = null;
  var repeat__1 = function(x) {
    return new cljs.core.LazySeq(null, false, function() {
      return cljs.core.cons.call(null, x, repeat.call(null, x))
    }, null)
  };
  var repeat__2 = function(n, x) {
    return cljs.core.take.call(null, n, repeat.call(null, x))
  };
  repeat = function(n, x) {
    switch(arguments.length) {
      case 1:
        return repeat__1.call(this, n);
      case 2:
        return repeat__2.call(this, n, x)
    }
    throw"Invalid arity: " + arguments.length;
  };
  repeat.cljs$lang$arity$1 = repeat__1;
  repeat.cljs$lang$arity$2 = repeat__2;
  return repeat
}();
cljs.core.replicate = function replicate(n, x) {
  return cljs.core.take.call(null, n, cljs.core.repeat.call(null, x))
};
cljs.core.repeatedly = function() {
  var repeatedly = null;
  var repeatedly__1 = function(f) {
    return new cljs.core.LazySeq(null, false, function() {
      return cljs.core.cons.call(null, f.call(null), repeatedly.call(null, f))
    }, null)
  };
  var repeatedly__2 = function(n, f) {
    return cljs.core.take.call(null, n, repeatedly.call(null, f))
  };
  repeatedly = function(n, f) {
    switch(arguments.length) {
      case 1:
        return repeatedly__1.call(this, n);
      case 2:
        return repeatedly__2.call(this, n, f)
    }
    throw"Invalid arity: " + arguments.length;
  };
  repeatedly.cljs$lang$arity$1 = repeatedly__1;
  repeatedly.cljs$lang$arity$2 = repeatedly__2;
  return repeatedly
}();
cljs.core.iterate = function iterate(f, x) {
  return cljs.core.cons.call(null, x, new cljs.core.LazySeq(null, false, function() {
    return iterate.call(null, f, f.call(null, x))
  }, null))
};
cljs.core.interleave = function() {
  var interleave = null;
  var interleave__2 = function(c1, c2) {
    return new cljs.core.LazySeq(null, false, function() {
      var s1__8244 = cljs.core.seq.call(null, c1);
      var s2__8245 = cljs.core.seq.call(null, c2);
      if(function() {
        var and__3822__auto____8246 = s1__8244;
        if(and__3822__auto____8246) {
          return s2__8245
        }else {
          return and__3822__auto____8246
        }
      }()) {
        return cljs.core.cons.call(null, cljs.core.first.call(null, s1__8244), cljs.core.cons.call(null, cljs.core.first.call(null, s2__8245), interleave.call(null, cljs.core.rest.call(null, s1__8244), cljs.core.rest.call(null, s2__8245))))
      }else {
        return null
      }
    }, null)
  };
  var interleave__3 = function() {
    var G__8248__delegate = function(c1, c2, colls) {
      return new cljs.core.LazySeq(null, false, function() {
        var ss__8247 = cljs.core.map.call(null, cljs.core.seq, cljs.core.conj.call(null, colls, c2, c1));
        if(cljs.core.every_QMARK_.call(null, cljs.core.identity, ss__8247)) {
          return cljs.core.concat.call(null, cljs.core.map.call(null, cljs.core.first, ss__8247), cljs.core.apply.call(null, interleave, cljs.core.map.call(null, cljs.core.rest, ss__8247)))
        }else {
          return null
        }
      }, null)
    };
    var G__8248 = function(c1, c2, var_args) {
      var colls = null;
      if(goog.isDef(var_args)) {
        colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__8248__delegate.call(this, c1, c2, colls)
    };
    G__8248.cljs$lang$maxFixedArity = 2;
    G__8248.cljs$lang$applyTo = function(arglist__8249) {
      var c1 = cljs.core.first(arglist__8249);
      var c2 = cljs.core.first(cljs.core.next(arglist__8249));
      var colls = cljs.core.rest(cljs.core.next(arglist__8249));
      return G__8248__delegate(c1, c2, colls)
    };
    G__8248.cljs$lang$arity$variadic = G__8248__delegate;
    return G__8248
  }();
  interleave = function(c1, c2, var_args) {
    var colls = var_args;
    switch(arguments.length) {
      case 2:
        return interleave__2.call(this, c1, c2);
      default:
        return interleave__3.cljs$lang$arity$variadic(c1, c2, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  interleave.cljs$lang$maxFixedArity = 2;
  interleave.cljs$lang$applyTo = interleave__3.cljs$lang$applyTo;
  interleave.cljs$lang$arity$2 = interleave__2;
  interleave.cljs$lang$arity$variadic = interleave__3.cljs$lang$arity$variadic;
  return interleave
}();
cljs.core.interpose = function interpose(sep, coll) {
  return cljs.core.drop.call(null, 1, cljs.core.interleave.call(null, cljs.core.repeat.call(null, sep), coll))
};
cljs.core.flatten1 = function flatten1(colls) {
  var cat__8259 = function cat(coll, colls) {
    return new cljs.core.LazySeq(null, false, function() {
      var temp__3971__auto____8257 = cljs.core.seq.call(null, coll);
      if(temp__3971__auto____8257) {
        var coll__8258 = temp__3971__auto____8257;
        return cljs.core.cons.call(null, cljs.core.first.call(null, coll__8258), cat.call(null, cljs.core.rest.call(null, coll__8258), colls))
      }else {
        if(cljs.core.seq.call(null, colls)) {
          return cat.call(null, cljs.core.first.call(null, colls), cljs.core.rest.call(null, colls))
        }else {
          return null
        }
      }
    }, null)
  };
  return cat__8259.call(null, null, colls)
};
cljs.core.mapcat = function() {
  var mapcat = null;
  var mapcat__2 = function(f, coll) {
    return cljs.core.flatten1.call(null, cljs.core.map.call(null, f, coll))
  };
  var mapcat__3 = function() {
    var G__8260__delegate = function(f, coll, colls) {
      return cljs.core.flatten1.call(null, cljs.core.apply.call(null, cljs.core.map, f, coll, colls))
    };
    var G__8260 = function(f, coll, var_args) {
      var colls = null;
      if(goog.isDef(var_args)) {
        colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__8260__delegate.call(this, f, coll, colls)
    };
    G__8260.cljs$lang$maxFixedArity = 2;
    G__8260.cljs$lang$applyTo = function(arglist__8261) {
      var f = cljs.core.first(arglist__8261);
      var coll = cljs.core.first(cljs.core.next(arglist__8261));
      var colls = cljs.core.rest(cljs.core.next(arglist__8261));
      return G__8260__delegate(f, coll, colls)
    };
    G__8260.cljs$lang$arity$variadic = G__8260__delegate;
    return G__8260
  }();
  mapcat = function(f, coll, var_args) {
    var colls = var_args;
    switch(arguments.length) {
      case 2:
        return mapcat__2.call(this, f, coll);
      default:
        return mapcat__3.cljs$lang$arity$variadic(f, coll, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  mapcat.cljs$lang$maxFixedArity = 2;
  mapcat.cljs$lang$applyTo = mapcat__3.cljs$lang$applyTo;
  mapcat.cljs$lang$arity$2 = mapcat__2;
  mapcat.cljs$lang$arity$variadic = mapcat__3.cljs$lang$arity$variadic;
  return mapcat
}();
cljs.core.filter = function filter(pred, coll) {
  return new cljs.core.LazySeq(null, false, function() {
    var temp__3974__auto____8271 = cljs.core.seq.call(null, coll);
    if(temp__3974__auto____8271) {
      var s__8272 = temp__3974__auto____8271;
      if(cljs.core.chunked_seq_QMARK_.call(null, s__8272)) {
        var c__8273 = cljs.core.chunk_first.call(null, s__8272);
        var size__8274 = cljs.core.count.call(null, c__8273);
        var b__8275 = cljs.core.chunk_buffer.call(null, size__8274);
        var n__2533__auto____8276 = size__8274;
        var i__8277 = 0;
        while(true) {
          if(i__8277 < n__2533__auto____8276) {
            if(cljs.core.truth_(pred.call(null, cljs.core._nth.call(null, c__8273, i__8277)))) {
              cljs.core.chunk_append.call(null, b__8275, cljs.core._nth.call(null, c__8273, i__8277))
            }else {
            }
            var G__8280 = i__8277 + 1;
            i__8277 = G__8280;
            continue
          }else {
          }
          break
        }
        return cljs.core.chunk_cons.call(null, cljs.core.chunk.call(null, b__8275), filter.call(null, pred, cljs.core.chunk_rest.call(null, s__8272)))
      }else {
        var f__8278 = cljs.core.first.call(null, s__8272);
        var r__8279 = cljs.core.rest.call(null, s__8272);
        if(cljs.core.truth_(pred.call(null, f__8278))) {
          return cljs.core.cons.call(null, f__8278, filter.call(null, pred, r__8279))
        }else {
          return filter.call(null, pred, r__8279)
        }
      }
    }else {
      return null
    }
  }, null)
};
cljs.core.remove = function remove(pred, coll) {
  return cljs.core.filter.call(null, cljs.core.complement.call(null, pred), coll)
};
cljs.core.tree_seq = function tree_seq(branch_QMARK_, children, root) {
  var walk__8283 = function walk(node) {
    return new cljs.core.LazySeq(null, false, function() {
      return cljs.core.cons.call(null, node, cljs.core.truth_(branch_QMARK_.call(null, node)) ? cljs.core.mapcat.call(null, walk, children.call(null, node)) : null)
    }, null)
  };
  return walk__8283.call(null, root)
};
cljs.core.flatten = function flatten(x) {
  return cljs.core.filter.call(null, function(p1__8281_SHARP_) {
    return!cljs.core.sequential_QMARK_.call(null, p1__8281_SHARP_)
  }, cljs.core.rest.call(null, cljs.core.tree_seq.call(null, cljs.core.sequential_QMARK_, cljs.core.seq, x)))
};
cljs.core.into = function into(to, from) {
  if(function() {
    var G__8287__8288 = to;
    if(G__8287__8288) {
      if(function() {
        var or__3824__auto____8289 = G__8287__8288.cljs$lang$protocol_mask$partition1$ & 1;
        if(or__3824__auto____8289) {
          return or__3824__auto____8289
        }else {
          return G__8287__8288.cljs$core$IEditableCollection$
        }
      }()) {
        return true
      }else {
        if(!G__8287__8288.cljs$lang$protocol_mask$partition1$) {
          return cljs.core.type_satisfies_.call(null, cljs.core.IEditableCollection, G__8287__8288)
        }else {
          return false
        }
      }
    }else {
      return cljs.core.type_satisfies_.call(null, cljs.core.IEditableCollection, G__8287__8288)
    }
  }()) {
    return cljs.core.persistent_BANG_.call(null, cljs.core.reduce.call(null, cljs.core._conj_BANG_, cljs.core.transient$.call(null, to), from))
  }else {
    return cljs.core.reduce.call(null, cljs.core._conj, to, from)
  }
};
cljs.core.mapv = function() {
  var mapv = null;
  var mapv__2 = function(f, coll) {
    return cljs.core.persistent_BANG_.call(null, cljs.core.reduce.call(null, function(v, o) {
      return cljs.core.conj_BANG_.call(null, v, f.call(null, o))
    }, cljs.core.transient$.call(null, cljs.core.PersistentVector.EMPTY), coll))
  };
  var mapv__3 = function(f, c1, c2) {
    return cljs.core.into.call(null, cljs.core.PersistentVector.EMPTY, cljs.core.map.call(null, f, c1, c2))
  };
  var mapv__4 = function(f, c1, c2, c3) {
    return cljs.core.into.call(null, cljs.core.PersistentVector.EMPTY, cljs.core.map.call(null, f, c1, c2, c3))
  };
  var mapv__5 = function() {
    var G__8290__delegate = function(f, c1, c2, c3, colls) {
      return cljs.core.into.call(null, cljs.core.PersistentVector.EMPTY, cljs.core.apply.call(null, cljs.core.map, f, c1, c2, c3, colls))
    };
    var G__8290 = function(f, c1, c2, c3, var_args) {
      var colls = null;
      if(goog.isDef(var_args)) {
        colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4), 0)
      }
      return G__8290__delegate.call(this, f, c1, c2, c3, colls)
    };
    G__8290.cljs$lang$maxFixedArity = 4;
    G__8290.cljs$lang$applyTo = function(arglist__8291) {
      var f = cljs.core.first(arglist__8291);
      var c1 = cljs.core.first(cljs.core.next(arglist__8291));
      var c2 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8291)));
      var c3 = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__8291))));
      var colls = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__8291))));
      return G__8290__delegate(f, c1, c2, c3, colls)
    };
    G__8290.cljs$lang$arity$variadic = G__8290__delegate;
    return G__8290
  }();
  mapv = function(f, c1, c2, c3, var_args) {
    var colls = var_args;
    switch(arguments.length) {
      case 2:
        return mapv__2.call(this, f, c1);
      case 3:
        return mapv__3.call(this, f, c1, c2);
      case 4:
        return mapv__4.call(this, f, c1, c2, c3);
      default:
        return mapv__5.cljs$lang$arity$variadic(f, c1, c2, c3, cljs.core.array_seq(arguments, 4))
    }
    throw"Invalid arity: " + arguments.length;
  };
  mapv.cljs$lang$maxFixedArity = 4;
  mapv.cljs$lang$applyTo = mapv__5.cljs$lang$applyTo;
  mapv.cljs$lang$arity$2 = mapv__2;
  mapv.cljs$lang$arity$3 = mapv__3;
  mapv.cljs$lang$arity$4 = mapv__4;
  mapv.cljs$lang$arity$variadic = mapv__5.cljs$lang$arity$variadic;
  return mapv
}();
cljs.core.filterv = function filterv(pred, coll) {
  return cljs.core.persistent_BANG_.call(null, cljs.core.reduce.call(null, function(v, o) {
    if(cljs.core.truth_(pred.call(null, o))) {
      return cljs.core.conj_BANG_.call(null, v, o)
    }else {
      return v
    }
  }, cljs.core.transient$.call(null, cljs.core.PersistentVector.EMPTY), coll))
};
cljs.core.partition = function() {
  var partition = null;
  var partition__2 = function(n, coll) {
    return partition.call(null, n, n, coll)
  };
  var partition__3 = function(n, step, coll) {
    return new cljs.core.LazySeq(null, false, function() {
      var temp__3974__auto____8298 = cljs.core.seq.call(null, coll);
      if(temp__3974__auto____8298) {
        var s__8299 = temp__3974__auto____8298;
        var p__8300 = cljs.core.take.call(null, n, s__8299);
        if(n === cljs.core.count.call(null, p__8300)) {
          return cljs.core.cons.call(null, p__8300, partition.call(null, n, step, cljs.core.drop.call(null, step, s__8299)))
        }else {
          return null
        }
      }else {
        return null
      }
    }, null)
  };
  var partition__4 = function(n, step, pad, coll) {
    return new cljs.core.LazySeq(null, false, function() {
      var temp__3974__auto____8301 = cljs.core.seq.call(null, coll);
      if(temp__3974__auto____8301) {
        var s__8302 = temp__3974__auto____8301;
        var p__8303 = cljs.core.take.call(null, n, s__8302);
        if(n === cljs.core.count.call(null, p__8303)) {
          return cljs.core.cons.call(null, p__8303, partition.call(null, n, step, pad, cljs.core.drop.call(null, step, s__8302)))
        }else {
          return cljs.core.list.call(null, cljs.core.take.call(null, n, cljs.core.concat.call(null, p__8303, pad)))
        }
      }else {
        return null
      }
    }, null)
  };
  partition = function(n, step, pad, coll) {
    switch(arguments.length) {
      case 2:
        return partition__2.call(this, n, step);
      case 3:
        return partition__3.call(this, n, step, pad);
      case 4:
        return partition__4.call(this, n, step, pad, coll)
    }
    throw"Invalid arity: " + arguments.length;
  };
  partition.cljs$lang$arity$2 = partition__2;
  partition.cljs$lang$arity$3 = partition__3;
  partition.cljs$lang$arity$4 = partition__4;
  return partition
}();
cljs.core.get_in = function() {
  var get_in = null;
  var get_in__2 = function(m, ks) {
    return cljs.core.reduce.call(null, cljs.core.get, m, ks)
  };
  var get_in__3 = function(m, ks, not_found) {
    var sentinel__8308 = cljs.core.lookup_sentinel;
    var m__8309 = m;
    var ks__8310 = cljs.core.seq.call(null, ks);
    while(true) {
      if(ks__8310) {
        var m__8311 = cljs.core._lookup.call(null, m__8309, cljs.core.first.call(null, ks__8310), sentinel__8308);
        if(sentinel__8308 === m__8311) {
          return not_found
        }else {
          var G__8312 = sentinel__8308;
          var G__8313 = m__8311;
          var G__8314 = cljs.core.next.call(null, ks__8310);
          sentinel__8308 = G__8312;
          m__8309 = G__8313;
          ks__8310 = G__8314;
          continue
        }
      }else {
        return m__8309
      }
      break
    }
  };
  get_in = function(m, ks, not_found) {
    switch(arguments.length) {
      case 2:
        return get_in__2.call(this, m, ks);
      case 3:
        return get_in__3.call(this, m, ks, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  get_in.cljs$lang$arity$2 = get_in__2;
  get_in.cljs$lang$arity$3 = get_in__3;
  return get_in
}();
cljs.core.assoc_in = function assoc_in(m, p__8315, v) {
  var vec__8320__8321 = p__8315;
  var k__8322 = cljs.core.nth.call(null, vec__8320__8321, 0, null);
  var ks__8323 = cljs.core.nthnext.call(null, vec__8320__8321, 1);
  if(cljs.core.truth_(ks__8323)) {
    return cljs.core.assoc.call(null, m, k__8322, assoc_in.call(null, cljs.core._lookup.call(null, m, k__8322, null), ks__8323, v))
  }else {
    return cljs.core.assoc.call(null, m, k__8322, v)
  }
};
cljs.core.update_in = function() {
  var update_in__delegate = function(m, p__8324, f, args) {
    var vec__8329__8330 = p__8324;
    var k__8331 = cljs.core.nth.call(null, vec__8329__8330, 0, null);
    var ks__8332 = cljs.core.nthnext.call(null, vec__8329__8330, 1);
    if(cljs.core.truth_(ks__8332)) {
      return cljs.core.assoc.call(null, m, k__8331, cljs.core.apply.call(null, update_in, cljs.core._lookup.call(null, m, k__8331, null), ks__8332, f, args))
    }else {
      return cljs.core.assoc.call(null, m, k__8331, cljs.core.apply.call(null, f, cljs.core._lookup.call(null, m, k__8331, null), args))
    }
  };
  var update_in = function(m, p__8324, f, var_args) {
    var args = null;
    if(goog.isDef(var_args)) {
      args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
    }
    return update_in__delegate.call(this, m, p__8324, f, args)
  };
  update_in.cljs$lang$maxFixedArity = 3;
  update_in.cljs$lang$applyTo = function(arglist__8333) {
    var m = cljs.core.first(arglist__8333);
    var p__8324 = cljs.core.first(cljs.core.next(arglist__8333));
    var f = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8333)));
    var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8333)));
    return update_in__delegate(m, p__8324, f, args)
  };
  update_in.cljs$lang$arity$variadic = update_in__delegate;
  return update_in
}();
cljs.core.Vector = function(meta, array, __hash) {
  this.meta = meta;
  this.array = array;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 32400159
};
cljs.core.Vector.cljs$lang$type = true;
cljs.core.Vector.cljs$lang$ctorPrSeq = function(this__2315__auto__) {
  return cljs.core.list.call(null, "cljs.core/Vector")
};
cljs.core.Vector.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__8336 = this;
  var h__2198__auto____8337 = this__8336.__hash;
  if(!(h__2198__auto____8337 == null)) {
    return h__2198__auto____8337
  }else {
    var h__2198__auto____8338 = cljs.core.hash_coll.call(null, coll);
    this__8336.__hash = h__2198__auto____8338;
    return h__2198__auto____8338
  }
};
cljs.core.Vector.prototype.cljs$core$ILookup$_lookup$arity$2 = function(coll, k) {
  var this__8339 = this;
  return coll.cljs$core$IIndexed$_nth$arity$3(coll, k, null)
};
cljs.core.Vector.prototype.cljs$core$ILookup$_lookup$arity$3 = function(coll, k, not_found) {
  var this__8340 = this;
  return coll.cljs$core$IIndexed$_nth$arity$3(coll, k, not_found)
};
cljs.core.Vector.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(coll, k, v) {
  var this__8341 = this;
  var new_array__8342 = this__8341.array.slice();
  new_array__8342[k] = v;
  return new cljs.core.Vector(this__8341.meta, new_array__8342, null)
};
cljs.core.Vector.prototype.call = function() {
  var G__8373 = null;
  var G__8373__2 = function(this_sym8343, k) {
    var this__8345 = this;
    var this_sym8343__8346 = this;
    var coll__8347 = this_sym8343__8346;
    return coll__8347.cljs$core$ILookup$_lookup$arity$2(coll__8347, k)
  };
  var G__8373__3 = function(this_sym8344, k, not_found) {
    var this__8345 = this;
    var this_sym8344__8348 = this;
    var coll__8349 = this_sym8344__8348;
    return coll__8349.cljs$core$ILookup$_lookup$arity$3(coll__8349, k, not_found)
  };
  G__8373 = function(this_sym8344, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__8373__2.call(this, this_sym8344, k);
      case 3:
        return G__8373__3.call(this, this_sym8344, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__8373
}();
cljs.core.Vector.prototype.apply = function(this_sym8334, args8335) {
  var this__8350 = this;
  return this_sym8334.call.apply(this_sym8334, [this_sym8334].concat(args8335.slice()))
};
cljs.core.Vector.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__8351 = this;
  var new_array__8352 = this__8351.array.slice();
  new_array__8352.push(o);
  return new cljs.core.Vector(this__8351.meta, new_array__8352, null)
};
cljs.core.Vector.prototype.toString = function() {
  var this__8353 = this;
  var this__8354 = this;
  return cljs.core.pr_str.call(null, this__8354)
};
cljs.core.Vector.prototype.cljs$core$IReduce$_reduce$arity$2 = function(v, f) {
  var this__8355 = this;
  return cljs.core.ci_reduce.call(null, this__8355.array, f)
};
cljs.core.Vector.prototype.cljs$core$IReduce$_reduce$arity$3 = function(v, f, start) {
  var this__8356 = this;
  return cljs.core.ci_reduce.call(null, this__8356.array, f, start)
};
cljs.core.Vector.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__8357 = this;
  if(this__8357.array.length > 0) {
    var vector_seq__8358 = function vector_seq(i) {
      return new cljs.core.LazySeq(null, false, function() {
        if(i < this__8357.array.length) {
          return cljs.core.cons.call(null, this__8357.array[i], vector_seq.call(null, i + 1))
        }else {
          return null
        }
      }, null)
    };
    return vector_seq__8358.call(null, 0)
  }else {
    return null
  }
};
cljs.core.Vector.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__8359 = this;
  return this__8359.array.length
};
cljs.core.Vector.prototype.cljs$core$IStack$_peek$arity$1 = function(coll) {
  var this__8360 = this;
  var count__8361 = this__8360.array.length;
  if(count__8361 > 0) {
    return this__8360.array[count__8361 - 1]
  }else {
    return null
  }
};
cljs.core.Vector.prototype.cljs$core$IStack$_pop$arity$1 = function(coll) {
  var this__8362 = this;
  if(this__8362.array.length > 0) {
    var new_array__8363 = this__8362.array.slice();
    new_array__8363.pop();
    return new cljs.core.Vector(this__8362.meta, new_array__8363, null)
  }else {
    throw new Error("Can't pop empty vector");
  }
};
cljs.core.Vector.prototype.cljs$core$IVector$_assoc_n$arity$3 = function(coll, n, val) {
  var this__8364 = this;
  return coll.cljs$core$IAssociative$_assoc$arity$3(coll, n, val)
};
cljs.core.Vector.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__8365 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.Vector.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__8366 = this;
  return new cljs.core.Vector(meta, this__8366.array, this__8366.__hash)
};
cljs.core.Vector.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__8367 = this;
  return this__8367.meta
};
cljs.core.Vector.prototype.cljs$core$IIndexed$_nth$arity$2 = function(coll, n) {
  var this__8368 = this;
  if(function() {
    var and__3822__auto____8369 = 0 <= n;
    if(and__3822__auto____8369) {
      return n < this__8368.array.length
    }else {
      return and__3822__auto____8369
    }
  }()) {
    return this__8368.array[n]
  }else {
    return null
  }
};
cljs.core.Vector.prototype.cljs$core$IIndexed$_nth$arity$3 = function(coll, n, not_found) {
  var this__8370 = this;
  if(function() {
    var and__3822__auto____8371 = 0 <= n;
    if(and__3822__auto____8371) {
      return n < this__8370.array.length
    }else {
      return and__3822__auto____8371
    }
  }()) {
    return this__8370.array[n]
  }else {
    return not_found
  }
};
cljs.core.Vector.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__8372 = this;
  return cljs.core.with_meta.call(null, cljs.core.Vector.EMPTY, this__8372.meta)
};
cljs.core.Vector;
cljs.core.Vector.EMPTY = new cljs.core.Vector(null, [], 0);
cljs.core.Vector.fromArray = function(xs) {
  return new cljs.core.Vector(null, xs, null)
};
cljs.core.VectorNode = function(edit, arr) {
  this.edit = edit;
  this.arr = arr
};
cljs.core.VectorNode.cljs$lang$type = true;
cljs.core.VectorNode.cljs$lang$ctorPrSeq = function(this__2316__auto__) {
  return cljs.core.list.call(null, "cljs.core/VectorNode")
};
cljs.core.VectorNode;
cljs.core.pv_fresh_node = function pv_fresh_node(edit) {
  return new cljs.core.VectorNode(edit, cljs.core.make_array.call(null, 32))
};
cljs.core.pv_aget = function pv_aget(node, idx) {
  return node.arr[idx]
};
cljs.core.pv_aset = function pv_aset(node, idx, val) {
  return node.arr[idx] = val
};
cljs.core.pv_clone_node = function pv_clone_node(node) {
  return new cljs.core.VectorNode(node.edit, node.arr.slice())
};
cljs.core.tail_off = function tail_off(pv) {
  var cnt__8375 = pv.cnt;
  if(cnt__8375 < 32) {
    return 0
  }else {
    return cnt__8375 - 1 >>> 5 << 5
  }
};
cljs.core.new_path = function new_path(edit, level, node) {
  var ll__8381 = level;
  var ret__8382 = node;
  while(true) {
    if(ll__8381 === 0) {
      return ret__8382
    }else {
      var embed__8383 = ret__8382;
      var r__8384 = cljs.core.pv_fresh_node.call(null, edit);
      var ___8385 = cljs.core.pv_aset.call(null, r__8384, 0, embed__8383);
      var G__8386 = ll__8381 - 5;
      var G__8387 = r__8384;
      ll__8381 = G__8386;
      ret__8382 = G__8387;
      continue
    }
    break
  }
};
cljs.core.push_tail = function push_tail(pv, level, parent, tailnode) {
  var ret__8393 = cljs.core.pv_clone_node.call(null, parent);
  var subidx__8394 = pv.cnt - 1 >>> level & 31;
  if(5 === level) {
    cljs.core.pv_aset.call(null, ret__8393, subidx__8394, tailnode);
    return ret__8393
  }else {
    var child__8395 = cljs.core.pv_aget.call(null, parent, subidx__8394);
    if(!(child__8395 == null)) {
      var node_to_insert__8396 = push_tail.call(null, pv, level - 5, child__8395, tailnode);
      cljs.core.pv_aset.call(null, ret__8393, subidx__8394, node_to_insert__8396);
      return ret__8393
    }else {
      var node_to_insert__8397 = cljs.core.new_path.call(null, null, level - 5, tailnode);
      cljs.core.pv_aset.call(null, ret__8393, subidx__8394, node_to_insert__8397);
      return ret__8393
    }
  }
};
cljs.core.array_for = function array_for(pv, i) {
  if(function() {
    var and__3822__auto____8401 = 0 <= i;
    if(and__3822__auto____8401) {
      return i < pv.cnt
    }else {
      return and__3822__auto____8401
    }
  }()) {
    if(i >= cljs.core.tail_off.call(null, pv)) {
      return pv.tail
    }else {
      var node__8402 = pv.root;
      var level__8403 = pv.shift;
      while(true) {
        if(level__8403 > 0) {
          var G__8404 = cljs.core.pv_aget.call(null, node__8402, i >>> level__8403 & 31);
          var G__8405 = level__8403 - 5;
          node__8402 = G__8404;
          level__8403 = G__8405;
          continue
        }else {
          return node__8402.arr
        }
        break
      }
    }
  }else {
    throw new Error([cljs.core.str("No item "), cljs.core.str(i), cljs.core.str(" in vector of length "), cljs.core.str(pv.cnt)].join(""));
  }
};
cljs.core.do_assoc = function do_assoc(pv, level, node, i, val) {
  var ret__8408 = cljs.core.pv_clone_node.call(null, node);
  if(level === 0) {
    cljs.core.pv_aset.call(null, ret__8408, i & 31, val);
    return ret__8408
  }else {
    var subidx__8409 = i >>> level & 31;
    cljs.core.pv_aset.call(null, ret__8408, subidx__8409, do_assoc.call(null, pv, level - 5, cljs.core.pv_aget.call(null, node, subidx__8409), i, val));
    return ret__8408
  }
};
cljs.core.pop_tail = function pop_tail(pv, level, node) {
  var subidx__8415 = pv.cnt - 2 >>> level & 31;
  if(level > 5) {
    var new_child__8416 = pop_tail.call(null, pv, level - 5, cljs.core.pv_aget.call(null, node, subidx__8415));
    if(function() {
      var and__3822__auto____8417 = new_child__8416 == null;
      if(and__3822__auto____8417) {
        return subidx__8415 === 0
      }else {
        return and__3822__auto____8417
      }
    }()) {
      return null
    }else {
      var ret__8418 = cljs.core.pv_clone_node.call(null, node);
      cljs.core.pv_aset.call(null, ret__8418, subidx__8415, new_child__8416);
      return ret__8418
    }
  }else {
    if(subidx__8415 === 0) {
      return null
    }else {
      if("\ufdd0'else") {
        var ret__8419 = cljs.core.pv_clone_node.call(null, node);
        cljs.core.pv_aset.call(null, ret__8419, subidx__8415, null);
        return ret__8419
      }else {
        return null
      }
    }
  }
};
cljs.core.PersistentVector = function(meta, cnt, shift, root, tail, __hash) {
  this.meta = meta;
  this.cnt = cnt;
  this.shift = shift;
  this.root = root;
  this.tail = tail;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 1;
  this.cljs$lang$protocol_mask$partition0$ = 167668511
};
cljs.core.PersistentVector.cljs$lang$type = true;
cljs.core.PersistentVector.cljs$lang$ctorPrSeq = function(this__2315__auto__) {
  return cljs.core.list.call(null, "cljs.core/PersistentVector")
};
cljs.core.PersistentVector.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = function(coll) {
  var this__8422 = this;
  return new cljs.core.TransientVector(this__8422.cnt, this__8422.shift, cljs.core.tv_editable_root.call(null, this__8422.root), cljs.core.tv_editable_tail.call(null, this__8422.tail))
};
cljs.core.PersistentVector.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__8423 = this;
  var h__2198__auto____8424 = this__8423.__hash;
  if(!(h__2198__auto____8424 == null)) {
    return h__2198__auto____8424
  }else {
    var h__2198__auto____8425 = cljs.core.hash_coll.call(null, coll);
    this__8423.__hash = h__2198__auto____8425;
    return h__2198__auto____8425
  }
};
cljs.core.PersistentVector.prototype.cljs$core$ILookup$_lookup$arity$2 = function(coll, k) {
  var this__8426 = this;
  return coll.cljs$core$IIndexed$_nth$arity$3(coll, k, null)
};
cljs.core.PersistentVector.prototype.cljs$core$ILookup$_lookup$arity$3 = function(coll, k, not_found) {
  var this__8427 = this;
  return coll.cljs$core$IIndexed$_nth$arity$3(coll, k, not_found)
};
cljs.core.PersistentVector.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(coll, k, v) {
  var this__8428 = this;
  if(function() {
    var and__3822__auto____8429 = 0 <= k;
    if(and__3822__auto____8429) {
      return k < this__8428.cnt
    }else {
      return and__3822__auto____8429
    }
  }()) {
    if(cljs.core.tail_off.call(null, coll) <= k) {
      var new_tail__8430 = this__8428.tail.slice();
      new_tail__8430[k & 31] = v;
      return new cljs.core.PersistentVector(this__8428.meta, this__8428.cnt, this__8428.shift, this__8428.root, new_tail__8430, null)
    }else {
      return new cljs.core.PersistentVector(this__8428.meta, this__8428.cnt, this__8428.shift, cljs.core.do_assoc.call(null, coll, this__8428.shift, this__8428.root, k, v), this__8428.tail, null)
    }
  }else {
    if(k === this__8428.cnt) {
      return coll.cljs$core$ICollection$_conj$arity$2(coll, v)
    }else {
      if("\ufdd0'else") {
        throw new Error([cljs.core.str("Index "), cljs.core.str(k), cljs.core.str(" out of bounds  [0,"), cljs.core.str(this__8428.cnt), cljs.core.str("]")].join(""));
      }else {
        return null
      }
    }
  }
};
cljs.core.PersistentVector.prototype.call = function() {
  var G__8478 = null;
  var G__8478__2 = function(this_sym8431, k) {
    var this__8433 = this;
    var this_sym8431__8434 = this;
    var coll__8435 = this_sym8431__8434;
    return coll__8435.cljs$core$ILookup$_lookup$arity$2(coll__8435, k)
  };
  var G__8478__3 = function(this_sym8432, k, not_found) {
    var this__8433 = this;
    var this_sym8432__8436 = this;
    var coll__8437 = this_sym8432__8436;
    return coll__8437.cljs$core$ILookup$_lookup$arity$3(coll__8437, k, not_found)
  };
  G__8478 = function(this_sym8432, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__8478__2.call(this, this_sym8432, k);
      case 3:
        return G__8478__3.call(this, this_sym8432, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__8478
}();
cljs.core.PersistentVector.prototype.apply = function(this_sym8420, args8421) {
  var this__8438 = this;
  return this_sym8420.call.apply(this_sym8420, [this_sym8420].concat(args8421.slice()))
};
cljs.core.PersistentVector.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = function(v, f, init) {
  var this__8439 = this;
  var step_init__8440 = [0, init];
  var i__8441 = 0;
  while(true) {
    if(i__8441 < this__8439.cnt) {
      var arr__8442 = cljs.core.array_for.call(null, v, i__8441);
      var len__8443 = arr__8442.length;
      var init__8447 = function() {
        var j__8444 = 0;
        var init__8445 = step_init__8440[1];
        while(true) {
          if(j__8444 < len__8443) {
            var init__8446 = f.call(null, init__8445, j__8444 + i__8441, arr__8442[j__8444]);
            if(cljs.core.reduced_QMARK_.call(null, init__8446)) {
              return init__8446
            }else {
              var G__8479 = j__8444 + 1;
              var G__8480 = init__8446;
              j__8444 = G__8479;
              init__8445 = G__8480;
              continue
            }
          }else {
            step_init__8440[0] = len__8443;
            step_init__8440[1] = init__8445;
            return init__8445
          }
          break
        }
      }();
      if(cljs.core.reduced_QMARK_.call(null, init__8447)) {
        return cljs.core.deref.call(null, init__8447)
      }else {
        var G__8481 = i__8441 + step_init__8440[0];
        i__8441 = G__8481;
        continue
      }
    }else {
      return step_init__8440[1]
    }
    break
  }
};
cljs.core.PersistentVector.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__8448 = this;
  if(this__8448.cnt - cljs.core.tail_off.call(null, coll) < 32) {
    var new_tail__8449 = this__8448.tail.slice();
    new_tail__8449.push(o);
    return new cljs.core.PersistentVector(this__8448.meta, this__8448.cnt + 1, this__8448.shift, this__8448.root, new_tail__8449, null)
  }else {
    var root_overflow_QMARK___8450 = this__8448.cnt >>> 5 > 1 << this__8448.shift;
    var new_shift__8451 = root_overflow_QMARK___8450 ? this__8448.shift + 5 : this__8448.shift;
    var new_root__8453 = root_overflow_QMARK___8450 ? function() {
      var n_r__8452 = cljs.core.pv_fresh_node.call(null, null);
      cljs.core.pv_aset.call(null, n_r__8452, 0, this__8448.root);
      cljs.core.pv_aset.call(null, n_r__8452, 1, cljs.core.new_path.call(null, null, this__8448.shift, new cljs.core.VectorNode(null, this__8448.tail)));
      return n_r__8452
    }() : cljs.core.push_tail.call(null, coll, this__8448.shift, this__8448.root, new cljs.core.VectorNode(null, this__8448.tail));
    return new cljs.core.PersistentVector(this__8448.meta, this__8448.cnt + 1, new_shift__8451, new_root__8453, [o], null)
  }
};
cljs.core.PersistentVector.prototype.cljs$core$IReversible$_rseq$arity$1 = function(coll) {
  var this__8454 = this;
  if(this__8454.cnt > 0) {
    return new cljs.core.RSeq(coll, this__8454.cnt - 1, null)
  }else {
    return cljs.core.List.EMPTY
  }
};
cljs.core.PersistentVector.prototype.cljs$core$IMapEntry$_key$arity$1 = function(coll) {
  var this__8455 = this;
  return coll.cljs$core$IIndexed$_nth$arity$2(coll, 0)
};
cljs.core.PersistentVector.prototype.cljs$core$IMapEntry$_val$arity$1 = function(coll) {
  var this__8456 = this;
  return coll.cljs$core$IIndexed$_nth$arity$2(coll, 1)
};
cljs.core.PersistentVector.prototype.toString = function() {
  var this__8457 = this;
  var this__8458 = this;
  return cljs.core.pr_str.call(null, this__8458)
};
cljs.core.PersistentVector.prototype.cljs$core$IReduce$_reduce$arity$2 = function(v, f) {
  var this__8459 = this;
  return cljs.core.ci_reduce.call(null, v, f)
};
cljs.core.PersistentVector.prototype.cljs$core$IReduce$_reduce$arity$3 = function(v, f, start) {
  var this__8460 = this;
  return cljs.core.ci_reduce.call(null, v, f, start)
};
cljs.core.PersistentVector.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__8461 = this;
  if(this__8461.cnt === 0) {
    return null
  }else {
    return cljs.core.chunked_seq.call(null, coll, 0, 0)
  }
};
cljs.core.PersistentVector.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__8462 = this;
  return this__8462.cnt
};
cljs.core.PersistentVector.prototype.cljs$core$IStack$_peek$arity$1 = function(coll) {
  var this__8463 = this;
  if(this__8463.cnt > 0) {
    return coll.cljs$core$IIndexed$_nth$arity$2(coll, this__8463.cnt - 1)
  }else {
    return null
  }
};
cljs.core.PersistentVector.prototype.cljs$core$IStack$_pop$arity$1 = function(coll) {
  var this__8464 = this;
  if(this__8464.cnt === 0) {
    throw new Error("Can't pop empty vector");
  }else {
    if(1 === this__8464.cnt) {
      return cljs.core._with_meta.call(null, cljs.core.PersistentVector.EMPTY, this__8464.meta)
    }else {
      if(1 < this__8464.cnt - cljs.core.tail_off.call(null, coll)) {
        return new cljs.core.PersistentVector(this__8464.meta, this__8464.cnt - 1, this__8464.shift, this__8464.root, this__8464.tail.slice(0, -1), null)
      }else {
        if("\ufdd0'else") {
          var new_tail__8465 = cljs.core.array_for.call(null, coll, this__8464.cnt - 2);
          var nr__8466 = cljs.core.pop_tail.call(null, coll, this__8464.shift, this__8464.root);
          var new_root__8467 = nr__8466 == null ? cljs.core.PersistentVector.EMPTY_NODE : nr__8466;
          var cnt_1__8468 = this__8464.cnt - 1;
          if(function() {
            var and__3822__auto____8469 = 5 < this__8464.shift;
            if(and__3822__auto____8469) {
              return cljs.core.pv_aget.call(null, new_root__8467, 1) == null
            }else {
              return and__3822__auto____8469
            }
          }()) {
            return new cljs.core.PersistentVector(this__8464.meta, cnt_1__8468, this__8464.shift - 5, cljs.core.pv_aget.call(null, new_root__8467, 0), new_tail__8465, null)
          }else {
            return new cljs.core.PersistentVector(this__8464.meta, cnt_1__8468, this__8464.shift, new_root__8467, new_tail__8465, null)
          }
        }else {
          return null
        }
      }
    }
  }
};
cljs.core.PersistentVector.prototype.cljs$core$IVector$_assoc_n$arity$3 = function(coll, n, val) {
  var this__8470 = this;
  return coll.cljs$core$IAssociative$_assoc$arity$3(coll, n, val)
};
cljs.core.PersistentVector.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__8471 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.PersistentVector.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__8472 = this;
  return new cljs.core.PersistentVector(meta, this__8472.cnt, this__8472.shift, this__8472.root, this__8472.tail, this__8472.__hash)
};
cljs.core.PersistentVector.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__8473 = this;
  return this__8473.meta
};
cljs.core.PersistentVector.prototype.cljs$core$IIndexed$_nth$arity$2 = function(coll, n) {
  var this__8474 = this;
  return cljs.core.array_for.call(null, coll, n)[n & 31]
};
cljs.core.PersistentVector.prototype.cljs$core$IIndexed$_nth$arity$3 = function(coll, n, not_found) {
  var this__8475 = this;
  if(function() {
    var and__3822__auto____8476 = 0 <= n;
    if(and__3822__auto____8476) {
      return n < this__8475.cnt
    }else {
      return and__3822__auto____8476
    }
  }()) {
    return coll.cljs$core$IIndexed$_nth$arity$2(coll, n)
  }else {
    return not_found
  }
};
cljs.core.PersistentVector.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__8477 = this;
  return cljs.core.with_meta.call(null, cljs.core.PersistentVector.EMPTY, this__8477.meta)
};
cljs.core.PersistentVector;
cljs.core.PersistentVector.EMPTY_NODE = cljs.core.pv_fresh_node.call(null, null);
cljs.core.PersistentVector.EMPTY = new cljs.core.PersistentVector(null, 0, 5, cljs.core.PersistentVector.EMPTY_NODE, [], 0);
cljs.core.PersistentVector.fromArray = function(xs, no_clone) {
  var l__8482 = xs.length;
  var xs__8483 = no_clone === true ? xs : xs.slice();
  if(l__8482 < 32) {
    return new cljs.core.PersistentVector(null, l__8482, 5, cljs.core.PersistentVector.EMPTY_NODE, xs__8483, null)
  }else {
    var node__8484 = xs__8483.slice(0, 32);
    var v__8485 = new cljs.core.PersistentVector(null, 32, 5, cljs.core.PersistentVector.EMPTY_NODE, node__8484, null);
    var i__8486 = 32;
    var out__8487 = cljs.core._as_transient.call(null, v__8485);
    while(true) {
      if(i__8486 < l__8482) {
        var G__8488 = i__8486 + 1;
        var G__8489 = cljs.core.conj_BANG_.call(null, out__8487, xs__8483[i__8486]);
        i__8486 = G__8488;
        out__8487 = G__8489;
        continue
      }else {
        return cljs.core.persistent_BANG_.call(null, out__8487)
      }
      break
    }
  }
};
cljs.core.vec = function vec(coll) {
  return cljs.core._persistent_BANG_.call(null, cljs.core.reduce.call(null, cljs.core._conj_BANG_, cljs.core._as_transient.call(null, cljs.core.PersistentVector.EMPTY), coll))
};
cljs.core.vector = function() {
  var vector__delegate = function(args) {
    return cljs.core.vec.call(null, args)
  };
  var vector = function(var_args) {
    var args = null;
    if(goog.isDef(var_args)) {
      args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return vector__delegate.call(this, args)
  };
  vector.cljs$lang$maxFixedArity = 0;
  vector.cljs$lang$applyTo = function(arglist__8490) {
    var args = cljs.core.seq(arglist__8490);
    return vector__delegate(args)
  };
  vector.cljs$lang$arity$variadic = vector__delegate;
  return vector
}();
cljs.core.ChunkedSeq = function(vec, node, i, off, meta) {
  this.vec = vec;
  this.node = node;
  this.i = i;
  this.off = off;
  this.meta = meta;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 27525356
};
cljs.core.ChunkedSeq.cljs$lang$type = true;
cljs.core.ChunkedSeq.cljs$lang$ctorPrSeq = function(this__2315__auto__) {
  return cljs.core.list.call(null, "cljs.core/ChunkedSeq")
};
cljs.core.ChunkedSeq.prototype.cljs$core$INext$_next$arity$1 = function(coll) {
  var this__8491 = this;
  if(this__8491.off + 1 < this__8491.node.length) {
    var s__8492 = cljs.core.chunked_seq.call(null, this__8491.vec, this__8491.node, this__8491.i, this__8491.off + 1);
    if(s__8492 == null) {
      return null
    }else {
      return s__8492
    }
  }else {
    return coll.cljs$core$IChunkedNext$_chunked_next$arity$1(coll)
  }
};
cljs.core.ChunkedSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__8493 = this;
  return cljs.core.cons.call(null, o, coll)
};
cljs.core.ChunkedSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__8494 = this;
  return coll
};
cljs.core.ChunkedSeq.prototype.cljs$core$ISeq$_first$arity$1 = function(coll) {
  var this__8495 = this;
  return this__8495.node[this__8495.off]
};
cljs.core.ChunkedSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(coll) {
  var this__8496 = this;
  if(this__8496.off + 1 < this__8496.node.length) {
    var s__8497 = cljs.core.chunked_seq.call(null, this__8496.vec, this__8496.node, this__8496.i, this__8496.off + 1);
    if(s__8497 == null) {
      return cljs.core.List.EMPTY
    }else {
      return s__8497
    }
  }else {
    return coll.cljs$core$IChunkedSeq$_chunked_rest$arity$1(coll)
  }
};
cljs.core.ChunkedSeq.prototype.cljs$core$IChunkedNext$ = true;
cljs.core.ChunkedSeq.prototype.cljs$core$IChunkedNext$_chunked_next$arity$1 = function(coll) {
  var this__8498 = this;
  var l__8499 = this__8498.node.length;
  var s__8500 = this__8498.i + l__8499 < cljs.core._count.call(null, this__8498.vec) ? cljs.core.chunked_seq.call(null, this__8498.vec, this__8498.i + l__8499, 0) : null;
  if(s__8500 == null) {
    return null
  }else {
    return s__8500
  }
};
cljs.core.ChunkedSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__8501 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.ChunkedSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, m) {
  var this__8502 = this;
  return cljs.core.chunked_seq.call(null, this__8502.vec, this__8502.node, this__8502.i, this__8502.off, m)
};
cljs.core.ChunkedSeq.prototype.cljs$core$IWithMeta$_meta$arity$1 = function(coll) {
  var this__8503 = this;
  return this__8503.meta
};
cljs.core.ChunkedSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__8504 = this;
  return cljs.core.with_meta.call(null, cljs.core.PersistentVector.EMPTY, this__8504.meta)
};
cljs.core.ChunkedSeq.prototype.cljs$core$IChunkedSeq$ = true;
cljs.core.ChunkedSeq.prototype.cljs$core$IChunkedSeq$_chunked_first$arity$1 = function(coll) {
  var this__8505 = this;
  return cljs.core.array_chunk.call(null, this__8505.node, this__8505.off)
};
cljs.core.ChunkedSeq.prototype.cljs$core$IChunkedSeq$_chunked_rest$arity$1 = function(coll) {
  var this__8506 = this;
  var l__8507 = this__8506.node.length;
  var s__8508 = this__8506.i + l__8507 < cljs.core._count.call(null, this__8506.vec) ? cljs.core.chunked_seq.call(null, this__8506.vec, this__8506.i + l__8507, 0) : null;
  if(s__8508 == null) {
    return cljs.core.List.EMPTY
  }else {
    return s__8508
  }
};
cljs.core.ChunkedSeq;
cljs.core.chunked_seq = function() {
  var chunked_seq = null;
  var chunked_seq__3 = function(vec, i, off) {
    return chunked_seq.call(null, vec, cljs.core.array_for.call(null, vec, i), i, off, null)
  };
  var chunked_seq__4 = function(vec, node, i, off) {
    return chunked_seq.call(null, vec, node, i, off, null)
  };
  var chunked_seq__5 = function(vec, node, i, off, meta) {
    return new cljs.core.ChunkedSeq(vec, node, i, off, meta)
  };
  chunked_seq = function(vec, node, i, off, meta) {
    switch(arguments.length) {
      case 3:
        return chunked_seq__3.call(this, vec, node, i);
      case 4:
        return chunked_seq__4.call(this, vec, node, i, off);
      case 5:
        return chunked_seq__5.call(this, vec, node, i, off, meta)
    }
    throw"Invalid arity: " + arguments.length;
  };
  chunked_seq.cljs$lang$arity$3 = chunked_seq__3;
  chunked_seq.cljs$lang$arity$4 = chunked_seq__4;
  chunked_seq.cljs$lang$arity$5 = chunked_seq__5;
  return chunked_seq
}();
cljs.core.Subvec = function(meta, v, start, end, __hash) {
  this.meta = meta;
  this.v = v;
  this.start = start;
  this.end = end;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 32400159
};
cljs.core.Subvec.cljs$lang$type = true;
cljs.core.Subvec.cljs$lang$ctorPrSeq = function(this__2315__auto__) {
  return cljs.core.list.call(null, "cljs.core/Subvec")
};
cljs.core.Subvec.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__8511 = this;
  var h__2198__auto____8512 = this__8511.__hash;
  if(!(h__2198__auto____8512 == null)) {
    return h__2198__auto____8512
  }else {
    var h__2198__auto____8513 = cljs.core.hash_coll.call(null, coll);
    this__8511.__hash = h__2198__auto____8513;
    return h__2198__auto____8513
  }
};
cljs.core.Subvec.prototype.cljs$core$ILookup$_lookup$arity$2 = function(coll, k) {
  var this__8514 = this;
  return coll.cljs$core$IIndexed$_nth$arity$3(coll, k, null)
};
cljs.core.Subvec.prototype.cljs$core$ILookup$_lookup$arity$3 = function(coll, k, not_found) {
  var this__8515 = this;
  return coll.cljs$core$IIndexed$_nth$arity$3(coll, k, not_found)
};
cljs.core.Subvec.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(coll, key, val) {
  var this__8516 = this;
  var v_pos__8517 = this__8516.start + key;
  return new cljs.core.Subvec(this__8516.meta, cljs.core._assoc.call(null, this__8516.v, v_pos__8517, val), this__8516.start, this__8516.end > v_pos__8517 + 1 ? this__8516.end : v_pos__8517 + 1, null)
};
cljs.core.Subvec.prototype.call = function() {
  var G__8543 = null;
  var G__8543__2 = function(this_sym8518, k) {
    var this__8520 = this;
    var this_sym8518__8521 = this;
    var coll__8522 = this_sym8518__8521;
    return coll__8522.cljs$core$ILookup$_lookup$arity$2(coll__8522, k)
  };
  var G__8543__3 = function(this_sym8519, k, not_found) {
    var this__8520 = this;
    var this_sym8519__8523 = this;
    var coll__8524 = this_sym8519__8523;
    return coll__8524.cljs$core$ILookup$_lookup$arity$3(coll__8524, k, not_found)
  };
  G__8543 = function(this_sym8519, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__8543__2.call(this, this_sym8519, k);
      case 3:
        return G__8543__3.call(this, this_sym8519, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__8543
}();
cljs.core.Subvec.prototype.apply = function(this_sym8509, args8510) {
  var this__8525 = this;
  return this_sym8509.call.apply(this_sym8509, [this_sym8509].concat(args8510.slice()))
};
cljs.core.Subvec.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__8526 = this;
  return new cljs.core.Subvec(this__8526.meta, cljs.core._assoc_n.call(null, this__8526.v, this__8526.end, o), this__8526.start, this__8526.end + 1, null)
};
cljs.core.Subvec.prototype.toString = function() {
  var this__8527 = this;
  var this__8528 = this;
  return cljs.core.pr_str.call(null, this__8528)
};
cljs.core.Subvec.prototype.cljs$core$IReduce$_reduce$arity$2 = function(coll, f) {
  var this__8529 = this;
  return cljs.core.ci_reduce.call(null, coll, f)
};
cljs.core.Subvec.prototype.cljs$core$IReduce$_reduce$arity$3 = function(coll, f, start) {
  var this__8530 = this;
  return cljs.core.ci_reduce.call(null, coll, f, start)
};
cljs.core.Subvec.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__8531 = this;
  var subvec_seq__8532 = function subvec_seq(i) {
    if(i === this__8531.end) {
      return null
    }else {
      return cljs.core.cons.call(null, cljs.core._nth.call(null, this__8531.v, i), new cljs.core.LazySeq(null, false, function() {
        return subvec_seq.call(null, i + 1)
      }, null))
    }
  };
  return subvec_seq__8532.call(null, this__8531.start)
};
cljs.core.Subvec.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__8533 = this;
  return this__8533.end - this__8533.start
};
cljs.core.Subvec.prototype.cljs$core$IStack$_peek$arity$1 = function(coll) {
  var this__8534 = this;
  return cljs.core._nth.call(null, this__8534.v, this__8534.end - 1)
};
cljs.core.Subvec.prototype.cljs$core$IStack$_pop$arity$1 = function(coll) {
  var this__8535 = this;
  if(this__8535.start === this__8535.end) {
    throw new Error("Can't pop empty vector");
  }else {
    return new cljs.core.Subvec(this__8535.meta, this__8535.v, this__8535.start, this__8535.end - 1, null)
  }
};
cljs.core.Subvec.prototype.cljs$core$IVector$_assoc_n$arity$3 = function(coll, n, val) {
  var this__8536 = this;
  return coll.cljs$core$IAssociative$_assoc$arity$3(coll, n, val)
};
cljs.core.Subvec.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__8537 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.Subvec.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__8538 = this;
  return new cljs.core.Subvec(meta, this__8538.v, this__8538.start, this__8538.end, this__8538.__hash)
};
cljs.core.Subvec.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__8539 = this;
  return this__8539.meta
};
cljs.core.Subvec.prototype.cljs$core$IIndexed$_nth$arity$2 = function(coll, n) {
  var this__8540 = this;
  return cljs.core._nth.call(null, this__8540.v, this__8540.start + n)
};
cljs.core.Subvec.prototype.cljs$core$IIndexed$_nth$arity$3 = function(coll, n, not_found) {
  var this__8541 = this;
  return cljs.core._nth.call(null, this__8541.v, this__8541.start + n, not_found)
};
cljs.core.Subvec.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__8542 = this;
  return cljs.core.with_meta.call(null, cljs.core.Vector.EMPTY, this__8542.meta)
};
cljs.core.Subvec;
cljs.core.subvec = function() {
  var subvec = null;
  var subvec__2 = function(v, start) {
    return subvec.call(null, v, start, cljs.core.count.call(null, v))
  };
  var subvec__3 = function(v, start, end) {
    return new cljs.core.Subvec(null, v, start, end, null)
  };
  subvec = function(v, start, end) {
    switch(arguments.length) {
      case 2:
        return subvec__2.call(this, v, start);
      case 3:
        return subvec__3.call(this, v, start, end)
    }
    throw"Invalid arity: " + arguments.length;
  };
  subvec.cljs$lang$arity$2 = subvec__2;
  subvec.cljs$lang$arity$3 = subvec__3;
  return subvec
}();
cljs.core.tv_ensure_editable = function tv_ensure_editable(edit, node) {
  if(edit === node.edit) {
    return node
  }else {
    return new cljs.core.VectorNode(edit, node.arr.slice())
  }
};
cljs.core.tv_editable_root = function tv_editable_root(node) {
  return new cljs.core.VectorNode({}, node.arr.slice())
};
cljs.core.tv_editable_tail = function tv_editable_tail(tl) {
  var ret__8545 = cljs.core.make_array.call(null, 32);
  cljs.core.array_copy.call(null, tl, 0, ret__8545, 0, tl.length);
  return ret__8545
};
cljs.core.tv_push_tail = function tv_push_tail(tv, level, parent, tail_node) {
  var ret__8549 = cljs.core.tv_ensure_editable.call(null, tv.root.edit, parent);
  var subidx__8550 = tv.cnt - 1 >>> level & 31;
  cljs.core.pv_aset.call(null, ret__8549, subidx__8550, level === 5 ? tail_node : function() {
    var child__8551 = cljs.core.pv_aget.call(null, ret__8549, subidx__8550);
    if(!(child__8551 == null)) {
      return tv_push_tail.call(null, tv, level - 5, child__8551, tail_node)
    }else {
      return cljs.core.new_path.call(null, tv.root.edit, level - 5, tail_node)
    }
  }());
  return ret__8549
};
cljs.core.tv_pop_tail = function tv_pop_tail(tv, level, node) {
  var node__8556 = cljs.core.tv_ensure_editable.call(null, tv.root.edit, node);
  var subidx__8557 = tv.cnt - 2 >>> level & 31;
  if(level > 5) {
    var new_child__8558 = tv_pop_tail.call(null, tv, level - 5, cljs.core.pv_aget.call(null, node__8556, subidx__8557));
    if(function() {
      var and__3822__auto____8559 = new_child__8558 == null;
      if(and__3822__auto____8559) {
        return subidx__8557 === 0
      }else {
        return and__3822__auto____8559
      }
    }()) {
      return null
    }else {
      cljs.core.pv_aset.call(null, node__8556, subidx__8557, new_child__8558);
      return node__8556
    }
  }else {
    if(subidx__8557 === 0) {
      return null
    }else {
      if("\ufdd0'else") {
        cljs.core.pv_aset.call(null, node__8556, subidx__8557, null);
        return node__8556
      }else {
        return null
      }
    }
  }
};
cljs.core.editable_array_for = function editable_array_for(tv, i) {
  if(function() {
    var and__3822__auto____8564 = 0 <= i;
    if(and__3822__auto____8564) {
      return i < tv.cnt
    }else {
      return and__3822__auto____8564
    }
  }()) {
    if(i >= cljs.core.tail_off.call(null, tv)) {
      return tv.tail
    }else {
      var root__8565 = tv.root;
      var node__8566 = root__8565;
      var level__8567 = tv.shift;
      while(true) {
        if(level__8567 > 0) {
          var G__8568 = cljs.core.tv_ensure_editable.call(null, root__8565.edit, cljs.core.pv_aget.call(null, node__8566, i >>> level__8567 & 31));
          var G__8569 = level__8567 - 5;
          node__8566 = G__8568;
          level__8567 = G__8569;
          continue
        }else {
          return node__8566.arr
        }
        break
      }
    }
  }else {
    throw new Error([cljs.core.str("No item "), cljs.core.str(i), cljs.core.str(" in transient vector of length "), cljs.core.str(tv.cnt)].join(""));
  }
};
cljs.core.TransientVector = function(cnt, shift, root, tail) {
  this.cnt = cnt;
  this.shift = shift;
  this.root = root;
  this.tail = tail;
  this.cljs$lang$protocol_mask$partition0$ = 275;
  this.cljs$lang$protocol_mask$partition1$ = 22
};
cljs.core.TransientVector.cljs$lang$type = true;
cljs.core.TransientVector.cljs$lang$ctorPrSeq = function(this__2315__auto__) {
  return cljs.core.list.call(null, "cljs.core/TransientVector")
};
cljs.core.TransientVector.prototype.call = function() {
  var G__8609 = null;
  var G__8609__2 = function(this_sym8572, k) {
    var this__8574 = this;
    var this_sym8572__8575 = this;
    var coll__8576 = this_sym8572__8575;
    return coll__8576.cljs$core$ILookup$_lookup$arity$2(coll__8576, k)
  };
  var G__8609__3 = function(this_sym8573, k, not_found) {
    var this__8574 = this;
    var this_sym8573__8577 = this;
    var coll__8578 = this_sym8573__8577;
    return coll__8578.cljs$core$ILookup$_lookup$arity$3(coll__8578, k, not_found)
  };
  G__8609 = function(this_sym8573, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__8609__2.call(this, this_sym8573, k);
      case 3:
        return G__8609__3.call(this, this_sym8573, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__8609
}();
cljs.core.TransientVector.prototype.apply = function(this_sym8570, args8571) {
  var this__8579 = this;
  return this_sym8570.call.apply(this_sym8570, [this_sym8570].concat(args8571.slice()))
};
cljs.core.TransientVector.prototype.cljs$core$ILookup$_lookup$arity$2 = function(coll, k) {
  var this__8580 = this;
  return coll.cljs$core$IIndexed$_nth$arity$3(coll, k, null)
};
cljs.core.TransientVector.prototype.cljs$core$ILookup$_lookup$arity$3 = function(coll, k, not_found) {
  var this__8581 = this;
  return coll.cljs$core$IIndexed$_nth$arity$3(coll, k, not_found)
};
cljs.core.TransientVector.prototype.cljs$core$IIndexed$_nth$arity$2 = function(coll, n) {
  var this__8582 = this;
  if(this__8582.root.edit) {
    return cljs.core.array_for.call(null, coll, n)[n & 31]
  }else {
    throw new Error("nth after persistent!");
  }
};
cljs.core.TransientVector.prototype.cljs$core$IIndexed$_nth$arity$3 = function(coll, n, not_found) {
  var this__8583 = this;
  if(function() {
    var and__3822__auto____8584 = 0 <= n;
    if(and__3822__auto____8584) {
      return n < this__8583.cnt
    }else {
      return and__3822__auto____8584
    }
  }()) {
    return coll.cljs$core$IIndexed$_nth$arity$2(coll, n)
  }else {
    return not_found
  }
};
cljs.core.TransientVector.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__8585 = this;
  if(this__8585.root.edit) {
    return this__8585.cnt
  }else {
    throw new Error("count after persistent!");
  }
};
cljs.core.TransientVector.prototype.cljs$core$ITransientVector$_assoc_n_BANG_$arity$3 = function(tcoll, n, val) {
  var this__8586 = this;
  if(this__8586.root.edit) {
    if(function() {
      var and__3822__auto____8587 = 0 <= n;
      if(and__3822__auto____8587) {
        return n < this__8586.cnt
      }else {
        return and__3822__auto____8587
      }
    }()) {
      if(cljs.core.tail_off.call(null, tcoll) <= n) {
        this__8586.tail[n & 31] = val;
        return tcoll
      }else {
        var new_root__8592 = function go(level, node) {
          var node__8590 = cljs.core.tv_ensure_editable.call(null, this__8586.root.edit, node);
          if(level === 0) {
            cljs.core.pv_aset.call(null, node__8590, n & 31, val);
            return node__8590
          }else {
            var subidx__8591 = n >>> level & 31;
            cljs.core.pv_aset.call(null, node__8590, subidx__8591, go.call(null, level - 5, cljs.core.pv_aget.call(null, node__8590, subidx__8591)));
            return node__8590
          }
        }.call(null, this__8586.shift, this__8586.root);
        this__8586.root = new_root__8592;
        return tcoll
      }
    }else {
      if(n === this__8586.cnt) {
        return tcoll.cljs$core$ITransientCollection$_conj_BANG_$arity$2(tcoll, val)
      }else {
        if("\ufdd0'else") {
          throw new Error([cljs.core.str("Index "), cljs.core.str(n), cljs.core.str(" out of bounds for TransientVector of length"), cljs.core.str(this__8586.cnt)].join(""));
        }else {
          return null
        }
      }
    }
  }else {
    throw new Error("assoc! after persistent!");
  }
};
cljs.core.TransientVector.prototype.cljs$core$ITransientVector$_pop_BANG_$arity$1 = function(tcoll) {
  var this__8593 = this;
  if(this__8593.root.edit) {
    if(this__8593.cnt === 0) {
      throw new Error("Can't pop empty vector");
    }else {
      if(1 === this__8593.cnt) {
        this__8593.cnt = 0;
        return tcoll
      }else {
        if((this__8593.cnt - 1 & 31) > 0) {
          this__8593.cnt = this__8593.cnt - 1;
          return tcoll
        }else {
          if("\ufdd0'else") {
            var new_tail__8594 = cljs.core.editable_array_for.call(null, tcoll, this__8593.cnt - 2);
            var new_root__8596 = function() {
              var nr__8595 = cljs.core.tv_pop_tail.call(null, tcoll, this__8593.shift, this__8593.root);
              if(!(nr__8595 == null)) {
                return nr__8595
              }else {
                return new cljs.core.VectorNode(this__8593.root.edit, cljs.core.make_array.call(null, 32))
              }
            }();
            if(function() {
              var and__3822__auto____8597 = 5 < this__8593.shift;
              if(and__3822__auto____8597) {
                return cljs.core.pv_aget.call(null, new_root__8596, 1) == null
              }else {
                return and__3822__auto____8597
              }
            }()) {
              var new_root__8598 = cljs.core.tv_ensure_editable.call(null, this__8593.root.edit, cljs.core.pv_aget.call(null, new_root__8596, 0));
              this__8593.root = new_root__8598;
              this__8593.shift = this__8593.shift - 5;
              this__8593.cnt = this__8593.cnt - 1;
              this__8593.tail = new_tail__8594;
              return tcoll
            }else {
              this__8593.root = new_root__8596;
              this__8593.cnt = this__8593.cnt - 1;
              this__8593.tail = new_tail__8594;
              return tcoll
            }
          }else {
            return null
          }
        }
      }
    }
  }else {
    throw new Error("pop! after persistent!");
  }
};
cljs.core.TransientVector.prototype.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3 = function(tcoll, key, val) {
  var this__8599 = this;
  return tcoll.cljs$core$ITransientVector$_assoc_n_BANG_$arity$3(tcoll, key, val)
};
cljs.core.TransientVector.prototype.cljs$core$ITransientCollection$_conj_BANG_$arity$2 = function(tcoll, o) {
  var this__8600 = this;
  if(this__8600.root.edit) {
    if(this__8600.cnt - cljs.core.tail_off.call(null, tcoll) < 32) {
      this__8600.tail[this__8600.cnt & 31] = o;
      this__8600.cnt = this__8600.cnt + 1;
      return tcoll
    }else {
      var tail_node__8601 = new cljs.core.VectorNode(this__8600.root.edit, this__8600.tail);
      var new_tail__8602 = cljs.core.make_array.call(null, 32);
      new_tail__8602[0] = o;
      this__8600.tail = new_tail__8602;
      if(this__8600.cnt >>> 5 > 1 << this__8600.shift) {
        var new_root_array__8603 = cljs.core.make_array.call(null, 32);
        var new_shift__8604 = this__8600.shift + 5;
        new_root_array__8603[0] = this__8600.root;
        new_root_array__8603[1] = cljs.core.new_path.call(null, this__8600.root.edit, this__8600.shift, tail_node__8601);
        this__8600.root = new cljs.core.VectorNode(this__8600.root.edit, new_root_array__8603);
        this__8600.shift = new_shift__8604;
        this__8600.cnt = this__8600.cnt + 1;
        return tcoll
      }else {
        var new_root__8605 = cljs.core.tv_push_tail.call(null, tcoll, this__8600.shift, this__8600.root, tail_node__8601);
        this__8600.root = new_root__8605;
        this__8600.cnt = this__8600.cnt + 1;
        return tcoll
      }
    }
  }else {
    throw new Error("conj! after persistent!");
  }
};
cljs.core.TransientVector.prototype.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 = function(tcoll) {
  var this__8606 = this;
  if(this__8606.root.edit) {
    this__8606.root.edit = null;
    var len__8607 = this__8606.cnt - cljs.core.tail_off.call(null, tcoll);
    var trimmed_tail__8608 = cljs.core.make_array.call(null, len__8607);
    cljs.core.array_copy.call(null, this__8606.tail, 0, trimmed_tail__8608, 0, len__8607);
    return new cljs.core.PersistentVector(null, this__8606.cnt, this__8606.shift, this__8606.root, trimmed_tail__8608, null)
  }else {
    throw new Error("persistent! called twice");
  }
};
cljs.core.TransientVector;
cljs.core.PersistentQueueSeq = function(meta, front, rear, __hash) {
  this.meta = meta;
  this.front = front;
  this.rear = rear;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 31850572
};
cljs.core.PersistentQueueSeq.cljs$lang$type = true;
cljs.core.PersistentQueueSeq.cljs$lang$ctorPrSeq = function(this__2315__auto__) {
  return cljs.core.list.call(null, "cljs.core/PersistentQueueSeq")
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__8610 = this;
  var h__2198__auto____8611 = this__8610.__hash;
  if(!(h__2198__auto____8611 == null)) {
    return h__2198__auto____8611
  }else {
    var h__2198__auto____8612 = cljs.core.hash_coll.call(null, coll);
    this__8610.__hash = h__2198__auto____8612;
    return h__2198__auto____8612
  }
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__8613 = this;
  return cljs.core.cons.call(null, o, coll)
};
cljs.core.PersistentQueueSeq.prototype.toString = function() {
  var this__8614 = this;
  var this__8615 = this;
  return cljs.core.pr_str.call(null, this__8615)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__8616 = this;
  return coll
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeq$_first$arity$1 = function(coll) {
  var this__8617 = this;
  return cljs.core._first.call(null, this__8617.front)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(coll) {
  var this__8618 = this;
  var temp__3971__auto____8619 = cljs.core.next.call(null, this__8618.front);
  if(temp__3971__auto____8619) {
    var f1__8620 = temp__3971__auto____8619;
    return new cljs.core.PersistentQueueSeq(this__8618.meta, f1__8620, this__8618.rear, null)
  }else {
    if(this__8618.rear == null) {
      return coll.cljs$core$IEmptyableCollection$_empty$arity$1(coll)
    }else {
      return new cljs.core.PersistentQueueSeq(this__8618.meta, this__8618.rear, null, null)
    }
  }
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__8621 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__8622 = this;
  return new cljs.core.PersistentQueueSeq(meta, this__8622.front, this__8622.rear, this__8622.__hash)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__8623 = this;
  return this__8623.meta
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__8624 = this;
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this__8624.meta)
};
cljs.core.PersistentQueueSeq;
cljs.core.PersistentQueue = function(meta, count, front, rear, __hash) {
  this.meta = meta;
  this.count = count;
  this.front = front;
  this.rear = rear;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 31858766
};
cljs.core.PersistentQueue.cljs$lang$type = true;
cljs.core.PersistentQueue.cljs$lang$ctorPrSeq = function(this__2315__auto__) {
  return cljs.core.list.call(null, "cljs.core/PersistentQueue")
};
cljs.core.PersistentQueue.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__8625 = this;
  var h__2198__auto____8626 = this__8625.__hash;
  if(!(h__2198__auto____8626 == null)) {
    return h__2198__auto____8626
  }else {
    var h__2198__auto____8627 = cljs.core.hash_coll.call(null, coll);
    this__8625.__hash = h__2198__auto____8627;
    return h__2198__auto____8627
  }
};
cljs.core.PersistentQueue.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__8628 = this;
  if(cljs.core.truth_(this__8628.front)) {
    return new cljs.core.PersistentQueue(this__8628.meta, this__8628.count + 1, this__8628.front, cljs.core.conj.call(null, function() {
      var or__3824__auto____8629 = this__8628.rear;
      if(cljs.core.truth_(or__3824__auto____8629)) {
        return or__3824__auto____8629
      }else {
        return cljs.core.PersistentVector.EMPTY
      }
    }(), o), null)
  }else {
    return new cljs.core.PersistentQueue(this__8628.meta, this__8628.count + 1, cljs.core.conj.call(null, this__8628.front, o), cljs.core.PersistentVector.EMPTY, null)
  }
};
cljs.core.PersistentQueue.prototype.toString = function() {
  var this__8630 = this;
  var this__8631 = this;
  return cljs.core.pr_str.call(null, this__8631)
};
cljs.core.PersistentQueue.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__8632 = this;
  var rear__8633 = cljs.core.seq.call(null, this__8632.rear);
  if(cljs.core.truth_(function() {
    var or__3824__auto____8634 = this__8632.front;
    if(cljs.core.truth_(or__3824__auto____8634)) {
      return or__3824__auto____8634
    }else {
      return rear__8633
    }
  }())) {
    return new cljs.core.PersistentQueueSeq(null, this__8632.front, cljs.core.seq.call(null, rear__8633), null)
  }else {
    return null
  }
};
cljs.core.PersistentQueue.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__8635 = this;
  return this__8635.count
};
cljs.core.PersistentQueue.prototype.cljs$core$IStack$_peek$arity$1 = function(coll) {
  var this__8636 = this;
  return cljs.core._first.call(null, this__8636.front)
};
cljs.core.PersistentQueue.prototype.cljs$core$IStack$_pop$arity$1 = function(coll) {
  var this__8637 = this;
  if(cljs.core.truth_(this__8637.front)) {
    var temp__3971__auto____8638 = cljs.core.next.call(null, this__8637.front);
    if(temp__3971__auto____8638) {
      var f1__8639 = temp__3971__auto____8638;
      return new cljs.core.PersistentQueue(this__8637.meta, this__8637.count - 1, f1__8639, this__8637.rear, null)
    }else {
      return new cljs.core.PersistentQueue(this__8637.meta, this__8637.count - 1, cljs.core.seq.call(null, this__8637.rear), cljs.core.PersistentVector.EMPTY, null)
    }
  }else {
    return coll
  }
};
cljs.core.PersistentQueue.prototype.cljs$core$ISeq$_first$arity$1 = function(coll) {
  var this__8640 = this;
  return cljs.core.first.call(null, this__8640.front)
};
cljs.core.PersistentQueue.prototype.cljs$core$ISeq$_rest$arity$1 = function(coll) {
  var this__8641 = this;
  return cljs.core.rest.call(null, cljs.core.seq.call(null, coll))
};
cljs.core.PersistentQueue.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__8642 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.PersistentQueue.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__8643 = this;
  return new cljs.core.PersistentQueue(meta, this__8643.count, this__8643.front, this__8643.rear, this__8643.__hash)
};
cljs.core.PersistentQueue.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__8644 = this;
  return this__8644.meta
};
cljs.core.PersistentQueue.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__8645 = this;
  return cljs.core.PersistentQueue.EMPTY
};
cljs.core.PersistentQueue;
cljs.core.PersistentQueue.EMPTY = new cljs.core.PersistentQueue(null, 0, null, cljs.core.PersistentVector.EMPTY, 0);
cljs.core.NeverEquiv = function() {
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 2097152
};
cljs.core.NeverEquiv.cljs$lang$type = true;
cljs.core.NeverEquiv.cljs$lang$ctorPrSeq = function(this__2315__auto__) {
  return cljs.core.list.call(null, "cljs.core/NeverEquiv")
};
cljs.core.NeverEquiv.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(o, other) {
  var this__8646 = this;
  return false
};
cljs.core.NeverEquiv;
cljs.core.never_equiv = new cljs.core.NeverEquiv;
cljs.core.equiv_map = function equiv_map(x, y) {
  return cljs.core.boolean$.call(null, cljs.core.map_QMARK_.call(null, y) ? cljs.core.count.call(null, x) === cljs.core.count.call(null, y) ? cljs.core.every_QMARK_.call(null, cljs.core.identity, cljs.core.map.call(null, function(xkv) {
    return cljs.core._EQ_.call(null, cljs.core._lookup.call(null, y, cljs.core.first.call(null, xkv), cljs.core.never_equiv), cljs.core.second.call(null, xkv))
  }, x)) : null : null)
};
cljs.core.scan_array = function scan_array(incr, k, array) {
  var len__8649 = array.length;
  var i__8650 = 0;
  while(true) {
    if(i__8650 < len__8649) {
      if(k === array[i__8650]) {
        return i__8650
      }else {
        var G__8651 = i__8650 + incr;
        i__8650 = G__8651;
        continue
      }
    }else {
      return null
    }
    break
  }
};
cljs.core.obj_map_compare_keys = function obj_map_compare_keys(a, b) {
  var a__8654 = cljs.core.hash.call(null, a);
  var b__8655 = cljs.core.hash.call(null, b);
  if(a__8654 < b__8655) {
    return-1
  }else {
    if(a__8654 > b__8655) {
      return 1
    }else {
      if("\ufdd0'else") {
        return 0
      }else {
        return null
      }
    }
  }
};
cljs.core.obj_map__GT_hash_map = function obj_map__GT_hash_map(m, k, v) {
  var ks__8663 = m.keys;
  var len__8664 = ks__8663.length;
  var so__8665 = m.strobj;
  var out__8666 = cljs.core.with_meta.call(null, cljs.core.PersistentHashMap.EMPTY, cljs.core.meta.call(null, m));
  var i__8667 = 0;
  var out__8668 = cljs.core.transient$.call(null, out__8666);
  while(true) {
    if(i__8667 < len__8664) {
      var k__8669 = ks__8663[i__8667];
      var G__8670 = i__8667 + 1;
      var G__8671 = cljs.core.assoc_BANG_.call(null, out__8668, k__8669, so__8665[k__8669]);
      i__8667 = G__8670;
      out__8668 = G__8671;
      continue
    }else {
      return cljs.core.persistent_BANG_.call(null, cljs.core.assoc_BANG_.call(null, out__8668, k, v))
    }
    break
  }
};
cljs.core.obj_clone = function obj_clone(obj, ks) {
  var new_obj__8677 = {};
  var l__8678 = ks.length;
  var i__8679 = 0;
  while(true) {
    if(i__8679 < l__8678) {
      var k__8680 = ks[i__8679];
      new_obj__8677[k__8680] = obj[k__8680];
      var G__8681 = i__8679 + 1;
      i__8679 = G__8681;
      continue
    }else {
    }
    break
  }
  return new_obj__8677
};
cljs.core.ObjMap = function(meta, keys, strobj, update_count, __hash) {
  this.meta = meta;
  this.keys = keys;
  this.strobj = strobj;
  this.update_count = update_count;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 1;
  this.cljs$lang$protocol_mask$partition0$ = 15075087
};
cljs.core.ObjMap.cljs$lang$type = true;
cljs.core.ObjMap.cljs$lang$ctorPrSeq = function(this__2315__auto__) {
  return cljs.core.list.call(null, "cljs.core/ObjMap")
};
cljs.core.ObjMap.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = function(coll) {
  var this__8684 = this;
  return cljs.core.transient$.call(null, cljs.core.into.call(null, cljs.core.hash_map.call(null), coll))
};
cljs.core.ObjMap.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__8685 = this;
  var h__2198__auto____8686 = this__8685.__hash;
  if(!(h__2198__auto____8686 == null)) {
    return h__2198__auto____8686
  }else {
    var h__2198__auto____8687 = cljs.core.hash_imap.call(null, coll);
    this__8685.__hash = h__2198__auto____8687;
    return h__2198__auto____8687
  }
};
cljs.core.ObjMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(coll, k) {
  var this__8688 = this;
  return coll.cljs$core$ILookup$_lookup$arity$3(coll, k, null)
};
cljs.core.ObjMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(coll, k, not_found) {
  var this__8689 = this;
  if(function() {
    var and__3822__auto____8690 = goog.isString(k);
    if(and__3822__auto____8690) {
      return!(cljs.core.scan_array.call(null, 1, k, this__8689.keys) == null)
    }else {
      return and__3822__auto____8690
    }
  }()) {
    return this__8689.strobj[k]
  }else {
    return not_found
  }
};
cljs.core.ObjMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(coll, k, v) {
  var this__8691 = this;
  if(goog.isString(k)) {
    if(function() {
      var or__3824__auto____8692 = this__8691.update_count > cljs.core.ObjMap.HASHMAP_THRESHOLD;
      if(or__3824__auto____8692) {
        return or__3824__auto____8692
      }else {
        return this__8691.keys.length >= cljs.core.ObjMap.HASHMAP_THRESHOLD
      }
    }()) {
      return cljs.core.obj_map__GT_hash_map.call(null, coll, k, v)
    }else {
      if(!(cljs.core.scan_array.call(null, 1, k, this__8691.keys) == null)) {
        var new_strobj__8693 = cljs.core.obj_clone.call(null, this__8691.strobj, this__8691.keys);
        new_strobj__8693[k] = v;
        return new cljs.core.ObjMap(this__8691.meta, this__8691.keys, new_strobj__8693, this__8691.update_count + 1, null)
      }else {
        var new_strobj__8694 = cljs.core.obj_clone.call(null, this__8691.strobj, this__8691.keys);
        var new_keys__8695 = this__8691.keys.slice();
        new_strobj__8694[k] = v;
        new_keys__8695.push(k);
        return new cljs.core.ObjMap(this__8691.meta, new_keys__8695, new_strobj__8694, this__8691.update_count + 1, null)
      }
    }
  }else {
    return cljs.core.obj_map__GT_hash_map.call(null, coll, k, v)
  }
};
cljs.core.ObjMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = function(coll, k) {
  var this__8696 = this;
  if(function() {
    var and__3822__auto____8697 = goog.isString(k);
    if(and__3822__auto____8697) {
      return!(cljs.core.scan_array.call(null, 1, k, this__8696.keys) == null)
    }else {
      return and__3822__auto____8697
    }
  }()) {
    return true
  }else {
    return false
  }
};
cljs.core.ObjMap.prototype.call = function() {
  var G__8719 = null;
  var G__8719__2 = function(this_sym8698, k) {
    var this__8700 = this;
    var this_sym8698__8701 = this;
    var coll__8702 = this_sym8698__8701;
    return coll__8702.cljs$core$ILookup$_lookup$arity$2(coll__8702, k)
  };
  var G__8719__3 = function(this_sym8699, k, not_found) {
    var this__8700 = this;
    var this_sym8699__8703 = this;
    var coll__8704 = this_sym8699__8703;
    return coll__8704.cljs$core$ILookup$_lookup$arity$3(coll__8704, k, not_found)
  };
  G__8719 = function(this_sym8699, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__8719__2.call(this, this_sym8699, k);
      case 3:
        return G__8719__3.call(this, this_sym8699, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__8719
}();
cljs.core.ObjMap.prototype.apply = function(this_sym8682, args8683) {
  var this__8705 = this;
  return this_sym8682.call.apply(this_sym8682, [this_sym8682].concat(args8683.slice()))
};
cljs.core.ObjMap.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, entry) {
  var this__8706 = this;
  if(cljs.core.vector_QMARK_.call(null, entry)) {
    return coll.cljs$core$IAssociative$_assoc$arity$3(coll, cljs.core._nth.call(null, entry, 0), cljs.core._nth.call(null, entry, 1))
  }else {
    return cljs.core.reduce.call(null, cljs.core._conj, coll, entry)
  }
};
cljs.core.ObjMap.prototype.toString = function() {
  var this__8707 = this;
  var this__8708 = this;
  return cljs.core.pr_str.call(null, this__8708)
};
cljs.core.ObjMap.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__8709 = this;
  if(this__8709.keys.length > 0) {
    return cljs.core.map.call(null, function(p1__8672_SHARP_) {
      return cljs.core.vector.call(null, p1__8672_SHARP_, this__8709.strobj[p1__8672_SHARP_])
    }, this__8709.keys.sort(cljs.core.obj_map_compare_keys))
  }else {
    return null
  }
};
cljs.core.ObjMap.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__8710 = this;
  return this__8710.keys.length
};
cljs.core.ObjMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__8711 = this;
  return cljs.core.equiv_map.call(null, coll, other)
};
cljs.core.ObjMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__8712 = this;
  return new cljs.core.ObjMap(meta, this__8712.keys, this__8712.strobj, this__8712.update_count, this__8712.__hash)
};
cljs.core.ObjMap.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__8713 = this;
  return this__8713.meta
};
cljs.core.ObjMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__8714 = this;
  return cljs.core.with_meta.call(null, cljs.core.ObjMap.EMPTY, this__8714.meta)
};
cljs.core.ObjMap.prototype.cljs$core$IMap$_dissoc$arity$2 = function(coll, k) {
  var this__8715 = this;
  if(function() {
    var and__3822__auto____8716 = goog.isString(k);
    if(and__3822__auto____8716) {
      return!(cljs.core.scan_array.call(null, 1, k, this__8715.keys) == null)
    }else {
      return and__3822__auto____8716
    }
  }()) {
    var new_keys__8717 = this__8715.keys.slice();
    var new_strobj__8718 = cljs.core.obj_clone.call(null, this__8715.strobj, this__8715.keys);
    new_keys__8717.splice(cljs.core.scan_array.call(null, 1, k, new_keys__8717), 1);
    cljs.core.js_delete.call(null, new_strobj__8718, k);
    return new cljs.core.ObjMap(this__8715.meta, new_keys__8717, new_strobj__8718, this__8715.update_count + 1, null)
  }else {
    return coll
  }
};
cljs.core.ObjMap;
cljs.core.ObjMap.EMPTY = new cljs.core.ObjMap(null, [], {}, 0, 0);
cljs.core.ObjMap.HASHMAP_THRESHOLD = 32;
cljs.core.ObjMap.fromObject = function(ks, obj) {
  return new cljs.core.ObjMap(null, ks, obj, 0, null)
};
cljs.core.HashMap = function(meta, count, hashobj, __hash) {
  this.meta = meta;
  this.count = count;
  this.hashobj = hashobj;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 15075087
};
cljs.core.HashMap.cljs$lang$type = true;
cljs.core.HashMap.cljs$lang$ctorPrSeq = function(this__2315__auto__) {
  return cljs.core.list.call(null, "cljs.core/HashMap")
};
cljs.core.HashMap.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__8723 = this;
  var h__2198__auto____8724 = this__8723.__hash;
  if(!(h__2198__auto____8724 == null)) {
    return h__2198__auto____8724
  }else {
    var h__2198__auto____8725 = cljs.core.hash_imap.call(null, coll);
    this__8723.__hash = h__2198__auto____8725;
    return h__2198__auto____8725
  }
};
cljs.core.HashMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(coll, k) {
  var this__8726 = this;
  return coll.cljs$core$ILookup$_lookup$arity$3(coll, k, null)
};
cljs.core.HashMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(coll, k, not_found) {
  var this__8727 = this;
  var bucket__8728 = this__8727.hashobj[cljs.core.hash.call(null, k)];
  var i__8729 = cljs.core.truth_(bucket__8728) ? cljs.core.scan_array.call(null, 2, k, bucket__8728) : null;
  if(cljs.core.truth_(i__8729)) {
    return bucket__8728[i__8729 + 1]
  }else {
    return not_found
  }
};
cljs.core.HashMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(coll, k, v) {
  var this__8730 = this;
  var h__8731 = cljs.core.hash.call(null, k);
  var bucket__8732 = this__8730.hashobj[h__8731];
  if(cljs.core.truth_(bucket__8732)) {
    var new_bucket__8733 = bucket__8732.slice();
    var new_hashobj__8734 = goog.object.clone(this__8730.hashobj);
    new_hashobj__8734[h__8731] = new_bucket__8733;
    var temp__3971__auto____8735 = cljs.core.scan_array.call(null, 2, k, new_bucket__8733);
    if(cljs.core.truth_(temp__3971__auto____8735)) {
      var i__8736 = temp__3971__auto____8735;
      new_bucket__8733[i__8736 + 1] = v;
      return new cljs.core.HashMap(this__8730.meta, this__8730.count, new_hashobj__8734, null)
    }else {
      new_bucket__8733.push(k, v);
      return new cljs.core.HashMap(this__8730.meta, this__8730.count + 1, new_hashobj__8734, null)
    }
  }else {
    var new_hashobj__8737 = goog.object.clone(this__8730.hashobj);
    new_hashobj__8737[h__8731] = [k, v];
    return new cljs.core.HashMap(this__8730.meta, this__8730.count + 1, new_hashobj__8737, null)
  }
};
cljs.core.HashMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = function(coll, k) {
  var this__8738 = this;
  var bucket__8739 = this__8738.hashobj[cljs.core.hash.call(null, k)];
  var i__8740 = cljs.core.truth_(bucket__8739) ? cljs.core.scan_array.call(null, 2, k, bucket__8739) : null;
  if(cljs.core.truth_(i__8740)) {
    return true
  }else {
    return false
  }
};
cljs.core.HashMap.prototype.call = function() {
  var G__8765 = null;
  var G__8765__2 = function(this_sym8741, k) {
    var this__8743 = this;
    var this_sym8741__8744 = this;
    var coll__8745 = this_sym8741__8744;
    return coll__8745.cljs$core$ILookup$_lookup$arity$2(coll__8745, k)
  };
  var G__8765__3 = function(this_sym8742, k, not_found) {
    var this__8743 = this;
    var this_sym8742__8746 = this;
    var coll__8747 = this_sym8742__8746;
    return coll__8747.cljs$core$ILookup$_lookup$arity$3(coll__8747, k, not_found)
  };
  G__8765 = function(this_sym8742, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__8765__2.call(this, this_sym8742, k);
      case 3:
        return G__8765__3.call(this, this_sym8742, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__8765
}();
cljs.core.HashMap.prototype.apply = function(this_sym8721, args8722) {
  var this__8748 = this;
  return this_sym8721.call.apply(this_sym8721, [this_sym8721].concat(args8722.slice()))
};
cljs.core.HashMap.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, entry) {
  var this__8749 = this;
  if(cljs.core.vector_QMARK_.call(null, entry)) {
    return coll.cljs$core$IAssociative$_assoc$arity$3(coll, cljs.core._nth.call(null, entry, 0), cljs.core._nth.call(null, entry, 1))
  }else {
    return cljs.core.reduce.call(null, cljs.core._conj, coll, entry)
  }
};
cljs.core.HashMap.prototype.toString = function() {
  var this__8750 = this;
  var this__8751 = this;
  return cljs.core.pr_str.call(null, this__8751)
};
cljs.core.HashMap.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__8752 = this;
  if(this__8752.count > 0) {
    var hashes__8753 = cljs.core.js_keys.call(null, this__8752.hashobj).sort();
    return cljs.core.mapcat.call(null, function(p1__8720_SHARP_) {
      return cljs.core.map.call(null, cljs.core.vec, cljs.core.partition.call(null, 2, this__8752.hashobj[p1__8720_SHARP_]))
    }, hashes__8753)
  }else {
    return null
  }
};
cljs.core.HashMap.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__8754 = this;
  return this__8754.count
};
cljs.core.HashMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__8755 = this;
  return cljs.core.equiv_map.call(null, coll, other)
};
cljs.core.HashMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__8756 = this;
  return new cljs.core.HashMap(meta, this__8756.count, this__8756.hashobj, this__8756.__hash)
};
cljs.core.HashMap.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__8757 = this;
  return this__8757.meta
};
cljs.core.HashMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__8758 = this;
  return cljs.core.with_meta.call(null, cljs.core.HashMap.EMPTY, this__8758.meta)
};
cljs.core.HashMap.prototype.cljs$core$IMap$_dissoc$arity$2 = function(coll, k) {
  var this__8759 = this;
  var h__8760 = cljs.core.hash.call(null, k);
  var bucket__8761 = this__8759.hashobj[h__8760];
  var i__8762 = cljs.core.truth_(bucket__8761) ? cljs.core.scan_array.call(null, 2, k, bucket__8761) : null;
  if(cljs.core.not.call(null, i__8762)) {
    return coll
  }else {
    var new_hashobj__8763 = goog.object.clone(this__8759.hashobj);
    if(3 > bucket__8761.length) {
      cljs.core.js_delete.call(null, new_hashobj__8763, h__8760)
    }else {
      var new_bucket__8764 = bucket__8761.slice();
      new_bucket__8764.splice(i__8762, 2);
      new_hashobj__8763[h__8760] = new_bucket__8764
    }
    return new cljs.core.HashMap(this__8759.meta, this__8759.count - 1, new_hashobj__8763, null)
  }
};
cljs.core.HashMap;
cljs.core.HashMap.EMPTY = new cljs.core.HashMap(null, 0, {}, 0);
cljs.core.HashMap.fromArrays = function(ks, vs) {
  var len__8766 = ks.length;
  var i__8767 = 0;
  var out__8768 = cljs.core.HashMap.EMPTY;
  while(true) {
    if(i__8767 < len__8766) {
      var G__8769 = i__8767 + 1;
      var G__8770 = cljs.core.assoc.call(null, out__8768, ks[i__8767], vs[i__8767]);
      i__8767 = G__8769;
      out__8768 = G__8770;
      continue
    }else {
      return out__8768
    }
    break
  }
};
cljs.core.array_map_index_of = function array_map_index_of(m, k) {
  var arr__8774 = m.arr;
  var len__8775 = arr__8774.length;
  var i__8776 = 0;
  while(true) {
    if(len__8775 <= i__8776) {
      return-1
    }else {
      if(cljs.core._EQ_.call(null, arr__8774[i__8776], k)) {
        return i__8776
      }else {
        if("\ufdd0'else") {
          var G__8777 = i__8776 + 2;
          i__8776 = G__8777;
          continue
        }else {
          return null
        }
      }
    }
    break
  }
};
cljs.core.PersistentArrayMap = function(meta, cnt, arr, __hash) {
  this.meta = meta;
  this.cnt = cnt;
  this.arr = arr;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 1;
  this.cljs$lang$protocol_mask$partition0$ = 16123663
};
cljs.core.PersistentArrayMap.cljs$lang$type = true;
cljs.core.PersistentArrayMap.cljs$lang$ctorPrSeq = function(this__2315__auto__) {
  return cljs.core.list.call(null, "cljs.core/PersistentArrayMap")
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = function(coll) {
  var this__8780 = this;
  return new cljs.core.TransientArrayMap({}, this__8780.arr.length, this__8780.arr.slice())
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__8781 = this;
  var h__2198__auto____8782 = this__8781.__hash;
  if(!(h__2198__auto____8782 == null)) {
    return h__2198__auto____8782
  }else {
    var h__2198__auto____8783 = cljs.core.hash_imap.call(null, coll);
    this__8781.__hash = h__2198__auto____8783;
    return h__2198__auto____8783
  }
};
cljs.core.PersistentArrayMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(coll, k) {
  var this__8784 = this;
  return coll.cljs$core$ILookup$_lookup$arity$3(coll, k, null)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(coll, k, not_found) {
  var this__8785 = this;
  var idx__8786 = cljs.core.array_map_index_of.call(null, coll, k);
  if(idx__8786 === -1) {
    return not_found
  }else {
    return this__8785.arr[idx__8786 + 1]
  }
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(coll, k, v) {
  var this__8787 = this;
  var idx__8788 = cljs.core.array_map_index_of.call(null, coll, k);
  if(idx__8788 === -1) {
    if(this__8787.cnt < cljs.core.PersistentArrayMap.HASHMAP_THRESHOLD) {
      return new cljs.core.PersistentArrayMap(this__8787.meta, this__8787.cnt + 1, function() {
        var G__8789__8790 = this__8787.arr.slice();
        G__8789__8790.push(k);
        G__8789__8790.push(v);
        return G__8789__8790
      }(), null)
    }else {
      return cljs.core.persistent_BANG_.call(null, cljs.core.assoc_BANG_.call(null, cljs.core.transient$.call(null, cljs.core.into.call(null, cljs.core.PersistentHashMap.EMPTY, coll)), k, v))
    }
  }else {
    if(v === this__8787.arr[idx__8788 + 1]) {
      return coll
    }else {
      if("\ufdd0'else") {
        return new cljs.core.PersistentArrayMap(this__8787.meta, this__8787.cnt, function() {
          var G__8791__8792 = this__8787.arr.slice();
          G__8791__8792[idx__8788 + 1] = v;
          return G__8791__8792
        }(), null)
      }else {
        return null
      }
    }
  }
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = function(coll, k) {
  var this__8793 = this;
  return!(cljs.core.array_map_index_of.call(null, coll, k) === -1)
};
cljs.core.PersistentArrayMap.prototype.call = function() {
  var G__8825 = null;
  var G__8825__2 = function(this_sym8794, k) {
    var this__8796 = this;
    var this_sym8794__8797 = this;
    var coll__8798 = this_sym8794__8797;
    return coll__8798.cljs$core$ILookup$_lookup$arity$2(coll__8798, k)
  };
  var G__8825__3 = function(this_sym8795, k, not_found) {
    var this__8796 = this;
    var this_sym8795__8799 = this;
    var coll__8800 = this_sym8795__8799;
    return coll__8800.cljs$core$ILookup$_lookup$arity$3(coll__8800, k, not_found)
  };
  G__8825 = function(this_sym8795, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__8825__2.call(this, this_sym8795, k);
      case 3:
        return G__8825__3.call(this, this_sym8795, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__8825
}();
cljs.core.PersistentArrayMap.prototype.apply = function(this_sym8778, args8779) {
  var this__8801 = this;
  return this_sym8778.call.apply(this_sym8778, [this_sym8778].concat(args8779.slice()))
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = function(coll, f, init) {
  var this__8802 = this;
  var len__8803 = this__8802.arr.length;
  var i__8804 = 0;
  var init__8805 = init;
  while(true) {
    if(i__8804 < len__8803) {
      var init__8806 = f.call(null, init__8805, this__8802.arr[i__8804], this__8802.arr[i__8804 + 1]);
      if(cljs.core.reduced_QMARK_.call(null, init__8806)) {
        return cljs.core.deref.call(null, init__8806)
      }else {
        var G__8826 = i__8804 + 2;
        var G__8827 = init__8806;
        i__8804 = G__8826;
        init__8805 = G__8827;
        continue
      }
    }else {
      return null
    }
    break
  }
};
cljs.core.PersistentArrayMap.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, entry) {
  var this__8807 = this;
  if(cljs.core.vector_QMARK_.call(null, entry)) {
    return coll.cljs$core$IAssociative$_assoc$arity$3(coll, cljs.core._nth.call(null, entry, 0), cljs.core._nth.call(null, entry, 1))
  }else {
    return cljs.core.reduce.call(null, cljs.core._conj, coll, entry)
  }
};
cljs.core.PersistentArrayMap.prototype.toString = function() {
  var this__8808 = this;
  var this__8809 = this;
  return cljs.core.pr_str.call(null, this__8809)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__8810 = this;
  if(this__8810.cnt > 0) {
    var len__8811 = this__8810.arr.length;
    var array_map_seq__8812 = function array_map_seq(i) {
      return new cljs.core.LazySeq(null, false, function() {
        if(i < len__8811) {
          return cljs.core.cons.call(null, cljs.core.PersistentVector.fromArray([this__8810.arr[i], this__8810.arr[i + 1]], true), array_map_seq.call(null, i + 2))
        }else {
          return null
        }
      }, null)
    };
    return array_map_seq__8812.call(null, 0)
  }else {
    return null
  }
};
cljs.core.PersistentArrayMap.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__8813 = this;
  return this__8813.cnt
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__8814 = this;
  return cljs.core.equiv_map.call(null, coll, other)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__8815 = this;
  return new cljs.core.PersistentArrayMap(meta, this__8815.cnt, this__8815.arr, this__8815.__hash)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__8816 = this;
  return this__8816.meta
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__8817 = this;
  return cljs.core._with_meta.call(null, cljs.core.PersistentArrayMap.EMPTY, this__8817.meta)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IMap$_dissoc$arity$2 = function(coll, k) {
  var this__8818 = this;
  var idx__8819 = cljs.core.array_map_index_of.call(null, coll, k);
  if(idx__8819 >= 0) {
    var len__8820 = this__8818.arr.length;
    var new_len__8821 = len__8820 - 2;
    if(new_len__8821 === 0) {
      return coll.cljs$core$IEmptyableCollection$_empty$arity$1(coll)
    }else {
      var new_arr__8822 = cljs.core.make_array.call(null, new_len__8821);
      var s__8823 = 0;
      var d__8824 = 0;
      while(true) {
        if(s__8823 >= len__8820) {
          return new cljs.core.PersistentArrayMap(this__8818.meta, this__8818.cnt - 1, new_arr__8822, null)
        }else {
          if(cljs.core._EQ_.call(null, k, this__8818.arr[s__8823])) {
            var G__8828 = s__8823 + 2;
            var G__8829 = d__8824;
            s__8823 = G__8828;
            d__8824 = G__8829;
            continue
          }else {
            if("\ufdd0'else") {
              new_arr__8822[d__8824] = this__8818.arr[s__8823];
              new_arr__8822[d__8824 + 1] = this__8818.arr[s__8823 + 1];
              var G__8830 = s__8823 + 2;
              var G__8831 = d__8824 + 2;
              s__8823 = G__8830;
              d__8824 = G__8831;
              continue
            }else {
              return null
            }
          }
        }
        break
      }
    }
  }else {
    return coll
  }
};
cljs.core.PersistentArrayMap;
cljs.core.PersistentArrayMap.EMPTY = new cljs.core.PersistentArrayMap(null, 0, [], null);
cljs.core.PersistentArrayMap.HASHMAP_THRESHOLD = 16;
cljs.core.PersistentArrayMap.fromArrays = function(ks, vs) {
  var len__8832 = cljs.core.count.call(null, ks);
  var i__8833 = 0;
  var out__8834 = cljs.core.transient$.call(null, cljs.core.PersistentArrayMap.EMPTY);
  while(true) {
    if(i__8833 < len__8832) {
      var G__8835 = i__8833 + 1;
      var G__8836 = cljs.core.assoc_BANG_.call(null, out__8834, ks[i__8833], vs[i__8833]);
      i__8833 = G__8835;
      out__8834 = G__8836;
      continue
    }else {
      return cljs.core.persistent_BANG_.call(null, out__8834)
    }
    break
  }
};
cljs.core.TransientArrayMap = function(editable_QMARK_, len, arr) {
  this.editable_QMARK_ = editable_QMARK_;
  this.len = len;
  this.arr = arr;
  this.cljs$lang$protocol_mask$partition1$ = 14;
  this.cljs$lang$protocol_mask$partition0$ = 258
};
cljs.core.TransientArrayMap.cljs$lang$type = true;
cljs.core.TransientArrayMap.cljs$lang$ctorPrSeq = function(this__2315__auto__) {
  return cljs.core.list.call(null, "cljs.core/TransientArrayMap")
};
cljs.core.TransientArrayMap.prototype.cljs$core$ITransientMap$_dissoc_BANG_$arity$2 = function(tcoll, key) {
  var this__8837 = this;
  if(cljs.core.truth_(this__8837.editable_QMARK_)) {
    var idx__8838 = cljs.core.array_map_index_of.call(null, tcoll, key);
    if(idx__8838 >= 0) {
      this__8837.arr[idx__8838] = this__8837.arr[this__8837.len - 2];
      this__8837.arr[idx__8838 + 1] = this__8837.arr[this__8837.len - 1];
      var G__8839__8840 = this__8837.arr;
      G__8839__8840.pop();
      G__8839__8840.pop();
      G__8839__8840;
      this__8837.len = this__8837.len - 2
    }else {
    }
    return tcoll
  }else {
    throw new Error("dissoc! after persistent!");
  }
};
cljs.core.TransientArrayMap.prototype.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3 = function(tcoll, key, val) {
  var this__8841 = this;
  if(cljs.core.truth_(this__8841.editable_QMARK_)) {
    var idx__8842 = cljs.core.array_map_index_of.call(null, tcoll, key);
    if(idx__8842 === -1) {
      if(this__8841.len + 2 <= 2 * cljs.core.PersistentArrayMap.HASHMAP_THRESHOLD) {
        this__8841.len = this__8841.len + 2;
        this__8841.arr.push(key);
        this__8841.arr.push(val);
        return tcoll
      }else {
        return cljs.core.assoc_BANG_.call(null, cljs.core.array__GT_transient_hash_map.call(null, this__8841.len, this__8841.arr), key, val)
      }
    }else {
      if(val === this__8841.arr[idx__8842 + 1]) {
        return tcoll
      }else {
        this__8841.arr[idx__8842 + 1] = val;
        return tcoll
      }
    }
  }else {
    throw new Error("assoc! after persistent!");
  }
};
cljs.core.TransientArrayMap.prototype.cljs$core$ITransientCollection$_conj_BANG_$arity$2 = function(tcoll, o) {
  var this__8843 = this;
  if(cljs.core.truth_(this__8843.editable_QMARK_)) {
    if(function() {
      var G__8844__8845 = o;
      if(G__8844__8845) {
        if(function() {
          var or__3824__auto____8846 = G__8844__8845.cljs$lang$protocol_mask$partition0$ & 2048;
          if(or__3824__auto____8846) {
            return or__3824__auto____8846
          }else {
            return G__8844__8845.cljs$core$IMapEntry$
          }
        }()) {
          return true
        }else {
          if(!G__8844__8845.cljs$lang$protocol_mask$partition0$) {
            return cljs.core.type_satisfies_.call(null, cljs.core.IMapEntry, G__8844__8845)
          }else {
            return false
          }
        }
      }else {
        return cljs.core.type_satisfies_.call(null, cljs.core.IMapEntry, G__8844__8845)
      }
    }()) {
      return tcoll.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3(tcoll, cljs.core.key.call(null, o), cljs.core.val.call(null, o))
    }else {
      var es__8847 = cljs.core.seq.call(null, o);
      var tcoll__8848 = tcoll;
      while(true) {
        var temp__3971__auto____8849 = cljs.core.first.call(null, es__8847);
        if(cljs.core.truth_(temp__3971__auto____8849)) {
          var e__8850 = temp__3971__auto____8849;
          var G__8856 = cljs.core.next.call(null, es__8847);
          var G__8857 = tcoll__8848.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3(tcoll__8848, cljs.core.key.call(null, e__8850), cljs.core.val.call(null, e__8850));
          es__8847 = G__8856;
          tcoll__8848 = G__8857;
          continue
        }else {
          return tcoll__8848
        }
        break
      }
    }
  }else {
    throw new Error("conj! after persistent!");
  }
};
cljs.core.TransientArrayMap.prototype.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 = function(tcoll) {
  var this__8851 = this;
  if(cljs.core.truth_(this__8851.editable_QMARK_)) {
    this__8851.editable_QMARK_ = false;
    return new cljs.core.PersistentArrayMap(null, cljs.core.quot.call(null, this__8851.len, 2), this__8851.arr, null)
  }else {
    throw new Error("persistent! called twice");
  }
};
cljs.core.TransientArrayMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(tcoll, k) {
  var this__8852 = this;
  return tcoll.cljs$core$ILookup$_lookup$arity$3(tcoll, k, null)
};
cljs.core.TransientArrayMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(tcoll, k, not_found) {
  var this__8853 = this;
  if(cljs.core.truth_(this__8853.editable_QMARK_)) {
    var idx__8854 = cljs.core.array_map_index_of.call(null, tcoll, k);
    if(idx__8854 === -1) {
      return not_found
    }else {
      return this__8853.arr[idx__8854 + 1]
    }
  }else {
    throw new Error("lookup after persistent!");
  }
};
cljs.core.TransientArrayMap.prototype.cljs$core$ICounted$_count$arity$1 = function(tcoll) {
  var this__8855 = this;
  if(cljs.core.truth_(this__8855.editable_QMARK_)) {
    return cljs.core.quot.call(null, this__8855.len, 2)
  }else {
    throw new Error("count after persistent!");
  }
};
cljs.core.TransientArrayMap;
cljs.core.array__GT_transient_hash_map = function array__GT_transient_hash_map(len, arr) {
  var out__8860 = cljs.core.transient$.call(null, cljs.core.ObjMap.EMPTY);
  var i__8861 = 0;
  while(true) {
    if(i__8861 < len) {
      var G__8862 = cljs.core.assoc_BANG_.call(null, out__8860, arr[i__8861], arr[i__8861 + 1]);
      var G__8863 = i__8861 + 2;
      out__8860 = G__8862;
      i__8861 = G__8863;
      continue
    }else {
      return out__8860
    }
    break
  }
};
cljs.core.Box = function(val) {
  this.val = val
};
cljs.core.Box.cljs$lang$type = true;
cljs.core.Box.cljs$lang$ctorPrSeq = function(this__2316__auto__) {
  return cljs.core.list.call(null, "cljs.core/Box")
};
cljs.core.Box;
cljs.core.key_test = function key_test(key, other) {
  if(goog.isString(key)) {
    return key === other
  }else {
    return cljs.core._EQ_.call(null, key, other)
  }
};
cljs.core.mask = function mask(hash, shift) {
  return hash >>> shift & 31
};
cljs.core.clone_and_set = function() {
  var clone_and_set = null;
  var clone_and_set__3 = function(arr, i, a) {
    var G__8868__8869 = arr.slice();
    G__8868__8869[i] = a;
    return G__8868__8869
  };
  var clone_and_set__5 = function(arr, i, a, j, b) {
    var G__8870__8871 = arr.slice();
    G__8870__8871[i] = a;
    G__8870__8871[j] = b;
    return G__8870__8871
  };
  clone_and_set = function(arr, i, a, j, b) {
    switch(arguments.length) {
      case 3:
        return clone_and_set__3.call(this, arr, i, a);
      case 5:
        return clone_and_set__5.call(this, arr, i, a, j, b)
    }
    throw"Invalid arity: " + arguments.length;
  };
  clone_and_set.cljs$lang$arity$3 = clone_and_set__3;
  clone_and_set.cljs$lang$arity$5 = clone_and_set__5;
  return clone_and_set
}();
cljs.core.remove_pair = function remove_pair(arr, i) {
  var new_arr__8873 = cljs.core.make_array.call(null, arr.length - 2);
  cljs.core.array_copy.call(null, arr, 0, new_arr__8873, 0, 2 * i);
  cljs.core.array_copy.call(null, arr, 2 * (i + 1), new_arr__8873, 2 * i, new_arr__8873.length - 2 * i);
  return new_arr__8873
};
cljs.core.bitmap_indexed_node_index = function bitmap_indexed_node_index(bitmap, bit) {
  return cljs.core.bit_count.call(null, bitmap & bit - 1)
};
cljs.core.bitpos = function bitpos(hash, shift) {
  return 1 << (hash >>> shift & 31)
};
cljs.core.edit_and_set = function() {
  var edit_and_set = null;
  var edit_and_set__4 = function(inode, edit, i, a) {
    var editable__8876 = inode.ensure_editable(edit);
    editable__8876.arr[i] = a;
    return editable__8876
  };
  var edit_and_set__6 = function(inode, edit, i, a, j, b) {
    var editable__8877 = inode.ensure_editable(edit);
    editable__8877.arr[i] = a;
    editable__8877.arr[j] = b;
    return editable__8877
  };
  edit_and_set = function(inode, edit, i, a, j, b) {
    switch(arguments.length) {
      case 4:
        return edit_and_set__4.call(this, inode, edit, i, a);
      case 6:
        return edit_and_set__6.call(this, inode, edit, i, a, j, b)
    }
    throw"Invalid arity: " + arguments.length;
  };
  edit_and_set.cljs$lang$arity$4 = edit_and_set__4;
  edit_and_set.cljs$lang$arity$6 = edit_and_set__6;
  return edit_and_set
}();
cljs.core.inode_kv_reduce = function inode_kv_reduce(arr, f, init) {
  var len__8884 = arr.length;
  var i__8885 = 0;
  var init__8886 = init;
  while(true) {
    if(i__8885 < len__8884) {
      var init__8889 = function() {
        var k__8887 = arr[i__8885];
        if(!(k__8887 == null)) {
          return f.call(null, init__8886, k__8887, arr[i__8885 + 1])
        }else {
          var node__8888 = arr[i__8885 + 1];
          if(!(node__8888 == null)) {
            return node__8888.kv_reduce(f, init__8886)
          }else {
            return init__8886
          }
        }
      }();
      if(cljs.core.reduced_QMARK_.call(null, init__8889)) {
        return cljs.core.deref.call(null, init__8889)
      }else {
        var G__8890 = i__8885 + 2;
        var G__8891 = init__8889;
        i__8885 = G__8890;
        init__8886 = G__8891;
        continue
      }
    }else {
      return init__8886
    }
    break
  }
};
cljs.core.BitmapIndexedNode = function(edit, bitmap, arr) {
  this.edit = edit;
  this.bitmap = bitmap;
  this.arr = arr
};
cljs.core.BitmapIndexedNode.cljs$lang$type = true;
cljs.core.BitmapIndexedNode.cljs$lang$ctorPrSeq = function(this__2315__auto__) {
  return cljs.core.list.call(null, "cljs.core/BitmapIndexedNode")
};
cljs.core.BitmapIndexedNode.prototype.edit_and_remove_pair = function(e, bit, i) {
  var this__8892 = this;
  var inode__8893 = this;
  if(this__8892.bitmap === bit) {
    return null
  }else {
    var editable__8894 = inode__8893.ensure_editable(e);
    var earr__8895 = editable__8894.arr;
    var len__8896 = earr__8895.length;
    editable__8894.bitmap = bit ^ editable__8894.bitmap;
    cljs.core.array_copy.call(null, earr__8895, 2 * (i + 1), earr__8895, 2 * i, len__8896 - 2 * (i + 1));
    earr__8895[len__8896 - 2] = null;
    earr__8895[len__8896 - 1] = null;
    return editable__8894
  }
};
cljs.core.BitmapIndexedNode.prototype.inode_assoc_BANG_ = function(edit, shift, hash, key, val, added_leaf_QMARK_) {
  var this__8897 = this;
  var inode__8898 = this;
  var bit__8899 = 1 << (hash >>> shift & 31);
  var idx__8900 = cljs.core.bitmap_indexed_node_index.call(null, this__8897.bitmap, bit__8899);
  if((this__8897.bitmap & bit__8899) === 0) {
    var n__8901 = cljs.core.bit_count.call(null, this__8897.bitmap);
    if(2 * n__8901 < this__8897.arr.length) {
      var editable__8902 = inode__8898.ensure_editable(edit);
      var earr__8903 = editable__8902.arr;
      added_leaf_QMARK_.val = true;
      cljs.core.array_copy_downward.call(null, earr__8903, 2 * idx__8900, earr__8903, 2 * (idx__8900 + 1), 2 * (n__8901 - idx__8900));
      earr__8903[2 * idx__8900] = key;
      earr__8903[2 * idx__8900 + 1] = val;
      editable__8902.bitmap = editable__8902.bitmap | bit__8899;
      return editable__8902
    }else {
      if(n__8901 >= 16) {
        var nodes__8904 = cljs.core.make_array.call(null, 32);
        var jdx__8905 = hash >>> shift & 31;
        nodes__8904[jdx__8905] = cljs.core.BitmapIndexedNode.EMPTY.inode_assoc_BANG_(edit, shift + 5, hash, key, val, added_leaf_QMARK_);
        var i__8906 = 0;
        var j__8907 = 0;
        while(true) {
          if(i__8906 < 32) {
            if((this__8897.bitmap >>> i__8906 & 1) === 0) {
              var G__8960 = i__8906 + 1;
              var G__8961 = j__8907;
              i__8906 = G__8960;
              j__8907 = G__8961;
              continue
            }else {
              nodes__8904[i__8906] = !(this__8897.arr[j__8907] == null) ? cljs.core.BitmapIndexedNode.EMPTY.inode_assoc_BANG_(edit, shift + 5, cljs.core.hash.call(null, this__8897.arr[j__8907]), this__8897.arr[j__8907], this__8897.arr[j__8907 + 1], added_leaf_QMARK_) : this__8897.arr[j__8907 + 1];
              var G__8962 = i__8906 + 1;
              var G__8963 = j__8907 + 2;
              i__8906 = G__8962;
              j__8907 = G__8963;
              continue
            }
          }else {
          }
          break
        }
        return new cljs.core.ArrayNode(edit, n__8901 + 1, nodes__8904)
      }else {
        if("\ufdd0'else") {
          var new_arr__8908 = cljs.core.make_array.call(null, 2 * (n__8901 + 4));
          cljs.core.array_copy.call(null, this__8897.arr, 0, new_arr__8908, 0, 2 * idx__8900);
          new_arr__8908[2 * idx__8900] = key;
          new_arr__8908[2 * idx__8900 + 1] = val;
          cljs.core.array_copy.call(null, this__8897.arr, 2 * idx__8900, new_arr__8908, 2 * (idx__8900 + 1), 2 * (n__8901 - idx__8900));
          added_leaf_QMARK_.val = true;
          var editable__8909 = inode__8898.ensure_editable(edit);
          editable__8909.arr = new_arr__8908;
          editable__8909.bitmap = editable__8909.bitmap | bit__8899;
          return editable__8909
        }else {
          return null
        }
      }
    }
  }else {
    var key_or_nil__8910 = this__8897.arr[2 * idx__8900];
    var val_or_node__8911 = this__8897.arr[2 * idx__8900 + 1];
    if(key_or_nil__8910 == null) {
      var n__8912 = val_or_node__8911.inode_assoc_BANG_(edit, shift + 5, hash, key, val, added_leaf_QMARK_);
      if(n__8912 === val_or_node__8911) {
        return inode__8898
      }else {
        return cljs.core.edit_and_set.call(null, inode__8898, edit, 2 * idx__8900 + 1, n__8912)
      }
    }else {
      if(cljs.core.key_test.call(null, key, key_or_nil__8910)) {
        if(val === val_or_node__8911) {
          return inode__8898
        }else {
          return cljs.core.edit_and_set.call(null, inode__8898, edit, 2 * idx__8900 + 1, val)
        }
      }else {
        if("\ufdd0'else") {
          added_leaf_QMARK_.val = true;
          return cljs.core.edit_and_set.call(null, inode__8898, edit, 2 * idx__8900, null, 2 * idx__8900 + 1, cljs.core.create_node.call(null, edit, shift + 5, key_or_nil__8910, val_or_node__8911, hash, key, val))
        }else {
          return null
        }
      }
    }
  }
};
cljs.core.BitmapIndexedNode.prototype.inode_seq = function() {
  var this__8913 = this;
  var inode__8914 = this;
  return cljs.core.create_inode_seq.call(null, this__8913.arr)
};
cljs.core.BitmapIndexedNode.prototype.inode_without_BANG_ = function(edit, shift, hash, key, removed_leaf_QMARK_) {
  var this__8915 = this;
  var inode__8916 = this;
  var bit__8917 = 1 << (hash >>> shift & 31);
  if((this__8915.bitmap & bit__8917) === 0) {
    return inode__8916
  }else {
    var idx__8918 = cljs.core.bitmap_indexed_node_index.call(null, this__8915.bitmap, bit__8917);
    var key_or_nil__8919 = this__8915.arr[2 * idx__8918];
    var val_or_node__8920 = this__8915.arr[2 * idx__8918 + 1];
    if(key_or_nil__8919 == null) {
      var n__8921 = val_or_node__8920.inode_without_BANG_(edit, shift + 5, hash, key, removed_leaf_QMARK_);
      if(n__8921 === val_or_node__8920) {
        return inode__8916
      }else {
        if(!(n__8921 == null)) {
          return cljs.core.edit_and_set.call(null, inode__8916, edit, 2 * idx__8918 + 1, n__8921)
        }else {
          if(this__8915.bitmap === bit__8917) {
            return null
          }else {
            if("\ufdd0'else") {
              return inode__8916.edit_and_remove_pair(edit, bit__8917, idx__8918)
            }else {
              return null
            }
          }
        }
      }
    }else {
      if(cljs.core.key_test.call(null, key, key_or_nil__8919)) {
        removed_leaf_QMARK_[0] = true;
        return inode__8916.edit_and_remove_pair(edit, bit__8917, idx__8918)
      }else {
        if("\ufdd0'else") {
          return inode__8916
        }else {
          return null
        }
      }
    }
  }
};
cljs.core.BitmapIndexedNode.prototype.ensure_editable = function(e) {
  var this__8922 = this;
  var inode__8923 = this;
  if(e === this__8922.edit) {
    return inode__8923
  }else {
    var n__8924 = cljs.core.bit_count.call(null, this__8922.bitmap);
    var new_arr__8925 = cljs.core.make_array.call(null, n__8924 < 0 ? 4 : 2 * (n__8924 + 1));
    cljs.core.array_copy.call(null, this__8922.arr, 0, new_arr__8925, 0, 2 * n__8924);
    return new cljs.core.BitmapIndexedNode(e, this__8922.bitmap, new_arr__8925)
  }
};
cljs.core.BitmapIndexedNode.prototype.kv_reduce = function(f, init) {
  var this__8926 = this;
  var inode__8927 = this;
  return cljs.core.inode_kv_reduce.call(null, this__8926.arr, f, init)
};
cljs.core.BitmapIndexedNode.prototype.inode_find = function(shift, hash, key, not_found) {
  var this__8928 = this;
  var inode__8929 = this;
  var bit__8930 = 1 << (hash >>> shift & 31);
  if((this__8928.bitmap & bit__8930) === 0) {
    return not_found
  }else {
    var idx__8931 = cljs.core.bitmap_indexed_node_index.call(null, this__8928.bitmap, bit__8930);
    var key_or_nil__8932 = this__8928.arr[2 * idx__8931];
    var val_or_node__8933 = this__8928.arr[2 * idx__8931 + 1];
    if(key_or_nil__8932 == null) {
      return val_or_node__8933.inode_find(shift + 5, hash, key, not_found)
    }else {
      if(cljs.core.key_test.call(null, key, key_or_nil__8932)) {
        return cljs.core.PersistentVector.fromArray([key_or_nil__8932, val_or_node__8933], true)
      }else {
        if("\ufdd0'else") {
          return not_found
        }else {
          return null
        }
      }
    }
  }
};
cljs.core.BitmapIndexedNode.prototype.inode_without = function(shift, hash, key) {
  var this__8934 = this;
  var inode__8935 = this;
  var bit__8936 = 1 << (hash >>> shift & 31);
  if((this__8934.bitmap & bit__8936) === 0) {
    return inode__8935
  }else {
    var idx__8937 = cljs.core.bitmap_indexed_node_index.call(null, this__8934.bitmap, bit__8936);
    var key_or_nil__8938 = this__8934.arr[2 * idx__8937];
    var val_or_node__8939 = this__8934.arr[2 * idx__8937 + 1];
    if(key_or_nil__8938 == null) {
      var n__8940 = val_or_node__8939.inode_without(shift + 5, hash, key);
      if(n__8940 === val_or_node__8939) {
        return inode__8935
      }else {
        if(!(n__8940 == null)) {
          return new cljs.core.BitmapIndexedNode(null, this__8934.bitmap, cljs.core.clone_and_set.call(null, this__8934.arr, 2 * idx__8937 + 1, n__8940))
        }else {
          if(this__8934.bitmap === bit__8936) {
            return null
          }else {
            if("\ufdd0'else") {
              return new cljs.core.BitmapIndexedNode(null, this__8934.bitmap ^ bit__8936, cljs.core.remove_pair.call(null, this__8934.arr, idx__8937))
            }else {
              return null
            }
          }
        }
      }
    }else {
      if(cljs.core.key_test.call(null, key, key_or_nil__8938)) {
        return new cljs.core.BitmapIndexedNode(null, this__8934.bitmap ^ bit__8936, cljs.core.remove_pair.call(null, this__8934.arr, idx__8937))
      }else {
        if("\ufdd0'else") {
          return inode__8935
        }else {
          return null
        }
      }
    }
  }
};
cljs.core.BitmapIndexedNode.prototype.inode_assoc = function(shift, hash, key, val, added_leaf_QMARK_) {
  var this__8941 = this;
  var inode__8942 = this;
  var bit__8943 = 1 << (hash >>> shift & 31);
  var idx__8944 = cljs.core.bitmap_indexed_node_index.call(null, this__8941.bitmap, bit__8943);
  if((this__8941.bitmap & bit__8943) === 0) {
    var n__8945 = cljs.core.bit_count.call(null, this__8941.bitmap);
    if(n__8945 >= 16) {
      var nodes__8946 = cljs.core.make_array.call(null, 32);
      var jdx__8947 = hash >>> shift & 31;
      nodes__8946[jdx__8947] = cljs.core.BitmapIndexedNode.EMPTY.inode_assoc(shift + 5, hash, key, val, added_leaf_QMARK_);
      var i__8948 = 0;
      var j__8949 = 0;
      while(true) {
        if(i__8948 < 32) {
          if((this__8941.bitmap >>> i__8948 & 1) === 0) {
            var G__8964 = i__8948 + 1;
            var G__8965 = j__8949;
            i__8948 = G__8964;
            j__8949 = G__8965;
            continue
          }else {
            nodes__8946[i__8948] = !(this__8941.arr[j__8949] == null) ? cljs.core.BitmapIndexedNode.EMPTY.inode_assoc(shift + 5, cljs.core.hash.call(null, this__8941.arr[j__8949]), this__8941.arr[j__8949], this__8941.arr[j__8949 + 1], added_leaf_QMARK_) : this__8941.arr[j__8949 + 1];
            var G__8966 = i__8948 + 1;
            var G__8967 = j__8949 + 2;
            i__8948 = G__8966;
            j__8949 = G__8967;
            continue
          }
        }else {
        }
        break
      }
      return new cljs.core.ArrayNode(null, n__8945 + 1, nodes__8946)
    }else {
      var new_arr__8950 = cljs.core.make_array.call(null, 2 * (n__8945 + 1));
      cljs.core.array_copy.call(null, this__8941.arr, 0, new_arr__8950, 0, 2 * idx__8944);
      new_arr__8950[2 * idx__8944] = key;
      new_arr__8950[2 * idx__8944 + 1] = val;
      cljs.core.array_copy.call(null, this__8941.arr, 2 * idx__8944, new_arr__8950, 2 * (idx__8944 + 1), 2 * (n__8945 - idx__8944));
      added_leaf_QMARK_.val = true;
      return new cljs.core.BitmapIndexedNode(null, this__8941.bitmap | bit__8943, new_arr__8950)
    }
  }else {
    var key_or_nil__8951 = this__8941.arr[2 * idx__8944];
    var val_or_node__8952 = this__8941.arr[2 * idx__8944 + 1];
    if(key_or_nil__8951 == null) {
      var n__8953 = val_or_node__8952.inode_assoc(shift + 5, hash, key, val, added_leaf_QMARK_);
      if(n__8953 === val_or_node__8952) {
        return inode__8942
      }else {
        return new cljs.core.BitmapIndexedNode(null, this__8941.bitmap, cljs.core.clone_and_set.call(null, this__8941.arr, 2 * idx__8944 + 1, n__8953))
      }
    }else {
      if(cljs.core.key_test.call(null, key, key_or_nil__8951)) {
        if(val === val_or_node__8952) {
          return inode__8942
        }else {
          return new cljs.core.BitmapIndexedNode(null, this__8941.bitmap, cljs.core.clone_and_set.call(null, this__8941.arr, 2 * idx__8944 + 1, val))
        }
      }else {
        if("\ufdd0'else") {
          added_leaf_QMARK_.val = true;
          return new cljs.core.BitmapIndexedNode(null, this__8941.bitmap, cljs.core.clone_and_set.call(null, this__8941.arr, 2 * idx__8944, null, 2 * idx__8944 + 1, cljs.core.create_node.call(null, shift + 5, key_or_nil__8951, val_or_node__8952, hash, key, val)))
        }else {
          return null
        }
      }
    }
  }
};
cljs.core.BitmapIndexedNode.prototype.inode_lookup = function(shift, hash, key, not_found) {
  var this__8954 = this;
  var inode__8955 = this;
  var bit__8956 = 1 << (hash >>> shift & 31);
  if((this__8954.bitmap & bit__8956) === 0) {
    return not_found
  }else {
    var idx__8957 = cljs.core.bitmap_indexed_node_index.call(null, this__8954.bitmap, bit__8956);
    var key_or_nil__8958 = this__8954.arr[2 * idx__8957];
    var val_or_node__8959 = this__8954.arr[2 * idx__8957 + 1];
    if(key_or_nil__8958 == null) {
      return val_or_node__8959.inode_lookup(shift + 5, hash, key, not_found)
    }else {
      if(cljs.core.key_test.call(null, key, key_or_nil__8958)) {
        return val_or_node__8959
      }else {
        if("\ufdd0'else") {
          return not_found
        }else {
          return null
        }
      }
    }
  }
};
cljs.core.BitmapIndexedNode;
cljs.core.BitmapIndexedNode.EMPTY = new cljs.core.BitmapIndexedNode(null, 0, cljs.core.make_array.call(null, 0));
cljs.core.pack_array_node = function pack_array_node(array_node, edit, idx) {
  var arr__8975 = array_node.arr;
  var len__8976 = 2 * (array_node.cnt - 1);
  var new_arr__8977 = cljs.core.make_array.call(null, len__8976);
  var i__8978 = 0;
  var j__8979 = 1;
  var bitmap__8980 = 0;
  while(true) {
    if(i__8978 < len__8976) {
      if(function() {
        var and__3822__auto____8981 = !(i__8978 === idx);
        if(and__3822__auto____8981) {
          return!(arr__8975[i__8978] == null)
        }else {
          return and__3822__auto____8981
        }
      }()) {
        new_arr__8977[j__8979] = arr__8975[i__8978];
        var G__8982 = i__8978 + 1;
        var G__8983 = j__8979 + 2;
        var G__8984 = bitmap__8980 | 1 << i__8978;
        i__8978 = G__8982;
        j__8979 = G__8983;
        bitmap__8980 = G__8984;
        continue
      }else {
        var G__8985 = i__8978 + 1;
        var G__8986 = j__8979;
        var G__8987 = bitmap__8980;
        i__8978 = G__8985;
        j__8979 = G__8986;
        bitmap__8980 = G__8987;
        continue
      }
    }else {
      return new cljs.core.BitmapIndexedNode(edit, bitmap__8980, new_arr__8977)
    }
    break
  }
};
cljs.core.ArrayNode = function(edit, cnt, arr) {
  this.edit = edit;
  this.cnt = cnt;
  this.arr = arr
};
cljs.core.ArrayNode.cljs$lang$type = true;
cljs.core.ArrayNode.cljs$lang$ctorPrSeq = function(this__2315__auto__) {
  return cljs.core.list.call(null, "cljs.core/ArrayNode")
};
cljs.core.ArrayNode.prototype.inode_assoc_BANG_ = function(edit, shift, hash, key, val, added_leaf_QMARK_) {
  var this__8988 = this;
  var inode__8989 = this;
  var idx__8990 = hash >>> shift & 31;
  var node__8991 = this__8988.arr[idx__8990];
  if(node__8991 == null) {
    var editable__8992 = cljs.core.edit_and_set.call(null, inode__8989, edit, idx__8990, cljs.core.BitmapIndexedNode.EMPTY.inode_assoc_BANG_(edit, shift + 5, hash, key, val, added_leaf_QMARK_));
    editable__8992.cnt = editable__8992.cnt + 1;
    return editable__8992
  }else {
    var n__8993 = node__8991.inode_assoc_BANG_(edit, shift + 5, hash, key, val, added_leaf_QMARK_);
    if(n__8993 === node__8991) {
      return inode__8989
    }else {
      return cljs.core.edit_and_set.call(null, inode__8989, edit, idx__8990, n__8993)
    }
  }
};
cljs.core.ArrayNode.prototype.inode_seq = function() {
  var this__8994 = this;
  var inode__8995 = this;
  return cljs.core.create_array_node_seq.call(null, this__8994.arr)
};
cljs.core.ArrayNode.prototype.inode_without_BANG_ = function(edit, shift, hash, key, removed_leaf_QMARK_) {
  var this__8996 = this;
  var inode__8997 = this;
  var idx__8998 = hash >>> shift & 31;
  var node__8999 = this__8996.arr[idx__8998];
  if(node__8999 == null) {
    return inode__8997
  }else {
    var n__9000 = node__8999.inode_without_BANG_(edit, shift + 5, hash, key, removed_leaf_QMARK_);
    if(n__9000 === node__8999) {
      return inode__8997
    }else {
      if(n__9000 == null) {
        if(this__8996.cnt <= 8) {
          return cljs.core.pack_array_node.call(null, inode__8997, edit, idx__8998)
        }else {
          var editable__9001 = cljs.core.edit_and_set.call(null, inode__8997, edit, idx__8998, n__9000);
          editable__9001.cnt = editable__9001.cnt - 1;
          return editable__9001
        }
      }else {
        if("\ufdd0'else") {
          return cljs.core.edit_and_set.call(null, inode__8997, edit, idx__8998, n__9000)
        }else {
          return null
        }
      }
    }
  }
};
cljs.core.ArrayNode.prototype.ensure_editable = function(e) {
  var this__9002 = this;
  var inode__9003 = this;
  if(e === this__9002.edit) {
    return inode__9003
  }else {
    return new cljs.core.ArrayNode(e, this__9002.cnt, this__9002.arr.slice())
  }
};
cljs.core.ArrayNode.prototype.kv_reduce = function(f, init) {
  var this__9004 = this;
  var inode__9005 = this;
  var len__9006 = this__9004.arr.length;
  var i__9007 = 0;
  var init__9008 = init;
  while(true) {
    if(i__9007 < len__9006) {
      var node__9009 = this__9004.arr[i__9007];
      if(!(node__9009 == null)) {
        var init__9010 = node__9009.kv_reduce(f, init__9008);
        if(cljs.core.reduced_QMARK_.call(null, init__9010)) {
          return cljs.core.deref.call(null, init__9010)
        }else {
          var G__9029 = i__9007 + 1;
          var G__9030 = init__9010;
          i__9007 = G__9029;
          init__9008 = G__9030;
          continue
        }
      }else {
        return null
      }
    }else {
      return init__9008
    }
    break
  }
};
cljs.core.ArrayNode.prototype.inode_find = function(shift, hash, key, not_found) {
  var this__9011 = this;
  var inode__9012 = this;
  var idx__9013 = hash >>> shift & 31;
  var node__9014 = this__9011.arr[idx__9013];
  if(!(node__9014 == null)) {
    return node__9014.inode_find(shift + 5, hash, key, not_found)
  }else {
    return not_found
  }
};
cljs.core.ArrayNode.prototype.inode_without = function(shift, hash, key) {
  var this__9015 = this;
  var inode__9016 = this;
  var idx__9017 = hash >>> shift & 31;
  var node__9018 = this__9015.arr[idx__9017];
  if(!(node__9018 == null)) {
    var n__9019 = node__9018.inode_without(shift + 5, hash, key);
    if(n__9019 === node__9018) {
      return inode__9016
    }else {
      if(n__9019 == null) {
        if(this__9015.cnt <= 8) {
          return cljs.core.pack_array_node.call(null, inode__9016, null, idx__9017)
        }else {
          return new cljs.core.ArrayNode(null, this__9015.cnt - 1, cljs.core.clone_and_set.call(null, this__9015.arr, idx__9017, n__9019))
        }
      }else {
        if("\ufdd0'else") {
          return new cljs.core.ArrayNode(null, this__9015.cnt, cljs.core.clone_and_set.call(null, this__9015.arr, idx__9017, n__9019))
        }else {
          return null
        }
      }
    }
  }else {
    return inode__9016
  }
};
cljs.core.ArrayNode.prototype.inode_assoc = function(shift, hash, key, val, added_leaf_QMARK_) {
  var this__9020 = this;
  var inode__9021 = this;
  var idx__9022 = hash >>> shift & 31;
  var node__9023 = this__9020.arr[idx__9022];
  if(node__9023 == null) {
    return new cljs.core.ArrayNode(null, this__9020.cnt + 1, cljs.core.clone_and_set.call(null, this__9020.arr, idx__9022, cljs.core.BitmapIndexedNode.EMPTY.inode_assoc(shift + 5, hash, key, val, added_leaf_QMARK_)))
  }else {
    var n__9024 = node__9023.inode_assoc(shift + 5, hash, key, val, added_leaf_QMARK_);
    if(n__9024 === node__9023) {
      return inode__9021
    }else {
      return new cljs.core.ArrayNode(null, this__9020.cnt, cljs.core.clone_and_set.call(null, this__9020.arr, idx__9022, n__9024))
    }
  }
};
cljs.core.ArrayNode.prototype.inode_lookup = function(shift, hash, key, not_found) {
  var this__9025 = this;
  var inode__9026 = this;
  var idx__9027 = hash >>> shift & 31;
  var node__9028 = this__9025.arr[idx__9027];
  if(!(node__9028 == null)) {
    return node__9028.inode_lookup(shift + 5, hash, key, not_found)
  }else {
    return not_found
  }
};
cljs.core.ArrayNode;
cljs.core.hash_collision_node_find_index = function hash_collision_node_find_index(arr, cnt, key) {
  var lim__9033 = 2 * cnt;
  var i__9034 = 0;
  while(true) {
    if(i__9034 < lim__9033) {
      if(cljs.core.key_test.call(null, key, arr[i__9034])) {
        return i__9034
      }else {
        var G__9035 = i__9034 + 2;
        i__9034 = G__9035;
        continue
      }
    }else {
      return-1
    }
    break
  }
};
cljs.core.HashCollisionNode = function(edit, collision_hash, cnt, arr) {
  this.edit = edit;
  this.collision_hash = collision_hash;
  this.cnt = cnt;
  this.arr = arr
};
cljs.core.HashCollisionNode.cljs$lang$type = true;
cljs.core.HashCollisionNode.cljs$lang$ctorPrSeq = function(this__2315__auto__) {
  return cljs.core.list.call(null, "cljs.core/HashCollisionNode")
};
cljs.core.HashCollisionNode.prototype.inode_assoc_BANG_ = function(edit, shift, hash, key, val, added_leaf_QMARK_) {
  var this__9036 = this;
  var inode__9037 = this;
  if(hash === this__9036.collision_hash) {
    var idx__9038 = cljs.core.hash_collision_node_find_index.call(null, this__9036.arr, this__9036.cnt, key);
    if(idx__9038 === -1) {
      if(this__9036.arr.length > 2 * this__9036.cnt) {
        var editable__9039 = cljs.core.edit_and_set.call(null, inode__9037, edit, 2 * this__9036.cnt, key, 2 * this__9036.cnt + 1, val);
        added_leaf_QMARK_.val = true;
        editable__9039.cnt = editable__9039.cnt + 1;
        return editable__9039
      }else {
        var len__9040 = this__9036.arr.length;
        var new_arr__9041 = cljs.core.make_array.call(null, len__9040 + 2);
        cljs.core.array_copy.call(null, this__9036.arr, 0, new_arr__9041, 0, len__9040);
        new_arr__9041[len__9040] = key;
        new_arr__9041[len__9040 + 1] = val;
        added_leaf_QMARK_.val = true;
        return inode__9037.ensure_editable_array(edit, this__9036.cnt + 1, new_arr__9041)
      }
    }else {
      if(this__9036.arr[idx__9038 + 1] === val) {
        return inode__9037
      }else {
        return cljs.core.edit_and_set.call(null, inode__9037, edit, idx__9038 + 1, val)
      }
    }
  }else {
    return(new cljs.core.BitmapIndexedNode(edit, 1 << (this__9036.collision_hash >>> shift & 31), [null, inode__9037, null, null])).inode_assoc_BANG_(edit, shift, hash, key, val, added_leaf_QMARK_)
  }
};
cljs.core.HashCollisionNode.prototype.inode_seq = function() {
  var this__9042 = this;
  var inode__9043 = this;
  return cljs.core.create_inode_seq.call(null, this__9042.arr)
};
cljs.core.HashCollisionNode.prototype.inode_without_BANG_ = function(edit, shift, hash, key, removed_leaf_QMARK_) {
  var this__9044 = this;
  var inode__9045 = this;
  var idx__9046 = cljs.core.hash_collision_node_find_index.call(null, this__9044.arr, this__9044.cnt, key);
  if(idx__9046 === -1) {
    return inode__9045
  }else {
    removed_leaf_QMARK_[0] = true;
    if(this__9044.cnt === 1) {
      return null
    }else {
      var editable__9047 = inode__9045.ensure_editable(edit);
      var earr__9048 = editable__9047.arr;
      earr__9048[idx__9046] = earr__9048[2 * this__9044.cnt - 2];
      earr__9048[idx__9046 + 1] = earr__9048[2 * this__9044.cnt - 1];
      earr__9048[2 * this__9044.cnt - 1] = null;
      earr__9048[2 * this__9044.cnt - 2] = null;
      editable__9047.cnt = editable__9047.cnt - 1;
      return editable__9047
    }
  }
};
cljs.core.HashCollisionNode.prototype.ensure_editable = function(e) {
  var this__9049 = this;
  var inode__9050 = this;
  if(e === this__9049.edit) {
    return inode__9050
  }else {
    var new_arr__9051 = cljs.core.make_array.call(null, 2 * (this__9049.cnt + 1));
    cljs.core.array_copy.call(null, this__9049.arr, 0, new_arr__9051, 0, 2 * this__9049.cnt);
    return new cljs.core.HashCollisionNode(e, this__9049.collision_hash, this__9049.cnt, new_arr__9051)
  }
};
cljs.core.HashCollisionNode.prototype.kv_reduce = function(f, init) {
  var this__9052 = this;
  var inode__9053 = this;
  return cljs.core.inode_kv_reduce.call(null, this__9052.arr, f, init)
};
cljs.core.HashCollisionNode.prototype.inode_find = function(shift, hash, key, not_found) {
  var this__9054 = this;
  var inode__9055 = this;
  var idx__9056 = cljs.core.hash_collision_node_find_index.call(null, this__9054.arr, this__9054.cnt, key);
  if(idx__9056 < 0) {
    return not_found
  }else {
    if(cljs.core.key_test.call(null, key, this__9054.arr[idx__9056])) {
      return cljs.core.PersistentVector.fromArray([this__9054.arr[idx__9056], this__9054.arr[idx__9056 + 1]], true)
    }else {
      if("\ufdd0'else") {
        return not_found
      }else {
        return null
      }
    }
  }
};
cljs.core.HashCollisionNode.prototype.inode_without = function(shift, hash, key) {
  var this__9057 = this;
  var inode__9058 = this;
  var idx__9059 = cljs.core.hash_collision_node_find_index.call(null, this__9057.arr, this__9057.cnt, key);
  if(idx__9059 === -1) {
    return inode__9058
  }else {
    if(this__9057.cnt === 1) {
      return null
    }else {
      if("\ufdd0'else") {
        return new cljs.core.HashCollisionNode(null, this__9057.collision_hash, this__9057.cnt - 1, cljs.core.remove_pair.call(null, this__9057.arr, cljs.core.quot.call(null, idx__9059, 2)))
      }else {
        return null
      }
    }
  }
};
cljs.core.HashCollisionNode.prototype.inode_assoc = function(shift, hash, key, val, added_leaf_QMARK_) {
  var this__9060 = this;
  var inode__9061 = this;
  if(hash === this__9060.collision_hash) {
    var idx__9062 = cljs.core.hash_collision_node_find_index.call(null, this__9060.arr, this__9060.cnt, key);
    if(idx__9062 === -1) {
      var len__9063 = this__9060.arr.length;
      var new_arr__9064 = cljs.core.make_array.call(null, len__9063 + 2);
      cljs.core.array_copy.call(null, this__9060.arr, 0, new_arr__9064, 0, len__9063);
      new_arr__9064[len__9063] = key;
      new_arr__9064[len__9063 + 1] = val;
      added_leaf_QMARK_.val = true;
      return new cljs.core.HashCollisionNode(null, this__9060.collision_hash, this__9060.cnt + 1, new_arr__9064)
    }else {
      if(cljs.core._EQ_.call(null, this__9060.arr[idx__9062], val)) {
        return inode__9061
      }else {
        return new cljs.core.HashCollisionNode(null, this__9060.collision_hash, this__9060.cnt, cljs.core.clone_and_set.call(null, this__9060.arr, idx__9062 + 1, val))
      }
    }
  }else {
    return(new cljs.core.BitmapIndexedNode(null, 1 << (this__9060.collision_hash >>> shift & 31), [null, inode__9061])).inode_assoc(shift, hash, key, val, added_leaf_QMARK_)
  }
};
cljs.core.HashCollisionNode.prototype.inode_lookup = function(shift, hash, key, not_found) {
  var this__9065 = this;
  var inode__9066 = this;
  var idx__9067 = cljs.core.hash_collision_node_find_index.call(null, this__9065.arr, this__9065.cnt, key);
  if(idx__9067 < 0) {
    return not_found
  }else {
    if(cljs.core.key_test.call(null, key, this__9065.arr[idx__9067])) {
      return this__9065.arr[idx__9067 + 1]
    }else {
      if("\ufdd0'else") {
        return not_found
      }else {
        return null
      }
    }
  }
};
cljs.core.HashCollisionNode.prototype.ensure_editable_array = function(e, count, array) {
  var this__9068 = this;
  var inode__9069 = this;
  if(e === this__9068.edit) {
    this__9068.arr = array;
    this__9068.cnt = count;
    return inode__9069
  }else {
    return new cljs.core.HashCollisionNode(this__9068.edit, this__9068.collision_hash, count, array)
  }
};
cljs.core.HashCollisionNode;
cljs.core.create_node = function() {
  var create_node = null;
  var create_node__6 = function(shift, key1, val1, key2hash, key2, val2) {
    var key1hash__9074 = cljs.core.hash.call(null, key1);
    if(key1hash__9074 === key2hash) {
      return new cljs.core.HashCollisionNode(null, key1hash__9074, 2, [key1, val1, key2, val2])
    }else {
      var added_leaf_QMARK___9075 = new cljs.core.Box(false);
      return cljs.core.BitmapIndexedNode.EMPTY.inode_assoc(shift, key1hash__9074, key1, val1, added_leaf_QMARK___9075).inode_assoc(shift, key2hash, key2, val2, added_leaf_QMARK___9075)
    }
  };
  var create_node__7 = function(edit, shift, key1, val1, key2hash, key2, val2) {
    var key1hash__9076 = cljs.core.hash.call(null, key1);
    if(key1hash__9076 === key2hash) {
      return new cljs.core.HashCollisionNode(null, key1hash__9076, 2, [key1, val1, key2, val2])
    }else {
      var added_leaf_QMARK___9077 = new cljs.core.Box(false);
      return cljs.core.BitmapIndexedNode.EMPTY.inode_assoc_BANG_(edit, shift, key1hash__9076, key1, val1, added_leaf_QMARK___9077).inode_assoc_BANG_(edit, shift, key2hash, key2, val2, added_leaf_QMARK___9077)
    }
  };
  create_node = function(edit, shift, key1, val1, key2hash, key2, val2) {
    switch(arguments.length) {
      case 6:
        return create_node__6.call(this, edit, shift, key1, val1, key2hash, key2);
      case 7:
        return create_node__7.call(this, edit, shift, key1, val1, key2hash, key2, val2)
    }
    throw"Invalid arity: " + arguments.length;
  };
  create_node.cljs$lang$arity$6 = create_node__6;
  create_node.cljs$lang$arity$7 = create_node__7;
  return create_node
}();
cljs.core.NodeSeq = function(meta, nodes, i, s, __hash) {
  this.meta = meta;
  this.nodes = nodes;
  this.i = i;
  this.s = s;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 31850572
};
cljs.core.NodeSeq.cljs$lang$type = true;
cljs.core.NodeSeq.cljs$lang$ctorPrSeq = function(this__2315__auto__) {
  return cljs.core.list.call(null, "cljs.core/NodeSeq")
};
cljs.core.NodeSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__9078 = this;
  var h__2198__auto____9079 = this__9078.__hash;
  if(!(h__2198__auto____9079 == null)) {
    return h__2198__auto____9079
  }else {
    var h__2198__auto____9080 = cljs.core.hash_coll.call(null, coll);
    this__9078.__hash = h__2198__auto____9080;
    return h__2198__auto____9080
  }
};
cljs.core.NodeSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__9081 = this;
  return cljs.core.cons.call(null, o, coll)
};
cljs.core.NodeSeq.prototype.toString = function() {
  var this__9082 = this;
  var this__9083 = this;
  return cljs.core.pr_str.call(null, this__9083)
};
cljs.core.NodeSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(this$) {
  var this__9084 = this;
  return this$
};
cljs.core.NodeSeq.prototype.cljs$core$ISeq$_first$arity$1 = function(coll) {
  var this__9085 = this;
  if(this__9085.s == null) {
    return cljs.core.PersistentVector.fromArray([this__9085.nodes[this__9085.i], this__9085.nodes[this__9085.i + 1]], true)
  }else {
    return cljs.core.first.call(null, this__9085.s)
  }
};
cljs.core.NodeSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(coll) {
  var this__9086 = this;
  if(this__9086.s == null) {
    return cljs.core.create_inode_seq.call(null, this__9086.nodes, this__9086.i + 2, null)
  }else {
    return cljs.core.create_inode_seq.call(null, this__9086.nodes, this__9086.i, cljs.core.next.call(null, this__9086.s))
  }
};
cljs.core.NodeSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__9087 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.NodeSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__9088 = this;
  return new cljs.core.NodeSeq(meta, this__9088.nodes, this__9088.i, this__9088.s, this__9088.__hash)
};
cljs.core.NodeSeq.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__9089 = this;
  return this__9089.meta
};
cljs.core.NodeSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__9090 = this;
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this__9090.meta)
};
cljs.core.NodeSeq;
cljs.core.create_inode_seq = function() {
  var create_inode_seq = null;
  var create_inode_seq__1 = function(nodes) {
    return create_inode_seq.call(null, nodes, 0, null)
  };
  var create_inode_seq__3 = function(nodes, i, s) {
    if(s == null) {
      var len__9097 = nodes.length;
      var j__9098 = i;
      while(true) {
        if(j__9098 < len__9097) {
          if(!(nodes[j__9098] == null)) {
            return new cljs.core.NodeSeq(null, nodes, j__9098, null, null)
          }else {
            var temp__3971__auto____9099 = nodes[j__9098 + 1];
            if(cljs.core.truth_(temp__3971__auto____9099)) {
              var node__9100 = temp__3971__auto____9099;
              var temp__3971__auto____9101 = node__9100.inode_seq();
              if(cljs.core.truth_(temp__3971__auto____9101)) {
                var node_seq__9102 = temp__3971__auto____9101;
                return new cljs.core.NodeSeq(null, nodes, j__9098 + 2, node_seq__9102, null)
              }else {
                var G__9103 = j__9098 + 2;
                j__9098 = G__9103;
                continue
              }
            }else {
              var G__9104 = j__9098 + 2;
              j__9098 = G__9104;
              continue
            }
          }
        }else {
          return null
        }
        break
      }
    }else {
      return new cljs.core.NodeSeq(null, nodes, i, s, null)
    }
  };
  create_inode_seq = function(nodes, i, s) {
    switch(arguments.length) {
      case 1:
        return create_inode_seq__1.call(this, nodes);
      case 3:
        return create_inode_seq__3.call(this, nodes, i, s)
    }
    throw"Invalid arity: " + arguments.length;
  };
  create_inode_seq.cljs$lang$arity$1 = create_inode_seq__1;
  create_inode_seq.cljs$lang$arity$3 = create_inode_seq__3;
  return create_inode_seq
}();
cljs.core.ArrayNodeSeq = function(meta, nodes, i, s, __hash) {
  this.meta = meta;
  this.nodes = nodes;
  this.i = i;
  this.s = s;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 31850572
};
cljs.core.ArrayNodeSeq.cljs$lang$type = true;
cljs.core.ArrayNodeSeq.cljs$lang$ctorPrSeq = function(this__2315__auto__) {
  return cljs.core.list.call(null, "cljs.core/ArrayNodeSeq")
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__9105 = this;
  var h__2198__auto____9106 = this__9105.__hash;
  if(!(h__2198__auto____9106 == null)) {
    return h__2198__auto____9106
  }else {
    var h__2198__auto____9107 = cljs.core.hash_coll.call(null, coll);
    this__9105.__hash = h__2198__auto____9107;
    return h__2198__auto____9107
  }
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__9108 = this;
  return cljs.core.cons.call(null, o, coll)
};
cljs.core.ArrayNodeSeq.prototype.toString = function() {
  var this__9109 = this;
  var this__9110 = this;
  return cljs.core.pr_str.call(null, this__9110)
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(this$) {
  var this__9111 = this;
  return this$
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$ISeq$_first$arity$1 = function(coll) {
  var this__9112 = this;
  return cljs.core.first.call(null, this__9112.s)
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(coll) {
  var this__9113 = this;
  return cljs.core.create_array_node_seq.call(null, null, this__9113.nodes, this__9113.i, cljs.core.next.call(null, this__9113.s))
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__9114 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__9115 = this;
  return new cljs.core.ArrayNodeSeq(meta, this__9115.nodes, this__9115.i, this__9115.s, this__9115.__hash)
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__9116 = this;
  return this__9116.meta
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__9117 = this;
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this__9117.meta)
};
cljs.core.ArrayNodeSeq;
cljs.core.create_array_node_seq = function() {
  var create_array_node_seq = null;
  var create_array_node_seq__1 = function(nodes) {
    return create_array_node_seq.call(null, null, nodes, 0, null)
  };
  var create_array_node_seq__4 = function(meta, nodes, i, s) {
    if(s == null) {
      var len__9124 = nodes.length;
      var j__9125 = i;
      while(true) {
        if(j__9125 < len__9124) {
          var temp__3971__auto____9126 = nodes[j__9125];
          if(cljs.core.truth_(temp__3971__auto____9126)) {
            var nj__9127 = temp__3971__auto____9126;
            var temp__3971__auto____9128 = nj__9127.inode_seq();
            if(cljs.core.truth_(temp__3971__auto____9128)) {
              var ns__9129 = temp__3971__auto____9128;
              return new cljs.core.ArrayNodeSeq(meta, nodes, j__9125 + 1, ns__9129, null)
            }else {
              var G__9130 = j__9125 + 1;
              j__9125 = G__9130;
              continue
            }
          }else {
            var G__9131 = j__9125 + 1;
            j__9125 = G__9131;
            continue
          }
        }else {
          return null
        }
        break
      }
    }else {
      return new cljs.core.ArrayNodeSeq(meta, nodes, i, s, null)
    }
  };
  create_array_node_seq = function(meta, nodes, i, s) {
    switch(arguments.length) {
      case 1:
        return create_array_node_seq__1.call(this, meta);
      case 4:
        return create_array_node_seq__4.call(this, meta, nodes, i, s)
    }
    throw"Invalid arity: " + arguments.length;
  };
  create_array_node_seq.cljs$lang$arity$1 = create_array_node_seq__1;
  create_array_node_seq.cljs$lang$arity$4 = create_array_node_seq__4;
  return create_array_node_seq
}();
cljs.core.PersistentHashMap = function(meta, cnt, root, has_nil_QMARK_, nil_val, __hash) {
  this.meta = meta;
  this.cnt = cnt;
  this.root = root;
  this.has_nil_QMARK_ = has_nil_QMARK_;
  this.nil_val = nil_val;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 1;
  this.cljs$lang$protocol_mask$partition0$ = 16123663
};
cljs.core.PersistentHashMap.cljs$lang$type = true;
cljs.core.PersistentHashMap.cljs$lang$ctorPrSeq = function(this__2315__auto__) {
  return cljs.core.list.call(null, "cljs.core/PersistentHashMap")
};
cljs.core.PersistentHashMap.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = function(coll) {
  var this__9134 = this;
  return new cljs.core.TransientHashMap({}, this__9134.root, this__9134.cnt, this__9134.has_nil_QMARK_, this__9134.nil_val)
};
cljs.core.PersistentHashMap.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__9135 = this;
  var h__2198__auto____9136 = this__9135.__hash;
  if(!(h__2198__auto____9136 == null)) {
    return h__2198__auto____9136
  }else {
    var h__2198__auto____9137 = cljs.core.hash_imap.call(null, coll);
    this__9135.__hash = h__2198__auto____9137;
    return h__2198__auto____9137
  }
};
cljs.core.PersistentHashMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(coll, k) {
  var this__9138 = this;
  return coll.cljs$core$ILookup$_lookup$arity$3(coll, k, null)
};
cljs.core.PersistentHashMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(coll, k, not_found) {
  var this__9139 = this;
  if(k == null) {
    if(this__9139.has_nil_QMARK_) {
      return this__9139.nil_val
    }else {
      return not_found
    }
  }else {
    if(this__9139.root == null) {
      return not_found
    }else {
      if("\ufdd0'else") {
        return this__9139.root.inode_lookup(0, cljs.core.hash.call(null, k), k, not_found)
      }else {
        return null
      }
    }
  }
};
cljs.core.PersistentHashMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(coll, k, v) {
  var this__9140 = this;
  if(k == null) {
    if(function() {
      var and__3822__auto____9141 = this__9140.has_nil_QMARK_;
      if(and__3822__auto____9141) {
        return v === this__9140.nil_val
      }else {
        return and__3822__auto____9141
      }
    }()) {
      return coll
    }else {
      return new cljs.core.PersistentHashMap(this__9140.meta, this__9140.has_nil_QMARK_ ? this__9140.cnt : this__9140.cnt + 1, this__9140.root, true, v, null)
    }
  }else {
    var added_leaf_QMARK___9142 = new cljs.core.Box(false);
    var new_root__9143 = (this__9140.root == null ? cljs.core.BitmapIndexedNode.EMPTY : this__9140.root).inode_assoc(0, cljs.core.hash.call(null, k), k, v, added_leaf_QMARK___9142);
    if(new_root__9143 === this__9140.root) {
      return coll
    }else {
      return new cljs.core.PersistentHashMap(this__9140.meta, added_leaf_QMARK___9142.val ? this__9140.cnt + 1 : this__9140.cnt, new_root__9143, this__9140.has_nil_QMARK_, this__9140.nil_val, null)
    }
  }
};
cljs.core.PersistentHashMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = function(coll, k) {
  var this__9144 = this;
  if(k == null) {
    return this__9144.has_nil_QMARK_
  }else {
    if(this__9144.root == null) {
      return false
    }else {
      if("\ufdd0'else") {
        return!(this__9144.root.inode_lookup(0, cljs.core.hash.call(null, k), k, cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel)
      }else {
        return null
      }
    }
  }
};
cljs.core.PersistentHashMap.prototype.call = function() {
  var G__9167 = null;
  var G__9167__2 = function(this_sym9145, k) {
    var this__9147 = this;
    var this_sym9145__9148 = this;
    var coll__9149 = this_sym9145__9148;
    return coll__9149.cljs$core$ILookup$_lookup$arity$2(coll__9149, k)
  };
  var G__9167__3 = function(this_sym9146, k, not_found) {
    var this__9147 = this;
    var this_sym9146__9150 = this;
    var coll__9151 = this_sym9146__9150;
    return coll__9151.cljs$core$ILookup$_lookup$arity$3(coll__9151, k, not_found)
  };
  G__9167 = function(this_sym9146, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__9167__2.call(this, this_sym9146, k);
      case 3:
        return G__9167__3.call(this, this_sym9146, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__9167
}();
cljs.core.PersistentHashMap.prototype.apply = function(this_sym9132, args9133) {
  var this__9152 = this;
  return this_sym9132.call.apply(this_sym9132, [this_sym9132].concat(args9133.slice()))
};
cljs.core.PersistentHashMap.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = function(coll, f, init) {
  var this__9153 = this;
  var init__9154 = this__9153.has_nil_QMARK_ ? f.call(null, init, null, this__9153.nil_val) : init;
  if(cljs.core.reduced_QMARK_.call(null, init__9154)) {
    return cljs.core.deref.call(null, init__9154)
  }else {
    if(!(this__9153.root == null)) {
      return this__9153.root.kv_reduce(f, init__9154)
    }else {
      if("\ufdd0'else") {
        return init__9154
      }else {
        return null
      }
    }
  }
};
cljs.core.PersistentHashMap.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, entry) {
  var this__9155 = this;
  if(cljs.core.vector_QMARK_.call(null, entry)) {
    return coll.cljs$core$IAssociative$_assoc$arity$3(coll, cljs.core._nth.call(null, entry, 0), cljs.core._nth.call(null, entry, 1))
  }else {
    return cljs.core.reduce.call(null, cljs.core._conj, coll, entry)
  }
};
cljs.core.PersistentHashMap.prototype.toString = function() {
  var this__9156 = this;
  var this__9157 = this;
  return cljs.core.pr_str.call(null, this__9157)
};
cljs.core.PersistentHashMap.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__9158 = this;
  if(this__9158.cnt > 0) {
    var s__9159 = !(this__9158.root == null) ? this__9158.root.inode_seq() : null;
    if(this__9158.has_nil_QMARK_) {
      return cljs.core.cons.call(null, cljs.core.PersistentVector.fromArray([null, this__9158.nil_val], true), s__9159)
    }else {
      return s__9159
    }
  }else {
    return null
  }
};
cljs.core.PersistentHashMap.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__9160 = this;
  return this__9160.cnt
};
cljs.core.PersistentHashMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__9161 = this;
  return cljs.core.equiv_map.call(null, coll, other)
};
cljs.core.PersistentHashMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__9162 = this;
  return new cljs.core.PersistentHashMap(meta, this__9162.cnt, this__9162.root, this__9162.has_nil_QMARK_, this__9162.nil_val, this__9162.__hash)
};
cljs.core.PersistentHashMap.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__9163 = this;
  return this__9163.meta
};
cljs.core.PersistentHashMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__9164 = this;
  return cljs.core._with_meta.call(null, cljs.core.PersistentHashMap.EMPTY, this__9164.meta)
};
cljs.core.PersistentHashMap.prototype.cljs$core$IMap$_dissoc$arity$2 = function(coll, k) {
  var this__9165 = this;
  if(k == null) {
    if(this__9165.has_nil_QMARK_) {
      return new cljs.core.PersistentHashMap(this__9165.meta, this__9165.cnt - 1, this__9165.root, false, null, null)
    }else {
      return coll
    }
  }else {
    if(this__9165.root == null) {
      return coll
    }else {
      if("\ufdd0'else") {
        var new_root__9166 = this__9165.root.inode_without(0, cljs.core.hash.call(null, k), k);
        if(new_root__9166 === this__9165.root) {
          return coll
        }else {
          return new cljs.core.PersistentHashMap(this__9165.meta, this__9165.cnt - 1, new_root__9166, this__9165.has_nil_QMARK_, this__9165.nil_val, null)
        }
      }else {
        return null
      }
    }
  }
};
cljs.core.PersistentHashMap;
cljs.core.PersistentHashMap.EMPTY = new cljs.core.PersistentHashMap(null, 0, null, false, null, 0);
cljs.core.PersistentHashMap.fromArrays = function(ks, vs) {
  var len__9168 = ks.length;
  var i__9169 = 0;
  var out__9170 = cljs.core.transient$.call(null, cljs.core.PersistentHashMap.EMPTY);
  while(true) {
    if(i__9169 < len__9168) {
      var G__9171 = i__9169 + 1;
      var G__9172 = cljs.core.assoc_BANG_.call(null, out__9170, ks[i__9169], vs[i__9169]);
      i__9169 = G__9171;
      out__9170 = G__9172;
      continue
    }else {
      return cljs.core.persistent_BANG_.call(null, out__9170)
    }
    break
  }
};
cljs.core.TransientHashMap = function(edit, root, count, has_nil_QMARK_, nil_val) {
  this.edit = edit;
  this.root = root;
  this.count = count;
  this.has_nil_QMARK_ = has_nil_QMARK_;
  this.nil_val = nil_val;
  this.cljs$lang$protocol_mask$partition1$ = 14;
  this.cljs$lang$protocol_mask$partition0$ = 258
};
cljs.core.TransientHashMap.cljs$lang$type = true;
cljs.core.TransientHashMap.cljs$lang$ctorPrSeq = function(this__2315__auto__) {
  return cljs.core.list.call(null, "cljs.core/TransientHashMap")
};
cljs.core.TransientHashMap.prototype.cljs$core$ITransientMap$_dissoc_BANG_$arity$2 = function(tcoll, key) {
  var this__9173 = this;
  return tcoll.without_BANG_(key)
};
cljs.core.TransientHashMap.prototype.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3 = function(tcoll, key, val) {
  var this__9174 = this;
  return tcoll.assoc_BANG_(key, val)
};
cljs.core.TransientHashMap.prototype.cljs$core$ITransientCollection$_conj_BANG_$arity$2 = function(tcoll, val) {
  var this__9175 = this;
  return tcoll.conj_BANG_(val)
};
cljs.core.TransientHashMap.prototype.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 = function(tcoll) {
  var this__9176 = this;
  return tcoll.persistent_BANG_()
};
cljs.core.TransientHashMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(tcoll, k) {
  var this__9177 = this;
  if(k == null) {
    if(this__9177.has_nil_QMARK_) {
      return this__9177.nil_val
    }else {
      return null
    }
  }else {
    if(this__9177.root == null) {
      return null
    }else {
      return this__9177.root.inode_lookup(0, cljs.core.hash.call(null, k), k)
    }
  }
};
cljs.core.TransientHashMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(tcoll, k, not_found) {
  var this__9178 = this;
  if(k == null) {
    if(this__9178.has_nil_QMARK_) {
      return this__9178.nil_val
    }else {
      return not_found
    }
  }else {
    if(this__9178.root == null) {
      return not_found
    }else {
      return this__9178.root.inode_lookup(0, cljs.core.hash.call(null, k), k, not_found)
    }
  }
};
cljs.core.TransientHashMap.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__9179 = this;
  if(this__9179.edit) {
    return this__9179.count
  }else {
    throw new Error("count after persistent!");
  }
};
cljs.core.TransientHashMap.prototype.conj_BANG_ = function(o) {
  var this__9180 = this;
  var tcoll__9181 = this;
  if(this__9180.edit) {
    if(function() {
      var G__9182__9183 = o;
      if(G__9182__9183) {
        if(function() {
          var or__3824__auto____9184 = G__9182__9183.cljs$lang$protocol_mask$partition0$ & 2048;
          if(or__3824__auto____9184) {
            return or__3824__auto____9184
          }else {
            return G__9182__9183.cljs$core$IMapEntry$
          }
        }()) {
          return true
        }else {
          if(!G__9182__9183.cljs$lang$protocol_mask$partition0$) {
            return cljs.core.type_satisfies_.call(null, cljs.core.IMapEntry, G__9182__9183)
          }else {
            return false
          }
        }
      }else {
        return cljs.core.type_satisfies_.call(null, cljs.core.IMapEntry, G__9182__9183)
      }
    }()) {
      return tcoll__9181.assoc_BANG_(cljs.core.key.call(null, o), cljs.core.val.call(null, o))
    }else {
      var es__9185 = cljs.core.seq.call(null, o);
      var tcoll__9186 = tcoll__9181;
      while(true) {
        var temp__3971__auto____9187 = cljs.core.first.call(null, es__9185);
        if(cljs.core.truth_(temp__3971__auto____9187)) {
          var e__9188 = temp__3971__auto____9187;
          var G__9199 = cljs.core.next.call(null, es__9185);
          var G__9200 = tcoll__9186.assoc_BANG_(cljs.core.key.call(null, e__9188), cljs.core.val.call(null, e__9188));
          es__9185 = G__9199;
          tcoll__9186 = G__9200;
          continue
        }else {
          return tcoll__9186
        }
        break
      }
    }
  }else {
    throw new Error("conj! after persistent");
  }
};
cljs.core.TransientHashMap.prototype.assoc_BANG_ = function(k, v) {
  var this__9189 = this;
  var tcoll__9190 = this;
  if(this__9189.edit) {
    if(k == null) {
      if(this__9189.nil_val === v) {
      }else {
        this__9189.nil_val = v
      }
      if(this__9189.has_nil_QMARK_) {
      }else {
        this__9189.count = this__9189.count + 1;
        this__9189.has_nil_QMARK_ = true
      }
      return tcoll__9190
    }else {
      var added_leaf_QMARK___9191 = new cljs.core.Box(false);
      var node__9192 = (this__9189.root == null ? cljs.core.BitmapIndexedNode.EMPTY : this__9189.root).inode_assoc_BANG_(this__9189.edit, 0, cljs.core.hash.call(null, k), k, v, added_leaf_QMARK___9191);
      if(node__9192 === this__9189.root) {
      }else {
        this__9189.root = node__9192
      }
      if(added_leaf_QMARK___9191.val) {
        this__9189.count = this__9189.count + 1
      }else {
      }
      return tcoll__9190
    }
  }else {
    throw new Error("assoc! after persistent!");
  }
};
cljs.core.TransientHashMap.prototype.without_BANG_ = function(k) {
  var this__9193 = this;
  var tcoll__9194 = this;
  if(this__9193.edit) {
    if(k == null) {
      if(this__9193.has_nil_QMARK_) {
        this__9193.has_nil_QMARK_ = false;
        this__9193.nil_val = null;
        this__9193.count = this__9193.count - 1;
        return tcoll__9194
      }else {
        return tcoll__9194
      }
    }else {
      if(this__9193.root == null) {
        return tcoll__9194
      }else {
        var removed_leaf_QMARK___9195 = new cljs.core.Box(false);
        var node__9196 = this__9193.root.inode_without_BANG_(this__9193.edit, 0, cljs.core.hash.call(null, k), k, removed_leaf_QMARK___9195);
        if(node__9196 === this__9193.root) {
        }else {
          this__9193.root = node__9196
        }
        if(cljs.core.truth_(removed_leaf_QMARK___9195[0])) {
          this__9193.count = this__9193.count - 1
        }else {
        }
        return tcoll__9194
      }
    }
  }else {
    throw new Error("dissoc! after persistent!");
  }
};
cljs.core.TransientHashMap.prototype.persistent_BANG_ = function() {
  var this__9197 = this;
  var tcoll__9198 = this;
  if(this__9197.edit) {
    this__9197.edit = null;
    return new cljs.core.PersistentHashMap(null, this__9197.count, this__9197.root, this__9197.has_nil_QMARK_, this__9197.nil_val, null)
  }else {
    throw new Error("persistent! called twice");
  }
};
cljs.core.TransientHashMap;
cljs.core.tree_map_seq_push = function tree_map_seq_push(node, stack, ascending_QMARK_) {
  var t__9203 = node;
  var stack__9204 = stack;
  while(true) {
    if(!(t__9203 == null)) {
      var G__9205 = ascending_QMARK_ ? t__9203.left : t__9203.right;
      var G__9206 = cljs.core.conj.call(null, stack__9204, t__9203);
      t__9203 = G__9205;
      stack__9204 = G__9206;
      continue
    }else {
      return stack__9204
    }
    break
  }
};
cljs.core.PersistentTreeMapSeq = function(meta, stack, ascending_QMARK_, cnt, __hash) {
  this.meta = meta;
  this.stack = stack;
  this.ascending_QMARK_ = ascending_QMARK_;
  this.cnt = cnt;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 31850570
};
cljs.core.PersistentTreeMapSeq.cljs$lang$type = true;
cljs.core.PersistentTreeMapSeq.cljs$lang$ctorPrSeq = function(this__2315__auto__) {
  return cljs.core.list.call(null, "cljs.core/PersistentTreeMapSeq")
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__9207 = this;
  var h__2198__auto____9208 = this__9207.__hash;
  if(!(h__2198__auto____9208 == null)) {
    return h__2198__auto____9208
  }else {
    var h__2198__auto____9209 = cljs.core.hash_coll.call(null, coll);
    this__9207.__hash = h__2198__auto____9209;
    return h__2198__auto____9209
  }
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__9210 = this;
  return cljs.core.cons.call(null, o, coll)
};
cljs.core.PersistentTreeMapSeq.prototype.toString = function() {
  var this__9211 = this;
  var this__9212 = this;
  return cljs.core.pr_str.call(null, this__9212)
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(this$) {
  var this__9213 = this;
  return this$
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__9214 = this;
  if(this__9214.cnt < 0) {
    return cljs.core.count.call(null, cljs.core.next.call(null, coll)) + 1
  }else {
    return this__9214.cnt
  }
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ISeq$_first$arity$1 = function(this$) {
  var this__9215 = this;
  return cljs.core.peek.call(null, this__9215.stack)
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(this$) {
  var this__9216 = this;
  var t__9217 = cljs.core.first.call(null, this__9216.stack);
  var next_stack__9218 = cljs.core.tree_map_seq_push.call(null, this__9216.ascending_QMARK_ ? t__9217.right : t__9217.left, cljs.core.next.call(null, this__9216.stack), this__9216.ascending_QMARK_);
  if(!(next_stack__9218 == null)) {
    return new cljs.core.PersistentTreeMapSeq(null, next_stack__9218, this__9216.ascending_QMARK_, this__9216.cnt - 1, null)
  }else {
    return cljs.core.List.EMPTY
  }
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__9219 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__9220 = this;
  return new cljs.core.PersistentTreeMapSeq(meta, this__9220.stack, this__9220.ascending_QMARK_, this__9220.cnt, this__9220.__hash)
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__9221 = this;
  return this__9221.meta
};
cljs.core.PersistentTreeMapSeq;
cljs.core.create_tree_map_seq = function create_tree_map_seq(tree, ascending_QMARK_, cnt) {
  return new cljs.core.PersistentTreeMapSeq(null, cljs.core.tree_map_seq_push.call(null, tree, null, ascending_QMARK_), ascending_QMARK_, cnt, null)
};
cljs.core.balance_left = function balance_left(key, val, ins, right) {
  if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, ins)) {
    if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, ins.left)) {
      return new cljs.core.RedNode(ins.key, ins.val, ins.left.blacken(), new cljs.core.BlackNode(key, val, ins.right, right, null), null)
    }else {
      if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, ins.right)) {
        return new cljs.core.RedNode(ins.right.key, ins.right.val, new cljs.core.BlackNode(ins.key, ins.val, ins.left, ins.right.left, null), new cljs.core.BlackNode(key, val, ins.right.right, right, null), null)
      }else {
        if("\ufdd0'else") {
          return new cljs.core.BlackNode(key, val, ins, right, null)
        }else {
          return null
        }
      }
    }
  }else {
    return new cljs.core.BlackNode(key, val, ins, right, null)
  }
};
cljs.core.balance_right = function balance_right(key, val, left, ins) {
  if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, ins)) {
    if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, ins.right)) {
      return new cljs.core.RedNode(ins.key, ins.val, new cljs.core.BlackNode(key, val, left, ins.left, null), ins.right.blacken(), null)
    }else {
      if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, ins.left)) {
        return new cljs.core.RedNode(ins.left.key, ins.left.val, new cljs.core.BlackNode(key, val, left, ins.left.left, null), new cljs.core.BlackNode(ins.key, ins.val, ins.left.right, ins.right, null), null)
      }else {
        if("\ufdd0'else") {
          return new cljs.core.BlackNode(key, val, left, ins, null)
        }else {
          return null
        }
      }
    }
  }else {
    return new cljs.core.BlackNode(key, val, left, ins, null)
  }
};
cljs.core.balance_left_del = function balance_left_del(key, val, del, right) {
  if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, del)) {
    return new cljs.core.RedNode(key, val, del.blacken(), right, null)
  }else {
    if(cljs.core.instance_QMARK_.call(null, cljs.core.BlackNode, right)) {
      return cljs.core.balance_right.call(null, key, val, del, right.redden())
    }else {
      if(function() {
        var and__3822__auto____9223 = cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, right);
        if(and__3822__auto____9223) {
          return cljs.core.instance_QMARK_.call(null, cljs.core.BlackNode, right.left)
        }else {
          return and__3822__auto____9223
        }
      }()) {
        return new cljs.core.RedNode(right.left.key, right.left.val, new cljs.core.BlackNode(key, val, del, right.left.left, null), cljs.core.balance_right.call(null, right.key, right.val, right.left.right, right.right.redden()), null)
      }else {
        if("\ufdd0'else") {
          throw new Error("red-black tree invariant violation");
        }else {
          return null
        }
      }
    }
  }
};
cljs.core.balance_right_del = function balance_right_del(key, val, left, del) {
  if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, del)) {
    return new cljs.core.RedNode(key, val, left, del.blacken(), null)
  }else {
    if(cljs.core.instance_QMARK_.call(null, cljs.core.BlackNode, left)) {
      return cljs.core.balance_left.call(null, key, val, left.redden(), del)
    }else {
      if(function() {
        var and__3822__auto____9225 = cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, left);
        if(and__3822__auto____9225) {
          return cljs.core.instance_QMARK_.call(null, cljs.core.BlackNode, left.right)
        }else {
          return and__3822__auto____9225
        }
      }()) {
        return new cljs.core.RedNode(left.right.key, left.right.val, cljs.core.balance_left.call(null, left.key, left.val, left.left.redden(), left.right.left), new cljs.core.BlackNode(key, val, left.right.right, del, null), null)
      }else {
        if("\ufdd0'else") {
          throw new Error("red-black tree invariant violation");
        }else {
          return null
        }
      }
    }
  }
};
cljs.core.tree_map_kv_reduce = function tree_map_kv_reduce(node, f, init) {
  var init__9229 = f.call(null, init, node.key, node.val);
  if(cljs.core.reduced_QMARK_.call(null, init__9229)) {
    return cljs.core.deref.call(null, init__9229)
  }else {
    var init__9230 = !(node.left == null) ? tree_map_kv_reduce.call(null, node.left, f, init__9229) : init__9229;
    if(cljs.core.reduced_QMARK_.call(null, init__9230)) {
      return cljs.core.deref.call(null, init__9230)
    }else {
      var init__9231 = !(node.right == null) ? tree_map_kv_reduce.call(null, node.right, f, init__9230) : init__9230;
      if(cljs.core.reduced_QMARK_.call(null, init__9231)) {
        return cljs.core.deref.call(null, init__9231)
      }else {
        return init__9231
      }
    }
  }
};
cljs.core.BlackNode = function(key, val, left, right, __hash) {
  this.key = key;
  this.val = val;
  this.left = left;
  this.right = right;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 32402207
};
cljs.core.BlackNode.cljs$lang$type = true;
cljs.core.BlackNode.cljs$lang$ctorPrSeq = function(this__2315__auto__) {
  return cljs.core.list.call(null, "cljs.core/BlackNode")
};
cljs.core.BlackNode.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__9234 = this;
  var h__2198__auto____9235 = this__9234.__hash;
  if(!(h__2198__auto____9235 == null)) {
    return h__2198__auto____9235
  }else {
    var h__2198__auto____9236 = cljs.core.hash_coll.call(null, coll);
    this__9234.__hash = h__2198__auto____9236;
    return h__2198__auto____9236
  }
};
cljs.core.BlackNode.prototype.cljs$core$ILookup$_lookup$arity$2 = function(node, k) {
  var this__9237 = this;
  return node.cljs$core$IIndexed$_nth$arity$3(node, k, null)
};
cljs.core.BlackNode.prototype.cljs$core$ILookup$_lookup$arity$3 = function(node, k, not_found) {
  var this__9238 = this;
  return node.cljs$core$IIndexed$_nth$arity$3(node, k, not_found)
};
cljs.core.BlackNode.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(node, k, v) {
  var this__9239 = this;
  return cljs.core.assoc.call(null, cljs.core.PersistentVector.fromArray([this__9239.key, this__9239.val], true), k, v)
};
cljs.core.BlackNode.prototype.call = function() {
  var G__9287 = null;
  var G__9287__2 = function(this_sym9240, k) {
    var this__9242 = this;
    var this_sym9240__9243 = this;
    var node__9244 = this_sym9240__9243;
    return node__9244.cljs$core$ILookup$_lookup$arity$2(node__9244, k)
  };
  var G__9287__3 = function(this_sym9241, k, not_found) {
    var this__9242 = this;
    var this_sym9241__9245 = this;
    var node__9246 = this_sym9241__9245;
    return node__9246.cljs$core$ILookup$_lookup$arity$3(node__9246, k, not_found)
  };
  G__9287 = function(this_sym9241, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__9287__2.call(this, this_sym9241, k);
      case 3:
        return G__9287__3.call(this, this_sym9241, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__9287
}();
cljs.core.BlackNode.prototype.apply = function(this_sym9232, args9233) {
  var this__9247 = this;
  return this_sym9232.call.apply(this_sym9232, [this_sym9232].concat(args9233.slice()))
};
cljs.core.BlackNode.prototype.cljs$core$ICollection$_conj$arity$2 = function(node, o) {
  var this__9248 = this;
  return cljs.core.PersistentVector.fromArray([this__9248.key, this__9248.val, o], true)
};
cljs.core.BlackNode.prototype.cljs$core$IMapEntry$_key$arity$1 = function(node) {
  var this__9249 = this;
  return this__9249.key
};
cljs.core.BlackNode.prototype.cljs$core$IMapEntry$_val$arity$1 = function(node) {
  var this__9250 = this;
  return this__9250.val
};
cljs.core.BlackNode.prototype.add_right = function(ins) {
  var this__9251 = this;
  var node__9252 = this;
  return ins.balance_right(node__9252)
};
cljs.core.BlackNode.prototype.redden = function() {
  var this__9253 = this;
  var node__9254 = this;
  return new cljs.core.RedNode(this__9253.key, this__9253.val, this__9253.left, this__9253.right, null)
};
cljs.core.BlackNode.prototype.remove_right = function(del) {
  var this__9255 = this;
  var node__9256 = this;
  return cljs.core.balance_right_del.call(null, this__9255.key, this__9255.val, this__9255.left, del)
};
cljs.core.BlackNode.prototype.replace = function(key, val, left, right) {
  var this__9257 = this;
  var node__9258 = this;
  return new cljs.core.BlackNode(key, val, left, right, null)
};
cljs.core.BlackNode.prototype.kv_reduce = function(f, init) {
  var this__9259 = this;
  var node__9260 = this;
  return cljs.core.tree_map_kv_reduce.call(null, node__9260, f, init)
};
cljs.core.BlackNode.prototype.remove_left = function(del) {
  var this__9261 = this;
  var node__9262 = this;
  return cljs.core.balance_left_del.call(null, this__9261.key, this__9261.val, del, this__9261.right)
};
cljs.core.BlackNode.prototype.add_left = function(ins) {
  var this__9263 = this;
  var node__9264 = this;
  return ins.balance_left(node__9264)
};
cljs.core.BlackNode.prototype.balance_left = function(parent) {
  var this__9265 = this;
  var node__9266 = this;
  return new cljs.core.BlackNode(parent.key, parent.val, node__9266, parent.right, null)
};
cljs.core.BlackNode.prototype.toString = function() {
  var G__9288 = null;
  var G__9288__0 = function() {
    var this__9267 = this;
    var this__9269 = this;
    return cljs.core.pr_str.call(null, this__9269)
  };
  G__9288 = function() {
    switch(arguments.length) {
      case 0:
        return G__9288__0.call(this)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__9288
}();
cljs.core.BlackNode.prototype.balance_right = function(parent) {
  var this__9270 = this;
  var node__9271 = this;
  return new cljs.core.BlackNode(parent.key, parent.val, parent.left, node__9271, null)
};
cljs.core.BlackNode.prototype.blacken = function() {
  var this__9272 = this;
  var node__9273 = this;
  return node__9273
};
cljs.core.BlackNode.prototype.cljs$core$IReduce$_reduce$arity$2 = function(node, f) {
  var this__9274 = this;
  return cljs.core.ci_reduce.call(null, node, f)
};
cljs.core.BlackNode.prototype.cljs$core$IReduce$_reduce$arity$3 = function(node, f, start) {
  var this__9275 = this;
  return cljs.core.ci_reduce.call(null, node, f, start)
};
cljs.core.BlackNode.prototype.cljs$core$ISeqable$_seq$arity$1 = function(node) {
  var this__9276 = this;
  return cljs.core.list.call(null, this__9276.key, this__9276.val)
};
cljs.core.BlackNode.prototype.cljs$core$ICounted$_count$arity$1 = function(node) {
  var this__9277 = this;
  return 2
};
cljs.core.BlackNode.prototype.cljs$core$IStack$_peek$arity$1 = function(node) {
  var this__9278 = this;
  return this__9278.val
};
cljs.core.BlackNode.prototype.cljs$core$IStack$_pop$arity$1 = function(node) {
  var this__9279 = this;
  return cljs.core.PersistentVector.fromArray([this__9279.key], true)
};
cljs.core.BlackNode.prototype.cljs$core$IVector$_assoc_n$arity$3 = function(node, n, v) {
  var this__9280 = this;
  return cljs.core._assoc_n.call(null, cljs.core.PersistentVector.fromArray([this__9280.key, this__9280.val], true), n, v)
};
cljs.core.BlackNode.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__9281 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.BlackNode.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(node, meta) {
  var this__9282 = this;
  return cljs.core.with_meta.call(null, cljs.core.PersistentVector.fromArray([this__9282.key, this__9282.val], true), meta)
};
cljs.core.BlackNode.prototype.cljs$core$IMeta$_meta$arity$1 = function(node) {
  var this__9283 = this;
  return null
};
cljs.core.BlackNode.prototype.cljs$core$IIndexed$_nth$arity$2 = function(node, n) {
  var this__9284 = this;
  if(n === 0) {
    return this__9284.key
  }else {
    if(n === 1) {
      return this__9284.val
    }else {
      if("\ufdd0'else") {
        return null
      }else {
        return null
      }
    }
  }
};
cljs.core.BlackNode.prototype.cljs$core$IIndexed$_nth$arity$3 = function(node, n, not_found) {
  var this__9285 = this;
  if(n === 0) {
    return this__9285.key
  }else {
    if(n === 1) {
      return this__9285.val
    }else {
      if("\ufdd0'else") {
        return not_found
      }else {
        return null
      }
    }
  }
};
cljs.core.BlackNode.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(node) {
  var this__9286 = this;
  return cljs.core.PersistentVector.EMPTY
};
cljs.core.BlackNode;
cljs.core.RedNode = function(key, val, left, right, __hash) {
  this.key = key;
  this.val = val;
  this.left = left;
  this.right = right;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 32402207
};
cljs.core.RedNode.cljs$lang$type = true;
cljs.core.RedNode.cljs$lang$ctorPrSeq = function(this__2315__auto__) {
  return cljs.core.list.call(null, "cljs.core/RedNode")
};
cljs.core.RedNode.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__9291 = this;
  var h__2198__auto____9292 = this__9291.__hash;
  if(!(h__2198__auto____9292 == null)) {
    return h__2198__auto____9292
  }else {
    var h__2198__auto____9293 = cljs.core.hash_coll.call(null, coll);
    this__9291.__hash = h__2198__auto____9293;
    return h__2198__auto____9293
  }
};
cljs.core.RedNode.prototype.cljs$core$ILookup$_lookup$arity$2 = function(node, k) {
  var this__9294 = this;
  return node.cljs$core$IIndexed$_nth$arity$3(node, k, null)
};
cljs.core.RedNode.prototype.cljs$core$ILookup$_lookup$arity$3 = function(node, k, not_found) {
  var this__9295 = this;
  return node.cljs$core$IIndexed$_nth$arity$3(node, k, not_found)
};
cljs.core.RedNode.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(node, k, v) {
  var this__9296 = this;
  return cljs.core.assoc.call(null, cljs.core.PersistentVector.fromArray([this__9296.key, this__9296.val], true), k, v)
};
cljs.core.RedNode.prototype.call = function() {
  var G__9344 = null;
  var G__9344__2 = function(this_sym9297, k) {
    var this__9299 = this;
    var this_sym9297__9300 = this;
    var node__9301 = this_sym9297__9300;
    return node__9301.cljs$core$ILookup$_lookup$arity$2(node__9301, k)
  };
  var G__9344__3 = function(this_sym9298, k, not_found) {
    var this__9299 = this;
    var this_sym9298__9302 = this;
    var node__9303 = this_sym9298__9302;
    return node__9303.cljs$core$ILookup$_lookup$arity$3(node__9303, k, not_found)
  };
  G__9344 = function(this_sym9298, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__9344__2.call(this, this_sym9298, k);
      case 3:
        return G__9344__3.call(this, this_sym9298, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__9344
}();
cljs.core.RedNode.prototype.apply = function(this_sym9289, args9290) {
  var this__9304 = this;
  return this_sym9289.call.apply(this_sym9289, [this_sym9289].concat(args9290.slice()))
};
cljs.core.RedNode.prototype.cljs$core$ICollection$_conj$arity$2 = function(node, o) {
  var this__9305 = this;
  return cljs.core.PersistentVector.fromArray([this__9305.key, this__9305.val, o], true)
};
cljs.core.RedNode.prototype.cljs$core$IMapEntry$_key$arity$1 = function(node) {
  var this__9306 = this;
  return this__9306.key
};
cljs.core.RedNode.prototype.cljs$core$IMapEntry$_val$arity$1 = function(node) {
  var this__9307 = this;
  return this__9307.val
};
cljs.core.RedNode.prototype.add_right = function(ins) {
  var this__9308 = this;
  var node__9309 = this;
  return new cljs.core.RedNode(this__9308.key, this__9308.val, this__9308.left, ins, null)
};
cljs.core.RedNode.prototype.redden = function() {
  var this__9310 = this;
  var node__9311 = this;
  throw new Error("red-black tree invariant violation");
};
cljs.core.RedNode.prototype.remove_right = function(del) {
  var this__9312 = this;
  var node__9313 = this;
  return new cljs.core.RedNode(this__9312.key, this__9312.val, this__9312.left, del, null)
};
cljs.core.RedNode.prototype.replace = function(key, val, left, right) {
  var this__9314 = this;
  var node__9315 = this;
  return new cljs.core.RedNode(key, val, left, right, null)
};
cljs.core.RedNode.prototype.kv_reduce = function(f, init) {
  var this__9316 = this;
  var node__9317 = this;
  return cljs.core.tree_map_kv_reduce.call(null, node__9317, f, init)
};
cljs.core.RedNode.prototype.remove_left = function(del) {
  var this__9318 = this;
  var node__9319 = this;
  return new cljs.core.RedNode(this__9318.key, this__9318.val, del, this__9318.right, null)
};
cljs.core.RedNode.prototype.add_left = function(ins) {
  var this__9320 = this;
  var node__9321 = this;
  return new cljs.core.RedNode(this__9320.key, this__9320.val, ins, this__9320.right, null)
};
cljs.core.RedNode.prototype.balance_left = function(parent) {
  var this__9322 = this;
  var node__9323 = this;
  if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, this__9322.left)) {
    return new cljs.core.RedNode(this__9322.key, this__9322.val, this__9322.left.blacken(), new cljs.core.BlackNode(parent.key, parent.val, this__9322.right, parent.right, null), null)
  }else {
    if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, this__9322.right)) {
      return new cljs.core.RedNode(this__9322.right.key, this__9322.right.val, new cljs.core.BlackNode(this__9322.key, this__9322.val, this__9322.left, this__9322.right.left, null), new cljs.core.BlackNode(parent.key, parent.val, this__9322.right.right, parent.right, null), null)
    }else {
      if("\ufdd0'else") {
        return new cljs.core.BlackNode(parent.key, parent.val, node__9323, parent.right, null)
      }else {
        return null
      }
    }
  }
};
cljs.core.RedNode.prototype.toString = function() {
  var G__9345 = null;
  var G__9345__0 = function() {
    var this__9324 = this;
    var this__9326 = this;
    return cljs.core.pr_str.call(null, this__9326)
  };
  G__9345 = function() {
    switch(arguments.length) {
      case 0:
        return G__9345__0.call(this)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__9345
}();
cljs.core.RedNode.prototype.balance_right = function(parent) {
  var this__9327 = this;
  var node__9328 = this;
  if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, this__9327.right)) {
    return new cljs.core.RedNode(this__9327.key, this__9327.val, new cljs.core.BlackNode(parent.key, parent.val, parent.left, this__9327.left, null), this__9327.right.blacken(), null)
  }else {
    if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, this__9327.left)) {
      return new cljs.core.RedNode(this__9327.left.key, this__9327.left.val, new cljs.core.BlackNode(parent.key, parent.val, parent.left, this__9327.left.left, null), new cljs.core.BlackNode(this__9327.key, this__9327.val, this__9327.left.right, this__9327.right, null), null)
    }else {
      if("\ufdd0'else") {
        return new cljs.core.BlackNode(parent.key, parent.val, parent.left, node__9328, null)
      }else {
        return null
      }
    }
  }
};
cljs.core.RedNode.prototype.blacken = function() {
  var this__9329 = this;
  var node__9330 = this;
  return new cljs.core.BlackNode(this__9329.key, this__9329.val, this__9329.left, this__9329.right, null)
};
cljs.core.RedNode.prototype.cljs$core$IReduce$_reduce$arity$2 = function(node, f) {
  var this__9331 = this;
  return cljs.core.ci_reduce.call(null, node, f)
};
cljs.core.RedNode.prototype.cljs$core$IReduce$_reduce$arity$3 = function(node, f, start) {
  var this__9332 = this;
  return cljs.core.ci_reduce.call(null, node, f, start)
};
cljs.core.RedNode.prototype.cljs$core$ISeqable$_seq$arity$1 = function(node) {
  var this__9333 = this;
  return cljs.core.list.call(null, this__9333.key, this__9333.val)
};
cljs.core.RedNode.prototype.cljs$core$ICounted$_count$arity$1 = function(node) {
  var this__9334 = this;
  return 2
};
cljs.core.RedNode.prototype.cljs$core$IStack$_peek$arity$1 = function(node) {
  var this__9335 = this;
  return this__9335.val
};
cljs.core.RedNode.prototype.cljs$core$IStack$_pop$arity$1 = function(node) {
  var this__9336 = this;
  return cljs.core.PersistentVector.fromArray([this__9336.key], true)
};
cljs.core.RedNode.prototype.cljs$core$IVector$_assoc_n$arity$3 = function(node, n, v) {
  var this__9337 = this;
  return cljs.core._assoc_n.call(null, cljs.core.PersistentVector.fromArray([this__9337.key, this__9337.val], true), n, v)
};
cljs.core.RedNode.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__9338 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.RedNode.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(node, meta) {
  var this__9339 = this;
  return cljs.core.with_meta.call(null, cljs.core.PersistentVector.fromArray([this__9339.key, this__9339.val], true), meta)
};
cljs.core.RedNode.prototype.cljs$core$IMeta$_meta$arity$1 = function(node) {
  var this__9340 = this;
  return null
};
cljs.core.RedNode.prototype.cljs$core$IIndexed$_nth$arity$2 = function(node, n) {
  var this__9341 = this;
  if(n === 0) {
    return this__9341.key
  }else {
    if(n === 1) {
      return this__9341.val
    }else {
      if("\ufdd0'else") {
        return null
      }else {
        return null
      }
    }
  }
};
cljs.core.RedNode.prototype.cljs$core$IIndexed$_nth$arity$3 = function(node, n, not_found) {
  var this__9342 = this;
  if(n === 0) {
    return this__9342.key
  }else {
    if(n === 1) {
      return this__9342.val
    }else {
      if("\ufdd0'else") {
        return not_found
      }else {
        return null
      }
    }
  }
};
cljs.core.RedNode.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(node) {
  var this__9343 = this;
  return cljs.core.PersistentVector.EMPTY
};
cljs.core.RedNode;
cljs.core.tree_map_add = function tree_map_add(comp, tree, k, v, found) {
  if(tree == null) {
    return new cljs.core.RedNode(k, v, null, null, null)
  }else {
    var c__9349 = comp.call(null, k, tree.key);
    if(c__9349 === 0) {
      found[0] = tree;
      return null
    }else {
      if(c__9349 < 0) {
        var ins__9350 = tree_map_add.call(null, comp, tree.left, k, v, found);
        if(!(ins__9350 == null)) {
          return tree.add_left(ins__9350)
        }else {
          return null
        }
      }else {
        if("\ufdd0'else") {
          var ins__9351 = tree_map_add.call(null, comp, tree.right, k, v, found);
          if(!(ins__9351 == null)) {
            return tree.add_right(ins__9351)
          }else {
            return null
          }
        }else {
          return null
        }
      }
    }
  }
};
cljs.core.tree_map_append = function tree_map_append(left, right) {
  if(left == null) {
    return right
  }else {
    if(right == null) {
      return left
    }else {
      if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, left)) {
        if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, right)) {
          var app__9354 = tree_map_append.call(null, left.right, right.left);
          if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, app__9354)) {
            return new cljs.core.RedNode(app__9354.key, app__9354.val, new cljs.core.RedNode(left.key, left.val, left.left, app__9354.left, null), new cljs.core.RedNode(right.key, right.val, app__9354.right, right.right, null), null)
          }else {
            return new cljs.core.RedNode(left.key, left.val, left.left, new cljs.core.RedNode(right.key, right.val, app__9354, right.right, null), null)
          }
        }else {
          return new cljs.core.RedNode(left.key, left.val, left.left, tree_map_append.call(null, left.right, right), null)
        }
      }else {
        if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, right)) {
          return new cljs.core.RedNode(right.key, right.val, tree_map_append.call(null, left, right.left), right.right, null)
        }else {
          if("\ufdd0'else") {
            var app__9355 = tree_map_append.call(null, left.right, right.left);
            if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, app__9355)) {
              return new cljs.core.RedNode(app__9355.key, app__9355.val, new cljs.core.BlackNode(left.key, left.val, left.left, app__9355.left, null), new cljs.core.BlackNode(right.key, right.val, app__9355.right, right.right, null), null)
            }else {
              return cljs.core.balance_left_del.call(null, left.key, left.val, left.left, new cljs.core.BlackNode(right.key, right.val, app__9355, right.right, null))
            }
          }else {
            return null
          }
        }
      }
    }
  }
};
cljs.core.tree_map_remove = function tree_map_remove(comp, tree, k, found) {
  if(!(tree == null)) {
    var c__9361 = comp.call(null, k, tree.key);
    if(c__9361 === 0) {
      found[0] = tree;
      return cljs.core.tree_map_append.call(null, tree.left, tree.right)
    }else {
      if(c__9361 < 0) {
        var del__9362 = tree_map_remove.call(null, comp, tree.left, k, found);
        if(function() {
          var or__3824__auto____9363 = !(del__9362 == null);
          if(or__3824__auto____9363) {
            return or__3824__auto____9363
          }else {
            return!(found[0] == null)
          }
        }()) {
          if(cljs.core.instance_QMARK_.call(null, cljs.core.BlackNode, tree.left)) {
            return cljs.core.balance_left_del.call(null, tree.key, tree.val, del__9362, tree.right)
          }else {
            return new cljs.core.RedNode(tree.key, tree.val, del__9362, tree.right, null)
          }
        }else {
          return null
        }
      }else {
        if("\ufdd0'else") {
          var del__9364 = tree_map_remove.call(null, comp, tree.right, k, found);
          if(function() {
            var or__3824__auto____9365 = !(del__9364 == null);
            if(or__3824__auto____9365) {
              return or__3824__auto____9365
            }else {
              return!(found[0] == null)
            }
          }()) {
            if(cljs.core.instance_QMARK_.call(null, cljs.core.BlackNode, tree.right)) {
              return cljs.core.balance_right_del.call(null, tree.key, tree.val, tree.left, del__9364)
            }else {
              return new cljs.core.RedNode(tree.key, tree.val, tree.left, del__9364, null)
            }
          }else {
            return null
          }
        }else {
          return null
        }
      }
    }
  }else {
    return null
  }
};
cljs.core.tree_map_replace = function tree_map_replace(comp, tree, k, v) {
  var tk__9368 = tree.key;
  var c__9369 = comp.call(null, k, tk__9368);
  if(c__9369 === 0) {
    return tree.replace(tk__9368, v, tree.left, tree.right)
  }else {
    if(c__9369 < 0) {
      return tree.replace(tk__9368, tree.val, tree_map_replace.call(null, comp, tree.left, k, v), tree.right)
    }else {
      if("\ufdd0'else") {
        return tree.replace(tk__9368, tree.val, tree.left, tree_map_replace.call(null, comp, tree.right, k, v))
      }else {
        return null
      }
    }
  }
};
cljs.core.PersistentTreeMap = function(comp, tree, cnt, meta, __hash) {
  this.comp = comp;
  this.tree = tree;
  this.cnt = cnt;
  this.meta = meta;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 418776847
};
cljs.core.PersistentTreeMap.cljs$lang$type = true;
cljs.core.PersistentTreeMap.cljs$lang$ctorPrSeq = function(this__2315__auto__) {
  return cljs.core.list.call(null, "cljs.core/PersistentTreeMap")
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__9372 = this;
  var h__2198__auto____9373 = this__9372.__hash;
  if(!(h__2198__auto____9373 == null)) {
    return h__2198__auto____9373
  }else {
    var h__2198__auto____9374 = cljs.core.hash_imap.call(null, coll);
    this__9372.__hash = h__2198__auto____9374;
    return h__2198__auto____9374
  }
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(coll, k) {
  var this__9375 = this;
  return coll.cljs$core$ILookup$_lookup$arity$3(coll, k, null)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(coll, k, not_found) {
  var this__9376 = this;
  var n__9377 = coll.entry_at(k);
  if(!(n__9377 == null)) {
    return n__9377.val
  }else {
    return not_found
  }
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(coll, k, v) {
  var this__9378 = this;
  var found__9379 = [null];
  var t__9380 = cljs.core.tree_map_add.call(null, this__9378.comp, this__9378.tree, k, v, found__9379);
  if(t__9380 == null) {
    var found_node__9381 = cljs.core.nth.call(null, found__9379, 0);
    if(cljs.core._EQ_.call(null, v, found_node__9381.val)) {
      return coll
    }else {
      return new cljs.core.PersistentTreeMap(this__9378.comp, cljs.core.tree_map_replace.call(null, this__9378.comp, this__9378.tree, k, v), this__9378.cnt, this__9378.meta, null)
    }
  }else {
    return new cljs.core.PersistentTreeMap(this__9378.comp, t__9380.blacken(), this__9378.cnt + 1, this__9378.meta, null)
  }
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = function(coll, k) {
  var this__9382 = this;
  return!(coll.entry_at(k) == null)
};
cljs.core.PersistentTreeMap.prototype.call = function() {
  var G__9416 = null;
  var G__9416__2 = function(this_sym9383, k) {
    var this__9385 = this;
    var this_sym9383__9386 = this;
    var coll__9387 = this_sym9383__9386;
    return coll__9387.cljs$core$ILookup$_lookup$arity$2(coll__9387, k)
  };
  var G__9416__3 = function(this_sym9384, k, not_found) {
    var this__9385 = this;
    var this_sym9384__9388 = this;
    var coll__9389 = this_sym9384__9388;
    return coll__9389.cljs$core$ILookup$_lookup$arity$3(coll__9389, k, not_found)
  };
  G__9416 = function(this_sym9384, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__9416__2.call(this, this_sym9384, k);
      case 3:
        return G__9416__3.call(this, this_sym9384, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__9416
}();
cljs.core.PersistentTreeMap.prototype.apply = function(this_sym9370, args9371) {
  var this__9390 = this;
  return this_sym9370.call.apply(this_sym9370, [this_sym9370].concat(args9371.slice()))
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = function(coll, f, init) {
  var this__9391 = this;
  if(!(this__9391.tree == null)) {
    return cljs.core.tree_map_kv_reduce.call(null, this__9391.tree, f, init)
  }else {
    return init
  }
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, entry) {
  var this__9392 = this;
  if(cljs.core.vector_QMARK_.call(null, entry)) {
    return coll.cljs$core$IAssociative$_assoc$arity$3(coll, cljs.core._nth.call(null, entry, 0), cljs.core._nth.call(null, entry, 1))
  }else {
    return cljs.core.reduce.call(null, cljs.core._conj, coll, entry)
  }
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IReversible$_rseq$arity$1 = function(coll) {
  var this__9393 = this;
  if(this__9393.cnt > 0) {
    return cljs.core.create_tree_map_seq.call(null, this__9393.tree, false, this__9393.cnt)
  }else {
    return null
  }
};
cljs.core.PersistentTreeMap.prototype.toString = function() {
  var this__9394 = this;
  var this__9395 = this;
  return cljs.core.pr_str.call(null, this__9395)
};
cljs.core.PersistentTreeMap.prototype.entry_at = function(k) {
  var this__9396 = this;
  var coll__9397 = this;
  var t__9398 = this__9396.tree;
  while(true) {
    if(!(t__9398 == null)) {
      var c__9399 = this__9396.comp.call(null, k, t__9398.key);
      if(c__9399 === 0) {
        return t__9398
      }else {
        if(c__9399 < 0) {
          var G__9417 = t__9398.left;
          t__9398 = G__9417;
          continue
        }else {
          if("\ufdd0'else") {
            var G__9418 = t__9398.right;
            t__9398 = G__9418;
            continue
          }else {
            return null
          }
        }
      }
    }else {
      return null
    }
    break
  }
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ISorted$_sorted_seq$arity$2 = function(coll, ascending_QMARK_) {
  var this__9400 = this;
  if(this__9400.cnt > 0) {
    return cljs.core.create_tree_map_seq.call(null, this__9400.tree, ascending_QMARK_, this__9400.cnt)
  }else {
    return null
  }
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ISorted$_sorted_seq_from$arity$3 = function(coll, k, ascending_QMARK_) {
  var this__9401 = this;
  if(this__9401.cnt > 0) {
    var stack__9402 = null;
    var t__9403 = this__9401.tree;
    while(true) {
      if(!(t__9403 == null)) {
        var c__9404 = this__9401.comp.call(null, k, t__9403.key);
        if(c__9404 === 0) {
          return new cljs.core.PersistentTreeMapSeq(null, cljs.core.conj.call(null, stack__9402, t__9403), ascending_QMARK_, -1, null)
        }else {
          if(cljs.core.truth_(ascending_QMARK_)) {
            if(c__9404 < 0) {
              var G__9419 = cljs.core.conj.call(null, stack__9402, t__9403);
              var G__9420 = t__9403.left;
              stack__9402 = G__9419;
              t__9403 = G__9420;
              continue
            }else {
              var G__9421 = stack__9402;
              var G__9422 = t__9403.right;
              stack__9402 = G__9421;
              t__9403 = G__9422;
              continue
            }
          }else {
            if("\ufdd0'else") {
              if(c__9404 > 0) {
                var G__9423 = cljs.core.conj.call(null, stack__9402, t__9403);
                var G__9424 = t__9403.right;
                stack__9402 = G__9423;
                t__9403 = G__9424;
                continue
              }else {
                var G__9425 = stack__9402;
                var G__9426 = t__9403.left;
                stack__9402 = G__9425;
                t__9403 = G__9426;
                continue
              }
            }else {
              return null
            }
          }
        }
      }else {
        if(stack__9402 == null) {
          return new cljs.core.PersistentTreeMapSeq(null, stack__9402, ascending_QMARK_, -1, null)
        }else {
          return null
        }
      }
      break
    }
  }else {
    return null
  }
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ISorted$_entry_key$arity$2 = function(coll, entry) {
  var this__9405 = this;
  return cljs.core.key.call(null, entry)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ISorted$_comparator$arity$1 = function(coll) {
  var this__9406 = this;
  return this__9406.comp
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__9407 = this;
  if(this__9407.cnt > 0) {
    return cljs.core.create_tree_map_seq.call(null, this__9407.tree, true, this__9407.cnt)
  }else {
    return null
  }
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__9408 = this;
  return this__9408.cnt
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__9409 = this;
  return cljs.core.equiv_map.call(null, coll, other)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__9410 = this;
  return new cljs.core.PersistentTreeMap(this__9410.comp, this__9410.tree, this__9410.cnt, meta, this__9410.__hash)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__9411 = this;
  return this__9411.meta
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__9412 = this;
  return cljs.core.with_meta.call(null, cljs.core.PersistentTreeMap.EMPTY, this__9412.meta)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IMap$_dissoc$arity$2 = function(coll, k) {
  var this__9413 = this;
  var found__9414 = [null];
  var t__9415 = cljs.core.tree_map_remove.call(null, this__9413.comp, this__9413.tree, k, found__9414);
  if(t__9415 == null) {
    if(cljs.core.nth.call(null, found__9414, 0) == null) {
      return coll
    }else {
      return new cljs.core.PersistentTreeMap(this__9413.comp, null, 0, this__9413.meta, null)
    }
  }else {
    return new cljs.core.PersistentTreeMap(this__9413.comp, t__9415.blacken(), this__9413.cnt - 1, this__9413.meta, null)
  }
};
cljs.core.PersistentTreeMap;
cljs.core.PersistentTreeMap.EMPTY = new cljs.core.PersistentTreeMap(cljs.core.compare, null, 0, null, 0);
cljs.core.hash_map = function() {
  var hash_map__delegate = function(keyvals) {
    var in__9429 = cljs.core.seq.call(null, keyvals);
    var out__9430 = cljs.core.transient$.call(null, cljs.core.PersistentHashMap.EMPTY);
    while(true) {
      if(in__9429) {
        var G__9431 = cljs.core.nnext.call(null, in__9429);
        var G__9432 = cljs.core.assoc_BANG_.call(null, out__9430, cljs.core.first.call(null, in__9429), cljs.core.second.call(null, in__9429));
        in__9429 = G__9431;
        out__9430 = G__9432;
        continue
      }else {
        return cljs.core.persistent_BANG_.call(null, out__9430)
      }
      break
    }
  };
  var hash_map = function(var_args) {
    var keyvals = null;
    if(goog.isDef(var_args)) {
      keyvals = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return hash_map__delegate.call(this, keyvals)
  };
  hash_map.cljs$lang$maxFixedArity = 0;
  hash_map.cljs$lang$applyTo = function(arglist__9433) {
    var keyvals = cljs.core.seq(arglist__9433);
    return hash_map__delegate(keyvals)
  };
  hash_map.cljs$lang$arity$variadic = hash_map__delegate;
  return hash_map
}();
cljs.core.array_map = function() {
  var array_map__delegate = function(keyvals) {
    return new cljs.core.PersistentArrayMap(null, cljs.core.quot.call(null, cljs.core.count.call(null, keyvals), 2), cljs.core.apply.call(null, cljs.core.array, keyvals), null)
  };
  var array_map = function(var_args) {
    var keyvals = null;
    if(goog.isDef(var_args)) {
      keyvals = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return array_map__delegate.call(this, keyvals)
  };
  array_map.cljs$lang$maxFixedArity = 0;
  array_map.cljs$lang$applyTo = function(arglist__9434) {
    var keyvals = cljs.core.seq(arglist__9434);
    return array_map__delegate(keyvals)
  };
  array_map.cljs$lang$arity$variadic = array_map__delegate;
  return array_map
}();
cljs.core.obj_map = function() {
  var obj_map__delegate = function(keyvals) {
    var ks__9438 = [];
    var obj__9439 = {};
    var kvs__9440 = cljs.core.seq.call(null, keyvals);
    while(true) {
      if(kvs__9440) {
        ks__9438.push(cljs.core.first.call(null, kvs__9440));
        obj__9439[cljs.core.first.call(null, kvs__9440)] = cljs.core.second.call(null, kvs__9440);
        var G__9441 = cljs.core.nnext.call(null, kvs__9440);
        kvs__9440 = G__9441;
        continue
      }else {
        return cljs.core.ObjMap.fromObject.call(null, ks__9438, obj__9439)
      }
      break
    }
  };
  var obj_map = function(var_args) {
    var keyvals = null;
    if(goog.isDef(var_args)) {
      keyvals = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return obj_map__delegate.call(this, keyvals)
  };
  obj_map.cljs$lang$maxFixedArity = 0;
  obj_map.cljs$lang$applyTo = function(arglist__9442) {
    var keyvals = cljs.core.seq(arglist__9442);
    return obj_map__delegate(keyvals)
  };
  obj_map.cljs$lang$arity$variadic = obj_map__delegate;
  return obj_map
}();
cljs.core.sorted_map = function() {
  var sorted_map__delegate = function(keyvals) {
    var in__9445 = cljs.core.seq.call(null, keyvals);
    var out__9446 = cljs.core.PersistentTreeMap.EMPTY;
    while(true) {
      if(in__9445) {
        var G__9447 = cljs.core.nnext.call(null, in__9445);
        var G__9448 = cljs.core.assoc.call(null, out__9446, cljs.core.first.call(null, in__9445), cljs.core.second.call(null, in__9445));
        in__9445 = G__9447;
        out__9446 = G__9448;
        continue
      }else {
        return out__9446
      }
      break
    }
  };
  var sorted_map = function(var_args) {
    var keyvals = null;
    if(goog.isDef(var_args)) {
      keyvals = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return sorted_map__delegate.call(this, keyvals)
  };
  sorted_map.cljs$lang$maxFixedArity = 0;
  sorted_map.cljs$lang$applyTo = function(arglist__9449) {
    var keyvals = cljs.core.seq(arglist__9449);
    return sorted_map__delegate(keyvals)
  };
  sorted_map.cljs$lang$arity$variadic = sorted_map__delegate;
  return sorted_map
}();
cljs.core.sorted_map_by = function() {
  var sorted_map_by__delegate = function(comparator, keyvals) {
    var in__9452 = cljs.core.seq.call(null, keyvals);
    var out__9453 = new cljs.core.PersistentTreeMap(comparator, null, 0, null, 0);
    while(true) {
      if(in__9452) {
        var G__9454 = cljs.core.nnext.call(null, in__9452);
        var G__9455 = cljs.core.assoc.call(null, out__9453, cljs.core.first.call(null, in__9452), cljs.core.second.call(null, in__9452));
        in__9452 = G__9454;
        out__9453 = G__9455;
        continue
      }else {
        return out__9453
      }
      break
    }
  };
  var sorted_map_by = function(comparator, var_args) {
    var keyvals = null;
    if(goog.isDef(var_args)) {
      keyvals = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
    }
    return sorted_map_by__delegate.call(this, comparator, keyvals)
  };
  sorted_map_by.cljs$lang$maxFixedArity = 1;
  sorted_map_by.cljs$lang$applyTo = function(arglist__9456) {
    var comparator = cljs.core.first(arglist__9456);
    var keyvals = cljs.core.rest(arglist__9456);
    return sorted_map_by__delegate(comparator, keyvals)
  };
  sorted_map_by.cljs$lang$arity$variadic = sorted_map_by__delegate;
  return sorted_map_by
}();
cljs.core.keys = function keys(hash_map) {
  return cljs.core.seq.call(null, cljs.core.map.call(null, cljs.core.first, hash_map))
};
cljs.core.key = function key(map_entry) {
  return cljs.core._key.call(null, map_entry)
};
cljs.core.vals = function vals(hash_map) {
  return cljs.core.seq.call(null, cljs.core.map.call(null, cljs.core.second, hash_map))
};
cljs.core.val = function val(map_entry) {
  return cljs.core._val.call(null, map_entry)
};
cljs.core.merge = function() {
  var merge__delegate = function(maps) {
    if(cljs.core.truth_(cljs.core.some.call(null, cljs.core.identity, maps))) {
      return cljs.core.reduce.call(null, function(p1__9457_SHARP_, p2__9458_SHARP_) {
        return cljs.core.conj.call(null, function() {
          var or__3824__auto____9460 = p1__9457_SHARP_;
          if(cljs.core.truth_(or__3824__auto____9460)) {
            return or__3824__auto____9460
          }else {
            return cljs.core.ObjMap.EMPTY
          }
        }(), p2__9458_SHARP_)
      }, maps)
    }else {
      return null
    }
  };
  var merge = function(var_args) {
    var maps = null;
    if(goog.isDef(var_args)) {
      maps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return merge__delegate.call(this, maps)
  };
  merge.cljs$lang$maxFixedArity = 0;
  merge.cljs$lang$applyTo = function(arglist__9461) {
    var maps = cljs.core.seq(arglist__9461);
    return merge__delegate(maps)
  };
  merge.cljs$lang$arity$variadic = merge__delegate;
  return merge
}();
cljs.core.merge_with = function() {
  var merge_with__delegate = function(f, maps) {
    if(cljs.core.truth_(cljs.core.some.call(null, cljs.core.identity, maps))) {
      var merge_entry__9469 = function(m, e) {
        var k__9467 = cljs.core.first.call(null, e);
        var v__9468 = cljs.core.second.call(null, e);
        if(cljs.core.contains_QMARK_.call(null, m, k__9467)) {
          return cljs.core.assoc.call(null, m, k__9467, f.call(null, cljs.core._lookup.call(null, m, k__9467, null), v__9468))
        }else {
          return cljs.core.assoc.call(null, m, k__9467, v__9468)
        }
      };
      var merge2__9471 = function(m1, m2) {
        return cljs.core.reduce.call(null, merge_entry__9469, function() {
          var or__3824__auto____9470 = m1;
          if(cljs.core.truth_(or__3824__auto____9470)) {
            return or__3824__auto____9470
          }else {
            return cljs.core.ObjMap.EMPTY
          }
        }(), cljs.core.seq.call(null, m2))
      };
      return cljs.core.reduce.call(null, merge2__9471, maps)
    }else {
      return null
    }
  };
  var merge_with = function(f, var_args) {
    var maps = null;
    if(goog.isDef(var_args)) {
      maps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
    }
    return merge_with__delegate.call(this, f, maps)
  };
  merge_with.cljs$lang$maxFixedArity = 1;
  merge_with.cljs$lang$applyTo = function(arglist__9472) {
    var f = cljs.core.first(arglist__9472);
    var maps = cljs.core.rest(arglist__9472);
    return merge_with__delegate(f, maps)
  };
  merge_with.cljs$lang$arity$variadic = merge_with__delegate;
  return merge_with
}();
cljs.core.select_keys = function select_keys(map, keyseq) {
  var ret__9477 = cljs.core.ObjMap.EMPTY;
  var keys__9478 = cljs.core.seq.call(null, keyseq);
  while(true) {
    if(keys__9478) {
      var key__9479 = cljs.core.first.call(null, keys__9478);
      var entry__9480 = cljs.core._lookup.call(null, map, key__9479, "\ufdd0'cljs.core/not-found");
      var G__9481 = cljs.core.not_EQ_.call(null, entry__9480, "\ufdd0'cljs.core/not-found") ? cljs.core.assoc.call(null, ret__9477, key__9479, entry__9480) : ret__9477;
      var G__9482 = cljs.core.next.call(null, keys__9478);
      ret__9477 = G__9481;
      keys__9478 = G__9482;
      continue
    }else {
      return ret__9477
    }
    break
  }
};
cljs.core.PersistentHashSet = function(meta, hash_map, __hash) {
  this.meta = meta;
  this.hash_map = hash_map;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 1;
  this.cljs$lang$protocol_mask$partition0$ = 15077647
};
cljs.core.PersistentHashSet.cljs$lang$type = true;
cljs.core.PersistentHashSet.cljs$lang$ctorPrSeq = function(this__2315__auto__) {
  return cljs.core.list.call(null, "cljs.core/PersistentHashSet")
};
cljs.core.PersistentHashSet.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = function(coll) {
  var this__9486 = this;
  return new cljs.core.TransientHashSet(cljs.core.transient$.call(null, this__9486.hash_map))
};
cljs.core.PersistentHashSet.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__9487 = this;
  var h__2198__auto____9488 = this__9487.__hash;
  if(!(h__2198__auto____9488 == null)) {
    return h__2198__auto____9488
  }else {
    var h__2198__auto____9489 = cljs.core.hash_iset.call(null, coll);
    this__9487.__hash = h__2198__auto____9489;
    return h__2198__auto____9489
  }
};
cljs.core.PersistentHashSet.prototype.cljs$core$ILookup$_lookup$arity$2 = function(coll, v) {
  var this__9490 = this;
  return coll.cljs$core$ILookup$_lookup$arity$3(coll, v, null)
};
cljs.core.PersistentHashSet.prototype.cljs$core$ILookup$_lookup$arity$3 = function(coll, v, not_found) {
  var this__9491 = this;
  if(cljs.core.truth_(cljs.core._contains_key_QMARK_.call(null, this__9491.hash_map, v))) {
    return v
  }else {
    return not_found
  }
};
cljs.core.PersistentHashSet.prototype.call = function() {
  var G__9512 = null;
  var G__9512__2 = function(this_sym9492, k) {
    var this__9494 = this;
    var this_sym9492__9495 = this;
    var coll__9496 = this_sym9492__9495;
    return coll__9496.cljs$core$ILookup$_lookup$arity$2(coll__9496, k)
  };
  var G__9512__3 = function(this_sym9493, k, not_found) {
    var this__9494 = this;
    var this_sym9493__9497 = this;
    var coll__9498 = this_sym9493__9497;
    return coll__9498.cljs$core$ILookup$_lookup$arity$3(coll__9498, k, not_found)
  };
  G__9512 = function(this_sym9493, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__9512__2.call(this, this_sym9493, k);
      case 3:
        return G__9512__3.call(this, this_sym9493, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__9512
}();
cljs.core.PersistentHashSet.prototype.apply = function(this_sym9484, args9485) {
  var this__9499 = this;
  return this_sym9484.call.apply(this_sym9484, [this_sym9484].concat(args9485.slice()))
};
cljs.core.PersistentHashSet.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__9500 = this;
  return new cljs.core.PersistentHashSet(this__9500.meta, cljs.core.assoc.call(null, this__9500.hash_map, o, null), null)
};
cljs.core.PersistentHashSet.prototype.toString = function() {
  var this__9501 = this;
  var this__9502 = this;
  return cljs.core.pr_str.call(null, this__9502)
};
cljs.core.PersistentHashSet.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__9503 = this;
  return cljs.core.keys.call(null, this__9503.hash_map)
};
cljs.core.PersistentHashSet.prototype.cljs$core$ISet$_disjoin$arity$2 = function(coll, v) {
  var this__9504 = this;
  return new cljs.core.PersistentHashSet(this__9504.meta, cljs.core.dissoc.call(null, this__9504.hash_map, v), null)
};
cljs.core.PersistentHashSet.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__9505 = this;
  return cljs.core.count.call(null, cljs.core.seq.call(null, coll))
};
cljs.core.PersistentHashSet.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__9506 = this;
  var and__3822__auto____9507 = cljs.core.set_QMARK_.call(null, other);
  if(and__3822__auto____9507) {
    var and__3822__auto____9508 = cljs.core.count.call(null, coll) === cljs.core.count.call(null, other);
    if(and__3822__auto____9508) {
      return cljs.core.every_QMARK_.call(null, function(p1__9483_SHARP_) {
        return cljs.core.contains_QMARK_.call(null, coll, p1__9483_SHARP_)
      }, other)
    }else {
      return and__3822__auto____9508
    }
  }else {
    return and__3822__auto____9507
  }
};
cljs.core.PersistentHashSet.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__9509 = this;
  return new cljs.core.PersistentHashSet(meta, this__9509.hash_map, this__9509.__hash)
};
cljs.core.PersistentHashSet.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__9510 = this;
  return this__9510.meta
};
cljs.core.PersistentHashSet.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__9511 = this;
  return cljs.core.with_meta.call(null, cljs.core.PersistentHashSet.EMPTY, this__9511.meta)
};
cljs.core.PersistentHashSet;
cljs.core.PersistentHashSet.EMPTY = new cljs.core.PersistentHashSet(null, cljs.core.hash_map.call(null), 0);
cljs.core.PersistentHashSet.fromArray = function(items) {
  var len__9513 = cljs.core.count.call(null, items);
  var i__9514 = 0;
  var out__9515 = cljs.core.transient$.call(null, cljs.core.PersistentHashSet.EMPTY);
  while(true) {
    if(i__9514 < len__9513) {
      var G__9516 = i__9514 + 1;
      var G__9517 = cljs.core.conj_BANG_.call(null, out__9515, items[i__9514]);
      i__9514 = G__9516;
      out__9515 = G__9517;
      continue
    }else {
      return cljs.core.persistent_BANG_.call(null, out__9515)
    }
    break
  }
};
cljs.core.TransientHashSet = function(transient_map) {
  this.transient_map = transient_map;
  this.cljs$lang$protocol_mask$partition0$ = 259;
  this.cljs$lang$protocol_mask$partition1$ = 34
};
cljs.core.TransientHashSet.cljs$lang$type = true;
cljs.core.TransientHashSet.cljs$lang$ctorPrSeq = function(this__2315__auto__) {
  return cljs.core.list.call(null, "cljs.core/TransientHashSet")
};
cljs.core.TransientHashSet.prototype.call = function() {
  var G__9535 = null;
  var G__9535__2 = function(this_sym9521, k) {
    var this__9523 = this;
    var this_sym9521__9524 = this;
    var tcoll__9525 = this_sym9521__9524;
    if(cljs.core._lookup.call(null, this__9523.transient_map, k, cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel) {
      return null
    }else {
      return k
    }
  };
  var G__9535__3 = function(this_sym9522, k, not_found) {
    var this__9523 = this;
    var this_sym9522__9526 = this;
    var tcoll__9527 = this_sym9522__9526;
    if(cljs.core._lookup.call(null, this__9523.transient_map, k, cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel) {
      return not_found
    }else {
      return k
    }
  };
  G__9535 = function(this_sym9522, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__9535__2.call(this, this_sym9522, k);
      case 3:
        return G__9535__3.call(this, this_sym9522, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__9535
}();
cljs.core.TransientHashSet.prototype.apply = function(this_sym9519, args9520) {
  var this__9528 = this;
  return this_sym9519.call.apply(this_sym9519, [this_sym9519].concat(args9520.slice()))
};
cljs.core.TransientHashSet.prototype.cljs$core$ILookup$_lookup$arity$2 = function(tcoll, v) {
  var this__9529 = this;
  return tcoll.cljs$core$ILookup$_lookup$arity$3(tcoll, v, null)
};
cljs.core.TransientHashSet.prototype.cljs$core$ILookup$_lookup$arity$3 = function(tcoll, v, not_found) {
  var this__9530 = this;
  if(cljs.core._lookup.call(null, this__9530.transient_map, v, cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel) {
    return not_found
  }else {
    return v
  }
};
cljs.core.TransientHashSet.prototype.cljs$core$ICounted$_count$arity$1 = function(tcoll) {
  var this__9531 = this;
  return cljs.core.count.call(null, this__9531.transient_map)
};
cljs.core.TransientHashSet.prototype.cljs$core$ITransientSet$_disjoin_BANG_$arity$2 = function(tcoll, v) {
  var this__9532 = this;
  this__9532.transient_map = cljs.core.dissoc_BANG_.call(null, this__9532.transient_map, v);
  return tcoll
};
cljs.core.TransientHashSet.prototype.cljs$core$ITransientCollection$_conj_BANG_$arity$2 = function(tcoll, o) {
  var this__9533 = this;
  this__9533.transient_map = cljs.core.assoc_BANG_.call(null, this__9533.transient_map, o, null);
  return tcoll
};
cljs.core.TransientHashSet.prototype.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 = function(tcoll) {
  var this__9534 = this;
  return new cljs.core.PersistentHashSet(null, cljs.core.persistent_BANG_.call(null, this__9534.transient_map), null)
};
cljs.core.TransientHashSet;
cljs.core.PersistentTreeSet = function(meta, tree_map, __hash) {
  this.meta = meta;
  this.tree_map = tree_map;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 417730831
};
cljs.core.PersistentTreeSet.cljs$lang$type = true;
cljs.core.PersistentTreeSet.cljs$lang$ctorPrSeq = function(this__2315__auto__) {
  return cljs.core.list.call(null, "cljs.core/PersistentTreeSet")
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__9538 = this;
  var h__2198__auto____9539 = this__9538.__hash;
  if(!(h__2198__auto____9539 == null)) {
    return h__2198__auto____9539
  }else {
    var h__2198__auto____9540 = cljs.core.hash_iset.call(null, coll);
    this__9538.__hash = h__2198__auto____9540;
    return h__2198__auto____9540
  }
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ILookup$_lookup$arity$2 = function(coll, v) {
  var this__9541 = this;
  return coll.cljs$core$ILookup$_lookup$arity$3(coll, v, null)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ILookup$_lookup$arity$3 = function(coll, v, not_found) {
  var this__9542 = this;
  if(cljs.core.truth_(cljs.core._contains_key_QMARK_.call(null, this__9542.tree_map, v))) {
    return v
  }else {
    return not_found
  }
};
cljs.core.PersistentTreeSet.prototype.call = function() {
  var G__9568 = null;
  var G__9568__2 = function(this_sym9543, k) {
    var this__9545 = this;
    var this_sym9543__9546 = this;
    var coll__9547 = this_sym9543__9546;
    return coll__9547.cljs$core$ILookup$_lookup$arity$2(coll__9547, k)
  };
  var G__9568__3 = function(this_sym9544, k, not_found) {
    var this__9545 = this;
    var this_sym9544__9548 = this;
    var coll__9549 = this_sym9544__9548;
    return coll__9549.cljs$core$ILookup$_lookup$arity$3(coll__9549, k, not_found)
  };
  G__9568 = function(this_sym9544, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__9568__2.call(this, this_sym9544, k);
      case 3:
        return G__9568__3.call(this, this_sym9544, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__9568
}();
cljs.core.PersistentTreeSet.prototype.apply = function(this_sym9536, args9537) {
  var this__9550 = this;
  return this_sym9536.call.apply(this_sym9536, [this_sym9536].concat(args9537.slice()))
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__9551 = this;
  return new cljs.core.PersistentTreeSet(this__9551.meta, cljs.core.assoc.call(null, this__9551.tree_map, o, null), null)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IReversible$_rseq$arity$1 = function(coll) {
  var this__9552 = this;
  return cljs.core.map.call(null, cljs.core.key, cljs.core.rseq.call(null, this__9552.tree_map))
};
cljs.core.PersistentTreeSet.prototype.toString = function() {
  var this__9553 = this;
  var this__9554 = this;
  return cljs.core.pr_str.call(null, this__9554)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ISorted$_sorted_seq$arity$2 = function(coll, ascending_QMARK_) {
  var this__9555 = this;
  return cljs.core.map.call(null, cljs.core.key, cljs.core._sorted_seq.call(null, this__9555.tree_map, ascending_QMARK_))
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ISorted$_sorted_seq_from$arity$3 = function(coll, k, ascending_QMARK_) {
  var this__9556 = this;
  return cljs.core.map.call(null, cljs.core.key, cljs.core._sorted_seq_from.call(null, this__9556.tree_map, k, ascending_QMARK_))
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ISorted$_entry_key$arity$2 = function(coll, entry) {
  var this__9557 = this;
  return entry
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ISorted$_comparator$arity$1 = function(coll) {
  var this__9558 = this;
  return cljs.core._comparator.call(null, this__9558.tree_map)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__9559 = this;
  return cljs.core.keys.call(null, this__9559.tree_map)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ISet$_disjoin$arity$2 = function(coll, v) {
  var this__9560 = this;
  return new cljs.core.PersistentTreeSet(this__9560.meta, cljs.core.dissoc.call(null, this__9560.tree_map, v), null)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__9561 = this;
  return cljs.core.count.call(null, this__9561.tree_map)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__9562 = this;
  var and__3822__auto____9563 = cljs.core.set_QMARK_.call(null, other);
  if(and__3822__auto____9563) {
    var and__3822__auto____9564 = cljs.core.count.call(null, coll) === cljs.core.count.call(null, other);
    if(and__3822__auto____9564) {
      return cljs.core.every_QMARK_.call(null, function(p1__9518_SHARP_) {
        return cljs.core.contains_QMARK_.call(null, coll, p1__9518_SHARP_)
      }, other)
    }else {
      return and__3822__auto____9564
    }
  }else {
    return and__3822__auto____9563
  }
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__9565 = this;
  return new cljs.core.PersistentTreeSet(meta, this__9565.tree_map, this__9565.__hash)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__9566 = this;
  return this__9566.meta
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__9567 = this;
  return cljs.core.with_meta.call(null, cljs.core.PersistentTreeSet.EMPTY, this__9567.meta)
};
cljs.core.PersistentTreeSet;
cljs.core.PersistentTreeSet.EMPTY = new cljs.core.PersistentTreeSet(null, cljs.core.sorted_map.call(null), 0);
cljs.core.hash_set = function() {
  var hash_set = null;
  var hash_set__0 = function() {
    return cljs.core.PersistentHashSet.EMPTY
  };
  var hash_set__1 = function() {
    var G__9573__delegate = function(keys) {
      var in__9571 = cljs.core.seq.call(null, keys);
      var out__9572 = cljs.core.transient$.call(null, cljs.core.PersistentHashSet.EMPTY);
      while(true) {
        if(cljs.core.seq.call(null, in__9571)) {
          var G__9574 = cljs.core.next.call(null, in__9571);
          var G__9575 = cljs.core.conj_BANG_.call(null, out__9572, cljs.core.first.call(null, in__9571));
          in__9571 = G__9574;
          out__9572 = G__9575;
          continue
        }else {
          return cljs.core.persistent_BANG_.call(null, out__9572)
        }
        break
      }
    };
    var G__9573 = function(var_args) {
      var keys = null;
      if(goog.isDef(var_args)) {
        keys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
      }
      return G__9573__delegate.call(this, keys)
    };
    G__9573.cljs$lang$maxFixedArity = 0;
    G__9573.cljs$lang$applyTo = function(arglist__9576) {
      var keys = cljs.core.seq(arglist__9576);
      return G__9573__delegate(keys)
    };
    G__9573.cljs$lang$arity$variadic = G__9573__delegate;
    return G__9573
  }();
  hash_set = function(var_args) {
    var keys = var_args;
    switch(arguments.length) {
      case 0:
        return hash_set__0.call(this);
      default:
        return hash_set__1.cljs$lang$arity$variadic(cljs.core.array_seq(arguments, 0))
    }
    throw"Invalid arity: " + arguments.length;
  };
  hash_set.cljs$lang$maxFixedArity = 0;
  hash_set.cljs$lang$applyTo = hash_set__1.cljs$lang$applyTo;
  hash_set.cljs$lang$arity$0 = hash_set__0;
  hash_set.cljs$lang$arity$variadic = hash_set__1.cljs$lang$arity$variadic;
  return hash_set
}();
cljs.core.set = function set(coll) {
  return cljs.core.apply.call(null, cljs.core.hash_set, coll)
};
cljs.core.sorted_set = function() {
  var sorted_set__delegate = function(keys) {
    return cljs.core.reduce.call(null, cljs.core._conj, cljs.core.PersistentTreeSet.EMPTY, keys)
  };
  var sorted_set = function(var_args) {
    var keys = null;
    if(goog.isDef(var_args)) {
      keys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return sorted_set__delegate.call(this, keys)
  };
  sorted_set.cljs$lang$maxFixedArity = 0;
  sorted_set.cljs$lang$applyTo = function(arglist__9577) {
    var keys = cljs.core.seq(arglist__9577);
    return sorted_set__delegate(keys)
  };
  sorted_set.cljs$lang$arity$variadic = sorted_set__delegate;
  return sorted_set
}();
cljs.core.sorted_set_by = function() {
  var sorted_set_by__delegate = function(comparator, keys) {
    return cljs.core.reduce.call(null, cljs.core._conj, new cljs.core.PersistentTreeSet(null, cljs.core.sorted_map_by.call(null, comparator), 0), keys)
  };
  var sorted_set_by = function(comparator, var_args) {
    var keys = null;
    if(goog.isDef(var_args)) {
      keys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
    }
    return sorted_set_by__delegate.call(this, comparator, keys)
  };
  sorted_set_by.cljs$lang$maxFixedArity = 1;
  sorted_set_by.cljs$lang$applyTo = function(arglist__9579) {
    var comparator = cljs.core.first(arglist__9579);
    var keys = cljs.core.rest(arglist__9579);
    return sorted_set_by__delegate(comparator, keys)
  };
  sorted_set_by.cljs$lang$arity$variadic = sorted_set_by__delegate;
  return sorted_set_by
}();
cljs.core.replace = function replace(smap, coll) {
  if(cljs.core.vector_QMARK_.call(null, coll)) {
    var n__9585 = cljs.core.count.call(null, coll);
    return cljs.core.reduce.call(null, function(v, i) {
      var temp__3971__auto____9586 = cljs.core.find.call(null, smap, cljs.core.nth.call(null, v, i));
      if(cljs.core.truth_(temp__3971__auto____9586)) {
        var e__9587 = temp__3971__auto____9586;
        return cljs.core.assoc.call(null, v, i, cljs.core.second.call(null, e__9587))
      }else {
        return v
      }
    }, coll, cljs.core.take.call(null, n__9585, cljs.core.iterate.call(null, cljs.core.inc, 0)))
  }else {
    return cljs.core.map.call(null, function(p1__9578_SHARP_) {
      var temp__3971__auto____9588 = cljs.core.find.call(null, smap, p1__9578_SHARP_);
      if(cljs.core.truth_(temp__3971__auto____9588)) {
        var e__9589 = temp__3971__auto____9588;
        return cljs.core.second.call(null, e__9589)
      }else {
        return p1__9578_SHARP_
      }
    }, coll)
  }
};
cljs.core.distinct = function distinct(coll) {
  var step__9619 = function step(xs, seen) {
    return new cljs.core.LazySeq(null, false, function() {
      return function(p__9612, seen) {
        while(true) {
          var vec__9613__9614 = p__9612;
          var f__9615 = cljs.core.nth.call(null, vec__9613__9614, 0, null);
          var xs__9616 = vec__9613__9614;
          var temp__3974__auto____9617 = cljs.core.seq.call(null, xs__9616);
          if(temp__3974__auto____9617) {
            var s__9618 = temp__3974__auto____9617;
            if(cljs.core.contains_QMARK_.call(null, seen, f__9615)) {
              var G__9620 = cljs.core.rest.call(null, s__9618);
              var G__9621 = seen;
              p__9612 = G__9620;
              seen = G__9621;
              continue
            }else {
              return cljs.core.cons.call(null, f__9615, step.call(null, cljs.core.rest.call(null, s__9618), cljs.core.conj.call(null, seen, f__9615)))
            }
          }else {
            return null
          }
          break
        }
      }.call(null, xs, seen)
    }, null)
  };
  return step__9619.call(null, coll, cljs.core.PersistentHashSet.EMPTY)
};
cljs.core.butlast = function butlast(s) {
  var ret__9624 = cljs.core.PersistentVector.EMPTY;
  var s__9625 = s;
  while(true) {
    if(cljs.core.next.call(null, s__9625)) {
      var G__9626 = cljs.core.conj.call(null, ret__9624, cljs.core.first.call(null, s__9625));
      var G__9627 = cljs.core.next.call(null, s__9625);
      ret__9624 = G__9626;
      s__9625 = G__9627;
      continue
    }else {
      return cljs.core.seq.call(null, ret__9624)
    }
    break
  }
};
cljs.core.name = function name(x) {
  if(cljs.core.string_QMARK_.call(null, x)) {
    return x
  }else {
    if(function() {
      var or__3824__auto____9630 = cljs.core.keyword_QMARK_.call(null, x);
      if(or__3824__auto____9630) {
        return or__3824__auto____9630
      }else {
        return cljs.core.symbol_QMARK_.call(null, x)
      }
    }()) {
      var i__9631 = x.lastIndexOf("/");
      if(i__9631 < 0) {
        return cljs.core.subs.call(null, x, 2)
      }else {
        return cljs.core.subs.call(null, x, i__9631 + 1)
      }
    }else {
      if("\ufdd0'else") {
        throw new Error([cljs.core.str("Doesn't support name: "), cljs.core.str(x)].join(""));
      }else {
        return null
      }
    }
  }
};
cljs.core.namespace = function namespace(x) {
  if(function() {
    var or__3824__auto____9634 = cljs.core.keyword_QMARK_.call(null, x);
    if(or__3824__auto____9634) {
      return or__3824__auto____9634
    }else {
      return cljs.core.symbol_QMARK_.call(null, x)
    }
  }()) {
    var i__9635 = x.lastIndexOf("/");
    if(i__9635 > -1) {
      return cljs.core.subs.call(null, x, 2, i__9635)
    }else {
      return null
    }
  }else {
    throw new Error([cljs.core.str("Doesn't support namespace: "), cljs.core.str(x)].join(""));
  }
};
cljs.core.zipmap = function zipmap(keys, vals) {
  var map__9642 = cljs.core.ObjMap.EMPTY;
  var ks__9643 = cljs.core.seq.call(null, keys);
  var vs__9644 = cljs.core.seq.call(null, vals);
  while(true) {
    if(function() {
      var and__3822__auto____9645 = ks__9643;
      if(and__3822__auto____9645) {
        return vs__9644
      }else {
        return and__3822__auto____9645
      }
    }()) {
      var G__9646 = cljs.core.assoc.call(null, map__9642, cljs.core.first.call(null, ks__9643), cljs.core.first.call(null, vs__9644));
      var G__9647 = cljs.core.next.call(null, ks__9643);
      var G__9648 = cljs.core.next.call(null, vs__9644);
      map__9642 = G__9646;
      ks__9643 = G__9647;
      vs__9644 = G__9648;
      continue
    }else {
      return map__9642
    }
    break
  }
};
cljs.core.max_key = function() {
  var max_key = null;
  var max_key__2 = function(k, x) {
    return x
  };
  var max_key__3 = function(k, x, y) {
    if(k.call(null, x) > k.call(null, y)) {
      return x
    }else {
      return y
    }
  };
  var max_key__4 = function() {
    var G__9651__delegate = function(k, x, y, more) {
      return cljs.core.reduce.call(null, function(p1__9636_SHARP_, p2__9637_SHARP_) {
        return max_key.call(null, k, p1__9636_SHARP_, p2__9637_SHARP_)
      }, max_key.call(null, k, x, y), more)
    };
    var G__9651 = function(k, x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
      }
      return G__9651__delegate.call(this, k, x, y, more)
    };
    G__9651.cljs$lang$maxFixedArity = 3;
    G__9651.cljs$lang$applyTo = function(arglist__9652) {
      var k = cljs.core.first(arglist__9652);
      var x = cljs.core.first(cljs.core.next(arglist__9652));
      var y = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9652)));
      var more = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9652)));
      return G__9651__delegate(k, x, y, more)
    };
    G__9651.cljs$lang$arity$variadic = G__9651__delegate;
    return G__9651
  }();
  max_key = function(k, x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 2:
        return max_key__2.call(this, k, x);
      case 3:
        return max_key__3.call(this, k, x, y);
      default:
        return max_key__4.cljs$lang$arity$variadic(k, x, y, cljs.core.array_seq(arguments, 3))
    }
    throw"Invalid arity: " + arguments.length;
  };
  max_key.cljs$lang$maxFixedArity = 3;
  max_key.cljs$lang$applyTo = max_key__4.cljs$lang$applyTo;
  max_key.cljs$lang$arity$2 = max_key__2;
  max_key.cljs$lang$arity$3 = max_key__3;
  max_key.cljs$lang$arity$variadic = max_key__4.cljs$lang$arity$variadic;
  return max_key
}();
cljs.core.min_key = function() {
  var min_key = null;
  var min_key__2 = function(k, x) {
    return x
  };
  var min_key__3 = function(k, x, y) {
    if(k.call(null, x) < k.call(null, y)) {
      return x
    }else {
      return y
    }
  };
  var min_key__4 = function() {
    var G__9653__delegate = function(k, x, y, more) {
      return cljs.core.reduce.call(null, function(p1__9649_SHARP_, p2__9650_SHARP_) {
        return min_key.call(null, k, p1__9649_SHARP_, p2__9650_SHARP_)
      }, min_key.call(null, k, x, y), more)
    };
    var G__9653 = function(k, x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
      }
      return G__9653__delegate.call(this, k, x, y, more)
    };
    G__9653.cljs$lang$maxFixedArity = 3;
    G__9653.cljs$lang$applyTo = function(arglist__9654) {
      var k = cljs.core.first(arglist__9654);
      var x = cljs.core.first(cljs.core.next(arglist__9654));
      var y = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9654)));
      var more = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9654)));
      return G__9653__delegate(k, x, y, more)
    };
    G__9653.cljs$lang$arity$variadic = G__9653__delegate;
    return G__9653
  }();
  min_key = function(k, x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 2:
        return min_key__2.call(this, k, x);
      case 3:
        return min_key__3.call(this, k, x, y);
      default:
        return min_key__4.cljs$lang$arity$variadic(k, x, y, cljs.core.array_seq(arguments, 3))
    }
    throw"Invalid arity: " + arguments.length;
  };
  min_key.cljs$lang$maxFixedArity = 3;
  min_key.cljs$lang$applyTo = min_key__4.cljs$lang$applyTo;
  min_key.cljs$lang$arity$2 = min_key__2;
  min_key.cljs$lang$arity$3 = min_key__3;
  min_key.cljs$lang$arity$variadic = min_key__4.cljs$lang$arity$variadic;
  return min_key
}();
cljs.core.partition_all = function() {
  var partition_all = null;
  var partition_all__2 = function(n, coll) {
    return partition_all.call(null, n, n, coll)
  };
  var partition_all__3 = function(n, step, coll) {
    return new cljs.core.LazySeq(null, false, function() {
      var temp__3974__auto____9657 = cljs.core.seq.call(null, coll);
      if(temp__3974__auto____9657) {
        var s__9658 = temp__3974__auto____9657;
        return cljs.core.cons.call(null, cljs.core.take.call(null, n, s__9658), partition_all.call(null, n, step, cljs.core.drop.call(null, step, s__9658)))
      }else {
        return null
      }
    }, null)
  };
  partition_all = function(n, step, coll) {
    switch(arguments.length) {
      case 2:
        return partition_all__2.call(this, n, step);
      case 3:
        return partition_all__3.call(this, n, step, coll)
    }
    throw"Invalid arity: " + arguments.length;
  };
  partition_all.cljs$lang$arity$2 = partition_all__2;
  partition_all.cljs$lang$arity$3 = partition_all__3;
  return partition_all
}();
cljs.core.take_while = function take_while(pred, coll) {
  return new cljs.core.LazySeq(null, false, function() {
    var temp__3974__auto____9661 = cljs.core.seq.call(null, coll);
    if(temp__3974__auto____9661) {
      var s__9662 = temp__3974__auto____9661;
      if(cljs.core.truth_(pred.call(null, cljs.core.first.call(null, s__9662)))) {
        return cljs.core.cons.call(null, cljs.core.first.call(null, s__9662), take_while.call(null, pred, cljs.core.rest.call(null, s__9662)))
      }else {
        return null
      }
    }else {
      return null
    }
  }, null)
};
cljs.core.mk_bound_fn = function mk_bound_fn(sc, test, key) {
  return function(e) {
    var comp__9664 = cljs.core._comparator.call(null, sc);
    return test.call(null, comp__9664.call(null, cljs.core._entry_key.call(null, sc, e), key), 0)
  }
};
cljs.core.subseq = function() {
  var subseq = null;
  var subseq__3 = function(sc, test, key) {
    var include__9676 = cljs.core.mk_bound_fn.call(null, sc, test, key);
    if(cljs.core.truth_(cljs.core.PersistentHashSet.fromArray([cljs.core._GT_, cljs.core._GT__EQ_]).call(null, test))) {
      var temp__3974__auto____9677 = cljs.core._sorted_seq_from.call(null, sc, key, true);
      if(cljs.core.truth_(temp__3974__auto____9677)) {
        var vec__9678__9679 = temp__3974__auto____9677;
        var e__9680 = cljs.core.nth.call(null, vec__9678__9679, 0, null);
        var s__9681 = vec__9678__9679;
        if(cljs.core.truth_(include__9676.call(null, e__9680))) {
          return s__9681
        }else {
          return cljs.core.next.call(null, s__9681)
        }
      }else {
        return null
      }
    }else {
      return cljs.core.take_while.call(null, include__9676, cljs.core._sorted_seq.call(null, sc, true))
    }
  };
  var subseq__5 = function(sc, start_test, start_key, end_test, end_key) {
    var temp__3974__auto____9682 = cljs.core._sorted_seq_from.call(null, sc, start_key, true);
    if(cljs.core.truth_(temp__3974__auto____9682)) {
      var vec__9683__9684 = temp__3974__auto____9682;
      var e__9685 = cljs.core.nth.call(null, vec__9683__9684, 0, null);
      var s__9686 = vec__9683__9684;
      return cljs.core.take_while.call(null, cljs.core.mk_bound_fn.call(null, sc, end_test, end_key), cljs.core.truth_(cljs.core.mk_bound_fn.call(null, sc, start_test, start_key).call(null, e__9685)) ? s__9686 : cljs.core.next.call(null, s__9686))
    }else {
      return null
    }
  };
  subseq = function(sc, start_test, start_key, end_test, end_key) {
    switch(arguments.length) {
      case 3:
        return subseq__3.call(this, sc, start_test, start_key);
      case 5:
        return subseq__5.call(this, sc, start_test, start_key, end_test, end_key)
    }
    throw"Invalid arity: " + arguments.length;
  };
  subseq.cljs$lang$arity$3 = subseq__3;
  subseq.cljs$lang$arity$5 = subseq__5;
  return subseq
}();
cljs.core.rsubseq = function() {
  var rsubseq = null;
  var rsubseq__3 = function(sc, test, key) {
    var include__9698 = cljs.core.mk_bound_fn.call(null, sc, test, key);
    if(cljs.core.truth_(cljs.core.PersistentHashSet.fromArray([cljs.core._LT_, cljs.core._LT__EQ_]).call(null, test))) {
      var temp__3974__auto____9699 = cljs.core._sorted_seq_from.call(null, sc, key, false);
      if(cljs.core.truth_(temp__3974__auto____9699)) {
        var vec__9700__9701 = temp__3974__auto____9699;
        var e__9702 = cljs.core.nth.call(null, vec__9700__9701, 0, null);
        var s__9703 = vec__9700__9701;
        if(cljs.core.truth_(include__9698.call(null, e__9702))) {
          return s__9703
        }else {
          return cljs.core.next.call(null, s__9703)
        }
      }else {
        return null
      }
    }else {
      return cljs.core.take_while.call(null, include__9698, cljs.core._sorted_seq.call(null, sc, false))
    }
  };
  var rsubseq__5 = function(sc, start_test, start_key, end_test, end_key) {
    var temp__3974__auto____9704 = cljs.core._sorted_seq_from.call(null, sc, end_key, false);
    if(cljs.core.truth_(temp__3974__auto____9704)) {
      var vec__9705__9706 = temp__3974__auto____9704;
      var e__9707 = cljs.core.nth.call(null, vec__9705__9706, 0, null);
      var s__9708 = vec__9705__9706;
      return cljs.core.take_while.call(null, cljs.core.mk_bound_fn.call(null, sc, start_test, start_key), cljs.core.truth_(cljs.core.mk_bound_fn.call(null, sc, end_test, end_key).call(null, e__9707)) ? s__9708 : cljs.core.next.call(null, s__9708))
    }else {
      return null
    }
  };
  rsubseq = function(sc, start_test, start_key, end_test, end_key) {
    switch(arguments.length) {
      case 3:
        return rsubseq__3.call(this, sc, start_test, start_key);
      case 5:
        return rsubseq__5.call(this, sc, start_test, start_key, end_test, end_key)
    }
    throw"Invalid arity: " + arguments.length;
  };
  rsubseq.cljs$lang$arity$3 = rsubseq__3;
  rsubseq.cljs$lang$arity$5 = rsubseq__5;
  return rsubseq
}();
cljs.core.Range = function(meta, start, end, step, __hash) {
  this.meta = meta;
  this.start = start;
  this.end = end;
  this.step = step;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 32375006
};
cljs.core.Range.cljs$lang$type = true;
cljs.core.Range.cljs$lang$ctorPrSeq = function(this__2315__auto__) {
  return cljs.core.list.call(null, "cljs.core/Range")
};
cljs.core.Range.prototype.cljs$core$IHash$_hash$arity$1 = function(rng) {
  var this__9709 = this;
  var h__2198__auto____9710 = this__9709.__hash;
  if(!(h__2198__auto____9710 == null)) {
    return h__2198__auto____9710
  }else {
    var h__2198__auto____9711 = cljs.core.hash_coll.call(null, rng);
    this__9709.__hash = h__2198__auto____9711;
    return h__2198__auto____9711
  }
};
cljs.core.Range.prototype.cljs$core$INext$_next$arity$1 = function(rng) {
  var this__9712 = this;
  if(this__9712.step > 0) {
    if(this__9712.start + this__9712.step < this__9712.end) {
      return new cljs.core.Range(this__9712.meta, this__9712.start + this__9712.step, this__9712.end, this__9712.step, null)
    }else {
      return null
    }
  }else {
    if(this__9712.start + this__9712.step > this__9712.end) {
      return new cljs.core.Range(this__9712.meta, this__9712.start + this__9712.step, this__9712.end, this__9712.step, null)
    }else {
      return null
    }
  }
};
cljs.core.Range.prototype.cljs$core$ICollection$_conj$arity$2 = function(rng, o) {
  var this__9713 = this;
  return cljs.core.cons.call(null, o, rng)
};
cljs.core.Range.prototype.toString = function() {
  var this__9714 = this;
  var this__9715 = this;
  return cljs.core.pr_str.call(null, this__9715)
};
cljs.core.Range.prototype.cljs$core$IReduce$_reduce$arity$2 = function(rng, f) {
  var this__9716 = this;
  return cljs.core.ci_reduce.call(null, rng, f)
};
cljs.core.Range.prototype.cljs$core$IReduce$_reduce$arity$3 = function(rng, f, s) {
  var this__9717 = this;
  return cljs.core.ci_reduce.call(null, rng, f, s)
};
cljs.core.Range.prototype.cljs$core$ISeqable$_seq$arity$1 = function(rng) {
  var this__9718 = this;
  if(this__9718.step > 0) {
    if(this__9718.start < this__9718.end) {
      return rng
    }else {
      return null
    }
  }else {
    if(this__9718.start > this__9718.end) {
      return rng
    }else {
      return null
    }
  }
};
cljs.core.Range.prototype.cljs$core$ICounted$_count$arity$1 = function(rng) {
  var this__9719 = this;
  if(cljs.core.not.call(null, rng.cljs$core$ISeqable$_seq$arity$1(rng))) {
    return 0
  }else {
    return Math.ceil((this__9719.end - this__9719.start) / this__9719.step)
  }
};
cljs.core.Range.prototype.cljs$core$ISeq$_first$arity$1 = function(rng) {
  var this__9720 = this;
  return this__9720.start
};
cljs.core.Range.prototype.cljs$core$ISeq$_rest$arity$1 = function(rng) {
  var this__9721 = this;
  if(!(rng.cljs$core$ISeqable$_seq$arity$1(rng) == null)) {
    return new cljs.core.Range(this__9721.meta, this__9721.start + this__9721.step, this__9721.end, this__9721.step, null)
  }else {
    return cljs.core.List.EMPTY
  }
};
cljs.core.Range.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(rng, other) {
  var this__9722 = this;
  return cljs.core.equiv_sequential.call(null, rng, other)
};
cljs.core.Range.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(rng, meta) {
  var this__9723 = this;
  return new cljs.core.Range(meta, this__9723.start, this__9723.end, this__9723.step, this__9723.__hash)
};
cljs.core.Range.prototype.cljs$core$IMeta$_meta$arity$1 = function(rng) {
  var this__9724 = this;
  return this__9724.meta
};
cljs.core.Range.prototype.cljs$core$IIndexed$_nth$arity$2 = function(rng, n) {
  var this__9725 = this;
  if(n < rng.cljs$core$ICounted$_count$arity$1(rng)) {
    return this__9725.start + n * this__9725.step
  }else {
    if(function() {
      var and__3822__auto____9726 = this__9725.start > this__9725.end;
      if(and__3822__auto____9726) {
        return this__9725.step === 0
      }else {
        return and__3822__auto____9726
      }
    }()) {
      return this__9725.start
    }else {
      throw new Error("Index out of bounds");
    }
  }
};
cljs.core.Range.prototype.cljs$core$IIndexed$_nth$arity$3 = function(rng, n, not_found) {
  var this__9727 = this;
  if(n < rng.cljs$core$ICounted$_count$arity$1(rng)) {
    return this__9727.start + n * this__9727.step
  }else {
    if(function() {
      var and__3822__auto____9728 = this__9727.start > this__9727.end;
      if(and__3822__auto____9728) {
        return this__9727.step === 0
      }else {
        return and__3822__auto____9728
      }
    }()) {
      return this__9727.start
    }else {
      return not_found
    }
  }
};
cljs.core.Range.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(rng) {
  var this__9729 = this;
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this__9729.meta)
};
cljs.core.Range;
cljs.core.range = function() {
  var range = null;
  var range__0 = function() {
    return range.call(null, 0, Number.MAX_VALUE, 1)
  };
  var range__1 = function(end) {
    return range.call(null, 0, end, 1)
  };
  var range__2 = function(start, end) {
    return range.call(null, start, end, 1)
  };
  var range__3 = function(start, end, step) {
    return new cljs.core.Range(null, start, end, step, null)
  };
  range = function(start, end, step) {
    switch(arguments.length) {
      case 0:
        return range__0.call(this);
      case 1:
        return range__1.call(this, start);
      case 2:
        return range__2.call(this, start, end);
      case 3:
        return range__3.call(this, start, end, step)
    }
    throw"Invalid arity: " + arguments.length;
  };
  range.cljs$lang$arity$0 = range__0;
  range.cljs$lang$arity$1 = range__1;
  range.cljs$lang$arity$2 = range__2;
  range.cljs$lang$arity$3 = range__3;
  return range
}();
cljs.core.take_nth = function take_nth(n, coll) {
  return new cljs.core.LazySeq(null, false, function() {
    var temp__3974__auto____9732 = cljs.core.seq.call(null, coll);
    if(temp__3974__auto____9732) {
      var s__9733 = temp__3974__auto____9732;
      return cljs.core.cons.call(null, cljs.core.first.call(null, s__9733), take_nth.call(null, n, cljs.core.drop.call(null, n, s__9733)))
    }else {
      return null
    }
  }, null)
};
cljs.core.split_with = function split_with(pred, coll) {
  return cljs.core.PersistentVector.fromArray([cljs.core.take_while.call(null, pred, coll), cljs.core.drop_while.call(null, pred, coll)], true)
};
cljs.core.partition_by = function partition_by(f, coll) {
  return new cljs.core.LazySeq(null, false, function() {
    var temp__3974__auto____9740 = cljs.core.seq.call(null, coll);
    if(temp__3974__auto____9740) {
      var s__9741 = temp__3974__auto____9740;
      var fst__9742 = cljs.core.first.call(null, s__9741);
      var fv__9743 = f.call(null, fst__9742);
      var run__9744 = cljs.core.cons.call(null, fst__9742, cljs.core.take_while.call(null, function(p1__9734_SHARP_) {
        return cljs.core._EQ_.call(null, fv__9743, f.call(null, p1__9734_SHARP_))
      }, cljs.core.next.call(null, s__9741)));
      return cljs.core.cons.call(null, run__9744, partition_by.call(null, f, cljs.core.seq.call(null, cljs.core.drop.call(null, cljs.core.count.call(null, run__9744), s__9741))))
    }else {
      return null
    }
  }, null)
};
cljs.core.frequencies = function frequencies(coll) {
  return cljs.core.persistent_BANG_.call(null, cljs.core.reduce.call(null, function(counts, x) {
    return cljs.core.assoc_BANG_.call(null, counts, x, cljs.core._lookup.call(null, counts, x, 0) + 1)
  }, cljs.core.transient$.call(null, cljs.core.ObjMap.EMPTY), coll))
};
cljs.core.reductions = function() {
  var reductions = null;
  var reductions__2 = function(f, coll) {
    return new cljs.core.LazySeq(null, false, function() {
      var temp__3971__auto____9759 = cljs.core.seq.call(null, coll);
      if(temp__3971__auto____9759) {
        var s__9760 = temp__3971__auto____9759;
        return reductions.call(null, f, cljs.core.first.call(null, s__9760), cljs.core.rest.call(null, s__9760))
      }else {
        return cljs.core.list.call(null, f.call(null))
      }
    }, null)
  };
  var reductions__3 = function(f, init, coll) {
    return cljs.core.cons.call(null, init, new cljs.core.LazySeq(null, false, function() {
      var temp__3974__auto____9761 = cljs.core.seq.call(null, coll);
      if(temp__3974__auto____9761) {
        var s__9762 = temp__3974__auto____9761;
        return reductions.call(null, f, f.call(null, init, cljs.core.first.call(null, s__9762)), cljs.core.rest.call(null, s__9762))
      }else {
        return null
      }
    }, null))
  };
  reductions = function(f, init, coll) {
    switch(arguments.length) {
      case 2:
        return reductions__2.call(this, f, init);
      case 3:
        return reductions__3.call(this, f, init, coll)
    }
    throw"Invalid arity: " + arguments.length;
  };
  reductions.cljs$lang$arity$2 = reductions__2;
  reductions.cljs$lang$arity$3 = reductions__3;
  return reductions
}();
cljs.core.juxt = function() {
  var juxt = null;
  var juxt__1 = function(f) {
    return function() {
      var G__9765 = null;
      var G__9765__0 = function() {
        return cljs.core.vector.call(null, f.call(null))
      };
      var G__9765__1 = function(x) {
        return cljs.core.vector.call(null, f.call(null, x))
      };
      var G__9765__2 = function(x, y) {
        return cljs.core.vector.call(null, f.call(null, x, y))
      };
      var G__9765__3 = function(x, y, z) {
        return cljs.core.vector.call(null, f.call(null, x, y, z))
      };
      var G__9765__4 = function() {
        var G__9766__delegate = function(x, y, z, args) {
          return cljs.core.vector.call(null, cljs.core.apply.call(null, f, x, y, z, args))
        };
        var G__9766 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__9766__delegate.call(this, x, y, z, args)
        };
        G__9766.cljs$lang$maxFixedArity = 3;
        G__9766.cljs$lang$applyTo = function(arglist__9767) {
          var x = cljs.core.first(arglist__9767);
          var y = cljs.core.first(cljs.core.next(arglist__9767));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9767)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9767)));
          return G__9766__delegate(x, y, z, args)
        };
        G__9766.cljs$lang$arity$variadic = G__9766__delegate;
        return G__9766
      }();
      G__9765 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return G__9765__0.call(this);
          case 1:
            return G__9765__1.call(this, x);
          case 2:
            return G__9765__2.call(this, x, y);
          case 3:
            return G__9765__3.call(this, x, y, z);
          default:
            return G__9765__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
        }
        throw"Invalid arity: " + arguments.length;
      };
      G__9765.cljs$lang$maxFixedArity = 3;
      G__9765.cljs$lang$applyTo = G__9765__4.cljs$lang$applyTo;
      return G__9765
    }()
  };
  var juxt__2 = function(f, g) {
    return function() {
      var G__9768 = null;
      var G__9768__0 = function() {
        return cljs.core.vector.call(null, f.call(null), g.call(null))
      };
      var G__9768__1 = function(x) {
        return cljs.core.vector.call(null, f.call(null, x), g.call(null, x))
      };
      var G__9768__2 = function(x, y) {
        return cljs.core.vector.call(null, f.call(null, x, y), g.call(null, x, y))
      };
      var G__9768__3 = function(x, y, z) {
        return cljs.core.vector.call(null, f.call(null, x, y, z), g.call(null, x, y, z))
      };
      var G__9768__4 = function() {
        var G__9769__delegate = function(x, y, z, args) {
          return cljs.core.vector.call(null, cljs.core.apply.call(null, f, x, y, z, args), cljs.core.apply.call(null, g, x, y, z, args))
        };
        var G__9769 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__9769__delegate.call(this, x, y, z, args)
        };
        G__9769.cljs$lang$maxFixedArity = 3;
        G__9769.cljs$lang$applyTo = function(arglist__9770) {
          var x = cljs.core.first(arglist__9770);
          var y = cljs.core.first(cljs.core.next(arglist__9770));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9770)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9770)));
          return G__9769__delegate(x, y, z, args)
        };
        G__9769.cljs$lang$arity$variadic = G__9769__delegate;
        return G__9769
      }();
      G__9768 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return G__9768__0.call(this);
          case 1:
            return G__9768__1.call(this, x);
          case 2:
            return G__9768__2.call(this, x, y);
          case 3:
            return G__9768__3.call(this, x, y, z);
          default:
            return G__9768__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
        }
        throw"Invalid arity: " + arguments.length;
      };
      G__9768.cljs$lang$maxFixedArity = 3;
      G__9768.cljs$lang$applyTo = G__9768__4.cljs$lang$applyTo;
      return G__9768
    }()
  };
  var juxt__3 = function(f, g, h) {
    return function() {
      var G__9771 = null;
      var G__9771__0 = function() {
        return cljs.core.vector.call(null, f.call(null), g.call(null), h.call(null))
      };
      var G__9771__1 = function(x) {
        return cljs.core.vector.call(null, f.call(null, x), g.call(null, x), h.call(null, x))
      };
      var G__9771__2 = function(x, y) {
        return cljs.core.vector.call(null, f.call(null, x, y), g.call(null, x, y), h.call(null, x, y))
      };
      var G__9771__3 = function(x, y, z) {
        return cljs.core.vector.call(null, f.call(null, x, y, z), g.call(null, x, y, z), h.call(null, x, y, z))
      };
      var G__9771__4 = function() {
        var G__9772__delegate = function(x, y, z, args) {
          return cljs.core.vector.call(null, cljs.core.apply.call(null, f, x, y, z, args), cljs.core.apply.call(null, g, x, y, z, args), cljs.core.apply.call(null, h, x, y, z, args))
        };
        var G__9772 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__9772__delegate.call(this, x, y, z, args)
        };
        G__9772.cljs$lang$maxFixedArity = 3;
        G__9772.cljs$lang$applyTo = function(arglist__9773) {
          var x = cljs.core.first(arglist__9773);
          var y = cljs.core.first(cljs.core.next(arglist__9773));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9773)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9773)));
          return G__9772__delegate(x, y, z, args)
        };
        G__9772.cljs$lang$arity$variadic = G__9772__delegate;
        return G__9772
      }();
      G__9771 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return G__9771__0.call(this);
          case 1:
            return G__9771__1.call(this, x);
          case 2:
            return G__9771__2.call(this, x, y);
          case 3:
            return G__9771__3.call(this, x, y, z);
          default:
            return G__9771__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
        }
        throw"Invalid arity: " + arguments.length;
      };
      G__9771.cljs$lang$maxFixedArity = 3;
      G__9771.cljs$lang$applyTo = G__9771__4.cljs$lang$applyTo;
      return G__9771
    }()
  };
  var juxt__4 = function() {
    var G__9774__delegate = function(f, g, h, fs) {
      var fs__9764 = cljs.core.list_STAR_.call(null, f, g, h, fs);
      return function() {
        var G__9775 = null;
        var G__9775__0 = function() {
          return cljs.core.reduce.call(null, function(p1__9745_SHARP_, p2__9746_SHARP_) {
            return cljs.core.conj.call(null, p1__9745_SHARP_, p2__9746_SHARP_.call(null))
          }, cljs.core.PersistentVector.EMPTY, fs__9764)
        };
        var G__9775__1 = function(x) {
          return cljs.core.reduce.call(null, function(p1__9747_SHARP_, p2__9748_SHARP_) {
            return cljs.core.conj.call(null, p1__9747_SHARP_, p2__9748_SHARP_.call(null, x))
          }, cljs.core.PersistentVector.EMPTY, fs__9764)
        };
        var G__9775__2 = function(x, y) {
          return cljs.core.reduce.call(null, function(p1__9749_SHARP_, p2__9750_SHARP_) {
            return cljs.core.conj.call(null, p1__9749_SHARP_, p2__9750_SHARP_.call(null, x, y))
          }, cljs.core.PersistentVector.EMPTY, fs__9764)
        };
        var G__9775__3 = function(x, y, z) {
          return cljs.core.reduce.call(null, function(p1__9751_SHARP_, p2__9752_SHARP_) {
            return cljs.core.conj.call(null, p1__9751_SHARP_, p2__9752_SHARP_.call(null, x, y, z))
          }, cljs.core.PersistentVector.EMPTY, fs__9764)
        };
        var G__9775__4 = function() {
          var G__9776__delegate = function(x, y, z, args) {
            return cljs.core.reduce.call(null, function(p1__9753_SHARP_, p2__9754_SHARP_) {
              return cljs.core.conj.call(null, p1__9753_SHARP_, cljs.core.apply.call(null, p2__9754_SHARP_, x, y, z, args))
            }, cljs.core.PersistentVector.EMPTY, fs__9764)
          };
          var G__9776 = function(x, y, z, var_args) {
            var args = null;
            if(goog.isDef(var_args)) {
              args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
            }
            return G__9776__delegate.call(this, x, y, z, args)
          };
          G__9776.cljs$lang$maxFixedArity = 3;
          G__9776.cljs$lang$applyTo = function(arglist__9777) {
            var x = cljs.core.first(arglist__9777);
            var y = cljs.core.first(cljs.core.next(arglist__9777));
            var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9777)));
            var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9777)));
            return G__9776__delegate(x, y, z, args)
          };
          G__9776.cljs$lang$arity$variadic = G__9776__delegate;
          return G__9776
        }();
        G__9775 = function(x, y, z, var_args) {
          var args = var_args;
          switch(arguments.length) {
            case 0:
              return G__9775__0.call(this);
            case 1:
              return G__9775__1.call(this, x);
            case 2:
              return G__9775__2.call(this, x, y);
            case 3:
              return G__9775__3.call(this, x, y, z);
            default:
              return G__9775__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
          }
          throw"Invalid arity: " + arguments.length;
        };
        G__9775.cljs$lang$maxFixedArity = 3;
        G__9775.cljs$lang$applyTo = G__9775__4.cljs$lang$applyTo;
        return G__9775
      }()
    };
    var G__9774 = function(f, g, h, var_args) {
      var fs = null;
      if(goog.isDef(var_args)) {
        fs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
      }
      return G__9774__delegate.call(this, f, g, h, fs)
    };
    G__9774.cljs$lang$maxFixedArity = 3;
    G__9774.cljs$lang$applyTo = function(arglist__9778) {
      var f = cljs.core.first(arglist__9778);
      var g = cljs.core.first(cljs.core.next(arglist__9778));
      var h = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9778)));
      var fs = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9778)));
      return G__9774__delegate(f, g, h, fs)
    };
    G__9774.cljs$lang$arity$variadic = G__9774__delegate;
    return G__9774
  }();
  juxt = function(f, g, h, var_args) {
    var fs = var_args;
    switch(arguments.length) {
      case 1:
        return juxt__1.call(this, f);
      case 2:
        return juxt__2.call(this, f, g);
      case 3:
        return juxt__3.call(this, f, g, h);
      default:
        return juxt__4.cljs$lang$arity$variadic(f, g, h, cljs.core.array_seq(arguments, 3))
    }
    throw"Invalid arity: " + arguments.length;
  };
  juxt.cljs$lang$maxFixedArity = 3;
  juxt.cljs$lang$applyTo = juxt__4.cljs$lang$applyTo;
  juxt.cljs$lang$arity$1 = juxt__1;
  juxt.cljs$lang$arity$2 = juxt__2;
  juxt.cljs$lang$arity$3 = juxt__3;
  juxt.cljs$lang$arity$variadic = juxt__4.cljs$lang$arity$variadic;
  return juxt
}();
cljs.core.dorun = function() {
  var dorun = null;
  var dorun__1 = function(coll) {
    while(true) {
      if(cljs.core.seq.call(null, coll)) {
        var G__9781 = cljs.core.next.call(null, coll);
        coll = G__9781;
        continue
      }else {
        return null
      }
      break
    }
  };
  var dorun__2 = function(n, coll) {
    while(true) {
      if(cljs.core.truth_(function() {
        var and__3822__auto____9780 = cljs.core.seq.call(null, coll);
        if(and__3822__auto____9780) {
          return n > 0
        }else {
          return and__3822__auto____9780
        }
      }())) {
        var G__9782 = n - 1;
        var G__9783 = cljs.core.next.call(null, coll);
        n = G__9782;
        coll = G__9783;
        continue
      }else {
        return null
      }
      break
    }
  };
  dorun = function(n, coll) {
    switch(arguments.length) {
      case 1:
        return dorun__1.call(this, n);
      case 2:
        return dorun__2.call(this, n, coll)
    }
    throw"Invalid arity: " + arguments.length;
  };
  dorun.cljs$lang$arity$1 = dorun__1;
  dorun.cljs$lang$arity$2 = dorun__2;
  return dorun
}();
cljs.core.doall = function() {
  var doall = null;
  var doall__1 = function(coll) {
    cljs.core.dorun.call(null, coll);
    return coll
  };
  var doall__2 = function(n, coll) {
    cljs.core.dorun.call(null, n, coll);
    return coll
  };
  doall = function(n, coll) {
    switch(arguments.length) {
      case 1:
        return doall__1.call(this, n);
      case 2:
        return doall__2.call(this, n, coll)
    }
    throw"Invalid arity: " + arguments.length;
  };
  doall.cljs$lang$arity$1 = doall__1;
  doall.cljs$lang$arity$2 = doall__2;
  return doall
}();
cljs.core.regexp_QMARK_ = function regexp_QMARK_(o) {
  return o instanceof RegExp
};
cljs.core.re_matches = function re_matches(re, s) {
  var matches__9785 = re.exec(s);
  if(cljs.core._EQ_.call(null, cljs.core.first.call(null, matches__9785), s)) {
    if(cljs.core.count.call(null, matches__9785) === 1) {
      return cljs.core.first.call(null, matches__9785)
    }else {
      return cljs.core.vec.call(null, matches__9785)
    }
  }else {
    return null
  }
};
cljs.core.re_find = function re_find(re, s) {
  var matches__9787 = re.exec(s);
  if(matches__9787 == null) {
    return null
  }else {
    if(cljs.core.count.call(null, matches__9787) === 1) {
      return cljs.core.first.call(null, matches__9787)
    }else {
      return cljs.core.vec.call(null, matches__9787)
    }
  }
};
cljs.core.re_seq = function re_seq(re, s) {
  var match_data__9792 = cljs.core.re_find.call(null, re, s);
  var match_idx__9793 = s.search(re);
  var match_str__9794 = cljs.core.coll_QMARK_.call(null, match_data__9792) ? cljs.core.first.call(null, match_data__9792) : match_data__9792;
  var post_match__9795 = cljs.core.subs.call(null, s, match_idx__9793 + cljs.core.count.call(null, match_str__9794));
  if(cljs.core.truth_(match_data__9792)) {
    return new cljs.core.LazySeq(null, false, function() {
      return cljs.core.cons.call(null, match_data__9792, re_seq.call(null, re, post_match__9795))
    }, null)
  }else {
    return null
  }
};
cljs.core.re_pattern = function re_pattern(s) {
  var vec__9802__9803 = cljs.core.re_find.call(null, /^(?:\(\?([idmsux]*)\))?(.*)/, s);
  var ___9804 = cljs.core.nth.call(null, vec__9802__9803, 0, null);
  var flags__9805 = cljs.core.nth.call(null, vec__9802__9803, 1, null);
  var pattern__9806 = cljs.core.nth.call(null, vec__9802__9803, 2, null);
  return new RegExp(pattern__9806, flags__9805)
};
cljs.core.pr_sequential = function pr_sequential(print_one, begin, sep, end, opts, coll) {
  return cljs.core.concat.call(null, cljs.core.PersistentVector.fromArray([begin], true), cljs.core.flatten1.call(null, cljs.core.interpose.call(null, cljs.core.PersistentVector.fromArray([sep], true), cljs.core.map.call(null, function(p1__9796_SHARP_) {
    return print_one.call(null, p1__9796_SHARP_, opts)
  }, coll))), cljs.core.PersistentVector.fromArray([end], true))
};
cljs.core.string_print = function string_print(x) {
  cljs.core._STAR_print_fn_STAR_.call(null, x);
  return null
};
cljs.core.flush = function flush() {
  return null
};
cljs.core.pr_seq = function pr_seq(obj, opts) {
  if(obj == null) {
    return cljs.core.list.call(null, "nil")
  }else {
    if(void 0 === obj) {
      return cljs.core.list.call(null, "#<undefined>")
    }else {
      if("\ufdd0'else") {
        return cljs.core.concat.call(null, cljs.core.truth_(function() {
          var and__3822__auto____9816 = cljs.core._lookup.call(null, opts, "\ufdd0'meta", null);
          if(cljs.core.truth_(and__3822__auto____9816)) {
            var and__3822__auto____9820 = function() {
              var G__9817__9818 = obj;
              if(G__9817__9818) {
                if(function() {
                  var or__3824__auto____9819 = G__9817__9818.cljs$lang$protocol_mask$partition0$ & 131072;
                  if(or__3824__auto____9819) {
                    return or__3824__auto____9819
                  }else {
                    return G__9817__9818.cljs$core$IMeta$
                  }
                }()) {
                  return true
                }else {
                  if(!G__9817__9818.cljs$lang$protocol_mask$partition0$) {
                    return cljs.core.type_satisfies_.call(null, cljs.core.IMeta, G__9817__9818)
                  }else {
                    return false
                  }
                }
              }else {
                return cljs.core.type_satisfies_.call(null, cljs.core.IMeta, G__9817__9818)
              }
            }();
            if(cljs.core.truth_(and__3822__auto____9820)) {
              return cljs.core.meta.call(null, obj)
            }else {
              return and__3822__auto____9820
            }
          }else {
            return and__3822__auto____9816
          }
        }()) ? cljs.core.concat.call(null, cljs.core.PersistentVector.fromArray(["^"], true), pr_seq.call(null, cljs.core.meta.call(null, obj), opts), cljs.core.PersistentVector.fromArray([" "], true)) : null, function() {
          var and__3822__auto____9821 = !(obj == null);
          if(and__3822__auto____9821) {
            return obj.cljs$lang$type
          }else {
            return and__3822__auto____9821
          }
        }() ? obj.cljs$lang$ctorPrSeq(obj) : function() {
          var G__9822__9823 = obj;
          if(G__9822__9823) {
            if(function() {
              var or__3824__auto____9824 = G__9822__9823.cljs$lang$protocol_mask$partition0$ & 536870912;
              if(or__3824__auto____9824) {
                return or__3824__auto____9824
              }else {
                return G__9822__9823.cljs$core$IPrintable$
              }
            }()) {
              return true
            }else {
              if(!G__9822__9823.cljs$lang$protocol_mask$partition0$) {
                return cljs.core.type_satisfies_.call(null, cljs.core.IPrintable, G__9822__9823)
              }else {
                return false
              }
            }
          }else {
            return cljs.core.type_satisfies_.call(null, cljs.core.IPrintable, G__9822__9823)
          }
        }() ? cljs.core._pr_seq.call(null, obj, opts) : cljs.core.truth_(cljs.core.regexp_QMARK_.call(null, obj)) ? cljs.core.list.call(null, '#"', obj.source, '"') : "\ufdd0'else" ? cljs.core.list.call(null, "#<", [cljs.core.str(obj)].join(""), ">") : null)
      }else {
        return null
      }
    }
  }
};
cljs.core.pr_sb = function pr_sb(objs, opts) {
  var sb__9844 = new goog.string.StringBuffer;
  var G__9845__9846 = cljs.core.seq.call(null, cljs.core.pr_seq.call(null, cljs.core.first.call(null, objs), opts));
  if(G__9845__9846) {
    var string__9847 = cljs.core.first.call(null, G__9845__9846);
    var G__9845__9848 = G__9845__9846;
    while(true) {
      sb__9844.append(string__9847);
      var temp__3974__auto____9849 = cljs.core.next.call(null, G__9845__9848);
      if(temp__3974__auto____9849) {
        var G__9845__9850 = temp__3974__auto____9849;
        var G__9863 = cljs.core.first.call(null, G__9845__9850);
        var G__9864 = G__9845__9850;
        string__9847 = G__9863;
        G__9845__9848 = G__9864;
        continue
      }else {
      }
      break
    }
  }else {
  }
  var G__9851__9852 = cljs.core.seq.call(null, cljs.core.next.call(null, objs));
  if(G__9851__9852) {
    var obj__9853 = cljs.core.first.call(null, G__9851__9852);
    var G__9851__9854 = G__9851__9852;
    while(true) {
      sb__9844.append(" ");
      var G__9855__9856 = cljs.core.seq.call(null, cljs.core.pr_seq.call(null, obj__9853, opts));
      if(G__9855__9856) {
        var string__9857 = cljs.core.first.call(null, G__9855__9856);
        var G__9855__9858 = G__9855__9856;
        while(true) {
          sb__9844.append(string__9857);
          var temp__3974__auto____9859 = cljs.core.next.call(null, G__9855__9858);
          if(temp__3974__auto____9859) {
            var G__9855__9860 = temp__3974__auto____9859;
            var G__9865 = cljs.core.first.call(null, G__9855__9860);
            var G__9866 = G__9855__9860;
            string__9857 = G__9865;
            G__9855__9858 = G__9866;
            continue
          }else {
          }
          break
        }
      }else {
      }
      var temp__3974__auto____9861 = cljs.core.next.call(null, G__9851__9854);
      if(temp__3974__auto____9861) {
        var G__9851__9862 = temp__3974__auto____9861;
        var G__9867 = cljs.core.first.call(null, G__9851__9862);
        var G__9868 = G__9851__9862;
        obj__9853 = G__9867;
        G__9851__9854 = G__9868;
        continue
      }else {
      }
      break
    }
  }else {
  }
  return sb__9844
};
cljs.core.pr_str_with_opts = function pr_str_with_opts(objs, opts) {
  return[cljs.core.str(cljs.core.pr_sb.call(null, objs, opts))].join("")
};
cljs.core.prn_str_with_opts = function prn_str_with_opts(objs, opts) {
  var sb__9870 = cljs.core.pr_sb.call(null, objs, opts);
  sb__9870.append("\n");
  return[cljs.core.str(sb__9870)].join("")
};
cljs.core.pr_with_opts = function pr_with_opts(objs, opts) {
  var G__9889__9890 = cljs.core.seq.call(null, cljs.core.pr_seq.call(null, cljs.core.first.call(null, objs), opts));
  if(G__9889__9890) {
    var string__9891 = cljs.core.first.call(null, G__9889__9890);
    var G__9889__9892 = G__9889__9890;
    while(true) {
      cljs.core.string_print.call(null, string__9891);
      var temp__3974__auto____9893 = cljs.core.next.call(null, G__9889__9892);
      if(temp__3974__auto____9893) {
        var G__9889__9894 = temp__3974__auto____9893;
        var G__9907 = cljs.core.first.call(null, G__9889__9894);
        var G__9908 = G__9889__9894;
        string__9891 = G__9907;
        G__9889__9892 = G__9908;
        continue
      }else {
      }
      break
    }
  }else {
  }
  var G__9895__9896 = cljs.core.seq.call(null, cljs.core.next.call(null, objs));
  if(G__9895__9896) {
    var obj__9897 = cljs.core.first.call(null, G__9895__9896);
    var G__9895__9898 = G__9895__9896;
    while(true) {
      cljs.core.string_print.call(null, " ");
      var G__9899__9900 = cljs.core.seq.call(null, cljs.core.pr_seq.call(null, obj__9897, opts));
      if(G__9899__9900) {
        var string__9901 = cljs.core.first.call(null, G__9899__9900);
        var G__9899__9902 = G__9899__9900;
        while(true) {
          cljs.core.string_print.call(null, string__9901);
          var temp__3974__auto____9903 = cljs.core.next.call(null, G__9899__9902);
          if(temp__3974__auto____9903) {
            var G__9899__9904 = temp__3974__auto____9903;
            var G__9909 = cljs.core.first.call(null, G__9899__9904);
            var G__9910 = G__9899__9904;
            string__9901 = G__9909;
            G__9899__9902 = G__9910;
            continue
          }else {
          }
          break
        }
      }else {
      }
      var temp__3974__auto____9905 = cljs.core.next.call(null, G__9895__9898);
      if(temp__3974__auto____9905) {
        var G__9895__9906 = temp__3974__auto____9905;
        var G__9911 = cljs.core.first.call(null, G__9895__9906);
        var G__9912 = G__9895__9906;
        obj__9897 = G__9911;
        G__9895__9898 = G__9912;
        continue
      }else {
        return null
      }
      break
    }
  }else {
    return null
  }
};
cljs.core.newline = function newline(opts) {
  cljs.core.string_print.call(null, "\n");
  if(cljs.core.truth_(cljs.core._lookup.call(null, opts, "\ufdd0'flush-on-newline", null))) {
    return cljs.core.flush.call(null)
  }else {
    return null
  }
};
cljs.core._STAR_flush_on_newline_STAR_ = true;
cljs.core._STAR_print_readably_STAR_ = true;
cljs.core._STAR_print_meta_STAR_ = false;
cljs.core._STAR_print_dup_STAR_ = false;
cljs.core.pr_opts = function pr_opts() {
  return cljs.core.ObjMap.fromObject(["\ufdd0'flush-on-newline", "\ufdd0'readably", "\ufdd0'meta", "\ufdd0'dup"], {"\ufdd0'flush-on-newline":cljs.core._STAR_flush_on_newline_STAR_, "\ufdd0'readably":cljs.core._STAR_print_readably_STAR_, "\ufdd0'meta":cljs.core._STAR_print_meta_STAR_, "\ufdd0'dup":cljs.core._STAR_print_dup_STAR_})
};
cljs.core.pr_str = function() {
  var pr_str__delegate = function(objs) {
    return cljs.core.pr_str_with_opts.call(null, objs, cljs.core.pr_opts.call(null))
  };
  var pr_str = function(var_args) {
    var objs = null;
    if(goog.isDef(var_args)) {
      objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return pr_str__delegate.call(this, objs)
  };
  pr_str.cljs$lang$maxFixedArity = 0;
  pr_str.cljs$lang$applyTo = function(arglist__9913) {
    var objs = cljs.core.seq(arglist__9913);
    return pr_str__delegate(objs)
  };
  pr_str.cljs$lang$arity$variadic = pr_str__delegate;
  return pr_str
}();
cljs.core.prn_str = function() {
  var prn_str__delegate = function(objs) {
    return cljs.core.prn_str_with_opts.call(null, objs, cljs.core.pr_opts.call(null))
  };
  var prn_str = function(var_args) {
    var objs = null;
    if(goog.isDef(var_args)) {
      objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return prn_str__delegate.call(this, objs)
  };
  prn_str.cljs$lang$maxFixedArity = 0;
  prn_str.cljs$lang$applyTo = function(arglist__9914) {
    var objs = cljs.core.seq(arglist__9914);
    return prn_str__delegate(objs)
  };
  prn_str.cljs$lang$arity$variadic = prn_str__delegate;
  return prn_str
}();
cljs.core.pr = function() {
  var pr__delegate = function(objs) {
    return cljs.core.pr_with_opts.call(null, objs, cljs.core.pr_opts.call(null))
  };
  var pr = function(var_args) {
    var objs = null;
    if(goog.isDef(var_args)) {
      objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return pr__delegate.call(this, objs)
  };
  pr.cljs$lang$maxFixedArity = 0;
  pr.cljs$lang$applyTo = function(arglist__9915) {
    var objs = cljs.core.seq(arglist__9915);
    return pr__delegate(objs)
  };
  pr.cljs$lang$arity$variadic = pr__delegate;
  return pr
}();
cljs.core.print = function() {
  var cljs_core_print__delegate = function(objs) {
    return cljs.core.pr_with_opts.call(null, objs, cljs.core.assoc.call(null, cljs.core.pr_opts.call(null), "\ufdd0'readably", false))
  };
  var cljs_core_print = function(var_args) {
    var objs = null;
    if(goog.isDef(var_args)) {
      objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return cljs_core_print__delegate.call(this, objs)
  };
  cljs_core_print.cljs$lang$maxFixedArity = 0;
  cljs_core_print.cljs$lang$applyTo = function(arglist__9916) {
    var objs = cljs.core.seq(arglist__9916);
    return cljs_core_print__delegate(objs)
  };
  cljs_core_print.cljs$lang$arity$variadic = cljs_core_print__delegate;
  return cljs_core_print
}();
cljs.core.print_str = function() {
  var print_str__delegate = function(objs) {
    return cljs.core.pr_str_with_opts.call(null, objs, cljs.core.assoc.call(null, cljs.core.pr_opts.call(null), "\ufdd0'readably", false))
  };
  var print_str = function(var_args) {
    var objs = null;
    if(goog.isDef(var_args)) {
      objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return print_str__delegate.call(this, objs)
  };
  print_str.cljs$lang$maxFixedArity = 0;
  print_str.cljs$lang$applyTo = function(arglist__9917) {
    var objs = cljs.core.seq(arglist__9917);
    return print_str__delegate(objs)
  };
  print_str.cljs$lang$arity$variadic = print_str__delegate;
  return print_str
}();
cljs.core.println = function() {
  var println__delegate = function(objs) {
    cljs.core.pr_with_opts.call(null, objs, cljs.core.assoc.call(null, cljs.core.pr_opts.call(null), "\ufdd0'readably", false));
    return cljs.core.newline.call(null, cljs.core.pr_opts.call(null))
  };
  var println = function(var_args) {
    var objs = null;
    if(goog.isDef(var_args)) {
      objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return println__delegate.call(this, objs)
  };
  println.cljs$lang$maxFixedArity = 0;
  println.cljs$lang$applyTo = function(arglist__9918) {
    var objs = cljs.core.seq(arglist__9918);
    return println__delegate(objs)
  };
  println.cljs$lang$arity$variadic = println__delegate;
  return println
}();
cljs.core.println_str = function() {
  var println_str__delegate = function(objs) {
    return cljs.core.prn_str_with_opts.call(null, objs, cljs.core.assoc.call(null, cljs.core.pr_opts.call(null), "\ufdd0'readably", false))
  };
  var println_str = function(var_args) {
    var objs = null;
    if(goog.isDef(var_args)) {
      objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return println_str__delegate.call(this, objs)
  };
  println_str.cljs$lang$maxFixedArity = 0;
  println_str.cljs$lang$applyTo = function(arglist__9919) {
    var objs = cljs.core.seq(arglist__9919);
    return println_str__delegate(objs)
  };
  println_str.cljs$lang$arity$variadic = println_str__delegate;
  return println_str
}();
cljs.core.prn = function() {
  var prn__delegate = function(objs) {
    cljs.core.pr_with_opts.call(null, objs, cljs.core.pr_opts.call(null));
    return cljs.core.newline.call(null, cljs.core.pr_opts.call(null))
  };
  var prn = function(var_args) {
    var objs = null;
    if(goog.isDef(var_args)) {
      objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return prn__delegate.call(this, objs)
  };
  prn.cljs$lang$maxFixedArity = 0;
  prn.cljs$lang$applyTo = function(arglist__9920) {
    var objs = cljs.core.seq(arglist__9920);
    return prn__delegate(objs)
  };
  prn.cljs$lang$arity$variadic = prn__delegate;
  return prn
}();
cljs.core.printf = function() {
  var printf__delegate = function(fmt, args) {
    return cljs.core.print.call(null, cljs.core.apply.call(null, cljs.core.format, fmt, args))
  };
  var printf = function(fmt, var_args) {
    var args = null;
    if(goog.isDef(var_args)) {
      args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
    }
    return printf__delegate.call(this, fmt, args)
  };
  printf.cljs$lang$maxFixedArity = 1;
  printf.cljs$lang$applyTo = function(arglist__9921) {
    var fmt = cljs.core.first(arglist__9921);
    var args = cljs.core.rest(arglist__9921);
    return printf__delegate(fmt, args)
  };
  printf.cljs$lang$arity$variadic = printf__delegate;
  return printf
}();
cljs.core.HashMap.prototype.cljs$core$IPrintable$ = true;
cljs.core.HashMap.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  var pr_pair__9922 = function(keyval) {
    return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "", " ", "", opts, keyval)
  };
  return cljs.core.pr_sequential.call(null, pr_pair__9922, "{", ", ", "}", opts, coll)
};
cljs.core.IPrintable["number"] = true;
cljs.core._pr_seq["number"] = function(n, opts) {
  return cljs.core.list.call(null, [cljs.core.str(n)].join(""))
};
cljs.core.IndexedSeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", opts, coll)
};
cljs.core.Subvec.prototype.cljs$core$IPrintable$ = true;
cljs.core.Subvec.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "[", " ", "]", opts, coll)
};
cljs.core.ChunkedCons.prototype.cljs$core$IPrintable$ = true;
cljs.core.ChunkedCons.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", opts, coll)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentTreeMap.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  var pr_pair__9923 = function(keyval) {
    return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "", " ", "", opts, keyval)
  };
  return cljs.core.pr_sequential.call(null, pr_pair__9923, "{", ", ", "}", opts, coll)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentArrayMap.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  var pr_pair__9924 = function(keyval) {
    return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "", " ", "", opts, keyval)
  };
  return cljs.core.pr_sequential.call(null, pr_pair__9924, "{", ", ", "}", opts, coll)
};
cljs.core.PersistentQueue.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "#queue [", " ", "]", opts, cljs.core.seq.call(null, coll))
};
cljs.core.LazySeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.LazySeq.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", opts, coll)
};
cljs.core.RSeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.RSeq.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", opts, coll)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentTreeSet.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "#{", " ", "}", opts, coll)
};
cljs.core.IPrintable["boolean"] = true;
cljs.core._pr_seq["boolean"] = function(bool, opts) {
  return cljs.core.list.call(null, [cljs.core.str(bool)].join(""))
};
cljs.core.IPrintable["string"] = true;
cljs.core._pr_seq["string"] = function(obj, opts) {
  if(cljs.core.keyword_QMARK_.call(null, obj)) {
    return cljs.core.list.call(null, [cljs.core.str(":"), cljs.core.str(function() {
      var temp__3974__auto____9925 = cljs.core.namespace.call(null, obj);
      if(cljs.core.truth_(temp__3974__auto____9925)) {
        var nspc__9926 = temp__3974__auto____9925;
        return[cljs.core.str(nspc__9926), cljs.core.str("/")].join("")
      }else {
        return null
      }
    }()), cljs.core.str(cljs.core.name.call(null, obj))].join(""))
  }else {
    if(cljs.core.symbol_QMARK_.call(null, obj)) {
      return cljs.core.list.call(null, [cljs.core.str(function() {
        var temp__3974__auto____9927 = cljs.core.namespace.call(null, obj);
        if(cljs.core.truth_(temp__3974__auto____9927)) {
          var nspc__9928 = temp__3974__auto____9927;
          return[cljs.core.str(nspc__9928), cljs.core.str("/")].join("")
        }else {
          return null
        }
      }()), cljs.core.str(cljs.core.name.call(null, obj))].join(""))
    }else {
      if("\ufdd0'else") {
        return cljs.core.list.call(null, cljs.core.truth_((new cljs.core.Keyword("\ufdd0'readably")).call(null, opts)) ? goog.string.quote(obj) : obj)
      }else {
        return null
      }
    }
  }
};
cljs.core.NodeSeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.NodeSeq.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", opts, coll)
};
cljs.core.RedNode.prototype.cljs$core$IPrintable$ = true;
cljs.core.RedNode.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "[", " ", "]", opts, coll)
};
cljs.core.ChunkedSeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.ChunkedSeq.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", opts, coll)
};
cljs.core.PersistentHashMap.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentHashMap.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  var pr_pair__9929 = function(keyval) {
    return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "", " ", "", opts, keyval)
  };
  return cljs.core.pr_sequential.call(null, pr_pair__9929, "{", ", ", "}", opts, coll)
};
cljs.core.Vector.prototype.cljs$core$IPrintable$ = true;
cljs.core.Vector.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "[", " ", "]", opts, coll)
};
cljs.core.PersistentHashSet.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentHashSet.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "#{", " ", "}", opts, coll)
};
cljs.core.PersistentVector.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentVector.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "[", " ", "]", opts, coll)
};
cljs.core.List.prototype.cljs$core$IPrintable$ = true;
cljs.core.List.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", opts, coll)
};
cljs.core.IPrintable["array"] = true;
cljs.core._pr_seq["array"] = function(a, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "#<Array [", ", ", "]>", opts, a)
};
cljs.core.IPrintable["function"] = true;
cljs.core._pr_seq["function"] = function(this$) {
  return cljs.core.list.call(null, "#<", [cljs.core.str(this$)].join(""), ">")
};
cljs.core.EmptyList.prototype.cljs$core$IPrintable$ = true;
cljs.core.EmptyList.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.list.call(null, "()")
};
cljs.core.BlackNode.prototype.cljs$core$IPrintable$ = true;
cljs.core.BlackNode.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "[", " ", "]", opts, coll)
};
Date.prototype.cljs$core$IPrintable$ = true;
Date.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(d, _) {
  var normalize__9931 = function(n, len) {
    var ns__9930 = [cljs.core.str(n)].join("");
    while(true) {
      if(cljs.core.count.call(null, ns__9930) < len) {
        var G__9933 = [cljs.core.str("0"), cljs.core.str(ns__9930)].join("");
        ns__9930 = G__9933;
        continue
      }else {
        return ns__9930
      }
      break
    }
  };
  return cljs.core.list.call(null, [cljs.core.str('#inst "'), cljs.core.str(d.getUTCFullYear()), cljs.core.str("-"), cljs.core.str(normalize__9931.call(null, d.getUTCMonth() + 1, 2)), cljs.core.str("-"), cljs.core.str(normalize__9931.call(null, d.getUTCDate(), 2)), cljs.core.str("T"), cljs.core.str(normalize__9931.call(null, d.getUTCHours(), 2)), cljs.core.str(":"), cljs.core.str(normalize__9931.call(null, d.getUTCMinutes(), 2)), cljs.core.str(":"), cljs.core.str(normalize__9931.call(null, d.getUTCSeconds(), 
  2)), cljs.core.str("."), cljs.core.str(normalize__9931.call(null, d.getUTCMilliseconds(), 3)), cljs.core.str("-"), cljs.core.str('00:00"')].join(""))
};
cljs.core.Cons.prototype.cljs$core$IPrintable$ = true;
cljs.core.Cons.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", opts, coll)
};
cljs.core.Range.prototype.cljs$core$IPrintable$ = true;
cljs.core.Range.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", opts, coll)
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.ArrayNodeSeq.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", opts, coll)
};
cljs.core.ObjMap.prototype.cljs$core$IPrintable$ = true;
cljs.core.ObjMap.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  var pr_pair__9932 = function(keyval) {
    return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "", " ", "", opts, keyval)
  };
  return cljs.core.pr_sequential.call(null, pr_pair__9932, "{", ", ", "}", opts, coll)
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", opts, coll)
};
cljs.core.PersistentVector.prototype.cljs$core$IComparable$ = true;
cljs.core.PersistentVector.prototype.cljs$core$IComparable$_compare$arity$2 = function(x, y) {
  return cljs.core.compare_indexed.call(null, x, y)
};
cljs.core.Atom = function(state, meta, validator, watches) {
  this.state = state;
  this.meta = meta;
  this.validator = validator;
  this.watches = watches;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 2690809856
};
cljs.core.Atom.cljs$lang$type = true;
cljs.core.Atom.cljs$lang$ctorPrSeq = function(this__2315__auto__) {
  return cljs.core.list.call(null, "cljs.core/Atom")
};
cljs.core.Atom.prototype.cljs$core$IHash$_hash$arity$1 = function(this$) {
  var this__9934 = this;
  return goog.getUid(this$)
};
cljs.core.Atom.prototype.cljs$core$IWatchable$_notify_watches$arity$3 = function(this$, oldval, newval) {
  var this__9935 = this;
  var G__9936__9937 = cljs.core.seq.call(null, this__9935.watches);
  if(G__9936__9937) {
    var G__9939__9941 = cljs.core.first.call(null, G__9936__9937);
    var vec__9940__9942 = G__9939__9941;
    var key__9943 = cljs.core.nth.call(null, vec__9940__9942, 0, null);
    var f__9944 = cljs.core.nth.call(null, vec__9940__9942, 1, null);
    var G__9936__9945 = G__9936__9937;
    var G__9939__9946 = G__9939__9941;
    var G__9936__9947 = G__9936__9945;
    while(true) {
      var vec__9948__9949 = G__9939__9946;
      var key__9950 = cljs.core.nth.call(null, vec__9948__9949, 0, null);
      var f__9951 = cljs.core.nth.call(null, vec__9948__9949, 1, null);
      var G__9936__9952 = G__9936__9947;
      f__9951.call(null, key__9950, this$, oldval, newval);
      var temp__3974__auto____9953 = cljs.core.next.call(null, G__9936__9952);
      if(temp__3974__auto____9953) {
        var G__9936__9954 = temp__3974__auto____9953;
        var G__9961 = cljs.core.first.call(null, G__9936__9954);
        var G__9962 = G__9936__9954;
        G__9939__9946 = G__9961;
        G__9936__9947 = G__9962;
        continue
      }else {
        return null
      }
      break
    }
  }else {
    return null
  }
};
cljs.core.Atom.prototype.cljs$core$IWatchable$_add_watch$arity$3 = function(this$, key, f) {
  var this__9955 = this;
  return this$.watches = cljs.core.assoc.call(null, this__9955.watches, key, f)
};
cljs.core.Atom.prototype.cljs$core$IWatchable$_remove_watch$arity$2 = function(this$, key) {
  var this__9956 = this;
  return this$.watches = cljs.core.dissoc.call(null, this__9956.watches, key)
};
cljs.core.Atom.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(a, opts) {
  var this__9957 = this;
  return cljs.core.concat.call(null, cljs.core.PersistentVector.fromArray(["#<Atom: "], true), cljs.core._pr_seq.call(null, this__9957.state, opts), ">")
};
cljs.core.Atom.prototype.cljs$core$IMeta$_meta$arity$1 = function(_) {
  var this__9958 = this;
  return this__9958.meta
};
cljs.core.Atom.prototype.cljs$core$IDeref$_deref$arity$1 = function(_) {
  var this__9959 = this;
  return this__9959.state
};
cljs.core.Atom.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(o, other) {
  var this__9960 = this;
  return o === other
};
cljs.core.Atom;
cljs.core.atom = function() {
  var atom = null;
  var atom__1 = function(x) {
    return new cljs.core.Atom(x, null, null, null)
  };
  var atom__2 = function() {
    var G__9974__delegate = function(x, p__9963) {
      var map__9969__9970 = p__9963;
      var map__9969__9971 = cljs.core.seq_QMARK_.call(null, map__9969__9970) ? cljs.core.apply.call(null, cljs.core.hash_map, map__9969__9970) : map__9969__9970;
      var validator__9972 = cljs.core._lookup.call(null, map__9969__9971, "\ufdd0'validator", null);
      var meta__9973 = cljs.core._lookup.call(null, map__9969__9971, "\ufdd0'meta", null);
      return new cljs.core.Atom(x, meta__9973, validator__9972, null)
    };
    var G__9974 = function(x, var_args) {
      var p__9963 = null;
      if(goog.isDef(var_args)) {
        p__9963 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
      }
      return G__9974__delegate.call(this, x, p__9963)
    };
    G__9974.cljs$lang$maxFixedArity = 1;
    G__9974.cljs$lang$applyTo = function(arglist__9975) {
      var x = cljs.core.first(arglist__9975);
      var p__9963 = cljs.core.rest(arglist__9975);
      return G__9974__delegate(x, p__9963)
    };
    G__9974.cljs$lang$arity$variadic = G__9974__delegate;
    return G__9974
  }();
  atom = function(x, var_args) {
    var p__9963 = var_args;
    switch(arguments.length) {
      case 1:
        return atom__1.call(this, x);
      default:
        return atom__2.cljs$lang$arity$variadic(x, cljs.core.array_seq(arguments, 1))
    }
    throw"Invalid arity: " + arguments.length;
  };
  atom.cljs$lang$maxFixedArity = 1;
  atom.cljs$lang$applyTo = atom__2.cljs$lang$applyTo;
  atom.cljs$lang$arity$1 = atom__1;
  atom.cljs$lang$arity$variadic = atom__2.cljs$lang$arity$variadic;
  return atom
}();
cljs.core.reset_BANG_ = function reset_BANG_(a, new_value) {
  var temp__3974__auto____9979 = a.validator;
  if(cljs.core.truth_(temp__3974__auto____9979)) {
    var validate__9980 = temp__3974__auto____9979;
    if(cljs.core.truth_(validate__9980.call(null, new_value))) {
    }else {
      throw new Error([cljs.core.str("Assert failed: "), cljs.core.str("Validator rejected reference state"), cljs.core.str("\n"), cljs.core.str(cljs.core.pr_str.call(null, cljs.core.with_meta(cljs.core.list("\ufdd1'validate", "\ufdd1'new-value"), cljs.core.hash_map("\ufdd0'line", 6440))))].join(""));
    }
  }else {
  }
  var old_value__9981 = a.state;
  a.state = new_value;
  cljs.core._notify_watches.call(null, a, old_value__9981, new_value);
  return new_value
};
cljs.core.swap_BANG_ = function() {
  var swap_BANG_ = null;
  var swap_BANG___2 = function(a, f) {
    return cljs.core.reset_BANG_.call(null, a, f.call(null, a.state))
  };
  var swap_BANG___3 = function(a, f, x) {
    return cljs.core.reset_BANG_.call(null, a, f.call(null, a.state, x))
  };
  var swap_BANG___4 = function(a, f, x, y) {
    return cljs.core.reset_BANG_.call(null, a, f.call(null, a.state, x, y))
  };
  var swap_BANG___5 = function(a, f, x, y, z) {
    return cljs.core.reset_BANG_.call(null, a, f.call(null, a.state, x, y, z))
  };
  var swap_BANG___6 = function() {
    var G__9982__delegate = function(a, f, x, y, z, more) {
      return cljs.core.reset_BANG_.call(null, a, cljs.core.apply.call(null, f, a.state, x, y, z, more))
    };
    var G__9982 = function(a, f, x, y, z, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 5), 0)
      }
      return G__9982__delegate.call(this, a, f, x, y, z, more)
    };
    G__9982.cljs$lang$maxFixedArity = 5;
    G__9982.cljs$lang$applyTo = function(arglist__9983) {
      var a = cljs.core.first(arglist__9983);
      var f = cljs.core.first(cljs.core.next(arglist__9983));
      var x = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9983)));
      var y = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__9983))));
      var z = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__9983)))));
      var more = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__9983)))));
      return G__9982__delegate(a, f, x, y, z, more)
    };
    G__9982.cljs$lang$arity$variadic = G__9982__delegate;
    return G__9982
  }();
  swap_BANG_ = function(a, f, x, y, z, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 2:
        return swap_BANG___2.call(this, a, f);
      case 3:
        return swap_BANG___3.call(this, a, f, x);
      case 4:
        return swap_BANG___4.call(this, a, f, x, y);
      case 5:
        return swap_BANG___5.call(this, a, f, x, y, z);
      default:
        return swap_BANG___6.cljs$lang$arity$variadic(a, f, x, y, z, cljs.core.array_seq(arguments, 5))
    }
    throw"Invalid arity: " + arguments.length;
  };
  swap_BANG_.cljs$lang$maxFixedArity = 5;
  swap_BANG_.cljs$lang$applyTo = swap_BANG___6.cljs$lang$applyTo;
  swap_BANG_.cljs$lang$arity$2 = swap_BANG___2;
  swap_BANG_.cljs$lang$arity$3 = swap_BANG___3;
  swap_BANG_.cljs$lang$arity$4 = swap_BANG___4;
  swap_BANG_.cljs$lang$arity$5 = swap_BANG___5;
  swap_BANG_.cljs$lang$arity$variadic = swap_BANG___6.cljs$lang$arity$variadic;
  return swap_BANG_
}();
cljs.core.compare_and_set_BANG_ = function compare_and_set_BANG_(a, oldval, newval) {
  if(cljs.core._EQ_.call(null, a.state, oldval)) {
    cljs.core.reset_BANG_.call(null, a, newval);
    return true
  }else {
    return false
  }
};
cljs.core.deref = function deref(o) {
  return cljs.core._deref.call(null, o)
};
cljs.core.set_validator_BANG_ = function set_validator_BANG_(iref, val) {
  return iref.validator = val
};
cljs.core.get_validator = function get_validator(iref) {
  return iref.validator
};
cljs.core.alter_meta_BANG_ = function() {
  var alter_meta_BANG___delegate = function(iref, f, args) {
    return iref.meta = cljs.core.apply.call(null, f, iref.meta, args)
  };
  var alter_meta_BANG_ = function(iref, f, var_args) {
    var args = null;
    if(goog.isDef(var_args)) {
      args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
    }
    return alter_meta_BANG___delegate.call(this, iref, f, args)
  };
  alter_meta_BANG_.cljs$lang$maxFixedArity = 2;
  alter_meta_BANG_.cljs$lang$applyTo = function(arglist__9984) {
    var iref = cljs.core.first(arglist__9984);
    var f = cljs.core.first(cljs.core.next(arglist__9984));
    var args = cljs.core.rest(cljs.core.next(arglist__9984));
    return alter_meta_BANG___delegate(iref, f, args)
  };
  alter_meta_BANG_.cljs$lang$arity$variadic = alter_meta_BANG___delegate;
  return alter_meta_BANG_
}();
cljs.core.reset_meta_BANG_ = function reset_meta_BANG_(iref, m) {
  return iref.meta = m
};
cljs.core.add_watch = function add_watch(iref, key, f) {
  return cljs.core._add_watch.call(null, iref, key, f)
};
cljs.core.remove_watch = function remove_watch(iref, key) {
  return cljs.core._remove_watch.call(null, iref, key)
};
cljs.core.gensym_counter = null;
cljs.core.gensym = function() {
  var gensym = null;
  var gensym__0 = function() {
    return gensym.call(null, "G__")
  };
  var gensym__1 = function(prefix_string) {
    if(cljs.core.gensym_counter == null) {
      cljs.core.gensym_counter = cljs.core.atom.call(null, 0)
    }else {
    }
    return cljs.core.symbol.call(null, [cljs.core.str(prefix_string), cljs.core.str(cljs.core.swap_BANG_.call(null, cljs.core.gensym_counter, cljs.core.inc))].join(""))
  };
  gensym = function(prefix_string) {
    switch(arguments.length) {
      case 0:
        return gensym__0.call(this);
      case 1:
        return gensym__1.call(this, prefix_string)
    }
    throw"Invalid arity: " + arguments.length;
  };
  gensym.cljs$lang$arity$0 = gensym__0;
  gensym.cljs$lang$arity$1 = gensym__1;
  return gensym
}();
cljs.core.fixture1 = 1;
cljs.core.fixture2 = 2;
cljs.core.Delay = function(state, f) {
  this.state = state;
  this.f = f;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 1073774592
};
cljs.core.Delay.cljs$lang$type = true;
cljs.core.Delay.cljs$lang$ctorPrSeq = function(this__2315__auto__) {
  return cljs.core.list.call(null, "cljs.core/Delay")
};
cljs.core.Delay.prototype.cljs$core$IPending$_realized_QMARK_$arity$1 = function(d) {
  var this__9985 = this;
  return(new cljs.core.Keyword("\ufdd0'done")).call(null, cljs.core.deref.call(null, this__9985.state))
};
cljs.core.Delay.prototype.cljs$core$IDeref$_deref$arity$1 = function(_) {
  var this__9986 = this;
  return(new cljs.core.Keyword("\ufdd0'value")).call(null, cljs.core.swap_BANG_.call(null, this__9986.state, function(p__9987) {
    var map__9988__9989 = p__9987;
    var map__9988__9990 = cljs.core.seq_QMARK_.call(null, map__9988__9989) ? cljs.core.apply.call(null, cljs.core.hash_map, map__9988__9989) : map__9988__9989;
    var curr_state__9991 = map__9988__9990;
    var done__9992 = cljs.core._lookup.call(null, map__9988__9990, "\ufdd0'done", null);
    if(cljs.core.truth_(done__9992)) {
      return curr_state__9991
    }else {
      return cljs.core.ObjMap.fromObject(["\ufdd0'done", "\ufdd0'value"], {"\ufdd0'done":true, "\ufdd0'value":this__9986.f.call(null)})
    }
  }))
};
cljs.core.Delay;
cljs.core.delay_QMARK_ = function delay_QMARK_(x) {
  return cljs.core.instance_QMARK_.call(null, cljs.core.Delay, x)
};
cljs.core.force = function force(x) {
  if(cljs.core.delay_QMARK_.call(null, x)) {
    return cljs.core.deref.call(null, x)
  }else {
    return x
  }
};
cljs.core.realized_QMARK_ = function realized_QMARK_(d) {
  return cljs.core._realized_QMARK_.call(null, d)
};
cljs.core.js__GT_clj = function() {
  var js__GT_clj__delegate = function(x, options) {
    var map__10013__10014 = options;
    var map__10013__10015 = cljs.core.seq_QMARK_.call(null, map__10013__10014) ? cljs.core.apply.call(null, cljs.core.hash_map, map__10013__10014) : map__10013__10014;
    var keywordize_keys__10016 = cljs.core._lookup.call(null, map__10013__10015, "\ufdd0'keywordize-keys", null);
    var keyfn__10017 = cljs.core.truth_(keywordize_keys__10016) ? cljs.core.keyword : cljs.core.str;
    var f__10032 = function thisfn(x) {
      if(cljs.core.seq_QMARK_.call(null, x)) {
        return cljs.core.doall.call(null, cljs.core.map.call(null, thisfn, x))
      }else {
        if(cljs.core.coll_QMARK_.call(null, x)) {
          return cljs.core.into.call(null, cljs.core.empty.call(null, x), cljs.core.map.call(null, thisfn, x))
        }else {
          if(cljs.core.truth_(goog.isArray(x))) {
            return cljs.core.vec.call(null, cljs.core.map.call(null, thisfn, x))
          }else {
            if(cljs.core.type.call(null, x) === Object) {
              return cljs.core.into.call(null, cljs.core.ObjMap.EMPTY, function() {
                var iter__2468__auto____10031 = function iter__10025(s__10026) {
                  return new cljs.core.LazySeq(null, false, function() {
                    var s__10026__10029 = s__10026;
                    while(true) {
                      if(cljs.core.seq.call(null, s__10026__10029)) {
                        var k__10030 = cljs.core.first.call(null, s__10026__10029);
                        return cljs.core.cons.call(null, cljs.core.PersistentVector.fromArray([keyfn__10017.call(null, k__10030), thisfn.call(null, x[k__10030])], true), iter__10025.call(null, cljs.core.rest.call(null, s__10026__10029)))
                      }else {
                        return null
                      }
                      break
                    }
                  }, null)
                };
                return iter__2468__auto____10031.call(null, cljs.core.js_keys.call(null, x))
              }())
            }else {
              if("\ufdd0'else") {
                return x
              }else {
                return null
              }
            }
          }
        }
      }
    };
    return f__10032.call(null, x)
  };
  var js__GT_clj = function(x, var_args) {
    var options = null;
    if(goog.isDef(var_args)) {
      options = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
    }
    return js__GT_clj__delegate.call(this, x, options)
  };
  js__GT_clj.cljs$lang$maxFixedArity = 1;
  js__GT_clj.cljs$lang$applyTo = function(arglist__10033) {
    var x = cljs.core.first(arglist__10033);
    var options = cljs.core.rest(arglist__10033);
    return js__GT_clj__delegate(x, options)
  };
  js__GT_clj.cljs$lang$arity$variadic = js__GT_clj__delegate;
  return js__GT_clj
}();
cljs.core.memoize = function memoize(f) {
  var mem__10038 = cljs.core.atom.call(null, cljs.core.ObjMap.EMPTY);
  return function() {
    var G__10042__delegate = function(args) {
      var temp__3971__auto____10039 = cljs.core._lookup.call(null, cljs.core.deref.call(null, mem__10038), args, null);
      if(cljs.core.truth_(temp__3971__auto____10039)) {
        var v__10040 = temp__3971__auto____10039;
        return v__10040
      }else {
        var ret__10041 = cljs.core.apply.call(null, f, args);
        cljs.core.swap_BANG_.call(null, mem__10038, cljs.core.assoc, args, ret__10041);
        return ret__10041
      }
    };
    var G__10042 = function(var_args) {
      var args = null;
      if(goog.isDef(var_args)) {
        args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
      }
      return G__10042__delegate.call(this, args)
    };
    G__10042.cljs$lang$maxFixedArity = 0;
    G__10042.cljs$lang$applyTo = function(arglist__10043) {
      var args = cljs.core.seq(arglist__10043);
      return G__10042__delegate(args)
    };
    G__10042.cljs$lang$arity$variadic = G__10042__delegate;
    return G__10042
  }()
};
cljs.core.trampoline = function() {
  var trampoline = null;
  var trampoline__1 = function(f) {
    while(true) {
      var ret__10045 = f.call(null);
      if(cljs.core.fn_QMARK_.call(null, ret__10045)) {
        var G__10046 = ret__10045;
        f = G__10046;
        continue
      }else {
        return ret__10045
      }
      break
    }
  };
  var trampoline__2 = function() {
    var G__10047__delegate = function(f, args) {
      return trampoline.call(null, function() {
        return cljs.core.apply.call(null, f, args)
      })
    };
    var G__10047 = function(f, var_args) {
      var args = null;
      if(goog.isDef(var_args)) {
        args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
      }
      return G__10047__delegate.call(this, f, args)
    };
    G__10047.cljs$lang$maxFixedArity = 1;
    G__10047.cljs$lang$applyTo = function(arglist__10048) {
      var f = cljs.core.first(arglist__10048);
      var args = cljs.core.rest(arglist__10048);
      return G__10047__delegate(f, args)
    };
    G__10047.cljs$lang$arity$variadic = G__10047__delegate;
    return G__10047
  }();
  trampoline = function(f, var_args) {
    var args = var_args;
    switch(arguments.length) {
      case 1:
        return trampoline__1.call(this, f);
      default:
        return trampoline__2.cljs$lang$arity$variadic(f, cljs.core.array_seq(arguments, 1))
    }
    throw"Invalid arity: " + arguments.length;
  };
  trampoline.cljs$lang$maxFixedArity = 1;
  trampoline.cljs$lang$applyTo = trampoline__2.cljs$lang$applyTo;
  trampoline.cljs$lang$arity$1 = trampoline__1;
  trampoline.cljs$lang$arity$variadic = trampoline__2.cljs$lang$arity$variadic;
  return trampoline
}();
cljs.core.rand = function() {
  var rand = null;
  var rand__0 = function() {
    return rand.call(null, 1)
  };
  var rand__1 = function(n) {
    return Math.random.call(null) * n
  };
  rand = function(n) {
    switch(arguments.length) {
      case 0:
        return rand__0.call(this);
      case 1:
        return rand__1.call(this, n)
    }
    throw"Invalid arity: " + arguments.length;
  };
  rand.cljs$lang$arity$0 = rand__0;
  rand.cljs$lang$arity$1 = rand__1;
  return rand
}();
cljs.core.rand_int = function rand_int(n) {
  return Math.floor.call(null, Math.random.call(null) * n)
};
cljs.core.rand_nth = function rand_nth(coll) {
  return cljs.core.nth.call(null, coll, cljs.core.rand_int.call(null, cljs.core.count.call(null, coll)))
};
cljs.core.group_by = function group_by(f, coll) {
  return cljs.core.reduce.call(null, function(ret, x) {
    var k__10050 = f.call(null, x);
    return cljs.core.assoc.call(null, ret, k__10050, cljs.core.conj.call(null, cljs.core._lookup.call(null, ret, k__10050, cljs.core.PersistentVector.EMPTY), x))
  }, cljs.core.ObjMap.EMPTY, coll)
};
cljs.core.make_hierarchy = function make_hierarchy() {
  return cljs.core.ObjMap.fromObject(["\ufdd0'parents", "\ufdd0'descendants", "\ufdd0'ancestors"], {"\ufdd0'parents":cljs.core.ObjMap.EMPTY, "\ufdd0'descendants":cljs.core.ObjMap.EMPTY, "\ufdd0'ancestors":cljs.core.ObjMap.EMPTY})
};
cljs.core.global_hierarchy = cljs.core.atom.call(null, cljs.core.make_hierarchy.call(null));
cljs.core.isa_QMARK_ = function() {
  var isa_QMARK_ = null;
  var isa_QMARK___2 = function(child, parent) {
    return isa_QMARK_.call(null, cljs.core.deref.call(null, cljs.core.global_hierarchy), child, parent)
  };
  var isa_QMARK___3 = function(h, child, parent) {
    var or__3824__auto____10059 = cljs.core._EQ_.call(null, child, parent);
    if(or__3824__auto____10059) {
      return or__3824__auto____10059
    }else {
      var or__3824__auto____10060 = cljs.core.contains_QMARK_.call(null, (new cljs.core.Keyword("\ufdd0'ancestors")).call(null, h).call(null, child), parent);
      if(or__3824__auto____10060) {
        return or__3824__auto____10060
      }else {
        var and__3822__auto____10061 = cljs.core.vector_QMARK_.call(null, parent);
        if(and__3822__auto____10061) {
          var and__3822__auto____10062 = cljs.core.vector_QMARK_.call(null, child);
          if(and__3822__auto____10062) {
            var and__3822__auto____10063 = cljs.core.count.call(null, parent) === cljs.core.count.call(null, child);
            if(and__3822__auto____10063) {
              var ret__10064 = true;
              var i__10065 = 0;
              while(true) {
                if(function() {
                  var or__3824__auto____10066 = cljs.core.not.call(null, ret__10064);
                  if(or__3824__auto____10066) {
                    return or__3824__auto____10066
                  }else {
                    return i__10065 === cljs.core.count.call(null, parent)
                  }
                }()) {
                  return ret__10064
                }else {
                  var G__10067 = isa_QMARK_.call(null, h, child.call(null, i__10065), parent.call(null, i__10065));
                  var G__10068 = i__10065 + 1;
                  ret__10064 = G__10067;
                  i__10065 = G__10068;
                  continue
                }
                break
              }
            }else {
              return and__3822__auto____10063
            }
          }else {
            return and__3822__auto____10062
          }
        }else {
          return and__3822__auto____10061
        }
      }
    }
  };
  isa_QMARK_ = function(h, child, parent) {
    switch(arguments.length) {
      case 2:
        return isa_QMARK___2.call(this, h, child);
      case 3:
        return isa_QMARK___3.call(this, h, child, parent)
    }
    throw"Invalid arity: " + arguments.length;
  };
  isa_QMARK_.cljs$lang$arity$2 = isa_QMARK___2;
  isa_QMARK_.cljs$lang$arity$3 = isa_QMARK___3;
  return isa_QMARK_
}();
cljs.core.parents = function() {
  var parents = null;
  var parents__1 = function(tag) {
    return parents.call(null, cljs.core.deref.call(null, cljs.core.global_hierarchy), tag)
  };
  var parents__2 = function(h, tag) {
    return cljs.core.not_empty.call(null, cljs.core._lookup.call(null, (new cljs.core.Keyword("\ufdd0'parents")).call(null, h), tag, null))
  };
  parents = function(h, tag) {
    switch(arguments.length) {
      case 1:
        return parents__1.call(this, h);
      case 2:
        return parents__2.call(this, h, tag)
    }
    throw"Invalid arity: " + arguments.length;
  };
  parents.cljs$lang$arity$1 = parents__1;
  parents.cljs$lang$arity$2 = parents__2;
  return parents
}();
cljs.core.ancestors = function() {
  var ancestors = null;
  var ancestors__1 = function(tag) {
    return ancestors.call(null, cljs.core.deref.call(null, cljs.core.global_hierarchy), tag)
  };
  var ancestors__2 = function(h, tag) {
    return cljs.core.not_empty.call(null, cljs.core._lookup.call(null, (new cljs.core.Keyword("\ufdd0'ancestors")).call(null, h), tag, null))
  };
  ancestors = function(h, tag) {
    switch(arguments.length) {
      case 1:
        return ancestors__1.call(this, h);
      case 2:
        return ancestors__2.call(this, h, tag)
    }
    throw"Invalid arity: " + arguments.length;
  };
  ancestors.cljs$lang$arity$1 = ancestors__1;
  ancestors.cljs$lang$arity$2 = ancestors__2;
  return ancestors
}();
cljs.core.descendants = function() {
  var descendants = null;
  var descendants__1 = function(tag) {
    return descendants.call(null, cljs.core.deref.call(null, cljs.core.global_hierarchy), tag)
  };
  var descendants__2 = function(h, tag) {
    return cljs.core.not_empty.call(null, cljs.core._lookup.call(null, (new cljs.core.Keyword("\ufdd0'descendants")).call(null, h), tag, null))
  };
  descendants = function(h, tag) {
    switch(arguments.length) {
      case 1:
        return descendants__1.call(this, h);
      case 2:
        return descendants__2.call(this, h, tag)
    }
    throw"Invalid arity: " + arguments.length;
  };
  descendants.cljs$lang$arity$1 = descendants__1;
  descendants.cljs$lang$arity$2 = descendants__2;
  return descendants
}();
cljs.core.derive = function() {
  var derive = null;
  var derive__2 = function(tag, parent) {
    if(cljs.core.truth_(cljs.core.namespace.call(null, parent))) {
    }else {
      throw new Error([cljs.core.str("Assert failed: "), cljs.core.str(cljs.core.pr_str.call(null, cljs.core.with_meta(cljs.core.list("\ufdd1'namespace", "\ufdd1'parent"), cljs.core.hash_map("\ufdd0'line", 6724))))].join(""));
    }
    cljs.core.swap_BANG_.call(null, cljs.core.global_hierarchy, derive, tag, parent);
    return null
  };
  var derive__3 = function(h, tag, parent) {
    if(cljs.core.not_EQ_.call(null, tag, parent)) {
    }else {
      throw new Error([cljs.core.str("Assert failed: "), cljs.core.str(cljs.core.pr_str.call(null, cljs.core.with_meta(cljs.core.list("\ufdd1'not=", "\ufdd1'tag", "\ufdd1'parent"), cljs.core.hash_map("\ufdd0'line", 6728))))].join(""));
    }
    var tp__10077 = (new cljs.core.Keyword("\ufdd0'parents")).call(null, h);
    var td__10078 = (new cljs.core.Keyword("\ufdd0'descendants")).call(null, h);
    var ta__10079 = (new cljs.core.Keyword("\ufdd0'ancestors")).call(null, h);
    var tf__10080 = function(m, source, sources, target, targets) {
      return cljs.core.reduce.call(null, function(ret, k) {
        return cljs.core.assoc.call(null, ret, k, cljs.core.reduce.call(null, cljs.core.conj, cljs.core._lookup.call(null, targets, k, cljs.core.PersistentHashSet.EMPTY), cljs.core.cons.call(null, target, targets.call(null, target))))
      }, m, cljs.core.cons.call(null, source, sources.call(null, source)))
    };
    var or__3824__auto____10081 = cljs.core.contains_QMARK_.call(null, tp__10077.call(null, tag), parent) ? null : function() {
      if(cljs.core.contains_QMARK_.call(null, ta__10079.call(null, tag), parent)) {
        throw new Error([cljs.core.str(tag), cljs.core.str("already has"), cljs.core.str(parent), cljs.core.str("as ancestor")].join(""));
      }else {
      }
      if(cljs.core.contains_QMARK_.call(null, ta__10079.call(null, parent), tag)) {
        throw new Error([cljs.core.str("Cyclic derivation:"), cljs.core.str(parent), cljs.core.str("has"), cljs.core.str(tag), cljs.core.str("as ancestor")].join(""));
      }else {
      }
      return cljs.core.ObjMap.fromObject(["\ufdd0'parents", "\ufdd0'ancestors", "\ufdd0'descendants"], {"\ufdd0'parents":cljs.core.assoc.call(null, (new cljs.core.Keyword("\ufdd0'parents")).call(null, h), tag, cljs.core.conj.call(null, cljs.core._lookup.call(null, tp__10077, tag, cljs.core.PersistentHashSet.EMPTY), parent)), "\ufdd0'ancestors":tf__10080.call(null, (new cljs.core.Keyword("\ufdd0'ancestors")).call(null, h), tag, td__10078, parent, ta__10079), "\ufdd0'descendants":tf__10080.call(null, 
      (new cljs.core.Keyword("\ufdd0'descendants")).call(null, h), parent, ta__10079, tag, td__10078)})
    }();
    if(cljs.core.truth_(or__3824__auto____10081)) {
      return or__3824__auto____10081
    }else {
      return h
    }
  };
  derive = function(h, tag, parent) {
    switch(arguments.length) {
      case 2:
        return derive__2.call(this, h, tag);
      case 3:
        return derive__3.call(this, h, tag, parent)
    }
    throw"Invalid arity: " + arguments.length;
  };
  derive.cljs$lang$arity$2 = derive__2;
  derive.cljs$lang$arity$3 = derive__3;
  return derive
}();
cljs.core.underive = function() {
  var underive = null;
  var underive__2 = function(tag, parent) {
    cljs.core.swap_BANG_.call(null, cljs.core.global_hierarchy, underive, tag, parent);
    return null
  };
  var underive__3 = function(h, tag, parent) {
    var parentMap__10086 = (new cljs.core.Keyword("\ufdd0'parents")).call(null, h);
    var childsParents__10087 = cljs.core.truth_(parentMap__10086.call(null, tag)) ? cljs.core.disj.call(null, parentMap__10086.call(null, tag), parent) : cljs.core.PersistentHashSet.EMPTY;
    var newParents__10088 = cljs.core.truth_(cljs.core.not_empty.call(null, childsParents__10087)) ? cljs.core.assoc.call(null, parentMap__10086, tag, childsParents__10087) : cljs.core.dissoc.call(null, parentMap__10086, tag);
    var deriv_seq__10089 = cljs.core.flatten.call(null, cljs.core.map.call(null, function(p1__10069_SHARP_) {
      return cljs.core.cons.call(null, cljs.core.first.call(null, p1__10069_SHARP_), cljs.core.interpose.call(null, cljs.core.first.call(null, p1__10069_SHARP_), cljs.core.second.call(null, p1__10069_SHARP_)))
    }, cljs.core.seq.call(null, newParents__10088)));
    if(cljs.core.contains_QMARK_.call(null, parentMap__10086.call(null, tag), parent)) {
      return cljs.core.reduce.call(null, function(p1__10070_SHARP_, p2__10071_SHARP_) {
        return cljs.core.apply.call(null, cljs.core.derive, p1__10070_SHARP_, p2__10071_SHARP_)
      }, cljs.core.make_hierarchy.call(null), cljs.core.partition.call(null, 2, deriv_seq__10089))
    }else {
      return h
    }
  };
  underive = function(h, tag, parent) {
    switch(arguments.length) {
      case 2:
        return underive__2.call(this, h, tag);
      case 3:
        return underive__3.call(this, h, tag, parent)
    }
    throw"Invalid arity: " + arguments.length;
  };
  underive.cljs$lang$arity$2 = underive__2;
  underive.cljs$lang$arity$3 = underive__3;
  return underive
}();
cljs.core.reset_cache = function reset_cache(method_cache, method_table, cached_hierarchy, hierarchy) {
  cljs.core.swap_BANG_.call(null, method_cache, function(_) {
    return cljs.core.deref.call(null, method_table)
  });
  return cljs.core.swap_BANG_.call(null, cached_hierarchy, function(_) {
    return cljs.core.deref.call(null, hierarchy)
  })
};
cljs.core.prefers_STAR_ = function prefers_STAR_(x, y, prefer_table) {
  var xprefs__10097 = cljs.core.deref.call(null, prefer_table).call(null, x);
  var or__3824__auto____10099 = cljs.core.truth_(function() {
    var and__3822__auto____10098 = xprefs__10097;
    if(cljs.core.truth_(and__3822__auto____10098)) {
      return xprefs__10097.call(null, y)
    }else {
      return and__3822__auto____10098
    }
  }()) ? true : null;
  if(cljs.core.truth_(or__3824__auto____10099)) {
    return or__3824__auto____10099
  }else {
    var or__3824__auto____10101 = function() {
      var ps__10100 = cljs.core.parents.call(null, y);
      while(true) {
        if(cljs.core.count.call(null, ps__10100) > 0) {
          if(cljs.core.truth_(prefers_STAR_.call(null, x, cljs.core.first.call(null, ps__10100), prefer_table))) {
          }else {
          }
          var G__10104 = cljs.core.rest.call(null, ps__10100);
          ps__10100 = G__10104;
          continue
        }else {
          return null
        }
        break
      }
    }();
    if(cljs.core.truth_(or__3824__auto____10101)) {
      return or__3824__auto____10101
    }else {
      var or__3824__auto____10103 = function() {
        var ps__10102 = cljs.core.parents.call(null, x);
        while(true) {
          if(cljs.core.count.call(null, ps__10102) > 0) {
            if(cljs.core.truth_(prefers_STAR_.call(null, cljs.core.first.call(null, ps__10102), y, prefer_table))) {
            }else {
            }
            var G__10105 = cljs.core.rest.call(null, ps__10102);
            ps__10102 = G__10105;
            continue
          }else {
            return null
          }
          break
        }
      }();
      if(cljs.core.truth_(or__3824__auto____10103)) {
        return or__3824__auto____10103
      }else {
        return false
      }
    }
  }
};
cljs.core.dominates = function dominates(x, y, prefer_table) {
  var or__3824__auto____10107 = cljs.core.prefers_STAR_.call(null, x, y, prefer_table);
  if(cljs.core.truth_(or__3824__auto____10107)) {
    return or__3824__auto____10107
  }else {
    return cljs.core.isa_QMARK_.call(null, x, y)
  }
};
cljs.core.find_and_cache_best_method = function find_and_cache_best_method(name, dispatch_val, hierarchy, method_table, prefer_table, method_cache, cached_hierarchy) {
  var best_entry__10125 = cljs.core.reduce.call(null, function(be, p__10117) {
    var vec__10118__10119 = p__10117;
    var k__10120 = cljs.core.nth.call(null, vec__10118__10119, 0, null);
    var ___10121 = cljs.core.nth.call(null, vec__10118__10119, 1, null);
    var e__10122 = vec__10118__10119;
    if(cljs.core.isa_QMARK_.call(null, dispatch_val, k__10120)) {
      var be2__10124 = cljs.core.truth_(function() {
        var or__3824__auto____10123 = be == null;
        if(or__3824__auto____10123) {
          return or__3824__auto____10123
        }else {
          return cljs.core.dominates.call(null, k__10120, cljs.core.first.call(null, be), prefer_table)
        }
      }()) ? e__10122 : be;
      if(cljs.core.truth_(cljs.core.dominates.call(null, cljs.core.first.call(null, be2__10124), k__10120, prefer_table))) {
      }else {
        throw new Error([cljs.core.str("Multiple methods in multimethod '"), cljs.core.str(name), cljs.core.str("' match dispatch value: "), cljs.core.str(dispatch_val), cljs.core.str(" -> "), cljs.core.str(k__10120), cljs.core.str(" and "), cljs.core.str(cljs.core.first.call(null, be2__10124)), cljs.core.str(", and neither is preferred")].join(""));
      }
      return be2__10124
    }else {
      return be
    }
  }, null, cljs.core.deref.call(null, method_table));
  if(cljs.core.truth_(best_entry__10125)) {
    if(cljs.core._EQ_.call(null, cljs.core.deref.call(null, cached_hierarchy), cljs.core.deref.call(null, hierarchy))) {
      cljs.core.swap_BANG_.call(null, method_cache, cljs.core.assoc, dispatch_val, cljs.core.second.call(null, best_entry__10125));
      return cljs.core.second.call(null, best_entry__10125)
    }else {
      cljs.core.reset_cache.call(null, method_cache, method_table, cached_hierarchy, hierarchy);
      return find_and_cache_best_method.call(null, name, dispatch_val, hierarchy, method_table, prefer_table, method_cache, cached_hierarchy)
    }
  }else {
    return null
  }
};
cljs.core.IMultiFn = {};
cljs.core._reset = function _reset(mf) {
  if(function() {
    var and__3822__auto____10130 = mf;
    if(and__3822__auto____10130) {
      return mf.cljs$core$IMultiFn$_reset$arity$1
    }else {
      return and__3822__auto____10130
    }
  }()) {
    return mf.cljs$core$IMultiFn$_reset$arity$1(mf)
  }else {
    var x__2369__auto____10131 = mf == null ? null : mf;
    return function() {
      var or__3824__auto____10132 = cljs.core._reset[goog.typeOf(x__2369__auto____10131)];
      if(or__3824__auto____10132) {
        return or__3824__auto____10132
      }else {
        var or__3824__auto____10133 = cljs.core._reset["_"];
        if(or__3824__auto____10133) {
          return or__3824__auto____10133
        }else {
          throw cljs.core.missing_protocol.call(null, "IMultiFn.-reset", mf);
        }
      }
    }().call(null, mf)
  }
};
cljs.core._add_method = function _add_method(mf, dispatch_val, method) {
  if(function() {
    var and__3822__auto____10138 = mf;
    if(and__3822__auto____10138) {
      return mf.cljs$core$IMultiFn$_add_method$arity$3
    }else {
      return and__3822__auto____10138
    }
  }()) {
    return mf.cljs$core$IMultiFn$_add_method$arity$3(mf, dispatch_val, method)
  }else {
    var x__2369__auto____10139 = mf == null ? null : mf;
    return function() {
      var or__3824__auto____10140 = cljs.core._add_method[goog.typeOf(x__2369__auto____10139)];
      if(or__3824__auto____10140) {
        return or__3824__auto____10140
      }else {
        var or__3824__auto____10141 = cljs.core._add_method["_"];
        if(or__3824__auto____10141) {
          return or__3824__auto____10141
        }else {
          throw cljs.core.missing_protocol.call(null, "IMultiFn.-add-method", mf);
        }
      }
    }().call(null, mf, dispatch_val, method)
  }
};
cljs.core._remove_method = function _remove_method(mf, dispatch_val) {
  if(function() {
    var and__3822__auto____10146 = mf;
    if(and__3822__auto____10146) {
      return mf.cljs$core$IMultiFn$_remove_method$arity$2
    }else {
      return and__3822__auto____10146
    }
  }()) {
    return mf.cljs$core$IMultiFn$_remove_method$arity$2(mf, dispatch_val)
  }else {
    var x__2369__auto____10147 = mf == null ? null : mf;
    return function() {
      var or__3824__auto____10148 = cljs.core._remove_method[goog.typeOf(x__2369__auto____10147)];
      if(or__3824__auto____10148) {
        return or__3824__auto____10148
      }else {
        var or__3824__auto____10149 = cljs.core._remove_method["_"];
        if(or__3824__auto____10149) {
          return or__3824__auto____10149
        }else {
          throw cljs.core.missing_protocol.call(null, "IMultiFn.-remove-method", mf);
        }
      }
    }().call(null, mf, dispatch_val)
  }
};
cljs.core._prefer_method = function _prefer_method(mf, dispatch_val, dispatch_val_y) {
  if(function() {
    var and__3822__auto____10154 = mf;
    if(and__3822__auto____10154) {
      return mf.cljs$core$IMultiFn$_prefer_method$arity$3
    }else {
      return and__3822__auto____10154
    }
  }()) {
    return mf.cljs$core$IMultiFn$_prefer_method$arity$3(mf, dispatch_val, dispatch_val_y)
  }else {
    var x__2369__auto____10155 = mf == null ? null : mf;
    return function() {
      var or__3824__auto____10156 = cljs.core._prefer_method[goog.typeOf(x__2369__auto____10155)];
      if(or__3824__auto____10156) {
        return or__3824__auto____10156
      }else {
        var or__3824__auto____10157 = cljs.core._prefer_method["_"];
        if(or__3824__auto____10157) {
          return or__3824__auto____10157
        }else {
          throw cljs.core.missing_protocol.call(null, "IMultiFn.-prefer-method", mf);
        }
      }
    }().call(null, mf, dispatch_val, dispatch_val_y)
  }
};
cljs.core._get_method = function _get_method(mf, dispatch_val) {
  if(function() {
    var and__3822__auto____10162 = mf;
    if(and__3822__auto____10162) {
      return mf.cljs$core$IMultiFn$_get_method$arity$2
    }else {
      return and__3822__auto____10162
    }
  }()) {
    return mf.cljs$core$IMultiFn$_get_method$arity$2(mf, dispatch_val)
  }else {
    var x__2369__auto____10163 = mf == null ? null : mf;
    return function() {
      var or__3824__auto____10164 = cljs.core._get_method[goog.typeOf(x__2369__auto____10163)];
      if(or__3824__auto____10164) {
        return or__3824__auto____10164
      }else {
        var or__3824__auto____10165 = cljs.core._get_method["_"];
        if(or__3824__auto____10165) {
          return or__3824__auto____10165
        }else {
          throw cljs.core.missing_protocol.call(null, "IMultiFn.-get-method", mf);
        }
      }
    }().call(null, mf, dispatch_val)
  }
};
cljs.core._methods = function _methods(mf) {
  if(function() {
    var and__3822__auto____10170 = mf;
    if(and__3822__auto____10170) {
      return mf.cljs$core$IMultiFn$_methods$arity$1
    }else {
      return and__3822__auto____10170
    }
  }()) {
    return mf.cljs$core$IMultiFn$_methods$arity$1(mf)
  }else {
    var x__2369__auto____10171 = mf == null ? null : mf;
    return function() {
      var or__3824__auto____10172 = cljs.core._methods[goog.typeOf(x__2369__auto____10171)];
      if(or__3824__auto____10172) {
        return or__3824__auto____10172
      }else {
        var or__3824__auto____10173 = cljs.core._methods["_"];
        if(or__3824__auto____10173) {
          return or__3824__auto____10173
        }else {
          throw cljs.core.missing_protocol.call(null, "IMultiFn.-methods", mf);
        }
      }
    }().call(null, mf)
  }
};
cljs.core._prefers = function _prefers(mf) {
  if(function() {
    var and__3822__auto____10178 = mf;
    if(and__3822__auto____10178) {
      return mf.cljs$core$IMultiFn$_prefers$arity$1
    }else {
      return and__3822__auto____10178
    }
  }()) {
    return mf.cljs$core$IMultiFn$_prefers$arity$1(mf)
  }else {
    var x__2369__auto____10179 = mf == null ? null : mf;
    return function() {
      var or__3824__auto____10180 = cljs.core._prefers[goog.typeOf(x__2369__auto____10179)];
      if(or__3824__auto____10180) {
        return or__3824__auto____10180
      }else {
        var or__3824__auto____10181 = cljs.core._prefers["_"];
        if(or__3824__auto____10181) {
          return or__3824__auto____10181
        }else {
          throw cljs.core.missing_protocol.call(null, "IMultiFn.-prefers", mf);
        }
      }
    }().call(null, mf)
  }
};
cljs.core._dispatch = function _dispatch(mf, args) {
  if(function() {
    var and__3822__auto____10186 = mf;
    if(and__3822__auto____10186) {
      return mf.cljs$core$IMultiFn$_dispatch$arity$2
    }else {
      return and__3822__auto____10186
    }
  }()) {
    return mf.cljs$core$IMultiFn$_dispatch$arity$2(mf, args)
  }else {
    var x__2369__auto____10187 = mf == null ? null : mf;
    return function() {
      var or__3824__auto____10188 = cljs.core._dispatch[goog.typeOf(x__2369__auto____10187)];
      if(or__3824__auto____10188) {
        return or__3824__auto____10188
      }else {
        var or__3824__auto____10189 = cljs.core._dispatch["_"];
        if(or__3824__auto____10189) {
          return or__3824__auto____10189
        }else {
          throw cljs.core.missing_protocol.call(null, "IMultiFn.-dispatch", mf);
        }
      }
    }().call(null, mf, args)
  }
};
cljs.core.do_dispatch = function do_dispatch(mf, dispatch_fn, args) {
  var dispatch_val__10192 = cljs.core.apply.call(null, dispatch_fn, args);
  var target_fn__10193 = cljs.core._get_method.call(null, mf, dispatch_val__10192);
  if(cljs.core.truth_(target_fn__10193)) {
  }else {
    throw new Error([cljs.core.str("No method in multimethod '"), cljs.core.str(cljs.core.name), cljs.core.str("' for dispatch value: "), cljs.core.str(dispatch_val__10192)].join(""));
  }
  return cljs.core.apply.call(null, target_fn__10193, args)
};
cljs.core.MultiFn = function(name, dispatch_fn, default_dispatch_val, hierarchy, method_table, prefer_table, method_cache, cached_hierarchy) {
  this.name = name;
  this.dispatch_fn = dispatch_fn;
  this.default_dispatch_val = default_dispatch_val;
  this.hierarchy = hierarchy;
  this.method_table = method_table;
  this.prefer_table = prefer_table;
  this.method_cache = method_cache;
  this.cached_hierarchy = cached_hierarchy;
  this.cljs$lang$protocol_mask$partition0$ = 4194304;
  this.cljs$lang$protocol_mask$partition1$ = 64
};
cljs.core.MultiFn.cljs$lang$type = true;
cljs.core.MultiFn.cljs$lang$ctorPrSeq = function(this__2315__auto__) {
  return cljs.core.list.call(null, "cljs.core/MultiFn")
};
cljs.core.MultiFn.prototype.cljs$core$IHash$_hash$arity$1 = function(this$) {
  var this__10194 = this;
  return goog.getUid(this$)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_reset$arity$1 = function(mf) {
  var this__10195 = this;
  cljs.core.swap_BANG_.call(null, this__10195.method_table, function(mf) {
    return cljs.core.ObjMap.EMPTY
  });
  cljs.core.swap_BANG_.call(null, this__10195.method_cache, function(mf) {
    return cljs.core.ObjMap.EMPTY
  });
  cljs.core.swap_BANG_.call(null, this__10195.prefer_table, function(mf) {
    return cljs.core.ObjMap.EMPTY
  });
  cljs.core.swap_BANG_.call(null, this__10195.cached_hierarchy, function(mf) {
    return null
  });
  return mf
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_add_method$arity$3 = function(mf, dispatch_val, method) {
  var this__10196 = this;
  cljs.core.swap_BANG_.call(null, this__10196.method_table, cljs.core.assoc, dispatch_val, method);
  cljs.core.reset_cache.call(null, this__10196.method_cache, this__10196.method_table, this__10196.cached_hierarchy, this__10196.hierarchy);
  return mf
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_remove_method$arity$2 = function(mf, dispatch_val) {
  var this__10197 = this;
  cljs.core.swap_BANG_.call(null, this__10197.method_table, cljs.core.dissoc, dispatch_val);
  cljs.core.reset_cache.call(null, this__10197.method_cache, this__10197.method_table, this__10197.cached_hierarchy, this__10197.hierarchy);
  return mf
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_get_method$arity$2 = function(mf, dispatch_val) {
  var this__10198 = this;
  if(cljs.core._EQ_.call(null, cljs.core.deref.call(null, this__10198.cached_hierarchy), cljs.core.deref.call(null, this__10198.hierarchy))) {
  }else {
    cljs.core.reset_cache.call(null, this__10198.method_cache, this__10198.method_table, this__10198.cached_hierarchy, this__10198.hierarchy)
  }
  var temp__3971__auto____10199 = cljs.core.deref.call(null, this__10198.method_cache).call(null, dispatch_val);
  if(cljs.core.truth_(temp__3971__auto____10199)) {
    var target_fn__10200 = temp__3971__auto____10199;
    return target_fn__10200
  }else {
    var temp__3971__auto____10201 = cljs.core.find_and_cache_best_method.call(null, this__10198.name, dispatch_val, this__10198.hierarchy, this__10198.method_table, this__10198.prefer_table, this__10198.method_cache, this__10198.cached_hierarchy);
    if(cljs.core.truth_(temp__3971__auto____10201)) {
      var target_fn__10202 = temp__3971__auto____10201;
      return target_fn__10202
    }else {
      return cljs.core.deref.call(null, this__10198.method_table).call(null, this__10198.default_dispatch_val)
    }
  }
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_prefer_method$arity$3 = function(mf, dispatch_val_x, dispatch_val_y) {
  var this__10203 = this;
  if(cljs.core.truth_(cljs.core.prefers_STAR_.call(null, dispatch_val_x, dispatch_val_y, this__10203.prefer_table))) {
    throw new Error([cljs.core.str("Preference conflict in multimethod '"), cljs.core.str(this__10203.name), cljs.core.str("': "), cljs.core.str(dispatch_val_y), cljs.core.str(" is already preferred to "), cljs.core.str(dispatch_val_x)].join(""));
  }else {
  }
  cljs.core.swap_BANG_.call(null, this__10203.prefer_table, function(old) {
    return cljs.core.assoc.call(null, old, dispatch_val_x, cljs.core.conj.call(null, cljs.core._lookup.call(null, old, dispatch_val_x, cljs.core.PersistentHashSet.EMPTY), dispatch_val_y))
  });
  return cljs.core.reset_cache.call(null, this__10203.method_cache, this__10203.method_table, this__10203.cached_hierarchy, this__10203.hierarchy)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_methods$arity$1 = function(mf) {
  var this__10204 = this;
  return cljs.core.deref.call(null, this__10204.method_table)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_prefers$arity$1 = function(mf) {
  var this__10205 = this;
  return cljs.core.deref.call(null, this__10205.prefer_table)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_dispatch$arity$2 = function(mf, args) {
  var this__10206 = this;
  return cljs.core.do_dispatch.call(null, mf, this__10206.dispatch_fn, args)
};
cljs.core.MultiFn;
cljs.core.MultiFn.prototype.call = function() {
  var G__10208__delegate = function(_, args) {
    var self__10207 = this;
    return cljs.core._dispatch.call(null, self__10207, args)
  };
  var G__10208 = function(_, var_args) {
    var args = null;
    if(goog.isDef(var_args)) {
      args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
    }
    return G__10208__delegate.call(this, _, args)
  };
  G__10208.cljs$lang$maxFixedArity = 1;
  G__10208.cljs$lang$applyTo = function(arglist__10209) {
    var _ = cljs.core.first(arglist__10209);
    var args = cljs.core.rest(arglist__10209);
    return G__10208__delegate(_, args)
  };
  G__10208.cljs$lang$arity$variadic = G__10208__delegate;
  return G__10208
}();
cljs.core.MultiFn.prototype.apply = function(_, args) {
  var self__10210 = this;
  return cljs.core._dispatch.call(null, self__10210, args)
};
cljs.core.remove_all_methods = function remove_all_methods(multifn) {
  return cljs.core._reset.call(null, multifn)
};
cljs.core.remove_method = function remove_method(multifn, dispatch_val) {
  return cljs.core._remove_method.call(null, multifn, dispatch_val)
};
cljs.core.prefer_method = function prefer_method(multifn, dispatch_val_x, dispatch_val_y) {
  return cljs.core._prefer_method.call(null, multifn, dispatch_val_x, dispatch_val_y)
};
cljs.core.methods$ = function methods$(multifn) {
  return cljs.core._methods.call(null, multifn)
};
cljs.core.get_method = function get_method(multifn, dispatch_val) {
  return cljs.core._get_method.call(null, multifn, dispatch_val)
};
cljs.core.prefers = function prefers(multifn) {
  return cljs.core._prefers.call(null, multifn)
};
cljs.core.UUID = function(uuid) {
  this.uuid = uuid;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 543162368
};
cljs.core.UUID.cljs$lang$type = true;
cljs.core.UUID.cljs$lang$ctorPrSeq = function(this__2315__auto__) {
  return cljs.core.list.call(null, "cljs.core/UUID")
};
cljs.core.UUID.prototype.cljs$core$IHash$_hash$arity$1 = function(this$) {
  var this__10211 = this;
  return goog.string.hashCode(cljs.core.pr_str.call(null, this$))
};
cljs.core.UUID.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(_10213, _) {
  var this__10212 = this;
  return cljs.core.list.call(null, [cljs.core.str('#uuid "'), cljs.core.str(this__10212.uuid), cljs.core.str('"')].join(""))
};
cljs.core.UUID.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(_, other) {
  var this__10214 = this;
  var and__3822__auto____10215 = cljs.core.instance_QMARK_.call(null, cljs.core.UUID, other);
  if(and__3822__auto____10215) {
    return this__10214.uuid === other.uuid
  }else {
    return and__3822__auto____10215
  }
};
cljs.core.UUID.prototype.toString = function() {
  var this__10216 = this;
  var this__10217 = this;
  return cljs.core.pr_str.call(null, this__10217)
};
cljs.core.UUID;
goog.provide("goog.userAgent");
goog.require("goog.string");
goog.userAgent.ASSUME_IE = false;
goog.userAgent.ASSUME_GECKO = false;
goog.userAgent.ASSUME_WEBKIT = false;
goog.userAgent.ASSUME_MOBILE_WEBKIT = false;
goog.userAgent.ASSUME_OPERA = false;
goog.userAgent.BROWSER_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_GECKO || goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_OPERA;
goog.userAgent.getUserAgentString = function() {
  return goog.global["navigator"] ? goog.global["navigator"].userAgent : null
};
goog.userAgent.getNavigator = function() {
  return goog.global["navigator"]
};
goog.userAgent.init_ = function() {
  goog.userAgent.detectedOpera_ = false;
  goog.userAgent.detectedIe_ = false;
  goog.userAgent.detectedWebkit_ = false;
  goog.userAgent.detectedMobile_ = false;
  goog.userAgent.detectedGecko_ = false;
  var ua;
  if(!goog.userAgent.BROWSER_KNOWN_ && (ua = goog.userAgent.getUserAgentString())) {
    var navigator = goog.userAgent.getNavigator();
    goog.userAgent.detectedOpera_ = ua.indexOf("Opera") == 0;
    goog.userAgent.detectedIe_ = !goog.userAgent.detectedOpera_ && ua.indexOf("MSIE") != -1;
    goog.userAgent.detectedWebkit_ = !goog.userAgent.detectedOpera_ && ua.indexOf("WebKit") != -1;
    goog.userAgent.detectedMobile_ = goog.userAgent.detectedWebkit_ && ua.indexOf("Mobile") != -1;
    goog.userAgent.detectedGecko_ = !goog.userAgent.detectedOpera_ && !goog.userAgent.detectedWebkit_ && navigator.product == "Gecko"
  }
};
if(!goog.userAgent.BROWSER_KNOWN_) {
  goog.userAgent.init_()
}
goog.userAgent.OPERA = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_OPERA : goog.userAgent.detectedOpera_;
goog.userAgent.IE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_IE : goog.userAgent.detectedIe_;
goog.userAgent.GECKO = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_GECKO : goog.userAgent.detectedGecko_;
goog.userAgent.WEBKIT = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_MOBILE_WEBKIT : goog.userAgent.detectedWebkit_;
goog.userAgent.MOBILE = goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.detectedMobile_;
goog.userAgent.SAFARI = goog.userAgent.WEBKIT;
goog.userAgent.determinePlatform_ = function() {
  var navigator = goog.userAgent.getNavigator();
  return navigator && navigator.platform || ""
};
goog.userAgent.PLATFORM = goog.userAgent.determinePlatform_();
goog.userAgent.ASSUME_MAC = false;
goog.userAgent.ASSUME_WINDOWS = false;
goog.userAgent.ASSUME_LINUX = false;
goog.userAgent.ASSUME_X11 = false;
goog.userAgent.PLATFORM_KNOWN_ = goog.userAgent.ASSUME_MAC || goog.userAgent.ASSUME_WINDOWS || goog.userAgent.ASSUME_LINUX || goog.userAgent.ASSUME_X11;
goog.userAgent.initPlatform_ = function() {
  goog.userAgent.detectedMac_ = goog.string.contains(goog.userAgent.PLATFORM, "Mac");
  goog.userAgent.detectedWindows_ = goog.string.contains(goog.userAgent.PLATFORM, "Win");
  goog.userAgent.detectedLinux_ = goog.string.contains(goog.userAgent.PLATFORM, "Linux");
  goog.userAgent.detectedX11_ = !!goog.userAgent.getNavigator() && goog.string.contains(goog.userAgent.getNavigator()["appVersion"] || "", "X11")
};
if(!goog.userAgent.PLATFORM_KNOWN_) {
  goog.userAgent.initPlatform_()
}
goog.userAgent.MAC = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_MAC : goog.userAgent.detectedMac_;
goog.userAgent.WINDOWS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_WINDOWS : goog.userAgent.detectedWindows_;
goog.userAgent.LINUX = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_LINUX : goog.userAgent.detectedLinux_;
goog.userAgent.X11 = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_X11 : goog.userAgent.detectedX11_;
goog.userAgent.determineVersion_ = function() {
  var version = "", re;
  if(goog.userAgent.OPERA && goog.global["opera"]) {
    var operaVersion = goog.global["opera"].version;
    version = typeof operaVersion == "function" ? operaVersion() : operaVersion
  }else {
    if(goog.userAgent.GECKO) {
      re = /rv\:([^\);]+)(\)|;)/
    }else {
      if(goog.userAgent.IE) {
        re = /MSIE\s+([^\);]+)(\)|;)/
      }else {
        if(goog.userAgent.WEBKIT) {
          re = /WebKit\/(\S+)/
        }
      }
    }
    if(re) {
      var arr = re.exec(goog.userAgent.getUserAgentString());
      version = arr ? arr[1] : ""
    }
  }
  if(goog.userAgent.IE) {
    var docMode = goog.userAgent.getDocumentMode_();
    if(docMode > parseFloat(version)) {
      return String(docMode)
    }
  }
  return version
};
goog.userAgent.getDocumentMode_ = function() {
  var doc = goog.global["document"];
  return doc ? doc["documentMode"] : undefined
};
goog.userAgent.VERSION = goog.userAgent.determineVersion_();
goog.userAgent.compare = function(v1, v2) {
  return goog.string.compareVersions(v1, v2)
};
goog.userAgent.isVersionCache_ = {};
goog.userAgent.isVersion = function(version) {
  return goog.userAgent.isVersionCache_[version] || (goog.userAgent.isVersionCache_[version] = goog.string.compareVersions(goog.userAgent.VERSION, version) >= 0)
};
goog.userAgent.isDocumentModeCache_ = {};
goog.userAgent.isDocumentMode = function(documentMode) {
  return goog.userAgent.isDocumentModeCache_[documentMode] || (goog.userAgent.isDocumentModeCache_[documentMode] = goog.userAgent.IE && document.documentMode && document.documentMode >= documentMode)
};
goog.provide("goog.events.EventType");
goog.require("goog.userAgent");
goog.events.EventType = {CLICK:"click", DBLCLICK:"dblclick", MOUSEDOWN:"mousedown", MOUSEUP:"mouseup", MOUSEOVER:"mouseover", MOUSEOUT:"mouseout", MOUSEMOVE:"mousemove", SELECTSTART:"selectstart", KEYPRESS:"keypress", KEYDOWN:"keydown", KEYUP:"keyup", BLUR:"blur", FOCUS:"focus", DEACTIVATE:"deactivate", FOCUSIN:goog.userAgent.IE ? "focusin" : "DOMFocusIn", FOCUSOUT:goog.userAgent.IE ? "focusout" : "DOMFocusOut", CHANGE:"change", SELECT:"select", SUBMIT:"submit", INPUT:"input", PROPERTYCHANGE:"propertychange", 
DRAGSTART:"dragstart", DRAGENTER:"dragenter", DRAGOVER:"dragover", DRAGLEAVE:"dragleave", DROP:"drop", TOUCHSTART:"touchstart", TOUCHMOVE:"touchmove", TOUCHEND:"touchend", TOUCHCANCEL:"touchcancel", CONTEXTMENU:"contextmenu", ERROR:"error", HELP:"help", LOAD:"load", LOSECAPTURE:"losecapture", READYSTATECHANGE:"readystatechange", RESIZE:"resize", SCROLL:"scroll", UNLOAD:"unload", HASHCHANGE:"hashchange", PAGEHIDE:"pagehide", PAGESHOW:"pageshow", POPSTATE:"popstate", COPY:"copy", PASTE:"paste", CUT:"cut", 
BEFORECOPY:"beforecopy", BEFORECUT:"beforecut", BEFOREPASTE:"beforepaste", MESSAGE:"message", CONNECT:"connect", TRANSITIONEND:goog.userAgent.WEBKIT ? "webkitTransitionEnd" : goog.userAgent.OPERA ? "oTransitionEnd" : "transitionend"};
goog.provide("goog.disposable.IDisposable");
goog.disposable.IDisposable = function() {
};
goog.disposable.IDisposable.prototype.dispose;
goog.disposable.IDisposable.prototype.isDisposed;
goog.provide("goog.Disposable");
goog.provide("goog.dispose");
goog.require("goog.disposable.IDisposable");
goog.Disposable = function() {
  if(goog.Disposable.ENABLE_MONITORING) {
    goog.Disposable.instances_[goog.getUid(this)] = this
  }
};
goog.Disposable.ENABLE_MONITORING = false;
goog.Disposable.instances_ = {};
goog.Disposable.getUndisposedObjects = function() {
  var ret = [];
  for(var id in goog.Disposable.instances_) {
    if(goog.Disposable.instances_.hasOwnProperty(id)) {
      ret.push(goog.Disposable.instances_[Number(id)])
    }
  }
  return ret
};
goog.Disposable.clearUndisposedObjects = function() {
  goog.Disposable.instances_ = {}
};
goog.Disposable.prototype.disposed_ = false;
goog.Disposable.prototype.dependentDisposables_;
goog.Disposable.prototype.isDisposed = function() {
  return this.disposed_
};
goog.Disposable.prototype.getDisposed = goog.Disposable.prototype.isDisposed;
goog.Disposable.prototype.dispose = function() {
  if(!this.disposed_) {
    this.disposed_ = true;
    this.disposeInternal();
    if(goog.Disposable.ENABLE_MONITORING) {
      var uid = goog.getUid(this);
      if(!goog.Disposable.instances_.hasOwnProperty(uid)) {
        throw Error(this + " did not call the goog.Disposable base " + "constructor or was disposed of after a clearUndisposedObjects " + "call");
      }
      delete goog.Disposable.instances_[uid]
    }
  }
};
goog.Disposable.prototype.registerDisposable = function(disposable) {
  if(!this.dependentDisposables_) {
    this.dependentDisposables_ = []
  }
  this.dependentDisposables_.push(disposable)
};
goog.Disposable.prototype.disposeInternal = function() {
  if(this.dependentDisposables_) {
    goog.disposeAll.apply(null, this.dependentDisposables_)
  }
};
goog.dispose = function(obj) {
  if(obj && typeof obj.dispose == "function") {
    obj.dispose()
  }
};
goog.disposeAll = function(var_args) {
  for(var i = 0, len = arguments.length;i < len;++i) {
    var disposable = arguments[i];
    if(goog.isArrayLike(disposable)) {
      goog.disposeAll.apply(null, disposable)
    }else {
      goog.dispose(disposable)
    }
  }
};
goog.provide("goog.debug.EntryPointMonitor");
goog.provide("goog.debug.entryPointRegistry");
goog.require("goog.asserts");
goog.debug.EntryPointMonitor = function() {
};
goog.debug.EntryPointMonitor.prototype.wrap;
goog.debug.EntryPointMonitor.prototype.unwrap;
goog.debug.entryPointRegistry.refList_ = [];
goog.debug.entryPointRegistry.monitors_ = [];
goog.debug.entryPointRegistry.monitorsMayExist_ = false;
goog.debug.entryPointRegistry.register = function(callback) {
  goog.debug.entryPointRegistry.refList_[goog.debug.entryPointRegistry.refList_.length] = callback;
  if(goog.debug.entryPointRegistry.monitorsMayExist_) {
    var monitors = goog.debug.entryPointRegistry.monitors_;
    for(var i = 0;i < monitors.length;i++) {
      callback(goog.bind(monitors[i].wrap, monitors[i]))
    }
  }
};
goog.debug.entryPointRegistry.monitorAll = function(monitor) {
  goog.debug.entryPointRegistry.monitorsMayExist_ = true;
  var transformer = goog.bind(monitor.wrap, monitor);
  for(var i = 0;i < goog.debug.entryPointRegistry.refList_.length;i++) {
    goog.debug.entryPointRegistry.refList_[i](transformer)
  }
  goog.debug.entryPointRegistry.monitors_.push(monitor)
};
goog.debug.entryPointRegistry.unmonitorAllIfPossible = function(monitor) {
  var monitors = goog.debug.entryPointRegistry.monitors_;
  goog.asserts.assert(monitor == monitors[monitors.length - 1], "Only the most recent monitor can be unwrapped.");
  var transformer = goog.bind(monitor.unwrap, monitor);
  for(var i = 0;i < goog.debug.entryPointRegistry.refList_.length;i++) {
    goog.debug.entryPointRegistry.refList_[i](transformer)
  }
  monitors.length--
};
goog.provide("goog.debug.errorHandlerWeakDep");
goog.debug.errorHandlerWeakDep = {protectEntryPoint:function(fn, opt_tracers) {
  return fn
}};
goog.provide("goog.events.BrowserFeature");
goog.require("goog.userAgent");
goog.events.BrowserFeature = {HAS_W3C_BUTTON:!goog.userAgent.IE || goog.userAgent.isDocumentMode(9), HAS_W3C_EVENT_SUPPORT:!goog.userAgent.IE || goog.userAgent.isDocumentMode(9), SET_KEY_CODE_TO_PREVENT_DEFAULT:goog.userAgent.IE && !goog.userAgent.isVersion("8")};
goog.provide("goog.events.Event");
goog.require("goog.Disposable");
goog.events.Event = function(type, opt_target) {
  goog.Disposable.call(this);
  this.type = type;
  this.target = opt_target;
  this.currentTarget = this.target
};
goog.inherits(goog.events.Event, goog.Disposable);
goog.events.Event.prototype.disposeInternal = function() {
  delete this.type;
  delete this.target;
  delete this.currentTarget
};
goog.events.Event.prototype.propagationStopped_ = false;
goog.events.Event.prototype.returnValue_ = true;
goog.events.Event.prototype.stopPropagation = function() {
  this.propagationStopped_ = true
};
goog.events.Event.prototype.preventDefault = function() {
  this.returnValue_ = false
};
goog.events.Event.stopPropagation = function(e) {
  e.stopPropagation()
};
goog.events.Event.preventDefault = function(e) {
  e.preventDefault()
};
goog.provide("goog.reflect");
goog.reflect.object = function(type, object) {
  return object
};
goog.reflect.sinkValue = function(x) {
  goog.reflect.sinkValue[" "](x);
  return x
};
goog.reflect.sinkValue[" "] = goog.nullFunction;
goog.reflect.canAccessProperty = function(obj, prop) {
  try {
    goog.reflect.sinkValue(obj[prop]);
    return true
  }catch(e) {
  }
  return false
};
goog.provide("goog.events.BrowserEvent");
goog.provide("goog.events.BrowserEvent.MouseButton");
goog.require("goog.events.BrowserFeature");
goog.require("goog.events.Event");
goog.require("goog.events.EventType");
goog.require("goog.reflect");
goog.require("goog.userAgent");
goog.events.BrowserEvent = function(opt_e, opt_currentTarget) {
  if(opt_e) {
    this.init(opt_e, opt_currentTarget)
  }
};
goog.inherits(goog.events.BrowserEvent, goog.events.Event);
goog.events.BrowserEvent.MouseButton = {LEFT:0, MIDDLE:1, RIGHT:2};
goog.events.BrowserEvent.IEButtonMap = [1, 4, 2];
goog.events.BrowserEvent.prototype.target = null;
goog.events.BrowserEvent.prototype.currentTarget;
goog.events.BrowserEvent.prototype.relatedTarget = null;
goog.events.BrowserEvent.prototype.offsetX = 0;
goog.events.BrowserEvent.prototype.offsetY = 0;
goog.events.BrowserEvent.prototype.clientX = 0;
goog.events.BrowserEvent.prototype.clientY = 0;
goog.events.BrowserEvent.prototype.screenX = 0;
goog.events.BrowserEvent.prototype.screenY = 0;
goog.events.BrowserEvent.prototype.button = 0;
goog.events.BrowserEvent.prototype.keyCode = 0;
goog.events.BrowserEvent.prototype.charCode = 0;
goog.events.BrowserEvent.prototype.ctrlKey = false;
goog.events.BrowserEvent.prototype.altKey = false;
goog.events.BrowserEvent.prototype.shiftKey = false;
goog.events.BrowserEvent.prototype.metaKey = false;
goog.events.BrowserEvent.prototype.state;
goog.events.BrowserEvent.prototype.platformModifierKey = false;
goog.events.BrowserEvent.prototype.event_ = null;
goog.events.BrowserEvent.prototype.init = function(e, opt_currentTarget) {
  var type = this.type = e.type;
  goog.events.Event.call(this, type);
  this.target = e.target || e.srcElement;
  this.currentTarget = opt_currentTarget;
  var relatedTarget = e.relatedTarget;
  if(relatedTarget) {
    if(goog.userAgent.GECKO) {
      if(!goog.reflect.canAccessProperty(relatedTarget, "nodeName")) {
        relatedTarget = null
      }
    }
  }else {
    if(type == goog.events.EventType.MOUSEOVER) {
      relatedTarget = e.fromElement
    }else {
      if(type == goog.events.EventType.MOUSEOUT) {
        relatedTarget = e.toElement
      }
    }
  }
  this.relatedTarget = relatedTarget;
  this.offsetX = e.offsetX !== undefined ? e.offsetX : e.layerX;
  this.offsetY = e.offsetY !== undefined ? e.offsetY : e.layerY;
  this.clientX = e.clientX !== undefined ? e.clientX : e.pageX;
  this.clientY = e.clientY !== undefined ? e.clientY : e.pageY;
  this.screenX = e.screenX || 0;
  this.screenY = e.screenY || 0;
  this.button = e.button;
  this.keyCode = e.keyCode || 0;
  this.charCode = e.charCode || (type == "keypress" ? e.keyCode : 0);
  this.ctrlKey = e.ctrlKey;
  this.altKey = e.altKey;
  this.shiftKey = e.shiftKey;
  this.metaKey = e.metaKey;
  this.platformModifierKey = goog.userAgent.MAC ? e.metaKey : e.ctrlKey;
  this.state = e.state;
  this.event_ = e;
  delete this.returnValue_;
  delete this.propagationStopped_
};
goog.events.BrowserEvent.prototype.isButton = function(button) {
  if(!goog.events.BrowserFeature.HAS_W3C_BUTTON) {
    if(this.type == "click") {
      return button == goog.events.BrowserEvent.MouseButton.LEFT
    }else {
      return!!(this.event_.button & goog.events.BrowserEvent.IEButtonMap[button])
    }
  }else {
    return this.event_.button == button
  }
};
goog.events.BrowserEvent.prototype.isMouseActionButton = function() {
  return this.isButton(goog.events.BrowserEvent.MouseButton.LEFT) && !(goog.userAgent.WEBKIT && goog.userAgent.MAC && this.ctrlKey)
};
goog.events.BrowserEvent.prototype.stopPropagation = function() {
  goog.events.BrowserEvent.superClass_.stopPropagation.call(this);
  if(this.event_.stopPropagation) {
    this.event_.stopPropagation()
  }else {
    this.event_.cancelBubble = true
  }
};
goog.events.BrowserEvent.prototype.preventDefault = function() {
  goog.events.BrowserEvent.superClass_.preventDefault.call(this);
  var be = this.event_;
  if(!be.preventDefault) {
    be.returnValue = false;
    if(goog.events.BrowserFeature.SET_KEY_CODE_TO_PREVENT_DEFAULT) {
      try {
        var VK_F1 = 112;
        var VK_F12 = 123;
        if(be.ctrlKey || be.keyCode >= VK_F1 && be.keyCode <= VK_F12) {
          be.keyCode = -1
        }
      }catch(ex) {
      }
    }
  }else {
    be.preventDefault()
  }
};
goog.events.BrowserEvent.prototype.getBrowserEvent = function() {
  return this.event_
};
goog.events.BrowserEvent.prototype.disposeInternal = function() {
  goog.events.BrowserEvent.superClass_.disposeInternal.call(this);
  this.event_ = null;
  this.target = null;
  this.currentTarget = null;
  this.relatedTarget = null
};
goog.provide("goog.events.EventWrapper");
goog.events.EventWrapper = function() {
};
goog.events.EventWrapper.prototype.listen = function(src, listener, opt_capt, opt_scope, opt_eventHandler) {
};
goog.events.EventWrapper.prototype.unlisten = function(src, listener, opt_capt, opt_scope, opt_eventHandler) {
};
goog.provide("goog.events.Listener");
goog.events.Listener = function() {
};
goog.events.Listener.counter_ = 0;
goog.events.Listener.prototype.isFunctionListener_;
goog.events.Listener.prototype.listener;
goog.events.Listener.prototype.proxy;
goog.events.Listener.prototype.src;
goog.events.Listener.prototype.type;
goog.events.Listener.prototype.capture;
goog.events.Listener.prototype.handler;
goog.events.Listener.prototype.key = 0;
goog.events.Listener.prototype.removed = false;
goog.events.Listener.prototype.callOnce = false;
goog.events.Listener.prototype.init = function(listener, proxy, src, type, capture, opt_handler) {
  if(goog.isFunction(listener)) {
    this.isFunctionListener_ = true
  }else {
    if(listener && listener.handleEvent && goog.isFunction(listener.handleEvent)) {
      this.isFunctionListener_ = false
    }else {
      throw Error("Invalid listener argument");
    }
  }
  this.listener = listener;
  this.proxy = proxy;
  this.src = src;
  this.type = type;
  this.capture = !!capture;
  this.handler = opt_handler;
  this.callOnce = false;
  this.key = ++goog.events.Listener.counter_;
  this.removed = false
};
goog.events.Listener.prototype.handleEvent = function(eventObject) {
  if(this.isFunctionListener_) {
    return this.listener.call(this.handler || this.src, eventObject)
  }
  return this.listener.handleEvent.call(this.listener, eventObject)
};
goog.provide("goog.events");
goog.require("goog.array");
goog.require("goog.debug.entryPointRegistry");
goog.require("goog.debug.errorHandlerWeakDep");
goog.require("goog.events.BrowserEvent");
goog.require("goog.events.BrowserFeature");
goog.require("goog.events.Event");
goog.require("goog.events.EventWrapper");
goog.require("goog.events.Listener");
goog.require("goog.object");
goog.require("goog.userAgent");
goog.events.ASSUME_GOOD_GC = false;
goog.events.listeners_ = {};
goog.events.listenerTree_ = {};
goog.events.sources_ = {};
goog.events.onString_ = "on";
goog.events.onStringMap_ = {};
goog.events.keySeparator_ = "_";
goog.events.listen = function(src, type, listener, opt_capt, opt_handler) {
  if(!type) {
    throw Error("Invalid event type");
  }else {
    if(goog.isArray(type)) {
      for(var i = 0;i < type.length;i++) {
        goog.events.listen(src, type[i], listener, opt_capt, opt_handler)
      }
      return null
    }else {
      var capture = !!opt_capt;
      var map = goog.events.listenerTree_;
      if(!(type in map)) {
        map[type] = {count_:0, remaining_:0}
      }
      map = map[type];
      if(!(capture in map)) {
        map[capture] = {count_:0, remaining_:0};
        map.count_++
      }
      map = map[capture];
      var srcUid = goog.getUid(src);
      var listenerArray, listenerObj;
      map.remaining_++;
      if(!map[srcUid]) {
        listenerArray = map[srcUid] = [];
        map.count_++
      }else {
        listenerArray = map[srcUid];
        for(var i = 0;i < listenerArray.length;i++) {
          listenerObj = listenerArray[i];
          if(listenerObj.listener == listener && listenerObj.handler == opt_handler) {
            if(listenerObj.removed) {
              break
            }
            return listenerArray[i].key
          }
        }
      }
      var proxy = goog.events.getProxy();
      proxy.src = src;
      listenerObj = new goog.events.Listener;
      listenerObj.init(listener, proxy, src, type, capture, opt_handler);
      var key = listenerObj.key;
      proxy.key = key;
      listenerArray.push(listenerObj);
      goog.events.listeners_[key] = listenerObj;
      if(!goog.events.sources_[srcUid]) {
        goog.events.sources_[srcUid] = []
      }
      goog.events.sources_[srcUid].push(listenerObj);
      if(src.addEventListener) {
        if(src == goog.global || !src.customEvent_) {
          src.addEventListener(type, proxy, capture)
        }
      }else {
        src.attachEvent(goog.events.getOnString_(type), proxy)
      }
      return key
    }
  }
};
goog.events.getProxy = function() {
  var proxyCallbackFunction = goog.events.handleBrowserEvent_;
  var f = goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT ? function(eventObject) {
    return proxyCallbackFunction.call(f.src, f.key, eventObject)
  } : function(eventObject) {
    var v = proxyCallbackFunction.call(f.src, f.key, eventObject);
    if(!v) {
      return v
    }
  };
  return f
};
goog.events.listenOnce = function(src, type, listener, opt_capt, opt_handler) {
  if(goog.isArray(type)) {
    for(var i = 0;i < type.length;i++) {
      goog.events.listenOnce(src, type[i], listener, opt_capt, opt_handler)
    }
    return null
  }
  var key = goog.events.listen(src, type, listener, opt_capt, opt_handler);
  var listenerObj = goog.events.listeners_[key];
  listenerObj.callOnce = true;
  return key
};
goog.events.listenWithWrapper = function(src, wrapper, listener, opt_capt, opt_handler) {
  wrapper.listen(src, listener, opt_capt, opt_handler)
};
goog.events.unlisten = function(src, type, listener, opt_capt, opt_handler) {
  if(goog.isArray(type)) {
    for(var i = 0;i < type.length;i++) {
      goog.events.unlisten(src, type[i], listener, opt_capt, opt_handler)
    }
    return null
  }
  var capture = !!opt_capt;
  var listenerArray = goog.events.getListeners_(src, type, capture);
  if(!listenerArray) {
    return false
  }
  for(var i = 0;i < listenerArray.length;i++) {
    if(listenerArray[i].listener == listener && listenerArray[i].capture == capture && listenerArray[i].handler == opt_handler) {
      return goog.events.unlistenByKey(listenerArray[i].key)
    }
  }
  return false
};
goog.events.unlistenByKey = function(key) {
  if(!goog.events.listeners_[key]) {
    return false
  }
  var listener = goog.events.listeners_[key];
  if(listener.removed) {
    return false
  }
  var src = listener.src;
  var type = listener.type;
  var proxy = listener.proxy;
  var capture = listener.capture;
  if(src.removeEventListener) {
    if(src == goog.global || !src.customEvent_) {
      src.removeEventListener(type, proxy, capture)
    }
  }else {
    if(src.detachEvent) {
      src.detachEvent(goog.events.getOnString_(type), proxy)
    }
  }
  var srcUid = goog.getUid(src);
  var listenerArray = goog.events.listenerTree_[type][capture][srcUid];
  if(goog.events.sources_[srcUid]) {
    var sourcesArray = goog.events.sources_[srcUid];
    goog.array.remove(sourcesArray, listener);
    if(sourcesArray.length == 0) {
      delete goog.events.sources_[srcUid]
    }
  }
  listener.removed = true;
  listenerArray.needsCleanup_ = true;
  goog.events.cleanUp_(type, capture, srcUid, listenerArray);
  delete goog.events.listeners_[key];
  return true
};
goog.events.unlistenWithWrapper = function(src, wrapper, listener, opt_capt, opt_handler) {
  wrapper.unlisten(src, listener, opt_capt, opt_handler)
};
goog.events.cleanUp_ = function(type, capture, srcUid, listenerArray) {
  if(!listenerArray.locked_) {
    if(listenerArray.needsCleanup_) {
      for(var oldIndex = 0, newIndex = 0;oldIndex < listenerArray.length;oldIndex++) {
        if(listenerArray[oldIndex].removed) {
          var proxy = listenerArray[oldIndex].proxy;
          proxy.src = null;
          continue
        }
        if(oldIndex != newIndex) {
          listenerArray[newIndex] = listenerArray[oldIndex]
        }
        newIndex++
      }
      listenerArray.length = newIndex;
      listenerArray.needsCleanup_ = false;
      if(newIndex == 0) {
        delete goog.events.listenerTree_[type][capture][srcUid];
        goog.events.listenerTree_[type][capture].count_--;
        if(goog.events.listenerTree_[type][capture].count_ == 0) {
          delete goog.events.listenerTree_[type][capture];
          goog.events.listenerTree_[type].count_--
        }
        if(goog.events.listenerTree_[type].count_ == 0) {
          delete goog.events.listenerTree_[type]
        }
      }
    }
  }
};
goog.events.removeAll = function(opt_obj, opt_type, opt_capt) {
  var count = 0;
  var noObj = opt_obj == null;
  var noType = opt_type == null;
  var noCapt = opt_capt == null;
  opt_capt = !!opt_capt;
  if(!noObj) {
    var srcUid = goog.getUid(opt_obj);
    if(goog.events.sources_[srcUid]) {
      var sourcesArray = goog.events.sources_[srcUid];
      for(var i = sourcesArray.length - 1;i >= 0;i--) {
        var listener = sourcesArray[i];
        if((noType || opt_type == listener.type) && (noCapt || opt_capt == listener.capture)) {
          goog.events.unlistenByKey(listener.key);
          count++
        }
      }
    }
  }else {
    goog.object.forEach(goog.events.sources_, function(listeners) {
      for(var i = listeners.length - 1;i >= 0;i--) {
        var listener = listeners[i];
        if((noType || opt_type == listener.type) && (noCapt || opt_capt == listener.capture)) {
          goog.events.unlistenByKey(listener.key);
          count++
        }
      }
    })
  }
  return count
};
goog.events.getListeners = function(obj, type, capture) {
  return goog.events.getListeners_(obj, type, capture) || []
};
goog.events.getListeners_ = function(obj, type, capture) {
  var map = goog.events.listenerTree_;
  if(type in map) {
    map = map[type];
    if(capture in map) {
      map = map[capture];
      var objUid = goog.getUid(obj);
      if(map[objUid]) {
        return map[objUid]
      }
    }
  }
  return null
};
goog.events.getListener = function(src, type, listener, opt_capt, opt_handler) {
  var capture = !!opt_capt;
  var listenerArray = goog.events.getListeners_(src, type, capture);
  if(listenerArray) {
    for(var i = 0;i < listenerArray.length;i++) {
      if(!listenerArray[i].removed && listenerArray[i].listener == listener && listenerArray[i].capture == capture && listenerArray[i].handler == opt_handler) {
        return listenerArray[i]
      }
    }
  }
  return null
};
goog.events.hasListener = function(obj, opt_type, opt_capture) {
  var objUid = goog.getUid(obj);
  var listeners = goog.events.sources_[objUid];
  if(listeners) {
    var hasType = goog.isDef(opt_type);
    var hasCapture = goog.isDef(opt_capture);
    if(hasType && hasCapture) {
      var map = goog.events.listenerTree_[opt_type];
      return!!map && !!map[opt_capture] && objUid in map[opt_capture]
    }else {
      if(!(hasType || hasCapture)) {
        return true
      }else {
        return goog.array.some(listeners, function(listener) {
          return hasType && listener.type == opt_type || hasCapture && listener.capture == opt_capture
        })
      }
    }
  }
  return false
};
goog.events.expose = function(e) {
  var str = [];
  for(var key in e) {
    if(e[key] && e[key].id) {
      str.push(key + " = " + e[key] + " (" + e[key].id + ")")
    }else {
      str.push(key + " = " + e[key])
    }
  }
  return str.join("\n")
};
goog.events.getOnString_ = function(type) {
  if(type in goog.events.onStringMap_) {
    return goog.events.onStringMap_[type]
  }
  return goog.events.onStringMap_[type] = goog.events.onString_ + type
};
goog.events.fireListeners = function(obj, type, capture, eventObject) {
  var map = goog.events.listenerTree_;
  if(type in map) {
    map = map[type];
    if(capture in map) {
      return goog.events.fireListeners_(map[capture], obj, type, capture, eventObject)
    }
  }
  return true
};
goog.events.fireListeners_ = function(map, obj, type, capture, eventObject) {
  var retval = 1;
  var objUid = goog.getUid(obj);
  if(map[objUid]) {
    map.remaining_--;
    var listenerArray = map[objUid];
    if(!listenerArray.locked_) {
      listenerArray.locked_ = 1
    }else {
      listenerArray.locked_++
    }
    try {
      var length = listenerArray.length;
      for(var i = 0;i < length;i++) {
        var listener = listenerArray[i];
        if(listener && !listener.removed) {
          retval &= goog.events.fireListener(listener, eventObject) !== false
        }
      }
    }finally {
      listenerArray.locked_--;
      goog.events.cleanUp_(type, capture, objUid, listenerArray)
    }
  }
  return Boolean(retval)
};
goog.events.fireListener = function(listener, eventObject) {
  var rv = listener.handleEvent(eventObject);
  if(listener.callOnce) {
    goog.events.unlistenByKey(listener.key)
  }
  return rv
};
goog.events.getTotalListenerCount = function() {
  return goog.object.getCount(goog.events.listeners_)
};
goog.events.dispatchEvent = function(src, e) {
  var type = e.type || e;
  var map = goog.events.listenerTree_;
  if(!(type in map)) {
    return true
  }
  if(goog.isString(e)) {
    e = new goog.events.Event(e, src)
  }else {
    if(!(e instanceof goog.events.Event)) {
      var oldEvent = e;
      e = new goog.events.Event(type, src);
      goog.object.extend(e, oldEvent)
    }else {
      e.target = e.target || src
    }
  }
  var rv = 1, ancestors;
  map = map[type];
  var hasCapture = true in map;
  var targetsMap;
  if(hasCapture) {
    ancestors = [];
    for(var parent = src;parent;parent = parent.getParentEventTarget()) {
      ancestors.push(parent)
    }
    targetsMap = map[true];
    targetsMap.remaining_ = targetsMap.count_;
    for(var i = ancestors.length - 1;!e.propagationStopped_ && i >= 0 && targetsMap.remaining_;i--) {
      e.currentTarget = ancestors[i];
      rv &= goog.events.fireListeners_(targetsMap, ancestors[i], e.type, true, e) && e.returnValue_ != false
    }
  }
  var hasBubble = false in map;
  if(hasBubble) {
    targetsMap = map[false];
    targetsMap.remaining_ = targetsMap.count_;
    if(hasCapture) {
      for(var i = 0;!e.propagationStopped_ && i < ancestors.length && targetsMap.remaining_;i++) {
        e.currentTarget = ancestors[i];
        rv &= goog.events.fireListeners_(targetsMap, ancestors[i], e.type, false, e) && e.returnValue_ != false
      }
    }else {
      for(var current = src;!e.propagationStopped_ && current && targetsMap.remaining_;current = current.getParentEventTarget()) {
        e.currentTarget = current;
        rv &= goog.events.fireListeners_(targetsMap, current, e.type, false, e) && e.returnValue_ != false
      }
    }
  }
  return Boolean(rv)
};
goog.events.protectBrowserEventEntryPoint = function(errorHandler) {
  goog.events.handleBrowserEvent_ = errorHandler.protectEntryPoint(goog.events.handleBrowserEvent_)
};
goog.events.handleBrowserEvent_ = function(key, opt_evt) {
  if(!goog.events.listeners_[key]) {
    return true
  }
  var listener = goog.events.listeners_[key];
  var type = listener.type;
  var map = goog.events.listenerTree_;
  if(!(type in map)) {
    return true
  }
  map = map[type];
  var retval, targetsMap;
  if(!goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT) {
    var ieEvent = opt_evt || goog.getObjectByName("window.event");
    var hasCapture = true in map;
    var hasBubble = false in map;
    if(hasCapture) {
      if(goog.events.isMarkedIeEvent_(ieEvent)) {
        return true
      }
      goog.events.markIeEvent_(ieEvent)
    }
    var evt = new goog.events.BrowserEvent;
    evt.init(ieEvent, this);
    retval = true;
    try {
      if(hasCapture) {
        var ancestors = [];
        for(var parent = evt.currentTarget;parent;parent = parent.parentNode) {
          ancestors.push(parent)
        }
        targetsMap = map[true];
        targetsMap.remaining_ = targetsMap.count_;
        for(var i = ancestors.length - 1;!evt.propagationStopped_ && i >= 0 && targetsMap.remaining_;i--) {
          evt.currentTarget = ancestors[i];
          retval &= goog.events.fireListeners_(targetsMap, ancestors[i], type, true, evt)
        }
        if(hasBubble) {
          targetsMap = map[false];
          targetsMap.remaining_ = targetsMap.count_;
          for(var i = 0;!evt.propagationStopped_ && i < ancestors.length && targetsMap.remaining_;i++) {
            evt.currentTarget = ancestors[i];
            retval &= goog.events.fireListeners_(targetsMap, ancestors[i], type, false, evt)
          }
        }
      }else {
        retval = goog.events.fireListener(listener, evt)
      }
    }finally {
      if(ancestors) {
        ancestors.length = 0
      }
      evt.dispose()
    }
    return retval
  }
  var be = new goog.events.BrowserEvent(opt_evt, this);
  try {
    retval = goog.events.fireListener(listener, be)
  }finally {
    be.dispose()
  }
  return retval
};
goog.events.markIeEvent_ = function(e) {
  var useReturnValue = false;
  if(e.keyCode == 0) {
    try {
      e.keyCode = -1;
      return
    }catch(ex) {
      useReturnValue = true
    }
  }
  if(useReturnValue || e.returnValue == undefined) {
    e.returnValue = true
  }
};
goog.events.isMarkedIeEvent_ = function(e) {
  return e.keyCode < 0 || e.returnValue != undefined
};
goog.events.uniqueIdCounter_ = 0;
goog.events.getUniqueId = function(identifier) {
  return identifier + "_" + goog.events.uniqueIdCounter_++
};
goog.debug.entryPointRegistry.register(function(transformer) {
  goog.events.handleBrowserEvent_ = transformer(goog.events.handleBrowserEvent_)
});
goog.provide("goog.events.EventTarget");
goog.require("goog.Disposable");
goog.require("goog.events");
goog.events.EventTarget = function() {
  goog.Disposable.call(this)
};
goog.inherits(goog.events.EventTarget, goog.Disposable);
goog.events.EventTarget.prototype.customEvent_ = true;
goog.events.EventTarget.prototype.parentEventTarget_ = null;
goog.events.EventTarget.prototype.getParentEventTarget = function() {
  return this.parentEventTarget_
};
goog.events.EventTarget.prototype.setParentEventTarget = function(parent) {
  this.parentEventTarget_ = parent
};
goog.events.EventTarget.prototype.addEventListener = function(type, handler, opt_capture, opt_handlerScope) {
  goog.events.listen(this, type, handler, opt_capture, opt_handlerScope)
};
goog.events.EventTarget.prototype.removeEventListener = function(type, handler, opt_capture, opt_handlerScope) {
  goog.events.unlisten(this, type, handler, opt_capture, opt_handlerScope)
};
goog.events.EventTarget.prototype.dispatchEvent = function(e) {
  return goog.events.dispatchEvent(this, e)
};
goog.events.EventTarget.prototype.disposeInternal = function() {
  goog.events.EventTarget.superClass_.disposeInternal.call(this);
  goog.events.removeAll(this);
  this.parentEventTarget_ = null
};
goog.provide("clojure.browser.event");
goog.require("cljs.core");
goog.require("goog.events.EventType");
goog.require("goog.events.EventTarget");
goog.require("goog.events");
clojure.browser.event.EventType = {};
clojure.browser.event.event_types = function event_types(this$) {
  if(function() {
    var and__3822__auto____10375 = this$;
    if(and__3822__auto____10375) {
      return this$.clojure$browser$event$EventType$event_types$arity$1
    }else {
      return and__3822__auto____10375
    }
  }()) {
    return this$.clojure$browser$event$EventType$event_types$arity$1(this$)
  }else {
    var x__2369__auto____10376 = this$ == null ? null : this$;
    return function() {
      var or__3824__auto____10377 = clojure.browser.event.event_types[goog.typeOf(x__2369__auto____10376)];
      if(or__3824__auto____10377) {
        return or__3824__auto____10377
      }else {
        var or__3824__auto____10378 = clojure.browser.event.event_types["_"];
        if(or__3824__auto____10378) {
          return or__3824__auto____10378
        }else {
          throw cljs.core.missing_protocol.call(null, "EventType.event-types", this$);
        }
      }
    }().call(null, this$)
  }
};
Element.prototype.clojure$browser$event$EventType$ = true;
Element.prototype.clojure$browser$event$EventType$event_types$arity$1 = function(this$) {
  return cljs.core.into.call(null, cljs.core.ObjMap.EMPTY, cljs.core.map.call(null, function(p__10379) {
    var vec__10380__10381 = p__10379;
    var k__10382 = cljs.core.nth.call(null, vec__10380__10381, 0, null);
    var v__10383 = cljs.core.nth.call(null, vec__10380__10381, 1, null);
    return cljs.core.PersistentVector.fromArray([cljs.core.keyword.call(null, k__10382.toLowerCase()), v__10383], true)
  }, cljs.core.merge.call(null, cljs.core.js__GT_clj.call(null, goog.events.EventType))))
};
goog.events.EventTarget.prototype.clojure$browser$event$EventType$ = true;
goog.events.EventTarget.prototype.clojure$browser$event$EventType$event_types$arity$1 = function(this$) {
  return cljs.core.into.call(null, cljs.core.ObjMap.EMPTY, cljs.core.map.call(null, function(p__10384) {
    var vec__10385__10386 = p__10384;
    var k__10387 = cljs.core.nth.call(null, vec__10385__10386, 0, null);
    var v__10388 = cljs.core.nth.call(null, vec__10385__10386, 1, null);
    return cljs.core.PersistentVector.fromArray([cljs.core.keyword.call(null, k__10387.toLowerCase()), v__10388], true)
  }, cljs.core.merge.call(null, cljs.core.js__GT_clj.call(null, goog.events.EventType))))
};
clojure.browser.event.listen = function() {
  var listen = null;
  var listen__3 = function(src, type, fn) {
    return listen.call(null, src, type, fn, false)
  };
  var listen__4 = function(src, type, fn, capture_QMARK_) {
    return goog.events.listen(src, cljs.core._lookup.call(null, clojure.browser.event.event_types.call(null, src), type, type), fn, capture_QMARK_)
  };
  listen = function(src, type, fn, capture_QMARK_) {
    switch(arguments.length) {
      case 3:
        return listen__3.call(this, src, type, fn);
      case 4:
        return listen__4.call(this, src, type, fn, capture_QMARK_)
    }
    throw"Invalid arity: " + arguments.length;
  };
  listen.cljs$lang$arity$3 = listen__3;
  listen.cljs$lang$arity$4 = listen__4;
  return listen
}();
clojure.browser.event.listen_once = function() {
  var listen_once = null;
  var listen_once__3 = function(src, type, fn) {
    return listen_once.call(null, src, type, fn, false)
  };
  var listen_once__4 = function(src, type, fn, capture_QMARK_) {
    return goog.events.listenOnce(src, cljs.core._lookup.call(null, clojure.browser.event.event_types.call(null, src), type, type), fn, capture_QMARK_)
  };
  listen_once = function(src, type, fn, capture_QMARK_) {
    switch(arguments.length) {
      case 3:
        return listen_once__3.call(this, src, type, fn);
      case 4:
        return listen_once__4.call(this, src, type, fn, capture_QMARK_)
    }
    throw"Invalid arity: " + arguments.length;
  };
  listen_once.cljs$lang$arity$3 = listen_once__3;
  listen_once.cljs$lang$arity$4 = listen_once__4;
  return listen_once
}();
clojure.browser.event.unlisten = function() {
  var unlisten = null;
  var unlisten__3 = function(src, type, fn) {
    return unlisten.call(null, src, type, fn, false)
  };
  var unlisten__4 = function(src, type, fn, capture_QMARK_) {
    return goog.events.unlisten(src, cljs.core._lookup.call(null, clojure.browser.event.event_types.call(null, src), type, type), fn, capture_QMARK_)
  };
  unlisten = function(src, type, fn, capture_QMARK_) {
    switch(arguments.length) {
      case 3:
        return unlisten__3.call(this, src, type, fn);
      case 4:
        return unlisten__4.call(this, src, type, fn, capture_QMARK_)
    }
    throw"Invalid arity: " + arguments.length;
  };
  unlisten.cljs$lang$arity$3 = unlisten__3;
  unlisten.cljs$lang$arity$4 = unlisten__4;
  return unlisten
}();
clojure.browser.event.unlisten_by_key = function unlisten_by_key(key) {
  return goog.events.unlistenByKey(key)
};
clojure.browser.event.dispatch_event = function dispatch_event(src, event) {
  return goog.events.dispatchEvent(src, event)
};
clojure.browser.event.expose = function expose(e) {
  return goog.events.expose(e)
};
clojure.browser.event.fire_listeners = function fire_listeners(obj, type, capture, event) {
  return null
};
clojure.browser.event.total_listener_count = function total_listener_count() {
  return goog.events.getTotalListenerCount()
};
clojure.browser.event.get_listener = function get_listener(src, type, listener, opt_capt, opt_handler) {
  return null
};
clojure.browser.event.all_listeners = function all_listeners(obj, type, capture) {
  return null
};
clojure.browser.event.unique_event_id = function unique_event_id(event_type) {
  return null
};
clojure.browser.event.has_listener = function has_listener(obj, opt_type, opt_capture) {
  return null
};
clojure.browser.event.remove_all = function remove_all(opt_obj, opt_type, opt_capt) {
  return null
};
goog.provide("goog.json");
goog.provide("goog.json.Serializer");
goog.json.isValid_ = function(s) {
  if(/^\s*$/.test(s)) {
    return false
  }
  var backslashesRe = /\\["\\\/bfnrtu]/g;
  var simpleValuesRe = /"[^"\\\n\r\u2028\u2029\x00-\x08\x10-\x1f\x80-\x9f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
  var openBracketsRe = /(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g;
  var remainderRe = /^[\],:{}\s\u2028\u2029]*$/;
  return remainderRe.test(s.replace(backslashesRe, "@").replace(simpleValuesRe, "]").replace(openBracketsRe, ""))
};
goog.json.parse = function(s) {
  var o = String(s);
  if(goog.json.isValid_(o)) {
    try {
      return eval("(" + o + ")")
    }catch(ex) {
    }
  }
  throw Error("Invalid JSON string: " + o);
};
goog.json.unsafeParse = function(s) {
  return eval("(" + s + ")")
};
goog.json.Replacer;
goog.json.serialize = function(object, opt_replacer) {
  return(new goog.json.Serializer(opt_replacer)).serialize(object)
};
goog.json.Serializer = function(opt_replacer) {
  this.replacer_ = opt_replacer
};
goog.json.Serializer.prototype.serialize = function(object) {
  var sb = [];
  this.serialize_(object, sb);
  return sb.join("")
};
goog.json.Serializer.prototype.serialize_ = function(object, sb) {
  switch(typeof object) {
    case "string":
      this.serializeString_(object, sb);
      break;
    case "number":
      this.serializeNumber_(object, sb);
      break;
    case "boolean":
      sb.push(object);
      break;
    case "undefined":
      sb.push("null");
      break;
    case "object":
      if(object == null) {
        sb.push("null");
        break
      }
      if(goog.isArray(object)) {
        this.serializeArray_(object, sb);
        break
      }
      this.serializeObject_(object, sb);
      break;
    case "function":
      break;
    default:
      throw Error("Unknown type: " + typeof object);
  }
};
goog.json.Serializer.charToJsonCharCache_ = {'"':'\\"', "\\":"\\\\", "/":"\\/", "\u0008":"\\b", "\u000c":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\u000b"};
goog.json.Serializer.charsToReplace_ = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;
goog.json.Serializer.prototype.serializeString_ = function(s, sb) {
  sb.push('"', s.replace(goog.json.Serializer.charsToReplace_, function(c) {
    if(c in goog.json.Serializer.charToJsonCharCache_) {
      return goog.json.Serializer.charToJsonCharCache_[c]
    }
    var cc = c.charCodeAt(0);
    var rv = "\\u";
    if(cc < 16) {
      rv += "000"
    }else {
      if(cc < 256) {
        rv += "00"
      }else {
        if(cc < 4096) {
          rv += "0"
        }
      }
    }
    return goog.json.Serializer.charToJsonCharCache_[c] = rv + cc.toString(16)
  }), '"')
};
goog.json.Serializer.prototype.serializeNumber_ = function(n, sb) {
  sb.push(isFinite(n) && !isNaN(n) ? n : "null")
};
goog.json.Serializer.prototype.serializeArray_ = function(arr, sb) {
  var l = arr.length;
  sb.push("[");
  var sep = "";
  for(var i = 0;i < l;i++) {
    sb.push(sep);
    var value = arr[i];
    this.serialize_(this.replacer_ ? this.replacer_.call(arr, String(i), value) : value, sb);
    sep = ","
  }
  sb.push("]")
};
goog.json.Serializer.prototype.serializeObject_ = function(obj, sb) {
  sb.push("{");
  var sep = "";
  for(var key in obj) {
    if(Object.prototype.hasOwnProperty.call(obj, key)) {
      var value = obj[key];
      if(typeof value != "function") {
        sb.push(sep);
        this.serializeString_(key, sb);
        sb.push(":");
        this.serialize_(this.replacer_ ? this.replacer_.call(obj, key, value) : value, sb);
        sep = ","
      }
    }
  }
  sb.push("}")
};
goog.provide("goog.structs");
goog.require("goog.array");
goog.require("goog.object");
goog.structs.getCount = function(col) {
  if(typeof col.getCount == "function") {
    return col.getCount()
  }
  if(goog.isArrayLike(col) || goog.isString(col)) {
    return col.length
  }
  return goog.object.getCount(col)
};
goog.structs.getValues = function(col) {
  if(typeof col.getValues == "function") {
    return col.getValues()
  }
  if(goog.isString(col)) {
    return col.split("")
  }
  if(goog.isArrayLike(col)) {
    var rv = [];
    var l = col.length;
    for(var i = 0;i < l;i++) {
      rv.push(col[i])
    }
    return rv
  }
  return goog.object.getValues(col)
};
goog.structs.getKeys = function(col) {
  if(typeof col.getKeys == "function") {
    return col.getKeys()
  }
  if(typeof col.getValues == "function") {
    return undefined
  }
  if(goog.isArrayLike(col) || goog.isString(col)) {
    var rv = [];
    var l = col.length;
    for(var i = 0;i < l;i++) {
      rv.push(i)
    }
    return rv
  }
  return goog.object.getKeys(col)
};
goog.structs.contains = function(col, val) {
  if(typeof col.contains == "function") {
    return col.contains(val)
  }
  if(typeof col.containsValue == "function") {
    return col.containsValue(val)
  }
  if(goog.isArrayLike(col) || goog.isString(col)) {
    return goog.array.contains(col, val)
  }
  return goog.object.containsValue(col, val)
};
goog.structs.isEmpty = function(col) {
  if(typeof col.isEmpty == "function") {
    return col.isEmpty()
  }
  if(goog.isArrayLike(col) || goog.isString(col)) {
    return goog.array.isEmpty(col)
  }
  return goog.object.isEmpty(col)
};
goog.structs.clear = function(col) {
  if(typeof col.clear == "function") {
    col.clear()
  }else {
    if(goog.isArrayLike(col)) {
      goog.array.clear(col)
    }else {
      goog.object.clear(col)
    }
  }
};
goog.structs.forEach = function(col, f, opt_obj) {
  if(typeof col.forEach == "function") {
    col.forEach(f, opt_obj)
  }else {
    if(goog.isArrayLike(col) || goog.isString(col)) {
      goog.array.forEach(col, f, opt_obj)
    }else {
      var keys = goog.structs.getKeys(col);
      var values = goog.structs.getValues(col);
      var l = values.length;
      for(var i = 0;i < l;i++) {
        f.call(opt_obj, values[i], keys && keys[i], col)
      }
    }
  }
};
goog.structs.filter = function(col, f, opt_obj) {
  if(typeof col.filter == "function") {
    return col.filter(f, opt_obj)
  }
  if(goog.isArrayLike(col) || goog.isString(col)) {
    return goog.array.filter(col, f, opt_obj)
  }
  var rv;
  var keys = goog.structs.getKeys(col);
  var values = goog.structs.getValues(col);
  var l = values.length;
  if(keys) {
    rv = {};
    for(var i = 0;i < l;i++) {
      if(f.call(opt_obj, values[i], keys[i], col)) {
        rv[keys[i]] = values[i]
      }
    }
  }else {
    rv = [];
    for(var i = 0;i < l;i++) {
      if(f.call(opt_obj, values[i], undefined, col)) {
        rv.push(values[i])
      }
    }
  }
  return rv
};
goog.structs.map = function(col, f, opt_obj) {
  if(typeof col.map == "function") {
    return col.map(f, opt_obj)
  }
  if(goog.isArrayLike(col) || goog.isString(col)) {
    return goog.array.map(col, f, opt_obj)
  }
  var rv;
  var keys = goog.structs.getKeys(col);
  var values = goog.structs.getValues(col);
  var l = values.length;
  if(keys) {
    rv = {};
    for(var i = 0;i < l;i++) {
      rv[keys[i]] = f.call(opt_obj, values[i], keys[i], col)
    }
  }else {
    rv = [];
    for(var i = 0;i < l;i++) {
      rv[i] = f.call(opt_obj, values[i], undefined, col)
    }
  }
  return rv
};
goog.structs.some = function(col, f, opt_obj) {
  if(typeof col.some == "function") {
    return col.some(f, opt_obj)
  }
  if(goog.isArrayLike(col) || goog.isString(col)) {
    return goog.array.some(col, f, opt_obj)
  }
  var keys = goog.structs.getKeys(col);
  var values = goog.structs.getValues(col);
  var l = values.length;
  for(var i = 0;i < l;i++) {
    if(f.call(opt_obj, values[i], keys && keys[i], col)) {
      return true
    }
  }
  return false
};
goog.structs.every = function(col, f, opt_obj) {
  if(typeof col.every == "function") {
    return col.every(f, opt_obj)
  }
  if(goog.isArrayLike(col) || goog.isString(col)) {
    return goog.array.every(col, f, opt_obj)
  }
  var keys = goog.structs.getKeys(col);
  var values = goog.structs.getValues(col);
  var l = values.length;
  for(var i = 0;i < l;i++) {
    if(!f.call(opt_obj, values[i], keys && keys[i], col)) {
      return false
    }
  }
  return true
};
goog.provide("goog.iter");
goog.provide("goog.iter.Iterator");
goog.provide("goog.iter.StopIteration");
goog.require("goog.array");
goog.require("goog.asserts");
goog.iter.Iterable;
if("StopIteration" in goog.global) {
  goog.iter.StopIteration = goog.global["StopIteration"]
}else {
  goog.iter.StopIteration = Error("StopIteration")
}
goog.iter.Iterator = function() {
};
goog.iter.Iterator.prototype.next = function() {
  throw goog.iter.StopIteration;
};
goog.iter.Iterator.prototype.__iterator__ = function(opt_keys) {
  return this
};
goog.iter.toIterator = function(iterable) {
  if(iterable instanceof goog.iter.Iterator) {
    return iterable
  }
  if(typeof iterable.__iterator__ == "function") {
    return iterable.__iterator__(false)
  }
  if(goog.isArrayLike(iterable)) {
    var i = 0;
    var newIter = new goog.iter.Iterator;
    newIter.next = function() {
      while(true) {
        if(i >= iterable.length) {
          throw goog.iter.StopIteration;
        }
        if(!(i in iterable)) {
          i++;
          continue
        }
        return iterable[i++]
      }
    };
    return newIter
  }
  throw Error("Not implemented");
};
goog.iter.forEach = function(iterable, f, opt_obj) {
  if(goog.isArrayLike(iterable)) {
    try {
      goog.array.forEach(iterable, f, opt_obj)
    }catch(ex) {
      if(ex !== goog.iter.StopIteration) {
        throw ex;
      }
    }
  }else {
    iterable = goog.iter.toIterator(iterable);
    try {
      while(true) {
        f.call(opt_obj, iterable.next(), undefined, iterable)
      }
    }catch(ex) {
      if(ex !== goog.iter.StopIteration) {
        throw ex;
      }
    }
  }
};
goog.iter.filter = function(iterable, f, opt_obj) {
  iterable = goog.iter.toIterator(iterable);
  var newIter = new goog.iter.Iterator;
  newIter.next = function() {
    while(true) {
      var val = iterable.next();
      if(f.call(opt_obj, val, undefined, iterable)) {
        return val
      }
    }
  };
  return newIter
};
goog.iter.range = function(startOrStop, opt_stop, opt_step) {
  var start = 0;
  var stop = startOrStop;
  var step = opt_step || 1;
  if(arguments.length > 1) {
    start = startOrStop;
    stop = opt_stop
  }
  if(step == 0) {
    throw Error("Range step argument must not be zero");
  }
  var newIter = new goog.iter.Iterator;
  newIter.next = function() {
    if(step > 0 && start >= stop || step < 0 && start <= stop) {
      throw goog.iter.StopIteration;
    }
    var rv = start;
    start += step;
    return rv
  };
  return newIter
};
goog.iter.join = function(iterable, deliminator) {
  return goog.iter.toArray(iterable).join(deliminator)
};
goog.iter.map = function(iterable, f, opt_obj) {
  iterable = goog.iter.toIterator(iterable);
  var newIter = new goog.iter.Iterator;
  newIter.next = function() {
    while(true) {
      var val = iterable.next();
      return f.call(opt_obj, val, undefined, iterable)
    }
  };
  return newIter
};
goog.iter.reduce = function(iterable, f, val, opt_obj) {
  var rval = val;
  goog.iter.forEach(iterable, function(val) {
    rval = f.call(opt_obj, rval, val)
  });
  return rval
};
goog.iter.some = function(iterable, f, opt_obj) {
  iterable = goog.iter.toIterator(iterable);
  try {
    while(true) {
      if(f.call(opt_obj, iterable.next(), undefined, iterable)) {
        return true
      }
    }
  }catch(ex) {
    if(ex !== goog.iter.StopIteration) {
      throw ex;
    }
  }
  return false
};
goog.iter.every = function(iterable, f, opt_obj) {
  iterable = goog.iter.toIterator(iterable);
  try {
    while(true) {
      if(!f.call(opt_obj, iterable.next(), undefined, iterable)) {
        return false
      }
    }
  }catch(ex) {
    if(ex !== goog.iter.StopIteration) {
      throw ex;
    }
  }
  return true
};
goog.iter.chain = function(var_args) {
  var args = arguments;
  var length = args.length;
  var i = 0;
  var newIter = new goog.iter.Iterator;
  newIter.next = function() {
    try {
      if(i >= length) {
        throw goog.iter.StopIteration;
      }
      var current = goog.iter.toIterator(args[i]);
      return current.next()
    }catch(ex) {
      if(ex !== goog.iter.StopIteration || i >= length) {
        throw ex;
      }else {
        i++;
        return this.next()
      }
    }
  };
  return newIter
};
goog.iter.dropWhile = function(iterable, f, opt_obj) {
  iterable = goog.iter.toIterator(iterable);
  var newIter = new goog.iter.Iterator;
  var dropping = true;
  newIter.next = function() {
    while(true) {
      var val = iterable.next();
      if(dropping && f.call(opt_obj, val, undefined, iterable)) {
        continue
      }else {
        dropping = false
      }
      return val
    }
  };
  return newIter
};
goog.iter.takeWhile = function(iterable, f, opt_obj) {
  iterable = goog.iter.toIterator(iterable);
  var newIter = new goog.iter.Iterator;
  var taking = true;
  newIter.next = function() {
    while(true) {
      if(taking) {
        var val = iterable.next();
        if(f.call(opt_obj, val, undefined, iterable)) {
          return val
        }else {
          taking = false
        }
      }else {
        throw goog.iter.StopIteration;
      }
    }
  };
  return newIter
};
goog.iter.toArray = function(iterable) {
  if(goog.isArrayLike(iterable)) {
    return goog.array.toArray(iterable)
  }
  iterable = goog.iter.toIterator(iterable);
  var array = [];
  goog.iter.forEach(iterable, function(val) {
    array.push(val)
  });
  return array
};
goog.iter.equals = function(iterable1, iterable2) {
  iterable1 = goog.iter.toIterator(iterable1);
  iterable2 = goog.iter.toIterator(iterable2);
  var b1, b2;
  try {
    while(true) {
      b1 = b2 = false;
      var val1 = iterable1.next();
      b1 = true;
      var val2 = iterable2.next();
      b2 = true;
      if(val1 != val2) {
        return false
      }
    }
  }catch(ex) {
    if(ex !== goog.iter.StopIteration) {
      throw ex;
    }else {
      if(b1 && !b2) {
        return false
      }
      if(!b2) {
        try {
          val2 = iterable2.next();
          return false
        }catch(ex1) {
          if(ex1 !== goog.iter.StopIteration) {
            throw ex1;
          }
          return true
        }
      }
    }
  }
  return false
};
goog.iter.nextOrValue = function(iterable, defaultValue) {
  try {
    return goog.iter.toIterator(iterable).next()
  }catch(e) {
    if(e != goog.iter.StopIteration) {
      throw e;
    }
    return defaultValue
  }
};
goog.iter.product = function(var_args) {
  var someArrayEmpty = goog.array.some(arguments, function(arr) {
    return!arr.length
  });
  if(someArrayEmpty || !arguments.length) {
    return new goog.iter.Iterator
  }
  var iter = new goog.iter.Iterator;
  var arrays = arguments;
  var indicies = goog.array.repeat(0, arrays.length);
  iter.next = function() {
    if(indicies) {
      var retVal = goog.array.map(indicies, function(valueIndex, arrayIndex) {
        return arrays[arrayIndex][valueIndex]
      });
      for(var i = indicies.length - 1;i >= 0;i--) {
        goog.asserts.assert(indicies);
        if(indicies[i] < arrays[i].length - 1) {
          indicies[i]++;
          break
        }
        if(i == 0) {
          indicies = null;
          break
        }
        indicies[i] = 0
      }
      return retVal
    }
    throw goog.iter.StopIteration;
  };
  return iter
};
goog.iter.cycle = function(iterable) {
  var baseIterator = goog.iter.toIterator(iterable);
  var cache = [];
  var cacheIndex = 0;
  var iter = new goog.iter.Iterator;
  var useCache = false;
  iter.next = function() {
    var returnElement = null;
    if(!useCache) {
      try {
        returnElement = baseIterator.next();
        cache.push(returnElement);
        return returnElement
      }catch(e) {
        if(e != goog.iter.StopIteration || goog.array.isEmpty(cache)) {
          throw e;
        }
        useCache = true
      }
    }
    returnElement = cache[cacheIndex];
    cacheIndex = (cacheIndex + 1) % cache.length;
    return returnElement
  };
  return iter
};
goog.provide("goog.structs.Map");
goog.require("goog.iter.Iterator");
goog.require("goog.iter.StopIteration");
goog.require("goog.object");
goog.require("goog.structs");
goog.structs.Map = function(opt_map, var_args) {
  this.map_ = {};
  this.keys_ = [];
  var argLength = arguments.length;
  if(argLength > 1) {
    if(argLength % 2) {
      throw Error("Uneven number of arguments");
    }
    for(var i = 0;i < argLength;i += 2) {
      this.set(arguments[i], arguments[i + 1])
    }
  }else {
    if(opt_map) {
      this.addAll(opt_map)
    }
  }
};
goog.structs.Map.prototype.count_ = 0;
goog.structs.Map.prototype.version_ = 0;
goog.structs.Map.prototype.getCount = function() {
  return this.count_
};
goog.structs.Map.prototype.getValues = function() {
  this.cleanupKeysArray_();
  var rv = [];
  for(var i = 0;i < this.keys_.length;i++) {
    var key = this.keys_[i];
    rv.push(this.map_[key])
  }
  return rv
};
goog.structs.Map.prototype.getKeys = function() {
  this.cleanupKeysArray_();
  return this.keys_.concat()
};
goog.structs.Map.prototype.containsKey = function(key) {
  return goog.structs.Map.hasKey_(this.map_, key)
};
goog.structs.Map.prototype.containsValue = function(val) {
  for(var i = 0;i < this.keys_.length;i++) {
    var key = this.keys_[i];
    if(goog.structs.Map.hasKey_(this.map_, key) && this.map_[key] == val) {
      return true
    }
  }
  return false
};
goog.structs.Map.prototype.equals = function(otherMap, opt_equalityFn) {
  if(this === otherMap) {
    return true
  }
  if(this.count_ != otherMap.getCount()) {
    return false
  }
  var equalityFn = opt_equalityFn || goog.structs.Map.defaultEquals;
  this.cleanupKeysArray_();
  for(var key, i = 0;key = this.keys_[i];i++) {
    if(!equalityFn(this.get(key), otherMap.get(key))) {
      return false
    }
  }
  return true
};
goog.structs.Map.defaultEquals = function(a, b) {
  return a === b
};
goog.structs.Map.prototype.isEmpty = function() {
  return this.count_ == 0
};
goog.structs.Map.prototype.clear = function() {
  this.map_ = {};
  this.keys_.length = 0;
  this.count_ = 0;
  this.version_ = 0
};
goog.structs.Map.prototype.remove = function(key) {
  if(goog.structs.Map.hasKey_(this.map_, key)) {
    delete this.map_[key];
    this.count_--;
    this.version_++;
    if(this.keys_.length > 2 * this.count_) {
      this.cleanupKeysArray_()
    }
    return true
  }
  return false
};
goog.structs.Map.prototype.cleanupKeysArray_ = function() {
  if(this.count_ != this.keys_.length) {
    var srcIndex = 0;
    var destIndex = 0;
    while(srcIndex < this.keys_.length) {
      var key = this.keys_[srcIndex];
      if(goog.structs.Map.hasKey_(this.map_, key)) {
        this.keys_[destIndex++] = key
      }
      srcIndex++
    }
    this.keys_.length = destIndex
  }
  if(this.count_ != this.keys_.length) {
    var seen = {};
    var srcIndex = 0;
    var destIndex = 0;
    while(srcIndex < this.keys_.length) {
      var key = this.keys_[srcIndex];
      if(!goog.structs.Map.hasKey_(seen, key)) {
        this.keys_[destIndex++] = key;
        seen[key] = 1
      }
      srcIndex++
    }
    this.keys_.length = destIndex
  }
};
goog.structs.Map.prototype.get = function(key, opt_val) {
  if(goog.structs.Map.hasKey_(this.map_, key)) {
    return this.map_[key]
  }
  return opt_val
};
goog.structs.Map.prototype.set = function(key, value) {
  if(!goog.structs.Map.hasKey_(this.map_, key)) {
    this.count_++;
    this.keys_.push(key);
    this.version_++
  }
  this.map_[key] = value
};
goog.structs.Map.prototype.addAll = function(map) {
  var keys, values;
  if(map instanceof goog.structs.Map) {
    keys = map.getKeys();
    values = map.getValues()
  }else {
    keys = goog.object.getKeys(map);
    values = goog.object.getValues(map)
  }
  for(var i = 0;i < keys.length;i++) {
    this.set(keys[i], values[i])
  }
};
goog.structs.Map.prototype.clone = function() {
  return new goog.structs.Map(this)
};
goog.structs.Map.prototype.transpose = function() {
  var transposed = new goog.structs.Map;
  for(var i = 0;i < this.keys_.length;i++) {
    var key = this.keys_[i];
    var value = this.map_[key];
    transposed.set(value, key)
  }
  return transposed
};
goog.structs.Map.prototype.toObject = function() {
  this.cleanupKeysArray_();
  var obj = {};
  for(var i = 0;i < this.keys_.length;i++) {
    var key = this.keys_[i];
    obj[key] = this.map_[key]
  }
  return obj
};
goog.structs.Map.prototype.getKeyIterator = function() {
  return this.__iterator__(true)
};
goog.structs.Map.prototype.getValueIterator = function() {
  return this.__iterator__(false)
};
goog.structs.Map.prototype.__iterator__ = function(opt_keys) {
  this.cleanupKeysArray_();
  var i = 0;
  var keys = this.keys_;
  var map = this.map_;
  var version = this.version_;
  var selfObj = this;
  var newIter = new goog.iter.Iterator;
  newIter.next = function() {
    while(true) {
      if(version != selfObj.version_) {
        throw Error("The map has changed since the iterator was created");
      }
      if(i >= keys.length) {
        throw goog.iter.StopIteration;
      }
      var key = keys[i++];
      return opt_keys ? key : map[key]
    }
  };
  return newIter
};
goog.structs.Map.hasKey_ = function(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key)
};
goog.provide("goog.uri.utils");
goog.provide("goog.uri.utils.ComponentIndex");
goog.provide("goog.uri.utils.QueryArray");
goog.provide("goog.uri.utils.QueryValue");
goog.provide("goog.uri.utils.StandardQueryParam");
goog.require("goog.asserts");
goog.require("goog.string");
goog.uri.utils.CharCode_ = {AMPERSAND:38, EQUAL:61, HASH:35, QUESTION:63};
goog.uri.utils.buildFromEncodedParts = function(opt_scheme, opt_userInfo, opt_domain, opt_port, opt_path, opt_queryData, opt_fragment) {
  var out = [];
  if(opt_scheme) {
    out.push(opt_scheme, ":")
  }
  if(opt_domain) {
    out.push("//");
    if(opt_userInfo) {
      out.push(opt_userInfo, "@")
    }
    out.push(opt_domain);
    if(opt_port) {
      out.push(":", opt_port)
    }
  }
  if(opt_path) {
    out.push(opt_path)
  }
  if(opt_queryData) {
    out.push("?", opt_queryData)
  }
  if(opt_fragment) {
    out.push("#", opt_fragment)
  }
  return out.join("")
};
goog.uri.utils.splitRe_ = new RegExp("^" + "(?:" + "([^:/?#.]+)" + ":)?" + "(?://" + "(?:([^/?#]*)@)?" + "([\\w\\d\\-\\u0100-\\uffff.%]*)" + "(?::([0-9]+))?" + ")?" + "([^?#]+)?" + "(?:\\?([^#]*))?" + "(?:#(.*))?" + "$");
goog.uri.utils.ComponentIndex = {SCHEME:1, USER_INFO:2, DOMAIN:3, PORT:4, PATH:5, QUERY_DATA:6, FRAGMENT:7};
goog.uri.utils.split = function(uri) {
  return uri.match(goog.uri.utils.splitRe_)
};
goog.uri.utils.decodeIfPossible_ = function(uri) {
  return uri && decodeURIComponent(uri)
};
goog.uri.utils.getComponentByIndex_ = function(componentIndex, uri) {
  return goog.uri.utils.split(uri)[componentIndex] || null
};
goog.uri.utils.getScheme = function(uri) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.SCHEME, uri)
};
goog.uri.utils.getUserInfoEncoded = function(uri) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.USER_INFO, uri)
};
goog.uri.utils.getUserInfo = function(uri) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getUserInfoEncoded(uri))
};
goog.uri.utils.getDomainEncoded = function(uri) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.DOMAIN, uri)
};
goog.uri.utils.getDomain = function(uri) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getDomainEncoded(uri))
};
goog.uri.utils.getPort = function(uri) {
  return Number(goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.PORT, uri)) || null
};
goog.uri.utils.getPathEncoded = function(uri) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.PATH, uri)
};
goog.uri.utils.getPath = function(uri) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getPathEncoded(uri))
};
goog.uri.utils.getQueryData = function(uri) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.QUERY_DATA, uri)
};
goog.uri.utils.getFragmentEncoded = function(uri) {
  var hashIndex = uri.indexOf("#");
  return hashIndex < 0 ? null : uri.substr(hashIndex + 1)
};
goog.uri.utils.setFragmentEncoded = function(uri, fragment) {
  return goog.uri.utils.removeFragment(uri) + (fragment ? "#" + fragment : "")
};
goog.uri.utils.getFragment = function(uri) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getFragmentEncoded(uri))
};
goog.uri.utils.getHost = function(uri) {
  var pieces = goog.uri.utils.split(uri);
  return goog.uri.utils.buildFromEncodedParts(pieces[goog.uri.utils.ComponentIndex.SCHEME], pieces[goog.uri.utils.ComponentIndex.USER_INFO], pieces[goog.uri.utils.ComponentIndex.DOMAIN], pieces[goog.uri.utils.ComponentIndex.PORT])
};
goog.uri.utils.getPathAndAfter = function(uri) {
  var pieces = goog.uri.utils.split(uri);
  return goog.uri.utils.buildFromEncodedParts(null, null, null, null, pieces[goog.uri.utils.ComponentIndex.PATH], pieces[goog.uri.utils.ComponentIndex.QUERY_DATA], pieces[goog.uri.utils.ComponentIndex.FRAGMENT])
};
goog.uri.utils.removeFragment = function(uri) {
  var hashIndex = uri.indexOf("#");
  return hashIndex < 0 ? uri : uri.substr(0, hashIndex)
};
goog.uri.utils.haveSameDomain = function(uri1, uri2) {
  var pieces1 = goog.uri.utils.split(uri1);
  var pieces2 = goog.uri.utils.split(uri2);
  return pieces1[goog.uri.utils.ComponentIndex.DOMAIN] == pieces2[goog.uri.utils.ComponentIndex.DOMAIN] && pieces1[goog.uri.utils.ComponentIndex.SCHEME] == pieces2[goog.uri.utils.ComponentIndex.SCHEME] && pieces1[goog.uri.utils.ComponentIndex.PORT] == pieces2[goog.uri.utils.ComponentIndex.PORT]
};
goog.uri.utils.assertNoFragmentsOrQueries_ = function(uri) {
  if(goog.DEBUG && (uri.indexOf("#") >= 0 || uri.indexOf("?") >= 0)) {
    throw Error("goog.uri.utils: Fragment or query identifiers are not " + "supported: [" + uri + "]");
  }
};
goog.uri.utils.QueryValue;
goog.uri.utils.QueryArray;
goog.uri.utils.appendQueryData_ = function(buffer) {
  if(buffer[1]) {
    var baseUri = buffer[0];
    var hashIndex = baseUri.indexOf("#");
    if(hashIndex >= 0) {
      buffer.push(baseUri.substr(hashIndex));
      buffer[0] = baseUri = baseUri.substr(0, hashIndex)
    }
    var questionIndex = baseUri.indexOf("?");
    if(questionIndex < 0) {
      buffer[1] = "?"
    }else {
      if(questionIndex == baseUri.length - 1) {
        buffer[1] = undefined
      }
    }
  }
  return buffer.join("")
};
goog.uri.utils.appendKeyValuePairs_ = function(key, value, pairs) {
  if(goog.isArray(value)) {
    value = value;
    for(var j = 0;j < value.length;j++) {
      pairs.push("&", key);
      if(value[j] !== "") {
        pairs.push("=", goog.string.urlEncode(value[j]))
      }
    }
  }else {
    if(value != null) {
      pairs.push("&", key);
      if(value !== "") {
        pairs.push("=", goog.string.urlEncode(value))
      }
    }
  }
};
goog.uri.utils.buildQueryDataBuffer_ = function(buffer, keysAndValues, opt_startIndex) {
  goog.asserts.assert(Math.max(keysAndValues.length - (opt_startIndex || 0), 0) % 2 == 0, "goog.uri.utils: Key/value lists must be even in length.");
  for(var i = opt_startIndex || 0;i < keysAndValues.length;i += 2) {
    goog.uri.utils.appendKeyValuePairs_(keysAndValues[i], keysAndValues[i + 1], buffer)
  }
  return buffer
};
goog.uri.utils.buildQueryData = function(keysAndValues, opt_startIndex) {
  var buffer = goog.uri.utils.buildQueryDataBuffer_([], keysAndValues, opt_startIndex);
  buffer[0] = "";
  return buffer.join("")
};
goog.uri.utils.buildQueryDataBufferFromMap_ = function(buffer, map) {
  for(var key in map) {
    goog.uri.utils.appendKeyValuePairs_(key, map[key], buffer)
  }
  return buffer
};
goog.uri.utils.buildQueryDataFromMap = function(map) {
  var buffer = goog.uri.utils.buildQueryDataBufferFromMap_([], map);
  buffer[0] = "";
  return buffer.join("")
};
goog.uri.utils.appendParams = function(uri, var_args) {
  return goog.uri.utils.appendQueryData_(arguments.length == 2 ? goog.uri.utils.buildQueryDataBuffer_([uri], arguments[1], 0) : goog.uri.utils.buildQueryDataBuffer_([uri], arguments, 1))
};
goog.uri.utils.appendParamsFromMap = function(uri, map) {
  return goog.uri.utils.appendQueryData_(goog.uri.utils.buildQueryDataBufferFromMap_([uri], map))
};
goog.uri.utils.appendParam = function(uri, key, value) {
  return goog.uri.utils.appendQueryData_([uri, "&", key, "=", goog.string.urlEncode(value)])
};
goog.uri.utils.findParam_ = function(uri, startIndex, keyEncoded, hashOrEndIndex) {
  var index = startIndex;
  var keyLength = keyEncoded.length;
  while((index = uri.indexOf(keyEncoded, index)) >= 0 && index < hashOrEndIndex) {
    var precedingChar = uri.charCodeAt(index - 1);
    if(precedingChar == goog.uri.utils.CharCode_.AMPERSAND || precedingChar == goog.uri.utils.CharCode_.QUESTION) {
      var followingChar = uri.charCodeAt(index + keyLength);
      if(!followingChar || followingChar == goog.uri.utils.CharCode_.EQUAL || followingChar == goog.uri.utils.CharCode_.AMPERSAND || followingChar == goog.uri.utils.CharCode_.HASH) {
        return index
      }
    }
    index += keyLength + 1
  }
  return-1
};
goog.uri.utils.hashOrEndRe_ = /#|$/;
goog.uri.utils.hasParam = function(uri, keyEncoded) {
  return goog.uri.utils.findParam_(uri, 0, keyEncoded, uri.search(goog.uri.utils.hashOrEndRe_)) >= 0
};
goog.uri.utils.getParamValue = function(uri, keyEncoded) {
  var hashOrEndIndex = uri.search(goog.uri.utils.hashOrEndRe_);
  var foundIndex = goog.uri.utils.findParam_(uri, 0, keyEncoded, hashOrEndIndex);
  if(foundIndex < 0) {
    return null
  }else {
    var endPosition = uri.indexOf("&", foundIndex);
    if(endPosition < 0 || endPosition > hashOrEndIndex) {
      endPosition = hashOrEndIndex
    }
    foundIndex += keyEncoded.length + 1;
    return goog.string.urlDecode(uri.substr(foundIndex, endPosition - foundIndex))
  }
};
goog.uri.utils.getParamValues = function(uri, keyEncoded) {
  var hashOrEndIndex = uri.search(goog.uri.utils.hashOrEndRe_);
  var position = 0;
  var foundIndex;
  var result = [];
  while((foundIndex = goog.uri.utils.findParam_(uri, position, keyEncoded, hashOrEndIndex)) >= 0) {
    position = uri.indexOf("&", foundIndex);
    if(position < 0 || position > hashOrEndIndex) {
      position = hashOrEndIndex
    }
    foundIndex += keyEncoded.length + 1;
    result.push(goog.string.urlDecode(uri.substr(foundIndex, position - foundIndex)))
  }
  return result
};
goog.uri.utils.trailingQueryPunctuationRe_ = /[?&]($|#)/;
goog.uri.utils.removeParam = function(uri, keyEncoded) {
  var hashOrEndIndex = uri.search(goog.uri.utils.hashOrEndRe_);
  var position = 0;
  var foundIndex;
  var buffer = [];
  while((foundIndex = goog.uri.utils.findParam_(uri, position, keyEncoded, hashOrEndIndex)) >= 0) {
    buffer.push(uri.substring(position, foundIndex));
    position = Math.min(uri.indexOf("&", foundIndex) + 1 || hashOrEndIndex, hashOrEndIndex)
  }
  buffer.push(uri.substr(position));
  return buffer.join("").replace(goog.uri.utils.trailingQueryPunctuationRe_, "$1")
};
goog.uri.utils.setParam = function(uri, keyEncoded, value) {
  return goog.uri.utils.appendParam(goog.uri.utils.removeParam(uri, keyEncoded), keyEncoded, value)
};
goog.uri.utils.appendPath = function(baseUri, path) {
  goog.uri.utils.assertNoFragmentsOrQueries_(baseUri);
  if(goog.string.endsWith(baseUri, "/")) {
    baseUri = baseUri.substr(0, baseUri.length - 1)
  }
  if(goog.string.startsWith(path, "/")) {
    path = path.substr(1)
  }
  return goog.string.buildString(baseUri, "/", path)
};
goog.uri.utils.StandardQueryParam = {RANDOM:"zx"};
goog.uri.utils.makeUnique = function(uri) {
  return goog.uri.utils.setParam(uri, goog.uri.utils.StandardQueryParam.RANDOM, goog.string.getRandomString())
};
goog.provide("goog.Uri");
goog.provide("goog.Uri.QueryData");
goog.require("goog.array");
goog.require("goog.string");
goog.require("goog.structs");
goog.require("goog.structs.Map");
goog.require("goog.uri.utils");
goog.require("goog.uri.utils.ComponentIndex");
goog.Uri = function(opt_uri, opt_ignoreCase) {
  var m;
  if(opt_uri instanceof goog.Uri) {
    this.setIgnoreCase(opt_ignoreCase == null ? opt_uri.getIgnoreCase() : opt_ignoreCase);
    this.setScheme(opt_uri.getScheme());
    this.setUserInfo(opt_uri.getUserInfo());
    this.setDomain(opt_uri.getDomain());
    this.setPort(opt_uri.getPort());
    this.setPath(opt_uri.getPath());
    this.setQueryData(opt_uri.getQueryData().clone());
    this.setFragment(opt_uri.getFragment())
  }else {
    if(opt_uri && (m = goog.uri.utils.split(String(opt_uri)))) {
      this.setIgnoreCase(!!opt_ignoreCase);
      this.setScheme(m[goog.uri.utils.ComponentIndex.SCHEME] || "", true);
      this.setUserInfo(m[goog.uri.utils.ComponentIndex.USER_INFO] || "", true);
      this.setDomain(m[goog.uri.utils.ComponentIndex.DOMAIN] || "", true);
      this.setPort(m[goog.uri.utils.ComponentIndex.PORT]);
      this.setPath(m[goog.uri.utils.ComponentIndex.PATH] || "", true);
      this.setQuery(m[goog.uri.utils.ComponentIndex.QUERY_DATA] || "", true);
      this.setFragment(m[goog.uri.utils.ComponentIndex.FRAGMENT] || "", true)
    }else {
      this.setIgnoreCase(!!opt_ignoreCase);
      this.queryData_ = new goog.Uri.QueryData(null, this, this.ignoreCase_)
    }
  }
};
goog.Uri.RANDOM_PARAM = goog.uri.utils.StandardQueryParam.RANDOM;
goog.Uri.prototype.scheme_ = "";
goog.Uri.prototype.userInfo_ = "";
goog.Uri.prototype.domain_ = "";
goog.Uri.prototype.port_ = null;
goog.Uri.prototype.path_ = "";
goog.Uri.prototype.queryData_;
goog.Uri.prototype.fragment_ = "";
goog.Uri.prototype.isReadOnly_ = false;
goog.Uri.prototype.ignoreCase_ = false;
goog.Uri.prototype.toString = function() {
  if(this.cachedToString_) {
    return this.cachedToString_
  }
  var out = [];
  if(this.scheme_) {
    out.push(goog.Uri.encodeSpecialChars_(this.scheme_, goog.Uri.reDisallowedInSchemeOrUserInfo_), ":")
  }
  if(this.domain_) {
    out.push("//");
    if(this.userInfo_) {
      out.push(goog.Uri.encodeSpecialChars_(this.userInfo_, goog.Uri.reDisallowedInSchemeOrUserInfo_), "@")
    }
    out.push(goog.Uri.encodeString_(this.domain_));
    if(this.port_ != null) {
      out.push(":", String(this.getPort()))
    }
  }
  if(this.path_) {
    if(this.hasDomain() && this.path_.charAt(0) != "/") {
      out.push("/")
    }
    out.push(goog.Uri.encodeSpecialChars_(this.path_, this.path_.charAt(0) == "/" ? goog.Uri.reDisallowedInAbsolutePath_ : goog.Uri.reDisallowedInRelativePath_))
  }
  var query = String(this.queryData_);
  if(query) {
    out.push("?", query)
  }
  if(this.fragment_) {
    out.push("#", goog.Uri.encodeSpecialChars_(this.fragment_, goog.Uri.reDisallowedInFragment_))
  }
  return this.cachedToString_ = out.join("")
};
goog.Uri.prototype.resolve = function(relativeUri) {
  var absoluteUri = this.clone();
  var overridden = relativeUri.hasScheme();
  if(overridden) {
    absoluteUri.setScheme(relativeUri.getScheme())
  }else {
    overridden = relativeUri.hasUserInfo()
  }
  if(overridden) {
    absoluteUri.setUserInfo(relativeUri.getUserInfo())
  }else {
    overridden = relativeUri.hasDomain()
  }
  if(overridden) {
    absoluteUri.setDomain(relativeUri.getDomain())
  }else {
    overridden = relativeUri.hasPort()
  }
  var path = relativeUri.getPath();
  if(overridden) {
    absoluteUri.setPort(relativeUri.getPort())
  }else {
    overridden = relativeUri.hasPath();
    if(overridden) {
      if(path.charAt(0) != "/") {
        if(this.hasDomain() && !this.hasPath()) {
          path = "/" + path
        }else {
          var lastSlashIndex = absoluteUri.getPath().lastIndexOf("/");
          if(lastSlashIndex != -1) {
            path = absoluteUri.getPath().substr(0, lastSlashIndex + 1) + path
          }
        }
      }
      path = goog.Uri.removeDotSegments(path)
    }
  }
  if(overridden) {
    absoluteUri.setPath(path)
  }else {
    overridden = relativeUri.hasQuery()
  }
  if(overridden) {
    absoluteUri.setQuery(relativeUri.getDecodedQuery())
  }else {
    overridden = relativeUri.hasFragment()
  }
  if(overridden) {
    absoluteUri.setFragment(relativeUri.getFragment())
  }
  return absoluteUri
};
goog.Uri.prototype.clone = function() {
  return goog.Uri.create(this.scheme_, this.userInfo_, this.domain_, this.port_, this.path_, this.queryData_.clone(), this.fragment_, this.ignoreCase_)
};
goog.Uri.prototype.getScheme = function() {
  return this.scheme_
};
goog.Uri.prototype.setScheme = function(newScheme, opt_decode) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  this.scheme_ = opt_decode ? goog.Uri.decodeOrEmpty_(newScheme) : newScheme;
  if(this.scheme_) {
    this.scheme_ = this.scheme_.replace(/:$/, "")
  }
  return this
};
goog.Uri.prototype.hasScheme = function() {
  return!!this.scheme_
};
goog.Uri.prototype.getUserInfo = function() {
  return this.userInfo_
};
goog.Uri.prototype.setUserInfo = function(newUserInfo, opt_decode) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  this.userInfo_ = opt_decode ? goog.Uri.decodeOrEmpty_(newUserInfo) : newUserInfo;
  return this
};
goog.Uri.prototype.hasUserInfo = function() {
  return!!this.userInfo_
};
goog.Uri.prototype.getDomain = function() {
  return this.domain_
};
goog.Uri.prototype.setDomain = function(newDomain, opt_decode) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  this.domain_ = opt_decode ? goog.Uri.decodeOrEmpty_(newDomain) : newDomain;
  return this
};
goog.Uri.prototype.hasDomain = function() {
  return!!this.domain_
};
goog.Uri.prototype.getPort = function() {
  return this.port_
};
goog.Uri.prototype.setPort = function(newPort) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  if(newPort) {
    newPort = Number(newPort);
    if(isNaN(newPort) || newPort < 0) {
      throw Error("Bad port number " + newPort);
    }
    this.port_ = newPort
  }else {
    this.port_ = null
  }
  return this
};
goog.Uri.prototype.hasPort = function() {
  return this.port_ != null
};
goog.Uri.prototype.getPath = function() {
  return this.path_
};
goog.Uri.prototype.setPath = function(newPath, opt_decode) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  this.path_ = opt_decode ? goog.Uri.decodeOrEmpty_(newPath) : newPath;
  return this
};
goog.Uri.prototype.hasPath = function() {
  return!!this.path_
};
goog.Uri.prototype.hasQuery = function() {
  return this.queryData_.toString() !== ""
};
goog.Uri.prototype.setQueryData = function(queryData, opt_decode) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  if(queryData instanceof goog.Uri.QueryData) {
    this.queryData_ = queryData;
    this.queryData_.uri_ = this;
    this.queryData_.setIgnoreCase(this.ignoreCase_)
  }else {
    if(!opt_decode) {
      queryData = goog.Uri.encodeSpecialChars_(queryData, goog.Uri.reDisallowedInQuery_)
    }
    this.queryData_ = new goog.Uri.QueryData(queryData, this, this.ignoreCase_)
  }
  return this
};
goog.Uri.prototype.setQuery = function(newQuery, opt_decode) {
  return this.setQueryData(newQuery, opt_decode)
};
goog.Uri.prototype.getEncodedQuery = function() {
  return this.queryData_.toString()
};
goog.Uri.prototype.getDecodedQuery = function() {
  return this.queryData_.toDecodedString()
};
goog.Uri.prototype.getQueryData = function() {
  return this.queryData_
};
goog.Uri.prototype.getQuery = function() {
  return this.getEncodedQuery()
};
goog.Uri.prototype.setParameterValue = function(key, value) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  this.queryData_.set(key, value);
  return this
};
goog.Uri.prototype.setParameterValues = function(key, values) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  if(!goog.isArray(values)) {
    values = [String(values)]
  }
  this.queryData_.setValues(key, values);
  return this
};
goog.Uri.prototype.getParameterValues = function(name) {
  return this.queryData_.getValues(name)
};
goog.Uri.prototype.getParameterValue = function(paramName) {
  return this.queryData_.get(paramName)
};
goog.Uri.prototype.getFragment = function() {
  return this.fragment_
};
goog.Uri.prototype.setFragment = function(newFragment, opt_decode) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  this.fragment_ = opt_decode ? goog.Uri.decodeOrEmpty_(newFragment) : newFragment;
  return this
};
goog.Uri.prototype.hasFragment = function() {
  return!!this.fragment_
};
goog.Uri.prototype.hasSameDomainAs = function(uri2) {
  return(!this.hasDomain() && !uri2.hasDomain() || this.getDomain() == uri2.getDomain()) && (!this.hasPort() && !uri2.hasPort() || this.getPort() == uri2.getPort())
};
goog.Uri.prototype.makeUnique = function() {
  this.enforceReadOnly();
  this.setParameterValue(goog.Uri.RANDOM_PARAM, goog.string.getRandomString());
  return this
};
goog.Uri.prototype.removeParameter = function(key) {
  this.enforceReadOnly();
  this.queryData_.remove(key);
  return this
};
goog.Uri.prototype.setReadOnly = function(isReadOnly) {
  this.isReadOnly_ = isReadOnly;
  return this
};
goog.Uri.prototype.isReadOnly = function() {
  return this.isReadOnly_
};
goog.Uri.prototype.enforceReadOnly = function() {
  if(this.isReadOnly_) {
    throw Error("Tried to modify a read-only Uri");
  }
};
goog.Uri.prototype.setIgnoreCase = function(ignoreCase) {
  this.ignoreCase_ = ignoreCase;
  if(this.queryData_) {
    this.queryData_.setIgnoreCase(ignoreCase)
  }
  return this
};
goog.Uri.prototype.getIgnoreCase = function() {
  return this.ignoreCase_
};
goog.Uri.parse = function(uri, opt_ignoreCase) {
  return uri instanceof goog.Uri ? uri.clone() : new goog.Uri(uri, opt_ignoreCase)
};
goog.Uri.create = function(opt_scheme, opt_userInfo, opt_domain, opt_port, opt_path, opt_query, opt_fragment, opt_ignoreCase) {
  var uri = new goog.Uri(null, opt_ignoreCase);
  opt_scheme && uri.setScheme(opt_scheme);
  opt_userInfo && uri.setUserInfo(opt_userInfo);
  opt_domain && uri.setDomain(opt_domain);
  opt_port && uri.setPort(opt_port);
  opt_path && uri.setPath(opt_path);
  opt_query && uri.setQueryData(opt_query);
  opt_fragment && uri.setFragment(opt_fragment);
  return uri
};
goog.Uri.resolve = function(base, rel) {
  if(!(base instanceof goog.Uri)) {
    base = goog.Uri.parse(base)
  }
  if(!(rel instanceof goog.Uri)) {
    rel = goog.Uri.parse(rel)
  }
  return base.resolve(rel)
};
goog.Uri.removeDotSegments = function(path) {
  if(path == ".." || path == ".") {
    return""
  }else {
    if(!goog.string.contains(path, "./") && !goog.string.contains(path, "/.")) {
      return path
    }else {
      var leadingSlash = goog.string.startsWith(path, "/");
      var segments = path.split("/");
      var out = [];
      for(var pos = 0;pos < segments.length;) {
        var segment = segments[pos++];
        if(segment == ".") {
          if(leadingSlash && pos == segments.length) {
            out.push("")
          }
        }else {
          if(segment == "..") {
            if(out.length > 1 || out.length == 1 && out[0] != "") {
              out.pop()
            }
            if(leadingSlash && pos == segments.length) {
              out.push("")
            }
          }else {
            out.push(segment);
            leadingSlash = true
          }
        }
      }
      return out.join("/")
    }
  }
};
goog.Uri.decodeOrEmpty_ = function(val) {
  return val ? decodeURIComponent(val) : ""
};
goog.Uri.encodeString_ = function(unescapedPart) {
  if(goog.isString(unescapedPart)) {
    return encodeURIComponent(unescapedPart)
  }
  return null
};
goog.Uri.encodeSpecialRegExp_ = /^[a-zA-Z0-9\-_.!~*'():\/;?]*$/;
goog.Uri.encodeSpecialChars_ = function(unescapedPart, extra) {
  var ret = null;
  if(goog.isString(unescapedPart)) {
    ret = unescapedPart;
    if(!goog.Uri.encodeSpecialRegExp_.test(ret)) {
      ret = encodeURI(unescapedPart)
    }
    if(ret.search(extra) >= 0) {
      ret = ret.replace(extra, goog.Uri.encodeChar_)
    }
  }
  return ret
};
goog.Uri.encodeChar_ = function(ch) {
  var n = ch.charCodeAt(0);
  return"%" + (n >> 4 & 15).toString(16) + (n & 15).toString(16)
};
goog.Uri.reDisallowedInSchemeOrUserInfo_ = /[#\/\?@]/g;
goog.Uri.reDisallowedInRelativePath_ = /[\#\?:]/g;
goog.Uri.reDisallowedInAbsolutePath_ = /[\#\?]/g;
goog.Uri.reDisallowedInQuery_ = /[\#\?@]/g;
goog.Uri.reDisallowedInFragment_ = /#/g;
goog.Uri.haveSameDomain = function(uri1String, uri2String) {
  var pieces1 = goog.uri.utils.split(uri1String);
  var pieces2 = goog.uri.utils.split(uri2String);
  return pieces1[goog.uri.utils.ComponentIndex.DOMAIN] == pieces2[goog.uri.utils.ComponentIndex.DOMAIN] && pieces1[goog.uri.utils.ComponentIndex.PORT] == pieces2[goog.uri.utils.ComponentIndex.PORT]
};
goog.Uri.QueryData = function(opt_query, opt_uri, opt_ignoreCase) {
  this.encodedQuery_ = opt_query || null;
  this.uri_ = opt_uri || null;
  this.ignoreCase_ = !!opt_ignoreCase
};
goog.Uri.QueryData.prototype.ensureKeyMapInitialized_ = function() {
  if(!this.keyMap_) {
    this.keyMap_ = new goog.structs.Map;
    this.count_ = 0;
    if(this.encodedQuery_) {
      var pairs = this.encodedQuery_.split("&");
      for(var i = 0;i < pairs.length;i++) {
        var indexOfEquals = pairs[i].indexOf("=");
        var name = null;
        var value = null;
        if(indexOfEquals >= 0) {
          name = pairs[i].substring(0, indexOfEquals);
          value = pairs[i].substring(indexOfEquals + 1)
        }else {
          name = pairs[i]
        }
        name = goog.string.urlDecode(name);
        name = this.getKeyName_(name);
        this.add(name, value ? goog.string.urlDecode(value) : "")
      }
    }
  }
};
goog.Uri.QueryData.createFromMap = function(map, opt_uri, opt_ignoreCase) {
  var keys = goog.structs.getKeys(map);
  if(typeof keys == "undefined") {
    throw Error("Keys are undefined");
  }
  return goog.Uri.QueryData.createFromKeysValues(keys, goog.structs.getValues(map), opt_uri, opt_ignoreCase)
};
goog.Uri.QueryData.createFromKeysValues = function(keys, values, opt_uri, opt_ignoreCase) {
  if(keys.length != values.length) {
    throw Error("Mismatched lengths for keys/values");
  }
  var queryData = new goog.Uri.QueryData(null, opt_uri, opt_ignoreCase);
  for(var i = 0;i < keys.length;i++) {
    queryData.add(keys[i], values[i])
  }
  return queryData
};
goog.Uri.QueryData.prototype.keyMap_ = null;
goog.Uri.QueryData.prototype.count_ = null;
goog.Uri.QueryData.decodedQuery_ = null;
goog.Uri.QueryData.prototype.getCount = function() {
  this.ensureKeyMapInitialized_();
  return this.count_
};
goog.Uri.QueryData.prototype.add = function(key, value) {
  this.ensureKeyMapInitialized_();
  this.invalidateCache_();
  key = this.getKeyName_(key);
  if(!this.containsKey(key)) {
    this.keyMap_.set(key, value)
  }else {
    var current = this.keyMap_.get(key);
    if(goog.isArray(current)) {
      current.push(value)
    }else {
      this.keyMap_.set(key, [current, value])
    }
  }
  this.count_++;
  return this
};
goog.Uri.QueryData.prototype.remove = function(key) {
  this.ensureKeyMapInitialized_();
  key = this.getKeyName_(key);
  if(this.keyMap_.containsKey(key)) {
    this.invalidateCache_();
    var old = this.keyMap_.get(key);
    if(goog.isArray(old)) {
      this.count_ -= old.length
    }else {
      this.count_--
    }
    return this.keyMap_.remove(key)
  }
  return false
};
goog.Uri.QueryData.prototype.clear = function() {
  this.invalidateCache_();
  if(this.keyMap_) {
    this.keyMap_.clear()
  }
  this.count_ = 0
};
goog.Uri.QueryData.prototype.isEmpty = function() {
  this.ensureKeyMapInitialized_();
  return this.count_ == 0
};
goog.Uri.QueryData.prototype.containsKey = function(key) {
  this.ensureKeyMapInitialized_();
  key = this.getKeyName_(key);
  return this.keyMap_.containsKey(key)
};
goog.Uri.QueryData.prototype.containsValue = function(value) {
  var vals = this.getValues();
  return goog.array.contains(vals, value)
};
goog.Uri.QueryData.prototype.getKeys = function() {
  this.ensureKeyMapInitialized_();
  var vals = this.keyMap_.getValues();
  var keys = this.keyMap_.getKeys();
  var rv = [];
  for(var i = 0;i < keys.length;i++) {
    var val = vals[i];
    if(goog.isArray(val)) {
      for(var j = 0;j < val.length;j++) {
        rv.push(keys[i])
      }
    }else {
      rv.push(keys[i])
    }
  }
  return rv
};
goog.Uri.QueryData.prototype.getValues = function(opt_key) {
  this.ensureKeyMapInitialized_();
  var rv;
  if(opt_key) {
    var key = this.getKeyName_(opt_key);
    if(this.containsKey(key)) {
      var value = this.keyMap_.get(key);
      if(goog.isArray(value)) {
        return value
      }else {
        rv = [];
        rv.push(value)
      }
    }else {
      rv = []
    }
  }else {
    var vals = this.keyMap_.getValues();
    rv = [];
    for(var i = 0;i < vals.length;i++) {
      var val = vals[i];
      if(goog.isArray(val)) {
        goog.array.extend(rv, val)
      }else {
        rv.push(val)
      }
    }
  }
  return rv
};
goog.Uri.QueryData.prototype.set = function(key, value) {
  this.ensureKeyMapInitialized_();
  this.invalidateCache_();
  key = this.getKeyName_(key);
  if(this.containsKey(key)) {
    var old = this.keyMap_.get(key);
    if(goog.isArray(old)) {
      this.count_ -= old.length
    }else {
      this.count_--
    }
  }
  this.keyMap_.set(key, value);
  this.count_++;
  return this
};
goog.Uri.QueryData.prototype.get = function(key, opt_default) {
  this.ensureKeyMapInitialized_();
  key = this.getKeyName_(key);
  if(this.containsKey(key)) {
    var val = this.keyMap_.get(key);
    if(goog.isArray(val)) {
      return val[0]
    }else {
      return val
    }
  }else {
    return opt_default
  }
};
goog.Uri.QueryData.prototype.setValues = function(key, values) {
  this.ensureKeyMapInitialized_();
  this.invalidateCache_();
  key = this.getKeyName_(key);
  if(this.containsKey(key)) {
    var old = this.keyMap_.get(key);
    if(goog.isArray(old)) {
      this.count_ -= old.length
    }else {
      this.count_--
    }
  }
  if(values.length > 0) {
    this.keyMap_.set(key, values);
    this.count_ += values.length
  }
};
goog.Uri.QueryData.prototype.toString = function() {
  if(this.encodedQuery_) {
    return this.encodedQuery_
  }
  if(!this.keyMap_) {
    return""
  }
  var sb = [];
  var count = 0;
  var keys = this.keyMap_.getKeys();
  for(var i = 0;i < keys.length;i++) {
    var key = keys[i];
    var encodedKey = goog.string.urlEncode(key);
    var val = this.keyMap_.get(key);
    if(goog.isArray(val)) {
      for(var j = 0;j < val.length;j++) {
        if(count > 0) {
          sb.push("&")
        }
        sb.push(encodedKey);
        if(val[j] !== "") {
          sb.push("=", goog.string.urlEncode(val[j]))
        }
        count++
      }
    }else {
      if(count > 0) {
        sb.push("&")
      }
      sb.push(encodedKey);
      if(val !== "") {
        sb.push("=", goog.string.urlEncode(val))
      }
      count++
    }
  }
  return this.encodedQuery_ = sb.join("")
};
goog.Uri.QueryData.prototype.toDecodedString = function() {
  if(!this.decodedQuery_) {
    this.decodedQuery_ = goog.Uri.decodeOrEmpty_(this.toString())
  }
  return this.decodedQuery_
};
goog.Uri.QueryData.prototype.invalidateCache_ = function() {
  delete this.decodedQuery_;
  delete this.encodedQuery_;
  if(this.uri_) {
    delete this.uri_.cachedToString_
  }
};
goog.Uri.QueryData.prototype.filterKeys = function(keys) {
  this.ensureKeyMapInitialized_();
  goog.structs.forEach(this.keyMap_, function(value, key, map) {
    if(!goog.array.contains(keys, key)) {
      this.remove(key)
    }
  }, this);
  return this
};
goog.Uri.QueryData.prototype.clone = function() {
  var rv = new goog.Uri.QueryData;
  if(this.decodedQuery_) {
    rv.decodedQuery_ = this.decodedQuery_
  }
  if(this.encodedQuery_) {
    rv.encodedQuery_ = this.encodedQuery_
  }
  if(this.keyMap_) {
    rv.keyMap_ = this.keyMap_.clone()
  }
  return rv
};
goog.Uri.QueryData.prototype.getKeyName_ = function(arg) {
  var keyName = String(arg);
  if(this.ignoreCase_) {
    keyName = keyName.toLowerCase()
  }
  return keyName
};
goog.Uri.QueryData.prototype.setIgnoreCase = function(ignoreCase) {
  var resetKeys = ignoreCase && !this.ignoreCase_;
  if(resetKeys) {
    this.ensureKeyMapInitialized_();
    this.invalidateCache_();
    goog.structs.forEach(this.keyMap_, function(value, key, map) {
      var lowerCase = key.toLowerCase();
      if(key != lowerCase) {
        this.remove(key);
        this.add(lowerCase, value)
      }
    }, this)
  }
  this.ignoreCase_ = ignoreCase
};
goog.Uri.QueryData.prototype.extend = function(var_args) {
  for(var i = 0;i < arguments.length;i++) {
    var data = arguments[i];
    goog.structs.forEach(data, function(value, key) {
      this.add(key, value)
    }, this)
  }
};
goog.provide("goog.dom.BrowserFeature");
goog.require("goog.userAgent");
goog.dom.BrowserFeature = {CAN_ADD_NAME_OR_TYPE_ATTRIBUTES:!goog.userAgent.IE || goog.userAgent.isDocumentMode(9), CAN_USE_CHILDREN_ATTRIBUTE:!goog.userAgent.GECKO && !goog.userAgent.IE || goog.userAgent.IE && goog.userAgent.isDocumentMode(9) || goog.userAgent.GECKO && goog.userAgent.isVersion("1.9.1"), CAN_USE_INNER_TEXT:goog.userAgent.IE && !goog.userAgent.isVersion("9"), INNER_HTML_NEEDS_SCOPED_ELEMENT:goog.userAgent.IE};
goog.provide("goog.dom.TagName");
goog.dom.TagName = {A:"A", ABBR:"ABBR", ACRONYM:"ACRONYM", ADDRESS:"ADDRESS", APPLET:"APPLET", AREA:"AREA", B:"B", BASE:"BASE", BASEFONT:"BASEFONT", BDO:"BDO", BIG:"BIG", BLOCKQUOTE:"BLOCKQUOTE", BODY:"BODY", BR:"BR", BUTTON:"BUTTON", CANVAS:"CANVAS", CAPTION:"CAPTION", CENTER:"CENTER", CITE:"CITE", CODE:"CODE", COL:"COL", COLGROUP:"COLGROUP", DD:"DD", DEL:"DEL", DFN:"DFN", DIR:"DIR", DIV:"DIV", DL:"DL", DT:"DT", EM:"EM", FIELDSET:"FIELDSET", FONT:"FONT", FORM:"FORM", FRAME:"FRAME", FRAMESET:"FRAMESET", 
H1:"H1", H2:"H2", H3:"H3", H4:"H4", H5:"H5", H6:"H6", HEAD:"HEAD", HR:"HR", HTML:"HTML", I:"I", IFRAME:"IFRAME", IMG:"IMG", INPUT:"INPUT", INS:"INS", ISINDEX:"ISINDEX", KBD:"KBD", LABEL:"LABEL", LEGEND:"LEGEND", LI:"LI", LINK:"LINK", MAP:"MAP", MENU:"MENU", META:"META", NOFRAMES:"NOFRAMES", NOSCRIPT:"NOSCRIPT", OBJECT:"OBJECT", OL:"OL", OPTGROUP:"OPTGROUP", OPTION:"OPTION", P:"P", PARAM:"PARAM", PRE:"PRE", Q:"Q", S:"S", SAMP:"SAMP", SCRIPT:"SCRIPT", SELECT:"SELECT", SMALL:"SMALL", SPAN:"SPAN", STRIKE:"STRIKE", 
STRONG:"STRONG", STYLE:"STYLE", SUB:"SUB", SUP:"SUP", TABLE:"TABLE", TBODY:"TBODY", TD:"TD", TEXTAREA:"TEXTAREA", TFOOT:"TFOOT", TH:"TH", THEAD:"THEAD", TITLE:"TITLE", TR:"TR", TT:"TT", U:"U", UL:"UL", VAR:"VAR"};
goog.provide("goog.dom.classes");
goog.require("goog.array");
goog.dom.classes.set = function(element, className) {
  element.className = className
};
goog.dom.classes.get = function(element) {
  var className = element.className;
  return className && typeof className.split == "function" ? className.split(/\s+/) : []
};
goog.dom.classes.add = function(element, var_args) {
  var classes = goog.dom.classes.get(element);
  var args = goog.array.slice(arguments, 1);
  var b = goog.dom.classes.add_(classes, args);
  element.className = classes.join(" ");
  return b
};
goog.dom.classes.remove = function(element, var_args) {
  var classes = goog.dom.classes.get(element);
  var args = goog.array.slice(arguments, 1);
  var b = goog.dom.classes.remove_(classes, args);
  element.className = classes.join(" ");
  return b
};
goog.dom.classes.add_ = function(classes, args) {
  var rv = 0;
  for(var i = 0;i < args.length;i++) {
    if(!goog.array.contains(classes, args[i])) {
      classes.push(args[i]);
      rv++
    }
  }
  return rv == args.length
};
goog.dom.classes.remove_ = function(classes, args) {
  var rv = 0;
  for(var i = 0;i < classes.length;i++) {
    if(goog.array.contains(args, classes[i])) {
      goog.array.splice(classes, i--, 1);
      rv++
    }
  }
  return rv == args.length
};
goog.dom.classes.swap = function(element, fromClass, toClass) {
  var classes = goog.dom.classes.get(element);
  var removed = false;
  for(var i = 0;i < classes.length;i++) {
    if(classes[i] == fromClass) {
      goog.array.splice(classes, i--, 1);
      removed = true
    }
  }
  if(removed) {
    classes.push(toClass);
    element.className = classes.join(" ")
  }
  return removed
};
goog.dom.classes.addRemove = function(element, classesToRemove, classesToAdd) {
  var classes = goog.dom.classes.get(element);
  if(goog.isString(classesToRemove)) {
    goog.array.remove(classes, classesToRemove)
  }else {
    if(goog.isArray(classesToRemove)) {
      goog.dom.classes.remove_(classes, classesToRemove)
    }
  }
  if(goog.isString(classesToAdd) && !goog.array.contains(classes, classesToAdd)) {
    classes.push(classesToAdd)
  }else {
    if(goog.isArray(classesToAdd)) {
      goog.dom.classes.add_(classes, classesToAdd)
    }
  }
  element.className = classes.join(" ")
};
goog.dom.classes.has = function(element, className) {
  return goog.array.contains(goog.dom.classes.get(element), className)
};
goog.dom.classes.enable = function(element, className, enabled) {
  if(enabled) {
    goog.dom.classes.add(element, className)
  }else {
    goog.dom.classes.remove(element, className)
  }
};
goog.dom.classes.toggle = function(element, className) {
  var add = !goog.dom.classes.has(element, className);
  goog.dom.classes.enable(element, className, add);
  return add
};
goog.provide("goog.math.Coordinate");
goog.math.Coordinate = function(opt_x, opt_y) {
  this.x = goog.isDef(opt_x) ? opt_x : 0;
  this.y = goog.isDef(opt_y) ? opt_y : 0
};
goog.math.Coordinate.prototype.clone = function() {
  return new goog.math.Coordinate(this.x, this.y)
};
if(goog.DEBUG) {
  goog.math.Coordinate.prototype.toString = function() {
    return"(" + this.x + ", " + this.y + ")"
  }
}
goog.math.Coordinate.equals = function(a, b) {
  if(a == b) {
    return true
  }
  if(!a || !b) {
    return false
  }
  return a.x == b.x && a.y == b.y
};
goog.math.Coordinate.distance = function(a, b) {
  var dx = a.x - b.x;
  var dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy)
};
goog.math.Coordinate.squaredDistance = function(a, b) {
  var dx = a.x - b.x;
  var dy = a.y - b.y;
  return dx * dx + dy * dy
};
goog.math.Coordinate.difference = function(a, b) {
  return new goog.math.Coordinate(a.x - b.x, a.y - b.y)
};
goog.math.Coordinate.sum = function(a, b) {
  return new goog.math.Coordinate(a.x + b.x, a.y + b.y)
};
goog.provide("goog.math.Size");
goog.math.Size = function(width, height) {
  this.width = width;
  this.height = height
};
goog.math.Size.equals = function(a, b) {
  if(a == b) {
    return true
  }
  if(!a || !b) {
    return false
  }
  return a.width == b.width && a.height == b.height
};
goog.math.Size.prototype.clone = function() {
  return new goog.math.Size(this.width, this.height)
};
if(goog.DEBUG) {
  goog.math.Size.prototype.toString = function() {
    return"(" + this.width + " x " + this.height + ")"
  }
}
goog.math.Size.prototype.getLongest = function() {
  return Math.max(this.width, this.height)
};
goog.math.Size.prototype.getShortest = function() {
  return Math.min(this.width, this.height)
};
goog.math.Size.prototype.area = function() {
  return this.width * this.height
};
goog.math.Size.prototype.perimeter = function() {
  return(this.width + this.height) * 2
};
goog.math.Size.prototype.aspectRatio = function() {
  return this.width / this.height
};
goog.math.Size.prototype.isEmpty = function() {
  return!this.area()
};
goog.math.Size.prototype.ceil = function() {
  this.width = Math.ceil(this.width);
  this.height = Math.ceil(this.height);
  return this
};
goog.math.Size.prototype.fitsInside = function(target) {
  return this.width <= target.width && this.height <= target.height
};
goog.math.Size.prototype.floor = function() {
  this.width = Math.floor(this.width);
  this.height = Math.floor(this.height);
  return this
};
goog.math.Size.prototype.round = function() {
  this.width = Math.round(this.width);
  this.height = Math.round(this.height);
  return this
};
goog.math.Size.prototype.scale = function(s) {
  this.width *= s;
  this.height *= s;
  return this
};
goog.math.Size.prototype.scaleToFit = function(target) {
  var s = this.aspectRatio() > target.aspectRatio() ? target.width / this.width : target.height / this.height;
  return this.scale(s)
};
goog.provide("goog.dom");
goog.provide("goog.dom.DomHelper");
goog.provide("goog.dom.NodeType");
goog.require("goog.array");
goog.require("goog.dom.BrowserFeature");
goog.require("goog.dom.TagName");
goog.require("goog.dom.classes");
goog.require("goog.math.Coordinate");
goog.require("goog.math.Size");
goog.require("goog.object");
goog.require("goog.string");
goog.require("goog.userAgent");
goog.dom.ASSUME_QUIRKS_MODE = false;
goog.dom.ASSUME_STANDARDS_MODE = false;
goog.dom.COMPAT_MODE_KNOWN_ = goog.dom.ASSUME_QUIRKS_MODE || goog.dom.ASSUME_STANDARDS_MODE;
goog.dom.NodeType = {ELEMENT:1, ATTRIBUTE:2, TEXT:3, CDATA_SECTION:4, ENTITY_REFERENCE:5, ENTITY:6, PROCESSING_INSTRUCTION:7, COMMENT:8, DOCUMENT:9, DOCUMENT_TYPE:10, DOCUMENT_FRAGMENT:11, NOTATION:12};
goog.dom.getDomHelper = function(opt_element) {
  return opt_element ? new goog.dom.DomHelper(goog.dom.getOwnerDocument(opt_element)) : goog.dom.defaultDomHelper_ || (goog.dom.defaultDomHelper_ = new goog.dom.DomHelper)
};
goog.dom.defaultDomHelper_;
goog.dom.getDocument = function() {
  return document
};
goog.dom.getElement = function(element) {
  return goog.isString(element) ? document.getElementById(element) : element
};
goog.dom.$ = goog.dom.getElement;
goog.dom.getElementsByTagNameAndClass = function(opt_tag, opt_class, opt_el) {
  return goog.dom.getElementsByTagNameAndClass_(document, opt_tag, opt_class, opt_el)
};
goog.dom.getElementsByClass = function(className, opt_el) {
  var parent = opt_el || document;
  if(goog.dom.canUseQuerySelector_(parent)) {
    return parent.querySelectorAll("." + className)
  }else {
    if(parent.getElementsByClassName) {
      return parent.getElementsByClassName(className)
    }
  }
  return goog.dom.getElementsByTagNameAndClass_(document, "*", className, opt_el)
};
goog.dom.getElementByClass = function(className, opt_el) {
  var parent = opt_el || document;
  var retVal = null;
  if(goog.dom.canUseQuerySelector_(parent)) {
    retVal = parent.querySelector("." + className)
  }else {
    retVal = goog.dom.getElementsByClass(className, opt_el)[0]
  }
  return retVal || null
};
goog.dom.canUseQuerySelector_ = function(parent) {
  return parent.querySelectorAll && parent.querySelector && (!goog.userAgent.WEBKIT || goog.dom.isCss1CompatMode_(document) || goog.userAgent.isVersion("528"))
};
goog.dom.getElementsByTagNameAndClass_ = function(doc, opt_tag, opt_class, opt_el) {
  var parent = opt_el || doc;
  var tagName = opt_tag && opt_tag != "*" ? opt_tag.toUpperCase() : "";
  if(goog.dom.canUseQuerySelector_(parent) && (tagName || opt_class)) {
    var query = tagName + (opt_class ? "." + opt_class : "");
    return parent.querySelectorAll(query)
  }
  if(opt_class && parent.getElementsByClassName) {
    var els = parent.getElementsByClassName(opt_class);
    if(tagName) {
      var arrayLike = {};
      var len = 0;
      for(var i = 0, el;el = els[i];i++) {
        if(tagName == el.nodeName) {
          arrayLike[len++] = el
        }
      }
      arrayLike.length = len;
      return arrayLike
    }else {
      return els
    }
  }
  var els = parent.getElementsByTagName(tagName || "*");
  if(opt_class) {
    var arrayLike = {};
    var len = 0;
    for(var i = 0, el;el = els[i];i++) {
      var className = el.className;
      if(typeof className.split == "function" && goog.array.contains(className.split(/\s+/), opt_class)) {
        arrayLike[len++] = el
      }
    }
    arrayLike.length = len;
    return arrayLike
  }else {
    return els
  }
};
goog.dom.$$ = goog.dom.getElementsByTagNameAndClass;
goog.dom.setProperties = function(element, properties) {
  goog.object.forEach(properties, function(val, key) {
    if(key == "style") {
      element.style.cssText = val
    }else {
      if(key == "class") {
        element.className = val
      }else {
        if(key == "for") {
          element.htmlFor = val
        }else {
          if(key in goog.dom.DIRECT_ATTRIBUTE_MAP_) {
            element.setAttribute(goog.dom.DIRECT_ATTRIBUTE_MAP_[key], val)
          }else {
            if(goog.string.startsWith(key, "aria-")) {
              element.setAttribute(key, val)
            }else {
              element[key] = val
            }
          }
        }
      }
    }
  })
};
goog.dom.DIRECT_ATTRIBUTE_MAP_ = {"cellpadding":"cellPadding", "cellspacing":"cellSpacing", "colspan":"colSpan", "rowspan":"rowSpan", "valign":"vAlign", "height":"height", "width":"width", "usemap":"useMap", "frameborder":"frameBorder", "maxlength":"maxLength", "type":"type"};
goog.dom.getViewportSize = function(opt_window) {
  return goog.dom.getViewportSize_(opt_window || window)
};
goog.dom.getViewportSize_ = function(win) {
  var doc = win.document;
  if(goog.userAgent.WEBKIT && !goog.userAgent.isVersion("500") && !goog.userAgent.MOBILE) {
    if(typeof win.innerHeight == "undefined") {
      win = window
    }
    var innerHeight = win.innerHeight;
    var scrollHeight = win.document.documentElement.scrollHeight;
    if(win == win.top) {
      if(scrollHeight < innerHeight) {
        innerHeight -= 15
      }
    }
    return new goog.math.Size(win.innerWidth, innerHeight)
  }
  var el = goog.dom.isCss1CompatMode_(doc) ? doc.documentElement : doc.body;
  return new goog.math.Size(el.clientWidth, el.clientHeight)
};
goog.dom.getDocumentHeight = function() {
  return goog.dom.getDocumentHeight_(window)
};
goog.dom.getDocumentHeight_ = function(win) {
  var doc = win.document;
  var height = 0;
  if(doc) {
    var vh = goog.dom.getViewportSize_(win).height;
    var body = doc.body;
    var docEl = doc.documentElement;
    if(goog.dom.isCss1CompatMode_(doc) && docEl.scrollHeight) {
      height = docEl.scrollHeight != vh ? docEl.scrollHeight : docEl.offsetHeight
    }else {
      var sh = docEl.scrollHeight;
      var oh = docEl.offsetHeight;
      if(docEl.clientHeight != oh) {
        sh = body.scrollHeight;
        oh = body.offsetHeight
      }
      if(sh > vh) {
        height = sh > oh ? sh : oh
      }else {
        height = sh < oh ? sh : oh
      }
    }
  }
  return height
};
goog.dom.getPageScroll = function(opt_window) {
  var win = opt_window || goog.global || window;
  return goog.dom.getDomHelper(win.document).getDocumentScroll()
};
goog.dom.getDocumentScroll = function() {
  return goog.dom.getDocumentScroll_(document)
};
goog.dom.getDocumentScroll_ = function(doc) {
  var el = goog.dom.getDocumentScrollElement_(doc);
  var win = goog.dom.getWindow_(doc);
  return new goog.math.Coordinate(win.pageXOffset || el.scrollLeft, win.pageYOffset || el.scrollTop)
};
goog.dom.getDocumentScrollElement = function() {
  return goog.dom.getDocumentScrollElement_(document)
};
goog.dom.getDocumentScrollElement_ = function(doc) {
  return!goog.userAgent.WEBKIT && goog.dom.isCss1CompatMode_(doc) ? doc.documentElement : doc.body
};
goog.dom.getWindow = function(opt_doc) {
  return opt_doc ? goog.dom.getWindow_(opt_doc) : window
};
goog.dom.getWindow_ = function(doc) {
  return doc.parentWindow || doc.defaultView
};
goog.dom.createDom = function(tagName, opt_attributes, var_args) {
  return goog.dom.createDom_(document, arguments)
};
goog.dom.createDom_ = function(doc, args) {
  var tagName = args[0];
  var attributes = args[1];
  if(!goog.dom.BrowserFeature.CAN_ADD_NAME_OR_TYPE_ATTRIBUTES && attributes && (attributes.name || attributes.type)) {
    var tagNameArr = ["<", tagName];
    if(attributes.name) {
      tagNameArr.push(' name="', goog.string.htmlEscape(attributes.name), '"')
    }
    if(attributes.type) {
      tagNameArr.push(' type="', goog.string.htmlEscape(attributes.type), '"');
      var clone = {};
      goog.object.extend(clone, attributes);
      attributes = clone;
      delete attributes.type
    }
    tagNameArr.push(">");
    tagName = tagNameArr.join("")
  }
  var element = doc.createElement(tagName);
  if(attributes) {
    if(goog.isString(attributes)) {
      element.className = attributes
    }else {
      if(goog.isArray(attributes)) {
        goog.dom.classes.add.apply(null, [element].concat(attributes))
      }else {
        goog.dom.setProperties(element, attributes)
      }
    }
  }
  if(args.length > 2) {
    goog.dom.append_(doc, element, args, 2)
  }
  return element
};
goog.dom.append_ = function(doc, parent, args, startIndex) {
  function childHandler(child) {
    if(child) {
      parent.appendChild(goog.isString(child) ? doc.createTextNode(child) : child)
    }
  }
  for(var i = startIndex;i < args.length;i++) {
    var arg = args[i];
    if(goog.isArrayLike(arg) && !goog.dom.isNodeLike(arg)) {
      goog.array.forEach(goog.dom.isNodeList(arg) ? goog.array.clone(arg) : arg, childHandler)
    }else {
      childHandler(arg)
    }
  }
};
goog.dom.$dom = goog.dom.createDom;
goog.dom.createElement = function(name) {
  return document.createElement(name)
};
goog.dom.createTextNode = function(content) {
  return document.createTextNode(content)
};
goog.dom.createTable = function(rows, columns, opt_fillWithNbsp) {
  return goog.dom.createTable_(document, rows, columns, !!opt_fillWithNbsp)
};
goog.dom.createTable_ = function(doc, rows, columns, fillWithNbsp) {
  var rowHtml = ["<tr>"];
  for(var i = 0;i < columns;i++) {
    rowHtml.push(fillWithNbsp ? "<td>&nbsp;</td>" : "<td></td>")
  }
  rowHtml.push("</tr>");
  rowHtml = rowHtml.join("");
  var totalHtml = ["<table>"];
  for(i = 0;i < rows;i++) {
    totalHtml.push(rowHtml)
  }
  totalHtml.push("</table>");
  var elem = doc.createElement(goog.dom.TagName.DIV);
  elem.innerHTML = totalHtml.join("");
  return elem.removeChild(elem.firstChild)
};
goog.dom.htmlToDocumentFragment = function(htmlString) {
  return goog.dom.htmlToDocumentFragment_(document, htmlString)
};
goog.dom.htmlToDocumentFragment_ = function(doc, htmlString) {
  var tempDiv = doc.createElement("div");
  if(goog.dom.BrowserFeature.INNER_HTML_NEEDS_SCOPED_ELEMENT) {
    tempDiv.innerHTML = "<br>" + htmlString;
    tempDiv.removeChild(tempDiv.firstChild)
  }else {
    tempDiv.innerHTML = htmlString
  }
  if(tempDiv.childNodes.length == 1) {
    return tempDiv.removeChild(tempDiv.firstChild)
  }else {
    var fragment = doc.createDocumentFragment();
    while(tempDiv.firstChild) {
      fragment.appendChild(tempDiv.firstChild)
    }
    return fragment
  }
};
goog.dom.getCompatMode = function() {
  return goog.dom.isCss1CompatMode() ? "CSS1Compat" : "BackCompat"
};
goog.dom.isCss1CompatMode = function() {
  return goog.dom.isCss1CompatMode_(document)
};
goog.dom.isCss1CompatMode_ = function(doc) {
  if(goog.dom.COMPAT_MODE_KNOWN_) {
    return goog.dom.ASSUME_STANDARDS_MODE
  }
  return doc.compatMode == "CSS1Compat"
};
goog.dom.canHaveChildren = function(node) {
  if(node.nodeType != goog.dom.NodeType.ELEMENT) {
    return false
  }
  switch(node.tagName) {
    case goog.dom.TagName.APPLET:
    ;
    case goog.dom.TagName.AREA:
    ;
    case goog.dom.TagName.BASE:
    ;
    case goog.dom.TagName.BR:
    ;
    case goog.dom.TagName.COL:
    ;
    case goog.dom.TagName.FRAME:
    ;
    case goog.dom.TagName.HR:
    ;
    case goog.dom.TagName.IMG:
    ;
    case goog.dom.TagName.INPUT:
    ;
    case goog.dom.TagName.IFRAME:
    ;
    case goog.dom.TagName.ISINDEX:
    ;
    case goog.dom.TagName.LINK:
    ;
    case goog.dom.TagName.NOFRAMES:
    ;
    case goog.dom.TagName.NOSCRIPT:
    ;
    case goog.dom.TagName.META:
    ;
    case goog.dom.TagName.OBJECT:
    ;
    case goog.dom.TagName.PARAM:
    ;
    case goog.dom.TagName.SCRIPT:
    ;
    case goog.dom.TagName.STYLE:
      return false
  }
  return true
};
goog.dom.appendChild = function(parent, child) {
  parent.appendChild(child)
};
goog.dom.append = function(parent, var_args) {
  goog.dom.append_(goog.dom.getOwnerDocument(parent), parent, arguments, 1)
};
goog.dom.removeChildren = function(node) {
  var child;
  while(child = node.firstChild) {
    node.removeChild(child)
  }
};
goog.dom.insertSiblingBefore = function(newNode, refNode) {
  if(refNode.parentNode) {
    refNode.parentNode.insertBefore(newNode, refNode)
  }
};
goog.dom.insertSiblingAfter = function(newNode, refNode) {
  if(refNode.parentNode) {
    refNode.parentNode.insertBefore(newNode, refNode.nextSibling)
  }
};
goog.dom.insertChildAt = function(parent, child, index) {
  parent.insertBefore(child, parent.childNodes[index] || null)
};
goog.dom.removeNode = function(node) {
  return node && node.parentNode ? node.parentNode.removeChild(node) : null
};
goog.dom.replaceNode = function(newNode, oldNode) {
  var parent = oldNode.parentNode;
  if(parent) {
    parent.replaceChild(newNode, oldNode)
  }
};
goog.dom.flattenElement = function(element) {
  var child, parent = element.parentNode;
  if(parent && parent.nodeType != goog.dom.NodeType.DOCUMENT_FRAGMENT) {
    if(element.removeNode) {
      return element.removeNode(false)
    }else {
      while(child = element.firstChild) {
        parent.insertBefore(child, element)
      }
      return goog.dom.removeNode(element)
    }
  }
};
goog.dom.getChildren = function(element) {
  if(goog.dom.BrowserFeature.CAN_USE_CHILDREN_ATTRIBUTE && element.children != undefined) {
    return element.children
  }
  return goog.array.filter(element.childNodes, function(node) {
    return node.nodeType == goog.dom.NodeType.ELEMENT
  })
};
goog.dom.getFirstElementChild = function(node) {
  if(node.firstElementChild != undefined) {
    return node.firstElementChild
  }
  return goog.dom.getNextElementNode_(node.firstChild, true)
};
goog.dom.getLastElementChild = function(node) {
  if(node.lastElementChild != undefined) {
    return node.lastElementChild
  }
  return goog.dom.getNextElementNode_(node.lastChild, false)
};
goog.dom.getNextElementSibling = function(node) {
  if(node.nextElementSibling != undefined) {
    return node.nextElementSibling
  }
  return goog.dom.getNextElementNode_(node.nextSibling, true)
};
goog.dom.getPreviousElementSibling = function(node) {
  if(node.previousElementSibling != undefined) {
    return node.previousElementSibling
  }
  return goog.dom.getNextElementNode_(node.previousSibling, false)
};
goog.dom.getNextElementNode_ = function(node, forward) {
  while(node && node.nodeType != goog.dom.NodeType.ELEMENT) {
    node = forward ? node.nextSibling : node.previousSibling
  }
  return node
};
goog.dom.getNextNode = function(node) {
  if(!node) {
    return null
  }
  if(node.firstChild) {
    return node.firstChild
  }
  while(node && !node.nextSibling) {
    node = node.parentNode
  }
  return node ? node.nextSibling : null
};
goog.dom.getPreviousNode = function(node) {
  if(!node) {
    return null
  }
  if(!node.previousSibling) {
    return node.parentNode
  }
  node = node.previousSibling;
  while(node && node.lastChild) {
    node = node.lastChild
  }
  return node
};
goog.dom.isNodeLike = function(obj) {
  return goog.isObject(obj) && obj.nodeType > 0
};
goog.dom.isElement = function(obj) {
  return goog.isObject(obj) && obj.nodeType == goog.dom.NodeType.ELEMENT
};
goog.dom.isWindow = function(obj) {
  return goog.isObject(obj) && obj["window"] == obj
};
goog.dom.contains = function(parent, descendant) {
  if(parent.contains && descendant.nodeType == goog.dom.NodeType.ELEMENT) {
    return parent == descendant || parent.contains(descendant)
  }
  if(typeof parent.compareDocumentPosition != "undefined") {
    return parent == descendant || Boolean(parent.compareDocumentPosition(descendant) & 16)
  }
  while(descendant && parent != descendant) {
    descendant = descendant.parentNode
  }
  return descendant == parent
};
goog.dom.compareNodeOrder = function(node1, node2) {
  if(node1 == node2) {
    return 0
  }
  if(node1.compareDocumentPosition) {
    return node1.compareDocumentPosition(node2) & 2 ? 1 : -1
  }
  if("sourceIndex" in node1 || node1.parentNode && "sourceIndex" in node1.parentNode) {
    var isElement1 = node1.nodeType == goog.dom.NodeType.ELEMENT;
    var isElement2 = node2.nodeType == goog.dom.NodeType.ELEMENT;
    if(isElement1 && isElement2) {
      return node1.sourceIndex - node2.sourceIndex
    }else {
      var parent1 = node1.parentNode;
      var parent2 = node2.parentNode;
      if(parent1 == parent2) {
        return goog.dom.compareSiblingOrder_(node1, node2)
      }
      if(!isElement1 && goog.dom.contains(parent1, node2)) {
        return-1 * goog.dom.compareParentsDescendantNodeIe_(node1, node2)
      }
      if(!isElement2 && goog.dom.contains(parent2, node1)) {
        return goog.dom.compareParentsDescendantNodeIe_(node2, node1)
      }
      return(isElement1 ? node1.sourceIndex : parent1.sourceIndex) - (isElement2 ? node2.sourceIndex : parent2.sourceIndex)
    }
  }
  var doc = goog.dom.getOwnerDocument(node1);
  var range1, range2;
  range1 = doc.createRange();
  range1.selectNode(node1);
  range1.collapse(true);
  range2 = doc.createRange();
  range2.selectNode(node2);
  range2.collapse(true);
  return range1.compareBoundaryPoints(goog.global["Range"].START_TO_END, range2)
};
goog.dom.compareParentsDescendantNodeIe_ = function(textNode, node) {
  var parent = textNode.parentNode;
  if(parent == node) {
    return-1
  }
  var sibling = node;
  while(sibling.parentNode != parent) {
    sibling = sibling.parentNode
  }
  return goog.dom.compareSiblingOrder_(sibling, textNode)
};
goog.dom.compareSiblingOrder_ = function(node1, node2) {
  var s = node2;
  while(s = s.previousSibling) {
    if(s == node1) {
      return-1
    }
  }
  return 1
};
goog.dom.findCommonAncestor = function(var_args) {
  var i, count = arguments.length;
  if(!count) {
    return null
  }else {
    if(count == 1) {
      return arguments[0]
    }
  }
  var paths = [];
  var minLength = Infinity;
  for(i = 0;i < count;i++) {
    var ancestors = [];
    var node = arguments[i];
    while(node) {
      ancestors.unshift(node);
      node = node.parentNode
    }
    paths.push(ancestors);
    minLength = Math.min(minLength, ancestors.length)
  }
  var output = null;
  for(i = 0;i < minLength;i++) {
    var first = paths[0][i];
    for(var j = 1;j < count;j++) {
      if(first != paths[j][i]) {
        return output
      }
    }
    output = first
  }
  return output
};
goog.dom.getOwnerDocument = function(node) {
  return node.nodeType == goog.dom.NodeType.DOCUMENT ? node : node.ownerDocument || node.document
};
goog.dom.getFrameContentDocument = function(frame) {
  var doc = frame.contentDocument || frame.contentWindow.document;
  return doc
};
goog.dom.getFrameContentWindow = function(frame) {
  return frame.contentWindow || goog.dom.getWindow_(goog.dom.getFrameContentDocument(frame))
};
goog.dom.setTextContent = function(element, text) {
  if("textContent" in element) {
    element.textContent = text
  }else {
    if(element.firstChild && element.firstChild.nodeType == goog.dom.NodeType.TEXT) {
      while(element.lastChild != element.firstChild) {
        element.removeChild(element.lastChild)
      }
      element.firstChild.data = text
    }else {
      goog.dom.removeChildren(element);
      var doc = goog.dom.getOwnerDocument(element);
      element.appendChild(doc.createTextNode(text))
    }
  }
};
goog.dom.getOuterHtml = function(element) {
  if("outerHTML" in element) {
    return element.outerHTML
  }else {
    var doc = goog.dom.getOwnerDocument(element);
    var div = doc.createElement("div");
    div.appendChild(element.cloneNode(true));
    return div.innerHTML
  }
};
goog.dom.findNode = function(root, p) {
  var rv = [];
  var found = goog.dom.findNodes_(root, p, rv, true);
  return found ? rv[0] : undefined
};
goog.dom.findNodes = function(root, p) {
  var rv = [];
  goog.dom.findNodes_(root, p, rv, false);
  return rv
};
goog.dom.findNodes_ = function(root, p, rv, findOne) {
  if(root != null) {
    var child = root.firstChild;
    while(child) {
      if(p(child)) {
        rv.push(child);
        if(findOne) {
          return true
        }
      }
      if(goog.dom.findNodes_(child, p, rv, findOne)) {
        return true
      }
      child = child.nextSibling
    }
  }
  return false
};
goog.dom.TAGS_TO_IGNORE_ = {"SCRIPT":1, "STYLE":1, "HEAD":1, "IFRAME":1, "OBJECT":1};
goog.dom.PREDEFINED_TAG_VALUES_ = {"IMG":" ", "BR":"\n"};
goog.dom.isFocusableTabIndex = function(element) {
  var attrNode = element.getAttributeNode("tabindex");
  if(attrNode && attrNode.specified) {
    var index = element.tabIndex;
    return goog.isNumber(index) && index >= 0 && index < 32768
  }
  return false
};
goog.dom.setFocusableTabIndex = function(element, enable) {
  if(enable) {
    element.tabIndex = 0
  }else {
    element.tabIndex = -1;
    element.removeAttribute("tabIndex")
  }
};
goog.dom.getTextContent = function(node) {
  var textContent;
  if(goog.dom.BrowserFeature.CAN_USE_INNER_TEXT && "innerText" in node) {
    textContent = goog.string.canonicalizeNewlines(node.innerText)
  }else {
    var buf = [];
    goog.dom.getTextContent_(node, buf, true);
    textContent = buf.join("")
  }
  textContent = textContent.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
  textContent = textContent.replace(/\u200B/g, "");
  if(!goog.dom.BrowserFeature.CAN_USE_INNER_TEXT) {
    textContent = textContent.replace(/ +/g, " ")
  }
  if(textContent != " ") {
    textContent = textContent.replace(/^\s*/, "")
  }
  return textContent
};
goog.dom.getRawTextContent = function(node) {
  var buf = [];
  goog.dom.getTextContent_(node, buf, false);
  return buf.join("")
};
goog.dom.getTextContent_ = function(node, buf, normalizeWhitespace) {
  if(node.nodeName in goog.dom.TAGS_TO_IGNORE_) {
  }else {
    if(node.nodeType == goog.dom.NodeType.TEXT) {
      if(normalizeWhitespace) {
        buf.push(String(node.nodeValue).replace(/(\r\n|\r|\n)/g, ""))
      }else {
        buf.push(node.nodeValue)
      }
    }else {
      if(node.nodeName in goog.dom.PREDEFINED_TAG_VALUES_) {
        buf.push(goog.dom.PREDEFINED_TAG_VALUES_[node.nodeName])
      }else {
        var child = node.firstChild;
        while(child) {
          goog.dom.getTextContent_(child, buf, normalizeWhitespace);
          child = child.nextSibling
        }
      }
    }
  }
};
goog.dom.getNodeTextLength = function(node) {
  return goog.dom.getTextContent(node).length
};
goog.dom.getNodeTextOffset = function(node, opt_offsetParent) {
  var root = opt_offsetParent || goog.dom.getOwnerDocument(node).body;
  var buf = [];
  while(node && node != root) {
    var cur = node;
    while(cur = cur.previousSibling) {
      buf.unshift(goog.dom.getTextContent(cur))
    }
    node = node.parentNode
  }
  return goog.string.trimLeft(buf.join("")).replace(/ +/g, " ").length
};
goog.dom.getNodeAtOffset = function(parent, offset, opt_result) {
  var stack = [parent], pos = 0, cur;
  while(stack.length > 0 && pos < offset) {
    cur = stack.pop();
    if(cur.nodeName in goog.dom.TAGS_TO_IGNORE_) {
    }else {
      if(cur.nodeType == goog.dom.NodeType.TEXT) {
        var text = cur.nodeValue.replace(/(\r\n|\r|\n)/g, "").replace(/ +/g, " ");
        pos += text.length
      }else {
        if(cur.nodeName in goog.dom.PREDEFINED_TAG_VALUES_) {
          pos += goog.dom.PREDEFINED_TAG_VALUES_[cur.nodeName].length
        }else {
          for(var i = cur.childNodes.length - 1;i >= 0;i--) {
            stack.push(cur.childNodes[i])
          }
        }
      }
    }
  }
  if(goog.isObject(opt_result)) {
    opt_result.remainder = cur ? cur.nodeValue.length + offset - pos - 1 : 0;
    opt_result.node = cur
  }
  return cur
};
goog.dom.isNodeList = function(val) {
  if(val && typeof val.length == "number") {
    if(goog.isObject(val)) {
      return typeof val.item == "function" || typeof val.item == "string"
    }else {
      if(goog.isFunction(val)) {
        return typeof val.item == "function"
      }
    }
  }
  return false
};
goog.dom.getAncestorByTagNameAndClass = function(element, opt_tag, opt_class) {
  var tagName = opt_tag ? opt_tag.toUpperCase() : null;
  return goog.dom.getAncestor(element, function(node) {
    return(!tagName || node.nodeName == tagName) && (!opt_class || goog.dom.classes.has(node, opt_class))
  }, true)
};
goog.dom.getAncestorByClass = function(element, opt_class) {
  return goog.dom.getAncestorByTagNameAndClass(element, null, opt_class)
};
goog.dom.getAncestor = function(element, matcher, opt_includeNode, opt_maxSearchSteps) {
  if(!opt_includeNode) {
    element = element.parentNode
  }
  var ignoreSearchSteps = opt_maxSearchSteps == null;
  var steps = 0;
  while(element && (ignoreSearchSteps || steps <= opt_maxSearchSteps)) {
    if(matcher(element)) {
      return element
    }
    element = element.parentNode;
    steps++
  }
  return null
};
goog.dom.getActiveElement = function(doc) {
  try {
    return doc && doc.activeElement
  }catch(e) {
  }
  return null
};
goog.dom.DomHelper = function(opt_document) {
  this.document_ = opt_document || goog.global.document || document
};
goog.dom.DomHelper.prototype.getDomHelper = goog.dom.getDomHelper;
goog.dom.DomHelper.prototype.setDocument = function(document) {
  this.document_ = document
};
goog.dom.DomHelper.prototype.getDocument = function() {
  return this.document_
};
goog.dom.DomHelper.prototype.getElement = function(element) {
  if(goog.isString(element)) {
    return this.document_.getElementById(element)
  }else {
    return element
  }
};
goog.dom.DomHelper.prototype.$ = goog.dom.DomHelper.prototype.getElement;
goog.dom.DomHelper.prototype.getElementsByTagNameAndClass = function(opt_tag, opt_class, opt_el) {
  return goog.dom.getElementsByTagNameAndClass_(this.document_, opt_tag, opt_class, opt_el)
};
goog.dom.DomHelper.prototype.getElementsByClass = function(className, opt_el) {
  var doc = opt_el || this.document_;
  return goog.dom.getElementsByClass(className, doc)
};
goog.dom.DomHelper.prototype.getElementByClass = function(className, opt_el) {
  var doc = opt_el || this.document_;
  return goog.dom.getElementByClass(className, doc)
};
goog.dom.DomHelper.prototype.$$ = goog.dom.DomHelper.prototype.getElementsByTagNameAndClass;
goog.dom.DomHelper.prototype.setProperties = goog.dom.setProperties;
goog.dom.DomHelper.prototype.getViewportSize = function(opt_window) {
  return goog.dom.getViewportSize(opt_window || this.getWindow())
};
goog.dom.DomHelper.prototype.getDocumentHeight = function() {
  return goog.dom.getDocumentHeight_(this.getWindow())
};
goog.dom.Appendable;
goog.dom.DomHelper.prototype.createDom = function(tagName, opt_attributes, var_args) {
  return goog.dom.createDom_(this.document_, arguments)
};
goog.dom.DomHelper.prototype.$dom = goog.dom.DomHelper.prototype.createDom;
goog.dom.DomHelper.prototype.createElement = function(name) {
  return this.document_.createElement(name)
};
goog.dom.DomHelper.prototype.createTextNode = function(content) {
  return this.document_.createTextNode(content)
};
goog.dom.DomHelper.prototype.createTable = function(rows, columns, opt_fillWithNbsp) {
  return goog.dom.createTable_(this.document_, rows, columns, !!opt_fillWithNbsp)
};
goog.dom.DomHelper.prototype.htmlToDocumentFragment = function(htmlString) {
  return goog.dom.htmlToDocumentFragment_(this.document_, htmlString)
};
goog.dom.DomHelper.prototype.getCompatMode = function() {
  return this.isCss1CompatMode() ? "CSS1Compat" : "BackCompat"
};
goog.dom.DomHelper.prototype.isCss1CompatMode = function() {
  return goog.dom.isCss1CompatMode_(this.document_)
};
goog.dom.DomHelper.prototype.getWindow = function() {
  return goog.dom.getWindow_(this.document_)
};
goog.dom.DomHelper.prototype.getDocumentScrollElement = function() {
  return goog.dom.getDocumentScrollElement_(this.document_)
};
goog.dom.DomHelper.prototype.getDocumentScroll = function() {
  return goog.dom.getDocumentScroll_(this.document_)
};
goog.dom.DomHelper.prototype.appendChild = goog.dom.appendChild;
goog.dom.DomHelper.prototype.append = goog.dom.append;
goog.dom.DomHelper.prototype.removeChildren = goog.dom.removeChildren;
goog.dom.DomHelper.prototype.insertSiblingBefore = goog.dom.insertSiblingBefore;
goog.dom.DomHelper.prototype.insertSiblingAfter = goog.dom.insertSiblingAfter;
goog.dom.DomHelper.prototype.removeNode = goog.dom.removeNode;
goog.dom.DomHelper.prototype.replaceNode = goog.dom.replaceNode;
goog.dom.DomHelper.prototype.flattenElement = goog.dom.flattenElement;
goog.dom.DomHelper.prototype.getFirstElementChild = goog.dom.getFirstElementChild;
goog.dom.DomHelper.prototype.getLastElementChild = goog.dom.getLastElementChild;
goog.dom.DomHelper.prototype.getNextElementSibling = goog.dom.getNextElementSibling;
goog.dom.DomHelper.prototype.getPreviousElementSibling = goog.dom.getPreviousElementSibling;
goog.dom.DomHelper.prototype.getNextNode = goog.dom.getNextNode;
goog.dom.DomHelper.prototype.getPreviousNode = goog.dom.getPreviousNode;
goog.dom.DomHelper.prototype.isNodeLike = goog.dom.isNodeLike;
goog.dom.DomHelper.prototype.contains = goog.dom.contains;
goog.dom.DomHelper.prototype.getOwnerDocument = goog.dom.getOwnerDocument;
goog.dom.DomHelper.prototype.getFrameContentDocument = goog.dom.getFrameContentDocument;
goog.dom.DomHelper.prototype.getFrameContentWindow = goog.dom.getFrameContentWindow;
goog.dom.DomHelper.prototype.setTextContent = goog.dom.setTextContent;
goog.dom.DomHelper.prototype.findNode = goog.dom.findNode;
goog.dom.DomHelper.prototype.findNodes = goog.dom.findNodes;
goog.dom.DomHelper.prototype.getTextContent = goog.dom.getTextContent;
goog.dom.DomHelper.prototype.getNodeTextLength = goog.dom.getNodeTextLength;
goog.dom.DomHelper.prototype.getNodeTextOffset = goog.dom.getNodeTextOffset;
goog.dom.DomHelper.prototype.getAncestorByTagNameAndClass = goog.dom.getAncestorByTagNameAndClass;
goog.dom.DomHelper.prototype.getAncestorByClass = goog.dom.getAncestorByClass;
goog.dom.DomHelper.prototype.getAncestor = goog.dom.getAncestor;
goog.provide("goog.structs.Collection");
goog.structs.Collection = function() {
};
goog.structs.Collection.prototype.add;
goog.structs.Collection.prototype.remove;
goog.structs.Collection.prototype.contains;
goog.structs.Collection.prototype.getCount;
goog.provide("goog.structs.Set");
goog.require("goog.structs");
goog.require("goog.structs.Collection");
goog.require("goog.structs.Map");
goog.structs.Set = function(opt_values) {
  this.map_ = new goog.structs.Map;
  if(opt_values) {
    this.addAll(opt_values)
  }
};
goog.structs.Set.getKey_ = function(val) {
  var type = typeof val;
  if(type == "object" && val || type == "function") {
    return"o" + goog.getUid(val)
  }else {
    return type.substr(0, 1) + val
  }
};
goog.structs.Set.prototype.getCount = function() {
  return this.map_.getCount()
};
goog.structs.Set.prototype.add = function(element) {
  this.map_.set(goog.structs.Set.getKey_(element), element)
};
goog.structs.Set.prototype.addAll = function(col) {
  var values = goog.structs.getValues(col);
  var l = values.length;
  for(var i = 0;i < l;i++) {
    this.add(values[i])
  }
};
goog.structs.Set.prototype.removeAll = function(col) {
  var values = goog.structs.getValues(col);
  var l = values.length;
  for(var i = 0;i < l;i++) {
    this.remove(values[i])
  }
};
goog.structs.Set.prototype.remove = function(element) {
  return this.map_.remove(goog.structs.Set.getKey_(element))
};
goog.structs.Set.prototype.clear = function() {
  this.map_.clear()
};
goog.structs.Set.prototype.isEmpty = function() {
  return this.map_.isEmpty()
};
goog.structs.Set.prototype.contains = function(element) {
  return this.map_.containsKey(goog.structs.Set.getKey_(element))
};
goog.structs.Set.prototype.containsAll = function(col) {
  return goog.structs.every(col, this.contains, this)
};
goog.structs.Set.prototype.intersection = function(col) {
  var result = new goog.structs.Set;
  var values = goog.structs.getValues(col);
  for(var i = 0;i < values.length;i++) {
    var value = values[i];
    if(this.contains(value)) {
      result.add(value)
    }
  }
  return result
};
goog.structs.Set.prototype.getValues = function() {
  return this.map_.getValues()
};
goog.structs.Set.prototype.clone = function() {
  return new goog.structs.Set(this)
};
goog.structs.Set.prototype.equals = function(col) {
  return this.getCount() == goog.structs.getCount(col) && this.isSubsetOf(col)
};
goog.structs.Set.prototype.isSubsetOf = function(col) {
  var colCount = goog.structs.getCount(col);
  if(this.getCount() > colCount) {
    return false
  }
  if(!(col instanceof goog.structs.Set) && colCount > 5) {
    col = new goog.structs.Set(col)
  }
  return goog.structs.every(this, function(value) {
    return goog.structs.contains(col, value)
  })
};
goog.structs.Set.prototype.__iterator__ = function(opt_keys) {
  return this.map_.__iterator__(false)
};
goog.provide("goog.debug");
goog.require("goog.array");
goog.require("goog.string");
goog.require("goog.structs.Set");
goog.require("goog.userAgent");
goog.debug.catchErrors = function(logFunc, opt_cancel, opt_target) {
  var target = opt_target || goog.global;
  var oldErrorHandler = target.onerror;
  var retVal = goog.userAgent.WEBKIT ? !opt_cancel : !!opt_cancel;
  target.onerror = function(message, url, line) {
    if(oldErrorHandler) {
      oldErrorHandler(message, url, line)
    }
    logFunc({message:message, fileName:url, line:line});
    return retVal
  }
};
goog.debug.expose = function(obj, opt_showFn) {
  if(typeof obj == "undefined") {
    return"undefined"
  }
  if(obj == null) {
    return"NULL"
  }
  var str = [];
  for(var x in obj) {
    if(!opt_showFn && goog.isFunction(obj[x])) {
      continue
    }
    var s = x + " = ";
    try {
      s += obj[x]
    }catch(e) {
      s += "*** " + e + " ***"
    }
    str.push(s)
  }
  return str.join("\n")
};
goog.debug.deepExpose = function(obj, opt_showFn) {
  var previous = new goog.structs.Set;
  var str = [];
  var helper = function(obj, space) {
    var nestspace = space + "  ";
    var indentMultiline = function(str) {
      return str.replace(/\n/g, "\n" + space)
    };
    try {
      if(!goog.isDef(obj)) {
        str.push("undefined")
      }else {
        if(goog.isNull(obj)) {
          str.push("NULL")
        }else {
          if(goog.isString(obj)) {
            str.push('"' + indentMultiline(obj) + '"')
          }else {
            if(goog.isFunction(obj)) {
              str.push(indentMultiline(String(obj)))
            }else {
              if(goog.isObject(obj)) {
                if(previous.contains(obj)) {
                  str.push("*** reference loop detected ***")
                }else {
                  previous.add(obj);
                  str.push("{");
                  for(var x in obj) {
                    if(!opt_showFn && goog.isFunction(obj[x])) {
                      continue
                    }
                    str.push("\n");
                    str.push(nestspace);
                    str.push(x + " = ");
                    helper(obj[x], nestspace)
                  }
                  str.push("\n" + space + "}")
                }
              }else {
                str.push(obj)
              }
            }
          }
        }
      }
    }catch(e) {
      str.push("*** " + e + " ***")
    }
  };
  helper(obj, "");
  return str.join("")
};
goog.debug.exposeArray = function(arr) {
  var str = [];
  for(var i = 0;i < arr.length;i++) {
    if(goog.isArray(arr[i])) {
      str.push(goog.debug.exposeArray(arr[i]))
    }else {
      str.push(arr[i])
    }
  }
  return"[ " + str.join(", ") + " ]"
};
goog.debug.exposeException = function(err, opt_fn) {
  try {
    var e = goog.debug.normalizeErrorObject(err);
    var error = "Message: " + goog.string.htmlEscape(e.message) + '\nUrl: <a href="view-source:' + e.fileName + '" target="_new">' + e.fileName + "</a>\nLine: " + e.lineNumber + "\n\nBrowser stack:\n" + goog.string.htmlEscape(e.stack + "-> ") + "[end]\n\nJS stack traversal:\n" + goog.string.htmlEscape(goog.debug.getStacktrace(opt_fn) + "-> ");
    return error
  }catch(e2) {
    return"Exception trying to expose exception! You win, we lose. " + e2
  }
};
goog.debug.normalizeErrorObject = function(err) {
  var href = goog.getObjectByName("window.location.href");
  if(goog.isString(err)) {
    return{"message":err, "name":"Unknown error", "lineNumber":"Not available", "fileName":href, "stack":"Not available"}
  }
  var lineNumber, fileName;
  var threwError = false;
  try {
    lineNumber = err.lineNumber || err.line || "Not available"
  }catch(e) {
    lineNumber = "Not available";
    threwError = true
  }
  try {
    fileName = err.fileName || err.filename || err.sourceURL || href
  }catch(e) {
    fileName = "Not available";
    threwError = true
  }
  if(threwError || !err.lineNumber || !err.fileName || !err.stack) {
    return{"message":err.message, "name":err.name, "lineNumber":lineNumber, "fileName":fileName, "stack":err.stack || "Not available"}
  }
  return err
};
goog.debug.enhanceError = function(err, opt_message) {
  var error = typeof err == "string" ? Error(err) : err;
  if(!error.stack) {
    error.stack = goog.debug.getStacktrace(arguments.callee.caller)
  }
  if(opt_message) {
    var x = 0;
    while(error["message" + x]) {
      ++x
    }
    error["message" + x] = String(opt_message)
  }
  return error
};
goog.debug.getStacktraceSimple = function(opt_depth) {
  var sb = [];
  var fn = arguments.callee.caller;
  var depth = 0;
  while(fn && (!opt_depth || depth < opt_depth)) {
    sb.push(goog.debug.getFunctionName(fn));
    sb.push("()\n");
    try {
      fn = fn.caller
    }catch(e) {
      sb.push("[exception trying to get caller]\n");
      break
    }
    depth++;
    if(depth >= goog.debug.MAX_STACK_DEPTH) {
      sb.push("[...long stack...]");
      break
    }
  }
  if(opt_depth && depth >= opt_depth) {
    sb.push("[...reached max depth limit...]")
  }else {
    sb.push("[end]")
  }
  return sb.join("")
};
goog.debug.MAX_STACK_DEPTH = 50;
goog.debug.getStacktrace = function(opt_fn) {
  return goog.debug.getStacktraceHelper_(opt_fn || arguments.callee.caller, [])
};
goog.debug.getStacktraceHelper_ = function(fn, visited) {
  var sb = [];
  if(goog.array.contains(visited, fn)) {
    sb.push("[...circular reference...]")
  }else {
    if(fn && visited.length < goog.debug.MAX_STACK_DEPTH) {
      sb.push(goog.debug.getFunctionName(fn) + "(");
      var args = fn.arguments;
      for(var i = 0;i < args.length;i++) {
        if(i > 0) {
          sb.push(", ")
        }
        var argDesc;
        var arg = args[i];
        switch(typeof arg) {
          case "object":
            argDesc = arg ? "object" : "null";
            break;
          case "string":
            argDesc = arg;
            break;
          case "number":
            argDesc = String(arg);
            break;
          case "boolean":
            argDesc = arg ? "true" : "false";
            break;
          case "function":
            argDesc = goog.debug.getFunctionName(arg);
            argDesc = argDesc ? argDesc : "[fn]";
            break;
          case "undefined":
          ;
          default:
            argDesc = typeof arg;
            break
        }
        if(argDesc.length > 40) {
          argDesc = argDesc.substr(0, 40) + "..."
        }
        sb.push(argDesc)
      }
      visited.push(fn);
      sb.push(")\n");
      try {
        sb.push(goog.debug.getStacktraceHelper_(fn.caller, visited))
      }catch(e) {
        sb.push("[exception trying to get caller]\n")
      }
    }else {
      if(fn) {
        sb.push("[...long stack...]")
      }else {
        sb.push("[end]")
      }
    }
  }
  return sb.join("")
};
goog.debug.setFunctionResolver = function(resolver) {
  goog.debug.fnNameResolver_ = resolver
};
goog.debug.getFunctionName = function(fn) {
  if(goog.debug.fnNameCache_[fn]) {
    return goog.debug.fnNameCache_[fn]
  }
  if(goog.debug.fnNameResolver_) {
    var name = goog.debug.fnNameResolver_(fn);
    if(name) {
      goog.debug.fnNameCache_[fn] = name;
      return name
    }
  }
  var functionSource = String(fn);
  if(!goog.debug.fnNameCache_[functionSource]) {
    var matches = /function ([^\(]+)/.exec(functionSource);
    if(matches) {
      var method = matches[1];
      goog.debug.fnNameCache_[functionSource] = method
    }else {
      goog.debug.fnNameCache_[functionSource] = "[Anonymous]"
    }
  }
  return goog.debug.fnNameCache_[functionSource]
};
goog.debug.makeWhitespaceVisible = function(string) {
  return string.replace(/ /g, "[_]").replace(/\f/g, "[f]").replace(/\n/g, "[n]\n").replace(/\r/g, "[r]").replace(/\t/g, "[t]")
};
goog.debug.fnNameCache_ = {};
goog.debug.fnNameResolver_;
goog.provide("goog.debug.LogRecord");
goog.debug.LogRecord = function(level, msg, loggerName, opt_time, opt_sequenceNumber) {
  this.reset(level, msg, loggerName, opt_time, opt_sequenceNumber)
};
goog.debug.LogRecord.prototype.time_;
goog.debug.LogRecord.prototype.level_;
goog.debug.LogRecord.prototype.msg_;
goog.debug.LogRecord.prototype.loggerName_;
goog.debug.LogRecord.prototype.sequenceNumber_ = 0;
goog.debug.LogRecord.prototype.exception_ = null;
goog.debug.LogRecord.prototype.exceptionText_ = null;
goog.debug.LogRecord.ENABLE_SEQUENCE_NUMBERS = true;
goog.debug.LogRecord.nextSequenceNumber_ = 0;
goog.debug.LogRecord.prototype.reset = function(level, msg, loggerName, opt_time, opt_sequenceNumber) {
  if(goog.debug.LogRecord.ENABLE_SEQUENCE_NUMBERS) {
    this.sequenceNumber_ = typeof opt_sequenceNumber == "number" ? opt_sequenceNumber : goog.debug.LogRecord.nextSequenceNumber_++
  }
  this.time_ = opt_time || goog.now();
  this.level_ = level;
  this.msg_ = msg;
  this.loggerName_ = loggerName;
  delete this.exception_;
  delete this.exceptionText_
};
goog.debug.LogRecord.prototype.getLoggerName = function() {
  return this.loggerName_
};
goog.debug.LogRecord.prototype.getException = function() {
  return this.exception_
};
goog.debug.LogRecord.prototype.setException = function(exception) {
  this.exception_ = exception
};
goog.debug.LogRecord.prototype.getExceptionText = function() {
  return this.exceptionText_
};
goog.debug.LogRecord.prototype.setExceptionText = function(text) {
  this.exceptionText_ = text
};
goog.debug.LogRecord.prototype.setLoggerName = function(loggerName) {
  this.loggerName_ = loggerName
};
goog.debug.LogRecord.prototype.getLevel = function() {
  return this.level_
};
goog.debug.LogRecord.prototype.setLevel = function(level) {
  this.level_ = level
};
goog.debug.LogRecord.prototype.getMessage = function() {
  return this.msg_
};
goog.debug.LogRecord.prototype.setMessage = function(msg) {
  this.msg_ = msg
};
goog.debug.LogRecord.prototype.getMillis = function() {
  return this.time_
};
goog.debug.LogRecord.prototype.setMillis = function(time) {
  this.time_ = time
};
goog.debug.LogRecord.prototype.getSequenceNumber = function() {
  return this.sequenceNumber_
};
goog.provide("goog.debug.LogBuffer");
goog.require("goog.asserts");
goog.require("goog.debug.LogRecord");
goog.debug.LogBuffer = function() {
  goog.asserts.assert(goog.debug.LogBuffer.isBufferingEnabled(), "Cannot use goog.debug.LogBuffer without defining " + "goog.debug.LogBuffer.CAPACITY.");
  this.clear()
};
goog.debug.LogBuffer.getInstance = function() {
  if(!goog.debug.LogBuffer.instance_) {
    goog.debug.LogBuffer.instance_ = new goog.debug.LogBuffer
  }
  return goog.debug.LogBuffer.instance_
};
goog.debug.LogBuffer.CAPACITY = 0;
goog.debug.LogBuffer.prototype.buffer_;
goog.debug.LogBuffer.prototype.curIndex_;
goog.debug.LogBuffer.prototype.isFull_;
goog.debug.LogBuffer.prototype.addRecord = function(level, msg, loggerName) {
  var curIndex = (this.curIndex_ + 1) % goog.debug.LogBuffer.CAPACITY;
  this.curIndex_ = curIndex;
  if(this.isFull_) {
    var ret = this.buffer_[curIndex];
    ret.reset(level, msg, loggerName);
    return ret
  }
  this.isFull_ = curIndex == goog.debug.LogBuffer.CAPACITY - 1;
  return this.buffer_[curIndex] = new goog.debug.LogRecord(level, msg, loggerName)
};
goog.debug.LogBuffer.isBufferingEnabled = function() {
  return goog.debug.LogBuffer.CAPACITY > 0
};
goog.debug.LogBuffer.prototype.clear = function() {
  this.buffer_ = new Array(goog.debug.LogBuffer.CAPACITY);
  this.curIndex_ = -1;
  this.isFull_ = false
};
goog.debug.LogBuffer.prototype.forEachRecord = function(func) {
  var buffer = this.buffer_;
  if(!buffer[0]) {
    return
  }
  var curIndex = this.curIndex_;
  var i = this.isFull_ ? curIndex : -1;
  do {
    i = (i + 1) % goog.debug.LogBuffer.CAPACITY;
    func(buffer[i])
  }while(i != curIndex)
};
goog.provide("goog.debug.LogManager");
goog.provide("goog.debug.Logger");
goog.provide("goog.debug.Logger.Level");
goog.require("goog.array");
goog.require("goog.asserts");
goog.require("goog.debug");
goog.require("goog.debug.LogBuffer");
goog.require("goog.debug.LogRecord");
goog.debug.Logger = function(name) {
  this.name_ = name
};
goog.debug.Logger.prototype.parent_ = null;
goog.debug.Logger.prototype.level_ = null;
goog.debug.Logger.prototype.children_ = null;
goog.debug.Logger.prototype.handlers_ = null;
goog.debug.Logger.ENABLE_HIERARCHY = true;
if(!goog.debug.Logger.ENABLE_HIERARCHY) {
  goog.debug.Logger.rootHandlers_ = [];
  goog.debug.Logger.rootLevel_
}
goog.debug.Logger.Level = function(name, value) {
  this.name = name;
  this.value = value
};
goog.debug.Logger.Level.prototype.toString = function() {
  return this.name
};
goog.debug.Logger.Level.OFF = new goog.debug.Logger.Level("OFF", Infinity);
goog.debug.Logger.Level.SHOUT = new goog.debug.Logger.Level("SHOUT", 1200);
goog.debug.Logger.Level.SEVERE = new goog.debug.Logger.Level("SEVERE", 1E3);
goog.debug.Logger.Level.WARNING = new goog.debug.Logger.Level("WARNING", 900);
goog.debug.Logger.Level.INFO = new goog.debug.Logger.Level("INFO", 800);
goog.debug.Logger.Level.CONFIG = new goog.debug.Logger.Level("CONFIG", 700);
goog.debug.Logger.Level.FINE = new goog.debug.Logger.Level("FINE", 500);
goog.debug.Logger.Level.FINER = new goog.debug.Logger.Level("FINER", 400);
goog.debug.Logger.Level.FINEST = new goog.debug.Logger.Level("FINEST", 300);
goog.debug.Logger.Level.ALL = new goog.debug.Logger.Level("ALL", 0);
goog.debug.Logger.Level.PREDEFINED_LEVELS = [goog.debug.Logger.Level.OFF, goog.debug.Logger.Level.SHOUT, goog.debug.Logger.Level.SEVERE, goog.debug.Logger.Level.WARNING, goog.debug.Logger.Level.INFO, goog.debug.Logger.Level.CONFIG, goog.debug.Logger.Level.FINE, goog.debug.Logger.Level.FINER, goog.debug.Logger.Level.FINEST, goog.debug.Logger.Level.ALL];
goog.debug.Logger.Level.predefinedLevelsCache_ = null;
goog.debug.Logger.Level.createPredefinedLevelsCache_ = function() {
  goog.debug.Logger.Level.predefinedLevelsCache_ = {};
  for(var i = 0, level;level = goog.debug.Logger.Level.PREDEFINED_LEVELS[i];i++) {
    goog.debug.Logger.Level.predefinedLevelsCache_[level.value] = level;
    goog.debug.Logger.Level.predefinedLevelsCache_[level.name] = level
  }
};
goog.debug.Logger.Level.getPredefinedLevel = function(name) {
  if(!goog.debug.Logger.Level.predefinedLevelsCache_) {
    goog.debug.Logger.Level.createPredefinedLevelsCache_()
  }
  return goog.debug.Logger.Level.predefinedLevelsCache_[name] || null
};
goog.debug.Logger.Level.getPredefinedLevelByValue = function(value) {
  if(!goog.debug.Logger.Level.predefinedLevelsCache_) {
    goog.debug.Logger.Level.createPredefinedLevelsCache_()
  }
  if(value in goog.debug.Logger.Level.predefinedLevelsCache_) {
    return goog.debug.Logger.Level.predefinedLevelsCache_[value]
  }
  for(var i = 0;i < goog.debug.Logger.Level.PREDEFINED_LEVELS.length;++i) {
    var level = goog.debug.Logger.Level.PREDEFINED_LEVELS[i];
    if(level.value <= value) {
      return level
    }
  }
  return null
};
goog.debug.Logger.getLogger = function(name) {
  return goog.debug.LogManager.getLogger(name)
};
goog.debug.Logger.logToProfilers = function(msg) {
  if(goog.global["console"]) {
    if(goog.global["console"]["timeStamp"]) {
      goog.global["console"]["timeStamp"](msg)
    }else {
      if(goog.global["console"]["markTimeline"]) {
        goog.global["console"]["markTimeline"](msg)
      }
    }
  }
  if(goog.global["msWriteProfilerMark"]) {
    goog.global["msWriteProfilerMark"](msg)
  }
};
goog.debug.Logger.prototype.getName = function() {
  return this.name_
};
goog.debug.Logger.prototype.addHandler = function(handler) {
  if(goog.debug.Logger.ENABLE_HIERARCHY) {
    if(!this.handlers_) {
      this.handlers_ = []
    }
    this.handlers_.push(handler)
  }else {
    goog.asserts.assert(!this.name_, "Cannot call addHandler on a non-root logger when " + "goog.debug.Logger.ENABLE_HIERARCHY is false.");
    goog.debug.Logger.rootHandlers_.push(handler)
  }
};
goog.debug.Logger.prototype.removeHandler = function(handler) {
  var handlers = goog.debug.Logger.ENABLE_HIERARCHY ? this.handlers_ : goog.debug.Logger.rootHandlers_;
  return!!handlers && goog.array.remove(handlers, handler)
};
goog.debug.Logger.prototype.getParent = function() {
  return this.parent_
};
goog.debug.Logger.prototype.getChildren = function() {
  if(!this.children_) {
    this.children_ = {}
  }
  return this.children_
};
goog.debug.Logger.prototype.setLevel = function(level) {
  if(goog.debug.Logger.ENABLE_HIERARCHY) {
    this.level_ = level
  }else {
    goog.asserts.assert(!this.name_, "Cannot call setLevel() on a non-root logger when " + "goog.debug.Logger.ENABLE_HIERARCHY is false.");
    goog.debug.Logger.rootLevel_ = level
  }
};
goog.debug.Logger.prototype.getLevel = function() {
  return this.level_
};
goog.debug.Logger.prototype.getEffectiveLevel = function() {
  if(!goog.debug.Logger.ENABLE_HIERARCHY) {
    return goog.debug.Logger.rootLevel_
  }
  if(this.level_) {
    return this.level_
  }
  if(this.parent_) {
    return this.parent_.getEffectiveLevel()
  }
  goog.asserts.fail("Root logger has no level set.");
  return null
};
goog.debug.Logger.prototype.isLoggable = function(level) {
  return level.value >= this.getEffectiveLevel().value
};
goog.debug.Logger.prototype.log = function(level, msg, opt_exception) {
  if(this.isLoggable(level)) {
    this.doLogRecord_(this.getLogRecord(level, msg, opt_exception))
  }
};
goog.debug.Logger.prototype.getLogRecord = function(level, msg, opt_exception) {
  if(goog.debug.LogBuffer.isBufferingEnabled()) {
    var logRecord = goog.debug.LogBuffer.getInstance().addRecord(level, msg, this.name_)
  }else {
    logRecord = new goog.debug.LogRecord(level, String(msg), this.name_)
  }
  if(opt_exception) {
    logRecord.setException(opt_exception);
    logRecord.setExceptionText(goog.debug.exposeException(opt_exception, arguments.callee.caller))
  }
  return logRecord
};
goog.debug.Logger.prototype.shout = function(msg, opt_exception) {
  this.log(goog.debug.Logger.Level.SHOUT, msg, opt_exception)
};
goog.debug.Logger.prototype.severe = function(msg, opt_exception) {
  this.log(goog.debug.Logger.Level.SEVERE, msg, opt_exception)
};
goog.debug.Logger.prototype.warning = function(msg, opt_exception) {
  this.log(goog.debug.Logger.Level.WARNING, msg, opt_exception)
};
goog.debug.Logger.prototype.info = function(msg, opt_exception) {
  this.log(goog.debug.Logger.Level.INFO, msg, opt_exception)
};
goog.debug.Logger.prototype.config = function(msg, opt_exception) {
  this.log(goog.debug.Logger.Level.CONFIG, msg, opt_exception)
};
goog.debug.Logger.prototype.fine = function(msg, opt_exception) {
  this.log(goog.debug.Logger.Level.FINE, msg, opt_exception)
};
goog.debug.Logger.prototype.finer = function(msg, opt_exception) {
  this.log(goog.debug.Logger.Level.FINER, msg, opt_exception)
};
goog.debug.Logger.prototype.finest = function(msg, opt_exception) {
  this.log(goog.debug.Logger.Level.FINEST, msg, opt_exception)
};
goog.debug.Logger.prototype.logRecord = function(logRecord) {
  if(this.isLoggable(logRecord.getLevel())) {
    this.doLogRecord_(logRecord)
  }
};
goog.debug.Logger.prototype.doLogRecord_ = function(logRecord) {
  goog.debug.Logger.logToProfilers("log:" + logRecord.getMessage());
  if(goog.debug.Logger.ENABLE_HIERARCHY) {
    var target = this;
    while(target) {
      target.callPublish_(logRecord);
      target = target.getParent()
    }
  }else {
    for(var i = 0, handler;handler = goog.debug.Logger.rootHandlers_[i++];) {
      handler(logRecord)
    }
  }
};
goog.debug.Logger.prototype.callPublish_ = function(logRecord) {
  if(this.handlers_) {
    for(var i = 0, handler;handler = this.handlers_[i];i++) {
      handler(logRecord)
    }
  }
};
goog.debug.Logger.prototype.setParent_ = function(parent) {
  this.parent_ = parent
};
goog.debug.Logger.prototype.addChild_ = function(name, logger) {
  this.getChildren()[name] = logger
};
goog.debug.LogManager = {};
goog.debug.LogManager.loggers_ = {};
goog.debug.LogManager.rootLogger_ = null;
goog.debug.LogManager.initialize = function() {
  if(!goog.debug.LogManager.rootLogger_) {
    goog.debug.LogManager.rootLogger_ = new goog.debug.Logger("");
    goog.debug.LogManager.loggers_[""] = goog.debug.LogManager.rootLogger_;
    goog.debug.LogManager.rootLogger_.setLevel(goog.debug.Logger.Level.CONFIG)
  }
};
goog.debug.LogManager.getLoggers = function() {
  return goog.debug.LogManager.loggers_
};
goog.debug.LogManager.getRoot = function() {
  goog.debug.LogManager.initialize();
  return goog.debug.LogManager.rootLogger_
};
goog.debug.LogManager.getLogger = function(name) {
  goog.debug.LogManager.initialize();
  var ret = goog.debug.LogManager.loggers_[name];
  return ret || goog.debug.LogManager.createLogger_(name)
};
goog.debug.LogManager.createFunctionForCatchErrors = function(opt_logger) {
  return function(info) {
    var logger = opt_logger || goog.debug.LogManager.getRoot();
    logger.severe("Error: " + info.message + " (" + info.fileName + " @ Line: " + info.line + ")")
  }
};
goog.debug.LogManager.createLogger_ = function(name) {
  var logger = new goog.debug.Logger(name);
  if(goog.debug.Logger.ENABLE_HIERARCHY) {
    var lastDotIndex = name.lastIndexOf(".");
    var parentName = name.substr(0, lastDotIndex);
    var leafName = name.substr(lastDotIndex + 1);
    var parentLogger = goog.debug.LogManager.getLogger(parentName);
    parentLogger.addChild_(leafName, logger);
    logger.setParent_(parentLogger)
  }
  goog.debug.LogManager.loggers_[name] = logger;
  return logger
};
goog.provide("goog.messaging.MessageChannel");
goog.messaging.MessageChannel = function() {
};
goog.messaging.MessageChannel.prototype.connect = function(opt_connectCb) {
};
goog.messaging.MessageChannel.prototype.isConnected = function() {
};
goog.messaging.MessageChannel.prototype.registerService = function(serviceName, callback, opt_objectPayload) {
};
goog.messaging.MessageChannel.prototype.registerDefaultService = function(callback) {
};
goog.messaging.MessageChannel.prototype.send = function(serviceName, payload) {
};
goog.provide("goog.messaging.AbstractChannel");
goog.require("goog.Disposable");
goog.require("goog.debug");
goog.require("goog.debug.Logger");
goog.require("goog.json");
goog.require("goog.messaging.MessageChannel");
goog.messaging.AbstractChannel = function() {
  goog.base(this);
  this.services_ = {}
};
goog.inherits(goog.messaging.AbstractChannel, goog.Disposable);
goog.messaging.AbstractChannel.prototype.defaultService_;
goog.messaging.AbstractChannel.prototype.logger = goog.debug.Logger.getLogger("goog.messaging.AbstractChannel");
goog.messaging.AbstractChannel.prototype.connect = function(opt_connectCb) {
  if(opt_connectCb) {
    opt_connectCb()
  }
};
goog.messaging.AbstractChannel.prototype.isConnected = function() {
  return true
};
goog.messaging.AbstractChannel.prototype.registerService = function(serviceName, callback, opt_objectPayload) {
  this.services_[serviceName] = {callback:callback, objectPayload:!!opt_objectPayload}
};
goog.messaging.AbstractChannel.prototype.registerDefaultService = function(callback) {
  this.defaultService_ = callback
};
goog.messaging.AbstractChannel.prototype.send = goog.abstractMethod;
goog.messaging.AbstractChannel.prototype.deliver = function(serviceName, payload) {
  var service = this.getService(serviceName, payload);
  if(!service) {
    return
  }
  var decodedPayload = this.decodePayload(serviceName, payload, service.objectPayload);
  if(goog.isDefAndNotNull(decodedPayload)) {
    service.callback(decodedPayload)
  }
};
goog.messaging.AbstractChannel.prototype.getService = function(serviceName, payload) {
  var service = this.services_[serviceName];
  if(service) {
    return service
  }else {
    if(this.defaultService_) {
      var callback = goog.partial(this.defaultService_, serviceName);
      var objectPayload = goog.isObject(payload);
      return{callback:callback, objectPayload:objectPayload}
    }
  }
  this.logger.warning('Unknown service name "' + serviceName + '"');
  return null
};
goog.messaging.AbstractChannel.prototype.decodePayload = function(serviceName, payload, objectPayload) {
  if(objectPayload && goog.isString(payload)) {
    try {
      return goog.json.parse(payload)
    }catch(err) {
      this.logger.warning("Expected JSON payload for " + serviceName + ', was "' + payload + '"');
      return null
    }
  }else {
    if(!objectPayload && !goog.isString(payload)) {
      return goog.json.serialize(payload)
    }
  }
  return payload
};
goog.messaging.AbstractChannel.prototype.disposeInternal = function() {
  goog.base(this, "disposeInternal");
  goog.dispose(this.logger);
  delete this.logger;
  delete this.services_;
  delete this.defaultService_
};
goog.provide("goog.net.xpc");
goog.provide("goog.net.xpc.CfgFields");
goog.provide("goog.net.xpc.ChannelStates");
goog.provide("goog.net.xpc.TransportNames");
goog.provide("goog.net.xpc.TransportTypes");
goog.provide("goog.net.xpc.UriCfgFields");
goog.require("goog.debug.Logger");
goog.net.xpc.TransportTypes = {NATIVE_MESSAGING:1, FRAME_ELEMENT_METHOD:2, IFRAME_RELAY:3, IFRAME_POLLING:4, FLASH:5, NIX:6};
goog.net.xpc.TransportNames = {1:"NativeMessagingTransport", 2:"FrameElementMethodTransport", 3:"IframeRelayTransport", 4:"IframePollingTransport", 5:"FlashTransport", 6:"NixTransport"};
goog.net.xpc.CfgFields = {CHANNEL_NAME:"cn", AUTH_TOKEN:"at", REMOTE_AUTH_TOKEN:"rat", PEER_URI:"pu", IFRAME_ID:"ifrid", TRANSPORT:"tp", LOCAL_RELAY_URI:"lru", PEER_RELAY_URI:"pru", LOCAL_POLL_URI:"lpu", PEER_POLL_URI:"ppu", PEER_HOSTNAME:"ph"};
goog.net.xpc.UriCfgFields = [goog.net.xpc.CfgFields.PEER_URI, goog.net.xpc.CfgFields.LOCAL_RELAY_URI, goog.net.xpc.CfgFields.PEER_RELAY_URI, goog.net.xpc.CfgFields.LOCAL_POLL_URI, goog.net.xpc.CfgFields.PEER_POLL_URI];
goog.net.xpc.ChannelStates = {NOT_CONNECTED:1, CONNECTED:2, CLOSED:3};
goog.net.xpc.TRANSPORT_SERVICE_ = "tp";
goog.net.xpc.SETUP = "SETUP";
goog.net.xpc.SETUP_ACK_ = "SETUP_ACK";
goog.net.xpc.channels_ = {};
goog.net.xpc.getRandomString = function(length, opt_characters) {
  var chars = opt_characters || goog.net.xpc.randomStringCharacters_;
  var charsLength = chars.length;
  var s = "";
  while(length-- > 0) {
    s += chars.charAt(Math.floor(Math.random() * charsLength))
  }
  return s
};
goog.net.xpc.randomStringCharacters_ = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
goog.net.xpc.logger = goog.debug.Logger.getLogger("goog.net.xpc");
goog.provide("goog.net.xpc.CrossPageChannelRole");
goog.net.xpc.CrossPageChannelRole = {OUTER:0, INNER:1};
goog.provide("goog.net.xpc.Transport");
goog.require("goog.Disposable");
goog.require("goog.dom");
goog.require("goog.net.xpc");
goog.net.xpc.Transport = function(opt_domHelper) {
  goog.Disposable.call(this);
  this.domHelper_ = opt_domHelper || goog.dom.getDomHelper()
};
goog.inherits(goog.net.xpc.Transport, goog.Disposable);
goog.net.xpc.Transport.prototype.transportType = 0;
goog.net.xpc.Transport.prototype.getType = function() {
  return this.transportType
};
goog.net.xpc.Transport.prototype.getWindow = function() {
  return this.domHelper_.getWindow()
};
goog.net.xpc.Transport.prototype.getName = function() {
  return goog.net.xpc.TransportNames[this.transportType] || ""
};
goog.net.xpc.Transport.prototype.transportServiceHandler = goog.abstractMethod;
goog.net.xpc.Transport.prototype.connect = goog.abstractMethod;
goog.net.xpc.Transport.prototype.send = goog.abstractMethod;
goog.provide("goog.net.xpc.FrameElementMethodTransport");
goog.require("goog.net.xpc");
goog.require("goog.net.xpc.CrossPageChannelRole");
goog.require("goog.net.xpc.Transport");
goog.net.xpc.FrameElementMethodTransport = function(channel, opt_domHelper) {
  goog.base(this, opt_domHelper);
  this.channel_ = channel;
  this.queue_ = [];
  this.deliverQueuedCb_ = goog.bind(this.deliverQueued_, this)
};
goog.inherits(goog.net.xpc.FrameElementMethodTransport, goog.net.xpc.Transport);
goog.net.xpc.FrameElementMethodTransport.prototype.transportType = goog.net.xpc.TransportTypes.FRAME_ELEMENT_METHOD;
goog.net.xpc.FrameElementMethodTransport.prototype.recursive_ = false;
goog.net.xpc.FrameElementMethodTransport.prototype.timer_ = 0;
goog.net.xpc.FrameElementMethodTransport.outgoing_ = null;
goog.net.xpc.FrameElementMethodTransport.prototype.connect = function() {
  if(this.channel_.getRole() == goog.net.xpc.CrossPageChannelRole.OUTER) {
    this.iframeElm_ = this.channel_.iframeElement_;
    this.iframeElm_["XPC_toOuter"] = goog.bind(this.incoming_, this)
  }else {
    this.attemptSetup_()
  }
};
goog.net.xpc.FrameElementMethodTransport.prototype.attemptSetup_ = function() {
  var retry = true;
  try {
    if(!this.iframeElm_) {
      this.iframeElm_ = this.getWindow().frameElement
    }
    if(this.iframeElm_ && this.iframeElm_["XPC_toOuter"]) {
      this.outgoing_ = this.iframeElm_["XPC_toOuter"];
      this.iframeElm_["XPC_toOuter"]["XPC_toInner"] = goog.bind(this.incoming_, this);
      retry = false;
      this.send(goog.net.xpc.TRANSPORT_SERVICE_, goog.net.xpc.SETUP_ACK_);
      this.channel_.notifyConnected_()
    }
  }catch(e) {
    goog.net.xpc.logger.severe("exception caught while attempting setup: " + e)
  }
  if(retry) {
    if(!this.attemptSetupCb_) {
      this.attemptSetupCb_ = goog.bind(this.attemptSetup_, this)
    }
    this.getWindow().setTimeout(this.attemptSetupCb_, 100)
  }
};
goog.net.xpc.FrameElementMethodTransport.prototype.transportServiceHandler = function(payload) {
  if(this.channel_.getRole() == goog.net.xpc.CrossPageChannelRole.OUTER && !this.channel_.isConnected() && payload == goog.net.xpc.SETUP_ACK_) {
    this.outgoing_ = this.iframeElm_["XPC_toOuter"]["XPC_toInner"];
    this.channel_.notifyConnected_()
  }else {
    throw Error("Got unexpected transport message.");
  }
};
goog.net.xpc.FrameElementMethodTransport.prototype.incoming_ = function(serviceName, payload) {
  if(!this.recursive_ && this.queue_.length == 0) {
    this.channel_.deliver_(serviceName, payload)
  }else {
    this.queue_.push({serviceName:serviceName, payload:payload});
    if(this.queue_.length == 1) {
      this.timer_ = this.getWindow().setTimeout(this.deliverQueuedCb_, 1)
    }
  }
};
goog.net.xpc.FrameElementMethodTransport.prototype.deliverQueued_ = function() {
  while(this.queue_.length) {
    var msg = this.queue_.shift();
    this.channel_.deliver_(msg.serviceName, msg.payload)
  }
};
goog.net.xpc.FrameElementMethodTransport.prototype.send = function(service, payload) {
  this.recursive_ = true;
  this.outgoing_(service, payload);
  this.recursive_ = false
};
goog.net.xpc.FrameElementMethodTransport.prototype.disposeInternal = function() {
  goog.net.xpc.FrameElementMethodTransport.superClass_.disposeInternal.call(this);
  this.outgoing_ = null;
  this.iframeElm_ = null
};
goog.provide("goog.net.xpc.IframePollingTransport");
goog.provide("goog.net.xpc.IframePollingTransport.Receiver");
goog.provide("goog.net.xpc.IframePollingTransport.Sender");
goog.require("goog.array");
goog.require("goog.dom");
goog.require("goog.net.xpc");
goog.require("goog.net.xpc.CrossPageChannelRole");
goog.require("goog.net.xpc.Transport");
goog.require("goog.userAgent");
goog.net.xpc.IframePollingTransport = function(channel, opt_domHelper) {
  goog.base(this, opt_domHelper);
  this.channel_ = channel;
  this.sendUri_ = this.channel_.cfg_[goog.net.xpc.CfgFields.PEER_POLL_URI];
  this.rcvUri_ = this.channel_.cfg_[goog.net.xpc.CfgFields.LOCAL_POLL_URI];
  this.sendQueue_ = []
};
goog.inherits(goog.net.xpc.IframePollingTransport, goog.net.xpc.Transport);
goog.net.xpc.IframePollingTransport.prototype.transportType = goog.net.xpc.TransportTypes.IFRAME_POLLING;
goog.net.xpc.IframePollingTransport.prototype.sequence_ = 0;
goog.net.xpc.IframePollingTransport.prototype.waitForAck_ = false;
goog.net.xpc.IframePollingTransport.prototype.initialized_ = false;
goog.net.xpc.IframePollingTransport.IFRAME_PREFIX = "googlexpc";
goog.net.xpc.IframePollingTransport.prototype.getMsgFrameName_ = function() {
  return goog.net.xpc.IframePollingTransport.IFRAME_PREFIX + "_" + this.channel_.name + "_msg"
};
goog.net.xpc.IframePollingTransport.prototype.getAckFrameName_ = function() {
  return goog.net.xpc.IframePollingTransport.IFRAME_PREFIX + "_" + this.channel_.name + "_ack"
};
goog.net.xpc.IframePollingTransport.prototype.connect = function() {
  if(this.isDisposed()) {
    return
  }
  goog.net.xpc.logger.fine("transport connect called");
  if(!this.initialized_) {
    goog.net.xpc.logger.fine("initializing...");
    this.constructSenderFrames_();
    this.initialized_ = true
  }
  this.checkForeignFramesReady_()
};
goog.net.xpc.IframePollingTransport.prototype.constructSenderFrames_ = function() {
  var name = this.getMsgFrameName_();
  this.msgIframeElm_ = this.constructSenderFrame_(name);
  this.msgWinObj_ = this.getWindow().frames[name];
  name = this.getAckFrameName_();
  this.ackIframeElm_ = this.constructSenderFrame_(name);
  this.ackWinObj_ = this.getWindow().frames[name]
};
goog.net.xpc.IframePollingTransport.prototype.constructSenderFrame_ = function(id) {
  goog.net.xpc.logger.finest("constructing sender frame: " + id);
  var ifr = goog.dom.createElement("iframe");
  var s = ifr.style;
  s.position = "absolute";
  s.top = "-10px";
  s.left = "10px";
  s.width = "1px";
  s.height = "1px";
  ifr.id = ifr.name = id;
  ifr.src = this.sendUri_ + "#INITIAL";
  this.getWindow().document.body.appendChild(ifr);
  return ifr
};
goog.net.xpc.IframePollingTransport.prototype.innerPeerReconnect_ = function() {
  goog.net.xpc.logger.finest("innerPeerReconnect called");
  this.channel_.name = goog.net.xpc.getRandomString(10);
  goog.net.xpc.logger.finest("switching channels: " + this.channel_.name);
  this.deconstructSenderFrames_();
  this.initialized_ = false;
  this.reconnectFrame_ = this.constructSenderFrame_(goog.net.xpc.IframePollingTransport.IFRAME_PREFIX + "_reconnect_" + this.channel_.name)
};
goog.net.xpc.IframePollingTransport.prototype.outerPeerReconnect_ = function() {
  goog.net.xpc.logger.finest("outerPeerReconnect called");
  var frames = this.channel_.peerWindowObject_.frames;
  var length = frames.length;
  for(var i = 0;i < length;i++) {
    var frameName;
    try {
      if(frames[i] && frames[i].name) {
        frameName = frames[i].name
      }
    }catch(e) {
    }
    if(!frameName) {
      continue
    }
    var message = frameName.split("_");
    if(message.length == 3 && message[0] == goog.net.xpc.IframePollingTransport.IFRAME_PREFIX && message[1] == "reconnect") {
      this.channel_.name = message[2];
      this.deconstructSenderFrames_();
      this.initialized_ = false;
      break
    }
  }
};
goog.net.xpc.IframePollingTransport.prototype.deconstructSenderFrames_ = function() {
  goog.net.xpc.logger.finest("deconstructSenderFrames called");
  if(this.msgIframeElm_) {
    this.msgIframeElm_.parentNode.removeChild(this.msgIframeElm_);
    this.msgIframeElm_ = null;
    this.msgWinObj_ = null
  }
  if(this.ackIframeElm_) {
    this.ackIframeElm_.parentNode.removeChild(this.ackIframeElm_);
    this.ackIframeElm_ = null;
    this.ackWinObj_ = null
  }
};
goog.net.xpc.IframePollingTransport.prototype.checkForeignFramesReady_ = function() {
  if(!(this.isRcvFrameReady_(this.getMsgFrameName_()) && this.isRcvFrameReady_(this.getAckFrameName_()))) {
    goog.net.xpc.logger.finest("foreign frames not (yet) present");
    if(this.channel_.getRole() == goog.net.xpc.CrossPageChannelRole.INNER && !this.reconnectFrame_) {
      this.innerPeerReconnect_()
    }else {
      if(this.channel_.getRole() == goog.net.xpc.CrossPageChannelRole.OUTER) {
        this.outerPeerReconnect_()
      }
    }
    this.getWindow().setTimeout(goog.bind(this.connect, this), 100)
  }else {
    goog.net.xpc.logger.fine("foreign frames present");
    this.msgReceiver_ = new goog.net.xpc.IframePollingTransport.Receiver(this, this.channel_.peerWindowObject_.frames[this.getMsgFrameName_()], goog.bind(this.processIncomingMsg, this));
    this.ackReceiver_ = new goog.net.xpc.IframePollingTransport.Receiver(this, this.channel_.peerWindowObject_.frames[this.getAckFrameName_()], goog.bind(this.processIncomingAck, this));
    this.checkLocalFramesPresent_()
  }
};
goog.net.xpc.IframePollingTransport.prototype.isRcvFrameReady_ = function(frameName) {
  goog.net.xpc.logger.finest("checking for receive frame: " + frameName);
  try {
    var winObj = this.channel_.peerWindowObject_.frames[frameName];
    if(!winObj || winObj.location.href.indexOf(this.rcvUri_) != 0) {
      return false
    }
  }catch(e) {
    return false
  }
  return true
};
goog.net.xpc.IframePollingTransport.prototype.checkLocalFramesPresent_ = function() {
  var frames = this.channel_.peerWindowObject_.frames;
  if(!(frames[this.getAckFrameName_()] && frames[this.getMsgFrameName_()])) {
    if(!this.checkLocalFramesPresentCb_) {
      this.checkLocalFramesPresentCb_ = goog.bind(this.checkLocalFramesPresent_, this)
    }
    this.getWindow().setTimeout(this.checkLocalFramesPresentCb_, 100);
    goog.net.xpc.logger.fine("local frames not (yet) present")
  }else {
    this.msgSender_ = new goog.net.xpc.IframePollingTransport.Sender(this.sendUri_, this.msgWinObj_);
    this.ackSender_ = new goog.net.xpc.IframePollingTransport.Sender(this.sendUri_, this.ackWinObj_);
    goog.net.xpc.logger.fine("local frames ready");
    this.getWindow().setTimeout(goog.bind(function() {
      this.msgSender_.send(goog.net.xpc.SETUP);
      this.sentConnectionSetup_ = true;
      this.waitForAck_ = true;
      goog.net.xpc.logger.fine("SETUP sent")
    }, this), 100)
  }
};
goog.net.xpc.IframePollingTransport.prototype.checkIfConnected_ = function() {
  if(this.sentConnectionSetupAck_ && this.rcvdConnectionSetupAck_) {
    this.channel_.notifyConnected_();
    if(this.deliveryQueue_) {
      goog.net.xpc.logger.fine("delivering queued messages " + "(" + this.deliveryQueue_.length + ")");
      for(var i = 0, m;i < this.deliveryQueue_.length;i++) {
        m = this.deliveryQueue_[i];
        this.channel_.deliver_(m.service, m.payload)
      }
      delete this.deliveryQueue_
    }
  }else {
    goog.net.xpc.logger.finest("checking if connected: " + "ack sent:" + this.sentConnectionSetupAck_ + ", ack rcvd: " + this.rcvdConnectionSetupAck_)
  }
};
goog.net.xpc.IframePollingTransport.prototype.processIncomingMsg = function(raw) {
  goog.net.xpc.logger.finest("msg received: " + raw);
  if(raw == goog.net.xpc.SETUP) {
    if(!this.ackSender_) {
      return
    }
    this.ackSender_.send(goog.net.xpc.SETUP_ACK_);
    goog.net.xpc.logger.finest("SETUP_ACK sent");
    this.sentConnectionSetupAck_ = true;
    this.checkIfConnected_()
  }else {
    if(this.channel_.isConnected() || this.sentConnectionSetupAck_) {
      var pos = raw.indexOf("|");
      var head = raw.substring(0, pos);
      var frame = raw.substring(pos + 1);
      pos = head.indexOf(",");
      if(pos == -1) {
        var seq = head;
        this.ackSender_.send("ACK:" + seq);
        this.deliverPayload_(frame)
      }else {
        var seq = head.substring(0, pos);
        this.ackSender_.send("ACK:" + seq);
        var partInfo = head.substring(pos + 1).split("/");
        var part0 = parseInt(partInfo[0], 10);
        var part1 = parseInt(partInfo[1], 10);
        if(part0 == 1) {
          this.parts_ = []
        }
        this.parts_.push(frame);
        if(part0 == part1) {
          this.deliverPayload_(this.parts_.join(""));
          delete this.parts_
        }
      }
    }else {
      goog.net.xpc.logger.warning("received msg, but channel is not connected")
    }
  }
};
goog.net.xpc.IframePollingTransport.prototype.processIncomingAck = function(msgStr) {
  goog.net.xpc.logger.finest("ack received: " + msgStr);
  if(msgStr == goog.net.xpc.SETUP_ACK_) {
    this.waitForAck_ = false;
    this.rcvdConnectionSetupAck_ = true;
    this.checkIfConnected_()
  }else {
    if(this.channel_.isConnected()) {
      if(!this.waitForAck_) {
        goog.net.xpc.logger.warning("got unexpected ack");
        return
      }
      var seq = parseInt(msgStr.split(":")[1], 10);
      if(seq == this.sequence_) {
        this.waitForAck_ = false;
        this.sendNextFrame_()
      }else {
        goog.net.xpc.logger.warning("got ack with wrong sequence")
      }
    }else {
      goog.net.xpc.logger.warning("received ack, but channel not connected")
    }
  }
};
goog.net.xpc.IframePollingTransport.prototype.sendNextFrame_ = function() {
  if(this.waitForAck_ || !this.sendQueue_.length) {
    return
  }
  var s = this.sendQueue_.shift();
  ++this.sequence_;
  this.msgSender_.send(this.sequence_ + s);
  goog.net.xpc.logger.finest("msg sent: " + this.sequence_ + s);
  this.waitForAck_ = true
};
goog.net.xpc.IframePollingTransport.prototype.deliverPayload_ = function(s) {
  var pos = s.indexOf(":");
  var service = s.substr(0, pos);
  var payload = s.substring(pos + 1);
  if(!this.channel_.isConnected()) {
    (this.deliveryQueue_ || (this.deliveryQueue_ = [])).push({service:service, payload:payload});
    goog.net.xpc.logger.finest("queued delivery")
  }else {
    this.channel_.deliver_(service, payload)
  }
};
goog.net.xpc.IframePollingTransport.prototype.MAX_FRAME_LENGTH_ = 3800;
goog.net.xpc.IframePollingTransport.prototype.send = function(service, payload) {
  var frame = service + ":" + payload;
  if(!goog.userAgent.IE || payload.length <= this.MAX_FRAME_LENGTH_) {
    this.sendQueue_.push("|" + frame)
  }else {
    var l = payload.length;
    var num = Math.ceil(l / this.MAX_FRAME_LENGTH_);
    var pos = 0;
    var i = 1;
    while(pos < l) {
      this.sendQueue_.push("," + i + "/" + num + "|" + frame.substr(pos, this.MAX_FRAME_LENGTH_));
      i++;
      pos += this.MAX_FRAME_LENGTH_
    }
  }
  this.sendNextFrame_()
};
goog.net.xpc.IframePollingTransport.prototype.disposeInternal = function() {
  goog.base(this, "disposeInternal");
  var receivers = goog.net.xpc.IframePollingTransport.receivers_;
  goog.array.remove(receivers, this.msgReceiver_);
  goog.array.remove(receivers, this.ackReceiver_);
  this.msgReceiver_ = this.ackReceiver_ = null;
  goog.dom.removeNode(this.msgIframeElm_);
  goog.dom.removeNode(this.ackIframeElm_);
  this.msgIframeElm_ = this.ackIframeElm_ = null;
  this.msgWinObj_ = this.ackWinObj_ = null
};
goog.net.xpc.IframePollingTransport.receivers_ = [];
goog.net.xpc.IframePollingTransport.TIME_POLL_SHORT_ = 10;
goog.net.xpc.IframePollingTransport.TIME_POLL_LONG_ = 100;
goog.net.xpc.IframePollingTransport.TIME_SHORT_POLL_AFTER_ACTIVITY_ = 1E3;
goog.net.xpc.IframePollingTransport.receive_ = function() {
  var rcvd = false;
  try {
    for(var i = 0, l = goog.net.xpc.IframePollingTransport.receivers_.length;i < l;i++) {
      rcvd = rcvd || goog.net.xpc.IframePollingTransport.receivers_[i].receive()
    }
  }catch(e) {
    goog.net.xpc.logger.info("receive_() failed: " + e);
    goog.net.xpc.IframePollingTransport.receivers_[i].transport_.channel_.notifyTransportError_();
    if(!goog.net.xpc.IframePollingTransport.receivers_.length) {
      return
    }
  }
  var now = goog.now();
  if(rcvd) {
    goog.net.xpc.IframePollingTransport.lastActivity_ = now
  }
  var t = now - goog.net.xpc.IframePollingTransport.lastActivity_ < goog.net.xpc.IframePollingTransport.TIME_SHORT_POLL_AFTER_ACTIVITY_ ? goog.net.xpc.IframePollingTransport.TIME_POLL_SHORT_ : goog.net.xpc.IframePollingTransport.TIME_POLL_LONG_;
  goog.net.xpc.IframePollingTransport.rcvTimer_ = window.setTimeout(goog.net.xpc.IframePollingTransport.receiveCb_, t)
};
goog.net.xpc.IframePollingTransport.receiveCb_ = goog.bind(goog.net.xpc.IframePollingTransport.receive_, goog.net.xpc.IframePollingTransport);
goog.net.xpc.IframePollingTransport.startRcvTimer_ = function() {
  goog.net.xpc.logger.fine("starting receive-timer");
  goog.net.xpc.IframePollingTransport.lastActivity_ = goog.now();
  if(goog.net.xpc.IframePollingTransport.rcvTimer_) {
    window.clearTimeout(goog.net.xpc.IframePollingTransport.rcvTimer_)
  }
  goog.net.xpc.IframePollingTransport.rcvTimer_ = window.setTimeout(goog.net.xpc.IframePollingTransport.receiveCb_, goog.net.xpc.IframePollingTransport.TIME_POLL_SHORT_)
};
goog.net.xpc.IframePollingTransport.Sender = function(url, windowObj) {
  this.sendUri_ = url;
  this.sendFrame_ = windowObj;
  this.cycle_ = 0
};
goog.net.xpc.IframePollingTransport.Sender.prototype.send = function(payload) {
  this.cycle_ = ++this.cycle_ % 2;
  var url = this.sendUri_ + "#" + this.cycle_ + encodeURIComponent(payload);
  try {
    if(goog.userAgent.WEBKIT) {
      this.sendFrame_.location.href = url
    }else {
      this.sendFrame_.location.replace(url)
    }
  }catch(e) {
    goog.net.xpc.logger.severe("sending failed", e)
  }
  goog.net.xpc.IframePollingTransport.startRcvTimer_()
};
goog.net.xpc.IframePollingTransport.Receiver = function(transport, windowObj, callback) {
  this.transport_ = transport;
  this.rcvFrame_ = windowObj;
  this.cb_ = callback;
  this.currentLoc_ = this.rcvFrame_.location.href.split("#")[0] + "#INITIAL";
  goog.net.xpc.IframePollingTransport.receivers_.push(this);
  goog.net.xpc.IframePollingTransport.startRcvTimer_()
};
goog.net.xpc.IframePollingTransport.Receiver.prototype.receive = function() {
  var loc = this.rcvFrame_.location.href;
  if(loc != this.currentLoc_) {
    this.currentLoc_ = loc;
    var payload = loc.split("#")[1];
    if(payload) {
      payload = payload.substr(1);
      this.cb_(decodeURIComponent(payload))
    }
    return true
  }else {
    return false
  }
};
goog.provide("goog.net.xpc.IframeRelayTransport");
goog.require("goog.dom");
goog.require("goog.events");
goog.require("goog.net.xpc");
goog.require("goog.net.xpc.Transport");
goog.require("goog.userAgent");
goog.net.xpc.IframeRelayTransport = function(channel, opt_domHelper) {
  goog.base(this, opt_domHelper);
  this.channel_ = channel;
  this.peerRelayUri_ = this.channel_.cfg_[goog.net.xpc.CfgFields.PEER_RELAY_URI];
  this.peerIframeId_ = this.channel_.cfg_[goog.net.xpc.CfgFields.IFRAME_ID];
  if(goog.userAgent.WEBKIT) {
    goog.net.xpc.IframeRelayTransport.startCleanupTimer_()
  }
};
goog.inherits(goog.net.xpc.IframeRelayTransport, goog.net.xpc.Transport);
if(goog.userAgent.WEBKIT) {
  goog.net.xpc.IframeRelayTransport.iframeRefs_ = [];
  goog.net.xpc.IframeRelayTransport.CLEANUP_INTERVAL_ = 1E3;
  goog.net.xpc.IframeRelayTransport.IFRAME_MAX_AGE_ = 3E3;
  goog.net.xpc.IframeRelayTransport.cleanupTimer_ = 0;
  goog.net.xpc.IframeRelayTransport.startCleanupTimer_ = function() {
    if(!goog.net.xpc.IframeRelayTransport.cleanupTimer_) {
      goog.net.xpc.IframeRelayTransport.cleanupTimer_ = window.setTimeout(function() {
        goog.net.xpc.IframeRelayTransport.cleanup_()
      }, goog.net.xpc.IframeRelayTransport.CLEANUP_INTERVAL_)
    }
  };
  goog.net.xpc.IframeRelayTransport.cleanup_ = function(opt_maxAge) {
    var now = goog.now();
    var maxAge = opt_maxAge || goog.net.xpc.IframeRelayTransport.IFRAME_MAX_AGE_;
    while(goog.net.xpc.IframeRelayTransport.iframeRefs_.length && now - goog.net.xpc.IframeRelayTransport.iframeRefs_[0].timestamp >= maxAge) {
      var ifr = goog.net.xpc.IframeRelayTransport.iframeRefs_.shift().iframeElement;
      goog.dom.removeNode(ifr);
      goog.net.xpc.logger.finest("iframe removed")
    }
    goog.net.xpc.IframeRelayTransport.cleanupTimer_ = window.setTimeout(goog.net.xpc.IframeRelayTransport.cleanupCb_, goog.net.xpc.IframeRelayTransport.CLEANUP_INTERVAL_)
  };
  goog.net.xpc.IframeRelayTransport.cleanupCb_ = function() {
    goog.net.xpc.IframeRelayTransport.cleanup_()
  }
}
goog.net.xpc.IframeRelayTransport.IE_PAYLOAD_MAX_SIZE_ = 1800;
goog.net.xpc.IframeRelayTransport.FragmentInfo;
goog.net.xpc.IframeRelayTransport.fragmentMap_ = {};
goog.net.xpc.IframeRelayTransport.prototype.transportType = goog.net.xpc.TransportTypes.IFRAME_RELAY;
goog.net.xpc.IframeRelayTransport.prototype.connect = function() {
  if(!this.getWindow()["xpcRelay"]) {
    this.getWindow()["xpcRelay"] = goog.net.xpc.IframeRelayTransport.receiveMessage_
  }
  this.send(goog.net.xpc.TRANSPORT_SERVICE_, goog.net.xpc.SETUP)
};
goog.net.xpc.IframeRelayTransport.receiveMessage_ = function(channelName, frame) {
  var pos = frame.indexOf(":");
  var header = frame.substr(0, pos);
  var payload = frame.substr(pos + 1);
  if(!goog.userAgent.IE || (pos = header.indexOf("|")) == -1) {
    var service = header
  }else {
    var service = header.substr(0, pos);
    var fragmentIdStr = header.substr(pos + 1);
    pos = fragmentIdStr.indexOf("+");
    var messageIdStr = fragmentIdStr.substr(0, pos);
    var fragmentNum = parseInt(fragmentIdStr.substr(pos + 1), 10);
    var fragmentInfo = goog.net.xpc.IframeRelayTransport.fragmentMap_[messageIdStr];
    if(!fragmentInfo) {
      fragmentInfo = goog.net.xpc.IframeRelayTransport.fragmentMap_[messageIdStr] = {fragments:[], received:0, expected:0}
    }
    if(goog.string.contains(fragmentIdStr, "++")) {
      fragmentInfo.expected = fragmentNum + 1
    }
    fragmentInfo.fragments[fragmentNum] = payload;
    fragmentInfo.received++;
    if(fragmentInfo.received != fragmentInfo.expected) {
      return
    }
    payload = fragmentInfo.fragments.join("");
    delete goog.net.xpc.IframeRelayTransport.fragmentMap_[messageIdStr]
  }
  goog.net.xpc.channels_[channelName].deliver_(service, decodeURIComponent(payload))
};
goog.net.xpc.IframeRelayTransport.prototype.transportServiceHandler = function(payload) {
  if(payload == goog.net.xpc.SETUP) {
    this.send(goog.net.xpc.TRANSPORT_SERVICE_, goog.net.xpc.SETUP_ACK_);
    this.channel_.notifyConnected_()
  }else {
    if(payload == goog.net.xpc.SETUP_ACK_) {
      this.channel_.notifyConnected_()
    }
  }
};
goog.net.xpc.IframeRelayTransport.prototype.send = function(service, payload) {
  var encodedPayload = encodeURIComponent(payload);
  var encodedLen = encodedPayload.length;
  var maxSize = goog.net.xpc.IframeRelayTransport.IE_PAYLOAD_MAX_SIZE_;
  if(goog.userAgent.IE && encodedLen > maxSize) {
    var messageIdStr = goog.string.getRandomString();
    for(var startIndex = 0, fragmentNum = 0;startIndex < encodedLen;fragmentNum++) {
      var payloadFragment = encodedPayload.substr(startIndex, maxSize);
      startIndex += maxSize;
      var fragmentIdStr = messageIdStr + (startIndex >= encodedLen ? "++" : "+") + fragmentNum;
      this.send_(service, payloadFragment, fragmentIdStr)
    }
  }else {
    this.send_(service, encodedPayload)
  }
};
goog.net.xpc.IframeRelayTransport.prototype.send_ = function(service, encodedPayload, opt_fragmentIdStr) {
  if(goog.userAgent.IE) {
    var div = this.getWindow().document.createElement("div");
    div.innerHTML = '<iframe onload="this.xpcOnload()"></iframe>';
    var ifr = div.childNodes[0];
    div = null;
    ifr["xpcOnload"] = goog.net.xpc.IframeRelayTransport.iframeLoadHandler_
  }else {
    var ifr = this.getWindow().document.createElement("iframe");
    if(goog.userAgent.WEBKIT) {
      goog.net.xpc.IframeRelayTransport.iframeRefs_.push({timestamp:goog.now(), iframeElement:ifr})
    }else {
      goog.events.listen(ifr, "load", goog.net.xpc.IframeRelayTransport.iframeLoadHandler_)
    }
  }
  var style = ifr.style;
  style.visibility = "hidden";
  style.width = ifr.style.height = "0px";
  style.position = "absolute";
  var url = this.peerRelayUri_;
  url += "#" + this.channel_.name;
  if(this.peerIframeId_) {
    url += "," + this.peerIframeId_
  }
  url += "|" + service;
  if(opt_fragmentIdStr) {
    url += "|" + opt_fragmentIdStr
  }
  url += ":" + encodedPayload;
  ifr.src = url;
  this.getWindow().document.body.appendChild(ifr);
  goog.net.xpc.logger.finest("msg sent: " + url)
};
goog.net.xpc.IframeRelayTransport.iframeLoadHandler_ = function() {
  goog.net.xpc.logger.finest("iframe-load");
  goog.dom.removeNode(this);
  this.xpcOnload = null
};
goog.net.xpc.IframeRelayTransport.prototype.disposeInternal = function() {
  goog.base(this, "disposeInternal");
  if(goog.userAgent.WEBKIT) {
    goog.net.xpc.IframeRelayTransport.cleanup_(0)
  }
};
goog.provide("goog.net.xpc.NativeMessagingTransport");
goog.require("goog.events");
goog.require("goog.net.xpc");
goog.require("goog.net.xpc.CrossPageChannelRole");
goog.require("goog.net.xpc.Transport");
goog.net.xpc.NativeMessagingTransport = function(channel, peerHostname, opt_domHelper) {
  goog.base(this, opt_domHelper);
  this.channel_ = channel;
  this.peerHostname_ = peerHostname || "*"
};
goog.inherits(goog.net.xpc.NativeMessagingTransport, goog.net.xpc.Transport);
goog.net.xpc.NativeMessagingTransport.prototype.initialized_ = false;
goog.net.xpc.NativeMessagingTransport.prototype.transportType = goog.net.xpc.TransportTypes.NATIVE_MESSAGING;
goog.net.xpc.NativeMessagingTransport.activeCount_ = {};
goog.net.xpc.NativeMessagingTransport.initialize_ = function(listenWindow) {
  var uid = goog.getUid(listenWindow);
  var value = goog.net.xpc.NativeMessagingTransport.activeCount_[uid];
  if(!goog.isNumber(value)) {
    value = 0
  }
  if(value == 0) {
    goog.events.listen(listenWindow.postMessage ? listenWindow : listenWindow.document, "message", goog.net.xpc.NativeMessagingTransport.messageReceived_, false, goog.net.xpc.NativeMessagingTransport)
  }
  goog.net.xpc.NativeMessagingTransport.activeCount_[uid] = value + 1
};
goog.net.xpc.NativeMessagingTransport.messageReceived_ = function(msgEvt) {
  var data = msgEvt.getBrowserEvent().data;
  if(!goog.isString(data)) {
    return false
  }
  var headDelim = data.indexOf("|");
  var serviceDelim = data.indexOf(":");
  if(headDelim == -1 || serviceDelim == -1) {
    return false
  }
  var channelName = data.substring(0, headDelim);
  var service = data.substring(headDelim + 1, serviceDelim);
  var payload = data.substring(serviceDelim + 1);
  goog.net.xpc.logger.fine("messageReceived: channel=" + channelName + ", service=" + service + ", payload=" + payload);
  var channel = goog.net.xpc.channels_[channelName];
  if(channel) {
    channel.deliver_(service, payload, msgEvt.getBrowserEvent().origin);
    return true
  }
  for(var staleChannelName in goog.net.xpc.channels_) {
    var staleChannel = goog.net.xpc.channels_[staleChannelName];
    if(staleChannel.getRole() == goog.net.xpc.CrossPageChannelRole.INNER && !staleChannel.isConnected() && service == goog.net.xpc.TRANSPORT_SERVICE_ && payload == goog.net.xpc.SETUP) {
      goog.net.xpc.logger.fine("changing channel name to " + channelName);
      staleChannel.name = channelName;
      delete goog.net.xpc.channels_[staleChannelName];
      goog.net.xpc.channels_[channelName] = staleChannel;
      staleChannel.deliver_(service, payload);
      return true
    }
  }
  goog.net.xpc.logger.info('channel name mismatch; message ignored"');
  return false
};
goog.net.xpc.NativeMessagingTransport.prototype.transportServiceHandler = function(payload) {
  switch(payload) {
    case goog.net.xpc.SETUP:
      this.send(goog.net.xpc.TRANSPORT_SERVICE_, goog.net.xpc.SETUP_ACK_);
      break;
    case goog.net.xpc.SETUP_ACK_:
      this.channel_.notifyConnected_();
      break
  }
};
goog.net.xpc.NativeMessagingTransport.prototype.connect = function() {
  goog.net.xpc.NativeMessagingTransport.initialize_(this.getWindow());
  this.initialized_ = true;
  this.connectWithRetries_()
};
goog.net.xpc.NativeMessagingTransport.prototype.connectWithRetries_ = function() {
  if(this.channel_.isConnected() || this.isDisposed()) {
    return
  }
  this.send(goog.net.xpc.TRANSPORT_SERVICE_, goog.net.xpc.SETUP);
  this.getWindow().setTimeout(goog.bind(this.connectWithRetries_, this), 100)
};
goog.net.xpc.NativeMessagingTransport.prototype.send = function(service, payload) {
  var win = this.channel_.peerWindowObject_;
  if(!win) {
    goog.net.xpc.logger.fine("send(): window not ready");
    return
  }
  var obj = win.postMessage ? win : win.document;
  this.send = function(service, payload) {
    goog.net.xpc.logger.fine("send(): payload=" + payload + " to hostname=" + this.peerHostname_);
    obj.postMessage(this.channel_.name + "|" + service + ":" + payload, this.peerHostname_)
  };
  this.send(service, payload)
};
goog.net.xpc.NativeMessagingTransport.prototype.disposeInternal = function() {
  goog.base(this, "disposeInternal");
  if(this.initialized_) {
    var listenWindow = this.getWindow();
    var uid = goog.getUid(listenWindow);
    var value = goog.net.xpc.NativeMessagingTransport.activeCount_[uid];
    goog.net.xpc.NativeMessagingTransport.activeCount_[uid] = value - 1;
    if(value == 1) {
      goog.events.unlisten(listenWindow.postMessage ? listenWindow : listenWindow.document, "message", goog.net.xpc.NativeMessagingTransport.messageReceived_, false, goog.net.xpc.NativeMessagingTransport)
    }
  }
  delete this.send
};
goog.provide("goog.net.xpc.NixTransport");
goog.require("goog.net.xpc");
goog.require("goog.net.xpc.CrossPageChannelRole");
goog.require("goog.net.xpc.Transport");
goog.require("goog.reflect");
goog.net.xpc.NixTransport = function(channel, opt_domHelper) {
  goog.base(this, opt_domHelper);
  this.channel_ = channel;
  this.authToken_ = channel[goog.net.xpc.CfgFields.AUTH_TOKEN] || "";
  this.remoteAuthToken_ = channel[goog.net.xpc.CfgFields.REMOTE_AUTH_TOKEN] || "";
  goog.net.xpc.NixTransport.conductGlobalSetup_(this.getWindow());
  this[goog.net.xpc.NixTransport.NIX_HANDLE_MESSAGE] = this.handleMessage_;
  this[goog.net.xpc.NixTransport.NIX_CREATE_CHANNEL] = this.createChannel_
};
goog.inherits(goog.net.xpc.NixTransport, goog.net.xpc.Transport);
goog.net.xpc.NixTransport.NIX_WRAPPER = "GCXPC____NIXVBS_wrapper";
goog.net.xpc.NixTransport.NIX_GET_WRAPPER = "GCXPC____NIXVBS_get_wrapper";
goog.net.xpc.NixTransport.NIX_HANDLE_MESSAGE = "GCXPC____NIXJS_handle_message";
goog.net.xpc.NixTransport.NIX_CREATE_CHANNEL = "GCXPC____NIXJS_create_channel";
goog.net.xpc.NixTransport.NIX_ID_FIELD = "GCXPC____NIXVBS_container";
goog.net.xpc.NixTransport.isNixSupported = function() {
  var isSupported = false;
  try {
    var oldOpener = window.opener;
    window.opener = {};
    isSupported = goog.reflect.canAccessProperty(window, "opener");
    window.opener = oldOpener
  }catch(e) {
  }
  return isSupported
};
goog.net.xpc.NixTransport.conductGlobalSetup_ = function(listenWindow) {
  if(listenWindow["nix_setup_complete"]) {
    return
  }
  var vbscript = "Class " + goog.net.xpc.NixTransport.NIX_WRAPPER + "\n " + "Private m_Transport\n" + "Private m_Auth\n" + "Public Sub SetTransport(transport)\n" + "If isEmpty(m_Transport) Then\n" + "Set m_Transport = transport\n" + "End If\n" + "End Sub\n" + "Public Sub SetAuth(auth)\n" + "If isEmpty(m_Auth) Then\n" + "m_Auth = auth\n" + "End If\n" + "End Sub\n" + "Public Function GetAuthToken()\n " + "GetAuthToken = m_Auth\n" + "End Function\n" + "Public Sub SendMessage(service, payload)\n " + 
  "Call m_Transport." + goog.net.xpc.NixTransport.NIX_HANDLE_MESSAGE + "(service, payload)\n" + "End Sub\n" + "Public Sub CreateChannel(channel)\n " + "Call m_Transport." + goog.net.xpc.NixTransport.NIX_CREATE_CHANNEL + "(channel)\n" + "End Sub\n" + "Public Sub " + goog.net.xpc.NixTransport.NIX_ID_FIELD + "()\n " + "End Sub\n" + "End Class\n " + "Function " + goog.net.xpc.NixTransport.NIX_GET_WRAPPER + "(transport, auth)\n" + "Dim wrap\n" + "Set wrap = New " + goog.net.xpc.NixTransport.NIX_WRAPPER + 
  "\n" + "wrap.SetTransport transport\n" + "wrap.SetAuth auth\n" + "Set " + goog.net.xpc.NixTransport.NIX_GET_WRAPPER + " = wrap\n" + "End Function";
  try {
    listenWindow.execScript(vbscript, "vbscript");
    listenWindow["nix_setup_complete"] = true
  }catch(e) {
    goog.net.xpc.logger.severe("exception caught while attempting global setup: " + e)
  }
};
goog.net.xpc.NixTransport.prototype.transportType = goog.net.xpc.TransportTypes.NIX;
goog.net.xpc.NixTransport.prototype.localSetupCompleted_ = false;
goog.net.xpc.NixTransport.prototype.nixChannel_ = null;
goog.net.xpc.NixTransport.prototype.connect = function() {
  if(this.channel_.getRole() == goog.net.xpc.CrossPageChannelRole.OUTER) {
    this.attemptOuterSetup_()
  }else {
    this.attemptInnerSetup_()
  }
};
goog.net.xpc.NixTransport.prototype.attemptOuterSetup_ = function() {
  if(this.localSetupCompleted_) {
    return
  }
  var innerFrame = this.channel_.iframeElement_;
  try {
    innerFrame.contentWindow.opener = this.getWindow()[goog.net.xpc.NixTransport.NIX_GET_WRAPPER](this, this.authToken_);
    this.localSetupCompleted_ = true
  }catch(e) {
    goog.net.xpc.logger.severe("exception caught while attempting setup: " + e)
  }
  if(!this.localSetupCompleted_) {
    this.getWindow().setTimeout(goog.bind(this.attemptOuterSetup_, this), 100)
  }
};
goog.net.xpc.NixTransport.prototype.attemptInnerSetup_ = function() {
  if(this.localSetupCompleted_) {
    return
  }
  try {
    var opener = this.getWindow().opener;
    if(opener && goog.net.xpc.NixTransport.NIX_ID_FIELD in opener) {
      this.nixChannel_ = opener;
      var remoteAuthToken = this.nixChannel_["GetAuthToken"]();
      if(remoteAuthToken != this.remoteAuthToken_) {
        goog.net.xpc.logger.severe("Invalid auth token from other party");
        return
      }
      this.nixChannel_["CreateChannel"](this.getWindow()[goog.net.xpc.NixTransport.NIX_GET_WRAPPER](this, this.authToken_));
      this.localSetupCompleted_ = true;
      this.channel_.notifyConnected_()
    }
  }catch(e) {
    goog.net.xpc.logger.severe("exception caught while attempting setup: " + e);
    return
  }
  if(!this.localSetupCompleted_) {
    this.getWindow().setTimeout(goog.bind(this.attemptInnerSetup_, this), 100)
  }
};
goog.net.xpc.NixTransport.prototype.createChannel_ = function(channel) {
  if(typeof channel != "unknown" || !(goog.net.xpc.NixTransport.NIX_ID_FIELD in channel)) {
    goog.net.xpc.logger.severe("Invalid NIX channel given to createChannel_")
  }
  this.nixChannel_ = channel;
  var remoteAuthToken = this.nixChannel_["GetAuthToken"]();
  if(remoteAuthToken != this.remoteAuthToken_) {
    goog.net.xpc.logger.severe("Invalid auth token from other party");
    return
  }
  this.channel_.notifyConnected_()
};
goog.net.xpc.NixTransport.prototype.handleMessage_ = function(serviceName, payload) {
  function deliveryHandler() {
    this.channel_.deliver_(serviceName, payload)
  }
  this.getWindow().setTimeout(goog.bind(deliveryHandler, this), 1)
};
goog.net.xpc.NixTransport.prototype.send = function(service, payload) {
  if(typeof this.nixChannel_ !== "unknown") {
    goog.net.xpc.logger.severe("NIX channel not connected")
  }
  this.nixChannel_["SendMessage"](service, payload)
};
goog.net.xpc.NixTransport.prototype.disposeInternal = function() {
  goog.base(this, "disposeInternal");
  this.nixChannel_ = null
};
goog.provide("goog.net.xpc.CrossPageChannel");
goog.require("goog.Disposable");
goog.require("goog.Uri");
goog.require("goog.dom");
goog.require("goog.events");
goog.require("goog.json");
goog.require("goog.messaging.AbstractChannel");
goog.require("goog.net.xpc");
goog.require("goog.net.xpc.CrossPageChannelRole");
goog.require("goog.net.xpc.FrameElementMethodTransport");
goog.require("goog.net.xpc.IframePollingTransport");
goog.require("goog.net.xpc.IframeRelayTransport");
goog.require("goog.net.xpc.NativeMessagingTransport");
goog.require("goog.net.xpc.NixTransport");
goog.require("goog.net.xpc.Transport");
goog.require("goog.userAgent");
goog.net.xpc.CrossPageChannel = function(cfg, opt_domHelper) {
  goog.base(this);
  for(var i = 0, uriField;uriField = goog.net.xpc.UriCfgFields[i];i++) {
    if(uriField in cfg && !/^https?:\/\//.test(cfg[uriField])) {
      throw Error("URI " + cfg[uriField] + " is invalid for field " + uriField);
    }
  }
  this.cfg_ = cfg;
  this.name = this.cfg_[goog.net.xpc.CfgFields.CHANNEL_NAME] || goog.net.xpc.getRandomString(10);
  this.domHelper_ = opt_domHelper || goog.dom.getDomHelper();
  this.deferredDeliveries_ = [];
  cfg[goog.net.xpc.CfgFields.LOCAL_POLL_URI] = cfg[goog.net.xpc.CfgFields.LOCAL_POLL_URI] || goog.uri.utils.getHost(this.domHelper_.getWindow().location.href) + "/robots.txt";
  cfg[goog.net.xpc.CfgFields.PEER_POLL_URI] = cfg[goog.net.xpc.CfgFields.PEER_POLL_URI] || goog.uri.utils.getHost(cfg[goog.net.xpc.CfgFields.PEER_URI] || "") + "/robots.txt";
  goog.net.xpc.channels_[this.name] = this;
  goog.events.listen(window, "unload", goog.net.xpc.CrossPageChannel.disposeAll_);
  goog.net.xpc.logger.info("CrossPageChannel created: " + this.name)
};
goog.inherits(goog.net.xpc.CrossPageChannel, goog.messaging.AbstractChannel);
goog.net.xpc.CrossPageChannel.TRANSPORT_SERVICE_ESCAPE_RE_ = new RegExp("^%*" + goog.net.xpc.TRANSPORT_SERVICE_ + "$");
goog.net.xpc.CrossPageChannel.TRANSPORT_SERVICE_UNESCAPE_RE_ = new RegExp("^%+" + goog.net.xpc.TRANSPORT_SERVICE_ + "$");
goog.net.xpc.CrossPageChannel.prototype.transport_ = null;
goog.net.xpc.CrossPageChannel.prototype.state_ = goog.net.xpc.ChannelStates.NOT_CONNECTED;
goog.net.xpc.CrossPageChannel.prototype.isConnected = function() {
  return this.state_ == goog.net.xpc.ChannelStates.CONNECTED
};
goog.net.xpc.CrossPageChannel.prototype.peerWindowObject_ = null;
goog.net.xpc.CrossPageChannel.prototype.iframeElement_ = null;
goog.net.xpc.CrossPageChannel.prototype.setPeerWindowObject = function(peerWindowObject) {
  this.peerWindowObject_ = peerWindowObject
};
goog.net.xpc.CrossPageChannel.prototype.determineTransportType_ = function() {
  var transportType;
  if(goog.isFunction(document.postMessage) || goog.isFunction(window.postMessage) || goog.userAgent.IE && window.postMessage) {
    transportType = goog.net.xpc.TransportTypes.NATIVE_MESSAGING
  }else {
    if(goog.userAgent.GECKO) {
      transportType = goog.net.xpc.TransportTypes.FRAME_ELEMENT_METHOD
    }else {
      if(goog.userAgent.IE && this.cfg_[goog.net.xpc.CfgFields.PEER_RELAY_URI]) {
        transportType = goog.net.xpc.TransportTypes.IFRAME_RELAY
      }else {
        if(goog.userAgent.IE && goog.net.xpc.NixTransport.isNixSupported()) {
          transportType = goog.net.xpc.TransportTypes.NIX
        }else {
          transportType = goog.net.xpc.TransportTypes.IFRAME_POLLING
        }
      }
    }
  }
  return transportType
};
goog.net.xpc.CrossPageChannel.prototype.createTransport_ = function() {
  if(this.transport_) {
    return
  }
  if(!this.cfg_[goog.net.xpc.CfgFields.TRANSPORT]) {
    this.cfg_[goog.net.xpc.CfgFields.TRANSPORT] = this.determineTransportType_()
  }
  switch(this.cfg_[goog.net.xpc.CfgFields.TRANSPORT]) {
    case goog.net.xpc.TransportTypes.NATIVE_MESSAGING:
      this.transport_ = new goog.net.xpc.NativeMessagingTransport(this, this.cfg_[goog.net.xpc.CfgFields.PEER_HOSTNAME], this.domHelper_);
      break;
    case goog.net.xpc.TransportTypes.NIX:
      this.transport_ = new goog.net.xpc.NixTransport(this, this.domHelper_);
      break;
    case goog.net.xpc.TransportTypes.FRAME_ELEMENT_METHOD:
      this.transport_ = new goog.net.xpc.FrameElementMethodTransport(this, this.domHelper_);
      break;
    case goog.net.xpc.TransportTypes.IFRAME_RELAY:
      this.transport_ = new goog.net.xpc.IframeRelayTransport(this, this.domHelper_);
      break;
    case goog.net.xpc.TransportTypes.IFRAME_POLLING:
      this.transport_ = new goog.net.xpc.IframePollingTransport(this, this.domHelper_);
      break
  }
  if(this.transport_) {
    goog.net.xpc.logger.info("Transport created: " + this.transport_.getName())
  }else {
    throw Error("CrossPageChannel: No suitable transport found!");
  }
};
goog.net.xpc.CrossPageChannel.prototype.getTransportType = function() {
  return this.transport_.getType()
};
goog.net.xpc.CrossPageChannel.prototype.getTransportName = function() {
  return this.transport_.getName()
};
goog.net.xpc.CrossPageChannel.prototype.getPeerConfiguration = function() {
  var peerCfg = {};
  peerCfg[goog.net.xpc.CfgFields.CHANNEL_NAME] = this.name;
  peerCfg[goog.net.xpc.CfgFields.TRANSPORT] = this.cfg_[goog.net.xpc.CfgFields.TRANSPORT];
  if(this.cfg_[goog.net.xpc.CfgFields.LOCAL_RELAY_URI]) {
    peerCfg[goog.net.xpc.CfgFields.PEER_RELAY_URI] = this.cfg_[goog.net.xpc.CfgFields.LOCAL_RELAY_URI]
  }
  if(this.cfg_[goog.net.xpc.CfgFields.LOCAL_POLL_URI]) {
    peerCfg[goog.net.xpc.CfgFields.PEER_POLL_URI] = this.cfg_[goog.net.xpc.CfgFields.LOCAL_POLL_URI]
  }
  if(this.cfg_[goog.net.xpc.CfgFields.PEER_POLL_URI]) {
    peerCfg[goog.net.xpc.CfgFields.LOCAL_POLL_URI] = this.cfg_[goog.net.xpc.CfgFields.PEER_POLL_URI]
  }
  return peerCfg
};
goog.net.xpc.CrossPageChannel.prototype.createPeerIframe = function(parentElm, opt_configureIframeCb, opt_addCfgParam) {
  var iframeId = this.cfg_[goog.net.xpc.CfgFields.IFRAME_ID];
  if(!iframeId) {
    iframeId = this.cfg_[goog.net.xpc.CfgFields.IFRAME_ID] = "xpcpeer" + goog.net.xpc.getRandomString(4)
  }
  var iframeElm = goog.dom.createElement("IFRAME");
  iframeElm.id = iframeElm.name = iframeId;
  if(opt_configureIframeCb) {
    opt_configureIframeCb(iframeElm)
  }else {
    iframeElm.style.width = iframeElm.style.height = "100%"
  }
  var peerUri = this.cfg_[goog.net.xpc.CfgFields.PEER_URI];
  if(goog.isString(peerUri)) {
    peerUri = this.cfg_[goog.net.xpc.CfgFields.PEER_URI] = new goog.Uri(peerUri)
  }
  if(opt_addCfgParam !== false) {
    peerUri.setParameterValue("xpc", goog.json.serialize(this.getPeerConfiguration()))
  }
  if(goog.userAgent.GECKO || goog.userAgent.WEBKIT) {
    this.deferConnect_ = true;
    window.setTimeout(goog.bind(function() {
      this.deferConnect_ = false;
      parentElm.appendChild(iframeElm);
      iframeElm.src = peerUri.toString();
      goog.net.xpc.logger.info("peer iframe created (" + iframeId + ")");
      if(this.connectDeferred_) {
        this.connect(this.connectCb_)
      }
    }, this), 1)
  }else {
    iframeElm.src = peerUri.toString();
    parentElm.appendChild(iframeElm);
    goog.net.xpc.logger.info("peer iframe created (" + iframeId + ")")
  }
  return iframeElm
};
goog.net.xpc.CrossPageChannel.prototype.deferConnect_ = false;
goog.net.xpc.CrossPageChannel.prototype.connectDeferred_ = false;
goog.net.xpc.CrossPageChannel.prototype.connect = function(opt_connectCb) {
  this.connectCb_ = opt_connectCb || goog.nullFunction;
  if(this.deferConnect_) {
    goog.net.xpc.logger.info("connect() deferred");
    this.connectDeferred_ = true;
    return
  }
  this.connectDeferred_ = false;
  goog.net.xpc.logger.info("connect()");
  if(this.cfg_[goog.net.xpc.CfgFields.IFRAME_ID]) {
    this.iframeElement_ = this.domHelper_.getElement(this.cfg_[goog.net.xpc.CfgFields.IFRAME_ID])
  }
  if(this.iframeElement_) {
    var winObj = this.iframeElement_.contentWindow;
    if(!winObj) {
      winObj = window.frames[this.cfg_[goog.net.xpc.CfgFields.IFRAME_ID]]
    }
    this.setPeerWindowObject(winObj)
  }
  if(!this.peerWindowObject_) {
    if(window == top) {
      throw Error("CrossPageChannel: Can't connect, peer window-object not set.");
    }else {
      this.setPeerWindowObject(window.parent)
    }
  }
  this.createTransport_();
  this.transport_.connect();
  while(this.deferredDeliveries_.length > 0) {
    this.deferredDeliveries_.shift()()
  }
};
goog.net.xpc.CrossPageChannel.prototype.close = function() {
  if(!this.isConnected()) {
    return
  }
  this.state_ = goog.net.xpc.ChannelStates.CLOSED;
  this.transport_.dispose();
  this.transport_ = null;
  this.connectCb_ = null;
  this.connectDeferred_ = false;
  this.deferredDeliveries_.length = 0;
  goog.net.xpc.logger.info('Channel "' + this.name + '" closed')
};
goog.net.xpc.CrossPageChannel.prototype.notifyConnected_ = function() {
  if(this.isConnected()) {
    return
  }
  this.state_ = goog.net.xpc.ChannelStates.CONNECTED;
  goog.net.xpc.logger.info('Channel "' + this.name + '" connected');
  this.connectCb_()
};
goog.net.xpc.CrossPageChannel.prototype.notifyTransportError_ = function() {
  goog.net.xpc.logger.info("Transport Error");
  this.close()
};
goog.net.xpc.CrossPageChannel.prototype.send = function(serviceName, payload) {
  if(!this.isConnected()) {
    goog.net.xpc.logger.severe("Can't send. Channel not connected.");
    return
  }
  if(Boolean(this.peerWindowObject_.closed)) {
    goog.net.xpc.logger.severe("Peer has disappeared.");
    this.close();
    return
  }
  if(goog.isObject(payload)) {
    payload = goog.json.serialize(payload)
  }
  this.transport_.send(this.escapeServiceName_(serviceName), payload)
};
goog.net.xpc.CrossPageChannel.prototype.deliver_ = function(serviceName, payload, opt_origin) {
  if(this.connectDeferred_) {
    this.deferredDeliveries_.push(goog.bind(this.deliver_, this, serviceName, payload, opt_origin));
    return
  }
  if(!this.isMessageOriginAcceptable_(opt_origin)) {
    goog.net.xpc.logger.warning('Message received from unapproved origin "' + opt_origin + '" - rejected.');
    return
  }
  if(this.isDisposed()) {
    goog.net.xpc.logger.warning("CrossPageChannel::deliver_(): Disposed.")
  }else {
    if(!serviceName || serviceName == goog.net.xpc.TRANSPORT_SERVICE_) {
      this.transport_.transportServiceHandler(payload)
    }else {
      if(this.isConnected()) {
        this.deliver(this.unescapeServiceName_(serviceName), payload)
      }else {
        goog.net.xpc.logger.info("CrossPageChannel::deliver_(): Not connected.")
      }
    }
  }
};
goog.net.xpc.CrossPageChannel.prototype.escapeServiceName_ = function(name) {
  if(goog.net.xpc.CrossPageChannel.TRANSPORT_SERVICE_ESCAPE_RE_.test(name)) {
    name = "%" + name
  }
  return name.replace(/[%:|]/g, encodeURIComponent)
};
goog.net.xpc.CrossPageChannel.prototype.unescapeServiceName_ = function(name) {
  name = name.replace(/%[0-9a-f]{2}/gi, decodeURIComponent);
  if(goog.net.xpc.CrossPageChannel.TRANSPORT_SERVICE_UNESCAPE_RE_.test(name)) {
    return name.substring(1)
  }else {
    return name
  }
};
goog.net.xpc.CrossPageChannel.prototype.getRole = function() {
  return window.parent == this.peerWindowObject_ ? goog.net.xpc.CrossPageChannelRole.INNER : goog.net.xpc.CrossPageChannelRole.OUTER
};
goog.net.xpc.CrossPageChannel.prototype.isMessageOriginAcceptable_ = function(opt_origin) {
  var peerHostname = this.cfg_[goog.net.xpc.CfgFields.PEER_HOSTNAME];
  return goog.string.isEmptySafe(opt_origin) || goog.string.isEmptySafe(peerHostname) || opt_origin == this.cfg_[goog.net.xpc.CfgFields.PEER_HOSTNAME]
};
goog.net.xpc.CrossPageChannel.prototype.disposeInternal = function() {
  goog.base(this, "disposeInternal");
  this.close();
  this.peerWindowObject_ = null;
  this.iframeElement_ = null;
  delete goog.net.xpc.channels_[this.name];
  this.deferredDeliveries_.length = 0
};
goog.net.xpc.CrossPageChannel.disposeAll_ = function() {
  for(var name in goog.net.xpc.channels_) {
    var ch = goog.net.xpc.channels_[name];
    if(ch) {
      ch.dispose()
    }
  }
};
goog.provide("goog.net.EventType");
goog.net.EventType = {COMPLETE:"complete", SUCCESS:"success", ERROR:"error", ABORT:"abort", READY:"ready", READY_STATE_CHANGE:"readystatechange", TIMEOUT:"timeout", INCREMENTAL_DATA:"incrementaldata", PROGRESS:"progress"};
goog.provide("goog.Timer");
goog.require("goog.events.EventTarget");
goog.Timer = function(opt_interval, opt_timerObject) {
  goog.events.EventTarget.call(this);
  this.interval_ = opt_interval || 1;
  this.timerObject_ = opt_timerObject || goog.Timer.defaultTimerObject;
  this.boundTick_ = goog.bind(this.tick_, this);
  this.last_ = goog.now()
};
goog.inherits(goog.Timer, goog.events.EventTarget);
goog.Timer.MAX_TIMEOUT_ = 2147483647;
goog.Timer.prototype.enabled = false;
goog.Timer.defaultTimerObject = goog.global["window"];
goog.Timer.intervalScale = 0.8;
goog.Timer.prototype.timer_ = null;
goog.Timer.prototype.getInterval = function() {
  return this.interval_
};
goog.Timer.prototype.setInterval = function(interval) {
  this.interval_ = interval;
  if(this.timer_ && this.enabled) {
    this.stop();
    this.start()
  }else {
    if(this.timer_) {
      this.stop()
    }
  }
};
goog.Timer.prototype.tick_ = function() {
  if(this.enabled) {
    var elapsed = goog.now() - this.last_;
    if(elapsed > 0 && elapsed < this.interval_ * goog.Timer.intervalScale) {
      this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_ - elapsed);
      return
    }
    this.dispatchTick();
    if(this.enabled) {
      this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_);
      this.last_ = goog.now()
    }
  }
};
goog.Timer.prototype.dispatchTick = function() {
  this.dispatchEvent(goog.Timer.TICK)
};
goog.Timer.prototype.start = function() {
  this.enabled = true;
  if(!this.timer_) {
    this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_);
    this.last_ = goog.now()
  }
};
goog.Timer.prototype.stop = function() {
  this.enabled = false;
  if(this.timer_) {
    this.timerObject_.clearTimeout(this.timer_);
    this.timer_ = null
  }
};
goog.Timer.prototype.disposeInternal = function() {
  goog.Timer.superClass_.disposeInternal.call(this);
  this.stop();
  delete this.timerObject_
};
goog.Timer.TICK = "tick";
goog.Timer.callOnce = function(listener, opt_delay, opt_handler) {
  if(goog.isFunction(listener)) {
    if(opt_handler) {
      listener = goog.bind(listener, opt_handler)
    }
  }else {
    if(listener && typeof listener.handleEvent == "function") {
      listener = goog.bind(listener.handleEvent, listener)
    }else {
      throw Error("Invalid listener argument");
    }
  }
  if(opt_delay > goog.Timer.MAX_TIMEOUT_) {
    return-1
  }else {
    return goog.Timer.defaultTimerObject.setTimeout(listener, opt_delay || 0)
  }
};
goog.Timer.clear = function(timerId) {
  goog.Timer.defaultTimerObject.clearTimeout(timerId)
};
goog.provide("goog.net.ErrorCode");
goog.net.ErrorCode = {NO_ERROR:0, ACCESS_DENIED:1, FILE_NOT_FOUND:2, FF_SILENT_ERROR:3, CUSTOM_ERROR:4, EXCEPTION:5, HTTP_ERROR:6, ABORT:7, TIMEOUT:8, OFFLINE:9};
goog.net.ErrorCode.getDebugMessage = function(errorCode) {
  switch(errorCode) {
    case goog.net.ErrorCode.NO_ERROR:
      return"No Error";
    case goog.net.ErrorCode.ACCESS_DENIED:
      return"Access denied to content document";
    case goog.net.ErrorCode.FILE_NOT_FOUND:
      return"File not found";
    case goog.net.ErrorCode.FF_SILENT_ERROR:
      return"Firefox silently errored";
    case goog.net.ErrorCode.CUSTOM_ERROR:
      return"Application custom error";
    case goog.net.ErrorCode.EXCEPTION:
      return"An exception occurred";
    case goog.net.ErrorCode.HTTP_ERROR:
      return"Http response at 400 or 500 level";
    case goog.net.ErrorCode.ABORT:
      return"Request was aborted";
    case goog.net.ErrorCode.TIMEOUT:
      return"Request timed out";
    case goog.net.ErrorCode.OFFLINE:
      return"The resource is not available offline";
    default:
      return"Unrecognized error code"
  }
};
goog.provide("goog.net.HttpStatus");
goog.net.HttpStatus = {CONTINUE:100, SWITCHING_PROTOCOLS:101, OK:200, CREATED:201, ACCEPTED:202, NON_AUTHORITATIVE_INFORMATION:203, NO_CONTENT:204, RESET_CONTENT:205, PARTIAL_CONTENT:206, MULTIPLE_CHOICES:300, MOVED_PERMANENTLY:301, FOUND:302, SEE_OTHER:303, NOT_MODIFIED:304, USE_PROXY:305, TEMPORARY_REDIRECT:307, BAD_REQUEST:400, UNAUTHORIZED:401, PAYMENT_REQUIRED:402, FORBIDDEN:403, NOT_FOUND:404, METHOD_NOT_ALLOWED:405, NOT_ACCEPTABLE:406, PROXY_AUTHENTICATION_REQUIRED:407, REQUEST_TIMEOUT:408, 
CONFLICT:409, GONE:410, LENGTH_REQUIRED:411, PRECONDITION_FAILED:412, REQUEST_ENTITY_TOO_LARGE:413, REQUEST_URI_TOO_LONG:414, UNSUPPORTED_MEDIA_TYPE:415, REQUEST_RANGE_NOT_SATISFIABLE:416, EXPECTATION_FAILED:417, INTERNAL_SERVER_ERROR:500, NOT_IMPLEMENTED:501, BAD_GATEWAY:502, SERVICE_UNAVAILABLE:503, GATEWAY_TIMEOUT:504, HTTP_VERSION_NOT_SUPPORTED:505, QUIRK_IE_NO_CONTENT:1223};
goog.provide("goog.net.XmlHttpFactory");
goog.net.XmlHttpFactory = function() {
};
goog.net.XmlHttpFactory.prototype.cachedOptions_ = null;
goog.net.XmlHttpFactory.prototype.createInstance = goog.abstractMethod;
goog.net.XmlHttpFactory.prototype.getOptions = function() {
  return this.cachedOptions_ || (this.cachedOptions_ = this.internalGetOptions())
};
goog.net.XmlHttpFactory.prototype.internalGetOptions = goog.abstractMethod;
goog.provide("goog.net.WrapperXmlHttpFactory");
goog.require("goog.net.XmlHttpFactory");
goog.net.WrapperXmlHttpFactory = function(xhrFactory, optionsFactory) {
  goog.net.XmlHttpFactory.call(this);
  this.xhrFactory_ = xhrFactory;
  this.optionsFactory_ = optionsFactory
};
goog.inherits(goog.net.WrapperXmlHttpFactory, goog.net.XmlHttpFactory);
goog.net.WrapperXmlHttpFactory.prototype.createInstance = function() {
  return this.xhrFactory_()
};
goog.net.WrapperXmlHttpFactory.prototype.getOptions = function() {
  return this.optionsFactory_()
};
goog.provide("goog.net.DefaultXmlHttpFactory");
goog.provide("goog.net.XmlHttp");
goog.provide("goog.net.XmlHttp.OptionType");
goog.provide("goog.net.XmlHttp.ReadyState");
goog.require("goog.net.WrapperXmlHttpFactory");
goog.require("goog.net.XmlHttpFactory");
goog.net.XmlHttp = function() {
  return goog.net.XmlHttp.factory_.createInstance()
};
goog.net.XmlHttp.getOptions = function() {
  return goog.net.XmlHttp.factory_.getOptions()
};
goog.net.XmlHttp.OptionType = {USE_NULL_FUNCTION:0, LOCAL_REQUEST_ERROR:1};
goog.net.XmlHttp.ReadyState = {UNINITIALIZED:0, LOADING:1, LOADED:2, INTERACTIVE:3, COMPLETE:4};
goog.net.XmlHttp.factory_;
goog.net.XmlHttp.setFactory = function(factory, optionsFactory) {
  goog.net.XmlHttp.setGlobalFactory(new goog.net.WrapperXmlHttpFactory(factory, optionsFactory))
};
goog.net.XmlHttp.setGlobalFactory = function(factory) {
  goog.net.XmlHttp.factory_ = factory
};
goog.net.DefaultXmlHttpFactory = function() {
  goog.net.XmlHttpFactory.call(this)
};
goog.inherits(goog.net.DefaultXmlHttpFactory, goog.net.XmlHttpFactory);
goog.net.DefaultXmlHttpFactory.prototype.createInstance = function() {
  var progId = this.getProgId_();
  if(progId) {
    return new ActiveXObject(progId)
  }else {
    return new XMLHttpRequest
  }
};
goog.net.DefaultXmlHttpFactory.prototype.internalGetOptions = function() {
  var progId = this.getProgId_();
  var options = {};
  if(progId) {
    options[goog.net.XmlHttp.OptionType.USE_NULL_FUNCTION] = true;
    options[goog.net.XmlHttp.OptionType.LOCAL_REQUEST_ERROR] = true
  }
  return options
};
goog.net.DefaultXmlHttpFactory.prototype.ieProgId_ = null;
goog.net.DefaultXmlHttpFactory.prototype.getProgId_ = function() {
  if(!this.ieProgId_ && typeof XMLHttpRequest == "undefined" && typeof ActiveXObject != "undefined") {
    var ACTIVE_X_IDENTS = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"];
    for(var i = 0;i < ACTIVE_X_IDENTS.length;i++) {
      var candidate = ACTIVE_X_IDENTS[i];
      try {
        new ActiveXObject(candidate);
        this.ieProgId_ = candidate;
        return candidate
      }catch(e) {
      }
    }
    throw Error("Could not create ActiveXObject. ActiveX might be disabled," + " or MSXML might not be installed");
  }
  return this.ieProgId_
};
goog.net.XmlHttp.setGlobalFactory(new goog.net.DefaultXmlHttpFactory);
goog.provide("goog.net.xhrMonitor");
goog.require("goog.array");
goog.require("goog.debug.Logger");
goog.require("goog.userAgent");
goog.net.XhrMonitor_ = function() {
  if(!goog.userAgent.GECKO) {
    return
  }
  this.contextsToXhr_ = {};
  this.xhrToContexts_ = {};
  this.stack_ = []
};
goog.net.XhrMonitor_.getKey = function(obj) {
  return goog.isString(obj) ? obj : goog.isObject(obj) ? goog.getUid(obj) : ""
};
goog.net.XhrMonitor_.prototype.logger_ = goog.debug.Logger.getLogger("goog.net.xhrMonitor");
goog.net.XhrMonitor_.prototype.enabled_ = goog.userAgent.GECKO;
goog.net.XhrMonitor_.prototype.setEnabled = function(val) {
  this.enabled_ = goog.userAgent.GECKO && val
};
goog.net.XhrMonitor_.prototype.pushContext = function(context) {
  if(!this.enabled_) {
    return
  }
  var key = goog.net.XhrMonitor_.getKey(context);
  this.logger_.finest("Pushing context: " + context + " (" + key + ")");
  this.stack_.push(key)
};
goog.net.XhrMonitor_.prototype.popContext = function() {
  if(!this.enabled_) {
    return
  }
  var context = this.stack_.pop();
  this.logger_.finest("Popping context: " + context);
  this.updateDependentContexts_(context)
};
goog.net.XhrMonitor_.prototype.isContextSafe = function(context) {
  if(!this.enabled_) {
    return true
  }
  var deps = this.contextsToXhr_[goog.net.XhrMonitor_.getKey(context)];
  this.logger_.fine("Context is safe : " + context + " - " + deps);
  return!deps
};
goog.net.XhrMonitor_.prototype.markXhrOpen = function(xhr) {
  if(!this.enabled_) {
    return
  }
  var uid = goog.getUid(xhr);
  this.logger_.fine("Opening XHR : " + uid);
  for(var i = 0;i < this.stack_.length;i++) {
    var context = this.stack_[i];
    this.addToMap_(this.contextsToXhr_, context, uid);
    this.addToMap_(this.xhrToContexts_, uid, context)
  }
};
goog.net.XhrMonitor_.prototype.markXhrClosed = function(xhr) {
  if(!this.enabled_) {
    return
  }
  var uid = goog.getUid(xhr);
  this.logger_.fine("Closing XHR : " + uid);
  delete this.xhrToContexts_[uid];
  for(var context in this.contextsToXhr_) {
    goog.array.remove(this.contextsToXhr_[context], uid);
    if(this.contextsToXhr_[context].length == 0) {
      delete this.contextsToXhr_[context]
    }
  }
};
goog.net.XhrMonitor_.prototype.updateDependentContexts_ = function(xhrUid) {
  var contexts = this.xhrToContexts_[xhrUid];
  var xhrs = this.contextsToXhr_[xhrUid];
  if(contexts && xhrs) {
    this.logger_.finest("Updating dependent contexts");
    goog.array.forEach(contexts, function(context) {
      goog.array.forEach(xhrs, function(xhr) {
        this.addToMap_(this.contextsToXhr_, context, xhr);
        this.addToMap_(this.xhrToContexts_, xhr, context)
      }, this)
    }, this)
  }
};
goog.net.XhrMonitor_.prototype.addToMap_ = function(map, key, value) {
  if(!map[key]) {
    map[key] = []
  }
  if(!goog.array.contains(map[key], value)) {
    map[key].push(value)
  }
};
goog.net.xhrMonitor = new goog.net.XhrMonitor_;
goog.provide("goog.net.XhrIo");
goog.provide("goog.net.XhrIo.ResponseType");
goog.require("goog.Timer");
goog.require("goog.debug.Logger");
goog.require("goog.debug.entryPointRegistry");
goog.require("goog.debug.errorHandlerWeakDep");
goog.require("goog.events.EventTarget");
goog.require("goog.json");
goog.require("goog.net.ErrorCode");
goog.require("goog.net.EventType");
goog.require("goog.net.HttpStatus");
goog.require("goog.net.XmlHttp");
goog.require("goog.net.xhrMonitor");
goog.require("goog.object");
goog.require("goog.structs");
goog.require("goog.structs.Map");
goog.require("goog.uri.utils");
goog.net.XhrIo = function(opt_xmlHttpFactory) {
  goog.events.EventTarget.call(this);
  this.headers = new goog.structs.Map;
  this.xmlHttpFactory_ = opt_xmlHttpFactory || null
};
goog.inherits(goog.net.XhrIo, goog.events.EventTarget);
goog.net.XhrIo.ResponseType = {DEFAULT:"", TEXT:"text", DOCUMENT:"document", BLOB:"blob", ARRAY_BUFFER:"arraybuffer"};
goog.net.XhrIo.prototype.logger_ = goog.debug.Logger.getLogger("goog.net.XhrIo");
goog.net.XhrIo.CONTENT_TYPE_HEADER = "Content-Type";
goog.net.XhrIo.HTTP_SCHEME_PATTERN = /^https?:?$/i;
goog.net.XhrIo.FORM_CONTENT_TYPE = "application/x-www-form-urlencoded;charset=utf-8";
goog.net.XhrIo.sendInstances_ = [];
goog.net.XhrIo.send = function(url, opt_callback, opt_method, opt_content, opt_headers, opt_timeoutInterval) {
  var x = new goog.net.XhrIo;
  goog.net.XhrIo.sendInstances_.push(x);
  if(opt_callback) {
    goog.events.listen(x, goog.net.EventType.COMPLETE, opt_callback)
  }
  goog.events.listen(x, goog.net.EventType.READY, goog.partial(goog.net.XhrIo.cleanupSend_, x));
  if(opt_timeoutInterval) {
    x.setTimeoutInterval(opt_timeoutInterval)
  }
  x.send(url, opt_method, opt_content, opt_headers)
};
goog.net.XhrIo.cleanup = function() {
  var instances = goog.net.XhrIo.sendInstances_;
  while(instances.length) {
    instances.pop().dispose()
  }
};
goog.net.XhrIo.protectEntryPoints = function(errorHandler) {
  goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_ = errorHandler.protectEntryPoint(goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_)
};
goog.net.XhrIo.cleanupSend_ = function(XhrIo) {
  XhrIo.dispose();
  goog.array.remove(goog.net.XhrIo.sendInstances_, XhrIo)
};
goog.net.XhrIo.prototype.active_ = false;
goog.net.XhrIo.prototype.xhr_ = null;
goog.net.XhrIo.prototype.xhrOptions_ = null;
goog.net.XhrIo.prototype.lastUri_ = "";
goog.net.XhrIo.prototype.lastMethod_ = "";
goog.net.XhrIo.prototype.lastErrorCode_ = goog.net.ErrorCode.NO_ERROR;
goog.net.XhrIo.prototype.lastError_ = "";
goog.net.XhrIo.prototype.errorDispatched_ = false;
goog.net.XhrIo.prototype.inSend_ = false;
goog.net.XhrIo.prototype.inOpen_ = false;
goog.net.XhrIo.prototype.inAbort_ = false;
goog.net.XhrIo.prototype.timeoutInterval_ = 0;
goog.net.XhrIo.prototype.timeoutId_ = null;
goog.net.XhrIo.prototype.responseType_ = goog.net.XhrIo.ResponseType.DEFAULT;
goog.net.XhrIo.prototype.withCredentials_ = false;
goog.net.XhrIo.prototype.getTimeoutInterval = function() {
  return this.timeoutInterval_
};
goog.net.XhrIo.prototype.setTimeoutInterval = function(ms) {
  this.timeoutInterval_ = Math.max(0, ms)
};
goog.net.XhrIo.prototype.setResponseType = function(type) {
  this.responseType_ = type
};
goog.net.XhrIo.prototype.getResponseType = function() {
  return this.responseType_
};
goog.net.XhrIo.prototype.setWithCredentials = function(withCredentials) {
  this.withCredentials_ = withCredentials
};
goog.net.XhrIo.prototype.getWithCredentials = function() {
  return this.withCredentials_
};
goog.net.XhrIo.prototype.send = function(url, opt_method, opt_content, opt_headers) {
  if(this.xhr_) {
    throw Error("[goog.net.XhrIo] Object is active with another request");
  }
  var method = opt_method ? opt_method.toUpperCase() : "GET";
  this.lastUri_ = url;
  this.lastError_ = "";
  this.lastErrorCode_ = goog.net.ErrorCode.NO_ERROR;
  this.lastMethod_ = method;
  this.errorDispatched_ = false;
  this.active_ = true;
  this.xhr_ = this.createXhr();
  this.xhrOptions_ = this.xmlHttpFactory_ ? this.xmlHttpFactory_.getOptions() : goog.net.XmlHttp.getOptions();
  goog.net.xhrMonitor.markXhrOpen(this.xhr_);
  this.xhr_.onreadystatechange = goog.bind(this.onReadyStateChange_, this);
  try {
    this.logger_.fine(this.formatMsg_("Opening Xhr"));
    this.inOpen_ = true;
    this.xhr_.open(method, url, true);
    this.inOpen_ = false
  }catch(err) {
    this.logger_.fine(this.formatMsg_("Error opening Xhr: " + err.message));
    this.error_(goog.net.ErrorCode.EXCEPTION, err);
    return
  }
  var content = opt_content || "";
  var headers = this.headers.clone();
  if(opt_headers) {
    goog.structs.forEach(opt_headers, function(value, key) {
      headers.set(key, value)
    })
  }
  if(method == "POST" && !headers.containsKey(goog.net.XhrIo.CONTENT_TYPE_HEADER)) {
    headers.set(goog.net.XhrIo.CONTENT_TYPE_HEADER, goog.net.XhrIo.FORM_CONTENT_TYPE)
  }
  goog.structs.forEach(headers, function(value, key) {
    this.xhr_.setRequestHeader(key, value)
  }, this);
  if(this.responseType_) {
    this.xhr_.responseType = this.responseType_
  }
  if(goog.object.containsKey(this.xhr_, "withCredentials")) {
    this.xhr_.withCredentials = this.withCredentials_
  }
  try {
    if(this.timeoutId_) {
      goog.Timer.defaultTimerObject.clearTimeout(this.timeoutId_);
      this.timeoutId_ = null
    }
    if(this.timeoutInterval_ > 0) {
      this.logger_.fine(this.formatMsg_("Will abort after " + this.timeoutInterval_ + "ms if incomplete"));
      this.timeoutId_ = goog.Timer.defaultTimerObject.setTimeout(goog.bind(this.timeout_, this), this.timeoutInterval_)
    }
    this.logger_.fine(this.formatMsg_("Sending request"));
    this.inSend_ = true;
    this.xhr_.send(content);
    this.inSend_ = false
  }catch(err) {
    this.logger_.fine(this.formatMsg_("Send error: " + err.message));
    this.error_(goog.net.ErrorCode.EXCEPTION, err)
  }
};
goog.net.XhrIo.prototype.createXhr = function() {
  return this.xmlHttpFactory_ ? this.xmlHttpFactory_.createInstance() : goog.net.XmlHttp()
};
goog.net.XhrIo.prototype.dispatchEvent = function(e) {
  if(this.xhr_) {
    goog.net.xhrMonitor.pushContext(this.xhr_);
    try {
      return goog.net.XhrIo.superClass_.dispatchEvent.call(this, e)
    }finally {
      goog.net.xhrMonitor.popContext()
    }
  }else {
    return goog.net.XhrIo.superClass_.dispatchEvent.call(this, e)
  }
};
goog.net.XhrIo.prototype.timeout_ = function() {
  if(typeof goog == "undefined") {
  }else {
    if(this.xhr_) {
      this.lastError_ = "Timed out after " + this.timeoutInterval_ + "ms, aborting";
      this.lastErrorCode_ = goog.net.ErrorCode.TIMEOUT;
      this.logger_.fine(this.formatMsg_(this.lastError_));
      this.dispatchEvent(goog.net.EventType.TIMEOUT);
      this.abort(goog.net.ErrorCode.TIMEOUT)
    }
  }
};
goog.net.XhrIo.prototype.error_ = function(errorCode, err) {
  this.active_ = false;
  if(this.xhr_) {
    this.inAbort_ = true;
    this.xhr_.abort();
    this.inAbort_ = false
  }
  this.lastError_ = err;
  this.lastErrorCode_ = errorCode;
  this.dispatchErrors_();
  this.cleanUpXhr_()
};
goog.net.XhrIo.prototype.dispatchErrors_ = function() {
  if(!this.errorDispatched_) {
    this.errorDispatched_ = true;
    this.dispatchEvent(goog.net.EventType.COMPLETE);
    this.dispatchEvent(goog.net.EventType.ERROR)
  }
};
goog.net.XhrIo.prototype.abort = function(opt_failureCode) {
  if(this.xhr_ && this.active_) {
    this.logger_.fine(this.formatMsg_("Aborting"));
    this.active_ = false;
    this.inAbort_ = true;
    this.xhr_.abort();
    this.inAbort_ = false;
    this.lastErrorCode_ = opt_failureCode || goog.net.ErrorCode.ABORT;
    this.dispatchEvent(goog.net.EventType.COMPLETE);
    this.dispatchEvent(goog.net.EventType.ABORT);
    this.cleanUpXhr_()
  }
};
goog.net.XhrIo.prototype.disposeInternal = function() {
  if(this.xhr_) {
    if(this.active_) {
      this.active_ = false;
      this.inAbort_ = true;
      this.xhr_.abort();
      this.inAbort_ = false
    }
    this.cleanUpXhr_(true)
  }
  goog.net.XhrIo.superClass_.disposeInternal.call(this)
};
goog.net.XhrIo.prototype.onReadyStateChange_ = function() {
  if(!this.inOpen_ && !this.inSend_ && !this.inAbort_) {
    this.onReadyStateChangeEntryPoint_()
  }else {
    this.onReadyStateChangeHelper_()
  }
};
goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_ = function() {
  this.onReadyStateChangeHelper_()
};
goog.net.XhrIo.prototype.onReadyStateChangeHelper_ = function() {
  if(!this.active_) {
    return
  }
  if(typeof goog == "undefined") {
  }else {
    if(this.xhrOptions_[goog.net.XmlHttp.OptionType.LOCAL_REQUEST_ERROR] && this.getReadyState() == goog.net.XmlHttp.ReadyState.COMPLETE && this.getStatus() == 2) {
      this.logger_.fine(this.formatMsg_("Local request error detected and ignored"))
    }else {
      if(this.inSend_ && this.getReadyState() == goog.net.XmlHttp.ReadyState.COMPLETE) {
        goog.Timer.defaultTimerObject.setTimeout(goog.bind(this.onReadyStateChange_, this), 0);
        return
      }
      this.dispatchEvent(goog.net.EventType.READY_STATE_CHANGE);
      if(this.isComplete()) {
        this.logger_.fine(this.formatMsg_("Request complete"));
        this.active_ = false;
        if(this.isSuccess()) {
          this.dispatchEvent(goog.net.EventType.COMPLETE);
          this.dispatchEvent(goog.net.EventType.SUCCESS)
        }else {
          this.lastErrorCode_ = goog.net.ErrorCode.HTTP_ERROR;
          this.lastError_ = this.getStatusText() + " [" + this.getStatus() + "]";
          this.dispatchErrors_()
        }
        this.cleanUpXhr_()
      }
    }
  }
};
goog.net.XhrIo.prototype.cleanUpXhr_ = function(opt_fromDispose) {
  if(this.xhr_) {
    var xhr = this.xhr_;
    var clearedOnReadyStateChange = this.xhrOptions_[goog.net.XmlHttp.OptionType.USE_NULL_FUNCTION] ? goog.nullFunction : null;
    this.xhr_ = null;
    this.xhrOptions_ = null;
    if(this.timeoutId_) {
      goog.Timer.defaultTimerObject.clearTimeout(this.timeoutId_);
      this.timeoutId_ = null
    }
    if(!opt_fromDispose) {
      goog.net.xhrMonitor.pushContext(xhr);
      this.dispatchEvent(goog.net.EventType.READY);
      goog.net.xhrMonitor.popContext()
    }
    goog.net.xhrMonitor.markXhrClosed(xhr);
    try {
      xhr.onreadystatechange = clearedOnReadyStateChange
    }catch(e) {
      this.logger_.severe("Problem encountered resetting onreadystatechange: " + e.message)
    }
  }
};
goog.net.XhrIo.prototype.isActive = function() {
  return!!this.xhr_
};
goog.net.XhrIo.prototype.isComplete = function() {
  return this.getReadyState() == goog.net.XmlHttp.ReadyState.COMPLETE
};
goog.net.XhrIo.prototype.isSuccess = function() {
  switch(this.getStatus()) {
    case 0:
      return!this.isLastUriEffectiveSchemeHttp_();
    case goog.net.HttpStatus.OK:
    ;
    case goog.net.HttpStatus.CREATED:
    ;
    case goog.net.HttpStatus.ACCEPTED:
    ;
    case goog.net.HttpStatus.NO_CONTENT:
    ;
    case goog.net.HttpStatus.NOT_MODIFIED:
    ;
    case goog.net.HttpStatus.QUIRK_IE_NO_CONTENT:
      return true;
    default:
      return false
  }
};
goog.net.XhrIo.prototype.isLastUriEffectiveSchemeHttp_ = function() {
  var lastUriScheme = goog.isString(this.lastUri_) ? goog.uri.utils.getScheme(this.lastUri_) : this.lastUri_.getScheme();
  if(lastUriScheme) {
    return goog.net.XhrIo.HTTP_SCHEME_PATTERN.test(lastUriScheme)
  }
  if(self.location) {
    return goog.net.XhrIo.HTTP_SCHEME_PATTERN.test(self.location.protocol)
  }else {
    return true
  }
};
goog.net.XhrIo.prototype.getReadyState = function() {
  return this.xhr_ ? this.xhr_.readyState : goog.net.XmlHttp.ReadyState.UNINITIALIZED
};
goog.net.XhrIo.prototype.getStatus = function() {
  try {
    return this.getReadyState() > goog.net.XmlHttp.ReadyState.LOADED ? this.xhr_.status : -1
  }catch(e) {
    this.logger_.warning("Can not get status: " + e.message);
    return-1
  }
};
goog.net.XhrIo.prototype.getStatusText = function() {
  try {
    return this.getReadyState() > goog.net.XmlHttp.ReadyState.LOADED ? this.xhr_.statusText : ""
  }catch(e) {
    this.logger_.fine("Can not get status: " + e.message);
    return""
  }
};
goog.net.XhrIo.prototype.getLastUri = function() {
  return String(this.lastUri_)
};
goog.net.XhrIo.prototype.getResponseText = function() {
  try {
    return this.xhr_ ? this.xhr_.responseText : ""
  }catch(e) {
    this.logger_.fine("Can not get responseText: " + e.message);
    return""
  }
};
goog.net.XhrIo.prototype.getResponseXml = function() {
  try {
    return this.xhr_ ? this.xhr_.responseXML : null
  }catch(e) {
    this.logger_.fine("Can not get responseXML: " + e.message);
    return null
  }
};
goog.net.XhrIo.prototype.getResponseJson = function(opt_xssiPrefix) {
  if(!this.xhr_) {
    return undefined
  }
  var responseText = this.xhr_.responseText;
  if(opt_xssiPrefix && responseText.indexOf(opt_xssiPrefix) == 0) {
    responseText = responseText.substring(opt_xssiPrefix.length)
  }
  return goog.json.parse(responseText)
};
goog.net.XhrIo.prototype.getResponse = function() {
  try {
    if(!this.xhr_) {
      return null
    }
    if("response" in this.xhr_) {
      return this.xhr_.response
    }
    switch(this.responseType_) {
      case goog.net.XhrIo.ResponseType.DEFAULT:
      ;
      case goog.net.XhrIo.ResponseType.TEXT:
        return this.xhr_.responseText;
      case goog.net.XhrIo.ResponseType.ARRAY_BUFFER:
        if("mozResponseArrayBuffer" in this.xhr_) {
          return this.xhr_.mozResponseArrayBuffer
        }
    }
    this.logger_.severe("Response type " + this.responseType_ + " is not " + "supported on this browser");
    return null
  }catch(e) {
    this.logger_.fine("Can not get response: " + e.message);
    return null
  }
};
goog.net.XhrIo.prototype.getResponseHeader = function(key) {
  return this.xhr_ && this.isComplete() ? this.xhr_.getResponseHeader(key) : undefined
};
goog.net.XhrIo.prototype.getAllResponseHeaders = function() {
  return this.xhr_ && this.isComplete() ? this.xhr_.getAllResponseHeaders() : ""
};
goog.net.XhrIo.prototype.getLastErrorCode = function() {
  return this.lastErrorCode_
};
goog.net.XhrIo.prototype.getLastError = function() {
  return goog.isString(this.lastError_) ? this.lastError_ : String(this.lastError_)
};
goog.net.XhrIo.prototype.formatMsg_ = function(msg) {
  return msg + " [" + this.lastMethod_ + " " + this.lastUri_ + " " + this.getStatus() + "]"
};
goog.debug.entryPointRegistry.register(function(transformer) {
  goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_ = transformer(goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_)
});
goog.provide("clojure.browser.net");
goog.require("cljs.core");
goog.require("goog.json");
goog.require("goog.net.xpc.CrossPageChannel");
goog.require("goog.net.xpc.CfgFields");
goog.require("goog.net.EventType");
goog.require("goog.net.XhrIo");
goog.require("clojure.browser.event");
clojure.browser.net._STAR_timeout_STAR_ = 1E4;
clojure.browser.net.event_types = cljs.core.into.call(null, cljs.core.ObjMap.EMPTY, cljs.core.map.call(null, function(p__10238) {
  var vec__10239__10240 = p__10238;
  var k__10241 = cljs.core.nth.call(null, vec__10239__10240, 0, null);
  var v__10242 = cljs.core.nth.call(null, vec__10239__10240, 1, null);
  return cljs.core.PersistentVector.fromArray([cljs.core.keyword.call(null, k__10241.toLowerCase()), v__10242], true)
}, cljs.core.merge.call(null, cljs.core.js__GT_clj.call(null, goog.net.EventType))));
clojure.browser.net.IConnection = {};
clojure.browser.net.connect = function() {
  var connect = null;
  var connect__1 = function(this$) {
    if(function() {
      var and__3822__auto____10259 = this$;
      if(and__3822__auto____10259) {
        return this$.clojure$browser$net$IConnection$connect$arity$1
      }else {
        return and__3822__auto____10259
      }
    }()) {
      return this$.clojure$browser$net$IConnection$connect$arity$1(this$)
    }else {
      var x__2369__auto____10260 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____10261 = clojure.browser.net.connect[goog.typeOf(x__2369__auto____10260)];
        if(or__3824__auto____10261) {
          return or__3824__auto____10261
        }else {
          var or__3824__auto____10262 = clojure.browser.net.connect["_"];
          if(or__3824__auto____10262) {
            return or__3824__auto____10262
          }else {
            throw cljs.core.missing_protocol.call(null, "IConnection.connect", this$);
          }
        }
      }().call(null, this$)
    }
  };
  var connect__2 = function(this$, opt1) {
    if(function() {
      var and__3822__auto____10263 = this$;
      if(and__3822__auto____10263) {
        return this$.clojure$browser$net$IConnection$connect$arity$2
      }else {
        return and__3822__auto____10263
      }
    }()) {
      return this$.clojure$browser$net$IConnection$connect$arity$2(this$, opt1)
    }else {
      var x__2369__auto____10264 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____10265 = clojure.browser.net.connect[goog.typeOf(x__2369__auto____10264)];
        if(or__3824__auto____10265) {
          return or__3824__auto____10265
        }else {
          var or__3824__auto____10266 = clojure.browser.net.connect["_"];
          if(or__3824__auto____10266) {
            return or__3824__auto____10266
          }else {
            throw cljs.core.missing_protocol.call(null, "IConnection.connect", this$);
          }
        }
      }().call(null, this$, opt1)
    }
  };
  var connect__3 = function(this$, opt1, opt2) {
    if(function() {
      var and__3822__auto____10267 = this$;
      if(and__3822__auto____10267) {
        return this$.clojure$browser$net$IConnection$connect$arity$3
      }else {
        return and__3822__auto____10267
      }
    }()) {
      return this$.clojure$browser$net$IConnection$connect$arity$3(this$, opt1, opt2)
    }else {
      var x__2369__auto____10268 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____10269 = clojure.browser.net.connect[goog.typeOf(x__2369__auto____10268)];
        if(or__3824__auto____10269) {
          return or__3824__auto____10269
        }else {
          var or__3824__auto____10270 = clojure.browser.net.connect["_"];
          if(or__3824__auto____10270) {
            return or__3824__auto____10270
          }else {
            throw cljs.core.missing_protocol.call(null, "IConnection.connect", this$);
          }
        }
      }().call(null, this$, opt1, opt2)
    }
  };
  var connect__4 = function(this$, opt1, opt2, opt3) {
    if(function() {
      var and__3822__auto____10271 = this$;
      if(and__3822__auto____10271) {
        return this$.clojure$browser$net$IConnection$connect$arity$4
      }else {
        return and__3822__auto____10271
      }
    }()) {
      return this$.clojure$browser$net$IConnection$connect$arity$4(this$, opt1, opt2, opt3)
    }else {
      var x__2369__auto____10272 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____10273 = clojure.browser.net.connect[goog.typeOf(x__2369__auto____10272)];
        if(or__3824__auto____10273) {
          return or__3824__auto____10273
        }else {
          var or__3824__auto____10274 = clojure.browser.net.connect["_"];
          if(or__3824__auto____10274) {
            return or__3824__auto____10274
          }else {
            throw cljs.core.missing_protocol.call(null, "IConnection.connect", this$);
          }
        }
      }().call(null, this$, opt1, opt2, opt3)
    }
  };
  connect = function(this$, opt1, opt2, opt3) {
    switch(arguments.length) {
      case 1:
        return connect__1.call(this, this$);
      case 2:
        return connect__2.call(this, this$, opt1);
      case 3:
        return connect__3.call(this, this$, opt1, opt2);
      case 4:
        return connect__4.call(this, this$, opt1, opt2, opt3)
    }
    throw"Invalid arity: " + arguments.length;
  };
  connect.cljs$lang$arity$1 = connect__1;
  connect.cljs$lang$arity$2 = connect__2;
  connect.cljs$lang$arity$3 = connect__3;
  connect.cljs$lang$arity$4 = connect__4;
  return connect
}();
clojure.browser.net.transmit = function() {
  var transmit = null;
  var transmit__2 = function(this$, opt) {
    if(function() {
      var and__3822__auto____10295 = this$;
      if(and__3822__auto____10295) {
        return this$.clojure$browser$net$IConnection$transmit$arity$2
      }else {
        return and__3822__auto____10295
      }
    }()) {
      return this$.clojure$browser$net$IConnection$transmit$arity$2(this$, opt)
    }else {
      var x__2369__auto____10296 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____10297 = clojure.browser.net.transmit[goog.typeOf(x__2369__auto____10296)];
        if(or__3824__auto____10297) {
          return or__3824__auto____10297
        }else {
          var or__3824__auto____10298 = clojure.browser.net.transmit["_"];
          if(or__3824__auto____10298) {
            return or__3824__auto____10298
          }else {
            throw cljs.core.missing_protocol.call(null, "IConnection.transmit", this$);
          }
        }
      }().call(null, this$, opt)
    }
  };
  var transmit__3 = function(this$, opt, opt2) {
    if(function() {
      var and__3822__auto____10299 = this$;
      if(and__3822__auto____10299) {
        return this$.clojure$browser$net$IConnection$transmit$arity$3
      }else {
        return and__3822__auto____10299
      }
    }()) {
      return this$.clojure$browser$net$IConnection$transmit$arity$3(this$, opt, opt2)
    }else {
      var x__2369__auto____10300 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____10301 = clojure.browser.net.transmit[goog.typeOf(x__2369__auto____10300)];
        if(or__3824__auto____10301) {
          return or__3824__auto____10301
        }else {
          var or__3824__auto____10302 = clojure.browser.net.transmit["_"];
          if(or__3824__auto____10302) {
            return or__3824__auto____10302
          }else {
            throw cljs.core.missing_protocol.call(null, "IConnection.transmit", this$);
          }
        }
      }().call(null, this$, opt, opt2)
    }
  };
  var transmit__4 = function(this$, opt, opt2, opt3) {
    if(function() {
      var and__3822__auto____10303 = this$;
      if(and__3822__auto____10303) {
        return this$.clojure$browser$net$IConnection$transmit$arity$4
      }else {
        return and__3822__auto____10303
      }
    }()) {
      return this$.clojure$browser$net$IConnection$transmit$arity$4(this$, opt, opt2, opt3)
    }else {
      var x__2369__auto____10304 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____10305 = clojure.browser.net.transmit[goog.typeOf(x__2369__auto____10304)];
        if(or__3824__auto____10305) {
          return or__3824__auto____10305
        }else {
          var or__3824__auto____10306 = clojure.browser.net.transmit["_"];
          if(or__3824__auto____10306) {
            return or__3824__auto____10306
          }else {
            throw cljs.core.missing_protocol.call(null, "IConnection.transmit", this$);
          }
        }
      }().call(null, this$, opt, opt2, opt3)
    }
  };
  var transmit__5 = function(this$, opt, opt2, opt3, opt4) {
    if(function() {
      var and__3822__auto____10307 = this$;
      if(and__3822__auto____10307) {
        return this$.clojure$browser$net$IConnection$transmit$arity$5
      }else {
        return and__3822__auto____10307
      }
    }()) {
      return this$.clojure$browser$net$IConnection$transmit$arity$5(this$, opt, opt2, opt3, opt4)
    }else {
      var x__2369__auto____10308 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____10309 = clojure.browser.net.transmit[goog.typeOf(x__2369__auto____10308)];
        if(or__3824__auto____10309) {
          return or__3824__auto____10309
        }else {
          var or__3824__auto____10310 = clojure.browser.net.transmit["_"];
          if(or__3824__auto____10310) {
            return or__3824__auto____10310
          }else {
            throw cljs.core.missing_protocol.call(null, "IConnection.transmit", this$);
          }
        }
      }().call(null, this$, opt, opt2, opt3, opt4)
    }
  };
  var transmit__6 = function(this$, opt, opt2, opt3, opt4, opt5) {
    if(function() {
      var and__3822__auto____10311 = this$;
      if(and__3822__auto____10311) {
        return this$.clojure$browser$net$IConnection$transmit$arity$6
      }else {
        return and__3822__auto____10311
      }
    }()) {
      return this$.clojure$browser$net$IConnection$transmit$arity$6(this$, opt, opt2, opt3, opt4, opt5)
    }else {
      var x__2369__auto____10312 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____10313 = clojure.browser.net.transmit[goog.typeOf(x__2369__auto____10312)];
        if(or__3824__auto____10313) {
          return or__3824__auto____10313
        }else {
          var or__3824__auto____10314 = clojure.browser.net.transmit["_"];
          if(or__3824__auto____10314) {
            return or__3824__auto____10314
          }else {
            throw cljs.core.missing_protocol.call(null, "IConnection.transmit", this$);
          }
        }
      }().call(null, this$, opt, opt2, opt3, opt4, opt5)
    }
  };
  transmit = function(this$, opt, opt2, opt3, opt4, opt5) {
    switch(arguments.length) {
      case 2:
        return transmit__2.call(this, this$, opt);
      case 3:
        return transmit__3.call(this, this$, opt, opt2);
      case 4:
        return transmit__4.call(this, this$, opt, opt2, opt3);
      case 5:
        return transmit__5.call(this, this$, opt, opt2, opt3, opt4);
      case 6:
        return transmit__6.call(this, this$, opt, opt2, opt3, opt4, opt5)
    }
    throw"Invalid arity: " + arguments.length;
  };
  transmit.cljs$lang$arity$2 = transmit__2;
  transmit.cljs$lang$arity$3 = transmit__3;
  transmit.cljs$lang$arity$4 = transmit__4;
  transmit.cljs$lang$arity$5 = transmit__5;
  transmit.cljs$lang$arity$6 = transmit__6;
  return transmit
}();
clojure.browser.net.close = function close(this$) {
  if(function() {
    var and__3822__auto____10319 = this$;
    if(and__3822__auto____10319) {
      return this$.clojure$browser$net$IConnection$close$arity$1
    }else {
      return and__3822__auto____10319
    }
  }()) {
    return this$.clojure$browser$net$IConnection$close$arity$1(this$)
  }else {
    var x__2369__auto____10320 = this$ == null ? null : this$;
    return function() {
      var or__3824__auto____10321 = clojure.browser.net.close[goog.typeOf(x__2369__auto____10320)];
      if(or__3824__auto____10321) {
        return or__3824__auto____10321
      }else {
        var or__3824__auto____10322 = clojure.browser.net.close["_"];
        if(or__3824__auto____10322) {
          return or__3824__auto____10322
        }else {
          throw cljs.core.missing_protocol.call(null, "IConnection.close", this$);
        }
      }
    }().call(null, this$)
  }
};
goog.net.XhrIo.prototype.clojure$browser$event$EventType$ = true;
goog.net.XhrIo.prototype.clojure$browser$event$EventType$event_types$arity$1 = function(this$) {
  return cljs.core.into.call(null, cljs.core.ObjMap.EMPTY, cljs.core.map.call(null, function(p__10323) {
    var vec__10324__10325 = p__10323;
    var k__10326 = cljs.core.nth.call(null, vec__10324__10325, 0, null);
    var v__10327 = cljs.core.nth.call(null, vec__10324__10325, 1, null);
    return cljs.core.PersistentVector.fromArray([cljs.core.keyword.call(null, k__10326.toLowerCase()), v__10327], true)
  }, cljs.core.merge.call(null, cljs.core.js__GT_clj.call(null, goog.net.EventType))))
};
goog.net.XhrIo.prototype.clojure$browser$net$IConnection$ = true;
goog.net.XhrIo.prototype.clojure$browser$net$IConnection$transmit$arity$2 = function(this$, uri) {
  return clojure.browser.net.transmit.call(null, this$, uri, "GET", null, null, clojure.browser.net._STAR_timeout_STAR_)
};
goog.net.XhrIo.prototype.clojure$browser$net$IConnection$transmit$arity$3 = function(this$, uri, method) {
  return clojure.browser.net.transmit.call(null, this$, uri, method, null, null, clojure.browser.net._STAR_timeout_STAR_)
};
goog.net.XhrIo.prototype.clojure$browser$net$IConnection$transmit$arity$4 = function(this$, uri, method, content) {
  return clojure.browser.net.transmit.call(null, this$, uri, method, content, null, clojure.browser.net._STAR_timeout_STAR_)
};
goog.net.XhrIo.prototype.clojure$browser$net$IConnection$transmit$arity$5 = function(this$, uri, method, content, headers) {
  return clojure.browser.net.transmit.call(null, this$, uri, method, content, headers, clojure.browser.net._STAR_timeout_STAR_)
};
goog.net.XhrIo.prototype.clojure$browser$net$IConnection$transmit$arity$6 = function(this$, uri, method, content, headers, timeout) {
  this$.setTimeoutInterval(timeout);
  return this$.send(uri, method, content, headers)
};
clojure.browser.net.xpc_config_fields = cljs.core.into.call(null, cljs.core.ObjMap.EMPTY, cljs.core.map.call(null, function(p__10328) {
  var vec__10329__10330 = p__10328;
  var k__10331 = cljs.core.nth.call(null, vec__10329__10330, 0, null);
  var v__10332 = cljs.core.nth.call(null, vec__10329__10330, 1, null);
  return cljs.core.PersistentVector.fromArray([cljs.core.keyword.call(null, k__10331.toLowerCase()), v__10332], true)
}, cljs.core.js__GT_clj.call(null, goog.net.xpc.CfgFields)));
clojure.browser.net.xhr_connection = function xhr_connection() {
  return new goog.net.XhrIo
};
clojure.browser.net.ICrossPageChannel = {};
clojure.browser.net.register_service = function() {
  var register_service = null;
  var register_service__3 = function(this$, service_name, fn) {
    if(function() {
      var and__3822__auto____10341 = this$;
      if(and__3822__auto____10341) {
        return this$.clojure$browser$net$ICrossPageChannel$register_service$arity$3
      }else {
        return and__3822__auto____10341
      }
    }()) {
      return this$.clojure$browser$net$ICrossPageChannel$register_service$arity$3(this$, service_name, fn)
    }else {
      var x__2369__auto____10342 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____10343 = clojure.browser.net.register_service[goog.typeOf(x__2369__auto____10342)];
        if(or__3824__auto____10343) {
          return or__3824__auto____10343
        }else {
          var or__3824__auto____10344 = clojure.browser.net.register_service["_"];
          if(or__3824__auto____10344) {
            return or__3824__auto____10344
          }else {
            throw cljs.core.missing_protocol.call(null, "ICrossPageChannel.register-service", this$);
          }
        }
      }().call(null, this$, service_name, fn)
    }
  };
  var register_service__4 = function(this$, service_name, fn, encode_json_QMARK_) {
    if(function() {
      var and__3822__auto____10345 = this$;
      if(and__3822__auto____10345) {
        return this$.clojure$browser$net$ICrossPageChannel$register_service$arity$4
      }else {
        return and__3822__auto____10345
      }
    }()) {
      return this$.clojure$browser$net$ICrossPageChannel$register_service$arity$4(this$, service_name, fn, encode_json_QMARK_)
    }else {
      var x__2369__auto____10346 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____10347 = clojure.browser.net.register_service[goog.typeOf(x__2369__auto____10346)];
        if(or__3824__auto____10347) {
          return or__3824__auto____10347
        }else {
          var or__3824__auto____10348 = clojure.browser.net.register_service["_"];
          if(or__3824__auto____10348) {
            return or__3824__auto____10348
          }else {
            throw cljs.core.missing_protocol.call(null, "ICrossPageChannel.register-service", this$);
          }
        }
      }().call(null, this$, service_name, fn, encode_json_QMARK_)
    }
  };
  register_service = function(this$, service_name, fn, encode_json_QMARK_) {
    switch(arguments.length) {
      case 3:
        return register_service__3.call(this, this$, service_name, fn);
      case 4:
        return register_service__4.call(this, this$, service_name, fn, encode_json_QMARK_)
    }
    throw"Invalid arity: " + arguments.length;
  };
  register_service.cljs$lang$arity$3 = register_service__3;
  register_service.cljs$lang$arity$4 = register_service__4;
  return register_service
}();
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$IConnection$ = true;
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$IConnection$connect$arity$1 = function(this$) {
  return clojure.browser.net.connect.call(null, this$, null)
};
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$IConnection$connect$arity$2 = function(this$, on_connect_fn) {
  return this$.connect(on_connect_fn)
};
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$IConnection$connect$arity$3 = function(this$, on_connect_fn, config_iframe_fn) {
  return clojure.browser.net.connect.call(null, this$, on_connect_fn, config_iframe_fn, document.body)
};
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$IConnection$connect$arity$4 = function(this$, on_connect_fn, config_iframe_fn, iframe_parent) {
  this$.createPeerIframe(iframe_parent, config_iframe_fn);
  return this$.connect(on_connect_fn)
};
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$IConnection$transmit$arity$3 = function(this$, service_name, payload) {
  return this$.send(cljs.core.name.call(null, service_name), payload)
};
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$IConnection$close$arity$1 = function(this$) {
  return this$.close(cljs.core.List.EMPTY)
};
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$ICrossPageChannel$ = true;
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$ICrossPageChannel$register_service$arity$3 = function(this$, service_name, fn) {
  return clojure.browser.net.register_service.call(null, this$, service_name, fn, false)
};
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$ICrossPageChannel$register_service$arity$4 = function(this$, service_name, fn, encode_json_QMARK_) {
  return this$.registerService(cljs.core.name.call(null, service_name), fn, encode_json_QMARK_)
};
clojure.browser.net.xpc_connection = function() {
  var xpc_connection = null;
  var xpc_connection__0 = function() {
    var temp__3974__auto____10360 = (new goog.Uri(window.location.href)).getParameterValue("xpc");
    if(cljs.core.truth_(temp__3974__auto____10360)) {
      var config__10361 = temp__3974__auto____10360;
      return new goog.net.xpc.CrossPageChannel(goog.json.parse(config__10361))
    }else {
      return null
    }
  };
  var xpc_connection__1 = function(config) {
    return new goog.net.xpc.CrossPageChannel(cljs.core.reduce.call(null, function(sum, p__10362) {
      var vec__10363__10364 = p__10362;
      var k__10365 = cljs.core.nth.call(null, vec__10363__10364, 0, null);
      var v__10366 = cljs.core.nth.call(null, vec__10363__10364, 1, null);
      var temp__3971__auto____10367 = cljs.core._lookup.call(null, clojure.browser.net.xpc_config_fields, k__10365, null);
      if(cljs.core.truth_(temp__3971__auto____10367)) {
        var field__10368 = temp__3971__auto____10367;
        var G__10369__10370 = sum;
        G__10369__10370[field__10368] = v__10366;
        return G__10369__10370
      }else {
        return sum
      }
    }, {}, config))
  };
  xpc_connection = function(config) {
    switch(arguments.length) {
      case 0:
        return xpc_connection__0.call(this);
      case 1:
        return xpc_connection__1.call(this, config)
    }
    throw"Invalid arity: " + arguments.length;
  };
  xpc_connection.cljs$lang$arity$0 = xpc_connection__0;
  xpc_connection.cljs$lang$arity$1 = xpc_connection__1;
  return xpc_connection
}();
goog.provide("clojure.browser.repl");
goog.require("cljs.core");
goog.require("clojure.browser.event");
goog.require("clojure.browser.net");
clojure.browser.repl.xpc_connection = cljs.core.atom.call(null, null);
clojure.browser.repl.repl_print = function repl_print(data) {
  var temp__3971__auto____10220 = cljs.core.deref.call(null, clojure.browser.repl.xpc_connection);
  if(cljs.core.truth_(temp__3971__auto____10220)) {
    var conn__10221 = temp__3971__auto____10220;
    return clojure.browser.net.transmit.call(null, conn__10221, "\ufdd0'print", cljs.core.pr_str.call(null, data))
  }else {
    return null
  }
};
clojure.browser.repl.evaluate_javascript = function evaluate_javascript(conn, block) {
  var result__10227 = function() {
    try {
      return cljs.core.ObjMap.fromObject(["\ufdd0'status", "\ufdd0'value"], {"\ufdd0'status":"\ufdd0'success", "\ufdd0'value":[cljs.core.str(eval(block))].join("")})
    }catch(e10225) {
      if(cljs.core.instance_QMARK_.call(null, Error, e10225)) {
        var e__10226 = e10225;
        return cljs.core.ObjMap.fromObject(["\ufdd0'status", "\ufdd0'value", "\ufdd0'stacktrace"], {"\ufdd0'status":"\ufdd0'exception", "\ufdd0'value":cljs.core.pr_str.call(null, e__10226), "\ufdd0'stacktrace":cljs.core.truth_(e__10226.hasOwnProperty("stack")) ? e__10226.stack : "No stacktrace available."})
      }else {
        if("\ufdd0'else") {
          throw e10225;
        }else {
          return null
        }
      }
    }
  }();
  return cljs.core.pr_str.call(null, result__10227)
};
clojure.browser.repl.send_result = function send_result(connection, url, data) {
  return clojure.browser.net.transmit.call(null, connection, url, "POST", data, null, 0)
};
clojure.browser.repl.send_print = function() {
  var send_print = null;
  var send_print__2 = function(url, data) {
    return send_print.call(null, url, data, 0)
  };
  var send_print__3 = function(url, data, n) {
    var conn__10229 = clojure.browser.net.xhr_connection.call(null);
    clojure.browser.event.listen.call(null, conn__10229, "\ufdd0'error", function(_) {
      if(n < 10) {
        return send_print.call(null, url, data, n + 1)
      }else {
        return console.log([cljs.core.str("Could not send "), cljs.core.str(data), cljs.core.str(" after "), cljs.core.str(n), cljs.core.str(" attempts.")].join(""))
      }
    });
    return clojure.browser.net.transmit.call(null, conn__10229, url, "POST", data, null, 0)
  };
  send_print = function(url, data, n) {
    switch(arguments.length) {
      case 2:
        return send_print__2.call(this, url, data);
      case 3:
        return send_print__3.call(this, url, data, n)
    }
    throw"Invalid arity: " + arguments.length;
  };
  send_print.cljs$lang$arity$2 = send_print__2;
  send_print.cljs$lang$arity$3 = send_print__3;
  return send_print
}();
clojure.browser.repl.order = cljs.core.atom.call(null, 0);
clojure.browser.repl.wrap_message = function wrap_message(t, data) {
  return cljs.core.pr_str.call(null, cljs.core.ObjMap.fromObject(["\ufdd0'type", "\ufdd0'content", "\ufdd0'order"], {"\ufdd0'type":t, "\ufdd0'content":data, "\ufdd0'order":cljs.core.swap_BANG_.call(null, clojure.browser.repl.order, cljs.core.inc)}))
};
clojure.browser.repl.start_evaluator = function start_evaluator(url) {
  var temp__3971__auto____10233 = clojure.browser.net.xpc_connection.call(null);
  if(cljs.core.truth_(temp__3971__auto____10233)) {
    var repl_connection__10234 = temp__3971__auto____10233;
    var connection__10235 = clojure.browser.net.xhr_connection.call(null);
    clojure.browser.event.listen.call(null, connection__10235, "\ufdd0'success", function(e) {
      return clojure.browser.net.transmit.call(null, repl_connection__10234, "\ufdd0'evaluate-javascript", e.currentTarget.getResponseText(cljs.core.List.EMPTY))
    });
    clojure.browser.net.register_service.call(null, repl_connection__10234, "\ufdd0'send-result", function(data) {
      return clojure.browser.repl.send_result.call(null, connection__10235, url, clojure.browser.repl.wrap_message.call(null, "\ufdd0'result", data))
    });
    clojure.browser.net.register_service.call(null, repl_connection__10234, "\ufdd0'print", function(data) {
      return clojure.browser.repl.send_print.call(null, url, clojure.browser.repl.wrap_message.call(null, "\ufdd0'print", data))
    });
    clojure.browser.net.connect.call(null, repl_connection__10234, cljs.core.constantly.call(null, null));
    return setTimeout(function() {
      return clojure.browser.repl.send_result.call(null, connection__10235, url, clojure.browser.repl.wrap_message.call(null, "\ufdd0'ready", "ready"))
    }, 50)
  }else {
    return alert("No 'xpc' param provided to child iframe.")
  }
};
clojure.browser.repl.connect = function connect(repl_server_url) {
  var repl_connection__10237 = clojure.browser.net.xpc_connection.call(null, cljs.core.ObjMap.fromObject(["\ufdd0'peer_uri"], {"\ufdd0'peer_uri":repl_server_url}));
  cljs.core.swap_BANG_.call(null, clojure.browser.repl.xpc_connection, cljs.core.constantly.call(null, repl_connection__10237));
  clojure.browser.net.register_service.call(null, repl_connection__10237, "\ufdd0'evaluate-javascript", function(js) {
    return clojure.browser.net.transmit.call(null, repl_connection__10237, "\ufdd0'send-result", clojure.browser.repl.evaluate_javascript.call(null, repl_connection__10237, js))
  });
  return clojure.browser.net.connect.call(null, repl_connection__10237, cljs.core.constantly.call(null, null), function(iframe) {
    return iframe.style.display = "none"
  })
};
goog.provide("cljsserver.repl");
goog.require("cljs.core");
goog.require("clojure.browser.repl");
clojure.browser.repl.connect.call(null, "http://localhost:9000/repl");
