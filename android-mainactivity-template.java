
package com.vidrankersocilet.com;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import java.util.ArrayList;

// AdMob Plugin Import
import com.getcapacitor.community.admob.AdMobPlugin;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Register AdMob Plugin
        this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
            add(AdMobPlugin.class);
        }});
    }
}
