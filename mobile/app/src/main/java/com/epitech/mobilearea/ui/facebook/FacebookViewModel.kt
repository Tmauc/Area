package com.epitech.mobilearea.ui.facebook

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class FacebookViewModel : ViewModel() {

    private val _text = MutableLiveData<String>().apply {
        value = "This is facebook Fragment"
    }
    val text: LiveData<String> = _text
}