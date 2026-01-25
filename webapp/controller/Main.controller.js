sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox", 'sap/ui/model/Filter',
    "sap/ui/model/FilterOperator", "sap/ui/model/json/JSONModel", "sap/ui/core/Fragment", 'sap/ui/model/BindingMode',
    "sap/ui/export/library",
    "sap/ui/export/Spreadsheet",
    "sap/m/PDFViewer"
], (Controller, MessageBox, Filter, FilterOperator, JSONModel, Fragment, BindingMode, x, Spreadsheet,PDFViewer) => {
    "use strict";
    var EdmType = x.EdmType;

    return Controller.extend("zfipayproposal.controller.Main", {
        onInit() {
            this._pdfViewer = new PDFViewer;
            this.getView().addDependent(this._pdfViewer);

            this.getOwnerComponent().getModel("LocalModel").setProperty("/Companycode", "5910");
            this.getOwnerComponent().getModel("LocalModel").refresh();
            
            var otypedtls= [];
            var sval = {
                "value":"Summary View",
                "key":"S"
            };
            otypedtls.push(sval);

             var sval = {
                "value":"Detailed View",
                "key":"D"
            };
            otypedtls.push(sval);
            this.getOwnerComponent().getModel("typedtls").setProperty("/results", otypedtls);
            this.getOwnerComponent().getModel("typedtls").refresh();

        },
        SearchP_DateFunction: function (evt) {
            var sValue = evt.getParameter("value");
            var oFilter = new sap.ui.model.Filter("Datefunction", sap.ui.model.FilterOperator.EQ, sValue);
            evt.getSource().getBinding("items").filter([oFilter]);
        },
        ConfP_DateFunction: function (evt) {
            debugger;
            var oval = evt.getParameter("selectedItem").getProperty("title");
            var sSelecteddesc = evt.getParameter("selectedItem").getProperty("description");
            this.getView().getModel("LocalModel").setProperty("/P_DateFunction", oval);
            this.getView().getModel("LocalModel").refresh(true);
            evt.getSource().getBinding("items").filter([]);
        },

        SearchP_Currency: function (evt) {
            var sValue = evt.getParameter("value");
            var oFilter = new sap.ui.model.Filter("Waers", sap.ui.model.FilterOperator.EQ, sValue);
            evt.getSource().getBinding("items").filter([oFilter]);
        },
        ConfP_Currency: function (evt) {
            debugger;
            var oval = evt.getParameter("selectedItem").getProperty("title");
            var sSelecteddesc = evt.getParameter("selectedItem").getProperty("description");
            this.getView().getModel("LocalModel").setProperty("/Displaycurrency", oval);
            this.getView().getModel("LocalModel").refresh(true);
            evt.getSource().getBinding("items").filter([]);
        },

        SearchP_Currency: function (evt) {
            var sValue = evt.getParameter("value");
            var oFilter = new sap.ui.model.Filter("Waers", sap.ui.model.FilterOperator.EQ, sValue);
            evt.getSource().getBinding("items").filter([oFilter]);
        },
        ConfP_Currency: function (evt) {
            debugger;
            var oval = evt.getParameter("selectedItem").getProperty("title");
            var sSelecteddesc = evt.getParameter("selectedItem").getProperty("description");
            this.getView().getModel("LocalModel").setProperty("/Displaycurrency", oval);
            this.getView().getModel("LocalModel").refresh(true);
            evt.getSource().getBinding("items").filter([]);
        },


        SearchCompanyCode: function (evt) {
            var sValue = evt.getParameter("value");
            var oFilter = new sap.ui.model.Filter("Bukrs", sap.ui.model.FilterOperator.EQ, sValue);
            evt.getSource().getBinding("items").filter([oFilter]);
        },
        ConfCompanyCode: function (evt) {
            debugger;
            var oval = evt.getParameter("selectedItem").getProperty("title");
            var sSelecteddesc = evt.getParameter("selectedItem").getProperty("description");
            this.getView().getModel("LocalModel").setProperty("/Companycode", oval);
            this.getView().getModel("LocalModel").refresh(true);
            evt.getSource().getBinding("items").filter([]);
        },


        SearchSupplier: function (evt) {
            var sValue = evt.getParameter("value");
            var oFilter = new sap.ui.model.Filter("Lifnr", sap.ui.model.FilterOperator.EQ, sValue);
            evt.getSource().getBinding("items").filter([oFilter]);
        },
        ConfSupplier: function (evt) {
            debugger;
            var aContexts = evt.getParameter("selectedContexts");
            if (aContexts && aContexts.length) {
                var oval = aContexts.map(function (oContext) {
                    return oContext.getObject().Lifnr;
                }).join(", ");
                var stype = "/" + this.stype;
                this.getView().getModel("LocalModel").setProperty("/Supplier", oval);
                this.getView().getModel("LocalModel").refresh(true);
            }
            // var oval = evt.getParameter("selectedItem").getProperty("title");
            // var sSelecteddesc = evt.getParameter("selectedItem").getProperty("description");
            // this.getView().getModel("LocalModel").setProperty("/Supplier", oval);
            // this.getView().getModel("LocalModel").refresh(true);
            evt.getSource().getBinding("items").filter([]);
        },


        onOpenKeydate: function (oEvent) {
            this.Keydatef4 = null;
            if (!this.Keydatef4) {
                this.Keydatef4 = sap.ui.xmlfragment("zfipayproposal.fragment.Keydate", this);
                this.getView().addDependent(this.Keydatef4);
            };
            this.Keydatef4.open();
        },
        onOpenCompanyCode: function (oEvent) {
            this.CompanyCodef4 = null;
            if (!this.CompanyCodef4) {
                this.CompanyCodef4 = sap.ui.xmlfragment("zfipayproposal.fragment.CompanyCode", this);
                this.getView().addDependent(this.CompanyCodef4);
            };
            this.CompanyCodef4.open();
        },

        onOpenCurrency: function (oEvent) {
            this.Currencyf4 = null;
            if (!this.Currencyf4) {
                this.Currencyf4 = sap.ui.xmlfragment("zfipayproposal.fragment.Currency", this);
                this.getView().addDependent(this.Currencyf4);
            };
            this.Currencyf4.open();
        },

        onOpenSupplier: function (oEvent) {
            this.Supplierf4 = null;
            if (!this.Supplierf4) {
                this.Supplierf4 = sap.ui.xmlfragment("zfipayproposal.fragment.Supplier", this);
                this.getView().addDependent(this.Supplierf4);
            };
            this.Supplierf4.open();
        },

        
        getOdata: function (surl, smodelname, ofilter, stype) {
            return new Promise((resolve, reject) => {
                if (ofilter === null) {
                    this.showBusy(true);
                    this.getOwnerComponent().getModel().read(surl, {
                        success: function (oData) {
                            this.showBusy(false);
                            if(oData.results === undefined){
                                this.getOwnerComponent().getModel(smodelname).setProperty("/results", oData);
                                resolve(oData);
                            }else{
                                    this.getOwnerComponent().getModel(smodelname).setProperty("/results", oData.results);
                                    resolve(oData.results);
                            }
                            
                        }.bind(this),
                        error: function (oError) {
                            this.showBusy(false);
                            reject();
                        }.bind(this)
                    });
                } else {
                    this.showBusy(true);
                    this.getOwnerComponent().getModel().read(surl, {
                        filters: [ofilter],
                        success: function (oData) {
                            this.showBusy(false);
                            this.getOwnerComponent().getModel(smodelname).setProperty("/results", oData.results);
                            resolve(oData.results);
                        }.bind(this),
                        error: function (oError) {
                            this.showBusy(false);
                            reject();
                        }.bind(this)
                    });
                }
            });
        },

       
        onClearFilterBar: function (oEvent) {
            var oFilterBar = this.getView().byId("fbPreqs");
            oFilterBar.getFilterGroupItems().forEach(function (oItem) {
                var oControl = oItem.getControl();
                switch (oControl.getMetadata().getName()) {
                    case "sap.m.Input": oControl.setValue("");
                        break;
                    case "sap.m.DateRangeSelection": oControl.setDateValue(null);
                        oControl.setSecondDateValue(null);
                        break;
                    case "sap.m.MultiInput": oControl.setValue("");
                        break;
                    case "sap.m.ComboBox": oControl.setSelectedKey("");
                        break;
                    case "sap.m.MultiComboBox": oControl.setSelectedKeys("");
                        break;
                    case "sap.m.Select": oControl.setSelectedKey("");
                        break;
                    case "sap.m.DatePicker": oControl.setDateValue(null);
                        break;
                }
            });
            this.getOwnerComponent().getModel("LocalModel").setProperty("/Companycode", "5910");
            this.getOwnerComponent().getModel("LocalModel").refresh();
        },

         onSearch: function (oEvent) {
            var omodel = this.getOwnerComponent().getModel("LocalModel").getData();
            var sname = '';
            if(omodel.Type === 'D'){
                sname = "Detailed View";
            }
            if(omodel.Type === 'S'){
                sname = "Summary View";
            }
            if(omodel.Type === undefined || omodel.Type === ''){
                MessageBox.error("Please select Type");
            }else if(omodel.Ddate === undefined || omodel.Ddate === ''){
                MessageBox.error("Please select Date");
            }else if(omodel.Laufi === undefined || omodel.Laufi === ''){
                MessageBox.error("Please select Run Identification");
            }else{
               
                var sstring1 = "Laufi='" + omodel.Laufi + "',Laufd='" + this.formatDate(omodel.Ddate) + "'";
                var surlstring = "/ReguhSet(" + sstring1 + ")";
                this.getOdata(surlstring, "test", null).then((res) => {
                    if(res.message === true){
                        var sstring = this.buildFiltersForCustomFields();
                        sstring = "/sap/opu/odata/sap/ZFI_PAYMENT_PROPOSAL_SRV/AttachmentSet(" + sstring + ")/$value"
                        this._pdfViewer.setSource(sstring);
                        this._pdfViewer.setTitle(sname);
                        this._pdfViewer.open();
                    }else{
                        MessageBox.error("No payment proposal data is available for the provided selection.")
                    }
                    
                });
                               
            }
        },

        buildFiltersForCustomFields: function () {
            var oFilterBar = this.getView().byId("fbPreqs");
            var aFilters = [];
            var sstring = '';
            var sSupplier = '',sBukrs ='',Ddate=null,RType='',sLaufi='';
            oFilterBar.getFilterGroupItems().forEach(function (oItem) {
                var oControl = oItem.getControl();
                var sControlType = oControl.getMetadata().getName();

                switch (sControlType) {
                    case "sap.m.Select":
                        var sKey1 = oControl.getSelectedKey();
                        if (sKey1) {
                            aFilters.push(new Filter(oItem.getName(), FilterOperator.EQ, sKey1));
                            RType = sKey1;
                        }
                        break;
                    case "sap.m.MultiComboBox":
                        var oKey = oControl.getSelectedKey();
                        aFilters.push(new Filter(oItem.getName(), FilterOperator.EQ, oKey));
                        break;
                    case "sap.m.Input":
                        var sValue = oControl.getValue();
                        aFilters.push(new Filter(oItem.getName(), FilterOperator.EQ, sValue));
                        if(oItem.getName() === 'Bukrs'){
                            sBukrs = sValue;
                        }
                        if(oItem.getName() === 'Laufi')
                        {
                             sLaufi = sValue;
                        }
                       
                        break;
                    case "sap.m.ComboBox":
                        var sKey = oControl.getSelectedKey();
                        if (sKey) {
                            aFilters.push(new Filter(oItem.getName(), FilterOperator.EQ, sKey));
                        }

                        break;
                    case "sap.m.MultiInput":
                        var ovl = [];
                        var sfilterval = '';
                        if (oControl.getProperty("value") !== '') {
                            var ovl = oControl.getProperty("value");//.split(",");
                            sSupplier = ovl;
                            aFilters.push(new Filter(oControl.mBindingInfos.value.parts[0].path.split("/")[1], FilterOperator.EQ, ovl));
                            // for (var i = 0; i < ovl.length; i++) {
                            //     if (oControl.mBindingInfos.value.parts[0].path.split("/")[1] === 'month') {
                            //         aFilters.push(new Filter("month", FilterOperator.BT, ovl[i].trim().split(" ")[0], ovl[i].trim().split(" ")[1]));
                            //         // aFilters.push(new Filter("year", FilterOperator.EQ, ovl[i].trim().split(" ")[1]));
                            //     }
                            //     else {
                            //         aFilters.push(new Filter(oControl.mBindingInfos.value.parts[0].path.split("/")[1], FilterOperator.EQ, ovl[i].trim()));
                            //     }

                            // }
                        }
                        break;

                    case "sap.m.DateRangeSelection":
                        var oDateFrom = oControl.getDateValue();
                        var oDateTo = oControl.getSecondDateValue();
                        if (oDateFrom !== null && oDateTo !== null) {
                            aFilters.push(new Filter(oItem.getName(), FilterOperator.EQ, this.formatDate(oDateFrom)));
                            aFilters.push(new Filter(oItem.getName(), FilterOperator.EQ, this.formatDate(oDateTo)));
                        }


                        break;
                    case "sap.m.DatePicker":
                            if(oControl.getDateValue() !== null){
                                aFilters.push(new Filter(oItem.getName(), FilterOperator.EQ, this.formatDate(oControl.getDateValue())));
                                Ddate = this.formatDate(oControl.getDateValue()) ;                                
                            }
                            break;
                }
            }.bind(this));
            sstring = "Supplier='" + sSupplier + "',Bukrs='" + sBukrs + "',Ddate='" + Ddate + "',Laufi='" + sLaufi + "',RType='" + RType+ "'";                 
            return sstring;
        },
         formatDate: function (dt) {
			if (dt === undefined || dt === null || dt === "") {
				return;
			}
			var date = new Date(dt),
				month = '' + (dt.getMonth() + 1),
				day = '' + dt.getDate(),
				year = dt.getFullYear();
			if (month.length < 2)
				month = '0' + month;
			if (day.length < 2)
				day = '0' + day;
			return [year, month, day].join('');
		},
        getRouter: function () {
            return this.getOwnerComponent().getRouter()
        },
        getModel: function (e) {
            return this.getView().getModel(e)
        },
        setModel: function (e, t) {
            return this.getView().setModel(e, t)
        },
        showBusy: function (bBusy) {
            if (bBusy) {
                sap.ui.core.BusyIndicator.show(0);
            } else {
                sap.ui.core.BusyIndicator.hide();
            }
        },
        getText: function (sProperty, aArgs) {
            if (!this._oResourceBundle) {
                this._oResourceBundle = this.getModel("i18n").getResourceBundle();
            }
            return this._oResourceBundle.getText(sProperty, aArgs);
        },

        getResourceBundle: function (sText) {
            return this.getOwnerComponent().getModel("i18n").getResourceBundle()
        },

    });
});