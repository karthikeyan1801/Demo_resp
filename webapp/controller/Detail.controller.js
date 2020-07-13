sap.ui.define([
	"sap/ui/core/mvc/Controller"

], function (Controller) {
	"use strict";

	return Controller.extend("zcrud.zcrud.controller.Detail", {

onInit: function () {
  var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
  oRouter.getRoute("Detail").attachMatched(this._onRouteMatched, this);
},
_onRouteMatched : function (oEvent) {
  var oArgs, oView;
  oArgs = oEvent.getParameter("arguments");
  oView = this.getView();
  oView.bindElement({
    path : "/scarEntitySet('" + oArgs.Carrid + "')",
    events : {
      dataRequested: function () {
        oView.setBusy(true);
      },
      dataReceived: function () {
        oView.setBusy(false);
      }
    }
  });
},
handleNavButtonPress : function (evt) {
  var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
  oRouter.navTo("");
}
	});

});