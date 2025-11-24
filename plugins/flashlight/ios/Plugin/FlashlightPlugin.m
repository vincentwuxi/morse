#import <Capacitor/Capacitor.h>

CAP_PLUGIN(FlashlightPlugin, "Flashlight",
    CAP_PLUGIN_METHOD(isAvailable, CAPPluginReturnPromise);
    CAP_PLUGIN_METHOD(switchOn, CAPPluginReturnPromise);
    CAP_PLUGIN_METHOD(switchOff, CAPPluginReturnPromise);
    CAP_PLUGIN_METHOD(isSwitchedOn, CAPPluginReturnPromise);
)
