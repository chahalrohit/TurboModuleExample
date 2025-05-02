package com.turbomoduleexample

import com.facebook.react.bridge.*

class CalendarModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "CalendarModule"

    @ReactMethod
    fun createCalendarEvent(name: String, location: String, promise: Promise) {
        promise.resolve("Created event '$name' at '$location'")
    }
}
