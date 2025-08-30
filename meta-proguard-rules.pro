
# Meta Audience Network ProGuard rules
# Add these rules to android/app/proguard-rules.pro

# Keep Meta Audience Network classes
-keep class com.facebook.ads.** { *; }
-dontwarn com.facebook.ads.**

# Keep Facebook SDK classes
-keep class com.facebook.** { *; }
-dontwarn com.facebook.**

# Keep annotation classes
-keepattributes *Annotation*

# Keep native method names
-keepclasseswithmembernames class * {
    native <methods>;
}
