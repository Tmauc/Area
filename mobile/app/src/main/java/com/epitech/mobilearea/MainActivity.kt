package com.epitech.mobilearea

import android.content.Intent
import android.os.Bundle
import com.google.android.material.floatingactionbutton.FloatingActionButton
import androidx.navigation.findNavController
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.navigateUp
import androidx.navigation.ui.setupActionBarWithNavController
import androidx.navigation.ui.setupWithNavController
import androidx.drawerlayout.widget.DrawerLayout
import com.google.android.material.navigation.NavigationView
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import android.view.Menu
import org.json.JSONObject

class Areaction {
    var action : String = ""
    var reaction : String = ""
}

fun createAreaction(action: String, reaction: String): Areaction {
    var areaction = Areaction()
    areaction.action = action
    areaction.reaction = reaction
    return areaction
}

class MainActivity : AppCompatActivity() {

    private lateinit var appBarConfiguration: AppBarConfiguration

    companion object {
        var list: ArrayList<Areaction> = ArrayList()
        lateinit var useremail: String
        lateinit var username: String
    }

    fun parseJson(data: JSONObject, navigationView: NavigationView) {
        //navigationView.profile_name.text = "${data.getString("name")} ${data.getString("lastname")}"
        //navigationView.profile_email.text = "${data.getString("email")}"
        useremail = data.getString("email")
        username = data.getString("name")
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContentView(R.layout.activity_main)
        val toolbar: Toolbar = findViewById(R.id.toolbar)
        setSupportActionBar(toolbar)

        val fab: FloatingActionButton = findViewById(R.id.fab)

        fab.setImageResource(R.drawable.ic_plu)
        fab.setOnClickListener {
            val intent = Intent(this, ListModules::class.java)
            startActivity(intent)
        }
        val drawerLayout: DrawerLayout = findViewById(R.id.drawer_layout)
        val navView: NavigationView = findViewById(R.id.nav_view)
        val navController = findNavController(R.id.nav_host_fragment)
        // Passing each menu ID as a set of Ids because each
        // menu should be considered as top level destinations.
        appBarConfiguration = AppBarConfiguration(
            setOf(
                R.id.nav_home, R.id.nav_facebook, R.id.nav_gallery
            ), drawerLayout
        )
        setupActionBarWithNavController(navController, appBarConfiguration)
        navView.setupWithNavController(navController)

        var responseJson = JSONObject(intent.getStringExtra("response"))
        parseJson(responseJson.getJSONObject("data"), navView)
    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        // Inflate the menu; this adds items to the action bar if it is present.
        menuInflater.inflate(R.menu.main, menu)
        return true
    }

    override fun onSupportNavigateUp(): Boolean {
        val navController = findNavController(R.id.nav_host_fragment)
        return navController.navigateUp(appBarConfiguration) || super.onSupportNavigateUp()
    }
}
