sap.ui.define([
    "sap/ui/core/UIComponent",
    "zfipayproposal/model/models"
], (UIComponent, models) => {
    "use strict";

    return UIComponent.extend("zfipayproposal.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");
            this.setModel(new sap.ui.model.json.JSONModel(), "LocalModel");
            this.setModel(new sap.ui.model.json.JSONModel(), "typedtls");
            // enable routing
            this.getRouter().initialize();
        }
    });
});