/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 743:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const core = __nccwpck_require__(852);
const github = __nccwpck_require__(92);

async function run() {
  try {
    const context = github.context;
    // Get authenticated GitHub client (Ocktokit): https://github.com/actions/toolkit/tree/master/packages/github#usage
    const octokit = github.getOctokit(process.env.GITHUB_TOKEN);

    // Get owner and repo from context of payload that triggered the action
    const { owner, repo } = context.repo;

    // Get the tag name from the triggered action
    const tagName = context.ref;

    // This removes the 'refs/tags' portion of the string, i.e. from 'refs/tags/v1.10.15' to 'v1.10.15'
    const tag = tagName.replace("refs/tags/", "");

    // Get a release from the tag name
    // API Documentation: https://developer.github.com/v3/repos/releases/#create-a-release
    // Octokit Documentation: https://octokit.github.io/rest.js/#octokit-routes-repos-create-release
    const getReleaseResponse = await octokit.rest.repos.getReleaseByTag({
      owner,
      repo,
      tag
    });

    // Get the outputs for the created release from the response
    const {
      data: { id: releaseId, html_url: htmlUrl, upload_url: uploadUrl, name: name, body: body, draft: draft, prerelease: prerelease, author: author }
    } = getReleaseResponse;

    console.log(`Got release info: '${releaseId}', '${htmlUrl}', '${uploadUrl}', '${name}', '${draft}', '${prerelease}', '${body}', '${author}'`);

    // Set the output variables for use by other actions: https://github.com/actions/toolkit/tree/master/packages/core#inputsoutputs
    core.setOutput("id", releaseId.toString());
    core.setOutput("html_url", htmlUrl);
    core.setOutput("upload_url", uploadUrl);
    core.setOutput("tag_name", tag);
    core.setOutput("name", name);
    core.setOutput("body", body);
    core.setOutput("draft", draft);
    core.setOutput("prerelease", prerelease);
    core.setOutput("author", author);
  } catch (error) {
    console.log(error);
    core.setFailed(error.message);
  }
}

module.exports = run;


/***/ }),

/***/ 852:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 92:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
const run = __nccwpck_require__(743);

if (require.main === require.cache[eval('__filename')]) {
  run();
}

module.exports = __webpack_exports__;
/******/ })()
;