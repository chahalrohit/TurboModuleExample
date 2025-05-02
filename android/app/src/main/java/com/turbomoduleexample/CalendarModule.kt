package com.turbomoduleexample

import android.content.ContentValues
import android.content.Intent  // ✅ MISSING IMPORT
import android.provider.CalendarContract
import com.facebook.react.bridge.*
import java.util.*

class CalendarModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "CalendarModule"

    @ReactMethod
    fun createCalendarEvent(name: String, location: String, promise: Promise) {
        try {
            val calendarId: Long = 1  // This may vary based on device
            val startMillis = Calendar.getInstance().timeInMillis + 60_000  // 1 minute from now
            val endMillis = startMillis + 60 * 60 * 1000  // 1 hour duration

            val values = ContentValues().apply {
                put(CalendarContract.Events.DTSTART, startMillis)
                put(CalendarContract.Events.DTEND, endMillis)
                put(CalendarContract.Events.TITLE, name)
                put(CalendarContract.Events.EVENT_LOCATION, location)
                put(CalendarContract.Events.CALENDAR_ID, calendarId)
                put(CalendarContract.Events.EVENT_TIMEZONE, TimeZone.getDefault().id)
            }

            val uri = reactApplicationContext.contentResolver.insert(CalendarContract.Events.CONTENT_URI, values)
            if (uri != null) {
                promise.resolve("Event created with URI: $uri")
            } else {
                promise.reject("ERROR", "Failed to create event.")
            }
        } catch (e: Exception) {
            promise.reject("ERROR", "Exception: ${e.message}", e)
        }
    }

    @ReactMethod
    fun openCalendar(promise: Promise) {
        try {
            val intent = Intent(Intent.ACTION_MAIN)
            intent.addCategory(Intent.CATEGORY_APP_CALENDAR)
            intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
            reactApplicationContext.startActivity(intent)
            promise.resolve("Calendar opened successfully")
        } catch (e: Exception) {
            promise.reject("OPEN_CALENDAR_ERROR", "Failed to open calendar: ${e.message}", e)
        }
    }
}
