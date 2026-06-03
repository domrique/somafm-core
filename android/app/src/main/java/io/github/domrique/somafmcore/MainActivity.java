package io.github.domrique.somafmcore;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        registerPlugin(RadioKeepAlivePlugin.class);
        super.onCreate(savedInstanceState);
    }
}
