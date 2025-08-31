
package com.vidrankersocilet.com;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import java.util.ArrayList;

// Meta Audience Network Imports
import com.facebook.ads.AudienceNetworkAds;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Initialize Meta Audience Network
        AudienceNetworkAds.initialize(this);
        
        // Register any additional plugins if needed
        this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
            // Add custom plugins here if needed
        }});
    }
}
