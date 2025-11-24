import Foundation
import Capacitor
import AVFoundation

@objc(FlashlightPlugin)
public class FlashlightPlugin: CAPPlugin {
    @objc func isAvailable(_ call: CAPPluginCall) {
        let device = AVCaptureDevice.default(for: .video)
        let available = device != nil && device!.hasTorch
        call.resolve([
            "value": available
        ])
    }

    @objc func switchOn(_ call: CAPPluginCall) {
        guard let device = AVCaptureDevice.default(for: .video) else {
            call.reject("No device found")
            return
        }

        if device.hasTorch {
            do {
                try device.lockForConfiguration()
                let intensity = call.getFloat("intensity") ?? 1.0
                try device.setTorchModeOn(level: intensity)
                device.unlockForConfiguration()
                call.resolve()
            } catch {
                call.reject("Error turning on flashlight: \(error.localizedDescription)")
            }
        } else {
            call.reject("Flashlight not available")
        }
    }

    @objc func switchOff(_ call: CAPPluginCall) {
        guard let device = AVCaptureDevice.default(for: .video) else {
            call.reject("No device found")
            return
        }

        if device.hasTorch {
            do {
                try device.lockForConfiguration()
                device.torchMode = .off
                device.unlockForConfiguration()
                call.resolve()
            } catch {
                call.reject("Error turning off flashlight: \(error.localizedDescription)")
            }
        } else {
            call.reject("Flashlight not available")
        }
    }

    @objc func isSwitchedOn(_ call: CAPPluginCall) {
        guard let device = AVCaptureDevice.default(for: .video) else {
            call.reject("No device found")
            return
        }
        
        call.resolve([
            "value": device.torchMode == .on
        ])
    }
}
