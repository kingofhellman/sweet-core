"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replaceTemplate = exports.processTemplate = undefined;

var _immutable = require("immutable");

var _ramdaFantasy = require("ramda-fantasy");

var _ramda = require("ramda");

var _ramda2 = _interopRequireDefault(_ramda);

var _syntax = require("./syntax");

var _syntax2 = _interopRequireDefault(_syntax);

var _errors = require("./errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isDolar_964 = s_975 => s_975 && typeof s_975.match === "function" && s_975.match("identifier") && s_975.val() === "$";
const isDelimiter_965 = s_976 => s_976 && typeof s_976.match === "function" && s_976.match("delimiter");
const isBraces_966 = s_977 => s_977 && typeof s_977.match === "function" && s_977.match("braces");
const isParens_967 = s_978 => s_978 && typeof s_978.match === "function" && s_978.match("parens");
const isBrackets_968 = s_979 => s_979 && typeof s_979.match === "function" && s_979.match("brackets");
const insertIntoDelimiter_969 = _ramda2.default.cond([[isBraces_966, (s_980, r_981) => _syntax2.default.from("braces", r_981, s_980)], [isParens_967, (s_982, r_983) => _syntax2.default.from("parens", r_983, s_982)], [isBrackets_968, (s_984, r_985) => _syntax2.default.from("brackets", r_985, s_984)]]);
const process_970 = (acc_986, s_987) => {
  if (isBraces_966(s_987) && isDolar_964(acc_986.template.last())) {
    return { template: acc_986.template.push(_syntax2.default.from("braces", _immutable.List.of(_syntax2.default.from("number", acc_986.interp.size)), s_987)), interp: acc_986.interp.push(s_987.inner()) };
  } else if (isDelimiter_965(s_987)) {
    let innerResult = processTemplate_973(s_987.inner(), acc_986.interp);
    return { template: acc_986.template.push(insertIntoDelimiter_969(s_987, innerResult.template)), interp: innerResult.interp };
  } else {
    return { template: acc_986.template.push(s_987), interp: acc_986.interp };
  }
};
function cloneLineNumber_971(to_988, from_989) {
  if (from_989 && to_988) {
    if (typeof to_988.setLineNumber === "function") {
      return to_988.setLineNumber(from_989.lineNumber());
    } else if (_immutable.List.isList(to_988)) {
      return to_988.map(x_990 => cloneLineNumber_971(x_990, from_989));
    }
  }
  return to_988;
}
const replace_972 = (acc_991, s_992) => {
  let last_993 = acc_991.template.get(-1);
  let beforeLast_994 = acc_991.template.get(-2);
  if (isBraces_966(s_992) && isDolar_964(last_993)) {
    let index = s_992.inner().first().val();
    (0, _errors.assert)(acc_991.rep.size > index, "unknown replacement value");
    let replacement = cloneLineNumber_971(acc_991.rep.get(index), beforeLast_994);
    return { template: acc_991.template.pop().concat(replacement), rep: acc_991.rep };
  } else if (isDelimiter_965(s_992)) {
    let innerResult = replaceTemplate_974(s_992.inner(), acc_991.rep);
    return { template: acc_991.template.push(insertIntoDelimiter_969(s_992, innerResult)), rep: acc_991.rep };
  } else {
    return { template: acc_991.template.push(s_992), rep: acc_991.rep };
  }
};
function processTemplate_973(temp_995) {
  let interp_996 = arguments.length <= 1 || arguments[1] === undefined ? (0, _immutable.List)() : arguments[1];

  return temp_995.reduce(process_970, { template: (0, _immutable.List)(), interp: interp_996 });
}
function replaceTemplate_974(temp_997, rep_998) {
  return temp_997.reduce(replace_972, { template: (0, _immutable.List)(), rep: rep_998 }).template;
}
exports.processTemplate = processTemplate_973;
exports.replaceTemplate = replaceTemplate_974;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3N3ZWV0L3RlbXBsYXRlLXByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0EsTUFBTSxjQUFjLFNBQVMsU0FBUyxPQUFPLE1BQU0sS0FBYixLQUF1QixVQUFoQyxJQUE4QyxNQUFNLEtBQU4sQ0FBWSxZQUFaLENBQTlDLElBQTJFLE1BQU0sR0FBTixPQUFnQixHQUF4SDtBQUNBLE1BQU0sa0JBQWtCLFNBQVMsU0FBUyxPQUFPLE1BQU0sS0FBYixLQUF1QixVQUFoQyxJQUE4QyxNQUFNLEtBQU4sQ0FBWSxXQUFaLENBQS9FO0FBQ0EsTUFBTSxlQUFlLFNBQVMsU0FBUyxPQUFPLE1BQU0sS0FBYixLQUF1QixVQUFoQyxJQUE4QyxNQUFNLEtBQU4sQ0FBWSxRQUFaLENBQTVFO0FBQ0EsTUFBTSxlQUFlLFNBQVMsU0FBUyxPQUFPLE1BQU0sS0FBYixLQUF1QixVQUFoQyxJQUE4QyxNQUFNLEtBQU4sQ0FBWSxRQUFaLENBQTVFO0FBQ0EsTUFBTSxpQkFBaUIsU0FBUyxTQUFTLE9BQU8sTUFBTSxLQUFiLEtBQXVCLFVBQWhDLElBQThDLE1BQU0sS0FBTixDQUFZLFVBQVosQ0FBOUU7QUFDQSxNQUFNLDBCQUEwQixnQkFBRSxJQUFGLENBQU8sQ0FBQyxDQUFDLFlBQUQsRUFBZSxDQUFDLEtBQUQsRUFBUSxLQUFSLEtBQWtCLGlCQUFPLElBQVAsQ0FBWSxRQUFaLEVBQXNCLEtBQXRCLEVBQTZCLEtBQTdCLENBQWpDLENBQUQsRUFBd0UsQ0FBQyxZQUFELEVBQWUsQ0FBQyxLQUFELEVBQVEsS0FBUixLQUFrQixpQkFBTyxJQUFQLENBQVksUUFBWixFQUFzQixLQUF0QixFQUE2QixLQUE3QixDQUFqQyxDQUF4RSxFQUErSSxDQUFDLGNBQUQsRUFBaUIsQ0FBQyxLQUFELEVBQVEsS0FBUixLQUFrQixpQkFBTyxJQUFQLENBQVksVUFBWixFQUF3QixLQUF4QixFQUEr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QWpCLENBQXNCLEtBQXRCLENBQVgsRUFBeUMsS0FBSyxRQUFRLEdBQXRELEVBQVA7QUFDRDtBQUNGLENBZEQ7QUFlQSxTQUFTLG1CQUFULENBQTZCLFFBQTdCLEVBQTREO0FBQUEsTUFBckIsVUFBcUIseURBQVIsc0JBQVE7O0FBQzFELFNBQU8sU0FBUyxNQUFULENBQWdCLFdBQWhCLEVBQTZCLEVBQUMsVUFBVSxzQkFBWCxFQUFtQixRQUFRLFVBQTNCLEVBQTdCLENBQVA7QUFDRDtBQUNELFNBQVMsbUJBQVQsQ0FBNkIsUUFBN0IsRUFBdUMsT0FBdkMsRUFBZ0Q7QUFDOUMsU0FBTyxTQUFTLE1BQVQsQ0FBZ0IsV0FBaEIsRUFBNkIsRUFBQyxVQUFVLHNCQUFYLEVBQW1CLEtBQUssT0FBeEIsRUFBN0IsRUFBK0QsUUFBdEU7QUFDRDtRQUM4QixlLEdBQXZCLG1CO1FBQ3VCLGUsR0FBdkIsbUIiLCJmaWxlIjoidGVtcGxhdGUtcHJvY2Vzc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtMaXN0fSBmcm9tIFwiaW1tdXRhYmxlXCI7XG5pbXBvcnQge01heWJlfSBmcm9tIFwicmFtZGEtZmFudGFzeVwiO1xuaW1wb3J0IF8gZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgU3ludGF4IGZyb20gXCIuL3N5bnRheFwiO1xuaW1wb3J0IHthc3NlcnR9IGZyb20gXCIuL2Vycm9yc1wiO1xuY29uc3QgaXNEb2xhcl85NjQgPSBzXzk3NSA9PiBzXzk3NSAmJiB0eXBlb2Ygc185NzUubWF0Y2ggPT09IFwiZnVuY3Rpb25cIiAmJiBzXzk3NS5tYXRjaChcImlkZW50aWZpZXJcIikgJiYgc185NzUudmFsKCkgPT09IFwiJFwiO1xuY29uc3QgaXNEZWxpbWl0ZXJfOTY1ID0gc185NzYgPT4gc185NzYgJiYgdHlwZW9mIHNfOTc2Lm1hdGNoID09PSBcImZ1bmN0aW9uXCIgJiYgc185NzYubWF0Y2goXCJkZWxpbWl0ZXJcIik7XG5jb25zdCBpc0JyYWNlc185NjYgPSBzXzk3NyA9PiBzXzk3NyAmJiB0eXBlb2Ygc185NzcubWF0Y2ggPT09IFwiZnVuY3Rpb25cIiAmJiBzXzk3Ny5tYXRjaChcImJyYWNlc1wiKTtcbmNvbnN0IGlzUGFyZW5zXzk2NyA9IHNfOTc4ID0+IHNfOTc4ICYmIHR5cGVvZiBzXzk3OC5tYXRjaCA9PT0gXCJmdW5jdGlvblwiICYmIHNfOTc4Lm1hdGNoKFwicGFyZW5zXCIpO1xuY29uc3QgaXNCcmFja2V0c185NjggPSBzXzk3OSA9PiBzXzk3OSAmJiB0eXBlb2Ygc185NzkubWF0Y2ggPT09IFwiZnVuY3Rpb25cIiAmJiBzXzk3OS5tYXRjaChcImJyYWNrZXRzXCIpO1xuY29uc3QgaW5zZXJ0SW50b0RlbGltaXRlcl85NjkgPSBfLmNvbmQoW1tpc0JyYWNlc185NjYsIChzXzk4MCwgcl85ODEpID0+IFN5bnRheC5mcm9tKFwiYnJhY2VzXCIsIHJfOTgxLCBzXzk4MCldLCBbaXNQYXJlbnNfOTY3LCAoc185ODIsIHJfOTgzKSA9PiBTeW50YXguZnJvbShcInBhcmVuc1wiLCByXzk4Mywgc185ODIpXSwgW2lzQnJhY2tldHNfOTY4LCAoc185ODQsIHJfOTg1KSA9PiBTeW50YXguZnJvbShcImJyYWNrZXRzXCIsIHJfOTg1LCBzXzk4NCldXSk7XG5jb25zdCBwcm9jZXNzXzk3MCA9IChhY2NfOTg2LCBzXzk4NykgPT4ge1xuICBpZiAoaXNCcmFjZXNfOTY2KHNfOTg3KSAmJiBpc0RvbGFyXzk2NChhY2NfOTg2LnRlbXBsYXRlLmxhc3QoKSkpIHtcbiAgICByZXR1cm4ge3RlbXBsYXRlOiBhY2NfOTg2LnRlbXBsYXRlLnB1c2goU3ludGF4LmZyb20oXCJicmFjZXNcIiwgTGlzdC5vZihTeW50YXguZnJvbShcIm51bWJlclwiLCBhY2NfOTg2LmludGVycC5zaXplKSksIHNfOTg3KSksIGludGVycDogYWNjXzk4Ni5pbnRlcnAucHVzaChzXzk4Ny5pbm5lcigpKX07XG4gIH0gZWxzZSBpZiAoaXNEZWxpbWl0ZXJfOTY1KHNfOTg3KSkge1xuICAgIGxldCBpbm5lclJlc3VsdCA9IHByb2Nlc3NUZW1wbGF0ZV85NzMoc185ODcuaW5uZXIoKSwgYWNjXzk4Ni5pbnRlcnApO1xuICAgIHJldHVybiB7dGVtcGxhdGU6IGFjY185ODYudGVtcGxhdGUucHVzaChpbnNlcnRJbnRvRGVsaW1pdGVyXzk2OShzXzk4NywgaW5uZXJSZXN1bHQudGVtcGxhdGUpKSwgaW50ZXJwOiBpbm5lclJlc3VsdC5pbnRlcnB9O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB7dGVtcGxhdGU6IGFjY185ODYudGVtcGxhdGUucHVzaChzXzk4NyksIGludGVycDogYWNjXzk4Ni5pbnRlcnB9O1xuICB9XG59O1xuZnVuY3Rpb24gY2xvbmVMaW5lTnVtYmVyXzk3MSh0b185ODgsIGZyb21fOTg5KSB7XG4gIGlmIChmcm9tXzk4OSAmJiB0b185ODgpIHtcbiAgICBpZiAodHlwZW9mIHRvXzk4OC5zZXRMaW5lTnVtYmVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHJldHVybiB0b185ODguc2V0TGluZU51bWJlcihmcm9tXzk4OS5saW5lTnVtYmVyKCkpO1xuICAgIH0gZWxzZSBpZiAoTGlzdC5pc0xpc3QodG9fOTg4KSkge1xuICAgICAgcmV0dXJuIHRvXzk4OC5tYXAoeF85OTAgPT4gY2xvbmVMaW5lTnVtYmVyXzk3MSh4Xzk5MCwgZnJvbV85ODkpKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRvXzk4ODtcbn1cbmNvbnN0IHJlcGxhY2VfOTcyID0gKGFjY185OTEsIHNfOTkyKSA9PiB7XG4gIGxldCBsYXN0Xzk5MyA9IGFjY185OTEudGVtcGxhdGUuZ2V0KC0xKTtcbiAgbGV0IGJlZm9yZUxhc3RfOTk0ID0gYWNjXzk5MS50ZW1wbGF0ZS5nZXQoLTIpO1xuICBpZiAoaXNCcmFjZXNfOTY2KHNfOTkyKSAmJiBpc0RvbGFyXzk2NChsYXN0Xzk5MykpIHtcbiAgICBsZXQgaW5kZXggPSBzXzk5Mi5pbm5lcigpLmZpcnN0KCkudmFsKCk7XG4gICAgYXNzZXJ0KGFjY185OTEucmVwLnNpemUgPiBpbmRleCwgXCJ1bmtub3duIHJlcGxhY2VtZW50IHZhbHVlXCIpO1xuICAgIGxldCByZXBsYWNlbWVudCA9IGNsb25lTGluZU51bWJlcl85NzEoYWNjXzk5MS5yZXAuZ2V0KGluZGV4KSwgYmVmb3JlTGFzdF85OTQpO1xuICAgIHJldHVybiB7dGVtcGxhdGU6IGFjY185OTEudGVtcGxhdGUucG9wKCkuY29uY2F0KHJlcGxhY2VtZW50KSwgcmVwOiBhY2NfOTkxLnJlcH07XG4gIH0gZWxzZSBpZiAoaXNEZWxpbWl0ZXJfOTY1KHNfOTkyKSkge1xuICAgIGxldCBpbm5lclJlc3VsdCA9IHJlcGxhY2VUZW1wbGF0ZV85NzQoc185OTIuaW5uZXIoKSwgYWNjXzk5MS5yZXApO1xuICAgIHJldHVybiB7dGVtcGxhdGU6IGFjY185OTEudGVtcGxhdGUucHVzaChpbnNlcnRJbnRvRGVsaW1pdGVyXzk2OShzXzk5MiwgaW5uZXJSZXN1bHQpKSwgcmVwOiBhY2NfOTkxLnJlcH07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHt0ZW1wbGF0ZTogYWNjXzk5MS50ZW1wbGF0ZS5wdXNoKHNfOTkyKSwgcmVwOiBhY2NfOTkxLnJlcH07XG4gIH1cbn07XG5mdW5jdGlvbiBwcm9jZXNzVGVtcGxhdGVfOTczKHRlbXBfOTk1LCBpbnRlcnBfOTk2ID0gTGlzdCgpKSB7XG4gIHJldHVybiB0ZW1wXzk5NS5yZWR1Y2UocHJvY2Vzc185NzAsIHt0ZW1wbGF0ZTogTGlzdCgpLCBpbnRlcnA6IGludGVycF85OTZ9KTtcbn1cbmZ1bmN0aW9uIHJlcGxhY2VUZW1wbGF0ZV85NzQodGVtcF85OTcsIHJlcF85OTgpIHtcbiAgcmV0dXJuIHRlbXBfOTk3LnJlZHVjZShyZXBsYWNlXzk3Miwge3RlbXBsYXRlOiBMaXN0KCksIHJlcDogcmVwXzk5OH0pLnRlbXBsYXRlO1xufVxuZXhwb3J0IHtwcm9jZXNzVGVtcGxhdGVfOTczIGFzIHByb2Nlc3NUZW1wbGF0ZX07XG5leHBvcnQge3JlcGxhY2VUZW1wbGF0ZV85NzQgYXMgcmVwbGFjZVRlbXBsYXRlfSJdfQ==