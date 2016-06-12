// ==========================
// git-validate 插件
// https://github.com/nlf/git-validate
// 用于设置 git hooks
// https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks
//
// add script with key "install" in package.json
// "install": "babel-node bin/gitValidate.js"
// ==========================

import gitValidate from 'git-validate'

gitValidate.installHooks('pre-commit')
gitValidate.configureHook('pre-commit', ['lint'])
