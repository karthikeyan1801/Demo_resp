sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
		"sap/ui/core/Fragment",
		"sap/ui/model/Filter",
		"sap/ui/model/json/JSONModel",
		"sap/ui/model/FilterOperator",
		"sap/ui/model/odata/v2/ODataModel"
], function (Controller, JSONModel,MessageToast,Fragment,Filter, FilterOperator) {
	"use strict";
	return Controller.extend("zcrud.zcrud.controller.View1", {
		onInit: function () {
// var oJSONModel = new JSONModel();
// this.getView().setModel(oJSONModel, "jsonmodel");
//  var sUrl = "/sap/opu/odata/sap/ZSCARR_SRV/";
// // var sUrl;
// var username = 'mahajanr';
// var password = 'password'; 
// var oModel = new sap.ui.model.odata.ODataModel(sUrl,true,username,password);
//  sap.ui.core.BusyIndicator.show(0);
// oModel.read("/scarEntitySet", {
// success: function (data) {
// // oJSONModel.setData({
// // scarrEntitySet: data.results
// var result = data[0];
//  sap.ui.core.BusyIndicator.hide();
// // });
// }
// }
// );

		},
		ontable: function () {
			var otext = this;
			otext.byId("producttable").setVisible(true);
			otext.byId("List").setVisible(false);
			
		},
		onlist: function () {
			var otext = this;
			otext.byId("List").setVisible(true);
			otext.byId("producttable").setVisible(false);
		},
		onListItemPress: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var selectedCarrId = oEvent.getSource().getBindingContext().getProperty("Carrid");
			oRouter.navTo("Detail", {
				Carrid: selectedCarrId
			});
		},
		onInsert: function () {
			var oCust1 = this.getView().byId("input5").getValue();
			var oCust2 = this.getView().byId("input6").getValue();
			var oCust3 = this.getView().byId("input7").getValue();
			var postData = {};
			postData.Carrid = oCust1;
			postData.Carrname = oCust2;
			postData.Currcode = oCust3;
			var oModel = this.getView().getModel();
			oModel.create("/scarEntitySet", postData, {
				success: function (response) {
					MessageToast.show("Record inserted Successfully");

				},
				error: function (Error) {
					MessageToast.show("Record not inserted successfully  " + oCust1);
				}
			});
		},
		onUpdate: function () {
			var oCust1 = this.getView().byId("input5").getValue();
			var oCust2 = this.getView().byId("input6").getValue();
			var oCust3 = this.getView().byId("input7").getValue();
			var postData = {};
			postData.Carrid = oCust1;
			postData.Carrname = oCust2;
			postData.Currcode = oCust3;
		
				var oModel = this.getView().getModel();
			oModel.update("/scarEntitySet('" + oCust1 + "')", postData, {
				// oModel.update("/scarEntitySet", postData, {
				success: function (odata,response) {
					MessageToast.show("Record Updated Successfully");

				},
				error: function (Error) {
					MessageToast.show("Record not Updated successfully  " + oCust1);
				}
			});
		},
		onDelete: function () {
			var oModel = this.getView().getModel();
			var carrid = this.getView().byId("__input0").getValue();

			// var oContext = this;
			oModel.remove("/scarEntitySet('" + carrid + "')", {
				success: function (oData, response) {

					MessageToast.show("Record Deleted Successfully");

				},
				error: function (oError) {

				}
			});

		},
		onRead: function () {
			var oModel = this.getView().getModel();
			var carrid = this.getView().byId("__input0").getValue();
         //var oUser = sap.ui2.shell.getUser();
			var oContext = this;
			// oModel.read("/scarEntitySet('" + carrid + "')", {
				oModel.read("/das_shipping_pointsSet(guid'005056ba-4c34-1eda-addb-51e612bb85f1')/AppointmentsSet", {
				 //oModel.read("/scarEntitySet", {
			
				success: function (oData, response) {
					var jModel = new sap.ui.model.json.JSONModel();
                  

					jModel.setData(oData);
				
					oContext.getView().setModel(jModel, "fareModel");
				},
				error: function (oError) {

				}
			});

		},
			handleSearch: function(oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("Carrid", FilterOperator.Contains, sValue);
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter([oFilter]);
		},
		
			handleValueHelp: function (oEvent) {
			// var oButton = oEvent.getSource();
			if (!this._oDialog) {
				Fragment.load({
					name: "zcrud.zcrud.view.Dialog",
					controller: this
				}).then(function(oDialog){
					this._oDialog = oDialog;
					this._oDialog.setModel(this.getView().getModel());
					// this._configDialog(oButton);
					this._oDialog.open();
				}.bind(this));
			} else {
				// this._configDialog(oButton);
				this._oDialog.open();
			}
		},
			handleClose: function(oEvent) {
					
			var aContexts = oEvent.getParameter("selectedContexts");
				// MessageToast.show(aContexts);
			if (aContexts && aContexts.length) {
				 aContexts.map(function(oContext) 
				 {
				 	var dialogdata =  oContext.getObject().Carrid;
				 	MessageToast.show(dialogdata);
		
				 return oContext.getObject().Carrid;
				 	// this.byId("input5").setValue("Value");


				}
			
				 
				);
				
		
			
			} else {
				MessageToast.show("No new item was selected.");
			}
			oEvent.getSource().getBinding("items").filter([]);
		}
		
		
		

	});
});