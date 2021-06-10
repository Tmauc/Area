package com.epitech.mobilearea

import android.os.Bundle
import androidx.navigation.ui.AppBarConfiguration
import androidx.appcompat.app.AppCompatActivity

class SettingActivity : AppCompatActivity() {

    private lateinit var appBarConfiguration: AppBarConfiguration

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.setting_view)

    }
}