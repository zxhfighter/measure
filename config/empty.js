/**
 * @file hot module replacement replacement for production environment
 * @author zengxiaohui(csu.zengxiaohui@gmail.com)
 */

module.exports = {
  NgProbeToken: {},
  HmrState: function() {},
  _createConditionalRootRenderer: function(rootRenderer, extraTokens, coreTokens) {
    return rootRenderer;
  },
  __platform_browser_private__: {}
};
