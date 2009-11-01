// Copyright (c) 2009 Robby Russell, Planet Argon
//
// GoogleAnalyticsProxy is freely distributable under the terms of an MIT-style license.
//    details: http://www.opensource.org/licenses/mit-license.php
//ˇ
// GoogleAnalyticsProxy is a lightweight proxy that will allow you to
// test event tracking and custom page view settings in your application
// when google analytics isn't loaded. Details will be logged to the
// JavaScript console via console.log(). When google analytics is loaded,
// it will send the triggered actions to google as you'd expect.
//
// Primary goal for this project was to allow me to test event tracking in
// a development environment without throwing JavaScript errors because
// google analytics isn't loaded.

// Example usage:
//
//   gap = new GoogleAnalyticsProxy('UA-123456-1');
//
//   gap._trackPageview();
//   gap._trackPageview('/contact/thanks');
//   gap._trackEvent('Video', 'Play', 'Homepage video');
//   gap._trackEvent('Video', 'Pause', 'Homepage video');
//   gap._trackEvent('Button', 'Click', 'Call to action X');
//
// Google Analytics API
//  http://code.google.com/apis/analytics/docs/gaJS/gaJSApi.html

var GoogleAnalyticsProxy = Class.create();

GoogleAnalyticsProxy.prototype = {
  initialize: function() {
    this.googleAnalyticsEnabled = this.checkForGoogleAnalytics();
  },

  checkForGoogleAnalytics: function() {
    return(typeof(window['_gat']) == "undefined" ? false : true);
  },

  log: function(message) {
    console.log('[GoogleAnalyticsProxy] ' + message + ' was triggered');
  },

  // Proxy for pageTracker, which is defined in the provided Google Analytics snippet
  pageTracker: function(value) {
    return window['pageTracker'];
  },

  // _trackPageview()
  // API: http://code.google.com/apis/analytics/docs/gaJS/gaJSApiBasicConfiguration.html#_gat.GA_Tracker_._trackPageview
  _trackPageview: function(opt_pageURL) {
    if (this.googleAnalyticsEnabled) {
      this.pageTracker()._trackPageview(opt_pageURL);
    } else {
      this.log('_pageTracker(' + opt_pageURL + ')');
    }
  },

  // _trackEvent()
  //  API: http://code.google.com/apis/analytics/docs/gaJS/gaJSApiEventTracking.html#_gat.GA_EventTracker_._trackEvent
  _trackEvent: function(category, action, opt_label, opt_value) {
    if (this.googleAnalyticsEnabled) {
      this.pageTracker()._trackEvent(category, action, opt_label, opt_value);
    } else {
      this.log('_trackEvent(' + category + ', ' + action + ', ' + opt_label + ', ' + opt_value + ')');
    }
  }
};