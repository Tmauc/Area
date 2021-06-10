package com.epitech.mobilearea

import android.content.Intent
import android.os.AsyncTask
import android.os.Bundle
import android.view.View
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.ListView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.epitech.mobilearea.MainActivity.Companion.list
import com.epitech.mobilearea.MainActivity.Companion.useremail
import kotlinx.android.synthetic.main.activity_login.*
import org.json.JSONObject
import java.io.BufferedReader
import java.io.InputStreamReader
import java.io.OutputStream
import java.io.OutputStreamWriter
import java.net.HttpURLConnection
import java.net.URL

var array = arrayOf("Github", "Weather", "Reddit", "Ytube like","Ytube dislike","Ytube comments", "Ytube views", "Money", "Facebook", "Nasa")
var counter = 0
var counter2 = 0
var action = ""
var reaction = ""
var memories = ""


class ListModules : AppCompatActivity() {

    private inner class NetworkAsyncTask : AsyncTask<String, Int, String>()
    {
        override fun doInBackground(vararg parts: String?): String {
            val requestURL = parts.first()
            val queryString = parts.last()
            var returnv : String = ""

            val connection: HttpURLConnection = URL(requestURL).openConnection() as HttpURLConnection
            connection.requestMethod = "POST"
            connection.doOutput = true

            val outputStream: OutputStream = connection.outputStream
            val outputWriter = OutputStreamWriter(outputStream)
            outputWriter.write(queryString)
            outputWriter.flush()

            BufferedReader(InputStreamReader(connection.inputStream)).use {
                val response = StringBuffer()
                var inputLine = it.readLine()
                while (inputLine != null) {
                    response.append(inputLine)
                    inputLine = it.readLine()
                }
                response.toString()
                returnv = response.toString()
                it.close()
            }
            connection.disconnect()
            return returnv
        }
    }

    override fun onBackPressed() {
        super.onBackPressed()
        array = arrayOf("Github", "Weather", "Reddit", "Ytube like","Ytube dislike","Ytube comments", "Ytube views", "Money", "Facebook", "Nasa")
        counter = 0
        counter2 = 0
        action = ""
        reaction = ""
        memories = ""
    }

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

                if (counter > 0) {
                    reaction = "$itemValue"
                    counter = 0
                    array = arrayOf("E-mail")
                    if (counter2 == 1) {
                        counter2 = 0
                        array = arrayOf("Github", "Weather", "Reddit", "Ytube like","Ytube dislike","Ytube comments", "Ytube views", "Mail", "Money", "Facebook", "Nasa")
                        redirect()
                    } else {
                        redirect2()
                        counter2 = 1
                    }

                }
                else {
                    action = "$itemValue"
                    if(action == "Github")
                        array = arrayOf("Followers", "Following", "Repo numbers", "Stash number")
                    else if(action == "Ytube like")
                        array = arrayOf("Sneazy", "RihannaDiamonds", "DavidGuettaTitanium", "PartyRockAnthems", "oldTownRoad", "HappierMarshmallow", "AngeleOuiOuNon", "NekfeuOnVerra", "OrelsanAlheureOu", "MaitreGimsJemeTire", "ToxicBritney", "Macklemore", "EminemLoseYourself")
                    else if(action == "Ytube dislike")
                        array = arrayOf("Sneazy", "RihannaDiamonds", "DavidGuettaTitanium", "PartyRockAnthems", "oldTownRoad", "HappierMarshmallow", "AngeleOuiOuNon", "NekfeuOnVerra", "OrelsanAlheureOu", "MaitreGimsJemeTire", "ToxicBritney", "Macklemore", "EminemLoseYourself")
                    else if(action == "Ytube comments")
                        array = arrayOf("Sneazy", "RihannaDiamonds", "DavidGuettaTitanium", "PartyRockAnthems", "oldTownRoad", "HappierMarshmallow", "AngeleOuiOuNon", "NekfeuOnVerra", "OrelsanAlheureOu", "MaitreGimsJemeTire", "ToxicBritney", "Macklemore", "EminemLoseYourself")
                    else if(action == "Ytube views")
                        array = arrayOf("Sneazy", "RihannaDiamonds", "DavidGuettaTitanium", "PartyRockAnthems", "oldTownRoad", "HappierMarshmallow", "AngeleOuiOuNon", "NekfeuOnVerra", "OrelsanAlheureOu", "MaitreGimsJemeTire", "ToxicBritney", "Macklemore", "EminemLoseYourself")
                    else if (action == "Weather")
                        array = arrayOf("Paris", "Lyon", "Marseille")
                    else if (action == "Movie")
                        array = arrayOf("Popularity", "Vote", "Like")
                    else if (action == "Reddit Post")
                        array = arrayOf("nonononoyes", "memes", "funny", "facepalm")
                    else if (action == "Ytube")
                        array = arrayOf("Views", "Likes", "Dislikes", "Comments")
                    else if (action == "Money")
                        array = arrayOf("CAD","HKD","ISK","PHP","DKK","HUF","CZK","AUD","RON","SEK","IDR","INR","BRL","RUB","HRK","JPY","THB","CHF","SGD","PLN","BGN","TRY","CNY","NOK","NZD","ZAR","USD","MXN","ILS","GBP","KRW","MYR")
                    else if (action == "Facebook")
                        array = arrayOf("Post", "Relationship")
                    else if (action == "Nasa") {
                        array = arrayOf("Speed")
                    } else if (action == "E-mail") {
                        array = arrayOf("Send")
                    }
                    counter = 1
                    intent.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
                    startActivity(intent)
                }

            }
        }
    }
    fun redirect ()
    {
        list.add(createAreaction("$memories", "$action $reaction"))
        sendAddwidgetRequest(memories, "$action $reaction")
        action =""
        reaction = ""
        memories = ""
        finish()
        Toast.makeText(this@ListModules, "Action added !", Toast.LENGTH_SHORT).show()
    }

    fun redirect2 ()
    {
        memories = action + " " + reaction
        action =""
        reaction = ""
        finish()
        val intent = Intent(this, ListModules::class.java)
        intent.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
        startActivity(intent)
    }

    private fun sendAddwidgetRequest(action: String, reaction: String) {
        var action_id: Number = -1
        var reaction_id: Number = -1
        var data_wala = "{}"

        println("action : [$action], reaction : [$reaction]")
        when {
            action == "Facebook Post" -> {
                action_id = 0
            }
            action == "Facebook Relationship" -> {
                action_id = 1
            }
            action.startsWith("Weather") -> {
                action_id = 2
                data_wala = "{\"city\": \"${action.split(" ").toTypedArray()[1]}\"}"
            }
            action.startsWith("Money") -> {
                action_id = 3
                data_wala = "{\"money\": \"${action.split(" ").toTypedArray()[1]}\"}"
            }
            action.startsWith("Ytube like") -> {
                action_id = 4
                data_wala = "{\"video\": \"${action.split(" ").toTypedArray()[2]}\"}"
            }
            action.startsWith("Ytube dislike") -> {
                action_id = 5
                data_wala = "{\"video\": \"${action.split(" ").toTypedArray()[2]}\"}"
            }
            action.startsWith("Ytube views") -> {
                action_id = 6
                data_wala = "{\"video\": \"${action.split(" ").toTypedArray()[2]}\"}"
            }
            action.startsWith("Ytube comments") -> {
                action_id = 7
                data_wala = "{\"video\": \"${action.split(" ").toTypedArray()[2]}\"}"
            }
            action.startsWith("Reddit Post") -> {
                action_id = 8
                data_wala = "{\"subreddit\": \"${action.split(" ").toTypedArray()[2]}\"}"
            }
            action == "Github Followers" -> {
                action_id = 9
            }
            action == "Github Following" -> {
                action_id = 10
            }
            action == "Github Repo numbers" -> {
                action_id = 11
            }
            action == "Github Stash numbers" -> {
                action_id = 12
            }
            action == "Nasa Speed" -> {
                action_id = 13
            }
        }

        if (reaction == "E-mail Send") {
            reaction_id = 0
        }
        println("action_id : [$action_id], reaction_id : [$reaction_id], DATA_WALA: [${data_wala}]")
        NetworkAsyncTask().execute("http://${ip}:${port}/addwidget", "email=${useremail}&action=${action_id}&reaction=${reaction_id}&data=${data_wala}")
    }


}
