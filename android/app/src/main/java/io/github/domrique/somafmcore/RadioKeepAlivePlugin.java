package io.github.domrique.somafmcore;

import android.content.Context;
import android.content.Intent;

import androidx.core.content.ContextCompat;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "RadioKeepAlive")
public class RadioKeepAlivePlugin extends Plugin {
    @PluginMethod
    public void start(PluginCall call) {
        Context context = getContext();
        Intent intent = new Intent(context, RadioKeepAliveService.class);
        intent.setAction(RadioKeepAliveService.ACTION_START);
        intent.putExtra(RadioKeepAliveService.EXTRA_STATION, call.getString("station", "SomaFMCore"));
        intent.putExtra(RadioKeepAliveService.EXTRA_TRACK, call.getString("track", "Radio stream active."));

        try {
            ContextCompat.startForegroundService(context, intent);
            JSObject result = new JSObject();
            result.put("active", true);
            call.resolve(result);
        } catch (Exception error) {
            call.reject("Unable to start radio keep-alive service", error);
        }
    }

    @PluginMethod
    public void stop(PluginCall call) {
        Context context = getContext();
        Intent intent = new Intent(context, RadioKeepAliveService.class);
        intent.setAction(RadioKeepAliveService.ACTION_STOP);

        try {
            context.startService(intent);
            JSObject result = new JSObject();
            result.put("active", false);
            call.resolve(result);
        } catch (Exception error) {
            call.reject("Unable to stop radio keep-alive service", error);
        }
    }
}
