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
goog.provide("goog.debug.Error");
goog.debug.Error = function(opt_msg) {
  this.stack = (new Error).stack || "";
  if(opt_msg) {
    this.message = String(opt_msg)
  }
};
goog.inherits(goog.debug.Error, Error);
goog.debug.Error.prototype.name = "CustomError";
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
  var x__6115 = x == null ? null : x;
  if(p[goog.typeOf(x__6115)]) {
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
    var G__6116__delegate = function(array, i, idxs) {
      return cljs.core.apply.call(null, aget, aget.call(null, array, i), idxs)
    };
    var G__6116 = function(array, i, var_args) {
      var idxs = null;
      if(goog.isDef(var_args)) {
        idxs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__6116__delegate.call(this, array, i, idxs)
    };
    G__6116.cljs$lang$maxFixedArity = 2;
    G__6116.cljs$lang$applyTo = function(arglist__6117) {
      var array = cljs.core.first(arglist__6117);
      var i = cljs.core.first(cljs.core.next(arglist__6117));
      var idxs = cljs.core.rest(cljs.core.next(arglist__6117));
      return G__6116__delegate(array, i, idxs)
    };
    G__6116.cljs$lang$arity$variadic = G__6116__delegate;
    return G__6116
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
      var and__3822__auto____6202 = this$;
      if(and__3822__auto____6202) {
        return this$.cljs$core$IFn$_invoke$arity$1
      }else {
        return and__3822__auto____6202
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$1(this$)
    }else {
      var x__2376__auto____6203 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6204 = cljs.core._invoke[goog.typeOf(x__2376__auto____6203)];
        if(or__3824__auto____6204) {
          return or__3824__auto____6204
        }else {
          var or__3824__auto____6205 = cljs.core._invoke["_"];
          if(or__3824__auto____6205) {
            return or__3824__auto____6205
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$)
    }
  };
  var _invoke__2 = function(this$, a) {
    if(function() {
      var and__3822__auto____6206 = this$;
      if(and__3822__auto____6206) {
        return this$.cljs$core$IFn$_invoke$arity$2
      }else {
        return and__3822__auto____6206
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$2(this$, a)
    }else {
      var x__2376__auto____6207 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6208 = cljs.core._invoke[goog.typeOf(x__2376__auto____6207)];
        if(or__3824__auto____6208) {
          return or__3824__auto____6208
        }else {
          var or__3824__auto____6209 = cljs.core._invoke["_"];
          if(or__3824__auto____6209) {
            return or__3824__auto____6209
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a)
    }
  };
  var _invoke__3 = function(this$, a, b) {
    if(function() {
      var and__3822__auto____6210 = this$;
      if(and__3822__auto____6210) {
        return this$.cljs$core$IFn$_invoke$arity$3
      }else {
        return and__3822__auto____6210
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$3(this$, a, b)
    }else {
      var x__2376__auto____6211 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6212 = cljs.core._invoke[goog.typeOf(x__2376__auto____6211)];
        if(or__3824__auto____6212) {
          return or__3824__auto____6212
        }else {
          var or__3824__auto____6213 = cljs.core._invoke["_"];
          if(or__3824__auto____6213) {
            return or__3824__auto____6213
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b)
    }
  };
  var _invoke__4 = function(this$, a, b, c) {
    if(function() {
      var and__3822__auto____6214 = this$;
      if(and__3822__auto____6214) {
        return this$.cljs$core$IFn$_invoke$arity$4
      }else {
        return and__3822__auto____6214
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$4(this$, a, b, c)
    }else {
      var x__2376__auto____6215 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6216 = cljs.core._invoke[goog.typeOf(x__2376__auto____6215)];
        if(or__3824__auto____6216) {
          return or__3824__auto____6216
        }else {
          var or__3824__auto____6217 = cljs.core._invoke["_"];
          if(or__3824__auto____6217) {
            return or__3824__auto____6217
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c)
    }
  };
  var _invoke__5 = function(this$, a, b, c, d) {
    if(function() {
      var and__3822__auto____6218 = this$;
      if(and__3822__auto____6218) {
        return this$.cljs$core$IFn$_invoke$arity$5
      }else {
        return and__3822__auto____6218
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$5(this$, a, b, c, d)
    }else {
      var x__2376__auto____6219 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6220 = cljs.core._invoke[goog.typeOf(x__2376__auto____6219)];
        if(or__3824__auto____6220) {
          return or__3824__auto____6220
        }else {
          var or__3824__auto____6221 = cljs.core._invoke["_"];
          if(or__3824__auto____6221) {
            return or__3824__auto____6221
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d)
    }
  };
  var _invoke__6 = function(this$, a, b, c, d, e) {
    if(function() {
      var and__3822__auto____6222 = this$;
      if(and__3822__auto____6222) {
        return this$.cljs$core$IFn$_invoke$arity$6
      }else {
        return and__3822__auto____6222
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$6(this$, a, b, c, d, e)
    }else {
      var x__2376__auto____6223 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6224 = cljs.core._invoke[goog.typeOf(x__2376__auto____6223)];
        if(or__3824__auto____6224) {
          return or__3824__auto____6224
        }else {
          var or__3824__auto____6225 = cljs.core._invoke["_"];
          if(or__3824__auto____6225) {
            return or__3824__auto____6225
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e)
    }
  };
  var _invoke__7 = function(this$, a, b, c, d, e, f) {
    if(function() {
      var and__3822__auto____6226 = this$;
      if(and__3822__auto____6226) {
        return this$.cljs$core$IFn$_invoke$arity$7
      }else {
        return and__3822__auto____6226
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$7(this$, a, b, c, d, e, f)
    }else {
      var x__2376__auto____6227 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6228 = cljs.core._invoke[goog.typeOf(x__2376__auto____6227)];
        if(or__3824__auto____6228) {
          return or__3824__auto____6228
        }else {
          var or__3824__auto____6229 = cljs.core._invoke["_"];
          if(or__3824__auto____6229) {
            return or__3824__auto____6229
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f)
    }
  };
  var _invoke__8 = function(this$, a, b, c, d, e, f, g) {
    if(function() {
      var and__3822__auto____6230 = this$;
      if(and__3822__auto____6230) {
        return this$.cljs$core$IFn$_invoke$arity$8
      }else {
        return and__3822__auto____6230
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$8(this$, a, b, c, d, e, f, g)
    }else {
      var x__2376__auto____6231 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6232 = cljs.core._invoke[goog.typeOf(x__2376__auto____6231)];
        if(or__3824__auto____6232) {
          return or__3824__auto____6232
        }else {
          var or__3824__auto____6233 = cljs.core._invoke["_"];
          if(or__3824__auto____6233) {
            return or__3824__auto____6233
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g)
    }
  };
  var _invoke__9 = function(this$, a, b, c, d, e, f, g, h) {
    if(function() {
      var and__3822__auto____6234 = this$;
      if(and__3822__auto____6234) {
        return this$.cljs$core$IFn$_invoke$arity$9
      }else {
        return and__3822__auto____6234
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$9(this$, a, b, c, d, e, f, g, h)
    }else {
      var x__2376__auto____6235 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6236 = cljs.core._invoke[goog.typeOf(x__2376__auto____6235)];
        if(or__3824__auto____6236) {
          return or__3824__auto____6236
        }else {
          var or__3824__auto____6237 = cljs.core._invoke["_"];
          if(or__3824__auto____6237) {
            return or__3824__auto____6237
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h)
    }
  };
  var _invoke__10 = function(this$, a, b, c, d, e, f, g, h, i) {
    if(function() {
      var and__3822__auto____6238 = this$;
      if(and__3822__auto____6238) {
        return this$.cljs$core$IFn$_invoke$arity$10
      }else {
        return and__3822__auto____6238
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$10(this$, a, b, c, d, e, f, g, h, i)
    }else {
      var x__2376__auto____6239 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6240 = cljs.core._invoke[goog.typeOf(x__2376__auto____6239)];
        if(or__3824__auto____6240) {
          return or__3824__auto____6240
        }else {
          var or__3824__auto____6241 = cljs.core._invoke["_"];
          if(or__3824__auto____6241) {
            return or__3824__auto____6241
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i)
    }
  };
  var _invoke__11 = function(this$, a, b, c, d, e, f, g, h, i, j) {
    if(function() {
      var and__3822__auto____6242 = this$;
      if(and__3822__auto____6242) {
        return this$.cljs$core$IFn$_invoke$arity$11
      }else {
        return and__3822__auto____6242
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$11(this$, a, b, c, d, e, f, g, h, i, j)
    }else {
      var x__2376__auto____6243 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6244 = cljs.core._invoke[goog.typeOf(x__2376__auto____6243)];
        if(or__3824__auto____6244) {
          return or__3824__auto____6244
        }else {
          var or__3824__auto____6245 = cljs.core._invoke["_"];
          if(or__3824__auto____6245) {
            return or__3824__auto____6245
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j)
    }
  };
  var _invoke__12 = function(this$, a, b, c, d, e, f, g, h, i, j, k) {
    if(function() {
      var and__3822__auto____6246 = this$;
      if(and__3822__auto____6246) {
        return this$.cljs$core$IFn$_invoke$arity$12
      }else {
        return and__3822__auto____6246
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$12(this$, a, b, c, d, e, f, g, h, i, j, k)
    }else {
      var x__2376__auto____6247 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6248 = cljs.core._invoke[goog.typeOf(x__2376__auto____6247)];
        if(or__3824__auto____6248) {
          return or__3824__auto____6248
        }else {
          var or__3824__auto____6249 = cljs.core._invoke["_"];
          if(or__3824__auto____6249) {
            return or__3824__auto____6249
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j, k)
    }
  };
  var _invoke__13 = function(this$, a, b, c, d, e, f, g, h, i, j, k, l) {
    if(function() {
      var and__3822__auto____6250 = this$;
      if(and__3822__auto____6250) {
        return this$.cljs$core$IFn$_invoke$arity$13
      }else {
        return and__3822__auto____6250
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$13(this$, a, b, c, d, e, f, g, h, i, j, k, l)
    }else {
      var x__2376__auto____6251 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6252 = cljs.core._invoke[goog.typeOf(x__2376__auto____6251)];
        if(or__3824__auto____6252) {
          return or__3824__auto____6252
        }else {
          var or__3824__auto____6253 = cljs.core._invoke["_"];
          if(or__3824__auto____6253) {
            return or__3824__auto____6253
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j, k, l)
    }
  };
  var _invoke__14 = function(this$, a, b, c, d, e, f, g, h, i, j, k, l, m) {
    if(function() {
      var and__3822__auto____6254 = this$;
      if(and__3822__auto____6254) {
        return this$.cljs$core$IFn$_invoke$arity$14
      }else {
        return and__3822__auto____6254
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$14(this$, a, b, c, d, e, f, g, h, i, j, k, l, m)
    }else {
      var x__2376__auto____6255 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6256 = cljs.core._invoke[goog.typeOf(x__2376__auto____6255)];
        if(or__3824__auto____6256) {
          return or__3824__auto____6256
        }else {
          var or__3824__auto____6257 = cljs.core._invoke["_"];
          if(or__3824__auto____6257) {
            return or__3824__auto____6257
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j, k, l, m)
    }
  };
  var _invoke__15 = function(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    if(function() {
      var and__3822__auto____6258 = this$;
      if(and__3822__auto____6258) {
        return this$.cljs$core$IFn$_invoke$arity$15
      }else {
        return and__3822__auto____6258
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$15(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n)
    }else {
      var x__2376__auto____6259 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6260 = cljs.core._invoke[goog.typeOf(x__2376__auto____6259)];
        if(or__3824__auto____6260) {
          return or__3824__auto____6260
        }else {
          var or__3824__auto____6261 = cljs.core._invoke["_"];
          if(or__3824__auto____6261) {
            return or__3824__auto____6261
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n)
    }
  };
  var _invoke__16 = function(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
    if(function() {
      var and__3822__auto____6262 = this$;
      if(and__3822__auto____6262) {
        return this$.cljs$core$IFn$_invoke$arity$16
      }else {
        return and__3822__auto____6262
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$16(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o)
    }else {
      var x__2376__auto____6263 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6264 = cljs.core._invoke[goog.typeOf(x__2376__auto____6263)];
        if(or__3824__auto____6264) {
          return or__3824__auto____6264
        }else {
          var or__3824__auto____6265 = cljs.core._invoke["_"];
          if(or__3824__auto____6265) {
            return or__3824__auto____6265
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o)
    }
  };
  var _invoke__17 = function(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
    if(function() {
      var and__3822__auto____6266 = this$;
      if(and__3822__auto____6266) {
        return this$.cljs$core$IFn$_invoke$arity$17
      }else {
        return and__3822__auto____6266
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$17(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p)
    }else {
      var x__2376__auto____6267 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6268 = cljs.core._invoke[goog.typeOf(x__2376__auto____6267)];
        if(or__3824__auto____6268) {
          return or__3824__auto____6268
        }else {
          var or__3824__auto____6269 = cljs.core._invoke["_"];
          if(or__3824__auto____6269) {
            return or__3824__auto____6269
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p)
    }
  };
  var _invoke__18 = function(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
    if(function() {
      var and__3822__auto____6270 = this$;
      if(and__3822__auto____6270) {
        return this$.cljs$core$IFn$_invoke$arity$18
      }else {
        return and__3822__auto____6270
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$18(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q)
    }else {
      var x__2376__auto____6271 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6272 = cljs.core._invoke[goog.typeOf(x__2376__auto____6271)];
        if(or__3824__auto____6272) {
          return or__3824__auto____6272
        }else {
          var or__3824__auto____6273 = cljs.core._invoke["_"];
          if(or__3824__auto____6273) {
            return or__3824__auto____6273
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q)
    }
  };
  var _invoke__19 = function(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s) {
    if(function() {
      var and__3822__auto____6274 = this$;
      if(and__3822__auto____6274) {
        return this$.cljs$core$IFn$_invoke$arity$19
      }else {
        return and__3822__auto____6274
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$19(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s)
    }else {
      var x__2376__auto____6275 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6276 = cljs.core._invoke[goog.typeOf(x__2376__auto____6275)];
        if(or__3824__auto____6276) {
          return or__3824__auto____6276
        }else {
          var or__3824__auto____6277 = cljs.core._invoke["_"];
          if(or__3824__auto____6277) {
            return or__3824__auto____6277
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s)
    }
  };
  var _invoke__20 = function(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s, t) {
    if(function() {
      var and__3822__auto____6278 = this$;
      if(and__3822__auto____6278) {
        return this$.cljs$core$IFn$_invoke$arity$20
      }else {
        return and__3822__auto____6278
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$20(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s, t)
    }else {
      var x__2376__auto____6279 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6280 = cljs.core._invoke[goog.typeOf(x__2376__auto____6279)];
        if(or__3824__auto____6280) {
          return or__3824__auto____6280
        }else {
          var or__3824__auto____6281 = cljs.core._invoke["_"];
          if(or__3824__auto____6281) {
            return or__3824__auto____6281
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s, t)
    }
  };
  var _invoke__21 = function(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s, t, rest) {
    if(function() {
      var and__3822__auto____6282 = this$;
      if(and__3822__auto____6282) {
        return this$.cljs$core$IFn$_invoke$arity$21
      }else {
        return and__3822__auto____6282
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$21(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s, t, rest)
    }else {
      var x__2376__auto____6283 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6284 = cljs.core._invoke[goog.typeOf(x__2376__auto____6283)];
        if(or__3824__auto____6284) {
          return or__3824__auto____6284
        }else {
          var or__3824__auto____6285 = cljs.core._invoke["_"];
          if(or__3824__auto____6285) {
            return or__3824__auto____6285
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
    var and__3822__auto____6290 = coll;
    if(and__3822__auto____6290) {
      return coll.cljs$core$ICounted$_count$arity$1
    }else {
      return and__3822__auto____6290
    }
  }()) {
    return coll.cljs$core$ICounted$_count$arity$1(coll)
  }else {
    var x__2376__auto____6291 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6292 = cljs.core._count[goog.typeOf(x__2376__auto____6291)];
      if(or__3824__auto____6292) {
        return or__3824__auto____6292
      }else {
        var or__3824__auto____6293 = cljs.core._count["_"];
        if(or__3824__auto____6293) {
          return or__3824__auto____6293
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
    var and__3822__auto____6298 = coll;
    if(and__3822__auto____6298) {
      return coll.cljs$core$IEmptyableCollection$_empty$arity$1
    }else {
      return and__3822__auto____6298
    }
  }()) {
    return coll.cljs$core$IEmptyableCollection$_empty$arity$1(coll)
  }else {
    var x__2376__auto____6299 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6300 = cljs.core._empty[goog.typeOf(x__2376__auto____6299)];
      if(or__3824__auto____6300) {
        return or__3824__auto____6300
      }else {
        var or__3824__auto____6301 = cljs.core._empty["_"];
        if(or__3824__auto____6301) {
          return or__3824__auto____6301
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
    var and__3822__auto____6306 = coll;
    if(and__3822__auto____6306) {
      return coll.cljs$core$ICollection$_conj$arity$2
    }else {
      return and__3822__auto____6306
    }
  }()) {
    return coll.cljs$core$ICollection$_conj$arity$2(coll, o)
  }else {
    var x__2376__auto____6307 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6308 = cljs.core._conj[goog.typeOf(x__2376__auto____6307)];
      if(or__3824__auto____6308) {
        return or__3824__auto____6308
      }else {
        var or__3824__auto____6309 = cljs.core._conj["_"];
        if(or__3824__auto____6309) {
          return or__3824__auto____6309
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
      var and__3822__auto____6318 = coll;
      if(and__3822__auto____6318) {
        return coll.cljs$core$IIndexed$_nth$arity$2
      }else {
        return and__3822__auto____6318
      }
    }()) {
      return coll.cljs$core$IIndexed$_nth$arity$2(coll, n)
    }else {
      var x__2376__auto____6319 = coll == null ? null : coll;
      return function() {
        var or__3824__auto____6320 = cljs.core._nth[goog.typeOf(x__2376__auto____6319)];
        if(or__3824__auto____6320) {
          return or__3824__auto____6320
        }else {
          var or__3824__auto____6321 = cljs.core._nth["_"];
          if(or__3824__auto____6321) {
            return or__3824__auto____6321
          }else {
            throw cljs.core.missing_protocol.call(null, "IIndexed.-nth", coll);
          }
        }
      }().call(null, coll, n)
    }
  };
  var _nth__3 = function(coll, n, not_found) {
    if(function() {
      var and__3822__auto____6322 = coll;
      if(and__3822__auto____6322) {
        return coll.cljs$core$IIndexed$_nth$arity$3
      }else {
        return and__3822__auto____6322
      }
    }()) {
      return coll.cljs$core$IIndexed$_nth$arity$3(coll, n, not_found)
    }else {
      var x__2376__auto____6323 = coll == null ? null : coll;
      return function() {
        var or__3824__auto____6324 = cljs.core._nth[goog.typeOf(x__2376__auto____6323)];
        if(or__3824__auto____6324) {
          return or__3824__auto____6324
        }else {
          var or__3824__auto____6325 = cljs.core._nth["_"];
          if(or__3824__auto____6325) {
            return or__3824__auto____6325
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
    var and__3822__auto____6330 = coll;
    if(and__3822__auto____6330) {
      return coll.cljs$core$ISeq$_first$arity$1
    }else {
      return and__3822__auto____6330
    }
  }()) {
    return coll.cljs$core$ISeq$_first$arity$1(coll)
  }else {
    var x__2376__auto____6331 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6332 = cljs.core._first[goog.typeOf(x__2376__auto____6331)];
      if(or__3824__auto____6332) {
        return or__3824__auto____6332
      }else {
        var or__3824__auto____6333 = cljs.core._first["_"];
        if(or__3824__auto____6333) {
          return or__3824__auto____6333
        }else {
          throw cljs.core.missing_protocol.call(null, "ISeq.-first", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core._rest = function _rest(coll) {
  if(function() {
    var and__3822__auto____6338 = coll;
    if(and__3822__auto____6338) {
      return coll.cljs$core$ISeq$_rest$arity$1
    }else {
      return and__3822__auto____6338
    }
  }()) {
    return coll.cljs$core$ISeq$_rest$arity$1(coll)
  }else {
    var x__2376__auto____6339 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6340 = cljs.core._rest[goog.typeOf(x__2376__auto____6339)];
      if(or__3824__auto____6340) {
        return or__3824__auto____6340
      }else {
        var or__3824__auto____6341 = cljs.core._rest["_"];
        if(or__3824__auto____6341) {
          return or__3824__auto____6341
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
    var and__3822__auto____6346 = coll;
    if(and__3822__auto____6346) {
      return coll.cljs$core$INext$_next$arity$1
    }else {
      return and__3822__auto____6346
    }
  }()) {
    return coll.cljs$core$INext$_next$arity$1(coll)
  }else {
    var x__2376__auto____6347 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6348 = cljs.core._next[goog.typeOf(x__2376__auto____6347)];
      if(or__3824__auto____6348) {
        return or__3824__auto____6348
      }else {
        var or__3824__auto____6349 = cljs.core._next["_"];
        if(or__3824__auto____6349) {
          return or__3824__auto____6349
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
      var and__3822__auto____6358 = o;
      if(and__3822__auto____6358) {
        return o.cljs$core$ILookup$_lookup$arity$2
      }else {
        return and__3822__auto____6358
      }
    }()) {
      return o.cljs$core$ILookup$_lookup$arity$2(o, k)
    }else {
      var x__2376__auto____6359 = o == null ? null : o;
      return function() {
        var or__3824__auto____6360 = cljs.core._lookup[goog.typeOf(x__2376__auto____6359)];
        if(or__3824__auto____6360) {
          return or__3824__auto____6360
        }else {
          var or__3824__auto____6361 = cljs.core._lookup["_"];
          if(or__3824__auto____6361) {
            return or__3824__auto____6361
          }else {
            throw cljs.core.missing_protocol.call(null, "ILookup.-lookup", o);
          }
        }
      }().call(null, o, k)
    }
  };
  var _lookup__3 = function(o, k, not_found) {
    if(function() {
      var and__3822__auto____6362 = o;
      if(and__3822__auto____6362) {
        return o.cljs$core$ILookup$_lookup$arity$3
      }else {
        return and__3822__auto____6362
      }
    }()) {
      return o.cljs$core$ILookup$_lookup$arity$3(o, k, not_found)
    }else {
      var x__2376__auto____6363 = o == null ? null : o;
      return function() {
        var or__3824__auto____6364 = cljs.core._lookup[goog.typeOf(x__2376__auto____6363)];
        if(or__3824__auto____6364) {
          return or__3824__auto____6364
        }else {
          var or__3824__auto____6365 = cljs.core._lookup["_"];
          if(or__3824__auto____6365) {
            return or__3824__auto____6365
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
    var and__3822__auto____6370 = coll;
    if(and__3822__auto____6370) {
      return coll.cljs$core$IAssociative$_contains_key_QMARK_$arity$2
    }else {
      return and__3822__auto____6370
    }
  }()) {
    return coll.cljs$core$IAssociative$_contains_key_QMARK_$arity$2(coll, k)
  }else {
    var x__2376__auto____6371 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6372 = cljs.core._contains_key_QMARK_[goog.typeOf(x__2376__auto____6371)];
      if(or__3824__auto____6372) {
        return or__3824__auto____6372
      }else {
        var or__3824__auto____6373 = cljs.core._contains_key_QMARK_["_"];
        if(or__3824__auto____6373) {
          return or__3824__auto____6373
        }else {
          throw cljs.core.missing_protocol.call(null, "IAssociative.-contains-key?", coll);
        }
      }
    }().call(null, coll, k)
  }
};
cljs.core._assoc = function _assoc(coll, k, v) {
  if(function() {
    var and__3822__auto____6378 = coll;
    if(and__3822__auto____6378) {
      return coll.cljs$core$IAssociative$_assoc$arity$3
    }else {
      return and__3822__auto____6378
    }
  }()) {
    return coll.cljs$core$IAssociative$_assoc$arity$3(coll, k, v)
  }else {
    var x__2376__auto____6379 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6380 = cljs.core._assoc[goog.typeOf(x__2376__auto____6379)];
      if(or__3824__auto____6380) {
        return or__3824__auto____6380
      }else {
        var or__3824__auto____6381 = cljs.core._assoc["_"];
        if(or__3824__auto____6381) {
          return or__3824__auto____6381
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
    var and__3822__auto____6386 = coll;
    if(and__3822__auto____6386) {
      return coll.cljs$core$IMap$_dissoc$arity$2
    }else {
      return and__3822__auto____6386
    }
  }()) {
    return coll.cljs$core$IMap$_dissoc$arity$2(coll, k)
  }else {
    var x__2376__auto____6387 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6388 = cljs.core._dissoc[goog.typeOf(x__2376__auto____6387)];
      if(or__3824__auto____6388) {
        return or__3824__auto____6388
      }else {
        var or__3824__auto____6389 = cljs.core._dissoc["_"];
        if(or__3824__auto____6389) {
          return or__3824__auto____6389
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
    var and__3822__auto____6394 = coll;
    if(and__3822__auto____6394) {
      return coll.cljs$core$IMapEntry$_key$arity$1
    }else {
      return and__3822__auto____6394
    }
  }()) {
    return coll.cljs$core$IMapEntry$_key$arity$1(coll)
  }else {
    var x__2376__auto____6395 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6396 = cljs.core._key[goog.typeOf(x__2376__auto____6395)];
      if(or__3824__auto____6396) {
        return or__3824__auto____6396
      }else {
        var or__3824__auto____6397 = cljs.core._key["_"];
        if(or__3824__auto____6397) {
          return or__3824__auto____6397
        }else {
          throw cljs.core.missing_protocol.call(null, "IMapEntry.-key", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core._val = function _val(coll) {
  if(function() {
    var and__3822__auto____6402 = coll;
    if(and__3822__auto____6402) {
      return coll.cljs$core$IMapEntry$_val$arity$1
    }else {
      return and__3822__auto____6402
    }
  }()) {
    return coll.cljs$core$IMapEntry$_val$arity$1(coll)
  }else {
    var x__2376__auto____6403 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6404 = cljs.core._val[goog.typeOf(x__2376__auto____6403)];
      if(or__3824__auto____6404) {
        return or__3824__auto____6404
      }else {
        var or__3824__auto____6405 = cljs.core._val["_"];
        if(or__3824__auto____6405) {
          return or__3824__auto____6405
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
    var and__3822__auto____6410 = coll;
    if(and__3822__auto____6410) {
      return coll.cljs$core$ISet$_disjoin$arity$2
    }else {
      return and__3822__auto____6410
    }
  }()) {
    return coll.cljs$core$ISet$_disjoin$arity$2(coll, v)
  }else {
    var x__2376__auto____6411 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6412 = cljs.core._disjoin[goog.typeOf(x__2376__auto____6411)];
      if(or__3824__auto____6412) {
        return or__3824__auto____6412
      }else {
        var or__3824__auto____6413 = cljs.core._disjoin["_"];
        if(or__3824__auto____6413) {
          return or__3824__auto____6413
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
    var and__3822__auto____6418 = coll;
    if(and__3822__auto____6418) {
      return coll.cljs$core$IStack$_peek$arity$1
    }else {
      return and__3822__auto____6418
    }
  }()) {
    return coll.cljs$core$IStack$_peek$arity$1(coll)
  }else {
    var x__2376__auto____6419 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6420 = cljs.core._peek[goog.typeOf(x__2376__auto____6419)];
      if(or__3824__auto____6420) {
        return or__3824__auto____6420
      }else {
        var or__3824__auto____6421 = cljs.core._peek["_"];
        if(or__3824__auto____6421) {
          return or__3824__auto____6421
        }else {
          throw cljs.core.missing_protocol.call(null, "IStack.-peek", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core._pop = function _pop(coll) {
  if(function() {
    var and__3822__auto____6426 = coll;
    if(and__3822__auto____6426) {
      return coll.cljs$core$IStack$_pop$arity$1
    }else {
      return and__3822__auto____6426
    }
  }()) {
    return coll.cljs$core$IStack$_pop$arity$1(coll)
  }else {
    var x__2376__auto____6427 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6428 = cljs.core._pop[goog.typeOf(x__2376__auto____6427)];
      if(or__3824__auto____6428) {
        return or__3824__auto____6428
      }else {
        var or__3824__auto____6429 = cljs.core._pop["_"];
        if(or__3824__auto____6429) {
          return or__3824__auto____6429
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
    var and__3822__auto____6434 = coll;
    if(and__3822__auto____6434) {
      return coll.cljs$core$IVector$_assoc_n$arity$3
    }else {
      return and__3822__auto____6434
    }
  }()) {
    return coll.cljs$core$IVector$_assoc_n$arity$3(coll, n, val)
  }else {
    var x__2376__auto____6435 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6436 = cljs.core._assoc_n[goog.typeOf(x__2376__auto____6435)];
      if(or__3824__auto____6436) {
        return or__3824__auto____6436
      }else {
        var or__3824__auto____6437 = cljs.core._assoc_n["_"];
        if(or__3824__auto____6437) {
          return or__3824__auto____6437
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
    var and__3822__auto____6442 = o;
    if(and__3822__auto____6442) {
      return o.cljs$core$IDeref$_deref$arity$1
    }else {
      return and__3822__auto____6442
    }
  }()) {
    return o.cljs$core$IDeref$_deref$arity$1(o)
  }else {
    var x__2376__auto____6443 = o == null ? null : o;
    return function() {
      var or__3824__auto____6444 = cljs.core._deref[goog.typeOf(x__2376__auto____6443)];
      if(or__3824__auto____6444) {
        return or__3824__auto____6444
      }else {
        var or__3824__auto____6445 = cljs.core._deref["_"];
        if(or__3824__auto____6445) {
          return or__3824__auto____6445
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
    var and__3822__auto____6450 = o;
    if(and__3822__auto____6450) {
      return o.cljs$core$IDerefWithTimeout$_deref_with_timeout$arity$3
    }else {
      return and__3822__auto____6450
    }
  }()) {
    return o.cljs$core$IDerefWithTimeout$_deref_with_timeout$arity$3(o, msec, timeout_val)
  }else {
    var x__2376__auto____6451 = o == null ? null : o;
    return function() {
      var or__3824__auto____6452 = cljs.core._deref_with_timeout[goog.typeOf(x__2376__auto____6451)];
      if(or__3824__auto____6452) {
        return or__3824__auto____6452
      }else {
        var or__3824__auto____6453 = cljs.core._deref_with_timeout["_"];
        if(or__3824__auto____6453) {
          return or__3824__auto____6453
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
    var and__3822__auto____6458 = o;
    if(and__3822__auto____6458) {
      return o.cljs$core$IMeta$_meta$arity$1
    }else {
      return and__3822__auto____6458
    }
  }()) {
    return o.cljs$core$IMeta$_meta$arity$1(o)
  }else {
    var x__2376__auto____6459 = o == null ? null : o;
    return function() {
      var or__3824__auto____6460 = cljs.core._meta[goog.typeOf(x__2376__auto____6459)];
      if(or__3824__auto____6460) {
        return or__3824__auto____6460
      }else {
        var or__3824__auto____6461 = cljs.core._meta["_"];
        if(or__3824__auto____6461) {
          return or__3824__auto____6461
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
    var and__3822__auto____6466 = o;
    if(and__3822__auto____6466) {
      return o.cljs$core$IWithMeta$_with_meta$arity$2
    }else {
      return and__3822__auto____6466
    }
  }()) {
    return o.cljs$core$IWithMeta$_with_meta$arity$2(o, meta)
  }else {
    var x__2376__auto____6467 = o == null ? null : o;
    return function() {
      var or__3824__auto____6468 = cljs.core._with_meta[goog.typeOf(x__2376__auto____6467)];
      if(or__3824__auto____6468) {
        return or__3824__auto____6468
      }else {
        var or__3824__auto____6469 = cljs.core._with_meta["_"];
        if(or__3824__auto____6469) {
          return or__3824__auto____6469
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
      var and__3822__auto____6478 = coll;
      if(and__3822__auto____6478) {
        return coll.cljs$core$IReduce$_reduce$arity$2
      }else {
        return and__3822__auto____6478
      }
    }()) {
      return coll.cljs$core$IReduce$_reduce$arity$2(coll, f)
    }else {
      var x__2376__auto____6479 = coll == null ? null : coll;
      return function() {
        var or__3824__auto____6480 = cljs.core._reduce[goog.typeOf(x__2376__auto____6479)];
        if(or__3824__auto____6480) {
          return or__3824__auto____6480
        }else {
          var or__3824__auto____6481 = cljs.core._reduce["_"];
          if(or__3824__auto____6481) {
            return or__3824__auto____6481
          }else {
            throw cljs.core.missing_protocol.call(null, "IReduce.-reduce", coll);
          }
        }
      }().call(null, coll, f)
    }
  };
  var _reduce__3 = function(coll, f, start) {
    if(function() {
      var and__3822__auto____6482 = coll;
      if(and__3822__auto____6482) {
        return coll.cljs$core$IReduce$_reduce$arity$3
      }else {
        return and__3822__auto____6482
      }
    }()) {
      return coll.cljs$core$IReduce$_reduce$arity$3(coll, f, start)
    }else {
      var x__2376__auto____6483 = coll == null ? null : coll;
      return function() {
        var or__3824__auto____6484 = cljs.core._reduce[goog.typeOf(x__2376__auto____6483)];
        if(or__3824__auto____6484) {
          return or__3824__auto____6484
        }else {
          var or__3824__auto____6485 = cljs.core._reduce["_"];
          if(or__3824__auto____6485) {
            return or__3824__auto____6485
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
    var and__3822__auto____6490 = coll;
    if(and__3822__auto____6490) {
      return coll.cljs$core$IKVReduce$_kv_reduce$arity$3
    }else {
      return and__3822__auto____6490
    }
  }()) {
    return coll.cljs$core$IKVReduce$_kv_reduce$arity$3(coll, f, init)
  }else {
    var x__2376__auto____6491 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6492 = cljs.core._kv_reduce[goog.typeOf(x__2376__auto____6491)];
      if(or__3824__auto____6492) {
        return or__3824__auto____6492
      }else {
        var or__3824__auto____6493 = cljs.core._kv_reduce["_"];
        if(or__3824__auto____6493) {
          return or__3824__auto____6493
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
    var and__3822__auto____6498 = o;
    if(and__3822__auto____6498) {
      return o.cljs$core$IEquiv$_equiv$arity$2
    }else {
      return and__3822__auto____6498
    }
  }()) {
    return o.cljs$core$IEquiv$_equiv$arity$2(o, other)
  }else {
    var x__2376__auto____6499 = o == null ? null : o;
    return function() {
      var or__3824__auto____6500 = cljs.core._equiv[goog.typeOf(x__2376__auto____6499)];
      if(or__3824__auto____6500) {
        return or__3824__auto____6500
      }else {
        var or__3824__auto____6501 = cljs.core._equiv["_"];
        if(or__3824__auto____6501) {
          return or__3824__auto____6501
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
    var and__3822__auto____6506 = o;
    if(and__3822__auto____6506) {
      return o.cljs$core$IHash$_hash$arity$1
    }else {
      return and__3822__auto____6506
    }
  }()) {
    return o.cljs$core$IHash$_hash$arity$1(o)
  }else {
    var x__2376__auto____6507 = o == null ? null : o;
    return function() {
      var or__3824__auto____6508 = cljs.core._hash[goog.typeOf(x__2376__auto____6507)];
      if(or__3824__auto____6508) {
        return or__3824__auto____6508
      }else {
        var or__3824__auto____6509 = cljs.core._hash["_"];
        if(or__3824__auto____6509) {
          return or__3824__auto____6509
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
    var and__3822__auto____6514 = o;
    if(and__3822__auto____6514) {
      return o.cljs$core$ISeqable$_seq$arity$1
    }else {
      return and__3822__auto____6514
    }
  }()) {
    return o.cljs$core$ISeqable$_seq$arity$1(o)
  }else {
    var x__2376__auto____6515 = o == null ? null : o;
    return function() {
      var or__3824__auto____6516 = cljs.core._seq[goog.typeOf(x__2376__auto____6515)];
      if(or__3824__auto____6516) {
        return or__3824__auto____6516
      }else {
        var or__3824__auto____6517 = cljs.core._seq["_"];
        if(or__3824__auto____6517) {
          return or__3824__auto____6517
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
    var and__3822__auto____6522 = coll;
    if(and__3822__auto____6522) {
      return coll.cljs$core$IReversible$_rseq$arity$1
    }else {
      return and__3822__auto____6522
    }
  }()) {
    return coll.cljs$core$IReversible$_rseq$arity$1(coll)
  }else {
    var x__2376__auto____6523 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6524 = cljs.core._rseq[goog.typeOf(x__2376__auto____6523)];
      if(or__3824__auto____6524) {
        return or__3824__auto____6524
      }else {
        var or__3824__auto____6525 = cljs.core._rseq["_"];
        if(or__3824__auto____6525) {
          return or__3824__auto____6525
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
    var and__3822__auto____6530 = coll;
    if(and__3822__auto____6530) {
      return coll.cljs$core$ISorted$_sorted_seq$arity$2
    }else {
      return and__3822__auto____6530
    }
  }()) {
    return coll.cljs$core$ISorted$_sorted_seq$arity$2(coll, ascending_QMARK_)
  }else {
    var x__2376__auto____6531 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6532 = cljs.core._sorted_seq[goog.typeOf(x__2376__auto____6531)];
      if(or__3824__auto____6532) {
        return or__3824__auto____6532
      }else {
        var or__3824__auto____6533 = cljs.core._sorted_seq["_"];
        if(or__3824__auto____6533) {
          return or__3824__auto____6533
        }else {
          throw cljs.core.missing_protocol.call(null, "ISorted.-sorted-seq", coll);
        }
      }
    }().call(null, coll, ascending_QMARK_)
  }
};
cljs.core._sorted_seq_from = function _sorted_seq_from(coll, k, ascending_QMARK_) {
  if(function() {
    var and__3822__auto____6538 = coll;
    if(and__3822__auto____6538) {
      return coll.cljs$core$ISorted$_sorted_seq_from$arity$3
    }else {
      return and__3822__auto____6538
    }
  }()) {
    return coll.cljs$core$ISorted$_sorted_seq_from$arity$3(coll, k, ascending_QMARK_)
  }else {
    var x__2376__auto____6539 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6540 = cljs.core._sorted_seq_from[goog.typeOf(x__2376__auto____6539)];
      if(or__3824__auto____6540) {
        return or__3824__auto____6540
      }else {
        var or__3824__auto____6541 = cljs.core._sorted_seq_from["_"];
        if(or__3824__auto____6541) {
          return or__3824__auto____6541
        }else {
          throw cljs.core.missing_protocol.call(null, "ISorted.-sorted-seq-from", coll);
        }
      }
    }().call(null, coll, k, ascending_QMARK_)
  }
};
cljs.core._entry_key = function _entry_key(coll, entry) {
  if(function() {
    var and__3822__auto____6546 = coll;
    if(and__3822__auto____6546) {
      return coll.cljs$core$ISorted$_entry_key$arity$2
    }else {
      return and__3822__auto____6546
    }
  }()) {
    return coll.cljs$core$ISorted$_entry_key$arity$2(coll, entry)
  }else {
    var x__2376__auto____6547 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6548 = cljs.core._entry_key[goog.typeOf(x__2376__auto____6547)];
      if(or__3824__auto____6548) {
        return or__3824__auto____6548
      }else {
        var or__3824__auto____6549 = cljs.core._entry_key["_"];
        if(or__3824__auto____6549) {
          return or__3824__auto____6549
        }else {
          throw cljs.core.missing_protocol.call(null, "ISorted.-entry-key", coll);
        }
      }
    }().call(null, coll, entry)
  }
};
cljs.core._comparator = function _comparator(coll) {
  if(function() {
    var and__3822__auto____6554 = coll;
    if(and__3822__auto____6554) {
      return coll.cljs$core$ISorted$_comparator$arity$1
    }else {
      return and__3822__auto____6554
    }
  }()) {
    return coll.cljs$core$ISorted$_comparator$arity$1(coll)
  }else {
    var x__2376__auto____6555 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6556 = cljs.core._comparator[goog.typeOf(x__2376__auto____6555)];
      if(or__3824__auto____6556) {
        return or__3824__auto____6556
      }else {
        var or__3824__auto____6557 = cljs.core._comparator["_"];
        if(or__3824__auto____6557) {
          return or__3824__auto____6557
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
    var and__3822__auto____6562 = o;
    if(and__3822__auto____6562) {
      return o.cljs$core$IPrintable$_pr_seq$arity$2
    }else {
      return and__3822__auto____6562
    }
  }()) {
    return o.cljs$core$IPrintable$_pr_seq$arity$2(o, opts)
  }else {
    var x__2376__auto____6563 = o == null ? null : o;
    return function() {
      var or__3824__auto____6564 = cljs.core._pr_seq[goog.typeOf(x__2376__auto____6563)];
      if(or__3824__auto____6564) {
        return or__3824__auto____6564
      }else {
        var or__3824__auto____6565 = cljs.core._pr_seq["_"];
        if(or__3824__auto____6565) {
          return or__3824__auto____6565
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
    var and__3822__auto____6570 = d;
    if(and__3822__auto____6570) {
      return d.cljs$core$IPending$_realized_QMARK_$arity$1
    }else {
      return and__3822__auto____6570
    }
  }()) {
    return d.cljs$core$IPending$_realized_QMARK_$arity$1(d)
  }else {
    var x__2376__auto____6571 = d == null ? null : d;
    return function() {
      var or__3824__auto____6572 = cljs.core._realized_QMARK_[goog.typeOf(x__2376__auto____6571)];
      if(or__3824__auto____6572) {
        return or__3824__auto____6572
      }else {
        var or__3824__auto____6573 = cljs.core._realized_QMARK_["_"];
        if(or__3824__auto____6573) {
          return or__3824__auto____6573
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
    var and__3822__auto____6578 = this$;
    if(and__3822__auto____6578) {
      return this$.cljs$core$IWatchable$_notify_watches$arity$3
    }else {
      return and__3822__auto____6578
    }
  }()) {
    return this$.cljs$core$IWatchable$_notify_watches$arity$3(this$, oldval, newval)
  }else {
    var x__2376__auto____6579 = this$ == null ? null : this$;
    return function() {
      var or__3824__auto____6580 = cljs.core._notify_watches[goog.typeOf(x__2376__auto____6579)];
      if(or__3824__auto____6580) {
        return or__3824__auto____6580
      }else {
        var or__3824__auto____6581 = cljs.core._notify_watches["_"];
        if(or__3824__auto____6581) {
          return or__3824__auto____6581
        }else {
          throw cljs.core.missing_protocol.call(null, "IWatchable.-notify-watches", this$);
        }
      }
    }().call(null, this$, oldval, newval)
  }
};
cljs.core._add_watch = function _add_watch(this$, key, f) {
  if(function() {
    var and__3822__auto____6586 = this$;
    if(and__3822__auto____6586) {
      return this$.cljs$core$IWatchable$_add_watch$arity$3
    }else {
      return and__3822__auto____6586
    }
  }()) {
    return this$.cljs$core$IWatchable$_add_watch$arity$3(this$, key, f)
  }else {
    var x__2376__auto____6587 = this$ == null ? null : this$;
    return function() {
      var or__3824__auto____6588 = cljs.core._add_watch[goog.typeOf(x__2376__auto____6587)];
      if(or__3824__auto____6588) {
        return or__3824__auto____6588
      }else {
        var or__3824__auto____6589 = cljs.core._add_watch["_"];
        if(or__3824__auto____6589) {
          return or__3824__auto____6589
        }else {
          throw cljs.core.missing_protocol.call(null, "IWatchable.-add-watch", this$);
        }
      }
    }().call(null, this$, key, f)
  }
};
cljs.core._remove_watch = function _remove_watch(this$, key) {
  if(function() {
    var and__3822__auto____6594 = this$;
    if(and__3822__auto____6594) {
      return this$.cljs$core$IWatchable$_remove_watch$arity$2
    }else {
      return and__3822__auto____6594
    }
  }()) {
    return this$.cljs$core$IWatchable$_remove_watch$arity$2(this$, key)
  }else {
    var x__2376__auto____6595 = this$ == null ? null : this$;
    return function() {
      var or__3824__auto____6596 = cljs.core._remove_watch[goog.typeOf(x__2376__auto____6595)];
      if(or__3824__auto____6596) {
        return or__3824__auto____6596
      }else {
        var or__3824__auto____6597 = cljs.core._remove_watch["_"];
        if(or__3824__auto____6597) {
          return or__3824__auto____6597
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
    var and__3822__auto____6602 = coll;
    if(and__3822__auto____6602) {
      return coll.cljs$core$IEditableCollection$_as_transient$arity$1
    }else {
      return and__3822__auto____6602
    }
  }()) {
    return coll.cljs$core$IEditableCollection$_as_transient$arity$1(coll)
  }else {
    var x__2376__auto____6603 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6604 = cljs.core._as_transient[goog.typeOf(x__2376__auto____6603)];
      if(or__3824__auto____6604) {
        return or__3824__auto____6604
      }else {
        var or__3824__auto____6605 = cljs.core._as_transient["_"];
        if(or__3824__auto____6605) {
          return or__3824__auto____6605
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
    var and__3822__auto____6610 = tcoll;
    if(and__3822__auto____6610) {
      return tcoll.cljs$core$ITransientCollection$_conj_BANG_$arity$2
    }else {
      return and__3822__auto____6610
    }
  }()) {
    return tcoll.cljs$core$ITransientCollection$_conj_BANG_$arity$2(tcoll, val)
  }else {
    var x__2376__auto____6611 = tcoll == null ? null : tcoll;
    return function() {
      var or__3824__auto____6612 = cljs.core._conj_BANG_[goog.typeOf(x__2376__auto____6611)];
      if(or__3824__auto____6612) {
        return or__3824__auto____6612
      }else {
        var or__3824__auto____6613 = cljs.core._conj_BANG_["_"];
        if(or__3824__auto____6613) {
          return or__3824__auto____6613
        }else {
          throw cljs.core.missing_protocol.call(null, "ITransientCollection.-conj!", tcoll);
        }
      }
    }().call(null, tcoll, val)
  }
};
cljs.core._persistent_BANG_ = function _persistent_BANG_(tcoll) {
  if(function() {
    var and__3822__auto____6618 = tcoll;
    if(and__3822__auto____6618) {
      return tcoll.cljs$core$ITransientCollection$_persistent_BANG_$arity$1
    }else {
      return and__3822__auto____6618
    }
  }()) {
    return tcoll.cljs$core$ITransientCollection$_persistent_BANG_$arity$1(tcoll)
  }else {
    var x__2376__auto____6619 = tcoll == null ? null : tcoll;
    return function() {
      var or__3824__auto____6620 = cljs.core._persistent_BANG_[goog.typeOf(x__2376__auto____6619)];
      if(or__3824__auto____6620) {
        return or__3824__auto____6620
      }else {
        var or__3824__auto____6621 = cljs.core._persistent_BANG_["_"];
        if(or__3824__auto____6621) {
          return or__3824__auto____6621
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
    var and__3822__auto____6626 = tcoll;
    if(and__3822__auto____6626) {
      return tcoll.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3
    }else {
      return and__3822__auto____6626
    }
  }()) {
    return tcoll.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3(tcoll, key, val)
  }else {
    var x__2376__auto____6627 = tcoll == null ? null : tcoll;
    return function() {
      var or__3824__auto____6628 = cljs.core._assoc_BANG_[goog.typeOf(x__2376__auto____6627)];
      if(or__3824__auto____6628) {
        return or__3824__auto____6628
      }else {
        var or__3824__auto____6629 = cljs.core._assoc_BANG_["_"];
        if(or__3824__auto____6629) {
          return or__3824__auto____6629
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
    var and__3822__auto____6634 = tcoll;
    if(and__3822__auto____6634) {
      return tcoll.cljs$core$ITransientMap$_dissoc_BANG_$arity$2
    }else {
      return and__3822__auto____6634
    }
  }()) {
    return tcoll.cljs$core$ITransientMap$_dissoc_BANG_$arity$2(tcoll, key)
  }else {
    var x__2376__auto____6635 = tcoll == null ? null : tcoll;
    return function() {
      var or__3824__auto____6636 = cljs.core._dissoc_BANG_[goog.typeOf(x__2376__auto____6635)];
      if(or__3824__auto____6636) {
        return or__3824__auto____6636
      }else {
        var or__3824__auto____6637 = cljs.core._dissoc_BANG_["_"];
        if(or__3824__auto____6637) {
          return or__3824__auto____6637
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
    var and__3822__auto____6642 = tcoll;
    if(and__3822__auto____6642) {
      return tcoll.cljs$core$ITransientVector$_assoc_n_BANG_$arity$3
    }else {
      return and__3822__auto____6642
    }
  }()) {
    return tcoll.cljs$core$ITransientVector$_assoc_n_BANG_$arity$3(tcoll, n, val)
  }else {
    var x__2376__auto____6643 = tcoll == null ? null : tcoll;
    return function() {
      var or__3824__auto____6644 = cljs.core._assoc_n_BANG_[goog.typeOf(x__2376__auto____6643)];
      if(or__3824__auto____6644) {
        return or__3824__auto____6644
      }else {
        var or__3824__auto____6645 = cljs.core._assoc_n_BANG_["_"];
        if(or__3824__auto____6645) {
          return or__3824__auto____6645
        }else {
          throw cljs.core.missing_protocol.call(null, "ITransientVector.-assoc-n!", tcoll);
        }
      }
    }().call(null, tcoll, n, val)
  }
};
cljs.core._pop_BANG_ = function _pop_BANG_(tcoll) {
  if(function() {
    var and__3822__auto____6650 = tcoll;
    if(and__3822__auto____6650) {
      return tcoll.cljs$core$ITransientVector$_pop_BANG_$arity$1
    }else {
      return and__3822__auto____6650
    }
  }()) {
    return tcoll.cljs$core$ITransientVector$_pop_BANG_$arity$1(tcoll)
  }else {
    var x__2376__auto____6651 = tcoll == null ? null : tcoll;
    return function() {
      var or__3824__auto____6652 = cljs.core._pop_BANG_[goog.typeOf(x__2376__auto____6651)];
      if(or__3824__auto____6652) {
        return or__3824__auto____6652
      }else {
        var or__3824__auto____6653 = cljs.core._pop_BANG_["_"];
        if(or__3824__auto____6653) {
          return or__3824__auto____6653
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
    var and__3822__auto____6658 = tcoll;
    if(and__3822__auto____6658) {
      return tcoll.cljs$core$ITransientSet$_disjoin_BANG_$arity$2
    }else {
      return and__3822__auto____6658
    }
  }()) {
    return tcoll.cljs$core$ITransientSet$_disjoin_BANG_$arity$2(tcoll, v)
  }else {
    var x__2376__auto____6659 = tcoll == null ? null : tcoll;
    return function() {
      var or__3824__auto____6660 = cljs.core._disjoin_BANG_[goog.typeOf(x__2376__auto____6659)];
      if(or__3824__auto____6660) {
        return or__3824__auto____6660
      }else {
        var or__3824__auto____6661 = cljs.core._disjoin_BANG_["_"];
        if(or__3824__auto____6661) {
          return or__3824__auto____6661
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
    var and__3822__auto____6666 = x;
    if(and__3822__auto____6666) {
      return x.cljs$core$IComparable$_compare$arity$2
    }else {
      return and__3822__auto____6666
    }
  }()) {
    return x.cljs$core$IComparable$_compare$arity$2(x, y)
  }else {
    var x__2376__auto____6667 = x == null ? null : x;
    return function() {
      var or__3824__auto____6668 = cljs.core._compare[goog.typeOf(x__2376__auto____6667)];
      if(or__3824__auto____6668) {
        return or__3824__auto____6668
      }else {
        var or__3824__auto____6669 = cljs.core._compare["_"];
        if(or__3824__auto____6669) {
          return or__3824__auto____6669
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
    var and__3822__auto____6674 = coll;
    if(and__3822__auto____6674) {
      return coll.cljs$core$IChunk$_drop_first$arity$1
    }else {
      return and__3822__auto____6674
    }
  }()) {
    return coll.cljs$core$IChunk$_drop_first$arity$1(coll)
  }else {
    var x__2376__auto____6675 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6676 = cljs.core._drop_first[goog.typeOf(x__2376__auto____6675)];
      if(or__3824__auto____6676) {
        return or__3824__auto____6676
      }else {
        var or__3824__auto____6677 = cljs.core._drop_first["_"];
        if(or__3824__auto____6677) {
          return or__3824__auto____6677
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
    var and__3822__auto____6682 = coll;
    if(and__3822__auto____6682) {
      return coll.cljs$core$IChunkedSeq$_chunked_first$arity$1
    }else {
      return and__3822__auto____6682
    }
  }()) {
    return coll.cljs$core$IChunkedSeq$_chunked_first$arity$1(coll)
  }else {
    var x__2376__auto____6683 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6684 = cljs.core._chunked_first[goog.typeOf(x__2376__auto____6683)];
      if(or__3824__auto____6684) {
        return or__3824__auto____6684
      }else {
        var or__3824__auto____6685 = cljs.core._chunked_first["_"];
        if(or__3824__auto____6685) {
          return or__3824__auto____6685
        }else {
          throw cljs.core.missing_protocol.call(null, "IChunkedSeq.-chunked-first", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core._chunked_rest = function _chunked_rest(coll) {
  if(function() {
    var and__3822__auto____6690 = coll;
    if(and__3822__auto____6690) {
      return coll.cljs$core$IChunkedSeq$_chunked_rest$arity$1
    }else {
      return and__3822__auto____6690
    }
  }()) {
    return coll.cljs$core$IChunkedSeq$_chunked_rest$arity$1(coll)
  }else {
    var x__2376__auto____6691 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6692 = cljs.core._chunked_rest[goog.typeOf(x__2376__auto____6691)];
      if(or__3824__auto____6692) {
        return or__3824__auto____6692
      }else {
        var or__3824__auto____6693 = cljs.core._chunked_rest["_"];
        if(or__3824__auto____6693) {
          return or__3824__auto____6693
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
    var and__3822__auto____6698 = coll;
    if(and__3822__auto____6698) {
      return coll.cljs$core$IChunkedNext$_chunked_next$arity$1
    }else {
      return and__3822__auto____6698
    }
  }()) {
    return coll.cljs$core$IChunkedNext$_chunked_next$arity$1(coll)
  }else {
    var x__2376__auto____6699 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6700 = cljs.core._chunked_next[goog.typeOf(x__2376__auto____6699)];
      if(or__3824__auto____6700) {
        return or__3824__auto____6700
      }else {
        var or__3824__auto____6701 = cljs.core._chunked_next["_"];
        if(or__3824__auto____6701) {
          return or__3824__auto____6701
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
    var or__3824__auto____6703 = x === y;
    if(or__3824__auto____6703) {
      return or__3824__auto____6703
    }else {
      return cljs.core._equiv.call(null, x, y)
    }
  };
  var _EQ___3 = function() {
    var G__6704__delegate = function(x, y, more) {
      while(true) {
        if(cljs.core.truth_(_EQ_.call(null, x, y))) {
          if(cljs.core.next.call(null, more)) {
            var G__6705 = y;
            var G__6706 = cljs.core.first.call(null, more);
            var G__6707 = cljs.core.next.call(null, more);
            x = G__6705;
            y = G__6706;
            more = G__6707;
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
    var G__6704 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__6704__delegate.call(this, x, y, more)
    };
    G__6704.cljs$lang$maxFixedArity = 2;
    G__6704.cljs$lang$applyTo = function(arglist__6708) {
      var x = cljs.core.first(arglist__6708);
      var y = cljs.core.first(cljs.core.next(arglist__6708));
      var more = cljs.core.rest(cljs.core.next(arglist__6708));
      return G__6704__delegate(x, y, more)
    };
    G__6704.cljs$lang$arity$variadic = G__6704__delegate;
    return G__6704
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
  var G__6709 = null;
  var G__6709__2 = function(o, k) {
    return null
  };
  var G__6709__3 = function(o, k, not_found) {
    return not_found
  };
  G__6709 = function(o, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__6709__2.call(this, o, k);
      case 3:
        return G__6709__3.call(this, o, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__6709
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
  var G__6710 = null;
  var G__6710__2 = function(_, f) {
    return f.call(null)
  };
  var G__6710__3 = function(_, f, start) {
    return start
  };
  G__6710 = function(_, f, start) {
    switch(arguments.length) {
      case 2:
        return G__6710__2.call(this, _, f);
      case 3:
        return G__6710__3.call(this, _, f, start)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__6710
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
  var G__6711 = null;
  var G__6711__2 = function(_, n) {
    return null
  };
  var G__6711__3 = function(_, n, not_found) {
    return not_found
  };
  G__6711 = function(_, n, not_found) {
    switch(arguments.length) {
      case 2:
        return G__6711__2.call(this, _, n);
      case 3:
        return G__6711__3.call(this, _, n, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__6711
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
  var and__3822__auto____6712 = cljs.core.instance_QMARK_.call(null, Date, other);
  if(and__3822__auto____6712) {
    return o.toString() === other.toString()
  }else {
    return and__3822__auto____6712
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
    var cnt__6725 = cljs.core._count.call(null, cicoll);
    if(cnt__6725 === 0) {
      return f.call(null)
    }else {
      var val__6726 = cljs.core._nth.call(null, cicoll, 0);
      var n__6727 = 1;
      while(true) {
        if(n__6727 < cnt__6725) {
          var nval__6728 = f.call(null, val__6726, cljs.core._nth.call(null, cicoll, n__6727));
          if(cljs.core.reduced_QMARK_.call(null, nval__6728)) {
            return cljs.core.deref.call(null, nval__6728)
          }else {
            var G__6737 = nval__6728;
            var G__6738 = n__6727 + 1;
            val__6726 = G__6737;
            n__6727 = G__6738;
            continue
          }
        }else {
          return val__6726
        }
        break
      }
    }
  };
  var ci_reduce__3 = function(cicoll, f, val) {
    var cnt__6729 = cljs.core._count.call(null, cicoll);
    var val__6730 = val;
    var n__6731 = 0;
    while(true) {
      if(n__6731 < cnt__6729) {
        var nval__6732 = f.call(null, val__6730, cljs.core._nth.call(null, cicoll, n__6731));
        if(cljs.core.reduced_QMARK_.call(null, nval__6732)) {
          return cljs.core.deref.call(null, nval__6732)
        }else {
          var G__6739 = nval__6732;
          var G__6740 = n__6731 + 1;
          val__6730 = G__6739;
          n__6731 = G__6740;
          continue
        }
      }else {
        return val__6730
      }
      break
    }
  };
  var ci_reduce__4 = function(cicoll, f, val, idx) {
    var cnt__6733 = cljs.core._count.call(null, cicoll);
    var val__6734 = val;
    var n__6735 = idx;
    while(true) {
      if(n__6735 < cnt__6733) {
        var nval__6736 = f.call(null, val__6734, cljs.core._nth.call(null, cicoll, n__6735));
        if(cljs.core.reduced_QMARK_.call(null, nval__6736)) {
          return cljs.core.deref.call(null, nval__6736)
        }else {
          var G__6741 = nval__6736;
          var G__6742 = n__6735 + 1;
          val__6734 = G__6741;
          n__6735 = G__6742;
          continue
        }
      }else {
        return val__6734
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
    var cnt__6755 = arr.length;
    if(arr.length === 0) {
      return f.call(null)
    }else {
      var val__6756 = arr[0];
      var n__6757 = 1;
      while(true) {
        if(n__6757 < cnt__6755) {
          var nval__6758 = f.call(null, val__6756, arr[n__6757]);
          if(cljs.core.reduced_QMARK_.call(null, nval__6758)) {
            return cljs.core.deref.call(null, nval__6758)
          }else {
            var G__6767 = nval__6758;
            var G__6768 = n__6757 + 1;
            val__6756 = G__6767;
            n__6757 = G__6768;
            continue
          }
        }else {
          return val__6756
        }
        break
      }
    }
  };
  var array_reduce__3 = function(arr, f, val) {
    var cnt__6759 = arr.length;
    var val__6760 = val;
    var n__6761 = 0;
    while(true) {
      if(n__6761 < cnt__6759) {
        var nval__6762 = f.call(null, val__6760, arr[n__6761]);
        if(cljs.core.reduced_QMARK_.call(null, nval__6762)) {
          return cljs.core.deref.call(null, nval__6762)
        }else {
          var G__6769 = nval__6762;
          var G__6770 = n__6761 + 1;
          val__6760 = G__6769;
          n__6761 = G__6770;
          continue
        }
      }else {
        return val__6760
      }
      break
    }
  };
  var array_reduce__4 = function(arr, f, val, idx) {
    var cnt__6763 = arr.length;
    var val__6764 = val;
    var n__6765 = idx;
    while(true) {
      if(n__6765 < cnt__6763) {
        var nval__6766 = f.call(null, val__6764, arr[n__6765]);
        if(cljs.core.reduced_QMARK_.call(null, nval__6766)) {
          return cljs.core.deref.call(null, nval__6766)
        }else {
          var G__6771 = nval__6766;
          var G__6772 = n__6765 + 1;
          val__6764 = G__6771;
          n__6765 = G__6772;
          continue
        }
      }else {
        return val__6764
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
cljs.core.IndexedSeq.cljs$lang$ctorPrSeq = function(this__2322__auto__) {
  return cljs.core.list.call(null, "cljs.core/IndexedSeq")
};
cljs.core.IndexedSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__6773 = this;
  return cljs.core.hash_coll.call(null, coll)
};
cljs.core.IndexedSeq.prototype.cljs$core$INext$_next$arity$1 = function(_) {
  var this__6774 = this;
  if(this__6774.i + 1 < this__6774.a.length) {
    return new cljs.core.IndexedSeq(this__6774.a, this__6774.i + 1)
  }else {
    return null
  }
};
cljs.core.IndexedSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__6775 = this;
  return cljs.core.cons.call(null, o, coll)
};
cljs.core.IndexedSeq.prototype.cljs$core$IReversible$_rseq$arity$1 = function(coll) {
  var this__6776 = this;
  var c__6777 = coll.cljs$core$ICounted$_count$arity$1(coll);
  if(c__6777 > 0) {
    return new cljs.core.RSeq(coll, c__6777 - 1, null)
  }else {
    return cljs.core.List.EMPTY
  }
};
cljs.core.IndexedSeq.prototype.toString = function() {
  var this__6778 = this;
  var this__6779 = this;
  return cljs.core.pr_str.call(null, this__6779)
};
cljs.core.IndexedSeq.prototype.cljs$core$IReduce$_reduce$arity$2 = function(coll, f) {
  var this__6780 = this;
  if(cljs.core.counted_QMARK_.call(null, this__6780.a)) {
    return cljs.core.ci_reduce.call(null, this__6780.a, f, this__6780.a[this__6780.i], this__6780.i + 1)
  }else {
    return cljs.core.ci_reduce.call(null, coll, f, this__6780.a[this__6780.i], 0)
  }
};
cljs.core.IndexedSeq.prototype.cljs$core$IReduce$_reduce$arity$3 = function(coll, f, start) {
  var this__6781 = this;
  if(cljs.core.counted_QMARK_.call(null, this__6781.a)) {
    return cljs.core.ci_reduce.call(null, this__6781.a, f, start, this__6781.i)
  }else {
    return cljs.core.ci_reduce.call(null, coll, f, start, 0)
  }
};
cljs.core.IndexedSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(this$) {
  var this__6782 = this;
  return this$
};
cljs.core.IndexedSeq.prototype.cljs$core$ICounted$_count$arity$1 = function(_) {
  var this__6783 = this;
  return this__6783.a.length - this__6783.i
};
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$_first$arity$1 = function(_) {
  var this__6784 = this;
  return this__6784.a[this__6784.i]
};
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(_) {
  var this__6785 = this;
  if(this__6785.i + 1 < this__6785.a.length) {
    return new cljs.core.IndexedSeq(this__6785.a, this__6785.i + 1)
  }else {
    return cljs.core.list.call(null)
  }
};
cljs.core.IndexedSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__6786 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.IndexedSeq.prototype.cljs$core$IIndexed$_nth$arity$2 = function(coll, n) {
  var this__6787 = this;
  var i__6788 = n + this__6787.i;
  if(i__6788 < this__6787.a.length) {
    return this__6787.a[i__6788]
  }else {
    return null
  }
};
cljs.core.IndexedSeq.prototype.cljs$core$IIndexed$_nth$arity$3 = function(coll, n, not_found) {
  var this__6789 = this;
  var i__6790 = n + this__6789.i;
  if(i__6790 < this__6789.a.length) {
    return this__6789.a[i__6790]
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
  var G__6791 = null;
  var G__6791__2 = function(array, f) {
    return cljs.core.ci_reduce.call(null, array, f)
  };
  var G__6791__3 = function(array, f, start) {
    return cljs.core.ci_reduce.call(null, array, f, start)
  };
  G__6791 = function(array, f, start) {
    switch(arguments.length) {
      case 2:
        return G__6791__2.call(this, array, f);
      case 3:
        return G__6791__3.call(this, array, f, start)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__6791
}();
cljs.core.ILookup["array"] = true;
cljs.core._lookup["array"] = function() {
  var G__6792 = null;
  var G__6792__2 = function(array, k) {
    return array[k]
  };
  var G__6792__3 = function(array, k, not_found) {
    return cljs.core._nth.call(null, array, k, not_found)
  };
  G__6792 = function(array, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__6792__2.call(this, array, k);
      case 3:
        return G__6792__3.call(this, array, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__6792
}();
cljs.core.IIndexed["array"] = true;
cljs.core._nth["array"] = function() {
  var G__6793 = null;
  var G__6793__2 = function(array, n) {
    if(n < array.length) {
      return array[n]
    }else {
      return null
    }
  };
  var G__6793__3 = function(array, n, not_found) {
    if(n < array.length) {
      return array[n]
    }else {
      return not_found
    }
  };
  G__6793 = function(array, n, not_found) {
    switch(arguments.length) {
      case 2:
        return G__6793__2.call(this, array, n);
      case 3:
        return G__6793__3.call(this, array, n, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__6793
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
cljs.core.RSeq.cljs$lang$ctorPrSeq = function(this__2322__auto__) {
  return cljs.core.list.call(null, "cljs.core/RSeq")
};
cljs.core.RSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__6794 = this;
  return cljs.core.hash_coll.call(null, coll)
};
cljs.core.RSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__6795 = this;
  return cljs.core.cons.call(null, o, coll)
};
cljs.core.RSeq.prototype.toString = function() {
  var this__6796 = this;
  var this__6797 = this;
  return cljs.core.pr_str.call(null, this__6797)
};
cljs.core.RSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__6798 = this;
  return coll
};
cljs.core.RSeq.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__6799 = this;
  return this__6799.i + 1
};
cljs.core.RSeq.prototype.cljs$core$ISeq$_first$arity$1 = function(coll) {
  var this__6800 = this;
  return cljs.core._nth.call(null, this__6800.ci, this__6800.i)
};
cljs.core.RSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(coll) {
  var this__6801 = this;
  if(this__6801.i > 0) {
    return new cljs.core.RSeq(this__6801.ci, this__6801.i - 1, null)
  }else {
    return cljs.core.List.EMPTY
  }
};
cljs.core.RSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__6802 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.RSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, new_meta) {
  var this__6803 = this;
  return new cljs.core.RSeq(this__6803.ci, this__6803.i, new_meta)
};
cljs.core.RSeq.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__6804 = this;
  return this__6804.meta
};
cljs.core.RSeq;
cljs.core.seq = function seq(coll) {
  if(coll == null) {
    return null
  }else {
    if(function() {
      var G__6808__6809 = coll;
      if(G__6808__6809) {
        if(function() {
          var or__3824__auto____6810 = G__6808__6809.cljs$lang$protocol_mask$partition0$ & 32;
          if(or__3824__auto____6810) {
            return or__3824__auto____6810
          }else {
            return G__6808__6809.cljs$core$ASeq$
          }
        }()) {
          return true
        }else {
          if(!G__6808__6809.cljs$lang$protocol_mask$partition0$) {
            return cljs.core.type_satisfies_.call(null, cljs.core.ASeq, G__6808__6809)
          }else {
            return false
          }
        }
      }else {
        return cljs.core.type_satisfies_.call(null, cljs.core.ASeq, G__6808__6809)
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
      var G__6815__6816 = coll;
      if(G__6815__6816) {
        if(function() {
          var or__3824__auto____6817 = G__6815__6816.cljs$lang$protocol_mask$partition0$ & 64;
          if(or__3824__auto____6817) {
            return or__3824__auto____6817
          }else {
            return G__6815__6816.cljs$core$ISeq$
          }
        }()) {
          return true
        }else {
          if(!G__6815__6816.cljs$lang$protocol_mask$partition0$) {
            return cljs.core.type_satisfies_.call(null, cljs.core.ISeq, G__6815__6816)
          }else {
            return false
          }
        }
      }else {
        return cljs.core.type_satisfies_.call(null, cljs.core.ISeq, G__6815__6816)
      }
    }()) {
      return cljs.core._first.call(null, coll)
    }else {
      var s__6818 = cljs.core.seq.call(null, coll);
      if(s__6818 == null) {
        return null
      }else {
        return cljs.core._first.call(null, s__6818)
      }
    }
  }
};
cljs.core.rest = function rest(coll) {
  if(!(coll == null)) {
    if(function() {
      var G__6823__6824 = coll;
      if(G__6823__6824) {
        if(function() {
          var or__3824__auto____6825 = G__6823__6824.cljs$lang$protocol_mask$partition0$ & 64;
          if(or__3824__auto____6825) {
            return or__3824__auto____6825
          }else {
            return G__6823__6824.cljs$core$ISeq$
          }
        }()) {
          return true
        }else {
          if(!G__6823__6824.cljs$lang$protocol_mask$partition0$) {
            return cljs.core.type_satisfies_.call(null, cljs.core.ISeq, G__6823__6824)
          }else {
            return false
          }
        }
      }else {
        return cljs.core.type_satisfies_.call(null, cljs.core.ISeq, G__6823__6824)
      }
    }()) {
      return cljs.core._rest.call(null, coll)
    }else {
      var s__6826 = cljs.core.seq.call(null, coll);
      if(!(s__6826 == null)) {
        return cljs.core._rest.call(null, s__6826)
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
      var G__6830__6831 = coll;
      if(G__6830__6831) {
        if(function() {
          var or__3824__auto____6832 = G__6830__6831.cljs$lang$protocol_mask$partition0$ & 128;
          if(or__3824__auto____6832) {
            return or__3824__auto____6832
          }else {
            return G__6830__6831.cljs$core$INext$
          }
        }()) {
          return true
        }else {
          if(!G__6830__6831.cljs$lang$protocol_mask$partition0$) {
            return cljs.core.type_satisfies_.call(null, cljs.core.INext, G__6830__6831)
          }else {
            return false
          }
        }
      }else {
        return cljs.core.type_satisfies_.call(null, cljs.core.INext, G__6830__6831)
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
    var sn__6834 = cljs.core.next.call(null, s);
    if(!(sn__6834 == null)) {
      var G__6835 = sn__6834;
      s = G__6835;
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
    var G__6836__delegate = function(coll, x, xs) {
      while(true) {
        if(cljs.core.truth_(xs)) {
          var G__6837 = conj.call(null, coll, x);
          var G__6838 = cljs.core.first.call(null, xs);
          var G__6839 = cljs.core.next.call(null, xs);
          coll = G__6837;
          x = G__6838;
          xs = G__6839;
          continue
        }else {
          return conj.call(null, coll, x)
        }
        break
      }
    };
    var G__6836 = function(coll, x, var_args) {
      var xs = null;
      if(goog.isDef(var_args)) {
        xs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__6836__delegate.call(this, coll, x, xs)
    };
    G__6836.cljs$lang$maxFixedArity = 2;
    G__6836.cljs$lang$applyTo = function(arglist__6840) {
      var coll = cljs.core.first(arglist__6840);
      var x = cljs.core.first(cljs.core.next(arglist__6840));
      var xs = cljs.core.rest(cljs.core.next(arglist__6840));
      return G__6836__delegate(coll, x, xs)
    };
    G__6836.cljs$lang$arity$variadic = G__6836__delegate;
    return G__6836
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
  var s__6843 = cljs.core.seq.call(null, coll);
  var acc__6844 = 0;
  while(true) {
    if(cljs.core.counted_QMARK_.call(null, s__6843)) {
      return acc__6844 + cljs.core._count.call(null, s__6843)
    }else {
      var G__6845 = cljs.core.next.call(null, s__6843);
      var G__6846 = acc__6844 + 1;
      s__6843 = G__6845;
      acc__6844 = G__6846;
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
        var G__6853__6854 = coll;
        if(G__6853__6854) {
          if(function() {
            var or__3824__auto____6855 = G__6853__6854.cljs$lang$protocol_mask$partition0$ & 16;
            if(or__3824__auto____6855) {
              return or__3824__auto____6855
            }else {
              return G__6853__6854.cljs$core$IIndexed$
            }
          }()) {
            return true
          }else {
            if(!G__6853__6854.cljs$lang$protocol_mask$partition0$) {
              return cljs.core.type_satisfies_.call(null, cljs.core.IIndexed, G__6853__6854)
            }else {
              return false
            }
          }
        }else {
          return cljs.core.type_satisfies_.call(null, cljs.core.IIndexed, G__6853__6854)
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
        var G__6856__6857 = coll;
        if(G__6856__6857) {
          if(function() {
            var or__3824__auto____6858 = G__6856__6857.cljs$lang$protocol_mask$partition0$ & 16;
            if(or__3824__auto____6858) {
              return or__3824__auto____6858
            }else {
              return G__6856__6857.cljs$core$IIndexed$
            }
          }()) {
            return true
          }else {
            if(!G__6856__6857.cljs$lang$protocol_mask$partition0$) {
              return cljs.core.type_satisfies_.call(null, cljs.core.IIndexed, G__6856__6857)
            }else {
              return false
            }
          }
        }else {
          return cljs.core.type_satisfies_.call(null, cljs.core.IIndexed, G__6856__6857)
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
    var G__6861__delegate = function(coll, k, v, kvs) {
      while(true) {
        var ret__6860 = assoc.call(null, coll, k, v);
        if(cljs.core.truth_(kvs)) {
          var G__6862 = ret__6860;
          var G__6863 = cljs.core.first.call(null, kvs);
          var G__6864 = cljs.core.second.call(null, kvs);
          var G__6865 = cljs.core.nnext.call(null, kvs);
          coll = G__6862;
          k = G__6863;
          v = G__6864;
          kvs = G__6865;
          continue
        }else {
          return ret__6860
        }
        break
      }
    };
    var G__6861 = function(coll, k, v, var_args) {
      var kvs = null;
      if(goog.isDef(var_args)) {
        kvs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
      }
      return G__6861__delegate.call(this, coll, k, v, kvs)
    };
    G__6861.cljs$lang$maxFixedArity = 3;
    G__6861.cljs$lang$applyTo = function(arglist__6866) {
      var coll = cljs.core.first(arglist__6866);
      var k = cljs.core.first(cljs.core.next(arglist__6866));
      var v = cljs.core.first(cljs.core.next(cljs.core.next(arglist__6866)));
      var kvs = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__6866)));
      return G__6861__delegate(coll, k, v, kvs)
    };
    G__6861.cljs$lang$arity$variadic = G__6861__delegate;
    return G__6861
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
    var G__6869__delegate = function(coll, k, ks) {
      while(true) {
        var ret__6868 = dissoc.call(null, coll, k);
        if(cljs.core.truth_(ks)) {
          var G__6870 = ret__6868;
          var G__6871 = cljs.core.first.call(null, ks);
          var G__6872 = cljs.core.next.call(null, ks);
          coll = G__6870;
          k = G__6871;
          ks = G__6872;
          continue
        }else {
          return ret__6868
        }
        break
      }
    };
    var G__6869 = function(coll, k, var_args) {
      var ks = null;
      if(goog.isDef(var_args)) {
        ks = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__6869__delegate.call(this, coll, k, ks)
    };
    G__6869.cljs$lang$maxFixedArity = 2;
    G__6869.cljs$lang$applyTo = function(arglist__6873) {
      var coll = cljs.core.first(arglist__6873);
      var k = cljs.core.first(cljs.core.next(arglist__6873));
      var ks = cljs.core.rest(cljs.core.next(arglist__6873));
      return G__6869__delegate(coll, k, ks)
    };
    G__6869.cljs$lang$arity$variadic = G__6869__delegate;
    return G__6869
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
    var G__6877__6878 = o;
    if(G__6877__6878) {
      if(function() {
        var or__3824__auto____6879 = G__6877__6878.cljs$lang$protocol_mask$partition0$ & 131072;
        if(or__3824__auto____6879) {
          return or__3824__auto____6879
        }else {
          return G__6877__6878.cljs$core$IMeta$
        }
      }()) {
        return true
      }else {
        if(!G__6877__6878.cljs$lang$protocol_mask$partition0$) {
          return cljs.core.type_satisfies_.call(null, cljs.core.IMeta, G__6877__6878)
        }else {
          return false
        }
      }
    }else {
      return cljs.core.type_satisfies_.call(null, cljs.core.IMeta, G__6877__6878)
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
    var G__6882__delegate = function(coll, k, ks) {
      while(true) {
        var ret__6881 = disj.call(null, coll, k);
        if(cljs.core.truth_(ks)) {
          var G__6883 = ret__6881;
          var G__6884 = cljs.core.first.call(null, ks);
          var G__6885 = cljs.core.next.call(null, ks);
          coll = G__6883;
          k = G__6884;
          ks = G__6885;
          continue
        }else {
          return ret__6881
        }
        break
      }
    };
    var G__6882 = function(coll, k, var_args) {
      var ks = null;
      if(goog.isDef(var_args)) {
        ks = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__6882__delegate.call(this, coll, k, ks)
    };
    G__6882.cljs$lang$maxFixedArity = 2;
    G__6882.cljs$lang$applyTo = function(arglist__6886) {
      var coll = cljs.core.first(arglist__6886);
      var k = cljs.core.first(cljs.core.next(arglist__6886));
      var ks = cljs.core.rest(cljs.core.next(arglist__6886));
      return G__6882__delegate(coll, k, ks)
    };
    G__6882.cljs$lang$arity$variadic = G__6882__delegate;
    return G__6882
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
  var h__6888 = goog.string.hashCode(k);
  cljs.core.string_hash_cache[k] = h__6888;
  cljs.core.string_hash_cache_count = cljs.core.string_hash_cache_count + 1;
  return h__6888
};
cljs.core.check_string_hash_cache = function check_string_hash_cache(k) {
  if(cljs.core.string_hash_cache_count > 255) {
    cljs.core.string_hash_cache = {};
    cljs.core.string_hash_cache_count = 0
  }else {
  }
  var h__6890 = cljs.core.string_hash_cache[k];
  if(!(h__6890 == null)) {
    return h__6890
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
      var and__3822__auto____6892 = goog.isString(o);
      if(and__3822__auto____6892) {
        return check_cache
      }else {
        return and__3822__auto____6892
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
    var G__6896__6897 = x;
    if(G__6896__6897) {
      if(function() {
        var or__3824__auto____6898 = G__6896__6897.cljs$lang$protocol_mask$partition0$ & 8;
        if(or__3824__auto____6898) {
          return or__3824__auto____6898
        }else {
          return G__6896__6897.cljs$core$ICollection$
        }
      }()) {
        return true
      }else {
        if(!G__6896__6897.cljs$lang$protocol_mask$partition0$) {
          return cljs.core.type_satisfies_.call(null, cljs.core.ICollection, G__6896__6897)
        }else {
          return false
        }
      }
    }else {
      return cljs.core.type_satisfies_.call(null, cljs.core.ICollection, G__6896__6897)
    }
  }
};
cljs.core.set_QMARK_ = function set_QMARK_(x) {
  if(x == null) {
    return false
  }else {
    var G__6902__6903 = x;
    if(G__6902__6903) {
      if(function() {
        var or__3824__auto____6904 = G__6902__6903.cljs$lang$protocol_mask$partition0$ & 4096;
        if(or__3824__auto____6904) {
          return or__3824__auto____6904
        }else {
          return G__6902__6903.cljs$core$ISet$
        }
      }()) {
        return true
      }else {
        if(!G__6902__6903.cljs$lang$protocol_mask$partition0$) {
          return cljs.core.type_satisfies_.call(null, cljs.core.ISet, G__6902__6903)
        }else {
          return false
        }
      }
    }else {
      return cljs.core.type_satisfies_.call(null, cljs.core.ISet, G__6902__6903)
    }
  }
};
cljs.core.associative_QMARK_ = function associative_QMARK_(x) {
  var G__6908__6909 = x;
  if(G__6908__6909) {
    if(function() {
      var or__3824__auto____6910 = G__6908__6909.cljs$lang$protocol_mask$partition0$ & 512;
      if(or__3824__auto____6910) {
        return or__3824__auto____6910
      }else {
        return G__6908__6909.cljs$core$IAssociative$
      }
    }()) {
      return true
    }else {
      if(!G__6908__6909.cljs$lang$protocol_mask$partition0$) {
        return cljs.core.type_satisfies_.call(null, cljs.core.IAssociative, G__6908__6909)
      }else {
        return false
      }
    }
  }else {
    return cljs.core.type_satisfies_.call(null, cljs.core.IAssociative, G__6908__6909)
  }
};
cljs.core.sequential_QMARK_ = function sequential_QMARK_(x) {
  var G__6914__6915 = x;
  if(G__6914__6915) {
    if(function() {
      var or__3824__auto____6916 = G__6914__6915.cljs$lang$protocol_mask$partition0$ & 16777216;
      if(or__3824__auto____6916) {
        return or__3824__auto____6916
      }else {
        return G__6914__6915.cljs$core$ISequential$
      }
    }()) {
      return true
    }else {
      if(!G__6914__6915.cljs$lang$protocol_mask$partition0$) {
        return cljs.core.type_satisfies_.call(null, cljs.core.ISequential, G__6914__6915)
      }else {
        return false
      }
    }
  }else {
    return cljs.core.type_satisfies_.call(null, cljs.core.ISequential, G__6914__6915)
  }
};
cljs.core.counted_QMARK_ = function counted_QMARK_(x) {
  var G__6920__6921 = x;
  if(G__6920__6921) {
    if(function() {
      var or__3824__auto____6922 = G__6920__6921.cljs$lang$protocol_mask$partition0$ & 2;
      if(or__3824__auto____6922) {
        return or__3824__auto____6922
      }else {
        return G__6920__6921.cljs$core$ICounted$
      }
    }()) {
      return true
    }else {
      if(!G__6920__6921.cljs$lang$protocol_mask$partition0$) {
        return cljs.core.type_satisfies_.call(null, cljs.core.ICounted, G__6920__6921)
      }else {
        return false
      }
    }
  }else {
    return cljs.core.type_satisfies_.call(null, cljs.core.ICounted, G__6920__6921)
  }
};
cljs.core.indexed_QMARK_ = function indexed_QMARK_(x) {
  var G__6926__6927 = x;
  if(G__6926__6927) {
    if(function() {
      var or__3824__auto____6928 = G__6926__6927.cljs$lang$protocol_mask$partition0$ & 16;
      if(or__3824__auto____6928) {
        return or__3824__auto____6928
      }else {
        return G__6926__6927.cljs$core$IIndexed$
      }
    }()) {
      return true
    }else {
      if(!G__6926__6927.cljs$lang$protocol_mask$partition0$) {
        return cljs.core.type_satisfies_.call(null, cljs.core.IIndexed, G__6926__6927)
      }else {
        return false
      }
    }
  }else {
    return cljs.core.type_satisfies_.call(null, cljs.core.IIndexed, G__6926__6927)
  }
};
cljs.core.reduceable_QMARK_ = function reduceable_QMARK_(x) {
  var G__6932__6933 = x;
  if(G__6932__6933) {
    if(function() {
      var or__3824__auto____6934 = G__6932__6933.cljs$lang$protocol_mask$partition0$ & 524288;
      if(or__3824__auto____6934) {
        return or__3824__auto____6934
      }else {
        return G__6932__6933.cljs$core$IReduce$
      }
    }()) {
      return true
    }else {
      if(!G__6932__6933.cljs$lang$protocol_mask$partition0$) {
        return cljs.core.type_satisfies_.call(null, cljs.core.IReduce, G__6932__6933)
      }else {
        return false
      }
    }
  }else {
    return cljs.core.type_satisfies_.call(null, cljs.core.IReduce, G__6932__6933)
  }
};
cljs.core.map_QMARK_ = function map_QMARK_(x) {
  if(x == null) {
    return false
  }else {
    var G__6938__6939 = x;
    if(G__6938__6939) {
      if(function() {
        var or__3824__auto____6940 = G__6938__6939.cljs$lang$protocol_mask$partition0$ & 1024;
        if(or__3824__auto____6940) {
          return or__3824__auto____6940
        }else {
          return G__6938__6939.cljs$core$IMap$
        }
      }()) {
        return true
      }else {
        if(!G__6938__6939.cljs$lang$protocol_mask$partition0$) {
          return cljs.core.type_satisfies_.call(null, cljs.core.IMap, G__6938__6939)
        }else {
          return false
        }
      }
    }else {
      return cljs.core.type_satisfies_.call(null, cljs.core.IMap, G__6938__6939)
    }
  }
};
cljs.core.vector_QMARK_ = function vector_QMARK_(x) {
  var G__6944__6945 = x;
  if(G__6944__6945) {
    if(function() {
      var or__3824__auto____6946 = G__6944__6945.cljs$lang$protocol_mask$partition0$ & 16384;
      if(or__3824__auto____6946) {
        return or__3824__auto____6946
      }else {
        return G__6944__6945.cljs$core$IVector$
      }
    }()) {
      return true
    }else {
      if(!G__6944__6945.cljs$lang$protocol_mask$partition0$) {
        return cljs.core.type_satisfies_.call(null, cljs.core.IVector, G__6944__6945)
      }else {
        return false
      }
    }
  }else {
    return cljs.core.type_satisfies_.call(null, cljs.core.IVector, G__6944__6945)
  }
};
cljs.core.chunked_seq_QMARK_ = function chunked_seq_QMARK_(x) {
  var G__6950__6951 = x;
  if(G__6950__6951) {
    if(cljs.core.truth_(function() {
      var or__3824__auto____6952 = null;
      if(cljs.core.truth_(or__3824__auto____6952)) {
        return or__3824__auto____6952
      }else {
        return G__6950__6951.cljs$core$IChunkedSeq$
      }
    }())) {
      return true
    }else {
      if(!G__6950__6951.cljs$lang$protocol_mask$partition$) {
        return cljs.core.type_satisfies_.call(null, cljs.core.IChunkedSeq, G__6950__6951)
      }else {
        return false
      }
    }
  }else {
    return cljs.core.type_satisfies_.call(null, cljs.core.IChunkedSeq, G__6950__6951)
  }
};
cljs.core.js_obj = function() {
  var js_obj = null;
  var js_obj__0 = function() {
    return{}
  };
  var js_obj__1 = function() {
    var G__6953__delegate = function(keyvals) {
      return cljs.core.apply.call(null, goog.object.create, keyvals)
    };
    var G__6953 = function(var_args) {
      var keyvals = null;
      if(goog.isDef(var_args)) {
        keyvals = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
      }
      return G__6953__delegate.call(this, keyvals)
    };
    G__6953.cljs$lang$maxFixedArity = 0;
    G__6953.cljs$lang$applyTo = function(arglist__6954) {
      var keyvals = cljs.core.seq(arglist__6954);
      return G__6953__delegate(keyvals)
    };
    G__6953.cljs$lang$arity$variadic = G__6953__delegate;
    return G__6953
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
  var keys__6956 = [];
  goog.object.forEach(obj, function(val, key, obj) {
    return keys__6956.push(key)
  });
  return keys__6956
};
cljs.core.js_delete = function js_delete(obj, key) {
  return delete obj[key]
};
cljs.core.array_copy = function array_copy(from, i, to, j, len) {
  var i__6960 = i;
  var j__6961 = j;
  var len__6962 = len;
  while(true) {
    if(len__6962 === 0) {
      return to
    }else {
      to[j__6961] = from[i__6960];
      var G__6963 = i__6960 + 1;
      var G__6964 = j__6961 + 1;
      var G__6965 = len__6962 - 1;
      i__6960 = G__6963;
      j__6961 = G__6964;
      len__6962 = G__6965;
      continue
    }
    break
  }
};
cljs.core.array_copy_downward = function array_copy_downward(from, i, to, j, len) {
  var i__6969 = i + (len - 1);
  var j__6970 = j + (len - 1);
  var len__6971 = len;
  while(true) {
    if(len__6971 === 0) {
      return to
    }else {
      to[j__6970] = from[i__6969];
      var G__6972 = i__6969 - 1;
      var G__6973 = j__6970 - 1;
      var G__6974 = len__6971 - 1;
      i__6969 = G__6972;
      j__6970 = G__6973;
      len__6971 = G__6974;
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
    var G__6978__6979 = s;
    if(G__6978__6979) {
      if(function() {
        var or__3824__auto____6980 = G__6978__6979.cljs$lang$protocol_mask$partition0$ & 64;
        if(or__3824__auto____6980) {
          return or__3824__auto____6980
        }else {
          return G__6978__6979.cljs$core$ISeq$
        }
      }()) {
        return true
      }else {
        if(!G__6978__6979.cljs$lang$protocol_mask$partition0$) {
          return cljs.core.type_satisfies_.call(null, cljs.core.ISeq, G__6978__6979)
        }else {
          return false
        }
      }
    }else {
      return cljs.core.type_satisfies_.call(null, cljs.core.ISeq, G__6978__6979)
    }
  }
};
cljs.core.seqable_QMARK_ = function seqable_QMARK_(s) {
  var G__6984__6985 = s;
  if(G__6984__6985) {
    if(function() {
      var or__3824__auto____6986 = G__6984__6985.cljs$lang$protocol_mask$partition0$ & 8388608;
      if(or__3824__auto____6986) {
        return or__3824__auto____6986
      }else {
        return G__6984__6985.cljs$core$ISeqable$
      }
    }()) {
      return true
    }else {
      if(!G__6984__6985.cljs$lang$protocol_mask$partition0$) {
        return cljs.core.type_satisfies_.call(null, cljs.core.ISeqable, G__6984__6985)
      }else {
        return false
      }
    }
  }else {
    return cljs.core.type_satisfies_.call(null, cljs.core.ISeqable, G__6984__6985)
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
  var and__3822__auto____6989 = goog.isString(x);
  if(and__3822__auto____6989) {
    return!function() {
      var or__3824__auto____6990 = x.charAt(0) === "\ufdd0";
      if(or__3824__auto____6990) {
        return or__3824__auto____6990
      }else {
        return x.charAt(0) === "\ufdd1"
      }
    }()
  }else {
    return and__3822__auto____6989
  }
};
cljs.core.keyword_QMARK_ = function keyword_QMARK_(x) {
  var and__3822__auto____6992 = goog.isString(x);
  if(and__3822__auto____6992) {
    return x.charAt(0) === "\ufdd0"
  }else {
    return and__3822__auto____6992
  }
};
cljs.core.symbol_QMARK_ = function symbol_QMARK_(x) {
  var and__3822__auto____6994 = goog.isString(x);
  if(and__3822__auto____6994) {
    return x.charAt(0) === "\ufdd1"
  }else {
    return and__3822__auto____6994
  }
};
cljs.core.number_QMARK_ = function number_QMARK_(n) {
  return goog.isNumber(n)
};
cljs.core.fn_QMARK_ = function fn_QMARK_(f) {
  return goog.isFunction(f)
};
cljs.core.ifn_QMARK_ = function ifn_QMARK_(f) {
  var or__3824__auto____6999 = cljs.core.fn_QMARK_.call(null, f);
  if(or__3824__auto____6999) {
    return or__3824__auto____6999
  }else {
    var G__7000__7001 = f;
    if(G__7000__7001) {
      if(function() {
        var or__3824__auto____7002 = G__7000__7001.cljs$lang$protocol_mask$partition0$ & 1;
        if(or__3824__auto____7002) {
          return or__3824__auto____7002
        }else {
          return G__7000__7001.cljs$core$IFn$
        }
      }()) {
        return true
      }else {
        if(!G__7000__7001.cljs$lang$protocol_mask$partition0$) {
          return cljs.core.type_satisfies_.call(null, cljs.core.IFn, G__7000__7001)
        }else {
          return false
        }
      }
    }else {
      return cljs.core.type_satisfies_.call(null, cljs.core.IFn, G__7000__7001)
    }
  }
};
cljs.core.integer_QMARK_ = function integer_QMARK_(n) {
  var and__3822__auto____7004 = cljs.core.number_QMARK_.call(null, n);
  if(and__3822__auto____7004) {
    return n == n.toFixed()
  }else {
    return and__3822__auto____7004
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
    var and__3822__auto____7007 = coll;
    if(cljs.core.truth_(and__3822__auto____7007)) {
      var and__3822__auto____7008 = cljs.core.associative_QMARK_.call(null, coll);
      if(and__3822__auto____7008) {
        return cljs.core.contains_QMARK_.call(null, coll, k)
      }else {
        return and__3822__auto____7008
      }
    }else {
      return and__3822__auto____7007
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
    var G__7017__delegate = function(x, y, more) {
      if(!cljs.core._EQ_.call(null, x, y)) {
        var s__7013 = cljs.core.PersistentHashSet.fromArray([y, x]);
        var xs__7014 = more;
        while(true) {
          var x__7015 = cljs.core.first.call(null, xs__7014);
          var etc__7016 = cljs.core.next.call(null, xs__7014);
          if(cljs.core.truth_(xs__7014)) {
            if(cljs.core.contains_QMARK_.call(null, s__7013, x__7015)) {
              return false
            }else {
              var G__7018 = cljs.core.conj.call(null, s__7013, x__7015);
              var G__7019 = etc__7016;
              s__7013 = G__7018;
              xs__7014 = G__7019;
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
    var G__7017 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__7017__delegate.call(this, x, y, more)
    };
    G__7017.cljs$lang$maxFixedArity = 2;
    G__7017.cljs$lang$applyTo = function(arglist__7020) {
      var x = cljs.core.first(arglist__7020);
      var y = cljs.core.first(cljs.core.next(arglist__7020));
      var more = cljs.core.rest(cljs.core.next(arglist__7020));
      return G__7017__delegate(x, y, more)
    };
    G__7017.cljs$lang$arity$variadic = G__7017__delegate;
    return G__7017
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
            var G__7024__7025 = x;
            if(G__7024__7025) {
              if(cljs.core.truth_(function() {
                var or__3824__auto____7026 = null;
                if(cljs.core.truth_(or__3824__auto____7026)) {
                  return or__3824__auto____7026
                }else {
                  return G__7024__7025.cljs$core$IComparable$
                }
              }())) {
                return true
              }else {
                if(!G__7024__7025.cljs$lang$protocol_mask$partition$) {
                  return cljs.core.type_satisfies_.call(null, cljs.core.IComparable, G__7024__7025)
                }else {
                  return false
                }
              }
            }else {
              return cljs.core.type_satisfies_.call(null, cljs.core.IComparable, G__7024__7025)
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
    var xl__7031 = cljs.core.count.call(null, xs);
    var yl__7032 = cljs.core.count.call(null, ys);
    if(xl__7031 < yl__7032) {
      return-1
    }else {
      if(xl__7031 > yl__7032) {
        return 1
      }else {
        if("\ufdd0'else") {
          return compare_indexed.call(null, xs, ys, xl__7031, 0)
        }else {
          return null
        }
      }
    }
  };
  var compare_indexed__4 = function(xs, ys, len, n) {
    while(true) {
      var d__7033 = cljs.core.compare.call(null, cljs.core.nth.call(null, xs, n), cljs.core.nth.call(null, ys, n));
      if(function() {
        var and__3822__auto____7034 = d__7033 === 0;
        if(and__3822__auto____7034) {
          return n + 1 < len
        }else {
          return and__3822__auto____7034
        }
      }()) {
        var G__7035 = xs;
        var G__7036 = ys;
        var G__7037 = len;
        var G__7038 = n + 1;
        xs = G__7035;
        ys = G__7036;
        len = G__7037;
        n = G__7038;
        continue
      }else {
        return d__7033
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
      var r__7040 = f.call(null, x, y);
      if(cljs.core.number_QMARK_.call(null, r__7040)) {
        return r__7040
      }else {
        if(cljs.core.truth_(r__7040)) {
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
      var a__7042 = cljs.core.to_array.call(null, coll);
      goog.array.stableSort(a__7042, cljs.core.fn__GT_comparator.call(null, comp));
      return cljs.core.seq.call(null, a__7042)
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
    var temp__3971__auto____7048 = cljs.core.seq.call(null, coll);
    if(temp__3971__auto____7048) {
      var s__7049 = temp__3971__auto____7048;
      return cljs.core.reduce.call(null, f, cljs.core.first.call(null, s__7049), cljs.core.next.call(null, s__7049))
    }else {
      return f.call(null)
    }
  };
  var seq_reduce__3 = function(f, val, coll) {
    var val__7050 = val;
    var coll__7051 = cljs.core.seq.call(null, coll);
    while(true) {
      if(coll__7051) {
        var nval__7052 = f.call(null, val__7050, cljs.core.first.call(null, coll__7051));
        if(cljs.core.reduced_QMARK_.call(null, nval__7052)) {
          return cljs.core.deref.call(null, nval__7052)
        }else {
          var G__7053 = nval__7052;
          var G__7054 = cljs.core.next.call(null, coll__7051);
          val__7050 = G__7053;
          coll__7051 = G__7054;
          continue
        }
      }else {
        return val__7050
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
  var a__7056 = cljs.core.to_array.call(null, coll);
  goog.array.shuffle(a__7056);
  return cljs.core.vec.call(null, a__7056)
};
cljs.core.reduce = function() {
  var reduce = null;
  var reduce__2 = function(f, coll) {
    if(function() {
      var G__7063__7064 = coll;
      if(G__7063__7064) {
        if(function() {
          var or__3824__auto____7065 = G__7063__7064.cljs$lang$protocol_mask$partition0$ & 524288;
          if(or__3824__auto____7065) {
            return or__3824__auto____7065
          }else {
            return G__7063__7064.cljs$core$IReduce$
          }
        }()) {
          return true
        }else {
          if(!G__7063__7064.cljs$lang$protocol_mask$partition0$) {
            return cljs.core.type_satisfies_.call(null, cljs.core.IReduce, G__7063__7064)
          }else {
            return false
          }
        }
      }else {
        return cljs.core.type_satisfies_.call(null, cljs.core.IReduce, G__7063__7064)
      }
    }()) {
      return cljs.core._reduce.call(null, coll, f)
    }else {
      return cljs.core.seq_reduce.call(null, f, coll)
    }
  };
  var reduce__3 = function(f, val, coll) {
    if(function() {
      var G__7066__7067 = coll;
      if(G__7066__7067) {
        if(function() {
          var or__3824__auto____7068 = G__7066__7067.cljs$lang$protocol_mask$partition0$ & 524288;
          if(or__3824__auto____7068) {
            return or__3824__auto____7068
          }else {
            return G__7066__7067.cljs$core$IReduce$
          }
        }()) {
          return true
        }else {
          if(!G__7066__7067.cljs$lang$protocol_mask$partition0$) {
            return cljs.core.type_satisfies_.call(null, cljs.core.IReduce, G__7066__7067)
          }else {
            return false
          }
        }
      }else {
        return cljs.core.type_satisfies_.call(null, cljs.core.IReduce, G__7066__7067)
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
cljs.core.Reduced.cljs$lang$ctorPrSeq = function(this__2322__auto__) {
  return cljs.core.list.call(null, "cljs.core/Reduced")
};
cljs.core.Reduced.prototype.cljs$core$IDeref$_deref$arity$1 = function(o) {
  var this__7069 = this;
  return this__7069.val
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
    var G__7070__delegate = function(x, y, more) {
      return cljs.core.reduce.call(null, _PLUS_, x + y, more)
    };
    var G__7070 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__7070__delegate.call(this, x, y, more)
    };
    G__7070.cljs$lang$maxFixedArity = 2;
    G__7070.cljs$lang$applyTo = function(arglist__7071) {
      var x = cljs.core.first(arglist__7071);
      var y = cljs.core.first(cljs.core.next(arglist__7071));
      var more = cljs.core.rest(cljs.core.next(arglist__7071));
      return G__7070__delegate(x, y, more)
    };
    G__7070.cljs$lang$arity$variadic = G__7070__delegate;
    return G__7070
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
    var G__7072__delegate = function(x, y, more) {
      return cljs.core.reduce.call(null, _, x - y, more)
    };
    var G__7072 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__7072__delegate.call(this, x, y, more)
    };
    G__7072.cljs$lang$maxFixedArity = 2;
    G__7072.cljs$lang$applyTo = function(arglist__7073) {
      var x = cljs.core.first(arglist__7073);
      var y = cljs.core.first(cljs.core.next(arglist__7073));
      var more = cljs.core.rest(cljs.core.next(arglist__7073));
      return G__7072__delegate(x, y, more)
    };
    G__7072.cljs$lang$arity$variadic = G__7072__delegate;
    return G__7072
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
    var G__7074__delegate = function(x, y, more) {
      return cljs.core.reduce.call(null, _STAR_, x * y, more)
    };
    var G__7074 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__7074__delegate.call(this, x, y, more)
    };
    G__7074.cljs$lang$maxFixedArity = 2;
    G__7074.cljs$lang$applyTo = function(arglist__7075) {
      var x = cljs.core.first(arglist__7075);
      var y = cljs.core.first(cljs.core.next(arglist__7075));
      var more = cljs.core.rest(cljs.core.next(arglist__7075));
      return G__7074__delegate(x, y, more)
    };
    G__7074.cljs$lang$arity$variadic = G__7074__delegate;
    return G__7074
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
    var G__7076__delegate = function(x, y, more) {
      return cljs.core.reduce.call(null, _SLASH_, _SLASH_.call(null, x, y), more)
    };
    var G__7076 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__7076__delegate.call(this, x, y, more)
    };
    G__7076.cljs$lang$maxFixedArity = 2;
    G__7076.cljs$lang$applyTo = function(arglist__7077) {
      var x = cljs.core.first(arglist__7077);
      var y = cljs.core.first(cljs.core.next(arglist__7077));
      var more = cljs.core.rest(cljs.core.next(arglist__7077));
      return G__7076__delegate(x, y, more)
    };
    G__7076.cljs$lang$arity$variadic = G__7076__delegate;
    return G__7076
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
    var G__7078__delegate = function(x, y, more) {
      while(true) {
        if(x < y) {
          if(cljs.core.next.call(null, more)) {
            var G__7079 = y;
            var G__7080 = cljs.core.first.call(null, more);
            var G__7081 = cljs.core.next.call(null, more);
            x = G__7079;
            y = G__7080;
            more = G__7081;
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
    var G__7078 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__7078__delegate.call(this, x, y, more)
    };
    G__7078.cljs$lang$maxFixedArity = 2;
    G__7078.cljs$lang$applyTo = function(arglist__7082) {
      var x = cljs.core.first(arglist__7082);
      var y = cljs.core.first(cljs.core.next(arglist__7082));
      var more = cljs.core.rest(cljs.core.next(arglist__7082));
      return G__7078__delegate(x, y, more)
    };
    G__7078.cljs$lang$arity$variadic = G__7078__delegate;
    return G__7078
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
    var G__7083__delegate = function(x, y, more) {
      while(true) {
        if(x <= y) {
          if(cljs.core.next.call(null, more)) {
            var G__7084 = y;
            var G__7085 = cljs.core.first.call(null, more);
            var G__7086 = cljs.core.next.call(null, more);
            x = G__7084;
            y = G__7085;
            more = G__7086;
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
    var G__7083 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__7083__delegate.call(this, x, y, more)
    };
    G__7083.cljs$lang$maxFixedArity = 2;
    G__7083.cljs$lang$applyTo = function(arglist__7087) {
      var x = cljs.core.first(arglist__7087);
      var y = cljs.core.first(cljs.core.next(arglist__7087));
      var more = cljs.core.rest(cljs.core.next(arglist__7087));
      return G__7083__delegate(x, y, more)
    };
    G__7083.cljs$lang$arity$variadic = G__7083__delegate;
    return G__7083
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
    var G__7088__delegate = function(x, y, more) {
      while(true) {
        if(x > y) {
          if(cljs.core.next.call(null, more)) {
            var G__7089 = y;
            var G__7090 = cljs.core.first.call(null, more);
            var G__7091 = cljs.core.next.call(null, more);
            x = G__7089;
            y = G__7090;
            more = G__7091;
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
    var G__7088 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__7088__delegate.call(this, x, y, more)
    };
    G__7088.cljs$lang$maxFixedArity = 2;
    G__7088.cljs$lang$applyTo = function(arglist__7092) {
      var x = cljs.core.first(arglist__7092);
      var y = cljs.core.first(cljs.core.next(arglist__7092));
      var more = cljs.core.rest(cljs.core.next(arglist__7092));
      return G__7088__delegate(x, y, more)
    };
    G__7088.cljs$lang$arity$variadic = G__7088__delegate;
    return G__7088
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
    var G__7093__delegate = function(x, y, more) {
      while(true) {
        if(x >= y) {
          if(cljs.core.next.call(null, more)) {
            var G__7094 = y;
            var G__7095 = cljs.core.first.call(null, more);
            var G__7096 = cljs.core.next.call(null, more);
            x = G__7094;
            y = G__7095;
            more = G__7096;
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
    var G__7093 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__7093__delegate.call(this, x, y, more)
    };
    G__7093.cljs$lang$maxFixedArity = 2;
    G__7093.cljs$lang$applyTo = function(arglist__7097) {
      var x = cljs.core.first(arglist__7097);
      var y = cljs.core.first(cljs.core.next(arglist__7097));
      var more = cljs.core.rest(cljs.core.next(arglist__7097));
      return G__7093__delegate(x, y, more)
    };
    G__7093.cljs$lang$arity$variadic = G__7093__delegate;
    return G__7093
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
    var G__7098__delegate = function(x, y, more) {
      return cljs.core.reduce.call(null, max, x > y ? x : y, more)
    };
    var G__7098 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__7098__delegate.call(this, x, y, more)
    };
    G__7098.cljs$lang$maxFixedArity = 2;
    G__7098.cljs$lang$applyTo = function(arglist__7099) {
      var x = cljs.core.first(arglist__7099);
      var y = cljs.core.first(cljs.core.next(arglist__7099));
      var more = cljs.core.rest(cljs.core.next(arglist__7099));
      return G__7098__delegate(x, y, more)
    };
    G__7098.cljs$lang$arity$variadic = G__7098__delegate;
    return G__7098
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
    var G__7100__delegate = function(x, y, more) {
      return cljs.core.reduce.call(null, min, x < y ? x : y, more)
    };
    var G__7100 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__7100__delegate.call(this, x, y, more)
    };
    G__7100.cljs$lang$maxFixedArity = 2;
    G__7100.cljs$lang$applyTo = function(arglist__7101) {
      var x = cljs.core.first(arglist__7101);
      var y = cljs.core.first(cljs.core.next(arglist__7101));
      var more = cljs.core.rest(cljs.core.next(arglist__7101));
      return G__7100__delegate(x, y, more)
    };
    G__7100.cljs$lang$arity$variadic = G__7100__delegate;
    return G__7100
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
  var rem__7103 = n % d;
  return cljs.core.fix.call(null, (n - rem__7103) / d)
};
cljs.core.rem = function rem(n, d) {
  var q__7105 = cljs.core.quot.call(null, n, d);
  return n - d * q__7105
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
  var v__7108 = v - (v >> 1 & 1431655765);
  var v__7109 = (v__7108 & 858993459) + (v__7108 >> 2 & 858993459);
  return(v__7109 + (v__7109 >> 4) & 252645135) * 16843009 >> 24
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
    var G__7110__delegate = function(x, y, more) {
      while(true) {
        if(cljs.core.truth_(_EQ__EQ_.call(null, x, y))) {
          if(cljs.core.next.call(null, more)) {
            var G__7111 = y;
            var G__7112 = cljs.core.first.call(null, more);
            var G__7113 = cljs.core.next.call(null, more);
            x = G__7111;
            y = G__7112;
            more = G__7113;
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
    var G__7110 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__7110__delegate.call(this, x, y, more)
    };
    G__7110.cljs$lang$maxFixedArity = 2;
    G__7110.cljs$lang$applyTo = function(arglist__7114) {
      var x = cljs.core.first(arglist__7114);
      var y = cljs.core.first(cljs.core.next(arglist__7114));
      var more = cljs.core.rest(cljs.core.next(arglist__7114));
      return G__7110__delegate(x, y, more)
    };
    G__7110.cljs$lang$arity$variadic = G__7110__delegate;
    return G__7110
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
  var n__7118 = n;
  var xs__7119 = cljs.core.seq.call(null, coll);
  while(true) {
    if(cljs.core.truth_(function() {
      var and__3822__auto____7120 = xs__7119;
      if(and__3822__auto____7120) {
        return n__7118 > 0
      }else {
        return and__3822__auto____7120
      }
    }())) {
      var G__7121 = n__7118 - 1;
      var G__7122 = cljs.core.next.call(null, xs__7119);
      n__7118 = G__7121;
      xs__7119 = G__7122;
      continue
    }else {
      return xs__7119
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
    var G__7123__delegate = function(x, ys) {
      return function(sb, more) {
        while(true) {
          if(cljs.core.truth_(more)) {
            var G__7124 = sb.append(str_STAR_.call(null, cljs.core.first.call(null, more)));
            var G__7125 = cljs.core.next.call(null, more);
            sb = G__7124;
            more = G__7125;
            continue
          }else {
            return str_STAR_.call(null, sb)
          }
          break
        }
      }.call(null, new goog.string.StringBuffer(str_STAR_.call(null, x)), ys)
    };
    var G__7123 = function(x, var_args) {
      var ys = null;
      if(goog.isDef(var_args)) {
        ys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
      }
      return G__7123__delegate.call(this, x, ys)
    };
    G__7123.cljs$lang$maxFixedArity = 1;
    G__7123.cljs$lang$applyTo = function(arglist__7126) {
      var x = cljs.core.first(arglist__7126);
      var ys = cljs.core.rest(arglist__7126);
      return G__7123__delegate(x, ys)
    };
    G__7123.cljs$lang$arity$variadic = G__7123__delegate;
    return G__7123
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
    var G__7127__delegate = function(x, ys) {
      return function(sb, more) {
        while(true) {
          if(cljs.core.truth_(more)) {
            var G__7128 = sb.append(str.call(null, cljs.core.first.call(null, more)));
            var G__7129 = cljs.core.next.call(null, more);
            sb = G__7128;
            more = G__7129;
            continue
          }else {
            return cljs.core.str_STAR_.call(null, sb)
          }
          break
        }
      }.call(null, new goog.string.StringBuffer(str.call(null, x)), ys)
    };
    var G__7127 = function(x, var_args) {
      var ys = null;
      if(goog.isDef(var_args)) {
        ys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
      }
      return G__7127__delegate.call(this, x, ys)
    };
    G__7127.cljs$lang$maxFixedArity = 1;
    G__7127.cljs$lang$applyTo = function(arglist__7130) {
      var x = cljs.core.first(arglist__7130);
      var ys = cljs.core.rest(arglist__7130);
      return G__7127__delegate(x, ys)
    };
    G__7127.cljs$lang$arity$variadic = G__7127__delegate;
    return G__7127
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
  format.cljs$lang$applyTo = function(arglist__7131) {
    var fmt = cljs.core.first(arglist__7131);
    var args = cljs.core.rest(arglist__7131);
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
    var xs__7134 = cljs.core.seq.call(null, x);
    var ys__7135 = cljs.core.seq.call(null, y);
    while(true) {
      if(xs__7134 == null) {
        return ys__7135 == null
      }else {
        if(ys__7135 == null) {
          return false
        }else {
          if(cljs.core._EQ_.call(null, cljs.core.first.call(null, xs__7134), cljs.core.first.call(null, ys__7135))) {
            var G__7136 = cljs.core.next.call(null, xs__7134);
            var G__7137 = cljs.core.next.call(null, ys__7135);
            xs__7134 = G__7136;
            ys__7135 = G__7137;
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
  return cljs.core.reduce.call(null, function(p1__7138_SHARP_, p2__7139_SHARP_) {
    return cljs.core.hash_combine.call(null, p1__7138_SHARP_, cljs.core.hash.call(null, p2__7139_SHARP_, false))
  }, cljs.core.hash.call(null, cljs.core.first.call(null, coll), false), cljs.core.next.call(null, coll))
};
cljs.core.hash_imap = function hash_imap(m) {
  var h__7143 = 0;
  var s__7144 = cljs.core.seq.call(null, m);
  while(true) {
    if(s__7144) {
      var e__7145 = cljs.core.first.call(null, s__7144);
      var G__7146 = (h__7143 + (cljs.core.hash.call(null, cljs.core.key.call(null, e__7145)) ^ cljs.core.hash.call(null, cljs.core.val.call(null, e__7145)))) % 4503599627370496;
      var G__7147 = cljs.core.next.call(null, s__7144);
      h__7143 = G__7146;
      s__7144 = G__7147;
      continue
    }else {
      return h__7143
    }
    break
  }
};
cljs.core.hash_iset = function hash_iset(s) {
  var h__7151 = 0;
  var s__7152 = cljs.core.seq.call(null, s);
  while(true) {
    if(s__7152) {
      var e__7153 = cljs.core.first.call(null, s__7152);
      var G__7154 = (h__7151 + cljs.core.hash.call(null, e__7153)) % 4503599627370496;
      var G__7155 = cljs.core.next.call(null, s__7152);
      h__7151 = G__7154;
      s__7152 = G__7155;
      continue
    }else {
      return h__7151
    }
    break
  }
};
cljs.core.extend_object_BANG_ = function extend_object_BANG_(obj, fn_map) {
  var G__7176__7177 = cljs.core.seq.call(null, fn_map);
  if(G__7176__7177) {
    var G__7179__7181 = cljs.core.first.call(null, G__7176__7177);
    var vec__7180__7182 = G__7179__7181;
    var key_name__7183 = cljs.core.nth.call(null, vec__7180__7182, 0, null);
    var f__7184 = cljs.core.nth.call(null, vec__7180__7182, 1, null);
    var G__7176__7185 = G__7176__7177;
    var G__7179__7186 = G__7179__7181;
    var G__7176__7187 = G__7176__7185;
    while(true) {
      var vec__7188__7189 = G__7179__7186;
      var key_name__7190 = cljs.core.nth.call(null, vec__7188__7189, 0, null);
      var f__7191 = cljs.core.nth.call(null, vec__7188__7189, 1, null);
      var G__7176__7192 = G__7176__7187;
      var str_name__7193 = cljs.core.name.call(null, key_name__7190);
      obj[str_name__7193] = f__7191;
      var temp__3974__auto____7194 = cljs.core.next.call(null, G__7176__7192);
      if(temp__3974__auto____7194) {
        var G__7176__7195 = temp__3974__auto____7194;
        var G__7196 = cljs.core.first.call(null, G__7176__7195);
        var G__7197 = G__7176__7195;
        G__7179__7186 = G__7196;
        G__7176__7187 = G__7197;
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
cljs.core.List.cljs$lang$ctorPrSeq = function(this__2322__auto__) {
  return cljs.core.list.call(null, "cljs.core/List")
};
cljs.core.List.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__7198 = this;
  var h__2205__auto____7199 = this__7198.__hash;
  if(!(h__2205__auto____7199 == null)) {
    return h__2205__auto____7199
  }else {
    var h__2205__auto____7200 = cljs.core.hash_coll.call(null, coll);
    this__7198.__hash = h__2205__auto____7200;
    return h__2205__auto____7200
  }
};
cljs.core.List.prototype.cljs$core$INext$_next$arity$1 = function(coll) {
  var this__7201 = this;
  if(this__7201.count === 1) {
    return null
  }else {
    return this__7201.rest
  }
};
cljs.core.List.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__7202 = this;
  return new cljs.core.List(this__7202.meta, o, coll, this__7202.count + 1, null)
};
cljs.core.List.prototype.toString = function() {
  var this__7203 = this;
  var this__7204 = this;
  return cljs.core.pr_str.call(null, this__7204)
};
cljs.core.List.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__7205 = this;
  return coll
};
cljs.core.List.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__7206 = this;
  return this__7206.count
};
cljs.core.List.prototype.cljs$core$IStack$_peek$arity$1 = function(coll) {
  var this__7207 = this;
  return this__7207.first
};
cljs.core.List.prototype.cljs$core$IStack$_pop$arity$1 = function(coll) {
  var this__7208 = this;
  return coll.cljs$core$ISeq$_rest$arity$1(coll)
};
cljs.core.List.prototype.cljs$core$ISeq$_first$arity$1 = function(coll) {
  var this__7209 = this;
  return this__7209.first
};
cljs.core.List.prototype.cljs$core$ISeq$_rest$arity$1 = function(coll) {
  var this__7210 = this;
  if(this__7210.count === 1) {
    return cljs.core.List.EMPTY
  }else {
    return this__7210.rest
  }
};
cljs.core.List.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__7211 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.List.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__7212 = this;
  return new cljs.core.List(meta, this__7212.first, this__7212.rest, this__7212.count, this__7212.__hash)
};
cljs.core.List.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__7213 = this;
  return this__7213.meta
};
cljs.core.List.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__7214 = this;
  return cljs.core.List.EMPTY
};
cljs.core.List;
cljs.core.EmptyList = function(meta) {
  this.meta = meta;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 65413326
};
cljs.core.EmptyList.cljs$lang$type = true;
cljs.core.EmptyList.cljs$lang$ctorPrSeq = function(this__2322__auto__) {
  return cljs.core.list.call(null, "cljs.core/EmptyList")
};
cljs.core.EmptyList.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__7215 = this;
  return 0
};
cljs.core.EmptyList.prototype.cljs$core$INext$_next$arity$1 = function(coll) {
  var this__7216 = this;
  return null
};
cljs.core.EmptyList.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__7217 = this;
  return new cljs.core.List(this__7217.meta, o, null, 1, null)
};
cljs.core.EmptyList.prototype.toString = function() {
  var this__7218 = this;
  var this__7219 = this;
  return cljs.core.pr_str.call(null, this__7219)
};
cljs.core.EmptyList.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__7220 = this;
  return null
};
cljs.core.EmptyList.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__7221 = this;
  return 0
};
cljs.core.EmptyList.prototype.cljs$core$IStack$_peek$arity$1 = function(coll) {
  var this__7222 = this;
  return null
};
cljs.core.EmptyList.prototype.cljs$core$IStack$_pop$arity$1 = function(coll) {
  var this__7223 = this;
  throw new Error("Can't pop empty list");
};
cljs.core.EmptyList.prototype.cljs$core$ISeq$_first$arity$1 = function(coll) {
  var this__7224 = this;
  return null
};
cljs.core.EmptyList.prototype.cljs$core$ISeq$_rest$arity$1 = function(coll) {
  var this__7225 = this;
  return cljs.core.List.EMPTY
};
cljs.core.EmptyList.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__7226 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.EmptyList.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__7227 = this;
  return new cljs.core.EmptyList(meta)
};
cljs.core.EmptyList.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__7228 = this;
  return this__7228.meta
};
cljs.core.EmptyList.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__7229 = this;
  return coll
};
cljs.core.EmptyList;
cljs.core.List.EMPTY = new cljs.core.EmptyList(null);
cljs.core.reversible_QMARK_ = function reversible_QMARK_(coll) {
  var G__7233__7234 = coll;
  if(G__7233__7234) {
    if(function() {
      var or__3824__auto____7235 = G__7233__7234.cljs$lang$protocol_mask$partition0$ & 134217728;
      if(or__3824__auto____7235) {
        return or__3824__auto____7235
      }else {
        return G__7233__7234.cljs$core$IReversible$
      }
    }()) {
      return true
    }else {
      if(!G__7233__7234.cljs$lang$protocol_mask$partition0$) {
        return cljs.core.type_satisfies_.call(null, cljs.core.IReversible, G__7233__7234)
      }else {
        return false
      }
    }
  }else {
    return cljs.core.type_satisfies_.call(null, cljs.core.IReversible, G__7233__7234)
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
    var G__7236__delegate = function(x, y, z, items) {
      return cljs.core.conj.call(null, cljs.core.conj.call(null, cljs.core.conj.call(null, cljs.core.reduce.call(null, cljs.core.conj, cljs.core.List.EMPTY, cljs.core.reverse.call(null, items)), z), y), x)
    };
    var G__7236 = function(x, y, z, var_args) {
      var items = null;
      if(goog.isDef(var_args)) {
        items = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
      }
      return G__7236__delegate.call(this, x, y, z, items)
    };
    G__7236.cljs$lang$maxFixedArity = 3;
    G__7236.cljs$lang$applyTo = function(arglist__7237) {
      var x = cljs.core.first(arglist__7237);
      var y = cljs.core.first(cljs.core.next(arglist__7237));
      var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7237)));
      var items = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7237)));
      return G__7236__delegate(x, y, z, items)
    };
    G__7236.cljs$lang$arity$variadic = G__7236__delegate;
    return G__7236
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
cljs.core.Cons.cljs$lang$ctorPrSeq = function(this__2322__auto__) {
  return cljs.core.list.call(null, "cljs.core/Cons")
};
cljs.core.Cons.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__7238 = this;
  var h__2205__auto____7239 = this__7238.__hash;
  if(!(h__2205__auto____7239 == null)) {
    return h__2205__auto____7239
  }else {
    var h__2205__auto____7240 = cljs.core.hash_coll.call(null, coll);
    this__7238.__hash = h__2205__auto____7240;
    return h__2205__auto____7240
  }
};
cljs.core.Cons.prototype.cljs$core$INext$_next$arity$1 = function(coll) {
  var this__7241 = this;
  if(this__7241.rest == null) {
    return null
  }else {
    return cljs.core._seq.call(null, this__7241.rest)
  }
};
cljs.core.Cons.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__7242 = this;
  return new cljs.core.Cons(null, o, coll, this__7242.__hash)
};
cljs.core.Cons.prototype.toString = function() {
  var this__7243 = this;
  var this__7244 = this;
  return cljs.core.pr_str.call(null, this__7244)
};
cljs.core.Cons.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__7245 = this;
  return coll
};
cljs.core.Cons.prototype.cljs$core$ISeq$_first$arity$1 = function(coll) {
  var this__7246 = this;
  return this__7246.first
};
cljs.core.Cons.prototype.cljs$core$ISeq$_rest$arity$1 = function(coll) {
  var this__7247 = this;
  if(this__7247.rest == null) {
    return cljs.core.List.EMPTY
  }else {
    return this__7247.rest
  }
};
cljs.core.Cons.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__7248 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.Cons.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__7249 = this;
  return new cljs.core.Cons(meta, this__7249.first, this__7249.rest, this__7249.__hash)
};
cljs.core.Cons.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__7250 = this;
  return this__7250.meta
};
cljs.core.Cons.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__7251 = this;
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this__7251.meta)
};
cljs.core.Cons;
cljs.core.cons = function cons(x, coll) {
  if(function() {
    var or__3824__auto____7256 = coll == null;
    if(or__3824__auto____7256) {
      return or__3824__auto____7256
    }else {
      var G__7257__7258 = coll;
      if(G__7257__7258) {
        if(function() {
          var or__3824__auto____7259 = G__7257__7258.cljs$lang$protocol_mask$partition0$ & 64;
          if(or__3824__auto____7259) {
            return or__3824__auto____7259
          }else {
            return G__7257__7258.cljs$core$ISeq$
          }
        }()) {
          return true
        }else {
          if(!G__7257__7258.cljs$lang$protocol_mask$partition0$) {
            return cljs.core.type_satisfies_.call(null, cljs.core.ISeq, G__7257__7258)
          }else {
            return false
          }
        }
      }else {
        return cljs.core.type_satisfies_.call(null, cljs.core.ISeq, G__7257__7258)
      }
    }
  }()) {
    return new cljs.core.Cons(null, x, coll, null)
  }else {
    return new cljs.core.Cons(null, x, cljs.core.seq.call(null, coll), null)
  }
};
cljs.core.list_QMARK_ = function list_QMARK_(x) {
  var G__7263__7264 = x;
  if(G__7263__7264) {
    if(function() {
      var or__3824__auto____7265 = G__7263__7264.cljs$lang$protocol_mask$partition0$ & 33554432;
      if(or__3824__auto____7265) {
        return or__3824__auto____7265
      }else {
        return G__7263__7264.cljs$core$IList$
      }
    }()) {
      return true
    }else {
      if(!G__7263__7264.cljs$lang$protocol_mask$partition0$) {
        return cljs.core.type_satisfies_.call(null, cljs.core.IList, G__7263__7264)
      }else {
        return false
      }
    }
  }else {
    return cljs.core.type_satisfies_.call(null, cljs.core.IList, G__7263__7264)
  }
};
cljs.core.IReduce["string"] = true;
cljs.core._reduce["string"] = function() {
  var G__7266 = null;
  var G__7266__2 = function(string, f) {
    return cljs.core.ci_reduce.call(null, string, f)
  };
  var G__7266__3 = function(string, f, start) {
    return cljs.core.ci_reduce.call(null, string, f, start)
  };
  G__7266 = function(string, f, start) {
    switch(arguments.length) {
      case 2:
        return G__7266__2.call(this, string, f);
      case 3:
        return G__7266__3.call(this, string, f, start)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__7266
}();
cljs.core.ILookup["string"] = true;
cljs.core._lookup["string"] = function() {
  var G__7267 = null;
  var G__7267__2 = function(string, k) {
    return cljs.core._nth.call(null, string, k)
  };
  var G__7267__3 = function(string, k, not_found) {
    return cljs.core._nth.call(null, string, k, not_found)
  };
  G__7267 = function(string, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__7267__2.call(this, string, k);
      case 3:
        return G__7267__3.call(this, string, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__7267
}();
cljs.core.IIndexed["string"] = true;
cljs.core._nth["string"] = function() {
  var G__7268 = null;
  var G__7268__2 = function(string, n) {
    if(n < cljs.core._count.call(null, string)) {
      return string.charAt(n)
    }else {
      return null
    }
  };
  var G__7268__3 = function(string, n, not_found) {
    if(n < cljs.core._count.call(null, string)) {
      return string.charAt(n)
    }else {
      return not_found
    }
  };
  G__7268 = function(string, n, not_found) {
    switch(arguments.length) {
      case 2:
        return G__7268__2.call(this, string, n);
      case 3:
        return G__7268__3.call(this, string, n, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__7268
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
cljs.core.Keyword.cljs$lang$ctorPrSeq = function(this__2322__auto__) {
  return cljs.core.list.call(null, "cljs.core/Keyword")
};
cljs.core.Keyword.prototype.call = function() {
  var G__7280 = null;
  var G__7280__2 = function(this_sym7271, coll) {
    var this__7273 = this;
    var this_sym7271__7274 = this;
    var ___7275 = this_sym7271__7274;
    if(coll == null) {
      return null
    }else {
      var strobj__7276 = coll.strobj;
      if(strobj__7276 == null) {
        return cljs.core._lookup.call(null, coll, this__7273.k, null)
      }else {
        return strobj__7276[this__7273.k]
      }
    }
  };
  var G__7280__3 = function(this_sym7272, coll, not_found) {
    var this__7273 = this;
    var this_sym7272__7277 = this;
    var ___7278 = this_sym7272__7277;
    if(coll == null) {
      return not_found
    }else {
      return cljs.core._lookup.call(null, coll, this__7273.k, not_found)
    }
  };
  G__7280 = function(this_sym7272, coll, not_found) {
    switch(arguments.length) {
      case 2:
        return G__7280__2.call(this, this_sym7272, coll);
      case 3:
        return G__7280__3.call(this, this_sym7272, coll, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__7280
}();
cljs.core.Keyword.prototype.apply = function(this_sym7269, args7270) {
  var this__7279 = this;
  return this_sym7269.call.apply(this_sym7269, [this_sym7269].concat(args7270.slice()))
};
cljs.core.Keyword;
String.prototype.cljs$core$IFn$ = true;
String.prototype.call = function() {
  var G__7289 = null;
  var G__7289__2 = function(this_sym7283, coll) {
    var this_sym7283__7285 = this;
    var this__7286 = this_sym7283__7285;
    return cljs.core._lookup.call(null, coll, this__7286.toString(), null)
  };
  var G__7289__3 = function(this_sym7284, coll, not_found) {
    var this_sym7284__7287 = this;
    var this__7288 = this_sym7284__7287;
    return cljs.core._lookup.call(null, coll, this__7288.toString(), not_found)
  };
  G__7289 = function(this_sym7284, coll, not_found) {
    switch(arguments.length) {
      case 2:
        return G__7289__2.call(this, this_sym7284, coll);
      case 3:
        return G__7289__3.call(this, this_sym7284, coll, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__7289
}();
String.prototype.apply = function(this_sym7281, args7282) {
  return this_sym7281.call.apply(this_sym7281, [this_sym7281].concat(args7282.slice()))
};
String.prototype.apply = function(s, args) {
  if(cljs.core.count.call(null, args) < 2) {
    return cljs.core._lookup.call(null, args[0], s, null)
  }else {
    return cljs.core._lookup.call(null, args[0], s, args[1])
  }
};
cljs.core.lazy_seq_value = function lazy_seq_value(lazy_seq) {
  var x__7291 = lazy_seq.x;
  if(lazy_seq.realized) {
    return x__7291
  }else {
    lazy_seq.x = x__7291.call(null);
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
cljs.core.LazySeq.cljs$lang$ctorPrSeq = function(this__2322__auto__) {
  return cljs.core.list.call(null, "cljs.core/LazySeq")
};
cljs.core.LazySeq.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__7292 = this;
  var h__2205__auto____7293 = this__7292.__hash;
  if(!(h__2205__auto____7293 == null)) {
    return h__2205__auto____7293
  }else {
    var h__2205__auto____7294 = cljs.core.hash_coll.call(null, coll);
    this__7292.__hash = h__2205__auto____7294;
    return h__2205__auto____7294
  }
};
cljs.core.LazySeq.prototype.cljs$core$INext$_next$arity$1 = function(coll) {
  var this__7295 = this;
  return cljs.core._seq.call(null, coll.cljs$core$ISeq$_rest$arity$1(coll))
};
cljs.core.LazySeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__7296 = this;
  return cljs.core.cons.call(null, o, coll)
};
cljs.core.LazySeq.prototype.toString = function() {
  var this__7297 = this;
  var this__7298 = this;
  return cljs.core.pr_str.call(null, this__7298)
};
cljs.core.LazySeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__7299 = this;
  return cljs.core.seq.call(null, cljs.core.lazy_seq_value.call(null, coll))
};
cljs.core.LazySeq.prototype.cljs$core$ISeq$_first$arity$1 = function(coll) {
  var this__7300 = this;
  return cljs.core.first.call(null, cljs.core.lazy_seq_value.call(null, coll))
};
cljs.core.LazySeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(coll) {
  var this__7301 = this;
  return cljs.core.rest.call(null, cljs.core.lazy_seq_value.call(null, coll))
};
cljs.core.LazySeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__7302 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.LazySeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__7303 = this;
  return new cljs.core.LazySeq(meta, this__7303.realized, this__7303.x, this__7303.__hash)
};
cljs.core.LazySeq.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__7304 = this;
  return this__7304.meta
};
cljs.core.LazySeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__7305 = this;
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this__7305.meta)
};
cljs.core.LazySeq;
cljs.core.ChunkBuffer = function(buf, end) {
  this.buf = buf;
  this.end = end;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 2
};
cljs.core.ChunkBuffer.cljs$lang$type = true;
cljs.core.ChunkBuffer.cljs$lang$ctorPrSeq = function(this__2322__auto__) {
  return cljs.core.list.call(null, "cljs.core/ChunkBuffer")
};
cljs.core.ChunkBuffer.prototype.cljs$core$ICounted$_count$arity$1 = function(_) {
  var this__7306 = this;
  return this__7306.end
};
cljs.core.ChunkBuffer.prototype.add = function(o) {
  var this__7307 = this;
  var ___7308 = this;
  this__7307.buf[this__7307.end] = o;
  return this__7307.end = this__7307.end + 1
};
cljs.core.ChunkBuffer.prototype.chunk = function(o) {
  var this__7309 = this;
  var ___7310 = this;
  var ret__7311 = new cljs.core.ArrayChunk(this__7309.buf, 0, this__7309.end);
  this__7309.buf = null;
  return ret__7311
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
cljs.core.ArrayChunk.cljs$lang$ctorPrSeq = function(this__2322__auto__) {
  return cljs.core.list.call(null, "cljs.core/ArrayChunk")
};
cljs.core.ArrayChunk.prototype.cljs$core$IReduce$_reduce$arity$2 = function(coll, f) {
  var this__7312 = this;
  return cljs.core.ci_reduce.call(null, coll, f, this__7312.arr[this__7312.off], this__7312.off + 1)
};
cljs.core.ArrayChunk.prototype.cljs$core$IReduce$_reduce$arity$3 = function(coll, f, start) {
  var this__7313 = this;
  return cljs.core.ci_reduce.call(null, coll, f, start, this__7313.off)
};
cljs.core.ArrayChunk.prototype.cljs$core$IChunk$ = true;
cljs.core.ArrayChunk.prototype.cljs$core$IChunk$_drop_first$arity$1 = function(coll) {
  var this__7314 = this;
  if(this__7314.off === this__7314.end) {
    throw new Error("-drop-first of empty chunk");
  }else {
    return new cljs.core.ArrayChunk(this__7314.arr, this__7314.off + 1, this__7314.end)
  }
};
cljs.core.ArrayChunk.prototype.cljs$core$IIndexed$_nth$arity$2 = function(coll, i) {
  var this__7315 = this;
  return this__7315.arr[this__7315.off + i]
};
cljs.core.ArrayChunk.prototype.cljs$core$IIndexed$_nth$arity$3 = function(coll, i, not_found) {
  var this__7316 = this;
  if(function() {
    var and__3822__auto____7317 = i >= 0;
    if(and__3822__auto____7317) {
      return i < this__7316.end - this__7316.off
    }else {
      return and__3822__auto____7317
    }
  }()) {
    return this__7316.arr[this__7316.off + i]
  }else {
    return not_found
  }
};
cljs.core.ArrayChunk.prototype.cljs$core$ICounted$_count$arity$1 = function(_) {
  var this__7318 = this;
  return this__7318.end - this__7318.off
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
cljs.core.ChunkedCons.cljs$lang$ctorPrSeq = function(this__2322__auto__) {
  return cljs.core.list.call(null, "cljs.core/ChunkedCons")
};
cljs.core.ChunkedCons.prototype.cljs$core$ICollection$_conj$arity$2 = function(this$, o) {
  var this__7319 = this;
  return cljs.core.cons.call(null, o, this$)
};
cljs.core.ChunkedCons.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__7320 = this;
  return coll
};
cljs.core.ChunkedCons.prototype.cljs$core$ISeq$_first$arity$1 = function(coll) {
  var this__7321 = this;
  return cljs.core._nth.call(null, this__7321.chunk, 0)
};
cljs.core.ChunkedCons.prototype.cljs$core$ISeq$_rest$arity$1 = function(coll) {
  var this__7322 = this;
  if(cljs.core._count.call(null, this__7322.chunk) > 1) {
    return new cljs.core.ChunkedCons(cljs.core._drop_first.call(null, this__7322.chunk), this__7322.more, this__7322.meta)
  }else {
    if(this__7322.more == null) {
      return cljs.core.List.EMPTY
    }else {
      return this__7322.more
    }
  }
};
cljs.core.ChunkedCons.prototype.cljs$core$IChunkedNext$ = true;
cljs.core.ChunkedCons.prototype.cljs$core$IChunkedNext$_chunked_next$arity$1 = function(coll) {
  var this__7323 = this;
  if(this__7323.more == null) {
    return null
  }else {
    return this__7323.more
  }
};
cljs.core.ChunkedCons.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__7324 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.ChunkedCons.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, m) {
  var this__7325 = this;
  return new cljs.core.ChunkedCons(this__7325.chunk, this__7325.more, m)
};
cljs.core.ChunkedCons.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__7326 = this;
  return this__7326.meta
};
cljs.core.ChunkedCons.prototype.cljs$core$IChunkedSeq$ = true;
cljs.core.ChunkedCons.prototype.cljs$core$IChunkedSeq$_chunked_first$arity$1 = function(coll) {
  var this__7327 = this;
  return this__7327.chunk
};
cljs.core.ChunkedCons.prototype.cljs$core$IChunkedSeq$_chunked_rest$arity$1 = function(coll) {
  var this__7328 = this;
  if(this__7328.more == null) {
    return cljs.core.List.EMPTY
  }else {
    return this__7328.more
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
    var G__7332__7333 = s;
    if(G__7332__7333) {
      if(cljs.core.truth_(function() {
        var or__3824__auto____7334 = null;
        if(cljs.core.truth_(or__3824__auto____7334)) {
          return or__3824__auto____7334
        }else {
          return G__7332__7333.cljs$core$IChunkedNext$
        }
      }())) {
        return true
      }else {
        if(!G__7332__7333.cljs$lang$protocol_mask$partition$) {
          return cljs.core.type_satisfies_.call(null, cljs.core.IChunkedNext, G__7332__7333)
        }else {
          return false
        }
      }
    }else {
      return cljs.core.type_satisfies_.call(null, cljs.core.IChunkedNext, G__7332__7333)
    }
  }()) {
    return cljs.core._chunked_next.call(null, s)
  }else {
    return cljs.core.seq.call(null, cljs.core._chunked_rest.call(null, s))
  }
};
cljs.core.to_array = function to_array(s) {
  var ary__7337 = [];
  var s__7338 = s;
  while(true) {
    if(cljs.core.seq.call(null, s__7338)) {
      ary__7337.push(cljs.core.first.call(null, s__7338));
      var G__7339 = cljs.core.next.call(null, s__7338);
      s__7338 = G__7339;
      continue
    }else {
      return ary__7337
    }
    break
  }
};
cljs.core.to_array_2d = function to_array_2d(coll) {
  var ret__7343 = cljs.core.make_array.call(null, cljs.core.count.call(null, coll));
  var i__7344 = 0;
  var xs__7345 = cljs.core.seq.call(null, coll);
  while(true) {
    if(xs__7345) {
      ret__7343[i__7344] = cljs.core.to_array.call(null, cljs.core.first.call(null, xs__7345));
      var G__7346 = i__7344 + 1;
      var G__7347 = cljs.core.next.call(null, xs__7345);
      i__7344 = G__7346;
      xs__7345 = G__7347;
      continue
    }else {
    }
    break
  }
  return ret__7343
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
    var a__7355 = cljs.core.make_array.call(null, size);
    if(cljs.core.seq_QMARK_.call(null, init_val_or_seq)) {
      var s__7356 = cljs.core.seq.call(null, init_val_or_seq);
      var i__7357 = 0;
      var s__7358 = s__7356;
      while(true) {
        if(cljs.core.truth_(function() {
          var and__3822__auto____7359 = s__7358;
          if(and__3822__auto____7359) {
            return i__7357 < size
          }else {
            return and__3822__auto____7359
          }
        }())) {
          a__7355[i__7357] = cljs.core.first.call(null, s__7358);
          var G__7362 = i__7357 + 1;
          var G__7363 = cljs.core.next.call(null, s__7358);
          i__7357 = G__7362;
          s__7358 = G__7363;
          continue
        }else {
          return a__7355
        }
        break
      }
    }else {
      var n__2540__auto____7360 = size;
      var i__7361 = 0;
      while(true) {
        if(i__7361 < n__2540__auto____7360) {
          a__7355[i__7361] = init_val_or_seq;
          var G__7364 = i__7361 + 1;
          i__7361 = G__7364;
          continue
        }else {
        }
        break
      }
      return a__7355
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
    var a__7372 = cljs.core.make_array.call(null, size);
    if(cljs.core.seq_QMARK_.call(null, init_val_or_seq)) {
      var s__7373 = cljs.core.seq.call(null, init_val_or_seq);
      var i__7374 = 0;
      var s__7375 = s__7373;
      while(true) {
        if(cljs.core.truth_(function() {
          var and__3822__auto____7376 = s__7375;
          if(and__3822__auto____7376) {
            return i__7374 < size
          }else {
            return and__3822__auto____7376
          }
        }())) {
          a__7372[i__7374] = cljs.core.first.call(null, s__7375);
          var G__7379 = i__7374 + 1;
          var G__7380 = cljs.core.next.call(null, s__7375);
          i__7374 = G__7379;
          s__7375 = G__7380;
          continue
        }else {
          return a__7372
        }
        break
      }
    }else {
      var n__2540__auto____7377 = size;
      var i__7378 = 0;
      while(true) {
        if(i__7378 < n__2540__auto____7377) {
          a__7372[i__7378] = init_val_or_seq;
          var G__7381 = i__7378 + 1;
          i__7378 = G__7381;
          continue
        }else {
        }
        break
      }
      return a__7372
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
    var a__7389 = cljs.core.make_array.call(null, size);
    if(cljs.core.seq_QMARK_.call(null, init_val_or_seq)) {
      var s__7390 = cljs.core.seq.call(null, init_val_or_seq);
      var i__7391 = 0;
      var s__7392 = s__7390;
      while(true) {
        if(cljs.core.truth_(function() {
          var and__3822__auto____7393 = s__7392;
          if(and__3822__auto____7393) {
            return i__7391 < size
          }else {
            return and__3822__auto____7393
          }
        }())) {
          a__7389[i__7391] = cljs.core.first.call(null, s__7392);
          var G__7396 = i__7391 + 1;
          var G__7397 = cljs.core.next.call(null, s__7392);
          i__7391 = G__7396;
          s__7392 = G__7397;
          continue
        }else {
          return a__7389
        }
        break
      }
    }else {
      var n__2540__auto____7394 = size;
      var i__7395 = 0;
      while(true) {
        if(i__7395 < n__2540__auto____7394) {
          a__7389[i__7395] = init_val_or_seq;
          var G__7398 = i__7395 + 1;
          i__7395 = G__7398;
          continue
        }else {
        }
        break
      }
      return a__7389
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
    var s__7403 = s;
    var i__7404 = n;
    var sum__7405 = 0;
    while(true) {
      if(cljs.core.truth_(function() {
        var and__3822__auto____7406 = i__7404 > 0;
        if(and__3822__auto____7406) {
          return cljs.core.seq.call(null, s__7403)
        }else {
          return and__3822__auto____7406
        }
      }())) {
        var G__7407 = cljs.core.next.call(null, s__7403);
        var G__7408 = i__7404 - 1;
        var G__7409 = sum__7405 + 1;
        s__7403 = G__7407;
        i__7404 = G__7408;
        sum__7405 = G__7409;
        continue
      }else {
        return sum__7405
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
      var s__7414 = cljs.core.seq.call(null, x);
      if(s__7414) {
        if(cljs.core.chunked_seq_QMARK_.call(null, s__7414)) {
          return cljs.core.chunk_cons.call(null, cljs.core.chunk_first.call(null, s__7414), concat.call(null, cljs.core.chunk_rest.call(null, s__7414), y))
        }else {
          return cljs.core.cons.call(null, cljs.core.first.call(null, s__7414), concat.call(null, cljs.core.rest.call(null, s__7414), y))
        }
      }else {
        return y
      }
    }, null)
  };
  var concat__3 = function() {
    var G__7418__delegate = function(x, y, zs) {
      var cat__7417 = function cat(xys, zs) {
        return new cljs.core.LazySeq(null, false, function() {
          var xys__7416 = cljs.core.seq.call(null, xys);
          if(xys__7416) {
            if(cljs.core.chunked_seq_QMARK_.call(null, xys__7416)) {
              return cljs.core.chunk_cons.call(null, cljs.core.chunk_first.call(null, xys__7416), cat.call(null, cljs.core.chunk_rest.call(null, xys__7416), zs))
            }else {
              return cljs.core.cons.call(null, cljs.core.first.call(null, xys__7416), cat.call(null, cljs.core.rest.call(null, xys__7416), zs))
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
      return cat__7417.call(null, concat.call(null, x, y), zs)
    };
    var G__7418 = function(x, y, var_args) {
      var zs = null;
      if(goog.isDef(var_args)) {
        zs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__7418__delegate.call(this, x, y, zs)
    };
    G__7418.cljs$lang$maxFixedArity = 2;
    G__7418.cljs$lang$applyTo = function(arglist__7419) {
      var x = cljs.core.first(arglist__7419);
      var y = cljs.core.first(cljs.core.next(arglist__7419));
      var zs = cljs.core.rest(cljs.core.next(arglist__7419));
      return G__7418__delegate(x, y, zs)
    };
    G__7418.cljs$lang$arity$variadic = G__7418__delegate;
    return G__7418
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
    var G__7420__delegate = function(a, b, c, d, more) {
      return cljs.core.cons.call(null, a, cljs.core.cons.call(null, b, cljs.core.cons.call(null, c, cljs.core.cons.call(null, d, cljs.core.spread.call(null, more)))))
    };
    var G__7420 = function(a, b, c, d, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4), 0)
      }
      return G__7420__delegate.call(this, a, b, c, d, more)
    };
    G__7420.cljs$lang$maxFixedArity = 4;
    G__7420.cljs$lang$applyTo = function(arglist__7421) {
      var a = cljs.core.first(arglist__7421);
      var b = cljs.core.first(cljs.core.next(arglist__7421));
      var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7421)));
      var d = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__7421))));
      var more = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__7421))));
      return G__7420__delegate(a, b, c, d, more)
    };
    G__7420.cljs$lang$arity$variadic = G__7420__delegate;
    return G__7420
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
  var args__7463 = cljs.core.seq.call(null, args);
  if(argc === 0) {
    return f.call(null)
  }else {
    var a__7464 = cljs.core._first.call(null, args__7463);
    var args__7465 = cljs.core._rest.call(null, args__7463);
    if(argc === 1) {
      if(f.cljs$lang$arity$1) {
        return f.cljs$lang$arity$1(a__7464)
      }else {
        return f.call(null, a__7464)
      }
    }else {
      var b__7466 = cljs.core._first.call(null, args__7465);
      var args__7467 = cljs.core._rest.call(null, args__7465);
      if(argc === 2) {
        if(f.cljs$lang$arity$2) {
          return f.cljs$lang$arity$2(a__7464, b__7466)
        }else {
          return f.call(null, a__7464, b__7466)
        }
      }else {
        var c__7468 = cljs.core._first.call(null, args__7467);
        var args__7469 = cljs.core._rest.call(null, args__7467);
        if(argc === 3) {
          if(f.cljs$lang$arity$3) {
            return f.cljs$lang$arity$3(a__7464, b__7466, c__7468)
          }else {
            return f.call(null, a__7464, b__7466, c__7468)
          }
        }else {
          var d__7470 = cljs.core._first.call(null, args__7469);
          var args__7471 = cljs.core._rest.call(null, args__7469);
          if(argc === 4) {
            if(f.cljs$lang$arity$4) {
              return f.cljs$lang$arity$4(a__7464, b__7466, c__7468, d__7470)
            }else {
              return f.call(null, a__7464, b__7466, c__7468, d__7470)
            }
          }else {
            var e__7472 = cljs.core._first.call(null, args__7471);
            var args__7473 = cljs.core._rest.call(null, args__7471);
            if(argc === 5) {
              if(f.cljs$lang$arity$5) {
                return f.cljs$lang$arity$5(a__7464, b__7466, c__7468, d__7470, e__7472)
              }else {
                return f.call(null, a__7464, b__7466, c__7468, d__7470, e__7472)
              }
            }else {
              var f__7474 = cljs.core._first.call(null, args__7473);
              var args__7475 = cljs.core._rest.call(null, args__7473);
              if(argc === 6) {
                if(f__7474.cljs$lang$arity$6) {
                  return f__7474.cljs$lang$arity$6(a__7464, b__7466, c__7468, d__7470, e__7472, f__7474)
                }else {
                  return f__7474.call(null, a__7464, b__7466, c__7468, d__7470, e__7472, f__7474)
                }
              }else {
                var g__7476 = cljs.core._first.call(null, args__7475);
                var args__7477 = cljs.core._rest.call(null, args__7475);
                if(argc === 7) {
                  if(f__7474.cljs$lang$arity$7) {
                    return f__7474.cljs$lang$arity$7(a__7464, b__7466, c__7468, d__7470, e__7472, f__7474, g__7476)
                  }else {
                    return f__7474.call(null, a__7464, b__7466, c__7468, d__7470, e__7472, f__7474, g__7476)
                  }
                }else {
                  var h__7478 = cljs.core._first.call(null, args__7477);
                  var args__7479 = cljs.core._rest.call(null, args__7477);
                  if(argc === 8) {
                    if(f__7474.cljs$lang$arity$8) {
                      return f__7474.cljs$lang$arity$8(a__7464, b__7466, c__7468, d__7470, e__7472, f__7474, g__7476, h__7478)
                    }else {
                      return f__7474.call(null, a__7464, b__7466, c__7468, d__7470, e__7472, f__7474, g__7476, h__7478)
                    }
                  }else {
                    var i__7480 = cljs.core._first.call(null, args__7479);
                    var args__7481 = cljs.core._rest.call(null, args__7479);
                    if(argc === 9) {
                      if(f__7474.cljs$lang$arity$9) {
                        return f__7474.cljs$lang$arity$9(a__7464, b__7466, c__7468, d__7470, e__7472, f__7474, g__7476, h__7478, i__7480)
                      }else {
                        return f__7474.call(null, a__7464, b__7466, c__7468, d__7470, e__7472, f__7474, g__7476, h__7478, i__7480)
                      }
                    }else {
                      var j__7482 = cljs.core._first.call(null, args__7481);
                      var args__7483 = cljs.core._rest.call(null, args__7481);
                      if(argc === 10) {
                        if(f__7474.cljs$lang$arity$10) {
                          return f__7474.cljs$lang$arity$10(a__7464, b__7466, c__7468, d__7470, e__7472, f__7474, g__7476, h__7478, i__7480, j__7482)
                        }else {
                          return f__7474.call(null, a__7464, b__7466, c__7468, d__7470, e__7472, f__7474, g__7476, h__7478, i__7480, j__7482)
                        }
                      }else {
                        var k__7484 = cljs.core._first.call(null, args__7483);
                        var args__7485 = cljs.core._rest.call(null, args__7483);
                        if(argc === 11) {
                          if(f__7474.cljs$lang$arity$11) {
                            return f__7474.cljs$lang$arity$11(a__7464, b__7466, c__7468, d__7470, e__7472, f__7474, g__7476, h__7478, i__7480, j__7482, k__7484)
                          }else {
                            return f__7474.call(null, a__7464, b__7466, c__7468, d__7470, e__7472, f__7474, g__7476, h__7478, i__7480, j__7482, k__7484)
                          }
                        }else {
                          var l__7486 = cljs.core._first.call(null, args__7485);
                          var args__7487 = cljs.core._rest.call(null, args__7485);
                          if(argc === 12) {
                            if(f__7474.cljs$lang$arity$12) {
                              return f__7474.cljs$lang$arity$12(a__7464, b__7466, c__7468, d__7470, e__7472, f__7474, g__7476, h__7478, i__7480, j__7482, k__7484, l__7486)
                            }else {
                              return f__7474.call(null, a__7464, b__7466, c__7468, d__7470, e__7472, f__7474, g__7476, h__7478, i__7480, j__7482, k__7484, l__7486)
                            }
                          }else {
                            var m__7488 = cljs.core._first.call(null, args__7487);
                            var args__7489 = cljs.core._rest.call(null, args__7487);
                            if(argc === 13) {
                              if(f__7474.cljs$lang$arity$13) {
                                return f__7474.cljs$lang$arity$13(a__7464, b__7466, c__7468, d__7470, e__7472, f__7474, g__7476, h__7478, i__7480, j__7482, k__7484, l__7486, m__7488)
                              }else {
                                return f__7474.call(null, a__7464, b__7466, c__7468, d__7470, e__7472, f__7474, g__7476, h__7478, i__7480, j__7482, k__7484, l__7486, m__7488)
                              }
                            }else {
                              var n__7490 = cljs.core._first.call(null, args__7489);
                              var args__7491 = cljs.core._rest.call(null, args__7489);
                              if(argc === 14) {
                                if(f__7474.cljs$lang$arity$14) {
                                  return f__7474.cljs$lang$arity$14(a__7464, b__7466, c__7468, d__7470, e__7472, f__7474, g__7476, h__7478, i__7480, j__7482, k__7484, l__7486, m__7488, n__7490)
                                }else {
                                  return f__7474.call(null, a__7464, b__7466, c__7468, d__7470, e__7472, f__7474, g__7476, h__7478, i__7480, j__7482, k__7484, l__7486, m__7488, n__7490)
                                }
                              }else {
                                var o__7492 = cljs.core._first.call(null, args__7491);
                                var args__7493 = cljs.core._rest.call(null, args__7491);
                                if(argc === 15) {
                                  if(f__7474.cljs$lang$arity$15) {
                                    return f__7474.cljs$lang$arity$15(a__7464, b__7466, c__7468, d__7470, e__7472, f__7474, g__7476, h__7478, i__7480, j__7482, k__7484, l__7486, m__7488, n__7490, o__7492)
                                  }else {
                                    return f__7474.call(null, a__7464, b__7466, c__7468, d__7470, e__7472, f__7474, g__7476, h__7478, i__7480, j__7482, k__7484, l__7486, m__7488, n__7490, o__7492)
                                  }
                                }else {
                                  var p__7494 = cljs.core._first.call(null, args__7493);
                                  var args__7495 = cljs.core._rest.call(null, args__7493);
                                  if(argc === 16) {
                                    if(f__7474.cljs$lang$arity$16) {
                                      return f__7474.cljs$lang$arity$16(a__7464, b__7466, c__7468, d__7470, e__7472, f__7474, g__7476, h__7478, i__7480, j__7482, k__7484, l__7486, m__7488, n__7490, o__7492, p__7494)
                                    }else {
                                      return f__7474.call(null, a__7464, b__7466, c__7468, d__7470, e__7472, f__7474, g__7476, h__7478, i__7480, j__7482, k__7484, l__7486, m__7488, n__7490, o__7492, p__7494)
                                    }
                                  }else {
                                    var q__7496 = cljs.core._first.call(null, args__7495);
                                    var args__7497 = cljs.core._rest.call(null, args__7495);
                                    if(argc === 17) {
                                      if(f__7474.cljs$lang$arity$17) {
                                        return f__7474.cljs$lang$arity$17(a__7464, b__7466, c__7468, d__7470, e__7472, f__7474, g__7476, h__7478, i__7480, j__7482, k__7484, l__7486, m__7488, n__7490, o__7492, p__7494, q__7496)
                                      }else {
                                        return f__7474.call(null, a__7464, b__7466, c__7468, d__7470, e__7472, f__7474, g__7476, h__7478, i__7480, j__7482, k__7484, l__7486, m__7488, n__7490, o__7492, p__7494, q__7496)
                                      }
                                    }else {
                                      var r__7498 = cljs.core._first.call(null, args__7497);
                                      var args__7499 = cljs.core._rest.call(null, args__7497);
                                      if(argc === 18) {
                                        if(f__7474.cljs$lang$arity$18) {
                                          return f__7474.cljs$lang$arity$18(a__7464, b__7466, c__7468, d__7470, e__7472, f__7474, g__7476, h__7478, i__7480, j__7482, k__7484, l__7486, m__7488, n__7490, o__7492, p__7494, q__7496, r__7498)
                                        }else {
                                          return f__7474.call(null, a__7464, b__7466, c__7468, d__7470, e__7472, f__7474, g__7476, h__7478, i__7480, j__7482, k__7484, l__7486, m__7488, n__7490, o__7492, p__7494, q__7496, r__7498)
                                        }
                                      }else {
                                        var s__7500 = cljs.core._first.call(null, args__7499);
                                        var args__7501 = cljs.core._rest.call(null, args__7499);
                                        if(argc === 19) {
                                          if(f__7474.cljs$lang$arity$19) {
                                            return f__7474.cljs$lang$arity$19(a__7464, b__7466, c__7468, d__7470, e__7472, f__7474, g__7476, h__7478, i__7480, j__7482, k__7484, l__7486, m__7488, n__7490, o__7492, p__7494, q__7496, r__7498, s__7500)
                                          }else {
                                            return f__7474.call(null, a__7464, b__7466, c__7468, d__7470, e__7472, f__7474, g__7476, h__7478, i__7480, j__7482, k__7484, l__7486, m__7488, n__7490, o__7492, p__7494, q__7496, r__7498, s__7500)
                                          }
                                        }else {
                                          var t__7502 = cljs.core._first.call(null, args__7501);
                                          var args__7503 = cljs.core._rest.call(null, args__7501);
                                          if(argc === 20) {
                                            if(f__7474.cljs$lang$arity$20) {
                                              return f__7474.cljs$lang$arity$20(a__7464, b__7466, c__7468, d__7470, e__7472, f__7474, g__7476, h__7478, i__7480, j__7482, k__7484, l__7486, m__7488, n__7490, o__7492, p__7494, q__7496, r__7498, s__7500, t__7502)
                                            }else {
                                              return f__7474.call(null, a__7464, b__7466, c__7468, d__7470, e__7472, f__7474, g__7476, h__7478, i__7480, j__7482, k__7484, l__7486, m__7488, n__7490, o__7492, p__7494, q__7496, r__7498, s__7500, t__7502)
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
    var fixed_arity__7518 = f.cljs$lang$maxFixedArity;
    if(cljs.core.truth_(f.cljs$lang$applyTo)) {
      var bc__7519 = cljs.core.bounded_count.call(null, args, fixed_arity__7518 + 1);
      if(bc__7519 <= fixed_arity__7518) {
        return cljs.core.apply_to.call(null, f, bc__7519, args)
      }else {
        return f.cljs$lang$applyTo(args)
      }
    }else {
      return f.apply(f, cljs.core.to_array.call(null, args))
    }
  };
  var apply__3 = function(f, x, args) {
    var arglist__7520 = cljs.core.list_STAR_.call(null, x, args);
    var fixed_arity__7521 = f.cljs$lang$maxFixedArity;
    if(cljs.core.truth_(f.cljs$lang$applyTo)) {
      var bc__7522 = cljs.core.bounded_count.call(null, arglist__7520, fixed_arity__7521 + 1);
      if(bc__7522 <= fixed_arity__7521) {
        return cljs.core.apply_to.call(null, f, bc__7522, arglist__7520)
      }else {
        return f.cljs$lang$applyTo(arglist__7520)
      }
    }else {
      return f.apply(f, cljs.core.to_array.call(null, arglist__7520))
    }
  };
  var apply__4 = function(f, x, y, args) {
    var arglist__7523 = cljs.core.list_STAR_.call(null, x, y, args);
    var fixed_arity__7524 = f.cljs$lang$maxFixedArity;
    if(cljs.core.truth_(f.cljs$lang$applyTo)) {
      var bc__7525 = cljs.core.bounded_count.call(null, arglist__7523, fixed_arity__7524 + 1);
      if(bc__7525 <= fixed_arity__7524) {
        return cljs.core.apply_to.call(null, f, bc__7525, arglist__7523)
      }else {
        return f.cljs$lang$applyTo(arglist__7523)
      }
    }else {
      return f.apply(f, cljs.core.to_array.call(null, arglist__7523))
    }
  };
  var apply__5 = function(f, x, y, z, args) {
    var arglist__7526 = cljs.core.list_STAR_.call(null, x, y, z, args);
    var fixed_arity__7527 = f.cljs$lang$maxFixedArity;
    if(cljs.core.truth_(f.cljs$lang$applyTo)) {
      var bc__7528 = cljs.core.bounded_count.call(null, arglist__7526, fixed_arity__7527 + 1);
      if(bc__7528 <= fixed_arity__7527) {
        return cljs.core.apply_to.call(null, f, bc__7528, arglist__7526)
      }else {
        return f.cljs$lang$applyTo(arglist__7526)
      }
    }else {
      return f.apply(f, cljs.core.to_array.call(null, arglist__7526))
    }
  };
  var apply__6 = function() {
    var G__7532__delegate = function(f, a, b, c, d, args) {
      var arglist__7529 = cljs.core.cons.call(null, a, cljs.core.cons.call(null, b, cljs.core.cons.call(null, c, cljs.core.cons.call(null, d, cljs.core.spread.call(null, args)))));
      var fixed_arity__7530 = f.cljs$lang$maxFixedArity;
      if(cljs.core.truth_(f.cljs$lang$applyTo)) {
        var bc__7531 = cljs.core.bounded_count.call(null, arglist__7529, fixed_arity__7530 + 1);
        if(bc__7531 <= fixed_arity__7530) {
          return cljs.core.apply_to.call(null, f, bc__7531, arglist__7529)
        }else {
          return f.cljs$lang$applyTo(arglist__7529)
        }
      }else {
        return f.apply(f, cljs.core.to_array.call(null, arglist__7529))
      }
    };
    var G__7532 = function(f, a, b, c, d, var_args) {
      var args = null;
      if(goog.isDef(var_args)) {
        args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 5), 0)
      }
      return G__7532__delegate.call(this, f, a, b, c, d, args)
    };
    G__7532.cljs$lang$maxFixedArity = 5;
    G__7532.cljs$lang$applyTo = function(arglist__7533) {
      var f = cljs.core.first(arglist__7533);
      var a = cljs.core.first(cljs.core.next(arglist__7533));
      var b = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7533)));
      var c = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__7533))));
      var d = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__7533)))));
      var args = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__7533)))));
      return G__7532__delegate(f, a, b, c, d, args)
    };
    G__7532.cljs$lang$arity$variadic = G__7532__delegate;
    return G__7532
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
  vary_meta.cljs$lang$applyTo = function(arglist__7534) {
    var obj = cljs.core.first(arglist__7534);
    var f = cljs.core.first(cljs.core.next(arglist__7534));
    var args = cljs.core.rest(cljs.core.next(arglist__7534));
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
    var G__7535__delegate = function(x, y, more) {
      return cljs.core.not.call(null, cljs.core.apply.call(null, cljs.core._EQ_, x, y, more))
    };
    var G__7535 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__7535__delegate.call(this, x, y, more)
    };
    G__7535.cljs$lang$maxFixedArity = 2;
    G__7535.cljs$lang$applyTo = function(arglist__7536) {
      var x = cljs.core.first(arglist__7536);
      var y = cljs.core.first(cljs.core.next(arglist__7536));
      var more = cljs.core.rest(cljs.core.next(arglist__7536));
      return G__7535__delegate(x, y, more)
    };
    G__7535.cljs$lang$arity$variadic = G__7535__delegate;
    return G__7535
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
        var G__7537 = pred;
        var G__7538 = cljs.core.next.call(null, coll);
        pred = G__7537;
        coll = G__7538;
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
      var or__3824__auto____7540 = pred.call(null, cljs.core.first.call(null, coll));
      if(cljs.core.truth_(or__3824__auto____7540)) {
        return or__3824__auto____7540
      }else {
        var G__7541 = pred;
        var G__7542 = cljs.core.next.call(null, coll);
        pred = G__7541;
        coll = G__7542;
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
    var G__7543 = null;
    var G__7543__0 = function() {
      return cljs.core.not.call(null, f.call(null))
    };
    var G__7543__1 = function(x) {
      return cljs.core.not.call(null, f.call(null, x))
    };
    var G__7543__2 = function(x, y) {
      return cljs.core.not.call(null, f.call(null, x, y))
    };
    var G__7543__3 = function() {
      var G__7544__delegate = function(x, y, zs) {
        return cljs.core.not.call(null, cljs.core.apply.call(null, f, x, y, zs))
      };
      var G__7544 = function(x, y, var_args) {
        var zs = null;
        if(goog.isDef(var_args)) {
          zs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
        }
        return G__7544__delegate.call(this, x, y, zs)
      };
      G__7544.cljs$lang$maxFixedArity = 2;
      G__7544.cljs$lang$applyTo = function(arglist__7545) {
        var x = cljs.core.first(arglist__7545);
        var y = cljs.core.first(cljs.core.next(arglist__7545));
        var zs = cljs.core.rest(cljs.core.next(arglist__7545));
        return G__7544__delegate(x, y, zs)
      };
      G__7544.cljs$lang$arity$variadic = G__7544__delegate;
      return G__7544
    }();
    G__7543 = function(x, y, var_args) {
      var zs = var_args;
      switch(arguments.length) {
        case 0:
          return G__7543__0.call(this);
        case 1:
          return G__7543__1.call(this, x);
        case 2:
          return G__7543__2.call(this, x, y);
        default:
          return G__7543__3.cljs$lang$arity$variadic(x, y, cljs.core.array_seq(arguments, 2))
      }
      throw"Invalid arity: " + arguments.length;
    };
    G__7543.cljs$lang$maxFixedArity = 2;
    G__7543.cljs$lang$applyTo = G__7543__3.cljs$lang$applyTo;
    return G__7543
  }()
};
cljs.core.constantly = function constantly(x) {
  return function() {
    var G__7546__delegate = function(args) {
      return x
    };
    var G__7546 = function(var_args) {
      var args = null;
      if(goog.isDef(var_args)) {
        args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
      }
      return G__7546__delegate.call(this, args)
    };
    G__7546.cljs$lang$maxFixedArity = 0;
    G__7546.cljs$lang$applyTo = function(arglist__7547) {
      var args = cljs.core.seq(arglist__7547);
      return G__7546__delegate(args)
    };
    G__7546.cljs$lang$arity$variadic = G__7546__delegate;
    return G__7546
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
      var G__7554 = null;
      var G__7554__0 = function() {
        return f.call(null, g.call(null))
      };
      var G__7554__1 = function(x) {
        return f.call(null, g.call(null, x))
      };
      var G__7554__2 = function(x, y) {
        return f.call(null, g.call(null, x, y))
      };
      var G__7554__3 = function(x, y, z) {
        return f.call(null, g.call(null, x, y, z))
      };
      var G__7554__4 = function() {
        var G__7555__delegate = function(x, y, z, args) {
          return f.call(null, cljs.core.apply.call(null, g, x, y, z, args))
        };
        var G__7555 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__7555__delegate.call(this, x, y, z, args)
        };
        G__7555.cljs$lang$maxFixedArity = 3;
        G__7555.cljs$lang$applyTo = function(arglist__7556) {
          var x = cljs.core.first(arglist__7556);
          var y = cljs.core.first(cljs.core.next(arglist__7556));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7556)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7556)));
          return G__7555__delegate(x, y, z, args)
        };
        G__7555.cljs$lang$arity$variadic = G__7555__delegate;
        return G__7555
      }();
      G__7554 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return G__7554__0.call(this);
          case 1:
            return G__7554__1.call(this, x);
          case 2:
            return G__7554__2.call(this, x, y);
          case 3:
            return G__7554__3.call(this, x, y, z);
          default:
            return G__7554__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
        }
        throw"Invalid arity: " + arguments.length;
      };
      G__7554.cljs$lang$maxFixedArity = 3;
      G__7554.cljs$lang$applyTo = G__7554__4.cljs$lang$applyTo;
      return G__7554
    }()
  };
  var comp__3 = function(f, g, h) {
    return function() {
      var G__7557 = null;
      var G__7557__0 = function() {
        return f.call(null, g.call(null, h.call(null)))
      };
      var G__7557__1 = function(x) {
        return f.call(null, g.call(null, h.call(null, x)))
      };
      var G__7557__2 = function(x, y) {
        return f.call(null, g.call(null, h.call(null, x, y)))
      };
      var G__7557__3 = function(x, y, z) {
        return f.call(null, g.call(null, h.call(null, x, y, z)))
      };
      var G__7557__4 = function() {
        var G__7558__delegate = function(x, y, z, args) {
          return f.call(null, g.call(null, cljs.core.apply.call(null, h, x, y, z, args)))
        };
        var G__7558 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__7558__delegate.call(this, x, y, z, args)
        };
        G__7558.cljs$lang$maxFixedArity = 3;
        G__7558.cljs$lang$applyTo = function(arglist__7559) {
          var x = cljs.core.first(arglist__7559);
          var y = cljs.core.first(cljs.core.next(arglist__7559));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7559)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7559)));
          return G__7558__delegate(x, y, z, args)
        };
        G__7558.cljs$lang$arity$variadic = G__7558__delegate;
        return G__7558
      }();
      G__7557 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return G__7557__0.call(this);
          case 1:
            return G__7557__1.call(this, x);
          case 2:
            return G__7557__2.call(this, x, y);
          case 3:
            return G__7557__3.call(this, x, y, z);
          default:
            return G__7557__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
        }
        throw"Invalid arity: " + arguments.length;
      };
      G__7557.cljs$lang$maxFixedArity = 3;
      G__7557.cljs$lang$applyTo = G__7557__4.cljs$lang$applyTo;
      return G__7557
    }()
  };
  var comp__4 = function() {
    var G__7560__delegate = function(f1, f2, f3, fs) {
      var fs__7551 = cljs.core.reverse.call(null, cljs.core.list_STAR_.call(null, f1, f2, f3, fs));
      return function() {
        var G__7561__delegate = function(args) {
          var ret__7552 = cljs.core.apply.call(null, cljs.core.first.call(null, fs__7551), args);
          var fs__7553 = cljs.core.next.call(null, fs__7551);
          while(true) {
            if(fs__7553) {
              var G__7562 = cljs.core.first.call(null, fs__7553).call(null, ret__7552);
              var G__7563 = cljs.core.next.call(null, fs__7553);
              ret__7552 = G__7562;
              fs__7553 = G__7563;
              continue
            }else {
              return ret__7552
            }
            break
          }
        };
        var G__7561 = function(var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
          }
          return G__7561__delegate.call(this, args)
        };
        G__7561.cljs$lang$maxFixedArity = 0;
        G__7561.cljs$lang$applyTo = function(arglist__7564) {
          var args = cljs.core.seq(arglist__7564);
          return G__7561__delegate(args)
        };
        G__7561.cljs$lang$arity$variadic = G__7561__delegate;
        return G__7561
      }()
    };
    var G__7560 = function(f1, f2, f3, var_args) {
      var fs = null;
      if(goog.isDef(var_args)) {
        fs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
      }
      return G__7560__delegate.call(this, f1, f2, f3, fs)
    };
    G__7560.cljs$lang$maxFixedArity = 3;
    G__7560.cljs$lang$applyTo = function(arglist__7565) {
      var f1 = cljs.core.first(arglist__7565);
      var f2 = cljs.core.first(cljs.core.next(arglist__7565));
      var f3 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7565)));
      var fs = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7565)));
      return G__7560__delegate(f1, f2, f3, fs)
    };
    G__7560.cljs$lang$arity$variadic = G__7560__delegate;
    return G__7560
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
      var G__7566__delegate = function(args) {
        return cljs.core.apply.call(null, f, arg1, args)
      };
      var G__7566 = function(var_args) {
        var args = null;
        if(goog.isDef(var_args)) {
          args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
        }
        return G__7566__delegate.call(this, args)
      };
      G__7566.cljs$lang$maxFixedArity = 0;
      G__7566.cljs$lang$applyTo = function(arglist__7567) {
        var args = cljs.core.seq(arglist__7567);
        return G__7566__delegate(args)
      };
      G__7566.cljs$lang$arity$variadic = G__7566__delegate;
      return G__7566
    }()
  };
  var partial__3 = function(f, arg1, arg2) {
    return function() {
      var G__7568__delegate = function(args) {
        return cljs.core.apply.call(null, f, arg1, arg2, args)
      };
      var G__7568 = function(var_args) {
        var args = null;
        if(goog.isDef(var_args)) {
          args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
        }
        return G__7568__delegate.call(this, args)
      };
      G__7568.cljs$lang$maxFixedArity = 0;
      G__7568.cljs$lang$applyTo = function(arglist__7569) {
        var args = cljs.core.seq(arglist__7569);
        return G__7568__delegate(args)
      };
      G__7568.cljs$lang$arity$variadic = G__7568__delegate;
      return G__7568
    }()
  };
  var partial__4 = function(f, arg1, arg2, arg3) {
    return function() {
      var G__7570__delegate = function(args) {
        return cljs.core.apply.call(null, f, arg1, arg2, arg3, args)
      };
      var G__7570 = function(var_args) {
        var args = null;
        if(goog.isDef(var_args)) {
          args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
        }
        return G__7570__delegate.call(this, args)
      };
      G__7570.cljs$lang$maxFixedArity = 0;
      G__7570.cljs$lang$applyTo = function(arglist__7571) {
        var args = cljs.core.seq(arglist__7571);
        return G__7570__delegate(args)
      };
      G__7570.cljs$lang$arity$variadic = G__7570__delegate;
      return G__7570
    }()
  };
  var partial__5 = function() {
    var G__7572__delegate = function(f, arg1, arg2, arg3, more) {
      return function() {
        var G__7573__delegate = function(args) {
          return cljs.core.apply.call(null, f, arg1, arg2, arg3, cljs.core.concat.call(null, more, args))
        };
        var G__7573 = function(var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
          }
          return G__7573__delegate.call(this, args)
        };
        G__7573.cljs$lang$maxFixedArity = 0;
        G__7573.cljs$lang$applyTo = function(arglist__7574) {
          var args = cljs.core.seq(arglist__7574);
          return G__7573__delegate(args)
        };
        G__7573.cljs$lang$arity$variadic = G__7573__delegate;
        return G__7573
      }()
    };
    var G__7572 = function(f, arg1, arg2, arg3, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4), 0)
      }
      return G__7572__delegate.call(this, f, arg1, arg2, arg3, more)
    };
    G__7572.cljs$lang$maxFixedArity = 4;
    G__7572.cljs$lang$applyTo = function(arglist__7575) {
      var f = cljs.core.first(arglist__7575);
      var arg1 = cljs.core.first(cljs.core.next(arglist__7575));
      var arg2 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7575)));
      var arg3 = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__7575))));
      var more = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__7575))));
      return G__7572__delegate(f, arg1, arg2, arg3, more)
    };
    G__7572.cljs$lang$arity$variadic = G__7572__delegate;
    return G__7572
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
      var G__7576 = null;
      var G__7576__1 = function(a) {
        return f.call(null, a == null ? x : a)
      };
      var G__7576__2 = function(a, b) {
        return f.call(null, a == null ? x : a, b)
      };
      var G__7576__3 = function(a, b, c) {
        return f.call(null, a == null ? x : a, b, c)
      };
      var G__7576__4 = function() {
        var G__7577__delegate = function(a, b, c, ds) {
          return cljs.core.apply.call(null, f, a == null ? x : a, b, c, ds)
        };
        var G__7577 = function(a, b, c, var_args) {
          var ds = null;
          if(goog.isDef(var_args)) {
            ds = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__7577__delegate.call(this, a, b, c, ds)
        };
        G__7577.cljs$lang$maxFixedArity = 3;
        G__7577.cljs$lang$applyTo = function(arglist__7578) {
          var a = cljs.core.first(arglist__7578);
          var b = cljs.core.first(cljs.core.next(arglist__7578));
          var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7578)));
          var ds = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7578)));
          return G__7577__delegate(a, b, c, ds)
        };
        G__7577.cljs$lang$arity$variadic = G__7577__delegate;
        return G__7577
      }();
      G__7576 = function(a, b, c, var_args) {
        var ds = var_args;
        switch(arguments.length) {
          case 1:
            return G__7576__1.call(this, a);
          case 2:
            return G__7576__2.call(this, a, b);
          case 3:
            return G__7576__3.call(this, a, b, c);
          default:
            return G__7576__4.cljs$lang$arity$variadic(a, b, c, cljs.core.array_seq(arguments, 3))
        }
        throw"Invalid arity: " + arguments.length;
      };
      G__7576.cljs$lang$maxFixedArity = 3;
      G__7576.cljs$lang$applyTo = G__7576__4.cljs$lang$applyTo;
      return G__7576
    }()
  };
  var fnil__3 = function(f, x, y) {
    return function() {
      var G__7579 = null;
      var G__7579__2 = function(a, b) {
        return f.call(null, a == null ? x : a, b == null ? y : b)
      };
      var G__7579__3 = function(a, b, c) {
        return f.call(null, a == null ? x : a, b == null ? y : b, c)
      };
      var G__7579__4 = function() {
        var G__7580__delegate = function(a, b, c, ds) {
          return cljs.core.apply.call(null, f, a == null ? x : a, b == null ? y : b, c, ds)
        };
        var G__7580 = function(a, b, c, var_args) {
          var ds = null;
          if(goog.isDef(var_args)) {
            ds = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__7580__delegate.call(this, a, b, c, ds)
        };
        G__7580.cljs$lang$maxFixedArity = 3;
        G__7580.cljs$lang$applyTo = function(arglist__7581) {
          var a = cljs.core.first(arglist__7581);
          var b = cljs.core.first(cljs.core.next(arglist__7581));
          var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7581)));
          var ds = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7581)));
          return G__7580__delegate(a, b, c, ds)
        };
        G__7580.cljs$lang$arity$variadic = G__7580__delegate;
        return G__7580
      }();
      G__7579 = function(a, b, c, var_args) {
        var ds = var_args;
        switch(arguments.length) {
          case 2:
            return G__7579__2.call(this, a, b);
          case 3:
            return G__7579__3.call(this, a, b, c);
          default:
            return G__7579__4.cljs$lang$arity$variadic(a, b, c, cljs.core.array_seq(arguments, 3))
        }
        throw"Invalid arity: " + arguments.length;
      };
      G__7579.cljs$lang$maxFixedArity = 3;
      G__7579.cljs$lang$applyTo = G__7579__4.cljs$lang$applyTo;
      return G__7579
    }()
  };
  var fnil__4 = function(f, x, y, z) {
    return function() {
      var G__7582 = null;
      var G__7582__2 = function(a, b) {
        return f.call(null, a == null ? x : a, b == null ? y : b)
      };
      var G__7582__3 = function(a, b, c) {
        return f.call(null, a == null ? x : a, b == null ? y : b, c == null ? z : c)
      };
      var G__7582__4 = function() {
        var G__7583__delegate = function(a, b, c, ds) {
          return cljs.core.apply.call(null, f, a == null ? x : a, b == null ? y : b, c == null ? z : c, ds)
        };
        var G__7583 = function(a, b, c, var_args) {
          var ds = null;
          if(goog.isDef(var_args)) {
            ds = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__7583__delegate.call(this, a, b, c, ds)
        };
        G__7583.cljs$lang$maxFixedArity = 3;
        G__7583.cljs$lang$applyTo = function(arglist__7584) {
          var a = cljs.core.first(arglist__7584);
          var b = cljs.core.first(cljs.core.next(arglist__7584));
          var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7584)));
          var ds = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7584)));
          return G__7583__delegate(a, b, c, ds)
        };
        G__7583.cljs$lang$arity$variadic = G__7583__delegate;
        return G__7583
      }();
      G__7582 = function(a, b, c, var_args) {
        var ds = var_args;
        switch(arguments.length) {
          case 2:
            return G__7582__2.call(this, a, b);
          case 3:
            return G__7582__3.call(this, a, b, c);
          default:
            return G__7582__4.cljs$lang$arity$variadic(a, b, c, cljs.core.array_seq(arguments, 3))
        }
        throw"Invalid arity: " + arguments.length;
      };
      G__7582.cljs$lang$maxFixedArity = 3;
      G__7582.cljs$lang$applyTo = G__7582__4.cljs$lang$applyTo;
      return G__7582
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
  var mapi__7600 = function mapi(idx, coll) {
    return new cljs.core.LazySeq(null, false, function() {
      var temp__3974__auto____7608 = cljs.core.seq.call(null, coll);
      if(temp__3974__auto____7608) {
        var s__7609 = temp__3974__auto____7608;
        if(cljs.core.chunked_seq_QMARK_.call(null, s__7609)) {
          var c__7610 = cljs.core.chunk_first.call(null, s__7609);
          var size__7611 = cljs.core.count.call(null, c__7610);
          var b__7612 = cljs.core.chunk_buffer.call(null, size__7611);
          var n__2540__auto____7613 = size__7611;
          var i__7614 = 0;
          while(true) {
            if(i__7614 < n__2540__auto____7613) {
              cljs.core.chunk_append.call(null, b__7612, f.call(null, idx + i__7614, cljs.core._nth.call(null, c__7610, i__7614)));
              var G__7615 = i__7614 + 1;
              i__7614 = G__7615;
              continue
            }else {
            }
            break
          }
          return cljs.core.chunk_cons.call(null, cljs.core.chunk.call(null, b__7612), mapi.call(null, idx + size__7611, cljs.core.chunk_rest.call(null, s__7609)))
        }else {
          return cljs.core.cons.call(null, f.call(null, idx, cljs.core.first.call(null, s__7609)), mapi.call(null, idx + 1, cljs.core.rest.call(null, s__7609)))
        }
      }else {
        return null
      }
    }, null)
  };
  return mapi__7600.call(null, 0, coll)
};
cljs.core.keep = function keep(f, coll) {
  return new cljs.core.LazySeq(null, false, function() {
    var temp__3974__auto____7625 = cljs.core.seq.call(null, coll);
    if(temp__3974__auto____7625) {
      var s__7626 = temp__3974__auto____7625;
      if(cljs.core.chunked_seq_QMARK_.call(null, s__7626)) {
        var c__7627 = cljs.core.chunk_first.call(null, s__7626);
        var size__7628 = cljs.core.count.call(null, c__7627);
        var b__7629 = cljs.core.chunk_buffer.call(null, size__7628);
        var n__2540__auto____7630 = size__7628;
        var i__7631 = 0;
        while(true) {
          if(i__7631 < n__2540__auto____7630) {
            var x__7632 = f.call(null, cljs.core._nth.call(null, c__7627, i__7631));
            if(x__7632 == null) {
            }else {
              cljs.core.chunk_append.call(null, b__7629, x__7632)
            }
            var G__7634 = i__7631 + 1;
            i__7631 = G__7634;
            continue
          }else {
          }
          break
        }
        return cljs.core.chunk_cons.call(null, cljs.core.chunk.call(null, b__7629), keep.call(null, f, cljs.core.chunk_rest.call(null, s__7626)))
      }else {
        var x__7633 = f.call(null, cljs.core.first.call(null, s__7626));
        if(x__7633 == null) {
          return keep.call(null, f, cljs.core.rest.call(null, s__7626))
        }else {
          return cljs.core.cons.call(null, x__7633, keep.call(null, f, cljs.core.rest.call(null, s__7626)))
        }
      }
    }else {
      return null
    }
  }, null)
};
cljs.core.keep_indexed = function keep_indexed(f, coll) {
  var keepi__7660 = function keepi(idx, coll) {
    return new cljs.core.LazySeq(null, false, function() {
      var temp__3974__auto____7670 = cljs.core.seq.call(null, coll);
      if(temp__3974__auto____7670) {
        var s__7671 = temp__3974__auto____7670;
        if(cljs.core.chunked_seq_QMARK_.call(null, s__7671)) {
          var c__7672 = cljs.core.chunk_first.call(null, s__7671);
          var size__7673 = cljs.core.count.call(null, c__7672);
          var b__7674 = cljs.core.chunk_buffer.call(null, size__7673);
          var n__2540__auto____7675 = size__7673;
          var i__7676 = 0;
          while(true) {
            if(i__7676 < n__2540__auto____7675) {
              var x__7677 = f.call(null, idx + i__7676, cljs.core._nth.call(null, c__7672, i__7676));
              if(x__7677 == null) {
              }else {
                cljs.core.chunk_append.call(null, b__7674, x__7677)
              }
              var G__7679 = i__7676 + 1;
              i__7676 = G__7679;
              continue
            }else {
            }
            break
          }
          return cljs.core.chunk_cons.call(null, cljs.core.chunk.call(null, b__7674), keepi.call(null, idx + size__7673, cljs.core.chunk_rest.call(null, s__7671)))
        }else {
          var x__7678 = f.call(null, idx, cljs.core.first.call(null, s__7671));
          if(x__7678 == null) {
            return keepi.call(null, idx + 1, cljs.core.rest.call(null, s__7671))
          }else {
            return cljs.core.cons.call(null, x__7678, keepi.call(null, idx + 1, cljs.core.rest.call(null, s__7671)))
          }
        }
      }else {
        return null
      }
    }, null)
  };
  return keepi__7660.call(null, 0, coll)
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
          var and__3822__auto____7765 = p.call(null, x);
          if(cljs.core.truth_(and__3822__auto____7765)) {
            return p.call(null, y)
          }else {
            return and__3822__auto____7765
          }
        }())
      };
      var ep1__3 = function(x, y, z) {
        return cljs.core.boolean$.call(null, function() {
          var and__3822__auto____7766 = p.call(null, x);
          if(cljs.core.truth_(and__3822__auto____7766)) {
            var and__3822__auto____7767 = p.call(null, y);
            if(cljs.core.truth_(and__3822__auto____7767)) {
              return p.call(null, z)
            }else {
              return and__3822__auto____7767
            }
          }else {
            return and__3822__auto____7766
          }
        }())
      };
      var ep1__4 = function() {
        var G__7836__delegate = function(x, y, z, args) {
          return cljs.core.boolean$.call(null, function() {
            var and__3822__auto____7768 = ep1.call(null, x, y, z);
            if(cljs.core.truth_(and__3822__auto____7768)) {
              return cljs.core.every_QMARK_.call(null, p, args)
            }else {
              return and__3822__auto____7768
            }
          }())
        };
        var G__7836 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__7836__delegate.call(this, x, y, z, args)
        };
        G__7836.cljs$lang$maxFixedArity = 3;
        G__7836.cljs$lang$applyTo = function(arglist__7837) {
          var x = cljs.core.first(arglist__7837);
          var y = cljs.core.first(cljs.core.next(arglist__7837));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7837)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7837)));
          return G__7836__delegate(x, y, z, args)
        };
        G__7836.cljs$lang$arity$variadic = G__7836__delegate;
        return G__7836
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
          var and__3822__auto____7780 = p1.call(null, x);
          if(cljs.core.truth_(and__3822__auto____7780)) {
            return p2.call(null, x)
          }else {
            return and__3822__auto____7780
          }
        }())
      };
      var ep2__2 = function(x, y) {
        return cljs.core.boolean$.call(null, function() {
          var and__3822__auto____7781 = p1.call(null, x);
          if(cljs.core.truth_(and__3822__auto____7781)) {
            var and__3822__auto____7782 = p1.call(null, y);
            if(cljs.core.truth_(and__3822__auto____7782)) {
              var and__3822__auto____7783 = p2.call(null, x);
              if(cljs.core.truth_(and__3822__auto____7783)) {
                return p2.call(null, y)
              }else {
                return and__3822__auto____7783
              }
            }else {
              return and__3822__auto____7782
            }
          }else {
            return and__3822__auto____7781
          }
        }())
      };
      var ep2__3 = function(x, y, z) {
        return cljs.core.boolean$.call(null, function() {
          var and__3822__auto____7784 = p1.call(null, x);
          if(cljs.core.truth_(and__3822__auto____7784)) {
            var and__3822__auto____7785 = p1.call(null, y);
            if(cljs.core.truth_(and__3822__auto____7785)) {
              var and__3822__auto____7786 = p1.call(null, z);
              if(cljs.core.truth_(and__3822__auto____7786)) {
                var and__3822__auto____7787 = p2.call(null, x);
                if(cljs.core.truth_(and__3822__auto____7787)) {
                  var and__3822__auto____7788 = p2.call(null, y);
                  if(cljs.core.truth_(and__3822__auto____7788)) {
                    return p2.call(null, z)
                  }else {
                    return and__3822__auto____7788
                  }
                }else {
                  return and__3822__auto____7787
                }
              }else {
                return and__3822__auto____7786
              }
            }else {
              return and__3822__auto____7785
            }
          }else {
            return and__3822__auto____7784
          }
        }())
      };
      var ep2__4 = function() {
        var G__7838__delegate = function(x, y, z, args) {
          return cljs.core.boolean$.call(null, function() {
            var and__3822__auto____7789 = ep2.call(null, x, y, z);
            if(cljs.core.truth_(and__3822__auto____7789)) {
              return cljs.core.every_QMARK_.call(null, function(p1__7635_SHARP_) {
                var and__3822__auto____7790 = p1.call(null, p1__7635_SHARP_);
                if(cljs.core.truth_(and__3822__auto____7790)) {
                  return p2.call(null, p1__7635_SHARP_)
                }else {
                  return and__3822__auto____7790
                }
              }, args)
            }else {
              return and__3822__auto____7789
            }
          }())
        };
        var G__7838 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__7838__delegate.call(this, x, y, z, args)
        };
        G__7838.cljs$lang$maxFixedArity = 3;
        G__7838.cljs$lang$applyTo = function(arglist__7839) {
          var x = cljs.core.first(arglist__7839);
          var y = cljs.core.first(cljs.core.next(arglist__7839));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7839)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7839)));
          return G__7838__delegate(x, y, z, args)
        };
        G__7838.cljs$lang$arity$variadic = G__7838__delegate;
        return G__7838
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
          var and__3822__auto____7809 = p1.call(null, x);
          if(cljs.core.truth_(and__3822__auto____7809)) {
            var and__3822__auto____7810 = p2.call(null, x);
            if(cljs.core.truth_(and__3822__auto____7810)) {
              return p3.call(null, x)
            }else {
              return and__3822__auto____7810
            }
          }else {
            return and__3822__auto____7809
          }
        }())
      };
      var ep3__2 = function(x, y) {
        return cljs.core.boolean$.call(null, function() {
          var and__3822__auto____7811 = p1.call(null, x);
          if(cljs.core.truth_(and__3822__auto____7811)) {
            var and__3822__auto____7812 = p2.call(null, x);
            if(cljs.core.truth_(and__3822__auto____7812)) {
              var and__3822__auto____7813 = p3.call(null, x);
              if(cljs.core.truth_(and__3822__auto____7813)) {
                var and__3822__auto____7814 = p1.call(null, y);
                if(cljs.core.truth_(and__3822__auto____7814)) {
                  var and__3822__auto____7815 = p2.call(null, y);
                  if(cljs.core.truth_(and__3822__auto____7815)) {
                    return p3.call(null, y)
                  }else {
                    return and__3822__auto____7815
                  }
                }else {
                  return and__3822__auto____7814
                }
              }else {
                return and__3822__auto____7813
              }
            }else {
              return and__3822__auto____7812
            }
          }else {
            return and__3822__auto____7811
          }
        }())
      };
      var ep3__3 = function(x, y, z) {
        return cljs.core.boolean$.call(null, function() {
          var and__3822__auto____7816 = p1.call(null, x);
          if(cljs.core.truth_(and__3822__auto____7816)) {
            var and__3822__auto____7817 = p2.call(null, x);
            if(cljs.core.truth_(and__3822__auto____7817)) {
              var and__3822__auto____7818 = p3.call(null, x);
              if(cljs.core.truth_(and__3822__auto____7818)) {
                var and__3822__auto____7819 = p1.call(null, y);
                if(cljs.core.truth_(and__3822__auto____7819)) {
                  var and__3822__auto____7820 = p2.call(null, y);
                  if(cljs.core.truth_(and__3822__auto____7820)) {
                    var and__3822__auto____7821 = p3.call(null, y);
                    if(cljs.core.truth_(and__3822__auto____7821)) {
                      var and__3822__auto____7822 = p1.call(null, z);
                      if(cljs.core.truth_(and__3822__auto____7822)) {
                        var and__3822__auto____7823 = p2.call(null, z);
                        if(cljs.core.truth_(and__3822__auto____7823)) {
                          return p3.call(null, z)
                        }else {
                          return and__3822__auto____7823
                        }
                      }else {
                        return and__3822__auto____7822
                      }
                    }else {
                      return and__3822__auto____7821
                    }
                  }else {
                    return and__3822__auto____7820
                  }
                }else {
                  return and__3822__auto____7819
                }
              }else {
                return and__3822__auto____7818
              }
            }else {
              return and__3822__auto____7817
            }
          }else {
            return and__3822__auto____7816
          }
        }())
      };
      var ep3__4 = function() {
        var G__7840__delegate = function(x, y, z, args) {
          return cljs.core.boolean$.call(null, function() {
            var and__3822__auto____7824 = ep3.call(null, x, y, z);
            if(cljs.core.truth_(and__3822__auto____7824)) {
              return cljs.core.every_QMARK_.call(null, function(p1__7636_SHARP_) {
                var and__3822__auto____7825 = p1.call(null, p1__7636_SHARP_);
                if(cljs.core.truth_(and__3822__auto____7825)) {
                  var and__3822__auto____7826 = p2.call(null, p1__7636_SHARP_);
                  if(cljs.core.truth_(and__3822__auto____7826)) {
                    return p3.call(null, p1__7636_SHARP_)
                  }else {
                    return and__3822__auto____7826
                  }
                }else {
                  return and__3822__auto____7825
                }
              }, args)
            }else {
              return and__3822__auto____7824
            }
          }())
        };
        var G__7840 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__7840__delegate.call(this, x, y, z, args)
        };
        G__7840.cljs$lang$maxFixedArity = 3;
        G__7840.cljs$lang$applyTo = function(arglist__7841) {
          var x = cljs.core.first(arglist__7841);
          var y = cljs.core.first(cljs.core.next(arglist__7841));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7841)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7841)));
          return G__7840__delegate(x, y, z, args)
        };
        G__7840.cljs$lang$arity$variadic = G__7840__delegate;
        return G__7840
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
    var G__7842__delegate = function(p1, p2, p3, ps) {
      var ps__7827 = cljs.core.list_STAR_.call(null, p1, p2, p3, ps);
      return function() {
        var epn = null;
        var epn__0 = function() {
          return true
        };
        var epn__1 = function(x) {
          return cljs.core.every_QMARK_.call(null, function(p1__7637_SHARP_) {
            return p1__7637_SHARP_.call(null, x)
          }, ps__7827)
        };
        var epn__2 = function(x, y) {
          return cljs.core.every_QMARK_.call(null, function(p1__7638_SHARP_) {
            var and__3822__auto____7832 = p1__7638_SHARP_.call(null, x);
            if(cljs.core.truth_(and__3822__auto____7832)) {
              return p1__7638_SHARP_.call(null, y)
            }else {
              return and__3822__auto____7832
            }
          }, ps__7827)
        };
        var epn__3 = function(x, y, z) {
          return cljs.core.every_QMARK_.call(null, function(p1__7639_SHARP_) {
            var and__3822__auto____7833 = p1__7639_SHARP_.call(null, x);
            if(cljs.core.truth_(and__3822__auto____7833)) {
              var and__3822__auto____7834 = p1__7639_SHARP_.call(null, y);
              if(cljs.core.truth_(and__3822__auto____7834)) {
                return p1__7639_SHARP_.call(null, z)
              }else {
                return and__3822__auto____7834
              }
            }else {
              return and__3822__auto____7833
            }
          }, ps__7827)
        };
        var epn__4 = function() {
          var G__7843__delegate = function(x, y, z, args) {
            return cljs.core.boolean$.call(null, function() {
              var and__3822__auto____7835 = epn.call(null, x, y, z);
              if(cljs.core.truth_(and__3822__auto____7835)) {
                return cljs.core.every_QMARK_.call(null, function(p1__7640_SHARP_) {
                  return cljs.core.every_QMARK_.call(null, p1__7640_SHARP_, args)
                }, ps__7827)
              }else {
                return and__3822__auto____7835
              }
            }())
          };
          var G__7843 = function(x, y, z, var_args) {
            var args = null;
            if(goog.isDef(var_args)) {
              args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
            }
            return G__7843__delegate.call(this, x, y, z, args)
          };
          G__7843.cljs$lang$maxFixedArity = 3;
          G__7843.cljs$lang$applyTo = function(arglist__7844) {
            var x = cljs.core.first(arglist__7844);
            var y = cljs.core.first(cljs.core.next(arglist__7844));
            var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7844)));
            var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7844)));
            return G__7843__delegate(x, y, z, args)
          };
          G__7843.cljs$lang$arity$variadic = G__7843__delegate;
          return G__7843
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
    var G__7842 = function(p1, p2, p3, var_args) {
      var ps = null;
      if(goog.isDef(var_args)) {
        ps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
      }
      return G__7842__delegate.call(this, p1, p2, p3, ps)
    };
    G__7842.cljs$lang$maxFixedArity = 3;
    G__7842.cljs$lang$applyTo = function(arglist__7845) {
      var p1 = cljs.core.first(arglist__7845);
      var p2 = cljs.core.first(cljs.core.next(arglist__7845));
      var p3 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7845)));
      var ps = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7845)));
      return G__7842__delegate(p1, p2, p3, ps)
    };
    G__7842.cljs$lang$arity$variadic = G__7842__delegate;
    return G__7842
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
        var or__3824__auto____7926 = p.call(null, x);
        if(cljs.core.truth_(or__3824__auto____7926)) {
          return or__3824__auto____7926
        }else {
          return p.call(null, y)
        }
      };
      var sp1__3 = function(x, y, z) {
        var or__3824__auto____7927 = p.call(null, x);
        if(cljs.core.truth_(or__3824__auto____7927)) {
          return or__3824__auto____7927
        }else {
          var or__3824__auto____7928 = p.call(null, y);
          if(cljs.core.truth_(or__3824__auto____7928)) {
            return or__3824__auto____7928
          }else {
            return p.call(null, z)
          }
        }
      };
      var sp1__4 = function() {
        var G__7997__delegate = function(x, y, z, args) {
          var or__3824__auto____7929 = sp1.call(null, x, y, z);
          if(cljs.core.truth_(or__3824__auto____7929)) {
            return or__3824__auto____7929
          }else {
            return cljs.core.some.call(null, p, args)
          }
        };
        var G__7997 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__7997__delegate.call(this, x, y, z, args)
        };
        G__7997.cljs$lang$maxFixedArity = 3;
        G__7997.cljs$lang$applyTo = function(arglist__7998) {
          var x = cljs.core.first(arglist__7998);
          var y = cljs.core.first(cljs.core.next(arglist__7998));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7998)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7998)));
          return G__7997__delegate(x, y, z, args)
        };
        G__7997.cljs$lang$arity$variadic = G__7997__delegate;
        return G__7997
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
        var or__3824__auto____7941 = p1.call(null, x);
        if(cljs.core.truth_(or__3824__auto____7941)) {
          return or__3824__auto____7941
        }else {
          return p2.call(null, x)
        }
      };
      var sp2__2 = function(x, y) {
        var or__3824__auto____7942 = p1.call(null, x);
        if(cljs.core.truth_(or__3824__auto____7942)) {
          return or__3824__auto____7942
        }else {
          var or__3824__auto____7943 = p1.call(null, y);
          if(cljs.core.truth_(or__3824__auto____7943)) {
            return or__3824__auto____7943
          }else {
            var or__3824__auto____7944 = p2.call(null, x);
            if(cljs.core.truth_(or__3824__auto____7944)) {
              return or__3824__auto____7944
            }else {
              return p2.call(null, y)
            }
          }
        }
      };
      var sp2__3 = function(x, y, z) {
        var or__3824__auto____7945 = p1.call(null, x);
        if(cljs.core.truth_(or__3824__auto____7945)) {
          return or__3824__auto____7945
        }else {
          var or__3824__auto____7946 = p1.call(null, y);
          if(cljs.core.truth_(or__3824__auto____7946)) {
            return or__3824__auto____7946
          }else {
            var or__3824__auto____7947 = p1.call(null, z);
            if(cljs.core.truth_(or__3824__auto____7947)) {
              return or__3824__auto____7947
            }else {
              var or__3824__auto____7948 = p2.call(null, x);
              if(cljs.core.truth_(or__3824__auto____7948)) {
                return or__3824__auto____7948
              }else {
                var or__3824__auto____7949 = p2.call(null, y);
                if(cljs.core.truth_(or__3824__auto____7949)) {
                  return or__3824__auto____7949
                }else {
                  return p2.call(null, z)
                }
              }
            }
          }
        }
      };
      var sp2__4 = function() {
        var G__7999__delegate = function(x, y, z, args) {
          var or__3824__auto____7950 = sp2.call(null, x, y, z);
          if(cljs.core.truth_(or__3824__auto____7950)) {
            return or__3824__auto____7950
          }else {
            return cljs.core.some.call(null, function(p1__7680_SHARP_) {
              var or__3824__auto____7951 = p1.call(null, p1__7680_SHARP_);
              if(cljs.core.truth_(or__3824__auto____7951)) {
                return or__3824__auto____7951
              }else {
                return p2.call(null, p1__7680_SHARP_)
              }
            }, args)
          }
        };
        var G__7999 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__7999__delegate.call(this, x, y, z, args)
        };
        G__7999.cljs$lang$maxFixedArity = 3;
        G__7999.cljs$lang$applyTo = function(arglist__8000) {
          var x = cljs.core.first(arglist__8000);
          var y = cljs.core.first(cljs.core.next(arglist__8000));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8000)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8000)));
          return G__7999__delegate(x, y, z, args)
        };
        G__7999.cljs$lang$arity$variadic = G__7999__delegate;
        return G__7999
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
        var or__3824__auto____7970 = p1.call(null, x);
        if(cljs.core.truth_(or__3824__auto____7970)) {
          return or__3824__auto____7970
        }else {
          var or__3824__auto____7971 = p2.call(null, x);
          if(cljs.core.truth_(or__3824__auto____7971)) {
            return or__3824__auto____7971
          }else {
            return p3.call(null, x)
          }
        }
      };
      var sp3__2 = function(x, y) {
        var or__3824__auto____7972 = p1.call(null, x);
        if(cljs.core.truth_(or__3824__auto____7972)) {
          return or__3824__auto____7972
        }else {
          var or__3824__auto____7973 = p2.call(null, x);
          if(cljs.core.truth_(or__3824__auto____7973)) {
            return or__3824__auto____7973
          }else {
            var or__3824__auto____7974 = p3.call(null, x);
            if(cljs.core.truth_(or__3824__auto____7974)) {
              return or__3824__auto____7974
            }else {
              var or__3824__auto____7975 = p1.call(null, y);
              if(cljs.core.truth_(or__3824__auto____7975)) {
                return or__3824__auto____7975
              }else {
                var or__3824__auto____7976 = p2.call(null, y);
                if(cljs.core.truth_(or__3824__auto____7976)) {
                  return or__3824__auto____7976
                }else {
                  return p3.call(null, y)
                }
              }
            }
          }
        }
      };
      var sp3__3 = function(x, y, z) {
        var or__3824__auto____7977 = p1.call(null, x);
        if(cljs.core.truth_(or__3824__auto____7977)) {
          return or__3824__auto____7977
        }else {
          var or__3824__auto____7978 = p2.call(null, x);
          if(cljs.core.truth_(or__3824__auto____7978)) {
            return or__3824__auto____7978
          }else {
            var or__3824__auto____7979 = p3.call(null, x);
            if(cljs.core.truth_(or__3824__auto____7979)) {
              return or__3824__auto____7979
            }else {
              var or__3824__auto____7980 = p1.call(null, y);
              if(cljs.core.truth_(or__3824__auto____7980)) {
                return or__3824__auto____7980
              }else {
                var or__3824__auto____7981 = p2.call(null, y);
                if(cljs.core.truth_(or__3824__auto____7981)) {
                  return or__3824__auto____7981
                }else {
                  var or__3824__auto____7982 = p3.call(null, y);
                  if(cljs.core.truth_(or__3824__auto____7982)) {
                    return or__3824__auto____7982
                  }else {
                    var or__3824__auto____7983 = p1.call(null, z);
                    if(cljs.core.truth_(or__3824__auto____7983)) {
                      return or__3824__auto____7983
                    }else {
                      var or__3824__auto____7984 = p2.call(null, z);
                      if(cljs.core.truth_(or__3824__auto____7984)) {
                        return or__3824__auto____7984
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
        var G__8001__delegate = function(x, y, z, args) {
          var or__3824__auto____7985 = sp3.call(null, x, y, z);
          if(cljs.core.truth_(or__3824__auto____7985)) {
            return or__3824__auto____7985
          }else {
            return cljs.core.some.call(null, function(p1__7681_SHARP_) {
              var or__3824__auto____7986 = p1.call(null, p1__7681_SHARP_);
              if(cljs.core.truth_(or__3824__auto____7986)) {
                return or__3824__auto____7986
              }else {
                var or__3824__auto____7987 = p2.call(null, p1__7681_SHARP_);
                if(cljs.core.truth_(or__3824__auto____7987)) {
                  return or__3824__auto____7987
                }else {
                  return p3.call(null, p1__7681_SHARP_)
                }
              }
            }, args)
          }
        };
        var G__8001 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__8001__delegate.call(this, x, y, z, args)
        };
        G__8001.cljs$lang$maxFixedArity = 3;
        G__8001.cljs$lang$applyTo = function(arglist__8002) {
          var x = cljs.core.first(arglist__8002);
          var y = cljs.core.first(cljs.core.next(arglist__8002));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8002)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8002)));
          return G__8001__delegate(x, y, z, args)
        };
        G__8001.cljs$lang$arity$variadic = G__8001__delegate;
        return G__8001
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
    var G__8003__delegate = function(p1, p2, p3, ps) {
      var ps__7988 = cljs.core.list_STAR_.call(null, p1, p2, p3, ps);
      return function() {
        var spn = null;
        var spn__0 = function() {
          return null
        };
        var spn__1 = function(x) {
          return cljs.core.some.call(null, function(p1__7682_SHARP_) {
            return p1__7682_SHARP_.call(null, x)
          }, ps__7988)
        };
        var spn__2 = function(x, y) {
          return cljs.core.some.call(null, function(p1__7683_SHARP_) {
            var or__3824__auto____7993 = p1__7683_SHARP_.call(null, x);
            if(cljs.core.truth_(or__3824__auto____7993)) {
              return or__3824__auto____7993
            }else {
              return p1__7683_SHARP_.call(null, y)
            }
          }, ps__7988)
        };
        var spn__3 = function(x, y, z) {
          return cljs.core.some.call(null, function(p1__7684_SHARP_) {
            var or__3824__auto____7994 = p1__7684_SHARP_.call(null, x);
            if(cljs.core.truth_(or__3824__auto____7994)) {
              return or__3824__auto____7994
            }else {
              var or__3824__auto____7995 = p1__7684_SHARP_.call(null, y);
              if(cljs.core.truth_(or__3824__auto____7995)) {
                return or__3824__auto____7995
              }else {
                return p1__7684_SHARP_.call(null, z)
              }
            }
          }, ps__7988)
        };
        var spn__4 = function() {
          var G__8004__delegate = function(x, y, z, args) {
            var or__3824__auto____7996 = spn.call(null, x, y, z);
            if(cljs.core.truth_(or__3824__auto____7996)) {
              return or__3824__auto____7996
            }else {
              return cljs.core.some.call(null, function(p1__7685_SHARP_) {
                return cljs.core.some.call(null, p1__7685_SHARP_, args)
              }, ps__7988)
            }
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
    var G__8003 = function(p1, p2, p3, var_args) {
      var ps = null;
      if(goog.isDef(var_args)) {
        ps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
      }
      return G__8003__delegate.call(this, p1, p2, p3, ps)
    };
    G__8003.cljs$lang$maxFixedArity = 3;
    G__8003.cljs$lang$applyTo = function(arglist__8006) {
      var p1 = cljs.core.first(arglist__8006);
      var p2 = cljs.core.first(cljs.core.next(arglist__8006));
      var p3 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8006)));
      var ps = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8006)));
      return G__8003__delegate(p1, p2, p3, ps)
    };
    G__8003.cljs$lang$arity$variadic = G__8003__delegate;
    return G__8003
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
      var temp__3974__auto____8025 = cljs.core.seq.call(null, coll);
      if(temp__3974__auto____8025) {
        var s__8026 = temp__3974__auto____8025;
        if(cljs.core.chunked_seq_QMARK_.call(null, s__8026)) {
          var c__8027 = cljs.core.chunk_first.call(null, s__8026);
          var size__8028 = cljs.core.count.call(null, c__8027);
          var b__8029 = cljs.core.chunk_buffer.call(null, size__8028);
          var n__2540__auto____8030 = size__8028;
          var i__8031 = 0;
          while(true) {
            if(i__8031 < n__2540__auto____8030) {
              cljs.core.chunk_append.call(null, b__8029, f.call(null, cljs.core._nth.call(null, c__8027, i__8031)));
              var G__8043 = i__8031 + 1;
              i__8031 = G__8043;
              continue
            }else {
            }
            break
          }
          return cljs.core.chunk_cons.call(null, cljs.core.chunk.call(null, b__8029), map.call(null, f, cljs.core.chunk_rest.call(null, s__8026)))
        }else {
          return cljs.core.cons.call(null, f.call(null, cljs.core.first.call(null, s__8026)), map.call(null, f, cljs.core.rest.call(null, s__8026)))
        }
      }else {
        return null
      }
    }, null)
  };
  var map__3 = function(f, c1, c2) {
    return new cljs.core.LazySeq(null, false, function() {
      var s1__8032 = cljs.core.seq.call(null, c1);
      var s2__8033 = cljs.core.seq.call(null, c2);
      if(function() {
        var and__3822__auto____8034 = s1__8032;
        if(and__3822__auto____8034) {
          return s2__8033
        }else {
          return and__3822__auto____8034
        }
      }()) {
        return cljs.core.cons.call(null, f.call(null, cljs.core.first.call(null, s1__8032), cljs.core.first.call(null, s2__8033)), map.call(null, f, cljs.core.rest.call(null, s1__8032), cljs.core.rest.call(null, s2__8033)))
      }else {
        return null
      }
    }, null)
  };
  var map__4 = function(f, c1, c2, c3) {
    return new cljs.core.LazySeq(null, false, function() {
      var s1__8035 = cljs.core.seq.call(null, c1);
      var s2__8036 = cljs.core.seq.call(null, c2);
      var s3__8037 = cljs.core.seq.call(null, c3);
      if(function() {
        var and__3822__auto____8038 = s1__8035;
        if(and__3822__auto____8038) {
          var and__3822__auto____8039 = s2__8036;
          if(and__3822__auto____8039) {
            return s3__8037
          }else {
            return and__3822__auto____8039
          }
        }else {
          return and__3822__auto____8038
        }
      }()) {
        return cljs.core.cons.call(null, f.call(null, cljs.core.first.call(null, s1__8035), cljs.core.first.call(null, s2__8036), cljs.core.first.call(null, s3__8037)), map.call(null, f, cljs.core.rest.call(null, s1__8035), cljs.core.rest.call(null, s2__8036), cljs.core.rest.call(null, s3__8037)))
      }else {
        return null
      }
    }, null)
  };
  var map__5 = function() {
    var G__8044__delegate = function(f, c1, c2, c3, colls) {
      var step__8042 = function step(cs) {
        return new cljs.core.LazySeq(null, false, function() {
          var ss__8041 = map.call(null, cljs.core.seq, cs);
          if(cljs.core.every_QMARK_.call(null, cljs.core.identity, ss__8041)) {
            return cljs.core.cons.call(null, map.call(null, cljs.core.first, ss__8041), step.call(null, map.call(null, cljs.core.rest, ss__8041)))
          }else {
            return null
          }
        }, null)
      };
      return map.call(null, function(p1__7846_SHARP_) {
        return cljs.core.apply.call(null, f, p1__7846_SHARP_)
      }, step__8042.call(null, cljs.core.conj.call(null, colls, c3, c2, c1)))
    };
    var G__8044 = function(f, c1, c2, c3, var_args) {
      var colls = null;
      if(goog.isDef(var_args)) {
        colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4), 0)
      }
      return G__8044__delegate.call(this, f, c1, c2, c3, colls)
    };
    G__8044.cljs$lang$maxFixedArity = 4;
    G__8044.cljs$lang$applyTo = function(arglist__8045) {
      var f = cljs.core.first(arglist__8045);
      var c1 = cljs.core.first(cljs.core.next(arglist__8045));
      var c2 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8045)));
      var c3 = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__8045))));
      var colls = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__8045))));
      return G__8044__delegate(f, c1, c2, c3, colls)
    };
    G__8044.cljs$lang$arity$variadic = G__8044__delegate;
    return G__8044
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
      var temp__3974__auto____8048 = cljs.core.seq.call(null, coll);
      if(temp__3974__auto____8048) {
        var s__8049 = temp__3974__auto____8048;
        return cljs.core.cons.call(null, cljs.core.first.call(null, s__8049), take.call(null, n - 1, cljs.core.rest.call(null, s__8049)))
      }else {
        return null
      }
    }else {
      return null
    }
  }, null)
};
cljs.core.drop = function drop(n, coll) {
  var step__8055 = function(n, coll) {
    while(true) {
      var s__8053 = cljs.core.seq.call(null, coll);
      if(cljs.core.truth_(function() {
        var and__3822__auto____8054 = n > 0;
        if(and__3822__auto____8054) {
          return s__8053
        }else {
          return and__3822__auto____8054
        }
      }())) {
        var G__8056 = n - 1;
        var G__8057 = cljs.core.rest.call(null, s__8053);
        n = G__8056;
        coll = G__8057;
        continue
      }else {
        return s__8053
      }
      break
    }
  };
  return new cljs.core.LazySeq(null, false, function() {
    return step__8055.call(null, n, coll)
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
  var s__8060 = cljs.core.seq.call(null, coll);
  var lead__8061 = cljs.core.seq.call(null, cljs.core.drop.call(null, n, coll));
  while(true) {
    if(lead__8061) {
      var G__8062 = cljs.core.next.call(null, s__8060);
      var G__8063 = cljs.core.next.call(null, lead__8061);
      s__8060 = G__8062;
      lead__8061 = G__8063;
      continue
    }else {
      return s__8060
    }
    break
  }
};
cljs.core.drop_while = function drop_while(pred, coll) {
  var step__8069 = function(pred, coll) {
    while(true) {
      var s__8067 = cljs.core.seq.call(null, coll);
      if(cljs.core.truth_(function() {
        var and__3822__auto____8068 = s__8067;
        if(and__3822__auto____8068) {
          return pred.call(null, cljs.core.first.call(null, s__8067))
        }else {
          return and__3822__auto____8068
        }
      }())) {
        var G__8070 = pred;
        var G__8071 = cljs.core.rest.call(null, s__8067);
        pred = G__8070;
        coll = G__8071;
        continue
      }else {
        return s__8067
      }
      break
    }
  };
  return new cljs.core.LazySeq(null, false, function() {
    return step__8069.call(null, pred, coll)
  }, null)
};
cljs.core.cycle = function cycle(coll) {
  return new cljs.core.LazySeq(null, false, function() {
    var temp__3974__auto____8074 = cljs.core.seq.call(null, coll);
    if(temp__3974__auto____8074) {
      var s__8075 = temp__3974__auto____8074;
      return cljs.core.concat.call(null, s__8075, cycle.call(null, s__8075))
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
      var s1__8080 = cljs.core.seq.call(null, c1);
      var s2__8081 = cljs.core.seq.call(null, c2);
      if(function() {
        var and__3822__auto____8082 = s1__8080;
        if(and__3822__auto____8082) {
          return s2__8081
        }else {
          return and__3822__auto____8082
        }
      }()) {
        return cljs.core.cons.call(null, cljs.core.first.call(null, s1__8080), cljs.core.cons.call(null, cljs.core.first.call(null, s2__8081), interleave.call(null, cljs.core.rest.call(null, s1__8080), cljs.core.rest.call(null, s2__8081))))
      }else {
        return null
      }
    }, null)
  };
  var interleave__3 = function() {
    var G__8084__delegate = function(c1, c2, colls) {
      return new cljs.core.LazySeq(null, false, function() {
        var ss__8083 = cljs.core.map.call(null, cljs.core.seq, cljs.core.conj.call(null, colls, c2, c1));
        if(cljs.core.every_QMARK_.call(null, cljs.core.identity, ss__8083)) {
          return cljs.core.concat.call(null, cljs.core.map.call(null, cljs.core.first, ss__8083), cljs.core.apply.call(null, interleave, cljs.core.map.call(null, cljs.core.rest, ss__8083)))
        }else {
          return null
        }
      }, null)
    };
    var G__8084 = function(c1, c2, var_args) {
      var colls = null;
      if(goog.isDef(var_args)) {
        colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__8084__delegate.call(this, c1, c2, colls)
    };
    G__8084.cljs$lang$maxFixedArity = 2;
    G__8084.cljs$lang$applyTo = function(arglist__8085) {
      var c1 = cljs.core.first(arglist__8085);
      var c2 = cljs.core.first(cljs.core.next(arglist__8085));
      var colls = cljs.core.rest(cljs.core.next(arglist__8085));
      return G__8084__delegate(c1, c2, colls)
    };
    G__8084.cljs$lang$arity$variadic = G__8084__delegate;
    return G__8084
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
  var cat__8095 = function cat(coll, colls) {
    return new cljs.core.LazySeq(null, false, function() {
      var temp__3971__auto____8093 = cljs.core.seq.call(null, coll);
      if(temp__3971__auto____8093) {
        var coll__8094 = temp__3971__auto____8093;
        return cljs.core.cons.call(null, cljs.core.first.call(null, coll__8094), cat.call(null, cljs.core.rest.call(null, coll__8094), colls))
      }else {
        if(cljs.core.seq.call(null, colls)) {
          return cat.call(null, cljs.core.first.call(null, colls), cljs.core.rest.call(null, colls))
        }else {
          return null
        }
      }
    }, null)
  };
  return cat__8095.call(null, null, colls)
};
cljs.core.mapcat = function() {
  var mapcat = null;
  var mapcat__2 = function(f, coll) {
    return cljs.core.flatten1.call(null, cljs.core.map.call(null, f, coll))
  };
  var mapcat__3 = function() {
    var G__8096__delegate = function(f, coll, colls) {
      return cljs.core.flatten1.call(null, cljs.core.apply.call(null, cljs.core.map, f, coll, colls))
    };
    var G__8096 = function(f, coll, var_args) {
      var colls = null;
      if(goog.isDef(var_args)) {
        colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__8096__delegate.call(this, f, coll, colls)
    };
    G__8096.cljs$lang$maxFixedArity = 2;
    G__8096.cljs$lang$applyTo = function(arglist__8097) {
      var f = cljs.core.first(arglist__8097);
      var coll = cljs.core.first(cljs.core.next(arglist__8097));
      var colls = cljs.core.rest(cljs.core.next(arglist__8097));
      return G__8096__delegate(f, coll, colls)
    };
    G__8096.cljs$lang$arity$variadic = G__8096__delegate;
    return G__8096
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
    var temp__3974__auto____8107 = cljs.core.seq.call(null, coll);
    if(temp__3974__auto____8107) {
      var s__8108 = temp__3974__auto____8107;
      if(cljs.core.chunked_seq_QMARK_.call(null, s__8108)) {
        var c__8109 = cljs.core.chunk_first.call(null, s__8108);
        var size__8110 = cljs.core.count.call(null, c__8109);
        var b__8111 = cljs.core.chunk_buffer.call(null, size__8110);
        var n__2540__auto____8112 = size__8110;
        var i__8113 = 0;
        while(true) {
          if(i__8113 < n__2540__auto____8112) {
            if(cljs.core.truth_(pred.call(null, cljs.core._nth.call(null, c__8109, i__8113)))) {
              cljs.core.chunk_append.call(null, b__8111, cljs.core._nth.call(null, c__8109, i__8113))
            }else {
            }
            var G__8116 = i__8113 + 1;
            i__8113 = G__8116;
            continue
          }else {
          }
          break
        }
        return cljs.core.chunk_cons.call(null, cljs.core.chunk.call(null, b__8111), filter.call(null, pred, cljs.core.chunk_rest.call(null, s__8108)))
      }else {
        var f__8114 = cljs.core.first.call(null, s__8108);
        var r__8115 = cljs.core.rest.call(null, s__8108);
        if(cljs.core.truth_(pred.call(null, f__8114))) {
          return cljs.core.cons.call(null, f__8114, filter.call(null, pred, r__8115))
        }else {
          return filter.call(null, pred, r__8115)
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
  var walk__8119 = function walk(node) {
    return new cljs.core.LazySeq(null, false, function() {
      return cljs.core.cons.call(null, node, cljs.core.truth_(branch_QMARK_.call(null, node)) ? cljs.core.mapcat.call(null, walk, children.call(null, node)) : null)
    }, null)
  };
  return walk__8119.call(null, root)
};
cljs.core.flatten = function flatten(x) {
  return cljs.core.filter.call(null, function(p1__8117_SHARP_) {
    return!cljs.core.sequential_QMARK_.call(null, p1__8117_SHARP_)
  }, cljs.core.rest.call(null, cljs.core.tree_seq.call(null, cljs.core.sequential_QMARK_, cljs.core.seq, x)))
};
cljs.core.into = function into(to, from) {
  if(function() {
    var G__8123__8124 = to;
    if(G__8123__8124) {
      if(function() {
        var or__3824__auto____8125 = G__8123__8124.cljs$lang$protocol_mask$partition1$ & 1;
        if(or__3824__auto____8125) {
          return or__3824__auto____8125
        }else {
          return G__8123__8124.cljs$core$IEditableCollection$
        }
      }()) {
        return true
      }else {
        if(!G__8123__8124.cljs$lang$protocol_mask$partition1$) {
          return cljs.core.type_satisfies_.call(null, cljs.core.IEditableCollection, G__8123__8124)
        }else {
          return false
        }
      }
    }else {
      return cljs.core.type_satisfies_.call(null, cljs.core.IEditableCollection, G__8123__8124)
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
    var G__8126__delegate = function(f, c1, c2, c3, colls) {
      return cljs.core.into.call(null, cljs.core.PersistentVector.EMPTY, cljs.core.apply.call(null, cljs.core.map, f, c1, c2, c3, colls))
    };
    var G__8126 = function(f, c1, c2, c3, var_args) {
      var colls = null;
      if(goog.isDef(var_args)) {
        colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4), 0)
      }
      return G__8126__delegate.call(this, f, c1, c2, c3, colls)
    };
    G__8126.cljs$lang$maxFixedArity = 4;
    G__8126.cljs$lang$applyTo = function(arglist__8127) {
      var f = cljs.core.first(arglist__8127);
      var c1 = cljs.core.first(cljs.core.next(arglist__8127));
      var c2 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8127)));
      var c3 = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__8127))));
      var colls = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__8127))));
      return G__8126__delegate(f, c1, c2, c3, colls)
    };
    G__8126.cljs$lang$arity$variadic = G__8126__delegate;
    return G__8126
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
      var temp__3974__auto____8134 = cljs.core.seq.call(null, coll);
      if(temp__3974__auto____8134) {
        var s__8135 = temp__3974__auto____8134;
        var p__8136 = cljs.core.take.call(null, n, s__8135);
        if(n === cljs.core.count.call(null, p__8136)) {
          return cljs.core.cons.call(null, p__8136, partition.call(null, n, step, cljs.core.drop.call(null, step, s__8135)))
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
      var temp__3974__auto____8137 = cljs.core.seq.call(null, coll);
      if(temp__3974__auto____8137) {
        var s__8138 = temp__3974__auto____8137;
        var p__8139 = cljs.core.take.call(null, n, s__8138);
        if(n === cljs.core.count.call(null, p__8139)) {
          return cljs.core.cons.call(null, p__8139, partition.call(null, n, step, pad, cljs.core.drop.call(null, step, s__8138)))
        }else {
          return cljs.core.list.call(null, cljs.core.take.call(null, n, cljs.core.concat.call(null, p__8139, pad)))
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
    var sentinel__8144 = cljs.core.lookup_sentinel;
    var m__8145 = m;
    var ks__8146 = cljs.core.seq.call(null, ks);
    while(true) {
      if(ks__8146) {
        var m__8147 = cljs.core._lookup.call(null, m__8145, cljs.core.first.call(null, ks__8146), sentinel__8144);
        if(sentinel__8144 === m__8147) {
          return not_found
        }else {
          var G__8148 = sentinel__8144;
          var G__8149 = m__8147;
          var G__8150 = cljs.core.next.call(null, ks__8146);
          sentinel__8144 = G__8148;
          m__8145 = G__8149;
          ks__8146 = G__8150;
          continue
        }
      }else {
        return m__8145
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
cljs.core.assoc_in = function assoc_in(m, p__8151, v) {
  var vec__8156__8157 = p__8151;
  var k__8158 = cljs.core.nth.call(null, vec__8156__8157, 0, null);
  var ks__8159 = cljs.core.nthnext.call(null, vec__8156__8157, 1);
  if(cljs.core.truth_(ks__8159)) {
    return cljs.core.assoc.call(null, m, k__8158, assoc_in.call(null, cljs.core._lookup.call(null, m, k__8158, null), ks__8159, v))
  }else {
    return cljs.core.assoc.call(null, m, k__8158, v)
  }
};
cljs.core.update_in = function() {
  var update_in__delegate = function(m, p__8160, f, args) {
    var vec__8165__8166 = p__8160;
    var k__8167 = cljs.core.nth.call(null, vec__8165__8166, 0, null);
    var ks__8168 = cljs.core.nthnext.call(null, vec__8165__8166, 1);
    if(cljs.core.truth_(ks__8168)) {
      return cljs.core.assoc.call(null, m, k__8167, cljs.core.apply.call(null, update_in, cljs.core._lookup.call(null, m, k__8167, null), ks__8168, f, args))
    }else {
      return cljs.core.assoc.call(null, m, k__8167, cljs.core.apply.call(null, f, cljs.core._lookup.call(null, m, k__8167, null), args))
    }
  };
  var update_in = function(m, p__8160, f, var_args) {
    var args = null;
    if(goog.isDef(var_args)) {
      args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
    }
    return update_in__delegate.call(this, m, p__8160, f, args)
  };
  update_in.cljs$lang$maxFixedArity = 3;
  update_in.cljs$lang$applyTo = function(arglist__8169) {
    var m = cljs.core.first(arglist__8169);
    var p__8160 = cljs.core.first(cljs.core.next(arglist__8169));
    var f = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8169)));
    var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8169)));
    return update_in__delegate(m, p__8160, f, args)
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
cljs.core.Vector.cljs$lang$ctorPrSeq = function(this__2322__auto__) {
  return cljs.core.list.call(null, "cljs.core/Vector")
};
cljs.core.Vector.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__8172 = this;
  var h__2205__auto____8173 = this__8172.__hash;
  if(!(h__2205__auto____8173 == null)) {
    return h__2205__auto____8173
  }else {
    var h__2205__auto____8174 = cljs.core.hash_coll.call(null, coll);
    this__8172.__hash = h__2205__auto____8174;
    return h__2205__auto____8174
  }
};
cljs.core.Vector.prototype.cljs$core$ILookup$_lookup$arity$2 = function(coll, k) {
  var this__8175 = this;
  return coll.cljs$core$IIndexed$_nth$arity$3(coll, k, null)
};
cljs.core.Vector.prototype.cljs$core$ILookup$_lookup$arity$3 = function(coll, k, not_found) {
  var this__8176 = this;
  return coll.cljs$core$IIndexed$_nth$arity$3(coll, k, not_found)
};
cljs.core.Vector.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(coll, k, v) {
  var this__8177 = this;
  var new_array__8178 = this__8177.array.slice();
  new_array__8178[k] = v;
  return new cljs.core.Vector(this__8177.meta, new_array__8178, null)
};
cljs.core.Vector.prototype.call = function() {
  var G__8209 = null;
  var G__8209__2 = function(this_sym8179, k) {
    var this__8181 = this;
    var this_sym8179__8182 = this;
    var coll__8183 = this_sym8179__8182;
    return coll__8183.cljs$core$ILookup$_lookup$arity$2(coll__8183, k)
  };
  var G__8209__3 = function(this_sym8180, k, not_found) {
    var this__8181 = this;
    var this_sym8180__8184 = this;
    var coll__8185 = this_sym8180__8184;
    return coll__8185.cljs$core$ILookup$_lookup$arity$3(coll__8185, k, not_found)
  };
  G__8209 = function(this_sym8180, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__8209__2.call(this, this_sym8180, k);
      case 3:
        return G__8209__3.call(this, this_sym8180, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__8209
}();
cljs.core.Vector.prototype.apply = function(this_sym8170, args8171) {
  var this__8186 = this;
  return this_sym8170.call.apply(this_sym8170, [this_sym8170].concat(args8171.slice()))
};
cljs.core.Vector.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__8187 = this;
  var new_array__8188 = this__8187.array.slice();
  new_array__8188.push(o);
  return new cljs.core.Vector(this__8187.meta, new_array__8188, null)
};
cljs.core.Vector.prototype.toString = function() {
  var this__8189 = this;
  var this__8190 = this;
  return cljs.core.pr_str.call(null, this__8190)
};
cljs.core.Vector.prototype.cljs$core$IReduce$_reduce$arity$2 = function(v, f) {
  var this__8191 = this;
  return cljs.core.ci_reduce.call(null, this__8191.array, f)
};
cljs.core.Vector.prototype.cljs$core$IReduce$_reduce$arity$3 = function(v, f, start) {
  var this__8192 = this;
  return cljs.core.ci_reduce.call(null, this__8192.array, f, start)
};
cljs.core.Vector.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__8193 = this;
  if(this__8193.array.length > 0) {
    var vector_seq__8194 = function vector_seq(i) {
      return new cljs.core.LazySeq(null, false, function() {
        if(i < this__8193.array.length) {
          return cljs.core.cons.call(null, this__8193.array[i], vector_seq.call(null, i + 1))
        }else {
          return null
        }
      }, null)
    };
    return vector_seq__8194.call(null, 0)
  }else {
    return null
  }
};
cljs.core.Vector.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__8195 = this;
  return this__8195.array.length
};
cljs.core.Vector.prototype.cljs$core$IStack$_peek$arity$1 = function(coll) {
  var this__8196 = this;
  var count__8197 = this__8196.array.length;
  if(count__8197 > 0) {
    return this__8196.array[count__8197 - 1]
  }else {
    return null
  }
};
cljs.core.Vector.prototype.cljs$core$IStack$_pop$arity$1 = function(coll) {
  var this__8198 = this;
  if(this__8198.array.length > 0) {
    var new_array__8199 = this__8198.array.slice();
    new_array__8199.pop();
    return new cljs.core.Vector(this__8198.meta, new_array__8199, null)
  }else {
    throw new Error("Can't pop empty vector");
  }
};
cljs.core.Vector.prototype.cljs$core$IVector$_assoc_n$arity$3 = function(coll, n, val) {
  var this__8200 = this;
  return coll.cljs$core$IAssociative$_assoc$arity$3(coll, n, val)
};
cljs.core.Vector.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__8201 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.Vector.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__8202 = this;
  return new cljs.core.Vector(meta, this__8202.array, this__8202.__hash)
};
cljs.core.Vector.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__8203 = this;
  return this__8203.meta
};
cljs.core.Vector.prototype.cljs$core$IIndexed$_nth$arity$2 = function(coll, n) {
  var this__8204 = this;
  if(function() {
    var and__3822__auto____8205 = 0 <= n;
    if(and__3822__auto____8205) {
      return n < this__8204.array.length
    }else {
      return and__3822__auto____8205
    }
  }()) {
    return this__8204.array[n]
  }else {
    return null
  }
};
cljs.core.Vector.prototype.cljs$core$IIndexed$_nth$arity$3 = function(coll, n, not_found) {
  var this__8206 = this;
  if(function() {
    var and__3822__auto____8207 = 0 <= n;
    if(and__3822__auto____8207) {
      return n < this__8206.array.length
    }else {
      return and__3822__auto____8207
    }
  }()) {
    return this__8206.array[n]
  }else {
    return not_found
  }
};
cljs.core.Vector.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__8208 = this;
  return cljs.core.with_meta.call(null, cljs.core.Vector.EMPTY, this__8208.meta)
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
cljs.core.VectorNode.cljs$lang$ctorPrSeq = function(this__2323__auto__) {
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
  var cnt__8211 = pv.cnt;
  if(cnt__8211 < 32) {
    return 0
  }else {
    return cnt__8211 - 1 >>> 5 << 5
  }
};
cljs.core.new_path = function new_path(edit, level, node) {
  var ll__8217 = level;
  var ret__8218 = node;
  while(true) {
    if(ll__8217 === 0) {
      return ret__8218
    }else {
      var embed__8219 = ret__8218;
      var r__8220 = cljs.core.pv_fresh_node.call(null, edit);
      var ___8221 = cljs.core.pv_aset.call(null, r__8220, 0, embed__8219);
      var G__8222 = ll__8217 - 5;
      var G__8223 = r__8220;
      ll__8217 = G__8222;
      ret__8218 = G__8223;
      continue
    }
    break
  }
};
cljs.core.push_tail = function push_tail(pv, level, parent, tailnode) {
  var ret__8229 = cljs.core.pv_clone_node.call(null, parent);
  var subidx__8230 = pv.cnt - 1 >>> level & 31;
  if(5 === level) {
    cljs.core.pv_aset.call(null, ret__8229, subidx__8230, tailnode);
    return ret__8229
  }else {
    var child__8231 = cljs.core.pv_aget.call(null, parent, subidx__8230);
    if(!(child__8231 == null)) {
      var node_to_insert__8232 = push_tail.call(null, pv, level - 5, child__8231, tailnode);
      cljs.core.pv_aset.call(null, ret__8229, subidx__8230, node_to_insert__8232);
      return ret__8229
    }else {
      var node_to_insert__8233 = cljs.core.new_path.call(null, null, level - 5, tailnode);
      cljs.core.pv_aset.call(null, ret__8229, subidx__8230, node_to_insert__8233);
      return ret__8229
    }
  }
};
cljs.core.array_for = function array_for(pv, i) {
  if(function() {
    var and__3822__auto____8237 = 0 <= i;
    if(and__3822__auto____8237) {
      return i < pv.cnt
    }else {
      return and__3822__auto____8237
    }
  }()) {
    if(i >= cljs.core.tail_off.call(null, pv)) {
      return pv.tail
    }else {
      var node__8238 = pv.root;
      var level__8239 = pv.shift;
      while(true) {
        if(level__8239 > 0) {
          var G__8240 = cljs.core.pv_aget.call(null, node__8238, i >>> level__8239 & 31);
          var G__8241 = level__8239 - 5;
          node__8238 = G__8240;
          level__8239 = G__8241;
          continue
        }else {
          return node__8238.arr
        }
        break
      }
    }
  }else {
    throw new Error([cljs.core.str("No item "), cljs.core.str(i), cljs.core.str(" in vector of length "), cljs.core.str(pv.cnt)].join(""));
  }
};
cljs.core.do_assoc = function do_assoc(pv, level, node, i, val) {
  var ret__8244 = cljs.core.pv_clone_node.call(null, node);
  if(level === 0) {
    cljs.core.pv_aset.call(null, ret__8244, i & 31, val);
    return ret__8244
  }else {
    var subidx__8245 = i >>> level & 31;
    cljs.core.pv_aset.call(null, ret__8244, subidx__8245, do_assoc.call(null, pv, level - 5, cljs.core.pv_aget.call(null, node, subidx__8245), i, val));
    return ret__8244
  }
};
cljs.core.pop_tail = function pop_tail(pv, level, node) {
  var subidx__8251 = pv.cnt - 2 >>> level & 31;
  if(level > 5) {
    var new_child__8252 = pop_tail.call(null, pv, level - 5, cljs.core.pv_aget.call(null, node, subidx__8251));
    if(function() {
      var and__3822__auto____8253 = new_child__8252 == null;
      if(and__3822__auto____8253) {
        return subidx__8251 === 0
      }else {
        return and__3822__auto____8253
      }
    }()) {
      return null
    }else {
      var ret__8254 = cljs.core.pv_clone_node.call(null, node);
      cljs.core.pv_aset.call(null, ret__8254, subidx__8251, new_child__8252);
      return ret__8254
    }
  }else {
    if(subidx__8251 === 0) {
      return null
    }else {
      if("\ufdd0'else") {
        var ret__8255 = cljs.core.pv_clone_node.call(null, node);
        cljs.core.pv_aset.call(null, ret__8255, subidx__8251, null);
        return ret__8255
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
cljs.core.PersistentVector.cljs$lang$ctorPrSeq = function(this__2322__auto__) {
  return cljs.core.list.call(null, "cljs.core/PersistentVector")
};
cljs.core.PersistentVector.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = function(coll) {
  var this__8258 = this;
  return new cljs.core.TransientVector(this__8258.cnt, this__8258.shift, cljs.core.tv_editable_root.call(null, this__8258.root), cljs.core.tv_editable_tail.call(null, this__8258.tail))
};
cljs.core.PersistentVector.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__8259 = this;
  var h__2205__auto____8260 = this__8259.__hash;
  if(!(h__2205__auto____8260 == null)) {
    return h__2205__auto____8260
  }else {
    var h__2205__auto____8261 = cljs.core.hash_coll.call(null, coll);
    this__8259.__hash = h__2205__auto____8261;
    return h__2205__auto____8261
  }
};
cljs.core.PersistentVector.prototype.cljs$core$ILookup$_lookup$arity$2 = function(coll, k) {
  var this__8262 = this;
  return coll.cljs$core$IIndexed$_nth$arity$3(coll, k, null)
};
cljs.core.PersistentVector.prototype.cljs$core$ILookup$_lookup$arity$3 = function(coll, k, not_found) {
  var this__8263 = this;
  return coll.cljs$core$IIndexed$_nth$arity$3(coll, k, not_found)
};
cljs.core.PersistentVector.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(coll, k, v) {
  var this__8264 = this;
  if(function() {
    var and__3822__auto____8265 = 0 <= k;
    if(and__3822__auto____8265) {
      return k < this__8264.cnt
    }else {
      return and__3822__auto____8265
    }
  }()) {
    if(cljs.core.tail_off.call(null, coll) <= k) {
      var new_tail__8266 = this__8264.tail.slice();
      new_tail__8266[k & 31] = v;
      return new cljs.core.PersistentVector(this__8264.meta, this__8264.cnt, this__8264.shift, this__8264.root, new_tail__8266, null)
    }else {
      return new cljs.core.PersistentVector(this__8264.meta, this__8264.cnt, this__8264.shift, cljs.core.do_assoc.call(null, coll, this__8264.shift, this__8264.root, k, v), this__8264.tail, null)
    }
  }else {
    if(k === this__8264.cnt) {
      return coll.cljs$core$ICollection$_conj$arity$2(coll, v)
    }else {
      if("\ufdd0'else") {
        throw new Error([cljs.core.str("Index "), cljs.core.str(k), cljs.core.str(" out of bounds  [0,"), cljs.core.str(this__8264.cnt), cljs.core.str("]")].join(""));
      }else {
        return null
      }
    }
  }
};
cljs.core.PersistentVector.prototype.call = function() {
  var G__8314 = null;
  var G__8314__2 = function(this_sym8267, k) {
    var this__8269 = this;
    var this_sym8267__8270 = this;
    var coll__8271 = this_sym8267__8270;
    return coll__8271.cljs$core$ILookup$_lookup$arity$2(coll__8271, k)
  };
  var G__8314__3 = function(this_sym8268, k, not_found) {
    var this__8269 = this;
    var this_sym8268__8272 = this;
    var coll__8273 = this_sym8268__8272;
    return coll__8273.cljs$core$ILookup$_lookup$arity$3(coll__8273, k, not_found)
  };
  G__8314 = function(this_sym8268, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__8314__2.call(this, this_sym8268, k);
      case 3:
        return G__8314__3.call(this, this_sym8268, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__8314
}();
cljs.core.PersistentVector.prototype.apply = function(this_sym8256, args8257) {
  var this__8274 = this;
  return this_sym8256.call.apply(this_sym8256, [this_sym8256].concat(args8257.slice()))
};
cljs.core.PersistentVector.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = function(v, f, init) {
  var this__8275 = this;
  var step_init__8276 = [0, init];
  var i__8277 = 0;
  while(true) {
    if(i__8277 < this__8275.cnt) {
      var arr__8278 = cljs.core.array_for.call(null, v, i__8277);
      var len__8279 = arr__8278.length;
      var init__8283 = function() {
        var j__8280 = 0;
        var init__8281 = step_init__8276[1];
        while(true) {
          if(j__8280 < len__8279) {
            var init__8282 = f.call(null, init__8281, j__8280 + i__8277, arr__8278[j__8280]);
            if(cljs.core.reduced_QMARK_.call(null, init__8282)) {
              return init__8282
            }else {
              var G__8315 = j__8280 + 1;
              var G__8316 = init__8282;
              j__8280 = G__8315;
              init__8281 = G__8316;
              continue
            }
          }else {
            step_init__8276[0] = len__8279;
            step_init__8276[1] = init__8281;
            return init__8281
          }
          break
        }
      }();
      if(cljs.core.reduced_QMARK_.call(null, init__8283)) {
        return cljs.core.deref.call(null, init__8283)
      }else {
        var G__8317 = i__8277 + step_init__8276[0];
        i__8277 = G__8317;
        continue
      }
    }else {
      return step_init__8276[1]
    }
    break
  }
};
cljs.core.PersistentVector.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__8284 = this;
  if(this__8284.cnt - cljs.core.tail_off.call(null, coll) < 32) {
    var new_tail__8285 = this__8284.tail.slice();
    new_tail__8285.push(o);
    return new cljs.core.PersistentVector(this__8284.meta, this__8284.cnt + 1, this__8284.shift, this__8284.root, new_tail__8285, null)
  }else {
    var root_overflow_QMARK___8286 = this__8284.cnt >>> 5 > 1 << this__8284.shift;
    var new_shift__8287 = root_overflow_QMARK___8286 ? this__8284.shift + 5 : this__8284.shift;
    var new_root__8289 = root_overflow_QMARK___8286 ? function() {
      var n_r__8288 = cljs.core.pv_fresh_node.call(null, null);
      cljs.core.pv_aset.call(null, n_r__8288, 0, this__8284.root);
      cljs.core.pv_aset.call(null, n_r__8288, 1, cljs.core.new_path.call(null, null, this__8284.shift, new cljs.core.VectorNode(null, this__8284.tail)));
      return n_r__8288
    }() : cljs.core.push_tail.call(null, coll, this__8284.shift, this__8284.root, new cljs.core.VectorNode(null, this__8284.tail));
    return new cljs.core.PersistentVector(this__8284.meta, this__8284.cnt + 1, new_shift__8287, new_root__8289, [o], null)
  }
};
cljs.core.PersistentVector.prototype.cljs$core$IReversible$_rseq$arity$1 = function(coll) {
  var this__8290 = this;
  if(this__8290.cnt > 0) {
    return new cljs.core.RSeq(coll, this__8290.cnt - 1, null)
  }else {
    return cljs.core.List.EMPTY
  }
};
cljs.core.PersistentVector.prototype.cljs$core$IMapEntry$_key$arity$1 = function(coll) {
  var this__8291 = this;
  return coll.cljs$core$IIndexed$_nth$arity$2(coll, 0)
};
cljs.core.PersistentVector.prototype.cljs$core$IMapEntry$_val$arity$1 = function(coll) {
  var this__8292 = this;
  return coll.cljs$core$IIndexed$_nth$arity$2(coll, 1)
};
cljs.core.PersistentVector.prototype.toString = function() {
  var this__8293 = this;
  var this__8294 = this;
  return cljs.core.pr_str.call(null, this__8294)
};
cljs.core.PersistentVector.prototype.cljs$core$IReduce$_reduce$arity$2 = function(v, f) {
  var this__8295 = this;
  return cljs.core.ci_reduce.call(null, v, f)
};
cljs.core.PersistentVector.prototype.cljs$core$IReduce$_reduce$arity$3 = function(v, f, start) {
  var this__8296 = this;
  return cljs.core.ci_reduce.call(null, v, f, start)
};
cljs.core.PersistentVector.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__8297 = this;
  if(this__8297.cnt === 0) {
    return null
  }else {
    return cljs.core.chunked_seq.call(null, coll, 0, 0)
  }
};
cljs.core.PersistentVector.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__8298 = this;
  return this__8298.cnt
};
cljs.core.PersistentVector.prototype.cljs$core$IStack$_peek$arity$1 = function(coll) {
  var this__8299 = this;
  if(this__8299.cnt > 0) {
    return coll.cljs$core$IIndexed$_nth$arity$2(coll, this__8299.cnt - 1)
  }else {
    return null
  }
};
cljs.core.PersistentVector.prototype.cljs$core$IStack$_pop$arity$1 = function(coll) {
  var this__8300 = this;
  if(this__8300.cnt === 0) {
    throw new Error("Can't pop empty vector");
  }else {
    if(1 === this__8300.cnt) {
      return cljs.core._with_meta.call(null, cljs.core.PersistentVector.EMPTY, this__8300.meta)
    }else {
      if(1 < this__8300.cnt - cljs.core.tail_off.call(null, coll)) {
        return new cljs.core.PersistentVector(this__8300.meta, this__8300.cnt - 1, this__8300.shift, this__8300.root, this__8300.tail.slice(0, -1), null)
      }else {
        if("\ufdd0'else") {
          var new_tail__8301 = cljs.core.array_for.call(null, coll, this__8300.cnt - 2);
          var nr__8302 = cljs.core.pop_tail.call(null, coll, this__8300.shift, this__8300.root);
          var new_root__8303 = nr__8302 == null ? cljs.core.PersistentVector.EMPTY_NODE : nr__8302;
          var cnt_1__8304 = this__8300.cnt - 1;
          if(function() {
            var and__3822__auto____8305 = 5 < this__8300.shift;
            if(and__3822__auto____8305) {
              return cljs.core.pv_aget.call(null, new_root__8303, 1) == null
            }else {
              return and__3822__auto____8305
            }
          }()) {
            return new cljs.core.PersistentVector(this__8300.meta, cnt_1__8304, this__8300.shift - 5, cljs.core.pv_aget.call(null, new_root__8303, 0), new_tail__8301, null)
          }else {
            return new cljs.core.PersistentVector(this__8300.meta, cnt_1__8304, this__8300.shift, new_root__8303, new_tail__8301, null)
          }
        }else {
          return null
        }
      }
    }
  }
};
cljs.core.PersistentVector.prototype.cljs$core$IVector$_assoc_n$arity$3 = function(coll, n, val) {
  var this__8306 = this;
  return coll.cljs$core$IAssociative$_assoc$arity$3(coll, n, val)
};
cljs.core.PersistentVector.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__8307 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.PersistentVector.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__8308 = this;
  return new cljs.core.PersistentVector(meta, this__8308.cnt, this__8308.shift, this__8308.root, this__8308.tail, this__8308.__hash)
};
cljs.core.PersistentVector.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__8309 = this;
  return this__8309.meta
};
cljs.core.PersistentVector.prototype.cljs$core$IIndexed$_nth$arity$2 = function(coll, n) {
  var this__8310 = this;
  return cljs.core.array_for.call(null, coll, n)[n & 31]
};
cljs.core.PersistentVector.prototype.cljs$core$IIndexed$_nth$arity$3 = function(coll, n, not_found) {
  var this__8311 = this;
  if(function() {
    var and__3822__auto____8312 = 0 <= n;
    if(and__3822__auto____8312) {
      return n < this__8311.cnt
    }else {
      return and__3822__auto____8312
    }
  }()) {
    return coll.cljs$core$IIndexed$_nth$arity$2(coll, n)
  }else {
    return not_found
  }
};
cljs.core.PersistentVector.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__8313 = this;
  return cljs.core.with_meta.call(null, cljs.core.PersistentVector.EMPTY, this__8313.meta)
};
cljs.core.PersistentVector;
cljs.core.PersistentVector.EMPTY_NODE = cljs.core.pv_fresh_node.call(null, null);
cljs.core.PersistentVector.EMPTY = new cljs.core.PersistentVector(null, 0, 5, cljs.core.PersistentVector.EMPTY_NODE, [], 0);
cljs.core.PersistentVector.fromArray = function(xs, no_clone) {
  var l__8318 = xs.length;
  var xs__8319 = no_clone === true ? xs : xs.slice();
  if(l__8318 < 32) {
    return new cljs.core.PersistentVector(null, l__8318, 5, cljs.core.PersistentVector.EMPTY_NODE, xs__8319, null)
  }else {
    var node__8320 = xs__8319.slice(0, 32);
    var v__8321 = new cljs.core.PersistentVector(null, 32, 5, cljs.core.PersistentVector.EMPTY_NODE, node__8320, null);
    var i__8322 = 32;
    var out__8323 = cljs.core._as_transient.call(null, v__8321);
    while(true) {
      if(i__8322 < l__8318) {
        var G__8324 = i__8322 + 1;
        var G__8325 = cljs.core.conj_BANG_.call(null, out__8323, xs__8319[i__8322]);
        i__8322 = G__8324;
        out__8323 = G__8325;
        continue
      }else {
        return cljs.core.persistent_BANG_.call(null, out__8323)
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
  vector.cljs$lang$applyTo = function(arglist__8326) {
    var args = cljs.core.seq(arglist__8326);
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
cljs.core.ChunkedSeq.cljs$lang$ctorPrSeq = function(this__2322__auto__) {
  return cljs.core.list.call(null, "cljs.core/ChunkedSeq")
};
cljs.core.ChunkedSeq.prototype.cljs$core$INext$_next$arity$1 = function(coll) {
  var this__8327 = this;
  if(this__8327.off + 1 < this__8327.node.length) {
    var s__8328 = cljs.core.chunked_seq.call(null, this__8327.vec, this__8327.node, this__8327.i, this__8327.off + 1);
    if(s__8328 == null) {
      return null
    }else {
      return s__8328
    }
  }else {
    return coll.cljs$core$IChunkedNext$_chunked_next$arity$1(coll)
  }
};
cljs.core.ChunkedSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__8329 = this;
  return cljs.core.cons.call(null, o, coll)
};
cljs.core.ChunkedSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__8330 = this;
  return coll
};
cljs.core.ChunkedSeq.prototype.cljs$core$ISeq$_first$arity$1 = function(coll) {
  var this__8331 = this;
  return this__8331.node[this__8331.off]
};
cljs.core.ChunkedSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(coll) {
  var this__8332 = this;
  if(this__8332.off + 1 < this__8332.node.length) {
    var s__8333 = cljs.core.chunked_seq.call(null, this__8332.vec, this__8332.node, this__8332.i, this__8332.off + 1);
    if(s__8333 == null) {
      return cljs.core.List.EMPTY
    }else {
      return s__8333
    }
  }else {
    return coll.cljs$core$IChunkedSeq$_chunked_rest$arity$1(coll)
  }
};
cljs.core.ChunkedSeq.prototype.cljs$core$IChunkedNext$ = true;
cljs.core.ChunkedSeq.prototype.cljs$core$IChunkedNext$_chunked_next$arity$1 = function(coll) {
  var this__8334 = this;
  var l__8335 = this__8334.node.length;
  var s__8336 = this__8334.i + l__8335 < cljs.core._count.call(null, this__8334.vec) ? cljs.core.chunked_seq.call(null, this__8334.vec, this__8334.i + l__8335, 0) : null;
  if(s__8336 == null) {
    return null
  }else {
    return s__8336
  }
};
cljs.core.ChunkedSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__8337 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.ChunkedSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, m) {
  var this__8338 = this;
  return cljs.core.chunked_seq.call(null, this__8338.vec, this__8338.node, this__8338.i, this__8338.off, m)
};
cljs.core.ChunkedSeq.prototype.cljs$core$IWithMeta$_meta$arity$1 = function(coll) {
  var this__8339 = this;
  return this__8339.meta
};
cljs.core.ChunkedSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__8340 = this;
  return cljs.core.with_meta.call(null, cljs.core.PersistentVector.EMPTY, this__8340.meta)
};
cljs.core.ChunkedSeq.prototype.cljs$core$IChunkedSeq$ = true;
cljs.core.ChunkedSeq.prototype.cljs$core$IChunkedSeq$_chunked_first$arity$1 = function(coll) {
  var this__8341 = this;
  return cljs.core.array_chunk.call(null, this__8341.node, this__8341.off)
};
cljs.core.ChunkedSeq.prototype.cljs$core$IChunkedSeq$_chunked_rest$arity$1 = function(coll) {
  var this__8342 = this;
  var l__8343 = this__8342.node.length;
  var s__8344 = this__8342.i + l__8343 < cljs.core._count.call(null, this__8342.vec) ? cljs.core.chunked_seq.call(null, this__8342.vec, this__8342.i + l__8343, 0) : null;
  if(s__8344 == null) {
    return cljs.core.List.EMPTY
  }else {
    return s__8344
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
cljs.core.Subvec.cljs$lang$ctorPrSeq = function(this__2322__auto__) {
  return cljs.core.list.call(null, "cljs.core/Subvec")
};
cljs.core.Subvec.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__8347 = this;
  var h__2205__auto____8348 = this__8347.__hash;
  if(!(h__2205__auto____8348 == null)) {
    return h__2205__auto____8348
  }else {
    var h__2205__auto____8349 = cljs.core.hash_coll.call(null, coll);
    this__8347.__hash = h__2205__auto____8349;
    return h__2205__auto____8349
  }
};
cljs.core.Subvec.prototype.cljs$core$ILookup$_lookup$arity$2 = function(coll, k) {
  var this__8350 = this;
  return coll.cljs$core$IIndexed$_nth$arity$3(coll, k, null)
};
cljs.core.Subvec.prototype.cljs$core$ILookup$_lookup$arity$3 = function(coll, k, not_found) {
  var this__8351 = this;
  return coll.cljs$core$IIndexed$_nth$arity$3(coll, k, not_found)
};
cljs.core.Subvec.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(coll, key, val) {
  var this__8352 = this;
  var v_pos__8353 = this__8352.start + key;
  return new cljs.core.Subvec(this__8352.meta, cljs.core._assoc.call(null, this__8352.v, v_pos__8353, val), this__8352.start, this__8352.end > v_pos__8353 + 1 ? this__8352.end : v_pos__8353 + 1, null)
};
cljs.core.Subvec.prototype.call = function() {
  var G__8379 = null;
  var G__8379__2 = function(this_sym8354, k) {
    var this__8356 = this;
    var this_sym8354__8357 = this;
    var coll__8358 = this_sym8354__8357;
    return coll__8358.cljs$core$ILookup$_lookup$arity$2(coll__8358, k)
  };
  var G__8379__3 = function(this_sym8355, k, not_found) {
    var this__8356 = this;
    var this_sym8355__8359 = this;
    var coll__8360 = this_sym8355__8359;
    return coll__8360.cljs$core$ILookup$_lookup$arity$3(coll__8360, k, not_found)
  };
  G__8379 = function(this_sym8355, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__8379__2.call(this, this_sym8355, k);
      case 3:
        return G__8379__3.call(this, this_sym8355, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__8379
}();
cljs.core.Subvec.prototype.apply = function(this_sym8345, args8346) {
  var this__8361 = this;
  return this_sym8345.call.apply(this_sym8345, [this_sym8345].concat(args8346.slice()))
};
cljs.core.Subvec.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__8362 = this;
  return new cljs.core.Subvec(this__8362.meta, cljs.core._assoc_n.call(null, this__8362.v, this__8362.end, o), this__8362.start, this__8362.end + 1, null)
};
cljs.core.Subvec.prototype.toString = function() {
  var this__8363 = this;
  var this__8364 = this;
  return cljs.core.pr_str.call(null, this__8364)
};
cljs.core.Subvec.prototype.cljs$core$IReduce$_reduce$arity$2 = function(coll, f) {
  var this__8365 = this;
  return cljs.core.ci_reduce.call(null, coll, f)
};
cljs.core.Subvec.prototype.cljs$core$IReduce$_reduce$arity$3 = function(coll, f, start) {
  var this__8366 = this;
  return cljs.core.ci_reduce.call(null, coll, f, start)
};
cljs.core.Subvec.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__8367 = this;
  var subvec_seq__8368 = function subvec_seq(i) {
    if(i === this__8367.end) {
      return null
    }else {
      return cljs.core.cons.call(null, cljs.core._nth.call(null, this__8367.v, i), new cljs.core.LazySeq(null, false, function() {
        return subvec_seq.call(null, i + 1)
      }, null))
    }
  };
  return subvec_seq__8368.call(null, this__8367.start)
};
cljs.core.Subvec.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__8369 = this;
  return this__8369.end - this__8369.start
};
cljs.core.Subvec.prototype.cljs$core$IStack$_peek$arity$1 = function(coll) {
  var this__8370 = this;
  return cljs.core._nth.call(null, this__8370.v, this__8370.end - 1)
};
cljs.core.Subvec.prototype.cljs$core$IStack$_pop$arity$1 = function(coll) {
  var this__8371 = this;
  if(this__8371.start === this__8371.end) {
    throw new Error("Can't pop empty vector");
  }else {
    return new cljs.core.Subvec(this__8371.meta, this__8371.v, this__8371.start, this__8371.end - 1, null)
  }
};
cljs.core.Subvec.prototype.cljs$core$IVector$_assoc_n$arity$3 = function(coll, n, val) {
  var this__8372 = this;
  return coll.cljs$core$IAssociative$_assoc$arity$3(coll, n, val)
};
cljs.core.Subvec.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__8373 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.Subvec.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__8374 = this;
  return new cljs.core.Subvec(meta, this__8374.v, this__8374.start, this__8374.end, this__8374.__hash)
};
cljs.core.Subvec.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__8375 = this;
  return this__8375.meta
};
cljs.core.Subvec.prototype.cljs$core$IIndexed$_nth$arity$2 = function(coll, n) {
  var this__8376 = this;
  return cljs.core._nth.call(null, this__8376.v, this__8376.start + n)
};
cljs.core.Subvec.prototype.cljs$core$IIndexed$_nth$arity$3 = function(coll, n, not_found) {
  var this__8377 = this;
  return cljs.core._nth.call(null, this__8377.v, this__8377.start + n, not_found)
};
cljs.core.Subvec.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__8378 = this;
  return cljs.core.with_meta.call(null, cljs.core.Vector.EMPTY, this__8378.meta)
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
  var ret__8381 = cljs.core.make_array.call(null, 32);
  cljs.core.array_copy.call(null, tl, 0, ret__8381, 0, tl.length);
  return ret__8381
};
cljs.core.tv_push_tail = function tv_push_tail(tv, level, parent, tail_node) {
  var ret__8385 = cljs.core.tv_ensure_editable.call(null, tv.root.edit, parent);
  var subidx__8386 = tv.cnt - 1 >>> level & 31;
  cljs.core.pv_aset.call(null, ret__8385, subidx__8386, level === 5 ? tail_node : function() {
    var child__8387 = cljs.core.pv_aget.call(null, ret__8385, subidx__8386);
    if(!(child__8387 == null)) {
      return tv_push_tail.call(null, tv, level - 5, child__8387, tail_node)
    }else {
      return cljs.core.new_path.call(null, tv.root.edit, level - 5, tail_node)
    }
  }());
  return ret__8385
};
cljs.core.tv_pop_tail = function tv_pop_tail(tv, level, node) {
  var node__8392 = cljs.core.tv_ensure_editable.call(null, tv.root.edit, node);
  var subidx__8393 = tv.cnt - 2 >>> level & 31;
  if(level > 5) {
    var new_child__8394 = tv_pop_tail.call(null, tv, level - 5, cljs.core.pv_aget.call(null, node__8392, subidx__8393));
    if(function() {
      var and__3822__auto____8395 = new_child__8394 == null;
      if(and__3822__auto____8395) {
        return subidx__8393 === 0
      }else {
        return and__3822__auto____8395
      }
    }()) {
      return null
    }else {
      cljs.core.pv_aset.call(null, node__8392, subidx__8393, new_child__8394);
      return node__8392
    }
  }else {
    if(subidx__8393 === 0) {
      return null
    }else {
      if("\ufdd0'else") {
        cljs.core.pv_aset.call(null, node__8392, subidx__8393, null);
        return node__8392
      }else {
        return null
      }
    }
  }
};
cljs.core.editable_array_for = function editable_array_for(tv, i) {
  if(function() {
    var and__3822__auto____8400 = 0 <= i;
    if(and__3822__auto____8400) {
      return i < tv.cnt
    }else {
      return and__3822__auto____8400
    }
  }()) {
    if(i >= cljs.core.tail_off.call(null, tv)) {
      return tv.tail
    }else {
      var root__8401 = tv.root;
      var node__8402 = root__8401;
      var level__8403 = tv.shift;
      while(true) {
        if(level__8403 > 0) {
          var G__8404 = cljs.core.tv_ensure_editable.call(null, root__8401.edit, cljs.core.pv_aget.call(null, node__8402, i >>> level__8403 & 31));
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
cljs.core.TransientVector.cljs$lang$ctorPrSeq = function(this__2322__auto__) {
  return cljs.core.list.call(null, "cljs.core/TransientVector")
};
cljs.core.TransientVector.prototype.call = function() {
  var G__8445 = null;
  var G__8445__2 = function(this_sym8408, k) {
    var this__8410 = this;
    var this_sym8408__8411 = this;
    var coll__8412 = this_sym8408__8411;
    return coll__8412.cljs$core$ILookup$_lookup$arity$2(coll__8412, k)
  };
  var G__8445__3 = function(this_sym8409, k, not_found) {
    var this__8410 = this;
    var this_sym8409__8413 = this;
    var coll__8414 = this_sym8409__8413;
    return coll__8414.cljs$core$ILookup$_lookup$arity$3(coll__8414, k, not_found)
  };
  G__8445 = function(this_sym8409, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__8445__2.call(this, this_sym8409, k);
      case 3:
        return G__8445__3.call(this, this_sym8409, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__8445
}();
cljs.core.TransientVector.prototype.apply = function(this_sym8406, args8407) {
  var this__8415 = this;
  return this_sym8406.call.apply(this_sym8406, [this_sym8406].concat(args8407.slice()))
};
cljs.core.TransientVector.prototype.cljs$core$ILookup$_lookup$arity$2 = function(coll, k) {
  var this__8416 = this;
  return coll.cljs$core$IIndexed$_nth$arity$3(coll, k, null)
};
cljs.core.TransientVector.prototype.cljs$core$ILookup$_lookup$arity$3 = function(coll, k, not_found) {
  var this__8417 = this;
  return coll.cljs$core$IIndexed$_nth$arity$3(coll, k, not_found)
};
cljs.core.TransientVector.prototype.cljs$core$IIndexed$_nth$arity$2 = function(coll, n) {
  var this__8418 = this;
  if(this__8418.root.edit) {
    return cljs.core.array_for.call(null, coll, n)[n & 31]
  }else {
    throw new Error("nth after persistent!");
  }
};
cljs.core.TransientVector.prototype.cljs$core$IIndexed$_nth$arity$3 = function(coll, n, not_found) {
  var this__8419 = this;
  if(function() {
    var and__3822__auto____8420 = 0 <= n;
    if(and__3822__auto____8420) {
      return n < this__8419.cnt
    }else {
      return and__3822__auto____8420
    }
  }()) {
    return coll.cljs$core$IIndexed$_nth$arity$2(coll, n)
  }else {
    return not_found
  }
};
cljs.core.TransientVector.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__8421 = this;
  if(this__8421.root.edit) {
    return this__8421.cnt
  }else {
    throw new Error("count after persistent!");
  }
};
cljs.core.TransientVector.prototype.cljs$core$ITransientVector$_assoc_n_BANG_$arity$3 = function(tcoll, n, val) {
  var this__8422 = this;
  if(this__8422.root.edit) {
    if(function() {
      var and__3822__auto____8423 = 0 <= n;
      if(and__3822__auto____8423) {
        return n < this__8422.cnt
      }else {
        return and__3822__auto____8423
      }
    }()) {
      if(cljs.core.tail_off.call(null, tcoll) <= n) {
        this__8422.tail[n & 31] = val;
        return tcoll
      }else {
        var new_root__8428 = function go(level, node) {
          var node__8426 = cljs.core.tv_ensure_editable.call(null, this__8422.root.edit, node);
          if(level === 0) {
            cljs.core.pv_aset.call(null, node__8426, n & 31, val);
            return node__8426
          }else {
            var subidx__8427 = n >>> level & 31;
            cljs.core.pv_aset.call(null, node__8426, subidx__8427, go.call(null, level - 5, cljs.core.pv_aget.call(null, node__8426, subidx__8427)));
            return node__8426
          }
        }.call(null, this__8422.shift, this__8422.root);
        this__8422.root = new_root__8428;
        return tcoll
      }
    }else {
      if(n === this__8422.cnt) {
        return tcoll.cljs$core$ITransientCollection$_conj_BANG_$arity$2(tcoll, val)
      }else {
        if("\ufdd0'else") {
          throw new Error([cljs.core.str("Index "), cljs.core.str(n), cljs.core.str(" out of bounds for TransientVector of length"), cljs.core.str(this__8422.cnt)].join(""));
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
  var this__8429 = this;
  if(this__8429.root.edit) {
    if(this__8429.cnt === 0) {
      throw new Error("Can't pop empty vector");
    }else {
      if(1 === this__8429.cnt) {
        this__8429.cnt = 0;
        return tcoll
      }else {
        if((this__8429.cnt - 1 & 31) > 0) {
          this__8429.cnt = this__8429.cnt - 1;
          return tcoll
        }else {
          if("\ufdd0'else") {
            var new_tail__8430 = cljs.core.editable_array_for.call(null, tcoll, this__8429.cnt - 2);
            var new_root__8432 = function() {
              var nr__8431 = cljs.core.tv_pop_tail.call(null, tcoll, this__8429.shift, this__8429.root);
              if(!(nr__8431 == null)) {
                return nr__8431
              }else {
                return new cljs.core.VectorNode(this__8429.root.edit, cljs.core.make_array.call(null, 32))
              }
            }();
            if(function() {
              var and__3822__auto____8433 = 5 < this__8429.shift;
              if(and__3822__auto____8433) {
                return cljs.core.pv_aget.call(null, new_root__8432, 1) == null
              }else {
                return and__3822__auto____8433
              }
            }()) {
              var new_root__8434 = cljs.core.tv_ensure_editable.call(null, this__8429.root.edit, cljs.core.pv_aget.call(null, new_root__8432, 0));
              this__8429.root = new_root__8434;
              this__8429.shift = this__8429.shift - 5;
              this__8429.cnt = this__8429.cnt - 1;
              this__8429.tail = new_tail__8430;
              return tcoll
            }else {
              this__8429.root = new_root__8432;
              this__8429.cnt = this__8429.cnt - 1;
              this__8429.tail = new_tail__8430;
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
  var this__8435 = this;
  return tcoll.cljs$core$ITransientVector$_assoc_n_BANG_$arity$3(tcoll, key, val)
};
cljs.core.TransientVector.prototype.cljs$core$ITransientCollection$_conj_BANG_$arity$2 = function(tcoll, o) {
  var this__8436 = this;
  if(this__8436.root.edit) {
    if(this__8436.cnt - cljs.core.tail_off.call(null, tcoll) < 32) {
      this__8436.tail[this__8436.cnt & 31] = o;
      this__8436.cnt = this__8436.cnt + 1;
      return tcoll
    }else {
      var tail_node__8437 = new cljs.core.VectorNode(this__8436.root.edit, this__8436.tail);
      var new_tail__8438 = cljs.core.make_array.call(null, 32);
      new_tail__8438[0] = o;
      this__8436.tail = new_tail__8438;
      if(this__8436.cnt >>> 5 > 1 << this__8436.shift) {
        var new_root_array__8439 = cljs.core.make_array.call(null, 32);
        var new_shift__8440 = this__8436.shift + 5;
        new_root_array__8439[0] = this__8436.root;
        new_root_array__8439[1] = cljs.core.new_path.call(null, this__8436.root.edit, this__8436.shift, tail_node__8437);
        this__8436.root = new cljs.core.VectorNode(this__8436.root.edit, new_root_array__8439);
        this__8436.shift = new_shift__8440;
        this__8436.cnt = this__8436.cnt + 1;
        return tcoll
      }else {
        var new_root__8441 = cljs.core.tv_push_tail.call(null, tcoll, this__8436.shift, this__8436.root, tail_node__8437);
        this__8436.root = new_root__8441;
        this__8436.cnt = this__8436.cnt + 1;
        return tcoll
      }
    }
  }else {
    throw new Error("conj! after persistent!");
  }
};
cljs.core.TransientVector.prototype.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 = function(tcoll) {
  var this__8442 = this;
  if(this__8442.root.edit) {
    this__8442.root.edit = null;
    var len__8443 = this__8442.cnt - cljs.core.tail_off.call(null, tcoll);
    var trimmed_tail__8444 = cljs.core.make_array.call(null, len__8443);
    cljs.core.array_copy.call(null, this__8442.tail, 0, trimmed_tail__8444, 0, len__8443);
    return new cljs.core.PersistentVector(null, this__8442.cnt, this__8442.shift, this__8442.root, trimmed_tail__8444, null)
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
cljs.core.PersistentQueueSeq.cljs$lang$ctorPrSeq = function(this__2322__auto__) {
  return cljs.core.list.call(null, "cljs.core/PersistentQueueSeq")
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__8446 = this;
  var h__2205__auto____8447 = this__8446.__hash;
  if(!(h__2205__auto____8447 == null)) {
    return h__2205__auto____8447
  }else {
    var h__2205__auto____8448 = cljs.core.hash_coll.call(null, coll);
    this__8446.__hash = h__2205__auto____8448;
    return h__2205__auto____8448
  }
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__8449 = this;
  return cljs.core.cons.call(null, o, coll)
};
cljs.core.PersistentQueueSeq.prototype.toString = function() {
  var this__8450 = this;
  var this__8451 = this;
  return cljs.core.pr_str.call(null, this__8451)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__8452 = this;
  return coll
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeq$_first$arity$1 = function(coll) {
  var this__8453 = this;
  return cljs.core._first.call(null, this__8453.front)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(coll) {
  var this__8454 = this;
  var temp__3971__auto____8455 = cljs.core.next.call(null, this__8454.front);
  if(temp__3971__auto____8455) {
    var f1__8456 = temp__3971__auto____8455;
    return new cljs.core.PersistentQueueSeq(this__8454.meta, f1__8456, this__8454.rear, null)
  }else {
    if(this__8454.rear == null) {
      return coll.cljs$core$IEmptyableCollection$_empty$arity$1(coll)
    }else {
      return new cljs.core.PersistentQueueSeq(this__8454.meta, this__8454.rear, null, null)
    }
  }
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__8457 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__8458 = this;
  return new cljs.core.PersistentQueueSeq(meta, this__8458.front, this__8458.rear, this__8458.__hash)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__8459 = this;
  return this__8459.meta
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__8460 = this;
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this__8460.meta)
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
cljs.core.PersistentQueue.cljs$lang$ctorPrSeq = function(this__2322__auto__) {
  return cljs.core.list.call(null, "cljs.core/PersistentQueue")
};
cljs.core.PersistentQueue.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__8461 = this;
  var h__2205__auto____8462 = this__8461.__hash;
  if(!(h__2205__auto____8462 == null)) {
    return h__2205__auto____8462
  }else {
    var h__2205__auto____8463 = cljs.core.hash_coll.call(null, coll);
    this__8461.__hash = h__2205__auto____8463;
    return h__2205__auto____8463
  }
};
cljs.core.PersistentQueue.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__8464 = this;
  if(cljs.core.truth_(this__8464.front)) {
    return new cljs.core.PersistentQueue(this__8464.meta, this__8464.count + 1, this__8464.front, cljs.core.conj.call(null, function() {
      var or__3824__auto____8465 = this__8464.rear;
      if(cljs.core.truth_(or__3824__auto____8465)) {
        return or__3824__auto____8465
      }else {
        return cljs.core.PersistentVector.EMPTY
      }
    }(), o), null)
  }else {
    return new cljs.core.PersistentQueue(this__8464.meta, this__8464.count + 1, cljs.core.conj.call(null, this__8464.front, o), cljs.core.PersistentVector.EMPTY, null)
  }
};
cljs.core.PersistentQueue.prototype.toString = function() {
  var this__8466 = this;
  var this__8467 = this;
  return cljs.core.pr_str.call(null, this__8467)
};
cljs.core.PersistentQueue.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__8468 = this;
  var rear__8469 = cljs.core.seq.call(null, this__8468.rear);
  if(cljs.core.truth_(function() {
    var or__3824__auto____8470 = this__8468.front;
    if(cljs.core.truth_(or__3824__auto____8470)) {
      return or__3824__auto____8470
    }else {
      return rear__8469
    }
  }())) {
    return new cljs.core.PersistentQueueSeq(null, this__8468.front, cljs.core.seq.call(null, rear__8469), null)
  }else {
    return null
  }
};
cljs.core.PersistentQueue.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__8471 = this;
  return this__8471.count
};
cljs.core.PersistentQueue.prototype.cljs$core$IStack$_peek$arity$1 = function(coll) {
  var this__8472 = this;
  return cljs.core._first.call(null, this__8472.front)
};
cljs.core.PersistentQueue.prototype.cljs$core$IStack$_pop$arity$1 = function(coll) {
  var this__8473 = this;
  if(cljs.core.truth_(this__8473.front)) {
    var temp__3971__auto____8474 = cljs.core.next.call(null, this__8473.front);
    if(temp__3971__auto____8474) {
      var f1__8475 = temp__3971__auto____8474;
      return new cljs.core.PersistentQueue(this__8473.meta, this__8473.count - 1, f1__8475, this__8473.rear, null)
    }else {
      return new cljs.core.PersistentQueue(this__8473.meta, this__8473.count - 1, cljs.core.seq.call(null, this__8473.rear), cljs.core.PersistentVector.EMPTY, null)
    }
  }else {
    return coll
  }
};
cljs.core.PersistentQueue.prototype.cljs$core$ISeq$_first$arity$1 = function(coll) {
  var this__8476 = this;
  return cljs.core.first.call(null, this__8476.front)
};
cljs.core.PersistentQueue.prototype.cljs$core$ISeq$_rest$arity$1 = function(coll) {
  var this__8477 = this;
  return cljs.core.rest.call(null, cljs.core.seq.call(null, coll))
};
cljs.core.PersistentQueue.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__8478 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.PersistentQueue.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__8479 = this;
  return new cljs.core.PersistentQueue(meta, this__8479.count, this__8479.front, this__8479.rear, this__8479.__hash)
};
cljs.core.PersistentQueue.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__8480 = this;
  return this__8480.meta
};
cljs.core.PersistentQueue.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__8481 = this;
  return cljs.core.PersistentQueue.EMPTY
};
cljs.core.PersistentQueue;
cljs.core.PersistentQueue.EMPTY = new cljs.core.PersistentQueue(null, 0, null, cljs.core.PersistentVector.EMPTY, 0);
cljs.core.NeverEquiv = function() {
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 2097152
};
cljs.core.NeverEquiv.cljs$lang$type = true;
cljs.core.NeverEquiv.cljs$lang$ctorPrSeq = function(this__2322__auto__) {
  return cljs.core.list.call(null, "cljs.core/NeverEquiv")
};
cljs.core.NeverEquiv.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(o, other) {
  var this__8482 = this;
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
  var len__8485 = array.length;
  var i__8486 = 0;
  while(true) {
    if(i__8486 < len__8485) {
      if(k === array[i__8486]) {
        return i__8486
      }else {
        var G__8487 = i__8486 + incr;
        i__8486 = G__8487;
        continue
      }
    }else {
      return null
    }
    break
  }
};
cljs.core.obj_map_compare_keys = function obj_map_compare_keys(a, b) {
  var a__8490 = cljs.core.hash.call(null, a);
  var b__8491 = cljs.core.hash.call(null, b);
  if(a__8490 < b__8491) {
    return-1
  }else {
    if(a__8490 > b__8491) {
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
  var ks__8499 = m.keys;
  var len__8500 = ks__8499.length;
  var so__8501 = m.strobj;
  var out__8502 = cljs.core.with_meta.call(null, cljs.core.PersistentHashMap.EMPTY, cljs.core.meta.call(null, m));
  var i__8503 = 0;
  var out__8504 = cljs.core.transient$.call(null, out__8502);
  while(true) {
    if(i__8503 < len__8500) {
      var k__8505 = ks__8499[i__8503];
      var G__8506 = i__8503 + 1;
      var G__8507 = cljs.core.assoc_BANG_.call(null, out__8504, k__8505, so__8501[k__8505]);
      i__8503 = G__8506;
      out__8504 = G__8507;
      continue
    }else {
      return cljs.core.persistent_BANG_.call(null, cljs.core.assoc_BANG_.call(null, out__8504, k, v))
    }
    break
  }
};
cljs.core.obj_clone = function obj_clone(obj, ks) {
  var new_obj__8513 = {};
  var l__8514 = ks.length;
  var i__8515 = 0;
  while(true) {
    if(i__8515 < l__8514) {
      var k__8516 = ks[i__8515];
      new_obj__8513[k__8516] = obj[k__8516];
      var G__8517 = i__8515 + 1;
      i__8515 = G__8517;
      continue
    }else {
    }
    break
  }
  return new_obj__8513
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
cljs.core.ObjMap.cljs$lang$ctorPrSeq = function(this__2322__auto__) {
  return cljs.core.list.call(null, "cljs.core/ObjMap")
};
cljs.core.ObjMap.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = function(coll) {
  var this__8520 = this;
  return cljs.core.transient$.call(null, cljs.core.into.call(null, cljs.core.hash_map.call(null), coll))
};
cljs.core.ObjMap.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__8521 = this;
  var h__2205__auto____8522 = this__8521.__hash;
  if(!(h__2205__auto____8522 == null)) {
    return h__2205__auto____8522
  }else {
    var h__2205__auto____8523 = cljs.core.hash_imap.call(null, coll);
    this__8521.__hash = h__2205__auto____8523;
    return h__2205__auto____8523
  }
};
cljs.core.ObjMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(coll, k) {
  var this__8524 = this;
  return coll.cljs$core$ILookup$_lookup$arity$3(coll, k, null)
};
cljs.core.ObjMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(coll, k, not_found) {
  var this__8525 = this;
  if(function() {
    var and__3822__auto____8526 = goog.isString(k);
    if(and__3822__auto____8526) {
      return!(cljs.core.scan_array.call(null, 1, k, this__8525.keys) == null)
    }else {
      return and__3822__auto____8526
    }
  }()) {
    return this__8525.strobj[k]
  }else {
    return not_found
  }
};
cljs.core.ObjMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(coll, k, v) {
  var this__8527 = this;
  if(goog.isString(k)) {
    if(function() {
      var or__3824__auto____8528 = this__8527.update_count > cljs.core.ObjMap.HASHMAP_THRESHOLD;
      if(or__3824__auto____8528) {
        return or__3824__auto____8528
      }else {
        return this__8527.keys.length >= cljs.core.ObjMap.HASHMAP_THRESHOLD
      }
    }()) {
      return cljs.core.obj_map__GT_hash_map.call(null, coll, k, v)
    }else {
      if(!(cljs.core.scan_array.call(null, 1, k, this__8527.keys) == null)) {
        var new_strobj__8529 = cljs.core.obj_clone.call(null, this__8527.strobj, this__8527.keys);
        new_strobj__8529[k] = v;
        return new cljs.core.ObjMap(this__8527.meta, this__8527.keys, new_strobj__8529, this__8527.update_count + 1, null)
      }else {
        var new_strobj__8530 = cljs.core.obj_clone.call(null, this__8527.strobj, this__8527.keys);
        var new_keys__8531 = this__8527.keys.slice();
        new_strobj__8530[k] = v;
        new_keys__8531.push(k);
        return new cljs.core.ObjMap(this__8527.meta, new_keys__8531, new_strobj__8530, this__8527.update_count + 1, null)
      }
    }
  }else {
    return cljs.core.obj_map__GT_hash_map.call(null, coll, k, v)
  }
};
cljs.core.ObjMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = function(coll, k) {
  var this__8532 = this;
  if(function() {
    var and__3822__auto____8533 = goog.isString(k);
    if(and__3822__auto____8533) {
      return!(cljs.core.scan_array.call(null, 1, k, this__8532.keys) == null)
    }else {
      return and__3822__auto____8533
    }
  }()) {
    return true
  }else {
    return false
  }
};
cljs.core.ObjMap.prototype.call = function() {
  var G__8555 = null;
  var G__8555__2 = function(this_sym8534, k) {
    var this__8536 = this;
    var this_sym8534__8537 = this;
    var coll__8538 = this_sym8534__8537;
    return coll__8538.cljs$core$ILookup$_lookup$arity$2(coll__8538, k)
  };
  var G__8555__3 = function(this_sym8535, k, not_found) {
    var this__8536 = this;
    var this_sym8535__8539 = this;
    var coll__8540 = this_sym8535__8539;
    return coll__8540.cljs$core$ILookup$_lookup$arity$3(coll__8540, k, not_found)
  };
  G__8555 = function(this_sym8535, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__8555__2.call(this, this_sym8535, k);
      case 3:
        return G__8555__3.call(this, this_sym8535, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__8555
}();
cljs.core.ObjMap.prototype.apply = function(this_sym8518, args8519) {
  var this__8541 = this;
  return this_sym8518.call.apply(this_sym8518, [this_sym8518].concat(args8519.slice()))
};
cljs.core.ObjMap.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, entry) {
  var this__8542 = this;
  if(cljs.core.vector_QMARK_.call(null, entry)) {
    return coll.cljs$core$IAssociative$_assoc$arity$3(coll, cljs.core._nth.call(null, entry, 0), cljs.core._nth.call(null, entry, 1))
  }else {
    return cljs.core.reduce.call(null, cljs.core._conj, coll, entry)
  }
};
cljs.core.ObjMap.prototype.toString = function() {
  var this__8543 = this;
  var this__8544 = this;
  return cljs.core.pr_str.call(null, this__8544)
};
cljs.core.ObjMap.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__8545 = this;
  if(this__8545.keys.length > 0) {
    return cljs.core.map.call(null, function(p1__8508_SHARP_) {
      return cljs.core.vector.call(null, p1__8508_SHARP_, this__8545.strobj[p1__8508_SHARP_])
    }, this__8545.keys.sort(cljs.core.obj_map_compare_keys))
  }else {
    return null
  }
};
cljs.core.ObjMap.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__8546 = this;
  return this__8546.keys.length
};
cljs.core.ObjMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__8547 = this;
  return cljs.core.equiv_map.call(null, coll, other)
};
cljs.core.ObjMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__8548 = this;
  return new cljs.core.ObjMap(meta, this__8548.keys, this__8548.strobj, this__8548.update_count, this__8548.__hash)
};
cljs.core.ObjMap.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__8549 = this;
  return this__8549.meta
};
cljs.core.ObjMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__8550 = this;
  return cljs.core.with_meta.call(null, cljs.core.ObjMap.EMPTY, this__8550.meta)
};
cljs.core.ObjMap.prototype.cljs$core$IMap$_dissoc$arity$2 = function(coll, k) {
  var this__8551 = this;
  if(function() {
    var and__3822__auto____8552 = goog.isString(k);
    if(and__3822__auto____8552) {
      return!(cljs.core.scan_array.call(null, 1, k, this__8551.keys) == null)
    }else {
      return and__3822__auto____8552
    }
  }()) {
    var new_keys__8553 = this__8551.keys.slice();
    var new_strobj__8554 = cljs.core.obj_clone.call(null, this__8551.strobj, this__8551.keys);
    new_keys__8553.splice(cljs.core.scan_array.call(null, 1, k, new_keys__8553), 1);
    cljs.core.js_delete.call(null, new_strobj__8554, k);
    return new cljs.core.ObjMap(this__8551.meta, new_keys__8553, new_strobj__8554, this__8551.update_count + 1, null)
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
cljs.core.HashMap.cljs$lang$ctorPrSeq = function(this__2322__auto__) {
  return cljs.core.list.call(null, "cljs.core/HashMap")
};
cljs.core.HashMap.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__8559 = this;
  var h__2205__auto____8560 = this__8559.__hash;
  if(!(h__2205__auto____8560 == null)) {
    return h__2205__auto____8560
  }else {
    var h__2205__auto____8561 = cljs.core.hash_imap.call(null, coll);
    this__8559.__hash = h__2205__auto____8561;
    return h__2205__auto____8561
  }
};
cljs.core.HashMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(coll, k) {
  var this__8562 = this;
  return coll.cljs$core$ILookup$_lookup$arity$3(coll, k, null)
};
cljs.core.HashMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(coll, k, not_found) {
  var this__8563 = this;
  var bucket__8564 = this__8563.hashobj[cljs.core.hash.call(null, k)];
  var i__8565 = cljs.core.truth_(bucket__8564) ? cljs.core.scan_array.call(null, 2, k, bucket__8564) : null;
  if(cljs.core.truth_(i__8565)) {
    return bucket__8564[i__8565 + 1]
  }else {
    return not_found
  }
};
cljs.core.HashMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(coll, k, v) {
  var this__8566 = this;
  var h__8567 = cljs.core.hash.call(null, k);
  var bucket__8568 = this__8566.hashobj[h__8567];
  if(cljs.core.truth_(bucket__8568)) {
    var new_bucket__8569 = bucket__8568.slice();
    var new_hashobj__8570 = goog.object.clone(this__8566.hashobj);
    new_hashobj__8570[h__8567] = new_bucket__8569;
    var temp__3971__auto____8571 = cljs.core.scan_array.call(null, 2, k, new_bucket__8569);
    if(cljs.core.truth_(temp__3971__auto____8571)) {
      var i__8572 = temp__3971__auto____8571;
      new_bucket__8569[i__8572 + 1] = v;
      return new cljs.core.HashMap(this__8566.meta, this__8566.count, new_hashobj__8570, null)
    }else {
      new_bucket__8569.push(k, v);
      return new cljs.core.HashMap(this__8566.meta, this__8566.count + 1, new_hashobj__8570, null)
    }
  }else {
    var new_hashobj__8573 = goog.object.clone(this__8566.hashobj);
    new_hashobj__8573[h__8567] = [k, v];
    return new cljs.core.HashMap(this__8566.meta, this__8566.count + 1, new_hashobj__8573, null)
  }
};
cljs.core.HashMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = function(coll, k) {
  var this__8574 = this;
  var bucket__8575 = this__8574.hashobj[cljs.core.hash.call(null, k)];
  var i__8576 = cljs.core.truth_(bucket__8575) ? cljs.core.scan_array.call(null, 2, k, bucket__8575) : null;
  if(cljs.core.truth_(i__8576)) {
    return true
  }else {
    return false
  }
};
cljs.core.HashMap.prototype.call = function() {
  var G__8601 = null;
  var G__8601__2 = function(this_sym8577, k) {
    var this__8579 = this;
    var this_sym8577__8580 = this;
    var coll__8581 = this_sym8577__8580;
    return coll__8581.cljs$core$ILookup$_lookup$arity$2(coll__8581, k)
  };
  var G__8601__3 = function(this_sym8578, k, not_found) {
    var this__8579 = this;
    var this_sym8578__8582 = this;
    var coll__8583 = this_sym8578__8582;
    return coll__8583.cljs$core$ILookup$_lookup$arity$3(coll__8583, k, not_found)
  };
  G__8601 = function(this_sym8578, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__8601__2.call(this, this_sym8578, k);
      case 3:
        return G__8601__3.call(this, this_sym8578, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__8601
}();
cljs.core.HashMap.prototype.apply = function(this_sym8557, args8558) {
  var this__8584 = this;
  return this_sym8557.call.apply(this_sym8557, [this_sym8557].concat(args8558.slice()))
};
cljs.core.HashMap.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, entry) {
  var this__8585 = this;
  if(cljs.core.vector_QMARK_.call(null, entry)) {
    return coll.cljs$core$IAssociative$_assoc$arity$3(coll, cljs.core._nth.call(null, entry, 0), cljs.core._nth.call(null, entry, 1))
  }else {
    return cljs.core.reduce.call(null, cljs.core._conj, coll, entry)
  }
};
cljs.core.HashMap.prototype.toString = function() {
  var this__8586 = this;
  var this__8587 = this;
  return cljs.core.pr_str.call(null, this__8587)
};
cljs.core.HashMap.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__8588 = this;
  if(this__8588.count > 0) {
    var hashes__8589 = cljs.core.js_keys.call(null, this__8588.hashobj).sort();
    return cljs.core.mapcat.call(null, function(p1__8556_SHARP_) {
      return cljs.core.map.call(null, cljs.core.vec, cljs.core.partition.call(null, 2, this__8588.hashobj[p1__8556_SHARP_]))
    }, hashes__8589)
  }else {
    return null
  }
};
cljs.core.HashMap.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__8590 = this;
  return this__8590.count
};
cljs.core.HashMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__8591 = this;
  return cljs.core.equiv_map.call(null, coll, other)
};
cljs.core.HashMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__8592 = this;
  return new cljs.core.HashMap(meta, this__8592.count, this__8592.hashobj, this__8592.__hash)
};
cljs.core.HashMap.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__8593 = this;
  return this__8593.meta
};
cljs.core.HashMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__8594 = this;
  return cljs.core.with_meta.call(null, cljs.core.HashMap.EMPTY, this__8594.meta)
};
cljs.core.HashMap.prototype.cljs$core$IMap$_dissoc$arity$2 = function(coll, k) {
  var this__8595 = this;
  var h__8596 = cljs.core.hash.call(null, k);
  var bucket__8597 = this__8595.hashobj[h__8596];
  var i__8598 = cljs.core.truth_(bucket__8597) ? cljs.core.scan_array.call(null, 2, k, bucket__8597) : null;
  if(cljs.core.not.call(null, i__8598)) {
    return coll
  }else {
    var new_hashobj__8599 = goog.object.clone(this__8595.hashobj);
    if(3 > bucket__8597.length) {
      cljs.core.js_delete.call(null, new_hashobj__8599, h__8596)
    }else {
      var new_bucket__8600 = bucket__8597.slice();
      new_bucket__8600.splice(i__8598, 2);
      new_hashobj__8599[h__8596] = new_bucket__8600
    }
    return new cljs.core.HashMap(this__8595.meta, this__8595.count - 1, new_hashobj__8599, null)
  }
};
cljs.core.HashMap;
cljs.core.HashMap.EMPTY = new cljs.core.HashMap(null, 0, {}, 0);
cljs.core.HashMap.fromArrays = function(ks, vs) {
  var len__8602 = ks.length;
  var i__8603 = 0;
  var out__8604 = cljs.core.HashMap.EMPTY;
  while(true) {
    if(i__8603 < len__8602) {
      var G__8605 = i__8603 + 1;
      var G__8606 = cljs.core.assoc.call(null, out__8604, ks[i__8603], vs[i__8603]);
      i__8603 = G__8605;
      out__8604 = G__8606;
      continue
    }else {
      return out__8604
    }
    break
  }
};
cljs.core.array_map_index_of = function array_map_index_of(m, k) {
  var arr__8610 = m.arr;
  var len__8611 = arr__8610.length;
  var i__8612 = 0;
  while(true) {
    if(len__8611 <= i__8612) {
      return-1
    }else {
      if(cljs.core._EQ_.call(null, arr__8610[i__8612], k)) {
        return i__8612
      }else {
        if("\ufdd0'else") {
          var G__8613 = i__8612 + 2;
          i__8612 = G__8613;
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
cljs.core.PersistentArrayMap.cljs$lang$ctorPrSeq = function(this__2322__auto__) {
  return cljs.core.list.call(null, "cljs.core/PersistentArrayMap")
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = function(coll) {
  var this__8616 = this;
  return new cljs.core.TransientArrayMap({}, this__8616.arr.length, this__8616.arr.slice())
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__8617 = this;
  var h__2205__auto____8618 = this__8617.__hash;
  if(!(h__2205__auto____8618 == null)) {
    return h__2205__auto____8618
  }else {
    var h__2205__auto____8619 = cljs.core.hash_imap.call(null, coll);
    this__8617.__hash = h__2205__auto____8619;
    return h__2205__auto____8619
  }
};
cljs.core.PersistentArrayMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(coll, k) {
  var this__8620 = this;
  return coll.cljs$core$ILookup$_lookup$arity$3(coll, k, null)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(coll, k, not_found) {
  var this__8621 = this;
  var idx__8622 = cljs.core.array_map_index_of.call(null, coll, k);
  if(idx__8622 === -1) {
    return not_found
  }else {
    return this__8621.arr[idx__8622 + 1]
  }
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(coll, k, v) {
  var this__8623 = this;
  var idx__8624 = cljs.core.array_map_index_of.call(null, coll, k);
  if(idx__8624 === -1) {
    if(this__8623.cnt < cljs.core.PersistentArrayMap.HASHMAP_THRESHOLD) {
      return new cljs.core.PersistentArrayMap(this__8623.meta, this__8623.cnt + 1, function() {
        var G__8625__8626 = this__8623.arr.slice();
        G__8625__8626.push(k);
        G__8625__8626.push(v);
        return G__8625__8626
      }(), null)
    }else {
      return cljs.core.persistent_BANG_.call(null, cljs.core.assoc_BANG_.call(null, cljs.core.transient$.call(null, cljs.core.into.call(null, cljs.core.PersistentHashMap.EMPTY, coll)), k, v))
    }
  }else {
    if(v === this__8623.arr[idx__8624 + 1]) {
      return coll
    }else {
      if("\ufdd0'else") {
        return new cljs.core.PersistentArrayMap(this__8623.meta, this__8623.cnt, function() {
          var G__8627__8628 = this__8623.arr.slice();
          G__8627__8628[idx__8624 + 1] = v;
          return G__8627__8628
        }(), null)
      }else {
        return null
      }
    }
  }
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = function(coll, k) {
  var this__8629 = this;
  return!(cljs.core.array_map_index_of.call(null, coll, k) === -1)
};
cljs.core.PersistentArrayMap.prototype.call = function() {
  var G__8661 = null;
  var G__8661__2 = function(this_sym8630, k) {
    var this__8632 = this;
    var this_sym8630__8633 = this;
    var coll__8634 = this_sym8630__8633;
    return coll__8634.cljs$core$ILookup$_lookup$arity$2(coll__8634, k)
  };
  var G__8661__3 = function(this_sym8631, k, not_found) {
    var this__8632 = this;
    var this_sym8631__8635 = this;
    var coll__8636 = this_sym8631__8635;
    return coll__8636.cljs$core$ILookup$_lookup$arity$3(coll__8636, k, not_found)
  };
  G__8661 = function(this_sym8631, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__8661__2.call(this, this_sym8631, k);
      case 3:
        return G__8661__3.call(this, this_sym8631, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__8661
}();
cljs.core.PersistentArrayMap.prototype.apply = function(this_sym8614, args8615) {
  var this__8637 = this;
  return this_sym8614.call.apply(this_sym8614, [this_sym8614].concat(args8615.slice()))
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = function(coll, f, init) {
  var this__8638 = this;
  var len__8639 = this__8638.arr.length;
  var i__8640 = 0;
  var init__8641 = init;
  while(true) {
    if(i__8640 < len__8639) {
      var init__8642 = f.call(null, init__8641, this__8638.arr[i__8640], this__8638.arr[i__8640 + 1]);
      if(cljs.core.reduced_QMARK_.call(null, init__8642)) {
        return cljs.core.deref.call(null, init__8642)
      }else {
        var G__8662 = i__8640 + 2;
        var G__8663 = init__8642;
        i__8640 = G__8662;
        init__8641 = G__8663;
        continue
      }
    }else {
      return null
    }
    break
  }
};
cljs.core.PersistentArrayMap.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, entry) {
  var this__8643 = this;
  if(cljs.core.vector_QMARK_.call(null, entry)) {
    return coll.cljs$core$IAssociative$_assoc$arity$3(coll, cljs.core._nth.call(null, entry, 0), cljs.core._nth.call(null, entry, 1))
  }else {
    return cljs.core.reduce.call(null, cljs.core._conj, coll, entry)
  }
};
cljs.core.PersistentArrayMap.prototype.toString = function() {
  var this__8644 = this;
  var this__8645 = this;
  return cljs.core.pr_str.call(null, this__8645)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__8646 = this;
  if(this__8646.cnt > 0) {
    var len__8647 = this__8646.arr.length;
    var array_map_seq__8648 = function array_map_seq(i) {
      return new cljs.core.LazySeq(null, false, function() {
        if(i < len__8647) {
          return cljs.core.cons.call(null, cljs.core.PersistentVector.fromArray([this__8646.arr[i], this__8646.arr[i + 1]], true), array_map_seq.call(null, i + 2))
        }else {
          return null
        }
      }, null)
    };
    return array_map_seq__8648.call(null, 0)
  }else {
    return null
  }
};
cljs.core.PersistentArrayMap.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__8649 = this;
  return this__8649.cnt
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__8650 = this;
  return cljs.core.equiv_map.call(null, coll, other)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__8651 = this;
  return new cljs.core.PersistentArrayMap(meta, this__8651.cnt, this__8651.arr, this__8651.__hash)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__8652 = this;
  return this__8652.meta
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__8653 = this;
  return cljs.core._with_meta.call(null, cljs.core.PersistentArrayMap.EMPTY, this__8653.meta)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IMap$_dissoc$arity$2 = function(coll, k) {
  var this__8654 = this;
  var idx__8655 = cljs.core.array_map_index_of.call(null, coll, k);
  if(idx__8655 >= 0) {
    var len__8656 = this__8654.arr.length;
    var new_len__8657 = len__8656 - 2;
    if(new_len__8657 === 0) {
      return coll.cljs$core$IEmptyableCollection$_empty$arity$1(coll)
    }else {
      var new_arr__8658 = cljs.core.make_array.call(null, new_len__8657);
      var s__8659 = 0;
      var d__8660 = 0;
      while(true) {
        if(s__8659 >= len__8656) {
          return new cljs.core.PersistentArrayMap(this__8654.meta, this__8654.cnt - 1, new_arr__8658, null)
        }else {
          if(cljs.core._EQ_.call(null, k, this__8654.arr[s__8659])) {
            var G__8664 = s__8659 + 2;
            var G__8665 = d__8660;
            s__8659 = G__8664;
            d__8660 = G__8665;
            continue
          }else {
            if("\ufdd0'else") {
              new_arr__8658[d__8660] = this__8654.arr[s__8659];
              new_arr__8658[d__8660 + 1] = this__8654.arr[s__8659 + 1];
              var G__8666 = s__8659 + 2;
              var G__8667 = d__8660 + 2;
              s__8659 = G__8666;
              d__8660 = G__8667;
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
  var len__8668 = cljs.core.count.call(null, ks);
  var i__8669 = 0;
  var out__8670 = cljs.core.transient$.call(null, cljs.core.PersistentArrayMap.EMPTY);
  while(true) {
    if(i__8669 < len__8668) {
      var G__8671 = i__8669 + 1;
      var G__8672 = cljs.core.assoc_BANG_.call(null, out__8670, ks[i__8669], vs[i__8669]);
      i__8669 = G__8671;
      out__8670 = G__8672;
      continue
    }else {
      return cljs.core.persistent_BANG_.call(null, out__8670)
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
cljs.core.TransientArrayMap.cljs$lang$ctorPrSeq = function(this__2322__auto__) {
  return cljs.core.list.call(null, "cljs.core/TransientArrayMap")
};
cljs.core.TransientArrayMap.prototype.cljs$core$ITransientMap$_dissoc_BANG_$arity$2 = function(tcoll, key) {
  var this__8673 = this;
  if(cljs.core.truth_(this__8673.editable_QMARK_)) {
    var idx__8674 = cljs.core.array_map_index_of.call(null, tcoll, key);
    if(idx__8674 >= 0) {
      this__8673.arr[idx__8674] = this__8673.arr[this__8673.len - 2];
      this__8673.arr[idx__8674 + 1] = this__8673.arr[this__8673.len - 1];
      var G__8675__8676 = this__8673.arr;
      G__8675__8676.pop();
      G__8675__8676.pop();
      G__8675__8676;
      this__8673.len = this__8673.len - 2
    }else {
    }
    return tcoll
  }else {
    throw new Error("dissoc! after persistent!");
  }
};
cljs.core.TransientArrayMap.prototype.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3 = function(tcoll, key, val) {
  var this__8677 = this;
  if(cljs.core.truth_(this__8677.editable_QMARK_)) {
    var idx__8678 = cljs.core.array_map_index_of.call(null, tcoll, key);
    if(idx__8678 === -1) {
      if(this__8677.len + 2 <= 2 * cljs.core.PersistentArrayMap.HASHMAP_THRESHOLD) {
        this__8677.len = this__8677.len + 2;
        this__8677.arr.push(key);
        this__8677.arr.push(val);
        return tcoll
      }else {
        return cljs.core.assoc_BANG_.call(null, cljs.core.array__GT_transient_hash_map.call(null, this__8677.len, this__8677.arr), key, val)
      }
    }else {
      if(val === this__8677.arr[idx__8678 + 1]) {
        return tcoll
      }else {
        this__8677.arr[idx__8678 + 1] = val;
        return tcoll
      }
    }
  }else {
    throw new Error("assoc! after persistent!");
  }
};
cljs.core.TransientArrayMap.prototype.cljs$core$ITransientCollection$_conj_BANG_$arity$2 = function(tcoll, o) {
  var this__8679 = this;
  if(cljs.core.truth_(this__8679.editable_QMARK_)) {
    if(function() {
      var G__8680__8681 = o;
      if(G__8680__8681) {
        if(function() {
          var or__3824__auto____8682 = G__8680__8681.cljs$lang$protocol_mask$partition0$ & 2048;
          if(or__3824__auto____8682) {
            return or__3824__auto____8682
          }else {
            return G__8680__8681.cljs$core$IMapEntry$
          }
        }()) {
          return true
        }else {
          if(!G__8680__8681.cljs$lang$protocol_mask$partition0$) {
            return cljs.core.type_satisfies_.call(null, cljs.core.IMapEntry, G__8680__8681)
          }else {
            return false
          }
        }
      }else {
        return cljs.core.type_satisfies_.call(null, cljs.core.IMapEntry, G__8680__8681)
      }
    }()) {
      return tcoll.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3(tcoll, cljs.core.key.call(null, o), cljs.core.val.call(null, o))
    }else {
      var es__8683 = cljs.core.seq.call(null, o);
      var tcoll__8684 = tcoll;
      while(true) {
        var temp__3971__auto____8685 = cljs.core.first.call(null, es__8683);
        if(cljs.core.truth_(temp__3971__auto____8685)) {
          var e__8686 = temp__3971__auto____8685;
          var G__8692 = cljs.core.next.call(null, es__8683);
          var G__8693 = tcoll__8684.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3(tcoll__8684, cljs.core.key.call(null, e__8686), cljs.core.val.call(null, e__8686));
          es__8683 = G__8692;
          tcoll__8684 = G__8693;
          continue
        }else {
          return tcoll__8684
        }
        break
      }
    }
  }else {
    throw new Error("conj! after persistent!");
  }
};
cljs.core.TransientArrayMap.prototype.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 = function(tcoll) {
  var this__8687 = this;
  if(cljs.core.truth_(this__8687.editable_QMARK_)) {
    this__8687.editable_QMARK_ = false;
    return new cljs.core.PersistentArrayMap(null, cljs.core.quot.call(null, this__8687.len, 2), this__8687.arr, null)
  }else {
    throw new Error("persistent! called twice");
  }
};
cljs.core.TransientArrayMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(tcoll, k) {
  var this__8688 = this;
  return tcoll.cljs$core$ILookup$_lookup$arity$3(tcoll, k, null)
};
cljs.core.TransientArrayMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(tcoll, k, not_found) {
  var this__8689 = this;
  if(cljs.core.truth_(this__8689.editable_QMARK_)) {
    var idx__8690 = cljs.core.array_map_index_of.call(null, tcoll, k);
    if(idx__8690 === -1) {
      return not_found
    }else {
      return this__8689.arr[idx__8690 + 1]
    }
  }else {
    throw new Error("lookup after persistent!");
  }
};
cljs.core.TransientArrayMap.prototype.cljs$core$ICounted$_count$arity$1 = function(tcoll) {
  var this__8691 = this;
  if(cljs.core.truth_(this__8691.editable_QMARK_)) {
    return cljs.core.quot.call(null, this__8691.len, 2)
  }else {
    throw new Error("count after persistent!");
  }
};
cljs.core.TransientArrayMap;
cljs.core.array__GT_transient_hash_map = function array__GT_transient_hash_map(len, arr) {
  var out__8696 = cljs.core.transient$.call(null, cljs.core.ObjMap.EMPTY);
  var i__8697 = 0;
  while(true) {
    if(i__8697 < len) {
      var G__8698 = cljs.core.assoc_BANG_.call(null, out__8696, arr[i__8697], arr[i__8697 + 1]);
      var G__8699 = i__8697 + 2;
      out__8696 = G__8698;
      i__8697 = G__8699;
      continue
    }else {
      return out__8696
    }
    break
  }
};
cljs.core.Box = function(val) {
  this.val = val
};
cljs.core.Box.cljs$lang$type = true;
cljs.core.Box.cljs$lang$ctorPrSeq = function(this__2323__auto__) {
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
    var G__8704__8705 = arr.slice();
    G__8704__8705[i] = a;
    return G__8704__8705
  };
  var clone_and_set__5 = function(arr, i, a, j, b) {
    var G__8706__8707 = arr.slice();
    G__8706__8707[i] = a;
    G__8706__8707[j] = b;
    return G__8706__8707
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
  var new_arr__8709 = cljs.core.make_array.call(null, arr.length - 2);
  cljs.core.array_copy.call(null, arr, 0, new_arr__8709, 0, 2 * i);
  cljs.core.array_copy.call(null, arr, 2 * (i + 1), new_arr__8709, 2 * i, new_arr__8709.length - 2 * i);
  return new_arr__8709
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
    var editable__8712 = inode.ensure_editable(edit);
    editable__8712.arr[i] = a;
    return editable__8712
  };
  var edit_and_set__6 = function(inode, edit, i, a, j, b) {
    var editable__8713 = inode.ensure_editable(edit);
    editable__8713.arr[i] = a;
    editable__8713.arr[j] = b;
    return editable__8713
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
  var len__8720 = arr.length;
  var i__8721 = 0;
  var init__8722 = init;
  while(true) {
    if(i__8721 < len__8720) {
      var init__8725 = function() {
        var k__8723 = arr[i__8721];
        if(!(k__8723 == null)) {
          return f.call(null, init__8722, k__8723, arr[i__8721 + 1])
        }else {
          var node__8724 = arr[i__8721 + 1];
          if(!(node__8724 == null)) {
            return node__8724.kv_reduce(f, init__8722)
          }else {
            return init__8722
          }
        }
      }();
      if(cljs.core.reduced_QMARK_.call(null, init__8725)) {
        return cljs.core.deref.call(null, init__8725)
      }else {
        var G__8726 = i__8721 + 2;
        var G__8727 = init__8725;
        i__8721 = G__8726;
        init__8722 = G__8727;
        continue
      }
    }else {
      return init__8722
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
cljs.core.BitmapIndexedNode.cljs$lang$ctorPrSeq = function(this__2322__auto__) {
  return cljs.core.list.call(null, "cljs.core/BitmapIndexedNode")
};
cljs.core.BitmapIndexedNode.prototype.edit_and_remove_pair = function(e, bit, i) {
  var this__8728 = this;
  var inode__8729 = this;
  if(this__8728.bitmap === bit) {
    return null
  }else {
    var editable__8730 = inode__8729.ensure_editable(e);
    var earr__8731 = editable__8730.arr;
    var len__8732 = earr__8731.length;
    editable__8730.bitmap = bit ^ editable__8730.bitmap;
    cljs.core.array_copy.call(null, earr__8731, 2 * (i + 1), earr__8731, 2 * i, len__8732 - 2 * (i + 1));
    earr__8731[len__8732 - 2] = null;
    earr__8731[len__8732 - 1] = null;
    return editable__8730
  }
};
cljs.core.BitmapIndexedNode.prototype.inode_assoc_BANG_ = function(edit, shift, hash, key, val, added_leaf_QMARK_) {
  var this__8733 = this;
  var inode__8734 = this;
  var bit__8735 = 1 << (hash >>> shift & 31);
  var idx__8736 = cljs.core.bitmap_indexed_node_index.call(null, this__8733.bitmap, bit__8735);
  if((this__8733.bitmap & bit__8735) === 0) {
    var n__8737 = cljs.core.bit_count.call(null, this__8733.bitmap);
    if(2 * n__8737 < this__8733.arr.length) {
      var editable__8738 = inode__8734.ensure_editable(edit);
      var earr__8739 = editable__8738.arr;
      added_leaf_QMARK_.val = true;
      cljs.core.array_copy_downward.call(null, earr__8739, 2 * idx__8736, earr__8739, 2 * (idx__8736 + 1), 2 * (n__8737 - idx__8736));
      earr__8739[2 * idx__8736] = key;
      earr__8739[2 * idx__8736 + 1] = val;
      editable__8738.bitmap = editable__8738.bitmap | bit__8735;
      return editable__8738
    }else {
      if(n__8737 >= 16) {
        var nodes__8740 = cljs.core.make_array.call(null, 32);
        var jdx__8741 = hash >>> shift & 31;
        nodes__8740[jdx__8741] = cljs.core.BitmapIndexedNode.EMPTY.inode_assoc_BANG_(edit, shift + 5, hash, key, val, added_leaf_QMARK_);
        var i__8742 = 0;
        var j__8743 = 0;
        while(true) {
          if(i__8742 < 32) {
            if((this__8733.bitmap >>> i__8742 & 1) === 0) {
              var G__8796 = i__8742 + 1;
              var G__8797 = j__8743;
              i__8742 = G__8796;
              j__8743 = G__8797;
              continue
            }else {
              nodes__8740[i__8742] = !(this__8733.arr[j__8743] == null) ? cljs.core.BitmapIndexedNode.EMPTY.inode_assoc_BANG_(edit, shift + 5, cljs.core.hash.call(null, this__8733.arr[j__8743]), this__8733.arr[j__8743], this__8733.arr[j__8743 + 1], added_leaf_QMARK_) : this__8733.arr[j__8743 + 1];
              var G__8798 = i__8742 + 1;
              var G__8799 = j__8743 + 2;
              i__8742 = G__8798;
              j__8743 = G__8799;
              continue
            }
          }else {
          }
          break
        }
        return new cljs.core.ArrayNode(edit, n__8737 + 1, nodes__8740)
      }else {
        if("\ufdd0'else") {
          var new_arr__8744 = cljs.core.make_array.call(null, 2 * (n__8737 + 4));
          cljs.core.array_copy.call(null, this__8733.arr, 0, new_arr__8744, 0, 2 * idx__8736);
          new_arr__8744[2 * idx__8736] = key;
          new_arr__8744[2 * idx__8736 + 1] = val;
          cljs.core.array_copy.call(null, this__8733.arr, 2 * idx__8736, new_arr__8744, 2 * (idx__8736 + 1), 2 * (n__8737 - idx__8736));
          added_leaf_QMARK_.val = true;
          var editable__8745 = inode__8734.ensure_editable(edit);
          editable__8745.arr = new_arr__8744;
          editable__8745.bitmap = editable__8745.bitmap | bit__8735;
          return editable__8745
        }else {
          return null
        }
      }
    }
  }else {
    var key_or_nil__8746 = this__8733.arr[2 * idx__8736];
    var val_or_node__8747 = this__8733.arr[2 * idx__8736 + 1];
    if(key_or_nil__8746 == null) {
      var n__8748 = val_or_node__8747.inode_assoc_BANG_(edit, shift + 5, hash, key, val, added_leaf_QMARK_);
      if(n__8748 === val_or_node__8747) {
        return inode__8734
      }else {
        return cljs.core.edit_and_set.call(null, inode__8734, edit, 2 * idx__8736 + 1, n__8748)
      }
    }else {
      if(cljs.core.key_test.call(null, key, key_or_nil__8746)) {
        if(val === val_or_node__8747) {
          return inode__8734
        }else {
          return cljs.core.edit_and_set.call(null, inode__8734, edit, 2 * idx__8736 + 1, val)
        }
      }else {
        if("\ufdd0'else") {
          added_leaf_QMARK_.val = true;
          return cljs.core.edit_and_set.call(null, inode__8734, edit, 2 * idx__8736, null, 2 * idx__8736 + 1, cljs.core.create_node.call(null, edit, shift + 5, key_or_nil__8746, val_or_node__8747, hash, key, val))
        }else {
          return null
        }
      }
    }
  }
};
cljs.core.BitmapIndexedNode.prototype.inode_seq = function() {
  var this__8749 = this;
  var inode__8750 = this;
  return cljs.core.create_inode_seq.call(null, this__8749.arr)
};
cljs.core.BitmapIndexedNode.prototype.inode_without_BANG_ = function(edit, shift, hash, key, removed_leaf_QMARK_) {
  var this__8751 = this;
  var inode__8752 = this;
  var bit__8753 = 1 << (hash >>> shift & 31);
  if((this__8751.bitmap & bit__8753) === 0) {
    return inode__8752
  }else {
    var idx__8754 = cljs.core.bitmap_indexed_node_index.call(null, this__8751.bitmap, bit__8753);
    var key_or_nil__8755 = this__8751.arr[2 * idx__8754];
    var val_or_node__8756 = this__8751.arr[2 * idx__8754 + 1];
    if(key_or_nil__8755 == null) {
      var n__8757 = val_or_node__8756.inode_without_BANG_(edit, shift + 5, hash, key, removed_leaf_QMARK_);
      if(n__8757 === val_or_node__8756) {
        return inode__8752
      }else {
        if(!(n__8757 == null)) {
          return cljs.core.edit_and_set.call(null, inode__8752, edit, 2 * idx__8754 + 1, n__8757)
        }else {
          if(this__8751.bitmap === bit__8753) {
            return null
          }else {
            if("\ufdd0'else") {
              return inode__8752.edit_and_remove_pair(edit, bit__8753, idx__8754)
            }else {
              return null
            }
          }
        }
      }
    }else {
      if(cljs.core.key_test.call(null, key, key_or_nil__8755)) {
        removed_leaf_QMARK_[0] = true;
        return inode__8752.edit_and_remove_pair(edit, bit__8753, idx__8754)
      }else {
        if("\ufdd0'else") {
          return inode__8752
        }else {
          return null
        }
      }
    }
  }
};
cljs.core.BitmapIndexedNode.prototype.ensure_editable = function(e) {
  var this__8758 = this;
  var inode__8759 = this;
  if(e === this__8758.edit) {
    return inode__8759
  }else {
    var n__8760 = cljs.core.bit_count.call(null, this__8758.bitmap);
    var new_arr__8761 = cljs.core.make_array.call(null, n__8760 < 0 ? 4 : 2 * (n__8760 + 1));
    cljs.core.array_copy.call(null, this__8758.arr, 0, new_arr__8761, 0, 2 * n__8760);
    return new cljs.core.BitmapIndexedNode(e, this__8758.bitmap, new_arr__8761)
  }
};
cljs.core.BitmapIndexedNode.prototype.kv_reduce = function(f, init) {
  var this__8762 = this;
  var inode__8763 = this;
  return cljs.core.inode_kv_reduce.call(null, this__8762.arr, f, init)
};
cljs.core.BitmapIndexedNode.prototype.inode_find = function(shift, hash, key, not_found) {
  var this__8764 = this;
  var inode__8765 = this;
  var bit__8766 = 1 << (hash >>> shift & 31);
  if((this__8764.bitmap & bit__8766) === 0) {
    return not_found
  }else {
    var idx__8767 = cljs.core.bitmap_indexed_node_index.call(null, this__8764.bitmap, bit__8766);
    var key_or_nil__8768 = this__8764.arr[2 * idx__8767];
    var val_or_node__8769 = this__8764.arr[2 * idx__8767 + 1];
    if(key_or_nil__8768 == null) {
      return val_or_node__8769.inode_find(shift + 5, hash, key, not_found)
    }else {
      if(cljs.core.key_test.call(null, key, key_or_nil__8768)) {
        return cljs.core.PersistentVector.fromArray([key_or_nil__8768, val_or_node__8769], true)
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
  var this__8770 = this;
  var inode__8771 = this;
  var bit__8772 = 1 << (hash >>> shift & 31);
  if((this__8770.bitmap & bit__8772) === 0) {
    return inode__8771
  }else {
    var idx__8773 = cljs.core.bitmap_indexed_node_index.call(null, this__8770.bitmap, bit__8772);
    var key_or_nil__8774 = this__8770.arr[2 * idx__8773];
    var val_or_node__8775 = this__8770.arr[2 * idx__8773 + 1];
    if(key_or_nil__8774 == null) {
      var n__8776 = val_or_node__8775.inode_without(shift + 5, hash, key);
      if(n__8776 === val_or_node__8775) {
        return inode__8771
      }else {
        if(!(n__8776 == null)) {
          return new cljs.core.BitmapIndexedNode(null, this__8770.bitmap, cljs.core.clone_and_set.call(null, this__8770.arr, 2 * idx__8773 + 1, n__8776))
        }else {
          if(this__8770.bitmap === bit__8772) {
            return null
          }else {
            if("\ufdd0'else") {
              return new cljs.core.BitmapIndexedNode(null, this__8770.bitmap ^ bit__8772, cljs.core.remove_pair.call(null, this__8770.arr, idx__8773))
            }else {
              return null
            }
          }
        }
      }
    }else {
      if(cljs.core.key_test.call(null, key, key_or_nil__8774)) {
        return new cljs.core.BitmapIndexedNode(null, this__8770.bitmap ^ bit__8772, cljs.core.remove_pair.call(null, this__8770.arr, idx__8773))
      }else {
        if("\ufdd0'else") {
          return inode__8771
        }else {
          return null
        }
      }
    }
  }
};
cljs.core.BitmapIndexedNode.prototype.inode_assoc = function(shift, hash, key, val, added_leaf_QMARK_) {
  var this__8777 = this;
  var inode__8778 = this;
  var bit__8779 = 1 << (hash >>> shift & 31);
  var idx__8780 = cljs.core.bitmap_indexed_node_index.call(null, this__8777.bitmap, bit__8779);
  if((this__8777.bitmap & bit__8779) === 0) {
    var n__8781 = cljs.core.bit_count.call(null, this__8777.bitmap);
    if(n__8781 >= 16) {
      var nodes__8782 = cljs.core.make_array.call(null, 32);
      var jdx__8783 = hash >>> shift & 31;
      nodes__8782[jdx__8783] = cljs.core.BitmapIndexedNode.EMPTY.inode_assoc(shift + 5, hash, key, val, added_leaf_QMARK_);
      var i__8784 = 0;
      var j__8785 = 0;
      while(true) {
        if(i__8784 < 32) {
          if((this__8777.bitmap >>> i__8784 & 1) === 0) {
            var G__8800 = i__8784 + 1;
            var G__8801 = j__8785;
            i__8784 = G__8800;
            j__8785 = G__8801;
            continue
          }else {
            nodes__8782[i__8784] = !(this__8777.arr[j__8785] == null) ? cljs.core.BitmapIndexedNode.EMPTY.inode_assoc(shift + 5, cljs.core.hash.call(null, this__8777.arr[j__8785]), this__8777.arr[j__8785], this__8777.arr[j__8785 + 1], added_leaf_QMARK_) : this__8777.arr[j__8785 + 1];
            var G__8802 = i__8784 + 1;
            var G__8803 = j__8785 + 2;
            i__8784 = G__8802;
            j__8785 = G__8803;
            continue
          }
        }else {
        }
        break
      }
      return new cljs.core.ArrayNode(null, n__8781 + 1, nodes__8782)
    }else {
      var new_arr__8786 = cljs.core.make_array.call(null, 2 * (n__8781 + 1));
      cljs.core.array_copy.call(null, this__8777.arr, 0, new_arr__8786, 0, 2 * idx__8780);
      new_arr__8786[2 * idx__8780] = key;
      new_arr__8786[2 * idx__8780 + 1] = val;
      cljs.core.array_copy.call(null, this__8777.arr, 2 * idx__8780, new_arr__8786, 2 * (idx__8780 + 1), 2 * (n__8781 - idx__8780));
      added_leaf_QMARK_.val = true;
      return new cljs.core.BitmapIndexedNode(null, this__8777.bitmap | bit__8779, new_arr__8786)
    }
  }else {
    var key_or_nil__8787 = this__8777.arr[2 * idx__8780];
    var val_or_node__8788 = this__8777.arr[2 * idx__8780 + 1];
    if(key_or_nil__8787 == null) {
      var n__8789 = val_or_node__8788.inode_assoc(shift + 5, hash, key, val, added_leaf_QMARK_);
      if(n__8789 === val_or_node__8788) {
        return inode__8778
      }else {
        return new cljs.core.BitmapIndexedNode(null, this__8777.bitmap, cljs.core.clone_and_set.call(null, this__8777.arr, 2 * idx__8780 + 1, n__8789))
      }
    }else {
      if(cljs.core.key_test.call(null, key, key_or_nil__8787)) {
        if(val === val_or_node__8788) {
          return inode__8778
        }else {
          return new cljs.core.BitmapIndexedNode(null, this__8777.bitmap, cljs.core.clone_and_set.call(null, this__8777.arr, 2 * idx__8780 + 1, val))
        }
      }else {
        if("\ufdd0'else") {
          added_leaf_QMARK_.val = true;
          return new cljs.core.BitmapIndexedNode(null, this__8777.bitmap, cljs.core.clone_and_set.call(null, this__8777.arr, 2 * idx__8780, null, 2 * idx__8780 + 1, cljs.core.create_node.call(null, shift + 5, key_or_nil__8787, val_or_node__8788, hash, key, val)))
        }else {
          return null
        }
      }
    }
  }
};
cljs.core.BitmapIndexedNode.prototype.inode_lookup = function(shift, hash, key, not_found) {
  var this__8790 = this;
  var inode__8791 = this;
  var bit__8792 = 1 << (hash >>> shift & 31);
  if((this__8790.bitmap & bit__8792) === 0) {
    return not_found
  }else {
    var idx__8793 = cljs.core.bitmap_indexed_node_index.call(null, this__8790.bitmap, bit__8792);
    var key_or_nil__8794 = this__8790.arr[2 * idx__8793];
    var val_or_node__8795 = this__8790.arr[2 * idx__8793 + 1];
    if(key_or_nil__8794 == null) {
      return val_or_node__8795.inode_lookup(shift + 5, hash, key, not_found)
    }else {
      if(cljs.core.key_test.call(null, key, key_or_nil__8794)) {
        return val_or_node__8795
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
  var arr__8811 = array_node.arr;
  var len__8812 = 2 * (array_node.cnt - 1);
  var new_arr__8813 = cljs.core.make_array.call(null, len__8812);
  var i__8814 = 0;
  var j__8815 = 1;
  var bitmap__8816 = 0;
  while(true) {
    if(i__8814 < len__8812) {
      if(function() {
        var and__3822__auto____8817 = !(i__8814 === idx);
        if(and__3822__auto____8817) {
          return!(arr__8811[i__8814] == null)
        }else {
          return and__3822__auto____8817
        }
      }()) {
        new_arr__8813[j__8815] = arr__8811[i__8814];
        var G__8818 = i__8814 + 1;
        var G__8819 = j__8815 + 2;
        var G__8820 = bitmap__8816 | 1 << i__8814;
        i__8814 = G__8818;
        j__8815 = G__8819;
        bitmap__8816 = G__8820;
        continue
      }else {
        var G__8821 = i__8814 + 1;
        var G__8822 = j__8815;
        var G__8823 = bitmap__8816;
        i__8814 = G__8821;
        j__8815 = G__8822;
        bitmap__8816 = G__8823;
        continue
      }
    }else {
      return new cljs.core.BitmapIndexedNode(edit, bitmap__8816, new_arr__8813)
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
cljs.core.ArrayNode.cljs$lang$ctorPrSeq = function(this__2322__auto__) {
  return cljs.core.list.call(null, "cljs.core/ArrayNode")
};
cljs.core.ArrayNode.prototype.inode_assoc_BANG_ = function(edit, shift, hash, key, val, added_leaf_QMARK_) {
  var this__8824 = this;
  var inode__8825 = this;
  var idx__8826 = hash >>> shift & 31;
  var node__8827 = this__8824.arr[idx__8826];
  if(node__8827 == null) {
    var editable__8828 = cljs.core.edit_and_set.call(null, inode__8825, edit, idx__8826, cljs.core.BitmapIndexedNode.EMPTY.inode_assoc_BANG_(edit, shift + 5, hash, key, val, added_leaf_QMARK_));
    editable__8828.cnt = editable__8828.cnt + 1;
    return editable__8828
  }else {
    var n__8829 = node__8827.inode_assoc_BANG_(edit, shift + 5, hash, key, val, added_leaf_QMARK_);
    if(n__8829 === node__8827) {
      return inode__8825
    }else {
      return cljs.core.edit_and_set.call(null, inode__8825, edit, idx__8826, n__8829)
    }
  }
};
cljs.core.ArrayNode.prototype.inode_seq = function() {
  var this__8830 = this;
  var inode__8831 = this;
  return cljs.core.create_array_node_seq.call(null, this__8830.arr)
};
cljs.core.ArrayNode.prototype.inode_without_BANG_ = function(edit, shift, hash, key, removed_leaf_QMARK_) {
  var this__8832 = this;
  var inode__8833 = this;
  var idx__8834 = hash >>> shift & 31;
  var node__8835 = this__8832.arr[idx__8834];
  if(node__8835 == null) {
    return inode__8833
  }else {
    var n__8836 = node__8835.inode_without_BANG_(edit, shift + 5, hash, key, removed_leaf_QMARK_);
    if(n__8836 === node__8835) {
      return inode__8833
    }else {
      if(n__8836 == null) {
        if(this__8832.cnt <= 8) {
          return cljs.core.pack_array_node.call(null, inode__8833, edit, idx__8834)
        }else {
          var editable__8837 = cljs.core.edit_and_set.call(null, inode__8833, edit, idx__8834, n__8836);
          editable__8837.cnt = editable__8837.cnt - 1;
          return editable__8837
        }
      }else {
        if("\ufdd0'else") {
          return cljs.core.edit_and_set.call(null, inode__8833, edit, idx__8834, n__8836)
        }else {
          return null
        }
      }
    }
  }
};
cljs.core.ArrayNode.prototype.ensure_editable = function(e) {
  var this__8838 = this;
  var inode__8839 = this;
  if(e === this__8838.edit) {
    return inode__8839
  }else {
    return new cljs.core.ArrayNode(e, this__8838.cnt, this__8838.arr.slice())
  }
};
cljs.core.ArrayNode.prototype.kv_reduce = function(f, init) {
  var this__8840 = this;
  var inode__8841 = this;
  var len__8842 = this__8840.arr.length;
  var i__8843 = 0;
  var init__8844 = init;
  while(true) {
    if(i__8843 < len__8842) {
      var node__8845 = this__8840.arr[i__8843];
      if(!(node__8845 == null)) {
        var init__8846 = node__8845.kv_reduce(f, init__8844);
        if(cljs.core.reduced_QMARK_.call(null, init__8846)) {
          return cljs.core.deref.call(null, init__8846)
        }else {
          var G__8865 = i__8843 + 1;
          var G__8866 = init__8846;
          i__8843 = G__8865;
          init__8844 = G__8866;
          continue
        }
      }else {
        return null
      }
    }else {
      return init__8844
    }
    break
  }
};
cljs.core.ArrayNode.prototype.inode_find = function(shift, hash, key, not_found) {
  var this__8847 = this;
  var inode__8848 = this;
  var idx__8849 = hash >>> shift & 31;
  var node__8850 = this__8847.arr[idx__8849];
  if(!(node__8850 == null)) {
    return node__8850.inode_find(shift + 5, hash, key, not_found)
  }else {
    return not_found
  }
};
cljs.core.ArrayNode.prototype.inode_without = function(shift, hash, key) {
  var this__8851 = this;
  var inode__8852 = this;
  var idx__8853 = hash >>> shift & 31;
  var node__8854 = this__8851.arr[idx__8853];
  if(!(node__8854 == null)) {
    var n__8855 = node__8854.inode_without(shift + 5, hash, key);
    if(n__8855 === node__8854) {
      return inode__8852
    }else {
      if(n__8855 == null) {
        if(this__8851.cnt <= 8) {
          return cljs.core.pack_array_node.call(null, inode__8852, null, idx__8853)
        }else {
          return new cljs.core.ArrayNode(null, this__8851.cnt - 1, cljs.core.clone_and_set.call(null, this__8851.arr, idx__8853, n__8855))
        }
      }else {
        if("\ufdd0'else") {
          return new cljs.core.ArrayNode(null, this__8851.cnt, cljs.core.clone_and_set.call(null, this__8851.arr, idx__8853, n__8855))
        }else {
          return null
        }
      }
    }
  }else {
    return inode__8852
  }
};
cljs.core.ArrayNode.prototype.inode_assoc = function(shift, hash, key, val, added_leaf_QMARK_) {
  var this__8856 = this;
  var inode__8857 = this;
  var idx__8858 = hash >>> shift & 31;
  var node__8859 = this__8856.arr[idx__8858];
  if(node__8859 == null) {
    return new cljs.core.ArrayNode(null, this__8856.cnt + 1, cljs.core.clone_and_set.call(null, this__8856.arr, idx__8858, cljs.core.BitmapIndexedNode.EMPTY.inode_assoc(shift + 5, hash, key, val, added_leaf_QMARK_)))
  }else {
    var n__8860 = node__8859.inode_assoc(shift + 5, hash, key, val, added_leaf_QMARK_);
    if(n__8860 === node__8859) {
      return inode__8857
    }else {
      return new cljs.core.ArrayNode(null, this__8856.cnt, cljs.core.clone_and_set.call(null, this__8856.arr, idx__8858, n__8860))
    }
  }
};
cljs.core.ArrayNode.prototype.inode_lookup = function(shift, hash, key, not_found) {
  var this__8861 = this;
  var inode__8862 = this;
  var idx__8863 = hash >>> shift & 31;
  var node__8864 = this__8861.arr[idx__8863];
  if(!(node__8864 == null)) {
    return node__8864.inode_lookup(shift + 5, hash, key, not_found)
  }else {
    return not_found
  }
};
cljs.core.ArrayNode;
cljs.core.hash_collision_node_find_index = function hash_collision_node_find_index(arr, cnt, key) {
  var lim__8869 = 2 * cnt;
  var i__8870 = 0;
  while(true) {
    if(i__8870 < lim__8869) {
      if(cljs.core.key_test.call(null, key, arr[i__8870])) {
        return i__8870
      }else {
        var G__8871 = i__8870 + 2;
        i__8870 = G__8871;
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
cljs.core.HashCollisionNode.cljs$lang$ctorPrSeq = function(this__2322__auto__) {
  return cljs.core.list.call(null, "cljs.core/HashCollisionNode")
};
cljs.core.HashCollisionNode.prototype.inode_assoc_BANG_ = function(edit, shift, hash, key, val, added_leaf_QMARK_) {
  var this__8872 = this;
  var inode__8873 = this;
  if(hash === this__8872.collision_hash) {
    var idx__8874 = cljs.core.hash_collision_node_find_index.call(null, this__8872.arr, this__8872.cnt, key);
    if(idx__8874 === -1) {
      if(this__8872.arr.length > 2 * this__8872.cnt) {
        var editable__8875 = cljs.core.edit_and_set.call(null, inode__8873, edit, 2 * this__8872.cnt, key, 2 * this__8872.cnt + 1, val);
        added_leaf_QMARK_.val = true;
        editable__8875.cnt = editable__8875.cnt + 1;
        return editable__8875
      }else {
        var len__8876 = this__8872.arr.length;
        var new_arr__8877 = cljs.core.make_array.call(null, len__8876 + 2);
        cljs.core.array_copy.call(null, this__8872.arr, 0, new_arr__8877, 0, len__8876);
        new_arr__8877[len__8876] = key;
        new_arr__8877[len__8876 + 1] = val;
        added_leaf_QMARK_.val = true;
        return inode__8873.ensure_editable_array(edit, this__8872.cnt + 1, new_arr__8877)
      }
    }else {
      if(this__8872.arr[idx__8874 + 1] === val) {
        return inode__8873
      }else {
        return cljs.core.edit_and_set.call(null, inode__8873, edit, idx__8874 + 1, val)
      }
    }
  }else {
    return(new cljs.core.BitmapIndexedNode(edit, 1 << (this__8872.collision_hash >>> shift & 31), [null, inode__8873, null, null])).inode_assoc_BANG_(edit, shift, hash, key, val, added_leaf_QMARK_)
  }
};
cljs.core.HashCollisionNode.prototype.inode_seq = function() {
  var this__8878 = this;
  var inode__8879 = this;
  return cljs.core.create_inode_seq.call(null, this__8878.arr)
};
cljs.core.HashCollisionNode.prototype.inode_without_BANG_ = function(edit, shift, hash, key, removed_leaf_QMARK_) {
  var this__8880 = this;
  var inode__8881 = this;
  var idx__8882 = cljs.core.hash_collision_node_find_index.call(null, this__8880.arr, this__8880.cnt, key);
  if(idx__8882 === -1) {
    return inode__8881
  }else {
    removed_leaf_QMARK_[0] = true;
    if(this__8880.cnt === 1) {
      return null
    }else {
      var editable__8883 = inode__8881.ensure_editable(edit);
      var earr__8884 = editable__8883.arr;
      earr__8884[idx__8882] = earr__8884[2 * this__8880.cnt - 2];
      earr__8884[idx__8882 + 1] = earr__8884[2 * this__8880.cnt - 1];
      earr__8884[2 * this__8880.cnt - 1] = null;
      earr__8884[2 * this__8880.cnt - 2] = null;
      editable__8883.cnt = editable__8883.cnt - 1;
      return editable__8883
    }
  }
};
cljs.core.HashCollisionNode.prototype.ensure_editable = function(e) {
  var this__8885 = this;
  var inode__8886 = this;
  if(e === this__8885.edit) {
    return inode__8886
  }else {
    var new_arr__8887 = cljs.core.make_array.call(null, 2 * (this__8885.cnt + 1));
    cljs.core.array_copy.call(null, this__8885.arr, 0, new_arr__8887, 0, 2 * this__8885.cnt);
    return new cljs.core.HashCollisionNode(e, this__8885.collision_hash, this__8885.cnt, new_arr__8887)
  }
};
cljs.core.HashCollisionNode.prototype.kv_reduce = function(f, init) {
  var this__8888 = this;
  var inode__8889 = this;
  return cljs.core.inode_kv_reduce.call(null, this__8888.arr, f, init)
};
cljs.core.HashCollisionNode.prototype.inode_find = function(shift, hash, key, not_found) {
  var this__8890 = this;
  var inode__8891 = this;
  var idx__8892 = cljs.core.hash_collision_node_find_index.call(null, this__8890.arr, this__8890.cnt, key);
  if(idx__8892 < 0) {
    return not_found
  }else {
    if(cljs.core.key_test.call(null, key, this__8890.arr[idx__8892])) {
      return cljs.core.PersistentVector.fromArray([this__8890.arr[idx__8892], this__8890.arr[idx__8892 + 1]], true)
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
  var this__8893 = this;
  var inode__8894 = this;
  var idx__8895 = cljs.core.hash_collision_node_find_index.call(null, this__8893.arr, this__8893.cnt, key);
  if(idx__8895 === -1) {
    return inode__8894
  }else {
    if(this__8893.cnt === 1) {
      return null
    }else {
      if("\ufdd0'else") {
        return new cljs.core.HashCollisionNode(null, this__8893.collision_hash, this__8893.cnt - 1, cljs.core.remove_pair.call(null, this__8893.arr, cljs.core.quot.call(null, idx__8895, 2)))
      }else {
        return null
      }
    }
  }
};
cljs.core.HashCollisionNode.prototype.inode_assoc = function(shift, hash, key, val, added_leaf_QMARK_) {
  var this__8896 = this;
  var inode__8897 = this;
  if(hash === this__8896.collision_hash) {
    var idx__8898 = cljs.core.hash_collision_node_find_index.call(null, this__8896.arr, this__8896.cnt, key);
    if(idx__8898 === -1) {
      var len__8899 = this__8896.arr.length;
      var new_arr__8900 = cljs.core.make_array.call(null, len__8899 + 2);
      cljs.core.array_copy.call(null, this__8896.arr, 0, new_arr__8900, 0, len__8899);
      new_arr__8900[len__8899] = key;
      new_arr__8900[len__8899 + 1] = val;
      added_leaf_QMARK_.val = true;
      return new cljs.core.HashCollisionNode(null, this__8896.collision_hash, this__8896.cnt + 1, new_arr__8900)
    }else {
      if(cljs.core._EQ_.call(null, this__8896.arr[idx__8898], val)) {
        return inode__8897
      }else {
        return new cljs.core.HashCollisionNode(null, this__8896.collision_hash, this__8896.cnt, cljs.core.clone_and_set.call(null, this__8896.arr, idx__8898 + 1, val))
      }
    }
  }else {
    return(new cljs.core.BitmapIndexedNode(null, 1 << (this__8896.collision_hash >>> shift & 31), [null, inode__8897])).inode_assoc(shift, hash, key, val, added_leaf_QMARK_)
  }
};
cljs.core.HashCollisionNode.prototype.inode_lookup = function(shift, hash, key, not_found) {
  var this__8901 = this;
  var inode__8902 = this;
  var idx__8903 = cljs.core.hash_collision_node_find_index.call(null, this__8901.arr, this__8901.cnt, key);
  if(idx__8903 < 0) {
    return not_found
  }else {
    if(cljs.core.key_test.call(null, key, this__8901.arr[idx__8903])) {
      return this__8901.arr[idx__8903 + 1]
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
  var this__8904 = this;
  var inode__8905 = this;
  if(e === this__8904.edit) {
    this__8904.arr = array;
    this__8904.cnt = count;
    return inode__8905
  }else {
    return new cljs.core.HashCollisionNode(this__8904.edit, this__8904.collision_hash, count, array)
  }
};
cljs.core.HashCollisionNode;
cljs.core.create_node = function() {
  var create_node = null;
  var create_node__6 = function(shift, key1, val1, key2hash, key2, val2) {
    var key1hash__8910 = cljs.core.hash.call(null, key1);
    if(key1hash__8910 === key2hash) {
      return new cljs.core.HashCollisionNode(null, key1hash__8910, 2, [key1, val1, key2, val2])
    }else {
      var added_leaf_QMARK___8911 = new cljs.core.Box(false);
      return cljs.core.BitmapIndexedNode.EMPTY.inode_assoc(shift, key1hash__8910, key1, val1, added_leaf_QMARK___8911).inode_assoc(shift, key2hash, key2, val2, added_leaf_QMARK___8911)
    }
  };
  var create_node__7 = function(edit, shift, key1, val1, key2hash, key2, val2) {
    var key1hash__8912 = cljs.core.hash.call(null, key1);
    if(key1hash__8912 === key2hash) {
      return new cljs.core.HashCollisionNode(null, key1hash__8912, 2, [key1, val1, key2, val2])
    }else {
      var added_leaf_QMARK___8913 = new cljs.core.Box(false);
      return cljs.core.BitmapIndexedNode.EMPTY.inode_assoc_BANG_(edit, shift, key1hash__8912, key1, val1, added_leaf_QMARK___8913).inode_assoc_BANG_(edit, shift, key2hash, key2, val2, added_leaf_QMARK___8913)
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
cljs.core.NodeSeq.cljs$lang$ctorPrSeq = function(this__2322__auto__) {
  return cljs.core.list.call(null, "cljs.core/NodeSeq")
};
cljs.core.NodeSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__8914 = this;
  var h__2205__auto____8915 = this__8914.__hash;
  if(!(h__2205__auto____8915 == null)) {
    return h__2205__auto____8915
  }else {
    var h__2205__auto____8916 = cljs.core.hash_coll.call(null, coll);
    this__8914.__hash = h__2205__auto____8916;
    return h__2205__auto____8916
  }
};
cljs.core.NodeSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__8917 = this;
  return cljs.core.cons.call(null, o, coll)
};
cljs.core.NodeSeq.prototype.toString = function() {
  var this__8918 = this;
  var this__8919 = this;
  return cljs.core.pr_str.call(null, this__8919)
};
cljs.core.NodeSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(this$) {
  var this__8920 = this;
  return this$
};
cljs.core.NodeSeq.prototype.cljs$core$ISeq$_first$arity$1 = function(coll) {
  var this__8921 = this;
  if(this__8921.s == null) {
    return cljs.core.PersistentVector.fromArray([this__8921.nodes[this__8921.i], this__8921.nodes[this__8921.i + 1]], true)
  }else {
    return cljs.core.first.call(null, this__8921.s)
  }
};
cljs.core.NodeSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(coll) {
  var this__8922 = this;
  if(this__8922.s == null) {
    return cljs.core.create_inode_seq.call(null, this__8922.nodes, this__8922.i + 2, null)
  }else {
    return cljs.core.create_inode_seq.call(null, this__8922.nodes, this__8922.i, cljs.core.next.call(null, this__8922.s))
  }
};
cljs.core.NodeSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__8923 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.NodeSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__8924 = this;
  return new cljs.core.NodeSeq(meta, this__8924.nodes, this__8924.i, this__8924.s, this__8924.__hash)
};
cljs.core.NodeSeq.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__8925 = this;
  return this__8925.meta
};
cljs.core.NodeSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__8926 = this;
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this__8926.meta)
};
cljs.core.NodeSeq;
cljs.core.create_inode_seq = function() {
  var create_inode_seq = null;
  var create_inode_seq__1 = function(nodes) {
    return create_inode_seq.call(null, nodes, 0, null)
  };
  var create_inode_seq__3 = function(nodes, i, s) {
    if(s == null) {
      var len__8933 = nodes.length;
      var j__8934 = i;
      while(true) {
        if(j__8934 < len__8933) {
          if(!(nodes[j__8934] == null)) {
            return new cljs.core.NodeSeq(null, nodes, j__8934, null, null)
          }else {
            var temp__3971__auto____8935 = nodes[j__8934 + 1];
            if(cljs.core.truth_(temp__3971__auto____8935)) {
              var node__8936 = temp__3971__auto____8935;
              var temp__3971__auto____8937 = node__8936.inode_seq();
              if(cljs.core.truth_(temp__3971__auto____8937)) {
                var node_seq__8938 = temp__3971__auto____8937;
                return new cljs.core.NodeSeq(null, nodes, j__8934 + 2, node_seq__8938, null)
              }else {
                var G__8939 = j__8934 + 2;
                j__8934 = G__8939;
                continue
              }
            }else {
              var G__8940 = j__8934 + 2;
              j__8934 = G__8940;
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
cljs.core.ArrayNodeSeq.cljs$lang$ctorPrSeq = function(this__2322__auto__) {
  return cljs.core.list.call(null, "cljs.core/ArrayNodeSeq")
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__8941 = this;
  var h__2205__auto____8942 = this__8941.__hash;
  if(!(h__2205__auto____8942 == null)) {
    return h__2205__auto____8942
  }else {
    var h__2205__auto____8943 = cljs.core.hash_coll.call(null, coll);
    this__8941.__hash = h__2205__auto____8943;
    return h__2205__auto____8943
  }
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__8944 = this;
  return cljs.core.cons.call(null, o, coll)
};
cljs.core.ArrayNodeSeq.prototype.toString = function() {
  var this__8945 = this;
  var this__8946 = this;
  return cljs.core.pr_str.call(null, this__8946)
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(this$) {
  var this__8947 = this;
  return this$
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$ISeq$_first$arity$1 = function(coll) {
  var this__8948 = this;
  return cljs.core.first.call(null, this__8948.s)
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(coll) {
  var this__8949 = this;
  return cljs.core.create_array_node_seq.call(null, null, this__8949.nodes, this__8949.i, cljs.core.next.call(null, this__8949.s))
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__8950 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__8951 = this;
  return new cljs.core.ArrayNodeSeq(meta, this__8951.nodes, this__8951.i, this__8951.s, this__8951.__hash)
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__8952 = this;
  return this__8952.meta
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__8953 = this;
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this__8953.meta)
};
cljs.core.ArrayNodeSeq;
cljs.core.create_array_node_seq = function() {
  var create_array_node_seq = null;
  var create_array_node_seq__1 = function(nodes) {
    return create_array_node_seq.call(null, null, nodes, 0, null)
  };
  var create_array_node_seq__4 = function(meta, nodes, i, s) {
    if(s == null) {
      var len__8960 = nodes.length;
      var j__8961 = i;
      while(true) {
        if(j__8961 < len__8960) {
          var temp__3971__auto____8962 = nodes[j__8961];
          if(cljs.core.truth_(temp__3971__auto____8962)) {
            var nj__8963 = temp__3971__auto____8962;
            var temp__3971__auto____8964 = nj__8963.inode_seq();
            if(cljs.core.truth_(temp__3971__auto____8964)) {
              var ns__8965 = temp__3971__auto____8964;
              return new cljs.core.ArrayNodeSeq(meta, nodes, j__8961 + 1, ns__8965, null)
            }else {
              var G__8966 = j__8961 + 1;
              j__8961 = G__8966;
              continue
            }
          }else {
            var G__8967 = j__8961 + 1;
            j__8961 = G__8967;
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
cljs.core.PersistentHashMap.cljs$lang$ctorPrSeq = function(this__2322__auto__) {
  return cljs.core.list.call(null, "cljs.core/PersistentHashMap")
};
cljs.core.PersistentHashMap.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = function(coll) {
  var this__8970 = this;
  return new cljs.core.TransientHashMap({}, this__8970.root, this__8970.cnt, this__8970.has_nil_QMARK_, this__8970.nil_val)
};
cljs.core.PersistentHashMap.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__8971 = this;
  var h__2205__auto____8972 = this__8971.__hash;
  if(!(h__2205__auto____8972 == null)) {
    return h__2205__auto____8972
  }else {
    var h__2205__auto____8973 = cljs.core.hash_imap.call(null, coll);
    this__8971.__hash = h__2205__auto____8973;
    return h__2205__auto____8973
  }
};
cljs.core.PersistentHashMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(coll, k) {
  var this__8974 = this;
  return coll.cljs$core$ILookup$_lookup$arity$3(coll, k, null)
};
cljs.core.PersistentHashMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(coll, k, not_found) {
  var this__8975 = this;
  if(k == null) {
    if(this__8975.has_nil_QMARK_) {
      return this__8975.nil_val
    }else {
      return not_found
    }
  }else {
    if(this__8975.root == null) {
      return not_found
    }else {
      if("\ufdd0'else") {
        return this__8975.root.inode_lookup(0, cljs.core.hash.call(null, k), k, not_found)
      }else {
        return null
      }
    }
  }
};
cljs.core.PersistentHashMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(coll, k, v) {
  var this__8976 = this;
  if(k == null) {
    if(function() {
      var and__3822__auto____8977 = this__8976.has_nil_QMARK_;
      if(and__3822__auto____8977) {
        return v === this__8976.nil_val
      }else {
        return and__3822__auto____8977
      }
    }()) {
      return coll
    }else {
      return new cljs.core.PersistentHashMap(this__8976.meta, this__8976.has_nil_QMARK_ ? this__8976.cnt : this__8976.cnt + 1, this__8976.root, true, v, null)
    }
  }else {
    var added_leaf_QMARK___8978 = new cljs.core.Box(false);
    var new_root__8979 = (this__8976.root == null ? cljs.core.BitmapIndexedNode.EMPTY : this__8976.root).inode_assoc(0, cljs.core.hash.call(null, k), k, v, added_leaf_QMARK___8978);
    if(new_root__8979 === this__8976.root) {
      return coll
    }else {
      return new cljs.core.PersistentHashMap(this__8976.meta, added_leaf_QMARK___8978.val ? this__8976.cnt + 1 : this__8976.cnt, new_root__8979, this__8976.has_nil_QMARK_, this__8976.nil_val, null)
    }
  }
};
cljs.core.PersistentHashMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = function(coll, k) {
  var this__8980 = this;
  if(k == null) {
    return this__8980.has_nil_QMARK_
  }else {
    if(this__8980.root == null) {
      return false
    }else {
      if("\ufdd0'else") {
        return!(this__8980.root.inode_lookup(0, cljs.core.hash.call(null, k), k, cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel)
      }else {
        return null
      }
    }
  }
};
cljs.core.PersistentHashMap.prototype.call = function() {
  var G__9003 = null;
  var G__9003__2 = function(this_sym8981, k) {
    var this__8983 = this;
    var this_sym8981__8984 = this;
    var coll__8985 = this_sym8981__8984;
    return coll__8985.cljs$core$ILookup$_lookup$arity$2(coll__8985, k)
  };
  var G__9003__3 = function(this_sym8982, k, not_found) {
    var this__8983 = this;
    var this_sym8982__8986 = this;
    var coll__8987 = this_sym8982__8986;
    return coll__8987.cljs$core$ILookup$_lookup$arity$3(coll__8987, k, not_found)
  };
  G__9003 = function(this_sym8982, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__9003__2.call(this, this_sym8982, k);
      case 3:
        return G__9003__3.call(this, this_sym8982, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__9003
}();
cljs.core.PersistentHashMap.prototype.apply = function(this_sym8968, args8969) {
  var this__8988 = this;
  return this_sym8968.call.apply(this_sym8968, [this_sym8968].concat(args8969.slice()))
};
cljs.core.PersistentHashMap.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = function(coll, f, init) {
  var this__8989 = this;
  var init__8990 = this__8989.has_nil_QMARK_ ? f.call(null, init, null, this__8989.nil_val) : init;
  if(cljs.core.reduced_QMARK_.call(null, init__8990)) {
    return cljs.core.deref.call(null, init__8990)
  }else {
    if(!(this__8989.root == null)) {
      return this__8989.root.kv_reduce(f, init__8990)
    }else {
      if("\ufdd0'else") {
        return init__8990
      }else {
        return null
      }
    }
  }
};
cljs.core.PersistentHashMap.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, entry) {
  var this__8991 = this;
  if(cljs.core.vector_QMARK_.call(null, entry)) {
    return coll.cljs$core$IAssociative$_assoc$arity$3(coll, cljs.core._nth.call(null, entry, 0), cljs.core._nth.call(null, entry, 1))
  }else {
    return cljs.core.reduce.call(null, cljs.core._conj, coll, entry)
  }
};
cljs.core.PersistentHashMap.prototype.toString = function() {
  var this__8992 = this;
  var this__8993 = this;
  return cljs.core.pr_str.call(null, this__8993)
};
cljs.core.PersistentHashMap.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__8994 = this;
  if(this__8994.cnt > 0) {
    var s__8995 = !(this__8994.root == null) ? this__8994.root.inode_seq() : null;
    if(this__8994.has_nil_QMARK_) {
      return cljs.core.cons.call(null, cljs.core.PersistentVector.fromArray([null, this__8994.nil_val], true), s__8995)
    }else {
      return s__8995
    }
  }else {
    return null
  }
};
cljs.core.PersistentHashMap.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__8996 = this;
  return this__8996.cnt
};
cljs.core.PersistentHashMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__8997 = this;
  return cljs.core.equiv_map.call(null, coll, other)
};
cljs.core.PersistentHashMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__8998 = this;
  return new cljs.core.PersistentHashMap(meta, this__8998.cnt, this__8998.root, this__8998.has_nil_QMARK_, this__8998.nil_val, this__8998.__hash)
};
cljs.core.PersistentHashMap.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__8999 = this;
  return this__8999.meta
};
cljs.core.PersistentHashMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__9000 = this;
  return cljs.core._with_meta.call(null, cljs.core.PersistentHashMap.EMPTY, this__9000.meta)
};
cljs.core.PersistentHashMap.prototype.cljs$core$IMap$_dissoc$arity$2 = function(coll, k) {
  var this__9001 = this;
  if(k == null) {
    if(this__9001.has_nil_QMARK_) {
      return new cljs.core.PersistentHashMap(this__9001.meta, this__9001.cnt - 1, this__9001.root, false, null, null)
    }else {
      return coll
    }
  }else {
    if(this__9001.root == null) {
      return coll
    }else {
      if("\ufdd0'else") {
        var new_root__9002 = this__9001.root.inode_without(0, cljs.core.hash.call(null, k), k);
        if(new_root__9002 === this__9001.root) {
          return coll
        }else {
          return new cljs.core.PersistentHashMap(this__9001.meta, this__9001.cnt - 1, new_root__9002, this__9001.has_nil_QMARK_, this__9001.nil_val, null)
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
  var len__9004 = ks.length;
  var i__9005 = 0;
  var out__9006 = cljs.core.transient$.call(null, cljs.core.PersistentHashMap.EMPTY);
  while(true) {
    if(i__9005 < len__9004) {
      var G__9007 = i__9005 + 1;
      var G__9008 = cljs.core.assoc_BANG_.call(null, out__9006, ks[i__9005], vs[i__9005]);
      i__9005 = G__9007;
      out__9006 = G__9008;
      continue
    }else {
      return cljs.core.persistent_BANG_.call(null, out__9006)
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
cljs.core.TransientHashMap.cljs$lang$ctorPrSeq = function(this__2322__auto__) {
  return cljs.core.list.call(null, "cljs.core/TransientHashMap")
};
cljs.core.TransientHashMap.prototype.cljs$core$ITransientMap$_dissoc_BANG_$arity$2 = function(tcoll, key) {
  var this__9009 = this;
  return tcoll.without_BANG_(key)
};
cljs.core.TransientHashMap.prototype.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3 = function(tcoll, key, val) {
  var this__9010 = this;
  return tcoll.assoc_BANG_(key, val)
};
cljs.core.TransientHashMap.prototype.cljs$core$ITransientCollection$_conj_BANG_$arity$2 = function(tcoll, val) {
  var this__9011 = this;
  return tcoll.conj_BANG_(val)
};
cljs.core.TransientHashMap.prototype.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 = function(tcoll) {
  var this__9012 = this;
  return tcoll.persistent_BANG_()
};
cljs.core.TransientHashMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(tcoll, k) {
  var this__9013 = this;
  if(k == null) {
    if(this__9013.has_nil_QMARK_) {
      return this__9013.nil_val
    }else {
      return null
    }
  }else {
    if(this__9013.root == null) {
      return null
    }else {
      return this__9013.root.inode_lookup(0, cljs.core.hash.call(null, k), k)
    }
  }
};
cljs.core.TransientHashMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(tcoll, k, not_found) {
  var this__9014 = this;
  if(k == null) {
    if(this__9014.has_nil_QMARK_) {
      return this__9014.nil_val
    }else {
      return not_found
    }
  }else {
    if(this__9014.root == null) {
      return not_found
    }else {
      return this__9014.root.inode_lookup(0, cljs.core.hash.call(null, k), k, not_found)
    }
  }
};
cljs.core.TransientHashMap.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__9015 = this;
  if(this__9015.edit) {
    return this__9015.count
  }else {
    throw new Error("count after persistent!");
  }
};
cljs.core.TransientHashMap.prototype.conj_BANG_ = function(o) {
  var this__9016 = this;
  var tcoll__9017 = this;
  if(this__9016.edit) {
    if(function() {
      var G__9018__9019 = o;
      if(G__9018__9019) {
        if(function() {
          var or__3824__auto____9020 = G__9018__9019.cljs$lang$protocol_mask$partition0$ & 2048;
          if(or__3824__auto____9020) {
            return or__3824__auto____9020
          }else {
            return G__9018__9019.cljs$core$IMapEntry$
          }
        }()) {
          return true
        }else {
          if(!G__9018__9019.cljs$lang$protocol_mask$partition0$) {
            return cljs.core.type_satisfies_.call(null, cljs.core.IMapEntry, G__9018__9019)
          }else {
            return false
          }
        }
      }else {
        return cljs.core.type_satisfies_.call(null, cljs.core.IMapEntry, G__9018__9019)
      }
    }()) {
      return tcoll__9017.assoc_BANG_(cljs.core.key.call(null, o), cljs.core.val.call(null, o))
    }else {
      var es__9021 = cljs.core.seq.call(null, o);
      var tcoll__9022 = tcoll__9017;
      while(true) {
        var temp__3971__auto____9023 = cljs.core.first.call(null, es__9021);
        if(cljs.core.truth_(temp__3971__auto____9023)) {
          var e__9024 = temp__3971__auto____9023;
          var G__9035 = cljs.core.next.call(null, es__9021);
          var G__9036 = tcoll__9022.assoc_BANG_(cljs.core.key.call(null, e__9024), cljs.core.val.call(null, e__9024));
          es__9021 = G__9035;
          tcoll__9022 = G__9036;
          continue
        }else {
          return tcoll__9022
        }
        break
      }
    }
  }else {
    throw new Error("conj! after persistent");
  }
};
cljs.core.TransientHashMap.prototype.assoc_BANG_ = function(k, v) {
  var this__9025 = this;
  var tcoll__9026 = this;
  if(this__9025.edit) {
    if(k == null) {
      if(this__9025.nil_val === v) {
      }else {
        this__9025.nil_val = v
      }
      if(this__9025.has_nil_QMARK_) {
      }else {
        this__9025.count = this__9025.count + 1;
        this__9025.has_nil_QMARK_ = true
      }
      return tcoll__9026
    }else {
      var added_leaf_QMARK___9027 = new cljs.core.Box(false);
      var node__9028 = (this__9025.root == null ? cljs.core.BitmapIndexedNode.EMPTY : this__9025.root).inode_assoc_BANG_(this__9025.edit, 0, cljs.core.hash.call(null, k), k, v, added_leaf_QMARK___9027);
      if(node__9028 === this__9025.root) {
      }else {
        this__9025.root = node__9028
      }
      if(added_leaf_QMARK___9027.val) {
        this__9025.count = this__9025.count + 1
      }else {
      }
      return tcoll__9026
    }
  }else {
    throw new Error("assoc! after persistent!");
  }
};
cljs.core.TransientHashMap.prototype.without_BANG_ = function(k) {
  var this__9029 = this;
  var tcoll__9030 = this;
  if(this__9029.edit) {
    if(k == null) {
      if(this__9029.has_nil_QMARK_) {
        this__9029.has_nil_QMARK_ = false;
        this__9029.nil_val = null;
        this__9029.count = this__9029.count - 1;
        return tcoll__9030
      }else {
        return tcoll__9030
      }
    }else {
      if(this__9029.root == null) {
        return tcoll__9030
      }else {
        var removed_leaf_QMARK___9031 = new cljs.core.Box(false);
        var node__9032 = this__9029.root.inode_without_BANG_(this__9029.edit, 0, cljs.core.hash.call(null, k), k, removed_leaf_QMARK___9031);
        if(node__9032 === this__9029.root) {
        }else {
          this__9029.root = node__9032
        }
        if(cljs.core.truth_(removed_leaf_QMARK___9031[0])) {
          this__9029.count = this__9029.count - 1
        }else {
        }
        return tcoll__9030
      }
    }
  }else {
    throw new Error("dissoc! after persistent!");
  }
};
cljs.core.TransientHashMap.prototype.persistent_BANG_ = function() {
  var this__9033 = this;
  var tcoll__9034 = this;
  if(this__9033.edit) {
    this__9033.edit = null;
    return new cljs.core.PersistentHashMap(null, this__9033.count, this__9033.root, this__9033.has_nil_QMARK_, this__9033.nil_val, null)
  }else {
    throw new Error("persistent! called twice");
  }
};
cljs.core.TransientHashMap;
cljs.core.tree_map_seq_push = function tree_map_seq_push(node, stack, ascending_QMARK_) {
  var t__9039 = node;
  var stack__9040 = stack;
  while(true) {
    if(!(t__9039 == null)) {
      var G__9041 = ascending_QMARK_ ? t__9039.left : t__9039.right;
      var G__9042 = cljs.core.conj.call(null, stack__9040, t__9039);
      t__9039 = G__9041;
      stack__9040 = G__9042;
      continue
    }else {
      return stack__9040
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
cljs.core.PersistentTreeMapSeq.cljs$lang$ctorPrSeq = function(this__2322__auto__) {
  return cljs.core.list.call(null, "cljs.core/PersistentTreeMapSeq")
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__9043 = this;
  var h__2205__auto____9044 = this__9043.__hash;
  if(!(h__2205__auto____9044 == null)) {
    return h__2205__auto____9044
  }else {
    var h__2205__auto____9045 = cljs.core.hash_coll.call(null, coll);
    this__9043.__hash = h__2205__auto____9045;
    return h__2205__auto____9045
  }
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__9046 = this;
  return cljs.core.cons.call(null, o, coll)
};
cljs.core.PersistentTreeMapSeq.prototype.toString = function() {
  var this__9047 = this;
  var this__9048 = this;
  return cljs.core.pr_str.call(null, this__9048)
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(this$) {
  var this__9049 = this;
  return this$
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__9050 = this;
  if(this__9050.cnt < 0) {
    return cljs.core.count.call(null, cljs.core.next.call(null, coll)) + 1
  }else {
    return this__9050.cnt
  }
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ISeq$_first$arity$1 = function(this$) {
  var this__9051 = this;
  return cljs.core.peek.call(null, this__9051.stack)
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(this$) {
  var this__9052 = this;
  var t__9053 = cljs.core.first.call(null, this__9052.stack);
  var next_stack__9054 = cljs.core.tree_map_seq_push.call(null, this__9052.ascending_QMARK_ ? t__9053.right : t__9053.left, cljs.core.next.call(null, this__9052.stack), this__9052.ascending_QMARK_);
  if(!(next_stack__9054 == null)) {
    return new cljs.core.PersistentTreeMapSeq(null, next_stack__9054, this__9052.ascending_QMARK_, this__9052.cnt - 1, null)
  }else {
    return cljs.core.List.EMPTY
  }
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__9055 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__9056 = this;
  return new cljs.core.PersistentTreeMapSeq(meta, this__9056.stack, this__9056.ascending_QMARK_, this__9056.cnt, this__9056.__hash)
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__9057 = this;
  return this__9057.meta
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
        var and__3822__auto____9059 = cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, right);
        if(and__3822__auto____9059) {
          return cljs.core.instance_QMARK_.call(null, cljs.core.BlackNode, right.left)
        }else {
          return and__3822__auto____9059
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
        var and__3822__auto____9061 = cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, left);
        if(and__3822__auto____9061) {
          return cljs.core.instance_QMARK_.call(null, cljs.core.BlackNode, left.right)
        }else {
          return and__3822__auto____9061
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
  var init__9065 = f.call(null, init, node.key, node.val);
  if(cljs.core.reduced_QMARK_.call(null, init__9065)) {
    return cljs.core.deref.call(null, init__9065)
  }else {
    var init__9066 = !(node.left == null) ? tree_map_kv_reduce.call(null, node.left, f, init__9065) : init__9065;
    if(cljs.core.reduced_QMARK_.call(null, init__9066)) {
      return cljs.core.deref.call(null, init__9066)
    }else {
      var init__9067 = !(node.right == null) ? tree_map_kv_reduce.call(null, node.right, f, init__9066) : init__9066;
      if(cljs.core.reduced_QMARK_.call(null, init__9067)) {
        return cljs.core.deref.call(null, init__9067)
      }else {
        return init__9067
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
cljs.core.BlackNode.cljs$lang$ctorPrSeq = function(this__2322__auto__) {
  return cljs.core.list.call(null, "cljs.core/BlackNode")
};
cljs.core.BlackNode.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__9070 = this;
  var h__2205__auto____9071 = this__9070.__hash;
  if(!(h__2205__auto____9071 == null)) {
    return h__2205__auto____9071
  }else {
    var h__2205__auto____9072 = cljs.core.hash_coll.call(null, coll);
    this__9070.__hash = h__2205__auto____9072;
    return h__2205__auto____9072
  }
};
cljs.core.BlackNode.prototype.cljs$core$ILookup$_lookup$arity$2 = function(node, k) {
  var this__9073 = this;
  return node.cljs$core$IIndexed$_nth$arity$3(node, k, null)
};
cljs.core.BlackNode.prototype.cljs$core$ILookup$_lookup$arity$3 = function(node, k, not_found) {
  var this__9074 = this;
  return node.cljs$core$IIndexed$_nth$arity$3(node, k, not_found)
};
cljs.core.BlackNode.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(node, k, v) {
  var this__9075 = this;
  return cljs.core.assoc.call(null, cljs.core.PersistentVector.fromArray([this__9075.key, this__9075.val], true), k, v)
};
cljs.core.BlackNode.prototype.call = function() {
  var G__9123 = null;
  var G__9123__2 = function(this_sym9076, k) {
    var this__9078 = this;
    var this_sym9076__9079 = this;
    var node__9080 = this_sym9076__9079;
    return node__9080.cljs$core$ILookup$_lookup$arity$2(node__9080, k)
  };
  var G__9123__3 = function(this_sym9077, k, not_found) {
    var this__9078 = this;
    var this_sym9077__9081 = this;
    var node__9082 = this_sym9077__9081;
    return node__9082.cljs$core$ILookup$_lookup$arity$3(node__9082, k, not_found)
  };
  G__9123 = function(this_sym9077, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__9123__2.call(this, this_sym9077, k);
      case 3:
        return G__9123__3.call(this, this_sym9077, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__9123
}();
cljs.core.BlackNode.prototype.apply = function(this_sym9068, args9069) {
  var this__9083 = this;
  return this_sym9068.call.apply(this_sym9068, [this_sym9068].concat(args9069.slice()))
};
cljs.core.BlackNode.prototype.cljs$core$ICollection$_conj$arity$2 = function(node, o) {
  var this__9084 = this;
  return cljs.core.PersistentVector.fromArray([this__9084.key, this__9084.val, o], true)
};
cljs.core.BlackNode.prototype.cljs$core$IMapEntry$_key$arity$1 = function(node) {
  var this__9085 = this;
  return this__9085.key
};
cljs.core.BlackNode.prototype.cljs$core$IMapEntry$_val$arity$1 = function(node) {
  var this__9086 = this;
  return this__9086.val
};
cljs.core.BlackNode.prototype.add_right = function(ins) {
  var this__9087 = this;
  var node__9088 = this;
  return ins.balance_right(node__9088)
};
cljs.core.BlackNode.prototype.redden = function() {
  var this__9089 = this;
  var node__9090 = this;
  return new cljs.core.RedNode(this__9089.key, this__9089.val, this__9089.left, this__9089.right, null)
};
cljs.core.BlackNode.prototype.remove_right = function(del) {
  var this__9091 = this;
  var node__9092 = this;
  return cljs.core.balance_right_del.call(null, this__9091.key, this__9091.val, this__9091.left, del)
};
cljs.core.BlackNode.prototype.replace = function(key, val, left, right) {
  var this__9093 = this;
  var node__9094 = this;
  return new cljs.core.BlackNode(key, val, left, right, null)
};
cljs.core.BlackNode.prototype.kv_reduce = function(f, init) {
  var this__9095 = this;
  var node__9096 = this;
  return cljs.core.tree_map_kv_reduce.call(null, node__9096, f, init)
};
cljs.core.BlackNode.prototype.remove_left = function(del) {
  var this__9097 = this;
  var node__9098 = this;
  return cljs.core.balance_left_del.call(null, this__9097.key, this__9097.val, del, this__9097.right)
};
cljs.core.BlackNode.prototype.add_left = function(ins) {
  var this__9099 = this;
  var node__9100 = this;
  return ins.balance_left(node__9100)
};
cljs.core.BlackNode.prototype.balance_left = function(parent) {
  var this__9101 = this;
  var node__9102 = this;
  return new cljs.core.BlackNode(parent.key, parent.val, node__9102, parent.right, null)
};
cljs.core.BlackNode.prototype.toString = function() {
  var G__9124 = null;
  var G__9124__0 = function() {
    var this__9103 = this;
    var this__9105 = this;
    return cljs.core.pr_str.call(null, this__9105)
  };
  G__9124 = function() {
    switch(arguments.length) {
      case 0:
        return G__9124__0.call(this)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__9124
}();
cljs.core.BlackNode.prototype.balance_right = function(parent) {
  var this__9106 = this;
  var node__9107 = this;
  return new cljs.core.BlackNode(parent.key, parent.val, parent.left, node__9107, null)
};
cljs.core.BlackNode.prototype.blacken = function() {
  var this__9108 = this;
  var node__9109 = this;
  return node__9109
};
cljs.core.BlackNode.prototype.cljs$core$IReduce$_reduce$arity$2 = function(node, f) {
  var this__9110 = this;
  return cljs.core.ci_reduce.call(null, node, f)
};
cljs.core.BlackNode.prototype.cljs$core$IReduce$_reduce$arity$3 = function(node, f, start) {
  var this__9111 = this;
  return cljs.core.ci_reduce.call(null, node, f, start)
};
cljs.core.BlackNode.prototype.cljs$core$ISeqable$_seq$arity$1 = function(node) {
  var this__9112 = this;
  return cljs.core.list.call(null, this__9112.key, this__9112.val)
};
cljs.core.BlackNode.prototype.cljs$core$ICounted$_count$arity$1 = function(node) {
  var this__9113 = this;
  return 2
};
cljs.core.BlackNode.prototype.cljs$core$IStack$_peek$arity$1 = function(node) {
  var this__9114 = this;
  return this__9114.val
};
cljs.core.BlackNode.prototype.cljs$core$IStack$_pop$arity$1 = function(node) {
  var this__9115 = this;
  return cljs.core.PersistentVector.fromArray([this__9115.key], true)
};
cljs.core.BlackNode.prototype.cljs$core$IVector$_assoc_n$arity$3 = function(node, n, v) {
  var this__9116 = this;
  return cljs.core._assoc_n.call(null, cljs.core.PersistentVector.fromArray([this__9116.key, this__9116.val], true), n, v)
};
cljs.core.BlackNode.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__9117 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.BlackNode.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(node, meta) {
  var this__9118 = this;
  return cljs.core.with_meta.call(null, cljs.core.PersistentVector.fromArray([this__9118.key, this__9118.val], true), meta)
};
cljs.core.BlackNode.prototype.cljs$core$IMeta$_meta$arity$1 = function(node) {
  var this__9119 = this;
  return null
};
cljs.core.BlackNode.prototype.cljs$core$IIndexed$_nth$arity$2 = function(node, n) {
  var this__9120 = this;
  if(n === 0) {
    return this__9120.key
  }else {
    if(n === 1) {
      return this__9120.val
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
  var this__9121 = this;
  if(n === 0) {
    return this__9121.key
  }else {
    if(n === 1) {
      return this__9121.val
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
  var this__9122 = this;
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
cljs.core.RedNode.cljs$lang$ctorPrSeq = function(this__2322__auto__) {
  return cljs.core.list.call(null, "cljs.core/RedNode")
};
cljs.core.RedNode.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__9127 = this;
  var h__2205__auto____9128 = this__9127.__hash;
  if(!(h__2205__auto____9128 == null)) {
    return h__2205__auto____9128
  }else {
    var h__2205__auto____9129 = cljs.core.hash_coll.call(null, coll);
    this__9127.__hash = h__2205__auto____9129;
    return h__2205__auto____9129
  }
};
cljs.core.RedNode.prototype.cljs$core$ILookup$_lookup$arity$2 = function(node, k) {
  var this__9130 = this;
  return node.cljs$core$IIndexed$_nth$arity$3(node, k, null)
};
cljs.core.RedNode.prototype.cljs$core$ILookup$_lookup$arity$3 = function(node, k, not_found) {
  var this__9131 = this;
  return node.cljs$core$IIndexed$_nth$arity$3(node, k, not_found)
};
cljs.core.RedNode.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(node, k, v) {
  var this__9132 = this;
  return cljs.core.assoc.call(null, cljs.core.PersistentVector.fromArray([this__9132.key, this__9132.val], true), k, v)
};
cljs.core.RedNode.prototype.call = function() {
  var G__9180 = null;
  var G__9180__2 = function(this_sym9133, k) {
    var this__9135 = this;
    var this_sym9133__9136 = this;
    var node__9137 = this_sym9133__9136;
    return node__9137.cljs$core$ILookup$_lookup$arity$2(node__9137, k)
  };
  var G__9180__3 = function(this_sym9134, k, not_found) {
    var this__9135 = this;
    var this_sym9134__9138 = this;
    var node__9139 = this_sym9134__9138;
    return node__9139.cljs$core$ILookup$_lookup$arity$3(node__9139, k, not_found)
  };
  G__9180 = function(this_sym9134, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__9180__2.call(this, this_sym9134, k);
      case 3:
        return G__9180__3.call(this, this_sym9134, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__9180
}();
cljs.core.RedNode.prototype.apply = function(this_sym9125, args9126) {
  var this__9140 = this;
  return this_sym9125.call.apply(this_sym9125, [this_sym9125].concat(args9126.slice()))
};
cljs.core.RedNode.prototype.cljs$core$ICollection$_conj$arity$2 = function(node, o) {
  var this__9141 = this;
  return cljs.core.PersistentVector.fromArray([this__9141.key, this__9141.val, o], true)
};
cljs.core.RedNode.prototype.cljs$core$IMapEntry$_key$arity$1 = function(node) {
  var this__9142 = this;
  return this__9142.key
};
cljs.core.RedNode.prototype.cljs$core$IMapEntry$_val$arity$1 = function(node) {
  var this__9143 = this;
  return this__9143.val
};
cljs.core.RedNode.prototype.add_right = function(ins) {
  var this__9144 = this;
  var node__9145 = this;
  return new cljs.core.RedNode(this__9144.key, this__9144.val, this__9144.left, ins, null)
};
cljs.core.RedNode.prototype.redden = function() {
  var this__9146 = this;
  var node__9147 = this;
  throw new Error("red-black tree invariant violation");
};
cljs.core.RedNode.prototype.remove_right = function(del) {
  var this__9148 = this;
  var node__9149 = this;
  return new cljs.core.RedNode(this__9148.key, this__9148.val, this__9148.left, del, null)
};
cljs.core.RedNode.prototype.replace = function(key, val, left, right) {
  var this__9150 = this;
  var node__9151 = this;
  return new cljs.core.RedNode(key, val, left, right, null)
};
cljs.core.RedNode.prototype.kv_reduce = function(f, init) {
  var this__9152 = this;
  var node__9153 = this;
  return cljs.core.tree_map_kv_reduce.call(null, node__9153, f, init)
};
cljs.core.RedNode.prototype.remove_left = function(del) {
  var this__9154 = this;
  var node__9155 = this;
  return new cljs.core.RedNode(this__9154.key, this__9154.val, del, this__9154.right, null)
};
cljs.core.RedNode.prototype.add_left = function(ins) {
  var this__9156 = this;
  var node__9157 = this;
  return new cljs.core.RedNode(this__9156.key, this__9156.val, ins, this__9156.right, null)
};
cljs.core.RedNode.prototype.balance_left = function(parent) {
  var this__9158 = this;
  var node__9159 = this;
  if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, this__9158.left)) {
    return new cljs.core.RedNode(this__9158.key, this__9158.val, this__9158.left.blacken(), new cljs.core.BlackNode(parent.key, parent.val, this__9158.right, parent.right, null), null)
  }else {
    if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, this__9158.right)) {
      return new cljs.core.RedNode(this__9158.right.key, this__9158.right.val, new cljs.core.BlackNode(this__9158.key, this__9158.val, this__9158.left, this__9158.right.left, null), new cljs.core.BlackNode(parent.key, parent.val, this__9158.right.right, parent.right, null), null)
    }else {
      if("\ufdd0'else") {
        return new cljs.core.BlackNode(parent.key, parent.val, node__9159, parent.right, null)
      }else {
        return null
      }
    }
  }
};
cljs.core.RedNode.prototype.toString = function() {
  var G__9181 = null;
  var G__9181__0 = function() {
    var this__9160 = this;
    var this__9162 = this;
    return cljs.core.pr_str.call(null, this__9162)
  };
  G__9181 = function() {
    switch(arguments.length) {
      case 0:
        return G__9181__0.call(this)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__9181
}();
cljs.core.RedNode.prototype.balance_right = function(parent) {
  var this__9163 = this;
  var node__9164 = this;
  if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, this__9163.right)) {
    return new cljs.core.RedNode(this__9163.key, this__9163.val, new cljs.core.BlackNode(parent.key, parent.val, parent.left, this__9163.left, null), this__9163.right.blacken(), null)
  }else {
    if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, this__9163.left)) {
      return new cljs.core.RedNode(this__9163.left.key, this__9163.left.val, new cljs.core.BlackNode(parent.key, parent.val, parent.left, this__9163.left.left, null), new cljs.core.BlackNode(this__9163.key, this__9163.val, this__9163.left.right, this__9163.right, null), null)
    }else {
      if("\ufdd0'else") {
        return new cljs.core.BlackNode(parent.key, parent.val, parent.left, node__9164, null)
      }else {
        return null
      }
    }
  }
};
cljs.core.RedNode.prototype.blacken = function() {
  var this__9165 = this;
  var node__9166 = this;
  return new cljs.core.BlackNode(this__9165.key, this__9165.val, this__9165.left, this__9165.right, null)
};
cljs.core.RedNode.prototype.cljs$core$IReduce$_reduce$arity$2 = function(node, f) {
  var this__9167 = this;
  return cljs.core.ci_reduce.call(null, node, f)
};
cljs.core.RedNode.prototype.cljs$core$IReduce$_reduce$arity$3 = function(node, f, start) {
  var this__9168 = this;
  return cljs.core.ci_reduce.call(null, node, f, start)
};
cljs.core.RedNode.prototype.cljs$core$ISeqable$_seq$arity$1 = function(node) {
  var this__9169 = this;
  return cljs.core.list.call(null, this__9169.key, this__9169.val)
};
cljs.core.RedNode.prototype.cljs$core$ICounted$_count$arity$1 = function(node) {
  var this__9170 = this;
  return 2
};
cljs.core.RedNode.prototype.cljs$core$IStack$_peek$arity$1 = function(node) {
  var this__9171 = this;
  return this__9171.val
};
cljs.core.RedNode.prototype.cljs$core$IStack$_pop$arity$1 = function(node) {
  var this__9172 = this;
  return cljs.core.PersistentVector.fromArray([this__9172.key], true)
};
cljs.core.RedNode.prototype.cljs$core$IVector$_assoc_n$arity$3 = function(node, n, v) {
  var this__9173 = this;
  return cljs.core._assoc_n.call(null, cljs.core.PersistentVector.fromArray([this__9173.key, this__9173.val], true), n, v)
};
cljs.core.RedNode.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__9174 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.RedNode.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(node, meta) {
  var this__9175 = this;
  return cljs.core.with_meta.call(null, cljs.core.PersistentVector.fromArray([this__9175.key, this__9175.val], true), meta)
};
cljs.core.RedNode.prototype.cljs$core$IMeta$_meta$arity$1 = function(node) {
  var this__9176 = this;
  return null
};
cljs.core.RedNode.prototype.cljs$core$IIndexed$_nth$arity$2 = function(node, n) {
  var this__9177 = this;
  if(n === 0) {
    return this__9177.key
  }else {
    if(n === 1) {
      return this__9177.val
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
  var this__9178 = this;
  if(n === 0) {
    return this__9178.key
  }else {
    if(n === 1) {
      return this__9178.val
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
  var this__9179 = this;
  return cljs.core.PersistentVector.EMPTY
};
cljs.core.RedNode;
cljs.core.tree_map_add = function tree_map_add(comp, tree, k, v, found) {
  if(tree == null) {
    return new cljs.core.RedNode(k, v, null, null, null)
  }else {
    var c__9185 = comp.call(null, k, tree.key);
    if(c__9185 === 0) {
      found[0] = tree;
      return null
    }else {
      if(c__9185 < 0) {
        var ins__9186 = tree_map_add.call(null, comp, tree.left, k, v, found);
        if(!(ins__9186 == null)) {
          return tree.add_left(ins__9186)
        }else {
          return null
        }
      }else {
        if("\ufdd0'else") {
          var ins__9187 = tree_map_add.call(null, comp, tree.right, k, v, found);
          if(!(ins__9187 == null)) {
            return tree.add_right(ins__9187)
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
          var app__9190 = tree_map_append.call(null, left.right, right.left);
          if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, app__9190)) {
            return new cljs.core.RedNode(app__9190.key, app__9190.val, new cljs.core.RedNode(left.key, left.val, left.left, app__9190.left, null), new cljs.core.RedNode(right.key, right.val, app__9190.right, right.right, null), null)
          }else {
            return new cljs.core.RedNode(left.key, left.val, left.left, new cljs.core.RedNode(right.key, right.val, app__9190, right.right, null), null)
          }
        }else {
          return new cljs.core.RedNode(left.key, left.val, left.left, tree_map_append.call(null, left.right, right), null)
        }
      }else {
        if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, right)) {
          return new cljs.core.RedNode(right.key, right.val, tree_map_append.call(null, left, right.left), right.right, null)
        }else {
          if("\ufdd0'else") {
            var app__9191 = tree_map_append.call(null, left.right, right.left);
            if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, app__9191)) {
              return new cljs.core.RedNode(app__9191.key, app__9191.val, new cljs.core.BlackNode(left.key, left.val, left.left, app__9191.left, null), new cljs.core.BlackNode(right.key, right.val, app__9191.right, right.right, null), null)
            }else {
              return cljs.core.balance_left_del.call(null, left.key, left.val, left.left, new cljs.core.BlackNode(right.key, right.val, app__9191, right.right, null))
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
    var c__9197 = comp.call(null, k, tree.key);
    if(c__9197 === 0) {
      found[0] = tree;
      return cljs.core.tree_map_append.call(null, tree.left, tree.right)
    }else {
      if(c__9197 < 0) {
        var del__9198 = tree_map_remove.call(null, comp, tree.left, k, found);
        if(function() {
          var or__3824__auto____9199 = !(del__9198 == null);
          if(or__3824__auto____9199) {
            return or__3824__auto____9199
          }else {
            return!(found[0] == null)
          }
        }()) {
          if(cljs.core.instance_QMARK_.call(null, cljs.core.BlackNode, tree.left)) {
            return cljs.core.balance_left_del.call(null, tree.key, tree.val, del__9198, tree.right)
          }else {
            return new cljs.core.RedNode(tree.key, tree.val, del__9198, tree.right, null)
          }
        }else {
          return null
        }
      }else {
        if("\ufdd0'else") {
          var del__9200 = tree_map_remove.call(null, comp, tree.right, k, found);
          if(function() {
            var or__3824__auto____9201 = !(del__9200 == null);
            if(or__3824__auto____9201) {
              return or__3824__auto____9201
            }else {
              return!(found[0] == null)
            }
          }()) {
            if(cljs.core.instance_QMARK_.call(null, cljs.core.BlackNode, tree.right)) {
              return cljs.core.balance_right_del.call(null, tree.key, tree.val, tree.left, del__9200)
            }else {
              return new cljs.core.RedNode(tree.key, tree.val, tree.left, del__9200, null)
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
  var tk__9204 = tree.key;
  var c__9205 = comp.call(null, k, tk__9204);
  if(c__9205 === 0) {
    return tree.replace(tk__9204, v, tree.left, tree.right)
  }else {
    if(c__9205 < 0) {
      return tree.replace(tk__9204, tree.val, tree_map_replace.call(null, comp, tree.left, k, v), tree.right)
    }else {
      if("\ufdd0'else") {
        return tree.replace(tk__9204, tree.val, tree.left, tree_map_replace.call(null, comp, tree.right, k, v))
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
cljs.core.PersistentTreeMap.cljs$lang$ctorPrSeq = function(this__2322__auto__) {
  return cljs.core.list.call(null, "cljs.core/PersistentTreeMap")
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__9208 = this;
  var h__2205__auto____9209 = this__9208.__hash;
  if(!(h__2205__auto____9209 == null)) {
    return h__2205__auto____9209
  }else {
    var h__2205__auto____9210 = cljs.core.hash_imap.call(null, coll);
    this__9208.__hash = h__2205__auto____9210;
    return h__2205__auto____9210
  }
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(coll, k) {
  var this__9211 = this;
  return coll.cljs$core$ILookup$_lookup$arity$3(coll, k, null)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(coll, k, not_found) {
  var this__9212 = this;
  var n__9213 = coll.entry_at(k);
  if(!(n__9213 == null)) {
    return n__9213.val
  }else {
    return not_found
  }
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(coll, k, v) {
  var this__9214 = this;
  var found__9215 = [null];
  var t__9216 = cljs.core.tree_map_add.call(null, this__9214.comp, this__9214.tree, k, v, found__9215);
  if(t__9216 == null) {
    var found_node__9217 = cljs.core.nth.call(null, found__9215, 0);
    if(cljs.core._EQ_.call(null, v, found_node__9217.val)) {
      return coll
    }else {
      return new cljs.core.PersistentTreeMap(this__9214.comp, cljs.core.tree_map_replace.call(null, this__9214.comp, this__9214.tree, k, v), this__9214.cnt, this__9214.meta, null)
    }
  }else {
    return new cljs.core.PersistentTreeMap(this__9214.comp, t__9216.blacken(), this__9214.cnt + 1, this__9214.meta, null)
  }
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = function(coll, k) {
  var this__9218 = this;
  return!(coll.entry_at(k) == null)
};
cljs.core.PersistentTreeMap.prototype.call = function() {
  var G__9252 = null;
  var G__9252__2 = function(this_sym9219, k) {
    var this__9221 = this;
    var this_sym9219__9222 = this;
    var coll__9223 = this_sym9219__9222;
    return coll__9223.cljs$core$ILookup$_lookup$arity$2(coll__9223, k)
  };
  var G__9252__3 = function(this_sym9220, k, not_found) {
    var this__9221 = this;
    var this_sym9220__9224 = this;
    var coll__9225 = this_sym9220__9224;
    return coll__9225.cljs$core$ILookup$_lookup$arity$3(coll__9225, k, not_found)
  };
  G__9252 = function(this_sym9220, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__9252__2.call(this, this_sym9220, k);
      case 3:
        return G__9252__3.call(this, this_sym9220, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__9252
}();
cljs.core.PersistentTreeMap.prototype.apply = function(this_sym9206, args9207) {
  var this__9226 = this;
  return this_sym9206.call.apply(this_sym9206, [this_sym9206].concat(args9207.slice()))
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = function(coll, f, init) {
  var this__9227 = this;
  if(!(this__9227.tree == null)) {
    return cljs.core.tree_map_kv_reduce.call(null, this__9227.tree, f, init)
  }else {
    return init
  }
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, entry) {
  var this__9228 = this;
  if(cljs.core.vector_QMARK_.call(null, entry)) {
    return coll.cljs$core$IAssociative$_assoc$arity$3(coll, cljs.core._nth.call(null, entry, 0), cljs.core._nth.call(null, entry, 1))
  }else {
    return cljs.core.reduce.call(null, cljs.core._conj, coll, entry)
  }
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IReversible$_rseq$arity$1 = function(coll) {
  var this__9229 = this;
  if(this__9229.cnt > 0) {
    return cljs.core.create_tree_map_seq.call(null, this__9229.tree, false, this__9229.cnt)
  }else {
    return null
  }
};
cljs.core.PersistentTreeMap.prototype.toString = function() {
  var this__9230 = this;
  var this__9231 = this;
  return cljs.core.pr_str.call(null, this__9231)
};
cljs.core.PersistentTreeMap.prototype.entry_at = function(k) {
  var this__9232 = this;
  var coll__9233 = this;
  var t__9234 = this__9232.tree;
  while(true) {
    if(!(t__9234 == null)) {
      var c__9235 = this__9232.comp.call(null, k, t__9234.key);
      if(c__9235 === 0) {
        return t__9234
      }else {
        if(c__9235 < 0) {
          var G__9253 = t__9234.left;
          t__9234 = G__9253;
          continue
        }else {
          if("\ufdd0'else") {
            var G__9254 = t__9234.right;
            t__9234 = G__9254;
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
  var this__9236 = this;
  if(this__9236.cnt > 0) {
    return cljs.core.create_tree_map_seq.call(null, this__9236.tree, ascending_QMARK_, this__9236.cnt)
  }else {
    return null
  }
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ISorted$_sorted_seq_from$arity$3 = function(coll, k, ascending_QMARK_) {
  var this__9237 = this;
  if(this__9237.cnt > 0) {
    var stack__9238 = null;
    var t__9239 = this__9237.tree;
    while(true) {
      if(!(t__9239 == null)) {
        var c__9240 = this__9237.comp.call(null, k, t__9239.key);
        if(c__9240 === 0) {
          return new cljs.core.PersistentTreeMapSeq(null, cljs.core.conj.call(null, stack__9238, t__9239), ascending_QMARK_, -1, null)
        }else {
          if(cljs.core.truth_(ascending_QMARK_)) {
            if(c__9240 < 0) {
              var G__9255 = cljs.core.conj.call(null, stack__9238, t__9239);
              var G__9256 = t__9239.left;
              stack__9238 = G__9255;
              t__9239 = G__9256;
              continue
            }else {
              var G__9257 = stack__9238;
              var G__9258 = t__9239.right;
              stack__9238 = G__9257;
              t__9239 = G__9258;
              continue
            }
          }else {
            if("\ufdd0'else") {
              if(c__9240 > 0) {
                var G__9259 = cljs.core.conj.call(null, stack__9238, t__9239);
                var G__9260 = t__9239.right;
                stack__9238 = G__9259;
                t__9239 = G__9260;
                continue
              }else {
                var G__9261 = stack__9238;
                var G__9262 = t__9239.left;
                stack__9238 = G__9261;
                t__9239 = G__9262;
                continue
              }
            }else {
              return null
            }
          }
        }
      }else {
        if(stack__9238 == null) {
          return new cljs.core.PersistentTreeMapSeq(null, stack__9238, ascending_QMARK_, -1, null)
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
  var this__9241 = this;
  return cljs.core.key.call(null, entry)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ISorted$_comparator$arity$1 = function(coll) {
  var this__9242 = this;
  return this__9242.comp
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__9243 = this;
  if(this__9243.cnt > 0) {
    return cljs.core.create_tree_map_seq.call(null, this__9243.tree, true, this__9243.cnt)
  }else {
    return null
  }
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__9244 = this;
  return this__9244.cnt
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__9245 = this;
  return cljs.core.equiv_map.call(null, coll, other)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__9246 = this;
  return new cljs.core.PersistentTreeMap(this__9246.comp, this__9246.tree, this__9246.cnt, meta, this__9246.__hash)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__9247 = this;
  return this__9247.meta
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__9248 = this;
  return cljs.core.with_meta.call(null, cljs.core.PersistentTreeMap.EMPTY, this__9248.meta)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IMap$_dissoc$arity$2 = function(coll, k) {
  var this__9249 = this;
  var found__9250 = [null];
  var t__9251 = cljs.core.tree_map_remove.call(null, this__9249.comp, this__9249.tree, k, found__9250);
  if(t__9251 == null) {
    if(cljs.core.nth.call(null, found__9250, 0) == null) {
      return coll
    }else {
      return new cljs.core.PersistentTreeMap(this__9249.comp, null, 0, this__9249.meta, null)
    }
  }else {
    return new cljs.core.PersistentTreeMap(this__9249.comp, t__9251.blacken(), this__9249.cnt - 1, this__9249.meta, null)
  }
};
cljs.core.PersistentTreeMap;
cljs.core.PersistentTreeMap.EMPTY = new cljs.core.PersistentTreeMap(cljs.core.compare, null, 0, null, 0);
cljs.core.hash_map = function() {
  var hash_map__delegate = function(keyvals) {
    var in__9265 = cljs.core.seq.call(null, keyvals);
    var out__9266 = cljs.core.transient$.call(null, cljs.core.PersistentHashMap.EMPTY);
    while(true) {
      if(in__9265) {
        var G__9267 = cljs.core.nnext.call(null, in__9265);
        var G__9268 = cljs.core.assoc_BANG_.call(null, out__9266, cljs.core.first.call(null, in__9265), cljs.core.second.call(null, in__9265));
        in__9265 = G__9267;
        out__9266 = G__9268;
        continue
      }else {
        return cljs.core.persistent_BANG_.call(null, out__9266)
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
  hash_map.cljs$lang$applyTo = function(arglist__9269) {
    var keyvals = cljs.core.seq(arglist__9269);
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
  array_map.cljs$lang$applyTo = function(arglist__9270) {
    var keyvals = cljs.core.seq(arglist__9270);
    return array_map__delegate(keyvals)
  };
  array_map.cljs$lang$arity$variadic = array_map__delegate;
  return array_map
}();
cljs.core.obj_map = function() {
  var obj_map__delegate = function(keyvals) {
    var ks__9274 = [];
    var obj__9275 = {};
    var kvs__9276 = cljs.core.seq.call(null, keyvals);
    while(true) {
      if(kvs__9276) {
        ks__9274.push(cljs.core.first.call(null, kvs__9276));
        obj__9275[cljs.core.first.call(null, kvs__9276)] = cljs.core.second.call(null, kvs__9276);
        var G__9277 = cljs.core.nnext.call(null, kvs__9276);
        kvs__9276 = G__9277;
        continue
      }else {
        return cljs.core.ObjMap.fromObject.call(null, ks__9274, obj__9275)
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
  obj_map.cljs$lang$applyTo = function(arglist__9278) {
    var keyvals = cljs.core.seq(arglist__9278);
    return obj_map__delegate(keyvals)
  };
  obj_map.cljs$lang$arity$variadic = obj_map__delegate;
  return obj_map
}();
cljs.core.sorted_map = function() {
  var sorted_map__delegate = function(keyvals) {
    var in__9281 = cljs.core.seq.call(null, keyvals);
    var out__9282 = cljs.core.PersistentTreeMap.EMPTY;
    while(true) {
      if(in__9281) {
        var G__9283 = cljs.core.nnext.call(null, in__9281);
        var G__9284 = cljs.core.assoc.call(null, out__9282, cljs.core.first.call(null, in__9281), cljs.core.second.call(null, in__9281));
        in__9281 = G__9283;
        out__9282 = G__9284;
        continue
      }else {
        return out__9282
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
  sorted_map.cljs$lang$applyTo = function(arglist__9285) {
    var keyvals = cljs.core.seq(arglist__9285);
    return sorted_map__delegate(keyvals)
  };
  sorted_map.cljs$lang$arity$variadic = sorted_map__delegate;
  return sorted_map
}();
cljs.core.sorted_map_by = function() {
  var sorted_map_by__delegate = function(comparator, keyvals) {
    var in__9288 = cljs.core.seq.call(null, keyvals);
    var out__9289 = new cljs.core.PersistentTreeMap(comparator, null, 0, null, 0);
    while(true) {
      if(in__9288) {
        var G__9290 = cljs.core.nnext.call(null, in__9288);
        var G__9291 = cljs.core.assoc.call(null, out__9289, cljs.core.first.call(null, in__9288), cljs.core.second.call(null, in__9288));
        in__9288 = G__9290;
        out__9289 = G__9291;
        continue
      }else {
        return out__9289
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
  sorted_map_by.cljs$lang$applyTo = function(arglist__9292) {
    var comparator = cljs.core.first(arglist__9292);
    var keyvals = cljs.core.rest(arglist__9292);
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
      return cljs.core.reduce.call(null, function(p1__9293_SHARP_, p2__9294_SHARP_) {
        return cljs.core.conj.call(null, function() {
          var or__3824__auto____9296 = p1__9293_SHARP_;
          if(cljs.core.truth_(or__3824__auto____9296)) {
            return or__3824__auto____9296
          }else {
            return cljs.core.ObjMap.EMPTY
          }
        }(), p2__9294_SHARP_)
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
  merge.cljs$lang$applyTo = function(arglist__9297) {
    var maps = cljs.core.seq(arglist__9297);
    return merge__delegate(maps)
  };
  merge.cljs$lang$arity$variadic = merge__delegate;
  return merge
}();
cljs.core.merge_with = function() {
  var merge_with__delegate = function(f, maps) {
    if(cljs.core.truth_(cljs.core.some.call(null, cljs.core.identity, maps))) {
      var merge_entry__9305 = function(m, e) {
        var k__9303 = cljs.core.first.call(null, e);
        var v__9304 = cljs.core.second.call(null, e);
        if(cljs.core.contains_QMARK_.call(null, m, k__9303)) {
          return cljs.core.assoc.call(null, m, k__9303, f.call(null, cljs.core._lookup.call(null, m, k__9303, null), v__9304))
        }else {
          return cljs.core.assoc.call(null, m, k__9303, v__9304)
        }
      };
      var merge2__9307 = function(m1, m2) {
        return cljs.core.reduce.call(null, merge_entry__9305, function() {
          var or__3824__auto____9306 = m1;
          if(cljs.core.truth_(or__3824__auto____9306)) {
            return or__3824__auto____9306
          }else {
            return cljs.core.ObjMap.EMPTY
          }
        }(), cljs.core.seq.call(null, m2))
      };
      return cljs.core.reduce.call(null, merge2__9307, maps)
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
  merge_with.cljs$lang$applyTo = function(arglist__9308) {
    var f = cljs.core.first(arglist__9308);
    var maps = cljs.core.rest(arglist__9308);
    return merge_with__delegate(f, maps)
  };
  merge_with.cljs$lang$arity$variadic = merge_with__delegate;
  return merge_with
}();
cljs.core.select_keys = function select_keys(map, keyseq) {
  var ret__9313 = cljs.core.ObjMap.EMPTY;
  var keys__9314 = cljs.core.seq.call(null, keyseq);
  while(true) {
    if(keys__9314) {
      var key__9315 = cljs.core.first.call(null, keys__9314);
      var entry__9316 = cljs.core._lookup.call(null, map, key__9315, "\ufdd0'cljs.core/not-found");
      var G__9317 = cljs.core.not_EQ_.call(null, entry__9316, "\ufdd0'cljs.core/not-found") ? cljs.core.assoc.call(null, ret__9313, key__9315, entry__9316) : ret__9313;
      var G__9318 = cljs.core.next.call(null, keys__9314);
      ret__9313 = G__9317;
      keys__9314 = G__9318;
      continue
    }else {
      return ret__9313
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
cljs.core.PersistentHashSet.cljs$lang$ctorPrSeq = function(this__2322__auto__) {
  return cljs.core.list.call(null, "cljs.core/PersistentHashSet")
};
cljs.core.PersistentHashSet.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = function(coll) {
  var this__9322 = this;
  return new cljs.core.TransientHashSet(cljs.core.transient$.call(null, this__9322.hash_map))
};
cljs.core.PersistentHashSet.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__9323 = this;
  var h__2205__auto____9324 = this__9323.__hash;
  if(!(h__2205__auto____9324 == null)) {
    return h__2205__auto____9324
  }else {
    var h__2205__auto____9325 = cljs.core.hash_iset.call(null, coll);
    this__9323.__hash = h__2205__auto____9325;
    return h__2205__auto____9325
  }
};
cljs.core.PersistentHashSet.prototype.cljs$core$ILookup$_lookup$arity$2 = function(coll, v) {
  var this__9326 = this;
  return coll.cljs$core$ILookup$_lookup$arity$3(coll, v, null)
};
cljs.core.PersistentHashSet.prototype.cljs$core$ILookup$_lookup$arity$3 = function(coll, v, not_found) {
  var this__9327 = this;
  if(cljs.core.truth_(cljs.core._contains_key_QMARK_.call(null, this__9327.hash_map, v))) {
    return v
  }else {
    return not_found
  }
};
cljs.core.PersistentHashSet.prototype.call = function() {
  var G__9348 = null;
  var G__9348__2 = function(this_sym9328, k) {
    var this__9330 = this;
    var this_sym9328__9331 = this;
    var coll__9332 = this_sym9328__9331;
    return coll__9332.cljs$core$ILookup$_lookup$arity$2(coll__9332, k)
  };
  var G__9348__3 = function(this_sym9329, k, not_found) {
    var this__9330 = this;
    var this_sym9329__9333 = this;
    var coll__9334 = this_sym9329__9333;
    return coll__9334.cljs$core$ILookup$_lookup$arity$3(coll__9334, k, not_found)
  };
  G__9348 = function(this_sym9329, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__9348__2.call(this, this_sym9329, k);
      case 3:
        return G__9348__3.call(this, this_sym9329, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__9348
}();
cljs.core.PersistentHashSet.prototype.apply = function(this_sym9320, args9321) {
  var this__9335 = this;
  return this_sym9320.call.apply(this_sym9320, [this_sym9320].concat(args9321.slice()))
};
cljs.core.PersistentHashSet.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__9336 = this;
  return new cljs.core.PersistentHashSet(this__9336.meta, cljs.core.assoc.call(null, this__9336.hash_map, o, null), null)
};
cljs.core.PersistentHashSet.prototype.toString = function() {
  var this__9337 = this;
  var this__9338 = this;
  return cljs.core.pr_str.call(null, this__9338)
};
cljs.core.PersistentHashSet.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__9339 = this;
  return cljs.core.keys.call(null, this__9339.hash_map)
};
cljs.core.PersistentHashSet.prototype.cljs$core$ISet$_disjoin$arity$2 = function(coll, v) {
  var this__9340 = this;
  return new cljs.core.PersistentHashSet(this__9340.meta, cljs.core.dissoc.call(null, this__9340.hash_map, v), null)
};
cljs.core.PersistentHashSet.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__9341 = this;
  return cljs.core.count.call(null, cljs.core.seq.call(null, coll))
};
cljs.core.PersistentHashSet.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__9342 = this;
  var and__3822__auto____9343 = cljs.core.set_QMARK_.call(null, other);
  if(and__3822__auto____9343) {
    var and__3822__auto____9344 = cljs.core.count.call(null, coll) === cljs.core.count.call(null, other);
    if(and__3822__auto____9344) {
      return cljs.core.every_QMARK_.call(null, function(p1__9319_SHARP_) {
        return cljs.core.contains_QMARK_.call(null, coll, p1__9319_SHARP_)
      }, other)
    }else {
      return and__3822__auto____9344
    }
  }else {
    return and__3822__auto____9343
  }
};
cljs.core.PersistentHashSet.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__9345 = this;
  return new cljs.core.PersistentHashSet(meta, this__9345.hash_map, this__9345.__hash)
};
cljs.core.PersistentHashSet.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__9346 = this;
  return this__9346.meta
};
cljs.core.PersistentHashSet.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__9347 = this;
  return cljs.core.with_meta.call(null, cljs.core.PersistentHashSet.EMPTY, this__9347.meta)
};
cljs.core.PersistentHashSet;
cljs.core.PersistentHashSet.EMPTY = new cljs.core.PersistentHashSet(null, cljs.core.hash_map.call(null), 0);
cljs.core.PersistentHashSet.fromArray = function(items) {
  var len__9349 = cljs.core.count.call(null, items);
  var i__9350 = 0;
  var out__9351 = cljs.core.transient$.call(null, cljs.core.PersistentHashSet.EMPTY);
  while(true) {
    if(i__9350 < len__9349) {
      var G__9352 = i__9350 + 1;
      var G__9353 = cljs.core.conj_BANG_.call(null, out__9351, items[i__9350]);
      i__9350 = G__9352;
      out__9351 = G__9353;
      continue
    }else {
      return cljs.core.persistent_BANG_.call(null, out__9351)
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
cljs.core.TransientHashSet.cljs$lang$ctorPrSeq = function(this__2322__auto__) {
  return cljs.core.list.call(null, "cljs.core/TransientHashSet")
};
cljs.core.TransientHashSet.prototype.call = function() {
  var G__9371 = null;
  var G__9371__2 = function(this_sym9357, k) {
    var this__9359 = this;
    var this_sym9357__9360 = this;
    var tcoll__9361 = this_sym9357__9360;
    if(cljs.core._lookup.call(null, this__9359.transient_map, k, cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel) {
      return null
    }else {
      return k
    }
  };
  var G__9371__3 = function(this_sym9358, k, not_found) {
    var this__9359 = this;
    var this_sym9358__9362 = this;
    var tcoll__9363 = this_sym9358__9362;
    if(cljs.core._lookup.call(null, this__9359.transient_map, k, cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel) {
      return not_found
    }else {
      return k
    }
  };
  G__9371 = function(this_sym9358, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__9371__2.call(this, this_sym9358, k);
      case 3:
        return G__9371__3.call(this, this_sym9358, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__9371
}();
cljs.core.TransientHashSet.prototype.apply = function(this_sym9355, args9356) {
  var this__9364 = this;
  return this_sym9355.call.apply(this_sym9355, [this_sym9355].concat(args9356.slice()))
};
cljs.core.TransientHashSet.prototype.cljs$core$ILookup$_lookup$arity$2 = function(tcoll, v) {
  var this__9365 = this;
  return tcoll.cljs$core$ILookup$_lookup$arity$3(tcoll, v, null)
};
cljs.core.TransientHashSet.prototype.cljs$core$ILookup$_lookup$arity$3 = function(tcoll, v, not_found) {
  var this__9366 = this;
  if(cljs.core._lookup.call(null, this__9366.transient_map, v, cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel) {
    return not_found
  }else {
    return v
  }
};
cljs.core.TransientHashSet.prototype.cljs$core$ICounted$_count$arity$1 = function(tcoll) {
  var this__9367 = this;
  return cljs.core.count.call(null, this__9367.transient_map)
};
cljs.core.TransientHashSet.prototype.cljs$core$ITransientSet$_disjoin_BANG_$arity$2 = function(tcoll, v) {
  var this__9368 = this;
  this__9368.transient_map = cljs.core.dissoc_BANG_.call(null, this__9368.transient_map, v);
  return tcoll
};
cljs.core.TransientHashSet.prototype.cljs$core$ITransientCollection$_conj_BANG_$arity$2 = function(tcoll, o) {
  var this__9369 = this;
  this__9369.transient_map = cljs.core.assoc_BANG_.call(null, this__9369.transient_map, o, null);
  return tcoll
};
cljs.core.TransientHashSet.prototype.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 = function(tcoll) {
  var this__9370 = this;
  return new cljs.core.PersistentHashSet(null, cljs.core.persistent_BANG_.call(null, this__9370.transient_map), null)
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
cljs.core.PersistentTreeSet.cljs$lang$ctorPrSeq = function(this__2322__auto__) {
  return cljs.core.list.call(null, "cljs.core/PersistentTreeSet")
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__9374 = this;
  var h__2205__auto____9375 = this__9374.__hash;
  if(!(h__2205__auto____9375 == null)) {
    return h__2205__auto____9375
  }else {
    var h__2205__auto____9376 = cljs.core.hash_iset.call(null, coll);
    this__9374.__hash = h__2205__auto____9376;
    return h__2205__auto____9376
  }
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ILookup$_lookup$arity$2 = function(coll, v) {
  var this__9377 = this;
  return coll.cljs$core$ILookup$_lookup$arity$3(coll, v, null)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ILookup$_lookup$arity$3 = function(coll, v, not_found) {
  var this__9378 = this;
  if(cljs.core.truth_(cljs.core._contains_key_QMARK_.call(null, this__9378.tree_map, v))) {
    return v
  }else {
    return not_found
  }
};
cljs.core.PersistentTreeSet.prototype.call = function() {
  var G__9404 = null;
  var G__9404__2 = function(this_sym9379, k) {
    var this__9381 = this;
    var this_sym9379__9382 = this;
    var coll__9383 = this_sym9379__9382;
    return coll__9383.cljs$core$ILookup$_lookup$arity$2(coll__9383, k)
  };
  var G__9404__3 = function(this_sym9380, k, not_found) {
    var this__9381 = this;
    var this_sym9380__9384 = this;
    var coll__9385 = this_sym9380__9384;
    return coll__9385.cljs$core$ILookup$_lookup$arity$3(coll__9385, k, not_found)
  };
  G__9404 = function(this_sym9380, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__9404__2.call(this, this_sym9380, k);
      case 3:
        return G__9404__3.call(this, this_sym9380, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__9404
}();
cljs.core.PersistentTreeSet.prototype.apply = function(this_sym9372, args9373) {
  var this__9386 = this;
  return this_sym9372.call.apply(this_sym9372, [this_sym9372].concat(args9373.slice()))
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__9387 = this;
  return new cljs.core.PersistentTreeSet(this__9387.meta, cljs.core.assoc.call(null, this__9387.tree_map, o, null), null)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IReversible$_rseq$arity$1 = function(coll) {
  var this__9388 = this;
  return cljs.core.map.call(null, cljs.core.key, cljs.core.rseq.call(null, this__9388.tree_map))
};
cljs.core.PersistentTreeSet.prototype.toString = function() {
  var this__9389 = this;
  var this__9390 = this;
  return cljs.core.pr_str.call(null, this__9390)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ISorted$_sorted_seq$arity$2 = function(coll, ascending_QMARK_) {
  var this__9391 = this;
  return cljs.core.map.call(null, cljs.core.key, cljs.core._sorted_seq.call(null, this__9391.tree_map, ascending_QMARK_))
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ISorted$_sorted_seq_from$arity$3 = function(coll, k, ascending_QMARK_) {
  var this__9392 = this;
  return cljs.core.map.call(null, cljs.core.key, cljs.core._sorted_seq_from.call(null, this__9392.tree_map, k, ascending_QMARK_))
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ISorted$_entry_key$arity$2 = function(coll, entry) {
  var this__9393 = this;
  return entry
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ISorted$_comparator$arity$1 = function(coll) {
  var this__9394 = this;
  return cljs.core._comparator.call(null, this__9394.tree_map)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__9395 = this;
  return cljs.core.keys.call(null, this__9395.tree_map)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ISet$_disjoin$arity$2 = function(coll, v) {
  var this__9396 = this;
  return new cljs.core.PersistentTreeSet(this__9396.meta, cljs.core.dissoc.call(null, this__9396.tree_map, v), null)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__9397 = this;
  return cljs.core.count.call(null, this__9397.tree_map)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__9398 = this;
  var and__3822__auto____9399 = cljs.core.set_QMARK_.call(null, other);
  if(and__3822__auto____9399) {
    var and__3822__auto____9400 = cljs.core.count.call(null, coll) === cljs.core.count.call(null, other);
    if(and__3822__auto____9400) {
      return cljs.core.every_QMARK_.call(null, function(p1__9354_SHARP_) {
        return cljs.core.contains_QMARK_.call(null, coll, p1__9354_SHARP_)
      }, other)
    }else {
      return and__3822__auto____9400
    }
  }else {
    return and__3822__auto____9399
  }
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__9401 = this;
  return new cljs.core.PersistentTreeSet(meta, this__9401.tree_map, this__9401.__hash)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__9402 = this;
  return this__9402.meta
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__9403 = this;
  return cljs.core.with_meta.call(null, cljs.core.PersistentTreeSet.EMPTY, this__9403.meta)
};
cljs.core.PersistentTreeSet;
cljs.core.PersistentTreeSet.EMPTY = new cljs.core.PersistentTreeSet(null, cljs.core.sorted_map.call(null), 0);
cljs.core.hash_set = function() {
  var hash_set = null;
  var hash_set__0 = function() {
    return cljs.core.PersistentHashSet.EMPTY
  };
  var hash_set__1 = function() {
    var G__9409__delegate = function(keys) {
      var in__9407 = cljs.core.seq.call(null, keys);
      var out__9408 = cljs.core.transient$.call(null, cljs.core.PersistentHashSet.EMPTY);
      while(true) {
        if(cljs.core.seq.call(null, in__9407)) {
          var G__9410 = cljs.core.next.call(null, in__9407);
          var G__9411 = cljs.core.conj_BANG_.call(null, out__9408, cljs.core.first.call(null, in__9407));
          in__9407 = G__9410;
          out__9408 = G__9411;
          continue
        }else {
          return cljs.core.persistent_BANG_.call(null, out__9408)
        }
        break
      }
    };
    var G__9409 = function(var_args) {
      var keys = null;
      if(goog.isDef(var_args)) {
        keys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
      }
      return G__9409__delegate.call(this, keys)
    };
    G__9409.cljs$lang$maxFixedArity = 0;
    G__9409.cljs$lang$applyTo = function(arglist__9412) {
      var keys = cljs.core.seq(arglist__9412);
      return G__9409__delegate(keys)
    };
    G__9409.cljs$lang$arity$variadic = G__9409__delegate;
    return G__9409
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
  sorted_set.cljs$lang$applyTo = function(arglist__9413) {
    var keys = cljs.core.seq(arglist__9413);
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
  sorted_set_by.cljs$lang$applyTo = function(arglist__9415) {
    var comparator = cljs.core.first(arglist__9415);
    var keys = cljs.core.rest(arglist__9415);
    return sorted_set_by__delegate(comparator, keys)
  };
  sorted_set_by.cljs$lang$arity$variadic = sorted_set_by__delegate;
  return sorted_set_by
}();
cljs.core.replace = function replace(smap, coll) {
  if(cljs.core.vector_QMARK_.call(null, coll)) {
    var n__9421 = cljs.core.count.call(null, coll);
    return cljs.core.reduce.call(null, function(v, i) {
      var temp__3971__auto____9422 = cljs.core.find.call(null, smap, cljs.core.nth.call(null, v, i));
      if(cljs.core.truth_(temp__3971__auto____9422)) {
        var e__9423 = temp__3971__auto____9422;
        return cljs.core.assoc.call(null, v, i, cljs.core.second.call(null, e__9423))
      }else {
        return v
      }
    }, coll, cljs.core.take.call(null, n__9421, cljs.core.iterate.call(null, cljs.core.inc, 0)))
  }else {
    return cljs.core.map.call(null, function(p1__9414_SHARP_) {
      var temp__3971__auto____9424 = cljs.core.find.call(null, smap, p1__9414_SHARP_);
      if(cljs.core.truth_(temp__3971__auto____9424)) {
        var e__9425 = temp__3971__auto____9424;
        return cljs.core.second.call(null, e__9425)
      }else {
        return p1__9414_SHARP_
      }
    }, coll)
  }
};
cljs.core.distinct = function distinct(coll) {
  var step__9455 = function step(xs, seen) {
    return new cljs.core.LazySeq(null, false, function() {
      return function(p__9448, seen) {
        while(true) {
          var vec__9449__9450 = p__9448;
          var f__9451 = cljs.core.nth.call(null, vec__9449__9450, 0, null);
          var xs__9452 = vec__9449__9450;
          var temp__3974__auto____9453 = cljs.core.seq.call(null, xs__9452);
          if(temp__3974__auto____9453) {
            var s__9454 = temp__3974__auto____9453;
            if(cljs.core.contains_QMARK_.call(null, seen, f__9451)) {
              var G__9456 = cljs.core.rest.call(null, s__9454);
              var G__9457 = seen;
              p__9448 = G__9456;
              seen = G__9457;
              continue
            }else {
              return cljs.core.cons.call(null, f__9451, step.call(null, cljs.core.rest.call(null, s__9454), cljs.core.conj.call(null, seen, f__9451)))
            }
          }else {
            return null
          }
          break
        }
      }.call(null, xs, seen)
    }, null)
  };
  return step__9455.call(null, coll, cljs.core.PersistentHashSet.EMPTY)
};
cljs.core.butlast = function butlast(s) {
  var ret__9460 = cljs.core.PersistentVector.EMPTY;
  var s__9461 = s;
  while(true) {
    if(cljs.core.next.call(null, s__9461)) {
      var G__9462 = cljs.core.conj.call(null, ret__9460, cljs.core.first.call(null, s__9461));
      var G__9463 = cljs.core.next.call(null, s__9461);
      ret__9460 = G__9462;
      s__9461 = G__9463;
      continue
    }else {
      return cljs.core.seq.call(null, ret__9460)
    }
    break
  }
};
cljs.core.name = function name(x) {
  if(cljs.core.string_QMARK_.call(null, x)) {
    return x
  }else {
    if(function() {
      var or__3824__auto____9466 = cljs.core.keyword_QMARK_.call(null, x);
      if(or__3824__auto____9466) {
        return or__3824__auto____9466
      }else {
        return cljs.core.symbol_QMARK_.call(null, x)
      }
    }()) {
      var i__9467 = x.lastIndexOf("/");
      if(i__9467 < 0) {
        return cljs.core.subs.call(null, x, 2)
      }else {
        return cljs.core.subs.call(null, x, i__9467 + 1)
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
    var or__3824__auto____9470 = cljs.core.keyword_QMARK_.call(null, x);
    if(or__3824__auto____9470) {
      return or__3824__auto____9470
    }else {
      return cljs.core.symbol_QMARK_.call(null, x)
    }
  }()) {
    var i__9471 = x.lastIndexOf("/");
    if(i__9471 > -1) {
      return cljs.core.subs.call(null, x, 2, i__9471)
    }else {
      return null
    }
  }else {
    throw new Error([cljs.core.str("Doesn't support namespace: "), cljs.core.str(x)].join(""));
  }
};
cljs.core.zipmap = function zipmap(keys, vals) {
  var map__9478 = cljs.core.ObjMap.EMPTY;
  var ks__9479 = cljs.core.seq.call(null, keys);
  var vs__9480 = cljs.core.seq.call(null, vals);
  while(true) {
    if(function() {
      var and__3822__auto____9481 = ks__9479;
      if(and__3822__auto____9481) {
        return vs__9480
      }else {
        return and__3822__auto____9481
      }
    }()) {
      var G__9482 = cljs.core.assoc.call(null, map__9478, cljs.core.first.call(null, ks__9479), cljs.core.first.call(null, vs__9480));
      var G__9483 = cljs.core.next.call(null, ks__9479);
      var G__9484 = cljs.core.next.call(null, vs__9480);
      map__9478 = G__9482;
      ks__9479 = G__9483;
      vs__9480 = G__9484;
      continue
    }else {
      return map__9478
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
    var G__9487__delegate = function(k, x, y, more) {
      return cljs.core.reduce.call(null, function(p1__9472_SHARP_, p2__9473_SHARP_) {
        return max_key.call(null, k, p1__9472_SHARP_, p2__9473_SHARP_)
      }, max_key.call(null, k, x, y), more)
    };
    var G__9487 = function(k, x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
      }
      return G__9487__delegate.call(this, k, x, y, more)
    };
    G__9487.cljs$lang$maxFixedArity = 3;
    G__9487.cljs$lang$applyTo = function(arglist__9488) {
      var k = cljs.core.first(arglist__9488);
      var x = cljs.core.first(cljs.core.next(arglist__9488));
      var y = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9488)));
      var more = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9488)));
      return G__9487__delegate(k, x, y, more)
    };
    G__9487.cljs$lang$arity$variadic = G__9487__delegate;
    return G__9487
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
    var G__9489__delegate = function(k, x, y, more) {
      return cljs.core.reduce.call(null, function(p1__9485_SHARP_, p2__9486_SHARP_) {
        return min_key.call(null, k, p1__9485_SHARP_, p2__9486_SHARP_)
      }, min_key.call(null, k, x, y), more)
    };
    var G__9489 = function(k, x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
      }
      return G__9489__delegate.call(this, k, x, y, more)
    };
    G__9489.cljs$lang$maxFixedArity = 3;
    G__9489.cljs$lang$applyTo = function(arglist__9490) {
      var k = cljs.core.first(arglist__9490);
      var x = cljs.core.first(cljs.core.next(arglist__9490));
      var y = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9490)));
      var more = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9490)));
      return G__9489__delegate(k, x, y, more)
    };
    G__9489.cljs$lang$arity$variadic = G__9489__delegate;
    return G__9489
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
      var temp__3974__auto____9493 = cljs.core.seq.call(null, coll);
      if(temp__3974__auto____9493) {
        var s__9494 = temp__3974__auto____9493;
        return cljs.core.cons.call(null, cljs.core.take.call(null, n, s__9494), partition_all.call(null, n, step, cljs.core.drop.call(null, step, s__9494)))
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
    var temp__3974__auto____9497 = cljs.core.seq.call(null, coll);
    if(temp__3974__auto____9497) {
      var s__9498 = temp__3974__auto____9497;
      if(cljs.core.truth_(pred.call(null, cljs.core.first.call(null, s__9498)))) {
        return cljs.core.cons.call(null, cljs.core.first.call(null, s__9498), take_while.call(null, pred, cljs.core.rest.call(null, s__9498)))
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
    var comp__9500 = cljs.core._comparator.call(null, sc);
    return test.call(null, comp__9500.call(null, cljs.core._entry_key.call(null, sc, e), key), 0)
  }
};
cljs.core.subseq = function() {
  var subseq = null;
  var subseq__3 = function(sc, test, key) {
    var include__9512 = cljs.core.mk_bound_fn.call(null, sc, test, key);
    if(cljs.core.truth_(cljs.core.PersistentHashSet.fromArray([cljs.core._GT_, cljs.core._GT__EQ_]).call(null, test))) {
      var temp__3974__auto____9513 = cljs.core._sorted_seq_from.call(null, sc, key, true);
      if(cljs.core.truth_(temp__3974__auto____9513)) {
        var vec__9514__9515 = temp__3974__auto____9513;
        var e__9516 = cljs.core.nth.call(null, vec__9514__9515, 0, null);
        var s__9517 = vec__9514__9515;
        if(cljs.core.truth_(include__9512.call(null, e__9516))) {
          return s__9517
        }else {
          return cljs.core.next.call(null, s__9517)
        }
      }else {
        return null
      }
    }else {
      return cljs.core.take_while.call(null, include__9512, cljs.core._sorted_seq.call(null, sc, true))
    }
  };
  var subseq__5 = function(sc, start_test, start_key, end_test, end_key) {
    var temp__3974__auto____9518 = cljs.core._sorted_seq_from.call(null, sc, start_key, true);
    if(cljs.core.truth_(temp__3974__auto____9518)) {
      var vec__9519__9520 = temp__3974__auto____9518;
      var e__9521 = cljs.core.nth.call(null, vec__9519__9520, 0, null);
      var s__9522 = vec__9519__9520;
      return cljs.core.take_while.call(null, cljs.core.mk_bound_fn.call(null, sc, end_test, end_key), cljs.core.truth_(cljs.core.mk_bound_fn.call(null, sc, start_test, start_key).call(null, e__9521)) ? s__9522 : cljs.core.next.call(null, s__9522))
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
    var include__9534 = cljs.core.mk_bound_fn.call(null, sc, test, key);
    if(cljs.core.truth_(cljs.core.PersistentHashSet.fromArray([cljs.core._LT_, cljs.core._LT__EQ_]).call(null, test))) {
      var temp__3974__auto____9535 = cljs.core._sorted_seq_from.call(null, sc, key, false);
      if(cljs.core.truth_(temp__3974__auto____9535)) {
        var vec__9536__9537 = temp__3974__auto____9535;
        var e__9538 = cljs.core.nth.call(null, vec__9536__9537, 0, null);
        var s__9539 = vec__9536__9537;
        if(cljs.core.truth_(include__9534.call(null, e__9538))) {
          return s__9539
        }else {
          return cljs.core.next.call(null, s__9539)
        }
      }else {
        return null
      }
    }else {
      return cljs.core.take_while.call(null, include__9534, cljs.core._sorted_seq.call(null, sc, false))
    }
  };
  var rsubseq__5 = function(sc, start_test, start_key, end_test, end_key) {
    var temp__3974__auto____9540 = cljs.core._sorted_seq_from.call(null, sc, end_key, false);
    if(cljs.core.truth_(temp__3974__auto____9540)) {
      var vec__9541__9542 = temp__3974__auto____9540;
      var e__9543 = cljs.core.nth.call(null, vec__9541__9542, 0, null);
      var s__9544 = vec__9541__9542;
      return cljs.core.take_while.call(null, cljs.core.mk_bound_fn.call(null, sc, start_test, start_key), cljs.core.truth_(cljs.core.mk_bound_fn.call(null, sc, end_test, end_key).call(null, e__9543)) ? s__9544 : cljs.core.next.call(null, s__9544))
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
cljs.core.Range.cljs$lang$ctorPrSeq = function(this__2322__auto__) {
  return cljs.core.list.call(null, "cljs.core/Range")
};
cljs.core.Range.prototype.cljs$core$IHash$_hash$arity$1 = function(rng) {
  var this__9545 = this;
  var h__2205__auto____9546 = this__9545.__hash;
  if(!(h__2205__auto____9546 == null)) {
    return h__2205__auto____9546
  }else {
    var h__2205__auto____9547 = cljs.core.hash_coll.call(null, rng);
    this__9545.__hash = h__2205__auto____9547;
    return h__2205__auto____9547
  }
};
cljs.core.Range.prototype.cljs$core$INext$_next$arity$1 = function(rng) {
  var this__9548 = this;
  if(this__9548.step > 0) {
    if(this__9548.start + this__9548.step < this__9548.end) {
      return new cljs.core.Range(this__9548.meta, this__9548.start + this__9548.step, this__9548.end, this__9548.step, null)
    }else {
      return null
    }
  }else {
    if(this__9548.start + this__9548.step > this__9548.end) {
      return new cljs.core.Range(this__9548.meta, this__9548.start + this__9548.step, this__9548.end, this__9548.step, null)
    }else {
      return null
    }
  }
};
cljs.core.Range.prototype.cljs$core$ICollection$_conj$arity$2 = function(rng, o) {
  var this__9549 = this;
  return cljs.core.cons.call(null, o, rng)
};
cljs.core.Range.prototype.toString = function() {
  var this__9550 = this;
  var this__9551 = this;
  return cljs.core.pr_str.call(null, this__9551)
};
cljs.core.Range.prototype.cljs$core$IReduce$_reduce$arity$2 = function(rng, f) {
  var this__9552 = this;
  return cljs.core.ci_reduce.call(null, rng, f)
};
cljs.core.Range.prototype.cljs$core$IReduce$_reduce$arity$3 = function(rng, f, s) {
  var this__9553 = this;
  return cljs.core.ci_reduce.call(null, rng, f, s)
};
cljs.core.Range.prototype.cljs$core$ISeqable$_seq$arity$1 = function(rng) {
  var this__9554 = this;
  if(this__9554.step > 0) {
    if(this__9554.start < this__9554.end) {
      return rng
    }else {
      return null
    }
  }else {
    if(this__9554.start > this__9554.end) {
      return rng
    }else {
      return null
    }
  }
};
cljs.core.Range.prototype.cljs$core$ICounted$_count$arity$1 = function(rng) {
  var this__9555 = this;
  if(cljs.core.not.call(null, rng.cljs$core$ISeqable$_seq$arity$1(rng))) {
    return 0
  }else {
    return Math.ceil((this__9555.end - this__9555.start) / this__9555.step)
  }
};
cljs.core.Range.prototype.cljs$core$ISeq$_first$arity$1 = function(rng) {
  var this__9556 = this;
  return this__9556.start
};
cljs.core.Range.prototype.cljs$core$ISeq$_rest$arity$1 = function(rng) {
  var this__9557 = this;
  if(!(rng.cljs$core$ISeqable$_seq$arity$1(rng) == null)) {
    return new cljs.core.Range(this__9557.meta, this__9557.start + this__9557.step, this__9557.end, this__9557.step, null)
  }else {
    return cljs.core.List.EMPTY
  }
};
cljs.core.Range.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(rng, other) {
  var this__9558 = this;
  return cljs.core.equiv_sequential.call(null, rng, other)
};
cljs.core.Range.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(rng, meta) {
  var this__9559 = this;
  return new cljs.core.Range(meta, this__9559.start, this__9559.end, this__9559.step, this__9559.__hash)
};
cljs.core.Range.prototype.cljs$core$IMeta$_meta$arity$1 = function(rng) {
  var this__9560 = this;
  return this__9560.meta
};
cljs.core.Range.prototype.cljs$core$IIndexed$_nth$arity$2 = function(rng, n) {
  var this__9561 = this;
  if(n < rng.cljs$core$ICounted$_count$arity$1(rng)) {
    return this__9561.start + n * this__9561.step
  }else {
    if(function() {
      var and__3822__auto____9562 = this__9561.start > this__9561.end;
      if(and__3822__auto____9562) {
        return this__9561.step === 0
      }else {
        return and__3822__auto____9562
      }
    }()) {
      return this__9561.start
    }else {
      throw new Error("Index out of bounds");
    }
  }
};
cljs.core.Range.prototype.cljs$core$IIndexed$_nth$arity$3 = function(rng, n, not_found) {
  var this__9563 = this;
  if(n < rng.cljs$core$ICounted$_count$arity$1(rng)) {
    return this__9563.start + n * this__9563.step
  }else {
    if(function() {
      var and__3822__auto____9564 = this__9563.start > this__9563.end;
      if(and__3822__auto____9564) {
        return this__9563.step === 0
      }else {
        return and__3822__auto____9564
      }
    }()) {
      return this__9563.start
    }else {
      return not_found
    }
  }
};
cljs.core.Range.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(rng) {
  var this__9565 = this;
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this__9565.meta)
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
    var temp__3974__auto____9568 = cljs.core.seq.call(null, coll);
    if(temp__3974__auto____9568) {
      var s__9569 = temp__3974__auto____9568;
      return cljs.core.cons.call(null, cljs.core.first.call(null, s__9569), take_nth.call(null, n, cljs.core.drop.call(null, n, s__9569)))
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
    var temp__3974__auto____9576 = cljs.core.seq.call(null, coll);
    if(temp__3974__auto____9576) {
      var s__9577 = temp__3974__auto____9576;
      var fst__9578 = cljs.core.first.call(null, s__9577);
      var fv__9579 = f.call(null, fst__9578);
      var run__9580 = cljs.core.cons.call(null, fst__9578, cljs.core.take_while.call(null, function(p1__9570_SHARP_) {
        return cljs.core._EQ_.call(null, fv__9579, f.call(null, p1__9570_SHARP_))
      }, cljs.core.next.call(null, s__9577)));
      return cljs.core.cons.call(null, run__9580, partition_by.call(null, f, cljs.core.seq.call(null, cljs.core.drop.call(null, cljs.core.count.call(null, run__9580), s__9577))))
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
      var temp__3971__auto____9595 = cljs.core.seq.call(null, coll);
      if(temp__3971__auto____9595) {
        var s__9596 = temp__3971__auto____9595;
        return reductions.call(null, f, cljs.core.first.call(null, s__9596), cljs.core.rest.call(null, s__9596))
      }else {
        return cljs.core.list.call(null, f.call(null))
      }
    }, null)
  };
  var reductions__3 = function(f, init, coll) {
    return cljs.core.cons.call(null, init, new cljs.core.LazySeq(null, false, function() {
      var temp__3974__auto____9597 = cljs.core.seq.call(null, coll);
      if(temp__3974__auto____9597) {
        var s__9598 = temp__3974__auto____9597;
        return reductions.call(null, f, f.call(null, init, cljs.core.first.call(null, s__9598)), cljs.core.rest.call(null, s__9598))
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
      var G__9601 = null;
      var G__9601__0 = function() {
        return cljs.core.vector.call(null, f.call(null))
      };
      var G__9601__1 = function(x) {
        return cljs.core.vector.call(null, f.call(null, x))
      };
      var G__9601__2 = function(x, y) {
        return cljs.core.vector.call(null, f.call(null, x, y))
      };
      var G__9601__3 = function(x, y, z) {
        return cljs.core.vector.call(null, f.call(null, x, y, z))
      };
      var G__9601__4 = function() {
        var G__9602__delegate = function(x, y, z, args) {
          return cljs.core.vector.call(null, cljs.core.apply.call(null, f, x, y, z, args))
        };
        var G__9602 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__9602__delegate.call(this, x, y, z, args)
        };
        G__9602.cljs$lang$maxFixedArity = 3;
        G__9602.cljs$lang$applyTo = function(arglist__9603) {
          var x = cljs.core.first(arglist__9603);
          var y = cljs.core.first(cljs.core.next(arglist__9603));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9603)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9603)));
          return G__9602__delegate(x, y, z, args)
        };
        G__9602.cljs$lang$arity$variadic = G__9602__delegate;
        return G__9602
      }();
      G__9601 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return G__9601__0.call(this);
          case 1:
            return G__9601__1.call(this, x);
          case 2:
            return G__9601__2.call(this, x, y);
          case 3:
            return G__9601__3.call(this, x, y, z);
          default:
            return G__9601__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
        }
        throw"Invalid arity: " + arguments.length;
      };
      G__9601.cljs$lang$maxFixedArity = 3;
      G__9601.cljs$lang$applyTo = G__9601__4.cljs$lang$applyTo;
      return G__9601
    }()
  };
  var juxt__2 = function(f, g) {
    return function() {
      var G__9604 = null;
      var G__9604__0 = function() {
        return cljs.core.vector.call(null, f.call(null), g.call(null))
      };
      var G__9604__1 = function(x) {
        return cljs.core.vector.call(null, f.call(null, x), g.call(null, x))
      };
      var G__9604__2 = function(x, y) {
        return cljs.core.vector.call(null, f.call(null, x, y), g.call(null, x, y))
      };
      var G__9604__3 = function(x, y, z) {
        return cljs.core.vector.call(null, f.call(null, x, y, z), g.call(null, x, y, z))
      };
      var G__9604__4 = function() {
        var G__9605__delegate = function(x, y, z, args) {
          return cljs.core.vector.call(null, cljs.core.apply.call(null, f, x, y, z, args), cljs.core.apply.call(null, g, x, y, z, args))
        };
        var G__9605 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__9605__delegate.call(this, x, y, z, args)
        };
        G__9605.cljs$lang$maxFixedArity = 3;
        G__9605.cljs$lang$applyTo = function(arglist__9606) {
          var x = cljs.core.first(arglist__9606);
          var y = cljs.core.first(cljs.core.next(arglist__9606));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9606)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9606)));
          return G__9605__delegate(x, y, z, args)
        };
        G__9605.cljs$lang$arity$variadic = G__9605__delegate;
        return G__9605
      }();
      G__9604 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return G__9604__0.call(this);
          case 1:
            return G__9604__1.call(this, x);
          case 2:
            return G__9604__2.call(this, x, y);
          case 3:
            return G__9604__3.call(this, x, y, z);
          default:
            return G__9604__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
        }
        throw"Invalid arity: " + arguments.length;
      };
      G__9604.cljs$lang$maxFixedArity = 3;
      G__9604.cljs$lang$applyTo = G__9604__4.cljs$lang$applyTo;
      return G__9604
    }()
  };
  var juxt__3 = function(f, g, h) {
    return function() {
      var G__9607 = null;
      var G__9607__0 = function() {
        return cljs.core.vector.call(null, f.call(null), g.call(null), h.call(null))
      };
      var G__9607__1 = function(x) {
        return cljs.core.vector.call(null, f.call(null, x), g.call(null, x), h.call(null, x))
      };
      var G__9607__2 = function(x, y) {
        return cljs.core.vector.call(null, f.call(null, x, y), g.call(null, x, y), h.call(null, x, y))
      };
      var G__9607__3 = function(x, y, z) {
        return cljs.core.vector.call(null, f.call(null, x, y, z), g.call(null, x, y, z), h.call(null, x, y, z))
      };
      var G__9607__4 = function() {
        var G__9608__delegate = function(x, y, z, args) {
          return cljs.core.vector.call(null, cljs.core.apply.call(null, f, x, y, z, args), cljs.core.apply.call(null, g, x, y, z, args), cljs.core.apply.call(null, h, x, y, z, args))
        };
        var G__9608 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__9608__delegate.call(this, x, y, z, args)
        };
        G__9608.cljs$lang$maxFixedArity = 3;
        G__9608.cljs$lang$applyTo = function(arglist__9609) {
          var x = cljs.core.first(arglist__9609);
          var y = cljs.core.first(cljs.core.next(arglist__9609));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9609)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9609)));
          return G__9608__delegate(x, y, z, args)
        };
        G__9608.cljs$lang$arity$variadic = G__9608__delegate;
        return G__9608
      }();
      G__9607 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return G__9607__0.call(this);
          case 1:
            return G__9607__1.call(this, x);
          case 2:
            return G__9607__2.call(this, x, y);
          case 3:
            return G__9607__3.call(this, x, y, z);
          default:
            return G__9607__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
        }
        throw"Invalid arity: " + arguments.length;
      };
      G__9607.cljs$lang$maxFixedArity = 3;
      G__9607.cljs$lang$applyTo = G__9607__4.cljs$lang$applyTo;
      return G__9607
    }()
  };
  var juxt__4 = function() {
    var G__9610__delegate = function(f, g, h, fs) {
      var fs__9600 = cljs.core.list_STAR_.call(null, f, g, h, fs);
      return function() {
        var G__9611 = null;
        var G__9611__0 = function() {
          return cljs.core.reduce.call(null, function(p1__9581_SHARP_, p2__9582_SHARP_) {
            return cljs.core.conj.call(null, p1__9581_SHARP_, p2__9582_SHARP_.call(null))
          }, cljs.core.PersistentVector.EMPTY, fs__9600)
        };
        var G__9611__1 = function(x) {
          return cljs.core.reduce.call(null, function(p1__9583_SHARP_, p2__9584_SHARP_) {
            return cljs.core.conj.call(null, p1__9583_SHARP_, p2__9584_SHARP_.call(null, x))
          }, cljs.core.PersistentVector.EMPTY, fs__9600)
        };
        var G__9611__2 = function(x, y) {
          return cljs.core.reduce.call(null, function(p1__9585_SHARP_, p2__9586_SHARP_) {
            return cljs.core.conj.call(null, p1__9585_SHARP_, p2__9586_SHARP_.call(null, x, y))
          }, cljs.core.PersistentVector.EMPTY, fs__9600)
        };
        var G__9611__3 = function(x, y, z) {
          return cljs.core.reduce.call(null, function(p1__9587_SHARP_, p2__9588_SHARP_) {
            return cljs.core.conj.call(null, p1__9587_SHARP_, p2__9588_SHARP_.call(null, x, y, z))
          }, cljs.core.PersistentVector.EMPTY, fs__9600)
        };
        var G__9611__4 = function() {
          var G__9612__delegate = function(x, y, z, args) {
            return cljs.core.reduce.call(null, function(p1__9589_SHARP_, p2__9590_SHARP_) {
              return cljs.core.conj.call(null, p1__9589_SHARP_, cljs.core.apply.call(null, p2__9590_SHARP_, x, y, z, args))
            }, cljs.core.PersistentVector.EMPTY, fs__9600)
          };
          var G__9612 = function(x, y, z, var_args) {
            var args = null;
            if(goog.isDef(var_args)) {
              args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
            }
            return G__9612__delegate.call(this, x, y, z, args)
          };
          G__9612.cljs$lang$maxFixedArity = 3;
          G__9612.cljs$lang$applyTo = function(arglist__9613) {
            var x = cljs.core.first(arglist__9613);
            var y = cljs.core.first(cljs.core.next(arglist__9613));
            var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9613)));
            var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9613)));
            return G__9612__delegate(x, y, z, args)
          };
          G__9612.cljs$lang$arity$variadic = G__9612__delegate;
          return G__9612
        }();
        G__9611 = function(x, y, z, var_args) {
          var args = var_args;
          switch(arguments.length) {
            case 0:
              return G__9611__0.call(this);
            case 1:
              return G__9611__1.call(this, x);
            case 2:
              return G__9611__2.call(this, x, y);
            case 3:
              return G__9611__3.call(this, x, y, z);
            default:
              return G__9611__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
          }
          throw"Invalid arity: " + arguments.length;
        };
        G__9611.cljs$lang$maxFixedArity = 3;
        G__9611.cljs$lang$applyTo = G__9611__4.cljs$lang$applyTo;
        return G__9611
      }()
    };
    var G__9610 = function(f, g, h, var_args) {
      var fs = null;
      if(goog.isDef(var_args)) {
        fs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
      }
      return G__9610__delegate.call(this, f, g, h, fs)
    };
    G__9610.cljs$lang$maxFixedArity = 3;
    G__9610.cljs$lang$applyTo = function(arglist__9614) {
      var f = cljs.core.first(arglist__9614);
      var g = cljs.core.first(cljs.core.next(arglist__9614));
      var h = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9614)));
      var fs = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9614)));
      return G__9610__delegate(f, g, h, fs)
    };
    G__9610.cljs$lang$arity$variadic = G__9610__delegate;
    return G__9610
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
        var G__9617 = cljs.core.next.call(null, coll);
        coll = G__9617;
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
        var and__3822__auto____9616 = cljs.core.seq.call(null, coll);
        if(and__3822__auto____9616) {
          return n > 0
        }else {
          return and__3822__auto____9616
        }
      }())) {
        var G__9618 = n - 1;
        var G__9619 = cljs.core.next.call(null, coll);
        n = G__9618;
        coll = G__9619;
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
  var matches__9621 = re.exec(s);
  if(cljs.core._EQ_.call(null, cljs.core.first.call(null, matches__9621), s)) {
    if(cljs.core.count.call(null, matches__9621) === 1) {
      return cljs.core.first.call(null, matches__9621)
    }else {
      return cljs.core.vec.call(null, matches__9621)
    }
  }else {
    return null
  }
};
cljs.core.re_find = function re_find(re, s) {
  var matches__9623 = re.exec(s);
  if(matches__9623 == null) {
    return null
  }else {
    if(cljs.core.count.call(null, matches__9623) === 1) {
      return cljs.core.first.call(null, matches__9623)
    }else {
      return cljs.core.vec.call(null, matches__9623)
    }
  }
};
cljs.core.re_seq = function re_seq(re, s) {
  var match_data__9628 = cljs.core.re_find.call(null, re, s);
  var match_idx__9629 = s.search(re);
  var match_str__9630 = cljs.core.coll_QMARK_.call(null, match_data__9628) ? cljs.core.first.call(null, match_data__9628) : match_data__9628;
  var post_match__9631 = cljs.core.subs.call(null, s, match_idx__9629 + cljs.core.count.call(null, match_str__9630));
  if(cljs.core.truth_(match_data__9628)) {
    return new cljs.core.LazySeq(null, false, function() {
      return cljs.core.cons.call(null, match_data__9628, re_seq.call(null, re, post_match__9631))
    }, null)
  }else {
    return null
  }
};
cljs.core.re_pattern = function re_pattern(s) {
  var vec__9638__9639 = cljs.core.re_find.call(null, /^(?:\(\?([idmsux]*)\))?(.*)/, s);
  var ___9640 = cljs.core.nth.call(null, vec__9638__9639, 0, null);
  var flags__9641 = cljs.core.nth.call(null, vec__9638__9639, 1, null);
  var pattern__9642 = cljs.core.nth.call(null, vec__9638__9639, 2, null);
  return new RegExp(pattern__9642, flags__9641)
};
cljs.core.pr_sequential = function pr_sequential(print_one, begin, sep, end, opts, coll) {
  return cljs.core.concat.call(null, cljs.core.PersistentVector.fromArray([begin], true), cljs.core.flatten1.call(null, cljs.core.interpose.call(null, cljs.core.PersistentVector.fromArray([sep], true), cljs.core.map.call(null, function(p1__9632_SHARP_) {
    return print_one.call(null, p1__9632_SHARP_, opts)
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
          var and__3822__auto____9652 = cljs.core._lookup.call(null, opts, "\ufdd0'meta", null);
          if(cljs.core.truth_(and__3822__auto____9652)) {
            var and__3822__auto____9656 = function() {
              var G__9653__9654 = obj;
              if(G__9653__9654) {
                if(function() {
                  var or__3824__auto____9655 = G__9653__9654.cljs$lang$protocol_mask$partition0$ & 131072;
                  if(or__3824__auto____9655) {
                    return or__3824__auto____9655
                  }else {
                    return G__9653__9654.cljs$core$IMeta$
                  }
                }()) {
                  return true
                }else {
                  if(!G__9653__9654.cljs$lang$protocol_mask$partition0$) {
                    return cljs.core.type_satisfies_.call(null, cljs.core.IMeta, G__9653__9654)
                  }else {
                    return false
                  }
                }
              }else {
                return cljs.core.type_satisfies_.call(null, cljs.core.IMeta, G__9653__9654)
              }
            }();
            if(cljs.core.truth_(and__3822__auto____9656)) {
              return cljs.core.meta.call(null, obj)
            }else {
              return and__3822__auto____9656
            }
          }else {
            return and__3822__auto____9652
          }
        }()) ? cljs.core.concat.call(null, cljs.core.PersistentVector.fromArray(["^"], true), pr_seq.call(null, cljs.core.meta.call(null, obj), opts), cljs.core.PersistentVector.fromArray([" "], true)) : null, function() {
          var and__3822__auto____9657 = !(obj == null);
          if(and__3822__auto____9657) {
            return obj.cljs$lang$type
          }else {
            return and__3822__auto____9657
          }
        }() ? obj.cljs$lang$ctorPrSeq(obj) : function() {
          var G__9658__9659 = obj;
          if(G__9658__9659) {
            if(function() {
              var or__3824__auto____9660 = G__9658__9659.cljs$lang$protocol_mask$partition0$ & 536870912;
              if(or__3824__auto____9660) {
                return or__3824__auto____9660
              }else {
                return G__9658__9659.cljs$core$IPrintable$
              }
            }()) {
              return true
            }else {
              if(!G__9658__9659.cljs$lang$protocol_mask$partition0$) {
                return cljs.core.type_satisfies_.call(null, cljs.core.IPrintable, G__9658__9659)
              }else {
                return false
              }
            }
          }else {
            return cljs.core.type_satisfies_.call(null, cljs.core.IPrintable, G__9658__9659)
          }
        }() ? cljs.core._pr_seq.call(null, obj, opts) : cljs.core.truth_(cljs.core.regexp_QMARK_.call(null, obj)) ? cljs.core.list.call(null, '#"', obj.source, '"') : "\ufdd0'else" ? cljs.core.list.call(null, "#<", [cljs.core.str(obj)].join(""), ">") : null)
      }else {
        return null
      }
    }
  }
};
cljs.core.pr_sb = function pr_sb(objs, opts) {
  var sb__9680 = new goog.string.StringBuffer;
  var G__9681__9682 = cljs.core.seq.call(null, cljs.core.pr_seq.call(null, cljs.core.first.call(null, objs), opts));
  if(G__9681__9682) {
    var string__9683 = cljs.core.first.call(null, G__9681__9682);
    var G__9681__9684 = G__9681__9682;
    while(true) {
      sb__9680.append(string__9683);
      var temp__3974__auto____9685 = cljs.core.next.call(null, G__9681__9684);
      if(temp__3974__auto____9685) {
        var G__9681__9686 = temp__3974__auto____9685;
        var G__9699 = cljs.core.first.call(null, G__9681__9686);
        var G__9700 = G__9681__9686;
        string__9683 = G__9699;
        G__9681__9684 = G__9700;
        continue
      }else {
      }
      break
    }
  }else {
  }
  var G__9687__9688 = cljs.core.seq.call(null, cljs.core.next.call(null, objs));
  if(G__9687__9688) {
    var obj__9689 = cljs.core.first.call(null, G__9687__9688);
    var G__9687__9690 = G__9687__9688;
    while(true) {
      sb__9680.append(" ");
      var G__9691__9692 = cljs.core.seq.call(null, cljs.core.pr_seq.call(null, obj__9689, opts));
      if(G__9691__9692) {
        var string__9693 = cljs.core.first.call(null, G__9691__9692);
        var G__9691__9694 = G__9691__9692;
        while(true) {
          sb__9680.append(string__9693);
          var temp__3974__auto____9695 = cljs.core.next.call(null, G__9691__9694);
          if(temp__3974__auto____9695) {
            var G__9691__9696 = temp__3974__auto____9695;
            var G__9701 = cljs.core.first.call(null, G__9691__9696);
            var G__9702 = G__9691__9696;
            string__9693 = G__9701;
            G__9691__9694 = G__9702;
            continue
          }else {
          }
          break
        }
      }else {
      }
      var temp__3974__auto____9697 = cljs.core.next.call(null, G__9687__9690);
      if(temp__3974__auto____9697) {
        var G__9687__9698 = temp__3974__auto____9697;
        var G__9703 = cljs.core.first.call(null, G__9687__9698);
        var G__9704 = G__9687__9698;
        obj__9689 = G__9703;
        G__9687__9690 = G__9704;
        continue
      }else {
      }
      break
    }
  }else {
  }
  return sb__9680
};
cljs.core.pr_str_with_opts = function pr_str_with_opts(objs, opts) {
  return[cljs.core.str(cljs.core.pr_sb.call(null, objs, opts))].join("")
};
cljs.core.prn_str_with_opts = function prn_str_with_opts(objs, opts) {
  var sb__9706 = cljs.core.pr_sb.call(null, objs, opts);
  sb__9706.append("\n");
  return[cljs.core.str(sb__9706)].join("")
};
cljs.core.pr_with_opts = function pr_with_opts(objs, opts) {
  var G__9725__9726 = cljs.core.seq.call(null, cljs.core.pr_seq.call(null, cljs.core.first.call(null, objs), opts));
  if(G__9725__9726) {
    var string__9727 = cljs.core.first.call(null, G__9725__9726);
    var G__9725__9728 = G__9725__9726;
    while(true) {
      cljs.core.string_print.call(null, string__9727);
      var temp__3974__auto____9729 = cljs.core.next.call(null, G__9725__9728);
      if(temp__3974__auto____9729) {
        var G__9725__9730 = temp__3974__auto____9729;
        var G__9743 = cljs.core.first.call(null, G__9725__9730);
        var G__9744 = G__9725__9730;
        string__9727 = G__9743;
        G__9725__9728 = G__9744;
        continue
      }else {
      }
      break
    }
  }else {
  }
  var G__9731__9732 = cljs.core.seq.call(null, cljs.core.next.call(null, objs));
  if(G__9731__9732) {
    var obj__9733 = cljs.core.first.call(null, G__9731__9732);
    var G__9731__9734 = G__9731__9732;
    while(true) {
      cljs.core.string_print.call(null, " ");
      var G__9735__9736 = cljs.core.seq.call(null, cljs.core.pr_seq.call(null, obj__9733, opts));
      if(G__9735__9736) {
        var string__9737 = cljs.core.first.call(null, G__9735__9736);
        var G__9735__9738 = G__9735__9736;
        while(true) {
          cljs.core.string_print.call(null, string__9737);
          var temp__3974__auto____9739 = cljs.core.next.call(null, G__9735__9738);
          if(temp__3974__auto____9739) {
            var G__9735__9740 = temp__3974__auto____9739;
            var G__9745 = cljs.core.first.call(null, G__9735__9740);
            var G__9746 = G__9735__9740;
            string__9737 = G__9745;
            G__9735__9738 = G__9746;
            continue
          }else {
          }
          break
        }
      }else {
      }
      var temp__3974__auto____9741 = cljs.core.next.call(null, G__9731__9734);
      if(temp__3974__auto____9741) {
        var G__9731__9742 = temp__3974__auto____9741;
        var G__9747 = cljs.core.first.call(null, G__9731__9742);
        var G__9748 = G__9731__9742;
        obj__9733 = G__9747;
        G__9731__9734 = G__9748;
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
  pr_str.cljs$lang$applyTo = function(arglist__9749) {
    var objs = cljs.core.seq(arglist__9749);
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
  prn_str.cljs$lang$applyTo = function(arglist__9750) {
    var objs = cljs.core.seq(arglist__9750);
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
  pr.cljs$lang$applyTo = function(arglist__9751) {
    var objs = cljs.core.seq(arglist__9751);
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
  cljs_core_print.cljs$lang$applyTo = function(arglist__9752) {
    var objs = cljs.core.seq(arglist__9752);
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
  print_str.cljs$lang$applyTo = function(arglist__9753) {
    var objs = cljs.core.seq(arglist__9753);
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
  println.cljs$lang$applyTo = function(arglist__9754) {
    var objs = cljs.core.seq(arglist__9754);
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
  println_str.cljs$lang$applyTo = function(arglist__9755) {
    var objs = cljs.core.seq(arglist__9755);
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
  prn.cljs$lang$applyTo = function(arglist__9756) {
    var objs = cljs.core.seq(arglist__9756);
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
  printf.cljs$lang$applyTo = function(arglist__9757) {
    var fmt = cljs.core.first(arglist__9757);
    var args = cljs.core.rest(arglist__9757);
    return printf__delegate(fmt, args)
  };
  printf.cljs$lang$arity$variadic = printf__delegate;
  return printf
}();
cljs.core.HashMap.prototype.cljs$core$IPrintable$ = true;
cljs.core.HashMap.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  var pr_pair__9758 = function(keyval) {
    return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "", " ", "", opts, keyval)
  };
  return cljs.core.pr_sequential.call(null, pr_pair__9758, "{", ", ", "}", opts, coll)
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
  var pr_pair__9759 = function(keyval) {
    return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "", " ", "", opts, keyval)
  };
  return cljs.core.pr_sequential.call(null, pr_pair__9759, "{", ", ", "}", opts, coll)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentArrayMap.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  var pr_pair__9760 = function(keyval) {
    return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "", " ", "", opts, keyval)
  };
  return cljs.core.pr_sequential.call(null, pr_pair__9760, "{", ", ", "}", opts, coll)
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
      var temp__3974__auto____9761 = cljs.core.namespace.call(null, obj);
      if(cljs.core.truth_(temp__3974__auto____9761)) {
        var nspc__9762 = temp__3974__auto____9761;
        return[cljs.core.str(nspc__9762), cljs.core.str("/")].join("")
      }else {
        return null
      }
    }()), cljs.core.str(cljs.core.name.call(null, obj))].join(""))
  }else {
    if(cljs.core.symbol_QMARK_.call(null, obj)) {
      return cljs.core.list.call(null, [cljs.core.str(function() {
        var temp__3974__auto____9763 = cljs.core.namespace.call(null, obj);
        if(cljs.core.truth_(temp__3974__auto____9763)) {
          var nspc__9764 = temp__3974__auto____9763;
          return[cljs.core.str(nspc__9764), cljs.core.str("/")].join("")
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
  var pr_pair__9765 = function(keyval) {
    return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "", " ", "", opts, keyval)
  };
  return cljs.core.pr_sequential.call(null, pr_pair__9765, "{", ", ", "}", opts, coll)
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
  var normalize__9767 = function(n, len) {
    var ns__9766 = [cljs.core.str(n)].join("");
    while(true) {
      if(cljs.core.count.call(null, ns__9766) < len) {
        var G__9769 = [cljs.core.str("0"), cljs.core.str(ns__9766)].join("");
        ns__9766 = G__9769;
        continue
      }else {
        return ns__9766
      }
      break
    }
  };
  return cljs.core.list.call(null, [cljs.core.str('#inst "'), cljs.core.str(d.getUTCFullYear()), cljs.core.str("-"), cljs.core.str(normalize__9767.call(null, d.getUTCMonth() + 1, 2)), cljs.core.str("-"), cljs.core.str(normalize__9767.call(null, d.getUTCDate(), 2)), cljs.core.str("T"), cljs.core.str(normalize__9767.call(null, d.getUTCHours(), 2)), cljs.core.str(":"), cljs.core.str(normalize__9767.call(null, d.getUTCMinutes(), 2)), cljs.core.str(":"), cljs.core.str(normalize__9767.call(null, d.getUTCSeconds(), 
  2)), cljs.core.str("."), cljs.core.str(normalize__9767.call(null, d.getUTCMilliseconds(), 3)), cljs.core.str("-"), cljs.core.str('00:00"')].join(""))
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
  var pr_pair__9768 = function(keyval) {
    return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "", " ", "", opts, keyval)
  };
  return cljs.core.pr_sequential.call(null, pr_pair__9768, "{", ", ", "}", opts, coll)
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
cljs.core.Atom.cljs$lang$ctorPrSeq = function(this__2322__auto__) {
  return cljs.core.list.call(null, "cljs.core/Atom")
};
cljs.core.Atom.prototype.cljs$core$IHash$_hash$arity$1 = function(this$) {
  var this__9770 = this;
  return goog.getUid(this$)
};
cljs.core.Atom.prototype.cljs$core$IWatchable$_notify_watches$arity$3 = function(this$, oldval, newval) {
  var this__9771 = this;
  var G__9772__9773 = cljs.core.seq.call(null, this__9771.watches);
  if(G__9772__9773) {
    var G__9775__9777 = cljs.core.first.call(null, G__9772__9773);
    var vec__9776__9778 = G__9775__9777;
    var key__9779 = cljs.core.nth.call(null, vec__9776__9778, 0, null);
    var f__9780 = cljs.core.nth.call(null, vec__9776__9778, 1, null);
    var G__9772__9781 = G__9772__9773;
    var G__9775__9782 = G__9775__9777;
    var G__9772__9783 = G__9772__9781;
    while(true) {
      var vec__9784__9785 = G__9775__9782;
      var key__9786 = cljs.core.nth.call(null, vec__9784__9785, 0, null);
      var f__9787 = cljs.core.nth.call(null, vec__9784__9785, 1, null);
      var G__9772__9788 = G__9772__9783;
      f__9787.call(null, key__9786, this$, oldval, newval);
      var temp__3974__auto____9789 = cljs.core.next.call(null, G__9772__9788);
      if(temp__3974__auto____9789) {
        var G__9772__9790 = temp__3974__auto____9789;
        var G__9797 = cljs.core.first.call(null, G__9772__9790);
        var G__9798 = G__9772__9790;
        G__9775__9782 = G__9797;
        G__9772__9783 = G__9798;
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
  var this__9791 = this;
  return this$.watches = cljs.core.assoc.call(null, this__9791.watches, key, f)
};
cljs.core.Atom.prototype.cljs$core$IWatchable$_remove_watch$arity$2 = function(this$, key) {
  var this__9792 = this;
  return this$.watches = cljs.core.dissoc.call(null, this__9792.watches, key)
};
cljs.core.Atom.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(a, opts) {
  var this__9793 = this;
  return cljs.core.concat.call(null, cljs.core.PersistentVector.fromArray(["#<Atom: "], true), cljs.core._pr_seq.call(null, this__9793.state, opts), ">")
};
cljs.core.Atom.prototype.cljs$core$IMeta$_meta$arity$1 = function(_) {
  var this__9794 = this;
  return this__9794.meta
};
cljs.core.Atom.prototype.cljs$core$IDeref$_deref$arity$1 = function(_) {
  var this__9795 = this;
  return this__9795.state
};
cljs.core.Atom.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(o, other) {
  var this__9796 = this;
  return o === other
};
cljs.core.Atom;
cljs.core.atom = function() {
  var atom = null;
  var atom__1 = function(x) {
    return new cljs.core.Atom(x, null, null, null)
  };
  var atom__2 = function() {
    var G__9810__delegate = function(x, p__9799) {
      var map__9805__9806 = p__9799;
      var map__9805__9807 = cljs.core.seq_QMARK_.call(null, map__9805__9806) ? cljs.core.apply.call(null, cljs.core.hash_map, map__9805__9806) : map__9805__9806;
      var validator__9808 = cljs.core._lookup.call(null, map__9805__9807, "\ufdd0'validator", null);
      var meta__9809 = cljs.core._lookup.call(null, map__9805__9807, "\ufdd0'meta", null);
      return new cljs.core.Atom(x, meta__9809, validator__9808, null)
    };
    var G__9810 = function(x, var_args) {
      var p__9799 = null;
      if(goog.isDef(var_args)) {
        p__9799 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
      }
      return G__9810__delegate.call(this, x, p__9799)
    };
    G__9810.cljs$lang$maxFixedArity = 1;
    G__9810.cljs$lang$applyTo = function(arglist__9811) {
      var x = cljs.core.first(arglist__9811);
      var p__9799 = cljs.core.rest(arglist__9811);
      return G__9810__delegate(x, p__9799)
    };
    G__9810.cljs$lang$arity$variadic = G__9810__delegate;
    return G__9810
  }();
  atom = function(x, var_args) {
    var p__9799 = var_args;
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
  var temp__3974__auto____9815 = a.validator;
  if(cljs.core.truth_(temp__3974__auto____9815)) {
    var validate__9816 = temp__3974__auto____9815;
    if(cljs.core.truth_(validate__9816.call(null, new_value))) {
    }else {
      throw new Error([cljs.core.str("Assert failed: "), cljs.core.str("Validator rejected reference state"), cljs.core.str("\n"), cljs.core.str(cljs.core.pr_str.call(null, cljs.core.with_meta(cljs.core.list("\ufdd1'validate", "\ufdd1'new-value"), cljs.core.hash_map("\ufdd0'line", 6440))))].join(""));
    }
  }else {
  }
  var old_value__9817 = a.state;
  a.state = new_value;
  cljs.core._notify_watches.call(null, a, old_value__9817, new_value);
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
    var G__9818__delegate = function(a, f, x, y, z, more) {
      return cljs.core.reset_BANG_.call(null, a, cljs.core.apply.call(null, f, a.state, x, y, z, more))
    };
    var G__9818 = function(a, f, x, y, z, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 5), 0)
      }
      return G__9818__delegate.call(this, a, f, x, y, z, more)
    };
    G__9818.cljs$lang$maxFixedArity = 5;
    G__9818.cljs$lang$applyTo = function(arglist__9819) {
      var a = cljs.core.first(arglist__9819);
      var f = cljs.core.first(cljs.core.next(arglist__9819));
      var x = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9819)));
      var y = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__9819))));
      var z = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__9819)))));
      var more = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__9819)))));
      return G__9818__delegate(a, f, x, y, z, more)
    };
    G__9818.cljs$lang$arity$variadic = G__9818__delegate;
    return G__9818
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
  alter_meta_BANG_.cljs$lang$applyTo = function(arglist__9820) {
    var iref = cljs.core.first(arglist__9820);
    var f = cljs.core.first(cljs.core.next(arglist__9820));
    var args = cljs.core.rest(cljs.core.next(arglist__9820));
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
cljs.core.Delay.cljs$lang$ctorPrSeq = function(this__2322__auto__) {
  return cljs.core.list.call(null, "cljs.core/Delay")
};
cljs.core.Delay.prototype.cljs$core$IPending$_realized_QMARK_$arity$1 = function(d) {
  var this__9821 = this;
  return(new cljs.core.Keyword("\ufdd0'done")).call(null, cljs.core.deref.call(null, this__9821.state))
};
cljs.core.Delay.prototype.cljs$core$IDeref$_deref$arity$1 = function(_) {
  var this__9822 = this;
  return(new cljs.core.Keyword("\ufdd0'value")).call(null, cljs.core.swap_BANG_.call(null, this__9822.state, function(p__9823) {
    var map__9824__9825 = p__9823;
    var map__9824__9826 = cljs.core.seq_QMARK_.call(null, map__9824__9825) ? cljs.core.apply.call(null, cljs.core.hash_map, map__9824__9825) : map__9824__9825;
    var curr_state__9827 = map__9824__9826;
    var done__9828 = cljs.core._lookup.call(null, map__9824__9826, "\ufdd0'done", null);
    if(cljs.core.truth_(done__9828)) {
      return curr_state__9827
    }else {
      return cljs.core.ObjMap.fromObject(["\ufdd0'done", "\ufdd0'value"], {"\ufdd0'done":true, "\ufdd0'value":this__9822.f.call(null)})
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
    var map__9849__9850 = options;
    var map__9849__9851 = cljs.core.seq_QMARK_.call(null, map__9849__9850) ? cljs.core.apply.call(null, cljs.core.hash_map, map__9849__9850) : map__9849__9850;
    var keywordize_keys__9852 = cljs.core._lookup.call(null, map__9849__9851, "\ufdd0'keywordize-keys", null);
    var keyfn__9853 = cljs.core.truth_(keywordize_keys__9852) ? cljs.core.keyword : cljs.core.str;
    var f__9868 = function thisfn(x) {
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
                var iter__2475__auto____9867 = function iter__9861(s__9862) {
                  return new cljs.core.LazySeq(null, false, function() {
                    var s__9862__9865 = s__9862;
                    while(true) {
                      if(cljs.core.seq.call(null, s__9862__9865)) {
                        var k__9866 = cljs.core.first.call(null, s__9862__9865);
                        return cljs.core.cons.call(null, cljs.core.PersistentVector.fromArray([keyfn__9853.call(null, k__9866), thisfn.call(null, x[k__9866])], true), iter__9861.call(null, cljs.core.rest.call(null, s__9862__9865)))
                      }else {
                        return null
                      }
                      break
                    }
                  }, null)
                };
                return iter__2475__auto____9867.call(null, cljs.core.js_keys.call(null, x))
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
    return f__9868.call(null, x)
  };
  var js__GT_clj = function(x, var_args) {
    var options = null;
    if(goog.isDef(var_args)) {
      options = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
    }
    return js__GT_clj__delegate.call(this, x, options)
  };
  js__GT_clj.cljs$lang$maxFixedArity = 1;
  js__GT_clj.cljs$lang$applyTo = function(arglist__9869) {
    var x = cljs.core.first(arglist__9869);
    var options = cljs.core.rest(arglist__9869);
    return js__GT_clj__delegate(x, options)
  };
  js__GT_clj.cljs$lang$arity$variadic = js__GT_clj__delegate;
  return js__GT_clj
}();
cljs.core.memoize = function memoize(f) {
  var mem__9874 = cljs.core.atom.call(null, cljs.core.ObjMap.EMPTY);
  return function() {
    var G__9878__delegate = function(args) {
      var temp__3971__auto____9875 = cljs.core._lookup.call(null, cljs.core.deref.call(null, mem__9874), args, null);
      if(cljs.core.truth_(temp__3971__auto____9875)) {
        var v__9876 = temp__3971__auto____9875;
        return v__9876
      }else {
        var ret__9877 = cljs.core.apply.call(null, f, args);
        cljs.core.swap_BANG_.call(null, mem__9874, cljs.core.assoc, args, ret__9877);
        return ret__9877
      }
    };
    var G__9878 = function(var_args) {
      var args = null;
      if(goog.isDef(var_args)) {
        args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
      }
      return G__9878__delegate.call(this, args)
    };
    G__9878.cljs$lang$maxFixedArity = 0;
    G__9878.cljs$lang$applyTo = function(arglist__9879) {
      var args = cljs.core.seq(arglist__9879);
      return G__9878__delegate(args)
    };
    G__9878.cljs$lang$arity$variadic = G__9878__delegate;
    return G__9878
  }()
};
cljs.core.trampoline = function() {
  var trampoline = null;
  var trampoline__1 = function(f) {
    while(true) {
      var ret__9881 = f.call(null);
      if(cljs.core.fn_QMARK_.call(null, ret__9881)) {
        var G__9882 = ret__9881;
        f = G__9882;
        continue
      }else {
        return ret__9881
      }
      break
    }
  };
  var trampoline__2 = function() {
    var G__9883__delegate = function(f, args) {
      return trampoline.call(null, function() {
        return cljs.core.apply.call(null, f, args)
      })
    };
    var G__9883 = function(f, var_args) {
      var args = null;
      if(goog.isDef(var_args)) {
        args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
      }
      return G__9883__delegate.call(this, f, args)
    };
    G__9883.cljs$lang$maxFixedArity = 1;
    G__9883.cljs$lang$applyTo = function(arglist__9884) {
      var f = cljs.core.first(arglist__9884);
      var args = cljs.core.rest(arglist__9884);
      return G__9883__delegate(f, args)
    };
    G__9883.cljs$lang$arity$variadic = G__9883__delegate;
    return G__9883
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
    var k__9886 = f.call(null, x);
    return cljs.core.assoc.call(null, ret, k__9886, cljs.core.conj.call(null, cljs.core._lookup.call(null, ret, k__9886, cljs.core.PersistentVector.EMPTY), x))
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
    var or__3824__auto____9895 = cljs.core._EQ_.call(null, child, parent);
    if(or__3824__auto____9895) {
      return or__3824__auto____9895
    }else {
      var or__3824__auto____9896 = cljs.core.contains_QMARK_.call(null, (new cljs.core.Keyword("\ufdd0'ancestors")).call(null, h).call(null, child), parent);
      if(or__3824__auto____9896) {
        return or__3824__auto____9896
      }else {
        var and__3822__auto____9897 = cljs.core.vector_QMARK_.call(null, parent);
        if(and__3822__auto____9897) {
          var and__3822__auto____9898 = cljs.core.vector_QMARK_.call(null, child);
          if(and__3822__auto____9898) {
            var and__3822__auto____9899 = cljs.core.count.call(null, parent) === cljs.core.count.call(null, child);
            if(and__3822__auto____9899) {
              var ret__9900 = true;
              var i__9901 = 0;
              while(true) {
                if(function() {
                  var or__3824__auto____9902 = cljs.core.not.call(null, ret__9900);
                  if(or__3824__auto____9902) {
                    return or__3824__auto____9902
                  }else {
                    return i__9901 === cljs.core.count.call(null, parent)
                  }
                }()) {
                  return ret__9900
                }else {
                  var G__9903 = isa_QMARK_.call(null, h, child.call(null, i__9901), parent.call(null, i__9901));
                  var G__9904 = i__9901 + 1;
                  ret__9900 = G__9903;
                  i__9901 = G__9904;
                  continue
                }
                break
              }
            }else {
              return and__3822__auto____9899
            }
          }else {
            return and__3822__auto____9898
          }
        }else {
          return and__3822__auto____9897
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
    var tp__9913 = (new cljs.core.Keyword("\ufdd0'parents")).call(null, h);
    var td__9914 = (new cljs.core.Keyword("\ufdd0'descendants")).call(null, h);
    var ta__9915 = (new cljs.core.Keyword("\ufdd0'ancestors")).call(null, h);
    var tf__9916 = function(m, source, sources, target, targets) {
      return cljs.core.reduce.call(null, function(ret, k) {
        return cljs.core.assoc.call(null, ret, k, cljs.core.reduce.call(null, cljs.core.conj, cljs.core._lookup.call(null, targets, k, cljs.core.PersistentHashSet.EMPTY), cljs.core.cons.call(null, target, targets.call(null, target))))
      }, m, cljs.core.cons.call(null, source, sources.call(null, source)))
    };
    var or__3824__auto____9917 = cljs.core.contains_QMARK_.call(null, tp__9913.call(null, tag), parent) ? null : function() {
      if(cljs.core.contains_QMARK_.call(null, ta__9915.call(null, tag), parent)) {
        throw new Error([cljs.core.str(tag), cljs.core.str("already has"), cljs.core.str(parent), cljs.core.str("as ancestor")].join(""));
      }else {
      }
      if(cljs.core.contains_QMARK_.call(null, ta__9915.call(null, parent), tag)) {
        throw new Error([cljs.core.str("Cyclic derivation:"), cljs.core.str(parent), cljs.core.str("has"), cljs.core.str(tag), cljs.core.str("as ancestor")].join(""));
      }else {
      }
      return cljs.core.ObjMap.fromObject(["\ufdd0'parents", "\ufdd0'ancestors", "\ufdd0'descendants"], {"\ufdd0'parents":cljs.core.assoc.call(null, (new cljs.core.Keyword("\ufdd0'parents")).call(null, h), tag, cljs.core.conj.call(null, cljs.core._lookup.call(null, tp__9913, tag, cljs.core.PersistentHashSet.EMPTY), parent)), "\ufdd0'ancestors":tf__9916.call(null, (new cljs.core.Keyword("\ufdd0'ancestors")).call(null, h), tag, td__9914, parent, ta__9915), "\ufdd0'descendants":tf__9916.call(null, (new cljs.core.Keyword("\ufdd0'descendants")).call(null, 
      h), parent, ta__9915, tag, td__9914)})
    }();
    if(cljs.core.truth_(or__3824__auto____9917)) {
      return or__3824__auto____9917
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
    var parentMap__9922 = (new cljs.core.Keyword("\ufdd0'parents")).call(null, h);
    var childsParents__9923 = cljs.core.truth_(parentMap__9922.call(null, tag)) ? cljs.core.disj.call(null, parentMap__9922.call(null, tag), parent) : cljs.core.PersistentHashSet.EMPTY;
    var newParents__9924 = cljs.core.truth_(cljs.core.not_empty.call(null, childsParents__9923)) ? cljs.core.assoc.call(null, parentMap__9922, tag, childsParents__9923) : cljs.core.dissoc.call(null, parentMap__9922, tag);
    var deriv_seq__9925 = cljs.core.flatten.call(null, cljs.core.map.call(null, function(p1__9905_SHARP_) {
      return cljs.core.cons.call(null, cljs.core.first.call(null, p1__9905_SHARP_), cljs.core.interpose.call(null, cljs.core.first.call(null, p1__9905_SHARP_), cljs.core.second.call(null, p1__9905_SHARP_)))
    }, cljs.core.seq.call(null, newParents__9924)));
    if(cljs.core.contains_QMARK_.call(null, parentMap__9922.call(null, tag), parent)) {
      return cljs.core.reduce.call(null, function(p1__9906_SHARP_, p2__9907_SHARP_) {
        return cljs.core.apply.call(null, cljs.core.derive, p1__9906_SHARP_, p2__9907_SHARP_)
      }, cljs.core.make_hierarchy.call(null), cljs.core.partition.call(null, 2, deriv_seq__9925))
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
  var xprefs__9933 = cljs.core.deref.call(null, prefer_table).call(null, x);
  var or__3824__auto____9935 = cljs.core.truth_(function() {
    var and__3822__auto____9934 = xprefs__9933;
    if(cljs.core.truth_(and__3822__auto____9934)) {
      return xprefs__9933.call(null, y)
    }else {
      return and__3822__auto____9934
    }
  }()) ? true : null;
  if(cljs.core.truth_(or__3824__auto____9935)) {
    return or__3824__auto____9935
  }else {
    var or__3824__auto____9937 = function() {
      var ps__9936 = cljs.core.parents.call(null, y);
      while(true) {
        if(cljs.core.count.call(null, ps__9936) > 0) {
          if(cljs.core.truth_(prefers_STAR_.call(null, x, cljs.core.first.call(null, ps__9936), prefer_table))) {
          }else {
          }
          var G__9940 = cljs.core.rest.call(null, ps__9936);
          ps__9936 = G__9940;
          continue
        }else {
          return null
        }
        break
      }
    }();
    if(cljs.core.truth_(or__3824__auto____9937)) {
      return or__3824__auto____9937
    }else {
      var or__3824__auto____9939 = function() {
        var ps__9938 = cljs.core.parents.call(null, x);
        while(true) {
          if(cljs.core.count.call(null, ps__9938) > 0) {
            if(cljs.core.truth_(prefers_STAR_.call(null, cljs.core.first.call(null, ps__9938), y, prefer_table))) {
            }else {
            }
            var G__9941 = cljs.core.rest.call(null, ps__9938);
            ps__9938 = G__9941;
            continue
          }else {
            return null
          }
          break
        }
      }();
      if(cljs.core.truth_(or__3824__auto____9939)) {
        return or__3824__auto____9939
      }else {
        return false
      }
    }
  }
};
cljs.core.dominates = function dominates(x, y, prefer_table) {
  var or__3824__auto____9943 = cljs.core.prefers_STAR_.call(null, x, y, prefer_table);
  if(cljs.core.truth_(or__3824__auto____9943)) {
    return or__3824__auto____9943
  }else {
    return cljs.core.isa_QMARK_.call(null, x, y)
  }
};
cljs.core.find_and_cache_best_method = function find_and_cache_best_method(name, dispatch_val, hierarchy, method_table, prefer_table, method_cache, cached_hierarchy) {
  var best_entry__9961 = cljs.core.reduce.call(null, function(be, p__9953) {
    var vec__9954__9955 = p__9953;
    var k__9956 = cljs.core.nth.call(null, vec__9954__9955, 0, null);
    var ___9957 = cljs.core.nth.call(null, vec__9954__9955, 1, null);
    var e__9958 = vec__9954__9955;
    if(cljs.core.isa_QMARK_.call(null, dispatch_val, k__9956)) {
      var be2__9960 = cljs.core.truth_(function() {
        var or__3824__auto____9959 = be == null;
        if(or__3824__auto____9959) {
          return or__3824__auto____9959
        }else {
          return cljs.core.dominates.call(null, k__9956, cljs.core.first.call(null, be), prefer_table)
        }
      }()) ? e__9958 : be;
      if(cljs.core.truth_(cljs.core.dominates.call(null, cljs.core.first.call(null, be2__9960), k__9956, prefer_table))) {
      }else {
        throw new Error([cljs.core.str("Multiple methods in multimethod '"), cljs.core.str(name), cljs.core.str("' match dispatch value: "), cljs.core.str(dispatch_val), cljs.core.str(" -> "), cljs.core.str(k__9956), cljs.core.str(" and "), cljs.core.str(cljs.core.first.call(null, be2__9960)), cljs.core.str(", and neither is preferred")].join(""));
      }
      return be2__9960
    }else {
      return be
    }
  }, null, cljs.core.deref.call(null, method_table));
  if(cljs.core.truth_(best_entry__9961)) {
    if(cljs.core._EQ_.call(null, cljs.core.deref.call(null, cached_hierarchy), cljs.core.deref.call(null, hierarchy))) {
      cljs.core.swap_BANG_.call(null, method_cache, cljs.core.assoc, dispatch_val, cljs.core.second.call(null, best_entry__9961));
      return cljs.core.second.call(null, best_entry__9961)
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
    var and__3822__auto____9966 = mf;
    if(and__3822__auto____9966) {
      return mf.cljs$core$IMultiFn$_reset$arity$1
    }else {
      return and__3822__auto____9966
    }
  }()) {
    return mf.cljs$core$IMultiFn$_reset$arity$1(mf)
  }else {
    var x__2376__auto____9967 = mf == null ? null : mf;
    return function() {
      var or__3824__auto____9968 = cljs.core._reset[goog.typeOf(x__2376__auto____9967)];
      if(or__3824__auto____9968) {
        return or__3824__auto____9968
      }else {
        var or__3824__auto____9969 = cljs.core._reset["_"];
        if(or__3824__auto____9969) {
          return or__3824__auto____9969
        }else {
          throw cljs.core.missing_protocol.call(null, "IMultiFn.-reset", mf);
        }
      }
    }().call(null, mf)
  }
};
cljs.core._add_method = function _add_method(mf, dispatch_val, method) {
  if(function() {
    var and__3822__auto____9974 = mf;
    if(and__3822__auto____9974) {
      return mf.cljs$core$IMultiFn$_add_method$arity$3
    }else {
      return and__3822__auto____9974
    }
  }()) {
    return mf.cljs$core$IMultiFn$_add_method$arity$3(mf, dispatch_val, method)
  }else {
    var x__2376__auto____9975 = mf == null ? null : mf;
    return function() {
      var or__3824__auto____9976 = cljs.core._add_method[goog.typeOf(x__2376__auto____9975)];
      if(or__3824__auto____9976) {
        return or__3824__auto____9976
      }else {
        var or__3824__auto____9977 = cljs.core._add_method["_"];
        if(or__3824__auto____9977) {
          return or__3824__auto____9977
        }else {
          throw cljs.core.missing_protocol.call(null, "IMultiFn.-add-method", mf);
        }
      }
    }().call(null, mf, dispatch_val, method)
  }
};
cljs.core._remove_method = function _remove_method(mf, dispatch_val) {
  if(function() {
    var and__3822__auto____9982 = mf;
    if(and__3822__auto____9982) {
      return mf.cljs$core$IMultiFn$_remove_method$arity$2
    }else {
      return and__3822__auto____9982
    }
  }()) {
    return mf.cljs$core$IMultiFn$_remove_method$arity$2(mf, dispatch_val)
  }else {
    var x__2376__auto____9983 = mf == null ? null : mf;
    return function() {
      var or__3824__auto____9984 = cljs.core._remove_method[goog.typeOf(x__2376__auto____9983)];
      if(or__3824__auto____9984) {
        return or__3824__auto____9984
      }else {
        var or__3824__auto____9985 = cljs.core._remove_method["_"];
        if(or__3824__auto____9985) {
          return or__3824__auto____9985
        }else {
          throw cljs.core.missing_protocol.call(null, "IMultiFn.-remove-method", mf);
        }
      }
    }().call(null, mf, dispatch_val)
  }
};
cljs.core._prefer_method = function _prefer_method(mf, dispatch_val, dispatch_val_y) {
  if(function() {
    var and__3822__auto____9990 = mf;
    if(and__3822__auto____9990) {
      return mf.cljs$core$IMultiFn$_prefer_method$arity$3
    }else {
      return and__3822__auto____9990
    }
  }()) {
    return mf.cljs$core$IMultiFn$_prefer_method$arity$3(mf, dispatch_val, dispatch_val_y)
  }else {
    var x__2376__auto____9991 = mf == null ? null : mf;
    return function() {
      var or__3824__auto____9992 = cljs.core._prefer_method[goog.typeOf(x__2376__auto____9991)];
      if(or__3824__auto____9992) {
        return or__3824__auto____9992
      }else {
        var or__3824__auto____9993 = cljs.core._prefer_method["_"];
        if(or__3824__auto____9993) {
          return or__3824__auto____9993
        }else {
          throw cljs.core.missing_protocol.call(null, "IMultiFn.-prefer-method", mf);
        }
      }
    }().call(null, mf, dispatch_val, dispatch_val_y)
  }
};
cljs.core._get_method = function _get_method(mf, dispatch_val) {
  if(function() {
    var and__3822__auto____9998 = mf;
    if(and__3822__auto____9998) {
      return mf.cljs$core$IMultiFn$_get_method$arity$2
    }else {
      return and__3822__auto____9998
    }
  }()) {
    return mf.cljs$core$IMultiFn$_get_method$arity$2(mf, dispatch_val)
  }else {
    var x__2376__auto____9999 = mf == null ? null : mf;
    return function() {
      var or__3824__auto____10000 = cljs.core._get_method[goog.typeOf(x__2376__auto____9999)];
      if(or__3824__auto____10000) {
        return or__3824__auto____10000
      }else {
        var or__3824__auto____10001 = cljs.core._get_method["_"];
        if(or__3824__auto____10001) {
          return or__3824__auto____10001
        }else {
          throw cljs.core.missing_protocol.call(null, "IMultiFn.-get-method", mf);
        }
      }
    }().call(null, mf, dispatch_val)
  }
};
cljs.core._methods = function _methods(mf) {
  if(function() {
    var and__3822__auto____10006 = mf;
    if(and__3822__auto____10006) {
      return mf.cljs$core$IMultiFn$_methods$arity$1
    }else {
      return and__3822__auto____10006
    }
  }()) {
    return mf.cljs$core$IMultiFn$_methods$arity$1(mf)
  }else {
    var x__2376__auto____10007 = mf == null ? null : mf;
    return function() {
      var or__3824__auto____10008 = cljs.core._methods[goog.typeOf(x__2376__auto____10007)];
      if(or__3824__auto____10008) {
        return or__3824__auto____10008
      }else {
        var or__3824__auto____10009 = cljs.core._methods["_"];
        if(or__3824__auto____10009) {
          return or__3824__auto____10009
        }else {
          throw cljs.core.missing_protocol.call(null, "IMultiFn.-methods", mf);
        }
      }
    }().call(null, mf)
  }
};
cljs.core._prefers = function _prefers(mf) {
  if(function() {
    var and__3822__auto____10014 = mf;
    if(and__3822__auto____10014) {
      return mf.cljs$core$IMultiFn$_prefers$arity$1
    }else {
      return and__3822__auto____10014
    }
  }()) {
    return mf.cljs$core$IMultiFn$_prefers$arity$1(mf)
  }else {
    var x__2376__auto____10015 = mf == null ? null : mf;
    return function() {
      var or__3824__auto____10016 = cljs.core._prefers[goog.typeOf(x__2376__auto____10015)];
      if(or__3824__auto____10016) {
        return or__3824__auto____10016
      }else {
        var or__3824__auto____10017 = cljs.core._prefers["_"];
        if(or__3824__auto____10017) {
          return or__3824__auto____10017
        }else {
          throw cljs.core.missing_protocol.call(null, "IMultiFn.-prefers", mf);
        }
      }
    }().call(null, mf)
  }
};
cljs.core._dispatch = function _dispatch(mf, args) {
  if(function() {
    var and__3822__auto____10022 = mf;
    if(and__3822__auto____10022) {
      return mf.cljs$core$IMultiFn$_dispatch$arity$2
    }else {
      return and__3822__auto____10022
    }
  }()) {
    return mf.cljs$core$IMultiFn$_dispatch$arity$2(mf, args)
  }else {
    var x__2376__auto____10023 = mf == null ? null : mf;
    return function() {
      var or__3824__auto____10024 = cljs.core._dispatch[goog.typeOf(x__2376__auto____10023)];
      if(or__3824__auto____10024) {
        return or__3824__auto____10024
      }else {
        var or__3824__auto____10025 = cljs.core._dispatch["_"];
        if(or__3824__auto____10025) {
          return or__3824__auto____10025
        }else {
          throw cljs.core.missing_protocol.call(null, "IMultiFn.-dispatch", mf);
        }
      }
    }().call(null, mf, args)
  }
};
cljs.core.do_dispatch = function do_dispatch(mf, dispatch_fn, args) {
  var dispatch_val__10028 = cljs.core.apply.call(null, dispatch_fn, args);
  var target_fn__10029 = cljs.core._get_method.call(null, mf, dispatch_val__10028);
  if(cljs.core.truth_(target_fn__10029)) {
  }else {
    throw new Error([cljs.core.str("No method in multimethod '"), cljs.core.str(cljs.core.name), cljs.core.str("' for dispatch value: "), cljs.core.str(dispatch_val__10028)].join(""));
  }
  return cljs.core.apply.call(null, target_fn__10029, args)
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
cljs.core.MultiFn.cljs$lang$ctorPrSeq = function(this__2322__auto__) {
  return cljs.core.list.call(null, "cljs.core/MultiFn")
};
cljs.core.MultiFn.prototype.cljs$core$IHash$_hash$arity$1 = function(this$) {
  var this__10030 = this;
  return goog.getUid(this$)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_reset$arity$1 = function(mf) {
  var this__10031 = this;
  cljs.core.swap_BANG_.call(null, this__10031.method_table, function(mf) {
    return cljs.core.ObjMap.EMPTY
  });
  cljs.core.swap_BANG_.call(null, this__10031.method_cache, function(mf) {
    return cljs.core.ObjMap.EMPTY
  });
  cljs.core.swap_BANG_.call(null, this__10031.prefer_table, function(mf) {
    return cljs.core.ObjMap.EMPTY
  });
  cljs.core.swap_BANG_.call(null, this__10031.cached_hierarchy, function(mf) {
    return null
  });
  return mf
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_add_method$arity$3 = function(mf, dispatch_val, method) {
  var this__10032 = this;
  cljs.core.swap_BANG_.call(null, this__10032.method_table, cljs.core.assoc, dispatch_val, method);
  cljs.core.reset_cache.call(null, this__10032.method_cache, this__10032.method_table, this__10032.cached_hierarchy, this__10032.hierarchy);
  return mf
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_remove_method$arity$2 = function(mf, dispatch_val) {
  var this__10033 = this;
  cljs.core.swap_BANG_.call(null, this__10033.method_table, cljs.core.dissoc, dispatch_val);
  cljs.core.reset_cache.call(null, this__10033.method_cache, this__10033.method_table, this__10033.cached_hierarchy, this__10033.hierarchy);
  return mf
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_get_method$arity$2 = function(mf, dispatch_val) {
  var this__10034 = this;
  if(cljs.core._EQ_.call(null, cljs.core.deref.call(null, this__10034.cached_hierarchy), cljs.core.deref.call(null, this__10034.hierarchy))) {
  }else {
    cljs.core.reset_cache.call(null, this__10034.method_cache, this__10034.method_table, this__10034.cached_hierarchy, this__10034.hierarchy)
  }
  var temp__3971__auto____10035 = cljs.core.deref.call(null, this__10034.method_cache).call(null, dispatch_val);
  if(cljs.core.truth_(temp__3971__auto____10035)) {
    var target_fn__10036 = temp__3971__auto____10035;
    return target_fn__10036
  }else {
    var temp__3971__auto____10037 = cljs.core.find_and_cache_best_method.call(null, this__10034.name, dispatch_val, this__10034.hierarchy, this__10034.method_table, this__10034.prefer_table, this__10034.method_cache, this__10034.cached_hierarchy);
    if(cljs.core.truth_(temp__3971__auto____10037)) {
      var target_fn__10038 = temp__3971__auto____10037;
      return target_fn__10038
    }else {
      return cljs.core.deref.call(null, this__10034.method_table).call(null, this__10034.default_dispatch_val)
    }
  }
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_prefer_method$arity$3 = function(mf, dispatch_val_x, dispatch_val_y) {
  var this__10039 = this;
  if(cljs.core.truth_(cljs.core.prefers_STAR_.call(null, dispatch_val_x, dispatch_val_y, this__10039.prefer_table))) {
    throw new Error([cljs.core.str("Preference conflict in multimethod '"), cljs.core.str(this__10039.name), cljs.core.str("': "), cljs.core.str(dispatch_val_y), cljs.core.str(" is already preferred to "), cljs.core.str(dispatch_val_x)].join(""));
  }else {
  }
  cljs.core.swap_BANG_.call(null, this__10039.prefer_table, function(old) {
    return cljs.core.assoc.call(null, old, dispatch_val_x, cljs.core.conj.call(null, cljs.core._lookup.call(null, old, dispatch_val_x, cljs.core.PersistentHashSet.EMPTY), dispatch_val_y))
  });
  return cljs.core.reset_cache.call(null, this__10039.method_cache, this__10039.method_table, this__10039.cached_hierarchy, this__10039.hierarchy)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_methods$arity$1 = function(mf) {
  var this__10040 = this;
  return cljs.core.deref.call(null, this__10040.method_table)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_prefers$arity$1 = function(mf) {
  var this__10041 = this;
  return cljs.core.deref.call(null, this__10041.prefer_table)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_dispatch$arity$2 = function(mf, args) {
  var this__10042 = this;
  return cljs.core.do_dispatch.call(null, mf, this__10042.dispatch_fn, args)
};
cljs.core.MultiFn;
cljs.core.MultiFn.prototype.call = function() {
  var G__10044__delegate = function(_, args) {
    var self__10043 = this;
    return cljs.core._dispatch.call(null, self__10043, args)
  };
  var G__10044 = function(_, var_args) {
    var args = null;
    if(goog.isDef(var_args)) {
      args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
    }
    return G__10044__delegate.call(this, _, args)
  };
  G__10044.cljs$lang$maxFixedArity = 1;
  G__10044.cljs$lang$applyTo = function(arglist__10045) {
    var _ = cljs.core.first(arglist__10045);
    var args = cljs.core.rest(arglist__10045);
    return G__10044__delegate(_, args)
  };
  G__10044.cljs$lang$arity$variadic = G__10044__delegate;
  return G__10044
}();
cljs.core.MultiFn.prototype.apply = function(_, args) {
  var self__10046 = this;
  return cljs.core._dispatch.call(null, self__10046, args)
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
cljs.core.UUID.cljs$lang$ctorPrSeq = function(this__2322__auto__) {
  return cljs.core.list.call(null, "cljs.core/UUID")
};
cljs.core.UUID.prototype.cljs$core$IHash$_hash$arity$1 = function(this$) {
  var this__10047 = this;
  return goog.string.hashCode(cljs.core.pr_str.call(null, this$))
};
cljs.core.UUID.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(_10049, _) {
  var this__10048 = this;
  return cljs.core.list.call(null, [cljs.core.str('#uuid "'), cljs.core.str(this__10048.uuid), cljs.core.str('"')].join(""))
};
cljs.core.UUID.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(_, other) {
  var this__10050 = this;
  var and__3822__auto____10051 = cljs.core.instance_QMARK_.call(null, cljs.core.UUID, other);
  if(and__3822__auto____10051) {
    return this__10050.uuid === other.uuid
  }else {
    return and__3822__auto____10051
  }
};
cljs.core.UUID.prototype.toString = function() {
  var this__10052 = this;
  var this__10053 = this;
  return cljs.core.pr_str.call(null, this__10053)
};
cljs.core.UUID;
goog.provide("actjs.main");
goog.require("cljs.core");
actjs.main.Response = {};
actjs.main.listen = function listen(this$, msg) {
  if(function() {
    var and__3822__auto____6111 = this$;
    if(and__3822__auto____6111) {
      return this$.actjs$main$Response$listen$arity$2
    }else {
      return and__3822__auto____6111
    }
  }()) {
    return this$.actjs$main$Response$listen$arity$2(this$, msg)
  }else {
    var x__2369__auto____6112 = this$ == null ? null : this$;
    return function() {
      var or__3824__auto____6113 = actjs.main.listen[goog.typeOf(x__2369__auto____6112)];
      if(or__3824__auto____6113) {
        return or__3824__auto____6113
      }else {
        var or__3824__auto____6114 = actjs.main.listen["_"];
        if(or__3824__auto____6114) {
          return or__3824__auto____6114
        }else {
          throw cljs.core.missing_protocol.call(null, "Response.listen", this$);
        }
      }
    }().call(null, this$, msg)
  }
};
actjs.main.spawn = function spawn(actor) {
  return cljs.core.atom.call(null, cljs.core.ObjMap.fromObject(["\ufdd0'mail", "\ufdd0'not_matched", "\ufdd0'actor"], {"\ufdd0'mail":cljs.core.List.EMPTY, "\ufdd0'not_matched":cljs.core.List.EMPTY, "\ufdd0'actor":actor}))
};
actjs.main.extract_next_exec = function extract_next_exec(p__6115) {
  var map__6121__6122 = p__6115;
  var map__6121__6123 = cljs.core.seq_QMARK_.call(null, map__6121__6122) ? cljs.core.apply.call(null, cljs.core.hash_map, map__6121__6122) : map__6121__6122;
  var actor_data__6124 = map__6121__6123;
  var keys__6125 = cljs.core._lookup.call(null, map__6121__6123, cljs.core.PersistentVector.fromArray([actjs.main.mail, actjs.main.next_mail], true), null);
  if(cljs.core.next) {
    return cljs.core.dissoc.call(null, actor_data__6124, "\ufdd0'dispatch")
  }else {
    return cljs.core.assoc.call(null, actor_data__6124, "\ufdd0'dispatch", true, "\ufdd0'mail", cljs.core.butlast.call(null, actjs.main.mail), "\ufdd0'next-mail", cljs.core.last.call(null, actjs.main.mail))
  }
};
actjs.main.consume_next_execution = function consume_next_execution(actor_data) {
  return cljs.core.dissoc.call(null, actor_data, "\ufdd0'next-mail")
};
actjs.main.become = function become(actor_data, new_actor, not_mathed, mail) {
  return cljs.core.assoc.call(null, actor_data, "\ufdd0'actor", new_actor, "\ufdd0'not-matched", cljs.core.List.EMPTY, "\ufdd0'mail", cljs.core.concat.call(null, actjs.main.not_matched, mail))
};
actjs.main.become_BANG_ = function become_BANG_(actor_atom, new_actor) {
  return cljs.core.swap_BANG_.call(null, actor_atom, actjs.main.become, new_actor)
};
actjs.main.push_not_matched = function push_not_matched(p__6126, msg) {
  var map__6132__6133 = p__6126;
  var map__6132__6134 = cljs.core.seq_QMARK_.call(null, map__6132__6133) ? cljs.core.apply.call(null, cljs.core.hash_map, map__6132__6133) : map__6132__6133;
  var actor_data__6135 = map__6132__6134;
  var keys__6136 = cljs.core._lookup.call(null, map__6132__6134, cljs.core.PersistentVector.fromArray([actjs.main.not_matched], true), null);
  return cljs.core.assoc.call(null, actor_data__6135, "\ufdd0'not-matched", cljs.core.conj.call(null, actjs.main.not_matched, msg))
};
actjs.main.push_not_matched_BANG_ = function push_not_matched_BANG_(actor_atom, msg) {
  return cljs.core.swap_BANG_.call(null, actjs.main.push_not_matched, actor_atom, msg)
};
actjs.main.run_actor = function run_actor(msg, actor_atom) {
  return function() {
    var result__6146 = actjs.main.listen.call(null, actjs.main.actor, msg);
    var map__6145__6147 = actjs.main.consume_next_execution.call(null);
    var map__6145__6148 = cljs.core.seq_QMARK_.call(null, map__6145__6147) ? cljs.core.apply.call(null, cljs.core.hash_map, map__6145__6147) : map__6145__6147;
    var keys__6149 = cljs.core._lookup.call(null, map__6145__6148, cljs.core.PersistentVector.fromArray([actjs.main.actor], true), null);
    if(result__6146 == null) {
      actjs.main.become_BANG_.call(null, actor_atom, null)
    }else {
      if(function() {
        var G__6150__6151 = result__6146;
        if(G__6150__6151) {
          if(cljs.core.truth_(function() {
            var or__3824__auto____6152 = null;
            if(cljs.core.truth_(or__3824__auto____6152)) {
              return or__3824__auto____6152
            }else {
              return G__6150__6151.actjs$main$Response$
            }
          }())) {
            return true
          }else {
            if(!G__6150__6151.cljs$lang$protocol_mask$partition$) {
              return cljs.core.type_satisfies_.call(null, actjs.main.Response, G__6150__6151)
            }else {
              return false
            }
          }
        }else {
          return cljs.core.type_satisfies_.call(null, actjs.main.Response, G__6150__6151)
        }
      }()) {
        actjs.main.become_BANG_.call(null, actor_atom, result__6146)
      }else {
        if(cljs.core._EQ_.call(null, "\ufdd0'not-matched", result__6146)) {
          actjs.main.push_not_matched_BANG_.call(null, actor_atom, msg)
        }else {
        }
      }
    }
    if(cljs.core.truth_(result__6146)) {
      return actjs.main.dispatch_execution.call(null, actor_atom)
    }else {
      return null
    }
  }
};
actjs.main.dispatch_execution = function dispatch_execution(actor_atom) {
  var map__6158__6159 = cljs.core.swap_BANG_.call(null, actjs.main.extract_next_exec, actor_atom);
  var map__6158__6160 = cljs.core.seq_QMARK_.call(null, map__6158__6159) ? cljs.core.apply.call(null, cljs.core.hash_map, map__6158__6159) : map__6158__6159;
  var keys__6161 = cljs.core._lookup.call(null, map__6158__6160, cljs.core.PersistentVector.fromArray([actjs.main.next_mail, actjs.main.dispatch], true), null);
  if(cljs.core.truth_(function() {
    var and__3822__auto____6162 = cljs.core.next;
    if(and__3822__auto____6162) {
      return actjs.main.dispatch
    }else {
      return and__3822__auto____6162
    }
  }())) {
    return setTimeout(actjs.main.run_actor.call(null, actjs.main.next_mail, actor_atom), 1)
  }else {
    return null
  }
};
actjs.main.push_mail = function push_mail(p__6163, msg) {
  var map__6169__6170 = p__6163;
  var map__6169__6171 = cljs.core.seq_QMARK_.call(null, map__6169__6170) ? cljs.core.apply.call(null, cljs.core.hash_map, map__6169__6170) : map__6169__6170;
  var actor_data__6172 = map__6169__6171;
  var keys__6173 = cljs.core._lookup.call(null, map__6169__6171, cljs.core.PersistentVector.fromArray([actjs.main.mail], true), null);
  return cljs.core.assoc.call(null, actor_data__6172, "\ufdd0'mail", cljs.core.conj.call(null, actjs.main.mail, msg))
};
actjs.main.send_BANG_ = function send_BANG_(msg, actor_atom) {
  cljs.core.swap_BANG_.call(null, actor_atom, actjs.main.push_mail, msg);
  return actjs.main.dispatch_execution.call(null, actor_atom)
};
actjs.main.Echoer = function(counter) {
  this.counter = counter
};
actjs.main.Echoer.cljs$lang$type = true;
actjs.main.Echoer.cljs$lang$ctorPrSeq = function(this__2316__auto__) {
  return cljs.core.list.call(null, "actjs.main/Echoer")
};
actjs.main.Echoer;
[cljs.core.str(new actjs.main.Echoer(1))].join("");
