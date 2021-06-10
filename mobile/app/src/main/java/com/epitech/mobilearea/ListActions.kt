package com.epitech.mobilearea

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.ListView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.epitech.mobilearea.MainActivity.Companion.list

class ListActions : AppCompatActivity() {

    var array = arrayOf("Notifications", "Notifications", "Notifications")

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContentView(R.layout.fragment_listmodules)

        val adapter = ArrayAdapter(
            this,
            R.layout.listview_item, array
        )

        val listView: ListView = findViewById(R.id.listview_1)
        listView.adapter = adapter
        

        listView.onItemClickListener = object : AdapterView.OnItemClickListener {

            override fun onItemClick(
                parent: AdapterView<*>, view: View,
                position: Int, id: Long
            ) {

                // value of item that is clicked
                val itemValue = listView.getItemAtPosition(position) as String

                // Toast the values
                Toast.makeText(
                    applicationContext,
                    "$itemValue ajouté a vos choix", Toast.LENGTH_LONG
                )
                    .show()

                list.add(createAreaction("ACTION2", "REACTION2"))

                finish()
            }
        }
    }
}