
# Add project specific ProGuard rules here.

# Meta Audience Network ProGuard rules - EXACTLY as requested
-keep class com.facebook.ads.** { *; }
-dontwarn com.facebook.ads.**

# Keep Meta/Facebook SDK classes
-keep class com.facebook.** { *; }
-dontwarn com.facebook.**

# Keep annotation classes
-keepattributes *Annotation*

# Keep native method names
-keepclasseswithmembernames class * {
    native <methods>;
}

# Standard Android ProGuard rules
-keep public class * extends android.app.Activity
-keep public class * extends android.app.Application
-keep public class * extends android.app.Service
-keep public class * extends android.content.BroadcastReceiver
-keep public class * extends android.content.ContentProvider
